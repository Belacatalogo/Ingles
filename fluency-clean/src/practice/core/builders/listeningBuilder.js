import { getListeningLevelPolicy, LISTENING_SKILLS, normalizeListeningLevel } from '../../../listening/listeningLevelPolicy.js';
import { pullSrsReviewItems, SRS_ITEM_TYPES } from '../../../services/practiceSrsExtended.js';
import { splitPracticeWords } from '../PracticeNormalizer.js';
import { PRACTICE_PHASES, QUESTION_TYPES } from '../PracticeTypes.js';
import { createQuestion, getA1DictationUnits, makeSentenceOptions, makeVocabularyQuestions, makeWordOptions, unique } from './builderUtils.js';

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function getListeningQuestions(context) {
  const rawQuestions = Array.isArray(context.raw?.listeningQuestions) ? context.raw.listeningQuestions : [];
  const exerciseQuestions = Array.isArray(context.exercises) ? context.exercises : [];
  return [...rawQuestions, ...exerciseQuestions]
    .map((item, index) => ({
      id: item?.id || `listening-question-${index + 1}`,
      skill: clean(item?.skill || item?.listeningSkillTag || LISTENING_SKILLS.DETAIL),
      prompt: clean(item?.question || item?.prompt || item?.instruction || ''),
      answer: clean(item?.answer || item?.correctAnswer || item?.expectedAnswer || ''),
      options: Array.isArray(item?.options || item?.choices || item?.alternatives)
        ? (item.options || item.choices || item.alternatives).map(clean).filter(Boolean)
        : [],
      audioText: clean(item?.audioText || item?.audioEvidence || item?.evidence || ''),
      explanation: clean(item?.explanation || item?.feedback || item?.audioEvidence || ''),
    }))
    .filter((item) => item.prompt && item.answer);
}

function getShadowingLines(context, policy, shortSentences) {
  const fromLesson = Array.isArray(context.raw?.shadowingLines)
    ? context.raw.shadowingLines
    : Array.isArray(context.raw?.shadowing_lines)
      ? context.raw.shadowing_lines
      : [];
  return unique([...fromLesson, ...shortSentences])
    .map(clean)
    .filter(Boolean)
    .filter((line) => splitPracticeWords(line).length <= policy.shadowingMaxWords)
    .slice(0, 8);
}

function getDictationItems(context, policy, shortSentences) {
  const fromLesson = Array.isArray(context.raw?.dictationItems)
    ? context.raw.dictationItems
    : Array.isArray(context.raw?.dictation_items)
      ? context.raw.dictation_items
      : [];
  const fallback = normalizeListeningLevel(context.level) === 'A1'
    ? getA1DictationUnits(context, 6)
    : shortSentences;
  return unique([...fromLesson, ...fallback])
    .map(clean)
    .filter(Boolean)
    .filter((item) => splitPracticeWords(item).length <= policy.dictationMaxWords)
    .slice(0, 8);
}

