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

export function getBlockJsonShape(blockId) {
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

  if (blockId === 'mainContent') return { listeningText: 'string em inglês, sem markdown, sem tradução, sem instruções' };
  if (blockId === 'vocabulary') return { vocabulary: [VOCABULARY_CONTRACT] };
  if (blockId === 'exercises') return { exercises: [EXERCISE_CONTRACT] };
  if (blockId === 'production') return { prompts: ['string em português, comando de produção com conteúdo treinado em inglês quando necessário'] };
  return {};
}

export function buildJsonContractInstruction({ lessonType = 'reading', blockId = 'structure' } = {}) {
  const rubric = getLessonRubric(lessonType);
  const requiredKeys = getRequiredKeysForBlock(blockId);
  const shape = getBlockJsonShape(blockId);

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
  return clean;
}
