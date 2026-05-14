import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'A2';
const status = 'ready';
const common = { level, status, estimatedMinutes: 60, tags: ['a2-2', 'past-stories', 'shopping-health', 'past-questions', 'deep-approved-target'] };

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }
function ex(text, translation, why = '', warning = '') { return { text, translation, why, warning }; }

export const A2_DEEP_PAST_STORIES_PART4 = Object.freeze([
  createGrammarLesson({
    ...common,
    id: 'A2-GRAMMAR-005',
    order: 5,
    title: 'Past Simple — questions',
    objectives: ['Formar perguntas no Past Simple com Did.', 'Usar verbo base depois de did.', 'Criar perguntas sobre compras, restaurante, hotel e farmácia.', 'Evitar erros como Did you went? e Did she bought?'],
    teacherOpening: 'Agora você vai fazer perguntas no passado. A estrutura principal é Did + subject + base verb? Did you buy it? Did she go to the pharmacy? Did they like the restaurant? O did já marca passado, então o verbo volta para a base.',
    whyItMatters: 'Perguntas no passado são essenciais para conversar: What did you buy? Where did you go? Did you like it? How much did it cost? Sem isso, você só conta sua história, mas não participa da conversa.',
    realLifeUseCases: ['Perguntar sobre fim de semana.', 'Perguntar o que alguém comprou.', 'Perguntar se gostou de restaurante.', 'Perguntar onde foi.', 'Perguntar quanto custou.'],
    conceptExplanation: 'Use Did no começo para perguntas yes/no: Did you buy the jacket? Para perguntas com informação, use wh-word + did + subject + base verb: What did you buy? Where did she go? How much did it cost?',
    mentalModel: { title: 'Did carrega o passado na pergunta', summary: 'Depois de did, use o verbo base.', steps: ['Did you buy it?', 'Where did you go?', 'What did she order?', 'How much did it cost?'] },
    stepByStep: [task('Escolha se é yes/no ou wh-question.'), task('Use did depois do wh-word ou no começo.'), task('Coloque o sujeito.'), task('Use verbo base.'), task('Finalize com complemento e ?')],
    portugueseContrast: [task('Não diga Did you went?'), task('Não diga What did you bought?'), task('Não use passado duplo.'), task('Em inglês, did já marca passado.')],
    guidedDiscovery: [task('Did you buy it? usa buy, não bought.'), task('Where did you go? usa go, não went.'), task('How much did it cost? pergunta preço passado.')],
    guidedBeforeQuiz: [task('Corrija: Did you went?', 'Did you go?'), task('Corrija: What did she bought?', 'What did she buy?'), task('Complete: Where ___ you go?', 'did')],
    grammarGoal: 'Fazer perguntas no passado com did + verbo base.',
    formationGuide: [task('Did + subject + base verb?', 'Did you buy the jacket?'), task('Wh-word + did + subject + base verb?', 'What did you buy?'), task('How much + did + it + cost?', 'How much did it cost?')],
    whenToUse: [task('Perguntar sobre ações concluídas.'), task('Perguntar detalhes de experiências.'), task('Conversas sobre compras, viagem, restaurante e farmácia.')],
    whenNotToUse: [task('Não use did com verbo no passado.'), task('Não use do/does para passado.'), task('Não use did para perguntas com was/were neste bloco.')],
    grammarTable: [
      { pattern: 'Did + subject + verb?', example: 'Did you buy it?', translation: 'Você comprou isso?' },
      { pattern: 'What did...?', example: 'What did you order?', translation: 'O que você pediu?' },
      { pattern: 'Where did...?', example: 'Where did she go?', translation: 'Onde ela foi?' },
      { pattern: 'How much did...?', example: 'How much did it cost?', translation: 'Quanto custou?' }
    ],
    teacherExamples: [
      { english: 'Did you like the restaurant?', translation: 'Você gostou do restaurante?', why: 'Pergunta yes/no no passado.' },
      { english: 'What did you buy yesterday?', translation: 'O que você comprou ontem?', why: 'Wh-question com did.' },
      { english: 'Where did he stay?', translation: 'Onde ele ficou?', why: 'Stay volta para base.' },
      { english: 'How much did the jacket cost?', translation: 'Quanto custou a jaqueta?', why: 'Pergunta de preço no passado.' }
    ],
    commonBrazilianMistakes: [mistake('Did you went?', 'Did you go?', 'Depois de did, verbo base.'), mistake('What did you bought?', 'What did you buy?', 'Bought vira buy depois de did.'), mistake('Where you went?', 'Where did you go?', 'Pergunta precisa de did.'), mistake('Did she liked it?', 'Did she like it?', 'Like fica base.')],
    controlledPractice: [task('Complete: ___ you buy it?', 'Did'), task('Complete: What did you ___?', 'buy/order/do'), task('Complete: Where did she ___?', 'go/stay'), task('Complete: How much did it ___?', 'cost')],
    errorCorrectionPractice: [task('Corrija: Did he bought the medicine?', 'Did he buy the medicine?'), task('Corrija: Where did they stayed?', 'Where did they stay?'), task('Corrija: What you did buy?', 'What did you buy?')],
    transformationPractice: [task('Transforme em pergunta: You bought a jacket.', 'Did you buy a jacket?'), task('Pergunte o que: She ordered pasta.', 'What did she order?'), task('Pergunte onde: They went to the pharmacy.', 'Where did they go?')],
    translationPractice: [task('Você comprou a jaqueta?', 'Did you buy the jacket?'), task('O que você pediu?', 'What did you order?'), task('Quanto custou?', 'How much did it cost?')],
    productionTasks: [task('Escreva 10 perguntas no passado com did.'), task('Crie 5 perguntas sobre compras.'), task('Crie 5 perguntas sobre restaurante/hotel/farmácia.')],
    finalChecklist: [task('Usei did?'), task('O verbo está na base?'), task('Usei ? no final?'), task('A pergunta tem sujeito?')],
    selfAssessment: [task('Consigo perguntar no passado?'), task('Consigo corrigir Did you went?'), task('Consigo perguntar preço e lugar?')],
    lessonRecap: ['Perguntas no Past Simple usam did.', 'Depois de did, use verbo base.', 'Wh-questions usam wh-word + did + subject + verb.', 'Did permite conversar sobre experiências passadas.'],
    nextLessonBridge: 'Agora você vai expandir compras e preços para usar perguntas como How much did it cost?',
  }),

  createVocabularyLesson({
    ...common,
    id: 'A2-VOCABULARY-006',
    order: 6,
    title: 'Shopping and prices',
    objectives: ['Aprender vocabulário de compras e preços.', 'Perguntar preço, tamanho, cor e desconto.', 'Falar de compra, troca e devolução.', 'Usar How much is it? e How much did it cost? em contexto.'],
    teacherOpening: 'Shopping and prices aprofunda compras. Você vai aprender price, discount, sale, receipt, size, color, cash, card, cheap, expensive, try on, exchange e return. Também vai praticar perguntas úteis: How much is it? Do you have size L? Can I exchange it?',
    whyItMatters: 'Comprar roupa, produto ou remédio envolve preço, tamanho, pagamento e troca. No A2, você precisa perguntar e explicar problemas simples.',
    realLifeUseCases: ['Perguntar preço.', 'Pedir tamanho/cor.', 'Pagar em dinheiro/cartão.', 'Pedir desconto.', 'Trocar ou devolver item.', 'Falar quanto custou.'],
    conceptExplanation: 'Use How much is it? para preço agora. Use How much did it cost? para preço de algo comprado no passado. Use Do you have...? para perguntar disponibilidade. Use Can I exchange/return it? para troca/devolução.',
    mentalModel: { title: 'compra = item + preço + tamanho + pagamento + troca', summary: 'Essas informações resolvem uma compra simples.', steps: ['item', 'price', 'size/color', 'pay', 'exchange/return'] },
    stepByStep: [task('Identifique o item.'), task('Pergunte preço.'), task('Pergunte tamanho/cor.'), task('Escolha forma de pagamento.'), task('Guarde recibo.'), task('Explique troca/devolução se precisar.')],
    portugueseContrast: [task('Price = preço; prize = prêmio.'), task('Sale = promoção/liquidação, não só venda.'), task('Receipt = recibo/nota.'), task('Exchange = trocar; return = devolver.')],
    guidedDiscovery: [task('How much is it? pergunta preço atual.'), task('How much did it cost? pergunta preço passado.'), task('Do you have size L? pergunta disponibilidade.')],
    guidedBeforeQuiz: [task('How much is it?'), task('Do you have size L?'), task('Can I pay by card?'), task('Can I exchange it?')],
    topicContext: 'Você vai comprar itens, perguntar preços e explicar troca/devolução.',
    essentialWords: [vocab('price', 'preço', 'The price is $50.'), vocab('discount', 'desconto', 'It has a discount.'), vocab('sale', 'promoção/liquidação', 'The jacket is on sale.'), vocab('receipt', 'recibo/nota', 'I have the receipt.'), vocab('size', 'tamanho', 'Do you have size L?'), vocab('color', 'cor', 'What colors do you have?'), vocab('cash', 'dinheiro', 'I paid in cash.'), vocab('card', 'cartão', 'Can I pay by card?'), vocab('cheap', 'barato', 'It was cheap.'), vocab('expensive', 'caro', 'It was expensive.'), vocab('try on', 'experimentar', 'Can I try it on?'), vocab('exchange', 'trocar', 'Can I exchange it?'), vocab('return', 'devolver', 'Can I return it?'), vocab('store', 'loja', 'The store was busy.'), vocab('cashier', 'caixa', 'The cashier was friendly.'), vocab('fitting room', 'provador', 'The fitting room is over there.'), vocab('total', 'total', 'The total is $50.'), vocab('cost', 'custar', 'How much did it cost?')],
    chunks: [{ chunk: 'How much is it?', translation: 'Quanto custa?', example: 'How much is it?' }, { chunk: 'How much did it cost?', translation: 'Quanto custou?', example: 'How much did it cost?' }, { chunk: 'Do you have size L?', translation: 'Tem tamanho G/L?', example: 'Do you have size L?' }, { chunk: 'Can I pay by card?', translation: 'Posso pagar com cartão?', example: 'Can I pay by card?' }, { chunk: 'Can I exchange it?', translation: 'Posso trocar?', example: 'Can I exchange it?' }],
    pronunciationFocus: { title: 'Foco sonoro', tips: ['Receipt tem p mudo: re-CEIPT.', 'Expensive tem stress em PEN.', 'Exchange começa com som de /iks/.'] },
    dangerousConfusions: [task('Price ≠ prize.'), task('Sale pode significar promoção.'), task('Receipt tem p mudo.'), task('Cost no passado pode ser cost em inglês comum: It cost $50.')],
    collocations: [task('pay by card'), task('pay in cash'), task('ask for a discount'), task('keep the receipt'), task('try on a jacket'), task('exchange an item'), task('return a product')],
    miniDialogues: [{ title: 'Asking the price', lines: ['A: How much is this jacket?', 'B: It is fifty dollars.', 'A: Do you have size L?', 'B: Yes, we do.', 'A: Can I try it on?', 'B: Of course.'], focus: 'Preço, tamanho e experimentar.' }],
    examples: [ex('I bought a jacket on sale.', 'Comprei uma jaqueta em promoção.', 'Sale como promoção.'), ex('I didn’t buy the shoes because they were expensive.', 'Não comprei os sapatos porque eram caros.', 'Negativa + motivo.'), ex('Can I exchange it for size L?', 'Posso trocar pelo tamanho L?', 'Troca de tamanho.')],
    recognitionPractice: [task('Qual palavra é recibo?', 'receipt'), task('Qual palavra é troca?', 'exchange'), task('Qual pergunta pede preço?', 'How much is it?'), task('Qual phrase fala pagamento com cartão?', 'pay by card')],
    usagePractice: [task('Complete: How much ___ it?', 'is'), task('Complete: Can I pay ___ card?', 'by'), task('Complete: Do you have ___ L?', 'size'), task('Complete: Can I ___ it?', 'exchange/return')],
    productionTasks: [task('Escreva 6 perguntas de loja.'), task('Crie 4 frases sobre algo que comprou.'), task('Crie um diálogo pedindo preço, tamanho e troca.')],
    spacedReview: [task('Revise price/prize, receipt e exchange amanhã.'), task('Crie 3 perguntas com How much.')],
    selfAssessment: [task('Consigo perguntar preço?'), task('Consigo pedir tamanho/cor?'), task('Consigo explicar troca/devolução?')],
    lessonRecap: ['Shopping A2 envolve preço, tamanho, pagamento e troca.', 'How much is it? pergunta preço atual.', 'How much did it cost? pergunta preço passado.', 'Receipt e exchange são essenciais.'],
    nextLessonBridge: 'Na Reading, você vai ler uma nota de conselho de saúde.',
  }),

  createReadingLesson({
    ...common,
    id: 'A2-READING-006',
    order: 6,
    title: 'A health advice note',
    objectives: ['Ler uma nota simples de conselho de saúde.', 'Identificar sintomas, recomendação e instruções.', 'Reconhecer vocabulário de farmácia e saúde.', 'Responder com evidência textual.'],
    teacherOpening: 'Nesta leitura, você vai ler uma nota de conselho de saúde. O foco é entender sintomas, o que a pessoa deve fazer, o que não deve fazer e quando procurar ajuda.',
    whyItMatters: 'Saúde e farmácia são situações importantes e sensíveis. No A2, você deve entender recomendações simples como rest, drink water, take medicine e see a doctor.',
    realLifeUseCases: ['Ler orientação de farmácia.', 'Entender sintomas simples.', 'Seguir instruções de medicamento básico.', 'Explicar problema de saúde.', 'Saber quando procurar médico.'],
    conceptExplanation: 'Em health advice notes, procure symptom, advice, medicine, frequency e warning. Palavras como headache, fever, cough, rest, medicine, doctor e pharmacy são chaves.',
    mentalModel: { title: 'saúde = sintoma + conselho + aviso', summary: 'Entenda o problema, o que fazer e o alerta.', steps: ['symptom', 'advice', 'medicine', 'warning'] },
    stepByStep: [task('Leia para achar o sintoma principal.'), task('Marque conselhos.'), task('Marque medicamento/instrução.'), task('Procure alerta/warning.'), task('Responda com evidência.')],
    portugueseContrast: [task('Advice é conselho; não é plural comum advices.'), task('Medicine pode ser remédio.'), task('Take medicine = tomar remédio.'), task('See a doctor = procurar/consultar médico.')],
    guidedDiscovery: [task('Headache indica dor de cabeça.'), task('Should indica recomendação.'), task('If indica condição/alerta.')],
    guidedBeforeQuiz: [task('Procure symptoms.'), task('Procure should.'), task('Procure medicine.'), task('Procure doctor.')],
    readingPurpose: 'Entender conselho simples de saúde/farmácia.',
    preReadingVocabulary: [vocab('headache', 'dor de cabeça'), vocab('fever', 'febre'), vocab('cough', 'tosse'), vocab('rest', 'descansar'), vocab('medicine', 'remédio'), vocab('doctor', 'médico')],
    readingStrategy: [task('Leia procurando problema e solução.'), task('Sublinhe should/shouldn’t se aparecer.'), task('Localize warning com if.'), task('Use evidência exata.')],
    mainText: `Health Advice Note
Problem: You have a headache and a cough.
Advice: Drink water and rest today. You can take this medicine after lunch. Do not take more than two pills in one day. If you have a fever or feel worse tomorrow, see a doctor.`,
    firstReadTask: task('Qual é o assunto geral?', 'Conselho de saúde para dor de cabeça e tosse.'),
    secondReadTasks: [task('Quais sintomas aparecem?', 'headache and cough'), task('O que a pessoa deve fazer hoje?', 'drink water and rest'), task('Quando tomar o remédio?', 'after lunch'), task('Qual é o limite?', 'not more than two pills in one day')],
    evidenceQuestions: [q('What symptoms does the person have?', 'headache and cough', 'You have a headache and a cough.', '', ['headache and cough','fever and back pain','stomachache']), q('What should the person drink?', 'water', 'Drink water and rest today.', '', ['water','coffee','juice']), q('When can the person take the medicine?', 'after lunch', 'take this medicine after lunch', '', ['after lunch','before breakfast','at night']), q('What should the person not do?', 'take more than two pills in one day', 'Do not take more than two pills in one day.', '', ['take more than two pills','drink water','rest']), q('When should the person see a doctor?', 'if they have a fever or feel worse tomorrow', 'If you have a fever or feel worse tomorrow, see a doctor.', '', ['if fever or worse','if hungry','if better'])],
    contextVocabularyTasks: [task('Pills são comprimidos.'), task('Feel worse significa sentir-se pior.'), task('Do not indica instrução negativa.')],
    guidedSummary: task('Complete: The person has a ___ and a ___. They should drink ___, rest and take medicine after ___.', '', 'headache / cough / water / lunch'),
    connectedProduction: task('Escreva 4 frases dando conselho simples para dor de cabeça.'),
    selfAssessment: [task('Consigo identificar sintomas?'), task('Consigo entender instrução de remédio?'), task('Consigo reconhecer alerta com if?')],
    lessonRecap: ['Health notes mostram problema, conselho e alerta.', 'Take medicine = tomar remédio.', 'Do not indica proibição/instrução negativa.', 'If pode introduzir alerta.'],
    nextLessonBridge: 'No Listening, você vai ouvir uma conversa na farmácia.',
  }),

  createListeningLesson({
    ...common,
    id: 'A2-LISTENING-006',
    order: 6,
    title: 'At the pharmacy',
    objectives: ['Ouvir diálogo simples na farmácia.', 'Identificar sintomas, remédio e instruções.', 'Reconhecer headache, cough, medicine e after lunch.', 'Praticar dictation e shadowing de farmácia.'],
    teacherOpening: 'Nesta escuta, você vai ouvir uma pessoa na farmácia. Primeiro identifique o problema. Depois, o remédio e a instrução. Em saúde, detalhes importam: quando tomar, quantas vezes e quando procurar médico.',
    whyItMatters: 'Farmácia é situação prática e importante. Mesmo em nível A2, você precisa entender sintomas simples e instruções básicas com cuidado.',
    realLifeUseCases: ['Comprar remédio básico.', 'Explicar sintoma simples.', 'Entender como tomar remédio.', 'Perguntar preço.', 'Saber quando procurar médico.'],
    conceptExplanation: 'Ouça por blocos: I have a headache. I have a cough. Take this medicine after lunch. Drink water. See a doctor. Em diálogos de farmácia, sintomas e instruções são prioridade.',
    mentalModel: { title: 'pharmacy listening = symptom + medicine + instruction', summary: 'Ouça problema, remédio e como usar.', steps: ['symptom', 'medicine', 'when', 'warning'] },
    stepByStep: [task('Primeira escuta: sintoma principal.'), task('Segunda escuta: remédio/instrução.'), task('Terceira etapa: alerta.'), task('Leia transcript.'), task('Faça dictation.'), task('Faça shadowing.')],
    portugueseContrast: [task('I have a headache = estou com dor de cabeça.'), task('Take medicine = tomar remédio.'), task('After lunch = depois do almoço.'), task('If you feel worse = se você se sentir pior.')],
    guidedDiscovery: [task('I have... introduz sintoma.'), task('Take this medicine introduz instrução.'), task('If... see a doctor introduz alerta.')],
    guidedBeforeQuiz: [task('Primeira escuta: qual sintoma?'), task('Segunda escuta: quando tomar remédio?')],
    listeningPreparation: [task('Não leia transcript antes da primeira escuta.'), task('Prepare: headache, cough, medicine, after lunch, doctor, water.'), task('Objetivo: sintoma + instrução.')],
    keyWordsToHear: [vocab('headache','dor de cabeça'), vocab('cough','tosse'), vocab('medicine','remédio'), vocab('after lunch','depois do almoço'), vocab('doctor','médico'), vocab('water','água')],
    audioScript: `Customer: Hello. I have a headache and a cough.
Pharmacist: Do you have a fever?
Customer: No, I don’t.
Pharmacist: Okay. You can take this medicine after lunch. Drink a lot of water and rest.
Customer: How much is it?
Pharmacist: It is twelve dollars.
Customer: Thank you.
Pharmacist: If you feel worse tomorrow, see a doctor.`,
    firstListenTasks: [task('Sem transcript: onde acontece a conversa?', 'pharmacy'), task('Sem transcript: a pessoa tem febre?', 'no')],
    secondListenTasks: [task('Quais sintomas?', 'headache and cough'), task('Quando tomar remédio?', 'after lunch'), task('Quanto custa?', 'twelve dollars'), task('Quando procurar médico?', 'if you feel worse tomorrow')],
    transcript: `Customer: Hello. I have a headache and a cough.
Pharmacist: Do you have a fever?
Customer: No, I don’t.
Pharmacist: Okay. You can take this medicine after lunch. Drink a lot of water and rest.
Customer: How much is it?
Pharmacist: It is twelve dollars.
Customer: Thank you.
Pharmacist: If you feel worse tomorrow, see a doctor.`,
    vocabulary: [vocab('pharmacist', 'farmacêutico'), vocab('fever', 'febre'), vocab('a lot of water', 'bastante água'), vocab('feel worse', 'sentir-se pior')],
    shadowing: [task('I have a headache and a cough.'), task('Do you have a fever?'), task('You can take this medicine after lunch.'), task('Drink a lot of water and rest.'), task('If you feel worse tomorrow, see a doctor.')],
    dictationTasks: [task('Digite: I have a headache and a cough.', 'I have a headache and a cough.'), task('Digite: Take this medicine after lunch.', 'Take this medicine after lunch.'), task('Digite: If you feel worse tomorrow, see a doctor.', 'If you feel worse tomorrow, see a doctor.')],
    pronunciationChunks: [task('I have a headache', 'Bloco de sintoma.'), task('after lunch', 'Tempo em bloco.'), task('feel worse tomorrow', 'Atenção ao worse.')],
    listeningComprehension: [q('What symptoms does the customer have?', 'headache and cough', 'I have a headache and a cough.', '', ['headache and cough','fever and pain','stomachache']), q('Does the customer have a fever?', 'no', 'No, I don’t.', '', ['no','yes','not mentioned']), q('When should the customer take the medicine?', 'after lunch', 'take this medicine after lunch', '', ['after lunch','before bed','in the morning']), q('How much is the medicine?', 'twelve dollars', 'It is twelve dollars.', '', ['twelve dollars','ten dollars','twenty dollars'])],
    oralProduction: task('Pratique: explique um sintoma simples e pergunte preço do remédio.'),
    selfAssessment: [task('Consegui ouvir sintomas?'), task('Consegui ouvir instrução?'), task('Consegui repetir frase de farmácia?')],
    lessonRecap: ['Pharmacy listening prioriza sintoma e instrução.', 'I have... fala problema.', 'Take medicine after lunch é instrução.', 'If... see a doctor é alerta.'],
    nextLessonBridge: 'No Speaking, você vai praticar compra de roupa e preços.',
  }),

  createSpeakingLesson({
    ...common,
    id: 'A2-SPEAKING-006',
    order: 6,
    title: 'Buy clothes and ask prices',
    objectives: ['Comprar roupa em diálogo simples.', 'Perguntar preço, tamanho, cor e desconto.', 'Pedir para experimentar e perguntar sobre troca.', 'Gravar diálogo de loja.'],
    teacherOpening: 'Nesta aula, você vai praticar compra de roupa. Use perguntas úteis: How much is it? Do you have size L? Can I try it on? Can I pay by card? Can I exchange it?',
    whyItMatters: 'Comprar roupa exige detalhes rápidos. Você precisa perguntar, entender resposta e decidir se compra ou não.',
    realLifeUseCases: ['Comprar jaqueta/camisa/sapatos.', 'Pedir tamanho maior/menor.', 'Perguntar preço/desconto.', 'Pedir para experimentar.', 'Perguntar sobre troca.'],
    conceptExplanation: 'O diálogo de loja tem sequência: item, size, color, price, try on, payment, exchange. Você pode falar com frases curtas e educadas.',
    mentalModel: { title: 'shopping dialogue', summary: 'Procure item, tamanho, preço e decisão.', steps: ['I’m looking for...', 'Do you have size...?', 'How much is it?', 'Can I try it on?', 'Can I exchange it?'] },
    stepByStep: [task('Diga o item que procura.'), task('Pergunte tamanho/cor.'), task('Pergunte preço.'), task('Peça para experimentar.'), task('Pergunte pagamento/troca.'), task('Decida e agradeça.')],
    portugueseContrast: [task('How much is it? pergunta preço.'), task('Can I try it on? é experimentar roupa.'), task('Pay by card = pagar com cartão.'), task('Exchange = trocar.')],
    guidedDiscovery: [task('I’m looking for... abre compra.'), task('Do you have size L? pede disponibilidade.'), task('Can I try it on? pede provador.')],
    guidedBeforeQuiz: [task('Repita: I’m looking for a jacket.'), task('Repita: Do you have size L?'), task('Repita: How much is it?'), task('Repita: Can I try it on?')],
    speakingSituation: 'Você está em uma loja comprando uma roupa.',
    modelPhrases: [phrase('I’m looking for a jacket.', 'Estou procurando uma jaqueta.'), phrase('Do you have size L?', 'Tem tamanho L/G?'), phrase('How much is it?', 'Quanto custa?'), phrase('Can I try it on?', 'Posso experimentar?'), phrase('Can I pay by card?', 'Posso pagar com cartão?'), phrase('Can I exchange it if it doesn’t fit?', 'Posso trocar se não servir?')],
    pronunciationChunks: [task('looking for a', 'Conecte looking-for-a.'), task('How much is it', 'Pergunta em bloco.'), task('try it on', 'Conecte as três palavras.')],
    repeatAfterMe: [task('I’m looking for a jacket.'), task('Do you have size L?'), task('How much is it?'), task('Can I try it on?'), task('Can I pay by card?'), task('Can I exchange it?')],
    substitutionDrills: [task('jacket → T-shirt', 'I’m looking for a T-shirt.'), task('size L → size M', 'Do you have size M?'), task('card → cash', 'Can I pay in cash?')],
    guidedSpeaking: [task('Diga o que procura.'), task('Pergunte tamanho.'), task('Pergunte preço.'), task('Peça para experimentar.'), task('Pergunte sobre troca.')],
    recordingTasks: [task('Grave 6 perguntas de loja.'), task('Grave diálogo de 8 linhas cliente/vendedor.'), task('Grave versão final com preço, tamanho e troca.')],
    freeSpeaking: task('Simule uma compra de roupa por até 60 segundos.'),
    feedbackChecklist: [task('Perguntei preço?'), task('Perguntei tamanho/cor?'), task('Pedi para experimentar?'), task('Perguntei pagamento/troca?'), task('Usei please/thank you?')],
    selfAssessment: [task('Consigo comprar roupa em inglês?'), task('Consigo perguntar preço e tamanho?'), task('Consigo perguntar sobre troca?')],
    lessonRecap: ['Compra de roupa usa perguntas curtas.', 'How much pergunta preço.', 'Try it on é essencial.', 'Exchange resolve troca.'],
    nextLessonBridge: 'Na Writing, você vai escrever uma mensagem de compra/troca.',
  }),

  createWritingLesson({
    ...common,
    id: 'A2-WRITING-006',
    order: 6,
    title: 'Write a shopping message',
    objectives: ['Escrever mensagem curta sobre compra.', 'Perguntar preço, tamanho, disponibilidade ou troca.', 'Explicar problema simples com roupa/produto.', 'Revisar clareza, educação e pontuação.'],
    teacherOpening: 'Agora você vai escrever uma mensagem de compra. Pode ser para perguntar preço, tamanho ou pedir troca: Hello, I bought this jacket yesterday, but it is too small. Can I exchange it for size L?',
    whyItMatters: 'Muitas compras acontecem por mensagem. Você precisa escrever curto, claro e educado para resolver preço, tamanho, disponibilidade e troca.',
    realLifeUseCases: ['Perguntar preço no chat.', 'Perguntar se tem tamanho/cor.', 'Pedir troca.', 'Explicar problema com produto.', 'Confirmar forma de pagamento.'],
    conceptExplanation: 'Uma shopping message A2 tem contexto + pedido. Contexto: I bought this jacket yesterday. Problema: It is too small. Pedido: Can I exchange it for size L? Fechamento: Thank you.',
    mentalModel: { title: 'shopping message = contexto + problema + pedido', summary: 'Explique o suficiente para resolver.', steps: ['Hello', 'I bought...', 'It is...', 'Can I...?', 'Thank you'] },
    stepByStep: [task('Comece com Hello.'), task('Diga o item comprado ou desejado.'), task('Explique preço/tamanho/problema.'), task('Faça pedido claro.'), task('Agradeça.'), task('Revise ? em perguntas.')],
    portugueseContrast: [task('Não escreva “I want change”.'), task('Use Can I exchange it?'), task('Use too small/too big para tamanho.'), task('Use for size L para troca de tamanho.')],
    guidedDiscovery: [task('I bought this jacket dá contexto.'), task('It is too small mostra problema.'), task('Can I exchange it? faz pedido.')],
    guidedBeforeQuiz: [task('Modelo: Hello, I bought this jacket yesterday.'), task('Modelo: It is too small.'), task('Modelo: Can I exchange it for size L?'), task('Modelo: Thank you.')],
    writingPurpose: 'Escrever mensagem clara sobre compra/troca.',
    modelText: `Hello, I bought this blue jacket yesterday, but it is too small. I didn’t try it on in the store because I was in a hurry. Can I exchange it for size L? I have the receipt. Thank you.`,
    writingBlocks: [task('Greeting', 'Hello,'), task('Context', 'I bought this blue jacket yesterday.'), task('Problem', 'It is too small.'), task('Reason/detail', 'I didn’t try it on in the store.'), task('Request', 'Can I exchange it for size L?'), task('Closing', 'Thank you.')],
    guidedSubstitution: [task('Troque jacket por shoes/T-shirt.'), task('Troque too small por too big/wrong color.'), task('Troque size L por size M.'), task('Troque exchange por return.')],
    grammarForWriting: [task('Use Past Simple para bought/didn’t try.'), task('Use Can I...? para pedido.'), task('Use too + adjective para problema.'), task('Use ? em pergunta.'), task('Use thank you para fechar.')],
    checklist: [task('Incluí item?'), task('Expliquei problema?'), task('Fiz pedido claro?'), task('Usei ? corretamente?'), task('Usei tom educado?')],
    draftTask: task('Escreva uma mensagem pedindo troca de roupa ou perguntando preço/tamanho.'),
    revisionTask: task('Revise contexto, problema, pedido, pontuação e educação.'),
    commonMistakes: [mistake('I want change size.', 'Can I exchange it for size L?', 'Pedido natural e claro.'), mistake('It is very small for me.', 'It is too small for me.', 'Too indica excesso/problema.'), mistake('Can I exchange it.', 'Can I exchange it?', 'Pergunta precisa de ?')],
    productionTasks: [task('Escreva mensagem perguntando preço.'), task('Escreva mensagem pedindo tamanho.'), task('Escreva mensagem pedindo troca.'), task('Reescreva versão final com 5 frases.')],
    selfAssessment: [task('Consigo escrever mensagem de compra?'), task('Consigo explicar problema de tamanho?'), task('Consigo pedir troca educadamente?')],
    lessonRecap: ['Shopping message precisa de contexto e pedido claro.', 'Exchange é trocar.', 'Too small/too big explicam problema.', 'Can I...? deixa o pedido educado.'],
    nextLessonBridge: 'No próximo bloco A2.2, você fechará direções/cidade e as últimas gramáticas do pacote.',
  }),
]);

export const A2_DEEP_PAST_STORIES_PART4_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(A2_DEEP_PAST_STORIES_PART4.filter((lesson) => lesson.pillar === 'grammar')),
  vocabulary: Object.freeze(A2_DEEP_PAST_STORIES_PART4.filter((lesson) => lesson.pillar === 'vocabulary')),
  reading: Object.freeze(A2_DEEP_PAST_STORIES_PART4.filter((lesson) => lesson.pillar === 'reading')),
  listening: Object.freeze(A2_DEEP_PAST_STORIES_PART4.filter((lesson) => lesson.pillar === 'listening')),
  speaking: Object.freeze(A2_DEEP_PAST_STORIES_PART4.filter((lesson) => lesson.pillar === 'speaking')),
  writing: Object.freeze(A2_DEEP_PAST_STORIES_PART4.filter((lesson) => lesson.pillar === 'writing')),
});
