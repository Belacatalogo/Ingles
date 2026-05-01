import { diagnostics } from './diagnostics.js';
import { inferLessonTypeFromText, normalizeLessonType } from './lessonTypes.js';
import { maskApiKey, normalizeLessonKeys, GEMINI_LESSON_STATUS } from './geminiLessons.js';

const FLASH_MODELS = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];
const PRO_MODELS = ['gemini-2.5-pro'];

function clean(value) {
  return String(value ?? '').trim();
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function extractTextFromGemini(data) {
  const parts = data?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return '';
  return parts.map((part) => part?.text ?? '').join('\n').trim();
}

function stripFences(value) {
  return clean(value)
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```$/i, '')
    .trim();
}

function extractJsonObjectText(value) {
  const text = stripFences(value);
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  return start >= 0 && end > start ? text.slice(start, end + 1) : text;
}

function unescapeSerializedJson(value) {
  let text = stripFences(value);

  try {
    const parsed = JSON.parse(text);
    if (typeof parsed === 'string') text = parsed;
    else if (parsed && typeof parsed === 'object') return JSON.stringify(parsed);
  } catch {
    // continua com reparos textuais abaixo
  }

  text = extractJsonObjectText(text);

  if (/^\{\\"/.test(text) || /\\"(?:type|title|level|sections|vocabulary|exercises|prompts|listeningText)\\"/.test(text)) {
    text = text
      .replace(/\\"/g, '"')
      .replace(/\\\\n/g, '\\n')
      .replace(/\\\\r/g, '')
      .replace(/\\\\t/g, ' ');
  }

  return extractJsonObjectText(text);
}

function repairJsonText(value) {
  let text = unescapeSerializedJson(value);
  text = text.replace(/[\u0000-\u001F\u007F]/g, (char) => {
    if (char === '\n') return '\\n';
    if (char === '\r') return '';
    if (char === '\t') return ' ';
    return ' ';
  });
  text = text.replace(/\\'/g, "'");
  text = text.replace(/\\(?!["\\/bfnrtu])/g, '\\\\');
  text = text.replace(/,\s*([}\]])/g, '$1');
  return text;
}

export function parseResilientGeminiJson(text) {
  const candidates = [
    extractJsonObjectText(text),
    unescapeSerializedJson(text),
    repairJsonText(text),
  ];

  let lastError = null;
  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate);
      if (typeof parsed === 'string') return JSON.parse(unescapeSerializedJson(parsed));
      return parsed;
    } catch (error) {
      lastError = error;
    }
  }

  const preview = clean(text).slice(0, 220).replace(/\s+/g, ' ');
  throw new Error(`JSON resiliente falhou: ${lastError?.message || lastError}. Preview: ${preview}`);
}

function resolveLessonType({ prompt = '', forcedType = '' } = {}) {
  const normalized = normalizeLessonType(forcedType);
  if (normalized && normalized !== 'default') return normalized;
  return inferLessonTypeFromText(prompt);
}

function buildAttempts({ keys = [], proKey = '' }) {
  const lessonKeys = normalizeLessonKeys(keys);
  const paidKey = normalizeLessonKeys([proKey])[0] ?? '';
  const attempts = [];
  for (const key of lessonKeys) for (const model of FLASH_MODELS) attempts.push({ key, model, paid: false, masked: maskApiKey(key) });
  if (paidKey) for (const model of PRO_MODELS) attempts.push({ key: paidKey, model, paid: true, masked: maskApiKey(paidKey) });
  return attempts;
}

function buildPrompt({ prompt, lessonType, level }) {
  return [
    'Você é o gerador resiliente de aulas do Fluency.',
    'Retorne SOMENTE um objeto JSON real, sem markdown, sem comentários e sem texto fora do JSON.',
    'Se o modelo tentar escapar o JSON, corrija antes de responder: o primeiro caractere deve ser { e o último deve ser }.',
    'Nunca use {\\"type\\". Use {"type".',
    '',
    `Tipo obrigatório da aula: ${lessonType}.`,
    `Nível obrigatório: ${level || 'A1'}.`,
    '',
    'Formato obrigatório:',
    '{"type":"listening","level":"A1","title":"...","intro":"...","objective":"...","focus":"...","sections":[{"title":"...","content":"..."}],"tips":["..."],"listeningText":"...","vocabulary":[{"word":"...","meaning":"...","example":"..."}],"exercises":[{"question":"...","options":["...","...","..."],"answer":"...","explanation":"..."}],"prompts":["..."]}',
    '',
    'Regras de qualidade:',
    '- Faça aula completa, não resumo.',
    '- Para listening/reading, listeningText deve ter 220 a 340 palavras.',
    '- sections deve ter 6 a 7 itens curtos e úteis.',
    '- vocabulary deve ter 12 a 16 itens.',
    '- exercises deve ter 12 a 16 questões.',
    '- Inclua pelo menos 3 exercícios abertos sem alternativas para evitar falso domínio.',
    '- prompts deve ter 5 a 7 comandos de produção ou shadowing.',
    '- Não revele resposta antes da tentativa; answer deve ficar apenas no campo answer.',
    '',
    'Pedido original do cronograma:',
    clean(prompt) || 'Gerar aula de inglês A1.',
  ].join('\n');
}

function normalizeFallbackLesson(data, { lessonType, level }) {
  return {
    type: clean(data?.type) || lessonType,
    level: clean(data?.level) || level || 'A1',
    title: clean(data?.title) || `${lessonType} ${level || 'A1'}`,
    intro: clean(data?.intro),
    objective: clean(data?.objective),
    focus: clean(data?.focus),
    sections: ensureArray(data?.sections).map((section, index) => ({
      title: clean(section?.title || `Parte ${index + 1}`),
      content: clean(section?.content || section?.text || section?.body),
    })).filter((section) => section.title || section.content),
    tips: ensureArray(data?.tips).map(clean).filter(Boolean),
    listeningText: clean(data?.listeningText),
    vocabulary: ensureArray(data?.vocabulary).map((item) => ({
      word: clean(item?.word || item?.term),
      meaning: clean(item?.meaning || item?.translation),
      example: clean(item?.example || item?.sentence),
    })).filter((item) => item.word || item.meaning || item.example),
    exercises: ensureArray(data?.exercises).map((item, index) => ({
      question: clean(item?.question || item?.prompt || `Questão ${index + 1}`),
      options: ensureArray(item?.options).map(clean).filter(Boolean),
      answer: clean(item?.answer || item?.correctAnswer),
      explanation: clean(item?.explanation || item?.feedback),
    })).filter((item) => item.question || item.answer || item.options.length),
    prompts: ensureArray(data?.prompts).map(clean).filter(Boolean),
    generationSeed: `resilient-${Date.now().toString(36)}`,
    planContract: 'resilient-json-v1',
  };
}

async function callGemini({ attempt, prompt, fetcher }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(attempt.model)}:generateContent?key=${encodeURIComponent(attempt.key)}`;
  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.22,
      maxOutputTokens: attempt.paid ? 7800 : 6200,
      responseMimeType: 'application/json',
    },
  };
  const response = await fetcher(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  if (!response || typeof response.ok === 'undefined') throw new Error('Gemini retornou resposta vazia no fallback resiliente.');
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`HTTP ${response.status} ${text.slice(0, 180)}`);
  }
  const data = await response.json();
  return parseResilientGeminiJson(extractTextFromGemini(data));
}

