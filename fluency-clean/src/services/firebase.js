import { initializeApp, getApps, deleteApp } from 'firebase/app';
import {
  browserLocalPersistence,
  browserPopupRedirectResolver,
  browserSessionPersistence,
  getAuth,
  indexedDBLocalPersistence,
  initializeAuth,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { diagnostics } from './diagnostics.js';
import { storage } from './storage.js';

const RUNTIME_FIREBASE_CONFIG_KEY = 'firebase.runtimeConfig';

function cleanFirebaseConfig(config = {}) {
  return {
    apiKey: String(config.apiKey ?? '').trim(),
    authDomain: String(config.authDomain ?? '').trim(),
    projectId: String(config.projectId ?? '').trim(),
    storageBucket: String(config.storageBucket ?? '').trim(),
    messagingSenderId: String(config.messagingSenderId ?? '').trim(),
    appId: String(config.appId ?? '').trim(),
  };
}

function readEnvFirebaseConfig() {
  const env = import.meta.env;

  return cleanFirebaseConfig({
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID,
  });
}

export function getRuntimeFirebaseConfig() {
  return cleanFirebaseConfig(storage.get(RUNTIME_FIREBASE_CONFIG_KEY, {}));
}

export function saveRuntimeFirebaseConfig(config) {
  const clean = cleanFirebaseConfig(config);

  if (!hasFirebaseConfig(clean)) {
    diagnostics.log('Configuração Firebase runtime incompleta.', 'error');
    return { ok: false, error: 'Configuração Firebase incompleta.' };
  }

  storage.set(RUNTIME_FIREBASE_CONFIG_KEY, clean);
  cachedApp = null;
  cachedAuth = null;
  cachedFirestore = null;
  diagnostics.log('Configuração Firebase runtime salva no preview.', 'info', {
    projectId: clean.projectId,
    authDomain: clean.authDomain,
  });
  return { ok: true, config: clean };
}

export async function clearRuntimeFirebaseConfig() {
  storage.remove(RUNTIME_FIREBASE_CONFIG_KEY);
  cachedAuth = null;
  cachedFirestore = null;

  if (cachedApp) {
    try {
      await deleteApp(cachedApp);
    } catch {
      // Firebase may already be deleted or controlled by another initialized app.
    }
  }

  cachedApp = null;
  diagnostics.log('Configuração Firebase runtime removida.', 'info');
}

function readFirebaseConfig() {
  const envConfig = readEnvFirebaseConfig();
  if (hasFirebaseConfig(envConfig)) return { config: envConfig, source: 'env' };

  const runtimeConfig = getRuntimeFirebaseConfig();
  if (hasFirebaseConfig(runtimeConfig)) return { config: runtimeConfig, source: 'runtime' };

  return { config: envConfig, source: 'missing' };
}

export function hasFirebaseConfig(config = readFirebaseConfig().config) {
  return Boolean(
    config.apiKey &&
    config.authDomain &&
    config.projectId &&
    config.appId
  );
}

let cachedApp = null;
let cachedAuth = null;
let cachedFirestore = null;

export function getFirebaseApp() {
  if (cachedApp) return cachedApp;

  const { config, source } = readFirebaseConfig();

  if (!hasFirebaseConfig(config)) {
    diagnostics.log('Firebase ainda não configurado no app limpo. Defina as variáveis VITE_FIREBASE_* ou salve a configuração no preview.', 'info');
    return null;
  }

  cachedApp = getApps().length ? getApps()[0] : initializeApp(config);
  diagnostics.log(`Firebase inicializado no app limpo via ${source}.`, 'info', {
    projectId: config.projectId,
    authDomain: config.authDomain,
  });

  return cachedApp;
}

export function getFirebaseAuth() {
  if (cachedAuth) return cachedAuth;
  const app = getFirebaseApp();
  if (!app) return null;

  try {
    cachedAuth = initializeAuth(app, {
      persistence: [
        indexedDBLocalPersistence,
        browserLocalPersistence,
        browserSessionPersistence,
      ],
      popupRedirectResolver: browserPopupRedirectResolver,
    });
    diagnostics.log('Firebase Auth inicializado com persistência reforçada para iOS.', 'info');
  } catch (error) {
    cachedAuth = getAuth(app);
    diagnostics.log(`Firebase Auth já existia ou fallback usado: ${error?.message || error}`, 'info');
  }

  return cachedAuth;
}

export function getFirebaseDb() {
  if (cachedFirestore) return cachedFirestore;
  const app = getFirebaseApp();
  if (!app) return null;

  cachedFirestore = getFirestore(app);
  return cachedFirestore;
}

export function getFirebaseStatus() {
  const { config, source } = readFirebaseConfig();
  return {
    configured: hasFirebaseConfig(config),
    source,
    projectId: config.projectId || '',
    authDomain: config.authDomain || '',
  };
}
