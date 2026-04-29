import { diagnostics } from './diagnostics.js';
import { normalizeLesson } from './lessonTypes.js';

export const GEMINI_LESSON_STATUS = {
  idle: 'idle',
  missingKeys: 'missing-keys',
  generating: 'generating',
  success: 'success',
  error: 'error',
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

export async function generateLessonDraft({ prompt, keys = [], proKey = '', fetcher = fetch } = {}) {
  const lessonKeys = normalizeLessonKeys(keys);
  const paidKey = normalizeLessonKeys([proKey])[0] ?? '';

  diagnostics.setPhase('preparando geração de aula', GEMINI_LESSON_STATUS.generating);
  diagnostics.log(`Keys de aula disponíveis: ${lessonKeys.length}${paidKey ? ' + Pro fallback' : ''}`, 'info');

  if (!lessonKeys.length && !paidKey) {
    diagnostics.log('Nenhuma key Gemini válida configurada para aulas.', 'error');
    return {
      status: GEMINI_LESSON_STATUS.missingKeys,
      lesson: null,
      error: 'Nenhuma key Gemini válida configurada para aulas.',
    };
  }

  // Fachada criada no Bloco 3. A chamada real será implementada no Bloco 5,
  // quando as chaves exclusivas, multikeys e fallback Pro forem migrados com segurança.
  diagnostics.log('Fachada Gemini pronta. Chamada real será ligada no Bloco 5.', 'info', {
    promptPreview: String(prompt ?? '').slice(0, 140),
    firstKey: maskApiKey(lessonKeys[0] ?? paidKey),
  });

  void fetcher;

  return {
    status: GEMINI_LESSON_STATUS.idle,
    lesson: normalizeLesson({
      type: 'reading',
      level: 'A1',
      title: 'Reading — aula demonstrativa',
    }),
    error: null,
  };
}
