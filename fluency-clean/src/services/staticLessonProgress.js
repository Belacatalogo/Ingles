import { storage } from './storage.js';

const STATIC_LESSON_PROGRESS_KEY = 'staticCurriculum.lessonProgress.v1';

function clean(value) { return String(value ?? '').trim(); }
function safeObject(value) { return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; }
function safeArray(value) { return Array.isArray(value) ? value : []; }
function lessonIdOf(lesson) { return clean(lesson?.id || lesson?.curriculumId || lesson?.title || ''); }

export function getStaticLessonProgressMap() {
  return safeObject(storage.get(STATIC_LESSON_PROGRESS_KEY, {}));
}

export function getStaticLessonProgress(lessonOrId) {
  const lessonId = typeof lessonOrId === 'string' ? clean(lessonOrId) : lessonIdOf(lessonOrId);
  return safeObject(getStaticLessonProgressMap()[lessonId]);
}

function updateStaticLessonProgress(lesson, patch = {}) {
  const lessonId = lessonIdOf(lesson);
  if (!lessonId) return null;
  const currentMap = getStaticLessonProgressMap();
  const current = safeObject(currentMap[lessonId]);
  const now = new Date().toISOString();
  const next = {
    ...current,
    lessonId,
    title: lesson?.title || current.title || lessonId,
    level: lesson?.level || current.level || 'A1',
    pillar: lesson?.pillar || lesson?.type || current.pillar || 'lesson',
    updatedAt: now,
    ...patch,
  };
  storage.set(STATIC_LESSON_PROGRESS_KEY, { ...currentMap, [lessonId]: next });
  return next;
}

export function markStaticLessonOpened(lesson) {
  const previous = getStaticLessonProgress(lesson);
  return updateStaticLessonProgress(lesson, {
    openedAt: previous.openedAt || new Date().toISOString(),
    openCount: Number(previous.openCount || 0) + 1,
  });
}

export function saveStaticLessonProduction(lesson, value) {
  const text = clean(value);
  return updateStaticLessonProgress(lesson, {
    productionText: text,
    productionWordCount: text ? text.split(/\s+/).filter(Boolean).length : 0,
    productionUpdatedAt: new Date().toISOString(),
  });
}

export function markStaticLessonGateAttempt(lesson, gateReport) {
  const previous = getStaticLessonProgress(lesson);
  return updateStaticLessonProgress(lesson, {
    gateAttempts: [...safeArray(previous.gateAttempts), { at: new Date().toISOString(), passed: Boolean(gateReport?.passed), missing: safeArray(gateReport?.missing).slice(0, 12) }].slice(-20),
    lastGateReport: gateReport,
  });
}

export function hasStaticLessonOpened(lessonOrId) {
  return Boolean(getStaticLessonProgress(lessonOrId).openedAt);
}

export function getStaticLessonProductionText(lessonOrId) {
  return clean(getStaticLessonProgress(lessonOrId).productionText);
}
