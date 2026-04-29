import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { diagnostics } from './diagnostics.js';
import { getFirebaseDb } from './firebase.js';
import { storage } from './storage.js';

const CLOUD_SYNC_STATUS_KEY = 'cloud.sync.status';
const CLOUD_SYNC_KEYS = [
  'progress.summary',
  'progress.lessonCompletions',
  'progress.lessonDrafts',
  'curriculum.progress.v1',
  'mastery.skillProfile.v1',
  'lesson.current',
  'lesson.history',
  'lesson.gemini.flashKeys',
  'lesson.gemini.proKey',
  'settings',
];

let currentUser = null;
let syncTimer = null;
let hydrationPromise = null;

function sanitizeUser(user) {
  if (!user?.uid) return null;
  return {
    uid: user.uid,
    email: user.email || '',
    name: user.name || '',
    photoURL: user.photoURL || '',
  };
}

function getUserDocRef(user = currentUser) {
  const db = getFirebaseDb();
  const cleanUser = sanitizeUser(user);
  if (!db || !cleanUser?.uid) return null;
  return doc(db, 'fluencyUsers', cleanUser.uid);
}

function collectLocalData() {
  return CLOUD_SYNC_KEYS.reduce((acc, key) => {
    acc[key] = storage.get(key, null);
    if (acc[key] === null) {
      const text = storage.getText(key, null);
      if (text !== null) acc[key] = text;
    }
    return acc;
  }, {});
}

function applyCloudData(data = {}) {
  const payload = data?.data && typeof data.data === 'object' ? data.data : {};
  Object.entries(payload).forEach(([key, value]) => {
    if (!CLOUD_SYNC_KEYS.includes(key)) return;
    if (typeof value === 'string') storage.setText(key, value);
    else storage.set(key, value);
  });
}

function getLocalStatus() {
  return storage.get(CLOUD_SYNC_STATUS_KEY, {
    enabled: false,
    userEmail: '',
    lastPullAt: '',
    lastPushAt: '',
    lastError: '',
    mode: 'local',
  });
}

function setLocalStatus(next) {
  const current = getLocalStatus();
  const status = { ...current, ...next };
  storage.set(CLOUD_SYNC_STATUS_KEY, status);
  return status;
}

export function getCloudSyncStatus() {
  return getLocalStatus();
}

export async function hydrateFromCloud(user) {
  const cleanUser = sanitizeUser(user);
  const ref = getUserDocRef(cleanUser);
  if (!cleanUser || !ref) {
    setLocalStatus({ enabled: false, mode: 'local', lastError: 'Firebase/usuário indisponível.' });
    return { ok: false, error: 'Firebase/usuário indisponível.' };
  }

  if (hydrationPromise) return hydrationPromise;

  hydrationPromise = (async () => {
    try {
      diagnostics.setPhase('sincronizando dados da conta', 'sync');
      diagnostics.log(`Usuário Google detectado para sync: ${cleanUser.email || cleanUser.uid}.`, 'info');
      const snapshot = await getDoc(ref);

      if (snapshot.exists()) {
        applyCloudData(snapshot.data());
        diagnostics.log('Progresso carregado da nuvem Firebase.', 'info');
      } else {
        diagnostics.log('Nenhum progresso na nuvem ainda. Enviando dados locais para criar perfil.', 'info');
        await pushToCloud(cleanUser, { reason: 'initial-create' });
      }

      setLocalStatus({
        enabled: true,
        mode: 'cloud',
        userEmail: cleanUser.email,
        lastPullAt: new Date().toISOString(),
        lastError: '',
      });

      return { ok: true };
    } catch (error) {
      const message = error?.message || String(error);
      diagnostics.log(`Falha ao carregar dados da nuvem: ${message}`, 'error');
      setLocalStatus({ enabled: false, mode: 'local-fallback', userEmail: cleanUser.email, lastError: message });
      return { ok: false, error: message };
    } finally {
      hydrationPromise = null;
    }
  })();

  return hydrationPromise;
}

export async function pushToCloud(user = currentUser, { reason = 'manual' } = {}) {
  const cleanUser = sanitizeUser(user);
  const ref = getUserDocRef(cleanUser);
  if (!cleanUser || !ref) return { ok: false, error: 'Sem usuário Google/Firebase para sincronizar.' };

  try {
    await setDoc(ref, {
      user: cleanUser,
      data: collectLocalData(),
      updatedAt: serverTimestamp(),
      updatedAtClient: new Date().toISOString(),
      reason,
      schema: 1,
    }, { merge: true });

    diagnostics.log(`Dados sincronizados com Firebase (${reason}).`, 'info');
    setLocalStatus({
      enabled: true,
      mode: 'cloud',
      userEmail: cleanUser.email,
      lastPushAt: new Date().toISOString(),
      lastError: '',
    });
    return { ok: true };
  } catch (error) {
    const message = error?.message || String(error);
    diagnostics.log(`Falha ao salvar dados na nuvem: ${message}`, 'error');
    setLocalStatus({ enabled: false, mode: 'local-fallback', userEmail: cleanUser.email, lastError: message });
    return { ok: false, error: message };
  }
}

export function scheduleCloudSync(reason = 'change') {
  if (!currentUser?.uid) return false;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    pushToCloud(currentUser, { reason });
  }, 600);
  return true;
}

export async function configureCloudSyncUser(user) {
  currentUser = sanitizeUser(user);

  if (!currentUser) {
    clearTimeout(syncTimer);
    syncTimer = null;
    setLocalStatus({ enabled: false, mode: 'local', userEmail: '', lastError: '' });
    return { ok: true, disabled: true };
  }

  const hydrated = await hydrateFromCloud(currentUser);
  if (hydrated.ok) {
    await pushToCloud(currentUser, { reason: 'login-merge' });
  }
  return hydrated;
}
