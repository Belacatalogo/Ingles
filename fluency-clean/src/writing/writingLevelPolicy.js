export const WRITING_LEVEL_POLICY_VERSION = 'writing-level-policy-v1';
export const WRITING_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

export const WRITING_TASK_TYPES = Object.freeze({
  WORD_ORDER: 'word_order',
  FILL_BLANK: 'fill_blank',
  GUIDED_SENTENCE: 'guided_sentence',
  CORRECTION: 'correction',
  SENTENCE_EXPAND: 'sentence_expand',
  SHORT_PARAGRAPH: 'short_paragraph',
  REWRITE_FEEDBACK: 'rewrite_with_feedback',
});

export const WRITING_RUBRIC_CRITERIA = Object.freeze([
  Object.freeze({ id: 'grammar', label: 'Gramática', weight: 30, description: 'Erros estruturais, conjugação, concordância.' }),
  Object.freeze({ id: 'vocabulary', label: 'Vocabulário', weight: 25, description: 'Adequação e variedade para o nível.' }),
  Object.freeze({ id: 'cohesion', label: 'Coesão', weight: 20, description: 'Conectivos, fluxo, paragrafação.' }),
  Object.freeze({ id: 'task', label: 'Tarefa atendida', weight: 25, description: 'Respondeu o que foi pedido?' }),
]);

export const WRITING_LEVEL_POLICIES = Object.freeze({
  A1: Object.freeze({
    level: 'A1',
    label: 'A1 · Escrita guiada inicial',
    studentGoal: 'Escrever palavras e frases curtas com modelo visual, sem pressão de produção livre.',
    taskTypes: [WRITING_TASK_TYPES.WORD_ORDER, WRITING_TASK_TYPES.FILL_BLANK, WRITING_TASK_TYPES.GUIDED_SENTENCE],
    sentenceWordRange: [3, 7],
    productionSentences: { min: 1, max: 2 },
    rubricPassingScore: 50,
    rubricApplied: false,
    instructionLanguage: 'pt-BR',
    autoSaveSeconds: 3,
    detectPaste: true,
    spellcheckEnabled: false,
    showWordCount: false,
    showStructureHint: true,
    questionCount: { min: 6, ideal: 8, max: 10 },
    uiTone: 'muito guiado, modelo sempre visível, sem avaliação rígida',
    sessionMinutes: { min: 5, max: 8 },
  }),

  A2: Object.freeze({
    level: 'A2',
    label: 'A2 · Escrita funcional básica',
    studentGoal: 'Escrever frases simples e pequenos textos sobre situações cotidianas com apoio de modelo.',
    taskTypes: [WRITING_TASK_TYPES.WORD_ORDER, WRITING_TASK_TYPES.FILL_BLANK, WRITING_TASK_TYPES.CORRECTION, WRITING_TASK_TYPES.GUIDED_SENTENCE],
    sentenceWordRange: [5, 12],
    productionSentences: { min: 2, max: 4 },
    rubricPassingScore: 55,
    rubricApplied: false,
    instructionLanguage: 'mixed-pt-en',
    autoSaveSeconds: 3,
    detectPaste: true,
    spellcheckEnabled: false,
    showWordCount: true,
    showStructureHint: true,
    questionCount: { min: 8, ideal: 10, max: 12 },
    uiTone: 'guiado com apoio, modelo disponível, feedback gentil',
    sessionMinutes: { min: 7, max: 10 },
  }),

  B1: Object.freeze({
    level: 'B1',
    label: 'B1 · Escrita independente inicial',
    studentGoal: 'Escrever textos simples e coesos sobre temas familiares, com conectivos e paragrafação básica.',
    taskTypes: [WRITING_TASK_TYPES.CORRECTION, WRITING_TASK_TYPES.SENTENCE_EXPAND, WRITING_TASK_TYPES.SHORT_PARAGRAPH],
    sentenceWordRange: [8, 18],
    productionSentences: { min: 3, max: 5 },
    rubricPassingScore: 60,
    rubricApplied: true,
    instructionLanguage: 'en-simple-pt-support',
    autoSaveSeconds: 3,
    detectPaste: true,
    spellcheckEnabled: false,
    showWordCount: true,
    showStructureHint: false,
    questionCount: { min: 10, ideal: 12, max: 14 },
    uiTone: 'mais autônomo, instrução em inglês, rubrica visível após envio',
    sessionMinutes: { min: 9, max: 13 },
  }),

  B2: Object.freeze({
    level: 'B2',
    label: 'B2 · Escrita analítica',
    studentGoal: 'Escrever textos claros e organizados com argumentação, contraste e vocabulário variado.',
    taskTypes: [WRITING_TASK_TYPES.SHORT_PARAGRAPH, WRITING_TASK_TYPES.REWRITE_FEEDBACK],
    sentenceWordRange: [10, 25],
    productionSentences: { min: 5, max: 8 },
    rubricPassingScore: 65,
    rubricApplied: true,
    instructionLanguage: 'en',
    autoSaveSeconds: 3,
    detectPaste: true,
    spellcheckEnabled: false,
    showWordCount: true,
    showStructureHint: false,
    questionCount: { min: 12, ideal: 14, max: 16 },
    uiTone: 'analítico, instrução em inglês, rubrica detalhada',
    sessionMinutes: { min: 11, max: 15 },
  }),

  C1: Object.freeze({
    level: 'C1',
    label: 'C1 · Escrita avançada e precisa',
    studentGoal: 'Escrever textos complexos, nuançados e precisos sobre temas abstratos com registro adequado.',
    taskTypes: [WRITING_TASK_TYPES.SHORT_PARAGRAPH, WRITING_TASK_TYPES.REWRITE_FEEDBACK],
    sentenceWordRange: [12, 35],
    productionSentences: { min: 6, max: 10 },
    rubricPassingScore: 70,
    rubricApplied: true,
    instructionLanguage: 'en-advanced',
    autoSaveSeconds: 3,
    detectPaste: true,
    spellcheckEnabled: false,
    showWordCount: true,
    showStructureHint: false,
    questionCount: { min: 14, ideal: 16, max: 18 },
    uiTone: 'avançado, autônomo, rubrica completa com frase reescrita',
    sessionMinutes: { min: 13, max: 18 },
  }),
});

