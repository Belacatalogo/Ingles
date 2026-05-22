import { createGrammarLesson, createVocabularyLesson } from '../../../schemas/index.js';

const level = 'A1';
const status = 'ready';
function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function ex(text, translation, why = '', warning = '') { return { text, translation, why, warning }; }

const common = { level, status, estimatedMinutes: 60, tags: ['a1-5', 'review', 'checkpoint-prep', 'deep-approved-target'] };

export const A1_DEEP_REVIEWS_GRAMMAR_VOCABULARY = Object.freeze([
  createGrammarLesson({
    ...common,
    id: 'A1-GRAMMAR-025',
    order: 25,
    title: 'Review Grammar A1 part 1',
    objectives: ['Revisar pronomes, verbo to be e possessivos.', 'Revisar artigos, plural, demonstrativos e descrição simples.', 'Corrigir erros comuns antes do checkpoint.', 'Produzir frases A1 limpas sobre identidade, família e objetos.'],
    teacherOpening: 'Esta é uma revisão guiada, não uma aula nova. O objetivo é consolidar o que você já aprendeu no A1.1 e A1.2: subject pronouns, verb to be, short answers, possessives, a/an, plural, this/that/these/those, there is/there are inicial, have/has e adjetivos simples.',
    whyItMatters: 'Se a base do A1 estiver instável, as próximas frases ficam frágeis. Esta revisão limpa erros que brasileiros repetem: I am have, she are, a apple, this books, he name is, there is two chairs.',
    realLifeUseCases: ['Apresentar-se com segurança.', 'Falar da família.', 'Descrever objetos e pessoas.', 'Responder perguntas curtas.', 'Preparar-se para o Grammar Checkpoint A1.'],
    conceptExplanation: 'A revisão reúne blocos essenciais: I am, you are, she is; my/your/his/her; a/an; plural com -s; this/that/these/those; there is/there are; have/has; adjective + noun. O foco é precisão antes de velocidade.',
    mentalModel: { title: 'Base A1 limpa', summary: 'Sujeito certo + verbo certo + complemento simples.', steps: ['I am Luis.', 'She is my sister.', 'This is a book.', 'There are two chairs.'] },
    stepByStep: [task('Revise sujeitos e verbo to be.'), task('Revise possessivos.'), task('Revise artigos e plural.'), task('Revise demonstrativos.'), task('Revise there is/there are e have/has.'), task('Produza frases curtas e corrija erros.')],
    portugueseContrast: [task('Não traduza “eu tenho 20 anos” como I have 20 years.', 'Use I am 20 years old.'), task('Não use she are.', 'Use she is.'), task('Não use a antes de som de vogal.', 'an apple'), task('Não use this com plural.', 'these books')],
    guidedDiscovery: [task('I pede am.'), task('He/she/it pede is.'), task('You/we/they pede are.'), task('A/an depende do som inicial.'), task('There are combina com plural.')],
    guidedBeforeQuiz: [task('Complete: I ___ from Brazil.', 'am'), task('Complete: She ___ my sister.', 'is'), task('Complete: ___ apple.', 'an'), task('Complete: There ___ two books.', 'are')],
    grammarGoal: 'Consolidar a base gramatical A1.1/A1.2 antes do checkpoint.',
    formationGuide: [task('to be: I am / you are / he is'), task('possessive: my name / her sister / his phone'), task('articles: a book / an apple'), task('demonstratives: this book / these books'), task('there: there is one / there are two')],
    whenToUse: [task('Use to be para identidade, origem, idade e descrição.'), task('Use possessivos antes de substantivos.'), task('Use a/an com singular contável.'), task('Use there is/are para existência em lugar.')],
    whenNotToUse: [task('Não misture am/is/are com have sem necessidade.'), task('Não use a/an com plural.'), task('Não use this para plural.'), task('Não use there is com plural.')],
    grammarTable: [
      { pattern: 'to be', example: 'She is my sister.', translation: 'Ela é minha irmã.' },
      { pattern: 'possessive', example: 'His name is João.', translation: 'O nome dele é João.' },
      { pattern: 'a/an', example: 'This is an apple.', translation: 'Isto é uma maçã.' },
      { pattern: 'there are', example: 'There are two chairs.', translation: 'Tem duas cadeiras.' }
    ],
    teacherExamples: [
      { english: 'I am from Brazil.', translation: 'Eu sou do Brasil.', why: 'Identidade/origem com to be.' },
      { english: 'Her brother is a teacher.', translation: 'O irmão dela é professor.', why: 'Possessivo + to be.' },
      { english: 'These books are new.', translation: 'Estes livros são novos.', why: 'These + plural + are.' },
      { english: 'There is a table in the room.', translation: 'Tem uma mesa no cômodo.', why: 'Existência singular.' }
    ],
    commonBrazilianMistakes: [mistake('She are my sister.', 'She is my sister.', 'She/he/it é singular, combina com is.'), mistake('He name is Pedro.', 'His name is Pedro.', 'His é possessivo.'), mistake('A apple.', 'An apple.', 'Apple começa com som de vogal.'), mistake('This books are good.', 'These books are good.', 'Plural usa these.'), mistake('There is two chairs.', 'There are two chairs.', 'Plural usa there are.')],
    controlledPractice: [task('Complete: My mother ___ a nurse.', 'is'), task('Complete: ___ name is Ana. (ela)', 'Her'), task('Complete: This is ___ orange.', 'an'), task('Complete: ___ are my books.', 'These'), task('Complete: There ___ one desk.', 'is')],
    errorCorrectionPractice: [task('Corrija: I is Brazilian.', 'I am Brazilian.'), task('Corrija: She have 25 years old.', 'She is 25 years old.'), task('Corrija: These is my phone.', 'This is my phone.'), task('Corrija: There are a bed.', 'There is a bed.')],
    transformationPractice: [task('Transforme em negativa: She is my sister.', 'She is not my sister.'), task('Transforme em pergunta: You are Brazilian.', 'Are you Brazilian?'), task('Transforme para plural: This is a book.', 'These are books.')],
    translationPractice: [task('Eu sou do Brasil.', 'I am from Brazil.'), task('O nome dela é Maria.', 'Her name is Maria.'), task('Tem duas cadeiras na sala.', 'There are two chairs in the room.')],
    productionTasks: [task('Escreva 6 frases sobre você e sua família usando to be e possessivos.'), task('Escreva 5 frases descrevendo objetos com a/an, this/that/these/those.'), task('Escreva 4 frases com there is/there are.')],
    finalChecklist: [task('Revisei am/is/are?'), task('Usei possessivos corretos?'), task('Usei a/an por som?'), task('Usei singular/plural corretamente?')],
    selfAssessment: [task('Consigo corrigir she are?'), task('Consigo usar my/your/his/her?'), task('Consigo diferenciar this/these?'), task('Consigo usar there is/are?')],
    lessonRecap: ['A base A1 depende de to be limpo.', 'Possessivos vêm antes de substantivos.', 'A/an depende do som inicial.', 'This/that são singulares; these/those são plurais.', 'There is/are descreve existência.'],
    nextLessonBridge: 'A próxima revisão de Grammar A1 cobre present simple, preposições, can, imperatives, object pronouns e conectores.',
  }),
  createGrammarLesson({
    ...common,
    id: 'A1-GRAMMAR-026',
    order: 26,
    title: 'Review Grammar A1 part 2',
    objectives: ['Revisar present simple, frequência e preposições.', 'Revisar can/can’t, imperatives, object pronouns e conectores.', 'Preparar produção final antes do checkpoint.', 'Identificar erros de do/does, can to, help I e because incompleto.'],
    teacherOpening: 'Esta revisão fecha a gramática A1. Agora você vai consolidar rotina e situações práticas: present simple, do/does, adverbs of frequency, prepositions of time/place, can, imperatives, object pronouns e and/but/because. É uma revisão de precisão antes do checkpoint.',
    whyItMatters: 'Essas estruturas fazem o inglês funcionar no dia a dia: rotina, horários, lugares, pedidos, instruções e ajuda. Se você domina isso, consegue criar frases úteis sem depender de tradução palavra por palavra.',
    realLifeUseCases: ['Falar da rotina.', 'Perguntar hábitos.', 'Pedir ajuda.', 'Dar direções.', 'Descrever localização.', 'Conectar ideias simples.'],
    conceptExplanation: 'Present simple usa verbo base com I/you/we/they e -s com he/she/it. Perguntas usam do/does. Can usa verbo base sem to. Imperatives começam com verbo base. Object pronouns recebem ação. And soma, but contrasta e because explica.',
    mentalModel: { title: 'Ação, pergunta e situação prática', summary: 'Use a estrutura certa para cada intenção.', steps: ['I work.', 'She works.', 'Do you work?', 'Can you help me?', 'Turn left.', 'I wear a jacket because it is cold.'] },
    stepByStep: [task('Revise present simple afirmativo.'), task('Revise do/does para perguntas e negativas.'), task('Revise frequência e tempo.'), task('Revise can e imperatives.'), task('Revise object pronouns.'), task('Revise and/but/because.')],
    portugueseContrast: [task('Não use do com can.', 'Can you help me?'), task('Não esqueça -s em he/she/it no present simple.'), task('Não use can to.'), task('Não use help I.'), task('Because precisa de motivo completo.')],
    guidedDiscovery: [task('He works precisa de -s.'), task('Does she work? usa does e verbo base.'), task('Can you repeat? não usa do.'), task('Help me usa object pronoun.'), task('Because explica motivo.')],
    guidedBeforeQuiz: [task('Complete: She ___ English at night.', 'studies'), task('Complete: ___ you work on Monday?', 'Do'), task('Complete: Can you ___ me?', 'help'), task('Complete: I wear a coat ___ it is cold.', 'because')],
    grammarGoal: 'Consolidar gramática A1.3/A1.4 antes do checkpoint.',
    formationGuide: [task('Present simple: I work / she works'), task('Question: Do you work? / Does she work?'), task('Can: can + verb base'), task('Imperative: Turn left.'), task('Object pronoun: Help me.'), task('Connector: because + reason')],
    whenToUse: [task('Present simple para rotina.'), task('Do/does para perguntas de hábito.'), task('Can para habilidade/pedido.'), task('Imperative para instrução.'), task('Object pronouns depois de verbos.'), task('Because para motivo.')],
    whenNotToUse: [task('Não use does + verbo com s.', 'Does she work?'), task('Não use can to.'), task('Não use subject pronoun depois de help/call.'), task('Não use because sem frase depois.')],
    grammarTable: [
      { pattern: 'present simple', example: 'She studies English.', translation: 'Ela estuda inglês.' },
      { pattern: 'question', example: 'Do you work today?', translation: 'Você trabalha hoje?' },
      { pattern: 'can', example: 'Can you help me?', translation: 'Você pode me ajudar?' },
      { pattern: 'imperative', example: 'Turn left.', translation: 'Vire à esquerda.' },
      { pattern: 'because', example: 'I wear boots because it is rainy.', translation: 'Uso botas porque está chuvoso.' }
    ],
    teacherExamples: [
      { english: 'I usually study at night.', translation: 'Eu geralmente estudo à noite.', why: 'Rotina + frequência.' },
      { english: 'Does he work on Saturday?', translation: 'Ele trabalha no sábado?', why: 'Pergunta com does.' },
      { english: 'Can you repeat it, please?', translation: 'Você pode repetir isso, por favor?', why: 'Pedido educado + object pronoun.' },
      { english: 'Go straight and turn right.', translation: 'Siga em frente e vire à direita.', why: 'Imperatives em direções.' }
    ],
    commonBrazilianMistakes: [mistake('He study English.', 'He studies English.', 'He/she/it usa -s.'), mistake('Does she works?', 'Does she work?', 'Com does, verbo base.'), mistake('I can to help.', 'I can help.', 'Can não usa to.'), mistake('Help I.', 'Help me.', 'Depois do verbo, use me.'), mistake('I am happy because.', 'I am happy because it is sunny.', 'Because precisa de motivo.')],
    controlledPractice: [task('Complete: He ___ at night.', 'works'), task('Complete: Does she ___ English?', 'study'), task('Complete: Can you ___ it?', 'repeat'), task('Complete: Turn ___ at the corner.', 'left/right'), task('Complete: I am tired, ___ I am okay.', 'but')],
    errorCorrectionPractice: [task('Corrija: She go to school.', 'She goes to school.'), task('Corrija: Do he work?', 'Does he work?'), task('Corrija: Can you to help me?', 'Can you help me?'), task('Corrija: Call she.', 'Call her.')],
    transformationPractice: [task('Transforme em pergunta: You work today.', 'Do you work today?'), task('Transforme em negativa: She studies English.', 'She does not study English.'), task('Una com because: I wear a jacket. It is cold.', 'I wear a jacket because it is cold.')],
    translationPractice: [task('Ela estuda inglês à noite.', 'She studies English at night.'), task('Você pode me ajudar?', 'Can you help me?'), task('Vire à esquerda.', 'Turn left.'), task('Estou cansado, mas estou bem.', 'I am tired, but I am okay.')],
    productionTasks: [task('Escreva 5 frases sobre sua rotina.'), task('Escreva 5 perguntas com do/does/can.'), task('Escreva um mini diálogo pedindo ajuda.'), task('Escreva 5 frases com and/but/because.')],
    finalChecklist: [task('Usei -s em he/she/it?'), task('Usei do/does corretamente?'), task('Evitei can to?'), task('Usei object pronouns depois do verbo?'), task('Usei because com motivo completo?')],
    selfAssessment: [task('Consigo falar rotina?'), task('Consigo pedir ajuda?'), task('Consigo dar instrução?'), task('Consigo conectar ideias simples?')],
    lessonRecap: ['Present simple organiza rotina.', 'Do/does formam perguntas e negativas.', 'Can não usa to.', 'Imperatives dão instruções.', 'Object pronouns recebem ação.', 'And/but/because conectam ideias.'],
    nextLessonBridge: 'Depois desta revisão, você estará pronto para o Grammar A1 Checkpoint.',
  }),
  createVocabularyLesson({
    ...common,
    id: 'A1-VOCABULARY-020',
    order: 20,
    title: 'Review Vocabulary A1',
    objectives: ['Revisar vocabulário essencial A1 por temas.', 'Recuperar palavras de identidade, família, rotina, comida, lugares, casa, roupas e sentimentos.', 'Usar vocabulário em frases, não só listas.', 'Preparar o Vocabulary A1 Checkpoint.'],
    teacherOpening: 'Esta é a revisão geral de vocabulário A1. O foco não é decorar uma lista solta, mas organizar palavras por tema e usar cada grupo em frases úteis. Você vai revisar identity, family, jobs, objects, adjectives, days/time, routine, food, places, house, clothes, weather, feelings e common verbs.',
    whyItMatters: 'Vocabulário só funciona quando você consegue lembrar, reconhecer e usar em frase. Esta revisão mistura recall, associação por tema, chunks e produção curta para preparar o checkpoint.',
    realLifeUseCases: ['Falar sobre você.', 'Falar da família e rotina.', 'Pedir comida.', 'Perguntar lugares.', 'Descrever casa e roupa.', 'Dizer clima e sentimentos.'],
    conceptExplanation: 'Organize seu vocabulário por temas. Dentro de cada tema, escolha palavras de alta utilidade e crie frases. Exemplo: food → coffee, water, sandwich → Can I have a coffee, please? Places → pharmacy, bank → Where is the pharmacy?',
    mentalModel: { title: 'tema → palavras → frase útil', summary: 'Palavra solta vira inglês real dentro de frase.', steps: ['Food: coffee → Can I have a coffee?', 'Places: pharmacy → Where is the pharmacy?', 'Routine: work → I work in the morning.'] },
    stepByStep: [task('Revise temas em blocos.'), task('Liste palavras por tema.'), task('Transforme palavras em frases.'), task('Misture temas em mini apresentações.'), task('Marque palavras fracas para revisão.')],
    portugueseContrast: [task('Não traduza roupa com use; use wear.'), task('Library não é livraria.'), task('Breakfast/lunch/dinner são refeições.'), task('Room pode ser cômodo; bedroom é quarto de dormir.')],
    guidedDiscovery: [task('Coffee pertence a food/drinks.'), task('Pharmacy pertence a places.'), task('Bedroom pertence a house.'), task('Tired pertence a feelings.')],
    guidedBeforeQuiz: [task('Liste 5 palavras de family.'), task('Liste 5 palavras de routine.'), task('Liste 5 palavras de practical situations.'), task('Crie 3 frases com palavras revisadas.')],
    topicContext: 'Você vai organizar todo o vocabulário A1 em temas e usar em frases curtas.',
    essentialWords: [vocab('name', 'nome', 'My name is Luis.'), vocab('country', 'país', 'I am from Brazil.'), vocab('family', 'família', 'My family is small.'), vocab('teacher', 'professor', 'She is a teacher.'), vocab('book', 'livro', 'This is a book.'), vocab('big', 'grande', 'My house is big.'), vocab('Monday', 'segunda-feira', 'I work on Monday.'), vocab('morning', 'manhã', 'I study in the morning.'), vocab('wake up', 'acordar', 'I wake up at six.'), vocab('coffee', 'café', 'Can I have a coffee?'), vocab('pharmacy', 'farmácia', 'Where is the pharmacy?'), vocab('bedroom', 'quarto', 'There is a bed in my bedroom.'), vocab('jacket', 'jaqueta', 'I wear a jacket.'), vocab('rainy', 'chuvoso', 'It is rainy.'), vocab('tired', 'cansado', 'I am tired.'), vocab('help', 'ajudar', 'Can you help me?')],
    chunks: [{ chunk: 'My name is...', translation: 'Meu nome é...', example: 'My name is Luis.' }, { chunk: 'I work in the morning.', translation: 'Eu trabalho de manhã.', example: 'I work in the morning.' }, { chunk: 'Can I have...?', translation: 'Pode me ver...?', example: 'Can I have water?' }, { chunk: 'Where is the...?', translation: 'Onde fica...?', example: 'Where is the bank?' }, { chunk: 'I wear... because...', translation: 'Eu uso... porque...', example: 'I wear a jacket because it is cold.' }],
    pronunciationFocus: { title: 'Foco sonoro de revisão', tips: ['Revise palavras que brasileiros confundem: clothes, school, kitchen, tired, pharmacy.', 'Leia chunks em voz alta, não apenas palavras soltas.'] },
    dangerousConfusions: [task('Library = biblioteca; bookstore = livraria.'), task('Kitchen ≠ chicken.'), task('Wear para roupa; use para ferramenta/objeto.'), task('Room pode ser cômodo; bedroom é quarto.'), task('Food é comida geral; meal é refeição.')],
    collocations: [task('have breakfast'), task('go to work'), task('study English'), task('wear a jacket'), task('drink water'), task('next to the bank'), task('in the bedroom'), task('help me')],
    miniDialogues: [{ title: 'A1 review dialogue', lines: ['A: What is your name?', 'B: My name is Luis.', 'A: Where is the pharmacy?', 'B: It is next to the bank.', 'A: How do you feel?', 'B: I am tired, but I am okay.'], focus: 'Mistura de temas A1.' }],
    examples: [ex('I wake up at six and study English at night.', 'Eu acordo às seis e estudo inglês à noite.', 'Rotina.'), ex('Can I have a coffee, please?', 'Pode me ver um café, por favor?', 'Comida/pedido.'), ex('The pharmacy is next to the bank.', 'A farmácia fica ao lado do banco.', 'Lugares.'), ex('There is a bed in my bedroom.', 'Tem uma cama no meu quarto.', 'Casa.'), ex('I wear a jacket because it is cold.', 'Uso jaqueta porque está frio.', 'Roupa/clima.')],
    recognitionPractice: [{ question: 'Review Vocabulary A1 — qual vocabulário desta aula significa "nome"?', options: ['name', 'country', 'family'], answer: 'name', explanation: 'name = nome; vocabulário trabalhado nesta aula de Review Vocabulary A1.' }, task('Classifique: coffee', 'food/drinks'), task('Classifique: pharmacy', 'places'), task('Classifique: jacket', 'clothes'), task('Classifique: tired', 'feelings'), task('Classifique: wake up', 'routine')],
    usagePractice: [task('Crie uma frase com coffee.'), task('Crie uma frase com pharmacy.'), task('Crie uma frase com bedroom.'), task('Crie uma frase com jacket.'), task('Crie uma frase com tired.')],
    productionTasks: [task('Liste 10 palavras A1 separadas por tema.'), task('Escreva 8 frases usando 8 temas diferentes.'), task('Crie uma mini apresentação usando pelo menos 12 palavras A1.'), task('Marque 5 palavras que você precisa revisar mais.')],
    spacedReview: [task('Revisar palavras fracas amanhã.'), task('Revisar chunks de pedido e localização.'), task('Refazer lista por tema antes do checkpoint.')],
    selfAssessment: [task('Consigo lembrar palavras por tema?'), task('Consigo usar palavras em frases?'), task('Consigo evitar confusões comuns?'), task('Estou pronto para o checkpoint de Vocabulary?')],
    lessonRecap: ['Vocabulário A1 deve ser organizado por tema.', 'Palavras precisam virar frases úteis.', 'Chunks aceleram fala e escrita.', 'Revisão prepara o checkpoint.'],
    nextLessonBridge: 'Depois desta revisão, você estará pronto para o Vocabulary A1 Checkpoint.',
  }),
]);

export const A1_DEEP_REVIEWS_GRAMMAR_VOCABULARY_BY_PILLAR = Object.freeze({
  grammar: Object.freeze(A1_DEEP_REVIEWS_GRAMMAR_VOCABULARY.filter((lesson) => lesson.pillar === 'grammar')),
  vocabulary: Object.freeze(A1_DEEP_REVIEWS_GRAMMAR_VOCABULARY.filter((lesson) => lesson.pillar === 'vocabulary')),
});
