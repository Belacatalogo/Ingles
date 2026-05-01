import { PRACTICE_PHASES, QUESTION_TYPES } from '../PracticeTypes.js';
import { cleanPracticeText, detectAnswerKind, normalizePracticeText, splitPracticeWords } from '../PracticeNormalizer.js';

const GENERIC_DISTRACTORS = new Set([
  'resposta', 'responder', 'pergunta', 'frase', 'palavra', 'coisa', 'exemplo', 'texto', 'aula',
  'answer', 'question', 'sentence', 'word', 'thing', 'example', 'text', 'lesson',
]);

export function makeId(parts) {
  return parts
    .map((part) => cleanPracticeText(part).toLowerCase().replace(/[^a-z0-9]+/g, '-'))
    .join('-')
    .replace(/^-|-$/g, '')
    .slice(0, 96);
}

export function unique(values) {
  const seen = new Set();
  return values.map(cleanPracticeText).filter(Boolean).filter((value) => {
    const key = normalizePracticeText(value);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function shuffle(values) {
  return [...values]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.value);
}

export function isGenericDistractor(value) {
  const normalized = normalizePracticeText(value);
  return GENERIC_DISTRACTORS.has(normalized) || /resposta\//i.test(value) || /^(resposta|answer)\b/i.test(value);
}

export function isCompactOption(value, maxWords = 5, maxChars = 44) {
  const clean = cleanPracticeText(value);
  if (!clean || clean.length > maxChars) return false;
  if (splitPracticeWords(clean).length > maxWords) return false;
  if (isGenericDistractor(clean)) return false;
  return true;
}

export function createQuestion(base) {
  return {
    id: base.id || makeId([base.skill, base.phase, base.type, base.prompt, base.answer]),
    skill: base.skill,
    phase: base.phase,
    type: base.type,
    title: cleanPracticeText(base.title),
    prompt: cleanPracticeText(base.prompt),
    answer: cleanPracticeText(base.answer),
    answerKind: base.answerKind || detectAnswerKind(base.answer),
    options: Array.isArray(base.options) ? unique(base.options) : [],
    words: Array.isArray(base.words) ? unique(base.words) : [],
    audioText: cleanPracticeText(base.audioText || ''),
    explanation: cleanPracticeText(base.explanation || ''),
    source: base.source || 'builder',
  };
}

export function translatePromptToPortuguese(prompt) {
  const clean = cleanPracticeText(prompt);
  if (/what is .* practicing/i.test(clean)) return 'O que está sendo praticado?';
  if (/what .* hear/i.test(clean)) return 'O que você escutou?';
  if (/what .* main idea/i.test(clean)) return 'Qual é a ideia principal?';
  if (/choose/i.test(clean)) return clean.replace(/^choose:?\s*/i, 'Escolha: ');
  if (/complete/i.test(clean)) return clean.replace(/^complete:?\s*/i, 'Complete: ');
  if (/correct/i.test(clean)) return clean.replace(/^correct:?\s*/i, 'Corrija: ');
  if (/write/i.test(clean) && /name/i.test(clean)) return 'Escreva seu nome em inglês.';
  if (/answer/i.test(clean)) return clean.replace(/^answer:?\s*/i, 'Responda: ');
  return clean;
}

export function makeWordOptions(answer, context, extra = []) {
  const pool = unique([
    answer,
    ...context.keywords,
    ...context.vocabulary.map((item) => item.word),
    ...extra,
    'apple',
    'book',
    'name',
    'letter',
    'sound',
    'listen',
    'repeat',
    'morning',
  ]).filter((item) => item.length >= 2 && isCompactOption(item, 2, 24));
  const distractors = shuffle(pool).filter((item) => normalizePracticeText(item) !== normalizePracticeText(answer)).slice(0, 3);
  return shuffle(unique([answer, ...distractors]).filter((item) => isCompactOption(item, 2, 24)).slice(0, 4));
}

export function makeSentenceOptions(answer, context, extra = []) {
  const answerWords = splitPracticeWords(answer).length;
  const maxWords = answerWords <= 4 ? 5 : 8;
  const maxChars = answerWords <= 4 ? 42 : 62;
  const pool = unique([answer, ...context.sentences, ...extra]).filter((sentence) => isCompactOption(sentence, maxWords, maxChars));
  const distractors = shuffle(pool).filter((item) => normalizePracticeText(item) !== normalizePracticeText(answer)).slice(0, 3);
  return shuffle(unique([answer, ...distractors]).filter((item) => isCompactOption(item, maxWords, maxChars)).slice(0, 4));
}

export function makeMeaningOptions(answer, vocabulary) {
  const cleanAnswer = cleanPracticeText(answer);
  const pool = unique([cleanAnswer, ...vocabulary.map((item) => item.meaning)])
    .filter((item) => isCompactOption(item, 4, 34));
  let distractors = shuffle(pool).filter((item) => normalizePracticeText(item) !== normalizePracticeText(cleanAnswer)).slice(0, 3);

  if (distractors.length < 3) {
    const safeFallbacks = ['nome', 'letra', 'som', 'ouvir', 'livro', 'maçã']
      .filter((item) => normalizePracticeText(item) !== normalizePracticeText(cleanAnswer))
      .filter((item) => !distractors.some((existing) => normalizePracticeText(existing) === normalizePracticeText(item)));
    distractors = [...distractors, ...safeFallbacks].slice(0, 3);
  }

  return shuffle(unique([cleanAnswer, ...distractors]).filter((item) => isCompactOption(item, 4, 34)).slice(0, 4));
}

export function getA1DictationUnits(context, limit = 6) {
  const vocabWords = context.vocabulary
    .map((item) => item.word)
    .filter((word) => isCompactOption(word, 2, 20));
  const shortSentences = context.sentences
    .filter((sentence) => splitPracticeWords(sentence).length <= 4 && sentence.length <= 42);
  return unique([...vocabWords, ...context.keywords, ...shortSentences])
    .filter((item) => splitPracticeWords(item).length <= 4 && item.length <= 42)
    .slice(0, limit);
}

export function makeWordBankQuestion({ sentence, context, phase = PRACTICE_PHASES.GUIDED_PRODUCTION, prompt = 'Monte a frase em inglês.' }) {
  const words = splitPracticeWords(sentence);
  if (words.length < 3 || words.length > 8) return null;
  const answerWords = words.join(' ');
  const extras = ['please', 'book', 'name', 'letter', 'morning', 'English']
    .filter((word) => !words.map((item) => item.toLowerCase()).includes(word.toLowerCase()))
    .slice(0, 3);
  return createQuestion({
    skill: context.skill,
    phase,
    type: QUESTION_TYPES.WORD_BANK,
    title: 'Monte a frase',
    prompt,
    answer: answerWords,
    words: shuffle([...words, ...extras]),
    source: 'word-bank',
  });
}

export function makeFillBlankQuestion({ sentence, context, phase = PRACTICE_PHASES.GUIDED_PRODUCTION }) {
  const words = splitPracticeWords(sentence);
  const target = words.find((word) => word.length >= 4 && !/this|that|with|from|they|have|does|your|what/i.test(word));
  if (!target) return null;
  return createQuestion({
    skill: context.skill,
    phase,
    type: QUESTION_TYPES.FILL_BLANK,
    title: 'Complete a frase',
    prompt: words.map((word) => word === target ? '____' : word).join(' '),
    answer: target,
    options: makeWordOptions(target, context),
    source: 'fill-blank',
  });
}

export function makeCorrectionQuestion({ sentence, context, phase = PRACTICE_PHASES.GUIDED_PRODUCTION }) {
  const clean = cleanPracticeText(sentence).replace(/[.!?]$/, '');
  if (clean.length < 8 || clean.length > 62) return null;
  const wrong = clean
    .replace(/Ana/i, 'Anna')
    .replace(/alphabet/i, 'alfabet')
    .replace(/letter/i, 'leter')
    .replace(/English/i, 'Inglish')
    .replace(/name/i, 'nane')
    .replace(/morning/i, 'mornin');
  if (wrong === clean) return null;
  return createQuestion({
    skill: context.skill,
    phase,
    type: QUESTION_TYPES.CORRECTION,
    title: 'Corrija a frase',
    prompt: wrong,
    answer: clean,
    source: 'correction',
  });
}

export function makeVocabularyQuestions(context, limit = 6) {
  return context.vocabulary.slice(0, limit).map((item) => {
    if (!item.word || !item.meaning) return null;
    if (!isCompactOption(item.meaning, 4, 34)) return null;
    return createQuestion({
      skill: context.skill,
      phase: PRACTICE_PHASES.WARMUP,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      title: 'Vocabulário da aula',
      prompt: `O que significa “${item.word}”?`,
      answer: item.meaning,
      options: makeMeaningOptions(item.meaning, context.vocabulary),
      source: item.id,
    });
  }).filter(Boolean);
}

export function makeExistingExerciseQuestions(context, phase = PRACTICE_PHASES.COMPREHENSION) {
  return context.exercises.map((exercise) => {
    const personal = /your|seu|sua|resposta pessoal|fale sobre você|about you/i.test(`${exercise.prompt} ${exercise.answer}`);
    if (personal) {
      return createQuestion({
        skill: context.skill,
        phase: PRACTICE_PHASES.WRITING,
        type: QUESTION_TYPES.WRITE_SHORT,
        title: 'Responda em inglês',
        prompt: translatePromptToPortuguese(exercise.prompt),
        answer: exercise.answer,
        source: exercise.id,
      });
    }
    const options = exercise.options?.length ? exercise.options : makeSentenceOptions(exercise.answer, context);
    if (!isCompactOption(exercise.answer, 8, 62) || options.length < 2) return null;
    return createQuestion({
      skill: context.skill,
      phase,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      title: 'Escolha a melhor resposta',
      prompt: translatePromptToPortuguese(exercise.prompt),
      answer: exercise.answer,
      options,
      source: exercise.id,
    });
  }).filter(Boolean);
}
