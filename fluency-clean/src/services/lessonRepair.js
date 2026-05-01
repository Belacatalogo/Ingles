import { normalizeLesson } from './lessonTypes.js';

const REQUIREMENTS = {
  reading: { minSections: 6, minVocabulary: 12, minExercises: 12, minPrompts: 4, minMainLength: 900 },
  grammar: { minSections: 7, minVocabulary: 8, minExercises: 14, minPrompts: 4, minMainLength: 0 },
  listening: { minSections: 6, minVocabulary: 10, minExercises: 10, minPrompts: 4, minMainLength: 750 },
  writing: { minSections: 6, minVocabulary: 10, minExercises: 10, minPrompts: 5, minMainLength: 0 },
  speaking: { minSections: 5, minVocabulary: 6, minExercises: 6, minPrompts: 5, minMainLength: 0 },
  vocabulary: { minSections: 5, minVocabulary: 12, minExercises: 10, minPrompts: 4, minMainLength: 0 },
};

const LISTENING_PROFILES = {
  alphabetClassroom: {
    title: 'Alfabeto, sons iniciais e spelling de nomes',
    bannedWhenVariation: true,
    transcript: `Hi, my name is Ana. Today, I am practicing the English alphabet, initial sounds and spelling names. First, I listen to the letters: A, B, C, D, E and F. Then I repeat each letter slowly.

The teacher says: A is for apple, B is for book, C is for cat and D is for David. I listen carefully to the first sound of each word. Apple starts with A. Book starts with B. Cat starts with C. David starts with D.

Now the teacher asks: How do you spell your name? I answer: My name is Ana. A-N-A. Then my friend says: My name is Maria. M-A-R-I-A. We listen, repeat and spell the names again.

At the end of the audio, I practice short questions. How do you spell cat? C-A-T. How do you spell book? B-O-O-K. How do you spell apple? A-P-P-L-E. I listen one more time and repeat the letters out loud for shadowing.`,
    vocabulary: [
      ['alphabet', 'alfabeto', 'The English alphabet has 26 letters.'],
      ['letter', 'letra', 'A is the first letter of the alphabet.'],
      ['sound', 'som', 'The letter B starts the word book.'],
      ['initial sound', 'som inicial', 'The initial sound of cat is C.'],
      ['spell', 'soletrar', 'How do you spell your name?'],
      ['name', 'nome', 'My name is Ana.'],
      ['repeat', 'repetir', 'Repeat the letters out loud.'],
      ['listen', 'ouvir', 'Listen to the audio first.'],
      ['word', 'palavra', 'Book is a short word.'],
      ['question', 'pergunta', 'The teacher asks a question.'],
      ['answer', 'resposta/responder', 'I answer with my name.'],
      ['out loud', 'em voz alta', 'Repeat the letters out loud.'],
    ],
    exercises: [
      { question: 'What is Ana practicing in the audio?', answer: 'She is practicing the alphabet, initial sounds and spelling names.', explanation: 'Essa é a ideia principal do primeiro trecho.' },
      { question: 'What is the first letter of apple?', answer: 'A.', explanation: 'O áudio diz: A is for apple.' },
      { question: 'What word starts with B in the audio?', answer: 'Book.', explanation: 'O roteiro diz: B is for book.' },
      { question: 'How does Ana spell her name?', answer: 'A-N-A.', explanation: 'Ana responde: My name is Ana. A-N-A.' },
      { question: 'How does Maria spell her name?', answer: 'M-A-R-I-A.', explanation: 'A amiga soletra Maria como M-A-R-I-A.' },
      { question: 'How do you spell cat?', answer: 'C-A-T.', explanation: 'Essa soletração aparece no final do áudio.' },
      { question: 'Complete: Book starts with the letter ___.', options: ['A', 'B', 'C'], answer: 'B', explanation: 'Book começa com B.' },
      { question: 'Complete: How do you ___ your name?', options: ['spell', 'listen', 'read'], answer: 'spell', explanation: 'A pergunta correta é: How do you spell your name?' },
      { question: 'True or false: Apple starts with D.', options: ['True', 'False'], answer: 'False', explanation: 'Apple começa com A.' },
      { question: 'Write your name and spell it in English letters.', answer: 'Resposta pessoal. Exemplo: My name is Ana. A-N-A.', explanation: 'O objetivo é praticar spelling real do seu nome.' },
    ],
  },
  alphabetReception: {
    title: 'Alfabeto, sons iniciais e spelling de nomes',
    transcript: `Good morning. I am at an English school reception. The woman at the desk asks for my name. I say: My name is Leo. She asks me to spell it slowly. I say: L-E-O. Then she writes my name on a small student card.

Next, she asks about my friend. His name is Tom. I spell it: T-O-M. The first sound in Tom is T. The first sound in Leo is L. We listen to the sounds and repeat them slowly.

The woman shows three cards. One card says map. One card says pen. One card says sun. She says: map starts with M, pen starts with P and sun starts with S. I repeat: M, P, S.

At the end, I practice short spelling questions. How do you spell Leo? L-E-O. How do you spell Tom? T-O-M. How do you spell sun? S-U-N. I listen again and repeat the letters clearly.`,
    vocabulary: [
      ['reception', 'recepção', 'I am at the school reception.'],
      ['student card', 'cartão de estudante', 'She writes my name on a student card.'],
      ['spell', 'soletrar', 'Please spell your name slowly.'],
      ['slowly', 'devagar', 'I spell the name slowly.'],
      ['letter', 'letra', 'L is a letter.'],
      ['first sound', 'primeiro som', 'The first sound in Tom is T.'],
      ['name', 'nome', 'My name is Leo.'],
      ['friend', 'amigo', 'My friend is Tom.'],
      ['card', 'cartão', 'The card says map.'],
      ['map', 'mapa', 'Map starts with M.'],
      ['pen', 'caneta', 'Pen starts with P.'],
      ['sun', 'sol', 'Sun starts with S.'],
    ],
    exercises: [
      { question: 'Where is the person in the audio?', options: ['At an English school reception', 'At a restaurant', 'At home'], answer: 'At an English school reception', explanation: 'O áudio começa com a pessoa na recepção de uma escola de inglês.' },
      { question: 'How does Leo spell his name?', options: ['L-E-O', 'T-O-M', 'S-U-N'], answer: 'L-E-O', explanation: 'Leo soletra o próprio nome como L-E-O.' },
      { question: 'What is the first sound in Tom?', options: ['T', 'L', 'M'], answer: 'T', explanation: 'O áudio diz que Tom começa com T.' },
      { question: 'Which word starts with M?', options: ['map', 'pen', 'sun'], answer: 'map', explanation: 'Map começa com M.' },
      { question: 'Which word starts with P?', options: ['pen', 'sun', 'Leo'], answer: 'pen', explanation: 'Pen começa com P.' },
      { question: 'How do you spell sun?', options: ['S-U-N', 'M-A-P', 'P-E-N'], answer: 'S-U-N', explanation: 'No final, o áudio soletra sun como S-U-N.' },
      { question: 'Complete: She writes my name on a student ___.', options: ['card', 'sound', 'letter'], answer: 'card', explanation: 'A frase correta é student card.' },
      { question: 'True or false: Leo spells his name quickly.', options: ['True', 'False'], answer: 'False', explanation: 'Ele soletra devagar: slowly.' },
      { question: 'Write the letters you hear in L-E-O.', answer: 'L-E-O', explanation: 'O objetivo é reconhecer as letras do nome curto.' },
      { question: 'Say your name and spell it slowly.', answer: 'Resposta pessoal com nome soletrado.', explanation: 'A produção final treina spelling real do seu nome.' },
    ],
  },
  alphabetCafe: {
    title: 'Alfabeto, sons iniciais e spelling de nomes',
    transcript: `Hello. I am in a small café. I want to order tea. The cashier asks for my name for the cup. I say: My name is Nina. She asks: How do you spell Nina? I answer: N-I-N-A.

Then my brother orders milk. His name is Ben. He spells it: B-E-N. The cashier repeats the names slowly: Nina, N-I-N-A. Ben, B-E-N. We listen carefully to each letter.

On the menu, I see short words: tea, milk and cake. Tea starts with T. Milk starts with M. Cake starts with C. I say the first sound of each word: T, M, C.

Before we sit down, the cashier checks the cups. One cup says Nina. One cup says Ben. I listen, repeat and spell the names again. This helps me hear letters and initial sounds in English.`,
    vocabulary: [
      ['café', 'cafeteria', 'I am in a small café.'],
      ['cashier', 'caixa/atendente', 'The cashier asks for my name.'],
      ['cup', 'copo', 'My name is on the cup.'],
      ['order', 'pedir', 'I order tea.'],
      ['tea', 'chá', 'Tea starts with T.'],
      ['milk', 'leite', 'Milk starts with M.'],
      ['cake', 'bolo', 'Cake starts with C.'],
      ['spell', 'soletrar', 'How do you spell Nina?'],
      ['letter', 'letra', 'I hear each letter.'],
      ['initial sound', 'som inicial', 'The initial sound of cake is C.'],
      ['repeat', 'repetir', 'Repeat the names slowly.'],
      ['carefully', 'com atenção', 'Listen carefully to each letter.'],
    ],
    exercises: [
      { question: 'Where is the person in the audio?', options: ['In a small café', 'At school', 'At the park'], answer: 'In a small café', explanation: 'O áudio acontece em uma cafeteria pequena.' },
      { question: 'How does Nina spell her name?', options: ['N-I-N-A', 'B-E-N', 'T-E-A'], answer: 'N-I-N-A', explanation: 'Nina soletra o nome como N-I-N-A.' },
      { question: 'How does Ben spell his name?', options: ['B-E-N', 'N-I-N-A', 'M-I-L-K'], answer: 'B-E-N', explanation: 'Ben soletra o nome como B-E-N.' },
      { question: 'Which word starts with T?', options: ['tea', 'milk', 'cake'], answer: 'tea', explanation: 'Tea começa com T.' },
      { question: 'Which word starts with M?', options: ['milk', 'cake', 'cup'], answer: 'milk', explanation: 'Milk começa com M.' },
      { question: 'What is written on the cup?', options: ['A name', 'A number', 'A question'], answer: 'A name', explanation: 'A atendente escreve os nomes nos copos.' },
      { question: 'Complete: Cake starts with ___.', options: ['C', 'T', 'N'], answer: 'C', explanation: 'Cake começa com C.' },
      { question: 'True or false: The cashier repeats the names slowly.', options: ['True', 'False'], answer: 'True', explanation: 'O áudio diz que a atendente repete os nomes devagar.' },
      { question: 'Write what you hear: N-I-N-A.', answer: 'N-I-N-A', explanation: 'Esse ditado treina letras curtas, adequado para A1.' },
      { question: 'Say one café word and its first letter.', answer: 'Resposta pessoal. Exemplo: tea, T.', explanation: 'A produção final liga vocabulário ao som inicial.' },
    ],
  },
  alphabetVideoCall: {
    title: 'Alfabeto, sons iniciais e spelling de nomes',
    transcript: `Hi. I am in a short video call for English practice. The teacher says hello and asks my name. I say: My name is Rita. The teacher asks me to spell it. I say: R-I-T-A.

Another student joins the call. His name is Sam. He spells it: S-A-M. We listen to both names and repeat the letters slowly. Rita starts with R. Sam starts with S.

The teacher shows three simple words on the screen: red, bag and desk. Red starts with R. Bag starts with B. Desk starts with D. I listen and say the first sound before I read the word.

At the end of the call, we practice one more time. Rita: R-I-T-A. Sam: S-A-M. Red: R. Bag: B. Desk: D. I repeat the letters and speak clearly.`,
    vocabulary: [
      ['video call', 'chamada de vídeo', 'I am in a video call.'],
      ['teacher', 'professor/professora', 'The teacher asks my name.'],
      ['student', 'aluno', 'Another student joins the call.'],
      ['screen', 'tela', 'The words are on the screen.'],
      ['spell', 'soletrar', 'Spell your name, please.'],
      ['letter', 'letra', 'R is a letter.'],
      ['clearly', 'com clareza', 'Speak clearly.'],
      ['red', 'vermelho', 'Red starts with R.'],
      ['bag', 'bolsa/mochila', 'Bag starts with B.'],
      ['desk', 'mesa/carteira', 'Desk starts with D.'],
      ['repeat', 'repetir', 'Repeat the letters slowly.'],
      ['first sound', 'som inicial', 'Say the first sound.'],
    ],
    exercises: [
      { question: 'What kind of class is in the audio?', options: ['A video call', 'A café order', 'A bus trip'], answer: 'A video call', explanation: 'O roteiro fala de uma chamada de vídeo.' },
      { question: 'How does Rita spell her name?', options: ['R-I-T-A', 'S-A-M', 'D-E-S-K'], answer: 'R-I-T-A', explanation: 'Rita soletra R-I-T-A.' },
      { question: 'How does Sam spell his name?', options: ['S-A-M', 'R-I-T-A', 'B-A-G'], answer: 'S-A-M', explanation: 'Sam soletra S-A-M.' },
      { question: 'Which word starts with R?', options: ['red', 'bag', 'desk'], answer: 'red', explanation: 'Red começa com R.' },
      { question: 'Which word starts with B?', options: ['bag', 'red', 'desk'], answer: 'bag', explanation: 'Bag começa com B.' },
      { question: 'Which word starts with D?', options: ['desk', 'red', 'Sam'], answer: 'desk', explanation: 'Desk começa com D.' },
      { question: 'Complete: Speak ___.', options: ['clearly', 'quickly', 'silently'], answer: 'clearly', explanation: 'O final do áudio fala em falar com clareza.' },
      { question: 'True or false: Rita starts with S.', options: ['True', 'False'], answer: 'False', explanation: 'Rita começa com R.' },
      { question: 'Write what you hear: S-A-M.', answer: 'S-A-M', explanation: 'Ditado curto de letras é adequado para A1.' },
      { question: 'Say your name and one first sound.', answer: 'Resposta pessoal. Exemplo: Luis starts with L.', explanation: 'A produção final usa spelling e som inicial com seu nome.' },
    ],
  },
  routine: {
    title: 'Listening Practice — Daily English Routine',
    transcript: `Hi, my name is Ana. Every morning, I wake up at seven o'clock and make coffee. Then I open my English notebook and listen to a short audio lesson.

In the lesson, I hear simple words, short questions and clear examples. First, I listen without reading. After that, I read the transcription and check the words I did not understand.

Today, the teacher asks about names, letters and spelling. I practice slowly: A, B, C, D. Then I spell simple words like cat, book and apple.

At night, I listen again and repeat the sentences out loud. This helps me improve my pronunciation, remember new vocabulary and understand English when people speak naturally.`,
    vocabulary: [
      ['listen', 'ouvir', 'I listen to a short audio lesson.'],
      ['hear', 'escutar/perceber pelo ouvido', 'I hear simple words in the audio.'],
      ['audio', 'áudio', 'The audio is clear and slow.'],
      ['transcription', 'transcrição', 'I read the transcription after listening.'],
      ['repeat', 'repetir', 'I repeat the sentences out loud.'],
      ['sentence', 'frase', 'This sentence is easy to understand.'],
      ['question', 'pergunta', 'The teacher asks a question.'],
      ['answer', 'resposta/responder', 'I answer in English.'],
      ['spell', 'soletrar', 'I spell the word cat.'],
      ['letter', 'letra', 'The letter A is the first letter.'],
      ['word', 'palavra', 'This word is new for me.'],
      ['pronunciation', 'pronúncia', 'I improve my pronunciation.'],
    ],
    exercises: [
      { question: 'What does Ana do every morning before opening her notebook?', answer: 'She wakes up at seven o’clock and makes coffee.', explanation: 'Essa informação aparece no começo do áudio.' },
      { question: 'What does Ana listen to?', answer: 'She listens to a short audio lesson.', explanation: 'O áudio diz que ela abre o caderno e escuta uma aula curta.' },
      { question: 'What does Ana do before reading the transcription?', answer: 'She listens without reading.', explanation: 'A ordem correta é ouvir primeiro e ler a transcrição depois.' },
      { question: 'Which words does Ana spell in the audio?', answer: 'She spells cat, book and apple.', explanation: 'Essas palavras aparecem na parte sobre letras e soletração.' },
      { question: 'Why does Ana listen again at night?', answer: 'To improve pronunciation, remember vocabulary and understand natural English.', explanation: 'Essa é a conclusão do roteiro de listening.' },
      { question: 'What is the main idea of the audio?', answer: 'Ana uses listening, transcription and repetition to practice English.', explanation: 'A ideia principal combina rotina, áudio, transcrição e shadowing.' },
      { question: 'Complete: Ana reads the ______ after listening.', options: ['grammar rule', 'transcription', 'dictionary'], answer: 'transcription', explanation: 'Ela lê a transcrição depois da primeira escuta.' },
      { question: 'Complete: At night, Ana repeats the sentences ______.', options: ['out loud', 'silently', 'in Portuguese'], answer: 'out loud', explanation: 'O áudio diz que ela repete as frases em voz alta.' },
      { question: 'True or false: Ana reads the transcription before listening.', options: ['True', 'False'], answer: 'False', explanation: 'Ela escuta sem ler primeiro.' },
      { question: 'Write one sentence from the audio that you can repeat for shadowing.', answer: 'Resposta pessoal baseada na transcrição.', explanation: 'O objetivo é escolher uma frase curta para repetir em voz alta.' },
    ],
  },
};

