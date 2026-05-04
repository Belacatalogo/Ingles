import { buildSpeakingPolicyPrompt, getSpeakingLevelPolicy } from './speakingLevelPolicy.js';

export const SPEAKING_JSON_CONTRACT_VERSION = 'speaking-contract-v1';

export const SPEAKING_MODEL_UTTERANCE_CONTRACT = {
  english: 'frase modelo em inglês',
  portuguese: 'tradução em português',
  pronunciationFocus: 'som ou padrão fonético em destaque, ex: "th" ou "linking"',
  speakingSkill: 'repeat_mimic | pronunciation_drill | guided_conversation',
};

export const SPEAKING_DIALOGUE_TURN_CONTRACT = {
  role: 'teacher | student',
  text: 'fala em inglês',
  cue: 'instrução curta ao aluno, ex: "Responda dizendo onde você mora."',
};

export const SPEAKING_JSON_CONTRACT = {
  type: 'speaking',
  level: 'A1 | A2 | B1 | B2 | C1',
  title: 'string curta',
  intro: 'string curta para o aluno',
  objective: 'string com objetivo de fala',
  topicContext: 'string com contexto do tema da conversa',
  vocabulary: [{ word: 'string', meaning: 'string', example: 'string' }],
  modelUtterances: [SPEAKING_MODEL_UTTERANCE_CONTRACT],
  guidedDialogue: [SPEAKING_DIALOGUE_TURN_CONTRACT],
  pronunciationItems: [
    { word: 'string', phonetic: '/fəˈnɛtɪk/', difficulty: 'easy | medium | hard' },
  ],
  speakingPrompts: [
    {
      prompt: 'pergunta ou situação para o aluno responder',
      expectedLength: 'short | medium | extended',
      speakingSkill: 'string',
      scaffoldingHint: 'dica opcional de scaffolding',
    },
  ],
  productionTask: {
    instruction: 'string com tarefa de produção final',
    minWords: 'number',
    maxWords: 'number',
    speakingSkill: 'string',
  },
};

function clean(v) {
  return String(v ?? '').trim();
}

function ensureArray(v) {
  return Array.isArray(v) ? v : [];
}

function normalizeVocabularyItem(raw) {
  return {
    word: clean(raw?.word || raw?.term || ''),
    meaning: clean(raw?.meaning || raw?.translation || raw?.definition || ''),
    example: clean(raw?.example || raw?.sentence || ''),
  };
}

function normalizeModelUtterance(raw) {
  return {
    english: clean(raw?.english || raw?.en || raw?.sentence || ''),
    portuguese: clean(raw?.portuguese || raw?.pt || raw?.translation || ''),
    pronunciationFocus: clean(raw?.pronunciationFocus || raw?.pronunciation_focus || raw?.focus || ''),
    speakingSkill: clean(raw?.speakingSkill || raw?.speaking_skill || 'repeat_mimic'),
  };
}

function normalizeDialogueTurn(raw) {
  const role = clean(raw?.role || 'teacher').toLowerCase();
  return {
    role: role === 'student' ? 'student' : 'teacher',
    text: clean(raw?.text || raw?.line || ''),
    cue: clean(raw?.cue || raw?.instruction || ''),
  };
}

function normalizePronunciationItem(raw) {
  return {
    word: clean(raw?.word || raw?.term || ''),
    phonetic: clean(raw?.phonetic || raw?.ipa || ''),
    difficulty: clean(raw?.difficulty || 'easy'),
  };
}

function normalizeSpeakingPrompt(raw) {
  return {
    prompt: clean(raw?.prompt || raw?.question || ''),
    expectedLength: clean(raw?.expectedLength || raw?.expected_length || 'short'),
    speakingSkill: clean(raw?.speakingSkill || raw?.speaking_skill || 'short_answer'),
    scaffoldingHint: clean(raw?.scaffoldingHint || raw?.scaffolding_hint || raw?.hint || ''),
  };
}

function normalizeProductionTask(raw, policy) {
  return {
    instruction: clean(raw?.instruction || raw?.prompt || policy.productionInstruction),
    minWords: Number(raw?.minWords || raw?.min_words || policy.productionMinWords),
    maxWords: Number(raw?.maxWords || raw?.max_words || policy.productionMaxWords),
    speakingSkill: clean(raw?.speakingSkill || raw?.speaking_skill || 'extended_response'),
  };
}

