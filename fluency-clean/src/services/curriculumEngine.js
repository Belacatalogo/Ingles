import { CURRICULUM_PILLARS, getStaticCurriculum, getStaticLessons, getStaticLevel } from '../content/curriculum/index.js';
import { getCompletedLessonIds, getLessonLockReason, isStaticLessonReady, summarizePillarProgress } from './lessonProgression.js';
import { evaluateStaticLevelGate } from './masteryGate.js';
import { storage } from './storage.js';

const STATIC_COURSE_STATE_KEY = 'staticCurriculum.state.v1';

function safeObject(value) { return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; }
function safeArray(value) { return Array.isArray(value) ? value : []; }
function clean(value) { return String(value || '').trim(); }

export function getStaticCourseState() {
  const stored = safeObject(storage.get(STATIC_COURSE_STATE_KEY, {}));
  return {
    currentLevel: clean(stored.currentLevel) || 'A1',
    preferredPillar: clean(stored.preferredPillar) || '',
    lastOpenedLessonId: clean(stored.lastOpenedLessonId) || '',
    updatedAt: stored.updatedAt || '',
  };
}

export function saveStaticCourseState(patch = {}) {
  const next = { ...getStaticCourseState(), ...safeObject(patch), updatedAt: new Date().toISOString() };
  storage.set(STATIC_COURSE_STATE_KEY, next);
  return next;
}

export function setStaticCurrentLevel(level = 'A1') {
  const curriculum = getStaticCurriculum();
  const nextLevel = curriculum.levels[level] ? level : 'A1';
  return saveStaticCourseState({ currentLevel: nextLevel });
}

export function getStaticCourseSummary(level = getStaticCourseState().currentLevel) {
  const staticLevel = getStaticLevel(level);
  const completedIds = getCompletedLessonIds();
  const pillars = Object.fromEntries(
    CURRICULUM_PILLARS.map((pillar) => [pillar, summarizePillarProgress(staticLevel.pillars?.[pillar] || [], completedIds)]),
  );
  const lessons = safeArray(getStaticLessons(level));
  const readyLessons = lessons.filter(isStaticLessonReady);
  const total = lessons.length;
  const readyTotal = readyLessons.length;
  const completed = lessons.filter((lesson) => completedIds?.has?.(lesson.id)).length;
  const readyCompleted = readyLessons.filter((lesson) => completedIds?.has?.(lesson.id)).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const readyPercent = readyTotal ? Math.round((readyCompleted / readyTotal) * 100) : 0;
  const gate = evaluateStaticLevelGate(level, { completedIds });
  return {
    version: getStaticCurriculum().version,
    level,
    title: staticLevel.title,
    description: staticLevel.description,
    total,
    readyTotal,
    completed,
    readyCompleted,
    pending: Math.max(0, total - completed),
    readyPending: Math.max(0, readyTotal - readyCompleted),
    percent,
    readyPercent,
    packages: staticLevel.packages || [],
    pillars,
    gate,
  };
}

export function getNextStaticLesson(level = getStaticCourseState().currentLevel) {
  const state = getStaticCourseState();
  const staticLevel = getStaticLevel(level);
  const completedIds = getCompletedLessonIds();
  const pillarOrder = state.preferredPillar && CURRICULUM_PILLARS.includes(state.preferredPillar)
    ? [state.preferredPillar, ...CURRICULUM_PILLARS.filter((pillar) => pillar !== state.preferredPillar)]
    : CURRICULUM_PILLARS;

  for (const pillar of pillarOrder) {
    const lesson = safeArray(staticLevel.pillars?.[pillar]).find((item) => !completedIds?.has?.(item.id) && !getLessonLockReason(item, completedIds));
    if (lesson) return { lesson, lockReason: '', level, pillar };
  }

  const planned = CURRICULUM_PILLARS
    .flatMap((pillar) => safeArray(staticLevel.pillars?.[pillar]))
    .find((item) => !completedIds?.has?.(item.id));

  return planned ? { lesson: planned, lockReason: getLessonLockReason(planned, completedIds), level, pillar: planned.pillar } : { lesson: null, lockReason: '', level, pillar: '' };
}

export function getStaticLessonById(lessonId, level = getStaticCourseState().currentLevel) {
  return safeArray(getStaticLessons(level)).find((lesson) => lesson.id === lessonId) || null;
}

export function markStaticLessonOpened(lessonId) {
  return saveStaticCourseState({ lastOpenedLessonId: lessonId });
}
