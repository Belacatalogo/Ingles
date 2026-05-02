const DB_NAME = 'fluency-clean-lessons';
const DB_VERSION = 1;
const LESSON_STORE = 'lessons';
const META_STORE = 'meta';
const CURRENT_META_ID = 'current';

function hasIndexedDb() {
  return typeof window !== 'undefined' && Boolean(window.indexedDB);
}

function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('IndexedDB request failed'));
  });
}

function openDb() {
  if (!hasIndexedDb()) return Promise.reject(new Error('IndexedDB indisponível neste navegador.'));
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(LESSON_STORE)) {
        db.createObjectStore(LESSON_STORE, { keyPath: 'generationId' });
      }
      if (!db.objectStoreNames.contains(META_STORE)) {
        db.createObjectStore(META_STORE, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Falha ao abrir IndexedDB.'));
  });
}

async function withStore(storeName, mode, callback) {
  const db = await openDb();
  try {
    const transaction = db.transaction(storeName, mode);
    const store = transaction.objectStore(storeName);
    const result = await callback(store);
    await new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error || new Error('IndexedDB transaction failed'));
      transaction.onabort = () => reject(transaction.error || new Error('IndexedDB transaction aborted'));
    });
    return result;
  } finally {
    db.close();
  }
}

export async function saveFullLessonToIndexedDb(lesson, generationId) {
  const id = String(generationId || lesson?.generationMeta?.id || '').trim();
  if (!id) throw new Error('generationId ausente para salvar aula completa no IndexedDB.');
  const payload = {
    generationId: id,
    lesson,
    title: lesson?.title || '',
    lessonId: lesson?.id || '',
    savedAt: lesson?.generationMeta?.savedAt || new Date().toISOString(),
  };
  await withStore(LESSON_STORE, 'readwrite', (store) => requestToPromise(store.put(payload)));
  await withStore(META_STORE, 'readwrite', (store) => requestToPromise(store.put({
    id: CURRENT_META_ID,
    generationId: id,
    title: payload.title,
    lessonId: payload.lessonId,
    savedAt: payload.savedAt,
  })));
  return payload;
}

export async function getFullLessonFromIndexedDb(generationId = '') {
  const id = String(generationId || '').trim();
  let targetId = id;
  if (!targetId) {
    const meta = await getCurrentLessonMetaFromIndexedDb();
    targetId = meta?.generationId || '';
  }
  if (!targetId) return null;
  const record = await withStore(LESSON_STORE, 'readonly', (store) => requestToPromise(store.get(targetId)));
  return record?.lesson || null;
}

export async function getCurrentLessonMetaFromIndexedDb() {
  try {
    return await withStore(META_STORE, 'readonly', (store) => requestToPromise(store.get(CURRENT_META_ID)));
  } catch {
    return null;
  }
}

export async function deleteFullLessonFromIndexedDb(generationId = '') {
  const id = String(generationId || '').trim();
  if (!id) return false;
  await withStore(LESSON_STORE, 'readwrite', (store) => requestToPromise(store.delete(id)));
  return true;
}

export async function clearIndexedLessonPointer() {
  await withStore(META_STORE, 'readwrite', (store) => requestToPromise(store.delete(CURRENT_META_ID)));
  return true;
}

export async function saveFullLessonBestEffort(lesson, generationId) {
  try {
    return { ok: true, record: await saveFullLessonToIndexedDb(lesson, generationId), error: null };
  } catch (error) {
    return { ok: false, record: null, error: error?.message || String(error) };
  }
}

export async function getFullLessonBestEffort(generationId = '') {
  try {
    return await getFullLessonFromIndexedDb(generationId);
  } catch {
    return null;
  }
}
