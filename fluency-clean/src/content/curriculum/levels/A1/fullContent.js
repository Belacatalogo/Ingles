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

function q(question, options, answer, explanation = '') { return { question, options, answer, explanation }; }
function ex(english, translation = '', note = '') { return { english, translation, note }; }
function section(title, content) { return { title, content }; }
function mistake(wrong, right, why) { return { wrong, right, why }; }
function prod(instruction, expected = '') { return { instruction, expected }; }
function id(prefix, n) { return `A1-${prefix}-${String(n).padStart(3, '0')}`; }
function slug(text) { return String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function prereq(prefix, n) { return n > 1 ? [id(prefix, n - 1)] : []; }

const GRAMMAR_TOPICS = [
  [7, 'Articles: a / an', 'a/an + singular noun', ['a book', 'an apple', 'a student', 'an email'], ['I have a book.', 'She is an English teacher.', 'It is a phone.', 'This is an apple.']],
  [8, 'Plural nouns', 'singular noun → plural noun', ['book/books', 'student/students', 'box/boxes', 'city/cities'], ['I have two books.', 'They are students.', 'The boxes are big.', 'The cities are beautiful.']],
  [9, 'This / that / these / those', 'demonstrative + noun', ['this book', 'that phone', 'these students', 'those chairs'], ['This is my book.', 'That is your phone.', 'These are my friends.', 'Those are old chairs.']],
  [10, 'There is / there are', 'there is/are + noun + place', ['there is a table', 'there are two chairs'], ['There is a table in the room.', 'There are three books on the desk.', 'There is a teacher here.', 'There are students in class.']],
  [11, 'Have / has', 'subject + have/has + noun', ['I have', 'you have', 'he has', 'she has'], ['I have a phone.', 'She has a sister.', 'They have a car.', 'He has a job.']],
  [12, 'Simple adjectives', 'subject + be + adjective', ['big', 'small', 'new', 'old', 'beautiful'], ['The house is small.', 'My phone is new.', 'She is happy.', 'They are tired.']],
  [13, 'Basic word order', 'subject + verb + complement', ['I am happy', 'She has a book'], ['I am a student.', 'My brother is at home.', 'We have two chairs.', 'They live in Brazil.']],
  [14, 'Present Simple — I / you / we / they', 'subject + base verb', ['I work', 'you study', 'we live', 'they like'], ['I study English.', 'You work here.', 'We live in Brazil.', 'They like coffee.']],
  [15, 'Present Simple — he / she / it', 'he/she/it + verb-s', ['he works', 'she studies', 'it starts'], ['He works every day.', 'She studies English.', 'It starts at nine.', 'My brother likes music.']],
  [16, 'Present Simple negatives', 'subject + do/does not + base verb', ['do not', 'does not'], ['I do not work on Sunday.', 'She does not study at night.', 'They do not live here.', 'He does not like coffee.']],
  [17, 'Present Simple questions', 'Do/Does + subject + base verb?', ['Do you work?', 'Does she study?'], ['Do you study English?', 'Does he work here?', 'Do they like music?', 'Does it start at eight?']],
  [18, 'Adverbs of frequency', 'subject + frequency + verb', ['always', 'usually', 'sometimes', 'never'], ['I always study at night.', 'She usually works in the morning.', 'They sometimes play soccer.', 'He never drinks coffee.']],
  [19, 'Prepositions of place', 'noun + be + place preposition', ['in', 'on', 'under', 'next to', 'near'], ['The book is on the table.', 'My phone is in my bag.', 'The chair is next to the desk.', 'The school is near my house.']],
  [20, 'Prepositions of time', 'at/on/in + time expression', ['at seven', 'on Monday', 'in the morning'], ['I study at night.', 'She works on Monday.', 'We rest in the evening.', 'The class starts at eight.']],
  [21, 'Can / can’t', 'subject + can/can’t + base verb', ['can speak', 'can study', 'can help'], ['I can speak slowly.', 'She can help you.', 'They can study today.', 'He cannot drive.']],
  [22, 'Imperatives', 'base verb + object', ['open', 'listen', 'repeat', 'write'], ['Open your book.', 'Listen and repeat.', 'Write your name.', 'Please sit down.']],
  [23, 'Object pronouns', 'verb/preposition + object pronoun', ['me', 'you', 'him', 'her', 'it', 'us', 'them'], ['Call me.', 'I know him.', 'She helps us.', 'I like it.']],
  [24, 'Basic conjunctions: and, but, because', 'idea + conjunction + idea', ['and', 'but', 'because'], ['I study and work.', 'She is tired but happy.', 'I like English because it is useful.', 'He works and studies.']],
  [25, 'Review Grammar A1 part 1', 'review: to be + nouns + description', ['pronouns', 'to be', 'a/an', 'plural'], ['I am a student.', 'She is not tired.', 'Are they teachers?', 'These are my books.']],
  [26, 'Review Grammar A1 part 2', 'review: present simple + place/time + can', ['present simple', 'prepositions', 'can'], ['I study every day.', 'She works on Monday.', 'The book is on the table.', 'I can help you.']],
  [27, 'Grammar Checkpoint A1', 'complete A1 grammar review', ['checkpoint'], ['I am from Brazil.', 'She studies English.', 'There are books on the table.', 'Can you repeat, please?']],
];

const GRAMMAR_TAGS = {
  7:  ['a1', 'grammar', 'articles', 'a-an', 'noun-phrase', 'beginner-foundation'],
  8:  ['a1', 'grammar', 'plural-nouns', 'regular-plurals', 'singular-plural', 'beginner-foundation'],
  9:  ['a1', 'grammar', 'demonstratives', 'this-that', 'near-far', 'beginner-foundation'],
  10: ['a1', 'grammar', 'existential-there', 'there-is-are', 'describing-place', 'beginner-foundation'],
  11: ['a1', 'grammar', 'have-has', 'possession', 'third-person-s', 'beginner-foundation'],
  12: ['a1', 'grammar', 'adjectives', 'descriptive', 'be-adjective', 'beginner-foundation'],
  13: ['a1', 'grammar', 'word-order', 'svo-pattern', 'sentence-structure', 'beginner-foundation'],
  15: ['a1', 'grammar', 'present-simple', 'third-person-s', 'he-she-it', 'beginner-foundation'],
  16: ['a1', 'grammar', 'present-simple', 'negatives', 'do-not-does-not', 'beginner-foundation'],
  17: ['a1', 'grammar', 'present-simple', 'questions', 'do-does', 'beginner-foundation'],
  18: ['a1', 'grammar', 'adverbs-frequency', 'always-sometimes-never', 'routine-description', 'beginner-foundation'],
  19: ['a1', 'grammar', 'prepositions-place', 'in-on-under', 'location', 'beginner-foundation'],
  20: ['a1', 'grammar', 'prepositions-time', 'at-on-in', 'time-expressions', 'beginner-foundation'],
  27: ['a1', 'grammar', 'checkpoint', 'review', 'gate-prep', 'beginner-foundation'],
};

function grammarLesson([n, title, pattern, chunks, examples]) {
  const baseExamples = examples.concat(chunks.map((chunk) => `Use ${chunk} in a simple sentence.`));
  return createGrammarLesson({
    id: id('GRAMMAR', n), level, order: n, title, status, estimatedMinutes: n >= 25 ? 55 : 45,
    tags: GRAMMAR_TAGS[n],
    prerequisites: prereq('GRAMMAR', n), objectives: [`Entender ${title}.`, 'Usar a estrutura em frases A1 reais.', 'Corrigir erros comuns antes de produzir sozinho.'],
    explanationSections: [
      section('Abertura do professor', `Nesta aula vamos estudar ${title}. O objetivo é transformar a regra em uso prático: reconhecer, completar, corrigir e depois escrever frases próprias.`),
      section('Quando usar', `Use ${title} quando precisar falar de informações reais no A1: pessoas, objetos, rotina, lugares, horários, habilidade ou conexão simples entre ideias.`),
      section('Forma principal', `O padrão central é: ${pattern}. Leia o padrão como uma peça de montagem. Primeiro identifique o sujeito, depois a palavra estrutural e depois a informação final.`),
      section('Exemplos guiados', `Veja exemplos curtos e repita em voz alta. Troque apenas uma palavra por vez para não perder a estrutura. Chunks úteis: ${chunks.join(', ')}.`),
      section('Erro comum de brasileiro', 'Brasileiros costumam traduzir a frase inteira do português. No começo, isso causa ordem errada, falta de verbo auxiliar ou escolha incorreta de pronome. Use blocos prontos e revise devagar.'),
      section('Prática em camadas', 'Primeiro reconheça a forma correta. Depois complete lacunas. Depois corrija erro. Depois transforme a frase. Só no final escreva frases suas.'),
      section('Produção final', 'A produção final deve ter frases pequenas, corretas e úteis. Não tente escrever texto avançado: escreva A1 bem feito.'),
      section('Resumo', `Você conclui esta aula quando consegue explicar ${title} em português simples e usar o padrão ${pattern} sem adivinhar.`),
    ],
    professorExamples: baseExamples.slice(0, 24).map((text) => ex(text, 'Traduza a ideia geral para português e observe a ordem das palavras.')),
    commonMistakes: [
      mistake('I has a book.', 'I have a book.', 'Com I/you/we/they use have.'),
      mistake('She have a phone.', 'She has a phone.', 'Com he/she/it use has quando o tema é have/has.'),
      mistake('Book on table.', 'The book is on the table.', 'Em inglês A1 normalmente precisamos de sujeito e verbo.'),
      mistake('She not study.', 'She does not study.', 'No present simple negativo use does not + verbo base.'),
      mistake('You can to help me.', 'You can help me.', 'Depois de can, use verbo base sem to.'),
    ],
    guidedPractice: [
      q(`Qual exemplo combina com ${title}?`, [examples[0], 'Wrong sentence', 'No answer'], examples[0], 'Use a frase-modelo da aula.'),
      q(`Complete o padrão: ${pattern}`, chunks.slice(0, 3), chunks[0]),
      q('Escolha a frase mais natural.', [examples[1] || examples[0], 'She are a student.', 'I has a book.'], examples[1] || examples[0]),
      q('Qual opção mantém a ordem do inglês?', [examples[2] || examples[0], 'Very happy she is.', 'Book my is.'], examples[2] || examples[0]),
      q('Qual opção é A1 correta?', [examples[3] || examples[0], 'I can to speak.', 'Does she studies?'], examples[3] || examples[0]),
      q('Marque a alternativa segura para iniciante.', [examples[0], 'Advanced mixed sentence', 'Portuguese word order'], examples[0]),
      q('Qual frase você pode repetir como modelo?', [examples[1] || examples[0], 'Bad model', 'Incomplete'], examples[1] || examples[0]),
      q('Qual opção evita tradução palavra por palavra?', [examples[0], 'I with hungry am.', 'The my book blue is.'], examples[0]),
      q('Escolha a frase com estrutura completa.', [examples[2] || examples[0], 'My brother happy.', 'On table book.'], examples[2] || examples[0]),
      q('Qual opção deve virar modelo de produção?', [examples[3] || examples[0], 'Wrong order', 'Missing verb'], examples[3] || examples[0]),
    ],
    transformationPractice: [
      q('Transforme em frase negativa quando possível.', ['I do not study every day.', 'I not study every day.', 'I study not every day.'], 'I do not study every day.'),
      q('Transforme em pergunta quando possível.', ['Do you study English?', 'You do study English?', 'Study you English?'], 'Do you study English?'),
      q('Corrija a ordem da frase.', ['I study English at night.', 'I English study at night.', 'At night English I study.'], 'I study English at night.'),
      q('Escolha a versão mais simples e correta.', ['She is my friend.', 'She my friend is.', 'She friend my.'], 'She is my friend.'),
      q('Complete com uma palavra estrutural correta.', ['is', 'blue', 'table'], 'is'),
      q('Escolha a frase pronta para falar.', ['Can you repeat, please?', 'You can to repeat?', 'Repeat can you please?'], 'Can you repeat, please?'),
    ],
    productionTasks: [prod(`Escreva 5 frases próprias usando ${title}.`), prod('Crie 2 perguntas simples ligadas ao tema.'), prod('Corrija 3 frases erradas antes de concluir.')],
    finalChecklist: ['Reconheci o padrão.', 'Completei lacunas.', 'Corrigi erro comum.', 'Transformei frases.', 'Escrevi produção própria.'],
    masteryCriteria: { minPracticeAccuracy: 75, requiredProduction: 2, tags: ['a1-grammar', slug(title)] },
  });
}

const VOCAB_TOPICS = [
  [6, 'Jobs', ['teacher', 'driver', 'student', 'worker', 'doctor', 'nurse', 'seller', 'cook', 'mechanic', 'police officer', 'receptionist', 'manager', 'assistant', 'farmer', 'engineer']],
  [7, 'Classroom objects', ['book', 'notebook', 'pen', 'pencil', 'desk', 'chair', 'board', 'door', 'window', 'bag', 'phone', 'computer', 'paper', 'eraser', 'ruler']],
  [8, 'Common adjectives', ['big', 'small', 'new', 'old', 'good', 'bad', 'easy', 'difficult', 'happy', 'sad', 'tired', 'busy', 'beautiful', 'important', 'simple']],
  [9, 'Colors', ['red', 'blue', 'green', 'yellow', 'black', 'white', 'gray', 'brown', 'pink', 'purple', 'orange', 'light', 'dark', 'gold', 'silver']],
  [10, 'Days and months', ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'December']],
  [11, 'Time', ['morning', 'afternoon', 'evening', 'night', 'today', 'tomorrow', 'yesterday', 'hour', 'minute', 'o clock', 'half past', 'early', 'late', 'now', 'soon']],
  [12, 'Daily routine verbs', ['wake up', 'work', 'study', 'eat', 'drink', 'go', 'come', 'sleep', 'read', 'write', 'listen', 'repeat', 'watch', 'clean', 'rest']],
  [13, 'Food and drinks', ['water', 'coffee', 'tea', 'milk', 'bread', 'rice', 'beans', 'meat', 'chicken', 'fish', 'egg', 'apple', 'banana', 'juice', 'sandwich']],
  [14, 'Places in town', ['school', 'work', 'home', 'market', 'bank', 'pharmacy', 'hospital', 'restaurant', 'park', 'bus stop', 'store', 'street', 'church', 'gym', 'library']],
  [15, 'House and furniture', ['house', 'apartment', 'room', 'kitchen', 'bathroom', 'bedroom', 'living room', 'table', 'chair', 'bed', 'sofa', 'door', 'window', 'wall', 'floor']],
  [16, 'Clothes', ['shirt', 'T-shirt', 'pants', 'jeans', 'shorts', 'dress', 'jacket', 'coat', 'shoes', 'socks', 'hat', 'cap', 'uniform', 'black hoodie', 'watch']],
  [17, 'Weather', ['sunny', 'rainy', 'cloudy', 'windy', 'hot', 'cold', 'warm', 'cool', 'weather', 'rain', 'sun', 'wind', 'day', 'season', 'temperature']],
  [18, 'Basic feelings', ['happy', 'sad', 'tired', 'hungry', 'thirsty', 'angry', 'calm', 'worried', 'excited', 'afraid', 'okay', 'fine', 'sick', 'better', 'busy']],
  [19, 'Common verbs', ['be', 'have', 'do', 'go', 'come', 'want', 'need', 'like', 'know', 'think', 'say', 'ask', 'help', 'study', 'work']],
  [20, 'Review Vocabulary A1', ['name', 'country', 'family', 'job', 'object', 'color', 'day', 'time', 'routine', 'food', 'place', 'house', 'clothes', 'weather', 'feeling']],
];
const VOCAB_TAGS = {
  6:  ['a1', 'vocabulary', 'jobs', 'occupations', 'personal-information', 'beginner-foundation'],
  7:  ['a1', 'vocabulary', 'classroom', 'objects', 'school-context', 'beginner-foundation'],
  8:  ['a1', 'vocabulary', 'adjectives', 'descriptive', 'feelings-descriptions', 'beginner-foundation'],
  9:  ['a1', 'vocabulary', 'colors', 'descriptive', 'adjective-use', 'beginner-foundation'],
  10: ['a1', 'vocabulary', 'days-months', 'time-expressions', 'calendar', 'beginner-foundation'],
  11: ['a1', 'vocabulary', 'time', 'expressions', 'daily-routine', 'beginner-foundation'],
  17: ['a1', 'vocabulary', 'weather', 'descriptions', 'daily-context', 'beginner-foundation'],
  18: ['a1', 'vocabulary', 'feelings', 'emotions', 'personal-state', 'beginner-foundation'],
};

