import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'A1';
const status = 'ready';

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }
function ex(text, translation, why = '', warning = '') { return { text, translation, why, warning }; }

const common = {
  level,
  status,
  estimatedMinutes: 55,
  tags: ['a1-4', 'practical-situations', 'help-instructions-common-verbs', 'deep-approved-target'],
};

export const A1_DEEP_PRACTICAL_SITUATIONS_HELP = Object.freeze([
  createGrammarLesson({
    ...common,
    id: 'A1-GRAMMAR-023',
    order: 23,
    title: 'Object pronouns',
    objectives: ['Entender me, you, him, her, it, us e them.', 'Usar object pronouns em pedidos simples.', 'Diferenciar he/him, she/her e they/them.', 'Aplicar object pronouns com help, call, give, show e repeat.'],
    teacherOpening: 'Object pronouns aparecem quando a pessoa ou coisa recebe a ação. Em “Help me, please”, me recebe a ajuda. Em “Call her”, her recebe a ligação. Em “Give it to me”, it é a coisa e me é a pessoa que recebe. No A1.4, vamos usar isso em situações práticas: ajuda, repetição, dar, mostrar e chamar alguém.',
    whyItMatters: 'Você usa object pronouns em frases muito comuns: help me, call him, ask her, give it to me, show us. Sem isso, você fica preso repetindo nomes ou montando frases pouco naturais.',
    realLifeUseCases: ['Pedir ajuda: Help me, please.', 'Pedir para ligar para alguém: Call him.', 'Pedir para mostrar algo: Show me.', 'Pedir para dar algo: Give it to her.', 'Falar de pessoas sem repetir nomes.'],
    conceptExplanation: 'Subject pronouns fazem a ação: he, she, they. Object pronouns recebem a ação: him, her, them. Compare: She helps me. I help her. He calls me. I call him. It pode ser objeto/coisa: Open it. Close it. Give it to me.',
    mentalModel: { title: 'Quem faz vs quem recebe', summary: 'Subject faz a ação; object recebe a ação.', steps: ['I help her.', 'She helps me.', 'Call him.', 'Give it to them.'] },
    stepByStep: [task('Identifique o verbo: help, call, give, show, ask.'), task('Veja quem recebe a ação.'), task('Troque a pessoa por object pronoun.'), task('Use me/you/him/her/it/us/them depois do verbo.'), task('Revise he/him, she/her e they/them.')],
    portugueseContrast: [task('Em português, “me ajuda” parece invertido; em inglês básico use Help me.'), task('Não diga help I; diga help me.'), task('Não diga call he; diga call him.'), task('Her pode ser possessivo ou objeto; o contexto decide.')],
    guidedDiscovery: [task('Em “Help me”, quem recebe ajuda?', 'me'), task('Em “Call him”, quem recebe a ligação?', 'him'), task('Em “Give it to her”, o que é dado?', 'it')],
    guidedBeforeQuiz: [task('Complete: Help ___, please.', 'me'), task('Complete: Call ___.', 'him/her'), task('Complete: Give it to ___.', 'me/her/them'), task('Corrija: Help I.', 'Help me.')],
    grammarGoal: 'Usar object pronouns em situações práticas A1.',
    formationGuide: [task('verb + object pronoun', 'Help me.'), task('verb + object pronoun + please', 'Call her, please.'), task('give + it + to + person', 'Give it to me.'), task('show + object pronoun', 'Show us.')],
    whenToUse: [task('Quando alguém recebe ajuda.'), task('Quando alguém recebe ligação/pergunta.'), task('Quando uma coisa é aberta/fechada/entregue.'), task('Quando você quer evitar repetir nomes.')],
    whenNotToUse: [task('Não use object pronoun como sujeito.', 'Him is here está errado; He is here.'), task('Não use subject pronoun depois de verbos como help/call no A1.'), task('Não confunda it com he/she para objetos.')],
    grammarTable: [
      { pattern: 'I → me', example: 'Help me, please.', translation: 'Me ajude, por favor.' },
      { pattern: 'he → him', example: 'Call him.', translation: 'Ligue para ele.' },
      { pattern: 'she → her', example: 'Ask her.', translation: 'Pergunte a ela.' },
      { pattern: 'they → them', example: 'Help them.', translation: 'Ajude eles/elas.' }
    ],
    teacherExamples: [
      { english: 'Can you help me?', translation: 'Você pode me ajudar?', why: 'Me recebe a ajuda.' },
      { english: 'Please call her.', translation: 'Por favor, ligue para ela.', why: 'Her recebe a ação call.' },
      { english: 'Open it, please.', translation: 'Abra isso, por favor.', why: 'It representa objeto/coisa.' },
      { english: 'Give it to him.', translation: 'Dê isso para ele.', why: 'It é a coisa; him é a pessoa.' }
    ],
    commonBrazilianMistakes: [mistake('Help I.', 'Help me.', 'Depois do verbo, use object pronoun.'), mistake('Call he.', 'Call him.', 'He é sujeito; him é objeto.'), mistake('Ask she.', 'Ask her.', 'She é sujeito; her é objeto.'), mistake('Give to me it.', 'Give it to me.', 'Ordem segura no A1: give it to me.')],
    controlledPractice: [task('Complete: Can you help ___?', 'me'), task('Complete: Call ___.', 'him'), task('Complete: Ask ___.', 'her'), task('Complete: Open ___.', 'it')],
    errorCorrectionPractice: [task('Corrija: Help I.', 'Help me.'), task('Corrija: Call she.', 'Call her.'), task('Corrija: Give it to they.', 'Give it to them.'), task('Corrija: Open he.', 'Open it.')],
    transformationPractice: [task('Troque John por him: Call John.', 'Call him.'), task('Troque Maria por her: Ask Maria.', 'Ask her.'), task('Troque the door por it: Open the door.', 'Open it.')],
    translationPractice: [task('Me ajude, por favor.', 'Help me, please.'), task('Ligue para ela.', 'Call her.'), task('Mostre para nós.', 'Show us.'), task('Dê isso para mim.', 'Give it to me.')],
    productionTasks: [task('Escreva 6 pedidos usando me, him, her, it, us, them.'), task('Crie um mini diálogo pedindo ajuda.'), task('Escreva 4 frases com give it to...')],
    finalChecklist: [task('Usei object pronoun depois do verbo?'), task('Diferenciei he/him?'), task('Diferenciei she/her?'), task('Usei it para coisa/objeto?')],
    selfAssessment: [task('Consigo dizer Help me?'), task('Consigo usar him/her/them?'), task('Consigo corrigir help I/call he?')],
    lessonRecap: ['Object pronouns recebem a ação.', 'Use me, him, her, it, us, them depois do verbo.', 'He/she/they são sujeitos; him/her/them são objetos.', 'Help me e Give it to me são essenciais.'],
    nextLessonBridge: 'Agora você vai aprender verbos comuns para usar esses pronomes em pedidos reais.',
  }),

  createVocabularyLesson({
    ...common,
    id: 'A1-VOCABULARY-019',
    order: 19,
    title: 'Common verbs',
    objectives: ['Aprender verbos comuns de ação prática.', 'Usar verbos em pedidos e instruções.', 'Combinar verbos com object pronouns.', 'Produzir frases curtas para pedir ajuda e resolver situações.'],
    teacherOpening: 'Common verbs são a base para agir em inglês. Você precisa de verbos como open, close, help, call, give, show, ask, take, bring, repeat, write e read. Nesta aula, eles aparecem em comandos e pedidos: Open it, please. Can you help me? Give it to her.',
    whyItMatters: 'Com poucos verbos comuns, você resolve muitas situações: pedir ajuda, pedir repetição, entregar algo, abrir/fechar, mostrar, chamar alguém e seguir instruções.',
    realLifeUseCases: ['Pedir ajuda.', 'Pedir para repetir.', 'Abrir/fechar algo.', 'Pedir para mostrar ou dar algo.', 'Entender instruções de aula e atendimento.'],
    conceptExplanation: 'Aprenda verbo com frase curta. Open = abrir. Close = fechar. Help = ajudar. Give = dar. Show = mostrar. Ask = perguntar/pedir. Call = chamar/ligar. Repeat = repetir. Depois, combine com me, him, her, it, us, them.',
    mentalModel: { title: 'verbo + objeto/pronome', summary: 'Ação prática precisa de verbo claro.', steps: ['Open it.', 'Help me.', 'Show her.', 'Give it to me.'] },
    stepByStep: [task('Aprenda o verbo com ação.'), task('Use o verbo em comando curto.'), task('Adicione please.'), task('Adicione object pronoun se houver pessoa/coisa.'), task('Transforme em pedido com Can you...?')],
    portugueseContrast: [task('Ask pode ser perguntar ou pedir, dependendo do contexto.'), task('Call pode ser ligar ou chamar.'), task('Take e bring confundem: take leva, bring traz.'), task('Use please para suavizar comandos.')],
    guidedDiscovery: [task('Qual verbo abre algo?', 'open'), task('Qual verbo pede repetição?', 'repeat'), task('Qual verbo combina com me em pedido de ajuda?', 'help')],
    guidedBeforeQuiz: [task('Open it, please.'), task('Close the door.'), task('Can you help me?'), task('Give it to her.'), task('Repeat, please.')],
    topicContext: 'Você está em aula, loja, rua ou casa e precisa pedir ações simples em inglês.',
    essentialWords: [vocab('open', 'abrir', 'Open it, please.'), vocab('close', 'fechar', 'Close the door, please.'), vocab('help', 'ajudar', 'Can you help me?'), vocab('call', 'chamar/ligar', 'Call him, please.'), vocab('give', 'dar', 'Give it to me.'), vocab('show', 'mostrar', 'Show me, please.'), vocab('ask', 'perguntar/pedir', 'Ask her.'), vocab('take', 'pegar/levar', 'Take this, please.'), vocab('bring', 'trazer', 'Bring your book.'), vocab('repeat', 'repetir', 'Repeat, please.'), vocab('write', 'escrever', 'Write your name.'), vocab('read', 'ler', 'Read the text.'), vocab('listen', 'escutar', 'Listen and repeat.'), vocab('look', 'olhar', 'Look at the board.'), vocab('wait', 'esperar', 'Wait here, please.'), vocab('come', 'vir', 'Come here, please.'), vocab('go', 'ir', 'Go straight.'), vocab('stop', 'parar', 'Stop here.')],
    chunks: [{ chunk: 'Can you help me?', translation: 'Você pode me ajudar?', example: 'Can you help me, please?' }, { chunk: 'Open it, please.', translation: 'Abra isso, por favor.', example: 'Open it, please.' }, { chunk: 'Give it to me.', translation: 'Dê isso para mim.', example: 'Give it to me.' }, { chunk: 'Show me, please.', translation: 'Mostre para mim, por favor.', example: 'Show me, please.' }, { chunk: 'Repeat, please.', translation: 'Repita, por favor.', example: 'Repeat, please.' }],
    pronunciationFocus: { title: 'Foco sonoro', tips: ['Help me liga as palavras naturalmente.', 'Give it pode soar conectado.', 'Repeat tem stress na segunda parte: re-PEAT.'] },
    dangerousConfusions: [task('Ask = perguntar/pedir; answer = responder.'), task('Listen = escutar; hear = ouvir/perceber som.'), task('Take/bring dependem da direção.'), task('Use wear para roupa, não use.')],
    collocations: [task('help me'), task('open it'), task('close the door'), task('give it to me'), task('show me'), task('repeat, please'), task('write your name'), task('read the text')],
    miniDialogues: [{ title: 'Asking for help', lines: ['A: Excuse me. Can you help me?', 'B: Sure. What do you need?', 'A: Can you open it, please?', 'B: Yes. Here you go.', 'A: Thank you.'], focus: 'Pedido de ajuda com verbos comuns.' }],
    examples: [ex('Can you help me?', 'Você pode me ajudar?', 'Pedido essencial.'), ex('Open it, please.', 'Abra isso, por favor.', 'Open + it.'), ex('Give it to her.', 'Dê isso para ela.', 'Give + it + to + object pronoun.'), ex('Repeat, please.', 'Repita, por favor.', 'Comando educado.'), ex('Write your name.', 'Escreva seu nome.', 'Instrução de aula.')],
    recognitionPractice: [task('Qual verbo significa abrir?', 'open'), task('Qual verbo significa fechar?', 'close'), task('Qual verbo significa repetir?', 'repeat'), task('Qual frase pede ajuda?', 'Can you help me?')],
    usagePractice: [task('Complete: Can you ___ me?', 'help'), task('Complete: ___ it, please.', 'Open'), task('Complete: Give it ___ me.', 'to'), task('Complete: ___ your name.', 'Write')],
    productionTasks: [task('Escreva 8 comandos com verbos comuns.'), task('Escreva 5 pedidos com Can you...?'), task('Crie um diálogo de ajuda com open, help e give.')],
    spacedReview: [task('Revise open/close/help/give/show amanhã.'), task('Revise give it to me em 3 frases.')],
    selfAssessment: [task('Consigo usar verbos comuns em pedidos?'), task('Consigo usar object pronouns com verbos?'), task('Consigo entender instruções simples?')],
    lessonRecap: ['Common verbs resolvem situações práticas.', 'Combine verbos com object pronouns.', 'Can you...? transforma comando em pedido.', 'Please deixa a frase educada.'],
    nextLessonBridge: 'Na Reading, você vai ler instruções simples e identificar ações.',
  }),

  createReadingLesson({
    ...common,
    id: 'A1-READING-015',
    order: 15,
    title: 'Reading for routine actions',
    objectives: ['Ler instruções e ações simples.', 'Identificar verbos comuns no texto.', 'Responder perguntas com evidência.', 'Usar contexto para entender pedidos e comandos.'],
    teacherOpening: 'Nesta leitura, você vai ver ações simples em uma situação prática. O foco é reconhecer verbos: open, close, help, give, show, write, read, repeat. Você também vai identificar quem recebe a ação: me, him, her, it, them.',
    whyItMatters: 'Instruções escritas aparecem em aula, aplicativos, atendimento, lojas e mensagens. Ler comandos simples evita confusão e ajuda você a agir com segurança.',
    realLifeUseCases: ['Ler instruções de aula.', 'Entender mensagem pedindo ajuda.', 'Seguir passos simples.', 'Identificar ações em textos curtos.', 'Preparar speaking e writing de pedidos.'],
    conceptExplanation: 'Textos de instrução têm verbos no começo ou perto do começo: Open the app. Write your name. Read the text. Repeat the sentence. Para entender, procure a ação e o objeto da ação.',
    mentalModel: { title: 'ação + objeto', summary: 'Leia comandos procurando o verbo principal.', steps: ['Find the action.', 'Find the object.', 'Find who receives it.', 'Use evidence.'] },
    stepByStep: [task('Leia o texto inteiro.'), task('Sublinhe verbos de ação.'), task('Circule object pronouns.'), task('Responda usando evidência.'), task('Reescreva 2 instruções com please.')],
    portugueseContrast: [task('Instrução em inglês pode começar direto com verbo.'), task('Me/him/her/them aparecem depois do verbo.'), task('Please pode vir no começo ou fim.')],
    guidedDiscovery: [task('Open the app começa com ação.'), task('Help me mostra quem recebe ajuda.'), task('Give it to her mostra objeto e pessoa.')],
    guidedBeforeQuiz: [task('Procure open/close.'), task('Procure help/give/show.'), task('Procure me/it/her/them.')],
    readingPurpose: 'Ler instruções e pedidos simples com verbos comuns.',
    preReadingVocabulary: [vocab('open', 'abrir'), vocab('close', 'fechar'), vocab('help', 'ajudar'), vocab('show', 'mostrar'), vocab('give', 'dar'), vocab('repeat', 'repetir')],
    readingStrategy: [task('Procure verbos primeiro.'), task('Depois procure objeto/pronome.'), task('Use a frase exata como evidência.'), task('Não traduza tudo se a pergunta pede apenas uma ação.')],
    mainText: `In English class, the teacher gives simple instructions. Open your book. Read the text. Write your name. Listen and repeat. If you do not understand, ask the teacher. Say: Can you help me, please? The teacher can show you the answer. After class, close your book and give it to your friend.`,
    firstReadTask: task('Qual é o assunto geral do texto?', 'Instruções em uma aula de inglês.'),
    secondReadTasks: [task('Quais ações o aluno deve fazer?', 'open, read, write, listen, repeat'), task('O que dizer se não entender?', 'Can you help me, please?'), task('O que fazer depois da aula?', 'close your book and give it to your friend')],
    evidenceQuestions: [q('What should the student open?', 'the book', 'Open your book.', '', ['the book','the door','the app']), q('What should the student write?', 'your name', 'Write your name.', '', ['your name','your address','a number']), q('What can the student say if they do not understand?', 'Can you help me, please?', 'Say: Can you help me, please?', '', ['Can you help me, please?','Where is the café?','I wear a jacket.']), q('Who can show the answer?', 'the teacher', 'The teacher can show you the answer.', '', ['the teacher','your friend','the clerk']), q('What should the student give to a friend?', 'the book / it', 'give it to your friend', '', ['the book','the phone','the jacket'])],
    contextVocabularyTasks: [task('Instructions são comandos/instruções.'), task('If you do not understand mostra condição simples.'), task('It retoma your book.')],
    guidedSummary: task('Complete: In class, students open the book, read the text, write the name, listen and ___.', '', 'repeat'),
    connectedProduction: task('Escreva 5 instruções para uma aula de inglês usando verbos comuns.'),
    selfAssessment: [task('Consigo achar verbos no texto?'), task('Consigo identificar object pronouns?'), task('Consigo responder com evidência?')],
    lessonRecap: ['Textos de instrução mostram ações claras.', 'Verbos comuns aparecem no começo.', 'Object pronouns mostram quem/coisa recebe ação.', 'Can you help me? é pedido essencial.'],
    nextLessonBridge: 'No Listening, você vai ouvir uma situação de ajuda e instruções simples.',
  }),

  createListeningLesson({
    ...common,
    id: 'A1-LISTENING-013-HELP',
    order: 13.1,
    title: 'Asking for help',
    objectives: ['Ouvir pedido de ajuda em situação simples.', 'Identificar verbos open, show, repeat e give.', 'Reconhecer me, it e please na fala.', 'Praticar shadowing de pedidos educados.'],
    teacherOpening: 'Nesta escuta, você vai ouvir alguém pedindo ajuda. Na primeira escuta, entenda o problema. Na segunda, identifique a ação pedida: help, open, show, repeat ou give. Depois, use o transcript para confirmar.',
    whyItMatters: 'Pedir ajuda é uma das funções mais importantes em qualquer idioma. Mesmo no A1, você já consegue resolver situações reais com Can you help me? Can you repeat, please? Show me, please.',
    realLifeUseCases: ['Pedir ajuda em aula.', 'Pedir para abrir algo.', 'Pedir para mostrar algo.', 'Pedir repetição.', 'Entender resposta de ajuda.'],
    conceptExplanation: 'Pedidos educados geralmente usam Can you...? + verbo. Can you help me? Can you open it? Can you show me? Can you repeat, please? Ouça por Can you e depois pela ação.',
    mentalModel: { title: 'Can you + action?', summary: 'O pedido educado vem em bloco.', steps: ['Can you help me?', 'Can you open it?', 'Can you show me?', 'Can you repeat?'] },
    stepByStep: [task('Primeira escuta: qual é o problema?'), task('Segunda escuta: qual ação é pedida?'), task('Terceira etapa: identifique me/it.'), task('Leia o transcript.'), task('Faça shadowing.')],
    portugueseContrast: [task('Can you help me? é mais natural que Help me! em muitas situações.'), task('Repeat, please é pedido curto e educado.'), task('Show me não precisa de “for me” no A1.')],
    guidedDiscovery: [task('Can you indica pedido.'), task('Me recebe ajuda/mostrar.'), task('It representa uma coisa.')],
    guidedBeforeQuiz: [task('Primeira escuta: a pessoa precisa de ajuda?'), task('Segunda escuta: quais ações aparecem?')],
    listeningPreparation: [task('Não leia transcript antes da primeira escuta.'), task('Prepare: help, open, show, repeat, give, me, it.'), task('Objetivo: pedido + ação.')],
    keyWordsToHear: [vocab('help me','me ajude'), vocab('open it','abra isso'), vocab('show me','mostre para mim'), vocab('repeat','repetir'), vocab('give it','dar isso')],
    audioScript: `Student: Excuse me. Can you help me, please?
Teacher: Sure. What do you need?
Student: I don’t understand this word. Can you repeat it?
Teacher: Yes. Repeat: pharmacy.
Student: Thank you. Can you show me the answer?
Teacher: Yes. Here it is. Write it in your notebook.
Student: Okay. Thank you.`,
    firstListenTasks: [task('Sem transcript: quem precisa de ajuda?', 'the student'), task('Sem transcript: a situação é aula, café ou rua?', 'aula')],
    secondListenTasks: [task('O estudante entende a palavra?', 'no'), task('O que ele pede para repetir?', 'it / this word'), task('O que o professor manda escrever?', 'it in your notebook')],
    transcript: `Student: Excuse me. Can you help me, please?
Teacher: Sure. What do you need?
Student: I don’t understand this word. Can you repeat it?
Teacher: Yes. Repeat: pharmacy.
Student: Thank you. Can you show me the answer?
Teacher: Yes. Here it is. Write it in your notebook.
Student: Okay. Thank you.`,
    vocabulary: [vocab('I don’t understand', 'eu não entendo'), vocab('word', 'palavra'), vocab('answer', 'resposta'), vocab('notebook', 'caderno'), vocab('here it is', 'aqui está')],
    shadowing: [task('Can you help me, please?'), task('I don’t understand this word.'), task('Can you repeat it?'), task('Can you show me the answer?'), task('Write it in your notebook.')],
    dictationTasks: [task('Complete: Can you help ___, please?', 'me'), task('Complete: Can you repeat ___?', 'it'), task('Complete: Can you show ___ the answer?', 'me'), task('Complete: Write it in your ___.', 'notebook')],
    pronunciationChunks: [task('Can you help me', 'Fale como bloco.'), task('repeat it', 'Conecte repeat-it.'), task('show me the answer', 'Fale devagar e claro.')],
    listeningComprehension: [q('Who needs help?', 'the student', 'Student: Can you help me, please?', '', ['the student','the teacher','the clerk']), q('What word does the teacher repeat?', 'pharmacy', 'Repeat: pharmacy.', '', ['pharmacy','coffee','jacket']), q('Where should the student write it?', 'in the notebook', 'Write it in your notebook.', '', ['in the notebook','on the door','in the kitchen'])],
    oralProduction: task('Peça ajuda oralmente usando Can you help me? e Can you repeat it?'),
    selfAssessment: [task('Consegui ouvir Can you help me?'), task('Consegui identificar repeat it?'), task('Consegui repetir os pedidos?')],
    lessonRecap: ['Can you...? cria pedido educado.', 'Help me, show me e repeat it são chunks essenciais.', 'It pode representar word/answer/object.', 'Shadowing automatiza pedidos práticos.'],
    nextLessonBridge: 'No Speaking, você vai praticar pedir ajuda e repetir quando não entender.',
  }),

  createSpeakingLesson({
    ...common,
    id: 'A1-SPEAKING-009-HELP',
    order: 9.1,
    title: 'Ask simple questions — help and repetition',
    objectives: ['Pedir ajuda com Can you help me?', 'Pedir repetição com Can you repeat, please?', 'Pedir para mostrar ou escrever algo.', 'Gravar mini diálogo de ajuda.'],
    teacherOpening: 'Esta aula é uma das mais úteis do A1: pedir ajuda sem travar. Você vai treinar frases de sobrevivência: Can you help me? Can you repeat, please? Can you show me? Can you write it? I don’t understand.',
    whyItMatters: 'Quando você não entende algo, precisa de frases prontas para continuar a conversa. Essas frases evitam silêncio e te dão controle no aprendizado.',
    realLifeUseCases: ['Pedir ajuda em aula.', 'Pedir repetição.', 'Pedir para escrever uma palavra.', 'Pedir para mostrar a resposta.', 'Dizer que não entendeu.'],
    conceptExplanation: 'Use Can you...? para pedir ação de forma educada. Can you help me? Can you repeat it? Can you write it? Can you show me? Se não entendeu, diga I don’t understand. Depois peça ajuda específica.',
    mentalModel: { title: 'problema + pedido', summary: 'Diga o problema e peça a ação.', steps: ['I don’t understand.', 'Can you help me?', 'Can you repeat it?', 'Can you write it?'] },
    stepByStep: [task('Abra com Excuse me.'), task('Diga o problema: I don’t understand.'), task('Peça ajuda com Can you...?'), task('Use please.'), task('Agradeça.')],
    portugueseContrast: [task('Não diga “I no understand”.'), task('Use I don’t understand.'), task('Can you repeat? é melhor que Repeat? sozinho em situação educada.')],
    guidedDiscovery: [task('I don’t understand mostra o problema.'), task('Can you help me? pede ação.'), task('Thank you fecha a interação.')],
    guidedBeforeQuiz: [task('Repita: I don’t understand.'), task('Repita: Can you help me, please?'), task('Repita: Can you repeat it?'), task('Repita: Can you write it?')],
    speakingSituation: 'Você está em aula e precisa pedir ajuda porque não entendeu uma palavra ou instrução.',
    modelPhrases: [phrase('Excuse me.', 'Com licença.'), phrase('I don’t understand.', 'Eu não entendo.'), phrase('Can you help me, please?', 'Você pode me ajudar, por favor?'), phrase('Can you repeat it?', 'Você pode repetir isso?'), phrase('Can you write it?', 'Você pode escrever isso?'), phrase('Thank you.', 'Obrigado.')],
    pronunciationChunks: [task('I don’t understand', 'Fale don’t de forma clara.'), task('Can you help me', 'Bloco de pedido.'), task('repeat it', 'Ligue as palavras.')],
    repeatAfterMe: [task('I don’t understand.'), task('Can you help me, please?'), task('Can you repeat it?'), task('Can you show me?'), task('Can you write it?')],
    substitutionDrills: [task('help me → show me', 'Can you show me?'), task('repeat it → write it', 'Can you write it?'), task('show me → give it to me', 'Can you give it to me?')],
    guidedSpeaking: [task('Diga que não entendeu.', 'I don’t understand.'), task('Peça ajuda.', 'Can you help me, please?'), task('Peça repetição.', 'Can you repeat it?'), task('Peça para escrever.', 'Can you write it?')],
    recordingTasks: [task('Grave 5 frases de pedido de ajuda.'), task('Grave um diálogo de 6 linhas entre aluno e professor.'), task('Grave novamente usando please e thank you.')],
    freeSpeaking: task('Crie uma fala curta pedindo ajuda para entender uma palavra em inglês.'),
    feedbackChecklist: [task('Usei I don’t understand?'), task('Usei Can you...?'), task('Usei me/it corretamente?'), task('Usei please/thank you?')],
    selfAssessment: [task('Consigo pedir ajuda?'), task('Consigo pedir repetição?'), task('Consigo dizer que não entendi?')],
    lessonRecap: ['I don’t understand é frase de sobrevivência.', 'Can you help me? pede ajuda.', 'Can you repeat it? pede repetição.', 'Please e thank you deixam natural.'],
    nextLessonBridge: 'Na Writing, você vai escrever perguntas e respostas curtas para pedir ajuda.',
  }),

  createWritingLesson({
    ...common,
    id: 'A1-WRITING-012-HELP',
    order: 12.1,
    title: 'Write questions and answers — help requests',
    objectives: ['Escrever perguntas simples com Can you...?', 'Responder pedidos de ajuda de forma curta.', 'Usar me/it/her/them corretamente.', 'Revisar pontuação em perguntas e respostas.'],
    teacherOpening: 'Agora você vai escrever perguntas e respostas úteis para pedir ajuda. No A1, uma pergunta boa pode ser simples: Can you help me? Can you repeat it? Can you write it? A resposta também pode ser curta: Sure. Yes, of course. Sorry, I can’t.',
    whyItMatters: 'Pedir ajuda por escrito aparece em chat, aula online, aplicativos e mensagens. Você precisa escrever perguntas claras e educadas.',
    realLifeUseCases: ['Pedir ajuda por mensagem.', 'Pedir para repetir/escrever algo.', 'Responder se pode ajudar.', 'Escrever mini diálogo de aula.', 'Praticar ? em perguntas.'],
    conceptExplanation: 'Perguntas com Can you...? terminam com ponto de interrogação. Use object pronouns quando necessário: help me, repeat it, show me, give it to her. Respostas curtas podem ser Sure, Yes, of course, Sorry, I can’t.',
    mentalModel: { title: 'Can you + verb + object?', summary: 'Pergunta curta, ação clara e pontuação correta.', steps: ['Can you help me?', 'Can you repeat it?', 'Can you write it?', 'Sure.'] },
    stepByStep: [task('Comece com Can you.'), task('Escolha o verbo.'), task('Adicione object pronoun se precisar.'), task('Termine com ?'), task('Escreva resposta curta.')],
    portugueseContrast: [task('Não escreva You can help me? no A1.'), task('Use Can you help me?'), task('Não esqueça ? em pergunta.'), task('Sure é resposta natural para aceitar.')],
    guidedDiscovery: [task('Qual frase é pergunta?', 'Can you help me?'), task('Qual pontuação usar?', '?'), task('Qual resposta aceita o pedido?', 'Sure.')],
    guidedBeforeQuiz: [task('Can you help me?'), task('Can you repeat it?'), task('Can you write it?'), task('Sure. Thank you.')],
    writingPurpose: 'Escrever perguntas e respostas curtas para pedir ajuda.',
    modelText: `A: Excuse me. Can you help me?
B: Sure. What do you need?
A: Can you repeat it, please?
B: Yes, of course.
A: Thank you.`,
    writingBlocks: [task('Opening', 'Excuse me.'), task('Help request', 'Can you help me?'), task('Specific request', 'Can you repeat it, please?'), task('Positive answer', 'Sure. / Yes, of course.'), task('Closing', 'Thank you.')],
    guidedSubstitution: [task('Troque help me por show me.', 'Can you show me?'), task('Troque repeat it por write it.', 'Can you write it?'), task('Troque positive answer por negative answer.', 'Sorry, I can’t.')],
    grammarForWriting: [task('Can começa com maiúscula.'), task('Pergunta termina com ?'), task('Resposta termina com ponto final.'), task('Use me/it depois do verbo.'), task('Use please para soar educado.')],
    checklist: [task('Minhas perguntas começam com Can you?'), task('Usei ? no fim?'), task('Usei me/it corretamente?'), task('Incluí resposta curta?'), task('Incluí thank you?')],
    draftTask: task('Escreva um diálogo curto pedindo ajuda em aula.'),
    revisionTask: task('Revise pontuação e object pronouns.'),
    commonMistakes: [mistake('You can help me?', 'Can you help me?', 'Ordem correta em pergunta.'), mistake('Can you help I?', 'Can you help me?', 'Depois do verbo, use me.'), mistake('Can you repeat it.', 'Can you repeat it?', 'Pergunta precisa de ?')],
    productionTasks: [task('Escreva 5 perguntas com Can you...?'), task('Escreva 3 respostas positivas.'), task('Escreva 2 respostas negativas educadas.'), task('Escreva um diálogo de 8 linhas.')],
    selfAssessment: [task('Consigo escrever pedido de ajuda?'), task('Consigo usar ? corretamente?'), task('Consigo responder com Sure/Sorry?')],
    lessonRecap: ['Can you...? cria pergunta educada.', 'Help me, repeat it e show me são chunks úteis.', 'Perguntas usam ?.', 'Respostas curtas são suficientes no A1.'],
    nextLessonBridge: 'Depois deste pacote, o A1.4 fica pronto para entrar nas revisões e checkpoints A1.5.',
  }),
]);

export const A1_DEEP_PRACTICAL_SITUATIONS_HELP_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_HELP.filter((lesson) => lesson.pillar === 'grammar')),
  vocabulary: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_HELP.filter((lesson) => lesson.pillar === 'vocabulary')),
  reading: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_HELP.filter((lesson) => lesson.pillar === 'reading')),
  listening: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_HELP.filter((lesson) => lesson.pillar === 'listening')),
  speaking: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_HELP.filter((lesson) => lesson.pillar === 'speaking')),
  writing: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_HELP.filter((lesson) => lesson.pillar === 'writing')),
});
