export const ANALYSIS_STATUS = Object.freeze({
  success: 'success',
  fallback: 'fallback',
  error: 'error',
});

export const ANALYSIS_SOURCE = Object.freeze({
  local: 'local',
  azure: 'azure',
  gemini: 'gemini',
  hybrid: 'hybrid',
});

export const CEFR_FIT = Object.freeze({
  ok: 'ok',
  tooSimple: 'too-simple',
  tooHard: 'too-hard',
  unknown: 'unknown',
});

export const PILLARS = Object.freeze([
  'writing', 'speaking', 'grammar', 'vocabulary', 'reading', 'listening',
]);

/**
 * Returns a zeroed AnalysisResult with required fields populated.
 *
 * Shape (all fields always present):
 * {
 *   status: 'success' | 'fallback' | 'error',
 *   pillar: string,
 *   skill: string,
 *   score: number | null,
 *   level: string,
 *   cefrFit: 'ok' | 'too-simple' | 'too-hard' | 'unknown',
 *   correctedText: string,
 *   feedbackPt: string,
 *   strengths: string[],
 *   issues: string[],
 *   nextDrill: string,
 *   source: 'local' | 'azure' | 'gemini' | 'hybrid',
 * }
 */
export function emptyResult({ pillar = 'writing', skill = '', level = 'A1' } = {}) {
  return {
    status: ANALYSIS_STATUS.fallback,
    pillar,
    skill,
    score: null,
    level,
    cefrFit: CEFR_FIT.unknown,
    correctedText: '',
    feedbackPt: '',
    strengths: [],
    issues: [],
    nextDrill: '',
    source: ANALYSIS_SOURCE.local,
  };
}
