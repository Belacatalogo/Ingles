import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'A1';
const status = 'ready';
const unit = 'A1.3 Daily routine';

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function drill(prompt, answer, variations = []) { return { prompt, answer, variations }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }
function block(label, text, purpose = '') { return { label, text, purpose }; }

const common = {
  level,
  status,
  estimatedMinutes: 55,
  tags: ['a1-3', 'daily-routine', 'present-simple', 'deep-approved-target'],
};

export const A1_DEEP_DAILY_ROUTINE = Object.freeze([
  createGrammarLesson({
    ...common,
    id: 'A1-GRAMMAR-014',
    order: 14,
    title: 'Present Simple — I / you / we / they',
    objectives: ['Falar de rotina usando present simple com I, you, we e they.', 'Usar verbo base sem -s nesses sujeitos.', 'Criar frases afirmativas simples sobre manhã, trabalho, estudo e noite.', 'Evitar tradução palavra por palavra do português.'],
    teacherOpening: 'Nesta aula A1.3 você começa a falar de rotina. O present simple serve para hábitos: coisas que acontecem normalmente, todos os dias, toda semana ou com frequência. Com I, you, we e they, o verbo fica na forma base: I wake up, you work, we study, they sleep. A meta é criar frases simples e corretas sobre o seu dia.',
    whyItMatters: 'Rotina é um dos temas mais úteis do A1. Você usa present simple para falar de trabalho, estudo, horários, hábitos e vida diária. Antes de estudar he/she/it com -s, você precisa dominar a base com I, you, we e they.',
    realLifeUseCases: ['Falar o que você faz de manhã.', 'Dizer que estuda inglês.', 'Explicar sua rotina de trabalho.', 'Falar sobre você e outras pessoas.', 'Entender frases simples em perfis e diálogos.'],
    conceptExplanation: 'Use present simple para hábitos e rotina. Com I, you, we e they, use o verbo base: I wake up. You study. We work. They go home. Não coloque -s nesses sujeitos. A estrutura principal é sujeito + verbo + complemento.',
    mentalModel: { title: 'Rotina normal = present simple', summary: 'I / you / we / they + verbo base.', steps: ['I wake up early.', 'You study English.', 'We work in the morning.', 'They go home at night.'] },
    stepByStep: [task('Escolha o sujeito: I, you, we ou they.'), task('Escolha o verbo de rotina: wake up, work, study, eat, go, sleep.'), task('Use o verbo base, sem -s.'), task('Adicione tempo ou lugar se precisar: in the morning, at night, at home.'), task('Leia a frase inteira e veja se ela fala de hábito.')],
    portugueseContrast: [task('Em português dizemos “eu acordo”; em inglês, “I wake up”.'), task('Não diga “I wakes up”. O -s não aparece com I.'), task('“I have breakfast” é natural; não traduza como “I take coffee” para café da manhã.'), task('Use at para horário: at 7:00.')],
    guidedDiscovery: [task('Em “I study English”, o verbo study está na base.'), task('Em “We work in the morning”, work não recebe -s.'), task('Em “They go home”, go está na base.')],
    guidedBeforeQuiz: [task('Complete: I ___ up at 6:30.', 'wake'), task('Complete: We ___ English at night.', 'study'), task('Complete: They ___ home after work.', 'go'), task('Corrija: I works every day.', 'I work every day.')],
    grammarGoal: 'Formar frases afirmativas de rotina no present simple com I, you, we e they.',
    formationGuide: [task('I + verb base', 'I wake up early.'), task('You + verb base', 'You study English.'), task('We + verb base', 'We work in the morning.'), task('They + verb base', 'They go home at night.')],
    whenToUse: [task('Para hábitos diários.'), task('Para rotina de estudo/trabalho.'), task('Para coisas geralmente verdadeiras no seu dia.'), task('Para falar de grupos: we/they.')],
    whenNotToUse: [task('Não use para algo acontecendo exatamente agora; isso vem depois no curso.'), task('Não use -s com I, you, we, they.'), task('Não tente montar frases longas demais no A1.')],
    grammarTable: [
      { pattern: 'I + verb base', example: 'I wake up at 6:30.', translation: 'Eu acordo às 6:30.' },
      { pattern: 'You + verb base', example: 'You work in the morning.', translation: 'Você trabalha de manhã.' },
      { pattern: 'We + verb base', example: 'We study English at night.', translation: 'Nós estudamos inglês à noite.' },
      { pattern: 'They + verb base', example: 'They go home after work.', translation: 'Eles vão para casa depois do trabalho.' }
    ],
    teacherExamples: [
      { english: 'I wake up early.', translation: 'Eu acordo cedo.', why: 'Hábito comum com I + verbo base.' },
      { english: 'I have breakfast at 7:00.', translation: 'Eu tomo café da manhã às 7:00.', why: 'Have breakfast é o bloco natural.' },
      { english: 'We study English after dinner.', translation: 'Nós estudamos inglês depois do jantar.', why: 'We usa verbo base.' },
      { english: 'They sleep at 10:30.', translation: 'Eles dormem às 10:30.', why: 'They usa verbo base.' }
    ],
    commonBrazilianMistakes: [mistake('I wakes up at 6:30.', 'I wake up at 6:30.', 'Com I, o verbo fica na base.'), mistake('We studies English.', 'We study English.', 'Com we, não use -s.'), mistake('I take breakfast.', 'I have breakfast.', 'O bloco natural é have breakfast.'), mistake('They goes home.', 'They go home.', 'Com they, use go.')],
    controlledPractice: [task('Complete: I ___ up early.', 'wake'), task('Complete: You ___ English.', 'study'), task('Complete: We ___ at 8:00.', 'work'), task('Complete: They ___ home at night.', 'go')],
    errorCorrectionPractice: [task('Corrija: I works in the morning.', 'I work in the morning.'), task('Corrija: We goes home.', 'We go home.'), task('Corrija: They studies English.', 'They study English.')],
    transformationPractice: [task('Transforme: morning / I / work', 'I work in the morning.'), task('Transforme: at night / we / study English', 'We study English at night.'), task('Transforme: after work / they / go home', 'They go home after work.')],
    translationPractice: [task('Eu acordo cedo.', 'I wake up early.'), task('Nós estudamos inglês à noite.', 'We study English at night.'), task('Eles vão para casa depois do trabalho.', 'They go home after work.')],
    productionTasks: [task('Escreva 6 frases sobre sua rotina usando I.'), task('Escreva 3 frases sobre você e outra pessoa usando we.'), task('Escreva 3 frases sobre um grupo usando they.')],
    finalChecklist: [task('Usei verbo base com I/you/we/they?'), task('Evitei -s nesses sujeitos?'), task('Usei blocos naturais como have breakfast?'), task('Minhas frases falam de hábito ou rotina?')],
    selfAssessment: [task('Consigo montar frases com I + verbo base?'), task('Consigo falar minha rotina em 6 frases?'), task('Consigo corrigir I works / we studies?')],
    lessonRecap: ['Present simple fala de rotina e hábitos.', 'I, you, we e they usam verbo base.', 'Não use -s com esses sujeitos.', 'Rotina A1 funciona melhor com frases curtas.'],
    nextLessonBridge: 'Na próxima aula de vocabulário, você vai ampliar os verbos de rotina para falar do seu dia com mais naturalidade.',
  }),

  createVocabularyLesson({
    ...common,
    id: 'A1-VOCABULARY-012',
    order: 12,
    title: 'Daily routine verbs',
    objectives: ['Aprender verbos essenciais de rotina diária.', 'Usar chunks naturais para manhã, tarde e noite.', 'Diferenciar verbos que brasileiros costumam traduzir errado.', 'Criar frases simples com present simple.'],
    teacherOpening: 'Agora você precisa de verbos para falar do seu dia. Esta aula não é uma lista solta: cada verbo aparece em chunks úteis, como wake up, get dressed, have breakfast, go to work, study English, have dinner e go to bed. Você vai transformar vocabulário em frases reais.',
    whyItMatters: 'Sem verbos de rotina, o present simple fica vazio. Esses blocos aparecem em Reading, Listening, Speaking e Writing A1.3. Quanto mais automático ficar o chunk, menos você traduz do português.',
    realLifeUseCases: ['Falar sua manhã.', 'Descrever seu trabalho.', 'Dizer quando estuda inglês.', 'Falar de refeições.', 'Criar uma apresentação simples sobre rotina.'],
    conceptExplanation: 'Aprenda rotina em blocos: wake up não é só wake; have breakfast é o bloco natural para tomar café da manhã; go to bed é ir dormir; go home é ir para casa. Use os blocos em frases curtas com I: I wake up at 6:30. I have breakfast at 7:00.',
    mentalModel: { title: 'Dia em blocos', summary: 'Manhã → trabalho/estudo → noite.', steps: ['wake up', 'have breakfast', 'go to work', 'study English', 'have dinner', 'go to bed'] },
    stepByStep: [task('Aprenda o verbo em bloco.'), task('Veja uma frase modelo.'), task('Troque o horário.'), task('Coloque em ordem do dia.'), task('Use em mini rotina.')],
    portugueseContrast: [task('Tomar café da manhã = have breakfast.'), task('Ir dormir = go to bed.'), task('Voltar para casa = go home.'), task('Tomar banho pode ser take a shower em inglês americano.')],
    guidedDiscovery: [task('Qual bloco significa tomar café da manhã?', 'have breakfast'), task('Qual bloco significa ir para a cama?', 'go to bed'), task('Qual bloco significa acordar?', 'wake up')],
    guidedBeforeQuiz: [task('Complete: I ___ breakfast at 7:00.', 'have'), task('Complete: I go ___ bed at 10:30.', 'to'), task('Complete: I ___ English at night.', 'study')],
    topicContext: 'Rotina diária A1: manhã, trabalho/estudo, refeições e noite.',
    essentialWords: [vocab('wake up', 'acordar', 'I wake up at 6:30.'), vocab('get up', 'levantar da cama', 'I get up at 6:40.'), vocab('take a shower', 'tomar banho', 'I take a shower in the morning.'), vocab('get dressed', 'se vestir', 'I get dressed after my shower.'), vocab('have breakfast', 'tomar café da manhã', 'I have breakfast at 7:00.'), vocab('go to work', 'ir para o trabalho', 'I go to work at 8:00.'), vocab('study English', 'estudar inglês', 'I study English at night.'), vocab('have lunch', 'almoçar', 'I have lunch at noon.'), vocab('go home', 'ir para casa', 'I go home after work.'), vocab('have dinner', 'jantar', 'I have dinner at 8:00.'), vocab('go to bed', 'ir para a cama', 'I go to bed at 10:30.'), vocab('sleep', 'dormir', 'I sleep at night.')],
    chunks: [{ chunk: 'I wake up at...', translation: 'Eu acordo às...', example: 'I wake up at 6:30.' }, { chunk: 'I have breakfast/lunch/dinner', translation: 'Eu tomo café/almoço/janto', example: 'I have dinner at 8:00.' }, { chunk: 'I go to work/school', translation: 'Eu vou ao trabalho/à escola', example: 'I go to work at 8:00.' }, { chunk: 'I study English at night', translation: 'Eu estudo inglês à noite', example: 'I study English at night.' }, { chunk: 'I go to bed at...', translation: 'Eu vou dormir às...', example: 'I go to bed at 10:30.' }],
    dangerousConfusions: [task('have breakfast ≠ take coffee', 'Use have breakfast.'), task('go home ≠ go to home', 'Home sozinho não usa to nesse bloco.'), task('go to bed ≠ sleep', 'Go to bed é ir para cama; sleep é dormir.')],
    collocations: [task('wake up early'), task('have breakfast'), task('go to work'), task('study English'), task('go home'), task('go to bed')],
    miniDialogues: [{ title: 'Morning routine', focus: 'rotina de manhã', lines: ['A: What do you do in the morning?', 'B: I wake up at 6:30 and have breakfast at 7:00.', 'A: Do you study English?', 'B: Yes, I study English at night.'] }],
    recognitionPractice: [task('Escolha o bloco para “tomar café da manhã”.', 'have breakfast'), task('Escolha o bloco para “ir dormir”.', 'go to bed'), task('Escolha o bloco para “ir para casa”.', 'go home')],
    usagePractice: [task('Complete: I ___ up at 6:30.', 'wake'), task('Complete: I ___ lunch at noon.', 'have'), task('Complete: I go ___ work at 8:00.', 'to'), task('Complete: I go ___ after work.', 'home')],
    productionTasks: [task('Crie uma rotina com 8 frases usando os verbos da aula.'), task('Organize os verbos em manhã, tarde e noite.')],
    selfAssessment: [task('Consigo usar have breakfast/lunch/dinner?'), task('Consigo diferenciar go home e go to bed?'), task('Consigo falar 8 ações do meu dia?')],
    lessonRecap: ['Rotina precisa de chunks.', 'Have breakfast/lunch/dinner são blocos naturais.', 'Go home não usa to.', 'Go to bed é ir para a cama.'],
    nextLessonBridge: 'Na Reading A1.3, você vai ler uma rotina completa usando esses verbos em contexto.',
  }),

  createReadingLesson({
    ...common,
    id: 'A1-READING-005',
    order: 5,
    title: 'A daily routine',
    objectives: ['Ler uma rotina diária A1.', 'Identificar ações em ordem cronológica.', 'Encontrar horários e períodos do dia.', 'Responder com evidência textual.'],
    teacherOpening: 'Nesta leitura, você vai acompanhar a rotina de uma pessoa do começo ao fim do dia. O foco é entender sequência: first, in the morning, after work, at night. Você não precisa traduzir palavra por palavra; precisa localizar ações, horários e evidências.',
    whyItMatters: 'Textos de rotina aparecem em perfis, mensagens, agendas e apresentações. Saber ler uma rotina ajuda você a falar e escrever a sua própria rotina depois.',
    realLifeUseCases: ['Ler uma bio simples.', 'Entender rotina de estudo/trabalho.', 'Encontrar horários.', 'Responder perguntas com prova no texto.', 'Usar o texto como modelo para escrever.'],
    conceptExplanation: 'Uma rotina diária normalmente segue a ordem do dia. Procure palavras de tempo e ações: wake up, have breakfast, go to work, have lunch, go home, study English, go to bed. Para responder, copie a parte do texto que prova sua resposta.',
    mentalModel: { title: 'Linha do tempo da rotina', summary: 'Manhã → trabalho → almoço → casa → estudo → noite.' },
    stepByStep: [task('Leia para entender a pessoa e a situação.'), task('Marque horários.'), task('Marque ações de manhã.'), task('Marque ações depois do trabalho.'), task('Use evidência para responder.')],
    portugueseContrast: [task('At 6:30 indica horário específico.'), task('After work significa depois do trabalho.'), task('At night significa à noite.')],
    guidedDiscovery: [task('Qual palavra mostra horário?', 'at'), task('Qual expressão mostra depois do trabalho?', 'after work')],
    guidedBeforeQuiz: [task('Primeira leitura: entenda a rotina geral.'), task('Segunda leitura: procure wake up, work, lunch, study e bed.')],
    readingPurpose: 'Ler uma rotina A1 e identificar sequência, horários e ações principais.',
    preReadingVocabulary: [vocab('wake up', 'acordar'), vocab('have breakfast', 'tomar café da manhã'), vocab('go to work', 'ir para o trabalho'), vocab('after work', 'depois do trabalho'), vocab('go to bed', 'ir para a cama')],
    readingStrategy: [task('Não traduza tudo na primeira leitura.'), task('Circule horários com at.'), task('Sublinhe ações de rotina.'), task('Responda com frase do texto como evidence.')],
    mainText: `My name is Lucas, and I have a simple daily routine. I wake up at 6:30 in the morning. I take a shower and have breakfast at 7:00. I go to work at 8:00. At noon, I have lunch with my friend Ana. After work, I go home and rest for one hour. At night, I study English for thirty minutes. I have dinner at 8:00, and I go to bed at 10:30. My routine is simple, but it helps me study every day.`,
    firstReadTask: task('Leia uma vez e escolha a ideia geral.', 'Lucas describes his daily routine.', 'A rotina diária de Lucas.'),
    secondReadTasks: [task('Encontre o horário em que Lucas acorda.', 'I wake up at 6:30 in the morning.', '6:30'), task('Encontre o que ele faz à noite.', 'At night, I study English for thirty minutes.', 'study English'), task('Encontre o horário em que ele vai para a cama.', 'I go to bed at 10:30.', '10:30')],
    evidenceQuestions: [q('What time does Lucas wake up?', '6:30', 'I wake up at 6:30 in the morning.', 'O horário vem depois de at.', ['6:30','7:00','8:00']), q('What does Lucas have at 7:00?', 'breakfast', 'I take a shower and have breakfast at 7:00.', 'Have breakfast aparece na frase.', ['breakfast','lunch','dinner']), q('Who does Lucas have lunch with?', 'Ana', 'At noon, I have lunch with my friend Ana.', 'A evidência cita my friend Ana.', ['Ana','Luis','Teacher']), q('What does Lucas do at night?', 'study English', 'At night, I study English for thirty minutes.', 'At night introduz a ação da noite.', ['study English','go to work','take a shower']), q('What time does Lucas go to bed?', '10:30', 'I go to bed at 10:30.', 'Go to bed indica ir dormir.', ['10:30','8:00','noon'])],
    contextVocabularyTasks: [task('No texto, after work significa depois do trabalho.', 'After work, I go home.'), task('No texto, rest significa descansar.', 'rest for one hour'), task('No texto, every day indica hábito.', 'study every day')],
    guidedSummary: task('Complete: Lucas wakes up at ___. He goes to work at ___. At night, he ___.', '', 'Lucas wakes up at 6:30. He goes to work at 8:00. At night, he studies English.'),
    connectedProduction: task('Escreva 6 frases sobre sua rotina usando o texto como modelo.'),
    selfAssessment: [task('Consigo achar horários com at?'), task('Consigo seguir a ordem da rotina?'), task('Consigo responder com evidência?')],
    lessonRecap: ['Rotina em texto segue uma linha do tempo.', 'At marca horários.', 'After work marca sequência.', 'Evidence evita chute.'],
    nextLessonBridge: 'No Listening A1.3, você vai ouvir uma rotina parecida sem ler o transcript primeiro.',
  }),

  createListeningLesson({
    ...common,
    id: 'A1-LISTENING-007',
    order: 7,
    title: 'Daily routine',
    objectives: ['Ouvir uma rotina diária curta.', 'Identificar ações principais sem transcript.', 'Capturar horários na segunda escuta.', 'Praticar shadowing com frases de rotina.'],
    teacherOpening: 'Agora você vai treinar rotina pelo ouvido. Primeiro, escute sem transcript e entenda a situação geral. Depois, ouça de novo procurando horários e ações. O transcript só entra depois, para confirmar o que você ouviu.',
    whyItMatters: 'Rotina é falada rápido em conversas simples. Você precisa reconhecer blocos inteiros, como wake up at six thirty e study English at night, sem depender da leitura.',
    realLifeUseCases: ['Entender alguém falando sobre o dia.', 'Ouvir horários.', 'Responder perguntas simples sobre rotina.', 'Repetir frases úteis.', 'Preparar sua própria fala.'],
    conceptExplanation: 'No listening de rotina, ouça por palavras-âncora: wake up, breakfast, work, lunch, home, study English, dinner, bed. Na primeira escuta, pegue o tema. Na segunda, capture detalhes como 6:30, 8:00 e 10:30.',
    mentalModel: { title: 'Ouvir rotina em camadas', summary: 'Tema primeiro; detalhes depois.', steps: ['situação geral', 'ações principais', 'horários', 'confirmação no transcript'] },
    stepByStep: [task('Prepare as palavras-chave.'), task('Ouça sem transcript.'), task('Escolha a ideia geral.'), task('Ouça de novo por horários.'), task('Confira transcript.'), task('Repita frase por frase no shadowing.')],
    portugueseContrast: [task('Six thirty pode soar como um bloco rápido.'), task('At night aparece como marcador de período.'), task('Go to bed é ir para a cama, não apenas sleep.')],
    guidedDiscovery: [task('Se ouvir wake up, espere um horário.'), task('Se ouvir at night, espere ação da noite.'), task('Se ouvir go to bed, espere horário final do dia.')],
    guidedBeforeQuiz: [task('Primeira escuta: qual é o tema da fala?'), task('Segunda escuta: anote os horários que ouvir.')],
    listeningPreparation: [task('Não abra o transcript na primeira escuta.'), task('Prepare: wake up, breakfast, work, lunch, study, dinner, bed.'), task('Objetivo: entender sequência e horários.')],
    keyWordsToHear: [vocab('wake up','acordar'), vocab('have breakfast','tomar café da manhã'), vocab('go to work','ir para o trabalho'), vocab('study English','estudar inglês'), vocab('go to bed','ir para a cama')],
    audioScript: `Lucas: My daily routine is simple.
Lucas: I wake up at six thirty in the morning.
Lucas: I have breakfast at seven.
Lucas: I go to work at eight.
Lucas: At noon, I have lunch.
Lucas: After work, I go home and rest.
Lucas: At night, I study English for thirty minutes.
Lucas: I have dinner at eight, and I go to bed at ten thirty.`,
    firstListenTasks: [task('Sem transcript: qual é o assunto principal?', 'A rotina diária de Lucas.', 'daily routine'), task('Sem transcript: a rotina é sobre manhã, trabalho e noite?', 'Sim.', 'yes')],
    secondListenTasks: [task('Que horas Lucas acorda?', 'six thirty'), task('Que horas ele vai ao trabalho?', 'eight'), task('O que ele faz à noite?', 'study English'), task('Que horas ele vai para a cama?', 'ten thirty')],
    transcript: `Lucas: My daily routine is simple.
Lucas: I wake up at six thirty in the morning.
Lucas: I have breakfast at seven.
Lucas: I go to work at eight.
Lucas: At noon, I have lunch.
Lucas: After work, I go home and rest.
Lucas: At night, I study English for thirty minutes.
Lucas: I have dinner at eight, and I go to bed at ten thirty.`,
    vocabulary: [vocab('daily routine','rotina diária'), vocab('wake up','acordar'), vocab('at noon','ao meio-dia'), vocab('after work','depois do trabalho'), vocab('go to bed','ir para a cama')],
    shadowing: [task('My daily routine is simple.'), task('I wake up at six thirty in the morning.'), task('I have breakfast at seven.'), task('I go to work at eight.'), task('At night, I study English for thirty minutes.'), task('I go to bed at ten thirty.')],
    dictationTasks: [task('Complete: I wake up at ___ thirty.', 'six'), task('Complete: I go to ___ at eight.', 'work'), task('Complete: At night, I study ___ for thirty minutes.', 'English'), task('Complete: I go to bed at ten ___.', 'thirty')],
    pronunciationChunks: [task('six thirty', 'Ouça como bloco.'), task('go to work', 'Reduza o som entre palavras.'), task('study English', 'Ligue as palavras naturalmente.'), task('ten thirty', 'Horário final da rotina.')],
    listeningComprehension: [q('What time does Lucas wake up?', 'six thirty', 'I wake up at six thirty in the morning.', '', ['six thirty','seven','eight']), q('What does Lucas do at night?', 'study English', 'At night, I study English for thirty minutes.', '', ['study English','go to work','have lunch']), q('What time does Lucas go to bed?', 'ten thirty', 'I go to bed at ten thirty.', '', ['ten thirty','eight','noon'])],
    oralProduction: task('Responda oralmente: What is your daily routine? Use 3 to 5 simple sentences.'),
    selfAssessment: [task('Consegui entender a ideia geral sem transcript?'), task('Consegui ouvir horários?'), task('Consegui repetir frases de rotina?')],
    lessonRecap: ['Ouça rotina por blocos.', 'Primeira escuta é para tema geral.', 'Segunda escuta é para horários e ações.', 'Shadowing ajuda ritmo e clareza.'],
    nextLessonBridge: 'Na Speaking A1.3, você vai transformar essas frases em fala sobre sua própria rotina.',
  }),

  createSpeakingLesson({
    ...common,
    id: 'A1-SPEAKING-011',
    order: 11,
    title: 'Talk about your routine',
    objectives: ['Falar sobre sua rotina em frases simples.', 'Usar modelo antes da fala livre.', 'Responder perguntas sobre horários.', 'Gravar uma rotina curta de 30 segundos.'],
    teacherOpening: 'Agora você vai falar sobre sua rotina. A meta não é improvisar um discurso grande. A meta é montar blocos claros: I wake up at..., I work in the morning, I study English at night, I go to bed at.... Primeiro repita, depois substitua, depois grave.',
    whyItMatters: 'Falar rotina é uma das primeiras habilidades reais do A1. Ela junta present simple, verbos de rotina e horários. Se você consegue falar seu dia em 30 segundos, já tem uma base funcional importante.',
    realLifeUseCases: ['Apresentar sua rotina em aula.', 'Responder What do you do in the morning?', 'Falar quando estuda inglês.', 'Dizer horários simples.', 'Treinar fluência curta.'],
    conceptExplanation: 'Use frases curtas em ordem do dia. Comece pela manhã, depois trabalho/estudo, depois noite. Repita o modelo e troque as informações por dados reais ou fictícios.',
    mentalModel: { title: 'Fala de rotina em 4 blocos', summary: 'Manhã, trabalho/estudo, noite, fechamento.' },
    stepByStep: [task('Repita os modelos.'), task('Troque os horários.'), task('Responda perguntas simples.'), task('Monte 5 frases em ordem.'), task('Grave sua versão final.')],
    portugueseContrast: [task('Não tente traduzir “eu costumo”; no A1, use I + verbo.'), task('Use have breakfast, não take coffee.'), task('Use go home, não go to home.')],
    guidedDiscovery: [task('Para manhã: I wake up at...'), task('Para estudo: I study English at...'), task('Para noite: I go to bed at...')],
    guidedBeforeQuiz: [task('Repita: I wake up at 6:30.'), task('Repita: I study English at night.'), task('Repita: I go to bed at 10:30.')],
    speakingSituation: 'Você está em uma aula de inglês e precisa contar sua rotina diária em 30 segundos.',
    modelPhrases: [phrase('I wake up at 6:30.', 'Eu acordo às 6:30.'), phrase('I have breakfast at 7:00.', 'Eu tomo café da manhã às 7:00.'), phrase('I go to work in the morning.', 'Eu vou para o trabalho de manhã.'), phrase('I study English at night.', 'Eu estudo inglês à noite.'), phrase('I go to bed at 10:30.', 'Eu vou para a cama às 10:30.')],
    pronunciationChunks: [task('wake up at', 'Ligue up + at devagar.'), task('study English', 'Fale como bloco.'), task('go to bed', 'Não corte o to.')],
    repeatAfterMe: [task('I wake up at 6:30.'), task('I have breakfast at 7:00.'), task('I go to work at 8:00.'), task('At night, I study English.'), task('I go to bed at 10:30.')],
    substitutionDrills: [drill('I wake up at 6:30.', 'I wake up at 7:00.', ['I wake up at 5:30.']), drill('I study English at night.', 'I study English in the morning.', ['I study English after work.']), drill('I go to bed at 10:30.', 'I go to bed at 11:00.', ['I go to bed at 9:30.'])],
    questionAnswerDrills: [drill('What time do you wake up?', 'I wake up at 6:30.', ['I wake up at 7:00.']), drill('What do you do at night?', 'I study English at night.', ['I rest at night.']), drill('What time do you go to bed?', 'I go to bed at 10:30.', ['I go to bed at 11:00.'])],
    buildYourAnswer: [task('Diga a hora que você acorda.'), task('Diga uma ação da manhã.'), task('Diga trabalho ou estudo.'), task('Diga uma ação da noite.'), task('Finalize com horário de dormir.')],
    guidedSpeaking: [task('Use o modelo: I wake up at ___. I have breakfast at ___. I go to ___. At night, I ___. I go to bed at ___.')],
    recordingTasks: [task('Grave 5 frases sobre sua rotina.'), task('Grave respostas para 3 perguntas de rotina.'), task('Grave uma versão final de 30 segundos.')],
    speakingChecklist: [task('Usei frases curtas?'), task('Usei present simple com I?'), task('Usei horários com at?'), task('Falei em ordem do dia?')],
    freeSpeaking: [task('Fale por 30 segundos sobre sua rotina diária usando pelo menos 5 ações.')],
    selfAssessment: [task('Consigo dizer quando acordo?'), task('Consigo falar o que faço à noite?'), task('Consigo gravar 30 segundos sem ler tudo?')],
    lessonRecap: ['Fala A1 precisa de blocos curtos.', 'Rotina fica clara em ordem do dia.', 'At ajuda com horários.', 'Modelo vem antes da fala livre.'],
    nextLessonBridge: 'Na Writing A1.3, você vai transformar sua fala em um parágrafo curto sobre rotina.',
  }),

  createWritingLesson({
    ...common,
    id: 'A1-WRITING-006',
    order: 6,
    title: 'Write about your routine',
    objectives: ['Escrever um parágrafo curto sobre rotina.', 'Usar present simple com I.', 'Organizar frases em ordem do dia.', 'Revisar erros comuns antes da versão final.'],
    teacherOpening: 'Agora você vai escrever sua rotina. O segredo é não tentar escrever um texto grande. Escreva 6 a 8 frases claras, em ordem: manhã, trabalho/estudo, noite. Use os blocos que já treinou em Grammar, Vocabulary, Reading, Listening e Speaking.',
    whyItMatters: 'Escrever rotina consolida o conteúdo A1.3 inteiro. Você transforma vocabulário e grammar em produção real, com checklist para corrigir antes de pedir feedback.',
    realLifeUseCases: ['Escrever uma apresentação simples.', 'Preencher atividade de aula.', 'Criar texto para perfil de estudante.', 'Preparar fala sobre rotina.', 'Receber correção da IA Tutor depois.'],
    conceptExplanation: 'Um parágrafo de rotina A1 usa frases curtas no present simple. Comece com My daily routine is simple. Depois escreva ações em ordem. Use at para horário e conectores simples como and e after work.',
    mentalModel: { title: 'Parágrafo de rotina', summary: 'Abertura + manhã + trabalho/estudo + noite + fechamento.' },
    stepByStep: [task('Escreva uma frase de abertura.'), task('Adicione duas frases da manhã.'), task('Adicione trabalho/estudo.'), task('Adicione duas frases da noite.'), task('Revise verbos e horários.')],
    portugueseContrast: [task('Não use -s com I: I wake up, não I wakes up.'), task('Use have breakfast.'), task('Use go home, não go to home.'), task('Use at antes de horários.')],
    guidedDiscovery: [task('Qual frase abre o texto?', 'My daily routine is simple.'), task('Qual palavra marca horário?', 'at'), task('Qual bloco fala ir dormir?', 'go to bed')],
    guidedBeforeQuiz: [task('Complete: I wake up ___ 6:30.', 'at'), task('Complete: I ___ breakfast at 7:00.', 'have'), task('Corrija: I goes home.', 'I go home.')],
    modelText: 'My daily routine is simple. I wake up at 6:30. I have breakfast at 7:00. I go to work in the morning. After work, I go home and rest. At night, I study English for thirty minutes. I have dinner at 8:00. I go to bed at 10:30.',
    modelTextBreakdown: [block('Opening', 'My daily routine is simple.', 'Abre o tema.'), block('Morning', 'I wake up at 6:30. I have breakfast at 7:00.', 'Mostra começo do dia.'), block('Work/study', 'I go to work in the morning.', 'Mostra atividade principal.'), block('Night', 'At night, I study English for thirty minutes.', 'Mostra rotina da noite.'), block('Closing', 'I go to bed at 10:30.', 'Fecha o dia.')],
    writingBlocks: [block('Abertura', 'My daily routine is simple.'), block('Manhã', 'I wake up at ___. I have breakfast at ___.'), block('Trabalho/estudo', 'I go to work/school in the morning.'), block('Noite', 'At night, I study English / rest / have dinner.'), block('Final', 'I go to bed at ___.')],
    grammarForWriting: [task('Use I + verbo base.'), task('Use at + horário.'), task('Use after work para sequência.'), task('Use and para juntar duas ações simples.')],
    usefulSentences: [task('My daily routine is simple.'), task('I wake up at 6:30.'), task('I have breakfast at 7:00.'), task('I study English at night.'), task('I go to bed at 10:30.')],
    guidedSubstitution: [task('Troque 6:30 por seu horário.'), task('Troque work por school, se necessário.'), task('Troque study English por outra ação da noite.'), task('Troque 10:30 pelo horário que você dorme.')],
    commonWritingMistakes: [mistake('I wakes up at 6:30.', 'I wake up at 6:30.', 'Com I, use verbo base.'), mistake('I go to home.', 'I go home.', 'Go home não usa to.'), mistake('I take breakfast.', 'I have breakfast.', 'Use o bloco natural.'), mistake('I wake up in 6:30.', 'I wake up at 6:30.', 'Use at para horário.')],
    revisionChecklist: [task('Meu texto tem 6 a 8 frases?'), task('Usei present simple com I?'), task('Usei at antes dos horários?'), task('Evitei I wakes / I goes?'), task('A ordem do dia está clara?')],
    checklist: [task('Abertura clara.'), task('Manhã.'), task('Trabalho/estudo.'), task('Noite.'), task('Horários com at.'), task('Verbo base com I.')],
    draftTask: task('Escreva a primeira versão do seu parágrafo com 6 a 8 frases.'),
    finalVersionTask: task('Revise pelo checklist e escreva a versão final sobre sua rotina.'),
    feedbackPreparation: [task('Antes de pedir feedback, confira I + verbo base.'), task('Confira at + horário.'), task('Confira have breakfast/lunch/dinner.')],
    selfAssessment: [task('Consigo escrever 6 frases sobre rotina?'), task('Consigo revisar erros comuns?'), task('Consigo organizar manhã, trabalho e noite?')],
    lessonRecap: ['Writing A1.3 transforma rotina em parágrafo curto.', 'Use frases simples e ordem do dia.', 'At marca horários.', 'Checklist vem antes da versão final.'],
    nextLessonBridge: 'Depois desta unidade, você continuará expandindo rotina com he/she/it, frequência e horários mais naturais.',
  }),
]);

export const A1_DEEP_DAILY_ROUTINE_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(A1_DEEP_DAILY_ROUTINE.filter((lesson) => lesson.pillar === 'grammar')),
  vocabulary: Object.freeze(A1_DEEP_DAILY_ROUTINE.filter((lesson) => lesson.pillar === 'vocabulary')),
  reading: Object.freeze(A1_DEEP_DAILY_ROUTINE.filter((lesson) => lesson.pillar === 'reading')),
  listening: Object.freeze(A1_DEEP_DAILY_ROUTINE.filter((lesson) => lesson.pillar === 'listening')),
  speaking: Object.freeze(A1_DEEP_DAILY_ROUTINE.filter((lesson) => lesson.pillar === 'speaking')),
  writing: Object.freeze(A1_DEEP_DAILY_ROUTINE.filter((lesson) => lesson.pillar === 'writing')),
});
