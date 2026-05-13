function clean(value) { return String(value ?? '').trim(); }
function lower(value) { return clean(value).toLowerCase(); }
function safeArray(value) { return Array.isArray(value) ? value : []; }
function hasText(value) { return clean(value).length > 0; }
function countWords(value) { const text = clean(value); return text ? text.split(/\s+/).filter(Boolean).length : 0; }
function issue(code, message, severity = 'error', path = '') { return { code, message, severity, path }; }
function textOf(value) { return clean(value?.text || value?.content || value?.instruction || value?.question || value?.title || value?.label || value); }
function noteOf(value) { return clean(value?.note || value?.why || value?.explanation || value?.reason || value?.tip || value?.translation || value?.meaning || value?.howToAvoid || ''); }
function flattenText(value) {
  if (typeof value === 'string' || typeof value === 'number') return clean(value);
  if (Array.isArray(value)) return value.map(flattenText).filter(Boolean).join('\n');
  if (value && typeof value === 'object') return Object.values(value).map(flattenText).filter(Boolean).join('\n');
  return '';
}

const GENERIC_PATTERNS = [
  'nesta aula você vai estudar',
  'modelo a1 para comparar com português',
  'variação simples do mesmo padrão',
  'exemplo a1 com vocabulário da unidade',
  'pratique o conteúdo',
  'escreva frases próprias',
  'use x para y',
  'escolha a alternativa correta',
];

const CAUSAL_MARKERS = ['porque', 'por que', 'por isso', 'a lógica', 'funciona', 'acontece', 'em inglês', 'em português', 'isso evita', 'a razão'];
const RULE_MARKERS = ['regra', 'padrão', 'estrutura', 'ordem', 'fórmula', 'forma', 'use', 'não use', 'vem antes', 'vem depois'];
const PRODUCTION_MARKERS = ['escreva', 'fale', 'grave', 'resuma', 'produza', 'monte', 'crie', 'responda'];

function countMarkers(text, markers) {
  const normalized = lower(text);
  return markers.filter((marker) => normalized.includes(marker)).length;
}

function findGenericPhrases(text) {
  const normalized = lower(text);
  return GENERIC_PATTERNS.filter((pattern) => normalized.includes(pattern));
}

function hasCommentedExamples(items = []) {
  const list = safeArray(items);
  if (!list.length) return false;
  const commented = list.filter((item) => hasText(noteOf(item)) || hasText(item?.why) || hasText(item?.warning));
  return commented.length >= Math.max(3, Math.ceil(list.length * 0.45));
}

function hasVariedPractice(lesson) {
  const groups = [
    lesson.controlledPractice,
    lesson.guidedPractice,
    lesson.errorCorrectionPractice,
    lesson.transformationPractice,
    lesson.translationPractice,
    lesson.recognitionPractice,
    lesson.usagePractice,
    lesson.evidenceQuestions,
    lesson.listeningComprehension,
    lesson.questionAnswerDrills,
  ];
  return groups.filter((group) => safeArray(group).length > 0).length >= 3;
}