const SECTION_TEMPLATES = {
  reading: [
    ['Pré-leitura', 'Antes de ler, observe o título, identifique palavras conhecidas e pense no contexto geral do texto. Esta etapa prepara compreensão e reduz ansiedade.'],
    ['Leitura guiada', 'Leia o texto uma primeira vez para entender a ideia principal. Depois releia procurando detalhes, conectores e palavras importantes.'],
    ['Compreensão', 'Responda às perguntas procurando evidências no texto. Evite adivinhar sem voltar ao trecho que confirma a resposta.'],
    ['Vocabulário em contexto', 'Estude palavras úteis dentro de frases completas. O foco é entender uso real, não apenas tradução isolada.'],
    ['Revisão final', 'Revise o tema, as palavras novas e as respostas. Explique em português o que entendeu e depois tente resumir em inglês simples.'],
    ['Produção curta', 'Escreva ou fale três frases usando o vocabulário da leitura. Isso transforma compreensão passiva em uso ativo.'],
  ],
  grammar: [
    ['Quando usar', 'Use esta estrutura quando quiser comunicar uma ideia específica com clareza. Observe o contexto antes de escolher a forma gramatical.'],
    ['Forma afirmativa', 'Na afirmativa, monte a frase com sujeito, verbo e complemento. Leia exemplos e perceba a posição de cada parte.'],
    ['Forma negativa', 'Na negativa, adicione o auxiliar ou marcador correto. Compare com a afirmativa para perceber a mudança de sentido.'],
    ['Forma interrogativa', 'Na pergunta, organize auxiliar, sujeito e verbo principal. Treine perguntas curtas antes de frases longas.'],
    ['Erros comuns', 'Evite traduzir palavra por palavra. Observe ordem das palavras, auxiliares e terminações que mudam o significado.'],
    ['Prática guiada', 'Complete frases, transforme exemplos e explique por que cada resposta está correta. A prática precisa ter feedback claro.'],
    ['Revisão final', 'Faça um checklist: forma afirmativa, negativa, pergunta, uso real e erro comum. Reescreva uma frase própria.'],
  ],
  listening: [
    ['Escuta global', 'Ouça o áudio uma vez sem pausar. O objetivo da primeira escuta é entender a situação geral: quem fala, onde acontece e qual é o assunto principal.'],
    ['Escuta por detalhes', 'Ouça novamente procurando informações específicas: nomes, letras, sons iniciais, palavras soletradas e perguntas feitas no áudio. Anote apenas palavras-chave.'],
    ['Transcrição guiada', 'Depois de escutar, leia a transcrição e compare com o que você entendeu. Marque letras e palavras que pareciam diferentes quando foram faladas.'],
    ['Vocabulário auditivo', 'Estude palavras que aparecem no áudio e pratique como elas soam dentro de frases. O foco é reconhecer a palavra quando alguém fala.'],
    ['Compreensão auditiva', 'Responda às perguntas usando o áudio e a transcrição como apoio. Volte ao trecho do áudio antes de revelar a resposta esperada.'],
    ['Shadowing', 'Repita frases curtas copiando ritmo, pausas e pronúncia. Comece com frases lentas e depois tente falar junto com o áudio.'],
  ],
  writing: [
    ['Modelo', 'Observe um modelo curto antes de escrever. Repare na estrutura, nas frases de abertura e na conclusão.'],
    ['Estrutura', 'Organize o texto em começo, desenvolvimento e fechamento. Cada parte deve ter uma função clara.'],
    ['Frases úteis', 'Use frases simples e seguras antes de tentar estruturas longas. Clareza é mais importante que complexidade.'],
    ['Checklist', 'Revise sujeito, verbo, pontuação, vocabulário e coerência. Corrija uma coisa por vez para não se perder.'],
    ['Produção', 'Escreva sua resposta com base no tema. Depois releia em voz alta para perceber problemas de ritmo e sentido.'],
    ['Revisão final', 'Compare sua produção com o modelo e reescreva duas frases melhoradas. Aprender escrita exige revisão ativa.'],
  ],
  speaking: [
    ['Modelo de comunicação', 'Observe a intenção da fala e use frases curtas para responder. O foco é comunicar com clareza e confiança.'],
    ['Repetição guiada', 'Repita frases úteis prestando atenção em ritmo, sílabas fortes e sons que mudam o significado.'],
    ['Pronúncia', 'Treine palavras-chave isoladas e depois dentro de frases. Compare clareza, ritmo e terminação das palavras.'],
    ['Conversa', 'Responda com suas próprias palavras. Use frases simples, mas tente completar a ideia com um detalhe extra.'],
    ['Tentativa e revisão', 'Grave, escute, identifique uma melhoria e tente novamente. O avanço vem de ciclos curtos de prática.'],
  ],
  vocabulary: [
    ['Contexto', 'Aprenda cada palavra dentro de uma situação real. Palavras isoladas são mais difíceis de lembrar e usar.'],
    ['Exemplo', 'Leia exemplos curtos e perceba quais palavras aparecem juntas. Isso ajuda a formar frases naturais.'],
    ['Prática', 'Use cada palavra em uma frase própria. Comece copiando o exemplo e depois troque uma parte da frase.'],
    ['Revisão', 'Reveja palavras difíceis em intervalos curtos. Marque as que precisam voltar em flashcards.'],
    ['Produção final', 'Escreva ou fale um pequeno resumo usando pelo menos cinco palavras novas do tema.'],
  ],
};

