import { ANSWER_KINDS, DEFAULT_PRACTICE_LIMITS, QUESTION_TYPES } from './PracticeTypes.js';
import { cleanPracticeText, detectAnswerKind, normalizePracticeText } from './PracticeNormalizer.js';

const BLOCKED_OPTION_PATTERNS = [/resposta pessoal/i, /personal answer/i, /exemplo:/i, /example:/i];

export function getPracticeQuestionIssues(question, limits = DEFAULT_PRACTICE_LIMITS) {
  const issues = [];
  if (!question || typeof question !== 'object') return ['Questão inválida.'];
  const type = question.type;
  const prompt = cleanPracticeText(question.prompt);
  const answer = cleanPracticeText(question.answer);
  const answerKind = question.answerKind || detectAnswerKind(answer);

  if (!Object.values(QUESTION_TYPES).includes(type)) issues.push(`Tipo de questão desconhecido: ${type || 'vazio'}.`);
  if (!prompt) issues.push('Enunciado vazio.');
  if (!answer && type !== QUESTION_TYPES.SPEAK_RESPONSE) issues.push('Resposta esperada vazia.');
  if (answerKind === ANSWER_KINDS.PERSONAL && [QUESTION_TYPES.MULTIPLE_CHOICE, QUESTION_TYPES.AUDIO_CHOICE, QUESTION_TYPES.TRUE_FALSE].includes(type)) {
    issues.push('Resposta pessoal não pode ser múltipla escolha.');
  }

  if ([QUESTION_TYPES.MULTIPLE_CHOICE, QUESTION_TYPES.AUDIO_CHOICE, QUESTION_TYPES.FILL_BLANK, QUESTION_TYPES.TRUE_FALSE].includes(type)) {
    const options = Array.isArray(question.options) ? question.options.map(cleanPracticeText).filter(Boolean) : [];
    if (options.length < 2) issues.push('Alternativas insuficientes.');
    if (options.length > limits.maxChoiceOptions) issues.push('Alternativas demais.');
    if (!options.some((option) => normalizePracticeText(option) === normalizePracticeText(answer))) issues.push('Resposta correta não está nas alternativas.');
    const badOptions = options.filter((option) => option.length > limits.maxOptionLength || BLOCKED_OPTION_PATTERNS.some((pattern) => pattern.test(option)));
    if (badOptions.length) issues.push('Alternativas longas, vagas ou pessoais.');

    if (type !== QUESTION_TYPES.TRUE_FALSE) {
      const sameKindCount = options.filter((option) => detectAnswerKind(option) === answerKind).length;
      if (answerKind !== ANSWER_KINDS.SHORT_PHRASE && sameKindCount < Math.min(3, options.length)) {
        issues.push('Alternativas misturam tipos incompatíveis.');
      }
    }
  }

  if (type === QUESTION_TYPES.WORD_BANK) {
    const words = Array.isArray(question.words) ? question.words.map(cleanPracticeText).filter(Boolean) : [];
    if (words.length < 3) issues.push('Banco de palavras insuficiente.');
    if (words.length > 12) issues.push('Banco de palavras longo demais.');
  }

  if ([QUESTION_TYPES.DICTATION, QUESTION_TYPES.AUDIO_CHOICE].includes(type) && !cleanPracticeText(question.audioText)) {
    issues.push('Questão de áudio sem texto de áudio.');
  }

  return issues;
}

export function isPracticeQuestionValid(question, limits) {
  return getPracticeQuestionIssues(question, limits).length === 0;
}

export function filterPracticeQuestions(questions, limits = DEFAULT_PRACTICE_LIMITS) {
  const seen = new Set();
  const accepted = [];
  const rejected = [];

  for (const question of Array.isArray(questions) ? questions : []) {
    const key = `${question?.type}:${normalizePracticeText(question?.prompt)}:${normalizePracticeText(question?.answer)}`;
    const issues = getPracticeQuestionIssues(question, limits);
    if (seen.has(key)) issues.push('Questão duplicada.');
    if (issues.length) {
      rejected.push({ question, issues });
      continue;
    }
    seen.add(key);
    accepted.push(question);
  }

  return { accepted, rejected };
}

export function summarizePracticeQuality(questions, limits = DEFAULT_PRACTICE_LIMITS) {
  const { accepted, rejected } = filterPracticeQuestions(questions, limits);
  const score = questions?.length ? Math.round((accepted.length / questions.length) * 100) : 0;
  return {
    score,
    acceptedCount: accepted.length,
    rejectedCount: rejected.length,
    accepted,
    rejected,
  };
}
