import {
  createGrammarLesson,
  createListeningLesson,
  createReadingLesson,
  createSpeakingLesson,
  createVocabularyLesson,
  createWritingLesson,
} from '../../../schemas/index.js';

const level = 'A1';
const status = 'ready';
const packageId = 'A1.1 Foundations';

function q(question, options, answer, explanation = '') {
  return { question, options, answer, explanation };
}
function section(title, content) { return { title, content }; }
function ex(english, translation, note = '') { return { english, translation, note }; }
function mistake(wrong, right, why) { return { wrong, right, why }; }
function prod(instruction, expected = '') { return { instruction, expected }; }

const baseGrammarChecklist = [
  'Eu sei dizer a regra principal em português.',
  'Eu consigo reconhecer a forma correta em uma frase curta.',
  'Eu consigo corrigir pelo menos um erro comum de brasileiro.',
  'Eu consigo criar frases próprias sem traduzir palavra por palavra.',
];

function grammarLesson({ id, order, title, objectives, pattern, examples, mistakes, practice, productionTasks }) {
  return createGrammarLesson({
    id, level, order, title, status, estimatedMinutes: 35, prerequisites: order > 1 ? [`A1-GRAMMAR-${String(order - 1).padStart(3, '0')}`] : [], objectives,
    teacherOpening: `Nesta aula, você vai estudar ${title}. O foco é entender a estrutura antes de tentar falar rápido. O padrão é: ${pattern}.`,
    conceptExplanation: `O padrão da aula é: ${pattern}. Observe que a ordem das palavras é tão importante quanto o vocabulário.`,
    lessonRecap: [`Ao final de ${title}, você deve conseguir usar o padrão ${pattern} em frases curtas e corretas.`],
    explanationSections: [
      section('Abertura do professor', `Nesta aula, você vai estudar ${title}. O foco é entender a estrutura antes de tentar falar rápido. No A1, a meta é montar frases curtas e corretas. Pense em inglês como blocos: primeiro vem quem faz a ação ou quem é descrito, depois vem a palavra principal da estrutura, e depois a informação final. Quando você aprende o padrão ${pattern}, você para de adivinhar e começa a reconhecer a lógica da frase.`),
      section('Quando usar', `Use esta estrutura quando precisar falar de informações básicas: nome, país, cidade, identidade, família, estudo, trabalho ou descrição simples. No começo, não tente traduzir frases grandes do português. Use modelos pequenos e troque uma palavra por vez. Essa estratégia cria segurança, evita erros como ordem errada das palavras e ajuda você a responder perguntas simples.`),
      section('Forma principal', `O padrão da aula é: ${pattern}. Observe que a ordem das palavras é tão importante quanto o vocabulário. Em inglês, frases A1 geralmente seguem uma ordem previsível. Leia os exemplos em voz alta, compare com a tradução e repita até a estrutura parecer natural. A regra não precisa ser decorada como fórmula; ela precisa ser reconhecida em frases reais.`),
      section('Como brasileiros costumam errar', 'O erro mais comum é montar a frase com a ordem do português ou esquecer uma palavra pequena, como am, is, are, my ou your. Essas palavras parecem pequenas, mas carregam a estrutura da frase. Quando corrigir um erro, não apenas veja a resposta certa: pergunte qual parte da estrutura estava faltando.'),
      section('Prática guiada', 'Primeiro reconheça a opção correta. Depois complete lacunas. Depois corrija erros. Só então escreva frases próprias. Essa ordem é importante porque o aluno iniciante precisa ver o padrão muitas vezes antes de produzir sozinho. A produção vem no final, quando o cérebro já viu a estrutura em contextos diferentes.'),
      section('Resumo da aula', `Ao final, você deve conseguir usar ${title} em frases curtas, responder perguntas simples e explicar em português por que uma frase está certa ou errada. Se ainda parecer confuso, volte aos exemplos e repita os modelos antes de avançar.`),
    ],
    professorExamples: examples,
    commonMistakes: mistakes,
    guidedPractice: practice,
    transformationPractice: practice.slice(0, 6).map((item, index) => ({ ...item, question: `Transformação ${index + 1}: ${item.question}` })),
    productionTasks,
    finalChecklist: baseGrammarChecklist,
    masteryCriteria: { minPracticeAccuracy: 75, requiredProduction: 2, tags: ['a1-foundations', title.toLowerCase()] },
  });
}

