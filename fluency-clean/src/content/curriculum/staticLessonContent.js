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
import { A1_DEEP_PRACTICAL_SITUATIONS_WEATHER_CLOTHES, A1_DEEP_PRACTICAL_SITUATIONS_WEATHER_CLOTHES_BY_PILLAR } from './levels/A1/deepPracticalSituationsWeatherClothes.js';
import { A1_DEEP_PRACTICAL_SITUATIONS_HELP, A1_DEEP_PRACTICAL_SITUATIONS_HELP_BY_PILLAR } from './levels/A1/deepPracticalSituationsHelp.js';
import { A1_DEEP_REVIEWS_GRAMMAR_VOCABULARY, A1_DEEP_REVIEWS_GRAMMAR_VOCABULARY_BY_PILLAR } from './levels/A1/deepA1ReviewsGrammarVocabulary.js';
import { A1_DEEP_REVIEWS_READING_LISTENING, A1_DEEP_REVIEWS_READING_LISTENING_BY_PILLAR } from './levels/A1/deepA1ReviewsReadingListening.js';
import { A1_DEEP_REVIEWS_SPEAKING_WRITING, A1_DEEP_REVIEWS_SPEAKING_WRITING_BY_PILLAR } from './levels/A1/deepA1ReviewsSpeakingWriting.js';
import { A1_FULL_CONTENT_BY_PILLAR, A1_FULL_CONTENT_LESSONS } from './levels/A1/fullContent.js';
import { A1_CHECKPOINT_LESSONS } from './levels/A1/checkpoints.js';
import { A2_DEEP_BRIDGE, A2_DEEP_BRIDGE_BY_PILLAR } from './levels/A2/deepA2Bridge.js';
import { A2_DEEP_BRIDGE_PART2, A2_DEEP_BRIDGE_PART2_BY_PILLAR } from './levels/A2/deepA2BridgePart2.js';
import { A2_DEEP_PAST_STORIES, A2_DEEP_PAST_STORIES_BY_PILLAR } from './levels/A2/deepA2PastStories.js';
import { A2_DEEP_PAST_STORIES_PART2, A2_DEEP_PAST_STORIES_PART2_BY_PILLAR } from './levels/A2/deepA2PastStoriesPart2.js';
import { A2_DEEP_PAST_STORIES_PART3, A2_DEEP_PAST_STORIES_PART3_BY_PILLAR } from './levels/A2/deepA2PastStoriesPart3.js';
import { A2_DEEP_PAST_STORIES_PART4, A2_DEEP_PAST_STORIES_PART4_BY_PILLAR } from './levels/A2/deepA2PastStoriesPart4.js';
import { A2_DEEP_PAST_STORIES_PART5, A2_DEEP_PAST_STORIES_PART5_BY_PILLAR } from './levels/A2/deepA2PastStoriesPart5.js';
import { A2_DEEP_PLANS_AND_NOW, A2_DEEP_PLANS_AND_NOW_BY_PILLAR } from './levels/A2/deepA2PlansAndNow.js';
import { A2_DEEP_PLANS_AND_NOW_PART2, A2_DEEP_PLANS_AND_NOW_PART2_BY_PILLAR } from './levels/A2/deepA2PlansAndNowPart2.js';
import { A2_DEEP_PLANS_AND_NOW_PART3, A2_DEEP_PLANS_AND_NOW_PART3_BY_PILLAR } from './levels/A2/deepA2PlansAndNowPart3.js';
import { A2_DEEP_PLANS_AND_NOW_PART4, A2_DEEP_PLANS_AND_NOW_PART4_BY_PILLAR } from './levels/A2/deepA2PlansAndNowPart4.js';
import { A2_DEEP_COMPARISONS_NEEDS, A2_DEEP_COMPARISONS_NEEDS_BY_PILLAR } from './levels/A2/deepA2ComparisonsNeeds.js';
import { A2_DEEP_COMPARISONS_NEEDS_PART2, A2_DEEP_COMPARISONS_NEEDS_PART2_BY_PILLAR } from './levels/A2/deepA2ComparisonsNeedsPart2.js';
import { A2_DEEP_COMPARISONS_NEEDS_PART3, A2_DEEP_COMPARISONS_NEEDS_PART3_BY_PILLAR } from './levels/A2/deepA2ComparisonsNeedsPart3.js';
import { A2_DEEP_COMPARISONS_NEEDS_PART4, A2_DEEP_COMPARISONS_NEEDS_PART4_BY_PILLAR } from './levels/A2/deepA2ComparisonsNeedsPart4.js';
import { A2_DEEP_COMMUNICATION_TASKS, A2_DEEP_COMMUNICATION_TASKS_BY_PILLAR } from './levels/A2/deepA2CommunicationTasks.js';
import { validateStaticLessonList } from '../schemas/index.js';

