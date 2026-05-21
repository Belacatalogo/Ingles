const DEFAULT_LIVES = 5;
const XP = {
  introKnown: 2,
  correct: 10,
  retryCorrect: 6,
  completed: 25,
  perfectBonus: 15,
  streakStep: 2,
};

function clampNumber(value, min, max) {
  return Math.max(min, Math.min(max, Number(value || 0)));
}

function safeNow() {
  return new Date().toISOString();
}

export function createVocabularyGameSession({ lives = DEFAULT_LIVES } = {}) {
  return {
    lives: clampNumber(lives, 1, 10),
    maxLives: clampNumber(lives, 1, 10),
    xp: 0,
    streak: 0,
    bestStreak: 0,
    correct: 0,
    wrong: 0,
    reviewed: 0,
    gameOver: false,
    completed: false,
    lastEvent: 'start',
    updatedAt: safeNow(),
  };
}

export function awardKnownIntroXp(session = createVocabularyGameSession()) {
  return {
    ...session,
    xp: Number(session.xp || 0) + XP.introKnown,
    lastEvent: 'known-intro',
    updatedAt: safeNow(),
  };
}

export function scoreVocabularyGameAnswer(session = createVocabularyGameSession(), { correct = false, retry = false } = {}) {
  const reviewed = Number(session.reviewed || 0) + 1;
  const currentStreak = correct ? Number(session.streak || 0) + 1 : 0;
  const bestStreak = Math.max(Number(session.bestStreak || 0), currentStreak);
  const nextLives = correct ? Number(session.lives || DEFAULT_LIVES) : Math.max(0, Number(session.lives || DEFAULT_LIVES) - 1);
  const streakBonus = correct ? Math.min(10, Math.floor(currentStreak / 3) * XP.streakStep) : 0;
  const gainedXp = correct ? (retry ? XP.retryCorrect : XP.correct) + streakBonus : 0;

  return {
    ...session,
    lives: nextLives,
    xp: Number(session.xp || 0) + gainedXp,
    streak: currentStreak,
    bestStreak,
    correct: Number(session.correct || 0) + (correct ? 1 : 0),
    wrong: Number(session.wrong || 0) + (correct ? 0 : 1),
    reviewed,
    gameOver: nextLives <= 0,
    lastEvent: correct ? 'correct' : 'wrong',
    updatedAt: safeNow(),
  };
}

export function completeVocabularyGameSession(session = createVocabularyGameSession()) {
  const perfect = Number(session.wrong || 0) === 0 && Number(session.reviewed || 0) > 0;
  const completionXp = XP.completed + (perfect ? XP.perfectBonus : 0);
  return {
    ...session,
    xp: Number(session.xp || 0) + completionXp,
    completed: true,
    gameOver: false,
    lastEvent: perfect ? 'perfect-complete' : 'complete',
    updatedAt: safeNow(),
  };
}

export function getVocabularyGameFeedback(session = createVocabularyGameSession()) {
  const lives = clampNumber(session.lives, 0, session.maxLives || DEFAULT_LIVES);
  const hearts = Array.from({ length: Number(session.maxLives || DEFAULT_LIVES) }, (_, index) => index < lives ? '❤️' : '🖤').join('');
  const accuracy = Number(session.reviewed || 0) ? Math.round((Number(session.correct || 0) / Number(session.reviewed || 1)) * 100) : 0;
  return {
    hearts,
    lives,
    xp: Number(session.xp || 0),
    streak: Number(session.streak || 0),
    bestStreak: Number(session.bestStreak || 0),
    accuracy,
    gameOver: Boolean(session.gameOver),
    completed: Boolean(session.completed),
    lastEvent: session.lastEvent || 'start',
  };
}

export function createVocabularyConfettiParticles(count = 24) {
  return Array.from({ length: Math.max(8, Math.min(60, Number(count || 24))) }, (_, index) => ({
    id: `vocab-confetti-${Date.now()}-${index}`,
    x: Math.round((index * 37) % 100),
    delayMs: (index % 8) * 55,
    size: 8 + (index % 5) * 2,
    rotate: (index * 23) % 360,
    emoji: ['✨', '🎉', '⭐', '💫'][index % 4],
  }));
}

export function playVocabularyFeedbackSound(type = 'tap') {
  if (typeof window === 'undefined') return false;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return false;
  try {
    const context = new AudioContext();
    const gain = context.createGain();
    const oscillator = context.createOscillator();
    const now = context.currentTime;
    const toneMap = {
      correct: [660, 880],
      wrong: [220, 160],
      complete: [523, 659, 784],
      gameOver: [196, 146],
      tap: [420],
    };
    const tones = toneMap[type] || toneMap.tap;
    oscillator.type = type === 'wrong' || type === 'gameOver' ? 'triangle' : 'sine';
    oscillator.frequency.setValueAtTime(tones[0], now);
    tones.slice(1).forEach((frequency, index) => oscillator.frequency.setValueAtTime(frequency, now + (index + 1) * 0.09));
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + Math.min(0.42, 0.16 + tones.length * 0.08));
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + Math.min(0.45, 0.18 + tones.length * 0.08));
    oscillator.onended = () => context.close?.();
    return true;
  } catch {
    return false;
  }
}

export const VOCABULARY_GAME_XP = XP;
