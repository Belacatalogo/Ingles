import { useMemo, useState } from 'react';
import { canAdvanceFromPhase, clampPhaseIndex, getLessonFlowPercent, getVisitedPhaseIds, safePhases } from './lessonFlowProgress.js';

export function useLessonFlowState(phases = [], options = {}) {
  const phaseList = useMemo(() => safePhases(phases), [phases]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [attempts, setAttempts] = useState({});
  const [revealed, setRevealed] = useState({});
  const [message, setMessage] = useState('');

  const safeIndex = clampPhaseIndex(activeIndex, phaseList);
  const activePhase = phaseList[safeIndex] || null;
  const visitedPhaseIds = getVisitedPhaseIds(safeIndex, phaseList);
  const percent = getLessonFlowPercent(safeIndex, phaseList);
  const isFirst = safeIndex <= 0;
  const isLast = safeIndex >= phaseList.length - 1;
  const canAdvance = canAdvanceFromPhase(activePhase, attempts);

  function goTo(index) {
    const nextIndex = clampPhaseIndex(index, phaseList);
    setActiveIndex(nextIndex);
    setMessage('');
    options.onPhaseChange?.(phaseList[nextIndex], nextIndex);
  }

  function next() {
    if (!activePhase) return;
    if (!canAdvance) {
      setMessage(activePhase.blockedMessage || 'Faça a tentativa desta etapa antes de avançar.');
      return;
    }
    if (!isLast) goTo(safeIndex + 1);
  }

  function previous() {
    if (!isFirst) goTo(safeIndex - 1);
  }

  function markAttempt(phaseId = activePhase?.id, payload = true) {
    if (!phaseId) return;
    setAttempts((current) => ({ ...current, [phaseId]: payload }));
    setMessage('Tentativa registrada.');
  }

  function markReveal(phaseId = activePhase?.id, payload = true) {
    if (!phaseId) return;
    setRevealed((current) => ({ ...current, [phaseId]: payload }));
  }

  return {
    phases: phaseList,
    activeIndex: safeIndex,
    activePhase,
    attempts,
    revealed,
    visitedPhaseIds,
    percent,
    isFirst,
    isLast,
    canAdvance,
    message,
    setMessage,
    goTo,
    next,
    previous,
    markAttempt,
    markReveal,
  };
}