function mergeUniqueLessons(...groups) {
  const seen = new Set();
  return groups.flat().filter((lesson) => {
    if (!lesson?.id || seen.has(lesson.id)) return false;
    seen.add(lesson.id);
    return true;
  }).sort((a, b) => String(a.pillar).localeCompare(String(b.pillar)) || Number(a.order || 0) - Number(b.order || 0));
}

function mergeA1PillarLessons(deepGrammar, deepGrammarExtra, deepVocabulary, deepReading, deepListening, deepSpeaking, deepWriting, personalLife, dailyRoutine, practicalSituations, practicalSituationsPlaces, practicalSituationsHouse, weatherClothes, practicalHelp, grammarVocabularyReviews, readingListeningReviews, speakingWritingReviews, foundations, full) {
  return Object.freeze({
    grammar: Object.freeze(mergeUniqueLessons(deepGrammar.grammar || [], deepGrammarExtra.grammar || [], personalLife.grammar || [], dailyRoutine.grammar || [], practicalSituations.grammar || [], practicalSituationsPlaces.grammar || [], practicalSituationsHouse.grammar || [], practicalSituationsHouse.grammar || [], weatherClothes.grammar || [], practicalHelp.grammar || [], grammarVocabularyReviews.grammar || [], foundations.grammar || [], full.grammar || [])),
    vocabulary: Object.freeze(mergeUniqueLessons(deepVocabulary.vocabulary || [], personalLife.vocabulary || [], dailyRoutine.vocabulary || [], practicalSituations.vocabulary || [], practicalSituationsPlaces.vocabulary || [], practicalSituationsHouse.vocabulary || [], weatherClothes.vocabulary || [], practicalHelp.vocabulary || [], grammarVocabularyReviews.vocabulary || [], foundations.vocabulary || [], full.vocabulary || [])),
    reading: Object.freeze(mergeUniqueLessons(deepReading.reading || [], personalLife.reading || [], dailyRoutine.reading || [], practicalSituations.reading || [], practicalSituationsPlaces.reading || [], practicalSituationsHouse.reading || [], weatherClothes.reading || [], practicalHelp.reading || [], readingListeningReviews.reading || [], foundations.reading || [], full.reading || [])),
    listening: Object.freeze(mergeUniqueLessons(deepListening.listening || [], personalLife.listening || [], dailyRoutine.listening || [], practicalSituations.listening || [], practicalSituationsPlaces.listening || [], practicalSituationsHouse.listening || [], weatherClothes.listening || [], practicalHelp.listening || [], readingListeningReviews.listening || [], foundations.listening || [], full.listening || [])),
    speaking: Object.freeze(mergeUniqueLessons(deepSpeaking.speaking || [], personalLife.speaking || [], dailyRoutine.speaking || [], practicalSituations.speaking || [], practicalSituationsPlaces.speaking || [], practicalSituationsHouse.speaking || [], weatherClothes.speaking || [], practicalHelp.speaking || [], speakingWritingReviews.speaking || [], foundations.speaking || [], full.speaking || [])),
    writing: Object.freeze(mergeUniqueLessons(deepWriting.writing || [], personalLife.writing || [], dailyRoutine.writing || [], practicalSituations.writing || [], practicalSituationsPlaces.writing || [], practicalSituationsHouse.writing || [], weatherClothes.writing || [], practicalHelp.writing || [], speakingWritingReviews.writing || [], foundations.writing || [], full.writing || [])),
    checkpoint: Object.freeze([...A1_CHECKPOINT_LESSONS]),
  });
}

