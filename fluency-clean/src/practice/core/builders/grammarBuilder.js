import { PRACTICE_PHASES, QUESTION_TYPES } from '../PracticeTypes.js';
import { createQuestion, makeCorrectionQuestion, makeExistingExerciseQuestions, makeFillBlankQuestion, makeVocabularyQuestions, makeWordBankQuestion } from './builderUtils.js';

export function buildGrammarPractice(context) {
  const sentences = context.sentences.filter((sentence) => sentence.length >= 6 && sentence.length <= 100);
  const questions = [];

  questions.push(...makeVocabularyQuestions(context, 3));
  questions.push(...makeExistingExerciseQuestions(context, PRACTICE_PHASES.RECOGNITION));

  sentences.slice(0, 8).forEach((sentence) => {
    const fillBlank = makeFillBlankQuestion({ sentence, context, phase: PRACTICE_PHASES.GUIDED_PRODUCTION });
    const correction = makeCorrectionQuestion({ sentence, context, phase: PRACTICE_PHASES.GUIDED_PRODUCTION });
    const wordBank = makeWordBankQuestion({ sentence, context, phase: PRACTICE_PHASES.GUIDED_PRODUCTION, prompt: 'Organize a estrutura correta.' });
    if (fillBlank) questions.push(fillBlank);
    if (correction) questions.push(correction);
    if (wordBank) questions.push(wordBank);
  });

  sentences.slice(0, 5).forEach((sentence) => {
    questions.push(createQuestion({
      skill: context.skill,
      phase: PRACTICE_PHASES.WRITING,
      type: QUESTION_TYPES.WRITE_SHORT,
      title: 'Use a estrutura',
      prompt: 'Escreva uma frase parecida usando a estrutura da aula.',
      answer: sentence,
      source: 'grammar-production',
    }));
  });

  return questions;
}
