import { getWritingLevelPolicy, normalizeWritingLevel } from '../../../writing/writingLevelPolicy.js';
import { getWritingRubricForLevel } from '../../../writing/writingRubric.js';
import { pullSrsReviewItems } from '../../../services/practiceSrsExtended.js';
import { PRACTICE_PHASES, QUESTION_TYPES } from '../PracticeTypes.js';
import {
  createQuestion,
  makeCorrectionQuestion,
  makeExistingExerciseQuestions,
  makeFillBlankQuestion,
  makeVocabularyQuestions,
  makeWordBankQuestion,
} from './builderUtils.js';

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function getProductionInstruction(policy) {
  return clean(policy.productionInstruction || (policy.instructionLanguage === 'pt-BR'
    ? 'Escreva em inglês usando as estruturas da aula.'
    : 'Write in English using the structures from this lesson.'));
}

function withWritingTag(question, tag) {
  if (!question) return null;
  return {
    ...question,
    writingSkillTag: question.writingSkillTag || tag,
  };
}

function withWritingRubric(question, level, rubric) {
  if (!question || question.type !== QUESTION_TYPES.WRITE_SHORT || !rubric) return question;
  return {
    ...question,
    writingRubric: {
      enabled: true,
      level,
      criteria: rubric.criteria,
      passingScore: rubric.passingScore,
      modelAnswer: question.answer,
    },
  };
}

function dedupeWritingQuestions(questions) {
  const seen = new Set();
  return questions.filter((question) => {
    if (!question) return false;
    const key = `${question.phase}:${question.type}:${question.prompt}:${question.answer}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function buildWritingPractice(context) {
  const level = normalizeWritingLevel(context.level || 'A1');
  const policy = getWritingLevelPolicy(level);
  const rubric = getWritingRubricForLevel(level);
  const sentences = (context.sentences || []).map(clean).filter((sentence) => sentence.length >= 6 && sentence.length <= 110);
  const questions = [];

  // 1. SRS review — vocabulário/estrutura fraca antes de produzir.
  const reviews = pullSrsReviewItems({ skill: 'writing', level: context.level, limit: 1 });
  reviews.forEach((seed) => {
    const content = clean(seed?.srsItem?.content || '');
    const label = clean(seed?.srsItem?.label || content);
    if (!content) return;
    questions.push(withWritingRubric(createQuestion({
      skill: 'writing',
      phase: PRACTICE_PHASES.WARMUP,
      type: QUESTION_TYPES.WRITE_SHORT,
      title: 'Revisão frágil',
      prompt: `Reescreva: "${label}"`,
      answer: content,
      isReview: true,
      writingSkillTag: 'sentence_structure',
      source: `srs-review:${seed.srsItem.key}`,
    }), level, rubric));
  });

  // 2. Vocabulary — suporte antes da escrita.
  questions.push(...makeVocabularyQuestions(context, 3).map((question) => withWritingTag(question, 'vocabulary_choice')));

  // 3. Fill blank — estrutura guiada.
  sentences.slice(0, 4).forEach((sentence) => {
    const question = makeFillBlankQuestion({ sentence, context, phase: PRACTICE_PHASES.GUIDED_PRODUCTION });
    if (question) questions.push(withWritingTag(question, 'sentence_structure'));
  });

  // 4. Word bank — montar antes de escrever.
  sentences.slice(0, 3).forEach((sentence) => {
    const question = makeWordBankQuestion({
      sentence,
      context,
      phase: PRACTICE_PHASES.GUIDED_PRODUCTION,
      prompt: 'Monte a frase modelo:',
    });
    if (question) questions.push(withWritingTag(question, 'sentence_structure'));
  });

  // 5. Correction — erros básicos de escrita.
  sentences.slice(0, 3).forEach((sentence) => {
    const question = makeCorrectionQuestion({ sentence, context, phase: PRACTICE_PHASES.GUIDED_PRODUCTION });
    if (question) questions.push(withWritingTag(question, 'punctuation_basics'));
  });

  // 6. Exercícios internos da aula.
  questions.push(...makeExistingExerciseQuestions(context, PRACTICE_PHASES.WRITING)
    .map((question) => withWritingRubric(withWritingTag(question, 'task_response'), level, rubric)));

  // 7. Write short — produção real com rubrica embutida.
  const prodCount = Number(policy.productionSentences?.max || 2) <= 2 ? 3 : 2;
  sentences.slice(0, prodCount).forEach((sentence) => {
    questions.push(withWritingRubric(createQuestion({
      skill: 'writing',
      phase: PRACTICE_PHASES.WRITING,
      type: QUESTION_TYPES.WRITE_SHORT,
      title: 'Escreva em inglês',
      prompt: getProductionInstruction(policy),
      answer: sentence,
      writingSkillTag: 'paragraph_cohesion',
      source: 'writing-production',
    }), level, rubric));
  });

  return dedupeWritingQuestions(questions).map((question) => withWritingTag(question, question.writingSkillTag || 'writing_practice'));
}
