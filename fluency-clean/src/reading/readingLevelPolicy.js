export const READING_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

export const READING_SKILLS = {
  mainIdea: 'main_idea',
  detail: 'detail',
  vocabularyContext: 'vocabulary_context',
  sequence: 'sequence',
  evidence: 'evidence',
  inference: 'inference',
  authorPurpose: 'author_purpose',
  factOpinion: 'fact_opinion',
  tone: 'tone',
  implication: 'implication',
  criticalResponse: 'critical_response',
};

export const READING_LEVEL_POLICY_VERSION = 'reading-level-policy-v1';

export const READING_LEVEL_POLICIES = {
  A1: {
    level: 'A1',
    label: 'A1 · Leitura guiada inicial',
    studentGoal: 'Entender textos muito curtos e simples, encontrar informações explícitas e perder o medo de ler em inglês.',
    textWordRange: [60, 150],
    paragraphGuidance: '3 a 6 parágrafos muito curtos, com frases simples e repetição pedagógica.',
    questionLanguage: 'pt-BR-mostly',
    questionLanguageLabel: 'Perguntas majoritariamente em português, com inglês apenas em frases curtas e opções simples.',
    supportLanguage: 'Português forte como apoio. Inglês no texto, nas opções curtas e nas frases-alvo.',
    textGenres: ['micro_story', 'daily_routine', 'simple_profile', 'short_message', 'classroom_note'],
    allowedSkills: [
      READING_SKILLS.mainIdea,
      READING_SKILLS.detail,
      READING_SKILLS.vocabularyContext,
      READING_SKILLS.evidence,
    ],
    requiredQuestionMix: {
      main_idea: 1,
      detail: 2,
      vocabulary_context: 1,
      evidence: 1,
    },
    production: {
      label: 'Produção curta guiada',
      instruction: 'Escreva 1 a 3 frases simples em inglês sobre o texto. Pode seguir modelos como “I wake up...” ou “I study...”.',
      minSentences: 1,
      maxSentences: 3,
    },
    uiTone: 'muito guiado, calmo, com instruções claras em português',
  },
  A2: {
    level: 'A2',
    label: 'A2 · Leitura funcional básica',
    studentGoal: 'Entender textos simples de situações reais e conectar detalhes em uma sequência clara.',
    textWordRange: [120, 260],
    paragraphGuidance: '4 a 8 parágrafos curtos, com vocabulário familiar e algumas conexões simples.',
    questionLanguage: 'mixed-pt-en',
    questionLanguageLabel: 'Perguntas misturadas: português para instruções e inglês simples para checar compreensão.',
    supportLanguage: 'Português ainda presente, mas com mais perguntas e comandos simples em inglês.',
    textGenres: ['short_email', 'daily_story', 'simple_dialogue_text', 'invitation', 'instructions', 'travel_note'],
    allowedSkills: [
      READING_SKILLS.mainIdea,
      READING_SKILLS.detail,
      READING_SKILLS.vocabularyContext,
      READING_SKILLS.sequence,
      READING_SKILLS.evidence,
      READING_SKILLS.inference,
    ],
    requiredQuestionMix: {
      main_idea: 1,
      detail: 2,
      sequence: 1,
      vocabulary_context: 1,
      inference: 1,
    },
    production: {
      label: 'Produção curta com sequência',
      instruction: 'Escreva 3 a 5 frases simples em inglês resumindo o que aconteceu no texto.',
      minSentences: 3,
      maxSentences: 5,
    },
    uiTone: 'guiado, mas com pequenas transições para inglês',
  },
  B1: {
    level: 'B1',
    label: 'B1 · Leitura independente inicial',
    studentGoal: 'Entender textos claros sobre temas familiares, resumir ideias e reconhecer causa, consequência e inferências simples.',
    textWordRange: [250, 450],
    paragraphGuidance: '5 a 9 parágrafos claros, com conectores como because, however, first, then e after that.',
    questionLanguage: 'en-simple-with-pt-support',
    questionLanguageLabel: 'Perguntas principalmente em inglês simples; explicações podem continuar em português.',
    supportLanguage: 'Inglês nas perguntas; português como apoio no feedback e nas estratégias.',
    textGenres: ['personal_story', 'simple_article', 'long_email', 'experience_report', 'short_opinion'],
    allowedSkills: [
      READING_SKILLS.mainIdea,
      READING_SKILLS.detail,
      READING_SKILLS.vocabularyContext,
      READING_SKILLS.sequence,
      READING_SKILLS.evidence,
      READING_SKILLS.inference,
      READING_SKILLS.authorPurpose,
    ],
    requiredQuestionMix: {
      main_idea: 1,
      detail: 2,
      vocabulary_context: 1,
      inference: 2,
      author_purpose: 1,
    },
    production: {
      label: 'Resumo curto',
      instruction: 'Write a short summary of the text in 3 to 5 sentences. Use evidence from the text.',
      minSentences: 3,
      maxSentences: 5,
    },
    uiTone: 'mais autônomo, com leitura e perguntas em inglês simples',
  },
  B2: {
    level: 'B2',
    label: 'B2 · Leitura analítica',
    studentGoal: 'Ler com autonomia, identificar argumento, separar fato de opinião e interpretar intenção do autor.',
    textWordRange: [450, 750],
    paragraphGuidance: '6 a 10 parágrafos com argumento, contraste, exemplos e vocabulário menos previsível.',
    questionLanguage: 'en',
    questionLanguageLabel: 'Perguntas em inglês; feedback pode ser bilíngue quando ajudar.',
    supportLanguage: 'Inglês como idioma principal da aula. Português apenas como apoio pontual.',
    textGenres: ['opinion_article', 'news_feature', 'workplace_report', 'culture_article', 'problem_solution_text'],
    allowedSkills: [
      READING_SKILLS.mainIdea,
      READING_SKILLS.detail,
      READING_SKILLS.vocabularyContext,
      READING_SKILLS.evidence,
      READING_SKILLS.inference,
      READING_SKILLS.authorPurpose,
      READING_SKILLS.factOpinion,
      READING_SKILLS.tone,
    ],
    requiredQuestionMix: {
      main_idea: 1,
      detail: 1,
      inference: 2,
      author_purpose: 1,
      fact_opinion: 1,
      tone: 1,
    },
    production: {
      label: 'Resposta crítica curta',
      instruction: 'Write a short response explaining the author’s main argument and whether you agree or disagree.',
      minSentences: 5,
      maxSentences: 8,
    },
    uiTone: 'analítico, com menos apoio e mais autonomia',
  },
  C1: {
    level: 'C1',
    label: 'C1 · Leitura avançada e nuance',
    studentGoal: 'Entender textos longos e complexos, reconhecer nuance, implicação, tom, viés e escolhas do autor.',
    textWordRange: [700, 1100],
    paragraphGuidance: '7 a 12 parágrafos com linguagem abstrata, densidade argumentativa e nuance de registro.',
    questionLanguage: 'en-advanced',
    questionLanguageLabel: 'Perguntas em inglês avançado, com foco em nuance, tom, implicação e avaliação crítica.',
    supportLanguage: 'Inglês quase total. Português só deve aparecer como suporte opcional ou diagnóstico.',
    textGenres: ['editorial', 'essay', 'long_form_article', 'academic_excerpt', 'literary_nonfiction', 'critical_review'],
    allowedSkills: [
      READING_SKILLS.mainIdea,
      READING_SKILLS.detail,
      READING_SKILLS.vocabularyContext,
      READING_SKILLS.evidence,
      READING_SKILLS.inference,
      READING_SKILLS.authorPurpose,
      READING_SKILLS.factOpinion,
      READING_SKILLS.tone,
      READING_SKILLS.implication,
      READING_SKILLS.criticalResponse,
    ],
    requiredQuestionMix: {
      main_idea: 1,
      inference: 2,
      author_purpose: 1,
      tone: 1,
      implication: 1,
      critical_response: 1,
    },
    production: {
      label: 'Análise crítica',
      instruction: 'Write a concise critical response analyzing the author’s stance, tone, evidence and implications.',
      minSentences: 6,
      maxSentences: 10,
    },
    uiTone: 'avançado, autônomo e analítico',
  },
};

