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

function wordsFromSentence(sentence) {
  return cleanText(sentence).replace(/[.!?]/g, '').split(/\s+/).filter((word) => word.length > 0).slice(0, 9);
}

function answerKind(value) {
  const text = cleanText(value);
  const normalized = normalizeForPractice(text);
  const words = normalized.split(' ').filter(Boolean);
  if (/^(true|false)$/i.test(text)) return 'boolean';
  if (/^[a-z](?:-[a-z]){1,}\.?$/i.test(text) || /^[a-z](?:\s*-\s*[a-z]){1,}\.?$/i.test(text)) return 'spelling';
  if (words.length === 1) return 'word';
  if (words.length <= 4 && text.length <= 28) return 'shortPhrase';
  if (/resposta pessoal|example:|exemplo:|your name|seu nome/i.test(text)) return 'personal';
  return 'sentence';
}

function isPersonalQuestion(question, answer) {
  return /your name|seu nome|your answer|resposta pessoal|about you|sobre você|fale sobre você|write your/i.test(`${question} ${answer}`);
}

function sameKindOptions(answer, options) {
  const kind = answerKind(answer);
  return unique(options).filter((option) => {
    const optionKind = answerKind(option);
    if (kind === 'spelling') return optionKind === 'spelling';
    if (kind === 'boolean') return optionKind === 'boolean';
    if (kind === 'word') return optionKind === 'word';
    if (kind === 'shortPhrase') return optionKind === 'shortPhrase' || optionKind === 'word';
    if (kind === 'sentence') return optionKind === 'sentence' || optionKind === 'shortPhrase';
    return false;
  });
}

function optionQuality(options, answer = '') {
  const clean = unique(options);
  if (clean.length < 3) return false;
  const weak = clean.filter((option) => option.length <= 2).length;
  if (weak >= Math.ceil(clean.length * 0.5)) return false;
  if (!answer) return true;
  const sameKind = sameKindOptions(answer, clean);
  return sameKind.length >= 3;
}

function distractorsFor(answer, pool, fallback = []) {
  const key = normalizeForPractice(answer);
  return sameKindOptions(answer, unique([...pool, ...fallback]))
    .filter((item) => normalizeForPractice(item) !== key && item.length > 1)
    .slice(0, 3);
}

