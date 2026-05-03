import { QUESTION_TYPES, PRACTICE_PHASES } from './PracticeTypes.js';
import { cleanPracticeText, normalizePracticeText, splitPracticeWords } from './PracticeNormalizer.js';
import { createQuestion, makeMeaningOptions } from './builders/builderUtils.js';

export const LEAK_RISK = Object.freeze({
  CLEAN: 0,
  MILD: 1,
  MEDIUM: 2,
  SEVERE: 3,
});

const CORRECT_MARKER_PATTERN = /(?:^|\s|\(|\[)(correct|right|certo|certa|correto|correta|answer\s*key|resposta\s*correta|gabarito|✓|✔|✅|👉|→\s*resposta)(?:\s|\)|\]|:|$)/i;

function maxRisk(current, next) {
  return Math.max(current, next);
}

function compactNormalized(value) {
  return normalizePracticeText(value).replace(/\s+/g, ' ').trim();
}

export function containsLiteralAnswer(prompt, answer) {
  if (!prompt || !answer) return false;
  const normalizedAnswer = compactNormalized(answer);
  if (normalizedAnswer.length < 3) return false;

  const normalizedPrompt = compactNormalized(prompt);
  if (!normalizedPrompt || normalizedPrompt === normalizedAnswer) return true;

  if (normalizedAnswer.includes(' ')) {
    return normalizedPrompt.includes(normalizedAnswer);
  }

  return new RegExp(`(?:^|\\s)${escapeRegExp(normalizedAnswer)}(?:\\s|$)`, 'i').test(normalizedPrompt);
}

export function containsStemAnswer(prompt, answer) {
  if (!prompt || !answer) return false;
  const answerWords = splitPracticeWords(answer)
    .map(stemWord)
    .filter((stem) => stem.length >= 4);

  if (!answerWords.length) return false;

  const promptStems = new Set(splitPracticeWords(prompt).map(stemWord).filter((stem) => stem.length >= 4));
  return answerWords.some((stem) => promptStems.has(stem));
}

export function stemWord(word) {
  const clean = normalizePracticeText(word);
  if (!clean) return '';
  return clean
    .replace(/(?:ies|ied|ying|ing|ed|ly|er|est|es|s)$/i, '')
    .toLowerCase();
}

export function containsTranslationLeak(prompt, answer, acceptedAnswers = []) {
  if (!prompt || !answer) return false;
  const normalizedPrompt = compactNormalized(prompt);
  const normalizedAnswer = compactNormalized(answer);
  const variants = Array.isArray(acceptedAnswers) ? acceptedAnswers : [];

  return variants.some((variant) => {
    const normalizedVariant = compactNormalized(variant);
    if (!normalizedVariant || normalizedVariant === normalizedAnswer) return false;
    if (normalizedVariant.length < 3) return false;
    return normalizedPrompt.includes(normalizedVariant);
  });
}

export function hasObviousCorrectMarker(options) {
  if (!Array.isArray(options) || !options.length) return false;
  return options.some((option) => CORRECT_MARKER_PATTERN.test(cleanPracticeText(option)));
}

export function isListeningType(type) {
  return type === QUESTION_TYPES.AUDIO_CHOICE || type === QUESTION_TYPES.DICTATION;
}

