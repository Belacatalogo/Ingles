import { getStaticLevel } from '../content/curriculum/index.js';
import { getCompletedLessonIds, getPracticeStatsByLesson, summarizePillarProgress } from './lessonProgression.js';
import { getStaticLessonProgress } from './staticLessonProgress.js';
import { getLessonCompletions, getPracticeSessionsForLesson } from './progressStore.js';

function safeArray(value) { return Array.isArray(value) ? value : []; }
function clean(value) { return String(value ?? '').trim(); }
function wordCount(value) { return clean(value).split(/\s+/).filter(Boolean).length; }
function lessonIdOf(lesson) { return clean(lesson?.id || lesson?.curriculumId || lesson?.title || ''); }

export const STATIC_LEVEL_MASTERY_REQUIREMENTS = {
  A1: { grammar: 75, vocabulary: 80, reading: 75, listening: 70, speaking: 65, writing: 70 },
  A2: { grammar: 76, vocabulary: 80, reading: 76, listening: 72, speaking: 68, writing: 72 },
  B1: { grammar: 78, vocabulary: 82, reading: 78, listening: 74, speaking: 70, writing: 74 },
  B2: { grammar: 80, vocabulary: 84, reading: 80, listening: 76, speaking: 72, writing: 76 },
  C1: { grammar: 82, vocabulary: 86, reading: 82, listening: 78, speaking: 74, writing: 78 },
  C2: { grammar: 85, vocabulary: 88, reading: 85, listening: 80, speaking: 76, writing: 80 },
};

export const STATIC_LESSON_GATE_REQUIREMENTS = Object.freeze({
  grammar: { minPracticeAccuracy: 70, minProductionWords: 8 },
  vocabulary: { minPracticeAccuracy: 75, minProductionWords: 6 },
  reading: { minPracticeAccuracy: 70, minProductionWords: 10 },
  listening: { minPracticeAccuracy: 65, minProductionWords: 0 },
  speaking: { minPracticeAccuracy: 60, minProductionWords: 0 },
  writing: { minPracticeAccuracy: 70, minProductionWords: 18 },
});

export function getLevelRequirements(level = 'A1') {
  return STATIC_LEVEL_MASTERY_REQUIREMENTS[level] || STATIC_LEVEL_MASTERY_REQUIREMENTS.A1;
}

export function getStaticLessonGateRequirements(lesson) {
  const pillar = clean(lesson?.pillar || lesson?.type).toLowerCase();
  return STATIC_LESSON_GATE_REQUIREMENTS[pillar] || { minPracticeAccuracy: 70, minProductionWords: 0 };
}

export function getStaticLessonBestPractice(lesson) {
  const sessions = getPracticeSessionsForLesson(lesson);
  const best = sessions.reduce((current, session) => Number(session?.accuracy || 0) > Number(current?.accuracy || 0) ? session : current, null);
  return {
    sessions,
    totalSessions: sessions.length,
    bestAccuracy: Number(best?.accuracy || 0),
    lastAccuracy: Number(sessions?.[0]?.accuracy || 0),
    best,
  };
}

export function evaluateStaticLessonGate(lesson, options = {}) {
  const lessonId = lessonIdOf(lesson);
  const progress = getStaticLessonProgress(lessonId);
  const practice = getStaticLessonBestPractice(lesson);
  const requirements = getStaticLessonGateRequirements(lesson);
  const productionText = clean(options.productionText ?? progress.productionText ?? '');
  const productionWords = wordCount(productionText);
  const opened = Boolean(progress.openedAt || options.opened);
  const practicePassed = practice.bestAccuracy >= requirements.minPracticeAccuracy;
  const productionPassed = requirements.minProductionWords <= 0 || productionWords >= requirements.minProductionWords;
  const missing = [];
  if (!opened) missing.push('Abra e leia a aula antes de concluir.');
  if (!practicePassed) missing.push(`Faça a Prática Profunda com pelo menos ${requirements.minPracticeAccuracy}% de acerto. Melhor atual: ${practice.bestAccuracy}%.`);
  if (!productionPassed) missing.push(`Faça a produção final com pelo menos ${requirements.minProductionWords} palavra(s). Atual: ${productionWords}.`);
  return {
    lessonId,
    level: lesson?.level || 'A1',
    pillar: lesson?.pillar || lesson?.type || 'lesson',
    passed: !missing.length,
    opened,
    practicePassed,
    productionPassed,
    productionWords,
    requirements,
    bestPracticeAccuracy: practice.bestAccuracy,
    totalPracticeSessions: practice.totalSessions,
    missing,
    message: missing.length ? missing.join(' ') : 'Aula liberada para conclusão.',
  };
}

export function isStaticLessonCompletionAllowed(lesson, options = {}) {
  return evaluateStaticLessonGate(lesson, options).passed;
}

export function evaluateStaticLevelGate(level = 'A1', options = {}) {
  const staticLevel = getStaticLevel(level);
  const completedIds = options.completedIds || getCompletedLessonIds();
  const requirements = getLevelRequirements(level);
  const practiceStats = getPracticeStatsByLesson();
  const completions = getLessonCompletions();
  const pillars = Object.fromEntries(
    Object.entries(staticLevel.pillars || {}).map(([pillar, lessons]) => {
      const progress = summarizePillarProgress(lessons, completedIds);
      const requiredPercent = Number(requirements[pillar] || 75);
      const completedLessons = lessons.filter((lesson) => completedIds.has(lesson.id));
      const completionScores = completedLessons.map((lesson) => Number(completions.find((item) => item.lessonId === lesson.id)?.masteryScore || 0)).filter(Boolean);
      const practiceScores = completedLessons.map((lesson) => Number(practiceStats.get(lesson.id)?.bestAccuracy || 0)).filter(Boolean);
      const allScores = [...completionScores, ...practiceScores];
      const averageMastery = allScores.length ? Math.round(allScores.reduce((sum, score) => sum + score, 0) / allScores.length) : progress.percent;
      return [pillar, { ...progress, requiredPercent, averageMastery, passed: progress.percent >= requiredPercent && averageMastery >= requiredPercent }];
    }),
  );
  const missing = Object.entries(pillars)
    .filter(([, item]) => !item.passed)
    .map(([pillar, item]) => `${pillar}: ${item.percent}% concluído / ${item.averageMastery}% domínio / meta ${item.requiredPercent}%`);
  const finalCheckpointIds = Object.values(staticLevel.pillars || {})
    .flat()
    .filter((lesson) => /checkpoint/i.test(String(lesson.checkpoint || lesson.title || '')))
    .map((lesson) => lesson.id);
  const checkpointsCompleted = finalCheckpointIds.every((id) => completedIds.has(id));
  const passed = !missing.length && checkpointsCompleted;
  return {
    level,
    passed,
    pillars,
    checkpointsCompleted,
    checkpointIds: finalCheckpointIds,
    missing,
    message: passed
      ? `${level} liberado para próximo nível.`
      : `Ainda não liberado: ${[...missing, checkpointsCompleted ? '' : 'checkpoints pendentes'].filter(Boolean).join('; ')}.`,
  };
}

export function getLevelReadinessReport(level = 'A1') {
  const gate = evaluateStaticLevelGate(level);
  return {
    ...gate,
    ready: gate.passed,
    nextActions: gate.passed ? ['Avançar para o próximo nível.'] : gate.missing,
  };
}

export function canAdvanceFromLevel(level = 'A1', options = {}) {
  return evaluateStaticLevelGate(level, options).passed;
}
