import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson } from '../../../schemas/index.js';

const level = 'B1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['b1-4', 'problems', 'advice', 'decisions', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function q(question, answer, evidence = '', why = '') { return { question, answer, evidence, why }; }

export const B1_DEEP_PROBLEMS_PART2 = Object.freeze([

  // ─── GRAMMAR-011: Third Conditional ──────────────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B1-GRAMMAR-011',
    order: 11,
    title: 'Third Conditional: If I had known, I would have...',
    objectives: [
      'Formar o Third Conditional: if + past perfect / would have + past participle.',
      'Entender que o Third Conditional fala de situações irreais no passado.',
      'Expressar arrependimento e especulação sobre o passado.',
      'Distinguir Second Conditional (hipotético presente/futuro) do Third (irreal passado).',
      'Evitar "If I would have..." — o erro mais comum no B1 brasileiro.',
    ],
    teacherOpening: 'O Third Conditional é a estrutura do "e se..." no passado — quando você imagina como as coisas poderiam ter sido diferentes. "If I had studied harder, I would have passed." A situação não aconteceu. É irreal. Esta aula te ensina a construir essa estrutura com precisão.',
    portugueseContrast: [task('Em Third Conditional: If I had known, I would have..., observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'O Third Conditional aparece em conversas sobre arrependimentos, decisões passadas, erros de trabalho, histórias e análises. Sem ele, você não consegue falar sobre o passado hipotético — uma das funções mais sofisticadas do inglês B1.',
    differenceFromA2: 'No A2: "I didn\'t study and I failed." No B1+: "If I had studied, I wouldn\'t have failed. I regret not preparing better." A diferença é a capacidade de criar contra-factuals — imaginar o que teria acontecido se algo tivesse sido diferente.',
    grammarTable: {
      headers: ['Cláusula', 'Forma verbal', 'Exemplo'],
      rows: [
        ['if-clause (condição irreal passada)', 'if + past perfect (had + pp)', 'If I had known about the meeting...'],
        ['main clause (resultado irreal passado)', 'would have + past participle', '...I would have prepared a presentation.'],
        ['negativa (if-clause)', 'if + hadn\'t + pp', 'If I hadn\'t missed the train...'],
        ['negativa (main clause)', 'wouldn\'t have + pp', '...I wouldn\'t have been late.'],
        ['pergunta', 'What would you have done if...?', 'What would you have done if you had known earlier?'],
        ['misto (Third + Second)', 'If + past perfect / would + infinitive', 'If I had taken that job, I would be living in Berlin now.'],
      ],
    },
    whenToUse: [
      'Situações que NÃO aconteceram no passado — imaginar a alternativa.',
      'Expressar arrependimento: "If I had listened to your advice, things would have been different."',
      'Analisar consequências de decisões passadas: "If we had left earlier, we wouldn\'t have missed the flight."',
      'Especular sobre o passado de outras pessoas ou situações históricas.',
    ],
    whenNotToUse: [
      'Não use para situações hipotéticas no presente/futuro — use o Second Conditional.',
      'Não use "If I would have" — é o erro mais grave no Third Conditional. SEMPRE "If I had".',
      'Não confunda com "I wish I had..." (outra estrutura para arrependimento, mais curta).',
    ],
    teacherExamples: [
      'If I had studied harder, I would have got a better grade.',
      'She wouldn\'t have quit the job if they had offered her a pay rise.',
      'What would you have done if you had been in my position?',
      'If we hadn\'t taken the risk, we wouldn\'t have built the company.',
      'He would have been promoted if he had shown more initiative.',
    ],
    commonBrazilianMistakes: [
      {
        wrong: 'If I would have studied more, I would have passed.',
        right: 'If I had studied more, I would have passed.',
        explanation: '"Would" NUNCA vai na cláusula if — nem no Second nem no Third Conditional.',
      },
      {
        wrong: 'If I knew earlier, I would have helped you.',
        right: 'If I had known earlier, I would have helped you.',
        explanation: 'O Third Conditional exige past perfect (had + pp) na cláusula if — não simple past.',
      },
      {
        wrong: 'I would have gone if I will have time.',
        right: 'I would have gone if I had had time.',
        explanation: '"Had had" — sim, dois "had". O primeiro é o auxiliar do past perfect, o segundo é o verbo principal.',
      },
      {
        wrong: 'If she had studied, she would pass.',
        right: 'If she had studied, she would have passed.',
        explanation: 'Third Conditional exige "would HAVE + pp" na cláusula principal — não "would + infinitivo".',
      },
    ],
    controlledPractice: [
      task(
        'Complete: "If they ___ (invest) earlier, the company ___ (grow) faster."',
        'Past perfect na if-clause; would have + pp na main clause.',
        'If they had invested earlier, the company would have grown faster.'
      ),
      task(
        'Complete: "What ___ you ___ (do) if you ___ (receive) that email?"',
        'Pergunta no Third Conditional.',
        'What would you have done if you had received that email?'
      ),
    ],
    errorCorrectionPractice: [
      task(
        'Corrija: "If I would have known, I would have told you."',
        'Erro na cláusula if.',
        'If I had known, I would have told you.'
      ),
      task(
        'Corrija: "If she had prepared better, she would pass the interview."',
        'Erro na cláusula principal — Third Conditional exige "would have + pp".',
        'If she had prepared better, she would have passed the interview.'
      ),
    ],
    translationPractice: [
      task(
        'Traduza: "Se eu tivesse aceitado aquela oferta de emprego, eu teria me mudado para Londres."',
        'Past perfect na if-clause; would have + pp na main clause.',
        'If I had accepted that job offer, I would have moved to London.'
      ),
      task(
        'Traduza: "O que você teria feito se soubesse da verdade desde o início?"',
        'Pergunta no Third Conditional — atenção ao "desde o início" como contexto, não como parte da estrutura.',
        'What would you have done if you had known the truth from the beginning?'
      ),
    ],
    productionTasks: [
      task(
        'Escreva 2 frases sobre uma decisão real ou inventada no passado que poderia ter sido diferente. Use o Third Conditional.',
        'Pense em uma escolha profissional, educacional ou pessoal.',
        'If I had applied for that course, I would have changed careers much earlier. / If we hadn\'t worked so hard in the first year, the project wouldn\'t have succeeded.'
      ),
      task(
        'Responda: "What would you have done if you hadn\'t chosen your current career?" (2-3 frases)',
        'Use o Third Conditional para imaginar a alternativa + Second Conditional para o presente hipotético resultante.',
        'If I hadn\'t chosen this career, I would probably have studied design. I would have been working in a creative agency now. I might have been happier with the work-life balance, to be honest.'
      ),
    ],
  }),

  // ─── READING-004: A dilemma text ─────────────────────────────────────────────
  createReadingLesson({
    ...common,
    id: 'B1-READING-004',
    order: 4,
    readingStrategy: [
      task('Antes de ler: pense numa decisão difícil de carreira que você (ou alguém próximo) enfrentou. O que pesou mais: segurança ou oportunidade?', 'Conecta o tema à sua experiência (predição).'),
      task('Primeira leitura (gist): leia rápido e responda — o texto defende correr risco, jogar seguro, ou mostra os dois lados?', 'Gist da posição geral.'),
      task('Segunda leitura (detail): localize o que a psicologia da decisão diz sobre por que hesitamos; procure "loss", "gain", "paralysis".', 'Leitura por detalhe específico.'),
      task('Evidência: antes de responder, copie a frase do texto que sustenta cada resposta sobre a posição do autor.', 'Evidência textual.'),
    ],
    title: 'Reading: The career dilemma',
    objectives: [
      'Ler um texto sobre dilemas e decisões com compreensão de argumento.',
      'Identificar a posição do autor e os argumentos principais.',
      'Inferir significado de vocabulário de decisão no contexto.',
      'Resumir a posição do texto usando vocabulário próprio.',
    ],
    preReading: {
      question: 'Have you ever had to make a difficult decision about your career — take a risk or play it safe? What did you do?',
      vocabularyPreview: ['dilemma', 'weigh up', 'consequence', 'leap of faith', 'regret'],
    },
    mainText: `The career dilemma: risk or safety?

At some point in our professional lives, most of us face a moment when we have to choose between security and opportunity. We might receive a job offer that promises growth but requires leaving a stable, familiar role. Or we might consider starting our own business, knowing that failure is a real possibility.

Many people hesitate in these moments. The fear of making the wrong decision is often stronger than the excitement of a new opportunity. We weigh up the pros and cons, make lists, ask for advice — and sometimes still can't decide.

Psychologists who study decision-making argue that this paralysis is natural. The human brain is wired to avoid loss more than it seeks gain. In practical terms, this means we tend to stay in situations that feel safe, even when the potential reward of taking a risk is significantly greater.

However, research also shows that people regret inaction more than action in the long term. In other words, we are more likely to say "I wish I had tried" than "I wish I hadn't." This suggests that, when faced with a genuine opportunity, taking the leap might lead to fewer regrets — even if the outcome is not perfect.

Of course, not every risk is worth taking. The key is to weigh up the options carefully, consider the realistic consequences, and make an informed decision. But if you have already done all of that and still can't decide, perhaps that hesitation itself is a sign that you already know the answer.`,
    vocabulary: [
      task(
        'Encontre no texto a expressão que significa "analisar os prós e contras".',
        'Está no segundo parágrafo.',
        'weigh up the pros and cons'
      ),
      task(
        'Qual palavra no terceiro parágrafo significa "ficar paralisado/incapaz de decidir"?',
        'É um substantivo.',
        'paralysis'
      ),
      task(
        'No quarto parágrafo, o que significa "taking the leap"?',
        'Inferência de contexto — o texto fala de riscos e consequências.',
        'Arriscar / dar o salto / tomar uma decisão corajosa.'
      ),
    ],
    comprehensionQuestions: [
      q(
        'What are the two options people often face in a career dilemma, according to the text?',
        'Staying in a stable, familiar role OR taking a new opportunity that requires leaving security.',
        'We might receive a job offer that promises growth but requires leaving a stable, familiar role.',
        'The text frames the dilemma as security vs opportunity.'
      ),
      q(
        'According to psychologists, why do people tend to stay in safe situations?',
        'Because the brain is wired to avoid loss more than it seeks gain.',
        'The human brain is wired to avoid loss more than it seeks gain.',
        'This is the core psychological explanation offered in the text.'
      ),
      q(
        'What does research suggest about inaction versus action in the long term?',
        'People regret inaction more — they are more likely to say "I wish I had tried" than "I wish I hadn\'t."',
        'Research also shows that people regret inaction more than action in the long term.',
        'This supports the text\'s implicit argument that taking risks may be wiser.'
      ),
      q(
        'Does the text suggest you should take every risk? Why / Why not?',
        'No — the text says "not every risk is worth taking" and recommends weighing up options carefully.',
        'Of course, not every risk is worth taking.',
        'The text is balanced — it advocates informed risk-taking, not recklessness.'
      ),
      q(
        'What does the final sentence imply? ("perhaps that hesitation itself is a sign that you already know the answer")',
        'It implies that deep hesitation often means the person already wants to take the risk but is afraid to admit it.',
        'Perhaps that hesitation itself is a sign that you already know the answer.',
        'The author invites the reader to trust their instinct — rhetorical, not explicit advice.'
      ),
    ],
    guidedSummary: {
      instruction: 'Escreva um resumo de 3-4 frases do texto. Inclua: (1) o tema central, (2) a explicação psicológica, (3) a conclusão do autor.',
      modelAnswer: 'The text discusses the difficulty of making career decisions between safety and opportunity. It explains that people naturally avoid risk because the brain prioritises avoiding loss over seeking gain. However, research shows that people tend to regret inaction more in the long run. The author suggests that, after careful consideration, taking a risk is often the wiser choice.',
    },
    productionTask: task(
      'Escreva 3-4 frases respondendo: "Do you agree that people regret inaction more than action? Give a personal example or argument."',
      'Use vocabulário do texto: weigh up, regret, take a risk, consequence, on balance.',
      'I agree with the text\'s argument. In my experience, the times I have played it safe have often left me wondering "what if". On balance, I think the fear of failure is usually worse than failure itself. If I had taken more risks earlier in my career, I would probably have found my current path faster.'
    ),
  }),

  // ─── LISTENING-004: Problem-solving conversation ──────────────────────────────
  createListeningLesson({
    ...common,
    id: 'B1-LISTENING-004',
    order: 4,
    title: 'Listening: Should I take the risk?',
    objectives: [
      'Compreender uma conversa sobre dilema e tomada de decisão.',
      'Identificar argumentos a favor e contra uma decisão.',
      'Reconhecer modais de conselho (should, had better, ought to) em uso natural.',
      'Praticar shadowing em padrões de conselho e especulação.',
    ],
    listeningPreparation: [
      task('Before listening: read the title and imagine one personal risk (job, study, or life decision) someone might be uncertain about.', 'Think about what practical concerns and emotional concerns usually appear in this type of dilemma.'),
      task('Prediction: predict two arguments for taking the opportunity and two arguments for staying in the current situation.', 'Keep your predictions short so you can check them while listening.'),
      task('Key words to listen for: advice modals (should, ought to, had better), balancing language (on balance, at least), and opportunity vs risk vocabulary.', 'These cues help you identify the turning point in the decision.'),
    ],
    transcript: [
      'Sofia: I don\'t know what to do, Marcus. I\'ve been offered a new position, but it means leaving the team.',
      'Marcus: That\'s a big decision. What kind of role is it?',
      'Sofia: It\'s a senior role — more responsibility, better pay, but in a completely different department.',
      'Marcus: Sounds like a real dilemma. Have you weighed up the pros and cons?',
      'Sofia: I have, but I keep going back and forth. If I take it, I\'ll lose the work relationships I\'ve built here.',
      'Marcus: That\'s a fair point. But if I were you, I would think about where you want to be in five years.',
      'Sofia: That\'s what everyone says. But what if it doesn\'t work out?',
      'Marcus: Well, even if it doesn\'t, at least you\'ll have tried. You\'d probably regret not taking it more than you\'d regret trying.',
      'Sofia: I suppose so. What would you have done if you\'d been in this situation?',
      'Marcus: Honestly? If I had been offered something like that early in my career, I would have taken it without hesitating.',
      'Sofia: Really? You wouldn\'t have been worried about the risk?',
      'Marcus: I would have been nervous, sure. But I think you should go for it. You ought to trust your own abilities more.',
      'Sofia: You\'re right. I\'ve been so focused on the risks that I haven\'t really thought about the opportunities.',
      'Marcus: Exactly. On balance, the potential is much greater than the risk. You had better make a decision soon, though — they won\'t wait forever.',
      'Sofia: I know. I think I\'m going to go for it.',
      'Marcus: Good. I\'m sure it will work out.',
    ],
    comprehensionQuestions: [
      q(
        'What is Sofia\'s dilemma?',
        'She has been offered a senior position in a different department — more responsibility and better pay — but she would have to leave her current team.',
        'It\'s a senior role — more responsibility, better pay, but in a completely different department.',
        'The dilemma is clearly stated early in the conversation.'
      ),
      q(
        'What concern does Sofia raise about taking the new role?',
        'She worries about losing the work relationships she has built in her current team.',
        'If I take it, I\'ll lose the work relationships I\'ve built here.',
        'Relationships vs career advancement — a common real-life dilemma.'
      ),
      q(
        'What Third Conditional does Marcus use to express what he would have done?',
        '"If I had been offered something like that early in my career, I would have taken it without hesitating."',
        'If I had been offered something like that early in my career, I would have taken it without hesitating.',
        'Marcus uses Third Conditional to give a retrospective perspective.'
      ),
      q(
        'What three modals of advice does Marcus use in the conversation?',
        '"should" (you should go for it), "ought to" (you ought to trust your abilities), "had better" (you had better make a decision soon).',
        'I think you should go for it. You ought to trust your own abilities more. You had better make a decision soon.',
        'All three appear in the second half of the transcript — a natural sequence of advice.'
      ),
      q(
        'What finally seems to change Sofia\'s mind?',
        'Marcus points out that she has been so focused on the risks that she hasn\'t thought about the opportunities, and that the potential is much greater than the risk.',
        'You\'ve been so focused on the risks that you haven\'t really thought about the opportunities. On balance, the potential is much greater than the risk.',
        'The reframe from risks to opportunities is the turning point.'
      ),
    ],
    vocabulary: [
      task(
        'Marcus says "You\'d probably regret not taking it more than you\'d regret trying." What does this mean in your own words?',
        'Inferência de significado em contexto.',
        'Significa que a dor de não ter tentado seria maior do que a dor de ter tentado e falhado — o arrependimento pela inação é pior.'
      ),
      task(
        'What is the difference between "go for it" (informal) and "take the opportunity" (formal)? When would you use each?',
        'Registro: informal vs formal.',
        '"Go for it" é informal — conversa entre amigos ou colegas próximos. "Take the opportunity" é mais neutro e adequado para contextos profissionais formais.'
      ),
      task(
        'Find two expressions in the transcript that mean "after considering everything". ',
        'Expressões de conclusão/balanço.',
        '"On balance" e "at least" (neste contexto, "at least you\'ll have tried" implica um balanço positivo mesmo no pior cenário).'
      ),
    ],
    shadowing: [
      task(
        'If I were you, I would think about where you want to be in five years.',
        'Padrão: "If I were you, I would..." — entonação cai no verbo principal da main clause.',
      ),
      task(
        'You ought to trust your own abilities more.',
        'Padrão de conselho com "ought to" — "ought to" é leve, quase igual a "should" em velocidade natural.',
      ),
      task(
        'You had better make a decision soon, though — they won\'t wait forever.',
        'Padrão de urgência com "had better" — note a pausa natural após "soon" e o tom de aviso em "they won\'t wait forever".',
      ),
    ],
    oralProduction: task(
      'Você é Marcus. Grave 60-90 segundos de resposta à Sofia. Inclua: (1) reconhecimento do dilema, (2) pelo menos 2 conselhos com modais diferentes, (3) uma frase com Third Conditional sobre o que você teria feito.',
      'Use: should, ought to, had better, If I were you, If I had been..., I would have...',
      'Sofia, I can see this is a tough decision. But if I were you, I would focus on the long-term opportunity. You should talk to people in that department before you decide. You ought to trust your track record — you\'ve delivered consistently here. And honestly, if I had been offered this kind of role early in my career, I would have taken it. You had better not wait too long — opportunities like this don\'t come around often.'
    ),
  }),

  // ─── VOCABULARY-008: Decision-making vocabulary ───────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B1-VOCABULARY-008',
    order: 8,
    title: 'Decision-making vocabulary',
    objectives: [
      'Usar verbos e expressões para descrever o processo de tomar decisões.',
      'Expressar arrependimento e consequência com precisão.',
      'Usar "weigh up", "pros and cons", "on balance", "go ahead with", "back out of".',
      'Evitar confusões com "decide", "make a decision" e "regret" + gerúndio/infinitivo.',
    ],
    teacherOpening: 'Tomar decisões é um dos temas mais ricos do inglês conversacional e escrito. Esta aula cobre o vocabulário exato que você precisa para descrever dilemas, expressar arrependimento e concluir argumentos sobre escolhas — ferramentas indispensáveis no B1.',
    essentialWords: [
      { word: 'weigh up', definition: 'analisar/pesar (prós e contras)', example: 'I spent a week weighing up the options before deciding.', brazilianNote: '"Weigh up" — não tem equivalente exato em português. Use nos contextos de análise racional de alternativas.' },
      { word: 'pros and cons', definition: 'vantagens e desvantagens', example: 'Let\'s make a list of the pros and cons before we go ahead.', brazilianNote: '"Pros" = vantagens (singular: pro). "Cons" = desvantagens (singular: con). Muito usado em contextos profissionais e acadêmicos.' },
      { word: 'make a decision', definition: 'tomar uma decisão', example: 'We need to make a decision by Friday.', brazilianNote: 'Collocação fixa: SEMPRE "make a decision", nunca "do a decision" ou "take a decision" (britânico aceita "take" em contextos formais).' },
      { word: 'go ahead with', definition: 'prosseguir com / dar continuidade a', example: 'We\'ve decided to go ahead with the new project.', brazilianNote: '"Go ahead with" implica que a decisão foi tomada e a ação começa. Muito usado em reuniões.' },
      { word: 'back out of', definition: 'desistir de / recuar de um compromisso', example: 'He backed out of the deal at the last minute.', brazilianNote: '"Back out of" = retirar-se de um acordo ou plano — sempre com implicação negativa.' },
      { word: 'on balance', definition: 'considerando tudo / no geral', example: 'On balance, I think we made the right choice.', brazilianNote: '"On balance" = conclusão após análise. Equivale a "levando tudo em consideração".' },
      { word: 'all things considered', definition: 'levando tudo em conta', example: 'All things considered, the project was a success.', brazilianNote: 'Expressão de conclusão mais formal que "on balance" — usada em avaliações e relatórios.' },
      { word: 'regret', definition: 'arrepender-se de / lamentar', example: 'I regret not taking that opportunity.', brazilianNote: 'CUIDADO: "regret + gerúndio" = lamentar algo do passado. "Regret + infinitivo" = lamentar o que vai dizer agora (formal). Ex: "I regret to inform you that..."' },
      { word: 'consequence', definition: 'consequência', example: 'Have you thought about the consequences of this decision?', brazilianNote: 'Falso cognato parcial: "consequence" em inglês é mais neutro que em português — pode ser positivo ou negativo.' },
      { word: 'go with your gut', definition: 'confiar no instinto', example: 'I\'ve analysed everything. Now I just have to go with my gut.', brazilianNote: 'Expressão informal mas muito frequente. Equivale a "seguir a intuição" ou "confiar no instinto".' },
      { word: 'the right move', definition: 'a decisão certa / o movimento certo', example: 'I think accepting the offer is the right move at this stage.', brazilianNote: '"Move" no sentido de "jogada" ou "passo" — comum em contextos de estratégia e carreira.' },
      { word: 'hesitate', definition: 'hesitar / vacilar', example: 'Don\'t hesitate — take the opportunity while you can.', brazilianNote: '"Hesitate to do" = ter receio de fazer. "Without hesitating" = sem vacilar. Não confundir com "wait".' },
    ],
    chunks: [
      { chunk: 'I\'ve been going back and forth about...', meaning: 'Fico pensando de um lado para o outro sobre...', example: 'I\'ve been going back and forth about whether to apply.' },
      { chunk: 'On balance, I think...', meaning: 'Levando tudo em conta, acho que...', example: 'On balance, I think the risks are manageable.' },
      { chunk: 'The way I see it,...', meaning: 'Do meu ponto de vista,...', example: 'The way I see it, this is the best option we have.' },
      { chunk: 'I don\'t want to look back and regret...', meaning: 'Não quero olhar para trás e me arrepender de...', example: 'I don\'t want to look back and regret not trying.' },
      { chunk: 'It\'s a calculated risk.', meaning: 'É um risco calculado.', example: 'Leaving a stable job is scary, but it\'s a calculated risk.' },
      { chunk: 'At the end of the day,...', meaning: 'No fim das contas,...', example: 'At the end of the day, it\'s your life and your decision.' },
    ],
    dangerousConfusions: [
      task(
        'Qual a diferença entre "regret + gerúndio" e "regret + infinitivo"? Escolha a forma correta: "I regret ___ (tell) you that your application was unsuccessful." / "She regrets ___ (not take) the opportunity."',
        '"Regret + infinitivo" = lamentar o que vai dizer agora (usado em mensagens formais negativas). "Regret + gerúndio" = lamentar algo que aconteceu no passado.',
        'I regret to tell you... / She regrets not taking the opportunity.'
      ),
      task(
        'Corrija se necessário: "We need to do a decision before the deadline."',
        'Collocação fixa com "make".',
        'We need to make a decision before the deadline.'
      ),
      task(
        'Qual a diferença entre "back out of" e "turn down"? Escolha: "She ___ (back out of / turn down) the job offer at the interview stage." / "He ___ (back out of / turn down) the deal after signing the contract."',
        '"Turn down" = recusar antes de comprometer. "Back out of" = desistir depois de comprometer.',
        'She turned down the job offer. / He backed out of the deal.'
      ),
    ],
    miniDialogues: [
      {
        title: 'Making a difficult career decision',
        lines: [
          'Lena: I\'ve been going back and forth about this job offer for two weeks. I just can\'t make a decision.',
          'Tom: Have you weighed up the pros and cons properly?',
          'Lena: Yes, but I keep changing my mind. The way I see it, both options have real value.',
          'Tom: On balance, though, which one feels right? Sometimes you just have to go with your gut.',
          'Lena: I know. I don\'t want to back out of this just because I\'m scared. I think I\'ll go ahead with it.',
        ],
        focus: 'going back and forth, weigh up, pros and cons, on balance, go with your gut, back out of, go ahead with — all in natural conversational context.',
      },
    ],
    productionTasks: [
      task(
        'Descreva uma decisão difícil (real ou inventada) em 3-4 frases. Use: weigh up, pros and cons, on balance, make a decision.',
        'Estruture como: (1) qual era a decisão, (2) como você analisou, (3) qual foi a conclusão.',
        'I had to decide whether to accept a promotion that required relocating. I spent weeks weighing up the pros and cons — the career opportunity was significant, but leaving my family behind was a real concern. On balance, I decided the move was worth it, and I\'m glad I made that decision.'
      ),
      task(
        'Complete: "If I had ___, I would have ___. I regret ___ (gerúndio). On balance, though, ___."',
        'Use Third Conditional + regret + balanço final.',
        'If I had started saving earlier, I would have had enough for a deposit by now. I regret spending so freely in my twenties. On balance, though, those years taught me a lot about what really matters.'
      ),
    ],
    recognitionPractice: [{ question: 'Decision-making vocabulary — qual vocabulário desta aula significa "analisar/pesar (prós e contras)"?', options: ['weigh up', 'pros and cons', 'make a decision'], answer: 'weigh up', explanation: 'weigh up = analisar/pesar (prós e contras); vocabulário trabalhado nesta aula de Decision-making vocabulary.' }, { question: 'Decision-making vocabulary — qual opção combina com "weigh up"?', options: ['analisar/pesar (prós e contras)', 'vantagens e desvantagens', 'tomar uma decisão'], answer: 'analisar/pesar (prós e contras)', explanation: 'weigh up significa analisar/pesar (prós e contras) no contexto desta aula.' }],
  }),

]);

export const B1_DEEP_PROBLEMS_PART2_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(B1_DEEP_PROBLEMS_PART2.filter(l => l.type === 'grammar')),
  vocabulary: Object.freeze(B1_DEEP_PROBLEMS_PART2.filter(l => l.type === 'vocabulary')),
  reading: Object.freeze(B1_DEEP_PROBLEMS_PART2.filter(l => l.type === 'reading')),
  listening: Object.freeze(B1_DEEP_PROBLEMS_PART2.filter(l => l.type === 'listening')),
  speaking: Object.freeze([]),
  writing: Object.freeze([]),
  checkpoint: Object.freeze([]),
});
