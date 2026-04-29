import { diagnostics } from './diagnostics.js';
import { inferLessonTypeFromText, normalizeLesson } from './lessonTypes.js';

export const GEMINI_LESSON_STATUS = {
  idle: 'idle',
  missingKeys: 'missing-keys',
  generating: 'generating',
  success: 'success',
  error: 'error',
};

const FLASH_MODELS = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];
const PRO_MODELS = ['gemini-2.5-pro'];
const RETRYABLE_STATUS = new Set([500, 502, 503, 504]);
const BLOCK_RETRY_LIMIT = 2;

const QUALITY_RULES = [
  'A aula deve ser longa, completa e aprofundada, mesmo em A1.',
  'Não gere resumo curto. Não gere apenas introdução.',
  'Explique com calma, em partes, como um professor particular.',
  'Inclua muita prática ativa, perguntas e revisão.',
  'Nunca revele as respostas antes da tentativa nos exercícios.',
  'Use inglês adequado ao nível, mas explicações em português quando isso ajudar o aluno brasileiro.',
].join('\n');

const LESSON_BLUEPRINTS = {
  reading: {
    label: 'Reading',
    minMainLength: 1200,
    minVocabulary: 14,
    minExercises: 14,
    minPrompts: 5,
    minSections: 6,
    blocks: [
      {
        id: 'structure',
        label: 'estrutura aprofundada da aula Reading',
        maxOutputTokens: 3600,
        instruction: [
          QUALITY_RULES,
          'Crie somente a estrutura da aula Reading A1.',
          'Retorne JSON com: type="reading", level, title, intro, objective, focus, sections e tips.',
          'intro deve ter 2 parágrafos em português explicando por que o tema é importante.',
          'sections deve conter 6 a 8 partes em português: contexto, pré-leitura, estratégia de leitura, leitura guiada, linguagem útil, armadilhas comuns, revisão e prática final.',
          'Cada section deve ter title, content e examples.',
          'content de cada section deve ter explicação substancial, não uma frase curta.',
          'tips deve conter 6 dicas curtas e práticas.',
        ].join('\n'),
      },
      {
        id: 'mainContent',
        label: 'texto principal longo Reading',
        maxOutputTokens: 5200,
        instruction: [
          QUALITY_RULES,
          'Crie somente o texto principal da aula em inglês simples A1.',
          'Retorne JSON com apenas a chave listeningText.',
          'listeningText deve conter somente o texto em inglês para ler/ouvir.',
          'Faça um texto longo para A1 com 10 a 14 parágrafos curtos.',
          'Use frases simples, repetição pedagógica e vocabulário controlado.',
          'O texto deve ter no mínimo 180 palavras e idealmente 260 a 360 palavras.',
          'Não use estruturas gramaticais que ultrapassem o tema/pré-requisitos informados.',
        ].join('\n'),
      },
      {
        id: 'vocabulary',
        label: 'vocabulário completo Reading',
        maxOutputTokens: 3600,
        instruction: [
          QUALITY_RULES,
          'Crie somente o vocabulário importante da aula.',
          'Retorne JSON com apenas a chave vocabulary.',
          'vocabulary deve ter 14 a 18 itens com word, meaning e example.',
          'word em inglês, meaning em português e example em inglês A1.',
          'Inclua palavras essenciais, chunks/frases prontas e pequenas expressões naturais.',
        ].join('\n'),
      },
      {
        id: 'exercises',
        label: 'bateria completa de exercícios Reading',
        maxOutputTokens: 5200,
        instruction: [
          QUALITY_RULES,
          'Crie somente exercícios de compreensão e prática.',
          'Retorne JSON com apenas a chave exercises.',
          'exercises deve ter 14 a 18 questões.',
          'Misture: compreensão geral, detalhe, vocabulário, completar frase, ordenar ideia e inferência simples.',
          'Cada exercício deve ter question, options, answer e explanation.',
          'options deve ter 3 alternativas curtas; answer deve ser exatamente uma alternativa.',
          'explanation deve explicar em português por que a resposta está correta.',
        ].join('\n'),
      },
      {
        id: 'production',
        label: 'produção final Reading',
        maxOutputTokens: 1800,
        instruction: [
          QUALITY_RULES,
          'Crie somente prompts de produção final.',
          'Retorne JSON com apenas a chave prompts.',
          'prompts deve ter 5 a 7 comandos graduais em inglês para o aluno responder usando ideias do texto.',
          'Inclua comandos fáceis, médios e uma produção final curta.',
        ].join('\n'),
      },
    ],
  },
  grammar: {
    label: 'Grammar',
    minMainLength: 0,
    minVocabulary: 10,
    minExercises: 16,
    minPrompts: 5,
    minSections: 7,
    blocks: [
      {
        id: 'structure',
        label: 'estrutura aprofundada da aula Grammar',
        maxOutputTokens: 5200,
        instruction: [
          QUALITY_RULES,
          'Crie uma aula Grammar A1 séria, clara, completa e objetiva.',
          'Retorne JSON com: type="grammar", level, title, intro, objective, focus, sections e tips.',
          'intro deve ter 2 parágrafos em português.',
          'sections deve ter 7 a 9 partes: visão geral, quando usar, forma afirmativa, forma negativa, perguntas, respostas curtas, erros comuns, comparação com português e revisão.',
          'Cada section deve ter title, content e examples.',
          'Cada content deve ser substancial e didático.',
          'Cada examples deve ter 4 a 6 exemplos em inglês com variação controlada.',
          'tips deve ter 6 dicas práticas.',
          'Não transforme a aula em jogo.',
        ].join('\n'),
      },
      {
        id: 'vocabulary',
        label: 'vocabulário Grammar',
        maxOutputTokens: 2600,
        instruction: [
          QUALITY_RULES,
          'Crie vocabulário útil para os exemplos da regra.',
          'Retorne JSON com apenas a chave vocabulary.',
          'vocabulary deve ter 10 a 14 itens com word, meaning e example.',
        ].join('\n'),
      },
      {
        id: 'exercises',
        label: 'bateria completa de exercícios Grammar',
        maxOutputTokens: 5600,
        instruction: [
          QUALITY_RULES,
          'Crie exercícios gramaticais sem revelar respostas antes da tentativa.',
          'Retorne JSON com apenas a chave exercises.',
          'exercises deve ter 16 a 22 questões.',
          'Misture: múltipla escolha, completar frase, corrigir erro, transformar afirmativa em negativa/pergunta e interpretação curta.',
          'Cada exercício deve ter question, options, answer e explanation.',
          'options deve ter 3 alternativas; answer deve ser exatamente uma alternativa.',
          'explanation deve explicar em português de forma clara.',
        ].join('\n'),
      },
      {
        id: 'production',
        label: 'produção Grammar',
        maxOutputTokens: 2200,
        instruction: [
          QUALITY_RULES,
          'Crie produção própria para a regra.',
          'Retorne JSON com apenas a chave prompts.',
          'prompts deve ter 5 a 7 comandos para o aluno criar frases em inglês usando a regra.',
        ].join('\n'),
      },
    ],
  },
  listening: {
    label: 'Listening',
    minMainLength: 900,
    minVocabulary: 12,
    minExercises: 12,
    minPrompts: 5,
    minSections: 6,
    blocks: [
      {
        id: 'structure',
        label: 'estrutura aprofundada da aula Listening',
        maxOutputTokens: 3400,
        instruction: [
          QUALITY_RULES,
          'Crie somente a estrutura da aula Listening A1.',
          'Retorne JSON com: type="listening", level, title, intro, objective, focus, sections e tips.',
          'sections deve ter 6 partes: preparação, primeira escuta, segunda escuta, detalhes, shadowing e revisão.',
          'Cada section deve ter title, content e examples.',
          'tips deve ter 6 dicas práticas.',
        ].join('\n'),
      },
      {
        id: 'mainContent',
        label: 'transcrição longa Listening',
        maxOutputTokens: 4600,
        instruction: [
          QUALITY_RULES,
          'Crie somente a transcrição do áudio em inglês A1.',
          'Retorne JSON com apenas a chave listeningText.',
          'listeningText deve ter uma conversa ou monólogo natural de 220 a 320 palavras.',
          'Use frases curtas, repetições naturais e vocabulário A1.',
          'Não coloque tradução, markdown ou instruções dentro de listeningText.',
        ].join('\n'),
      },
      {
        id: 'vocabulary',
        label: 'vocabulário Listening',
        maxOutputTokens: 3000,
        instruction: [
          QUALITY_RULES,
          'Crie vocabulário auditivo importante.',
          'Retorne JSON com apenas a chave vocabulary.',
          'vocabulary deve ter 12 a 16 itens com word, meaning e example.',
        ].join('\n'),
      },
      {
        id: 'exercises',
        label: 'bateria completa de exercícios Listening',
        maxOutputTokens: 4600,
        instruction: [
          QUALITY_RULES,
          'Crie exercícios de compreensão auditiva.',
          'Retorne JSON com apenas a chave exercises.',
          'exercises deve ter 12 a 16 perguntas com question, options, answer e explanation.',
          'Misture compreensão geral, detalhes, ordem dos eventos e vocabulário ouvido.',
        ].join('\n'),
      },
      {
        id: 'production',
        label: 'shadowing Listening',
        maxOutputTokens: 1800,
        instruction: [
          QUALITY_RULES,
          'Crie prompts de shadowing e resposta curta.',
          'Retorne JSON com apenas a chave prompts.',
          'prompts deve ter 5 a 7 comandos graduais.',
        ].join('\n'),
      },
    ],
  },
  writing: {
    label: 'Writing',
    minMainLength: 0,
    minVocabulary: 12,
    minExercises: 12,
    minPrompts: 6,
    minSections: 7,
    blocks: [
      {
        id: 'structure',
        label: 'estrutura aprofundada da aula Writing',
        maxOutputTokens: 5000,
        instruction: [
          QUALITY_RULES,
          'Crie uma aula Writing A1 prática, longa e guiada.',
          'Retorne JSON com: type="writing", level, title, intro, objective, focus, sections e tips.',
          'sections deve ter 7 a 9 partes: modelo, análise do modelo, estrutura da frase, vocabulário útil, conectores, erros comuns, checklist e preparação para produção.',
          'Cada section deve ter title, content e examples.',
          'Cada content deve explicar bem, em português, com exemplos em inglês A1.',
          'tips deve ter 6 dicas práticas.',
        ].join('\n'),
      },
      {
        id: 'vocabulary',
        label: 'vocabulário Writing',
        maxOutputTokens: 3000,
        instruction: [
          QUALITY_RULES,
          'Crie vocabulário e conectores para escrita A1.',
          'Retorne JSON com apenas a chave vocabulary.',
          'vocabulary deve ter 12 a 16 itens com word, meaning e example.',
        ].join('\n'),
      },
      {
        id: 'exercises',
        label: 'microprática Writing',
        maxOutputTokens: 4400,
        instruction: [
          QUALITY_RULES,
          'Crie micropráticas de escrita.',
          'Retorne JSON com apenas a chave exercises.',
          'exercises deve ter 12 a 16 questões com question, options, answer e explanation.',
          'Misture completar frases, escolher ordem correta, corrigir frase e montar frase simples.',
        ].join('\n'),
      },
      {
        id: 'production',
        label: 'produção Writing',
        maxOutputTokens: 2400,
        instruction: [
          QUALITY_RULES,
          'Crie prompts de escrita final.',
          'Retorne JSON com apenas a chave prompts.',
          'prompts deve ter 6 a 8 comandos graduais para o aluno escrever frases, revisar e montar um parágrafo curto.',
        ].join('\n'),
      },
    ],
  },
};

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

