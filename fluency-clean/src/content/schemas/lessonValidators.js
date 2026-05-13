import { STATIC_MINIMUMS, STATIC_PILLARS, isStaticPillar, isStaticLevel } from './lessonSchema.js';

function clean(value) { return String(value ?? '').trim(); }
function safeArray(value) { return Array.isArray(value) ? value : []; }
function countWords(value) { const text = clean(value); return text ? text.split(/\s+/).filter(Boolean).length : 0; }
function hasValue(value) { return clean(value).length > 0; }
function normalizeIssue(code, message, severity = 'error', path = '') { return { code, message, severity, path }; }

function validateBase(lesson) {
  const issues = [];
  if (!lesson || typeof lesson !== 'object' || Array.isArray(lesson)) return [normalizeIssue('lesson.invalid', 'A aula precisa ser um objeto válido.')];
  if (!hasValue(lesson.id)) issues.push(normalizeIssue('lesson.id.required', 'Aula sem id.', 'error', 'id'));
  if (!isStaticLevel(lesson.level)) issues.push(normalizeIssue('lesson.level.invalid', `Nível inválido: ${lesson.level || 'vazio'}.`, 'error', 'level'));
  if (!isStaticPillar(lesson.pillar)) issues.push(normalizeIssue('lesson.pillar.invalid', `Pilar inválido: ${lesson.pillar || 'vazio'}.`, 'error', 'pillar'));
  if (!hasValue(lesson.title)) issues.push(normalizeIssue('lesson.title.required', 'Aula sem título.', 'error', 'title'));
  if (!Number.isFinite(Number(lesson.order)) || Number(lesson.order) < 1) issues.push(normalizeIssue('lesson.order.invalid', 'Aula precisa ter order numérico maior que zero.', 'error', 'order'));
  if (!safeArray(lesson.objectives).length) issues.push(normalizeIssue('lesson.objectives.missing', 'Aula sem objetivos. Inclua objetivos claros.', 'warn', 'objectives'));
  return issues;
}

function validateItemsWithAnswer(items, path, min = 1) {
  const issues = [];
  const list = safeArray(items);
  if (list.length < min) issues.push(normalizeIssue(`${path}.too_few`, `${path} precisa ter pelo menos ${min} item(ns).`, 'error', path));
  list.forEach((item, index) => {
    if (!hasValue(item?.question || item?.prompt || item?.instruction)) issues.push(normalizeIssue(`${path}.question.missing`, `Item ${index + 1} de ${path} não tem enunciado.`, 'error', `${path}[${index}]`));
    if (!hasValue(item?.answer || item?.expectedAnswer || item?.correctAnswer)) issues.push(normalizeIssue(`${path}.answer.missing`, `Item ${index + 1} de ${path} não tem resposta esperada.`, 'error', `${path}[${index}]`));
  });
  return issues;
}

function validateGrammar(lesson) {
  const min = STATIC_MINIMUMS.grammar;
  const issues = [];
  if (safeArray(lesson.explanationSections).length < min.explanationSections) issues.push(normalizeIssue('grammar.sections.too_few', `Grammar precisa de pelo menos ${min.explanationSections} seções.`, 'error', 'explanationSections'));
  if (safeArray(lesson.professorExamples).length < min.professorExamples) issues.push(normalizeIssue('grammar.examples.too_few', `Grammar precisa de pelo menos ${min.professorExamples} exemplos do professor.`, 'warn', 'professorExamples'));
  if (safeArray(lesson.commonMistakes).length < min.commonMistakes) issues.push(normalizeIssue('grammar.mistakes.too_few', `Grammar precisa de pelo menos ${min.commonMistakes} erros comuns.`, 'warn', 'commonMistakes'));
  issues.push(...validateItemsWithAnswer(lesson.guidedPractice, 'guidedPractice', min.guidedPractice));
  if (safeArray(lesson.productionTasks).length < min.productionTasks) issues.push(normalizeIssue('grammar.production.too_few', `Grammar precisa de pelo menos ${min.productionTasks} tarefas de produção.`, 'error', 'productionTasks'));
  if (safeArray(lesson.finalChecklist).length < min.finalChecklist) issues.push(normalizeIssue('grammar.checklist.too_few', `Grammar precisa de checklist com pelo menos ${min.finalChecklist} itens.`, 'warn', 'finalChecklist'));
  return issues;
}

