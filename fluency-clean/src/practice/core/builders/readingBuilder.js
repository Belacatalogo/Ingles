import { PRACTICE_PHASES, QUESTION_TYPES } from '../PracticeTypes.js';
import { createQuestion, makeExistingExerciseQuestions, makeFillBlankQuestion, makeVocabularyQuestions, makeWordBankQuestion, makeSentenceOptions } from './builderUtils.js';

export function buildReadingPractice(context) {
  const sentences = context.sentences.filter((sentence) => sentence.length >= 8);
  const questions = [];

  questions.push(...makeVocabularyQuestions(context, 6));

  if (sentences[0]) {
    questions.push(createQuestion({
      skill: context.skill,
      phase: PRACTICE_PHASES.COMPREHENSION,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      title: 'Ideia principal',
      prompt: 'Qual frase resume melhor o texto?',
      answer: sentences[0],
      options: makeSentenceOptions(sentences[0], context),
      source: 'main-idea',
    }));
  }

  questions.push(...makeExistingExerciseQuestions(context, PRACTICE_PHASES.COMPREHENSION));

  sentences.slice(0, 6).forEach((sentence) => {
    const fillBlank = makeFillBlankQuestion({ sentence, context, phase: PRACTICE_PHASES.RECOGNITION });
    if (fillBlank) questions.push(fillBlank);
  });

  sentences.slice(0, 5).forEach((sentence) => {
    const wordBank = makeWordBankQuestion({ sentence, context, phase: PRACTICE_PHASES.WRITING, prompt: 'Monte uma frase do texto.' });
    if (wordBank) questions.push(wordBank);
  });

  sentences.slice(0, 4).forEach((sentence) => {
    questions.push(createQuestion({
      skill: context.skill,
      phase: PRACTICE_PHASES.WRITING,
      type: QUESTION_TYPES.WRITE_SHORT,
      title: 'Resposta curta',
      prompt: 'Escreva uma resposta curta sobre esta ideia.',
      answer: sentence,
      source: 'reading-short-answer',
    }));
  });

  return questions;
}