const grammarLessons = [
  grammarLesson({
    id: 'A1-GRAMMAR-001', order: 1, title: 'Subject pronouns', objectives: ['Reconhecer I, you, he, she, it, we, they.', 'Substituir nomes por pronomes em frases simples.'], pattern: 'subject pronoun + information',
    examples: [ex('I am Luis.', 'Eu sou Luis.'), ex('You are Ana.', 'Você é Ana.'), ex('He is Pedro.', 'Ele é Pedro.'), ex('She is Maria.', 'Ela é Maria.'), ex('It is a book.', 'É um livro.'), ex('We are students.', 'Nós somos estudantes.'), ex('They are friends.', 'Eles são amigos.'), ex('I am from Brazil.', 'Eu sou do Brasil.'), ex('She is my sister.', 'Ela é minha irmã.'), ex('He is my teacher.', 'Ele é meu professor.'), ex('We are here.', 'Nós estamos aqui.'), ex('They are happy.', 'Eles estão felizes.')],
    mistakes: [mistake('Maria is my friend. Maria is from Brazil.', 'Maria is my friend. She is from Brazil.', 'Use she para evitar repetir Maria.'), mistake('Pedro is my brother. Pedro is a student.', 'Pedro is my brother. He is a student.', 'Use he para homem/menino.'), mistake('The book is red. He is red.', 'The book is red. It is red.', 'Para objeto, use it.')],
    practice: [q('Qual pronome substitui Maria?', ['She', 'He', 'It'], 'She', 'Maria é she.'), q('Qual pronome substitui Pedro?', ['He', 'She', 'They'], 'He'), q('Qual pronome substitui a book?', ['It', 'He', 'We'], 'It'), q('Complete: ___ am from Brazil.', ['I', 'She', 'They'], 'I'), q('Complete: ___ are students.', ['They', 'He', 'It'], 'They'), q('Escolha a frase correta.', ['She is Ana.', 'He is Ana.', 'It is Ana.'], 'She is Ana.'), q('Substitua Luis por pronome: Luis is a student.', ['He is a student.', 'She is a student.', 'It is a student.'], 'He is a student.'), q('Substitua Ana and Luis.', ['They', 'It', 'He'], 'They'), q('Qual frase fala de nós?', ['We are here.', 'They are here.', 'You are here.'], 'We are here.'), q('Qual frase fala de objeto?', ['It is a phone.', 'He is a phone.', 'She is a phone.'], 'It is a phone.')],
    productionTasks: [prod('Escreva 3 frases usando I, he e she.'), prod('Substitua 3 nomes por pronomes.'), prod('Crie uma mini apresentação com I e we.')],
  }),
  grammarLesson({
    id: 'A1-GRAMMAR-002', order: 2, title: 'Verb to be — affirmative', objectives: ['Usar am, is e are em frases afirmativas.', 'Falar nome, origem e descrição básica.'], pattern: 'subject + am/is/are + complement',
    examples: [ex('I am a student.', 'Eu sou estudante.'), ex('You are my friend.', 'Você é meu amigo.'), ex('He is from Brazil.', 'Ele é do Brasil.'), ex('She is happy.', 'Ela está feliz.'), ex('It is blue.', 'É azul.'), ex('We are ready.', 'Nós estamos prontos.'), ex('They are teachers.', 'Eles são professores.'), ex('I am at home.', 'Eu estou em casa.'), ex('You are correct.', 'Você está correto.'), ex('He is my brother.', 'Ele é meu irmão.'), ex('She is in class.', 'Ela está na aula.'), ex('They are from Canada.', 'Eles são do Canadá.')],
    mistakes: [mistake('I is a student.', 'I am a student.', 'Com I, use am.'), mistake('She are happy.', 'She is happy.', 'Com she, use is.'), mistake('They is friends.', 'They are friends.', 'Com they, use are.')],
    practice: [q('Complete: I ___ a student.', ['am', 'is', 'are'], 'am'), q('Complete: She ___ happy.', ['is', 'am', 'are'], 'is'), q('Complete: They ___ friends.', ['are', 'is', 'am'], 'are'), q('Qual está correta?', ['He is from Brazil.', 'He are from Brazil.', 'He am from Brazil.'], 'He is from Brazil.'), q('Qual está correta?', ['We are ready.', 'We is ready.', 'We am ready.'], 'We are ready.'), q('Corrija: I is tired.', ['I am tired.', 'I are tired.', 'I tired am.'], 'I am tired.'), q('Traduza: Eu sou professor.', ['I am a teacher.', 'I is a teacher.', 'I are teacher.'], 'I am a teacher.'), q('Complete: You ___ correct.', ['are', 'is', 'am'], 'are'), q('Complete: It ___ blue.', ['is', 'are', 'am'], 'is'), q('Escolha a frase afirmativa.', ['She is my sister.', 'Is she my sister?', 'She is not my sister.'], 'She is my sister.')],
    productionTasks: [prod('Escreva 5 frases afirmativas usando am/is/are.'), prod('Escreva uma apresentação curta com I am.'), prod('Descreva 3 pessoas usando he is/she is.')],
  }),
  grammarLesson({
    id: 'A1-GRAMMAR-003', order: 3, title: 'Verb to be — negative', objectives: ['Usar not com am/is/are.', 'Negar informações pessoais e descrições simples.'], pattern: 'subject + am/is/are + not + complement',
    examples: [ex('I am not tired.', 'Eu não estou cansado.'), ex('You are not late.', 'Você não está atrasado.'), ex('He is not my brother.', 'Ele não é meu irmão.'), ex('She is not from Canada.', 'Ela não é do Canadá.'), ex('It is not red.', 'Não é vermelho.'), ex('We are not ready.', 'Nós não estamos prontos.'), ex('They are not teachers.', 'Eles não são professores.'), ex('I am not a doctor.', 'Eu não sou médico.'), ex('He is not here.', 'Ele não está aqui.'), ex('She is not angry.', 'Ela não está brava.'), ex('We are not at home.', 'Nós não estamos em casa.'), ex('They are not friends.', 'Eles não são amigos.')],
    mistakes: [mistake('I not am tired.', 'I am not tired.', 'Not vem depois de am.'), mistake('She not is happy.', 'She is not happy.', 'Not vem depois de is.'), mistake('They not are ready.', 'They are not ready.', 'Not vem depois de are.')],
    practice: [q('Complete: I am ___ tired.', ['not', 'no', 'never'], 'not'), q('Complete: She ___ not from Brazil.', ['is', 'are', 'am'], 'is'), q('Complete: They ___ not ready.', ['are', 'is', 'am'], 'are'), q('Qual está correta?', ['I am not late.', 'I not am late.', 'I am late not.'], 'I am not late.'), q('Negue: He is a teacher.', ['He is not a teacher.', 'He not is a teacher.', 'He is teacher not.'], 'He is not a teacher.'), q('Negue: We are friends.', ['We are not friends.', 'We not are friends.', 'We is not friends.'], 'We are not friends.'), q('Traduza: Ela não está feliz.', ['She is not happy.', 'She are not happy.', 'She not is happy.'], 'She is not happy.'), q('Complete: It ___ not blue.', ['is', 'are', 'am'], 'is'), q('Qual frase é negativa?', ['They are not here.', 'They are here.', 'Are they here?'], 'They are not here.'), q('Corrija: You not are ready.', ['You are not ready.', 'You is not ready.', 'You are ready not.'], 'You are not ready.')],
    productionTasks: [prod('Escreva 4 frases negativas sobre você.'), prod('Transforme 3 frases afirmativas em negativas.'), prod('Crie um mini diálogo com uma negativa.')],
  }),
  grammarLesson({
    id: 'A1-GRAMMAR-004', order: 4, title: 'Verb to be — questions', objectives: ['Fazer perguntas com am/is/are.', 'Responder perguntas pessoais simples.'], pattern: 'am/is/are + subject + complement?',
    examples: [ex('Are you a student?', 'Você é estudante?'), ex('Is she your sister?', 'Ela é sua irmã?'), ex('Is he from Brazil?', 'Ele é do Brasil?'), ex('Are they ready?', 'Eles estão prontos?'), ex('Am I late?', 'Eu estou atrasado?'), ex('Is it blue?', 'É azul?'), ex('Are we okay?', 'Nós estamos bem?'), ex('Are you from here?', 'Você é daqui?'), ex('Is she happy?', 'Ela está feliz?'), ex('Is he your teacher?', 'Ele é seu professor?'), ex('Are they friends?', 'Eles são amigos?'), ex('Is it correct?', 'Está correto?')],
    mistakes: [mistake('You are a student?', 'Are you a student?', 'Em pergunta, are vem antes de you.'), mistake('She is happy?', 'Is she happy?', 'Em pergunta, is vem antes de she.'), mistake('They are ready?', 'Are they ready?', 'Em pergunta, are vem antes de they.')],
    practice: [q('Qual pergunta está correta?', ['Are you a student?', 'You are a student?', 'You is a student?'], 'Are you a student?'), q('Complete: ___ she your sister?', ['Is', 'Are', 'Am'], 'Is'), q('Complete: ___ they ready?', ['Are', 'Is', 'Am'], 'Are'), q('Transforme: You are from Brazil.', ['Are you from Brazil?', 'Is you from Brazil?', 'You are from Brazil?'], 'Are you from Brazil?'), q('Transforme: He is happy.', ['Is he happy?', 'He is happy?', 'Are he happy?'], 'Is he happy?'), q('Qual pergunta usa I?', ['Am I late?', 'Is I late?', 'Are I late?'], 'Am I late?'), q('Traduza: Ela é sua amiga?', ['Is she your friend?', 'She is your friend?', 'Are she your friend?'], 'Is she your friend?'), q('Qual é pergunta?', ['Are we okay?', 'We are okay.', 'We are not okay.'], 'Are we okay?'), q('Complete: ___ it correct?', ['Is', 'Are', 'Am'], 'Is'), q('Corrija: They are friends?', ['Are they friends?', 'Is they friends?', 'They friends are?'], 'Are they friends?')],
    productionTasks: [prod('Escreva 5 perguntas com am/is/are.'), prod('Crie perguntas para uma apresentação pessoal.'), prod('Transforme 3 afirmações em perguntas.')],
  }),
  grammarLesson({
    id: 'A1-GRAMMAR-005', order: 5, title: 'Short answers with to be', objectives: ['Responder com Yes/No + pronome + to be.', 'Usar respostas curtas naturais.'], pattern: 'Yes/No + subject pronoun + am/is/are',
    examples: [ex('Are you ready? Yes, I am.', 'Você está pronto? Sim, estou.'), ex('Are you tired? No, I am not.', 'Você está cansado? Não, não estou.'), ex('Is she your sister? Yes, she is.', 'Ela é sua irmã? Sim, ela é.'), ex('Is he from Brazil? No, he is not.', 'Ele é do Brasil? Não, ele não é.'), ex('Are they students? Yes, they are.', 'Eles são estudantes? Sim, são.'), ex('Is it correct? Yes, it is.', 'Está correto? Sim, está.'), ex('Are we late? No, we are not.', 'Estamos atrasados? Não, não estamos.'), ex('Am I right? Yes, you are.', 'Eu estou certo? Sim, você está.'), ex('Is Ana here? Yes, she is.', 'Ana está aqui? Sim, ela está.'), ex('Is Pedro your friend? Yes, he is.', 'Pedro é seu amigo? Sim, ele é.'), ex('Are the books new? No, they are not.', 'Os livros são novos? Não, não são.'), ex('Is the phone black? Yes, it is.', 'O telefone é preto? Sim, é.')],
    mistakes: [mistake('Are you ready? Yes, I are.', 'Are you ready? Yes, I am.', 'A resposta concorda com I.'), mistake('Is she happy? Yes, she are.', 'Is she happy? Yes, she is.', 'Com she, use is.'), mistake('Are they here? Yes, they is.', 'Are they here? Yes, they are.', 'Com they, use are.')],
    practice: [q('Are you ready?', ['Yes, I am.', 'Yes, I are.', 'Yes, I is.'], 'Yes, I am.'), q('Is she your sister?', ['Yes, she is.', 'Yes, she are.', 'Yes, she am.'], 'Yes, she is.'), q('Are they students?', ['Yes, they are.', 'Yes, they is.', 'Yes, they am.'], 'Yes, they are.'), q('Is it correct?', ['Yes, it is.', 'Yes, it are.', 'Yes, it am.'], 'Yes, it is.'), q('Are we late?', ['No, we are not.', 'No, we is not.', 'No, we am not.'], 'No, we are not.'), q('Is he from Brazil?', ['No, he is not.', 'No, he are not.', 'No, he am not.'], 'No, he is not.'), q('Complete: Are you okay? Yes, I ___.', ['am', 'is', 'are'], 'am'), q('Complete: Is she here? No, she ___ not.', ['is', 'are', 'am'], 'is'), q('Complete: Are they ready? Yes, they ___.', ['are', 'is', 'am'], 'are'), q('Corrija: Yes, I are.', ['Yes, I am.', 'Yes, I is.', 'Yes, I be.'], 'Yes, I am.')],
    productionTasks: [prod('Responda 6 perguntas com short answers.'), prod('Crie 3 perguntas e responda com Yes/No.'), prod('Faça um mini diálogo com duas respostas curtas.')],
  }),
  grammarLesson({
    id: 'A1-GRAMMAR-006', order: 6, title: 'Possessive adjectives: my, your, his, her', objectives: ['Usar my, your, his, her.', 'Falar de nome, família e objetos com posse simples.'], pattern: 'possessive adjective + noun',
    examples: [ex('My name is Luis.', 'Meu nome é Luis.'), ex('Your name is Ana.', 'Seu nome é Ana.'), ex('His name is Pedro.', 'O nome dele é Pedro.'), ex('Her name is Maria.', 'O nome dela é Maria.'), ex('My brother is here.', 'Meu irmão está aqui.'), ex('Your phone is black.', 'Seu telefone é preto.'), ex('His car is red.', 'O carro dele é vermelho.'), ex('Her book is new.', 'O livro dela é novo.'), ex('My city is small.', 'Minha cidade é pequena.'), ex('Your country is Brazil.', 'Seu país é o Brasil.'), ex('His sister is a student.', 'A irmã dele é estudante.'), ex('Her teacher is nice.', 'A professora dela é legal.')],
    mistakes: [mistake('I name is Luis.', 'My name is Luis.', 'Para posse, use my, não I.'), mistake('He name is Pedro.', 'His name is Pedro.', 'Para posse dele, use his.'), mistake('She book is new.', 'Her book is new.', 'Para posse dela, use her.')],
    practice: [q('Complete: ___ name is Luis.', ['My', 'I', 'Me'], 'My'), q('Complete: ___ name is Ana. Estou falando com você.', ['Your', 'You', 'My'], 'Your'), q('Complete: ___ name is Pedro. Ele.', ['His', 'He', 'Her'], 'His'), q('Complete: ___ name is Maria. Ela.', ['Her', 'She', 'His'], 'Her'), q('Qual está correta?', ['My phone is black.', 'I phone is black.', 'Me phone is black.'], 'My phone is black.'), q('Corrija: He name is Lucas.', ['His name is Lucas.', 'He is name Lucas.', 'Her name is Lucas.'], 'His name is Lucas.'), q('Corrija: She book is red.', ['Her book is red.', 'His book is red.', 'She is book red.'], 'Her book is red.'), q('Traduza: Meu país é o Brasil.', ['My country is Brazil.', 'I country is Brazil.', 'Me country Brazil.'], 'My country is Brazil.'), q('Qual fala posse de você?', ['your', 'my', 'his'], 'your'), q('Qual fala posse dela?', ['her', 'his', 'my'], 'her')],
    productionTasks: [prod('Escreva 5 frases com my/your/his/her.'), prod('Apresente duas pessoas usando his/her name.'), prod('Descreva 3 objetos com possessivos.')],
  }),
];

