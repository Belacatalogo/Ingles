import { getLessonCompletions, getPracticeSessions } from './progressStore.js';

function safeArray(value) { return Array.isArray(value) ? value : []; }
function normalizeId(value) { return String(value || '').trim(); }
function normalizeStatus(value) { return String(value || '').trim().toLowerCase(); }

export function getCompletedLessonIds() {
  return new Set(
    safeArray(getLessonCompletions())
      .filter((item) => item && typeof item === 'object')
      .flatMap((item) => [item.lessonId, item.curriculumId, item.staticLessonId, item.id])
      .map(normalizeId)
      .filter(Boolean),
  );
}

export function isStaticLessonReady(lesson) {
  return normalizeStatus(lesson?.status) === 'ready'
    && normalizeId(lesson?.schemaVersion).startsWith('static-lesson-schema');
}

export function isStaticLessonCompleted(lesson, completedIds = getCompletedLessonIds()) {
  if (!lesson?.id || !completedIds?.has) return false;
  return completedIds.has(lesson.id);
}

export function arePrerequisitesCompleted(lesson, completedIds = getCompletedLessonIds()) {
  if (!completedIds?.has) return false;
  const prerequisites = safeArray(lesson?.prerequisites).map(normalizeId).filter(Boolean);
  return prerequisites.every((id) => completedIds.has(id));
}

export function getLessonLockReason(lesson, completedIds = getCompletedLessonIds()) {
  if (!lesson) return 'Aula não encontrada.';
  if (isStaticLessonCompleted(lesson, completedIds)) return '';

  const status = normalizeStatus(lesson.status || 'planned');
  if (status !== 'ready') {
    if (status === 'planned') return 'Aula planejada, mas o conteúdo real ainda não foi implementado.';
    return `Aula com status ${lesson.status}.`;
  }

  if (!normalizeId(lesson.schemaVersion).startsWith('static-lesson-schema')) {
    return 'Aula pronta sem schema fixo válido.';
  }

  const missing = safeArray(lesson.prerequisites).filter((id) => id && !completedIds.has(id));
  if (missing.length) return `Complete primeiro: ${missing.join(', ')}.`;
  return '';
}

export function getPracticeStatsByLesson() {
  const stats = new Map();
  for (const session of safeArray(getPracticeSessions()).filter((item) => item && typeof item === 'object')) {
    const lessonId = normalizeId(session.lessonId);
    if (!lessonId) continue;
    const current = stats.get(lessonId) || { attempts: 0, bestAccuracy: 0, lastAccuracy: 0, total: 0, correct: 0 };
    const accuracy = Number(session.accuracy || 0);
    stats.set(lessonId, {
      attempts: current.attempts + 1,
      bestAccuracy: Math.max(current.bestAccuracy, accuracy),
      lastAccuracy: accuracy,
      total: current.total + Number(session.total || 0),
      correct: current.correct + Number(session.correct || 0),
    });
  }
  return stats;
}

export function summarizePillarProgress(lessons = [], completedIds = getCompletedLessonIds()) {
  const safeLessons = safeArray(lessons).filter((lesson) => lesson && typeof lesson === 'object');
  const total = safeLessons.length;
  const completed = safeLessons.filter((lesson) => isStaticLessonCompleted(lesson, completedIds)).length;
  const ready = safeLessons.filter(isStaticLessonReady).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  return { total, ready, completed, pending: Math.max(0, total - completed), percent };
}

export function findNextUnlockedLesson(lessons = [], completedIds = getCompletedLessonIds()) {
  return safeArray(lessons)
    .filter((lesson) => lesson && typeof lesson === 'object')
    .find((lesson) => !isStaticLessonCompleted(lesson, completedIds) && !getLessonLockReason(lesson, completedIds)) || null;
}
