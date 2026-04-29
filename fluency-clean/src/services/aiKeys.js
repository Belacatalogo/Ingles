import { diagnostics } from './diagnostics.js';
import { isValidGeminiKey, maskApiKey, normalizeLessonKeys } from './geminiLessons.js';
import { storage } from './storage.js';

const GENERAL_AI_KEYS_STORAGE = 'ai.gemini.generalKeys';
const MAX_GENERAL_KEYS = 5;

export function getGeneralAiKeys() {
  return normalizeLessonKeys(storage.get(GENERAL_AI_KEYS_STORAGE, []));
}

export function saveGeneralAiKeys(keys) {
  const normalized = normalizeLessonKeys(keys).slice(0, MAX_GENERAL_KEYS);
  storage.set(GENERAL_AI_KEYS_STORAGE, normalized);
  diagnostics.log(`Chaves gerais de IA salvas: ${normalized.length}/${MAX_GENERAL_KEYS}`, 'info');
  return normalized;
}

export function addGeneralAiKey(key) {
  const current = getGeneralAiKeys();
  const normalized = normalizeLessonKeys([...current, key]).slice(0, MAX_GENERAL_KEYS);
  storage.set(GENERAL_AI_KEYS_STORAGE, normalized);
  diagnostics.log(`Key geral de IA adicionada: ${maskApiKey(key)}`, isValidGeminiKey(key) ? 'info' : 'error');
  return normalized;
}

export function removeGeneralAiKey(index) {
  const current = getGeneralAiKeys();
  const removed = current[index];
  const next = current.filter((_, itemIndex) => itemIndex !== index);
  storage.set(GENERAL_AI_KEYS_STORAGE, next);
  diagnostics.log(removed ? `Key geral de IA removida: ${maskApiKey(removed)}` : 'Tentativa de remover key geral inexistente.', removed ? 'info' : 'error');
  return next;
}

export function getGeneralAiKeysStatus() {
  const keys = getGeneralAiKeys();

  return {
    keys,
    count: keys.length,
    masked: keys.map(maskApiKey),
    hasAnyKey: keys.length > 0,
    maxKeys: MAX_GENERAL_KEYS,
  };
}
