import { evaluateLevelAdvancement, LEVEL_MASTERY_WEIGHTS, LEVEL_PASSING_RULES } from '../../levelMasteryFramework.js';

export const B2_CHECKPOINTS = Object.freeze([
  Object.freeze({
    id: 'B2-CHECKPOINT-MID',
    title: 'B2 Checkpoint — Mid-course (B2.1–B2.4)',
    unlockAfterUnit: 'B2.4 Professional',
    passingScore: 80,
    purpose: 'Confirmar dominio dos pilares fundamentais da primeira metade do B2: frases complexas com clausulas subordinadas, linguagem hipotetica, vocabulario de posicao e stance, registro profissional e nominalizacao em contextos formais.',
    pillars: Object.freeze({
      grammar: Object.freeze({
        target: 'Complex sentence structures (subordination, fronting, cleft sentences), hypothetical language (wish, if only, would rather, it is time), advanced modals for speculation (must have, could have, might have been), and nominalisation basics.',
        tasks: Object.freeze([
          'Transformar pares de frases simples em sentencas complexas usando subordinadores avancados (whereas, provided that, given that, despite the fact that).',
          'Reescrever frases diretas em estruturas clivadas para enfase: It was the manager who... / What surprised me was...',
          'Completar frases hipoteticas com wish/if only/would rather + tempo verbal correto em 8 contextos distintos.',
          'Identificar e usar modais de especulacao no passado (must have, could have, might have) em relatos de situacoes ambiguas.',
          'Nominalizar verbos e adjetivos em contextos formais: to decide -> the decision, important -> importance, analyse -> analysis.',
        ]),
      }),
      vocabulary: Object.freeze({
        target: 'Stance vocabulary (arguably, supposedly, evidently, it is worth noting), complex discourse connectors (notwithstanding, as a consequence, in light of), professional register collocations (implement a strategy, conduct a review, allocate resources), and abstract noun phrases.',
        tasks: Object.freeze([
          'Classificar expressoes de stance por grau de certeza: evidently x arguably x supposedly x it is claimed that.',
          'Reescrever textos informais usando registro profissional: collocations de trabalho (carry out, draw up, put forward, liaise with).',
          'Completar textos academico-profissionais com conectores de discurso avancados (consequently, notwithstanding, in light of, with regard to).',
          'Associar nominalizacoes a seus verbos e adjetivos de origem e usar em frases de contexto (investigation, assessment, implementation, significance).',
          'Identificar e corrigir 5 confusoes de registro em um e-mail profissional (palavras informais substituidas por equivalentes formais).',
        ]),
      }),
      reading: Object.freeze({
        target: 'Read opinion articles and professional texts with complex sentence structure, implicit stance, and vocabulary-in-context inference at B2 level.',
        tasks: Object.freeze([
          'Ler artigo de opiniao e distinguir fatos, opinioes e linguagem hedgeada, citando evidencia textual para cada categoria.',
          'Responder perguntas de inferencia sobre a posicao do autor: o que esta implicito na escolha de certas palavras e estruturas.',
          'Identificar o proposito comunicativo de cada paragrafo de um texto profissional (introduzir, contrastar, exemplificar, concluir).',
          'Completar mapa de argumentos do texto: tese principal, argumentos de suporte, concessoes e conclusao.',
        ]),
      }),
      listening: Object.freeze({
        target: 'Understand naturally paced professional and academic speech with complex grammar, hedging and professional vocabulary at B2 level.',
        tasks: Object.freeze([
          'Primeira escuta sem transcript de uma apresentacao ou reuniao curta: identificar topico, posicao do falante e pelo menos dois argumentos.',
          'Segunda escuta: capturar exemplos de linguagem hipotetica, modais de especulacao e nominalizacoes usados pelo falante.',
          'Completar tabela de pontos principais de um debate curto: posicao do falante A, posicao do falante B, ponto de concordancia.',
          'Identificar marcadores de discurso formal usados pelo falante (furthermore, in contrast, as a result, to summarise).',
        ]),
      }),
      speaking: Object.freeze({
        target: 'Discuss complex and professional topics using hypothetical language, stance vocabulary, cleft sentences and B2.1-B2.4 register.',
        requiresReview: true,
        tasks: Object.freeze([
          'Gravar discussao de 60 a 90 segundos sobre um tema profissional ou abstrato usando pelo menos dois conectores de discurso avancados.',
          'Expressar e defender uma posicao usando linguagem de stance (arguably, in my view, it is worth noting) e pelo menos um modal de especulacao.',
          'Usar uma estrutura hipotetica (wish/if only/would rather) para descrever uma situacao ideal ou passada com nuance.',
          'Responder follow-up com uma clausula clivada para dar enfase: What I find most concerning is... / It was the lack of... that...',
        ]),
      }),
      writing: Object.freeze({
        target: 'Write a structured professional or argumentative text using complex grammar, nominalisation, professional register and B2.1-B2.4 discourse organisation.',
        requiresReview: true,
        tasks: Object.freeze([
          'Escrever paragrafo argumentativo de 110 a 140 palavras sobre um tema profissional usando pelo menos duas nominalizacoes e um conector de discurso avancado.',
          'Incluir pelo menos uma estrutura hipotetica e um modal de especulacao para adicionar nuance ao argumento.',
          'Usar linguagem de stance para apresentar e avaliar diferentes perspectivas sem tomar partido abertamente.',
          'Revisar com checklist: registro formal mantido ao longo do texto, nominalizacoes corretas, conectores de discurso adequados, coerencia tematica.',
        ]),
      }),
    }),
  }),
  Object.freeze({
    id: 'B2-CHECKPOINT-FINAL',
    title: 'B2 Checkpoint — Final (B2.5–B2.8)',
    unlockAfterUnit: 'B2.8 Checkpoints',
    passingScore: 80,
    purpose: 'Confirmar dominio dos pilares da segunda metade do B2: organizacao do discurso em textos longos, hedging e linguagem academica, vocabulario de midia e questoes globais, escrita academica com estrutura complexa e revisao total do nivel.',
    pillars: Object.freeze({
      grammar: Object.freeze({
        target: 'Discourse organisation devices (topic sentences, signposting language, paragraph cohesion), hedging structures (tend to, appear to, seem, it is generally accepted that), complex grammar review (inversion for emphasis, advanced passives, mixed conditionals review) and academic writing grammar.',
        tasks: Object.freeze([
          'Adicionar topicos de sentenca, frases de sinal e conclusoes a paragrafos desorganizados para criar coesao de discurso.',
          'Transformar afirmacoes categoricas em linguagem hedgeada usando tend to, appear to, is generally regarded as, may suggest.',
          'Reescrever frases usando inversao para enfase: Never had I / Rarely does / Not only... but also... em contextos academicos.',
          'Completar texto com passivas avancadas em contextos de midia e pesquisa (is believed to have been, is reported to be).',
          'Identificar e corrigir 6 erros de gramatica avancada num ensaio curto cobrindo inversao, passivas e hedging.',
        ]),
      }),
      vocabulary: Object.freeze({
        target: 'Media and culture vocabulary (portray, depict, coverage, framing, bias), global issues vocabulary (sustainability, inequality, governance, resilience, mitigation), academic vocabulary (synthesise, evaluate, contend, hypothesise, framework) and full B2 range review.',
        tasks: Object.freeze([
          'Associar termos de midia a definicoes e usa-los em frases de contexto: coverage, framing, portrayal, bias, censorship.',
          'Completar texto sobre questoes globais com vocabulario correto: sustainability, mitigation, inequality, resilience, governance.',
          'Usar verbos academicos no contexto correto: contend, hypothesise, evaluate, synthesise, underpin em frases de um ensaio.',
          'Revisar e completar expressoes lexicais de todo o nivel B2 num exercicio de gap-fill integrado.',
          'Identificar 5 falsas escolhas de vocabulario academico (confusoes comuns como affect/effect, imply/infer, principle/principal).',
        ]),
      }),
      reading: Object.freeze({
        target: 'Read authentic or near-authentic academic and journalistic texts with implicit meaning, complex argument structure and hedging at full B2 level.',
        tasks: Object.freeze([
          'Ler artigo jornalistico sobre questao global e mapear a estrutura argumentativa: tese, argumentos, concessoes, conclusao.',
          'Identificar linguagem hedgeada no texto e explicar por que o autor optou por essa escolha em cada caso.',
          'Responder 4 perguntas de inferencia sobre tom, proposito e implicatura do texto sem traducao literal.',
          'Comparar dois textos curtos com perspectivas diferentes sobre o mesmo tema e identificar diferencas de stance e registro.',
        ]),
      }),
      listening: Object.freeze({
        target: 'Understand natural speech in academic, journalistic and debate contexts with hedging, discourse organisation signals and B2 full vocabulary range.',
        tasks: Object.freeze([
          'Primeira escuta sem transcript de trecho de debate ou palestra academica: identificar o argumento central e a posicao do falante.',
          'Segunda escuta: identificar pelo menos tres exemplos de hedging e dois conectores de discurso usados pelo falante.',
          'Completar esquema de notas de uma palestra curta sobre questao global (problema, causas, consequencias, solucoes propostas).',
          'Identificar momentos em que o falante muda de posicao ou adiciona nuance, e explicar como essa mudanca e sinalizada linguisticamente.',
        ]),
      }),
      speaking: Object.freeze({
        target: 'Present and defend arguments on media, global and academic topics using full B2 discourse organisation, hedging, and academic vocabulary.',
        requiresReview: true,
        tasks: Object.freeze([
          'Gravar mini-apresentacao de 75 a 100 segundos sobre uma questao global ou de midia usando organizacao clara de discurso (introducao, argumentos, conclusao).',
          'Usar pelo menos dois exemplos de hedging para qualificar afirmacoes e evitar generalizacoes absolutas.',
          'Incluir vocabulario academico ou jornalistico relevante (pelo menos tres termos do nivel B2.5-B2.8) de forma natural.',
          'Responder dois follow-ups com linguagem de avaliacao e sintese: On balance... / What this suggests is... / It seems reasonable to conclude...',
        ]),
      }),
      writing: Object.freeze({
        target: 'Write a cohesive argumentative or analytical text using full B2 discourse organisation, hedging, academic vocabulary and complex grammar.',
        requiresReview: true,
        tasks: Object.freeze([
          'Escrever ensaio ou relatorio curto de 130 a 160 palavras sobre tema de midia ou questao global com introducao, desenvolvimento e conclusao claramente sinalizados.',
          'Usar pelo menos tres estruturas de hedging para apresentar evidencias e opinioes com nuance academica.',
          'Incluir pelo menos dois conectores de discurso avancados para organizar paragrafos e transicoes (furthermore, however, as a consequence, notwithstanding).',
          'Revisar com checklist: organizacao do discurso, hedging adequado, vocabulario academico presente, registro formal mantido, ausencia de erros de gramatica avancada.',
        ]),
      }),
    }),
  }),
]);

