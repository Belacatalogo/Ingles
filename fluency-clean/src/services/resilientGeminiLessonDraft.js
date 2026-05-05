import { diagnostics } from './diagnostics.js';
import { inferLessonTypeFromText, normalizeLessonType } from './lessonTypes.js';
import { GEMINI_LESSON_STATUS, maskApiKey, normalizeLessonKeys } from './geminiLessons.js';
import { reviewLessonAsTeacher, attachTeacherReview } from './teacherReviewer.js';
import { AI_REVIEW_MAX_RETRIES, mergeReviews, reviewLessonWithAI, shouldRegenerateLesson } from './aiTeacherReviewer.js';
import { buildLessonHistoryPromptPrefix } from './lessonHistoryContext.js';

const FLASH_MODELS = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];
const PRO_MODELS = ['gemini-2.5-pro'];

function clean(value) { return String(value ?? '').trim(); }
function ensureArray(value) { return Array.isArray(value) ? value : []; }

function extractTextFromGemini(data) {
  const parts = data?.candidates?.[0]?.content?.parts;
  return Array.isArray(parts) ? parts.map((part) => part?.text ?? '').join('\n').trim() : '';
}

function stripFences(value) {
  return clean(value).replace(/^```(?:json)?\s*/i, '').replace(/```$/i, '').trim();
}

function extractBalancedJsonObjectText(value) {
  const text = stripFences(value);
  const start = text.indexOf('{');
  if (start < 0) return text;

  let inString = false;
  let escaped = false;
  let depth = 0;

  for (let index = start; index < text.length; index += 1) {
    const char = text[index];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (char === '\\') {
      escaped = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return text.slice(start, index + 1);
    }
  }

  const end = text.lastIndexOf('}');
  return end > start ? text.slice(start, end + 1) : text.slice(start);
}

function extractJsonObjectText(value) {
  return extractBalancedJsonObjectText(value);
}

