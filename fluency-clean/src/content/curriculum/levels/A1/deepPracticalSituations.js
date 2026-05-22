import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'A1';
const status = 'ready';
const unit = 'A1.4 Practical situations';

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }
function ex(text, translation, why = '', warning = '') { return { text, translation, why, warning }; }
function dialogue(title, lines, focus = '') { return { title, lines, focus }; }

const common = {
  level,
  status,
  estimatedMinutes: 55,
  tags: ['a1-4', 'practical-situations', 'food-ordering', 'deep-approved-target'],
};

export const A1_DEEP_PRACTICAL_SITUATIONS = Object.freeze([
  createGrammarLesson({
    ...common,
    id: 'A1-GRAMMAR-021',
    order: 21,
    title: 'Can / can’t',
    objectives: ['Usar can para habilidade, possibilidade e pedidos simples.', 'Formar frases afirmativas, negativas e perguntas com can.', 'Usar can em situações práticas como pedir comida, ajuda e informação.', 'Evitar erros como can to, cans e do can.'],
    teacherOpening: 'No pacote A1.4, você começa a usar inglês para situações reais. Can é uma das estruturas mais úteis para isso. Com can, você consegue dizer que sabe fazer algo, perguntar se pode fazer algo e pedir ajuda de forma simples: I can help. Can I have water? Can you repeat, please? A regra é simples, mas brasileiros erram muito tentando colocar to depois de can ou usando cans com he/she/it.',
    whyItMatters: 'Can aparece o tempo todo em cafeterias, lojas, aulas, viagens e pedidos simples. Se você domina can, você consegue pedir, oferecer ajuda, falar de habilidade e resolver situações práticas antes mesmo de conhecer tempos verbais mais avançados.',
    realLifeUseCases: ['Pedir algo em um café: Can I have a coffee?', 'Pedir repetição: Can you repeat, please?', 'Dizer habilidade: I can speak Portuguese.', 'Dizer impossibilidade: I can’t go now.', 'Oferecer ajuda: I can help you.'],
    conceptExplanation: 'Can funciona como modal. Depois de can, use sempre o verbo base: can speak, can help, can go, can have. Não use to depois de can. Não coloque -s em can com he/she/it. Para negativa, use can’t. Para pergunta, coloque can antes do sujeito: Can I...? Can you...? Can she...? No A1.4, o foco é usar can para situações práticas, especialmente pedidos educados.',
    mentalModel: { title: 'can + verbo base', summary: 'Can não muda por pessoa e não usa to.', steps: ['I can help.', 'She can speak English.', 'I can’t go now.', 'Can you repeat, please?'] },
    stepByStep: [task('Escolha o sujeito: I, you, he, she, we, they.'), task('Use can sem mudar a forma.'), task('Depois de can, use verbo base.', 'can help, can speak, can have'), task('Para negar, use can’t.'), task('Para perguntar, coloque can no começo.'), task('Para pedidos, use please no final para soar educado.')],
    portugueseContrast: [task('Português: “eu posso ter um café?” Inglês natural: “Can I have a coffee?”'), task('Não diga “I can to speak”.', 'Depois de can não entra to.'), task('Não diga “she cans”.', 'Can não recebe -s.'), task('Can I...? pode ser pedido educado, não só habilidade.')],
    guidedDiscovery: [task('Em “Can I have a coffee?”, can abre um pedido.'), task('Em “She can speak English”, speak está na forma base.'), task('Em “I can’t go now”, can’t mostra impossibilidade.')],
    guidedBeforeQuiz: [task('Complete: I ___ help you.', 'can'), task('Corrija: She cans speak English.', 'She can speak English.'), task('Complete o pedido: Can I ___ a coffee, please?', 'have'), task('Transforme em pergunta: You can repeat.', 'Can you repeat?')],
    grammarGoal: 'Usar can/can’t para habilidade, possibilidade e pedidos A1.',
    formationGuide: [task('Affirmative: subject + can + verb base', 'I can help.'), task('Negative: subject + can’t + verb base', 'I can’t go now.'), task('Question: Can + subject + verb base?', 'Can you repeat?'), task('Request: Can I have + item, please?', 'Can I have water, please?')],
    whenToUse: [task('Para falar habilidade.'), task('Para dizer possibilidade/impossibilidade simples.'), task('Para pedir algo em café/loja/aula.'), task('Para pedir ajuda ou repetição.')],
    whenNotToUse: [task('Não use can para todos os futuros.'), task('Não use can to.'), task('Não coloque -s em can.'), task('Não misture do/does em perguntas com can no A1.')],
    grammarTable: [
      { pattern: 'I can + verb', example: 'I can speak English.', translation: 'Eu consigo falar inglês.' },
      { pattern: 'She can + verb', example: 'She can help you.', translation: 'Ela pode ajudar você.' },
      { pattern: 'I can’t + verb', example: 'I can’t go now.', translation: 'Eu não posso ir agora.' },
      { pattern: 'Can I + verb?', example: 'Can I have a coffee?', translation: 'Posso querer/pegar um café?' }
    ],
    teacherExamples: [
      { english: 'Can I have a coffee, please?', translation: 'Pode me ver um café, por favor?', why: 'Pedido natural em café.' },
      { english: 'Can you repeat, please?', translation: 'Você pode repetir, por favor?', why: 'Pedido útil em aula.' },
      { english: 'I can speak Portuguese.', translation: 'Eu sei falar português.', why: 'Can para habilidade.' },
      { english: 'I can’t eat this now.', translation: 'Eu não posso comer isso agora.', why: 'Can’t para impossibilidade.' }
    ],
    commonBrazilianMistakes: [mistake('I can to speak English.', 'I can speak English.', 'Depois de can, use verbo base sem to.'), mistake('She cans help me.', 'She can help me.', 'Can não muda com he/she/it.'), mistake('Do you can repeat?', 'Can you repeat?', 'Perguntas com can começam com can.'), mistake('Can I a coffee?', 'Can I have a coffee?', 'Pedido precisa de verbo: have.')],
    controlledPractice: [task('Complete: I ___ speak Portuguese.', 'can'), task('Complete: She can ___ you.', 'help'), task('Complete: Can I ___ water?', 'have'), task('Complete: I ___ go now.', 'can’t')],
    errorCorrectionPractice: [task('Corrija: I can to help.', 'I can help.'), task('Corrija: He cans go.', 'He can go.'), task('Corrija: Do you can repeat?', 'Can you repeat?'), task('Corrija: Can I coffee?', 'Can I have a coffee?')],
    transformationPractice: [task('Transforme em pergunta: You can repeat.', 'Can you repeat?'), task('Transforme em negativa: I can go now.', 'I can’t go now.'), task('Monte: can / I / have / water / please', 'Can I have water, please?')],
    translationPractice: [task('Você pode repetir, por favor?', 'Can you repeat, please?'), task('Eu sei falar português.', 'I can speak Portuguese.'), task('Posso pedir um café?', 'Can I have a coffee?')],
    productionTasks: [task('Escreva 5 pedidos com Can I have...?', 'Use comida ou bebida.'), task('Escreva 5 perguntas com Can you...?', 'repeat, help, spell, open, close'), task('Escreva 4 frases sobre o que você consegue ou não consegue fazer.')],
    finalChecklist: [task('Usei can + verbo base?'), task('Evitei can to?'), task('Evitei she cans/he cans?'), task('Usei please em pedidos?')],
    selfAssessment: [task('Consigo pedir algo com Can I have...?'), task('Consigo pedir ajuda com Can you...?'), task('Consigo corrigir can to e cans?')],
    lessonRecap: ['Can é usado para habilidade, possibilidade e pedidos.', 'Depois de can, use verbo base.', 'Can não muda por pessoa.', 'Perguntas começam com Can.', 'Can I have...? é um pedido muito útil.'],
    nextLessonBridge: 'Na próxima aula de vocabulário prático, você vai usar comida e bebida para fazer pedidos reais em café ou lanchonete.',
  }),

  createVocabularyLesson({
    ...common,
    id: 'A1-VOCABULARY-013',
    order: 13,
    title: 'Food and drinks',
    objectives: ['Aprender vocabulário essencial de comida e bebida.', 'Usar chunks naturais para pedir em café/lanchonete.', 'Diferenciar meal, food, drink, breakfast, lunch e dinner.', 'Produzir pedidos simples com Can I have...?'],
    teacherOpening: 'Food and drinks é um tema de sobrevivência. Você não precisa saber todos os alimentos do mundo no A1; precisa saber pedir algo simples, entender opções comuns e montar frases educadas. A meta é sair de palavras soltas como coffee, water e sandwich e usar chunks: Can I have a coffee, please? I would like water. A sandwich, please.',
    whyItMatters: 'Comida e bebida aparecem em viagens, aplicativos, restaurantes, cafés, hotéis e conversas diárias. Esse vocabulário também treina plural, artigos, can e pedidos. O erro comum é traduzir “eu quero” como I want em qualquer contexto; no A1, Can I have...? costuma soar mais educado.',
    realLifeUseCases: ['Pedir café ou água.', 'Ler um menu simples.', 'Dizer que gosta/não gosta de algo.', 'Entender pedido em listening.', 'Escrever uma mensagem simples pedindo comida.'],
    conceptExplanation: 'Food é comida em geral. Drink é bebida. Meal é refeição. Breakfast é café da manhã, lunch é almoço e dinner é jantar. Para pedir, use blocos prontos: Can I have a...? A coffee, please. I would like water. Para itens contáveis, use a/an ou plural: a sandwich, an apple, two bananas. Para líquidos, muitas vezes use water, coffee, juice sem a/an, ou a bottle/glass/cup of water.',
    mentalModel: { title: 'Item + pedido educado', summary: 'Aprenda a palavra dentro de um pedido.', steps: ['coffee → Can I have a coffee, please?', 'water → Can I have water, please?', 'sandwich → A sandwich, please.', 'apple → An apple, please.'] },
    stepByStep: [task('Separe food e drinks.'), task('Aprenda itens comuns primeiro.'), task('Use a/an para itens contáveis singulares.'), task('Use Can I have...? para pedido educado.'), task('Adicione please.'), task('Responda thank you ao receber.')],
    portugueseContrast: [task('“Eu quero” pode soar direto demais se traduzido sempre como I want.'), task('Use Can I have...? como pedido educado.'), task('Coffee pode ser bebida geral; a coffee pode significar uma xícara/um café pedido.'), task('Dinner não é sempre “jantar chique”; é refeição da noite.')],
    guidedDiscovery: [task('Qual palavra é bebida: water ou sandwich?', 'water'), task('Qual pedido é mais educado: I want coffee ou Can I have a coffee, please?', 'Can I have a coffee, please?'), task('Por que an apple usa an?', 'Apple começa com som de vogal.')],
    guidedBeforeQuiz: [task('A coffee, please.'), task('Can I have water, please?'), task('I would like a sandwich.'), task('An apple, please.')],
    topicContext: 'Você está em um café/lanchonete e precisa pedir comida ou bebida de forma simples e educada.',
    essentialWords: [vocab('water', 'água', 'Can I have water, please?'), vocab('coffee', 'café', 'A coffee, please.'), vocab('tea', 'chá', 'I like tea.'), vocab('juice', 'suco', 'Orange juice, please.'), vocab('milk', 'leite', 'I drink milk.'), vocab('bread', 'pão', 'I eat bread.'), vocab('sandwich', 'sanduíche', 'A sandwich, please.'), vocab('rice', 'arroz', 'I eat rice.'), vocab('beans', 'feijão', 'I eat rice and beans.'), vocab('chicken', 'frango', 'Chicken, please.'), vocab('meat', 'carne', 'I eat meat.'), vocab('fish', 'peixe', 'I like fish.'), vocab('egg', 'ovo', 'An egg, please.'), vocab('apple', 'maçã', 'An apple, please.'), vocab('banana', 'banana', 'Two bananas, please.'), vocab('salad', 'salada', 'A salad, please.'), vocab('breakfast', 'café da manhã', 'I have breakfast at 7.'), vocab('lunch', 'almoço', 'I have lunch at noon.'), vocab('dinner', 'jantar', 'I have dinner at night.'), vocab('menu', 'cardápio', 'Can I see the menu?')],
    chunks: [{ chunk: 'Can I have a coffee, please?', translation: 'Pode me ver um café, por favor?', example: 'Can I have a coffee, please?' }, { chunk: 'A sandwich, please.', translation: 'Um sanduíche, por favor.', example: 'A sandwich, please.' }, { chunk: 'I would like water.', translation: 'Eu gostaria de água.', example: 'I would like water.' }, { chunk: 'Can I see the menu?', translation: 'Posso ver o cardápio?', example: 'Can I see the menu?' }, { chunk: 'For here or to go?', translation: 'Para comer aqui ou para viagem?', example: 'For here, please.' }],
    pronunciationFocus: { title: 'Foco sonoro', tips: ['Water pode soar como “uó-der” ou “wó-ter” dependendo do sotaque.', 'Coffee tem som de /k/ forte no começo.', 'Sandwich muitas vezes soa “san-witch”.'] },
    dangerousConfusions: [task('Food é comida geral; meal é refeição.'), task('Drink pode ser bebida ou beber, dependendo do contexto.'), task('Lunch é almoço; dinner é refeição da noite.'), task('Can I have...? é mais educado que I want... em pedidos simples.')],
    collocations: [task('drink water'), task('have breakfast'), task('have lunch'), task('have dinner'), task('a cup of coffee'), task('orange juice'), task('a sandwich'), task('the menu')],
    miniDialogues: [dialogue('At a café', ['Clerk: Hello. What would you like?', 'Student: Can I have a coffee, please?', 'Clerk: Sure. Anything else?', 'Student: A sandwich, please.', 'Clerk: For here or to go?', 'Student: For here, please.'], 'Pedido simples em café.')],
    examples: [ex('Can I have a coffee, please?', 'Pode me ver um café, por favor?', 'Pedido educado.'), ex('A sandwich, please.', 'Um sanduíche, por favor.', 'Pedido curto e natural.'), ex('I drink water every day.', 'Eu bebo água todos os dias.', 'Drink como verbo.'), ex('I have lunch at noon.', 'Eu almoço ao meio-dia.', 'Have lunch é bloco.'), ex('Can I see the menu?', 'Posso ver o cardápio?', 'Situação real.')],
    recognitionPractice: [q('Qual é uma bebida comum em A1?', 'water', '', 'Water é bebida essencial no vocabulário de Food and drinks.', ['water', 'sandwich', 'bread']), task('Escolha a comida: coffee / tea / sandwich', 'sandwich'), task('Qual é mais educado para pedir?', 'Can I have a coffee, please?'), task('Breakfast significa...', 'café da manhã'), task('Dinner significa...', 'jantar/refeição da noite')],
    usagePractice: [task('Complete: Can I ___ a coffee?', 'have'), task('Complete: A sandwich, ___.', 'please'), task('Complete: Can I see the ___?', 'menu'), task('Complete: I have ___ at noon.', 'lunch'), task('Complete: I drink ___ every day.', 'water')],
    productionTasks: [task('Crie 5 pedidos usando Can I have...?'), task('Monte um mini diálogo em café com 6 linhas.'), task('Liste 5 foods e 5 drinks que você consome.')],
    spacedReview: [task('Revise Can I have...? amanhã.'), task('Revise breakfast/lunch/dinner em três frases.')],
    selfAssessment: [task('Consigo pedir comida ou bebida?'), task('Consigo diferenciar food, drink e meal?'), task('Consigo usar please em pedidos?')],
    lessonRecap: ['Food and drinks deve ser aprendido em pedidos.', 'Can I have...? é pedido educado.', 'Breakfast, lunch e dinner são refeições.', 'A/an aparecem com itens contáveis.', 'Menu é palavra essencial em restaurante/café.'],
    nextLessonBridge: 'Na Reading A1.4, você vai ler um menu simples e responder perguntas com evidência.',
  }),

  createReadingLesson({
    ...common,
    id: 'A1-READING-008',
    order: 8,
    title: 'A café menu',
    objectives: ['Ler um menu simples de café.', 'Identificar comidas, bebidas e preços.', 'Responder perguntas com evidência textual.', 'Usar vocabulário de food and drinks em contexto real.'],
    teacherOpening: 'Ler um menu em inglês é uma habilidade prática. Você não precisa entender textos longos; precisa localizar categorias, itens e preços. Nesta aula, você vai treinar leitura funcional: procurar informação específica e usar evidência do próprio menu.',
    whyItMatters: 'Menus aparecem em viagens, aplicativos, cafés e restaurantes. Essa leitura ensina scanning: procurar exatamente o que você precisa, sem traduzir tudo. É uma estratégia essencial para o A1.',
    realLifeUseCases: ['Ler menu em café.', 'Escolher bebida.', 'Identificar preço.', 'Ver se há comida simples.', 'Fazer pedido baseado no menu.'],
    conceptExplanation: 'Um menu normalmente tem categorias: drinks, food, breakfast, snacks. Primeiro veja os títulos. Depois procure item e preço. Para responder, use a linha do menu como evidência: Coffee — $3. Sandwich — $5.',
    mentalModel: { title: 'Categoria → item → preço', summary: 'Menu não se lê como história; você escaneia informação.', steps: ['Find the category.', 'Find the item.', 'Read the price.', 'Use the item in a request.'] },
    stepByStep: [task('Leia os títulos do menu.'), task('Separe drinks e food.'), task('Procure preços.'), task('Responda com evidência.'), task('Crie um pedido usando o item escolhido.')],
    portugueseContrast: [task('Menu pode ser cardápio; não é “menu do celular” neste contexto.'), task('Snack é lanche pequeno.'), task('For here/to go aparece depois do pedido.')],
    guidedDiscovery: [task('Em menus, $3 normalmente é preço.'), task('Drinks lista bebidas.'), task('Food lista comidas.')],
    guidedBeforeQuiz: [task('Procure primeiro drinks.'), task('Depois procure food.'), task('Depois responda usando item + preço.')],
    readingPurpose: 'Ler menu simples e localizar itens/preços.',
    preReadingVocabulary: [vocab('menu', 'cardápio'), vocab('drinks', 'bebidas'), vocab('food', 'comida'), vocab('price', 'preço'), vocab('snack', 'lanche pequeno')],
    readingStrategy: [task('Use scanning: procure palavras específicas.'), task('Não traduza cada item se a pergunta pedir só preço.'), task('Use a linha do menu como evidência.')],
    mainText: `Sunny Café Menu

Drinks
Water — $1
Coffee — $3
Tea — $2
Orange juice — $4

Food
Bread and butter — $2
Egg sandwich — $5
Chicken sandwich — $6
Fruit salad — $4

Breakfast combo
Coffee + egg sandwich — $7
Tea + bread and butter — $4

Please order at the counter. For here or to go?`,
    firstReadTask: task('Qual é o tipo de texto?', 'Menu de café.', 'café menu'),
    secondReadTasks: [task('Encontre uma bebida de $3.', 'Coffee — $3.', 'Coffee'), task('Encontre uma comida de $5.', 'Egg sandwich — $5.', 'Egg sandwich'), task('Encontre um combo com tea.', 'Tea + bread and butter — $4.', 'Tea + bread and butter')],
    evidenceQuestions: [q('How much is water?', '$1', 'Water — $1', 'A linha mostra item e preço.', ['$1','$2','$3']), q('How much is coffee?', '$3', 'Coffee — $3', 'Coffee está na seção Drinks.', ['$3','$4','$7']), q('What sandwich costs $5?', 'Egg sandwich', 'Egg sandwich — $5', 'A evidência dá o item.', ['Egg sandwich','Chicken sandwich','Fruit salad']), q('What is in the breakfast combo for $7?', 'Coffee + egg sandwich', 'Coffee + egg sandwich — $7', 'O combo de $7 aparece na seção Breakfast combo.', ['Coffee + egg sandwich','Tea + bread and butter','Water + salad']), q('Where do you order?', 'at the counter', 'Please order at the counter.', 'A instrução final diz onde pedir.', ['at the counter','at home','online'])],
    contextVocabularyTasks: [task('Drinks significa bebidas no menu.'), task('Food significa comidas no menu.'), task('Counter é balcão.')],
    guidedSummary: task('Complete: At Sunny Café, coffee is ___ and an egg sandwich is ___.', '', 'Coffee is $3 and an egg sandwich is $5.'),
    connectedProduction: task('Escolha 1 drink e 1 food do menu e escreva um pedido com Can I have...?'),
    selfAssessment: [task('Consigo localizar preço?'), task('Consigo separar food e drinks?'), task('Consigo responder com evidência?')],
    lessonRecap: ['Menu é leitura funcional.', 'Use categorias para localizar informação.', 'Item + preço é a evidência principal.', 'Depois da leitura, transforme item em pedido.'],
    nextLessonBridge: 'No Listening A1.4, você vai ouvir alguém fazendo pedido em café.',
  }),

  createListeningLesson({
    ...common,
    id: 'A1-LISTENING-009',
    order: 9,
    title: 'Ordering food',
    objectives: ['Ouvir um pedido simples em café.', 'Identificar comida, bebida e escolha for here/to go.', 'Reconhecer Can I have...? em fala real.', 'Praticar shadowing de pedido educado.'],
    teacherOpening: 'Agora você vai ouvir uma situação real: uma pessoa pedindo comida e bebida. Na primeira escuta, entenda o cenário. Na segunda, procure os itens do pedido. Depois use o transcript para confirmar e repetir as frases.',
    whyItMatters: 'Pedidos em café são rápidos e previsíveis. Você precisa reconhecer blocos: Can I have..., anything else?, for here or to go?, thank you. Esses blocos resolvem muitas situações reais.',
    realLifeUseCases: ['Pedir comida em café.', 'Entender pergunta do atendente.', 'Responder for here ou to go.', 'Confirmar pedido.', 'Repetir frases úteis.'],
    conceptExplanation: 'Em um pedido simples, normalmente há greeting, pedido, pergunta extra, escolha de consumo e agradecimento. Ouça por palavras-chave: coffee, sandwich, for here, to go, please.',
    mentalModel: { title: 'Pedido em 5 passos', summary: 'Greeting → pedido → item extra → here/to go → thanks.', steps: ['Hello.', 'Can I have...', 'Anything else?', 'For here or to go?', 'Thank you.'] },
    stepByStep: [task('Primeira escuta: identifique o lugar.'), task('Segunda escuta: anote comida e bebida.'), task('Terceira etapa: confira for here/to go.'), task('Leia o transcript.'), task('Repita as frases do cliente.')],
    portugueseContrast: [task('Anything else? = mais alguma coisa?'), task('For here = para comer/beber aqui.'), task('To go = para viagem.'), task('Can I have...? é pedido educado.')],
    guidedDiscovery: [task('Se ouvir anything else, espere outro item ou no, thank you.'), task('Se ouvir for here or to go, responda for here ou to go.')],
    guidedBeforeQuiz: [task('Primeira escuta: qual é a situação?'), task('Segunda escuta: quais itens são pedidos?')],
    listeningPreparation: [task('Não leia o transcript antes da primeira escuta.'), task('Prepare: coffee, sandwich, anything else, for here, to go.'), task('Objetivo: identificar pedido e resposta final.')],
    keyWordsToHear: [vocab('coffee','café'), vocab('tea','chá'), vocab('water','água'), vocab('sandwich','sanduíche'), vocab('anything else','mais alguma coisa?'), vocab('for here','para aqui'), vocab('to go','para viagem')],
    audioScript: `Clerk: Good morning. What would you like?
Customer: Good morning. Can I have a coffee, please?
Clerk: Sure. Anything else?
Customer: Yes, an egg sandwich, please.
Clerk: For here or to go?
Customer: For here, please.
Clerk: Okay. A coffee and an egg sandwich.
Customer: Thank you.`,
    firstListenTasks: [task('Sem transcript: onde acontece a conversa?', 'O diálogo acontece em um café (coffee shop).', 'café'), task('Sem transcript: o cliente pede comida, bebida ou os dois?', 'Ambos os personagens participam do diálogo.', 'food and drink')],
    secondListenTasks: [task('Qual bebida o cliente pede?', 'coffee'), task('Qual comida o cliente pede?', 'an egg sandwich'), task('Ele escolhe for here ou to go?', 'for here')],
    transcript: `Clerk: Good morning. What would you like?
Customer: Good morning. Can I have a coffee, please?
Clerk: Sure. Anything else?
Customer: Yes, an egg sandwich, please.
Clerk: For here or to go?
Customer: For here, please.
Clerk: Okay. A coffee and an egg sandwich.
Customer: Thank you.`,
    vocabulary: [vocab('what would you like?', 'o que você gostaria?'), vocab('anything else?', 'mais alguma coisa?'), vocab('for here', 'para consumir aqui'), vocab('to go', 'para viagem'), vocab('sure', 'claro')],
    shadowing: [task('Can I have a coffee, please?'), task('Anything else?'), task('An egg sandwich, please.'), task('For here, please.'), task('A coffee and an egg sandwich.')],
    dictationTasks: [task('Complete: Can I have a ___, please?', 'coffee'), task('Complete: Anything ___?', 'else'), task('Complete: An egg ___, please.', 'sandwich'), task('Complete: For ___, please.', 'here')],
    pronunciationChunks: [task('Can I have a', 'Soa como bloco de pedido.'), task('anything else', 'Escute as duas palavras juntas.'), task('for here or to go', 'Pergunta rápida e comum.')],
    listeningComprehension: [q('What drink does the customer order?', 'coffee', 'Can I have a coffee, please?', '', ['coffee','sandwich','salad']), q('What food does the customer order?', 'an egg sandwich', 'An egg sandwich, please.', '', ['an egg sandwich','bread and butter','salad']), q('Is the order for here or to go?', 'for here', 'For here, please.', '', ['for here','to go','online'])],
    oralProduction: task('Faça seu próprio pedido oral com Can I have...? Use 1 drink e 1 food.'),
    selfAssessment: [task('Entendi o item principal sem transcript?'), task('Reconheci anything else?'), task('Consigo responder for here/to go?')],
    lessonRecap: ['Pedidos em café seguem sequência previsível.', 'Can I have...? é pedido educado.', 'Anything else? pergunta se há mais itens.', 'For here/to go define onde consumir.'],
    nextLessonBridge: 'No Speaking A1.4, você vai praticar fazer esse pedido em voz alta.',
  }),

  createSpeakingLesson({
    ...common,
    id: 'A1-SPEAKING-013',
    order: 13,
    title: 'Order something simple',
    objectives: ['Fazer um pedido simples em café.', 'Usar Can I have...? com comida e bebida.', 'Responder Anything else? e For here or to go?', 'Gravar um diálogo curto de pedido.'],
    teacherOpening: 'Nesta aula, você transforma food and drinks em fala real. Não precisa inventar frases grandes. Você precisa dominar um roteiro curto: greeting, Can I have..., anything else, for here/to go, thank you. Isso já resolve uma situação de café no A1.',
    whyItMatters: 'Pedir algo é uma das primeiras situações em que o inglês precisa funcionar fora do app. O segredo é praticar frases prontas com substituição: coffee vira tea, sandwich vira salad, for here vira to go.',
    realLifeUseCases: ['Pedir bebida.', 'Pedir lanche.', 'Responder atendente.', 'Dizer para comer no local ou levar.', 'Encerrar com thank you.'],
    conceptExplanation: 'Use modelo e substituição. Primeiro repita: Can I have a coffee, please? Depois troque o item: Can I have tea, please? Can I have an egg sandwich, please? Em seguida, responda: For here, please. ou To go, please.',
    mentalModel: { title: 'Pedido oral em roteiro', summary: 'Você não improvisa do zero; segue o script e troca itens.' },
    stepByStep: [task('Cumprimente.'), task('Peça 1 item com Can I have...?'), task('Adicione please.'), task('Responda Anything else?'), task('Escolha for here ou to go.'), task('Agradeça.')],
    portugueseContrast: [task('Evite I want... como primeira opção de pedido.'), task('Use please para suavizar.'), task('For here/to go não traduz palavra por palavra.')],
    guidedDiscovery: [task('Can I have a coffee? é pedido.'), task('Anything else? pede item extra.'), task('For here? pergunta consumo no local.')],
    guidedBeforeQuiz: [task('Repita: Can I have a coffee, please?'), task('Repita: An egg sandwich, please.'), task('Repita: For here, please.')],
    speakingSituation: 'Você está em um café e precisa pedir uma bebida e uma comida simples.',
    modelPhrases: [phrase('Good morning.', 'Bom dia.'), phrase('Can I have a coffee, please?', 'Pode me ver um café, por favor?'), phrase('An egg sandwich, please.', 'Um sanduíche de ovo, por favor.'), phrase('For here, please.', 'Para comer aqui, por favor.'), phrase('To go, please.', 'Para viagem, por favor.'), phrase('Thank you.', 'Obrigado.')],
    pronunciationChunks: [task('Can I have a', 'Repita como bloco.'), task('coffee, please', 'Suba e desça a entonação naturalmente.'), task('for here or to go', 'Treine como pergunta rápida.')],
    repeatAfterMe: [task('Can I have a coffee, please?'), task('Can I have water, please?'), task('A sandwich, please.'), task('For here, please.'), task('To go, please.')],
    substitutionDrills: [task('coffee → tea', 'Can I have tea, please?'), task('coffee → orange juice', 'Can I have orange juice, please?'), task('sandwich → salad', 'A salad, please.'), task('for here → to go', 'To go, please.')],
    guidedSpeaking: [task('Responda: What would you like?', 'Can I have a coffee, please?'), task('Responda: Anything else?', 'Yes, a sandwich, please.'), task('Responda: For here or to go?', 'For here, please.')],
    recordingTasks: [task('Grave um pedido com 1 bebida e 1 comida.'), task('Grave o diálogo completo: clerk + customer.'), task('Grave novamente trocando os itens.')],
    freeSpeaking: task('Faça um pedido livre usando qualquer food/drink da aula anterior.'),
    feedbackChecklist: [task('Usei Can I have...?'), task('Usei please?'), task('Respondi Anything else?'), task('Escolhi for here ou to go?'), task('Falei com frases curtas e claras?')],
    selfAssessment: [task('Consigo pedir uma bebida?'), task('Consigo pedir comida?'), task('Consigo responder for here/to go?')],
    lessonRecap: ['Pedido oral usa roteiro curto.', 'Can I have...? é a base.', 'Anything else? pede item extra.', 'For here/to go finaliza a escolha.'],
    nextLessonBridge: 'Na Writing A1.4, você vai escrever uma mensagem curta pedindo comida ou confirmando pedido.',
  }),

  createWritingLesson({
    ...common,
    id: 'A1-WRITING-008',
    order: 8,
    title: 'Write a simple message',
    objectives: ['Escrever uma mensagem curta de pedido.', 'Usar greeting, pedido e agradecimento.', 'Aplicar food/drinks em escrita funcional.', 'Revisar pontuação, please e thank you.'],
    teacherOpening: 'Agora você vai escrever uma mensagem simples. No A1, escrever bem não significa escrever muito. Significa escrever uma mensagem clara, educada e útil: Hello. Can I have a coffee and a sandwich, please? Thank you. Essa estrutura já funciona em chat, atendimento ou pedido simples.',
    whyItMatters: 'Mensagens curtas aparecem em aplicativos, pedidos, WhatsApp, atendimento e situações de viagem. Você precisa aprender a montar blocos seguros: greeting + request + details + thanks.',
    realLifeUseCases: ['Enviar pedido simples.', 'Pedir comida em chat.', 'Confirmar item.', 'Escrever recado curto.', 'Praticar pontuação em inglês.'],
    conceptExplanation: 'Uma mensagem simples de pedido tem quatro partes: greeting, request, detail e closing. Exemplo: Hello. Can I have a coffee and an egg sandwich, please? For here. Thank you. Use frases curtas. Comece com letra maiúscula. Termine com ponto ou interrogação.',
    mentalModel: { title: 'Mensagem A1 em 4 blocos', summary: 'Hello → pedido → detalhe → thanks.', steps: ['Hello.', 'Can I have...', 'For here/to go.', 'Thank you.'] },
    stepByStep: [task('Abra com Hello ou Good morning.'), task('Escreva o pedido com Can I have...?'), task('Adicione 1 ou 2 itens.'), task('Diga For here ou To go se necessário.'), task('Feche com Thank you.'), task('Revise maiúscula e pontuação.')],
    portugueseContrast: [task('Não traduza “eu queria” literalmente no A1.'), task('Use Can I have...? como base segura.'), task('Please geralmente entra no fim do pedido.'), task('Thank you fecha com educação.')],
    guidedDiscovery: [task('Qual parte abre a mensagem?', 'Hello.'), task('Qual parte faz o pedido?', 'Can I have...?'), task('Qual parte fecha com educação?', 'Thank you.')],
    guidedBeforeQuiz: [task('Modelo: Hello. Can I have water, please? Thank you.'), task('Modelo: Good morning. Can I have a coffee and a sandwich, please? To go. Thank you.')],
    writingPurpose: 'Escrever mensagem curta para pedir comida ou bebida.',
    modelText: `Hello. Can I have a coffee and an egg sandwich, please? For here. Thank you.`,
    writingBlocks: [task('Greeting', 'Hello.'), task('Request', 'Can I have a coffee and an egg sandwich, please?'), task('Detail', 'For here.'), task('Closing', 'Thank you.')],
    guidedSubstitution: [task('Troque coffee por tea.', 'Can I have tea, please?'), task('Troque egg sandwich por fruit salad.', 'Can I have a fruit salad, please?'), task('Troque For here por To go.', 'To go.')],
    grammarForWriting: [task('Comece frases com letra maiúscula.'), task('Use ponto final em frases curtas.'), task('Use interrogação em Can I have...?'), task('Use please antes do final ou no fim da frase.')],
    checklist: [task('Minha mensagem tem greeting?'), task('Usei Can I have...?'), task('Incluí food/drink?'), task('Usei please/thank you?'), task('Revisei pontuação?')],
    draftTask: task('Escreva uma mensagem pedindo 1 bebida e 1 comida.'),
    revisionTask: task('Revise sua mensagem e adicione please ou thank you se estiver faltando.'),
    commonMistakes: [mistake('I want coffee and sandwich.', 'Can I have a coffee and a sandwich, please?', 'Pedido mais educado e completo.'), mistake('hello can i have coffee', 'Hello. Can I have a coffee, please?', 'Maiúscula e pontuação.'), mistake('Thanks you.', 'Thank you.', 'A forma correta é Thank you.')],
    productionTasks: [task('Escreva uma mensagem para pedir café e sanduíche.'), task('Escreva uma versão to go.'), task('Escreva uma versão com tea e fruit salad.')],
    selfAssessment: [task('Consigo escrever pedido curto?'), task('Consigo revisar pontuação?'), task('Consigo usar please e thank you?')],
    lessonRecap: ['Mensagem A1 deve ser curta e clara.', 'Use Hello + Can I have...? + detalhe + Thank you.', 'Pontuação e maiúscula importam.', 'Please e thank you tornam o pedido educado.'],
    nextLessonBridge: 'No próximo bloco de A1.4, você vai expandir situações práticas para lugares na cidade e localização.',
  }),
]);

export const A1_DEEP_PRACTICAL_SITUATIONS_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS.filter((lesson) => lesson.pillar === 'grammar')),
  vocabulary: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS.filter((lesson) => lesson.pillar === 'vocabulary')),
  reading: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS.filter((lesson) => lesson.pillar === 'reading')),
  listening: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS.filter((lesson) => lesson.pillar === 'listening')),
  speaking: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS.filter((lesson) => lesson.pillar === 'speaking')),
  writing: Object.freeze(A1_DEEP_PRACTICAL_SITUATIONS.filter((lesson) => lesson.pillar === 'writing')),
});
