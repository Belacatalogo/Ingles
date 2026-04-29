import { diagnostics } from './diagnostics.js';
import { normalizeLesson } from './lessonTypes.js';

export const GEMINI_LESSON_STATUS = {
  idle: 'idle',
  missingKeys: 'missing-keys',
  generating: 'generating',
  success: 'success',
  error: 'error',
};

const FLASH_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash'];
const PRO_MODELS = ['gemini-2.5-pro'];
const RETRYABLE_STATUS = new Set([500, 502, 503, 504]);

const LESSON_BLOCKS = [
  {
    id: 'structure',
    label: 'estrutura da aula',
    maxOutputTokens: 1800,
    instruction: [
      'Crie somente a estrutura da aula Reading A1.',
      'Retorne JSON com: type, level, title, intro, objective, sections e tips.',
      'sections deve conter apenas explicações curtas em português, nunca o texto principal completo.',
      'tips deve conter 3 dicas curtas em português.',
    ].join('\n'),
  },
  {
    id: 'readingText',
    label: 'texto principal Reading',
    maxOutputTokens: 2800,
    instruction: [
      'Crie somente o texto principal da aula em inglês simples A1.',
      'Retorne JSON com apenas a chave listeningText.',
      'listeningText deve conter somente o texto em inglês para ler/ouvir.',
      'Não coloque instruções, traduções, markdown, título ou explicações dentro de listeningText.',
      'Faça 3 a 5 parágrafos curtos, naturais e coerentes para aluno A1.',
    ].join('\n'),
  },
  {
    id: 'vocabulary',
    label: 'vocabulário',
    maxOutputTokens: 2200,
    instruction: [
      'Crie somente o vocabulário importante da aula.',
      'Retorne JSON com apenas a chave vocabulary.',
      'vocabulary deve ser uma lista com 6 a 10 itens.',
      'Cada item deve ter word, meaning e example.',
      'word em inglês, meaning em português e example em inglês A1.',
    ].join('\n'),
  },
  {
    id: 'exercises',
    label: 'exercícios de compreensão',
    maxOutputTokens: 2400,
    instruction: [
      'Crie somente os exercícios de compreensão da aula.',
      'Retorne JSON com apenas a chave exercises.',
      'exercises deve ter 4 a 6 questões.',
      'Cada exercício deve ter question, options e answer.',
      'options deve ter 3 alternativas curtas.',
      'answer deve ser exatamente uma das alternativas.',
      'Não revele explicação da resposta dentro das alternativas.',
    ].join('\n'),
  },
];

export function maskApiKey(key) {
  const value = String(key ?? '').replace(/\s+/g, '').trim();
  if (!value) return '';
  if (value.length <= 12) return `${value.slice(0, 4)}...`;
  return `${value.slice(0, 8)}...${value.slice(-4)}`;
}

export function isValidGeminiKey(key) {
  return /^AIza[0-9A-Za-z_\-]{20,}$/.test(String(key ?? '').replace(/\s+/g, '').trim());
}

