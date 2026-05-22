import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'A2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['a2-2', 'past-stories', 'hotel-restaurant', 'irregular-verbs', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }
function ex(text, translation, why = '', warning = '') { return { text, translation, why, warning }; }

export const A2_DEEP_PAST_STORIES_PART2 = Object.freeze([
  createGrammarLesson({
    ...common,
    id: 'A2-GRAMMAR-003',
    order: 3,
    title: 'Past Simple — irregular verbs affirmative',
    objectives: ['Usar verbos irregulares frequentes no Past Simple afirmativo.', 'Diferenciar verbos regulares e irregulares.', 'Narrar ações passadas com went, had, bought, took, got e saw.', 'Evitar adicionar -ed em verbos irregulares básicos.'],
    teacherOpening: 'Agora você vai entrar nos verbos irregulares mais úteis. Eles não usam -ed: go vira went, have vira had, buy vira bought, take vira took, get vira got, see vira saw. No A2, você não precisa saber todos; precisa dominar os mais frequentes para contar histórias reais.',
    whyItMatters: 'Muitas ações comuns no passado usam verbos irregulares: fui, tive, comprei, peguei, cheguei/consegui, vi. Sem eles, suas histórias ficam artificiais ou incorretas.',
    realLifeUseCases: ['Falar do fim de semana.', 'Contar uma viagem.', 'Dizer o que comprou ou comeu.', 'Falar de hotel/restaurante.', 'Relatar uma experiência simples.'],
    conceptExplanation: 'Past Simple irregular affirmative usa a forma passada própria do verbo. I went to the hotel. She had breakfast. We bought tickets. They took a taxi. I got a room. He saw the museum. Não coloque -ed nesses verbos.',
    mentalModel: { title: 'verbo irregular = forma própria', summary: 'Alguns verbos não aceitam -ed no passado.', steps: ['go → went', 'have → had', 'buy → bought', 'take → took', 'see → saw'] },
    stepByStep: [task('Identifique se o verbo é irregular comum.'), task('Use a forma passada correta.'), task('Adicione tempo/lugar.'), task('Monte frase curta.'), task('Revise se não colocou -ed.')],
    portugueseContrast: [task('Não diga goed; diga went.'), task('Não diga buyed; diga bought.'), task('Não diga taked; diga took.'), task('Em afirmativa simples, não use did antes do verbo passado.')],
    guidedDiscovery: [task('Went indica go no passado.'), task('Had pode ser tive/comi dependendo do contexto.'), task('Took pode significar peguei/tomei transporte.')],
    guidedBeforeQuiz: [task('go → ___', 'went'), task('have → ___', 'had'), task('buy → ___', 'bought'), task('take → ___', 'took'), task('see → ___', 'saw')],
    grammarGoal: 'Narrar ações passadas afirmativas com verbos irregulares frequentes.',
    formationGuide: [task('Subject + irregular past + complement', 'I went to the hotel.'), task('Subject + irregular past + time', 'She had breakfast at seven.'), task('Subject + irregular past + object', 'We bought tickets.')],
    whenToUse: [task('Ações concluídas no passado com verbos irregulares.'), task('Relatos de viagem, compras, refeição e experiência.'), task('Histórias curtas A2.')],
    whenNotToUse: [task('Não use -ed em irregular conhecido.'), task('Não use did em afirmativa simples.'), task('Não use forma presente quando há yesterday/last/ago.')],
    grammarTable: [
      { pattern: 'go → went', example: 'I went to the hotel.', translation: 'Eu fui ao hotel.' },
      { pattern: 'have → had', example: 'We had dinner.', translation: 'Nós jantamos/tivemos jantar.' },
      { pattern: 'buy → bought', example: 'She bought a ticket.', translation: 'Ela comprou uma passagem.' },
      { pattern: 'take → took', example: 'They took a taxi.', translation: 'Eles pegaram um táxi.' },
      { pattern: 'see → saw', example: 'I saw the museum.', translation: 'Eu vi o museu.' }
    ],
    teacherExamples: [
      { english: 'I went to the restaurant last night.', translation: 'Eu fui ao restaurante ontem à noite.', why: 'Go vira went.' },
      { english: 'She had breakfast at the hotel.', translation: 'Ela tomou café da manhã no hotel.', why: 'Have vira had.' },
      { english: 'We bought train tickets yesterday.', translation: 'Nós compramos passagens de trem ontem.', why: 'Buy vira bought.' },
      { english: 'He took a taxi because it was late.', translation: 'Ele pegou um táxi porque estava tarde.', why: 'Take vira took.' }
    ],
    commonBrazilianMistakes: [mistake('I goed to the hotel.', 'I went to the hotel.', 'Go é irregular: went.'), mistake('She buyed a ticket.', 'She bought a ticket.', 'Buy é irregular: bought.'), mistake('We taked a taxi.', 'We took a taxi.', 'Take é irregular: took.'), mistake('I did went to the restaurant.', 'I went to the restaurant.', 'Não use did em afirmativa simples.')],
    controlledPractice: [task('Complete: I ___ to the hotel. (go)', 'went'), task('Complete: We ___ dinner. (have)', 'had'), task('Complete: She ___ a ticket. (buy)', 'bought'), task('Complete: They ___ a taxi. (take)', 'took')],
    errorCorrectionPractice: [task('Corrija: I goed to the station.', 'I went to the station.'), task('Corrija: He buyed food.', 'He bought food.'), task('Corrija: We did saw the museum.', 'We saw the museum.')],
    transformationPractice: [task('Transforme para passado: I go to the hotel.', 'I went to the hotel.'), task('Transforme para passado: She buys a ticket.', 'She bought a ticket.'), task('Transforme para passado: We take a taxi.', 'We took a taxi.')],
    translationPractice: [task('Eu fui ao hotel ontem.', 'I went to the hotel yesterday.'), task('Ela comprou uma passagem.', 'She bought a ticket.'), task('Nós pegamos um táxi.', 'We took a taxi.')],
    productionTasks: [task('Escreva 8 frases com went/had/bought/took/got/saw.'), task('Conte uma viagem curta usando 4 verbos irregulares.'), task('Crie uma lista de irregular verbs essenciais para revisar.')],
    finalChecklist: [task('Usei a forma irregular correta?'), task('Evitei -ed em go/buy/take/see?'), task('Evitei did em afirmativa?'), task('Incluí tempo/lugar?')],
    selfAssessment: [task('Consigo usar went/had/bought/took?'), task('Consigo reconhecer erro como goed/buyed?'), task('Consigo contar história curta com irregulares?')],
    lessonRecap: ['Irregular verbs têm forma própria no passado.', 'Go vira went, buy vira bought, take vira took.', 'Não use did em afirmativa simples.', 'Irregulares tornam histórias A2 naturais.'],
    nextLessonBridge: 'Agora você vai expandir vocabulário de hotel e acomodação para usar esses verbos em situações reais.',
  }),

  createVocabularyLesson({
    ...common,
    id: 'A2-VOCABULARY-004',
    order: 4,
    title: 'Hotels and accommodation',
    objectives: ['Aprender vocabulário de hotel e acomodação.', 'Falar de quarto, reserva, recepção e serviços básicos.', 'Usar frases úteis para pedir informação ou resolver problema simples.', 'Conectar hotel com histórias no passado.'],
    teacherOpening: 'Hotels and accommodation aprofunda o que você viu no check-in. Agora você vai aprender room, reception, key card, elevator, breakfast, towel, shower, reservation, check-in, check-out, noisy, clean, comfortable e available.',
    whyItMatters: 'Hotel é uma situação real de viagem. Você precisa entender informações, pedir ajuda e descrever problemas simples: The room was noisy. I needed a towel. Breakfast was included.',
    realLifeUseCases: ['Fazer check-in.', 'Pedir toalha ou informação.', 'Falar se o quarto era limpo/confortável.', 'Explicar problema de hotel.', 'Escrever pedido de hotel.'],
    conceptExplanation: 'Organize hotel vocabulary por áreas: front desk/reception, room, services, problems e descriptions. Depois use em frases: I had a reservation. The room was clean. The shower didn’t work. Breakfast was included.',
    mentalModel: { title: 'hotel = reserva + quarto + serviço + problema', summary: 'Esses grupos resolvem quase toda situação básica.', steps: ['reservation', 'room/key', 'breakfast/towel', 'problem', 'request'] },
    stepByStep: [task('Aprenda palavras de recepção.'), task('Aprenda itens do quarto.'), task('Aprenda serviços.'), task('Aprenda adjetivos de descrição.'), task('Monte pedidos com Could/Can I... quando necessário.')],
    portugueseContrast: [task('Accommodation é hospedagem/acomodação.'), task('Available = disponível.'), task('Noisy = barulhento; quiet = silencioso.'), task('Key card = cartão-chave.')],
    guidedDiscovery: [task('Reception é onde faz check-in.'), task('Towel fica no quarto/banheiro.'), task('Noisy descreve problema de barulho.')],
    guidedBeforeQuiz: [task('I have a reservation.'), task('The room was clean.'), task('The shower didn’t work.'), task('Can I have a towel, please?')],
    topicContext: 'Você vai descrever hotel, quarto e problemas simples de acomodação.',
    essentialWords: [vocab('accommodation', 'hospedagem', 'The accommodation was good.'), vocab('reservation', 'reserva', 'I had a reservation.'), vocab('reception', 'recepção', 'I went to reception.'), vocab('front desk', 'recepção/balcão', 'The front desk was busy.'), vocab('room', 'quarto', 'The room was clean.'), vocab('single room', 'quarto individual', 'I booked a single room.'), vocab('double room', 'quarto duplo', 'We booked a double room.'), vocab('key card', 'cartão-chave', 'My key card didn’t work.'), vocab('elevator', 'elevador', 'The elevator was near my room.'), vocab('breakfast', 'café da manhã', 'Breakfast was included.'), vocab('towel', 'toalha', 'I needed a towel.'), vocab('shower', 'chuveiro/banho', 'The shower was cold.'), vocab('clean', 'limpo', 'The room was clean.'), vocab('dirty', 'sujo', 'The bathroom was dirty.'), vocab('comfortable', 'confortável', 'The bed was comfortable.'), vocab('noisy', 'barulhento', 'The room was noisy.'), vocab('quiet', 'silencioso', 'I wanted a quiet room.'), vocab('available', 'disponível', 'Is a room available?')],
    chunks: [{ chunk: 'I have a reservation', translation: 'Tenho uma reserva', example: 'I have a reservation.' }, { chunk: 'a quiet room', translation: 'um quarto silencioso', example: 'I wanted a quiet room.' }, { chunk: 'breakfast included', translation: 'café da manhã incluso', example: 'Breakfast was included.' }, { chunk: 'the key card didn’t work', translation: 'o cartão-chave não funcionou', example: 'My key card didn’t work.' }, { chunk: 'Can I have a towel?', translation: 'Pode me dar uma toalha?', example: 'Can I have a towel, please?' }],
    pronunciationFocus: { title: 'Foco sonoro', tips: ['Accommodation é palavra longa: a-com-mo-DA-tion.', 'Comfortable geralmente soa reduzido no meio.', 'Available tem stress em VAI: a-VAI-la-ble.'] },
    dangerousConfusions: [task('Room é quarto/cômodo; hotel room é quarto de hotel.'), task('Reservation é reserva; reserve é verbo.'), task('Available não significa avaliado.'), task('Breakfast included não é “included breakfast” como frase solta.')],
    collocations: [task('make a reservation'), task('have a reservation'), task('book a room'), task('single room'), task('double room'), task('key card'), task('quiet room'), task('breakfast included')],
    miniDialogues: [{ title: 'Hotel problem', lines: ['A: Hello. Can I help you?', 'B: Yes. My key card didn’t work.', 'A: I’m sorry. What is your room number?', 'B: Room 204.'], focus: 'Problema simples no hotel.' }],
    examples: [ex('The room was clean and comfortable.', 'O quarto era limpo e confortável.', 'Descrição de quarto.'), ex('My key card didn’t work.', 'Meu cartão-chave não funcionou.', 'Problema de hotel.'), ex('Breakfast was included.', 'O café da manhã estava incluso.', 'Serviço de hotel.'), ex('I asked for a quiet room.', 'Eu pedi um quarto silencioso.', 'Pedido de acomodação.')],
    recognitionPractice: [{ question: 'Hotels and accommodation — qual vocabulário desta aula significa "hospedagem"?', options: ['accommodation', 'reservation', 'reception'], answer: 'accommodation', explanation: 'accommodation = hospedagem; vocabulário trabalhado nesta aula de Hotels and accommodation.' }, task('Qual palavra é serviço?', 'breakfast'), task('Qual palavra é problema?', 'noisy/dirty/key card didn’t work'), task('Qual palavra é item do quarto?', 'towel/shower/key card')],
    usagePractice: [task('Complete: I have a ___.', 'reservation'), task('Complete: The room was ___.', 'clean/dirty/noisy/quiet'), task('Complete: My key card didn’t ___.', 'work'), task('Complete: Can I have a ___?', 'towel')],
    productionTasks: [task('Escreva 6 frases sobre um hotel.'), task('Crie 3 problemas simples de hotel.'), task('Crie um mini diálogo na recepção.')],
    spacedReview: [task('Revise reservation/room/key card/towel amanhã.'), task('Crie 3 frases com noisy/quiet/comfortable.')],
    selfAssessment: [task('Consigo falar de reserva e quarto?'), task('Consigo pedir algo no hotel?'), task('Consigo descrever problema simples?')],
    lessonRecap: ['Hotel vocabulary organiza recepção, quarto, serviço e problema.', 'A2 pede frases úteis, não lista solta.', 'Descrever hotel ajuda reading/listening/writing.'],
    nextLessonBridge: 'Na Reading, você vai ler uma avaliação simples de restaurante.',
  }),

  createReadingLesson({
    ...common,
    id: 'A2-READING-004',
    order: 4,
    title: 'A restaurant review',
    objectives: ['Ler uma avaliação simples de restaurante.', 'Identificar opinião, comida, preço e serviço.', 'Reconhecer passado com regular e irregular verbs.', 'Responder com evidência textual.'],
    teacherOpening: 'Nesta leitura, você vai ler uma avaliação de restaurante. O foco é entender opinião: a comida era boa? o serviço foi rápido? o preço era caro? A2 começa a exigir que você diferencie fato e opinião.',
    whyItMatters: 'Avaliações de restaurante, hotel e produto são textos muito comuns. Você precisa entender detalhes práticos e opinião geral antes de decidir ou responder.',
    realLifeUseCases: ['Ler review de restaurante.', 'Entender opinião sobre serviço e preço.', 'Identificar problema em experiência passada.', 'Escrever sua própria avaliação curta.'],
    conceptExplanation: 'Em reviews, procure: where, when, food, service, price, opinion. Palavras como good, delicious, slow, expensive, friendly e clean ajudam a entender avaliação.',
    mentalModel: { title: 'review = experiência + opinião', summary: 'O texto conta o que aconteceu e avalia.', steps: ['place', 'time', 'food', 'service', 'price', 'opinion'] },
    stepByStep: [task('Leia para achar a opinião geral.'), task('Marque comida pedida.'), task('Marque serviço/preço.'), task('Procure verbos no passado.'), task('Responda com evidência.')],
    portugueseContrast: [task('Review = avaliação, não revisão escolar neste contexto.'), task('Service = atendimento/serviço.'), task('Friendly = simpático/amigável.'), task('Expensive = caro.')],
    guidedDiscovery: [task('I went indica passado irregular.'), task('Ordered é passado regular.'), task('The food was delicious mostra opinião positiva.')],
    guidedBeforeQuiz: [task('Procure food.'), task('Procure service.'), task('Procure price.'), task('Procure overall opinion.')],
    readingPurpose: 'Ler avaliação de restaurante e separar fatos de opinião.',
    preReadingVocabulary: [vocab('review', 'avaliação'), vocab('delicious', 'delicioso'), vocab('service', 'atendimento'), vocab('friendly', 'simpático'), vocab('expensive', 'caro'), vocab('bill', 'conta')],
    readingStrategy: [task('Leia primeira e última frase para opinião geral.'), task('Procure adjectives.'), task('Use evidência para cada resposta.'), task('Diferencie fato de opinião.')],
    mainText: `Last night, I went to a small Italian restaurant near my hotel. I ordered pasta and a salad. The pasta was delicious, but the salad was too small. The waiter was friendly, and the service was fast. The restaurant was clean, but the bill was expensive. I liked the place, but I don't want to eat there every day.`,
    firstReadTask: task('Qual é o assunto geral do texto?', 'Uma avaliação de restaurante italiano perto do hotel.'),
    secondReadTasks: [task('Onde era o restaurante?', 'near my hotel'), task('O que a pessoa pediu?', 'pasta and a salad'), task('Como era o atendimento?', 'friendly and fast'), task('Qual foi o problema?', 'the bill was expensive / salad was too small')],
    evidenceQuestions: [q('When did the person go to the restaurant?', 'last night', 'Last night, I went...', '', ['last night','yesterday morning','last week']), q('What did the person order?', 'pasta and a salad', 'I ordered pasta and a salad.', '', ['pasta and a salad','pizza and soup','fish and rice']), q('How was the pasta?', 'delicious', 'The pasta was delicious...', '', ['delicious','cold','expensive']), q('How was the service?', 'fast', 'the service was fast', '', ['fast','slow','bad']), q('What was expensive?', 'the bill', 'the bill was expensive', '', ['the bill','the salad','the hotel'])],
    contextVocabularyTasks: [task('Bill é conta pelo contexto de restaurante.'), task('Too small indica crítica.'), task('Friendly descreve o waiter.')],
    guidedSummary: task('Complete: The person went to an Italian restaurant, ordered ___ and ___, liked the pasta, but thought the bill was ___.', '', 'pasta / salad / expensive'),
    connectedProduction: task('Escreva 4 frases avaliando um restaurante real ou inventado.'),
    selfAssessment: [task('Consigo identificar opinião geral?'), task('Consigo achar comida, serviço e preço?'), task('Consigo responder com evidência?')],
    lessonRecap: ['Reviews misturam fatos e opinião.', 'Adjectives revelam avaliação.', 'Past Simple aparece em experiências.', 'Evidence evita chute.'],
    nextLessonBridge: 'No Listening, você vai ouvir um diálogo pedindo comida em restaurante.',
  }),

  createListeningLesson({
    ...common,
    id: 'A2-LISTENING-004',
    order: 4,
    title: 'Ordering in a restaurant',
    objectives: ['Ouvir um pedido em restaurante.', 'Identificar comida, bebida, preço e pedido educado.', 'Reconhecer would like/can I have em contexto.', 'Praticar shadowing de atendimento.'],
    teacherOpening: 'Nesta escuta, você vai ouvir um pedido em restaurante. Primeiro entenda o contexto. Depois identifique o prato, a bebida, o pedido extra e o preço. É uma situação muito prática do A2.',
    whyItMatters: 'Restaurante é uma das situações mais reais para usar inglês. Você precisa entender perguntas do garçom e responder com educação.',
    realLifeUseCases: ['Pedir comida.', 'Pedir bebida.', 'Perguntar preço.', 'Pedir a conta.', 'Entender atendimento básico.'],
    conceptExplanation: 'Pedidos educados usam blocos como I’d like..., Can I have...? Anything to drink? The bill, please. Ouça por food words, drink words e numbers.',
    mentalModel: { title: 'pedido = comida + bebida + extra + conta', summary: 'Restaurante segue sequência previsível.', steps: ['food', 'drink', 'extra request', 'price/bill'] },
    stepByStep: [task('Primeira escuta: situação geral.'), task('Segunda escuta: comida e bebida.'), task('Terceira etapa: pedido extra e preço.'), task('Leia transcript.'), task('Faça dictation.'), task('Faça shadowing.')],
    portugueseContrast: [task('I’d like é forma educada de I would like.'), task('Anything to drink? = algo para beber?'), task('Bill = conta.'), task('Can I have...? é natural para pedir.')],
    guidedDiscovery: [task('I’d like anuncia pedido.'), task('Anything to drink? anuncia bebida.'), task('The bill, please fecha o atendimento.')],
    guidedBeforeQuiz: [task('Primeira escuta: o que a pessoa pede?'), task('Segunda escuta: qual bebida?'), task('Depois: qual pedido extra?')],
    listeningPreparation: [task('Não leia transcript antes da primeira escuta.'), task('Prepare: pasta, salad, water, bill, please, would like.'), task('Objetivo: pedido + bebida + conta.')],
    keyWordsToHear: [vocab('I’d like','eu gostaria'), vocab('pasta','macarrão/massa'), vocab('salad','salada'), vocab('water','água'), vocab('bill','conta'), vocab('anything to drink','algo para beber')],
    audioScript: `Waiter: Good evening. Are you ready to order?
Customer: Yes. I’d like the pasta, please.
Waiter: Would you like a salad with that?
Customer: Yes, a small salad, please.
Waiter: Anything to drink?
Customer: Can I have water, please?
Waiter: Of course. Anything else?
Customer: No, thank you. And later, can I have the bill, please?`,
    firstListenTasks: [task('Sem transcript: onde acontece a conversa?', 'restaurant'), task('Sem transcript: a pessoa pede comida?', 'yes')],
    secondListenTasks: [task('Qual prato a pessoa pede?', 'pasta'), task('Ela aceita salada?', 'yes, a small salad'), task('Qual bebida?', 'water'), task('O que ela pede depois?', 'the bill')],
    transcript: `Waiter: Good evening. Are you ready to order?
Customer: Yes. I’d like the pasta, please.
Waiter: Would you like a salad with that?
Customer: Yes, a small salad, please.
Waiter: Anything to drink?
Customer: Can I have water, please?
Waiter: Of course. Anything else?
Customer: No, thank you. And later, can I have the bill, please?`,
    vocabulary: [vocab('ready to order', 'pronto para pedir'), vocab('with that', 'com isso'), vocab('anything else', 'algo mais'), vocab('later', 'mais tarde')],
    shadowing: [task('Are you ready to order?'), task('I’d like the pasta, please.'), task('Would you like a salad with that?'), task('Can I have water, please?'), task('Can I have the bill, please?')],
    dictationTasks: [task('Digite: I’d like the pasta, please.', 'I’d like the pasta, please.'), task('Digite: Can I have water, please?', 'Can I have water, please?'), task('Digite: Can I have the bill, please?', 'Can I have the bill, please?')],
    pronunciationChunks: [task('I’d like the', 'Contração I’d.'), task('ready to order', 'Bloco de atendimento.'), task('anything to drink', 'Pergunta comum.')],
    listeningComprehension: [q('What does the customer order?', 'pasta', 'I’d like the pasta, please.', '', ['pasta','pizza','soup']), q('Áudio da aula — Ordering in a restaurant — does the customer want salad?', 'yes, a small salad', 'Yes, a small salad, please.', '', ['yes, a small salad','no, just the main dish','not mentioned']), q('What does the customer drink?', 'water', 'Can I have water, please?', '', ['water','dessert','salad']), q('Áudio da aula — Ordering in a restaurant — what does the customer ask for later?', 'the bill', 'can I have the bill, please?', '', ['the bill','the menu','the key'])],
    oralProduction: task('Pratique um pedido em restaurante com I’d like... e Can I have...?'),
    selfAssessment: [task('Consegui entender o prato?'), task('Consegui entender a bebida?'), task('Consigo repetir pedidos educados?')],
    lessonRecap: ['Restaurante tem sequência previsível.', 'I’d like é pedido educado.', 'Anything to drink? pede bebida.', 'The bill, please fecha a situação.'],
    nextLessonBridge: 'No Speaking, você vai praticar check-in no hotel.',
  }),

  createSpeakingLesson({
    ...common,
    id: 'A2-SPEAKING-004',
    order: 4,
    title: 'Check in at a hotel',
    objectives: ['Praticar check-in em hotel.', 'Confirmar reserva, nome, documento e quarto.', 'Pedir quarto silencioso ou ajuda simples.', 'Gravar diálogo de recepção.'],
    teacherOpening: 'Nesta aula, você vai falar em uma situação de hotel. Use frases previsíveis: I have a reservation. My name is... Can I see your passport? Is breakfast included? Can I have a quiet room?',
    whyItMatters: 'Check-in é uma situação real e repetitiva. Com poucos blocos, você consegue se comunicar com recepção de hotel com segurança A2.',
    realLifeUseCases: ['Fazer check-in.', 'Confirmar reserva.', 'Pedir informação de café da manhã.', 'Pedir quarto silencioso.', 'Resolver problema de key card.'],
    conceptExplanation: 'O diálogo de check-in tem papéis. Guest: I have a reservation. Receptionist: Can I see your passport? Guest: Here it is. Receptionist: Your room is 204. Guest: Is breakfast included?',
    mentalModel: { title: 'guest + receptionist', summary: 'O check-in segue um roteiro curto.', steps: ['reservation', 'passport', 'room number', 'breakfast', 'request'] },
    stepByStep: [task('Diga que tem reserva.'), task('Diga seu nome.'), task('Entregue documento.'), task('Pergunte sobre café da manhã.'), task('Faça um pedido simples.'), task('Agradeça.')],
    portugueseContrast: [task('I have a reservation é mais natural que I am with reservation.'), task('Here it is = aqui está.'), task('Is breakfast included? é pergunta pronta útil.')],
    guidedDiscovery: [task('Guest inicia com reservation.'), task('Receptionist pede passport.'), task('Room number e key fecham check-in.')],
    guidedBeforeQuiz: [task('Repita: I have a reservation.'), task('Repita: My name is Ana Souza.'), task('Repita: Here it is.'), task('Repita: Is breakfast included?')],
    speakingSituation: 'Você chegou a um hotel e precisa fazer check-in em inglês.',
    modelPhrases: [phrase('I have a reservation.', 'Tenho uma reserva.'), phrase('My name is Ana Souza.', 'Meu nome é Ana Souza.'), phrase('Here it is.', 'Aqui está.'), phrase('Is breakfast included?', 'O café da manhã está incluso?'), phrase('Can I have a quiet room, please?', 'Pode me dar um quarto silencioso, por favor?')],
    pronunciationChunks: [task('I have a reservation', 'Bloco de abertura.'), task('Can I see your passport', 'Pergunta de recepção.'), task('breakfast included', 'Bloco útil.')],
    repeatAfterMe: [task('I have a reservation.'), task('My name is Ana Souza.'), task('Can I see your passport?'), task('Here it is.'), task('Is breakfast included?'), task('Can I have a quiet room, please?')],
    substitutionDrills: [task('quiet room → room near the elevator', 'Can I have a room near the elevator, please?'), task('breakfast → parking', 'Is parking included?'), task('Ana Souza → seu nome', 'My name is ___.')],
    guidedSpeaking: [task('Faça papel de hóspede: diga que tem reserva.'), task('Pergunte se o café está incluso.'), task('Peça um quarto silencioso.'), task('Agradeça e encerre.')],
    recordingTasks: [task('Grave 5 frases de hotel.'), task('Grave diálogo hóspede/recepcionista de 8 linhas.'), task('Grave versão final com pedido especial.')],
    freeSpeaking: task('Simule um check-in completo em hotel por até 60 segundos.'),
    feedbackChecklist: [task('Usei I have a reservation?'), task('Usei My name is...?'), task('Fiz uma pergunta útil?'), task('Fiz um pedido educado?'), task('Usei please/thank you?')],
    selfAssessment: [task('Consigo fazer check-in?'), task('Consigo perguntar sobre café?'), task('Consigo pedir quarto silencioso?')],
    lessonRecap: ['Check-in tem roteiro previsível.', 'Reservation/passport/room/key são blocos centrais.', 'Pedidos educados resolvem detalhes.', 'Praticar diálogo aumenta segurança real.'],
    nextLessonBridge: 'Na Writing, você vai escrever um pedido curto para hotel.',
  }),

  createWritingLesson({
    ...common,
    id: 'A2-WRITING-004',
    order: 4,
    title: 'Write a hotel request',
    objectives: ['Escrever pedido curto para hotel.', 'Usar saudação, reserva, pedido e agradecimento.', 'Pedir quarto silencioso, toalha, informação ou ajuste simples.', 'Revisar clareza e educação na escrita.'],
    teacherOpening: 'Agora você vai escrever uma mensagem curta para hotel. Não precisa ser longa; precisa ser clara e educada. Exemplo: Hello, I have a reservation for July 12. Can I have a quiet room, please? Thank you.',
    whyItMatters: 'Muitos problemas de viagem são resolvidos por mensagem: pedir quarto silencioso, toalha, horário de check-in, confirmação de reserva ou informação de café da manhã.',
    realLifeUseCases: ['Pedir quarto silencioso.', 'Confirmar reserva.', 'Pedir toalha extra.', 'Perguntar sobre café da manhã.', 'Informar chegada tarde.'],
    conceptExplanation: 'Uma mensagem de hotel A2 tem 4 partes: greeting, reservation/context, request, closing. Use Can I have...? / Could I have...? / Is breakfast included? / I will arrive late.',
    mentalModel: { title: 'hotel request em 4 partes', summary: 'Cumprimente, dê contexto, peça, agradeça.', steps: ['Hello', 'I have a reservation', 'Can I have...?', 'Thank you'] },
    stepByStep: [task('Comece com Hello/Dear hotel team.'), task('Diga que tem reserva e data.'), task('Faça um pedido claro.'), task('Adicione please.'), task('Feche com Thank you.'), task('Revise pontuação.')],
    portugueseContrast: [task('Evite tradução direta como “I want that you give me”.'), task('Use Can I have...? ou Could I have...?'), task('Escreva curto e educado.')],
    guidedDiscovery: [task('I have a reservation dá contexto.'), task('Can I have a quiet room? faz pedido.'), task('Thank you fecha com educação.')],
    guidedBeforeQuiz: [task('Modelo: Hello, I have a reservation.'), task('Modelo: Can I have a quiet room, please?'), task('Modelo: Is breakfast included?'), task('Modelo: Thank you.')],
    writingPurpose: 'Escrever mensagem curta e educada para hotel.',
    modelText: `Hello, I have a reservation for July 12. My name is Ana Souza. Can I have a quiet room, please? I will arrive at night. Thank you.`,
    writingBlocks: [task('Greeting', 'Hello,'), task('Reservation context', 'I have a reservation for July 12.'), task('Name', 'My name is Ana Souza.'), task('Request', 'Can I have a quiet room, please?'), task('Extra detail', 'I will arrive at night.'), task('Closing', 'Thank you.')],
    guidedSubstitution: [task('Troque quiet room por room near the elevator.'), task('Troque July 12 por sua data.'), task('Troque arrive at night por arrive in the morning.'), task('Troque pedido por extra towel.')],
    grammarForWriting: [task('Use Can I have...? para pedido.'), task('Use Is...? para pergunta.'), task('Use please e thank you.'), task('Use ponto final e interrogação corretamente.'), task('Mantenha frases curtas.')],
    checklist: [task('Incluí saudação?'), task('Expliquei reserva/data?'), task('Fiz um pedido claro?'), task('Usei please/thank you?'), task('Revisei pontuação?')],
    draftTask: task('Escreva uma mensagem para hotel pedindo um quarto silencioso ou uma toalha extra.'),
    revisionTask: task('Revise clareza, educação, pontuação e pedido principal.'),
    commonMistakes: [mistake('I want quiet room.', 'Can I have a quiet room, please?', 'Pedido mais educado e completo.'), mistake('I have reservation.', 'I have a reservation.', 'Reservation é singular contável aqui.'), mistake('Can I have a quiet room.', 'Can I have a quiet room?', 'Pergunta precisa de ?')],
    productionTasks: [task('Escreva pedido de quarto silencioso.'), task('Escreva pedido de toalha extra.'), task('Escreva pergunta sobre café da manhã.'), task('Escreva versão final com 5 frases.')],
    selfAssessment: [task('Consigo escrever pedido curto para hotel?'), task('Consigo usar Can I have...?'), task('Consigo revisar tom educado?')],
    lessonRecap: ['Hotel request deve ser curto, claro e educado.', 'Dê contexto de reserva.', 'Faça um pedido específico.', 'Please e thank you são essenciais.'],
    nextLessonBridge: 'No próximo bloco A2.2, você continuará com Past Simple negative/questions e situações de compras/farmácia/direções.',
  }),
]);

export const A2_DEEP_PAST_STORIES_PART2_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(A2_DEEP_PAST_STORIES_PART2.filter((lesson) => lesson.pillar === 'grammar')),
  vocabulary: Object.freeze(A2_DEEP_PAST_STORIES_PART2.filter((lesson) => lesson.pillar === 'vocabulary')),
  reading: Object.freeze(A2_DEEP_PAST_STORIES_PART2.filter((lesson) => lesson.pillar === 'reading')),
  listening: Object.freeze(A2_DEEP_PAST_STORIES_PART2.filter((lesson) => lesson.pillar === 'listening')),
  speaking: Object.freeze(A2_DEEP_PAST_STORIES_PART2.filter((lesson) => lesson.pillar === 'speaking')),
  writing: Object.freeze(A2_DEEP_PAST_STORIES_PART2.filter((lesson) => lesson.pillar === 'writing')),
});