export function normalizeReadingLevel(level = 'A1') {
  const value = String(level || 'A1').trim().toUpperCase();
  if (READING_LEVEL_POLICIES[value]) return value;
  if (value.startsWith('C')) return 'C1';
  if (value.startsWith('B2')) return 'B2';
  if (value.startsWith('B')) return 'B1';
  if (value.startsWith('A2')) return 'A2';
  return 'A1';
}

export function getReadingLevelPolicy(level = 'A1') {
  return READING_LEVEL_POLICIES[normalizeReadingLevel(level)];
}

export function getReadingPolicySummary(level = 'A1') {
  const policy = getReadingLevelPolicy(level);
  return {
    version: READING_LEVEL_POLICY_VERSION,
    level: policy.level,
    label: policy.label,
    textWordRange: policy.textWordRange,
    questionLanguage: policy.questionLanguage,
    allowedSkills: policy.allowedSkills,
    production: policy.production,
  };
}

export function buildReadingPolicyPrompt(level = 'A1') {
  const policy = getReadingLevelPolicy(level);
  return [
    `POLÍTICA READING ${READING_LEVEL_POLICY_VERSION}`,
    `Nível: ${policy.label}`,
    `Objetivo do aluno: ${policy.studentGoal}`,
    `Tamanho do texto: ${policy.textWordRange[0]} a ${policy.textWordRange[1]} palavras.`,
    `Parágrafos: ${policy.paragraphGuidance}`,
    `Idioma das perguntas: ${policy.questionLanguageLabel}`,
    `Suporte linguístico: ${policy.supportLanguage}`,
    `Tipos de texto permitidos: ${policy.textGenres.join(', ')}.`,
    `Habilidades permitidas: ${policy.allowedSkills.join(', ')}.`,
    `Produção final: ${policy.production.instruction}`,
    `Tom da UI/aula: ${policy.uiTone}.`,
  ].join('\n');
}