function vocabularyLesson([n, title, words]) {
  return createVocabularyLesson({
    id: id('VOCABULARY', n), level, order: n, title, status, estimatedMinutes: n === 20 ? 45 : 30, prerequisites: prereq('VOCABULARY', n), objectives: [`Aprender vocabulário de ${title}.`, 'Reconhecer palavra, significado e uso em frase.', 'Criar frases próprias com palavras úteis.'], theme: title,
    tags: VOCAB_TAGS[n],
    lexicalSets: [{ title: `${title} essencial`, items: words.slice(0, 10) }, { title: `${title} extra útil`, items: words.slice(10) }],
    pronunciationNotes: ['Repita cada palavra devagar.', 'Use a palavra dentro de uma frase curta.', 'Não memorize lista solta: associe palavra + exemplo.'],
    examples: words.slice(0, 12).map((word) => ({ text: `I use ${word} in a simple A1 sentence.`, translation: `Exemplo com ${word}.` })),
    recognitionPractice: [
      q(`Qual palavra pertence ao tema ${title}?`, [words[0], 'airplane engine', 'complex grammar'], words[0]),
      q('Qual opção é mais útil para A1?', [words[1], 'philosophy', 'industrialization'], words[1]),
      q('Escolha uma palavra da aula.', [words[2], 'random', 'unknown'], words[2]),
      q('Qual palavra você pode usar em frase curta?', [words[3], 'constitutional', 'incomprehensible'], words[3]),
      q('Qual opção combina com o vocabulário estudado?', [words[4], 'unrelated', 'wrong'], words[4]),
      q('Escolha uma palavra para revisar.', [words[5], 'no option', 'bad option'], words[5]),
    ],
    usagePractice: [prod(`Escreva 6 palavras de ${title}.`), prod('Crie 4 frases simples usando palavras da aula.'), prod('Leia 8 palavras em voz alta.'), prod('Separe palavras fáceis e difíceis.')],
    productionTasks: [prod(`Faça uma mini apresentação usando 5 palavras de ${title}.`), prod('Crie um diálogo curto com 3 palavras da aula.')],
    masteryCriteria: { minRecognitionAccuracy: 80, tags: ['a1-vocabulary', slug(title)] },
  });
}

