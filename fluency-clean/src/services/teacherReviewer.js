import { normalizeLesson } from './lessonTypes.js';

function clean(value) {
  return String(value ?? '').trim();
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function countWords(value) {
  const text = clean(value);
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

function searchText(lesson) {
  return [
    lesson.title,
    lesson.intro,
    lesson.objective,
    lesson.focus,
    lesson.listeningText,
    ...ensureArray(lesson.sections).flatMap((section) => [section.title, section.content]),
    ...ensureArray(lesson.vocabulary).flatMap((item) => [item.word, item.meaning, item.example]),
    ...ensureArray(lesson.exercises).flatMap((item) => [item.question, ensureArray(item.options).join(' '), item.answer, item.explanation]),
    ...ensureArray(lesson.prompts),
  ].map(clean).filter(Boolean).join(' ').toLowerCase();
}

function scoreCoherence(lesson) {
  const text = searchText(lesson);
  const titleTokens = clean(lesson.title).toLowerCase().split(/[^a-záéíóúâêîôûãõç0-9]+/i).filter((token) => token.length >= 4);
  const hits = titleTokens.filter((token) => text.includes(token)).length;
  const titleScore = titleTokens.length ? normalizeScore((hits / titleTokens.length) * 100) : 75;
  const hasObjective = clean(lesson.objective).length >= 45 ? 100 : clean(lesson.objective).length >= 20 ? 70 : 20;
  const hasScenario = /(school|café|cafe|reception|teacher|student|call|home|work|loja|escola|recepção|professor|aluno|cafeteria|video|vídeo)/i.test(text) ? 100 : 65;
  return normalizeScore(titleScore * 0.35 + hasObjective * 0.35 + hasScenario * 0.3);
}

function scoreDepth(lesson) {
  const sections = ensureArray(lesson.sections);
  const sectionDepth = sections.length ? normalizeScore((sections.filter((section) => countWords(section.content) >= 22).length / sections.length) * 100) : 0;
  const vocabDepth = ensureArray(lesson.vocabulary).length ? normalizeScore((lesson.vocabulary.filter((item) => clean(item.word) && clean(item.meaning) && countWords(item.example) >= 3).length / lesson.vocabulary.length) * 100) : 0;
  const promptDepth = ensureArray(lesson.prompts).length >= 4 ? 100 : ensureArray(lesson.prompts).length >= 2 ? 70 : 20;
  return normalizeScore(sectionDepth * 0.45 + vocabDepth * 0.35 + promptDepth * 0.2);
}

function isWeakSpellingQuestion(exercise) {
  const question = clean(exercise.question).toLowerCase();
  const options = ensureArray(exercise.options).map(clean).filter(Boolean);
  if (!/spell|soletr|letras/.test(question)) return false;
  if (!options.length) return false;
  const answer = clean(exercise.answer);
  const answerLooksLikeSpelling = /^[A-Z](?:-[A-Z]){1,}$/i.test(answer);
  return answerLooksLikeSpelling && options.some((option) => option.toLowerCase() === answer.toLowerCase());
}

function scoreExerciseUsefulness(lesson) {
  const exercises = ensureArray(lesson.exercises);
  if (!exercises.length) return 0;
  const useful = exercises.filter((exercise) => {
    const question = clean(exercise.question);
    const answer = clean(exercise.answer);
    const explanation = clean(exercise.explanation);
    const options = ensureArray(exercise.options);
    if (question.length < 8 || !answer || explanation.length < 18) return false;
    if (isWeakSpellingQuestion(exercise)) return false;
    if (options.length && options.every((option) => option.length <= 2) && !/letra|letter|som|sound/i.test(question)) return false;
    return true;
  }).length;
  return normalizeScore((useful / exercises.length) * 100);
}

function scoreSkillAlignment(lesson, expectedType = '') {
  const type = clean(expectedType || lesson.type).toLowerCase();
  const text = searchText(lesson);
  if (type === 'listening') {
    const transcriptWords = countWords(lesson.listeningText);
    const listeningSignals = ['listen', 'audio', 'transcription', 'transcrição', 'shadowing', 'hear', 'ouça', 'escuta'];
    const hits = listeningSignals.filter((signal) => text.includes(signal)).length;
    return normalizeScore(Math.min(100, transcriptWords / 1.6) * 0.55 + Math.min(100, hits * 18) * 0.45);
  }
  if (type === 'grammar') {
    const signals = ['quando usar', 'estrutura', 'afirmativa', 'negativa', 'pergunta', 'erro', 'exemplo'];
    const hits = signals.filter((signal) => text.includes(signal)).length;
    return normalizeScore(Math.min(100, hits * 18));
  }
  if (type === 'reading') {
    const signals = ['texto', 'leitura', 'read', 'main idea', 'ideia principal', 'detalhe', 'contexto'];
    const hits = signals.filter((signal) => text.includes(signal)).length;
    return normalizeScore(Math.min(100, hits * 17));
  }
  if (type === 'writing') {
    const signals = ['write', 'escreva', 'frase', 'revis', 'modelo', 'corrija', 'reescreva'];
    const hits = signals.filter((signal) => text.includes(signal)).length;
    return normalizeScore(Math.min(100, hits * 17));
  }
  if (type === 'speaking') {
    const signals = ['speak', 'fale', 'pronunciation', 'pronúncia', 'repeat', 'repita', 'record', 'grave'];
    const hits = signals.filter((signal) => text.includes(signal)).length;
    return normalizeScore(Math.min(100, hits * 17));
  }
  return 80;
}

function scoreAntiIllusion(lesson) {
  const exercises = ensureArray(lesson.exercises);
  if (!exercises.length) return 0;
  const multipleChoice = exercises.filter((item) => ensureArray(item.options).length >= 2).length;
  const production = exercises.filter((item) => !ensureArray(item.options).length || /write|digite|escreva|corrija|fale|say|speak|record|grave|ouça|listen/i.test(clean(item.question))).length;
  const weakSpelling = exercises.filter(isWeakSpellingQuestion).length;
  let score = 100;
  if (multipleChoice > exercises.length * 0.75) score -= 18;
  if (production < Math.max(2, Math.ceil(exercises.length * 0.22))) score -= 22;
  if (weakSpelling) score -= Math.min(30, weakSpelling * 10);
  return normalizeScore(score);
}

function scoreLevelSafety(lesson, expectedLevel = '') {
  const level = clean(expectedLevel || lesson.level).toUpperCase();
  const text = searchText(lesson);
  const early = ['A1', 'A2'].includes(level);
  if (!early) return 88;
  const advancedSignals = ['third conditional', 'inversion', 'subjunctive', 'mixed conditional', 'present perfect continuous', 'advanced passive'];
  const hits = advancedSignals.filter((signal) => text.includes(signal)).length;
  const longDictation = ensureArray(lesson.exercises).some((item) => /digite|write|listen|ouça/i.test(clean(item.question)) && countWords(item.answer) > 9);
  let score = 100 - hits * 15;
  if (longDictation) score -= 16;
  return normalizeScore(score);
}

export function reviewLessonAsTeacher(rawLesson, { expectedLevel = '', expectedType = '', baseReview = null } = {}) {
  const lesson = normalizeLesson(rawLesson);
  const coherence = scoreCoherence(lesson);
  const depth = scoreDepth(lesson);
  const exerciseUsefulness = scoreExerciseUsefulness(lesson);
  const skillAlignment = scoreSkillAlignment(lesson, expectedType || lesson.type);
  const antiIllusion = scoreAntiIllusion(lesson);
  const levelSafety = scoreLevelSafety(lesson, expectedLevel || lesson.level);
  const baseScore = Number(baseReview?.overallScore || 0);

  const teacherScore = normalizeScore(
    coherence * 0.18 +
    depth * 0.17 +
    exerciseUsefulness * 0.2 +
    skillAlignment * 0.18 +
    antiIllusion * 0.17 +
    levelSafety * 0.1
  );

  const finalScore = baseScore
    ? normalizeScore(baseScore * 0.55 + teacherScore * 0.45)
    : teacherScore;

  const issues = [];
  if (coherence < 72) issues.push('Professor revisor: a aula não está coerente o suficiente entre objetivo, cenário e conteúdo.');
  if (depth < 72) issues.push('Professor revisor: a aula ainda parece rasa em explicação, vocabulário ou produção.');
  if (exerciseUsefulness < 78) issues.push('Professor revisor: os exercícios não treinam bem a habilidade ou ainda entregam respostas fáceis.');
  if (skillAlignment < 75) issues.push('Professor revisor: a aula não está alinhada o bastante ao tipo esperado.');
  if (antiIllusion < 78) issues.push('Professor revisor: há risco de falso domínio por excesso de reconhecimento e pouca produção.');
  if (levelSafety < 82) issues.push('Professor revisor: dificuldade ou formato inadequado para o nível atual.');

  const approved = finalScore >= 82 && issues.length <= 2;

  return {
    approved,
    finalScore,
    teacherScore,
    baseScore,
    coherence,
    depth,
    exerciseUsefulness,
    skillAlignment,
    antiIllusion,
    levelSafety,
    issues,
    advice: issues.length ? `Revisar antes de salvar: ${issues.join(' ')}` : 'Aula aprovada pelo professor revisor.',
    checkedAt: new Date().toISOString(),
    reviewer: 'teacher-reviewer-v1',
  };
}

export function attachTeacherReview(rawLesson, teacherReview) {
  return {
    ...rawLesson,
    teacherReview,
    quality: {
      ...(rawLesson?.quality && typeof rawLesson.quality === 'object' ? rawLesson.quality : {}),
      teacherScore: teacherReview.finalScore,
      teacherApproved: teacherReview.approved,
      teacherIssues: teacherReview.issues,
      reviewer: teacherReview.reviewer,
    },
  };
}
