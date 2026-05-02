import { fixedExpansionA1A2Decks } from '../data/vocabulary/fixedExpansionA1A2.js';
import { fixedExpansionB1B2Decks } from '../data/vocabulary/fixedExpansionB1B2.js';
import { fixedExpansionC1C2Decks } from '../data/vocabulary/fixedExpansionC1C2.js';
import { auditVocabularyCurriculum } from './vocabularyCurriculumAudit.js';

const baseDeckDefinitions = [
  {
    id: 'core-a1',
    title: 'Essenciais A1',
    topic: 'base',
    level: 'A1',
    cards: [
      ['I', 'eu', 'I am a student.', 'I am'], ['you', 'você', 'You are my friend.', 'you are'], ['he', 'ele', 'He is at home.', 'he is'], ['she', 'ela', 'She likes music.', 'she likes'], ['we', 'nós', 'We study English.', 'we study'], ['they', 'eles/elas', 'They are here.', 'they are'],
      ['be', 'ser/estar', 'I want to be better.', 'to be better'], ['have', 'ter', 'I have a book.', 'have a book'], ['do', 'fazer', 'I do my homework.', 'do my homework'], ['go', 'ir', 'I go to school.', 'go to school'], ['come', 'vir', 'Come here, please.', 'come here'], ['make', 'fazer/criar', 'I make coffee.', 'make coffee'],
      ['say', 'dizer', 'Say it again.', 'say it again'], ['get', 'pegar/obter', 'I get up early.', 'get up'], ['know', 'saber/conhecer', 'I know this word.', 'know this word'], ['think', 'pensar', 'I think in English.', 'think in English'], ['want', 'querer', 'I want water.', 'want water'], ['need', 'precisar', 'I need help.', 'need help'],
      ['like', 'gostar', 'I like apples.', 'like apples'], ['see', 'ver', 'I see a car.', 'see a car'], ['look', 'olhar/parecer', 'Look at this.', 'look at'], ['use', 'usar', 'I use my phone.', 'use my phone'], ['work', 'trabalhar', 'I work every day.', 'work every day'], ['learn', 'aprender', 'I learn English.', 'learn English'],
    ],
  },
  {
    id: 'people-family', title: 'Pessoas e família', topic: 'people', level: 'A1', cards: [
      ['family', 'família', 'My family is big.', 'my family'], ['mother', 'mãe', 'My mother is kind.', 'my mother'], ['father', 'pai', 'My father works a lot.', 'my father'], ['brother', 'irmão', 'I have one brother.', 'one brother'], ['sister', 'irmã', 'My sister studies.', 'my sister'], ['friend', 'amigo', 'He is my friend.', 'my friend'],
      ['person', 'pessoa', 'She is a nice person.', 'nice person'], ['people', 'pessoas', 'People are waiting.', 'people are'], ['child', 'criança', 'The child is happy.', 'the child'], ['children', 'crianças', 'Children play outside.', 'children play'], ['man', 'homem', 'The man is here.', 'the man'], ['woman', 'mulher', 'The woman is a teacher.', 'the woman'],
      ['boy', 'menino', 'The boy is young.', 'the boy'], ['girl', 'menina', 'The girl is reading.', 'the girl'], ['parent', 'pai/mãe', 'A parent helps a child.', 'a parent'], ['teacher', 'professor', 'My teacher speaks English.', 'my teacher'], ['student', 'estudante', 'I am a student.', 'a student'], ['neighbor', 'vizinho', 'My neighbor is friendly.', 'my neighbor'],
      ['name', 'nome', 'What is your name?', 'your name'], ['age', 'idade', 'What is your age?', 'your age'], ['home', 'lar/casa', 'I am at home.', 'at home'], ['life', 'vida', 'Life is good.', 'life is'], ['group', 'grupo', 'We are a group.', 'a group'], ['team', 'equipe', 'Our team is small.', 'our team'],
    ]
  },
  {
    id: 'daily-routine', title: 'Rotina diária', topic: 'routine', level: 'A1', cards: [
      ['wake', 'acordar', 'I wake up early.', 'wake up'], ['sleep', 'dormir', 'I sleep at night.', 'sleep at night'], ['eat', 'comer', 'I eat breakfast.', 'eat breakfast'], ['drink', 'beber', 'I drink water.', 'drink water'], ['brush', 'escovar', 'I brush my teeth.', 'brush my teeth'], ['wash', 'lavar', 'I wash my hands.', 'wash my hands'],
      ['study', 'estudar', 'I study English.', 'study English'], ['read', 'ler', 'I read a book.', 'read a book'], ['write', 'escrever', 'I write a sentence.', 'write a sentence'], ['listen', 'ouvir', 'I listen to audio.', 'listen to audio'], ['speak', 'falar', 'I speak English.', 'speak English'], ['practice', 'praticar', 'I practice every day.', 'practice every day'],
      ['morning', 'manhã', 'I study in the morning.', 'in the morning'], ['afternoon', 'tarde', 'I work in the afternoon.', 'in the afternoon'], ['evening', 'noite/início da noite', 'I relax in the evening.', 'in the evening'], ['night', 'noite', 'I sleep at night.', 'at night'], ['today', 'hoje', 'Today is Monday.', 'today is'], ['tomorrow', 'amanhã', 'Tomorrow I study.', 'tomorrow I'],
      ['always', 'sempre', 'I always drink water.', 'always drink'], ['usually', 'geralmente', 'I usually study at night.', 'usually study'], ['sometimes', 'às vezes', 'I sometimes read.', 'sometimes read'], ['never', 'nunca', 'I never stop learning.', 'never stop'], ['early', 'cedo', 'I wake up early.', 'wake up early'], ['late', 'tarde/atrasado', 'I sleep late.', 'sleep late'],
    ]
  },
  {
    id: 'food-drinks', title: 'Comida e bebidas', topic: 'food', level: 'A1', cards: [
      ['food', 'comida', 'I like food.', 'like food'], ['water', 'água', 'I drink water.', 'drink water'], ['coffee', 'café', 'I make coffee.', 'make coffee'], ['tea', 'chá', 'I drink tea.', 'drink tea'], ['milk', 'leite', 'Milk is cold.', 'cold milk'], ['juice', 'suco', 'I like orange juice.', 'orange juice'],
      ['bread', 'pão', 'I eat bread.', 'eat bread'], ['rice', 'arroz', 'I eat rice.', 'eat rice'], ['beans', 'feijão', 'I like beans.', 'like beans'], ['meat', 'carne', 'I eat meat.', 'eat meat'], ['chicken', 'frango', 'Chicken is good.', 'good chicken'], ['fish', 'peixe', 'I eat fish.', 'eat fish'],
      ['egg', 'ovo', 'I eat an egg.', 'an egg'], ['cheese', 'queijo', 'Cheese is delicious.', 'delicious cheese'], ['apple', 'maçã', 'I like apples.', 'like apples'], ['banana', 'banana', 'Bananas are yellow.', 'yellow bananas'], ['orange', 'laranja', 'I eat an orange.', 'an orange'], ['salad', 'salada', 'I make a salad.', 'make a salad'],
      ['breakfast', 'café da manhã', 'I eat breakfast.', 'eat breakfast'], ['lunch', 'almoço', 'Lunch is ready.', 'lunch is ready'], ['dinner', 'jantar', 'Dinner is at seven.', 'at seven'], ['hungry', 'com fome', 'I am hungry.', 'am hungry'], ['thirsty', 'com sede', 'I am thirsty.', 'am thirsty'], ['delicious', 'delicioso', 'The food is delicious.', 'is delicious'],
    ]
  },
  {
    id: 'home-objects', title: 'Casa e objetos', topic: 'home', level: 'A1', cards: [
      ['house', 'casa', 'My house is small.', 'my house'], ['room', 'quarto/cômodo', 'This room is clean.', 'this room'], ['bed', 'cama', 'The bed is big.', 'the bed'], ['chair', 'cadeira', 'Sit on the chair.', 'on the chair'], ['table', 'mesa', 'The book is on the table.', 'on the table'], ['door', 'porta', 'Open the door.', 'open the door'],
      ['window', 'janela', 'Close the window.', 'close the window'], ['kitchen', 'cozinha', 'I am in the kitchen.', 'in the kitchen'], ['bathroom', 'banheiro', 'The bathroom is clean.', 'the bathroom'], ['phone', 'telefone', 'My phone is new.', 'my phone'], ['computer', 'computador', 'I use a computer.', 'use a computer'], ['book', 'livro', 'I read a book.', 'read a book'],
      ['notebook', 'caderno', 'Open your notebook.', 'your notebook'], ['pen', 'caneta', 'I need a pen.', 'need a pen'], ['bag', 'bolsa/mochila', 'My bag is heavy.', 'my bag'], ['key', 'chave', 'Where is my key?', 'my key'], ['money', 'dinheiro', 'I need money.', 'need money'], ['clothes', 'roupas', 'My clothes are clean.', 'my clothes'],
      ['shirt', 'camisa', 'This shirt is blue.', 'this shirt'], ['shoes', 'sapatos', 'My shoes are black.', 'my shoes'], ['light', 'luz', 'Turn on the light.', 'turn on'], ['picture', 'foto/quadro', 'I see a picture.', 'a picture'], ['floor', 'chão', 'The floor is clean.', 'the floor'], ['wall', 'parede', 'The wall is white.', 'the wall'],
    ]
  },
  {
    id: 'places-city', title: 'Lugares e cidade', topic: 'places', level: 'A1', cards: [
      ['city', 'cidade', 'My city is small.', 'my city'], ['street', 'rua', 'The street is busy.', 'the street'], ['school', 'escola', 'I go to school.', 'go to school'], ['store', 'loja', 'I go to the store.', 'the store'], ['market', 'mercado', 'The market is open.', 'the market'], ['bank', 'banco', 'The bank is near.', 'the bank'],
      ['restaurant', 'restaurante', 'The restaurant is good.', 'the restaurant'], ['cafe', 'cafeteria', 'I am at a cafe.', 'at a cafe'], ['park', 'parque', 'I walk in the park.', 'in the park'], ['hospital', 'hospital', 'The hospital is far.', 'the hospital'], ['church', 'igreja', 'The church is old.', 'the church'], ['station', 'estação', 'The station is busy.', 'the station'],
      ['bus', 'ônibus', 'I take the bus.', 'take the bus'], ['car', 'carro', 'I have a car.', 'have a car'], ['bike', 'bicicleta', 'I ride a bike.', 'ride a bike'], ['road', 'estrada', 'The road is long.', 'the road'], ['place', 'lugar', 'This place is nice.', 'this place'], ['near', 'perto', 'The school is near.', 'is near'],
      ['far', 'longe', 'The park is far.', 'is far'], ['left', 'esquerda', 'Turn left.', 'turn left'], ['right', 'direita', 'Turn right.', 'turn right'], ['inside', 'dentro', 'I am inside.', 'am inside'], ['outside', 'fora', 'I am outside.', 'am outside'], ['here', 'aqui', 'I am here.', 'am here'],
    ]
  },
  {
    id: 'actions-verbs', title: 'Verbos comuns', topic: 'verbs', level: 'A1-A2', cards: [
      ['start', 'começar', 'Start now.', 'start now'], ['stop', 'parar', 'Stop here.', 'stop here'], ['open', 'abrir', 'Open the book.', 'open the book'], ['close', 'fechar', 'Close the door.', 'close the door'], ['help', 'ajudar', 'Help me, please.', 'help me'], ['call', 'chamar/ligar', 'Call me later.', 'call me'],
      ['try', 'tentar', 'Try again.', 'try again'], ['ask', 'perguntar', 'Ask a question.', 'ask a question'], ['answer', 'responder', 'Answer in English.', 'answer in English'], ['buy', 'comprar', 'I buy food.', 'buy food'], ['sell', 'vender', 'They sell cars.', 'sell cars'], ['pay', 'pagar', 'I pay with cash.', 'pay with cash'],
      ['give', 'dar', 'Give me the book.', 'give me'], ['take', 'pegar/levar', 'Take this.', 'take this'], ['bring', 'trazer', 'Bring your notebook.', 'bring your notebook'], ['find', 'encontrar', 'Find the word.', 'find the word'], ['keep', 'manter/guardar', 'Keep practicing.', 'keep practicing'], ['leave', 'sair/deixar', 'I leave at eight.', 'leave at'],
      ['move', 'mover', 'Move the chair.', 'move the chair'], ['play', 'brincar/tocar/jogar', 'I play music.', 'play music'], ['watch', 'assistir', 'I watch a video.', 'watch a video'], ['wait', 'esperar', 'Wait a minute.', 'wait a minute'], ['walk', 'andar', 'I walk every day.', 'walk every day'], ['run', 'correr', 'I run in the park.', 'run in'],
    ]
  },
  {
    id: 'adjectives', title: 'Adjetivos úteis', topic: 'adjectives', level: 'A1-A2', cards: [
      ['good', 'bom', 'This is good.', 'is good'], ['bad', 'ruim', 'This is bad.', 'is bad'], ['big', 'grande', 'My house is big.', 'is big'], ['small', 'pequeno', 'The room is small.', 'is small'], ['new', 'novo', 'I have a new phone.', 'new phone'], ['old', 'velho/antigo', 'This book is old.', 'is old'],
      ['young', 'jovem', 'The boy is young.', 'is young'], ['happy', 'feliz', 'I am happy.', 'am happy'], ['sad', 'triste', 'She is sad.', 'is sad'], ['tired', 'cansado', 'I am tired.', 'am tired'], ['easy', 'fácil', 'English is easy today.', 'is easy'], ['hard', 'difícil', 'This word is hard.', 'is hard'],
      ['fast', 'rápido', 'The car is fast.', 'is fast'], ['slow', 'lento', 'Speak slowly.', 'speak slowly'], ['hot', 'quente', 'The coffee is hot.', 'is hot'], ['cold', 'frio', 'The water is cold.', 'is cold'], ['clean', 'limpo', 'The room is clean.', 'is clean'], ['dirty', 'sujo', 'The floor is dirty.', 'is dirty'],
      ['beautiful', 'bonito', 'The city is beautiful.', 'is beautiful'], ['important', 'importante', 'English is important.', 'is important'], ['different', 'diferente', 'This is different.', 'is different'], ['same', 'mesmo/igual', 'It is the same.', 'the same'], ['ready', 'pronto', 'I am ready.', 'am ready'], ['busy', 'ocupado', 'I am busy.', 'am busy'],
    ]
  },
  {
    id: 'questions-connectors', title: 'Perguntas e conectores', topic: 'grammar', level: 'A1-A2', cards: [
      ['what', 'o que/qual', 'What is your name?', 'what is'], ['where', 'onde', 'Where are you from?', 'where are'], ['when', 'quando', 'When do you study?', 'when do'], ['why', 'por que', 'Why are you here?', 'why are'], ['who', 'quem', 'Who is your teacher?', 'who is'], ['how', 'como', 'How are you?', 'how are'],
      ['and', 'e', 'I study and work.', 'and work'], ['but', 'mas', 'I like it, but it is hard.', 'but it is'], ['because', 'porque', 'I study because I want to learn.', 'because I'], ['or', 'ou', 'Tea or coffee?', 'or coffee'], ['so', 'então/por isso', 'I am tired, so I sleep.', 'so I'], ['if', 'se', 'If you want, start now.', 'if you'],
      ['with', 'com', 'I study with a friend.', 'with a friend'], ['without', 'sem', 'I drink coffee without sugar.', 'without sugar'], ['for', 'para/por', 'This is for you.', 'for you'], ['from', 'de', 'I am from Brazil.', 'from Brazil'], ['to', 'para', 'I go to school.', 'to school'], ['in', 'em/dentro', 'I live in Brazil.', 'in Brazil'],
      ['on', 'em/sobre', 'The book is on the table.', 'on the table'], ['at', 'em', 'I am at home.', 'at home'], ['before', 'antes', 'I study before dinner.', 'before dinner'], ['after', 'depois', 'I sleep after work.', 'after work'], ['again', 'de novo', 'Say it again.', 'it again'], ['also', 'também', 'I also study English.', 'also study'],
    ]
  },
  {
    id: 'time-numbers', title: 'Tempo e números', topic: 'time', level: 'A1', cards: [
      ['one', 'um', 'I have one book.', 'one book'], ['two', 'dois', 'I have two pens.', 'two pens'], ['three', 'três', 'I know three words.', 'three words'], ['four', 'quatro', 'Four people are here.', 'four people'], ['five', 'cinco', 'I study five days.', 'five days'], ['ten', 'dez', 'I have ten minutes.', 'ten minutes'],
      ['day', 'dia', 'Today is a good day.', 'good day'], ['week', 'semana', 'This week is busy.', 'this week'], ['month', 'mês', 'This month is important.', 'this month'], ['year', 'ano', 'This year I learn English.', 'this year'], ['hour', 'hora', 'I study for one hour.', 'one hour'], ['minute', 'minuto', 'Wait one minute.', 'one minute'],
      ['time', 'tempo/hora', 'What time is it?', 'what time'], ['now', 'agora', 'Start now.', 'start now'], ['soon', 'em breve/logo', 'See you soon.', 'see you soon'], ['first', 'primeiro', 'First, listen.', 'first listen'], ['last', 'último/passado', 'This is the last card.', 'last card'], ['next', 'próximo', 'Next question, please.', 'next question'],
      ['every', 'todo/cada', 'I study every day.', 'every day'], ['many', 'muitos', 'I know many words.', 'many words'], ['much', 'muito', 'Thank you very much.', 'very much'], ['few', 'poucos', 'I know a few words.', 'a few'], ['more', 'mais', 'I want more practice.', 'more practice'], ['less', 'menos', 'I need less noise.', 'less noise'],
    ]
  },
  {
    id: 'work-study', title: 'Trabalho e estudo', topic: 'work', level: 'A1-A2', cards: [
      ['job', 'emprego', 'I need a job.', 'need a job'], ['work', 'trabalho/trabalhar', 'I work today.', 'work today'], ['office', 'escritório', 'I work in an office.', 'in an office'], ['company', 'empresa', 'The company is big.', 'the company'], ['boss', 'chefe', 'My boss is busy.', 'my boss'], ['meeting', 'reunião', 'The meeting is today.', 'the meeting'],
      ['email', 'e-mail', 'I write an email.', 'write an email'], ['message', 'mensagem', 'Send a message.', 'send a message'], ['task', 'tarefa', 'This task is easy.', 'this task'], ['project', 'projeto', 'The project is new.', 'the project'], ['plan', 'plano', 'I have a plan.', 'have a plan'], ['goal', 'meta', 'My goal is English.', 'my goal'],
      ['class', 'aula/turma', 'I have class today.', 'have class'], ['lesson', 'lição/aula', 'This lesson is useful.', 'this lesson'], ['test', 'teste/prova', 'The test is hard.', 'the test'], ['question', 'pergunta', 'Ask a question.', 'a question'], ['answer', 'resposta', 'Write an answer.', 'an answer'], ['mistake', 'erro', 'Mistakes help me learn.', 'mistakes help'],
      ['correct', 'correto', 'This answer is correct.', 'is correct'], ['wrong', 'errado', 'This word is wrong.', 'is wrong'], ['review', 'revisão', 'Review the cards.', 'review the cards'], ['remember', 'lembrar', 'Remember this word.', 'remember this'], ['understand', 'entender', 'I understand you.', 'understand you'], ['improve', 'melhorar', 'I want to improve.', 'want to improve'],
    ]
  },
  {
    id: 'feelings-health', title: 'Sentimentos e saúde', topic: 'health', level: 'A1-A2', cards: [
      ['feel', 'sentir', 'I feel good.', 'feel good'], ['fine', 'bem', 'I am fine.', 'am fine'], ['great', 'ótimo', 'That is great.', 'is great'], ['okay', 'ok/bem', 'I am okay.', 'am okay'], ['sick', 'doente', 'I feel sick.', 'feel sick'], ['healthy', 'saudável', 'I want to be healthy.', 'be healthy'],
      ['pain', 'dor', 'I have pain.', 'have pain'], ['head', 'cabeça', 'My head hurts.', 'my head'], ['hand', 'mão', 'My hand is cold.', 'my hand'], ['foot', 'pé', 'My foot hurts.', 'my foot'], ['eye', 'olho', 'My eye is red.', 'my eye'], ['mouth', 'boca', 'Open your mouth.', 'your mouth'],
      ['heart', 'coração', 'My heart is strong.', 'my heart'], ['body', 'corpo', 'My body is tired.', 'my body'], ['doctor', 'médico', 'I need a doctor.', 'need a doctor'], ['medicine', 'remédio', 'Take the medicine.', 'take medicine'], ['rest', 'descanso/descansar', 'I need rest.', 'need rest'], ['exercise', 'exercício', 'Exercise is good.', 'is good'],
      ['afraid', 'com medo', 'I am afraid.', 'am afraid'], ['angry', 'bravo', 'He is angry.', 'is angry'], ['calm', 'calmo', 'Stay calm.', 'stay calm'], ['worried', 'preocupado', 'I am worried.', 'am worried'], ['excited', 'animado', 'I am excited.', 'am excited'], ['proud', 'orgulhoso', 'I am proud.', 'am proud'],
    ]
  },
  {
    id: 'travel-survival', title: 'Viagem e sobrevivência', topic: 'travel', level: 'A1-A2', cards: [
      ['travel', 'viajar', 'I like to travel.', 'like to travel'], ['trip', 'viagem', 'This trip is fun.', 'this trip'], ['airport', 'aeroporto', 'The airport is big.', 'the airport'], ['ticket', 'bilhete/passagem', 'I need a ticket.', 'need a ticket'], ['passport', 'passaporte', 'My passport is here.', 'my passport'], ['hotel', 'hotel', 'The hotel is nice.', 'the hotel'],
      ['reservation', 'reserva', 'I have a reservation.', 'have a reservation'], ['map', 'mapa', 'Use the map.', 'use the map'], ['address', 'endereço', 'What is the address?', 'the address'], ['help', 'ajuda', 'I need help.', 'need help'], ['please', 'por favor', 'Help me, please.', 'help me'], ['thanks', 'obrigado', 'Thanks for your help.', 'thanks for'],
      ['sorry', 'desculpa', 'Sorry, I am late.', 'am late'], ['excuse', 'com licença/desculpar', 'Excuse me, please.', 'excuse me'], ['lost', 'perdido', 'I am lost.', 'am lost'], ['safe', 'seguro', 'This place is safe.', 'is safe'], ['dangerous', 'perigoso', 'That road is dangerous.', 'is dangerous'], ['police', 'polícia', 'Call the police.', 'the police'],
      ['train', 'trem', 'The train is late.', 'the train'], ['plane', 'avião', 'The plane is ready.', 'the plane'], ['taxi', 'táxi', 'I need a taxi.', 'need a taxi'], ['walk', 'andar', 'Can I walk there?', 'walk there'], ['arrive', 'chegar', 'I arrive today.', 'arrive today'], ['leave', 'sair/partir', 'I leave tomorrow.', 'leave tomorrow'],
    ]
  },
];