function validateVocabulary(lesson) {
  const min = STATIC_MINIMUMS.vocabulary;
  const issues = [];
  if (!hasValue(lesson.theme)) issues.push(normalizeIssue('vocabulary.theme.missing', 'Vocabulary precisa de theme.', 'error', 'theme'));
  if (safeArray(lesson.lexicalSets).length < min.lexicalSets) issues.push(normalizeIssue('vocabulary.lexicalSets.too_few', 'Vocabulary precisa de pelo menos um lexical set.', 'error', 'lexicalSets'));
  if (safeArray(lesson.examples).length < min.examples) issues.push(normalizeIssue('vocabulary.examples.too_few', `Vocabulary precisa de pelo menos ${min.examples} exemplos.`, 'warn', 'examples'));
  issues.push(...validateItemsWithAnswer(lesson.recognitionPractice, 'recognitionPractice', min.recognitionPractice));
  if (safeArray(lesson.usagePractice).length < min.usagePractice) issues.push(normalizeIssue('vocabulary.usage.too_few', `Vocabulary precisa de pelo menos ${min.usagePractice} práticas de uso.`, 'warn', 'usagePractice'));
  return issues;
}

function validateReading(lesson) {
  const min = STATIC_MINIMUMS.reading;
  const issues = [];
  const requiredWords = min.mainTextWords[lesson.level] || min.mainTextWords.A1;
  if (countWords(lesson.mainText) < requiredWords) issues.push(normalizeIssue('reading.mainText.too_short', `Reading precisa de texto principal com pelo menos ${requiredWords} palavras para ${lesson.level}.`, 'error', 'mainText'));
  if (safeArray(lesson.vocabulary).length < min.vocabulary) issues.push(normalizeIssue('reading.vocabulary.too_few', `Reading precisa de pelo menos ${min.vocabulary} itens de vocabulário.`, 'warn', 'vocabulary'));
  issues.push(...validateItemsWithAnswer(lesson.comprehensionQuestions, 'comprehensionQuestions', min.comprehensionQuestions));
  if (safeArray(lesson.evidenceTasks).length < min.evidenceTasks) issues.push(normalizeIssue('reading.evidence.too_few', `Reading precisa de pelo menos ${min.evidenceTasks} tarefas de evidência.`, 'error', 'evidenceTasks'));
  safeArray(lesson.comprehensionQuestions).forEach((item, index) => {
    if (!hasValue(item?.evidence) && !hasValue(item?.quote)) issues.push(normalizeIssue('reading.question.evidence.missing', `Questão ${index + 1} de Reading sem evidência textual.`, 'warn', `comprehensionQuestions[${index}]`));
  });
  return issues;
}

function validateListening(lesson) {
  const min = STATIC_MINIMUMS.listening;
  const issues = [];
  const transcript = lesson.transcript || lesson.audioScript;
  const requiredWords = min.transcriptWords[lesson.level] || min.transcriptWords.A1;
  if (countWords(transcript) < requiredWords) issues.push(normalizeIssue('listening.transcript.too_short', `Listening precisa de transcript/audioScript com pelo menos ${requiredWords} palavras para ${lesson.level}.`, 'error', 'transcript'));
  if (safeArray(lesson.firstListenTasks).length < min.firstListenTasks) issues.push(normalizeIssue('listening.firstListen.too_few', `Listening precisa de pelo menos ${min.firstListenTasks} tarefas de primeira escuta.`, 'error', 'firstListenTasks'));
  if (safeArray(lesson.secondListenTasks).length < min.secondListenTasks) issues.push(normalizeIssue('listening.secondListen.too_few', `Listening precisa de pelo menos ${min.secondListenTasks} tarefas de segunda escuta.`, 'error', 'secondListenTasks'));
  if (safeArray(lesson.shadowing).length < min.shadowing) issues.push(normalizeIssue('listening.shadowing.too_few', `Listening precisa de pelo menos ${min.shadowing} frases de shadowing.`, 'warn', 'shadowing'));
  issues.push(...validateItemsWithAnswer(lesson.comprehensionQuestions, 'comprehensionQuestions', min.comprehensionQuestions));
  return issues;
}

function validateSpeaking(lesson) {
  const min = STATIC_MINIMUMS.speaking;
  const issues = [];
  if (safeArray(lesson.modelPhrases).length < min.modelPhrases) issues.push(normalizeIssue('speaking.modelPhrases.too_few', `Speaking precisa de pelo menos ${min.modelPhrases} frases-modelo.`, 'error', 'modelPhrases'));
  if (safeArray(lesson.substitutionDrills).length < min.substitutionDrills) issues.push(normalizeIssue('speaking.substitution.too_few', `Speaking precisa de pelo menos ${min.substitutionDrills} substitution drills.`, 'error', 'substitutionDrills'));
  if (safeArray(lesson.guidedSpeaking).length < min.guidedSpeaking) issues.push(normalizeIssue('speaking.guided.too_few', `Speaking precisa de pelo menos ${min.guidedSpeaking} tarefas guiadas.`, 'warn', 'guidedSpeaking'));
  if (safeArray(lesson.recordingTasks).length < min.recordingTasks) issues.push(normalizeIssue('speaking.recording.too_few', `Speaking precisa de pelo menos ${min.recordingTasks} tarefas de gravação.`, 'error', 'recordingTasks'));
  if (safeArray(lesson.freeSpeaking).length < min.freeSpeaking) issues.push(normalizeIssue('speaking.free.too_few', 'Speaking precisa de produção livre final.', 'error', 'freeSpeaking'));
  return issues;
}

