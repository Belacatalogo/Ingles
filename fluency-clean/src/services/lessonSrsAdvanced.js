import { getDuePracticeSrsItems, getPracticeSrsSummary } from './practiceSrsExtended.js';
import { getVocabularySrsSummary } from './vocabularySrs.js';
import { getSrsTagsForLesson, hasPedagogicalTags } from '../content/curriculum/srsTagMaps/index.js';

const STORAGE_KEY = 'fluency.clean.lessonSrsAdvanced.v1';

export const LESSON_SRS_TYPES = Object.freeze({
  LESSON_CONCEPT_TAG: 'lesson_concept_tag',
  ERROR_CONCEPT: 'error_concept',
  LESSON_OBJECTIVE: 'lesson_objective',
});

export const LESSON_SRS_STATUS = Object.freeze({
  WEAK: 'weak',
  LEARNING: 'learning',
  REVIEW: 'review',
  STRONG: 'strong',
  MASTERED: 'mastered',
});

const INTERVALS_DAYS = Object.freeze({
  weak: 1,
  learning: 2,
  review: 4,
  strong: 8,
  mastered: 16,
});

// ---------------------------------------------------------------------------
// Storage helpers
// ---------------------------------------------------------------------------

function safeJsonParse(value, fallback) {
  try { return value ? JSON.parse(value) : fallback; } catch { return fallback; }
}

function readState() {
  if (typeof window === 'undefined') return { items: {} };
  return safeJsonParse(window.localStorage.getItem(STORAGE_KEY), { items: {} });
}

function writeState(state) {
  if (typeof window === 'undefined') return state;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* quota exceeded or unavailable — silently degrade */ }
  return state;
}

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

function clean(value) { return String(value ?? '').trim(); }

