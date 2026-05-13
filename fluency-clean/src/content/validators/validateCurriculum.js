import { STATIC_CURRICULUM, CURRICULUM_LEVELS, CURRICULUM_PILLARS, getStaticLessons } from '../curriculum/index.js';
import { getStaticReadyLessons } from '../curriculum/staticLessonContent.js';
import { validateStaticLesson } from '../schemas/index.js';
import { validatePedagogicalContentQuality } from './validatePedagogicalContentQuality.js';

function clean(value) { return String(value ?? '').trim(); }
function safeArray(value) { return Array.isArray(value) ? value : []; }
function words(value) { const text = clean(value); return text ? text.split(/\s+/).filter(Boolean).length : 0; }
function issue(code, message, severity = 'error', path = '') { return { code, message, severity, path }; }
function hasError(issues) { return safeArray(issues).some((item) => item.severity === 'error'); }
function isReady(lesson) { return clean(lesson?.status) === 'ready' || clean(lesson?.schemaVersion).startsWith('static-lesson-schema'); }
function isDeepLesson(lesson) { return clean(lesson?.schemaVersion).startsWith('static-lesson-schema-v2'); }
function summarizeIssues(issues) {
  const list = safeArray(issues);
  return { total: list.length, errors: list.filter((item) => item.severity === 'error').length, warnings: list.filter((item) => item.severity !== 'error').length };
}
function prefixIssues(issues, prefix) {
  return safeArray(issues).map((item) => ({ ...item, code: `${prefix}.${item.code || 'issue'}` }));
}

const STRICT_MINIMUMS = Object.freeze({
  grammar: { sections: 6, examples: 12, mistakes: 3, guided: 10, totalPractice: 14, production: 3, checklist: 4 },
  vocabulary: { lexicalItems: 12, examples: 6, recognition: 6, usage: 3 },
  reading: { textWords: { A1: 80, A2: 120, B1: 180, B2: 260, C1: 360, C2: 480 }, questions: 6, evidenceTasks: 3, vocab: 6 },
  listening: { transcriptWords: { A1: 50, A2: 100, B1: 160, B2: 240, C1: 340, C2: 460 }, first: 2, second: 2, shadowing: 4, questions: 4 },
  speaking: { models: 4, drills: 4, guided: 3, recording: 1, free: 1 },
  writing: { modelWords: { A1: 25, A2: 50, B1: 90, B2: 140, C1: 220, C2: 300 }, blocks: 5, substitutions: 4, checklist: 4 },
  checkpoint: { tasks: 6, targetPillars: 1, remediation: 1 },
});

function validateGlobalIds(allLessons) {
  const issues = [];
  const seen = new Map();
  allLessons.forEach((lesson, index) => {
    const id = clean(lesson?.id);
    if (!id) return;
    if (seen.has(id)) issues.push(issue('curriculum.id.duplicate', `ID duplicado no currículo: ${id}.`, 'error', `lessons[${index}].id`));
    seen.set(id, lesson);
  });
  return { issues, idSet: new Set(seen.keys()) };
}

function validatePrerequisites(allLessons, idSet) {
  const issues = [];
  allLessons.forEach((lesson) => {
    safeArray(lesson?.prerequisites).forEach((prerequisite) => {
      if (!idSet.has(clean(prerequisite))) issues.push(issue('curriculum.prerequisite.missing', `${lesson.id} exige pré-requisito inexistente: ${prerequisite}.`, 'error', `${lesson.id}.prerequisites`));
    });
  });
  return issues;
}

