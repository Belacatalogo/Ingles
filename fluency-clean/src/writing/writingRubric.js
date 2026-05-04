import { getWritingLevelPolicy, getWritingRubricCriteria } from './writingLevelPolicy.js';

export const WRITING_ERROR_TYPES = Object.freeze({
  GRAMMAR: 'grammar',
  VOCABULARY: 'vocabulary',
  COHESION: 'cohesion',
  TASK: 'task',
});

function clean(value) {
  return String(value ?? '').trim();
}

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
}

function normalizeWords(value) {
  return clean(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9'\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function sentenceCount(value) {
  return clean(value).split(/[.!?]+/).map(clean).filter(Boolean).length;
}

export function getWritingRubricForLevel(level = 'A1') {
  const policy = getWritingLevelPolicy(level);
  if (!policy.rubricApplied) return null;
  return {
    level: policy.level,
    criteria: getWritingRubricCriteria(),
    passingScore: policy.rubricPassingScore,
  };
}

export function evaluateWritingResponse({ studentText, modelAnswer, level }) {
  const student = clean(studentText);
  const model = clean(modelAnswer);
  const policy = getWritingLevelPolicy(level);

  if (!policy.rubricApplied) {
    const attempted = student.length >= 3;
    return {
      attempted,
      rubricApplied: false,
      score: attempted ? 70 : 0,
    };
  }

  if (student.length < 3) {
    return {
      attempted: false,
      rubricApplied: true,
      scores: { grammar: 0, vocabulary: 0, cohesion: 0, task: 0 },
      totalScore: 0,
      passed: false,
      passingScore: policy.rubricPassingScore,
      errors: [{ type: WRITING_ERROR_TYPES.TASK, detail: 'Tente escrever uma resposta antes de enviar.' }],
      suggestedRewrite: model ? `Sugestão: "${model}"` : '',
    };
  }

  const criteria = getWritingRubricCriteria();
  const scores = {};
  const errors = [];

  const grammarScore = estimateGrammarScore(student, model);
  scores.grammar = grammarScore;
  if (grammarScore < 60) errors.push({ type: WRITING_ERROR_TYPES.GRAMMAR, detail: 'Verifique pontuação, capitalização e estrutura da frase.' });

  const vocabScore = estimateVocabScore(student, model, policy);
  scores.vocabulary = vocabScore;
  if (vocabScore < 60) errors.push({ type: WRITING_ERROR_TYPES.VOCABULARY, detail: 'Tente usar mais vocabulário da aula ou palavras mais específicas.' });

  const cohesionScore = estimateCohesionScore(student);
  scores.cohesion = cohesionScore;
  if (cohesionScore < 60) errors.push({ type: WRITING_ERROR_TYPES.COHESION, detail: 'Use conectivos como because, however, therefore ou for example.' });

  const taskScore = estimateTaskScore(student, model, policy);
  scores.task = taskScore;
  if (taskScore < 60) errors.push({ type: WRITING_ERROR_TYPES.TASK, detail: 'Leia o enunciado novamente e responda exatamente o que foi pedido.' });

  const total = criteria.reduce((sum, criterion) => sum + ((scores[criterion.id] || 0) * Number(criterion.weight || 0)) / 100, 0);
  const totalScore = clampScore(total);
  const passed = totalScore >= policy.rubricPassingScore;

  return {
    attempted: true,
    rubricApplied: true,
    scores,
    totalScore,
    passed,
    passingScore: policy.rubricPassingScore,
    errors,
    suggestedRewrite: passed ? '' : buildSuggestedRewrite(student, model, errors),
  };
}

function estimateGrammarScore(student) {
  let score = 82;
  const text = clean(student);
  const words = normalizeWords(text);
  if (!/[.!?]$/.test(text)) score -= 10;
  if (/\bi\b/.test(text)) score -= 15;
  if (words.length < 3) score -= 20;
  if (/\b(he|she|it)\s+(work|play|live|study|go|have)\b/i.test(text)) score -= 15;
  if (/\b(i|you|we|they)\s+has\b/i.test(text)) score -= 10;
  if (/\b(he|she|it)\s+have\b/i.test(text)) score -= 10;
  return clampScore(score);
}

function estimateVocabScore(student, model, policy) {
  const studentWords = new Set(normalizeWords(student).filter((word) => word.length > 2));
  const modelWords = new Set(normalizeWords(model).filter((word) => word.length > 2));
  if (!studentWords.size) return 0;
  if (!modelWords.size) return clampScore(Math.min(100, studentWords.size * 12));
  const overlap = [...studentWords].filter((word) => modelWords.has(word)).length;
  const ratio = overlap / Math.max(1, Math.min(modelWords.size, 10));
  const varietyBoost = Math.min(25, studentWords.size * (policy.level === 'C1' ? 2 : 3));
  return clampScore((ratio * 75) + varietyBoost);
}

function estimateCohesionScore(student) {
  const connectives = /\b(because|however|therefore|although|moreover|furthermore|in addition|as a result|on the other hand|for example|also|then|so|but|and)\b/i;
  let score = 58;
  if (connectives.test(student)) score += 28;
  if (sentenceCount(student) >= 2) score += 14;
  return clampScore(score);
}

function estimateTaskScore(student, model, policy) {
  const words = normalizeWords(student);
  if (words.join('').length < 10) return 40;
  const minSentences = Number(policy.productionSentences?.min || 1);
  let score = sentenceCount(student) >= minSentences ? 76 : 58;
  const modelKeywords = normalizeWords(model).filter((word) => word.length > 4).slice(0, 8);
  if (modelKeywords.length) {
    const studentSet = new Set(words);
    const overlap = modelKeywords.filter((word) => studentSet.has(word)).length;
    score += Math.min(24, overlap * 6);
  } else {
    score += Math.min(18, words.length * 2);
  }
  return clampScore(score);
}

function buildSuggestedRewrite(student, model, errors) {
  if (!errors.length) return '';
  if (model) return `Sugestão: "${model}"`;
  const fixed = clean(student)
    .replace(/\bi\b/g, 'I')
    .replace(/\s+/g, ' ');
  return fixed ? `Sugestão: "${/[.!?]$/.test(fixed) ? fixed : `${fixed}.`}"` : '';
}

export function formatRubricFeedback(evaluation) {
  if (!evaluation?.rubricApplied) {
    return evaluation?.attempted ? 'Boa tentativa! Continue praticando.' : 'Tente escrever algo.';
  }
  const criteria = getWritingRubricCriteria();
  return {
    totalScore: evaluation.totalScore,
    passed: evaluation.passed,
    passingScore: evaluation.passingScore,
    criteriaLines: criteria.map((criterion) => `${criterion.label}: ${evaluation.scores?.[criterion.id] ?? 0}/100`),
    errors: Array.isArray(evaluation.errors) ? evaluation.errors : [],
    suggestedRewrite: evaluation.suggestedRewrite || '',
  };
}