const vocabularyLessons = A1_VOCABULARY_MAP.slice(0, 5).map((itemData, index) => createVocabularyLesson({
  id: `A1-VOCABULARY-${String(index + 1).padStart(3, '0')}`, level, order: index + 1, title: itemData.title, status, estimatedMinutes: 25, prerequisites: index ? [`A1-VOCABULARY-${String(index).padStart(3, '0')}`] : [], objectives: [itemData.objective], theme: itemData.title,
  lexicalSets: [{ title: itemData.title, items: ['hello', 'name', 'country', 'city', 'family', 'student', 'teacher', 'friend'].slice(0, 6 + (index % 3)) }],
  pronunciationNotes: ['Repita devagar primeiro.', 'Observe sílabas fortes.', 'Não tente falar rápido antes de falar claro.'],
  examples: ['Hello, my name is Ana.', 'I am from Brazil.', 'This is my family.', 'My phone number is simple.', 'She is my friend.', 'He is a student.', 'We are in class.', 'They are from Canada.'].map((text) => ({ text, translation: 'Exemplo A1 com vocabulário da unidade.' })),
  recognitionPractice: [q('Escolha a palavra mais adequada para cumprimentar.', ['Hello', 'Blue', 'Chair'], 'Hello'), q('Qual palavra fala de país?', ['Brazil', 'Monday', 'Book'], 'Brazil'), q('Qual palavra fala de família?', ['mother', 'city', 'number'], 'mother'), q('Qual é uma pessoa?', ['teacher', 'table', 'red'], 'teacher'), q('Qual é número?', ['ten', 'friend', 'hello'], 'ten'), q('Qual significa nome?', ['name', 'city', 'job'], 'name'), q('Qual pode ser cidade?', ['São Paulo', 'teacher', 'book'], 'São Paulo'), q('Qual é cumprimento?', ['Good morning', 'Seventeen', 'Phone'], 'Good morning')],
  usagePractice: [prod('Escreva 3 palavras novas da aula.'), prod('Crie 2 frases simples com o vocabulário.'), prod('Associe palavra + tradução em voz alta.'), prod('Faça uma mini apresentação usando 4 palavras.'), prod('Revise as palavras que você confundiu.'), prod('Crie um exemplo próprio.')],
  productionTasks: [prod('Use 5 palavras em frases suas.'), prod('Grave ou leia as palavras em voz alta.')],
  masteryCriteria: { minRecognitionAccuracy: 80, tags: itemData.tags },
}));

