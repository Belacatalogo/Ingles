import { createReadingLesson, createListeningLesson } from '../../../schemas/index.js';

const level = 'A2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['a2-6', 'reviews-checkpoints', 'reading', 'listening', 'review', 'checkpoint', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }

export const A2_DEEP_REVIEWS_CHECKPOINTS_PART2 = Object.freeze([
  createReadingLesson({
    ...common,
    id: 'A2-READING-019',
    order: 19,
    title: 'Reading Review A2',
    checkpoint: 'reading-review',
    objectives: ['Revisar leitura funcional A2.', 'Ler mensagens, notas, reviews, chats e instruções simples.', 'Identificar ideia geral, detalhes, sequência, intenção, comparação e obrigação.', 'Responder com evidência textual.'],
    teacherOpening: 'Reading Review A2 é uma revisão integrada. Você vai ler como no mundo real: mensagens curtas, instruções, reviews, convites, problemas e conselhos.',
    whyItMatters: 'No A2, você precisa entender textos simples sem traduzir tudo. O objetivo é achar tema, detalhes importantes e evidência.',
    realLifeUseCases: ['Ler mensagem de viagem.', 'Entender review de restaurante ou produto.', 'Ler convite simples.', 'Entender instruções de trabalho.', 'Separar conselho de obrigação.'],
    conceptExplanation: 'Use estratégia: primeira leitura para tema, segunda para detalhes, terceira para evidência. Procure palavras de tempo, conectores, comparações, should, have to e going to.',
    mentalModel: { title: 'A2 reading strategy', summary: 'Tema primeiro, detalhes depois, evidência por último.', steps: ['topic', 'who/where/when', 'key verbs', 'connectors', 'evidence'] },
    stepByStep: [task('Leia o título e identifique o tipo de texto.'), task('Faça leitura rápida para ideia geral.'), task('Circule tempo, lugar, pessoas e números.'), task('Marque conectores: because, so, but, and.'), task('Procure evidência exata antes de responder.')],
    portugueseContrast: [task('Não traduza cada palavra antes de entender o tema.'), task('Procure cognatos, mas cuidado com falsos cognatos.'), task('Because explica motivo; so mostra consequência.'), task('Don’t have to significa não precisa.')],
    guidedDiscovery: [task('A message usually has purpose and action.'), task('A review usually has opinion and comparison.'), task('A schedule/instruction usually has time and obligation.'), task('A problem text usually has cause and solution.')],
    guidedBeforeQuiz: [task('Antes de responder, sublinhe a frase que prova sua resposta.'), task('Separe o texto em: situação, detalhe, ação esperada.')],
    readingPurpose: 'Revisar leitura A2 em textos funcionais variados.',
    preReadingVocabulary: [vocab('schedule', 'horário/agenda'), vocab('reservation', 'reserva'), vocab('receipt', 'nota/recibo'), vocab('comfortable', 'confortável'), vocab('worried', 'preocupado'), vocab('deadline', 'prazo'), vocab('advice', 'conselho'), vocab('obligation', 'obrigação')],
    readingStrategy: [task('Skim: qual é o assunto?'), task('Scan: nomes, horários, preço, lugar.'), task('Infer: intenção da pessoa.'), task('Evidence: copie a frase de apoio.')],
    mainText: `Hi Bruno, I can't join you for dinner on Saturday because I have to work late. I would like to meet another day. How about Sunday afternoon? There is a new café near the station, and it is cheaper than the restaurant we visited last week. I read a review yesterday. The food is simple, but people say the service is good. We don't have to book a table, but we should arrive early because it gets busy after 4 p.m.`,
    firstReadTask: task('Qual é o objetivo principal da mensagem?', 'Recusar o jantar de sábado e sugerir outro plano no domingo.'),
    secondReadTasks: [task('Por que a pessoa não pode ir no sábado?', 'because they have to work late'), task('Qual alternativa é sugerida?', 'Sunday afternoon'), task('Onde fica o café?', 'near the station'), task('Como o café se compara ao restaurante?', 'it is cheaper'), task('Eles precisam reservar mesa?', 'no, they don’t have to book a table')],
    evidenceQuestions: [q('Why can’t the person join dinner on Saturday?', 'has to work late', 'I have to work late', '', ['has to work late','is sick','has no money']), q('What day does the person suggest?', 'Sunday afternoon', 'How about Sunday afternoon?', '', ['Sunday afternoon','Friday night','Monday morning']), q('Where is the new café?', 'near the station', 'near the station', '', ['near the station','near the hotel','inside the mall']), q('What is cheaper than the restaurant?', 'the new café', 'it is cheaper than the restaurant', '', ['the new café','the station','the review']), q('Why should they arrive early?', 'it gets busy after 4 p.m.', 'because it gets busy after 4 p.m.', '', ['it gets busy after 4 p.m.','it closes at 4','they need a reservation'])],
    contextVocabularyTasks: [task('Join = participar/se juntar.'), task('Book a table = reservar uma mesa.'), task('Gets busy = fica movimentado/cheio.'), task('Service = atendimento.')],
    guidedSummary: task('Complete: The person can’t go on ___ because they have to ___. They suggest ___. The café is near ___ and it is ___ than the restaurant.', '', 'Saturday / work late / Sunday afternoon / the station / cheaper'),
    connectedProduction: task('Escreva uma resposta curta aceitando o plano de domingo e confirmando horário.'),
    selfAssessment: [task('Consegui entender ideia geral?'), task('Consegui localizar evidência?'), task('Consegui entender comparação, obrigação e conselho?')],
    lessonRecap: ['Reading A2 exige tema, detalhes e evidência.', 'Procure conectores e estruturas funcionais.', 'Não traduza tudo; procure função do texto.', 'Evidência textual evita chute.'],
    nextLessonBridge: 'Agora você vai fazer o checkpoint de Reading A2.',
  }),

  createReadingLesson({
    ...common,
    id: 'A2-READING-020',
    order: 20,
    title: 'Reading Checkpoint A2',
    checkpoint: 'reading-checkpoint',
    objectives: ['Avaliar leitura A2.', 'Ler texto funcional mais longo em partes.', 'Responder perguntas de ideia geral, detalhe, inferência simples e evidência.', 'Confirmar prontidão de leitura antes do B1.'],
    teacherOpening: 'Este checkpoint confirma se você consegue ler um texto A2 completo com calma e estratégia. Não é sobre entender 100% das palavras; é sobre entender função, detalhes e evidência.',
    whyItMatters: 'Antes do B1, você precisa ler textos cotidianos: mensagens, instruções, reviews, planos, problemas e conselhos.',
    realLifeUseCases: ['Ler e-mail simples.', 'Entender plano de viagem.', 'Ler instrução de trabalho.', 'Comparar opções em texto.', 'Identificar conselho e obrigação.'],
    conceptExplanation: 'Leia por camadas. Primeiro: tema. Segundo: detalhes. Terceiro: evidência. Em checkpoint, cada resposta precisa vir de uma frase do texto.',
    mentalModel: { title: 'checkpoint reading flow', summary: 'Leia, marque, responda e prove.', steps: ['skim', 'scan', 'mark evidence', 'answer', 'review'] },
    stepByStep: [task('Leia o texto inteiro sem parar em palavras difíceis.'), task('Escreva o assunto em uma frase.'), task('Marque datas, horários, lugares e pessoas.'), task('Marque comparação, obrigação e conselho.'), task('Responda com evidência.')],
    portugueseContrast: [task('Inferência simples não é chute; vem do contexto.'), task('Palavras desconhecidas podem ser ignoradas se não bloquearem a ideia.'), task('Use conectores para entender lógica.')],
    guidedDiscovery: [task('If the text says “but”, expect contrast.'), task('If it says “because”, expect reason.'), task('If it says “have to”, expect obligation.'), task('If it says “should”, expect advice.')],
    guidedBeforeQuiz: [task('Antes do checkpoint, lembre: tema, detalhe, evidência.'), task('Não responda sem localizar a frase de apoio.')],
    readingPurpose: 'Checkpoint final de leitura A2.',
    preReadingVocabulary: [vocab('training', 'treinamento'), vocab('available', 'disponível'), vocab('option', 'opção'), vocab('comfortable', 'confortável'), vocab('instructions', 'instruções'), vocab('bring', 'trazer'), vocab('early', 'cedo')],
    readingStrategy: [task('Skim para assunto.'), task('Scan para detalhes.'), task('Underline evidence.'), task('Check connector logic.')],
    mainText: `Subject: Friday training update

Hi everyone,

Our Friday training is going to start at 8:30 a.m., not 9:00. Please arrive early because we have to check everyone's ID before the first activity. You don't have to bring your laptop, but you should bring a notebook and a pen. The training room is smaller than the main meeting room, so please don't bring extra bags.

After the training, we are going to have lunch near the office. There are two options: Green Bowl and City Café. Green Bowl is healthier and quieter, but City Café is cheaper and closer. In my opinion, Green Bowl is better because we can talk more comfortably there.

If you have questions, you can send me a message today. I will answer as quickly as possible.`,
    firstReadTask: task('Qual é o assunto principal do e-mail?', 'Atualização sobre o treinamento de sexta.'),
    secondReadTasks: [task('Que horas o treinamento começa?', '8:30 a.m.'), task('Por que precisam chegar cedo?', 'to check everyone’s ID'), task('Precisam levar laptop?', 'no'), task('Quais são as duas opções de almoço?', 'Green Bowl and City Café'), task('Qual opção é mais barata e próxima?', 'City Café')],
    evidenceQuestions: [q('What time is the training going to start?', '8:30 a.m.', 'is going to start at 8:30 a.m.', '', ['8:30 a.m.','9:00 a.m.','after lunch']), q('Why do they have to arrive early?', 'to check everyone’s ID', 'because we have to check everyone’s ID', '', ['to check ID','to buy lunch','to bring laptops']), q('What don’t they have to bring?', 'laptop', 'You don’t have to bring your laptop', '', ['laptop','notebook','pen']), q('Why shouldn’t they bring extra bags?', 'the training room is smaller', 'The training room is smaller than the main meeting room', '', ['room is smaller','bags are expensive','lunch is near office']), q('Which lunch place is healthier and quieter?', 'Green Bowl', 'Green Bowl is healthier and quieter', '', ['Green Bowl','City Café','main meeting room']), q('Why does the writer prefer Green Bowl?', 'they can talk more comfortably there', 'because we can talk more comfortably there', '', ['talk more comfortably','it is cheaper','it is closer'])],
    contextVocabularyTasks: [task('Available = disponível.'), task('Training = treinamento.'), task('Closer = mais perto.'), task('As quickly as possible = o mais rápido possível.')],
    guidedSummary: task('Complete: The training starts at ___. They have to arrive early because ___. They don’t have to bring ___. For lunch, the writer prefers ___ because ___.', '', '8:30 / they have to check IDs / laptop / Green Bowl / they can talk more comfortably'),
    connectedProduction: task('Escreva uma resposta perguntando uma dúvida sobre o treinamento e confirmando que vai chegar cedo.'),
    selfAssessment: [task('Consegui responder sem traduzir tudo?'), task('Consegui justificar com evidência?'), task('Consegui identificar obrigação, conselho e comparação?')],
    lessonRecap: ['Checkpoint de Reading confirma estratégia.', 'Leia por camadas.', 'Responda com evidência.', 'A2 Reading está pronto quando você entende função e detalhes principais.'],
    nextLessonBridge: 'Agora você vai revisar Listening A2.',
  }),

  createListeningLesson({
    ...common,
    id: 'A2-LISTENING-017',
    order: 17,
    title: 'Listening Review A2',
    checkpoint: 'listening-review',
    objectives: ['Revisar escuta funcional A2.', 'Ouvir diálogos com passado, planos, convites, problemas, conselho e obrigação.', 'Identificar ideia geral, detalhes e intenção.', 'Praticar dictation e shadowing com chunks A2.'],
    teacherOpening: 'Listening Review A2 junta tudo que você precisa ouvir no A2: horários, planos, problemas, convites, conselhos, obrigações, comparações e pedidos.',
    whyItMatters: 'Na vida real, você raramente ouve uma estrutura isolada. As pessoas misturam passado, plano, obrigação, opinião e pedido na mesma conversa.',
    realLifeUseCases: ['Entender mudança de horário.', 'Ouvir convite e resposta.', 'Entender problema de celular ou trabalho.', 'Ouvir conselho simples.', 'Confirmar detalhes de plano.'],
    conceptExplanation: 'Na primeira escuta, entenda o tema. Na segunda, capture detalhes. Na terceira, use transcript para confirmar e praticar shadowing.',
    mentalModel: { title: 'A2 listening review flow', summary: 'Tema, detalhes, confirmação, repetição.', steps: ['gist', 'details', 'transcript', 'dictation', 'shadowing'] },
    stepByStep: [task('Primeira escuta: tema geral.'), task('Segunda escuta: horário, lugar, motivo, ação.'), task('Terceira etapa: transcript.'), task('Dictation de chunks.'), task('Shadowing de frases úteis.')],
    portugueseContrast: [task('Não tente traduzir palavra por palavra enquanto escuta.'), task('Procure chunks: I have to, could you, would you like, I’m going to.'), task('Conectores ajudam a prever sentido.')],
    guidedDiscovery: [task('I have to... indica obrigação.'), task('I’m going to... indica plano.'), task('Could you...? indica pedido.'), task('You should... indica conselho.')],
    guidedBeforeQuiz: [task('Primeira escuta: qual é o problema?'), task('Segunda escuta: qual é o plano?'), task('Terceira escuta: qual pedido aparece?')],
    listeningPreparation: [task('Prepare o ouvido para: have to, going to, could you, should, cheaper, busy.'), task('Não leia o transcript antes da primeira escuta.')],
    keyWordsToHear: [vocab('meeting','reunião'), vocab('busy','ocupado/cheio'), vocab('cheaper','mais barato'), vocab('should','deveria'), vocab('could you','você poderia')],
    audioScript: `A: Hi, are you free after work today?
B: I’m not sure. I have to finish a report before six.
A: No problem. I’m going to the new café near the station. Would you like to join me later?
B: Maybe. Is it expensive?
A: No, it is cheaper than the restaurant we visited last week, and it is quieter.
B: That sounds good. Could you send me the address?
A: Sure. You should arrive before seven because it gets busy after that.`,
    firstListenTasks: [task('Sem transcript: qual é o tema geral?', 'Combinar ida a um café depois do trabalho.'), task('Sem transcript: B pode confirmar imediatamente?', 'no')],
    secondListenTasks: [task('O que B precisa terminar?', 'a report'), task('Até que horas?', 'before six'), task('Onde fica o café?', 'near the station'), task('O que A diz sobre preço?', 'cheaper than the restaurant'), task('O que B pede?', 'send the address'), task('Por que deve chegar antes das sete?', 'it gets busy after that')],
    transcript: `A: Hi, are you free after work today?
B: I’m not sure. I have to finish a report before six.
A: No problem. I’m going to the new café near the station. Would you like to join me later?
B: Maybe. Is it expensive?
A: No, it is cheaper than the restaurant we visited last week, and it is quieter.
B: That sounds good. Could you send me the address?
A: Sure. You should arrive before seven because it gets busy after that.`,
    vocabulary: [vocab('after work', 'depois do trabalho'), vocab('finish a report', 'terminar um relatório'), vocab('join me', 'vir comigo/se juntar a mim'), vocab('send me the address', 'me enviar o endereço'), vocab('gets busy', 'fica cheio/movimentado')],
    shadowing: [task('Are you free after work today?'), task('I have to finish a report before six.'), task('Would you like to join me later?'), task('Could you send me the address?'), task('You should arrive before seven.')],
    dictationTasks: [task('Digite: I have to finish a report before six.', 'I have to finish a report before six.'), task('Digite: Could you send me the address?', 'Could you send me the address?'), task('Digite: You should arrive before seven.', 'You should arrive before seven.')],
    pronunciationChunks: [task('have to finish a report', 'Obrigação em bloco.'), task('would you like to join me', 'Convite em bloco.'), task('could you send me the address', 'Pedido educado em bloco.')],
    listeningComprehension: [q('Áudio da aula — Listening Review A2 — what does B have to finish?', 'a report', 'I have to finish a report', '', ['a report','a reservation','a message']), q('Áudio da aula — Listening Review A2 — where is the café?', 'near the station', 'near the station', '', ['near the station','near the office','inside the hotel']), q('Áudio da aula — Listening Review A2 — how does A compare the café?', 'cheaper and quieter', 'cheaper than the restaurant... and quieter', '', ['cheaper and quieter','more expensive','busier']), q('Áudio da aula — Listening Review A2 — what does B ask A to send?', 'the address', 'Could you send me the address?', '', ['the address','the receipt','the schedule']), q('Áudio da aula — Listening Review A2 — when should B arrive?', 'before seven', 'You should arrive before seven', '', ['before seven','after seven','before six'])],
    oralProduction: task('Responda oralmente: aceite o convite, peça o endereço e explique que precisa terminar algo antes.'),
    selfAssessment: [task('Consegui entender tema geral?'), task('Consegui captar obrigação e plano?'), task('Consegui ouvir pedido com could?')],
    lessonRecap: ['Listening Review A2 mistura estruturas reais.', 'Ouça por tema e detalhes.', 'Chunks ajudam a reconhecer fala natural.', 'Transcript confirma o que o ouvido perdeu.'],
    nextLessonBridge: 'Agora você vai fazer o Listening Checkpoint A2.',
  }),

  createListeningLesson({
    ...common,
    id: 'A2-LISTENING-018',
    order: 18,
    title: 'Listening Checkpoint A2',
    checkpoint: 'listening-checkpoint',
    objectives: ['Avaliar escuta A2.', 'Ouvir diálogo funcional com múltiplas estruturas.', 'Responder perguntas de tema, detalhe, intenção e evidência auditiva.', 'Confirmar prontidão de Listening antes do B1.'],
    teacherOpening: 'Este checkpoint confirma se você consegue ouvir uma conversa A2 realista. Você não precisa entender cada palavra, mas precisa entender o plano, o problema, detalhes importantes e ações necessárias.',
    whyItMatters: 'Listening é uma das habilidades mais difíceis. O A2 está pronto quando você entende diálogos simples com horários, motivos, convites, obrigações, pedidos e conselhos.',
    realLifeUseCases: ['Entender ligação de atendimento.', 'Ouvir plano social.', 'Entender instrução de trabalho.', 'Confirmar horário e lugar.', 'Identificar pedido e conselho.'],
    conceptExplanation: 'Checkpoint: escute primeiro para ideia geral, depois detalhes, depois confira com transcript. As respostas devem vir do áudio.',
    mentalModel: { title: 'checkpoint listening flow', summary: 'Gist → details → action.', steps: ['what is happening?', 'who/where/when?', 'what is the problem?', 'what should they do?', 'what is the final plan?'] },
    stepByStep: [task('Primeira escuta: assunto geral.'), task('Segunda escuta: horário, lugar e obrigação.'), task('Terceira etapa: pedido, conselho e plano final.'), task('Dictation dos chunks centrais.'), task('Shadowing final.')],
    portugueseContrast: [task('Ouvir “have to” pode soar rápido como hafta.'), task('Going to pode reduzir para gonna em fala real, mas transcript mantém going to.'), task('Could you pode soar junto.')],
    guidedDiscovery: [task('Listen for: have to, going to, should, could you, because.'), task('Numbers and time often carry the answer.'), task('Final plan usually appears near the end.')],
    guidedBeforeQuiz: [task('Prepare-se para responder: assunto, horário, motivo, pedido e plano final.')],
    listeningPreparation: [task('Primeira escuta sem transcript.'), task('Anote apenas palavras-chave.'), task('Não pause a cada palavra.')],
    keyWordsToHear: [vocab('appointment','compromisso/consulta'), vocab('pharmacy','farmácia'), vocab('directions','direções'), vocab('comfortable','confortável'), vocab('before','antes de')],
    audioScript: `A: Good morning. How can I help you?
B: Hi. I have an appointment at two, but I think I’m going to be late.
A: No problem. What happened?
B: I took the wrong bus, and now I’m near the station. Could you give me directions to the clinic?
A: Sure. Walk two blocks, turn left, and then go straight. The clinic is next to the pharmacy.
B: Do I have to bring my ID card?
A: Yes, you have to bring your ID card, but you don’t have to bring any documents from work.
B: Okay. Should I call again if I arrive after two?
A: Yes, please call us if you are more than ten minutes late.`,
    firstListenTasks: [task('Sem transcript: qual é o problema principal?', 'B está atrasado/perdido para uma consulta.'), task('Sem transcript: B pede direções?', 'yes')],
    secondListenTasks: [task('Que horas é o appointment?', 'at two'), task('Onde B está agora?', 'near the station'), task('Onde fica a clínica?', 'next to the pharmacy'), task('O que B precisa levar?', 'ID card'), task('O que B não precisa levar?', 'documents from work'), task('Quando deve ligar novamente?', 'if more than ten minutes late')],
    transcript: `A: Good morning. How can I help you?
B: Hi. I have an appointment at two, but I think I’m going to be late.
A: No problem. What happened?
B: I took the wrong bus, and now I’m near the station. Could you give me directions to the clinic?
A: Sure. Walk two blocks, turn left, and then go straight. The clinic is next to the pharmacy.
B: Do I have to bring my ID card?
A: Yes, you have to bring your ID card, but you don’t have to bring any documents from work.
B: Okay. Should I call again if I arrive after two?
A: Yes, please call us if you are more than ten minutes late.`,
    vocabulary: [vocab('appointment at two', 'consulta/compromisso às duas'), vocab('wrong bus', 'ônibus errado'), vocab('two blocks', 'dois quarteirões'), vocab('turn left', 'vire à esquerda'), vocab('next to the pharmacy', 'ao lado da farmácia')],
    shadowing: [task('I have an appointment at two.'), task('I think I’m going to be late.'), task('Could you give me directions to the clinic?'), task('Do I have to bring my ID card?'), task('You don’t have to bring any documents from work.')],
    dictationTasks: [task('Digite: I think I’m going to be late.', 'I think I’m going to be late.'), task('Digite: Could you give me directions to the clinic?', 'Could you give me directions to the clinic?'), task('Digite: You have to bring your ID card.', 'You have to bring your ID card.')],
    pronunciationChunks: [task('going to be late', 'Plano/previsão no diálogo.'), task('could you give me directions', 'Pedido educado.'), task('do I have to bring', 'Pergunta de obrigação.')],
    listeningComprehension: [q('Áudio da aula — what time is the appointment?', 'at two', 'appointment at two', '', ['at two','at ten','after work']), q('Áudio da aula — why is B going to be late?', 'took the wrong bus', 'I took the wrong bus', '', ['took the wrong bus','lost ID card','forgot the address']), q('Áudio da aula — where is B now?', 'near the station', 'now I’m near the station', '', ['near the station','next to the pharmacy','at the clinic']), q('Áudio da aula — where is the clinic?', 'next to the pharmacy', 'The clinic is next to the pharmacy', '', ['next to the pharmacy','inside the station','near work']), q('Áudio da aula — what does B have to bring?', 'ID card', 'you have to bring your ID card', '', ['ID card','work documents','notebook']), q('When should B call again?', 'if more than ten minutes late', 'if you are more than ten minutes late', '', ['if more than ten minutes late','before taking bus','after work'])],
    oralProduction: task('Explique oralmente para alguém: você está atrasado, peça direções e pergunte o que precisa levar.'),
    selfAssessment: [task('Consegui entender o problema?'), task('Consegui captar direção e localização?'), task('Consegui identificar have to/don’t have to?'), task('Consegui entender o plano final?')],
    lessonRecap: ['Listening Checkpoint A2 avalia compreensão funcional.', 'Tema, detalhes e ação final importam mais que cada palavra.', 'Have to, should e could aparecem em situações reais.', 'Se entendeu o problema, o pedido e a solução, você está no caminho certo.'],
    nextLessonBridge: 'Na próxima parte, vamos fechar Speaking e Writing A2.',
  }),
]);

export const A2_DEEP_REVIEWS_CHECKPOINTS_PART2_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(A2_DEEP_REVIEWS_CHECKPOINTS_PART2.filter((lesson) => lesson.pillar === 'grammar')),
  vocabulary: Object.freeze(A2_DEEP_REVIEWS_CHECKPOINTS_PART2.filter((lesson) => lesson.pillar === 'vocabulary')),
  reading: Object.freeze(A2_DEEP_REVIEWS_CHECKPOINTS_PART2.filter((lesson) => lesson.pillar === 'reading')),
  listening: Object.freeze(A2_DEEP_REVIEWS_CHECKPOINTS_PART2.filter((lesson) => lesson.pillar === 'listening')),
  speaking: Object.freeze(A2_DEEP_REVIEWS_CHECKPOINTS_PART2.filter((lesson) => lesson.pillar === 'speaking')),
  writing: Object.freeze(A2_DEEP_REVIEWS_CHECKPOINTS_PART2.filter((lesson) => lesson.pillar === 'writing')),
});
