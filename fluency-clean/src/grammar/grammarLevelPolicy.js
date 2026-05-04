export const GRAMMAR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

export const GRAMMAR_FOCUS_AREAS = Object.freeze({
  PRESENT_SIMPLE: 'present_simple',
  PRESENT_CONTINUOUS: 'present_continuous',
  PRESENT_PERFECT: 'present_perfect',
  PAST_SIMPLE: 'past_simple',
  PAST_CONTINUOUS: 'past_continuous',
  PAST_PERFECT: 'past_perfect',
  FUTURE_WILL: 'future_will',
  FUTURE_GOING_TO: 'future_going_to',
  CONDITIONALS_ZERO: 'conditionals_zero',
  CONDITIONALS_FIRST: 'conditionals_first',
  CONDITIONALS_SECOND: 'conditionals_second',
  CONDITIONALS_THIRD: 'conditionals_third',
  ARTICLES: 'articles',
  PREPOSITIONS_TIME: 'prepositions_time',
  PREPOSITIONS_PLACE: 'prepositions_place',
  COMPARATIVES: 'comparatives',
  SUPERLATIVES: 'superlatives',
  MODALS_CAN_COULD: 'modals_can_could',
  MODALS_MUST_HAVE_TO: 'modals_must_have_to',
  MODALS_SHOULD: 'modals_should',
  PASSIVE_VOICE: 'passive_voice',
  RELATIVE_CLAUSES: 'relative_clauses',
  REPORTED_SPEECH: 'reported_speech',
  PHRASAL_VERBS: 'phrasal_verbs',
  GERUNDS_INFINITIVES: 'gerunds_infinitives',
});

export const GRAMMAR_LEVEL_POLICY_VERSION = 'grammar-level-policy-v1';

export const GRAMMAR_LEVEL_POLICIES = Object.freeze({
  A1: Object.freeze({
    level: 'A1',
    label: 'A1 · Estruturas básicas',
    studentGoal: 'Reconhecer e usar estruturas mais simples do inglês: ser/estar, ter, presente, perguntas básicas, números e cores.',
    questionLanguage: 'pt-BR-mostly',
    supportLanguage: 'Português forte; inglês só nas frases-exemplo curtas.',
    instructionTone: 'guiado, com cada passo explicado em português',
    focusAreas: [
      GRAMMAR_FOCUS_AREAS.PRESENT_SIMPLE,
      GRAMMAR_FOCUS_AREAS.ARTICLES,
      GRAMMAR_FOCUS_AREAS.PREPOSITIONS_TIME,
      GRAMMAR_FOCUS_AREAS.PREPOSITIONS_PLACE,
    ],
    sentenceLengthRange: [3, 8],
    exerciseCount: { min: 14, ideal: 18, max: 22 },
    typicalErrors: [
      'third_person_s_missing',
      'have_has_confusion',
      'is_are_confusion',
      'a_an_basic',
    ],
    productionInstruction: 'Escreva 1 a 3 frases curtas em inglês usando a estrutura aprendida.',
    productionMinSentences: 1,
    productionMaxSentences: 3,
  }),

  A2: Object.freeze({
    level: 'A2',
    label: 'A2 · Estruturas funcionais',
    studentGoal: 'Combinar tempos básicos, falar do passado, fazer comparações simples e expressar planos.',
    questionLanguage: 'mixed-pt-en',
    supportLanguage: 'Português ainda presente; algumas instruções já em inglês simples.',
    instructionTone: 'guiado, com transições para inglês',
    focusAreas: [
      GRAMMAR_FOCUS_AREAS.PRESENT_CONTINUOUS,
      GRAMMAR_FOCUS_AREAS.PAST_SIMPLE,
      GRAMMAR_FOCUS_AREAS.FUTURE_GOING_TO,
      GRAMMAR_FOCUS_AREAS.COMPARATIVES,
      GRAMMAR_FOCUS_AREAS.MODALS_CAN_COULD,
    ],
    sentenceLengthRange: [4, 12],
    exerciseCount: { min: 16, ideal: 20, max: 24 },
    typicalErrors: [
      'past_simple_irregular',
      'going_to_vs_will',
      'can_could_use',
      'comparative_more_double',
    ],
    productionInstruction: 'Escreva 3 a 5 frases conectando ideias usando a estrutura.',
    productionMinSentences: 3,
    productionMaxSentences: 5,
  }),

  B1: Object.freeze({
    level: 'B1',
    label: 'B1 · Estruturas independentes',
    studentGoal: 'Usar tempos perfeitos, condicionais, modais variados e expressar opiniões com nuance.',
    questionLanguage: 'en-simple-with-pt-support',
    supportLanguage: 'Inglês simples; português como apoio em correções e nuances.',
    instructionTone: 'mais autônomo, com exemplos em inglês',
    focusAreas: [
      GRAMMAR_FOCUS_AREAS.PRESENT_PERFECT,
      GRAMMAR_FOCUS_AREAS.CONDITIONALS_FIRST,
      GRAMMAR_FOCUS_AREAS.MODALS_SHOULD,
      GRAMMAR_FOCUS_AREAS.MODALS_MUST_HAVE_TO,
      GRAMMAR_FOCUS_AREAS.PHRASAL_VERBS,
      GRAMMAR_FOCUS_AREAS.GERUNDS_INFINITIVES,
    ],
    sentenceLengthRange: [6, 16],
    exerciseCount: { min: 18, ideal: 22, max: 26 },
    typicalErrors: [
      'present_perfect_for_since',
      'first_conditional_will',
      'must_vs_have_to_meaning',
      'gerund_infinitive_after_verbs',
    ],
    productionInstruction: 'Write 4 to 6 connected sentences using the structure with at least one example and one reason.',
    productionMinSentences: 4,
    productionMaxSentences: 6,
  }),

  B2: Object.freeze({
    level: 'B2',
    label: 'B2 · Estruturas analíticas',
    studentGoal: 'Dominar tempos passados perfeitos, segundo e terceiro condicionais, voz passiva e sentenças complexas.',
    questionLanguage: 'en',
    supportLanguage: 'Inglês como idioma principal.',
    instructionTone: 'analítico, autônomo, com inglês na maior parte',
    focusAreas: [
      GRAMMAR_FOCUS_AREAS.PAST_PERFECT,
      GRAMMAR_FOCUS_AREAS.CONDITIONALS_SECOND,
      GRAMMAR_FOCUS_AREAS.CONDITIONALS_THIRD,
      GRAMMAR_FOCUS_AREAS.PASSIVE_VOICE,
      GRAMMAR_FOCUS_AREAS.RELATIVE_CLAUSES,
      GRAMMAR_FOCUS_AREAS.REPORTED_SPEECH,
    ],
    sentenceLengthRange: [8, 22],
    exerciseCount: { min: 20, ideal: 24, max: 28 },
    typicalErrors: [
      'second_third_conditional_mix',
      'passive_voice_object_subject',
      'reported_speech_tense_shift',
      'relative_who_which_that',
    ],
    productionInstruction: 'Write a connected paragraph (5-8 sentences) using the structure with cause-effect or contrast.',
    productionMinSentences: 5,
    productionMaxSentences: 8,
  }),

  C1: Object.freeze({
    level: 'C1',
    label: 'C1 · Nuance e domínio',
    studentGoal: 'Manipular estruturas com nuance, reconhecer registros, escolher tempo verbal por intenção e usar inversões.',
    questionLanguage: 'en-advanced',
    supportLanguage: 'Inglês quase total. Português apenas em diagnóstico raro.',
    instructionTone: 'avançado, autônomo, com nuance',
    focusAreas: [
      GRAMMAR_FOCUS_AREAS.CONDITIONALS_THIRD,
      GRAMMAR_FOCUS_AREAS.PASSIVE_VOICE,
      GRAMMAR_FOCUS_AREAS.REPORTED_SPEECH,
      GRAMMAR_FOCUS_AREAS.RELATIVE_CLAUSES,
    ],
    sentenceLengthRange: [10, 30],
    exerciseCount: { min: 22, ideal: 26, max: 30 },
    typicalErrors: [
      'mixed_conditional_logic',
      'subjunctive_in_that_clauses',
      'inversion_for_emphasis',
      'reduced_relative_clause',
    ],
    productionInstruction: 'Write a precise paragraph (6-10 sentences) demonstrating control of the structure with nuance and varied registers.',
    productionMinSentences: 6,
    productionMaxSentences: 10,
  }),
});

