import { createGrammarLesson, createVocabularyLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'B1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['b1-1', 'bridge', 'a2-to-b1', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function ex(text, translation, why = '', warning = '') { return { text, translation, why, warning }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }

export const B1_DEEP_BRIDGE_PART2 = Object.freeze([

  // ─── GRAMMAR ────────────────────────────────────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B1-GRAMMAR-002',
    order: 2,
    title: 'Developing longer answers: from sentences to ideas',
    objectives: [
      'Transformar respostas isoladas em fala desenvolvida e conectada.',
      'Usar relative clauses simples (who, which) para adicionar informação.',
      'Usar comment clauses: which was..., which I found..., which helped...',
      'Produzir respostas de 3-5 frases sem depender do interlocutor.',
    ],
    teacherOpening: 'Uma das maiores diferenças entre A2 e B1 não é o vocabulário — é a capacidade de continuar falando sem parar. No A2, a tendência é dar uma resposta e esperar. No B1, você aprende a adicionar informação, comentar e conectar, criando um fluxo natural de fala.',
    whyItMatters: 'Em entrevistas, conversas sociais e apresentações, a habilidade de desenvolver ideias sem hesitar é o que caracteriza o falante B1. Quem para depois de cada frase curta parece menos fluente, mesmo que o vocabulário esteja correto.',
    differenceFromA2: 'No A2, você aprende a conectar duas frases (because, so, but). No B1, você adiciona camadas: a relative clause comenta o substantivo, o comment clause avalia o que você disse, e a frase seguinte amplia ou contrasta.',
    realLifeUseCases: [
      'Responder perguntas de entrevista sem parecer robótico.',
      'Descrever lugares, pessoas e situações com mais detalhes.',
      'Contar histórias com contexto e reação.',
      'Sustentar conversas sem precisar que o interlocutor sempre pergunte algo novo.',
    ],
    conceptExplanation: 'Para desenvolver respostas, você usa três ferramentas: (1) Relative clauses adicionam informação sobre um substantivo: "I met a person who speaks five languages." (2) Comment clauses avaliam o que acabou de dizer: "...which was surprising." (3) Adverbial phrases adicionam contexto de tempo/lugar/modo: "at the time", "honestly", "in general". Combinadas, essas ferramentas transformam frases isoladas em discurso fluente.',
    mentalModel: {
      title: 'Frase base + informação + comentário',
      summary: 'Cada frase pode crescer com uma relative clause e um comentário.',
      steps: [
        'Base: "I went to a restaurant."',
        '+ relative: "...which had just opened."',
        '+ comment: "...which was a really nice experience."',
        'Final: "I went to a restaurant which had just opened, which was a really nice experience."',
      ],
    },
    stepByStep: [
      task('Dê a resposta principal (frase completa).'),
      task('Adicione uma relative clause com who (para pessoa) ou which (para coisa).'),
      task('Avalie com comment clause: which was/which I found + adjetivo.'),
      task('Expanda com uma nova ideia: because, so, although.'),
      task('Adicione detalhes de contexto: at the time, in general, honestly.'),
    ],
    portugueseContrast: [
      task('Em português, "o qual / a qual" é formal. Em inglês, which é neutro e natural na fala.'),
      task('"Which was nice" = "o que foi bacana" — comentário sobre tudo que precede.'),
      task('Não use "what" como relative pronoun para coisas em contexto restritivo: "The book which/that I read" — não "the book what I read."'),
      task('Who é para pessoas; which é para coisas; that pode substituir ambos em relativas restritivas.'),
    ],
    guidedDiscovery: [
      task('Qual é a relative clause em: "I talked to a colleague who works in marketing"?', '', '"who works in marketing"'),
      task('O que "which was" comenta em: "We had dinner outside, which was lovely"?', '', 'Comenta toda a situação descrita: "We had dinner outside."'),
      task('Por que "which I found" é útil?', '', 'Adiciona sua reação/avaliação pessoal.'),
    ],
    guidedBeforeQuiz: [
      task('Expanda: "I saw a film." → adicione which/who e um comentário.', '', 'I saw a film which had great reviews, which I found really entertaining.'),
      task('Expanda: "I met someone." → relative + comentário.', '', 'I met someone who had lived in Brazil, which was a great coincidence.'),
      task('Expanda: "We went to a coffee shop." → relative + comentário.', '', 'We went to a coffee shop which had just opened in our area, which was quite nice.'),
    ],
    grammarGoal: 'Produzir respostas de 3-5 frases usando relative clauses e comment clauses naturalmente.',
    formationGuide: [
      task('Relative restritiva (who): [noun] + who + [verb phrase]', '"She\'s a teacher who works with adults."'),
      task('Relative restritiva (which): [noun] + which + [verb phrase]', '"I read a book which changed my life."'),
      task('Comment clause (which was): [sentence], which was [adjective].', '"We arrived late, which was embarrassing."'),
      task('Comment clause (which I found): [sentence], which I found [adjective].', '"The talk was short, which I found a bit disappointing."'),
    ],
    whenToUse: [
      task('Use who para adicionar informação sobre pessoas.'),
      task('Use which para adicionar informação sobre coisas, lugares ou situações.'),
      task('Use "which was..." quando quiser comentar ou avaliar algo que acabou de dizer.'),
      task('Use "which I found..." quando a avaliação for pessoal.'),
    ],
    whenNotToUse: [
      task('Não use "what" como relative pronoun para coisas: "the film what I saw" é errado.'),
      task('Não sobrecarregue com 3+ relative clauses na mesma frase.'),
      task('Não comece with "which" sem ter uma frase completa antes.'),
    ],
    grammarTable: [
      { pattern: 'who (person)', example: 'I know a doctor who specializes in skin.', translation: 'Conheço um médico que é especialista em pele.' },
      { pattern: 'which (thing/situation)', example: 'I bought a laptop which was on sale.', translation: 'Comprei um notebook que estava em promoção.' },
      { pattern: 'which was (comment)', example: 'We missed the bus, which was annoying.', translation: 'Perdemos o ônibus, o que foi irritante.' },
      { pattern: 'which I found (personal)', example: 'The class was intense, which I found useful.', translation: 'A aula foi intensa, o que achei útil.' },
    ],
    teacherExamples: [
      ex('I met a colleague who\'s been working there for 15 years, which was impressive.', 'Conheci um colega que trabalha lá há 15 anos, o que foi impressionante.', 'Relative + comment clause.'),
      ex('We visited a town which had been closed for years, which I found quite moving.', 'Visitamos uma cidade que havia estado fechada por anos, o que achei bastante emocionante.', 'Passive in relative + personal comment.'),
      ex('She gave a presentation which lasted two hours, which I found a bit long, honestly.', 'Ela fez uma apresentação que durou duas horas, o que achei um pouco longo, honestamente.', '"Honestly" adiciona naturalidade.'),
    ],
    commonBrazilianMistakes: [
      mistake('The film what I saw was good.', 'The film which I saw was good. / The film I saw was good.', '"what" não é relative pronoun restritivo.'),
      mistake('I met a person which is a doctor.', 'I met a person who is a doctor.', 'Para pessoa, use who.'),
      mistake('We arrived late. Which was bad.', 'We arrived late, which was bad.', 'Comment clause é parte da mesma frase — não use ponto.'),
      mistake('I found it interesting which.', 'I found it interesting, which surprised me.', '"Which" comment clause vem depois da vírgula, não depois do adjetivo.'),
    ],
    guidedPractice: [q('Qual frase usa relative clause corretamente?', 'I met a colleague who’s been working there for fifteen years.', '', 'Who introduz informação adicional sobre a pessoa (colleague).', ['I met a colleague who’s been working there for fifteen years.', 'I met a colleague which been working there for fifteen years.', 'I met a colleague who’s been work there for fifteen years here.']), q('Escolha a frase com comment clause natural.', 'We visited a town which had been closed, which I found quite moving.', '', 'Which I found funciona como comentário pessoal sobre a experiência.', ['We visited a town which had been closed, which I found quite moving.', 'We visited a town that had been closed, that I found quite moving it.', 'We visited a town which had been closed, what I found quite moving.'])],
    controlledPractice: [
      task('Complete: I have a friend ___ lives in London.', 'who'),
      task('Complete: I bought a bag ___ was 50% off.', 'which'),
      task('Complete: We got there early, ___ was a good idea.', 'which'),
      task('Complete: She told a story ___ I found very moving.', 'which'),
    ],
    errorCorrectionPractice: [
      task('Corrija: The book what I read was amazing.', 'The book which I read was amazing. / The book I read was amazing.'),
      task('Corrija: I spoke to a person which helped me.', 'I spoke to a person who helped me.'),
      task('Corrija: We won the game. Which was great.', 'We won the game, which was great.'),
    ],
    transformationPractice: [
      task('Una: "I read a book. It had 600 pages."', 'I read a book which had 600 pages.'),
      task('Una: "I talked to a manager. She is very experienced."', 'I talked to a manager who is very experienced.'),
      task('Adicione comentário: "We arrived late."', 'We arrived late, which was a bit embarrassing.'),
    ],
    translationPractice: [
      task('Comprei uma mochila que estava em oferta, o que foi ótimo.', 'I bought a backpack which was on sale, which was great.'),
      task('Ela tem um irmão que fala quatro línguas.', 'She has a brother who speaks four languages.'),
      task('A reunião foi cancelada, o que achei frustrante.', 'The meeting was cancelled, which I found frustrating.'),
    ],
    productionTasks: [
      task('Escreva 3 frases sobre pessoas que você conhece usando who + relative clause.'),
      task('Escreva 3 frases sobre situações recentes usando "which was..." como comentário.'),
      task('Descreva um evento recente em 4-5 frases usando relative clauses e comment clauses.'),
    ],
    finalChecklist: [
      task('Usei who para pessoas e which para coisas/situações?'),
      task('Não usei "what" como relative pronoun restritivo?'),
      task('Usei vírgula antes de "which was" (comment clause)?'),
      task('Produzi resposta de 3+ frases com pelo menos uma relative clause?'),
    ],
    selfAssessment: [
      task('Consigo adicionar uma relative clause a qualquer substantivo naturalmente?'),
      task('Sei usar "which was / which I found" para comentar?'),
      task('Consigo produzir uma resposta de 4-5 frases sem parar?'),
    ],
    lessonRecap: [
      'who = pessoa; which = coisa ou situação.',
      '"which was..." comenta a frase inteira — use vírgula antes.',
      '"which I found..." é mais pessoal — mostra sua reação.',
      'Relative clauses + comment clauses = fala B1 fluente.',
    ],
    nextLessonBridge: 'Na próxima aula, você vai aprender vocabulário de sentimentos e reações — essencial para usar os comment clauses com mais variedade e precisão.',
  }),

  // ─── VOCABULARY ─────────────────────────────────────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B1-VOCABULARY-002',
    order: 2,
    title: 'Feelings, attitudes and reactions',
    objectives: [
      'Aprender vocabulário de sentimentos e reações para além de happy/sad/good/bad.',
      'Usar adjetivos de atitude para avaliar experiências e situações.',
      'Diferenciar sentimentos temporários de estados mais duradouros.',
      'Usar esse vocabulário em comment clauses e narrativas pessoais.',
    ],
    teacherOpening: 'No B1, você começa a avaliar, reagir e comentar com mais precisão. "It was good" ou "I was happy" são A2. No B1, você diz "I found it surprisingly moving" ou "It was a bit overwhelming at first." Essa aula expande seu vocabulário emocional para o nível B1.',
    whyItMatters: 'Sentimentos e reações são o que tornam uma história interessante. Sem esse vocabulário, você descreve eventos mas não os avalia — e avaliação é o que B1 exige. Além disso, esse vocabulário aparece em quase todo texto de Reading e Listening B1.',
    differenceFromA2: 'No A2, você usava: happy, sad, tired, excited, worried, stressed. No B1, você adiciona nuance: overwhelmed, relieved, puzzled, touched, impressed, frustrated, conflicted, anxious, content, grateful.',
    realLifeUseCases: [
      'Descrever como você reagiu a uma situação.',
      'Expressar sentimentos em conversas sobre trabalho e vida pessoal.',
      'Entender personagens em textos de Reading.',
      'Usar em comment clauses: "which I found moving", "which left me feeling confused."',
    ],
    conceptExplanation: 'Adjetivos de sentimento em inglês são usados de duas formas: (1) após to be: "I was overwhelmed." (2) após find/feel/leave: "I found it moving." "It left me feeling confused." No B1, você também adiciona adjetivos compostos: "thought-provoking", "eye-opening", "heart-warming."',
    mentalModel: {
      title: 'Grau de intensidade',
      summary: 'De neutro a intenso: content → pleased → happy → thrilled → overjoyed.',
      steps: [
        'Positivo: content → pleased → happy → thrilled → overjoyed → moved',
        'Negativo: uneasy → anxious → worried → stressed → overwhelmed',
        'Avaliativo: disappointing → frustrating → upsetting → devastating',
      ],
    },
    stepByStep: [
      task('Aprenda os adjetivos com exemplos situacionais.'),
      task('Identifique o grau (leve, médio, intenso).'),
      task('Pratique com find/feel/leave.'),
      task('Use em comment clauses: "which I found..."'),
      task('Conecte a uma experiência pessoal.'),
    ],
    portugueseContrast: [
      task('"Overwhelmed" = sobrecarregado/a emocionalmente ou de tarefas — não tem tradução perfeita em uma palavra.'),
      task('"Relieved" = aliviado/a — a sensação específica de quando algo ruim não aconteceu ou terminou.'),
      task('"Touched" = tocado/a emocionalmente — não "tocado" no sentido físico.'),
      task('"Puzzled/confused" — puzzled sugere curiosidade + confusão; confused é mais geral.'),
    ],
    guidedDiscovery: [
      task('Qual a diferença entre "happy" e "relieved"?', '', '"Happy" é geral. "Relieved" é a felicidade específica de quando algo ruim não aconteceu.'),
      task('O que significa "I found the film thought-provoking"?', '', 'O filme me fez pensar de forma profunda.'),
      task('Qual é mais forte: "worried" ou "overwhelmed"?', '', '"Overwhelmed" é mais intenso — sentir-se incapaz de lidar com tudo.'),
    ],
    guidedBeforeQuiz: [
      task('Qual adjetivo descreve a sensação de terminar um trabalho difícil?', '', 'Relieved / proud'),
      task('Qual adjetivo descreve a sensação de receber notícia inesperada boa?', '', 'Surprised / delighted / thrilled'),
      task('Qual adjetivo descreve assistir algo que faz você pensar muito?', '', 'Thought-provoking / moving / eye-opening'),
    ],
    topicContext: 'Sentimentos, atitudes e reações emocionais para uso em narrativas e avaliações pessoais.',
    essentialWords: [
      vocab('overwhelmed', 'sobrecarregado/a', 'I felt overwhelmed by the amount of work.', 'Muito mais que stressed — sensação de perder o controle.'),
      vocab('relieved', 'aliviado/a', 'I was relieved when she called back.', 'Alívio específico pós-tensão.'),
      vocab('touched', 'emocionado/a (positivo)', 'I was really touched by her message.', 'Tocado pelo coração, não fisicamente.'),
      vocab('impressed', 'impressionado/a', 'We were impressed by the quality.', 'Positivo — melhor do que esperado.'),
      vocab('frustrated', 'frustrado/a', 'I felt frustrated by the delay.', 'Quando algo não sai como planejado.'),
      vocab('puzzled', 'intrigado/a; sem entender', 'I was puzzled by his reaction.', 'Confusão + curiosidade.'),
      vocab('content', 'satisfeito/a; tranquilo/a', 'She seemed content with the result.', 'Mais quieto que "happy" — paz interior.'),
      vocab('anxious', 'ansioso/a', 'I was anxious about the presentation.', 'Ansiedade antecipatória.'),
      vocab('grateful', 'grato/a', 'I\'m really grateful for your help.', 'Gratidão específica por algo.'),
      vocab('disappointed', 'decepcionado/a', 'I was disappointed with the outcome.', 'Expectativa não atendida.'),
      vocab('moved', 'comovido/a', 'The speech really moved me.', 'Emoção profunda, positiva ou neutra.'),
      vocab('conflicted', 'em conflito interno', 'I felt conflicted about leaving.', 'Querer dois opostos ao mesmo tempo.'),
      vocab('thought-provoking', 'que provoca reflexão', 'It was a thought-provoking film.', 'Composto — adjetivo de avaliação.'),
      vocab('eye-opening', 'que abre os olhos; revelador', 'The documentary was eye-opening.', 'Descoberta que muda perspectiva.'),
      vocab('heart-warming', 'que aquece o coração', 'What a heart-warming story.', 'Positivo — histórias tocantes.'),
      vocab('bittersweet', 'agridoce', 'It was a bittersweet goodbye.', 'Misto de alegria e tristeza.'),
    ],
    chunks: [
      { chunk: 'I found it [adj]', translation: 'Achei [adj]', example: 'I found it surprisingly moving.' },
      { chunk: 'It left me feeling [adj]', translation: 'Me deixou com a sensação de [adj]', example: 'The film left me feeling hopeful.' },
      { chunk: 'which I found [adj]', translation: 'o que achei [adj]', example: 'The lecture was dense, which I found a bit overwhelming.' },
      { chunk: 'to be honest', translation: 'sendo honesto/a', example: 'To be honest, I was a bit disappointed.' },
      { chunk: 'mixed feelings about', translation: 'sentimentos misturados sobre', example: 'I have mixed feelings about the decision.' },
    ],
    pronunciationFocus: {
      title: 'Foco sonoro',
      tips: [
        '"Overwhelmed" — stress em "WHELMED": o-ver-WHELMED.',
        '"Relieved" — o "ie" soa /iː/: ri-LEEVED.',
        '"Grateful" — GRAY-ful — não "grAteful."',
      ],
    },
    dangerousConfusions: [
      task('"Touched" (emocionado) ≠ "touched" (tocado fisicamente) — contexto define o significado.'),
      task('"Content" (satisfeito) — pronuncia-se "con-TENT", não "CON-tent" (conteúdo/substantivo).'),
      task('"Anxious" pode ser positivo (animado, na fala informal) ou negativo (ansioso). Contexto define.'),
      task('"Disappointed WITH/IN/ABOUT" — I was disappointed with the result. Not "for".'),
    ],
    collocations: [
      task('feel overwhelmed by'),
      task('be relieved to hear'),
      task('be touched by'),
      task('feel conflicted about'),
      task('have mixed feelings about'),
      task('find it [adj] / thought-provoking'),
      task('leave someone feeling [adj]'),
    ],
    miniDialogues: [
      {
        title: 'Reacting to news',
        lines: [
          'A: How did you feel about the presentation?',
          'B: Honestly, I was a bit anxious beforehand, but it went well.',
          'A: I\'m glad. I thought your examples were really thought-provoking.',
          'B: Thank you, that means a lot. I was touched by that.',
        ],
        focus: 'Usando sentimentos em conversa natural.',
      },
    ],
    examples: [
      ex('I was relieved when the exam was over, but also a bit bittersweet because it meant the course was ending.', 'Fiquei aliviado quando a prova acabou, mas também agridoce porque significava que o curso estava terminando.', 'Combina dois sentimentos com but.'),
      ex('The documentary was eye-opening, which I found quite overwhelming, to be honest.', 'O documentário foi revelador, o que achei bastante perturbador, pra ser honesto.', 'Compound adj + comment clause + honesty marker.'),
      ex('She seemed content with her decision, which surprised me.', 'Ela parecia satisfeita com a decisão dela, o que me surpreendeu.', 'Content como estado; comment clause.'),
    ],
    productionTasks: [
      task('Descreva 3 experiências recentes usando adjetivos de sentimento (pelo menos um novo desta aula cada).'),
      task('Escreva 2 frases usando "which I found [adj]" sobre algo que você fez ou viu recentemente.'),
      task('Descreva um momento em que você sentiu sentimentos misturados (mixed feelings).'),
    ],
    finalChecklist: [
      task('Usei pelo menos 3 adjetivos novos desta aula?'),
      task('Diferenciador: sabia distinguir "relieved" de "happy"?'),
      task('Usei "I found it..." ou "It left me feeling..." em vez de apenas "I was"?'),
      task('Consegui descrever um sentimento complexo ou misto?'),
    ],
    selfAssessment: [
      task('Consigo descrever minha reação a algo com mais precisão do que antes?'),
      task('Sei a diferença entre overwhelmed, stressed e anxious?'),
      task('Consigo usar pelo menos 5 novos adjetivos desta aula em frases próprias?'),
    ],
    lessonRecap: [
      'B1 requer precisão emocional: não apenas happy/sad, mas moved, relieved, conflicted.',
      '"I found it [adj]" e "which I found [adj]" são formas naturais de comentar.',
      'Adjetivos compostos: thought-provoking, eye-opening, heart-warming.',
      'Intensidade importa: content < pleased < happy < thrilled < overjoyed.',
    ],
    recognitionPractice: [{ question: 'Feelings, attitudes and reactions — qual vocabulário desta aula significa "sobrecarregado/a"?', options: ['overwhelmed', 'relieved', 'touched'], answer: 'overwhelmed', explanation: 'overwhelmed = sobrecarregado/a; vocabulário trabalhado nesta aula de Feelings, attitudes and reactions.' }, { question: 'Feelings, attitudes and reactions — qual opção combina com "overwhelmed"?', options: ['sobrecarregado/a', 'aliviado/a', 'emocionado/a (positivo)'], answer: 'sobrecarregado/a', explanation: 'overwhelmed significa sobrecarregado/a no contexto desta aula.' }],
    nextLessonBridge: 'Na próxima aula, você vai aprender vocabulário de discourse chunks — expressões de transição e conexão que tornam sua fala ainda mais fluente e natural.',
  }),

  // ─── VOCABULARY (Discourse chunks) ──────────────────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B1-VOCABULARY-003',
    order: 3,
    title: 'Connecting ideas — discourse chunks',
    objectives: [
      'Aprender chunks de discurso para transição, organização e conexão de ideias.',
      'Usar marcadores de sequência, contraste, adição e reformulação.',
      'Parecer mais fluente usando expressões de organização de fala.',
      'Aplicar esses chunks em Speaking e Writing.',
    ],
    teacherOpening: 'No B1, você não fala apenas com vocabulário e gramática — você fala com a estrutura da língua. Expressões como "Having said that", "To be fair", "What I mean is" são os andaimes que sustentam a fala fluente. Essa aula ensina esses building blocks do discurso.',
    whyItMatters: 'Essas expressões são o que torna a fala natural. Quando um falante brasileiro diz "I think that... and also I think..." repetidamente, soa mecânico. Com os chunks certos, você diz "Having said that, I also think..." e parece muito mais fluente.',
    differenceFromA2: 'No A2, você usava: and, but, because, so, first, then. No B1, você adiciona: Having said that, On the other hand, What I mean is, To be honest, That said, Come to think of it.',
    realLifeUseCases: [
      'Organizar seu raciocínio em reuniões e conversas.',
      'Contrastar ideias sem soar abrupto.',
      'Corrigir o que você disse de forma natural.',
      'Adicionar nuance sem perder o fio da conversa.',
      'Escrever parágrafos com transições claras.',
    ],
    conceptExplanation: 'Discourse chunks são grupos de palavras que funcionam como unidades: "To be honest", "Having said that", "What I mean is". Você não constrói essas expressões — você as aprende como blocos prontos e usa diretamente. No B1, eles aparecem muito em Speaking e Writing.',
    mentalModel: {
      title: 'Categoria de uso',
      summary: 'Cada chunk tem uma função: contraste, adição, correção ou organização.',
      steps: [
        'Contraste: Having said that / On the other hand / That said',
        'Adição: What\'s more / Not only that / On top of that',
        'Correção/clarificação: What I mean is / What I\'m trying to say is',
        'Honestidade/pessoalidade: To be honest / Honestly / To be fair',
        'Organização: First of all / To start with / Moving on / Coming back to',
      ],
    },
    stepByStep: [
      task('Aprenda a função de cada chunk (não traduza literalmente).'),
      task('Pratique usando o chunk na posição certa (início, meio ou fim de frase).'),
      task('Combine chunks com ideias reais suas.'),
      task('Pratique em voz alta para internalizar o ritmo.'),
    ],
    portugueseContrast: [
      task('"Having said that" = "dito isso" — usado para introduzir contraste leve, não para contradizer totalmente.'),
      task('"To be fair" = "sendo justo" — como "para ser justo/a" em português.'),
      task('"What\'s more" = "além disso" — mais enfático que "also."'),
      task('"Come to think of it" = "pensando bem" — reconsideração informal.'),
    ],
    guidedDiscovery: [
      task('Qual é a função de "Having said that" na frase: "The course was difficult. Having said that, I learned a lot."?', '', 'Contraste suave — reconhece o ponto anterior mas adiciona perspectiva diferente.'),
      task('Quando você usaria "What I mean is"?', '', 'Quando quer clarificar ou reformular o que acabou de dizer.'),
      task('Qual a diferença entre "Also" e "What\'s more"?', '', '"What\'s more" é mais enfático — sugere que a informação adicional é ainda mais importante.'),
    ],
    guidedBeforeQuiz: [
      task('Complete: "The price was high. _______, the service was excellent." (contraste)', '', 'Having said that / That said / On the other hand'),
      task('Complete: "I liked the film. _______, the ending was confusing." (adição de problema)', '', 'Having said that / That said'),
      task('Complete: "It\'s a good idea — _______, we need more funding." (clarificação de problema)', '', 'having said that / although / that said'),
    ],
    topicContext: 'Expressões de discurso para transição, contraste, adição e organização na fala e escrita.',
    essentialWords: [
      vocab('Having said that', 'dito isso; ainda assim', 'The commute is long. Having said that, the job is great.', 'Contraste suave.'),
      vocab('On the other hand', 'por outro lado', 'It\'s expensive. On the other hand, it lasts longer.', 'Contraste de perspectiva.'),
      vocab('That said', 'dito isso (mais informal)', 'It\'s not perfect. That said, it\'s a good start.', 'Mesmo uso que Having said that.'),
      vocab('What\'s more', 'além disso; o que é mais', 'It\'s faster. What\'s more, it\'s cheaper.', 'Adição enfática.'),
      vocab('On top of that', 'além disso; por cima', 'The flight was delayed. On top of that, my bag was lost.', 'Adição — normalmente de problema.'),
      vocab('What I mean is', 'o que quero dizer é', 'It\'s not bad — what I mean is, it could be better.', 'Clarificação.'),
      vocab('What I\'m trying to say is', 'o que estou tentando dizer é', 'What I\'m trying to say is, I need more time.', 'Reformulação mais hesitante.'),
      vocab('To be honest', 'sendo honesto/a; pra falar a verdade', 'To be honest, I didn\'t enjoy it that much.', 'Marcador de sinceridade.'),
      vocab('To be fair', 'sendo justo/a', 'To be fair, she did warn us.', 'Moderação — dar crédito ao outro lado.'),
      vocab('Come to think of it', 'pensando bem', 'Come to think of it, I\'ve been there before.', 'Reconsideração informal.'),
      vocab('First of all', 'antes de mais nada; em primeiro lugar', 'First of all, I\'d like to thank everyone.', 'Organiza início.'),
      vocab('Moving on', 'passando para outro ponto', 'Moving on, let\'s talk about the next topic.', 'Transição de tópico.'),
      vocab('Coming back to', 'voltando para', 'Coming back to your earlier point...', 'Retorna a tópico anterior.'),
      vocab('As I was saying', 'como eu estava dizendo', 'As I was saying, the deadline is Friday.', 'Retoma fio depois de interrupção.'),
    ],
    chunks: [
      { chunk: 'Having said that,', translation: 'Dito isso,', example: 'Having said that, there are some benefits.' },
      { chunk: 'On the other hand,', translation: 'Por outro lado,', example: 'On the other hand, the cost is high.' },
      { chunk: 'What\'s more,', translation: 'Além disso,', example: 'What\'s more, it saves time.' },
      { chunk: 'To be honest,', translation: 'Sendo honesto/a,', example: 'To be honest, I wasn\'t that impressed.' },
      { chunk: 'Come to think of it,', translation: 'Pensando bem,', example: 'Come to think of it, I agree.' },
    ],
    pronunciationFocus: {
      title: 'Foco sonoro',
      tips: [
        '"Having said that" — pronúncia rápida: linking "d" + "that" = "said-that".',
        '"To be honest" — stress em "HON-est".',
        '"What\'s more" — stress em "more" para enfatizar a adição.',
      ],
    },
    dangerousConfusions: [
      task('"Having said that" ≠ "But" — é mais suave e mais sofisticado.'),
      task('"On top of that" geralmente adiciona coisa ruim. Para coisa boa, use "What\'s more."'),
      task('"To be fair" é para dar crédito ao outro lado — não use para concordar com você mesmo.'),
    ],
    collocations: [
      task('Having said that, [contraste]'),
      task('On the other hand, [alternativa]'),
      task('What\'s more, [adição enfática]'),
      task('To be honest, [sinceridade]'),
      task('Come to think of it, [reconsideração]'),
    ],
    miniDialogues: [
      {
        title: 'Using discourse chunks in conversation',
        lines: [
          'A: Did you like the new office?',
          'B: It\'s nice. Having said that, the commute is much longer.',
          'A: That\'s true. On the other hand, the facilities are better.',
          'B: To be honest, I\'m still not sure it was the right move.',
        ],
        focus: 'Contraste e honestidade com discourse chunks.',
      },
    ],
    examples: [
      ex('The new system is faster. What\'s more, it\'s easier to use. Having said that, the training took two weeks.', 'O novo sistema é mais rápido. Além disso, é mais fácil de usar. Dito isso, o treinamento levou duas semanas.', 'Adição + contraste com dois chunks.'),
      ex('To be fair, she did explain it clearly. To be honest, I just wasn\'t paying attention.', 'Sendo justa, ela explicou com clareza. Sendo honesta, eu é que não estava prestando atenção.', 'Dois marcadores de honestidade em sequência.'),
      ex('Come to think of it, maybe I should have waited before deciding.', 'Pensando bem, talvez eu devesse ter esperado antes de decidir.', 'Reconsideração informal.'),
    ],
    productionTasks: [
      task('Escreva um parágrafo de 4-5 frases sobre um lugar que você visitou usando pelo menos 2 discourse chunks.'),
      task('Descreva uma decisão difícil usando "On the other hand", "Having said that" e "To be honest."'),
      task('Grave 30 segundos comentando algo que você fez recentemente usando 2-3 dos chunks desta aula.'),
    ],
    finalChecklist: [
      task('Usei pelo menos 3 discourse chunks novos?'),
      task('Não substituí todos por "also" ou "but"?'),
      task('Os chunks estão na posição correta (geralmente início de frase, após vírgula)?'),
      task('O significado do chunk combina com o contexto?'),
    ],
    selfAssessment: [
      task('Sei a diferença entre "Having said that" e "On the other hand"?'),
      task('Consigo usar "To be honest" e "To be fair" no momento certo?'),
      task('Esses chunks saem naturalmente ou ainda tenho que pensar muito?'),
    ],
    lessonRecap: [
      'Discourse chunks são blocos prontos — aprenda como unidade, não palavra por palavra.',
      'Contraste: Having said that / On the other hand / That said.',
      'Adição: What\'s more / On top of that.',
      'Honestidade: To be honest / To be fair.',
      'Esses chunks são o que separa fala B1 de fala A2 em fluência.',
    ],
    nextLessonBridge: 'Na próxima aula de Writing, você vai usar esses chunks para escrever parágrafos mais longos e conectados — o primeiro passo da escrita B1.',
  }),

  // ─── WRITING ─────────────────────────────────────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'B1-WRITING-001',
    order: 1,
    title: 'Write a longer connected paragraph',
    objectives: [
      'Escrever parágrafos de 80-100 palavras com estrutura e conexão claras.',
      'Usar conectores de contraste, adição e causa aprendidos no B1.1.',
      'Incluir relative clauses e comment clauses para adicionar detalhes.',
      'Revisar e melhorar o próprio texto usando checklist.',
    ],
    teacherOpening: 'No A2, você escrevia frases curtas e parágrafos de 40-60 palavras. No B1, o parágrafo começa a ter estrutura real: ideia principal, desenvolvimento, exemplo, avaliação e conclusão. Essa aula treina exatamente esse padrão.',
    whyItMatters: 'Escrever parágrafos estruturados é essencial para emails, textos de opinião e mensagens mais longas no B1. Sem essa estrutura, você corre o risco de escrever frases soltas que não se conectam.',
    differenceFromA2: 'No A2, você escrevia: "I like my city. It is big. There are good restaurants." No B1, você escreve: "I live in a city which has a lot to offer. The restaurants are excellent — what\'s more, the nightlife is diverse, which I find one of the best things about living here."',
    modelText: `My neighborhood has changed a lot in recent years. New coffee shops and restaurants have opened, which has made the area much livelier. Having said that, the traffic has increased significantly, which I find quite frustrating at times. On the other hand, the public transport connections have improved, so I don't need to drive every day. To be honest, I have mixed feelings — I appreciate the improvements, but I miss the quieter atmosphere the neighborhood used to have.`,
    modelTextBreakdown: [
      task('Frase 1: Ideia principal — "My neighborhood has changed a lot."'),
      task('Frase 2: Desenvolvimento positivo com relative clause — "New coffee shops... which has made..."'),
      task('Frase 3: Contraste com comment clause — "Having said that, the traffic... which I find frustrating."'),
      task('Frase 4: Contra-argumento com conector — "On the other hand... so I don\'t need to drive."'),
      task('Frase 5: Avaliação pessoal com mixed feelings — "I have mixed feelings..."'),
    ],
    writingBlocks: [
      task('Ideia principal: uma frase clara sobre o tema.'),
      task('Desenvolvimento: o que isso significa + exemplo ou detalhe.'),
      task('Contraste: "Having said that" / "On the other hand."'),
      task('Avaliação pessoal: "To be honest" / "I feel that..."'),
    ],
    grammarForWriting: [
      task('Relative clause para detalhar: "...which has made the area..."'),
      task('Comment clause para avaliar: "...which I find quite frustrating."'),
      task('Discourse chunks para conectar: Having said that / On the other hand / To be honest.'),
      task('Because/so para causa-efeito.'),
    ],
    usefulSentences: [
      phrase('[Place/thing] has changed a lot in recent years.', '[Lugar/coisa] mudou muito nos últimos anos.'),
      phrase('...which has made it much [adj].', '...o que o tornou muito [adj].'),
      phrase('Having said that, [contrasting point].', 'Dito isso, [ponto contrário].'),
      phrase('To be honest, I have mixed feelings about it.', 'Sendo honesto/a, tenho sentimentos mistos sobre isso.'),
      phrase('I appreciate [positive], but I miss [negative].', 'Aprecio [positivo], mas sinto falta de [negativo].'),
    ],
    guidedSubstitution: [
      task('Use o modelo mas troque o tema: em vez de "neighborhood", escreva sobre "my job" ou "my city center."'),
      task('Troque os adjetivos: "livelier" → "more professional"; "frustrating" → "disappointing."'),
      task('Troque os discourse chunks: "Having said that" → "On the other hand."'),
    ],
    commonWritingMistakes: [
      mistake('My neighborhood it has changed.', 'My neighborhood has changed.', 'Sem pronome sujeito duplicado.'),
      mistake('Having said that but the traffic...', 'Having said that, the traffic...', 'Não use but depois de Having said that.'),
      mistake('Which I find it frustrating.', 'Which I find frustrating.', 'Find não precisa de "it" quando "which" já é objeto.'),
      mistake('I have mixed feelings about. The improvements.', 'I have mixed feelings about the improvements.', 'Não separe o objeto de "about."'),
    ],
    revisionChecklist: [
      task('Meu parágrafo tem ideia principal, desenvolvimento e avaliação?'),
      task('Usei pelo menos um discourse chunk (Having said that / On the other hand)?'),
      task('Usei pelo menos uma relative clause (who / which)?'),
      task('As frases estão conectadas com lógica (não só "and... and...")?'),
      task('A avaliação final é pessoal e específica?'),
    ],
    draftTask: task(
      'Escreva um parágrafo de 80-100 palavras sobre um lugar, emprego, curso ou situação que tenha mudado na sua vida. Use o modelo como guia.',
      'Inclua: ideia principal + detalhe + contraste + avaliação pessoal.'
    ),
    revisionTask: task(
      'Releia seu rascunho e verifique: (1) Há pelo menos um discourse chunk? (2) Há pelo menos uma relative clause? (3) A avaliação final é sincera e específica? Faça as correções necessárias.'
    ),
    finalVersionTask: task(
      'Escreva a versão final do seu parágrafo após revisão. Mínimo 80 palavras.'
    ),
    feedbackPreparation: [
      task('Qual foi o maior desafio ao escrever este parágrafo?'),
      task('Qual discourse chunk achaste mais natural de usar?'),
      task('O que você faria diferente se escrevesse novamente?'),
    ],
    lessonRecap: [
      'Parágrafo B1 tem: ideia + detalhe + contraste + avaliação.',
      'Discourse chunks conectam e organizam: Having said that / On the other hand.',
      'Relative clauses adicionam detalhe: which + verbo.',
      'Revisão com checklist melhora qualquer texto.',
    ],
    nextLessonBridge: 'Na próxima aula, você vai continuar o B1.1 com Speaking e depois avançar para B1.2 Past Experiences, onde as habilidades de bridge serão aplicadas em narrativas mais longas.',
  }),

]);

export const B1_DEEP_BRIDGE_PART2_BY_PILLAR = Object.freeze({
  grammar: B1_DEEP_BRIDGE_PART2.filter(l => l.pillar === 'grammar'),
  vocabulary: B1_DEEP_BRIDGE_PART2.filter(l => l.pillar === 'vocabulary'),
  reading: B1_DEEP_BRIDGE_PART2.filter(l => l.pillar === 'reading'),
  listening: B1_DEEP_BRIDGE_PART2.filter(l => l.pillar === 'listening'),
  speaking: B1_DEEP_BRIDGE_PART2.filter(l => l.pillar === 'speaking'),
  writing: B1_DEEP_BRIDGE_PART2.filter(l => l.pillar === 'writing'),
});
