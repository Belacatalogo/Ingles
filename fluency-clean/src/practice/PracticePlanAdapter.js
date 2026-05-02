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
const LISTENING_PRIORITY = ['listenChoice', 'dictation', 'speak', 'wordBank', 'fillBlank', 'choice', 'write', 'correction'];

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function wordCount(value) {
  return clean(value).split(/\s+/).filter(Boolean).length;
}

function isListeningLesson(lesson) {
  return String(lesson?.type || '').toLowerCase() === 'listening';
}

function getLevelNumber(lesson) {
  const level = String(lesson?.level || 'A1').toUpperCase();
  if (level.includes('A1')) return 1;
  if (level.includes('A2')) return 2;
  if (level.includes('B1')) return 3;
  if (level.includes('B2')) return 4;
  if (level.includes('C1')) return 5;
  if (level.includes('C2')) return 6;
  return 1;
}

function seededValue(seed) {
  let value = 2166136261;
  const input = String(seed || 'practice');
  for (let index = 0; index < input.length; index += 1) {
    value ^= input.charCodeAt(index);
    value = Math.imul(value, 16777619);
  }
  return Math.abs(value);
}

function shuffleStable(items, seed) {
  return [...items].map((item, index) => ({ item, score: seededValue(`${seed}:${item.id}:${item.type}:${index}`) }))
    .sort((left, right) => left.score - right.score)
    .map(({ item }) => item);
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

function isLevelSafeListeningItem(item, levelNumber) {
  const answerWords = wordCount(item.answer);
  const promptWords = wordCount(item.prompt);
  if (levelNumber <= 1) {
    if (['correction', 'write'].includes(item.type)) return false;
    if (item.type === 'dictation') return answerWords <= 6;
    if (item.type === 'wordBank') return answerWords <= 8;
    return promptWords <= 18 || ['listenChoice', 'speak'].includes(item.type);
  }
  if (levelNumber === 2) {
    if (item.type === 'dictation') return answerWords <= 8;
    if (item.type === 'correction') return false;
  }
  return true;
}

function orderListeningItems(items, lesson, options) {
  const levelNumber = getLevelNumber(lesson);
  const safeItems = items.filter((item) => isLevelSafeListeningItem(item, levelNumber));
  const source = safeItems.length >= Math.min(8, items.length) ? safeItems : items;
  const grouped = LISTENING_PRIORITY.flatMap((type) => {
    const group = source.filter((item) => item.type === type);
    return options.randomize ? shuffleStable(group, `${lesson?.id || lesson?.title || 'listening'}:${type}:${new Date().toISOString().slice(0, 10)}`) : group;
  });
  const leftovers = source.filter((item) => !LISTENING_PRIORITY.includes(item.type));
  return [...grouped, ...leftovers];
}

export function normalizeForPractice(value) {
  return normalizePracticeText(value);
}

export function buildPracticeItems(lesson, options = {}) {
  const listening = isListeningLesson(lesson);
  const levelNumber = getLevelNumber(lesson);
  const maxByLevel = listening ? (levelNumber <= 1 ? 16 : levelNumber === 2 ? 20 : 24) : (options.max || 36);
  const plan = buildPracticePlan(lesson, {
    minQuestions: options.min || (listening ? 10 : 14),
    maxQuestions: Math.min(options.max || maxByLevel, maxByLevel),
    idealQuestions: Math.min(options.max || maxByLevel, listening ? (levelNumber <= 1 ? 14 : 18) : 26),
  });

  const rawItems = plan.questions.map(adaptQuestion).filter(hasRenderableShape);
  const items = listening ? orderListeningItems(rawItems, lesson, { randomize: options.randomize !== false }) : rawItems;
  return items.map((item) => ({
    ...item,
    practicePlanQuality: plan.quality,
    practicePlanSummary: {
      ...plan.contextSummary,
      listeningFocused: listening,
      levelSafe: listening,
      randomSeed: listening ? new Date().toISOString().slice(0, 10) : '',
    },
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
