import { evaluateLevelAdvancement, LEVEL_MASTERY_WEIGHTS, LEVEL_PASSING_RULES } from '../../levelMasteryFramework.js';

export const B1_CHECKPOINTS = Object.freeze([
  Object.freeze({
    id: 'B1-CHECKPOINT-MID',
    title: 'B1 Checkpoint — Mid-course (B1.1–B1.4)',
    unlockAfterUnit: 'B1.4 Problems & Solutions',
    passingScore: 80,
    purpose: 'Confirmar domínio dos pilares fundamentais da primeira metade do B1: tempos narrativos, padrões verbais, opiniões com modais e condicionais de 1a e 2a.',
    pillars: Object.freeze({
      grammar: Object.freeze({
        target: 'Verb patterns (try/enjoy/want + -ing or infinitive), narrative tenses (past simple, past continuous, used to), modals for opinion (should/ought to), 1st and 2nd conditional.',
        tasks: Object.freeze([
          'Completar frases usando tried to / tried doing e want to / enjoy doing em contexto narrativo.',
          'Corrigir erros com past simple x past continuous em relatos curtos (uso correto de while e when).',
          'Escolher o condicional correto (1a ou 2a) em situações problema-solucao com contexto claro.',
          'Transformar used to em did + used to questions e respostas negativas.',
          'Identificar e corrigir 5 erros mistos de gramatica narrativa num paragrafo de experiencia pessoal.',
        ]),
      }),
      vocabulary: Object.freeze({
        target: 'Opinion phrases (I think/believe/feel that, In my view, As far as I am concerned), discourse markers (however, although, on the other hand), narrative vocabulary for past events, and problem/solution chunks.',
        tasks: Object.freeze([
          'Classificar expressoes de opiniao por grau de formalidade: I think x In my opinion x As far as I am concerned.',
          'Completar dialogos de debate com discourse markers corretos (however, although, on the other hand, despite).',
          'Escolher o phrasal verb ou chunk correto para narrar um evento passado (ended up, turned out, gave up).',
          'Associar problemas a solucoes usando vocabulario da unidade (deal with, sort out, come up with, face).',
        ]),
      }),
      reading: Object.freeze({
        target: 'Read texts about past experiences and opinion pieces with inference and evidence-based answers.',
        tasks: Object.freeze([
          'Ler relato de experiencia passada e identificar a sequencia de eventos com evidencia textual.',
          'Ler texto de opiniao curto e distinguir fatos de opinioes, citando trechos do texto.',
          'Responder perguntas de inferencia basica: o que o autor implica sem dizer diretamente.',
          'Completar resumo guiado do texto usando palavras do proprio texto.',
        ]),
      }),
      listening: Object.freeze({
        target: 'Understand moderately paced speech about past experiences, opinions and problem-solution discussions.',
        tasks: Object.freeze([
          'Primeira escuta sem transcript: identificar topico geral e posicao do falante (a favor ou contra).',
          'Segunda escuta: capturar detalhes especificos sobre o problema narrado e a solucao proposta.',
          'Completar gaps em transcript parcial com palavras e chunks ouvidos no audio.',
          'Identificar o tempo verbal predominante usado pelo falante (past simple ou past continuous).',
        ]),
      }),
      speaking: Object.freeze({
        target: 'Narrate a past experience and express an opinion with justification using B1.1-B1.4 language.',
        requiresReview: true,
        tasks: Object.freeze([
          'Gravar relato de 45 a 60 segundos sobre uma experiencia passada usando past simple e past continuous.',
          'Expressar e justificar uma opiniao sobre um problema cotidiano usando pelo menos um modal de opiniao.',
          'Responder a pergunta de follow-up: What would you do differently? (usando 2nd conditional).',
          'Usar pelo menos dois discourse markers para conectar ideias (however, although, so).',
        ]),
      }),
      writing: Object.freeze({
        target: 'Write a structured short text narrating a past experience or expressing an opinion on a problem.',
        requiresReview: true,
        tasks: Object.freeze([
          'Escrever paragrafo de 80 a 100 palavras narrando uma experiencia passada com past simple e past continuous.',
          'Incluir pelo menos uma expressao de opiniao e um discourse marker de contraste.',
          'Usar pelo menos um condicional (1a ou 2a) para indicar consequencias ou solucoes.',
          'Revisar com checklist: pontuacao, maiusculas, coerencia de tempos verbais.',
        ]),
      }),
    }),
  }),
  Object.freeze({
    id: 'B1-CHECKPOINT-FINAL',
    title: 'B1 Checkpoint — Final (B1.5–B1.8)',
    unlockAfterUnit: 'B1.8 Reviews & Checkpoints',
    passingScore: 80,
    purpose: 'Confirmar dominio dos pilares da segunda metade do B1: voz passiva, reported speech, clausulas relativas, futuros e condicionais mistos em contextos de trabalho, viagem, midia e revisao geral.',
    pillars: Object.freeze({
      grammar: Object.freeze({
        target: 'Passive voice (present and past simple), reported speech (say/tell + backshift), relative clauses (who/which/that/where), future forms (will/going to/present continuous for future), and introduction to mixed conditionals.',
        tasks: Object.freeze([
          'Transformar 6 frases ativas em passivas no presente e passado simples.',
          'Reescrever citacoes diretas em reported speech com backshift correto de tempos verbais.',
          'Completar clausulas relativas com who/which/that/where em contexto de artigo de midia.',
          'Escolher o futuro correto (will / going to / present continuous) em 8 contextos de viagem e trabalho.',
          'Identificar e corrigir erros de voz passiva e reported speech num e-mail profissional curto.',
        ]),
      }),
      vocabulary: Object.freeze({
        target: 'Work and study collocations (meet a deadline, hand in, take notes, attend a meeting), travel vocabulary (check in, departure, customs, itinerary), media and technology terms (stream, upload, go viral, algorithm), and review expressions from B1.1-B1.4.',
        tasks: Object.freeze([
          'Completar frases de contexto profissional com collocations corretas (meet the deadline / miss the deadline).',
          'Associar vocabulario de viagem a etapas de um roteiro (check-in, departure gate, customs, boarding).',
          'Escolher o termo de midia/tecnologia correto em frases de contexto (stream x download, upload x post).',
          'Revisar e completar expressoes mistas de B1.1-B1.4 num texto de revisao final.',
        ]),
      }),
      reading: Object.freeze({
        target: 'Read informative and opinion texts on work, travel, media and technology topics with inference and vocabulary-in-context questions.',
        tasks: Object.freeze([
          'Ler artigo de midia e identificar o argumento principal com evidencia textual.',
          'Responder perguntas de vocabulario em contexto: o que a palavra significa no trecho especifico.',
          'Ler relato de viagem e mapear a sequencia de eventos usando future forms e reported speech.',
          'Inferir a posicao do autor sobre tecnologia com base em linguagem e escolha lexical.',
        ]),
      }),
      listening: Object.freeze({
        target: 'Understand speech about work, travel plans, media discussions and reviews at moderate pace with some complex structures.',
        tasks: Object.freeze([
          'Primeira escuta sem transcript de podcast curto: identificar topico, falante e posicao geral.',
          'Segunda escuta: capturar detalhes de voz passiva e reported speech usados no audio.',
          'Completar tabela de informacoes de um dialogo de viagem (destino, data, meio de transporte, planos).',
          'Identificar qual future form o falante usa e por que (plano vs previsao vs decisao no momento).',
        ]),
      }),
      speaking: Object.freeze({
        target: 'Describe plans and report information using passive, reported speech and relative clauses with B1.5-B1.8 vocabulary.',
        requiresReview: true,
        tasks: Object.freeze([
          'Gravar descricao de 45 a 60 segundos sobre um plano de viagem usando pelo menos dois future forms diferentes.',
          'Relatar o que alguem disse usando reported speech em pelo menos duas ocasioes.',
          'Descrever uma tecnologia ou ferramenta usando uma clausula relativa (That is the app that/which...).',
          'Responder follow-up: What was the best part? usando voz passiva quando apropriado.',
        ]),
      }),
      writing: Object.freeze({
        target: 'Write a structured email or short report using passive, reported speech and relative clauses in professional or travel contexts.',
        requiresReview: true,
        tasks: Object.freeze([
          'Escrever e-mail profissional de 90 a 120 palavras relatando uma decisao tomada, usando voz passiva pelo menos duas vezes.',
          'Incluir pelo menos uma clausula relativa para descrever um produto, pessoa ou lugar.',
          'Usar reported speech para mencionar o que um colega ou cliente disse.',
          'Revisar com checklist: backshift em reported speech, concordancia na passiva, pontuacao.',
        ]),
      }),
    }),
  }),
]);