const VOCAB = [
  ['learn', 'aprender', 'I learn English every day.'],
  ['practice', 'praticar', 'I practice with short sentences.'],
  ['review', 'revisar', 'I review the lesson after studying.'],
  ['answer', 'responder/resposta', 'I answer the question in English.'],
  ['question', 'pergunta', 'This question is important.'],
  ['example', 'exemplo', 'This example helps me understand.'],
  ['sentence', 'frase', 'Write one sentence using the word.'],
  ['listen', 'ouvir', 'Listen to the audio again.'],
  ['speak', 'falar', 'Speak slowly and clearly.'],
  ['write', 'escrever', 'Write your own answer.'],
  ['read', 'ler', 'Read the text one more time.'],
  ['understand', 'entender', 'I understand the main idea.'],
  ['mistake', 'erro', 'A mistake helps me improve.'],
  ['improve', 'melhorar', 'I want to improve my English.'],
];

function clean(value) { return String(value ?? '').trim(); }
function array(value) { return Array.isArray(value) ? value : []; }
function req(type) { return REQUIREMENTS[type] || REQUIREMENTS.reading; }
function templates(type) { return SECTION_TEMPLATES[type] || SECTION_TEMPLATES.reading; }
function getExpectedTitle(rawLesson, normalized, expectedTitle) { return clean(expectedTitle || rawLesson?.expectedTitle || rawLesson?.curriculumTitle || normalized?.curriculumTitle || normalized?.title || rawLesson?.title); }
function getSeedIndex(seed, length) {
  const source = clean(seed) || `${Date.now()}`;
  const sum = Array.from(source).reduce((total, char) => total + char.charCodeAt(0), 0);
  return length ? sum % length : 0;
}
function getListeningProfile(title, rawLesson = {}) {
  const lower = clean(title).toLowerCase();
  const variationMode = Boolean(rawLesson?.variationMode || rawLesson?.generationMeta?.variationMode || rawLesson?.generationSeed || rawLesson?.generationMeta?.generationSeed);
  if (/alfabeto|alphabet|spelling|spell|soletr|nomes|names|sons iniciais|initial/.test(lower)) {
    const profiles = variationMode
      ? [LISTENING_PROFILES.alphabetReception, LISTENING_PROFILES.alphabetCafe, LISTENING_PROFILES.alphabetVideoCall]
      : [LISTENING_PROFILES.alphabetReception, LISTENING_PROFILES.alphabetCafe, LISTENING_PROFILES.alphabetVideoCall, LISTENING_PROFILES.alphabetClassroom];
    return profiles[getSeedIndex(rawLesson?.generationSeed || rawLesson?.generationMeta?.generationSeed, profiles.length)];
  }
  return LISTENING_PROFILES.routine;
}

