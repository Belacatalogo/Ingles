import { buildListeningPolicyPrompt, getListeningLevelPolicy } from './listeningLevelPolicy.js';
import { applyListeningQualityGate } from './listeningQualityGate.js';

export const LISTENING_JSON_CONTRACT_VERSION = 'listening-contract-v1';

export const LISTENING_JSON_CONTRACT = {
  type: 'listening',
  level: 'A1 | A2 | B1 | B2 | C1',
  title: 'string curta e específica',
  intro: 'string de apresentação para o aluno',
  objective: 'string com o que o aluno vai praticar',
  textType: 'tipo do texto auditivo, ex: short_dialogue',
  listeningText: 'string com transcrição completa em inglês, sem markdown',
  speakers: [
    { id: 'string', name: 'string', role: 'string opcional' },
  ],
  vocabulary: [
    { word: 'string EN', meaning: 'string PT', audioText: 'string para TTS' },
  ],
  listeningQuestions: [
    {
      skill: 'gist_listening | detail_listening | specific_info | speaker_intent | inference_listening | tone_listening',
      questionLanguage: 'pt-BR | mixed-pt-en | en',
      question: 'string sem resposta vazada',
      options: ['array quando múltipla escolha'],
      answer: 'string com resposta correta',
      audioEvidence: 'trecho exato do áudio que prova a resposta',
      explanation: 'string curta',
    },
  ],
  shadowingLines: ['string com frase do áudio para praticar shadowing'],
  dictationItems: ['string com frase/palavra para ditado respeitando dictationMaxWords do nível'],
  tips: ['string de estratégia de escuta'],
};

function clean(value) {
  return String(value ?? '').trim();
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function wordCount(value) {
  return clean(value).split(/\s+/).filter(Boolean).length;
}

function normalizeSpeaker(item) {
  if (typeof item === 'string') return { id: item.toLowerCase().slice(0, 10), name: item, role: '' };
  return {
    id: clean(item?.id || item?.key || item?.name || 'speaker'),
    name: clean(item?.name || item?.speaker || 'Speaker'),
    role: clean(item?.role || ''),
  };
}

function normalizeVocabularyItem(item) {
  return {
    word: clean(item?.word || item?.term || ''),
    meaning: clean(item?.meaning || item?.translation || item?.definition || ''),
    audioText: clean(item?.audioText || item?.audio_text || item?.word || item?.term || ''),
    example: clean(item?.example || item?.sentence || ''),
  };
}

function normalizeListeningQuestion(item, index = 0) {
  const options = ensureArray(item?.options || item?.choices || item?.alternatives)
    .map((option) => clean(typeof option === 'string' ? option : option?.text || option?.label || option?.value || ''))
    .filter(Boolean);

  return {
    skill: clean(item?.skill || item?.type || (index === 0 ? 'gist_listening' : 'detail_listening')),
    questionLanguage: clean(item?.questionLanguage || item?.language || ''),
    question: clean(item?.question || item?.prompt || ''),
    options: [...new Set(options)].slice(0, 4),
    answer: clean(item?.answer || item?.correctAnswer || item?.correct || ''),
    audioEvidence: clean(item?.audioEvidence || item?.evidence || item?.quote || ''),
    explanation: clean(item?.explanation || item?.feedback || ''),
  };
}

function inferListeningText(rawLesson) {
  return clean(
    rawLesson?.listeningText ||
    rawLesson?.listening_text ||
    rawLesson?.transcript ||
    rawLesson?.text ||
    rawLesson?.dialogueText ||
    rawLesson?.dialogue_text ||
    ''
  );
}

function buildNormalizedListeningLesson(rawLesson = {}) {
  const policy = getListeningLevelPolicy(rawLesson?.level || 'A1');
  const listeningText = inferListeningText(rawLesson);
  const listeningQuestions = ensureArray(rawLesson?.listeningQuestions || rawLesson?.questions || rawLesson?.exercises || rawLesson?.comprehension)
    .map(normalizeListeningQuestion)
    .filter((question) => question.question && question.answer);

  return {
    ...rawLesson,
    contractVersion: LISTENING_JSON_CONTRACT_VERSION,
    type: 'listening',
    level: policy.level,
    title: clean(rawLesson?.title || 'Listening'),
    intro: clean(rawLesson?.intro || rawLesson?.subtitle || ''),
    objective: clean(rawLesson?.objective || rawLesson?.goal || ''),
    textType: clean(rawLesson?.textType || rawLesson?.text_type || rawLesson?.genre || policy.textTypes?.[0] || ''),
    listeningText,
    speakers: ensureArray(rawLesson?.speakers || rawLesson?.characters).map(normalizeSpeaker),
    vocabulary: ensureArray(rawLesson?.vocabulary).map(normalizeVocabularyItem).filter((item) => item.word || item.meaning),
    listeningQuestions,
    shadowingLines: ensureArray(rawLesson?.shadowingLines || rawLesson?.shadowing_lines || rawLesson?.shadowing)
      .map(clean)
      .filter(Boolean)
      .slice(0, 8),
    dictationItems: ensureArray(rawLesson?.dictationItems || rawLesson?.dictation_items || rawLesson?.dictation)
      .map(clean)
      .filter(Boolean)
      .filter((item) => wordCount(item) <= policy.dictationMaxWords)
      .slice(0, 8),
    tips: ensureArray(rawLesson?.tips).map(clean).filter(Boolean),
  };
}

export function normalizeListeningLessonContract(rawLesson = {}) {
  return applyListeningQualityGate(buildNormalizedListeningLesson(rawLesson));
}

export function assertListeningContract(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Contrato Listening: não retornou objeto.');
  if (!clean(data.listeningText)) throw new Error('Contrato Listening: listeningText vazio.');
  if (!ensureArray(data.listeningQuestions).length) throw new Error('Contrato Listening: listeningQuestions vazio.');
  return true;
}

export function buildListeningJsonContractInstruction({ level = 'A1' } = {}) {
  const policyInstruction = buildListeningPolicyPrompt(level);
  return [
    `CONTRATO JSON LISTENING ${LISTENING_JSON_CONTRACT_VERSION}`,
    'Retorne APENAS JSON válido. Não use markdown. Não use texto antes ou depois do JSON.',
    'Use aspas duplas em todas as chaves e strings.',
    'Não use comentários dentro do JSON.',
    'Não use trailing comma.',
    'Não use HTML.',
    '',
    policyInstruction,
    '',
    'Formato obrigatório:',
    JSON.stringify(LISTENING_JSON_CONTRACT, null, 2),
    '',
    'Regras específicas de Listening:',
    '- listeningText é a transcrição COMPLETA do que será falado no áudio.',
    '- Não use readingText para Listening.',
    '- Cada listeningQuestion deve depender do áudio, nunca de conhecimento geral.',
    '- Não vaze a transcrição nas perguntas ou opções.',
    '- audioEvidence deve ser trecho exato do áudio que prova a resposta.',
    '- shadowingLines: 3 a 5 frases curtas e naturais do áudio para praticar.',
    '- dictationItems: respeitar dictationMaxWords do nível.',
    '- A Prática Profunda é complemento posterior; exercícios principais ficam na aba Listening.',
  ].join('\n');
}
