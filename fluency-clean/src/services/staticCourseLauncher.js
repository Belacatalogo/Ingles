import { findStaticLesson } from '../content/curriculum/index.js';
import { getNextStaticLesson, getStaticLessonById, markStaticLessonOpened as markCourseLessonOpened } from './curriculumEngine.js';
import { getCompletedLessonIds, getLessonLockReason } from './lessonProgression.js';
import { saveGenerationStatus } from './lessonStore.js';
import { markStaticLessonOpened } from './staticLessonProgress.js';
import { storage } from './storage.js';

const CURRENT_LESSON_KEY = 'lesson.current';

function clean(value) { return String(value ?? '').trim(); }
function sameLesson(a, b) { return Boolean(clean(a?.id) && clean(a?.id) === clean(b?.id)); }

function getGuidedCourseLockReason(lesson, completedIds = getCompletedLessonIds()) {
  if (!lesson) return 'Aula não encontrada.';
  if (completedIds?.has?.(lesson.id)) return '';
  const next = getNextStaticLesson(lesson.level || 'A1');
  if (sameLesson(lesson, next.lesson)) return '';
  return 'Essa aula ainda está bloqueada. Continue pela próxima aula liberada.';
}

export function canOpenStaticCourseLesson(lesson) {
  if (!lesson || clean(lesson.status) !== 'ready' || !clean(lesson.schemaVersion).startsWith('static-lesson-schema')) return false;
  const completedIds = getCompletedLessonIds();
  return !getLessonLockReason(lesson, completedIds) && !getGuidedCourseLockReason(lesson, completedIds);
}

export function getStaticLessonOpenReason(lesson) {
  if (!lesson) return 'Aula não encontrada.';
  if (canOpenStaticCourseLesson(lesson)) return '';
  if (lesson.status === 'planned') return 'Aula planejada, mas o conteúdo real ainda não foi implementado.';
  const completedIds = getCompletedLessonIds();
  const lockReason = getLessonLockReason(lesson, completedIds) || getGuidedCourseLockReason(lesson, completedIds);
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
  if (!canOpenStaticCourseLesson(lesson)) {
    return { ok: false, reason: getStaticLessonOpenReason(lesson), lesson: lesson || null };
  }
  const saved = saveStaticLessonAsCurrent(lesson, options);
  markCourseLessonOpened(lesson.id);
  markStaticLessonOpened(lesson);
  return { ok: true, lesson: saved, navigateTo: options.navigateTo || 'lesson' };
}

export function openDailyStaticCourseLesson(level = 'A1') {
  const next = getNextStaticLesson(level);
  const lesson = next.lesson;
  if (!lesson) {
    return { ok: false, reason: 'Nenhuma aula liberada agora. Veja os critérios do nível.', lesson: null, next };
  }
  if (next.lockReason) {
    return { ok: false, reason: next.lockReason, lesson, next };
  }
  return { ...openStaticCourseLesson(lesson, { source: 'daily-guided-course' }), next };
}

export function openStaticCourseLessonById(lessonId, level = 'A1') {
  return openStaticCourseLesson(getStaticLessonById(lessonId, level));
}

export function openStaticReviewLessonById(lessonId) {
  const lesson = findStaticLesson(lessonId);
  return openStaticCourseLesson(lesson, { source: 'static-review-from-errors' });
}
