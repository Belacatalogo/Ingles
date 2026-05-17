function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function slug(value) {
  return clean(value).toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '') || 'card';
}

function looksEnglish(value = '') {
  const text = clean(value);
  if (!text) return false;
  const common = /\b(i|you|he|she|it|we|they|am|are|is|my|your|his|her|hello|hi|good|morning|name|phone|number|from|brazil|student|teacher|mother|father|brother|sister|friend|ready|book|city|country|live|family|please|thanks|spell|repeat|nice|meet|bye|see|later|years|old|english|online|music|coffee)\b/i;
  const portugueseOnly = /\b(eu|você|vocês|ele|ela|nós|eles|elas|meu|minha|seu|sua|brasileiro|brasileira|estudante|professor|mãe|pai|irmão|irmã|escreva|leia|complete|troque|revise)\b/i;
  if (common.test(text)) return true;
  if (portugueseOnly.test(text) && !/[a-z]{2,}\s+(am|are|is|live|like|study)\b/i.test(text)) return false;
  return /[a-z]/i.test(text) && !/[ãõçáéíóúâêôà]/i.test(text);
}

function isInstructionText(value = '') {
  return /^(complete|troque|escreva|leia|observe|revise|use\s|repita|ouça|fale|substitua|anote|monte|responda|identifique|marque|escolha|assinale|copie|forme|transforme|reescreva|coloque|organize)\b/i.test(clean(value));
}

// opts.longFront allows speaking/shadowing phrases up to 70 chars / 12 words
function isTooLongFront(value = '', opts = {}) {
  const text = clean(value);
  const maxLen = opts.longFront ? 70 : 54;
  const maxWords = opts.longFront ? 12 : 9;
  return text.length > maxLen || text.split(' ').length > maxWords;
}

// Generic placeholder strings that carry no real study value
const GENERIC_BACKS = new Set([
  'item importante da aula atual',
  'frase útil da aula',
  'frase útil para escrita',
  'padrão gramatical da aula',
  'palavra-chave na escuta',
  'pronunciar com atenção',
  'conectivo de texto',
  'bloco de construção de texto',
  'combinação natural da aula',
  'frase modelo de fala',
  'frase de diálogo da aula',
  'correção importante da aula',
]);

// A back side has useful content if it is non-empty and not a known generic placeholder
function hasUsefulContent(value = '') {
  const text = clean(value).toLowerCase().replace(/\.$/, '').trim();
  return Boolean(text) && !GENERIC_BACKS.has(text);
}

// opts forwarded from fromArray to allow pillar-specific overrides (e.g. longFront)
function makeCard(raw = {}, index = 0, source = 'Aula atual', opts = {}) {
  const word = clean(raw.word || raw.term || raw.expression || raw.chunk || raw.text || raw.english || raw.question || raw.prompt || raw.title || raw.pattern || raw.label);
  if (!word || isTooLongFront(word, opts) || !looksEnglish(word) || isInstructionText(word)) return null;

  const translation = clean(raw.translation || raw.pt || raw.portuguese || raw.meaning || raw.answer || raw.definition || raw.expected || raw.right);
  const example = clean(raw.example || raw.sentence || raw.context || raw.why || raw.note || raw.explanation || raw.warning || raw.howToAvoid);

  // Both sides must have real content — no generic placeholders, no empty backs
  if (!hasUsefulContent(translation) && !hasUsefulContent(example)) return null;

  const deck = clean(raw.deck || raw.category || raw.source || source) || 'Aula atual';

  return {
    id: raw.id || `${slug(deck)}-${slug(word)}-${index}`,
    word,
    translation,
    definition: clean(raw.definition || raw.meaning || translation) || translation,
    example,
    deck,
  };
}

function fromString(value, index, source) {
  const word = clean(value);
  if (!word) return null;
  // Plain strings have no back content; makeCard quality gate will return null
  return makeCard({ word }, index, source);
}

