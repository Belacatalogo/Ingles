import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'A2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['a2-2', 'past-stories', 'restaurants-shopping', 'past-negative', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }
function ex(text, translation, why = '', warning = '') { return { text, translation, why, warning }; }

export const A2_DEEP_PAST_STORIES_PART3 = Object.freeze([
  createGrammarLesson({
    ...common,
    id: 'A2-GRAMMAR-004',
    order: 4,
    title: 'Past Simple — negative',
    objectives: ['Formar negativas no Past Simple com did not / didn’t.', 'Usar verbo base depois de didn’t.', 'Negar ações regulares e irregulares no passado.', 'Evitar erros como didn’t went e didn’t worked.'],
    teacherOpening: 'Agora você vai aprender a negar ações no passado. A regra central é simples: didn’t + verbo base. I didn’t work. She didn’t go. We didn’t buy anything. O erro mais comum é colocar o verbo no passado depois de didn’t: I didn’t went, She didn’t worked. Isso está errado.',
    whyItMatters: 'Para contar experiências reais, você precisa dizer o que aconteceu e o que não aconteceu: I didn’t like the food, I didn’t buy the jacket, the hotel didn’t have breakfast. Negativas deixam suas histórias mais completas.',
    realLifeUseCases: ['Dizer que não gostou de algo.', 'Explicar que não comprou algo.', 'Dizer que não foi a um lugar.', 'Relatar problema de hotel/restaurante.', 'Responder perguntas sobre experiências passadas.'],
    conceptExplanation: 'No Past Simple negativo, use subject + didn’t + base verb. Did marca o passado; por isso o verbo principal volta para a forma base. I didn’t go. She didn’t buy. We didn’t stay. They didn’t like it.',
    mentalModel: { title: 'didn’t carrega o passado', summary: 'Depois de didn’t, o verbo volta para a base.', steps: ['went → didn’t go', 'bought → didn’t buy', 'worked → didn’t work', 'liked → didn’t like'] },
    stepByStep: [task('Comece com o sujeito.'), task('Adicione didn’t.'), task('Use o verbo na forma base.'), task('Complete a frase.'), task('Revise se não deixou verbo no passado depois de didn’t.')],
    portugueseContrast: [task('Em português, o verbo continua passado: eu não fui. Em inglês, didn’t já marca passado: I didn’t go.'), task('Não diga I didn’t went.'), task('Não diga She didn’t bought.'), task('Não diga We didn’t worked.')],
    guidedDiscovery: [task('Didn’t indica passado negativo.'), task('Go é base; went só aparece em afirmativa.'), task('Buy é base; bought só aparece em afirmativa.')],
    guidedBeforeQuiz: [task('Corrija: I didn’t went.', 'I didn’t go.'), task('Corrija: She didn’t bought it.', 'She didn’t buy it.'), task('Complete: We didn’t ___ at the hotel. (stay)', 'stay')],
    grammarGoal: 'Negar ações passadas com didn’t + verbo base.',
    formationGuide: [task('Subject + didn’t + base verb', 'I didn’t like the food.'), task('Regular verb negative', 'We didn’t work yesterday.'), task('Irregular verb negative', 'She didn’t go to the hotel.'), task('Object negative', 'I didn’t buy the jacket.')],
    whenToUse: [task('Para ações que não aconteceram no passado.'), task('Para negar experiências e decisões.'), task('Para relatar problemas de viagem, compra e restaurante.')],
    whenNotToUse: [task('Não use didn’t com verbo no passado.'), task('Não use didn’t com was/were neste bloco.'), task('Não use don’t para passado.')],
    grammarTable: [
      { pattern: 'go → didn’t go', example: 'I didn’t go to the restaurant.', translation: 'Eu não fui ao restaurante.' },
      { pattern: 'buy → didn’t buy', example: 'She didn’t buy the dress.', translation: 'Ela não comprou o vestido.' },
      { pattern: 'like → didn’t like', example: 'We didn’t like the food.', translation: 'Nós não gostamos da comida.' },
      { pattern: 'stay → didn’t stay', example: 'They didn’t stay at the hotel.', translation: 'Eles não ficaram no hotel.' }
    ],
    teacherExamples: [
      { english: 'I didn’t like the salad because it was too small.', translation: 'Eu não gostei da salada porque era pequena demais.', why: 'Didn’t + like.' },
      { english: 'She didn’t buy the shoes because they were expensive.', translation: 'Ela não comprou os sapatos porque eram caros.', why: 'Didn’t + buy.' },
      { english: 'We didn’t take a taxi because the station was near.', translation: 'Nós não pegamos táxi porque a estação era perto.', why: 'Didn’t + take.' },
      { english: 'He didn’t stay at the hotel.', translation: 'Ele não ficou no hotel.', why: 'Didn’t + stay.' }
    ],
    commonBrazilianMistakes: [mistake('I didn’t went.', 'I didn’t go.', 'Depois de didn’t, use verbo base.'), mistake('She didn’t bought it.', 'She didn’t buy it.', 'Bought vira buy depois de didn’t.'), mistake('We didn’t stayed at the hotel.', 'We didn’t stay at the hotel.', 'Stayed vira stay depois de didn’t.'), mistake('I don’t liked the food.', 'I didn’t like the food.', 'Passado negativo usa didn’t.')],
    controlledPractice: [task('Complete: I didn’t ___ the food. (like)', 'like'), task('Complete: She didn’t ___ a ticket. (buy)', 'buy'), task('Complete: We didn’t ___ by taxi. (travel)', 'travel'), task('Complete: They didn’t ___ to the restaurant. (go)', 'go')],
    errorCorrectionPractice: [task('Corrija: I didn’t liked it.', 'I didn’t like it.'), task('Corrija: He didn’t took a taxi.', 'He didn’t take a taxi.'), task('Corrija: They didn’t visited the city.', 'They didn’t visit the city.')],
    transformationPractice: [task('Transforme em negativa: I liked the food.', 'I didn’t like the food.'), task('Transforme em negativa: She bought a jacket.', 'She didn’t buy a jacket.'), task('Transforme em negativa: We went to the hotel.', 'We didn’t go to the hotel.')],
    translationPractice: [task('Eu não gostei da comida.', 'I didn’t like the food.'), task('Ela não comprou o vestido.', 'She didn’t buy the dress.'), task('Nós não pegamos táxi.', 'We didn’t take a taxi.')],
    productionTasks: [task('Escreva 8 frases negativas no passado.'), task('Conte uma experiência de compra usando didn’t buy/didn’t like.'), task('Explique 3 problemas de restaurante ou hotel usando didn’t.')],
    finalChecklist: [task('Usei didn’t?'), task('O verbo depois de didn’t está na base?'), task('Evitei don’t para passado?'), task('Minha frase tem complemento claro?')],
    selfAssessment: [task('Consigo negar ações passadas?'), task('Consigo corrigir didn’t went?'), task('Consigo usar didn’t em histórias?')],
    lessonRecap: ['Past negative usa didn’t + base verb.', 'Didn’t já marca passado.', 'Went vira go depois de didn’t.', 'Negativas ajudam a relatar problemas e decisões.'],
    nextLessonBridge: 'Agora você vai expandir vocabulário de restaurante para usar negativas e opiniões em situações reais.',
  }),

  createVocabularyLesson({
    ...common,
    id: 'A2-VOCABULARY-005',
    order: 5,
    title: 'Restaurants and ordering',
    objectives: ['Aprender vocabulário de restaurante e pedidos.', 'Usar phrases educadas para pedir comida e bebida.', 'Descrever comida, serviço, preço e problemas simples.', 'Preparar fala e escrita de review/restaurante.'],
    teacherOpening: 'Restaurants and ordering aprofunda a situação de pedir comida. Você vai aprender menu, starter, main course, dessert, drink, waiter, bill, tip, table, order, delicious, spicy, cold, expensive e polite requests como I’d like... e Can I have...?',
    whyItMatters: 'Restaurante é uma situação real e frequente. No A2, você precisa pedir, perguntar, reclamar de forma simples e contar depois como foi a experiência.',
    realLifeUseCases: ['Pedir comida e bebida.', 'Pedir a conta.', 'Falar de preço e serviço.', 'Dizer que não gostou de algo.', 'Escrever avaliação de restaurante.'],
    conceptExplanation: 'Organize restaurant vocabulary por partes: people, food, drinks, menu, service, price e opinion. Use I’d like para pedido educado e The bill, please para pedir a conta.',
    mentalModel: { title: 'restaurante = menu + pedido + serviço + opinião', summary: 'Você precisa pedir e depois avaliar.', steps: ['read the menu', 'order food', 'ask for the bill', 'describe the experience'] },
    stepByStep: [task('Aprenda itens do menu.'), task('Aprenda pessoas e objetos.'), task('Aprenda frases de pedido.'), task('Aprenda adjetivos de opinião.'), task('Crie um mini diálogo.')],
    portugueseContrast: [task('Bill = conta; account não é usado para pedir conta no restaurante.'), task('Tip = gorjeta.'), task('Starter = entrada; main course = prato principal.'), task('Dessert tem dois s e soa como sobremesa, não deserto.')],
    guidedDiscovery: [task('Waiter é pessoa.'), task('Menu é objeto/lista.'), task('Delicious é opinião positiva.'), task('Expensive é opinião sobre preço.')],
    guidedBeforeQuiz: [task('I’d like the pasta, please.'), task('Can I have water, please?'), task('The bill, please.'), task('The service was slow.')],
    topicContext: 'Você vai pedir comida, entender atendimento e descrever experiência em restaurante.',
    essentialWords: [vocab('menu', 'cardápio', 'Can I see the menu?'), vocab('starter', 'entrada', 'We ordered a starter.'), vocab('main course', 'prato principal', 'The main course was pasta.'), vocab('dessert', 'sobremesa', 'The dessert was delicious.'), vocab('drink', 'bebida', 'I ordered a drink.'), vocab('waiter', 'garçom', 'The waiter was friendly.'), vocab('bill', 'conta', 'Can I have the bill?'), vocab('tip', 'gorjeta', 'The tip was included.'), vocab('table', 'mesa', 'We booked a table.'), vocab('order', 'pedir/pedido', 'I ordered pasta.'), vocab('delicious', 'delicioso', 'The food was delicious.'), vocab('spicy', 'apimentado', 'The soup was spicy.'), vocab('cold', 'frio', 'The food was cold.'), vocab('expensive', 'caro', 'The bill was expensive.'), vocab('cheap', 'barato', 'The meal was cheap.'), vocab('slow', 'lento', 'The service was slow.'), vocab('friendly', 'simpático', 'The waiter was friendly.'), vocab('full', 'cheio', 'The restaurant was full.')],
    chunks: [{ chunk: 'I’d like...', translation: 'Eu gostaria...', example: 'I’d like the pasta, please.' }, { chunk: 'Can I have...?', translation: 'Pode me trazer...?', example: 'Can I have water?' }, { chunk: 'The bill, please.', translation: 'A conta, por favor.', example: 'The bill, please.' }, { chunk: 'The service was slow.', translation: 'O atendimento foi lento.', example: 'The service was slow.' }, { chunk: 'The food was delicious.', translation: 'A comida estava deliciosa.', example: 'The food was delicious.' }],
    pronunciationFocus: { title: 'Foco sonoro', tips: ['Dessert tem stress na segunda parte.', 'Menu soa como MEN-yoo.', 'Delicious tem stress em LI: de-LI-cious.'] },
    dangerousConfusions: [task('Desert = deserto; dessert = sobremesa.'), task('Bill = conta de restaurante; account = conta bancária/perfil.'), task('Order pode ser verbo e substantivo.'), task('Spicy não é temperado em geral; é apimentado.')],
    collocations: [task('read the menu'), task('order pasta'), task('ask for the bill'), task('leave a tip'), task('book a table'), task('friendly waiter'), task('slow service')],
    miniDialogues: [{ title: 'Ordering dinner', lines: ['A: Are you ready to order?', 'B: Yes. I’d like the pasta, please.', 'A: Anything to drink?', 'B: Water, please.', 'A: Anything else?', 'B: No, thank you.'], focus: 'Pedido educado.' }],
    examples: [ex('I ordered the main course and a drink.', 'Pedi o prato principal e uma bebida.', 'Pedido.'), ex('The waiter was friendly, but the service was slow.', 'O garçom era simpático, mas o atendimento foi lento.', 'Opinião com contraste.'), ex('I didn’t like the soup because it was too spicy.', 'Não gostei da sopa porque era apimentada demais.', 'Negativa + motivo.')],
    recognitionPractice: [{ question: 'Restaurants and ordering — qual vocabulário desta aula significa "cardápio"?', options: ['menu', 'starter', 'main course'], answer: 'menu', explanation: 'menu = cardápio; vocabulário trabalhado nesta aula de Restaurants and ordering.' }, task('Qual palavra é pessoa?', 'waiter'), task('Qual palavra é preço?', 'expensive/cheap/bill'), task('Qual palavra é sobremesa?', 'dessert'), task('Qual phrase pede a conta?', 'The bill, please.')],
    usagePractice: [task('Complete: I’d like the ___, please.', 'pasta/main course/dessert'), task('Complete: Can I have the ___?', 'bill/menu'), task('Complete: The service was ___.', 'slow/friendly'), task('Complete: I didn’t ___ the soup.', 'like')],
    productionTasks: [task('Crie 5 frases de pedido em restaurante.'), task('Crie 5 frases avaliando comida e serviço.'), task('Crie um mini diálogo waiter/customer.')],
    spacedReview: [task('Revise bill/tip/dessert/waiter amanhã.'), task('Crie 3 frases com I’d like e 3 com Can I have.')],
    selfAssessment: [task('Consigo pedir comida?'), task('Consigo pedir a conta?'), task('Consigo avaliar comida/serviço?')],
    lessonRecap: ['Restaurant vocabulary combina pedido e opinião.', 'I’d like é pedido educado.', 'Bill é conta.', 'Adjetivos ajudam a avaliar experiência.'],
    nextLessonBridge: 'Na Reading, você vai ler uma mensagem/recibo de compras.',
  }),

  createReadingLesson({
    ...common,
    id: 'A2-READING-005',
    order: 5,
    title: 'A shopping receipt and message',
    objectives: ['Ler recibo e mensagem curta de compras.', 'Identificar item, preço, tamanho, desconto e problema.', 'Reconhecer vocabulário de loja e roupas.', 'Responder com evidência textual.'],
    teacherOpening: 'Nesta leitura, você vai lidar com texto prático: recibo + mensagem. O objetivo é localizar item, preço, tamanho, desconto e motivo de troca/devolução. Isso prepara situações reais de compras no A2.',
    whyItMatters: 'Compras geram textos curtos e cheios de detalhes: recibos, mensagens, preços e tamanhos. Você precisa encontrar informações específicas rápido.',
    realLifeUseCases: ['Ler recibo de loja.', 'Entender preço e desconto.', 'Identificar tamanho/cor.', 'Explicar problema de compra.', 'Preparar diálogo de troca ou compra.'],
    conceptExplanation: 'Em receipt/message, use scanning. Procure product, size, color, price, discount, total, problem. Não leia como história longa; leia como dados práticos.',
    mentalModel: { title: 'compra = item + tamanho + preço + problema', summary: 'Esses dados respondem quase tudo.', steps: ['item', 'size/color', 'price/discount', 'problem', 'action'] },
    stepByStep: [task('Identifique o tipo de texto.'), task('Marque produto e tamanho.'), task('Marque preço/desconto/total.'), task('Leia a mensagem para achar o problema.'), task('Responda com evidência.')],
    portugueseContrast: [task('Receipt = recibo/nota.'), task('Size = tamanho.'), task('Discount = desconto.'), task('Return = devolver; exchange = trocar.')],
    guidedDiscovery: [task('Total mostra valor final.'), task('Size M mostra tamanho.'), task('Too small mostra problema.'), task('Exchange indica troca.')],
    guidedBeforeQuiz: [task('Procure item.'), task('Procure size.'), task('Procure price.'), task('Procure problem.')],
    readingPurpose: 'Ler recibo e mensagem de compra para localizar detalhes.',
    preReadingVocabulary: [vocab('receipt', 'recibo'), vocab('size', 'tamanho'), vocab('discount', 'desconto'), vocab('total', 'total'), vocab('exchange', 'trocar'), vocab('return', 'devolver')],
    readingStrategy: [task('Use scanning para números e itens.'), task('Compare recibo e mensagem.'), task('Use evidência exata.'), task('Cuidado com preço antes/depois de desconto.')],
    mainText: `Receipt — City Clothes
Item: Blue jacket
Size: M
Price: $60
Discount: $10
Total: $50

Message: Hi, I bought this blue jacket yesterday, but it is too small. I didn’t try it on in the store because I was in a hurry. Can I exchange it for size L? I have the receipt.`,
    firstReadTask: task('Qual é o assunto geral?', 'Uma compra de jaqueta e pedido de troca.'),
    secondReadTasks: [task('Qual item foi comprado?', 'blue jacket'), task('Qual tamanho foi comprado?', 'M'), task('Qual foi o total?', '$50'), task('Por que quer trocar?', 'it is too small')],
    evidenceQuestions: [q('Texto da aula — what did the person buy?', 'a blue jacket', 'Item: Blue jacket', '', ['a blue jacket','black shoes','a white shirt']), q('What size is the jacket?', 'M', 'Size: M', '', ['M','L','S']), q('What was the discount?', '$10', 'Discount: $10', '', ['$10','$50','$60']), q('Why does the person want to exchange it?', 'because it is too small', 'it is too small', '', ['too small','too expensive','wrong color']), q('What size does the person want?', 'L', 'exchange it for size L', '', ['L','M','S'])],
    contextVocabularyTasks: [task('Try it on significa experimentar roupa.'), task('In a hurry significa com pressa.'), task('Exchange indica troca, não só devolução.')],
    guidedSummary: task('Complete: The person bought a ___ jacket, size ___. The total was ___. The jacket is too ___, so they want size ___.', '', 'blue / M / $50 / small / L'),
    connectedProduction: task('Escreva uma mensagem curta pedindo troca de uma roupa.'),
    selfAssessment: [task('Consigo ler recibo?'), task('Consigo localizar preço/desconto?'), task('Consigo entender motivo de troca?')],
    lessonRecap: ['Shopping texts são dados práticos.', 'Receipt mostra item/preço/total.', 'Message explica problema.', 'Exchange é troca.'],
    nextLessonBridge: 'No Listening, você vai ouvir uma compra de roupas.',
  }),

  createListeningLesson({
    ...common,
    id: 'A2-LISTENING-005',
    order: 5,
    title: 'Shopping for clothes',
    objectives: ['Ouvir diálogo de compra de roupas.', 'Identificar item, tamanho, cor e preço.', 'Reconhecer pedido para experimentar roupa.', 'Praticar dictation e shadowing de loja.'],
    teacherOpening: 'Nesta escuta, você vai ouvir uma compra de roupa. O foco é item, size, color, price e try it on. Na primeira escuta, entenda o item. Na segunda, tamanho/cor/preço. Depois, shadowing.',
    whyItMatters: 'Comprar roupa em inglês exige perguntas curtas e detalhes: size, color, price, fitting room. É uma situação prática e muito comum.',
    realLifeUseCases: ['Comprar roupa.', 'Perguntar preço.', 'Pedir tamanho.', 'Pedir para experimentar.', 'Entender atendimento de loja.'],
    conceptExplanation: 'Ouça perguntas previsíveis: What size? What color? How much is it? Can I try it on? The fitting room is over there. Foque nos dados, não em todas as palavras.',
    mentalModel: { title: 'loja = item + size + color + price', summary: 'Esses quatro dados resolvem a compra.', steps: ['item', 'size', 'color', 'price', 'try it on'] },
    stepByStep: [task('Primeira escuta: item.'), task('Segunda escuta: tamanho e cor.'), task('Terceira etapa: preço e experimentação.'), task('Leia transcript.'), task('Faça dictation.'), task('Faça shadowing.')],
    portugueseContrast: [task('Can I try it on? = posso experimentar?'), task('How much is it? = quanto custa?'), task('Fitting room = provador.'), task('Size M/L não precisa traduzir.')],
    guidedDiscovery: [task('What size? pede tamanho.'), task('How much? pede preço.'), task('Try it on pede experimentar.')],
    guidedBeforeQuiz: [task('Primeira escuta: que roupa?'), task('Segunda escuta: tamanho e preço?')],
    listeningPreparation: [task('Não leia transcript antes da primeira escuta.'), task('Prepare: jacket, size, blue, price, try it on, fitting room.'), task('Objetivo: item + tamanho + preço.')],
    keyWordsToHear: [vocab('jacket','jaqueta'), vocab('size','tamanho'), vocab('blue','azul'), vocab('price','preço'), vocab('try it on','experimentar'), vocab('fitting room','provador')],
    audioScript: `Assistant: Hello. Can I help you?
Customer: Yes. I’m looking for a jacket.
Assistant: What size do you need?
Customer: Size M, please.
Assistant: We have this blue jacket.
Customer: How much is it?
Assistant: It’s sixty dollars, but today it has a ten-dollar discount.
Customer: Great. Can I try it on?
Assistant: Of course. The fitting room is over there.`,
    firstListenTasks: [task('Sem transcript: qual item a pessoa procura?', 'a jacket'), task('Sem transcript: a pessoa quer experimentar?', 'yes')],
    secondListenTasks: [task('Qual tamanho?', 'M'), task('Qual cor?', 'blue'), task('Qual preço original?', 'sixty dollars'), task('Qual desconto?', 'ten dollars')],
    transcript: `Assistant: Hello. Can I help you?
Customer: Yes. I’m looking for a jacket.
Assistant: What size do you need?
Customer: Size M, please.
Assistant: We have this blue jacket.
Customer: How much is it?
Assistant: It’s sixty dollars, but today it has a ten-dollar discount.
Customer: Great. Can I try it on?
Assistant: Of course. The fitting room is over there.`,
    vocabulary: [vocab('I’m looking for', 'estou procurando'), vocab('discount', 'desconto'), vocab('over there', 'ali/lá'), vocab('of course', 'claro')],
    shadowing: [task('I’m looking for a jacket.'), task('What size do you need?'), task('How much is it?'), task('It has a ten-dollar discount.'), task('Can I try it on?')],
    dictationTasks: [task('Digite: I’m looking for a jacket.', 'I’m looking for a jacket.'), task('Digite: How much is it?', 'How much is it?'), task('Digite: Can I try it on?', 'Can I try it on?')],
    pronunciationChunks: [task('looking for a', 'Conecte looking-for-a.'), task('How much is it', 'Pergunta em bloco.'), task('try it on', 'Três palavras conectadas.')],
    listeningComprehension: [q('Áudio da aula — Shopping for clothes — what is the customer looking for?', 'a jacket', 'I’m looking for a jacket.', '', ['a jacket','a shirt','shoes']), q('What size does the customer need?', 'M', 'Size M, please.', '', ['M','L','S']), q('What color is the jacket?', 'blue', 'this blue jacket', '', ['blue','black','red']), q('How much is the discount?', 'ten dollars', 'a ten-dollar discount', '', ['ten dollars','sixty dollars','fifty dollars'])],
    oralProduction: task('Pratique uma compra de roupa: item, tamanho, preço e Can I try it on?'),
    selfAssessment: [task('Consegui ouvir item/tamanho/cor?'), task('Consegui ouvir preço/desconto?'), task('Consigo repetir perguntas de loja?')],
    lessonRecap: ['Shopping listening busca item, size, color e price.', 'Can I try it on? é chunk essencial.', 'Discount altera preço final.', 'Fitting room é provador.'],
    nextLessonBridge: 'No Speaking, você vai praticar pedido educado de comida.',
  }),

  createSpeakingLesson({
    ...common,
    id: 'A2-SPEAKING-005',
    order: 5,
    title: 'Order food politely',
    objectives: ['Pedir comida de forma educada.', 'Usar I’d like e Can I have em restaurante.', 'Fazer pedidos extras e pedir a conta.', 'Gravar diálogo waiter/customer.'],
    teacherOpening: 'Agora você vai praticar falar em restaurante. O objetivo é soar educado e claro: I’d like the pasta, please. Can I have water? Could I have the bill, please? A2 exige que você consiga manter um pequeno diálogo funcional.',
    whyItMatters: 'Pedir comida é uma situação prática e recorrente. Você usa vocabulário, pedidos educados, perguntas e respostas curtas.',
    realLifeUseCases: ['Pedir prato principal.', 'Pedir bebida.', 'Perguntar ingredientes/preço.', 'Pedir a conta.', 'Responder waiter/customer.'],
    conceptExplanation: 'Use I’d like + item para pedido principal. Use Can I have...? para bebida, conta ou extra. Use please e thank you. Se não gostou ou não quer algo, use I don’t want... ou I didn’t like... quando falar depois.',
    mentalModel: { title: 'pedido educado em 4 passos', summary: 'Prato, bebida, extra, conta.', steps: ['I’d like...', 'Can I have...?', 'Anything else?', 'The bill, please.'] },
    stepByStep: [task('Cumprimente.'), task('Peça prato com I’d like.'), task('Peça bebida com Can I have.'), task('Responda Anything else?'), task('Peça a conta.'), task('Agradeça.')],
    portugueseContrast: [task('I want pode soar direto demais; prefira I’d like.'), task('Bill é conta do restaurante.'), task('Please/thank you mudam o tom.'), task('Can I have...? é natural para pedir.')],
    guidedDiscovery: [task('I’d like introduz pedido.'), task('Can I have water? pede bebida.'), task('The bill, please fecha a refeição.')],
    guidedBeforeQuiz: [task('Repita: I’d like the pasta, please.'), task('Repita: Can I have water, please?'), task('Repita: The bill, please.')],
    speakingSituation: 'Você está em um restaurante e precisa pedir comida, bebida e a conta.',
    modelPhrases: [phrase('I’d like the pasta, please.', 'Eu gostaria da massa, por favor.'), phrase('Can I have water, please?', 'Pode me trazer água, por favor?'), phrase('Would you like a salad?', 'Você gostaria de uma salada?'), phrase('No, thank you.', 'Não, obrigado.'), phrase('Can I have the bill, please?', 'Pode me trazer a conta, por favor?')],
    pronunciationChunks: [task('I’d like the', 'Contração I would.'), task('Can I have', 'Pedido em bloco.'), task('the bill please', 'Fechamento de restaurante.')],
    repeatAfterMe: [task('I’d like the pasta, please.'), task('Can I have a small salad?'), task('Anything to drink?'), task('Water, please.'), task('Can I have the bill, please?')],
    substitutionDrills: [task('pasta → soup', 'I’d like the soup, please.'), task('water → coffee', 'Can I have coffee, please?'), task('bill → menu', 'Can I have the menu, please?')],
    guidedSpeaking: [task('Peça um prato principal.'), task('Peça uma bebida.'), task('Responda se quer sobremesa.'), task('Peça a conta.'), task('Agradeça.')],
    recordingTasks: [task('Grave 5 frases de restaurante.'), task('Grave diálogo de 8 linhas waiter/customer.'), task('Grave versão final com prato, bebida e conta.')],
    freeSpeaking: task('Simule um pedido completo em restaurante por até 60 segundos.'),
    feedbackChecklist: [task('Usei I’d like?'), task('Usei Can I have?'), task('Usei please/thank you?'), task('Pedi comida, bebida e conta?'), task('Soou educado?')],
    selfAssessment: [task('Consigo pedir comida?'), task('Consigo pedir bebida?'), task('Consigo pedir a conta?')],
    lessonRecap: ['Restaurante exige pedidos educados.', 'I’d like é ótimo para comida.', 'Can I have serve para bebida/conta/extra.', 'Please e thank you completam o tom.'],
    nextLessonBridge: 'Na Writing, você vai escrever uma avaliação curta de restaurante.',
  }),

  createWritingLesson({
    ...common,
    id: 'A2-WRITING-005',
    order: 5,
    title: 'Write a restaurant review',
    objectives: ['Escrever avaliação curta de restaurante.', 'Descrever comida, serviço, preço e opinião.', 'Usar Past Simple e conectores simples.', 'Revisar clareza, opinião e evidência.'],
    teacherOpening: 'Agora você vai escrever uma avaliação curta de restaurante. Uma review A2 precisa dizer onde foi, o que pediu, como era a comida, como foi o serviço, preço e opinião final.',
    whyItMatters: 'Reviews são textos reais e úteis. Você aprende a expressar opinião de forma organizada e prática, usando passado e adjetivos.',
    realLifeUseCases: ['Avaliar restaurante.', 'Recomendar ou não recomendar um lugar.', 'Falar de comida e serviço.', 'Contar experiência passada.', 'Escrever comentário curto online.'],
    conceptExplanation: 'Organize a review em 5 partes: place/time, food, service, price, final opinion. Use past simple: I went, I ordered, the food was, the service was. Use but para contraste e because para motivo.',
    mentalModel: { title: 'review em 5 partes', summary: 'Lugar, comida, serviço, preço e opinião final.', steps: ['place/time', 'food', 'service', 'price', 'recommendation'] },
    stepByStep: [task('Diga onde/quando foi.'), task('Diga o que pediu.'), task('Avalie a comida.'), task('Avalie serviço/preço.'), task('Dê opinião final.'), task('Revise conectores.')],
    portugueseContrast: [task('Não escreva só “was good”. Dê detalhe.'), task('Use the food was / the service was.'), task('Use bill para conta/preço final.'), task('Use recommend para recomendar.')],
    guidedDiscovery: [task('I went mostra experiência passada.'), task('I ordered mostra pedido.'), task('The food was delicious mostra opinião.'), task('I recommend it fecha review.')],
    guidedBeforeQuiz: [task('Modelo: I went to a small restaurant last night.'), task('Modelo: I ordered pasta.'), task('Modelo: The food was delicious.'), task('Modelo: The bill was expensive.')],
    writingPurpose: 'Escrever avaliação curta de restaurante A2.',
    modelText: `Last night, I went to a small Italian restaurant near my hotel. I ordered pasta and a salad. The pasta was delicious, but the salad was too small. The waiter was friendly, and the service was fast. The bill was expensive, but I liked the place. I recommend it for dinner.`,
    writingBlocks: [task('Place/time', 'Last night, I went to a small Italian restaurant.'), task('Food', 'I ordered pasta and a salad.'), task('Food opinion', 'The pasta was delicious, but the salad was small.'), task('Service', 'The waiter was friendly.'), task('Price', 'The bill was expensive.'), task('Final opinion', 'I recommend it for dinner.')],
    guidedSubstitution: [task('Troque Italian restaurant por café/fast food restaurant.'), task('Troque pasta por soup/burger/salad.'), task('Troque delicious por cold/spicy/good.'), task('Troque expensive por cheap/reasonable.')],
    grammarForWriting: [task('Use Past Simple para experiência.'), task('Use was/were para descrição.'), task('Use but para contraste.'), task('Use because para motivo.'), task('Use recommend para opinião final.')],
    checklist: [task('Incluí lugar/tempo?'), task('Incluí o que pedi?'), task('Avaliei comida?'), task('Avaliei serviço/preço?'), task('Dei opinião final?'), task('Revisei passado e pontuação?')],
    draftTask: task('Escreva uma review de 5 a 7 frases sobre restaurante real ou inventado.'),
    revisionTask: task('Revise se há comida, serviço, preço, opinião e conectores.'),
    commonMistakes: [mistake('I go to a restaurant last night.', 'I went to a restaurant last night.', 'Experiência passada usa went.'), mistake('The food delicious.', 'The food was delicious.', 'Precisa de was.'), mistake('I recommend for dinner.', 'I recommend it for dinner.', 'Recommend precisa de objeto aqui.')],
    productionTasks: [task('Escreva uma review positiva.'), task('Escreva uma review com um problema.'), task('Reescreva usando but e because.')],
    selfAssessment: [task('Consigo escrever review curta?'), task('Consigo dar opinião com detalhe?'), task('Consigo revisar past simple?')],
    lessonRecap: ['Review combina experiência e opinião.', 'Use lugar, comida, serviço, preço e conclusão.', 'Past Simple organiza o relato.', 'But/because deixam a opinião mais natural.'],
    nextLessonBridge: 'No próximo bloco A2.2, você continuará com Past Simple questions, compras/preços, farmácia e direções.',
  }),
]);

export const A2_DEEP_PAST_STORIES_PART3_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(A2_DEEP_PAST_STORIES_PART3.filter((lesson) => lesson.pillar === 'grammar')),
  vocabulary: Object.freeze(A2_DEEP_PAST_STORIES_PART3.filter((lesson) => lesson.pillar === 'vocabulary')),
  reading: Object.freeze(A2_DEEP_PAST_STORIES_PART3.filter((lesson) => lesson.pillar === 'reading')),
  listening: Object.freeze(A2_DEEP_PAST_STORIES_PART3.filter((lesson) => lesson.pillar === 'listening')),
  speaking: Object.freeze(A2_DEEP_PAST_STORIES_PART3.filter((lesson) => lesson.pillar === 'speaking')),
  writing: Object.freeze(A2_DEEP_PAST_STORIES_PART3.filter((lesson) => lesson.pillar === 'writing')),
});