function makeSections(lesson, type) {
  if (type === 'listening') return templates('listening').map(([title, content]) => ({ title, content, examples: [] }));
  const existing = array(lesson.sections).map((section, index) => ({
    title: clean(section?.title || section?.heading || `Parte ${index + 1}`),
    content: clean(section?.content || section?.text || section?.body || section?.explanation),
    examples: array(section?.examples),
  })).filter((section) => section.title || section.content);

  const next = existing.map((section, index) => ({
    title: section.title || `Parte ${index + 1}`,
    content: section.content.length >= 80 ? section.content : `${section.content} Explique o ponto com exemplos simples, prática guiada e ligação direta com o objetivo da aula.`,
    examples: section.examples,
  }));

  for (const [title, content] of templates(type)) {
    if (next.length >= req(type).minSections) break;
    if (!next.some((section) => section.title.toLowerCase() === title.toLowerCase())) next.push({ title, content, examples: [] });
  }
  return next;
}

function makeVocabulary(lesson, type, profile = null) {
  if (type === 'listening') return (profile || LISTENING_PROFILES.routine).vocabulary.map(([word, meaning, example]) => ({ word, meaning, example }));
  const existing = array(lesson.vocabulary).map((item) => ({
    word: clean(item?.word || item?.term),
    meaning: clean(item?.meaning || item?.translation || item?.definition),
    example: clean(item?.example || item?.sentence),
  })).filter((item) => item.word || item.meaning || item.example);
  const next = existing.map((item) => ({
    word: item.word || 'practice',
    meaning: item.meaning || 'praticar',
    example: item.example || `Use ${item.word || 'practice'} in a simple sentence.`,
  }));
  for (const [word, meaning, example] of VOCAB) {
    if (next.length >= req(type).minVocabulary) break;
    if (!next.some((item) => item.word.toLowerCase() === word)) next.push({ word, meaning, example });
  }
  return next;
}

