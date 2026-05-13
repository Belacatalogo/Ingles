function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function slug(value) {
  return clean(value).toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '') || 'card';
}

function makeCard(raw = {}, index = 0, source = 'Aula atual') {
  const word = clean(raw.word || raw.term || raw.expression || raw.chunk || raw.text || raw.question || raw.prompt || raw.title);
  if (!word) return null;

  const translation = clean(raw.translation || raw.pt || raw.portuguese || raw.meaning || raw.answer || raw.definition || raw.expected);
  const example = clean(raw.example || raw.sentence || raw.context || raw.why || raw.note || raw.explanation);
  const deck = clean(raw.deck || raw.category || raw.source || source) || 'Aula atual';

  return {
    id: raw.id || `${slug(deck)}-${slug(word)}-${index}`,
    word,
    translation,
    definition: clean(raw.definition || raw.meaning || translation || 'Vocabulário da aula atual.'),
    example,
    deck,
  };
}

function fromString(value, index, source) {
  const word = clean(value);
  if (!word) return null;
  return makeCard({ word, meaning: 'Item importante da aula atual.' }, index, source);
}

function fromArray(items, source, mapItem = (item) => item) {
  if (!Array.isArray(items)) return [];
  return items.map((item, index) => {
    if (typeof item === 'string') return fromString(item, index, source);
    return makeCard(mapItem(item, index) || item, index, source);
  }).filter(Boolean);
}

function dedupe(cards) {
  const seen = new Set();
  return cards.filter((card) => {
    const key = slug(`${card.word}-${card.translation || card.definition}`);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function buildLessonFlashcards(lesson = {}) {
  const title = clean(lesson?.title) || 'Aula atual';
  const cards = [];

  cards.push(...fromArray(lesson?.vocabulary, title));
  cards.push(...fromArray(lesson?.essentialWords, title, (item) => ({
    word: item?.word,
    meaning: item?.meaning,
    example: item?.example,
    note: item?.note,
    deck: title,
  })));
  cards.push(...fromArray(lesson?.chunks, `${title} · chunks`, (item) => ({
    word: item?.chunk || item?.expression || item?.word,
    meaning: item?.translation || item?.meaning,
    example: item?.why || item?.example,
    note: item?.warning,
    deck: `${title} · chunks`,
  })));
  cards.push(...fromArray(lesson?.collocations, `${title} · collocations`, (item) => ({
    word: item?.instruction || item?.text || item?.word || item?.chunk,
    meaning: item?.note || item?.meaning || 'Combinação natural da aula.',
    example: item?.expected || item?.example,
    deck: `${title} · collocations`,
  })));
  cards.push(...fromArray(lesson?.examples, `${title} · exemplos`, (item) => ({
    word: item?.text || item?.english || item?.sentence,
    meaning: item?.translation || item?.meaning,
    example: item?.why || item?.warning,
    deck: `${title} · exemplos`,
  })));

  if (Array.isArray(lesson?.miniDialogues)) {
    lesson.miniDialogues.forEach((dialogue, dialogueIndex) => {
      const lines = Array.isArray(dialogue?.lines) ? dialogue.lines : [];
      lines.forEach((line, lineIndex) => {
        const text = clean(line).replace(/^[^:]{1,24}:\s*/, '');
        const card = makeCard({
          word: text,
          meaning: dialogue?.focus || 'Frase de diálogo da aula.',
          example: dialogue?.title,
          deck: `${title} · diálogo`,
        }, dialogueIndex * 20 + lineIndex, `${title} · diálogo`);
        if (card) cards.push(card);
      });
    });
  }

  cards.push(...fromArray(lesson?.recognitionPractice, `${title} · prática`, (item) => ({
    word: item?.answer || item?.question,
    meaning: item?.explanation || item?.context || 'Item cobrado na prática da aula.',
    example: item?.question,
    deck: `${title} · prática`,
  })));
  cards.push(...fromArray(lesson?.usagePractice, `${title} · uso`, (item) => ({
    word: item?.answer || item?.question,
    meaning: item?.explanation || item?.context || 'Uso em contexto da aula.',
    example: item?.question,
    deck: `${title} · uso`,
  })));

  return dedupe(cards).slice(0, 48);
}

export function hasLessonFlashcards(lesson = {}) {
  return buildLessonFlashcards(lesson).length > 0;
}
