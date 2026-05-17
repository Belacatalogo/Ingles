import { correctWritingWithTutor } from '../aiTutorService.js';
import { getGeneralAiKeys } from '../aiKeys.js';
import { ANALYSIS_STATUS, ANALYSIS_SOURCE } from './studentAnswerAnalysisTypes.js';
import {
  evaluateWritingLocally,
  evaluateSpeakingLocally,
  evaluateGenericLocally,
} from './localAnswerRubrics.js';

/**
 * Central entry point for analysing a student's answer.
 *
 * Always runs a local rubric first so the caller always gets a result,
 * even when the AI call is skipped or fails.
 *
 * @param {object} opts
 * @param {object|null}  opts.lesson          - Current lesson object (for AI context).
 * @param {string}       opts.pillar          - writing | speaking | grammar | vocabulary | reading | listening
 * @param {string}       opts.skill           - Free label for the exercise type.
 * @param {string}       opts.studentText     - What the student wrote or said.
 * @param {string}       opts.referenceText   - Supporting text (model text, transcript…).
 * @param {string}       opts.prompt          - The exercise prompt shown to the student.
 * @param {string}       opts.expectedAnswer  - Correct answer when deterministic.
 * @param {object|null}  opts.azureResult     - Azure pronunciation assessment result (Speaking only).
 * @param {Array}        opts.errors          - Recent errors for context (future use).
 * @param {boolean}      opts.allowAi         - Whether to attempt the AI layer.
 * @returns {Promise<AnalysisResult>}
 */
export async function analyzeStudentAnswer({
  lesson = null,
  pillar = 'writing',
  skill = '',
  studentText = '',
  referenceText = '',
  prompt = '',
  expectedAnswer = '',
  azureResult = null,
  errors = [],
  allowAi = false,
} = {}) {
  const level = lesson?.level || 'A1';
  const refAnswer = expectedAnswer || referenceText;

  // Step 1 — always run local rubric
  let localResult;
  if (pillar === 'writing') {
    localResult = evaluateWritingLocally({ studentText, expectedAnswer: refAnswer, level, skill });
  } else if (pillar === 'speaking') {
    localResult = evaluateSpeakingLocally({ studentText, azureResult, level, skill });
  } else {
    localResult = evaluateGenericLocally({ studentText, expectedAnswer: refAnswer, pillar, skill, level });
  }

  // Step 2 — short-circuit if AI not requested
  if (!allowAi) return localResult;

  // Step 3 — short-circuit if no API key available
  const hasKeys = getGeneralAiKeys().length > 0;
  if (!hasKeys) return { ...localResult, status: ANALYSIS_STATUS.fallback };

  // Step 4 — AI layer per pillar
  // Writing: use correctWritingWithTutor (aiTutorService)
  if (pillar === 'writing') {
    try {
      const tutorResult = await correctWritingWithTutor({
        lesson: lesson || { title: skill || 'Escrita livre', pillar: 'writing', level },
        text: studentText,
      });
      if (tutorResult?.status === 'success' && tutorResult.text) {
        return {
          ...localResult,
          status: ANALYSIS_STATUS.success,
          feedbackPt: tutorResult.text,
          source: ANALYSIS_SOURCE.gemini,
        };
      }
    } catch {
      // AI failed — fall through to local result
    }
    return localResult;
  }

  // Speaking: Azure already in azureResult; IA-3 (future) will add AI layer.
  // Reading/Listening/Grammar/Vocabulary: IA-4 (future) will add AI layer.
  return localResult;
}
