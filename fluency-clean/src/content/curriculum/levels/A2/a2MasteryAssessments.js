import { evaluateLevelAdvancement, LEVEL_MASTERY_WEIGHTS, LEVEL_PASSING_RULES } from '../../levelMasteryFramework.js';

export const A2_CHECKPOINTS = Object.freeze([
  Object.freeze({
    id: 'A2-CHECKPOINT-NARRATIVE',
    title: 'A2 Checkpoint — Narrative & Daily Life',
    unlockAfterUnit: 'A2.3 Plans and Now',
    passingScore: 80,
    purpose: 'Confirmar domínio do passado simples, presente contínuo e planos futuros antes de avançar para comparações e comunicação.',
    pillars: Object.freeze({
      grammar: Object.freeze({
        target: 'Past simple (regular and irregular), present continuous, future with going to.',
        tasks: Object.freeze([
          'Complete frases no passado simples com verbos regulares e irregulares comuns.',
          'Escolher entre present continuous e present simple em contexto.',
          'Usar going to para planos e intenções.',
        ]),
      }),
      vocabulary: Object.freeze({
        target: 'Past time expressions, routine and daily life words, common irregular verb pairs.',
        tasks: Object.freeze([
          'Usar yesterday, last week, last year em frases.',
          'Associar forma base e passado irregular (go/went, have/had, see/saw).',
          'Completar frases sobre rotina diária e atividades.',
        ]),
      }),
      reading: Object.freeze({
        target: 'Read short narratives and messages about past events and plans with evidence.',
        tasks: Object.freeze([
          'Ler mensagem ou história curta no passado.',
          'Responder perguntas de detalhe com evidência textual.',
          'Identificar sequência de eventos.',
        ]),
      }),
      listening: Object.freeze({
        target: 'Understand short audio describing past events and future plans.',
        tasks: Object.freeze([
          'Primeira escuta sem transcript.',
          'Identificar tempo verbal (passou ou vai acontecer).',
          'Completar notas com detalhes principais.',
        ]),
      }),
      speaking: Object.freeze({
        target: 'Talk about past experiences and future plans using basic narrative structure.',
        requiresReview: true,
        tasks: Object.freeze([
          'Gravar 30 a 45 segundos sobre o que fez no fim de semana.',
          'Contar um plano futuro usando going to.',
          'Usar sequência: first, then, after that, finally.',
        ]),
      }),
      writing: Object.freeze({
        target: 'Write a short personal narrative or message about past events or plans.',
        requiresReview: true,
        tasks: Object.freeze([
          'Escrever 6 a 8 frases sobre algo que aconteceu.',
          'Incluir pelo menos 2 verbos irregulares no passado.',
          'Rever pontuação e ordem de palavras antes de entregar.',
        ]),
      }),
    }),
  }),
  Object.freeze({
    id: 'A2-CHECKPOINT-COMMUNICATION',
    title: 'A2 Checkpoint — Comparisons & Communication',
    unlockAfterUnit: 'A2.5 Communication Tasks',
    passingScore: 80,
    purpose: 'Confirmar domínio de comparações, necessidades e comunicação social antes da prova final A2.',
    pillars: Object.freeze({
      grammar: Object.freeze({
        target: 'Comparative and superlative adjectives, need to/want to/have to, can/could for ability and requests.',
        tasks: Object.freeze([
          'Formar comparativos e superlativos de adjetivos comuns.',
          'Completar frases com need to, want to, have to em contexto.',
          'Usar can/could em pedidos e habilidades.',
        ]),
      }),
      vocabulary: Object.freeze({
        target: 'Adjectives for comparison, social situations, communication phrases and polite requests.',
        tasks: Object.freeze([
          'Usar pares de adjetivos opostos (cheap/expensive, easy/difficult, near/far).',
          'Completar frases de comunicação social (excuse me, could you, I would like).',
          'Identificar confusões: big/large, small/little, old/ancient.',
        ]),
      }),
      reading: Object.freeze({
        target: 'Read short messages, emails and social texts with comprehension questions.',
        tasks: Object.freeze([
          'Ler e-mail informal curto e responder perguntas.',
          'Identificar intenção do escritor (pedido, convite, reclamação).',
          'Completar resposta guiada ao texto.',
        ]),
      }),
      listening: Object.freeze({
        target: 'Understand short conversations about needs, offers and social exchanges.',
        tasks: Object.freeze([
          'Ouvir conversa social sem transcript primeiro.',
          'Identificar o que cada pessoa quer ou precisa.',
          'Registrar detalhes de pedido ou acordo.',
        ]),
      }),
      speaking: Object.freeze({
        target: 'Make comparisons and handle short social exchanges with appropriate politeness.',
        requiresReview: true,
        tasks: Object.freeze([
          'Comparar duas opções usando comparativos (Ex: A is bigger than B, but C is the best).',
          'Fazer um pedido polido usando could you / I would like.',
          'Gravar 30 a 45 segundos comparando dois lugares, pessoas ou coisas.',
        ]),
      }),
      writing: Object.freeze({
        target: 'Write a short informal email or message for a social purpose.',
        requiresReview: true,
        tasks: Object.freeze([
          'Escrever e-mail informal de convite ou pedido (6 a 8 frases).',
          'Incluir cumprimento, corpo e despedida.',
          'Rever: maiúsculas, pontuação, tom informal adequado.',
        ]),
      }),
    }),
  }),
]);

