import { createGrammarLesson, createVocabularyLesson, createSpeakingLesson } from '../../../schemas/index.js';

const level = 'B1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['b1-3', 'opinions', 'discussion', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function word(w, def, ex = '', note = '') { return { word: w, definition: def, example: ex, note }; }
function ex(text, translation, why = '', warning = '') { return { text, translation, why, warning }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }

export const B1_DEEP_OPINIONS_PART1 = Object.freeze([

  // ─── GRAMMAR-005: First Conditional ──────────────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B1-GRAMMAR-005',
    order: 5,
    title: 'First Conditional — real possibilities and consequences',
    objectives: [
      'Formar o First Conditional corretamente: if + present simple / will + infinitivo.',
      'Usar o First Conditional para situações reais e prováveis.',
      'Distinguir a cláusula "if" da cláusula "result".',
      'Usar variações: unless, as long as, provided that.',
      'Evitar os erros mais comuns de brasileiros com o First Conditional.',
    ],
    teacherOpening: 'No A2, você já usava "will" para falar do futuro. No B1, você aprende a conectar condição e resultado: "If you study every day, you will improve fast." Essa estrutura — o First Conditional — é essencial para expressar planos, avisos, promessas e consequências reais.',
    portugueseContrast: [task('Em First Conditional — real possibilities and consequences, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'First Conditional aparece em conversas sobre o futuro, em persuasão, em debates, em entrevistas e em qualquer momento que você conecte uma condição a um resultado. É a estrutura-base de argumentação em inglês.',
    differenceFromA2: 'No A2: "I will go tomorrow." No B1: "If the weather is good, I will go tomorrow. If it rains, I will stay home." Você passa de afirmações diretas para raciocínio condicional.',
    grammarTable: {
      headers: ['Parte', 'Estrutura', 'Exemplo'],
      rows: [
        ['If clause', 'if + present simple', 'If it rains...'],
        ['Result clause', 'will + infinitivo', '...I will stay inside.'],
        ['Negativa if', 'if + do not / don\'t + verb', 'If you don\'t hurry...'],
        ['Negativa result', 'will not / won\'t + verb', '...we won\'t catch the bus.'],
        ['Question', 'will + subject + verb', 'What will happen if I leave early?'],
        ['Unless (= if not)', 'unless + present simple', 'Unless you practice, you won\'t improve.'],
        ['As long as', 'as long as + present simple', 'I\'ll help you as long as you try.'],
      ],
    },
    whenToUse: [
      'Situações reais e prováveis no futuro: "If I pass the exam, I will celebrate."',
      'Avisos e ameaças: "If you don\'t stop, I will leave."',
      'Promessas: "If you help me, I will help you."',
      'Persuasão: "If you try it, you will see the difference."',
      'Planos contingentes: "If the flight is delayed, we will take a train."',
    ],
    whenNotToUse: [
      'Hipóteses impossíveis ou improváveis → use Second Conditional: "If I were president, I would..." (B2)',
      'Verdades gerais → use Zero Conditional: "If you heat water to 100°C, it boils."',
      'NÃO use will na cláusula "if": "If it will rain..." → ERRADO.',
    ],
    teacherExamples: [
      ex('If you study every day, your English will improve.', 'Se você estudar todos os dias, seu inglês vai melhorar.', 'Hábito condicional + resultado provável.'),
      ex('If we miss the bus, we will be late for the meeting.', 'Se perdermos o ônibus, vamos chegar atrasados para a reunião.', 'Causa e consequência real e próxima.'),
      ex('Unless you apologise, she won\'t forgive you.', 'A não ser que você se desculpe, ela não vai te perdoar.', '"Unless" = "if not". Negativa elegante.'),
      ex('As long as you keep practising, you\'ll make progress.', 'Enquanto você continuar praticando, vai progredir.', '"As long as" = condição contínua.'),
      ex('What will you do if the interview goes badly?', 'O que você vai fazer se a entrevista correr mal?', 'First Conditional em forma de pergunta.'),
    ],
    commonBrazilianMistakes: [
      { wrong: 'If it will rain, we will cancel the trip.', right: 'If it rains, we will cancel the trip.', why: '"Will" não entra na cláusula "if" do First Conditional. Usar present simple na condição.' },
      { wrong: 'If I will pass the exam, I will celebrate.', right: 'If I pass the exam, I will celebrate.', why: 'Mesmo erro — a cláusula "if" usa presente simples, nunca "will".' },
      { wrong: 'If you study, you improve.', right: 'If you study, you will improve.', why: 'First Conditional precisa de "will" na cláusula resultado. Sem "will" = Zero Conditional (verdade geral).' },
      { wrong: 'Unless you don\'t call her, she won\'t know.', right: 'Unless you call her, she won\'t know.', why: '"Unless" já significa "if not" — nunca use "unless...don\'t".' },
    ],
    guidedPractice: [q('Qual frase forma o First Conditional corretamente?', 'If you study every day, your English will improve over time.', '', 'If + present simple, will + infinitivo para possibilidade real.', ['If you study every day, your English will improve over time.', 'If you will study every day, your English will improve soon.', 'If you studied every day, your English will improve a lot.']), q('Escolha a frase condicional com consequência correta.', 'If we miss the bus, we will be late for the meeting today.', '', 'If + present simple (miss), will + be para a consequência.', ['If we miss the bus, we will be late for the meeting today.', 'If we will miss the bus, we will be late for the meeting.', 'If we missed the bus, we will be late for the meeting now.'])],
    controlledPractice: [
      task(
        'Complete as frases com a forma correta do verbo entre parênteses:',
        '1. If you ___ (not / hurry), you ___ (miss) the train. 2. Unless she ___ (call), I ___ (not / know) what happened. 3. If I ___ (get) the job, I ___ (start) next Monday.',
        '1. don\'t hurry / will miss. 2. calls / won\'t know. 3. get / will start.'
      ),
      task(
        'Ligue as duas colunas para formar First Conditionals lógicos:',
        'If I eat too much... / If we arrive on time... / Unless you rest... / As long as you focus... | ...you will feel ill. / ...you will succeed. / ...you won\'t recover. / ...we will get good seats.',
        'eat → feel ill; arrive → good seats; rest → recover; focus → succeed.'
      ),
    ],
    errorCorrectionPractice: [
      task('Corrija o erro: "If she will come, we will start the party."', '', '"If she comes, we will start the party." — remove "will" da cláusula if.'),
      task('Corrija o erro: "Unless you don\'t study, you won\'t pass."', '', '"Unless you study, you won\'t pass." — "unless" já é negativo.'),
      task('Corrija o erro: "If it rains tomorrow, we cancel the picnic."', '', '"If it rains tomorrow, we will cancel the picnic." — precisa de "will" na cláusula resultado.'),
    ],
    translationPractice: [
      task('Traduza: "Se você praticar todo dia, vai melhorar em um mês."', '', 'If you practise every day, you will improve in a month.'),
      task('Traduza: "A não ser que você saia agora, vai perder o avião."', '', 'Unless you leave now, you will miss the plane.'),
      task('Traduza: "O que vai acontecer se ele não aparecer?"', '', 'What will happen if he doesn\'t show up?'),
    ],
    productionTasks: [
      task(
        'Escreva 4 frases usando First Conditional sobre a sua vida real: planos, preocupações, esperanças.',
        'Use pelo menos: 1× unless, 1× as long as. Varie a ordem (if clause first / result clause first).',
      ),
      task(
        'Complete em voz alta: "If I improve my English, I will..." — 3 consequências reais e pessoais.',
        'Focus on using genuine personal goals, not generic answers.',
      ),
    ],
    lessonRecap: [
      'First Conditional = situações reais e prováveis: if + present simple / will + infinitivo.',
      'NUNCA use "will" na cláusula "if" — this is the most common Brazilian mistake.',
      '"Unless" = "if not" — nunca combine "unless...don\'t".',
      '"As long as" e "provided that" = variações de First Conditional com condição contínua.',
    ],
    nextLessonBridge: 'Na próxima aula, você vai aprender o Zero Conditional — para verdades gerais e fatos — e vai comparar os dois para saber quando usar cada um.',
  }),

  // ─── GRAMMAR-006: Zero Conditional vs First Conditional ──────────────────────
  createGrammarLesson({
    ...common,
    id: 'B1-GRAMMAR-006',
    order: 6,
    title: 'Zero Conditional vs First Conditional — facts vs possibilities',
    objectives: [
      'Formar o Zero Conditional: if + present simple / present simple.',
      'Distinguir Zero (fato geral) de First Conditional (possibilidade real).',
      'Usar Zero Conditional para ciência, regras, instruções e fatos universais.',
      'Escolher o condicional certo pelo contexto com segurança.',
    ],
    teacherOpening: 'Você já aprendeu o First Conditional para possibilidades reais. Agora o Zero Conditional: quando a condição for sempre verdadeira — um fato da natureza, uma regra, uma instrução — usamos presente simples nas duas cláusulas.',
    portugueseContrast: [task('Em Zero Conditional vs First Conditional — facts vs possibilities, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'Zero Conditional aparece em instruções de trabalho ("If a customer complains, we apologise immediately."), em ciência ("If you heat ice, it melts.") e em hábitos condicionais permanentes.',
    differenceFromA2: 'No A2, você usava "When you are tired, you sleep." No B1, você distingue esse tipo de fato universal de uma possibilidade futura real — e escolhe a estrutura certa.',
    grammarTable: {
      headers: ['Tipo', 'Estrutura', 'Significado', 'Exemplo'],
      rows: [
        ['Zero Conditional', 'if + present simple / present simple', 'Fato geral, sempre verdadeiro', 'If you mix red and blue, you get purple.'],
        ['First Conditional', 'if + present simple / will + infinitivo', 'Possibilidade real no futuro', 'If it rains, I will take an umbrella.'],
        ['Zero - regra', 'if + present simple / present simple', 'Instrução fixa/política', 'If a customer complains, we apologise.'],
        ['Zero - hábito', 'if + present simple / present simple', 'Consequência automática', 'If I skip breakfast, I feel tired all day.'],
      ],
    },
    whenToUse: [
      'Zero: verdades científicas ("If water reaches 0°C, it freezes.")',
      'Zero: regras fixas ou políticas ("If an alarm sounds, evacuate the building.")',
      'Zero: hábitos pessoais com resultado automático ("If I drink coffee after 8pm, I can\'t sleep.")',
      'First: planos e possibilidades reais do futuro ("If I get the job, I will start on Monday.")',
      'Dica: "when" pode substituir "if" no Zero Conditional — não no First.',
    ],
    teacherExamples: [
      ex('If you heat water to 100°C, it boils.', 'Se você aquecer água a 100°C, ela ferve.', 'Zero: lei da natureza — sempre verdadeiro.'),
      ex('If it rains tomorrow, we will cancel the trip.', 'Se chover amanhã, vamos cancelar a viagem.', 'First: possibilidade real no futuro.'),
      ex('If employees are late three times, they receive a warning.', 'Se funcionários se atrasarem três vezes, recebem um aviso.', 'Zero: política/regra fixa da empresa.'),
      ex('If I don\'t exercise, I feel sluggish.', 'Se eu não me exercito, me sinto lento.', 'Zero: consequência automática habitual.'),
      ex('When you press the button, the machine starts.', 'Quando você pressiona o botão, a máquina liga.', 'Zero: "when" é equivalente a "if" aqui.'),
    ],
    commonBrazilianMistakes: [
      { wrong: 'If water reaches 100°C, it will boil.', right: 'If water reaches 100°C, it boils.', why: 'Fatos científicos universais usam Zero Conditional, não First. "Will" sugere incerteza futura.' },
      { wrong: 'When I will arrive, I will call you.', right: 'When I arrive, I will call you.', why: '"When" com futuro nunca usa "will" na cláusula "when".' },
      { wrong: 'If you mix colours, you will get a new colour.', right: 'If you mix colours, you get a new colour.', why: 'Fato universal sobre mistura de cores = Zero Conditional.' },
      { wrong: 'I take an umbrella if it will rain.', right: 'I will take an umbrella if it rains.', why: '"Will" não vai na cláusula "if" — nem no First Conditional.' },
    ],
    controlledPractice: [
      task(
        'Classifique cada frase como Zero (Z) ou First (F) e complete com o verbo correto:',
        '1. If you _____ (freeze) meat, it _____ (last) much longer. 2. If she _____ (study) hard, she _____ (pass) the exam. 3. If the printer _____ (jam), press the reset button.',
        '1. Z: freeze / lasts. 2. F: studies / will pass. 3. Z: jams / press.'
      ),
      task(
        'Reescreva usando "when" onde for possível (Zero Conditional apenas):',
        '1. If you press enter, the document saves. 2. If it rains, I will stay home. 3. If temperatures drop, pipes freeze.',
        '1. When you press enter, the document saves. ✅ 2. NOT possible (First). 3. When temperatures drop, pipes freeze. ✅'
      ),
    ],
    errorCorrectionPractice: [
      task('Corrija: "If the sun shines, plants will grow."', '', 'If the sun shines, plants grow. (Zero — fato científico)'),
      task('Corrija: "When she will arrive, we will eat."', '', 'When she arrives, we will eat. (sem "will" após "when")'),
    ],
    translationPractice: [
      task('Traduza: "Se você não dormir o suficiente, fica com sono no dia seguinte."', '', 'If you don\'t sleep enough, you feel tired the next day. (Zero — hábito automático)'),
      task('Traduza: "Se eu conseguir o emprego, vou começar semana que vem."', '', 'If I get the job, I will start next week. (First — possibilidade real)'),
    ],
    productionTasks: [
      task(
        'Escreva 3 Zero Conditionals sobre fatos do seu trabalho, rotina ou área de conhecimento.',
        'Exemplo: "If employees miss a deadline, the manager receives a notification." Use fatos reais da sua vida.',
      ),
      task(
        'Escreva 3 First Conditionals sobre seus planos reais para os próximos 3 meses.',
        'Inclua: 1 plano profissional, 1 plano pessoal, 1 plano de inglês.',
      ),
    ],
    lessonRecap: [
      'Zero Conditional = fatos sempre verdadeiros: if + present simple / present simple.',
      'First Conditional = possibilidades reais futuras: if + present simple / will + infinitivo.',
      '"When" substitui "if" no Zero Conditional — mas NUNCA use "will" após "when" ou "if".',
      'Diferença-chave: "If you heat it, it boils." (sempre) vs "If you heat it, it will burn." (dessa vez específica).',
    ],
    nextLessonBridge: 'Na próxima aula de Grammar, você vai aprender as frases essenciais para expressar opiniões em inglês — "I think", "I believe", "In my view" — que são o coração de qualquer debate ou discussão B1.',
  }),

  // ─── GRAMMAR-007: Expressing opinions ────────────────────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B1-GRAMMAR-007',
    order: 7,
    title: 'Expressing opinions: I think, I believe, In my view',
    objectives: [
      'Usar frases-padrão de opinião: I think, I believe, In my opinion, I feel, I\'d say.',
      'Graduar a força da opinião: I\'m certain vs I think vs I\'m not sure.',
      'Usar "I think so / I don\'t think so" como resposta natural.',
      'Introduzir uma opinião com naturalidade, sem tradução literal do português.',
    ],
    teacherOpening: 'Expressar opiniões é uma das habilidades mais importantes do B1. Mas muitos brasileiros traduzem literalmente: "I have the impression that..." ou "My thought is..." — que soam estranhos em inglês. Esta aula ensina as fórmulas exatas que falantes nativos usam.',
    portugueseContrast: [task('Em Expressing opinions: I think, I believe, In my view, observe que a estrutura do inglês difere da ordem natural do português.'), task('Não traduza literalmente; identifique o padrão do inglês antes de produzir.')], 
    whyItMatters: 'Em conversas, entrevistas, discussões em grupo e textos de opinião, você precisa dessas frases para soar natural e organizado. Sem elas, sua opinião parece incompleta ou abrupta.',
    differenceFromA2: 'No A2, você dizia: "I like it" ou "It is good." No B1, você formula opiniões mais elaboradas: "I think it\'s a great idea, although I\'m not sure it would work in practice."',
    grammarTable: {
      headers: ['Força', 'Frase', 'Exemplo completo'],
      rows: [
        ['Certeza', 'I\'m certain (that) / I strongly believe', 'I\'m certain that education is the key.'],
        ['Forte', 'I think / I believe / I feel', 'I think the government should act faster.'],
        ['Moderada', 'I\'d say / In my view / In my opinion', 'In my view, this isn\'t the best solution.'],
        ['Pessoal', 'Personally, I... / From my perspective', 'Personally, I prefer working from home.'],
        ['Incerta', 'I\'m not sure, but... / I might be wrong, but...', 'I\'m not sure, but I think prices will fall.'],
        ['Acordo', 'I think so / I think you\'re right', 'A: Will it work? B: I think so.'],
        ['Desacordo', 'I don\'t think so / I\'m not convinced', 'I don\'t think that\'s the best approach.'],
      ],
    },
    whenToUse: [
      '"I think" — uso geral, mais comum no inglês falado.',
      '"I believe" — opinião mais formal ou convicção mais firme.',
      '"In my opinion/view" — início de argumento escrito ou falado formal.',
      '"I\'d say" — opinião pessoal dada com leveza, sem impor.',
      '"Personally" — marca que é sua visão individual, não fato geral.',
    ],
    whenNotToUse: [
      'NÃO traduza "Eu tenho a impressão de que..." como "I have the impression that..." — use "I get the feeling that..." ou "I think...".',
      'NÃO use "My thought is..." — em inglês diz-se "My view is..." ou "I think...".',
      'Evite "I am thinking that..." para opiniões — use "I think that..." (sem -ing).',
    ],
    teacherExamples: [
      ex('I think online learning is more flexible than classroom learning.', 'Acho que o ensino online é mais flexível que o ensino presencial.', 'Opinião B1: "I think" + afirmação + comparação.'),
      ex('In my view, the most important skill for the future is adaptability.', 'Na minha visão, a habilidade mais importante para o futuro é a adaptabilidade.', 'Opinião formal com substantivo abstrato.'),
      ex('I\'m not sure, but I think remote work has increased productivity overall.', 'Não tenho certeza, mas acho que o trabalho remoto aumentou a produtividade geral.', 'Opinião moderada com hedge: "I\'m not sure, but..."'),
      ex('Personally, I prefer small cities to large ones.', 'Pessoalmente, prefiro cidades pequenas às grandes.', 'Opinião pessoal com "personally".'),
      ex('A: Do you think they\'ll win? B: I think so, yes.', 'A: Você acha que eles vão ganhar? B: Acho que sim.', '"I think so" como resposta curta natural.'),
    ],
    commonBrazilianMistakes: [
      { wrong: 'I am thinking that this is wrong.', right: 'I think this is wrong.', why: '"Think" no sentido de opinião não usa forma contínua. "I am thinking" = estou pensando agora (processo mental ativo).' },
      { wrong: 'My thought is that we should wait.', right: 'I think we should wait. / My view is that we should wait.', why: '"My thought is..." não é natural em inglês. Use "my view/opinion is..." ou simplesmente "I think...".' },
      { wrong: 'I have the impression that prices are rising.', right: 'I get the feeling that / I think prices are rising.', why: '"Have the impression" soa como tradução literal. Em inglês: "I get the feeling that..." ou "It seems to me that...".' },
      { wrong: 'I don\'t think nothing will change.', right: 'I don\'t think anything will change.', why: 'Dupla negativa proibida em inglês. "I don\'t think" já é negativo — use "anything".' },
    ],
    guidedPractice: [q('Qual frase expressa opinião com I think corretamente?', 'I think online learning is more flexible than classroom learning.', '', 'I think + opinião com comparativo (more flexible than).', ['I think online learning is more flexible than classroom learning.', 'I think online learning is more flexible that classroom learning.', 'I think online learning is flexibler than classroom learning now.']), q('Escolha a frase de opinião com In my view.', 'In my view, the most important skill for the future is adaptability.', '', 'In my view introduz opinião pessoal sobre habilidades futuras.', ['In my view, the most important skill for the future is adaptability.', 'In my view, the more important skill for the future is adaptability.', 'In my views, the most important skill for the future is adaptable.'])],
    controlledPractice: [
      task(
        'Reescreva usando a frase de opinião entre parênteses:',
        '1. "Learning a language is hard." (I believe) 2. "Remote work is better." (Personally) 3. "Prices will fall." (I\'m not sure, but I think) 4. "Will it work?" "Yes." (I think so)',
        '1. I believe learning a language is hard. 2. Personally, I think remote work is better. 3. I\'m not sure, but I think prices will fall. 4. I think so.'
      ),
      task(
        'Classifique a força de cada opinião: Strong / Moderate / Uncertain',
        '1. "I\'m certain this is the right approach." 2. "In my view, it could work." 3. "I might be wrong, but I think it\'s risky."',
        '1. Strong. 2. Moderate. 3. Uncertain.'
      ),
    ],
    errorCorrectionPractice: [
      task('Corrija: "I am thinking that we should change our strategy."', '', '"I think we should change our strategy." — sem forma contínua para opinião.'),
      task('Corrija: "My thought is that the project needs more time."', '', '"I think / My view is that the project needs more time."'),
      task('Corrija: "I don\'t think nothing has changed."', '', '"I don\'t think anything has changed." — sem dupla negativa.'),
    ],
    translationPractice: [
      task('Traduza: "Na minha visão, o maior problema é a falta de comunicação."', '', 'In my view, the biggest problem is the lack of communication.'),
      task('Traduza: "Acho que tem, sim." (resposta a "Do you think they have any?")', '', '"I think so, yes." — não "I think that yes."'),
      task('Traduza: "Pessoalmente, não tenho certeza se é a melhor ideia."', '', '"Personally, I\'m not sure it\'s the best idea."'),
    ],
    productionTasks: [
      task(
        'Dê a sua opinião sobre 3 temas atuais usando frases diferentes: 1× "I believe", 1× "In my view", 1× "Personally, I...".',
        'Temas sugeridos: trabalho remoto, tecnologia na educação, transporte público.',
      ),
      task(
        'Responda em voz alta usando "I think so" / "I don\'t think so": 1. "Do you think AI will replace teachers?" 2. "Do you think your city will change a lot in 10 years?"',
        'Depois de "I think so/don\'t think so", acrescente uma frase explicando por quê.',
      ),
    ],
    lessonRecap: [
      '"I think / I believe / In my view / I\'d say" = fórmulas de opinião mais usadas no inglês B1.',
      '"I think" nunca usa forma contínua para opinião — apenas "I think", não "I\'m thinking".',
      '"I think so / I don\'t think so" = respostas curtas de concordância/discordância.',
      'Gradação: I\'m certain → I think → I\'d say → I\'m not sure, but...',
    ],
    nextLessonBridge: 'Na próxima aula, você vai aprender o vocabulário de debate e discussão — as palavras que você precisa para concordar, discordar, conceder um ponto e organizar seu argumento em inglês.',
  }),

  // ─── VOCABULARY-006: Opinion and discussion vocabulary ───────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B1-VOCABULARY-006',
    order: 6,
    title: 'Opinion and discussion vocabulary',
    objectives: [
      'Usar 16+ palavras e expressões de debate e discussão.',
      'Concordar, discordar e conceder um ponto com frases naturais.',
      'Distinguir concordância parcial de concordância total.',
      'Usar expressões de clarificação e reformulação.',
    ],
    teacherOpening: 'Ter uma opinião é uma coisa. Defender, concordar, discordar e negociar em inglês é outra. Esta aula dá o vocabulário exato que você precisa para participar de qualquer discussão em inglês — do jeito que falantes nativos fazem.',
    whyItMatters: 'Em reuniões, discussões em grupo, entrevistas e até em redes sociais, você precisa de mais do que "I agree" e "I disagree". Precisa de nuance, de respeito e de clareza. Essa aula dá isso.',
    differenceFromA2: 'No A2: "I agree" ou "I don\'t agree". No B1: "That\'s a fair point, but I think..." / "I see what you mean, although..." / "I\'d have to agree with you there."',
    essentialWords: [
      word('That\'s a fair point', 'É um ponto justo', 'That\'s a fair point, but I still think prices are too high.', 'Concessão educada antes de contra-argumentar.'),
      word('I see what you mean', 'Entendo o que você quer dizer', 'I see what you mean, although I\'m not sure I agree completely.', 'Demonstra escuta ativa antes de discordar.'),
      word('I\'d have to agree', 'Teria que concordar', 'I\'d have to agree — the data is quite convincing.', 'Concordância após consideração — mais elaborada que "I agree".'),
      word('I\'m not convinced', 'Não estou convencido(a)', 'I\'m not convinced that this is the right approach.', 'Discordância polida — mais suave que "I disagree".'),
      word('To be fair', 'Para ser justo', 'To be fair, it\'s not entirely their fault.', 'Introduz um ponto equilibrado ou defesa de algo.'),
      word('On the one hand... on the other hand', 'Por um lado... por outro lado', 'On the one hand, it saves time. On the other, it\'s expensive.', 'Estrutura clássica de dois lados de um argumento.'),
      word('Having said that', 'Dito isso, mesmo assim', 'The plan is risky. Having said that, we need to take risks.', 'Contradição após concessão — altamente natural.'),
      word('What\'s more', 'Além do mais', 'It\'s cheaper. What\'s more, it\'s faster.', 'Adição de argumento adicional (mais forte que "also").'),
      word('Despite the fact that', 'Apesar do fato de que', 'Despite the fact that it\'s expensive, it\'s worth it.', 'Concessão formal — mais elaborada que "although".'),
      word('It\'s worth pointing out that', 'Vale ressaltar que', 'It\'s worth pointing out that this data is from 2018.', 'Introduz informação importante/subestimada.'),
      word('As far as I can tell', 'Pelo que posso dizer', 'As far as I can tell, the situation is improving.', 'Opinião com grau de incerteza transparente.'),
      word('That said', 'Dito isso', 'The results are positive. That said, more research is needed.', 'Variação de "Having said that" — mais formal.'),
      word('In contrast', 'Em contraste', 'City life is fast-paced. In contrast, rural life is quieter.', 'Para introduzir contraste claro entre dois pontos.'),
      word('to make a point', 'defender um ponto, argumentar', 'She made a strong point about the environment.', 'Falar sobre argumentação em si.'),
      word('to raise a concern', 'levantar uma preocupação', 'He raised a valid concern about the budget.', 'Introduzir preocupação de forma diplomática.'),
      word('to come to a conclusion', 'chegar a uma conclusão', 'We came to the conclusion that more time was needed.', 'Encerrar um argumento.'),
    ],
    chunks: [
      phrase('That\'s a fair point, but...', 'É um ponto justo, mas...', 'Concessão → contra-argumento.'),
      phrase('I see what you mean, although...', 'Entendo o que quer dizer, embora...', 'Escuta ativa → discordância parcial.'),
      phrase('On the one hand... on the other hand...', 'Por um lado... por outro...', 'Estrutura bilateral clássica.'),
      phrase('Having said that,...', 'Dito isso,...', 'Contradição pós-concessão.'),
      phrase('It\'s worth pointing out that...', 'Vale ressaltar que...', 'Destaque de informação importante.'),
      phrase('As far as I can tell,...', 'Pelo que posso dizer,...', 'Opinião com incerteza explícita.'),
      phrase('I\'m not entirely convinced that...', 'Não estou totalmente convencido(a) de que...', 'Discordância parcial — elegante.'),
    ],
    dangerousConfusions: [
      task('"Having said that" + "but" — redundância', '"Having said that" já faz o contraste. Não adicione "but" depois.', 'Errado: "Having said that, but I disagree." Correto: "Having said that, I disagree."'),
      task('"Although" vs "However"', '"Although" conecta duas cláusulas na mesma frase. "However" inicia uma nova frase.', '"Although it\'s expensive, it\'s worth it." vs "It\'s expensive. However, it\'s worth it."'),
      task('"Despite" + gerúndio, nunca "despite of"', '"Despite" já é preposição — não precisa de "of".', 'Errado: "Despite of the cost..." Correto: "Despite the cost..." ou "Despite the fact that it costs..."'),
      task('"On the other hand" sem "on the one hand"', '"On the other hand" precisa de um primeiro lado para contrastar. Em discurso formal, use "on the one hand... on the other hand" em par.', 'Use "However" para contraste sem o par se a primeira parte já foi dita.'),
    ],
    miniDialogues: [
      {
        title: 'Discussing working from home',
        lines: [
          'A: I think working from home is much better than going to the office every day.',
          'B: That\'s a fair point. On the one hand, you save time on commuting. On the other hand, some people find it hard to stay motivated at home.',
          'A: I see what you mean. Having said that, most people I know are more productive at home.',
          'B: I\'m not entirely convinced. It really depends on the person, as far as I can tell.',
          'A: To be fair, you\'re right about that.',
        ],
        focus: 'That\'s a fair point, on the one hand/other hand, having said that, I\'m not convinced, as far as I can tell, to be fair.',
      },
    ],
    productionTasks: [
      task(
        'Escolha um tema e escreva 5-7 frases de diálogo entre duas pessoas com opiniões diferentes. Use pelo menos 4 expressões desta aula.',
        'Temas: tecnologia na escola / transporte público / trabalho remoto.',
      ),
      task(
        'Em voz alta, dê sua opinião sobre transporte público na sua cidade. Use: "In my view...", "On the one hand...", "Having said that...", "What\'s more..."',
        'Meta: 60-90 segundos de fala contínua com argumentação estruturada.',
      ),
    ],
    lessonRecap: [
      '"That\'s a fair point, but..." = concessão → contra-argumento — a estrutura mais usada em debate B1.',
      '"On the one hand / on the other hand" = apresentar dois lados equilibrados.',
      '"Having said that" e "That said" = contradição após concessão — não usam "but" depois.',
      '"Despite" nunca usa "of" — "despite the cost" não "despite of the cost".',
    ],
    recognitionPractice: [{ question: 'Opinion and discussion vocabulary — qual vocabulário desta aula significa "Entendo o que você quer dizer"?', options: ['I see what you mean', 'To be fair', 'On the one hand... on the other hand'], answer: 'I see what you mean', explanation: 'I see what you mean = Entendo o que você quer dizer; vocabulário trabalhado nesta aula.' }, { question: 'Opinion and discussion vocabulary — qual opção combina com "I see what you mean"?', options: ['Entendo o que você quer dizer', 'Para ser justo', 'Por um lado... por outro lado'], answer: 'Entendo o que você quer dizer', explanation: 'I see what you mean significa Entendo o que você quer dizer no contexto desta aula.' }],
    nextLessonBridge: 'Na próxima aula de Speaking, você vai usar tudo que aprendeu sobre opiniões, frases de debate e vocabulário de discussão para expressar e defender uma opinião em 90-120 segundos.',
  }),

  // ─── SPEAKING-003: Expressing and defending opinions ─────────────────────────
  createSpeakingLesson({
    ...common,
    id: 'B1-SPEAKING-003',
    order: 3,
    title: 'Express and defend an opinion',
    objectives: [
      'Expressar uma opinião clara em inglês com as frases corretas.',
      'Defender essa opinião com pelo menos 2 argumentos.',
      'Usar conectores de contraste e adição: although, however, what\'s more.',
      'Reconhecer e responder a um contra-argumento com "That\'s a fair point, but...".',
      'Gravar uma resposta de 90-120 segundos sobre um tema de debate.',
    ],
    teacherOpening: 'No B1, você não está mais descrevendo fatos. Você está argumentando — dando opiniões, defendendo-as, respondendo a objeções. Esta aula ensina como fazer isso de forma natural, organizada e confiante.',
    whyItMatters: 'Entrevistas de emprego, conversas com nativos, redações de exame e debates acadêmicos — todos exigem a habilidade de expressar e defender opiniões. É o salto entre B1 e B2.',
    differenceFromA2: 'No A2: "I like working from home. It is comfortable." No B1: "I believe working from home is more productive, although it has its challenges. What\'s more, it reduces commuting stress. That said, I understand that some people need the office environment."',
    speakingSituation: 'Someone asks your opinion on a topic you care about. Give your view clearly, support it with 2-3 reasons, acknowledge a possible counterpoint, and conclude. Target: 90-120 seconds. Model (working from home): "I\'d say working from home is generally more productive — at least for me. On the one hand, you have fewer interruptions. What\'s more, you save a lot of time on commuting. I know some people struggle with motivation at home, and that\'s a fair point. Having said that, I think the benefits outweigh the drawbacks for most knowledge workers. Personally, I\'m much more focused at home."',
    modelPhrases: [
      phrase('I\'d say... / I believe... / In my view...', 'Eu diria... / Acredito... / Na minha visão...', 'Opening the opinion clearly.'),
      phrase('On the one hand,... / On the other hand,...', 'Por um lado,... / Por outro lado,...', 'Showing two sides of the argument.'),
      phrase('What\'s more,...', 'Além do mais,...', 'Adding a stronger/additional argument.'),
      phrase('That\'s a fair point, but...', 'É um ponto justo, mas...', 'Acknowledging a counterpoint before rebutting.'),
      phrase('Having said that,...', 'Dito isso,...', 'Conceding and then contrasting.'),
      phrase('Personally, I think...', 'Pessoalmente, acho que...', 'Marking the opinion as your own view.'),
      phrase('I\'m not entirely convinced that...', 'Não estou totalmente convencido(a) de que...', 'Polite partial disagreement.'),
    ],
    substitutionDrills: [
      {
        base: 'I believe [topic] is [opinion], although [concession].',
        substitutions: [
          'technology in schools is essential / some students get distracted',
          'public transport should be free / it would be very expensive',
          'remote work is more productive / not everyone has a good home office',
        ],
      },
      {
        base: 'On the one hand, [advantage]. On the other hand, [disadvantage].',
        substitutions: [
          'social media helps people connect / it can be addictive',
          'living abroad broadens your perspective / it can be lonely at first',
          'learning online is flexible / it requires more self-discipline',
        ],
      },
    ],
    pronunciationFocus: {
      title: 'Pronunciation & shadowing',
      tips: [
        'Shadow: "I believe working from home is more productive, although it has its challenges." Stress: beLIEVE, proDUCtive, CHALlenges.',
        '"On the one hand... On the other hand..." — pause briefly after each "hand" to signal the contrast clearly.',
        '"Having said that" — say it as one chunk: /ˈhævɪŋ.sed.ðæt/. Practise linking "said-that".',
        '"That\'s a fair point, but..." — stress FAIR and BUT equally to acknowledge and counter in one breath.',
      ],
    },
    guidedSpeaking: [
      task(
        'Responda em voz alta: "What do you think about social media — is it mainly positive or negative?" — 60 segundos, use pelo menos: "I believe...", "On the one hand...", "Having said that...".',
      ),
      task(
        'Responda: "Some people say learning English is not necessary if you speak Portuguese. Do you agree?" — Dê sua opinião + 2 argumentos + 1 concessão.',
      ),
      task(
        'Pratique responder a um contra-argumento: Alguém diz "I think technology is making us less social." Responda com "That\'s a fair point, but..." e dê seu contra-argumento.',
      ),
    ],
    speakingChecklist: [
      task('Abri minha resposta com uma frase de opinião clara (I think/believe/In my view)?'),
      task('Dei pelo menos 2 argumentos para defender minha opinião?'),
      task('Usei "what\'s more" ou "in addition" para adicionar um argumento?'),
      task('Reconheci um possível contra-argumento ("That\'s a fair point, but...")?'),
      task('Usei "having said that" ou "however" para fazer contraste?'),
      task('Minha resposta durou 90-120 segundos?'),
    ],
    recordingTasks: [
      task(
        'Grave 90-120 segundos respondendo: "Do you think people should be allowed to work from home permanently? Give your opinion and support it with reasons."',
        'Use: I believe/think/In my view + 2 argumentos (on the one hand / what\'s more) + 1 concessão (that\'s a fair point) + conclusão (having said that / personally).',
      ),
    ],
    freeSpeaking: [
      task('Should university education be free? Give your opinion + 2 reasons + 1 concession.'),
      task('Is social media more harmful than beneficial? State your view and defend it.'),
      task('Some people think cities are better than the countryside. Do you agree? Why/why not?'),
    ],
    selfAssessment: [
      task('Minha opinião ficou clara desde o início?'),
      task('Usei pelo menos 3 expressões de opinião/debate desta aula?'),
      task('Reconheci um ponto oposto sem perder minha posição?'),
      task('Mantive fluência por 90+ segundos sem paradas longas?'),
    ],
    lessonRecap: [
      'Estrutura de opinião B1: opinião → argumento 1 → argumento 2 → concessão → conclusão.',
      '"That\'s a fair point, but..." = a frase mais útil para responder a objeções.',
      '"On the one hand / on the other hand" = estrutura para apresentar dois lados.',
      '"What\'s more" = adicionar argumento mais forte (upgrade de "also" ou "and").',
    ],
    nextLessonBridge: 'Na próxima parte do B1.3, você vai aprender os linkers (although, however, therefore, besides) e como escrever e ler textos de opinião — completando o pacote Opinions.',
  }),

]);

export const B1_DEEP_OPINIONS_PART1_BY_PILLAR = Object.freeze({
  grammar: B1_DEEP_OPINIONS_PART1.filter(l => l.pillar === 'grammar'),
  vocabulary: B1_DEEP_OPINIONS_PART1.filter(l => l.pillar === 'vocabulary'),
  reading: B1_DEEP_OPINIONS_PART1.filter(l => l.pillar === 'reading'),
  listening: B1_DEEP_OPINIONS_PART1.filter(l => l.pillar === 'listening'),
  speaking: B1_DEEP_OPINIONS_PART1.filter(l => l.pillar === 'speaking'),
  writing: B1_DEEP_OPINIONS_PART1.filter(l => l.pillar === 'writing'),
});
