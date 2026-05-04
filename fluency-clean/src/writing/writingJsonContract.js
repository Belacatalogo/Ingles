import { buildWritingPolicyPrompt, getWritingLevelPolicy } from './writingLevelPolicy.js';

export const WRITING_JSON_CONTRACT_VERSION = 'writing-contract-v1';

export const WRITING_JSON_CONTRACT = {
  type: 'writing',
  level: 'A1 | A2 | B1 | B2 | C1',
  title: 'string curta e específica',
  intro: 'string de apresentação',
  objective: 'string com objetivo de escrita',
  writingModel: 'string com texto modelo para o aluno usar como referência',
  usefulPhrases: ['string com frases úteis para o aluno reutilizar'],
  vocabulary: [{ word: 'string EN', meaning: 'string PT', example: 'string EN' }],
  structuredTasks: [
    {
      type: 'word_order | fill_blank | correction | guided_sentence | sentence_expand',
      prompt: 'string com instrução',
      answer: 'string com resposta esperada',
      options: ['alternativas quando múltipla escolha'],
      writingTag: 'string (ex: sentence_structure)',
    },
  ],
  productionPrompt: {
    instruction: 'string com o que o aluno deve escrever',
    minSentences: 'number',
    maxSentences: 'number',
    wordBankHint: ['palavras opcionais para usar'],
  },
  writingChecklist: ['string com item de revisão antes de enviar'],
  tips: ['string de dica de escrita'],
};

function clean(value) {
  return String(value ?? '').trim();
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeVocabularyItem(item) {
  return {
    word: clean(item?.word || item?.term || ''),
    meaning: clean(item?.meaning || item?.translation || item?.definition || ''),
    example: clean(item?.example || item?.sentence || ''),
  };
}

function normalizeStructuredTask(item) {
  const options = ensureArray(item?.options || item?.choices || item?.alternatives)
    .map((option) => clean(typeof option === 'string' ? option : option?.text || option?.label || option?.value || ''))
    .filter(Boolean);

  return {
    type: clean(item?.type || item?.kind || 'guided_sentence'),
    prompt: clean(item?.prompt || item?.question || item?.instruction || ''),
    answer: clean(item?.answer || item?.correct || item?.expected || item?.expectedAnswer || ''),
    options: [...new Set(options)].slice(0, 4),
    writingTag: clean(item?.writingTag || item?.tag || ''),
  };
}

function normalizeProductionPrompt(raw, policy) {
  if (!raw) {
    return {
      instruction: policy.instructionLanguage === 'pt-BR'
        ? 'Escreva frases em inglês usando as estruturas da aula.'
        : 'Write sentences in English using the structures from this lesson.',
      minSentences: policy.productionSentences.min,
      maxSentences: policy.productionSentences.max,
      wordBankHint: [],
    };
  }

  return {
    instruction: clean(raw?.instruction || raw?.prompt || ''),
    minSentences: Number(raw?.minSentences || policy.productionSentences.min),
    maxSentences: Number(raw?.maxSentences || policy.productionSentences.max),
    wordBankHint: ensureArray(raw?.wordBankHint || raw?.word_bank_hint).map(clean).filter(Boolean),
  };
}

function buildNormalizedWritingLesson(rawLesson = {}) {
  const policy = getWritingLevelPolicy(rawLesson?.level || 'A1');
  return {
    ...rawLesson,
    contractVersion: WRITING_JSON_CONTRACT_VERSION,
    type: 'writing',
    level: policy.level,
    title: clean(rawLesson?.title || 'Writing'),
    intro: clean(rawLesson?.intro || rawLesson?.subtitle || ''),
    objective: clean(rawLesson?.objective || rawLesson?.goal || ''),
    writingModel: clean(rawLesson?.writingModel || rawLesson?.writing_model || rawLesson?.model || ''),
    usefulPhrases: ensureArray(rawLesson?.usefulPhrases || rawLesson?.useful_phrases || rawLesson?.phrases).map(clean).filter(Boolean),
    vocabulary: ensureArray(rawLesson?.vocabulary).map(normalizeVocabularyItem).filter((item) => item.word || item.meaning || item.example),
    structuredTasks: ensureArray(rawLesson?.structuredTasks || rawLesson?.structured_tasks || rawLesson?.exercises)
      .map(normalizeStructuredTask)
      .filter((task) => task.prompt && task.answer),
    productionPrompt: normalizeProductionPrompt(
      rawLesson?.productionPrompt || rawLesson?.production_prompt || rawLesson?.production,
      policy,
    ),
    writingChecklist: ensureArray(rawLesson?.writingChecklist || rawLesson?.writing_checklist || rawLesson?.checklist).map(clean).filter(Boolean),
    tips: ensureArray(rawLesson?.tips).map(clean).filter(Boolean),
  };
}

export function normalizeWritingLessonContract(rawLesson = {}) {
  return buildNormalizedWritingLesson(rawLesson);
}

export function assertWritingContract(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Contrato Writing: não retornou objeto.');
  if (!ensureArray(data.structuredTasks).length) throw new Error('Contrato Writing: structuredTasks vazio.');
  if (!data.productionPrompt?.instruction) throw new Error('Contrato Writing: productionPrompt.instruction vazio.');
  return true;
}

export function buildWritingJsonContractInstruction({ level = 'A1' } = {}) {
  const policyInstruction = buildWritingPolicyPrompt(level);
  return [
    `CONTRATO JSON WRITING ${WRITING_JSON_CONTRACT_VERSION}`,
    'Retorne APENAS JSON válido. Não use markdown. Não use texto antes ou depois do JSON.',
    'Use aspas duplas em todas as chaves e strings.',
    'Não use comentários dentro do JSON.',
    'Não use trailing comma.',
    'Não use HTML.',
    '',
    policyInstruction,
    '',
    'Formato obrigatório:',
    JSON.stringify(WRITING_JSON_CONTRACT, null, 2),
    '',
    'Regras específicas de Writing:',
    '- writingModel: texto curto de referência que o aluno pode imitar.',
    '- Não revelar resposta dentro do prompt dos structuredTasks.',
    '- writingChecklist: 3–5 itens concretos e acionáveis.',
    '- productionPrompt: adequar ao nível (A1: 1–2 frases, B2: 5–8).',
    '- usefulPhrases deve trazer frases reutilizáveis, não teoria técnica.',
    '- A Prática Profunda é complemento posterior; exercícios principais ficam na aba.',
  ].join('\n');
}
