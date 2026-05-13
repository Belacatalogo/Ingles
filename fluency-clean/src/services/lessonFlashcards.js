function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function slug(value) {
  return clean(value).toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '') || 'card';
}

function looksEnglish(value = '') {
  const text = clean(value);
  if (!text) return false;
  const common = /\b(i|you|he|she|it|we|they|am|are|is|my|your|his|her|hello|hi|good|morning|name|phone|number|from|brazil|student|teacher|mother|father|brother|sister|friend|ready|book|city|country)\b/i;
  const portugueseOnly = /\b(eu|você|vocês|ele|ela|nós|eles|elas|meu|minha|seu|sua|brasileiro|brasileira|estudante|professor|mãe|pai|irmão|irmã)\b/i;
  if (common.test(text)) return true;
  if (portugueseOnly.test(text) && !/[a-z]{2,}\s+(am|are|is)\b/i.test(text)) return false;
  return /[a-z]/i.test(text) && !/[ãõçáéíóúâêôà]/i.test(text);
}

function isTooLongFront(value = '') {
  const text = clean(value);
  return text.length > 54 || text.split(' ').length > 9;
}

function makeCard(raw = {}, index = 0, source = 'Aula atual') {
  const word = clean(raw.word || raw.term || raw.expression || raw.chunk || raw.text || raw.english || raw.question || raw.prompt || raw.title || raw.pattern || raw.label);
  if (!word || isTooLongFront(word)) return null;

  const translation = clean(raw.translation || raw.pt || raw.portuguese || raw.meaning || raw.answer || raw.definition || raw.expected || raw.right);
  const example = clean(raw.example || raw.sentence || raw.context || raw.why || raw.note || raw.explanation || raw.warning || raw.howToAvoid);
  const deck = clean(raw.deck || raw.category || raw.source || source) || 'Aula atual';

  return {
    id: raw.id || `${slug(deck)}-${slug(word)}-${index}`,
    word,
    translation,
    definition: clean(raw.definition || raw.meaning || translation || 'Item importante da aula atual.'),
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

function subjectPronounCards(title) {
  return [
    { word: 'I', translation: 'eu', definition: 'Sempre com letra maiúscula.', example: 'I am Luis.' },
    { word: 'you', translation: 'você / vocês', definition: 'Pode ser singular ou plural. O contexto mostra.', example: 'You are my friend.' },
    { word: 'he', translation: 'ele', definition: 'Use para homem/menino.', example: 'He is my brother.' },
    { word: 'she', translation: 'ela', definition: 'Use para mulher/menina.', example: 'She is my sister.' },
    { word: 'it', translation: 'ele/ela para coisa, animal ou ideia', definition: 'Use para objeto, lugar, ideia ou animal quando não estamos tratando como pessoa.', example: 'It is my phone.' },
    { word: 'we', translation: 'nós', definition: 'Inclui você no grupo.', example: 'We are ready.' },
    { word: 'they', translation: 'eles / elas', definition: 'Use para grupo de pessoas ou coisas no plural.', example: 'They are students.' },
  ].map((card, index) => makeCard({ ...card, deck: `${title} · pronomes` }, index, `${title} · pronomes`)).filter(Boolean);
}

function cardsFromDeepGrammar(lesson, title) {
  if (lesson?.id === 'A1-GRAMMAR-001' || /subject pronouns/i.test(title)) {
    return subjectPronounCards(title);
  }

  const cards = [];

  cards.push(...fromArray(lesson?.grammarTable, `${title} · padrões`, (item) => {
    const front = item?.example && looksEnglish(item.example) ? item.example : item?.pattern;
    return {
      word: front,
      meaning: item?.note || item?.translation || 'Padrão gramatical da aula.',
      example: item?.pattern && item?.example !== item?.pattern ? item.pattern : '',
      deck: `${title} · padrões`,
    };
  }).filter((card) => looksEnglish(card.word)));

  cards.push(...fromArray(lesson?.teacherExamples, `${title} · exemplos`, (item) => ({
    word: item?.english || item?.text || item?.sentence,
    meaning: item?.translation || item?.meaning,
    example: item?.why || item?.warning,
    deck: `${title} · exemplos`,
  })).filter((card) => looksEnglish(card.word)));

  cards.push(...fromArray(lesson?.commonBrazilianMistakes, `${title} · correções`, (item) => ({
    word: item?.right || item?.correct || item?.answer,
    meaning: item?.why || item?.howToAvoid || 'Correção importante da aula.',
    example: item?.wrong ? `Evite: ${item.wrong}` : item?.miniPractice,
    deck: `${title} · correções`,
  })).filter((card) => looksEnglish(card.word)));

  return cards.slice(0, 24);
}

function cardsFromDeepVocabulary(lesson, title) {
  const cards = [];

  cards.push(...fromArray(lesson?.vocabulary, title));
  cards.push(...fromArray(lesson?.essentialWords, title, (item) => ({
    word: item?.word,
    meaning: item?.meaning,
    example: item?.example,
    note: item?.note,
    deck: title,
  })).filter((card) => looksEnglish(card.word)));
  cards.push(...fromArray(lesson?.chunks, `${title} · chunks`, (item) => ({
    word: item?.chunk || item?.expression || item?.word,
    meaning: item?.translation || item?.meaning,
    example: item?.why || item?.example,
    note: item?.warning,
    deck: `${title} · chunks`,
  })).filter((card) => looksEnglish(card.word)));
  cards.push(...fromArray(lesson?.collocations, `${title} · collocations`, (item) => ({
    word: item?.instruction || item?.text || item?.word || item?.chunk,
    meaning: item?.note || item?.meaning || 'Combinação natural da aula.',
    example: item?.expected || item?.example,
    deck: `${title} · collocations`,
  })).filter((card) => looksEnglish(card.word)));

  if (Array.isArray(lesson?.miniDialogues)) {
    lesson.miniDialogues.forEach((dialogue, dialogueIndex) => {
      const lines = Array.isArray(dialogue?.lines) ? dialogue.lines : [];
      lines.forEach((line, lineIndex) => {
        const text = clean(line).replace(/^[^:]{1,24}:\s*/, '');
        if (!looksEnglish(text) || isTooLongFront(text)) return;
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

  return cards.slice(0, 32);
}

function fallbackCards(lesson, title) {
  const objective = Array.isArray(lesson?.objectives) ? lesson.objectives[0] : lesson?.objective;
  const card = makeCard({
    word: title,
    meaning: 'Tema principal da aula atual.',
    example: clean(objective),
    deck: 'Aula atual',
  }, 0, 'Aula atual');
  return card ? [card] : [];
}

export function buildLessonFlashcards(lesson = {}) {
  const title = clean(lesson?.title) || 'Aula atual';
  const cards = dedupe([
    ...cardsFromDeepVocabulary(lesson, title),
    ...cardsFromDeepGrammar(lesson, title),
  ]);

  if (cards.length) return cards.slice(0, 32);
  return dedupe(fallbackCards(lesson, title)).slice(0, 4);
}

export function hasLessonFlashcards(lesson = {}) {
  return buildLessonFlashcards(lesson).length > 0;
}