function unescapeSerializedJson(value) {
  let text = stripFences(value);
  try {
    const parsed = JSON.parse(text);
    if (typeof parsed === 'string') text = parsed;
    else if (parsed && typeof parsed === 'object') return JSON.stringify(parsed);
  } catch {
    // segue para reparos textuais
  }
  text = extractJsonObjectText(text);
  if (/^\{\\"/.test(text) || /\\"(?:type|title|level|sections|vocabulary|exercises|prompts|listeningText|readingText)\\"/.test(text)) {
    text = text.replace(/\\"/g, '"').replace(/\\\\n/g, '\\n').replace(/\\\\r/g, '').replace(/\\\\t/g, ' ');
  }
  return extractJsonObjectText(text);
}

function repairJsonText(value) {
  return unescapeSerializedJson(value)
    .replace(/[\u0000-\u001F\u007F]/g, (char) => (char === '\n' ? '\\n' : char === '\r' ? '' : char === '\t' ? ' ' : ' '))
    .replace(/\\'/g, "'")
    .replace(/\\(?!["\\/bfnrtu])/g, '\\\\')
    .replace(/,\s*([}\]])/g, '$1');
}

export function parseResilientGeminiJson(text) {
  const candidates = [extractJsonObjectText(text), unescapeSerializedJson(text), repairJsonText(text)];
  let lastError = null;
  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate);
      return typeof parsed === 'string' ? JSON.parse(unescapeSerializedJson(parsed)) : parsed;
    } catch (error) {
      lastError = error;
    }
  }
  throw new Error(`JSON resiliente falhou: ${lastError?.message || lastError}. Preview: ${clean(text).slice(0, 220).replace(/\s+/g, ' ')}`);
}

function resolveLessonType({ prompt = '', forcedType = '' } = {}) {
  const normalized = normalizeLessonType(forcedType);
  return normalized && normalized !== 'default' ? normalized : inferLessonTypeFromText(prompt);
}

function buildAttempts({ keys = [], proKey = '' }) {
  const lessonKeys = normalizeLessonKeys(keys);
  const paidKey = normalizeLessonKeys([proKey])[0] ?? '';
  const attempts = [];
  for (const key of lessonKeys) for (const model of FLASH_MODELS) attempts.push({ key, model, paid: false, masked: maskApiKey(key) });
  if (paidKey) for (const model of PRO_MODELS) attempts.push({ key: paidKey, model, paid: true, masked: maskApiKey(paidKey) });
  return attempts;
}

function buildPrompt({ prompt, lessonType, level, aiReviewHint = '' }) {
  const historyPrefix = buildLessonHistoryPromptPrefix({ lessonType, level });
  return [
    historyPrefix,
    'Você é o gerador resiliente de aulas do Fluency.',
    'Retorne SOMENTE JSON válido. Sem markdown, comentários ou texto fora do JSON.',
    'A resposta deve começar com { e terminar com }. Não devolva JSON como string escapada.',
    'Use um objeto com: type, level, title, intro, objective, focus, sections, tips, listeningText, vocabulary, exercises e prompts.',
    `Tipo obrigatório da aula: ${lessonType}.`,
    `Nível obrigatório: ${level || 'A1'}.`,
    aiReviewHint ? `Correção obrigatória do professor revisor: ${clean(aiReviewHint)}.` : '',
    'A aula deve ser completa, clara e adequada ao nível, mas o JSON precisa ser estável e fechado.',
    'Para reading/listening, listeningText deve ter 260 a 340 palavras, com começo, meio e fechamento.',
    'sections deve ter 6 a 7 itens; vocabulary 12 a 16; exercises 12 a 16; prompts 5 a 7.',
    'Inclua exercícios abertos e não revele resposta antes da tentativa.',
    'Evite aspas internas e barras invertidas dentro dos textos. Use frases simples com pontuação normal.',
    'Pedido original do cronograma:',
    clean(prompt) || 'Gerar aula de inglês A1.',
  ].filter(Boolean).join('\n');
}

function normalizeFallbackLesson(data, { lessonType, level }) {
  const mainText = clean(data?.listeningText || data?.readingText || data?.mainText || data?.text || data?.transcript);
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
    listeningText: mainText,
    vocabulary: ensureArray(data?.vocabulary).map((item) => ({
      word: clean(item?.word || item?.term),
      meaning: clean(item?.meaning || item?.translation),
      example: clean(item?.example || item?.sentence),
    })).filter((item) => item.word || item.meaning || item.example),
    exercises: ensureArray(data?.exercises || data?.readingQuestions).map((item, index) => ({
      question: clean(item?.question || item?.prompt || `Questão ${index + 1}`),
      options: ensureArray(item?.options).map(clean).filter(Boolean),
      answer: clean(item?.answer || item?.correctAnswer),
      explanation: clean(item?.explanation || item?.feedback || item?.evidence),
    })).filter((item) => item.question || item.answer || item.options.length),
    prompts: ensureArray(data?.prompts || data?.postReadingPrompts).map((item) => clean(item?.instruction || item?.prompt || item)).filter(Boolean),
    generationSeed: `resilient-${Date.now().toString(36)}`,
    planContract: 'resilient-json-v1+history-context+hard-parser-v2',
  };
}

async function callGemini({ attempt, prompt, fetcher }) {
  const base = 'https://generativelanguage.googleapis.com/v1beta/models/';
  const url = `${base}${encodeURIComponent(attempt.model)}:generateContent?key=${encodeURIComponent(attempt.key)}`;
  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.18, maxOutputTokens: attempt.paid ? 8200 : 6800, responseMimeType: 'application/json' },
  };
  const response = await fetcher(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  if (!response || typeof response.ok === 'undefined') throw new Error('Gemini retornou resposta vazia no fallback resiliente.');
  if (!response.ok) throw new Error(`HTTP ${response.status} ${(await response.text().catch(() => '')).slice(0, 180)}`);
  return parseResilientGeminiJson(extractTextFromGemini(await response.json()));
}

