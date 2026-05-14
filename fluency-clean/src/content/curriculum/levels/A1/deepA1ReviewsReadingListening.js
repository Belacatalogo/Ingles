import { createReadingLesson, createListeningLesson } from '../../../schemas/index.js';

const level = 'A1';
const status = 'ready';
function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }

const common = { level, status, estimatedMinutes: 60, tags: ['a1-5', 'review', 'checkpoint-prep', 'reading-listening-review', 'deep-approved-target'] };

export const A1_DEEP_REVIEWS_READING_LISTENING = Object.freeze([
  createReadingLesson({
    ...common,
    id: 'A1-READING-019',
    order: 19,
    title: 'Reading Review A1',
    objectives: ['Revisar estratégias de leitura A1.', 'Identificar ideia geral, detalhes e evidência textual.', 'Reconhecer vocabulário pelo contexto.', 'Preparar o Reading A1 Checkpoint.'],
    teacherOpening: 'Esta é uma revisão guiada de Reading A1. Você não vai aprender um tema novo; vai consolidar como ler textos curtos com segurança: primeiro ideia geral, depois detalhes, depois evidência. O objetivo é evitar chute e responder com base no texto.',
    whyItMatters: 'Reading no A1 não é traduzir tudo. É entender o suficiente para localizar informação, reconhecer palavras-chave e provar sua resposta com uma frase do texto. Essa habilidade será cobrada no checkpoint.',
    realLifeUseCases: ['Ler perfil simples.', 'Ler mensagem curta.', 'Ler rotina.', 'Ler menu ou localização.', 'Responder com evidência.'],
    conceptExplanation: 'Use três camadas. Primeira leitura: assunto geral. Segunda leitura: detalhes. Terceira leitura: evidência. Se a pergunta usa where, procure lugar. Se usa when, procure tempo. Se usa why, procure because. Se usa what, procure item/ação.',
    mentalModel: { title: 'Geral → detalhe → evidência', summary: 'A resposta boa nasce do texto, não da memória.', steps: ['Read for topic.', 'Find key words.', 'Copy evidence.', 'Answer simply.'] },
    stepByStep: [task('Leia o texto inteiro sem parar em cada palavra.'), task('Diga o assunto geral em uma frase.'), task('Marque nomes, lugares, horários e ações.'), task('Leia a pergunta e volte ao texto.'), task('Copie a evidência antes de responder.'), task('Responda curto e claro.')],
    portugueseContrast: [task('Não responda pelo que parece lógico; responda pelo que o texto diz.'), task('Because geralmente mostra motivo.'), task('At night, in the morning e on Sunday indicam tempo.'), task('Market, pharmacy, school e café indicam lugares.')],
    guidedDiscovery: [task('Pergunta com when procura tempo.'), task('Pergunta com where procura lugar.'), task('Pergunta com why procura motivo.'), task('Pergunta de main idea pede assunto geral.')],
    guidedBeforeQuiz: [task('Antes das perguntas, encontre o assunto geral.'), task('Depois marque 5 palavras-chave.'), task('Para cada resposta, encontre uma frase de evidência.')],
    readingPurpose: 'Revisar leitura A1 com foco em evidência textual.',
    preReadingVocabulary: [vocab('student', 'estudante'), vocab('work', 'trabalhar'), vocab('study', 'estudar'), vocab('market', 'mercado'), vocab('because', 'porque'), vocab('family', 'família')],
    readingStrategy: [task('Main idea: leia o texto completo.'), task('Details: procure palavras específicas.'), task('Evidence: copie a frase que prova a resposta.'), task('Vocabulary from context: use palavras ao redor.')],
    mainText: `Ana is a student from Brazil. She works in the morning and studies English at night. On Saturday, she visits her family and buys food at the market. She usually wears a jacket because the classroom is cold. Her English class is near the pharmacy. She likes English because it helps her at work.`,
    firstReadTask: task('Qual é a ideia geral do texto?', 'A rotina de Ana e seus estudos de inglês.', 'Ana is a student... works... studies English...'),
    secondReadTasks: [task('Quando Ana trabalha?', 'in the morning', 'She works in the morning'), task('Quando Ana estuda inglês?', 'at night', 'studies English at night'), task('Onde ela compra comida?', 'at the market', 'buys food at the market'), task('Por que ela usa jacket?', 'because the classroom is cold', 'wears a jacket because the classroom is cold')],
    evidenceQuestions: [
      q('Where is Ana from?', 'Brazil', 'Ana is a student from Brazil.', 'A frase inicial informa origem.', ['Brazil', 'Canada', 'England']),
      q('When does Ana study English?', 'at night', 'studies English at night', 'At night indica horário.', ['at night', 'in the morning', 'on Sunday']),
      q('What does Ana buy at the market?', 'food', 'buys food at the market', 'O texto diz o item comprado.', ['food', 'clothes', 'books']),
      q('Where is her English class?', 'near the pharmacy', 'Her English class is near the pharmacy.', 'A frase localiza a aula.', ['near the pharmacy', 'next to the bank', 'in the market']),
      q('Why does Ana like English?', 'because it helps her at work', 'She likes English because it helps her at work.', 'Because mostra o motivo.', ['because it helps her at work', 'because it is easy', 'because it is Saturday'])
    ],
    contextVocabularyTasks: [task('No texto, classroom é lugar de aula.'), task('Usually mostra frequência.'), task('Helps her at work mostra utilidade do inglês.')],
    guidedSummary: task('Complete: Ana works in the ___, studies English at ___, buys food at the ___ and likes English because it helps her at ___.', '', 'morning / night / market / work'),
    connectedProduction: task('Escreva 4 frases parecidas sobre sua rotina e sublinhe uma evidência em cada frase.'),
    selfAssessment: [task('Consigo identificar ideia geral?'), task('Consigo achar detalhes?'), task('Consigo copiar evidência?'), task('Consigo usar contexto para vocabulário?')],
    lessonRecap: ['Reading A1 usa camadas.', 'Main idea vem primeiro.', 'Detalhes vêm com palavras-chave.', 'Evidência é obrigatória para evitar chute.', 'Because ajuda a responder why.'],
    nextLessonBridge: 'Depois desta revisão, você estará pronto para o Reading A1 Checkpoint.',
  }),

  createListeningLesson({
    ...common,
    id: 'A1-LISTENING-017',
    order: 17,
    title: 'Listening Review A1',
    objectives: ['Revisar escuta A1 em camadas.', 'Identificar nomes, números, horários, lugares e ações.', 'Praticar dictation e shadowing leve.', 'Preparar o Listening A1 Checkpoint.'],
    teacherOpening: 'Esta é uma revisão guiada de Listening A1. O objetivo não é entender 100% do áudio na primeira tentativa. Você vai ouvir por camadas: primeiro o assunto, depois informações-chave, depois detalhes, transcript, dictation e shadowing.',
    whyItMatters: 'Muitos alunos travam porque tentam traduzir cada palavra. No A1, listening eficiente busca blocos previsíveis: nome, país, rotina, horário, lugar, pedido e sentimento. Essa revisão prepara você para o checkpoint.',
    realLifeUseCases: ['Entender apresentação simples.', 'Entender rotina curta.', 'Ouvir horários e números.', 'Entender pedido de ajuda.', 'Entender localização simples.'],
    conceptExplanation: 'Na primeira escuta, responda: quem fala e qual é o assunto? Na segunda, procure dados: name, country, time, place, action. Depois confira transcript. Dictation treina precisão; shadowing treina ritmo.',
    mentalModel: { title: 'Escuta em camadas', summary: 'Geral primeiro, detalhe depois, precisão no final.', steps: ['Gist.', 'Key words.', 'Details.', 'Transcript.', 'Dictation.', 'Shadowing.'] },
    stepByStep: [task('Primeira escuta: assunto geral.'), task('Segunda escuta: nomes, lugares e horários.'), task('Terceira etapa: ações e motivo.'), task('Leia o transcript.'), task('Faça dictation de uma frase.'), task('Repita com shadowing.')],
    portugueseContrast: [task('Não pause a cada palavra na primeira escuta.'), task('At eight indica horário.'), task('In the morning / at night indicam rotina.'), task('Can you help me? é pedido de ajuda em bloco.')],
    guidedDiscovery: [task('My name is aponta nome.'), task('I am from aponta país/cidade.'), task('I work/study aponta rotina.'), task('At eight aponta horário.'), task('Because aponta motivo.')],
    guidedBeforeQuiz: [task('Primeira escuta: quem é a pessoa?'), task('Segunda escuta: quando ela trabalha/estuda?'), task('Depois: qual frase você consegue repetir?')],
    listeningPreparation: [task('Não leia transcript antes da primeira escuta.'), task('Prepare palavras-chave: name, Brazil, work, study, night, class, eight, family.'), task('Objetivo: entender informação suficiente, não traduzir tudo.')],
    keyWordsToHear: [vocab('name', 'nome'), vocab('Brazil', 'Brasil'), vocab('work', 'trabalhar'), vocab('study', 'estudar'), vocab('at night', 'à noite'), vocab('at eight', 'às oito'), vocab('family', 'família')],
    audioScript: `Hello. My name is João. I am from Brazil. I work in the morning and study English at night. My English class starts at eight. On Sunday, I visit my family. I like English because it helps me at work.`,
    firstListenTasks: [task('Sem transcript: qual é o assunto geral?', 'Apresentação e rotina de João.'), task('Sem transcript: a pessoa fala sobre trabalho, comida ou roupa?', 'trabalho/rotina')],
    secondListenTasks: [task('Qual é o nome da pessoa?', 'João'), task('De onde ele é?', 'Brazil'), task('Quando ele trabalha?', 'in the morning'), task('Quando ele estuda inglês?', 'at night'), task('Que horas a aula começa?', 'at eight')],
    transcript: `Hello. My name is João. I am from Brazil. I work in the morning and study English at night. My English class starts at eight. On Sunday, I visit my family. I like English because it helps me at work.`,
    vocabulary: [vocab('starts', 'começa'), vocab('visit', 'visitar'), vocab('helps me at work', 'me ajuda no trabalho'), vocab('class', 'aula/turma')],
    shadowing: [task('My name is João.'), task('I am from Brazil.'), task('I work in the morning.'), task('I study English at night.'), task('My English class starts at eight.'), task('It helps me at work.')],
    dictationTasks: [task('Digite: I study English at night.', 'I study English at night.'), task('Digite: My class starts at eight.', 'My class starts at eight.'), task('Digite: It helps me at work.', 'It helps me at work.')],
    pronunciationChunks: [task('My name is', 'Ouça como bloco.'), task('work in the morning', 'Conecte work-in-the.'), task('study English at night', 'Perceba at night no final.'), task('starts at eight', 'Atenção ao som de starts-at.')],
    listeningComprehension: [
      q('What is his name?', 'João', 'My name is João.', '', ['João', 'Ana', 'Ben']),
      q('Where is he from?', 'Brazil', 'I am from Brazil.', '', ['Brazil', 'Canada', 'Japan']),
      q('When does he work?', 'in the morning', 'I work in the morning.', '', ['in the morning', 'at night', 'on Sunday']),
      q('When does his English class start?', 'at eight', 'My English class starts at eight.', '', ['at eight', 'at six', 'at twelve']),
      q('Why does he like English?', 'because it helps him at work', 'I like English because it helps me at work.', '', ['because it helps him at work', 'because it is easy', 'because it is Sunday'])
    ],
    oralProduction: task('Grave um áudio parecido sobre você: nome, país, rotina, horário e por que estuda inglês.'),
    selfAssessment: [task('Consegui entender o assunto geral?'), task('Consegui identificar nome/país/horário?'), task('Consegui fazer dictation?'), task('Consegui repetir com shadowing?')],
    lessonRecap: ['Listening A1 é feito em camadas.', 'Primeira escuta busca assunto geral.', 'Segunda escuta busca dados.', 'Transcript confirma.', 'Dictation e shadowing fecham a precisão.'],
    nextLessonBridge: 'Depois desta revisão, você estará pronto para o Listening A1 Checkpoint.',
  }),
]);

export const A1_DEEP_REVIEWS_READING_LISTENING_BY_PILLAR = Object.freeze({
  reading: Object.freeze(A1_DEEP_REVIEWS_READING_LISTENING.filter((lesson) => lesson.pillar === 'reading')),
  listening: Object.freeze(A1_DEEP_REVIEWS_READING_LISTENING.filter((lesson) => lesson.pillar === 'listening')),
});