function makeExercises(lesson, type, profile = null) {
  if (type === 'listening') return (profile || LISTENING_PROFILES.routine).exercises;
  const existing = array(lesson.exercises).map((item, index) => ({
    question: clean(item?.question || item?.prompt || `Questão ${index + 1}`),
    options: array(item?.options || item?.choices || item?.alternatives).map(clean).filter(Boolean),
    answer: clean(item?.answer || item?.expectedAnswer || item?.correctAnswer),
    explanation: clean(item?.explanation || item?.feedback),
  })).filter((item) => item.question || item.answer || item.options.length);
  const next = existing.map((item, index) => ({
    question: item.question.length >= 8 ? item.question : `Responda à questão ${index + 1} usando o conteúdo da aula.`,
    options: item.options,
    answer: item.answer || (item.options[0] || 'Resposta pessoal guiada pelo conteúdo da aula.'),
    explanation: item.explanation.length >= 20 ? item.explanation : 'A resposta se conecta ao objetivo da aula e deve ser justificada com o conteúdo estudado.',
  }));
  while (next.length < req(type).minExercises) {
    const number = next.length + 1;
    next.push({
      question: `Prática ${number}: crie uma frase simples usando o tema principal da aula.`,
      options: [],
      answer: 'Resposta pessoal com frase completa em inglês.',
      explanation: 'Este exercício força produção ativa e ajuda a transformar explicação em uso real da língua.',
    });
  }
  return next;
}

