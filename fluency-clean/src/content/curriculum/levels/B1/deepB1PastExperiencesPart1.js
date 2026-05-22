import { createGrammarLesson, createReadingLesson, createListeningLesson, createWritingLesson, createSpeakingLesson } from '../../../schemas/index.js';

const level = 'B1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['b1-2', 'past-experiences', 'storytelling', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function ex(text, translation, why = '', warning = '') { return { text, translation, why, warning }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }

export const B1_DEEP_PAST_EXPERIENCES_PART1 = Object.freeze([

  // ─── GRAMMAR: Past Continuous ────────────────────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B1-GRAMMAR-003',
    order: 3,
    title: 'Past Continuous',
    objectives: [
      'Descrever ações em progresso em um momento específico do passado.',
      'Usar was/were + verb-ing com precisão.',
      'Criar contexto de fundo (background) para histórias.',
      'Distinguir uso de Past Continuous do Past Simple.',
    ],
    teacherOpening: 'Uma boa história não é só uma lista de ações. É uma imagem: o que estava acontecendo quando algo aconteceu. "I was cooking when she called." — é isso que o Past Continuous faz. Ele pinta o fundo da cena, enquanto o Past Simple conta o evento principal.',
    whyItMatters: 'Sem o Past Continuous, todas as histórias ficam planas: "I went home. I cooked. She called." Com ele: "I was cooking dinner when she called." — é mais vívido, mais natural e mais B1.',
    differenceFromA2: 'No A2, você usava Past Simple para tudo no passado. No B1, você aprende a separar background (was/were + -ing) de eventos (Past Simple). Isso é o que torna a narrativa mais rica.',
    realLifeUseCases: [
      'Descrever o que estava acontecendo quando algo inesperado ocorreu.',
      'Criar imagem de contexto em histórias.',
      'Responder "What were you doing when...?"',
      'Escrever textos narrativos mais elaborados.',
    ],
    conceptExplanation: 'Past Continuous = was/were + verb-ing. Uso principal: (1) Ação em progresso no passado: "I was working all night." (2) Background para uma ação interruptora: "I was reading when the alarm went off." (3) Duas ações simultâneas: "While she was cooking, he was cleaning."',
    mentalModel: {
      title: 'Filme vs. fotografia',
      summary: 'Past Simple = momento pontual (foto). Past Continuous = ação em andamento (filme).',
      steps: [
        'Foto: "She arrived at 8pm." (Past Simple — ponto no tempo)',
        'Filme: "I was waiting for her at 8pm." (Past Continuous — ação em andamento)',
        'Background + evento: "I was waiting when she finally arrived."',
      ],
    },
    stepByStep: [
      task('Identifique se a ação é o evento principal ou o background.'),
      task('Background → Past Continuous (was/were + -ing).'),
      task('Evento principal → Past Simple.'),
      task('Use when para ligar evento ao background.'),
      task('Use while para ações simultâneas.'),
    ],
    portugueseContrast: [
      task('Português usa pretérito imperfeito para background: "estava cozinhando". Inglês usa was/were + -ing.'),
      task('Cuidado: "estava lendo" = "was reading", não "was read" e nem "readed."'),
      task('"When" interrompe: "I was sleeping WHEN the phone rang." — o ring interrompeu o sleep.'),
      task('"While" = enquanto — duas ações simultâneas: "While I was cooking, she was reading."'),
    ],
    guidedDiscovery: [
      task('Em "I was walking to work when it started to rain" — qual é a ação de background? Qual é o evento?', '', 'Background: was walking. Evento: started to rain.'),
      task('Por que usamos Past Continuous em "We were all talking when the manager walked in"?', '', 'Talking = background. Walked in = o evento que interrompeu.'),
      task('Qual verbo NÃO pode ficar no Continuous? "I was knowing the answer."', '', 'Know é verbo de estado — não usa Continuous.'),
    ],
    guidedBeforeQuiz: [
      task('Complete: "I _______ (watch) TV when the lights went out."', '', 'was watching'),
      task('Complete: "They _______ (not study) when the teacher came in."', '', 'weren\'t studying'),
      task('Complete: "What _______ you _______ (do) at 9pm yesterday?"', '', 'were / doing'),
    ],
    grammarGoal: 'Usar Past Continuous para background e contraste com eventos em Past Simple.',
    formationGuide: [
      task('Afirmativo: was/were + verb-ing', '"I was working. They were sleeping."'),
      task('Negativo: wasn\'t/weren\'t + verb-ing', '"She wasn\'t listening."'),
      task('Pergunta: Was/Were + subject + verb-ing?', '"Were you waiting long?"'),
      task('when + Past Simple: evento interrompe', '"I was reading when she called."'),
      task('while + Past Continuous: ações simultâneas', '"While I was reading, she was cooking."'),
    ],
    whenToUse: [
      task('Ação longa em progresso no passado, como background.'),
      task('Ação interrompida por evento (with when).'),
      task('Duas ações simultâneas no passado (with while).'),
      task('Descrição de atmosfera/contexto em narrativa.'),
    ],
    whenNotToUse: [
      task('Verbos de estado: know, understand, believe, have (posse), like, love, want.'),
      task('Ação concluída e pontual — use Past Simple.'),
      task('Hábito no passado — use Past Simple ou used to.'),
    ],
    grammarTable: [
      { pattern: 'Background', example: 'It was raining and I was walking home.', translation: 'Estava chovendo e eu estava andando para casa.' },
      { pattern: 'Interrupted action (when)', example: 'I was reading when she arrived.', translation: 'Eu estava lendo quando ela chegou.' },
      { pattern: 'Simultaneous (while)', example: 'While he was cooking, I was setting the table.', translation: 'Enquanto ele cozinhava, eu estava pondo a mesa.' },
      { pattern: 'Negative', example: 'They weren\'t paying attention.', translation: 'Eles não estavam prestando atenção.' },
    ],
    teacherExamples: [
      ex('I was just leaving the office when my boss called me back.', 'Eu estava saindo do escritório quando meu chefe me chamou de volta.', 'Background + interrupção.'),
      ex('While everyone was enjoying the party, she was sitting alone in the corner.', 'Enquanto todos aproveitavam a festa, ela estava sentada sozinha no canto.', 'Contraste de ações simultâneas.'),
      ex('It was a cold evening and the streets were quiet. I was thinking about the meeting when I heard a noise.', 'Era uma tarde fria e as ruas estavam quietas. Eu estava pensando na reunião quando ouvi um barulho.', 'Background + narrative event.'),
    ],
    commonBrazilianMistakes: [
      mistake('I was know the answer.', 'I knew the answer.', 'Know é verbo de estado — não usa Continuous.'),
      mistake('I was go to the bank.', 'I was going to the bank.', 'Was + -ing, não was + infinitivo.'),
      mistake('While she cooked, I cleaned.', 'While she was cooking, I was cleaning.', 'While + simultaneous → ambas as ações em Continuous.'),
      mistake('I was walking when was raining.', 'I was walking when it started to rain.', '"It" é necessário como sujeito do verbo rain.'),
    ],
    guidedPractice: [q('Qual frase usa Past Continuous com when corretamente?', 'I was just leaving the office when my boss called me back.', '', 'Was leaving = ação em progresso; called = evento que interrompeu.', ['I was just leaving the office when my boss called me back.', 'I was just leave the office when my boss called me back here.', 'I just left the office when my boss was calling me back then.']), q('Escolha a frase com while + Past Continuous.', 'While everyone was enjoying the party, she was sitting alone.', '', 'While + Past Continuous em ambas as cláusulas para ações simultâneas.', ['While everyone was enjoying the party, she was sitting alone.', 'While everyone enjoyed the party, she was sit alone there.', 'While everyone was enjoy the party, she was sitting alone.'])],
    controlledPractice: [
      task('Complete: She _______ (sleep) when the alarm went off.', '', 'was sleeping'),
      task('Complete: We _______ (not pay) attention when the teacher explained.', '', 'weren\'t paying'),
      task('Complete: _______ you _______ (wait) long?', '', 'Were / waiting'),
      task('Complete: While I _______ (walk), I _______ (listen) to music.', '', 'was walking / was listening'),
    ],
    errorCorrectionPractice: [
      task('Corrija: I was understanding everything he said.', 'I understood everything he said. (understand = state verb)'),
      task('Corrija: They were sat in the garden when it rained.', 'They were sitting in the garden when it rained.'),
      task('Corrija: While I was reading, she cooked dinner.', 'While I was reading, she was cooking dinner. (simultaneous → both continuous)'),
    ],
    transformationPractice: [
      task('Una: "I was reading. The phone rang."', 'I was reading when the phone rang.'),
      task('Una: "She was cooking. He was watching TV."', 'While she was cooking, he was watching TV.'),
      task('Acrescente background: "The accident happened on the highway."', 'e.g. It was raining and the traffic was moving slowly when the accident happened.'),
    ],
    translationPractice: [
      task('Eu estava estudando quando ela chegou.', 'I was studying when she arrived.'),
      task('Eles não estavam prestando atenção.', 'They weren\'t paying attention.'),
      task('Enquanto eu cozinhava, ela estava arrumando a mesa.', 'While I was cooking, she was setting the table.'),
    ],
    productionTasks: [
      task('Escreva 4 frases sobre o que você estava fazendo em diferentes momentos ontem.'),
      task('Escreva uma mini-história de 3-4 frases usando Past Continuous como background e Past Simple para o evento.'),
      task('Responda: "What were you doing at 10pm last night?" em 3-4 frases com contexto.'),
    ],
    finalChecklist: [
      task('Usei was/were + verb-ing (não was + infinitivo)?'),
      task('Evitei Past Continuous com verbos de estado?'),
      task('Usei when para interrupção e while para simultaneidade?'),
      task('Minha história tem background (Continuous) e evento (Simple)?'),
    ],
    selfAssessment: [
      task('Consigo criar background para uma história usando was/were + -ing?'),
      task('Sei identificar quando a ação interrompe o background?'),
      task('Evito Past Continuous com know, understand, want, like?'),
    ],
    lessonRecap: [
      'Past Continuous = was/were + verb-ing — ação em progresso no passado.',
      'Background + evento: "was reading WHEN she arrived."',
      'Simultâneas: "While she was cooking, he was reading."',
      'Verbos de estado não usam Continuous: know, understand, want, like.',
    ],
    nextLessonBridge: 'Na próxima aula você vai aprender o contraste direto entre Past Simple e Past Continuous, e como escolher um ou outro para contar histórias mais precisas.',
  }),

  // ─── GRAMMAR: Past Simple vs Past Continuous ─────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B1-GRAMMAR-004',
    order: 4,
    title: 'Past Simple vs Past Continuous contrast',
    objectives: [
      'Escolher com segurança entre Past Simple e Past Continuous em contexto narrativo.',
      'Entender a diferença de perspectiva temporal entre os dois tempos.',
      'Usar when e while corretamente para conectar os dois tempos.',
      'Contar histórias com fundo e eventos bem marcados.',
    ],
    teacherOpening: 'Você já aprendeu Past Simple e Past Continuous separadamente. Agora é hora de usá-los juntos com precisão. A escolha entre os dois não é aleatória — ela muda o sentido da história e o ritmo da narrativa.',
    whyItMatters: 'Errar o tempo verbal na narrativa não apenas soa incorreto — muda o significado. "She was leaving" vs. "She left" comunicam momentos bem diferentes. No B1, contar histórias bem é uma habilidade central.',
    differenceFromA2: 'No A2, você usava Past Simple para tudo. No B1, você escolhe conscientemente: Past Continuous para o que estava em andamento, Past Simple para o que completou ou interrompeu.',
    realLifeUseCases: [
      'Contar histórias pessoais com precisão temporal.',
      'Responder "Tell me about a time when..." em inglês.',
      'Descrever situações passadas em emails e conversas.',
    ],
    conceptExplanation: 'Regra central: Past Simple = ação completa/pontual. Past Continuous = ação em progresso. Quando os dois aparecem juntos: a ação mais longa (Continuous) serve de background, e a ação mais curta (Simple) é o evento que acontece no meio. "I was having breakfast (background) when my manager called (event)."',
    mentalModel: {
      title: 'Timeline visual',
      summary: 'Continuous = linha. Simple = ponto. O ponto acontece DENTRO da linha.',
      steps: [
        '|----was reading----|',
        '          ↑ she arrived (Past Simple)',
        '"I was reading when she arrived."',
        'Dois pontos sem background: "I worked. I left. I arrived." (sequência simples)',
      ],
    },
    stepByStep: [
      task('Identifique se as ações são simultâneas ou sequenciais.'),
      task('Simultâneas = ambas Continuous + while.'),
      task('Sequenciais = ambas Simple (primeiro, depois, então).'),
      task('Background + evento = Continuous + Simple + when.'),
      task('Verifique: é verbo de estado? → só Simple.'),
    ],
    portugueseContrast: [
      task('Imperfeito português (estava, fazia) → geralmente Past Continuous em inglês.'),
      task('Pretérito perfeito (fez, foi) → geralmente Past Simple.'),
      task('Mas atenção: contexto decide, não a forma em português.'),
    ],
    guidedDiscovery: [
      task('Diferença: "When she arrived, I made coffee." vs. "When she arrived, I was making coffee."', '', 'Simple: eu comecei a fazer café DEPOIS que ela chegou. Continuous: o café JÁ estava sendo feito quando ela chegou.'),
      task('Por que "While I was running, I saw a dog" usa Continuous em "running" mas Simple em "saw"?', '', 'Running = background (longo). Saw = evento pontual que aconteceu dentro do running.'),
    ],
    guidedBeforeQuiz: [
      task('Choose: "I _______ (cook) when I _______ (burn) my hand." (Continuous or Simple?)', '', 'was cooking / burnt — background + event.'),
      task('Choose: "They _______ (talk) for hours, then they _______ (go) home." (sequence?)', '', 'talked / went — sequential Simple.'),
    ],
    grammarGoal: 'Usar Past Simple e Past Continuous com precisão para criar narrativas com background e eventos.',
    formationGuide: [
      task('Background: was/were + -ing + when + Past Simple', '"I was walking when it started to rain."'),
      task('Simultaneous: while + was/were + -ing / was/were + -ing', '"While she was working, he was sleeping."'),
      task('Sequence: Past Simple + then/after + Past Simple', '"She called. I picked up. She explained."'),
    ],
    whenToUse: [
      task('Past Simple para ações concluídas e sequenciais.'),
      task('Past Continuous para background e ações em andamento.'),
      task('when = um tempo interrompe o outro.'),
      task('while = dois tempos acontecem ao mesmo tempo.'),
    ],
    whenNotToUse: [
      task('Não use Continuous para ações rápidas/instantâneas (explode, arrive, notice).'),
      task('Não use Continuous para verbos de estado.'),
      task('Não use "while" para sequência — use "then."'),
    ],
    grammarTable: [
      { pattern: 'Background + event', example: 'I was sleeping when the storm started.', translation: 'Eu estava dormindo quando a tempestade começou.' },
      { pattern: 'Simultaneous', example: 'While he was driving, she was navigating.', translation: 'Enquanto ele dirigia, ela navegava.' },
      { pattern: 'Sequential events', example: 'She arrived, sat down, and opened her bag.', translation: 'Ela chegou, sentou-se e abriu a bolsa.' },
      { pattern: 'Two meanings', example: '"When she arrived, I cooked dinner." vs "When she arrived, I was cooking dinner."', translation: 'Comecei a cozinhar DEPOIS vs. já estava cozinhando.' },
    ],
    teacherExamples: [
      ex('I was about to leave when my colleague knocked on the door.', 'Eu estava prestes a sair quando meu colega bateu na porta.', '"was about to" = estava prestes a — Background especial.'),
      ex('She was living in Berlin when she met her husband.', 'Ela estava morando em Berlim quando conheceu o marido.', 'Continuous de longa duração + evento pontual.'),
      ex('The sun was setting and the birds were singing when we finally reached the top.', 'O sol estava se pondo e os pássaros cantavam quando finalmente chegamos ao topo.', 'Contexto rico com dois backgrounds.'),
    ],
    commonBrazilianMistakes: [
      mistake('When I was arrived, she was leaving.', 'When I arrived, she was leaving.', 'Arrive é pontual — use Simple, não Continuous.'),
      mistake('While I cleaned, she cooked.', 'While I was cleaning, she was cooking.', 'while + simultaneous → ambas Continuous.'),
      mistake('I was have a shower when he called.', 'I was having a shower when he called.', '"Have a shower" pode ser Continuous.'),
      mistake('She was seeing the accident.', 'She saw the accident.', 'See (perceiver) = estado → Simple.'),
    ],
    guidedPractice: [q('Qual frase contrasta Past Simple e Past Continuous?', 'I was about to leave when my colleague knocked on the door.', '', 'Was about to (continuous background) + knocked (simple event).', ['I was about to leave when my colleague knocked on the door.', 'I was about to leave when my colleague was knock on the door.', 'I about to leave when my colleague was knocking on the door.']), q('Escolha a narrativa que combina background e evento.', 'She was living in Berlin when she met her husband there.', '', 'Was living = situação de fundo; met = evento pontual no passado.', ['She was living in Berlin when she met her husband there.', 'She lived in Berlin when she was meeting her husband there.', 'She was live in Berlin when she was met her husband there.'])],
    controlledPractice: [
      task('Choose: "I _______ (sleep) when the alarm _______ (ring)."', '', 'was sleeping / rang'),
      task('Choose: "While we _______ (wait), it _______ (start) to snow."', '', 'were waiting / started'),
      task('Choose: "She _______ (arrive), _______ (sit) down, and _______ (open) her laptop."', '', 'arrived / sat / opened'),
    ],
    errorCorrectionPractice: [
      task('Corrija: While I was reading, she cooked.', 'While I was reading, she was cooking.'),
      task('Corrija: When she was arriving, we were eating.', 'When she arrived, we were eating.'),
      task('Corrija: I was see him on the street.', 'I saw him on the street.'),
    ],
    translationPractice: [
      task('Enquanto eu estava jantando, ele estava assistindo TV.', 'While I was having dinner, he was watching TV.'),
      task('Eu estava atravessando a rua quando o carro parou de repente.', 'I was crossing the street when the car suddenly stopped.'),
      task('Ela chegou, cumprimentou a todos e começou a reunião.', 'She arrived, greeted everyone and started the meeting.'),
    ],
    productionTasks: [
      task('Escreva uma história de 5-7 frases sobre um dia que deu errado. Use Past Continuous para o background e Past Simple para os eventos.'),
      task('Responda: "Tell me about a time something unexpected happened." — 4-5 frases com os dois tempos.'),
    ],
    finalChecklist: [
      task('Usei Past Continuous para o background e Past Simple para o evento?'),
      task('Usei when (para interrupção) e while (para simultaneidade) corretamente?'),
      task('Evitei Continuous com arrive, notice, see (perceiver)?'),
    ],
    selfAssessment: [
      task('Consigo identificar qual ação é background e qual é evento em uma história?'),
      task('Sei a diferença entre "When she arrived, I cooked" e "When she arrived, I was cooking"?'),
      task('Uso while e when com segurança?'),
    ],
    lessonRecap: [
      'Past Continuous = background. Past Simple = evento.',
      '"Was doing" + when + "Simple" = ação interrompida.',
      '"While" + Continuous = ações simultâneas.',
      'Verbos pontuais (arrive, notice, see) normalmente usam Simple.',
    ],
    nextLessonBridge: 'Na próxima aula, você vai aprender o Present Perfect — um tempo que conecta passado e presente, fundamental para falar de experiências de vida.',
  }),

  // ─── READING ─────────────────────────────────────────────────────────────────
  createReadingLesson({
    ...common,
    id: 'B1-READING-002',
    order: 2,
    title: 'A longer personal experience story',
    objectives: [
      'Ler uma história pessoal mais longa com múltiplos eventos no passado.',
      'Identificar o uso de Past Continuous e Past Simple no texto.',
      'Responder perguntas de sequência, evidência e inferência.',
      'Inferir a atitude do narrador a partir de escolhas vocabulares.',
      'Produzir uma resposta pessoal conectada ao tema.',
    ],
    teacherOpening: 'Textos de experiência pessoal são centrais no B1. Eles misturam tempos do passado, reações emocionais e sequência de eventos. Esta aula treina você a ler esse tipo de texto com profundidade e a identificar como o autor usa os tempos verbais para criar ritmo.',
    whyItMatters: 'Entender narrativas longas é uma habilidade fundamental do B1. Textos de jornal, blogs, entrevistas e conversas reais usam exatamente esse formato.',
    differenceFromA2: 'No A2, você lia textos com uma ação por parágrafo. No B1, o texto tem múltiplos eventos, background, reações e avaliações. Você precisa acompanhar o fio narrativo e identificar como os tempos verbais criam significado.',
    mainText: `The day I got lost in Tokyo

I had been planning the Tokyo trip for months. When I finally arrived, I was completely overwhelmed by the size of the city. The streets were buzzing with people and the signs were all in Japanese, which I couldn't read at all.

On my third day, I decided to explore a neighbourhood I had seen in a travel guide. I was walking confidently through the streets, looking at my phone for directions, when I suddenly realised my battery had died. I had no map, no internet and couldn't read a single sign.

For a while, I just kept walking, hoping I'd recognise something. People were rushing past me and nobody seemed to notice that I was completely lost. I stopped in a small convenience store and tried to ask for help, but my Japanese was limited to "thank you" and "sorry."

Then something unexpected happened. An elderly woman who was standing nearby had apparently heard me struggling. She tapped me on the shoulder and, in perfect English, said: "You look lost. Can I help you?" It turned out she had lived in London for twenty years.

She walked me all the way to my hotel, which took about fifteen minutes. We talked the whole time. It was one of the most surprising and heartwarming moments of the trip. I still think about it whenever I'm in a situation I can't control.`,
    readingSkillFocus: 'Identificar uso de Past Simple e Past Continuous; sequência de eventos; inferência de atitude emocional.',
    firstReadTask: task('Leia o texto uma vez. Qual é o momento mais surpreendente da história? Por quê?'),
    secondReadTask: task('Releia focando nos tempos verbais. Encontre 3 exemplos de Past Continuous e 3 de Past Simple. Qual função cada um tem na história?'),
    comprehensionQuestions: [
      {
        question: 'Why did the narrator get lost?',
        answer: 'Because the phone battery died while they were using it for directions.',
        evidence: '"I was walking confidently... when I suddenly realised my battery had died."',
        explanation: 'The Continuous shows ongoing action; the Simple shows the event.',
      },
      {
        question: 'What two problems did the narrator have in the convenience store?',
        answer: 'They couldn\'t communicate because they didn\'t speak Japanese (only "thank you" and "sorry").',
        evidence: '"my Japanese was limited to \'thank you\' and \'sorry.\'"',
        explanation: 'Direct evidence in the text.',
      },
      {
        question: 'What made the elderly woman\'s help surprising?',
        answer: 'She spoke perfect English and had lived in London for twenty years.',
        evidence: '"in perfect English, said: \'You look lost.\'" and "It turned out she had lived in London for twenty years."',
        explanation: 'Surprise comes from the unexpected fluency.',
      },
      {
        question: 'How does the narrator feel about the experience now? (inference)',
        answer: 'It had a lasting impact — they still think about it as an example of unexpected kindness.',
        evidence: '"I still think about it whenever I\'m in a situation I can\'t control."',
        explanation: 'The present tense verb "still think" shows ongoing reflection.',
      },
    ],
    vocabularyInContext: [
      task('What does "buzzing with people" mean?', '', 'Full of activity and movement — very busy.'),
      task('What does "it turned out" mean?', '', 'It was discovered; the real situation was revealed.'),
      task('What does "heartwarming" suggest about the narrator\'s feelings?', '', 'Positive, emotionally touching — the woman\'s kindness moved them.'),
    ],
    inferenceQuestions: [
      task('Was the narrator well-prepared for the trip? Use evidence.', '', 'Mostly yes ("planning for months", travel guide) but not for getting lost (no offline map, no Japanese).'),
      task('What does "I still think about it" tell us about the experience?', '', 'It was memorable and meaningful — not just a random event.'),
    ],
    guidedSummary: task(
      'Escreva um resumo de 4-5 frases sobre a história. Inclua: contexto inicial, o problema, como foi resolvido e a reflexão final.',
      'Use: The narrator was... / While... / A woman who... / The narrator still...'
    ),
    productionTask: task(
      'Escreva 4-5 frases sobre um momento em que algo inesperado aconteceu em uma viagem ou nova situação. Use Past Continuous para background e Past Simple para os eventos.',
    ),
    finalChecklist: [
      task('Identifiquei os usos de Past Continuous e Past Simple no texto?'),
      task('Respondi as perguntas de evidência com citação do texto?'),
      task('Fiz inferências baseadas em escolhas de vocabulário e tempo verbal?'),
      task('Meu resumo tem a sequência correta: problema → solução → reflexão?'),
    ],
    selfAssessment: [
      task('Consigo identificar a função de Past Continuous em uma narrativa?'),
      task('Consigo responder perguntas de inferência com evidência?'),
      task('Consigo produzir uma mini-narrativa com background e eventos?'),
    ],
    lessonRecap: [
      'Narrativas B1 combinam Past Continuous (background) e Past Simple (eventos).',
      'Perguntas de evidência pedem citação do texto.',
      'Inferência leva em conta vocabulário emocional e tempo verbal.',
      'Resumo de narrativa: contexto → problema → resolução → reflexão.',
    ],
    nextLessonBridge: 'Na próxima aula de Listening, você vai ouvir alguém contando uma história de viagem — com sequência, background e momento surpreendente.',
  }),

  // ─── SPEAKING: Tell a story with sequence ────────────────────────────────────
  createSpeakingLesson({
    ...common,
    id: 'B1-SPEAKING-002',
    order: 2,
    title: 'Tell a story with sequence and background',
    objectives: [
      'Contar uma história completa usando Past Simple, Past Continuous e sequência.',
      'Incluir background, evento principal, reação e conclusão.',
      'Usar sequência natural: at first, then, after a while, eventually, at the end.',
      'Gravar uma história de 90-120 segundos com começo, meio e fim.',
    ],
    teacherOpening: 'Contar histórias é uma das habilidades mais humanas — e mais difíceis em outra língua. Esta aula treina a estrutura de uma boa história em inglês: contexto, conflito, desenvolvimento e resolução. Com esses blocos, qualquer experiência sua pode virar uma história B1 interessante.',
    whyItMatters: 'A habilidade de contar histórias aparece em entrevistas de emprego ("Tell me about a time when..."), em conversas sociais e em todos os textos B1+. É o coração da comunicação B1.',
    differenceFromA2: 'No A2, você listava eventos: "I went, I saw, it was good." No B1, você constrói: contexto (onde estava, o que estava fazendo) → problema/evento → reação → resolução → reflexão.',
    speakingSituation: 'Tell me about a time something didn\'t go as planned. (B1 model: "I was on my way to a conference when my flight was delayed. At first I was frustrated, but after a while I started chatting with someone and it turned out we worked in the same industry. Looking back, it was one of those situations where something good came from something bad.")',
    modelPhrases: [
      phrase('I was [activity] when suddenly...', '', 'Opens with Past Continuous background + event.'),
      phrase('At first I was [emotion], but then...', '', 'Emotional arc — contrast of feelings.'),
      phrase('After a while / Eventually...', '', 'Shows time passing naturally.'),
      phrase('It turned out that...', '', 'Reveals a surprising fact.'),
      phrase('By the time [time], I had [result].', '', 'Shows completion before a point.'),
      phrase('Looking back, I think...', '', 'Reflection at the end.'),
      phrase('It was one of those moments when...', '', 'Final evaluation.'),
    ],
    substitutionDrills: [
      {
        base: 'I was [doing X] when [something happened].',
        substitutions: ['waiting for a bus / my phone fell into a puddle', 'cooking dinner / the power went out', 'walking to work / I realized I\'d forgotten my keys'],
      },
      {
        base: 'At first I was [emotion], but after a while [change].',
        substitutions: ['worried / I realized it wasn\'t so bad', 'frustrated / I started to see the funny side', 'exhausted / I got my second wind'],
      },
    ],
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "I was waiting for a bus when my phone fell into a puddle." Stress the contrast: WAITing (background) → FELL (event).',
        '"At first I was frustrated, but after a while..." — chunk the phrase: "at FIRST / I was fruSTRAted / but AFter a WHILE." Practise the rhythm.',
        '"It turned out that..." — link "turned-out" as one unit: /tɜːnd.aʊt/. Keep the "that" weak.',
        '"Looking back, I think..." — rising intonation on "back" signals reflection is coming.',
      ],
    },
    guidedSpeaking: [
      task('Responda em voz alta: "Tell me about a time you had to wait longer than expected." — 5-6 frases com background (Past Continuous), evento (Past Simple) e reação emocional.'),
      task('Responda: "Tell me about a time something surprised you." — inclua "It turned out..." e "Looking back..."'),
      task('Planeje sua história: onde estava, o que estava fazendo, o que aconteceu, como reagiu, como terminou.'),
    ],
    speakingChecklist: [
      task('Tenho background (Past Continuous: I was [doing X])?'),
      task('Tenho o evento principal (Past Simple + when)?'),
      task('Tenho a reação emocional ("At first...but then")?'),
      task('Tenho a conclusão ou reflexão ("Looking back...?")?'),
      task('Usei pelo menos 3 marcadores de sequência?'),
    ],
    recordingTasks: [
      task(
        'Grave 90-120 segundos respondendo: "Tell me about a time something unexpected happened to you."',
        'Use: Past Continuous background, Past Simple event, emotional arc ("At first...but after a while..."), "It turned out", "Looking back."'
      ),
    ],
    freeSpeaking: [
      task('Tell me about a time you got lost or had trouble finding your way.'),
      task('Tell me about an experience that taught you something unexpected.'),
      task('Tell me about a time you met someone interesting by chance.'),
    ],
    selfAssessment: [
      task('Produzi resposta de 90+ segundos?'),
      task('Minha história tem começo, meio e fim?'),
      task('Usei Past Continuous e Past Simple com distinção clara?'),
      task('Incluí um momento de reflexão ou avaliação final?'),
    ],
    masteryTarget: 'Contar uma história de 90-120 segundos com background, evento, arco emocional e reflexão final, usando Past Continuous e Past Simple com precisão.',
    lessonRecap: [
      'Boa história: contexto → evento → reação → resolução → reflexão.',
      '"I was doing X when Y happened" = abertura clássica de narrativa B1.',
      '"At first... but after a while" = arco emocional.',
      '"Looking back" / "It turned out" = reflexão e revelação.',
    ],
    nextLessonBridge: 'Na próxima parte, você vai aprender Present Perfect — o tempo que conecta suas experiências passadas ao presente, essencial para falar sobre o que já viveu.',
  }),

]);

export const B1_DEEP_PAST_EXPERIENCES_PART1_BY_PILLAR = Object.freeze({
  grammar: B1_DEEP_PAST_EXPERIENCES_PART1.filter(l => l.pillar === 'grammar'),
  vocabulary: B1_DEEP_PAST_EXPERIENCES_PART1.filter(l => l.pillar === 'vocabulary'),
  reading: B1_DEEP_PAST_EXPERIENCES_PART1.filter(l => l.pillar === 'reading'),
  listening: B1_DEEP_PAST_EXPERIENCES_PART1.filter(l => l.pillar === 'listening'),
  speaking: B1_DEEP_PAST_EXPERIENCES_PART1.filter(l => l.pillar === 'speaking'),
  writing: B1_DEEP_PAST_EXPERIENCES_PART1.filter(l => l.pillar === 'writing'),
});