const READING_TOPICS = [
  [4, 'A classroom text', 'In my English class, there are twelve students. The teacher is Ms. Green. She is kind and patient. There is a board on the wall and there are notebooks on the desks. I have a blue pen and a small book. We listen, repeat, read and write. The class is simple, but it is important. I like the classroom because I can learn with my friends.'],
  [5, 'A daily routine', 'My name is Bruno. I wake up at six. I drink coffee and eat bread. I work in the morning and study English at night. My routine is busy, but I like it. On Monday, Wednesday and Friday, I read short texts. On Tuesday and Thursday, I listen and repeat. I sleep at ten.'],
  [6, 'A simple message', 'Hi Ana, how are you? I am at home now. My mother is in the kitchen and my brother is in the living room. We are fine. Today is Saturday, and the weather is sunny. I want to study English in the afternoon. Can you study with me? See you soon.'],
  [7, 'A short email', 'Hello teacher, my name is Carla. I am a new student. I am from Brazil and I live in a small city. I study English because I need it for work and travel. I can read simple sentences, but I need more practice with listening and speaking. Thank you for your help.'],
  [8, 'A café menu', 'Welcome to Sunny Café. We have coffee, tea, milk, juice, bread, eggs, sandwiches and cake. Coffee is two dollars. Juice is three dollars. A sandwich is five dollars. The café is open from seven in the morning to six in the evening. It is small, clean and friendly.'],
  [9, 'A timetable', 'My English timetable is simple. On Monday, I study grammar. On Tuesday, I practice vocabulary. On Wednesday, I listen to short conversations. On Thursday, I write simple sentences. On Friday, I speak for one minute. On Saturday, I review. On Sunday, I rest.'],
  [10, 'A description of a house', 'This is my house. It is small, but comfortable. There is a kitchen, a bathroom, two bedrooms and a living room. There are four chairs in the kitchen. My bedroom has a bed, a desk and a window. I like my house because it is calm.'],
  [11, 'A simple work profile', 'Lucas is a driver. He works from Monday to Friday. He starts at seven in the morning and finishes at five in the afternoon. He is careful and friendly. He studies English at night because he wants a better job. His routine is not easy, but he is consistent.'],
  [12, 'A weekend plan', 'On Saturday, I want to clean my room, study English and visit my grandmother. In the afternoon, I want to go to the market and buy food. On Sunday, I want to rest, watch a movie and prepare for Monday. My weekend is simple and good.'],
  [13, 'Reading for names and numbers', 'There are four people in the class: Ana, Lucas, Ben and Maria. Ana is nineteen. Lucas is twenty. Ben is from Canada, and Maria is from Brazil. The class starts at eight and finishes at nine. The room number is twelve.'],
  [14, 'Reading for places', 'My city has a school, a market, a bank, a pharmacy and a park. My house is near the school. The market is next to the bank. The pharmacy is on Green Street. The park is big and beautiful. I walk there on Sunday.'],
  [15, 'Reading for routine actions', 'Every day, I wake up, drink water, eat breakfast and go to work. At lunch, I eat rice, beans and chicken. After work, I study English. I read, listen, repeat and write. At night, I rest and sleep.'],
  [16, 'Main idea in short texts', 'Paula is a student. She has a busy routine, but she studies English every day. She uses short texts, simple audio and small notes. Her goal is not to be perfect today. Her goal is to improve a little every week.'],
  [17, 'Details in short texts', 'The English club meets on Tuesday at seven. There are ten students. The teacher brings cards, pictures and short dialogues. Students speak in pairs. The club is in room five, next to the library.'],
  [18, 'Vocabulary from context', 'I am hungry, so I eat a sandwich. I am thirsty, so I drink water. I am tired, so I rest. I am cold, so I wear a jacket. These words are easy when the sentence gives you a clue.'],
  [19, 'Reading Review A1', 'This review text has many A1 ideas. My name is Nina. I am from Brazil. I have a small family. I work in the morning and study at night. My house is near a market. I can speak slowly, read simple messages and write short sentences.'],
  [20, 'Reading Checkpoint A1', 'Welcome to the A1 reading checkpoint. Read carefully. Pedro is a student and a worker. He lives in Brazil with his family. On Monday, he studies grammar. On Tuesday, he practices listening. He likes English because it helps him at work and with new friends.'],
];
const READING_TAGS = {
  4:  ['a1', 'reading', 'classroom', 'description', 'scanning', 'beginner-comprehension'],
  6:  ['a1', 'reading', 'message', 'informal-writing', 'social-context', 'beginner-comprehension'],
  7:  ['a1', 'reading', 'email', 'formal-context', 'scanning', 'beginner-comprehension'],
  9:  ['a1', 'reading', 'timetable', 'schedule', 'numbers-days', 'beginner-comprehension'],
  11: ['a1', 'reading', 'profile', 'work-context', 'third-person', 'beginner-comprehension'],
  12: ['a1', 'reading', 'weekend', 'plans', 'future-intentions', 'beginner-comprehension'],
  13: ['a1', 'reading', 'names-numbers', 'scanning', 'specific-details', 'beginner-comprehension'],
  16: ['a1', 'reading', 'main-idea', 'gist', 'strategy', 'reading-skills'],
  17: ['a1', 'reading', 'detail', 'scanning', 'evidence', 'reading-skills'],
  18: ['a1', 'reading', 'vocabulary-in-context', 'inference', 'meaning-clues', 'reading-skills'],
  20: ['a1', 'reading', 'checkpoint', 'review', 'gate-prep', 'reading-skills'],
};