export function hasTranscriptInPrompt(prompt, audioText) {
  if (!prompt || !audioText) return false;
  const promptWords = splitPracticeWords(prompt).map(normalizePracticeText).filter(Boolean);
  const audioWords = splitPracticeWords(audioText).map(normalizePracticeText).filter(Boolean);
  if (audioWords.length < 3) return false;

  const promptJoined = promptWords.join(' ');
  for (let index = 0; index <= audioWords.length - 3; index += 1) {
    const trigram = audioWords.slice(index, index + 3).join(' ');
    if (trigram.length >= 8 && promptJoined.includes(trigram)) {
      return true;
    }
  }
  return false;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getQuestionOptions(question) {
  return Array.isArray(question?.options) ? question.options.map(cleanPracticeText).filter(Boolean) : [];
}

export function detectAnswerLeak(question) {
  const reasons = [];
  let risk = LEAK_RISK.CLEAN;

  if (!question || typeof question !== 'object') {
    return { risk: LEAK_RISK.SEVERE, reasons: ['invalid_question'] };
  }

  const prompt = cleanPracticeText(question.prompt);
  const answer = cleanPracticeText(question.answer);
  const audioText = cleanPracticeText(question.audioText);
  const explanation = cleanPracticeText(question.explanation);
  const options = getQuestionOptions(question);

  if (containsLiteralAnswer(prompt, answer)) {
    reasons.push('leak_literal_in_prompt');
    risk = maxRisk(risk, LEAK_RISK.SEVERE);
  }

  if (containsStemAnswer(prompt, answer)) {
    reasons.push('leak_stem_in_prompt');
    risk = maxRisk(risk, LEAK_RISK.MEDIUM);
  }

  if (containsTranslationLeak(prompt, answer, question.acceptedAnswers)) {
    reasons.push('leak_translation_in_prompt');
    risk = maxRisk(risk, LEAK_RISK.MEDIUM);
  }

  if (hasObviousCorrectMarker(options)) {
    reasons.push('leak_obvious_marker_in_options');
    risk = maxRisk(risk, LEAK_RISK.SEVERE);
  }

  if (isListeningType(question.type) && hasTranscriptInPrompt(prompt, audioText)) {
    reasons.push('leak_transcript_in_listening');
    risk = maxRisk(risk, LEAK_RISK.SEVERE);
  }

  if (explanation && explanation.length > 12 && compactNormalized(prompt).includes(compactNormalized(explanation))) {
    reasons.push('leak_explanation_in_prompt');
    risk = maxRisk(risk, LEAK_RISK.MILD);
  }

  return { risk, reasons };
}

export function sanitizeQuestion(question, leak = detectAnswerLeak(question)) {
  if (leak.risk !== LEAK_RISK.MILD) return null;
  const next = { ...question };

  if (leak.reasons.includes('leak_explanation_in_prompt')) {
    const prompt = cleanPracticeText(question.prompt);
    const explanation = cleanPracticeText(question.explanation);
    next.prompt = prompt.replace(explanation, '').replace(/\s{2,}/g, ' ').trim();
  }

  return next.prompt ? next : null;
}

export function downgradeQuestion(question, context) {
  if (!context?.vocabulary?.length) return null;
  const item = context.vocabulary.find((entry) => entry?.word && entry?.meaning);
  if (!item?.word || !item?.meaning) return null;

  return createQuestion({
    skill: question.skill || context.skill,
    phase: question.phase || PRACTICE_PHASES.WARMUP,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    title: 'Vocabulário',
    prompt: `O que significa “${item.word}”?`,
    answer: item.meaning,
    options: makeMeaningOptions(item.meaning, context.vocabulary),
    source: `downgraded:${question.id || question.source || 'unknown'}`,
  });
}

export function applyLeakDetector(questions, context) {
  const accepted = [];
  const sanitizedList = [];
  const downgradedList = [];
  const discarded = [];

  const list = Array.isArray(questions) ? questions : [];
  for (const question of list) {
    const leak = detectAnswerLeak(question);

    if (leak.risk === LEAK_RISK.CLEAN) {
      accepted.push(question);
      continue;
    }

    if (leak.risk === LEAK_RISK.MILD) {
      const sanitized = sanitizeQuestion(question, leak);
      if (sanitized) {
        const recheck = detectAnswerLeak(sanitized);
        if (recheck.risk === LEAK_RISK.CLEAN) {
          accepted.push(sanitized);
          sanitizedList.push({ id: question.id, reasons: leak.reasons });
          continue;
        }
      }
    }

    if (leak.risk === LEAK_RISK.MEDIUM) {
      const downgraded = downgradeQuestion(question, context);
      if (downgraded) {
        const recheck = detectAnswerLeak(downgraded);
        if (recheck.risk === LEAK_RISK.CLEAN) {
          accepted.push(downgraded);
          downgradedList.push({ id: question.id, downgradedId: downgraded.id, reasons: leak.reasons });
          continue;
        }
      }
    }

    discarded.push({
      id: question?.id || question?.source || 'unknown',
      reasons: leak.reasons,
      risk: leak.risk,
    });
  }

  return { accepted, sanitizedList, downgradedList, discarded };
}
