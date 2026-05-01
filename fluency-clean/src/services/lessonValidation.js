import { normalizeLesson } from './lessonTypes.js';

const APPROVAL_SCORE = 85;

const TYPE_REQUIREMENTS = {
  reading: {
    minSections: 6,
    minVocabulary: 12,
    minExercises: 12,
    minPrompts: 4,
    minMainLength: 900,
    requiredSignals: ['pré-leitura', 'leitura', 'compreensão', 'vocabulário', 'revisão'],
  },
  grammar: {
    minSections: 7,
    minVocabulary: 8,
    minExercises: 14,
    minPrompts: 4,
    minMainLength: 0,
    requiredSignals: ['quando usar', 'afirmativa', 'negativa', 'pergunta', 'erro', 'revisão'],
  },
  listening: {
    minSections: 6,
    minVocabulary: 10,
    minExercises: 10,
    minPrompts: 4,
    minMainLength: 750,
    requiredSignals: ['escuta', 'áudio', 'transcrição', 'detalhe', 'shadowing', 'ouça', 'vocabulário', 'revisão'],
  },
  writing: {
    minSections: 6,
    minVocabulary: 10,
    minExercises: 10,
    minPrompts: 5,
    minMainLength: 0,
    requiredSignals: ['modelo', 'estrutura', 'frases', 'checklist', 'produção'],
  },
  speaking: {
    minSections: 5,
    minVocabulary: 6,
    minExercises: 6,
    minPrompts: 5,
    minMainLength: 0,
    requiredSignals: ['modelo', 'repetição', 'pronúncia', 'conversa', 'tentativa'],
  },
  vocabulary: {
    minSections: 5,
    minVocabulary: 12,
    minExercises: 10,
    minPrompts: 4,
    minMainLength: 0,
    requiredSignals: ['contexto', 'exemplo', 'prática', 'revisão'],
  },
};

function requirementFor(type) { return TYPE_REQUIREMENTS[type] || TYPE_REQUIREMENTS.reading; }
function cleanText(value) { return String(value ?? '').trim(); }
function normalizeScore(value) { return Math.max(0, Math.min(100, Math.round(value))); }
function countWords(value) { const text = cleanText(value); return text ? text.split(/\s+/).filter(Boolean).length : 0; }

function buildSearchText(lesson) {
  return [
    lesson.title, lesson.intro, lesson.objective, lesson.focus, lesson.listeningText,
    ...lesson.sections.flatMap((section) => [section.title, section.content]),
    ...lesson.tips,
    ...lesson.prompts,
    ...lesson.vocabulary.flatMap((item) => [item.word, item.meaning, item.example]),
    ...lesson.exercises.flatMap((item) => [item.question, item.answer, item.explanation]),
  ].map(cleanText).filter(Boolean).join(' ').toLowerCase();
}

function scorePresence(value, full = 100, partial = 65) {
  const text = cleanText(value);
  if (text.length >= 80) return full;
  if (text.length >= 24) return partial;
  return 0;
}

function scoreCount(count, required) { return required ? normalizeScore((count / required) * 100) : 100; }
function scoreSignals(searchText, signals) { const matched = signals.filter((signal) => searchText.includes(signal.toLowerCase())).length; return signals.length ? normalizeScore((matched / signals.length) * 100) : 100; }

function scoreExercises(exercises) {
  if (!exercises.length) return 0;
  const withQuestion = exercises.filter((item) => cleanText(item.question).length >= 8).length;
  const withAnswer = exercises.filter((item) => cleanText(item.answer)).length;
  const withExplanation = exercises.filter((item) => cleanText(item.explanation).length >= 20).length;
  const validOptions = exercises.filter((item) => {
    if (!Array.isArray(item.options) || !item.options.length) return true;
    return item.options.includes(item.answer);
  }).length;
  return normalizeScore(((withQuestion + withAnswer + withExplanation + validOptions) / (exercises.length * 4)) * 100);
}