function readingLesson([n, title, text]) {
  return createReadingLesson({
    id: id('READING', n), level, order: n, title, status, estimatedMinutes: n >= 19 ? 45 : 35, prerequisites: prereq('READING', n), objectives: ['Ler pela ideia geral.', 'Encontrar detalhes explícitos.', 'Responder com evidência textual.'],
    tags: READING_TAGS[n],
    preReading: ['Veja título, nomes e números.', 'Leia uma vez sem parar.', 'Depois procure evidências para responder.'], mainText: text,
    vocabulary: ['name', 'student', 'work', 'study', 'home', 'family', 'city', 'time', 'friend', 'English'].map((word) => ({ word, meaning: 'palavra útil do texto', example: `Find ${word} or a related idea in the text.` })),
    comprehensionQuestions: [q('Qual é a ideia geral do texto?', ['informação simples A1', 'história policial', 'texto técnico'], 'informação simples A1'), q('O texto tem nomes ou pessoas?', ['Sim', 'Não'], 'Sim'), q('O texto tem ações ou descrição?', ['Sim', 'Não'], 'Sim'), q('Há informação que pode ser provada no texto?', ['Sim', 'Não'], 'Sim'), q('O texto é adequado para iniciante?', ['Sim', 'Não'], 'Sim'), q('Você deve responder com evidência?', ['Sim', 'Não'], 'Sim')],
    evidenceTasks: ['Copie uma frase com pessoa.', 'Copie uma frase com lugar ou rotina.', 'Copie uma frase com informação importante.'].map((instruction) => ({ instruction, evidenceRequired: true })),
    shortResponse: [prod('Resuma em português em 2 linhas.'), prod('Escreva 2 frases A1 parecidas.')], productionTask: prod('Crie um mini texto parecido com o tema da leitura.'),
    masteryCriteria: { minComprehensionAccuracy: 75, evidenceRequired: true, tags: ['a1-reading', slug(title)] },
  });
}

