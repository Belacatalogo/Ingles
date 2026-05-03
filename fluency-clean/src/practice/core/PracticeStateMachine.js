import { useEffect, useRef, useState } from 'react';

export const PRACTICE_STATES = Object.freeze({
  INIT: 'init',
  READY: 'ready',
  PRESENTING: 'presenting',
  ANSWERING: 'answering',
  CHECKING: 'checking',
  FEEDBACK: 'feedback',
  TRANSITIONING: 'transitioning',
  SAVING: 'saving',
  DONE: 'done',
  ABORTED: 'aborted',
});

export const PRACTICE_EVENTS = Object.freeze({
  PLAN_LOADED: 'plan_loaded',
  START: 'start',
  USER_INTERACTED: 'user_interacted',
  USER_SUBMITTED: 'user_submitted',
  CHECK_DONE: 'check_done',
  NEXT: 'next',
  ALL_DONE: 'all_done',
  SAVE_DONE: 'save_done',
  ABORT: 'abort',
  RESET: 'reset',
});

const TRANSITIONS = Object.freeze({
  [PRACTICE_STATES.INIT]: Object.freeze({
    [PRACTICE_EVENTS.PLAN_LOADED]: PRACTICE_STATES.READY,
    [PRACTICE_EVENTS.ABORT]: PRACTICE_STATES.ABORTED,
  }),
  [PRACTICE_STATES.READY]: Object.freeze({
    [PRACTICE_EVENTS.START]: PRACTICE_STATES.PRESENTING,
    [PRACTICE_EVENTS.ABORT]: PRACTICE_STATES.ABORTED,
  }),
  [PRACTICE_STATES.PRESENTING]: Object.freeze({
    [PRACTICE_EVENTS.USER_INTERACTED]: PRACTICE_STATES.ANSWERING,
    [PRACTICE_EVENTS.ABORT]: PRACTICE_STATES.ABORTED,
  }),
  [PRACTICE_STATES.ANSWERING]: Object.freeze({
    [PRACTICE_EVENTS.USER_SUBMITTED]: PRACTICE_STATES.CHECKING,
    [PRACTICE_EVENTS.ABORT]: PRACTICE_STATES.ABORTED,
  }),
  [PRACTICE_STATES.CHECKING]: Object.freeze({
    [PRACTICE_EVENTS.CHECK_DONE]: PRACTICE_STATES.FEEDBACK,
  }),
  [PRACTICE_STATES.FEEDBACK]: Object.freeze({
    [PRACTICE_EVENTS.NEXT]: PRACTICE_STATES.TRANSITIONING,
    [PRACTICE_EVENTS.ALL_DONE]: PRACTICE_STATES.SAVING,
    [PRACTICE_EVENTS.ABORT]: PRACTICE_STATES.ABORTED,
  }),
  [PRACTICE_STATES.TRANSITIONING]: Object.freeze({
    [PRACTICE_EVENTS.PLAN_LOADED]: PRACTICE_STATES.PRESENTING,
  }),
  [PRACTICE_STATES.SAVING]: Object.freeze({
    [PRACTICE_EVENTS.SAVE_DONE]: PRACTICE_STATES.DONE,
  }),
  [PRACTICE_STATES.DONE]: Object.freeze({
    [PRACTICE_EVENTS.RESET]: PRACTICE_STATES.INIT,
  }),
  [PRACTICE_STATES.ABORTED]: Object.freeze({
    [PRACTICE_EVENTS.RESET]: PRACTICE_STATES.INIT,
  }),
});

export function getPracticeTransitionTarget(state, event) {
  return TRANSITIONS[state]?.[event] || null;
}

export function isPracticeState(state) {
  return Object.values(PRACTICE_STATES).includes(state);
}

export function isPracticeEvent(event) {
  return Object.values(PRACTICE_EVENTS).includes(event);
}

/**
 * Cria uma máquina de estado para uma sessão de prática.
 * @param {Object} initialContext - dados iniciais (plan, lessonId, etc).
 * @returns {Object} - { dispatch, can, subscribe, snapshot, reset }
 */
export function createPracticeStateMachine(initialContext = {}) {
  let currentState = PRACTICE_STATES.INIT;
  let context = { ...initialContext };
  const listeners = new Set();

  function emit(previous, event) {
    const nextSnapshot = snapshot();
    listeners.forEach((listener) => {
      try {
        listener({ previous, current: currentState, event, context: nextSnapshot.context });
      } catch (err) {
        console.error('[PracticeStateMachine] Listener error:', err);
      }
    });
  }

  function can(event) {
    const allowed = TRANSITIONS[currentState];
    return Boolean(allowed && allowed[event]);
  }

  function dispatch(event, payload = {}) {
    const allowed = TRANSITIONS[currentState];
    const next = allowed?.[event];
    if (!next) {
      console.warn(`[PracticeStateMachine] Transição inválida: ${currentState} + ${event}`);
      return { ok: false, state: currentState, reason: 'invalid_transition' };
    }

    const previous = currentState;
    currentState = next;
    context = {
      ...context,
      ...payload,
      lastEvent: event,
      lastTransitionAt: Date.now(),
    };
    emit(previous, event);
    return { ok: true, state: currentState, previous };
  }

  function reset(nextContext = {}) {
    const previous = currentState;
    currentState = PRACTICE_STATES.INIT;
    context = {
      ...initialContext,
      ...nextContext,
      lastEvent: PRACTICE_EVENTS.RESET,
      lastTransitionAt: Date.now(),
    };
    emit(previous, PRACTICE_EVENTS.RESET);
    return { ok: true, state: currentState, previous };
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function snapshot() {
    return { state: currentState, context: { ...context } };
  }

  return { dispatch, can, subscribe, snapshot, reset };
}

export function usePracticeStateMachine(initialContext = {}) {
  const machineRef = useRef(null);
  if (!machineRef.current) {
    machineRef.current = createPracticeStateMachine(initialContext);
  }

  const [currentSnapshot, setCurrentSnapshot] = useState(machineRef.current.snapshot());

  useEffect(() => {
    return machineRef.current.subscribe(() => {
      setCurrentSnapshot(machineRef.current.snapshot());
    });
  }, []);

  return {
    ...currentSnapshot,
    dispatch: machineRef.current.dispatch,
    can: machineRef.current.can,
    reset: machineRef.current.reset,
  };
}
