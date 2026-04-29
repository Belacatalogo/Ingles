import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { diagnostics } from './diagnostics.js';

function readFirebaseConfig() {
  const env = import.meta.env;

  return {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID,
  };
}

export function hasFirebaseConfig(config = readFirebaseConfig()) {
  return Boolean(
    config.apiKey &&
    config.authDomain &&
    config.projectId &&
    config.appId
  );
}

let cachedApp = null;
let cachedAuth = null;

export function getFirebaseApp() {
  if (cachedApp) return cachedApp;

  const config = readFirebaseConfig();

  if (!hasFirebaseConfig(config)) {
    diagnostics.log('Firebase ainda não configurado no app limpo. Defina as variáveis VITE_FIREBASE_*.', 'info');
    return null;
  }

  cachedApp = getApps().length ? getApps()[0] : initializeApp(config);
  diagnostics.log('Firebase inicializado no app limpo.', 'info', {
    projectId: config.projectId,
    authDomain: config.authDomain,
  });

  return cachedApp;
}

export function getFirebaseAuth() {
  if (cachedAuth) return cachedAuth;
  const app = getFirebaseApp();
  if (!app) return null;

  cachedAuth = getAuth(app);
  return cachedAuth;
}

export function getFirebaseStatus() {
  const config = readFirebaseConfig();
  return {
    configured: hasFirebaseConfig(config),
    projectId: config.projectId || '',
    authDomain: config.authDomain || '',
  };
}