const LISTENING_TOPICS = [
  [5, 'Classroom instructions', 'Open your book. Listen and repeat. Write your name. Read the sentence. Ask a question. Work with a partner. Check your answer. Good job.'],
  [6, 'Family introductions', 'Hello, this is my family. My mother is Ana. My father is Paulo. My sister is Carla. We live in Brazil. We are happy today.'],
  [7, 'Daily routine', 'I wake up at six. I work in the morning. I study English at night. I read, listen and repeat every day.'],
  [8, 'Time and schedules', 'The class starts at eight. Work starts at seven. Lunch is at twelve. I study English at nine in the evening.'],
  [9, 'Ordering food', 'Good morning. I want a sandwich and a coffee, please. How much is it? It is seven dollars. Thank you.'],
  [10, 'Asking where something is', 'Excuse me. Where is the pharmacy? It is next to the bank, on Green Street. Thank you very much.'],
  [11, 'Simple directions', 'Go straight. Turn left. The market is near the park. The school is next to the library.'],
  [12, 'Weather and feelings', 'Today is rainy and cold. I am tired, but I am okay. Tomorrow is sunny and warm. I am happy.'],
  [13, 'Short conversations', 'Hello. How are you? I am fine. Are you a student? Yes, I am. Nice to meet you.'],
  [14, 'Listening for names', 'My name is Peter. Her name is Maria. His name is Lucas. Their teacher is Ms. Green.'],
  [15, 'Listening for numbers', 'My phone number is one, two, three, four, five. The room is number twelve. The class has ten students.'],
  [16, 'Listening for places', 'I am at home. She is at school. The bank is near the market. The park is on Main Street.'],
  [17, 'Listening Review A1', 'This is a review. I am from Brazil. I study English every day. My family is small. I can speak slowly.'],
  [18, 'Listening Checkpoint A1', 'Checkpoint audio. Listen carefully. Ana works in the morning, studies at night and visits her family on Sunday.'],
];
const LISTENING_TAGS = {
  5:  ['a1', 'listening', 'instructions', 'classroom', 'imperative-commands', 'beginner-comprehension'],
  6:  ['a1', 'listening', 'family', 'introductions', 'personal-information', 'beginner-comprehension'],
  8:  ['a1', 'listening', 'time', 'schedules', 'numbers-time', 'beginner-comprehension'],
  11: ['a1', 'listening', 'directions', 'places', 'spatial-language', 'beginner-comprehension'],
  13: ['a1', 'listening', 'conversations', 'greetings', 'social-interaction', 'beginner-comprehension'],
  14: ['a1', 'listening', 'names', 'identification', 'specific-information', 'listening-skills'],
  15: ['a1', 'listening', 'numbers', 'phone-numbers', 'specific-information', 'listening-skills'],
  16: ['a1', 'listening', 'places', 'location', 'specific-information', 'listening-skills'],
  18: ['a1', 'listening', 'checkpoint', 'review', 'gate-prep', 'listening-skills'],
};

