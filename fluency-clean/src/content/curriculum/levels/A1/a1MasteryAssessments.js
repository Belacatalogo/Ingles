import { evaluateLevelAdvancement, LEVEL_MASTERY_WEIGHTS, LEVEL_PASSING_RULES } from '../../levelMasteryFramework.js';

export const A1_CHECKPOINTS = Object.freeze([
  Object.freeze({
    id: 'A1-CHECKPOINT-FOUNDATIONS',
    title: 'A1 Checkpoint — Foundations',
    unlockAfterUnit: 'A1 Foundations',
    passingScore: 80,
    purpose: 'Confirmar domínio inicial dos blocos básicos antes de avançar para unidades temáticas maiores.',
    pillars: Object.freeze({
      grammar: Object.freeze({
        target: 'Subject pronouns, verb to be, simple statements and possessives in basic personal information.',
        tasks: Object.freeze([
          'Complete frases com I/you/he/she/we/they.',
          'Corrigir frases com am/is/are.',
          'Escolher my/your/his/her em contexto simples.',
        ]),
      }),
      vocabulary: Object.freeze({
        target: 'Names, numbers, countries, cities, family and classroom words.',
        tasks: Object.freeze([
          'Associar palavra/chunk a significado.',
          'Completar frases pessoais com vocabulário correto.',
          'Identificar confusões como city/country e parents/relatives.',
        ]),
      }),
      reading: Object.freeze({
        target: 'Read short introductions and profiles with textual evidence.',
        tasks: Object.freeze([
          'Ler apresentação curta.',
          'Responder perguntas de detalhe com evidência.',
          'Completar resumo guiado.',
        ]),
      }),
      listening: Object.freeze({
        target: 'Understand very short clear audio about names, greetings, spelling and numbers.',
        tasks: Object.freeze([
          'Primeira escuta sem transcript.',
          'Identificar nomes/números.',
          'Completar dictation curta.',
        ]),
      }),
      speaking: Object.freeze({
        target: 'Introduce yourself and answer very simple personal questions.',
        requiresReview: true,
        tasks: Object.freeze([
          'Gravar apresentação de 20 a 30 segundos.',
          'Responder What is your name? How old are you? Where are you from?',
          'Soletrar primeiro nome.',
        ]),
      }),
      writing: Object.freeze({
        target: 'Write a short introduction with controlled grammar.',
        requiresReview: true,
        tasks: Object.freeze([
          'Escrever 5 a 6 frases sobre si.',
          'Revisar I am, from, a student e pontuação.',
          'Entregar versão final curta.',
        ]),
      }),
    }),
  }),
  Object.freeze({
    id: 'A1-CHECKPOINT-PERSONAL-LIFE',
    title: 'A1 Checkpoint — Personal life',
    unlockAfterUnit: 'A1.2 Personal life',
    passingScore: 80,
    purpose: 'Confirmar que o aluno consegue falar, ler, ouvir e escrever dados pessoais, contato, hobby e outra pessoa.',
    pillars: Object.freeze({
      grammar: Object.freeze({
        target: 'Use my, your, his, her and simple be statements in personal contexts.',
        tasks: Object.freeze([
          'Completar frases com my/your/his/her.',
          'Corrigir he name/she city.',
          'Transformar he/she em his/her + noun.',
        ]),
      }),
      vocabulary: Object.freeze({
        target: 'Personal life words: phone number, email address, free time, favorite, hobby, class.',
        tasks: Object.freeze([
          'Diferenciar address e email address.',
          'Usar free time e favorite em frases.',
          'Completar chunks de perfil pessoal.',
        ]),
      }),
      reading: Object.freeze({
        target: 'Read a personal life profile and answer with evidence.',
        tasks: Object.freeze([
          'Ler perfil pessoal A1.2.',
          'Identificar telefone, e-mail, cidade, aula e hobby.',
          'Responder com evidência textual.',
        ]),
      }),
      listening: Object.freeze({
        target: 'Understand a personal information exchange without transcript first.',
        tasks: Object.freeze([
          'Ouvir perguntas sobre city, phone, email e hobby.',
          'Responder detalhes após segunda escuta.',
          'Completar dictation curta.',
        ]),
      }),
      speaking: Object.freeze({
        target: 'Talk about yourself and one other person using my/his/her.',
        requiresReview: true,
        tasks: Object.freeze([
          'Gravar 30 segundos sobre si e outra pessoa.',
          'Responder perguntas pessoais.',
          'Usar my/his/her corretamente.',
        ]),
      }),
      writing: Object.freeze({
        target: 'Write a short personal life paragraph with my/his/her.',
        requiresReview: true,
        tasks: Object.freeze([
          'Escrever parágrafo de 6 a 8 frases.',
          'Incluir você e outra pessoa.',
          'Revisar his/her, is/are e pontuação.',
        ]),
      }),
    }),
  }),
]);