function validateLevelMap(levelKey, levelData) {
  const issues = [];
  if (!levelData) return { level: levelKey, issues: [issue('level.missing', `Nível ${levelKey} não existe no currículo.`)] };
  if (!clean(levelData.title)) issues.push(issue('level.title.missing', `${levelKey} sem título.`, 'error', `${levelKey}.title`));
  if (!levelData.exitCriteria) issues.push(issue('level.exitCriteria.missing', `${levelKey} sem critérios de saída.`, 'error', `${levelKey}.exitCriteria`));
  CURRICULUM_PILLARS.forEach((pillar) => {
    const lessons = safeArray(levelData.pillars?.[pillar]);
    if (!lessons.length) issues.push(issue('level.pillar.empty', `${levelKey}/${pillar} sem mapa de aulas.`, levelKey === 'A1' ? 'error' : 'warn', `${levelKey}.${pillar}`));
    lessons.forEach((lesson, index) => {
      if (Number(lesson.order) !== index + 1) issues.push(issue('level.order.gap', `${lesson.id} deveria ter order ${index + 1}.`, 'error', `${lesson.id}.order`));
      const expectedId = `${levelKey}-${pillar.toUpperCase()}-${String(index + 1).padStart(3, '0')}`;
      if (lesson.id !== expectedId) issues.push(issue('level.id.sequence', `${lesson.id} não segue sequência esperada ${expectedId}.`, 'warn', `${lesson.id}.id`));
    });
  });
  return { level: levelKey, issues };
}

function validateDeepGrammar(lesson) {
  const min = STRICT_MINIMUMS.grammar;
  const totalPractice = safeArray(lesson.guidedPractice).length + safeArray(lesson.transformationPractice).length + safeArray(lesson.errorCorrectionPractice).length + safeArray(lesson.translationPractice).length;
  return [
    safeArray(lesson.explanationSections).length < min.sections && !isDeepLesson(lesson) ? issue('deep.grammar.sections', `${lesson.id}: Grammar precisa de pelo menos ${min.sections} seções.`, 'error') : null,
    safeArray(lesson.professorExamples).length < min.examples && safeArray(lesson.teacherExamples).length < min.examples ? issue('deep.grammar.examples', `${lesson.id}: Grammar precisa de pelo menos ${min.examples} exemplos.`, 'warn') : null,
    safeArray(lesson.commonMistakes).length < min.mistakes && safeArray(lesson.commonBrazilianMistakes).length < min.mistakes ? issue('deep.grammar.mistakes', `${lesson.id}: Grammar precisa de pelo menos ${min.mistakes} erros comuns.`, 'warn') : null,
    totalPractice < min.totalPractice ? issue('deep.grammar.practice', `${lesson.id}: Grammar precisa de prática interna mais robusta. Atual: ${totalPractice}.`, 'warn') : null,
    safeArray(lesson.productionTasks).length < min.production ? issue('deep.grammar.production', `${lesson.id}: Grammar precisa de produção própria guiada.`, 'error') : null,
  ].filter(Boolean);
}

function validateDeepVocabulary(lesson) {
  const min = STRICT_MINIMUMS.vocabulary;
  const lexicalItems = safeArray(lesson.lexicalSets).flatMap((set) => safeArray(set.items)).length + safeArray(lesson.essentialWords).length;
  return [
    lexicalItems < min.lexicalItems ? issue('deep.vocabulary.items', `${lesson.id}: Vocabulary precisa de mais itens lexicais. Atual: ${lexicalItems}.`, 'warn') : null,
    safeArray(lesson.examples).length < min.examples ? issue('deep.vocabulary.examples', `${lesson.id}: Vocabulary precisa de exemplos naturais.`, 'warn') : null,
    safeArray(lesson.recognitionPractice).length < min.recognition ? issue('deep.vocabulary.recognition', `${lesson.id}: Vocabulary precisa de mais reconhecimento.`, 'warn') : null,
  ].filter(Boolean);
}