const readingTexts = [
  `Hello! My name is Ana. I am a student from Brazil. I live in a small city with my mother, my father, and my brother. My brother is twelve years old, and he is very funny. I study English at home every day. My teacher is kind, and my class is small. I like English because I can meet new people and read simple messages. In the morning, I say hello to my friends. In the afternoon, I study and write short sentences. At night, I read my notebook again. My goal is simple: I want to speak slowly, clearly, and correctly.`,
  `This is Lucas. He is from Brazil, but his best friend is from Canada. Lucas is twenty years old. He is a worker and a student. In the morning, he works in a small shop. In the evening, he studies English on his phone. His favorite words are hello, friend, city, country, and family. Lucas is not perfect, but he is consistent. He writes one sentence every day: My name is Lucas. I am from Brazil. I am a student. I like English. His teacher says that short sentences are good for beginners. Lucas likes this idea because he can learn without fear.`,
  `My family is small, but it is very important to me. My mother is a teacher, and my father is a driver. My sister is a student. Her name is Carla. She is fifteen years old. We live in Brazil. Our house is simple and comfortable. In the morning, my mother works, my father drives, and my sister studies. I study English in the evening. I like to write about my family because the words are useful: mother, father, sister, brother, family, house, and student. These words help me talk about my life in English.`,
];
const readingLessons = ['Short introductions', 'A simple profile', 'A family description'].map((title, index) => createReadingLesson({
  id: `A1-READING-${String(index + 1).padStart(3, '0')}`, level, order: index + 1, title, status, estimatedMinutes: 30, prerequisites: index ? [`A1-READING-${String(index).padStart(3, '0')}`] : [], objectives: ['Ler texto A1 sem traduzir tudo.', 'Responder usando evidência textual.'],
  preReading: ['Observe título e nomes.', 'Procure palavras conhecidas antes de responder.', 'Não tente traduzir palavra por palavra.'], mainText: readingTexts[index],
  vocabulary: ['name', 'student', 'Brazil', 'city', 'family', 'teacher', 'friend', 'English'].map((word) => ({ word, meaning: 'vocabulário essencial A1', example: `The word ${word} appears in the text.` })),
  comprehensionQuestions: [q(`${title} — qual é o assunto principal do texto?`, ['apresentação pessoal/família', 'receita de comida', 'história de viagem'], 'apresentação pessoal/família', 'O texto fala de informações pessoais.'), q(`${title} — o texto fala sobre o Brasil?`, ['Sim', 'Não'], 'Sim', 'Procure Brazil no texto como evidência.'), q(`${title} — há pessoas no texto?`, ['Sim', 'Não'], 'Sim', 'O texto menciona nomes próprios e pronomes pessoais.'), q(`${title} — o texto usa frases curtas?`, ['Sim', 'Não'], 'Sim', 'As frases seguem estrutura sujeito + verbo + complemento, típica de A1.'), q(`${title} — qual palavra aparece no texto?`, ['English', 'airplane', 'hospital'], 'English', 'English aparece no texto. As outras não pertencem ao conteúdo.'), q(`${title} — o texto é adequado para A1?`, ['Sim', 'Não'], 'Sim', 'O texto usa vocabulário simples e frases curtas adequadas para A1.'), q(`${title} — a pessoa estuda inglês?`, ['Sim', 'Não'], 'Sim', 'Copie a frase do texto que comprova o estudo de inglês.'), q(`${title} — o texto tem informações pessoais?`, ['Sim', 'Não'], 'Sim', 'Nome, país, rotina e família são informações pessoais presentes no texto.')],
  evidenceTasks: ['Copie uma frase com name.', 'Copie uma frase com Brazil.', 'Copie uma frase com student.', 'Copie uma frase que fale de família ou amigo.'].map((instruction) => ({ instruction, evidenceRequired: true })),
  shortResponse: [prod('Resuma em português o que você entendeu.'), prod('Escreva 2 frases parecidas sobre você.')], productionTask: prod('Escreva uma mini apresentação parecida com o texto.'),
  masteryCriteria: { minComprehensionAccuracy: 75, evidenceRequired: true },
}));

