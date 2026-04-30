import {
  GoogleAuthProvider,
  browserLocalPersistence,
  browserSessionPersistence,
  getRedirectResult,
  indexedDBLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import { configureCloudSyncUser } from './cloudSync.js';
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

function getReadableAuthError(error) {
  const code = error?.code || '';
  const message = error?.message || String(error || 'Erro desconhecido.');

  if (code.includes('unauthorized-domain')) {
    return 'Domínio não autorizado no Firebase. Adicione o domínio do Vercel em Authentication > Settings > Authorized domains.';
  }

  if (code.includes('operation-not-allowed')) {
    return 'Login Google não está ativado no Firebase Authentication > Sign-in method.';
  }

  if (code.includes('popup-blocked') || code.includes('popup-closed-by-user')) {
    return 'O popup do Google foi bloqueado ou fechado pelo navegador. No iPhone, use Entrar com Google por redirecionamento.';
  }

  if (code.includes('cancelled-popup-request')) {
    return 'Uma tentativa de popup foi cancelada. Tente novamente usando redirecionamento.';
  }

  if (code.includes('web-storage-unsupported')) {
    return 'O navegador bloqueou armazenamento necessário para login. Desative bloqueio de cookies/conteúdo e tente novamente.';
  }

  if (code.includes('network-request-failed')) {
    return 'Falha de rede ao abrir o login Google. Verifique a conexão e tente novamente.';
  }

  return message;
}

async function prepareAuthPersistence(auth) {
  const options = [
    { name: 'indexedDBLocalPersistence', value: indexedDBLocalPersistence },
    { name: 'browserLocalPersistence', value: browserLocalPersistence },
    { name: 'browserSessionPersistence', value: browserSessionPersistence },
  ];

  for (const option of options) {
    try {
      await setPersistence(auth, option.value);
      diagnostics.log(`Persistência Firebase Auth ativa: ${option.name}.`, 'info');
      return true;
    } catch (error) {
      diagnostics.log(`Persistência ${option.name} falhou: ${getReadableAuthError(error)}`, 'warn');
    }
  }

  diagnostics.log('Nenhuma persistência Firebase Auth pôde ser configurada.', 'error');
  return false;
}

export function subscribeAuth(callback) {
  const auth = getFirebaseAuth();
  if (!auth) {
    callback(null);
    return () => {};
  }

  prepareAuthPersistence(auth);

  return onAuthStateChanged(auth, (user) => {
    const normalized = normalizeUser(user);
    diagnostics.log(normalized ? `Usuário autenticado: ${normalized.email}` : 'Usuário não autenticado.', 'info');
    configureCloudSyncUser(normalized);
    callback(normalized);
  }, (error) => {
    diagnostics.log(`Erro no listener Firebase Auth: ${getReadableAuthError(error)}`, 'error');
    callback(null);
  });
}

export async function resolveGoogleRedirectResult() {
  const auth = getFirebaseAuth();
  if (!auth) {
    return { ok: false, user: null, error: 'Firebase não configurado.' };
  }

  try {
    await prepareAuthPersistence(auth);
    diagnostics.log('Verificando retorno do redirect Google.', 'info');
    const result = await getRedirectResult(auth);

    if (!result?.user) {
      diagnostics.log('Nenhum resultado pendente de redirect Google encontrado.', 'info');
      return { ok: true, user: null, empty: true, error: null };
    }

    const user = normalizeUser(result.user);
    diagnostics.log(`Retorno do Google capturado: ${user?.email || 'usuário sem email'}.`, 'info');
    await configureCloudSyncUser(user);
    return { ok: true, user, empty: false, error: null };
  } catch (error) {
    const readable = getReadableAuthError(error);
    diagnostics.log(`Erro ao capturar retorno Google: ${readable}`, 'error');
    return {
      ok: false,
      user: null,
      error: readable,
      code: error?.code || '',
      rawError: error?.message || String(error),
    };
  }
}

export async function signInWithGoogle({ mode = 'redirect' } = {}) {
  const auth = getFirebaseAuth();
  if (!auth) {
    diagnostics.log('Login Google indisponível: Firebase não configurado.', 'error');
    return { ok: false, user: null, error: 'Firebase não configurado.' };
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  try {
    diagnostics.setPhase(`login Google ${mode}`, 'authenticating');
    diagnostics.log(`Iniciando login Google via ${mode}.`, 'info');

    if (mode === 'popup') {
      const result = await signInWithPopup(auth, provider);
      const user = normalizeUser(result.user);
      diagnostics.log(`Login Google concluído via popup: ${user?.email || 'usuário sem email'}.`, 'info');
      await configureCloudSyncUser(user);
      return { ok: true, user, redirect: false, error: null };
    }

    await prepareAuthPersistence(auth);
    await signInWithRedirect(auth, provider);
    diagnostics.log('Redirect Google solicitado ao navegador.', 'info');
    return { ok: true, user: null, redirect: true, error: null };
  } catch (error) {
    const readable = getReadableAuthError(error);
    diagnostics.log(`Erro no login Google: ${readable}`, 'error');
    return {
      ok: false,
      user: null,
      error: readable,
      code: error?.code || '',
      rawError: error?.message || String(error),
    };
  }
}

export async function logout() {
  const auth = getFirebaseAuth();
  if (!auth) {
    await configureCloudSyncUser(null);
    return { ok: true };
  }

  try {
    await signOut(auth);
    await configureCloudSyncUser(null);
    diagnostics.log('Logout concluído.', 'info');
    return { ok: true };
  } catch (error) {
    diagnostics.log(`Erro no logout: ${error?.message || error}`, 'error');
    return { ok: false, error: error?.message || String(error) };
  }
}
