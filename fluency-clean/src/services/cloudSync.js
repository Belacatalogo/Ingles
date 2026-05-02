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
  'lesson.lastGenerationStatus',
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

function readTime(value) {
  const candidates = [
    value?.generationMeta?.savedAt,
    value?.savedAt,
    value?.generationMeta?.generatedAt,
    value?.createdAt,
    value?.updatedAt,
  ];
  const parsed = candidates.map((item) => Date.parse(item || '')).find((item) => Number.isFinite(item));
  return parsed || 0;
}

function readStatusTime(value) {
  const parsed = Date.parse(value?.createdAt || value?.savedAt || value?.updatedAt || '');
  return Number.isFinite(parsed) ? parsed : 0;
}

function lessonKey(lesson = {}) {
  return lesson?.generationMeta?.id || lesson?.id || lesson?.curriculumId || lesson?.title || '';
}

function mergeLessonHistory(localHistory = [], cloudHistory = []) {
  const merged = [...(Array.isArray(localHistory) ? localHistory : []), ...(Array.isArray(cloudHistory) ? cloudHistory : [])];
  const byKey = new Map();

  merged.forEach((lesson) => {
    const key = lessonKey(lesson);
    if (!key) return;
    const existing = byKey.get(key);
    if (!existing || readTime(lesson) >= readTime(existing)) byKey.set(key, lesson);
  });

  return Array.from(byKey.values()).sort((a, b) => readTime(b) - readTime(a)).slice(0, 30);
}

function chooseNewest(localValue, cloudValue, timeReader = readTime) {
  if (!localValue) return cloudValue;
  if (!cloudValue) return localValue;
  return timeReader(cloudValue) > timeReader(localValue) ? cloudValue : localValue;
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
  const localCurrent = storage.get('lesson.current', null);
  const localHistory = storage.get('lesson.history', []);
  const localStatus = storage.get('lesson.lastGenerationStatus', null);

  Object.entries(payload).forEach(([key, value]) => {
    if (!CLOUD_SYNC_KEYS.includes(key)) return;

    if (key === 'lesson.current') {
      const nextCurrent = chooseNewest(localCurrent, value, readTime);
      storage.set(key, nextCurrent);
      if (nextCurrent !== value) diagnostics.log('Cloud Sync preservou aula atual local mais recente.', 'info');
      return;
    }

    if (key === 'lesson.history') {
      storage.set(key, mergeLessonHistory(localHistory, value));
      return;
    }

    if (key === 'lesson.lastGenerationStatus') {
      storage.set(key, chooseNewest(localStatus, value, readStatusTime));
      return;
    }

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
        diagnostics.log('Progresso carregado da nuvem Firebase com merge seguro.', 'info');
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
    return { ok: false, error: message });
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
