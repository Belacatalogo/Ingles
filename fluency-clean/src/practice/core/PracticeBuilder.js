import { DEFAULT_PRACTICE_LIMITS, PRACTICE_PHASES, QUESTION_TYPES, SKILL_PHASE_PLAN } from './PracticeTypes.js';
import { cleanPracticeText, detectAnswerKind, normalizeLessonForPractice, splitPracticeWords } from './PracticeNormalizer.js';
import { filterPracticeQuestions } from './PracticeQualityGate.js';

function makeId(parts) {
  return parts.map((part) => cleanPracticeText(part).toLowerCase().replace(/[^a-z0-9]+/g, '-')).join('-').replace(/^-|-$/g, '').slice(0, 96);
}

function unique(values) {
  const seen = new Set();
  return values.map(cleanPracticeText).filter(Boolean).filter((value) => {
    const key = value.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function shuffle(values) {
  return [...values].map((value) => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map((item) => item.value);
}

function createQuestion(base) {
  return {
    id: base.id || makeId([base.phase, base.type, base.prompt, base.answer]),
    phase: base.phase,
    type: base.type,
    title: base.title,
    prompt: cleanPracticeText(base.prompt),
    answer: cleanPracticeText(base.answer),
    answerKind: base.answerKind || detectAnswerKind(base.answer),
    options: Array.isArray(base.options) ? unique(base.options) : [],
    words: Array.isArray(base.words) ? unique(base.words) : [],
    audioText: cleanPracticeText(base.audioText || ''),
    explanation: cleanPracticeText(base.explanation || ''),
    skill: base.skill,
    source: base.source || 'builder',
  };
}

function wordOptions(answer, context) {
  const pool = unique([answer, ...context.keywords, 'apple', 'book', 'cat', 'name', 'letter', 'sound', 'listen', 'repeat']);
  return shuffle(pool.filter((word) => word.length >= 3).slice(0, 8)).filter((word) => word.toLowerCase() !== answer.toLowerCase()).slice(0, 3).concat(answer);
}

function sentenceOptions(answer, context) {
  const pool = unique([answer, ...context.sentences]).filter((sentence) => sentence.length <= 90);
  return shuffle(pool).slice(0, 4);
}

function buildFromExercises(context) {
  return context.exercises.map((exercise) => {
    const personal = /your|seu|sua|resposta pessoal|fale sobre você/i.test(`${exercise.prompt} ${exercise.answer}`);
    if (personal) {
      return createQuestion({
        phase: PRACTICE_PHASES.WRITING,
        type: QUESTION_TYPES.WRITE_SHORT,
        title: 'Responda em inglês',
        prompt: translatePrompt(exercise.prompt),
        answer: exercise.answer,
        skill: context.skill,
        source: exercise.id,
      });
    }
    const options = exercise.options?.length ? exercise.options : sentenceOptions(exercise.answer, context);
    return createQuestion({
      phase: PRACTICE_PHASES.COMPREHENSION,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      title: 'Escolha a melhor resposta',
      prompt: translatePrompt(exercise.prompt),
      answer: exercise.answer,
      options,
      skill: context.skill,
      source: exercise.id,
    });
  });
}

function translatePrompt(prompt) {
  const clean = cleanPracticeText(prompt);
  if (/what is .* practicing/i.test(clean)) return 'O que está sendo praticado no áudio?';
  if (/what do you hear/i.test(clean)) return 'O que você escutou?';
  if (/write/i.test(clean) && /name/i.test(clean)) return 'Escreva seu nome e soletre em inglês.';
  if (/complete/i.test(clean)) return clean.replace(/^complete:?\s*/i, 'Complete: ');
  return clean;
}

function buildVocabularyQuestions(context) {
  return context.vocabulary.slice(0, 8).map((item) => createQuestion({
    phase: PRACTICE_PHASES.WARMUP,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    title: 'Vocabulário da aula',
    prompt: `O que significa “${item.word}”?`,
    answer: item.meaning,
    options: unique([item.meaning, ...context.vocabulary.map((vocab) => vocab.meaning), 'palavra', 'frase', 'pergunta']).slice(0, 4),
    skill: context.skill,
    source: item.id,
  }));
}

function buildListeningQuestions(context) {
  const sentences = context.sentences.filter((sentence) => sentence.length >= 8);
  return [
    ...sentences.slice(0, 5).map((sentence) => {
      const words = splitPracticeWords(sentence).filter((word) => word.length >= 3);
      const answer = words.find((word) => context.keywords.includes(word.toLowerCase())) || words[0];
      if (!answer) return null;
      return createQuestion({
        phase: PRACTICE_PHASES.RECOGNITION,
        type: QUESTION_TYPES.AUDIO_CHOICE,
        title: 'O que você escutou?',
        prompt: 'Ouça e escolha a palavra correta.',
        answer,
        audioText: answer,
        options: wordOptions(answer, context),
        skill: context.skill,
        source: 'listening-word',
      });
    }),
    ...sentences.slice(0, 5).map((sentence) => createQuestion({
      phase: PRACTICE_PHASES.GUIDED_PRODUCTION,
      type: QUESTION_TYPES.DICTATION,
      title: 'Escute e escreva',
      prompt: 'Escreva a frase que você ouviu.',
      answer: sentence,
      audioText: sentence,
      skill: context.skill,
      source: 'dictation',
    })),
  ].filter(Boolean);
}

function buildProductionQuestions(context) {
  return context.sentences.filter((sentence) => sentence.length <= 90).slice(0, 8).flatMap((sentence) => {
    const words = splitPracticeWords(sentence);
    const target = words.find((word) => word.length >= 4);
    const wordBank = words.length >= 3 && words.length <= 9 ? createQuestion({
      phase: PRACTICE_PHASES.GUIDED_PRODUCTION,
      type: QUESTION_TYPES.WORD_BANK,
      title: 'Monte a frase',
      prompt: 'Monte a frase em inglês.',
      answer: words.join(' '),
      words: shuffle([...words, 'please', 'book', 'name'].slice(0, 12)),
      skill: context.skill,
      source: 'word-bank',
    }) : null;
    const fillBlank = target ? createQuestion({
      phase: PRACTICE_PHASES.GUIDED_PRODUCTION,
      type: QUESTION_TYPES.FILL_BLANK,
      title: 'Complete a frase',
      prompt: words.map((word) => word === target ? '____' : word).join(' '),
      answer: target,
      options: wordOptions(target, context),
      skill: context.skill,
      source: 'fill-blank',
    }) : null;
    return [wordBank, fillBlank].filter(Boolean);
  });
}

function buildSpeakingQuestions(context) {
  return context.sentences.filter((sentence) => sentence.length >= 6 && sentence.length <= 90).slice(0, 6).map((sentence) => createQuestion({
    phase: PRACTICE_PHASES.SPEAKING,
    type: QUESTION_TYPES.SPEAK_RESPONSE,
    title: 'Fale em voz alta',
    prompt: sentence,
    answer: sentence,
    audioText: sentence,
    skill: context.skill,
    source: 'speaking',
  }));
}

export function buildPracticePlan(lesson, options = {}) {
  const limits = { ...DEFAULT_PRACTICE_LIMITS, ...options };
  const context = normalizeLessonForPractice(lesson);
  const phasePlan = SKILL_PHASE_PLAN[context.skill] || SKILL_PHASE_PLAN.mixed || [];
  const candidates = [
    ...buildVocabularyQuestions(context),
    ...buildFromExercises(context),
    ...buildListeningQuestions(context),
    ...buildProductionQuestions(context),
    ...buildSpeakingQuestions(context),
  ];
  const { accepted, rejected } = filterPracticeQuestions(candidates, limits);
  const ordered = phasePlan.length
    ? accepted.sort((a, b) => phasePlan.indexOf(a.phase) - phasePlan.indexOf(b.phase))
    : accepted;
  const questions = ordered.slice(0, Math.min(limits.maxQuestions, Math.max(limits.minQuestions, ordered.length)));

  return {
    lessonId: context.id,
    title: context.title,
    skill: context.skill,
    level: context.level,
    phasePlan,
    questions,
    quality: {
      candidateCount: candidates.length,
      acceptedCount: accepted.length,
      rejectedCount: rejected.length,
      rejected,
    },
  };
}
