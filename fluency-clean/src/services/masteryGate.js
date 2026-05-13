import { getStaticLevel } from '../content/curriculum/index.js';
import { getCompletedLessonIds, summarizePillarProgress } from './lessonProgression.js';

export const STATIC_LEVEL_MASTERY_REQUIREMENTS = {
  A1: { grammar: 75, vocabulary: 80, reading: 75, listening: 70, speaking: 65, writing: 70 },
  A2: { grammar: 76, vocabulary: 80, reading: 76, listening: 72, speaking: 68, writing: 72 },
  B1: { grammar: 78, vocabulary: 82, reading: 78, listening: 74, speaking: 70, writing: 74 },
  B2: { grammar: 80, vocabulary: 84, reading: 80, listening: 76, speaking: 72, writing: 76 },
  C1: { grammar: 82, vocabulary: 86, reading: 82, listening: 78, speaking: 74, writing: 78 },
  C2: { grammar: 85, vocabulary: 88, reading: 85, listening: 80, speaking: 76, writing: 80 },
};

export function getLevelRequirements(level = 'A1') {
  return STATIC_LEVEL_MASTERY_REQUIREMENTS[level] || STATIC_LEVEL_MASTERY_REQUIREMENTS.A1;
}

export function evaluateStaticLevelGate(level = 'A1', options = {}) {
  const staticLevel = getStaticLevel(level);
  const completedIds = options.completedIds || getCompletedLessonIds();
  const requirements = getLevelRequirements(level);
  const pillars = Object.fromEntries(
    Object.entries(staticLevel.pillars || {}).map(([pillar, lessons]) => {
      const progress = summarizePillarProgress(lessons, completedIds);
      const requiredPercent = Number(requirements[pillar] || 75);
      return [pillar, { ...progress, requiredPercent, passed: progress.percent >= requiredPercent }];
    }),
  );
  const missing = Object.entries(pillars)
    .filter(([, item]) => !item.passed)
    .map(([pillar, item]) => `${pillar}: ${item.percent}%/${item.requiredPercent}%`);
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
    missing,
    message: passed
      ? `${level} liberado para próximo nível.`
      : `Ainda não liberado: ${[...missing, checkpointsCompleted ? '' : 'checkpoints pendentes'].filter(Boolean).join('; ')}.`,
  };
}

export function canAdvanceFromLevel(level = 'A1', options = {}) {
  return evaluateStaticLevelGate(level, options).passed;
}