function localDateKey(value = new Date()) {
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function addDays(date, days) {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  next.setDate(next.getDate() + Number(days || 0));
  return next;
}

function dueDateFor(status, now = new Date()) {
  return localDateKey(addDays(now, INTERVALS_DAYS[status] || 1));
}

function clampMastery(value) {
  return Math.max(0, Math.min(100, Math.round(Number(value || 0))));
}

function computeMastery(correctCount, attempts, streak, lapses) {
  return clampMastery((correctCount / attempts) * 55 + Math.min(45, streak * 12) - lapses * 8);
}

function resolveStatus(correct, prevStreak = 0) {
  if (!correct) return LESSON_SRS_STATUS.WEAK;
  const next = prevStreak + 1;
  if (next <= 1) return LESSON_SRS_STATUS.LEARNING;
  if (next === 2) return LESSON_SRS_STATUS.REVIEW;
  if (next === 3) return LESSON_SRS_STATUS.STRONG;
  return LESSON_SRS_STATUS.MASTERED;
}

function makeKey(type, content) {
  const t = clean(type).toLowerCase();
  const c = clean(content).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9À-ÿ':.-]/gi, '').slice(0, 80);
  return `${t}::${c}`;
}

function extractPillarFromTags(tags) {
  if (!Array.isArray(tags) || tags.length < 2) return '';
  const second = clean(tags[1]).toLowerCase();
  const knownPillars = ['grammar', 'vocabulary', 'reading', 'listening', 'speaking', 'writing'];
  return knownPillars.includes(second) ? second : '';
}

function inferPillarFromFlowError(err) {
  const raw = clean(err?.pillar || err?.type || '').toLowerCase();
  const map = { grammar: 'grammar', vocabulary: 'vocabulary', reading: 'reading', listening: 'listening', speaking: 'speaking', writing: 'writing', vocab: 'vocabulary', read: 'reading', listen: 'listening', speak: 'speaking', write: 'writing', gram: 'grammar' };
  for (const [k, v] of Object.entries(map)) { if (raw.includes(k)) return v; }
  return 'grammar';
}

// ---------------------------------------------------------------------------
// Core read/write
// ---------------------------------------------------------------------------

function getLessonSrsState() {
  const state = readState();
  return { items: state.items && typeof state.items === 'object' ? state.items : {} };
}

function upsertItem(items, key, patch) {
  const prev = items[key] || {};
  const correct = patch.correct;
  const prevStreak = Number(prev.streak || 0);
  const prevWasMastered = prev.status === LESSON_SRS_STATUS.MASTERED;
  const attempts = Number(prev.attempts || 0) + 1;
  const correctCount = Number(prev.correct || 0) + (correct ? 1 : 0);
  const wrongCount = Number(prev.wrong || 0) + (correct ? 0 : 1);
  const streak = correct ? prevStreak + 1 : 0;
  const lapses = Number(prev.lapses || 0) + (!correct && prevWasMastered ? 1 : 0);
  const status = patch.forcedStatus || resolveStatus(correct, prevStreak);
  const mastery = computeMastery(correctCount, attempts, streak, lapses);
  const now = new Date();

  return {
    ...prev,
    key,
    type: patch.type || prev.type || LESSON_SRS_TYPES.LESSON_CONCEPT_TAG,
    content: clean(patch.content || prev.content || ''),
    label: clean(patch.label || prev.label || patch.content || ''),
    pillar: clean(patch.pillar || prev.pillar || ''),
    level: clean(patch.level || prev.level || 'A1'),
    attempts,
    correct: correctCount,
    wrong: wrongCount,
    streak,
    lapses,
    status,
    mastery,
    dueDate: patch.dueDate || dueDateFor(status, now),
    lastReviewedAt: now.toISOString(),
    meta: { ...(prev.meta || {}), ...(patch.meta || {}) },
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Registra tags e conceitos da aula no SRS avançado ao concluir uma lição.
 * Chamada em completeLesson() de progressStore.js.
 */
export function registerLessonTagsInSrs({ lesson, flowErrors = [], flowScore = null } = {}) {
  if (!lesson) return;
  const state = getLessonSrsState();
  const items = { ...state.items };
  const level = clean(lesson?.level || 'A1').toLowerCase();
  const lessonId = clean(lesson?.id || lesson?.curriculumId || lesson?.title || '');
  const lessonTitle = clean(lesson?.title || '');
  const basePillar = extractPillarFromTags(lesson?.tags);

  const errorPillars = new Set(
    (Array.isArray(flowErrors) ? flowErrors : [])
      .filter((e) => e?.status === 'warn' || e?.status === 'missed')
      .map(inferPillarFromFlowError)
  );

  // Use external tag map when lesson.tags lacks a pedagogical pillar at index 1 (A2→C2 pattern).
  const rawTags = Array.isArray(lesson?.tags) ? lesson.tags : [];
  const tags = hasPedagogicalTags(rawTags) ? rawTags : (getSrsTagsForLesson(lessonId) || rawTags);
  const effectivePillar = extractPillarFromTags(tags) || basePillar;

  // Register lesson tags (skip index 0 which is the level like 'a1')
  tags.slice(1).forEach((tag) => {
    const content = clean(tag);
    if (!content) return;
    const key = makeKey(LESSON_SRS_TYPES.LESSON_CONCEPT_TAG, content);
    const pillar = effectivePillar || content;
    const hasError = errorPillars.has(pillar) || errorPillars.has(content);
    const forcedStatus = hasError ? LESSON_SRS_STATUS.WEAK : LESSON_SRS_STATUS.LEARNING;
    items[key] = upsertItem(items, key, {
      type: LESSON_SRS_TYPES.LESSON_CONCEPT_TAG,
      content,
      label: content.replace(/-/g, ' '),
      pillar,
      level,
      correct: !hasError,
      forcedStatus,
      meta: { lessonId, lessonTitle, level, flowScore, registeredAt: new Date().toISOString() },
    });
  });

  // Register flow errors as ERROR_CONCEPT items (always WEAK)
  const errors = Array.isArray(flowErrors) ? flowErrors : [];
  errors.filter((e) => e?.status === 'warn' || e?.status === 'missed').forEach((err) => {
    const pillar = inferPillarFromFlowError(err);
    const phaseId = clean(err?.phaseId || err?.title || pillar);
    const content = `error::${pillar}::${phaseId}`;
    const key = makeKey(LESSON_SRS_TYPES.ERROR_CONCEPT, content);
    items[key] = upsertItem(items, key, {
      type: LESSON_SRS_TYPES.ERROR_CONCEPT,
      content,
      label: clean(err?.title || err?.prompt || phaseId).slice(0, 80),
      pillar,
      level,
      correct: false,
      forcedStatus: LESSON_SRS_STATUS.WEAK,
      meta: {
        lessonId,
        lessonTitle,
        level,
        prompt: clean(err?.prompt || '').slice(0, 200),
        expected: clean(err?.expected || '').slice(0, 200),
        value: clean(err?.value || '').slice(0, 200),
        registeredAt: new Date().toISOString(),
      },
    });
  });

  // Register objectives as LESSON_OBJECTIVE items
  const objectives = Array.isArray(lesson?.objectives) ? lesson.objectives : [];
  objectives.slice(0, 6).forEach((obj) => {
    const text = typeof obj === 'string' ? obj : clean(obj?.text || obj?.goal || obj?.title || '');
    if (!text || text.length < 4) return;
    const key = makeKey(LESSON_SRS_TYPES.LESSON_OBJECTIVE, `${lessonId}::${text}`);
    const hasError = errorPillars.size > 0;
    items[key] = upsertItem(items, key, {
      type: LESSON_SRS_TYPES.LESSON_OBJECTIVE,
      content: `${lessonId}::${text}`,
      label: text.slice(0, 100),
      pillar: effectivePillar,
      level,
      correct: !hasError,
      forcedStatus: hasError ? LESSON_SRS_STATUS.WEAK : LESSON_SRS_STATUS.LEARNING,
      meta: { lessonId, lessonTitle, level, registeredAt: new Date().toISOString() },
    });
  });

  writeState({ items });
}

/**
 * Retorna itens SRS do nivel de aula que estão vencidos (dueDate <= hoje).
 * Filtra opcionalmente por pillar e level.
 */
export function getDueReviewItems({ pillar, level, limit = 20 } = {}) {
  try {
    const today = localDateKey();
    const items = Object.values(getLessonSrsState().items);
    return items
      .filter((item) => !item.dueDate || item.dueDate <= today)
      .filter((item) => !pillar || item.pillar === pillar)
      .filter((item) => !level || item.level === level)
      .sort((a, b) => {
        if (a.status === LESSON_SRS_STATUS.WEAK && b.status !== LESSON_SRS_STATUS.WEAK) return -1;
        if (b.status === LESSON_SRS_STATUS.WEAK && a.status !== LESSON_SRS_STATUS.WEAK) return 1;
        const dateCompare = String(a.dueDate || '').localeCompare(String(b.dueDate || ''));
        if (dateCompare !== 0) return dateCompare;
        return Number(a.mastery || 0) - Number(b.mastery || 0);
      })
      .slice(0, Math.max(0, Number(limit || 20)));
  } catch { return []; }
}

/**
 * Agenda manualmente um item no SRS com data específica.
 * Útil para testes e integrações externas.
 */
export function scheduleReviewItem({ type, content, label, level, pillar, dueDate } = {}) {
  if (!type || !content) return null;
  try {
    const key = makeKey(type, content);
    const state = getLessonSrsState();
    const items = { ...state.items };
    const prev = items[key] || {};
    const now = new Date();
    items[key] = {
      key,
      type: clean(type),
      content: clean(content),
      label: clean(label || content),
      pillar: clean(pillar || prev.pillar || ''),
      level: clean(level || prev.level || 'A1'),
      attempts: Number(prev.attempts || 0),
      correct: Number(prev.correct || 0),
      wrong: Number(prev.wrong || 0),
      streak: Number(prev.streak || 0),
      lapses: Number(prev.lapses || 0),
      status: prev.status || LESSON_SRS_STATUS.LEARNING,
      mastery: Number(prev.mastery || 50),
      dueDate: dueDate || dueDateFor(LESSON_SRS_STATUS.LEARNING, now),
      lastReviewedAt: now.toISOString(),
      meta: prev.meta || {},
    };
    writeState({ items });
    return items[key];
  } catch { return null; }
}

/**
 * Registra o resultado de uma revisão avulsa (fora do fluxo de aula).
 */
export function recordReviewResult({ key, correct } = {}) {
  if (!key) return null;
  try {
    const state = getLessonSrsState();
    const items = { ...state.items };
    if (!items[key]) return null;
    items[key] = upsertItem(items, key, { correct: Boolean(correct), ...items[key] });
    writeState({ items });
    return items[key];
  } catch { return null; }
}

/**
 * Retorna itens de revisão pós-aula baseados no conteúdo recém-estudado.
 * Prioriza conceitos com erros (WEAK), depois novos (LEARNING).
 */
export function getPostLessonReview({ lesson, flowErrors = [], limit = 10 } = {}) {
  try {
    const lessonId = clean(lesson?.id || lesson?.curriculumId || lesson?.title || '');
    if (!lessonId) return { items: [], hasReview: false, message: 'Aula sem identificador.' };

    const allItems = Object.values(getLessonSrsState().items);
    const lessonItems = allItems.filter(
      (item) => item.meta?.lessonId === lessonId &&
        (item.status === LESSON_SRS_STATUS.WEAK || item.status === LESSON_SRS_STATUS.LEARNING)
    );

    const sorted = lessonItems.sort((a, b) => {
      if (a.status === LESSON_SRS_STATUS.WEAK && b.status !== LESSON_SRS_STATUS.WEAK) return -1;
      if (b.status === LESSON_SRS_STATUS.WEAK && a.status !== LESSON_SRS_STATUS.WEAK) return 1;
      return Number(a.mastery || 0) - Number(b.mastery || 0);
    }).slice(0, Math.max(0, Number(limit || 10)));

    const errorCount = (Array.isArray(flowErrors) ? flowErrors : []).filter(
      (e) => e?.status === 'warn' || e?.status === 'missed'
    ).length;

    const message = sorted.length
      ? `${sorted.length} conceito(s) desta aula para revisar${errorCount ? ` (${errorCount} erro(s) detectado(s))` : ''}.`
      : 'Ótimo desempenho! Sem itens críticos para revisão imediata.';

    return { items: sorted, hasReview: sorted.length > 0, lessonId, errorCount, message };
  } catch { return { items: [], hasReview: false, message: 'Sem dados de revisão.' }; }
}

/**
 * Retorna fila de revisão diária adaptativa.
 * Combina itens vencidos do SRS de aula + SRS de prática profunda.
 * Prioriza: WEAK → overdue → mastery ascendente.
 */
export function getDailyAdaptiveReview({ pillar, level, limit = 20 } = {}) {
  try {
    const lessonDue = getDueReviewItems({ pillar, level, limit: Number(limit) });
    const practiceDue = getDuePracticeSrsItems({ skill: pillar, limit: Math.ceil(Number(limit) / 2) });

    const seen = new Set();
    const merged = [];

    for (const item of lessonDue) {
      const k = item.key || `${item.type}::${item.content}`;
      if (!seen.has(k)) { seen.add(k); merged.push({ ...item, source: 'lesson' }); }
    }
    for (const item of practiceDue) {
      const k = item.key || `${item.type}::${item.content}`;
      if (!seen.has(k)) { seen.add(k); merged.push({ ...item, source: 'practice' }); }
    }

    merged.sort((a, b) => {
      if (a.status === LESSON_SRS_STATUS.WEAK && b.status !== LESSON_SRS_STATUS.WEAK) return -1;
      if (b.status === LESSON_SRS_STATUS.WEAK && a.status !== LESSON_SRS_STATUS.WEAK) return 1;
      const dateCompare = String(a.dueDate || '').localeCompare(String(b.dueDate || ''));
      if (dateCompare !== 0) return dateCompare;
      return Number(a.mastery || 0) - Number(b.mastery || 0);
    });

    const result = merged.slice(0, Math.max(0, Number(limit || 20)));
    const hasReview = result.length > 0;
    const message = hasReview
      ? `${result.length} item(ns) para revisão hoje.`
      : 'Nenhuma revisão pendente para hoje. Continue com a próxima aula!';

    return { items: result, hasReview, total: result.length, message };
  } catch { return { items: [], hasReview: false, total: 0, message: 'Sem revisões disponíveis.' }; }
}

/**
 * Retorna conceitos fracos (WEAK ou LEARNING) agrupados por pilar.
 */
export function getWeakConcepts({ pillar, limit = 12 } = {}) {
  try {
    const items = Object.values(getLessonSrsState().items)
      .filter((item) => item.status === LESSON_SRS_STATUS.WEAK || item.status === LESSON_SRS_STATUS.LEARNING)
      .filter((item) => !pillar || item.pillar === pillar)
      .sort((a, b) => Number(a.mastery || 0) - Number(b.mastery || 0));

    const byPillar = {};
    for (const item of items) {
      const p = item.pillar || 'general';
      if (!byPillar[p]) byPillar[p] = [];
      if (byPillar[p].length < Number(limit || 12)) byPillar[p].push(item);
    }

    const flat = items.slice(0, Math.max(0, Number(limit || 12)));

    return {
      items: flat,
      byPillar,
      total: flat.length,
      hasConcepts: flat.length > 0,
    };
  } catch { return { items: [], byPillar: {}, total: 0, hasConcepts: false }; }
}

/**
 * Retorna estatísticas consolidadas de todos os sistemas SRS.
 * Combina lessonSrsAdvanced + practiceSrsExtended + vocabularySrs.
 */
export function getReviewStats() {
  try {
    const today = localDateKey();
    const lessonItems = Object.values(getLessonSrsState().items);
    const lessonDue = lessonItems.filter((item) => !item.dueDate || item.dueDate <= today);
    const lessonWeak = lessonItems.filter((item) => item.status === LESSON_SRS_STATUS.WEAK);
    const lessonMastered = lessonItems.filter((item) => item.status === LESSON_SRS_STATUS.MASTERED);

    const byPillar = {};
    const byLevel = {};
    for (const item of lessonItems) {
      const p = item.pillar || 'general';
      const l = item.level || 'a1';
      if (!byPillar[p]) byPillar[p] = { total: 0, due: 0, weak: 0, mastered: 0 };
      if (!byLevel[l]) byLevel[l] = { total: 0, due: 0, weak: 0 };
      byPillar[p].total += 1;
      byLevel[l].total += 1;
      if (!item.dueDate || item.dueDate <= today) { byPillar[p].due += 1; byLevel[l].due += 1; }
      if (item.status === LESSON_SRS_STATUS.WEAK) { byPillar[p].weak += 1; byLevel[l].weak += 1; }
      if (item.status === LESSON_SRS_STATUS.MASTERED) byPillar[p].mastered += 1;
    }

    let practiceSummary = { total: 0, dueToday: 0, weak: 0, mastered: 0, byType: {} };
    let vocabularySummary = { total: 0, dueToday: 0, weak: 0, mastered: 0, averageMastery: 0 };
    try { practiceSummary = getPracticeSrsSummary(); } catch { /* non-blocking */ }
    try { vocabularySummary = getVocabularySrsSummary(); } catch { /* non-blocking */ }

    return {
      lessonSrs: {
        total: lessonItems.length,
        dueToday: lessonDue.length,
        weak: lessonWeak.length,
        mastered: lessonMastered.length,
        byPillar,
        byLevel,
      },
      practiceSrs: practiceSummary,
      vocabularySrs: vocabularySummary,
      combined: {
        totalItems: lessonItems.length + practiceSummary.total + vocabularySummary.total,
        dueToday: lessonDue.length + practiceSummary.dueToday + vocabularySummary.dueToday,
        weak: lessonWeak.length + practiceSummary.weak + vocabularySummary.weak,
        mastered: lessonMastered.length + practiceSummary.mastered + vocabularySummary.mastered,
      },
      generatedAt: new Date().toISOString(),
    };
  } catch {
    return {
      lessonSrs: { total: 0, dueToday: 0, weak: 0, mastered: 0, byPillar: {}, byLevel: {} },
      practiceSrs: { total: 0, dueToday: 0, weak: 0, mastered: 0, byType: {} },
      vocabularySrs: { total: 0, dueToday: 0, weak: 0, mastered: 0, averageMastery: 0 },
      combined: { totalItems: 0, dueToday: 0, weak: 0, mastered: 0 },
      generatedAt: new Date().toISOString(),
    };
  }
}
