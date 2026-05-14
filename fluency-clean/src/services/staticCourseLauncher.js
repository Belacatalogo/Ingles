import { findStaticLesson } from '../content/curriculum/index.js';
import { getNextStaticLesson, getStaticLessonById, markStaticLessonOpened as markCourseLessonOpened } from './curriculumEngine.js';
import { getCompletedLessonIds, getLessonLockReason } from './lessonProgression.js';
import { getLessonCompletions, localDateKey } from './progressStore.js';
import { saveGenerationStatus } from './lessonStore.js';
import { markStaticLessonOpened } from './staticLessonProgress.js';
import { storage } from './storage.js';

const CURRENT_LESSON_KEY = 'lesson.current';

function clean(value) { return String(value ?? '').trim(); }
function sameLesson(a, b) { return Boolean(clean(a?.id) && clean(a?.id) === clean(b?.id)); }
function isReadyStaticLesson(lesson) { return Boolean(lesson && clean(lesson.status) === 'ready' && clean(lesson.schemaVersion).startsWith('static-lesson-schema')); }
function getCurrentStoredLesson() { return storage.get(CURRENT_LESSON_KEY, null); }
function isSunday(date = new Date()) { return date.getDay() === 0; }
function getTodayLessonCompletion(date = new Date()) {
  const today = localDateKey(date);
  return getLessonCompletions().find((item) => localDateKey(item?.completedAt || item?.createdAt || item) === today) || null;
}
function getDailyStudyLockReason({ lesson = null, current = null, completedIds = getCompletedLessonIds(), date = new Date() } = {}) {
  if (isSunday(date)) return 'Domingo é dia de descanso. A próxima aula libera de segunda a sábado.';
  const todayCompletion = getTodayLessonCompletion(date);
  if (!todayCompletion) return '';
  if (lesson && current && sameLesson(current, lesson) && !completedIds.has(lesson.id)) return '';
  if (lesson && completedIds.has(lesson.id)) return '';
  return 'Você já concluiu a aula de hoje. A próxima aula libera no próximo dia de estudo.';
}

function getGuidedCourseLockReason(lesson, completedIds = getCompletedLessonIds()) {
  if (!lesson) return 'Aula não encontrada.';
  if (completedIds?.has?.(lesson.id)) return '';
  const next = getNextStaticLesson(lesson.level || 'A1');
  if (sameLesson(lesson, next.lesson)) return '';
  return 'Essa aula ainda está bloqueada. Continue pela próxima aula liberada.';
}

export function getDailyStaticCourseLessonState(level = 'A1') {
  const completedIds = getCompletedLessonIds();
  const next = getNextStaticLesson(level);
  const lesson = next.lesson;
  const current = getCurrentStoredLesson();
  const todayCompletion = getTodayLessonCompletion();
  const shouldResume = Boolean(lesson && current && sameLesson(current, lesson) && !completedIds.has(lesson.id));
  const sequenceLockReason = lesson ? (next.lockReason || getLessonLockReason(lesson, completedIds)) : 'Nenhuma aula liberada agora. Veja os critérios do nível.';
  const dailyLockReason = shouldResume ? '' : getDailyStudyLockReason({ lesson, current, completedIds });
  const lockReason = sequenceLockReason || dailyLockReason;

  return {
    level,
    lesson: lesson || null,
    currentLesson: current || null,
    next,
    canOpen: Boolean(lesson && !lockReason && isReadyStaticLesson(lesson)),
    shouldResume,
    actionLabel: shouldResume ? 'Retomar aula' : 'Começar aula',
    statusLabel: shouldResume ? 'Aula em andamento' : lesson && !lockReason ? 'Aula liberada' : 'Próxima etapa bloqueada',
    helperText: shouldResume
      ? 'Você já começou esta aula. Toque para continuar de onde parou.'
      : lesson && !lockReason
        ? 'Esta é a aula que será aberta automaticamente.'
        : lockReason,
    reason: lockReason || '',
    todayCompletion,
  };
}

