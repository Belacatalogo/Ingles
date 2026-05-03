const STORAGE_KEY = 'fluency.practiceMasteryTags.v1';
const DECAY_RUN_KEY = 'fluency.practiceMasteryTags.lastDecayDate.v1';

export const TAG_DOMAIN = Object.freeze({
  GRAMMAR: 'grammar',
  VOCABULARY: 'vocabulary',
  PRONUNCIATION: 'pronunciation',
  LISTENING_SKILL: 'listening_skill',
  READING_SKILL: 'reading_skill',
  WRITING_SKILL: 'writing_skill',
});

export const MASTERY_BANDS = Object.freeze([
  { min: 0, max: 30, label: 'Iniciando', color: '#8B0000' },
  { min: 31, max: 55, label: 'Frágil', color: '#B8860B' },
  { min: 56, max: 75, label: 'Em prática', color: '#1F8FFF' },
  { min: 76, max: 90, label: 'Forte', color: '#0AAA62' },
  { min: 91, max: 100, label: 'Dominado', color: '#0F4F2C' },
]);

const READABLE_READING_SKILLS = Object.freeze({
  main_idea: 'Ideia principal',
  detail: 'Detalhes do texto',
  vocabulary_context: 'Vocabulário em contexto',
  sequence: 'Sequência de ideias',
  evidence: 'Evidência textual',
  inference: 'Inferência',
  author_purpose: 'Objetivo do autor',
  fact_opinion: 'Fato e opinião',
  tone: 'Tom do texto',
  implication: 'Implicação',
  critical_response: 'Resposta crítica',
});

const READABLE_LISTENING_SKILLS = Object.freeze({
  gist_listening: 'Ideia geral ao ouvir',
  detail_listening: 'Detalhes ao ouvir',
  linking_t_y: 'Ligação t + y',
  linking_n_t: 'Ligação n + t',
  weak_forms: 'Weak forms',
  numbers_dates_listening: 'Números e datas',
  polite_intent_listening: 'Intenção educada',
});

const READABLE_WRITING_SKILLS = Object.freeze({
  sentence_structure: 'Estrutura de frase',
  paragraph_cohesion: 'Coesão de parágrafo',
  linking_words: 'Conectores',
  punctuation_basics: 'Pontuação básica',
  email_format: 'Formato de e-mail',
  opinion_format: 'Texto de opinião',
  summary_format: 'Resumo',
});

function safeJsonParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function readState() {
  if (typeof window === 'undefined') return { tags: {} };
  return safeJsonParse(window.localStorage.getItem(STORAGE_KEY), { tags: {} });
}

function writeState(state) {
  if (typeof window === 'undefined') return state;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return state;
}

function clean(value) {
  return String(value ?? '').trim();
}

function clampMastery(value) {
  return Math.max(0, Math.min(100, Math.round(Number(value || 0))));
}

function normalizeDomain(domain) {
  const cleanDomain = clean(domain);
  return Object.values(TAG_DOMAIN).includes(cleanDomain) ? cleanDomain : TAG_DOMAIN.GRAMMAR;
}

function todayKey() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function readableReadingSkill(tag) {
  return READABLE_READING_SKILLS[tag] || clean(tag).replace(/_/g, ' ');
}

export function readableListeningSkill(tag) {
  return READABLE_LISTENING_SKILLS[tag] || clean(tag).replace(/_/g, ' ');
}

export function readableWritingSkill(tag) {
  return READABLE_WRITING_SKILLS[tag] || clean(tag).replace(/_/g, ' ');
}

export function updateMasteryTag({ tag, domain, label, correct } = {}) {
  const safeTag = clean(tag);
  if (!safeTag) return null;

  const now = new Date().toISOString();
  const state = readState();
  const tags = { ...(state.tags || {}) };
  const previous = tags[safeTag] || {
    tag: safeTag,
    domain: normalizeDomain(domain),
    label: clean(label || safeTag),
    mastery: 50,
    attempts: 0,
    correct: 0,
    firstSeen: now,
  };

  const currentMastery = clampMastery(previous.mastery);
  const newMastery = correct
    ? clampMastery(currentMastery + (100 - currentMastery) * 0.15)
    : clampMastery(currentMastery - currentMastery * 0.08);

  tags[safeTag] = {
    ...previous,
    label: clean(label || previous.label || safeTag),
    domain: normalizeDomain(domain || previous.domain),
    mastery: newMastery,
    attempts: Number(previous.attempts || 0) + 1,
    correct: Number(previous.correct || 0) + (correct ? 1 : 0),
    lastUpdate: now,
  };

  writeState({ tags });
  return tags[safeTag];
}

export function applyMasteryDecay() {
  const state = readState();
  const tags = { ...(state.tags || {}) };
  const now = Date.now();
  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

  for (const key of Object.keys(tags)) {
    const tag = tags[key];
    const last = tag.lastUpdate ? new Date(tag.lastUpdate).getTime() : now;
    if (now - last > THIRTY_DAYS) {
      tags[key] = {
        ...tag,
        mastery: clampMastery(Number(tag.mastery) * 0.95),
        lastDecayAt: new Date().toISOString(),
      };
    }
  }

  writeState({ tags });
  return tags;
}

export function applyMasteryDecayOncePerDay() {
  if (typeof window === 'undefined') return {};
  const today = todayKey();
  if (window.localStorage.getItem(DECAY_RUN_KEY) === today) return readState().tags || {};
  const tags = applyMasteryDecay();
  window.localStorage.setItem(DECAY_RUN_KEY, today);
  return tags;
}

export function getMasteryTag(tag) {
  const state = readState();
  return state.tags?.[tag] || null;
}

export function listMasteryTags({ domain, sortBy = 'mastery', limit = 50 } = {}) {
  const state = readState();
  const all = Object.values(state.tags || {});
  const filtered = domain ? all.filter((item) => item.domain === domain) : all;

  if (sortBy === 'mastery') filtered.sort((a, b) => Number(a.mastery) - Number(b.mastery));
  if (sortBy === 'mastery_desc') filtered.sort((a, b) => Number(b.mastery) - Number(a.mastery));
  if (sortBy === 'recent') filtered.sort((a, b) => String(b.lastUpdate || '').localeCompare(String(a.lastUpdate || '')));

  return filtered.slice(0, Math.max(0, Number(limit || 50)));
}

export function getMasterySummary() {
  const state = readState();
  const all = Object.values(state.tags || {});
  const byDomain = {};

  for (const tag of all) {
    if (!byDomain[tag.domain]) byDomain[tag.domain] = { total: 0, sum: 0, weak: 0, strong: 0 };
    byDomain[tag.domain].total += 1;
    byDomain[tag.domain].sum += Number(tag.mastery || 0);
    if (Number(tag.mastery || 0) <= 55) byDomain[tag.domain].weak += 1;
    if (Number(tag.mastery || 0) >= 76) byDomain[tag.domain].strong += 1;
  }

  for (const domain of Object.keys(byDomain)) {
    byDomain[domain].average = byDomain[domain].total > 0
      ? Math.round(byDomain[domain].sum / byDomain[domain].total)
      : 0;
  }

  return {
    totalTags: all.length,
    weakTags: all.filter((tag) => Number(tag.mastery || 0) <= 55),
    strongTags: all.filter((tag) => Number(tag.mastery || 0) >= 76),
    byDomain,
  };
}

export function getMasteryBand(value) {
  const v = Number(value || 0);
  return MASTERY_BANDS.find((band) => v >= band.min && v <= band.max) || MASTERY_BANDS[0];
}
