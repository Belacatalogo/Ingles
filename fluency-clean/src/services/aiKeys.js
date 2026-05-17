import { diagnostics } from './diagnostics.js';
import { isValidGeminiKey, maskApiKey, normalizeLessonKeys } from './geminiLessons.js';

const SESSION_KEY = 'fluency.clean.ai.gemini.generalKeys';
const MAX_GENERAL_KEYS = 5;

let _migrated = false;
function migrateOnce() {
  if (_migrated || typeof sessionStorage === 'undefined') return;
  _migrated = true;
  try {
    if (!sessionStorage.getItem(SESSION_KEY)) {
      const old = localStorage.getItem(SESSION_KEY);
      if (old) sessionStorage.setItem(SESSION_KEY, old);
    }
    localStorage.removeItem(SESSION_KEY);
  } catch { /* storage unavailable */ }
}

function readKeys() {
  migrateOnce();
  try {
    const v = sessionStorage.getItem(SESSION_KEY);
    return normalizeLessonKeys(v ? JSON.parse(v) : []);
  } catch { return []; }
}

function writeKeys(keys) {
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(keys)); } catch {}
  try { localStorage.removeItem(SESSION_KEY); } catch {}
}

export function getGeneralAiKeys() {
  return readKeys();
}

export function saveGeneralAiKeys(keys) {
  const normalized = normalizeLessonKeys(keys).slice(0, MAX_GENERAL_KEYS);
  writeKeys(normalized);
  diagnostics.log(`Chaves gerais de IA salvas: ${normalized.length}/${MAX_GENERAL_KEYS}`, 'info');
  return normalized;
}

export function addGeneralAiKey(key) {
  const current = readKeys();
  const normalized = normalizeLessonKeys([...current, key]).slice(0, MAX_GENERAL_KEYS);
  writeKeys(normalized);
  diagnostics.log(`Key geral de IA adicionada: ${maskApiKey(key)}`, isValidGeminiKey(key) ? 'info' : 'error');
  return normalized;
}

export function removeGeneralAiKey(index) {
  const current = readKeys();
  const removed = current[index];
  const next = current.filter((_, i) => i !== index);
  writeKeys(next);
  diagnostics.log(removed ? `Key geral de IA removida: ${maskApiKey(removed)}` : 'Tentativa de remover key geral inexistente.', removed ? 'info' : 'error');
  return next;
}

export function getGeneralAiKeysStatus() {
  const keys = getGeneralAiKeys();
  return { keys, count: keys.length, masked: keys.map(maskApiKey), hasAnyKey: keys.length > 0, maxKeys: MAX_GENERAL_KEYS };
}
