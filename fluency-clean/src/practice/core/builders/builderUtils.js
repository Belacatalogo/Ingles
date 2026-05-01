import { PRACTICE_PHASES, QUESTION_TYPES } from '../PracticeTypes.js';
import { cleanPracticeText, detectAnswerKind, normalizePracticeText, splitPracticeWords } from '../PracticeNormalizer.js';

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
  ]).filter((item) => item.length >= 3);
  const distractors = shuffle(pool).filter((item) => normalizePracticeText(item) !== normalizePracticeText(answer)).slice(0, 3);
  return shuffle(unique([answer, ...distractors]).slice(0, 4));
}

export function makeSentenceOptions(answer, context, extra = []) {
  const pool = unique([answer, ...context.sentences, ...extra]).filter((sentence) => sentence.length <= 88);
  const distractors = shuffle(pool).filter((item) => normalizePracticeText(item) !== normalizePracticeText(answer)).slice(0, 3);
  return shuffle(unique([answer, ...distractors]).slice(0, 4));
}

export function makeMeaningOptions(answer, vocabulary) {
  const pool = unique([answer, ...vocabulary.map((item) => item.meaning), 'palavra', 'frase', 'pergunta', 'som']).filter(Boolean);
  const distractors = shuffle(pool).filter((item) => normalizePracticeText(item) !== normalizePracticeText(answer)).slice(0, 3);
  return shuffle(unique([answer, ...distractors]).slice(0, 4));
}

export function makeWordBankQuestion({ sentence, context, phase = PRACTICE_PHASES.GUIDED_PRODUCTION, prompt = 'Monte a frase em inglês.' }) {
  const words = splitPracticeWords(sentence);
  if (words.length < 3 || words.length > 9) return null;
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
  if (clean.length < 8) return null;
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
    return createQuestion({
      skill: context.skill,
      phase,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      title: 'Escolha a melhor resposta',
      prompt: translatePromptToPortuguese(exercise.prompt),
      answer: exercise.answer,
      options: exercise.options?.length ? exercise.options : makeSentenceOptions(exercise.answer, context),
      source: exercise.id,
    });
  });
}
