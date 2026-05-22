import { createGrammarLesson, createReadingLesson } from '../../../schemas/index.js';

const level = 'A2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['a2-4', 'comparisons-needs', 'possessive-pronouns', 'reading', 'closing', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }

export const A2_DEEP_COMPARISONS_NEEDS_PART4 = Object.freeze([
  createGrammarLesson({
    ...common,
    id: 'A2-GRAMMAR-023',
    order: 23,
    title: 'Possessive pronouns: mine, yours, his, hers',
    objectives: ['Diferenciar possessive adjectives e possessive pronouns.', 'Usar mine, yours, his, hers, ours e theirs sem repetir substantivo.', 'Aplicar possessive pronouns em comparação de objetos, roupas, produtos e escolhas.', 'Evitar erros como my is, your is e this is mine jacket.'],
    teacherOpening: 'Para fechar o A2.4, você vai aprender a comparar posse sem repetir palavras. My jacket é possessive adjective + noun. Mine substitui my jacket: This jacket is mine. Your phone → yours. Her bag → hers. His shoes → his.',
    whyItMatters: 'Em escolhas e comparações, você precisa dizer de quem é cada item: This one is mine. Yours is cheaper. Hers is more comfortable. Theirs is the best option.',
    realLifeUseCases: ['Comparar roupas de duas pessoas.', 'Dizer de quem é um produto.', 'Evitar repetir substantivos.', 'Falar de escolhas e pertences.', 'Resolver confusão em loja, casa ou trabalho.'],
    conceptExplanation: 'Possessive adjectives vêm antes de um substantivo: my jacket, your phone, her bag. Possessive pronouns ficam sozinhos: mine, yours, hers. Não use noun depois deles. Diga This jacket is mine, não This is mine jacket.',
    mentalModel: { title: 'my + noun / mine sozinho', summary: 'Se tem substantivo depois, use my/your/her. Se substitui o substantivo, use mine/yours/hers.', steps: ['my jacket → mine', 'your phone → yours', 'her bag → hers', 'their car → theirs'] },
    stepByStep: [task('Veja se há substantivo depois.'), task('Se houver substantivo, use adjective: my/your/his/her/our/their.'), task('Se não houver substantivo, use pronoun: mine/yours/his/hers/ours/theirs.'), task('Compare itens com yours/mine/hers.'), task('Revise se não colocou noun depois de mine/yours.')],
    portugueseContrast: [task('Mine não significa “minha” antes de substantivo; é “meu/minha” sozinho.'), task('His pode ser adjective e pronoun: his jacket / it is his.'), task('Hers nunca recebe noun depois.'), task('Theirs é “deles/delas” sozinho.')],
    guidedDiscovery: [task('This is my jacket. → This jacket is mine.'), task('That is your phone. → That phone is yours.'), task('This is her bag. → This bag is hers.'), task('These are their shoes. → These shoes are theirs.')],
    guidedBeforeQuiz: [task('Complete: This jacket is ___. (my)', 'mine'), task('Complete: Is this phone ___? (your)', 'yours'), task('Corrija: This is mine jacket.', 'This is my jacket. / This jacket is mine.')],
    grammarGoal: 'Usar possessive pronouns para comparar e identificar posse sem repetir substantivos.',
    formationGuide: [task('my + noun', 'This is my jacket.'), task('mine alone', 'This jacket is mine.'), task('your + noun', 'Is this your phone?'), task('yours alone', 'Is this phone yours?'), task('her + noun', 'That is her bag.'), task('hers alone', 'That bag is hers.')],
    whenToUse: [task('Quando o substantivo já está claro.'), task('Ao comparar dois objetos de pessoas diferentes.'), task('Ao responder de quem é algo.'), task('Ao evitar repetição em fala e escrita.')],
    whenNotToUse: [task('Não use mine/yours/hers antes de noun.'), task('Não diga my is ou your is.'), task('Não use her sozinho como possessive pronoun; use hers.')],
    grammarTable: [
      { pattern: 'my jacket → mine', example: 'This jacket is mine.', translation: 'Esta jaqueta é minha.' },
      { pattern: 'your phone → yours', example: 'Is this phone yours?', translation: 'Este celular é seu?' },
      { pattern: 'her bag → hers', example: 'The black bag is hers.', translation: 'A bolsa preta é dela.' },
      { pattern: 'their shoes → theirs', example: 'The cheaper shoes are theirs.', translation: 'Os sapatos mais baratos são deles.' }
    ],
    teacherExamples: [
      { english: 'My jacket is cheaper, but yours is more comfortable.', translation: 'Minha jaqueta é mais barata, mas a sua é mais confortável.', why: 'Yours evita repetir jacket.' },
      { english: 'This phone is mine. The newer one is hers.', translation: 'Este celular é meu. O mais novo é dela.', why: 'Mine/hers substituem phone.' },
      { english: 'Our apartment is smaller than theirs.', translation: 'Nosso apartamento é menor que o deles.', why: 'Theirs substitui apartment.' }
    ],
    commonBrazilianMistakes: [mistake('This is mine jacket.', 'This is my jacket. / This jacket is mine.', 'Mine não vem antes de substantivo.'), mistake('Your is cheaper.', 'Yours is cheaper.', 'Pronome possessivo é yours.'), mistake('This bag is her.', 'This bag is hers.', 'Her antes de noun; hers sozinho.'), mistake('Their is better.', 'Theirs is better.', 'Theirs substitui o substantivo.')],
    controlledPractice: [task('Complete: This phone is ___. (my)', 'mine'), task('Complete: Is this charger ___? (your)', 'yours'), task('Complete: The red bag is ___. (her)', 'hers'), task('Complete: The big house is ___. (their)', 'theirs')],
    errorCorrectionPractice: [task('Corrija: Mine phone is old.', 'My phone is old. / This phone is mine.'), task('Corrija: This jacket is your.', 'This jacket is yours.'), task('Corrija: Hers bag is expensive.', 'Her bag is expensive. / The bag is hers.')],
    transformationPractice: [task('Transforme: This is my phone.', 'This phone is mine.'), task('Transforme: That is her jacket.', 'That jacket is hers.'), task('Transforme: These are their shoes.', 'These shoes are theirs.')],
    translationPractice: [task('Esta jaqueta é minha.', 'This jacket is mine.'), task('O seu é mais confortável.', 'Yours is more comfortable.'), task('A bolsa preta é dela.', 'The black bag is hers.')],
    productionTasks: [task('Escreva 8 frases comparando mine/yours/hers/theirs.'), task('Descreva 4 objetos e diga de quem são.'), task('Compare dois produtos usando possessive pronouns e comparatives.')],
    finalChecklist: [task('Há substantivo depois? use my/your/her/their.'), task('Está sozinho? use mine/yours/hers/theirs.'), task('Evitei mine jacket?'), task('Usei comparação quando útil?')],
    selfAssessment: [task('Consigo diferenciar my e mine?'), task('Consigo usar yours/hers/theirs?'), task('Consigo comparar posses sem repetir noun?')],
    lessonRecap: ['Possessive adjectives vêm antes do substantivo.', 'Possessive pronouns ficam sozinhos.', 'Mine/yours/hers/theirs ajudam a comparar objetos.', 'Não use mine antes de noun.'],
    nextLessonBridge: 'Agora você vai ler convites e sequências passadas com foco em escolha e comparação para fechar o A2.4.',
  }),

  createReadingLesson({
    ...common,
    id: 'A2-READING-013',
    order: 13,
    title: 'A simple invitation',
    objectives: ['Ler um convite simples com foco em escolha e preferência.', 'Identificar opções, horário, lugar e motivo.', 'Reconhecer comparatives e possessive pronouns em contexto.', 'Responder com evidência textual.'],
    teacherOpening: 'Esta leitura aparece no mapa como convite simples, mas aqui ela fecha A2.4 com foco em escolha. Você vai ler um convite em que a pessoa compara opções de lugar e decide qual é melhor.',
    whyItMatters: 'Mesmo convites envolvem escolhas: qual restaurante, qual horário, qual lugar é mais barato, mais perto ou mais confortável. Isso prepara A2.5 sem invadir o pacote de comunicação pura.',
    realLifeUseCases: ['Ler convite de amigo.', 'Escolher entre dois lugares.', 'Entender preferência.', 'Responder com base em horário e local.', 'Justificar escolha.'],
    conceptExplanation: 'Procure convite, opções e critérios. Palavras como cheaper, closer, quieter, yours e mine mostram comparação e posse. O convite em si é simples; a habilidade do A2.4 é entender a decisão.',
    mentalModel: { title: 'invitation with choice', summary: 'Convite + opções + critérios + decisão.', steps: ['invite', 'place A', 'place B', 'comparison', 'final choice'] },
    stepByStep: [task('Identifique quem convida.'), task('Marque as opções de lugar.'), task('Sublinhe comparatives.'), task('Procure horário.'), task('Ache a escolha final e o motivo.')],
    portugueseContrast: [task('Invitation = convite.'), task('Closer = mais perto.'), task('Quieter = mais silencioso/calmo.'), task('Mine/yours substituem lugar/plano quando já está claro.')],
    guidedDiscovery: [task('Would you like to...? inicia convite.'), task('But mostra contraste entre opções.'), task('The best choice mostra decisão final.'), task('Yours/mine evitam repetição.')],
    guidedBeforeQuiz: [task('Procure o convite.'), task('Procure os dois lugares.'), task('Procure cheaper/closer/quieter.'), task('Use evidência.')],
    readingPurpose: 'Entender convite curto em que há escolha entre opções.',
    preReadingVocabulary: [vocab('invitation', 'convite'), vocab('café', 'cafeteria'), vocab('closer', 'mais perto'), vocab('quieter', 'mais quieto/calmo'), vocab('choice', 'escolha')],
    readingStrategy: [task('Leia primeiro para entender o convite.'), task('Depois compare os lugares.'), task('Marque horário e motivo.'), task('Responda com evidência.')],
    mainText: `Hi Ana, would you like to study English with me on Saturday afternoon? We can go to the café near your house or to the library near mine. The café is closer to your house and it has better coffee, but the library is quieter and cheaper. I think the library is the best choice because we need a quiet place to study. Can we meet there at 3 p.m.?`,
    firstReadTask: task('Qual é o assunto geral?', 'Convite para estudar inglês no sábado.'),
    secondReadTasks: [task('Quais são as duas opções de lugar?', 'café and library'), task('Qual lugar é mais perto da casa da Ana?', 'the café'), task('Qual lugar é mais quieto e barato?', 'the library'), task('Que horas querem encontrar?', '3 p.m.')],
    evidenceQuestions: [q('What is the invitation for?', 'to study English on Saturday afternoon', 'study English with me on Saturday afternoon', '', ['study English','buy shoes','cook dinner']), q('Which place is closer to Ana’s house?', 'the café', 'The café is closer to your house', '', ['café','library','store']), q('Which place is quieter and cheaper?', 'the library', 'the library is quieter and cheaper', '', ['library','café','both']), q('Why is the library the best choice?', 'they need a quiet place to study', 'because we need a quiet place to study', '', ['quiet place to study','better coffee','closer to Ana']), q('What time do they want to meet?', '3 p.m.', 'meet there at 3 p.m.', '', ['3 p.m.','2 p.m.','Saturday morning'])],
    contextVocabularyTasks: [task('Near your house e near mine usam possessive pronoun.'), task('Better coffee é comparativo irregular.'), task('Best choice é superlativo/decisão final.')],
    guidedSummary: task('Complete: The café is closer to Ana’s house, but the library is ___ and ___. The library is the best choice because they need a ___ place.', '', 'quieter / cheaper / quiet'),
    connectedProduction: task('Escreva um convite curto com duas opções de lugar e uma escolha final.'),
    selfAssessment: [task('Consigo entender convite?'), task('Consigo comparar opções no texto?'), task('Consigo achar motivo da escolha?')],
    lessonRecap: ['Convites também podem envolver escolha.', 'Comparatives explicam diferenças entre lugares.', 'Possessive pronouns evitam repetição.', 'Best choice mostra decisão final.'],
    nextLessonBridge: 'A próxima leitura fecha A2.4 com sequência passada e decisão comparativa.',
  }),

  createReadingLesson({
    ...common,
    id: 'A2-READING-015',
    order: 15,
    title: 'Reading for past sequence',
    objectives: ['Ler uma sequência passada ligada a comparação e decisão.', 'Identificar marcadores de sequência: first, then, after that, finally.', 'Reconhecer comparatives, superlatives e possessive pronouns em contexto.', 'Responder com evidência textual.'],
    teacherOpening: 'Esta leitura fecha A2.4 integrando passado, sequência e comparação. Você vai ler o que aconteceu numa compra: primeiro comparou, depois experimentou, finalmente escolheu.',
    whyItMatters: 'Você precisa contar decisões passadas: como escolheu um produto, por que não comprou outro, qual foi melhor. Isso conecta Past Simple ao A2.4 sem voltar ao A2.2.',
    realLifeUseCases: ['Relatar uma compra.', 'Explicar por que escolheu um produto.', 'Comparar experiência passada.', 'Contar sequência de decisão.', 'Justificar escolha final.'],
    conceptExplanation: 'Procure sequence markers para ordem e comparison words para decisão. First/then/after that/finally mostram sequência. Cheaper, more comfortable, best, mine/yours mostram comparação e posse.',
    mentalModel: { title: 'past decision sequence', summary: 'Sequência passada + critérios + escolha.', steps: ['first', 'then', 'after that', 'finally', 'because'] },
    stepByStep: [task('Leia para entender o evento passado.'), task('Marque first/then/after that/finally.'), task('Identifique produtos/opções.'), task('Sublinhe comparatives/superlatives.'), task('Ache decisão final e motivo.')],
    portugueseContrast: [task('First/then/after that/finally organizam relato.'), task('Tried on = experimentou roupa/sapato.'), task('Fit better = serviu melhor.'), task('Mine/yours substituem objeto já mencionado.')],
    guidedDiscovery: [task('Went/tried/bought são passado.'), task('Cheaper/more comfortable comparam.'), task('Finally mostra decisão final.'), task('Mine/yours indicam posse.')],
    guidedBeforeQuiz: [task('Procure first.'), task('Procure then.'), task('Procure finally.'), task('Procure why/because.')],
    readingPurpose: 'Entender sequência passada de compra e decisão.',
    preReadingVocabulary: [vocab('tried on', 'experimentou'), vocab('fit better', 'serviu melhor'), vocab('finally', 'finalmente/por fim'), vocab('receipt', 'recibo'), vocab('choice', 'escolha')],
    readingStrategy: [task('Faça uma linha do tempo.'), task('Marque cada etapa da compra.'), task('Compare opções.'), task('Use evidência para responder.')],
    mainText: `Yesterday, I went shopping with my brother. First, I tried on a blue jacket. It was cheaper than his, but it was too tight. Then, my brother showed me a black jacket. It was more expensive, but it fit better. After that, we compared the prices and the quality. Finally, I bought the black jacket because it was the best choice for work. Mine was more comfortable than the blue one, and his was still cheaper than mine.`,
    firstReadTask: task('Qual é o assunto geral?', 'Sequência de compra e escolha de uma jaqueta.'),
    secondReadTasks: [task('O que experimentou primeiro?', 'blue jacket'), task('Qual problema da jaqueta azul?', 'too tight'), task('Quem mostrou a jaqueta preta?', 'brother'), task('Por que comprou a preta?', 'best choice for work / fit better')],
    evidenceQuestions: [q('Texto da aula — Reading for past sequence — what did the person try on first?', 'a blue jacket', 'First, I tried on a blue jacket.', '', ['blue jacket','black jacket','shoes']), q('What was the problem with the blue jacket?', 'it was too tight', 'it was too tight', '', ['too tight','too loose','too dirty']), q('Who showed the black jacket?', 'my brother', 'my brother showed me a black jacket', '', ['brother','seller','friend']), q('What did they compare after that?', 'prices and quality', 'we compared the prices and the quality', '', ['prices and quality','colors only','stores']), q('Why did the person buy the black jacket?', 'best choice for work', 'because it was the best choice for work', '', ['best choice for work','cheapest','brother wanted it'])],
    contextVocabularyTasks: [task('Mine no final substitui my black jacket.'), task('His substitui my brother’s jacket.'), task('Still cheaper than mine compara posse e preço.')],
    guidedSummary: task('Complete: First, the person tried a ___ jacket. Then, the brother showed a ___ jacket. Finally, the person bought it because it was the ___ choice for work.', '', 'blue / black / best'),
    connectedProduction: task('Escreva uma sequência passada de 5 frases sobre uma compra e uma escolha.'),
    selfAssessment: [task('Consigo seguir sequência passada?'), task('Consigo identificar comparação?'), task('Consigo entender mine/his no texto?')],
    lessonRecap: ['Past sequence pode explicar decisões.', 'First/then/after that/finally organizam relato.', 'Comparatives justificam escolha.', 'Possessive pronouns evitam repetição no final.'],
    nextLessonBridge: 'A2.4 está fechado. O próximo pacote correto será A2.5 Everyday communication tasks.',
  }),
]);

export const A2_DEEP_COMPARISONS_NEEDS_PART4_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(A2_DEEP_COMPARISONS_NEEDS_PART4.filter((lesson) => lesson.pillar === 'grammar')),
  vocabulary: Object.freeze(A2_DEEP_COMPARISONS_NEEDS_PART4.filter((lesson) => lesson.pillar === 'vocabulary')),
  reading: Object.freeze(A2_DEEP_COMPARISONS_NEEDS_PART4.filter((lesson) => lesson.pillar === 'reading')),
  listening: Object.freeze(A2_DEEP_COMPARISONS_NEEDS_PART4.filter((lesson) => lesson.pillar === 'listening')),
  speaking: Object.freeze(A2_DEEP_COMPARISONS_NEEDS_PART4.filter((lesson) => lesson.pillar === 'speaking')),
  writing: Object.freeze(A2_DEEP_COMPARISONS_NEEDS_PART4.filter((lesson) => lesson.pillar === 'writing')),
});
