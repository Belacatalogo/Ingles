import { findStaticLesson } from '../content/curriculum/index.js';
import { getStaticLessonById, markStaticLessonOpened as markCourseLessonOpened } from './curriculumEngine.js';
import { saveGenerationStatus } from './lessonStore.js';
import { markStaticLessonOpened } from './staticLessonProgress.js';
import { storage } from './storage.js';

const CURRENT_LESSON_KEY = 'lesson.current';

function clean(value) { return String(value ?? '').trim(); }

export function canOpenStaticCourseLesson(lesson) {
  return Boolean(lesson && clean(lesson.status) === 'ready' && clean(lesson.schemaVersion).startsWith('static-lesson-schema'));
}

export function getStaticLessonOpenReason(lesson) {
  if (!lesson) return 'Aula não encontrada.';
  if (canOpenStaticCourseLesson(lesson)) return '';
  if (lesson.status === 'planned') return 'Aula planejada, mas o conteúdo real ainda não foi implementado.';
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

export function openStaticCourseLessonById(lessonId, level = 'A1') {
  return openStaticCourseLesson(getStaticLessonById(lessonId, level));
}

export function openStaticReviewLessonById(lessonId) {
  const lesson = findStaticLesson(lessonId);
  return openStaticCourseLesson(lesson, { source: 'static-review-from-errors' });
}