const scriptBase = `Hello. My name is Ana. I am from Brazil. I live in a small city. I am a student, and I study English every day. My friend is Lucas. He is from Brazil too. In the morning, I say hello to my family. In the afternoon, I study new words. In the evening, I listen and repeat short sentences. English is new for me, but I am calm. I speak slowly. I repeat names, numbers, countries, and cities. My goal is to understand simple conversations and answer with short sentences.`;
const listeningLessons = ['Greetings and names', 'Spelling names', 'Numbers and phone numbers', 'Countries and cities'].map((title, index) => createListeningLesson({
  id: `A1-LISTENING-${String(index + 1).padStart(3, '0')}`, level, order: index + 1, title, status, estimatedMinutes: 30, prerequisites: index ? [`A1-LISTENING-${String(index).padStart(3, '0')}`] : [], objectives: ['Entender áudio curto em camadas.', 'Identificar informação explícita.'],
  audioScript: scriptBase, transcript: scriptBase,
  firstListenTasks: ['Ouça sem ler e identifique o assunto geral.', 'Anote um nome que você ouviu.', 'Anote uma palavra conhecida.'].map((instruction) => ({ instruction })),
  secondListenTasks: ['Identifique país.', 'Identifique cidade.', 'Identifique rotina.', 'Identifique uma palavra de família.', 'Identifique objetivo da pessoa.'].map((instruction) => ({ instruction })),
  vocabulary: ['hello', 'name', 'Brazil', 'city', 'student', 'friend', 'morning', 'evening'].map((word) => ({ word, meaning: 'palavra do áudio' })),
  shadowing: ['Hello.', 'My name is Ana.', 'I am from Brazil.', 'I live in a small city.', 'I study English every day.', 'I speak slowly.'],
  teacherOpening: `Nesta aula vamos ouvir sobre ${title}. O objetivo é identificar palavras-chave e repetir frases curtas com clareza.`,
  lessonRecap: [`Você conclui ${title} quando consegue identificar palavras-chave e repetir frases do áudio.`],
  listeningComprehension: [q(`${title} — a pessoa fala o nome?`, ['Sim', 'Não'], 'Sim', 'No áudio, a pessoa diz My name is Ana.'), q(`${title} — a pessoa é do Brasil?`, ['Sim', 'Não'], 'Sim', 'A pessoa diz I am from Brazil.'), q(`${title} — ela estuda inglês?`, ['Sim', 'Não'], 'Sim', 'Ela diz I study English every day.'), q(`${title} — ela fala rápido ou devagar?`, ['devagar', 'rápido'], 'devagar', 'A pessoa diz I speak slowly.'), q(`${title} — Lucas é amigo?`, ['Sim', 'Não'], 'Sim', 'No áudio: My friend is Lucas.'), q(`${title} — o áudio fala de rotina?`, ['Sim', 'Não'], 'Sim', 'O áudio menciona morning, afternoon, evening.'), q(`${title} — o objetivo é entender conversas simples?`, ['Sim', 'Não'], 'Sim', 'O áudio diz My goal is to understand simple conversations.'), q(`${title} — o áudio é A1?`, ['Sim', 'Não'], 'Sim', 'O áudio usa vocabulário e estruturas adequados para A1.')],
  masteryCriteria: { minListeningAccuracy: 70, shadowingRequired: 4 },
}));

