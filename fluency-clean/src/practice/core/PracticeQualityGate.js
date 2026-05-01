import { ANSWER_KINDS, DEFAULT_PRACTICE_LIMITS, PRACTICE_PHASES, QUESTION_TYPES } from './PracticeTypes.js';
import { cleanPracticeText, detectAnswerKind, normalizePracticeText, splitPracticeWords } from './PracticeNormalizer.js';

const BLOCKED_OPTION_PATTERNS = [
  /resposta pessoal/i,
  /personal answer/i,
  /exemplo:/i,
  /example:/i,
  /^n\/?a$/i,
  /^none$/i,
  /^undefined$/i,
  /^null$/i,
];

const ENGLISH_QUESTION_START = /^(what|where|when|who|why|how|choose|complete|write|answer|listen|repeat|select|correct)\b/i;
const PORTUGUESE_HINT = /(o que|qual|quais|escolha|complete|escreva|ouça|corrija|monte|fale|repita|responda|frase|palavra|áudio|audio)/i;
const GENERIC_PROMPT = /^(pergunta|question|responda|answer|complete|escreva|write)$/i;
const VAGUE_ANSWER = /(resposta pessoal|personal answer|depende|varia|qualquer|anything|something|example|exemplo)/i;

function hasPortugueseInstruction(prompt) {
  return PORTUGUESE_HINT.test(prompt) || !ENGLISH_QUESTION_START.test(prompt);
}

function isOptionTooSimilar(a, b) {
  const left = normalizePracticeText(a);
  const right = normalizePracticeText(b);
  if (!left || !right) return false;
  if (left === right) return true;
  return left.length > 5 && right.length > 5 && (left.includes(right) || right.includes(left));
}

function getOptionShape(option) {
  const words = splitPracticeWords(option);
  if (/^(true|false)$/i.test(option)) return 'boolean';
  if (/^[a-z](?:\s*-\s*[a-z]){1,}\.?$/i.test(option)) return 'spelling';
  if (words.length === 1) return 'word';
  if (words.length <= 4) return 'short';
  return 'long';
}

function hasBalancedOptions(options) {
  if (!options.length) return false;
  const shapes = options.map(getOptionShape);
  const shapeCounts = shapes.reduce((total, shape) => ({ ...total, [shape]: (total[shape] || 0) + 1 }), {});
  const dominant = Math.max(...Object.values(shapeCounts));
  return dominant >= Math.ceil(options.length * 0.75);
}

function getPhaseIssue(question) {
  if (!Object.values(PRACTICE_PHASES).includes(question.phase)) return 'Fase pedagógica inválida.';
  if (question.phase === PRACTICE_PHASES.SPEAKING && question.type !== QUESTION_TYPES.SPEAK_RESPONSE) return 'Fase de fala deve usar exercício oral.';
  if (question.type === QUESTION_TYPES.DICTATION && question.phase !== PRACTICE_PHASES.GUIDED_PRODUCTION && question.phase !== PRACTICE_PHASES.RECOGNITION) return 'Ditado em fase inadequada.';
  return '';
}