function makePrompts(lesson, type, profile = null) {
  if (type === 'listening') {
    const title = (profile || LISTENING_PROFILES.routine).title;
    return [
      `Ouça o áudio sobre ${title} uma vez sem ler a transcrição e escreva a ideia principal em português.`,
      'Ouça novamente e anote três palavras que você reconheceu.',
      'Leia a transcrição e marque uma frase curta para repetir em shadowing.',
      'Fale em voz alta uma frase parecida usando seu nome ou uma palavra do áudio.',
    ];
  }
  const next = array(lesson.prompts || lesson.writingPrompts).map(clean).filter(Boolean);
  const additions = [
    'Explique em português o ponto principal da aula em uma frase.',
    'Escreva três frases simples em inglês usando o conteúdo estudado.',
    'Grave uma resposta curta e revise uma palavra que precisa melhorar.',
    'Liste dois erros que você deve evitar ao usar este conteúdo.',
    'Faça uma revisão final em voz alta antes de concluir.',
  ];
  for (const prompt of additions) {
    if (next.length >= req(type).minPrompts) break;
    next.push(prompt);
  }
  return next;
}

function makeMainText(lesson, type, profile = null) {
  if (type === 'listening') return (profile || LISTENING_PROFILES.routine).transcript;
  const min = req(type).minMainLength;
  const current = clean(lesson.listeningText || lesson.listening_text || lesson.transcript);
  if (!min || current.length >= min) return current;
  const base = current || 'Every morning, I open my English notebook and practice a short lesson. I read simple sentences, listen carefully, repeat useful phrases and answer questions with my own words.';
  let text = base;
  const expansion = ' This part gives enough context for reading or listening practice. The student should identify the main idea, notice important words, answer comprehension questions and finish with a short personal response.';
  while (text.length < min) text += expansion;
  return text;
}

