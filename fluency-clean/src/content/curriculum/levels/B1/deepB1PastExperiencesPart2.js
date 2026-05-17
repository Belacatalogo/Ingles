import { createVocabularyLesson, createListeningLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'B1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['b1-2', 'past-experiences', 'storytelling', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function word(w, def, ex = '', note = '') { return { word: w, definition: def, example: ex, note }; }
function q(question, answer, evidence = '', why = '') { return { question, answer, evidence, why }; }

export const B1_DEEP_PAST_EXPERIENCES_PART2 = Object.freeze([

  // ─── VOCABULARY-004: Narrative vocabulary ────────────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B1-VOCABULARY-004',
    order: 4,
    title: 'Narrative vocabulary: sequence, surprise and emotion',
    objectives: [
      'Usar 16+ palavras e expressões essenciais para narrativa.',
      'Distinguir sequência temporal (firstly, eventually) de surpresa (it turned out, to my surprise).',
      'Expressar arco emocional com at first, gradually, by the end.',
      'Usar expressões de ênfase: of all things, of all places, believe it or not.',
    ],
    teacherOpening: 'Uma boa história em inglês não é só "I did X, then Y". É uma sequência com emoção, surpresa e reflexão. Esta aula dá o vocabulário exato que separa uma narrativa B1 de uma A2.',
    whyItMatters: 'Sem vocabulário narrativo, você soa como uma lista de eventos. Com ele, você conta histórias que prendem a atenção do ouvinte — essencial em entrevistas, conversas sociais e textos B1.',
    differenceFromA2: 'No A2: "first... then... after". No B1: "at first I assumed... but it turned out... gradually I realized... looking back..."',
    essentialWords: [
      word('at first', 'no início, inicialmente', 'At first I was nervous, but then I relaxed.', 'Para estado inicial antes de mudança.'),
      word('gradually', 'aos poucos, gradualmente', 'Gradually I started to feel at home.', 'Processo lento de mudança.'),
      word('eventually', 'eventualmente, no final das contas', 'Eventually we found the right address.', 'Depois de esforço ou tempo.'),
      word('all of a sudden', 'de repente', 'All of a sudden, the lights went out.', 'Mudança abrupta e inesperada.'),
      word('to my surprise', 'para minha surpresa', 'To my surprise, he remembered my name.', 'Expectativa invertida.'),
      word('it turned out (that)', 'aconteceu que, descobriu-se que', 'It turned out that she knew my sister.', 'Revelação de algo inesperado.'),
      word('believe it or not', 'acredite ou não', 'Believe it or not, we arrived on time.', 'Ênfase em algo improvável.'),
      word('of all things/places', 'de todas as coisas/lugares', 'I met him in Tokyo, of all places.', 'Ênfase na improbabilidade.'),
      word('by the end', 'no final, ao final', 'By the end, everyone was laughing.', 'Situação no ponto final.'),
      word('looking back', 'olhando para trás, retrospectivamente', 'Looking back, it was the right decision.', 'Reflexão sobre o passado.'),
      word('at the time', 'naquela época, na época', 'At the time, I had no idea what would happen.', 'Perspectiva de quem ainda não sabe o futuro.'),
      word('with hindsight', 'em retrospecto, com a visão de agora', 'With hindsight, I should have left earlier.', 'Julgamento retrospectivo.'),
      word('out of nowhere', 'do nada, inesperadamente', 'Out of nowhere, someone called my name.', 'Ação completamente inesperada.'),
      word('in the end', 'no fim, no final das contas', 'In the end, everything worked out.', '"In the end" = resultado final; "at the end" = no final de algo específico.'),
      word('as it happened', 'como aconteceu, curiosamente', 'As it happened, I was already planning to go.', 'Marca coincidência irônica.'),
      word('all along', 'o tempo todo', 'She had known all along.', 'Algo que era verdade desde o início, mas só revelado depois.'),
    ],
    chunks: [
      phrase('It turned out (that)...', 'Descobriu-se que...', 'Para revelar algo inesperado.'),
      phrase('To my surprise/relief/horror...', 'Para minha surpresa/alívio/horror...', 'Variáveis emocionais poderosas.'),
      phrase('All of a sudden, everything changed.', 'De repente, tudo mudou.'),
      phrase('Looking back, I think it was...', 'Olhando para trás, acho que foi...'),
      phrase('At first I thought..., but then I realized...', 'A princípio pensei..., mas então percebi...'),
      phrase('And then, out of nowhere,...', 'E então, do nada,...'),
      phrase('Believe it or not,...', 'Acredite ou não,...'),
    ],
    conceptExplanation: 'Narrative arc: at first → gradually → eventually → by the end → in the end. Surprise scale: surprisingly → to my surprise → it turned out → believe it or not → out of nowhere → of all things. Emotional arc: at first (worried) → gradually (calmer) → eventually (settled) → by the end (relieved).',
    dangerousConfusions: [
      task('"In the end" vs "at the end"', '"In the end" = o resultado final (after all). "At the end" = no ponto final de algo específico.', '"In the end we succeeded." vs "At the end of the film, she leaves."'),
      task('"Eventually" ≠ "eventualmente" (falso cognato)', 'Em inglês "eventually" = no final das contas, depois de um tempo. Não é sinônimo de "possivelmente" como no português.', '"Eventually" = after some time/effort, not "possibly".'),
      task('"All of sudden" — artigo faltando', '"All of a sudden" — o artigo "a" é obrigatório sempre.', 'Sempre: "all OF A sudden", nunca "all of sudden".'),
      task('"At the time" — encorajar uso ativo', 'Brasileiro tende a evitar "at the time" e usar "then" ou nada. "At the time" é a marca de perspectiva retrospectiva — use sempre.', '"At the time, I had no idea..." = A2→B1 upgrade de "then".'),
    ],
    miniDialogues: [
      {
        title: 'After a job interview',
        lines: [
          'A: So how did the interview go?',
          'B: Well, at first I was really nervous — I almost didn\'t go in. But gradually I relaxed.',
          'A: And?',
          'B: It turned out the interviewer had worked at my old company! Believe it or not, we knew the same people.',
          'A: Wow. Did you get it?',
          'B: I found out this morning — I did! Looking back, I\'m glad I went despite the nerves.',
        ],
        focus: 'at first, gradually, it turned out, believe it or not, looking back.',
      },
    ],
    productionTasks: [
      task(
        'Conte um acontecimento recente usando pelo menos 5 das palavras desta aula: at first, eventually, it turned out, to my surprise, looking back, in the end.',
        'Escreva 5-7 frases. Sublinhe cada palavra de narrativa usada.',
      ),
      task(
        'Complete as frases com a palavra certa (at first / eventually / it turned out / all of a sudden):',
        '1. ___ I thought the movie was boring. 2. ___ he had been lying the whole time. 3. ___ the alarm went off. 4. ___ she found a solution.',
        '1. At first. 2. It turned out. 3. All of a sudden. 4. Eventually.'
      ),
      task(
        'Traduza com precisão: "Olhando para trás, acho que deveria ter esperado mais. Naquela época, eu não sabia o que estava por vir."',
        'Foco em: "looking back", "at the time", "what was to come / what would happen next".',
        'Looking back, I think I should have waited longer. At the time, I had no idea what was to come.'
      ),
    ],
    lessonRecap: [
      '"At first... gradually... eventually... in the end" = arco temporal completo.',
      '"It turned out / to my surprise / out of nowhere" = vocabulário de surpresa e revelação.',
      '"Looking back / with hindsight / at the time" = perspectiva temporal — separam B1 do A2.',
      '"Eventually" ≠ "eventualmente" em português — é falso cognato.',
    ],
    nextLessonBridge: 'Na próxima aula de Vocabulary, você vai aprender expressões para falar sobre o passado em geral: used to, would, it was the first time — as estruturas que dão profundidade histórica às suas histórias.',
  }),

  // ─── VOCABULARY-005: Talking about the past ──────────────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B1-VOCABULARY-005',
    order: 5,
    title: 'Talking about the past — used to, would, expressions',
    objectives: [
      'Usar "used to" para hábitos e estados passados que já não existem.',
      'Usar "would" para hábitos passados repetidos em narrativa.',
      'Distinguir "used to" de "was/were + -ing" e de "would".',
      'Usar expressões de passado: it was the first time, I had never, I used to think, back then.',
    ],
    teacherOpening: 'Falar do passado em inglês vai além do Past Simple. "I used to" e "I would" são ferramentas poderosas para descrever como sua vida era diferente antes — e são marcas claras de B1.',
    whyItMatters: '"Used to" aparece em todo texto autobiográfico, entrevista e conversa sobre o passado. Sem ele, suas histórias ficam presas no Present Simple ("I was young and..."), que soa não natural.',
    differenceFromA2: 'No A2: "When I was young I played football every week." No B1: "I used to play football every week. We would go to the park on Sunday mornings and spend hours there. Back then, it was all that mattered."',
    essentialWords: [
      word('used to + verb', 'costumava (fazer), tinha o hábito de', 'I used to walk to school.', 'Para hábitos E estados que não são mais verdade.'),
      word('would + verb', 'costumava (fazer) — apenas ações', 'Every Sunday we would visit my grandparents.', 'Só para ações repetidas, nunca para estados. Não: "I would live there."'),
      word('back then', 'naquela época', 'Back then, we didn\'t have smartphones.', 'Marca contraste passado vs presente.'),
      word('in those days', 'naquela época', 'In those days, everything was simpler.', 'Similar a "back then" — mais literário.'),
      word('it was the first time', 'era a primeira vez', 'It was the first time I had flown.', 'Note: "had flown" = Past Perfect após "first time".'),
      word('I had never', 'eu nunca tinha', 'I had never seen so many people.', 'Past Perfect para experiências antes de um ponto.'),
      word('as a child', 'quando criança, na infância', 'As a child, I was afraid of the dark.', 'Natural para contextualizar o passado.'),
      word('at the time', 'na época', 'At the time, I thought it was the right decision.', 'Ponto de vista do passado.'),
      word('things were different then', 'as coisas eram diferentes então', 'Things were very different back then.', 'Frase de contraste passado/presente.'),
      word('that was before', 'isso foi antes de', 'That was before I moved abroad.', 'Sequência temporal de mudança.'),
      word('I\'ve always', 'eu sempre (tenho)', 'I\'ve always loved travelling.', 'Present Perfect para conexão passado-presente.'),
      word('I never used to', 'eu nunca costumava', 'I never used to drink coffee.', 'Negativa: I didn\'t use to / I never used to — ambas corretas.'),
      word('I\'d forgotten', 'eu tinha esquecido', 'I\'d forgotten how cold it gets.', 'Past Perfect contraction em uso natural.'),
      word('looking back on it', 'olhando para isso agora', 'Looking back on it, I think it shaped who I am.', 'Reflexão mais específica que "looking back".'),
    ],
    chunks: [
      phrase('I used to [verb]...', 'Eu costumava [verbo]...', 'Para hábito ou estado que mudou.'),
      phrase('We would [verb] every [time period].', 'A gente costumava [verbo] todo(a) [período].', 'Para ação repetida — nunca estado.'),
      phrase('Back then, things were different.', 'Naquela época, as coisas eram diferentes.'),
      phrase('It was the first time I had ever [past participle].', 'Era a primeira vez que eu tinha [particípio].'),
      phrase('I had never [past participle] before.', 'Eu nunca tinha [particípio] antes.'),
      phrase('As a child, I used to...', 'Quando criança, eu costumava...'),
      phrase('That was before I [past simple].', 'Isso foi antes de eu [passado simples].'),
    ],
    conceptExplanation: '"Used to" cobre hábitos E estados. "Would" cobre apenas ações repetidas, nunca estados. Correto: "I used to live there" (estado). Errado: "I would live there." Correto: "We would go out every Sunday" (ação repetida). Ambas formas funcionam para ações: "I used to play / I would play".',
    dangerousConfusions: [
      task('"I use to play guitar." — presente não existe', '"Used to" só existe no passado. Não há forma presente. Para hábito presente use "I usually play" ou "I tend to play".', '"I used to play guitar." (passado) / "I usually play guitar." (presente)'),
      task('"I would live near the beach." — estado com would', '"Would" não pode descrever estados (live, be, know, have, love, etc.). Use "used to" para estados.', '"I used to live near the beach." (estado = correto)'),
      task('"It was the first time I saw the ocean." — Past Perfect obrigatório', 'Após "it was the first time", o verbo subordinado exige Past Perfect ("had seen"), não Past Simple.', '"It was the first time I had seen the ocean."'),
      task('"I didn\'t used to like vegetables." — forma da negativa', 'Na negativa: "I didn\'t use to" (sem d após didn\'t) ou "I used not to" (formal). "Didn\'t used to" existe mas é considerada errada em exames.', 'Natural: "I didn\'t use to like vegetables." / Formal: "I used not to like vegetables."'),
    ],
    miniDialogues: [
      {
        title: 'Two old friends catching up',
        lines: [
          'A: Do you remember what we used to do after school?',
          'B: Of course! We would always go to that little café on the corner. I\'d forgotten how much time we spent there.',
          'A: Back then, we had no responsibilities. Things were so different.',
          'B: It was the first time I\'d ever had real freedom. I used to feel like anything was possible.',
          'A: Looking back on it, those were probably the best years.',
          'B: I\'ve always thought so too.',
        ],
        focus: 'used to, would, back then, it was the first time, looking back on it.',
      },
    ],
    productionTasks: [
      task(
        'Escreva 5-6 frases sobre como você era diferente há 5-10 anos. Use: used to, would, back then, at the time, looking back.',
        'Inclua pelo menos 1 estado (used to + estado) e 1 ação repetida (would + ação).',
      ),
      task(
        'Corrija o erro em cada frase: 1. I use to be shy. 2. I would live in the south. 3. It was the first time I saw snow. 4. I didn\'t used to eat meat.',
        '',
        '1. I used to be shy. 2. I used to live in the south. 3. It was the first time I had seen snow. 4. I didn\'t use to eat meat.'
      ),
      task(
        'Traduza: "Naquela época, eu costumava acordar cedo toda manhã. Era a primeira vez que eu tinha morado longe de casa, e eu nunca tinha me sentido tão sozinho."',
        'Focus: "back then", "used to", "it was the first time", "had lived", "had felt".',
        'Back then, I used to wake up early every morning. It was the first time I had lived away from home, and I had never felt so alone.'
      ),
    ],
    lessonRecap: [
      '"Used to" = hábito OU estado passado que mudou. Não existe no presente.',
      '"Would" = apenas ações repetidas (não estados). Tom nostálgico em narrativa.',
      '"It was the first time I had [pp]" — Past Perfect obrigatório após esta expressão.',
      '"Back then / at the time / in those days" = âncoras temporais que tornam a narrativa rica.',
    ],
    nextLessonBridge: 'Na próxima aula de Listening, você vai ouvir alguém contando uma história pessoal — e vai identificar exatamente os tempos, conectores e expressões que acabou de aprender.',
  }),

  // ─── LISTENING-002: Personal story ───────────────────────────────────────────
  createListeningLesson({
    ...common,
    id: 'B1-LISTENING-002',
    order: 2,
    title: 'Listening to a personal story with sequence and emotion',
    objectives: [
      'Ouvir uma história pessoal de 18-20 linhas com múltiplos tempos verbais.',
      'Identificar a estrutura narrativa: background, evento, reação, resolução, reflexão.',
      'Reconhecer vocabulário narrativo em uso real: at first, it turned out, looking back.',
      'Identificar o arco emocional da narradora.',
      'Praticar shadowing de passagens-chave da narrativa.',
    ],
    teacherOpening: 'Ouvir uma história real em inglês é diferente de ouvir frases isoladas. Esta aula treina o ouvido para o fluxo natural de uma narrativa B1 — com background, surpresas, emoção e reflexão.',
    whyItMatters: 'Histórias pessoais são o coração da comunicação B1. Se você entende como histórias soam em inglês — os tempos verbais, os conectores, o ritmo — você vai conseguir contar as suas muito mais naturalmente.',
    differenceFromA2: 'No A2, você ouvia diálogos com frases curtas e diretas. No B1, a fala é mais fluida, os tempos se misturam (Past Simple, Past Continuous, Used to, Present Perfect reflexivo) e a estrutura é narrativa, não transacional.',
    audioDescription: 'Maya, 29, conta como perdeu e depois recuperou sua confiança no inglês ao se mudar para o exterior pela primeira vez.',
    transcript: `Maya: I want to tell you about something that happened when I first moved abroad. I was twenty-two at the time, and I had just finished university. I used to think my English was pretty good — after all, I'd been studying it for years. But when I arrived in London, everything felt different.

At first, I was too afraid to speak. I would sit in meetings and understand everything, but the moment someone asked me a question, I froze. All of a sudden, this language I thought I knew felt completely foreign. To my surprise, even simple conversations felt exhausting.

I remember one afternoon — I was waiting at a bus stop when an elderly woman started talking to me. She was asking about directions, I think. But I panicked. I could hear the words, but they seemed to come too fast, all running together. I just shook my head and said "sorry, I don't know." She smiled and walked on, but I felt terrible afterwards.

That was a turning point, actually. I decided that if I was going to live there, I had to stop being afraid of making mistakes. Gradually, I started making myself speak — in shops, on the phone, with neighbours. It turned out that most people were patient and kind. They didn't care about my accent or my grammar mistakes.

By the end of my first year, I felt like a different person. Looking back on it, that moment at the bus stop — the embarrassment, the frustration — was actually what pushed me forward. I had never felt so motivated to improve. And believe it or not, I now teach English pronunciation workshops.`,
    comprehensionQuestions: [
      q(
        'How did Maya feel about her English before moving abroad?',
        'She thought her English was pretty good — she had been studying for years.',
        '"I used to think my English was pretty good — after all, I\'d been studying it for years."',
        'The contrast with how she actually felt in London is the key point.'
      ),
      q(
        'What happened at the bus stop?',
        'An elderly woman asked her for directions. Maya panicked, couldn\'t respond, and said "sorry, I don\'t know."',
        '"She was asking about directions, I think. But I panicked... I just shook my head."',
        'This moment is described as a "turning point" — important for the narrative arc.'
      ),
      q(
        'What did Maya decide after the bus stop incident?',
        'She decided to stop being afraid of making mistakes and to force herself to speak — in shops, on the phone, with neighbours.',
        '"I decided that if I was going to live there, I had to stop being afraid of making mistakes."',
      ),
      q(
        'What surprising thing did Maya discover when she started speaking more?',
        'She discovered that most people were patient and kind, and they didn\'t care about her accent or grammar.',
        '"It turned out that most people were patient and kind."',
        '"It turned out" is a key narrative vocabulary item.'
      ),
      q(
        'How does Maya feel about the bus stop moment now, looking back?',
        'She sees it positively — as the thing that pushed her forward and motivated her to improve.',
        '"That moment at the bus stop... was actually what pushed me forward."',
        'This is the retrospective/reflection component — classic B1 narrative ending.'
      ),
    ],
    vocabulary: [
      task('What does "froze" mean in "the moment someone asked me a question, I froze"?', '', 'She suddenly became unable to speak or act — like being paralysed by fear.'),
      task('What does "turning point" mean?', '', 'A moment when something changes significantly — often from negative to positive.'),
      task('Find three narrative vocabulary words from Vocabulary-004 in the transcript.', '', '"At first", "all of a sudden", "to my surprise", "it turned out", "gradually", "looking back on it", "by the end", "believe it or not" — any 3.'),
      task('What is the difference between "at first" and "at the time" in this story?', '', '"At first" = the initial phase/feeling. "At the time" = perspective from inside the past moment (without knowing what comes next).'),
    ],
    shadowing: [
      task('All of a sudden, this language I thought I knew felt completely foreign.', 'Ritmo: ALL of a SUDden / this LANguage / I THOUGHT I KNEW / felt comPLETE-ly FOReign.'),
      task('It turned out that most people were patient and kind.', 'Stress: it turned OUT / most PEOple were PA-tient and KIND.'),
      task('Looking back on it, that moment at the bus stop was actually what pushed me forward.', 'Connected speech: "looking-BACK-on-it" flui como uma frase.'),
    ],
    oralProduction: task(
      'Em 3-4 frases em inglês, descreva: como você se sentia em relação ao inglês no início; o que mudou; e como você se sente agora. Use: at first, gradually, looking back.',
      'Foco em usar os tempos verbais corretamente: used to, Past Simple, Present.',
    ),
    lessonRecap: [
      'Histórias B1 têm estrutura: background → evento-chave → reação → mudança → reflexão.',
      'Vocabulário narrativo em uso real: at first, all of a sudden, it turned out, looking back on it.',
      'O arco emocional é essencial: não só o que aconteceu, mas como a pessoa se sentiu.',
      '"Turning point" = momento de virada — conceito-chave em narrativa B1.',
    ],
    nextLessonBridge: 'Na próxima aula de Writing, você vai escrever sua própria narrativa curta de 120-150 palavras — usando tudo que aprendeu sobre estrutura, tempos e vocabulário narrativo.',
  }),

  // ─── WRITING-002: Short personal narrative ───────────────────────────────────
  createWritingLesson({
    ...common,
    id: 'B1-WRITING-002',
    order: 2,
    title: 'Write a short personal narrative (120–150 words)',
    objectives: [
      'Escrever uma narrativa pessoal de 120-150 palavras com estrutura completa.',
      'Usar tempos verbais de narrativa: Past Simple, Past Continuous, used to.',
      'Incluir background, evento-chave, reação emocional e reflexão final.',
      'Aplicar vocabulário narrativo aprendido: at first, it turned out, looking back.',
    ],
    teacherOpening: 'Você aprendeu os tempos, o vocabulário e a estrutura. Agora é hora de combinar tudo numa narrativa escrita. Uma narrativa B1 tem 5 componentes: contexto → evento → reação → resolução → reflexão. Esta aula guia você passo a passo.',
    whyItMatters: 'Escrever narrativas aparece em exames B1 (cartas, emails, redações), em trabalhos, em redes sociais profissionais e em qualquer contexto onde você precise contar o que aconteceu de forma clara e envolvente.',
    modelText: `Last year I was working as a volunteer at a local school when something unexpected happened. I had been helping with an English class for about two months, and at first everything was going well. Then one afternoon, all of a sudden, the teacher didn't show up. The students looked at me, waiting. I wasn't prepared at all.

At first I panicked — I used to freeze in front of groups. But then I remembered a game I'd played as a child, and I decided to try it. It turned out the students loved it. We spent the whole lesson laughing and learning at the same time.

Looking back on it, that afternoon changed my relationship with teaching. I had never realised how much I enjoyed it until that moment. It was the first time I had felt truly confident in front of a class.`,
    modelTextBreakdown: [
      { line: 'Last year I was working as a volunteer at a local school when something unexpected happened.', note: 'Background: Past Continuous sets the scene; Past Simple introduces the event.' },
      { line: 'I had been helping with an English class for about two months,', note: 'Past Perfect Continuous — shows duration before the moment.' },
      { line: 'and at first everything was going well.', note: '"At first" + Past Continuous — contrast incoming.' },
      { line: 'Then one afternoon, all of a sudden, the teacher didn\'t show up.', note: 'The turning-point event. "All of a sudden" = dramatic shift.' },
      { line: 'I wasn\'t prepared at all.', note: 'Short sentence for impact after the dramatic event.' },
      { line: 'At first I panicked — I used to freeze in front of groups.', note: '"Used to" gives historical context about the character\'s past.' },
      { line: 'But then I remembered a game I\'d played as a child, and I decided to try it.', note: 'Past Perfect "I\'d played" connects to further past.' },
      { line: 'It turned out the students loved it.', note: '"It turned out" = classic narrative revelation.' },
      { line: 'Looking back on it, that afternoon changed my relationship with teaching.', note: 'Reflection begins here — looking back.' },
      { line: 'It was the first time I had felt truly confident in front of a class.', note: '"It was the first time I had felt" — Past Perfect required.' },
    ],
    revisionChecklist: [
      task('Minha narrativa tem 120-150 palavras?'),
      task('Inclui background (onde estava, o que fazia — Past Continuous)?'),
      task('Tem um evento central claro (Past Simple)?'),
      task('Inclui reação emocional ("at first I...")?'),
      task('Tem um momento de resolução ou mudança?'),
      task('Termina com reflexão ("looking back..." / "it turned out..." / "I realised...")?'),
      task('Usei pelo menos 3 conectores ou expressões narrativas?'),
      task('Verifiquei os tempos verbais: Past Simple ≠ Past Continuous ≠ Past Perfect?'),
    ],
    commonWritingMistakes: [
      mistake(
        'All of sudden, the phone rang.',
        '"All of A sudden" — o artigo "a" é obrigatório.',
        '"All of a sudden" — always with the article.'
      ),
      mistake(
        'It was the first time I saw a real giraffe.',
        'Após "it was the first time", o verbo exige Past Perfect: "had seen".',
        '"It was the first time I had seen a real giraffe."'
      ),
      mistake(
        'I would be very shy when I was young.',
        '"Would" não pode descrever estados. Use "used to" para estados.',
        '"I used to be very shy when I was young."'
      ),
      mistake(
        'Looking back, I think it was the best decision. (Starting the story with reflection)',
        'A reflexão deve vir no FINAL, depois do evento e das reações. Começar com ela quebra a estrutura narrativa.',
        'Structure: context → event → reaction → resolution → reflection.'
      ),
    ],
    draftTask: task(
      'Escreva sua própria narrativa de 120-150 palavras sobre um momento inesperado em sua vida.',
      'Use o modelo de 5 partes: 1. Contexto (onde estava, o que fazia). 2. Evento central. 3. Reação imediata ("at first..."). 4. Como se resolveu. 5. Reflexão final ("looking back...").',
    ),
    revisionTask: task(
      'Revise seu rascunho usando o checklist acima. Para cada item da lista, confirme que está presente na sua narrativa. Ajuste onde necessário.',
      'Preste atenção especial ao uso de Past Perfect após "it was the first time" e ao uso de "used to" vs "would".',
    ),
    finalVersionTask: task(
      'Escreva a versão final da sua narrativa, incorporando todas as melhorias. Compare com o modelo para verificar a estrutura.',
      'Sua narrativa deve ter: tempos variados, vocabulário narrativo, estrutura clara de 5 partes.',
    ),
    lessonRecap: [
      'Narrativa B1: contexto (Past Continuous) → evento (Past Simple) → reação ("at first...") → resolução → reflexão ("looking back...").',
      '"It was the first time I had [pp]" — Past Perfect é obrigatório.',
      '"Would" não funciona para estados — use "used to" para estados e ações.',
      'Reflexão no final — não no início — é o que torna a narrativa madura.',
    ],
    nextLessonBridge: 'Você concluiu o pacote B1.2 de Past Experiences. No próximo pacote, B1.3 Opinions and Discussion, você vai aprender a expressar opiniões, concordar, discordar e argumentar em inglês — a habilidade de debate B1.',
  }),

]);

export const B1_DEEP_PAST_EXPERIENCES_PART2_BY_PILLAR = Object.freeze({
  grammar: B1_DEEP_PAST_EXPERIENCES_PART2.filter(l => l.pillar === 'grammar'),
  vocabulary: B1_DEEP_PAST_EXPERIENCES_PART2.filter(l => l.pillar === 'vocabulary'),
  reading: B1_DEEP_PAST_EXPERIENCES_PART2.filter(l => l.pillar === 'reading'),
  listening: B1_DEEP_PAST_EXPERIENCES_PART2.filter(l => l.pillar === 'listening'),
  speaking: B1_DEEP_PAST_EXPERIENCES_PART2.filter(l => l.pillar === 'speaking'),
  writing: B1_DEEP_PAST_EXPERIENCES_PART2.filter(l => l.pillar === 'writing'),
});
