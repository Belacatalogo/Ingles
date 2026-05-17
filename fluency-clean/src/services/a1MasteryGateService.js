import { A1_CHECKPOINTS, A1_FINAL_EXAM, evaluateA1FinalGate, getA1FinalExamReadiness } from '../content/curriculum/levels/A1/a1MasteryAssessments.js';
import { LEVEL_MASTERY_PILLARS, LEVEL_PASSING_RULES } from '../content/curriculum/levelMasteryFramework.js';

const STORAGE_KEY = 'fluency:a1-mastery-gate:v1';

const DEFAULT_PILLAR_SCORES = Object.freeze({
  grammar: 0,
  vocabulary: 0,
  reading: 0,
  listening: 0,
  speaking: 0,
  writing: 0,
});

function safeParse(value, fallback) {
  try { return value ? JSON.parse(value) : fallback; } catch { return fallback; }
}

function clampPercent(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.max(0, Math.min(100, Math.round(number)));
}

function normalizeCheckpointScores(scores = {}) {
  return A1_CHECKPOINTS.reduce((acc, checkpoint) => {
    acc[checkpoint.id] = clampPercent(scores[checkpoint.id]);
    return acc;
  }, {});
}

function normalizePillarScores(scores = {}) {
  return LEVEL_MASTERY_PILLARS.reduce((acc, pillar) => {
    acc[pillar] = clampPercent(scores[pillar]);
    return acc;
  }, { ...DEFAULT_PILLAR_SCORES });
}

function normalizeState(raw = {}) {
  const safeRaw = (raw && typeof raw === 'object' && !Array.isArray(raw)) ? raw : {};
  const now = new Date().toISOString();
  return {
    version: 1,
    level: 'A1',
    lessonCompletionPercent: clampPercent(safeRaw.lessonCompletionPercent),
    checkpointScores: normalizeCheckpointScores(safeRaw.checkpointScores),
    finalExamPillarScores: normalizePillarScores(safeRaw.finalExamPillarScores),
    speakingReviewed: Boolean(safeRaw.speakingReviewed),
    writingReviewed: Boolean(safeRaw.writingReviewed),
    finalExamSubmittedAt: safeRaw.finalExamSubmittedAt || null,
    updatedAt: safeRaw.updatedAt || now,
  };
}

export function getA1MasteryGateState() {
  if (typeof localStorage === 'undefined') return normalizeState();
  return normalizeState(safeParse(localStorage.getItem(STORAGE_KEY), {}));
}

export function saveA1MasteryGateState(nextState = {}) {
  const current = getA1MasteryGateState();
  const normalized = normalizeState({ ...current, ...nextState, updatedAt: new Date().toISOString() });
  if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
}

export function updateA1LessonCompletion(lessonCompletionPercent = 0) {
  return saveA1MasteryGateState({ lessonCompletionPercent: clampPercent(lessonCompletionPercent) });
}

export function recordA1CheckpointScore(checkpointId, score) {
  const current = getA1MasteryGateState();
  const exists = A1_CHECKPOINTS.some((checkpoint) => checkpoint.id === checkpointId);
  if (!exists) return current;
  return saveA1MasteryGateState({ checkpointScores: { ...current.checkpointScores, [checkpointId]: clampPercent(score) } });
}

export function recordA1FinalExamPillarScore(pillar, score) {
  const current = getA1MasteryGateState();
  if (!LEVEL_MASTERY_PILLARS.includes(pillar)) return current;
  return saveA1MasteryGateState({
    finalExamPillarScores: { ...current.finalExamPillarScores, [pillar]: clampPercent(score) },
    finalExamSubmittedAt: new Date().toISOString(),
  });
}

export function markA1ProductiveSkillReviewed(skill, reviewed = true) {
  if (skill === 'speaking') return saveA1MasteryGateState({ speakingReviewed: Boolean(reviewed) });
  if (skill === 'writing') return saveA1MasteryGateState({ writingReviewed: Boolean(reviewed) });
  return getA1MasteryGateState();
}

export function getA1MasteryGateSummary() {
  const state = getA1MasteryGateState();
  const readiness = getA1FinalExamReadiness({
    lessonCompletionPercent: state.lessonCompletionPercent,
    checkpointScores: state.checkpointScores,
  });
  const gate = evaluateA1FinalGate({
    lessonCompletionPercent: state.lessonCompletionPercent,
    checkpointScores: state.checkpointScores,
    finalExamPillarScores: state.finalExamPillarScores,
    speakingReviewed: state.speakingReviewed,
    writingReviewed: state.writingReviewed,
  });

  const weakPillars = LEVEL_MASTERY_PILLARS.filter((pillar) => state.finalExamPillarScores[pillar] < LEVEL_PASSING_RULES.minimumPillarPercent);
  const missingCheckpoints = A1_CHECKPOINTS.filter((checkpoint) => state.checkpointScores[checkpoint.id] < checkpoint.passingScore).map((checkpoint) => checkpoint.id);

  return Object.freeze({
    level: 'A1',
    nextLevel: 'A2',
    finalExam: A1_FINAL_EXAM,
    checkpoints: A1_CHECKPOINTS,
    state,
    readiness,
    gate,
    locked: !gate.canAdvance,
    canTakeFinalExam: readiness.ready,
    canUnlockA2: gate.canAdvance,
    weakPillars,
    missingCheckpoints,
    requiredActions: Object.freeze([
      ...readiness.issues,
      ...gate.issues,
    ]),
    statusLabel: gate.canAdvance ? 'A2 liberado' : readiness.ready ? 'Pronto para A1 Final Exam' : 'A1 em progresso',
  });
}

export function resetA1MasteryGateState() {
  if (typeof localStorage !== 'undefined') localStorage.removeItem(STORAGE_KEY);
  return getA1MasteryGateState();
}