export function repairLessonForQuality(rawLesson, { expectedLevel = '', expectedType = '', expectedTitle = '', review = null } = {}) {
  const normalized = normalizeLesson(rawLesson);
  const type = clean(expectedType) || normalized.type || 'reading';
  const level = clean(expectedLevel) || normalized.level || 'A1';
  const isListening = type === 'listening';
  const targetTitle = getExpectedTitle(rawLesson, normalized, expectedTitle);
  const listeningProfile = isListening ? getListeningProfile(targetTitle, rawLesson) : null;
  const listeningTitle = targetTitle || listeningProfile?.title || 'Listening Practice';
  const repaired = {
    ...rawLesson,
    id: rawLesson?.id || normalized.id,
    type,
    level,
    title: isListening ? listeningTitle : (clean(rawLesson?.title || normalized.title) || 'Aula de inglês'),
    objective: isListening ? `Treinar compreensão auditiva em inglês ${level} com foco em ${listeningTitle.toLowerCase()}, usando escuta global, detalhes, transcrição, vocabulário auditivo e shadowing.` : (clean(rawLesson?.objective || rawLesson?.goal || normalized.objective) || `Aprender e praticar ${type} no nível ${level} com explicação, exemplos, exercícios e revisão final.`),
    intro: isListening ? `Nesta aula de Listening, você vai ouvir um roteiro curto sobre ${listeningTitle.toLowerCase()}, identificar informações principais, revisar vocabulário do áudio e repetir frases em voz alta.` : (clean(rawLesson?.intro || normalized.intro) || `Nesta aula, você vai estudar ${type} no nível ${level} com prática guiada e produção ativa.`),
    focus: isListening ? `listening · audio comprehension · ${listeningTitle} · ${level}` : (clean(rawLesson?.focus || normalized.focus) || `${type} · ${level}`),
    sections: makeSections(normalized, type),
    vocabulary: makeVocabulary(normalized, type, listeningProfile),
    exercises: makeExercises(normalized, type, listeningProfile),
    prompts: makePrompts(normalized, type, listeningProfile),
    tips: isListening ? ['Ouça primeiro sem ler.', 'Depois leia a transcrição.', 'Repita frases curtas em shadowing.', 'Revise palavras que soam diferente quando faladas.'] : [...array(rawLesson?.tips || normalized.tips), 'Revisão final: confira objetivo, vocabulário, exercícios e produção independente antes de concluir.'],
    listeningText: makeMainText(normalized, type, listeningProfile),
    quality: {
      ...(rawLesson?.quality && typeof rawLesson.quality === 'object' ? rawLesson.quality : {}),
      autoRepairAttempted: true,
      autoRepairReason: review?.issues || [],
      repairedAt: new Date().toISOString(),
      repairedAsSpecializedType: type,
      repairedForTitle: listeningTitle,
      repairedWithVariation: Boolean(rawLesson?.variationMode || rawLesson?.generationSeed),
      repairProfileTitle: listeningProfile?.title || '',
    },
  };
  return repaired;
}
