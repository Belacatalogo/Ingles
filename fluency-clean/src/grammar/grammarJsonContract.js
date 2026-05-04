import { buildGrammarPolicyPrompt, getGrammarLevelPolicy, GRAMMAR_FOCUS_AREAS } from './grammarLevelPolicy.js';

export const GRAMMAR_JSON_CONTRACT_VERSION = 'grammar-contract-v1';

export const GRAMMAR_RULE_BLOCK_CONTRACT = {
  whenToUse: 'string em pt explicando quando usar a estrutura',
  affirmative: { form: 'I + verb', example: 'I work every day.', translation: 'Eu trabalho todos os dias.' },
  negative: { form: "I + don't + verb", example: "I don't work on weekends.", translation: 'Eu não trabalho nos fins de semana.' },
  question: { form: 'Do + I + verb?', example: 'Do you work here?', translation: 'Você trabalha aqui?' },
  notes: ['observação curta'],
};

export const GRAMMAR_EXAMPLE_PAIR_CONTRACT = {
  english: 'frase em inglês usando a estrutura',
  portuguese: 'tradução em português',
  highlight: 'parte da frase que mostra a regra, ex: works ou does not work',
};

export const GRAMMAR_EXERCISE_CONTRACT = {
  type: 'multiple_choice | fill_blank | correction | word_bank | transform | write_short',
  prompt: 'enunciado em pt-BR ou inglês simples conforme nível',
  englishSentence: 'frase em inglês quando aplicável',
  answer: 'resposta correta',
  options: ['array com 3 ou 4 alternativas curtas para multiple_choice'],
  hint: 'pista curta opcional',
  grammarTag: 'tag pedagógica, ex: present_simple_3rd_s',
  difficulty: 'easy | medium | hard',
};

export const GRAMMAR_TYPICAL_ERROR_CONTRACT = {
  errorTag: 'tag do erro, ex: third_person_s_missing',
  wrongExample: 'frase errada típica de brasileiro',
  correction: 'frase correta',
  why: 'explicação curta em pt-BR',
};

export const GRAMMAR_JSON_CONTRACT = {
  type: 'grammar',
  level: 'A1 | A2 | B1 | B2 | C1',
  title: 'string curta com a estrutura, ex: Present Simple',
  intro: 'string curta para o aluno em pt-BR',
  objective: 'string com objetivo gramatical real',
  focusArea: Object.values(GRAMMAR_FOCUS_AREAS).join(' | '),
  ruleBlock: GRAMMAR_RULE_BLOCK_CONTRACT,
  examplePairs: [GRAMMAR_EXAMPLE_PAIR_CONTRACT],
  typicalErrors: [GRAMMAR_TYPICAL_ERROR_CONTRACT],
  exercises: [GRAMMAR_EXERCISE_CONTRACT],
  productionPrompt: {
    instruction: 'string com produção controlada usando a estrutura',
    minSentences: 'number',
    maxSentences: 'number',
  },
  reviewChecklist: ['string com checklist de revisão pessoal'],
};

