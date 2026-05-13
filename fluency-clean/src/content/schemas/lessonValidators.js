import { STATIC_DEEP_MINIMUMS, STATIC_MINIMUMS, STATIC_PILLARS, isDeepStaticLessonSchema, isStaticPillar, isStaticLevel } from './lessonSchema.js';

function clean(value) { return String(value ?? '').trim(); }
function safeArray(value) { return Array.isArray(value) ? value : []; }
function countWords(value) { const text = clean(value); return text ? text.split(/\s+/).filter(Boolean).length : 0; }
function hasValue(value) { return clean(value).length > 0; }
function normalizeIssue(code, message, severity = 'error', path = '') { return { code, message, severity, path }; }
function hasObject(value) { return value && typeof value === 'object' && !Array.isArray(value); }
function hasMinWords(value, min) { return countWords(value) >= min; }
function hasAnyText(value) { return hasValue(value) || (hasObject(value) && Object.values(value).some(hasAnyText)) || safeArray(value).some(hasAnyText); }
function uniqueTextCount(items = []) { return new Set(safeArray(items).map((item) => clean(item?.english || item?.text || item?.question || item?.instruction || item?.wrong || item?.right || item)).filter(Boolean).map((text) => text.toLowerCase())).size; }
function correctAnswerFirstCount(items = []) {
  return safeArray(items).filter((item) => {
    const options = safeArray(item?.options).map(clean).filter(Boolean);
    const answer = clean(item?.answer || item?.expectedAnswer || item?.correctAnswer);
    return options.length > 1 && answer && options[0].toLowerCase() === answer.toLowerCase();
  }).length;
}

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
  const firstCount = correctAnswerFirstCount(list);
  if (list.length >= 6 && firstCount >= Math.ceil(list.length * 0.7)) issues.push(normalizeIssue(`${path}.answers.first_bias`, `${path} tem muitas respostas corretas na primeira alternativa.`, 'warn', path));
  return issues;
}

function validateDeepGlobal(lesson) {
  const issues = [];
  if (!hasAnyText(lesson.teacherOpening)) issues.push(normalizeIssue('deep.teacherOpening.missing', 'Aula profunda precisa de teacherOpening.', 'error', 'teacherOpening'));
  if (!hasAnyText(lesson.whyItMatters)) issues.push(normalizeIssue('deep.whyItMatters.missing', 'Aula profunda precisa explicar por que isso importa.', 'error', 'whyItMatters'));
  if (!safeArray(lesson.realLifeUseCases).length) issues.push(normalizeIssue('deep.useCases.missing', 'Aula profunda precisa de usos reais.', 'error', 'realLifeUseCases'));
  if (!hasAnyText(lesson.conceptExplanation)) issues.push(normalizeIssue('deep.conceptExplanation.missing', 'Aula profunda precisa de explicação conceitual.', 'error', 'conceptExplanation'));
  if (!hasAnyText(lesson.mentalModel)) issues.push(normalizeIssue('deep.mentalModel.missing', 'Aula profunda precisa de mapa mental.', 'error', 'mentalModel'));
  if (safeArray(lesson.stepByStep).length < 4) issues.push(normalizeIssue('deep.stepByStep.too_few', 'Aula profunda precisa de passo a passo real.', 'error', 'stepByStep'));
  if (safeArray(lesson.portugueseContrast).length < 1) issues.push(normalizeIssue('deep.portugueseContrast.missing', 'Aula profunda precisa comparar com português quando aplicável.', 'error', 'portugueseContrast'));
  if (safeArray(lesson.guidedBeforeQuiz).length < 2) issues.push(normalizeIssue('deep.guidedBeforeQuiz.too_few', 'Aula profunda precisa guiar antes do quiz.', 'warn', 'guidedBeforeQuiz'));
  if (safeArray(lesson.lessonRecap).length < 3) issues.push(normalizeIssue('deep.recap.too_few', 'Aula profunda precisa de revisão final.', 'error', 'lessonRecap'));
  return issues;
}

