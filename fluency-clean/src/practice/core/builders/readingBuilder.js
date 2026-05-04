import { isDuplicateOfAba, VARIANT_POLICY_BY_SKILL } from '../../../reading/readingPracticeVariants.js';
import { PRACTICE_PHASES, QUESTION_TYPES } from '../PracticeTypes.js';
import { createQuestion, makeExistingExerciseQuestions, makeFillBlankQuestion, makeVocabularyQuestions, makeWordBankQuestion, makeSentenceOptions } from './builderUtils.js';

export function buildReadingPractice(context) {
  const sentences = context.sentences.filter((sentence) => sentence.length >= 8);
  const questions = [];
  const abaExercises = context.abaReadingExercises || [];
  let filteredByDuplication = 0;

  function tryAdd(question) {
    if (!question) return;
    if (isDuplicateOfAba(question, abaExercises)) {
      filteredByDuplication += 1;
      return;
    }
    questions.push(question);
  }

  function tryAddMany(items) {
    items.filter(Boolean).forEach(tryAdd);
  }

  tryAddMany(makeVocabularyQuestions(context, 6));

  if (sentences[0]) {
    tryAdd(createQuestion({
      skill: context.skill,
      readingSkillTag: 'main_idea',
      variantPolicy: VARIANT_POLICY_BY_SKILL.main_idea,
      phase: PRACTICE_PHASES.COMPREHENSION,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      title: 'Ideia principal',
      prompt: 'Qual frase resume melhor o texto?',
      answer: sentences[0],
      options: makeSentenceOptions(sentences[0], context),
      source: 'main-idea',
    }));
  }

  tryAddMany(makeExistingExerciseQuestions(context, PRACTICE_PHASES.COMPREHENSION));

  sentences.slice(0, 6).forEach((sentence) => {
    const fillBlank = makeFillBlankQuestion({ sentence, context, phase: PRACTICE_PHASES.RECOGNITION });
    if (fillBlank) {
      tryAdd({
        ...fillBlank,
        readingSkillTag: 'detail',
        variantPolicy: VARIANT_POLICY_BY_SKILL.detail,
      });
    }
  });

  sentences.slice(0, 5).forEach((sentence) => {
    const wordBank = makeWordBankQuestion({ sentence, context, phase: PRACTICE_PHASES.WRITING, prompt: 'Monte uma frase do texto.' });
    if (wordBank) {
      tryAdd({
        ...wordBank,
        readingSkillTag: 'detail',
        variantPolicy: VARIANT_POLICY_BY_SKILL.detail,
      });
    }
  });

  sentences.slice(0, 4).forEach((sentence) => {
    tryAdd(createQuestion({
      skill: context.skill,
      readingSkillTag: 'detail',
      variantPolicy: VARIANT_POLICY_BY_SKILL.detail,
      phase: PRACTICE_PHASES.WRITING,
      type: QUESTION_TYPES.WRITE_SHORT,
      title: 'Resposta curta',
      prompt: 'Escreva uma resposta curta sobre esta ideia.',
      answer: sentence,
      source: 'reading-short-answer',
    }));
  });

  if (filteredByDuplication > 0) {
    console.info(`[reading-variants] ${filteredByDuplication} questões filtradas por duplicação`);
  }

  return questions;
}
