import { DEFAULT_PRACTICE_LIMITS, PRACTICE_SKILLS, SKILL_PHASE_PLAN } from './PracticeTypes.js';
import { normalizeLessonForPractice } from './PracticeNormalizer.js';
import { filterPracticeQuestions, getPracticePlanIssues } from './PracticeQualityGate.js';
import { applyLeakDetector } from './PracticeLeakDetector.js';
import { composePurePlan, validateSessionPurity } from './PracticePurityMatrix.js';
import { buildListeningPractice } from './builders/listeningBuilder.js';
import { buildSpeakingPractice } from './builders/speakingBuilder.js';
import { buildReadingPractice } from './builders/readingBuilder.js';
import { buildGrammarPractice } from './builders/grammarBuilder.js';
import { buildWritingPractice } from './builders/writingBuilder.js';

function getBuilderForSkill(skill) {
  const builders = {
    [PRACTICE_SKILLS.LISTENING]: buildListeningPractice,
    [PRACTICE_SKILLS.SPEAKING]: buildSpeakingPractice,
    [PRACTICE_SKILLS.READING]: buildReadingPractice,
    [PRACTICE_SKILLS.GRAMMAR]: buildGrammarPractice,
    [PRACTICE_SKILLS.WRITING]: buildWritingPractice,
  };
  return builders[skill] || buildListeningPractice;
}

function orderByPhase(questions, phasePlan) {
  if (!phasePlan?.length) return questions;
  return [...questions].sort((a, b) => {
    const aIndex = phasePlan.indexOf(a.phase);
    const bIndex = phasePlan.indexOf(b.phase);
    const safeA = aIndex >= 0 ? aIndex : phasePlan.length + 1;
    const safeB = bIndex >= 0 ? bIndex : phasePlan.length + 1;
    return safeA - safeB;
  });
}

function chooseQuestionCount(context, limits, acceptedCount) {
  const contentWeight = Math.ceil(
    context.sentences.length * 1.8 +
    context.vocabulary.length * 0.8 +
    context.exercises.length * 1.2
  );
  const desired = Math.max(limits.minQuestions, Math.min(limits.idealQuestions, contentWeight));
  return Math.min(limits.maxQuestions, Math.min(acceptedCount, Math.max(desired, Math.min(acceptedCount, limits.minQuestions))));
}

export function buildPracticePlan(lesson, options = {}) {
  const limits = { ...DEFAULT_PRACTICE_LIMITS, ...options };
  const context = normalizeLessonForPractice(lesson);
  const phasePlan = SKILL_PHASE_PLAN[context.skill] || SKILL_PHASE_PLAN[PRACTICE_SKILLS.MIXED] || [];
  const builder = getBuilderForSkill(context.skill);
  const candidates = builder(context);
  const { accepted: structurallyValid, rejected } = filterPracticeQuestions(candidates, limits);
  const leakResult = applyLeakDetector(structurallyValid, context);
  const targetCount = chooseQuestionCount(context, limits, leakResult.accepted.length);
  const { questions: pureQuestions, purityReport } = composePurePlan(leakResult.accepted, context.skill, targetCount);
  const ordered = orderByPhase(pureQuestions, phasePlan);
  const purityValidation = validateSessionPurity(ordered, context.skill);
  const count = ordered.length;
  const questions = ordered;
  const draftPlan = {
    lessonId: context.id,
    title: context.title,
    skill: context.skill,
    level: context.level,
    phasePlan,
    questions,
    quality: {
      candidateCount: candidates.length,
      acceptedCount: leakResult.accepted.length,
      rejectedCount: rejected.length,
      rejected,
      leakSanitized: leakResult.sanitizedList.length,
      leakDowngraded: leakResult.downgradedList.length,
      leakDiscarded: leakResult.discarded.length,
      leakSanitizedItems: leakResult.sanitizedList,
      leakDowngradedItems: leakResult.downgradedList,
      leakDiscardedItems: leakResult.discarded,
      purityReport,
      purityValidation,
    },
    contextSummary: {
      sentences: context.sentences.length,
      vocabulary: context.vocabulary.length,
      exercises: context.exercises.length,
      desiredCount: targetCount,
      finalCount: count,
    },
  };

  if (leakResult.sanitizedList.length || leakResult.downgradedList.length || leakResult.discarded.length) {
    console.info('[PracticeBuilder] Leak detector summary', {
      leakSanitized: leakResult.sanitizedList.length,
      leakDowngraded: leakResult.downgradedList.length,
      leakDiscarded: leakResult.discarded.length,
    });
  }

  if (!purityValidation.ok) {
    console.warn(`[Purity] Sessão com ${Math.round((purityValidation.corePercentage || 0) * 100)}% de core (mínimo 70%). Razão: ${purityValidation.reason}`);
  }

  return {
    ...draftPlan,
    quality: {
      ...draftPlan.quality,
      planIssues: getPracticePlanIssues(draftPlan, limits),
    },
  };
}
