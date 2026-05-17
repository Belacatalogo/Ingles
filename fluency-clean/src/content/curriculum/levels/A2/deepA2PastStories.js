import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'A2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['a2-2', 'past-stories', 'experiences', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }
function ex(text, translation, why = '', warning = '') { return { text, translation, why, warning }; }

export const A2_DEEP_PAST_STORIES = Object.freeze([
  createGrammarLesson({
    ...common,
    id: 'A2-GRAMMAR-002',
    order: 2,
    title: 'Past Simple — regular verbs affirmative',
    objectives: ['Formar frases afirmativas no Past Simple com verbos regulares.', 'Usar -ed para ações concluídas no passado.', 'Reconhecer expressões como yesterday, last week e ago.', 'Evitar o uso de did em afirmativas simples.'],
    teacherOpening: 'Agora o A2 entra de verdade no passado. Em frases afirmativas com verbos regulares, você normalmente adiciona -ed: work → worked, visit → visited, watch → watched. O foco é contar ações concluídas: Yesterday, I worked. Last weekend, I visited my family.',
    whyItMatters: 'Past Simple é essencial para contar histórias, falar de fim de semana, viagens, experiências, trabalho e estudos. Esta aula começa com verbos regulares para criar confiança antes dos irregulares.',
    realLifeUseCases: ['Falar do que fez ontem.', 'Contar uma viagem simples.', 'Falar de uma aula ou reunião passada.', 'Escrever mensagem sobre o fim de semana.', 'Responder What happened?'],
    conceptExplanation: 'Use Past Simple para ações finalizadas no passado. Para verbos regulares afirmativos, adicione -ed. I worked yesterday. She visited her mother last week. We watched a movie two days ago. Em afirmativas simples, não use did antes do verbo.',
    mentalModel: { title: 'ação finalizada + -ed', summary: 'Quando a ação já acabou, verbos regulares ganham -ed.', steps: ['work → worked', 'visit → visited', 'watch → watched', 'travel → traveled'] },
    stepByStep: [task('Escolha uma expressão de passado.'), task('Escolha o verbo regular.'), task('Adicione -ed ou ajuste a escrita.'), task('Complete com lugar/tempo.'), task('Revise se não colocou did em afirmativa.')],
    portugueseContrast: [task('Português muda muito o verbo; inglês regular usa -ed.'), task('Não diga I did worked.', 'Use I worked.'), task('Não diga yesterday I work.', 'Use Yesterday, I worked.'), task('Did será usado para perguntas/negativas, não nesta afirmativa simples.')],
    guidedDiscovery: [task('Worked mostra ação passada.'), task('Yesterday localiza o tempo.'), task('Visited termina em -ed porque é regular.')],
    guidedBeforeQuiz: [task('Complete: I ___ yesterday. (work)', 'worked'), task('Complete: She ___ her family. (visit)', 'visited'), task('Corrija: I did watched a movie.', 'I watched a movie.')],
    grammarGoal: 'Narrar ações passadas afirmativas com verbos regulares.',
    formationGuide: [task('Subject + regular verb-ed + complement', 'I worked yesterday.'), task('Subject + regular verb-ed + time expression', 'She visited us last week.'), task('Subject + regular verb-ed + place', 'We stayed at a hotel.')],
    whenToUse: [task('Ação concluída no passado.'), task('Eventos com yesterday/last/ago.'), task('Relatos curtos de viagem e rotina passada.')],
    whenNotToUse: [task('Não use para rotina atual.'), task('Não use did em afirmativa simples.'), task('Não use -ed em verbos irregulares quando já souber a forma irregular.')],
    grammarTable: [
      { pattern: 'work → worked', example: 'I worked yesterday.', translation: 'Eu trabalhei ontem.' },
      { pattern: 'visit → visited', example: 'She visited her family.', translation: 'Ela visitou a família.' },
      { pattern: 'watch → watched', example: 'We watched a movie.', translation: 'Nós assistimos a um filme.' },
      { pattern: 'stay → stayed', example: 'They stayed at a hotel.', translation: 'Eles ficaram em um hotel.' }
    ],
    teacherExamples: [
      { english: 'I traveled by bus last weekend.', translation: 'Eu viajei de ônibus fim de semana passado.', why: 'Travel é regular.' },
      { english: 'She booked a room yesterday.', translation: 'Ela reservou um quarto ontem.', why: 'Book vira booked.' },
      { english: 'We waited at the station.', translation: 'Nós esperamos na estação.', why: 'Wait vira waited.' },
      { english: 'He called the hotel two days ago.', translation: 'Ele ligou para o hotel dois dias atrás.', why: 'Called + expressão de tempo.' }
    ],
    commonBrazilianMistakes: [mistake('I did traveled.', 'I traveled.', 'Did não aparece em afirmativa simples.'), mistake('Yesterday I travel.', 'Yesterday, I traveled.', 'Ação passada regular usa -ed.'), mistake('She visit her family last week.', 'She visited her family last week.', 'Visit vira visited.'), mistake('We stayed in a hotel yesterday night.', 'We stayed at a hotel last night.', 'Use at a hotel e last night.')],
    controlledPractice: [task('Complete: I ___ a movie. (watch)', 'watched'), task('Complete: They ___ at the hotel. (stay)', 'stayed'), task('Complete: She ___ a room. (book)', 'booked'), task('Complete: We ___ at the station. (wait)', 'waited')],
    errorCorrectionPractice: [task('Corrija: I did worked yesterday.', 'I worked yesterday.'), task('Corrija: He call the hotel last night.', 'He called the hotel last night.'), task('Corrija: We wait at the airport.', 'We waited at the airport.')],
    transformationPractice: [task('Transforme para passado: I travel by bus.', 'I traveled by bus.'), task('Transforme para passado: She books a room.', 'She booked a room.'), task('Transforme para passado: We watch a movie.', 'We watched a movie.')],
    translationPractice: [task('Eu trabalhei ontem.', 'I worked yesterday.'), task('Ela visitou a família semana passada.', 'She visited her family last week.'), task('Nós ficamos em um hotel.', 'We stayed at a hotel.')],
    productionTasks: [task('Escreva 8 frases no passado com verbos regulares.'), task('Conte uma viagem usando traveled, stayed, visited e waited.'), task('Escreva 5 frases com yesterday/last/ago.')],
    finalChecklist: [task('A ação já terminou?'), task('O verbo é regular?'), task('Usei -ed corretamente?'), task('Evitei did em afirmativa?'), task('Usei expressão de passado?')],
    selfAssessment: [task('Consigo criar frases afirmativas no passado?'), task('Consigo usar -ed?'), task('Consigo evitar I did worked?')],
    lessonRecap: ['Past Simple fala de ações concluídas.', 'Verbos regulares afirmativos usam -ed.', 'Did não entra em afirmativa simples.', 'Expressões de passado deixam a frase clara.'],
    nextLessonBridge: 'Na próxima aula de vocabulário, você vai expandir transporte para contar viagens com mais detalhes.',
  }),

  createVocabularyLesson({
    ...common,
    id: 'A2-VOCABULARY-003',
    order: 3,
    title: 'Transportation',
    objectives: ['Aprender vocabulário de transporte A2.', 'Falar como foi de um lugar a outro.', 'Usar by, take, get on e get off em nível inicial.', 'Conectar transporte com relatos no passado.'],
    teacherOpening: 'Transportation expande Travel basics. Agora você vai falar melhor sobre como se deslocou: by bus, by train, by plane, take a taxi, get on the bus, get off at the station. O foco é contar movimento em histórias simples.',
    whyItMatters: 'Transporte aparece em viagens, cidade, trabalho, atrasos e relatos. Se você consegue explicar como foi, onde entrou e onde desceu, suas histórias A2 ficam muito mais completas.',
    realLifeUseCases: ['Falar como chegou a um lugar.', 'Contar atraso ou viagem.', 'Pedir informação de transporte.', 'Descrever trajeto passado.', 'Entender mensagens de deslocamento.'],
    conceptExplanation: 'Use by + transporte geral: by bus, by train, by plane. Use take para pegar um transporte: I took a taxi. Use get on para entrar em ônibus/trem e get off para descer. No A2, use frases curtas e claras.',
    mentalModel: { title: 'meio + ação + lugar', summary: 'Transporte combina como foi e onde aconteceu.', steps: ['by bus', 'take a taxi', 'get on the train', 'get off at the station'] },
    stepByStep: [task('Escolha o transporte.'), task('Use by para o meio.'), task('Use take para pegar taxi/bus/train.'), task('Use get on/off para entrar/descer.'), task('Adicione tempo/lugar.')],
    portugueseContrast: [task('By bus = de ônibus, sem the em sentido geral.'), task('Take a taxi = pegar um táxi.'), task('Get off = descer; get out of = sair de carro/táxi.'), task('Station não é airport.')],
    guidedDiscovery: [task('By train indica meio de transporte.'), task('Took a taxi indica ação passada.'), task('Got off at the station indica onde desceu.')],
    guidedBeforeQuiz: [task('I traveled by bus.'), task('I took a taxi.'), task('I got on the train.'), task('I got off at the station.')],
    topicContext: 'Você vai contar deslocamentos simples em viagens e na cidade.',
    essentialWords: [vocab('bus', 'ônibus', 'I traveled by bus.'), vocab('train', 'trem', 'The train was late.'), vocab('subway', 'metrô', 'I took the subway.'), vocab('taxi', 'táxi', 'I took a taxi.'), vocab('plane', 'avião', 'I traveled by plane.'), vocab('bike', 'bicicleta', 'I went by bike.'), vocab('car', 'carro', 'We went by car.'), vocab('station', 'estação', 'I got off at the station.'), vocab('airport', 'aeroporto', 'The airport was busy.'), vocab('stop', 'ponto/parada', 'The bus stop was near my hotel.'), vocab('platform', 'plataforma', 'The train was on platform 2.'), vocab('ticket', 'passagem/bilhete', 'I bought a ticket.'), vocab('delay', 'atraso', 'There was a delay.'), vocab('traffic', 'trânsito', 'The traffic was bad.'), vocab('route', 'rota', 'The route was easy.'), vocab('get on', 'entrar/subir', 'I got on the bus.'), vocab('get off', 'descer', 'I got off at the station.'), vocab('take', 'pegar/tomar transporte', 'I took a taxi.')],
    chunks: [{ chunk: 'by bus', translation: 'de ônibus', example: 'I traveled by bus.' }, { chunk: 'take a taxi', translation: 'pegar um táxi', example: 'I took a taxi.' }, { chunk: 'get on the bus', translation: 'entrar no ônibus', example: 'I got on the bus.' }, { chunk: 'get off at the station', translation: 'descer na estação', example: 'I got off at the station.' }, { chunk: 'there was a delay', translation: 'houve um atraso', example: 'There was a delay.' }],
    pronunciationFocus: { title: 'Foco sonoro', tips: ['Traffic tem stress no começo.', 'Delay tem stress no final.', 'Platform tem som de /plæt/ no início.'] },
    dangerousConfusions: [task('By bus não precisa de artigo.'), task('Take a taxi, mas travel by taxi também é possível.'), task('Get off é descer de ônibus/trem; get out of é sair de carro/táxi.'), task('Delay é atraso; late é atrasado.')],
    collocations: [task('buy a ticket'), task('take a taxi'), task('travel by plane'), task('get on the bus'), task('get off at the station'), task('bad traffic'), task('long delay')],
    miniDialogues: [{ title: 'Transport story', lines: ['A: How did you get there?', 'B: I traveled by train.', 'A: Was it fast?', 'B: No. There was a delay.'], focus: 'Transporte + passado.' }],
    examples: [ex('I took a taxi because my luggage was heavy.', 'Peguei um táxi porque minha bagagem estava pesada.', 'Transporte com motivo.'), ex('We got off at the wrong station.', 'Descemos na estação errada.', 'Get off + station.'), ex('The bus was late because of traffic.', 'O ônibus atrasou por causa do trânsito.', 'Problema de transporte.')],
    recognitionPractice: [task('Qual palavra é lugar de trem?', 'station/platform'), task('Qual palavra é problema?', 'delay/traffic'), task('Qual chunk significa descer?', 'get off')],
    usagePractice: [task('Complete: I traveled ___ bus.', 'by'), task('Complete: I ___ a taxi.', 'took'), task('Complete: I got ___ at the station.', 'off'), task('Complete: There was a ___.', 'delay')],
    productionTasks: [task('Escreva 5 frases sobre transporte no passado.'), task('Conte como chegou a um lugar usando by/took/got off.'), task('Crie um mini diálogo sobre atraso de transporte.')],
    spacedReview: [task('Revise by/take/get on/get off amanhã.'), task('Crie 3 frases com delay/traffic/station.')],
    selfAssessment: [task('Consigo falar como viajei?'), task('Consigo usar took/get on/get off?'), task('Consigo explicar atraso simples?')],
    lessonRecap: ['Transportation dá detalhes às histórias.', 'By indica meio.', 'Take/took indica pegar transporte.', 'Get on/off descreve entrar/descer.'],
    nextLessonBridge: 'Na Reading, você vai ler uma nota de reserva de hotel depois de uma viagem.',
  }),

  createReadingLesson({
    ...common,
    id: 'A2-READING-003',
    order: 3,
    title: 'A hotel booking note',
    objectives: ['Ler uma nota simples de reserva de hotel.', 'Identificar datas, nome, quarto, preço e pedido.', 'Reconhecer vocabulário de hospedagem.', 'Responder com evidência textual.'],
    teacherOpening: 'Agora a leitura entra em hospedagem. Você vai ler uma nota de reserva de hotel e localizar informações práticas: nome, data, número de noites, tipo de quarto, preço e pedido especial.',
    whyItMatters: 'Reservas de hotel são textos reais: curtos, informativos e cheios de detalhes. No A2, você precisa entender o essencial sem traduzir tudo.',
    realLifeUseCases: ['Ler confirmação de reserva.', 'Entender pedido de quarto.', 'Localizar data e preço.', 'Confirmar nome e número de noites.', 'Escrever uma solicitação de hotel.'],
    conceptExplanation: 'Em notas de hotel, procure campos: guest, date, room, nights, price, request. Use scanning para localizar detalhes. Depois responda com a frase exata do texto.',
    mentalModel: { title: 'hotel note = dados práticos', summary: 'Procure campos, não traduza tudo.', steps: ['guest', 'dates', 'room', 'nights', 'price', 'request'] },
    stepByStep: [task('Leia o texto inteiro uma vez.'), task('Marque nome e datas.'), task('Marque tipo de quarto.'), task('Marque preço/noites.'), task('Procure pedido especial.'), task('Responda com evidência.')],
    portugueseContrast: [task('Guest = hóspede.'), task('Single room = quarto de solteiro/individual.'), task('Double room = quarto para duas pessoas.'), task('Request = pedido/solicitação.')],
    guidedDiscovery: [task('Reservation confirma reserva.'), task('Check-in mostra entrada.'), task('Nights mostra quantas noites.'), task('Request mostra pedido especial.')],
    guidedBeforeQuiz: [task('Procure guest.'), task('Procure check-in/check-out.'), task('Procure room.'), task('Procure request.')],
    readingPurpose: 'Ler confirmação/nota de reserva de hotel.',
    preReadingVocabulary: [vocab('booking', 'reserva'), vocab('guest', 'hóspede'), vocab('check-in', 'entrada'), vocab('check-out', 'saída'), vocab('single room', 'quarto individual'), vocab('request', 'pedido')],
    readingStrategy: [task('Use scanning para dados.'), task('Não leia como história; leia como informação.'), task('Copie evidência.'), task('Cuidado com datas e números.')],
    mainText: `Hotel Booking Note
Guest: Ana Souza
Check-in: July 12
Check-out: July 14
Room: Single room
Nights: 2
Price: $80 per night
Request: A quiet room near the elevator.
Message: Ana booked the room yesterday. She called the hotel because she had heavy luggage and wanted a room near the elevator.`,
    firstReadTask: task('Qual é o tipo de texto?', 'Uma nota de reserva de hotel.'),
    secondReadTasks: [task('Quem é a hóspede?', 'Ana Souza'), task('Quantas noites?', '2'), task('Qual tipo de quarto?', 'single room'), task('Qual pedido especial?', 'a quiet room near the elevator')],
    evidenceQuestions: [q('Who is the guest?', 'Ana Souza', 'Guest: Ana Souza', '', ['Ana Souza','Maria Lima','Luis Silva']), q('When is check-in?', 'July 12', 'Check-in: July 12', '', ['July 12','July 14','June 12']), q('How many nights?', '2', 'Nights: 2', '', ['2','1','4']), q('How much is the room per night?', '$80', 'Price: $80 per night', '', ['$80','$60','$120']), q('Why did Ana call the hotel?', 'because she had heavy luggage and wanted a room near the elevator', 'She called the hotel because she had heavy luggage and wanted a room near the elevator.', '', ['heavy luggage and room near elevator','lost ticket','late train'])],
    contextVocabularyTasks: [task('Per night significa por noite.'), task('Quiet room é quarto silencioso.'), task('Near the elevator localiza o quarto pedido.')],
    guidedSummary: task('Complete: Ana booked a ___ room for ___ nights. The price is ___ per night. She requested a quiet room near the ___.', '', 'single / 2 / $80 / elevator'),
    connectedProduction: task('Escreva uma nota curta de reserva com nome, data, quarto e pedido.'),
    selfAssessment: [task('Consigo localizar datas?'), task('Consigo entender tipo de quarto?'), task('Consigo responder com evidência?')],
    lessonRecap: ['Hotel notes são textos de dados.', 'Procure guest/date/room/price/request.', 'Scanning é mais útil que tradução total.', 'Evidence confirma detalhes.'],
    nextLessonBridge: 'No Listening, você vai ouvir um diálogo de check-in no hotel.',
  }),

  createListeningLesson({
    ...common,
    id: 'A2-LISTENING-003',
    order: 3,
    title: 'Hotel check-in dialogue',
    objectives: ['Ouvir um diálogo simples de check-in em hotel.', 'Identificar nome, reserva, documento e quarto.', 'Reconhecer pedido educado em recepção.', 'Praticar shadowing de frases de hotel.'],
    teacherOpening: 'Nesta escuta, você vai ouvir um check-in simples. Ouça primeiro o contexto geral. Depois, procure nome, reservation, passport, room number e key. Esse diálogo prepara situações reais de viagem.',
    whyItMatters: 'Check-in em hotel é uma situação muito comum no A2. Você precisa entender perguntas previsíveis e responder com frases curtas.',
    realLifeUseCases: ['Fazer check-in em hotel.', 'Confirmar reserva.', 'Entregar documento.', 'Entender número do quarto.', 'Pedir quarto silencioso.'],
    conceptExplanation: 'Diálogos de hotel têm blocos previsíveis: I have a reservation. Can I see your passport? Your room is 204. Here is your key. Breakfast is at seven. Ouça por esses blocos.',
    mentalModel: { title: 'reservation → document → room → key', summary: 'O check-in segue uma sequência previsível.', steps: ['reservation', 'passport', 'room number', 'key', 'breakfast'] },
    stepByStep: [task('Primeira escuta: confirme que é hotel.'), task('Segunda escuta: nome/reserva.'), task('Terceira etapa: quarto e chave.'), task('Leia transcript.'), task('Faça dictation.'), task('Faça shadowing.')],
    portugueseContrast: [task('I have a reservation = tenho uma reserva.'), task('Can I see your passport? = posso ver seu passaporte?'), task('Here is your key = aqui está sua chave.')],
    guidedDiscovery: [task('Reservation anuncia reserva.'), task('Room number indica quarto.'), task('Key indica chave/cartão.')],
    guidedBeforeQuiz: [task('Primeira escuta: qual é a situação?'), task('Segunda escuta: qual é o número do quarto?')],
    listeningPreparation: [task('Não leia o transcript antes da primeira escuta.'), task('Prepare: reservation, passport, room, key, breakfast.'), task('Objetivo: entender o fluxo do check-in.')],
    keyWordsToHear: [vocab('reservation','reserva'), vocab('passport','passaporte'), vocab('room','quarto'), vocab('key','chave'), vocab('breakfast','café da manhã')],
    audioScript: `Receptionist: Good evening. Welcome to Hotel Central. How can I help you?
Guest: Hi. I have a reservation. My name is Ana Souza.
Receptionist: One moment, please. Souza... Ana Souza. Yes, a single room for two nights. Can I see your ID or passport?
Guest: Sure. Here it is.
Receptionist: Thank you. I'm sorry, but your room is not ready yet. It will be ready in about fifteen minutes. Can you wait in the lobby?
Guest: Oh, okay. No problem.
Receptionist: Thank you for your patience. Your room is 204. Here is your key card. Breakfast is at seven in the morning.
Guest: Great. Is the room quiet? I need to sleep early.
Receptionist: Yes, it is on the second floor, away from the main street. Very quiet.`,
    firstListenTasks: [task('Sem transcript: onde acontece a conversa?', 'hotel/reception'), task('Sem transcript: a hóspede tem reserva?', 'yes'), task('Sem transcript: ocorreu algum pequeno problema?', 'yes — room not ready yet')],
    secondListenTasks: [task('Qual é o nome da hóspede?', 'Ana Souza'), task('Qual tipo de quarto?', 'single room'), task('Quantas noites?', 'two nights'), task('Qual é o número do quarto?', '204'), task('Por que a hóspede esperou?', 'room not ready yet'), task('Que horas é o café da manhã?', 'at seven')],
    transcript: `Receptionist: Good evening. Welcome to Hotel Central. How can I help you?
Guest: Hi. I have a reservation. My name is Ana Souza.
Receptionist: One moment, please. Souza... Ana Souza. Yes, a single room for two nights. Can I see your ID or passport?
Guest: Sure. Here it is.
Receptionist: Thank you. I'm sorry, but your room is not ready yet. It will be ready in about fifteen minutes. Can you wait in the lobby?
Guest: Oh, okay. No problem.
Receptionist: Thank you for your patience. Your room is 204. Here is your key card. Breakfast is at seven in the morning.
Guest: Great. Is the room quiet? I need to sleep early.
Receptionist: Yes, it is on the second floor, away from the main street. Very quiet.`,
    vocabulary: [vocab('receptionist', 'recepcionista'), vocab('guest', 'hóspede'), vocab('one moment', 'um momento'), vocab('single room', 'quarto individual'), vocab('elevator', 'elevador')],
    shadowing: [task('I have a reservation.'), task('My name is Ana Souza.'), task('Can I see your passport?'), task('Here it is.'), task('Your room is 204.'), task('Breakfast is at seven.')],
    dictationTasks: [task('Digite: I have a reservation.', 'I have a reservation.'), task('Digite: Can I see your passport?', 'Can I see your passport?'), task('Digite: Breakfast is at seven.', 'Breakfast is at seven.')],
    pronunciationChunks: [task('I have a reservation', 'Fale como bloco.'), task('one moment please', 'Pedido educado.'), task('your room is', 'Bloco para número do quarto.')],
    listeningComprehension: [q('What is the guest’s name?', 'Ana Souza', 'My name is Ana Souza.', '', ['Ana Souza','Maria Costa','Paula Lima']), q('What room type does she have?', 'single room', 'a single room for two nights', '', ['single room','double room','family room']), q('What is her room number?', '204', 'Your room is 204.', '', ['204','240','402']), q('What time is breakfast?', 'at seven', 'Breakfast is at seven.', '', ['at seven','at eight','at nine'])],
    oralProduction: task('Pratique o diálogo: I have a reservation. My name is... Can I see your passport?'),
    selfAssessment: [task('Consegui identificar reserva?'), task('Consegui ouvir quarto e horário?'), task('Consigo repetir frases de check-in?')],
    lessonRecap: ['Check-in tem sequência previsível.', 'Reservation/passport/room/key são palavras-chave.', 'Shadowing ajuda a automatizar frases de hotel.', 'Números e horários exigem atenção.'],
    nextLessonBridge: 'No Speaking, você vai falar sobre uma viagem curta usando hotel e transporte.',
  }),

  createSpeakingLesson({
    ...common,
    id: 'A2-SPEAKING-003',
    order: 3,
    title: 'Talk about a trip',
    objectives: ['Falar sobre uma viagem curta no passado.', 'Usar transporte, hospedagem e sequência.', 'Responder perguntas sobre destino, transporte e hotel.', 'Gravar relato de viagem de 60 segundos.'],
    teacherOpening: 'Agora você vai falar sobre uma viagem. Mesmo que seja inventada, use estrutura real: where, when, transport, hotel, activities and feeling. Exemplo: Last weekend, I traveled to Curitiba by bus. I stayed at a small hotel. The trip was long, but comfortable.',
    whyItMatters: 'Falar de viagem mistura quase tudo do A2.2: passado, transporte, hotel, sequência e opinião. É uma habilidade muito útil e reaproveitável.',
    realLifeUseCases: ['Contar uma viagem.', 'Responder perguntas sobre transporte.', 'Falar de hotel.', 'Explicar problema simples.', 'Descrever sentimento/opinião.'],
    conceptExplanation: 'Use perguntas-guia: Where did you go? When did you go? How did you travel? Where did you stay? How was the trip? Responda com frases curtas e conecte com then/after that.',
    mentalModel: { title: '5 perguntas de viagem', summary: 'Where, when, how, where stayed, how felt.', steps: ['Where did you go?', 'When?', 'How did you travel?', 'Where did you stay?', 'How was it?'] },
    stepByStep: [task('Diga quando e para onde foi.'), task('Diga como viajou.'), task('Diga onde ficou.'), task('Diga uma atividade.'), task('Diga um problema ou sentimento.'), task('Grave uma versão final.')],
    portugueseContrast: [task('Não conte uma história longa demais.'), task('Use frases curtas no passado.'), task('Did aparece na pergunta; resposta afirmativa usa verbo no passado.'), task('Use stayed at a hotel.')],
    guidedDiscovery: [task('Where did you go? pede destino.'), task('How did you travel? pede transporte.'), task('Where did you stay? pede hospedagem.')],
    guidedBeforeQuiz: [task('Repita: I traveled to Curitiba by bus.'), task('Repita: I stayed at a hotel.'), task('Repita: The trip was long, but comfortable.')],
    speakingSituation: 'Você vai contar uma viagem curta para alguém que pergunta sobre seu fim de semana.',
    modelPhrases: [phrase('I traveled to Curitiba last weekend.', 'Viajei para Curitiba fim de semana passado.'), phrase('I traveled by bus.', 'Viajei de ônibus.'), phrase('I stayed at a small hotel.', 'Fiquei em um hotel pequeno.'), phrase('I visited the city center.', 'Visitei o centro da cidade.'), phrase('The trip was long, but comfortable.', 'A viagem foi longa, mas confortável.')],
    pronunciationChunks: [task('I traveled to', 'Conecte traveled-to.'), task('by bus', 'Curto e claro.'), task('stayed at a hotel', 'Bloco de hospedagem.')],
    repeatAfterMe: [task('Where did you go?'), task('I traveled to Curitiba.'), task('How did you travel?'), task('I traveled by bus.'), task('Where did you stay?'), task('I stayed at a hotel.')],
    substitutionDrills: [task('Curitiba → São Paulo', 'I traveled to São Paulo.'), task('bus → train', 'I traveled by train.'), task('hotel → my friend’s house', 'I stayed at my friend’s house.')],
    guidedSpeaking: [task('Responda: Where did you go?'), task('Responda: How did you travel?'), task('Responda: Where did you stay?'), task('Responda: How was the trip?')],
    recordingTasks: [task('Grave respostas para as 5 perguntas de viagem.'), task('Grave relato de 45 segundos.'), task('Grave versão final de 60 segundos com sequência.')],
    freeSpeaking: task('Conte uma viagem real ou inventada em 60 segundos usando transporte, hotel, sequência e sentimento.'),
    feedbackChecklist: [task('Digo destino e tempo?'), task('Digo transporte?'), task('Digo hospedagem?'), task('Uso passado regular?'), task('Incluo opinião/sentimento?')],
    selfAssessment: [task('Consigo falar de uma viagem?'), task('Consigo responder perguntas de viagem?'), task('Consigo manter 60 segundos?')],
    lessonRecap: ['Falar de viagem usa perguntas-guia.', 'Transporte e hotel dão detalhes.', 'Frases curtas mantêm controle.', 'Opinião fecha a história.'],
    nextLessonBridge: 'Na Writing, você vai escrever uma mensagem curta de viagem.',
  }),

  createWritingLesson({
    ...common,
    id: 'A2-WRITING-003',
    order: 3,
    title: 'Write a travel message',
    objectives: ['Escrever uma mensagem curta de viagem.', 'Incluir destino, transporte, hotel e sentimento.', 'Usar passado simples e sequência.', 'Revisar clareza, pontuação e vocabulário de viagem.'],
    teacherOpening: 'Agora você vai escrever uma mensagem de viagem. Ela deve parecer uma mensagem real: curta, clara e com detalhes essenciais. Conte onde chegou, como viajou, onde ficou e como se sentiu.',
    whyItMatters: 'Mensagens de viagem são reais e frequentes. Elas treinam passado, vocabulário funcional e organização de ideias sem virar redação longa.',
    realLifeUseCases: ['Mandar mensagem para amigo/família.', 'Relatar chegada ao hotel.', 'Falar de transporte e bagagem.', 'Contar uma experiência curta.', 'Preparar escrita de e-mail simples.'],
    conceptExplanation: 'Uma boa mensagem de viagem A2 tem 5 partes: greeting, arrival, transport, accommodation, feeling/next plan. Exemplo: Hi! I arrived in Curitiba yesterday. I traveled by bus. I stayed at a small hotel near the station. I was tired, but happy.',
    mentalModel: { title: 'mensagem de viagem em 5 partes', summary: 'Cumprimente, diga chegada, transporte, hotel e sentimento.', steps: ['Hi!', 'I arrived...', 'I traveled by...', 'I stayed at...', 'I was...'] },
    stepByStep: [task('Comece com Hi/Hello.'), task('Diga onde e quando chegou.'), task('Diga como viajou.'), task('Diga onde ficou.'), task('Diga sentimento/opinião.'), task('Adicione próximo plano se quiser.'), task('Revise pontuação e verbos.')],
    portugueseContrast: [task('Não escreva texto gigante.'), task('Use arrived in + cidade.'), task('Use stayed at + hotel.'), task('Use traveled by + transporte.')],
    guidedDiscovery: [task('I arrived in Curitiba localiza destino.'), task('I traveled by bus indica transporte.'), task('I stayed at a hotel indica hospedagem.'), task('I was tired, but happy indica sentimento.')],
    guidedBeforeQuiz: [task('Modelo: Hi, Ana!'), task('Modelo: I arrived in Curitiba yesterday.'), task('Modelo: I traveled by bus.'), task('Modelo: I stayed at a hotel.')],
    writingPurpose: 'Escrever mensagem curta de viagem A2.',
    modelText: `Hi, Ana! I arrived in Curitiba yesterday afternoon. I traveled by bus, and the trip was long but comfortable. I stayed at a small hotel near the station. My luggage was heavy, so I took a taxi. I was tired, but happy. Tomorrow, I am going to visit the museum.`,
    writingBlocks: [task('Greeting', 'Hi, Ana!'), task('Arrival', 'I arrived in Curitiba yesterday afternoon.'), task('Transport', 'I traveled by bus.'), task('Accommodation', 'I stayed at a small hotel near the station.'), task('Problem/detail', 'My luggage was heavy, so I took a taxi.'), task('Feeling/plan', 'I was tired, but happy. Tomorrow, I am going to visit the museum.')],
    guidedSubstitution: [task('Troque Curitiba por outra cidade.'), task('Troque bus por train/plane.'), task('Troque hotel near the station por hotel near the airport.'), task('Troque museum por restaurant/park.')],
    grammarForWriting: [task('Use Past Simple para ações concluídas.'), task('Use arrived in + cidade.'), task('Use traveled by + transporte.'), task('Use stayed at + hotel.'), task('Use but/so para conectar contraste/consequência.')],
    checklist: [task('Incluí destino?'), task('Incluí tempo?'), task('Incluí transporte?'), task('Incluí hospedagem?'), task('Incluí sentimento ou opinião?'), task('Revisei verbos no passado?')],
    draftTask: task('Escreva uma mensagem de viagem com 5 a 7 frases.'),
    revisionTask: task('Revise destino, transporte, hotel, passado e pontuação.'),
    commonMistakes: [mistake('I arrived to Curitiba.', 'I arrived in Curitiba.', 'Use arrived in + cidade.'), mistake('I stayed in a hotel.', 'I stayed at a hotel.', 'Padrão inicial: stayed at a hotel.'), mistake('I travel by bus yesterday.', 'I traveled by bus yesterday.', 'Passado regular usa -ed.')],
    productionTasks: [task('Escreva versão 1 da mensagem.'), task('Adicione 2 detalhes de transporte/hotel.'), task('Reescreva versão final com 6 frases.')],
    selfAssessment: [task('Consigo escrever mensagem de viagem?'), task('Consigo usar passado e vocabulário de transporte?'), task('Consigo revisar erros comuns?')],
    lessonRecap: ['Mensagem de viagem deve ser curta e clara.', 'Inclua chegada, transporte, hotel e sentimento.', 'Past Simple organiza ações concluídas.', 'But/so ajudam contraste e consequência.'],
    nextLessonBridge: 'No próximo bloco A2.2, você vai continuar com verbos irregulares e situações de restaurante/compras/farmácia.',
  }),
]);

export const A2_DEEP_PAST_STORIES_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(A2_DEEP_PAST_STORIES.filter((lesson) => lesson.pillar === 'grammar')),
  vocabulary: Object.freeze(A2_DEEP_PAST_STORIES.filter((lesson) => lesson.pillar === 'vocabulary')),
  reading: Object.freeze(A2_DEEP_PAST_STORIES.filter((lesson) => lesson.pillar === 'reading')),
  listening: Object.freeze(A2_DEEP_PAST_STORIES.filter((lesson) => lesson.pillar === 'listening')),
  speaking: Object.freeze(A2_DEEP_PAST_STORIES.filter((lesson) => lesson.pillar === 'speaking')),
  writing: Object.freeze(A2_DEEP_PAST_STORIES.filter((lesson) => lesson.pillar === 'writing')),
});