const speakingLessons = ['Say hello and goodbye', 'Introduce yourself', 'Spell your name', 'Say your country and city'].map((title, index) => createSpeakingLesson({
  id: `A1-SPEAKING-${String(index + 1).padStart(3, '0')}`, level, order: index + 1, title, status, estimatedMinutes: 25, prerequisites: index ? [`A1-SPEAKING-${String(index).padStart(3, '0')}`] : [], objectives: ['Falar frases curtas com clareza.', 'Usar modelo antes de criar resposta própria.'],
  modelPhrases: ['Hello.', 'Good morning.', 'My name is Luis.', 'I am from Brazil.', 'I live in Santa Maria.', 'Nice to meet you.', 'How are you?', 'I am fine.'],
  substitutionDrills: ['My name is Ana → My name is Luis', 'I am from Brazil → I am from Canada', 'I live in Rio → I live in Santa Maria', 'Good morning → Good evening', 'I am fine → I am okay', 'Nice to meet you → Nice to meet you too', 'Hello, Ana → Hello, Luis', 'I am a student → I am a worker'].map((instruction) => ({ instruction })),
  pronunciationFocus: { title: 'Clareza antes de velocidade', tips: ['Fale devagar.', 'Separe as palavras.', 'Repita o modelo 3 vezes.'] },
  guidedSpeaking: ['Repita o modelo.', 'Troque uma palavra.', 'Responda uma pergunta.', 'Junte duas frases.', 'Leia em voz alta.'].map((instruction) => ({ instruction })),
  recordingTasks: [prod('Grave uma saudação e seu nome.'), prod('Grave país e cidade.')], freeSpeaking: [prod('Fale por 20–30 segundos sobre você usando frases A1.')],
  masteryCriteria: { recordingRequired: true, minChecklist: 3 },
}));