function scoreLevelFit(lesson, expectedLevel) {
  const lessonLevel = cleanText(lesson.level).toUpperCase();
  const targetLevel = cleanText(expectedLevel).toUpperCase();
  let score = targetLevel && lessonLevel !== targetLevel ? 76 : 100;
  const searchText = buildSearchText(lesson);
  const earlyLevel = ['A1', 'A2'].includes(targetLevel || lessonLevel);
  const advancedSignals = ['present perfect continuous', 'third conditional', 'inversion', 'subjunctive', 'passive voice advanced'];
  const advancedHits = earlyLevel ? advancedSignals.filter((signal) => searchText.includes(signal)).length : 0;
  if (advancedHits) score -= advancedHits * 8;
  return normalizeScore(score);
}

function typeMismatchIssues(lesson, expectedType, searchText) {
  const issues = [];
  if (expectedType === 'listening') {
    const grammarHeavy = /\b(to be|present simple|afirmativa|negativa|interrogativa|verb|verbo|grammar|gramática)\b/i.test(searchText);
    const listeningSignals = ['listen', 'listening', 'audio', 'áudio', 'ouça', 'escuta', 'transcrição', 'transcription', 'shadowing', 'hears', 'conversation'];
    const listeningHits = listeningSignals.filter((signal) => searchText.includes(signal.toLowerCase())).length;
    const transcriptWords = countWords(lesson.listeningText);
    if (grammarHeavy && listeningHits < 4) issues.push('Aula esperada era Listening, mas o conteúdo está com foco de Grammar. Gere/repare com roteiro de escuta, transcrição, compreensão auditiva e shadowing.');
    if (transcriptWords < 90) issues.push('Listening precisa de uma transcrição/roteiro auditivo real antes dos exercícios.');
  }
  if (expectedType === 'grammar') {
    const grammarSignals = ['quando usar', 'afirmativa', 'negativa', 'pergunta', 'estrutura', 'exemplo', 'erro'];
    const hits = grammarSignals.filter((signal) => searchText.includes(signal)).length;
    if (hits < 3) issues.push('Aula esperada era Grammar, mas faltam regra, estrutura, exemplos e erros comuns.');
  }
  return issues;
}

