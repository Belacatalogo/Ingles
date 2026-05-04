export const LISTENING_LEVEL_POLICY_VERSION = 'listening-level-policy-v1';
export const LISTENING_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

export const LISTENING_SKILLS = Object.freeze({
  GIST: 'gist_listening',
  DETAIL: 'detail_listening',
  SPECIFIC_INFO: 'specific_info',
  DICTATION: 'dictation',
  SPEAKER_INTENT: 'speaker_intent',
  INFERENCE: 'inference_listening',
  TONE: 'tone_listening',
  SHADOWING: 'shadowing',
});

export const LISTENING_TEXT_TYPES = Object.freeze({
  A1: ['single_speaker_slow', 'numbers_and_names', 'simple_greeting', 'short_instruction'],
  A2: ['short_dialogue', 'simple_announcement', 'short_description', 'basic_conversation'],
  B1: ['dialogue_daily_life', 'short_interview', 'news_headline', 'phone_conversation'],
  B2: ['interview_full', 'radio_segment', 'documentary_excerpt', 'lecture_intro'],
  C1: ['lecture_full', 'debate_excerpt', 'complex_interview', 'literary_reading'],
});

export const LISTENING_LEVEL_POLICIES = Object.freeze({
  A1: Object.freeze({
    level: 'A1',
    label: 'A1 · Escuta inicial guiada',
    studentGoal: 'Identificar palavras familiares, números, nomes e instruções simples em fala lenta e clara.',
    audioDurationRange: [10, 25],
    allowedSpeeds: [0.75, 1.0],
    freeRepetitions: 3,
    warnedRepetitions: 2,
    textTypes: LISTENING_TEXT_TYPES.A1,
    allowedSkills: [LISTENING_SKILLS.GIST, LISTENING_SKILLS.DETAIL, LISTENING_SKILLS.DICTATION, LISTENING_SKILLS.SHADOWING],
    dictationMaxWords: 3,
    instructionLanguage: 'pt-BR',
    instructionLanguageLabel: 'Todas as instruções em português. Inglês apenas no áudio.',
    transcriptReveal: 'after_all_exercises',
    shadowingEnabled: true,
    shadowingMaxWords: 5,
    questionCount: { min: 6, ideal: 8, max: 10 },
    uiTone: 'muito guiado, com botão de repetição visível e instrução clara',
    sessionMinutes: { min: 5, max: 8 },
    iphoneCacheRequired: true,
  }),

  A2: Object.freeze({
    level: 'A2',
    label: 'A2 · Escuta funcional',
    studentGoal: 'Entender o tema geral de diálogos simples e capturar informações específicas em contextos cotidianos.',
    audioDurationRange: [20, 45],
    allowedSpeeds: [0.75, 1.0],
    freeRepetitions: 3,
    warnedRepetitions: 2,
    textTypes: LISTENING_TEXT_TYPES.A2,
    allowedSkills: [LISTENING_SKILLS.GIST, LISTENING_SKILLS.DETAIL, LISTENING_SKILLS.SPECIFIC_INFO, LISTENING_SKILLS.DICTATION, LISTENING_SKILLS.SHADOWING],
    dictationMaxWords: 5,
    instructionLanguage: 'mixed-pt-en',
    instructionLanguageLabel: 'Instruções principalmente em português; inglês simples nas opções.',
    transcriptReveal: 'after_all_exercises',
    shadowingEnabled: true,
    shadowingMaxWords: 8,
    questionCount: { min: 8, ideal: 10, max: 12 },
    uiTone: 'guiado, com apoio em português e transição para inglês simples',
    sessionMinutes: { min: 7, max: 10 },
    iphoneCacheRequired: true,
  }),

  B1: Object.freeze({
    level: 'B1',
    label: 'B1 · Escuta independente',
    studentGoal: 'Entender os pontos principais de conversas e reportagens sobre temas familiares; capturar detalhes em contexto.',
    audioDurationRange: [40, 90],
    allowedSpeeds: [0.75, 1.0, 1.25],
    freeRepetitions: 2,
    warnedRepetitions: 2,
    textTypes: LISTENING_TEXT_TYPES.B1,
    allowedSkills: [LISTENING_SKILLS.GIST, LISTENING_SKILLS.DETAIL, LISTENING_SKILLS.SPECIFIC_INFO, LISTENING_SKILLS.SPEAKER_INTENT, LISTENING_SKILLS.DICTATION, LISTENING_SKILLS.SHADOWING],
    dictationMaxWords: 8,
    instructionLanguage: 'en-simple-pt-support',
    instructionLanguageLabel: 'Instruções em inglês simples; português como apoio no feedback.',
    transcriptReveal: 'after_shadowing',
    shadowingEnabled: true,
    shadowingMaxWords: 12,
    questionCount: { min: 10, ideal: 12, max: 14 },
    uiTone: 'mais autônomo, instrução em inglês simples',
    sessionMinutes: { min: 9, max: 13 },
    iphoneCacheRequired: true,
  }),

  B2: Object.freeze({
    level: 'B2',
    label: 'B2 · Escuta analítica',
    studentGoal: 'Compreender discursos extensos e complexos, inferir atitude do falante e capturar nuances em contextos variados.',
    audioDurationRange: [60, 150],
    allowedSpeeds: [1.0, 1.25],
    freeRepetitions: 2,
    warnedRepetitions: 1,
    textTypes: LISTENING_TEXT_TYPES.B2,
    allowedSkills: [LISTENING_SKILLS.GIST, LISTENING_SKILLS.DETAIL, LISTENING_SKILLS.SPECIFIC_INFO, LISTENING_SKILLS.SPEAKER_INTENT, LISTENING_SKILLS.INFERENCE, LISTENING_SKILLS.TONE, LISTENING_SKILLS.SHADOWING],
    dictationMaxWords: 10,
    instructionLanguage: 'en',
    instructionLanguageLabel: 'Instruções em inglês; feedback pode ser bilíngue.',
    transcriptReveal: 'after_all_exercises',
    shadowingEnabled: true,
    shadowingMaxWords: 18,
    questionCount: { min: 12, ideal: 14, max: 16 },
    uiTone: 'analítico, instrução em inglês, foco em inferência',
    sessionMinutes: { min: 11, max: 15 },
    iphoneCacheRequired: true,
  }),

  C1: Object.freeze({
    level: 'C1',
    label: 'C1 · Escuta avançada e nuance',
    studentGoal: 'Compreender discursos densos, abstratos e implícitos; reconhecer tom, viés e intenção do falante.',
    audioDurationRange: [90, 240],
    allowedSpeeds: [1.0, 1.25],
    freeRepetitions: 1,
    warnedRepetitions: 2,
    textTypes: LISTENING_TEXT_TYPES.C1,
    allowedSkills: [LISTENING_SKILLS.GIST, LISTENING_SKILLS.DETAIL, LISTENING_SKILLS.SPEAKER_INTENT, LISTENING_SKILLS.INFERENCE, LISTENING_SKILLS.TONE, LISTENING_SKILLS.SHADOWING],
    dictationMaxWords: 12,
    instructionLanguage: 'en-advanced',
    instructionLanguageLabel: 'Instruções em inglês avançado; sem suporte em português.',
    transcriptReveal: 'on_demand',
    shadowingEnabled: true,
    shadowingMaxWords: 25,
    questionCount: { min: 14, ideal: 16, max: 18 },
    uiTone: 'avançado, autônomo, analítico',
    sessionMinutes: { min: 13, max: 18 },
    iphoneCacheRequired: true,
  }),
});

