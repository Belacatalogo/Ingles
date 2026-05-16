import { diagnostics } from './diagnostics.js';
import { markCurriculumLessonComplete } from './curriculumPlan.js';
import { recordLessonMastery } from './masteryStore.js';
import { recordPracticeSrsResult, SRS_ITEM_TYPES } from './practiceSrsExtended.js';
import { storage } from './storage.js';

const PROGRESS_KEY = 'progress.summary';
const LESSON_COMPLETIONS_KEY = 'progress.lessonCompletions';
const LESSON_DRAFTS_KEY = 'progress.lessonDrafts';
const FLASHCARD_SESSIONS_KEY = 'progress.flashcardSessions';
const SPEAKING_SESSIONS_KEY = 'progress.speakingSessions';
const PRACTICE_SESSIONS_KEY = 'progress.practiceSessions';

function pad(value) { return String(value).padStart(2, '0'); }
export function localDateKey(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
function todayKey(date = new Date()) { return localDateKey(date); }
function itemLocalDateKey(item) { return localDateKey(item?.completedAt || item?.createdAt || item); }
function weekKey(date = new Date()) {
  const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = copy.getDay() || 7;
  copy.setDate(copy.getDate() + 4 - day);
  const yearStart = new Date(copy.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((copy - yearStart) / 86400000) + 1) / 7);
  return `${copy.getFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}
function safeObject(value) { return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; }
function safeArray(value) { return Array.isArray(value) ? value : []; }
function normalizeProgress(value = {}) {
  const data = safeObject(value);
  return { xp: Number(data.xp || 0), completedLessons: Number(data.completedLessons || 0), streakDays: Number(data.streakDays || 0), lastStudyDate: data.lastStudyDate || '', weekly: data.weekly && typeof data.weekly === 'object' && !Array.isArray(data.weekly) ? data.weekly : {} };
}
function isYesterday(dateA, dateB) {
  if (!dateA || !dateB) return false;
  const a = new Date(`${dateA}T00:00:00`);
  const b = new Date(`${dateB}T00:00:00`);
  return Math.round((b - a) / 86400000) === 1;
}
function getCompletionId(lesson) { return lesson?.id || `${lesson?.type || 'lesson'}-${lesson?.title || 'untitled'}`; }
function clampNumber(value, min = 0, max = 100) { return Math.max(min, Math.min(max, Number(value || 0))); }
function compactPracticeResult(result) {
  return {
    id: result?.id || '',
    type: result?.type || 'practice',
    title: result?.title || '',
    prompt: result?.prompt || '',
    correct: Boolean(result?.correct),
    answer: String(result?.answer || '').slice(0, 180),
    expected: String(result?.expected || '').slice(0, 180),
    lifeLost: Boolean(result?.lifeLost),
    sourceEngine: result?.sourceEngine || '',
  };
}

function normalizeAnswerValue(value) {
  return String(value ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim();
}

function collectReadingQuestionSources(lesson) {
  return [
    ...(Array.isArray(lesson?.readingQuestions) ? lesson.readingQuestions : []),
    ...(Array.isArray(lesson?.comprehension) ? lesson.comprehension : []),
    ...(Array.isArray(lesson?.questions) ? lesson.questions : []),
    ...(Array.isArray(lesson?.exercises) ? lesson.exercises : []),
  ];
}

function extractQuotedWord(value) {
  const match = String(value || '').match(/[“\"]([^”\"]{2,40})[”\"]/);
  return match?.[1] || '';
}

function getVocabWordFromQuestion(question) {
  return String(
    question?.word || question?.term || question?.vocab || question?.targetWord || question?.english || extractQuotedWord(question?.question || question?.prompt || question?.instruction) || question?.answer || question?.correctAnswer || ''
  ).trim();
}

function getVocabMeaningFromQuestion(question) {
  return String(
    question?.meaning || question?.translation || question?.definition || question?.portuguese || question?.answer || question?.correctAnswer || question?.expectedAnswer || ''
  ).trim();
}

function registerReadingVocabularyMistakes({ lesson, answers = {} }) {
  if (String(lesson?.type || '').toLowerCase() !== 'reading') return [];

  const selectedAnswers = safeObject(answers?.multipleChoice);
  const sources = collectReadingQuestionSources(lesson);
  const registered = [];

  sources.forEach((item, index) => {
    const skill = String(item?.skill || item?.readingSkill || item?.type || '').toLowerCase();
    if (skill !== 'vocabulary_context') return;

    const questionIndex = item?.index ?? index;
    const selected = selectedAnswers[questionIndex];
    if (typeof selected !== 'string') return;

    const expected = item?.answer || item?.correctAnswer || item?.correct || item?.expectedAnswer || '';
    if (!expected || normalizeAnswerValue(selected) === normalizeAnswerValue(expected)) return;

    const word = getVocabWordFromQuestion(item);
    const meaning = getVocabMeaningFromQuestion(item);
    if (!word || !meaning) return;

    const srsItem = recordPracticeSrsResult({
      type: SRS_ITEM_TYPES.VOCAB_WORD,
      content: `vocab::${word}`,
      label: word,
      correct: false,
      skill: 'reading',
      level: lesson?.level || 'A1',
      meta: {
        lessonId: getCompletionId(lesson),
        meaning,
        example: item?.example || item?.sentence || item?.context || '',
        contextClue: item?.contextClue || item?.evidence || item?.quote || '',
        sourceTab: 'reading_inner',
      },
    });

    if (srsItem) registered.push(srsItem);
  });

  if (registered.length) diagnostics.log(`${registered.length} vocabulário(s) frágil(eis) de Reading enviados para revisão.`, 'info');
  return registered;
}

export function getProgressSummary() { return normalizeProgress(storage.get(PROGRESS_KEY, {})); }
export function getLessonCompletions() { return safeArray(storage.get(LESSON_COMPLETIONS_KEY, [])); }
export function getFlashcardSessions() { return safeArray(storage.get(FLASHCARD_SESSIONS_KEY, [])); }
export function getSpeakingSessions() { return safeArray(storage.get(SPEAKING_SESSIONS_KEY, [])); }
export function getPracticeSessions() { return safeArray(storage.get(PRACTICE_SESSIONS_KEY, [])); }
export function getPracticeSessionsForLesson(lesson) {
  const lessonId = getCompletionId(lesson);
  return getPracticeSessions().filter((item) => item.lessonId === lessonId);
}
export function hasFlashcardSessionToday(date = new Date()) { const day = todayKey(date); return getFlashcardSessions().some((item) => itemLocalDateKey(item) === day); }
export function hasSpeakingSessionToday(date = new Date()) { const day = todayKey(date); return getSpeakingSessions().some((item) => itemLocalDateKey(item) === day); }
export function hasPracticeSessionToday(date = new Date()) { const day = todayKey(date); return getPracticeSessions().some((item) => itemLocalDateKey(item) === day); }

export function recordPracticeSession({ lesson, total = 0, correct = 0, mistakes = 0, lives = 0, reviewMode = false, results = [] }) {
  const now = new Date();
  const lessonId = getCompletionId(lesson);
  const safeResults = safeArray(results).map(compactPracticeResult).slice(0, 80);
  const totalCount = Number(total || safeResults.length || 0);
  const correctCount = Number(correct || safeResults.filter((item) => item.correct).length || 0);
  const mistakeCount = Number(mistakes || Math.max(0, totalCount - correctCount));
  const accuracy = totalCount ? Math.round((correctCount / totalCount) * 100) : 0;
  const weakItems = safeResults.filter((item) => !item.correct).slice(0, 20);
  const session = {
    id: `practice-${lessonId}-${now.getTime()}`,
    lessonId,
    title: lesson?.title || 'Aula atual',
    type: lesson?.type || 'lesson',
    level: lesson?.level || 'A1',
    completedAt: now.toISOString(),
    total: totalCount,
    correct: correctCount,
    mistakes: mistakeCount,
    accuracy: clampNumber(accuracy),
    lives: Number(lives || 0),
    reviewMode: Boolean(reviewMode),
    weakItems,
    results: safeResults,
  };
  storage.set(PRACTICE_SESSIONS_KEY, [session, ...getPracticeSessions()].slice(0, 160));
  diagnostics.log(`Prática registrada: ${correctCount}/${totalCount}, ${accuracy}% de precisão.`, accuracy >= 80 ? 'success' : 'warn');
  return session;
}

export function getPracticeReviewQueue(limit = 20) {
  const seen = new Set();
  const queue = [];
  for (const session of getPracticeSessions()) {
    for (const item of safeArray(session.weakItems)) {
      const key = `${session.lessonId}:${item.id || item.prompt}:${item.expected}`;
      if (seen.has(key)) continue;
      seen.add(key);
      queue.push({ ...item, lessonId: session.lessonId, lessonTitle: session.title, level: session.level, completedAt: session.completedAt });
      if (queue.length >= limit) return queue;
    }
  }
  return queue;
}

export function recordFlashcardSession({ lesson, totalCards = 0, reviewedCards = 0, correctCount = 0, needsReviewCount = 0, cards = [] }) {
  const now = new Date();
  const total = Number(totalCards || cards.length || 0);
  const reviewed = Number(reviewedCards || total || 0);
  const correct = Number(correctCount || 0);
  const needsReview = Number(needsReviewCount || 0);
  const accuracy = reviewed ? Math.round((correct / reviewed) * 100) : 0;
  const lessonId = getCompletionId(lesson);
  const session = { id: `flashcards-${lessonId}-${now.getTime()}`, lessonId, title: lesson?.title || 'Aula atual', type: 'flashcards', level: lesson?.level || 'A1', completedAt: now.toISOString(), totalCards: total, reviewedCards: reviewed, correctCount: correct, needsReviewCount: needsReview, accuracy, cards: safeArray(cards).slice(0, 80) };
  storage.set(FLASHCARD_SESSIONS_KEY, [session, ...getFlashcardSessions()].slice(0, 120));
  diagnostics.log(`Sessão de flashcards concluída: ${reviewed}/${total} cards, ${accuracy}% de precisão.`, 'success');
  return session;
}

export function recordSpeakingSession({ lesson, level = 'A1', scenario = '', mode = 'conversation', spokenCount = 0, durationMs = 0, averageScore = 0, attempts = [] }) {
  const now = new Date();
  const session = {
    id: `speaking-${level}-${now.getTime()}`,
    lessonId: getCompletionId(lesson),
    title: scenario || 'Speaking guiado',
    type: 'speaking',
    level,
    mode,
    scenario,
    completedAt: now.toISOString(),
    spokenCount: Number(spokenCount || 0),
    durationMs: Number(durationMs || 0),
    averageScore: Math.round(Number(averageScore || 0)),
    attempts: safeArray(attempts).slice(0, 40),
  };
  storage.set(SPEAKING_SESSIONS_KEY, [session, ...getSpeakingSessions()].slice(0, 120));
  diagnostics.log(`Sessão de speaking concluída: ${session.spokenCount} fala(s), média ${session.averageScore}/100.`, 'success');
  return session;
}

export function getLessonDrafts() { return safeObject(storage.get(LESSON_DRAFTS_KEY, {})); }
export function getLessonDraft(lessonId) { return getLessonDrafts()[lessonId] || ''; }
export function saveLessonDraft({ lesson, answer }) {
  const lessonId = getCompletionId(lesson);
  const drafts = getLessonDrafts();
  const nextDrafts = { ...drafts, [lessonId]: String(answer || '') };
  storage.set(LESSON_DRAFTS_KEY, nextDrafts);
  diagnostics.log(`Rascunho salvo para aula: ${lesson?.title || lessonId}`, 'info');
  return nextDrafts[lessonId];
}

export function completeLesson({ lesson, answers = {}, writtenAnswer = '', flowResults = [], preComputedScore = null, richFlowErrors = null }) {
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
  const fragileVocabulary = registerReadingVocabularyMistakes({ lesson, answers });
  const masteryProfile = recordLessonMastery({ lesson, answers, writtenAnswer, flowResults, preComputedScore });
  const lessonPillar = String(lesson?.pillar || lesson?.type || 'reading').toLowerCase();
  const masteryScore = masteryProfile?.pillars?.[lessonPillar]?.score || 0;
  // flowErrors: prefere dados ricos (richFlowErrors) com prompt/expected; fallback para flowResults simples
  const flowErrors = Array.isArray(richFlowErrors) && richFlowErrors.length
    ? richFlowErrors.map((err) => ({
        phaseId: err.phaseId || '',
        title: err.title || '',
        pillar: err.pillar || lessonPillar,
        level: err.level || lesson?.level || 'A1',
        lessonId: err.lessonId || lessonId,
        lessonTitle: err.lessonTitle || lesson?.title || '',
        value: err.value || '',
        prompt: err.prompt || '',
        expected: err.expected || '',
        status: err.status || 'warn',
      }))
    : flowResults.filter((r) => r.status === 'warn' || r.status === 'missed');
  const completion = {
    lessonId,
    curriculumId: lesson?.curriculumId || lesson?.raw?.curriculumId || lessonId,
    title: lesson?.title || 'Aula',
    type: lesson?.type || 'lesson',
    pillar: lessonPillar,
    level: lesson?.level || 'A1',
    completedAt: now.toISOString(),
    answers,
    writtenAnswer,
    xp: xpGain,
    masteryScore,
    fragileVocabularyCount: fragileVocabulary.length,
    flowScore: preComputedScore?.score ?? null,
    flowErrors,
  };
  const nextCompletions = alreadyCompleted ? completions.map((item) => item.lessonId === lessonId ? { ...item, ...completion, xp: item.xp || 0 } : item) : [completion, ...completions];
  const nextProgress = normalizeProgress({ ...progress, xp: progress.xp + xpGain, completedLessons: alreadyCompleted ? progress.completedLessons : progress.completedLessons + 1, streakDays: nextStreak, lastStudyDate: date, weekly: { ...progress.weekly, [currentWeek]: { completed: alreadyCompleted ? previousWeekly.completed : previousWeekly.completed + 1, xp: previousWeekly.xp + xpGain } } });
  storage.set(LESSON_COMPLETIONS_KEY, nextCompletions);
  storage.set(PROGRESS_KEY, nextProgress);
  saveLessonDraft({ lesson, answer: writtenAnswer });
  if (!alreadyCompleted && lesson?.checkpoint !== 'saturday-adaptive-review') markCurriculumLessonComplete(lesson);
  diagnostics.setPhase('aula concluída', 'success');
  diagnostics.log(`${alreadyCompleted ? 'Aula já estava concluída' : 'Aula concluída'}: ${completion.title}`, 'info');
  diagnostics.log(`Domínio (${lessonPillar}): ${masteryScore}/100. Erros de fase: ${flowErrors.length}.`, 'info');
  return { completion, progress: nextProgress, alreadyCompleted };
}

export function isLessonCompleted(lesson) { return getLessonCompletions().some((item) => item.lessonId === getCompletionId(lesson)); }
export function getCurrentWeekStats() { return getProgressSummary().weekly[weekKey(new Date())] || { completed: 0, xp: 0 }; }
export function getUserDisplayName() { return storage.getText('user.displayName', '') || 'Estudante'; }
export function setUserDisplayName(name) { storage.setText('user.displayName', String(name || '').trim()); }