function fromArray(items, source, mapItem = (item) => item, opts = {}) {
  if (!Array.isArray(items)) return [];
  return items.map((item, index) => {
    if (typeof item === 'string') return fromString(item, index, source);
    return makeCard(mapItem(item, index) || item, index, source, opts);
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
      meaning: item?.note || item?.translation,
      example: item?.pattern && item?.example !== item?.pattern ? item.pattern : '',
      deck: `${title} · padrões`,
    };
  }));

  cards.push(...fromArray(lesson?.teacherExamples, `${title} · exemplos`, (item) => ({
    word: item?.english || item?.text || item?.sentence,
    meaning: item?.translation || item?.meaning,
    example: item?.why || item?.warning || item?.note,
    deck: `${title} · exemplos`,
  })));

  cards.push(...fromArray(lesson?.commonBrazilianMistakes, `${title} · correções`, (item) => ({
    word: item?.right || item?.correct || item?.answer,
    meaning: item?.why || item?.howToAvoid,
    example: item?.wrong ? `Evite: ${item.wrong}` : item?.miniPractice,
    deck: `${title} · correções`,
  })));

  return cards.slice(0, 24);
}

function cardsFromVocabularyLikeFields(lesson, title) {
  const cards = [];

  cards.push(...fromArray(lesson?.vocabulary, title));
  cards.push(...fromArray(lesson?.essentialWords, title, (item) => ({
    word: item?.word,
    meaning: item?.meaning,
    example: item?.example,
    note: item?.note,
    deck: title,
  })));
  cards.push(...fromArray(lesson?.preReadingVocabulary, `${title} · pré-leitura`, (item) => ({
    word: item?.word,
    meaning: item?.meaning,
    example: item?.example,
    deck: `${title} · pré-leitura`,
  })));
  cards.push(...fromArray(lesson?.keyWordsToHear, `${title} · listening`, (item) => ({
    word: item?.word,
    meaning: item?.meaning,
    example: item?.example,
    deck: `${title} · listening`,
  })));
  cards.push(...fromArray(lesson?.chunks, `${title} · chunks`, (item) => ({
    word: item?.chunk || item?.expression || item?.word,
    meaning: item?.translation || item?.meaning,
    example: item?.why || item?.example,
    note: item?.warning,
    deck: `${title} · chunks`,
  })));
  // modelPhrases with longFront to allow complete spoken sentences
  cards.push(...fromArray(lesson?.modelPhrases, `${title} · fala`, (item) => ({
    word: item?.text,
    meaning: item?.translation,
    example: item?.note,
    deck: `${title} · fala`,
  }), { longFront: true }));
  // usefulSentences: only object items with actual translation/note pass quality gate
  cards.push(...fromArray(
    (lesson?.usefulSentences || []).filter((s) => typeof s !== 'string' || looksEnglish(s)),
    `${title} · escrita`,
    (item) => ({
      word: typeof item === 'string' ? item : (item?.text || item?.english || item),
      meaning: typeof item === 'object' ? (item?.translation || item?.note) : undefined,
      example: typeof item === 'object' ? item?.example : undefined,
      deck: `${title} · escrita`,
    }),
  ));
  cards.push(...fromArray(lesson?.collocations, `${title} · collocations`, (item) => ({
    word: item?.chunk || item?.text || item?.word || item?.instruction,
    meaning: item?.note || item?.meaning,
    example: item?.expected || item?.example,
    deck: `${title} · collocations`,
  })));

  if (Array.isArray(lesson?.miniDialogues)) {
    lesson.miniDialogues.forEach((dialogue, dialogueIndex) => {
      const lines = Array.isArray(dialogue?.lines) ? dialogue.lines : [];
      lines.forEach((line, lineIndex) => {
        const text = clean(line).replace(/^[^:]{1,24}:\s*/, '');
        if (isTooLongFront(text)) return;
        const card = makeCard({
          word: text,
          meaning: dialogue?.focus,
          example: dialogue?.title,
          deck: `${title} · diálogo`,
        }, dialogueIndex * 20 + lineIndex, `${title} · diálogo`);
        if (card) cards.push(card);
      });
    });
  }

  return cards.slice(0, 32);
}

