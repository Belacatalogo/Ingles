import { diagnostics } from './diagnostics.js';
import { markCurriculumLessonComplete } from './curriculumPlan.js';
import { normalizeLesson } from './lessonTypes.js';
import { storage } from './storage.js';
import { clearIndexedLessonPointer, getFullLessonBestEffort, saveFullLessonBestEffort } from './lessonIndexedDb.js';

const CURRENT_LESSON_KEY = 'lesson.current';
const LESSON_HISTORY_KEY = 'lesson.history';
const LESSON_DRAFT_PROMPT_KEY = 'lesson.promptDraft';
const LAST_GENERATION_STATUS_KEY = 'lesson.lastGenerationStatus';
const COMPARISON_HISTORY_KEY = 'lesson.comparisonRuns';
const FULL_LESSON_POINTER_CONTRACT = 'lesson-full-indexeddb-v1';

function makeGenerationId(date = new Date()) {
  return `gen-${date.toISOString().replace(/[-:TZ.]/g, '').slice(0, 14)}-${Math.random().toString(36).slice(2, 6)}`;
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
    normalized.listeningText,
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

function lessonTime(lesson) {
  const candidates = [lesson?.generationMeta?.savedAt, lesson?.savedAt, lesson?.generationMeta?.generatedAt, lesson?.updatedAt, lesson?.createdAt];
  return candidates.map((value) => Date.parse(value || '')).find((value) => Number.isFinite(value)) || 0;
}

function makeLessonPointer(lesson, generationMeta) {
  const signature = buildLessonSignature(lesson);
  return {
    id: lesson?.id || '',
    curriculumId: lesson?.curriculumId || '',
    curriculumTitle: lesson?.curriculumTitle || '',
    expectedTitle: lesson?.expectedTitle || '',
    type: lesson?.type || '',
    level: lesson?.level || '',
    title: lesson?.title || '',
    intro: shortText(lesson?.intro || '', 280),
    objective: shortText(lesson?.objective || '', 220),
    focus: shortText(lesson?.focus || '', 220),
    generationMeta,
    lessonSignature: signature,
    storageMode: FULL_LESSON_POINTER_CONTRACT,
    indexedDbGenerationId: generationMeta.id,
  };
}

function verifyPointerSaved(expected) {
  const saved = storage.get(CURRENT_LESSON_KEY, null);
  const expectedGen = expected?.generationMeta?.id || '';
  const savedGen = saved?.generationMeta?.id || '';
  return Boolean(saved && expectedGen && savedGen === expectedGen && saved.storageMode === FULL_LESSON_POINTER_CONTRACT);
}

function persistCurrentPointer(pointer) {
  storage.set(CURRENT_LESSON_KEY, pointer);
  if (verifyPointerSaved(pointer)) return true;
  storage.remove(LESSON_HISTORY_KEY);
  storage.set(CURRENT_LESSON_KEY, pointer);
  return verifyPointerSaved(pointer);
}

function notifyLessonUpdated(lesson, status) {
  try {
    window.dispatchEvent(new CustomEvent('fluency:lesson-updated', { detail: { lessonId: lesson?.id || '', lessonTitle: lesson?.title || '', generationId: lesson?.generationMeta?.id || '', status: status?.event || status?.message || 'saved', savedAt: lesson?.generationMeta?.savedAt || new Date().toISOString() } }));
  } catch {}
}

function recordComparisonRun(lesson, status) {
  const signature = buildLessonSignature(lesson);
  const provider = lesson?.providerFallback?.provider || lesson?.generationMeta?.provider || lesson?.generationMeta?.source || 'gemini';
  const model = lesson?.providerFallback?.model || lesson?.generationMeta?.model || '';
  const comparison = {
    id: lesson?.generationMeta?.id || makeGenerationId(),
    title: lesson?.title || '',
    provider,
    model,
    score: Number(lesson?.generationMeta?.pedagogicalScore || status?.pedagogicalScore || 0),
    hash: signature.hash,
    sectionWordCounts: signature.sectionWordCounts,
    sectionHashes: signature.sectionHashes,
    totalSectionWords: signature.totalSectionWords,
    vocabularyCount: signature.vocabularyCount,
    exerciseCount: signature.exerciseCount,
    savedAt: lesson?.generationMeta?.savedAt || new Date().toISOString(),
  };
  const history = storage.get(COMPARISON_HISTORY_KEY, []);
  const next = [comparison, ...(Array.isArray(history) ? history : [])].slice(0, 9);
  storage.set(COMPARISON_HISTORY_KEY, next);
  diagnostics.log(`Assinatura da aula: ${comparison.hash} · ${comparison.provider}${comparison.model ? `/${comparison.model}` : ''} · sections ${comparison.sectionWordCounts.join('/')}.`, 'info');
}

function findHistoryLessonByStatus(history = [], status = null) {
  if (!Array.isArray(history) || !status) return null;
  return history.find((lesson) => lesson?.generationMeta?.id === status.id)
    || history.find((lesson) => lesson?.id === status.lessonId || lesson?.curriculumId === status.lessonId)
    || history.find((lesson) => lesson?.title === status.lessonTitle || lesson?.expectedTitle === status.lessonTitle)
    || null;
}

function getFreshestLessonRawSyncFallback() {
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

export async function getCurrentLessonFull() {
  const pointer = storage.get(CURRENT_LESSON_KEY, null);
  if (pointer?.storageMode === FULL_LESSON_POINTER_CONTRACT && pointer?.indexedDbGenerationId) {
    const fullLesson = await getFullLessonBestEffort(pointer.indexedDbGenerationId);
    if (fullLesson) return fullLesson;
    diagnostics.log('Ponteiro de aula existe, mas IndexedDB não retornou a aula completa. Usando fallback local.', 'warn');
  }
  return getFreshestLessonRawSyncFallback();
}

export function getLessonComparisonRuns() {
  return storage.get(COMPARISON_HISTORY_KEY, []);
}

export function getCurrentLesson() {
  const lesson = getFreshestLessonRawSyncFallback();
  return lesson ? normalizeLesson(lesson) : null;
}

export function getCurrentLessonRaw() {
  return getFreshestLessonRawSyncFallback();
}

export function getLastGenerationStatus() {
  return storage.get(LAST_GENERATION_STATUS_KEY, null);
}

export function saveGenerationStatus(status = {}) {
  const payload = {
    id: status.id || makeGenerationId(),
    event: status.event || 'unknown',
    message: status.message || '',
    lessonId: status.lessonId || '',
    lessonTitle: status.lessonTitle || '',
    contractVersion: shortText(status.contractVersion || '', 700),
    pedagogicalScore: Number(status.pedagogicalScore || 0),
    source: status.source || 'unknown',
    variationMode: Boolean(status.variationMode),
    generationSeed: status.generationSeed || '',
    createdAt: status.createdAt || new Date().toISOString(),
  };
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

  const fullLesson = { ...normalized, ...lesson, generationMeta };
  const pointer = makeLessonPointer(fullLesson, generationMeta);
  const indexedDbResult = saveFullLessonBestEffort(fullLesson, generationMeta.id);

  indexedDbResult.then((result) => {
    if (result.ok) {
      diagnostics.log(`Aula completa salva no IndexedDB: ${fullLesson.title} · ${generationMeta.id}`, 'success');
    } else {
      diagnostics.log(`IndexedDB recusou a aula completa: ${result.error}`, 'error');
    }
  });

  const pointerOk = persistCurrentPointer(pointer);
  if (!pointerOk) {
    const status = saveGenerationStatus({ id: generationMeta.id, event: 'storage-pointer-failed', message: 'Aula completa foi enviada ao IndexedDB, mas o ponteiro leve não pôde ser gravado.', lessonId: normalized.id, lessonTitle: normalized.title, contractVersion: generationMeta.contractVersion, pedagogicalScore: generationMeta.pedagogicalScore, source: generationMeta.source, createdAt: generationMeta.generatedAt });
    diagnostics.log('Falha crítica: ponteiro leve da aula não foi persistido no localStorage.', 'error');
    notifyLessonUpdated(null, status);
    return fullLesson;
  }

  storage.set(LESSON_HISTORY_KEY, []);
  const status = saveGenerationStatus({ id: pointer.generationMeta.id, event: 'saved', message: pointer.generationMeta.variationMode ? 'Nova versão diferente gerada e salva.' : pointer.generationMeta.status === 'new' ? 'Nova aula gerada e salva.' : 'Aula salva.', lessonId: pointer.id, lessonTitle: pointer.title, contractVersion: pointer.generationMeta.contractVersion, pedagogicalScore: pointer.generationMeta.pedagogicalScore, source: pointer.generationMeta.source, variationMode: pointer.generationMeta.variationMode, generationSeed: pointer.generationMeta.generationSeed, createdAt: pointer.generationMeta.generatedAt });
  recordComparisonRun(fullLesson, status);
  diagnostics.log(`Aula salva sem compactar conteúdo: ${pointer.title} · ${pointer.generationMeta.id}`, 'info');
  notifyLessonUpdated(fullLesson, status);
  return fullLesson;
}

export function completeCurrentLessonInCurriculum(lesson) {
  return markCurriculumLessonComplete(lesson);
}

export function clearCurrentLesson() {
  const current = storage.get(CURRENT_LESSON_KEY, null);
  storage.remove(CURRENT_LESSON_KEY);
  clearIndexedLessonPointer().catch(() => {});
  const status = saveGenerationStatus({ event: 'cleared', message: 'Aula atual removida para gerar uma nova.', source: 'manual' });
  diagnostics.log(`Aula atual removida${current?.indexedDbGenerationId ? ' do ponteiro IndexedDB' : ''}.`, 'info');
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