const writingLessons = ['Write simple sentences', 'Write your name and country', 'Write a personal introduction'].map((title, index) => createWritingLesson({
  id: `A1-WRITING-${String(index + 1).padStart(3, '0')}`, level, order: index + 1, title, status, estimatedMinutes: 35, prerequisites: index ? [`A1-WRITING-${String(index).padStart(3, '0')}`] : [], objectives: ['Escrever frases curtas corretas.', 'Usar modelo antes da produção livre.'],
  modelText: 'Hello. My name is Ana. I am from Brazil. I live in a small city. I am a student. I like English. I study every day. Nice to meet you.',
  writingBlocks: ['Hello.', 'My name is...', 'I am from...', 'I live in...', 'I am a student.', 'I like English.', 'Nice to meet you.'],
  guidedSubstitution: ['Ana → Luis', 'Brazil → Canada', 'student → worker', 'small city → big city', 'English → music'].map((instruction) => ({ instruction })),
  grammarForWriting: ['Use letra maiúscula no começo.', 'Use ponto final.', 'Use I am, não I is.', 'Use My name is, não My name.'],
  checklist: ['Comecei com letra maiúscula.', 'Usei ponto final.', 'Usei frases curtas.', 'Revisei am/is/are.'],
  draftTask: prod('Escreva um rascunho com 4 a 6 frases.'), revisionTask: prod('Revise usando o checklist e escreva a versão final.'),
  masteryCriteria: { finalDraftRequired: true, checklistRequired: true },
}));

export const A1_FOUNDATIONS_LESSONS = Object.freeze([...grammarLessons, ...vocabularyLessons, ...readingLessons, ...listeningLessons, ...speakingLessons, ...writingLessons]);
export const A1_FOUNDATIONS_BY_PILLAR = Object.freeze({ grammar: grammarLessons, vocabulary: vocabularyLessons, reading: readingLessons, listening: listeningLessons, speaking: speakingLessons, writing: writingLessons });
export function getA1FoundationsLessons() { return A1_FOUNDATIONS_LESSONS; }
export function getA1FoundationsByPillar(pillar) { return A1_FOUNDATIONS_BY_PILLAR[pillar] || []; }
