export const LESSON_RUBRIC_APPROVAL_SCORE = 85;

export const LESSON_TYPE_REQUIREMENTS = {
  reading: {
    minSections: 6,
    minVocabulary: 12,
    minExercises: 12,
    minPrompts: 4,
    minMainLength: 900,
    requiredSignals: ['pré-leitura', 'leitura', 'compreensão', 'vocabulário', 'revisão'],
    qualityCriteria: [
      'Ter texto principal em inglês com contexto claro e extensão suficiente.',
      'Ensinar estratégia de leitura antes das perguntas.',
      'Treinar ideia principal, detalhes, vocabulário em contexto e inferência simples.',
      'Evitar perguntas soltas que não possam ser respondidas pelo texto.',
      'Finalizar com produção curta baseada no conteúdo lido.',
    ],
  },
  grammar: {
    minSections: 7,
    minVocabulary: 8,
    minExercises: 14,
    minPrompts: 4,
    minMainLength: 0,
    requiredSignals: ['quando usar', 'afirmativa', 'negativa', 'pergunta', 'erro', 'revisão'],
    qualityCriteria: [
      'Explicar quando usar a estrutura antes da forma.',
      'Mostrar afirmativa, negativa e pergunta com exemplos claros.',
      'Treinar transformação, correção de erro e uso em contexto.',
      'Não transformar a aula em jogo; manter tom sério e pedagógico.',
      'Fechar com checklist de erros comuns e produção própria.',
    ],
  },
  listening: {
    minSections: 6,
    minVocabulary: 10,
    minExercises: 10,
    minPrompts: 4,
    minMainLength: 750,
    requiredSignals: ['escuta', 'áudio', 'transcrição', 'detalhe', 'shadowing', 'ouça', 'vocabulário', 'revisão'],
    qualityCriteria: [
      'Ter transcrição/roteiro auditivo real em inglês adequado ao nível.',
      'Separar escuta global, escuta por detalhes, transcrição e shadowing.',
      'Gerar perguntas que dependem do que foi ouvido, não de respostas genéricas.',
      'Usar vocabulário auditivo curto, repetível e conectado ao áudio.',
      'Para A1, ditados devem ser curtos: letras, nomes, palavras ou frases muito simples.',
    ],
  },
  writing: {
    minSections: 6,
    minVocabulary: 10,
    minExercises: 10,
    minPrompts: 5,
    minMainLength: 0,
    requiredSignals: ['modelo', 'estrutura', 'frases', 'checklist', 'produção'],
    qualityCriteria: [
      'Começar com um modelo curto antes da produção livre.',
      'Mostrar estrutura da resposta e frases úteis.',
      'Treinar completar, ordenar, corrigir e reescrever frases.',
      'Dar checklist de revisão antes de concluir.',
      'Produção final deve ser possível para o nível do aluno.',
    ],
  },
  speaking: {
    minSections: 5,
    minVocabulary: 6,
    minExercises: 6,
    minPrompts: 5,
    minMainLength: 0,
    requiredSignals: ['modelo', 'repetição', 'pronúncia', 'conversa', 'tentativa'],
    qualityCriteria: [
      'Dar modelo de fala antes de pedir produção.',
      'Treinar repetição, pronúncia, ritmo e resposta curta.',
      'Evitar frases longas demais no começo.',
      'Permitir tentativa, feedback e nova gravação.',
      'Fechar com uma mini-conversa ou resposta pessoal guiada.',
    ],
  },
  vocabulary: {
    minSections: 5,
    minVocabulary: 12,
    minExercises: 10,
    minPrompts: 4,
    minMainLength: 0,
    requiredSignals: ['contexto', 'exemplo', 'prática', 'revisão'],
    qualityCriteria: [
      'Ensinar palavras em contexto, não apenas tradução.',
      'Incluir exemplo em inglês simples para cada palavra.',
      'Treinar reconhecimento, escolha, escrita e produção curta.',
      'Agrupar palavras por tema ou função comunicativa.',
      'Revisar palavras difíceis no final.',
    ],
  },
};

export function getLessonTypeRequirements(type = 'reading') {
  return LESSON_TYPE_REQUIREMENTS[type] || LESSON_TYPE_REQUIREMENTS.reading;
}

export function getLessonRubric(type = 'reading') {
  const requirements = getLessonTypeRequirements(type);
  return {
    type: LESSON_TYPE_REQUIREMENTS[type] ? type : 'reading',
    approvalScore: LESSON_RUBRIC_APPROVAL_SCORE,
    ...requirements,
  };
}

export function buildRubricInstruction(type = 'reading') {
  const rubric = getLessonRubric(type);
  return [
    `Rubrica pedagógica obrigatória para ${rubric.type}:`,
    `- mínimo de seções: ${rubric.minSections}`,
    `- mínimo de vocabulário: ${rubric.minVocabulary}`,
    `- mínimo de exercícios: ${rubric.minExercises}`,
    `- mínimo de produção/prompts: ${rubric.minPrompts}`,
    rubric.minMainLength ? `- texto/transcrição principal mínimo: ${rubric.minMainLength} caracteres` : '- texto principal longo não é obrigatório para este tipo',
    '- critérios de qualidade:',
    ...rubric.qualityCriteria.map((criterion) => `  • ${criterion}`),
  ].join('\n');
}
