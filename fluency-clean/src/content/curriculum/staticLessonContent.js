import { A1_FOUNDATIONS_BY_PILLAR, A1_FOUNDATIONS_LESSONS } from './levels/A1/foundationsSafe.js';
import { validateStaticLessonList } from '../schemas/index.js';

export const STATIC_READY_LESSONS = Object.freeze([...A1_FOUNDATIONS_LESSONS]);

export const STATIC_READY_LESSONS_BY_LEVEL = Object.freeze({
  A1: Object.freeze([...A1_FOUNDATIONS_LESSONS]),
});

export const STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR = Object.freeze({
  A1: A1_FOUNDATIONS_BY_PILLAR,
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
