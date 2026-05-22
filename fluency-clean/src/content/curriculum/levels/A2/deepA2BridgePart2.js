import { createVocabularyLesson, createReadingLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'A2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['a2-1', 'bridge', 'survival-expansion', 'travel-story', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }
function ex(text, translation, why = '', warning = '') { return { text, translation, why, warning }; }

export const A2_DEEP_BRIDGE_PART2 = Object.freeze([
  createVocabularyLesson({
    ...common,
    id: 'A2-VOCABULARY-002',
    order: 2,
    title: 'Travel basics',
    objectives: ['Aprender vocabulário básico de viagem.', 'Conectar viagem com eventos passados simples.', 'Usar palavras de transporte, hospedagem e lugar em frases A2.', 'Preparar leitura e escuta de mensagens de viagem.'],
    teacherOpening: 'Travel basics é a segunda parte da ponte A2. Você já começou a falar de ontem e eventos passados. Agora vai aprender palavras essenciais para contar uma viagem simples: trip, ticket, bus, train, airport, hotel, luggage, map, reservation, station. O foco é falar de uma experiência curta, não fazer turismo avançado.',
    whyItMatters: 'Viagem é um dos temas mais úteis do A2. Ela mistura passado, lugares, horários, transporte, problemas simples e mensagens. Com poucas palavras bem usadas, você consegue dizer onde foi, como foi, onde ficou e o que aconteceu.',
    realLifeUseCases: ['Falar de uma viagem curta.', 'Entender mensagem de viagem.', 'Pedir informação básica.', 'Falar de hotel, estação ou aeroporto.', 'Contar uma experiência simples no passado.'],
    conceptExplanation: 'Aprenda o vocabulário em grupos. Places: airport, station, hotel. Transport: bus, train, taxi, plane. Objects: ticket, luggage, passport, map. Actions: travel, arrive, leave, book, stay. Depois transforme em frases: I traveled by bus. I stayed at a hotel. I bought a ticket yesterday.',
    mentalModel: { title: 'viagem = lugar + transporte + objeto + ação', summary: 'Cada palavra deve virar frase útil.', steps: ['I traveled by bus.', 'I stayed at a hotel.', 'I bought a ticket.', 'The station was busy.'] },
    stepByStep: [task('Separe palavras por grupo: lugar, transporte, objeto e ação.'), task('Aprenda cada palavra com uma frase.'), task('Use by para transporte: by bus, by train.'), task('Use at para lugares como hotel/station/airport.'), task('Crie uma mini história de viagem com 4 frases.')],
    portugueseContrast: [task('Travel é viajar; trip é viagem.'), task('Ticket pode ser passagem/ingresso dependendo do contexto.'), task('Luggage é bagagem, geralmente incontável.'), task('Station pode ser estação de trem/ônibus; airport é aeroporto.')],
    guidedDiscovery: [task('Qual palavra é transporte: train ou hotel?', 'train'), task('Qual palavra é lugar: airport ou ticket?', 'airport'), task('Qual frase usa transporte?', 'I traveled by bus.')],
    guidedBeforeQuiz: [task('I traveled by bus.'), task('I stayed at a hotel.'), task('I bought a ticket.'), task('The airport was busy.')],
    topicContext: 'Você vai falar de uma viagem simples no passado usando palavras essenciais e frases curtas.',
    essentialWords: [vocab('trip', 'viagem', 'My trip was good.'), vocab('travel', 'viajar', 'I travel by bus.'), vocab('ticket', 'passagem/ingresso', 'I bought a ticket.'), vocab('bus', 'ônibus', 'I traveled by bus.'), vocab('train', 'trem', 'The train was late.'), vocab('taxi', 'táxi', 'I took a taxi.'), vocab('plane', 'avião', 'The plane was full.'), vocab('airport', 'aeroporto', 'The airport was busy.'), vocab('station', 'estação', 'The station was near the hotel.'), vocab('hotel', 'hotel', 'I stayed at a hotel.'), vocab('reservation', 'reserva', 'I had a reservation.'), vocab('luggage', 'bagagem', 'My luggage was heavy.'), vocab('passport', 'passaporte', 'I had my passport.'), vocab('map', 'mapa', 'I used a map.'), vocab('arrive', 'chegar', 'I arrived at night.'), vocab('leave', 'sair/partir', 'I left in the morning.'), vocab('stay', 'ficar/hospedar-se', 'I stayed for two days.'), vocab('book', 'reservar', 'I booked a room.')],
    chunks: [{ chunk: 'travel by bus', translation: 'viajar de ônibus', example: 'I traveled by bus.' }, { chunk: 'stay at a hotel', translation: 'ficar em um hotel', example: 'I stayed at a hotel.' }, { chunk: 'buy a ticket', translation: 'comprar uma passagem', example: 'I bought a ticket.' }, { chunk: 'arrive at the airport', translation: 'chegar ao aeroporto', example: 'I arrived at the airport.' }, { chunk: 'book a room', translation: 'reservar um quarto', example: 'I booked a room.' }],
    pronunciationFocus: { title: 'Foco sonoro', tips: ['Travel tem som de /tr/.', 'Luggage tem som curto; não pronuncie como “lug-gage” separado.', 'Reservation tem stress em VA: re-ser-VA-tion.'] },
    dangerousConfusions: [task('Travel é verbo; trip é substantivo.'), task('Ticket não é sempre multa; em viagem é passagem.'), task('Luggage não costuma ir para plural como luggages no uso comum.'), task('Stay at a hotel, não stay in a hotel como padrão inicial.')],
    collocations: [task('travel by bus'), task('buy a ticket'), task('book a room'), task('stay at a hotel'), task('arrive at the airport'), task('leave in the morning'), task('heavy luggage')],
    miniDialogues: [{ title: 'A short trip', lines: ['A: How was your trip?', 'B: It was good.', 'A: How did you travel?', 'B: I traveled by bus.', 'A: Where did you stay?', 'B: I stayed at a hotel.'], focus: 'Falar de viagem no passado.' }],
    examples: [ex('I traveled by train last week.', 'Eu viajei de trem semana passada.', 'Transporte com by.'), ex('I stayed at a small hotel.', 'Fiquei em um hotel pequeno.', 'Hospedagem.'), ex('My luggage was heavy.', 'Minha bagagem estava pesada.', 'Objeto de viagem.'), ex('I arrived at the station at night.', 'Cheguei à estação à noite.', 'Chegada + lugar + tempo.')],
    recognitionPractice: [task('Classifique: airport', 'place'), task('Classifique: bus', 'transport'), task('Classifique: luggage', 'object'), task('Classifique: arrive', 'action')],
    usagePractice: [task('Complete: I traveled ___ bus.', 'by'), task('Complete: I stayed ___ a hotel.', 'at'), task('Complete: I bought a ___.', 'ticket'), task('Complete: My ___ was heavy.', 'luggage')],
    productionTasks: [task('Escreva 5 frases com travel vocabulary.'), task('Crie uma mini história de viagem com 4 frases.'), task('Liste 3 transportes, 3 lugares e 3 objetos de viagem.')],
    spacedReview: [task('Revise travel/trip/ticket/luggage amanhã.'), task('Crie 3 frases com by bus/by train/by taxi.')],
    selfAssessment: [task('Consigo nomear transporte e lugares de viagem?'), task('Consigo usar by para transporte?'), task('Consigo contar uma viagem simples?')],
    lessonRecap: ['Travel basics prepara histórias A2.', 'Use by com transporte.', 'Use at com airport/station/hotel no padrão inicial.', 'Palavras de viagem devem virar frases curtas.'],
    nextLessonBridge: 'Na Reading, você vai ler uma mensagem curta de viagem usando esse vocabulário.',
  }),

  createReadingLesson({
    ...common,
    id: 'A2-READING-002',
    order: 2,
    title: 'A travel message',
    objectives: ['Ler uma mensagem curta de viagem.', 'Identificar onde a pessoa foi, como viajou e onde ficou.', 'Reconhecer sequência e tempo passado.', 'Responder com evidência textual.'],
    teacherOpening: 'Nesta leitura, você vai ler uma mensagem de viagem simples. O objetivo é entender informações práticas: quando a viagem aconteceu, para onde a pessoa foi, como viajou, onde ficou e se houve algum problema.',
    whyItMatters: 'Mensagens de viagem são comuns: alguém conta que chegou, onde está, como foi o trajeto e o que vai fazer. No A2, você precisa entender esse tipo de relato curto sem traduzir palavra por palavra.',
    realLifeUseCases: ['Ler mensagem de amigo em viagem.', 'Entender atualização de chegada.', 'Localizar hotel/transporte.', 'Responder perguntas sobre uma viagem.', 'Preparar escrita de mensagem de viagem.'],
    conceptExplanation: 'Em mensagens de viagem, procure tempo, lugar, transporte, hospedagem e sentimento. Palavras como yesterday, last night, bus, train, hotel, station e tired ajudam a montar a história.',
    mentalModel: { title: 'tempo + destino + transporte + hospedagem', summary: 'Essas quatro pistas explicam a viagem.', steps: ['When?', 'Where?', 'How?', 'Where stayed?', 'How felt?'] },
    stepByStep: [task('Leia para entender o assunto geral.'), task('Marque expressões de tempo.'), task('Marque transporte.'), task('Marque hotel/lugar.'), task('Procure problema ou sentimento.'), task('Responda com evidência.')],
    portugueseContrast: [task('Arrived significa chegou.'), task('Stayed significa ficou/hospedou-se.'), task('Tired but happy usa contraste simples.'), task('Near the station localiza o hotel.')],
    guidedDiscovery: [task('Yesterday indica quando.'), task('By bus indica como viajou.'), task('At a small hotel indica hospedagem.'), task('Because indica motivo.')],
    guidedBeforeQuiz: [task('Procure when.'), task('Procure transport.'), task('Procure hotel.'), task('Copie evidência antes de responder.')],
    readingPurpose: 'Ler uma mensagem de viagem A2 e localizar detalhes importantes.',
    preReadingVocabulary: [vocab('arrived', 'cheguei/chegou'), vocab('station', 'estação'), vocab('hotel', 'hotel'), vocab('luggage', 'bagagem'), vocab('tired', 'cansado'), vocab('near', 'perto')],
    readingStrategy: [task('Use scanning para achar nomes de lugar.'), task('Procure by + transport.'), task('Procure stayed para hospedagem.'), task('Use evidence para cada resposta.')],
    mainText: `Hi, Ana! I arrived in Curitiba yesterday afternoon. I traveled by bus, and the trip was long but comfortable. My hotel is small, but it is clean and near the station. My luggage was heavy, so I took a taxi from the station to the hotel. I was tired last night, but I am happy because the city is beautiful. Tomorrow, I am going to visit the museum.`,
    firstReadTask: task('Qual é o assunto geral da mensagem?', 'Uma pessoa contando sobre uma viagem para Curitiba.'),
    secondReadTasks: [task('Quando a pessoa chegou?', 'yesterday afternoon'), task('Como ela viajou?', 'by bus'), task('Como é o hotel?', 'small, clean and near the station'), task('Por que pegou táxi?', 'because the luggage was heavy')],
    evidenceQuestions: [q('Texto da aula — A travel message — where did the person arrive?', 'Curitiba', 'I arrived in Curitiba yesterday afternoon.', '', ['Curitiba','São Paulo','Rio']), q('How did the person travel?', 'by bus', 'I traveled by bus...', '', ['by bus','by train','by plane']), q('Where is the hotel?', 'near the station', 'near the station', '', ['near the station','near the airport','next to the museum']), q('Why did the person take a taxi?', 'because the luggage was heavy', 'My luggage was heavy, so I took a taxi...', '', ['because the luggage was heavy','because the bus was late','because the hotel was far']), q('What is the person going to visit tomorrow?', 'the museum', 'Tomorrow, I am going to visit the museum.', '', ['the museum','the station','the hotel'])],
    contextVocabularyTasks: [task('Comfortable descreve a viagem.'), task('Clean descreve o hotel.'), task('So mostra consequência: bagagem pesada → táxi.')],
    guidedSummary: task('Complete: The person arrived in ___, traveled by ___, stayed near the ___ and took a taxi because the luggage was ___.', '', 'Curitiba / bus / station / heavy'),
    connectedProduction: task('Escreva uma mensagem curta dizendo onde chegou, como viajou e onde ficou.'),
    selfAssessment: [task('Consigo entender mensagem de viagem?'), task('Consigo achar transporte e hotel?'), task('Consigo responder com evidência?')],
    lessonRecap: ['Mensagem de viagem tem tempo, lugar, transporte e hospedagem.', 'By indica transporte.', 'Stayed/Hotel indicam hospedagem.', 'So pode mostrar consequência.'],
    nextLessonBridge: 'No Listening, você vai ouvir informações de viagem parecidas.',
  }),

  createListeningLesson({
    ...common,
    id: 'A2-LISTENING-002',
    order: 2,
    title: 'Travel information',
    objectives: ['Ouvir informações básicas de viagem.', 'Identificar destino, transporte, horário e problema simples.', 'Reconhecer station, ticket, luggage e hotel na fala.', 'Praticar dictation e shadowing de viagem.'],
    teacherOpening: 'Nesta escuta, você vai ouvir uma conversa curta com informações de viagem. Primeiro, entenda o destino e o transporte. Depois, procure horário, ticket, luggage e hotel. Não tente traduzir tudo na primeira escuta.',
    whyItMatters: 'Viagem envolve informações rápidas: horário, estação, passagem, bagagem, hotel. Saber ouvir essas palavras ajuda em situações reais e prepara conversas A2.',
    realLifeUseCases: ['Entender informação de viagem.', 'Falar de ônibus/trem/hotel.', 'Ouvir problema simples com bagagem.', 'Responder perguntas sobre trajeto.'],
    conceptExplanation: 'Ouça por blocos previsíveis: Where are you going? I am going to... How are you traveling? By bus/train. What time? At six. Any problem? My luggage is heavy.',
    mentalModel: { title: 'destino + transporte + tempo + problema', summary: 'Esses quatro dados bastam para entender a conversa.', steps: ['destination', 'transport', 'time', 'problem'] },
    stepByStep: [task('Primeira escuta: destino e transporte.'), task('Segunda escuta: horário e lugar.'), task('Terceira etapa: problema/solução.'), task('Leia transcript.'), task('Faça dictation.'), task('Faça shadowing.')],
    portugueseContrast: [task('I am going to Curitiba pode ser plano/deslocamento.'), task('By bus indica meio de transporte.'), task('At six indica horário.'), task('Heavy luggage explica problema.')],
    guidedDiscovery: [task('Where are you going? pede destino.'), task('How are you traveling? pede transporte.'), task('What time? pede horário.')],
    guidedBeforeQuiz: [task('Primeira escuta: para onde a pessoa vai?'), task('Segunda escuta: como ela vai?'), task('Depois: qual é o problema?')],
    listeningPreparation: [task('Não leia transcript antes da primeira escuta.'), task('Prepare: bus, station, ticket, luggage, hotel, at six.'), task('Objetivo: destino + transporte + horário + problema.')],
    keyWordsToHear: [vocab('going to','indo para'), vocab('by bus','de ônibus'), vocab('ticket','passagem'), vocab('station','estação'), vocab('luggage','bagagem'), vocab('hotel','hotel')],
    audioScript: `A: Where are you going?
B: I am going to Curitiba.
A: How are you traveling?
B: By bus. My ticket is for six o’clock.
A: Is the station near your house?
B: No, it isn’t. I need a taxi because my luggage is heavy.
A: Where are you staying?
B: At a small hotel near the station.`,
    firstListenTasks: [task('Sem transcript: qual é o destino?', 'Curitiba'), task('Sem transcript: qual transporte aparece?', 'bus')],
    secondListenTasks: [task('Que horas é a passagem?', 'six o’clock'), task('A estação fica perto da casa?', 'No, it isn’t.'), task('Por que precisa de táxi?', 'because the luggage is heavy'), task('Onde vai ficar?', 'at a small hotel near the station')],
    transcript: `A: Where are you going?
B: I am going to Curitiba.
A: How are you traveling?
B: By bus. My ticket is for six o’clock.
A: Is the station near your house?
B: No, it isn’t. I need a taxi because my luggage is heavy.
A: Where are you staying?
B: At a small hotel near the station.`,
    vocabulary: [vocab('where are you going?', 'para onde você está indo?'), vocab('how are you traveling?', 'como você está viajando?'), vocab('ticket is for six', 'a passagem é para as seis'), vocab('staying', 'ficando/hospedando-se')],
    shadowing: [task('Where are you going?'), task('I am going to Curitiba.'), task('How are you traveling?'), task('By bus.'), task('My ticket is for six o’clock.'), task('I need a taxi because my luggage is heavy.')],
    dictationTasks: [task('Digite: I am going to Curitiba.', 'I am going to Curitiba.'), task('Digite: My ticket is for six o’clock.', 'My ticket is for six o’clock.'), task('Digite: My luggage is heavy.', 'My luggage is heavy.')],
    pronunciationChunks: [task('Where are you going', 'Bloco de pergunta.'), task('by bus', 'Curto e direto.'), task('six o’clock', 'Horário em bloco.'), task('luggage is heavy', 'Conecte is-heavy.')],
    listeningComprehension: [q('Where is the person going?', 'Curitiba', 'I am going to Curitiba.', '', ['Curitiba','São Paulo','the airport']), q('How is the person traveling?', 'by bus', 'By bus.', '', ['by bus','by taxi','by plane']), q('What time is the ticket for?', 'six o’clock', 'My ticket is for six o’clock.', '', ['six o’clock','seven o’clock','nine o’clock']), q('Áudio da aula — Travel information — why does the person need a taxi?', 'because the luggage is heavy', 'I need a taxi because my luggage is heavy.', '', ['because the luggage is heavy','because the hotel is closed','because the bus is full'])],
    oralProduction: task('Responda oralmente: Where are you going? How are you traveling? Where are you staying?'),
    selfAssessment: [task('Consegui ouvir destino?'), task('Consegui ouvir transporte?'), task('Consegui ouvir horário?'), task('Consegui repetir frases-chave?')],
    lessonRecap: ['Travel listening busca dados práticos.', 'Destino, transporte, horário e problema são prioridade.', 'By bus/by train indica meio.', 'Because explica necessidade/problema.'],
    nextLessonBridge: 'No Speaking, você vai contar uma história curta de viagem/passado.',
  }),

  createSpeakingLesson({
    ...common,
    id: 'A2-SPEAKING-002',
    order: 2,
    title: 'Tell a short past story',
    objectives: ['Contar uma história curta no passado.', 'Usar sequência com first, then e after that.', 'Incluir tempo, lugar, ação e sentimento.', 'Gravar um relato de 45 a 60 segundos.'],
    teacherOpening: 'Agora você vai expandir “talk about yesterday” para uma história curta. Uma história A2 não precisa ser longa. Ela precisa ter tempo, lugar, ações em ordem e sentimento: Last weekend, I traveled by bus. First, I bought a ticket. Then I arrived at the station. I was tired, but happy.',
    whyItMatters: 'Contar pequenas histórias é uma habilidade central do A2. Você começa a sair de frases isoladas e entra em relatos organizados, mas ainda simples.',
    realLifeUseCases: ['Contar o que fez no fim de semana.', 'Falar de uma viagem curta.', 'Responder What happened?', 'Relatar um problema simples.', 'Fazer apresentação curta no passado.'],
    conceptExplanation: 'Use uma estrutura segura: time expression + place/event + sequence + feeling. Comece com Yesterday/Last weekend. Depois use first, then, after that. Termine com sentimento/opinião.',
    mentalModel: { title: 'tempo + sequência + sentimento', summary: 'Uma história curta precisa de ordem.', steps: ['Last weekend...', 'First...', 'Then...', 'After that...', 'I was...'] },
    stepByStep: [task('Escolha o tempo: yesterday/last weekend.'), task('Diga onde ou qual evento.'), task('Use first para primeira ação.'), task('Use then para próxima ação.'), task('Use after that para fechar sequência.'), task('Finalize com feeling/opinion.')],
    portugueseContrast: [task('Evite contar história longa demais em português e tentar traduzir.'), task('Use frases simples no passado.'), task('Não use did em afirmativas simples.'), task('Use was/were para estado passado.')],
    guidedDiscovery: [task('Last weekend localiza tempo.'), task('First/then/after that organizam.'), task('I was tired fecha com sentimento.')],
    guidedBeforeQuiz: [task('Repita: Last weekend, I traveled by bus.'), task('Repita: First, I bought a ticket.'), task('Repita: Then I went to the station.'), task('Repita: I was tired, but happy.')],
    speakingSituation: 'Você vai contar uma pequena história sobre ontem, fim de semana ou uma viagem curta.',
    modelPhrases: [phrase('Last weekend, I traveled by bus.', 'Fim de semana passado, viajei de ônibus.'), phrase('First, I bought a ticket.', 'Primeiro, comprei uma passagem.'), phrase('Then I went to the station.', 'Depois fui para a estação.'), phrase('After that, I stayed at a hotel.', 'Depois disso, fiquei em um hotel.'), phrase('I was tired, but happy.', 'Eu estava cansado, mas feliz.')],
    pronunciationChunks: [task('Last weekend', 'Tempo em bloco.'), task('First, I', 'Pausa curta depois de first.'), task('After that', 'Conector de sequência.'), task('tired but happy', 'Contraste com but.')],
    repeatAfterMe: [task('Last weekend, I traveled by bus.'), task('First, I bought a ticket.'), task('Then I went to the station.'), task('After that, I stayed at a hotel.'), task('I was tired, but happy.')],
    substitutionDrills: [task('bus → train', 'Last weekend, I traveled by train.'), task('station → airport', 'Then I went to the airport.'), task('hotel → my friend’s house', 'After that, I stayed at my friend’s house.')],
    guidedSpeaking: [task('Diga quando aconteceu.'), task('Diga a primeira ação.'), task('Diga a segunda ação.'), task('Diga onde ficou/foi.'), task('Diga como se sentiu.')],
    recordingTasks: [task('Grave uma história de 30 segundos.'), task('Grave novamente usando first/then/after that.'), task('Grave uma versão final de 45 a 60 segundos.')],
    freeSpeaking: task('Conte uma história curta sobre ontem, seu fim de semana ou uma viagem. Use pelo menos 4 ações e 1 sentimento.'),
    feedbackChecklist: [task('Usei tempo passado no começo?'), task('Usei sequência?'), task('Usei frases curtas?'), task('Incluí sentimento/opinião?'), task('Minha história ficou fácil de entender?')],
    selfAssessment: [task('Consigo contar uma história curta?'), task('Consigo usar first/then/after that?'), task('Consigo falar por 45 segundos?')],
    lessonRecap: ['História A2 precisa de ordem.', 'Use tempo + ações + sentimento.', 'Frases curtas mantêm controle.', 'Gravação ajuda a melhorar fluência.'],
    nextLessonBridge: 'Na Writing, você vai escrever essa mesma estrutura como uma história curta.',
  }),

  createWritingLesson({
    ...common,
    id: 'A2-WRITING-002',
    order: 2,
    title: 'Write a short past story',
    objectives: ['Escrever uma história curta no passado.', 'Usar sequência com first, then e after that.', 'Incluir tempo, ações, lugar e sentimento.', 'Revisar pontuação e verbos no passado.'],
    teacherOpening: 'Nesta escrita, você vai transformar uma fala curta em texto organizado. O foco é uma história simples de 5 a 7 frases: tempo, primeira ação, segunda ação, detalhe, sentimento e conclusão.',
    whyItMatters: 'Escrever histórias curtas é base do A2. Isso prepara mensagens, relatos de viagem, e-mails simples e respostas de prova/checkpoint.',
    realLifeUseCases: ['Escrever sobre o fim de semana.', 'Contar uma viagem em mensagem.', 'Escrever relato de aula ou trabalho.', 'Criar diário simples.', 'Preparar Past Simple.'],
    conceptExplanation: 'Comece com uma expressão de tempo: Yesterday/Last weekend. Depois organize com first, then, after that. Use frases curtas e revise verbos passados. Termine com sentimento/opinião: I was tired, but happy. The trip was good.',
    mentalModel: { title: 'parágrafo de história curta', summary: 'Cada frase tem uma função.', steps: ['Time.', 'First action.', 'Second action.', 'Detail.', 'Feeling.', 'Closing.'] },
    stepByStep: [task('Escreva o tempo.'), task('Escreva a primeira ação.'), task('Adicione then.'), task('Adicione after that.'), task('Inclua detalhe de lugar/transporte.'), task('Finalize com sentimento/opinião.'), task('Revise pontuação e verbos.')],
    portugueseContrast: [task('Não escreva uma frase gigante.'), task('Use ponto final para separar ações.'), task('Não use did em afirmação simples.'), task('Use was/were para estado passado.')],
    guidedDiscovery: [task('Last weekend dá tempo.'), task('First/then/after that dão sequência.'), task('I was tired dá sentimento passado.')],
    guidedBeforeQuiz: [task('Modelo: Last weekend, I traveled by bus.'), task('Modelo: First, I bought a ticket.'), task('Modelo: Then I went to the station.'), task('Modelo: The trip was long, but comfortable.')],
    writingPurpose: 'Escrever uma história curta A2 no passado.',
    modelText: `Last weekend, I traveled by bus to Curitiba. First, I bought a ticket at the station. Then I had coffee and waited for the bus. After that, I arrived at my hotel at night. The trip was long, but comfortable. I was tired, but happy.`,
    writingBlocks: [task('Time and place', 'Last weekend, I traveled by bus to Curitiba.'), task('First action', 'First, I bought a ticket at the station.'), task('Second action', 'Then I had coffee and waited for the bus.'), task('After that', 'After that, I arrived at my hotel at night.'), task('Opinion', 'The trip was long, but comfortable.'), task('Feeling', 'I was tired, but happy.')],
    guidedSubstitution: [task('Troque Curitiba por outra cidade.'), task('Troque bus por train.'), task('Troque hotel por friend’s house.'), task('Troque tired/happy por nervous/excited.')],
    grammarForWriting: [task('Use maiúscula no início.'), task('Use vírgula depois de Last weekend/First/Then quando ajudar leitura.'), task('Use ponto final em cada ação.'), task('Revise verbos regulares com -ed.'), task('Use was/were para estados.')],
    checklist: [task('Meu texto tem 5 a 7 frases?'), task('Começa com expressão de tempo?'), task('Usa first/then/after that?'), task('Inclui transporte ou lugar?'), task('Inclui sentimento/opinião?'), task('Pontuação está limpa?')],
    draftTask: task('Escreva uma história curta sobre ontem, fim de semana ou uma viagem.'),
    revisionTask: task('Revise sequência, pontuação, verbos e clareza.'),
    commonMistakes: [mistake('Last weekend I travel by bus.', 'Last weekend, I traveled by bus.', 'Evento passado pede traveled.'), mistake('Then I did bought a ticket.', 'Then I bought a ticket.', 'Não use did em afirmativa simples.'), mistake('The trip was long but.', 'The trip was long, but comfortable.', 'But precisa completar contraste.')],
    productionTasks: [task('Escreva versão 1 com 5 frases.'), task('Reescreva adicionando 2 detalhes.'), task('Crie uma versão final com 7 frases e checklist completo.')],
    selfAssessment: [task('Consigo escrever história curta?'), task('Consigo usar sequência?'), task('Consigo revisar passado e pontuação?')],
    lessonRecap: ['História escrita A2 precisa de sequência.', 'Cada frase tem função.', 'Use tempo, ações, detalhe e sentimento.', 'Revisão deixa o texto limpo.'],
    nextLessonBridge: 'Com isso, o A2.1 fica completo. O próximo pacote correto é A2.2 Past stories and experiences.',
  }),
]);

export const A2_DEEP_BRIDGE_PART2_BY_PILLAR = Object.freeze({
  vocabulary: Object.freeze(A2_DEEP_BRIDGE_PART2.filter((lesson) => lesson.pillar === 'vocabulary')),
  reading: Object.freeze(A2_DEEP_BRIDGE_PART2.filter((lesson) => lesson.pillar === 'reading')),
  listening: Object.freeze(A2_DEEP_BRIDGE_PART2.filter((lesson) => lesson.pillar === 'listening')),
  speaking: Object.freeze(A2_DEEP_BRIDGE_PART2.filter((lesson) => lesson.pillar === 'speaking')),
  writing: Object.freeze(A2_DEEP_BRIDGE_PART2.filter((lesson) => lesson.pillar === 'writing')),
});