export function normalizeLessonKeys(keys) {
  const source = Array.isArray(keys) ? keys : String(keys ?? '').split(/[\n,;| ]+/);
  const seen = new Set();
  return source
    .map((key) => String(key ?? '').replace(/\s+/g, '').trim())
    .filter((key) => {
      if (!isValidGeminiKey(key)) return false;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getHttpStatus(error) {
  const match = String(error?.message || error).match(/HTTP\s+(\d{3})/i);
  return match ? Number(match[1]) : null;
}

function isQuotaError(error) {
  return getHttpStatus(error) === 429;
}

function isModelNotFound(error) {
  return getHttpStatus(error) === 404;
}

function isRetryableError(error) {
  return RETRYABLE_STATUS.has(getHttpStatus(error));
}

function buildAttempts({ keys = [], proKey = '' }) {
  const lessonKeys = normalizeLessonKeys(keys);
  const paidKey = normalizeLessonKeys([proKey])[0] ?? '';
  const attempts = [];

  for (const key of lessonKeys) {
    for (const model of FLASH_MODELS) {
      attempts.push({ key, model, paid: false, masked: maskApiKey(key) });
    }
  }

  if (paidKey) {
    for (const model of PRO_MODELS) {
      attempts.push({ key: paidKey, model, paid: true, masked: maskApiKey(paidKey) });
    }
  }

  return attempts;
}

function extractTextFromGemini(data) {
  const parts = data?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return '';
  return parts.map((part) => part?.text ?? '').join('\n').trim();
}

function parseLessonJson(text) {
  const clean = String(text ?? '')
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```$/i, '')
    .trim();

  const start = clean.indexOf('{');
  const end = clean.lastIndexOf('}');
  const jsonText = start >= 0 && end > start ? clean.slice(start, end + 1) : clean;
  return JSON.parse(jsonText);
}

function normalizeText(value) {
  return String(value ?? '').trim();
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function assertLessonBlock(block, data) {
  if (!data || typeof data !== 'object') throw new Error(`Bloco ${block.label} retornou JSON inválido.`);

  if (block.id === 'structure') {
    if (!normalizeText(data.title)) throw new Error('Bloco estrutura veio sem título.');
    if (!normalizeText(data.intro)) throw new Error('Bloco estrutura veio sem introdução.');
    if (!normalizeText(data.objective)) throw new Error('Bloco estrutura veio sem objetivo.');
  }

  if (block.id === 'readingText') {
    const text = normalizeText(data.listeningText);
    if (text.length < 350) throw new Error('Texto principal ficou curto demais.');
  }

  if (block.id === 'vocabulary') {
    if (ensureArray(data.vocabulary).length < 4) throw new Error('Vocabulário insuficiente.');
  }

  if (block.id === 'exercises') {
    const exercises = ensureArray(data.exercises);
    if (exercises.length < 3) throw new Error('Exercícios insuficientes.');
    const hasInvalidAnswer = exercises.some((item) => !ensureArray(item?.options).includes(item?.answer));
    if (hasInvalidAnswer) throw new Error('Um exercício veio com resposta fora das alternativas.');
  }
}

function validateGeneratedLesson(lesson) {
  const normalized = normalizeLesson(lesson);
  const hasCore = normalized.title && normalized.type && normalized.level;
  const hasStudyContent =
    normalized.intro ||
    normalized.sections.length > 0 ||
    normalized.vocabulary.length > 0 ||
    normalized.exercises.length > 0 ||
    normalized.listeningText;

  if (!hasCore) throw new Error('Aula sem título, tipo ou nível.');
  if (!hasStudyContent) throw new Error('Aula sem conteúdo de estudo suficiente.');
  if (!normalized.listeningText || normalized.listeningText.length < 350) throw new Error('Aula Reading sem texto principal suficiente.');
  if (normalized.vocabulary.length < 4) throw new Error('Aula Reading com vocabulário insuficiente.');
  if (normalized.exercises.length < 3) throw new Error('Aula Reading com exercícios insuficientes.');

  return normalized;
}

function buildBlockPrompt({ block, basePrompt, partialLesson }) {
  return [
    'Você é o gerador de aulas do Fluency.',
    'Retorne APENAS JSON válido. Não use markdown. Não use **negrito**. Não use listas com asterisco.',
    'Crie conteúdo para aluno brasileiro aprender inglês com uma aula séria, clara e organizada.',
    'A aula atual deve ser Reading nível A1, salvo se o pedido do app exigir algo compatível com A1.',
    '',
    'Pedido original do app:',
    String(basePrompt ?? 'Gerar uma aula de inglês A1 do dia.'),
    '',
    partialLesson ? 'Conteúdo já aprovado nos blocos anteriores:' : '',
    partialLesson ? JSON.stringify(partialLesson).slice(0, 5000) : '',
    '',
    `Bloco solicitado: ${block.label}`,
    block.instruction,
  ].filter(Boolean).join('\n');
}

async function callGeminiJson({ attempt, prompt, maxOutputTokens, fetcher }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(attempt.model)}:generateContent?key=${encodeURIComponent(attempt.key)}`;
  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.35,
      maxOutputTokens,
      responseMimeType: 'application/json',
    },
  };

  const response = await fetcher(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response || typeof response.ok === 'undefined') {
    throw new Error('Gemini retornou resposta vazia.');
  }

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`HTTP ${response.status} ${text.slice(0, 180)}`);
  }

  const data = await response.json();
  const text = extractTextFromGemini(data);
  return parseLessonJson(text);
}

function composeLessonFromBlocks(blockResults) {
  return {
    type: blockResults.structure?.type || 'reading',
    level: blockResults.structure?.level || 'A1',
    title: blockResults.structure?.title || 'Reading A1',
    intro: blockResults.structure?.intro || '',
    objective: blockResults.structure?.objective || '',
    sections: ensureArray(blockResults.structure?.sections),
    tips: ensureArray(blockResults.structure?.tips),
    listeningText: blockResults.readingText?.listeningText || '',
    vocabulary: ensureArray(blockResults.vocabulary?.vocabulary),
    exercises: ensureArray(blockResults.exercises?.exercises),
  };
}

