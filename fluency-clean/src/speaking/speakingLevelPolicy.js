export const SPEAKING_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

export const SPEAKING_SKILLS = Object.freeze({
  REPEAT_MIMIC: 'repeat_mimic',
  SHORT_ANSWER: 'short_answer',
  GUIDED_CONVERSATION: 'guided_conversation',
  PRONUNCIATION_DRILL: 'pronunciation_drill',
  ROLE_PLAY: 'role_play',
  EXTENDED_RESPONSE: 'extended_response',
  SPONTANEOUS: 'spontaneous',
});

export const SPEAKING_LEVEL_POLICY_VERSION = 'speaking-level-policy-v1';

export const SPEAKING_LEVEL_POLICIES = Object.freeze({
  A1: Object.freeze({
    level: 'A1',
    label: 'A1 · Repetição e reconhecimento',
    studentGoal: 'Repetir frases curtas com boa pronúncia, responder com 1–3 palavras.',
    utteranceLengthRange: [1, 5],
    azureMinPassScore: 50,
    azureSkipOnFail: true,
    repetitionsAllowed: 4,
    allowedSkills: [
      SPEAKING_SKILLS.REPEAT_MIMIC,
      SPEAKING_SKILLS.SHORT_ANSWER,
      SPEAKING_SKILLS.PRONUNCIATION_DRILL,
    ],
    productionInstruction: 'Repita a frase ou responda com 1–3 palavras.',
    productionMinWords: 1,
    productionMaxWords: 5,
  }),

  A2: Object.freeze({
    level: 'A2',
    label: 'A2 · Fala funcional',
    studentGoal: 'Responder com frases curtas completas em situações do dia a dia.',
    utteranceLengthRange: [3, 10],
    azureMinPassScore: 55,
    azureSkipOnFail: false,
    repetitionsAllowed: 3,
    allowedSkills: [
      SPEAKING_SKILLS.REPEAT_MIMIC,
      SPEAKING_SKILLS.SHORT_ANSWER,
      SPEAKING_SKILLS.GUIDED_CONVERSATION,
      SPEAKING_SKILLS.PRONUNCIATION_DRILL,
    ],
    productionInstruction: 'Responda com 1–2 frases completas.',
    productionMinWords: 3,
    productionMaxWords: 15,
  }),

  B1: Object.freeze({
    level: 'B1',
    label: 'B1 · Fala independente',
    studentGoal: 'Participar de conversas simples com fluência básica e coerência.',
    utteranceLengthRange: [5, 20],
    azureMinPassScore: 60,
    azureSkipOnFail: false,
    repetitionsAllowed: 2,
    allowedSkills: [
      SPEAKING_SKILLS.GUIDED_CONVERSATION,
      SPEAKING_SKILLS.ROLE_PLAY,
      SPEAKING_SKILLS.PRONUNCIATION_DRILL,
      SPEAKING_SKILLS.SHORT_ANSWER,
      SPEAKING_SKILLS.EXTENDED_RESPONSE,
    ],
    productionInstruction: 'Responda com 2–4 frases.',
    productionMinWords: 10,
    productionMaxWords: 40,
  }),

  B2: Object.freeze({
    level: 'B2',
    label: 'B2 · Fala fluente',
    studentGoal: 'Discutir temas com argumentos, dar opiniões e reagir a perguntas inesperadas.',
    utteranceLengthRange: [10, 35],
    azureMinPassScore: 70,
    azureSkipOnFail: false,
    repetitionsAllowed: 2,
    allowedSkills: [
      SPEAKING_SKILLS.GUIDED_CONVERSATION,
      SPEAKING_SKILLS.ROLE_PLAY,
      SPEAKING_SKILLS.EXTENDED_RESPONSE,
      SPEAKING_SKILLS.SPONTANEOUS,
    ],
    productionInstruction: 'Responda com 3–6 frases com argumento.',
    productionMinWords: 25,
    productionMaxWords: 80,
  }),

  C1: Object.freeze({
    level: 'C1',
    label: 'C1 · Fala avançada',
    studentGoal: 'Falar com nuance, registros variados, argumentação sofisticada.',
    utteranceLengthRange: [15, 60],
    azureMinPassScore: 75,
    azureSkipOnFail: false,
    repetitionsAllowed: 1,
    allowedSkills: Object.values(SPEAKING_SKILLS),
    productionInstruction: 'Desenvolva sua resposta em 5–10 frases com coerência e vocabulário avançado.',
    productionMinWords: 50,
    productionMaxWords: 150,
  }),
});

export function normalizeSpeakingLevel(level = 'A1') {
  const v = String(level || 'A1').trim().toUpperCase();
  if (SPEAKING_LEVEL_POLICIES[v]) return v;
  if (v.startsWith('C')) return 'C1';
  if (v.startsWith('B2')) return 'B2';
  if (v.startsWith('B')) return 'B1';
  if (v.startsWith('A2')) return 'A2';
  return 'A1';
}

export function getSpeakingLevelPolicy(level = 'A1') {
  return SPEAKING_LEVEL_POLICIES[normalizeSpeakingLevel(level)];
}

export function getSpeakingPolicySummary(level = 'A1') {
  const policy = getSpeakingLevelPolicy(level);
  return {
    version: SPEAKING_LEVEL_POLICY_VERSION,
    level: policy.level,
    label: policy.label,
    utteranceLengthRange: policy.utteranceLengthRange,
    azureMinPassScore: policy.azureMinPassScore,
    azureSkipOnFail: policy.azureSkipOnFail,
    repetitionsAllowed: policy.repetitionsAllowed,
    allowedSkills: policy.allowedSkills,
    productionMinWords: policy.productionMinWords,
    productionMaxWords: policy.productionMaxWords,
  };
}

export function buildSpeakingPolicyPrompt(level = 'A1') {
  const p = getSpeakingLevelPolicy(level);
  return [
    `POLÍTICA SPEAKING ${SPEAKING_LEVEL_POLICY_VERSION}`,
    `Nível: ${p.label}`,
    `Objetivo: ${p.studentGoal}`,
    `Tamanho da resposta: ${p.utteranceLengthRange[0]}–${p.utteranceLengthRange[1]} palavras.`,
    `Score Azure mínimo: ${p.azureMinPassScore}.`,
    `Azure bloqueia avanço em falha: ${p.azureSkipOnFail ? 'não, apenas orienta' : 'sim, quando aplicável'}.`,
    `Repetições permitidas: ${p.repetitionsAllowed}.`,
    `Habilidades: ${p.allowedSkills.join(', ')}.`,
    `Produção: ${p.productionInstruction}`,
  ].join('\n');
}
