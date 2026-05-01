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

const BAD_OPTION = /(resposta\/|^resposta\b|^answer\b|resposta pessoal|personal answer|exemplo:|example:|undefined|null)/i;
const GENERIC_OPTIONS = new Set(['resposta', 'pergunta', 'frase', 'palavra', 'coisa', 'exemplo', 'texto', 'aula', 'answer', 'question', 'sentence', 'word', 'thing', 'example', 'text', 'lesson']);

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function wordCount(value) {
  return clean(value).split(/\s+/).filter(Boolean).length;
}

function isSafeOption(value, answer = '') {
  const option = clean(value);
  if (!option) return false;
  if (BAD_OPTION.test(option)) return false;
  if (GENERIC_OPTIONS.has(normalizePracticeText(option))) return false;
  if (option.length > 62) return false;
  if (wordCount(option) > 8) return false;
  if (answer && wordCount(answer) <= 2 && wordCount(option) > 4) return false;
  return true;
}

function uniqueOptions(values) {
  const seen = new Set();
  return values.map(clean).filter(Boolean).filter((value) => {
    const key = normalizePracticeText(value);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function normalizeOptions(question) {
  if (question.type === QUESTION_TYPES.TRUE_FALSE) return ['True', 'False'];
  const answer = clean(question.answer);
  const raw = Array.isArray(question.options) ? question.options : [];
  const filtered = uniqueOptions(raw).filter((option) => isSafeOption(option, answer));
  const hasAnswer = filtered.some((option) => normalizePracticeText(option) === normalizePracticeText(answer));
  const withAnswer = hasAnswer ? filtered : [answer, ...filtered].filter((option) => isSafeOption(option, answer));
  return uniqueOptions(withAnswer).slice(0, 4);
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
    words: Array.isArray(question.words) ? question.words.map(clean).filter(Boolean).filter((word) => word.length <= 24).slice(0, 12) : [],
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
  if (item.type === 'dictation') return item.answer.length <= 64 && wordCount(item.answer) <= 8;
  return true;
}

export function normalizeForPractice(value) {
  return normalizePracticeText(value);
}

export function buildPracticeItems(lesson, options = {}) {
  const plan = buildPracticePlan(lesson, {
    minQuestions: options.min || 14,
    maxQuestions: options.max || 36,
    idealQuestions: Math.min(options.max || 36, 26),
  });

  const items = plan.questions.map(adaptQuestion).filter(hasRenderableShape);
  return items.map((item) => ({
    ...item,
    practicePlanQuality: plan.quality,
    practicePlanSummary: plan.contextSummary,
  }));
}

export function evaluatePracticeAnswer(item, value) {
  if (item?.coreQuestion) {
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

  const user = normalizePracticeText(Array.isArray(value) ? value.join(' ') : value);
  const expected = normalizePracticeText(item?.answer);
  return {
    correct: Boolean(user && expected && user === expected),
    retryable: false,
    empty: !user,
    hintWord: '',
    loseLife: true,
    expected: item?.answer || '',
  };
}

export function getPracticeEngineName(item) {
  return item?.sourceEngine || 'core';
}

export function normalizeForPracticeLegacySafe(value) {
  return normalizePracticeText(value);
}