async function callGeminiInBlocks({ attempt, prompt, fetcher }) {
  const blockResults = {};

  for (let index = 0; index < LESSON_BLOCKS.length; index += 1) {
    const block = LESSON_BLOCKS[index];
    const blockLabel = `${index + 1}/${LESSON_BLOCKS.length}`;
    diagnostics.setPhase(`gerando bloco ${blockLabel}`, GEMINI_LESSON_STATUS.generating);
    diagnostics.log(`Bloco ${blockLabel}: gerando ${block.label}.`, 'info');

    const data = await callGeminiJson({
      attempt,
      prompt: buildBlockPrompt({
        block,
        basePrompt: prompt,
        partialLesson: Object.keys(blockResults).length ? composeLessonFromBlocks(blockResults) : null,
      }),
      maxOutputTokens: attempt.paid ? Math.max(block.maxOutputTokens, 2600) : block.maxOutputTokens,
      fetcher,
    });

    assertLessonBlock(block, data);
    blockResults[block.id] = data;
    diagnostics.log(`Bloco ${blockLabel} aprovado: ${block.label}.`, 'info');
  }

  return validateGeneratedLesson(composeLessonFromBlocks(blockResults));
}

function summarizeFinalError({ quotaKeys, modelErrors, lastError, attempts }) {
  if (quotaKeys.size && quotaKeys.size >= new Set(attempts.map((attempt) => attempt.key)).size) {
    return 'Todas as keys de aula disponíveis bateram quota/limite. Adicione outra key ou tente novamente mais tarde.';
  }

  if (modelErrors > 0 && !lastError) {
    return 'Os modelos disponíveis não estão aceitando geração agora.';
  }

  const status = getHttpStatus(lastError);
  if (status === 503) return 'O Gemini respondeu alta demanda temporária. Tente gerar novamente em alguns minutos.';
  if (status === 429) return 'A key usada atingiu quota/limite. Adicione outra key de aula ou aguarde a renovação da quota.';
  if (status === 404) return 'Modelo Gemini indisponível para esta API. A lista de modelos foi ajustada; tente novamente após atualizar o preview.';

  return lastError?.message || 'Falha ao gerar aula.';
}

export async function generateLessonDraft({ prompt, keys = [], proKey = '', fetcher = fetch } = {}) {
  const attempts = buildAttempts({ keys, proKey });

  diagnostics.setPhase('preparando geração de aula em blocos', GEMINI_LESSON_STATUS.generating);
  diagnostics.log(`Plano de geração em blocos: ${attempts.length} tentativa(s), ${LESSON_BLOCKS.length} bloco(s) por tentativa.`, 'info');

  if (!attempts.length) {
    diagnostics.log('Nenhuma key Gemini válida configurada para aulas.', 'error');
    return {
      status: GEMINI_LESSON_STATUS.missingKeys,
      lesson: null,
      error: 'Nenhuma key Gemini válida configurada para aulas.',
    };
  }

  let lastError = null;
  let modelErrors = 0;
  const quotaKeys = new Set();

  for (let index = 0; index < attempts.length; index += 1) {
    const attempt = attempts[index];
    const attemptLabel = `${index + 1}/${attempts.length}`;

    if (quotaKeys.has(attempt.key)) {
      diagnostics.log(`Pulando ${attempt.model}: key ${attempt.masked} já atingiu quota.`, 'info');
      continue;
    }

    diagnostics.setPhase(`tentativa ${attemptLabel}`, GEMINI_LESSON_STATUS.generating);
    diagnostics.log(
      `Tentativa ${attemptLabel}: ${attempt.model} com key ${attempt.masked}${attempt.paid ? ' (Pro fallback)' : ' (Flash/free)'}`,
      'info'
    );

    try {
      const lesson = await callGeminiInBlocks({ attempt, prompt, fetcher });
      diagnostics.setPhase('aula gerada em blocos', GEMINI_LESSON_STATUS.success);
      diagnostics.log(`Aula completa gerada, montada e validada com ${attempt.model}.`, 'info');
      return { status: GEMINI_LESSON_STATUS.success, lesson, error: null };
    } catch (error) {
      lastError = error;

      if (isQuotaError(error)) {
        quotaKeys.add(attempt.key);
        diagnostics.log(`Quota atingida na key ${attempt.masked}. Próximas tentativas com essa key serão puladas.`, 'error');
        continue;
      }

      if (isModelNotFound(error)) {
        modelErrors += 1;
        diagnostics.log(`Modelo indisponível: ${attempt.model}.`, 'error');
        continue;
      }

      diagnostics.log(`Falha na tentativa ${attemptLabel}: ${error?.message || error}`, attempt.paid ? 'error' : 'info');

      if (isRetryableError(error)) {
        diagnostics.log('Erro temporário do Gemini. Aguardando antes da próxima tentativa...', 'info');
        await sleep(900);
      }
    }
  }

  const finalError = summarizeFinalError({ quotaKeys, modelErrors, lastError, attempts });
  diagnostics.setPhase('falha na geração de aula', GEMINI_LESSON_STATUS.error);
  diagnostics.log(finalError, 'error');

  return {
    status: GEMINI_LESSON_STATUS.error,
    lesson: null,
    error: finalError,
  };
}
