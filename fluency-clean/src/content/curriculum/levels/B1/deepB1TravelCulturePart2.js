import { createVocabularyLesson, createReadingLesson, createListeningLesson } from '../../../schemas/index.js';

const level = 'B1';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['b1-6', 'travel', 'culture', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function q(question, answer, evidence = '', why = '') { return { question, answer, evidence, why }; }

export const B1_DEEP_TRAVEL_CULTURE_PART2 = Object.freeze([

  // ─── READING-006: A travel and culture article ────────────────────────────────
  createReadingLesson({
    ...common,
    id: 'B1-READING-006',
    order: 6,
    readingStrategy: [
      task('Antes de ler: o que você acha que é "slow travel"? Preveja o significado pelo título antes de confirmar no texto.', 'Predição de significado pelo título.'),
      task('Primeira leitura (gist): leia rápido e identifique a tese principal do autor sobre slow travel.', 'Gist da tese.'),
      task('Segunda leitura (detail): localize os argumentos e os exemplos concretos; marque palavras de comparação (faster, deeper, more meaningful).', 'Leitura por detalhe e comparação.'),
      task('Evidência: para cada resposta, copie a frase do texto que a justifica.', 'Evidência textual.'),
    ],
    title: 'Reading: The case for slow travel',
    objectives: [
      'Ler um artigo de opinião sobre slow travel com compreensão de argumento e detalhe.',
      'Identificar a posição do autor e as evidências usadas para sustentá-la.',
      'Inferir o significado de expressões de viagem em contexto.',
      'Refletir sobre a diferença entre turismo rápido e imersão cultural.',
    ],
    preReading: {
      question: 'When you travel, do you prefer to visit many places quickly or spend more time in fewer places? What are the advantages of each approach?',
      vocabularyPreview: ['immerse', 'itinerary', 'authentic', 'locals', 'blur'],
    },
    mainText: `The case for slow travel

There is a particular kind of exhaustion that comes from trying to see too much in too little time. You know the itinerary: three cities in five days, a checklist of monuments, a carefully curated set of photographs to prove you were there. You arrive home more tired than when you left, with a vague sense of having been somewhere without having actually experienced anything.

Slow travel is a response to this. The idea is simple: instead of rushing from place to place, you choose one destination, stay longer, and give yourself the chance to actually live there — even briefly. You shop at local markets, learn a few words of the language, eat where the locals eat, and gradually begin to understand what makes a place different from everywhere else.

The benefits go beyond relaxation. Research on cultural learning suggests that genuine cultural immersion — even for a few weeks — significantly improves language retention, cross-cultural empathy, and the ability to adapt to unfamiliar situations. In other words, the slower you travel, the more you bring home.

There is also an environmental argument. Short, high-frequency trips typically generate more emissions per traveller per day than a single extended stay. Slow travel is not just more rewarding — it is, by most calculations, more responsible.

Critics argue that not everyone has the luxury of time. A two-week holiday is what most people get, and they want to make the most of it. This is a fair point. But even within a two-week trip, there is a choice: spread yourself thin across six cities, or spend four days in each of three places, go off the beaten track, talk to people, and return with something more than photographs.

The most memorable trips are rarely the ones with the longest checklist. They are the ones where something unexpected happened — a conversation with a stranger, a market you stumbled upon, a sunset that made you stop what you were doing. Those moments require time. And time requires a different kind of travel.`,
    vocabulary: [
      task(
        'No primeiro parágrafo, o autor descreve uma "particular kind of exhaustion". O que causa esse cansaço, segundo o texto?',
        'Inferência do argumento do primeiro parágrafo.',
        'Trying to see too many places in too little time — seguir um itinerário apertado de monumentos e fotos sem realmente experienciar o lugar.'
      ),
      task(
        'O que significa "spread yourself thin" no quinto parágrafo?',
        'Expressão idiomática. Inferência de contexto: seis cidades vs três.',
        '"Spread yourself thin" = tentar fazer coisas demais ao mesmo tempo, dividindo seu tempo/energia de forma que nada é aproveitado em profundidade.'
      ),
      task(
        'No quarto parágrafo, o autor usa "by most calculations". O que esta expressão indica sobre o argumento?',
        'Nuance de tom — cautela vs. certeza absoluta.',
        '"By most calculations" indica que o autor reconhece que pode haver exceções, mas que a maioria das análises apoia a conclusão. É uma forma cuidadosa de fazer uma afirmação sem dizer "always" ou "definitely".'
      ),
    ],
    comprehensionQuestions: [
      q(
        'What is slow travel, according to the second paragraph?',
        'Choosing one destination, staying longer, living there briefly — shopping at local markets, learning some language, eating where locals eat.',
        'Instead of rushing from place to place, you choose one destination, stay longer, and give yourself the chance to actually live there.',
        'Direct identification of the author\'s definition — contrasted with the checklist approach.'
      ),
      q(
        'According to the third paragraph, what three things does genuine cultural immersion improve?',
        '(1) Language retention. (2) Cross-cultural empathy. (3) Ability to adapt to unfamiliar situations.',
        'Research on cultural learning suggests that genuine cultural immersion significantly improves language retention, cross-cultural empathy, and the ability to adapt to unfamiliar situations.',
        'Three items listed in a single sentence — precise identification required.'
      ),
      q(
        'What environmental point does the author make in the fourth paragraph?',
        'Short, high-frequency trips generate more emissions per traveller per day than a single extended stay — slow travel is more responsible environmentally.',
        'Short, high-frequency trips typically generate more emissions per traveller per day than a single extended stay.',
        'The environmental argument adds a second type of evidence beyond personal/cultural benefits.'
      ),
      q(
        'How does the author respond to the criticism that "not everyone has the luxury of time"?',
        'The author acknowledges the point is fair but argues that even within a two-week trip, you can choose depth over breadth — four days in three places instead of one day in six.',
        'Even within a two-week trip, there is a choice: spread yourself thin across six cities, or spend four days in each of three places.',
        'The author uses concession ("This is a fair point") then offers a reframing of the problem.'
      ),
      q(
        'What does the author suggest makes a trip truly memorable, according to the final paragraph?',
        'Unexpected moments — a conversation with a stranger, a market stumbled upon, a sunset. These require time, which requires slow travel.',
        'The most memorable trips are rarely the ones with the longest checklist. They are the ones where something unexpected happened.',
        'The closing argument brings together the whole essay — it is an emotional and experiential case, not just logical.'
      ),
    ],
    guidedSummary: {
      instruction: 'Escreva um resumo de 3-4 frases. Inclua: (1) o que é slow travel, (2) os benefícios principais, (3) como o autor responde aos críticos, (4) a conclusão.',
      modelAnswer: 'The article argues in favour of slow travel — spending more time in fewer places rather than rushing through a long checklist of destinations. The author claims that this approach offers cultural, psychological, and environmental benefits, including improved cross-cultural empathy and lower emissions. In response to the argument that most people only have two weeks, the author suggests that even within that time, choosing depth over breadth creates more meaningful experiences. The conclusion is that truly memorable travel requires time, and therefore a slower pace.',
    },
    productionTask: task(
      'Escreva 3-4 frases respondendo: "Do you agree with the author\'s argument for slow travel? Why or why not?" Use evidências do texto para apoiar a sua posição.',
      'Use: I agree/disagree with the author\'s argument that... / The author\'s point about... is convincing because... / However, I think...',
      'I largely agree with the author\'s argument that slow travel is more rewarding than rushing through multiple destinations. The point about cultural immersion is convincing — I think it is impossible to truly understand a place in one or two days. However, I think the article underestimates how much you can learn even from a short visit if you make deliberate choices about what to do and who to speak to.'
    ),
  }),

  // ─── LISTENING-006: A travel conversation ─────────────────────────────────────
  createListeningLesson({
    ...common,
    id: 'B1-LISTENING-006',
    order: 6,
    title: 'Listening: A trip to Marrakech',
    objectives: [
      'Compreender uma conversa natural sobre uma viagem recente.',
      'Identificar comparativos e vocabulário de viagem em uso real.',
      'Reconhecer expressões de expectativa, surpresa e avaliação.',
      'Praticar shadowing de linguagem descritiva e narrativa.',
    ],
    listeningPreparation: [
      task('Before listening: think about what travellers usually compare after a trip (expectations, food, places, transport, people).', 'Prepare these categories to organise details quickly.'),
      task('Prediction: predict one expectation the speaker had before the trip and one surprise they might mention after arriving.', 'Listen for phrases that contrast expectations with reality.'),
      task('Key words to listen for: comparison markers (better than, highlight, nowhere near), narrative cues (while we were..., then...), and travel words (guide, medina, market, rooftop).', 'These clues help you catch both opinion and story details.'),
    ],
    transcript: [
      'Priya: So, how was Marrakech? You\'ve been talking about going for years.',
      'Daniel: It was incredible. Honestly, not what I expected at all — which made it even better.',
      'Priya: What do you mean? How was it different from what you expected?',
      'Daniel: I thought it would be more touristy, you know? More like a theme park version of North Africa. But once you get off the main square, you\'re in these tiny streets with no tourists, just locals going about their daily lives.',
      'Priya: How did you get around? Did you hire a guide?',
      'Daniel: For the first day, yes. Best decision I made. Without a guide, I would have got completely lost in the medina — the old city. It\'s a maze. But by day two I was navigating on my own.',
      'Priya: What was the food like?',
      'Daniel: That was the highlight for me. The food was far better than I\'d expected — not just couscous and tagine, though those were excellent. There was this tiny place off the beaten track that a local recommended. We had this slow-cooked lamb that was unlike anything I\'d ever eaten.',
      'Priya: Did you do much sightseeing?',
      'Daniel: Some. We visited the Bahia Palace, which was beautiful, and a couple of the souks — the markets. But honestly, the best part was just wandering. While we were walking through the dye quarter one morning, we stumbled upon a rooftop café with a view over the whole city. That kind of thing doesn\'t happen when you\'re rushing.',
      'Priya: Any low points?',
      'Daniel: The jet lag was worse than I expected. We only had a one-hour time difference, but I was exhausted the first two days. And customs on the way back took forever — we almost missed our connection.',
      'Priya: Would you go back?',
      'Daniel: Definitely. By the time I leave next time, I will have spent at least two weeks there. Three days was nowhere near enough.',
    ],
    comprehensionQuestions: [
      q(
        'How was Marrakech different from what Daniel had expected?',
        'He expected it to be more touristy — like a theme park. Instead, away from the main square, it felt authentic with locals going about their daily lives.',
        'I thought it would be more touristy... But once you get off the main square, you\'re in these tiny streets with no tourists, just locals going about their daily lives.',
        'Contrast between expectation and reality — key B1 narrative structure.'
      ),
      q(
        'Why was hiring a guide on the first day a good decision?',
        'Because the medina (old city) is a maze and he would have got completely lost without one.',
        'Without a guide, I would have got completely lost in the medina... It\'s a maze.',
        'Third Conditional used in natural self-reflection — key grammar from B1.4.'
      ),
      q(
        'What was the highlight of the trip for Daniel, and where did he find it?',
        'The food — specifically a slow-cooked lamb at a tiny place off the beaten track recommended by a local.',
        'The food was far better than I\'d expected... There was this tiny place off the beaten track that a local recommended. We had this slow-cooked lamb that was unlike anything I\'d ever eaten.',
        'Vocabulary "off the beaten track" + superlative "unlike anything" in natural use.'
      ),
      q(
        'What happened while Daniel and a friend were walking through the dye quarter?',
        'They stumbled upon a rooftop café with a view over the whole city.',
        'While we were walking through the dye quarter one morning, we stumbled upon a rooftop café with a view over the whole city.',
        'Past continuous for background + past simple for event — key grammar from B1.2.'
      ),
      q(
        'What does Daniel say about going back? What future form does he use?',
        'He says he\'d definitely go back and uses future perfect: "By the time I leave next time, I will have spent at least two weeks there."',
        'By the time I leave next time, I will have spent at least two weeks there.',
        'Future perfect with "by the time" — key grammar from B1-GRAMMAR-016 in natural use.'
      ),
    ],
    vocabulary: [
      task(
        'Daniel says Marrakech felt like "a maze". What does this mean?',
        'Inferência de contexto — ele disse que teria se perdido sem guia.',
        '"A maze" é um labirinto — uma série de ruas estreitas e confusas onde é fácil se perder. É uma metáfora para a complexidade do layout do medina.'
      ),
      task(
        'Daniel says "the best part was just wandering". What does "wandering" mean? Is it positive or negative here?',
        'Inferência de tom e contexto.',
        '"Wandering" = caminhar sem destino fixo, explorando livremente. No contexto, é claramente positivo — Daniel prefere explorar sem pressa a seguir um itinerário turístico.'
      ),
      task(
        'Daniel says "Three days was nowhere near enough." What does "nowhere near" add to the meaning?',
        'Intensificador de comparação negativa.',
        '"Nowhere near enough" = muito longe de ser suficiente — muito mais forte do que "not enough". Expressa que três dias foi insuficiente em grau extremo. Compare com "not as... as" (menos intenso).'
      ),
    ],
    shadowing: [
      task(
        'That was the highlight for me. The food was far better than I\'d expected.',
        'Ênfase natural em "highlight" e "far better". Contração "I\'d expected" = "I had expected" — passado perfeito contraído. Pausa leve após "for me".',
      ),
      task(
        'While we were walking through the dye quarter one morning, we stumbled upon a rooftop café.',
        'Past continuous (longer, slower) + past simple (sudden event, faster). "Stumbled upon" = encontrou por acaso. Entonação sobe em "walking through" e cai em "stumbled upon".',
      ),
      task(
        'By the time I leave next time, I will have spent at least two weeks there.',
        'Future perfect natural na fala. Pausa após "next time". Ênfase em "at least two weeks". Velocidade natural — não muito lento.',
      ),
    ],
    oralProduction: task(
      'Imagine que você é Daniel. Grave uma resposta de 60-90 segundos para "How was your trip to Marrakech?" Inclua: (1) como foi diferente das expectativas, (2) o highlight da viagem, (3) algo inesperado que aconteceu, (4) se você voltaria.',
      'Use: I thought it would be... / The highlight for me was... / While we were... we stumbled upon... / I\'d definitely go back because...',
      'Marrakech was incredible — honestly, not what I expected at all. I thought it would be much more touristy, but away from the main square, it felt completely authentic. The highlight for me was the food. There was this tiny restaurant off the beaten track that a local recommended, and the slow-cooked lamb was unlike anything I\'d ever eaten. The most unexpected moment was when we were walking through the dye quarter and stumbled upon this rooftop café with an incredible view. I\'d definitely go back — three days was nowhere near enough. Next time, I\'m planning to stay at least two weeks.'
    ),
  }),

  // ─── VOCABULARY-012: Cultural differences and social customs ──────────────────
  createVocabularyLesson({
    ...common,
    id: 'B1-VOCABULARY-012',
    order: 12,
    title: 'Cultural differences and social customs',
    objectives: [
      'Usar vocabulário preciso para descrever normas culturais e sociais em diferentes países.',
      'Reconhecer e usar expressões de adequação cultural: cause offence, blend in, be aware of.',
      'Distinguir "etiquette", "customs", "traditions" e "taboo" por contexto.',
      'Descrever diferenças culturais com sensibilidade e precisão.',
    ],
    teacherOpening: 'Entender diferenças culturais vai além de saber o que é "politicamente correto". É sobre se comunicar com respeito, evitar mal-entendidos e construir conexões reais com pessoas de outros contextos. Esta aula cobre o vocabulário essencial para falar sobre normas sociais, costumes e sensibilidades culturais com precisão e maturidade.',
    essentialWords: [
      { word: 'etiquette', definition: 'etiqueta / normas de comportamento social', example: 'Business etiquette varies significantly between Japan and Brazil.', brazilianNote: '"Etiquette" = conjunto de regras não-escritas de comportamento educado. Mais amplo que "manners" (que foca em ações específicas).' },
      { word: 'custom', definition: 'costume / prática cultural estabelecida', example: 'It is a custom in many cultures to remove your shoes before entering someone\'s home.', brazilianNote: '"Custom" (singular) = um costume específico. "Customs" (plural) = as práticas culturais de um povo. Não confundir com "tradition" (mais ligado a herança histórica).' },
      { word: 'taboo', definition: 'tabu / assunto ou comportamento proibido socialmente', example: 'In some cultures, discussing salaries is considered taboo.', brazilianNote: '"Taboo" pode ser substantivo ou adjetivo: "a cultural taboo" / "it is taboo to...". Vem do polinésio via inglês — amplamente usado em inglês moderno.' },
      { word: 'cause offence', definition: 'ofender / causar ofensa (sem querer, muitas vezes)', example: 'Without realising it, he caused offence by refusing the host\'s food.', brazilianNote: 'Collocação fixa: SEMPRE "cause offence" (BrE) ou "cause offense" (AmE). Não "do offence" ou "make offence". "Give offence" também existe mas é menos comum.' },
      { word: 'blend in', definition: 'misturar-se / adaptar-se ao ambiente cultural', example: 'She made an effort to blend in by learning a few local phrases.', brazilianNote: '"Blend in" = não chamar atenção, comportar-se como os locais. Oposto de "stand out". Não tem conotação negativa — é sobre respeito e adaptação.' },
      { word: 'be aware of', definition: 'estar ciente de / ter consciência de', example: 'Before visiting, it is worth being aware of local customs around dress codes.', brazilianNote: '"Be aware of" = ter conhecimento consciente de algo. Mais forte que "know about" — implica atenção ativa. "Be unaware of" = não saber, estar inconsciente de.' },
      { word: 'host', definition: 'anfitrião / país ou pessoa que recebe', example: 'As a guest, it is polite to respect your host\'s customs and routines.', brazilianNote: '"Host" (substantivo) = anfitrião. "Host" (verbo) = receber, hospedar: "The country is hosting the World Cup." Não confundir com "guest" (hóspede/convidado).' },
      { word: 'tipping', definition: 'gorjeta / prática de deixar gorjeta', example: 'Tipping culture varies enormously — 20% is expected in the US, but it can be seen as insulting in Japan.',  brazilianNote: '"Tipping" = a prática geral de gorjetas. "Leave a tip" = deixar uma gorjeta específica. "Tip" como verbo: "Should I tip the driver?"' },
      { word: 'queue / line up', definition: 'fila / esperar em fila', example: 'Jumping the queue is considered extremely rude in the UK.', brazilianNote: '"Queue" (BrE) = "line" (AmE). "Queue up" / "line up" = entrar na fila. "Jump the queue" = furar a fila — comportamento altamente negativo em culturas anglófonas.' },
      { word: 'haggle', definition: 'pechinchar / negociar preço', example: 'In many markets in Morocco and Turkey, you are expected to haggle over prices.', brazilianNote: '"Haggle" = negociar o preço para baixo, especialmente em mercados. Em muitas culturas, não haggling é considerado desrespeitoso — como se você não valorizasse a interação.' },
      { word: 'greet / greeting', definition: 'cumprimentar / cumprimento', example: 'The appropriate greeting varies — a handshake, a bow, or a cheek kiss, depending on the culture.', brazilianNote: '"Greet" (verbo) / "greeting" (substantivo). "Greetings" (plural) pode ser usado como saudação formal em cartas: "Warm greetings from..." É diferente de "hello" — é o ato/ritual de cumprimentar.' },
      { word: 'dress code', definition: 'código de vestimenta', example: 'Many religious sites have strict dress codes — shoulders and knees must be covered.', brazilianNote: '"Dress code" = regra de vestimenta formal ou informal. "Smart casual", "formal", "business casual" são exemplos de dress codes. Importante em viagens a locais religiosos e eventos profissionais.' },
    ],
    chunks: [
      { chunk: 'it is considered rude/polite to...', meaning: 'é considerado grosseiro/educado...', example: 'It is considered rude to point at people in many Asian cultures.' },
      { chunk: 'you are expected to...', meaning: 'espera-se que você...', example: 'In Japan, you are expected to remove your shoes before entering a home.' },
      { chunk: 'it is worth being aware that...', meaning: 'vale saber que... / é importante estar ciente de que...', example: 'It is worth being aware that tipping is not expected in some countries.' },
      { chunk: 'out of respect for...', meaning: 'por respeito a...', example: 'Out of respect for local customs, she covered her head when entering the mosque.' },
      { chunk: 'without meaning to', meaning: 'sem querer / sem intenção', example: 'He caused offence without meaning to by using the wrong hand to pass food.' },
      { chunk: 'make an effort to', meaning: 'fazer um esforço para', example: 'Even learning five words in the local language shows you\'ve made an effort to connect.' },
    ],
    dangerousConfusions: [
      task(
        'Qual a diferença entre "custom", "tradition" e "etiquette"? Use cada um numa frase sobre viagem.',
        '"Custom" = prática estabelecida (pode ser do cotidiano). "Tradition" = prática com raízes históricas/culturais profundas. "Etiquette" = regras de comportamento social educado.',
        'It is a custom to greet shopkeepers when entering their store. / The tradition of carnival in Brazil has Indigenous, African and European roots. / Business etiquette in Japan involves exchanging business cards with two hands.'
      ),
      task(
        'Corrija se necessário: "I made an offence when I refused the tea."',
        '"Make" não colocaciona com "offence".',
        'I caused offence when I refused the tea.'
      ),
      task(
        'O que é mais correto: "She was unaware of" ou "she didn\'t know about" as local customs? São intercambiáveis?',
        'Diferença de nuance — "unaware" implica que ela não tinha ideia; "didn\'t know about" pode ser mais neutro.',
        'Both are correct but "unaware of" implies a stronger lack of consciousness — she had no idea at all. "Didn\'t know about" is more neutral and common in everyday speech. "She was unaware of the local custom" sounds slightly more formal.'
      ),
    ],
    miniDialogues: [
      {
        title: 'Navigating cultural differences',
        lines: [
          'Camila: I\'m visiting Japan for the first time next month. Any advice?',
          'Kenji: Definitely. There\'s quite a bit of etiquette to be aware of — especially around food and greetings.',
          'Camila: Like what?',
          'Kenji: Well, it is considered very rude to stick chopsticks upright in your rice — that\'s associated with funeral rituals. And you should always receive and give things with both hands out of respect.',
          'Camila: What about tipping? I always tip in restaurants.',
          'Kenji: Actually, tipping can cause offence in Japan — it can suggest the person isn\'t being paid fairly. It\'s better not to leave a tip at all.',
          'Camila: That\'s the opposite of what I expected. I would have caused so much offence without meaning to.',
          'Kenji: That\'s why it\'s worth doing a bit of research before you go. The effort to blend in and respect local customs goes a long way.',
        ],
        focus: 'etiquette, be aware of, considered rude, cause offence, tipping, out of respect, blend in, without meaning to, make an effort — all in natural cultural conversation.',
      },
    ],
    productionTasks: [
      task(
        'Pense num costume cultural brasileiro que poderia surpreender ou confundir um visitante estrangeiro. Descreva em 3-4 frases usando: custom, it is considered, you are expected to, out of respect / without meaning to.',
        'Exemplos: cumprimentos físicos (beijo na bochecha), informalidade rápida, horas de chegada flexíveis, jeitinho. Seja específico e equilibrado — sem estereótipos.',
        'In Brazil, it is a custom to greet people with a kiss on the cheek, even in relatively formal situations. Visitors might be surprised that this applies to people they have only just met. You are not expected to initiate it, but refusing can cause offence without meaning to — the best approach is to follow the other person\'s lead. Out of respect for this custom, it is worth observing how Brazilians greet each other before deciding what to do.'
      ),
      task(
        'Você está dando conselhos para um amigo que vai visitar um país que você conhece (real ou inventado). Escreva 4-5 frases usando pelo menos 4 expressões desta aula.',
        'Inclua: um dress code, um taboo, um custom e uma prática de tipping ou haggling.',
        'If you\'re visiting Morocco, there are a few cultural differences worth being aware of. First, dress codes are important — it is considered respectful to cover your shoulders and knees when visiting mosques or religious sites. Haggling is expected in the souks — it is part of the culture, and not haggling can actually seem rude. Tipping is appreciated but not obligatory; leaving a small amount out of respect for good service is generally the right approach. Finally, be careful not to use your left hand to pass food or accept gifts, as this can cause offence without meaning to.'
      ),
    ],
  }),

]);

export const B1_DEEP_TRAVEL_CULTURE_PART2_BY_PILLAR = Object.freeze({
  grammar: Object.freeze([]),
  vocabulary: Object.freeze(B1_DEEP_TRAVEL_CULTURE_PART2.filter(l => l.type === 'vocabulary')),
  reading: Object.freeze(B1_DEEP_TRAVEL_CULTURE_PART2.filter(l => l.type === 'reading')),
  listening: Object.freeze(B1_DEEP_TRAVEL_CULTURE_PART2.filter(l => l.type === 'listening')),
  speaking: Object.freeze([]),
  writing: Object.freeze([]),
  checkpoint: Object.freeze([]),
});
