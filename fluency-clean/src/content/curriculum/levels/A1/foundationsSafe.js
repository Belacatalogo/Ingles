import {
  createGrammarLesson,
  createListeningLesson,
  createReadingLesson,
  createSpeakingLesson,
  createVocabularyLesson,
  createWritingLesson,
} from '../../../schemas/index.js';
import { A1_VOCABULARY_MAP } from '../../a1Map.js';

const level = 'A1';
const status = 'ready';
function q(question, options, answer, explanation = '') { return { question, options, answer, explanation }; }
function ex(english, translation = '', note = '') { return { english, translation, note }; }
function prod(instruction, expected = '') { return { instruction, expected }; }
function section(title, content) { return { title, content }; }
function mistake(wrong, right, why) { return { wrong, right, why }; }

const grammarTopics = [
  {
    title: 'Subject pronouns',
    pattern: 'subject pronoun + verb/information',
    explanation: [
      section('Abertura do professor', 'Nesta aula você vai aprender os subject pronouns: I, you, he, she, it, we e they. Eles ficam no começo da frase e mostram quem faz ou recebe a informação.'),
      section('Padrão central', 'Em inglês A1, quase toda frase precisa de um sujeito claro. Em vez de repetir o nome sempre, usamos um pronome: Luis → he, Ana → she, a book → it, Ana and Luis → they.'),
      section('Como escolher', 'Use I para eu, you para você/vocês, he para homem/menino, she para mulher/menina, it para coisa/animal/ideia, we para nós e they para eles/elas.'),
      section('Erro comum', 'Brasileiros às vezes pulam o sujeito porque em português dizemos “sou”, “é”, “estamos”. Em inglês, escreva o sujeito: I am, she is, we are.'),
      section('Produção', 'Depois dos exemplos, escreva frases sobre pessoas reais: você, alguém da família, um objeto e um grupo de pessoas.'),
    ],
    examples: [
      ex('I am Luis.', 'Eu sou Luis.', 'I = eu.'),
      ex('You are Ana.', 'Você é Ana.', 'You = você.'),
      ex('He is Pedro.', 'Ele é Pedro.', 'He = ele.'),
      ex('She is Maria.', 'Ela é Maria.', 'She = ela.'),
      ex('It is a book.', 'É um livro.', 'It = coisa/objeto.'),
      ex('We are students.', 'Nós somos estudantes.', 'We = nós.'),
      ex('They are friends.', 'Eles/elas são amigos.', 'They = eles/elas.'),
      ex('Ana and Luis are students. They are students.', 'Ana e Luis são estudantes. Eles são estudantes.', 'They substitui duas ou mais pessoas.'),
    ],
    mistakes: [
      mistake('Am Luis.', 'I am Luis.', 'Em inglês, não pule o sujeito I.'),
      mistake('Ana is my sister. He is kind.', 'Ana is my sister. She is kind.', 'Ana é mulher, então use she.'),
      mistake('My phone is new. He is black.', 'My phone is new. It is black.', 'Para objeto, use it.'),
      mistake('Luis and Pedro are here. We are friends.', 'Luis and Pedro are here. They are friends.', 'Quando você fala de outras pessoas, use they; use we quando você está incluído.'),
    ],
    guided: [
      q('Complete: ___ am Luis.', ['He', 'I', 'She'], 'I', 'Com am, o sujeito é I.'),
      q('Complete: ___ is Ana.', ['They', 'She', 'We'], 'She', 'Ana = she.'),
      q('Complete: ___ is a book.', ['It', 'He', 'They'], 'It', 'Objeto/coisa = it.'),
      q('Complete: Ana and Luis are friends. ___ are friends.', ['He', 'It', 'They'], 'They', 'Duas pessoas = they.'),
      q('Qual frase está correta?', ['Is my phone.', 'It is my phone.', 'My phone it.'], 'It is my phone.', 'A frase precisa de sujeito + verbo.'),
      q('Qual pronome substitui “Luis”?', ['He', 'She', 'It'], 'He', 'Luis é homem, então use he.'),
      q('Qual pronome substitui “my mother”?', ['She', 'He', 'They'], 'She', 'Mother é mulher, então use she.'),
      q('Qual pronome substitui “my friends”?', ['It', 'They', 'He'], 'They', 'Mais de uma pessoa = they.'),
      q('Qual frase evita erro de português?', ['I am a student.', 'Am a student.', 'Student I am a.'], 'I am a student.', 'Em inglês, não pule o sujeito I.'),
      q('Escolha o modelo correto.', ['They are friends.', 'They is friends.', 'They friends are.'], 'They are friends.', 'They combina com are, não com is.'),
    ],
    transforms: [
      q('Substitua “Maria” por pronome: Maria is my friend.', ['She is my friend.', 'He is my friend.', 'It is my friend.'], 'She is my friend.', 'Maria é mulher = she.'),
      q('Substitua “the book” por pronome: The book is blue.', ['He is blue.', 'It is blue.', 'They are blue.'], 'It is blue.', 'Book é objeto, use it.'),
      q('Corrija: Is Ana.', ['She is Ana.', 'Ana she.', 'They is Ana.'], 'She is Ana.', 'Faltava o sujeito she antes de is.'),
      q('Corrija: Luis and Ana is here.', ['They are here.', 'It is here.', 'He are here.'], 'They are here.', 'Duas pessoas = they + are, não is.'),
    ],
  },
  {
    title: 'Verb to be — affirmative',
    pattern: 'subject + am/is/are + complement',
    explanation: [
      section('Abertura do professor', 'Nesta aula você vai usar o verb to be em frases afirmativas. Ele aparece como am, is ou are e liga o sujeito a uma informação.'),
      section('Padrão central', 'Use I am, he/she/it is e you/we/they are. Não traduza palavra por palavra; pense em blocos prontos.'),
      section('Quando usar', 'Use para nome, profissão, estado, origem, cor, lugar e descrição: I am Luis, she is happy, they are students.'),
      section('Erro comum', 'O erro comum é trocar am/is/are: I is, she are, they is. Memorize o par: I am / she is / they are.'),
      section('Produção', 'Escreva frases afirmativas sobre você, uma pessoa, um objeto e um grupo.'),
    ],
    examples: [
      ex('I am a student.', 'Eu sou estudante.'),
      ex('She is happy.', 'Ela está feliz.'),
      ex('They are friends.', 'Eles são amigos.'),
      ex('We are ready.', 'Nós estamos prontos.'),
      ex('It is blue.', 'É azul.'),
      ex('You are kind.', 'Você é gentil.'),
      ex('He is from Brazil.', 'Ele é do Brasil.'),
      ex('My phone is black.', 'Meu celular é preto.'),
    ],
    mistakes: [
      mistake('I is a student.', 'I am a student.', 'Com I, use am.'),
      mistake('She are happy.', 'She is happy.', 'Com she/he/it, use is.'),
      mistake('They is friends.', 'They are friends.', 'Com they/we/you, use are.'),
      mistake('My phone are black.', 'My phone is black.', 'Objeto singular usa is.'),
    ],
    guided: [
      q('Complete: I ___ a student.', ['is', 'am', 'are'], 'am', 'Com I, sempre use am.'),
      q('Complete: She ___ happy.', ['are', 'is', 'am'], 'is', 'Com she/he/it, use is.'),
      q('Complete: They ___ friends.', ['am', 'is', 'are'], 'are', 'Com they/we/you, use are.'),
      q('Qual frase está correta?', ['I am from Brazil.', 'I is from Brazil.', 'I are from Brazil.'], 'I am from Brazil.', 'I combina com am, não is ou are.'),
      q('Corrija: She are here.', ['She am here.', 'She is here.', 'She here is.'], 'She is here.', 'She combina com is, não are.'),
      q('Complete: We ___ ready.', ['are', 'is', 'am'], 'are', 'Com we, sempre use are.'),
      q('Complete: It ___ blue.', ['are', 'am', 'is'], 'is', 'Com it, use is.'),
      q('Qual opção usa you corretamente?', ['You is kind.', 'You are kind.', 'You am kind.'], 'You are kind.', 'You combina com are.'),
      q('Complete: My phone ___ black.', ['is', 'are', 'am'], 'is', 'Objeto singular = is.'),
      q('Escolha a frase afirmativa correta.', ['He is from Brazil.', 'Is he from Brazil?', 'He not is from Brazil.'], 'He is from Brazil.', 'A afirmativa segue sujeito + is + complemento.'),
    ],
    transforms: [
      q('Corrija: He are a teacher.', ['He am a teacher.', 'He is a teacher.', 'He teacher is.'], 'He is a teacher.', 'He combina com is, não are.'),
      q('Corrija: They is students.', ['They are students.', 'They am students.', 'They students are.'], 'They are students.', 'They combina com are, não is.'),
      q('Monte a frase correta.', ['A student I am.', 'I am a student.', 'I student am.'], 'I am a student.', 'Ordem: sujeito + to be + complemento.'),
      q('Escolha o bloco correto para “ela está pronta”.', ['She are ready.', 'She is ready.', 'She am ready.'], 'She is ready.', 'She combina com is.'),
    ],
  },
  {
    title: 'Verb to be — negative',
    pattern: 'subject + am/is/are + not + complement',
    explanation: [section('Abertura do professor', 'Agora você vai negar frases com to be usando not.'), section('Padrão central', 'O not vem depois de am/is/are: I am not, she is not, they are not.'), section('Contrações úteis', 'Na fala e em textos informais, você verá isn’t e aren’t. Para A1, entenda primeiro a forma completa.'), section('Erro comum', 'Não diga I not am ou she not is. A ordem segura é sujeito + to be + not.'), section('Produção', 'Crie frases negativas simples sobre rotina, estado e origem.')],
    examples: [ex('I am not tired.', 'Eu não estou cansado.'), ex('She is not from Canada.', 'Ela não é do Canadá.'), ex('They are not teachers.', 'Eles não são professores.'), ex('We are not ready.', 'Nós não estamos prontos.'), ex('It is not red.', 'Não é vermelho.'), ex('You are not late.', 'Você não está atrasado.')],
    mistakes: [mistake('I not am tired.', 'I am not tired.', 'Use not depois de am.'), mistake('She not is here.', 'She is not here.', 'Use not depois de is.'), mistake('They not are teachers.', 'They are not teachers.', 'Use not depois de are.'), mistake('It are not blue.', 'It is not blue.', 'It combina com is.')],
    guided: [q('Complete: I am ___ tired.', ['not', 'no', 'don’t'], 'not', 'Com to be negativo, use not depois de am.'), q('Complete: She ___ not here.', ['am', 'are', 'is'], 'is', 'She combina com is.'), q('Complete: They are ___ teachers.', ['not', 'no', 'is'], 'not', 'Para negar, coloque not depois de are.'), q('Qual frase é negativa?', ['We are ready.', 'Are we ready?', 'We are not ready.'], 'We are not ready.', 'A frase negativa tem not depois de are.'), q('Corrija: I not am late.', ['I am not late.', 'I not late am.', 'I no am late.'], 'I am not late.', 'A ordem correta é I am not, não I not am.'), q('Complete: It ___ not red.', ['is', 'are', 'am'], 'is', 'It combina com is.'), q('Qual opção está correta?', ['She is not my sister.', 'She not is my sister.', 'She no my sister.'], 'She is not my sister.', 'Ordem: sujeito + is + not + complemento.'), q('Complete: You ___ not wrong.', ['are', 'is', 'am'], 'are', 'You combina com are.')],
    transforms: [q('Transforme: I am ready.', ['I am not ready.', 'I not am ready.', 'I am ready not.'], 'I am not ready.', 'Coloque not depois de am.'), q('Transforme: She is happy.', ['She is not happy.', 'She not is happy.', 'She is happy not.'], 'She is not happy.', 'Coloque not depois de is.'), q('Transforme: They are here.', ['They are not here.', 'They not are here.', 'They is not here.'], 'They are not here.', 'Coloque not depois de are.'), q('Corrija: It are not new.', ['It is not new.', 'It am not new.', 'It not is new.'], 'It is not new.', 'It combina com is, não are.')],
  },
  {
    title: 'Verb to be — questions',
    pattern: 'am/is/are + subject + complement?',
    explanation: [section('Abertura do professor', 'Nesta aula você vai transformar frases com to be em perguntas.'), section('Padrão central', 'Para perguntar, traga am/is/are para o começo: You are ready → Are you ready?'), section('Quando usar', 'Use para perguntar nome, origem, estado, profissão, lugar ou descrição.'), section('Erro comum', 'Não use “Do you are”. Com to be, a pergunta começa com am/is/are.'), section('Produção', 'Crie perguntas curtas para uma conversa A1.')],
    examples: [ex('Are you a student?', 'Você é estudante?'), ex('Is she your sister?', 'Ela é sua irmã?'), ex('Are they ready?', 'Eles estão prontos?'), ex('Is it correct?', 'Está correto?'), ex('Am I late?', 'Estou atrasado?'), ex('Are we okay?', 'Nós estamos bem?')],
    mistakes: [mistake('You are ready?', 'Are you ready?', 'Em pergunta, are vai para o começo.'), mistake('Do you are a student?', 'Are you a student?', 'Não use do com to be.'), mistake('Is they ready?', 'Are they ready?', 'They combina com are.'), mistake('Are she here?', 'Is she here?', 'She combina com is.')],
    guided: [q('Qual opção é pergunta?', ['You are ready.', 'Are you ready?', 'You are not ready.'], 'Are you ready?', 'Pergunta com to be: are vem antes do sujeito.'), q('Complete: ___ she your sister?', ['Are', 'Am', 'Is'], 'Is', 'She combina com is.'), q('Complete: ___ they ready?', ['Are', 'Is', 'Am'], 'Are', 'They combina com are.'), q('Corrija: Do you are a student?', ['Are you a student?', 'Do you student?', 'You are a student?'], 'Are you a student?', 'Com to be, não use do. Pergunte: Are you...?'), q('Qual pergunta está correta?', ['Is it correct?', 'It is correct?', 'Do it is correct?'], 'Is it correct?', 'It combina com is na frente: Is it...?'), q('Complete: ___ I late?', ['Am', 'Are', 'Is'], 'Am', 'I combina com am.'), q('Qual pergunta combina com “we”?', ['Is we okay?', 'Are we okay?', 'Am we okay?'], 'Are we okay?', 'We combina com are.'), q('Escolha a pergunta A1 correta.', ['Are you from Brazil?', 'Do you are from Brazil?', 'You from Brazil are?'], 'Are you from Brazil?', 'Are you + complemento é a pergunta correta.')],
    transforms: [q('Transforme em pergunta: You are ready.', ['Are you ready?', 'You are ready?', 'Is you ready?'], 'Are you ready?', 'Mova are para o início.'), q('Transforme: She is here.', ['Is she here?', 'She is here?', 'Are she here?'], 'Is she here?', 'Mova is para o início.'), q('Transforme: They are students.', ['Are they students?', 'Is they students?', 'They are students?'], 'Are they students?', 'Mova are para o início.'), q('Corrija: Are it blue?', ['Is it blue?', 'It is blue?', 'Am it blue?'], 'Is it blue?', 'It combina com is, não are.')],
  },
  {
    title: 'Short answers with to be',
    pattern: 'Yes/No + subject + am/is/are',
    explanation: [section('Abertura do professor', 'Nesta aula você vai responder perguntas com to be usando short answers.'), section('Padrão central', 'Em inglês, não respondemos só “yes” ou “no” o tempo todo. Use: Yes, I am. No, she is not. Yes, they are.'), section('Quando usar', 'Use depois de perguntas com am/is/are: Are you ready? Yes, I am.'), section('Erro comum', 'Não responda “Yes, I do” para pergunta com to be. Do aparece em outro tipo de pergunta.'), section('Produção', 'Treine pergunta + resposta curta em pares.')],
    examples: [ex('Are you ready? Yes, I am.', 'Você está pronto? Sim, estou.'), ex('Is she here? No, she is not.', 'Ela está aqui? Não, não está.'), ex('Are they students? Yes, they are.', 'Eles são estudantes? Sim, são.'), ex('Is it blue? No, it is not.', 'É azul? Não, não é.'), ex('Am I late? No, you are not.', 'Estou atrasado? Não, você não está.')],
    mistakes: [mistake('Are you ready? Yes, I do.', 'Are you ready? Yes, I am.', 'Pergunta com are pede resposta com am/are.'), mistake('Is she here? Yes, she are.', 'Is she here? Yes, she is.', 'She combina com is.'), mistake('Are they students? Yes, they is.', 'Are they students? Yes, they are.', 'They combina com are.'), mistake('Is it correct? No, it are not.', 'Is it correct? No, it is not.', 'It combina com is.')],
    guided: [q('Resposta correta para “Are you ready?”', ['Yes, I do.', 'Yes, I am.', 'Yes, I is.'], 'Yes, I am.', 'Pergunta com are pede short answer com am.'), q('Resposta correta para “Is she here?”', ['Yes, she is.', 'Yes, she are.', 'Yes, she am.'], 'Yes, she is.', 'She combina com is na short answer.'), q('Resposta correta para “Are they students?”', ['Yes, they is.', 'Yes, they are.', 'Yes, they am.'], 'Yes, they are.', 'They combina com are.'), q('Resposta negativa para “Is it blue?”', ['No, it is not.', 'No, it are not.', 'No, it do not.'], 'No, it is not.', 'It combina com is not na resposta negativa.'), q('Qual resposta combina com to be?', ['No, I am not.', 'No, I do not.', 'No, I have not.'], 'No, I am not.', 'Pergunta com to be pede resposta com to be.'), q('Complete: Are we okay? Yes, we ___.', ['is', 'are', 'am'], 'are', 'We combina com are na short answer.'), q('Complete: Am I late? No, you ___ not.', ['am', 'is', 'are'], 'are', 'A resposta para I = you, e you combina com are.'), q('Qual par está correto?', ['Is he here? Yes, he is.', 'Is he here? Yes, he are.', 'Is he here? Yes, he do.'], 'Is he here? Yes, he is.')],
    transforms: [q('Complete a resposta: Are you Brazilian? Yes, I ___.', ['am', 'is', 'are'], 'am', 'I combina com am na short answer.'), q('Complete: Is Ana a student? Yes, she ___.', ['are', 'is', 'am'], 'is', 'She combina com is.'), q('Complete: Are Luis and Ana ready? Yes, they ___.', ['are', 'is', 'am'], 'are', 'Duas pessoas = they, they combina com are.'), q('Corrija: Yes, she are.', ['Yes, she is.', 'Yes, she am.', 'Yes, she do.'], 'Yes, she is.')],
  },
  {
    title: 'Possessive adjectives: my, your, his, her',
    pattern: 'possessive adjective + noun',
    explanation: [section('Abertura do professor', 'Nesta aula você vai usar my, your, his e her para falar de posse e relação.'), section('Padrão central', 'Use o possessive adjective antes do nome: my name, your phone, his car, her book.'), section('Diferença importante', 'I é sujeito. My é posse. She é sujeito. Her é posse. He é sujeito. His é posse.'), section('Erro comum', 'Não diga “I name” para “meu nome”. Diga “my name”.'), section('Produção', 'Escreva frases sobre nome, celular, família e objetos pessoais.')],
    examples: [ex('My name is Luis.', 'Meu nome é Luis.'), ex('Your phone is black.', 'Seu celular é preto.'), ex('His name is Pedro.', 'O nome dele é Pedro.'), ex('Her book is new.', 'O livro dela é novo.'), ex('My family is small.', 'Minha família é pequena.'), ex('Her mother is a teacher.', 'A mãe dela é professora.')],
    mistakes: [mistake('I name is Luis.', 'My name is Luis.', 'Para posse, use my.'), mistake('She book is new.', 'Her book is new.', 'She é sujeito; her é posse.'), mistake('He phone is black.', 'His phone is black.', 'He é sujeito; his é posse.'), mistake('You name is Ana.', 'Your name is Ana.', 'You é sujeito; your é posse.')],
    guided: [q('Complete: ___ name is Ana.', ['She', 'Her', 'He'], 'Her', 'Antes de nome, use possessivo her, não she.'), q('Complete: ___ phone is black.', ['I', 'Me', 'My'], 'My', 'Para posse, use my, não I.'), q('Complete: ___ name is Pedro.', ['His', 'He', 'Him'], 'His', 'Antes de nome, use possessivo his, não he.'), q('Qual frase está correta?', ['I name is Luis.', 'My name is Luis.', 'Me name is Luis.'], 'My name is Luis.', 'I é sujeito; my é possessivo.'), q('Complete: ___ book is new.', ['Her', 'She', 'He'], 'Her', 'Antes de substantivo, use her para indicar posse.'), q('Qual palavra indica posse?', ['my', 'I', 'am'], 'my', 'My indica posse. I é sujeito e am é verbo.'), q('Complete: ___ family is small.', ['My', 'I', 'Me'], 'My', 'Antes de family, use possessivo my.'), q('Corrija: You phone is blue.', ['Your phone is blue.', 'You are phone blue.', 'You phone blue is.'], 'Your phone is blue.', 'You é sujeito; your é possessivo.')],
    transforms: [q('Corrija: I name is Luis.', ['My name is Luis.', 'Me name is Luis.', 'I am name Luis.'], 'My name is Luis.', 'Para posse, troque I por my.'), q('Corrija: She book is here.', ['Her book is here.', 'His book is here.', 'She is book here.'], 'Her book is here.', 'She é sujeito; her é possessivo.'), q('Corrija: He phone is new.', ['His phone is new.', 'Her phone is new.', 'He is phone new.'], 'His phone is new.', 'He é sujeito; his é possessivo.'), q('Escolha o modelo correto.', ['Your name is Ana.', 'You name is Ana.', 'You are name Ana.'], 'Your name is Ana.', 'Your indica posse; you é sujeito.')],
  },
];

