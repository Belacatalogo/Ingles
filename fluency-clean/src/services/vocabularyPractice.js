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

function normalizeOption(value) {
  return clean(value).toLowerCase().replace(/[.,!?;:]/g, '').replace(/\s+/g, ' ');
}

function includesNormalized(text, part) {
  const normalizedText = normalizeOption(text);
  const normalizedPart = normalizeOption(part);
  return Boolean(normalizedText && normalizedPart && normalizedText.includes(normalizedPart));
}

function makeOptions(correct, distractors, seedText, limit = 4) {
  const options = uniqueBy([correct, ...distractors].filter(Boolean), normalizeOption).slice(0, limit);
  return stableShuffle(options, seedText).slice(0, limit);
}

function sentenceWords(value) {
  return clean(value).replace(/[.,!?;:]/g, '').split(/\s+/).filter(Boolean);
}

function asSentence(value) {
  const text = clean(value).replace(/\s+/g, ' ');
  if (!text) return '';
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function getExample(card) {
  return clean(card?.example || card?.sentence || `I use ${card?.word || 'English'}.`);
}

function normalizeCard(card, index) {
  return {
    id: card?.id || `${card?.word || 'card'}-${index}`,
    word: clean(card?.word || card?.term || card?.expression),
    translation: clean(card?.translation || card?.meaning || card?.definition),
    definition: clean(card?.definition || card?.meaning || card?.translation),
    example: asSentence(card?.example || card?.sentence),
    deck: clean(card?.deck || card?.category),
    level: clean(card?.level || card?.due || 'A1'),
  };
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
  return sentenceWords(card.example || `I use ${card.word}.`);
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
    options: makeOptions(correct, distractorsFor(cards, card, 'translation'), `meaning-${card.id}-${index}`),
    instruction: 'Escolha o significado correto.',
  };
}

function activityComplete(card, cards, index) {
  return {
    id: `complete-${card.id}-${index}`,
    type: 'choice',
    cardId: card.id,
    word: card.word,
    title: 'Complete a frase',
    prompt: `Complete com a palavra que significa “${card.translation || card.definition || card.word}”:\n${maskExample(card)}`,
    answer: card.word,
    options: makeOptions(card.word, distractorsFor(cards, card, 'word'), `complete-${card.id}-${index}`),
    instruction: 'Use o significado pedido para escolher a única resposta correta.',
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

function activityLooksSafe(activity) {
  if (!activity) return false;
  if (activity.type === 'intro' || activity.type === 'build') return true;
  const options = Array.isArray(activity.options) ? activity.options : [];
  if (options.length < 3) return false;
  const uniqueOptions = uniqueBy(options, normalizeOption);
  if (uniqueOptions.length !== options.length) return false;
  if (!options.some((option) => normalizeOption(option) === normalizeOption(activity.answer))) return false;

  if (activity.type === 'choice') {
    const promptWithoutMaskedLine = String(activity.prompt || '').split('\n')[0] || '';
    const answerIsLeaked = includesNormalized(promptWithoutMaskedLine, activity.answer);
    if (answerIsLeaked) return false;
  }

  if (activity.id?.startsWith('complete-')) {
    const maskedPart = String(activity.prompt || '').split('\n').slice(1).join(' ');
    if (includesNormalized(maskedPart, activity.answer)) return false;
  }

  if (activity.id?.startsWith('listen-')) {
    return Boolean(activity.prompt && activity.answer && normalizeOption(activity.prompt) === normalizeOption(activity.answer));
  }

  return true;
}

function targetQuestionCount(level, selectedCount) {
  if (!selectedCount) return 0;
  if (level <= 1) return Math.min(16, Math.max(15, selectedCount * 4));
  if (level === 2) return Math.min(18, Math.max(16, selectedCount * 3));
  return Math.min(20, Math.max(18, selectedCount * 3));
}

function interleaveActivities(groups, seedText, maxCount) {
  const safeGroups = groups.map((group) => group.filter(activityLooksSafe));
  const shuffledGroups = safeGroups.map((group, index) => stableShuffle(group, `${seedText}-group-${index}`));
  const result = [];
  let cursor = 0;
  while (result.length < maxCount && shuffledGroups.some((group) => group.length)) {
    const groupIndex = cursor % shuffledGroups.length;
    const next = shuffledGroups[groupIndex].shift();
    if (next) result.push(next);
    cursor += 1;
  }
  return stableShuffle(result, `${seedText}-final-order`).slice(0, maxCount);
}

function repeatToTarget(groups, seed, targetCount) {
  const safeGroups = groups.map((group) => group.filter(activityLooksSafe));
  const base = interleaveActivities(safeGroups, seed, targetCount);
  if (base.length >= targetCount) return base;
  const flattened = safeGroups.flat();
  const repeated = [...base];
  let index = 0;
  while (repeated.length < targetCount && flattened.length) {
    const source = flattened[index % flattened.length];
    repeated.push({ ...source, id: `${source.id}-review-${index}` });
    index += 1;
  }
  return stableShuffle(repeated.filter(activityLooksSafe), `${seed}-review-fill`).slice(0, targetCount);
}

export function buildVocabularyPracticeActivities(rawCards = [], { level = 1 } = {}) {
  const cards = uniqueBy(rawCards.map(normalizeCard).filter((card) => card.word), (card) => card.word.toLowerCase());
  const selected = cards.slice(0, Math.min(cards.length, level <= 1 ? 4 : level === 2 ? 6 : 8));
  const seed = `vocab-level-${level}-${selected.map((card) => card.id).join('|')}`;
  const targetCount = targetQuestionCount(level, selected.length);

  const intro = selected.map((card, index) => activityIntro(card, index));
  const meaning = selected.map((card, index) => activityMeaning(card, cards, index));
  const complete = selected.map((card, index) => activityComplete(card, cards, index));
  const listen = selected.map((card, index) => activityListen(card, cards, index));
  const build = selected.filter((card) => card.example).map((card, index) => activityBuild(card, index));

  if (level <= 1) return repeatToTarget([intro, meaning, complete], seed, targetCount);
  if (level === 2) return repeatToTarget([meaning, complete, listen], seed, targetCount);
  return repeatToTarget([meaning, complete, listen, build], seed, targetCount);
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