export async function generateResilientLessonDraft({ prompt, keys = [], proKey = '', fetcher = fetch, forcedType = '', level = 'A1' } = {}) {
  const lessonType = resolveLessonType({ prompt, forcedType });
  const attempts = buildAttempts({ keys, proKey });
  if (!attempts.length) return { status: GEMINI_LESSON_STATUS.missingKeys, lesson: null, error: 'Nenhuma key Gemini válida configurada para aulas.' };

  diagnostics.setPhase('fallback resiliente de JSON', GEMINI_LESSON_STATUS.generating);
  diagnostics.log('Geração em blocos falhou por JSON escapado. Acionando fallback resiliente.', 'warn');

  let lastError = null;
  for (let index = 0; index < attempts.length; index += 1) {
    const attempt = attempts[index];
    try {
      diagnostics.log(`Fallback resiliente ${index + 1}/${attempts.length}: ${attempt.model} com key ${attempt.masked}.`, 'info');
      const data = await callGemini({ attempt, prompt: buildPrompt({ prompt, lessonType, level }), fetcher });
      const lesson = normalizeFallbackLesson(data, { lessonType, level });
      diagnostics.log(`Fallback resiliente conseguiu parsear JSON e montar aula ${lesson.type}.`, 'success');
      return { status: GEMINI_LESSON_STATUS.success, lesson, error: null };
    } catch (error) {
      lastError = error;
      diagnostics.log(`Fallback resiliente falhou na tentativa ${index + 1}: ${error?.message || error}`, 'warn');
    }
  }

  return { status: GEMINI_LESSON_STATUS.error, lesson: null, error: lastError?.message || 'Fallback resiliente falhou.' };
}
