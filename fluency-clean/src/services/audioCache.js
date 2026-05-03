import { diagnostics } from './diagnostics.js';
import { storage } from './storage.js';

const AUDIO_CACHE_INDEX_KEY = 'audio.cache.index';
const AUDIO_CACHE_ITEM_PREFIX = 'audio.cache.item.';
const MAX_AUDIO_CACHE_ITEMS = 160;
const QUOTA_RECOVERY_KEEP_ITEMS = 48;

export function hashAudioText(value) {
  const text = String(value ?? '');
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return Math.abs(hash >>> 0).toString(36);
}

export function makeAudioCacheId({ text, voiceName = 'Kore', style = '', model = 'gemini-tts' } = {}) {
  return hashAudioText(`${model}|${voiceName}|${style}|${String(text ?? '').trim()}`);
}

function itemKey(id) {
  return `${AUDIO_CACHE_ITEM_PREFIX}${id}`;
}

function normalizeIndex(value) {
  return Array.isArray(value) ? value.filter((item) => item?.id) : [];
}

function sortByRecent(index) {
  return normalizeIndex(index).sort((a, b) => Number(b.lastUsedAt || b.savedAt || 0) - Number(a.lastUsedAt || a.savedAt || 0));
}

export function getAudioCacheIndex() {
  return normalizeIndex(storage.get(AUDIO_CACHE_INDEX_KEY, []));
}

export function getAudioCacheStats() {
  const index = getAudioCacheIndex();
  const totalBytes = index.reduce((total, item) => total + Number(item.bytes || 0), 0);
  return { count: index.length, limit: MAX_AUDIO_CACHE_ITEMS, totalBytes };
}

function pruneAudioCache(nextIndex) {
  const ordered = sortByRecent(nextIndex);
  const keep = ordered.slice(0, MAX_AUDIO_CACHE_ITEMS);
  const remove = ordered.slice(MAX_AUDIO_CACHE_ITEMS);
  for (const item of remove) storage.remove(itemKey(item.id));
  storage.set(AUDIO_CACHE_INDEX_KEY, keep);
  if (remove.length) diagnostics.log(`Cache de áudio: ${remove.length} áudio(s) antigo(s) removido(s).`, 'info');
  return keep;
}

function forcePruneAudioCache(keepCount = QUOTA_RECOVERY_KEEP_ITEMS) {
  const ordered = sortByRecent(getAudioCacheIndex());
  const keep = ordered.slice(0, keepCount);
  const remove = ordered.slice(keepCount);
  for (const item of remove) storage.remove(itemKey(item.id));
  storage.set(AUDIO_CACHE_INDEX_KEY, keep);
  if (remove.length) diagnostics.log(`Cache de áudio: ${remove.length} áudio(s) removido(s) para liberar espaço.`, 'warn');
  return keep;
}

export function getCachedAudio(id) {
  if (!id) return null;
  const item = storage.get(itemKey(id), null);
  if (!item?.base64) return null;
  const now = Date.now();
  const index = getAudioCacheIndex();
  const nextIndex = index.map((entry) => entry.id === id ? { ...entry, lastUsedAt: now, hits: Number(entry.hits || 0) + 1 } : entry);
  storage.set(AUDIO_CACHE_INDEX_KEY, nextIndex);
  diagnostics.log('Áudio carregado do cache local.', 'info');
  return item;
}

export function setCachedAudio(id, payload = {}) {
  if (!id || !payload?.base64) return false;
  const now = Date.now();
  const item = {
    id,
    base64: payload.base64,
    mimeType: payload.mimeType || 'audio/pcm',
    sampleRate: Number(payload.sampleRate || 24000),
    textPreview: String(payload.textPreview || '').slice(0, 90),
    savedAt: now,
    lastUsedAt: now,
    bytes: Math.ceil(String(payload.base64).length * 0.75),
  };

  let saved = storage.set(itemKey(id), item);
  if (!saved) {
    diagnostics.log('Cache de áudio cheio. Limpando áudios antigos e tentando salvar novamente.', 'warn');
    forcePruneAudioCache();
    saved = storage.set(itemKey(id), item);
  }

  if (!saved) {
    diagnostics.log('Cache de áudio indisponível para este arquivo. Reproduzindo sem salvar.', 'warn');
    return false;
  }

  const index = getAudioCacheIndex().filter((entry) => entry.id !== id);
  pruneAudioCache([{ id, savedAt: now, lastUsedAt: now, bytes: item.bytes, textPreview: item.textPreview, hits: 0 }, ...index]);
  diagnostics.log(`Áudio salvo no cache local (${getAudioCacheStats().count}/${MAX_AUDIO_CACHE_ITEMS}).`, 'info');
  return true;
}

export function clearAudioCache() {
  const index = getAudioCacheIndex();
  for (const item of index) storage.remove(itemKey(item.id));
  storage.remove(AUDIO_CACHE_INDEX_KEY);
  diagnostics.log('Cache de áudio limpo.', 'info');
  return true;
}

export { MAX_AUDIO_CACHE_ITEMS };