function getBlueprint(type) {
  return LESSON_BLUEPRINTS[type] || LESSON_BLUEPRINTS.reading;
}

function assertLessonBlock(block, data, blueprint) {
  if (!data || typeof data !== 'object') throw new Error(`Bloco ${block.label} retornou JSON inválido.`);

  if (block.id === 'structure') {
    if (!normalizeText(data.title)) throw new Error('Bloco estrutura veio sem título.');
    if (!normalizeText(data.intro) || normalizeText(data.intro).length < 120) throw new Error('Bloco estrutura veio com introdução curta demais.');
    if (!normalizeText(data.objective)) throw new Error('Bloco estrutura veio sem objetivo.');
    if (ensureArray(data.sections).length < blueprint.minSections) throw new Error('Bloco estrutura veio com poucas seções.');
  }

  if (block.id === 'mainContent') {
    const text = normalizeText(data.listeningText);
    if (text.length < blueprint.minMainLength) throw new Error('Conteúdo principal ficou curto demais.');
  }

  if (block.id === 'vocabulary') {
    if (ensureArray(data.vocabulary).length < blueprint.minVocabulary) throw new Error('Vocabulário insuficiente.');
  }

  if (block.id === 'exercises') {
    const exercises = ensureArray(data.exercises);
    if (exercises.length < blueprint.minExercises) throw new Error('Exercícios insuficientes.');
    const hasInvalidAnswer = exercises.some((item) => {
      const options = ensureArray(item?.options);
      return options.length && !options.includes(item?.answer);
    });
    if (hasInvalidAnswer) throw new Error('Um exercício veio com resposta fora das alternativas.');
  }

  if (block.id === 'production') {
    if (ensureArray(data.prompts).length < blueprint.minPrompts) throw new Error('Produção final insuficiente.');
  }
}

