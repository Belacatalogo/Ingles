import { fixedExpansionA1A2Decks } from '../data/vocabulary/fixedExpansionA1A2.js';
import { storage } from './storage.js';

const STORAGE_KEY = 'word.of.the.day';

function dateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function seededIndex(seed, length) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % length;
}

function buildWordPool() {
  const pool = [];
  for (const deck of fixedExpansionA1A2Decks) {
    for (const card of deck.cards) {
      const [word, translation, example] = Array.isArray(card) ? card : [card.word, card.translation, card.example];
      if (word && translation) {
        pool.push({ word, translation, example: example || '', deck: deck.title, level: deck.level || 'A1' });
      }
    }
  }
  return pool;
}

export function getWordOfTheDay() {
  const today = dateKey();
  const cached = storage.get(STORAGE_KEY, null);
  if (cached?.date === today && cached?.word) return cached;

  const pool = buildWordPool();
  if (!pool.length) return null;

  const index = seededIndex(today, pool.length);
  const entry = { ...pool[index], date: today };
  storage.set(STORAGE_KEY, entry);
  return entry;
}
