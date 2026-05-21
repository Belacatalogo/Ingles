function clean(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value).trim().replace(/\s+/g, ' ');
  if (Array.isArray(value)) return value.map(clean).filter(Boolean).join(' ');
  if (typeof value === 'object') {
    return clean(Object.values(value).filter((item) => typeof item !== 'function'));
  }
  return '';
}

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function hasAnyField(lesson, fields) {
  return fields.some((field) => {
    const value = lesson?.[field];
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(clean(value));
  });
}

function countAnyField(lesson, fields) {
  return fields.reduce((sum, field) => {
    const value = lesson?.[field];
    if (Array.isArray(value)) return sum + value.length;
    return sum + (clean(value) ? 1 : 0);
  }, 0);
}

function textIncludesAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

function addIssue(issues, issue) {
  issues.push({ severity: 'P2', ...issue });
}

function lessonArea(lesson) {
  return `Pilar ${String(lesson?.pillar || lesson?.type || 'unknown').toUpperCase()} · ${lesson?.id || 'unknown-lesson'}`;
}

function requireField({ issues, lesson, fields, title, impact, recommendation, severity = 'P1' }) {
  if (!hasAnyField(lesson, fields)) {
    addIssue(issues, {
      severity,
      area: lessonArea(lesson),
      title,
      impact,
      evidence: `Campos esperados ausentes/vazios: ${fields.join(', ')}`,
      recommendation,
    });
  }
}

function requireMinimumList({ issues, lesson, fields, min, title, impact, recommendation, severity = 'P2' }) {
  const count = countAnyField(lesson, fields);
  if (count < min) {
    addIssue(issues, {
      severity,
      area: lessonArea(lesson),
      title,
      impact,
      evidence: `Encontrado ${count}; mínimo esperado ${min}. Campos: ${fields.join(', ')}`,
      recommendation,
    });
  }
}

// Campos que carregam prática ativa de Grammar como estrutura (não texto solto).
const GRAMMAR_PRACTICE_FIELDS = [
  'guidedPractice',
  'controlledPractice',
  'errorCorrectionPractice',
  'translationPractice',
  'transformationPractice',
  'productionTasks',
  'guidedDiscovery',
];

// Sinais de tarefa real dentro de um item de prática.
const GRAMMAR_PRACTICE_TASK_KEYS = ['question', 'instruction', 'prompt', 'task', 'sentence', 'text'];

function hasGrammarPracticeItem(value) {
  // String solta só conta se for instrução substantiva, não um label curto.
  if (typeof value === 'string') return clean(value).length >= 12;
  if (value && typeof value === 'object') {
    return GRAMMAR_PRACTICE_TASK_KEYS.some((key) => clean(value[key]).length >= 4);
  }
  return false;
}

function hasActiveGrammarPractice(lesson) {
  return GRAMMAR_PRACTICE_FIELDS.some((field) =>
    safeArray(lesson?.[field]).some(hasGrammarPracticeItem),
  );
}

// Schema antigo (fullContent/createGrammarLesson) coloca a explicação conceitual
// em explanationSections [{ title, content }]. Reconhece quando há pelo menos
// duas seções com texto útil — conservador, não aceita seções vazias.
function hasSubstantialExplanationSections(lesson) {
  const useful = safeArray(lesson?.explanationSections).filter((section) => {
    if (typeof section === 'string') return clean(section).length >= 40;
    if (section && typeof section === 'object') {
      return clean(section.content || section.body || section.text || section).length >= 40;
    }
    return false;
  });
  return useful.length >= 2;
}

