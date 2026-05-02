import { diagnostics } from './diagnostics.js';
import { markCurriculumLessonComplete } from './curriculumPlan.js';
import { normalizeLesson } from './lessonTypes.js';
import { storage } from './storage.js';

const CURRENT_LESSON_KEY = 'lesson.current';
const LESSON_HISTORY_KEY = 'lesson.history';
const LESSON_DRAFT_PROMPT_KEY = 'lesson.promptDraft';
const LAST_GENERATION_STATUS_KEY = 'lesson.lastGenerationStatus';
const COMPARISON_HISTORY_KEY = 'lesson.comparisonRuns';
const RAW_PREFIX = 'fluency.clean.';

function makeGenerationId(date = new Date()) {
  return `gen-${date.toISOString().replace(/[-:TZ.]/g, '').slice(0, 14)}-${Math.random().toString(36).slice(2, 6)}`;
}

function lessonTime(lesson) {
  const candidates = [lesson?.generationMeta?.savedAt, lesson?.savedAt, lesson?.generationMeta?.generatedAt, lesson?.updatedAt, lesson?.createdAt];
  return candidates.map((value) => Date.parse(value || '')).find((value) => Number.isFinite(value)) || 0;
}

function shortText(value, max) {
  const text = String(value || '');
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

function countWords(value) {
  return String(value || '').trim().split(/\s+/).filter(Boolean).length;
}

function stableHash(value) {
  const text = String(value || '');
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

function buildLessonSignature(lesson) {
  const normalized = normalizeLesson(lesson);
  const sectionWordCounts = normalized.sections.map((section) => countWords(section?.content));
  const sectionHashes = normalized.sections.map((section) => stableHash(`${section?.title || ''}\n${section?.content || ''}`));
  const fullText = [
    normalized.title,
    normalized.intro,
    normalized.objective,
    normalized.focus,
    ...normalized.sections.map((section) => `${section.title}\n${section.content}`),
    ...normalized.vocabulary.map((item) => `${item.word}:${item.meaning}:${item.example}`),
    ...normalized.exercises.map((item) => `${item.question}:${item.answer}:${item.explanation}`),
    ...normalized.prompts,
  ].join('\n');
  return {
    hash: stableHash(fullText),
    title: normalized.title,
    type: normalized.type,
    level: normalized.level,
    sectionCount: normalized.sections.length,
    sectionWordCounts,
    sectionHashes,
    vocabularyCount: normalized.vocabulary.length,
    exerciseCount: normalized.exercises.length,
    promptCount: normalized.prompts.length,
    totalSectionWords: sectionWordCounts.reduce((sum, value) => sum + value, 0),
  };
}

function compactReview(review = {}, maxIssues = 5) {
  if (!review || typeof review !== 'object') return null;
  return {
    approved: Boolean(review.approved),
    overallScore: Number(review.overallScore || review.finalScore || 0),
    finalScore: Number(review.finalScore || review.overallScore || 0),
    label: shortText(review.label || '', 120),
    advice: shortText(review.advice || review.message || '', 420),
    issues: Array.isArray(review.issues) ? review.issues.slice(0, maxIssues).map((item) => shortText(item, 180)) : [],
    strengths: Array.isArray(review.strengths) ? review.strengths.slice(0, maxIssues).map((item) => shortText(item, 160)) : [],
    missing: Array.isArray(review.missing) ? review.missing.slice(0, maxIssues).map((item) => shortText(item, 160)) : [],
    criticalIssues: Array.isArray(review.criticalIssues) ? review.criticalIssues.slice(0, maxIssues).map((item) => shortText(item, 180)) : [],
    status: review.status || '',
  };
}

function compactLessonPlan(plan = {}) {
  if (!plan || typeof plan !== 'object') return null;
  return {
    contract: plan.contract || '',
    lessonType: plan.lessonType || plan.type || '',
    level: plan.level || '',
    profile: plan.profile || '',
    objective: shortText(plan.objective || '', 280),
    focus: shortText(plan.focus || '', 240),
  };
}

function stripStorageHeavyFields(lesson, mode = 'normal') {
  const base = normalizeLesson(lesson);
  const sectionLimit = mode === 'ultra' ? 520 : mode === 'emergency' ? 980 : 1700;
  const introLimit = mode === 'ultra' ? 420 : mode === 'emergency' ? 700 : 1200;
  const maxVocabulary = mode === 'ultra' ? 8 : mode === 'emergency' ? 14 : 22;
  const maxExercises = mode === 'ultra' ? 8 : mode === 'emergency' ? 14 : 22;
  const maxPrompts = mode === 'ultra' ? 5 : mode === 'emergency' ? 7 : 10;
  return {
    id: base.id,
    curriculumId: base.curriculumId,
    curriculumTitle: base.curriculumTitle,
    expectedTitle: base.expectedTitle,
    type: base.type,
    level: base.level,
    title: base.title,
    intro: shortText(base.intro, introLimit),
    objective: shortText(base.objective, mode === 'ultra' ? 240 : 520),
    focus: shortText(base.focus, mode === 'ultra' ? 220 : 520),
    unitTitle: base.unitTitle,
    category: base.category,
    checkpoint: base.checkpoint,
    pillars: Array.isArray(base.pillars) ? base.pillars.slice(0, 6) : [],
    prerequisites: Array.isArray(base.prerequisites) ? base.prerequisites.slice(0, 8).map((item) => shortText(item, 120)) : [],
    listeningText: shortText(base.listeningText, mode === 'ultra' ? 600 : mode === 'emergency' ? 1400 : 2800),
    sections: Array.isArray(base.sections) ? base.sections.slice(0, 10).map((section) => ({
      title: shortText(section?.title, 140),
      content: shortText(section?.content, sectionLimit),
      sectionContract: section?.sectionContract || '',
      wordCount: Number(section?.wordCount || countWords(section?.content)),
    })) : [],
    tips: Array.isArray(base.tips) ? base.tips.slice(0, mode === 'ultra' ? 4 : 8).map((item) => shortText(item, 160)) : [],
    vocabulary: Array.isArray(base.vocabulary) ? base.vocabulary.slice(0, maxVocabulary).map((item) => ({
      word: shortText(item?.word, 80),
      meaning: shortText(item?.meaning, 130),
      example: shortText(item?.example, 170),
    })) : [],
    exercises: Array.isArray(base.exercises) ? base.exercises.slice(0, maxExercises).map((item) => ({
      question: shortText(item?.question, 220),
      options: Array.isArray(item?.options) ? item.options.slice(0, 4).map((option) => shortText(option, 120)) : [],
      answer: shortText(item?.answer, 120),
      explanation: shortText(item?.explanation, 220),
    })) : [],
    prompts: Array.isArray(base.prompts) ? base.prompts.slice(0, maxPrompts).map((item) => shortText(item, 240)) : [],
    lessonPlan: mode === 'ultra' ? null : compactLessonPlan(lesson?.lessonPlan),
    pedagogicalReview: compactReview(lesson?.pedagogicalReview || lesson?.quality, mode === 'ultra' ? 3 : 5),
    teacherReview: compactReview(lesson?.teacherReview, mode === 'ultra' ? 3 : 5),
    studyReadiness: compactReview(lesson?.studyReadiness, mode === 'ultra' ? 3 : 5),
    quality: undefined,
    grammarSectionContract: lesson?.grammarSectionContract || '',
    planContract: shortText(lesson?.planContract || '', 500),
    lessonSignature: buildLessonSignature(lesson),
  };
}

function verifySavedLesson(expected) {
  const saved = storage.get(CURRENT_LESSON_KEY, null);
  const expectedGen = expected?.generationMeta?.id || '';
  const savedGen = saved?.generationMeta?.id || '';
  return Boolean(saved && expectedGen && savedGen === expectedGen);
}

function preserveRawValue(rawKey) {
  try {
    return window.localStorage.getItem(rawKey);
  } catch {
    return null;
  }
}

function restoreRawValue(rawKey, value) {
  try {
    if (value === null || typeof value === 'undefined') window.localStorage.removeItem(rawKey);
    else window.localStorage.setItem(rawKey, value);
  } catch {}
}

function purgeFluencyStorageForLessonSave() {
  const preserveNames = [
    'user.profile',
    'settings',
    'lesson.keys',
    'lesson.groq.key',
    'lesson.groq.model',
    'lesson.cerebras.key',
    'lesson.cerebras.model',
    'lesson.external.forceNext',
    'lesson.promptDraft',
  ];
  const rawPreserveKeys = preserveNames.map((name) => `${RAW_PREFIX}${name}`);
  const preserved = rawPreserveKeys.map((rawKey) => [rawKey, preserveRawValue(rawKey)]);

  try {
    const toRemove = [];
    for (let index = 0; index < window.localStorage.length; index += 1) {
      const rawKey = window.localStorage.key(index);
      if (rawKey && rawKey.startsWith(RAW_PREFIX)) toRemove.push(rawKey);
    }
    toRemove.forEach((rawKey) => window.localStorage.removeItem(rawKey));
    preserved.forEach(([rawKey, value]) => restoreRawValue(rawKey, value));
    diagnostics.log(`Cache local Fluency limpo para liberar storage: ${toRemove.length} chave(s) removida(s), configurações essenciais preservadas.`, 'warn');
  } catch (error) {
    diagnostics.log(`Falha ao limpar cache local Fluency: ${error?.message || error}`, 'warn');
  }
}

function persistCurrentLesson(payload) {
  const normal = { ...stripStorageHeavyFields(payload, 'normal'), generationMeta: payload.generationMeta };
  storage.set(CURRENT_LESSON_KEY, normal);
  if (verifySavedLesson(normal)) return { ok: true, payload: normal, compacted: false };

  diagnostics.log('Storage recusou a aula completa. Limpando histórico e tentando novamente.', 'warn');
  storage.remove(LESSON_HISTORY_KEY);
  storage.set(CURRENT_LESSON_KEY, normal);
  if (verifySavedLesson(normal)) return { ok: true, payload: normal, compacted: false };

  const emergency = { ...stripStorageHeavyFields(payload, 'emergency'), generationMeta: { ...payload.generationMeta, compactedForStorage: true } };
  diagnostics.log('Storage ainda recusou. Tentando salvar versão compacta da aula.', 'warn');
  storage.set(CURRENT_LESSON_KEY, emergency);
  if (verifySavedLesson(emergency)) return { ok: true, payload: emergency, compacted: true };

  const ultra = { ...stripStorageHeavyFields(payload, 'ultra'), generationMeta: { ...payload.generationMeta, compactedForStorage: true, ultraCompactedForStorage: true } };
  diagnostics.log('Storage recusou a versão compacta. Limpando cache antigo e tentando versão ultra compacta.', 'warn');
  purgeFluencyStorageForLessonSave();
  storage.set(CURRENT_LESSON_KEY, ultra);
  if (verifySavedLesson(ultra)) return { ok: true, payload: ultra, compacted: true, emergency: true };

  return { ok: false, payload: ultra, compacted: true, emergency: true };
}

function findHistoryLessonByStatus(history = [], status = null) {
  if (!Array.isArray(history) || !status) return null;
  return history.find((lesson) => lesson?.generationMeta?.id === status.id)
    || history.find((lesson) => lesson?.id === status.lessonId || lesson?.curriculumId === status.lessonId)
    || history.find((lesson) => lesson?.title === status.lessonTitle || lesson?.expectedTitle === status.lessonTitle)
    || null;
}

function getFreshestLessonRaw() {
  const current = storage.get(CURRENT_LESSON_KEY, null);
  const history = storage.get(LESSON_HISTORY_KEY, []);
  const latestHistory = Array.isArray(history) ? history[0] : null;
  const statusLesson = findHistoryLessonByStatus(history, storage.get(LAST_GENERATION_STATUS_KEY, null));

  if (statusLesson && (!current || lessonTime(statusLesson) >= lessonTime(current) || statusLesson?.generationMeta?.id !== current?.generationMeta?.id)) {
    storage.set(CURRENT_LESSON_KEY, statusLesson);
    diagnostics.log(`Aula atual sincronizada pelo último status salvo: ${statusLesson.title || 'sem título'}`, 'info');
    return statusLesson;
  }

  if (!current) return latestHistory || null;
  if (latestHistory && lessonTime(latestHistory) > lessonTime(current) && latestHistory?.generationMeta?.id !== current?.generationMeta?.id) {
    storage.set(CURRENT_LESSON_KEY, latestHistory);
    diagnostics.log(`Aula atual sincronizada com histórico mais recente: ${latestHistory.title || 'sem título'}`, 'info');
    return latestHistory;
  }
  return current;
}

function notifyLessonUpdated(lesson, status) {
  try {
    window.dispatchEvent(new CustomEvent('fluency:lesson-updated', { detail: { lessonId: lesson?.id || '', lessonTitle: lesson?.title || '', generationId: lesson?.generationMeta?.id || '', status: status?.event || status?.message || 'saved', savedAt: lesson?.generationMeta?.savedAt || new Date().toISOString() } }));
  } catch {}
}

function recordComparisonRun(payload, status) {
  const signature = payload?.lessonSignature || buildLessonSignature(payload);
  const provider = payload?.providerFallback?.provider || payload?.generationMeta?.provider || payload?.generationMeta?.source || 'gemini';
  const model = payload?.providerFallback?.model || payload?.generationMeta?.model || '';
  const comparison = {
    id: payload?.generationMeta?.id || makeGenerationId(),
    title: payload?.title || '',
    provider,
    model,
    score: Number(payload?.generationMeta?.pedagogicalScore || status?.pedagogicalScore || 0),
    hash: signature.hash,
    sectionWordCounts: signature.sectionWordCounts,
    sectionHashes: signature.sectionHashes,
    totalSectionWords: signature.totalSectionWords,
    vocabularyCount: signature.vocabularyCount,
    exerciseCount: signature.exerciseCount,
    savedAt: payload?.generationMeta?.savedAt || new Date().toISOString(),
  };
  const history = storage.get(COMPARISON_HISTORY_KEY, []);
  const next = [comparison, ...(Array.isArray(history) ? history : [])].slice(0, 9);
  storage.set(COMPARISON_HISTORY_KEY, next);
  diagnostics.log(`Assinatura da aula: ${comparison.hash} · ${comparison.provider}${comparison.model ? `/${comparison.model}` : ''} · sections ${comparison.sectionWordCounts.join('/')}.`, 'info');
}

export function getLessonComparisonRuns() {
  return storage.get(COMPARISON_HISTORY_KEY, []);
}

export function getCurrentLesson() {
  const lesson = getFreshestLessonRaw();
  return lesson ? normalizeLesson(lesson) : null;
}

export function getCurrentLessonRaw() {
  return getFreshestLessonRaw();
}

export function getLastGenerationStatus() {
  return storage.get(LAST_GENERATION_STATUS_KEY, null);
}

export function saveGenerationStatus(status = {}) {
  const payload = { id: status.id || makeGenerationId(), event: status.event || 'unknown', message: status.message || '', lessonId: status.lessonId || '', lessonTitle: status.lessonTitle || '', contractVersion: shortText(status.contractVersion || '', 700), pedagogicalScore: Number(status.pedagogicalScore || 0), source: status.source || 'unknown', variationMode: Boolean(status.variationMode), generationSeed: status.generationSeed || '', createdAt: status.createdAt || new Date().toISOString() };
  storage.set(LAST_GENERATION_STATUS_KEY, payload);
  return payload;
}

export function saveCurrentLesson(lesson, meta = {}) {
  const now = new Date();
  const previous = storage.get(CURRENT_LESSON_KEY, null);
  const normalized = normalizeLesson(lesson);
  const generationMeta = {
    id: meta.generationId || lesson?.generationMeta?.id || makeGenerationId(now),
    source: meta.source || lesson?.generationMeta?.source || 'generated',
    provider: lesson?.providerFallback?.provider || meta.provider || '',
    model: lesson?.providerFallback?.model || meta.model || '',
    status: meta.status || lesson?.generationMeta?.status || 'new',
    generatedAt: meta.generatedAt || lesson?.generationMeta?.generatedAt || now.toISOString(),
    savedAt: now.toISOString(),
    contractVersion: shortText(meta.contractVersion || lesson?.generationMeta?.contractVersion || lesson?.quality?.contractVersion || 'lesson-contract-v1', 900),
    pedagogicalScore: Number(meta.pedagogicalScore || lesson?.pedagogicalReview?.overallScore || lesson?.teacherReview?.finalScore || lesson?.quality?.pedagogicalScore || 0),
    autoRepaired: Boolean(meta.autoRepaired || lesson?.pedagogicalReview?.autoRepaired),
    variationMode: Boolean(meta.variationMode || lesson?.variationMode || lesson?.generationMeta?.variationMode),
    generationSeed: meta.generationSeed || lesson?.generationSeed || lesson?.generationMeta?.generationSeed || '',
    replacedPreviousLessonId: previous?.id || '',
    replacedPreviousGenerationId: previous?.generationMeta?.id || '',
  };

  const persisted = persistCurrentLesson({ ...normalized, ...lesson, generationMeta });
  if (!persisted.ok) {
    const status = saveGenerationStatus({ id: generationMeta.id, event: 'storage-failed', message: 'Aula gerada, mas não foi possível gravar a aula atual no armazenamento local.', lessonId: normalized.id, lessonTitle: normalized.title, contractVersion: generationMeta.contractVersion, pedagogicalScore: generationMeta.pedagogicalScore, source: generationMeta.source, createdAt: generationMeta.generatedAt });
    diagnostics.log('Falha crítica: a aula não foi persistida como lesson.current. Status saved não foi gravado.', 'error');
    notifyLessonUpdated(null, status);
    return normalized;
  }

  const payload = persisted.payload;
  if (persisted.compacted) diagnostics.log(persisted.emergency ? 'Aula salva em modo ultra compacto para caber no armazenamento local.' : 'Aula salva em modo compacto para caber no armazenamento local.', 'warn');

  storage.set(LESSON_HISTORY_KEY, []);
  const status = saveGenerationStatus({ id: payload.generationMeta.id, event: 'saved', message: payload.generationMeta.variationMode ? 'Nova versão diferente gerada e salva.' : payload.generationMeta.status === 'new' ? 'Nova aula gerada e salva.' : 'Aula salva.', lessonId: payload.id, lessonTitle: payload.title, contractVersion: payload.generationMeta.contractVersion, pedagogicalScore: payload.generationMeta.pedagogicalScore, source: payload.generationMeta.source, variationMode: payload.generationMeta.variationMode, generationSeed: payload.generationMeta.generationSeed, createdAt: payload.generationMeta.generatedAt });
  recordComparisonRun(payload, status);
  diagnostics.log(`Aula salva: ${payload.title} · ${payload.generationMeta.id}${payload.generationMeta.variationMode ? ' · variação real' : ''}`, 'info');
  notifyLessonUpdated(payload, status);
  return payload;
}

export function completeCurrentLessonInCurriculum(lesson) {
  return markCurriculumLessonComplete(lesson);
}

export function clearCurrentLesson() {
  storage.remove(CURRENT_LESSON_KEY);
  const status = saveGenerationStatus({ event: 'cleared', message: 'Aula atual removida para gerar uma nova.', source: 'manual' });
  diagnostics.log('Aula atual removida.', 'info');
  notifyLessonUpdated(null, status);
}

export function getLessonHistory() {
  return storage.get(LESSON_HISTORY_KEY, []).map(normalizeLesson);
}

export function getLessonPromptDraft() {
  return storage.getText(LESSON_DRAFT_PROMPT_KEY, 'Gerar a próxima aula do cronograma Fluency automaticamente, respeitando pré-requisitos, nível atual e ordem pedagógica.');
}

export function saveLessonPromptDraft(prompt) {
  storage.setText(LESSON_DRAFT_PROMPT_KEY, prompt);
  return prompt;
}
