import { diagnostics } from './diagnostics.js';
import { markCurriculumLessonComplete } from './curriculumPlan.js';
import { normalizeLesson } from './lessonTypes.js';
import { storage } from './storage.js';

const CURRENT_LESSON_KEY = 'lesson.current';
const LESSON_HISTORY_KEY = 'lesson.history';
const LESSON_DRAFT_PROMPT_KEY = 'lesson.promptDraft';
const LAST_GENERATION_STATUS_KEY = 'lesson.lastGenerationStatus';

function makeGenerationId(date = new Date()) {
  const stamp = date.toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
  return `gen-${stamp}-${Math.random().toString(36).slice(2, 6)}`;
}

function lessonTime(lesson) {
  const candidates = [
    lesson?.generationMeta?.savedAt,
    lesson?.savedAt,
    lesson?.generationMeta?.generatedAt,
    lesson?.updatedAt,
    lesson?.createdAt,
  ];
  const parsed = candidates.map((value) => Date.parse(value || '')).find((value) => Number.isFinite(value));
  return parsed || 0;
}

function findHistoryLessonByStatus(history = [], status = null) {
  if (!Array.isArray(history) || !status) return null;
  const statusId = status.id || '';
  const statusLessonId = status.lessonId || '';
  const statusTitle = status.lessonTitle || '';

  if (statusId) {
    const byGeneration = history.find((lesson) => lesson?.generationMeta?.id === statusId);
    if (byGeneration) return byGeneration;
  }

  if (statusLessonId) {
    const byLessonId = history.find((lesson) => lesson?.id === statusLessonId || lesson?.curriculumId === statusLessonId);
    if (byLessonId) return byLessonId;
  }

  if (statusTitle) {
    const byTitle = history.find((lesson) => lesson?.title === statusTitle || lesson?.expectedTitle === statusTitle);
    if (byTitle) return byTitle;
  }

  return null;
}

function getFreshestLessonRaw() {
  const current = storage.get(CURRENT_LESSON_KEY, null);
  const history = storage.get(LESSON_HISTORY_KEY, []);
  const latestHistory = Array.isArray(history) ? history[0] : null;
  const lastStatus = storage.get(LAST_GENERATION_STATUS_KEY, null);
  const statusLesson = findHistoryLessonByStatus(history, lastStatus);

  if (statusLesson) {
    const currentGenerationId = current?.generationMeta?.id || '';
    const statusGenerationId = statusLesson?.generationMeta?.id || '';
    const statusIsNewer = lessonTime(statusLesson) >= lessonTime(current);
    if (!current || statusGenerationId !== currentGenerationId || statusIsNewer) {
      storage.set(CURRENT_LESSON_KEY, statusLesson);
      diagnostics.log(`Aula atual sincronizada pelo último status salvo: ${statusLesson.title || 'sem título'}`, 'info');
      return statusLesson;
    }
  }

  if (!current) return latestHistory || null;
  if (!latestHistory) return current;

  const currentTime = lessonTime(current);
  const historyTime = lessonTime(latestHistory);
  const currentGenerationId = current?.generationMeta?.id || '';
  const historyGenerationId = latestHistory?.generationMeta?.id || '';

  if (historyTime > currentTime && historyGenerationId !== currentGenerationId) {
    storage.set(CURRENT_LESSON_KEY, latestHistory);
    diagnostics.log(`Aula atual sincronizada com histórico mais recente: ${latestHistory.title || 'sem título'}`, 'info');
    return latestHistory;
  }

  return current;
}

function notifyLessonUpdated(lesson, status) {
  try {
    window.dispatchEvent(new CustomEvent('fluency:lesson-updated', {
      detail: {
        lessonId: lesson?.id || '',
        lessonTitle: lesson?.title || '',
        generationId: lesson?.generationMeta?.id || '',
        status: status?.event || status?.message || 'saved',
        savedAt: lesson?.generationMeta?.savedAt || new Date().toISOString(),
      },
    }));
  } catch {
    // Event dispatch is best-effort. Storage remains the source of truth.
  }
}

export function getCurrentLesson() {
  const lesson = getFreshestLessonRaw();
  return lesson ? normalizeLesson(lesson) : null;
}

export function getCurrentLessonRaw() {
  return getFreshestLessonRaw();
}

export function getLastGenerationStatus() {
  return storage.get(LAST_GENERATION_STATUS_KEY, null);
}