function validateDeepReading(lesson) {
  const min = STRICT_MINIMUMS.reading;
  const required = min.textWords[lesson.level] || min.textWords.A1;
  const issues = [];
  if (words(lesson.mainText) < required) issues.push(issue('deep.reading.text', `${lesson.id}: Reading texto curto para ${lesson.level}. Atual: ${words(lesson.mainText)}, meta ${required}.`, 'warn'));
  if (safeArray(lesson.comprehensionQuestions).length < min.questions && safeArray(lesson.evidenceQuestions).length < min.questions) issues.push(issue('deep.reading.questions', `${lesson.id}: Reading precisa de mais perguntas.`, 'warn'));
  if (safeArray(lesson.evidenceTasks).length < min.evidenceTasks && safeArray(lesson.evidenceQuestions).length < min.evidenceTasks) issues.push(issue('deep.reading.evidence', `${lesson.id}: Reading precisa de evidência textual.`, 'error'));
  if (safeArray(lesson.vocabulary).length < min.vocab && safeArray(lesson.preReadingVocabulary).length < min.vocab) issues.push(issue('deep.reading.vocab', `${lesson.id}: Reading precisa de vocabulário de apoio.`, 'warn'));
  return issues;
}

function validateDeepListening(lesson) {
  const min = STRICT_MINIMUMS.listening;
  const transcript = lesson.transcript || lesson.audioScript;
  const required = min.transcriptWords[lesson.level] || min.transcriptWords.A1;
  const issues = [];
  if (words(transcript) < required) issues.push(issue('deep.listening.transcript', `${lesson.id}: Listening transcript curto para ${lesson.level}. Atual: ${words(transcript)}, meta ${required}.`, 'warn'));
  if (safeArray(lesson.firstListenTasks).length < min.first) issues.push(issue('deep.listening.first', `${lesson.id}: Listening precisa de primeira escuta.`, 'error'));
  if (safeArray(lesson.secondListenTasks).length < min.second) issues.push(issue('deep.listening.second', `${lesson.id}: Listening precisa de segunda escuta.`, 'error'));
  if (safeArray(lesson.shadowing).length < min.shadowing) issues.push(issue('deep.listening.shadowing', `${lesson.id}: Listening precisa de shadowing.`, 'warn'));
  if (safeArray(lesson.comprehensionQuestions).length < min.questions && safeArray(lesson.listeningComprehension).length < min.questions) issues.push(issue('deep.listening.questions', `${lesson.id}: Listening precisa de perguntas alinhadas.`, 'warn'));
  return issues;
}

function validateDeepSpeaking(lesson) {
  const min = STRICT_MINIMUMS.speaking;
  return [
    safeArray(lesson.modelPhrases).length < min.models ? issue('deep.speaking.models', `${lesson.id}: Speaking precisa de frases-modelo.`, 'error') : null,
    safeArray(lesson.substitutionDrills).length < min.drills ? issue('deep.speaking.drills', `${lesson.id}: Speaking precisa de substitution drills.`, 'error') : null,
    safeArray(lesson.guidedSpeaking).length < min.guided && safeArray(lesson.questionAnswerDrills).length < min.guided ? issue('deep.speaking.guided', `${lesson.id}: Speaking precisa de fala guiada.`, 'warn') : null,
    safeArray(lesson.recordingTasks).length < min.recording ? issue('deep.speaking.recording', `${lesson.id}: Speaking precisa de gravação guiada.`, 'error') : null,
    safeArray(lesson.freeSpeaking).length < min.free ? issue('deep.speaking.free', `${lesson.id}: Speaking precisa de fala livre final.`, 'error') : null,
  ].filter(Boolean);
}