function sanitizeStudentDialogueTurn(turn) {
  if (turn.role !== 'student') return turn;
  return {
    ...turn,
    text: '',
    cue: turn.cue || turn.text || 'Responda com suas próprias palavras.',
  };
}

function buildNormalizedSpeakingLesson(rawLesson = {}) {
  const policy = getSpeakingLevelPolicy(rawLesson?.level || 'A1');
  return {
    ...rawLesson,
    contractVersion: SPEAKING_JSON_CONTRACT_VERSION,
    type: 'speaking',
    level: policy.level,
    title: clean(rawLesson?.title || 'Speaking'),
    intro: clean(rawLesson?.intro || rawLesson?.subtitle || ''),
    objective: clean(rawLesson?.objective || rawLesson?.goal || ''),
    topicContext: clean(rawLesson?.topicContext || rawLesson?.topic_context || rawLesson?.context || rawLesson?.scenario || ''),
    vocabulary: ensureArray(rawLesson?.vocabulary).map(normalizeVocabularyItem).filter((item) => item.word || item.meaning),
    modelUtterances: ensureArray(rawLesson?.modelUtterances || rawLesson?.model_utterances || rawLesson?.models || rawLesson?.examples)
      .map(normalizeModelUtterance)
      .filter((utterance) => utterance.english),
    guidedDialogue: ensureArray(rawLesson?.guidedDialogue || rawLesson?.guided_dialogue || rawLesson?.dialogue)
      .map(normalizeDialogueTurn)
      .filter((turn) => turn.text || turn.cue)
      .map(sanitizeStudentDialogueTurn),
    pronunciationItems: ensureArray(rawLesson?.pronunciationItems || rawLesson?.pronunciation_items || rawLesson?.pronunciation)
      .map(normalizePronunciationItem)
      .filter((item) => item.word),
    speakingPrompts: ensureArray(rawLesson?.speakingPrompts || rawLesson?.speaking_prompts || rawLesson?.prompts)
      .map(normalizeSpeakingPrompt)
      .filter((prompt) => prompt.prompt),
    productionTask: normalizeProductionTask(rawLesson?.productionTask || rawLesson?.production_task || rawLesson?.production || {}, policy),
  };
}

export function normalizeSpeakingLessonContract(rawLesson = {}) {
  // applySpeakingQualityGate entra no BLOCO-F3.
  return buildNormalizedSpeakingLesson(rawLesson);
}

export function getSpeakingRequiredKeys() {
  return ['type', 'level', 'title', 'modelUtterances', 'speakingPrompts'];
}

export function assertSpeakingContract(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Contrato Speaking: não é objeto.');
  for (const key of getSpeakingRequiredKeys()) {
    if (!(key in data)) throw new Error(`Contrato Speaking: faltou ${key}.`);
  }
  if (data.type !== 'speaking') throw new Error('Contrato Speaking: type deve ser speaking.');
  return true;
}

export function buildSpeakingJsonContractInstruction({ level = 'A1' } = {}) {
  return [
    `CONTRATO JSON SPEAKING ${SPEAKING_JSON_CONTRACT_VERSION}`,
    'Retorne APENAS JSON válido. Não use markdown. Não use texto antes ou depois do JSON.',
    'Use aspas duplas em todas as chaves e strings.',
    'Não use comentários dentro do JSON.',
    'Não use trailing comma.',
    'Não use HTML.',
    '',
    buildSpeakingPolicyPrompt(level),
    '',
    'Formato obrigatório:',
    JSON.stringify(SPEAKING_JSON_CONTRACT, null, 2),
    '',
    'Regras específicas de Speaking:',
    '- modelUtterances: frases modelo que o aluno deve ouvir antes de tentar falar.',
    '- guidedDialogue: diálogo onde student tem cue de resposta — nunca escreva a resposta do aluno em text.',
    '- pronunciationItems: palavras com som difícil para falantes de PT-BR, como th, v/b, final -ed e linking.',
    '- speakingPrompts: situações reais onde o aluno é estimulado a falar livremente.',
    '- Não revelar resposta do aluno nos prompts.',
    '- Não criar diálogo longo demais — máximo 6 turnos em A1/A2.',
  ].join('\n');
}
