import { getVocabularyDeckCards, getVocabularyDecks } from './vocabularyDecks.js';
import { getVocabularySrsWeakCards } from './vocabularySrs.js';

const STORAGE_KEY = 'fluency.vocabularyPath.v1';
const BUBBLE_SIZE = 6;
const LEVEL_CARD_STEPS = [4, 5, 6];
const WEAK_INJECTION_BY_LEVEL = [1, 2, 3];
const LAB_UNLOCK_LEVEL_MARKERS = new Set(['A1', 'A1-A2', 'A2']);

function safeJsonParse(value, fallback) {
  try { return value ? JSON.parse(value) : fallback; } catch { return fallback; }
}

function readState() {
  if (typeof window === 'undefined') return { deckProgress: {} };
  return safeJsonParse(window.localStorage.getItem(STORAGE_KEY), { deckProgress: {} });
}

function writeState(state) {
  if (typeof window === 'undefined') return state;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return state;
}

function cardKey(card = {}) {
  return String(card.id || card.word || card.term || card.expression || '').toLowerCase().replace(/\s+/g, '-');
}

function uniqueCards(cards = []) {
  const seen = new Set();
  return cards.filter((card) => {
    const key = cardKey(card);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function chunkCards(cards) {
  const chunks = [];
  for (let index = 0; index < cards.length; index += BUBBLE_SIZE) chunks.push(cards.slice(index, index + BUBBLE_SIZE));
  return chunks;
}

function getDeckProgress(state, deckId) {
  return state.deckProgress?.[deckId] || { bubbles: {}, completed: false };
}

function getBubbleLevel(progress, bubbleIndex) {
  return Number(progress.bubbles?.[bubbleIndex] || 0);
}

function isFirstDeckForLevel(decks, deck, index) {
  if (!LAB_UNLOCK_LEVEL_MARKERS.has(deck.level)) return false;
  return decks.findIndex((item) => item.level === deck.level) === index;
}

function getWeakInjectionLimit(level) {
  const index = Math.max(0, Math.min(2, Number(level || 1) - 1));
  return WEAK_INJECTION_BY_LEVEL[index] || WEAK_INJECTION_BY_LEVEL[0];
}

function injectWeakCards({ selectedCards, deckId, bubbleIndex, level }) {
  const weakLimit = getWeakInjectionLimit(level);
  const weakCards = getVocabularySrsWeakCards(weakLimit)
    .map((card, index) => ({
      ...card,
      id: `reinforcement-${deckId}-${bubbleIndex}-${level}-${card.srsKey || card.id || index}`,
      deck: card.deck || 'Reforço SRS',
      reinforcement: true,
    }))
    .filter((card) => !selectedCards.some((base) => cardKey(base) === cardKey(card) || String(base.word || '').toLowerCase() === String(card.word || '').toLowerCase()));

  if (!weakCards.length) return selectedCards;
  const result = [];
  const queue = [...weakCards];
  selectedCards.forEach((card, index) => {
    result.push(card);
    const shouldInject = queue.length && (index === 0 || (level >= 2 && index === 2) || (level >= 3 && index === selectedCards.length - 1));
    if (shouldInject) result.push(queue.shift());
  });
  while (queue.length && result.length < selectedCards.length + weakLimit) result.push(queue.shift());
  return uniqueCards(result);
}

export function getVocabularyPathState() {
  const decks = getVocabularyDecks();
  const state = readState();
  return {
    ...state,
    deckProgress: state.deckProgress || {},
    decks: decks.map((deck, index) => {
      const progress = getDeckProgress(state, deck.id);
      const previousDeck = decks[index - 1];
      const previousComplete = index === 0 || getDeckProgress(state, previousDeck?.id).completed;
      const labMarkerUnlocked = isFirstDeckForLevel(decks, deck, index);
      const bubbles = chunkCards(getVocabularyDeckCards(deck.id));
      const completedBubbles = bubbles.filter((_, bubbleIndex) => getBubbleLevel(progress, bubbleIndex) >= 3).length;
      const currentBubble = Math.min(completedBubbles, Math.max(0, bubbles.length - 1));
      return {
        ...deck,
        order: index + 1,
        unlocked: previousComplete || labMarkerUnlocked,
        completed: Boolean(progress.completed),
        completedBubbles,
        totalBubbles: bubbles.length,
        currentBubble,
        progressPercent: bubbles.length ? Math.round((completedBubbles / bubbles.length) * 100) : 0,
      };
    }),
  };
}

export function getVocabularyTopicPath(deckId) {
  const state = getVocabularyPathState();
  const deck = state.decks.find((item) => item.id === deckId) || state.decks[0];
  const progress = getDeckProgress(state, deck.id);
  const chunks = chunkCards(getVocabularyDeckCards(deck.id));
  const bubbles = chunks.map((cards, index) => {
    const levelDone = getBubbleLevel(progress, index);
    const previousLevelDone = index === 0 ? 3 : getBubbleLevel(progress, index - 1);
    const unlocked = deck.unlocked && (index === 0 || previousLevelDone >= 3);
    return {
      id: `${deck.id}-bubble-${index + 1}`,
      index,
      number: index + 1,
      title: index === 0 ? 'Primeiras palavras' : index === chunks.length - 1 ? 'Consolidação' : `Bloco ${index + 1}`,
      levelDone,
      unlocked,
      completed: levelDone >= 3,
      cards,
      preview: cards.slice(0, 3).map((card) => card.word).join(', '),
    };
  });
  return { deck, bubbles, progress };
}

export function getBubbleCardsForLevel(deckId, bubbleIndex, level = 1) {
  const cards = getVocabularyDeckCards(deckId);
  const chunks = chunkCards(cards);
  const bubbleCards = chunks[bubbleIndex] || chunks[0] || [];
  const count = LEVEL_CARD_STEPS[Math.max(0, Math.min(2, Number(level || 1) - 1))] || LEVEL_CARD_STEPS[0];
  const previousCards = bubbleIndex > 0 ? chunks.slice(0, bubbleIndex).flat().slice(-2) : [];
  const selectedCards = uniqueCards([...previousCards, ...bubbleCards.slice(0, Math.min(count, bubbleCards.length))]);
  return injectWeakCards({ selectedCards, deckId, bubbleIndex, level });
}

export function completeVocabularyBubbleLevel({ deckId, bubbleIndex, level }) {
  const state = readState();
  const current = getDeckProgress(state, deckId);
  const nextLevel = Math.max(getBubbleLevel(current, bubbleIndex), Number(level || 1));
  const bubbles = chunkCards(getVocabularyDeckCards(deckId));
  const nextProgress = {
    ...current,
    bubbles: { ...(current.bubbles || {}), [bubbleIndex]: Math.min(3, nextLevel) },
    updatedAt: new Date().toISOString(),
  };
  const completed = bubbles.length > 0 && bubbles.every((_, index) => getBubbleLevel(nextProgress, index) >= 3);
  nextProgress.completed = completed;
  const nextState = {
    ...state,
    deckProgress: { ...(state.deckProgress || {}), [deckId]: nextProgress },
  };
  writeState(nextState);
  return getVocabularyPathState();
}

export function getNextVocabularyTarget(deckId) {
  const path = getVocabularyTopicPath(deckId);
  const bubble = path.bubbles.find((item) => item.unlocked && !item.completed) || path.bubbles[0];
  const level = Math.min(3, Math.max(1, (bubble?.levelDone || 0) + 1));
  return { deck: path.deck, bubble, level };
}

export function getVocabularyPathStats() {
  const state = getVocabularyPathState();
  const completedTopics = state.decks.filter((deck) => deck.completed).length;
  const unlockedTopics = state.decks.filter((deck) => deck.unlocked).length;
  const totalBubbles = state.decks.reduce((sum, deck) => sum + deck.totalBubbles, 0);
  const completedBubbles = state.decks.reduce((sum, deck) => sum + deck.completedBubbles, 0);
  return {
    completedTopics,
    unlockedTopics,
    totalTopics: state.decks.length,
    totalBubbles,
    completedBubbles,
    progressPercent: totalBubbles ? Math.round((completedBubbles / totalBubbles) * 100) : 0,
  };
}
