import { getWritingLevelPolicy } from '../../../writing/writingLevelPolicy.js';
import { PRACTICE_PHASES, QUESTION_TYPES } from '../PracticeTypes.js';
import { createQuestion, makeExistingExerciseQuestions, makeFillBlankQuestion, makeVocabularyQuestions, makeWordBankQuestion } from './builderUtils.js';

function withWritingRubric(question, context) {
  if (!question || question.type !== QUESTION_TYPES.WRITE_SHORT) return question;
  const policy = getWritingLevelPolicy(context.level || 'A1');
  if (!policy.rubricApplied) return question;
  return {
    ...question,
    writingRubric: {
      enabled: true,
      level: policy.level,
      passingScore: policy.rubricPassingScore,
      modelAnswer: question.answer,
    },
    writingSkillTag: question.writingSkillTag || 'free_production',
  };
}

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

  questions.push(...makeExistingExerciseQuestions(context, PRACTICE_PHASES.WRITING).map((question) => withWritingRubric(question, context)));

  sentences.slice(0, 8).forEach((sentence) => {
    questions.push(withWritingRubric(createQuestion({
      skill: context.skill,
      phase: PRACTICE_PHASES.WRITING,
      type: QUESTION_TYPES.WRITE_SHORT,
      title: 'Escreva em inglês',
      prompt: 'Escreva uma frase usando a ideia estudada.',
      answer: sentence,
      writingSkillTag: 'free_production',
      source: 'writing-production',
    }), context));
  });

  return questions;
}
