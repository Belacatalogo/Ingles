import { buildPracticeItems as buildLegacyPracticeItems, evaluatePracticeAnswer as evaluateLegacyPracticeAnswer, normalizeForPractice as normalizeLegacyPractice } from './PracticeEngine.js';
import { buildPracticePlan, checkPracticeAnswer, normalizePracticeText, QUESTION_TYPES } from './core/index.js';

const TYPE_TO_UI = Object.freeze({
  [QUESTION_TYPES.MULTIPLE_CHOICE]: 'choice',
  [QUESTION_TYPES.AUDIO_CHOICE]: 'listenChoice',
  [QUESTION_TYPES.DICTATION]: 'dictation',
  [QUESTION_TYPES.WORD_BANK]: 'wordBank',
  [QUESTION_TYPES.FILL_BLANK]: 'fillBlank',
  [QUESTION_TYPES.CORRECTION]: 'correction',
  [QUESTION_TYPES.WRITE_SHORT]: 'write',
  [QUESTION_TYPES.SPEAK_RESPONSE]: 'speak',
  [QUESTION_TYPES.TRUE_FALSE]: 'choice',
});

function clean(value) {
  return String(value ?? '').trim();
}

function normalizeOptions(question) {
  if (question.type === QUESTION_TYPES.TRUE_FALSE) return ['True', 'False'];
  return Array.isArray(question.options) ? question.options.map(clean).filter(Boolean) : [];
}

function adaptQuestion(question, index) {
  const uiType = TYPE_TO_UI[question.type] || 'write';
  return {
    id: question.id || `core-practice-${index + 1}`,
    type: uiType,
    title: clean(question.title || 'Prática guiada'),
    prompt: clean(question.prompt),
    answer: clean(question.answer),
    options: normalizeOptions(question),
    words: Array.isArray(question.words) ? question.words.map(clean).filter(Boolean) : [],
    audioText: clean(question.audioText || question.answer),
    phase: question.phase,
    skill: question.skill,
    sourceEngine: 'core',
    coreQuestion: question,
  };
}

function hasRenderableShape(item) {
  if (!item?.type || !item?.prompt || !item?.answer) return false;
  if (['choice', 'listenChoice', 'fillBlank'].includes(item.type)) return Array.isArray(item.options) && item.options.length >= 2;
  if (item.type === 'wordBank') return Array.isArray(item.words) && item.words.length >= 3;
  return true;
}

export function normalizeForPractice(value) {
  return normalizePracticeText(value);
}

export function buildPracticeItems(lesson, options = {}) {
  try {
    const plan = buildPracticePlan(lesson, {
      minQuestions: options.min || 14,
      maxQuestions: options.max || 36,
      idealQuestions: Math.min(options.max || 36, 26),
    });
    const items = plan.questions.map(adaptQuestion).filter(hasRenderableShape);
    if (items.length >= Math.min(options.min || 14, 8)) {
      return items.map((item) => ({ ...item, practicePlanQuality: plan.quality, practicePlanSummary: plan.contextSummary }));
    }
  } catch (error) {
    console.warn('[Fluency Practice] Core practice builder failed, falling back to legacy engine.', error);
  }

  return buildLegacyPracticeItems(lesson, options).map((item) => ({ ...item, sourceEngine: 'legacy' }));
}

export function evaluatePracticeAnswer(item, value) {
  if (item?.sourceEngine === 'core' && item.coreQuestion) {
    const result = checkPracticeAnswer(item.coreQuestion, value);
    return {
      correct: result.correct,
      retryable: result.retryable,
      empty: result.status === 'empty',
      hintWord: result.hintWord || '',
      loseLife: result.loseLife,
      expected: result.expected || item.answer,
    };
  }
  return evaluateLegacyPracticeAnswer(item, value);
}

export function getPracticeEngineName(item) {
  return item?.sourceEngine || 'unknown';
}

export function normalizeForPracticeLegacySafe(value) {
  return normalizeLegacyPractice(value);
}