function auditGrammar(lesson) {
  const issues = [];
  const text = clean(lesson).toLowerCase();

  const hasConceptExplanation =
    hasAnyField(lesson, ['conceptExplanation', 'teacherOpening', 'grammarExplanation', 'ruleExplanation']) ||
    hasSubstantialExplanationSections(lesson);
  if (!hasConceptExplanation) {
    addIssue(issues, {
      severity: 'P1',
      area: lessonArea(lesson),
      title: 'Grammar sem explicação conceitual clara',
      impact: 'O aluno pode praticar sem entender a regra gramatical.',
      evidence: 'Campos esperados ausentes/vazios: conceptExplanation, teacherOpening, grammarExplanation, ruleExplanation, explanationSections (>=2 seções com texto).',
      recommendation: 'Adicionar explicação da regra, quando usar e como formar a estrutura.',
    });
  }

  requireMinimumList({
    issues,
    lesson,
    fields: ['examples', 'positiveExamples', 'negativeExamples', 'stepByStep', 'guidedDiscovery'],
    min: 3,
    title: 'Grammar com poucos exemplos ou passos guiados',
    impact: 'A aula pode ficar abstrata e difícil de aplicar.',
    recommendation: 'Adicionar exemplos positivos, negativos e prática guiada.',
  });

  requireField({
    issues,
    lesson,
    fields: ['portugueseContrast', 'commonMistakes', 'contrast'],
    title: 'Grammar sem contraste português/inglês ou erros comuns',
    impact: 'O aluno brasileiro pode repetir transferências erradas do português.',
    recommendation: 'Adicionar contraste direto com português e erros comuns.',
    severity: 'P2',
  });

  // Prática ativa: prioriza evidência estrutural (arrays de tarefas reais);
  // mantém o sinal textual como fallback para schemas que só tenham texto.
  if (!hasActiveGrammarPractice(lesson) && !textIncludesAny(text, [/practice|prática|guided|exerc/i])) {
    addIssue(issues, {
      severity: 'P1',
      area: lessonArea(lesson),
      title: 'Grammar sem sinal claro de prática ativa',
      impact: 'A aula pode virar teoria sem verificação de domínio.',
      recommendation: 'Adicionar exercícios de aplicação da regra em contexto.',
    });
  }

  return issues;
}

// Conta volume lexical reconhecendo schema premium: palavras diretas + itens de
// lexicalSets (items/words/entries) + chunks reais. Só conta itens com conteúdo,
// nunca listas vazias ou labels.
function countVocabularyVolume(lesson) {
  const direct = ['essentialWords', 'vocabulary', 'keyVocabulary', 'preReadingVocabulary']
    .reduce((sum, field) => sum + safeArray(lesson?.[field]).filter((item) => clean(item).length >= 1).length, 0);
  const lexical = safeArray(lesson?.lexicalSets).reduce((sum, set) => {
    if (set && typeof set === 'object') {
      return sum + safeArray(set.items || set.words || set.entries).filter((item) => clean(item).length >= 1).length;
    }
    return sum;
  }, 0);
  const chunks = safeArray(lesson?.chunks).filter((c) => clean(c?.chunk || c?.text || c).length >= 4).length;
  return direct + lexical + chunks;
}

// Reconhece contexto real de uso: campos diretos, frases em examples,
// miniDialogues reais, exemplos por palavra (essentialWords[].example) ou
// topicContext substancial. Não aceita só tema/título.
function hasVocabularyContext(lesson) {
  if (hasAnyField(lesson, ['realLifeUseCases', 'contextExamples', 'exampleSentences', 'contextVocabularyTasks'])) return true;
  const exampleSentences = safeArray(lesson?.examples)
    .filter((e) => clean(e?.text || e?.sentence || e).length >= 12).length;
  if (exampleSentences >= 3) return true;
  const dialogues = safeArray(lesson?.miniDialogues)
    .filter((d) => safeArray(d?.lines).length >= 2 || clean(d).length >= 40).length;
  if (dialogues >= 1) return true;
  const wordExamples = safeArray(lesson?.essentialWords)
    .filter((w) => w && typeof w === 'object' && clean(w.example || w.exampleSentences).length >= 8).length;
  if (wordExamples >= 3) return true;
  if (clean(lesson?.topicContext).length >= 60) return true;
  return false;
}

