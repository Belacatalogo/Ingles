import { createGrammarLesson, createVocabularyLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'B1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['b1-5', 'work', 'study', 'professional', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const B1_DEEP_WORK_STUDY_PART1 = Object.freeze([

  // ─── GRAMMAR-012: Passive voice ───────────────────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B1-GRAMMAR-012',
    order: 12,
    title: 'Passive voice: present and past simple',
    objectives: [
      'Formar a voz passiva no presente simples: is/are + past participle.',
      'Formar a voz passiva no passado simples: was/were + past participle.',
      'Entender quando usar a voz passiva (agente desconhecido, óbvio ou irrelevante).',
      'Usar "by" para introduzir o agente quando necessário.',
      'Transformar frases ativas em passivas e vice-versa.',
    ],
    teacherOpening: 'A voz passiva é essencial para textos formais, notícias, emails profissionais e apresentações. Em inglês de negócios, você vai ver e precisar usar frases como "the report was submitted", "the decision has been made" e "the project is being reviewed". Esta aula cobre as bases com precisão.',
    portugueseContrast: [task('Em Passive voice: present and past simple, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'No mundo profissional, a voz passiva é preferida quando o foco é na ação ou resultado, não em quem fez. "The meeting was cancelled" — não interessa quem cancelou. "The budget was approved" — o importante é o resultado.',
    differenceFromA2: 'No A2: "Someone fixed the computer." No B1: "The computer was fixed." / "The computer was fixed by the IT team." A diferença é o registro, a precisão e a capacidade de focar no resultado.',
    grammarTable: {
      headers: ['Tempo', 'Forma ativa', 'Forma passiva', 'Exemplo passivo'],
      rows: [
        ['Present simple', 'People use this software.', 'is/are + pp', 'This software is used by millions of people.'],
        ['Past simple', 'The team launched the product.', 'was/were + pp', 'The product was launched last year.'],
        ['Present simple neg.', 'They don\'t include tax.', 'is/are not + pp', 'Tax is not included in the price.'],
        ['Past simple neg.', 'Nobody told him.', 'was/were not + pp', 'He was not told about the change.'],
        ['Question (present)', 'Do they pay overtime?', 'Is/Are + subject + pp?', 'Is overtime paid?'],
        ['Question (past)', 'Did they cancel the meeting?', 'Was/Were + subject + pp?', 'Was the meeting cancelled?'],
      ],
    },
    whenToUse: [
      'Quando o agente (quem faz a ação) é desconhecido: "The window was broken."',
      'Quando o agente é óbvio ou irrelevante: "The new policy was announced yesterday."',
      'Em textos formais, notícias e emails profissionais — o foco é no resultado.',
      'Para variar o estilo e evitar repetição do agente: "The project was approved, developed and launched within six months."',
    ],
    whenNotToUse: [
      'Não use passiva quando a frase ativa é mais natural e direta: "I will send you the report" — não "The report will be sent to you by me."',
      'Não omita "by + agente" quando a identidade de quem fez é importante: "The contract was signed by both parties."',
    ],
    teacherExamples: [
      'The report was submitted on time by the team.',
      'Mistakes were made during the implementation phase.',
      'The new system is used by all employees.',
      'Three candidates were interviewed for the position.',
      'The deadline was not met because of a technical issue.',
    ],
    commonBrazilianMistakes: [
      {
        wrong: 'The report was wrote by the manager.',
        right: 'The report was written by the manager.',
        explanation: '"Wrote" é o past simple de "write" — na passiva, use o past participle: "written".',
      },
      {
        wrong: 'The project is finished by us yesterday.',
        right: 'The project was finished by us yesterday.',
        explanation: '"Yesterday" indica passado — use "was/were", não "is/are".',
      },
      {
        wrong: 'He was told to him about the change.',
        right: 'He was told about the change.',
        explanation: 'Na passiva, o sujeito (he) já é o receptor da ação — não repita com "to him".',
      },
      {
        wrong: 'The meeting was cancelled by nobody.',
        right: 'The meeting was cancelled. / Nobody cancelled the meeting.',
        explanation: '"By nobody" não existe em inglês. Se não há agente, omita o "by".',
      },
    ],
    controlledPractice: [
      task(
        'Transforme para a voz passiva: "The manager approved the budget last week."',
        'Past simple passivo. Identifique sujeito, verbo e objeto antes de transformar.',
        'The budget was approved (by the manager) last week.'
      ),
      task(
        'Transforme para a voz passiva: "They use English in all international meetings."',
        'Present simple passivo. O agente "they" pode ser omitido.',
        'English is used in all international meetings.'
      ),
    ],
    errorCorrectionPractice: [
      task(
        'Corrija: "The new software was installed by the IT team yesterday and it works great."',
        'A frase passiva está correta — encontre se há algum erro ou se está OK.',
        'Correto. A frase passiva está formada corretamente: was + past participle + by + agente.'
      ),
      task(
        'Corrija: "The contracts were sended to all clients on Friday."',
        '"Sended" não existe.',
        'The contracts were sent to all clients on Friday.'
      ),
    ],
    translationPractice: [
      task(
        'Traduza: "O relatório foi enviado para todos os gerentes ontem."',
        'Past simple passivo. Agente não mencionado.',
        'The report was sent to all managers yesterday.'
      ),
      task(
        'Traduza: "Este sistema é usado em mais de 50 países."',
        'Present simple passivo. Sujeito é o sistema.',
        'This system is used in more than 50 countries.'
      ),
    ],
    productionTasks: [
      task(
        'Escreva 3 frases sobre o seu trabalho ou empresa usando a voz passiva. Use: is/are + pp (presente) e was/were + pp (passado).',
        'Foque em processos, resultados e decisões — não em pessoas específicas.',
        'Our products are sold in 20 countries. / The company was founded in 2005. / All employees are required to complete a quarterly review.'
      ),
      task(
        'Transforme as 3 frases ativas em passivas, omitindo o agente quando irrelevante: (1) "Our team reviews every application carefully." (2) "They promoted her in January." (3) "Someone deleted the file by mistake."',
        'Decida quando incluir ou omitir "by + agente".',
        '(1) Every application is reviewed carefully. (2) She was promoted in January. (3) The file was deleted by mistake.'
      ),
    ],
  }),

  // ─── GRAMMAR-013: Reported speech (statements) ────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B1-GRAMMAR-013',
    order: 13,
    title: 'Reported speech: statements',
    objectives: [
      'Transformar discurso direto em indireto (statements).',
      'Aplicar o backshift de tempos verbais corretamente.',
      'Mudar pronomes e expressões de tempo no discurso indireto.',
      'Usar "said" e "told" corretamente.',
      'Reconhecer quando o backshift pode ser omitido (reporting de fatos permanentes).',
    ],
    teacherOpening: 'Quando você conta o que alguém disse, você usa reported speech. "She told me she was working late." "He said the project had been delayed." É uma das estruturas mais usadas em contexto profissional, acadêmico e conversacional — e uma das que mais causa erros no B1 brasileiro.',
    portugueseContrast: [task('Em Reported speech: statements, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'Emails de follow-up, reuniões, relatórios, conversas informais — em todos esses contextos, você vai precisar relatar o que alguém disse. Sem reported speech preciso, você usa construções pesadas ou incorretas.',
    differenceFromA2: 'No A2: "He said: I am busy." (direto). No B1: "He said he was busy." / "She told me she had already sent the report." A diferença é a fluência e a capacidade de encadear informações de forma natural.',
    grammarTable: {
      headers: ['Discurso direto', 'Backshift', 'Discurso indireto'],
      rows: [
        ['"I work here."', 'present simple → past simple', 'She said she worked there.'],
        ['"I am working now."', 'present continuous → past continuous', 'He said he was working then.'],
        ['"I have finished."', 'present perfect → past perfect', 'She said she had finished.'],
        ['"I will send it."', 'will → would', 'He said he would send it.'],
        ['"I can help."', 'can → could', 'She said she could help.'],
        ['"I went yesterday."', 'past simple → past perfect', 'He said he had gone the day before.'],
      ],
    },
    whenToUse: [
      'Para relatar o que alguém disse — em emails, relatórios, conversas: "The manager said the deadline had been moved."',
      'Em narrativas e histórias: "She told me she had been looking for a new job."',
      'Em contextos formais: "The CEO stated that the company had exceeded its targets."',
    ],
    whenNotToUse: [
      'Não é necessário fazer backshift se você está relatando um fato ainda verdadeiro: "She said that the Earth orbits the Sun." (não "orbited")',
      'Quando o contexto de tempo é muito claro, o backshift pode ser omitido em inglês informal: "He said he\'s coming." (= está a caminho agora)',
    ],
    teacherExamples: [
      'She said she was preparing the presentation.',
      'He told me he had already submitted the application.',
      'The manager said the team would meet on Friday.',
      'They said they could complete the project by the end of the month.',
      'She told us she hadn\'t received any feedback yet.',
    ],
    commonBrazilianMistakes: [
      {
        wrong: 'She said me that she was busy.',
        right: 'She told me (that) she was busy. OR She said (that) she was busy.',
        explanation: '"Say" não aceita objeto indireto de pessoa diretamente. "Tell" sim: "tell + person". "Say" não: "say to me" é aceito mas menos natural.',
      },
      {
        wrong: 'He said that he will finish it tomorrow.',
        right: 'He said that he would finish it the next day.',
        explanation: 'Backshift obrigatório: "will" → "would". "Tomorrow" → "the next day" (expressão de tempo também muda).',
      },
      {
        wrong: 'She said she work there for 10 years.',
        right: 'She said she had worked there for 10 years.',
        explanation: 'Present perfect ("has worked") → past perfect ("had worked") no backshift.',
      },
      {
        wrong: 'They told that the project was delayed.',
        right: 'They said that the project was delayed. OR They told us that the project was delayed.',
        explanation: '"Tell" exige objeto de pessoa: "tell someone that...". Sem pessoa, use "say".',
      },
    ],
    controlledPractice: [
      task(
        'Transforme em reported speech: She said: "I have already spoken to the client."',
        'Present perfect → past perfect. Pronome "I" → "she".',
        'She said she had already spoken to the client.'
      ),
      task(
        'Transforme em reported speech: He told me: "I will call you back tomorrow."',
        '"Will" → "would". "Tomorrow" → "the next day". "You" → "me".',
        'He told me he would call me back the next day.'
      ),
    ],
    errorCorrectionPractice: [
      task(
        'Corrija: "She said me she was going to resign."',
        '"Said me" não existe.',
        'She told me she was going to resign.'
      ),
      task(
        'Corrija: "He said the meeting will start at 9."',
        '"Will" precisa de backshift se estamos relatando algo no passado.',
        'He said the meeting would start at 9.'
      ),
    ],
    translationPractice: [
      task(
        'Traduza: "Ela me disse que já tinha enviado o contrato."',
        'Past perfect no reported speech. "Told me".',
        'She told me she had already sent the contract.'
      ),
      task(
        'Traduza: "O gerente disse que a equipe ia se reunir na sexta."',
        '"Would meet" — backshift de "will meet".',
        'The manager said the team would meet on Friday.'
      ),
    ],
    productionTasks: [
      task(
        'Pense em 3 coisas que alguém te disse esta semana (real ou inventado). Escreva em reported speech.',
        'Use said e told me alternados.',
        'My colleague told me she had finished the first draft. My manager said the presentation would be on Thursday. A friend said he was thinking about changing jobs.'
      ),
      task(
        'Transforme o mini-diálogo em reported speech: Marcus: "I have been working on this for three days." Sofia: "I can help you finish it tomorrow."',
        'Dois backshifts diferentes: present perfect e can.',
        'Marcus said he had been working on it for three days. Sofia said she could help him finish it the next day.'
      ),
    ],
  }),

  // ─── VOCABULARY-009: Work and professional vocabulary ────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B1-VOCABULARY-009',
    order: 9,
    title: 'Work and professional vocabulary',
    objectives: [
      'Usar vocabulário preciso para descrever funções, responsabilidades e dinâmicas de trabalho.',
      'Reconhecer e usar phrasal verbs profissionais: take on, hand in, chase up, fall behind.',
      'Usar expressões de desempenho: meet targets, exceed expectations, be on track.',
      'Evitar confusões entre "colleague", "coworker", "boss", "supervisor", "line manager".',
    ],
    teacherOpening: 'Falar sobre trabalho exige vocabulário específico. Não basta dizer "I work" ou "my boss said" — você precisa de precisão. Esta aula cobre os termos profissionais mais frequentes no inglês B1, com foco em contextos reais de escritório, remoto e reuniões.',
    essentialWords: [
      { word: 'line manager', definition: 'superior imediato / gerente direto', example: 'My line manager reviews my performance every quarter.', brazilianNote: '"Line manager" é o superior direto. "Manager" é mais geral. "Boss" é informal.' },
      { word: 'colleague', definition: 'colega de trabalho', example: 'I have a meeting with my colleagues this afternoon.', brazilianNote: '"Colleague" é o termo neutro e profissional. "Coworker" é mais americano e informal. Nunca "workmate" em contexto formal.' },
      { word: 'take on', definition: 'assumir (responsabilidade, projeto, funcionário)', example: 'We\'re taking on three new members of staff next month.', brazilianNote: '"Take on" tem múltiplos usos: assumir uma tarefa, contratar uma pessoa, aceitar um desafio.' },
      { word: 'hand in', definition: 'entregar (documento, relatório, demissão)', example: 'Please hand in your report by Friday.', brazilianNote: '"Hand in" é o phrasal verb correto para entregar documentos. "Give in" não é aceito neste contexto.' },
      { word: 'chase up', definition: 'cobrar / fazer follow-up de algo pendente', example: 'I\'ll chase up the invoice if we don\'t hear back by tomorrow.', brazilianNote: '"Chase up" é o equivalente britânico de "follow up on". Muito comum em ambientes profissionais.' },
      { word: 'fall behind', definition: 'ficar para trás / atrasar-se', example: 'We\'re falling behind schedule on the new project.', brazilianNote: '"Fall behind" sempre sugere que algo deveria estar mais adiantado mas não está.' },
      { word: 'meet a deadline', definition: 'cumprir um prazo', example: 'The team managed to meet the deadline despite the technical issues.', brazilianNote: 'Collocação fixa: SEMPRE "meet a deadline", nunca "respect a deadline" ou "follow a deadline".' },
      { word: 'delegate', definition: 'delegar', example: 'A good manager knows when to delegate tasks.', brazilianNote: '"Delegate to" = delegar para alguém. Muito importante em inglês de gestão.' },
      { word: 'exceed expectations', definition: 'superar expectativas', example: 'Her performance exceeded expectations this quarter.', brazilianNote: '"Exceed" = superar/ir além. "Meet expectations" = atender ao esperado. "Fall short of expectations" = ficar abaixo.' },
      { word: 'be on track', definition: 'estar no caminho certo / dentro do cronograma', example: 'The project is on track to be completed by June.', brazilianNote: '"On track" é a expressão mais natural para dizer que algo está progredindo como planejado.' },
      { word: 'notice period', definition: 'período de aviso prévio', example: 'My notice period is one month.', brazilianNote: '"Notice period" = aviso prévio. "Hand in your notice" = pedir demissão formalmente.' },
      { word: 'probation period', definition: 'período de experiência / probatório', example: 'New employees complete a three-month probation period.', brazilianNote: '"Probation period" é o período de experiência — comum em contratos britânicos.' },
    ],
    chunks: [
      { chunk: 'I\'m responsible for...', meaning: 'Sou responsável por...', example: 'I\'m responsible for managing client accounts.' },
      { chunk: 'I report to...', meaning: 'Reporto-me a... / Meu superior é...', example: 'I report to the Head of Marketing.' },
      { chunk: 'I\'m currently working on...', meaning: 'Estou trabalhando atualmente em...', example: 'I\'m currently working on the Q3 budget review.' },
      { chunk: 'We\'re behind schedule on...', meaning: 'Estamos atrasados em...', example: 'We\'re behind schedule on the product launch.' },
      { chunk: 'I\'ll follow up on...', meaning: 'Farei follow-up em... / Vou verificar...', example: 'I\'ll follow up on the pending approvals.' },
      { chunk: 'Could you send me an update on...?', meaning: 'Você poderia me dar uma atualização sobre...?', example: 'Could you send me an update on the contract status?' },
    ],
    dangerousConfusions: [
      task(
        'Qual a diferença entre "resign" e "retire"? Use cada um numa frase.',
        '"Resign" = pedir demissão voluntariamente. "Retire" = aposentar-se (geralmente por idade).',
        'She resigned from her position last month. / He retired after 35 years with the company.'
      ),
      task(
        'Corrija se necessário: "I work since five years in this company."',
        'Presente perfeito para duração que continua. Preposição "for" para períodos de tempo.',
        'I have worked / I\'ve been working in this company for five years.'
      ),
      task(
        'Escolha: "She always ___ (makes/does) her best to ___ (meet/catch) every deadline."',
        '"Make" e "do" têm usos fixos. "Meet a deadline" é collocação fixa.',
        'She always does her best to meet every deadline.'
      ),
    ],
    miniDialogues: [
      {
        title: 'Talking about work responsibilities',
        lines: [
          'Interviewer: Could you tell me about your current role?',
          'Ana: Of course. I\'m responsible for managing a team of five people. I report to the Head of Operations.',
          'Interviewer: What are your main day-to-day responsibilities?',
          'Ana: I\'m mainly working on project planning and making sure we meet our deadlines. I also delegate tasks and chase up any pending items.',
          'Interviewer: And how is your current project progressing?',
          'Ana: We\'re on track to finish by the end of the month, though we\'ve had to take on some extra work this quarter.',
        ],
        focus: 'responsible for, report to, meet deadlines, delegate, chase up, on track, take on — all in natural interview context.',
      },
    ],
    productionTasks: [
      task(
        'Descreva o seu trabalho atual (ou inventado) em 3-4 frases. Use: responsible for, report to, currently working on, meet deadlines.',
        'Pense em cargo, equipe, tarefas diárias e um projeto atual.',
        'I\'m a project coordinator and I\'m responsible for tracking deliverables across three active projects. I report to the Operations Director. I\'m currently working on the implementation of a new client management system. The team is on track to meet the Q3 deadline.'
      ),
      task(
        'Você precisa atualizar seu gerente sobre um projeto. Escreva 3 frases usando: on track/behind schedule, meet the deadline, hand in.',
        'Uma atualização profissional e direta.',
        'We are slightly behind schedule on the report, but we expect to be back on track by Wednesday. The team is working extra hours to meet the Friday deadline. I will hand in the final version by Thursday evening.'
      ),
    ],
  }),

  // ─── SPEAKING-005: Describe your job or studies ───────────────────────────────
  createSpeakingLesson({
    ...common,
    id: 'B1-SPEAKING-005',
    order: 5,
    title: 'Describe your job or studies',
    objectives: [
      'Descrever função, responsabilidades, equipe e desafios profissionais.',
      'Usar linguagem profissional precisa (responsible for, report to, currently working on).',
      'Estruturar uma resposta de 90 segundos sobre trabalho ou estudos.',
      'Responder perguntas de entrevista sobre experiência e funções.',
    ],
    teacherOpening: 'Falar sobre trabalho ou estudos é uma das situações mais frequentes em inglês — entrevistas, eventos de networking, conversas informais. Esta aula te dá a estrutura e o vocabulário para fazer isso com confiança e profissionalismo.',
    speakingSituation: {
      context: 'You are at a professional networking event. Someone you have just met asks: "So, what do you do?" You have about 90 seconds to describe your role, responsibilities, team and current focus.',
      modelResponse: 'I work as a project manager at a tech company. I\'m responsible for coordinating a team of eight developers across two main products. I report to the Head of Product, and I usually work closely with the design and sales teams. In my day-to-day, I\'m mainly focused on making sure we meet our deadlines and that the team has everything they need to do their work. At the moment, I\'m working on the launch of a new feature — it\'s been challenging because we\'ve had to take on extra work this quarter. But the team is performing well and we\'re on track to deliver on time. I really enjoy the role because it combines strategic planning with hands-on problem solving.',
      responseLength: '~120 words — B1 model with job title, responsibilities, team, current project, and personal reflection.',
    },
    modelPhrases: [
      'I work as a [job title] at...',
      'I\'m responsible for [+ gerúndio]...',
      'I report to [person/title].',
      'I work closely with [team/department].',
      'In my day-to-day, I mainly...',
      'At the moment, I\'m working on...',
      'It\'s been challenging because...',
      'The team is on track to...',
      'I really enjoy the role because...',
      'My main challenge at the moment is...',
      'I\'m studying [subject] at [institution].',
      'My course focuses on...',
    ],
    substitutionDrills: [
      {
        base: 'I\'m responsible for [managing client accounts].',
        substitutions: ['coordinating a team of ten', 'overseeing the marketing budget', 'training new staff', 'developing the product roadmap'],
      },
      {
        base: 'At the moment, I\'m working on [a product launch].',
        substitutions: [
          'a new client proposal',
          'my final year dissertation',
          'a process improvement project',
          'the annual performance reviews',
        ],
      },
    ],
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "I\'m responsible for coordinating a team of eight developers." Chunk: "I\'m reSPONsible for / coORdinating / a TEAM of EIGHT developers." Stress the key nouns.',
        '"At the moment, I\'m working on..." — link "at-the-moment" as one chunk. Stress MOMent and WORKing.',
        '"It\'s been challenging because..." — reduce "It\'s been" to /ɪtsbɪn/. Stress CHALlenging.',
        '"The team is on track to deliver on time." — practise the confident falling intonation of a positive status update.',
      ],
    },
    guidedSpeaking: [
      {
        prompt: 'Descreva o seu cargo e empresa (real ou inventado) em 2 frases.',
        support: 'I work as... at... / I\'m a... at...',
        timeLimit: '20 seconds',
      },
      {
        prompt: 'Descreva 3 responsabilidades principais usando "responsible for + gerúndio".',
        support: 'I\'m responsible for..., ..., and...',
        timeLimit: '30 seconds',
      },
      {
        prompt: 'Descreva um projeto ou desafio atual. Inclua: o que é, por que é difícil, e como está progredindo.',
        support: 'At the moment... / It\'s been challenging because... / We\'re on track to...',
        timeLimit: '40 seconds',
      },
    ],
    speakingChecklist: [
      'Mencionei cargo, empresa ou área de atuação?',
      'Descrevi pelo menos 2 responsabilidades específicas?',
      'Usei "responsible for + gerúndio" corretamente?',
      'Mencionei com quem trabalho ou a quem reporto?',
      'Descrevi um projeto ou desafio atual?',
      'Terminei com uma reflexão ou elemento pessoal?',
    ],
    recordingTasks: [
      {
        instruction: 'Grave uma resposta de 90 a 120 segundos para a pergunta: "Tell me about your current role." Inclua: (1) cargo e empresa, (2) responsabilidades, (3) equipe, (4) projeto ou desafio atual, (5) o que você gosta no trabalho.',
        minSeconds: 90,
        maxSeconds: 120,
        focus: 'Fluência, precisão de vocabulário profissional, estrutura completa.',
      },
    ],
    freeSpeaking: [
      'What would your ideal job look like? What responsibilities would you have?',
      'Describe a challenge you have faced at work or in your studies. How did you deal with it?',
      'Do you prefer working independently or as part of a team? Why?',
    ],
  }),

  // ─── WRITING-005: Write a professional email ──────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'B1-WRITING-005',
    order: 5,
    title: 'Write a professional email',
    objectives: [
      'Escrever emails profissionais com estrutura clara: assunto, abertura, corpo, encerramento.',
      'Usar registro semi-formal adequado para o ambiente de trabalho.',
      'Incluir vocabulário de follow-up, atualização e pedido de informação.',
      'Evitar erros de registro (muito informal) e erros estruturais comuns.',
    ],
    teacherOpening: 'O email profissional é uma das formas de escrita mais frequentes na vida real. Um email mal estruturado pode causar mal-entendidos ou parecer pouco profissional. Esta aula ensina como escrever com clareza, assertividade e o registro certo.',
    modelText: `Subject: Follow-up: Project Falcon — Status Update

Dear Mr Costa,

I hope this email finds you well.

I am writing to follow up on our meeting last Thursday regarding the Project Falcon deliverables. As discussed, the team is currently on track to complete the first phase by the end of this month.

However, I wanted to flag that we have encountered a minor delay in the testing stage due to a technical issue. We are working to resolve it and do not expect it to affect the overall deadline.

Could you please confirm whether the review meeting is still scheduled for the 28th? I would also appreciate it if you could send over the updated client brief when you have a chance.

Thank you for your continued support. I look forward to hearing from you.

Best regards,
Ana Ferreira
Project Coordinator`,
    modelTextBreakdown: [
      { note: 'Linha 1: Subject line — claro, específico, com projeto e tipo de comunicação.' },
      { note: '"Dear Mr Costa" — formal. Para semi-formal: "Hi Marcus," ou "Hello Mr Costa,". Nunca "Dear Sir/Madam" se você sabe o nome.' },
      { note: '"I hope this email finds you well" — abertura padrão formal. Semi-formal: "I hope you\'re well."' },
      { note: '"I am writing to follow up on..." — primeira frase do corpo: contexto e propósito imediatos.' },
      { note: '"As discussed" — referência a comunicação anterior. Profissional e eficiente.' },
      { note: '"I wanted to flag that..." — maneira educada de introduzir um problema ou alerta.' },
      { note: '"We are working to resolve it and do not expect it to affect..." — solução + tranquilização proativa.' },
      { note: '"Could you please confirm..." — pedido de confirmação. Formal e polido.' },
      { note: '"I would also appreciate it if you could..." — pedido adicional, muito formal. Semi-formal: "Could you also..."' },
      { note: '"I look forward to hearing from you" — encerramento padrão. Nunca "Waiting for your answer".' },
    ],
    commonWritingMistakes: [
      {
        wrong: 'Waiting for your answer.',
        right: 'I look forward to hearing from you.',
        explanation: '"Waiting for your answer" soa passivo-agressivo em inglês profissional. Use a expressão padrão de encerramento.',
      },
      {
        wrong: 'I am writing to you about the project.',
        right: 'I am writing to follow up on / to discuss / to request information about...',
        explanation: '"I am writing to you about" é vago. Seja específico sobre o propósito do email.',
      },
      {
        wrong: 'Dear Sir, I want to ask you...',
        right: 'Dear Mr Costa, I would like to ask... / Could you please...',
        explanation: '"I want" soa informal e direto demais. Use "I would like" ou "could you please" em emails formais.',
      },
      {
        wrong: 'Best, Ana',
        right: 'Best regards, / Kind regards, / Yours sincerely, (+ nome completo + cargo)',
        explanation: 'Em emails profissionais, sempre inclua uma assinatura completa com nome, cargo e empresa.',
      },
    ],
    revisionChecklist: [
      'O assunto é específico e informativo (não apenas "Question" ou "Follow-up")?',
      'A abertura menciona contexto ou reunião anterior quando relevante?',
      'O propósito do email está claro na primeira frase do corpo?',
      'Problemas ou alertas são introduzidos com linguagem suave ("I wanted to flag")?',
      'Pedidos usam "could you please" ou "I would appreciate it if"?',
      'O encerramento usa "I look forward to..." ou equivalente formal?',
      'A assinatura inclui nome, cargo e empresa?',
      'O registro é adequado — nem muito formal nem muito casual?',
    ],
    draftTask: task(
      'Escreva um email de follow-up de 100-140 palavras. Contexto: você teve uma reunião com um cliente na semana passada sobre uma proposta. A proposta foi enviada por email, mas você não recebeu resposta. Escreva um email educado perguntando se receberam e se têm algum feedback.',
      'Estrutura: assunto → abertura → contexto (reunião da semana passada) → pedido de feedback → encerramento.',
      'Email com Subject: Follow-up: [Nome do projeto] Proposal / Dear... / I am writing to follow up on our meeting... / I sent the proposal on [data] and wanted to check... / Could you please let me know... / I look forward to hearing from you.'
    ),
    revisionTask: task(
      'Revise o seu rascunho: (1) O assunto é específico? (2) Você usou "I want" em vez de "I would like"? (3) O encerramento está correto? (4) Há assinatura completa?',
      'Corrija qualquer registro muito informal e certifique-se de que o propósito está claro na primeira frase.',
      'Rascunho revisado com assunto específico, registro semi-formal consistente, encerramento correto e assinatura completa.'
    ),
    finalVersionTask: task(
      'Escreva a versão final limpa do email de follow-up.',
      'Sem marcas de rascunho. Mínimo 100 palavras. Use o checklist antes de finalizar.',
      'Email final profissional com estrutura: assunto → saudação → contexto → pedido → encerramento → assinatura.'
    ),
  }),

]);

export const B1_DEEP_WORK_STUDY_PART1_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(B1_DEEP_WORK_STUDY_PART1.filter(l => l.type === 'grammar')),
  vocabulary: Object.freeze(B1_DEEP_WORK_STUDY_PART1.filter(l => l.type === 'vocabulary')),
  reading: Object.freeze([]),
  listening: Object.freeze([]),
  speaking: Object.freeze(B1_DEEP_WORK_STUDY_PART1.filter(l => l.type === 'speaking')),
  writing: Object.freeze(B1_DEEP_WORK_STUDY_PART1.filter(l => l.type === 'writing')),
  checkpoint: Object.freeze([]),
});