function validateDeepWriting(lesson) {
  const min = STRICT_MINIMUMS.writing;
  const required = min.modelWords[lesson.level] || min.modelWords.A1;
  return [
    words(lesson.modelText) < required ? issue('deep.writing.model', `${lesson.id}: Writing modelText curto para ${lesson.level}. Atual: ${words(lesson.modelText)}, meta ${required}.`, 'warn') : null,
    safeArray(lesson.writingBlocks).length < min.blocks ? issue('deep.writing.blocks', `${lesson.id}: Writing precisa de blocos úteis.`, 'error') : null,
    safeArray(lesson.guidedSubstitution).length < min.substitutions ? issue('deep.writing.substitution', `${lesson.id}: Writing precisa de substituição guiada.`, 'warn') : null,
    safeArray(lesson.checklist).length < min.checklist && safeArray(lesson.revisionChecklist).length < min.checklist ? issue('deep.writing.checklist', `${lesson.id}: Writing precisa de checklist.`, 'error') : null,
    !lesson.draftTask ? issue('deep.writing.draft', `${lesson.id}: Writing precisa de rascunho.`, 'error') : null,
    !lesson.revisionTask && !lesson.finalVersionTask ? issue('deep.writing.revision', `${lesson.id}: Writing precisa de revisão.`, 'warn') : null,
  ].filter(Boolean);
}

function validateDeepCheckpoint(lesson) {
  const min = STRICT_MINIMUMS.checkpoint;
  const issues = [];
  if (safeArray(lesson.tasks).length < min.tasks) issues.push(issue('deep.checkpoint.tasks', `${lesson.id}: checkpoint precisa de pelo menos ${min.tasks} tarefas.`, 'error'));
  if (safeArray(lesson.targetPillars).length < min.targetPillars) issues.push(issue('deep.checkpoint.targets', `${lesson.id}: checkpoint precisa de pilar alvo.`, 'error'));
  if (!lesson.passingCriteria?.blocksNextLevel) issues.push(issue('deep.checkpoint.blocks', `${lesson.id}: checkpoint deve bloquear próximo nível se reprovar.`, 'warn'));
  if (safeArray(lesson.remediation).length < min.remediation) issues.push(issue('deep.checkpoint.remediation', `${lesson.id}: checkpoint precisa de remediação.`, 'warn'));
  return issues;
}

function validateDeepLesson(lesson) {
  if (!isReady(lesson)) return [];
  const pillar = clean(lesson.pillar).toLowerCase();
  if (pillar === 'grammar') return validateDeepGrammar(lesson);
  if (pillar === 'vocabulary') return validateDeepVocabulary(lesson);
  if (pillar === 'reading') return validateDeepReading(lesson);
  if (pillar === 'listening') return validateDeepListening(lesson);
  if (pillar === 'speaking') return validateDeepSpeaking(lesson);
  if (pillar === 'writing') return validateDeepWriting(lesson);
  if (pillar === 'checkpoint') return validateDeepCheckpoint(lesson);
  return [];
}

function validateReadyLessons(level) {
  const lessons = getStaticReadyLessons(level);
  const reports = lessons.map((lesson) => {
    const schema = validateStaticLesson(lesson);
    const deepIssues = validateDeepLesson(lesson);
    const content = validatePedagogicalContentQuality(lesson);
    const contentIssues = prefixIssues(content.issues, 'content');
    const issues = [...schema.issues, ...deepIssues, ...contentIssues];
    return {
      lessonId: lesson.id,
      level: lesson.level,
      pillar: lesson.pillar,
      title: lesson.title,
      status: lesson.status,
      approved: !hasError(issues),
      schemaApproved: schema.approved,
      structureApproved: !hasError([...schema.issues, ...deepIssues]),
      contentApproved: content.contentApproved,
      deepApproved: !hasError(issues),
      issues,
      errors: issues.filter((item) => item.severity === 'error'),
      warnings: issues.filter((item) => item.severity !== 'error'),
      contentReport: content,
    };
  });
  return {
    level,
    total: lessons.length,
    approved: reports.every((report) => report.approved),
    structureApproved: reports.every((report) => report.structureApproved),
    contentApproved: reports.every((report) => report.contentApproved),
    approvedCount: reports.filter((report) => report.approved).length,
    contentApprovedCount: reports.filter((report) => report.contentApproved).length,
    rejectedCount: reports.filter((report) => !report.approved).length,
    reports,
  };
}

