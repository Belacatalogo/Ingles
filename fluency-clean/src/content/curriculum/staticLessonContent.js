import { A1_FOUNDATIONS_BY_PILLAR, A1_FOUNDATIONS_LESSONS } from './levels/A1/foundationsSafe.js';
import { A1_FULL_CONTENT_BY_PILLAR, A1_FULL_CONTENT_LESSONS } from './levels/A1/fullContent.js';
import { A1_CHECKPOINT_LESSONS } from './levels/A1/checkpoints.js';
import { validateStaticLessonList } from '../schemas/index.js';

function mergeUniqueLessons(...groups) {
  const seen = new Set();
  return groups.flat().filter((lesson) => {
    if (!lesson?.id || seen.has(lesson.id)) return false;
    seen.add(lesson.id);
    return true;
  }).sort((a, b) => String(a.pillar).localeCompare(String(b.pillar)) || Number(a.order || 0) - Number(b.order || 0));
}

function mergePillarLessons(foundations, full) {
  return Object.freeze({
    grammar: Object.freeze(mergeUniqueLessons(foundations.grammar || [], full.grammar || [])),
    vocabulary: Object.freeze(mergeUniqueLessons(foundations.vocabulary || [], full.vocabulary || [])),
    reading: Object.freeze(mergeUniqueLessons(foundations.reading || [], full.reading || [])),
    listening: Object.freeze(mergeUniqueLessons(foundations.listening || [], full.listening || [])),
    speaking: Object.freeze(mergeUniqueLessons(foundations.speaking || [], full.speaking || [])),
    writing: Object.freeze(mergeUniqueLessons(foundations.writing || [], full.writing || [])),
    checkpoint: Object.freeze([...A1_CHECKPOINT_LESSONS]),
  });
}

export const STATIC_READY_LESSONS = Object.freeze(mergeUniqueLessons(A1_FOUNDATIONS_LESSONS, A1_FULL_CONTENT_LESSONS, A1_CHECKPOINT_LESSONS));

export const STATIC_READY_LESSONS_BY_LEVEL = Object.freeze({
  A1: Object.freeze([...STATIC_READY_LESSONS]),
});

export const STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR = Object.freeze({
  A1: mergePillarLessons(A1_FOUNDATIONS_BY_PILLAR, A1_FULL_CONTENT_BY_PILLAR),
});

export function getStaticReadyLessons(level = 'A1') {
  return STATIC_READY_LESSONS_BY_LEVEL[level] || [];
}

export function getStaticReadyLessonsByPillar(level = 'A1', pillar = '') {
  return STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR[level]?.[pillar] || [];
}

export function findStaticReadyLesson(lessonId) {
  return STATIC_READY_LESSONS.find((lesson) => lesson.id === lessonId) || null;
}

export function validateStaticReadyLessons(level = 'A1') {
  return validateStaticLessonList(getStaticReadyLessons(level));
}