function listeningLesson([n, title, script]) {
  return createListeningLesson({
    id: id('LISTENING', n), level, order: n, title, status, estimatedMinutes: n >= 17 ? 45 : 30, prerequisites: prereq('LISTENING', n), objectives: ['Ouvir primeiro sem texto.', 'Identificar palavras-chave.', 'Repetir frases curtas com clareza.'],
    tags: LISTENING_TAGS[n],
    audioScript: script, transcript: script,
    firstListenTasks: ['Ouça sem ler e identifique o tema.', 'Anote uma palavra conhecida.'].map((instruction) => ({ instruction })),
    secondListenTasks: ['Identifique pessoa, lugar ou ação.', 'Ouça de novo e confirme detalhes.', 'Compare com o transcript depois.'].map((instruction) => ({ instruction })),
    vocabulary: ['hello', 'name', 'work', 'study', 'family', 'class', 'time', 'place'].map((word) => ({ word, meaning: 'palavra do áudio' })),
    shadowing: script.split(/(?<=[.!?])\s+/).filter(Boolean).slice(0, 8),
    comprehensionQuestions: [q('O áudio tem informação simples?', ['Sim', 'Não'], 'Sim'), q('Você deve ouvir antes de ler?', ['Sim', 'Não'], 'Sim'), q('Há palavras A1 no áudio?', ['Sim', 'Não'], 'Sim'), q('O áudio deve ser repetido em voz alta?', ['Sim', 'Não'], 'Sim')],
    masteryCriteria: { minListeningAccuracy: 70, shadowingRequired: 4, tags: ['a1-listening', slug(title)] },
  });
}