function validateGeneratedLesson(lesson) {
  const normalized = normalizeLesson(lesson);
  const blueprint = getBlueprint(normalized.type);
  const hasCore = normalized.title && normalized.type && normalized.level;
  const hasStudyContent =
    normalized.intro ||
    normalized.sections.length > 0 ||
    normalized.vocabulary.length > 0 ||
    normalized.exercises.length > 0 ||
    normalized.listeningText ||
    normalized.prompts.length > 0;

  if (!hasCore) throw new Error('Aula sem título, tipo ou nível.');
  if (!hasStudyContent) throw new Error('Aula sem conteúdo de estudo suficiente.');
  if (normalized.sections.length < blueprint.minSections) throw new Error('Aula com poucas seções explicativas.');

  if ((normalized.type === 'reading' || normalized.type === 'listening') && (!normalized.listeningText || normalized.listeningText.length < blueprint.minMainLength)) {
    throw new Error('Aula sem texto/transcrição principal suficiente.');
  }

  if (normalized.vocabulary.length < blueprint.minVocabulary) throw new Error('Aula com vocabulário insuficiente.');
  if (normalized.exercises.length < blueprint.minExercises) throw new Error('Aula com exercícios insuficientes.');
  if (normalized.prompts.length < blueprint.minPrompts) throw new Error('Aula com produção final insuficiente.');

  return normalized;
}

