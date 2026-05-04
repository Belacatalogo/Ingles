import { GRAMMAR_BRAZILIAN_ERRORS } from '../../../grammar/grammarBrazilianErrors.js';
import { getGrammarLevelPolicy, normalizeGrammarLevel } from '../../../grammar/grammarLevelPolicy.js';
import { pullSrsReviewItems, SRS_ITEM_TYPES } from '../../../services/practiceSrsExtended.js';
import { PRACTICE_PHASES, QUESTION_TYPES } from '../PracticeTypes.js';
import {
  createQuestion,
  makeFillBlankQuestion,
  makeSentenceOptions,
  makeVocabularyQuestions,
  makeWordBankQuestion,
  unique,
} from './builderUtils.js';

const MAX_QUESTIONS_BY_LEVEL = Object.freeze({
  A1: 10,
  A2: 12,
  B1: 14,
  B2: 16,
  C1: 18,
});

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function getSentenceWordCount(value) {
  return clean(value).split(/\s+/).filter(Boolean).length;
}

function getMainGrammarTag(context, fallback = '') {
  return clean(
    context.grammarFocusTag ||
    context.raw?.grammarFocusTag ||
    context.raw?.focusArea ||
    context.raw?.focus ||
    fallback ||
    'grammar-pattern'
  );
}

function normalizeErrorPattern(tag, error) {
  const first = error?.examples?.[0] || {};
  return {
    tag,
    label: error?.label || tag,
    wrong: first.wrong || '',
    right: first.right || '',
    explanation: error?.why || '',
    level: error?.level || '',
    area: error?.area || '',
  };
}

