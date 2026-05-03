import { buildReadingJsonContractInstruction } from '../reading/readingJsonContract.js';
import { buildRubricInstruction, getLessonRubric } from './lessonRubrics.js';

export const LESSON_JSON_CONTRACT_VERSION = 'lesson-contract-v1';

export const REQUIRED_LESSON_FIELDS = [
  'type',
  'level',
  'title',
  'intro',
  'objective',
  'focus',
  'sections',
  'tips',
  'listeningText',
  'vocabulary',
  'exercises',
  'prompts',
];

export const SECTION_CONTRACT = {
  title: 'string em português, curta e clara',
  content: 'string em português, explicação objetiva e útil',
};

export const VOCABULARY_CONTRACT = {
  word: 'string em inglês',
  meaning: 'string em português',
  example: 'string em inglês simples no nível da aula',
};

export const EXERCISE_CONTRACT = {
  question: 'string, enunciado em português quando instrução; conteúdo treinado em inglês quando necessário',
  options: 'array com 3 alternativas curtas quando for múltipla escolha; pode ser [] para escrita/fala',
  answer: 'string, resposta esperada exata ou modelo aceitável',
  explanation: 'string em português explicando por que a resposta faz sentido',
};

export const READING_QUESTION_COMPAT_CONTRACT = {
  skill: 'main_idea | detail | vocabulary_context | sequence | evidence | inference | author_purpose | fact_opinion | tone | implication | critical_response',
  questionLanguage: 'pt-BR | en | mixed',
  question: 'string sem resposta vazada',
  options: 'array com 3 ou 4 alternativas curtas',
  answer: 'string, deve ser exatamente uma alternativa quando houver options',
  evidence: 'string com trecho exato do readingText que prova a resposta',
  explanation: 'string curta explicando a resposta',
  difficulty: 'easy | medium | hard',
};

function isReadingContractRequest(lessonType) {
  return String(lessonType || '').trim().toLowerCase() === 'reading';
}

export function getRequiredKeysForBlock(blockId) {
  const map = {
    structure: ['type', 'level', 'title', 'intro', 'objective', 'focus', 'sections', 'tips'],
    mainContent: ['listeningText'],
    vocabulary: ['vocabulary'],
    exercises: ['exercises'],
    production: ['prompts'],
  };
  return map[blockId] || [];
}

export function getBlockJsonShape(blockId, lessonType = 'reading') {
  if (blockId === 'structure') {
    return {
      type: 'reading | grammar | listening | writing | speaking | vocabulary',
      level: 'A1 | A2 | B1 | B2 | C1 | C2',
      title: 'string curta e específica',
      intro: 'string em português, 1 parágrafo motivador e objetivo',
      objective: 'string em português dizendo exatamente o que o aluno conseguirá fazer',
      focus: 'string curta com o foco da aula',
      sections: [SECTION_CONTRACT],
      tips: ['string em português, dica curta e prática'],
    };
  }

  if (isReadingContractRequest(lessonType) && blockId === 'mainContent') {
    return {
      readingText: 'string em inglês, texto principal de leitura, sem markdown, sem tradução e sem instruções',
      listeningText: 'string igual ao readingText apenas para compatibilidade temporária do motor atual',
      textGenre: 'micro_story | daily_routine | simple_profile | short_email | simple_article | opinion_article | editorial | outro gênero permitido pela política',
      readingPurpose: 'string curta dizendo o que o aluno deve compreender no texto',
      preReading: [
        { type: 'prediction | strategy | context | guiding_question', text: 'string clara para preparar a leitura' },
      ],
    };
  }

  if (isReadingContractRequest(lessonType) && blockId === 'exercises') {
    return {
      exercises: [EXERCISE_CONTRACT],
      readingQuestions: [READING_QUESTION_COMPAT_CONTRACT],
      evidenceTasks: [
        {
          instruction: 'string pedindo para localizar/copiar uma frase do texto',
          expectedEvidence: 'string com trecho exato esperado',
          skill: 'evidence',
        },
      ],
    };
  }

  if (isReadingContractRequest(lessonType) && blockId === 'production') {
    return {
      prompts: ['string em português, comando de produção com conteúdo treinado em inglês quando necessário'],
      postReadingPrompts: [
        {
          instruction: 'string com produção curta pós-leitura adequada ao nível',
          minSentences: 'number',
          maxSentences: 'number',
        },
      ],
    };
  }

  if (blockId === 'mainContent') return { listeningText: 'string em inglês, sem markdown, sem tradução, sem instruções' };
  if (blockId === 'vocabulary') return { vocabulary: [VOCABULARY_CONTRACT] };
  if (blockId === 'exercises') return { exercises: [EXERCISE_CONTRACT] };
  if (blockId === 'production') return { prompts: ['string em português, comando de produção com conteúdo treinado em inglês quando necessário'] };
  return {};
}

