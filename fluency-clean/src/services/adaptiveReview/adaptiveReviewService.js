import { ADAPTIVE_REVIEW_STATUS, ADAPTIVE_REVIEW_SOURCE, ADAPTIVE_REVIEW_STORAGE_KEY } from './adaptiveReviewTypes.js';
import { buildLocalAdaptiveReview } from './localAdaptiveReview.js';
import { buildAdaptiveReviewWithTutor } from '../aiTutorService.js';
import { getGeneralAiKeys } from '../aiKeys.js';
import { storage } from '../storage.js';

function safeArray(value) { return Array.isArray(value) ? value : []; }
function todaySlice() { return new Date().toISOString().slice(0, 10); }

function getCacheKey(lessonId) { return `${String(lessonId || 'unknown').slice(0, 60)}-${todaySlice()}`; }

function loadCachedReview(lessonId) {
  try {
    const store = storage.get(ADAPTIVE_REVIEW_STORAGE_KEY, {});
    return store[getCacheKey(lessonId)] || null;
  } catch { return null; }
}

function saveCachedReview(lessonId, review) {
  try {
    const store = storage.get(ADAPTIVE_REVIEW_STORAGE_KEY, {});
    const keys = Object.keys(store);
    const trimmed = {};
    keys.slice(-29).forEach((k) => { trimmed[k] = store[k]; });
    trimmed[getCacheKey(lessonId)] = review;
    storage.set(ADAPTIVE_REVIEW_STORAGE_KEY, trimmed);
  } catch { /* non-blocking */ }
}

/**
 * Build adaptive review from real lesson errors.
 *
 * Always returns a local result immediately. If allowAi=true and keys exist,
 * enriches with Gemini analysis. Never throws — falls back to local result.
 *
 * @param {object} opts
 * @param {object|null} opts.lesson       - Current lesson object.
 * @param {Array}       opts.flowErrors   - Errors from lessonFlowScore.extractFlowErrors().
 * @param {boolean}     opts.allowAi      - Whether to attempt AI enrichment.
 * @param {Function}    opts.fetcher      - fetch override for testing.
 * @returns {Promise<AdaptiveReviewResult>}
 */
export async function buildAdaptiveReview({
  lesson = null,
  flowErrors = [],
  allowAi = false,
  fetcher = fetch,
} = {}) {
  const level = lesson?.level || 'A1';
  const lessonId = lesson?.id || lesson?.title || 'unknown';

  const localResult = buildLocalAdaptiveReview({ lesson, flowErrors, level });

  if (!allowAi) return localResult;

  const cached = loadCachedReview(lessonId);
  if (cached?.source === ADAPTIVE_REVIEW_SOURCE.gemini) return cached;

  const hasKeys = getGeneralAiKeys().length > 0;
  if (!hasKeys) return { ...localResult, status: ADAPTIVE_REVIEW_STATUS.fallback };

  const errors = safeArray(flowErrors).filter((err) => err && (err.status === 'warn' || err.status === 'missed'));
  if (!errors.length) return localResult;

  try {
    const tutorResult = await buildAdaptiveReviewWithTutor({ lesson, errors, level, fetcher });
    if (tutorResult?.status === 'success' && tutorResult.text) {
      const aiResult = {
        ...localResult,
        status: ADAPTIVE_REVIEW_STATUS.success,
        source: ADAPTIVE_REVIEW_SOURCE.gemini,
        aiText: tutorResult.text,
        focusSummary: tutorResult.text.split('\n').find((line) => line.trim()) || localResult.focusSummary,
      };
      saveCachedReview(lessonId, aiResult);
      return aiResult;
    }
  } catch {
    // AI failed — fall through to local result
  }

  return localResult;
}