export function normalizeGrammarLevel(level = 'A1') {
  const value = String(level || 'A1').trim().toUpperCase();
  if (GRAMMAR_LEVEL_POLICIES[value]) return value;
  if (value.startsWith('C')) return 'C1';
  if (value.startsWith('B2')) return 'B2';
  if (value.startsWith('B')) return 'B1';
  if (value.startsWith('A2')) return 'A2';
  return 'A1';
}

export function getGrammarLevelPolicy(level = 'A1') {
  return GRAMMAR_LEVEL_POLICIES[normalizeGrammarLevel(level)];
}

export function getGrammarPolicySummary(level = 'A1') {
  const policy = getGrammarLevelPolicy(level);
  return {
    version: GRAMMAR_LEVEL_POLICY_VERSION,
    level: policy.level,
    label: policy.label,
    sentenceLengthRange: policy.sentenceLengthRange,
    exerciseCount: policy.exerciseCount,
    questionLanguage: policy.questionLanguage,
    focusAreas: policy.focusAreas,
    typicalErrors: policy.typicalErrors,
  };
}

export function buildGrammarPolicyPrompt(level = 'A1') {
  const policy = getGrammarLevelPolicy(level);
  return [
    `POLÍTICA GRAMMAR ${GRAMMAR_LEVEL_POLICY_VERSION}`,
    `Nível: ${policy.label}`,
    `Objetivo do aluno: ${policy.studentGoal}`,
    `Áreas permitidas: ${policy.focusAreas.join(', ')}.`,
    `Tamanho de frases: ${policy.sentenceLengthRange[0]} a ${policy.sentenceLengthRange[1]} palavras.`,
    `Idioma das instruções: ${policy.questionLanguage}.`,
    `Suporte linguístico: ${policy.supportLanguage}.`,
    `Erros típicos a abordar: ${policy.typicalErrors.join(', ')}.`,
    `Tom da aula: ${policy.instructionTone}.`,
    `Produção final: ${policy.productionInstruction}`,
    `Quantidade de exercícios: mín ${policy.exerciseCount.min}, ideal ${policy.exerciseCount.ideal}, máx ${policy.exerciseCount.max}.`,
  ].join('\n');
}
