import { useMemo, useState } from 'react';
import { canAccessPhaseIndex, canAdvanceFromPhase, clampPhaseIndex, getLessonFlowPercent, getVisitedPhaseIds, safePhases } from './lessonFlowProgress.js';
import { clearDraft, loadDraft, saveDraft } from './lessonFlowDraftStore.js';

export function useLessonFlowState(phases = [], options = {}) {
  const phaseList = useMemo(() => safePhases(phases), [phases]);
  const lessonId = options.lessonId || '';

  const [activeIndex, setActiveIndex] = useState(() => {
    const draft = loadDraft(lessonId);
    return clampPhaseIndex(draft?.activeIndex ?? 0, safePhases(phases));
  });
  const [attempts, setAttempts] = useState(() => {
    const draft = loadDraft(lessonId);
    return draft?.attempts && typeof draft.attempts === 'object' ? draft.attempts : {};
  });
  const [revealed, setRevealed] = useState({});
  const [message, setMessage] = useState('');
  const [completed, setCompleted] = useState(false);

  const safeIndex = clampPhaseIndex(activeIndex, phaseList);
  const activePhase = phaseList[safeIndex] || null;
  const visitedPhaseIds = getVisitedPhaseIds(safeIndex, phaseList);
  const percent = completed ? 100 : getLessonFlowPercent(safeIndex, phaseList);
  const isFirst = safeIndex <= 0;
  const isLast = safeIndex >= phaseList.length - 1;
  const canAdvance = canAdvanceFromPhase(activePhase, attempts);

  function goTo(index) {
    const target = clampPhaseIndex(index, phaseList);
    // Block if any mandatory phase between current and target is incomplete
    if (!canAccessPhaseIndex({ targetIndex: target, activeIndex: safeIndex, phases: phaseList, attempts, completed })) {
      setMessage(activePhase?.blockedMessage || 'Conclua as etapas anteriores antes de avançar.');
      return;
    }
    setActiveIndex(target);
    saveDraft(lessonId, { activeIndex: target, attempts });
    // Note: does NOT reset completed — only restart() resets it
    setMessage('');
    options.onPhaseChange?.(phaseList[target], target);
  }

  function canGoToIndex(index) {
    return canAccessPhaseIndex({ targetIndex: index, activeIndex: safeIndex, phases: phaseList, attempts, completed });
  }

  function restart() {
    setCompleted(false);
    setActiveIndex(0);
    setMessage('');
  }

  function next() {
    if (!activePhase) return;
    if (!canAdvance) {
      setMessage(activePhase.blockedMessage || 'Faça a tentativa desta etapa antes de avançar.');
      return;
    }
    if (isLast) {
      // Scoring gate: at least one mandatory phase must have been attempted
      const mandatory = phaseList.filter((p) => p.requiresAttempt === true);
      if (mandatory.length > 0 && mandatory.every((p) => !attempts[p.id])) {
        setMessage('Você precisa tentar ao menos uma etapa obrigatória antes de concluir.');
        return;
      }
      // Completion card is shown only after the shell confirms the save succeeded
      options.onComplete?.({
        phases: phaseList,
        attempts,
        onSaveSuccess: () => {
          setCompleted(true);
          clearDraft(lessonId);
        },
        onSaveError: (errorMsg) => {
          setMessage(errorMsg || 'Não foi possível registrar o progresso. Tente concluir novamente.');
        },
      });
    } else {
      goTo(safeIndex + 1);
    }
  }

  function previous() {
    if (!isFirst) goTo(safeIndex - 1);
  }

  function markAttempt(phaseId = activePhase?.id, payload = true) {
    if (!phaseId) return;
    setAttempts((current) => {
      const next = { ...current, [phaseId]: payload };
      saveDraft(lessonId, { activeIndex: safeIndex, attempts: next });
      return next;
    });
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
    completed,
    message,
    setMessage,
    goTo,
    canGoToIndex,
    restart,
    next,
    previous,
    markAttempt,
    markReveal,
  };
}
