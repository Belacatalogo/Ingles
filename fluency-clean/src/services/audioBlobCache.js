import { diagnostics } from './diagnostics.js';

const DB_NAME = 'fluency-clean-audio-cache';
const DB_VERSION = 1;
const STORE_NAME = 'audioBlobs';
const MAX_BLOB_ITEMS = 80;

function openDb() {
  return new Promise((resolve) => {
    if (typeof indexedDB === 'undefined') {
      resolve(null);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('lastUsedAt', 'lastUsedAt');
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
}

function txDone(transaction) {
  return new Promise((resolve) => {
    transaction.oncomplete = () => resolve(true);
    transaction.onerror = () => resolve(false);
    transaction.onabort = () => resolve(false);
  });
}

async function getAllEntries(db) {
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => resolve(Array.isArray(request.result) ? request.result : []);
    request.onerror = () => resolve([]);
  });
}

async function pruneAudioBlobCache(db) {
  const entries = await getAllEntries(db);
  if (entries.length <= MAX_BLOB_ITEMS) return;
  const remove = entries
    .sort((a, b) => Number(b.lastUsedAt || b.savedAt || 0) - Number(a.lastUsedAt || a.savedAt || 0))
    .slice(MAX_BLOB_ITEMS);
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  remove.forEach((entry) => store.delete(entry.id));
  await txDone(tx);
  diagnostics.log(`Cache IndexedDB de áudio: ${remove.length} item(ns) antigo(s) removido(s).`, 'info');
}

export async function getCachedAudioBlob(id) {
  if (!id) return null;
  const db = await openDb();
  if (!db) return null;

  const entry = await new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => resolve(null);
  });

  if (!entry?.blob) return null;

  const tx = db.transaction(STORE_NAME, 'readwrite');
  tx.objectStore(STORE_NAME).put({ ...entry, lastUsedAt: Date.now(), hits: Number(entry.hits || 0) + 1 });
  await txDone(tx);
  diagnostics.log('Áudio grande carregado do cache IndexedDB.', 'success');
  return entry;
}

export async function setCachedAudioBlob(id, { blob, textPreview = '', mimeType = 'audio/wav' } = {}) {
  if (!id || !blob) return false;
  const db = await openDb();
  if (!db) {
    diagnostics.log('IndexedDB indisponível para cache de áudio grande.', 'warn');
    return false;
  }

  const now = Date.now();
  const entry = {
    id,
    blob,
    mimeType,
    textPreview: String(textPreview || '').slice(0, 140),
    bytes: Number(blob.size || 0),
    savedAt: now,
    lastUsedAt: now,
    hits: 0,
  };

  let tx = db.transaction(STORE_NAME, 'readwrite');
  tx.objectStore(STORE_NAME).put(entry);
  let ok = await txDone(tx);

  if (!ok) {
    diagnostics.log('Cache IndexedDB cheio. Limpando áudios antigos e tentando novamente.', 'warn');
    await pruneAudioBlobCache(db);
    tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(entry);
    ok = await txDone(tx);
  }

  if (!ok) {
    diagnostics.log('Não foi possível salvar áudio grande no IndexedDB.', 'warn');
    return false;
  }

  await pruneAudioBlobCache(db);
  diagnostics.log('Áudio grande salvo no cache IndexedDB.', 'success');
  return true;
}