function auditVocabulary(lesson) {
  const issues = [];
  if (countVocabularyVolume(lesson) < 5) {
    addIssue(issues, {
      severity: 'P1',
      area: lessonArea(lesson),
      title: 'Vocabulary com poucas palavras úteis',
      impact: 'A aula pode não entregar volume suficiente de vocabulário para fixação.',
      evidence: 'Volume reconhecido (<5) em essentialWords/vocabulary/keyVocabulary/preReadingVocabulary/lexicalSets/chunks.',
      recommendation: 'Adicionar lista de palavras/frases com significado e exemplo.',
    });
  }

  if (!hasVocabularyContext(lesson)) {
    addIssue(issues, {
      severity: 'P1',
      area: lessonArea(lesson),
      title: 'Vocabulary sem contexto real de uso',
      impact: 'O aluno pode memorizar palavra solta sem saber usar em frase.',
      evidence: 'Sem contexto em realLifeUseCases/contextExamples/exampleSentences/contextVocabularyTasks/examples/miniDialogues/essentialWords[].example/topicContext.',
      recommendation: 'Adicionar exemplos contextualizados e situações reais.',
    });
  }

  const vocabText = clean([lesson?.essentialWords, lesson?.vocabulary, lesson?.keyVocabulary]);
  if (vocabText && !/example|exemplo|frase|sentence/i.test(vocabText)) {
    addIssue(issues, {
      severity: 'P2',
      area: lessonArea(lesson),
      title: 'Vocabulary sem exemplos de frase aparentes',
      impact: 'Palavras soltas reduzem transferência para speaking/writing.',
      recommendation: 'Cada palavra importante deve ter exemplo curto e natural.',
    });
  }

  return issues;
}

// Texto principal reconhecendo todos os schemas: mainText/text (A1/A2/B1/B2),
// passage/mainPassage/inputText (C1/C2) e readingText.body/text.
function readingMainText(lesson) {
  const candidates = [
    lesson?.mainText,
    lesson?.text,
    lesson?.readingText?.body || lesson?.readingText?.text || lesson?.readingText,
    lesson?.passage,
    lesson?.mainPassage,
    lesson?.inputText,
  ];
  return candidates.reduce((longest, value) => {
    const c = clean(value);
    return c.length > longest.length ? c : longest;
  }, '');
}

// Conta tarefas de leitura reais (instrução substantiva), usado para reconhecer
// `tasks` analíticos (C1/C2) como estratégia/compreensão.
function countReadingTasks(lesson, minInstruction = 1) {
  return safeArray(lesson?.tasks)
    .filter((t) => clean(t?.instruction || t?.question || t).length >= minInstruction).length;
}

// Estratégia de leitura reconhecida estruturalmente. Não conta comprehension
// pura (comprehensionQuestions/guidedSummary) como estratégia.
function hasReadingStrategy(lesson) {
  if (hasAnyField(lesson, ['readingStrategy', 'strategy', 'guidedBeforeQuiz', 'preReading', 'beforeReading', 'skimmingTask', 'scanningTask', 'gistTask', 'detailTask', 'secondReadTasks'])) return true;
  if (clean(lesson?.firstReadTask).length >= 20 || clean(lesson?.readingPurpose).length >= 20) return true;
  // tarefas analíticas de leitura (C1/C2): ao menos 2 com instrução real.
  if (countReadingTasks(lesson, 40) >= 2) return true;
  return false;
}

function countReadingQuestions(lesson) {
  return ['evidenceQuestions', 'comprehensionQuestions', 'questions', 'openQuestions', 'inferenceQuestions', 'tasks', 'secondReadTasks', 'evidenceTasks']
    .reduce((sum, field) => sum + safeArray(lesson?.[field]).length, 0);
}

function hasReadingEvidence(lesson) {
  if (safeArray(lesson?.evidenceQuestions).length || safeArray(lesson?.evidenceTasks).length) return true;
  if (safeArray(lesson?.tasks).some((t) => clean(t?.expected || t?.note).length >= 8)) return true;
  return /evidence|evidência|texto|frase|prova/i.test(clean(lesson));
}

