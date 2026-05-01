import { DEFAULT_PRACTICE_LIMITS, PRACTICE_RESULT_STATUS } from './PracticeTypes.js';

export function createPracticeSession({ lessonId, questions = [], lives = DEFAULT_PRACTICE_LIMITS.startingLives } = {}) {
  return {
    lessonId: lessonId || 'lesson',
    questions,
    index: 0,
    lives,
    startingLives: lives,
    answers: [],
    completed: false,
    reviewMode: false,
    startedAt: new Date().toISOString(),
    completedAt: null,
  };
}

export function getCurrentPracticeQuestion(session) {
  return session?.questions?.[session.index] || null;
}

export function recordPracticeAnswer(session, result, rawAnswer) {
  const current = getCurrentPracticeQuestion(session);
  const loseLife = Boolean(result?.loseLife);
  const nextLives = loseLife ? Math.max(0, session.lives - 1) : session.lives;
  const entry = {
    questionId: current?.id,
    type: current?.type,
    phase: current?.phase,
    answer: rawAnswer,
    expected: current?.answer,
    status: result?.status || PRACTICE_RESULT_STATUS.INCORRECT,
    correct: Boolean(result?.correct),
    retryable: Boolean(result?.retryable),
    loseLife,
    createdAt: new Date().toISOString(),
  };

  return {
    ...session,
    lives: nextLives,
    reviewMode: nextLives <= 0 || session.reviewMode,
    answers: [...session.answers, entry],
  };
}

export function advancePracticeSession(session) {
  const nextIndex = session.index + 1;
  const completed = nextIndex >= session.questions.length;
  return {
    ...session,
    index: Math.min(nextIndex, session.questions.length),
    completed,
    completedAt: completed ? new Date().toISOString() : session.completedAt,
  };
}

export function restartPracticeSession(session) {
  return createPracticeSession({
    lessonId: session.lessonId,
    questions: session.questions,
    lives: session.startingLives || DEFAULT_PRACTICE_LIMITS.startingLives,
  });
}

export function summarizePracticeSession(session) {
  const total = session?.questions?.length || 0;
  const answered = session?.answers?.length || 0;
  const correct = session?.answers?.filter((answer) => answer.correct).length || 0;
  const mistakes = session?.answers?.filter((answer) => answer.status === PRACTICE_RESULT_STATUS.INCORRECT).length || 0;
  return {
    total,
    answered,
    correct,
    mistakes,
    accuracy: answered ? Math.round((correct / answered) * 100) : 0,
    lives: session?.lives ?? 0,
    completed: Boolean(session?.completed),
    reviewMode: Boolean(session?.reviewMode),
  };
}
