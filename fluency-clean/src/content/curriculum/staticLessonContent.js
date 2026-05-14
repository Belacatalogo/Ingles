import { A1_FOUNDATIONS_BY_PILLAR, A1_FOUNDATIONS_LESSONS } from './levels/A1/foundationsSafe.js';
import { A1_DEEP_GRAMMAR_BY_PILLAR, A1_DEEP_GRAMMAR_FOUNDATIONS } from './levels/A1/deepGrammarFoundations.js';
import { A1_DEEP_GRAMMAR_EXTRA, A1_DEEP_GRAMMAR_EXTRA_BY_PILLAR } from './levels/A1/deepGrammarFoundationsExtra.js';
import { A1_DEEP_VOCABULARY_BY_PILLAR, A1_DEEP_VOCABULARY_FOUNDATIONS } from './levels/A1/deepVocabularyFoundations.js';
import { A1_DEEP_READING_BY_PILLAR, A1_DEEP_READING_FOUNDATIONS } from './levels/A1/deepReadingFoundations.js';
import { A1_DEEP_LISTENING_BY_PILLAR, A1_DEEP_LISTENING_FOUNDATIONS } from './levels/A1/deepListeningFoundations.js';
import { A1_DEEP_SPEAKING_BY_PILLAR, A1_DEEP_SPEAKING_FOUNDATIONS } from './levels/A1/deepSpeakingFoundations.js';
import { A1_DEEP_WRITING_BY_PILLAR, A1_DEEP_WRITING_FOUNDATIONS } from './levels/A1/deepWritingFoundations.js';
import { A1_DEEP_PERSONAL_LIFE, A1_DEEP_PERSONAL_LIFE_BY_PILLAR } from './levels/A1/deepPersonalLife.js';
import { A1_DEEP_DAILY_ROUTINE, A1_DEEP_DAILY_ROUTINE_BY_PILLAR } from './levels/A1/deepDailyRoutine.js';
import { A1_DEEP_PRACTICAL_SITUATIONS, A1_DEEP_PRACTICAL_SITUATIONS_BY_PILLAR } from './levels/A1/deepPracticalSituations.js';
import { A1_DEEP_PRACTICAL_SITUATIONS_PLACES, A1_DEEP_PRACTICAL_SITUATIONS_PLACES_BY_PILLAR } from './levels/A1/deepPracticalSituationsPlaces.js';
import { A1_DEEP_PRACTICAL_SITUATIONS_HOUSE, A1_DEEP_PRACTICAL_SITUATIONS_HOUSE_BY_PILLAR } from './levels/A1/deepPracticalSituationsHouse.js';
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

function mergePillarLessons(deepGrammar, deepGrammarExtra, deepVocabulary, deepReading, deepListening, deepSpeaking, deepWriting, personalLife, dailyRoutine, practicalSituations, practicalSituationsPlaces, practicalSituationsHouse, foundations, full) {
  return Object.freeze({
    grammar: Object.freeze(mergeUniqueLessons(deepGrammar.grammar || [], deepGrammarExtra.grammar || [], personalLife.grammar || [], dailyRoutine.grammar || [], practicalSituations.grammar || [], practicalSituationsPlaces.grammar || [], practicalSituationsHouse.grammar || [], foundations.grammar || [], full.grammar || [])),
    vocabulary: Object.freeze(mergeUniqueLessons(deepVocabulary.vocabulary || [], personalLife.vocabulary || [], dailyRoutine.vocabulary || [], practicalSituations.vocabulary || [], practicalSituationsPlaces.vocabulary || [], practicalSituationsHouse.vocabulary || [], foundations.vocabulary || [], full.vocabulary || [])),
    reading: Object.freeze(mergeUniqueLessons(deepReading.reading || [], personalLife.reading || [], dailyRoutine.reading || [], practicalSituations.reading || [], practicalSituationsPlaces.reading || [], practicalSituationsHouse.reading || [], foundations.reading || [], full.reading || [])),
    listening: Object.freeze(mergeUniqueLessons(deepListening.listening || [], personalLife.listening || [], dailyRoutine.listening || [], practicalSituations.listening || [], practicalSituationsPlaces.listening || [], practicalSituationsHouse.listening || [], foundations.listening || [], full.listening || [])),
    speaking: Object.freeze(mergeUniqueLessons(deepSpeaking.speaking || [], personalLife.speaking || [], dailyRoutine.speaking || [], practicalSituations.speaking || [], practicalSituationsPlaces.speaking || [], practicalSituationsHouse.speaking || [], foundations.speaking || [], full.speaking || [])),
    writing: Object.freeze(mergeUniqueLessons(deepWriting.writing || [], personalLife.writing || [], dailyRoutine.writing || [], practicalSituations.writing || [], practicalSituationsPlaces.writing || [], practicalSituationsHouse.writing || [], foundations.writing || [], full.writing || [])),
    checkpoint: Object.freeze([...A1_CHECKPOINT_LESSONS]),
  });
}

export const STATIC_READY_LESSONS = Object.freeze(mergeUniqueLessons(A1_DEEP_GRAMMAR_FOUNDATIONS, A1_DEEP_GRAMMAR_EXTRA, A1_DEEP_VOCABULARY_FOUNDATIONS, A1_DEEP_READING_FOUNDATIONS, A1_DEEP_LISTENING_FOUNDATIONS, A1_DEEP_SPEAKING_FOUNDATIONS, A1_DEEP_WRITING_FOUNDATIONS, A1_DEEP_PERSONAL_LIFE, A1_DEEP_DAILY_ROUTINE, A1_DEEP_PRACTICAL_SITUATIONS, A1_DEEP_PRACTICAL_SITUATIONS_PLACES, A1_DEEP_PRACTICAL_SITUATIONS_HOUSE, A1_FOUNDATIONS_LESSONS, A1_FULL_CONTENT_LESSONS, A1_CHECKPOINT_LESSONS));

export const STATIC_READY_LESSONS_BY_LEVEL = Object.freeze({
  A1: Object.freeze([...STATIC_READY_LESSONS]),
});

export const STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR = Object.freeze({
  A1: mergePillarLessons(A1_DEEP_GRAMMAR_BY_PILLAR, A1_DEEP_GRAMMAR_EXTRA_BY_PILLAR, A1_DEEP_VOCABULARY_BY_PILLAR, A1_DEEP_READING_BY_PILLAR, A1_DEEP_LISTENING_BY_PILLAR, A1_DEEP_SPEAKING_BY_PILLAR, A1_DEEP_WRITING_BY_PILLAR, A1_DEEP_PERSONAL_LIFE_BY_PILLAR, A1_DEEP_DAILY_ROUTINE_BY_PILLAR, A1_DEEP_PRACTICAL_SITUATIONS_BY_PILLAR, A1_DEEP_PRACTICAL_SITUATIONS_PLACES_BY_PILLAR, A1_DEEP_PRACTICAL_SITUATIONS_HOUSE_BY_PILLAR, A1_FOUNDATIONS_BY_PILLAR, A1_FULL_CONTENT_BY_PILLAR),
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
