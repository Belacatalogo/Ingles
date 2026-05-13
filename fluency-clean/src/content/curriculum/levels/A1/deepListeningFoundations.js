import { createListeningLesson } from '../../../schemas/index.js';

const level = 'A1';
const status = 'ready';

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function q(question, answer, explanation = '', options = []) { return { question, answer, explanation, options }; }
function vocab(word, meaning, example = '') { return { word, meaning, example }; }

function makeListeningLesson(input) {
  return createListeningLesson({
    level,
    status,
    estimatedMinutes: 50,
    ...input,
    masteryCriteria: { minPracticeAccuracy: 80, requiredProduction: 1, tags: ['a1-listening', input.id, 'deep-approved-target'] },
  });
}

export const A1_DEEP_LISTENING_FOUNDATIONS = Object.freeze([
  makeListeningLesson({
    id: 'A1-LISTENING-001',
    order: 1,
    title: 'Greetings and names',
    objectives: ['Reconhecer cumprimentos simples pelo som.', 'Identificar nomes em diálogos curtos.', 'Responder sem depender do transcript primeiro.', 'Repetir chunks básicos com ritmo natural.'],
    teacherOpening: 'Listening no A1 não é ler um texto com áudio por cima. Primeiro você precisa treinar o ouvido a reconhecer blocos curtos: Hi, hello, how are you, my name is. Nesta aula, o foco é escutar antes de olhar o transcript. Você vai preparar o ouvido, ouvir procurando palavras-chave, confirmar o sentido e só depois comparar com o texto. Esse processo evita que você vire dependente de legenda e ajuda a reconhecer inglês falado de verdade.',
    whyItMatters: 'Cumprimentos e nomes são a entrada de quase toda conversa. Se você reconhece Hi, my name is Ana, nice to meet you e how are you, você já entende o começo de uma interação. Brasileiros muitas vezes sabem ler essas frases, mas não reconhecem quando elas vêm rápidas e conectadas. O objetivo é treinar som, ritmo e chunks, não só significado.',
    realLifeUseCases: ['Entender quando alguém se apresenta.', 'Reconhecer seu nome em uma chamada.', 'Cumprimentar em aula online.', 'Responder How are you?', 'Repetir frases curtas com ritmo natural.'],
    conceptExplanation: 'Em Listening A1, você deve ouvir por palavras-chave, não por tradução completa. Quando alguém diz “Hi, my name is Ana”, o ouvido precisa reconhecer Hi e my name is como blocos. Na primeira escuta, você procura a ideia geral: pessoas se cumprimentando. Na segunda escuta, procura detalhes: nome, resposta, despedida. O transcript só vem depois para confirmar o que você ouviu.',
    mentalModel: { title: 'Ouvir → captar palavras-chave → confirmar → repetir', summary: 'Você primeiro ouve sem texto. Depois confirma com tarefas e só então usa o transcript.', steps: ['Prepare 3 palavras-chave.', 'Ouça sem transcript.', 'Responda ideia geral.', 'Ouça de novo por detalhes.', 'Leia o transcript e repita.'] },
    stepByStep: [task('Leia as palavras-chave antes do áudio.'), task('Ouça uma vez sem transcript.', 'Não pause a cada palavra.'), task('Decida a situação geral.', 'É greeting? apresentação? despedida?'), task('Ouça de novo para nomes e respostas.'), task('Confira o transcript só depois.'), task('Faça shadowing com frases curtas.')],
    portugueseContrast: [task('Português costuma separar sílabas com clareza; inglês liga palavras.', 'How are you pode soar como hau-ar-yu.'), task('Não tente traduzir enquanto escuta.', 'Primeiro reconheça chunks.'), task('Nome próprio pode ser a única parte nova; o resto é fórmula conhecida.'), task('Thanks pode soar curto e rápido.')],
    guidedDiscovery: [task('Antes de ouvir, espere encontrar Hi, hello ou my name is.'), task('Se ouvir “my name is”, a próxima informação provavelmente é um nome.'), task('Se ouvir “how are you?”, espere uma resposta como I am good.')],
    guidedBeforeQuiz: [task('Primeira escuta: escolha a situação geral.'), task('Segunda escuta: anote mentalmente o nome.'), task('Depois: repita Hi, my name is... em voz alta.'), task('Só use transcript para conferir.')],
    listeningPreparation: [task('Feche o transcript na primeira escuta.'), task('Prepare estas palavras: hi, hello, name, good, thanks.'), task('Objetivo da primeira escuta: entender que duas pessoas se cumprimentam.'), task('Objetivo da segunda escuta: identificar o nome e a resposta.')],
    keyWordsToHear: [vocab('Hi','Oi'), vocab('Hello','Olá'), vocab('my name is','meu nome é'), vocab('How are you?','Como você está?'), vocab('I am good','Estou bem'), vocab('thanks','obrigado'), vocab('Nice to meet you','Prazer em conhecer você'), vocab('Bye','Tchau')],
    audioScript: `Ana: Hi, my name is Ana.
Luis: Hello, Ana. My name is Luis.
Ana: Nice to meet you, Luis.
Luis: Nice to meet you too. How are you?
Ana: I am good, thanks. And you?
Luis: I am fine. Bye, Ana.
Ana: Bye, Luis.`,
    firstListenTasks: [task('Sem transcript: escolha a situação geral.', 'Duas pessoas se cumprimentam e se apresentam.', 'greetings and names'), task('Sem transcript: quantas pessoas falam?', 'Duas pessoas.', '2'), task('Sem transcript: você ouviu uma despedida no final?', 'Sim, Bye.', 'yes')],
    secondListenTasks: [task('Ouça de novo e identifique o primeiro nome.', 'Ana.'), task('Identifique o segundo nome.', 'Luis.'), task('Qual pergunta sobre estado aparece?', 'How are you?'), task('Qual resposta Ana dá?', 'I am good, thanks.'), task('Qual resposta Luis dá?', 'I am fine.')],
    transcript: `Ana: Hi, my name is Ana.
Luis: Hello, Ana. My name is Luis.
Ana: Nice to meet you, Luis.
Luis: Nice to meet you too. How are you?
Ana: I am good, thanks. And you?
Luis: I am fine. Bye, Ana.
Ana: Bye, Luis.`,
    vocabulary: [vocab('name','nome','my name is Ana'), vocab('fine','bem','I am fine'), vocab('good','bem/bom','I am good'), vocab('too','também','Nice to meet you too')],
    shadowing: [task('Repita junto: Hi, my name is Ana.'), task('Repita junto: My name is Luis.'), task('Repita junto: Nice to meet you.'), task('Repita junto: How are you?'), task('Repita junto: I am good, thanks.'), task('Repita junto: I am fine.')],
    dictationTasks: [task('Complete de ouvido: My name is ___.', 'Ana/Luis'), task('Complete de ouvido: I am good, ___.', 'thanks'), task('Complete de ouvido: Nice to ___ you.', 'meet')],
    pronunciationChunks: [task('How are you?', 'Ouça como bloco: hau-ar-yu.'), task('My name is', 'O som liga name + is.'), task('Nice to meet you', 'Ritmo em quatro batidas.')],
    listeningComprehension: [q('Who says “my name is Ana”?', 'Ana', 'O primeiro falante se apresenta.', ['Ana','Luis','Teacher']), q('Who says “my name is Luis”?', 'Luis', 'O segundo falante se apresenta.', ['Luis','Ana','Maria']), q('What question does Luis ask?', 'How are you?', 'Ele pergunta estado.', ['How are you?','Where are you from?','What is your phone?']), q('How is Ana?', 'She is good.', 'Ana diz I am good, thanks.', ['She is good.','She is late.','She is from Brazil.']), q('How is Luis?', 'He is fine.', 'Luis diz I am fine.', ['He is fine.','He is Ana.','He is online.']), q('What word ends the dialogue?', 'Bye', 'Os dois dizem Bye.', ['Bye','Hello','Thanks']), q('How many people speak?', 'Two', 'Ana e Luis.', ['Two','Three','One']), q('What is the main situation?', 'They meet and greet each other.', 'É uma apresentação simples.', ['They meet and greet each other.','They buy coffee.','They read a profile.'])],
    oralProduction: task('Grave ou fale um mini diálogo de 4 linhas: Hi, my name is... / Hello... / How are you? / I am good, thanks.', 'Use seu nome real ou fictício.'),
    selfAssessment: [task('Consegui ouvir sem transcript primeiro?'), task('Identifiquei os nomes?'), task('Reconheci How are you?'), task('Consegui repetir os chunks?')],
    lessonRecap: ['Listening começa sem transcript.', 'Palavras-chave guiam a escuta.', 'My name is indica que vem um nome.', 'How are you pede resposta de estado.', 'Shadowing ajuda ritmo e reconhecimento.'],
    nextLessonBridge: 'Na próxima aula, você vai ouvir nomes sendo soletrados e treinar letras em inglês.',
  }),

  makeListeningLesson({
    id: 'A1-LISTENING-002',
    order: 2,
    title: 'Spelling names',
    objectives: ['Reconhecer letras em inglês em nomes soletrados.', 'Entender pedidos como Can you spell that?', 'Praticar dictation curta de nomes.', 'Soletrar seu nome em voz alta.'],
    teacherOpening: 'Soletrar nomes é uma situação real de Listening: cadastro, aula online, atendimento e chamada. O aluno muitas vezes sabe o alfabeto lendo, mas trava quando ouve letras rápidas. Nesta aula, você vai treinar a escuta de nomes letra por letra. O foco não é decorar o alfabeto inteiro em teoria; é reconhecer letras dentro de uma tarefa real: ouvir, confirmar e soletrar.',
    whyItMatters: 'Nomes e e-mails precisam ser confirmados em inglês. Se alguém diz “Can you spell that?”, você precisa entender que a pessoa quer as letras. Isso prepara você para cadastros e diálogos reais. Para brasileiros, letras como A, E, I, Y e R causam confusão. Por isso vamos treinar em chunks curtos e dictation leve.',
    realLifeUseCases: ['Soletrar seu nome em uma aula.', 'Entender quando alguém soletra sobrenome.', 'Confirmar nome em cadastro.', 'Ouvir letras em e-mail simples.', 'Pedir para repetir.'],
    conceptExplanation: 'Spelling listening exige ouvir unidades pequenas: letras. A estratégia é diferente de ouvir um texto. Você primeiro reconhece a pergunta “Can you spell that?”. Depois ouve grupos curtos de letras. Se perder uma letra, continue; não trave. Na segunda escuta, confirme as letras difíceis. O transcript só serve para checar depois. O objetivo é transformar letras em som reconhecível.',
    mentalModel: { title: 'Pergunta → letras → confirmação', summary: 'Ouça o pedido, capture letras em sequência e confirme o nome.', steps: ['Reconheça Can you spell that?', 'Ouça o nome completo.', 'Ouça as letras em blocos.', 'Repita em voz alta.', 'Confira com transcript.'] },
    stepByStep: [task('Prepare letras difíceis: A, E, I, R, Y.'), task('Ouça sem transcript.'), task('Anote mentalmente o nome.'), task('Ouça de novo para letras.'), task('Repita as letras em voz alta.'), task('Confira o transcript.')],
    portugueseContrast: [task('A em inglês não soa como “á” português.'), task('E e I são fáceis de confundir para brasileiros.'), task('Y aparece muito em nomes/e-mails e tem som próprio.'), task('Spell significa soletrar, não “fazer mágica” neste contexto.')],
    guidedDiscovery: [task('Se ouvir “spell”, espere letras.'), task('Se ouvir “Can you repeat?”, a pessoa pede repetição.'), task('Ao ouvir letras, não traduza; repita o som.')],
    guidedBeforeQuiz: [task('Ouça primeiro o nome inteiro.'), task('Depois foque nas letras.'), task('Use pausa mental a cada 3 letras.'), task('Repita: A-N-A, L-U-I-S.')],
    listeningPreparation: [task('Feche o transcript na primeira escuta.'), task('Prepare a pergunta: Can you spell that?'), task('Prepare letras: A, E, I, L, S, R, Y.'), task('Objetivo: identificar nomes soletrados.')],
    keyWordsToHear: [vocab('spell','soletrar'), vocab('repeat','repetir'), vocab('name','nome'), vocab('last name','sobrenome'), vocab('please','por favor'), vocab('A-N-A','Ana soletrado'), vocab('L-U-I-S','Luis soletrado'), vocab('S-I-L-V-A','Silva soletrado')],
    audioScript: `Teacher: What is your name?
Student: My name is Luis Silva.
Teacher: Can you spell your first name, please?
Student: L-U-I-S.
Teacher: Thank you. Can you spell your last name?
Student: S-I-L-V-A.
Teacher: Great. Please repeat your first name.
Student: Luis.`,
    firstListenTasks: [task('Sem transcript: qual é a situação?', 'Uma professora pede para soletrar nome e sobrenome.', 'spelling a name'), task('Sem transcript: você ouviu first name ou phone number?', 'First name.', 'first name'), task('Sem transcript: a pessoa soletra sobrenome?', 'Sim.', 'yes')],
    secondListenTasks: [task('Identifique o primeiro nome.', 'Luis.'), task('Identifique o sobrenome.', 'Silva.'), task('Quais letras formam Luis?', 'L-U-I-S.'), task('Quais letras formam Silva?', 'S-I-L-V-A.'), task('Qual palavra indica pedido educado?', 'Please.')],
    transcript: `Teacher: What is your name?
Student: My name is Luis Silva.
Teacher: Can you spell your first name, please?
Student: L-U-I-S.
Teacher: Thank you. Can you spell your last name?
Student: S-I-L-V-A.
Teacher: Great. Please repeat your first name.
Student: Luis.`,
    vocabulary: [vocab('first name','primeiro nome','Luis'), vocab('last name','sobrenome','Silva'), vocab('spell','soletrar','Can you spell?'), vocab('repeat','repetir','Please repeat.')],
    shadowing: [task('Repita: What is your name?'), task('Repita: Can you spell your first name?'), task('Repita: L-U-I-S.'), task('Repita: Can you spell your last name?'), task('Repita: S-I-L-V-A.'), task('Repita: Please repeat your first name.')],
    dictationTasks: [task('Escreva de ouvido o primeiro nome.', 'Luis'), task('Escreva de ouvido o sobrenome.', 'Silva'), task('Complete: Can you ___ your name?', 'spell')],
    pronunciationChunks: [task('Can you spell', 'Pode soar como can-yu-spel.'), task('first name', 'O som liga first + name.'), task('last name', 'O t de last pode ficar fraco antes de name.')],
    listeningComprehension: [q('What is the student’s first name?', 'Luis', 'Ele diz My name is Luis Silva e soletra L-U-I-S.', ['Luis','Silva','Ana']), q('What is the student’s last name?', 'Silva', 'Ele soletra S-I-L-V-A.', ['Silva','Luis','Santos']), q('What does “spell” mean here?', 'soletrar', 'A professora pede letras.', ['soletrar','comprar','escutar música']), q('What does the teacher ask first?', 'What is your name?', 'Primeira fala da professora.', ['What is your name?','How old are you?','Where are you from?']), q('Does the student spell his last name?', 'Yes', 'Ele diz S-I-L-V-A.', ['Yes','No','Only his first name']), q('Which word makes the request polite?', 'please', 'A professora diz please.', ['please','great','name']), q('What does repeat mean?', 'repetir', 'Please repeat.', ['repetir','soletrar','sair']), q('How many names are confirmed?', 'Two', 'First name and last name.', ['Two','One','Three'])],
    oralProduction: task('Soletrar seu primeiro nome e sobrenome em voz alta: My name is ___. My first name is spelled ___. My last name is spelled ___.', 'Use seu nome real ou fictício.'),
    selfAssessment: [task('Entendi Can you spell that?'), task('Consegui identificar Luis e Silva?'), task('Consegui repetir letras em inglês?'), task('Consegui soletrar meu nome?')],
    lessonRecap: ['Spell significa soletrar.', 'First name é primeiro nome.', 'Last name é sobrenome.', 'Listening de spelling exige foco em letras.', 'Se perder uma letra, continue e confirme na segunda escuta.'],
    nextLessonBridge: 'Na próxima aula, você vai ouvir números e telefones, outro tipo de Listening que exige atenção a unidades pequenas.',
  }),

  makeListeningLesson({
    id: 'A1-LISTENING-003',
    order: 3,
    title: 'Numbers and phone numbers',
    objectives: ['Reconhecer números em áudio.', 'Entender phone number em cadastro simples.', 'Ouvir telefone por dígitos.', 'Produzir seu próprio número fictício em inglês.'],
    teacherOpening: 'Números em Listening são difíceis porque eles passam rápido e parecem parecidos: thirteen/thirty, fifteen/fifty. Em telefone, o desafio muda: você escuta dígito por dígito. Nesta aula, você vai praticar como um atendente ou professor pediria um número. Primeiro você vai ouvir sem transcript, depois vai focar nos dígitos e só então conferir.',
    whyItMatters: 'Telefone, idade, preço e quantidade aparecem em situações reais desde o A1. Saber ler números não garante reconhecer quando alguém fala. Brasileiros costumam travar ao ouvir sequências longas. A solução é quebrar em blocos curtos e repetir. Esta aula treina exatamente isso.',
    realLifeUseCases: ['Informar telefone em cadastro.', 'Entender idade em diálogo.', 'Ouvir número de página.', 'Confirmar sequência de dígitos.', 'Repetir número com clareza.'],
    conceptExplanation: 'Listening com números usa reconhecimento de som e memória curta. Em vez de traduzir, você captura dígitos em blocos. Para phone number, é comum ouvir one, two, zero, five separadamente. Para idade, você ouve number + years old. Para quantidade, ouve how many. A primeira escuta identifica o tipo de número; a segunda pega os detalhes.',
    mentalModel: { title: 'Tipo de número → blocos → confirmação', summary: 'Pergunte: é idade, telefone ou quantidade? Depois capture blocos pequenos.', steps: ['Ouça o contexto.', 'Decida se é idade ou telefone.', 'Capture dígitos em grupos.', 'Repita mentalmente.', 'Confira com transcript.'] },
    stepByStep: [task('Prepare números 0–20 e dezenas.'), task('Ouça a situação geral.'), task('Na segunda escuta, foque só nos números.'), task('Divida telefone em blocos.'), task('Repita em voz alta.'), task('Confira o transcript no final.')],
    portugueseContrast: [task('Em português falamos telefone em blocos grandes; em inglês A1 é mais seguro dígito por dígito.'), task('Zero pode ser zero ou oh; no A1 use zero.'), task('Teen e ty confundem brasileiros.'), task('Years old aparece para idade.')],
    guidedDiscovery: [task('Se ouvir phone number, espere dígitos.'), task('Se ouvir years old, é idade.'), task('Se ouvir how many, é quantidade.')],
    guidedBeforeQuiz: [task('Primeira escuta: idade ou telefone?'), task('Segunda escuta: capture os números.'), task('Repita: five five zero three.'), task('Confira teen vs ty.')],
    listeningPreparation: [task('Feche o transcript na primeira escuta.'), task('Prepare: zero, one, two, three, five, nine, twenty.'), task('Objetivo: identificar idade e telefone.'), task('Não tente escrever tudo na primeira escuta.')],
    keyWordsToHear: [vocab('phone number','número de telefone'), vocab('zero','0'), vocab('one','1'), vocab('two','2'), vocab('three','3'), vocab('five','5'), vocab('nine','9'), vocab('years old','anos de idade')],
    audioScript: `Clerk: What is your name?
Student: My name is Ana.
Clerk: How old are you?
Student: I am nineteen years old.
Clerk: What is your phone number?
Student: My phone number is five five zero three two nine.
Clerk: Can you repeat that?
Student: Five five zero three two nine.`,
    firstListenTasks: [task('Sem transcript: qual tipo de informação aparece?', 'Nome, idade e telefone.', 'personal information'), task('Sem transcript: a pessoa fala idade?', 'Sim.', 'yes'), task('Sem transcript: a pessoa repete o telefone?', 'Sim.', 'yes')],
    secondListenTasks: [task('Qual é o nome?', 'Ana.'), task('Qual é a idade?', 'Nineteen years old.'), task('Qual é o telefone?', 'Five five zero three two nine.'), task('Qual número aparece duas vezes no começo?', 'Five.'), task('Qual palavra pede repetição?', 'Repeat.')],
    transcript: `Clerk: What is your name?
Student: My name is Ana.
Clerk: How old are you?
Student: I am nineteen years old.
Clerk: What is your phone number?
Student: My phone number is five five zero three two nine.
Clerk: Can you repeat that?
Student: Five five zero three two nine.`,
    vocabulary: [vocab('nineteen','dezenove','nineteen years old'), vocab('phone number','número de telefone','my phone number is...'), vocab('repeat','repetir','Can you repeat that?'), vocab('zero','zero','five five zero')],
    shadowing: [task('Repita: How old are you?'), task('Repita: I am nineteen years old.'), task('Repita: What is your phone number?'), task('Repita: My phone number is five five zero three two nine.'), task('Repita: Can you repeat that?'), task('Repita: Five five zero three two nine.')],
    dictationTasks: [task('Escreva de ouvido a idade.', 'nineteen'), task('Escreva de ouvido o telefone.', '550329'), task('Complete: Can you ___ that?', 'repeat')],
    pronunciationChunks: [task('nineteen years old', 'Teen + years old pode ligar.'), task('phone number', 'O som de phone vem forte.'), task('five five zero', 'Repita em blocos curtos.')],
    listeningComprehension: [q('What is her name?', 'Ana', 'Ela diz My name is Ana.', ['Ana','Luis','Carla']), q('How old is Ana?', '19', 'Ela diz nineteen years old.', ['19','20','9']), q('What information does the clerk ask after age?', 'phone number', 'What is your phone number?', ['phone number','city','country']), q('What is the first digit of the phone number?', 'five', 'five five zero...', ['five','zero','three']), q('Which digit comes after two fives?', 'zero', 'five five zero...', ['zero','two','nine']), q('Does Ana repeat the number?', 'Yes', 'Ela repete o número.', ['Yes','No','Only her name']), q('What does repeat mean?', 'repetir', 'Can you repeat that?', ['repetir','soletrar','sair']), q('What is the situation?', 'A simple registration.', 'Clerk asks personal information.', ['A simple registration.','A family dinner.','A reading class.'])],
    oralProduction: task('Fale um número de telefone fictício em inglês, dígito por dígito. Depois diga: Can you repeat that?', 'Use 6 a 8 dígitos.'),
    selfAssessment: [task('Reconheci nineteen?'), task('Consegui ouvir o telefone por blocos?'), task('Consegui repetir a sequência?'), task('Entendi Can you repeat that?')],
    lessonRecap: ['Números em Listening precisam de blocos curtos.', 'Phone number costuma ser dígito por dígito.', 'Years old indica idade.', 'Repeat pede repetição.', 'Teen/ty precisam de atenção extra.'],
    nextLessonBridge: 'Na próxima aula, você vai ouvir países e cidades em apresentações simples.',
  }),

  makeListeningLesson({
    id: 'A1-LISTENING-004',
    order: 4,
    title: 'Countries and cities',
    objectives: ['Reconhecer países e cidades em apresentações simples.', 'Entender Where are you from? e I live in.', 'Diferenciar country e city pelo contexto.', 'Produzir uma resposta oral curta sobre origem e cidade.'],
    teacherOpening: 'Ouvir países e cidades é uma habilidade básica, mas exige contexto. Quando alguém pergunta Where are you from?, a resposta provavelmente será um país. Quando diz I live in, geralmente vem uma cidade. Nesta aula, você vai treinar essas pistas. O foco não é memorizar todos os países, mas reconhecer blocos de origem e localização em apresentações A1.',
    whyItMatters: 'Origem e cidade aparecem em apresentações, perfis e conversas online. Você já estudou country, nationality, Brazil, Brazilian, city e from. Agora precisa reconhecer esses blocos pelo som. O erro comum é ouvir Brazil e não perceber se a pessoa disse I am from Brazil ou I am Brazilian. Listening resolve isso treinando contexto antes de palavra isolada.',
    realLifeUseCases: ['Entender de onde alguém é.', 'Entender onde alguém mora.', 'Responder Where are you from?', 'Diferenciar país e cidade.', 'Apresentar-se oralmente.'],
    conceptExplanation: 'Para ouvir origem, procure Where are you from? e I am from + country. Para cidade, procure I live in + city ou my city is. Country é o país; city é a cidade. Em listening, você não precisa reconhecer todos os lugares do mundo. Precisa reconhecer o bloco que vem antes: from indica origem; live in indica cidade onde mora. O transcript vem depois para confirmar.',
    mentalModel: { title: 'Pergunta de origem → país / live in → cidade', summary: 'A palavra antes do lugar mostra o tipo de informação.', steps: ['Where are you from? → origem.', 'I am from Brazil → país.', 'I live in Recife → cidade.', 'My city is Curitiba → cidade.'] },
    stepByStep: [task('Prepare from, country, city, live in.'), task('Ouça sem transcript.'), task('Identifique se a pessoa fala país ou cidade.'), task('Ouça de novo para nomes de lugares.'), task('Confira com transcript.'), task('Repita sua própria resposta.')],
    portugueseContrast: [task('Português diz “sou de”; inglês usa I am from.'), task('I live in é morar em, não viver dentro literalmente.'), task('Brazil é país; Brazilian é nacionalidade.'), task('City não é country.')],
    guidedDiscovery: [task('Se ouvir from, espere país/origem.'), task('Se ouvir live in, espere cidade.'), task('Se ouvir Brazilian, é nacionalidade, não país.')],
    guidedBeforeQuiz: [task('Primeira escuta: a conversa é sobre origem?'), task('Segunda escuta: identifique país e cidade.'), task('Depois repita: I am from Brazil. I live in Recife.'), task('Só confira no transcript no final.')],
    listeningPreparation: [task('Feche o transcript na primeira escuta.'), task('Prepare: from, Brazil, city, live in, Recife, Curitiba.'), task('Objetivo: separar country e city.'), task('Ouça os blocos antes dos lugares.')],
    keyWordsToHear: [vocab('Where are you from?','De onde você é?'), vocab('from','de/origem'), vocab('Brazil','Brasil'), vocab('Brazilian','brasileiro'), vocab('city','cidade'), vocab('live in','morar em'), vocab('Recife','Recife'), vocab('Curitiba','Curitiba')],
    audioScript: `Teacher: Where are you from, Ana?
Ana: I am from Brazil.
Teacher: Are you Brazilian?
Ana: Yes, I am Brazilian.
Teacher: What is your city?
Ana: My city is Recife. I live in Recife.
Teacher: And Bruno?
Ana: Bruno is from Brazil too. He lives in Curitiba.`,
    firstListenTasks: [task('Sem transcript: qual é o tema?', 'Origem, nacionalidade e cidade.', 'country and city'), task('Sem transcript: Ana é de qual país?', 'Brazil.', 'Brazil'), task('Sem transcript: aparecem duas cidades?', 'Sim.', 'yes')],
    secondListenTasks: [task('Qual país Ana menciona?', 'Brazil.'), task('Qual nacionalidade aparece?', 'Brazilian.'), task('Qual é a cidade de Ana?', 'Recife.'), task('Onde Bruno mora?', 'Curitiba.'), task('Qual palavra indica morar?', 'live/lives in.')],
    transcript: `Teacher: Where are you from, Ana?
Ana: I am from Brazil.
Teacher: Are you Brazilian?
Ana: Yes, I am Brazilian.
Teacher: What is your city?
Ana: My city is Recife. I live in Recife.
Teacher: And Bruno?
Ana: Bruno is from Brazil too. He lives in Curitiba.`,
    vocabulary: [vocab('from','de/origem','I am from Brazil'), vocab('Brazilian','brasileiro/brasileira','I am Brazilian'), vocab('city','cidade','My city is Recife'), vocab('live in','morar em','I live in Recife')],
    shadowing: [task('Repita: Where are you from?'), task('Repita: I am from Brazil.'), task('Repita: Are you Brazilian?'), task('Repita: Yes, I am Brazilian.'), task('Repita: My city is Recife.'), task('Repita: I live in Recife.')],
    dictationTasks: [task('Complete de ouvido: I am from ___.', 'Brazil'), task('Complete de ouvido: My city is ___.', 'Recife'), task('Complete de ouvido: He lives in ___.', 'Curitiba')],
    pronunciationChunks: [task('Where are you from?', 'Pode soar ligado: where-are-you-from.'), task('I am from Brazil', 'from + Brazil conecta naturalmente.'), task('I live in Recife', 'live in vira bloco.')],
    listeningComprehension: [q('Where is Ana from?', 'Brazil', 'Ela diz I am from Brazil.', ['Brazil','Curitiba','Recife']), q('Is Ana Brazilian?', 'Yes', 'Ela diz Yes, I am Brazilian.', ['Yes','No','Not mentioned']), q('What is Ana’s city?', 'Recife', 'Ela diz My city is Recife.', ['Recife','Curitiba','Brazil']), q('Where does Ana live?', 'Recife', 'Ela diz I live in Recife.', ['Recife','Brazil','Canada']), q('Where does Bruno live?', 'Curitiba', 'He lives in Curitiba.', ['Curitiba','Recife','Brazilian']), q('Is Bruno from Brazil too?', 'Yes', 'Bruno is from Brazil too.', ['Yes','No','Only Ana']), q('What word signals origin?', 'from', 'I am from Brazil.', ['from','city','teacher']), q('What phrase means morar em?', 'live in', 'I live in Recife.', ['live in','from','years old'])],
    oralProduction: task('Fale 3 frases: I am from ___. I am ___. I live in ___.', 'Use seu país, nacionalidade e cidade.'),
    selfAssessment: [task('Reconheci Where are you from?'), task('Separei country e city?'), task('Entendi live in?'), task('Consegui repetir minha origem e cidade?')],
    lessonRecap: ['From indica origem.', 'Live in indica cidade onde mora.', 'Country e city não são a mesma coisa.', 'Brazil é país; Brazilian é nacionalidade.', 'Listening usa contexto antes de palavra isolada.'],
    nextLessonBridge: 'Listening Foundations agora prepara o aluno para Speaking Foundations, onde ele vai produzir esses diálogos oralmente.',
  }),
]);

export const A1_DEEP_LISTENING_BY_PILLAR = Object.freeze({
  listening: A1_DEEP_LISTENING_FOUNDATIONS,
});