function buildReview({ lesson, expectedLevel, expectedType }) {
  const requirements = requirementFor(lesson.type);
  const searchText = buildSearchText(lesson);
  const issues = [];

  const objectiveClear = scorePresence(lesson.objective);
  if (objectiveClear < 80) issues.push('Objetivo da aula está ausente ou curto demais.');

  const levelFit = scoreLevelFit(lesson, expectedLevel);
  if (levelFit < 85) issues.push(`Nível da aula (${lesson.level || 'não informado'}) não está bem alinhado ao nível esperado (${expectedLevel || 'cronograma'}).`);

  const mismatchIssues = typeMismatchIssues(lesson, expectedType || lesson.type, searchText);
  issues.push(...mismatchIssues);

  const sectionCountScore = scoreCount(lesson.sections.length, requirements.minSections);
  const sectionDepthScore = lesson.sections.length ? normalizeScore((lesson.sections.filter((section) => countWords(section.content) >= 18).length / lesson.sections.length) * 100) : 0;
  const signalScore = scoreSignals(searchText, requirements.requiredSignals);
  const clarity = normalizeScore((sectionDepthScore * 0.55) + (signalScore * 0.25) + (objectiveClear * 0.2));

  if (sectionCountScore < 100) issues.push(`Poucas seções explicativas: ${lesson.sections.length}/${requirements.minSections}.`);
  if (sectionDepthScore < 75) issues.push('Algumas seções estão rasas demais para uma aula confiável.');
  if (signalScore < 70) issues.push('A estrutura não cobre funções pedagógicas essenciais para esse tipo de aula.');

  const vocabularyScore = scoreCount(lesson.vocabulary.length, requirements.minVocabulary);
  const vocabularyQuality = lesson.vocabulary.length ? normalizeScore((lesson.vocabulary.filter((item) => cleanText(item.word) && cleanText(item.meaning) && cleanText(item.example)).length / lesson.vocabulary.length) * 100) : 0;
  if (vocabularyScore < 100) issues.push(`Vocabulário insuficiente: ${lesson.vocabulary.length}/${requirements.minVocabulary}.`);
  if (vocabularyQuality < 75) issues.push('Vocabulário precisa ter palavra, significado e exemplo contextualizado.');

  const exerciseCountScore = scoreCount(lesson.exercises.length, requirements.minExercises);
  const exerciseQuality = scoreExercises(lesson.exercises);
  if (exerciseCountScore < 100) issues.push(`Exercícios insuficientes: ${lesson.exercises.length}/${requirements.minExercises}.`);
  if (exerciseQuality < 90) issues.push('Exercícios precisam ter pergunta, resposta esperada e explicação clara.');

  const activePractice = normalizeScore((exerciseCountScore * 0.45) + (exerciseQuality * 0.35) + (scoreCount(lesson.prompts.length, requirements.minPrompts) * 0.2));
  if (lesson.prompts.length < requirements.minPrompts) issues.push(`Produção final/prática independente insuficiente: ${lesson.prompts.length}/${requirements.minPrompts}.`);

  let mainContentScore = 100;
  if (requirements.minMainLength > 0) {
    mainContentScore = scoreCount(cleanText(lesson.listeningText).length, requirements.minMainLength);
    if (mainContentScore < 100) issues.push('Texto/transcrição principal está curto demais para o tipo da aula.');
  }

  const reviewIncluded = /revis[aã]o|recap|resumo|checklist|conclus[aã]o|final/i.test(searchText) ? 100 : 45;
  if (reviewIncluded < 80) issues.push('Aula precisa de revisão final, resumo ou checklist de conclusão.');

  let completeness = normalizeScore((sectionCountScore * 0.2) + (mainContentScore * 0.15) + (vocabularyScore * 0.15) + (vocabularyQuality * 0.1) + (exerciseCountScore * 0.2) + (reviewIncluded * 0.2));
  let progression = normalizeScore((sectionDepthScore * 0.35) + (signalScore * 0.35) + (reviewIncluded * 0.3));
  if (mismatchIssues.length) {
    completeness = Math.min(completeness, 58);
    progression = Math.min(progression, 58);
  }
  const examplesUseful = normalizeScore((vocabularyQuality * 0.55) + (exerciseQuality * 0.25) + (scorePresence(lesson.intro) * 0.2));
  const answerKey = normalizeScore(exerciseQuality);
  const contextualVocabulary = normalizeScore((vocabularyScore * 0.4) + (vocabularyQuality * 0.6));

  const overallScore = normalizeScore((objectiveClear * 0.1) + (levelFit * 0.12) + (clarity * 0.14) + (completeness * 0.18) + (progression * 0.12) + (examplesUseful * 0.1) + (activePractice * 0.12) + (answerKey * 0.07) + (contextualVocabulary * 0.03) + (reviewIncluded * 0.02));
  const uniqueIssues = [...new Set(issues)].slice(0, 8);

  return {
    approved: overallScore >= APPROVAL_SCORE && uniqueIssues.length <= 3 && !mismatchIssues.length,
    overallScore,
    objectiveClear,
    levelFit,
    clarity,
    completeness,
    progression,
    examplesUseful,
    activePractice,
    answerKey,
    contextualVocabulary,
    reviewIncluded,
    issues: uniqueIssues,
    revisionInstructions: uniqueIssues.length ? `Corrija antes de salvar: ${uniqueIssues.join(' ')}` : '',
    checkedAt: new Date().toISOString(),
    approvalThreshold: APPROVAL_SCORE,
  };
}

export function validateLessonForQuality(rawLesson, { expectedLevel = '', expectedType = '' } = {}) {
  const normalized = normalizeLesson(rawLesson);
  const targetType = cleanText(expectedType) || normalized.type;
  const lesson = normalizeLesson({ ...normalized, type: targetType, level: expectedLevel || normalized.level });
  return buildReview({ lesson, expectedLevel: expectedLevel || lesson.level, expectedType: targetType });
}

export function attachPedagogicalReview(rawLesson, review) {
  return {
    ...rawLesson,
    pedagogicalReview: review,
    quality: {
      ...(rawLesson?.quality && typeof rawLesson.quality === 'object' ? rawLesson.quality : {}),
      pedagogicalScore: review.overallScore,
      approved: review.approved,
      issues: review.issues,
    },
  };
}