function auditReading(lesson) {
  const issues = [];
  const mainText = readingMainText(lesson);

  if (mainText.length < 180) {
    addIssue(issues, {
      severity: 'P1',
      area: lessonArea(lesson),
      title: 'Reading com texto principal curto demais',
      impact: 'O aluno pode responder sem treinar leitura real.',
      evidence: `${mainText.length} caracteres no texto principal (mainText/text/readingText/passage/inputText).`,
      recommendation: 'Adicionar texto com contexto, personagem/situação e detalhes suficientes.',
    });
  }

  if (!hasReadingStrategy(lesson)) {
    addIssue(issues, {
      severity: 'P1',
      area: lessonArea(lesson),
      title: 'Reading sem estratégia de leitura clara',
      impact: 'O aluno pode tentar traduzir tudo palavra por palavra.',
      evidence: 'Sem estratégia em readingStrategy/strategy/guidedBeforeQuiz/preReading/beforeReading/firstReadTask/readingPurpose/secondReadTasks/skimming/scanning/gist/detail/tasks analíticos.',
      recommendation: 'Adicionar estratégia: gist, scanning, detalhe e evidência.',
    });
  }

  if (countReadingQuestions(lesson) < 3) {
    addIssue(issues, {
      severity: 'P1',
      area: lessonArea(lesson),
      title: 'Reading com poucas perguntas de compreensão/evidência',
      impact: 'A aula pode não verificar compreensão do texto.',
      evidence: 'Menos de 3 em evidenceQuestions/comprehensionQuestions/questions/openQuestions/inferenceQuestions/tasks/secondReadTasks/evidenceTasks.',
      recommendation: 'Adicionar perguntas com evidência textual e distratores plausíveis.',
    });
  }

  if (!hasReadingEvidence(lesson)) {
    addIssue(issues, {
      severity: 'P1',
      area: lessonArea(lesson),
      title: 'Reading sem linguagem de evidência textual',
      impact: 'O aluno pode responder por chute ou memória, não pelo texto.',
      recommendation: 'Incluir instruções e perguntas que exijam evidência no texto.',
    });
  }

  return issues;
}

// Preparação/predição antes do áudio reconhecida estruturalmente: campos
// explícitos de pré-escuta, palavras-chave, descrição do áudio, tarefa de
// primeira escuta (gist) ou listeningTasks staged com etapa de 1ª escuta.
// Não conta tasks analíticos pós-escuta nem título/objetivo.
function hasListeningPreparation(lesson) {
  if (hasAnyField(lesson, ['listeningPreparation', 'preListening', 'predictionTask', 'guidedBeforeListening', 'beforeListening', 'focusBeforeListening', 'keywords', 'keyWordsToHear'])) return true;
  if (clean(lesson?.listeningPurpose).length >= 20 || clean(lesson?.audioDescription).length >= 40) return true;
  if (safeArray(lesson?.firstListenTasks).some((t) => clean(t?.instruction || t).length >= 10)) return true;
  if (safeArray(lesson?.listeningTasks).some((stage) => /first listen|gist|primeira escuta|prepar/i.test(clean(stage?.stage)))) return true;
  return false;
}

function auditListening(lesson) {
  const issues = [];
  if (!hasListeningPreparation(lesson)) {
    addIssue(issues, {
      severity: 'P1',
      area: lessonArea(lesson),
      title: 'Listening sem preparação/predição antes do áudio',
      impact: 'O aluno escuta passivamente e perde estratégia de compreensão.',
      evidence: 'Sem preparação em listeningPreparation/preListening/predictionTask/guidedBeforeListening/beforeListening/listeningPurpose/focusBeforeListening/keyWordsToHear/audioDescription/firstListenTasks/listeningTasks(1ª escuta).',
      recommendation: 'Adicionar predição, palavras-chave e objetivo antes do áudio.',
    });
  }

  requireField({
    issues,
    lesson,
    fields: ['listeningScript', 'audioScript', 'dialogue', 'transcript'],
    title: 'Listening sem script/transcript pedagógico no conteúdo',
    impact: 'O renderizador pode não ter base para áudio, shadowing ou revisão.',
    recommendation: 'Adicionar script do áudio com controle de quando mostrar transcript.',
    severity: 'P1',
  });

  requireMinimumList({
    issues,
    lesson,
    fields: ['listeningQuestions', 'comprehensionQuestions', 'detailQuestions', 'shadowingTasks'],
    min: 2,
    title: 'Listening com poucas tarefas após o áudio',
    impact: 'O aluno pode ouvir sem verificar compreensão real.',
    recommendation: 'Adicionar perguntas de gist, detalhe e shadowing/repetição.',
  });

  return issues;
}