export function normalizeListeningLevel(level = 'A1') {
  const v = String(level || 'A1').trim().toUpperCase();
  if (LISTENING_LEVEL_POLICIES[v]) return v;
  if (v.startsWith('C')) return 'C1';
  if (v.startsWith('B2')) return 'B2';
  if (v.startsWith('B')) return 'B1';
  if (v.startsWith('A2')) return 'A2';
  return 'A1';
}

export function getListeningLevelPolicy(level = 'A1') {
  return LISTENING_LEVEL_POLICIES[normalizeListeningLevel(level)];
}

export function getListeningPolicySummary(level = 'A1') {
  const policy = getListeningLevelPolicy(level);
  return {
    version: LISTENING_LEVEL_POLICY_VERSION,
    level: policy.level,
    label: policy.label,
    audioDurationRange: policy.audioDurationRange,
    allowedSpeeds: policy.allowedSpeeds,
    freeRepetitions: policy.freeRepetitions,
    warnedRepetitions: policy.warnedRepetitions,
    textTypes: policy.textTypes,
    allowedSkills: policy.allowedSkills,
    dictationMaxWords: policy.dictationMaxWords,
    transcriptReveal: policy.transcriptReveal,
    shadowingEnabled: policy.shadowingEnabled,
    shadowingMaxWords: policy.shadowingMaxWords,
    questionCount: policy.questionCount,
    iphoneCacheRequired: policy.iphoneCacheRequired,
  };
}

export function buildListeningPolicyPrompt(level = 'A1') {
  const policy = getListeningLevelPolicy(level);
  return [
    `POLÍTICA LISTENING ${LISTENING_LEVEL_POLICY_VERSION}`,
    `Nível: ${policy.label}`,
    `Objetivo: ${policy.studentGoal}`,
    `Duração do áudio: ${policy.audioDurationRange[0]}–${policy.audioDurationRange[1]} segundos.`,
    `Velocidades: ${policy.allowedSpeeds.join(', ')}x.`,
    `Repetições livres: ${policy.freeRepetitions}.`,
    `Repetições com aviso: ${policy.warnedRepetitions}.`,
    `Tipos de texto: ${policy.textTypes.join(', ')}.`,
    `Habilidades permitidas: ${policy.allowedSkills.join(', ')}.`,
    `Ditado: máximo ${policy.dictationMaxWords} palavras.`,
    `Idioma das instruções: ${policy.instructionLanguageLabel}`,
    `Transcrição: revelar ${policy.transcriptReveal}.`,
    `Shadowing: ${policy.shadowingEnabled ? 'habilitado' : 'desabilitado'}, frases até ${policy.shadowingMaxWords} palavras.`,
    `Questões: ${policy.questionCount.min}–${policy.questionCount.max}.`,
    `Tom da interface: ${policy.uiTone}.`,
    `Duração estimada da sessão: ${policy.sessionMinutes.min}–${policy.sessionMinutes.max} minutos.`,
    `iPhone/cache: ${policy.iphoneCacheRequired ? 'cache de áudio obrigatório' : 'cache opcional'}.`,
  ].join('\n');
}