export const B1_FINAL_EXAM = Object.freeze({
  id: 'B1-FINAL-EXAM',
  title: 'B1 Final Exam — Ready for B2 Gate',
  level: 'B1',
  passingRules: LEVEL_PASSING_RULES,
  weights: LEVEL_MASTERY_WEIGHTS,
  purpose: 'Decidir se o aluno domina o nivel B1 e pode liberar o B2. Avalia uso integrado de tempos narrativos, voz passiva, reported speech, clausulas relativas, condicionais, opinioes fundamentadas e producao escrita e oral organizada.',
  prerequisites: Object.freeze([
    '100% das aulas B1 concluidas.',
    'Todos os checkpoints B1 feitos com media minima de 80%.',
    'Flashcards e revisoes essenciais das 8 unidades B1 completos.',
    'Revisao de producao (speaking e writing) aprovada por IA ou professor.',
  ]),
  sections: Object.freeze({
    grammar: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.grammar,
      passingScore: 78,
      format: 'Contextual grammar test — mixed B1 structures',
      focus: 'Narrative tenses, passive voice, reported speech, relative clauses, conditionals (1st, 2nd and mixed intro), modals for opinion and future forms.',
      tasks: Object.freeze([
        'Complete a narrative paragraph choosing between past simple, past continuous and used to.',
        'Rewrite active sentences in passive (present and past simple) and transform direct speech to reported speech.',
        'Join sentences using relative clauses (who/which/that/where) in a media article context.',
        'Choose the correct conditional (1st or 2nd) and the correct future form (will/going to/present continuous) in mixed contexts.',
        'Identify and correct 8 grammar errors in a professional email covering passive, reported speech and conditionals.',
      ]),
      passDescriptor: 'Usa estruturas gramaticais B1 com controle suficiente em contextos narrativos, profissionais e de opiniao.',
    }),
    vocabulary: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.vocabulary,
      passingScore: 82,
      format: 'Vocabulary in context — B1 full range',
      focus: 'Opinion phrases, discourse markers, narrative chunks, problem/solution vocabulary, work and study collocations, travel vocabulary, media and technology terms.',
      tasks: Object.freeze([
        'Choose the correct vocabulary item or chunk from four options in 15 sentence contexts spanning all 8 B1 units.',
        'Complete a formal email with work/study collocations (meet a deadline, attend a meeting, hand in a report).',
        'Match travel and media vocabulary to definitions and sentence contexts.',
        'Identify and correct 5 dangerous vocabulary confusions from the B1 range (e.g. travel x trip, affect x effect, speak x talk).',
      ]),
      passDescriptor: 'Reconhece e usa vocabulario B1 com precisao suficiente em contextos variados de opiniao, trabalho, viagem e midia.',
    }),
    reading: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.reading,
      passingScore: 78,
      format: 'Two texts — informative and opinion — with evidence-based and inferential questions',
      focus: 'Main idea, detail, vocabulary in context, inference, and author stance across familiar B1 topics.',
      tasks: Object.freeze([
        'Read a short informative article about work or technology: answer gist, detail and vocabulary-in-context questions.',
        'Read a short opinion text about travel or media: identify the authors main claim and support it with textual evidence.',
        'Answer 3 inference questions requiring reading between the lines without translating literally.',
        'Complete a structured summary using words and phrases drawn directly from the texts.',
      ]),
      passDescriptor: 'Entende textos claros B1 sobre temas familiares, responde com evidencia e faz inferencias basicas sem depender de traducao.',
    }),
    listening: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.listening,
      passingScore: 74,
      format: 'Two audios — narrative/opinion and professional/travel — first attempt without transcript',
      focus: 'General understanding, specific detail, vocabulary and grammar in speech, and speaker stance.',
      tasks: Object.freeze([
        'First listen to a short narrative or opinion monologue: identify topic, speaker position and main argument.',
        'Second listen: capture specific details including grammar structures used (passive, reported speech, conditionals).',
        'Listen to a work or travel dialogue: complete a table with key information (who, what, where, when, outcome).',
        'Identify which future form the speaker uses in each context and explain the reason (plan, prediction or spontaneous decision).',
      ]),
      passDescriptor: 'Entende falas B1 em velocidade moderada sobre temas conhecidos, capta detalhes e reconhece estruturas gramaticais no discurso oral.',
    }),
    speaking: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.speaking,
      passingScore: 70,
      requiresReview: true,
      format: 'Recorded oral performance + AI or teacher review',
      focus: 'Narrative fluency, opinion with justification, use of B1 grammar range, vocabulary precision and discourse organisation.',
      tasks: Object.freeze([
        'Record a 60 to 90 second narrative about a real or imagined past experience using past simple, past continuous and used to.',
        'Express and defend an opinion on a familiar topic (work, travel, media or technology) using opinion phrases and at least one conditional.',
        'Use reported speech to refer to what someone else said or suggested during the narrative.',
        'Answer two follow-up questions using relative clauses and future forms naturally.',
      ]),
      rubric: Object.freeze({
        grammarRange: 30,
        vocabularyUse: 20,
        fluencyCoherence: 20,
        taskCompletion: 20,
        pronunciationIntelligibility: 10,
      }),
      passDescriptor: 'Narra experiencias e defende opinioes com linguagem B1 de forma compreensivel, organizada e com controle gramatical suficiente.',
    }),
    writing: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.writing,
      passingScore: 74,
      requiresReview: true,
      format: 'Two written tasks — narrative/opinion and professional — with AI or teacher review',
      focus: 'Organised structure, grammar range (passive, reported speech, conditionals, relative clauses), discourse markers, and vocabulary precision.',
      tasks: Object.freeze([
        'Write a structured narrative or opinion paragraph of 100 to 130 words using at least three different B1 grammar structures.',
        'Write a professional email of 90 to 120 words reporting a situation or decision using passive voice and reported speech.',
        'Use discourse markers to organise ideas (however, although, as a result, in addition, on the other hand).',
        'Complete a self-review checklist before final submission: grammar accuracy, vocabulary range, cohesion and task completion.',
      ]),
      rubric: Object.freeze({
        grammarRange: 25,
        vocabularyUse: 20,
        organisation: 25,
        taskCompletion: 20,
        mechanics: 10,
      }),
      passDescriptor: 'Escreve textos B1 organizados com variedade gramatical, coesao e vocabulario preciso em contextos narrativos e profissionais.',
    }),
  }),
});