function validateGrammar(lesson) {
  const min = STATIC_MINIMUMS.grammar;
  const issues = [];
  if (safeArray(lesson.explanationSections).length < min.explanationSections && !isDeepStaticLessonSchema(lesson.schemaVersion)) issues.push(normalizeIssue('grammar.sections.too_few', `Grammar precisa de pelo menos ${min.explanationSections} seções.`, 'error', 'explanationSections'));
  if (safeArray(lesson.professorExamples).length < min.professorExamples && safeArray(lesson.teacherExamples).length < min.professorExamples) issues.push(normalizeIssue('grammar.examples.too_few', `Grammar precisa de pelo menos ${min.professorExamples} exemplos do professor.`, 'warn', 'professorExamples'));
  if (safeArray(lesson.commonMistakes).length < min.commonMistakes && safeArray(lesson.commonBrazilianMistakes).length < min.commonMistakes) issues.push(normalizeIssue('grammar.mistakes.too_few', `Grammar precisa de pelo menos ${min.commonMistakes} erros comuns.`, 'warn', 'commonMistakes'));
  issues.push(...validateItemsWithAnswer(lesson.guidedPractice, 'guidedPractice', min.guidedPractice));
  if (safeArray(lesson.productionTasks).length < min.productionTasks) issues.push(normalizeIssue('grammar.production.too_few', `Grammar precisa de pelo menos ${min.productionTasks} tarefas de produção.`, 'error', 'productionTasks'));
  if (safeArray(lesson.finalChecklist).length < min.finalChecklist && safeArray(lesson.selfAssessment).length < min.finalChecklist) issues.push(normalizeIssue('grammar.checklist.too_few', `Grammar precisa de checklist com pelo menos ${min.finalChecklist} itens.`, 'warn', 'finalChecklist'));
  return issues;
}

function validateDeepGrammar(lesson) {
  const min = STATIC_DEEP_MINIMUMS.grammar;
  const issues = validateDeepGlobal(lesson);
  if (!hasAnyText(lesson.grammarGoal)) issues.push(normalizeIssue('deep.grammar.goal.missing', 'Grammar profunda precisa de grammarGoal.', 'error', 'grammarGoal'));
  if (safeArray(lesson.formationGuide).length < 3) issues.push(normalizeIssue('deep.grammar.formation.too_few', 'Grammar profunda precisa de guia de formação.', 'error', 'formationGuide'));
  if (safeArray(lesson.whenToUse).length < 3) issues.push(normalizeIssue('deep.grammar.when.too_few', 'Grammar profunda precisa mostrar quando usar.', 'error', 'whenToUse'));
  if (safeArray(lesson.teacherExamples).length < min.teacherExamples) issues.push(normalizeIssue('deep.grammar.examples.too_few', `Grammar profunda precisa de pelo menos ${min.teacherExamples} exemplos comentados.`, 'error', 'teacherExamples'));
  if (uniqueTextCount(lesson.teacherExamples) < Math.min(8, safeArray(lesson.teacherExamples).length)) issues.push(normalizeIssue('deep.grammar.examples.duplicated', 'Exemplos de Grammar parecem duplicados demais.', 'error', 'teacherExamples'));
  if (safeArray(lesson.commonBrazilianMistakes).length < min.commonBrazilianMistakes) issues.push(normalizeIssue('deep.grammar.brazilianMistakes.too_few', `Grammar profunda precisa de pelo menos ${min.commonBrazilianMistakes} erros brasileiros.`, 'error', 'commonBrazilianMistakes'));
  if (safeArray(lesson.controlledPractice).length < min.controlledPractice) issues.push(normalizeIssue('deep.grammar.controlled.too_few', 'Grammar profunda precisa de prática controlada antes do quiz.', 'error', 'controlledPractice'));
  issues.push(...validateItemsWithAnswer(lesson.guidedPractice, 'guidedPractice', min.guidedPractice));
  issues.push(...validateItemsWithAnswer(lesson.errorCorrectionPractice, 'errorCorrectionPractice', min.errorCorrectionPractice));
  issues.push(...validateItemsWithAnswer(lesson.transformationPractice, 'transformationPractice', min.transformationPractice));
  if (safeArray(lesson.translationPractice).length < min.translationPractice) issues.push(normalizeIssue('deep.grammar.translation.too_few', 'Grammar profunda precisa de tradução controlada.', 'warn', 'translationPractice'));
  if (safeArray(lesson.productionTasks).length < min.productionTasks) issues.push(normalizeIssue('deep.grammar.production.too_few', 'Grammar profunda precisa de produção própria.', 'error', 'productionTasks'));
  return issues;
}

