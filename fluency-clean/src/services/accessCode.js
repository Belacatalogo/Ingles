import { storage, storageKeys } from './storage.js';
import { diagnostics } from './diagnostics.js';

const ACCESS_KEY = 'access.session';

export function getAccessSession() {
  return storage.get(ACCESS_KEY, { unlocked: false, method: null, at: null });
}

export function setAccessSession(method = 'manual') {
  const session = { unlocked: true, method, at: new Date().toISOString() };
  storage.set(ACCESS_KEY, session);
  diagnostics.log(`Acesso liberado pelo método: ${method}`, 'info');
  return session;
}

export function clearAccessSession() {
  storage.remove(ACCESS_KEY);
  diagnostics.log('Sessão de acesso local removida.', 'info');
}

export function validateAccessCode(code, expectedCode = '') {
  const cleanCode = String(code ?? '').trim();
  const cleanExpected = String(expectedCode ?? '').trim();

  if (!cleanExpected) {
    diagnostics.log('Validação de código ainda não configurada. Mantendo modo demonstrativo.', 'info');
    return { ok: false, reason: 'expected-code-not-configured' };
  }

  const ok = cleanCode === cleanExpected;
  diagnostics.log(ok ? 'Código de acesso validado.' : 'Código de acesso inválido.', ok ? 'info' : 'error');
  return { ok, reason: ok ? null : 'invalid-code' };
}

export const accessStorageKeys = {
  ...storageKeys,
  accessSession: ACCESS_KEY,
};
