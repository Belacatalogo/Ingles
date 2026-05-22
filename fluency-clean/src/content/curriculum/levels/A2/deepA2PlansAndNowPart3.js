import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'A2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['a2-3', 'plans-and-now', 'present-simple-vs-continuous', 'technology-phone', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }
function ex(text, translation, why = '', warning = '') { return { text, translation, why, warning }; }

export const A2_DEEP_PLANS_AND_NOW_PART3 = Object.freeze([
  createGrammarLesson({
    ...common,
    id: 'A2-GRAMMAR-010',
    order: 10,
    title: 'Present Simple vs Present Continuous',
    objectives: ['Diferenciar rotina geral e ação acontecendo agora.', 'Usar Present Simple para hábitos e fatos.', 'Usar Present Continuous para agora ou situação temporária.', 'Aplicar contraste em trabalho, estudo e tecnologia.'],
    teacherOpening: 'Agora você vai comparar duas ideias: rotina e agora. Present Simple fala do que geralmente acontece: I use my phone every day. Present Continuous fala do que está acontecendo agora ou temporariamente: I am using my phone now. Essa diferença é central no A2.',
    whyItMatters: 'Sem esse contraste, frases sobre rotina, trabalho, estudo e problemas de telefone ficam confusas. Você precisa dizer se algo é hábito ou se está acontecendo agora.',
    realLifeUseCases: ['Dizer rotina de estudo.', 'Explicar problema acontecendo agora.', 'Comparar horário normal com mudança temporária.', 'Falar de tecnologia no dia a dia.', 'Responder What do you usually do? e What are you doing now?'],
    conceptExplanation: 'Use Present Simple para hábitos, frequência e fatos: I study at night. She works on Mondays. Use Present Continuous para ações agora ou fases temporárias: I am studying now. She is working from home this week.',
    mentalModel: { title: 'usually vs now', summary: 'Usually = Present Simple. Now/this week = Present Continuous.', steps: ['I usually study at night.', 'I am studying now.', 'She works in an office.', 'She is working from home this week.'] },
    stepByStep: [task('Pergunte: é rotina/fato ou agora/temporário?'), task('Se for rotina, use Present Simple.'), task('Se for agora/temporário, use Present Continuous.'), task('Procure palavras de frequência ou tempo.'), task('Revise be + ing quando necessário.')],
    portugueseContrast: [task('Português muitas vezes usa presente para tudo; inglês separa rotina e agora.'), task('I study English = estudo inglês como hábito.'), task('I am studying English = estou estudando agora/temporariamente.'), task('Não diga I am usually study.')],
    guidedDiscovery: [task('Usually indica rotina.'), task('Now indica ação em andamento.'), task('This week indica situação temporária.'), task('Every day indica hábito.')],
    guidedBeforeQuiz: [task('Escolha: I usually ___ at night. (study/am studying)', 'study'), task('Escolha: I ___ now. (study/am studying)', 'am studying'), task('Corrija: I am usually work at night.', 'I usually work at night.')],
    grammarGoal: 'Escolher corretamente entre Present Simple e Present Continuous.',
    formationGuide: [task('Present Simple habit', 'I study English every day.'), task('Present Continuous now', 'I am studying English now.'), task('Present Simple fact/routine', 'She works in an office.'), task('Temporary change', 'She is working from home this week.')],
    whenToUse: [task('Present Simple: usually, always, sometimes, every day, on Mondays.'), task('Present Continuous: now, right now, today, this week, at the moment, these days.')],
    whenNotToUse: [task('Não use Present Continuous para todos os hábitos.'), task('Não use Present Simple quando quer dizer acontecendo agora.'), task('Não misture do/does com am/is/are em afirmativas.')],
    grammarTable: [
      { pattern: 'habit', example: 'I check my email every morning.', translation: 'Eu verifico meu e-mail toda manhã.' },
      { pattern: 'now', example: 'I am checking my email now.', translation: 'Estou verificando meu e-mail agora.' },
      { pattern: 'routine', example: 'He studies on weekends.', translation: 'Ele estuda aos fins de semana.' },
      { pattern: 'temporary', example: 'He is studying every night this month.', translation: 'Ele está estudando toda noite este mês.' }
    ],
    teacherExamples: [
      { english: 'I usually use Wi-Fi at home, but I am using mobile data today.', translation: 'Eu geralmente uso Wi-Fi em casa, mas estou usando dados móveis hoje.', why: 'Rotina vs hoje.' },
      { english: 'She works in an office, but she is working from home this week.', translation: 'Ela trabalha em um escritório, mas está trabalhando de casa esta semana.', why: 'Fato/rotina vs temporário.' },
      { english: 'I study English every day. Right now, I am reviewing vocabulary.', translation: 'Eu estudo inglês todos os dias. Agora, estou revisando vocabulário.', why: 'Hábito e ação atual.' }
    ],
    commonBrazilianMistakes: [mistake('I am usually study at night.', 'I usually study at night.', 'Usually pede Present Simple.'), mistake('I use my phone now.', 'I am using my phone now.', 'Now pede ação em andamento.'), mistake('She is work from home this week.', 'She is working from home this week.', 'Continuous precisa de -ing.'), mistake('He study every day.', 'He studies every day.', 'He/she/it no Present Simple ganha s.')],
    guidedPractice: [q('Qual frase combina Present Simple e Present Continuous corretamente?', 'I usually use Wi-Fi at home, but I am using mobile data today.', '', 'Usually indica hábito (Simple); today indica ação em progresso (Continuous).', ['I usually use Wi-Fi at home, but I am using mobile data today.', 'I usually am using Wi-Fi, but I use mobile data today.', 'I usually using Wi-Fi at home, but I am use data today.']), q('Escolha a frase que diferencia hábito de ação atual.', 'She works in an office, but she is working from home this week.', '', 'Works = hábito; is working = situação temporária agora.', ['She works in an office, but she is working from home this week.', 'She is works in an office, but she working from home this week.', 'She work in an office, but she is work from home this week.'])],
    controlledPractice: [task('Complete: I usually ___ at night. (study)', 'study'), task('Complete: I ___ now. (study)', 'am studying'), task('Complete: She ___ every day. (work)', 'works'), task('Complete: She ___ from home this week. (work)', 'is working')],
    errorCorrectionPractice: [task('Corrija: I am usually use my phone.', 'I usually use my phone.'), task('Corrija: He is check email now.', 'He is checking email now.'), task('Corrija: She work every morning.', 'She works every morning.')],
    transformationPractice: [task('Rotina: I am studying now → every day', 'I study every day.'), task('Agora: I use my phone every day → now', 'I am using my phone now.'), task('Temporário: She works in an office → this week/from home', 'She is working from home this week.')],
    translationPractice: [task('Eu geralmente estudo à noite.', 'I usually study at night.'), task('Estou estudando agora.', 'I am studying now.'), task('Ela trabalha de casa esta semana.', 'She is working from home this week.')],
    productionTasks: [task('Escreva 5 pares de frases: rotina vs agora.'), task('Descreva sua rotina normal e uma mudança temporária.'), task('Crie 5 frases sobre telefone/tecnologia usando os dois tempos.')],
    finalChecklist: [task('Há palavra de frequência?'), task('Há now/this week?'), task('Usei s em he/she/it no Simple?'), task('Usei be + ing no Continuous?')],
    selfAssessment: [task('Consigo separar rotina e agora?'), task('Consigo usar usually/now corretamente?'), task('Consigo evitar I am usually study?')],
    lessonRecap: ['Present Simple fala de rotina/fato.', 'Present Continuous fala de agora/temporário.', 'Usually/every day combinam com Simple.', 'Now/this week combinam com Continuous.'],
    nextLessonBridge: 'Agora você vai aplicar esse contraste em tecnologia e problemas de telefone.',
  }),

  createVocabularyLesson({
    ...common,
    id: 'A2-VOCABULARY-011',
    order: 11,
    title: 'Technology and phone problems',
    objectives: ['Aprender vocabulário de tecnologia e problemas de telefone.', 'Explicar bateria, internet, tela, app e senha.', 'Usar frases simples de suporte técnico.', 'Conectar problemas atuais com Present Continuous.'],
    teacherOpening: 'Technology and phone problems é um tema real do A2. Você vai falar de phone, battery, charger, screen, app, internet, Wi-Fi, mobile data, password, update, restart, freeze, work, broken e fix.',
    whyItMatters: 'Problemas de telefone e internet acontecem sempre. Você precisa explicar o que está acontecendo agora: My phone is not working. The app is freezing. The battery is low.',
    realLifeUseCases: ['Pedir ajuda com telefone.', 'Explicar app travando.', 'Falar de internet lenta.', 'Descrever problema de senha.', 'Entender suporte básico.'],
    conceptExplanation: 'Organize technology vocabulary em device, connection, app/account e problem. Device: phone, charger, screen, battery. Connection: Wi-Fi, internet, mobile data. Problem: slow, broken, not working, freezing, low battery.',
    mentalModel: { title: 'tech problem = device + issue + current action', summary: 'Diga o aparelho, o problema e o que acontece agora.', steps: ['my phone', 'is not working', 'the app is freezing', 'I can’t log in'] },
    stepByStep: [task('Nomeie o dispositivo/app.'), task('Diga o problema.'), task('Use is/are + not working/freezing se está acontecendo agora.'), task('Diga o que já tentou.'), task('Peça ajuda.')],
    portugueseContrast: [task('Battery low = bateria baixa.'), task('The app is freezing = o app está travando.'), task('Password = senha.'), task('Update = atualização/atualizar.')],
    guidedDiscovery: [task('Phone é device.'), task('Wi-Fi é connection.'), task('Password é account/security.'), task('Freezing é problema acontecendo agora.')],
    guidedBeforeQuiz: [task('My phone is not working.'), task('The app is freezing.'), task('The battery is low.'), task('I can’t log in.')],
    topicContext: 'Você vai explicar problemas simples de telefone, internet e aplicativos.',
    essentialWords: [vocab('phone', 'telefone/celular', 'My phone is not working.'), vocab('battery', 'bateria', 'The battery is low.'), vocab('charger', 'carregador', 'I need a charger.'), vocab('screen', 'tela', 'The screen is broken.'), vocab('app', 'aplicativo', 'The app is freezing.'), vocab('internet', 'internet', 'The internet is slow.'), vocab('Wi-Fi', 'Wi-Fi', 'The Wi-Fi is not working.'), vocab('mobile data', 'dados móveis', 'I am using mobile data today.'), vocab('password', 'senha', 'I forgot my password.'), vocab('update', 'atualização/atualizar', 'The app needs an update.'), vocab('restart', 'reiniciar', 'Restart your phone.'), vocab('freeze', 'travar', 'The app is freezing.'), vocab('slow', 'lento', 'The internet is slow.'), vocab('broken', 'quebrado', 'The screen is broken.'), vocab('fix', 'consertar', 'Can you fix it?'), vocab('log in', 'entrar/fazer login', 'I can’t log in.')],
    chunks: [{ chunk: 'my phone is not working', translation: 'meu celular não está funcionando', example: 'My phone is not working.' }, { chunk: 'the app is freezing', translation: 'o app está travando', example: 'The app is freezing.' }, { chunk: 'the battery is low', translation: 'a bateria está baixa', example: 'The battery is low.' }, { chunk: 'I can’t log in', translation: 'não consigo entrar/fazer login', example: 'I can’t log in.' }, { chunk: 'restart your phone', translation: 'reinicie seu celular', example: 'Restart your phone.' }],
    pronunciationFocus: { title: 'Foco sonoro', tips: ['Battery costuma soar BA-dder-y em fala natural.', 'Wi-Fi tem som claro de wai-fai.', 'Password tem stress em PASS.'] },
    dangerousConfusions: [task('App freezing é travar, não congelar literalmente.'), task('Log in é entrar em conta; turn on é ligar aparelho.'), task('Broken é quebrado; not working é não funcionando.'), task('Update pode ser substantivo e verbo.')],
    collocations: [task('low battery'), task('broken screen'), task('slow internet'), task('forgot my password'), task('restart the phone'), task('update the app'), task('log in to my account')],
    miniDialogues: [{ title: 'Phone problem', lines: ['A: What is the problem?', 'B: My phone is not working.', 'A: Is the battery low?', 'B: No. The app is freezing.'], focus: 'Explicar problema atual.' }],
    examples: [ex('I usually use Wi-Fi, but today I am using mobile data.', 'Eu geralmente uso Wi-Fi, mas hoje estou usando dados móveis.', 'Present Simple vs Continuous.'), ex('The app is freezing right now.', 'O app está travando agora.', 'Problema atual.'), ex('I forgot my password yesterday.', 'Esqueci minha senha ontem.', 'Passado + tecnologia.')],
    recognitionPractice: [task('Qual palavra é senha?', 'password'), task('Qual expressão é bateria baixa?', 'low battery'), task('Qual problema é app travando?', 'the app is freezing')],
    usagePractice: [task('Complete: My phone is not ___.', 'working'), task('Complete: The battery is ___.', 'low'), task('Complete: I can’t log ___.', 'in')],
    productionTasks: [task('Escreva 6 frases sobre problemas de telefone.'), task('Crie 3 pedidos de ajuda técnica.'), task('Crie um mini diálogo customer/support.')],
    spacedReview: [task('Revise battery/charger/screen/password amanhã.'), task('Crie 3 frases com not working/freezing/slow.')],
    selfAssessment: [task('Consigo explicar problema de telefone?'), task('Consigo falar de internet/app/senha?'), task('Consigo usar Present Continuous para problema atual?')],
    lessonRecap: ['Tech vocabulary ajuda a explicar problemas reais.', 'Use device + problem.', 'Not working/freezing/slow são chunks úteis.', 'Present Continuous descreve problema acontecendo agora.'],
    nextLessonBridge: 'Na Reading, você vai ler um chat de suporte sobre problema de telefone.',
  }),

  createReadingLesson({
    ...common,
    id: 'A2-READING-010',
    order: 10,
    title: 'A phone problem chat',
    objectives: ['Ler um chat simples sobre problema de telefone.', 'Identificar problema, tentativa de solução e orientação.', 'Reconhecer Present Continuous em problema atual.', 'Responder com evidência textual.'],
    teacherOpening: 'Nesta leitura, você vai ler um chat de suporte. O objetivo é entender qual problema está acontecendo, o que a pessoa já tentou e qual solução o suporte sugere.',
    whyItMatters: 'Chats de suporte são textos reais: curtos, diretos e cheios de instruções. Você precisa localizar problema e solução rapidamente.',
    realLifeUseCases: ['Ler suporte de aplicativo.', 'Explicar app travando.', 'Entender instrução de reiniciar/atualizar.', 'Falar de senha e login.', 'Resolver problema simples.'],
    conceptExplanation: 'Em tech support chat, procure problem, device/app, current action, tried solution e next step. Present Continuous aparece em frases como The app is freezing e I am trying to log in.',
    mentalModel: { title: 'support chat = problem + tried + next step', summary: 'Entenda o problema, o que tentou e a orientação.', steps: ['problem', 'device/app', 'tried', 'support instruction'] },
    stepByStep: [task('Leia para achar o problema principal.'), task('Marque aparelho/app.'), task('Procure o que já tentou.'), task('Procure a orientação do suporte.'), task('Responda com evidência.')],
    portugueseContrast: [task('Support = suporte/atendimento.'), task('Try again = tentar de novo.'), task('Restart = reiniciar.'), task('Update the app = atualizar o app.')],
    guidedDiscovery: [task('The app is freezing mostra problema atual.'), task('I restarted my phone mostra tentativa passada.'), task('Please update the app mostra orientação.')],
    guidedBeforeQuiz: [task('Procure problem.'), task('Procure already tried.'), task('Procure next step.'), task('Use evidência.')],
    readingPurpose: 'Entender chat curto de suporte técnico.',
    preReadingVocabulary: [vocab('support', 'suporte'), vocab('freezing', 'travando'), vocab('restart', 'reiniciar'), vocab('update', 'atualizar'), vocab('log in', 'fazer login'), vocab('password', 'senha')],
    readingStrategy: [task('Leia como troca de mensagens.'), task('Separe cliente e suporte.'), task('Procure verbos de problema.'), task('Copie evidência.')],
    mainText: `Customer: Hi. My phone is working, but the banking app is freezing. I am trying to log in, but it stops on the password screen.
Support: Did you restart your phone?
Customer: Yes, I restarted it this morning. I also checked my internet.
Support: Please update the app and try again. If it still freezes, send us a screenshot.
Customer: Okay, thank you.`,
    firstReadTask: task('Qual é o assunto geral?', 'Problema com app bancário travando.'),
    secondReadTasks: [task('O telefone está funcionando?', 'yes'), task('Qual app está travando?', 'banking app'), task('Onde ele para?', 'password screen'), task('O que o cliente já tentou?', 'restarted phone and checked internet')],
    evidenceQuestions: [q('What is freezing?', 'the banking app', 'the banking app is freezing', '', ['the banking app','the phone','the charger']), q('What is the customer trying to do?', 'log in', 'I am trying to log in', '', ['log in','buy a phone','restart Wi-Fi']), q('Áudio da aula — where does it stop?', 'on the password screen', 'it stops on the password screen', '', ['password screen','home screen','camera']), q('What did the customer already do?', 'restarted the phone and checked internet', 'I restarted it... I also checked my internet.', '', ['restarted and checked internet','updated app','changed password']), q('What should the customer do next?', 'update the app and try again', 'Please update the app and try again.', '', ['update the app','buy a charger','delete account'])],
    contextVocabularyTasks: [task('Still freezes significa ainda trava.'), task('Screenshot é captura de tela.'), task('Password screen é tela de senha.')],
    guidedSummary: task('Complete: The ___ app is freezing. The customer is trying to ___ in. Support says to ___ the app and try again.', '', 'banking / log / update'),
    connectedProduction: task('Escreva 4 frases explicando um problema de app.'),
    selfAssessment: [task('Consigo identificar problema técnico?'), task('Consigo entender tentativa anterior?'), task('Consigo entender próxima instrução?')],
    lessonRecap: ['Support chat tem problema, tentativa e solução.', 'Present Continuous mostra problema atual.', 'Past Simple mostra o que já tentou.', 'Update/restart/try again são chunks úteis.'],
    nextLessonBridge: 'No Listening, você vai ouvir atendimento de suporte sobre problema de telefone.',
  }),

  createListeningLesson({
    ...common,
    id: 'A2-LISTENING-010',
    order: 10,
    title: 'Phone problem support',
    objectives: ['Ouvir diálogo de suporte sobre problema de telefone.', 'Identificar problema, aparelho, tentativa e solução.', 'Reconhecer app freezing, low battery, restart e update.', 'Praticar dictation e shadowing de suporte.'],
    teacherOpening: 'Nesta escuta, você vai ouvir uma conversa com suporte técnico. Primeiro descubra o problema. Depois, o que a pessoa já tentou e a orientação final.',
    whyItMatters: 'Suporte por telefone ou chat é comum. Você precisa explicar o problema e entender instruções curtas sem se perder.',
    realLifeUseCases: ['Ligar para suporte.', 'Explicar app travando.', 'Falar de login/senha.', 'Entender reiniciar/atualizar.', 'Pedir ajuda com internet.'],
    conceptExplanation: 'Ouça por blocos: My app is freezing. I can’t log in. Did you restart your phone? Please update the app. Try again. Esses blocos resolvem suporte básico.',
    mentalModel: { title: 'support listening = problem + question + instruction', summary: 'Ouça problema, pergunta do suporte e instrução.', steps: ['problem', 'what tried?', 'restart?', 'update', 'try again'] },
    stepByStep: [task('Primeira escuta: problema principal.'), task('Segunda escuta: pergunta do suporte.'), task('Terceira etapa: solução sugerida.'), task('Leia transcript.'), task('Faça dictation.'), task('Faça shadowing.')],
    portugueseContrast: [task('Did you restart? pergunta passado.'), task('Please update the app é instrução.'), task('Try again = tente novamente.')],
    guidedDiscovery: [task('The app is freezing mostra problema atual.'), task('I restarted it mostra tentativa passada.'), task('Update and try again mostra solução.')],
    guidedBeforeQuiz: [task('Primeira escuta: qual problema?'), task('Segunda escuta: qual solução?')],
    listeningPreparation: [task('Não leia transcript antes da primeira escuta.'), task('Prepare: app, freezing, log in, restart, update, try again.'), task('Objetivo: problema + instrução.')],
    keyWordsToHear: [vocab('app','aplicativo'), vocab('freezing','travando'), vocab('log in','fazer login'), vocab('restart','reiniciar'), vocab('update','atualizar'), vocab('try again','tentar de novo')],
    audioScript: `Support: Hello. How can I help you?
Customer: My phone is okay, but the app is freezing.
Support: Are you trying to log in?
Customer: Yes. It stops on the password screen.
Support: Did you restart your phone?
Customer: Yes, I restarted it this morning.
Support: Please update the app and try again.
Customer: Okay. Thank you.`,
    firstListenTasks: [task('Sem transcript: o telefone está quebrado?', 'no'), task('Sem transcript: o app está travando?', 'yes')],
    secondListenTasks: [task('Onde o app para?', 'password screen'), task('O cliente reiniciou o telefone?', 'yes'), task('Quando reiniciou?', 'this morning'), task('O que o suporte recomenda?', 'update the app and try again')],
    transcript: `Support: Hello. How can I help you?
Customer: My phone is okay, but the app is freezing.
Support: Are you trying to log in?
Customer: Yes. It stops on the password screen.
Support: Did you restart your phone?
Customer: Yes, I restarted it this morning.
Support: Please update the app and try again.
Customer: Okay. Thank you.`,
    vocabulary: [vocab('how can I help you?', 'como posso ajudar?'), vocab('is okay', 'está ok'), vocab('stops', 'para'), vocab('this morning', 'esta manhã')],
    shadowing: [task('How can I help you?'), task('The app is freezing.'), task('Are you trying to log in?'), task('It stops on the password screen.'), task('Please update the app and try again.')],
    dictationTasks: [task('Digite: The app is freezing.', 'The app is freezing.'), task('Digite: Are you trying to log in?', 'Are you trying to log in?'), task('Digite: Please update the app and try again.', 'Please update the app and try again.')],
    pronunciationChunks: [task('app is freezing', 'Conecte app-is.'), task('trying to log in', 'Bloco de ação.'), task('update the app', 'Instrução curta.')],
    listeningComprehension: [q('What is the problem?', 'the app is freezing', 'the app is freezing', '', ['the app is freezing','the phone is broken','the charger is missing']), q('Phone problem support — Where does it stop?', 'password screen', 'It stops on the password screen.', '', ['password screen','camera','home page']), q('Did the customer restart the phone?', 'yes, it does', 'Yes, I restarted it this morning.', '', ['yes, it does','no, it does not','not mentioned in the audio']), q('Áudio da aula — Phone problem support — what should the customer do?', 'update the app and try again', 'Please update the app and try again.', '', ['update app','buy new phone','change charger'])],
    oralProduction: task('Pratique explicar um problema de app e responder perguntas do suporte.'),
    selfAssessment: [task('Consegui ouvir problema?'), task('Consegui ouvir tentativa anterior?'), task('Consigo repetir instruções de suporte?')],
    lessonRecap: ['Phone support listening segue problema e solução.', 'Freezing/log in/password são palavras-chave.', 'Did you restart? verifica tentativa passada.', 'Update and try again é instrução comum.'],
    nextLessonBridge: 'No Speaking, você vai explicar um problema de telefone.',
  }),

  createSpeakingLesson({
    ...common,
    id: 'A2-SPEAKING-011',
    order: 11,
    title: 'Explain a phone problem',
    objectives: ['Explicar problema de telefone ou app.', 'Dizer o que está acontecendo agora.', 'Dizer o que já tentou no passado.', 'Gravar diálogo curto de suporte técnico.'],
    teacherOpening: 'Nesta fala, você vai explicar um problema técnico. Use frases simples: My phone is not working. The app is freezing. I can’t log in. I restarted my phone, but it still doesn’t work.',
    whyItMatters: 'Explicar problema técnico é muito útil. Você precisa ser claro, dizer o problema atual e mencionar o que já tentou.',
    realLifeUseCases: ['Falar com suporte.', 'Explicar app travando.', 'Falar que esqueceu senha.', 'Pedir ajuda com Wi-Fi.', 'Descrever tela quebrada/bateria baixa.'],
    conceptExplanation: 'Organize sua fala em 4 partes: device/app, problem now, what you tried, request. Exemplo: My banking app is freezing. I am trying to log in. I restarted my phone this morning. Can you help me?',
    mentalModel: { title: 'tech speaking em 4 partes', summary: 'Aparelho, problema, tentativa e pedido.', steps: ['My phone/app...', 'is freezing/not working', 'I restarted...', 'Can you help me?'] },
    stepByStep: [task('Diga o aparelho ou app.'), task('Diga o problema atual.'), task('Diga o que já tentou.'), task('Diga o que acontece agora.'), task('Peça ajuda.'), task('Grave versão final.')],
    portugueseContrast: [task('Use My phone is not working, não My phone not works.'), task('Use The app is freezing para “está travando”.'), task('Use I can’t log in para “não consigo entrar”.')],
    guidedDiscovery: [task('What is the problem? pede problema.'), task('Did you restart it? pergunta tentativa.'), task('Can you help me? pede ajuda.')],
    guidedBeforeQuiz: [task('Repita: My phone is not working.'), task('Repita: The app is freezing.'), task('Repita: I can’t log in.'), task('Repita: I restarted my phone this morning.')],
    speakingSituation: 'Você está falando com suporte técnico sobre um problema de telefone ou app.',
    modelPhrases: [phrase('My phone is not working.', 'Meu celular não está funcionando.'), phrase('The app is freezing.', 'O app está travando.'), phrase('I can’t log in.', 'Não consigo entrar.'), phrase('I restarted my phone this morning.', 'Reiniciei meu celular esta manhã.'), phrase('Can you help me?', 'Você pode me ajudar?')],
    pronunciationChunks: [task('not working', 'Problema em bloco.'), task('app is freezing', 'Conecte app-is.'), task('can’t log in', 'Chunk essencial.')],
    repeatAfterMe: [task('My phone is not working.'), task('The app is freezing.'), task('I am trying to log in.'), task('I restarted it this morning.'), task('Can you help me?')],
    substitutionDrills: [task('app freezing → internet slow', 'The internet is slow.'), task('phone → tablet', 'My tablet is not working.'), task('password → email', 'I can’t log in to my email.')],
    guidedSpeaking: [task('Explique o problema.'), task('Diga se é telefone, app ou internet.'), task('Diga o que já tentou.'), task('Peça ajuda.'), task('Responda uma pergunta do suporte.')],
    recordingTasks: [task('Grave 5 frases de problema técnico.'), task('Grave diálogo customer/support de 8 linhas.'), task('Grave versão final de 60 segundos explicando problema e tentativa.')],
    freeSpeaking: task('Simule uma conversa de suporte técnico por até 60 segundos.'),
    feedbackChecklist: [task('Digo o aparelho/app?'), task('Digo problema atual com Present Continuous ou not working?'), task('Digo o que já tentei?'), task('Peço ajuda claramente?')],
    selfAssessment: [task('Consigo explicar problema técnico?'), task('Consigo dizer o que tentei?'), task('Consigo pedir ajuda em suporte?')],
    lessonRecap: ['Tech speaking precisa de clareza.', 'Diga aparelho/app, problema e tentativa.', 'Present Continuous mostra problema atual.', 'Past Simple mostra o que já tentou.'],
    nextLessonBridge: 'Na Writing, você vai escrever uma mensagem sobre problema de telefone.',
  }),

  createWritingLesson({
    ...common,
    id: 'A2-WRITING-011',
    order: 11,
    title: 'Write about a phone problem',
    objectives: ['Escrever mensagem curta sobre problema de telefone/app.', 'Explicar problema atual e tentativa anterior.', 'Pedir ajuda com clareza.', 'Revisar ordem, pontuação e tom educado.'],
    teacherOpening: 'Agora você vai escrever uma mensagem de suporte técnico. Ela deve ser curta e clara: Hi, my banking app is freezing. I am trying to log in, but it stops on the password screen. I restarted my phone this morning. Can you help me?',
    whyItMatters: 'Mensagens de suporte precisam de informação clara. Você deve dizer o problema, o que está acontecendo agora, o que já tentou e o que precisa.',
    realLifeUseCases: ['Abrir chamado de suporte.', 'Mandar mensagem sobre app travando.', 'Explicar problema de login.', 'Pedir ajuda com internet ou senha.', 'Enviar detalhe técnico simples.'],
    conceptExplanation: 'Uma phone problem message A2 tem 5 partes: greeting, device/app, current problem, tried solution, request. Use Present Continuous para agora e Past Simple para o que já tentou.',
    mentalModel: { title: 'support message = problem + tried + help', summary: 'Diga o problema, o que tentou e peça ajuda.', steps: ['Hi', 'My app is...', 'I am trying...', 'I restarted...', 'Can you help me?'] },
    stepByStep: [task('Comece com Hi/Hello.'), task('Diga o app/aparelho.'), task('Explique o problema atual.'), task('Diga o que já tentou.'), task('Peça ajuda.'), task('Revise pontuação.')],
    portugueseContrast: [task('Não escreva “my app is with problem”.'), task('Use My app is not working / freezing.'), task('Use I can’t log in.'), task('Use I restarted... para tentativa passada.')],
    guidedDiscovery: [task('The app is freezing mostra problema atual.'), task('I restarted my phone mostra tentativa.'), task('Can you help me? fecha pedido.')],
    guidedBeforeQuiz: [task('Modelo: Hi, my app is freezing.'), task('Modelo: I am trying to log in.'), task('Modelo: I restarted my phone this morning.'), task('Modelo: Can you help me?')],
    writingPurpose: 'Escrever mensagem clara para suporte técnico.',
    modelText: `Hi, my banking app is freezing. I am trying to log in, but it stops on the password screen. I restarted my phone this morning, and I checked my internet. It still doesn't work. Can you help me?`,
    writingBlocks: [task('Greeting', 'Hi,'), task('Problem', 'My banking app is freezing.'), task('Current action', 'I am trying to log in.'), task('Tried solution', 'I restarted my phone this morning.'), task('Extra detail', 'I checked my internet.'), task('Request', 'Can you help me?')],
    guidedSubstitution: [task('Troque banking app por email app.'), task('Troque freezing por not working.'), task('Troque password screen por login screen.'), task('Troque restarted por updated.')],
    grammarForWriting: [task('Use Present Continuous para problema atual.'), task('Use Past Simple para tentativa anterior.'), task('Use but para contraste.'), task('Use still para ainda.'), task('Use ? em pedido/pergunta.')],
    checklist: [task('Digo app/aparelho?'), task('Explico problema atual?'), task('Digo o que já tentei?'), task('Peço ajuda?'), task('Revisei pontuação?')],
    draftTask: task('Escreva uma mensagem de suporte de 5 a 6 frases.'),
    revisionTask: task('Revise problema, tentativa, pedido e pontuação.'),
    commonMistakes: [mistake('My app has problem.', 'My app has a problem. / My app is not working.', 'Falta artigo ou chunk mais natural.'), mistake('I am try to log in.', 'I am trying to log in.', 'Continuous precisa de -ing.'), mistake('Can you help me.', 'Can you help me?', 'Pergunta precisa de ?')],
    productionTasks: [task('Escreva mensagem sobre app travando.'), task('Escreva mensagem sobre internet lenta.'), task('Reescreva com o que você já tentou.')],
    selfAssessment: [task('Consigo escrever para suporte?'), task('Consigo explicar problema atual?'), task('Consigo mencionar tentativa anterior?')],
    lessonRecap: ['Phone problem writing precisa de estrutura clara.', 'Present Continuous mostra o problema atual.', 'Past Simple mostra tentativa anterior.', 'Can you help me? fecha o pedido.'],
    nextLessonBridge: 'Na próxima parte do A2.3, você vai trabalhar planos com going to e problemas de casa.',
  }),
]);

export const A2_DEEP_PLANS_AND_NOW_PART3_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(A2_DEEP_PLANS_AND_NOW_PART3.filter((lesson) => lesson.pillar === 'grammar')),
  vocabulary: Object.freeze(A2_DEEP_PLANS_AND_NOW_PART3.filter((lesson) => lesson.pillar === 'vocabulary')),
  reading: Object.freeze(A2_DEEP_PLANS_AND_NOW_PART3.filter((lesson) => lesson.pillar === 'reading')),
  listening: Object.freeze(A2_DEEP_PLANS_AND_NOW_PART3.filter((lesson) => lesson.pillar === 'listening')),
  speaking: Object.freeze(A2_DEEP_PLANS_AND_NOW_PART3.filter((lesson) => lesson.pillar === 'speaking')),
  writing: Object.freeze(A2_DEEP_PLANS_AND_NOW_PART3.filter((lesson) => lesson.pillar === 'writing')),
});