function makeWarmupAudioVocabularyQuestions(context, policy) {
  return makeVocabularyQuestions(context, policy.level === 'A1' ? 4 : 3)
    .map((question) => {
      const vocab = context.vocabulary.find((item) => clean(item.meaning) === clean(question.answer) || clean(item.word) === clean(question.prompt).replace(/[“”]/g, '').trim());
      const audioText = clean(vocab?.audioText || vocab?.word || question.vocabTagLabel || question.prompt.replace(/^O que significa\s*/i, '').replace(/[“”"?]/g, ''));
      if (!audioText || !question.answer) return null;
      return {
        ...question,
        phase: PRACTICE_PHASES.WARMUP,
        type: QUESTION_TYPES.AUDIO_CHOICE,
        title: 'Ouça a palavra',
        prompt: 'Ouça e escolha o significado correto.',
        audioText,
        listeningSkillTag: LISTENING_SKILLS.DETAIL,
        source: 'listening-vocab-warmup',
      };
    })
    .filter(Boolean);
}

function makeDictationQuestion(text, context, policy) {
  const unit = clean(text);
  const wordCount = splitPracticeWords(unit).length;
  if (wordCount > policy.dictationMaxWords) return null;
  if (!unit || unit.length < 3) return null;
  return createQuestion({
    skill: context.skill,
    phase: PRACTICE_PHASES.GUIDED_PRODUCTION,
    type: QUESTION_TYPES.DICTATION,
    title: wordCount <= 2 ? 'Escreva o que ouviu' : 'Escreva a frase que ouviu',
    prompt: wordCount <= 2 ? 'Ouça e escreva a palavra.' : 'Ouça e escreva a frase.',
    answer: unit,
    audioText: unit,
    listeningSkillTag: LISTENING_SKILLS.DICTATION,
    source: 'dictation-practice',
  });
}

function makeShadowingQuestion(line, context, policy) {
  const unit = clean(line);
  const words = splitPracticeWords(unit);
  if (words.length > policy.shadowingMaxWords) return null;
  if (!unit || unit.length < 4) return null;
  return createQuestion({
    skill: context.skill,
    phase: PRACTICE_PHASES.SPEAKING,
    type: QUESTION_TYPES.SPEAK_RESPONSE,
    title: 'Repita em voz alta',
    prompt: unit,
    answer: unit,
    audioText: unit,
    listeningSkillTag: LISTENING_SKILLS.SHADOWING,
    source: 'shadowing',
  });
}

function makeAudioChoiceQuestion(unit, context) {
  const cleanUnit = clean(unit);
  const words = splitPracticeWords(cleanUnit).filter((word) => word.length >= 2);
  const answer = words.find((word) => context.keywords.includes(word.toLowerCase())) || words[0] || cleanUnit;
  if (!answer) return null;
  return createQuestion({
    skill: context.skill,
    phase: PRACTICE_PHASES.RECOGNITION,
    type: QUESTION_TYPES.AUDIO_CHOICE,
    title: 'O que você escutou?',
    prompt: 'Ouça e escolha a palavra correta.',
    answer,
    audioText: answer,
    options: makeWordOptions(answer, context),
    listeningSkillTag: LISTENING_SKILLS.DETAIL,
    source: 'listening-recognition',
  });
}

function makeComprehensionQuestion(exercise, context) {
  const answer = clean(exercise.answer);
  const prompt = clean(exercise.prompt);
  const audioText = clean(exercise.audioText || exercise.audioEvidence || exercise.evidence || context.sentences[0] || context.transcript?.[0] || answer);
  if (!answer || !prompt || !audioText) return null;
  return createQuestion({
    skill: context.skill,
    phase: PRACTICE_PHASES.COMPREHENSION,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    title: 'Compreensão do áudio',
    prompt,
    answer,
    options: exercise.options?.length ? exercise.options : makeSentenceOptions(answer, context),
    audioText,
    explanation: exercise.explanation || '',
    listeningSkillTag: exercise.skill || LISTENING_SKILLS.DETAIL,
    source: exercise.id || 'listening-comprehension',
  });
}

function makeSrsListeningReviews(context) {
  const seeds = [
    ...(Array.isArray(context.reviewSeeds) ? context.reviewSeeds : []),
    ...pullSrsReviewItems({ skill: 'listening', level: context.level, limit: 3 }),
  ].filter((seed) => seed?.srsItem?.type === SRS_ITEM_TYPES.LISTENING_PATTERN);

  return seeds.map((seed) => {
    const text = clean(seed.srsItem.content || seed.srsItem.label || '');
    if (!text) return null;
    const question = createQuestion({
      skill: context.skill,
      phase: PRACTICE_PHASES.REVIEW,
      type: QUESTION_TYPES.AUDIO_CHOICE,
      title: `Revisão: ${seed.srsItem.label || 'escuta'}`,
      prompt: 'Ouça e escolha a resposta correta.',
      answer: text,
      audioText: text,
      options: makeWordOptions(text, context),
      isReview: true,
      listeningSkillTag: seed.srsItem.content || LISTENING_SKILLS.DETAIL,
      source: `srs-review-listening::${seed.srsItem.key}`,
    });
    return { ...question, srsKey: seed.srsItem.key };
  }).filter(Boolean);
}

function hasAudioText(question) {
  return Boolean(clean(question?.audioText));
}

function dedupeQuestions(questions) {
  const seen = new Set();
  return questions.filter((question) => {
    if (!question || !hasAudioText(question)) return false;
    const key = `${question.phase}:${question.type}:${question.prompt}:${question.answer}:${question.audioText}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function buildListeningPractice(context) {
  const policy = getListeningLevelPolicy(context.level || 'A1');
  const sentences = context.sentences.filter((sentence) => sentence.length >= 4);
  const shortSentences = sentences.filter((sentence) => splitPracticeWords(sentence).length <= policy.dictationMaxWords + 2);
  const shadowingLines = getShadowingLines(context, policy, shortSentences);
  const dictationItems = getDictationItems(context, policy, shortSentences);
  const questions = [];

  // WARMUP — vocabulário com áudio antes da compreensão
  questions.push(...makeWarmupAudioVocabularyQuestions(context, policy));

  // RECOGNITION — audio_choice com palavras/frases do áudio
  const recognitionSources = policy.level === 'A1'
    ? unique([...context.keywords.slice(0, 6), ...getA1DictationUnits(context, 6)])
    : unique([...sentences.slice(0, 5), ...context.keywords.slice(0, 3)]);
  recognitionSources.forEach((unit) => {
    const q = makeAudioChoiceQuestion(unit, context);
    if (q) questions.push(q);
  });

  // COMPREHENSION — multiple_choice baseado nas questões da IA
  getListeningQuestions(context).slice(0, 4).forEach((exercise) => {
    const q = makeComprehensionQuestion(exercise, context);
    if (q) questions.push(q);
  });

  // GUIDED_PRODUCTION — ditado respeitando policy.dictationMaxWords
  dictationItems.slice(0, 4).forEach((item) => {
    const q = makeDictationQuestion(item, context, policy);
    if (q) questions.push(q);
  });

  // SPEAKING — shadowing com frases limitadas pela policy
  shadowingLines.slice(0, policy.level === 'A1' ? 3 : 4).forEach((line) => {
    const q = makeShadowingQuestion(line, context, policy);
    if (q) questions.push(q);
  });

  // REVIEW — SRS de padrões fracos de escuta
  questions.push(...makeSrsListeningReviews(context).slice(0, 2));

  return dedupeQuestions(questions);
}