function buildBlockPrompt({ block, blueprint, basePrompt, lessonType, partialLesson, retryReason = '' }) {
  return [
    'Você é o gerador de aulas do Fluency.',
    'Retorne APENAS JSON válido. Não use markdown. Não use **negrito**. Não use listas com asterisco.',
    'O JSON deve ser completo, fechado corretamente e parseável por JSON.parse.',
    'Crie conteúdo para aluno brasileiro aprender inglês com uma aula séria, clara, profunda, longa e organizada.',
    'IMPORTANTE: esta aula NÃO pode ser curta. Se o tema for simples, aprofunde com exemplos, prática, repetição guiada e revisão.',
    retryReason ? `Correção obrigatória da tentativa anterior: ${retryReason}` : '',
    `Tipo de aula escolhido pelo app: ${blueprint.label} (${lessonType}).`,
    'Nível padrão: A1, salvo se o pedido do app indicar outro nível claramente.',
    '',
    'Pedido original do app:',
    String(basePrompt ?? 'Gerar uma aula de inglês A1 do dia.'),
    '',
    partialLesson ? 'Conteúdo já aprovado nos blocos anteriores:' : '',
    partialLesson ? JSON.stringify(partialLesson).slice(0, 9000) : '',
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
      temperature: 0.24,
      maxOutputTokens,
      responseMimeType: 'application/json',
    },
  };

  const response = await fetcher(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response || typeof response.ok === 'undefined') throw new Error('Gemini retornou resposta vazia.');

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`HTTP ${response.status} ${text.slice(0, 180)}`);
  }

  const data = await response.json();
  const text = extractTextFromGemini(data);
  return parseLessonJson(text);
}

function composeLessonFromBlocks(blockResults, lessonType) {
  return {
    type: blockResults.structure?.type || lessonType,
    level: blockResults.structure?.level || 'A1',
    title: blockResults.structure?.title || `${getBlueprint(lessonType).label} A1`,
    intro: blockResults.structure?.intro || '',
    objective: blockResults.structure?.objective || '',
    focus: blockResults.structure?.focus || '',
    sections: ensureArray(blockResults.structure?.sections),
    tips: ensureArray(blockResults.structure?.tips),
    listeningText: blockResults.mainContent?.listeningText || '',
    vocabulary: ensureArray(blockResults.vocabulary?.vocabulary),
    exercises: ensureArray(blockResults.exercises?.exercises),
    prompts: ensureArray(blockResults.production?.prompts),
  };
}

