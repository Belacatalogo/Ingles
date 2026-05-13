import { getStaticLessonById, markStaticLessonOpened as markCourseLessonOpened } from './curriculumEngine.js';
import { saveCurrentLesson } from './lessonStore.js';
import { markStaticLessonOpened } from './staticLessonProgress.js';

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

export function openStaticCourseLesson(lesson, options = {}) {
  if (!canOpenStaticCourseLesson(lesson)) {
    return { ok: false, reason: getStaticLessonOpenReason(lesson), lesson: lesson || null };
  }
  const saved = saveCurrentLesson({ ...lesson, type: lesson.pillar }, {
    source: 'static-curriculum',
    provider: 'static',
    model: 'curated',
    status: 'ready',
    contractVersion: lesson.schemaVersion || 'static-lesson-schema-v1',
    pedagogicalScore: 100,
  });
  markCourseLessonOpened(lesson.id);
  markStaticLessonOpened(lesson);
  return { ok: true, lesson: saved, navigateTo: options.navigateTo || 'lesson' };
}

export function openStaticCourseLessonById(lessonId, level = 'A1') {
  return openStaticCourseLesson(getStaticLessonById(lessonId, level));
}
