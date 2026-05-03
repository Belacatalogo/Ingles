import { QUESTION_TYPES } from '../practice/core/PracticeTypes.js';
import { localDateKey } from './progressStore.js';

const STORAGE_KEY = 'fluency.practiceSrsExtended.v1';

export const SRS_ITEM_TYPES = Object.freeze({
  GRAMMAR_PATTERN: 'grammar_pattern',
  PRONUNCIATION_WORD: 'pronunciation_word',
  ERROR_PATTERN: 'error_pattern',
  EVIDENCE_TRACK: 'evidence_track',
  LISTENING_PATTERN: 'listening_pattern',
});

export const SRS_STATUS = Object.freeze({
  WEAK: 'weak',
  LEARNING: 'learning',
  REVIEW: 'review',
  STRONG: 'strong',
  MASTERED: 'mastered',
});

const INTERVALS_DAYS = Object.freeze({
  [SRS_STATUS.WEAK]: 1,
  [SRS_STATUS.LEARNING]: 2,
  [SRS_STATUS.REVIEW]: 4,
  [SRS_STATUS.STRONG]: 8,
  [SRS_STATUS.MASTERED]: 16,
});

function safeJsonParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function readState() {
  if (typeof window === 'undefined') return { items: {} };
  return safeJsonParse(window.localStorage.getItem(STORAGE_KEY), { items: {} });
}

function writeState(state) {
  if (typeof window === 'undefined') return state;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return state;
}

function clean(value) {
  return String(value ?? '').trim();
}

function makeKey(type, content) {
  const t = clean(type).toLowerCase();
  const c = clean(content)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9À-ÿ'-]/gi, '')
    .slice(0, 80);
  return `${t}::${c}`;
}

function addDays(date, days) {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  next.setDate(next.getDate() + Number(days || 0));
  return next;
}

function resolveStatus(correct, previous = {}) {
  const previousStreak = Number(previous.streak || 0);
  const nextStreak = correct ? previousStreak + 1 : 0;
  if (!correct) return SRS_STATUS.WEAK;
  if (nextStreak <= 1) return SRS_STATUS.LEARNING;
  if (nextStreak === 2) return SRS_STATUS.REVIEW;
  if (nextStreak === 3) return SRS_STATUS.STRONG;
  return SRS_STATUS.MASTERED;
}

function dueFor(status, now) {
  return localDateKey(addDays(now, INTERVALS_DAYS[status] || 1));
}

function clampMastery(value) {
  return Math.max(0, Math.min(100, Math.round(Number(value || 0))));
}

export function getPracticeSrsState() {
  const state = readState();
  return { items: state.items || {} };
}

/**
 * Registra um resultado para um item SRS estendido.
 * Storage separado do SRS de vocabulário.
 */
export function recordPracticeSrsResult({ type, content, label, correct, skill, level, meta = {} } = {}) {
  if (!type || !content) return null;

  const key = makeKey(type, content);
  const now = new Date();
  const state = getPracticeSrsState();
  const items = { ...state.items };
  const previous = items[key] || {};

  const attempts = Number(previous.attempts || 0) + 1;
  const correctCount = Number(previous.correct || 0) + (correct ? 1 : 0);
  const wrongCount = Number(previous.wrong || 0) + (correct ? 0 : 1);
  const streak = correct ? Number(previous.streak || 0) + 1 : 0;
  const wasMastered = previous.status === SRS_STATUS.MASTERED;
  const lapses = Number(previous.lapses || 0) + (!correct && wasMastered ? 1 : 0);
  const status = resolveStatus(correct, previous);
  const dueDate = dueFor(status, now);
  const mastery = clampMastery((correctCount / attempts) * 55 + Math.min(45, streak * 12) - lapses * 8);

  items[key] = {
    key,
    type,
    content: clean(content),
    label: clean(label || content),
    skill: clean(skill || previous.skill || ''),
    level: clean(level || previous.level || 'A1'),
    attempts,
    correct: correctCount,
    wrong: wrongCount,
    streak,
    lapses,
    status,
    mastery,
    dueDate,
    lastReviewedAt: now.toISOString(),
    meta: { ...(previous.meta || {}), ...meta },
  };

  writeState({ items });
  return items[key];
}

export function getDuePracticeSrsItems({ type, skill, limit = 20 } = {}) {
  const today = localDateKey();
  const items = Object.values(getPracticeSrsState().items || {});
  const filtered = items
    .filter((item) => !item.dueDate || item.dueDate <= today)
    .filter((item) => !type || item.type === type)
    .filter((item) => !skill || item.skill === skill)
    .sort((a, b) => {
      if (a.status === SRS_STATUS.WEAK && b.status !== SRS_STATUS.WEAK) return -1;
      if (b.status === SRS_STATUS.WEAK && a.status !== SRS_STATUS.WEAK) return 1;
      return String(a.dueDate || '').localeCompare(String(b.dueDate || ''));
    });
  return filtered.slice(0, Math.max(0, Number(limit || 20)));
}

export function getPracticeSrsSummary() {
  const today = localDateKey();
  const items = Object.values(getPracticeSrsState().items || {});
  const due = items.filter((item) => !item.dueDate || item.dueDate <= today);
  const weak = items.filter((item) => item.status === SRS_STATUS.WEAK);
  const mastered = items.filter((item) => item.status === SRS_STATUS.MASTERED);
  const byType = {};

  for (const item of items) {
    if (!byType[item.type]) byType[item.type] = { total: 0, due: 0, weak: 0 };
    byType[item.type].total += 1;
    if (!item.dueDate || item.dueDate <= today) byType[item.type].due += 1;
    if (item.status === SRS_STATUS.WEAK) byType[item.type].weak += 1;
  }

  return {
    total: items.length,
    dueToday: due.length,
    weak: weak.length,
    mastered: mastered.length,
    byType,
  };
}

function suggestQuestionTypeForSrsItem(item) {
  switch (item?.type) {
    case SRS_ITEM_TYPES.GRAMMAR_PATTERN:
      return QUESTION_TYPES.CORRECTION;
    case SRS_ITEM_TYPES.PRONUNCIATION_WORD:
      return QUESTION_TYPES.SPEAK_RESPONSE;
    case SRS_ITEM_TYPES.ERROR_PATTERN:
      return QUESTION_TYPES.MULTIPLE_CHOICE;
    case SRS_ITEM_TYPES.EVIDENCE_TRACK:
      return QUESTION_TYPES.MULTIPLE_CHOICE;
    case SRS_ITEM_TYPES.LISTENING_PATTERN:
      return QUESTION_TYPES.AUDIO_CHOICE;
    default:
      return QUESTION_TYPES.MULTIPLE_CHOICE;
  }
}

export function pullSrsReviewItems({ skill, level, limit = 2 } = {}) {
  const due = getDuePracticeSrsItems({ skill, limit });
  return due.map((item) => ({
    srsItem: item,
    suggestedQuestionType: suggestQuestionTypeForSrsItem(item),
    isReview: true,
    level: clean(level || item.level || 'A1'),
  }));
}