function validateVocabulary(lesson) {
  const min = STATIC_MINIMUMS.vocabulary;
  const issues = [];
  if (!hasValue(lesson.theme)) issues.push(normalizeIssue('vocabulary.theme.missing', 'Vocabulary precisa de theme.', 'error', 'theme'));
  if (safeArray(lesson.lexicalSets).length < min.lexicalSets && !safeArray(lesson.essentialWords).length) issues.push(normalizeIssue('vocabulary.lexicalSets.too_few', 'Vocabulary precisa de pelo menos um lexical set.', 'error', 'lexicalSets'));
  if (safeArray(lesson.examples).length < min.examples) issues.push(normalizeIssue('vocabulary.examples.too_few', `Vocabulary precisa de pelo menos ${min.examples} exemplos.`, 'warn', 'examples'));
  issues.push(...validateItemsWithAnswer(lesson.recognitionPractice, 'recognitionPractice', min.recognitionPractice));
  if (safeArray(lesson.usagePractice).length < min.usagePractice) issues.push(normalizeIssue('vocabulary.usage.too_few', `Vocabulary precisa de pelo menos ${min.usagePractice} práticas de uso.`, 'warn', 'usagePractice'));
  return issues;
}

function validateDeepVocabulary(lesson) {
  const min = STATIC_DEEP_MINIMUMS.vocabulary;
  const issues = validateDeepGlobal(lesson);
  if (!hasAnyText(lesson.topicContext)) issues.push(normalizeIssue('deep.vocabulary.context.missing', 'Vocabulary profunda precisa de contexto real.', 'error', 'topicContext'));
  if (safeArray(lesson.essentialWords).length < min.essentialWords) issues.push(normalizeIssue('deep.vocabulary.words.too_few', `Vocabulary profunda precisa de pelo menos ${min.essentialWords} palavras essenciais.`, 'error', 'essentialWords'));
  if (safeArray(lesson.chunks).length < min.chunks) issues.push(normalizeIssue('deep.vocabulary.chunks.too_few', `Vocabulary profunda precisa de pelo menos ${min.chunks} chunks.`, 'error', 'chunks'));
  if (safeArray(lesson.miniDialogues).length < min.miniDialogues) issues.push(normalizeIssue('deep.vocabulary.dialogues.too_few', 'Vocabulary profunda precisa de mini diálogos.', 'error', 'miniDialogues'));
  if (safeArray(lesson.examples).length < min.examples) issues.push(normalizeIssue('deep.vocabulary.examples.too_few', 'Vocabulary profunda precisa de exemplos em frases.', 'error', 'examples'));
  issues.push(...validateItemsWithAnswer(lesson.recognitionPractice, 'recognitionPractice', min.recognitionPractice));
  if (safeArray(lesson.usagePractice).length < min.usagePractice) issues.push(normalizeIssue('deep.vocabulary.usage.too_few', 'Vocabulary profunda precisa de prática de uso.', 'error', 'usagePractice'));
  return issues;
}

function validateReading(lesson) {
  const min = STATIC_MINIMUMS.reading;
  const issues = [];
  const requiredWords = min.mainTextWords[lesson.level] || min.mainTextWords.A1;
  if (countWords(lesson.mainText) < requiredWords) issues.push(normalizeIssue('reading.mainText.too_short', `Reading precisa de texto principal com pelo menos ${requiredWords} palavras para ${lesson.level}.`, 'error', 'mainText'));
  if (safeArray(lesson.vocabulary).length < min.vocabulary && safeArray(lesson.preReadingVocabulary).length < min.vocabulary) issues.push(normalizeIssue('reading.vocabulary.too_few', `Reading precisa de pelo menos ${min.vocabulary} itens de vocabulário.`, 'warn', 'vocabulary'));
  issues.push(...validateItemsWithAnswer(lesson.comprehensionQuestions, 'comprehensionQuestions', min.comprehensionQuestions));
  if (safeArray(lesson.evidenceTasks).length < min.evidenceTasks && safeArray(lesson.evidenceQuestions).length < min.evidenceTasks) issues.push(normalizeIssue('reading.evidence.too_few', `Reading precisa de pelo menos ${min.evidenceTasks} tarefas de evidência.`, 'error', 'evidenceTasks'));
  safeArray(lesson.comprehensionQuestions).forEach((item, index) => {
    if (!hasValue(item?.evidence) && !hasValue(item?.quote)) issues.push(normalizeIssue('reading.question.evidence.missing', `Questão ${index + 1} de Reading sem evidência textual.`, 'warn', `comprehensionQuestions[${index}]`));
  });
  return issues;
}

