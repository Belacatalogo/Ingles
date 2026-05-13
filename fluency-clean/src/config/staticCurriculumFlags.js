export const USE_STATIC_CURRICULUM = true;
export const SHOW_LEGACY_AI_LESSON_GENERATOR = false;

export function isStaticCurriculumEnabled() {
  return USE_STATIC_CURRICULUM;
}

export function canShowLegacyAiLessonGenerator() {
  return SHOW_LEGACY_AI_LESSON_GENERATOR;
}
