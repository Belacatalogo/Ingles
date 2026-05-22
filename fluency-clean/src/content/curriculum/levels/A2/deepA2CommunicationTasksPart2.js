import { createGrammarLesson, createVocabularyLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'A2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['a2-5', 'communication-tasks', 'advice', 'feelings', 'should', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }
function ex(text, translation, why = '', warning = '') { return { text, translation, why, warning }; }

export const A2_DEEP_COMMUNICATION_TASKS_PART2 = Object.freeze([
  createGrammarLesson({
    ...common,
    id: 'A2-GRAMMAR-019',
    order: 19,
    title: 'Should / shouldn’t',
    objectives: ['Usar should para dar conselho simples.', 'Usar shouldn’t para desaconselhar algo.', 'Formar perguntas com should.', 'Aplicar conselho em saúde, estudo, trabalho, sentimentos e problemas cotidianos.'],
    teacherOpening: 'Should é uma das estruturas mais úteis do A2. Ela significa “deveria” para conselho: You should rest. You shouldn’t work too much. Depois de should, use verbo base: should go, should study, should call.',
    whyItMatters: 'Você precisa dar conselhos simples sem soar agressivo: estudar mais, descansar, procurar ajuda, não gastar muito, não se atrasar.',
    realLifeUseCases: ['Dar conselho para amigo cansado.', 'Sugerir estudo ou descanso.', 'Dizer o que alguém não deveria fazer.', 'Perguntar opinião: What should I do?', 'Falar de saúde e problemas simples.'],
    conceptExplanation: 'Use subject + should + base verb. I should rest. You should call the doctor. Para negativa, shouldn’t + base verb. You shouldn’t eat too much sugar. Para pergunta: Should I call him? What should I do?',
    mentalModel: { title: 'should + verbo base', summary: 'Should dá conselho; o verbo depois fica na base.', steps: ['You should rest.', 'You shouldn’t worry.', 'Should I call?', 'What should I do?'] },
    stepByStep: [task('Identifique o problema.'), task('Escolha um conselho positivo com should.'), task('Escolha um alerta com shouldn’t.'), task('Use verbo base depois de should.'), task('Adicione motivo com because se necessário.')],
    portugueseContrast: [task('Should não muda com he/she: He should rest, não he shoulds.'), task('Depois de should não use to: should go, não should to go.'), task('Shouldn’t é contração de should not.'), task('Conselho com should é mais suave que ordem.')],
    guidedDiscovery: [task('You should rest é conselho positivo.'), task('You shouldn’t sleep late é conselho negativo.'), task('What should I do? pede conselho.'), task('Because explica motivo.')],
    guidedBeforeQuiz: [task('Complete: You ___ drink water.', 'should'), task('Complete: He should ___ a doctor.', 'see/call'), task('Corrija: She shoulds rest.', 'She should rest.')],
    grammarGoal: 'Dar e pedir conselhos simples com should/shouldn’t.',
    formationGuide: [task('Affirmative', 'You should rest today.'), task('Negative', 'You shouldn’t work too much.'), task('Yes/no question', 'Should I call the doctor?'), task('Wh-question', 'What should I do?')],
    whenToUse: [task('Para conselho simples.'), task('Para sugestão educada.'), task('Para saúde, estudo, trabalho, dinheiro, convites e sentimentos.')],
    whenNotToUse: [task('Não use should para obrigação forte; have to vem depois.'), task('Não use should to.'), task('Não conjugue o verbo depois de should.')],
    grammarTable: [
      { pattern: 'should + base verb', example: 'You should sleep earlier.', translation: 'Você deveria dormir mais cedo.' },
      { pattern: 'shouldn’t + base verb', example: 'You shouldn’t skip breakfast.', translation: 'Você não deveria pular o café da manhã.' },
      { pattern: 'What should I do?', example: 'I’m very tired. What should I do?', translation: 'Estou muito cansado. O que devo fazer?' },
      { pattern: 'Should I...?', example: 'Should I send a message?', translation: 'Eu deveria mandar uma mensagem?' }
    ],
    teacherExamples: [
      { english: 'You should take a break because you look tired.', translation: 'Você deveria fazer uma pausa porque parece cansado.', why: 'Conselho + motivo.' },
      { english: 'He shouldn’t spend so much money this week.', translation: 'Ele não deveria gastar tanto dinheiro esta semana.', why: 'Conselho financeiro.' },
      { english: 'Should I accept the invitation?', translation: 'Eu deveria aceitar o convite?', why: 'Pergunta pedindo opinião.' }
    ],
    commonBrazilianMistakes: [mistake('You should to rest.', 'You should rest.', 'Não use to depois de should.'), mistake('He shoulds call.', 'He should call.', 'Should não recebe s.'), mistake('You don’t should go.', 'You shouldn’t go.', 'Negativa é shouldn’t.'), mistake('What I should do?', 'What should I do?', 'Pergunta inverte should e sujeito.')],
    guidedPractice: [q('Qual frase dá conselho corretamente com should?', 'You should take a break because you look tired.', '', 'Should + verbo base dá conselho. Look tired é a razão.', ['You should take a break because you look tired.', 'You should to take a break because you look tired.', 'You should taking a break because you look tired.']), q('Qual frase usa shouldn’t corretamente?', 'He shouldn’t spend so much money this week.', '', 'Shouldn’t + verbo base para conselho negativo.', ['He shouldn’t spend so much money this week.', 'He shouldn’t to spend so much money this week.', 'He shouldn’t spends so much money this week.'])],
    controlledPractice: [task('Complete: You ___ rest.', 'should'), task('Complete: You ___ eat too much sugar.', 'shouldn’t'), task('Complete: What ___ I do?', 'should'), task('Complete: She should ___ water.', 'drink')],
    errorCorrectionPractice: [task('Corrija: He shoulds study.', 'He should study.'), task('Corrija: You should to call her.', 'You should call her.'), task('Corrija: I don’t should work today.', 'I shouldn’t work today.')],
    transformationPractice: [task('Conselho: I am tired.', 'You should rest.'), task('Alerta: I spend too much money.', 'You shouldn’t spend too much money.'), task('Pergunta: I call him?', 'Should I call him?')],
    translationPractice: [task('Você deveria descansar.', 'You should rest.'), task('Você não deveria trabalhar tanto.', 'You shouldn’t work so much.'), task('O que eu deveria fazer?', 'What should I do?')],
    productionTasks: [task('Escreva 8 conselhos com should.'), task('Escreva 5 alertas com shouldn’t.'), task('Crie 5 perguntas pedindo conselho.')],
    finalChecklist: [task('Usei should + verbo base?'), task('Evitei should to?'), task('Evitei shoulds?'), task('Usei shouldn’t para negativa?')],
    selfAssessment: [task('Consigo dar conselho?'), task('Consigo pedir conselho?'), task('Consigo corrigir erros comuns?')],
    lessonRecap: ['Should dá conselho.', 'Shouldn’t desaconselha.', 'Depois de should, verbo base.', 'What should I do? é pergunta essencial.'],
    nextLessonBridge: 'Agora você vai aprender sentimentos e opiniões para dar conselhos mais naturais.',
  }),

  createVocabularyLesson({
    ...common,
    id: 'A2-VOCABULARY-018',
    order: 18,
    title: 'Feelings and opinions',
    objectives: ['Aprender vocabulário de sentimentos e opiniões.', 'Descrever estados simples como tired, worried, excited e bored.', 'Expressar opinião com I think, I feel e in my opinion.', 'Conectar sentimentos com conselhos usando should.'],
    teacherOpening: 'Feelings and opinions dão vida à comunicação. Você vai usar tired, worried, nervous, excited, bored, angry, sad, happy, confused, comfortable, uncomfortable, interested e frases como I think, I feel, in my opinion.',
    whyItMatters: 'Conselhos ficam naturais quando você entende o sentimento: I’m worried. You should talk to her. I’m tired. You should rest.',
    realLifeUseCases: ['Dizer como se sente.', 'Perguntar opinião.', 'Dar conselho baseado em sentimento.', 'Responder convite com motivo emocional.', 'Explicar problema simples.'],
    conceptExplanation: 'Use be + feeling: I am tired. She is worried. Use feel + adjective: I feel nervous. Use I think para opinião: I think you should rest. Use because para motivo.',
    mentalModel: { title: 'feeling + opinion + advice', summary: 'Diga sentimento, opinião e conselho.', steps: ['I feel worried.', 'I think...', 'You should...', 'because...'] },
    stepByStep: [task('Nomeie o sentimento.'), task('Use I am ou I feel.'), task('Dê opinião com I think/in my opinion.'), task('Dê conselho com should.'), task('Explique com because.')],
    portugueseContrast: [task('I am boring = eu sou chato; I am bored = estou entediado.'), task('Excited não é excitado em contexto comum; é animado/empolgado.'), task('Nervous = nervoso/ansioso pelo contexto.'), task('Comfortable/uncomfortable falam de conforto físico ou situação.')],
    guidedDiscovery: [task('Tired combina com rest.'), task('Worried combina com talk/get help.'), task('Confused combina com ask a question.'), task('Bored combina com do something different.')],
    guidedBeforeQuiz: [task('I feel tired.'), task('She is worried.'), task('I think you should rest.'), task('In my opinion, you should ask for help.')],
    topicContext: 'Você vai expressar sentimentos e dar opiniões simples para apoiar conselhos.',
    essentialWords: [vocab('tired', 'cansado', 'I feel tired today.'), vocab('worried', 'preocupado', 'She is worried about the test.'), vocab('nervous', 'nervoso/ansioso', 'I am nervous before speaking.'), vocab('excited', 'animado/empolgado', 'He is excited about the trip.'), vocab('bored', 'entediado', 'I am bored at home.'), vocab('angry', 'bravo/com raiva', 'He is angry about the problem.'), vocab('sad', 'triste', 'She feels sad.'), vocab('happy', 'feliz', 'I am happy today.'), vocab('confused', 'confuso', 'I am confused about this lesson.'), vocab('comfortable', 'confortável', 'I feel comfortable here.'), vocab('uncomfortable', 'desconfortável', 'This situation is uncomfortable.'), vocab('interested', 'interessado', 'I am interested in English.'), vocab('opinion', 'opinião', 'In my opinion, this is better.'), vocab('think', 'achar/pensar', 'I think you should study.'), vocab('feel', 'sentir', 'I feel tired.')],
    chunks: [{ chunk: 'I feel tired', translation: 'eu me sinto cansado', example: 'I feel tired today.' }, { chunk: 'I’m worried about', translation: 'estou preocupado com', example: 'I’m worried about the test.' }, { chunk: 'In my opinion', translation: 'na minha opinião', example: 'In my opinion, you should rest.' }, { chunk: 'I think you should', translation: 'acho que você deveria', example: 'I think you should talk to him.' }],
    pronunciationFocus: { title: 'Foco sonoro', tips: ['Worried soa WOR-id.', 'Comfortable pode soar COMF-ter-bol.', 'Interested pode soar IN-truh-stid.'] },
    dangerousConfusions: [task('Bored vs boring.'), task('Excited não usar como “excitado” sexual em contexto comum.'), task('Sensible não é sensível; sensitive é sensível.'), task('Actually não é atualmente.')],
    collocations: [task('feel tired'), task('be worried about'), task('be nervous before'), task('be excited about'), task('be interested in'), task('in my opinion'), task('I think you should')],
    miniDialogues: [{ title: 'Advice and feelings', lines: ['A: I feel really tired.', 'B: You should take a break.', 'A: I’m worried about my test.', 'B: In my opinion, you should review your notes.'], focus: 'Sentimento + conselho.' }],
    examples: [ex('I’m confused, so I should ask a question.', 'Estou confuso, então deveria fazer uma pergunta.', 'Sentimento + ação.'), ex('She is worried about the meeting.', 'Ela está preocupada com a reunião.', 'Worried about.'), ex('I think you should sleep earlier.', 'Acho que você deveria dormir mais cedo.', 'Opinião + conselho.')],
    recognitionPractice: [{ question: 'Feelings and opinions — qual vocabulário desta aula significa "cansado"?', options: ['tired', 'worried', 'nervous'], answer: 'tired', explanation: 'tired = cansado; vocabulário trabalhado nesta aula de Feelings and opinions.' }, task('Qual palavra significa entediado?', 'bored'), task('Qual expressão significa preocupado com?', 'worried about'), task('Qual frase dá opinião?', 'In my opinion / I think')],
    usagePractice: [task('Complete: I am worried ___ the test.', 'about'), task('Complete: I am interested ___ English.', 'in'), task('Complete: I think you ___ rest.', 'should')],
    productionTasks: [task('Escreva 8 frases com sentimentos.'), task('Crie 5 opiniões com I think.'), task('Dê 5 conselhos baseados em sentimentos.')],
    spacedReview: [task('Revise tired/worried/nervous/excited amanhã.'), task('Crie frases com bored vs boring.')],
    selfAssessment: [task('Consigo dizer como me sinto?'), task('Consigo dar opinião simples?'), task('Consigo conectar sentimento e conselho?')],
    lessonRecap: ['Feelings usam be ou feel.', 'Opinions usam I think/in my opinion.', 'Should conecta opinião e conselho.', 'Cuidado com bored/boring e excited.'],
    nextLessonBridge: 'Agora você vai ouvir uma conversa dando conselho simples.',
  }),

  createListeningLesson({
    ...common,
    id: 'A2-LISTENING-014',
    order: 14,
    title: 'Giving simple advice',
    objectives: ['Ouvir problema, sentimento e conselho simples.', 'Identificar should/shouldn’t em fala.', 'Reconhecer motivo com because.', 'Praticar dictation e shadowing de conselhos.'],
    teacherOpening: 'Nesta escuta, você vai ouvir alguém com um problema e outra pessoa dando conselho. Primeiro entenda o problema. Depois, ouça o conselho com should ou shouldn’t.',
    whyItMatters: 'Conselhos aparecem em conversas reais: saúde, estudo, trabalho, dinheiro, convites e problemas pessoais.',
    realLifeUseCases: ['Ouvir conselho de amigo.', 'Entender recomendação simples.', 'Identificar o motivo do conselho.', 'Responder a alguém preocupado.', 'Praticar fala natural com should.'],
    conceptExplanation: 'Ouça chunks: I feel..., I’m worried about..., You should..., You shouldn’t..., I think..., because.... A ordem geralmente é problema → sentimento → conselho → motivo.',
    mentalModel: { title: 'problem → feeling → advice → reason', summary: 'Entenda o problema antes do conselho.', steps: ['problem', 'feeling', 'should/shouldn’t', 'because'] },
    stepByStep: [task('Primeira escuta: qual é o problema?'), task('Segunda escuta: como a pessoa se sente?'), task('Terceira etapa: qual conselho?'), task('Leia transcript.'), task('Faça dictation.'), task('Faça shadowing.')],
    portugueseContrast: [task('You should é conselho, não ordem forte.'), task('I think you should suaviza a opinião.'), task('Because explica o motivo.')],
    guidedDiscovery: [task('I feel tired aponta sentimento.'), task('You should rest aponta conselho.'), task('You shouldn’t sleep late aponta alerta.'), task('Because liga motivo.')],
    guidedBeforeQuiz: [task('Primeira escuta: a pessoa está cansada?'), task('Segunda escuta: qual conselho aparece com should?')],
    listeningPreparation: [task('Não leia transcript antes da primeira escuta.'), task('Prepare: tired, worried, should, shouldn’t, rest, sleep late.'), task('Objetivo: problema + conselho.')],
    keyWordsToHear: [vocab('tired','cansado'), vocab('worried','preocupado'), vocab('should','deveria'), vocab('shouldn’t','não deveria'), vocab('rest','descansar')],
    audioScript: `A: You look tired. Are you okay?
B: I feel very tired, and I’m worried about my test tomorrow.
A: I think you should take a break now. Then you should review your notes for thirty minutes.
B: Should I study all night?
A: No, you shouldn’t study all night. You should sleep early because your body needs rest.`,
    firstListenTasks: [task('Sem transcript: B está cansado?', 'yes'), task('Sem transcript: há conselho para dormir cedo?', 'yes')],
    secondListenTasks: [task('Com o que B está preocupado?', 'test tomorrow'), task('Qual é o primeiro conselho?', 'take a break'), task('Por quanto tempo deve revisar?', 'thirty minutes'), task('O que não deveria fazer?', 'study all night')],
    transcript: `A: You look tired. Are you okay?
B: I feel very tired, and I’m worried about my test tomorrow.
A: I think you should take a break now. Then you should review your notes for thirty minutes.
B: Should I study all night?
A: No, you shouldn’t study all night. You should sleep early because your body needs rest.`,
    vocabulary: [vocab('take a break', 'fazer uma pausa'), vocab('review your notes', 'revisar suas anotações'), vocab('all night', 'a noite toda'), vocab('body needs rest', 'o corpo precisa de descanso')],
    shadowing: [task('I feel very tired.'), task('I’m worried about my test tomorrow.'), task('I think you should take a break.'), task('You shouldn’t study all night.'), task('You should sleep early.')],
    dictationTasks: [task('Digite: I feel very tired.', 'I feel very tired.'), task('Digite: I think you should take a break.', 'I think you should take a break.'), task('Digite: You shouldn’t study all night.', 'You shouldn’t study all night.')],
    pronunciationChunks: [task('you should take a break', 'Conselho em bloco.'), task('shouldn’t study all night', 'Negativa com should.'), task('worried about my test', 'Sentimento + about.')],
    listeningComprehension: [q('How does B feel?', 'very tired', 'I feel very tired', '', ['very tired','excited','angry']), q('What is B worried about?', 'test tomorrow', 'worried about my test tomorrow', '', ['test tomorrow','dinner','money']), q('What should B do first?', 'take a break', 'you should take a break now', '', ['take a break','study all night','go out']), q('What shouldn’t B do?', 'study all night', 'you shouldn’t study all night', '', ['study all night','review notes','sleep early']), q('Why should B sleep early?', 'body needs rest', 'because your body needs rest', '', ['body needs rest','test is easy','friend invited him'])],
    oralProduction: task('Responda oralmente: dê 3 conselhos para alguém cansado antes de uma prova.'),
    selfAssessment: [task('Consegui identificar problema?'), task('Consegui ouvir should/shouldn’t?'), task('Consegui entender motivo com because?')],
    lessonRecap: ['Advice listening segue problema, sentimento, conselho e motivo.', 'Should dá conselho positivo.', 'Shouldn’t dá alerta.', 'Because explica o conselho.'],
    nextLessonBridge: 'Agora você vai praticar speaking dando conselhos simples.',
  }),

  createSpeakingLesson({
    ...common,
    id: 'A2-SPEAKING-015',
    order: 15,
    title: 'Give simple advice',
    objectives: ['Dar conselhos simples com should/shouldn’t.', 'Responder a sentimentos e problemas cotidianos.', 'Pedir conselho com What should I do?', 'Gravar fala curta de conselho com motivo.'],
    teacherOpening: 'Agora você vai falar como alguém que ajuda. Use: You should rest. You shouldn’t study all night. I think you should ask for help. What should I do?',
    whyItMatters: 'Você precisa dar conselhos em conversas reais sem parecer mandão. Should ajuda a soar natural e educado.',
    realLifeUseCases: ['Aconselhar amigo cansado.', 'Responder a problema de estudo.', 'Falar de saúde simples.', 'Dar conselho sobre dinheiro ou convites.', 'Pedir conselho.'],
    conceptExplanation: 'Monte sua fala em 3 partes: sentimento/problema, conselho com should, motivo com because. Exemplo: You look tired. You should take a break because you need rest.',
    mentalModel: { title: 'advice speaking = problem + should + because', summary: 'Mostre que entendeu e dê um conselho claro.', steps: ['You look...', 'You should...', 'You shouldn’t...', 'because...'] },
    stepByStep: [task('Repita o problema da pessoa.'), task('Dê conselho positivo.'), task('Dê um alerta com shouldn’t.'), task('Explique com because.'), task('Pergunte se precisa de ajuda.')],
    portugueseContrast: [task('I think you should suaviza o conselho.'), task('Não use should to.'), task('What should I do? é pergunta pronta.'), task('Maybe you should... é ainda mais suave.')],
    guidedDiscovery: [task('I feel tired → You should rest.'), task('I’m worried → You should talk to someone.'), task('I’m confused → You should ask a question.'), task('I’m bored → You should try something new.')],
    guidedBeforeQuiz: [task('Repita: What should I do?'), task('Repita: I think you should rest.'), task('Repita: You shouldn’t worry too much.'), task('Repita: Maybe you should ask for help.')],
    speakingSituation: 'Um amigo conta um problema e você precisa dar conselho simples.',
    modelPhrases: [phrase('What should I do?', 'O que eu deveria fazer?'), phrase('I think you should rest.', 'Acho que você deveria descansar.'), phrase('You shouldn’t study all night.', 'Você não deveria estudar a noite toda.'), phrase('Maybe you should talk to your teacher.', 'Talvez você devesse falar com seu professor.'), phrase('You should ask for help because this is important.', 'Você deveria pedir ajuda porque isso é importante.')],
    pronunciationChunks: [task('what should I do', 'Pergunta essencial.'), task('I think you should', 'Opinião + conselho.'), task('maybe you should', 'Conselho suave.'), task('you shouldn’t worry', 'Alerta suave.')],
    repeatAfterMe: [task('What should I do?'), task('You should take a break.'), task('You shouldn’t sleep late.'), task('Maybe you should ask for help.'), task('I think you should drink some water.')],
    substitutionDrills: [task('rest → study for thirty minutes', 'You should study for thirty minutes.'), task('sleep late → spend too much money', 'You shouldn’t spend too much money.'), task('teacher → manager', 'Maybe you should talk to your manager.')],
    guidedSpeaking: [task('Dê conselho para alguém cansado.'), task('Dê conselho para alguém preocupado com prova.'), task('Dê conselho para alguém confuso na aula.'), task('Dê conselho para alguém que quer gastar muito dinheiro.'), task('Peça conselho usando What should I do?')],
    recordingTasks: [task('Grave 5 conselhos com should.'), task('Grave 5 alertas com shouldn’t.'), task('Grave um diálogo de 8 linhas pedindo e dando conselho.')],
    freeSpeaking: task('Fale por até 60 segundos dando conselhos para alguém cansado, preocupado e confuso.'),
    feedbackChecklist: [task('Usei should + verbo base?'), task('Usei shouldn’t corretamente?'), task('Expliquei com because?'), task('Usei I think/maybe para suavizar?')],
    selfAssessment: [task('Consigo dar conselho?'), task('Consigo pedir conselho?'), task('Consigo falar sem should to?')],
    lessonRecap: ['Advice speaking usa should/shouldn’t.', 'I think/maybe suavizam conselho.', 'Because explica motivo.', 'What should I do? pede ajuda.'],
    nextLessonBridge: 'Agora você vai escrever conselhos com should.',
  }),

  createWritingLesson({
    ...common,
    id: 'A2-WRITING-015',
    order: 15,
    title: 'Write advice with should',
    objectives: ['Escrever conselho simples com should/shouldn’t.', 'Responder a um problema com tom educado.', 'Incluir motivo com because e sugestão alternativa.', 'Revisar erros comuns de should.'],
    teacherOpening: 'Nesta escrita, você vai responder a uma pessoa com problema. A estrutura é: I’m sorry you feel this way. I think you should... You shouldn’t... because... Maybe you can...',
    whyItMatters: 'Mensagens de conselho aparecem em conversa com amigos, escola, trabalho e suporte. Você precisa soar claro, útil e educado.',
    realLifeUseCases: ['Responder amigo cansado.', 'Aconselhar sobre estudo.', 'Escrever sugestão simples.', 'Dar opinião educada.', 'Explicar motivo do conselho.'],
    conceptExplanation: 'Um texto de conselho tem 4 partes: reconhecer o problema, dar conselho, dizer o que evitar, explicar motivo. Use should/shouldn’t + verbo base.',
    mentalModel: { title: 'advice message = empathy + advice + warning + reason', summary: 'Mostre compreensão e dê conselho prático.', steps: ['I’m sorry...', 'You should...', 'You shouldn’t...', 'because...'] },
    stepByStep: [task('Comece reconhecendo o problema.'), task('Use I think you should...'), task('Adicione um shouldn’t.'), task('Explique com because.'), task('Feche com uma frase de apoio.')],
    portugueseContrast: [task('I’m sorry não é só desculpa; pode significar sinto muito.'), task('Use should + verbo base.'), task('Because conecta motivo.'), task('Maybe you should suaviza conselho escrito.')],
    guidedDiscovery: [task('I’m sorry you feel tired mostra empatia.'), task('You should rest dá conselho.'), task('You shouldn’t study all night dá alerta.'), task('Because your body needs rest explica.')],
    guidedBeforeQuiz: [task('Modelo: I think you should take a break.'), task('Modelo: You shouldn’t study all night.'), task('Modelo: Maybe you should ask for help.'), task('Modelo: because your body needs rest.')],
    writingPurpose: 'Escrever uma mensagem curta de conselho em inglês A2.',
    modelText: `Hi Ana, I’m sorry you feel so tired. I think you should take a break now and review your notes later. You shouldn’t study all night because your body needs rest. Maybe you should sleep early and wake up earlier tomorrow.`,
    writingBlocks: [task('Empathy', 'I’m sorry you feel so tired.'), task('Advice', 'I think you should take a break.'), task('Warning', 'You shouldn’t study all night.'), task('Reason', 'because your body needs rest.'), task('Soft suggestion', 'Maybe you should sleep early.')],
    guidedSubstitution: [task('Troque tired por worried.'), task('Troque take a break por talk to your teacher.'), task('Troque study all night por worry too much.'), task('Troque body needs rest por this is important.')],
    grammarForWriting: [task('Use should + base verb.'), task('Use shouldn’t + base verb.'), task('Use because para motivo.'), task('Use maybe/I think para tom educado.'), task('Use frases curtas.')],
    checklist: [task('Reconheci o problema?'), task('Usei should?'), task('Usei shouldn’t?'), task('Expliquei com because?'), task('Evitei should to?'), task('Mantive tom educado?')],
    draftTask: task('Escreva uma resposta de 4 a 6 frases dando conselho para alguém cansado ou preocupado.'),
    revisionTask: task('Revise should/shouldn’t, verbo base, because e tom educado.'),
    commonMistakes: [mistake('You should to rest.', 'You should rest.', 'Sem to depois de should.'), mistake('He shoulds sleep.', 'He should sleep.', 'Should não muda com he/she.'), mistake('You don’t should worry.', 'You shouldn’t worry.', 'Negativa correta.'), mistake('Because you tired.', 'because you are tired.', 'Tired precisa be.')],
    productionTasks: [task('Escreva conselho para alguém cansado.'), task('Escreva conselho para alguém preocupado com prova.'), task('Escreva conselho para alguém que gasta muito dinheiro.'), task('Reescreva com tom mais educado usando maybe/I think.')],
    selfAssessment: [task('Consigo escrever conselho claro?'), task('Consigo usar should/shouldn’t?'), task('Consigo explicar motivo?')],
    lessonRecap: ['Advice writing começa com empatia.', 'Should dá conselho.', 'Shouldn’t dá alerta.', 'Because explica motivo.'],
    nextLessonBridge: 'A próxima parte do A2.5 vai entrar em obrigações com have to / don’t have to.',
  }),
]);

export const A2_DEEP_COMMUNICATION_TASKS_PART2_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(A2_DEEP_COMMUNICATION_TASKS_PART2.filter((lesson) => lesson.pillar === 'grammar')),
  vocabulary: Object.freeze(A2_DEEP_COMMUNICATION_TASKS_PART2.filter((lesson) => lesson.pillar === 'vocabulary')),
  reading: Object.freeze(A2_DEEP_COMMUNICATION_TASKS_PART2.filter((lesson) => lesson.pillar === 'reading')),
  listening: Object.freeze(A2_DEEP_COMMUNICATION_TASKS_PART2.filter((lesson) => lesson.pillar === 'listening')),
  speaking: Object.freeze(A2_DEEP_COMMUNICATION_TASKS_PART2.filter((lesson) => lesson.pillar === 'speaking')),
  writing: Object.freeze(A2_DEEP_COMMUNICATION_TASKS_PART2.filter((lesson) => lesson.pillar === 'writing')),
});