function mergeA2PillarLessons(bridge, bridgePart2, pastStories, pastStoriesPart2, pastStoriesPart3, pastStoriesPart4, pastStoriesPart5, plansAndNow, plansAndNowPart2, plansAndNowPart3, plansAndNowPart4, comparisonsNeeds, comparisonsNeedsPart2, comparisonsNeedsPart3, comparisonsNeedsPart4, communicationTasks) {
  return Object.freeze({
    grammar: Object.freeze(mergeUniqueLessons(bridge.grammar || [], bridgePart2.grammar || [], pastStories.grammar || [], pastStoriesPart2.grammar || [], pastStoriesPart3.grammar || [], pastStoriesPart4.grammar || [], pastStoriesPart5.grammar || [], plansAndNow.grammar || [], plansAndNowPart2.grammar || [], plansAndNowPart3.grammar || [], plansAndNowPart4.grammar || [], comparisonsNeeds.grammar || [], comparisonsNeedsPart2.grammar || [], comparisonsNeedsPart3.grammar || [], comparisonsNeedsPart4.grammar || [], communicationTasks.grammar || [])),
    vocabulary: Object.freeze(mergeUniqueLessons(bridge.vocabulary || [], bridgePart2.vocabulary || [], pastStories.vocabulary || [], pastStoriesPart2.vocabulary || [], pastStoriesPart3.vocabulary || [], pastStoriesPart4.vocabulary || [], pastStoriesPart5.vocabulary || [], plansAndNow.vocabulary || [], plansAndNowPart2.vocabulary || [], plansAndNowPart3.vocabulary || [], plansAndNowPart4.vocabulary || [], comparisonsNeeds.vocabulary || [], comparisonsNeedsPart2.vocabulary || [], comparisonsNeedsPart3.vocabulary || [], comparisonsNeedsPart4.vocabulary || [], communicationTasks.vocabulary || [])),
    reading: Object.freeze(mergeUniqueLessons(bridge.reading || [], bridgePart2.reading || [], pastStories.reading || [], pastStoriesPart2.reading || [], pastStoriesPart3.reading || [], pastStoriesPart4.reading || [], pastStoriesPart5.reading || [], plansAndNow.reading || [], plansAndNowPart2.reading || [], plansAndNowPart3.reading || [], plansAndNowPart4.reading || [], comparisonsNeeds.reading || [], comparisonsNeedsPart2.reading || [], comparisonsNeedsPart3.reading || [], comparisonsNeedsPart4.reading || [], communicationTasks.reading || [])),
    listening: Object.freeze(mergeUniqueLessons(bridge.listening || [], bridgePart2.listening || [], pastStories.listening || [], pastStoriesPart2.listening || [], pastStoriesPart3.listening || [], pastStoriesPart4.listening || [], pastStoriesPart5.listening || [], plansAndNow.listening || [], plansAndNowPart2.listening || [], plansAndNowPart3.listening || [], plansAndNowPart4.listening || [], comparisonsNeeds.listening || [], comparisonsNeedsPart2.listening || [], comparisonsNeedsPart3.listening || [], comparisonsNeedsPart4.listening || [], communicationTasks.listening || [])),
    speaking: Object.freeze(mergeUniqueLessons(bridge.speaking || [], bridgePart2.speaking || [], pastStories.speaking || [], pastStoriesPart2.speaking || [], pastStoriesPart3.speaking || [], pastStoriesPart4.speaking || [], pastStoriesPart5.speaking || [], plansAndNow.speaking || [], plansAndNowPart2.speaking || [], plansAndNowPart3.speaking || [], plansAndNowPart4.speaking || [], comparisonsNeeds.speaking || [], comparisonsNeedsPart2.speaking || [], comparisonsNeedsPart3.speaking || [], comparisonsNeedsPart4.speaking || [], communicationTasks.speaking || [])),
    writing: Object.freeze(mergeUniqueLessons(bridge.writing || [], bridgePart2.writing || [], pastStories.writing || [], pastStoriesPart2.writing || [], pastStoriesPart3.writing || [], pastStoriesPart4.writing || [], pastStoriesPart5.writing || [], plansAndNow.writing || [], plansAndNowPart2.writing || [], plansAndNowPart3.writing || [], plansAndNowPart4.writing || [], comparisonsNeeds.writing || [], comparisonsNeedsPart2.writing || [], comparisonsNeedsPart3.writing || [], comparisonsNeedsPart4.writing || [], communicationTasks.writing || [])),
    checkpoint: Object.freeze([]),
  });
}