const grammarLessons = grammarTopics.map((topic, index) => createGrammarLesson({
  id: `A1-GRAMMAR-${String(index + 1).padStart(3, '0')}`,
  level,
  order: index + 1,
  title: topic.title,
  status,
  estimatedMinutes: 45,
  prerequisites: index ? [`A1-GRAMMAR-${String(index).padStart(3, '0')}`] : [],
  objectives: [`Entender ${topic.title}.`, 'Usar a estrutura em frases curtas e corretas.', 'Reconhecer erros comuns de brasileiro.'],
  teacherOpening: topic.explanation[0]?.content || `Nesta aula vamos estudar ${topic.title}.`,
  conceptExplanation: topic.explanation[1]?.content || `O padrão central de ${topic.title} é: ${topic.pattern}.`,
  lessonRecap: [topic.explanation[topic.explanation.length - 1]?.content || `Você conclui ${topic.title} quando consegue usar o padrão na prática.`],
  explanationSections: topic.explanation,
  professorExamples: topic.examples,
  commonMistakes: topic.mistakes,
  guidedPractice: topic.guided,
  transformationPractice: topic.transforms,
  productionTasks: [prod('Escreva 5 frases próprias usando o padrão da aula.'), prod('Corrija 3 frases erradas criadas por você.'), prod('Faça uma mini apresentação usando 3 frases.')],
  finalChecklist: ['Entendi a regra principal.', 'Reconheci exemplos corretos.', 'Corrigi erros comuns.', 'Escrevi frases próprias.'],
  masteryCriteria: { minPracticeAccuracy: 75, requiredProduction: 2, tags: ['a1-grammar', topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')] },
}));

const vocabularyLessons = A1_VOCABULARY_MAP.slice(0, 5).map((itemData, index) => createVocabularyLesson({
  id: `A1-VOCABULARY-${String(index + 1).padStart(3, '0')}`,
  level,
  order: index + 1,
  title: itemData.title,
  status,
  estimatedMinutes: 30,
  prerequisites: index ? [`A1-VOCABULARY-${String(index).padStart(3, '0')}`] : [],
  objectives: [itemData.objective || `Aprender vocabulário de ${itemData.title}.`],
  theme: itemData.title,
  teacherOpening: `Nesta aula vamos trabalhar vocabulário de ${itemData.title}. O objetivo é reconhecer, usar e produzir palavras úteis do tema.`,
  lessonRecap: [`Você conclui ${itemData.title} quando consegue reconhecer e usar as palavras em frases curtas.`],
  lexicalSets: [{ title: itemData.title, items: ['hello', 'good morning', 'name', 'country', 'city', 'Brazil', 'family', 'mother', 'father', 'student', 'teacher', 'friend', 'phone', 'number', 'goodbye'] }],
  pronunciationNotes: ['Fale devagar antes de falar rápido.', 'Repita em blocos curtos.', 'Compare som e escrita.'],
  examples: ['Hello, my name is Ana.', 'I am from Brazil.', 'This is my family.', 'My city is small.', 'She is my friend.', 'He is a student.'].map((text) => ({ text, translation: 'Exemplo A1 com vocabulário da unidade.' })),
  recognitionPractice: [q('Qual palavra serve para cumprimentar?', ['Hello', 'Blue', 'Table'], 'Hello', 'Hello é a saudação mais básica em inglês.'), q('Qual palavra fala de país?', ['Brazil', 'Monday', 'Book'], 'Brazil', 'Brazil é nome de país.'), q('Qual palavra fala de família?', ['mother', 'city', 'number'], 'mother', 'Mother é palavra de família.'), q('Qual é uma pessoa?', ['teacher', 'table', 'red'], 'teacher', 'Teacher é pessoa; table é objeto, red é cor.'), q('Qual significa nome?', ['name', 'city', 'job'], 'name', 'Name significa nome em inglês.'), q('Qual pode ser cidade?', ['São Paulo', 'teacher', 'book'], 'São Paulo', 'São Paulo é nome de cidade.')],
  usagePractice: [prod('Escreva 5 palavras da aula.'), prod('Crie 3 frases simples com o vocabulário.'), prod('Leia as palavras em voz alta.')],
  productionTasks: [prod('Use 5 palavras em frases suas.'), prod('Faça uma mini apresentação usando o vocabulário.')],
  masteryCriteria: { minRecognitionAccuracy: 80, tags: itemData.tags || [] },
}));

const readingTexts = [
  'Hello! My name is Ana. I am a student from Brazil. I live in a small city with my mother, my father, and my brother. I study English at home every day. My teacher is kind, and my class is small. I like English because I can meet new people and read simple messages.',
  'This is Lucas. He is from Brazil, but his best friend is from Canada. Lucas is twenty years old. He is a worker and a student. In the evening, he studies English on his phone. He writes one sentence every day: My name is Lucas. I am from Brazil. I am a student.',
  'My family is small, but it is very important to me. My mother is a teacher, and my father is a driver. My sister is a student. Her name is Carla. We live in Brazil. I study English in the evening. These words help me talk about my life in English.',
];
const readingLessons = ['Short introductions', 'A simple profile', 'A family description'].map((title, index) => createReadingLesson({
  id: `A1-READING-${String(index + 1).padStart(3, '0')}`,
  level,
  order: index + 1,
  title,
  status,
  estimatedMinutes: 35,
  prerequisites: index ? [`A1-READING-${String(index).padStart(3, '0')}`] : [],
  objectives: ['Ler sem traduzir tudo.', 'Responder usando evidência textual.'],
  preReading: ['Observe nomes e palavras conhecidas.', 'Leia primeiro pela ideia geral.', 'Depois procure detalhes.'],
  mainText: readingTexts[index],
  vocabulary: ['name', 'student', 'Brazil', 'city', 'family', 'teacher', 'friend', 'English'].map((word) => ({ word, meaning: 'vocabulário essencial A1', example: `The word ${word} appears in the text.` })),
  comprehensionQuestions: [q(`${title} — qual é o assunto principal do texto?`, ['informações pessoais', 'receita', 'viagem longa'], 'informações pessoais', 'O texto apresenta informações pessoais básicas, típicas de A1.'), q(`${title} — o texto fala sobre o Brasil?`, ['Sim', 'Não'], 'Sim', 'Procure a palavra Brazil no texto como evidência.'), q(`${title} — há pessoas no texto?`, ['Sim', 'Não'], 'Sim', 'O texto menciona nomes próprios e pronomes pessoais.'), q(`${title} — o texto usa frases curtas?`, ['Sim', 'Não'], 'Sim', 'As frases têm estrutura sujeito + verbo + complemento, típica de A1.'), q(`${title} — qual palavra aparece no texto?`, ['English', 'airplane', 'hospital'], 'English', 'A palavra English aparece no texto. As outras não fazem parte do conteúdo.'), q(`${title} — a pessoa estuda inglês?`, ['Sim', 'Não'], 'Sim', 'Copie a frase que comprova que a pessoa estuda inglês.')],
  evidenceTasks: ['Copie uma frase com name.', 'Copie uma frase com Brazil.', 'Copie uma frase com student.'].map((instruction) => ({ instruction, evidenceRequired: true })),
  shortResponse: [prod('Resuma em português o que você entendeu.'), prod('Escreva 2 frases parecidas sobre você.')],
  productionTask: prod('Escreva uma mini apresentação parecida com o texto.'),
  masteryCriteria: { minComprehensionAccuracy: 75, evidenceRequired: true },
}));

const scriptBase = 'Hello. My name is Ana. I am from Brazil. I live in a small city. I am a student, and I study English every day. My friend is Lucas. He is from Brazil too. I speak slowly. I repeat names, numbers, countries, and cities. My goal is to understand simple conversations and answer with short sentences.';
const listeningLessons = ['Greetings and names', 'Spelling names', 'Numbers and phone numbers', 'Countries and cities'].map((title, index) => createListeningLesson({
  id: `A1-LISTENING-${String(index + 1).padStart(3, '0')}`,
  level,
  order: index + 1,
  title,
  status,
  estimatedMinutes: 30,
  prerequisites: index ? [`A1-LISTENING-${String(index).padStart(3, '0')}`] : [],
  objectives: ['Entender áudio curto em camadas.', 'Identificar informação explícita.'],
  audioScript: scriptBase,
  transcript: scriptBase,
  firstListenTasks: ['Ouça sem ler e identifique o assunto geral.', 'Anote um nome que você ouviu.'].map((instruction) => ({ instruction })),
  secondListenTasks: ['Identifique país.', 'Identifique cidade.', 'Identifique objetivo da pessoa.'].map((instruction) => ({ instruction })),
  vocabulary: ['hello', 'name', 'Brazil', 'city', 'student', 'friend'].map((word) => ({ word, meaning: 'palavra do áudio' })),
  shadowing: ['Hello.', 'My name is Ana.', 'I am from Brazil.', 'I live in a small city.', 'I study English every day.', 'I speak slowly.'],
  teacherOpening: `Nesta aula vamos ouvir sobre ${title}. O objetivo é identificar palavras-chave e repetir frases curtas com clareza.`,
  lessonRecap: [`Você conclui ${title} quando consegue identificar palavras-chave e repetir frases do áudio.`],
  listeningComprehension: [q(`${title} — a pessoa fala o nome?`, ['Sim', 'Não'], 'Sim', 'No áudio, a pessoa diz My name is Ana.'), q(`${title} — a pessoa é do Brasil?`, ['Sim', 'Não'], 'Sim', 'A pessoa diz I am from Brazil no áudio.'), q(`${title} — ela estuda inglês?`, ['Sim', 'Não'], 'Sim', 'Ela diz I study English every day.'), q(`${title} — ela fala rápido ou devagar?`, ['devagar', 'rápido'], 'devagar', 'A pessoa diz I speak slowly, indicando fala devagar.'), q(`${title} — Lucas é amigo?`, ['Sim', 'Não'], 'Sim', 'No áudio: My friend is Lucas.')],
  masteryCriteria: { minListeningAccuracy: 70, shadowingRequired: 4 },
}));

const speakingLessons = ['Say hello and goodbye', 'Introduce yourself', 'Spell your name', 'Say your country and city'].map((title, index) => createSpeakingLesson({
  id: `A1-SPEAKING-${String(index + 1).padStart(3, '0')}`,
  level,
  order: index + 1,
  title,
  status,
  estimatedMinutes: 30,
  prerequisites: index ? [`A1-SPEAKING-${String(index).padStart(3, '0')}`] : [],
  objectives: ['Falar frases curtas com clareza.', 'Usar modelo antes de criar resposta própria.'],
  modelPhrases: ['Hello.', 'Good morning.', 'My name is Luis.', 'I am from Brazil.', 'I live in Santa Maria.', 'Nice to meet you.', 'How are you?', 'I am fine.'],
  substitutionDrills: ['My name is Ana → My name is Luis', 'I am from Brazil → I am from Canada', 'Good morning → Good evening', 'I am fine → I am okay'].map((instruction) => ({ instruction })),
  pronunciationFocus: { title: 'Clareza antes de velocidade', tips: ['Fale devagar.', 'Separe as palavras.', 'Repita o modelo 3 vezes.'] },
  guidedSpeaking: ['Repita o modelo.', 'Troque uma palavra.', 'Responda uma pergunta.', 'Junte duas frases.'].map((instruction) => ({ instruction })),
  recordingTasks: [prod('Grave uma saudação e seu nome.'), prod('Grave país e cidade.')],
  freeSpeaking: [prod('Fale por 20–30 segundos sobre você usando frases A1.')],
  masteryCriteria: { recordingRequired: true, minChecklist: 3 },
}));

const writingLessons = ['Write simple sentences', 'Write your name and country', 'Write a personal introduction'].map((title, index) => createWritingLesson({
  id: `A1-WRITING-${String(index + 1).padStart(3, '0')}`,
  level,
  order: index + 1,
  title,
  status,
  estimatedMinutes: 35,
  prerequisites: index ? [`A1-WRITING-${String(index).padStart(3, '0')}`] : [],
  objectives: ['Escrever frases curtas corretas.', 'Usar modelo antes da produção livre.'],
  modelText: 'Hello. My name is Ana. I am from Brazil. I live in a small city. I am a student. I like English. I study every day. Nice to meet you.',
  writingBlocks: ['Hello.', 'My name is...', 'I am from...', 'I live in...', 'I am a student.', 'I like English.', 'Nice to meet you.'],
  guidedSubstitution: ['Ana → Luis', 'Brazil → Canada', 'student → worker', 'small city → big city'].map((instruction) => ({ instruction })),
  grammarForWriting: ['Use letra maiúscula no começo.', 'Use ponto final.', 'Use I am, não I is.', 'Use My name is, não My name.'],
  checklist: ['Comecei com letra maiúscula.', 'Usei ponto final.', 'Usei frases curtas.', 'Revisei am/is/are.'],
  draftTask: prod('Escreva um rascunho com 4 a 6 frases.'),
  revisionTask: prod('Revise usando o checklist e escreva a versão final.'),
  masteryCriteria: { finalDraftRequired: true, checklistRequired: true },
}));

export const A1_FOUNDATIONS_LESSONS = Object.freeze([...grammarLessons, ...vocabularyLessons, ...readingLessons, ...listeningLessons, ...speakingLessons, ...writingLessons]);
export const A1_FOUNDATIONS_BY_PILLAR = Object.freeze({ grammar: grammarLessons, vocabulary: vocabularyLessons, reading: readingLessons, listening: listeningLessons, speaking: speakingLessons, writing: writingLessons });
export function getA1FoundationsLessons() { return A1_FOUNDATIONS_LESSONS; }
export function getA1FoundationsByPillar(pillar) { return A1_FOUNDATIONS_BY_PILLAR[pillar] || []; }