function auditSpeaking(lesson) {
  const issues = [];
  requireField({
    issues,
    lesson,
    fields: ['modelPhrases', 'speakingModel', 'modelAnswer', 'exampleDialogue', 'guidedModel'],
    title: 'Speaking sem modelo de fala suficiente',
    impact: 'O aluno pode ser forçado a produzir sem base linguística.',
    recommendation: 'Adicionar frases-modelo, mini diálogo ou resposta exemplar antes da produção.',
    severity: 'P1',
  });

  requireField({
    issues,
    lesson,
    fields: ['pronunciationTips', 'pronunciationFocus', 'shadowingTasks', 'repeatTasks'],
    title: 'Speaking sem foco de pronúncia/shadowing',
    impact: 'A aula pode virar apenas escrita lida em voz alta.',
    recommendation: 'Adicionar foco de pronúncia e repetição guiada.',
  });

  requireField({
    issues,
    lesson,
    fields: ['freeSpeaking', 'speakingTask', 'productionTask', 'connectedProduction'],
    title: 'Speaking sem tarefa produtiva final',
    impact: 'O aluno pode praticar frases soltas sem produção própria.',
    recommendation: 'Adicionar tarefa final de fala com critérios mínimos.',
    severity: 'P1',
  });

  return issues;
}

const WRITING_ACTION_RE = /\b(write|writing|draft|revise|revision|rewrite|produce|compose|complete|transform|paragraph|sentence|email|message|post|final version|response|answer)\b|escrev|redija|rascunho|revis|reescrev|parágrafo|frase|resposta|versão final/i;

function hasActiveWritingItem(value) {
  if (!value) return false;
  if (typeof value === 'string') return WRITING_ACTION_RE.test(value);
  if (Array.isArray(value)) return value.some(hasActiveWritingItem);
  if (typeof value !== 'object') return false;

  const taskText = clean([
    value.task,
    value.prompt,
    value.instruction,
    value.question,
    value.title,
    value.expectedOutput,
    value.rubric,
    value.criteria,
    value.steps,
  ]);

  if (WRITING_ACTION_RE.test(taskText)) return true;
  if (typeof value.minWords === 'number' && taskText.length >= 20) return true;
  if (typeof value.wordTarget === 'number' && taskText.length >= 20) return true;

  return false;
}

function hasPremiumWritingProduction(lesson) {
  return [
    lesson?.writingPrompt,
    lesson?.prompt,
    lesson?.connectedProduction,
    lesson?.productionTask,
    lesson?.draftTask,
    lesson?.revisionTask,
    lesson?.finalVersionTask,
    lesson?.guidedSubstitution,
    lesson?.writingTasks,
    lesson?.tasks,
    lesson?.writingTask,
  ].some(hasActiveWritingItem);
}

function countWritingReviewCriteria(lesson) {
  const shallow = [
    ...safeArray(lesson?.checklist),
    ...safeArray(lesson?.revisionChecklist),
    ...safeArray(lesson?.writingChecklist),
    ...safeArray(lesson?.selfAssessment),
    ...safeArray(lesson?.feedbackPreparation),
  ].filter((item) => clean(item).length >= 8).length;

  // C1/C2 usam `tasks[]` onde cada task carrega critério em campos
  // distintos: `note` (guidance de processo), `expected` (rubrica de
  // qualidade), `rubric`/`criteria` (avaliação explícita). Cada campo
  // não-vazio é um critério separado — reconhece o schema premium sem
  // mascarar.
  const taskCriteria = safeArray(lesson?.tasks).reduce((sum, task) => {
    if (!task || typeof task !== 'object') return sum;
    return sum
      + (clean(task.note).length >= 8 ? 1 : 0)
      + (clean(task.expected).length >= 8 ? 1 : 0)
      + (clean(task.rubric).length >= 8 ? 1 : 0)
      + (clean(task.criteria).length >= 8 ? 1 : 0);
  }, 0);

  return shallow + taskCriteria;
}

