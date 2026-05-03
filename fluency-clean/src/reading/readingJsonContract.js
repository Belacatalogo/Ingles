import { applyReadingQualityGate } from './readingQualityGate.js';
import { buildReadingPolicyPrompt, getReadingLevelPolicy } from './readingLevelPolicy.js';

export const READING_JSON_CONTRACT_VERSION = 'reading-contract-v1';

export const READING_TEXT_GENRES = [
  'micro_story',
  'daily_routine',
  'simple_profile',
  'short_message',
  'classroom_note',
  'short_email',
  'daily_story',
  'simple_dialogue_text',
  'invitation',
  'instructions',
  'travel_note',
  'personal_story',
  'simple_article',
  'long_email',
  'experience_report',
  'short_opinion',
  'opinion_article',
  'news_feature',
  'workplace_report',
  'culture_article',
  'problem_solution_text',
  'editorial',
  'essay',
  'long_form_article',
  'academic_excerpt',
  'literary_nonfiction',
  'critical_review',
];

export const READING_PRE_READING_ITEM_CONTRACT = {
  type: 'prediction | strategy | context | guiding_question',
  text: 'string clara para preparar a leitura',
};

export const READING_QUESTION_CONTRACT = {
  skill: 'main_idea | detail | vocabulary_context | sequence | evidence | inference | author_purpose | fact_opinion | tone | implication | critical_response',
  questionLanguage: 'pt-BR | en | mixed',
  question: 'string sem resposta vazada',
  options: ['array com 3 ou 4 alternativas curtas quando for múltipla escolha'],
  answer: 'string com resposta correta ou modelo esperado',
  evidence: 'string com trecho exato do texto que prova a resposta; obrigatório para compreensão',
  explanation: 'string curta explicando a resposta no idioma de suporte adequado ao nível',
  difficulty: 'easy | medium | hard',
};

export const READING_EVIDENCE_TASK_CONTRACT = {
  instruction: 'string pedindo ao aluno localizar/copiar uma frase do texto',
  expectedEvidence: 'string com trecho exato esperado',
  skill: 'evidence',
};

export const READING_POST_PROMPT_CONTRACT = {
  instruction: 'string com produção curta pós-leitura adequada ao nível',
  minSentences: 'number',
  maxSentences: 'number',
};

export const READING_JSON_CONTRACT = {
  type: 'reading',
  level: 'A1 | A2 | B1 | B2 | C1',
  title: 'string curta e específica',
  intro: 'string curta para o aluno, sem explicar detalhes técnicos do contrato',
  objective: 'string com objetivo real de leitura',
  focus: 'string curta com tema/foco da leitura',
  readingText: 'string em inglês, texto principal de leitura, sem markdown',
  textGenre: READING_TEXT_GENRES.join(' | '),
  readingPurpose: 'string dizendo o que o aluno deve conseguir compreender',
  preReading: [READING_PRE_READING_ITEM_CONTRACT],
  vocabulary: [
    {
      word: 'string em inglês',
      meaning: 'string em português',
      example: 'string em inglês retirada ou inspirada no texto',
      contextClue: 'string opcional explicando a pista de contexto',
    },
  ],
  readingQuestions: [READING_QUESTION_CONTRACT],
  evidenceTasks: [READING_EVIDENCE_TASK_CONTRACT],
  postReadingPrompts: [READING_POST_PROMPT_CONTRACT],
  tips: ['string curta de estratégia de leitura para o aluno'],
};

