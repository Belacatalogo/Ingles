function clean(value) {
  return String(value ?? '').trim();
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
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

function distractorsFor(cards, target, field = 'translation', limit = 3) {
  return shuffle(cards.filter((card) => card.id !== target.id).map((card) => clean(card[field] || card.translation || card.word)).filter(Boolean)).slice(0, limit);
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
    options: shuffle([correct, ...distractorsFor(cards, card, 'translation')]).slice(0, 4),
    instruction: 'Escolha o significado correto.',
  };
}

function activityExample(card, cards, index) {
  const correct = card.example || `I use ${card.word}.`;
  const options = shuffle([correct, ...distractorsFor(cards, card, 'example')]).slice(0, 4);
  return {
    id: `example-${card.id}-${index}`,
    type: 'choice',
    cardId: card.id,
    word: card.word,
    title: 'Uso em frase',
    prompt: `Qual frase usa “${card.word}” corretamente?`,
    answer: correct,
    options,
    instruction: 'Aprenda a palavra dentro de uma frase.',
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
    options: shuffle([card.word, ...distractorsFor(cards, card, 'word')]).slice(0, 4),
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
    options: shuffle(words),
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
    options: shuffle([correct, ...distractorsFor(cards, card, 'example')]).slice(0, 4),
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
  const normalize = (value) => clean(value).toLowerCase().replace(/[.,!?;:]/g, '').replace(/\s+/g, ' ');
  return {
    correct: normalize(received) === normalize(expected),
    expected,
    received,
  };
}