function hasPremiumWritingModel(lesson) {
  const modelText = clean(lesson?.modelText || lesson?.exampleText || lesson?.sampleAnswer || lesson?.modelAnswer || lesson?.guidedModel);
  if (modelText.length >= 40) return true;

  const writingModel = lesson?.writingModel;
  if (writingModel && typeof writingModel === 'object' && clean(writingModel).length >= 40) return true;

  const breakdown = safeArray(lesson?.modelTextBreakdown);
  if (breakdown.length >= 2 && clean(breakdown).length >= 80) return true;

  // C2: o texto-fonte/insumo da tarefa (inputText) cumpre o papel de
  // modelo de leitura/análise antes de escrever. Aceita quando substantivo.
  const inputText = clean(lesson?.inputText);
  if (inputText.length >= 200) return true;

  return false;
}

function auditWriting(lesson) {
  const issues = [];

  if (!hasPremiumWritingProduction(lesson)) {
    addIssue(issues, {
      severity: 'P1',
      area: lessonArea(lesson),
      title: 'Writing sem prompt claro de produção',
      impact: 'O aluno pode não saber exatamente o que escrever.',
      evidence: 'Nenhuma tarefa ativa de escrita detectada em prompt/draft/revision/finalVersion/writingTasks/tasks.',
      recommendation: 'Adicionar prompt com tarefa, formato, tamanho e foco linguístico.',
    });
  }

  const reviewCriteriaCount = countWritingReviewCriteria(lesson);
  if (reviewCriteriaCount < 4) {
    addIssue(issues, {
      severity: 'P1',
      area: lessonArea(lesson),
      title: 'Writing com checklist/revisão fraco',
      impact: 'O aluno pode escrever sem critérios de qualidade.',
      evidence: `Encontrado ${reviewCriteriaCount}; mínimo esperado 4. Campos: checklist, revisionChecklist, writingChecklist, selfAssessment, feedbackPreparation`,
      recommendation: 'Adicionar checklist de conteúdo, gramática, vocabulário, clareza e revisão.',
    });
  }

  if (!hasPremiumWritingModel(lesson)) {
    addIssue(issues, {
      severity: 'P2',
      area: lessonArea(lesson),
      title: 'Writing sem modelo/exemplo pedagógico',
      impact: 'O aluno pode não entender o padrão esperado do texto.',
      evidence: 'Ausente modelo textual substancial em modelText/writingModel/modelTextBreakdown.',
      recommendation: 'Adicionar modelo ou exemplo controlado, com cuidado para não aparecer cedo demais em exercício de descoberta.',
    });
  }

  return issues;
}

function auditUnknown(lesson) {
  const issues = [];
  addIssue(issues, {
    severity: 'P1',
    area: lessonArea(lesson),
    title: 'Pilar desconhecido para auditoria pedagógica',
    impact: 'O Quality Director não sabe qual rubrica aplicar a esta aula.',
    evidence: `pillar=${lesson?.pillar || ''}; type=${lesson?.type || ''}`,
    recommendation: 'Definir pillar/type como grammar, vocabulary, reading, listening, speaking ou writing.',
  });
  return issues;
}

const AUDITORS = {
  grammar: auditGrammar,
  vocabulary: auditVocabulary,
  reading: auditReading,
  listening: auditListening,
  speaking: auditSpeaking,
  writing: auditWriting,
};

export function auditLessonByPillar(lesson) {
  const pillar = String(lesson?.pillar || lesson?.type || '').toLowerCase();
  const auditor = AUDITORS[pillar] || auditUnknown;
  return auditor(lesson);
}

export function getPillarAuditSummary(lessons = []) {
  return lessons.reduce((summary, lesson) => {
    const pillar = String(lesson?.pillar || lesson?.type || 'unknown').toLowerCase();
    summary[pillar] = (summary[pillar] || 0) + 1;
    return summary;
  }, {});
}
