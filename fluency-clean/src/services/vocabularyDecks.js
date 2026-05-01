const deckDefinitions = [
  {
    id: 'core-a1',
    title: 'Essenciais A1',
    topic: 'base',
    level: 'A1',
    cards: [
      ['I', 'eu', 'I am a student.'], ['you', 'você', 'You are my friend.'], ['he', 'ele', 'He is at home.'], ['she', 'ela', 'She likes music.'], ['we', 'nós', 'We study English.'], ['they', 'eles/elas', 'They are here.'],
      ['be', 'ser/estar', 'I want to be better.'], ['have', 'ter', 'I have a book.'], ['do', 'fazer', 'I do my homework.'], ['go', 'ir', 'I go to school.'], ['come', 'vir', 'Come here, please.'], ['make', 'fazer/criar', 'I make coffee.'],
      ['say', 'dizer', 'Say it again.'], ['get', 'pegar/obter', 'I get up early.'], ['know', 'saber/conhecer', 'I know this word.'], ['think', 'pensar', 'I think in English.'], ['want', 'querer', 'I want water.'], ['need', 'precisar', 'I need help.'],
      ['like', 'gostar', 'I like apples.'], ['see', 'ver', 'I see a car.'], ['look', 'olhar/parecer', 'Look at this.'], ['use', 'usar', 'I use my phone.'], ['work', 'trabalhar', 'I work every day.'], ['learn', 'aprender', 'I learn English.'],
    ],
  },
  {
    id: 'people-family', title: 'Pessoas e família', topic: 'people', level: 'A1', cards: [
      ['family', 'família', 'My family is big.'], ['mother', 'mãe', 'My mother is kind.'], ['father', 'pai', 'My father works a lot.'], ['brother', 'irmão', 'I have one brother.'], ['sister', 'irmã', 'My sister studies.'], ['friend', 'amigo', 'He is my friend.'],
      ['person', 'pessoa', 'She is a nice person.'], ['people', 'pessoas', 'People are waiting.'], ['child', 'criança', 'The child is happy.'], ['children', 'crianças', 'Children play outside.'], ['man', 'homem', 'The man is here.'], ['woman', 'mulher', 'The woman is a teacher.'],
      ['boy', 'menino', 'The boy is young.'], ['girl', 'menina', 'The girl is reading.'], ['parent', 'pai/mãe', 'A parent helps a child.'], ['teacher', 'professor', 'My teacher speaks English.'], ['student', 'estudante', 'I am a student.'], ['neighbor', 'vizinho', 'My neighbor is friendly.'],
      ['name', 'nome', 'What is your name?'], ['age', 'idade', 'What is your age?'], ['home', 'lar/casa', 'I am at home.'], ['life', 'vida', 'Life is good.'], ['group', 'grupo', 'We are a group.'], ['team', 'equipe', 'Our team is small.'],
    ]
  },
  {
    id: 'daily-routine', title: 'Rotina diária', topic: 'routine', level: 'A1', cards: [
      ['wake', 'acordar', 'I wake up early.'], ['sleep', 'dormir', 'I sleep at night.'], ['eat', 'comer', 'I eat breakfast.'], ['drink', 'beber', 'I drink water.'], ['brush', 'escovar', 'I brush my teeth.'], ['wash', 'lavar', 'I wash my hands.'],
      ['study', 'estudar', 'I study English.'], ['read', 'ler', 'I read a book.'], ['write', 'escrever', 'I write a sentence.'], ['listen', 'ouvir', 'I listen to audio.'], ['speak', 'falar', 'I speak English.'], ['practice', 'praticar', 'I practice every day.'],
      ['morning', 'manhã', 'I study in the morning.'], ['afternoon', 'tarde', 'I work in the afternoon.'], ['evening', 'noite/início da noite', 'I relax in the evening.'], ['night', 'noite', 'I sleep at night.'], ['today', 'hoje', 'Today is Monday.'], ['tomorrow', 'amanhã', 'Tomorrow I study.'],
      ['always', 'sempre', 'I always drink water.'], ['usually', 'geralmente', 'I usually study at night.'], ['sometimes', 'às vezes', 'I sometimes read.'], ['never', 'nunca', 'I never stop learning.'], ['early', 'cedo', 'I wake up early.'], ['late', 'tarde/atrasado', 'I sleep late.'],
    ]
  },
  {
    id: 'food-drinks', title: 'Comida e bebidas', topic: 'food', level: 'A1', cards: [
      ['food', 'comida', 'I like food.'], ['water', 'água', 'I drink water.'], ['coffee', 'café', 'I make coffee.'], ['tea', 'chá', 'I drink tea.'], ['milk', 'leite', 'Milk is cold.'], ['juice', 'suco', 'I like orange juice.'],
      ['bread', 'pão', 'I eat bread.'], ['rice', 'arroz', 'I eat rice.'], ['beans', 'feijão', 'I like beans.'], ['meat', 'carne', 'I eat meat.'], ['chicken', 'frango', 'Chicken is good.'], ['fish', 'peixe', 'I eat fish.'],
      ['egg', 'ovo', 'I eat an egg.'], ['cheese', 'queijo', 'Cheese is delicious.'], ['apple', 'maçã', 'I like apples.'], ['banana', 'banana', 'Bananas are yellow.'], ['orange', 'laranja', 'I eat an orange.'], ['salad', 'salada', 'I make a salad.'],
      ['breakfast', 'café da manhã', 'I eat breakfast.'], ['lunch', 'almoço', 'Lunch is ready.'], ['dinner', 'jantar', 'Dinner is at seven.'], ['hungry', 'com fome', 'I am hungry.'], ['thirsty', 'com sede', 'I am thirsty.'], ['delicious', 'delicioso', 'The food is delicious.'],
    ]
  },
  {
    id: 'home-objects', title: 'Casa e objetos', topic: 'home', level: 'A1', cards: [
      ['house', 'casa', 'My house is small.'], ['room', 'quarto/cômodo', 'This room is clean.'], ['bed', 'cama', 'The bed is big.'], ['chair', 'cadeira', 'Sit on the chair.'], ['table', 'mesa', 'The book is on the table.'], ['door', 'porta', 'Open the door.'],
      ['window', 'janela', 'Close the window.'], ['kitchen', 'cozinha', 'I am in the kitchen.'], ['bathroom', 'banheiro', 'The bathroom is clean.'], ['phone', 'telefone', 'My phone is new.'], ['computer', 'computador', 'I use a computer.'], ['book', 'livro', 'I read a book.'],
      ['notebook', 'caderno', 'Open your notebook.'], ['pen', 'caneta', 'I need a pen.'], ['bag', 'bolsa/mochila', 'My bag is heavy.'], ['key', 'chave', 'Where is my key?'], ['money', 'dinheiro', 'I need money.'], ['clothes', 'roupas', 'My clothes are clean.'],
      ['shirt', 'camisa', 'This shirt is blue.'], ['shoes', 'sapatos', 'My shoes are black.'], ['light', 'luz', 'Turn on the light.'], ['picture', 'foto/quadro', 'I see a picture.'], ['floor', 'chão', 'The floor is clean.'], ['wall', 'parede', 'The wall is white.'],
    ]
  },
  {
    id: 'places-city', title: 'Lugares e cidade', topic: 'places', level: 'A1', cards: [
      ['city', 'cidade', 'My city is small.'], ['street', 'rua', 'The street is busy.'], ['school', 'escola', 'I go to school.'], ['store', 'loja', 'I go to the store.'], ['market', 'mercado', 'The market is open.'], ['bank', 'banco', 'The bank is near.'],
      ['restaurant', 'restaurante', 'The restaurant is good.'], ['cafe', 'cafeteria', 'I am at a cafe.'], ['park', 'parque', 'I walk in the park.'], ['hospital', 'hospital', 'The hospital is far.'], ['church', 'igreja', 'The church is old.'], ['station', 'estação', 'The station is busy.'],
      ['bus', 'ônibus', 'I take the bus.'], ['car', 'carro', 'I have a car.'], ['bike', 'bicicleta', 'I ride a bike.'], ['road', 'estrada', 'The road is long.'], ['place', 'lugar', 'This place is nice.'], ['near', 'perto', 'The school is near.'],
      ['far', 'longe', 'The park is far.'], ['left', 'esquerda', 'Turn left.'], ['right', 'direita', 'Turn right.'], ['inside', 'dentro', 'I am inside.'], ['outside', 'fora', 'I am outside.'], ['here', 'aqui', 'I am here.'],
    ]
  },
  {
    id: 'actions-verbs', title: 'Verbos comuns', topic: 'verbs', level: 'A1-A2', cards: [
      ['start', 'começar', 'Start now.'], ['stop', 'parar', 'Stop here.'], ['open', 'abrir', 'Open the book.'], ['close', 'fechar', 'Close the door.'], ['help', 'ajudar', 'Help me, please.'], ['call', 'chamar/ligar', 'Call me later.'],
      ['try', 'tentar', 'Try again.'], ['ask', 'perguntar', 'Ask a question.'], ['answer', 'responder', 'Answer in English.'], ['buy', 'comprar', 'I buy food.'], ['sell', 'vender', 'They sell cars.'], ['pay', 'pagar', 'I pay with cash.'],
      ['give', 'dar', 'Give me the book.'], ['take', 'pegar/levar', 'Take this.'], ['bring', 'trazer', 'Bring your notebook.'], ['find', 'encontrar', 'Find the word.'], ['keep', 'manter/guardar', 'Keep practicing.'], ['leave', 'sair/deixar', 'I leave at eight.'],
      ['move', 'mover', 'Move the chair.'], ['play', 'brincar/tocar/jogar', 'I play music.'], ['watch', 'assistir', 'I watch a video.'], ['wait', 'esperar', 'Wait a minute.'], ['walk', 'andar', 'I walk every day.'], ['run', 'correr', 'I run in the park.'],
    ]
  },
  {
    id: 'adjectives', title: 'Adjetivos úteis', topic: 'adjectives', level: 'A1-A2', cards: [
      ['good', 'bom', 'This is good.'], ['bad', 'ruim', 'This is bad.'], ['big', 'grande', 'My house is big.'], ['small', 'pequeno', 'The room is small.'], ['new', 'novo', 'I have a new phone.'], ['old', 'velho/antigo', 'This book is old.'],
      ['young', 'jovem', 'The boy is young.'], ['happy', 'feliz', 'I am happy.'], ['sad', 'triste', 'She is sad.'], ['tired', 'cansado', 'I am tired.'], ['easy', 'fácil', 'English is easy today.'], ['hard', 'difícil', 'This word is hard.'],
      ['fast', 'rápido', 'The car is fast.'], ['slow', 'lento', 'Speak slowly.'], ['hot', 'quente', 'The coffee is hot.'], ['cold', 'frio', 'The water is cold.'], ['clean', 'limpo', 'The room is clean.'], ['dirty', 'sujo', 'The floor is dirty.'],
      ['beautiful', 'bonito', 'The city is beautiful.'], ['important', 'importante', 'English is important.'], ['different', 'diferente', 'This is different.'], ['same', 'mesmo/igual', 'It is the same.'], ['ready', 'pronto', 'I am ready.'], ['busy', 'ocupado', 'I am busy.'],
    ]
  },
  {
    id: 'questions-connectors', title: 'Perguntas e conectores', topic: 'grammar', level: 'A1-A2', cards: [
      ['what', 'o que/qual', 'What is your name?'], ['where', 'onde', 'Where are you from?'], ['when', 'quando', 'When do you study?'], ['why', 'por que', 'Why are you here?'], ['who', 'quem', 'Who is your teacher?'], ['how', 'como', 'How are you?'],
      ['and', 'e', 'I study and work.'], ['but', 'mas', 'I like it, but it is hard.'], ['because', 'porque', 'I study because I want to learn.'], ['or', 'ou', 'Tea or coffee?'], ['so', 'então/por isso', 'I am tired, so I sleep.'], ['if', 'se', 'If you want, start now.'],
      ['with', 'com', 'I study with a friend.'], ['without', 'sem', 'I drink coffee without sugar.'], ['for', 'para/por', 'This is for you.'], ['from', 'de', 'I am from Brazil.'], ['to', 'para', 'I go to school.'], ['in', 'em/dentro', 'I live in Brazil.'],
      ['on', 'em/sobre', 'The book is on the table.'], ['at', 'em', 'I am at home.'], ['before', 'antes', 'I study before dinner.'], ['after', 'depois', 'I sleep after work.'], ['again', 'de novo', 'Say it again.'], ['also', 'também', 'I also study English.'],
    ]
  },
  {
    id: 'time-numbers', title: 'Tempo e números', topic: 'time', level: 'A1', cards: [
      ['one', 'um', 'I have one book.'], ['two', 'dois', 'I have two pens.'], ['three', 'três', 'I know three words.'], ['four', 'quatro', 'Four people are here.'], ['five', 'cinco', 'I study five days.'], ['ten', 'dez', 'I have ten minutes.'],
      ['day', 'dia', 'Today is a good day.'], ['week', 'semana', 'This week is busy.'], ['month', 'mês', 'This month is important.'], ['year', 'ano', 'This year I learn English.'], ['hour', 'hora', 'I study for one hour.'], ['minute', 'minuto', 'Wait one minute.'],
      ['time', 'tempo/hora', 'What time is it?'], ['now', 'agora', 'Start now.'], ['soon', 'em breve/logo', 'See you soon.'], ['first', 'primeiro', 'First, listen.'], ['last', 'último/passado', 'This is the last card.'], ['next', 'próximo', 'Next question, please.'],
      ['every', 'todo/cada', 'I study every day.'], ['many', 'muitos', 'I know many words.'], ['much', 'muito', 'Thank you very much.'], ['few', 'poucos', 'I know a few words.'], ['more', 'mais', 'I want more practice.'], ['less', 'menos', 'I need less noise.'],
    ]
  },
  {
    id: 'work-study', title: 'Trabalho e estudo', topic: 'work', level: 'A1-A2', cards: [
      ['job', 'emprego', 'I need a job.'], ['work', 'trabalho/trabalhar', 'I work today.'], ['office', 'escritório', 'I work in an office.'], ['company', 'empresa', 'The company is big.'], ['boss', 'chefe', 'My boss is busy.'], ['meeting', 'reunião', 'The meeting is today.'],
      ['email', 'e-mail', 'I write an email.'], ['message', 'mensagem', 'Send a message.'], ['task', 'tarefa', 'This task is easy.'], ['project', 'projeto', 'The project is new.'], ['plan', 'plano', 'I have a plan.'], ['goal', 'meta', 'My goal is English.'],
      ['class', 'aula/turma', 'I have class today.'], ['lesson', 'lição/aula', 'This lesson is useful.'], ['test', 'teste/prova', 'The test is hard.'], ['question', 'pergunta', 'Ask a question.'], ['answer', 'resposta', 'Write an answer.'], ['mistake', 'erro', 'Mistakes help me learn.'],
      ['correct', 'correto', 'This answer is correct.'], ['wrong', 'errado', 'This word is wrong.'], ['review', 'revisão', 'Review the cards.'], ['remember', 'lembrar', 'Remember this word.'], ['understand', 'entender', 'I understand you.'], ['improve', 'melhorar', 'I want to improve.'],
    ]
  },
  {
    id: 'feelings-health', title: 'Sentimentos e saúde', topic: 'health', level: 'A1-A2', cards: [
      ['feel', 'sentir', 'I feel good.'], ['fine', 'bem', 'I am fine.'], ['great', 'ótimo', 'That is great.'], ['okay', 'ok/bem', 'I am okay.'], ['sick', 'doente', 'I feel sick.'], ['healthy', 'saudável', 'I want to be healthy.'],
      ['pain', 'dor', 'I have pain.'], ['head', 'cabeça', 'My head hurts.'], ['hand', 'mão', 'My hand is cold.'], ['foot', 'pé', 'My foot hurts.'], ['eye', 'olho', 'My eye is red.'], ['mouth', 'boca', 'Open your mouth.'],
      ['heart', 'coração', 'My heart is strong.'], ['body', 'corpo', 'My body is tired.'], ['doctor', 'médico', 'I need a doctor.'], ['medicine', 'remédio', 'Take the medicine.'], ['rest', 'descanso/descansar', 'I need rest.'], ['exercise', 'exercício', 'Exercise is good.'],
      ['afraid', 'com medo', 'I am afraid.'], ['angry', 'bravo', 'He is angry.'], ['calm', 'calmo', 'Stay calm.'], ['worried', 'preocupado', 'I am worried.'], ['excited', 'animado', 'I am excited.'], ['proud', 'orgulhoso', 'I am proud.'],
    ]
  },
  {
    id: 'travel-survival', title: 'Viagem e sobrevivência', topic: 'travel', level: 'A1-A2', cards: [
      ['travel', 'viajar', 'I like to travel.'], ['trip', 'viagem', 'This trip is fun.'], ['airport', 'aeroporto', 'The airport is big.'], ['ticket', 'bilhete/passagem', 'I need a ticket.'], ['passport', 'passaporte', 'My passport is here.'], ['hotel', 'hotel', 'The hotel is nice.'],
      ['reservation', 'reserva', 'I have a reservation.'], ['map', 'mapa', 'Use the map.'], ['address', 'endereço', 'What is the address?'], ['help', 'ajuda', 'I need help.'], ['please', 'por favor', 'Help me, please.'], ['thanks', 'obrigado', 'Thanks for your help.'],
      ['sorry', 'desculpa', 'Sorry, I am late.'], ['excuse', 'com licença/desculpar', 'Excuse me, please.'], ['lost', 'perdido', 'I am lost.'], ['safe', 'seguro', 'This place is safe.'], ['dangerous', 'perigoso', 'That road is dangerous.'], ['police', 'polícia', 'Call the police.'],
      ['train', 'trem', 'The train is late.'], ['plane', 'avião', 'The plane is ready.'], ['taxi', 'táxi', 'I need a taxi.'], ['walk', 'andar', 'Can I walk there?'], ['arrive', 'chegar', 'I arrive today.'], ['leave', 'sair/partir', 'I leave tomorrow.'],
    ]
  },
];

function normalizeCard(deck, item, index) {
  const [word, translation, example] = item;
  return {
    id: `${deck.id}-${index}-${word}`,
    word,
    translation,
    definition: `Palavra comum de ${deck.title.toLowerCase()}: ${translation}.`,
    example,
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

export const VOCABULARY_BANK_TARGET = 2000;
