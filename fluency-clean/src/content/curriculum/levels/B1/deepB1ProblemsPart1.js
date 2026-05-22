import { createGrammarLesson, createVocabularyLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'B1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['b1-4', 'problems', 'advice', 'decisions', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const B1_DEEP_PROBLEMS_PART1 = Object.freeze([

  // ─── GRAMMAR-009: Second Conditional ─────────────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B1-GRAMMAR-009',
    order: 9,
    title: 'Second Conditional: If I were you, I would...',
    objectives: [
      'Formar o Second Conditional: if + past simple / would + infinitivo.',
      'Entender que o Second Conditional expressa situações hipotéticas ou irreais.',
      'Usar "If I were you..." para dar conselhos.',
      'Distinguir Second Conditional do First Conditional (hipotético vs possível).',
      'Evitar "would" na cláusula if.',
    ],
    teacherOpening: 'O Second Conditional é a estrutura do conselho, do sonho e do hipotético. Quando você diz "If I had more time, I would learn another language", você está imaginando uma realidade alternativa — não a sua realidade atual. Esta aula vai te ensinar a dominar essa estrutura com precisão.',
    portugueseContrast: [task('Em Second Conditional: If I were you, I would..., observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'O Second Conditional aparece em conselhos ("If I were you, I would talk to your manager"), em sonhos pessoais, em situações de entrevista e em quase todo texto argumentativo B1+. Sem ele, você não consegue discutir alternativas hipotéticas.',
    differenceFromA2: 'No A2: "What do you want?" / "I want to travel." No B1: "If I had more money, I would travel to Japan every year." A diferença é a capacidade de criar mundos hipotéticos com estrutura gramatical precisa.',
    grammarTable: {
      headers: ['Cláusula', 'Forma verbal', 'Exemplo'],
      rows: [
        ['if-clause (condição)', 'if + past simple', 'If I had more time...'],
        ['main clause (resultado)', 'would + infinitivo', '...I would exercise every day.'],
        ['negativa (if-clause)', 'if + did not / didn\'t', 'If I didn\'t work so much...'],
        ['negativa (main clause)', 'wouldn\'t + infinitivo', '...I wouldn\'t feel so tired.'],
        ['pergunta', 'What would you do if...?', 'What would you do if you lost your job?'],
        ['conselho clássico', 'If I were you, I would...', 'If I were you, I would speak to her directly.'],
      ],
    },
    whenToUse: [
      'Situações hipotéticas no presente ou futuro que são improváveis ou imaginárias.',
      'Dar conselhos usando "If I were you, I would...".',
      'Imaginar mundos alternativos: "If I lived in London, I would visit the museums every weekend."',
      'Discutir o que você faria em situações que não são a sua realidade atual.',
    ],
    whenNotToUse: [
      'Não use para situações possíveis ou prováveis — use o First Conditional: "If it rains tomorrow, I will take an umbrella."',
      'Não use "would" na cláusula if: ERRADO — "If I would have money." CERTO — "If I had money."',
    ],
    teacherExamples: [
      'If I were the president, I would reduce taxes for small businesses.',
      'What would you do if you won the lottery?',
      'If I were you, I would not accept that job offer.',
      'She would travel more if she had more holiday days.',
      'If we didn\'t have to work, we would spend all day at the beach.',
    ],
    commonBrazilianMistakes: [
      {
        wrong: 'If I would have more money, I would travel.',
        right: 'If I had more money, I would travel.',
        explanation: '"Would" nunca vai na cláusula if. Só na cláusula principal.',
      },
      {
        wrong: 'If I would be you, I would apologise.',
        right: 'If I were you, I would apologise.',
        explanation: '"If I were you" é a forma fixa — note "were", não "was", mesmo para I/he/she.',
      },
      {
        wrong: 'If I had more time, I will go to the gym.',
        right: 'If I had more time, I would go to the gym.',
        explanation: 'No Second Conditional, a cláusula principal usa "would", não "will".',
      },
      {
        wrong: 'I would go if I would know the way.',
        right: 'I would go if I knew the way.',
        explanation: 'Novamente: "would" nunca entra na cláusula if.',
      },
    ],
    controlledPractice: [
      task(
        'Complete com a forma correta: "If she ___ (have) a car, she ___ (not take) the bus."',
        'Use past simple na cláusula if, would + infinitivo na cláusula principal.',
        'If she had a car, she wouldn\'t take the bus.'
      ),
      task(
        'Complete: "What ___ you ___ (do) if you ___ (lose) your phone?"',
        'Pergunta no Second Conditional.',
        'What would you do if you lost your phone?'
      ),
    ],
    errorCorrectionPractice: [
      task(
        'Corrija: "If I would live in the city centre, I would walk to work."',
        'Identifique o erro na cláusula if.',
        'If I lived in the city centre, I would walk to work.'
      ),
      task(
        'Corrija: "She will be happier if she had a better job."',
        'Dois tempos errados. Identifique e corrija.',
        'She would be happier if she had a better job.'
      ),
    ],
    translationPractice: [
      task(
        'Traduza: "Se eu fosse você, eu pediria um aumento."',
        'Use a expressão fixa "If I were you".',
        'If I were you, I would ask for a pay rise.'
      ),
      task(
        'Traduza: "O que você faria se não precisasse trabalhar?"',
        'Pergunta hipotética no Second Conditional.',
        'What would you do if you didn\'t need to work?'
      ),
    ],
    productionTasks: [
      task(
        'Escreva 3 frases sobre o que você faria se tivesse mais tempo livre. Use o Second Conditional.',
        'Exemplos: hobbyies, viagens, aprendizado.',
        'If I had more free time, I would learn to play the guitar / travel to South Korea / read one book a week.'
      ),
      task(
        'Um amigo está estressado com o trabalho. Dê 2 conselhos usando "If I were you, I would...".',
        'Conselhos práticos e realistas.',
        'If I were you, I would talk to your manager about the workload. If I were you, I would also try to leave work on time at least twice a week.'
      ),
    ],
  }),

  // ─── GRAMMAR-010: Modal verbs for advice ─────────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B1-GRAMMAR-010',
    order: 10,
    title: 'Modal verbs for advice: should, ought to, had better',
    objectives: [
      'Usar "should" e "shouldn\'t" para dar conselhos gerais.',
      'Reconhecer "ought to" como equivalente formal de "should".',
      'Usar "had better" para conselhos urgentes com consequência implícita.',
      'Distinguir "should" (geral), "ought to" (formal/moral), "had better" (urgente/aviso).',
      'Evitar erros com "to" após modais.',
    ],
    teacherOpening: 'Quando alguém te conta um problema, você precisa saber como graduar o seu conselho. "You should rest more" é neutro. "You had better see a doctor" é urgente. Esta aula ensina a diferença entre esses três modais de conselho.',
    portugueseContrast: [task('Em Modal verbs for advice: should, ought to, had better, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'Dar e pedir conselhos é uma das situações mais frequentes em inglês — trabalho, saúde, relacionamentos, decisões. Sem esses modais, você soa evasivo ou impreciso.',
    differenceFromA2: 'No A2: "Maybe you can try..." ou "Why don\'t you...?" No B1: "You should reconsider that decision." / "You ought to apologise." / "You had better call him before it\'s too late." Cada um com peso e registro diferente.',
    grammarTable: {
      headers: ['Modal', 'Registro', 'Sentido', 'Exemplo'],
      rows: [
        ['should', 'neutro/informal', 'conselho geral', 'You should get more sleep.'],
        ['shouldn\'t', 'neutro/informal', 'conselho negativo', 'You shouldn\'t eat so late.'],
        ['ought to', 'formal/moral', 'obrigação moral leve', 'You ought to apologise to her.'],
        ['had better', 'informal/urgente', 'aviso — consequência implícita', 'You had better leave now or you\'ll miss the train.'],
        ['had better not', 'informal/urgente', 'aviso negativo', 'You had better not ignore this email.'],
        ['might want to', 'suave/diplomático', 'sugestão delicada', 'You might want to reconsider that offer.'],
      ],
    },
    whenToUse: [
      '"should" — conselho cotidiano, neutro, sem julgamento: "You should talk to your manager."',
      '"ought to" — quando há uma dimensão moral ou formal: "You ought to return the money."',
      '"had better" — quando há urgência ou consequência implícita: "You had better call them now."',
      '"might want to" — para sugestões diplomáticas em contexto profissional.',
    ],
    whenNotToUse: [
      'Não use "had better to" — ERRADO: "You had better to leave." CERTO: "You had better leave."',
      'Não use "should to" — ERRADO: "You should to study." CERTO: "You should study."',
      'Não use "must" para dar conselhos — soa como ordem. Prefira "should".',
    ],
    teacherExamples: [
      'You should back up your files before updating the system.',
      'She ought to let her team know about the change in plans.',
      'You had better arrive early — the interviewer is strict about punctuality.',
      'They had better not cancel the meeting again or the client will lose patience.',
      'You might want to double-check those figures before sending the report.',
    ],
    commonBrazilianMistakes: [
      {
        wrong: 'You should to see a doctor.',
        right: 'You should see a doctor.',
        explanation: 'Modais (should, must, can, will) são sempre seguidos de infinitivo sem "to".',
      },
      {
        wrong: 'You had better to leave now.',
        right: 'You had better leave now.',
        explanation: '"Had better" também é seguido de infinitivo sem "to".',
      },
      {
        wrong: 'You must to rest more.',
        right: 'You must rest more.',
        explanation: '"Must" também não leva "to" — e costuma soar como ordem, não conselho.',
      },
      {
        wrong: 'You should apologise, no? (usando "no?" como tag)',
        right: 'You should apologise, shouldn\'t you?',
        explanation: 'Tag questions com modais: "should you?" negativo → "shouldn\'t you?". Nunca use "no?" em inglês formal.',
      },
    ],
    controlledPractice: [
      task(
        'Complete com o modal mais adequado (should / had better / ought to): "You ___ see a doctor — that cough has lasted three weeks."',
        '"had better" indica urgência/consequência. "should" e "ought to" também são aceitáveis mas menos urgentes.',
        'You had better see a doctor — that cough has lasted three weeks.'
      ),
      task(
        'Complete: "As a manager, she ___ (ought to) listen to her team\'s feedback more carefully."',
        'Dimensão profissional/moral → "ought to".',
        'As a manager, she ought to listen to her team\'s feedback more carefully.'
      ),
    ],
    errorCorrectionPractice: [
      task(
        'Corrija: "You had better to apologise before it\'s too late."',
        '"had better" não leva "to".',
        'You had better apologise before it\'s too late.'
      ),
      task(
        'Corrija: "You should to eat less sugar if you want to feel better."',
        '"should" não leva "to".',
        'You should eat less sugar if you want to feel better.'
      ),
    ],
    translationPractice: [
      task(
        'Traduza: "Você deveria falar com o seu chefe sobre isso."',
        'Conselho neutro → "should".',
        'You should talk to your manager about this.'
      ),
      task(
        'Traduza: "É melhor você não esquecer de enviar o relatório."',
        'Urgência/aviso → "had better not".',
        'You had better not forget to send the report.'
      ),
    ],
    productionTasks: [
      task(
        'Um colega está trabalhando demais e parece exausto. Dê 3 conselhos usando should, ought to e had better — um cada.',
        'Varie o grau de urgência em cada conselho.',
        'You should try to delegate some tasks. You ought to speak to HR about your workload. You had better take at least one day off this week before you burn out.'
      ),
      task(
        'Escreva 2 conselhos para alguém que quer melhorar o inglês — um positivo e um negativo.',
        'Use "should" e "shouldn\'t".',
        'You should practise speaking every day, even for just 15 minutes. You shouldn\'t be afraid of making mistakes — they\'re part of learning.'
      ),
    ],
  }),

  // ─── VOCABULARY-007: Problem and solution vocabulary ─────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B1-VOCABULARY-007',
    order: 7,
    title: 'Problem and solution vocabulary',
    objectives: [
      'Usar verbos-chave para descrever problemas: face, deal with, struggle with, cope with.',
      'Usar verbos para apresentar soluções: overcome, resolve, tackle, address, manage.',
      'Reconhecer expressões para pedir e dar conselhos.',
      'Evitar confusões entre "problem", "issue", "trouble" e "difficulty".',
    ],
    teacherOpening: 'Problemas acontecem em todos os contextos — trabalho, família, saúde, finanças. Para falar sobre eles em inglês com precisão, você precisa de vocabulário específico. Esta aula cobre os verbos, expressões e padrões mais usados ao descrever e resolver problemas no B1.',
    essentialWords: [
      { word: 'face a problem', definition: 'enfrentar um problema', example: 'She is facing a serious issue at work.', brazilianNote: '"Encarar um problema" — nunca "confront a problem" no sentido cotidiano.' },
      { word: 'deal with', definition: 'lidar com / tratar de', example: 'I need to deal with this complaint immediately.', brazilianNote: '"Dar conta de" ou "lidar com" — muito mais natural que "treat with".' },
      { word: 'struggle with', definition: 'ter dificuldade com / lutar contra', example: 'He struggles with public speaking.', brazilianNote: '"Ter dificuldade com" — implica esforço sem sucesso garantido.' },
      { word: 'cope with', definition: 'lidar com / aguentar', example: 'How do you cope with stress?', brazilianNote: '"Cope with" tem nuance emocional — sobreviver a uma situação difícil.' },
      { word: 'overcome', definition: 'superar', example: 'She overcame her fear of flying.', brazilianNote: '"Overcome" = superar definitivamente. Diferente de "deal with" (lidar de forma contínua).' },
      { word: 'resolve', definition: 'resolver (formalmente)', example: 'We need to resolve this conflict before it escalates.', brazilianNote: '"Resolve" é mais formal que "solve" para problemas interpessoais ou profissionais.' },
      { word: 'tackle', definition: 'enfrentar / atacar um problema', example: 'The government needs to tackle unemployment.', brazilianNote: '"Tackle" implica ação ativa e direta. Muito usado em inglês formal.' },
      { word: 'address', definition: 'abordar / tratar de um problema', example: 'The report addresses the main challenges.', brazilianNote: '"Address" é o verbo mais neutro e formal para "falar sobre/tratar de".' },
      { word: 'run into problems', definition: 'encontrar problemas / ter imprevistos', example: 'We ran into problems with the new software.', brazilianNote: 'Expressão verbal — "run into" = encontrar de forma inesperada.' },
      { word: 'come up with a solution', definition: 'encontrar/criar uma solução', example: 'Can you come up with a better solution?', brazilianNote: '"Come up with" = ter uma ideia ou encontrar algo. Muito frequente em inglês.' },
      { word: 'figure out', definition: 'descobrir / entender / resolver', example: 'I can\'t figure out why the system isn\'t working.', brazilianNote: '"Figure out" é informal mas muito usado. Equivale a "descobrir como fazer".' },
      { word: 'work out', definition: 'dar certo / resolver', example: 'Don\'t worry — it will work out in the end.', brazilianNote: '"Work out" como "dar certo" — diferente de "work out" (malhar).' },
    ],
    chunks: [
      { chunk: 'I\'m having trouble with...', meaning: 'Estou tendo dificuldade com...', example: 'I\'m having trouble with the new expenses system.' },
      { chunk: 'The main issue is...', meaning: 'O principal problema é...', example: 'The main issue is that we don\'t have enough budget.' },
      { chunk: 'What would you suggest?', meaning: 'O que você sugeriria?', example: 'I\'m not sure what to do. What would you suggest?' },
      { chunk: 'Have you tried...?', meaning: 'Você tentou...?', example: 'Have you tried restarting the system?' },
      { chunk: 'One option would be to...', meaning: 'Uma opção seria...', example: 'One option would be to hire a freelancer for the project.' },
      { chunk: 'The problem is that...', meaning: 'O problema é que...', example: 'The problem is that we\'ve already spent half the budget.' },
      { chunk: 'It might help to...', meaning: 'Poderia ajudar...', example: 'It might help to set a clear deadline for each task.' },
    ],
    dangerousConfusions: [
      task(
        'Qual a diferença entre "problem", "issue" e "trouble"? Escolha o mais adequado: "I\'m in ___ with my landlord." / "The ___ of climate change requires global action." / "The biggest ___ is the lack of communication."',
        '"trouble" = situação difícil ou conflito pessoal. "issue" = tema/problema que precisa ser discutido (mais formal). "problem" = obstáculo ou dificuldade em geral.',
        'trouble / issue / problem'
      ),
      task(
        'Corrija se necessário: "She overcomes with stress by exercising."',
        '"Overcome" é transitivo — não usa "with". "Cope with" é que leva "with".',
        'She copes with stress by exercising. OR She overcomes stress by exercising.'
      ),
      task(
        'Escolha: "We need to ___ (resolve/solve) this disagreement before the meeting."',
        '"Resolve" é mais adequado para conflitos e desentendimentos. "Solve" é mais usado para problemas técnicos ou matemáticos.',
        'We need to resolve this disagreement before the meeting.'
      ),
    ],
    miniDialogues: [
      {
        title: 'Dealing with a work problem',
        lines: [
          'Ana: I\'m really struggling with my new role. There\'s so much to manage and I keep running into problems.',
          'Ben: I know how you feel. Have you tried breaking the work into smaller tasks?',
          'Ana: Not really. I just can\'t figure out where to start.',
          'Ben: If I were you, I would talk to your manager. They might come up with a better structure for you.',
          'Ana: That\'s a good point. I had better address this before it gets worse.',
        ],
        focus: 'struggle with, run into problems, figure out, come up with, had better, address — all in natural context.',
      },
    ],
    productionTasks: [
      task(
        'Descreva um problema real ou inventado no trabalho ou na vida usando pelo menos 3 palavras/expressões desta aula.',
        'Use: I\'m struggling with... / I\'ve been dealing with... / I can\'t figure out... / I need to tackle...',
        'I\'ve been struggling with time management lately. I keep running into problems when I try to balance work and personal life. I need to come up with a better system — one option would be to use a weekly planner.'
      ),
      task(
        'Dê 2 conselhos para alguém que está tendo problemas com comunicação na equipe. Use should/had better + vocabulário desta aula.',
        'Varie os modais e os verbos de solução.',
        'You should address the issue directly with your colleague rather than avoiding it. You had better resolve it soon — the longer you wait, the worse it gets.'
      ),
    ],
  }),

  // ─── SPEAKING-004: Describe a problem and ask for advice ─────────────────────
  createSpeakingLesson({
    ...common,
    id: 'B1-SPEAKING-004',
    order: 4,
    title: 'Describe a problem and ask for advice',
    objectives: [
      'Descrever um problema claramente: contexto + detalhes + impacto.',
      'Pedir conselhos de forma natural e variada.',
      'Dar conselhos usando should, had better e Second Conditional.',
      'Manter uma conversa de conselho com turns completos.',
    ],
    teacherOpening: 'Falar sobre problemas e pedir conselhos é uma das situações mais reais do inglês cotidiano — você vai fazer isso com colegas, amigos, médicos e em entrevistas. Esta aula te dá a estrutura, o vocabulário e a confiança para fazer isso com fluência.',
    speakingSituation: {
      context: 'You have been at your current job for two years. Lately, you have been feeling overwhelmed by your workload and you don\'t sleep well. You feel like your manager doesn\'t notice how hard you work. You decide to talk to a trusted colleague, Sam, and ask for advice.',
      modelResponse: 'Sam, I\'ve been struggling with my workload lately. I\'m dealing with about three times the work I had last year, and I can\'t figure out how to manage it all. The main issue is that my manager doesn\'t seem to notice — I never get any feedback or recognition. I\'m even having trouble sleeping because of it. What would you suggest? Do you think I should talk to them directly, or is there a better way to tackle this? I\'m a bit worried about how they\'ll react, to be honest.',
      responseLength: '~120 words — B1 model with problem description, impact, emotional detail, and two advice-seeking questions.',
    },
    modelPhrases: [
      'I\'ve been struggling with... lately.',
      'The main issue is that...',
      'I\'m having trouble with...',
      'I keep running into problems when...',
      'I can\'t figure out how to...',
      'What would you suggest?',
      'Do you think I should...?',
      'What would you do if you were in my position?',
      'I\'m worried about...',
      'It might help to...',
      'If I were you, I would...',
      'Have you tried...?',
    ],
    substitutionDrills: [
      {
        base: 'I\'ve been struggling with [my workload] lately.',
        substitutions: ['the new software', 'my schedule', 'communication in my team', 'a difficult client'],
      },
      {
        base: 'What would you do if [your manager ignored your work]?',
        substitutions: [
          'you ran into this problem',
          'you couldn\'t cope with the stress',
          'you had to make this decision',
          'you were in my position',
        ],
      },
    ],
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "I\'ve been struggling with my workload lately." Chunk: "I\'ve been STRUGGling / with my WORKload / LATEly." Stress the content words.',
        '"What would you do if you were in my position?" — practise the rising intonation on "position" to signal a genuine question.',
        '"If I were you, I would..." — reduce "I would" to "I\'d": /aɪd/. Keep the rhythm natural.',
        '"The main issue is that..." — stress MAIN and ISSue; weaken "is that" to connect smoothly to the explanation.',
      ],
    },
    guidedSpeaking: [
      {
        prompt: 'Descreva um problema em 3 frases: (1) qual é o problema, (2) há quanto tempo existe, (3) qual o impacto.',
        support: 'I\'ve been having... / The main issue is... / Because of this, I... / As a result...',
        timeLimit: '30 seconds',
      },
      {
        prompt: 'Peça conselhos a um colega de 3 formas diferentes: pergunta direta, pergunta hipotética, pedido de sugestão.',
        support: 'Should I...? / What would you do if...? / What would you suggest?',
        timeLimit: '30 seconds',
      },
      {
        prompt: 'Dê 2 conselhos usando: um com "should" e um com "If I were you, I would..."',
        support: 'Grade urgency: neutral vs hypothetical.',
        timeLimit: '30 seconds',
      },
    ],
    speakingChecklist: [
      'Descrevi o problema com contexto suficiente (não apenas "I have a problem at work")?',
      'Mencionei o impacto do problema (emocional, prático)?',
      'Usei pelo menos 2 expressões de problema desta unidade?',
      'Fiz perguntas de pedido de conselho de formas diferentes?',
      'Dei conselhos com grau de urgência variado (should vs had better)?',
      'Mantive turnos de conversa naturais (não apenas monólogos)?',
    ],
    recordingTasks: [
      {
        instruction: 'Grave uma fala de 90 a 120 segundos descrevendo um problema real ou inventado. Inclua: (1) descrição do problema, (2) impacto, (3) dois pedidos de conselho. Depois, grave você mesmo dando os conselhos.',
        minSeconds: 90,
        maxSeconds: 120,
        focus: 'Fluência, vocabulário de problema e conselho, estrutura completa.',
      },
    ],
    freeSpeaking: [
      'Think about a time when you had to ask someone for advice. What was the problem? What advice did you receive? Was it helpful?',
      'What do you do when you have a difficult decision to make? Do you ask for advice or prefer to decide alone?',
      'Is it easier for you to give advice or receive advice? Why?',
    ],
  }),

  // ─── WRITING-004: Give written advice ────────────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'B1-WRITING-004',
    order: 4,
    title: 'Write a piece of advice: email or message',
    objectives: [
      'Escrever um email ou mensagem de conselho com estrutura clara.',
      'Usar should, ought to, had better e Second Conditional.',
      'Incorporar vocabulário de problema e solução.',
      'Criar uma resposta empática e profissional.',
    ],
    teacherOpening: 'Dar conselhos por escrito requer mais estrutura do que falar. Você precisa reconhecer o problema, dar conselhos claros e terminar com encorajamento. Esta aula mostra como fazer isso em 120-150 palavras com um inglês B1 preciso e natural.',
    modelText: `Hi Marcus,

I understand how stressful this situation must be. Dealing with a heavy workload while trying to maintain quality is genuinely difficult, and it sounds like you are coping with a lot right now.

If I were you, I would start by speaking to your manager directly. You should explain the situation clearly — including the impact it is having on your work and wellbeing. Sometimes managers are simply unaware of the pressure their team is under.

You ought to also consider prioritising your tasks. Not everything is equally urgent. You had better identify the two or three most important things each day and focus on those first.

Finally, don\'t be afraid to say no to new tasks if your plate is already full. You might want to suggest a meeting to discuss your workload more formally.

I hope this helps. Good luck!

Best,
Laura`,
    modelTextBreakdown: [
      { note: 'Linha 1-2: abertura empática — reconhece o problema antes de dar qualquer conselho.' },
      { note: '"Dealing with... coping with a lot" — vocabulário de problema natural e preciso.' },
      { note: '"If I were you, I would..." — Second Conditional para conselho hipotético.' },
      { note: '"You should explain..." — conselho direto e neutro.' },
      { note: '"Sometimes managers are simply unaware..." — justifica o conselho com raciocínio.' },
      { note: '"You ought to also consider..." — conselho com dimensão profissional/moral.' },
      { note: '"You had better identify..." — urgência leve com consequência implícita.' },
      { note: '"You might want to suggest..." — sugestão diplomática para contexto profissional.' },
      { note: 'Parágrafo final: encorajamento — "don\'t be afraid to", "I hope this helps".' },
      { note: 'Extensão: 148 palavras — dentro da faixa B1 de 120-150 palavras.' },
    ],
    commonWritingMistakes: [
      {
        wrong: 'I think you should to speak to your manager.',
        right: 'I think you should speak to your manager.',
        explanation: '"Should" não leva "to" — erro clássico por interferência do português.',
      },
      {
        wrong: 'You had better to identify your priorities.',
        right: 'You had better identify your priorities.',
        explanation: '"Had better" também é seguido de infinitivo sem "to".',
      },
      {
        wrong: 'If I were you, I will talk to HR.',
        right: 'If I were you, I would talk to HR.',
        explanation: 'No Second Conditional, a cláusula principal usa "would", não "will".',
      },
      {
        wrong: 'I hope you solve your problem soon.',
        right: 'I hope things work out for you soon.',
        explanation: '"I hope you solve your problem" soa mecânico. Use expressões mais naturais de encorajamento.',
      },
    ],
    revisionChecklist: [
      'Reconheci o problema antes de dar conselhos (abertura empática)?',
      'Usei pelo menos 3 modais de conselho diferentes (should, ought to, had better)?',
      'Incluí pelo menos um Second Conditional?',
      'Usei vocabulário de problema desta unidade (deal with, struggle with, cope with)?',
      'Justifiquei pelo menos um conselho com um raciocínio?',
      'Terminei com encorajamento natural?',
      'A extensão está entre 120 e 150 palavras?',
      'Revisei erros de "should to" e "had better to"?',
    ],
    draftTask: task(
      'Um amigo te enviou uma mensagem dizendo que está pensando em mudar de emprego mas não sabe se é a hora certa — está com medo de arriscar. Escreva uma resposta de 120-150 palavras dando pelo menos 3 conselhos.',
      'Use: should / ought to / had better / If I were you / vocabulário desta unidade.',
      'Resposta modelo usa abertura empática + 3 conselhos graduados + encorajamento final.'
    ),
    revisionTask: task(
      'Releia o seu rascunho e responda: (1) Usei pelo menos 3 modais? (2) Há algum erro de "should to" ou "had better to"? (3) A abertura é empática ou começa diretamente com conselhos?',
      'Corrija qualquer erro encontrado e certifique-se de que a abertura reconhece o sentimento do amigo antes dos conselhos.',
      'Rascunho revisado com abertura empática, 3+ modais corretos, sem erro de "to" após modal.'
    ),
    finalVersionTask: task(
      'Escreva a versão final limpa da sua resposta ao amigo.',
      'Sem rascunho visível. Mínimo 120 palavras. Use o checklist de revisão antes de finalizar.',
      'Versão final com estrutura: abertura empática → conselho 1 → conselho 2 → conselho 3 → encorajamento.'
    ),
  }),

]);

export const B1_DEEP_PROBLEMS_PART1_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(B1_DEEP_PROBLEMS_PART1.filter(l => l.type === 'grammar')),
  vocabulary: Object.freeze(B1_DEEP_PROBLEMS_PART1.filter(l => l.type === 'vocabulary')),
  reading: Object.freeze([]),
  listening: Object.freeze([]),
  speaking: Object.freeze(B1_DEEP_PROBLEMS_PART1.filter(l => l.type === 'speaking')),
  writing: Object.freeze(B1_DEEP_PROBLEMS_PART1.filter(l => l.type === 'writing')),
  checkpoint: Object.freeze([]),
});