function clean(value) {
  return String(value ?? '').trim();
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizePreReadingItem(item) {
  if (typeof item === 'string') return { type: 'strategy', text: clean(item) };
  return {
    type: clean(item?.type || item?.kind || 'strategy'),
    text: clean(item?.text || item?.content || item?.question || item?.instruction || ''),
  };
}

function normalizeQuestion(item, index = 0) {
  const options = ensureArray(item?.options || item?.choices || item?.alternatives)
    .map((option) => clean(typeof option === 'string' ? option : option?.text || option?.label || option?.value || ''))
    .filter(Boolean);

  return {
    skill: clean(item?.skill || item?.type || (index === 0 ? 'main_idea' : 'detail')),
    questionLanguage: clean(item?.questionLanguage || item?.language || ''),
    question: clean(item?.question || item?.prompt || item?.title || ''),
    options: [...new Set(options)].slice(0, 4),
    answer: clean(item?.answer || item?.correctAnswer || item?.correct || item?.expectedAnswer || ''),
    evidence: clean(item?.evidence || item?.quote || item?.reference || ''),
    explanation: clean(item?.explanation || item?.feedback || ''),
    difficulty: clean(item?.difficulty || 'easy'),
  };
}

function normalizeEvidenceTask(item) {
  if (typeof item === 'string') {
    return {
      instruction: 'Localize no texto a frase que prova sua resposta.',
      expectedEvidence: clean(item),
      skill: 'evidence',
    };
  }

  return {
    instruction: clean(item?.instruction || item?.question || 'Localize no texto a frase que prova sua resposta.'),
    expectedEvidence: clean(item?.expectedEvidence || item?.evidence || item?.quote || ''),
    skill: clean(item?.skill || 'evidence'),
  };
}

function normalizePostPrompt(item, policy) {
  if (typeof item === 'string') {
    return {
      instruction: clean(item),
      minSentences: policy.production.minSentences,
      maxSentences: policy.production.maxSentences,
    };
  }

  return {
    instruction: clean(item?.instruction || item?.prompt || item?.text || policy.production.instruction),
    minSentences: Number(item?.minSentences || policy.production.minSentences),
    maxSentences: Number(item?.maxSentences || policy.production.maxSentences),
  };
}

function inferReadingText(rawLesson) {
  return clean(
    rawLesson?.readingText ||
    rawLesson?.reading_text ||
    rawLesson?.mainText ||
    rawLesson?.main_text ||
    rawLesson?.text ||
    rawLesson?.story ||
    rawLesson?.article ||
    rawLesson?.passage ||
    rawLesson?.listeningText ||
    rawLesson?.transcript ||
    ''
  );
}

function inferTextGenre(rawLesson, policy) {
  const candidate = clean(rawLesson?.textGenre || rawLesson?.genre || rawLesson?.readingGenre || '').toLowerCase();
  if (candidate && READING_TEXT_GENRES.includes(candidate)) return candidate;
  return policy.textGenres[0] || 'micro_story';
}

function getLegacyQuestions(rawLesson) {
  return ensureArray(rawLesson?.readingQuestions).length ? rawLesson.readingQuestions
    : ensureArray(rawLesson?.comprehension).length ? rawLesson.comprehension
      : ensureArray(rawLesson?.questions).length ? rawLesson.questions
        : ensureArray(rawLesson?.exercises).length ? rawLesson.exercises
          : [];
}

function buildNormalizedReadingLesson(rawLesson = {}) {
  const policy = getReadingLevelPolicy(rawLesson?.level || rawLesson?.cefr || 'A1');
  const readingText = inferReadingText(rawLesson);
  const readingQuestions = getLegacyQuestions(rawLesson).map(normalizeQuestion).filter((item) => item.question && item.answer);
  const preReading = ensureArray(rawLesson?.preReading || rawLesson?.pre_reading || rawLesson?.beforeReading)
    .map(normalizePreReadingItem)
    .filter((item) => item.text);
  const evidenceTasks = ensureArray(rawLesson?.evidenceTasks || rawLesson?.evidence_tasks)
    .map(normalizeEvidenceTask)
    .filter((item) => item.expectedEvidence || item.instruction);
  const postReadingPrompts = ensureArray(rawLesson?.postReadingPrompts || rawLesson?.post_reading_prompts || rawLesson?.prompts || rawLesson?.writingPrompts)
    .map((item) => normalizePostPrompt(item, policy))
    .filter((item) => item.instruction);

  return {
    contractVersion: READING_JSON_CONTRACT_VERSION,
    type: 'reading',
    level: policy.level,
    title: clean(rawLesson?.title || 'Reading'),
    intro: clean(rawLesson?.intro || rawLesson?.subtitle || ''),
    objective: clean(rawLesson?.objective || rawLesson?.goal || ''),
    focus: clean(rawLesson?.focus || rawLesson?.topic || ''),
    readingText,
    textGenre: inferTextGenre(rawLesson, policy),
    readingPurpose: clean(rawLesson?.readingPurpose || rawLesson?.reading_purpose || policy.studentGoal),
    preReading,
    vocabulary: ensureArray(rawLesson?.vocabulary),
    readingQuestions,
    evidenceTasks,
    postReadingPrompts,
    tips: ensureArray(rawLesson?.tips).map(clean).filter(Boolean),
    legacy: {
      usedListeningTextFallback: !clean(rawLesson?.readingText || rawLesson?.reading_text || rawLesson?.mainText || rawLesson?.main_text) && Boolean(clean(rawLesson?.listeningText || rawLesson?.transcript)),
    },
  };
}

export function normalizeReadingLessonContract(rawLesson = {}) {
  return applyReadingQualityGate(buildNormalizedReadingLesson(rawLesson));
}

export function getReadingRequiredKeys() {
  return ['type', 'level', 'title', 'readingText', 'textGenre', 'preReading', 'vocabulary', 'readingQuestions', 'postReadingPrompts'];
}

export function assertReadingContract(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Contrato Reading: bloco não retornou objeto.');
  for (const key of getReadingRequiredKeys()) {
    if (!(key in data)) throw new Error(`Contrato Reading: faltou a chave obrigatória ${key}.`);
  }
  if (data.type !== 'reading') throw new Error('Contrato Reading: type deve ser reading.');
  if (!clean(data.readingText)) throw new Error('Contrato Reading: readingText vazio.');
  if (!ensureArray(data.readingQuestions).length) throw new Error('Contrato Reading: readingQuestions vazio.');
  return true;
}

export function buildReadingJsonContractInstruction({ level = 'A1' } = {}) {
  const policyInstruction = buildReadingPolicyPrompt(level);

  return [
    `CONTRATO JSON READING ${READING_JSON_CONTRACT_VERSION}`,
    'Retorne APENAS JSON válido. Não use markdown. Não use texto antes ou depois do JSON.',
    'Use aspas duplas em todas as chaves e strings.',
    'Não use comentários dentro do JSON.',
    'Não use trailing comma.',
    'Não use HTML.',
    'Este contrato é interno. Não explique o contrato ao aluno dentro da aula.',
    '',
    policyInstruction,
    '',
    'Formato obrigatório:',
    JSON.stringify(READING_JSON_CONTRACT, null, 2),
    '',
    'Regras específicas de Reading:',
    '- Use readingText para o texto principal. Não use listeningText para Reading nova.',
    '- readingText deve ser texto de leitura, não transcrição de áudio.',
    '- Cada readingQuestion de compreensão deve depender do readingText.',
    '- Cada readingQuestion deve ter evidence com trecho exato do texto quando for compreensão.',
    '- Não revele a resposta dentro da pergunta.',
    '- Não gere alternativas duplicadas.',
    '- Não use perguntas genéricas que serviriam para qualquer texto.',
    '- A Prática Profunda é complemento posterior; os exercícios principais de Reading ficam na própria aba Reading.',
  ].join('\n');
}
