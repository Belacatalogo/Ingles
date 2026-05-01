import { normalizeLesson } from './lessonTypes.js';

function clean(value) {
  return String(value ?? '').trim();
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function countWords(value) {
  const text = clean(value);
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

function textOf(lesson) {
  return [
    lesson.title,
    lesson.intro,
    lesson.objective,
    lesson.focus,
    lesson.listeningText,
    ...ensureArray(lesson.sections).flatMap((section) => [section?.title, section?.content]),
    ...ensureArray(lesson.vocabulary).flatMap((item) => [item?.word, item?.meaning, item?.example]),
    ...ensureArray(lesson.exercises).flatMap((item) => [item?.question, item?.answer, item?.explanation]),
    ...ensureArray(lesson.prompts),
  ].map(clean).filter(Boolean).join(' ').toLowerCase();
}

function hasAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function productionCount(lesson) {
  const prompts = ensureArray(lesson.prompts).length;
  const openExercises = ensureArray(lesson.exercises).filter((item) => !ensureArray(item?.options).length || /write|escreva|digite|fale|say|speak|repeat|repita|corrija|rewrite|reescreva|shadow/i.test(clean(item?.question))).length;
  return prompts + openExercises;
}

function baseCounts(lesson) {
  return {
    sections: ensureArray(lesson.sections).length,
    vocabulary: ensureArray(lesson.vocabulary).length,
    exercises: ensureArray(lesson.exercises).length,
    prompts: ensureArray(lesson.prompts).length,
    production: productionCount(lesson),
    mainWords: countWords(lesson.listeningText),
  };
}

function checkListening(lesson, text, counts) {
  const missing = [];
  const warnings = [];
  if (counts.mainWords < 120) missing.push('texto/áudio principal curto demais para treinar listening.');
  else if (counts.mainWords < 200) warnings.push('texto/áudio principal está curto, mas pode servir para revisão curta.');
  if (counts.vocabulary < 8) missing.push('vocabulário auditivo insuficiente.');
  if (counts.exercises < 8) missing.push('poucas questões para prática profunda.');
  if (!hasAny(text, ['shadowing', 'repita', 'repeat', 'ouça', 'listen'])) warnings.push('shadowing ou repetição não está explícito o bastante.');
  if (counts.production < 3) warnings.push('pouca produção ativa após escuta.');
  return { missing, warnings };
}

function checkGrammar(lesson, text, counts) {
  const missing = [];
  const warnings = [];
  const requirements = [
    ['quando usar', 'when to use', 'uso'],
    ['afirmativa', 'affirmative'],
    ['negativa', 'negative'],
    ['pergunta', 'question'],
    ['erro', 'mistake', 'common error', 'erros comuns'],
    ['exemplo', 'example'],
  ];
  const missingConcepts = requirements.filter((group) => !hasAny(text, group)).length;
  if (counts.sections < 6) missing.push('gramática precisa de seções suficientes para regra, uso, forma e revisão.');
  if (missingConcepts >= 3) missing.push('faltam funções essenciais de gramática: uso, formas, perguntas, erros comuns ou exemplos.');
  else if (missingConcepts > 0) warnings.push('alguma função gramatical essencial está pouco explícita.');
  if (counts.exercises < 12) missing.push('poucos exercícios para fixar a regra gramatical.');
  if (counts.production < 4) warnings.push('pouca produção própria com a regra.');
  return { missing, warnings };
}

function checkReading(lesson, text, counts) {
  const missing = [];
  const warnings = [];
  if (counts.mainWords < 150) missing.push('texto principal curto demais para reading.');
  if (counts.vocabulary < 8) missing.push('vocabulário de leitura insuficiente.');
  if (counts.exercises < 8) missing.push('poucas questões de compreensão.');
  if (!hasAny(text, ['ideia principal', 'main idea', 'detalhe', 'detail', 'inferência', 'inference'])) warnings.push('estratégias de compreensão ainda pouco explícitas.');
  if (counts.production < 2) warnings.push('pouca produção final após leitura.');
  return { missing, warnings };
}

function checkWriting(lesson, text, counts) {
  const missing = [];
  const warnings = [];
  if (!hasAny(text, ['modelo', 'model', 'estrutura', 'structure'])) missing.push('writing precisa de modelo e estrutura antes da produção.');
  if (!hasAny(text, ['reescreva', 'rewrite', 'revise', 'checklist', 'corrija'])) warnings.push('faltam revisão, reescrita ou checklist explícitos.');
  if (counts.production < 5) missing.push('writing precisa de produção escrita guiada suficiente.');
  if (counts.exercises < 8) warnings.push('microprática de escrita poderia ser mais forte.');
  return { missing, warnings };
}

function checkSpeaking(lesson, text, counts) {
  const missing = [];
  const warnings = [];
  if (!hasAny(text, ['speak', 'fale', 'pronúncia', 'pronunciation', 'repeat', 'repita'])) missing.push('speaking precisa de fala ativa, repetição ou foco de pronúncia.');
  if (counts.production < 5) missing.push('speaking precisa de mais produção oral ativa.');
  if (!hasAny(text, ['record', 'grave', 'clareza', 'clarity', 'ritmo', 'rhythm'])) warnings.push('autoavaliação de fala/ritmo ainda pouco explícita.');
  return { missing, warnings };
}

function checkByType(lesson, text, counts) {
  const type = clean(lesson.type).toLowerCase();
  if (type === 'listening') return checkListening(lesson, text, counts);
  if (type === 'grammar') return checkGrammar(lesson, text, counts);
  if (type === 'reading') return checkReading(lesson, text, counts);
  if (type === 'writing') return checkWriting(lesson, text, counts);
  if (type === 'speaking') return checkSpeaking(lesson, text, counts);
  return checkReading(lesson, text, counts);
}

export function evaluateStudyReadiness(rawLesson, { teacherReview = {}, pedagogicalReview = {} } = {}) {
  const lesson = normalizeLesson(rawLesson);
  const counts = baseCounts(lesson);
  const text = textOf(lesson);
  const { missing, warnings } = checkByType(lesson, text, counts);
  const teacherIssues = ensureArray(teacherReview?.issues);
  const pedagogicalIssues = ensureArray(pedagogicalReview?.issues);
  const criticalIssues = [...teacherIssues, ...pedagogicalIssues].filter((issue) => /estrutura não cobre|aula sem|curto demais|insuficiente|não está alinhada|reprovada|faltam funções/i.test(clean(issue)));
  const finalScore = Number(teacherReview?.finalScore || pedagogicalReview?.overallScore || 0);

  let status = 'study-ready';
  let label = 'Pode estudar';
  let confidence = 'concreta';
  let message = 'A aula tem estrutura suficiente para estudar com confiança prática.';

  if (missing.length || criticalIssues.length || finalScore < 82) {
    status = 'do-not-study';
    label = 'Não estudar ainda';
    confidence = 'baixa';
    message = 'A aula precisa de reparo antes de valer seu tempo.';
  } else if (warnings.length || finalScore < 90) {
    status = 'study-with-attention';
    label = 'Pode estudar com atenção';
    confidence = 'moderada';
    message = 'A aula é concreta, mas há pontos para observar durante o estudo.';
  }

  return {
    status,
    label,
    confidence,
    message,
    type: lesson.type || 'reading',
    checkedAt: new Date().toISOString(),
    checks: counts,
    missing,
    warnings,
    criticalIssues,
    version: 'study-readiness-v1',
  };
}

export function attachStudyReadiness(rawLesson, readiness) {
  return {
    ...rawLesson,
    studyReadiness: readiness,
    quality: {
      ...(rawLesson?.quality && typeof rawLesson.quality === 'object' ? rawLesson.quality : {}),
      studyReadiness: readiness,
      studyReady: readiness.status === 'study-ready',
    },
  };
}
