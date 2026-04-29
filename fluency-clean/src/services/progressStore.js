import { diagnostics } from './diagnostics.js';
import { storage } from './storage.js';

const PROGRESS_KEY = 'progress.summary';
const LESSON_COMPLETIONS_KEY = 'progress.lessonCompletions';
const LESSON_DRAFTS_KEY = 'progress.lessonDrafts';

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function weekKey(date = new Date()) {
  const copy = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = copy.getUTCDay() || 7;
  copy.setUTCDate(copy.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(copy.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((copy - yearStart) / 86400000) + 1) / 7);
  return `${copy.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

function normalizeProgress(value = {}) {
  return {
    xp: Number(value.xp || 0),
    completedLessons: Number(value.completedLessons || 0),
    streakDays: Number(value.streakDays || 0),
    lastStudyDate: value.lastStudyDate || '',
    weekly: value.weekly && typeof value.weekly === 'object' ? value.weekly : {},
  };
}

function isYesterday(dateA, dateB) {
  if (!dateA || !dateB) return false;
  const a = new Date(`${dateA}T00:00:00Z`);
  const b = new Date(`${dateB}T00:00:00Z`);
  return Math.round((b - a) / 86400000) === 1;
}

function getCompletionId(lesson) {
  return lesson?.id || `${lesson?.type || 'lesson'}-${lesson?.title || 'untitled'}`;
}

export function getProgressSummary() {
  return normalizeProgress(storage.get(PROGRESS_KEY, {}));
}

export function getLessonCompletions() {
  return storage.get(LESSON_COMPLETIONS_KEY, []);
}

export function getLessonDrafts() {
  return storage.get(LESSON_DRAFTS_KEY, {});
}

export function getLessonDraft(lessonId) {
  const drafts = getLessonDrafts();
  return drafts[lessonId] || '';
}

export function saveLessonDraft({ lesson, answer }) {
  const lessonId = getCompletionId(lesson);
  const drafts = getLessonDrafts();
  const nextDrafts = {
    ...drafts,
    [lessonId]: String(answer || ''),
  };
  storage.set(LESSON_DRAFTS_KEY, nextDrafts);
  diagnostics.log(`Rascunho salvo para aula: ${lesson?.title || lessonId}`, 'info');
  return nextDrafts[lessonId];
}

export function completeLesson({ lesson, answers = {}, writtenAnswer = '' }) {
  const lessonId = getCompletionId(lesson);
  const completions = getLessonCompletions();
  const alreadyCompleted = completions.some((item) => item.lessonId === lessonId);
  const now = new Date();
  const date = todayKey(now);
  const currentWeek = weekKey(now);
  const progress = getProgressSummary();
  const previousWeekly = progress.weekly[currentWeek] || { completed: 0, xp: 0 };
  const xpGain = alreadyCompleted ? 0 : 25;

  let nextStreak = progress.streakDays || 0;
  if (!progress.lastStudyDate) nextStreak = 1;
  else if (progress.lastStudyDate === date) nextStreak = progress.streakDays || 1;
  else if (isYesterday(progress.lastStudyDate, date)) nextStreak = (progress.streakDays || 0) + 1;
  else nextStreak = 1;

  const completion = {
    lessonId,
    title: lesson?.title || 'Aula',
    type: lesson?.type || 'lesson',
    level: lesson?.level || 'A1',
    completedAt: now.toISOString(),
    answers,
    writtenAnswer,
    xp: xpGain,
  };

  const nextCompletions = alreadyCompleted
    ? completions.map((item) => item.lessonId === lessonId ? { ...item, ...completion, xp: item.xp || 0 } : item)
    : [completion, ...completions];

  const nextProgress = normalizeProgress({
    ...progress,
    xp: progress.xp + xpGain,
    completedLessons: alreadyCompleted ? progress.completedLessons : progress.completedLessons + 1,
    streakDays: nextStreak,
    lastStudyDate: date,
    weekly: {
      ...progress.weekly,
      [currentWeek]: {
        completed: alreadyCompleted ? previousWeekly.completed : previousWeekly.completed + 1,
        xp: previousWeekly.xp + xpGain,
      },
    },
  });

  storage.set(LESSON_COMPLETIONS_KEY, nextCompletions);
  storage.set(PROGRESS_KEY, nextProgress);
  saveLessonDraft({ lesson, answer: writtenAnswer });

  diagnostics.setPhase('aula concluída', 'success');
  diagnostics.log(`${alreadyCompleted ? 'Aula já estava concluída' : 'Aula concluída'}: ${completion.title}`, 'info');

  return {
    completion,
    progress: nextProgress,
    alreadyCompleted,
  };
}

export function isLessonCompleted(lesson) {
  const lessonId = getCompletionId(lesson);
  return getLessonCompletions().some((item) => item.lessonId === lessonId);
}

export function getCurrentWeekStats() {
  const progress = getProgressSummary();
  return progress.weekly[weekKey(new Date())] || { completed: 0, xp: 0 };
}
