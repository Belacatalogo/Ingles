import { diagnostics } from './diagnostics.js';
import { markCurriculumLessonComplete } from './curriculumPlan.js';
import { normalizeLesson } from './lessonTypes.js';
import { storage } from './storage.js';

const CURRENT_LESSON_KEY = 'lesson.current';
const LESSON_HISTORY_KEY = 'lesson.history';
const LESSON_DRAFT_PROMPT_KEY = 'lesson.promptDraft';
const LAST_GENERATION_STATUS_KEY = 'lesson.lastGenerationStatus';

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

function compactReview(review = {}, maxIssues = 8) {
  if (!review || typeof review !== 'object') return review;
  return {
    approved: Boolean(review.approved),
    overallScore: Number(review.overallScore || review.finalScore || 0),
    finalScore: Number(review.finalScore || review.overallScore || 0),
    label: shortText(review.label || '', 160),
    advice: shortText(review.advice || review.message || '', 700),
    issues: Array.isArray(review.issues) ? review.issues.slice(0, maxIssues).map((item) => shortText(item, 260)) : [],
    strengths: Array.isArray(review.strengths) ? review.strengths.slice(0, maxIssues).map((item) => shortText(item, 220)) : [],
    missing: Array.isArray(review.missing) ? review.missing.slice(0, maxIssues).map((item) => shortText(item, 220)) : [],
    criticalIssues: Array.isArray(review.criticalIssues) ? review.criticalIssues.slice(0, maxIssues).map((item) => shortText(item, 260)) : [],
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
    objective: shortText(plan.objective || '', 500),
    focus: shortText(plan.focus || '', 420),
    constraints: Array.isArray(plan.constraints) ? plan.constraints.slice(0, 10).map((item) => shortText(item, 220)) : [],
  };
}

function stripStorageHeavyFields(lesson) {
  const base = normalizeLesson(lesson);
  return {
    ...base,
    intro: shortText(base.intro, 1600),
    objective: shortText(base.objective, 700),
    focus: shortText(base.focus, 700),
    listeningText: shortText(base.listeningText, 4200),
    sections: Array.isArray(base.sections) ? base.sections.slice(0, 10).map((section) => ({
      title: shortText(section?.title, 180),
      content: shortText(section?.content, 2400),
      sectionContract: section?.sectionContract || '',
      wordCount: Number(section?.wordCount || 0),
    })) : [],
    tips: Array.isArray(base.tips) ? base.tips.slice(0, 10).map((item) => shortText(item, 240)) : [],
    vocabulary: Array.isArray(base.vocabulary) ? base.vocabulary.slice(0, 28).map((item) => ({
      word: shortText(item?.word, 120),
      meaning: shortText(item?.meaning, 220),
      example: shortText(item?.example, 280),
    })) : [],
    exercises: Array.isArray(base.exercises) ? base.exercises.slice(0, 28).map((item) => ({
      question: shortText(item?.question, 380),
      options: Array.isArray(item?.options) ? item.options.slice(0, 4).map((option) => shortText(option, 180)) : [],
      answer: shortText(item?.answer, 180),
      explanation: shortText(item?.explanation, 420),
    })) : [],
    prompts: Array.isArray(base.prompts) ? base.prompts.slice(0, 12).map((item) => shortText(item, 420)) : [],
    lessonPlan: compactLessonPlan(lesson?.lessonPlan),
    pedagogicalReview: compactReview(lesson?.pedagogicalReview || lesson?.quality),
    teacherReview: compactReview(lesson?.teacherReview),
    studyReadiness: compactReview(lesson?.studyReadiness),
    quality: lesson?.quality ? compactReview(lesson.quality) : undefined,
    deepGrammarAudit: undefined,
    rawResponse: undefined,
    debug: undefined,
    diagnostics: undefined,
  };
}

function compactLesson(lesson, mode = 'normal') {
  const base = stripStorageHeavyFields(lesson);
  const sectionLimit = mode === 'emergency' ? 1600 : 2400;
  const exerciseLimit = mode === 'emergency' ? 20 : 28;
  return {
    ...base,
    intro: shortText(base.intro, mode === 'emergency' ? 900 : 1600),
    listeningText: shortText(base.listeningText, mode === 'emergency' ? 1800 : 4200),
    sections: Array.isArray(base.sections) ? base.sections.slice(0, 10).map((section) => ({
      ...section,
      content: shortText(section?.content, sectionLimit),
    })) : [],
    vocabulary: Array.isArray(base.vocabulary) ? base.vocabulary.slice(0, mode === 'emergency' ? 18 : 28) : [],
    exercises: Array.isArray(base.exercises) ? base.exercises.slice(0, exerciseLimit) : [],
    prompts: Array.isArray(base.prompts) ? base.prompts.slice(0, mode === 'emergency' ? 8 : 12) : [],
  };
}

