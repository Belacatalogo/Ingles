import { diagnostics } from './diagnostics.js';
import { normalizeLesson } from './lessonTypes.js';
import { storage } from './storage.js';

const CURRENT_LESSON_KEY = 'lesson.current';
const LESSON_HISTORY_KEY = 'lesson.history';
const LESSON_DRAFT_PROMPT_KEY = 'lesson.promptDraft';

export function getCurrentLesson() {
  const lesson = storage.get(CURRENT_LESSON_KEY, null);
  return lesson ? normalizeLesson(lesson) : null;
}

export function saveCurrentLesson(lesson) {
  const normalized = normalizeLesson(lesson);
  storage.set(CURRENT_LESSON_KEY, normalized);

  const history = storage.get(LESSON_HISTORY_KEY, []);
  const nextHistory = [
    { ...normalized, savedAt: new Date().toISOString() },
    ...history.filter((item) => item.id !== normalized.id),
  ].slice(0, 30);

  storage.set(LESSON_HISTORY_KEY, nextHistory);
  diagnostics.log(`Aula salva: ${normalized.title}`, 'info');
  return normalized;
}

export function clearCurrentLesson() {
  storage.remove(CURRENT_LESSON_KEY);
  diagnostics.log('Aula atual removida.', 'info');
}

export function getLessonHistory() {
  return storage.get(LESSON_HISTORY_KEY, []).map(normalizeLesson);
}

export function getLessonPromptDraft() {
  return storage.getText(LESSON_DRAFT_PROMPT_KEY, 'Gere uma aula de Reading A1 completa, com texto curto, vocabulário, perguntas e resposta guiada.');
}

export function saveLessonPromptDraft(prompt) {
  storage.setText(LESSON_DRAFT_PROMPT_KEY, prompt);
  return prompt;
}
