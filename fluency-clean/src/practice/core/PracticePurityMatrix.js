import { PRACTICE_SKILLS, QUESTION_TYPES } from './PracticeTypes.js';

export const PURITY_ROLE = Object.freeze({
  CORE: 'core',
  SUPPORT: 'support',
  BANNED: 'banned',
});

export const PURITY_MATRIX = Object.freeze({
  [PRACTICE_SKILLS.GRAMMAR]: Object.freeze({
    core: Object.freeze([
      QUESTION_TYPES.CORRECTION,
      QUESTION_TYPES.FILL_BLANK,
      QUESTION_TYPES.MULTIPLE_CHOICE,
      QUESTION_TYPES.WORD_BANK,
    ]),
    support: Object.freeze([
      QUESTION_TYPES.WRITE_SHORT,
      QUESTION_TYPES.TRUE_FALSE,
    ]),
    banned: Object.freeze([
      QUESTION_TYPES.AUDIO_CHOICE,
      QUESTION_TYPES.DICTATION,
      QUESTION_TYPES.SPEAK_RESPONSE,
      QUESTION_TYPES.NEW_CONTEXT,
      QUESTION_TYPES.SUMMARY_CLOZE,
    ]),
  }),

  [PRACTICE_SKILLS.LISTENING]: Object.freeze({
    core: Object.freeze([
      QUESTION_TYPES.AUDIO_CHOICE,
      QUESTION_TYPES.DICTATION,
      QUESTION_TYPES.MULTIPLE_CHOICE,
    ]),
    support: Object.freeze([
      QUESTION_TYPES.FILL_BLANK,
      QUESTION_TYPES.WORD_BANK,
      QUESTION_TYPES.SPEAK_RESPONSE,
      QUESTION_TYPES.TRUE_FALSE,
    ]),
    banned: Object.freeze([
      QUESTION_TYPES.WRITE_SHORT,
      QUESTION_TYPES.CORRECTION,
      QUESTION_TYPES.NEW_CONTEXT,
      QUESTION_TYPES.SUMMARY_CLOZE,
    ]),
  }),

  [PRACTICE_SKILLS.READING]: Object.freeze({
    core: Object.freeze([
      QUESTION_TYPES.MULTIPLE_CHOICE,
      QUESTION_TYPES.TRUE_FALSE,
      QUESTION_TYPES.FILL_BLANK,
      QUESTION_TYPES.NEW_CONTEXT,
      QUESTION_TYPES.SUMMARY_CLOZE,
    ]),
    support: Object.freeze([
      QUESTION_TYPES.WORD_BANK,
      QUESTION_TYPES.WRITE_SHORT,
    ]),
    banned: Object.freeze([
      QUESTION_TYPES.AUDIO_CHOICE,
      QUESTION_TYPES.DICTATION,
      QUESTION_TYPES.SPEAK_RESPONSE,
      QUESTION_TYPES.CORRECTION,
    ]),
  }),

  [PRACTICE_SKILLS.SPEAKING]: Object.freeze({
    core: Object.freeze([
      QUESTION_TYPES.SPEAK_RESPONSE,
    ]),
    support: Object.freeze([
      QUESTION_TYPES.AUDIO_CHOICE,
      QUESTION_TYPES.MULTIPLE_CHOICE,
      QUESTION_TYPES.FILL_BLANK,
    ]),
    banned: Object.freeze([
      QUESTION_TYPES.DICTATION,
      QUESTION_TYPES.WRITE_SHORT,
      QUESTION_TYPES.WORD_BANK,
      QUESTION_TYPES.CORRECTION,
      QUESTION_TYPES.NEW_CONTEXT,
      QUESTION_TYPES.SUMMARY_CLOZE,
    ]),
  }),

  [PRACTICE_SKILLS.WRITING]: Object.freeze({
    core: Object.freeze([
      QUESTION_TYPES.WRITE_SHORT,
      QUESTION_TYPES.WORD_BANK,
      QUESTION_TYPES.CORRECTION,
      QUESTION_TYPES.FILL_BLANK,
    ]),
    support: Object.freeze([
      QUESTION_TYPES.MULTIPLE_CHOICE,
      QUESTION_TYPES.TRUE_FALSE,
    ]),
    banned: Object.freeze([
      QUESTION_TYPES.AUDIO_CHOICE,
      QUESTION_TYPES.DICTATION,
      QUESTION_TYPES.SPEAK_RESPONSE,
      QUESTION_TYPES.NEW_CONTEXT,
      QUESTION_TYPES.SUMMARY_CLOZE,
    ]),
  }),

  [PRACTICE_SKILLS.MIXED]: Object.freeze({
    core: Object.freeze(Object.values(QUESTION_TYPES)),
    support: Object.freeze([]),
    banned: Object.freeze([]),
  }),
});

