import { buildEvidenceQuestionsForLevel } from '../../../reading/readingEvidenceLayers.js';
import { isDuplicateOfAba, VARIANT_POLICY_BY_SKILL } from '../../../reading/readingPracticeVariants.js';
import { pullSrsReviewItems, SRS_ITEM_TYPES } from '../../../services/practiceSrsExtended.js';
import { PRACTICE_PHASES, QUESTION_TYPES } from '../PracticeTypes.js';
import { createQuestion, makeExistingExerciseQuestions, makeFillBlankQuestion, makeVocabularyQuestions, makeWordBankQuestion, makeSentenceOptions, makeMeaningOptions } from './builderUtils.js';

function buildVocabReviewQuestions(context, limit = 2) {
  return pullSrsReviewItems({
    skill: 'reading',
    level: context.level,
    limit,
  })
    .filter((seed) => seed?.srsItem?.type === SRS_ITEM_TYPES.VOCAB_WORD)
    .map((seed) => {
      const item = seed.srsItem;
      const word = String(item.content || '').replace(/^vocab::/, '');
      const meaning = item.meta?.meaning || '';
      if (!word || !meaning) return null;

      return createQuestion({
        skill: context.skill,
        phase: PRACTICE_PHASES.WARMUP,
        type: QUESTION_TYPES.MULTIPLE_CHOICE,
        title: 'Revisão · vocabulário frágil',
        prompt: `O que significa “${word}”?`,
        answer: meaning,
        options: makeMeaningOptions(meaning, context.vocabulary),
        vocabTag: `vocab::${word}`,
        vocabTagLabel: word,
        readingSkillTag: 'vocabulary_context',
        isReview: true,
        source: `srs-review:${item.key}`,
      });
    })
    .filter(Boolean)
    .slice(0, limit);
}

export function buildReadingPractice(context) {
  const sentences = context.sentences.filter((sentence) => sentence.length >= 8);
  const questions = [];
  const abaExercises = context.abaReadingExercises || [];
  let filteredByDuplication = 0;

  function tryAdd(question) {
    if (!question) return;
    if (!question.isReview && isDuplicateOfAba(question, abaExercises)) {
      filteredByDuplication += 1;
      return;
    }
    questions.push(question);
  }

  function tryAddMany(items) {
    items.filter(Boolean).forEach(tryAdd);
  }

  tryAddMany(buildVocabReviewQuestions(context, 2));
  tryAddMany(makeVocabularyQuestions(context, 6));
  tryAddMany(buildEvidenceQuestionsForLevel(context, context.evidenceTasks || []));

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
