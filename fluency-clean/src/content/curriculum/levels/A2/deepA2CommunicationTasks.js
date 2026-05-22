import { createGrammarLesson, createVocabularyLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'A2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['a2-5', 'communication-tasks', 'invitations', 'requests', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }
function ex(text, translation, why = '', warning = '') { return { text, translation, why, warning }; }

export const A2_DEEP_COMMUNICATION_TASKS = Object.freeze([
  createGrammarLesson({
    ...common,
    id: 'A2-GRAMMAR-013',
    order: 13,
    title: 'Would like / want / need',
    objectives: ['Diferenciar would like, want e need.', 'Fazer pedidos e preferências com educação.', 'Usar would like + noun e would like to + verb.', 'Aplicar want/need em situações práticas sem soar rude.'],
    teacherOpening: 'A2.5 começa com comunicação real. Want é direto: I want coffee. Need fala necessidade: I need help. Would like é mais educado: I would like some coffee. Para verbo, use would like to: I would like to order.',
    whyItMatters: 'Você usa essas estruturas em restaurante, loja, hotel, convites, pedidos de ajuda e mensagens. Would like deixa sua fala mais educada.',
    realLifeUseCases: ['Pedir comida no restaurante.', 'Pedir ajuda em loja.', 'Dizer preferência.', 'Fazer convite educado.', 'Explicar necessidade simples.'],
    conceptExplanation: 'Use want quando for direto ou informal. Use need quando algo é necessário. Use would like para pedidos, ofertas e preferências educadas. Estrutura: I would like + noun. I would like to + verb. Would you like + noun/to + verb? para oferecer ou convidar.',
    mentalModel: { title: 'want = quero / need = preciso / would like = gostaria', summary: 'Escolha pela intenção e pelo nível de educação.', steps: ['I want a coffee.', 'I need help.', 'I would like a coffee.', 'Would you like to join us?'] },
    stepByStep: [task('Identifique se é desejo, necessidade ou pedido educado.'), task('Desejo direto: want.'), task('Necessidade: need.'), task('Pedido educado: would like.'), task('Antes de verbo, use to.'), task('Em pergunta, use Would you like...?')],
    portugueseContrast: [task('Would like equivale a gostaria, não a gostaria de forma literal com of.'), task('Não diga I would like order; diga I would like to order.'), task('Need pode ser necessidade real, não preferência.'), task('Want pode soar direto demais em atendimento.')],
    guidedDiscovery: [task('I want pizza é direto.'), task('I need water é necessidade.'), task('I would like some water é educado.'), task('Would you like to come? é convite.')],
    guidedBeforeQuiz: [task('Complete: I would like ___ coffee.', 'some/a'), task('Complete: I would like ___ order.', 'to'), task('Complete: I ___ help. (necessidade)', 'need')],
    grammarGoal: 'Fazer pedidos, preferências e necessidades com naturalidade A2.',
    formationGuide: [task('want + noun', 'I want a sandwich.'), task('want to + verb', 'I want to go home.'), task('need + noun', 'I need help.'), task('need to + verb', 'I need to study.'), task('would like + noun', 'I would like some water.'), task('would like to + verb', 'I would like to order.')],
    whenToUse: [task('Would like: atendimento, convite, pedido educado.'), task('Want: desejo direto/informal.'), task('Need: necessidade prática.'), task('Would you like: oferta ou convite.')],
    whenNotToUse: [task('Não use want quando precisa soar educado em restaurante/loja.'), task('Não esqueça to antes de verbo depois de would like.'), task('Não use would like to + noun.')],
    grammarTable: [
      { pattern: 'would like + noun', example: 'I would like a table for two.', translation: 'Gostaria de uma mesa para dois.' },
      { pattern: 'would like to + verb', example: 'I would like to order.', translation: 'Gostaria de fazer o pedido.' },
      { pattern: 'need + noun', example: 'I need some help.', translation: 'Preciso de ajuda.' },
      { pattern: 'want to + verb', example: 'I want to go home.', translation: 'Quero ir para casa.' }
    ],
    teacherExamples: [
      { english: 'I would like to book a room for Friday.', translation: 'Gostaria de reservar um quarto para sexta.', why: 'Pedido educado com verbo.' },
      { english: 'We need more information about the price.', translation: 'Precisamos de mais informações sobre o preço.', why: 'Need expressa necessidade.' },
      { english: 'Would you like to have dinner with us?', translation: 'Você gostaria de jantar conosco?', why: 'Convite educado.' }
    ],
    commonBrazilianMistakes: [mistake('I would like order.', 'I would like to order.', 'Antes de verbo, use to.'), mistake('I need to a water.', 'I need some water. / I need a bottle of water.', 'Need to pede verbo; need + noun não usa to.'), mistake('I want you help me.', 'I want you to help me. / I need your help.', 'Estrutura avançada; no A2 prefira I need your help.'), mistake('Would you like come?', 'Would you like to come?', 'Falta to antes de verbo.')],
    controlledPractice: [task('Complete: I would like ___ coffee.', 'some/a'), task('Complete: I would like ___ speak to the manager.', 'to'), task('Complete: I need ___ help.', 'some'), task('Complete: Would you like ___ join us?', 'to')],
    errorCorrectionPractice: [task('Corrija: I would like buy this.', 'I would like to buy this.'), task('Corrija: I need to information.', 'I need information. / I need some information.'), task('Corrija: Would you like a come?', 'Would you like to come?')],
    transformationPractice: [task('Mais educado: I want a coffee.', 'I would like a coffee.'), task('Mais educado: I want to order.', 'I would like to order.'), task('Necessidade: I have no information.', 'I need information.')],
    translationPractice: [task('Gostaria de pedir uma água.', 'I would like to order some water.'), task('Preciso de ajuda.', 'I need help.'), task('Você gostaria de vir conosco?', 'Would you like to come with us?')],
    productionTasks: [task('Escreva 6 pedidos educados com would like.'), task('Escreva 5 necessidades com need.'), task('Crie 4 convites com Would you like to...?')],
    finalChecklist: [task('É pedido educado? use would like.'), task('Tem verbo depois? use to.'), task('É necessidade? use need.'), task('É convite? Would you like to...?')],
    selfAssessment: [task('Consigo pedir educadamente?'), task('Consigo diferenciar want e need?'), task('Consigo fazer convite com would like?')],
    lessonRecap: ['Want é direto.', 'Need é necessidade.', 'Would like é educado.', 'Would like to vem antes de verbo.'],
    nextLessonBridge: 'Agora você vai aprender vocabulário de convites e planos sociais.',
  }),

  createVocabularyLesson({
    ...common,
    id: 'A2-VOCABULARY-017',
    order: 17,
    title: 'Invitations and social plans',
    objectives: ['Aprender vocabulário de convites e planos sociais.', 'Fazer, aceitar e recusar convites simples.', 'Usar expressões de disponibilidade e desculpa.', 'Preparar listening, speaking e writing de convite.'],
    teacherOpening: 'Invitations and social plans é comunicação real: invite, join, meet, come over, go out, have dinner, free, busy, maybe, sure, sorry, I can’t, another time.',
    whyItMatters: 'Você precisa combinar coisas simples: sair, estudar, jantar, visitar alguém, recusar com educação e sugerir outro horário.',
    realLifeUseCases: ['Convidar amigo para jantar.', 'Aceitar plano social.', 'Recusar por estar ocupado.', 'Sugerir outro dia.', 'Confirmar horário e lugar.'],
    conceptExplanation: 'Um convite simples tem ação + tempo + lugar: Would you like to have dinner on Saturday? Para aceitar: Sure, I’d love to. Para recusar: Sorry, I can’t. I’m busy. Maybe another time.',
    mentalModel: { title: 'invitation = ask + answer + details', summary: 'Convide, responda e confirme detalhes.', steps: ['Would you like to...?', 'Sure / Sorry', 'time', 'place', 'confirmation'] },
    stepByStep: [task('Escolha a atividade.'), task('Use Would you like to...? ou Do you want to...?'), task('Adicione dia/horário.'), task('Aceite ou recuse educadamente.'), task('Confirme detalhes.')],
    portugueseContrast: [task('I’m free = estou livre/disponível.'), task('I’m busy = estou ocupado.'), task('Maybe another time = talvez outra hora.'), task('I’d love to = adoraria.')],
    guidedDiscovery: [task('Would you like to join us? é convite educado.'), task('Sure aceita.'), task('Sorry, I can’t recusa.'), task('Another time sugere futuro.')],
    guidedBeforeQuiz: [task('Would you like to join us?'), task('Sure, I’d love to.'), task('Sorry, I can’t.'), task('Maybe another time.')],
    topicContext: 'Você vai combinar planos sociais simples com educação.',
    essentialWords: [vocab('invite', 'convidar', 'I want to invite you.'), vocab('join', 'juntar-se/participar', 'Would you like to join us?'), vocab('meet', 'encontrar', 'Let’s meet at 7.'), vocab('come over', 'vir em casa', 'Would you like to come over?'), vocab('go out', 'sair', 'Do you want to go out?'), vocab('have dinner', 'jantar', 'Would you like to have dinner?'), vocab('free', 'livre/disponível', 'Are you free on Saturday?'), vocab('busy', 'ocupado', 'I’m busy tonight.'), vocab('maybe', 'talvez', 'Maybe another time.'), vocab('sure', 'claro', 'Sure, I’d love to.'), vocab('sorry', 'desculpa', 'Sorry, I can’t.'), vocab('another time', 'outra hora', 'Maybe another time.')],
    chunks: [{ chunk: 'Are you free on Saturday?', translation: 'Você está livre no sábado?', example: 'Are you free on Saturday?' }, { chunk: 'Would you like to join us?', translation: 'Você gostaria de se juntar a nós?', example: 'Would you like to join us?' }, { chunk: 'Sure, I’d love to', translation: 'Claro, eu adoraria', example: 'Sure, I’d love to.' }, { chunk: 'Sorry, I can’t', translation: 'Desculpa, não posso', example: 'Sorry, I can’t.' }, { chunk: 'Maybe another time', translation: 'Talvez outra hora', example: 'Maybe another time.' }],
    pronunciationFocus: { title: 'Foco sonoro', tips: ['Would you pode soar junto em fala natural.', 'I’d love to = aid luhv tu.', 'Busy soa BI-zi.'] },
    dangerousConfusions: [task('Actually não significa atualmente; significa na verdade.'), task('Meet é encontrar; know é conhecer/saber.'), task('Free pode ser livre ou grátis pelo contexto.'), task('Go out é sair para lazer.')],
    collocations: [task('invite someone'), task('join us'), task('meet at seven'), task('have dinner'), task('be free'), task('be busy'), task('another time')],
    miniDialogues: [{ title: 'Invitation', lines: ['A: Are you free on Saturday?', 'B: I think so. Why?', 'A: Would you like to have dinner with us?', 'B: Sure, I’d love to.'], focus: 'Convite e aceitação.' }, { title: 'Refusal', lines: ['A: Do you want to go out tonight?', 'B: Sorry, I can’t. I’m busy.', 'A: No problem. Maybe another time.', 'B: Sure.'], focus: 'Recusa educada.' }],
    examples: [ex('Would you like to join us for dinner?', 'Você gostaria de jantar conosco?', 'Convite educado.'), ex('I’m sorry, I can’t. I need to work.', 'Desculpa, não posso. Preciso trabalhar.', 'Recusa com motivo.'), ex('Maybe another time. I’m free on Sunday.', 'Talvez outra hora. Estou livre no domingo.', 'Sugestão alternativa.')],
    recognitionPractice: [{ question: 'Invitations and social plans — qual vocabulário desta aula significa "convidar"?', options: ['invite', 'join', 'meet'], answer: 'invite', explanation: 'invite = convidar; vocabulário trabalhado nesta aula de Invitations and social plans.' }, task('Qual expressão aceita convite?', 'Sure, I’d love to.'), task('Qual expressão recusa educadamente?', 'Sorry, I can’t.'), task('Qual expressão sugere outro momento?', 'Maybe another time.')],
    usagePractice: [task('Complete: Are you ___ on Saturday?', 'free'), task('Complete: Would you like to ___ us?', 'join'), task('Complete: Sorry, I ___.', 'can’t')],
    productionTasks: [task('Escreva 5 convites.'), task('Escreva 3 aceitações e 3 recusas.'), task('Crie diálogo curto com convite, resposta e horário.')],
    spacedReview: [task('Revise free/busy/join/another time amanhã.'), task('Grave 3 convites com Would you like to...?')],
    selfAssessment: [task('Consigo fazer convite?'), task('Consigo aceitar?'), task('Consigo recusar com educação?')],
    lessonRecap: ['Convites precisam de atividade, tempo e resposta.', 'Would you like to é educado.', 'Sure, I’d love to aceita.', 'Sorry, I can’t recusa com educação.'],
    nextLessonBridge: 'Agora você vai ouvir pessoas aceitando e recusando convites.',
  }),

  createListeningLesson({
    ...common,
    id: 'A2-LISTENING-013',
    order: 13,
    title: 'Accepting and refusing invitations',
    objectives: ['Ouvir convites simples.', 'Identificar aceitação, recusa, motivo e alternativa.', 'Reconhecer would like to, free, busy, another time.', 'Praticar dictation e shadowing de respostas sociais.'],
    teacherOpening: 'Nesta escuta, você vai ouvir convites e respostas. O foco não é só entender “sim” ou “não”, mas também motivo, horário e alternativa.',
    whyItMatters: 'Na vida real, as pessoas não respondem só yes/no. Elas dizem que estão ocupadas, sugerem outro dia ou confirmam detalhes.',
    realLifeUseCases: ['Entender convite para jantar.', 'Ouvir recusa educada.', 'Confirmar horário.', 'Sugerir outro dia.', 'Responder sem parecer rude.'],
    conceptExplanation: 'Ouça chunks inteiros: Are you free...? Would you like to...? Sure, I’d love to. Sorry, I can’t. I’m busy. Maybe another time. How about Sunday?',
    mentalModel: { title: 'listen for response type', summary: 'Identifique convite, resposta e motivo.', steps: ['invitation', 'accept/refuse', 'reason', 'alternative', 'time'] },
    stepByStep: [task('Primeira escuta: aceitou ou recusou?'), task('Segunda escuta: motivo.'), task('Terceira etapa: alternativa/horário.'), task('Leia transcript.'), task('Faça dictation.'), task('Faça shadowing.')],
    portugueseContrast: [task('I’d love to é aceitação forte e educada.'), task('I can’t não é grosso se acompanhado de sorry/motivo.'), task('How about Sunday? sugere alternativa.')],
    guidedDiscovery: [task('Would you like to...? inicia convite.'), task('Sure sinaliza aceitação.'), task('Sorry sinaliza recusa.'), task('How about...? oferece alternativa.')],
    guidedBeforeQuiz: [task('Primeira escuta: pessoa aceita o primeiro convite?'), task('Segunda escuta: por que recusa?')],
    listeningPreparation: [task('Não leia transcript antes da primeira escuta.'), task('Prepare: free, busy, would like, I’d love to, another time.'), task('Objetivo: resposta + motivo + alternativa.')],
    keyWordsToHear: [vocab('free','livre'), vocab('busy','ocupado'), vocab('I’d love to','adoraria'), vocab('I can’t','não posso'), vocab('How about','que tal')],
    audioScript: `A: Are you free on Saturday night?
B: I’m not sure. Why?
A: Would you like to have dinner with us?
B: Sorry, I can’t. I need to work on Saturday.
A: No problem. How about Sunday afternoon?
B: Sunday is better. Sure, I’d love to.
A: Great. Let’s meet at four.`,
    firstListenTasks: [task('Sem transcript: B aceita sábado?', 'no'), task('Sem transcript: B aceita domingo?', 'yes')],
    secondListenTasks: [task('Qual é o convite?', 'have dinner'), task('Por que B não pode sábado?', 'needs to work'), task('Qual alternativa?', 'Sunday afternoon'), task('Que horas vão se encontrar?', 'at four')],
    transcript: `A: Are you free on Saturday night?
B: I’m not sure. Why?
A: Would you like to have dinner with us?
B: Sorry, I can’t. I need to work on Saturday.
A: No problem. How about Sunday afternoon?
B: Sunday is better. Sure, I’d love to.
A: Great. Let’s meet at four.`,
    vocabulary: [vocab('I’m not sure', 'não tenho certeza'), vocab('No problem', 'sem problema'), vocab('Sunday is better', 'domingo é melhor'), vocab('Let’s meet', 'vamos nos encontrar')],
    shadowing: [task('Are you free on Saturday night?'), task('Would you like to have dinner with us?'), task('Sorry, I can’t.'), task('How about Sunday afternoon?'), task('Sure, I’d love to.')],
    dictationTasks: [task('Digite: Are you free on Saturday night?', 'Are you free on Saturday night?'), task('Digite: Sorry, I can’t.', 'Sorry, I can’t.'), task('Digite: Sure, I’d love to.', 'Sure, I’d love to.')],
    pronunciationChunks: [task('would you like to', 'Convite educado em bloco.'), task('sorry I can’t', 'Recusa curta.'), task('I’d love to', 'Aceitação natural.')],
    listeningComprehension: [q('What is the invitation?', 'have dinner', 'Would you like to have dinner with us?', '', ['have dinner','study English','buy clothes']), q('Why can’t B go on Saturday?', 'needs to work', 'I need to work on Saturday.', '', ['needs to work','is sick','has no money']), q('Áudio da aula — Accepting and refusing invitations — what alternative does A suggest?', 'Sunday afternoon', 'How about Sunday afternoon?', '', ['Sunday afternoon','Friday night','Monday morning']), q('What time will they meet?', 'at four', 'Let’s meet at four.', '', ['at four','at five','at three'])],
    oralProduction: task('Responda oralmente a 4 convites: aceite dois e recuse dois com motivo.'),
    selfAssessment: [task('Consegui ouvir convite?'), task('Consegui identificar recusa e motivo?'), task('Consegui ouvir alternativa?')],
    lessonRecap: ['Listening de convite exige resposta, motivo e alternativa.', 'Sorry, I can’t + motivo é educado.', 'How about sugere outra opção.', 'I’d love to aceita naturalmente.'],
    nextLessonBridge: 'Agora você vai praticar speaking: convidar, aceitar e recusar.',
  }),

  createSpeakingLesson({
    ...common,
    id: 'A2-SPEAKING-014',
    order: 14,
    title: 'Invite, accept and refuse',
    objectives: ['Fazer convites simples com would like to e do you want to.', 'Aceitar convites de forma natural.', 'Recusar convites com educação e motivo.', 'Sugerir alternativa com How about...?'],
    teacherOpening: 'Agora você vai falar. Um bom convite A2 tem: Are you free...? Would you like to...? Para aceitar: Sure, I’d love to. Para recusar: Sorry, I can’t. I need to... Para alternativa: How about Sunday?',
    whyItMatters: 'Essa é uma habilidade social essencial. Você consegue combinar planos, recusar sem soar rude e propor outro dia.',
    realLifeUseCases: ['Chamar amigo para jantar.', 'Aceitar convite de estudo.', 'Recusar porque trabalha.', 'Sugerir outro horário.', 'Confirmar local e hora.'],
    conceptExplanation: 'Use frases curtas e completas. Convite: Would you like to have dinner? Recusa: Sorry, I can’t. I’m busy. Alternativa: How about Sunday afternoon? Confirmação: Great. Let’s meet at four.',
    mentalModel: { title: 'invite flow', summary: 'Pergunte disponibilidade, convide, responda e confirme.', steps: ['Are you free?', 'Would you like to...?', 'Sure / Sorry', 'How about...?', 'Let’s meet...'] },
    stepByStep: [task('Pergunte se a pessoa está livre.'), task('Faça convite com Would you like to...?'), task('Aceite ou recuse.'), task('Se recusar, dê motivo simples.'), task('Sugira alternativa.'), task('Confirme horário/lugar.')],
    portugueseContrast: [task('I’d love to soa natural para aceitar.'), task('Maybe another time suaviza recusa.'), task('How about...? é “que tal...?”'), task('Não responda só no sem contexto em situações sociais.')],
    guidedDiscovery: [task('Are you free? abre conversa.'), task('Would you like to...? é educado.'), task('Sorry + motivo mantém respeito.'), task('Let’s meet fecha plano.')],
    guidedBeforeQuiz: [task('Repita: Are you free on Saturday?'), task('Repita: Would you like to join us?'), task('Repita: Sorry, I can’t. I’m busy.'), task('Repita: How about Sunday?')],
    speakingSituation: 'Você precisa convidar alguém, aceitar um convite e recusar outro com educação.',
    modelPhrases: [phrase('Are you free on Saturday?', 'Você está livre no sábado?'), phrase('Would you like to have dinner with us?', 'Você gostaria de jantar conosco?'), phrase('Sure, I’d love to.', 'Claro, eu adoraria.'), phrase('Sorry, I can’t. I need to work.', 'Desculpa, não posso. Preciso trabalhar.'), phrase('How about Sunday afternoon?', 'Que tal domingo à tarde?'), phrase('Let’s meet at four.', 'Vamos nos encontrar às quatro.')],
    pronunciationChunks: [task('Are you free on Saturday?', 'Pergunta de disponibilidade.'), task('Would you like to join us?', 'Convite educado.'), task('Sorry, I can’t', 'Recusa curta e educada.'), task('I’d love to', 'Aceitação natural.')],
    repeatAfterMe: [task('Are you free tonight?'), task('Would you like to go out?'), task('Sure, I’d love to.'), task('Sorry, I can’t.'), task('Maybe another time.'), task('How about tomorrow?')],
    substitutionDrills: [task('Saturday → Sunday', 'Are you free on Sunday?'), task('have dinner → study English', 'Would you like to study English?'), task('work → visit my family', 'Sorry, I can’t. I need to visit my family.')],
    guidedSpeaking: [task('Faça um convite para sábado.'), task('Aceite um convite para jantar.'), task('Recuse convite porque trabalha.'), task('Sugira domingo à tarde.'), task('Confirme encontro às quatro.')],
    recordingTasks: [task('Grave 5 convites.'), task('Grave 3 aceitações.'), task('Grave 3 recusas com motivo.'), task('Grave diálogo completo de 8 linhas.')],
    freeSpeaking: task('Crie uma conversa de até 60 segundos: convite, recusa, alternativa e confirmação.'),
    feedbackChecklist: [task('Usei Are you free...?'), task('Usei Would you like to...?'), task('Aceitei ou recusei claramente?'), task('Dei motivo se recusei?'), task('Sugeri alternativa?')],
    selfAssessment: [task('Consigo convidar?'), task('Consigo aceitar?'), task('Consigo recusar educadamente?')],
    lessonRecap: ['Convites seguem fluxo simples.', 'Would you like to é educado.', 'Sorry, I can’t + motivo evita rudeza.', 'How about sugere alternativa.'],
    nextLessonBridge: 'Agora você vai escrever convite e resposta.',
  }),

  createWritingLesson({
    ...common,
    id: 'A2-WRITING-014',
    order: 14,
    title: 'Write an invitation and reply',
    objectives: ['Escrever convite curto e claro.', 'Escrever resposta aceitando ou recusando.', 'Incluir dia, horário, lugar e motivo.', 'Usar tom educado com would like, sorry e how about.'],
    teacherOpening: 'Nesta aula, você vai escrever duas mensagens: um convite e uma resposta. O foco é clareza: atividade, dia, horário, lugar e resposta educada.',
    whyItMatters: 'Mensagens de convite aparecem no WhatsApp, trabalho, escola e viagens. Você precisa escrever sem parecer seco ou confuso.',
    realLifeUseCases: ['Convidar amigo por mensagem.', 'Responder convite de estudo.', 'Recusar com motivo.', 'Sugerir outro horário.', 'Confirmar plano.'],
    conceptExplanation: 'Convite: Hi + pergunta de disponibilidade + convite + detalhes. Resposta: thanks + aceitação/recusa + motivo + alternativa se necessário. Use frases curtas.',
    mentalModel: { title: 'message = greeting + invitation + details + response', summary: 'Mensagem social precisa ser clara e educada.', steps: ['Hi Ana', 'Are you free?', 'Would you like to...?', 'at/on/in', 'Sure/Sorry', 'How about...?'] },
    stepByStep: [task('Cumprimente.'), task('Pergunte disponibilidade.'), task('Faça convite.'), task('Inclua dia/horário/lugar.'), task('Na resposta, aceite ou recuse.'), task('Dê motivo ou alternativa.')],
    portugueseContrast: [task('Use on para dias: on Saturday.'), task('Use at para horário: at 4 p.m.'), task('Use in para partes do dia: in the afternoon.'), task('Thanks for inviting me é natural.')],
    guidedDiscovery: [task('Hi deixa mensagem amigável.'), task('Are you free? prepara convite.'), task('Would you like to...? soa educado.'), task('Sorry, I can’t + motivo completa recusa.')],
    guidedBeforeQuiz: [task('Modelo: Are you free on Saturday?'), task('Modelo: Would you like to have dinner with us?'), task('Modelo: Sure, I’d love to.'), task('Modelo: Sorry, I can’t. How about Sunday?')],
    writingPurpose: 'Escrever convite e resposta social em inglês A2.',
    modelText: `Hi Lucas, are you free on Saturday afternoon? Would you like to study English with me at the library? We can meet at 3 p.m.\n\nHi Ana, thanks for inviting me. Sorry, I can’t on Saturday because I need to work. How about Sunday afternoon?`,
    writingBlocks: [task('Greeting', 'Hi Lucas,'), task('Availability', 'Are you free on Saturday afternoon?'), task('Invitation', 'Would you like to study English with me?'), task('Details', 'We can meet at the library at 3 p.m.'), task('Accept', 'Sure, I’d love to.'), task('Refuse', 'Sorry, I can’t because I need to work.'), task('Alternative', 'How about Sunday afternoon?')],
    guidedSubstitution: [task('Troque study English por have dinner.'), task('Troque Saturday por Sunday.'), task('Troque library por café.'), task('Troque work por visit my family.')],
    grammarForWriting: [task('Use Would you like to + verb.'), task('Use on + day.'), task('Use at + time.'), task('Use because para motivo.'), task('Use How about para alternativa.')],
    checklist: [task('Incluí saudação?'), task('Perguntei disponibilidade?'), task('Incluí atividade?'), task('Incluí dia/horário/lugar?'), task('Resposta aceita ou recusa claramente?'), task('Usei tom educado?')],
    draftTask: task('Escreva um convite e uma resposta de 3 a 5 frases cada.'),
    revisionTask: task('Revise preposições de tempo, clareza do convite, motivo e alternativa.'),
    commonMistakes: [mistake('In Saturday', 'On Saturday', 'Dias usam on.'), mistake('At Saturday afternoon', 'On Saturday afternoon', 'Dia + parte do dia usa on.'), mistake('Would you like come?', 'Would you like to come?', 'Falta to antes de verbo.'), mistake('I can’t because I busy.', 'I can’t because I’m busy.', 'Busy precisa be.')],
    productionTasks: [task('Escreva convite para jantar.'), task('Escreva resposta aceitando.'), task('Escreva resposta recusando com motivo e alternativa.'), task('Reescreva tudo como conversa de WhatsApp.')],
    selfAssessment: [task('Consigo escrever convite claro?'), task('Consigo responder com educação?'), task('Consigo sugerir outro horário?')],
    lessonRecap: ['Convites escritos precisam de detalhes.', 'Would you like to é educado.', 'Sorry, I can’t + because explica recusa.', 'How about sugere alternativa.'],
    nextLessonBridge: 'A próxima parte do A2.5 vai entrar em should/shouldn’t, advice e problemas simples.',
  }),
]);

export const A2_DEEP_COMMUNICATION_TASKS_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(A2_DEEP_COMMUNICATION_TASKS.filter((lesson) => lesson.pillar === 'grammar')),
  vocabulary: Object.freeze(A2_DEEP_COMMUNICATION_TASKS.filter((lesson) => lesson.pillar === 'vocabulary')),
  reading: Object.freeze(A2_DEEP_COMMUNICATION_TASKS.filter((lesson) => lesson.pillar === 'reading')),
  listening: Object.freeze(A2_DEEP_COMMUNICATION_TASKS.filter((lesson) => lesson.pillar === 'listening')),
  speaking: Object.freeze(A2_DEEP_COMMUNICATION_TASKS.filter((lesson) => lesson.pillar === 'speaking')),
  writing: Object.freeze(A2_DEEP_COMMUNICATION_TASKS.filter((lesson) => lesson.pillar === 'writing')),
});