export const A1_FINAL_EXAM = Object.freeze({
  id: 'A1-FINAL-EXAM',
  title: 'A1 Final Exam — Ready for A2 Gate',
  level: 'A1',
  passingRules: LEVEL_PASSING_RULES,
  weights: LEVEL_MASTERY_WEIGHTS,
  purpose: 'Decidir se o aluno realmente domina A1 e pode liberar A2. Não mede apenas aulas assistidas; mede desempenho prático nos 6 pilares.',
  prerequisites: Object.freeze([
    '100% das aulas A1 concluídas.',
    'Todos os checkpoints A1 feitos.',
    'Média mínima de 80% nos checkpoints.',
    'Flashcards/revisões essenciais feitos.',
  ]),
  sections: Object.freeze({
    grammar: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.grammar,
      minimumScore: LEVEL_PASSING_RULES.minimumPillarPercent,
      format: 'Contextual grammar test',
      tasks: Object.freeze([
        'Complete personal information sentences with correct pronouns and be forms.',
        'Correct common Brazilian mistakes: I have 20 years, he name, she brother, I am Brazil.',
        'Choose correct forms in short profile contexts.',
      ]),
      passDescriptor: 'Usa estruturas A1 essenciais com controle suficiente em contexto pessoal e cotidiano.',
    }),
    vocabulary: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.vocabulary,
      minimumScore: LEVEL_PASSING_RULES.minimumPillarPercent,
      format: 'Vocabulary in context',
      tasks: Object.freeze([
        'Identify and use words/chunks for identity, family, city, country, routine, contact and hobbies.',
        'Complete short profile and routine sentences.',
        'Resolve dangerous confusions: city/country, Brazil/Brazilian, address/email address, parents/relatives.',
      ]),
      passDescriptor: 'Reconhece e usa vocabulário A1 sem depender de lista solta ou tradução literal.',
    }),
    reading: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.reading,
      minimumScore: LEVEL_PASSING_RULES.minimumPillarPercent,
      format: 'Short texts with evidence',
      tasks: Object.freeze([
        'Read a short personal profile and a short daily routine text.',
        'Answer gist, detail and vocabulary-in-context questions.',
        'Provide or select textual evidence for key answers.',
      ]),
      passDescriptor: 'Entende textos curtos A1 e responde com base no texto, não por chute.',
    }),
    listening: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.listening,
      minimumScore: LEVEL_PASSING_RULES.minimumPillarPercent,
      format: 'Clear short audio, first attempt without transcript',
      tasks: Object.freeze([
        'First listen: identify general situation without transcript.',
        'Second listen: capture names, numbers, city, email, hobby or routine details.',
        'Short dictation of chunks and numbers.',
      ]),
      passDescriptor: 'Entende áudios curtos e claros do A1 sem depender do transcript na primeira escuta.',
    }),
    speaking: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.speaking,
      minimumScore: LEVEL_PASSING_RULES.minimumSpeakingPercent,
      requiresReview: true,
      format: 'Recorded oral performance + AI/teacher review',
      tasks: Object.freeze([
        'Record a 45–60 second self-introduction.',
        'Answer simple follow-up questions about name, age, city, family, class, hobby and routine.',
        'Spell name and say phone number/city clearly.',
      ]),
      rubric: Object.freeze({
        clarity: 25,
        grammarControl: 25,
        vocabularyUse: 20,
        taskCompletion: 20,
        pronunciationIntelligibility: 10,
      }),
      passDescriptor: 'Consegue se apresentar e responder perguntas A1 com clareza suficiente.',
    }),
    writing: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.writing,
      minimumScore: LEVEL_PASSING_RULES.minimumWritingPercent,
      requiresReview: true,
      format: 'Short written production + AI/teacher review',
      tasks: Object.freeze([
        'Write a short personal profile paragraph.',
        'Write a short family or daily routine paragraph.',
        'Revise using checklist before submitting final version.',
      ]),
      rubric: Object.freeze({
        grammarControl: 25,
        vocabularyUse: 20,
        organization: 20,
        taskCompletion: 20,
        mechanics: 15,
      }),
      passDescriptor: 'Escreve textos curtos A1 com frases simples, organização e erros controlados.',
    }),
  }),
});

export function getA1Checkpoint(checkpointId) {
  return A1_CHECKPOINTS.find((checkpoint) => checkpoint.id === checkpointId) || null;
}

export function getA1CheckpointAverage(scores = {}) {
  const values = A1_CHECKPOINTS.map((checkpoint) => Number(scores[checkpoint.id] ?? 0)).filter((score) => Number.isFinite(score));
  if (!values.length) return 0;
  return Math.round(values.reduce((sum, score) => sum + score, 0) / values.length);
}

export function evaluateA1FinalGate({ lessonCompletionPercent = 0, checkpointScores = {}, finalExamPillarScores = {}, speakingReviewed = false, writingReviewed = false } = {}) {
  return evaluateLevelAdvancement({
    lessonCompletionPercent,
    checkpointAveragePercent: getA1CheckpointAverage(checkpointScores),
    finalExamPillarScores,
    speakingReviewed,
    writingReviewed,
  });
}

export function getA1FinalExamReadiness({ lessonCompletionPercent = 0, checkpointScores = {} } = {}) {
  const checkpointAveragePercent = getA1CheckpointAverage(checkpointScores);
  const issues = [];
  if (lessonCompletionPercent < 100) issues.push('Concluir 100% das aulas A1 antes da prova final.');
  if (checkpointAveragePercent < 80) issues.push('Atingir média mínima de 80% nos checkpoints A1.');
  return Object.freeze({
    ready: issues.length === 0,
    checkpointAveragePercent,
    issues,
  });
}