export const B2_FINAL_EXAM = Object.freeze({
  id: 'B2-FINAL-EXAM',
  title: 'B2 Final Exam — Ready for C1 Gate',
  level: 'B2',
  passingRules: LEVEL_PASSING_RULES,
  weights: LEVEL_MASTERY_WEIGHTS,
  purpose: 'Decidir se o aluno domina o nivel B2 e pode liberar o C1. Avalia uso integrado de gramatica complexa (hipoteticos, inversao, passivas avancadas, hedging), vocabulario de stance e registro academico-profissional, compreensao de textos e falas autenticos com nuance, e producao oral e escrita com coesao e precisao.',
  prerequisites: Object.freeze([
    '100% das aulas B2 concluidas.',
    'Todos os checkpoints B2 feitos com media minima de 80%.',
    'Flashcards e revisoes essenciais das 8 unidades B2 completos.',
    'Revisao de producao (speaking e writing) aprovada por IA ou professor.',
  ]),
  sections: Object.freeze({
    grammar: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.grammar,
      passingScore: 80,
      format: 'Contextual grammar test — mixed B2 structures',
      focus: 'Complex subordination, cleft and fronted structures, hypothetical language, advanced modals for speculation, inversion for emphasis, advanced passives, hedging grammar and nominalisation.',
      tasks: Object.freeze([
        'Complete a professional report paragraph using nominalisation, advanced passives and hedging structures in a single coherent text.',
        'Rewrite six plain sentences using cleft structures, fronting and inversion to add emphasis in academic or journalistic contexts.',
        'Choose the correct hypothetical form (wish + past simple, wish + past perfect, if only, would rather + infinitive/past) in 10 mixed contexts.',
        'Transform five direct assertions into hedged academic claims using appear to, tend to, it is generally accepted that and passive reporting verbs (is believed, is reported).',
        'Identify and correct 8 advanced grammar errors in an essay draft covering inversions, advanced passives, nominalisation and hypothetical structures.',
      ]),
      passDescriptor: 'Usa estruturas gramaticais B2 com precisao e flexibilidade em registros formais, academicos e jornalisticos, incluindo hedging e enfase.',
    }),
    vocabulary: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.vocabulary,
      passingScore: 84,
      format: 'Vocabulary in context — full B2 range',
      focus: 'Stance vocabulary, professional register collocations, discourse connectors, media and journalism vocabulary, global issues vocabulary, academic vocabulary and false friends across the B2 range.',
      tasks: Object.freeze([
        'Choose the correct vocabulary item or phrase from four options in 18 sentence contexts spanning all 8 B2 units, including stance markers, academic verbs and collocations.',
        'Complete a formal report with professional register collocations and academic noun phrases (implement a framework, conduct an assessment, draw preliminary conclusions).',
        'Match media, global issues and academic vocabulary to definitions and gap-fill sentences at full B2 level.',
        'Identify and correct 6 vocabulary confusions common at B2 level (affect/effect, imply/infer, economic/economical, continuous/continual, raise/rise, principal/principle).',
        'Rewrite five informal sentences using appropriate formal and academic equivalents, demonstrating register flexibility.',
      ]),
      passDescriptor: 'Reconhece e usa vocabulario B2 com precisao em contextos academicos, profissionais e jornalisticos, incluindo stance, hedging e colocacoes formais.',
    }),
    reading: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.reading,
      passingScore: 80,
      format: 'Two texts — journalistic and academic/analytical — with inferential, stance and discourse-structure questions',
      focus: 'Implicit meaning, author stance and tone, argument structure, vocabulary in context, hedging identification and cross-text comparison at full B2 authenticity.',
      tasks: Object.freeze([
        'Read a near-authentic journalistic article on a global or cultural issue: answer gist, detail, vocabulary-in-context and tone questions with textual evidence.',
        'Read a short academic-style essay: map the discourse structure (thesis, argument, concession, conclusion) and identify the authors stance and hedging choices.',
        'Answer 4 deep inference questions requiring interpretation of implicit meaning, irony, or implied critique without literal translation.',
        'Compare both texts on a shared theme and identify differences in stance, register and rhetorical choices using textual evidence.',
      ]),
      passDescriptor: 'Entende textos autenticos B2 com nuance, inferencia profunda e analise de estrutura argumentativa sem depender de traducao.',
    }),
    listening: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.listening,
      passingScore: 76,
      format: 'Two audios — debate or interview and academic presentation — first attempt without transcript',
      focus: 'Main argument, specific detail, hedging identification, discourse organisation signals, speaker stance and register at natural B2 pace.',
      tasks: Object.freeze([
        'First listen to a short interview or debate segment: identify the central argument of each participant, any point of agreement and the overall register.',
        'Second listen: capture specific examples of hedging, advanced grammar structures and stance markers used by the speakers.',
        'Listen to an academic or professional presentation: complete a structured outline with introduction claim, three supporting points and conclusion.',
        'Identify how speakers signal transitions, concessions and conclusions linguistically and explain the function of two signposting expressions they use.',
      ]),
      passDescriptor: 'Entende falas naturais B2 em debates, entrevistas e apresentacoes, capta nuances de stance e hedging e acompanha a organizacao do discurso oral.',
    }),
    speaking: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.speaking,
      passingScore: 72,
      requiresReview: true,
      format: 'Recorded oral performance + AI or teacher review',
      focus: 'Argument coherence, use of full B2 grammar range (hypothetical, inversion, hedging, advanced modals), stance vocabulary, discourse organisation and register appropriacy.',
      tasks: Object.freeze([
        'Record a 90 to 120 second structured argument on a media, global or professional topic using a clear introduction, at least two supporting points and a conclusion.',
        'Use at least three B2 grammar structures naturally (hedging, hypothetical language, nominalisation or inversion) without forced insertion.',
        'Deploy stance vocabulary to signal your position (arguably, it would seem, in light of, what is particularly striking is) and at least one concession.',
        'Answer two follow-up questions demonstrating flexibility of register and ability to synthesise: On balance... / The evidence seems to suggest... / What I find most relevant is...',
      ]),
      rubric: Object.freeze({
        grammarRange: 25,
        vocabularyUse: 25,
        fluencyCoherence: 20,
        taskCompletion: 20,
        pronunciationIntelligibility: 10,
      }),
      passDescriptor: 'Apresenta e defende argumentos em ingles B2 com fluencia, precisao gramatical, variedade lexical e coesao discursiva em registros formais e semi-formais.',
    }),
    writing: Object.freeze({
      weight: LEVEL_MASTERY_WEIGHTS.writing,
      passingScore: 76,
      requiresReview: true,
      format: 'Two written tasks — analytical essay or report and professional/academic email — with AI or teacher review',
      focus: 'Discourse organisation, hedging, academic and professional vocabulary, complex grammar range, register consistency and argumentative coherence at full B2 level.',
      tasks: Object.freeze([
        'Write a structured analytical paragraph or short essay of 140 to 170 words on a global or professional topic, with clear thesis, two supporting arguments with hedging and a conclusion.',
        'Write a professional or academic email of 110 to 140 words presenting a position or recommendation, using nominalisation, formal collocations and at least one hedged claim.',
        'Use discourse organisation signals throughout both texts (firstly, furthermore, however, as a consequence, in conclusion) to create cohesion across paragraphs.',
        'Complete a self-review checklist before submission: formal register maintained, hedging present, nominalisation used, advanced grammar accurate, discourse connectors varied and appropriate.',
      ]),
      rubric: Object.freeze({
        grammarRange: 25,
        vocabularyUse: 25,
        organisation: 25,
        taskCompletion: 15,
        mechanics: 10,
      }),
      passDescriptor: 'Escreve textos B2 coesos e precisos com variedade gramatical avancada, vocabulario academico-profissional e organizacao discursiva clara em registros formais.',
    }),
  }),
});