function verifySavedLesson(expected) {
  const saved = storage.get(CURRENT_LESSON_KEY, null);
  const expectedGen = expected?.generationMeta?.id || '';
  const savedGen = saved?.generationMeta?.id || '';
  return Boolean(saved && expectedGen && savedGen === expectedGen);
}

function persistCurrentLesson(payload) {
  const storagePayload = { ...stripStorageHeavyFields(payload), generationMeta: payload.generationMeta };
  storage.set(CURRENT_LESSON_KEY, storagePayload);
  if (verifySavedLesson(storagePayload)) return { ok: true, payload: storagePayload, compacted: false };

  diagnostics.log('Storage recusou a aula completa. Limpando histórico e tentando novamente.', 'warn');
  storage.remove(LESSON_HISTORY_KEY);
  storage.set(CURRENT_LESSON_KEY, storagePayload);
  if (verifySavedLesson(storagePayload)) return { ok: true, payload: storagePayload, compacted: false };

  const compact = { ...compactLesson(payload), generationMeta: { ...payload.generationMeta, compactedForStorage: true } };
  diagnostics.log('Storage ainda recusou. Tentando salvar versão compacta da aula.', 'warn');
  storage.set(CURRENT_LESSON_KEY, compact);
  if (verifySavedLesson(compact)) return { ok: true, payload: compact, compacted: true };

  const emergency = { ...compactLesson(payload, 'emergency'), generationMeta: { ...payload.generationMeta, compactedForStorage: true, emergencyCompactedForStorage: true } };
  diagnostics.log('Storage recusou a versão compacta. Limpando cache antigo e tentando versão emergencial.', 'warn');
  storage.remove(LESSON_HISTORY_KEY);
  storage.remove('diagnostics.logs');
  storage.remove('cloud.sync.queue');
  storage.set(CURRENT_LESSON_KEY, emergency);
  if (verifySavedLesson(emergency)) return { ok: true, payload: emergency, compacted: true, emergency: true };

  return { ok: false, payload: emergency, compacted: true, emergency: true };
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
  const payload = { id: status.id || makeGenerationId(), event: status.event || 'unknown', message: status.message || '', lessonId: status.lessonId || '', lessonTitle: status.lessonTitle || '', contractVersion: status.contractVersion || '', pedagogicalScore: Number(status.pedagogicalScore || 0), source: status.source || 'unknown', variationMode: Boolean(status.variationMode), generationSeed: status.generationSeed || '', createdAt: status.createdAt || new Date().toISOString() };
  storage.set(LAST_GENERATION_STATUS_KEY, payload);
  return payload;
}

export function saveCurrentLesson(lesson, meta = {}) {
  const now = new Date();
  const previous = storage.get(CURRENT_LESSON_KEY, null);
  const normalized = normalizeLesson(lesson);
  const generationMeta = {
    ...(previous?.generationMeta && typeof previous.generationMeta === 'object' ? previous.generationMeta : {}),
    id: meta.generationId || lesson?.generationMeta?.id || makeGenerationId(now),
    source: meta.source || lesson?.generationMeta?.source || 'generated',
    status: meta.status || lesson?.generationMeta?.status || 'new',
    generatedAt: meta.generatedAt || lesson?.generationMeta?.generatedAt || now.toISOString(),
    savedAt: now.toISOString(),
    contractVersion: meta.contractVersion || lesson?.generationMeta?.contractVersion || lesson?.quality?.contractVersion || 'lesson-contract-v1',
    pedagogicalScore: Number(meta.pedagogicalScore || lesson?.pedagogicalReview?.overallScore || lesson?.quality?.pedagogicalScore || 0),
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
  if (persisted.compacted) diagnostics.log(persisted.emergency ? 'Aula salva em modo emergencial para caber no armazenamento local.' : 'Aula salva em modo compacto para caber no armazenamento local.', 'warn');

  const history = storage.get(LESSON_HISTORY_KEY, []);
  const nextHistory = [{ ...compactLesson(payload, 'emergency'), savedAt: now.toISOString() }, ...(Array.isArray(history) ? history : []).filter((item) => item?.generationMeta?.id !== payload.generationMeta.id)].slice(0, 2);
  if (!storage.set(LESSON_HISTORY_KEY, nextHistory)) storage.set(LESSON_HISTORY_KEY, [{ ...compactLesson(payload, 'emergency'), savedAt: now.toISOString() }]);

  const status = saveGenerationStatus({ id: payload.generationMeta.id, event: 'saved', message: payload.generationMeta.variationMode ? 'Nova versão diferente gerada e salva.' : payload.generationMeta.status === 'new' ? 'Nova aula gerada e salva.' : 'Aula salva.', lessonId: payload.id, lessonTitle: payload.title, contractVersion: payload.generationMeta.contractVersion, pedagogicalScore: payload.generationMeta.pedagogicalScore, source: payload.generationMeta.source, variationMode: payload.generationMeta.variationMode, generationSeed: payload.generationMeta.generationSeed, createdAt: payload.generationMeta.generatedAt });
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