function shuffle(values) {
  return [...values].map((value) => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map((item) => item.value);
}

function spellingDistractors(answer) {
  const clean = cleanText(answer).replace(/\.$/, '');
  const compact = clean.replace(/\s+/g, '');
  const letters = compact.split('-').filter(Boolean);
  if (letters.length < 2) return [];
  const swapped = [...letters];
  if (swapped.length > 1) [swapped[0], swapped[1]] = [swapped[1], swapped[0]];
  const changed = letters.map((letter, index) => index === letters.length - 1 ? 'E' : letter);
  return unique([swapped.join('-') + '.', changed.join('-') + '.', letters.slice().reverse().join('-') + '.']).filter((item) => normalizeForPractice(item) !== normalizeForPractice(answer));
}

function wordDistractors(answer, transcript, vocabulary) {
  const pool = [
    ...transcript.flatMap(wordsFromSentence),
    ...vocabulary.map((item) => item.word),
    'book', 'name', 'letter', 'sound', 'apple', 'alphabet', 'morning', 'English', 'listen', 'repeat',
  ];
  return distractorsFor(answer, pool);
}

function sentenceDistractors(answer, transcript) {
  const fallback = [
    'She is listening to a short audio.',
    'She is spelling her name.',
    'She is practicing the alphabet.',
    'She is writing three words.',
  ];
  return distractorsFor(answer, transcript, fallback);
}

function makeChoice(exercise, exercises, transcript, vocabulary) {
  if (isPersonalQuestion(exercise.question, exercise.answer)) return makeWrite(exercise);
  const kind = answerKind(exercise.answer);
  if (kind === 'personal') return makeWrite(exercise);
  const pool = exercises.map((item) => item.answer).filter(Boolean);
  let fallback = [];
  if (kind === 'spelling') fallback = spellingDistractors(exercise.answer);
  else if (kind === 'word') fallback = wordDistractors(exercise.answer, transcript, vocabulary);
  else if (kind === 'boolean') fallback = ['True', 'False'];
  else fallback = sentenceDistractors(exercise.answer, transcript);
  const rawOptions = optionQuality(exercise.options, exercise.answer)
    ? exercise.options
    : [exercise.answer, ...distractorsFor(exercise.answer, pool, fallback)];
  const options = sameKindOptions(exercise.answer, rawOptions).slice(0, 4);
  if (!optionQuality(options, exercise.answer)) return makeWrite(exercise);
  return {
    id: `choice-${exercise.question}`,
    type: 'choice',
    title: 'Escolha a resposta correta',
    prompt: exercise.question,
    answer: exercise.answer,
    options: shuffle(options),
  };
}

function makeWrite(exercise) {
  return {
    id: `write-${exercise.question}`,
    type: 'write',
    title: 'Escreva a resposta',
    prompt: exercise.question,
    answer: exercise.answer,
  };
}

function makeListenChoice(sentence, transcript, vocabulary) {
  const words = wordsFromSentence(sentence).filter((word) => word.length >= 3);
  const shortAnswer = words.find((word) => /apple|book|name|letter|sound|spell|alphabet|listen|repeat|english/i.test(word)) || words[0];
  if (!shortAnswer) return null;
  const options = unique([shortAnswer, ...wordDistractors(shortAnswer, transcript, vocabulary)]).slice(0, 4);
  if (!optionQuality(options, shortAnswer)) return null;
  return {
    id: `listen-choice-${sentence}-${shortAnswer}`,
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
  if (answerWords.length < 3 || answerWords.length > 9) return null;
  const answer = answerWords.join(' ');
  const extras = ['please', 'book', 'name', 'letter', 'morning', 'English'].filter((word) => !answerWords.map((w) => w.toLowerCase()).includes(word.toLowerCase())).slice(0, 3);
  return {
    id: `word-bank-${answer}`,
    type: 'wordBank',
    title: 'Monte a frase',
    prompt: 'Monte a frase correta.',
    answer,
    words: shuffle([...answerWords, ...extras]),
  };
}

function makeFillBlank(sentence, transcript, vocabulary) {
  const words = wordsFromSentence(sentence);
  const targetIndex = words.findIndex((word) => word.length >= 4 && !/this|that|with|from|they|have|does|your/i.test(word));
  if (targetIndex < 0) return null;
  const answer = words[targetIndex];
  const prompt = words.map((word, index) => (index === targetIndex ? '____' : word)).join(' ');
  const options = unique([answer, ...wordDistractors(answer, transcript, vocabulary)]).slice(0, 4);
  if (!optionQuality(options, answer)) return null;
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
  if (!optionQuality(options, vocab.meaning)) return null;
  return {
    id: `vocab-${vocab.word}`,
    type: 'choice',
    title: 'Vocabulário',
    prompt: `O que significa “${vocab.word}”?`,
    answer: vocab.meaning,
    options: shuffle(options),
  };
}

function makeTrueFalseFromSentence(sentence) {
  const lower = normalizeForPractice(sentence);
  if (lower.includes('apple')) {
    return { id: `tf-apple-${sentence}`, type: 'choice', title: 'Certo ou errado?', prompt: 'Apple starts with A.', answer: 'True', options: ['True', 'False'] };
  }
  if (lower.includes('ana')) {
    return { id: `tf-ana-${sentence}`, type: 'choice', title: 'Certo ou errado?', prompt: 'Ana starts with A.', answer: 'True', options: ['True', 'False'] };
  }
  return null;
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
  if ((item.type === 'choice' || item.type === 'listenChoice' || item.type === 'fillBlank') && !optionQuality(item.options, item.answer)) return false;
  if (item.type === 'choice' && isPersonalQuestion(item.prompt, item.answer)) return false;
  if (normalizeForPractice(item.answer).length < 1) return false;
  return true;
}

export function buildPracticeItems(lesson, { min = 12, max = 28 } = {}) {
  const type = String(lesson?.type || 'listening').toLowerCase();
  const transcript = getTranscript(lesson);
  const vocabulary = getVocabulary(lesson);
  const exercises = getExercises(lesson);
  const items = [];

  exercises.forEach((exercise) => items.push(makeChoice(exercise, exercises, transcript, vocabulary)));
  transcript.slice(0, 8).forEach((sentence) => items.push(makeDictation(sentence)));
  transcript.slice(0, 8).forEach((sentence) => items.push(makeListenChoice(sentence, transcript, vocabulary)));
  vocabulary.slice(0, 10).forEach((vocab) => items.push(makeVocabularyChoice(vocab, vocabulary)));
  transcript.slice(0, 8).forEach((sentence) => items.push(makeWordBank(sentence)));
  transcript.slice(0, 8).forEach((sentence) => items.push(makeFillBlank(sentence, transcript, vocabulary)));
  transcript.slice(0, 6).forEach((sentence) => items.push(makeCorrection(sentence)));
  transcript.slice(0, 6).forEach((sentence) => items.push(makeTrueFalseFromSentence(sentence)));
  transcript.slice(0, 5).forEach((sentence) => items.push(makeSpeak(sentence)));

  const filtered = uniqueById(items.filter(hasGoodQuestion));
  const target = Math.min(max, Math.max(min, Math.ceil(transcript.length * 2.2 + vocabulary.length * 0.8 + exercises.length)));
  const selected = filtered.slice(0, Math.min(target, filtered.length));

  if (selected.length >= min || type !== 'listening') return selected;
  return selected.length ? selected : [makeDictation(transcript[0]), makeWordBank(transcript[1] || transcript[0]), makeFillBlank(transcript[2] || transcript[0], transcript, vocabulary)].filter(hasGoodQuestion);
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
