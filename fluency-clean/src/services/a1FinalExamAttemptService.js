import { A1_FINAL_EXAM_VERSION, scoreA1FinalExamObjectiveAnswers } from '../content/curriculum/levels/A1/a1FinalExamModel.js';

const STORAGE_KEY = 'fluency:a1-final-exam:objective-attempt:v1';

function safeParse(value, fallback) {
  try { return value ? JSON.parse(value) : fallback; } catch { return fallback; }
}

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

export function getA1FinalExamObjectiveAttempt() {
  if (!canUseStorage()) return null;
  const attempt = safeParse(window.localStorage.getItem(STORAGE_KEY), null);
  if (!attempt || attempt.version !== A1_FINAL_EXAM_VERSION) return null;
  return attempt;
}

export function saveA1FinalExamObjectiveAttempt(objectiveAnswers = {}) {
  const scoring = scoreA1FinalExamObjectiveAnswers(objectiveAnswers);
  const attempt = Object.freeze({
    version: A1_FINAL_EXAM_VERSION,
    savedAt: new Date().toISOString(),
    objectiveAnswers,
    scoring,
  });
  if (canUseStorage()) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attempt));
  return attempt;
}

export function clearA1FinalExamObjectiveAttempt() {
  if (canUseStorage()) window.localStorage.removeItem(STORAGE_KEY);
}
