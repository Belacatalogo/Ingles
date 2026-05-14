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
  tags: ['a1-4', 'practical-situations', 'house-room-furniture', 'deep-approved-target'],
};

export const A1_DEEP_PRACTICAL_SITUATIONS_HOUSE = Object.freeze([
  createGrammarLesson({
    ...common,
    id: 'A1-GRAMMAR-010-HOUSE',
    order: 10.1,
    title: 'There is / there are — house description',
    objectives: ['Usar there is e there are para descrever casa e quarto.', 'Diferenciar singular e plural em descrições.', 'Fazer perguntas simples com Is there...? / Are there...?', 'Evitar erros comuns como have a bed in my room quando o foco é existência.'],
    teacherOpening: 'Você já viu there is / there are no pacote de descrição. Agora vamos aplicar essa estrutura em uma situação prática: descrever sua casa ou quarto. Em inglês, quando você quer dizer que existe algo em um lugar, there is / there are é o caminho natural: There is a bed in my room. There are two chairs in the kitchen.',
    whyItMatters: 'Descrever casa e quarto aparece em conversas, textos, mensagens, viagens, aluguel, hotéis e apresentações pessoais. Essa estrutura também prepara você para falar de objetos, localização e rotina dentro de casa.',
    realLifeUseCases: ['Descrever seu quarto.', 'Falar o que existe na cozinha.', 'Perguntar se há banheiro ou Wi-Fi.', 'Entender anúncio simples de quarto/casa.', 'Escrever uma descrição curta da casa.'],
    conceptExplanation: 'Use there is para singular: There is a bed. Use there are para plural: There are two chairs. Para negativa, use there isn’t / there aren’t. Para perguntas, inverta: Is there a bathroom? Are there two bedrooms? Depois, adicione lugar: in my room, in the kitchen, next to the door.',
    mentalModel: { title: 'Existe algo em algum lugar', summary: 'there is/are + coisa + lugar.', steps: ['There is a bed in my room.', 'There are two chairs in the kitchen.', 'Is there a bathroom?', 'There isn’t a TV.'] },
    stepByStep: [task('Decida se é singular ou plural.'), task('Use there is para singular.'), task('Use there are para plural.'), task('Adicione o lugar com in/on/next to.'), task('Use Is there...? para pergunta singular.'), task('Use Are there...? para pergunta plural.')],
    portugueseContrast: [task('Português usa “tem” para tudo; inglês separa have e there is/are.'), task('Para existência em lugar, prefira there is/are.', 'Tem uma cama no quarto → There is a bed in the room.'), task('Não diga “has a bed in my room”.'), task('There are exige plural depois.')],
    guidedDiscovery: [task('Em “There is a bed”, bed é singular.'), task('Em “There are two chairs”, chairs é plural.'), task('Em “Is there a bathroom?”, a pergunta começa com Is there.')],
    guidedBeforeQuiz: [task('Complete: There ___ a bed in my room.', 'is'), task('Complete: There ___ two chairs in the kitchen.', 'are'), task('Pergunta: ___ there a bathroom?', 'Is'), task('Negativa: There ___ a TV.', 'isn’t')],
    grammarGoal: 'Descrever casa/quarto usando there is/there are com precisão A1.',
    formationGuide: [task('Singular: There is + a/an + noun', 'There is a sofa.'), task('Plural: There are + number/plural noun', 'There are two chairs.'), task('Question singular: Is there + noun?', 'Is there a bathroom?'), task('Question plural: Are there + plural noun?', 'Are there two bedrooms?')],
    whenToUse: [task('Para dizer que existe algo em um lugar.'), task('Para descrever cômodos.'), task('Para perguntar se há algo.'), task('Para descrever anúncios simples.')],
    whenNotToUse: [task('Não use para posse pessoal direta.', 'I have a bed pode ser posse; There is a bed descreve existência no quarto.'), task('Não use there are com singular.'), task('Não use there is com plural.')],
    grammarTable: [
      { pattern: 'There is + singular', example: 'There is a bed in my room.', translation: 'Tem uma cama no meu quarto.' },
      { pattern: 'There are + plural', example: 'There are two chairs in the kitchen.', translation: 'Tem duas cadeiras na cozinha.' },
      { pattern: 'Is there + singular?', example: 'Is there a bathroom?', translation: 'Tem banheiro?' },
      { pattern: 'There isn’t + singular', example: 'There isn’t a TV.', translation: 'Não tem TV.' }
    ],
    teacherExamples: [
      { english: 'There is a sofa in the living room.', translation: 'Tem um sofá na sala.', why: 'Singular com there is.' },
      { english: 'There are three chairs in the kitchen.', translation: 'Tem três cadeiras na cozinha.', why: 'Plural com there are.' },
      { english: 'Is there a desk in your room?', translation: 'Tem uma mesa no seu quarto?', why: 'Pergunta singular.' },
      { english: 'There aren’t two bathrooms.', translation: 'Não há dois banheiros.', why: 'Negativa plural.' }
    ],
    commonBrazilianMistakes: [mistake('Have a bed in my room.', 'There is a bed in my room.', 'Para existência em lugar, use there is/are.'), mistake('There is two chairs.', 'There are two chairs.', 'Plural pede there are.'), mistake('There are a sofa.', 'There is a sofa.', 'Singular pede there is.'), mistake('Is there two bedrooms?', 'Are there two bedrooms?', 'Pergunta plural usa Are there.')],
    controlledPractice: [task('Complete: There ___ a table.', 'is'), task('Complete: There ___ two windows.', 'are'), task('Complete: ___ there a bed?', 'Is'), task('Complete: ___ there three chairs?', 'Are')],
    errorCorrectionPractice: [task('Corrija: There is two bedrooms.', 'There are two bedrooms.'), task('Corrija: There are a bathroom.', 'There is a bathroom.'), task('Corrija: Has a sofa in the living room.', 'There is a sofa in the living room.')],
    transformationPractice: [task('Transforme em pergunta: There is a TV.', 'Is there a TV?'), task('Transforme em negativa: There are two chairs.', 'There aren’t two chairs.'), task('Monte: bed / there / a / is', 'There is a bed.')],
    translationPractice: [task('Tem uma cama no quarto.', 'There is a bed in the room.'), task('Tem duas cadeiras na cozinha.', 'There are two chairs in the kitchen.'), task('Tem banheiro?', 'Is there a bathroom?')],
    productionTasks: [task('Descreva seu quarto com 5 frases usando there is/there are.'), task('Escreva 3 perguntas sobre uma casa.'), task('Escreva 3 frases negativas sobre o que não há no seu quarto.')],
    finalChecklist: [task('Usei there is com singular?'), task('Usei there are com plural?'), task('Usei Is there/Are there em perguntas?'), task('Evitei has a... para existência?')],
    selfAssessment: [task('Consigo descrever meu quarto?'), task('Consigo perguntar se há algo?'), task('Consigo corrigir there is/there are?')],
    lessonRecap: ['There is descreve singular.', 'There are descreve plural.', 'Is there...? pergunta singular.', 'Are there...? pergunta plural.', 'Para casa/quarto, essa estrutura é essencial.'],
    nextLessonBridge: 'Agora você vai aprender vocabulário de cômodos e móveis para descrever sua casa com mais detalhes.',
  }),

  createVocabularyLesson({
    ...common,
    id: 'A1-VOCABULARY-015',
    order: 15,
    title: 'House and furniture',
    objectives: ['Aprender cômodos e móveis essenciais.', 'Descrever casa e quarto com there is/there are.', 'Usar preposições simples com móveis.', 'Produzir frases úteis sobre casa.'],
    teacherOpening: 'House and furniture é vocabulário que você usa para falar de onde mora, descrever seu quarto e entender anúncios ou conversas simples. O objetivo é aprender as palavras dentro de frases: There is a bed in my bedroom. The sofa is in the living room. There are two chairs in the kitchen.',
    whyItMatters: 'Casa e móveis conectam gramática, vocabulário, reading, speaking e writing. Você consegue descrever sua realidade, entender descrições e falar de localização de objetos.',
    realLifeUseCases: ['Descrever seu quarto.', 'Falar da sua casa.', 'Entender anúncio simples de hospedagem.', 'Perguntar se há banheiro ou cozinha.', 'Escrever descrição curta de casa.'],
    conceptExplanation: 'Room pode ser quarto ou cômodo, dependendo do contexto. Bedroom é quarto de dormir. Living room é sala. Kitchen é cozinha. Bathroom é banheiro. Furniture são móveis em geral. Para falar de existência, use there is/there are. Para localização, use in, on, next to, under.',
    mentalModel: { title: 'Cômodo + móvel + posição', summary: 'Aprenda palavra dentro de frase.', steps: ['bedroom → There is a bed in my bedroom.', 'kitchen → There are chairs in the kitchen.', 'living room → The sofa is in the living room.'] },
    stepByStep: [task('Separe rooms e furniture.'), task('Aprenda cada palavra com uma frase.'), task('Use there is/there are para existência.'), task('Use in/on/next to para localização.'), task('Descreva seu quarto real.')],
    portugueseContrast: [task('Room não é sempre quarto; pode ser cômodo.'), task('Bedroom é quarto de dormir.'), task('Kitchen não é chicken.'), task('Furniture normalmente não vai para plural com s no A1.')],
    guidedDiscovery: [task('Qual palavra é cômodo: kitchen ou chair?', 'kitchen'), task('Qual palavra é móvel: bed ou bathroom?', 'bed'), task('Qual frase descreve existência?', 'There is a bed.')],
    guidedBeforeQuiz: [task('There is a bed in my bedroom.'), task('There are two chairs in the kitchen.'), task('The sofa is in the living room.'), task('Is there a bathroom?')],
    topicContext: 'Você vai descrever uma casa simples e seu quarto usando palavras de cômodos, móveis e localização.',
    essentialWords: [vocab('house', 'casa', 'My house is small.'), vocab('apartment', 'apartamento', 'I live in an apartment.'), vocab('room', 'cômodo/quarto', 'This room is small.'), vocab('bedroom', 'quarto de dormir', 'There is a bed in my bedroom.'), vocab('living room', 'sala', 'The sofa is in the living room.'), vocab('kitchen', 'cozinha', 'There are chairs in the kitchen.'), vocab('bathroom', 'banheiro', 'Is there a bathroom?'), vocab('bed', 'cama', 'There is a bed.'), vocab('sofa', 'sofá', 'The sofa is big.'), vocab('table', 'mesa', 'There is a table.'), vocab('chair', 'cadeira', 'There are two chairs.'), vocab('desk', 'mesa de estudo', 'My desk is next to the bed.'), vocab('door', 'porta', 'The door is white.'), vocab('window', 'janela', 'There is a window.'), vocab('lamp', 'lâmpada/abajur', 'The lamp is on the desk.'), vocab('TV', 'televisão', 'There isn’t a TV in my room.'), vocab('wardrobe', 'guarda-roupa', 'The wardrobe is next to the door.'), vocab('mirror', 'espelho', 'There is a mirror in the bathroom.')],
    chunks: [{ chunk: 'There is a bed in my room.', translation: 'Tem uma cama no meu quarto.', example: 'There is a bed in my room.' }, { chunk: 'There are two chairs in the kitchen.', translation: 'Tem duas cadeiras na cozinha.', example: 'There are two chairs in the kitchen.' }, { chunk: 'The sofa is in the living room.', translation: 'O sofá fica na sala.', example: 'The sofa is in the living room.' }, { chunk: 'Is there a bathroom?', translation: 'Tem banheiro?', example: 'Is there a bathroom?' }, { chunk: 'My room is small but comfortable.', translation: 'Meu quarto é pequeno, mas confortável.', example: 'My room is small but comfortable.' }],
    pronunciationFocus: { title: 'Foco sonoro', tips: ['Kitchen começa com som de /k/, diferente de chicken.', 'Bedroom tem duas partes: bed + room.', 'Furniture tem som reduzido no meio e não precisa de plural comum no A1.'] },
    dangerousConfusions: [task('Kitchen ≠ chicken.'), task('Room pode ser cômodo; bedroom é quarto de dormir.'), task('Desk é mesa de estudo/trabalho; table é mesa geral.'), task('Furniture é coletivo; evite furnitures no A1.')],
    collocations: [task('in the bedroom'), task('in the kitchen'), task('on the desk'), task('next to the bed'), task('a small room'), task('a comfortable house')],
    miniDialogues: [dialogue('Describing a room', ['A: Is your room big?', 'B: No, it is small.', 'A: Is there a desk?', 'B: Yes. There is a desk next to the bed.', 'A: Is there a TV?', 'B: No, there isn’t.'], 'Perguntas e respostas sobre quarto.')],
    examples: [ex('There is a bed in my bedroom.', 'Tem uma cama no meu quarto.', 'Existência + cômodo.'), ex('The lamp is on the desk.', 'A lâmpada está na mesa.', 'Localização com on.'), ex('There are two chairs in the kitchen.', 'Tem duas cadeiras na cozinha.', 'Plural com there are.'), ex('My room is small but comfortable.', 'Meu quarto é pequeno, mas confortável.', 'Descrição simples.'), ex('Is there a mirror in the bathroom?', 'Tem espelho no banheiro?', 'Pergunta útil.')],
    recognitionPractice: [task('Qual é cômodo: bathroom / chair / table?', 'bathroom'), task('Qual é móvel: sofa / kitchen / bedroom?', 'sofa'), task('Qual é mesa de estudo?', 'desk'), task('Qual frase usa plural?', 'There are two chairs.')],
    usagePractice: [task('Complete: There is a bed in my ___.', 'bedroom'), task('Complete: The sofa is in the ___ room.', 'living'), task('Complete: The lamp is ___ the desk.', 'on'), task('Complete: There ___ two chairs.', 'are')],
    productionTasks: [task('Liste 5 rooms e 5 furniture items.'), task('Escreva 6 frases sobre seu quarto.'), task('Crie um mini diálogo perguntando sobre um quarto.')],
    spacedReview: [task('Revise bedroom, kitchen, bathroom amanhã.'), task('Revise desk/table e room/bedroom em frases.')],
    selfAssessment: [task('Consigo nomear cômodos?'), task('Consigo nomear móveis?'), task('Consigo descrever meu quarto com there is/are?')],
    lessonRecap: ['Rooms são cômodos; furniture são móveis.', 'Bedroom é quarto de dormir.', 'Use there is/there are para existência.', 'Use in/on/next to para localização.'],
    nextLessonBridge: 'Na Reading, você vai ler uma descrição curta de casa e responder com evidência.',
  }),

  createReadingLesson({
    ...common,
    id: 'A1-READING-010',
    order: 10,
    title: 'A description of a house',
    objectives: ['Ler uma descrição simples de casa.', 'Identificar cômodos, móveis e localização.', 'Responder perguntas com evidência textual.', 'Usar there is/there are em contexto.'],
    teacherOpening: 'Nesta leitura, você vai ler uma descrição curta de casa. O foco é encontrar cômodos, móveis e frases com there is/there are. Você vai praticar evidência: responder usando exatamente o que o texto diz.',
    whyItMatters: 'Descrições de casa aparecem em mensagens, anúncios, viagens, hospedagem e apresentações pessoais. Elas também ajudam você a escrever e falar sobre sua própria casa.',
    realLifeUseCases: ['Ler anúncio de quarto/casa.', 'Entender descrição de apartamento.', 'Responder sobre cômodos.', 'Comparar casas simples.', 'Usar modelo para escrever sobre sua casa.'],
    conceptExplanation: 'Textos de descrição normalmente falam do tamanho, cômodos e objetos. Procure palavras como bedroom, kitchen, bathroom, living room, bed, sofa, table. Depois procure there is/there are para saber o que existe em cada lugar.',
    mentalModel: { title: 'Casa → cômodos → objetos', summary: 'Primeiro entenda a casa; depois os detalhes.', steps: ['Find rooms.', 'Find furniture.', 'Find there is/are.', 'Use evidence.'] },
    stepByStep: [task('Leia para entender se a casa é pequena ou grande.'), task('Marque os rooms.'), task('Marque os furniture items.'), task('Procure there is/there are.'), task('Responda com evidência textual.')],
    portugueseContrast: [task('Small but comfortable = pequeno, mas confortável.'), task('There is/are muitas vezes traduz como “tem”.'), task('Living room é sala, não quarto.')],
    guidedDiscovery: [task('Qual frase descreve tamanho?', 'My apartment is small but comfortable.'), task('Qual palavra indica sala?', 'living room'), task('Qual estrutura indica existência?', 'there is/there are')],
    guidedBeforeQuiz: [task('Procure bedrooms e bathroom.'), task('Procure bed, desk e sofa.'), task('Procure frases com there is/there are.')],
    readingPurpose: 'Ler descrição de casa e localizar informações com evidência.',
    preReadingVocabulary: [vocab('apartment', 'apartamento'), vocab('comfortable', 'confortável'), vocab('bedroom', 'quarto'), vocab('living room', 'sala'), vocab('desk', 'mesa de estudo'), vocab('window', 'janela')],
    readingStrategy: [task('Use scanning para achar cômodos.'), task('Use evidence: copie a frase do texto.'), task('Não invente itens não citados.'), task('Observe singular/plural com there is/are.')],
    mainText: `My apartment is small, but it is comfortable. There is one bedroom, one bathroom, a kitchen, and a living room. In my bedroom, there is a bed, a desk, and a small lamp. There isn’t a TV in my bedroom. In the living room, there is a sofa and a small table. There are two chairs in the kitchen. My favorite place is my bedroom because it is quiet.`,
    firstReadTask: task('Qual é o assunto geral do texto?', 'A descrição de um apartamento.', 'apartment/house description'),
    secondReadTasks: [task('Quantos bedrooms há?', 'one bedroom'), task('O que há no bedroom?', 'a bed, a desk, and a small lamp'), task('Há TV no bedroom?', 'No, there isn’t.')],
    evidenceQuestions: [q('Is the apartment big?', 'No, it is small.', 'My apartment is small, but it is comfortable.', 'A frase diz small.', ['No, it is small.','Yes, it is big.','It is new.']), q('How many bedrooms are there?', 'one bedroom', 'There is one bedroom...', 'There is one bedroom dá a resposta.', ['one','two','three']), q('What is in the bedroom?', 'a bed, a desk, and a small lamp', 'In my bedroom, there is a bed, a desk, and a small lamp.', 'A frase lista os itens.', ['a bed, a desk, and a lamp','a sofa and chairs','a TV and table']), q('Is there a TV in the bedroom?', 'No, there isn’t.', 'There isn’t a TV in my bedroom.', 'Negativa explícita.', ['No, there isn’t.','Yes, there is.','The text doesn’t say.']), q('Where are the two chairs?', 'in the kitchen', 'There are two chairs in the kitchen.', 'A frase localiza as cadeiras.', ['in the kitchen','in the bedroom','in the bathroom'])],
    contextVocabularyTasks: [task('Comfortable descreve a sensação do apartamento.'), task('Quiet explica por que o bedroom é favorito.'), task('Small table é mesa pequena.')],
    guidedSummary: task('Complete: The apartment is ___. There is one ___. In the bedroom, there is a ___, a ___, and a ___.', '', 'small / bedroom / bed / desk / lamp'),
    connectedProduction: task('Escreva 5 frases sobre sua casa usando there is/there are.'),
    selfAssessment: [task('Consigo encontrar cômodos no texto?'), task('Consigo responder com evidência?'), task('Consigo identificar there is/there are?')],
    lessonRecap: ['Descrição de casa mostra cômodos e objetos.', 'There is/are indica o que existe.', 'Evidence evita respostas inventadas.', 'O texto vira modelo para sua própria escrita.'],
    nextLessonBridge: 'No Listening, você vai ouvir alguém descrevendo o próprio quarto.',
  }),

  createListeningLesson({
    ...common,
    id: 'A1-LISTENING-012',
    order: 12,
    title: 'Short conversations about a room',
    objectives: ['Ouvir descrição curta de quarto.', 'Identificar móveis principais.', 'Reconhecer there is/there are em fala.', 'Praticar shadowing de descrição simples.'],
    teacherOpening: 'Agora você vai ouvir uma conversa sobre um quarto. Primeiro, escute o tema geral. Depois, procure os objetos: bed, desk, lamp, TV. Na terceira etapa, confira com transcript e repita as frases principais.',
    whyItMatters: 'Descrições de quarto são comuns e ajudam você a falar da sua própria vida. Elas também treinam listening de palavras concretas e estruturas simples.',
    realLifeUseCases: ['Falar do próprio quarto.', 'Entender descrição de hospedagem.', 'Perguntar se há TV ou mesa.', 'Descrever ambiente de estudo.', 'Repetir frases com there is/are.'],
    conceptExplanation: 'Ouça por there is/there are e depois pelo objeto. Em fala real, there is pode soar como there’s. There’s a bed. There are two chairs. No A1, reconheça o bloco antes de tentar traduzir tudo.',
    mentalModel: { title: 'there’s + objeto + lugar', summary: 'Ouça existência e depois objeto.', steps: ['There’s a bed.', 'There’s a desk.', 'There isn’t a TV.', 'There are two chairs.'] },
    stepByStep: [task('Primeira escuta: identifique o cômodo.'), task('Segunda escuta: anote os objetos.'), task('Confira se há TV.'), task('Leia o transcript.'), task('Repita as frases principais.')],
    portugueseContrast: [task('There’s é contração de there is.'), task('There isn’t = não tem.'), task('Quiet = quieto/silencioso, não “quite”.')],
    guidedDiscovery: [task('Se ouvir there’s, espere um item singular.'), task('Se ouvir there isn’t, espere algo que não existe no quarto.'), task('Se ouvir my favorite place, espere preferência.')],
    guidedBeforeQuiz: [task('Primeira escuta: qual cômodo?'), task('Segunda escuta: quais objetos?'), task('Terceira etapa: há TV?')],
    listeningPreparation: [task('Não leia o transcript antes da primeira escuta.'), task('Prepare: room, bed, desk, lamp, TV, quiet.'), task('Objetivo: identificar itens no quarto.')],
    keyWordsToHear: [vocab('room', 'quarto/cômodo'), vocab('bed', 'cama'), vocab('desk', 'mesa de estudo'), vocab('lamp', 'lâmpada'), vocab('TV', 'televisão'), vocab('quiet', 'silencioso')],
    audioScript: `A: Is your room big?
B: No, it is small, but it is comfortable.
A: Is there a desk?
B: Yes. There is a desk next to the bed.
A: Is there a TV?
B: No, there isn’t. There is a small lamp on the desk.
A: Nice. Is your room quiet?
B: Yes. It is my favorite place.`,
    firstListenTasks: [task('Sem transcript: a conversa é sobre casa, comida ou trabalho?', 'casa/quarto'), task('Sem transcript: o quarto é grande ou pequeno?', 'small')],
    secondListenTasks: [task('Há desk no quarto?', 'yes'), task('Onde fica o desk?', 'next to the bed'), task('Há TV?', 'No, there isn’t.'), task('O que há on the desk?', 'a small lamp')],
    transcript: `A: Is your room big?
B: No, it is small, but it is comfortable.
A: Is there a desk?
B: Yes. There is a desk next to the bed.
A: Is there a TV?
B: No, there isn’t. There is a small lamp on the desk.
A: Nice. Is your room quiet?
B: Yes. It is my favorite place.`,
    vocabulary: [vocab('comfortable', 'confortável'), vocab('next to', 'ao lado de'), vocab('on the desk', 'na mesa'), vocab('favorite place', 'lugar favorito'), vocab('nice', 'legal/bacana')],
    shadowing: [task('It is small, but it is comfortable.'), task('Is there a desk?'), task('There is a desk next to the bed.'), task('No, there isn’t.'), task('There is a small lamp on the desk.')],
    dictationTasks: [task('Complete: Is there a ___?', 'desk'), task('Complete: next to the ___.', 'bed'), task('Complete: There is a small ___ on the desk.', 'lamp'), task('Complete: It is my favorite ___.', 'place')],
    pronunciationChunks: [task('Is there a', 'Treine como bloco.'), task('There is a', 'Pode soar there’s a.'), task('next to the', 'Ligue as palavras devagar.')],
    listeningComprehension: [q('Is the room big?', 'No, it is small.', 'No, it is small, but it is comfortable.', '', ['No, it is small.','Yes, it is big.','It is new.']), q('Where is the desk?', 'next to the bed', 'There is a desk next to the bed.', '', ['next to the bed','under the table','in the kitchen']), q('Is there a TV?', 'No, there isn’t.', 'No, there isn’t.', '', ['No, there isn’t.','Yes, there is.','The text says two TVs.'])],
    oralProduction: task('Descreva seu quarto oralmente usando there is/there are.'),
    selfAssessment: [task('Consegui identificar bed/desk/lamp?'), task('Consegui ouvir there is/there isn’t?'), task('Consigo repetir a descrição?')],
    lessonRecap: ['Listening de quarto foca objetos concretos.', 'There’s pode significar there is.', 'Next to e on ajudam localização.', 'Transcript confirma o que você ouviu.'],
    nextLessonBridge: 'No Speaking, você vai descrever seu próprio quarto com frases curtas.',
  }),

  createSpeakingLesson({
    ...common,
    id: 'A1-SPEAKING-015',
    order: 15,
    title: 'Describe your room',
    objectives: ['Descrever o próprio quarto em frases curtas.', 'Usar there is/there are oralmente.', 'Usar móveis e localização básica.', 'Gravar descrição de 30 segundos.'],
    teacherOpening: 'Nesta aula, você vai falar sobre seu quarto. O segredo é não tentar falar demais. Use blocos seguros: My room is small. There is a bed. There is a desk next to the bed. There isn’t a TV. It is comfortable.',
    whyItMatters: 'Descrever seu quarto é uma prática real e pessoal. Você usa vocabulário de casa, there is/are, adjetivos e localização. Isso melhora fluência porque você fala de algo conhecido.',
    realLifeUseCases: ['Falar da sua casa.', 'Descrever quarto em conversa.', 'Responder sobre onde mora.', 'Praticar apresentação pessoal.', 'Criar áudio curto de descrição.'],
    conceptExplanation: 'Organize sua fala em 4 partes: tamanho, objetos, localização e opinião. Exemplo: My room is small. There is a bed and a desk. The desk is next to the bed. My room is quiet and comfortable.',
    mentalModel: { title: 'Tamanho → objetos → posição → opinião', summary: 'Uma descrição oral A1 pode ser simples e clara.' },
    stepByStep: [task('Diga se o quarto é small/big.'), task('Diga 2 ou 3 objetos com there is/are.'), task('Localize 1 objeto com next to/on/in.'), task('Diga uma opinião: comfortable, quiet, nice.'), task('Grave e repita melhorando clareza.')],
    portugueseContrast: [task('Não traduza “tem” como have em todas as frases.'), task('Use there is/there are para existência.'), task('Frases curtas são melhores que frases longas cheias de erro.')],
    guidedDiscovery: [task('My room is small. descreve tamanho.'), task('There is a bed. descreve existência.'), task('The desk is next to the bed. descreve localização.')],
    guidedBeforeQuiz: [task('Repita: My room is small.'), task('Repita: There is a bed.'), task('Repita: There is a desk next to the bed.'), task('Repita: It is quiet and comfortable.')],
    speakingSituation: 'Você vai gravar uma descrição curta do seu quarto para alguém que nunca viu sua casa.',
    modelPhrases: [phrase('My room is small.', 'Meu quarto é pequeno.'), phrase('There is a bed in my room.', 'Tem uma cama no meu quarto.'), phrase('There is a desk next to the bed.', 'Tem uma mesa ao lado da cama.'), phrase('There isn’t a TV.', 'Não tem TV.'), phrase('My room is quiet and comfortable.', 'Meu quarto é silencioso e confortável.')],
    pronunciationChunks: [task('My room is', 'Fale como bloco.'), task('There is a', 'Pode soar there’s a.'), task('next to the bed', 'Conecte next-to-the.')],
    repeatAfterMe: [task('My room is small.'), task('There is a bed in my room.'), task('There are two chairs.'), task('The lamp is on the desk.'), task('My room is quiet.')],
    substitutionDrills: [task('small → big', 'My room is big.'), task('bed → desk', 'There is a desk.'), task('next to the bed → on the desk', 'The lamp is on the desk.'), task('TV → mirror', 'There is a mirror.')],
    guidedSpeaking: [task('Diga o tamanho do quarto.', 'My room is small/big.'), task('Diga 2 objetos.', 'There is a bed. There is a desk.'), task('Diga onde fica um objeto.', 'The desk is next to the bed.'), task('Dê uma opinião.', 'It is comfortable.')],
    recordingTasks: [task('Grave 5 frases sobre seu quarto.'), task('Grave uma descrição de 30 segundos.'), task('Grave novamente corrigindo there is/there are.')],
    freeSpeaking: task('Fale livremente por 30 segundos sobre seu quarto ou casa.'),
    feedbackChecklist: [task('Usei My room is...?'), task('Usei there is/there are?'), task('Usei pelo menos 3 palavras de furniture?'), task('Usei uma localização?'), task('Falei frases curtas e claras?')],
    selfAssessment: [task('Consigo descrever meu quarto?'), task('Consigo falar por 30 segundos?'), task('Consigo usar there is/there are oralmente?')],
    lessonRecap: ['Descrição oral pode ser curta.', 'Use tamanho, objetos, posição e opinião.', 'There is/are é essencial.', 'Gravar e repetir melhora fluência.'],
    nextLessonBridge: 'Na Writing, você vai escrever uma descrição curta da sua casa ou quarto.',
  }),

  createWritingLesson({
    ...common,
    id: 'A1-WRITING-010',
    order: 10,
    title: 'Write about your house',
    objectives: ['Escrever descrição curta de casa ou quarto.', 'Usar there is/there are corretamente.', 'Aplicar vocabulário de cômodos e móveis.', 'Revisar pontuação, singular/plural e organização.'],
    teacherOpening: 'Agora você vai escrever sobre sua casa ou quarto. No A1, uma boa descrição tem frases simples e organizadas: My apartment is small. There is one bedroom. There is a bed and a desk in my room. My room is quiet and comfortable.',
    whyItMatters: 'Escrever sobre casa é pessoal, útil e reaproveitável. Você pratica vocabulário concreto, there is/there are, adjetivos e localização. Também cria um texto que pode virar fala depois.',
    realLifeUseCases: ['Descrever sua casa em inglês.', 'Responder exercício de writing.', 'Criar apresentação pessoal.', 'Falar de hospedagem.', 'Escrever mensagem simples sobre quarto.'],
    conceptExplanation: 'Organize seu texto em começo, detalhes e opinião. Começo: My house/apartment is small. Detalhes: There is one bedroom. There are two chairs. Localização: The desk is next to the bed. Opinião: My room is comfortable.',
    mentalModel: { title: 'Descrição A1 em 4 frases', summary: 'Tamanho → cômodos → móveis → opinião.', steps: ['My apartment is small.', 'There is one bedroom.', 'There is a bed and a desk.', 'My room is comfortable.'] },
    stepByStep: [task('Escolha house ou apartment.'), task('Diga se é small/big/comfortable.'), task('Liste cômodos com there is/are.'), task('Liste móveis do quarto.'), task('Adicione uma opinião final.'), task('Revise singular/plural.')],
    portugueseContrast: [task('“Tem” em português vira there is/there are em descrição.'), task('Não use frases enormes.'), task('Use ponto final para separar ideias.'), task('There are precisa de plural.')],
    guidedDiscovery: [task('Qual frase abre o texto?', 'My apartment is small.'), task('Qual frase lista cômodos?', 'There is one bedroom.'), task('Qual frase dá opinião?', 'My room is comfortable.')],
    guidedBeforeQuiz: [task('Modelo: My apartment is small but comfortable.'), task('Modelo: There is one bedroom and one bathroom.'), task('Modelo: There is a bed in my room.'), task('Modelo: My room is quiet.')],
    writingPurpose: 'Escrever descrição curta sobre casa/quarto.',
    modelText: `My apartment is small, but it is comfortable. There is one bedroom, one bathroom, and a kitchen. In my bedroom, there is a bed and a desk. There isn’t a TV. My room is quiet and nice.`,
    writingBlocks: [task('Opening', 'My apartment is small, but it is comfortable.'), task('Rooms', 'There is one bedroom, one bathroom, and a kitchen.'), task('Furniture', 'In my bedroom, there is a bed and a desk.'), task('Negative detail', 'There isn’t a TV.'), task('Opinion', 'My room is quiet and nice.')],
    guidedSubstitution: [task('Troque apartment por house.', 'My house is small, but it is comfortable.'), task('Troque one bedroom por two bedrooms.', 'There are two bedrooms.'), task('Troque bed and desk por sofa and table.', 'There is a sofa and a table.'), task('Troque quiet por comfortable.', 'My room is comfortable.')],
    grammarForWriting: [task('Use there is para singular.'), task('Use there are para plural.'), task('Use ponto final em cada frase.'), task('Use letra maiúscula no começo.'), task('Evite repetir and demais.')],
    checklist: [task('Meu texto diz house ou apartment?'), task('Usei there is/there are?'), task('Incluí pelo menos 3 palavras de casa/móveis?'), task('Incluí uma opinião?'), task('Revisei plural e pontuação?')],
    draftTask: task('Escreva 5 a 7 frases sobre sua casa ou quarto.'),
    revisionTask: task('Revise e corrija there is/there are, plural e pontuação.'),
    commonMistakes: [mistake('My house have two rooms.', 'There are two rooms in my house.', 'Para existência, use there are.'), mistake('There is two chairs.', 'There are two chairs.', 'Plural pede are.'), mistake('my room is small', 'My room is small.', 'Comece com letra maiúscula.')],
    productionTasks: [task('Escreva sobre sua casa.'), task('Escreva uma versão só sobre seu quarto.'), task('Escreva 3 perguntas sobre uma casa usando Is there/Are there.')],
    selfAssessment: [task('Consigo escrever 5 frases sobre minha casa?'), task('Consigo revisar there is/are?'), task('Consigo usar vocabulário de casa?')],
    lessonRecap: ['Writing A1 deve ser simples e organizado.', 'Casa/quarto usa there is/there are.', 'Inclua cômodos, móveis e opinião.', 'Revisão corrige plural e pontuação.'],
    nextLessonBridge: 'No próximo bloco A1.4, você vai expandir situações práticas para roupas, clima e sentimentos.',
  }),
]);

export const A1_DEEP_PRACTICAL_SITUATIONS_HOUSE_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_HOUSE.filter((lesson) => lesson.pillar === 'grammar')),
  vocabulary: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_HOUSE.filter((lesson) => lesson.pillar === 'vocabulary')),
  reading: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_HOUSE.filter((lesson) => lesson.pillar === 'reading')),
  listening: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_HOUSE.filter((lesson) => lesson.pillar === 'listening')),
  speaking: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_HOUSE.filter((lesson) => lesson.pillar === 'speaking')),
  writing: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_HOUSE.filter((lesson) => lesson.pillar === 'writing')),
});