export const PURITY_RULES = Object.freeze({
  minCorePercentage: 0.70,
  maxSupportPercentage: 0.30,
  zeroBanned: true,
});

export function classifyQuestionPurity(question, lessonSkill) {
  const matrix = PURITY_MATRIX[lessonSkill];
  if (!matrix) return PURITY_ROLE.SUPPORT;

  if (matrix.banned.includes(question?.type)) return PURITY_ROLE.BANNED;
  if (matrix.core.includes(question?.type)) return PURITY_ROLE.CORE;
  if (matrix.support.includes(question?.type)) return PURITY_ROLE.SUPPORT;

  return PURITY_ROLE.BANNED;
}

export function validateSessionPurity(questions, lessonSkill) {
  if (lessonSkill === PRACTICE_SKILLS.MIXED) {
    return { ok: true, corePercentage: 1, bannedCount: 0, reason: 'mixed_skip', skipped: true };
  }

  const list = Array.isArray(questions) ? questions : [];
  const total = list.length;
  if (total === 0) {
    return {
      ok: false,
      corePercentage: 0,
      bannedCount: 0,
      coreCount: 0,
      supportCount: 0,
      totalCount: 0,
      reason: 'empty_session',
    };
  }

  let core = 0;
  let support = 0;
  let banned = 0;

  for (const question of list) {
    const role = classifyQuestionPurity(question, lessonSkill);
    if (role === PURITY_ROLE.CORE) core += 1;
    if (role === PURITY_ROLE.SUPPORT) support += 1;
    if (role === PURITY_ROLE.BANNED) banned += 1;
  }

  const corePercentage = core / total;
  const supportPercentage = support / total;
  const ok = banned === 0 && corePercentage >= PURITY_RULES.minCorePercentage;

  return {
    ok,
    corePercentage,
    supportPercentage,
    bannedCount: banned,
    coreCount: core,
    supportCount: support,
    totalCount: total,
    reason: ok ? 'clean' : (banned > 0 ? 'has_banned' : 'low_core'),
  };
}

export function composePurePlan(allQuestions, lessonSkill, targetCount) {
  const source = Array.isArray(allQuestions) ? allQuestions : [];
  const safeTarget = Math.max(0, Number(targetCount) || 0);

  if (lessonSkill === PRACTICE_SKILLS.MIXED) {
    const questions = source.slice(0, safeTarget);
    return {
      questions,
      purityReport: {
        skipped: true,
        targetCount: safeTarget,
        finalCount: questions.length,
      },
    };
  }

  const survivors = source.filter(
    (question) => classifyQuestionPurity(question, lessonSkill) !== PURITY_ROLE.BANNED,
  );

  const cores = survivors.filter((question) => classifyQuestionPurity(question, lessonSkill) === PURITY_ROLE.CORE);
  const supports = survivors.filter((question) => classifyQuestionPurity(question, lessonSkill) === PURITY_ROLE.SUPPORT);

  const minCoreCount = Math.ceil(safeTarget * PURITY_RULES.minCorePercentage);
  const maxSupportCount = Math.floor(safeTarget * PURITY_RULES.maxSupportPercentage);

  const selectedCores = cores.slice(0, Math.max(minCoreCount, safeTarget - maxSupportCount));
  const remainingSlots = Math.max(0, safeTarget - selectedCores.length);
  const selectedSupports = supports.slice(0, Math.min(remainingSlots, maxSupportCount));
  const composed = [...selectedCores, ...selectedSupports];

  return {
    questions: composed,
    purityReport: {
      skipped: false,
      targetCount: safeTarget,
      finalCount: composed.length,
      bannedRemoved: source.length - survivors.length,
      coresAvailable: cores.length,
      supportsAvailable: supports.length,
      coresSelected: selectedCores.length,
      supportsSelected: selectedSupports.length,
      minCoreCount,
      maxSupportCount,
      coreShortfall: Math.max(0, minCoreCount - selectedCores.length),
    },
  };
}
