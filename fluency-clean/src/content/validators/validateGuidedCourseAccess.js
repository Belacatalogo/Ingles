import { CURRICULUM_PILLARS, getStaticLevel } from '../curriculum/index.js';
import { getLessonLockReason, isStaticLessonReady } from '../../services/lessonProgression.js';

function safeArray(value) { return Array.isArray(value) ? value : []; }
function asSet(values = []) { return values instanceof Set ? values : new Set(safeArray(values).filter(Boolean)); }
function sameLesson(a, b) { return Boolean(a?.id && b?.id && a.id === b.id); }
function issue(code, message, severity = 'error', meta = {}) { return { code, message, severity, ...meta }; }

function getAllLevelLessons(level = 'A1') {
  const currentLevel = getStaticLevel(level);
  return CURRICULUM_PILLARS.flatMap((pillar) => safeArray(currentLevel.pillars?.[pillar]));
}

function getGuidedNextLessonForCompletedIds(level = 'A1', completedIds = new Set()) {
  const currentLevel = getStaticLevel(level);
  for (const pillar of CURRICULUM_PILLARS) {
    const lesson = safeArray(currentLevel.pillars?.[pillar]).find((item) => !completedIds.has(item.id) && !getLessonLockReason(item, completedIds));
    if (lesson) return lesson;
  }
  return null;
}

function canOpenForScenario(lesson, nextLesson, completedIds) {
  if (!lesson || !isStaticLessonReady(lesson)) return false;
  if (completedIds.has(lesson.id)) return true;
  if (!sameLesson(lesson, nextLesson)) return false;
  return !getLessonLockReason(lesson, completedIds);
}

export function validateGuidedCourseAccessScenario({ level = 'A1', completedLessonIds = [], label = 'scenario' } = {}) {
  const completedIds = asSet(completedLessonIds);
  const lessons = getAllLevelLessons(level);
  const nextLesson = getGuidedNextLessonForCompletedIds(level, completedIds);
  const issues = [];

  const openable = lessons.filter((lesson) => canOpenForScenario(lesson, nextLesson, completedIds));
  const futureOpenable = openable.filter((lesson) => !completedIds.has(lesson.id) && !sameLesson(lesson, nextLesson));
  if (futureOpenable.length) {
    issues.push(issue('guided.future.openable', 'Há aulas futuras abríveis fora da progressão guiada.', 'error', { lessonIds: futureOpenable.map((lesson) => lesson.id), label }));
  }

  const nextOpenable = nextLesson ? openable.some((lesson) => sameLesson(lesson, nextLesson)) : false;
  if (nextLesson && !nextOpenable) {
    issues.push(issue('guided.next.blocked', 'A próxima aula oficial não está abrível.', 'error', { lessonId: nextLesson.id, label }));
  }

  const completedBlocked = lessons.filter((lesson) => completedIds.has(lesson.id) && !canOpenForScenario(lesson, nextLesson, completedIds));
  if (completedBlocked.length) {
    issues.push(issue('guided.completed.blocked', 'Aulas já concluídas deveriam poder abrir para revisão.', 'error', { lessonIds: completedBlocked.map((lesson) => lesson.id), label }));
  }

  const visibleFutureTitles = lessons.filter((lesson) => !completedIds.has(lesson.id) && !sameLesson(lesson, nextLesson));

  return {
    label,
    level,
    approved: issues.every((item) => item.severity !== 'error'),
    nextLessonId: nextLesson?.id || '',
    openableLessonIds: openable.map((lesson) => lesson.id),
    completedLessonIds: [...completedIds],
    futureLessonIdsThatMustStayHidden: visibleFutureTitles.map((lesson) => lesson.id),
    issues,
  };
}

export function validateGuidedCourseAccess(level = 'A1') {
  const first = getGuidedNextLessonForCompletedIds(level, new Set());
  const afterFirstCompleted = first ? new Set([first.id]) : new Set();
  const second = getGuidedNextLessonForCompletedIds(level, afterFirstCompleted);
  const afterTwoCompleted = new Set([...(first ? [first.id] : []), ...(second ? [second.id] : [])]);

  const scenarios = [
    validateGuidedCourseAccessScenario({ level, label: 'sem-progresso', completedLessonIds: [] }),
    validateGuidedCourseAccessScenario({ level, label: 'primeira-aula-concluida', completedLessonIds: [...afterFirstCompleted] }),
    validateGuidedCourseAccessScenario({ level, label: 'duas-aulas-concluidas', completedLessonIds: [...afterTwoCompleted] }),
  ];

  return {
    level,
    approved: scenarios.every((scenario) => scenario.approved),
    scenarios,
    issues: scenarios.flatMap((scenario) => scenario.issues.map((item) => ({ ...item, scenario: scenario.label }))),
  };
}
