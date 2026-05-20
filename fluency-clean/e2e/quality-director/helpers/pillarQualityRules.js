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

function auditGrammar(lesson) {
  const issues = [];
  const text = clean(lesson).toLowerCase();

  requireField({
    issues,
    lesson,
    fields: ['conceptExplanation', 'teacherOpening', 'grammarExplanation', 'ruleExplanation'],
    title: 'Grammar sem explicação conceitual clara',
    impact: 'O aluno pode praticar sem entender a regra gramatical.',
    recommendation: 'Adicionar explicação da regra, quando usar e como formar a estrutura.',
  });

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

  if (!textIncludesAny(text, [/practice|prática|guided|exerc/i])) {
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

function auditVocabulary(lesson) {
  const issues = [];
  requireMinimumList({
    issues,
    lesson,
    fields: ['essentialWords', 'vocabulary', 'keyVocabulary', 'preReadingVocabulary'],
    min: 5,
    title: 'Vocabulary com poucas palavras úteis',
    impact: 'A aula pode não entregar volume suficiente de vocabulário para fixação.',
    recommendation: 'Adicionar lista de palavras/frases com significado e exemplo.',
    severity: 'P1',
  });

  requireField({
    issues,
    lesson,
    fields: ['realLifeUseCases', 'contextExamples', 'exampleSentences', 'contextVocabularyTasks'],
    title: 'Vocabulary sem contexto real de uso',
    impact: 'O aluno pode memorizar palavra solta sem saber usar em frase.',
    recommendation: 'Adicionar exemplos contextualizados e situações reais.',
  });

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

function auditReading(lesson) {
  const issues = [];
  const mainText = clean(lesson?.mainText || lesson?.text || lesson?.readingText);

  if (mainText.length < 180) {
    addIssue(issues, {
      severity: 'P1',
      area: lessonArea(lesson),
      title: 'Reading com texto principal curto demais',
      impact: 'O aluno pode responder sem treinar leitura real.',
      evidence: `${mainText.length} caracteres no texto principal.`,
      recommendation: 'Adicionar texto com contexto, personagem/situação e detalhes suficientes.',
    });
  }

  requireField({
    issues,
    lesson,
    fields: ['readingStrategy', 'strategy', 'guidedBeforeQuiz'],
    title: 'Reading sem estratégia de leitura clara',
    impact: 'O aluno pode tentar traduzir tudo palavra por palavra.',
    recommendation: 'Adicionar estratégia: gist, scanning, detalhe e evidência.',
  });

  requireMinimumList({
    issues,
    lesson,
    fields: ['evidenceQuestions', 'comprehensionQuestions', 'questions'],
    min: 3,
    title: 'Reading com poucas perguntas de compreensão/evidência',
    impact: 'A aula pode não verificar compreensão do texto.',
    recommendation: 'Adicionar perguntas com evidência textual e distratores plausíveis.',
    severity: 'P1',
  });

  if (!/evidence|evidência|texto|frase|prova/i.test(clean(lesson))) {
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

function auditListening(lesson) {
  const issues = [];
  requireField({
    issues,
    lesson,
    fields: ['listeningPreparation', 'preListening', 'predictionTask', 'guidedBeforeListening'],
    title: 'Listening sem preparação/predição antes do áudio',
    impact: 'O aluno escuta passivamente e perde estratégia de compreensão.',
    recommendation: 'Adicionar predição, palavras-chave e objetivo antes do áudio.',
  });

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
