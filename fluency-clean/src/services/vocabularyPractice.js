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

function makeOptions(correct, distractors, seedText, limit = 4) {
  const options = uniqueBy([correct, ...distractors].filter(Boolean), normalizeOption).slice(0, limit);
  return stableShuffle(options, seedText).slice(0, limit);
}

function sentenceWords(value) {
  return clean(value).replace(/[.,!?;:]/g, '').split(/\s+/).filter(Boolean);
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

function getExample(card) {
  return clean(card?.example || card?.sentence || `I use ${card?.word || 'English'}.`);
}

function deriveChunk(card) {
  const word = clean(card.word);
  const example = getExample(card);
  if (!word) return '';
  const words = sentenceWords(example);
  const index = words.findIndex((item) => normalizeOption(item) === normalizeOption(word));
  if (index >= 0) {
    const start = Math.max(0, index - 1);
    const end = Math.min(words.length, index + 3);
    const chunk = words.slice(start, end).join(' ');
    if (chunk && chunk.toLowerCase() !== word.toLowerCase()) return chunk;
  }
  return word.length <= 3 ? `${word} am` : `use ${word}`;
}

function deriveVariations(card) {
  const word = clean(card.word);
  const example = getExample(card).replace(/[.!?]$/, '');
  const translation = clean(card.translation || card.definition || word);
  const chunk = deriveChunk(card);
  const variations = [example];

  if (hasWord(example, 'I')) variations.push(example.replace(/\bI\b/g, 'you').replace(/\bam\b/g, 'are'));
  if (hasWord(example, 'you')) variations.push(example.replace(/\byou\b/gi, 'I').replace(/\bare\b/g, 'am'));
  if (hasWord(example, 'my')) variations.push(example.replace(/\bmy\b/gi, 'your'));
  if (hasWord(example, 'your')) variations.push(example.replace(/\byour\b/gi, 'my'));
  if (word && !variations.some((item) => hasWord(item, word))) variations.push(`I need ${word}`);
  if (chunk && !variations.includes(chunk)) variations.push(chunk);
  if (translation) variations.push(`Meaning: ${translation}`);

  return uniqueBy(variations.filter(Boolean).slice(0, 5), normalizeOption);
}

function deriveMiniDialogue(card) {
  const word = clean(card.word);
  const example = getExample(card).replace(/[.!?]$/, '.');
  const translation = clean(card.translation || card.definition || word);
  return {
    prompt: `A: Do you understand “${word}”?`,
    answer: `B: Yes. ${example}`,
    meaning: translation,
  };
}

function normalizeArray(value) {
  return Array.isArray(value) ? value.map(clean).filter(Boolean) : [];
}

function normalizeMiniDialogues(value, card) {
  const fromCard = Array.isArray(value) ? value : [];
  const normalized = fromCard.map((dialogue) => {
    if (typeof dialogue === 'string') return { prompt: 'A:', answer: dialogue, meaning: card.translation || card.definition || card.word };
    return { prompt: clean(dialogue?.prompt || dialogue?.a || 'A:'), answer: clean(dialogue?.answer || dialogue?.b || ''), meaning: clean(dialogue?.meaning || card.translation || card.definition || card.word) };
  }).filter((dialogue) => dialogue.answer);
  return normalized.length ? normalized : [deriveMiniDialogue(card)];
}

function normalizeCard(card, index) {
  const normalized = {
    id: card?.id || `${card?.word || 'card'}-${index}`,
    word: clean(card?.word || card?.term || card?.expression),
    translation: clean(card?.translation || card?.meaning || card?.definition),
    definition: clean(card?.definition || card?.meaning || card?.translation),
    example: clean(card?.example || card?.sentence),
    deck: clean(card?.deck || card?.category),
    level: clean(card?.level || card?.due || 'A1'),
  };
  normalized.chunk = clean(card?.chunk || card?.collocation || deriveChunk(normalized));
  normalized.chunks = uniqueBy([...normalizeArray(card?.chunks), normalized.chunk], normalizeOption);
  normalized.variations = uniqueBy([...normalizeArray(card?.variations), ...deriveVariations(normalized)], normalizeOption).slice(0, 6);
  normalized.miniDialogues = normalizeMiniDialogues(card?.miniDialogues || card?.dialogues, normalized).slice(0, 3);
  return normalized;
}

function distractorsFor(cards, target, field = 'translation', limit = 6) {
  return stableShuffle(
    cards
      .filter((card) => card.id !== target.id)
      .map((card) => {
        if (field === 'chunk') return card.chunk || card.chunks?.[0];
        if (field === 'variation') return card.variations?.[0] || card.example;
        if (field === 'dialogue') return card.miniDialogues?.[0]?.answer || card.example;
        return clean(card[field] || card.translation || card.word);
      })
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

function maskChunk(chunk) {
  const words = sentenceWords(chunk);
  if (words.length <= 1) return '____';
  const index = words.length === 2 ? 1 : Math.floor(words.length / 2);
  return words.map((word, itemIndex) => itemIndex === index ? '____' : word).join(' ');
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

function activityChunk(card, cards, index) {
  const correct = card.chunk || card.chunks?.[0] || card.word;
  return {
    id: `chunk-${card.id}-${index}`,
    type: 'choice',
    cardId: card.id,
    word: card.word,
    title: 'Chunk natural',
    prompt: `Complete o bloco natural: ${maskChunk(correct)}`,
    hint: `Palavra base: ${card.word}`,
    answer: correct,
    options: makeOptions(correct, distractorsFor(cards, card, 'chunk'), `chunk-${card.id}-${index}`),
    instruction: 'Aprenda a palavra em bloco, como ela aparece em frases reais.',
  };
}

function activityVariation(card, cards, index) {
  const correct = card.variations.find((item) => normalizeOption(item) !== normalizeOption(card.example)) || card.variations[0] || card.example;
  return {
    id: `variation-${card.id}-${index}`,
    type: 'choice',
    cardId: card.id,
    word: card.word,
    title: 'Variação de uso',
    prompt: 'Escolha outra frase natural com o mesmo vocabulário.',
    hint: card.translation || card.definition || card.word,
    answer: correct,
    options: makeOptions(correct, distractorsFor(cards, card, 'variation'), `variation-${card.id}-${index}`),
    instruction: 'Treine variações para não decorar só uma frase.',
  };
}

function activityMiniDialogue(card, cards, index) {
  const dialogue = card.miniDialogues[0] || deriveMiniDialogue(card);
  return {
    id: `dialogue-${card.id}-${index}`,
    type: 'choice',
    cardId: card.id,
    word: card.word,
    title: 'Mini-diálogo',
    prompt: dialogue.prompt,
    hint: dialogue.meaning,
    answer: dialogue.answer,
    options: makeOptions(dialogue.answer, distractorsFor(cards, card, 'dialogue'), `dialogue-${card.id}-${index}`),
    instruction: 'Escolha a resposta que completa o mini-diálogo.',
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
  selected.slice(0, Math.min(4, selected.length)).forEach((card, index) => activities.push(activityExample(card, cards, index)));
  selected.slice(0, Math.min(4, selected.length)).forEach((card, index) => activities.push(activityChunk(card, cards, index)));
  if (level >= 2) selected.forEach((card, index) => activities.push(activityComplete(card, cards, index)));
  if (level >= 2) selected.slice(0, 4).forEach((card, index) => activities.push(activityListen(card, cards, index)));
  if (level >= 2) selected.slice(0, 4).forEach((card, index) => activities.push(activityVariation(card, cards, index)));
  if (level >= 3) selected.filter((card) => card.example).slice(0, 5).forEach((card, index) => activities.push(activityBuild(card, index)));
  if (level >= 3) selected.slice(0, 4).forEach((card, index) => activities.push(activityMiniDialogue(card, cards, index)));

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
