export const AI_TUTOR_ALLOWED_ACTIONS = Object.freeze({
  explainCurrentLesson: 'explain-current-lesson',
  correctWriting: 'correct-writing',
  evaluateSpeaking: 'evaluate-speaking',
  evaluateReadingAnswer: 'evaluate-reading-answer',
  evaluateListeningAnswer: 'evaluate-listening-answer',
  smallReinforcement: 'small-reinforcement',
  adaptiveReview: 'adaptive-review',
});

export const AI_TUTOR_BLOCKED_ACTIONS = Object.freeze({
  generateFullLesson: 'generate-full-lesson',
  replaceStaticCurriculum: 'replace-static-curriculum',
  inventOutsideLesson: 'invent-outside-lesson',
  advanceWithoutMastery: 'advance-without-mastery',
});

const ACTION_LABELS = Object.freeze({
  [AI_TUTOR_ALLOWED_ACTIONS.explainCurrentLesson]: 'Explicar dúvida da aula atual',
  [AI_TUTOR_ALLOWED_ACTIONS.correctWriting]: 'Corrigir Writing',
  [AI_TUTOR_ALLOWED_ACTIONS.evaluateSpeaking]: 'Avaliar Speaking',
  [AI_TUTOR_ALLOWED_ACTIONS.evaluateReadingAnswer]: 'Avaliar resposta de Reading',
  [AI_TUTOR_ALLOWED_ACTIONS.evaluateListeningAnswer]: 'Avaliar resposta de Listening',
  [AI_TUTOR_ALLOWED_ACTIONS.smallReinforcement]: 'Gerar reforço pequeno da aula atual',
  [AI_TUTOR_ALLOWED_ACTIONS.adaptiveReview]: 'Criar revisão adaptativa por erros',
});

function clean(value) { return String(value ?? '').trim(); }
function safeArray(value) { return Array.isArray(value) ? value : []; }
function getLessonText(lesson) {
  return [
    lesson?.title,
    lesson?.objective,
    safeArray(lesson?.objectives).join(' '),
    lesson?.mainText,
    lesson?.transcript,
    lesson?.audioScript,
    lesson?.modelText,
    safeArray(lesson?.explanationSections).map((item) => `${item.title || ''} ${item.content || ''}`).join(' '),
    safeArray(lesson?.professorExamples).map((item) => `${item.english || item.text || ''} ${item.translation || ''}`).join(' '),
  ].map(clean).filter(Boolean).join('\n').slice(0, 12000);
}

export function isAiTutorActionAllowed(action) {
  return Object.values(AI_TUTOR_ALLOWED_ACTIONS).includes(action);
}

export function assertAiTutorActionAllowed(action) {
  if (!isAiTutorActionAllowed(action)) {
    throw new Error(`Ação bloqueada pela política IA Tutor: ${action}. A IA não pode gerar aula-base nem substituir o currículo fixo.`);
  }
  return true;
}

export function buildAiTutorContext({ lesson, action, studentInput = '', errors = [], referenceText = '', prompt = '', mode = '', azureScores = null } = {}) {
  assertAiTutorActionAllowed(action);
  return {
    action,
    actionLabel: ACTION_LABELS[action] || 'IA Tutor',
    level: lesson?.level || 'A1',
    pillar: lesson?.pillar || lesson?.type || 'lesson',
    lessonId: lesson?.id || '',
    lessonTitle: lesson?.title || 'Aula atual',
    staticOnly: true,
    sourceOfTruth: 'static-curriculum',
    studentInput: clean(studentInput).slice(0, 4000),
    errors: safeArray(errors).slice(0, 20),
    lessonText: getLessonText(lesson),
    referenceText: clean(referenceText).slice(0, 500),
    prompt: clean(prompt).slice(0, 500),
    mode: clean(mode),
    azureScores,
    guardrails: [
      'Não gerar aula completa.',
      'Não inventar conteúdo fora da aula fixa.',
      'Não substituir o currículo fixo.',
      'Não liberar avanço sem Mastery Gate.',
      'Responder em português claro para aluno brasileiro, usando inglês apenas nos exemplos necessários.',
      'Quando corrigir, explicar o motivo e propor uma versão melhor.',
    ],
  };
}