export const A2_FINAL_EXAM = Object.freeze({
  id: 'A2-FINAL-EXAM',
  title: 'A2 Final Exam — Ready for B1 Gate',
  level: 'A2',
  passingRules: LEVEL_PASSING_RULES,
  weights: LEVEL_MASTERY_WEIGHTS,
  purpose: 'Decidir se o aluno realmente domina A2 e pode liberar B1. Não mede apenas aulas assistidas; mede desempenho prático nos 6 pilares em contextos A2 reais.',
  prerequisites: Object.freeze([
    '100% das aulas A2 concluídas.',
    'Todos os checkpoints A2 feitos.',
    'Média mínima de 80% nos checkpoints A2.',
    'Flashcards/revisões essenciais feitos.',
  ]),
  sections: Object.freeze({
    grammar: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.grammar,
      minimumScore: LEVEL_PASSING_RULES.minimumPillarPercent,
      format: 'Contextual grammar test',
      tasks: Object.freeze([
        'Use past simple (regular and irregular) in short narrative contexts.',
        'Choose between present simple, present continuous and going to correctly.',
        'Form comparative and superlative structures and use need to / have to / want to.',
      ]),
      passDescriptor: 'Usa estruturas A2 essenciais com controle suficiente em contexto narrativo e social.',
    }),
    vocabulary: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.vocabulary,
      minimumScore: LEVEL_PASSING_RULES.minimumPillarPercent,
      format: 'Vocabulary in context',
      tasks: Object.freeze([
        'Identify and use words/chunks for daily life, social communication, emotions, travel and descriptions.',
        'Complete narrative and social sentences without relying on word lists.',
        'Resolve dangerous confusions: do/make, go/come, say/tell, see/look/watch.',
      ]),
      passDescriptor: 'Reconhece e usa vocabulário A2 em contextos cotidianos sem depender de tradução literal.',
    }),
    reading: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.reading,
      minimumScore: LEVEL_PASSING_RULES.minimumPillarPercent,
      format: 'Short texts with comprehension and inference',
      tasks: Object.freeze([
        'Read a short personal narrative and a short informal email or message.',
        'Answer gist, detail and vocabulary-in-context questions with evidence.',
        'Identify writer purpose and infer basic meaning from context.',
      ]),
      passDescriptor: 'Entende textos curtos A2 — narrativas e mensagens — e responde com base no texto.',
    }),
    listening: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.listening,
      minimumScore: LEVEL_PASSING_RULES.minimumPillarPercent,
      format: 'Clear short audio, first attempt without transcript',
      tasks: Object.freeze([
        'First listen: identify topic and main situation without transcript.',
        'Second listen: capture key details about events, plans or social exchanges.',
        'Short note-completion or dictation of key phrases.',
      ]),
      passDescriptor: 'Entende áudios curtos e claros A2 sobre situações cotidianas sem depender do transcript.',
    }),
    speaking: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.speaking,
      minimumScore: LEVEL_PASSING_RULES.minimumSpeakingPercent,
      requiresReview: true,
      format: 'Recorded oral performance + AI/teacher review',
      tasks: Object.freeze([
        'Record a 60-second narrative about a past experience.',
        'Compare two options or places using comparative and superlative forms.',
        'Handle a short simulated social exchange: invite, request or describe a plan.',
      ]),
      rubric: Object.freeze({
        clarity: 25,
        grammarControl: 25,
        vocabularyUse: 20,
        taskCompletion: 20,
        pronunciationIntelligibility: 10,
      }),
      passDescriptor: 'Consegue narrar, comparar e interagir socialmente em inglês A2 com clareza suficiente.',
    }),
    writing: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.writing,
      minimumScore: LEVEL_PASSING_RULES.minimumWritingPercent,
      requiresReview: true,
      format: 'Short written production + AI/teacher review',
      tasks: Object.freeze([
        'Write a short narrative paragraph about a past event (8–10 sentences).',
        'Write a short informal email or message for a social purpose.',
        'Revise using checklist before submitting final version.',
      ]),
      rubric: Object.freeze({
        grammarControl: 25,
        vocabularyUse: 20,
        organization: 20,
        taskCompletion: 20,
        mechanics: 15,
      }),
      passDescriptor: 'Escreve narrativas curtas e mensagens informais A2 com organização e controle de erros adequados.',
    }),
  }),
});

export function getA2Checkpoint(checkpointId) {
  return A2_CHECKPOINTS.find((checkpoint) => checkpoint.id === checkpointId) || null;
}

export function getA2CheckpointAverage(scores = {}) {
  const values = A2_CHECKPOINTS.map((checkpoint) => Number(scores[checkpoint.id] ?? 0)).filter((score) => Number.isFinite(score));
  if (!values.length) return 0;
  return Math.round(values.reduce((sum, score) => sum + score, 0) / values.length);
}

export function evaluateA2FinalGate({ lessonCompletionPercent = 0, checkpointScores = {}, finalExamPillarScores = {}, speakingReviewed = false, writingReviewed = false } = {}) {
  return evaluateLevelAdvancement({
    lessonCompletionPercent,
    checkpointAveragePercent: getA2CheckpointAverage(checkpointScores),
    finalExamPillarScores,
    speakingReviewed,
    writingReviewed,
  });
}

export function getA2FinalExamReadiness({ lessonCompletionPercent = 0, checkpointScores = {} } = {}) {
  const checkpointAveragePercent = getA2CheckpointAverage(checkpointScores);
  const issues = [];
  if (lessonCompletionPercent < 100) issues.push('Concluir 100% das aulas A2 antes da prova final.');
  if (checkpointAveragePercent < 80) issues.push('Atingir média mínima de 80% nos checkpoints A2.');
  return Object.freeze({
    ready: issues.length === 0,
    checkpointAveragePercent,
    issues,
  });
}
