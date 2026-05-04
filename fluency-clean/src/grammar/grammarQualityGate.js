import { GRAMMAR_BRAZILIAN_ERRORS } from './grammarBrazilianErrors.js';
import { GRAMMAR_FOCUS_AREAS, getGrammarLevelPolicy, normalizeGrammarLevel } from './grammarLevelPolicy.js';

export const GRAMMAR_QUALITY_GATE_VERSION = 'grammar-quality-gate-v1';

const VALID_FOCUS_AREAS = new Set(Object.values(GRAMMAR_FOCUS_AREAS));
const VALID_EXERCISE_TYPES = new Set(['multiple_choice', 'fill_blank', 'correction', 'word_bank', 'transform', 'write_short']);

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function normalize(value) {
  return clean(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s']/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function hasAnswerLeak(prompt, answer) {
  const promptNorm = normalize(prompt);
  const answerNorm = normalize(answer);
  if (!promptNorm || !answerNorm || answerNorm.length < 4) return false;
  return promptNorm.includes(answerNorm);
}

function normalizeOptions(options) {
  const seen = new Set();
  return ensureArray(options).map(clean).filter(Boolean).filter((option) => {
    const key = normalize(option);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 4);
}

function normalizeFocusArea(focusArea, policy, repairs, issues) {
  const raw = clean(focusArea);
  if (VALID_FOCUS_AREAS.has(raw)) return raw;

  if (raw) issues.push(`focusArea inválida: ${raw}`);
  const fallback = policy.focusAreas?.[0] || GRAMMAR_FOCUS_AREAS.PRESENT_SIMPLE;
  repairs.push(`focusArea normalizada para ${fallback}`);
  return fallback;
}

function normalizeRuleBlock(ruleBlock, issues, repairs) {
  const raw = ruleBlock && typeof ruleBlock === 'object' ? ruleBlock : {};
  const normalized = {
    whenToUse: clean(raw.whenToUse || raw.when_to_use || ''),
    affirmative: {
      form: clean(raw.affirmative?.form || ''),
      example: clean(raw.affirmative?.example || ''),
      translation: clean(raw.affirmative?.translation || ''),
    },
    negative: {
      form: clean(raw.negative?.form || ''),
      example: clean(raw.negative?.example || ''),
      translation: clean(raw.negative?.translation || ''),
    },
    question: {
      form: clean(raw.question?.form || ''),
      example: clean(raw.question?.example || ''),
      translation: clean(raw.question?.translation || ''),
    },
    notes: ensureArray(raw.notes).map(clean).filter(Boolean).slice(0, 6),
  };

  if (!normalized.affirmative.example) issues.push('ruleBlock sem exemplo afirmativo');
  if (!normalized.negative.example) issues.push('ruleBlock sem exemplo negativo');
  if (!normalized.question.example) issues.push('ruleBlock sem exemplo de pergunta');
  if (!normalized.whenToUse) repairs.push('ruleBlock sem whenToUse explícito');

  return normalized;
}

function normalizeExamplePairs(examplePairs, repairs) {
  const original = ensureArray(examplePairs);
  const valid = original.map((pair) => ({
    english: clean(pair?.english || pair?.en || pair?.sentence || ''),
    portuguese: clean(pair?.portuguese || pair?.pt || pair?.translation || ''),
    highlight: clean(pair?.highlight || pair?.target || ''),
  })).filter((pair) => pair.english && pair.portuguese);

  if (valid.length < original.length) repairs.push(`removidos ${original.length - valid.length} examplePairs incompletos`);
  return valid.slice(0, 10);
}

function normalizeTypicalErrors(typicalErrors, policy, repairs) {
  const source = ensureArray(typicalErrors).map((error) => {
    const rawTag = clean(error?.errorTag || error?.tag || '');
    const known = GRAMMAR_BRAZILIAN_ERRORS[rawTag];
    const errorTag = rawTag && !known ? `${rawTag}__custom` : rawTag;
    if (rawTag && !known) repairs.push(`typicalError custom marcado: ${rawTag}`);
    return {
      errorTag,
      wrongExample: clean(error?.wrongExample || error?.wrong || error?.incorrect || ''),
      correction: clean(error?.correction || error?.correct || error?.right || ''),
      why: clean(error?.why || error?.explanation || known?.why || ''),
    };
  }).filter((error) => error.wrongExample && error.correction);

  if (source.length) return source.slice(0, 8);

  const fallback = Object.entries(GRAMMAR_BRAZILIAN_ERRORS)
    .filter(([, error]) => error.level === policy.level || policy.focusAreas?.includes(error.area))
    .slice(0, 2)
    .map(([tag, error]) => ({
      errorTag: tag,
      wrongExample: error.examples?.[0]?.wrong || '',
      correction: error.examples?.[0]?.right || '',
      why: error.why,
    }))
    .filter((error) => error.wrongExample && error.correction);

  if (fallback.length) repairs.push('typicalErrors adicionados a partir do dicionário oficial');
  return fallback;
}

function validateExercise(exercise) {
  const issues = [];
  if (!exercise || typeof exercise !== 'object') return ['exercise inválido'];

  const type = clean(exercise.type || 'multiple_choice');
  const prompt = clean(exercise.prompt || exercise.question || '');
  const answer = clean(exercise.answer || exercise.correctAnswer || '');
  const englishSentence = clean(exercise.englishSentence || exercise.sentence || '');
  const options = normalizeOptions(exercise.options);
  const answerNorm = normalize(answer);

  if (!VALID_EXERCISE_TYPES.has(type)) issues.push(`tipo inválido: ${type}`);
  if (!prompt) issues.push('prompt vazio');
  if (!answer) issues.push('answer vazio');
  if (hasAnswerLeak(prompt, answer)) issues.push('resposta vazada no prompt');

  if (type === 'multiple_choice') {
    if (options.length < 2) issues.push('multiple_choice sem opções suficientes');
    if (options.length && !options.map(normalize).includes(answerNorm)) issues.push('resposta correta fora das opções');
  }

  if (type === 'correction') {
    if (!englishSentence) issues.push('correction sem englishSentence');
    if (englishSentence && normalize(englishSentence) === answerNorm) issues.push('correction com frase igual à resposta');
  }

  if (type === 'word_bank') {
    const words = ensureArray(exercise.words).map(clean).filter(Boolean);
    if (words.length && words.length < 3) issues.push('word_bank com poucas palavras');
  }

  return issues;
}

function normalizeExercise(exercise, index) {
  return {
    type: clean(exercise?.type || 'multiple_choice'),
    prompt: clean(exercise?.prompt || exercise?.question || ''),
    englishSentence: clean(exercise?.englishSentence || exercise?.sentence || ''),
    answer: clean(exercise?.answer || exercise?.correctAnswer || ''),
    options: normalizeOptions(exercise?.options),
    hint: clean(exercise?.hint || ''),
    grammarTag: clean(exercise?.grammarTag || exercise?.tag || ''),
    difficulty: clean(exercise?.difficulty || 'easy'),
    index,
  };
}

function normalizeExercises(exercises, issues, repairs) {
  const original = ensureArray(exercises);
  const cleanExercises = [];

  original.forEach((exercise, index) => {
    const normalized = normalizeExercise(exercise, index);
    const exerciseIssues = validateExercise(normalized);
    if (exerciseIssues.length) {
      issues.push(`exercise ${index + 1} descartado: ${exerciseIssues.join('; ')}`);
      return;
    }
    cleanExercises.push(normalized);
  });

  if (cleanExercises.length < original.length) repairs.push(`removidos ${original.length - cleanExercises.length} exercícios inválidos`);
  return cleanExercises;
}

function normalizeProductionPrompt(productionPrompt, policy, repairs) {
  const instruction = clean(productionPrompt?.instruction || productionPrompt?.prompt || '');
  if (instruction) {
    return {
      instruction,
      minSentences: Number(productionPrompt?.minSentences || policy.productionMinSentences),
      maxSentences: Number(productionPrompt?.maxSentences || policy.productionMaxSentences),
    };
  }

  repairs.push('productionPrompt adicionado por padrão');
  return {
    instruction: policy.productionInstruction || 'Escreva 2 frases usando a estrutura.',
    minSentences: Number(policy.productionMinSentences || 2),
    maxSentences: Number(policy.productionMaxSentences || 3),
  };
}

export function applyGrammarQualityGate(rawLesson = {}) {
  if (!rawLesson || typeof rawLesson !== 'object') return rawLesson;

  const issues = [];
  const repairs = [];
  const level = normalizeGrammarLevel(rawLesson.level || 'A1');
  const policy = getGrammarLevelPolicy(level);

  const gatedLesson = {
    ...rawLesson,
    type: 'grammar',
    level,
    title: clean(rawLesson.title || 'Grammar'),
    intro: clean(rawLesson.intro || ''),
    objective: clean(rawLesson.objective || ''),
    focusArea: normalizeFocusArea(rawLesson.focusArea || rawLesson.focus, policy, repairs, issues),
    ruleBlock: normalizeRuleBlock(rawLesson.ruleBlock, issues, repairs),
    examplePairs: normalizeExamplePairs(rawLesson.examplePairs, repairs),
    typicalErrors: normalizeTypicalErrors(rawLesson.typicalErrors, policy, repairs),
    exercises: normalizeExercises(rawLesson.exercises, issues, repairs),
    productionPrompt: normalizeProductionPrompt(rawLesson.productionPrompt, policy, repairs),
    reviewChecklist: ensureArray(rawLesson.reviewChecklist).map(clean).filter(Boolean).slice(0, 8),
  };

  gatedLesson.qualityGate = {
    version: GRAMMAR_QUALITY_GATE_VERSION,
    issues,
    repairs,
    passed: issues.length === 0,
  };

  return gatedLesson;
}

export function assertGrammarQualityGate(gatedLesson = {}) {
  if (!gatedLesson?.qualityGate) throw new Error('Quality gate de Grammar não foi aplicado.');
  if (!Array.isArray(gatedLesson.exercises) || gatedLesson.exercises.length < 4) {
    throw new Error('Aula Grammar com menos de 4 exercícios válidos após gate.');
  }
  return true;
}