function validateWriting(lesson) {
  const min = STATIC_MINIMUMS.writing;
  const issues = [];
  const requiredWords = min.modelTextWords[lesson.level] || min.modelTextWords.A1;
  if (countWords(lesson.modelText) < requiredWords) issues.push(normalizeIssue('writing.modelText.too_short', `Writing precisa de modelText com pelo menos ${requiredWords} palavras para ${lesson.level}.`, 'error', 'modelText'));
  if (safeArray(lesson.writingBlocks).length < min.writingBlocks) issues.push(normalizeIssue('writing.blocks.too_few', `Writing precisa de pelo menos ${min.writingBlocks} blocos úteis.`, 'error', 'writingBlocks'));
  if (safeArray(lesson.guidedSubstitution).length < min.guidedSubstitution) issues.push(normalizeIssue('writing.substitution.too_few', `Writing precisa de pelo menos ${min.guidedSubstitution} substituições guiadas.`, 'warn', 'guidedSubstitution'));
  if (safeArray(lesson.checklist).length < min.checklist) issues.push(normalizeIssue('writing.checklist.too_few', `Writing precisa de checklist com pelo menos ${min.checklist} itens.`, 'error', 'checklist'));
  if (!lesson.draftTask) issues.push(normalizeIssue('writing.draft.missing', 'Writing precisa de draftTask.', 'error', 'draftTask'));
  if (!lesson.revisionTask) issues.push(normalizeIssue('writing.revision.missing', 'Writing precisa de revisionTask.', 'warn', 'revisionTask'));
  return issues;
}

function validateCheckpoint(lesson) {
  const min = STATIC_MINIMUMS.checkpoint;
  const issues = [];
  if (safeArray(lesson.targetPillars).length < min.targetPillars) issues.push(normalizeIssue('checkpoint.targets.too_few', 'Checkpoint precisa de pelo menos um pilar alvo.', 'error', 'targetPillars'));
  if (safeArray(lesson.tasks).length < min.tasks) issues.push(normalizeIssue('checkpoint.tasks.too_few', `Checkpoint precisa de pelo menos ${min.tasks} tarefas.`, 'error', 'tasks'));
  if (!lesson.passingCriteria || typeof lesson.passingCriteria !== 'object') issues.push(normalizeIssue('checkpoint.criteria.missing', 'Checkpoint precisa de passingCriteria.', 'error', 'passingCriteria'));
  return issues;
}

export function validateStaticLesson(lesson) {
  const issues = validateBase(lesson);
  const pillar = String(lesson?.pillar || '').toLowerCase();
  if (pillar === 'grammar') issues.push(...validateGrammar(lesson));
  if (pillar === 'vocabulary') issues.push(...validateVocabulary(lesson));
  if (pillar === 'reading') issues.push(...validateReading(lesson));
  if (pillar === 'listening') issues.push(...validateListening(lesson));
  if (pillar === 'speaking') issues.push(...validateSpeaking(lesson));
  if (pillar === 'writing') issues.push(...validateWriting(lesson));
  if (pillar === 'checkpoint') issues.push(...validateCheckpoint(lesson));
  return {
    lessonId: lesson?.id || '',
    title: lesson?.title || '',
    pillar,
    level: lesson?.level || '',
    approved: !issues.some((issue) => issue.severity === 'error'),
    issues,
    errors: issues.filter((issue) => issue.severity === 'error'),
    warnings: issues.filter((issue) => issue.severity !== 'error'),
  };
}

export function validateStaticLessonList(lessons = []) {
  const list = safeArray(lessons);
  const seen = new Set();
  const reports = list.map((lesson) => validateStaticLesson(lesson));
  const globalIssues = [];
  list.forEach((lesson, index) => {
    const id = clean(lesson?.id);
    if (!id) return;
    if (seen.has(id)) globalIssues.push(normalizeIssue('lesson.id.duplicate', `ID duplicado: ${id}.`, 'error', `[${index}].id`));
    seen.add(id);
  });
  return {
    total: list.length,
    approved: reports.every((report) => report.approved) && !globalIssues.some((issue) => issue.severity === 'error'),
    reports,
    globalIssues,
    approvedCount: reports.filter((report) => report.approved).length,
    rejectedCount: reports.filter((report) => !report.approved).length,
  };
}

export function summarizeStaticLessonReport(report) {
  if (!report) return 'Relatório indisponível.';
  if (report.approved) return `${report.lessonId || 'Aula'} aprovada com ${report.warnings?.length || 0} aviso(s).`;
  return `${report.lessonId || 'Aula'} reprovada: ${safeArray(report.errors).map((issue) => issue.message).join(' ')}`;
}

export function getSupportedStaticPillars() {
  return STATIC_PILLARS.slice();
}
