import { localDateKey } from './progressStore.js';

const STORAGE_KEY = 'fluency.vocabularySrs.v1';

const INTERVALS = {
  weak: 1,
  learning: 2,
  review: 4,
  strong: 8,
  mastered: 16,
};

function safeJsonParse(value, fallback) {
  try { return value ? JSON.parse(value) : fallback; } catch { return fallback; }
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

function clean(value) { return String(value ?? '').trim(); }
function keyFor(item = {}) {
  const base = clean(item.cardId || item.id || item.word || item.expected || item.answer || item.prompt);
  return base.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9À-ÿ'-]/gi, '').slice(0, 90);
}
function addDays(date, days) {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  next.setDate(next.getDate() + Number(days || 0));
  return next;
}
function resolveStatus(correct, previous = {}) {
  const streak = Number(previous.streak || 0);
  if (!correct) return 'weak';
  if (streak <= 0) return 'learning';
  if (streak === 1) return 'review';
  if (streak === 2) return 'strong';
  return 'mastered';
}
function dueFor(status, now) {
  return localDateKey(addDays(now, INTERVALS[status] || 1));
}

export function getVocabularySrsState() {
  const state = readState();
  return { items: state.items || {} };
}

export function updateVocabularySrsFromReviewLog(reviewLog = [], meta = {}) {
  const now = new Date();
  const state = getVocabularySrsState();
  const items = { ...state.items };
  for (const entry of Array.isArray(reviewLog) ? reviewLog : []) {
    const key = keyFor(entry);
    if (!key) continue;
    const previous = items[key] || {};
    const correct = !entry.needsReview && entry.rating !== 'again' && entry.rating !== 'hard';
    const attempts = Number(previous.attempts || 0) + 1;
    const correctCount = Number(previous.correct || 0) + (correct ? 1 : 0);
    const wrongCount = Number(previous.wrong || 0) + (correct ? 0 : 1);
    const streak = correct ? Number(previous.streak || 0) + 1 : 0;
    const lapses = Number(previous.lapses || 0) + (correct ? 0 : 1);
    const status = resolveStatus(correct, { ...previous, streak });
    const dueDate = dueFor(status, now);
    const mastery = Math.max(0, Math.min(100, Math.round((correctCount / attempts) * 55 + Math.min(45, streak * 12) - lapses * 8)));
    items[key] = {
      key,
      word: clean(entry.word || previous.word || entry.expected || entry.answer),
      deck: clean(entry.deck || previous.deck || meta.deck || ''),
      type: clean(entry.type || previous.type || 'vocabulary'),
      level: clean(meta.level || previous.level || 'A1'),
      lastAnswer: clean(entry.answer || entry.received || ''),
      expected: clean(entry.expected || previous.expected || ''),
      attempts,
      correct: correctCount,
      wrong: wrongCount,
      streak,
      lapses,
      status,
      mastery,
      dueDate,
      lastReviewedAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };
  }
  return writeState({ items });
}

export function getVocabularySrsSummary() {
  const today = localDateKey();
  const items = Object.values(getVocabularySrsState().items || {});
  const due = items.filter((item) => item.dueDate && item.dueDate <= today);
  const weak = items.filter((item) => item.status === 'weak');
  const mastered = items.filter((item) => item.status === 'mastered');
  const learning = items.filter((item) => ['new', 'learning', 'review'].includes(item.status));
  const averageMastery = items.length ? Math.round(items.reduce((sum, item) => sum + Number(item.mastery || 0), 0) / items.length) : 0;
  return {
    total: items.length,
    dueToday: due.length,
    weak: weak.length,
    mastered: mastered.length,
    learning: learning.length,
    averageMastery,
    dueItems: due.sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate))).slice(0, 12),
    weakItems: weak.sort((a, b) => Number(b.wrong || 0) - Number(a.wrong || 0)).slice(0, 12),
    updatedAt: new Date().toISOString(),
  };
}

export function hasVocabularyReviewDueToday() {
  return getVocabularySrsSummary().dueToday > 0;
}