const deckDefinitions = [...baseDeckDefinitions, ...fixedExpansionA1A2Decks, ...fixedExpansionB1B2Decks, ...fixedExpansionC1C2Decks];

function normalizeCard(deck, item, index) {
  const [word, translation, example, chunk = ''] = item;
  return {
    id: `${deck.id}-${index}-${word}`,
    word,
    translation,
    definition: `Palavra comum de ${deck.title.toLowerCase()}: ${translation}.`,
    example,
    chunk,
    chunks: chunk ? [chunk] : [],
    deck: deck.title,
    category: deck.topic,
    level: deck.level,
    due: deck.level,
  };
}

export function getVocabularyDecks() {
  return deckDefinitions.map((deck) => ({
    id: deck.id,
    title: deck.title,
    topic: deck.topic,
    level: deck.level,
    count: deck.cards.length,
  }));
}

export function getVocabularyDeckCards(deckId = 'core-a1') {
  const deck = deckDefinitions.find((item) => item.id === deckId) || deckDefinitions[0];
  return deck.cards.map((item, index) => normalizeCard(deck, item, index));
}

export function getTotalVocabularyBankCount() {
  return deckDefinitions.reduce((sum, deck) => sum + deck.cards.length, 0);
}

export function getVocabularyBankAudit() {
  const pedagogicalAudit = auditVocabularyCurriculum(deckDefinitions, { target: VOCABULARY_BANK_TARGET });
  return {
    decks: pedagogicalAudit.totalDecks,
    cards: pedagogicalAudit.totalCards,
    countsByLevel: pedagogicalAudit.countsByLevel,
    target: pedagogicalAudit.target,
    completionPercent: pedagogicalAudit.completionPercent,
    duplicates: pedagogicalAudit.duplicates,
    repeatedTranslations: pedagogicalAudit.repeatedTranslations,
    structuralIssues: pedagogicalAudit.issues.filter((item) => item.type.startsWith('missing-') || item.type.startsWith('example-')),
    chunkIssues: pedagogicalAudit.issues.filter((item) => item.type.startsWith('chunk-') || item.type === 'missing-chunk'),
    pedagogicalIssues: pedagogicalAudit.issues,
    bySeverity: pedagogicalAudit.bySeverity,
    passedStructure: pedagogicalAudit.passedCritical,
    passedChunks: !pedagogicalAudit.issues.some((item) => item.type.startsWith('chunk-') || item.type === 'missing-chunk'),
    passedDuplicates: !pedagogicalAudit.issues.some((item) => item.type === 'excessive-duplicate-word'),
    passedPedagogicalAudit: pedagogicalAudit.passedPedagogicalAudit,
  };
}

export const VOCABULARY_BANK_TARGET = 7500;
