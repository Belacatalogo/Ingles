export function safePhases(phases = []) {
  return Array.isArray(phases) ? phases.filter((phase) => phase?.id) : [];
}

export function clampPhaseIndex(index = 0, phases = []) {
  const list = safePhases(phases);
  if (!list.length) return 0;
  return Math.max(0, Math.min(Number(index) || 0, list.length - 1));
}

export function getLessonFlowPercent(activeIndex = 0, phases = []) {
  const list = safePhases(phases);
  if (!list.length) return 0;
  return Math.round(((clampPhaseIndex(activeIndex, list) + 1) / list.length) * 100);
}

export function getVisitedPhaseIds(activeIndex = 0, phases = []) {
  const list = safePhases(phases);
  const end = clampPhaseIndex(activeIndex, list);
  return list.slice(0, end + 1).map((phase) => phase.id);
}

export function isPhaseAttempted(phase, attempts = {}) {
  if (!phase?.id) return false;
  if (phase.requiresAttempt === false) return true;
  if (!phase.requiresAttempt) return true;
  return Boolean(attempts[phase.id]);
}

export function canAdvanceFromPhase(phase, attempts = {}) {
  if (!phase) return false;
  if (typeof phase.canAdvance === 'function') return Boolean(phase.canAdvance({ attempts, phase }));
  return isPhaseAttempted(phase, attempts);
}

export function buildInitialFlowState(phases = []) {
  const list = safePhases(phases);
  return {
    activeIndex: 0,
    activePhaseId: list[0]?.id || '',
    visitedPhaseIds: list[0]?.id ? [list[0].id] : [],
    percent: getLessonFlowPercent(0, list),
  };
}
