import { diagnostics } from './diagnostics.js';
import { storage } from './storage.js';
import { isValidGeminiKey, maskApiKey, normalizeLessonKeys } from './geminiLessons.js';

const FLASH_KEYS_STORAGE = 'lesson.gemini.flashKeys';
const PRO_KEY_STORAGE = 'lesson.gemini.proKey';
const MAX_FLASH_KEYS = 3;
const USE_FIRST_FREE_KEY_AS_PRO_MODEL_TEST = true;

export function getLessonFlashKeys() {
  return normalizeLessonKeys(storage.get(FLASH_KEYS_STORAGE, []));
}

export function saveLessonFlashKeys(keys) {
  const normalized = normalizeLessonKeys(keys).slice(0, MAX_FLASH_KEYS);
  storage.set(FLASH_KEYS_STORAGE, normalized);
  diagnostics.log(`Chaves Flash de aulas salvas: ${normalized.length}/${MAX_FLASH_KEYS}`, 'info');
  return normalized;
}

export function addLessonFlashKey(key) {
  const current = getLessonFlashKeys();
  const normalized = normalizeLessonKeys([...current, key]).slice(0, MAX_FLASH_KEYS);
  storage.set(FLASH_KEYS_STORAGE, normalized);
  diagnostics.log(`Key Flash de aula adicionada: ${maskApiKey(key)}`, isValidGeminiKey(key) ? 'info' : 'error');
  return normalized;
}

export function removeLessonFlashKey(index) {
  const current = getLessonFlashKeys();
  const removed = current[index];
  const next = current.filter((_, itemIndex) => itemIndex !== index);
  storage.set(FLASH_KEYS_STORAGE, next);
  diagnostics.log(removed ? `Key Flash removida: ${maskApiKey(removed)}` : 'Tentativa de remover key Flash inexistente.', removed ? 'info' : 'error');
  return next;
}

export function getLessonProKey() {
  if (USE_FIRST_FREE_KEY_AS_PRO_MODEL_TEST) {
    return getLessonFlashKeys()[0] ?? '';
  }
  return normalizeLessonKeys([storage.getText(PRO_KEY_STORAGE, '')])[0] ?? '';
}

export function saveLessonProKey(key) {
  const normalized = normalizeLessonKeys([key])[0] ?? '';

  if (!normalized) {
    storage.remove(PRO_KEY_STORAGE);
    diagnostics.log('Key Pro de aulas removida ou inválida.', 'info');
    return '';
  }

  storage.setText(PRO_KEY_STORAGE, normalized);
  diagnostics.log(`Key Pro de aulas salva: ${maskApiKey(normalized)}`, 'info');
  return normalized;
}

export function clearLessonProKey() {
  storage.remove(PRO_KEY_STORAGE);
  diagnostics.log('Key Pro de aulas removida.', 'info');
}

export function getLessonKeysStatus() {
  const flashKeys = getLessonFlashKeys();
  const proKey = getLessonProKey();

  return {
    flashKeys,
    flashCount: flashKeys.length,
    flashMasked: flashKeys.map(maskApiKey),
    proKey,
    proMasked: maskApiKey(proKey),
    hasAnyKey: flashKeys.length > 0 || Boolean(proKey),
    maxFlashKeys: MAX_FLASH_KEYS,
    usingFirstFreeKeyAsProModelTest: USE_FIRST_FREE_KEY_AS_PRO_MODEL_TEST,
  };
}

export function buildLessonKeyPlan() {
  const status = getLessonKeysStatus();

  return {
    flash: status.flashKeys.map((key, index) => ({
      key,
      masked: maskApiKey(key),
      slot: index + 1,
      models: ['gemini-2.5-flash', 'gemini-2.0-flash'],
      paid: false,
    })),
    pro: status.proKey
      ? [{
          key: status.proKey,
          masked: maskApiKey(status.proKey),
          slot: 'pro-free-test',
          models: ['gemini-2.5-pro'],
          paid: false,
        }]
      : [],
  };
}
