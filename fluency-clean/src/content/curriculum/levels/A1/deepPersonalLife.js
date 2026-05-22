import { createGrammarLesson, createVocabularyLesson, createReadingLesson, createListeningLesson, createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'A1';
const status = 'ready';
const unit = 'A1.2 Personal life';

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function vocab(word, meaning, example = '', note = '') { return { word, meaning, example, note }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function drill(prompt, answer, variations = []) { return { prompt, answer, variations }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }
function block(label, text, purpose = '') { return { label, text, purpose }; }
function q(question, answer, evidence = '', explanation = '', options = []) { return { question, answer, evidence, explanation, options }; }

const common = {
  level,
  status,
  estimatedMinutes: 55,
  tags: ['a1-2', 'personal-life', 'deep-approved-target'],
};

export const A1_DEEP_PERSONAL_LIFE = Object.freeze([
  createGrammarLesson({
    ...common,
    id: 'A1-GRAMMAR-029-PERSONAL',
    order: 21,
    title: 'My, your, his, her + simple be statements',
    objectives: ['Usar my, your, his e her para falar de vida pessoal.', 'Construir frases simples com be.', 'Evitar confundir possessivos com pronomes pessoais.', 'Produzir frases curtas sobre si e outra pessoa.'],
    teacherOpening: 'Nesta unidade A1.2, você começa a falar de vida pessoal de forma mais completa. Para isso, precisa controlar my, your, his e her. Esses pequenos blocos dizem de quem é a informação: my name, your city, his sister, her phone number. O objetivo não é decorar uma tabela isolada; é usar possessivos em frases reais com verb to be.',
    whyItMatters: 'Vida pessoal aparece em perfis, apresentações, cadastros e conversas simples. Se você troca he por his ou she por her, a frase pode ficar confusa. Esta aula organiza a diferença: he/she são pessoas; his/her mostram posse ou relação. Você vai usar isso para falar de nome, cidade, família e contato.',
    realLifeUseCases: ['Falar seu nome e cidade.', 'Perguntar dados de outra pessoa.', 'Descrever irmão/irmã de alguém.', 'Ler perfis simples.', 'Escrever frases pessoais sem traduzir palavra por palavra.'],
    conceptExplanation: 'My significa meu/minha. Your significa seu/sua ou de vocês. His significa dele. Her significa dela. Depois desses possessivos, normalmente vem um substantivo: my name, your city, his brother, her phone number. Para formar frases, junte possessivo + substantivo + be: My name is Luis. Her city is Recife. His brother is a student.',
    mentalModel: { title: 'Pessoa → possessivo → informação', summary: 'I vira my; you vira your; he vira his; she vira her.', steps: ['I → my name', 'you → your city', 'he → his brother', 'she → her phone number'] },
    stepByStep: [task('Escolha a pessoa: I, you, he ou she.'), task('Escolha o possessivo correto: my, your, his ou her.'), task('Adicione a informação: name, city, family, phone number.'), task('Use is para singular.', 'My name is Luis.'), task('Use are quando a informação for plural.', 'Her parents are from Brazil.')],
    portugueseContrast: [task('Português usa “dele/dela” depois: o irmão dela. Inglês usa her antes: her brother.'), task('Não confunda he com his. He = ele; his = dele.'), task('Não confunda she com her. She = ela; her = dela.'), task('Your pode ser seu/sua ou de vocês. O contexto decide.')],
    guidedDiscovery: [task('Em “His name is Bruno”, his fala de um homem/menino.'), task('Em “Her city is Recife”, her fala de uma mulher/menina.'), task('Em “My phone number is...”, my fala sobre mim.')],
    guidedBeforeQuiz: [task('Complete: ___ name is Ana.', 'Her'), task('Complete: ___ city is Curitiba.', 'His/Her/My/Your'), task('Complete: He is Luis. ___ sister is Carla.', 'His'), task('Complete: She is Ana. ___ brother is Pedro.', 'Her')],
    grammarGoal: 'Usar possessive adjectives my, your, his e her com verb to be em frases pessoais simples.',
    formationGuide: [task('I → my', 'I am Luis. My name is Luis.'), task('you → your', 'You are Ana. Your city is Recife.'), task('he → his', 'He is Bruno. His phone number is 550329.'), task('she → her', 'She is Carla. Her brother is Pedro.')],
    whenToUse: [task('Use my para falar de informação sua.'), task('Use your para perguntar ou falar da informação da pessoa.'), task('Use his para homem/menino.'), task('Use her para mulher/menina.')],
    grammarTable: [
      { pattern: 'My + noun + is...', example: 'My name is Luis.', translation: 'Meu nome é Luis.' },
      { pattern: 'Your + noun + is...', example: 'Your city is Recife.', translation: 'Sua cidade é Recife.' },
      { pattern: 'His + noun + is...', example: 'His brother is a student.', translation: 'O irmão dele é estudante.' },
      { pattern: 'Her + noun + is...', example: 'Her phone number is 550329.', translation: 'O número dela é 550329.' }
    ],
    teacherExamples: [
      { english: 'My family is small.', translation: 'Minha família é pequena.', why: 'my mostra que a família é minha.' },
      { english: 'Your email address is clear.', translation: 'Seu e-mail está claro.', why: 'your fala com a pessoa.' },
      { english: 'His father is a doctor.', translation: 'O pai dele é médico.', why: 'his fala de homem/menino.' },
      { english: 'Her sister is 16 years old.', translation: 'A irmã dela tem 16 anos.', why: 'her fala de mulher/menina.' }
    ],
    commonBrazilianMistakes: [
      { wrong: 'He name is Bruno.', right: 'His name is Bruno.', why: 'He é ele; his é dele.' },
      { wrong: 'She brother is Pedro.', right: 'Her brother is Pedro.', why: 'She é ela; her é dela.' },
      { wrong: 'The city of her is Recife.', right: 'Her city is Recife.', why: 'Em inglês A1, use possessivo antes do substantivo.' },
      { wrong: 'My parents is from Brazil.', right: 'My parents are from Brazil.', why: 'Parents é plural.' }
    ],
    controlledPractice: [task('Complete: ___ name is Luis.', 'My'), task('Complete: Ana is my friend. ___ city is Recife.', 'Her'), task('Complete: Bruno is a student. ___ phone number is 550329.', 'His'), task('Complete: What is ___ email address?', 'your')],
    guidedPractice: [task('Escreva 4 frases: my name, your city, his brother, her phone number.'), task('Transforme: He is Bruno → ___ name is Bruno.', 'His'), task('Transforme: She is Carla → ___ family is small.', 'Her')],
    productionTasks: [task('Escreva 6 frases sobre você e duas pessoas fictícias usando my, your, his e her.')],
    finalChecklist: [task('Usei my para mim?'), task('Usei his para homem/menino?'), task('Usei her para mulher/menina?'), task('Usei is/are corretamente?')],
    selfAssessment: [task('Consigo diferenciar he/his?'), task('Consigo diferenciar she/her?'), task('Consigo criar frases pessoais?')],
    lessonRecap: ['My, your, his e her vêm antes do substantivo.', 'He/she são pessoas; his/her são possessivos.', 'Use is para informação singular.', 'Use are para plural como parents.'],
    nextLessonBridge: 'Na próxima aula de Vocabulary, você vai ampliar o vocabulário de vida pessoal para usar esses possessivos em frases mais naturais.',
  }),

  createVocabularyLesson({
    ...common,
    id: 'A1-VOCABULARY-021-PERSONAL',
    order: 21,
    title: 'Personal life words',
    objectives: ['Aprender palavras de vida pessoal.', 'Usar chunks para falar de rotina, cidade, contato e família.', 'Evitar confusões comuns como address/email address.', 'Criar mini frases pessoais.'],
    teacherOpening: 'Agora que você já tem as bases, precisa de palavras para falar da vida pessoal. Esta aula traz vocabulário útil para perfis e conversas: age, address, email address, phone number, job, class, free time, favorite. Não é lista solta; cada palavra aparece em frases e chunks que você vai reutilizar em Reading, Listening, Speaking e Writing.',
    whyItMatters: 'Sem esse vocabulário, o aluno fica preso em nome, idade e país. Vida pessoal exige falar contato, estudo, tempo livre e preferências básicas. A meta é criar frases simples e úteis, não memorizar tradução isolada.',
    realLifeUseCases: ['Preencher perfil pessoal.', 'Falar contato básico.', 'Dizer algo que gosta.', 'Entender perguntas de cadastro.', 'Falar de tempo livre.'],
    conceptExplanation: 'Vocabulário A1 precisa ser aprendido em chunks. Phone number é um bloco. Email address é outro. Free time é tempo livre. Favorite music é música favorita. Em vez de decorar palavras isoladas, use cada item em frase curta: My phone number is..., My favorite music is..., In my free time, I study English.',
    mentalModel: { title: 'Palavra útil → chunk → frase real', summary: 'Cada palavra precisa virar uma frase que você consegue usar.' },
    stepByStep: [task('Leia a palavra.'), task('Veja o chunk.'), task('Repita a frase exemplo.'), task('Troque uma informação.'), task('Use em uma mini apresentação.')],
    portugueseContrast: [task('Address é endereço físico; email address é e-mail.'), task('Favorite vem antes do substantivo: favorite song.'), task('Free time não é tempo grátis; é tempo livre.'), task('Job é trabalho/emprego; work pode ser verbo ou substantivo.')],
    guidedDiscovery: [task('Qual bloco fala telefone?', 'phone number'), task('Qual bloco fala e-mail?', 'email address'), task('Qual bloco fala tempo livre?', 'free time')],
    guidedBeforeQuiz: [task('Complete: My phone ___ is 550329.', 'number'), task('Complete: My email ___ is luis@example.com.', 'address'), task('Complete: In my free ___, I study English.', 'time')],
    topicContext: 'Vida pessoal A1: contato, rotina simples, estudo, família e preferências.',
    essentialWords: [
      vocab('age', 'idade', 'My age is 20.'), vocab('address', 'endereço físico', 'My address is simple.'), vocab('email address', 'endereço de e-mail', 'My email address is luis@example.com.'), vocab('phone number', 'número de telefone', 'My phone number is 550329.'), vocab('job', 'trabalho/emprego', 'My job is simple.'), vocab('class', 'aula/turma', 'My English class is online.'), vocab('free time', 'tempo livre', 'In my free time, I study English.'), vocab('favorite', 'favorito/favorita', 'My favorite music is calm.'), vocab('hobby', 'hobby', 'My hobby is editing photos.'), vocab('profile', 'perfil', 'This is my profile.')
    ],
    chunks: [
      { chunk: 'My phone number is...', translation: 'Meu número de telefone é...', example: 'My phone number is 550329.' },
      { chunk: 'My email address is...', translation: 'Meu e-mail é...', example: 'My email address is luis@example.com.' },
      { chunk: 'In my free time...', translation: 'No meu tempo livre...', example: 'In my free time, I study English.' },
      { chunk: 'My favorite ... is...', translation: 'Meu/minha ... favorito(a) é...', example: 'My favorite city is Recife.' },
      { chunk: 'My English class is...', translation: 'Minha aula de inglês é...', example: 'My English class is online.' }
    ],
    dangerousConfusions: [task('address ≠ email address', 'Address é endereço físico; email address é e-mail.'), task('free time ≠ grátis', 'Free time é tempo livre.'), task('favorite music/song', 'Favorite vem antes do substantivo.')],
    collocations: [task('phone number', 'Combinação natural.'), task('email address', 'Combinação natural.'), task('favorite music', 'Combinação natural.'), task('English class', 'Combinação natural.'), task('free time', 'Combinação natural.')],
    miniDialogues: [{ title: 'Profile check', focus: 'perguntas de vida pessoal', lines: ['Teacher: What is your phone number?', 'Student: My phone number is 550329.', 'Teacher: What is your favorite hobby?', 'Student: My favorite hobby is editing photos.'] }],
    recognitionPractice: [task('Escolha o bloco para telefone.', 'phone number'), task('Escolha o bloco para e-mail.', 'email address'), task('Escolha o bloco para tempo livre.', 'free time')],
    usagePractice: [task('Complete: My favorite ___ is English.', 'class'), task('Complete: My ___ is editing photos.', 'hobby'), task('Complete: In my free ___, I study.', 'time')],
    productionTasks: [task('Crie 6 frases pessoais usando phone number, email address, free time, favorite e hobby.')],
    selfAssessment: [task('Consigo diferenciar address e email address?'), task('Consigo usar free time?'), task('Consigo falar favorite + noun?')],
    lessonRecap: ['Vida pessoal usa chunks.', 'Phone number e email address são blocos.', 'Free time é tempo livre.', 'Favorite vem antes do substantivo.'],
    nextLessonBridge: 'Na Reading A1.2, você vai ler um perfil pessoal mais completo usando essas palavras.',
  }),

  createReadingLesson({
    ...common,
    id: 'A1-READING-022-PERSONAL',
    order: 21,
    title: 'A personal life profile',
    objectives: ['Ler um perfil pessoal A1.2.', 'Identificar dados pessoais, estudo, hobby e preferência.', 'Responder com evidência textual.', 'Produzir resumo guiado.'],
    teacherOpening: 'Agora o Reading fica um pouco mais completo: não é só nome e país. Você vai ler um perfil com contato, aula, tempo livre e preferência. A estratégia continua a mesma: ideia geral primeiro, detalhes depois, evidência sempre.',
    whyItMatters: 'Perfis reais geralmente misturam várias informações pessoais. Você precisa separar dados de contato, rotina e preferências sem traduzir tudo. Essa aula prepara você para ler bios e perfis simples.',
    realLifeUseCases: ['Ler perfil de estudante.', 'Entender hobby/preferência.', 'Identificar contato básico.', 'Responder com evidência.', 'Escrever perfil parecido.'],
    conceptExplanation: 'Um personal life profile reúne nome, idade, cidade, aula, contato e tempo livre. Leia como uma ficha em parágrafo: procure name, age, city, class, phone number, email address, free time e favorite. As perguntas devem ser respondidas com frase do texto como prova.',
    mentalModel: { title: 'Perfil completo = campos escondidos no texto', summary: 'Leia e preencha mentalmente: name, city, class, contact, hobby.' },
    stepByStep: [task('Leia uma vez para entender quem é a pessoa.'), task('Procure dados pessoais.'), task('Procure estudo/aula.'), task('Procure contato.'), task('Procure hobby/preferência.'), task('Responda com evidência.')],
    portugueseContrast: [task('Email address não é endereço físico.'), task('Favorite vem antes do substantivo.'), task('Free time significa tempo livre.')],
    guidedDiscovery: [task('Que palavras indicam contato?', 'phone number, email address'), task('Que expressão indica tempo livre?', 'free time')],
    guidedBeforeQuiz: [task('Para telefone, procure phone number.'), task('Para hobby, procure hobby ou free time.'), task('Para preferência, procure favorite.')],
    readingPurpose: 'Ler um perfil pessoal A1.2 e encontrar dados, contato, estudo e preferências.',
    preReadingVocabulary: [vocab('phone number','telefone','My phone number is 550329.'), vocab('email address','e-mail','My email address is luis@example.com.'), vocab('free time','tempo livre','In my free time, I study English.'), vocab('favorite','favorito','My favorite hobby is editing photos.'), vocab('profile','perfil','This is my profile.')],
    readingStrategy: [task('Leia como ficha escondida em parágrafo.'), task('Marque contato separado de cidade.'), task('Use evidence antes de responder.'), task('Não traduza tudo na primeira leitura.')],
    mainText: `My name is Luis. I am 20 years old, and I live in Santa Maria. My English class is online. My phone number is 550329, and my email address is luis@example.com. In my free time, I study English and edit photos. My favorite hobby is photo editing. My family is small, and my sister is a student.`,
    firstReadTask: task('Leia uma vez e escolha a ideia geral.', 'O texto é um perfil pessoal de Luis.', 'A personal profile.'),
    secondReadTasks: [task('Encontre a cidade de Luis.', 'I live in Santa Maria.', 'Santa Maria'), task('Encontre o telefone.', 'My phone number is 550329.', '550329'), task('Encontre o e-mail.', 'my email address is luis@example.com.', 'luis@example.com'), task('Encontre o hobby favorito.', 'My favorite hobby is photo editing.', 'photo editing')],
    evidenceQuestions: [q('How old is Luis?', '20 years old', 'I am 20 years old.', 'A idade aparece no início.', ['20','19','21']), q('Where does Luis live?', 'Santa Maria', 'I live in Santa Maria.', 'live in indica cidade.', ['Santa Maria','Recife','Brazil']), q('Is his English class online?', 'Yes', 'My English class is online.', 'A frase diz diretamente.', ['Yes','No','Not mentioned']), q('What is his phone number?', '550329', 'My phone number is 550329.', 'phone number indica telefone.', ['550329','luis@example.com','20']), q('What is his favorite hobby?', 'photo editing', 'My favorite hobby is photo editing.', 'favorite hobby indica preferência.', ['photo editing','English class','phone number'])],
    contextVocabularyTasks: [task('No texto, email address significa e-mail.', 'luis@example.com'), task('No texto, free time mostra atividades fora da aula.', 'study English and edit photos'), task('No texto, favorite hobby mostra preferência principal.', 'photo editing')],
    guidedSummary: task('Complete: Luis is ___. He lives in ___. His class is ___. His favorite hobby is ___.', '', 'Luis is 20. He lives in Santa Maria. His class is online. His favorite hobby is photo editing.'),
    connectedProduction: task('Escreva 5 frases sobre seu perfil pessoal usando city, class, phone number fictício, free time e favorite hobby.'),
    selfAssessment: [task('Consigo localizar contato?'), task('Consigo diferenciar city e email address?'), task('Consigo achar hobby/preferência?')],
    lessonRecap: ['Perfil A1.2 mistura contato, estudo e preferência.', 'Evidence continua obrigatório.', 'Free time mostra atividades pessoais.', 'Favorite hobby mostra preferência.'],
    nextLessonBridge: 'No Listening A1.2, você vai ouvir uma troca curta de informações pessoais parecida com esse perfil.',
  }),

  createListeningLesson({
    ...common,
    id: 'A1-LISTENING-021-PERSONAL',
    order: 21,
    title: 'Personal information exchange',
    objectives: ['Ouvir perguntas sobre vida pessoal.', 'Identificar cidade, telefone, e-mail e hobby.', 'Ouvir primeiro sem transcript.', 'Repetir chunks úteis.'],
    teacherOpening: 'Nesta aula, você vai ouvir uma troca curta de informações pessoais. O foco é reconhecer perguntas como What is your phone number? e What is your favorite hobby? sem olhar o transcript primeiro. Você já conhece os blocos; agora precisa reconhecê-los pelo som.',
    whyItMatters: 'Em cadastros e conversas online, as perguntas vêm em sequência. O aluno precisa entender o tipo de informação pedido antes de responder. Listening A1.2 treina essa identificação rápida.',
    realLifeUseCases: ['Cadastro em aula.', 'Pergunta sobre e-mail.', 'Pergunta sobre telefone.', 'Pergunta sobre hobby.', 'Confirmação de dados pessoais.'],
    conceptExplanation: 'Ouça por blocos: phone number, email address, favorite hobby, free time. Na primeira escuta, entenda a situação. Na segunda, capture detalhes. O transcript vem depois para confirmar.',
    mentalModel: { title: 'Pergunta → tipo de dado → resposta', summary: 'Cada pergunta pede um campo: phone, email, hobby ou city.' },
    stepByStep: [task('Prepare palavras-chave.'), task('Ouça sem transcript.'), task('Identifique a situação geral.'), task('Ouça de novo por detalhes.'), task('Confira transcript.'), task('Faça shadowing.')],
    portugueseContrast: [task('Email address é e-mail, não endereço físico.'), task('Favorite hobby soa como um bloco.'), task('Can you repeat that? pede repetição.')],
    guidedDiscovery: [task('Se ouvir phone number, espere dígitos.'), task('Se ouvir email address, espere e-mail.'), task('Se ouvir hobby, espere atividade.')],
    guidedBeforeQuiz: [task('Primeira escuta: qual é a situação?'), task('Segunda escuta: cidade, telefone, e-mail e hobby.')],
    listeningPreparation: [task('Feche o transcript na primeira escuta.'), task('Prepare: city, phone number, email address, favorite hobby.'), task('Objetivo: identificar tipo de dado e detalhe.')],
    keyWordsToHear: [vocab('city','cidade'), vocab('phone number','telefone'), vocab('email address','e-mail'), vocab('favorite hobby','hobby favorito'), vocab('repeat','repetir')],
    audioScript: `Teacher: What is your city, Luis?
Luis: My city is Santa Maria.
Teacher: What is your phone number?
Luis: My phone number is five five zero three two nine.
Teacher: What is your email address?
Luis: My email address is luis@example.com.
Teacher: What is your favorite hobby?
Luis: My favorite hobby is photo editing.
Teacher: Can you repeat that?
Luis: Photo editing.`,
    firstListenTasks: [task('Sem transcript: qual é a situação?', 'Uma professora confirma dados pessoais.', 'personal information exchange'), task('Sem transcript: aparecem telefone e e-mail?', 'Sim, o áudio menciona telefone e e-mail.', 'yes')],
    secondListenTasks: [task('Qual é a cidade?', 'Santa Maria'), task('Qual é o telefone?', 'five five zero three two nine'), task('Qual é o e-mail?', 'luis@example.com'), task('Qual é o hobby favorito?', 'photo editing')],
    transcript: `Teacher: What is your city, Luis?
Luis: My city is Santa Maria.
Teacher: What is your phone number?
Luis: My phone number is five five zero three two nine.
Teacher: What is your email address?
Luis: My email address is luis@example.com.
Teacher: What is your favorite hobby?
Luis: My favorite hobby is photo editing.
Teacher: Can you repeat that?
Luis: Photo editing.`,
    vocabulary: [vocab('city','cidade','My city is Santa Maria.'), vocab('phone number','telefone','My phone number is...'), vocab('email address','e-mail','My email address is...'), vocab('favorite hobby','hobby favorito','My favorite hobby is photo editing.')],
    shadowing: [task('Repita: What is your city?'), task('Repita: My city is Santa Maria.'), task('Repita: What is your phone number?'), task('Repita: What is your email address?'), task('Repita: My favorite hobby is photo editing.')],
    dictationTasks: [task('Complete: My city is ___.', 'Santa Maria'), task('Complete: My phone number is five five zero ___ two nine.', 'three'), task('Complete: My favorite hobby is ___.', 'photo editing')],
    pronunciationChunks: [task('phone number', 'Fale como bloco.'), task('email address', 'Ritmo em duas partes.'), task('favorite hobby', 'Favorite antes de hobby.')],
    listeningComprehension: [q('What is Luis’s city?', 'Santa Maria', 'My city is Santa Maria.', '', ['Santa Maria','Recife','Curitiba']), q('What is his favorite hobby?', 'photo editing', 'My favorite hobby is photo editing.', '', ['photo editing','music','reading']), q('Does the teacher ask for his email address?', 'Yes', 'What is your email address?', '', ['Yes','No','Not mentioned'])],
    oralProduction: task('Responda oralmente: What is your city? What is your favorite hobby? Use dados reais ou fictícios.'),
    selfAssessment: [task('Consegui ouvir city?'), task('Consegui ouvir phone number?'), task('Consegui ouvir favorite hobby?')],
    lessonRecap: ['Perguntas pessoais pedem campos específicos.', 'Ouça sem transcript primeiro.', 'Phone number, email address e favorite hobby são blocos.'],
    nextLessonBridge: 'Na Speaking A1.2, você vai responder essas perguntas em voz alta.',
  }),

  createSpeakingLesson({
    ...common,
    id: 'A1-SPEAKING-021-PERSONAL',
    order: 21,
    title: 'Talk about yourself and someone else',
    objectives: ['Responder perguntas pessoais em voz alta.', 'Falar sobre você e outra pessoa usando my/his/her.', 'Usar modelo antes da fala livre.', 'Gravar fala curta de 30 segundos.'],
    teacherOpening: 'Agora você vai juntar tudo: falar sobre você e sobre outra pessoa. Primeiro usa modelo, depois repete, depois troca partes. Só no final grava. A meta é produzir frases curtas com segurança, usando my, his e her.',
    whyItMatters: 'Conversas reais alternam entre você e outra pessoa: my city, her hobby, his phone number. Essa aula prepara essa troca sem improviso solto.',
    realLifeUseCases: ['Apresentar-se.', 'Apresentar amigo/colega.', 'Responder perguntas pessoais.', 'Falar hobby e cidade.', 'Gravar mini perfil oral.'],
    conceptExplanation: 'Use my para você, his para homem/menino e her para mulher/menina. Monte frases curtas: My city is Santa Maria. Her city is Recife. His favorite hobby is music. Não tente fazer discurso longo; fale blocos claros.',
    mentalModel: { title: 'Eu + outra pessoa', summary: 'Primeiro my, depois his/her.' },
    stepByStep: [task('Repita o modelo.'), task('Troque dados pessoais.'), task('Troque Ana por Bruno.'), task('Use his/her corretamente.'), task('Grave 30 segundos.')],
    portugueseContrast: [task('Não diga he city; diga his city.'), task('Não diga she hobby; diga her hobby.'), task('Use frases curtas, não traduções longas.')],
    guidedDiscovery: [task('Bruno é homem: his city.'), task('Ana é mulher: her hobby.'), task('Você falando de si: my phone number.')],
    guidedBeforeQuiz: [task('Repita: My city is Santa Maria.'), task('Repita: Her hobby is photo editing.'), task('Repita: His English class is online.')],
    speakingSituation: 'Você está em uma aula online e precisa se apresentar e apresentar um colega fictício.',
    modelPhrases: [phrase('My city is Santa Maria.', 'Minha cidade é Santa Maria.'), phrase('My favorite hobby is photo editing.', 'Meu hobby favorito é edição de fotos.'), phrase('Her city is Recife.', 'A cidade dela é Recife.'), phrase('His English class is online.', 'A aula de inglês dele é online.'), phrase('Her phone number is 550329.', 'O telefone dela é 550329.')],
    pronunciationChunks: [task('My favorite hobby', 'Favorite vem antes de hobby.'), task('Her city is', 'Fale como bloco.'), task('His English class', 'His + English class.')],
    repeatAfterMe: [task('My city is Santa Maria.'), task('My favorite hobby is photo editing.'), task('Her city is Recife.'), task('His English class is online.'), task('Her phone number is 550329.')],
    substitutionDrills: [drill('My city is Santa Maria.', 'My city is Recife.', ['My city is Curitiba.']), drill('Her hobby is music.', 'His hobby is music.', ['My hobby is music.']), drill('His class is online.', 'Her class is online.', ['My class is online.'])],
    questionAnswerDrills: [drill('What is your city?', 'My city is Santa Maria.', ['My city is Recife.']), drill('What is your favorite hobby?', 'My favorite hobby is photo editing.', ['My favorite hobby is music.']), drill('What is her city?', 'Her city is Recife.', ['Her city is Curitiba.'])],
    buildYourAnswer: [task('Diga sua cidade.'), task('Diga seu hobby favorito.'), task('Apresente outra pessoa.'), task('Use his/her.'), task('Finalize com Nice to meet you.')],
    recordingTasks: [task('Grave 5 frases sobre você.'), task('Grave 5 frases sobre uma pessoa fictícia.'), task('Grave versão final de 30 segundos juntando você + outra pessoa.')],
    speakingChecklist: [task('Usei my para mim?'), task('Usei his/her corretamente?'), task('Falei frases curtas?'), task('Não improvisei estruturas novas?')],
    freeSpeaking: task('Fale por 30 segundos sobre você e uma pessoa fictícia usando my, his/her, city, class e hobby.'),
    selfAssessment: [task('Consigo falar sobre mim?'), task('Consigo falar sobre outra pessoa?'), task('Consigo usar his/her?')],
    lessonRecap: ['Speaking A1.2 junta my/his/her.', 'Fale em blocos curtos.', 'Modelo vem antes da fala livre.'],
    nextLessonBridge: 'Na Writing A1.2, você vai transformar essa fala em um parágrafo curto.',
  }),

  createWritingLesson({
    ...common,
    id: 'A1-WRITING-018-PERSONAL',
    order: 21,
    title: 'Write a short personal life paragraph',
    objectives: ['Escrever um parágrafo curto sobre vida pessoal.', 'Usar modelo antes do rascunho.', 'Usar my/his/her com dados pessoais.', 'Revisar e criar versão final.'],
    teacherOpening: 'Agora você vai escrever um parágrafo curto, não só frases soltas. Ainda assim, o processo continua controlado: modelo, análise, blocos, rascunho, checklist e versão final. A meta é escrever sobre você e outra pessoa com clareza.',
    whyItMatters: 'Perfis reais muitas vezes aparecem como parágrafo. Você precisa conectar informações pessoais simples sem transformar tudo em frase longa demais.',
    realLifeUseCases: ['Bio curta.', 'Perfil de aula.', 'Mensagem de apresentação.', 'Descrição de colega.', 'Preparação para revisão da IA.'],
    conceptExplanation: 'Um parágrafo A1.2 pode ter 6 a 8 frases curtas. Ele fala de você e de outra pessoa. Use my para você, his/her para outra pessoa. Revise ordem: você primeiro, outra pessoa depois.',
    mentalModel: { title: 'Meu perfil + perfil de outra pessoa', summary: 'Escreva em duas partes curtas.' },
    stepByStep: [task('Leia o modelo.'), task('Separe frases sobre I/my.'), task('Separe frases sobre his/her.'), task('Troque dados.'), task('Escreva rascunho.'), task('Revise e finalize.')],
    portugueseContrast: [task('Evite frase longa com muitos “and”.'), task('Não use he/her errado: he é pessoa, her é possessivo.'), task('Não traduza “o hobby dela” como the hobby of her. Use her hobby.')],
    guidedDiscovery: [task('Qual parte fala do escritor?', 'My name, my city, my hobby.'), task('Qual parte fala de Ana?', 'Her city, her class, her hobby.')],
    guidedBeforeQuiz: [task('Complete: ___ favorite hobby is photo editing.', 'My/Her/His'), task('Complete: Ana is my friend. ___ city is Recife.', 'Her')],
    modelText: `My name is Luis. My city is Santa Maria, and my English class is online. My favorite hobby is photo editing. Ana is my friend. Her city is Recife. Her favorite hobby is music. Her family is small. We study English together.`,
    modelTextBreakdown: [block('My identity', 'My name is Luis.', 'Apresenta escritor'), block('My city/class', 'My city is Santa Maria, and my English class is online.', 'Dados pessoais'), block('My hobby', 'My favorite hobby is photo editing.', 'Preferência'), block('Other person', 'Ana is my friend.', 'Apresenta outra pessoa'), block('Her city', 'Her city is Recife.', 'Cidade dela'), block('Her hobby', 'Her favorite hobby is music.', 'Preferência dela'), block('Closing', 'We study English together.', 'Fechamento')],
    writingBlocks: [block('My city is...', 'My city is Santa Maria.'), block('My favorite hobby is...', 'My favorite hobby is photo editing.'), block('Ana is my friend.', 'Ana is my friend.'), block('Her city is...', 'Her city is Recife.'), block('His favorite hobby is...', 'His favorite hobby is music.'), block('We study English together.', 'We study English together.')],
    grammarForWriting: [task('Use my para seus dados.'), task('Use her para mulher/menina.'), task('Use his para homem/menino.'), task('Use frases curtas.'), task('Revise ponto final e maiúsculas.')],
    usefulSentences: ['My city is ___.', 'My English class is online.', 'My favorite hobby is ___.', '___ is my friend.', 'Her city is ___.', 'His favorite hobby is ___.', 'We study English together.'],
    guidedSubstitution: [task('Troque Luis pelo seu nome.'), task('Troque Santa Maria por sua cidade.'), task('Troque Ana por uma pessoa fictícia.'), task('Troque her por his se a pessoa for homem/menino.'), task('Troque hobbies.')],
    commonWritingMistakes: [mistake('He city is Recife.', 'His city is Recife.', 'His é possessivo.'), mistake('She favorite hobby is music.', 'Her favorite hobby is music.', 'Her é possessivo.'), mistake('The hobby of her is music.', 'Her hobby is music.', 'Use possessivo antes do substantivo.'), mistake('My city are Santa Maria.', 'My city is Santa Maria.', 'City é singular.')],
    checklist: [task('Meu parágrafo tem 6 a 8 frases?'), task('Usei my para mim?'), task('Usei his/her para outra pessoa?'), task('Usei frases curtas?'), task('Revisei maiúsculas e pontos?')],
    revisionChecklist: [task('Revisei his/her?'), task('Revisei is/are?'), task('Evitei frase longa demais?'), task('A ordem está clara?')],
    draftTask: task('Escreva rascunho de 6 a 8 frases sobre você e uma pessoa fictícia.'),
    revisionTask: task('Revise possessivos, pontuação e ordem.'),
    finalVersionTask: task('Escreva a versão final do parágrafo A1.2 Personal life.'),
    feedbackPreparation: [task('Marque uma frase com my.'), task('Marque uma frase com his/her.'), task('Peça revisão da IA para possessivos.')],
    selfAssessment: [task('Consigo escrever sobre mim?'), task('Consigo escrever sobre outra pessoa?'), task('Consigo revisar his/her?')],
    lessonRecap: ['Parágrafo A1.2 ainda usa frases curtas.', 'My fala de você.', 'His/her falam de outra pessoa.', 'Modelo e checklist vêm antes da versão final.'],
    nextLessonBridge: 'A unidade A1.2 Personal life está pronta para validação integrada antes de avançar para o próximo tema.',
  }),
]);

export const A1_DEEP_PERSONAL_LIFE_BY_PILLAR = Object.freeze({
  grammar: A1_DEEP_PERSONAL_LIFE.filter((lesson) => lesson.pillar === 'grammar'),
  vocabulary: A1_DEEP_PERSONAL_LIFE.filter((lesson) => lesson.pillar === 'vocabulary'),
  reading: A1_DEEP_PERSONAL_LIFE.filter((lesson) => lesson.pillar === 'reading'),
  listening: A1_DEEP_PERSONAL_LIFE.filter((lesson) => lesson.pillar === 'listening'),
  speaking: A1_DEEP_PERSONAL_LIFE.filter((lesson) => lesson.pillar === 'speaking'),
  writing: A1_DEEP_PERSONAL_LIFE.filter((lesson) => lesson.pillar === 'writing'),
});