const SPEAKING_TOPICS = [
  [5, 'Talk about your family', ['This is my mother.', 'My father is a driver.', 'I have one sister.', 'My family is small.']],
  [6, 'Talk about your job/study', ['I am a student.', 'I work in the morning.', 'I study English at night.', 'My job is important.']],
  [7, 'Describe yourself', ['I am calm.', 'I am busy.', 'I am from Brazil.', 'I am a beginner.']],
  [8, 'Say what you like', ['I like coffee.', 'I like English.', 'I like music.', 'I do not like cold weather.']],
  [9, 'Ask simple questions', ['Are you ready?', 'Do you study English?', 'Where are you from?', 'What is your name?']],
  [10, 'Answer simple questions', ['Yes, I am.', 'No, I am not.', 'I am from Brazil.', 'My name is Luis.']],
  [11, 'Talk about your routine', ['I wake up early.', 'I work in the morning.', 'I study at night.', 'I sleep at ten.']],
  [12, 'Talk about time', ['The class starts at eight.', 'I study on Monday.', 'I work in the morning.', 'I rest on Sunday.']],
  [13, 'Order something simple', ['I want a coffee, please.', 'How much is it?', 'A sandwich, please.', 'Thank you.']],
  [14, 'Ask where something is', ['Where is the market?', 'It is near the bank.', 'Excuse me.', 'Thank you very much.']],
  [15, 'Describe your room', ['There is a bed.', 'There are two chairs.', 'My desk is near the window.', 'My room is small.']],
  [16, 'Speak for 30 seconds about yourself', ['My name is Luis.', 'I am from Brazil.', 'I work and study.', 'I like English.']],
  [17, 'Speaking Review A1', ['Hello, my name is Luis.', 'I am from Brazil.', 'I study English every day.', 'Nice to meet you.']],
  [18, 'Speaking Checkpoint A1', ['I can introduce myself.', 'I can ask simple questions.', 'I can talk about routine.', 'I can speak slowly.']],
];
const SPEAKING_TAGS = {
  5:  ['a1', 'speaking', 'family', 'descriptions', 'controlled-production', 'beginner-output'],
  6:  ['a1', 'speaking', 'job-study', 'personal-information', 'self-description', 'beginner-output'],
  7:  ['a1', 'speaking', 'self-description', 'adjectives', 'personal-information', 'beginner-output'],
  8:  ['a1', 'speaking', 'preferences', 'like-dislike', 'personal-expression', 'beginner-output'],
  9:  ['a1', 'speaking', 'questions', 'interaction', 'social-communication', 'beginner-output'],
  10: ['a1', 'speaking', 'short-answers', 'yes-no-responses', 'social-communication', 'beginner-output'],
  12: ['a1', 'speaking', 'time', 'schedules', 'routine-description', 'beginner-output'],
  16: ['a1', 'speaking', 'fluency', 'self-introduction', 'spontaneous-production', 'beginner-output'],
  18: ['a1', 'speaking', 'checkpoint', 'review', 'gate-prep', 'beginner-output'],
};

function speakingLesson([n, title, phrases]) {
  return createSpeakingLesson({
    id: id('SPEAKING', n), level, order: n, title, status, estimatedMinutes: n >= 17 ? 45 : 30, prerequisites: prereq('SPEAKING', n), objectives: ['Falar frases A1 com clareza.', 'Usar modelo antes da fala livre.', 'Gravar uma resposta curta.'],
    tags: SPEAKING_TAGS[n],
    modelPhrases: phrases,
    substitutionDrills: phrases.map((phrase) => ({ instruction: `${phrase} → troque uma informação e repita.` })),
    pronunciationFocus: { title: 'Clareza antes de velocidade', tips: ['Fale devagar.', 'Pausa entre frases.', 'Repita o modelo 3 vezes.', 'Não traduza enquanto fala.'] },
    guidedSpeaking: ['Repita o modelo.', 'Troque uma palavra.', 'Responda uma pergunta.', 'Junte duas frases.', 'Fale sem ler uma vez.'].map((instruction) => ({ instruction })),
    recordingTasks: [prod(`Grave 4 frases sobre: ${title}.`), prod('Grave uma versão mais lenta e uma mais natural.')],
    freeSpeaking: [prod('Fale por 20–30 segundos usando as frases da aula.'), prod('Marque as frases que você conseguiu falar sem travar.')],
    masteryCriteria: { recordingRequired: true, minChecklist: 3, tags: ['a1-speaking', slug(title)] },
  });
}

