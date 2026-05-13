import { A1_FINAL_EXAM_VERSION, scoreA1FinalExamObjectiveAnswers } from '../content/curriculum/levels/A1/a1FinalExamModel.js';
import { recordA1FinalExamPillarScore } from './a1MasteryGateService.js';

const STORAGE_KEY = 'fluency:a1-final-exam:objective-attempt:v1';
const OBJECTIVE_PILLARS = Object.freeze(['grammar', 'vocabulary', 'reading', 'listening']);

function safeParse(value, fallback) {
  try { return value ? JSON.parse(value) : fallback; } catch { return fallback; }
}

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

function getStoredAttempt() {
  if (!canUseStorage()) return null;
  const attempt = safeParse(window.localStorage.getItem(STORAGE_KEY), null);
  if (!attempt || attempt.version !== A1_FINAL_EXAM_VERSION) return null;
  return attempt;
}

function persistAttempt(attempt) {
  if (canUseStorage()) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attempt));
  return attempt;
}

export function getA1FinalExamObjectiveAttempt() {
  return getStoredAttempt();
}

export function saveA1FinalExamObjectiveAttempt(objectiveAnswers = {}) {
  const current = getStoredAttempt() || {};
  const scoring = scoreA1FinalExamObjectiveAnswers(objectiveAnswers);
  const attempt = Object.freeze({
    ...current,
    version: A1_FINAL_EXAM_VERSION,
    savedAt: new Date().toISOString(),
    objectiveAnswers,
    productiveDrafts: current.productiveDrafts || {},
    scoring,
  });
  return persistAttempt(attempt);
}

export function syncA1FinalExamObjectiveScoresToGate(scoring) {
  const pillarScores = scoring?.objectivePillarScores || {};
  OBJECTIVE_PILLARS.forEach((pillar) => {
    recordA1FinalExamPillarScore(pillar, pillarScores[pillar] || 0);
  });
  return Object.freeze({ syncedPillars: OBJECTIVE_PILLARS });
}

export function saveAndSyncA1FinalExamObjectiveAttempt(objectiveAnswers = {}) {
  const attempt = saveA1FinalExamObjectiveAttempt(objectiveAnswers);
  syncA1FinalExamObjectiveScoresToGate(attempt.scoring);
  return attempt;
}

export function saveA1FinalExamProductiveDraft(skill, draft = '') {
  if (!['speaking', 'writing'].includes(skill)) return getStoredAttempt();
  const current = getStoredAttempt() || {};
  const attempt = Object.freeze({
    ...current,
    version: A1_FINAL_EXAM_VERSION,
    savedAt: current.savedAt || null,
    productiveSavedAt: new Date().toISOString(),
    objectiveAnswers: current.objectiveAnswers || {},
    productiveDrafts: {
      ...(current.productiveDrafts || {}),
      [skill]: String(draft || '').trim(),
    },
    scoring: current.scoring || scoreA1FinalExamObjectiveAnswers(current.objectiveAnswers || {}),
  });
  return persistAttempt(attempt);
}

export function clearA1FinalExamObjectiveAttempt() {
  if (canUseStorage()) window.localStorage.removeItem(STORAGE_KEY);
}
