import { normalizeReadingLevel } from './readingLevelPolicy.js';
import { PRACTICE_PHASES, QUESTION_TYPES } from '../practice/core/PracticeTypes.js';
import { createQuestion } from '../practice/core/builders/builderUtils.js';

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function getMarkers(summaryText) {
  return Array.from(summaryText.matchAll(/\{\{(\d+)\}\}/g)).map((match) => match[1]);
}

function uniqueValues(values) {
  const seen = new Set();
  return values.map(clean).filter(Boolean).filter((value) => {
    const key = value.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function isValidSummaryCloze(payload, level) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return false;
  const summaryText = clean(payload.summaryText || payload.text || '');
  if (!summaryText || summaryText.length < 30) return false;

  const blanks = Array.isArray(payload.blanks) ? payload.blanks : [];
  if (!blanks.length) return false;

  const markers = getMarkers(summaryText);
  if (markers.length !== blanks.length) return false;

  const maxBlanks = ['A1', 'A2'].includes(normalizeReadingLevel(level)) ? 2 : 5;
  if (blanks.length > maxBlanks) return false;

  const blankIds = new Set(blanks.map((blank) => clean(blank?.id)));
  if (markers.some((marker) => !blankIds.has(marker))) return false;
  if (blanks.some((blank) => !clean(blank?.id) || !clean(blank?.answer))) return false;

  return true;
}

export function buildSummaryClozeQuestion(context, summaryClozePayload) {
  if (!isValidSummaryCloze(summaryClozePayload, context?.level)) return null;

  const summaryText = clean(summaryClozePayload.summaryText || summaryClozePayload.text || '');
  const blanks = summaryClozePayload.blanks.map((blank) => ({
    id: clean(blank.id),
    answer: clean(blank.answer),
    acceptable: uniqueValues(Array.isArray(blank.acceptable) ? blank.acceptable : []),
    hint: clean(blank.hint || ''),
  }));

  const fullAnswer = blanks.map((blank) => `${blank.id}=${blank.answer}`).join('|');

  return createQuestion({
    skill: context?.skill || 'reading',
    phase: PRACTICE_PHASES.COMPREHENSION,
    type: QUESTION_TYPES.SUMMARY_CLOZE,
    title: 'Resumo com lacunas',
    prompt: 'Complete o resumo do texto. Use palavras do próprio texto.',
    answer: fullAnswer,
    summaryText,
    blanks,
    readingSkillTag: 'main_idea',
    source: 'summary-cloze',
  });
}
