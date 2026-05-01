import { PRACTICE_PHASES, QUESTION_TYPES } from '../PracticeTypes.js';
import { createQuestion, makeExistingExerciseQuestions, makeFillBlankQuestion, makeVocabularyQuestions, makeWordBankQuestion } from './builderUtils.js';

export function buildWritingPractice(context) {
  const sentences = context.sentences.filter((sentence) => sentence.length >= 6 && sentence.length <= 110);
  const questions = [];

  questions.push(...makeVocabularyQuestions(context, 4));

  sentences.slice(0, 6).forEach((sentence) => {
    const fillBlank = makeFillBlankQuestion({ sentence, context, phase: PRACTICE_PHASES.GUIDED_PRODUCTION });
    const wordBank = makeWordBankQuestion({ sentence, context, phase: PRACTICE_PHASES.GUIDED_PRODUCTION, prompt: 'Monte a frase antes de escrever sozinho.' });
    if (fillBlank) questions.push(fillBlank);
    if (wordBank) questions.push(wordBank);
  });

  questions.push(...makeExistingExerciseQuestions(context, PRACTICE_PHASES.WRITING));

  sentences.slice(0, 8).forEach((sentence) => {
    questions.push(createQuestion({
      skill: context.skill,
      phase: PRACTICE_PHASES.WRITING,
      type: QUESTION_TYPES.WRITE_SHORT,
      title: 'Escreva em inglês',
      prompt: 'Escreva uma frase usando a ideia estudada.',
      answer: sentence,
      source: 'writing-production',
    }));
  });

  return questions;
}