function attachMergedReview(lesson, mergedReview) {
  const reviewedLesson = attachTeacherReview(lesson, mergedReview);
  return {
    ...reviewedLesson,
    quality: {
      ...(reviewedLesson?.quality && typeof reviewedLesson.quality === 'object' ? reviewedLesson.quality : {}),
      aiReview: mergedReview.aiReview || null,
      aiReviewerVersion: mergedReview.aiReview?.reviewerVersion || null,
      historyContextApplied: true,
    },
  };
}

async function reviewAndMaybeRegenerate({ attempt, prompt, lessonType, level, keys, fetcher }) {
  let aiReviewHint = '';
  for (let retryCount = 0; retryCount <= AI_REVIEW_MAX_RETRIES; retryCount += 1) {
    const data = await callGemini({ attempt, prompt: buildPrompt({ prompt, lessonType, level, aiReviewHint }), fetcher });
    const lesson = normalizeFallbackLesson(data, { lessonType, level });
    const mechanicalReview = reviewLessonAsTeacher(lesson, { expectedLevel: level, expectedType: lessonType });
    const aiReview = await reviewLessonWithAI(lesson, { type: lessonType, level, apiKeys: keys, fetcher });
    const mergedReview = mergeReviews(mechanicalReview, aiReview);
    const { shouldRegenerate, reason } = shouldRegenerateLesson(aiReview);

    console.info(`[AI Reviewer] score: ${aiReview.score}, approved: ${aiReview.approved}`);
    diagnostics.log(`AI Teacher Reviewer: score ${aiReview.score}, approved=${aiReview.approved}, source=${aiReview.source}.`, aiReview.approved ? 'success' : 'warn');

    if (shouldRegenerate && retryCount < AI_REVIEW_MAX_RETRIES) {
      aiReviewHint = reason || aiReview.suggestedFix || 'melhorar qualidade pedagógica real';
      console.warn(`[AI Reviewer] Regenerando: ${aiReviewHint}`);
      diagnostics.log(`AI Teacher Reviewer reprovou a aula. Regenerando uma vez: ${aiReviewHint}`, 'warn');
      continue;
    }
    return attachMergedReview(lesson, mergedReview);
  }
  throw new Error('AI Teacher Reviewer não conseguiu finalizar a aula após regeneração.');
}

export async function generateResilientLessonDraft({ prompt, keys = [], proKey = '', fetcher = fetch, forcedType = '', level = 'A1' } = {}) {
  const lessonType = resolveLessonType({ prompt, forcedType });
  const attempts = buildAttempts({ keys, proKey });
  if (!attempts.length) return { status: GEMINI_LESSON_STATUS.missingKeys, lesson: null, error: 'Nenhuma key Gemini válida configurada para aulas.' };

  diagnostics.setPhase('fallback resiliente de JSON', GEMINI_LESSON_STATUS.generating);
  diagnostics.log('Fallback resiliente ativado para JSON truncado/escapado ou bloco curto.', 'warn');

  let lastError = null;
  for (let index = 0; index < attempts.length; index += 1) {
    const attempt = attempts[index];
    try {
      diagnostics.log(`Fallback resiliente ${index + 1}/${attempts.length}: ${attempt.model} com key ${attempt.masked}.`, 'info');
      const lesson = await reviewAndMaybeRegenerate({ attempt, prompt, lessonType, level, keys, fetcher });
      diagnostics.log(`Fallback resiliente conseguiu parsear JSON, revisar e montar aula ${lesson.type}.`, 'success');
      return { status: GEMINI_LESSON_STATUS.success, lesson, error: null };
    } catch (error) {
      lastError = error;
      diagnostics.log(`Fallback resiliente falhou na tentativa ${index + 1}: ${error?.message || error}`, 'warn');
    }
  }

  return { status: GEMINI_LESSON_STATUS.error, lesson: null, error: lastError?.message || 'Fallback resiliente falhou.' };
}