function validateDeepReading(lesson) {
  const min = STATIC_DEEP_MINIMUMS.reading;
  const issues = validateDeepGlobal(lesson);
  const requiredWords = min.mainTextWords[lesson.level] || min.mainTextWords.A1;
  if (!hasAnyText(lesson.readingPurpose)) issues.push(normalizeIssue('deep.reading.purpose.missing', 'Reading profunda precisa de objetivo de leitura.', 'error', 'readingPurpose'));
  if (safeArray(lesson.preReadingVocabulary).length < min.preReadingVocabulary) issues.push(normalizeIssue('deep.reading.vocabulary.too_few', 'Reading profunda precisa de vocabulário antes do texto.', 'error', 'preReadingVocabulary'));
  if (countWords(lesson.mainText) < requiredWords) issues.push(normalizeIssue('deep.reading.text.too_short', `Reading profunda precisa de texto com pelo menos ${requiredWords} palavras.`, 'error', 'mainText'));
  if (!lesson.firstReadTask) issues.push(normalizeIssue('deep.reading.firstRead.missing', 'Reading profunda precisa de primeira leitura por ideia geral.', 'error', 'firstReadTask'));
  if (safeArray(lesson.secondReadTasks).length < min.secondReadTasks) issues.push(normalizeIssue('deep.reading.secondRead.too_few', 'Reading profunda precisa de segunda leitura com foco.', 'error', 'secondReadTasks'));
  issues.push(...validateItemsWithAnswer(lesson.evidenceQuestions, 'evidenceQuestions', min.evidenceQuestions));
  if (safeArray(lesson.contextVocabularyTasks).length < min.contextVocabularyTasks) issues.push(normalizeIssue('deep.reading.contextVocabulary.too_few', 'Reading profunda precisa de vocabulário pelo contexto.', 'warn', 'contextVocabularyTasks'));
  if (!lesson.guidedSummary) issues.push(normalizeIssue('deep.reading.summary.missing', 'Reading profunda precisa de resumo guiado.', 'error', 'guidedSummary'));
  if (!lesson.connectedProduction) issues.push(normalizeIssue('deep.reading.production.missing', 'Reading profunda precisa de produção conectada ao texto.', 'error', 'connectedProduction'));
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

function validateDeepListening(lesson) {
  const min = STATIC_DEEP_MINIMUMS.listening;
  const issues = validateDeepGlobal(lesson);
  const transcript = lesson.transcript || lesson.audioScript;
  const requiredWords = min.audioScriptWords[lesson.level] || min.audioScriptWords.A1;
  if (safeArray(lesson.listeningPreparation).length < 2) issues.push(normalizeIssue('deep.listening.prep.too_few', 'Listening profunda precisa de preparação antes de ouvir.', 'error', 'listeningPreparation'));
  if (safeArray(lesson.keyWordsToHear).length < 6) issues.push(normalizeIssue('deep.listening.keyWords.too_few', 'Listening profunda precisa de palavras-chave para ouvir.', 'error', 'keyWordsToHear'));
  if (countWords(transcript) < requiredWords) issues.push(normalizeIssue('deep.listening.audio.too_short', `Listening profunda precisa de áudio/script com pelo menos ${requiredWords} palavras.`, 'error', 'audioScript'));
  if (safeArray(lesson.firstListenTasks).length < min.firstListenTasks) issues.push(normalizeIssue('deep.listening.firstListen.too_few', 'Listening profunda precisa de primeira escuta sem texto.', 'error', 'firstListenTasks'));
  if (safeArray(lesson.secondListenTasks).length < min.secondListenTasks) issues.push(normalizeIssue('deep.listening.secondListen.too_few', 'Listening profunda precisa de segunda escuta com foco.', 'error', 'secondListenTasks'));
  if (safeArray(lesson.shadowing).length < min.shadowing) issues.push(normalizeIssue('deep.listening.shadowing.too_few', 'Listening profunda precisa de shadowing.', 'error', 'shadowing'));
  if (safeArray(lesson.dictationTasks).length < min.dictationTasks) issues.push(normalizeIssue('deep.listening.dictation.too_few', 'Listening profunda precisa de dictation leve.', 'warn', 'dictationTasks'));
  issues.push(...validateItemsWithAnswer(lesson.listeningComprehension, 'listeningComprehension', min.listeningComprehension));
  if (!lesson.oralProduction) issues.push(normalizeIssue('deep.listening.oralProduction.missing', 'Listening profunda precisa de produção oral curta.', 'error', 'oralProduction'));
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

function validateDeepSpeaking(lesson) {
  const min = STATIC_DEEP_MINIMUMS.speaking;
  const issues = validateDeepGlobal(lesson);
  if (!hasAnyText(lesson.speakingSituation)) issues.push(normalizeIssue('deep.speaking.situation.missing', 'Speaking profunda precisa de situação de fala.', 'error', 'speakingSituation'));
  if (safeArray(lesson.modelPhrases).length < min.modelPhrases) issues.push(normalizeIssue('deep.speaking.models.too_few', 'Speaking profunda precisa de frases-modelo suficientes.', 'error', 'modelPhrases'));
  if (safeArray(lesson.repeatAfterMe).length < min.repeatAfterMe) issues.push(normalizeIssue('deep.speaking.repeat.too_few', 'Speaking profunda precisa de repetição guiada.', 'error', 'repeatAfterMe'));
  if (safeArray(lesson.substitutionDrills).length < min.substitutionDrills) issues.push(normalizeIssue('deep.speaking.substitution.too_few', 'Speaking profunda precisa de substitution drills.', 'error', 'substitutionDrills'));
  if (safeArray(lesson.questionAnswerDrills).length < min.questionAnswerDrills) issues.push(normalizeIssue('deep.speaking.qa.too_few', 'Speaking profunda precisa de pergunta-resposta.', 'error', 'questionAnswerDrills'));
  if (safeArray(lesson.recordingTasks).length < min.recordingTasks) issues.push(normalizeIssue('deep.speaking.recording.too_few', 'Speaking profunda precisa de gravação guiada.', 'error', 'recordingTasks'));
  if (safeArray(lesson.speakingChecklist).length < min.speakingChecklist) issues.push(normalizeIssue('deep.speaking.checklist.too_few', 'Speaking profunda precisa de checklist de fala.', 'error', 'speakingChecklist'));
  if (safeArray(lesson.freeSpeaking).length < min.freeSpeaking) issues.push(normalizeIssue('deep.speaking.free.missing', 'Speaking profunda precisa de fala livre curta.', 'error', 'freeSpeaking'));
  return issues;
}

function validateWriting(lesson) {
  const min = STATIC_MINIMUMS.writing;
  const issues = [];
  const requiredWords = min.modelTextWords[lesson.level] || min.modelTextWords.A1;
  if (countWords(lesson.modelText) < requiredWords) issues.push(normalizeIssue('writing.modelText.too_short', `Writing precisa de modelText com pelo menos ${requiredWords} palavras para ${lesson.level}.`, 'error', 'modelText'));
  if (safeArray(lesson.writingBlocks).length < min.writingBlocks) issues.push(normalizeIssue('writing.blocks.too_few', `Writing precisa de pelo menos ${min.writingBlocks} blocos úteis.`, 'error', 'writingBlocks'));
  if (safeArray(lesson.guidedSubstitution).length < min.guidedSubstitution) issues.push(normalizeIssue('writing.substitution.too_few', `Writing precisa de pelo menos ${min.guidedSubstitution} substituições guiadas.`, 'warn', 'guidedSubstitution'));
  if (safeArray(lesson.checklist).length < min.checklist && safeArray(lesson.revisionChecklist).length < min.checklist) issues.push(normalizeIssue('writing.checklist.too_few', `Writing precisa de checklist com pelo menos ${min.checklist} itens.`, 'error', 'checklist'));
  if (!lesson.draftTask) issues.push(normalizeIssue('writing.draft.missing', 'Writing precisa de draftTask.', 'error', 'draftTask'));
  if (!lesson.revisionTask && !lesson.finalVersionTask) issues.push(normalizeIssue('writing.revision.missing', 'Writing precisa de revisionTask.', 'warn', 'revisionTask'));
  return issues;
}

function validateDeepWriting(lesson) {
  const min = STATIC_DEEP_MINIMUMS.writing;
  const issues = validateDeepGlobal(lesson);
  const requiredWords = min.modelTextWords[lesson.level] || min.modelTextWords.A1;
  if (countWords(lesson.modelText) < requiredWords) issues.push(normalizeIssue('deep.writing.model.too_short', `Writing profunda precisa de modelo com pelo menos ${requiredWords} palavras.`, 'error', 'modelText'));
  if (safeArray(lesson.modelTextBreakdown).length < min.modelTextBreakdown) issues.push(normalizeIssue('deep.writing.breakdown.too_few', 'Writing profunda precisa quebrar o modelo em blocos.', 'error', 'modelTextBreakdown'));
  if (safeArray(lesson.writingBlocks).length < min.writingBlocks) issues.push(normalizeIssue('deep.writing.blocks.too_few', 'Writing profunda precisa de blocos úteis.', 'error', 'writingBlocks'));
  if (safeArray(lesson.guidedSubstitution).length < min.guidedSubstitution) issues.push(normalizeIssue('deep.writing.substitution.too_few', 'Writing profunda precisa de substituição guiada.', 'error', 'guidedSubstitution'));
  if (safeArray(lesson.commonWritingMistakes).length < min.commonWritingMistakes) issues.push(normalizeIssue('deep.writing.mistakes.too_few', 'Writing profunda precisa de erros comuns.', 'error', 'commonWritingMistakes'));
  if (!lesson.draftTask) issues.push(normalizeIssue('deep.writing.draft.missing', 'Writing profunda precisa de rascunho.', 'error', 'draftTask'));
  if (safeArray(lesson.revisionChecklist).length < min.revisionChecklist) issues.push(normalizeIssue('deep.writing.revision.too_few', 'Writing profunda precisa de checklist de revisão.', 'error', 'revisionChecklist'));
  if (!lesson.finalVersionTask) issues.push(normalizeIssue('deep.writing.final.missing', 'Writing profunda precisa de versão final.', 'error', 'finalVersionTask'));
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

export function validateDeepStaticLesson(lesson) {
  const issues = validateBase(lesson);
  const pillar = String(lesson?.pillar || '').toLowerCase();
  if (!isDeepStaticLessonSchema(lesson?.schemaVersion)) issues.push(normalizeIssue('deep.schema.required', 'Aula profunda precisa usar static-lesson-schema-v2-deep.', 'error', 'schemaVersion'));
  if (pillar === 'grammar') issues.push(...validateDeepGrammar(lesson));
  if (pillar === 'vocabulary') issues.push(...validateDeepVocabulary(lesson));
  if (pillar === 'reading') issues.push(...validateDeepReading(lesson));
  if (pillar === 'listening') issues.push(...validateDeepListening(lesson));
  if (pillar === 'speaking') issues.push(...validateDeepSpeaking(lesson));
  if (pillar === 'writing') issues.push(...validateDeepWriting(lesson));
  if (pillar === 'checkpoint') issues.push(...validateCheckpoint(lesson));
  return {
    lessonId: lesson?.id || '',
    title: lesson?.title || '',
    pillar,
    level: lesson?.level || '',
    deepApproved: !issues.some((issue) => issue.severity === 'error'),
    issues,
    errors: issues.filter((issue) => issue.severity === 'error'),
    warnings: issues.filter((issue) => issue.severity !== 'error'),
  };
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
  const deepReport = isDeepStaticLessonSchema(lesson?.schemaVersion) ? validateDeepStaticLesson(lesson) : null;
  return {
    lessonId: lesson?.id || '',
    title: lesson?.title || '',
    pillar,
    level: lesson?.level || '',
    approved: !issues.some((issue) => issue.severity === 'error'),
    deepApproved: deepReport ? deepReport.deepApproved : false,
    issues,
    errors: issues.filter((issue) => issue.severity === 'error'),
    warnings: issues.filter((issue) => issue.severity !== 'error'),
    deepReport,
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
    deepApproved: reports.length > 0 && reports.every((report) => report.deepApproved),
    reports,
    globalIssues,
    approvedCount: reports.filter((report) => report.approved).length,
    deepApprovedCount: reports.filter((report) => report.deepApproved).length,
    rejectedCount: reports.filter((report) => !report.approved).length,
  };
}

export function summarizeStaticLessonReport(report) {
  if (!report) return 'Relatório indisponível.';
  if (report.deepApproved) return `${report.lessonId || 'Aula'} aprovada no padrão profundo.`;
  if (report.approved) return `${report.lessonId || 'Aula'} aprovada no legado com ${report.warnings?.length || 0} aviso(s), mas ainda não é deep approved.`;
  return `${report.lessonId || 'Aula'} reprovada: ${safeArray(report.errors).map((issue) => issue.message).join(' ')}`;
}

export function getSupportedStaticPillars() {
  return STATIC_PILLARS.slice();
}