function validateGlobalContent(lesson) {
  const issues = [];
  const fullText = flattenText(lesson);
  const generic = findGenericPhrases(fullText);
  if (generic.length) issues.push(issue('content.generic_phrase', `Conteúdo contém frase genérica/suspeita: ${generic.slice(0, 3).join(', ')}.`, 'error', 'content'));
  if (countWords(lesson.teacherOpening) < 60) issues.push(issue('content.teacherOpening.too_short', 'Abertura do professor curta demais para ensinar contexto real.', 'error', 'teacherOpening'));
  if (countWords(lesson.conceptExplanation) < 90) issues.push(issue('content.conceptExplanation.too_short', 'Explicação conceitual curta demais. Precisa explicar a lógica e o porquê.', 'error', 'conceptExplanation'));
  if (countMarkers(`${lesson.teacherOpening}\n${lesson.conceptExplanation}\n${flattenText(lesson.stepByStep)}`, CAUSAL_MARKERS) < 3) issues.push(issue('content.causal_reasoning.missing', 'Aula não explica suficientemente o porquê/lógica do conteúdo.', 'error', 'conceptExplanation'));
  if (countMarkers(`${lesson.conceptExplanation}\n${flattenText(lesson.stepByStep)}\n${flattenText(lesson.formationGuide)}`, RULE_MARKERS) < 3) issues.push(issue('content.explicit_rule.missing', 'Aula não mostra regra/padrão/estrutura de forma explícita.', 'error', 'conceptExplanation'));
  if (!safeArray(lesson.portugueseContrast).length) issues.push(issue('content.portuguese_contrast.missing', 'Aula precisa comparar com português quando aplicável.', 'error', 'portugueseContrast'));
  if (!hasVariedPractice(lesson)) issues.push(issue('content.practice.not_varied', 'Aula precisa de prática variada, não só um tipo de exercício.', 'error', 'practice'));
  if (!safeArray(lesson.productionTasks).length && !lesson.connectedProduction && !lesson.oralProduction && !lesson.finalVersionTask && !safeArray(lesson.freeSpeaking).length) issues.push(issue('content.production.missing', 'Aula precisa de produção própria.', 'error', 'production'));
  if (!safeArray(lesson.lessonRecap).length) issues.push(issue('content.recap.missing', 'Aula precisa de revisão final com regra, porquê, erro comum e próxima ação.', 'error', 'lessonRecap'));
  return issues;
}

function validateGrammarContent(lesson) {
  const issues = [];
  if (!hasText(lesson.grammarGoal)) issues.push(issue('grammar.goal.missing', 'Grammar precisa explicar o objetivo real da regra.', 'error', 'grammarGoal'));
  if (!safeArray(lesson.formationGuide).length) issues.push(issue('grammar.formation.missing', 'Grammar precisa ensinar como formar a estrutura.', 'error', 'formationGuide'));
  if (!safeArray(lesson.whenToUse).length) issues.push(issue('grammar.whenToUse.missing', 'Grammar precisa mostrar quando usar.', 'error', 'whenToUse'));
  if (!safeArray(lesson.whenNotToUse).length) issues.push(issue('grammar.whenNotToUse.missing', 'Grammar precisa mostrar quando não usar ou limites da regra.', 'warn', 'whenNotToUse'));
  if (!hasCommentedExamples(lesson.teacherExamples || lesson.professorExamples)) issues.push(issue('grammar.examples.not_commented', 'Exemplos de Grammar precisam ser comentados com porquê/cuidado.', 'error', 'teacherExamples'));
  if (safeArray(lesson.commonBrazilianMistakes || lesson.commonMistakes).length < 6) issues.push(issue('grammar.brazilianMistakes.too_few', 'Grammar precisa de erros brasileiros suficientes e reais.', 'error', 'commonBrazilianMistakes'));
  return issues;
}

function validateVocabularyContent(lesson) {
  const issues = [];
  if (!safeArray(lesson.essentialWords).length && !safeArray(lesson.lexicalSets).length) issues.push(issue('vocabulary.words.missing', 'Vocabulary precisa de palavras essenciais organizadas.', 'error', 'essentialWords'));
  if (!safeArray(lesson.chunks).length) issues.push(issue('vocabulary.chunks.missing', 'Vocabulary precisa de chunks/frases prontas.', 'error', 'chunks'));
  if (!safeArray(lesson.miniDialogues).length) issues.push(issue('vocabulary.dialogues.missing', 'Vocabulary precisa de mini diálogos para uso real.', 'error', 'miniDialogues'));
  return issues;
}

function validateReadingContent(lesson) {
  const issues = [];
  if (countWords(lesson.mainText) < 120) issues.push(issue('reading.text.too_short', 'Reading A1 precisa de texto real, não texto raso de poucas frases.', 'error', 'mainText'));
  if (!safeArray(lesson.evidenceQuestions || lesson.comprehensionQuestions).length) issues.push(issue('reading.evidenceQuestions.missing', 'Reading precisa de perguntas com evidência textual.', 'error', 'evidenceQuestions'));
  if (!lesson.guidedSummary) issues.push(issue('reading.summary.missing', 'Reading precisa de resumo guiado.', 'error', 'guidedSummary'));
  return issues;
}

