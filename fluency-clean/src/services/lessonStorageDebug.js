import { storage } from './storage.js';

function shortId(value = '') {
  const text = String(value || '');
  if (!text) return '—';
  if (text.length <= 18) return text;
  return `${text.slice(0, 10)}…${text.slice(-4)}`;
}

function lessonInfo(lesson) {
  if (!lesson) return { title: '—', generationId: '—', savedAt: '—', id: '—' };
  return {
    title: lesson.title || lesson.expectedTitle || 'sem título',
    id: lesson.id || lesson.curriculumId || '—',
    generationId: shortId(lesson.generationMeta?.id),
    savedAt: lesson.generationMeta?.savedAt || lesson.savedAt || lesson.generationMeta?.generatedAt || '—',
  };
}

export function getLessonStorageDebugSnapshot() {
  const current = storage.get('lesson.current', null);
  const history = storage.get('lesson.history', []);
  const status = storage.get('lesson.lastGenerationStatus', null);
  const firstHistory = Array.isArray(history) && history.length ? history[0] : null;

  return {
    current: lessonInfo(current),
    history0: lessonInfo(firstHistory),
    status: {
      title: status?.lessonTitle || '—',
      id: status?.lessonId || '—',
      generationId: shortId(status?.id),
      event: status?.event || '—',
      createdAt: status?.createdAt || '—',
    },
    counts: {
      history: Array.isArray(history) ? history.length : 0,
    },
  };
}