export function normalizeWritingLevel(level = 'A1') {
  const v = String(level || 'A1').trim().toUpperCase();
  if (WRITING_LEVEL_POLICIES[v]) return v;
  if (v.startsWith('C')) return 'C1';
  if (v.startsWith('B2')) return 'B2';
  if (v.startsWith('B')) return 'B1';
  if (v.startsWith('A2')) return 'A2';
  return 'A1';
}

export function getWritingLevelPolicy(level = 'A1') {
  return WRITING_LEVEL_POLICIES[normalizeWritingLevel(level)];
}

export function getWritingRubricCriteria() {
  return WRITING_RUBRIC_CRITERIA;
}

export function getWritingRubricWeightTotal() {
  return WRITING_RUBRIC_CRITERIA.reduce((sum, criterion) => sum + Number(criterion.weight || 0), 0);
}

export function getWritingPolicySummary(level = 'A1') {
  const policy = getWritingLevelPolicy(level);
  return {
    version: WRITING_LEVEL_POLICY_VERSION,
    level: policy.level,
    label: policy.label,
    taskTypes: policy.taskTypes,
    sentenceWordRange: policy.sentenceWordRange,
    productionSentences: policy.productionSentences,
    rubricPassingScore: policy.rubricPassingScore,
    rubricApplied: policy.rubricApplied,
    instructionLanguage: policy.instructionLanguage,
    autoSaveSeconds: policy.autoSaveSeconds,
    detectPaste: policy.detectPaste,
    spellcheckEnabled: policy.spellcheckEnabled,
    showWordCount: policy.showWordCount,
    showStructureHint: policy.showStructureHint,
    questionCount: policy.questionCount,
    sessionMinutes: policy.sessionMinutes,
  };
}

export function buildWritingPolicyPrompt(level = 'A1') {
  const policy = getWritingLevelPolicy(level);
  return [
    `POLÍTICA WRITING ${WRITING_LEVEL_POLICY_VERSION}`,
    `Nível: ${policy.label}`,
    `Objetivo: ${policy.studentGoal}`,
    `Tipos de tarefa: ${policy.taskTypes.join(', ')}.`,
    `Frases: ${policy.sentenceWordRange[0]}–${policy.sentenceWordRange[1]} palavras.`,
    `Produção: ${policy.productionSentences.min}–${policy.productionSentences.max} frases.`,
    `Rubrica aplicada: ${policy.rubricApplied ? 'sim' : 'não'}.`,
    `Nota mínima da rubrica: ${policy.rubricPassingScore}.`,
    `Critérios da rubrica: ${WRITING_RUBRIC_CRITERIA.map((criterion) => `${criterion.label} ${criterion.weight}%`).join(', ')}.`,
    `Idioma: ${policy.instructionLanguage}.`,
    `Auto-save: a cada ${policy.autoSaveSeconds}s.`,
    `Detectar colagem: ${policy.detectPaste ? 'sim' : 'não'}.`,
    `Contador de palavras: ${policy.showWordCount ? 'sim' : 'não'}.`,
    `Modelo/estrutura visível: ${policy.showStructureHint ? 'sim' : 'não'}.`,
    `Questões: ${policy.questionCount.min}–${policy.questionCount.max}.`,
    `Tom da interface: ${policy.uiTone}.`,
    `Duração estimada: ${policy.sessionMinutes.min}–${policy.sessionMinutes.max} minutos.`,
  ].join('\n');
}
