import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'A1';
const status = 'ready';

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }
function ex(text, translation, why = '', warning = '') { return { text, translation, why, warning }; }
function dialogue(title, lines, focus = '') { return { title, lines, focus }; }

const common = {
  level,
  status,
  estimatedMinutes: 55,
  tags: ['a1-4', 'practical-situations', 'places-directions', 'deep-approved-target'],
};

export const A1_DEEP_PRACTICAL_SITUATIONS_PLACES = Object.freeze([
  createGrammarLesson({
    ...common,
    id: 'A1-GRAMMAR-022',
    order: 22,
    title: 'Imperatives',
    objectives: ['Entender e usar comandos simples.', 'Dar instruções curtas com verbo base.', 'Usar imperatives em direções e situações práticas.', 'Diferenciar comando direto de pedido educado com please.'],
    teacherOpening: 'Imperatives são frases de ação direta. Em português você diz “vá”, “vire”, “olhe”, “repita”, “sente”. Em inglês A1, o imperativo usa o verbo base: Go straight. Turn left. Open the door. Repeat, please. Nesta aula, o foco não é mandar nas pessoas; é entender instruções e dar direções simples em situações reais.',
    whyItMatters: 'Você encontra imperatives em sala de aula, mapas, instruções, placas, aplicativos, lojas e direções. Sem eles, você entende menos frases como Turn right, Stop here, Open your book, Listen and repeat. Eles também conectam diretamente com o tema de lugares e direções do A1.4.',
    realLifeUseCases: ['Entender instruções de professor.', 'Dar direções simples.', 'Seguir instruções em aplicativos.', 'Pedir repetição com Repeat, please.', 'Entender placas e comandos curtos.'],
    conceptExplanation: 'O imperativo em inglês geralmente começa com o verbo base. Não precisa de sujeito. Use Go, Turn, Stop, Open, Close, Listen, Repeat, Look. Para soar educado, adicione please: Repeat, please. Open the door, please. Para negar, use Don’t + verbo base: Don’t stop here. Don’t turn right. No A1, use frases curtas.',
    mentalModel: { title: 'Verbo base = instrução', summary: 'Imperative começa direto com a ação.', steps: ['Go straight.', 'Turn left.', 'Stop here.', 'Repeat, please.', 'Don’t turn right.'] },
    stepByStep: [task('Escolha a ação principal: go, turn, stop, open, repeat.'), task('Comece a frase com o verbo base.'), task('Adicione lugar/direção se precisar.', 'Go straight. Turn left. Stop here.'), task('Use please para suavizar.'), task('Use Don’t para instrução negativa.')],
    portugueseContrast: [task('Português muda muito a forma do verbo: vá, vire, repita. Inglês usa verbo base.'), task('Não diga “You go straight” quando quiser dar uma instrução simples.', 'Use Go straight.'), task('Please deixa o comando mais educado.'), task('Don’t + verbo base cria instrução negativa.')],
    guidedDiscovery: [task('Em “Turn left”, qual é o verbo?', 'Turn.'), task('Em “Don’t stop here”, qual palavra nega a instrução?', 'Don’t.'), task('Em “Repeat, please”, o que deixa a frase educada?', 'Please.')],
    guidedBeforeQuiz: [task('Go straight = siga em frente.'), task('Turn left = vire à esquerda.'), task('Turn right = vire à direita.'), task('Stop here = pare aqui.'), task('Don’t turn right = não vire à direita.')],
    grammarGoal: 'Usar imperatives para instruções simples e direções A1.',
    formationGuide: [task('Affirmative: verb base', 'Go straight.'), task('Direction: verb + direction', 'Turn left.'), task('Polite: verb + please', 'Repeat, please.'), task('Negative: Don’t + verb base', 'Don’t stop here.')],
    whenToUse: [task('Para direções.'), task('Para instruções de sala.'), task('Para comandos em placas/app.'), task('Para pedir que alguém faça algo simples.')],
    whenNotToUse: [task('Não use imperativo para opinião ou rotina.'), task('Não coloque sujeito quando a instrução simples já basta.'), task('Não esqueça please quando quiser soar educado.')],
    grammarTable: [
      { pattern: 'Verb base', example: 'Go straight.', translation: 'Siga em frente.' },
      { pattern: 'Verb + direction', example: 'Turn left.', translation: 'Vire à esquerda.' },
      { pattern: 'Verb + please', example: 'Repeat, please.', translation: 'Repita, por favor.' },
      { pattern: 'Don’t + verb', example: 'Don’t stop here.', translation: 'Não pare aqui.' }
    ],
    teacherExamples: [
      { english: 'Go straight and turn left.', translation: 'Siga em frente e vire à esquerda.', why: 'Duas instruções simples conectadas.' },
      { english: 'Stop here, please.', translation: 'Pare aqui, por favor.', why: 'Please suaviza o comando.' },
      { english: 'Open your book.', translation: 'Abra seu livro.', why: 'Instrução comum de aula.' },
      { english: 'Don’t turn right.', translation: 'Não vire à direita.', why: 'Don’t cria comando negativo.' }
    ],
    commonBrazilianMistakes: [mistake('You turn left.', 'Turn left.', 'Para instrução simples, comece direto com o verbo.'), mistake('To go straight.', 'Go straight.', 'Imperative não usa to no começo.'), mistake('No turn right.', 'Don’t turn right.', 'Negativa de imperativo usa Don’t.'), mistake('Repeat please me.', 'Repeat, please.', 'Please não precisa de me aqui.')],
    controlledPractice: [task('Complete: ___ straight.', 'Go'), task('Complete: ___ left.', 'Turn'), task('Complete: ___ here, please.', 'Stop'), task('Complete: Don’t ___ right.', 'turn')],
    errorCorrectionPractice: [task('Corrija: To turn left.', 'Turn left.'), task('Corrija: No stop here.', 'Don’t stop here.'), task('Corrija: You repeat please.', 'Repeat, please.')],
    transformationPractice: [task('Monte: straight / go', 'Go straight.'), task('Monte: left / turn', 'Turn left.'), task('Monte negativa: Turn right.', 'Don’t turn right.')],
    translationPractice: [task('Siga em frente.', 'Go straight.'), task('Vire à direita.', 'Turn right.'), task('Repita, por favor.', 'Repeat, please.')],
    productionTasks: [task('Escreva 6 instruções para chegar a um lugar.'), task('Escreva 4 comandos de sala de aula.'), task('Escreva 3 instruções negativas com Don’t.')],
    finalChecklist: [task('Comecei com verbo base?'), task('Usei please quando precisava ser educado?'), task('Usei Don’t na negativa?'), task('Minhas direções ficaram curtas e claras?')],
    selfAssessment: [task('Consigo entender direções simples?'), task('Consigo usar Go/Turn/Stop?'), task('Consigo negar com Don’t?')],
    lessonRecap: ['Imperatives começam com verbo base.', 'Go straight, turn left e stop here são direções úteis.', 'Please suaviza comandos.', 'Don’t + verbo cria instrução negativa.'],
    nextLessonBridge: 'Na próxima aula de vocabulário, você vai aprender lugares na cidade para usar essas instruções em contexto real.',
  }),

  createVocabularyLesson({
    ...common,
    id: 'A1-VOCABULARY-014',
    order: 14,
    title: 'Places in town',
    objectives: ['Aprender lugares essenciais da cidade.', 'Perguntar onde fica um lugar.', 'Usar near, next to e on para localização simples.', 'Conectar lugares com direções básicas.'],
    teacherOpening: 'Places in town é vocabulário de sobrevivência. Você usa essas palavras para se localizar, pedir informação e entender direções: supermarket, pharmacy, bank, school, bus stop, hospital. O objetivo não é decorar uma lista gigante, e sim aprender lugares comuns dentro de frases úteis: Where is the pharmacy? It is next to the bank.',
    whyItMatters: 'Lugares da cidade aparecem em viagens, mapas, aplicativos, conversas e emergências. Esse vocabulário se conecta com imperatives, prepositions of place e perguntas com where. Ele também prepara você para listening e speaking de direções.',
    realLifeUseCases: ['Perguntar onde fica uma farmácia.', 'Entender localização no mapa.', 'Dizer que algo fica perto de outro lugar.', 'Pedir direção simples.', 'Falar onde você trabalha/estuda.'],
    conceptExplanation: 'Aprenda cada lugar com uma frase de localização. Supermarket é mercado/supermercado. Pharmacy é farmácia. Bank é banco. Bus stop é ponto de ônibus. Hospital é hospital. School é escola. Para perguntar, use Where is the...? Para responder, use It is near..., next to..., on... No A1, frases curtas são melhores.',
    mentalModel: { title: 'Lugar + localização', summary: 'A palavra só vira útil quando entra em Where is...? / It is...', steps: ['Where is the pharmacy?', 'It is near the supermarket.', 'Where is the bank?', 'It is next to the school.'] },
    stepByStep: [task('Aprenda o lugar com artigo: the bank, the school.'), task('Pergunte com Where is the...?'), task('Responda com It is...'), task('Use near/next to/on.'), task('Adicione direção se necessário: Go straight.')],
    portugueseContrast: [task('Pharmacy é farmácia; drugstore também existe, mas pharmacy é seguro.'), task('Library é biblioteca, não livraria.'), task('Bookstore é livraria.'), task('Bus stop é ponto de ônibus, não parada de carro.')],
    guidedDiscovery: [task('Qual lugar é para comprar remédio?', 'pharmacy'), task('Qual lugar é para pegar ônibus?', 'bus stop'), task('Qual pergunta localiza um lugar?', 'Where is the...?')],
    guidedBeforeQuiz: [task('Where is the pharmacy?'), task('It is next to the bank.'), task('The bus stop is near the school.'), task('Go straight and turn left.')],
    topicContext: 'Você está em uma cidade e precisa encontrar lugares básicos com ajuda de outra pessoa ou de um mapa.',
    essentialWords: [vocab('supermarket', 'supermercado', 'The supermarket is near my house.'), vocab('pharmacy', 'farmácia', 'Where is the pharmacy?'), vocab('bank', 'banco', 'The bank is next to the school.'), vocab('school', 'escola', 'The school is on Main Street.'), vocab('hospital', 'hospital', 'The hospital is near the pharmacy.'), vocab('bus stop', 'ponto de ônibus', 'The bus stop is here.'), vocab('restaurant', 'restaurante', 'The restaurant is open.'), vocab('café', 'café/lanchonete', 'The café is next to the bank.'), vocab('store', 'loja', 'The store is near the supermarket.'), vocab('park', 'parque', 'The park is big.'), vocab('hotel', 'hotel', 'The hotel is on this street.'), vocab('street', 'rua', 'The bank is on King Street.'), vocab('corner', 'esquina', 'Turn left at the corner.'), vocab('map', 'mapa', 'Look at the map.'), vocab('near', 'perto', 'It is near the school.'), vocab('next to', 'ao lado de', 'It is next to the bank.')],
    chunks: [{ chunk: 'Where is the pharmacy?', translation: 'Onde fica a farmácia?', example: 'Excuse me. Where is the pharmacy?' }, { chunk: 'It is near the supermarket.', translation: 'Fica perto do supermercado.', example: 'It is near the supermarket.' }, { chunk: 'It is next to the bank.', translation: 'Fica ao lado do banco.', example: 'The café is next to the bank.' }, { chunk: 'Go straight and turn left.', translation: 'Siga em frente e vire à esquerda.', example: 'Go straight and turn left.' }, { chunk: 'on Main Street', translation: 'na Rua Main', example: 'The hotel is on Main Street.' }],
    pronunciationFocus: { title: 'Foco sonoro', tips: ['Pharmacy começa com som de f.', 'School começa com sk, sem vogal antes.', 'Restaurant pode soar reduzido: RES-tuh-rant.'] },
    dangerousConfusions: [task('Library não é livraria.', 'Library = biblioteca; bookstore = livraria.'), task('Bank é banco financeiro, não banco de sentar.'), task('On Main Street usa on para rua.'), task('Next to é ao lado, near é perto.')],
    collocations: [task('bus stop'), task('on Main Street'), task('next to the bank'), task('near the school'), task('at the corner'), task('look at the map')],
    miniDialogues: [dialogue('Asking for a place', ['A: Excuse me. Where is the pharmacy?', 'B: It is near the supermarket.', 'A: Is it on this street?', 'B: Yes. Go straight and turn left.', 'A: Thank you.'], 'Perguntar e entender localização.')],
    examples: [ex('Where is the pharmacy?', 'Onde fica a farmácia?', 'Pergunta essencial.'), ex('The café is next to the bank.', 'O café fica ao lado do banco.', 'Next to localiza.'), ex('The bus stop is near the school.', 'O ponto de ônibus fica perto da escola.', 'Near é perto.'), ex('The hotel is on Main Street.', 'O hotel fica na Rua Main.', 'On para rua.'), ex('Turn left at the corner.', 'Vire à esquerda na esquina.', 'Direção com corner.')],
    recognitionPractice: [task('Qual lugar vende remédio?', 'pharmacy'), task('Qual lugar é ponto de ônibus?', 'bus stop'), task('Qual expressão significa ao lado de?', 'next to'), task('Qual pergunta localiza um lugar?', 'Where is the...?')],
    usagePractice: [task('Complete: Where is the ___?', 'pharmacy'), task('Complete: It is next ___ the bank.', 'to'), task('Complete: The hotel is ___ Main Street.', 'on'), task('Complete: Turn left at the ___.', 'corner')],
    productionTasks: [task('Escreva 6 frases localizando lugares da cidade.'), task('Crie um diálogo perguntando onde fica a farmácia.'), task('Descreva 3 lugares perto da sua casa usando near/next to.')],
    spacedReview: [task('Revise pharmacy, bank, bus stop e supermarket amanhã.'), task('Revise near vs next to em 3 frases.')],
    selfAssessment: [task('Consigo perguntar onde fica um lugar?'), task('Consigo usar near e next to?'), task('Consigo entender direções curtas?')],
    lessonRecap: ['Places in town deve ser aprendido com localização.', 'Where is the...? pergunta lugar.', 'Near e next to são básicos para localização.', 'Direções usam imperatives como go e turn.'],
    nextLessonBridge: 'Na Reading, você vai localizar lugares em um mini texto e usar evidência para responder.',
  }),

  createReadingLesson({
    ...common,
    id: 'A1-READING-014',
    order: 14,
    title: 'Reading for places',
    objectives: ['Ler um texto curto sobre lugares na cidade.', 'Localizar informações com where, near e next to.', 'Responder perguntas com evidência textual.', 'Diferenciar lugares e direções simples.'],
    teacherOpening: 'Nesta leitura, você vai treinar como encontrar lugares em um texto curto. O foco não é traduzir tudo. O foco é localizar palavras-chave: pharmacy, supermarket, school, bank, near, next to, on Main Street. Você vai responder usando evidência.',
    whyItMatters: 'Textos sobre localização aparecem em mensagens, mapas, instruções e descrições simples. Se você aprende a encontrar lugar e evidência, consegue entender direções básicas sem depender de tradução completa.',
    realLifeUseCases: ['Ler mensagem com localização.', 'Entender instrução de caminho.', 'Encontrar lugar em mapa simples.', 'Responder where questions.', 'Usar texto como modelo para speaking/writing.'],
    conceptExplanation: 'Para ler textos de lugares, procure nomes de lugar e preposições. Where indica pergunta de localização. Near significa perto. Next to significa ao lado. On aparece com rua: on Main Street. Use a frase do texto como prova da resposta.',
    mentalModel: { title: 'Lugar + pista de localização', summary: 'Procure o lugar e a palavra que mostra posição.', steps: ['Find the place.', 'Find near/next to/on.', 'Read the full sentence.', 'Use it as evidence.'] },
    stepByStep: [task('Leia o texto uma vez para entender o contexto.'), task('Sublinhe lugares.'), task('Circule near, next to e on.'), task('Leia a pergunta.'), task('Volte ao texto e copie a evidência.')],
    portugueseContrast: [task('On Main Street = na Rua Main.'), task('Next to = ao lado de, não “próximo qualquer”.'), task('Near = perto, mais geral.'), task('At the corner = na esquina.')],
    guidedDiscovery: [task('Qual palavra mostra rua?', 'street'), task('Qual expressão mostra ao lado?', 'next to'), task('Qual palavra mostra perto?', 'near')],
    guidedBeforeQuiz: [task('Procure lugares primeiro.'), task('Depois procure localização.'), task('Responda com evidência textual.')],
    readingPurpose: 'Ler localização simples e responder com evidência.',
    preReadingVocabulary: [vocab('pharmacy', 'farmácia'), vocab('supermarket', 'supermercado'), vocab('bank', 'banco'), vocab('school', 'escola'), vocab('near', 'perto'), vocab('next to', 'ao lado de')],
    readingStrategy: [task('Use scanning para achar nomes de lugares.'), task('Marque preposições de lugar.'), task('Use a frase inteira como evidência.'), task('Não invente localização fora do texto.')],
    mainText: `My town is small, but it has useful places. The pharmacy is on Main Street. It is next to the supermarket. The bank is near the school, and the bus stop is in front of the park. There is a small café near the bus stop. My favorite place is the park because it is quiet. When I need medicine, I go to the pharmacy. When I need food, I go to the supermarket.`,
    firstReadTask: task('Qual é o assunto geral do texto?', 'Lugares em uma cidade pequena.', 'places in a small town'),
    secondReadTasks: [task('Encontre onde fica a pharmacy.', 'The pharmacy is on Main Street.', 'on Main Street'), task('Encontre o que fica next to the supermarket.', 'It is next to the supermarket.', 'the pharmacy'), task('Encontre onde fica o bus stop.', 'The bus stop is in front of the park.', 'in front of the park')],
    evidenceQuestions: [q('Where is the pharmacy?', 'on Main Street', 'The pharmacy is on Main Street.', 'A frase diz a rua.', ['on Main Street','near the school','in the park']), q('What is next to the supermarket?', 'the pharmacy', 'It is next to the supermarket.', 'It retoma pharmacy.', ['the pharmacy','the bank','the park']), q('Where is the bank?', 'near the school', 'The bank is near the school.', 'Near mostra localização.', ['near the school','next to the supermarket','on the bus stop']), q('Where is the bus stop?', 'in front of the park', 'The bus stop is in front of the park.', 'A frase localiza o ponto.', ['in front of the park','inside the school','next to the café']), q('Why does the person like the park?', 'because it is quiet', 'My favorite place is the park because it is quiet.', 'Because dá o motivo.', ['because it is quiet','because it is big','because it is new'])],
    contextVocabularyTasks: [task('No texto, useful places significa lugares úteis.'), task('Medicine aparece ligado à pharmacy.'), task('Food aparece ligado a supermarket.')],
    guidedSummary: task('Complete: The pharmacy is on ___. The bank is near ___. The bus stop is in front of ___.', '', 'Main Street / the school / the park'),
    connectedProduction: task('Escreva 4 frases sobre lugares perto da sua casa usando near, next to ou on.'),
    selfAssessment: [task('Consigo encontrar lugares no texto?'), task('Consigo usar evidência?'), task('Consigo diferenciar near e next to?')],
    lessonRecap: ['Textos de lugares têm nomes e pistas de posição.', 'Near, next to, in front of e on ajudam localização.', 'Evidence evita resposta inventada.', 'Places in town conectam Reading com Speaking e Listening.'],
    nextLessonBridge: 'No Listening, você vai ouvir alguém perguntando onde fica um lugar.',
  }),

  createListeningLesson({
    ...common,
    id: 'A1-LISTENING-010',
    order: 10,
    title: 'Asking where something is',
    objectives: ['Ouvir pergunta sobre localização.', 'Identificar lugar procurado.', 'Reconhecer near, next to e on em fala curta.', 'Responder com localização simples.'],
    teacherOpening: 'Agora você vai ouvir uma conversa curta de localização. Primeiro, entenda qual lugar a pessoa procura. Depois, ouça onde esse lugar fica. Não tente entender cada palavra na primeira escuta. Procure palavras-âncora: where, pharmacy, near, supermarket, street.',
    whyItMatters: 'Perguntar onde algo fica é uma habilidade de sobrevivência. Você precisa entender tanto a pergunta quanto a resposta: Where is the pharmacy? It is next to the supermarket. Isso aparece em ruas, lojas, hotéis, mapas e viagens.',
    realLifeUseCases: ['Perguntar onde fica farmácia.', 'Entender resposta rápida.', 'Localizar banco, café ou ponto de ônibus.', 'Responder com near/next to/on.', 'Repetir frases úteis com shadowing.'],
    conceptExplanation: 'Listening de localização deve ser feito em camadas. Primeira escuta: qual lugar? Segunda escuta: onde fica? Depois, confira no transcript. As palavras de localização são pequenas, mas importantes: near, next to, on, in front of.',
    mentalModel: { title: 'Lugar primeiro, posição depois', summary: 'Ouça o lugar procurado e depois a pista de localização.', steps: ['Where is...?', 'place', 'It is...', 'location clue'] },
    stepByStep: [task('Antes de ouvir, revise lugares.'), task('Primeira escuta: identifique o lugar.'), task('Segunda escuta: identifique a localização.'), task('Confira transcript.'), task('Faça shadowing das frases principais.')],
    portugueseContrast: [task('Excuse me abre pergunta educada.'), task('Next to é ao lado, near é perto.'), task('On Main Street significa na Rua Main.')],
    guidedDiscovery: [task('Se ouvir Where is..., espere um lugar.'), task('Se ouvir It is..., espere a localização.'), task('Se ouvir next to, procure outro lugar como referência.')],
    guidedBeforeQuiz: [task('Primeira escuta: qual lugar a pessoa procura?'), task('Segunda escuta: onde fica esse lugar?')],
    listeningPreparation: [task('Não use transcript na primeira escuta.'), task('Prepare: pharmacy, supermarket, bank, school, near, next to.'), task('Objetivo: lugar + localização.')],
    keyWordsToHear: [vocab('excuse me', 'com licença'), vocab('where', 'onde'), vocab('pharmacy', 'farmácia'), vocab('next to', 'ao lado de'), vocab('on Main Street', 'na Rua Main')],
    audioScript: `Visitor: Excuse me. Where is the pharmacy?
Local: The pharmacy is on Main Street.
Visitor: Is it near the supermarket?
Local: Yes. It is next to the supermarket.
Visitor: Thank you.
Local: You’re welcome.`,
    firstListenTasks: [task('Sem transcript: qual lugar o visitante procura?', 'the pharmacy'), task('Sem transcript: a conversa é sobre comida, localização ou família?', 'localização')],
    secondListenTasks: [task('Em qual rua fica a pharmacy?', 'on Main Street'), task('Ela fica perto do supermarket?', 'yes'), task('Ela fica next to qual lugar?', 'the supermarket')],
    transcript: `Visitor: Excuse me. Where is the pharmacy?
Local: The pharmacy is on Main Street.
Visitor: Is it near the supermarket?
Local: Yes. It is next to the supermarket.
Visitor: Thank you.
Local: You’re welcome.`,
    vocabulary: [vocab('visitor', 'visitante'), vocab('local', 'morador/local'), vocab('you’re welcome', 'de nada'), vocab('near', 'perto'), vocab('next to', 'ao lado de')],
    shadowing: [task('Excuse me. Where is the pharmacy?'), task('The pharmacy is on Main Street.'), task('Is it near the supermarket?'), task('It is next to the supermarket.'), task('You’re welcome.')],
    dictationTasks: [task('Complete: Where is the ___?', 'pharmacy'), task('Complete: It is on Main ___.', 'Street'), task('Complete: Is it near the ___?', 'supermarket'), task('Complete: It is next ___ the supermarket.', 'to')],
    pronunciationChunks: [task('Excuse me', 'Frase curta e educada.'), task('Where is the', 'Soa como bloco.'), task('next to the', 'Ligue next-to-the devagar.')],
    listeningComprehension: [q('Áudio da aula — Asking where something is — what place does the visitor need?', 'the pharmacy', 'Where is the pharmacy?', '', ['the pharmacy','the school','the bank']), q('Where is the pharmacy?', 'on Main Street', 'The pharmacy is on Main Street.', '', ['on Main Street','near the school','at the park']), q('What is the pharmacy next to?', 'the supermarket', 'It is next to the supermarket.', '', ['the supermarket','the café','the hotel'])],
    oralProduction: task('Responda oralmente: Where is the pharmacy? Use on/near/next to.'),
    selfAssessment: [task('Consegui identificar o lugar procurado?'), task('Consegui ouvir on Main Street?'), task('Consegui repetir a pergunta principal?')],
    lessonRecap: ['Em localização, ouça primeiro o lugar.', 'Depois ouça a pista: on, near, next to.', 'Excuse me abre pergunta educada.', 'Shadowing ajuda a automatizar Where is...?'],
    nextLessonBridge: 'No Speaking, você vai perguntar onde fica um lugar e responder com localização simples.',
  }),

  createSpeakingLesson({
    ...common,
    id: 'A1-SPEAKING-014',
    order: 14,
    title: 'Ask where something is',
    objectives: ['Perguntar onde fica um lugar.', 'Responder com localização simples.', 'Usar near, next to e on em fala.', 'Gravar um mini diálogo de localização.'],
    teacherOpening: 'Nesta aula, você vai falar uma situação real: perguntar onde fica um lugar. A estrutura é curta e poderosa: Excuse me. Where is the pharmacy? It is next to the supermarket. Thank you. Você vai repetir, substituir e depois gravar seu próprio diálogo.',
    whyItMatters: 'Perguntar localização é inglês de sobrevivência. Você não precisa de frases longas para resolver a situação; precisa de clareza, vocabulário de lugares e preposições simples.',
    realLifeUseCases: ['Perguntar onde fica farmácia.', 'Responder onde fica um café.', 'Usar mapa simples.', 'Dar referência com perto/ao lado.', 'Treinar diálogo curto de rua.'],
    conceptExplanation: 'Use Excuse me para começar com educação. Pergunte Where is the...? Responda It is near..., It is next to..., It is on... Depois agradeça. Troque o lugar para praticar: pharmacy, bank, café, bus stop.',
    mentalModel: { title: 'Pergunta + localização + agradecimento', summary: 'Um diálogo funcional pode ter só 4 linhas.' },
    stepByStep: [task('Comece com Excuse me.'), task('Pergunte Where is the + place?'), task('Responda com It is...'), task('Use near/next to/on.'), task('Feche com Thank you / You’re welcome.')],
    portugueseContrast: [task('Não traduza “onde tem farmácia?” literalmente.'), task('Use Where is the pharmacy?'), task('Para rua, use on: on Main Street.'), task('Next to precisa de uma referência.')],
    guidedDiscovery: [task('Where is the bank? pede localização.'), task('It is next to the school. dá referência.'), task('Excuse me deixa a abordagem educada.')],
    guidedBeforeQuiz: [task('Repita: Excuse me.'), task('Repita: Where is the pharmacy?'), task('Repita: It is next to the supermarket.'), task('Repita: Thank you.')],
    speakingSituation: 'Você está na cidade e precisa perguntar onde fica uma farmácia, banco ou ponto de ônibus.',
    modelPhrases: [phrase('Excuse me.', 'Com licença.'), phrase('Where is the pharmacy?', 'Onde fica a farmácia?'), phrase('Where is the bus stop?', 'Onde fica o ponto de ônibus?'), phrase('It is near the school.', 'Fica perto da escola.'), phrase('It is next to the bank.', 'Fica ao lado do banco.'), phrase('It is on Main Street.', 'Fica na Rua Main.')],
    pronunciationChunks: [task('Excuse me', 'Use entonação educada.'), task('Where is the', 'Pratique como bloco.'), task('next to the', 'Não separe demais as palavras.')],
    repeatAfterMe: [task('Excuse me. Where is the pharmacy?'), task('It is near the supermarket.'), task('Where is the bus stop?'), task('It is next to the park.'), task('Thank you. You’re welcome.')],
    substitutionDrills: [task('pharmacy → bank', 'Where is the bank?'), task('bank → bus stop', 'Where is the bus stop?'), task('near the supermarket → next to the school', 'It is next to the school.'), task('on Main Street → on King Street', 'It is on King Street.')],
    guidedSpeaking: [task('Pergunte onde fica a farmácia.', 'Where is the pharmacy?'), task('Responda: perto do supermercado.', 'It is near the supermarket.'), task('Pergunte onde fica o ponto de ônibus.', 'Where is the bus stop?'), task('Responda: ao lado do parque.', 'It is next to the park.')],
    recordingTasks: [task('Grave 3 perguntas com Where is the...?'), task('Grave 3 respostas com near/next to/on.'), task('Grave um diálogo completo de 4 linhas.')],
    freeSpeaking: task('Crie um mini diálogo usando pharmacy, supermarket e bus stop.'),
    feedbackChecklist: [task('Comecei com Excuse me?'), task('Usei Where is the...?'), task('Usei near, next to ou on?'), task('Falei frases curtas?'), task('Fechei com thank you?')],
    selfAssessment: [task('Consigo perguntar onde fica um lugar?'), task('Consigo responder com referência?'), task('Consigo gravar diálogo curto?')],
    lessonRecap: ['Where is the...? pergunta localização.', 'It is near/next to/on responde localização.', 'Excuse me e thank you deixam o diálogo natural.', 'Substituição ajuda fluência.'],
    nextLessonBridge: 'Na Writing, você vai transformar perguntas e respostas de localização em uma mensagem curta.',
  }),

  createWritingLesson({
    ...common,
    id: 'A1-WRITING-012',
    order: 12,
    title: 'Write questions and answers',
    objectives: ['Escrever perguntas simples com Where is the...?', 'Responder com localização curta.', 'Usar near, next to e on por escrito.', 'Revisar maiúscula, interrogação e ponto final.'],
    teacherOpening: 'Agora você vai escrever perguntas e respostas de localização. O objetivo é ser claro e correto: Where is the pharmacy? It is next to the supermarket. No A1, escrita boa é escrita simples, pontuada e útil.',
    whyItMatters: 'Perguntas e respostas curtas aparecem em mensagens, chats, exercícios, mapas e atendimentos. Escrever isso bem ajuda Reading, Speaking e Listening, porque você fixa a estrutura visual da frase.',
    realLifeUseCases: ['Escrever pergunta em chat.', 'Responder onde fica um lugar.', 'Criar mini diálogo.', 'Anotar direções simples.', 'Praticar pontuação inglesa.'],
    conceptExplanation: 'Perguntas com where precisam de interrogação: Where is the bank? Respostas usam ponto final: It is near the school. Use letra maiúscula no início. Use the antes do lugar quando for específico: the pharmacy, the bank, the bus stop.',
    mentalModel: { title: 'Question mark + full stop', summary: 'Pergunta termina com ?; resposta termina com ponto.', steps: ['Where is the pharmacy?', 'It is next to the supermarket.', 'Where is the bank?', 'It is on Main Street.'] },
    stepByStep: [task('Comece a pergunta com Where.'), task('Use is the + place.'), task('Termine com ?'), task('Comece a resposta com It is.'), task('Use near/next to/on.'), task('Termine com ponto final.')],
    portugueseContrast: [task('Em inglês, a ordem da pergunta é fixa: Where is the...?'), task('Não escreva Where the pharmacy is? no A1.'), task('Use ? no fim da pergunta.'), task('Use It is, não apenas Is.')],
    guidedDiscovery: [task('Qual frase é pergunta?', 'Where is the pharmacy?'), task('Qual pontuação termina pergunta?', '? (question mark) indica pergunta em inglês.'), task('Qual frase responde?', 'It is near the school.')],
    guidedBeforeQuiz: [task('Where is the bank?'), task('It is on Main Street.'), task('Where is the bus stop?'), task('It is next to the park.')],
    writingPurpose: 'Escrever perguntas e respostas simples sobre lugares.',
    modelText: `Where is the pharmacy?
It is next to the supermarket.

Where is the bus stop?
It is in front of the park.`,
    writingBlocks: [task('Question', 'Where is the pharmacy?'), task('Answer', 'It is next to the supermarket.'), task('Question', 'Where is the bus stop?'), task('Answer', 'It is in front of the park.')],
    guidedSubstitution: [task('Troque pharmacy por bank.', 'Where is the bank?'), task('Troque next to the supermarket por near the school.', 'It is near the school.'), task('Troque bus stop por café.', 'Where is the café?')],
    grammarForWriting: [task('Where começa com letra maiúscula.'), task('Pergunta termina com ?'), task('Resposta começa com It is.'), task('Resposta termina com ponto final.'), task('Use the antes de lugares específicos.')],
    checklist: [task('Minhas perguntas começam com Where?'), task('Usei ? no fim das perguntas?'), task('Minhas respostas começam com It is?'), task('Usei near/next to/on corretamente?'), task('Usei ponto final nas respostas?')],
    draftTask: task('Escreva 4 perguntas e respostas sobre lugares da cidade.'),
    revisionTask: task('Revise pontuação: perguntas com ? e respostas com ponto final.'),
    commonMistakes: [mistake('Where the pharmacy is?', 'Where is the pharmacy?', 'Ordem correta no A1.'), mistake('It next to supermarket.', 'It is next to the supermarket.', 'Precisa de is e the.'), mistake('where is the bank', 'Where is the bank?', 'Maiúscula e interrogação.')],
    productionTasks: [task('Escreva um mini diálogo de localização com 6 linhas.'), task('Crie 3 perguntas com Where is the...?'), task('Crie 3 respostas com near/next to/on.')],
    selfAssessment: [task('Consigo escrever pergunta com Where is?'), task('Consigo responder com It is?'), task('Consigo revisar pontuação?')],
    lessonRecap: ['Where is the...? é a pergunta-base de localização.', 'It is... responde.', 'Perguntas usam ?; respostas usam ponto final.', 'Near, next to e on dão localização.'],
    nextLessonBridge: 'No próximo bloco A1.4, você vai expandir para casa, móveis e descrição de cômodos.',
  }),
]);

export const A1_DEEP_PRACTICAL_SITUATIONS_PLACES_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_PLACES.filter((lesson) => lesson.pillar === 'grammar')),
  vocabulary: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_PLACES.filter((lesson) => lesson.pillar === 'vocabulary')),
  reading: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_PLACES.filter((lesson) => lesson.pillar === 'reading')),
  listening: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_PLACES.filter((lesson) => lesson.pillar === 'listening')),
  speaking: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_PLACES.filter((lesson) => lesson.pillar === 'speaking')),
  writing: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_PLACES.filter((lesson) => lesson.pillar === 'writing')),
});
