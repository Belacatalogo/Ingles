import { getLessonCompletions, getPracticeSessions, getSpeakingSessions } from './progressStore.js';

function safeArray(value) { return Array.isArray(value) ? value : []; }
function clean(value) { return String(value ?? '').trim(); }
function normalizeKey(value) { return clean(value).toLowerCase().replace(/\s+/g, ' ').slice(0, 160); }
function dateKey(value) { return String(value || '').slice(0, 10); }
function todayKey(date = new Date()) { return date.toISOString().slice(0, 10); }

function classifyPracticeError(item = {}, session = {}) {
  const text = `${item.prompt || ''} ${item.expected || ''} ${item.answer || ''}`.toLowerCase();
  if (/pronunciation|speak|fale|repita|listen|ouça|shadow/i.test(text)) return 'pronunciation';
  if (/write|escreva|complete|complete|corrija|correct|negative|question|pergunta|verb|verbo|grammar|gramática/i.test(text)) return 'grammar';
  if (/translate|traduza|meaning|significa|word|palavra|vocabulary/i.test(text)) return 'vocabulary';
  if (session.type === 'listening') return 'listening';
  if (session.type === 'reading') return 'reading';
  return session.type || 'practice';
}

function pushAggregated(map, raw) {
  const key = `${raw.source}:${raw.category}:${normalizeKey(raw.key || raw.title || raw.prompt || raw.word)}`;
  if (!key || key.length < 8) return;
  const current = map.get(key) || {
    id: key,
    source: raw.source,
    category: raw.category,
    title: raw.title || raw.word || raw.prompt || 'Erro registrado',
    lessonTitle: raw.lessonTitle || '',
    level: raw.level || 'A1',
    count: 0,
    lastSeen: raw.lastSeen || '',
    examples: [],
    severity: 'low',
    nextReviewAt: '',
  };
  current.count += 1;
  current.lastSeen = [current.lastSeen, raw.lastSeen].filter(Boolean).sort().reverse()[0] || raw.lastSeen || '';
  if (raw.example && current.examples.length < 3) current.examples.push(raw.example);
  current.severity = current.count >= 4 ? 'high' : current.count >= 2 ? 'medium' : 'low';
  current.nextReviewAt = getNextReviewDate(current.lastSeen, current.count);
  map.set(key, current);
}

function getNextReviewDate(lastSeen, count) {
  const base = lastSeen ? new Date(lastSeen) : new Date();
  const days = count >= 4 ? 1 : count >= 2 ? 3 : 7;
  base.setDate(base.getDate() + days);
  return base.toISOString().slice(0, 10);
}

function fromPracticeSessions(map) {
  for (const session of getPracticeSessions()) {
    for (const item of safeArray(session.weakItems)) {
      pushAggregated(map, {
        source: 'practice',
        category: classifyPracticeError(item, session),
        key: item.id || item.prompt || item.expected,
        title: item.prompt || item.title || 'Questão errada',
        lessonTitle: session.title,
        level: session.level,
        lastSeen: session.completedAt,
        example: {
          prompt: item.prompt || item.title || '',
          answer: item.answer || '',
          expected: item.expected || '',
          note: item.lifeLost ? 'Perdeu vida na prática profunda.' : 'Erro registrado na prática profunda.',
        },
      });
    }
  }
}

function fromSpeakingSessions(map) {
  for (const session of getSpeakingSessions()) {
    for (const attempt of safeArray(session.attempts)) {
      const weakWords = [
        ...safeArray(attempt.weakestWords),
        ...safeArray(attempt.errors),
        attempt.focusWord ? { word: attempt.focusWord, score: attempt.score, note: 'Palavra foco da tentativa.' } : null,
      ].filter(Boolean);
      for (const item of weakWords) {
        const word = clean(item.word);
        if (!word || word.length < 2) continue;
        const score = Number(item.score ?? attempt.score ?? 0);
        if (score && score >= 86) continue;
        pushAggregated(map, {
          source: 'speaking',
          category: 'pronunciation',
          key: word,
          title: word,
          lessonTitle: session.scenario || session.title,
          level: session.level,
          lastSeen: session.completedAt,
          example: {
            prompt: attempt.referenceText || session.scenario || '',
            answer: attempt.spokenText || '',
            expected: word,
            score,
            note: item.note || `Pronúncia abaixo do ideal${score ? ` (${score}/100)` : ''}.`,
          },
        });
      }
    }
  }
}

function fromLessonCompletions(map) {
  for (const completion of getLessonCompletions()) {
    const written = clean(completion.writtenAnswer);
    if (!written) continue;
    const words = written.split(/\s+/).filter(Boolean);
    if (words.length < 3) {
      pushAggregated(map, {
        source: 'writing',
        category: 'writing',
        key: `${completion.lessonId}:short-answer`,
        title: 'Resposta escrita curta demais',
        lessonTitle: completion.title,
        level: completion.level,
        lastSeen: completion.completedAt,
        example: {
          prompt: 'Produção final da aula',
          answer: written,
          expected: 'Resposta mais completa em frase própria.',
          note: 'Produção escrita muito curta para medir domínio real.',
        },
      });
    }
  }
}

export function getErrorBankSummary({ limit = 8 } = {}) {
  const map = new Map();
  fromPracticeSessions(map);
  fromSpeakingSessions(map);
  fromLessonCompletions(map);
  const errors = Array.from(map.values()).sort((a, b) => {
    const severity = { high: 3, medium: 2, low: 1 };
    return severity[b.severity] - severity[a.severity] || b.count - a.count || String(b.lastSeen).localeCompare(String(a.lastSeen));
  });
  const today = todayKey();
  const byCategory = errors.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.count;
    return acc;
  }, {});
  return {
    hasData: errors.length > 0,
    totalErrors: errors.reduce((sum, item) => sum + item.count, 0),
    uniqueErrors: errors.length,
    highPriority: errors.filter((item) => item.severity === 'high').length,
    dueToday: errors.filter((item) => item.nextReviewAt <= today).length,
    byCategory,
    topErrors: errors.slice(0, limit),
    recentErrors: errors.slice().sort((a, b) => String(b.lastSeen).localeCompare(String(a.lastSeen))).slice(0, limit),
  };
}

export function getErrorReviewQueue(limit = 12) {
  return getErrorBankSummary({ limit: 80 }).topErrors
    .filter((item) => item.severity !== 'low' || item.nextReviewAt <= todayKey())
    .slice(0, limit);
}
