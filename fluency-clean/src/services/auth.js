import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import { diagnostics } from './diagnostics.js';
import { getFirebaseAuth } from './firebase.js';

function normalizeUser(user) {
  if (!user) return null;
  return {
    uid: user.uid,
    name: user.displayName || '',
    email: user.email || '',
    photoURL: user.photoURL || '',
    providerId: user.providerId || '',
  };
}

export function subscribeAuth(callback) {
  const auth = getFirebaseAuth();
  if (!auth) {
    callback(null);
    return () => {};
  }

  return onAuthStateChanged(auth, (user) => {
    const normalized = normalizeUser(user);
    diagnostics.log(normalized ? `Usuário autenticado: ${normalized.email}` : 'Usuário não autenticado.', 'info');
    callback(normalized);
  });
}

export async function signInWithGoogle({ preferRedirect = false } = {}) {
  const auth = getFirebaseAuth();
  if (!auth) {
    diagnostics.log('Login Google indisponível: Firebase não configurado.', 'error');
    return { ok: false, user: null, error: 'Firebase não configurado.' };
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  try {
    diagnostics.setPhase('login com Google', 'authenticating');

    if (preferRedirect) {
      await signInWithRedirect(auth, provider);
      return { ok: true, user: null, redirect: true, error: null };
    }

    const result = await signInWithPopup(auth, provider);
    return { ok: true, user: normalizeUser(result.user), redirect: false, error: null };
  } catch (error) {
    diagnostics.log(`Erro no login Google: ${error?.message || error}`, 'error');
    return { ok: false, user: null, error: error?.message || String(error) };
  }
}

export async function logout() {
  const auth = getFirebaseAuth();
  if (!auth) return { ok: true };

  try {
    await signOut(auth);
    diagnostics.log('Logout concluído.', 'info');
    return { ok: true };
  } catch (error) {
    diagnostics.log(`Erro no logout: ${error?.message || error}`, 'error');
    return { ok: false, error: error?.message || String(error) };
  }
}