export function getB1Checkpoint(checkpointId) {
  return B1_CHECKPOINTS.find((c) => c.id === checkpointId) || null;
}

export function getB1CheckpointAverage(scores = {}) {
  const values = B1_CHECKPOINTS.map((c) => Number(scores[c.id] ?? 0)).filter((s) => Number.isFinite(s));
  if (!values.length) return 0;
  return Math.round(values.reduce((sum, s) => sum + s, 0) / values.length);
}

export function evaluateB1FinalGate({ lessonCompletionPercent = 0, checkpointScores = {}, finalExamPillarScores = {}, speakingReviewed = false, writingReviewed = false } = {}) {
  return evaluateLevelAdvancement({
    lessonCompletionPercent,
    checkpointAveragePercent: getB1CheckpointAverage(checkpointScores),
    finalExamPillarScores,
    speakingReviewed,
    writingReviewed,
  });
}

export function getB1FinalExamReadiness({ lessonCompletionPercent = 0, checkpointScores = {} } = {}) {
  const checkpointAveragePercent = getB1CheckpointAverage(checkpointScores);
  const issues = [];
  if (lessonCompletionPercent < 100) issues.push('Concluir 100% das aulas B1 antes da prova final.');
  if (checkpointAveragePercent < 80) issues.push('Atingir media minima de 80% nos checkpoints B1.');
  return Object.freeze({ ready: issues.length === 0, checkpointAveragePercent, issues });
}
