import { createGrammarLesson, createVocabularyLesson } from '../../../schemas/index.js';

const level = 'A2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['a2-6', 'reviews-checkpoints', 'review', 'checkpoint', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }

export const A2_DEEP_REVIEWS_CHECKPOINTS = Object.freeze([
  createGrammarLesson({
    ...common,
    id: 'A2-GRAMMAR-026',
    order: 26,
    title: 'A2 Grammar Review 1',
    checkpoint: 'a2-grammar-review-1',
    objectives: ['Revisar Past Simple regular e irregular.', 'Revisar negative e questions com did.', 'Revisar past time expressions.', 'Revisar there was / there were.', 'Consolidar narrativas simples no passado.'],
    teacherOpening: 'Esta revisão junta a primeira metade forte do A2: contar coisas que aconteceram. Você vai revisar Past Simple, perguntas com did, negativas, expressões de tempo e there was/there were.',
    whyItMatters: 'Antes de fechar o A2, você precisa contar histórias simples no passado com segurança: o que fez, onde foi, o que havia lá e quando aconteceu.',
    realLifeUseCases: ['Contar o fim de semana.', 'Falar de viagem passada.', 'Explicar uma compra ou problema passado.', 'Perguntar o que alguém fez.', 'Descrever lugares/eventos no passado.'],
    conceptExplanation: 'Past Simple usa verbo no passado em frases afirmativas. Em negativas e perguntas, use did/didn’t + verbo base. There was/there were descreve existência no passado. Expressões como yesterday, last week e ago localizam o evento.',
    mentalModel: { title: 'past story frame', summary: 'Quando aconteceu + ação passada + detalhes + existência no passado.', steps: ['yesterday/last week/ago', 'I went / I visited', 'I didn’t go', 'Did you...?', 'There was/were'] },
    stepByStep: [task('Escolha o tempo passado.'), task('Use verbo passado em afirmativas.'), task('Use didn’t + base verb em negativas.'), task('Use Did + subject + base verb em perguntas.'), task('Use there was/were para existência.'), task('Adicione detalhes e sequência.')],
    portugueseContrast: [task('Did já marca passado; não coloque verbo no passado depois dele.'), task('Was é singular; were é plural.'), task('Ago vem depois da quantidade: two days ago.'), task('Last vem antes do período: last week.')],
    guidedDiscovery: [task('I visited my family yesterday.'), task('I didn’t visit my family yesterday.'), task('Did you visit your family yesterday?'), task('There was a problem at the hotel.'), task('There were many people at the restaurant.')],
    guidedBeforeQuiz: [task('Corrija: Did you went?', 'Did you go?'), task('Complete: I ___ my friend yesterday. (visit)', 'visited'), task('Complete: There ___ many people.', 'were')],
    grammarGoal: 'Consolidar a narrativa passada A2.',
    formationGuide: [task('Regular affirmative', 'I worked yesterday.'), task('Irregular affirmative', 'I went to the store.'), task('Negative', 'I didn’t buy anything.'), task('Question', 'Did you call him?'), task('There was/were', 'There was a problem. / There were two rooms.')],
    whenToUse: [task('Para ações concluídas no passado.'), task('Para perguntas sobre passado.'), task('Para negar ações passadas.'), task('Para descrever existência no passado.')],
    whenNotToUse: [task('Não use did + went.'), task('Não use didn’t + worked.'), task('Não use there were com singular.'), task('Não confunda past com rotina atual.')],
    grammarTable: [
      { pattern: 'Past affirmative', example: 'I visited my cousin last week.', translation: 'Visitei meu primo semana passada.' },
      { pattern: 'Past negative', example: 'I didn’t visit my cousin.', translation: 'Não visitei meu primo.' },
      { pattern: 'Past question', example: 'Did you visit your cousin?', translation: 'Você visitou seu primo?' },
      { pattern: 'There was/were', example: 'There were many people there.', translation: 'Havia muitas pessoas lá.' }
    ],
    teacherExamples: [
      { english: 'Last weekend, I went to a restaurant, but I didn’t like the food.', translation: 'No fim de semana passado, fui a um restaurante, mas não gostei da comida.', why: 'Passado irregular + negativa.' },
      { english: 'Did you see the message I sent yesterday?', translation: 'Você viu a mensagem que enviei ontem?', why: 'Pergunta com did + base verb.' },
      { english: 'There was a small problem, but there were two people there to help.', translation: 'Havia um pequeno problema, mas havia duas pessoas lá para ajudar.', why: 'There was/were.' }
    ],
    commonBrazilianMistakes: [mistake('Did you went?', 'Did you go?', 'Did pede verbo base.'), mistake('I didn’t went.', 'I didn’t go.', 'Didn’t pede verbo base.'), mistake('There was many people.', 'There were many people.', 'Plural usa were.'), mistake('Two days before', 'Two days ago', 'Para “há dois dias”, use ago.')],
    controlledPractice: [task('Complete: I ___ TV yesterday. (watch)', 'watched'), task('Complete: She ___ to work. (go)', 'went'), task('Complete: I didn’t ___ coffee. (drink)', 'drink'), task('Complete: ___ you call her?', 'Did'), task('Complete: There ___ a problem.', 'was')],
    errorCorrectionPractice: [task('Corrija: Did she worked?', 'Did she work?'), task('Corrija: I didn’t bought it.', 'I didn’t buy it.'), task('Corrija: There were a hotel.', 'There was a hotel.')],
    transformationPractice: [task('Affirmative → negative: I bought a jacket.', 'I didn’t buy a jacket.'), task('Affirmative → question: She visited her aunt.', 'Did she visit her aunt?'), task('Singular → plural: There was one room.', 'There were two rooms.')],
    translationPractice: [task('Eu fui ao mercado ontem.', 'I went to the market yesterday.'), task('Você ligou para ela?', 'Did you call her?'), task('Não comprei nada.', 'I didn’t buy anything.'), task('Havia muitas pessoas lá.', 'There were many people there.')],
    productionTasks: [task('Escreva uma história curta de 8 frases sobre ontem.'), task('Inclua 2 negativas com didn’t.'), task('Inclua 3 perguntas com did.'), task('Inclua there was e there were.')],
    finalChecklist: [task('Usei verbo passado só em afirmativas?'), task('Usei did/didn’t + base verb?'), task('Usei was/were corretamente?'), task('Usei expressão de tempo?')],
    selfAssessment: [task('Consigo contar algo no passado?'), task('Consigo perguntar no passado?'), task('Consigo negar no passado?'), task('Consigo usar there was/were?')],
    lessonRecap: ['Past Simple conta ações concluídas.', 'Did/didn’t pedem verbo base.', 'There was/were descreve existência no passado.', 'Expressões de tempo organizam a narrativa.'],
    nextLessonBridge: 'A próxima revisão integra presente contínuo, futuro, quantidade, comparação e comunicação funcional.',
  }),

  createGrammarLesson({
    ...common,
    id: 'A2-GRAMMAR-027',
    order: 27,
    title: 'A2 Grammar Review 2',
    checkpoint: 'a2-grammar-review-2',
    objectives: ['Revisar Present Continuous e Present Simple vs Continuous.', 'Revisar going to para planos e previsões.', 'Revisar quantifiers e comparatives/superlatives.', 'Revisar modais e comunicação funcional: would like, should, have to, can/could.', 'Conectar ideias com because, so, but e and.'],
    teacherOpening: 'Esta revisão junta a segunda metade do A2: falar do agora, planos, escolhas, quantidade, conselhos, obrigações e pedidos educados.',
    whyItMatters: 'Esse bloco confirma se você consegue usar inglês A2 em situações reais: agora, futuro próximo, compras, convites, problemas, conselhos e obrigações.',
    realLifeUseCases: ['Falar do que está fazendo agora.', 'Falar de planos do fim de semana.', 'Comparar produtos.', 'Pedir ajuda educadamente.', 'Dar conselho e explicar obrigação.'],
    conceptExplanation: 'Present Continuous fala do agora ou situação temporária. Going to fala de planos ou previsão com evidência. Quantifiers falam de quantidade. Comparatives/superlatives comparam. Would like, should, have to e can/could resolvem comunicação cotidiana.',
    mentalModel: { title: 'A2 functional grammar map', summary: 'Agora + futuro + escolha + quantidade + comunicação.', steps: ['I am studying now.', 'I am going to travel.', 'This is cheaper.', 'You should rest.', 'Could you help me?'] },
    stepByStep: [task('Identifique tempo: agora, rotina, passado ou futuro.'), task('Escolha estrutura principal.'), task('Adicione quantidade ou comparação se necessário.'), task('Use modal/expressão funcional para pedido, conselho ou obrigação.'), task('Conecte com because/so/but/and.')],
    portugueseContrast: [task('I am studying now ≠ I study every day.'), task('Going to precisa do verbo be.'), task('Much com uncountable; many com countable plural.'), task('Could aqui é pedido educado, não passado.')],
    guidedDiscovery: [task('I’m working now.'), task('I work every day.'), task('I’m going to study tonight.'), task('This phone is cheaper than that one.'), task('Could you speak slowly?')],
    guidedBeforeQuiz: [task('Complete: I ___ studying now.', 'am'), task('Complete: She is going ___ travel.', 'to'), task('Complete: This is cheaper ___ that.', 'than'), task('Complete: Could you ___ me?', 'help')],
    grammarGoal: 'Integrar as estruturas funcionais do A2 em fala e escrita.',
    formationGuide: [task('Present Continuous', 'I am working now.'), task('Present Simple vs Continuous', 'I work every day, but I’m resting now.'), task('Going to', 'We are going to travel.'), task('Quantifiers', 'There isn’t much time. There are many people.'), task('Comparatives', 'This one is better than that one.'), task('Modals/functional', 'You should rest. I have to work. Could you help me?')],
    whenToUse: [task('Present Continuous para agora.'), task('Going to para plano futuro.'), task('Comparatives para escolhas.'), task('Should para conselho.'), task('Have to para obrigação.'), task('Could para pedido educado.')],
    whenNotToUse: [task('Não use am/is/are com Present Simple de rotina.'), task('Não esqueça be em going to.'), task('Não use much com plural contável.'), task('Não use should to/could to.')],
    grammarTable: [
      { pattern: 'now', example: 'I’m studying now.', translation: 'Estou estudando agora.' },
      { pattern: 'plan', example: 'I’m going to study tonight.', translation: 'Vou estudar hoje à noite.' },
      { pattern: 'comparison', example: 'This jacket is more comfortable than mine.', translation: 'Esta jaqueta é mais confortável que a minha.' },
      { pattern: 'advice/obligation/request', example: 'You should rest, but you have to work. Could you drink some water?', translation: 'Você deveria descansar, mas tem que trabalhar. Poderia beber água?' }
    ],
    teacherExamples: [
      { english: 'I usually work in the morning, but I’m studying English now.', translation: 'Normalmente trabalho de manhã, mas estou estudando inglês agora.', why: 'Rotina vs agora.' },
      { english: 'We’re going to buy the cheaper option because it is better for us.', translation: 'Vamos comprar a opção mais barata porque ela é melhor para nós.', why: 'Plano + comparação + motivo.' },
      { english: 'Could you explain it slowly? I’m confused, so I need help.', translation: 'Você poderia explicar devagar? Estou confuso, então preciso de ajuda.', why: 'Pedido + advérbio + consequência.' }
    ],
    commonBrazilianMistakes: [mistake('I studying now.', 'I am studying now.', 'Present Continuous precisa de be.'), mistake('I going to travel.', 'I am going to travel.', 'Going to precisa de be.'), mistake('Much people', 'Many people / a lot of people', 'People é plural contável.'), mistake('You should to rest.', 'You should rest.', 'Should pede verbo base.'), mistake('Could you to help me?', 'Could you help me?', 'Could pede verbo base.')],
    controlledPractice: [task('Complete: She ___ working now.', 'is'), task('Complete: We are going ___ travel.', 'to'), task('Complete: There are ___ people.', 'many/a lot of'), task('Complete: You should ___ early.', 'sleep'), task('Complete: Could you ___ that?', 'repeat')],
    errorCorrectionPractice: [task('Corrija: I am go to work every day.', 'I go to work every day.'), task('Corrija: She going to call me.', 'She is going to call me.'), task('Corrija: This is more cheap than that.', 'This is cheaper than that.'), task('Corrija: He has to works.', 'He has to work.')],
    transformationPractice: [task('Now: I study English.', 'I am studying English now.'), task('Plan: I travel tomorrow.', 'I am going to travel tomorrow.'), task('Comparison: This phone / expensive / that phone', 'This phone is more expensive than that phone.'), task('Request: help me', 'Could you help me?')],
    translationPractice: [task('Estou trabalhando agora.', 'I’m working now.'), task('Vou estudar hoje à noite.', 'I’m going to study tonight.'), task('Este é melhor que aquele.', 'This one is better than that one.'), task('Você deveria descansar.', 'You should rest.'), task('Você poderia repetir?', 'Could you repeat that?')],
    productionTasks: [task('Escreva 10 frases misturando agora, plano e comparação.'), task('Crie 5 pedidos educados.'), task('Crie 5 conselhos e obrigações.'), task('Escreva uma mensagem com because, so, but e and.')],
    finalChecklist: [task('Escolhi o tempo correto?'), task('Usei be quando necessário?'), task('Usei verbo base depois de modal?'), task('Conectei ideias com lógica?')],
    selfAssessment: [task('Consigo falar do agora?'), task('Consigo falar de plano?'), task('Consigo comparar?'), task('Consigo pedir, aconselhar e explicar obrigação?')],
    lessonRecap: ['A2 integra tempos, quantidade, comparação e comunicação.', 'Present Continuous precisa de be.', 'Going to precisa de be + going to + verb.', 'Modais funcionais pedem verbo base.'],
    nextLessonBridge: 'Agora vem o checkpoint de Grammar A2 para confirmar domínio mínimo.',
  }),

  createGrammarLesson({
    ...common,
    id: 'A2-GRAMMAR-028',
    order: 28,
    title: 'A2 Grammar Checkpoint',
    checkpoint: 'grammar-checkpoint',
    objectives: ['Avaliar domínio mínimo de Grammar A2.', 'Aplicar passado, presente, futuro, quantidade, comparação e comunicação funcional.', 'Identificar erros frequentes.', 'Produzir respostas curtas com precisão.'],
    teacherOpening: 'Este checkpoint não é aula nova. É uma verificação final de Grammar A2. O objetivo é confirmar se você consegue escolher a estrutura certa sem depender de explicação.',
    whyItMatters: 'Antes de ir para B1, você precisa controlar a base A2 com segurança: passado, agora, planos, quantidade, comparação, pedidos, conselhos e obrigações.',
    realLifeUseCases: ['Avaliar prontidão para B1.', 'Revisar pontos fracos.', 'Confirmar domínio de estruturas funcionais.', 'Preparar checklists finais do A2.'],
    conceptExplanation: 'Você vai alternar estruturas. Leia o contexto antes de responder. Não escolha pela tradução solta; escolha pela função: passado, agora, plano, quantidade, comparação, pedido, conselho ou obrigação.',
    mentalModel: { title: 'choose by function', summary: 'A função da frase define a gramática.', steps: ['past → did/past verb', 'now → be + ing', 'plan → going to', 'advice → should', 'obligation → have to', 'request → can/could'] },
    stepByStep: [task('Identifique a função.'), task('Escolha a estrutura.'), task('Cheque verbo base ou passado.'), task('Cheque singular/plural.'), task('Cheque conector lógico.'), task('Leia a frase completa.')],
    portugueseContrast: [task('Não traduza palavra por palavra.'), task('Procure função comunicativa.'), task('Did/should/could/have to têm regras diferentes.'), task('Cuidado com “não precisa” = don’t have to.')],
    guidedDiscovery: [task('Yesterday → Past Simple.'), task('Right now → Present Continuous.'), task('Tonight plan → going to.'), task('Advice → should.'), task('Obligation → have to.')],
    guidedBeforeQuiz: [task('Antes de responder, diga a função: passado/agora/plano/conselho/obrigação/pedido.'), task('Depois cheque se o verbo está na forma correta.')],
    grammarGoal: 'Confirmar domínio mínimo de Grammar A2.',
    formationGuide: [task('Past', 'Did you go? / I went.'), task('Now', 'I am studying.'), task('Plan', 'I am going to study.'), task('Quantity', 'many people / much time'), task('Comparison', 'better than / the best'), task('Functional', 'Could you help me? / You should rest. / I have to work.')],
    whenToUse: [task('Use como prova interna do A2.'), task('Use para mapear lacunas.'), task('Use antes de avançar para B1.')],
    whenNotToUse: [task('Não trate como conteúdo novo.'), task('Não pule correções.'), task('Não avance se errar padrões centrais repetidamente.')],
    grammarTable: [
      { pattern: 'Past', example: 'I didn’t go yesterday.', translation: 'Não fui ontem.' },
      { pattern: 'Now', example: 'She is working now.', translation: 'Ela está trabalhando agora.' },
      { pattern: 'Future plan', example: 'We are going to leave soon.', translation: 'Vamos sair em breve.' },
      { pattern: 'Advice/obligation/request', example: 'You should rest, but I have to work. Could you help me?', translation: 'Você deveria descansar, mas eu tenho que trabalhar. Você poderia me ajudar?' }
    ],
    teacherExamples: [
      { english: 'I didn’t buy the expensive one because this one was cheaper.', translation: 'Não comprei o caro porque este era mais barato.', why: 'Passado + comparação + motivo.' },
      { english: 'I’m going to call her, but I need your help first.', translation: 'Vou ligar para ela, mas preciso da sua ajuda primeiro.', why: 'Plano + pronome objeto + contraste.' },
      { english: 'Could you explain it clearly? I’m confused.', translation: 'Você poderia explicar claramente? Estou confuso.', why: 'Pedido + object pronoun + advérbio.' }
    ],
    commonBrazilianMistakes: [mistake('Did you went?', 'Did you go?', 'Did + base verb.'), mistake('I am work now.', 'I am working now.', 'Present Continuous usa -ing.'), mistake('She going to travel.', 'She is going to travel.', 'Going to precisa de be.'), mistake('Much people', 'Many people.', 'People é plural contável.'), mistake('Could you to help me?', 'Could you help me?', 'Could + base verb.')],
    controlledPractice: [task('Complete: Did you ___ him yesterday?', 'call'), task('Complete: She is ___ now.', 'working/studying'), task('Complete: We are going ___ leave soon.', 'to'), task('Complete: There are ___ people here.', 'many/a lot of'), task('Complete: Could you ___ me?', 'help')],
    errorCorrectionPractice: [task('Corrija: I didn’t went.', 'I didn’t go.'), task('Corrija: He shoulds rest.', 'He should rest.'), task('Corrija: Does she has to work?', 'Does she have to work?'), task('Corrija: Send it to I.', 'Send it to me.')],
    transformationPractice: [task('Past question: you / go / yesterday', 'Did you go yesterday?'), task('Now: she / study', 'She is studying now.'), task('Plan: they / travel tomorrow', 'They are going to travel tomorrow.'), task('Advice: tired', 'You should rest.'), task('Request: repeat', 'Could you repeat that?')],
    translationPractice: [task('Você foi ontem?', 'Did you go yesterday?'), task('Estou estudando agora.', 'I’m studying now.'), task('Vamos viajar amanhã.', 'We are going to travel tomorrow.'), task('Você não precisa vir cedo.', 'You don’t have to come early.'), task('Você poderia me ajudar?', 'Could you help me?')],
    productionTasks: [task('Escreva 12 frases: 2 passado, 2 agora, 2 planos, 2 comparações, 2 conselhos, 2 pedidos.'), task('Escreva uma mensagem curta usando 5 estruturas A2 diferentes.'), task('Liste seus 5 erros mais comuns e corrija cada um.')],
    finalChecklist: [task('A função está correta?'), task('O verbo está correto?'), task('O auxiliar/modal está correto?'), task('Conectores fazem sentido?'), task('Consigo explicar por que escolhi a estrutura?')],
    selfAssessment: [task('Passei sem errar did + base verb?'), task('Passei sem errar be + ing?'), task('Passei sem errar going to?'), task('Passei sem errar should/could/have to?')],
    lessonRecap: ['Checkpoint testa função, forma e precisão.', 'Erros centrais devem ser corrigidos antes de avançar.', 'Grammar A2 precisa estar funcional, não perfeita como nativo.', 'A próxima etapa revisa vocabulário A2.'],
    nextLessonBridge: 'Agora você vai revisar o vocabulário funcional A2.',
  }),

  createVocabularyLesson({
    ...common,
    id: 'A2-VOCABULARY-020',
    order: 20,
    title: 'Vocabulary Review A2',
    checkpoint: 'vocabulary-review',
    objectives: ['Revisar vocabulário funcional A2.', 'Organizar palavras por situação real.', 'Reforçar chunks de comunicação.', 'Produzir frases com vocabulário de viagem, compras, saúde, trabalho, estudo, tecnologia, casa, comparações e convites.'],
    teacherOpening: 'Vocabulary Review A2 não é lista solta. Você vai revisar palavras por situação: viagem, hotel, restaurante, compras, saúde, cidade, trabalho, estudo, tecnologia, casa, roupas, comida, opinião e convites.',
    whyItMatters: 'Vocabulário A2 precisa ser funcional. Você deve conseguir usar palavras em frases reais, não apenas reconhecer tradução.',
    realLifeUseCases: ['Viajar e pedir informação.', 'Comprar e comparar produtos.', 'Falar de saúde simples.', 'Explicar problema no celular.', 'Convidar e responder convite.', 'Falar de sentimentos e opinião.'],
    conceptExplanation: 'Organize vocabulário por função: pedir, explicar, comparar, reclamar, convidar, aconselhar. Chunks prontos ajudam a usar as palavras em conversa.',
    mentalModel: { title: 'vocabulary by situation', summary: 'Aprenda palavras em blocos de uso real.', steps: ['situation', 'keywords', 'chunks', 'sentence', 'mini dialogue'] },
    stepByStep: [task('Escolha a situação.'), task('Liste 8 palavras úteis.'), task('Monte 3 chunks.'), task('Crie 5 frases.'), task('Use em mini diálogo.')],
    portugueseContrast: [task('Actually = na verdade, não atualmente.'), task('Library = biblioteca, não livraria.'), task('Parents = pais, não parentes.'), task('Support pode ser suporte/apoio dependendo do contexto.')],
    guidedDiscovery: [task('Travel: ticket, station, hotel, reservation.'), task('Shopping: size, price, cheaper, receipt.'), task('Health: headache, pharmacy, medicine, advice.'), task('Communication: could you, no problem, let me check.')],
    guidedBeforeQuiz: [task('Liste 5 palavras de viagem.'), task('Liste 5 palavras de compras.'), task('Liste 5 chunks de convite/pedido.')],
    topicContext: 'Revisão funcional de vocabulário A2 por situação real.',
    essentialWords: [
      vocab('reservation', 'reserva', 'I have a reservation.'), vocab('receipt', 'recibo/nota', 'Can I have the receipt?'), vocab('size', 'tamanho', 'What size do you need?'), vocab('price', 'preço', 'The price is good.'), vocab('cheaper', 'mais barato', 'This one is cheaper.'), vocab('headache', 'dor de cabeça', 'I have a headache.'), vocab('pharmacy', 'farmácia', 'There is a pharmacy near here.'), vocab('directions', 'direções/instruções de caminho', 'Can you give me directions?'), vocab('schedule', 'agenda/horário', 'Let me check my schedule.'), vocab('appointment', 'compromisso/consulta', 'I have an appointment.'), vocab('charger', 'carregador', 'I need my charger.'), vocab('problem', 'problema', 'There is a problem with my phone.'), vocab('comfortable', 'confortável', 'These shoes are comfortable.'), vocab('worried', 'preocupado', 'I’m worried about the test.'), vocab('invitation', 'convite', 'Thanks for the invitation.'), vocab('advice', 'conselho', 'I need some advice.'), vocab('obligation', 'obrigação', 'This is an obligation.'), vocab('carefully', 'cuidadosamente', 'Read carefully.'), vocab('slowly', 'devagar', 'Speak slowly, please.'), vocab('clearly', 'claramente', 'Explain it clearly.')
    ],
    chunks: [
      { chunk: 'Could you help me?', translation: 'Você poderia me ajudar?', example: 'Could you help me with this form?' },
      { chunk: 'Let me check my schedule', translation: 'Deixa eu verificar minha agenda', example: 'Let me check my schedule first.' },
      { chunk: 'I’m not sure', translation: 'Não tenho certeza', example: 'I’m not sure about Saturday.' },
      { chunk: 'That sounds good', translation: 'Parece bom', example: 'Sunday sounds good.' },
      { chunk: 'I have to go now', translation: 'Tenho que ir agora', example: 'Sorry, I have to go now.' },
      { chunk: 'What should I do?', translation: 'O que devo fazer?', example: 'I’m confused. What should I do?' }
    ],
    pronunciationFocus: { title: 'Foco sonoro', tips: ['Practice chunks as one sound unit.', 'Schedule pode variar entre inglês americano e britânico.', 'Comfortable costuma ser reduzido em fala natural.'] },
    dangerousConfusions: [task('Library ≠ livraria.'), task('Parents ≠ parentes.'), task('Actually ≠ atualmente.'), task('Bored ≠ boring.'), task('Excited em contexto comum = animado/empolgado.')],
    collocations: [task('book a room'), task('check my schedule'), task('ask for directions'), task('have a headache'), task('try on clothes'), task('compare prices'), task('give advice'), task('speak slowly'), task('explain clearly')],
    miniDialogues: [
      { title: 'Travel and hotel', lines: ['A: Hello, I have a reservation.', 'B: Sure. Could you show me your ID card?', 'A: Of course. Do I have to pay now?', 'B: No, you don’t have to pay now.'], focus: 'Hotel + obrigação.' },
      { title: 'Shopping', lines: ['A: Can I try this jacket on?', 'B: Sure. What size do you need?', 'A: Medium. This one is cheaper, but that one is more comfortable.', 'B: That sounds good.'], focus: 'Compras + comparação.' },
      { title: 'Advice', lines: ['A: I feel tired and worried.', 'B: I think you should rest.', 'A: Should I study all night?', 'B: No, you shouldn’t. You should sleep early.'], focus: 'Sentimentos + conselho.' }
    ],
    examples: [ex('Could you explain it clearly, please?', 'Você poderia explicar claramente, por favor?', 'Pedido + advérbio.'), ex('I’m worried about my appointment tomorrow.', 'Estou preocupado com meu compromisso/consulta amanhã.', 'Sentimento + situação.'), ex('This jacket is cheaper, but mine is more comfortable.', 'Esta jaqueta é mais barata, mas a minha é mais confortável.', 'Comparação + posse.')],
    recognitionPractice: [task('Qual palavra combina com hotel?', 'reservation'), task('Qual palavra combina com compra?', 'receipt/size/price'), task('Qual chunk pede ajuda?', 'Could you help me?'), task('Qual palavra significa preocupado?', 'worried')],
    usagePractice: [task('Complete: Let me check my ___.', 'schedule'), task('Complete: I have a ___. (dor de cabeça)', 'headache'), task('Complete: Could you speak ___?', 'slowly'), task('Complete: This one is ___ than that one.', 'cheaper/better/more comfortable')],
    productionTasks: [task('Crie 5 frases de viagem/hotel.'), task('Crie 5 frases de compras/comparação.'), task('Crie 5 frases de saúde/conselho.'), task('Crie 5 frases de trabalho/obrigação.'), task('Crie 1 diálogo com 8 linhas usando pelo menos 10 palavras A2.')],
    spacedReview: [task('Revise 10 palavras por dia por situação.'), task('Grave 10 chunks como frases completas.'), task('Crie flashcards com palavra + frase, não apenas tradução.')],
    selfAssessment: [task('Consigo usar vocabulário por situação?'), task('Consigo criar frases reais?'), task('Consigo lembrar chunks sem traduzir palavra por palavra?')],
    lessonRecap: ['Vocabulário A2 deve ser funcional.', 'Aprenda por situação, não por lista solta.', 'Chunks ajudam fluência.', 'Use palavras em frases e diálogos.'],
    nextLessonBridge: 'Na próxima parte do A2.6, vamos revisar Reading, Listening, Speaking e Writing antes dos checkpoints finais.',
  }),
]);

export const A2_DEEP_REVIEWS_CHECKPOINTS_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(A2_DEEP_REVIEWS_CHECKPOINTS.filter((lesson) => lesson.pillar === 'grammar')),
  vocabulary: Object.freeze(A2_DEEP_REVIEWS_CHECKPOINTS.filter((lesson) => lesson.pillar === 'vocabulary')),
  reading: Object.freeze(A2_DEEP_REVIEWS_CHECKPOINTS.filter((lesson) => lesson.pillar === 'reading')),
  listening: Object.freeze(A2_DEEP_REVIEWS_CHECKPOINTS.filter((lesson) => lesson.pillar === 'listening')),
  speaking: Object.freeze(A2_DEEP_REVIEWS_CHECKPOINTS.filter((lesson) => lesson.pillar === 'speaking')),
  writing: Object.freeze(A2_DEEP_REVIEWS_CHECKPOINTS.filter((lesson) => lesson.pillar === 'writing')),
});