export function getB2Checkpoint(checkpointId) {
  return B2_CHECKPOINTS.find((c) => c.id === checkpointId) || null;
}

export function getB2CheckpointAverage(scores = {}) {
  const values = B2_CHECKPOINTS.map((c) => Number(scores[c.id] ?? 0)).filter((s) => Number.isFinite(s));
  if (!values.length) return 0;
  return Math.round(values.reduce((sum, s) => sum + s, 0) / values.length);
}

export function evaluateB2FinalGate({ lessonCompletionPercent = 0, checkpointScores = {}, finalExamPillarScores = {}, speakingReviewed = false, writingReviewed = false } = {}) {
  return evaluateLevelAdvancement({
    lessonCompletionPercent,
    checkpointAveragePercent: getB2CheckpointAverage(checkpointScores),
    finalExamPillarScores,
    speakingReviewed,
    writingReviewed,
  });
}

export function getB2FinalExamReadiness({ lessonCompletionPercent = 0, checkpointScores = {} } = {}) {
  const checkpointAveragePercent = getB2CheckpointAverage(checkpointScores);
  const issues = [];
  if (lessonCompletionPercent < 100) issues.push('Concluir 100% das aulas B2 antes da prova final.');
  if (checkpointAveragePercent < 80) issues.push('Atingir media minima de 80% nos checkpoints B2.');
  return Object.freeze({ ready: issues.length === 0, checkpointAveragePercent, issues });
}
