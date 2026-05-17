import { createGrammarLesson, createVocabularyLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'B1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['b1-6', 'travel', 'culture', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }

export const B1_DEEP_TRAVEL_CULTURE_PART1 = Object.freeze([

  // ─── GRAMMAR-015: Comparatives and superlatives (review + advanced) ───────────
  createGrammarLesson({
    ...common,
    id: 'B1-GRAMMAR-015',
    order: 15,
    title: 'Comparatives and superlatives: review and advanced use',
    objectives: [
      'Revisar e consolidar comparativos e superlativos básicos e irregulares.',
      'Usar double comparatives: "the more you travel, the more you learn."',
      'Usar "as... as", "not as... as" e "twice as... as" para comparações precisas.',
      'Usar comparativos com substantivos: "fewer tourists", "less traffic", "more time".',
      'Aplicar comparativos e superlativos em contexto real de viagem e cultura.',
    ],
    teacherOpening: 'Comparativos e superlativos existem desde o A2 — mas no B1, o desafio é usá-los com mais precisão, variedade e em contextos mais complexos. Esta aula consolida as regras básicas e introduz estruturas avançadas que transformam suas comparações em inglês real e fluente.',
    whyItMatters: 'Em viagens e conversas culturais, você compara o tempo todo: lugares, preços, culturas, experiências. "Paris was far more expensive than I expected." / "The further south you go, the warmer it gets." / "This hotel is not as comfortable as the last one." Sem essas estruturas, suas comparações ficam limitadas e repetitivas.',
    differenceFromA2: 'No A2: "Rome is bigger than London." / "It was the best trip." No B1: "The further we travelled from the capital, the cheaper everything became." / "The accommodation was nowhere near as luxurious as we had expected." / "Travelling by train turned out to be twice as fast as going by bus." A diferença é nuance, precisão e variedade estrutural.',
    grammarTable: {
      headers: ['Estrutura', 'Forma', 'Exemplo de viagem'],
      rows: [
        ['Comparativo regular', 'adj + -er / more + adj', 'The north was colder than the south.'],
        ['Superlativo regular', 'adj + -est / most + adj', 'It was the most beautiful place I had ever seen.'],
        ['Double comparative', 'the + comp, the + comp', 'The more you explore, the more you discover.'],
        ['As... as', 'as + adj + as', 'The food was as good as I had hoped.'],
        ['Not as... as', 'not as + adj + as', 'The beach was not as crowded as last year.'],
        ['Twice as... as', 'twice as + adj + as', 'The flight was twice as long as the train.'],
        ['Less / least', 'less + adj / least + adj', 'This route is less stressful than the motorway.'],
        ['Fewer / less (nouns)', 'fewer + count / less + uncount', 'There were fewer tourists in October, and less traffic.'],
      ],
    },
    whenToUse: [
      '"The more... the more" para expressar relações de causa e efeito ou progressão: "The longer you stay, the better you understand the culture."',
      '"As... as" para comparações de igualdade — muito natural em inglês falado: "The trip was just as tiring as last time."',
      '"Twice/three times as... as" para comparações quantitativas precisas: "Flying was three times more expensive than taking the bus."',
      '"Fewer" com substantivos contáveis, "less" com não-contáveis: "fewer delays", "less noise".',
    ],
    whenNotToUse: [
      'Não use "more" com adjetivos curtos: "more big" → "bigger", "more fast" → "faster".',
      'Não use "less" com substantivos contáveis: "less people" → "fewer people".',
      'Não duplique a comparação: "more better" e "more easier" estão errados.',
      'Não esqueça o segundo "than" na comparação: "It was faster" (incompleto) vs "It was faster than expected."',
    ],
    teacherExamples: [
      'The journey took longer than we had planned, but it was worth it.',
      'The further north we drove, the more dramatic the landscape became.',
      'This hotel is nowhere near as expensive as the one in the city centre.',
      'Booking early is twice as cheap as buying tickets on the day.',
      'There were fewer visitors in November, so we had the museum almost to ourselves.',
      'The local food was far more varied than anything we had tried before.',
    ],
    commonBrazilianMistakes: [
      {
        wrong: 'Rome is more beautiful than Paris, but Paris is more bigger.',
        right: 'Rome is more beautiful than Paris, but Paris is bigger.',
        explanation: '"More bigger" é uma dupla marcação incorreta. Adjetivos curtos (big, fast, cheap) usam "-er", não "more".',
      },
      {
        wrong: 'There were less people at the museum than we expected.',
        right: 'There were fewer people at the museum than we expected.',
        explanation: '"People" é um substantivo contável — use "fewer". "Less" é para incontáveis: "less noise", "less time".',
      },
      {
        wrong: 'The more you travel, more you learn.',
        right: 'The more you travel, the more you learn.',
        explanation: 'A estrutura double comparative exige "the" antes de AMBAS as partes: "the + comparativo, the + comparativo".',
      },
      {
        wrong: 'Flying was more cheap than I thought.',
        right: 'Flying was cheaper than I thought.',
        explanation: '"Cheap" é adjetivo curto (uma sílaba) — usa "-er", não "more". Regra: 1-2 sílabas simples → "-er"; 3+ sílabas → "more".',
      },
    ],
    controlledPractice: [
      task(
        'Complete com a forma correta: "The ___ (far) south we travelled, the ___ (hot) it became."',
        'Double comparative. "Far" é irregular: further/farther. "Hot" → hotter (dobra a consoante final).',
        'The further south we travelled, the hotter it became.'
      ),
      task(
        'Reescreva usando "as... as": "Both cities are equally expensive."',
        '"As expensive as" expressa igualdade.',
        'One city is as expensive as the other. / City A is as expensive as City B.'
      ),
      task(
        'Corrija: "There were less tourists in January than in August."',
        '"Tourists" é contável.',
        'There were fewer tourists in January than in August.'
      ),
      task(
        'Forme uma frase comparativa: viagem de avião durou 2 horas / trem durou 6 horas.',
        'Twice / three times as... as.',
        'The train journey was three times as long as the flight.'
      ),
    ],
    errorCorrectionPractice: [
      task(
        'Encontre e corrija o erro: "Lisbon is more cheaper than Barcelona — but not as much crowded."',
        'Dois erros: dupla marcação em comparativo curto, e "as much crowded" errado.',
        'Lisbon is cheaper than Barcelona — but not as crowded.'
      ),
      task(
        'Corrija: "The more comfortable is the hotel, the more you will enjoy your stay."',
        'Na estrutura "the + comparativo", não inverta a ordem com "is".',
        'The more comfortable the hotel is, the more you will enjoy your stay.'
      ),
    ],
    translationPractice: [
      task(
        'Traduza: "Quanto mais cedo você reservar, mais barato será."',
        'Double comparative. "Book" / "early" / "cheap".',
        'The earlier you book, the cheaper it will be.'
      ),
      task(
        'Traduza: "O museu não era tão impressionante quanto eu esperava."',
        '"Not as impressive as I had expected" — past perfect na segunda parte.',
        'The museum was not as impressive as I had expected.'
      ),
      task(
        'Traduza: "Havia muito menos trânsito do que na última vez que visitamos."',
        '"Much less traffic" — "traffic" é incontável.',
        'There was much less traffic than the last time we visited.'
      ),
    ],
    productionTasks: [
      task(
        'Escreva 4 frases comparando dois lugares que você visitou (real ou inventado). Use pelo menos: um double comparative, um "as... as" e um "not as... as".',
        'Foque em detalhes concretos: preço, tamanho, multidão, clima, comida.',
        'The further we drove from the capital, the more rural the landscape became. The guesthouse was not as modern as the hotel in the city, but it was far more charming. The local market was twice as lively as the tourist market. The food was just as delicious as anything we had eaten in the north.'
      ),
      task(
        'Complete e expanda: "The longer I spend in a country, ___." Continue em 2-3 frases sobre o que você aprende ou descobre ao viajar.',
        'Double comparative como abertura + expansão em inglês B1 fluente.',
        'The longer I spend in a country, the more I understand its culture. I start noticing things that tourists usually miss — the daily routines, the local food markets, the way people interact. It is far more rewarding than a quick one-week trip.'
      ),
    ],
  }),

  // ─── GRAMMAR-016: Future continuous and future perfect ────────────────────────
  createGrammarLesson({
    ...common,
    id: 'B1-GRAMMAR-016',
    order: 16,
    title: 'Future continuous and future perfect',
    objectives: [
      'Formar e usar o future continuous: will be + -ing.',
      'Formar e usar o future perfect: will have + past participle.',
      'Distinguir future continuous (ação em progresso num momento futuro) de future perfect (ação concluída antes de um momento futuro).',
      'Usar "by the time", "by then", "this time next week" como marcadores temporais.',
      'Aplicar essas formas em contexto real de planejamento de viagem.',
    ],
    teacherOpening: 'Dois tempos verbais que os brasileiros raramente usam com naturalidade — mas que aparecem o tempo todo em planejamento, conversas sobre itinerários e previsões de viagem. "By the time you arrive, I will have checked in." / "This time tomorrow, we will be flying over the Atlantic." São formas sofisticadas que elevam o seu inglês do B1 para um B1 sólido.',
    whyItMatters: 'Em contexto de viagem e planejamento, você frequentemente precisa falar sobre o que estará acontecendo num momento futuro ou o que já terá sido concluído. Sem essas formas, suas frases ficam artificialmente simples ou gramaticalmente incorretas.',
    differenceFromA2: 'No A2: "We will arrive tomorrow." / "I am going to book the hotel." No B1: "By the time we arrive, the hotel will have already processed our booking." / "This time next week, we will be relaxing on the beach." A diferença é a precisão temporal e a sofisticação da expressão.',
    grammarTable: {
      headers: ['Tempo', 'Forma', 'Uso principal', 'Exemplo de viagem'],
      rows: [
        ['Future continuous', 'will be + verb-ing', 'Ação em progresso num momento futuro específico', 'At 6 p.m. tomorrow, we will be boarding the plane.'],
        ['Future perfect', 'will have + past participle', 'Ação concluída antes de um ponto futuro', 'By the time we land, we will have been travelling for 11 hours.'],
        ['Future cont. (neg)', 'will not be + verb-ing', 'Ação que não estará acontecendo', 'I won\'t be using my phone during the flight.'],
        ['Future perf. (neg)', 'will not have + pp', 'Ação que não terá sido concluída', 'We won\'t have visited the south by the end of the trip.'],
        ['Future cont. (question)', 'Will you be + verb-ing?', 'Plano em curso / pedido educado de informação', 'Will you be needing the car tomorrow morning?'],
        ['Future perf. (question)', 'Will you have + pp?', 'Verificar conclusão futura', 'Will you have packed everything by midnight?'],
      ],
    },
    whenToUse: [
      'Future continuous: para ações que estarão em progresso num momento específico do futuro — "At 3 p.m. on Friday, I will be sitting on the train."',
      'Future continuous: para pedidos educados e perguntas sobre planos — "Will you be using the rental car tomorrow?"',
      'Future perfect: com "by + time marker" — "By the time we reach the hotel, we will have driven for eight hours."',
      'Future perfect: para enfatizar a duração total até um ponto futuro — "By the end of the trip, we will have visited twelve different cities."',
    ],
    whenNotToUse: [
      'Não use future continuous com verbos de estado (know, believe, understand, want, need): "I will be knowing the answer" → "I will know the answer."',
      'Não confunda future perfect com past perfect: "will have done" (futuro) vs "had done" (passado).',
      'Não use future perfect para ações que ainda estarão em progresso — use "will have been + -ing" (future perfect continuous) para duração em andamento.',
    ],
    teacherExamples: [
      'This time next month, we will be travelling through Southeast Asia.',
      'By the time you read this message, I will have already boarded the flight.',
      'Will you be staying in Lisbon for the whole week, or just a few days?',
      'By the end of the trip, we will have visited five different countries.',
      'At this point tomorrow, we will be sitting on the beach watching the sunset.',
      'She will have checked in by the time her friends arrive at the airport.',
    ],
    commonBrazilianMistakes: [
      {
        wrong: 'By the time we arrive, we will pack everything.',
        right: 'By the time we arrive, we will have packed everything.',
        explanation: '"By the time" indica uma ação que deve estar concluída antes de um ponto futuro — requer future perfect (will have + pp), não will + infinitivo.',
      },
      {
        wrong: 'This time tomorrow I will be know the result.',
        right: 'This time tomorrow I will know the result.',
        explanation: '"Know" é verbo de estado — não usa a forma contínua. Use o future simple: "will know".',
      },
      {
        wrong: 'At 8 o\'clock we will arriving at the airport.',
        right: 'At 8 o\'clock we will be arriving at the airport.',
        explanation: 'Future continuous: "will be + verb-ing". "Will arriving" não existe — falta o auxiliar "be".',
      },
      {
        wrong: 'We will have been visiting 10 cities until the end of the tour.',
        right: 'We will have visited 10 cities by the end of the tour.',
        explanation: '"Until" não é o marcador mais natural aqui — use "by". E "will have visited" (future perfect) é correto para ações completadas, não "will have been visiting" (que implica duração contínua).',
      },
    ],
    controlledPractice: [
      task(
        'Complete com future continuous: "This time on Saturday, we ___ (drive) through the mountains."',
        '"Drive" é verbo regular de ação — aceita a forma contínua.',
        'This time on Saturday, we will be driving through the mountains.'
      ),
      task(
        'Complete com future perfect: "By the time we reach Porto, we ___ (travel) for six hours."',
        '"By the time" + future perfect.',
        'By the time we reach Porto, we will have been travelling for six hours. (ou: we will have travelled for six hours)'
      ),
      task(
        'Forme uma pergunta com future continuous: perguntar se a pessoa vai usar o quarto de hotel amanhã de manhã.',
        'Pedido educado com future continuous.',
        'Will you be using the hotel room tomorrow morning?'
      ),
      task(
        'Reescreva com future perfect: "We are planning to visit 8 museums. The trip ends on Sunday."',
        '"By the end of the trip, we will have..."',
        'By the end of the trip, we will have visited 8 museums.'
      ),
    ],
    errorCorrectionPractice: [
      task(
        'Corrija: "By next Friday, she will finish packing and leave."',
        '"By next Friday" com ação concluída → future perfect.',
        'By next Friday, she will have finished packing and left.'
      ),
      task(
        'Corrija: "At midnight tonight, we will be understood where we went wrong."',
        '"Understand" é verbo de estado.',
        'At midnight tonight, we will understand where we went wrong.'
      ),
    ],
    translationPractice: [
      task(
        'Traduza: "Quando você chegar, eu já vou ter reservado o restaurante."',
        '"By the time you arrive" + future perfect.',
        'By the time you arrive, I will have already booked the restaurant.'
      ),
      task(
        'Traduza: "A esta hora amanhã, estaremos cruzando o Atlântico."',
        'Future continuous com marcador de tempo.',
        'At this time tomorrow, we will be crossing the Atlantic.'
      ),
    ],
    productionTasks: [
      task(
        'Imagine que você está planejando uma viagem para daqui a duas semanas. Escreva 4 frases usando: (1) future continuous com marcador de tempo, (2) future continuous para pedido educado, (3) future perfect com "by the time", (4) future perfect com "by the end of".',
        'Misture os dois tempos com naturalidade. Contexto real de viagem.',
        '(1) This time next Saturday, I will be exploring the streets of Lisbon. (2) Will you be joining us for dinner on the first night? (3) By the time we check out, we will have spent four nights at the hotel. (4) By the end of the trip, we will have tried at least ten different local dishes.'
      ),
    ],
  }),

  // ─── VOCABULARY-011: Travel and transport vocabulary ─────────────────────────
  createVocabularyLesson({
    ...common,
    id: 'B1-VOCABULARY-011',
    order: 11,
    title: 'Travel and transport vocabulary',
    objectives: [
      'Usar vocabulário preciso para planejamento, reserva e logística de viagem.',
      'Reconhecer e usar phrasal verbs de viagem: check in, set off, get around, drop off.',
      'Distinguir tipos de acomodação e transporte com precisão.',
      'Descrever problemas comuns de viagem com vocabulário real.',
      'Falar sobre experiências culturais e turísticas com naturalidade.',
    ],
    teacherOpening: 'Viagem é um dos temas mais ricos e práticos do B1 — e também um dos que mais exige vocabulário específico. "I booked a hotel" funciona, mas "I reserved a double room with breakfast included at a boutique guesthouse" demonstra controle real do léxico. Esta aula cobre os termos mais frequentes — transporte, acomodação, turismo, problemas — com foco em uso real.',
    essentialWords: [
      { word: 'itinerary', definition: 'roteiro / programa detalhado da viagem', example: 'We planned a detailed itinerary to make the most of our week in Japan.', brazilianNote: '"Itinerary" = roteiro planejado. Não confundir com "schedule" (horário fixo de transportes). Pronuncia-se /aɪˈtɪnəreri/.' },
      { word: 'check in / check out', definition: 'fazer check-in / check-out no hotel ou aeroporto', example: 'We checked in at the hotel at 3 p.m. and checked out two days later.', brazilianNote: '"Check in" e "check out" são phrasal verbs — separados ao usar como verbo ("check in at the hotel"). Como substantivo: "the check-in was smooth".' },
      { word: 'set off', definition: 'partir / iniciar a jornada', example: 'We set off at dawn to avoid the traffic through the mountains.', brazilianNote: '"Set off" = começar a viajar (sair de um ponto). Não confundir com "take off" (avião decolando) ou "leave" (mais geral).' },
      { word: 'get around', definition: 'deslocar-se / circular por uma cidade', example: 'The best way to get around Lisbon is by tram and on foot.', brazilianNote: '"Get around" = mover-se por um lugar usando vários meios. "How do you get around the city?" é uma das perguntas mais naturais sobre mobilidade urbana.' },
      { word: 'layover / stopover', definition: 'escala de avião', example: 'We had a four-hour layover in Dubai before connecting to Bangkok.', brazilianNote: '"Layover" (AmE) = "stopover" (BrE) = escala. Uma escala longa que permite sair do aeroporto é um "stopover". Curta, sem sair = "layover".' },
      { word: 'accommodation', definition: 'acomodação / hospedagem', example: 'We searched for affordable accommodation close to the city centre.', brazilianNote: '"Accommodation" (BrE) / "accommodations" (AmE) = hospedagem em geral. Inclui hotel, hostel, Airbnb, B&B. Sempre sem artigo no sentido geral: "We\'re looking for accommodation."' },
      { word: 'self-catering', definition: 'acomodação sem refeições incluídas (com cozinha)', example: 'We chose a self-catering apartment so we could cook our own meals.', brazilianNote: '"Self-catering" é muito comum no inglês britânico para apartamentos ou casas de aluguel onde você se vira com as refeições. Oposto de "bed and breakfast" (B&B).' },
      { word: 'off the beaten track', definition: 'fora dos roteiros turísticos / lugar não convencional', example: 'We decided to spend a few days off the beaten track in a small fishing village.', brazilianNote: 'Expressão fixa. "Off the beaten track/path" = longe das atrações turísticas principais. Muito usada por quem prefere turismo alternativo.' },
      { word: 'peak season / off-peak', definition: 'alta / baixa temporada', example: 'Flights are much more expensive during peak season in August.', brazilianNote: '"Peak season" = alta temporada (mais turistas, preços altos). "Off-peak" = baixa temporada ou horário de menor demanda (trens, aviões).' },
      { word: 'drop off / pick up', definition: 'deixar alguém (carro) / buscar alguém', example: 'My friend dropped me off at the airport and picked me up when I returned.', brazilianNote: '"Drop off" = deixar alguém num lugar. "Pick up" = buscar. Frasais com objeto: "drop me off", "pick her up". Muito usados com táxi, Uber, aeroporto.' },
      { word: 'customs / border control', definition: 'alfândega / controle de fronteira', example: 'We spent 45 minutes at customs because of a declaration issue.', brazilianNote: '"Customs" = alfândega (declaração de bens). "Border control" = controle de documentos (passaporte). "Immigration" = imigração. São processos distintos no aeroporto.' },
      { word: 'jet lag', definition: 'sensação de desorientação por mudança de fuso horário', example: 'After the 14-hour flight, I was jet-lagged for nearly three days.', brazilianNote: '"Jet lag" (substantivo) / "jet-lagged" (adjetivo). "I have jet lag" ou "I\'m jet-lagged". Muito frequente em conversas sobre viagens intercontinentais.' },
    ],
    chunks: [
      { chunk: 'book in advance', meaning: 'reservar com antecedência', example: 'It\'s much cheaper if you book the train tickets in advance.' },
      { chunk: 'make the most of', meaning: 'aproveitar ao máximo', example: 'We only had two days in Rome, so we tried to make the most of every hour.' },
      { chunk: 'go sightseeing', meaning: 'fazer turismo / visitar pontos turísticos', example: 'On the first day, we went sightseeing around the old town.' },
      { chunk: 'miss a connection', meaning: 'perder uma conexão', example: 'We almost missed our connection in Frankfurt because of the delay.' },
      { chunk: 'travel light', meaning: 'viajar com pouca bagagem', example: 'I prefer to travel light — just a backpack and one carry-on bag.' },
      { chunk: 'get the most out of', meaning: 'extrair o máximo de algo', example: 'To get the most out of your time there, download the offline map before you go.' },
    ],
    dangerousConfusions: [
      task(
        'Qual a diferença entre "travel", "trip" e "journey"? Use cada um numa frase.',
        '"Travel" é verbo ou substantivo geral (o ato de viajar). "Trip" é uma viagem específica (com ida e volta implícita). "Journey" é o percurso / a viagem em si (foco no deslocamento).',
        'I love to travel. / We went on a three-day trip to Porto. / The journey from Lisbon to Porto takes about three hours by train.'
      ),
      task(
        'Corrija se necessário: "We did a trip to the south of France last summer."',
        '"Do a trip" não existe em inglês padrão.',
        'We went on a trip to the south of France last summer. (Nunca "do a trip")'
      ),
      task(
        'Qual a diferença entre "miss the flight" e "lose the flight"?',
        '"Lose" não se usa com transporte em inglês.',
        '"Miss the flight" = perder o voo (por atraso, não chegar a tempo). "Lose the flight" não existe em inglês — é tradução literal do português.'
      ),
    ],
    miniDialogues: [
      {
        title: 'Planning a trip',
        lines: [
          'Lucas: Have you decided where you\'re going this summer?',
          'Sofia: We\'re thinking of doing a road trip through Portugal — starting in Lisbon, then heading south.',
          'Lucas: Sounds amazing. Are you booking accommodation in advance or just as you go?',
          'Sofia: Mostly in advance, since it\'s peak season in August. We don\'t want to end up somewhere too touristy, so we\'re looking for places a bit off the beaten track.',
          'Lucas: Smart. Will you be driving the whole time?',
          'Sofia: Yes, that way we can set off early, get around at our own pace and drop by places that aren\'t on the usual itinerary.',
          'Lucas: Make the most of it — the Alentejo in summer is incredible.',
        ],
        focus: 'road trip, accommodation in advance, peak season, off the beaten track, set off, get around, itinerary, make the most of — todos em contexto natural de planejamento.',
      },
    ],
    productionTasks: [
      task(
        'Você está planejando uma viagem de 5 dias. Descreva o roteiro usando pelo menos 6 palavras ou expressões desta aula: itinerary, set off, get around, off the beaten track, peak/off-peak, accommodation, book in advance, make the most of.',
        'Escreva em parágrafos, não em bullet points. Mínimo 80 palavras.',
        'Our itinerary for the five-day trip starts in Barcelona, where we\'ll spend the first two nights. We\'ve booked our accommodation in advance since we\'re travelling in July — peak season. From there, we plan to set off early on day three and head south by train. We want to get around mostly on foot and by local bus, keeping things slow. On day four, we\'ll spend the night in a small village off the beaten track that a friend recommended. By the end of the trip, we should have made the most of every region without rushing.'
      ),
      task(
        'Pense numa viagem que você já fez (real ou inventada). Descreva em 3-4 frases um problema que aconteceu durante a viagem. Use pelo menos 3 palavras ou expressões desta aula.',
        'Problema pode ser: atraso, bagagem perdida, miss a connection, customs, jet lag, hotel errado...',
        'On our last trip, we missed our connection in Amsterdam because our first flight was delayed by two hours. We had to wait six hours at the airport for the next available flight. By the time we finally arrived at the hotel, we were completely jet-lagged and exhausted. Fortunately, the accommodation turned out to be far better than expected.'
      ),
    ],
  }),

  // ─── SPEAKING-006: Describe a trip or travel experience ───────────────────────
  createSpeakingLesson({
    ...common,
    id: 'B1-SPEAKING-006',
    order: 6,
    title: 'Describe a trip or travel experience',
    objectives: [
      'Narrar uma experiência de viagem de forma estruturada e fluente.',
      'Usar passado simples e passado contínuo para dar contexto e sequência à narrativa.',
      'Incluir detalhes culturais, sensoriais e emocionais para tornar a narrativa viva.',
      'Expressar opiniões e recomendações com nuance (highlight, disappointment, surprise).',
      'Responder perguntas sobre viagem com fluência e expansão natural.',
    ],
    teacherOpening: 'Falar sobre viagens é uma das situações mais frequentes em inglês — entrevistas informais, redes sociais, conversas com falantes nativos. A diferença entre um B1 e um A2 ao narrar uma viagem não é só o vocabulário — é a estrutura, o detalhe, a capacidade de manter a atenção do ouvinte e de expressar nuances além de "it was great" ou "it was amazing".',
    speakingSituation: {
      context: 'You are having lunch with a colleague or new friend who asks: "Have you been anywhere interesting recently?" You describe a trip you have taken — real or imagined. You have about 2 minutes.',
      modelResponse: 'Actually, yes — I went to Lisbon for a long weekend back in March. I had always wanted to visit Portugal, and I have to say, it completely exceeded my expectations. The city is stunning — there\'s this incredible mix of old and new architecture, and you can walk for hours without getting bored. We spent the first day exploring Alfama, the old quarter. It was quite hilly, which I hadn\'t expected, but the views from the top were absolutely worth it. The food was another highlight — the pastel de nata, the grilled fish, the local wine. We ate so well. The one thing I would change is that we only had three days. By the time we had found our feet, it was already time to come back. I\'d definitely go back — probably in autumn when there are fewer tourists and the weather is still warm.',
      responseLength: '~170 words — B1 model with past tenses, descriptive language, honest evaluation, and recommendation.',
    },
    modelPhrases: [
      'I went to [place] last [month/summer/year].',
      'I had always wanted to visit...',
      'It completely exceeded / didn\'t quite meet my expectations.',
      'The highlight for me was...',
      'What surprised me most was...',
      'I hadn\'t expected it to be so...',
      'We spent [time] exploring / visiting / walking around...',
      'The one thing I would change is...',
      'By the time we [action], it was already time to...',
      'I\'d definitely / probably go back because...',
      'If you ever get the chance to go, I\'d highly recommend...',
      'It was unlike anything I had ever seen/eaten/experienced before.',
    ],
    substitutionDrills: [
      {
        base: 'The highlight for me was [the old town].',
        substitutions: [
          'the local food',
          'the unexpected friendliness of the locals',
          'a day trip we took to the coast',
          'the street art in the artists\' quarter',
        ],
      },
      {
        base: 'I hadn\'t expected it to be so [crowded].',
        substitutions: [
          'affordable',
          'different from what I had read',
          'easy to get around',
          'hot at that time of year',
        ],
      },
    ],
    guidedSpeaking: [
      {
        prompt: 'Diga onde você foi e quando. Adicione um detalhe sobre o motivo da viagem ou por que escolheu este destino.',
        support: 'I went to... last... / I had always wanted to... / I chose it because...',
        timeLimit: '20 seconds',
      },
      {
        prompt: 'Descreva o que você fez: uma coisa que você visitou, comeu ou experienciou. Use passado contínuo para dar contexto: "We were walking through..." / "People were selling..."',
        support: 'We spent the first day... / While we were exploring..., I noticed... / The food was...',
        timeLimit: '40 seconds',
      },
      {
        prompt: 'Diga o que te surpreendeu ou o que foi diferente das suas expectativas. Depois, faça uma recomendação.',
        support: 'What surprised me most was... / I hadn\'t expected it to be so... / I\'d definitely recommend going in [season] because...',
        timeLimit: '40 seconds',
      },
    ],
    speakingChecklist: [
      'Disse onde fui e quando (contexto básico)?',
      'Dei pelo menos 2 detalhes concretos sobre o lugar, comida, pessoas ou experiência?',
      'Usei passado contínuo pelo menos uma vez para dar contexto ou cenário?',
      'Expressei uma surpresa, decepção ou destaque com nuance (não só "it was great")?',
      'Terminei com uma recomendação ou reflexão sobre a viagem?',
      'Minha resposta durou pelo menos 90 segundos sem pausa longa?',
    ],
    recordingTasks: [
      {
        instruction: 'Grave uma resposta de 90 a 120 segundos para: "Tell me about the best trip you have ever been on — or one you are planning." Inclua: (1) destino e quando, (2) dois detalhes concretos (lugar, comida, evento), (3) um elemento de surpresa ou expectativa, (4) recomendação ou reflexão final.',
        minSeconds: 90,
        maxSeconds: 120,
        focus: 'Estrutura narrativa, uso de passado simples e contínuo, vocabulário de viagem, expressão de opinião com nuance.',
      },
    ],
    freeSpeaking: [
      'Is there a place you have always wanted to visit but haven\'t yet? Why does it appeal to you?',
      'Do you think travel changes the way people see the world? Can you give an example from your own experience?',
      'What do you think is more important when travelling: comfort or authenticity? Why?',
    ],
  }),

  // ─── WRITING-006: Write a travel blog post or email about a trip ──────────────
  createWritingLesson({
    ...common,
    id: 'B1-WRITING-006',
    order: 6,
    title: 'Write a travel blog post or email about a trip',
    objectives: [
      'Escrever um texto descritivo sobre uma viagem com estrutura clara: abertura, desenvolvimento e encerramento.',
      'Usar linguagem vívida e específica — não genérica — para descrever lugares, comidas e experiências.',
      'Incorporar comparativos, superlativos e future forms revisados nesta unidade.',
      'Equilibrar narração de eventos com expressão de opinião pessoal e recomendações.',
      'Usar conectores de narrativa e contraste: however, nevertheless, what struck me most, to my surprise.',
    ],
    teacherOpening: 'Um post de blog ou email sobre uma viagem é um dos textos mais ricos e autênticos que você pode escrever em inglês B1. Permite narrar, descrever, opinar e recomendar — tudo ao mesmo tempo. O desafio não é escrever muito; é escrever com precisão, especificidade e voz própria. Esta aula ensina como fazer isso com a estrutura certa.',
    modelText: `Three Days in Porto: What Nobody Tells You

I had heard a lot about Porto before I went — the port wine, the azulejos, the bridges. What I had not expected was how alive the city feels at every hour of the day.

We arrived on a Friday evening and set off early the next morning to explore Ribeira, the old riverside district. The streets were narrow and slightly chaotic, and the smell of coffee and freshly baked bread came from every direction. While we were wandering through the side streets, we stumbled upon a small market that was not on any tourist map. That turned out to be the highlight of the whole trip.

The food was, without question, the most memorable part. The francesinha — a local sandwich covered in a thick meat-and-beer sauce — was unlike anything I had ever eaten. Rich, heavy, completely over the top. I had two.

By the time we were ready to leave on Sunday, I felt as though I had barely scratched the surface. Porto is one of those places where the longer you stay, the more you discover. If you ever get the chance to go, I would highly recommend spending at least five days — three is simply not enough.`,
    modelTextBreakdown: [
      { note: 'Título: específico e intrigante — não "My trip to Porto" mas "What nobody tells you". Desperta curiosidade.' },
      { note: 'Parágrafo 1: contraste entre expectativa e realidade. "I had heard... What I had not expected was..." — usa past perfect para timeline clara.' },
      { note: '"Set off early the next morning" — phrasal verb de viagem em uso natural.' },
      { note: '"While we were wandering... we stumbled upon" — past continuous para cenário + past simple para evento inesperado.' },
      { note: '"That turned out to be the highlight" — expressão natural de avaliação positiva com nuance.' },
      { note: '"Without question, the most memorable part" — superlativo com intensificador.' },
      { note: '"Unlike anything I had ever eaten" — comparação negativa + past perfect para ênfase na raridade da experiência.' },
      { note: '"By the time we were ready to leave, I felt as though..." — future/past perfect em contexto narrativo; "as though" para comparação subjetiva.' },
      { note: '"The longer you stay, the more you discover" — double comparative aplicado naturalmente.' },
      { note: '"I would highly recommend spending at least five days" — recomendação com condicional educado + gerúndio.' },
    ],
    commonWritingMistakes: [
      {
        wrong: 'The trip was very good and very interesting. We saw many things and ate good food.',
        right: 'The trip exceeded our expectations in every way. We explored the historic quarter, visited a hidden market and ate some of the most flavourful food I have ever tried.',
        explanation: 'Evite adjetivos genéricos ("good", "interesting", "nice"). Especifique o que você fez, viu e comeu. Detalhes concretos criam um texto memorável.',
      },
      {
        wrong: 'We visited Porto. Then we went to the market. Then we ate. Then we went to the bridge.',
        right: 'After exploring the market, we walked down to the river and crossed the famous iron bridge — the views from the top were well worth the climb.',
        explanation: 'Não enumere eventos com "then... then... then". Use conectores variados: after, once, having done X, by the time, while.',
      },
      {
        wrong: 'I recommend Porto. It is a beautiful city.',
        right: 'If you ever have the chance to visit, I would highly recommend going in spring — the weather is warm but not overwhelming, and the city is far less crowded than in summer.',
        explanation: 'Recomendações vagas não ajudam o leitor. Seja específico: quando ir, por quê, o que fazer — isso é o que torna um blog útil e autêntico.',
      },
      {
        wrong: 'Porto is the most beautiful city I ever visited.',
        right: 'Porto is one of the most beautiful cities I have ever visited.',
        explanation: 'Em inglês, superlativo com experiência pessoal usa present perfect: "I have ever visited". E "one of the most..." é mais natural e modesto do que declarações absolutas.',
      },
    ],
    revisionChecklist: [
      'O título é específico e desperta curiosidade (não é genérico como "My holiday")?',
      'O parágrafo de abertura apresenta o destino e cria expectativa ou contraste?',
      'Usei pelo menos um comparativo avançado (double comparative, "as... as", "not as... as")?',
      'Há pelo menos um momento de surpresa, contraste ou expectativa não correspondida?',
      'Descrevi um lugar, comida ou experiência com detalhe específico (não genérico)?',
      'Terminei com uma recomendação clara e específica (quando ir, o que fazer)?',
      'Usei conectores variados (after, while, by the time, however, what struck me most)?',
      'Revisei adjetivos genéricos ("good", "nice", "beautiful") e os substituí por mais precisos?',
    ],
    draftTask: task(
      'Escreva um rascunho de 120-160 palavras sobre uma viagem real ou inventada. Estrutura: (1) abertura com contexto e expectativa, (2) dois momentos específicos da viagem com detalhe sensorial ou emocional, (3) encerramento com avaliação e recomendação. Não use apenas "it was amazing" — mostre, não diga.',
      'Pense em: o que foi inesperado? O que vai lembrar por muito tempo? O que diria para um amigo que está planejando ir?',
      'Draft com: título específico / parágrafo de abertura com contraste / dois parágrafos de desenvolvimento com detalhes concretos / encerramento com recomendação específica.'
    ),
    revisionTask: task(
      'Releia o seu rascunho e aplique o checklist: (1) substituiu adjetivos genéricos? (2) usou pelo menos um comparativo avançado? (3) os parágrafos têm conectores variados? (4) a recomendação final é específica?',
      'Se encontrar "it was great", "very nice" ou "we saw many things" — reescreva com especificidade.',
      'Versão revisada com adjetivos concretos, pelo menos um comparativo avançado, conectores variados e recomendação específica.'
    ),
    finalVersionTask: task(
      'Escreva a versão final limpa do post ou email de 120-160 palavras. Nenhuma marca de rascunho. Título obrigatório. Use o checklist completo antes de finalizar.',
      'Pense no leitor: alguém que está planejando ir ao mesmo lugar. Sua escrita deve ser útil, honesta e específica.',
      'Texto final com: título criativo / abertura que situa o leitor / desenvolvimento com pelo menos 2 detalhes concretos / pelo menos 1 comparativo avançado / encerramento com recomendação específica e tom pessoal.'
    ),
  }),

]);

export const B1_DEEP_TRAVEL_CULTURE_PART1_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(B1_DEEP_TRAVEL_CULTURE_PART1.filter(l => l.type === 'grammar')),
  vocabulary: Object.freeze(B1_DEEP_TRAVEL_CULTURE_PART1.filter(l => l.type === 'vocabulary')),
  reading: Object.freeze([]),
  listening: Object.freeze([]),
  speaking: Object.freeze(B1_DEEP_TRAVEL_CULTURE_PART1.filter(l => l.type === 'speaking')),
  writing: Object.freeze(B1_DEEP_TRAVEL_CULTURE_PART1.filter(l => l.type === 'writing')),
  checkpoint: Object.freeze([]),
});
