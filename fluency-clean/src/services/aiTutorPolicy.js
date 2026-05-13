export const AI_TUTOR_ALLOWED_ACTIONS = Object.freeze({
  explainCurrentLesson: 'explain-current-lesson',
  correctWriting: 'correct-writing',
  evaluateSpeaking: 'evaluate-speaking',
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

export function buildAiTutorContext({ lesson, action, studentInput = '', errors = [] } = {}) {
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
    context.studentInput ? 'Entrada do aluno:' : '',
    context.studentInput || '',
    context.errors?.length ? 'Erros recentes do aluno:' : '',
    context.errors?.length ? JSON.stringify(context.errors, null, 2) : '',
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