export function saveGenerationStatus(status = {}) {
  const payload = {
    id: status.id || makeGenerationId(),
    event: status.event || 'unknown',
    message: status.message || '',
    lessonId: status.lessonId || '',
    lessonTitle: status.lessonTitle || '',
    contractVersion: status.contractVersion || '',
    pedagogicalScore: Number(status.pedagogicalScore || 0),
    source: status.source || 'unknown',
    variationMode: Boolean(status.variationMode),
    generationSeed: status.generationSeed || '',
    createdAt: status.createdAt || new Date().toISOString(),
  };
  storage.set(LAST_GENERATION_STATUS_KEY, payload);
  return payload;
}

export function saveCurrentLesson(lesson, meta = {}) {
  const now = new Date();
  const normalized = normalizeLesson(lesson);
  const previous = storage.get(CURRENT_LESSON_KEY, null);
  const existingMeta = previous?.generationMeta && typeof previous.generationMeta === 'object' ? previous.generationMeta : {};
  const variationMode = Boolean(meta.variationMode || lesson?.variationMode || lesson?.generationMeta?.variationMode);
  const generationMeta = {
    ...existingMeta,
    id: meta.generationId || lesson?.generationMeta?.id || makeGenerationId(now),
    source: meta.source || lesson?.generationMeta?.source || 'generated',
    status: meta.status || lesson?.generationMeta?.status || 'new',
    generatedAt: meta.generatedAt || lesson?.generationMeta?.generatedAt || now.toISOString(),
    savedAt: now.toISOString(),
    contractVersion: meta.contractVersion || lesson?.generationMeta?.contractVersion || lesson?.quality?.contractVersion || 'lesson-contract-v1',
    pedagogicalScore: Number(meta.pedagogicalScore || lesson?.pedagogicalReview?.overallScore || lesson?.quality?.pedagogicalScore || 0),
    autoRepaired: Boolean(meta.autoRepaired || lesson?.pedagogicalReview?.autoRepaired),
    variationMode,
    generationSeed: meta.generationSeed || lesson?.generationSeed || lesson?.generationMeta?.generationSeed || '',
    replacedPreviousLessonId: previous?.id || '',
    replacedPreviousGenerationId: previous?.generationMeta?.id || '',
  };
  const payload = { ...normalized, generationMeta };

  storage.set(CURRENT_LESSON_KEY, payload);

  const history = storage.get(LESSON_HISTORY_KEY, []);
  const nextHistory = [
    { ...payload, savedAt: now.toISOString() },
    ...history.filter((item) => item.generationMeta?.id !== payload.generationMeta?.id),
  ].slice(0, 30);

  storage.set(LESSON_HISTORY_KEY, nextHistory);
  const status = saveGenerationStatus({
    id: generationMeta.id,
    event: 'saved',
    message: variationMode ? 'Nova versão diferente gerada e salva.' : generationMeta.status === 'new' ? 'Nova aula gerada e salva.' : 'Aula salva.',
    lessonId: payload.id,
    lessonTitle: payload.title,
    contractVersion: generationMeta.contractVersion,
    pedagogicalScore: generationMeta.pedagogicalScore,
    source: generationMeta.source,
    variationMode: generationMeta.variationMode,
    generationSeed: generationMeta.generationSeed,
    createdAt: generationMeta.generatedAt,
  });
  diagnostics.log(`Aula salva: ${payload.title} · ${generationMeta.id}${variationMode ? ' · variação real' : ''}`, 'info');
  notifyLessonUpdated(payload, status);
  return payload;
}

export function completeCurrentLessonInCurriculum(lesson) {
  return markCurriculumLessonComplete(lesson);
}

export function clearCurrentLesson() {
  storage.remove(CURRENT_LESSON_KEY);
  const status = saveGenerationStatus({ event: 'cleared', message: 'Aula atual removida para gerar uma nova.', source: 'manual' });
  diagnostics.log('Aula atual removida.', 'info');
  notifyLessonUpdated(null, status);
}

export function getLessonHistory() {
  return storage.get(LESSON_HISTORY_KEY, []).map(normalizeLesson);
}

export function getLessonPromptDraft() {
  return storage.getText(
    LESSON_DRAFT_PROMPT_KEY,
    'Gerar a próxima aula do cronograma Fluency automaticamente, respeitando pré-requisitos, nível atual e ordem pedagógica.'
  );
}

export function saveLessonPromptDraft(prompt) {
  storage.setText(LESSON_DRAFT_PROMPT_KEY, prompt);
  return prompt;
}
