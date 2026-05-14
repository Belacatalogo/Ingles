import { scoreA1CheckpointObjectiveAnswers } from '../content/curriculum/levels/A1/a1CheckpointModel.js';
import { recordA1CheckpointScore } from './a1MasteryGateService.js';

const STORAGE_KEY = 'fluency:a1-checkpoint-attempts:v1';

function safeParse(value, fallback) {
  try { return value ? JSON.parse(value) : fallback; } catch { return fallback; }
}

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

export function getA1CheckpointAttempts() {
  if (!canUseStorage()) return {};
  return safeParse(window.localStorage.getItem(STORAGE_KEY), {});
}

export function getA1CheckpointAttempt(checkpointId) {
  return getA1CheckpointAttempts()[checkpointId] || null;
}

export function saveAndSyncA1CheckpointAttempt(checkpointId, answers = {}) {
  const scoring = scoreA1CheckpointObjectiveAnswers(checkpointId, answers);
  const attempts = getA1CheckpointAttempts();
  const attempt = Object.freeze({
    checkpointId,
    savedAt: new Date().toISOString(),
    answers,
    scoring,
  });
  const nextAttempts = { ...attempts, [checkpointId]: attempt };
  if (canUseStorage()) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAttempts));
  recordA1CheckpointScore(checkpointId, scoring.percent);
  return attempt;
}

export function clearA1CheckpointAttempts() {
  if (canUseStorage()) window.localStorage.removeItem(STORAGE_KEY);
}
