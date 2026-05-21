import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson, createSpeakingLesson } from '../../../schemas/index.js';

const level = 'B1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['b1-1', 'bridge', 'a2-to-b1', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }
function ex(text, translation, why = '', warning = '') { return { text, translation, why, warning }; }

export const B1_DEEP_BRIDGE_PART1 = Object.freeze([

  // ─── GRAMMAR ────────────────────────────────────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B1-GRAMMAR-001',
    order: 1,
    title: 'A2 repair and B1 fluency bridge',
    objectives: [
      'Identificar e corrigir os erros de A2 mais comuns antes de entrar no B1.',
      'Produzir frases completas e conectadas, não apenas respostas curtas.',
      'Usar because, so, but e and com fluidez para criar ideias encadeadas.',
      'Entender a diferença entre B1 e A2 em termos de complexidade de frase.',
    ],
    teacherOpening: 'Bem-vindo ao B1. Antes de entrar em tempos verbais novos, você precisa garantir que os fundamentos do A2 estão sólidos — e que consegue ir além deles. No A2, você aprende a responder perguntas. No B1, você aprende a desenvolver respostas. Essa aula faz a ponte.',
    whyItMatters: 'Muitos alunos entram no B1 ainda respondendo em frases curtas e isoladas: "Yes, I like it." No B1, o esperado é: "Yes, I like it because it gives me more flexibility, but it can also be stressful." Essa aula treina exatamente esse salto.',
    differenceFromA2: 'No A2, você conecta duas ideias com and, but, because e so. No B1, você conecta três ou mais ideias, usa conectores de contraste e causa com mais precisão e produz respostas de 2-4 frases naturalmente, não só quando forçado.',
    realLifeUseCases: [
      'Responder perguntas em conversas sem parar depois da primeira frase.',
      'Explicar por que você fez algo.',
      'Dar contexto para uma situação.',
      'Contar o que aconteceu de forma mais completa.',
      'Expressar opinião com justificativa, não só preferência.',
    ],
    conceptExplanation: 'Uma resposta B1 tem três partes: (1) a resposta principal, (2) o motivo ou contexto, (3) um detalhe extra, contraste ou consequência. Isso não precisa ser forçado — acontece naturalmente quando você usa conectores certos: because, so, but, although, and. O B1 também exige que você escolha o tempo verbal correto com mais precisão, especialmente passado vs presente perfect.',
    mentalModel: {
      title: 'Resposta A2 → Resposta B1',
      summary: 'Uma resposta B1 tem pelo menos duas ideias conectadas.',
      steps: [
        'A2: "I was tired yesterday."',
        'B1: "I was tired yesterday because I worked late, so I went to bed early."',
        'A2: "I like coffee."',
        'B1: "I like coffee, but I try not to drink too much because it affects my sleep."',
      ],
    },
    stepByStep: [
      task('Dê a resposta principal.'),
      task('Adicione o motivo com because.'),
      task('Adicione consequência com so ou detalhe extra com and.'),
      task('Se houver contraste, use but ou although.'),
      task('Revise: há pelo menos 2 ideias conectadas?'),
    ],
    portugueseContrast: [
      task('Em português, respostas curtas são mais aceitáveis em conversa. Em inglês B1, espera-se desenvolvimento.'),
      task('Although = embora, mas embora em inglês fica no meio ou no começo — nunca use although + but juntos.', 'Errado: Although I was tired, but I went. / Certo: Although I was tired, I went.'),
      task('So = então/portanto como consequência, não como pergunta tag.', '"So" em "So, how are you?" é diferente de "I was tired, so I slept early."'),
    ],
    guidedDiscovery: [
      task('Observe: "I didn\'t go to the party because I had a lot of work." — qual parte é a resposta? Qual é o motivo?'),
      task('Observe: "I wanted to call you, but my phone was dead." — o que but faz nessa frase?'),
      task('Observe: "I studied all night, so I was really tired the next day." — qual é a consequência?'),
    ],
    guidedBeforeQuiz: [
      task('Expanda: "I was late." → adicione um motivo.', '', 'I was late because the traffic was terrible.'),
      task('Expanda: "I didn\'t eat lunch." → adicione uma consequência.', '', 'I didn\'t eat lunch, so I was really hungry by 3pm.'),
      task('Expanda: "I like working from home." → adicione contraste.', '', 'I like working from home, but sometimes I miss talking to people.'),
    ],
    grammarGoal: 'Produzir respostas de 2-3 frases usando because, so, but e and com conteúdo real.',
    formationGuide: [
      task('Causa: [resultado] because [motivo]', '"I was late because there was an accident."'),
      task('Consequência: [causa], so [resultado]', '"I woke up early, so I had time for breakfast."'),
      task('Contraste: [ideia A], but [ideia B]', '"I wanted to go, but I was too tired."'),
      task('Contraste avançado: Although [ideia A], [ideia B].', '"Although it was expensive, I bought it."'),
    ],
    whenToUse: [
      task('Use because quando o motivo vem depois da consequência.'),
      task('Use so quando a consequência vem depois da causa.'),
      task('Use but para contraste entre duas ideias.'),
      task('Use although para contraste mais formal, especialmente no início da frase.'),
    ],
    whenNotToUse: [
      task('Não use although + but na mesma frase.'),
      task('Não use so no início de frase como conector de causa em registro formal.'),
      task('Não use because no início de frase como frase independente.', 'Errado: "Because I was tired." — isso é fragmento.'),
    ],
    grammarTable: [
      { pattern: 'because', example: 'I left early because I was tired.', translation: 'Saí cedo porque estava cansado.' },
      { pattern: 'so', example: 'It was raining, so we stayed home.', translation: 'Estava chovendo, então ficamos em casa.' },
      { pattern: 'but', example: 'I wanted to go, but I had work.', translation: 'Eu queria ir, mas tinha trabalho.' },
      { pattern: 'although', example: 'Although it was late, I finished the report.', translation: 'Embora fosse tarde, terminei o relatório.' },
    ],
    teacherExamples: [
      ex('I didn\'t sleep well last night because I was stressed about a meeting, so I drank extra coffee in the morning.', 'Não dormi bem ontem à noite porque estava estressado com uma reunião, então tomei café extra pela manhã.', 'Dois conectores, três ideias.'),
      ex('I like the new job, although it\'s more demanding than the old one.', 'Eu gosto do novo emprego, embora seja mais exigente do que o antigo.', 'Although no meio conecta contraste com sutileza.'),
      ex('She studied hard, but she didn\'t pass the exam.', 'Ela estudou muito, mas não passou na prova.', 'But mostra resultado inesperado.'),
    ],
    commonBrazilianMistakes: [
      mistake('Although I was tired, but I worked.', 'Although I was tired, I worked.', 'Although já inclui o contraste — não precisa de but.'),
      mistake('Because I was hungry.', 'I ate a lot because I was hungry.', 'Because não pode começar frase independente no registro padrão.'),
      mistake('I was tired, so because I slept.', 'I was tired, so I slept.', 'Não misture so e because no mesmo conector.'),
      mistake('I like it, although but it is expensive.', 'I like it, although it is expensive.', 'Nunca although + but.'),
    ],
    controlledPractice: [
      task('Complete: I didn\'t go to work _______ I was sick.', 'because'),
      task('Complete: It was cold, _______ I wore a jacket.', 'so'),
      task('Complete: I wanted to buy it, _______ it was too expensive.', 'but'),
      task('Complete: _______ it was raining, we played football.', 'Although'),
    ],
    errorCorrectionPractice: [
      task('Corrija: Although I was tired, but I studied.', 'Although I was tired, I studied.'),
      task('Corrija: Because I was late. I missed the bus.', 'I was late because I missed the bus. / I was late, so I missed the bus.'),
      task('Corrija: I liked it, so although it was expensive.', 'I liked it, although it was expensive.'),
    ],
    transformationPractice: [
      task('Una as frases: "I was hungry. I ate a big lunch."', 'I was hungry, so I ate a big lunch.'),
      task('Una as frases: "I like the city. It\'s too noisy."', 'I like the city, but it\'s too noisy.'),
      task('Una as frases: "It was cold. I went for a walk."', 'Although it was cold, I went for a walk.'),
    ],
    translationPractice: [
      task('Eu estava cansado, então fui dormir cedo.', 'I was tired, so I went to bed early.'),
      task('Embora fosse difícil, eu continuei tentando.', 'Although it was difficult, I kept trying.'),
      task('Eu queria ir, mas não podia.', 'I wanted to go, but I couldn\'t.'),
    ],
    productionTasks: [
      task('Escreva 3 frases sobre ontem usando because, so e but — uma cada.'),
      task('Descreva uma situação da semana passada em 3-4 frases conectadas.'),
      task('Complete em 2 frases: "I like my routine, although..."'),
    ],
    finalChecklist: [
      task('Usei pelo menos 2 conectores diferentes?'),
      task('Cada frase tem sujeito + verbo?'),
      task('Evitei although + but na mesma frase?'),
      task('Produzi uma resposta com 2 ou mais ideias conectadas?'),
    ],
    selfAssessment: [
      task('Consigo expandir uma resposta curta em 2-3 frases naturalmente?'),
      task('Sei a diferença entre because (motivo) e so (consequência)?'),
      task('Uso although sem adicionar but logo depois?'),
    ],
    lessonRecap: [
      'B1 significa desenvolver respostas, não só responder.',
      'because = motivo; so = consequência; but = contraste.',
      'although já inclui o contraste — não use although + but.',
      'Uma resposta B1 tem pelo menos 2 ideias conectadas.',
    ],
    nextLessonBridge: 'Na próxima aula de gramática, você vai aprender a falar de ações em progresso no passado com Past Continuous — essencial para contar histórias mais ricas.',
  }),

  // ─── VOCABULARY ─────────────────────────────────────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B1-VOCABULARY-001',
    order: 1,
    title: 'Life events and milestones',
    objectives: [
      'Aprender vocabulário para falar de eventos importantes da vida.',
      'Usar esse vocabulário em narrativas pessoais mais longas.',
      'Diferenciar eventos de curta e longa duração.',
      'Criar frases conectadas sobre trajetória de vida.',
    ],
    teacherOpening: 'No B1, você começa a contar a sua história — não só o que fez ontem, mas o que aconteceu em momentos importantes da sua vida. Para isso, você precisa de vocabulário de eventos: grow up, move, start a job, graduate, get married, retire. Essa aula constrói esse banco de palavras.',
    whyItMatters: 'Sem esse vocabulário, você fica preso só no presente e no imediato. Com ele, você consegue falar de experiências passadas, explicar sua trajetória e entender textos sobre histórias de vida — pilares centrais do B1.',
    differenceFromA2: 'No A2, você falava de eventos simples: "I had a meeting" ou "I went to the party." No B1, você fala de marcos de vida com mais detalhes: "I moved to another city when I was 20 because I got a new job there."',
    realLifeUseCases: [
      'Contar sua história em entrevistas.',
      'Falar sobre sua trajetória de vida.',
      'Entender textos biográficos.',
      'Descrever experiências em conversas sociais.',
      'Escrever sobre si mesmo.',
    ],
    conceptExplanation: 'Life events são eventos que marcam a vida de uma pessoa. Milestones são marcos importantes, como terminar a faculdade ou ter um filho. Muitos desses eventos usam verbos específicos em inglês — não apenas "do" ou "have". Prestar atenção a qual verbo vai com qual evento é fundamental.',
    mentalModel: {
      title: 'evento + verbo certo + contexto',
      summary: 'Cada evento tem um verbo específico em inglês.',
      steps: [
        'graduate FROM university (não "finish university")',
        'move TO another city',
        'start a new job (não "begin a work")',
        'get married (não "marry with someone")',
        'grow up IN a small town',
      ],
    },
    stepByStep: [
      task('Aprenda o verbo específico de cada evento.'),
      task('Aprenda as preposições que acompanham cada verbo.'),
      task('Monte frase com o evento + quando ou onde.'),
      task('Conecte eventos com first, then, after that, when.'),
      task('Pratique contar 2-3 eventos da sua própria vida.'),
    ],
    portugueseContrast: [
      task('Graduate FROM — não "graduate of" ou "finish university" (too literal).'),
      task('Get married — nunca "marry with". Diga "I got married in 2018" ou "I married Ana."'),
      task('Grow up — crescer (de criança a adulto). Não use "grow" sozinho nesse sentido.'),
      task('Move to — não "go to live". "I moved to São Paulo" é o padrão natural.'),
    ],
    guidedDiscovery: [
      task('Qual verbo usa com "university"?', '', 'graduate from'),
      task('O que significa "I grew up in the countryside"?', '', 'Cresci no campo (como criança).'),
      task('Qual é a diferença entre "I started a job" e "I got a promotion"?', '', 'Start = começar; promotion = subir de cargo.'),
    ],
    guidedBeforeQuiz: [
      task('"I _______ from university in 2019."', '', 'graduated'),
      task('"She _______ to another country to study."', '', 'moved'),
      task('"They _______ married last year."', '', 'got'),
    ],
    topicContext: 'Eventos e marcos da vida pessoal — trajetória, família, trabalho e mudanças.',
    essentialWords: [
      vocab('grow up', 'crescer / ser criado', 'I grew up in a small town in Minas Gerais.', 'Processo, não momento único.'),
      vocab('graduate', 'se formar', 'She graduated from engineering in 2020.', 'Sempre: graduate FROM.'),
      vocab('move', 'se mudar', 'We moved to São Paulo five years ago.', 'move TO a place.'),
      vocab('start a job', 'começar um emprego', 'He started a new job last month.'),
      vocab('get a promotion', 'ser promovido', 'She got a promotion after two years.'),
      vocab('get married', 'se casar', 'They got married in a small ceremony.', 'Nunca "marry with".'),
      vocab('have a baby', 'ter um filho', 'They had their first baby in 2022.'),
      vocab('retire', 'se aposentar', 'My father retired at 65.'),
      vocab('pass an exam', 'passar numa prova', 'I finally passed my driving test.', 'PASS, não "approve".'),
      vocab('fail an exam', 'reprovar numa prova', 'I failed the entrance exam the first time.'),
      vocab('leave school', 'sair da escola', 'He left school at 16 to work.'),
      vocab('change careers', 'mudar de carreira', 'She changed careers in her thirties.'),
      vocab('apply for a job', 'se candidatar a um emprego', 'I applied for three jobs last week.'),
      vocab('lose a job', 'perder o emprego', 'He lost his job during the pandemic.'),
      vocab('achievement', 'conquista', 'Getting that scholarship was a big achievement.'),
      vocab('milestone', 'marco importante', 'Graduating was a major milestone for me.'),
      vocab('turning point', 'ponto de virada', 'Moving abroad was a real turning point.'),
    ],
    chunks: [
      { chunk: 'grew up in', translation: 'cresceu em', example: 'I grew up in a big family.' },
      { chunk: 'moved to', translation: 'se mudou para', example: 'She moved to the UK to study.' },
      { chunk: 'got a job at', translation: 'conseguiu emprego em', example: 'He got a job at a tech company.' },
      { chunk: 'passed/failed the exam', translation: 'passou/reprovou no exame', example: 'She passed the exam on her second try.' },
      { chunk: 'life-changing experience', translation: 'experiência que mudou a vida', example: 'Traveling alone was a life-changing experience.' },
    ],
    pronunciationFocus: {
      title: 'Foco sonoro',
      tips: [
        '"Graduate" — stress na primeira sílaba: GRA-du-ate.',
        '"Achieve" — o "ch" soa como /tʃ/ (como em "church").',
        '"Milestone" — MILE-stone; o "e" final é mudo.',
      ],
    },
    dangerousConfusions: [
      task('Graduate FROM university — nunca "graduate OF" ou "finish university" como tradução direta.'),
      task('Get married — não "marry with someone". O correto é "marry someone" ou "get married (to someone)".'),
      task('Grow up (= crescer) ≠ grow (= crescer de planta ou cabelo). Contexto diferente.'),
      task('Pass an exam (= ser aprovado) ≠ do an exam (= fazer a prova).'),
    ],
    collocations: [
      task('graduate FROM university'),
      task('apply FOR a job'),
      task('get a promotion'),
      task('lose a job'),
      task('life-changing event'),
      task('major achievement'),
      task('turning point in life'),
    ],
    miniDialogues: [
      {
        title: 'Talking about life events',
        lines: [
          'A: Where did you grow up?',
          'B: I grew up in Recife, but I moved to São Paulo when I was 22.',
          'A: What made you move?',
          'B: I got a job at a company there after I graduated.',
        ],
        focus: 'Conectar eventos com because/when.',
      },
    ],
    examples: [
      ex('I graduated from university in 2018 and moved to another city to start my first job.', 'Me formei na faculdade em 2018 e me mudei para outra cidade para começar meu primeiro emprego.', 'Dois eventos conectados com and.'),
      ex('Getting that promotion was a major milestone in my career.', 'Conseguir essa promoção foi um marco importante na minha carreira.', 'Milestone como avaliação do evento.'),
      ex('She failed the entrance exam twice, but she didn\'t give up and passed on the third try.', 'Ela reprovou no vestibular duas vezes, mas não desistiu e passou na terceira tentativa.', 'Persistência com conectores.'),
    ],
    productionTasks: [
      task('Escreva 4 eventos importantes da sua vida usando os verbos aprendidos.'),
      task('Conecte dois eventos com "when" ou "after": "I [event1] when I [event2]."'),
      task('Descreva um milestone da sua vida em 2-3 frases.'),
    ],
    finalChecklist: [
      task('Usei graduate FROM (não "of")?'),
      task('Usei get married (não "marry with")?'),
      task('Conectei eventos com when, after, because?'),
      task('Consegui falar de pelo menos 3 eventos da minha vida?'),
    ],
    selfAssessment: [
      task('Consigo descrever 3 eventos importantes da minha vida em inglês?'),
      task('Sei a diferença entre grow up e grow?'),
      task('Consigo usar milestone e turning point em contexto?'),
    ],
    lessonRecap: [
      'Eventos de vida usam verbos específicos — não traduza literalmente.',
      'graduate FROM, move TO, apply FOR, get married (not "with").',
      'Conecte eventos com when, after that, because, so.',
      'Milestone = marco importante; turning point = ponto de virada.',
    ],
    nextLessonBridge: 'Com esse vocabulário, você estará pronto para a aula de Reading B1, onde vai ler uma carta pessoal mais longa e praticar inferência e resumo.',
  }),

  // ─── READING ─────────────────────────────────────────────────────────────────
  createReadingLesson({
    ...common,
    id: 'B1-READING-001',
    order: 1,
    title: 'A personal letter: bridging A2 and B1',
    objectives: [
      'Ler uma carta pessoal mais longa que os textos do A2.',
      'Identificar eventos do passado, situação atual e planos futuros no texto.',
      'Responder perguntas com evidência textual.',
      'Inferir sentimentos e atitudes a partir do texto.',
      'Produzir um pequeno resumo escrito.',
    ],
    teacherOpening: 'No A2, você leu textos curtos e diretos — mensagens de hotel, texto de instruções, histórias simples. No B1, os textos são mais longos, têm mais camadas e exigem que você leia com mais atenção. Esta aula usa uma carta pessoal — um formato rico em tempo verbal, emoção e contexto.',
    whyItMatters: 'Uma carta pessoal combina passado (o que aconteceu), presente (como está a pessoa agora) e futuro (o que planeja). Ler esse tipo de texto treina os três tempos ao mesmo tempo, além de inferência sobre como o escritor se sente.',
    differenceFromA2: 'No A2, você lia textos com 80-120 palavras e respondia perguntas diretas. No B1, o texto tem 180-250 palavras, as perguntas pedem evidência textual e algumas respostas exigem inferência — você precisa entender o que o texto sugere, não só o que ele diz.',
    mainText: `Dear Ana,

I hope you're doing well. I've been meaning to write for a while, but life has been quite busy lately.

A lot has changed since we last spoke. As you know, I moved to a new city at the beginning of the year. At first, it was difficult. I didn't know anyone here, and I missed my family a lot. But slowly things got better. I found a good routine, made a few friends at work and started to feel more at home.

The job itself is going well. It's more demanding than my old position, but I'm learning a lot. My manager is supportive, which really helps. I've already finished two big projects, and I'm quite proud of that.

One thing I didn't expect was how much free time I'd have in the evenings. Back in São Paulo, I was always busy. Here, I've started cooking more, which I really enjoy. I've also joined a book club — something I always wanted to do but never had time for.

I'm planning to visit home in July. I can't wait to see everyone again. Let me know if you'll be around — it would be lovely to catch up in person.

Take care,
Clara`,
    readingSkillFocus: 'Identificar estrutura temporal (passado / presente / plano futuro) e inferir atitude emocional do escritor.',
    firstReadTask: task('Leia o texto uma vez sem parar. Qual é a ideia principal de cada parágrafo? Anote em uma palavra ou frase curta por parágrafo.'),
    secondReadTask: task('Releia focando em: quando Clara se mudou, como ela se sentiu no começo, o que mudou desde então e o que ela planeja.'),
    comprehensionQuestions: [
      q(
        'Why has Clara been busy lately?',
        'Because she moved to a new city and has been adapting to a new job and life.',
        '"life has been quite busy lately" and "I moved to a new city at the beginning of the year"',
        'The text combines general busyness with the specific change of moving.'
      ),
      q(
        'How did Clara feel when she first arrived?',
        'She felt lonely and missed her family.',
        '"it was difficult. I didn\'t know anyone here, and I missed my family a lot"',
        'Evidence is direct — the reader can quote the text.'
      ),
      q(
        'What is one thing she is proud of in her new job?',
        'She has already finished two big projects.',
        '"I\'ve already finished two big projects, and I\'m quite proud of that."',
        'Direct evidence with Present Perfect.'
      ),
      q(
        'Why did Clara join a book club? (inference)',
        'Because she now has more free time in the evenings and it was something she had always wanted to do.',
        '"I\'ve also joined a book club — something I always wanted to do but never had time for."',
        'This is inference + evidence — the reason is explained in the same sentence.'
      ),
      q(
        'What is Clara planning to do in July?',
        'She is planning to visit home and see her family and friends.',
        '"I\'m planning to visit home in July."',
        'Future plan with simple evidence.'
      ),
    ],
    vocabularyInContext: [
      task('What does "quite busy" mean? Is it more or less than "very busy"?', '', '"Quite" = fairly/moderately, slightly less intense than "very" in British English.'),
      task('What does "demanding" mean in "It\'s more demanding than my old position"?', '', 'Demanding = requires a lot of effort, challenging.'),
      task('What does "supportive" mean?', '', 'Supportive = helps you, encourages you, is on your side.'),
      task('What does "catch up in person" mean?', '', 'Catch up = talk and share news after not seeing someone for a while. In person = face to face.'),
    ],
    inferenceQuestions: [
      task('Is Clara happy in her new city? Use evidence from the text.', '', 'Yes — she says things "got better", she\'s "proud" of work, she enjoys cooking and the book club.'),
      task('Does Clara still feel lonely? Explain.', '', 'No — she says she "made a few friends at work" and "started to feel more at home."'),
      task('How does Clara feel about visiting home?', '', 'Excited — "I can\'t wait to see everyone again."'),
    ],
    guidedSummary: task(
      'Escreva um resumo de 3-4 frases sobre a carta. Inclua: onde Clara está, como está o trabalho, o que ela faz no tempo livre e o que ela planeja.',
      'Use: She moved to... / She works... / She has started... / She is planning to...',
      'Clara moved to a new city at the beginning of the year. Her new job is demanding but she is learning a lot. In her free time, she has started cooking and joined a book club. She is planning to visit home in July.'
    ),
    productionTask: task(
      'Escreva 3-4 frases como resposta de Ana para Clara. Inclua: uma reação ao que Clara disse, uma notícia sobre sua própria vida e uma pergunta para Clara.',
      'Use: I\'m so glad to hear... / That sounds... / I\'ve been... / Are you...?',
    ),
    finalChecklist: [
      task('Identifiquei a estrutura temporal do texto (passado / presente / plano)?'),
      task('Respondi com evidência textual, não só opinião?'),
      task('Entendi as perguntas de inferência?'),
      task('Produzi um resumo coerente em 3-4 frases?'),
    ],
    selfAssessment: [
      task('Consigo ler um texto de 200-250 palavras e identificar as ideias principais?'),
      task('Consigo responder perguntas com evidência do texto?'),
      task('Consigo fazer inferências sobre sentimentos a partir do texto?'),
    ],
    lessonRecap: [
      'Textos B1 são mais longos e têm estrutura temporal: passado / presente / plano.',
      'Perguntas de evidência pedem que você cite o texto.',
      'Perguntas de inferência pedem que você interprete o que o texto sugere.',
      'Resumo organizado: quem, o que aconteceu, como está agora, o que planeja.',
    ],
    nextLessonBridge: 'Na próxima aula, você vai ouvir uma conversa mais longa entre duas pessoas e praticar identificar sequência e detalhes — o Listening B1 começa aqui.',
  }),

  // ─── LISTENING ───────────────────────────────────────────────────────────────
  createListeningLesson({
    ...common,
    id: 'B1-LISTENING-001',
    order: 1,
    title: 'A longer weekend conversation',
    objectives: [
      'Ouvir uma conversa mais longa que os diálogos do A2.',
      'Identificar o que cada pessoa fez no fim de semana.',
      'Prestar atenção em conectores de sequência: first, then, after that, later.',
      'Inferir o tom emocional dos falantes.',
      'Praticar shadowing de trechos naturais.',
    ],
    teacherOpening: 'No A2, você ouvia diálogos curtos e diretos. No B1, as conversas são mais longas, os falantes dão mais detalhes e usam conectores de sequência. Essa aula treina ouvir esses detalhes e entender como a conversa se desenvolve.',
    whyItMatters: 'Em inglês real, as pessoas não falam em frases curtas e isoladas. Elas contam histórias, dão contexto, mudam de assunto e reagem ao que o outro disse. Treinar isso no listening prepara você para entender inglês real.',
    differenceFromA2: 'No A2, você ouvia frases isoladas ou diálogos de 4-6 linhas. No B1, a conversa tem 12-15 linhas, os falantes desenvolvem ideias e você precisa acompanhar a sequência e os detalhes sem perder o fio.',
    audioDescription: 'Conversa entre dois colegas de trabalho, Mark e Sara, na segunda-feira de manhã. Eles contam o que fizeram no fim de semana.',
    transcript: `Mark: Hey Sara, how was your weekend?
Sara: It was really good, actually. I had a pretty packed schedule. What about you?
Mark: Not bad. I went to a friend's birthday on Saturday, which was fun. We had dinner at a restaurant downtown, and then we went to a bar afterwards. I didn't get home until midnight, so Sunday I just rested.
Sara: Ha, sounds like a late night! I had a long Saturday too, but for different reasons. I started the day early — I went to a farmers' market in the morning, which I love doing. Then in the afternoon my sister visited, so we cooked together and spent the evening catching up.
Mark: That sounds really nice. I haven't seen my family in a while.
Sara: You should call them! Anyway, Sunday was different — I went running in the park, which I'd been meaning to do for weeks, and then I spent the afternoon working on a project.
Mark: A project on Sunday? That sounds stressful.
Sara: Not really. It was a personal project — I've been learning to draw. It's actually quite relaxing.
Mark: Wow, I didn't know that. How long have you been doing it?
Sara: About three months. I'm not great yet, but I enjoy it.`,
    firstListenTask: task('Ouça sem ler o transcript. Responda: O que Mark fez no fim de semana? O que Sara fez?', 'Anote palavras-chave apenas, sem frases completas.'),
    secondListenTask: task('Ouça novamente focando nos conectores de sequência: first, then, after that, afterwards, so, which. Marque onde aparecem no transcript.'),
    listeningComprehension: [
      q('What did Mark do on Saturday night?', 'He went to a friend\'s birthday dinner and then to a bar, arriving home at midnight.', '"We had dinner at a restaurant downtown, and then we went to a bar afterwards. I didn\'t get home until midnight"'),
      q('Why did Mark rest on Sunday?', 'Because he got home late on Saturday night.', '"I didn\'t get home until midnight, so Sunday I just rested."', 'so indicates consequence.'),
      q('What did Sara do on Saturday morning?', 'She went to a farmers\' market.', '"I went to a farmers\' market in the morning"'),
      q('What is Sara\'s personal project?', 'She has been learning to draw.', '"I\'ve been learning to draw. It\'s actually quite relaxing."'),
      q('How long has Sara been learning to draw?', 'About three months.', '"About three months."'),
    ],
    sequenceTracking: [
      task('List Sara\'s Saturday in order: 1. ___ 2. ___ 3. ___', '', '1. Went to a farmers\' market. 2. Sister visited, they cooked together. 3. Spent the evening catching up.'),
      task('List Sara\'s Sunday in order: 1. ___ 2. ___', '', '1. Went running in the park. 2. Spent the afternoon on her drawing project.'),
    ],
    inferenceQuestions: [
      task('What does Sara\'s tone suggest about her weekend? Was she happy or stressed?', '', 'Happy and relaxed — she describes activities positively: "which I love doing", "quite relaxing".'),
      task('How does Mark feel when Sara mentions she hasn\'t seen his family in a while?', '', 'A little guilty or nostalgic — "I haven\'t seen my family in a while."'),
    ],
    dictationExercise: task('Ouça estes trechos e escreva o que ouvir:', 'Trechos: (1) "I didn\'t get home until midnight, so Sunday I just rested." (2) "I\'ve been learning to draw. It\'s actually quite relaxing."'),
    shadowingTargets: [
      phrase('I had a pretty packed schedule.', 'Tive uma agenda bastante cheia.', 'Entonação natural de resposta entusiasmada.'),
      phrase('That sounds really nice.', 'Isso parece muito bom.', 'Reação empática — tom suave e sincero.'),
      phrase('I\'ve been learning to draw. It\'s actually quite relaxing.', 'Tenho aprendido a desenhar. É bastante relaxante, na verdade.', 'Present Perfect Continuous + avaliação.'),
    ],
    chunkFocus: [
      task('"packed schedule" — o que significa?', '', 'Agenda muito cheia, sem tempo livre.'),
      task('"catching up" — o que significa?', '', 'Colocar o papo em dia, se atualizar com alguém.'),
      task('"I\'d been meaning to do" — o que isso indica?', '', 'Algo que você queria fazer há algum tempo mas não tinha feito.'),
    ],
    productionTask: task(
      'Sem olhar o transcript: descreva seu fim de semana em 5-6 frases usando os conectores da aula (first, then, after that, so, which).',
    ),
    finalChecklist: [
      task('Identifiquei o que cada pessoa fez sem ler o transcript na primeira escuta?'),
      task('Pratiquei shadowing de pelo menos 2 trechos?'),
      task('Entendi como so conecta causa e consequência na fala?'),
      task('Produzi uma descrição do meu fim de semana com conectores?'),
    ],
    selfAssessment: [
      task('Consigo entender a sequência de eventos em uma conversa de 10-15 linhas?'),
      task('Reconheço conectores de sequência no áudio?'),
      task('Consigo fazer shadowing de frases naturais de 8-12 palavras?'),
    ],
    lessonRecap: [
      'Conversas B1 são mais longas e os falantes dão contexto e detalhes.',
      'Conectores de sequência: first, then, after that, afterwards, so, which.',
      'Inferência sobre tom emocional: palavras positivas/negativas + entonação.',
      'Shadowing de trechos naturais é essencial para internalizá-los.',
    ],
    nextLessonBridge: 'Na próxima aula de Speaking, você vai praticar falar sobre uma experiência passada com mais detalhes — usando exatamente os conectores que ouviu hoje.',
  }),

  // ─── SPEAKING ────────────────────────────────────────────────────────────────
  createSpeakingLesson({
    ...common,
    id: 'B1-SPEAKING-001',
    order: 1,
    title: 'Talk about a past experience with more detail',
    objectives: [
      'Falar sobre uma experiência passada usando pelo menos 5-6 frases conectadas.',
      'Usar conectores de sequência e causa: first, then, so, because, although.',
      'Incluir reação emocional e detalhes contextuais.',
      'Evitar pausas longas substituindo hesitation com fillers naturais.',
      'Gravar uma resposta de 60-90 segundos.',
    ],
    teacherOpening: 'No A2, você aprendeu a contar o que fez: "I went to the cinema. It was good." No B1, você conta a experiência completa: o que fez, o contexto, o que aconteceu de interessante, como se sentiu e o que pensa sobre isso. É isso que separa um falante A2 de um falante B1.',
    whyItMatters: 'Em conversas reais, ninguém quer ouvir só "I went and it was good." As pessoas querem detalhes que tornam a história interessante. Esse padrão de falar mais desenvolvidamente é o que B1 exige.',
    differenceFromA2: 'No A2, você descrevia uma ação + opinião simples. No B1, você descreve: (1) o contexto — quando, onde, com quem; (2) o que aconteceu — em sequência; (3) um momento específico — detalhe marcante; (4) como se sentiu; (5) o que aprendeu ou pensa agora.',
    speakingModel: {
      prompt: 'Tell me about a trip you have taken.',
      a2Response: 'I went to Florianópolis last year. It was very beautiful. I liked the beach.',
      b1Response: 'Last year I took a trip to Florianópolis with some friends. We stayed for four days. The weather was great, although it rained on the last day, which was a bit disappointing. We went to several beaches — my favorite was Joaquina because it was less crowded. I\'d definitely go back. It was one of the best trips I\'ve taken.',
      analysis: [
        'Contexto: "with some friends", "four days".',
        'Sequência: "We went to several beaches".',
        'Detalhe específico: "my favorite was Joaquina because..."',
        'Reação emocional: "a bit disappointing", "definitely go back".',
        'Avaliação final: "one of the best trips I\'ve taken".',
      ],
    },
    substitutionDrills: [
      {
        base: 'I went to [PLACE] with [PEOPLE] for [TIME].',
        substitutions: ['Rio de Janeiro / my sister / a week', 'the coast / some friends / a long weekend', 'the mountains / my family / three days'],
      },
      {
        base: 'The highlight was [DETAIL] because [REASON].',
        substitutions: ['the food / it was unlike anything I\'d had before', 'a hike we did / the view from the top was incredible', 'an unexpected meeting / I bumped into an old friend'],
      },
    ],
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow the B1 model aloud: "Last year I took a trip to Florianópolis with some friends." Stress content words: TRIP, FlorianÓpolis, FRIENDS.',
        '"Although it rained" — link "although-it" smoothly: /ɔːlˈðəʊ.ɪt/. Practise the chunk three times.',
        '"I\'d definitely go back" — stress DEFinitely; reduce "I\'d" to a quick /aɪd/.',
        '"One of the best trips I\'ve taken" — practise the rising-falling intonation of a final evaluation.',
      ],
    },
    preparationQuestions: [
      task('Think of a trip or experience. When was it?'),
      task('Who were you with?'),
      task('What happened — in order? (at least 3 events)'),
      task('What was the highlight? Why?'),
      task('Was there anything difficult or unexpected?'),
      task('How did you feel at the end?'),
    ],
    languageToolkit: [
      phrase('It was back in [year/month]...', 'Foi lá em...', 'Natural way to set the time context.'),
      phrase('I was there for [time period].', 'Fiquei lá por...'),
      phrase('At first... but then...', 'A princípio... mas depois...', 'Contraste de expectativa vs realidade.'),
      phrase('The best/worst part was...', 'A melhor/pior parte foi...'),
      phrase('What I remember most is...', 'O que mais me lembro é...'),
      phrase('Looking back, I think...', 'Olhando para trás, acho que...', 'Reflexão ao final.'),
      phrase('I\'d definitely do it again.', 'Com certeza faria de novo.', 'Avaliação final positiva.'),
    ],
    hesitationFillers: [
      phrase('Well...', '', 'Natural hesitation filler.'),
      phrase('Let me think...', '', 'Buys time naturally.'),
      phrase('How can I put it...', '', 'Used when searching for a word.'),
      phrase('What I mean is...', '', 'Used to clarify.'),
    ],
    guidedPractice: [
      task('Responda em voz alta: "What did you do last weekend?" — 4-5 frases, use at least 2 connectors.'),
      task('Responda em voz alta: "Tell me about a time you visited a new place." — 5-6 frases.'),
      task('Expanda: "I had a good day yesterday." → conte a história em 5 frases.'),
    ],
    speakingPrompts: [
      'Tell me about a time you tried something new.',
      'Describe a day that didn\'t go as planned.',
      'Talk about a place you visited that surprised you.',
    ],
    checklistBeforeRecording: [
      task('Tenho o contexto (quando, onde, com quem)?'),
      task('Tenho pelo menos 3 eventos em sequência?'),
      task('Incluí uma reação emocional?'),
      task('Adicionei um detalhe específico marcante?'),
      task('Tenho uma avaliação final?'),
    ],
    recordingTask: task(
      'Grave uma resposta de 60-90 segundos respondendo: "Tell me about a memorable experience from the last year or two."',
      'Use: first, then, because, although, what I remember most is, looking back...'
    ),
    selfEvaluation: [
      task('Quantas frases conectadas produzi? (meta: 5+)'),
      task('Usei pelo menos 2 conectores diferentes?'),
      task('Pausei demais no meio ou mantive fluxo natural?'),
      task('Incluí emoção e detalhe específico?'),
    ],
    masteryTarget: 'Produzir uma resposta de 5-7 frases conectadas sobre uma experiência passada, com contexto, sequência, detalhe e avaliação final, em 60-90 segundos.',
    lessonRecap: [
      'Uma resposta B1 tem: contexto + sequência + detalhe + reação + avaliação.',
      'Conectores essenciais: first, then, because, so, although, which.',
      'Fillers naturais evitam pausas longas: well, let me think, how can I put it.',
      'Detalhes específicos tornam a história interessante — não fale só em generalizações.',
    ],
    nextLessonBridge: 'Na próxima aula de gramática, você vai aprender o Past Continuous — fundamental para contar histórias com background e ação interrompida.',
  }),

]);

export const B1_DEEP_BRIDGE_PART1_BY_PILLAR = Object.freeze({
  grammar: B1_DEEP_BRIDGE_PART1.filter(l => l.pillar === 'grammar'),
  vocabulary: B1_DEEP_BRIDGE_PART1.filter(l => l.pillar === 'vocabulary'),
  reading: B1_DEEP_BRIDGE_PART1.filter(l => l.pillar === 'reading'),
  listening: B1_DEEP_BRIDGE_PART1.filter(l => l.pillar === 'listening'),
  speaking: B1_DEEP_BRIDGE_PART1.filter(l => l.pillar === 'speaking'),
  writing: B1_DEEP_BRIDGE_PART1.filter(l => l.pillar === 'writing'),
});
