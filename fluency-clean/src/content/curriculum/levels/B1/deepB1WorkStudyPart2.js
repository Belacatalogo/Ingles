import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson } from '../../../schemas/index.js';

const level = 'B1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['b1-5', 'work', 'study', 'professional', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function q(question, answer, evidence = '', why = '') { return { question, answer, evidence, why }; }

export const B1_DEEP_WORK_STUDY_PART2 = Object.freeze([

  // ─── GRAMMAR-014: Reported speech (questions and requests) ────────────────────
  createGrammarLesson({
    ...common,
    id: 'B1-GRAMMAR-014',
    order: 14,
    title: 'Reported speech: questions and requests',
    objectives: [
      'Transformar perguntas de yes/no em discurso indireto com "if" ou "whether".',
      'Transformar perguntas com wh- em discurso indireto com ordem normal de frase.',
      'Transformar pedidos e instruções em discurso indireto com "asked/told + to-infinitive".',
      'Aplicar backshift de tempos verbais em perguntas indiretas.',
      'Evitar o erro de manter a ordem de pergunta no discurso indireto.',
    ],
    teacherOpening: 'Na aula anterior, você aprendeu a relatar afirmações. Agora vamos relatar perguntas e pedidos — uma das partes mais difíceis do reported speech porque a ordem das palavras muda completamente. "She asked where the meeting was." — não "where was the meeting".',
    whyItMatters: 'Relatar perguntas e pedidos é essencial em contextos profissionais: "The client asked whether we could deliver by Friday." / "She told me to send the report immediately." Sem essa estrutura, você usa construções literais que soam estranhas ou incorretas.',
    differenceFromA2: 'No A2: "She said: Where is the manager?" No B1: "She asked where the manager was." A diferença é a eliminação da ordem invertida de pergunta e o uso correto de if/whether para yes/no questions.',
    grammarTable: {
      headers: ['Tipo', 'Discurso direto', 'Discurso indireto', 'Nota'],
      rows: [
        ['Yes/No question', '"Are you coming?"', 'She asked if/whether I was coming.', 'if ou whether — sem "?" no final'],
        ['Wh- question', '"What time does it start?"', 'He asked what time it started.', 'ordem normal: sujeito + verbo'],
        ['Wh- question', '"Where did you go?"', 'She asked where I had gone.', 'backshift: went → had gone'],
        ['Request (positive)', '"Please close the door."', 'She asked me to close the door.', 'asked + person + to-infinitive'],
        ['Request (negative)', '"Don\'t be late."', 'He told me not to be late.', 'told + person + not to-infinitive'],
        ['Instruction', '"Send the report immediately."', 'She told him to send the report immediately.', 'told = mais direto que asked'],
      ],
    },
    whenToUse: [
      '"if/whether" para yes/no questions — ambos corretos; "whether" é mais formal.',
      'Ordem normal (sujeito + verbo) para todas as perguntas indiretas — NUNCA ordem invertida.',
      '"asked + person + to-infinitive" para pedidos.',
      '"told + person + to-infinitive" para instruções/ordens mais diretas.',
    ],
    whenNotToUse: [
      'Nunca use ordem de pergunta no reported speech: ERRADO — "She asked where was the manager." CERTO — "She asked where the manager was."',
      'Nunca use "that" após "asked": ERRADO — "She asked that if I was coming." CERTO — "She asked if I was coming."',
      'Nunca use "?" no final de uma pergunta indireta: ERRADO — "He asked where I worked?" CERTO — "He asked where I worked."',
    ],
    teacherExamples: [
      'The manager asked whether the report was ready.',
      'She asked me what I thought about the proposal.',
      'He wanted to know how long the project would take.',
      'She asked me to prepare a summary for the meeting.',
      'He told me not to share the information before the announcement.',
    ],
    commonBrazilianMistakes: [
      {
        wrong: 'She asked where was the office.',
        right: 'She asked where the office was.',
        explanation: 'No discurso indireto, a ordem é sempre sujeito + verbo — nunca a ordem invertida de pergunta.',
      },
      {
        wrong: 'He asked me that if I could help.',
        right: 'He asked me if I could help.',
        explanation: '"That" não se usa antes de "if/whether" em perguntas indiretas.',
      },
      {
        wrong: 'She told me don\'t leave early.',
        right: 'She told me not to leave early.',
        explanation: 'Pedido negativo: "told/asked + person + not to + infinitive".',
      },
      {
        wrong: 'He asked when will the results be ready?',
        right: 'He asked when the results would be ready.',
        explanation: 'Sem "?" no final. Backshift: "will" → "would". Ordem: sujeito + verbo.',
      },
    ],
    controlledPractice: [
      task(
        'Transforme em reported speech: "Do you have the updated figures?" (The manager asked...)',
        'Yes/no question → if/whether + backshift.',
        'The manager asked if I had the updated figures.'
      ),
      task(
        'Transforme em reported speech: "Please don\'t share this with the team yet." (She told me...)',
        'Pedido negativo → told + person + not to + infinitive.',
        'She told me not to share it with the team yet.'
      ),
    ],
    errorCorrectionPractice: [
      task(
        'Corrija: "He asked where did I see the report."',
        'Ordem de pergunta no discurso indireto.',
        'He asked where I had seen the report.'
      ),
      task(
        'Corrija: "She asked me that whether the client had confirmed."',
        '"That" antes de "whether".',
        'She asked me whether the client had confirmed.'
      ),
    ],
    translationPractice: [
      task(
        'Traduza: "O cliente perguntou se poderíamos entregar até sexta-feira."',
        'Yes/no question com "whether". Backshift: can → could.',
        'The client asked whether we could deliver by Friday.'
      ),
      task(
        'Traduza: "Ela me pediu para enviar o relatório antes das 17h."',
        'Pedido positivo: asked + person + to-infinitive.',
        'She asked me to send the report before 5 p.m.'
      ),
    ],
    productionTasks: [
      task(
        'Você participou de uma reunião hoje. Relate 3 coisas que foram perguntadas ou pedidas, usando asked if, asked what/when/where, asked to, told to.',
        'Varie os tipos de reported speech.',
        'The manager asked whether the project was on track. She asked what our main challenges were. She also told us to prepare a brief for next week\'s presentation.'
      ),
      task(
        'Transforme o mini-diálogo: Client: "Can you deliver this by Friday?" / Manager: "When exactly do you need it?" / Client: "Please send a draft first."',
        'Três tipos: yes/no question, wh-question, request.',
        'The client asked if we could deliver it by Friday. The manager asked when exactly they needed it. The client asked us to send a draft first.'
      ),
    ],
  }),

  // ─── READING-005: Work/study article ─────────────────────────────────────────
  createReadingLesson({
    ...common,
    id: 'B1-READING-005',
    order: 5,
    title: 'Reading: The hybrid work revolution',
    objectives: [
      'Ler um artigo sobre trabalho híbrido com compreensão de argumento e detalhe.',
      'Identificar benefícios e desafios apresentados pelo autor.',
      'Inferir o ponto de vista do autor a partir da linguagem usada.',
      'Praticar vocabulário de trabalho profissional em contexto.',
    ],
    preReading: {
      question: 'Do you work or study from home? What do you think are the advantages and disadvantages of hybrid work?',
      vocabularyPreview: ['hybrid', 'commute', 'collaboration', 'productivity', 'boundary'],
    },
    mainText: `The hybrid work revolution: has it lived up to the promise?

When the pandemic forced millions of workers to operate from home, many predicted it would be a temporary disruption. Instead, it triggered a lasting transformation in the way we work. Today, hybrid working — splitting time between home and office — has become the standard for knowledge workers across many industries.

The benefits are well-documented. Employees report higher satisfaction when they can control their schedules, eliminate long commutes, and work in environments that suit their personal productivity rhythms. Studies suggest that, for tasks requiring deep focus, working from home can be significantly more productive than a noisy open-plan office.

However, hybrid work is not without its challenges. Many employees — particularly younger ones at the start of their careers — report feeling disconnected from their teams. Mentoring is harder to deliver remotely. Spontaneous collaboration, the kind that happens naturally when people share a physical space, is difficult to replicate on a screen.

There is also the question of boundaries. When home becomes office, it can be difficult to switch off. Research from several countries suggests that remote workers often log longer hours than their in-office counterparts, blurring the line between professional and personal life.

The consensus among HR professionals is that hybrid work, done well, requires intentional design. Companies need to think carefully about which tasks benefit from in-person collaboration and which can be done just as well — or better — remotely. The future of work is not a binary choice between office and home, but a thoughtful blend of both.`,
    vocabulary: [
      task(
        'Encontre no segundo parágrafo o substantivo que significa "deslocamento diário para o trabalho".',
        'Palavra mais específica que "travel to work".',
        'commute'
      ),
      task(
        'O que significa "open-plan office" no contexto do segundo parágrafo?',
        'Inferência de contexto — relacionado com ruído e produtividade.',
        'Um escritório sem divisórias individuais — espaço aberto compartilhado por muitas pessoas, o que pode ser barulhento.'
      ),
      task(
        'No quarto parágrafo, o que significa "blurring the line between professional and personal life"?',
        'Expressão figurativa — "blur" = borrar/apagar.',
        'Apagar a distinção entre vida profissional e pessoal — a fronteira entre as duas se torna pouco clara.'
      ),
    ],
    comprehensionQuestions: [
      q(
        'According to the text, what was the original prediction about working from home?',
        'It was predicted to be a temporary disruption — not a lasting change.',
        'Many predicted it would be a temporary disruption.',
        'The text uses "instead" to signal the prediction was wrong, setting up the argument.'
      ),
      q(
        'What three specific benefits of hybrid work are mentioned in the second paragraph?',
        '(1) Higher satisfaction from controlling schedules. (2) Eliminating long commutes. (3) Working in personally productive environments.',
        'Employees report higher satisfaction when they can control their schedules, eliminate long commutes, and work in environments that suit their personal productivity rhythms.',
        'All three benefits are listed in a single sentence — precise identification is required.'
      ),
      q(
        'Who is said to be particularly affected by the disconnect issue in hybrid work?',
        'Younger employees at the start of their careers.',
        'Many employees — particularly younger ones at the start of their careers — report feeling disconnected from their teams.',
        'The parenthetical qualifier is the key detail here.'
      ),
      q(
        'What does the research mentioned in the fourth paragraph suggest about remote workers\' hours?',
        'Remote workers often work longer hours than those in the office.',
        'Remote workers often log longer hours than their in-office counterparts.',
        '"Log longer hours" means to record/work more hours than expected.'
      ),
      q(
        'What is the main conclusion of the text about the future of hybrid work?',
        'Hybrid work requires intentional design — companies need to decide which tasks benefit from in-person collaboration vs remote work. It is not a binary choice but a thoughtful blend.',
        'The future of work is not a binary choice between office and home, but a thoughtful blend of both.',
        'This is the text\'s closing argument — a nuanced, non-extreme position.'
      ),
    ],
    guidedSummary: {
      instruction: 'Escreva um resumo de 3-4 frases. Inclua: (1) o tema, (2) os benefícios principais, (3) os desafios principais, (4) a conclusão do autor.',
      modelAnswer: 'The text discusses the growth of hybrid working and its impact on employees and companies. The main benefits include higher satisfaction, eliminating commutes, and improved focus for deep work. However, challenges include reduced mentoring, less spontaneous collaboration, and difficulty maintaining work-life boundaries. The author concludes that hybrid work requires careful design to be effective, rather than simply choosing between office and home.',
    },
    productionTask: task(
      'Escreva 3-4 frases respondendo: "What are the main advantages and disadvantages of hybrid work in your experience or opinion?"',
      'Use vocabulário do texto: commute, productivity, collaboration, boundaries, on balance.',
      'In my experience, hybrid work reduces commuting time significantly, which improves work-life balance. However, I find that collaboration is harder — spontaneous discussions that happen naturally in the office are difficult to replicate remotely. The main challenge for me is maintaining boundaries, as I often work later when I\'m at home. On balance, a well-designed hybrid model seems like the best approach.'
    ),
  }),

  // ─── LISTENING-005: Work-related conversation ─────────────────────────────────
  createListeningLesson({
    ...common,
    id: 'B1-LISTENING-005',
    order: 5,
    title: 'Listening: Starting a new job',
    objectives: [
      'Compreender uma conversa sobre experiência profissional e adaptação a um novo cargo.',
      'Identificar reported speech e voz passiva em uso natural.',
      'Reconhecer expressões de trabalho desta unidade em contexto.',
      'Praticar shadowing de padrões de linguagem profissional.',
    ],
    transcript: [
      'Interviewer: So, tell me about your current role.',
      'Leo: Of course. I\'m currently working as a team lead at a software company. I\'m responsible for managing a team of seven developers.',
      'Interviewer: And how long have you been in that role?',
      'Leo: About two years. I was promoted from senior developer after the project I was leading exceeded expectations.',
      'Interviewer: What does your day-to-day involve?',
      'Leo: I\'m mainly focused on making sure we meet our deadlines and that the team has everything they need. I also handle most of the client communication.',
      'Interviewer: Have you ever had to deal with a difficult situation at work?',
      'Leo: Yes, definitely. Last year, we fell behind schedule on a major product launch. I had to bring the team together and figure out how to get back on track.',
      'Interviewer: And what did you do?',
      'Leo: I delegated tasks more clearly, set shorter milestones, and chased up any blockers every morning. The manager asked whether we could still deliver on time, and I told her we would.',
      'Interviewer: Were you able to meet the original deadline?',
      'Leo: We handed in the final version two days late, but the client said they were satisfied with the quality. On balance, it was a difficult but valuable experience.',
      'Interviewer: What would you say is your greatest strength in this role?',
      'Leo: I think it\'s my ability to stay calm under pressure. If I had panicked when we fell behind, I would have made things worse.',
    ],
    comprehensionQuestions: [
      q(
        'What is Leo\'s current job title and main responsibility?',
        'Team lead — responsible for managing a team of seven developers.',
        'I\'m currently working as a team lead... I\'m responsible for managing a team of seven developers.',
        'Direct identification of role and responsibility from the transcript.'
      ),
      q(
        'Why was Leo promoted?',
        'Because the project he was leading exceeded expectations.',
        'I was promoted from senior developer after the project I was leading exceeded expectations.',
        '"Exceeded expectations" — passive + vocabulary from this unit.'
      ),
      q(
        'What problem did Leo face last year?',
        'The team fell behind schedule on a major product launch.',
        'Last year, we fell behind schedule on a major product launch.',
        '"Fall behind schedule" — core vocabulary from this unit in natural use.'
      ),
      q(
        'What three actions did Leo take to get the project back on track?',
        '(1) Delegated tasks more clearly. (2) Set shorter milestones. (3) Chased up any blockers every morning.',
        'I delegated tasks more clearly, set shorter milestones, and chased up any blockers every morning.',
        'Reported in sequence — three distinct actions.'
      ),
      q(
        'Find one example of reported speech in the transcript. What was said originally?',
        '"The manager asked whether we could still deliver on time." Original: "Can you still deliver on time?" / "I told her we would." Original: "We will deliver on time."',
        'The manager asked whether we could still deliver on time, and I told her we would.',
        'Reported speech in natural professional context — backshift: can → could, will → would.'
      ),
    ],
    vocabulary: [
      task(
        'Leo says "I chased up any blockers every morning." What does "blockers" mean in this professional context?',
        'Inferência de contexto profissional.',
        '"Blockers" são obstáculos ou problemas que impedem o progresso de uma tarefa ou projeto — termo muito comum em contextos de tecnologia e gestão ágil.'
      ),
      task(
        'What is the difference between "hand in" (used by Leo) and "submit"?',
        'Registro e contexto.',
        '"Hand in" é semi-formal/informal — mais comum em conversas. "Submit" é mais formal — usado em contextos académicos e profissionais escritos. Ambos significam entregar.'
      ),
      task(
        'Leo says "On balance, it was a difficult but valuable experience." What does this phrase signal?',
        '"On balance" como marcador de conclusão.',
        '"On balance" sinaliza que Leo está chegando a uma conclusão geral depois de considerar os aspectos positivos e negativos — como "no geral" ou "levando tudo em conta".'
      ),
    ],
    shadowing: [
      task(
        'I\'m responsible for managing a team of seven developers.',
        'Padrão: "responsible for + gerúndio" — entonação cai em "managing" e "developers". Muito usado em contextos profissionais.',
      ),
      task(
        'The manager asked whether we could still deliver on time.',
        'Reported speech com "whether" — tom de incerteza em "could still". Pausa natural após "whether".',
      ),
      task(
        'If I had panicked when we fell behind, I would have made things worse.',
        'Third Conditional — pausa natural após "panicked". Ênfase em "would have made things worse" como consequência evitada.',
      ),
    ],
    oralProduction: task(
      'Imagine que você é Leo. Grave uma resposta de 60-90 segundos para a pergunta "Tell me about a time when you had to solve a difficult problem at work." Inclua: (1) o problema, (2) as ações que você tomou, (3) o resultado, (4) o que você aprendeu.',
      'Use: fell behind / took on / delegated / chased up / on track / on balance / Third Conditional para reflexão.',
      'Last year, we fell behind schedule on a major product launch. I had to act quickly — I delegated tasks more clearly, set shorter milestones, and chased up any blockers daily. We ended up delivering two days late, but the client was satisfied. If I had reacted earlier, we would have met the original deadline. On balance, it taught me a lot about managing pressure and keeping communication clear.'
    ),
  }),

  // ─── VOCABULARY-010: Study and academic vocabulary ────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B1-VOCABULARY-010',
    order: 10,
    title: 'Study and academic vocabulary',
    objectives: [
      'Usar vocabulário correto para descrever tarefas, processos e avaliações acadêmicas.',
      'Distinguir "assignment", "essay", "dissertation" e "thesis" por contexto e nível.',
      'Usar phrasal verbs e expressões de estudo: look up, take notes, hand in, do research.',
      'Evitar a confusão britânica vs americana em "revise" e confusões com "learn" vs "study".',
    ],
    teacherOpening: 'Falar sobre estudos em inglês exige mais do que "I study English". Esta aula cobre o vocabulário académico e de aprendizado que você vai precisar para falar sobre cursos, tarefas, avaliações e o processo de estudar com precisão e naturalidade.',
    essentialWords: [
      { word: 'assignment', definition: 'tarefa / trabalho escolar', example: 'I have three assignments to complete before the end of term.', brazilianNote: '"Assignment" é o termo geral para qualquer tarefa académica — mais formal que "homework" (que é para ensino básico/médio).' },
      { word: 'essay', definition: 'redação / dissertação curta', example: 'We have to write a 1,500-word essay on climate change.', brazilianNote: '"Essay" é tipicamente um texto argumentativo de nível universitário — diferente de "redação" de escola básica.' },
      { word: 'dissertation', definition: 'dissertação (projeto final de graduação)', example: 'She spent six months writing her dissertation on urban planning.', brazilianNote: '"Dissertation" = TCC ou monografia de graduação no sistema britânico. Americano usa "thesis" para o mesmo nível.' },
      { word: 'submit', definition: 'entregar (formalmente, em contexto académico)', example: 'Please submit your assignment by midnight on Friday.', brazilianNote: '"Submit" é mais formal que "hand in" — preferido em contextos universitários e digitais (submit online).' },
      { word: 'revise', definition: 'revisar para prova (BrE) / corrigir um texto (AmE)', example: 'I spent all weekend revising for the exam. (BrE)', brazilianNote: 'CUIDADO: no inglês britânico, "revise" = estudar para provas. No americano, "review" = revisar matéria. Ambos podem significar também corrigir um texto.' },
      { word: 'take notes', definition: 'tomar notas / anotar', example: 'I always take notes during lectures.', brazilianNote: 'Sempre "take notes" — nunca "make notes" (embora aceito em alguns contextos) e nunca "do notes".' },
      { word: 'do research', definition: 'fazer pesquisa', example: 'She did extensive research before writing her essay.', brazilianNote: '"Do research" — nunca "make research". Collocação fixa.' },
      { word: 'look up', definition: 'consultar / pesquisar (palavra, informação)', example: 'If you don\'t know a word, look it up in a dictionary.', brazilianNote: '"Look up" = consultar em dicionário, internet ou referência. Separável: "look it up", nunca "look up it".' },
      { word: 'citation', definition: 'citação (referência académica)', example: 'All citations must follow the APA style.', brazilianNote: '"Citation" = referência bibliográfica formal. "Quote" = trecho citado diretamente. Diferença sutil mas importante em contextos académicos.' },
      { word: 'feedback', definition: 'retorno / comentários avaliativos', example: 'The professor gave detailed feedback on my essay.', brazilianNote: '"Feedback" em inglês é sempre uncountable: "some feedback", "a piece of feedback" — nunca "a feedback".' },
      { word: 'deadline', definition: 'prazo final', example: 'The deadline for the application is next Monday.', brazilianNote: 'Collocação: "meet a deadline", "miss a deadline", "extend a deadline". Nunca "respect a deadline".' },
      { word: 'credit', definition: 'crédito académico / reconhecimento', example: 'This module is worth 30 credits.', brazilianNote: '"Credits" no sistema americano/britânico equivalem a unidades de carga horária. "Full credit" = nota máxima em alguns contextos.' },
    ],
    chunks: [
      { chunk: 'I\'m in my [first/second/final] year of...', meaning: 'Estou no [primeiro/segundo/último] ano de...', example: 'I\'m in my final year of a Business degree.' },
      { chunk: 'My course focuses on...', meaning: 'O meu curso é focado em...', example: 'My course focuses on international trade and logistics.' },
      { chunk: 'I have a deadline coming up for...', meaning: 'Tenho um prazo chegando para...', example: 'I have a deadline coming up for my marketing assignment.' },
      { chunk: 'I\'m struggling with...', meaning: 'Estou tendo dificuldade com...', example: 'I\'m struggling with the statistical analysis section.' },
      { chunk: 'I got good/useful feedback on...', meaning: 'Recebi bom retorno sobre...', example: 'I got really useful feedback on my last essay.' },
      { chunk: 'I need to look into... more carefully.', meaning: 'Preciso investigar... com mais cuidado.', example: 'I need to look into the financial data more carefully before submitting.' },
    ],
    dangerousConfusions: [
      task(
        'Qual a diferença entre "study" e "learn"? Complete: "I ___ Portuguese every evening." / "I ___ a lot from that experience."',
        '"Study" = dedicar-se ativamente ao aprendizado. "Learn" = adquirir conhecimento ou habilidade (pode ser activo ou passivo).',
        'I study Portuguese every evening. / I learned a lot from that experience.'
      ),
      task(
        'Corrija se necessário: "She made a research about climate change for her dissertation."',
        'Collocação errada com "research".',
        'She did research on climate change for her dissertation.'
      ),
      task(
        'Qual a diferença entre "revise" (BrE) e "review" (AmE) neste contexto: "I need to ___ for the exam tomorrow."?',
        'No inglês britânico, "revise" = estudar/rever matéria para prova. No americano, o equivalente é "review (my notes)".',
        'BrE: I need to revise for the exam. / AmE: I need to review (my notes) for the exam.'
      ),
    ],
    miniDialogues: [
      {
        title: 'Talking about university work',
        lines: [
          'Mia: How\'s your course going?',
          'Sam: Pretty well, but I\'m struggling with the dissertation. I have no idea how to structure it.',
          'Mia: Have you spoken to your supervisor? They can give you feedback before you submit.',
          'Sam: Not yet. I\'ve been doing a lot of research, but I keep missing my self-imposed deadlines.',
          'Mia: I know the feeling. When\'s the actual deadline?',
          'Sam: End of June. If I don\'t start writing this week, I\'m going to fall really behind.',
        ],
        focus: 'dissertation, struggling, feedback, submit, research, deadlines, fall behind — academic vocabulary in natural conversation.',
      },
    ],
    productionTasks: [
      task(
        'Descreva o seu curso ou área de estudo atual (real ou inventado) em 3-4 frases. Use: in my [year] year of, my course focuses on, I\'m working on, deadline.',
        'Inclua o que você está estudando, um projeto atual e um desafio.',
        'I\'m in my second year of an International Business degree. My course focuses on trade law, finance, and cross-cultural communication. At the moment, I\'m working on a group assignment about supply chain disruption. We have a deadline at the end of the month and I\'m a bit behind on my section.'
      ),
      task(
        'Um amigo te pergunta: "How do you prepare for exams?" Escreva uma resposta de 3-4 frases usando: take notes, do research, look up, revise/review, feedback.',
        'Descreva o seu processo de estudo real ou ideal.',
        'I usually start by reviewing my notes from the lectures and doing extra research on the topics I\'m less confident about. I look up any terms I don\'t understand and add them to a vocabulary list. I also find it really useful to read feedback from previous assignments — it helps me understand what the professor expects.'
      ),
    ],
  }),

]);

export const B1_DEEP_WORK_STUDY_PART2_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(B1_DEEP_WORK_STUDY_PART2.filter(l => l.type === 'grammar')),
  vocabulary: Object.freeze(B1_DEEP_WORK_STUDY_PART2.filter(l => l.type === 'vocabulary')),
  reading: Object.freeze(B1_DEEP_WORK_STUDY_PART2.filter(l => l.type === 'reading')),
  listening: Object.freeze(B1_DEEP_WORK_STUDY_PART2.filter(l => l.type === 'listening')),
  speaking: Object.freeze([]),
  writing: Object.freeze([]),
  checkpoint: Object.freeze([]),
});