const A1_READY_LESSONS = Object.freeze(mergeUniqueLessons(A1_DEEP_GRAMMAR_FOUNDATIONS, A1_DEEP_GRAMMAR_EXTRA, A1_DEEP_VOCABULARY_FOUNDATIONS, A1_DEEP_READING_FOUNDATIONS, A1_DEEP_LISTENING_FOUNDATIONS, A1_DEEP_SPEAKING_FOUNDATIONS, A1_DEEP_WRITING_FOUNDATIONS, A1_DEEP_PERSONAL_LIFE, A1_DEEP_DAILY_ROUTINE, A1_DEEP_PRACTICAL_SITUATIONS, A1_DEEP_PRACTICAL_SITUATIONS_PLACES, A1_DEEP_PRACTICAL_SITUATIONS_HOUSE, A1_DEEP_PRACTICAL_SITUATIONS_WEATHER_CLOTHES, A1_DEEP_PRACTICAL_SITUATIONS_HELP, A1_DEEP_REVIEWS_GRAMMAR_VOCABULARY, A1_DEEP_REVIEWS_READING_LISTENING, A1_DEEP_REVIEWS_SPEAKING_WRITING, A1_FOUNDATIONS_LESSONS, A1_FULL_CONTENT_LESSONS, A1_CHECKPOINT_LESSONS));
const A2_READY_LESSONS = Object.freeze(mergeUniqueLessons(A2_DEEP_BRIDGE, A2_DEEP_BRIDGE_PART2, A2_DEEP_PAST_STORIES, A2_DEEP_PAST_STORIES_PART2, A2_DEEP_PAST_STORIES_PART3, A2_DEEP_PAST_STORIES_PART4, A2_DEEP_PAST_STORIES_PART5, A2_DEEP_PLANS_AND_NOW, A2_DEEP_PLANS_AND_NOW_PART2, A2_DEEP_PLANS_AND_NOW_PART3, A2_DEEP_PLANS_AND_NOW_PART4, A2_DEEP_COMPARISONS_NEEDS, A2_DEEP_COMPARISONS_NEEDS_PART2, A2_DEEP_COMPARISONS_NEEDS_PART3, A2_DEEP_COMPARISONS_NEEDS_PART4, A2_DEEP_COMMUNICATION_TASKS));

export const STATIC_READY_LESSONS = Object.freeze(mergeUniqueLessons(A1_READY_LESSONS, A2_READY_LESSONS));

export const STATIC_READY_LESSONS_BY_LEVEL = Object.freeze({
  A1: A1_READY_LESSONS,
  A2: A2_READY_LESSONS,
});

export const STATIC_READY_LESSONS_BY_LEVEL_AND_PILLAR = Object.freeze({
  A1: mergeA1PillarLessons(A1_DEEP_GRAMMAR_BY_PILLAR, A1_DEEP_GRAMMAR_EXTRA_BY_PILLAR, A1_DEEP_VOCABULARY_BY_PILLAR, A1_DEEP_READING_BY_PILLAR, A1_DEEP_LISTENING_BY_PILLAR, A1_DEEP_SPEAKING_BY_PILLAR, A1_DEEP_WRITING_BY_PILLAR, A1_DEEP_PERSONAL_LIFE_BY_PILLAR, A1_DEEP_DAILY_ROUTINE_BY_PILLAR, A1_DEEP_PRACTICAL_SITUATIONS_BY_PILLAR, A1_DEEP_PRACTICAL_SITUATIONS_PLACES_BY_PILLAR, A1_DEEP_PRACTICAL_SITUATIONS_HOUSE_BY_PILLAR, A1_DEEP_PRACTICAL_SITUATIONS_WEATHER_CLOTHES_BY_PILLAR, A1_DEEP_PRACTICAL_SITUATIONS_HELP_BY_PILLAR, A1_DEEP_REVIEWS_GRAMMAR_VOCABULARY_BY_PILLAR, A1_DEEP_REVIEWS_READING_LISTENING_BY_PILLAR, A1_DEEP_REVIEWS_SPEAKING_WRITING_BY_PILLAR, A1_FOUNDATIONS_BY_PILLAR, A1_FULL_CONTENT_BY_PILLAR),
  A2: mergeA2PillarLessons(A2_DEEP_BRIDGE_BY_PILLAR, A2_DEEP_BRIDGE_PART2_BY_PILLAR, A2_DEEP_PAST_STORIES_BY_PILLAR, A2_DEEP_PAST_STORIES_PART2_BY_PILLAR, A2_DEEP_PAST_STORIES_PART3_BY_PILLAR, A2_DEEP_PAST_STORIES_PART4_BY_PILLAR, A2_DEEP_PAST_STORIES_PART5_BY_PILLAR, A2_DEEP_PLANS_AND_NOW_BY_PILLAR, A2_DEEP_PLANS_AND_NOW_PART2_BY_PILLAR, A2_DEEP_PLANS_AND_NOW_PART3_BY_PILLAR, A2_DEEP_PLANS_AND_NOW_PART4_BY_PILLAR, A2_DEEP_COMPARISONS_NEEDS_BY_PILLAR, A2_DEEP_COMPARISONS_NEEDS_PART2_BY_PILLAR, A2_DEEP_COMPARISONS_NEEDS_PART3_BY_PILLAR, A2_DEEP_COMPARISONS_NEEDS_PART4_BY_PILLAR, A2_DEEP_COMMUNICATION_TASKS_BY_PILLAR),
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
