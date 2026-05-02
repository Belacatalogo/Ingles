function clean(value) {
  return String(value ?? '').trim();
}

function hashSeed(value = '') {
  const text = String(value);
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed) {
  let value = seed || 1;
  return () => {
    value = Math.imul(1664525, value) + 1013904223;
    return ((value >>> 0) / 4294967296);
  };
}

function stableShuffle(items, seedText = '') {
  const random = seededRandom(hashSeed(seedText || items.join('|')));
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function uniqueBy(items, keyFn) {
  const seen = new Set();
  return items.filter((item) => {
    const key = keyFn(item);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function normalizeCard(card, index) {
  return {
    id: card?.id || `${card?.word || 'card'}-${index}`,
    word: clean(card?.word || card?.term || card?.expression),
    translation: clean(card?.translation || card?.meaning || card?.definition),
    definition: clean(card?.definition || card?.meaning || card?.translation),
    example: clean(card?.example || card?.sentence),
    deck: clean(card?.deck || card?.category),
    level: clean(card?.level || card?.due || 'A1'),
  };
}

function normalizeOption(value) {
  return clean(value).toLowerCase().replace(/[.,!?;:]/g, '').replace(/\s+/g, ' ');
}

function makeOptions(correct, distractors, seedText, limit = 4) {
  const options = uniqueBy([correct, ...distractors].filter(Boolean), normalizeOption).slice(0, limit);
  return stableShuffle(options, seedText).slice(0, limit);
}

function distractorsFor(cards, target, field = 'translation', limit = 6) {
  return stableShuffle(
    cards
      .filter((card) => card.id !== target.id)
      .map((card) => clean(card[field] || card.translation || card.word))
      .filter(Boolean),
    `${target.id}-${field}-distractors`,
  ).slice(0, limit);
}

function wordsFromExample(card) {
  const example = clean(card.example || `I use ${card.word}.`);
  return example.replace(/[.,!?;:]/g, '').split(/\s+/).filter(Boolean);
}

function maskExample(card) {
  const example = clean(card.example || `I use ${card.word}.`);
  const word = clean(card.word);
  if (!word) return example;
  const pattern = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
  if (pattern.test(example)) return example.replace(pattern, '____');
  const words = example.split(/\s+/);
  const index = Math.min(words.length - 1, Math.max(0, Math.floor(words.length / 2)));
  words[index] = '____';
  return words.join(' ');
}

function hasWord(sentence, word) {
  if (!sentence || !word) return false;
  const escaped = clean(word).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}\\b`, 'i').test(sentence);
}

function sameSurfaceCue(card, option) {
  const word = clean(card.word);
  if (!word) return false;
  return hasWord(option, word);
}

function activityIntro(card, index) {
  return {
    id: `intro-${card.id}-${index}`,
    type: 'intro',
    cardId: card.id,
    word: card.word,
    title: 'Nova palavra',
    prompt: card.word,
    answer: card.translation || card.definition,
    example: card.example,
    instruction: 'Observe o significado, ouça e repita a frase.',
  };
}

function activityMeaning(card, cards, index) {
  const correct = card.translation || card.definition;
  return {
    id: `meaning-${card.id}-${index}`,
    type: 'choice',
    cardId: card.id,
    word: card.word,
    title: 'Reconheça o significado',
    prompt: `O que significa “${card.word}”?`,
    answer: correct,
    options: makeOptions(correct, distractorsFor(cards, card, 'translation'), `meaning-${card.id}-${index}`),
    instruction: 'Escolha o significado correto.',
  };
}

function activityExample(card, cards, index) {
  const correct = card.example || `I use ${card.word}.`;
  const rawDistractors = distractorsFor(cards, card, 'example', 8);
  const sameCueDistractors = rawDistractors.filter((option) => sameSurfaceCue(card, option));
  const regularDistractors = rawDistractors.filter((option) => !sameSurfaceCue(card, option));
  const distractors = sameCueDistractors.length >= 2 ? sameCueDistractors : rawDistractors;
  return {
    id: `example-${card.id}-${index}`,
    type: 'choice',
    cardId: card.id,
    word: card.word,
    title: 'Uso em frase',
    prompt: 'Qual frase combina melhor com o significado estudado?',
    hint: card.translation || card.definition || card.word,
    answer: correct,
    options: makeOptions(correct, [...distractors, ...regularDistractors], `example-${card.id}-${index}`),
    instruction: 'Escolha pelo sentido da frase, não apenas por uma palavra solta.',
  };
}

function activityComplete(card, cards, index) {
  return {
    id: `complete-${card.id}-${index}`,
    type: 'choice',
    cardId: card.id,
    word: card.word,
    title: 'Complete a frase',
    prompt: maskExample(card),
    answer: card.word,
    options: makeOptions(card.word, distractorsFor(cards, card, 'word'), `complete-${card.id}-${index}`),
    instruction: 'Escolha a palavra que completa a frase.',
  };
}

function activityBuild(card, index) {
  const words = wordsFromExample(card);
  return {
    id: `build-${card.id}-${index}`,
    type: 'build',
    cardId: card.id,
    word: card.word,
    title: 'Monte a frase',
    prompt: 'Monte a frase em inglês.',
    answer: words.join(' '),
    options: stableShuffle(words, `build-${card.id}-${index}`),
    instruction: 'Toque nas palavras na ordem correta.',
  };
}

function activityListen(card, cards, index) {
  const correct = card.example || card.word;
  return {
    id: `listen-${card.id}-${index}`,
    type: 'listen',
    cardId: card.id,
    word: card.word,
    title: 'Ouça e escolha',
    prompt: correct,
    answer: correct,
    options: makeOptions(correct, distractorsFor(cards, card, 'example'), `listen-${card.id}-${index}`),
    instruction: 'Ouça a frase e escolha o que foi dito.',
  };
}

export function buildVocabularyPracticeActivities(rawCards = [], { level = 1 } = {}) {
  const cards = uniqueBy(rawCards.map(normalizeCard).filter((card) => card.word), (card) => card.word.toLowerCase());
  const activities = [];
  const selected = cards.slice(0, Math.min(cards.length, level <= 1 ? 4 : level === 2 ? 6 : 8));

  selected.forEach((card, index) => activities.push(activityIntro(card, index)));
  selected.forEach((card, index) => activities.push(activityMeaning(card, cards, index)));
  if (level >= 1) selected.slice(0, Math.min(4, selected.length)).forEach((card, index) => activities.push(activityExample(card, cards, index)));
  if (level >= 2) selected.forEach((card, index) => activities.push(activityComplete(card, cards, index)));
  if (level >= 2) selected.slice(0, 4).forEach((card, index) => activities.push(activityListen(card, cards, index)));
  if (level >= 3) selected.filter((card) => card.example).slice(0, 5).forEach((card, index) => activities.push(activityBuild(card, index)));

  return activities;
}

export function scoreVocabularyPractice(activity, userAnswer) {
  if (!activity) return { correct: false, expected: '' };
  const expected = clean(activity.answer);
  const received = Array.isArray(userAnswer) ? userAnswer.join(' ') : clean(userAnswer);
  return {
    correct: normalizeOption(received) === normalizeOption(expected),
    expected,
    received,
  };
}
