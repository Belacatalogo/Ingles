import { storage, storageKeys } from './storage.js';

const MAX_LOGS = 120;
let listeners = new Set();
let state = {
  status: 'idle',
  phase: 'pronto',
  logs: storage.get(storageKeys.diagnostics, []),
  lastError: null,
};

function emit() {
  for (const listener of listeners) {
    try {
      listener(state);
    } catch (error) {
      console.warn('[Fluency diagnostics] listener failed', error);
    }
  }
}

export const diagnostics = {
  subscribe(listener) {
    listeners.add(listener);
    listener(state);
    return () => listeners.delete(listener);
  },

  snapshot() {
    return state;
  },

  setPhase(phase, status = state.status) {
    state = { ...state, phase, status };
    emit();
  },

  log(message, type = 'info', meta = null) {
    const item = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      at: new Date().toISOString(),
      type,
      message: String(message ?? ''),
      meta,
    };

    const logs = [...state.logs, item].slice(-MAX_LOGS);
    state = {
      ...state,
      logs,
      lastError: type === 'error' ? item.message : state.lastError,
      status: type === 'error' ? 'error' : state.status,
    };

    storage.set(storageKeys.diagnostics, logs);
    emit();
    return item;
  },

  clear() {
    state = { status: 'idle', phase: 'pronto', logs: [], lastError: null };
    storage.remove(storageKeys.diagnostics);
    emit();
  },
};