export function canOpenStaticCourseLesson(lesson, options = {}) {
  if (!isReadyStaticLesson(lesson)) return false;
  const completedIds = getCompletedLessonIds();
  const current = getCurrentStoredLesson();
  const ignoreDailyLimit = options.ignoreDailyLimit === true;
  return !getLessonLockReason(lesson, completedIds)
    && !getGuidedCourseLockReason(lesson, completedIds)
    && (ignoreDailyLimit || !getDailyStudyLockReason({ lesson, current, completedIds }));
}

export function getStaticLessonOpenReason(lesson, options = {}) {
  if (!lesson) return 'Aula não encontrada.';
  if (canOpenStaticCourseLesson(lesson, options)) return '';
  if (lesson.status === 'planned') return 'Aula planejada, mas o conteúdo real ainda não foi implementado.';
  const completedIds = getCompletedLessonIds();
  const current = getCurrentStoredLesson();
  const lockReason = getLessonLockReason(lesson, completedIds)
    || getGuidedCourseLockReason(lesson, completedIds)
    || (options.ignoreDailyLimit === true ? '' : getDailyStudyLockReason({ lesson, current, completedIds }));
  if (lockReason) return lockReason;
  return 'Aula ainda não está pronta para abrir.';
}

function notifyStaticLessonUpdated(lesson) {
  try {
    window.dispatchEvent(new CustomEvent('fluency:lesson-updated', {
      detail: {
        lessonId: lesson?.id || '',
        lessonTitle: lesson?.title || '',
        generationId: lesson?.generationMeta?.id || '',
        status: 'static-saved',
        savedAt: lesson?.generationMeta?.savedAt || new Date().toISOString(),
      },
    }));
  } catch {
    // event is best-effort only
  }
}

function saveStaticLessonAsCurrent(lesson, options = {}) {
  const now = new Date().toISOString();
  const generationId = `static-${lesson.id}`;
  const fullLesson = {
    ...lesson,
    type: lesson.pillar,
    provider: 'static',
    generationMeta: {
      id: generationId,
      source: options.source || 'static-curriculum',
      provider: 'static',
      model: 'curated',
      status: 'ready',
      generatedAt: lesson.updatedAt || now,
      savedAt: now,
      contractVersion: lesson.schemaVersion || 'static-lesson-schema-v1',
      pedagogicalScore: 100,
    },
  };

  storage.set(CURRENT_LESSON_KEY, fullLesson);
  saveGenerationStatus({
    id: generationId,
    event: 'static-saved',
    message: 'Aula fixa salva completa no storage local.',
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    contractVersion: fullLesson.generationMeta.contractVersion,
    pedagogicalScore: 100,
    source: fullLesson.generationMeta.source,
    createdAt: now,
  });
  notifyStaticLessonUpdated(fullLesson);
  return fullLesson;
}

export function openStaticCourseLesson(lesson, options = {}) {
  if (!canOpenStaticCourseLesson(lesson, options)) {
    return { ok: false, reason: getStaticLessonOpenReason(lesson, options), lesson: lesson || null };
  }
  const saved = saveStaticLessonAsCurrent(lesson, options);
  markCourseLessonOpened(lesson.id);
  markStaticLessonOpened(lesson);
  return { ok: true, lesson: saved, navigateTo: options.navigateTo || 'lesson' };
}

export function openDailyStaticCourseLesson(level = 'A1') {
  const state = getDailyStaticCourseLessonState(level);
  const lesson = state.lesson;
  if (!lesson) {
    return { ok: false, reason: state.reason || 'Nenhuma aula liberada agora. Veja os critérios do nível.', lesson: null, next: state.next, state };
  }
  if (state.reason) {
    return { ok: false, reason: state.reason, lesson, next: state.next, state };
  }
  return { ...openStaticCourseLesson(lesson, { source: state.shouldResume ? 'daily-guided-course-resume' : 'daily-guided-course' }), next: state.next, state };
}

export function openStaticCourseLessonById(lessonId, level = 'A1') {
  return openStaticCourseLesson(getStaticLessonById(lessonId, level));
}

export function openStaticReviewLessonById(lessonId) {
  const lesson = findStaticLesson(lessonId);
  return openStaticCourseLesson(lesson, { source: 'static-review-from-errors', ignoreDailyLimit: true });
}
