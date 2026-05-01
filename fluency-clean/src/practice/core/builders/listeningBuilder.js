import { PRACTICE_PHASES, QUESTION_TYPES } from '../PracticeTypes.js';
import { splitPracticeWords } from '../PracticeNormalizer.js';
import { createQuestion, makeExistingExerciseQuestions, makeFillBlankQuestion, makeVocabularyQuestions, makeWordBankQuestion, makeWordOptions } from './builderUtils.js';

export function buildListeningPractice(context) {
  const sentences = context.sentences.filter((sentence) => sentence.length >= 8);
  const questions = [];

  questions.push(...makeVocabularyQuestions(context, 4));

  sentences.slice(0, 6).forEach((sentence) => {
    const words = splitPracticeWords(sentence).filter((word) => word.length >= 3);
    const answer = words.find((word) => context.keywords.includes(word.toLowerCase())) || words[0];
    if (!answer) return;
    questions.push(createQuestion({
      skill: context.skill,
      phase: PRACTICE_PHASES.RECOGNITION,
      type: QUESTION_TYPES.AUDIO_CHOICE,
      title: 'O que você escutou?',
      prompt: 'Ouça e escolha a palavra correta.',
      answer,
      audioText: answer,
      options: makeWordOptions(answer, context),
      source: 'listening-recognition',
    }));
  });

  questions.push(...makeExistingExerciseQuestions(context, PRACTICE_PHASES.COMPREHENSION));

  sentences.slice(0, 6).forEach((sentence) => {
    questions.push(createQuestion({
      skill: context.skill,
      phase: PRACTICE_PHASES.GUIDED_PRODUCTION,
      type: QUESTION_TYPES.DICTATION,
      title: 'Escute e escreva',
      prompt: 'Escreva a frase que você ouviu.',
      answer: sentence,
      audioText: sentence,
      source: 'dictation',
    }));
  });

  sentences.slice(0, 5).forEach((sentence) => {
    const wordBank = makeWordBankQuestion({ sentence, context, prompt: 'Monte a frase que você ouviu.' });
    const fillBlank = makeFillBlankQuestion({ sentence, context });
    if (wordBank) questions.push(wordBank);
    if (fillBlank) questions.push(fillBlank);
  });

  sentences.slice(0, 4).forEach((sentence) => {
    questions.push(createQuestion({
      skill: context.skill,
      phase: PRACTICE_PHASES.SPEAKING,
      type: QUESTION_TYPES.SPEAK_RESPONSE,
      title: 'Repita em voz alta',
      prompt: sentence,
      answer: sentence,
      audioText: sentence,
      source: 'shadowing',
    }));
  });

  return questions;
}
