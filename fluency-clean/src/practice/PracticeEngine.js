const FALLBACK_TRANSCRIPT = [
  'Hi, I am Ana.',
  'I spell my name A-N-A.',
  'The first letter is A.',
  'I listen and repeat the sentence.',
];

function cleanText(value) {
  return String(value ?? '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function normalizeForPractice(value) {
  return cleanText(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function unique(values) {
  const seen = new Set();
  return values.map(cleanText).filter(Boolean).filter((value) => {
    const key = normalizeForPractice(value);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function splitSentences(value) {
  const clean = cleanText(value);
  if (!clean) return [];
  const paragraphs = clean.split(/\n\s*\n+/).map((item) => item.trim()).filter(Boolean);
  const source = paragraphs.length > 1 ? paragraphs : clean.split(/(?<=[.!?])\s+/);
  return source.map((item) => cleanText(item)).filter((item) => item.length >= 4);
}

function getTranscript(lesson) {
  const fromListening = splitSentences(lesson?.listeningText);
  if (fromListening.length) return fromListening;
  const fromSections = Array.isArray(lesson?.sections)
    ? lesson.sections.flatMap((section) => splitSentences(`${section?.title || ''}. ${section?.content || ''}`))
    : [];
  return fromSections.length ? fromSections.slice(0, 12) : FALLBACK_TRANSCRIPT;
}

function getVocabulary(lesson) {
  return Array.isArray(lesson?.vocabulary)
    ? lesson.vocabulary.map((item) => ({
      word: cleanText(item?.word || item?.term),
      meaning: cleanText(item?.meaning || item?.translation || item?.definition),
      example: cleanText(item?.example || item?.sentence),
    })).filter((item) => item.word || item.meaning)
    : [];
}

function getExercises(lesson) {
  return Array.isArray(lesson?.exercises)
    ? lesson.exercises.map((item, index) => ({
      question: cleanText(item?.question || item?.prompt || item?.instruction || `Question ${index + 1}`),
      answer: cleanText(item?.answer || item?.expectedAnswer || item?.correctAnswer || item?.solution || ''),
      options: Array.isArray(item?.options || item?.choices || item?.alternatives)
        ? (item.options || item.choices || item.alternatives).map(cleanText).filter(Boolean)
        : [],
    })).filter((item) => item.question && item.answer)
    : [];
}

function optionQuality(options) {
  const clean = unique(options);
  if (clean.length < 3) return false;
  const weak = clean.filter((option) => option.length <= 2).length;
  return weak < Math.ceil(clean.length * 0.5);
}

function distractorsFor(answer, pool, fallback = []) {
  const key = normalizeForPractice(answer);
  return unique([...pool, ...fallback]).filter((item) => normalizeForPractice(item) !== key && item.length > 2).slice(0, 3);
}

function shuffle(values) {
  return [...values].map((value) => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map((item) => item.value);
}

function wordsFromSentence(sentence) {
  return cleanText(sentence).replace(/[.!?]/g, '').split(/\s+/).filter((word) => word.length > 0).slice(0, 9);
}

function makeChoice(exercise, exercises) {
  const pool = exercises.map((item) => item.answer).filter(Boolean);
  const fallback = ['She is listening.', 'She is spelling a name.', 'She is reading a story.', 'She is writing numbers.'];
  const options = optionQuality(exercise.options)
    ? exercise.options
    : [exercise.answer, ...distractorsFor(exercise.answer, pool, fallback)];
  if (!optionQuality(options)) return null;
  return {
    id: `choice-${exercise.question}`,
    type: 'choice',
    title: 'Escolha a resposta correta',
    prompt: exercise.question,
    answer: exercise.answer,
    options: shuffle(unique(options).slice(0, 4)),
  };
}

function makeListenChoice(sentence, transcript) {
  const answer = cleanText(sentence);
  const shortAnswer = wordsFromSentence(answer).find((word) => word.length >= 3) || answer;
  const pool = transcript.flatMap(wordsFromSentence).filter((word) => word.length >= 3);
  const options = unique([shortAnswer, ...distractorsFor(shortAnswer, pool, ['name', 'letter', 'sound', 'apple', 'book'])]).slice(0, 4);
  if (options.length < 3) return null;
  return {
    id: `listen-choice-${answer}`,
    type: 'listenChoice',
    title: 'O que você escuta?',
    prompt: 'Toque no áudio e escolha a palavra correta.',
    answer: shortAnswer,
    audioText: shortAnswer,
    options: shuffle(options),
  };
}

function makeDictation(sentence) {
  const answer = cleanText(sentence);
  if (answer.length < 8) return null;
  return {
    id: `dictation-${answer}`,
    type: 'dictation',
    title: 'Escute e escreva',
    prompt: 'Escreva o que você ouviu.',
    answer,
    audioText: answer,
  };
}

function makeWordBank(sentence) {
  const answerWords = wordsFromSentence(sentence);
  if (answerWords.length < 3) return null;
  const answer = answerWords.join(' ');
  const extra = ['please', 'book', 'name', 'letter', 'morning', 'English'].filter((word) => !answerWords.map((w) => w.toLowerCase()).includes(word.toLowerCase())).slice(0, 3);
  return {
    id: `word-bank-${answer}`,
    type: 'wordBank',
    title: 'Monte a frase',
    prompt: answer,
    answer,
    words: shuffle([...answerWords, ...extra]),
  };
}

function makeFillBlank(sentence) {
  const words = wordsFromSentence(sentence);
  const targetIndex = words.findIndex((word) => word.length >= 4);
  if (targetIndex < 0) return null;
  const answer = words[targetIndex];
  const prompt = words.map((word, index) => (index === targetIndex ? '____' : word)).join(' ');
  const options = unique([answer, 'book', 'name', 'letter', 'morning', 'sound']).filter((item) => normalizeForPractice(item) !== '').slice(0, 4);
  if (options.length < 3) return null;
  return {
    id: `fill-${sentence}`,
    type: 'fillBlank',
    title: 'Complete o espaço vazio',
    prompt,
    answer,
    options: shuffle(options),
  };
}

function makeCorrection(sentence) {
  const clean = cleanText(sentence).replace(/[.!?]$/, '');
  if (clean.length < 8) return null;
  const wrong = clean
    .replace(/Ana/i, 'Anna')
    .replace(/alphabet/i, 'alfabet')
    .replace(/letter/i, 'leter')
    .replace(/English/i, 'Inglish')
    .replace(/name/i, 'nane');
  if (wrong === clean) return null;
  return {
    id: `correction-${clean}`,
    type: 'correction',
    title: 'Corrija a frase',
    prompt: wrong,
    answer: clean,
  };
}

function makeVocabularyChoice(vocab, vocabulary) {
  if (!vocab?.word || !vocab?.meaning) return null;
  const options = unique([vocab.meaning, ...distractorsFor(vocab.meaning, vocabulary.map((item) => item.meaning), ['pergunta', 'resposta', 'letra', 'som'])]).slice(0, 4);
  if (options.length < 3) return null;
  return {
    id: `vocab-${vocab.word}`,
    type: 'choice',
    title: 'Vocabulário',
    prompt: `O que significa “${vocab.word}”?`,
    answer: vocab.meaning,
    options: shuffle(options),
  };
}

function makeSpeak(sentence) {
  const answer = cleanText(sentence);
  if (answer.length < 6) return null;
  return {
    id: `speak-${answer}`,
    type: 'speak',
    title: 'Fale em voz alta',
    prompt: answer,
    answer,
  };
}

function hasGoodQuestion(item) {
  if (!item?.type || !item?.answer || !item?.prompt) return false;
  if ((item.type === 'choice' || item.type === 'listenChoice' || item.type === 'fillBlank') && !optionQuality(item.options)) return false;
  if (normalizeForPractice(item.answer).length < 1) return false;
  return true;
}

export function buildPracticeItems(lesson, { min = 12, max = 28 } = {}) {
  const type = String(lesson?.type || 'listening').toLowerCase();
  const transcript = getTranscript(lesson);
  const vocabulary = getVocabulary(lesson);
  const exercises = getExercises(lesson);
  const items = [];

  exercises.forEach((exercise) => items.push(makeChoice(exercise, exercises)));
  transcript.slice(0, 8).forEach((sentence) => items.push(makeDictation(sentence)));
  transcript.slice(0, 8).forEach((sentence) => items.push(makeListenChoice(sentence, transcript)));
  vocabulary.slice(0, 10).forEach((vocab) => items.push(makeVocabularyChoice(vocab, vocabulary)));
  transcript.slice(0, 8).forEach((sentence) => items.push(makeWordBank(sentence)));
  transcript.slice(0, 8).forEach((sentence) => items.push(makeFillBlank(sentence)));
  transcript.slice(0, 6).forEach((sentence) => items.push(makeCorrection(sentence)));
  transcript.slice(0, 5).forEach((sentence) => items.push(makeSpeak(sentence)));

  const filtered = uniqueById(items.filter(hasGoodQuestion));
  const target = Math.min(max, Math.max(min, Math.ceil(transcript.length * 2.2 + vocabulary.length * 0.8 + exercises.length)));
  const selected = filtered.slice(0, Math.min(target, filtered.length));

  if (selected.length >= min || type !== 'listening') return selected;
  return selected.length ? selected : [makeDictation(transcript[0]), makeWordBank(transcript[1] || transcript[0]), makeFillBlank(transcript[2] || transcript[0])].filter(hasGoodQuestion);
}

function uniqueById(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.type}:${normalizeForPractice(item.answer)}:${normalizeForPractice(item.prompt)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function evaluatePracticeAnswer(item, value) {
  const user = normalizeForPractice(Array.isArray(value) ? value.join(' ') : value);
  const expected = normalizeForPractice(item?.answer);
  if (!user || !expected) return { correct: false, retryable: false, empty: true, hintWord: '' };
  if (item.type === 'choice' || item.type === 'listenChoice' || item.type === 'fillBlank') {
    return { correct: user === expected, retryable: false, hintWord: '' };
  }
  if (user === expected) return { correct: true, retryable: false, hintWord: '' };

  const distance = levenshtein(user, expected);
  const ratio = 1 - distance / Math.max(user.length, expected.length, 1);
  const expectedWords = expected.split(' ').filter(Boolean);
  const userWords = user.split(' ').filter(Boolean);
  const closeWords = expectedWords.filter((word, index) => word === userWords[index] || (word.length > 3 && levenshtein(word, userWords[index] || '') <= 1)).length;
  const retryable = ratio >= 0.80 || distance <= 3 || (expectedWords.length > 2 && closeWords / expectedWords.length >= 0.70);
  return { correct: false, retryable, hintWord: findWeakWord(expected, user) };
}

function findWeakWord(expected, user) {
  const expectedWords = expected.split(' ').filter(Boolean);
  const userWords = user.split(' ').filter(Boolean);
  return expectedWords.find((word, index) => word.length > 2 && word !== userWords[index] && !userWords.includes(word)) || expectedWords.find((word) => word.length > 3) || '';
}

function levenshtein(a, b) {
  const left = normalizeForPractice(a);
  const right = normalizeForPractice(b);
  const matrix = Array.from({ length: left.length + 1 }, () => Array(right.length + 1).fill(0));
  for (let i = 0; i <= left.length; i += 1) matrix[i][0] = i;
  for (let j = 0; j <= right.length; j += 1) matrix[0][j] = j;
  for (let i = 1; i <= left.length; i += 1) {
    for (let j = 1; j <= right.length; j += 1) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
    }
  }
  return matrix[left.length][right.length];
}