export function buildAiTutorPrompt(context) {
  assertAiTutorActionAllowed(context?.action);
  const isSpeakingEval = context.action === AI_TUTOR_ALLOWED_ACTIONS.evaluateSpeaking;
  const isReadingEval = context.action === AI_TUTOR_ALLOWED_ACTIONS.evaluateReadingAnswer;
  const isListeningEval = context.action === AI_TUTOR_ALLOWED_ACTIONS.evaluateListeningAnswer;
  const isAdaptiveReview = context.action === AI_TUTOR_ALLOWED_ACTIONS.adaptiveReview;

  const readingLines = isReadingEval ? [
    context.referenceText ? `Texto de referência (base da avaliação):\n${context.referenceText}` : '',
    context.prompt ? `Pergunta feita ao aluno: "${context.prompt}"` : '',
    '',
    'Avalie a resposta do aluno em português:',
    '1. A resposta está baseada no texto? (1 frase direta).',
    '2. O que está incorreto ou incompleto? (1 frase com evidência do texto).',
    '3. Mostre como seria uma resposta melhor (cite o texto, não invente).',
    '4. Sugira 1 micro-treino de leitura curto.',
    'Não revele o texto inteiro como resposta. Não invente informação fora do texto.',
  ].filter(Boolean) : [];

  const listeningLines = isListeningEval ? [
    context.referenceText ? `Transcript/contexto do áudio:\n${context.referenceText}` : '',
    context.prompt ? `Pergunta feita ao aluno: "${context.prompt}"` : '',
    '',
    'Avalie a resposta do aluno em português:',
    '1. O aluno entendeu o áudio corretamente? (1 frase direta).',
    '2. O que está errado ou incompleto? (com referência ao áudio).',
    '3. Mostre como seria uma resposta correta (cite o áudio, não invente).',
    '4. Sugira 1 micro-treino de escuta curto.',
    'Não revele o transcript completo como resposta. Não invente informação.',
  ].filter(Boolean) : [];

  const adaptiveReviewLines = isAdaptiveReview ? [
    '',
    'Os erros reais do aluno estão listados acima (campo "Erros recentes do aluno").',
    'Crie uma revisão adaptativa curta em português com exatamente esta estrutura:',
    '1. Uma frase de diagnóstico: qual é o foco principal desta revisão.',
    '2. Os erros mais frequentes agrupados por área (grammar, writing, speaking, reading, listening, vocabulary).',
    '3. Para cada área: 1 exemplo do erro e como corrigir (máx. 2 frases por área).',
    '4. Exatamente 3 micro-exercícios práticos, 1 frase cada.',
    '5. Uma frase de conselho para a próxima aula.',
    'Máximo 250 palavras. Não crie nova aula. Não invente erros inexistentes. Baseie-se apenas nos erros listados.',
  ] : [];

  const speakingLines = isSpeakingEval ? [
    context.referenceText ? `Frase de referência: "${context.referenceText}"` : '',
    context.prompt ? `Prompt da conversa: "${context.prompt}"` : '',
    context.mode ? `Modo de prática: ${context.mode}` : '',
    context.azureScores ? [
      'Scores Azure (0–100):',
      `  Pronúncia geral: ${context.azureScores.pronunciation ?? '—'}`,
      `  Precisão: ${context.azureScores.accuracy ?? '—'}`,
      `  Fluência: ${context.azureScores.fluency ?? '—'}`,
      `  Completude: ${context.azureScores.completeness ?? '—'}`,
      context.azureScores.weakestWords?.length ? `  Palavras mais fracas: ${context.azureScores.weakestWords.join(', ')}` : '',
    ].filter(Boolean).join('\n') : '',
    '',
    'Baseado nesses dados, responda em português:',
    '1. Avalie em 1 frase se a fala respondeu ao prompt.',
    '2. Aponte 1 erro principal de inglês com explicação curta.',
    '3. Sugira 1 micro-treino (máx. 2 frases) com exemplo em inglês.',
    'Não crie nova aula. Não repita o conteúdo inteiro da aula.',
  ].filter(Boolean) : [];

  return [
    'Você é a IA Tutor do Fluency. Você NÃO é gerador de aula.',
    `Ação permitida: ${context.actionLabel}.`,
    `Nível: ${context.level}. Pilar: ${context.pillar}. Aula: ${context.lessonTitle}.`,
    'Fonte da verdade: conteúdo fixo abaixo. Use somente este conteúdo como base.',
    'Regras de segurança pedagógica:',
    ...context.guardrails.map((item) => `- ${item}`),
    '',
    'Conteúdo da aula fixa:',
    context.lessonText || 'Sem conteúdo detalhado disponível.',
    '',
    context.studentInput ? 'Entrada do aluno (fala/escrita):' : '',
    context.studentInput || '',
    context.errors?.length ? 'Erros recentes do aluno:' : '',
    context.errors?.length ? JSON.stringify(context.errors, null, 2) : '',
    ...speakingLines,
    ...readingLines,
    ...listeningLines,
    ...adaptiveReviewLines,
    '',
    'Responda de forma curta, útil e prática. Não crie uma nova aula.',
  ].filter(Boolean).join('\n');
}

export function getAiTutorPolicySummary() {
  return {
    mode: 'tutor-only',
    allowedActions: Object.entries(AI_TUTOR_ALLOWED_ACTIONS).map(([key, value]) => ({ key, value, label: ACTION_LABELS[value] })),
    blockedActions: Object.values(AI_TUTOR_BLOCKED_ACTIONS),
    sourceOfTruth: 'static-curriculum',
  };
}