export function validateStaticCurriculum(options = {}) {
  const levels = options.levels || CURRICULUM_LEVELS;
  const plannedLessons = levels.flatMap((level) => getStaticLessons(level));
  const readyLessons = levels.flatMap((level) => getStaticReadyLessons(level));
  const allLessons = [...plannedLessons, ...readyLessons];
  const { issues: idIssues, idSet } = validateGlobalIds(allLessons);
  const prerequisiteIssues = validatePrerequisites(allLessons, idSet);
  const levelReports = Object.fromEntries(levels.map((level) => {
    const mapReport = validateLevelMap(level, STATIC_CURRICULUM.levels[level]);
    const readyReport = validateReadyLessons(level);
    const issues = [...mapReport.issues, ...readyReport.reports.flatMap((report) => report.issues)];
    return [level, {
      level,
      plannedLessons: getStaticLessons(level).length,
      readyLessons: getStaticReadyLessons(level).length,
      mapApproved: !hasError(mapReport.issues),
      readyApproved: readyReport.approved,
      structureApproved: readyReport.structureApproved,
      contentApproved: readyReport.contentApproved,
      approved: !hasError(issues),
      issues,
      summary: summarizeIssues(issues),
      readyReport,
    }];
  }));
  const globalIssues = [...idIssues, ...prerequisiteIssues];
  const approved = !hasError(globalIssues) && Object.values(levelReports).every((report) => report.approved || report.readyLessons === 0);
  return {
    version: STATIC_CURRICULUM.version,
    approved,
    generatedAt: new Date().toISOString(),
    totals: {
      plannedLessons: plannedLessons.length,
      readyLessons: readyLessons.length,
      levels: levels.length,
    },
    globalIssues,
    globalSummary: summarizeIssues(globalIssues),
    levels: levelReports,
  };
}

export function getStaticCurriculumValidationStatus(level = 'A1') {
  const report = validateStaticCurriculum({ levels: [level] });
  const levelReport = report.levels[level];
  if (!levelReport) return { level, approved: false, label: `${level}: relatório indisponível` };
  const label = levelReport.approved
    ? `${level}: aprovado (${levelReport.readyLessons || levelReport.plannedLessons} aulas)`
    : `${level}: pendente (${levelReport.summary.errors} erro(s), ${levelReport.summary.warnings} aviso(s))`;
  return { level, approved: levelReport.approved, contentApproved: levelReport.contentApproved, label, report: levelReport };
}

export function summarizeStaticCurriculumValidation(report = validateStaticCurriculum()) {
  const lines = [`Currículo ${report.approved ? 'aprovado' : 'pendente'} · ${report.totals.plannedLessons} planejadas · ${report.totals.readyLessons} prontas.`];
  Object.values(report.levels || {}).forEach((level) => {
    lines.push(`${level.level}: ${level.approved ? 'aprovado' : 'pendente'} · estrutura ${level.structureApproved ? 'ok' : 'pendente'} · conteúdo ${level.contentApproved ? 'ok' : 'pendente'} · planejadas ${level.plannedLessons} · prontas ${level.readyLessons} · erros ${level.summary.errors} · avisos ${level.summary.warnings}`);
  });
  if (report.globalIssues?.length) lines.push(`Globais: ${report.globalSummary.errors} erro(s), ${report.globalSummary.warnings} aviso(s).`);
  return lines.join('\n');
}

export function getStaticCurriculumCriticalIssues(report = validateStaticCurriculum(), max = 20) {
  const global = safeArray(report.globalIssues).map((item) => ({ level: 'global', ...item }));
  const levelIssues = Object.values(report.levels || {}).flatMap((level) => safeArray(level.issues).map((item) => ({ level: level.level, ...item })));
  return [...global, ...levelIssues].filter((item) => item.severity === 'error').slice(0, max);
}