function validateListeningContent(lesson) {
  const issues = [];
  if (countWords(lesson.audioScript || lesson.transcript) < 100) issues.push(issue('listening.script.too_short', 'Listening precisa de script/transcript suficiente para treino real.', 'error', 'audioScript'));
  if (!safeArray(lesson.keyWordsToHear).length) issues.push(issue('listening.keywords.missing', 'Listening precisa de palavras-chave para escuta.', 'error', 'keyWordsToHear'));
  if (!safeArray(lesson.shadowing).length) issues.push(issue('listening.shadowing.missing', 'Listening precisa de shadowing.', 'error', 'shadowing'));
  if (!safeArray(lesson.dictationTasks).length) issues.push(issue('listening.dictation.missing', 'Listening precisa de dictation leve.', 'warn', 'dictationTasks'));
  return issues;
}

function validateSpeakingContent(lesson) {
  const issues = [];
  if (!hasText(lesson.speakingSituation)) issues.push(issue('speaking.situation.missing', 'Speaking precisa de situação real de fala.', 'error', 'speakingSituation'));
  if (!safeArray(lesson.repeatAfterMe).length) issues.push(issue('speaking.repeat.missing', 'Speaking precisa de repetição guiada.', 'error', 'repeatAfterMe'));
  if (!safeArray(lesson.questionAnswerDrills).length) issues.push(issue('speaking.qa.missing', 'Speaking precisa de pergunta-resposta.', 'error', 'questionAnswerDrills'));
  if (!safeArray(lesson.recordingTasks).length) issues.push(issue('speaking.recording.missing', 'Speaking precisa de gravação guiada.', 'error', 'recordingTasks'));
  return issues;
}

function validateWritingContent(lesson) {
  const issues = [];
  if (countWords(lesson.modelText) < 60) issues.push(issue('writing.model.too_short', 'Writing precisa de modelo real de texto.', 'error', 'modelText'));
  if (!safeArray(lesson.modelTextBreakdown).length) issues.push(issue('writing.breakdown.missing', 'Writing precisa explicar como o modelo é construído.', 'error', 'modelTextBreakdown'));
  if (!lesson.draftTask) issues.push(issue('writing.draft.missing', 'Writing precisa de rascunho.', 'error', 'draftTask'));
  if (!lesson.finalVersionTask && !lesson.revisionTask) issues.push(issue('writing.final.missing', 'Writing precisa de versão final revisada.', 'error', 'finalVersionTask'));
  return issues;
}

export function validatePedagogicalContentQuality(lesson = {}) {
  const pillar = lower(lesson.pillar);
  const issues = validateGlobalContent(lesson);
  if (pillar === 'grammar') issues.push(...validateGrammarContent(lesson));
  if (pillar === 'vocabulary') issues.push(...validateVocabularyContent(lesson));
  if (pillar === 'reading') issues.push(...validateReadingContent(lesson));
  if (pillar === 'listening') issues.push(...validateListeningContent(lesson));
  if (pillar === 'speaking') issues.push(...validateSpeakingContent(lesson));
  if (pillar === 'writing') issues.push(...validateWritingContent(lesson));
  const errors = issues.filter((item) => item.severity === 'error');
  const warnings = issues.filter((item) => item.severity !== 'error');
  return {
    lessonId: lesson.id || '',
    title: lesson.title || '',
    pillar,
    contentApproved: errors.length === 0,
    issues,
    errors,
    warnings,
  };
}

export function summarizePedagogicalContentQuality(report) {
  if (!report) return 'Relatório de conteúdo indisponível.';
  if (report.contentApproved) return `${report.lessonId || 'Aula'} aprovada no filtro de conteúdo pedagógico.`;
  return `${report.lessonId || 'Aula'} reprovada no conteúdo: ${report.errors.map((item) => item.message).join(' ')}`;
}