const WRITING_TOPICS = [
  [4, 'Write about your family', 'My family is small. My mother is a teacher. My father is a driver. I have one sister. Her name is Carla. We live in Brazil.'],
  [5, 'Write about your job/studies', 'I am a student. I work in the morning and study at night. English is important for my work. I study a little every day.'],
  [6, 'Write about your routine', 'I wake up at six. I work in the morning. I eat lunch at twelve. I study English at night. I sleep at ten.'],
  [7, 'Write about likes and dislikes', 'I like coffee and music. I like English because it is useful. I do not like cold weather. I like simple routines.'],
  [8, 'Write a simple message', 'Hi Ana. How are you? I am at home now. I want to study English today. Can you study with me? See you soon.'],
  [9, 'Write a short email', 'Hello teacher. My name is Luis. I am a new student. I study English at night. Thank you for your help.'],
  [10, 'Write about your house', 'My house is small and comfortable. There is a kitchen, a bathroom and two bedrooms. My room has a bed and a desk.'],
  [11, 'Write about your weekend', 'On Saturday, I clean my room and study English. On Sunday, I visit my family and rest. My weekend is simple.'],
  [12, 'Write questions and answers', 'What is your name? My name is Luis. Where are you from? I am from Brazil. Do you study English? Yes, I do.'],
  [13, 'Fix punctuation and capitalization', 'Hello. My name is Ana. I am from Brazil. I study English every day. Nice to meet you.'],
  [14, 'Connect sentences with and / but / because', 'I study and work. I am tired but happy. I study English because it is useful.'],
  [15, 'Writing Review A1', 'My name is Luis. I am from Brazil. I work in the morning and study at night. I like English because it is useful.'],
  [16, 'Writing Checkpoint A1', 'Hello. My name is Luis. I am from Brazil. I have a small family. I work and study. I can write simple sentences in English.'],
];
const WRITING_TAGS = {
  5:  ['a1', 'writing', 'job-study', 'personal-information', 'sentence-writing', 'beginner-output'],
  7:  ['a1', 'writing', 'preferences', 'like-dislike', 'personal-expression', 'beginner-output'],
  9:  ['a1', 'writing', 'email', 'formal-context', 'guided-writing', 'beginner-output'],
  11: ['a1', 'writing', 'weekend', 'plans', 'guided-writing', 'beginner-output'],
  13: ['a1', 'writing', 'punctuation', 'capitalization', 'accuracy', 'writing-skills'],
  16: ['a1', 'writing', 'checkpoint', 'review', 'gate-prep', 'writing-skills'],
};

function writingLesson([n, title, model]) {
  return createWritingLesson({
    id: id('WRITING', n), level, order: n, title, status, estimatedMinutes: n >= 15 ? 45 : 35, prerequisites: prereq('WRITING', n), objectives: ['Usar modelo antes de escrever sozinho.', 'Escrever frases curtas com ordem correta.', 'Revisar pontuação, maiúsculas e estrutura.'],
    tags: WRITING_TAGS[n],
    modelText: model,
    writingBlocks: ['My name is...', 'I am from...', 'I live in...', 'I have...', 'I like...', 'I work...', 'I study...', 'because it is useful.', 'Thank you.', 'See you soon.'],
    guidedSubstitution: ['Luis → Ana', 'Brazil → Canada', 'student → worker', 'morning → evening', 'small → big', 'English → Spanish'].map((instruction) => ({ instruction })),
    grammarForWriting: ['Comece frase com letra maiúscula.', 'Termine com ponto final.', 'Use sujeito + verbo + complemento.', 'Não escreva frases enormes no A1.', 'Revise am/is/are e do/does.'],
    checklist: ['Usei letra maiúscula.', 'Usei ponto final.', 'Usei frases curtas.', 'Revisei a ordem.', 'Comparei com o modelo.'],
    draftTask: prod(`Escreva um rascunho sobre: ${title}.`), revisionTask: prod('Revise usando o checklist e escreva a versão final.'),
    masteryCriteria: { finalDraftRequired: true, checklistRequired: true, tags: ['a1-writing', slug(title)] },
  });
}

export const A1_FULL_GRAMMAR_LESSONS = Object.freeze(GRAMMAR_TOPICS.map(grammarLesson));
export const A1_FULL_VOCABULARY_LESSONS = Object.freeze(VOCAB_TOPICS.map(vocabularyLesson));
export const A1_FULL_READING_LESSONS = Object.freeze(READING_TOPICS.map(readingLesson));
export const A1_FULL_LISTENING_LESSONS = Object.freeze(LISTENING_TOPICS.map(listeningLesson));
export const A1_FULL_SPEAKING_LESSONS = Object.freeze(SPEAKING_TOPICS.map(speakingLesson));
export const A1_FULL_WRITING_LESSONS = Object.freeze(WRITING_TOPICS.map(writingLesson));

export const A1_FULL_CONTENT_LESSONS = Object.freeze([
  ...A1_FULL_GRAMMAR_LESSONS,
  ...A1_FULL_VOCABULARY_LESSONS,
  ...A1_FULL_READING_LESSONS,
  ...A1_FULL_LISTENING_LESSONS,
  ...A1_FULL_SPEAKING_LESSONS,
  ...A1_FULL_WRITING_LESSONS,
]);

export const A1_FULL_CONTENT_BY_PILLAR = Object.freeze({
  grammar: A1_FULL_GRAMMAR_LESSONS,
  vocabulary: A1_FULL_VOCABULARY_LESSONS,
  reading: A1_FULL_READING_LESSONS,
  listening: A1_FULL_LISTENING_LESSONS,
  speaking: A1_FULL_SPEAKING_LESSONS,
  writing: A1_FULL_WRITING_LESSONS,
});

export function getA1FullContentLessons() { return A1_FULL_CONTENT_LESSONS; }
export function getA1FullContentByPillar(pillar) { return A1_FULL_CONTENT_BY_PILLAR[pillar] || []; }