function clean(value) {
  return String(value ?? '').trim();
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeFormBlock(raw = {}) {
  return {
    form: clean(raw?.form || raw?.structure || ''),
    example: clean(raw?.example || raw?.englishExample || ''),
    translation: clean(raw?.translation || raw?.portuguese || ''),
  };
}

function normalizeRuleBlock(raw = {}) {
  return {
    whenToUse: clean(raw?.whenToUse || raw?.when_to_use || ''),
    affirmative: normalizeFormBlock(raw?.affirmative),
    negative: normalizeFormBlock(raw?.negative),
    question: normalizeFormBlock(raw?.question),
    notes: ensureArray(raw?.notes).map(clean).filter(Boolean),
  };
}

function normalizeExamplePair(raw = {}) {
  return {
    english: clean(raw?.english || raw?.en || raw?.sentence || ''),
    portuguese: clean(raw?.portuguese || raw?.pt || raw?.translation || ''),
    highlight: clean(raw?.highlight || raw?.target || ''),
  };
}

function normalizeTypicalError(raw = {}) {
  return {
    errorTag: clean(raw?.errorTag || raw?.tag || ''),
    wrongExample: clean(raw?.wrongExample || raw?.wrong || raw?.incorrect || ''),
    correction: clean(raw?.correction || raw?.correct || raw?.right || ''),
    why: clean(raw?.why || raw?.explanation || ''),
  };
}

function normalizeExercise(raw = {}, index = 0) {
  return {
    type: clean(raw?.type || 'multiple_choice'),
    prompt: clean(raw?.prompt || raw?.question || ''),
    englishSentence: clean(raw?.englishSentence || raw?.sentence || ''),
    answer: clean(raw?.answer || raw?.correctAnswer || ''),
    options: ensureArray(raw?.options).map(clean).filter(Boolean).slice(0, 4),
    hint: clean(raw?.hint || ''),
    grammarTag: clean(raw?.grammarTag || raw?.tag || ''),
    difficulty: clean(raw?.difficulty || 'easy'),
    index,
  };
}

function normalizeProductionPrompt(raw = {}, policy) {
  return {
    instruction: clean(raw?.instruction || raw?.prompt || policy.productionInstruction),
    minSentences: Number(raw?.minSentences || policy.productionMinSentences),
    maxSentences: Number(raw?.maxSentences || policy.productionMaxSentences),
  };
}

function buildNormalizedGrammarLesson(rawLesson = {}) {
  const policy = getGrammarLevelPolicy(rawLesson?.level || 'A1');
  return {
    contractVersion: GRAMMAR_JSON_CONTRACT_VERSION,
    type: 'grammar',
    level: policy.level,
    title: clean(rawLesson?.title || 'Grammar'),
    intro: clean(rawLesson?.intro || rawLesson?.subtitle || ''),
    objective: clean(rawLesson?.objective || rawLesson?.goal || ''),
    focusArea: clean(rawLesson?.focusArea || rawLesson?.focus || ''),
    ruleBlock: normalizeRuleBlock(rawLesson?.ruleBlock || rawLesson?.rule),
    examplePairs: ensureArray(rawLesson?.examplePairs || rawLesson?.examples).map(normalizeExamplePair).filter((pair) => pair.english),
    typicalErrors: ensureArray(rawLesson?.typicalErrors || rawLesson?.errors).map(normalizeTypicalError).filter((error) => error.wrongExample && error.correction),
    exercises: ensureArray(rawLesson?.exercises || rawLesson?.practice).map(normalizeExercise).filter((exercise) => exercise.prompt && exercise.answer),
    productionPrompt: normalizeProductionPrompt(rawLesson?.productionPrompt || rawLesson?.production || rawLesson?.writingPrompt, policy),
    reviewChecklist: ensureArray(rawLesson?.reviewChecklist || rawLesson?.checklist).map(clean).filter(Boolean),
  };
}

export function normalizeGrammarLessonContract(rawLesson = {}) {
  // applyGrammarQualityGate entra no BLOCO-C3.
  return buildNormalizedGrammarLesson(rawLesson);
}

export function getGrammarRequiredKeys() {
  return ['type', 'level', 'title', 'ruleBlock', 'examplePairs', 'exercises'];
}

export function assertGrammarContract(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Contrato Grammar: bloco não retornou objeto.');
  for (const key of getGrammarRequiredKeys()) {
    if (!(key in data)) throw new Error(`Contrato Grammar: faltou a chave obrigatória ${key}.`);
  }
  if (data.type !== 'grammar') throw new Error('Contrato Grammar: type deve ser grammar.');
  if (!ensureArray(data.exercises).length) throw new Error('Contrato Grammar: exercises vazio.');
  return true;
}

export function buildGrammarJsonContractInstruction({ level = 'A1' } = {}) {
  const policyInstruction = buildGrammarPolicyPrompt(level);

  return [
    `CONTRATO JSON GRAMMAR ${GRAMMAR_JSON_CONTRACT_VERSION}`,
    'Retorne APENAS JSON válido. Não use markdown. Não use texto antes ou depois do JSON.',
    'Use aspas duplas em todas as chaves e strings.',
    'Não use comentários dentro do JSON.',
    'Não use trailing comma.',
    'Não use HTML.',
    'Este contrato é interno. Não explique o contrato ao aluno.',
    '',
    policyInstruction,
    '',
    'Formato obrigatório:',
    JSON.stringify(GRAMMAR_JSON_CONTRACT, null, 2),
    '',
    'Regras específicas de Grammar:',
    '- ruleBlock deve ter affirmative, negative e question.',
    '- examplePairs deve ter inglês + português + highlight.',
    '- typicalErrors deve focar em erros comuns de brasileiros aprendendo inglês.',
    '- exercises deve usar grammarTag em cada exercício.',
    '- Não revele a resposta dentro do prompt.',
    '- Não gere alternativas duplicadas.',
    '- Grammar não vira jogo: tom é sério, claro e guiado.',
  ].join('\n');
}
