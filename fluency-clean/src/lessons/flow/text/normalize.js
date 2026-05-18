// Normalização endurecida para o renderizador por pilar.
// Regras:
// - nunca exibir chaves técnicas (subject, expected, answer, schemaVersion, etc.);
// - nunca exibir [object Object];
// - expectedOf nunca aparece antes da tentativa — quem decide isso é a fase, não este módulo.

const TECHNICAL_KEYS = new Set([
  'schemaVersion', 'status', 'level', 'pillar', 'order', 'id', 'checkpoint',
  'tags', 'estimatedMinutes', 'subject', 'expected', 'answer', 'expectedAnswer',
  'correctAnswer', 'options',
]);

const TECHNICAL_WORDS = new Set([
  'subject', 'expected', 'answer', 'correctAnswer', 'expectedAnswer',
  'schemaVersion', 'undefined', 'null', '[object Object]',
]);

export function clean(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value).trim();
  if (Array.isArray(value)) return value.map(textOf).filter(Boolean).join('\n');
  if (typeof value === 'object') return textOf(value) || noteOf(value) || '';
  return String(value).trim();
}

export function isTechnicalText(value) {
  return TECHNICAL_WORDS.has(clean(value));
}

export function hasText(value) {
  const text = clean(value);
  return text.length > 0 && !isTechnicalText(text);
}

export function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

export function firstUseful(...values) {
  return values.map(clean).find(hasText) || '';
}

function objectFallback(value) {
  if (!value || typeof value !== 'object') return '';
  const entry = Object.entries(value).find(
    ([key, item]) => !TECHNICAL_KEYS.has(key) && typeof item !== 'object' && hasText(item),
  );
  return entry ? clean(entry[1]) : '';
}

export function textOf(value) {
  if (typeof value === 'string' || typeof value === 'number') {
    return hasText(value) ? String(value).trim() : '';
  }
  if (!value || typeof value !== 'object') return '';
  return firstUseful(
    value.instruction, value.question, value.prompt, value.text, value.content,
    value.summary, value.description, value.chunk, value.word, value.phrase,
    value.example, value.english, value.sentence, value.line, value.value,
    value.pattern, value.title, value.label,
    objectFallback(value),
  );
}

export function noteOf(value) {
  if (!value || typeof value !== 'object') return '';
  return firstUseful(
    value.note, value.why, value.explanation, value.reason, value.tip,
    value.translation, value.meaning, value.expectedUse,
  );
}

export function expectedOf(value) {
  if (!value || typeof value !== 'object') return '';
  return firstUseful(value.expected, value.answer, value.expectedAnswer, value.correctAnswer);
}

export function asList(value) {
  if (Array.isArray(value)) return value;
  return hasText(value) ? [value] : [];
}

export function mergeLists(...groups) {
  return groups.flatMap(asList).filter(
    (item) => hasText(textOf(item)) || hasText(noteOf(item)) || hasText(item?.word) || hasText(item?.meaning),
  );
}

export function uniqueByText(list) {
  const seen = new Set();
  return list.filter((item) => {
    const key = clean(typeof item === 'string' ? item : textOf(item)).toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function normalizeAnswer(value) {
  return clean(value).toLowerCase().replace(/[.!?]+$/g, '').replace(/\s+/g, ' ');
}

export function isCorrect(value, answer) {
  return Boolean(answer) && normalizeAnswer(value) === normalizeAnswer(answer);
}

export function wordCount(value) {
  return clean(value).split(/\s+/).filter(Boolean).length;
}

export function stripPillarPrefix(title = '') {
  return clean(title).replace(/^(Reading|Grammar|Vocabulary|Listening|Writing|Speaking)\s*[—-]\s*/i, '') || 'Aula';
}

export function pillarLabel(pillar) {
  return ({
    grammar: 'Grammar', vocabulary: 'Vocabulary', reading: 'Reading',
    listening: 'Listening', speaking: 'Speaking', writing: 'Writing',
  }[pillar] || 'Aula');
}
