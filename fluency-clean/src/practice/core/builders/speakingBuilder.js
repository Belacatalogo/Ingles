import { PRACTICE_PHASES, QUESTION_TYPES } from '../PracticeTypes.js';
import { createQuestion, makeExistingExerciseQuestions, makeFillBlankQuestion, makeVocabularyQuestions } from './builderUtils.js';

export function buildSpeakingPractice(context) {
  const sentences = context.sentences.filter((sentence) => sentence.length >= 6 && sentence.length <= 100);
  const questions = [];

  questions.push(...makeVocabularyQuestions(context, 3));

  sentences.slice(0, 5).forEach((sentence) => {
    questions.push(createQuestion({
      skill: context.skill,
      phase: PRACTICE_PHASES.WARMUP,
      type: QUESTION_TYPES.SPEAK_RESPONSE,
      title: 'Repita em voz alta',
      prompt: sentence,
      answer: sentence,
      audioText: sentence,
      source: 'speaking-repeat',
    }));
  });

  questions.push(...makeExistingExerciseQuestions(context, PRACTICE_PHASES.SPEAKING));

  sentences.slice(0, 5).forEach((sentence) => {
    const fillBlank = makeFillBlankQuestion({ sentence, context, phase: PRACTICE_PHASES.GUIDED_PRODUCTION });
    if (fillBlank) questions.push(fillBlank);
  });

  sentences.slice(0, 6).forEach((sentence) => {
    questions.push(createQuestion({
      skill: context.skill,
      phase: PRACTICE_PHASES.SPEAKING,
      type: QUESTION_TYPES.SPEAK_RESPONSE,
      title: 'Fale com confiança',
      prompt: sentence,
      answer: sentence,
      audioText: sentence,
      source: 'speaking-production',
    }));
  });

  return questions;
}
