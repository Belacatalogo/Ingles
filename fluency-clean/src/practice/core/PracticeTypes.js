export const PRACTICE_SKILLS = Object.freeze({
  LISTENING: 'listening',
  SPEAKING: 'speaking',
  READING: 'reading',
  GRAMMAR: 'grammar',
  WRITING: 'writing',
  MIXED: 'mixed',
});

export const PRACTICE_PHASES = Object.freeze({
  WARMUP: 'warmup',
  RECOGNITION: 'recognition',
  COMPREHENSION: 'comprehension',
  GUIDED_PRODUCTION: 'guided_production',
  WRITING: 'writing',
  SPEAKING: 'speaking',
  REVIEW: 'review',
});

export const QUESTION_TYPES = Object.freeze({
  MULTIPLE_CHOICE: 'multiple_choice',
  AUDIO_CHOICE: 'audio_choice',
  DICTATION: 'dictation',
  WORD_BANK: 'word_bank',
  FILL_BLANK: 'fill_blank',
  CORRECTION: 'correction',
  WRITE_SHORT: 'write_short',
  SPEAK_RESPONSE: 'speak_response',
  TRUE_FALSE: 'true_false',
});

export const ANSWER_KINDS = Object.freeze({
  WORD: 'word',
  SPELLING: 'spelling',
  SHORT_PHRASE: 'short_phrase',
  SENTENCE: 'sentence',
  BOOLEAN: 'boolean',
  PERSONAL: 'personal',
  FREE_TEXT: 'free_text',
});

export const PRACTICE_RESULT_STATUS = Object.freeze({
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
  NEAR: 'near',
  EMPTY: 'empty',
});

export const DEFAULT_PRACTICE_LIMITS = Object.freeze({
  minQuestions: 16,
  idealQuestions: 24,
  maxQuestions: 32,
  startingLives: 5,
  maxOptionLength: 54,
  maxChoiceOptions: 4,
});

export const SKILL_PHASE_PLAN = Object.freeze({
  [PRACTICE_SKILLS.LISTENING]: [
    PRACTICE_PHASES.WARMUP,
    PRACTICE_PHASES.RECOGNITION,
    PRACTICE_PHASES.COMPREHENSION,
    PRACTICE_PHASES.GUIDED_PRODUCTION,
    PRACTICE_PHASES.SPEAKING,
    PRACTICE_PHASES.REVIEW,
  ],
  [PRACTICE_SKILLS.SPEAKING]: [
    PRACTICE_PHASES.WARMUP,
    PRACTICE_PHASES.SPEAKING,
    PRACTICE_PHASES.GUIDED_PRODUCTION,
    PRACTICE_PHASES.SPEAKING,
    PRACTICE_PHASES.REVIEW,
  ],
  [PRACTICE_SKILLS.READING]: [
    PRACTICE_PHASES.WARMUP,
    PRACTICE_PHASES.RECOGNITION,
    PRACTICE_PHASES.COMPREHENSION,
    PRACTICE_PHASES.WRITING,
    PRACTICE_PHASES.REVIEW,
  ],
  [PRACTICE_SKILLS.GRAMMAR]: [
    PRACTICE_PHASES.WARMUP,
    PRACTICE_PHASES.RECOGNITION,
    PRACTICE_PHASES.GUIDED_PRODUCTION,
    PRACTICE_PHASES.WRITING,
    PRACTICE_PHASES.REVIEW,
  ],
  [PRACTICE_SKILLS.WRITING]: [
    PRACTICE_PHASES.WARMUP,
    PRACTICE_PHASES.GUIDED_PRODUCTION,
    PRACTICE_PHASES.WRITING,
    PRACTICE_PHASES.REVIEW,
  ],
  [PRACTICE_SKILLS.MIXED]: [
    PRACTICE_PHASES.WARMUP,
    PRACTICE_PHASES.RECOGNITION,
    PRACTICE_PHASES.COMPREHENSION,
    PRACTICE_PHASES.GUIDED_PRODUCTION,
    PRACTICE_PHASES.WRITING,
    PRACTICE_PHASES.SPEAKING,
    PRACTICE_PHASES.REVIEW,
  ],
});