// Speaking: longFront on modelPhrases allows full phrases up to 70 chars
function cardsFromSpeakingFields(lesson, title) {
  const cards = [];
  cards.push(...fromArray(lesson?.modelPhrases, `${title} · fala`, (item) => ({
    word: item?.text || item?.english,
    meaning: item?.translation || item?.meaning,
    example: item?.note || item?.context || item?.pronunciation,
    deck: `${title} · fala`,
  }), { longFront: true }));
  cards.push(...fromArray(lesson?.pronunciationChunks, `${title} · pronúncia`, (item) => ({
    word: item?.chunk || item?.text || item,
    meaning: item?.note || item?.tip,
    deck: `${title} · pronúncia`,
  })));
  cards.push(...fromArray(lesson?.repeatAfterMe, `${title} · repetição`));
  return cards;
}

function cardsFromWritingFields(lesson, title) {
  const cards = [];
  const filtered = (lesson?.usefulSentences || []).filter((s) => typeof s !== 'string' || looksEnglish(s));
  cards.push(...fromArray(filtered, `${title} · escrita`, (item) => ({
    word: typeof item === 'string' ? item : (item?.text || item?.english || item),
    meaning: typeof item === 'object' ? (item?.translation || item?.note) : undefined,
    example: typeof item === 'object' ? item?.example : undefined,
    deck: `${title} · escrita`,
  })));
  cards.push(...fromArray(lesson?.writingBlocks, `${title} · blocos`, (item) => ({
    word: item?.chunk || item?.block || item?.text || item,
    meaning: item?.note || item?.tip,
    example: item?.example,
    deck: `${title} · blocos`,
  })));
  cards.push(...fromArray(lesson?.connectors, `${title} · conectivos`, (item) => ({
    word: item?.connector || item?.text || item,
    meaning: item?.use || item?.note,
    example: item?.example,
    deck: `${title} · conectivos`,
  })));
  return cards;
}

// Listening: longFront for shadowingPhrases (full spoken sentences)
function cardsFromListeningFields(lesson, title) {
  const cards = [];
  cards.push(...fromArray(lesson?.keyWordsToHear, `${title} · escuta`, (item) => ({
    word: item?.word || item?.text || item,
    meaning: item?.meaning || item?.translation,
    example: item?.example || item?.context,
    deck: `${title} · escuta`,
  })));
  cards.push(...fromArray(lesson?.shadowingPhrases, `${title} · shadowing`, (item) => ({
    word: item?.text || item?.phrase || item,
    meaning: item?.meaning || item?.translation,
    example: item?.note,
    deck: `${title} · shadowing`,
  }), { longFront: true }));
  return cards;
}

export function buildLessonFlashcards(lesson = {}) {
  const title = clean(lesson?.title) || 'Aula atual';
  const pillar = String(lesson?.pillar || lesson?.type || '').toLowerCase();

  let ordered = [];
  if (pillar === 'speaking') {
    ordered = [
      ...cardsFromSpeakingFields(lesson, title),
      ...cardsFromVocabularyLikeFields(lesson, title),
      ...cardsFromDeepGrammar(lesson, title),
    ];
  } else if (pillar === 'writing') {
    ordered = [
      ...cardsFromWritingFields(lesson, title),
      ...cardsFromVocabularyLikeFields(lesson, title),
      ...cardsFromDeepGrammar(lesson, title),
    ];
  } else if (pillar === 'listening') {
    ordered = [
      ...cardsFromListeningFields(lesson, title),
      ...cardsFromVocabularyLikeFields(lesson, title),
      ...cardsFromDeepGrammar(lesson, title),
    ];
  } else {
    ordered = [
      ...cardsFromVocabularyLikeFields(lesson, title),
      ...cardsFromDeepGrammar(lesson, title),
    ];
  }

  return dedupe(ordered).slice(0, 32);
}

// Requires at least 2 quality cards before showing the flashcard button
export function hasLessonFlashcards(lesson = {}) {
  return buildLessonFlashcards(lesson).length >= 2;
}
