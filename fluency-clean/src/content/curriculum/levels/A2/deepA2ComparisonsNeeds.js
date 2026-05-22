import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'A2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['a2-4', 'comparisons-needs', 'choices', 'quantities', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }
function ex(text, translation, why = '', warning = '') { return { text, translation, why, warning }; }

export const A2_DEEP_COMPARISONS_NEEDS = Object.freeze([
  createGrammarLesson({
    ...common,
    id: 'A2-GRAMMAR-014',
    order: 14,
    title: 'Countable and uncountable nouns',
    objectives: ['Diferenciar substantivos contáveis e incontáveis.', 'Usar a/an com singular contável.', 'Usar plural com contáveis.', 'Usar some com quantidades não específicas.', 'Evitar erros como an information e many money.'],
    teacherOpening: 'Agora entramos no A2.4: escolhas, quantidades e comparações. Antes de comparar ou decidir, você precisa falar de quantidade corretamente. Countable nouns são coisas que você conta: one shirt, two shirts. Uncountable nouns são massa/ideia/material: water, money, information, food.',
    whyItMatters: 'Esse tema aparece em compras, comida, roupas, produtos, estudo e decisões práticas. Ele prepara some/any, much/many, a lot of e comparações.',
    realLifeUseCases: ['Comprar roupas e tamanhos.', 'Falar de comida e bebida.', 'Comparar produtos.', 'Pedir informações.', 'Falar de dinheiro, tempo e trabalho.'],
    conceptExplanation: 'Use countable para itens separados: a jacket, two jackets, an apple, three apples. Use uncountable para coisas sem unidade natural ou ideias: water, money, information, advice. Para quantidade indefinida, some funciona com plural contável e incontável: some shirts, some water.',
    mentalModel: { title: 'Dá para contar um por um?', summary: 'Se dá, é countable. Se não, trate como uncountable.', steps: ['one shirt / two shirts', 'some water', 'some money', 'a piece of information'] },
    stepByStep: [task('Pergunte se dá para contar unidades.'), task('Se for singular contável, use a/an.'), task('Se for plural contável, use -s/es.'), task('Se for incontável, não use a/an direto.'), task('Use some para quantidade indefinida.')],
    portugueseContrast: [task('Information é incontável em inglês: some information, não informations.'), task('Money é incontável: much money/a lot of money, não many money.'), task('Advice é incontável: some advice, não advices.'), task('News é singular/incontável no uso: some news.')],
    guidedDiscovery: [task('A shirt → countable singular.'), task('Two shirts → countable plural.'), task('Water → uncountable.'), task('Information → uncountable.')],
    guidedBeforeQuiz: [task('Escolha: a shirt ou shirt?', 'a shirt'), task('Escolha: some water ou a water?', 'some water'), task('Corrija: informations.', 'information / some information')],
    grammarGoal: 'Usar contáveis e incontáveis corretamente em compras, produtos e quantidades.',
    formationGuide: [task('Countable singular', 'I bought a jacket.'), task('Countable plural', 'I bought two jackets.'), task('Uncountable', 'I need some water.'), task('Uncountable idea', 'I need some information.'), task('Unit phrase', 'a bottle of water / a piece of advice')],
    whenToUse: [task('Quando falar de quantidade.'), task('Antes de some/any e much/many.'), task('Em compras, comida, dinheiro, informação e produtos.')],
    whenNotToUse: [task('Não use a/an com incontáveis diretos.'), task('Não coloque plural em information, money, advice.'), task('Não use many com money/water/information.')],
    grammarTable: [
      { pattern: 'countable singular', example: 'I need a T-shirt.', translation: 'Preciso de uma camiseta.' },
      { pattern: 'countable plural', example: 'I need two T-shirts.', translation: 'Preciso de duas camisetas.' },
      { pattern: 'uncountable', example: 'I need some water.', translation: 'Preciso de água.' },
      { pattern: 'unit', example: 'I need a bottle of water.', translation: 'Preciso de uma garrafa de água.' }
    ],
    teacherExamples: [
      { english: 'This store has many jackets.', translation: 'Esta loja tem muitas jaquetas.', why: 'Jackets é contável plural.' },
      { english: 'I don’t have much money today.', translation: 'Não tenho muito dinheiro hoje.', why: 'Money é incontável.' },
      { english: 'Can you give me some information about the size?', translation: 'Pode me dar algumas informações sobre o tamanho?', why: 'Information sem plural.' },
      { english: 'I bought a pair of shoes.', translation: 'Comprei um par de sapatos.', why: 'Pair ajuda a contar shoes.' }
    ],
    commonBrazilianMistakes: [mistake('an information', 'some information / a piece of information', 'Information é incontável.'), mistake('many money', 'much money / a lot of money', 'Money é incontável.'), mistake('two breads', 'two pieces of bread / two loaves of bread', 'Bread normalmente é incontável.'), mistake('a water', 'a bottle of water / some water', 'Water precisa de unidade se for contável.')],
    controlledPractice: [task('Complete: I need ___ jacket.', 'a'), task('Complete: I need ___ water.', 'some'), task('Complete: She has two ___.', 'shirts'), task('Complete: I need a piece of ___.', 'information/advice')],
    errorCorrectionPractice: [task('Corrija: I need an information.', 'I need some information.'), task('Corrija: I have many money.', 'I have a lot of money. / I have much money.'), task('Corrija: Can I have a water?', 'Can I have some water? / a bottle of water?')],
    transformationPractice: [task('Transforme com unidade: water', 'a bottle of water'), task('Transforme para plural: a jacket', 'two jackets'), task('Transforme: information', 'some information / a piece of information')],
    translationPractice: [task('Preciso de uma camiseta.', 'I need a T-shirt.'), task('Preciso de água.', 'I need some water.'), task('Preciso de algumas informações.', 'I need some information.')],
    productionTasks: [task('Liste 10 countable nouns e 10 uncountable nouns.'), task('Escreva 8 frases de compras usando a/an, plural e some.'), task('Crie 5 frases com unit phrases: bottle, piece, pair.')],
    finalChecklist: [task('Dá para contar unidade por unidade?'), task('Usei a/an só com singular contável?'), task('Evitei plural em information/money/advice?'), task('Usei unidade quando necessário?')],
    selfAssessment: [task('Consigo reconhecer countable/uncountable?'), task('Consigo corrigir many money?'), task('Consigo usar some information?')],
    lessonRecap: ['Countable dá para contar em unidades.', 'Uncountable não recebe a/an diretamente.', 'Information, money e advice são incontáveis.', 'Unit phrases ajudam a contar água, pão, informação e roupas em pares.'],
    nextLessonBridge: 'Agora você vai aplicar quantidade em roupas, tamanhos e escolhas de compra.',
  }),

  createVocabularyLesson({
    ...common,
    id: 'A2-VOCABULARY-013',
    order: 13,
    title: 'Clothes and sizes',
    objectives: ['Aprender vocabulário de roupas, tamanhos e ajuste.', 'Pedir tamanho, cor e modelo.', 'Falar se algo ficou grande, pequeno, justo ou confortável.', 'Preparar comparações de produtos e escolhas.'],
    teacherOpening: 'Clothes and sizes abre o vocabulário do A2.4. Você vai falar de shirt, T-shirt, jacket, jeans, shoes, size, small, medium, large, tight, loose, comfortable, fit, try on e exchange.',
    whyItMatters: 'Comprar roupas exige tamanho, cor, ajuste, preço e comparação. Esse vocabulário conecta compras reais com countable nouns, some/any, comparatives e decisões.',
    realLifeUseCases: ['Comprar roupa.', 'Pedir outro tamanho.', 'Comparar dois produtos.', 'Falar que ficou apertado ou largo.', 'Trocar roupa na loja.'],
    conceptExplanation: 'Roupas podem ser countable: a shirt, two jackets. Algumas vêm em pares ou plural natural: jeans, shoes, glasses. Use a pair of jeans/shoes. Para ajuste, use too small, too big, tight, loose, comfortable e it fits well.',
    mentalModel: { title: 'clothes = item + size + fit + choice', summary: 'Escolha roupa pelo item, tamanho, ajuste e preço.', steps: ['item', 'size', 'color', 'fit', 'price'] },
    stepByStep: [task('Nomeie a peça.'), task('Pergunte tamanho/cor.'), task('Peça para experimentar.'), task('Diga o ajuste.'), task('Decida comprar, trocar ou comparar.')],
    portugueseContrast: [task('Jeans é plural em inglês: These jeans are nice.'), task('A pair of shoes/jeans ajuda a contar.'), task('Tight = apertado; loose = largo/solto.'), task('Fit well = servir bem.')],
    guidedDiscovery: [task('A jacket é countable singular.'), task('Shoes normalmente aparecem plural.'), task('Too small indica problema.'), task('Comfortable indica escolha positiva.')],
    guidedBeforeQuiz: [task('Do you have size M?'), task('Can I try it on?'), task('It is too small.'), task('These jeans fit well.')],
    topicContext: 'Você vai comprar, experimentar e comparar roupas.',
    essentialWords: [vocab('shirt', 'camisa', 'I need a shirt.'), vocab('T-shirt', 'camiseta', 'This T-shirt is comfortable.'), vocab('jacket', 'jaqueta', 'I like this jacket.'), vocab('jeans', 'calça jeans', 'These jeans are too big.'), vocab('shoes', 'sapatos/tênis', 'These shoes are comfortable.'), vocab('dress', 'vestido', 'She bought a dress.'), vocab('size', 'tamanho', 'Do you have size M?'), vocab('small', 'pequeno/P', 'Small is too tight for me.'), vocab('medium', 'médio/M', 'I wear medium.'), vocab('large', 'grande/G', 'Do you have large?'), vocab('tight', 'apertado', 'The jacket is tight.'), vocab('loose', 'largo/solto', 'The shirt is loose.'), vocab('comfortable', 'confortável', 'These shoes are comfortable.'), vocab('fit', 'servir/caber', 'It fits well.'), vocab('try on', 'experimentar', 'Can I try it on?'), vocab('exchange', 'trocar', 'Can I exchange it?')],
    chunks: [{ chunk: 'Do you have size M?', translation: 'Tem tamanho M?', example: 'Do you have size M?' }, { chunk: 'Can I try it on?', translation: 'Posso experimentar?', example: 'Can I try it on?' }, { chunk: 'It fits well', translation: 'Serve bem', example: 'It fits well.' }, { chunk: 'It is too tight', translation: 'Está apertado demais', example: 'It is too tight.' }, { chunk: 'a pair of jeans', translation: 'uma calça jeans', example: 'I bought a pair of jeans.' }],
    pronunciationFocus: { title: 'Foco sonoro', tips: ['Clothes termina com som difícil; pratique devagar.', 'Comfortable costuma soar com menos sílabas em fala natural.', 'Size tem som de Z no final.'] },
    dangerousConfusions: [task('Cloth = tecido; clothes = roupas.'), task('Fit = servir/caber; suit = combinar/ficar bem em estilo.'), task('Large não é “largo”; é tamanho grande.'), task('Loose é largo/solto.')],
    collocations: [task('try on a jacket'), task('wear size M'), task('a pair of shoes'), task('fit well'), task('too tight'), task('too loose'), task('exchange for a larger size')],
    miniDialogues: [{ title: 'Trying clothes', lines: ['A: Do you have this jacket in size M?', 'B: Yes. Do you want to try it on?', 'A: Yes, please.', 'B: How does it fit?', 'A: It is a little tight.'], focus: 'Tamanho e ajuste.' }],
    examples: [ex('These jeans are cheaper than the black jeans.', 'Esta calça jeans é mais barata que a preta.', 'Comparação futura.'), ex('I need a pair of comfortable shoes.', 'Preciso de um par de sapatos confortáveis.', 'Pair of + plural item.'), ex('This jacket is too tight, so I am going to exchange it.', 'Esta jaqueta está apertada demais, então vou trocar.', 'Problema + plano.')],
    recognitionPractice: [task('Qual palavra significa apertado?', 'tight'), task('Qual expressão significa experimentar?', 'try on'), task('Como contar shoes?', 'a pair of shoes')],
    usagePractice: [task('Complete: Can I try it ___?', 'on'), task('Complete: It ___ well.', 'fits'), task('Complete: A pair ___ jeans.', 'of')],
    productionTasks: [task('Escreva 8 frases sobre roupas e tamanhos.'), task('Crie um diálogo pedindo tamanho e experimentando.'), task('Compare duas peças usando cheaper/more comfortable como preparação.')],
    spacedReview: [task('Revise tight/loose/fit/comfortable amanhã.'), task('Crie 3 frases com a pair of.')],
    selfAssessment: [task('Consigo pedir tamanho?'), task('Consigo explicar ajuste?'), task('Consigo usar a pair of jeans/shoes?')],
    lessonRecap: ['Clothes vocabulary combina item, size e fit.', 'Jeans/shoes costumam usar a pair of.', 'Tight/loose/comfortable explicam ajuste.', 'Try on e exchange são chunks essenciais.'],
    nextLessonBridge: 'Na Reading, você vai comparar dois produtos para decidir qual comprar.',
  }),

  createReadingLesson({
    ...common,
    id: 'A2-READING-012',
    order: 12,
    title: 'A comparison of two products',
    objectives: ['Ler comparação simples de dois produtos.', 'Identificar preço, tamanho, qualidade e recomendação.', 'Reconhecer comparações básicas em contexto.', 'Responder com evidência textual.'],
    teacherOpening: 'Nesta leitura, você vai comparar dois produtos. O objetivo é localizar dados: preço, tamanho, conforto, problema e recomendação. Ainda vamos aprofundar comparatives depois, mas aqui você começa a ler escolhas reais.',
    whyItMatters: 'Comparar produtos é uma situação real: qual roupa comprar, qual telefone escolher, qual opção é mais barata, confortável ou prática.',
    realLifeUseCases: ['Comparar roupas online.', 'Escolher produto por preço.', 'Ler avaliação curta.', 'Decidir entre duas opções.', 'Justificar escolha simples.'],
    conceptExplanation: 'Textos comparativos mostram opção A e opção B. Procure price, size, fit, quality, problem e final choice. Palavras como cheaper, more comfortable, better e too tight ajudam na decisão.',
    mentalModel: { title: 'comparison text = option A vs option B', summary: 'Leia critérios e escolha final.', steps: ['price', 'size', 'fit', 'quality', 'recommendation'] },
    stepByStep: [task('Identifique os dois produtos.'), task('Marque preço.'), task('Marque tamanho/ajuste.'), task('Marque ponto positivo e negativo.'), task('Ache recomendação final.'), task('Responda com evidência.')],
    portugueseContrast: [task('Cheaper = mais barato.'), task('More comfortable = mais confortável.'), task('Too tight = apertado demais.'), task('Better choice = melhor escolha.')],
    guidedDiscovery: [task('Product A tem preço menor.'), task('Product B pode ter melhor conforto.'), task('But mostra contraste.'), task('Because mostra motivo da escolha.')],
    guidedBeforeQuiz: [task('Procure price.'), task('Procure comfortable.'), task('Procure too tight.'), task('Procure final choice.')],
    readingPurpose: 'Entender comparação curta entre dois produtos.',
    preReadingVocabulary: [vocab('cheaper', 'mais barato'), vocab('comfortable', 'confortável'), vocab('quality', 'qualidade'), vocab('fit', 'servir/caber'), vocab('choice', 'escolha')],
    readingStrategy: [task('Crie uma tabela mental: product A / product B.'), task('Sublinhe critérios.'), task('Procure contraste com but.'), task('Use evidência exata.')],
    mainText: `I tried two jackets at the store. The blue jacket was cheaper, but it was too tight. It cost $35 and the size was medium. The black jacket was more expensive. It cost $50, but it was more comfortable and it fit well. I am going to buy the black jacket because it is the better choice for work.`,
    firstReadTask: task('Qual é o assunto geral?', 'Comparação de duas jaquetas.'),
    secondReadTasks: [task('Qual jaqueta era mais barata?', 'blue jacket'), task('Qual problema da jaqueta azul?', 'too tight'), task('Quanto custava a jaqueta preta?', '$50'), task('Por que vai comprar a preta?', 'more comfortable and fit well / better for work')],
    evidenceQuestions: [q('Which jacket was cheaper?', 'the blue jacket', 'The blue jacket was cheaper', '', ['blue jacket','black jacket','both']), q('What was the problem with the blue jacket?', 'it was too tight', 'it was too tight', '', ['too tight','too expensive','too loose']), q('How much did the black jacket cost?', '$50', 'It cost $50', '', ['$50','$35','$15']), q('Which jacket was more comfortable?', 'the black jacket', 'the black jacket... was more comfortable', '', ['black jacket','blue jacket','neither']), q('Why is the person going to buy the black jacket?', 'it is the better choice for work', 'because it is the better choice for work', '', ['better for work','cheaper','medium size'])],
    contextVocabularyTasks: [task('Fit well significa serviu bem.'), task('Better choice indica decisão final.'), task('More expensive contrasta preço maior.')],
    guidedSummary: task('Complete: The blue jacket was ___, but too ___. The black jacket was more ___ and fit ___.', '', 'cheaper / tight / comfortable / well'),
    connectedProduction: task('Escreva 4 frases comparando duas roupas ou produtos.'),
    selfAssessment: [task('Consigo identificar opção A/B?'), task('Consigo localizar preço e problema?'), task('Consigo justificar escolha com evidência?')],
    lessonRecap: ['Comparações usam critérios claros.', 'Cheaper/more comfortable ajudam decisão.', 'But mostra contraste.', 'Because explica escolha.'],
    nextLessonBridge: 'No Listening, você vai ouvir duas opções sendo comparadas.',
  }),

  createListeningLesson({
    ...common,
    id: 'A2-LISTENING-012',
    order: 12,
    title: 'Comparing two options',
    objectives: ['Ouvir diálogo comparando duas opções.', 'Identificar preço, tamanho, conforto e escolha final.', 'Reconhecer cheaper, more comfortable e better.', 'Praticar dictation e shadowing de comparação.'],
    teacherOpening: 'Nesta escuta, você vai ouvir duas pessoas comparando jaquetas. Primeiro descubra quais são as opções. Depois, preço, problema, conforto e escolha final.',
    whyItMatters: 'Comparações aparecem em compras, restaurante, trabalho e decisões do dia a dia. Você precisa entender argumentos simples.',
    realLifeUseCases: ['Escolher roupa na loja.', 'Comparar preços.', 'Perguntar opinião.', 'Decidir entre duas opções.', 'Justificar compra.'],
    conceptExplanation: 'Ouça palavras de comparação: cheaper, more expensive, more comfortable, better. Ouça também problemas: too tight, too big, doesn’t fit.',
    mentalModel: { title: 'listen for criteria', summary: 'Ouça opção, preço, problema e decisão.', steps: ['option A', 'option B', 'price', 'fit', 'choice'] },
    stepByStep: [task('Primeira escuta: quais opções?'), task('Segunda escuta: preço/ajuste.'), task('Terceira etapa: decisão final.'), task('Leia transcript.'), task('Faça dictation.'), task('Faça shadowing.')],
    portugueseContrast: [task('Which one? = qual deles?'), task('It fits better = serve melhor.'), task('I think = eu acho.')],
    guidedDiscovery: [task('Cheaper aponta preço menor.'), task('Too tight aponta problema.'), task('Better choice aponta decisão.')],
    guidedBeforeQuiz: [task('Primeira escuta: azul ou preta?'), task('Segunda escuta: qual é mais confortável?')],
    listeningPreparation: [task('Não leia transcript antes da primeira escuta.'), task('Prepare: cheaper, expensive, tight, comfortable, fit, better.'), task('Objetivo: critérios e escolha.')],
    keyWordsToHear: [vocab('cheaper','mais barato'), vocab('more expensive','mais caro'), vocab('comfortable','confortável'), vocab('too tight','apertado demais'), vocab('better choice','melhor escolha')],
    audioScript: `A: Which jacket do you like?
B: I like the blue one. It is cheaper.
A: But is it comfortable?
B: Not really. It is a little tight.
A: What about the black jacket?
B: It is more expensive, but it fits better.
A: Then the black jacket is the better choice.
B: I agree. I am going to buy it.`,
    firstListenTasks: [task('Sem transcript: estão comparando o quê?', 'jackets'), task('Sem transcript: a pessoa vai comprar a preta?', 'yes')],
    secondListenTasks: [task('Qual é mais barata?', 'blue jacket'), task('Qual problema da azul?', 'a little tight'), task('Qual serve melhor?', 'black jacket'), task('Qual é a escolha final?', 'black jacket')],
    transcript: `A: Which jacket do you like?
B: I like the blue one. It is cheaper.
A: But is it comfortable?
B: Not really. It is a little tight.
A: What about the black jacket?
B: It is more expensive, but it fits better.
A: Then the black jacket is the better choice.
B: I agree. I am going to buy it.`,
    vocabulary: [vocab('which one', 'qual deles'), vocab('not really', 'na verdade não/muito não'), vocab('what about', 'e quanto a'), vocab('I agree', 'eu concordo')],
    shadowing: [task('Which jacket do you like?'), task('It is cheaper.'), task('It is a little tight.'), task('It fits better.'), task('The black jacket is the better choice.')],
    dictationTasks: [task('Digite: It is cheaper.', 'It is cheaper.'), task('Digite: It is a little tight.', 'It is a little tight.'), task('Digite: It fits better.', 'It fits better.')],
    pronunciationChunks: [task('which jacket', 'Pergunta de escolha.'), task('a little tight', 'Problema suave.'), task('better choice', 'Decisão final.')],
    listeningComprehension: [q('Which jacket is cheaper?', 'the blue one', 'It is cheaper.', '', ['blue','black','both']), q('Áudio da aula — Comparing two options — what is the problem with the blue jacket?', 'it is a little tight', 'It is a little tight.', '', ['tight','dirty','broken']), q('Which jacket fits better?', 'the black jacket', 'it fits better', '', ['black','blue','neither']), q('Which jacket is the final choice?', 'the black jacket', 'the black jacket is the better choice', '', ['black','blue','no jacket'])],
    oralProduction: task('Pratique comparar duas roupas usando cheaper, more comfortable e better choice.'),
    selfAssessment: [task('Consegui ouvir comparação?'), task('Consegui ouvir problema?'), task('Consigo repetir frases de escolha?')],
    lessonRecap: ['Comparing options exige ouvir critérios.', 'Cheaper e more expensive comparam preço.', 'Fits better compara ajuste.', 'Better choice mostra decisão.'],
    nextLessonBridge: 'No Speaking, você vai comparar duas escolhas.',
  }),

  createSpeakingLesson({
    ...common,
    id: 'A2-SPEAKING-013',
    order: 13,
    title: 'Compare two choices',
    objectives: ['Comparar duas escolhas simples.', 'Falar de preço, tamanho, conforto e utilidade.', 'Justificar escolha com because.', 'Gravar fala curta comparando dois produtos.'],
    teacherOpening: 'Agora você vai falar comparando duas escolhas. Use frases simples: The blue jacket is cheaper, but the black jacket is more comfortable. I am going to choose the black jacket because it fits better.',
    whyItMatters: 'Comparar escolhas é habilidade prática: roupa, produto, comida, plano, telefone, curso. Você precisa explicar por que escolheu uma opção.',
    realLifeUseCases: ['Comparar roupas.', 'Escolher produto.', 'Dar opinião de compra.', 'Explicar preferência.', 'Decidir entre preço e qualidade.'],
    conceptExplanation: 'Organize sua fala em 4 partes: option A, option B, comparison, decision. Use but para contraste e because para motivo.',
    mentalModel: { title: 'compare speaking = A vs B + decision', summary: 'Diga diferenças e escolha final.', steps: ['Option A is...', 'Option B is...', 'but...', 'I choose... because...'] },
    stepByStep: [task('Nomeie as duas opções.'), task('Diga critério 1: preço.'), task('Diga critério 2: conforto/tamanho.'), task('Use but para contraste.'), task('Escolha e explique com because.'), task('Grave versão final.')],
    portugueseContrast: [task('I choose é eu escolho.'), task('Because explica razão.'), task('Better choice é escolha melhor.'), task('Fits better = serve melhor.')],
    guidedDiscovery: [task('Which one do you prefer? pede escolha.'), task('Why? pede justificativa.'), task('But mostra diferença importante.')],
    guidedBeforeQuiz: [task('Repita: The blue jacket is cheaper.'), task('Repita: The black jacket is more comfortable.'), task('Repita: I choose the black jacket because it fits better.')],
    speakingSituation: 'Você está comparando dois produtos antes de comprar.',
    modelPhrases: [phrase('The blue jacket is cheaper.', 'A jaqueta azul é mais barata.'), phrase('The black jacket is more comfortable.', 'A jaqueta preta é mais confortável.'), phrase('It fits better.', 'Ela serve melhor.'), phrase('I choose this one because...', 'Eu escolho esta porque...'), phrase('It is the better choice for work.', 'É a melhor escolha para trabalho.')],
    pronunciationChunks: [task('cheaper than', 'Comparação curta.'), task('more comfortable', 'Mais + adjetivo longo.'), task('better choice', 'Escolha final.')],
    repeatAfterMe: [task('This one is cheaper.'), task('That one is more expensive.'), task('This jacket fits better.'), task('I prefer the black one.'), task('I choose it because it is more comfortable.')],
    substitutionDrills: [task('jacket → shoes', 'These shoes are cheaper.'), task('comfortable → useful', 'This one is more useful.'), task('work → school', 'It is the better choice for school.')],
    guidedSpeaking: [task('Compare duas roupas.'), task('Diga qual é mais barata.'), task('Diga qual é mais confortável.'), task('Escolha uma e explique com because.')],
    recordingTasks: [task('Grave 5 frases de comparação.'), task('Grave uma comparação de 30 segundos.'), task('Grave versão final de 60 segundos com escolha e motivo.')],
    freeSpeaking: task('Compare dois produtos que você compraria e explique sua escolha em até 60 segundos.'),
    feedbackChecklist: [task('Nomeei as duas opções?'), task('Usei pelo menos dois critérios?'), task('Usei but/because?'), task('Fiz escolha final?')],
    selfAssessment: [task('Consigo comparar duas opções?'), task('Consigo justificar escolha?'), task('Consigo falar por 60 segundos?')],
    lessonRecap: ['Comparar escolhas exige critérios.', 'But mostra contraste.', 'Because justifica decisão.', 'Better choice fecha a escolha.'],
    nextLessonBridge: 'Na Writing, você vai escrever uma comparação de dois produtos.',
  }),

  createWritingLesson({
    ...common,
    id: 'A2-WRITING-013',
    order: 13,
    title: 'Compare two products',
    objectives: ['Escrever comparação curta de dois produtos.', 'Incluir preço, tamanho, qualidade e decisão.', 'Usar but, because e going to para escolha.', 'Revisar clareza e organização.'],
    teacherOpening: 'Agora você vai escrever uma comparação simples. O texto deve dizer quais são as opções, quais critérios importam e qual você vai escolher. Exemplo: The blue jacket is cheaper, but the black jacket is more comfortable. I am going to buy the black jacket because it fits better.',
    whyItMatters: 'Escrever comparações ajuda em compras, avaliações e decisões. É uma forma prática de unir vocabulário de roupas, countable nouns e escolhas.',
    realLifeUseCases: ['Comparar produtos online.', 'Escrever recomendação curta.', 'Justificar compra.', 'Responder qual opção prefere.', 'Organizar decisão por critérios.'],
    conceptExplanation: 'Uma comparação A2 tem: option A, option B, criteria, contrast, decision. Use but para contraste e because para razão. Use going to para decisão futura.',
    mentalModel: { title: 'comparison writing = A + B + criteria + choice', summary: 'Compare e decida.', steps: ['Option A', 'Option B', 'price/fit/quality', 'but', 'I am going to choose... because...'] },
    stepByStep: [task('Apresente os dois produtos.'), task('Compare preço.'), task('Compare ajuste/qualidade.'), task('Use but para contraste.'), task('Diga sua escolha final.'), task('Explique com because.'), task('Revise frases curtas.')],
    portugueseContrast: [task('Use this one/that one para evitar repetir.'), task('Use because para justificar.'), task('Use but para contraste.'), task('Não escreva frase gigante sem pontuação.')],
    guidedDiscovery: [task('The blue jacket was cheaper é critério de preço.'), task('The black jacket fit better é critério de ajuste.'), task('I am going to buy... é decisão.')],
    guidedBeforeQuiz: [task('Modelo: The blue jacket is cheaper.'), task('Modelo: The black jacket is more comfortable.'), task('Modelo: I am going to buy the black jacket because it fits better.')],
    writingPurpose: 'Escrever comparação clara entre dois produtos.',
    modelText: `I tried two jackets at the store. The blue jacket was cheaper, but it was too tight. The black jacket was more expensive, but it was more comfortable and it fit well. I am going to buy the black jacket because it is the better choice for work.`,
    writingBlocks: [task('Opening', 'I tried two jackets at the store.'), task('Option A', 'The blue jacket was cheaper.'), task('Problem', 'It was too tight.'), task('Option B', 'The black jacket was more comfortable.'), task('Decision', 'I am going to buy the black jacket.'), task('Reason', 'because it fits better.')],
    guidedSubstitution: [task('Troque jackets por shoes.'), task('Troque cheaper por more expensive.'), task('Troque too tight por too big.'), task('Troque work por school/travel.')],
    grammarForWriting: [task('Use countable nouns: a jacket / two jackets.'), task('Use but para contraste.'), task('Use because para motivo.'), task('Use going to para escolha futura.'), task('Use frases curtas.')],
    checklist: [task('Incluí duas opções?'), task('Comparei pelo menos dois critérios?'), task('Usei but?'), task('Usei because?'), task('Fiz escolha final?'), task('Revisei pontuação?')],
    draftTask: task('Escreva uma comparação de 5 a 7 frases entre dois produtos.'),
    revisionTask: task('Revise opções, critérios, contraste, decisão e motivo.'),
    commonMistakes: [mistake('The black jacket is more better.', 'The black jacket is better.', 'Better já significa mais bom/melhor.'), mistake('I choose because is comfortable.', 'I choose it because it is comfortable.', 'Precisa de sujeito it.'), mistake('The jeans is nice.', 'The jeans are nice. / This pair of jeans is nice.', 'Jeans é plural; pair é singular.')],
    productionTasks: [task('Escreva comparação de duas roupas.'), task('Escreva comparação de dois telefones.'), task('Reescreva com preço, conforto e escolha final.')],
    selfAssessment: [task('Consigo escrever comparação simples?'), task('Consigo justificar escolha?'), task('Consigo revisar erros comuns?')],
    lessonRecap: ['Comparison writing precisa de duas opções e critérios.', 'But e because organizam contraste e motivo.', 'Going to mostra decisão futura.', 'Countable nouns ajudam clareza em produtos.'],
    nextLessonBridge: 'Na próxima parte do A2.4, você vai aprofundar some/any, food quantities e much/many.',
  }),
]);

export const A2_DEEP_COMPARISONS_NEEDS_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(A2_DEEP_COMPARISONS_NEEDS.filter((lesson) => lesson.pillar === 'grammar')),
  vocabulary: Object.freeze(A2_DEEP_COMPARISONS_NEEDS.filter((lesson) => lesson.pillar === 'vocabulary')),
  reading: Object.freeze(A2_DEEP_COMPARISONS_NEEDS.filter((lesson) => lesson.pillar === 'reading')),
  listening: Object.freeze(A2_DEEP_COMPARISONS_NEEDS.filter((lesson) => lesson.pillar === 'listening')),
  speaking: Object.freeze(A2_DEEP_COMPARISONS_NEEDS.filter((lesson) => lesson.pillar === 'speaking')),
  writing: Object.freeze(A2_DEEP_COMPARISONS_NEEDS.filter((lesson) => lesson.pillar === 'writing')),
});