export function getPracticeQuestionIssues(question, limits = DEFAULT_PRACTICE_LIMITS) {
  const issues = [];
  if (!question || typeof question !== 'object') return ['Questão inválida.'];
  const type = question.type;
  const prompt = cleanPracticeText(question.prompt);
  const title = cleanPracticeText(question.title);
  const answer = cleanPracticeText(question.answer);
  const answerKind = question.answerKind || detectAnswerKind(answer);
  const phaseIssue = getPhaseIssue(question);

  if (!Object.values(QUESTION_TYPES).includes(type)) issues.push(`Tipo de questão desconhecido: ${type || 'vazio'}.`);
  if (phaseIssue) issues.push(phaseIssue);
  if (!title || title.length < 3) issues.push('Título curto ou ausente.');
  if (!prompt) issues.push('Enunciado vazio.');
  if (prompt.length < 6 || GENERIC_PROMPT.test(prompt)) issues.push('Enunciado genérico demais.');
  if (!hasPortugueseInstruction(prompt) && type !== QUESTION_TYPES.SPEAK_RESPONSE) issues.push('Enunciado principal deve orientar em português.');
  if (!answer && type !== QUESTION_TYPES.SPEAK_RESPONSE) issues.push('Resposta esperada vazia.');
  if (answer && VAGUE_ANSWER.test(answer)) issues.push('Resposta esperada vaga ou pessoal demais.');
  if (answerKind === ANSWER_KINDS.PERSONAL && [QUESTION_TYPES.MULTIPLE_CHOICE, QUESTION_TYPES.AUDIO_CHOICE, QUESTION_TYPES.TRUE_FALSE].includes(type)) {
    issues.push('Resposta pessoal não pode ser múltipla escolha.');
  }

  if ([QUESTION_TYPES.MULTIPLE_CHOICE, QUESTION_TYPES.AUDIO_CHOICE, QUESTION_TYPES.FILL_BLANK, QUESTION_TYPES.TRUE_FALSE].includes(type)) {
    const options = Array.isArray(question.options) ? question.options.map(cleanPracticeText).filter(Boolean) : [];
    const normalizedOptions = options.map(normalizePracticeText);
    const uniqueOptions = new Set(normalizedOptions);
    if (options.length < 2) issues.push('Alternativas insuficientes.');
    if (options.length > limits.maxChoiceOptions) issues.push('Alternativas demais.');
    if (uniqueOptions.size !== options.length) issues.push('Alternativas repetidas.');
    if (!options.some((option) => normalizePracticeText(option) === normalizePracticeText(answer))) issues.push('Resposta correta não está nas alternativas.');
    const badOptions = options.filter((option) => option.length > limits.maxOptionLength || BLOCKED_OPTION_PATTERNS.some((pattern) => pattern.test(option)));
    if (badOptions.length) issues.push('Alternativas longas, vagas ou pessoais.');
    if (!hasBalancedOptions(options)) issues.push('Alternativas têm formatos muito diferentes.');

    const tooSimilarPairs = options.some((option, index) => options.some((other, otherIndex) => otherIndex > index && isOptionTooSimilar(option, other)));
    if (tooSimilarPairs) issues.push('Alternativas parecidas demais entre si.');

    if (type === QUESTION_TYPES.TRUE_FALSE) {
      const validBoolean = options.length === 2 && options.every((option) => /^(true|false)$/i.test(option));
      if (!validBoolean) issues.push('True/False deve ter apenas True e False.');
    } else {
      const sameKindCount = options.filter((option) => detectAnswerKind(option) === answerKind).length;
      if (![ANSWER_KINDS.SHORT_PHRASE, ANSWER_KINDS.SENTENCE].includes(answerKind) && sameKindCount < Math.min(3, options.length)) {
        issues.push('Alternativas misturam tipos incompatíveis.');
      }
    }
  }

  if (type === QUESTION_TYPES.WORD_BANK) {
    const words = Array.isArray(question.words) ? question.words.map(cleanPracticeText).filter(Boolean) : [];
    if (words.length < 3) issues.push('Banco de palavras insuficiente.');
    if (words.length > 12) issues.push('Banco de palavras longo demais.');
    if (answer && splitPracticeWords(answer).length > 12) issues.push('Resposta longa demais para banco de palavras.');
  }

  if ([QUESTION_TYPES.DICTATION, QUESTION_TYPES.AUDIO_CHOICE].includes(type) && !cleanPracticeText(question.audioText)) {
    issues.push('Questão de áudio sem texto de áudio.');
  }

  if (type === QUESTION_TYPES.DICTATION && answer.length > 120) issues.push('Ditado longo demais.');
  if (type === QUESTION_TYPES.SPEAK_RESPONSE && prompt.length > 120) issues.push('Frase de fala longa demais.');
  if (type === QUESTION_TYPES.WRITE_SHORT && answer.length > 140) issues.push('Resposta escrita longa demais para resposta curta.');

  return issues;
}

export function isPracticeQuestionValid(question, limits) {
  return getPracticeQuestionIssues(question, limits).length === 0;
}

export function filterPracticeQuestions(questions, limits = DEFAULT_PRACTICE_LIMITS) {
  const seen = new Set();
  const phaseTypeCount = new Map();
  const accepted = [];
  const rejected = [];

  for (const question of Array.isArray(questions) ? questions : []) {
    const key = `${question?.type}:${normalizePracticeText(question?.prompt)}:${normalizePracticeText(question?.answer)}`;
    const phaseTypeKey = `${question?.phase}:${question?.type}`;
    const issues = getPracticeQuestionIssues(question, limits);
    if (seen.has(key)) issues.push('Questão duplicada.');
    if ((phaseTypeCount.get(phaseTypeKey) || 0) >= 8) issues.push('Tipo de questão repetido demais na mesma fase.');
    if (issues.length) {
      rejected.push({ question, issues });
      continue;
    }
    seen.add(key);
    phaseTypeCount.set(phaseTypeKey, (phaseTypeCount.get(phaseTypeKey) || 0) + 1);
    accepted.push(question);
  }

  return { accepted, rejected };
}

export function getPracticePlanIssues(plan, limits = DEFAULT_PRACTICE_LIMITS) {
  const issues = [];
  const questions = Array.isArray(plan?.questions) ? plan.questions : [];
  if (questions.length < Math.min(8, limits.minQuestions)) issues.push('Plano com poucas questões válidas.');
  const phases = new Set(questions.map((question) => question.phase));
  if (phases.size < 3) issues.push('Plano sem variedade suficiente de fases.');
  const types = new Set(questions.map((question) => question.type));
  if (types.size < 3) issues.push('Plano sem variedade suficiente de exercícios.');
  if (plan?.quality?.acceptedCount && plan.quality.acceptedCount < plan.quality.candidateCount * 0.35) issues.push('Muitas questões foram rejeitadas pelo quality gate.');
  return issues;
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