function getBrazilianErrorPatterns(level, context = {}) {
  const normalizedLevel = normalizeGrammarLevel(level || context.level || 'A1');
  const focusArea = clean(context.raw?.focusArea || context.raw?.focus || context.grammarFocusTag || '');
  const policy = getGrammarLevelPolicy(normalizedLevel);

  const fromDictionary = Object.entries(GRAMMAR_BRAZILIAN_ERRORS)
    .map(([tag, error]) => normalizeErrorPattern(tag, error))
    .filter((pattern) => {
      if (pattern.level === normalizedLevel) return true;
      if (focusArea && pattern.area === focusArea) return true;
      return policy.focusAreas?.includes(pattern.area);
    });

  const fromLesson = Array.isArray(context.raw?.typicalErrors)
    ? context.raw.typicalErrors.map((error, index) => ({
      tag: clean(error?.errorTag || error?.tag || `lesson-error-${index + 1}`),
      label: clean(error?.errorTag || error?.tag || 'Erro da aula'),
      wrong: clean(error?.wrongExample || error?.wrong || error?.incorrect || ''),
      right: clean(error?.correction || error?.correct || error?.right || ''),
      explanation: clean(error?.why || error?.explanation || ''),
      level: normalizedLevel,
      area: focusArea,
    })).filter((pattern) => pattern.wrong && pattern.right)
    : [];

  const combined = [...fromLesson, ...fromDictionary];
  const seen = new Set();
  return combined.filter((pattern) => {
    const key = `${pattern.tag}:${pattern.wrong}:${pattern.right}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return pattern.wrong && pattern.right && pattern.wrong.toLowerCase() !== pattern.right.toLowerCase();
  });
}

function getStructureBreakdown(context) {
  const rule = context.raw?.ruleBlock || context.raw?.rule || {};
  return {
    affirmative: clean(rule.affirmative?.example || ''),
    negative: clean(rule.negative?.example || ''),
    question: clean(rule.question?.example || ''),
  };
}

function makeGrammarCorrectionFromError(errorPattern, context, phase = PRACTICE_PHASES.GUIDED_PRODUCTION) {
  if (!errorPattern?.wrong || !errorPattern?.right) return null;
  if (errorPattern.wrong.toLowerCase() === errorPattern.right.toLowerCase()) return null;
  return createQuestion({
    skill: context.skill,
    phase,
    type: QUESTION_TYPES.CORRECTION,
    title: phase === PRACTICE_PHASES.REVIEW ? 'Revisão · erro comum' : 'Corrija o erro',
    prompt: errorPattern.wrong,
    answer: errorPattern.right,
    explanation: errorPattern.explanation || errorPattern.label || '',
    grammarTag: errorPattern.tag || getMainGrammarTag(context),
    grammarTagLabel: errorPattern.label || errorPattern.tag || '',
    source: `brazilian-error::${errorPattern.tag || 'generic'}`,
  });
}

function makeRecognitionQuestion(correctForm, context, grammarTag, extra = []) {
  const answer = clean(correctForm);
  if (!answer) return null;
  const options = makeSentenceOptions(answer, context, extra).filter(Boolean);
  if (options.length < 2) return null;
  return createQuestion({
    skill: context.skill,
    phase: PRACTICE_PHASES.RECOGNITION,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    title: 'Qual está correto?',
    prompt: 'Escolha a frase gramaticalmente correta.',
    answer,
    options,
    grammarTag,
    grammarTagLabel: grammarTag,
    source: 'grammar-recognition',
  });
}

function makeTrueFalseRecognition(correctSentence, wrongSentence, context, grammarTag) {
  const answer = clean(correctSentence);
  const wrong = clean(wrongSentence);
  if (!answer || !wrong) return null;
  return createQuestion({
    skill: context.skill,
    phase: PRACTICE_PHASES.RECOGNITION,
    type: QUESTION_TYPES.TRUE_FALSE,
    title: 'Forma correta ou errada',
    prompt: `A frase está correta? "${wrong}"`,
    answer: 'False',
    options: ['True', 'False'],
    explanation: `Forma correta: ${answer}`,
    grammarTag,
    grammarTagLabel: grammarTag,
    source: 'grammar-true-false',
  });
}

function makeSrsReviewQuestions(context, errorPatterns) {
  return pullSrsReviewItems({
    skill: 'grammar',
    level: context.level,
    limit: 3,
  })
    .filter((seed) => seed?.srsItem?.type === SRS_ITEM_TYPES.GRAMMAR_PATTERN)
    .map((seed) => {
      const tag = clean(seed.srsItem.content);
      const match = errorPatterns.find((pattern) => pattern.tag === tag) || errorPatterns.find((pattern) => pattern.tag === seed.srsItem.label);
      if (!match) return null;
      return {
        ...createQuestion({
          skill: context.skill,
          phase: PRACTICE_PHASES.REVIEW,
          type: QUESTION_TYPES.CORRECTION,
          title: `Revisão · ${seed.srsItem.label || tag}`,
          prompt: match.wrong,
          answer: match.right,
          explanation: match.explanation || match.label,
          grammarTag: tag,
          grammarTagLabel: seed.srsItem.label || match.label || tag,
          isReview: true,
          source: `srs-review::${tag}`,
        }),
        srsKey: seed.srsItem.key,
      };
    })
    .filter(Boolean);
}

function tagQuestion(question, grammarTag) {
  if (!question) return null;
  return {
    ...question,
    grammarTag: question.grammarTag || grammarTag,
    grammarTagLabel: question.grammarTagLabel || grammarTag,
  };
}

function dedupeQuestions(questions) {
  const seen = new Set();
  return questions.filter((question) => {
    if (!question) return false;
    const key = `${question.phase}:${question.type}:${question.prompt}:${question.answer}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function limitByLevel(questions, level) {
  const max = MAX_QUESTIONS_BY_LEVEL[normalizeGrammarLevel(level)] || 12;
  return questions.slice(0, max);
}

export function buildGrammarPractice(context) {
  const level = normalizeGrammarLevel(context.level || 'A1');
  const policy = getGrammarLevelPolicy(level);
  const grammarTag = getMainGrammarTag(context, policy.focusAreas?.[0]);
  const maxSentenceWords = Number(policy.sentenceLengthRange?.[1] || 16);
  const errorPatterns = getBrazilianErrorPatterns(level, context);
  const structureBreakdown = getStructureBreakdown(context);
  const sentences = unique([
    structureBreakdown.affirmative,
    structureBreakdown.negative,
    structureBreakdown.question,
    ...context.sentences,
    ...context.exercises.map((exercise) => exercise.answer),
  ])
    .filter((sentence) => sentence.length >= 6)
    .filter((sentence) => getSentenceWordCount(sentence) <= maxSentenceWords + 4)
    .slice(0, 10);

  const questions = [];

  // WARMUP — vocabulário da aula
  questions.push(...makeVocabularyQuestions(context, 1).map((question) => tagQuestion(question, grammarTag)));

  // RECOGNITION — reconhecer forma correta vs errada
  const recognitionBase = [structureBreakdown.affirmative, structureBreakdown.negative, structureBreakdown.question].filter(Boolean);
  recognitionBase.slice(0, 2).forEach((sentence) => {
    const q = makeRecognitionQuestion(sentence, context, grammarTag, errorPatterns.slice(0, 2).map((pattern) => pattern.wrong));
    if (q) questions.push(q);
  });
  if (errorPatterns[0] && recognitionBase[0]) {
    const tf = makeTrueFalseRecognition(errorPatterns[0].right || recognitionBase[0], errorPatterns[0].wrong, context, errorPatterns[0].tag || grammarTag);
    if (tf) questions.push(tf);
  }
  sentences.slice(0, 2).forEach((sentence) => {
    const q = makeRecognitionQuestion(sentence, context, grammarTag);
    if (q) questions.push(q);
  });

  // GUIDED_PRODUCTION — fill_blank, word_bank, correction
  sentences.slice(0, level === 'A1' ? 2 : 3).forEach((sentence) => {
    const fillBlank = makeFillBlankQuestion({ sentence, context, phase: PRACTICE_PHASES.GUIDED_PRODUCTION });
    if (fillBlank) questions.push(tagQuestion(fillBlank, grammarTag));
  });
  sentences.slice(0, level === 'A1' ? 1 : 2).forEach((sentence) => {
    const wordBank = makeWordBankQuestion({ sentence, context, phase: PRACTICE_PHASES.GUIDED_PRODUCTION, prompt: 'Organize a frase correta.' });
    if (wordBank) questions.push(tagQuestion(wordBank, grammarTag));
  });
  errorPatterns.slice(0, 2).forEach((pattern) => {
    const correction = makeGrammarCorrectionFromError(pattern, context, PRACTICE_PHASES.GUIDED_PRODUCTION);
    if (correction) questions.push(correction);
  });

  // WRITING — produção própria
  const writingPrompt = ['A1', 'A2'].includes(level)
    ? 'Escreva uma frase usando a estrutura da aula.'
    : 'Write a sentence using the grammar structure from this lesson.';
  sentences.slice(0, level === 'A1' ? 1 : 2).forEach((sentence) => {
    questions.push(createQuestion({
      skill: context.skill,
      phase: PRACTICE_PHASES.WRITING,
      type: QUESTION_TYPES.WRITE_SHORT,
      title: 'Escreva em inglês',
      prompt: writingPrompt,
      answer: sentence,
      grammarTag,
      grammarTagLabel: grammarTag,
      source: 'grammar-production',
    }));
  });

  // REVIEW — erros típicos + SRS
  errorPatterns.slice(2, 4).forEach((pattern) => {
    const correction = makeGrammarCorrectionFromError(pattern, context, PRACTICE_PHASES.REVIEW);
    if (correction) questions.push(correction);
  });
  questions.push(...makeSrsReviewQuestions(context, errorPatterns).slice(0, 2));

  return limitByLevel(dedupeQuestions(questions), level);
}
