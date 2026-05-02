function clean(value) {
  return String(value ?? '').trim();
}

function normalize(value) {
  return clean(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[.,!?;:()"“”']/g, '').replace(/\s+/g, ' ');
}

function wordCount(value) {
  return clean(value).split(/\s+/).filter(Boolean).length;
}

function hasCapitalStart(value) {
  return /^[A-Z]/.test(clean(value));
}

function hasTerminalPunctuation(value) {
  return /[.!?]$/.test(clean(value));
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function includesTarget(example, word) {
  const normalizedExample = normalize(example);
  const normalizedWord = normalize(word);
  if (!normalizedExample || !normalizedWord) return false;
  if (normalizedWord.includes(' ')) return normalizedExample.includes(normalizedWord);
  return new RegExp('(^|\\s)' + escapeRegExp(normalizedWord) + '(\\s|$)', 'i').test(normalizedExample);
}

function levelRank(level = '') {
  if (String(level).includes('C2')) return 6;
  if (String(level).includes('C1')) return 5;
  if (String(level).includes('B2')) return 4;
  if (String(level).includes('B1')) return 3;
  if (String(level).includes('A2')) return 2;
  return 1;
}

function expectedExampleRange(level = '') {
  const rank = levelRank(level);
  if (rank <= 1) return { min: 3, max: 9 };
  if (rank === 2) return { min: 4, max: 12 };
  if (rank === 3) return { min: 5, max: 14 };
  if (rank === 4) return { min: 6, max: 16 };
  return { min: 6, max: 18 };
}

function issue(type, severity, card, message) {
  return { type, severity, deck: card.deck, level: card.level, index: card.index, word: card.word, message };
}

function cardKey(card) {
  return normalize(card.word);
}

function translationKey(card) {
  return normalize(card.translation);
}

function isLikelyPortugueseTranslation(value) {
  const text = clean(value);
  if (!text) return false;
  if (/[áàâãéêíóôõúç]/i.test(text)) return true;
  if (/[\/]/.test(text)) return true;
  if (/\b(de|da|do|para|por|com|sem|em|ao|à|uma|um|o|a|os|as)\b/i.test(text)) return true;
  return text.length > 1;
}

export function auditVocabularyCurriculum(deckDefinitions = [], { target = 7500 } = {}) {
  const cards = deckDefinitions.flatMap((deck) => (deck.cards || []).map((item, index) => ({
    deck: deck.id,
    deckTitle: deck.title,
    level: deck.level,
    topic: deck.topic,
    index,
    word: item?.[0],
    translation: item?.[1],
    example: item?.[2],
    chunk: item?.[3],
  })));

  const issues = [];
  const byWord = new Map();
  const byTranslation = new Map();

  cards.forEach((card) => {
    const word = clean(card.word);
    const translation = clean(card.translation);
    const example = clean(card.example);
    const chunk = clean(card.chunk);
    const range = expectedExampleRange(card.level);
    const exampleWords = wordCount(example);

    if (!word) issues.push(issue('missing-word', 'critical', card, 'Card sem palavra/expressão.'));
    if (!translation) issues.push(issue('missing-translation', 'critical', card, 'Card sem tradução.'));
    if (!example) issues.push(issue('missing-example', 'critical', card, 'Card sem frase exemplo.'));
    if (!chunk) issues.push(issue('missing-chunk', 'major', card, 'Card sem chunk/collocation.'));

    if (example && !hasCapitalStart(example)) issues.push(issue('example-capitalization', 'major', card, 'Frase exemplo não começa com letra maiúscula.'));
    if (example && !hasTerminalPunctuation(example)) issues.push(issue('example-punctuation', 'major', card, 'Frase exemplo não termina com pontuação.'));
    if (example && exampleWords < range.min) issues.push(issue('example-too-short', 'minor', card, `Frase exemplo curta demais para ${card.level}.`));
    if (example && exampleWords > range.max) issues.push(issue('example-too-long', 'minor', card, `Frase exemplo longa demais para ${card.level}.`));

    if (word && example && !includesTarget(example, word)) {
      issues.push(issue('example-missing-target', 'major', card, 'A frase exemplo não contém a palavra/expressão estudada.'));
    }

    if (chunk && wordCount(chunk) < 2) issues.push(issue('chunk-too-short', 'minor', card, 'Chunk tem menos de 2 palavras.'));
    if (chunk && example && !normalize(example).includes(normalize(chunk))) {
      issues.push(issue('chunk-not-in-example', 'minor', card, 'Chunk não aparece literalmente na frase exemplo.'));
    }

    if (translation && !isLikelyPortugueseTranslation(translation)) {
      issues.push(issue('translation-suspicious', 'minor', card, 'Tradução parece pouco informativa ou possivelmente não está em português.'));
    }

    const wKey = cardKey(card);
    if (wKey) byWord.set(wKey, [...(byWord.get(wKey) || []), card]);
    const tKey = translationKey(card);
    if (tKey) byTranslation.set(tKey, [...(byTranslation.get(tKey) || []), card]);
  });

  const duplicates = [];
  byWord.forEach((items, key) => {
    if (items.length > 1) {
      const levels = [...new Set(items.map((item) => item.level))];
      duplicates.push({ word: key, count: items.length, levels, decks: items.map((item) => item.deck) });
      if (items.length > 3) {
        issues.push(issue('excessive-duplicate-word', 'major', items[0], `Palavra aparece ${items.length} vezes no currículo.`));
      }
    }
  });

  const repeatedTranslations = [];
  byTranslation.forEach((items, key) => {
    if (items.length > 6) repeatedTranslations.push({ translation: key, count: items.length });
  });

  const countsByLevel = cards.reduce((acc, card) => {
    acc[card.level] = (acc[card.level] || 0) + 1;
    return acc;
  }, {});

  const countsByTopic = cards.reduce((acc, card) => {
    acc[card.topic] = (acc[card.topic] || 0) + 1;
    return acc;
  }, {});

  const bySeverity = issues.reduce((acc, item) => {
    acc[item.severity] = (acc[item.severity] || 0) + 1;
    return acc;
  }, {});

  return {
    totalCards: cards.length,
    target,
    completionPercent: target ? Math.round((cards.length / target) * 100) : 0,
    totalDecks: deckDefinitions.length,
    countsByLevel,
    countsByTopic,
    duplicates,
    repeatedTranslations,
    issues,
    bySeverity,
    passedCritical: !issues.some((item) => item.severity === 'critical'),
    passedMajor: !issues.some((item) => item.severity === 'major'),
    passedPedagogicalAudit: !issues.some((item) => item.severity === 'critical' || item.severity === 'major'),
  };
}
