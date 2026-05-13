import { getLessonCompletions, getPracticeSessions } from './progressStore.js';

function safeArray(value) { return Array.isArray(value) ? value : []; }
function normalizeId(value) { return String(value || '').trim(); }

export function getCompletedLessonIds() {
  return new Set(
    safeArray(getLessonCompletions())
      .flatMap((item) => [item?.lessonId, item?.curriculumId])
      .map(normalizeId)
      .filter(Boolean),
  );
}

export function isStaticLessonCompleted(lesson, completedIds = getCompletedLessonIds()) {
  if (!lesson?.id) return false;
  return completedIds.has(lesson.id);
}

export function arePrerequisitesCompleted(lesson, completedIds = getCompletedLessonIds()) {
  const prerequisites = safeArray(lesson?.prerequisites).map(normalizeId).filter(Boolean);
  return prerequisites.every((id) => completedIds.has(id));
}

export function getLessonLockReason(lesson, completedIds = getCompletedLessonIds()) {
  if (!lesson) return 'Aula não encontrada.';
  if (isStaticLessonCompleted(lesson, completedIds)) return '';
  const missing = safeArray(lesson.prerequisites).filter((id) => id && !completedIds.has(id));
  if (missing.length) return `Complete primeiro: ${missing.join(', ')}.`;
  if (lesson.status && lesson.status !== 'ready' && lesson.status !== 'planned') return `Aula com status ${lesson.status}.`;
  return '';
}

export function getPracticeStatsByLesson() {
  const stats = new Map();
  for (const session of safeArray(getPracticeSessions())) {
    const lessonId = normalizeId(session?.lessonId);
    if (!lessonId) continue;
    const current = stats.get(lessonId) || { attempts: 0, bestAccuracy: 0, lastAccuracy: 0, total: 0, correct: 0 };
    const accuracy = Number(session?.accuracy || 0);
    stats.set(lessonId, {
      attempts: current.attempts + 1,
      bestAccuracy: Math.max(current.bestAccuracy, accuracy),
      lastAccuracy: accuracy,
      total: current.total + Number(session?.total || 0),
      correct: current.correct + Number(session?.correct || 0),
    });
  }
  return stats;
}

export function summarizePillarProgress(lessons = [], completedIds = getCompletedLessonIds()) {
  const total = lessons.length;
  const completed = lessons.filter((lesson) => isStaticLessonCompleted(lesson, completedIds)).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  return { total, completed, pending: Math.max(0, total - completed), percent };
}

export function findNextUnlockedLesson(lessons = [], completedIds = getCompletedLessonIds()) {
  return lessons.find((lesson) => !isStaticLessonCompleted(lesson, completedIds) && arePrerequisitesCompleted(lesson, completedIds)) || null;
}