async function generateBlockWithRetry({ attempt, prompt, fetcher, lessonType, blueprint, block, blockResults, blockLabel }) {
  let retryReason = '';

  for (let retry = 0; retry <= BLOCK_RETRY_LIMIT; retry += 1) {
    try {
      if (retry > 0) diagnostics.log(`Regerando bloco ${blockLabel} por qualidade/JSON: ${retryReason}`, 'info');

      const data = await callGeminiJson({
        attempt,
        prompt: buildBlockPrompt({
          block,
          blueprint,
          lessonType,
          basePrompt: prompt,
          partialLesson: Object.keys(blockResults).length ? composeLessonFromBlocks(blockResults, lessonType) : null,
          retryReason,
        }),
        maxOutputTokens: attempt.paid ? Math.max(block.maxOutputTokens, 5200) : block.maxOutputTokens,
        fetcher,
      });

      assertLessonBlock(block, data, blueprint);
      return data;
    } catch (error) {
      retryReason = error?.message || String(error);
      if (retry >= BLOCK_RETRY_LIMIT) throw error;
    }
  }

  throw new Error(`Bloco ${block.label} falhou após retries.`);
}

async function callGeminiInBlocks({ attempt, prompt, fetcher, lessonType }) {
  const blueprint = getBlueprint(lessonType);
  const blockResults = {};

  for (let index = 0; index < blueprint.blocks.length; index += 1) {
    const block = blueprint.blocks[index];
    const blockLabel = `${index + 1}/${blueprint.blocks.length}`;
    diagnostics.setPhase(`gerando bloco ${blockLabel}`, GEMINI_LESSON_STATUS.generating);
    diagnostics.log(`Bloco ${blockLabel}: gerando ${block.label}.`, 'info');

    const data = await generateBlockWithRetry({
      attempt,
      prompt,
      fetcher,
      lessonType,
      blueprint,
      block,
      blockResults,
      blockLabel,
    });

    blockResults[block.id] = data;
    diagnostics.log(`Bloco ${blockLabel} aprovado: ${block.label}.`, 'info');
  }

  return validateGeneratedLesson(composeLessonFromBlocks(blockResults, lessonType));
}

function summarizeFinalError({ quotaKeys, modelErrors, lastError, attempts }) {
  if (quotaKeys.size && quotaKeys.size >= new Set(attempts.map((attempt) => attempt.key)).size) {
    return 'Todas as keys de aula disponíveis bateram quota/limite. Adicione outra key ou tente novamente mais tarde.';
  }

  if (modelErrors > 0 && !lastError) return 'Os modelos disponíveis não estão aceitando geração agora.';

  const status = getHttpStatus(lastError);
  if (status === 503) return 'O Gemini respondeu alta demanda temporária. Tente gerar novamente em alguns minutos.';
  if (status === 429) return 'A key usada atingiu quota/limite. Adicione outra key de aula ou aguarde a renovação da quota.';
  if (status === 404) return 'Modelo Gemini indisponível para esta API. A lista de modelos foi ajustada; tente novamente após atualizar o preview.';

  return lastError?.message || 'Falha ao gerar aula.';
}

export async function generateLessonDraft({ prompt, keys = [], proKey = '', fetcher = fetch } = {}) {
  const attempts = buildAttempts({ keys, proKey });
  const lessonType = inferLessonTypeFromText(prompt);
  const blueprint = getBlueprint(lessonType);

  diagnostics.setPhase('preparando geração de aula em blocos', GEMINI_LESSON_STATUS.generating);
  diagnostics.log(`Tipo de aula detectado: ${blueprint.label}.`, 'info');
  diagnostics.log(`Critério de qualidade: longa, profunda, ${blueprint.minExercises}+ exercícios, ${blueprint.minVocabulary}+ vocabulários.`, 'info');
  diagnostics.log(`Plano de geração em blocos: ${attempts.length} tentativa(s), ${blueprint.blocks.length} bloco(s) por tentativa.`, 'info');

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
      const lesson = await callGeminiInBlocks({ attempt, prompt, fetcher, lessonType });
      diagnostics.setPhase('aula gerada em blocos', GEMINI_LESSON_STATUS.success);
      diagnostics.log(`Aula ${blueprint.label} longa e validada com ${attempt.model}.`, 'info');
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
