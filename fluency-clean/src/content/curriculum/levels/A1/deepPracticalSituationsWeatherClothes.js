import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'A1';
const status = 'ready';

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }
function ex(text, translation, why = '', warning = '') { return { text, translation, note: why, warning }; }

const common = {
  level,
  status,
  estimatedMinutes: 55,
  tags: ['a1-4', 'practical-situations', 'clothes-weather-feelings', 'deep-approved-target'],
};

export const A1_DEEP_PRACTICAL_SITUATIONS_WEATHER_CLOTHES = Object.freeze([
  createGrammarLesson({
    ...common,
    id: 'A1-GRAMMAR-024',
    order: 24,
    title: 'Basic conjunctions: and, but, because',
    objectives: ['Conectar frases simples com and, but e because.', 'Explicar roupa, clima e sentimentos com frases curtas.', 'Evitar frases longas demais no A1.', 'Usar because para motivo simples.'],
    teacherOpening: 'No A1, você não precisa escrever frases enormes. Mas precisa conectar ideias simples: It is cold and rainy. I am tired, but I am okay. I wear a jacket because it is cold. And adiciona, but contrasta, because explica o motivo.',
    whyItMatters: 'And, but e because deixam seu inglês mais natural sem sair do A1. Eles ajudam a falar de clima, roupas, sentimentos, rotina e preferências com mais sentido.',
    realLifeUseCases: ['Dizer como está o clima e o que vestir.', 'Explicar por que está usando uma roupa.', 'Dizer como se sente, mas contrastar com outra ideia.', 'Escrever mensagens curtas mais naturais.'],
    conceptExplanation: 'Use and para somar ideias: It is cold and windy. Use but para contraste: I am tired, but I am happy. Use because para motivo: I wear a coat because it is cold. No A1, conecte duas ideias curtas. Não faça frases muito longas.',
    mentalModel: { title: 'and soma, but contrasta, because explica', summary: 'Três conectores para frases curtas.', steps: ['cold and rainy', 'tired but happy', 'coat because it is cold'] },
    stepByStep: [task('Escreva a primeira ideia.'), task('Escolha and, but ou because.'), task('Escreva a segunda ideia curta.'), task('Leia em voz alta.'), task('Corte se a frase ficar longa demais.')],
    portugueseContrast: [task('Because não é usado igual “por causa que”.'), task('But contrasta; and apenas soma.'), task('Evite usar and muitas vezes na mesma frase.')],
    guidedDiscovery: [task('Em “cold and rainy”, and soma duas características.'), task('Em “tired but happy”, but mostra contraste.'), task('Em “I wear a jacket because it is cold”, because dá motivo.')],
    guidedBeforeQuiz: [task('Complete: It is cold ___ rainy.', 'and'), task('Complete: I am tired, ___ I am okay.', 'but'), task('Complete: I wear a coat ___ it is cold.', 'because')],
    grammarGoal: 'Conectar ideias A1 com and, but e because.',
    formationGuide: [task('idea + and + idea', 'It is cold and rainy.'), task('idea + but + idea', 'I am tired, but I am happy.'), task('action + because + reason', 'I wear a jacket because it is cold.')],
    whenToUse: [task('Use and para adicionar.'), task('Use but para contraste.'), task('Use because para explicar motivo.')],
    whenNotToUse: [task('Não use because sem motivo depois.'), task('Não use but quando as ideias só somam.'), task('Não crie frases enormes no A1.')],
    grammarTable: [
      { pattern: 'and', example: 'It is cold and windy.', translation: 'Está frio e ventando.' },
      { pattern: 'but', example: 'I am tired, but I am okay.', translation: 'Estou cansado, mas estou bem.' },
      { pattern: 'because', example: 'I wear a coat because it is cold.', translation: 'Eu uso casaco porque está frio.' }
    ],
    teacherExamples: [
      { english: 'It is hot and sunny.', translation: 'Está quente e ensolarado.', why: 'And soma duas informações.' },
      { english: 'I am cold, but I am fine.', translation: 'Estou com frio, mas estou bem.', why: 'But contrasta.' },
      { english: 'I wear a T-shirt because it is hot.', translation: 'Eu uso camiseta porque está quente.', why: 'Because dá motivo.' },
      { english: 'She is sad, but she is calm.', translation: 'Ela está triste, mas está calma.', why: 'Sentimentos com contraste.' }
    ],
    commonBrazilianMistakes: [mistake('I use jacket because cold.', 'I wear a jacket because it is cold.', 'Precisa de wear, artigo e frase completa depois de because.'), mistake('It is cold but rainy.', 'It is cold and rainy.', 'Sem contraste real, use and.'), mistake('I am happy because.', 'I am happy because it is sunny.', 'Because precisa de motivo.')],
    controlledPractice: [task('Complete: It is sunny ___ hot.', 'and'), task('Complete: I am tired, ___ I am happy.', 'but'), task('Complete: I wear boots ___ it is rainy.', 'because')],
    errorCorrectionPractice: [task('Corrija: I wear coat because cold.', 'I wear a coat because it is cold.'), task('Corrija: It is hot but sunny.', 'It is hot and sunny.'), task('Corrija: I am sad because.', 'I am sad because it is rainy.')],
    transformationPractice: [task('Una com and: It is cold. It is windy.', 'It is cold and windy.'), task('Una com but: I am tired. I am okay.', 'I am tired, but I am okay.'), task('Una com because: I wear a jacket. It is cold.', 'I wear a jacket because it is cold.')],
    translationPractice: [task('Está frio e chuvoso.', 'It is cold and rainy.'), task('Estou cansado, mas estou bem.', 'I am tired, but I am okay.'), task('Eu uso casaco porque está frio.', 'I wear a coat because it is cold.')],
    productionTasks: [task('Escreva 5 frases com and sobre clima.'), task('Escreva 5 frases com but sobre sentimentos.'), task('Escreva 5 frases com because sobre roupas e clima.')],
    finalChecklist: [task('Usei and para somar?'), task('Usei but para contraste?'), task('Usei because com motivo completo?'), task('Minhas frases ficaram curtas?')],
    selfAssessment: [task('Consigo usar and/but/because?'), task('Consigo explicar roupa por causa do clima?'), task('Consigo falar sentimentos com contraste?')],
    lessonRecap: ['And adiciona.', 'But contrasta.', 'Because explica motivo.', 'No A1, conecte ideias curtas.'],
    nextLessonBridge: 'Agora você vai aprender roupas, clima e sentimentos para usar esses conectores em situações reais.',
  }),

  createVocabularyLesson({
    ...common,
    id: 'A1-VOCABULARY-016',
    order: 16,
    title: 'Clothes',
    objectives: ['Aprender roupas essenciais.', 'Conectar roupas ao clima.', 'Usar wear para falar do que veste.', 'Produzir frases com clothes, weather e feelings.'],
    teacherOpening: 'Clothes fica muito mais útil quando aparece com clima e sentimento. Você não aprende jacket só como palavra solta; aprende: I wear a jacket because it is cold. I wear shorts when it is hot. Hoje você vai montar frases práticas com roupas, clima e sensações básicas.',
    whyItMatters: 'Roupas aparecem em conversas, compras, clima, mala de viagem e descrições pessoais. O verbo principal é wear: I wear a T-shirt. She wears a dress. No A1, o foco é reconhecer e usar roupas comuns.',
    realLifeUseCases: ['Falar o que está vestindo.', 'Escolher roupa pelo clima.', 'Entender descrição de roupa.', 'Comprar roupa simples.', 'Explicar por que usa casaco, shorts ou boots.'],
    conceptExplanation: 'Use wear para vestir/usar roupa. Clothes é roupa em geral. T-shirt, shirt, pants, shorts, dress, skirt, jacket, coat, shoes, boots, hat e socks são palavras essenciais. Para clima, use hot, cold, rainy, sunny, windy. Para sentimentos, use happy, sad, tired, cold, hot.',
    mentalModel: { title: 'clothes + weather + reason', summary: 'I wear X because it is Y.', steps: ['I wear a jacket because it is cold.', 'I wear shorts because it is hot.', 'I wear boots because it is rainy.'] },
    stepByStep: [task('Aprenda a roupa com uma frase.'), task('Use wear para vestir.'), task('Adicione clima com because.'), task('Adicione sentimento quando fizer sentido.'), task('Evite traduzir usar como use em roupas comuns.')],
    portugueseContrast: [task('Em inglês, para roupa, use wear, não use.'), task('Pants em inglês americano é calça; em inglês britânico pode variar.'), task('Cold pode ser clima frio ou sensação de frio.'), task('Clothes não se pronuncia como “clotches”.')],
    guidedDiscovery: [task('Qual verbo fala de roupa?', 'wear'), task('Qual roupa usamos quando está frio?', 'jacket/coat'), task('Qual roupa usamos quando está quente?', 'T-shirt/shorts')],
    guidedBeforeQuiz: [task('I wear a jacket because it is cold.'), task('She wears a dress.'), task('It is rainy and windy.'), task('I am tired, but I am okay.')],
    topicContext: 'Você vai falar de roupa, clima e como se sente em situações simples do dia a dia.',
    essentialWords: [vocab('clothes', 'roupas', 'My clothes are clean.'), vocab('T-shirt', 'camiseta', 'I wear a T-shirt.'), vocab('shirt', 'camisa', 'He wears a shirt.'), vocab('pants', 'calça', 'I wear pants.'), vocab('shorts', 'shorts/bermuda', 'I wear shorts because it is hot.'), vocab('dress', 'vestido', 'She wears a dress.'), vocab('skirt', 'saia', 'She wears a skirt.'), vocab('jacket', 'jaqueta', 'I wear a jacket because it is cold.'), vocab('coat', 'casaco', 'He wears a coat.'), vocab('shoes', 'sapatos', 'My shoes are black.'), vocab('boots', 'botas', 'I wear boots because it is rainy.'), vocab('hat', 'chapéu/boné', 'I wear a hat.'), vocab('hot', 'quente', 'It is hot.'), vocab('cold', 'frio', 'It is cold.'), vocab('rainy', 'chuvoso', 'It is rainy.'), vocab('sunny', 'ensolarado', 'It is sunny.'), vocab('happy', 'feliz', 'I am happy.'), vocab('tired', 'cansado', 'I am tired.')],
    chunks: [{ chunk: 'I wear a jacket.', translation: 'Eu uso uma jaqueta.', example: 'I wear a jacket.' }, { chunk: 'It is cold and rainy.', translation: 'Está frio e chuvoso.', example: 'It is cold and rainy.' }, { chunk: 'I wear boots because it is rainy.', translation: 'Eu uso botas porque está chuvoso.', example: 'I wear boots because it is rainy.' }, { chunk: 'I am tired, but I am okay.', translation: 'Estou cansado, mas estou bem.', example: 'I am tired, but I am okay.' }],
    pronunciationFocus: { title: 'Foco sonoro', tips: ['Clothes tem som difícil; pode soar como “clohz”.', 'Jacket começa com som de dj.', 'Shoes termina com som de z.'] },
    dangerousConfusions: [task('Wear é vestir/usar roupa; use é usar ferramenta/objeto.'), task('Hot/cold podem ser clima ou sensação.'), task('Clothes é roupa em geral, não clothe para falar comum no A1.')],
    collocations: [task('wear a jacket'), task('wear shoes'), task('cold and rainy'), task('hot and sunny'), task('tired but okay'), task('because it is cold')],
    miniDialogues: [{ title: 'Clothes and weather', lines: ['A: What do you wear when it is cold?', 'B: I wear a jacket.', 'A: What do you wear when it is rainy?', 'B: I wear boots.'], focus: 'Roupas + clima.' }],
    examples: [ex('I wear a jacket because it is cold.', 'Eu uso jaqueta porque está frio.', 'Wear + clothes + because.'), ex('It is hot and sunny.', 'Está quente e ensolarado.', 'And soma clima.'), ex('I am tired, but I am okay.', 'Estou cansado, mas estou bem.', 'But contrasta sentimentos.'), ex('She wears a dress.', 'Ela usa vestido.', 'He/she + wears.')],
    recognitionPractice: [task('Qual palavra é roupa: jacket / rainy / happy?', 'jacket'), task('Qual palavra é clima: boots / sunny / shirt?', 'sunny'), task('Qual palavra é sentimento: tired / pants / windy?', 'tired'), task('Qual verbo usar para roupa?', 'wear')],
    usagePractice: [task('Complete: I ___ a jacket.', 'wear'), task('Complete: It is cold ___ rainy.', 'and'), task('Complete: I wear boots ___ it is rainy.', 'because'), task('Complete: I am tired, ___ I am okay.', 'but')],
    productionTasks: [task('Escreva 6 frases com roupas.'), task('Escreva 4 frases conectando roupa e clima com because.'), task('Escreva 4 frases de sentimento com but.')],
    spacedReview: [task('Revise wear, jacket, shoes e clothes amanhã.'), task('Revise hot/cold/rainy/sunny em frases.')],
    selfAssessment: [task('Consigo falar roupas comuns?'), task('Consigo usar wear?'), task('Consigo ligar roupa ao clima?')],
    lessonRecap: ['Use wear para roupa.', 'Clothes funciona melhor dentro de frases.', 'Weather ajuda a explicar roupas.', 'Feelings podem usar but para contraste.'],
    nextLessonBridge: 'Na escuta, você vai ouvir pessoas falando de clima, roupas e sentimentos.',
  }),

  createReadingLesson({
    ...common,
    id: 'A1-READING-018-CLOTHES',
    order: 18.1,
    title: 'Vocabulary from context — clothes and weather',
    objectives: ['Ler um texto curto com roupas, clima e sentimentos.', 'Inferir vocabulário pelo contexto.', 'Responder com evidência.', 'Reconhecer and, but e because no texto.'],
    teacherOpening: 'Agora você vai ler um texto simples e usar contexto. Mesmo sem entender cada palavra, você pode descobrir sentido olhando roupas, clima e motivos. Procure clues: cold, jacket, rainy, boots, tired, because.',
    whyItMatters: 'Contexto é uma habilidade essencial. Em vez de parar em cada palavra, você usa pistas do texto para entender a ideia geral e responder com evidência.',
    realLifeUseCases: ['Ler mensagem sobre clima.', 'Entender roupa recomendada.', 'Ler descrição pessoal curta.', 'Usar contexto em textos A1.', 'Preparar speaking/writing sobre o dia.'],
    conceptExplanation: 'Vocabulary from context significa entender uma palavra olhando as palavras ao redor. Se o texto diz It is cold, so I wear a jacket, você entende que jacket está ligado a frio e roupa.',
    mentalModel: { title: 'Palavra desconhecida + pistas ao redor', summary: 'Use clima, ação e motivo para inferir.', steps: ['Find the unknown word.', 'Look before and after.', 'Find weather/feeling/action.', 'Choose the meaning.'] },
    stepByStep: [task('Leia o texto completo.'), task('Marque roupas.'), task('Marque clima.'), task('Marque sentimentos.'), task('Use because para achar motivo.'), task('Responda com evidência.')],
    portugueseContrast: [task('Não traduza tudo palavra por palavra.'), task('Use pistas de contexto antes de procurar tradução.'), task('Because geralmente aponta explicação.')],
    guidedDiscovery: [task('Cold ajuda a entender jacket.'), task('Rainy ajuda a entender boots.'), task('But mostra contraste entre tired e okay.')],
    guidedBeforeQuiz: [task('Procure weather words.'), task('Procure clothes words.'), task('Procure feelings words.')],
    readingPurpose: 'Usar contexto para entender roupas, clima e sentimentos.',
    preReadingVocabulary: [vocab('jacket', 'jaqueta'), vocab('boots', 'botas'), vocab('sunny', 'ensolarado'), vocab('rainy', 'chuvoso'), vocab('tired', 'cansado'), vocab('comfortable', 'confortável')],
    readingStrategy: [task('Não pare na primeira palavra desconhecida.'), task('Procure pistas antes e depois.'), task('Use evidence para justificar.'), task('Observe and, but e because.')],
    mainText: `Today is cold and rainy. I wear a jacket and boots because I walk to school. My sister wears a coat, but she does not wear boots. She is cold, but she is happy. In the afternoon, the weather is sunny. I take off my jacket, and I wear a T-shirt. I am tired, but I am okay.`,
    firstReadTask: task('Qual é o assunto geral do texto?', 'Clima, roupas e sentimentos em um dia.'),
    secondReadTasks: [task('Por que a pessoa usa jacket and boots?', 'because it is cold and rainy / because I walk to school'), task('A irmã usa boots?', 'No, she does not.'), task('Como fica o clima à tarde?', 'sunny')],
    evidenceQuestions: [q('What is the weather in the morning?', 'cold and rainy', 'Today is cold and rainy.', '', ['cold and rainy','hot and sunny','snowy']), q('Áudio da aula — what does the person wear?', 'a jacket and boots', 'I wear a jacket and boots...', '', ['a jacket and boots','a dress','a coat only']), q('Does the sister wear boots?', 'No, she does not.', 'she does not wear boots.', '', ['No','Yes','The text does not say']), q('How is the sister feeling?', 'cold but happy', 'She is cold, but she is happy.', '', ['cold but happy','sad and tired','hot and angry']), q('What does the person wear in the afternoon?', 'a T-shirt', 'I wear a T-shirt.', '', ['a T-shirt','boots','a coat'])],
    contextVocabularyTasks: [task('Take off significa tirar, pelo contexto de jacket.'), task('Boots aparece com rainy.'), task('But conecta contraste.')],
    guidedSummary: task('Complete: In the morning, it is ___ and ___. The person wears a ___ and ___. In the afternoon, it is ___.', '', 'cold / rainy / jacket / boots / sunny'),
    connectedProduction: task('Escreva 4 frases sobre clima, roupa e sentimento usando and/but/because.'),
    selfAssessment: [task('Usei contexto para entender?'), task('Encontrei evidência?'), task('Reconheci and/but/because?')],
    lessonRecap: ['Contexto ajuda a entender vocabulário.', 'Clima explica roupa.', 'But mostra contraste.', 'Because mostra motivo.'],
    nextLessonBridge: 'No Listening, você vai ouvir uma conversa sobre clima e sentimentos.',
  }),

  createListeningLesson({
    ...common,
    id: 'A1-LISTENING-012-WEATHER',
    order: 12.1,
    title: 'Weather and feelings',
    objectives: ['Ouvir clima e sentimentos em conversa curta.', 'Identificar roupas citadas.', 'Reconhecer and, but e because na fala.', 'Praticar shadowing de frases úteis.'],
    teacherOpening: 'Nesta escuta, você vai ouvir pessoas falando do clima, do que estão vestindo e de como se sentem. O foco é identificar palavras-chave: cold, rainy, jacket, tired, happy, because.',
    whyItMatters: 'Clima e sentimentos são temas de conversa básica. Eles aparecem em small talk, mensagens, viagens e rotina diária.',
    realLifeUseCases: ['Conversar sobre clima.', 'Dizer como se sente.', 'Explicar roupa pelo clima.', 'Entender pergunta simples sobre o dia.', 'Fazer small talk A1.'],
    conceptExplanation: 'Ouça primeiro o clima. Depois, procure roupa e sentimento. Em seguida, confira o motivo com because. Na primeira escuta, não leia o transcript.',
    mentalModel: { title: 'weather → clothes → feeling', summary: 'Ouça nessa ordem.', steps: ['It is cold.', 'I wear a jacket.', 'I am tired, but happy.'] },
    stepByStep: [task('Primeira escuta: clima.'), task('Segunda escuta: roupa.'), task('Terceira etapa: sentimento.'), task('Transcript.'), task('Shadowing.')],
    portugueseContrast: [task('How do you feel? = como você se sente?'), task('What is the weather like? = como está o clima?'), task('I am cold = estou com frio; It is cold = está frio.')],
    guidedDiscovery: [task('It is cold fala do clima.'), task('I am cold fala da pessoa.'), task('Because indica motivo.')],
    guidedBeforeQuiz: [task('Primeira escuta: está frio ou quente?'), task('Segunda escuta: que roupa aparece?')],
    listeningPreparation: [task('Não leia transcript na primeira escuta.'), task('Prepare: cold, rainy, jacket, boots, tired, happy.'), task('Objetivo: clima + roupa + sentimento.')],
    keyWordsToHear: [vocab('cold','frio'), vocab('rainy','chuvoso'), vocab('jacket','jaqueta'), vocab('boots','botas'), vocab('tired','cansado'), vocab('happy','feliz')],
    audioScript: `A: What is the weather like today?
B: It is cold and rainy.
A: What do you wear?
B: I wear a jacket and boots because it is rainy.
A: How do you feel?
B: I am tired, but I am happy.
A: Why are you happy?
B: Because today is Friday.`,
    firstListenTasks: [task('Sem transcript: como está o clima?', 'cold and rainy'), task('Sem transcript: a conversa fala de comida, clima ou família?', 'clima')],
    secondListenTasks: [task('Que roupas a pessoa usa?', 'a jacket and boots'), task('Como a pessoa se sente?', 'tired but happy'), task('Por que ela está feliz?', 'because today is Friday')],
    transcript: `A: What is the weather like today?
B: It is cold and rainy.
A: What do you wear?
B: I wear a jacket and boots because it is rainy.
A: How do you feel?
B: I am tired, but I am happy.
A: Why are you happy?
B: Because today is Friday.`,
    vocabulary: [vocab('what is the weather like?', 'como está o clima?'), vocab('how do you feel?', 'como você se sente?'), vocab('why', 'por quê'), vocab('Friday', 'sexta-feira')],
    shadowing: [task('It is cold and rainy.'), task('I wear a jacket and boots.'), task('Because it is rainy.'), task('I am tired, but I am happy.'), task('Because today is Friday.')],
    dictationTasks: [task('Complete: It is cold and ___.', 'rainy'), task('Complete: I wear a jacket and ___.', 'boots'), task('Complete: I am tired, ___ I am happy.', 'but'), task('Complete: ___ today is Friday.', 'Because')],
    pronunciationChunks: [task('weather like today', 'Escute como bloco.'), task('cold and rainy', 'And pode soar reduzido.'), task('tired but happy', 'But contrasta.')],
    listeningComprehension: [q('What is the weather like?', 'cold and rainy', 'It is cold and rainy.', '', ['cold and rainy','hot and sunny','windy only']), q('Weather and feelings — What does the person wear?', 'a jacket and boots', 'I wear a jacket and boots...', '', ['a jacket and boots','a T-shirt','a dress']), q('Áudio da aula — Weather and feelings — how does the person feel?', 'tired but happy', 'I am tired, but I am happy.', '', ['tired but happy','sad and cold','angry'])],
    oralProduction: task('Diga oralmente como está o clima, o que você veste e como se sente.'),
    selfAssessment: [task('Consegui ouvir o clima?'), task('Consegui ouvir a roupa?'), task('Consegui ouvir o sentimento?')],
    lessonRecap: ['Weather and feelings são small talk.', 'I am cold e It is cold são diferentes.', 'Because explica motivo.', 'But cria contraste.'],
    nextLessonBridge: 'No Speaking, você vai falar do clima, da roupa e de como se sente.',
  }),

  createSpeakingLesson({
    ...common,
    id: 'A1-SPEAKING-016-WEATHER',
    order: 16.1,
    title: 'Talk about weather and feelings',
    objectives: ['Falar como está o clima.', 'Dizer o que veste por causa do clima.', 'Dizer como se sente.', 'Gravar fala curta com and, but e because.'],
    teacherOpening: 'Nesta aula, você vai fazer small talk simples: It is cold and rainy. I wear a jacket because it is cold. I am tired, but I am okay. Esse tipo de fala parece simples, mas é muito útil no dia a dia.',
    whyItMatters: 'Small talk sobre clima e sentimentos é uma das formas mais comuns de começar conversa. Também treina adjetivos, roupas, wear e conectores.',
    realLifeUseCases: ['Falar do clima do dia.', 'Responder como se sente.', 'Explicar roupa.', 'Criar áudio curto sobre o dia.', 'Fazer conversa básica com alguém.'],
    conceptExplanation: 'Monte sua fala em 3 blocos: weather, clothes, feelings. Exemplo: Today, it is cold and rainy. I wear a jacket because it is cold. I am tired, but I am happy.',
    mentalModel: { title: 'weather + clothes + feeling', summary: 'Três frases formam uma fala A1.' },
    stepByStep: [task('Diga o clima.'), task('Diga a roupa.'), task('Explique com because.'), task('Diga sentimento.'), task('Use but se houver contraste.')],
    portugueseContrast: [task('It is cold = está frio.'), task('I am cold = estou com frio.'), task('Para roupas, use wear.')],
    guidedDiscovery: [task('It is sunny. fala do clima.'), task('I wear a T-shirt. fala da roupa.'), task('I am happy. fala do sentimento.')],
    guidedBeforeQuiz: [task('Repita: It is cold and rainy.'), task('Repita: I wear a jacket because it is cold.'), task('Repita: I am tired, but I am okay.')],
    speakingSituation: 'Você vai gravar uma fala curta sobre o clima de hoje, sua roupa e seu sentimento.',
    modelPhrases: [phrase('It is hot and sunny.', 'Está quente e ensolarado.'), phrase('I wear a T-shirt.', 'Eu uso camiseta.'), phrase('I wear a jacket because it is cold.', 'Eu uso jaqueta porque está frio.'), phrase('I am tired, but I am okay.', 'Estou cansado, mas estou bem.')],
    pronunciationChunks: [task('It is', 'Pode soar it’s.'), task('I wear a', 'Fale como bloco.'), task('because it is', 'Treine devagar.')],
    repeatAfterMe: [task('It is cold and rainy.'), task('I wear boots because it is rainy.'), task('It is hot and sunny.'), task('I wear shorts because it is hot.'), task('I am tired, but I am happy.')],
    substitutionDrills: [task('cold → hot', 'It is hot.'), task('jacket → T-shirt', 'I wear a T-shirt.'), task('rainy → sunny', 'It is sunny.'), task('tired → happy', 'I am happy.')],
    guidedSpeaking: [task('Diga o clima de hoje.'), task('Diga uma roupa que você usa.'), task('Explique com because.'), task('Diga como você se sente.')],
    recordingTasks: [task('Grave 4 frases sobre clima/roupa/sentimento.'), task('Grave de novo usando because.'), task('Grave uma fala de 30 segundos.')],
    freeSpeaking: task('Fale por 30 segundos sobre o clima, sua roupa e seu sentimento hoje.'),
    feedbackChecklist: [task('Usei It is para clima?'), task('Usei I wear para roupa?'), task('Usei because para motivo?'), task('Usei but se havia contraste?')],
    selfAssessment: [task('Consigo falar do clima?'), task('Consigo falar roupa?'), task('Consigo falar sentimento?')],
    lessonRecap: ['Small talk pode ter 3 frases.', 'It is fala do clima.', 'I wear fala de roupa.', 'I am fala de sentimento.'],
    nextLessonBridge: 'Na escrita, você vai transformar essa fala em uma mensagem curta sobre seu dia.',
  }),

  createWritingLesson({
    ...common,
    id: 'A1-WRITING-014',
    order: 14,
    title: 'Connect sentences with and / but / because',
    objectives: ['Escrever frases conectadas com and, but e because.', 'Falar de clima, roupa e sentimento por escrito.', 'Revisar pontuação e clareza.', 'Produzir uma mensagem curta sobre o dia.'],
    teacherOpening: 'Agora você vai escrever frases curtas, mas mais naturais. Em vez de escrever só It is cold. I wear a jacket. Você pode escrever: It is cold, and I wear a jacket. I wear boots because it is rainy. I am tired, but I am okay.',
    whyItMatters: 'Conectores dão ritmo ao seu texto sem exigir gramática avançada. Eles fazem sua escrita parecer mais real, desde que você mantenha frases curtas e corretas.',
    realLifeUseCases: ['Escrever mensagem sobre o dia.', 'Descrever clima e roupa.', 'Dizer como se sente.', 'Criar texto curto para diário ou chat.', 'Revisar pontuação básica.'],
    conceptExplanation: 'Use and para adicionar, but para contraste e because para motivo. No writing A1, use uma ou duas conexões por texto. Depois revise se a frase ficou clara e completa.',
    mentalModel: { title: 'frase curta + conector + frase curta', summary: 'Conecte sem exagerar.', steps: ['It is cold and rainy.', 'I wear boots because it is rainy.', 'I am tired, but I am happy.'] },
    stepByStep: [task('Escreva frases simples primeiro.'), task('Escolha um conector.'), task('Una apenas duas ideias.'), task('Revise se because tem motivo completo.'), task('Leia em voz alta.')],
    portugueseContrast: [task('Evite escrever frases gigantes copiando o português.'), task('Because precisa de uma frase depois.'), task('But deve mostrar contraste real.')],
    guidedDiscovery: [task('Qual frase soma ideias?', 'It is cold and rainy.'), task('Qual frase explica motivo?', 'I wear boots because it is rainy.'), task('Qual frase contrasta?', 'I am tired, but I am happy.')],
    guidedBeforeQuiz: [task('Modelo: It is hot and sunny.'), task('Modelo: I wear a jacket because it is cold.'), task('Modelo: I am tired, but I am okay.')],
    writingPurpose: 'Escrever mensagem curta sobre clima, roupa e sentimento.',
    modelText: `Today, it is cold and rainy. I wear a jacket and boots because it is rainy. I am tired, but I am okay. I am happy because today is Friday.`,
    writingBlocks: [task('Weather', 'Today, it is cold and rainy.'), task('Clothes + reason', 'I wear a jacket and boots because it is rainy.'), task('Feeling + contrast', 'I am tired, but I am okay.'), task('Feeling + reason', 'I am happy because today is Friday.')],
    guidedSubstitution: [task('Troque cold and rainy por hot and sunny.', 'Today, it is hot and sunny.'), task('Troque jacket and boots por T-shirt and shorts.', 'I wear a T-shirt and shorts.'), task('Troque tired por sad.', 'I am sad, but I am okay.'), task('Troque Friday por Saturday.', 'I am happy because today is Saturday.')],
    grammarForWriting: [task('Use and para somar.'), task('Use but para contraste.'), task('Use because para motivo completo.'), task('Use ponto final para separar frases.'), task('Não repita o mesmo conector em excesso.')],
    checklist: [task('Meu texto fala do clima?'), task('Meu texto fala de roupa?'), task('Meu texto fala de sentimento?'), task('Usei and/but/because corretamente?'), task('Revisei pontuação?')],
    draftTask: task('Escreva 4 a 6 frases sobre o clima, sua roupa e como você se sente hoje.'),
    revisionTask: task('Revise e veja se cada because tem motivo completo.'),
    commonMistakes: [mistake('I wear jacket because cold.', 'I wear a jacket because it is cold.', 'Frase precisa de artigo e motivo completo.'), mistake('I am tired because.', 'I am tired because I work a lot.', 'Because precisa de complemento.'), mistake('It is rainy but cold.', 'It is rainy and cold.', 'Se só soma clima, use and.')],
    productionTasks: [task('Escreva uma mensagem sobre um dia frio.'), task('Escreva uma mensagem sobre um dia quente.'), task('Escreva 5 frases com because.')],
    selfAssessment: [task('Consigo escrever com and?'), task('Consigo escrever com but?'), task('Consigo escrever com because?')],
    lessonRecap: ['And, but e because melhoram escrita A1.', 'Clima, roupa e sentimento combinam bem com conectores.', 'Frases curtas são mais seguras.', 'Revisão evita because incompleto.'],
    nextLessonBridge: 'No próximo bloco, você vai fechar as situações práticas com verbos comuns, pedidos e instruções finais antes das revisões A1.',
  }),
]);

export const A1_DEEP_PRACTICAL_SITUATIONS_WEATHER_CLOTHES_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_WEATHER_CLOTHES.filter((lesson) => lesson.pillar === 'grammar')),
  vocabulary: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_WEATHER_CLOTHES.filter((lesson) => lesson.pillar === 'vocabulary')),
  reading: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_WEATHER_CLOTHES.filter((lesson) => lesson.pillar === 'reading')),
  listening: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_WEATHER_CLOTHES.filter((lesson) => lesson.pillar === 'listening')),
  speaking: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_WEATHER_CLOTHES.filter((lesson) => lesson.pillar === 'speaking')),
  writing: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS_WEATHER_CLOTHES.filter((lesson) => lesson.pillar === 'writing')),
});