export function buildJsonContractInstruction({ lessonType = 'reading', blockId = 'structure' } = {}) {
  if (isReadingContractRequest(lessonType)) {
    const baseReadingContract = buildReadingJsonContractInstruction({ level: 'A1' });
    const requiredKeys = getRequiredKeysForBlock(blockId);
    const shape = getBlockJsonShape(blockId, lessonType);

    return [
      `CONTRATO JSON FLUENCY ${LESSON_JSON_CONTRACT_VERSION} · READING POR HABILIDADE`,
      'Retorne APENAS JSON válido. Não use markdown. Não use texto antes ou depois do JSON.',
      'Use aspas duplas em todas as chaves e strings.',
      'Não use comentários dentro do JSON.',
      'Não use trailing comma.',
      'Não use **negrito**, listas markdown, HTML ou campos fora do contrato.',
      `Tipo obrigatório da aula: reading.`,
      `Bloco obrigatório: ${blockId}.`,
      `Chaves obrigatórias de compatibilidade neste bloco: ${requiredKeys.join(', ')}.`,
      'Formato obrigatório do bloco atual:',
      JSON.stringify(shape, null, 2),
      '',
      'Contrato pedagógico interno de Reading:',
      baseReadingContract,
      '',
      'Regras de compatibilidade temporária do motor atual:',
      '- Para o bloco mainContent, gere readingText e também listeningText com o mesmo texto, até o motor inteiro migrar para readingText.',
      '- Para o bloco exercises, gere readingQuestions por habilidade e também exercises compatível com o render antigo.',
      '- Para o bloco production, gere postReadingPrompts e também prompts compatível com o render antigo.',
      '- O aluno não deve ver nenhuma explicação sobre contrato JSON, política interna ou compatibilidade.',
    ].join('\n');
  }

  const rubric = getLessonRubric(lessonType);
  const requiredKeys = getRequiredKeysForBlock(blockId);
  const shape = getBlockJsonShape(blockId, lessonType);

  return [
    `CONTRATO JSON FLUENCY ${LESSON_JSON_CONTRACT_VERSION}`,
    'Retorne APENAS JSON válido. Não use markdown. Não use texto antes ou depois do JSON.',
    'Use aspas duplas em todas as chaves e strings.',
    'Não use comentários dentro do JSON.',
    'Não use trailing comma.',
    'Não use **negrito**, listas markdown, HTML ou campos fora do contrato.',
    `Tipo obrigatório da aula: ${lessonType}.`,
    `Nível obrigatório: use o nível pedido pelo cronograma; se não houver, use A1.`,
    `Bloco obrigatório: ${blockId}.`,
    `Chaves obrigatórias neste bloco: ${requiredKeys.join(', ')}.`,
    'Formato obrigatório do bloco:',
    JSON.stringify(shape, null, 2),
    '',
    'Regras de idioma:',
    '- Explicações, feedback, dicas e instruções: português brasileiro claro.',
    '- Textos, exemplos, frases, áudio, respostas treinadas e vocabulário-alvo: inglês no nível da aula.',
    '- Nunca misture palavra e tradução sem separação clara nos campos vocabulary.word e vocabulary.meaning.',
    '',
    'Regras anti-conteúdo raso:',
    '- Não gere conteúdo genérico que serviria para qualquer aula.',
    '- Não use respostas vagas como “resposta pessoal” em alternativas de múltipla escolha.',
    '- Não gere exercícios com alternativas longas que pareçam parágrafos inteiros.',
    '- Não gere perguntas que não dependem do texto/áudio/tema da aula.',
    '- Não revele resposta dentro da pergunta.',
    '- Não use opções como undefined, null, answer, resposta ou exemplo.',
    '',
    buildRubricInstruction(rubric.type),
  ].join('\n');
}

export function assertJsonContractBlock(blockId, data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error(`Contrato JSON: bloco ${blockId} não retornou objeto.`);
  const required = getRequiredKeysForBlock(blockId);
  for (const key of required) {
    if (!(key in data)) throw new Error(`Contrato JSON: bloco ${blockId} veio sem a chave obrigatória ${key}.`);
  }
  return true;
}

export function stripUnknownBlockKeys(blockId, data) {
  const required = getRequiredKeysForBlock(blockId);
  const clean = {};
  for (const key of required) clean[key] = data?.[key];

  if (blockId === 'mainContent') {
    if (data?.readingText) clean.readingText = data.readingText;
    if (!clean.listeningText && data?.readingText) clean.listeningText = data.readingText;
    if (data?.textGenre) clean.textGenre = data.textGenre;
    if (data?.readingPurpose) clean.readingPurpose = data.readingPurpose;
    if (Array.isArray(data?.preReading)) clean.preReading = data.preReading;
  }

  if (blockId === 'exercises') {
    if (Array.isArray(data?.readingQuestions)) clean.readingQuestions = data.readingQuestions;
    if (Array.isArray(data?.evidenceTasks)) clean.evidenceTasks = data.evidenceTasks;
    if (!Array.isArray(clean.exercises) && Array.isArray(data?.readingQuestions)) {
      clean.exercises = data.readingQuestions.map((item) => ({
        question: item?.question || '',
        options: item?.options || [],
        answer: item?.answer || '',
        explanation: item?.explanation || item?.evidence || '',
        skill: item?.skill || '',
        evidence: item?.evidence || '',
      }));
    }
  }

  if (blockId === 'production') {
    if (Array.isArray(data?.postReadingPrompts)) clean.postReadingPrompts = data.postReadingPrompts;
    if (!Array.isArray(clean.prompts) && Array.isArray(data?.postReadingPrompts)) clean.prompts = data.postReadingPrompts.map((item) => item?.instruction || item?.prompt || '').filter(Boolean);
  }

  return clean;
}
