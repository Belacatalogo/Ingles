import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'A2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['a2-3', 'plans-and-now', 'temporary-situations', 'study-plans', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }
function ex(text, translation, why = '', warning = '') { return { text, translation, why, warning }; }

export const A2_DEEP_PLANS_AND_NOW_PART2 = Object.freeze([
  createGrammarLesson({
    ...common,
    id: 'A2-GRAMMAR-009',
    order: 9,
    title: 'Present Continuous — temporary situations',
    objectives: ['Usar Present Continuous para situações temporárias.', 'Diferenciar algo permanente de algo temporário.', 'Falar de mudanças atuais em trabalho, estudo e casa.', 'Usar this week, these days, at the moment e currently.'],
    teacherOpening: 'Você já usou Present Continuous para ações acontecendo agora. Agora vai usar para situações temporárias: I am studying English this month. She is working from home this week. We are staying with friends these days. Nem sempre está acontecendo neste segundo; pode ser uma fase temporária.',
    whyItMatters: 'Muitas situações reais não são rotina permanente, mas também não são só “agora neste segundo”. Você precisa explicar fases: estou estudando mais, estou trabalhando em casa, estou morando temporariamente, estou fazendo um curso.',
    realLifeUseCases: ['Falar de curso temporário.', 'Explicar mudança de trabalho.', 'Dizer que está morando em outro lugar por um tempo.', 'Descrever rotina temporária de estudo.', 'Falar de uma fase atual.'],
    conceptExplanation: 'Use Present Continuous para situações temporárias com expressões como this week, this month, these days, at the moment, currently. Exemplo: I usually work in the office, but I am working from home this week.',
    mentalModel: { title: 'temporário = agora estendido', summary: 'Não é só este segundo; é uma fase atual com começo/fim.', steps: ['this week', 'this month', 'these days', 'at the moment'] },
    stepByStep: [task('Identifique se é fase temporária.'), task('Use am/is/are + verb-ing.'), task('Adicione expressão temporária.'), task('Compare com rotina se necessário.'), task('Revise se o be combina com o sujeito.')],
    portugueseContrast: [task('Português usa “estou trabalhando em casa esta semana”; inglês usa I am working from home this week.'), task('Não use Simple Present para fase temporária quando quer mostrar mudança.'), task('Não esqueça o be.'), task('Currently é mais formal que now.')],
    guidedDiscovery: [task('This week mostra fase temporária.'), task('These days mostra período atual.'), task('At the moment mostra situação atual, não permanente.')],
    guidedBeforeQuiz: [task('Complete: I ___ studying more this month.', 'am'), task('Complete: She ___ working from home this week.', 'is'), task('Corrija: I study English this month.', 'I am studying English this month.')],
    grammarGoal: 'Descrever fases e situações temporárias com Present Continuous.',
    formationGuide: [task('Subject + be + verb-ing + temporary time', 'I am studying English this month.'), task('Contrast with usually', 'I usually work at night, but I am working in the morning this week.'), task('Negative temporary', 'She is not working today.'), task('Question', 'Are you studying more these days?')],
    whenToUse: [task('Situação temporária atual.'), task('Mudança de rotina.'), task('Fase de estudo/trabalho/casa.'), task('Algo válido por dias/semanas, não permanente.')],
    whenNotToUse: [task('Não use para verdades permanentes.'), task('Não use para hábitos gerais sem contraste.'), task('Não esqueça expressão de tempo quando a frase pode ficar ambígua.')],
    grammarTable: [
      { pattern: 'this week', example: 'I am working from home this week.', translation: 'Estou trabalhando de casa esta semana.' },
      { pattern: 'this month', example: 'She is studying more this month.', translation: 'Ela está estudando mais este mês.' },
      { pattern: 'these days', example: 'We are using a new app these days.', translation: 'Estamos usando um aplicativo novo esses dias.' },
      { pattern: 'at the moment', example: 'They are staying with family at the moment.', translation: 'Eles estão ficando com a família no momento.' }
    ],
    teacherExamples: [
      { english: 'I am taking an English course this month.', translation: 'Estou fazendo um curso de inglês este mês.', why: 'Curso temporário.' },
      { english: 'She is working on a new project this week.', translation: 'Ela está trabalhando em um projeto novo esta semana.', why: 'Projeto atual/temporário.' },
      { english: 'We are studying together these days.', translation: 'Estamos estudando juntos esses dias.', why: 'Fase atual.' },
      { english: 'He is not using his phone at the moment.', translation: 'Ele não está usando o telefone no momento.', why: 'Situação atual temporária.' }
    ],
    commonBrazilianMistakes: [mistake('I study more this week.', 'I am studying more this week.', 'Fase temporária usa Present Continuous.'), mistake('She working from home this month.', 'She is working from home this month.', 'Precisa de is.'), mistake('They are study these days.', 'They are studying these days.', 'Verbo principal ganha -ing.'), mistake('I am usually work at night.', 'I usually work at night.', 'Rotina geral usa Present Simple.')],
    controlledPractice: [task('Complete: I ___ taking a course this month.', 'am'), task('Complete: He is ___ from home this week. (work)', 'working'), task('Complete: We ___ studying together these days.', 'are'), task('Complete: She is not ___ today. (work)', 'working')],
    errorCorrectionPractice: [task('Corrija: I am study this month.', 'I am studying this month.'), task('Corrija: They is working from home.', 'They are working from home.'), task('Corrija: She works from home this week.', 'She is working from home this week.')],
    transformationPractice: [task('Transforme em situação temporária: I study at night. (this week)', 'I am studying at night this week.'), task('Transforme: She works from home. (this month)', 'She is working from home this month.'), task('Transforme: We use a new app. (these days)', 'We are using a new app these days.')],
    translationPractice: [task('Estou estudando mais este mês.', 'I am studying more this month.'), task('Ela está trabalhando de casa esta semana.', 'She is working from home this week.'), task('Estamos usando um app novo esses dias.', 'We are using a new app these days.')],
    productionTasks: [task('Escreva 8 frases sobre situações temporárias atuais.'), task('Compare 3 rotinas normais com 3 mudanças temporárias.'), task('Fale sobre uma fase atual de estudo ou trabalho.')],
    finalChecklist: [task('É temporário?'), task('Usei am/is/are?'), task('Usei -ing?'), task('Incluí expressão como this week/these days?')],
    selfAssessment: [task('Consigo falar de fase temporária?'), task('Consigo contrastar rotina e mudança?'), task('Consigo evitar I study this week quando é temporário?')],
    lessonRecap: ['Present Continuous também fala de fases temporárias.', 'Use this week/this month/these days/at the moment.', 'Rotina permanente continua no Present Simple.', 'Temporário mostra mudança ou fase atual.'],
    nextLessonBridge: 'Agora você vai expandir estudo e hábitos de aprendizagem para falar de planos de estudo.',
  }),

  createVocabularyLesson({
    ...common,
    id: 'A2-VOCABULARY-010',
    order: 10,
    title: 'Study and learning habits',
    objectives: ['Aprender vocabulário de estudo e hábitos de aprendizagem.', 'Falar de plano de estudo, meta, revisão e prática.', 'Usar palavras como goal, schedule, review, practice e progress.', 'Preparar reading, listening, speaking e writing sobre plano de estudo.'],
    teacherOpening: 'Study and learning habits é essencial para seu próprio curso. Você vai aprender goal, study plan, schedule, lesson, review, practice, progress, mistake, improve, focus, notes e test. O foco é falar como você está estudando e o que pretende melhorar.',
    whyItMatters: 'Você precisa falar sobre seus estudos, metas e progresso. Esse vocabulário aparece em conversas de escola, trabalho, cursos online e planejamento pessoal.',
    realLifeUseCases: ['Falar de rotina de estudo.', 'Criar plano de estudo.', 'Explicar dificuldade.', 'Pedir ajuda em uma aula.', 'Falar de progresso e metas.'],
    conceptExplanation: 'Organize study vocabulary em: plan, action, problem e progress. Plan: goal, schedule, study plan. Action: review, practice, take notes. Problem: mistake, difficult, focus. Progress: improve, progress, test.',
    mentalModel: { title: 'study = goal + practice + review + progress', summary: 'Estudo eficiente precisa de meta, prática e revisão.', steps: ['goal', 'study plan', 'practice', 'review', 'progress'] },
    stepByStep: [task('Defina uma meta.'), task('Crie horário de estudo.'), task('Pratique uma habilidade.'), task('Revise erros.'), task('Meça progresso.')],
    portugueseContrast: [task('Goal é meta/objetivo.'), task('Schedule é cronograma/horário.'), task('Practice pode ser prática ou praticar.'), task('Progress não é “progresso” com som de português.')],
    guidedDiscovery: [task('Goal responde “para quê?”.'), task('Schedule responde “quando?”.'), task('Practice responde “o quê fazer?”.'), task('Progress responde “melhorou?”.')],
    guidedBeforeQuiz: [task('My goal is to speak better.'), task('I review my mistakes every week.'), task('I am practicing listening these days.'), task('My progress is slow, but real.')],
    topicContext: 'Você vai falar de estudos, metas, dificuldades e progresso.',
    essentialWords: [vocab('goal', 'meta', 'My goal is to speak English.'), vocab('study plan', 'plano de estudo', 'I have a study plan.'), vocab('schedule', 'cronograma/horário', 'My study schedule is simple.'), vocab('lesson', 'aula', 'I have one lesson today.'), vocab('review', 'revisar/revisão', 'I review vocabulary.'), vocab('practice', 'praticar/prática', 'I practice listening.'), vocab('progress', 'progresso', 'I can see progress.'), vocab('mistake', 'erro', 'I review my mistakes.'), vocab('improve', 'melhorar', 'I want to improve speaking.'), vocab('focus', 'foco/focar', 'I need to focus.'), vocab('notes', 'anotações', 'I take notes.'), vocab('test', 'teste/prova', 'I have a test tomorrow.'), vocab('difficult', 'difícil', 'Grammar is difficult for me.'), vocab('easy', 'fácil', 'This lesson is easy.'), vocab('remember', 'lembrar', 'I remember the words.'), vocab('forget', 'esquecer', 'I forget new vocabulary.')],
    chunks: [{ chunk: 'my goal is to...', translation: 'minha meta é...', example: 'My goal is to speak better.' }, { chunk: 'study schedule', translation: 'cronograma de estudos', example: 'My study schedule changed.' }, { chunk: 'review my mistakes', translation: 'revisar meus erros', example: 'I review my mistakes every week.' }, { chunk: 'practice listening', translation: 'praticar escuta', example: 'I practice listening at night.' }, { chunk: 'make progress', translation: 'progredir', example: 'I am making progress.' }],
    pronunciationFocus: { title: 'Foco sonoro', tips: ['Goal tem som longo; não fale “gol” igual futebol.', 'Schedule varia por sotaque.', 'Progress tem stress diferente em inglês americano: PRO-gress como substantivo.'] },
    dangerousConfusions: [task('Practice como substantivo e verbo pode confundir, mas no A2 basta usar I practice + skill.'), task('Remember = lembrar; remind = lembrar alguém.'), task('Notes = anotações, não notas escolares sempre.'), task('Test pode ser teste/prova.')],
    collocations: [task('set a goal'), task('make a study plan'), task('follow a schedule'), task('review mistakes'), task('practice speaking'), task('take notes'), task('make progress')],
    miniDialogues: [{ title: 'Study plan', lines: ['A: What is your goal?', 'B: I want to improve speaking.', 'A: How are you studying?', 'B: I am practicing every night and reviewing my mistakes.'], focus: 'Meta e plano de estudo.' }],
    examples: [ex('I am studying more this month.', 'Estou estudando mais este mês.', 'Situação temporária de estudo.'), ex('My goal is to understand conversations.', 'Minha meta é entender conversas.', 'Goal + to.'), ex('I didn’t review my mistakes last week.', 'Eu não revisei meus erros semana passada.', 'Passado negativo + estudo.')],
    recognitionPractice: [{ question: 'Study and learning habits — qual vocabulário desta aula significa "meta"?', options: ['goal', 'study plan', 'schedule'], answer: 'goal', explanation: 'goal = meta; vocabulário trabalhado nesta aula de Study and learning habits.' }, task('Qual palavra significa meta?', 'goal'), task('Qual palavra significa revisão?', 'review'), task('Qual palavra significa progresso?', 'progress')],
    usagePractice: [task('Complete: My goal is ___ speak better.', 'to'), task('Complete: I review my ___.', 'mistakes'), task('Complete: I practice ___ every day.', 'speaking/listening/reading')],
    productionTasks: [task('Escreva 5 frases sobre seus hábitos de estudo.'), task('Crie 3 metas de inglês em inglês.'), task('Crie um mini plano de estudo com schedule, practice e review.')],
    spacedReview: [task('Revise goal/schedule/review/progress amanhã.'), task('Crie 3 frases com I am studying... these days.')],
    selfAssessment: [task('Consigo falar das minhas metas?'), task('Consigo explicar meu plano de estudo?'), task('Consigo falar de progresso e erros?')],
    lessonRecap: ['Study vocabulary ajuda a falar do próprio curso.', 'Goal, schedule, practice, review e progress são centrais.', 'Hábitos e fases temporárias podem se combinar.', 'Falar de erros ajuda aprendizagem real.'],
    nextLessonBridge: 'Na Reading, você vai ler um e-mail sobre plano de estudo.',
  }),

  createReadingLesson({
    ...common,
    id: 'A2-READING-009',
    order: 9,
    title: 'A study plan email',
    objectives: ['Ler um e-mail simples sobre plano de estudo.', 'Identificar meta, rotina temporária, horário e dificuldade.', 'Reconhecer Present Continuous para fase atual.', 'Responder com evidência textual.'],
    teacherOpening: 'Nesta leitura, você vai ler um e-mail sobre plano de estudo. O objetivo é identificar meta, agenda, prática, revisão e problema. Esse texto se conecta diretamente ao seu processo de aprender inglês.',
    whyItMatters: 'Planos de estudo aparecem em cursos, escola e trabalho. Você precisa entender o que a pessoa está fazendo agora, qual meta tem e o que precisa melhorar.',
    realLifeUseCases: ['Ler e-mail de professor/aluno.', 'Entender plano de estudo.', 'Identificar dificuldade.', 'Falar de progresso.', 'Responder com sugestão simples.'],
    conceptExplanation: 'Procure goal, schedule, practice, review, problem e progress. Present Continuous aparece em frases como I am studying every night this month, indicando fase temporária.',
    mentalModel: { title: 'study email = goal + schedule + problem + progress', summary: 'Leia para entender plano e dificuldade.', steps: ['goal', 'schedule', 'practice', 'problem', 'progress'] },
    stepByStep: [task('Leia para achar a meta principal.'), task('Marque horários.'), task('Marque prática/revisão.'), task('Procure dificuldade.'), task('Responda com evidência.')],
    portugueseContrast: [task('I am studying every night this month mostra fase temporária.'), task('I usually study on weekends mostra rotina.'), task('Improve significa melhorar.')],
    guidedDiscovery: [task('Goal mostra objetivo.'), task('This month mostra fase temporária.'), task('But introduz dificuldade.')],
    guidedBeforeQuiz: [task('Procure goal.'), task('Procure schedule.'), task('Procure problem.'), task('Use evidência.')],
    readingPurpose: 'Entender e-mail curto sobre plano de estudo.',
    preReadingVocabulary: [vocab('goal', 'meta'), vocab('study plan', 'plano de estudo'), vocab('schedule', 'cronograma'), vocab('review', 'revisar'), vocab('mistakes', 'erros'), vocab('improve', 'melhorar')],
    readingStrategy: [task('Use scanning para tempo e meta.'), task('Separe rotina normal de fase temporária.'), task('Procure problema/dificuldade.'), task('Copie evidência.')],
    mainText: `Hi, teacher. My goal is to improve my listening and speaking. This month, I am studying English every night after work. I usually review vocabulary on Saturdays, but I am also practicing listening during lunch these days. My problem is that I forget new words quickly. I am taking notes and reviewing my mistakes. I think I am making progress.`,
    firstReadTask: task('Qual é o assunto geral?', 'Um aluno explicando seu plano de estudo.'),
    secondReadTasks: [task('Qual é a meta?', 'improve listening and speaking'), task('Quando estuda este mês?', 'every night after work'), task('Quando revisa vocabulário normalmente?', 'on Saturdays'), task('Qual é o problema?', 'forgets new words quickly')],
    evidenceQuestions: [q('What is the student’s goal?', 'to improve listening and speaking', 'My goal is to improve my listening and speaking.', '', ['improve listening and speaking','buy a new phone','travel to Canada']), q('When is the student studying this month?', 'every night after work', 'I am studying English every night after work.', '', ['every night after work','only on Sundays','in the morning']), q('What does the student usually review on Saturdays?', 'vocabulary', 'I usually review vocabulary on Saturdays.', '', ['vocabulary','grammar tests','emails']), q('What is the student’s problem?', 'forgetting new words quickly', 'I forget new words quickly.', '', ['forgetting new words','no schedule','phone problem']), q('What is the student doing to improve?', 'taking notes and reviewing mistakes', 'I am taking notes and reviewing my mistakes.', '', ['taking notes and reviewing mistakes','buying books','traveling'])],
    contextVocabularyTasks: [task('Making progress significa progredindo.'), task('During lunch significa durante o almoço.'), task('These days mostra fase atual.')],
    guidedSummary: task('Complete: The student wants to improve ___ and ___. This month, they are studying every ___ after work and reviewing ___.', '', 'listening / speaking / night / mistakes'),
    connectedProduction: task('Escreva 4 frases sobre seu próprio plano de estudo.'),
    selfAssessment: [task('Consigo identificar meta?'), task('Consigo separar rotina e situação temporária?'), task('Consigo responder com evidência?')],
    lessonRecap: ['Study plan email mostra meta, agenda e problema.', 'Present Continuous pode mostrar fase temporária.', 'Usually mostra rotina.', 'Evidence confirma interpretação.'],
    nextLessonBridge: 'No Listening, você vai ouvir uma conversa sobre plano de estudo.',
  }),

  createListeningLesson({
    ...common,
    id: 'A2-LISTENING-009',
    order: 9,
    title: 'Study plan conversation',
    objectives: ['Ouvir conversa sobre plano de estudo.', 'Identificar meta, frequência, dificuldade e ação atual.', 'Reconhecer studying, practicing, reviewing e progress.', 'Praticar dictation e shadowing de estudo.'],
    teacherOpening: 'Nesta escuta, você vai ouvir uma conversa sobre plano de estudo. Primeiro identifique a meta. Depois, quando a pessoa estuda, qual dificuldade tem e o que está fazendo para melhorar.',
    whyItMatters: 'Conversas sobre estudo ajudam você a explicar sua aprendizagem, pedir ajuda e falar de progresso em inglês.',
    realLifeUseCases: ['Conversar com professor.', 'Falar de dificuldade.', 'Explicar rotina de estudo.', 'Combinar prática.', 'Pedir sugestão.'],
    conceptExplanation: 'Ouça palavras-chave: goal, study, practice, review, mistakes, progress. Present Continuous aparece para ações/fases atuais: I am practicing listening this week.',
    mentalModel: { title: 'study conversation = goal + habit + problem + action', summary: 'Ouça o objetivo, o hábito e o que está mudando.', steps: ['goal', 'schedule', 'problem', 'current action'] },
    stepByStep: [task('Primeira escuta: meta principal.'), task('Segunda escuta: frequência/horário.'), task('Terceira etapa: problema e solução.'), task('Leia transcript.'), task('Faça dictation.'), task('Faça shadowing.')],
    portugueseContrast: [task('I am practicing this week mostra fase temporária.'), task('I usually study mostra hábito.'), task('I forget words mostra problema recorrente.')],
    guidedDiscovery: [task('What is your goal? pede meta.'), task('How often do you study? pede frequência.'), task('I am reviewing mistakes mostra ação atual.')],
    guidedBeforeQuiz: [task('Primeira escuta: qual é a meta?'), task('Segunda escuta: quando estuda?')],
    listeningPreparation: [task('Não leia transcript antes da primeira escuta.'), task('Prepare: goal, study, practice, review, mistakes, progress.'), task('Objetivo: meta + rotina + problema.')],
    keyWordsToHear: [vocab('goal','meta'), vocab('practice','praticar'), vocab('review','revisar'), vocab('mistakes','erros'), vocab('progress','progresso')],
    audioScript: `Teacher: What is your goal this month?
Student: I want to improve my listening.
Teacher: How often do you study?
Student: I usually study on weekends, but this month I am studying every night.
Teacher: What is difficult for you?
Student: I forget new words quickly.
Teacher: What are you doing about it?
Student: I am taking notes and reviewing my mistakes.`,
    firstListenTasks: [task('Sem transcript: qual habilidade quer melhorar?', 'listening'), task('Sem transcript: o aluno está estudando mais este mês?', 'yes')],
    secondListenTasks: [task('Quando estuda normalmente?', 'on weekends'), task('Quando está estudando este mês?', 'every night'), task('Qual é a dificuldade?', 'forgets new words quickly'), task('O que está fazendo?', 'taking notes and reviewing mistakes')],
    transcript: `Teacher: What is your goal this month?
Student: I want to improve my listening.
Teacher: How often do you study?
Student: I usually study on weekends, but this month I am studying every night.
Teacher: What is difficult for you?
Student: I forget new words quickly.
Teacher: What are you doing about it?
Student: I am taking notes and reviewing my mistakes.`,
    vocabulary: [vocab('how often', 'com que frequência'), vocab('what are you doing about it?', 'o que você está fazendo sobre isso?'), vocab('taking notes', 'fazendo anotações')],
    shadowing: [task('What is your goal this month?'), task('I want to improve my listening.'), task('I usually study on weekends.'), task('This month I am studying every night.'), task('I am taking notes and reviewing my mistakes.')],
    dictationTasks: [task('Digite: I want to improve my listening.', 'I want to improve my listening.'), task('Digite: This month I am studying every night.', 'This month I am studying every night.'), task('Digite: I am taking notes and reviewing my mistakes.', 'I am taking notes and reviewing my mistakes.')],
    pronunciationChunks: [task('want to improve', 'Conecte want-to.'), task('usually study', 'Rotina.'), task('reviewing my mistakes', 'Bloco de estudo.')],
    listeningComprehension: [q('Áudio da aula — Study plan conversation — what does the student want to improve?', 'listening', 'I want to improve my listening.', '', ['listening','writing','shopping']), q('When does the student usually study?', 'on weekends', 'I usually study on weekends.', '', ['on weekends','every morning','after lunch']), q('What is the student doing this month?', 'studying every night', 'this month I am studying every night', '', ['studying every night','not studying','traveling']), q('Áudio da aula — Study plan conversation — what is difficult?', 'remembering new words / forgetting new words', 'I forget new words quickly.', '', ['forgetting new words','grammar rules','phone problem'])],
    oralProduction: task('Responda oralmente: What is your goal? How often do you study? What is difficult for you?'),
    selfAssessment: [task('Consegui ouvir meta?'), task('Consegui ouvir rotina vs fase temporária?'), task('Consigo repetir frases de estudo?')],
    lessonRecap: ['Study plan listening tem meta, frequência e problema.', 'Usually indica rotina.', 'This month + am studying indica fase temporária.', 'Reviewing mistakes ajuda progresso.'],
    nextLessonBridge: 'No Speaking, você vai falar sobre seus planos de estudo.',
  }),

  createSpeakingLesson({
    ...common,
    id: 'A2-SPEAKING-010',
    order: 10,
    title: 'Talk about study plans',
    objectives: ['Falar sobre plano de estudo.', 'Dizer meta, frequência, dificuldade e ação atual.', 'Usar Present Continuous para fase temporária de estudo.', 'Gravar fala de 60 segundos sobre aprendizagem.'],
    teacherOpening: 'Agora você vai falar sobre seus estudos. Use frases como: My goal is to improve listening. I usually study on weekends, but this month I am studying every night. I am reviewing my mistakes.',
    whyItMatters: 'Falar do seu próprio estudo ajuda você a explicar metas, pedir ajuda e acompanhar progresso em inglês.',
    realLifeUseCases: ['Falar com professor.', 'Explicar meta de estudo.', 'Dizer dificuldade.', 'Pedir dica.', 'Apresentar plano semanal.'],
    conceptExplanation: 'Organize sua fala em 4 partes: goal, usual routine, temporary change, problem/action. Exemplo: My goal is to speak better. I usually study at night. This month, I am practicing listening every day. My problem is vocabulary.',
    mentalModel: { title: 'study speaking em 4 partes', summary: 'Meta, rotina, mudança e ação.', steps: ['My goal is...', 'I usually...', 'This month I am...', 'My problem is... / I am...'] },
    stepByStep: [task('Diga sua meta.'), task('Diga sua rotina normal.'), task('Diga uma mudança temporária.'), task('Diga sua dificuldade.'), task('Diga o que está fazendo para melhorar.'), task('Grave versão final.')],
    portugueseContrast: [task('My goal is to... é mais natural que My objective is speak.'), task('Use usually para rotina.'), task('Use I am studying this month para fase temporária.')],
    guidedDiscovery: [task('What is your goal? pede meta.'), task('How often do you study? pede frequência.'), task('What are you doing about it? pede ação atual.')],
    guidedBeforeQuiz: [task('Repita: My goal is to improve speaking.'), task('Repita: I usually study at night.'), task('Repita: This month, I am practicing listening every day.'), task('Repita: I am reviewing my mistakes.')],
    speakingSituation: 'Você está explicando seu plano de estudo para um professor ou colega.',
    modelPhrases: [phrase('My goal is to improve speaking.', 'Minha meta é melhorar a fala.'), phrase('I usually study at night.', 'Eu geralmente estudo à noite.'), phrase('This month, I am studying every day.', 'Este mês, estou estudando todos os dias.'), phrase('My problem is vocabulary.', 'Meu problema é vocabulário.'), phrase('I am reviewing my mistakes.', 'Estou revisando meus erros.')],
    pronunciationChunks: [task('my goal is to', 'Meta em bloco.'), task('usually study', 'Rotina.'), task('reviewing my mistakes', 'Ação atual.')],
    repeatAfterMe: [task('My goal is to improve listening.'), task('I usually study on weekends.'), task('This month, I am studying every night.'), task('I forget new words quickly.'), task('I am taking notes.')],
    substitutionDrills: [task('listening → speaking', 'My goal is to improve speaking.'), task('every night → after work', 'This month, I am studying after work.'), task('vocabulary → pronunciation', 'My problem is pronunciation.')],
    guidedSpeaking: [task('Responda: What is your goal?'), task('Responda: How often do you study?'), task('Responda: What is difficult for you?'), task('Responda: What are you doing this month?')],
    recordingTasks: [task('Grave 5 frases sobre seu estudo.'), task('Grave respostas para as 4 perguntas-guia.'), task('Grave fala final de 60 segundos.')],
    freeSpeaking: task('Fale por até 60 segundos sobre seu plano de estudo, usando goal, usually, this month e reviewing mistakes.'),
    feedbackChecklist: [task('Disse minha meta?'), task('Disse rotina normal?'), task('Usei Present Continuous para fase temporária?'), task('Expliquei dificuldade?'), task('Disse ação para melhorar?')],
    selfAssessment: [task('Consigo falar do meu plano de estudo?'), task('Consigo explicar dificuldade?'), task('Consigo falar por 60 segundos?')],
    lessonRecap: ['Study speaking combina meta, rotina e fase temporária.', 'Goal + to é estrutura útil.', 'Usually mostra rotina.', 'This month + am studying mostra mudança temporária.'],
    nextLessonBridge: 'Na Writing, você vai escrever um plano de estudo curto e claro.',
  }),

  createWritingLesson({
    ...common,
    id: 'A2-WRITING-010',
    order: 10,
    title: 'Write a study plan',
    objectives: ['Escrever plano de estudo simples.', 'Incluir meta, horário, prática, revisão e dificuldade.', 'Usar Present Continuous para fase temporária.', 'Revisar clareza e organização.'],
    teacherOpening: 'Agora você vai escrever seu plano de estudo. Ele deve ser simples, realista e organizado: meta, horário, prática, revisão e dificuldade. Exemplo: My goal is to improve listening. This month, I am studying every night after work.',
    whyItMatters: 'Escrever plano de estudo ajuda a organizar sua aprendizagem e treina vocabulário útil do próprio curso.',
    realLifeUseCases: ['Mandar plano para professor.', 'Organizar rotina pessoal.', 'Explicar meta de aprendizagem.', 'Acompanhar progresso.', 'Escrever e-mail de estudo.'],
    conceptExplanation: 'Um plano de estudo A2 pode ter 5 partes: goal, schedule, practice, review, problem/solution. Use frases curtas e conectores simples: but, because, so.',
    mentalModel: { title: 'study plan = goal + schedule + practice + review', summary: 'Plano bom diz o que, quando e por quê.', steps: ['My goal is...', 'I study...', 'This month I am...', 'I review...', 'My problem is...'] },
    stepByStep: [task('Escreva sua meta.'), task('Escreva seu horário.'), task('Escreva o que pratica.'), task('Escreva como revisa.'), task('Explique uma dificuldade.'), task('Revise pontuação e conectores.')],
    portugueseContrast: [task('Use My goal is to + verb.'), task('Use I am studying this month para fase temporária.'), task('Use I usually study para rotina.'), task('Não escreva parágrafo gigante.')],
    guidedDiscovery: [task('My goal is to improve listening dá objetivo.'), task('I usually study at night dá rotina.'), task('This month, I am practicing every day dá fase temporária.')],
    guidedBeforeQuiz: [task('Modelo: My goal is to improve my speaking.'), task('Modelo: I usually study at night.'), task('Modelo: This month, I am practicing listening every day.'), task('Modelo: I review my mistakes on Saturdays.')],
    writingPurpose: 'Escrever plano de estudo A2 claro e funcional.',
    modelText: `My goal is to improve my listening and speaking. I usually study at night after work. This month, I am practicing listening every day during lunch. I review vocabulary on Saturdays. My problem is that I forget new words quickly, so I am taking notes and reviewing my mistakes.`,
    writingBlocks: [task('Goal', 'My goal is to improve my listening and speaking.'), task('Usual schedule', 'I usually study at night after work.'), task('Temporary plan', 'This month, I am practicing listening every day.'), task('Review', 'I review vocabulary on Saturdays.'), task('Problem and solution', 'I forget new words, so I am taking notes.')],
    guidedSubstitution: [task('Troque listening por grammar/speaking.'), task('Troque at night por in the morning.'), task('Troque every day por three times a week.'), task('Troque vocabulary por pronunciation.')],
    grammarForWriting: [task('Use My goal is to + verb.'), task('Use usually para rotina.'), task('Use Present Continuous para plano temporário.'), task('Use so para solução.'), task('Use on + day para dia da semana.')],
    checklist: [task('Incluí meta?'), task('Incluí horário?'), task('Incluí prática?'), task('Incluí revisão?'), task('Expliquei dificuldade/solução?'), task('Revisei pontuação?')],
    draftTask: task('Escreva um plano de estudo de 5 a 7 frases.'),
    revisionTask: task('Revise meta, horário, prática, revisão, dificuldade e conectores.'),
    commonMistakes: [mistake('My goal is improve listening.', 'My goal is to improve listening.', 'Use to + verb.'), mistake('I am usually study at night.', 'I usually study at night.', 'Rotina usa Present Simple.'), mistake('I practice in Saturday.', 'I practice on Saturday.', 'Dias usam on.')],
    productionTasks: [task('Escreva versão 1 do plano.'), task('Adicione uma dificuldade e uma solução.'), task('Reescreva a versão final com 6 frases.')],
    selfAssessment: [task('Consigo escrever um plano de estudo?'), task('Consigo usar goal/schedule/review?'), task('Consigo revisar rotina vs fase temporária?')],
    lessonRecap: ['Study plan organiza meta, rotina e ação atual.', 'My goal is to é estrutura central.', 'Usually mostra rotina.', 'This month + am practicing mostra plano temporário.'],
    nextLessonBridge: 'Na próxima parte do A2.3, você vai trabalhar tecnologia, problemas de telefone e contraste entre Present Simple e Present Continuous.',
  }),
]);

export const A2_DEEP_PLANS_AND_NOW_PART2_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(A2_DEEP_PLANS_AND_NOW_PART2.filter((lesson) => lesson.pillar === 'grammar')),
  vocabulary: Object.freeze(A2_DEEP_PLANS_AND_NOW_PART2.filter((lesson) => lesson.pillar === 'vocabulary')),
  reading: Object.freeze(A2_DEEP_PLANS_AND_NOW_PART2.filter((lesson) => lesson.pillar === 'reading')),
  listening: Object.freeze(A2_DEEP_PLANS_AND_NOW_PART2.filter((lesson) => lesson.pillar === 'listening')),
  speaking: Object.freeze(A2_DEEP_PLANS_AND_NOW_PART2.filter((lesson) => lesson.pillar === 'speaking')),
  writing: Object.freeze(A2_DEEP_PLANS_AND_NOW_PART2.filter((lesson) => lesson.pillar === 'writing')),
});
