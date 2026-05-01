import { PRACTICE_PHASES, QUESTION_TYPES } from '../PracticeTypes.js';
import { splitPracticeWords } from '../PracticeNormalizer.js';
import { createQuestion, getA1DictationUnits, makeExistingExerciseQuestions, makeFillBlankQuestion, makeVocabularyQuestions, makeWordBankQuestion, makeWordOptions } from './builderUtils.js';

function isEarlyA1(context) {
  const level = String(context.level || '').toUpperCase();
  const index = Number(context.lessonIndex || context.order || context.sequence || 0);
  return level === 'A1' && (!index || index <= 8);
}

export function buildListeningPractice(context) {
  const earlyA1 = isEarlyA1(context);
  const sentences = context.sentences.filter((sentence) => sentence.length >= 8);
  const shortSentences = sentences.filter((sentence) => splitPracticeWords(sentence).length <= (earlyA1 ? 5 : 8) && sentence.length <= (earlyA1 ? 48 : 72));
  const questions = [];

  questions.push(...makeVocabularyQuestions(context, earlyA1 ? 5 : 4));

  const recognitionSources = earlyA1 ? getA1DictationUnits(context, 8) : sentences.slice(0, 6);
  recognitionSources.forEach((source) => {
    const words = splitPracticeWords(source).filter((word) => word.length >= 2);
    const answer = words.find((word) => context.keywords.includes(word.toLowerCase())) || words[0] || source;
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

  const dictationUnits = earlyA1 ? getA1DictationUnits(context, 6) : shortSentences.slice(0, 6);
  dictationUnits.forEach((unit) => {
    const wordCount = splitPracticeWords(unit).length;
    questions.push(createQuestion({
      skill: context.skill,
      phase: PRACTICE_PHASES.GUIDED_PRODUCTION,
      type: QUESTION_TYPES.DICTATION,
      title: wordCount <= 2 ? 'Escute e escreva' : 'Escute a frase curta',
      prompt: wordCount <= 2 ? 'Escreva a palavra que você ouviu.' : 'Escreva a frase curta que você ouviu.',
      answer: unit,
      audioText: unit,
      source: earlyA1 ? 'dictation-a1-short' : 'dictation',
    }));
  });

  shortSentences.slice(0, earlyA1 ? 3 : 5).forEach((sentence) => {
    const wordBank = makeWordBankQuestion({ sentence, context, prompt: 'Monte a frase curta em inglês.' });
    const fillBlank = makeFillBlankQuestion({ sentence, context });
    if (wordBank) questions.push(wordBank);
    if (fillBlank) questions.push(fillBlank);
  });

  shortSentences.slice(0, earlyA1 ? 3 : 4).forEach((sentence) => {
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
