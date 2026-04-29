import { diagnostics } from './diagnostics.js';
import { normalizeLesson } from './lessonTypes.js';

export const GEMINI_LESSON_STATUS = {
  idle: 'idle',
  missingKeys: 'missing-keys',
  generating: 'generating',
  success: 'success',
  error: 'error',
};

const FLASH_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
const PRO_MODELS = ['gemini-2.5-pro', 'gemini-1.5-pro'];

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

  return normalized;
}

function buildPrompt(basePrompt) {
  return [
    'Você é o gerador de aulas do Fluency.',
    'Retorne APENAS JSON válido, sem markdown.',
    'Crie uma aula completa, profunda e organizada para o aluno brasileiro aprender inglês.',
    'Campos obrigatórios: type, level, title, intro, sections, vocabulary, exercises, tips, listeningText.',
    'Use type como um destes valores: reading, grammar, listening, speaking, writing, vocabulary.',
    'Explique em português quando necessário, mas use exemplos em inglês natural.',
    'Prompt do app:',
    String(basePrompt ?? 'Gerar uma aula de inglês A1 do dia.'),
  ].join('\n\n');
}

async function callGemini({ attempt, prompt, fetcher }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(attempt.model)}:generateContent?key=${encodeURIComponent(attempt.key)}`;
  const body = {
    contents: [{ role: 'user', parts: [{ text: buildPrompt(prompt) }] }],
    generationConfig: {
      temperature: 0.45,
      maxOutputTokens: attempt.paid ? 8000 : 5000,
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
  const parsed = parseLessonJson(text);
  return validateGeneratedLesson(parsed);
}

export async function generateLessonDraft({ prompt, keys = [], proKey = '', fetcher = fetch } = {}) {
  const attempts = buildAttempts({ keys, proKey });

  diagnostics.setPhase('preparando geração de aula', GEMINI_LESSON_STATUS.generating);
  diagnostics.log(`Plano de geração: ${attempts.length} tentativa(s).`, 'info');

  if (!attempts.length) {
    diagnostics.log('Nenhuma key Gemini válida configurada para aulas.', 'error');
    return {
      status: GEMINI_LESSON_STATUS.missingKeys,
      lesson: null,
      error: 'Nenhuma key Gemini válida configurada para aulas.',
    };
  }

  let lastError = null;

  for (let index = 0; index < attempts.length; index += 1) {
    const attempt = attempts[index];
    const attemptLabel = `${index + 1}/${attempts.length}`;

    diagnostics.setPhase(`gerando aula ${attemptLabel}`, GEMINI_LESSON_STATUS.generating);
    diagnostics.log(
      `Tentativa ${attemptLabel}: ${attempt.model} com key ${attempt.masked}${attempt.paid ? ' (Pro fallback)' : ' (Flash/free)'}`,
      'info'
    );

    try {
      const lesson = await callGemini({ attempt, prompt, fetcher });
      diagnostics.setPhase('aula gerada', GEMINI_LESSON_STATUS.success);
      diagnostics.log(`Aula gerada e validada com ${attempt.model}.`, 'info');
      return { status: GEMINI_LESSON_STATUS.success, lesson, error: null };
    } catch (error) {
      lastError = error;
      diagnostics.log(`Falha na tentativa ${attemptLabel}: ${error?.message || error}`, attempt.paid ? 'error' : 'info');
    }
  }

  diagnostics.setPhase('falha na geração de aula', GEMINI_LESSON_STATUS.error);
  return {
    status: GEMINI_LESSON_STATUS.error,
    lesson: null,
    error: lastError?.message || 'Falha ao gerar aula.',
  };
}
