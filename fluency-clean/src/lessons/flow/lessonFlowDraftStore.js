const KEY_PREFIX = 'fluency:lesson-flow-draft:';
const TTL_MS = 24 * 60 * 60 * 1000;

export function saveDraft(lessonId, state) {
  if (!lessonId) return;
  try {
    localStorage.setItem(KEY_PREFIX + lessonId, JSON.stringify({ ...state, savedAt: Date.now() }));
  } catch {}
}

export function loadDraft(lessonId) {
  if (!lessonId) return null;
  try {
    const raw = localStorage.getItem(KEY_PREFIX + lessonId);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || Date.now() - Number(data.savedAt || 0) > TTL_MS) {
      localStorage.removeItem(KEY_PREFIX + lessonId);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function clearDraft(lessonId) {
  if (!lessonId) return;
  try {
    localStorage.removeItem(KEY_PREFIX + lessonId);
  } catch {}
}
