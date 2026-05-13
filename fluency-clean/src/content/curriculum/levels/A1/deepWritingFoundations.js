import { createWritingLesson } from '../../../schemas/index.js';

const level = 'A1';
const status = 'ready';

function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function block(label, text, purpose = '') { return { label, text, purpose }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }

function makeWritingLesson(input) {
  return createWritingLesson({
    level,
    status,
    estimatedMinutes: 55,
    ...input,
    masteryCriteria: { minPracticeAccuracy: 80, requiredProduction: 1, tags: ['a1-writing', input.id, 'deep-approved-target'] },
  });
}

export const A1_DEEP_WRITING_FOUNDATIONS = Object.freeze([
  makeWritingLesson({
    id: 'A1-WRITING-001',
    order: 1,
    title: 'Write a short introduction',
    objectives: ['Escrever uma introdução curta com modelo.', 'Usar blocos seguros como My name is e I am from.', 'Evitar erros comuns de tradução do português.', 'Criar rascunho, revisar e escrever versão final.'],
    teacherOpening: 'Writing no A1 não é abrir uma caixa vazia e mandar “escreva sobre você”. Primeiro você precisa ver um modelo, entender cada parte, trocar informações de forma controlada e só depois escrever sua versão. Nesta aula, você vai escrever uma introdução curta usando blocos prontos. O objetivo é produzir poucas frases, mas corretas, claras e úteis.',
    whyItMatters: 'Uma short introduction aparece em perfil de curso, apresentação online, ficha de aluno e primeira mensagem. Ela reúne Grammar, Vocabulary, Reading, Listening e Speaking Foundations. O maior erro é tentar traduzir do português frase por frase. Em inglês A1, usamos estruturas previsíveis: My name is, I am ... years old, I am from Brazil, I am a student.',
    realLifeUseCases: ['Criar bio curta em curso.', 'Enviar primeira mensagem em inglês.', 'Preencher perfil de estudante.', 'Escrever apresentação para aula.', 'Preparar fala de apresentação.'],
    conceptExplanation: 'Uma introdução A1 curta tem 4 a 6 frases. Cada frase carrega uma informação: greeting, nome, idade, origem, cidade e papel. A escrita correta vem da ordem e dos blocos. Você não precisa inventar frases complexas. Precisa montar com segurança: Hi. My name is Ana. I am 19 years old. I am from Brazil. I am a student. Nice to meet you.',
    mentalModel: { title: 'Modelo → troca → rascunho → revisão → versão final', summary: 'Você copia a estrutura, troca os dados e revisa erros comuns.', steps: ['Leia o modelo.', 'Entenda função de cada frase.', 'Troque uma informação por vez.', 'Escreva rascunho.', 'Revise com checklist.', 'Escreva versão final.'] },
    stepByStep: [task('Leia o modelo completo.'), task('Marque cada bloco: greeting, name, age, country, role.'), task('Troque o nome do modelo pelo seu.'), task('Troque idade e país.'), task('Escreva um rascunho de 5 frases.'), task('Revise antes da versão final.')],
    portugueseContrast: [task('Português: “tenho 20 anos”. Inglês: “I am 20 years old”.'), task('Não escreva “I have 20 years”.'), task('Português pode omitir sujeito; inglês precisa de I.'), task('Não escreva “I am Brazil”. Use “I am from Brazil” ou “I am Brazilian”.')],
    guidedDiscovery: [task('Qual frase apresenta nome?', 'My name is Ana.'), task('Qual frase apresenta idade?', 'I am 19 years old.'), task('Qual frase apresenta origem?', 'I am from Brazil.')],
    guidedBeforeQuiz: [task('Complete: My name ___ Ana.', 'is'), task('Complete: I ___ 19 years old.', 'am'), task('Complete: I am ___ Brazil.', 'from'), task('Complete: I am ___ student.', 'a')],
    modelText: `Hi! My name is Ana. I am 19 years old. I am from Brazil. My city is Recife. I am a student. Nice to meet you.`,
    modelTextBreakdown: [block('Greeting', 'Hi!', 'Abre o texto de forma simples.'), block('Name', 'My name is Ana.', 'Apresenta o nome.'), block('Age', 'I am 19 years old.', 'Apresenta idade com I am.'), block('Country', 'I am from Brazil.', 'Apresenta origem.'), block('City', 'My city is Recife.', 'Apresenta cidade.'), block('Role', 'I am a student.', 'Apresenta papel/ocupação.'), block('Closing', 'Nice to meet you.', 'Fecha de forma educada.')],
    writingBlocks: [block('My name is...', 'My name is Luis.', 'Nome'), block('I am ... years old.', 'I am 20 years old.', 'Idade'), block('I am from...', 'I am from Brazil.', 'País'), block('My city is...', 'My city is Santa Maria.', 'Cidade'), block('I am a student.', 'I am a student.', 'Papel'), block('Nice to meet you.', 'Nice to meet you.', 'Encerramento')],
    grammarForWriting: [task('Use I am para idade.', 'I am 20 years old.'), task('Use from para país.', 'I am from Brazil.'), task('Use a antes de student.', 'I am a student.'), task('Comece I sempre com letra maiúscula.'), task('Use ponto final depois de cada frase curta.')],
    usefulSentences: ['Hi!', 'My name is ___.', 'I am ___ years old.', 'I am from ___.', 'My city is ___.', 'I am a student.', 'Nice to meet you.'],
    guidedSubstitution: [task('Troque Ana por seu nome.', 'My name is Luis.'), task('Troque 19 pela sua idade.', 'I am 20 years old.'), task('Troque Brazil por seu país.', 'I am from Brazil.'), task('Troque Recife por sua cidade.', 'My city is Santa Maria.'), task('Troque student se necessário.', 'I am a worker / I am a student.')],
    commonWritingMistakes: [mistake('I have 20 years.', 'I am 20 years old.', 'Idade usa I am.'), mistake('I am Brazil.', 'I am from Brazil.', 'Brazil é país; from mostra origem.'), mistake('my name is Luis.', 'My name is Luis.', 'Comece frase com letra maiúscula.'), mistake('I am student.', 'I am a student.', 'Use a antes de student.'), mistake('I from Brazil.', 'I am from Brazil.', 'Precisa do verbo am.')],
    checklist: [task('Tenho greeting?'), task('Usei My name is?'), task('Usei I am para idade?'), task('Usei from para país?'), task('Coloquei ponto final?'), task('Revisei letras maiúsculas?')],
    revisionChecklist: [task('Cada frase tem sujeito?'), task('I está maiúsculo?'), task('Idade usa I am?'), task('País usa from?'), task('Student tem a?')],
    draftTask: task('Escreva um rascunho de 5 a 6 frases seguindo o modelo.', 'Não tente criar frases novas agora.'),
    revisionTask: task('Revise o rascunho usando o checklist e corrija pelo menos 2 pontos.', 'Procure idade, from, a student, maiúsculas e pontos finais.'),
    finalVersionTask: task('Escreva a versão final da sua introdução curta.', 'Use 5 a 6 frases corretas e simples.'),
    feedbackPreparation: [task('Destaque uma frase de que você tem certeza.'), task('Marque uma frase que quer que a IA revise.'), task('Compare sua versão final com o modelo.')],
    selfAssessment: [task('Consigo escrever meu nome em frase?'), task('Consigo escrever idade corretamente?'), task('Consigo escrever país/cidade?'), task('Consigo revisar antes de finalizar?')],
    lessonRecap: ['Writing A1 começa com modelo.', 'Você troca dados, não inventa tudo.', 'I am é usado para idade.', 'From indica origem.', 'Checklist evita erros básicos.'],
    nextLessonBridge: 'Na próxima aula, você vai expandir a introdução para um perfil simples com estudo, família e preferências.',
  }),

  makeWritingLesson({
    id: 'A1-WRITING-002',
    order: 2,
    title: 'Write a simple profile',
    objectives: ['Escrever um perfil A1 com informações organizadas.', 'Adicionar estudo, família e preferência.', 'Usar blocos reutilizáveis com segurança.', 'Revisar ordem e clareza do texto.'],
    teacherOpening: 'Um perfil simples é uma introdução um pouco mais completa. Ele não deve ser uma lista solta de frases sem ordem. Nesta aula, você vai usar um modelo para organizar dados pessoais, estudo, família e uma preferência. O foco é aprender a construir um texto curto com começo, meio e fechamento, mantendo frases simples e corretas.',
    whyItMatters: 'Perfis aparecem em apps, cursos e atividades de escrita. Saber escrever um perfil ajuda você a se apresentar melhor sem depender de tradutor. O erro comum é juntar frases sem organização ou tentar usar estruturas avançadas cedo demais. Aqui, cada frase tem uma função clara.',
    realLifeUseCases: ['Perfil de estudante.', 'Bio simples em app.', 'Atividade de aula.', 'Apresentação escrita.', 'Preparação para speaking.'],
    conceptExplanation: 'Um simple profile A1 pode ter 6 a 8 frases. A ordem segura é: nome, idade, país/cidade, estudo, família e preferência. Use frases curtas. Não precisa conectar tudo com and. A clareza vem de blocos estáveis: I study English online. My family is small. I like music and coffee.',
    mentalModel: { title: 'Perfil = dados organizados', summary: 'Nome → idade → origem → estudo → família → gosto.', steps: ['Abra com nome.', 'Diga idade/origem.', 'Diga estudo.', 'Diga família.', 'Diga preferência.', 'Feche simples.'] },
    stepByStep: [task('Leia o modelo.'), task('Separe cada frase por função.'), task('Troque dados pessoais.'), task('Adicione uma frase sobre estudo.'), task('Adicione uma frase sobre família.'), task('Adicione uma preferência.'), task('Revise ordem e pontuação.')],
    portugueseContrast: [task('Português usa muito “e” em frases longas; inglês A1 prefere frases curtas.'), task('Não escreva “I like of music”. Use “I like music”.'), task('Family is small/big usa is, não are, quando fala da família como grupo.'), task('Study English online não precisa de artigo antes de English.')],
    guidedDiscovery: [task('Qual frase mostra estudo?', 'I study English online.'), task('Qual frase mostra família?', 'My family is small.'), task('Qual frase mostra preferência?', 'I like music and coffee.')],
    guidedBeforeQuiz: [task('Complete: I study English ___.', 'online'), task('Complete: My family ___ small.', 'is'), task('Complete: I like ___.', 'music'), task('Complete: I live ___ Curitiba.', 'in')],
    modelText: `My name is Bruno. I am 21 years old. I am from Brazil, and I live in Curitiba. I am a student. I study English online every day. My family is small. I like music and coffee. Nice to meet you.`,
    modelTextBreakdown: [block('Name', 'My name is Bruno.', 'Identidade'), block('Age', 'I am 21 years old.', 'Idade'), block('Origin/city', 'I am from Brazil, and I live in Curitiba.', 'País e cidade'), block('Role', 'I am a student.', 'Papel'), block('Study', 'I study English online every day.', 'Rotina de estudo'), block('Family', 'My family is small.', 'Família'), block('Preference', 'I like music and coffee.', 'Gostos'), block('Closing', 'Nice to meet you.', 'Fechamento')],
    writingBlocks: [block('I live in...', 'I live in Curitiba.', 'Cidade'), block('I study...', 'I study English online.', 'Estudo'), block('every day', 'I study English every day.', 'Frequência'), block('My family is...', 'My family is small.', 'Família'), block('I like...', 'I like music.', 'Preferência'), block('Nice to meet you.', 'Nice to meet you.', 'Fechamento')],
    grammarForWriting: [task('Use live in para cidade.', 'I live in Curitiba.'), task('Use study + objeto.', 'I study English.'), task('Use like sem of.', 'I like music.'), task('Use family is quando fala da família como unidade.'), task('Use vírgula com and só se a frase continuar clara.')],
    usefulSentences: ['I live in ___.', 'I am a student.', 'I study English online.', 'I study every day.', 'My family is small.', 'My family is big.', 'I like ___.', 'Nice to meet you.'],
    guidedSubstitution: [task('Troque Bruno por seu nome.'), task('Troque Curitiba por sua cidade.'), task('Troque small por big se fizer sentido.'), task('Troque music and coffee por duas coisas que você gosta.'), task('Troque online every day se necessário.', 'I study English at home.')],
    commonWritingMistakes: [mistake('I like of music.', 'I like music.', 'Like não usa of.'), mistake('My family are small.', 'My family is small.', 'Family como grupo usa is no A1.'), mistake('I live in Brazil city.', 'I live in Curitiba.', 'Use cidade depois de live in.'), mistake('I study the English.', 'I study English.', 'Não use the aqui.'), mistake('I am 21 years.', 'I am 21 years old.', 'Use years old completo.')],
    checklist: [task('Meu perfil tem nome?'), task('Tem idade?'), task('Tem país/cidade?'), task('Tem estudo?'), task('Tem família?'), task('Tem preferência?'), task('As frases estão curtas?')],
    revisionChecklist: [task('Removi frases longas demais?'), task('Usei like sem of?'), task('Usei live in corretamente?'), task('Usei family is?'), task('Revisei pontos finais?')],
    draftTask: task('Escreva um rascunho de perfil com 6 a 8 frases.', 'Siga a ordem do modelo.'),
    revisionTask: task('Reordene o texto se necessário: dados pessoais → estudo → família → preferência.', 'Não deixe frases soltas fora de ordem.'),
    finalVersionTask: task('Escreva a versão final do seu perfil simples.', 'Use 6 a 8 frases curtas e corretas.'),
    feedbackPreparation: [task('Marque sua melhor frase.'), task('Marque uma frase que pode estar longa demais.'), task('Compare com o modelo de Bruno.')],
    selfAssessment: [task('Consigo escrever um perfil organizado?'), task('Consigo usar like corretamente?'), task('Consigo falar de família?'), task('Consigo revisar ordem do texto?')],
    lessonRecap: ['Perfil simples tem ordem.', 'Frases curtas são melhores no A1.', 'I like não usa of.', 'I live in apresenta cidade.', 'Rascunho vem antes da versão final.'],
    nextLessonBridge: 'Na próxima aula, você vai escrever especificamente sobre família usando my, his, her, mother, father, brother e sister.',
  }),

  makeWritingLesson({
    id: 'A1-WRITING-003',
    order: 3,
    title: 'Write about your family',
    objectives: ['Escrever uma descrição simples de família.', 'Usar my, his e her com segurança.', 'Evitar confundir parents com parentes.', 'Produzir versão final revisada.'],
    teacherOpening: 'Escrever sobre família no A1 parece simples, mas exige cuidado com relações. Você precisa usar my, his, her, mother, father, brother, sister e parents sem misturar. Nesta aula, você vai analisar um modelo, ver como cada frase apresenta uma pessoa e escrever sua própria descrição com rascunho e checklist.',
    whyItMatters: 'Família aparece em apresentações, perfis e conversas. Ao escrever, você consolida vocabulário e grammar: possessive adjectives, verb to be e singular/plural. O erro mais perigoso para brasileiros é parents, que significa pais, não parentes. Outro erro comum é esquecer is/are.',
    realLifeUseCases: ['Atividade sobre família.', 'Perfil pessoal.', 'Apresentação escolar.', 'Preparação para speaking.', 'Mensagem simples sobre casa/família.'],
    conceptExplanation: 'Uma family description A1 apresenta a pessoa principal e familiares. Comece com My family is small/big. Depois apresente pessoas uma por uma: My mother is Ana. She is a teacher. My father is Roberto. He is a doctor. Se falar de pais, use My parents are. Se falar de uma pessoa, use is. A escrita deve ser clara e com frases curtas.',
    mentalModel: { title: 'Família = pessoa + relação + informação', summary: 'Para cada familiar: diga quem é, nome e uma informação.', steps: ['My family is...', 'My mother is...', 'She is...', 'My father is...', 'He is...', 'My parents are...'] },
    stepByStep: [task('Leia o modelo.'), task('Marque family words.'), task('Separe singular e plural.'), task('Troque nomes.'), task('Adicione uma informação por pessoa.'), task('Revise my/his/her e is/are.')],
    portugueseContrast: [task('Parents significa pais, não parentes.'), task('Relatives seria parentes em geral, mas não é foco da aula.'), task('Minha mãe é = My mother is, não My mother are.'), task('His/her vêm antes do substantivo: her brother, his sister.')],
    guidedDiscovery: [task('Por que “My parents are” usa are?', 'Parents é plural.'), task('Por que “My mother is” usa is?', 'Mother é singular.'), task('Qual palavra significa pais?', 'parents')],
    guidedBeforeQuiz: [task('Complete: My family ___ small.', 'is'), task('Complete: My parents ___ from Brazil.', 'are'), task('Complete: My mother ___ Ana.', 'is'), task('Complete: ___ brother is Pedro.', 'My/Her/His')],
    modelText: `My name is Carla. My family is small. My mother is Ana, and my father is Roberto. My mother is a teacher. My father is a doctor. I have one brother. His name is Pedro. He is a student. We are a happy family.`,
    modelTextBreakdown: [block('Opening', 'My name is Carla.', 'Apresenta narradora'), block('Family size', 'My family is small.', 'Tamanho da família'), block('Parents', 'My mother is Ana, and my father is Roberto.', 'Pais'), block('Mother detail', 'My mother is a teacher.', 'Informação da mãe'), block('Father detail', 'My father is a doctor.', 'Informação do pai'), block('Brother', 'I have one brother.', 'Irmão'), block('Brother name', 'His name is Pedro.', 'Nome do irmão'), block('Closing', 'We are a happy family.', 'Fechamento')],
    writingBlocks: [block('My family is...', 'My family is small.', 'Tamanho'), block('My mother is...', 'My mother is Ana.', 'Mãe'), block('My father is...', 'My father is Roberto.', 'Pai'), block('My parents are...', 'My parents are from Brazil.', 'Pais'), block('I have one...', 'I have one brother.', 'Quantidade'), block('His/Her name is...', 'His name is Pedro.', 'Nome de outra pessoa')],
    grammarForWriting: [task('Use is para singular.', 'My mother is Ana.'), task('Use are para plural.', 'My parents are from Brazil.'), task('Use my para sua família.'), task('Use his para homem/menino e her para mulher/menina.'), task('Use a antes de profissão singular.', 'She is a teacher.')],
    usefulSentences: ['My family is small.', 'My family is big.', 'My mother is ___.', 'My father is ___.', 'My parents are from ___.', 'I have one brother.', 'I have one sister.', 'His name is ___.', 'Her name is ___.'],
    guidedSubstitution: [task('Troque Carla por seu nome.'), task('Troque small por big se quiser.'), task('Troque Ana/Roberto por nomes reais ou fictícios.'), task('Troque teacher/doctor por student/worker.'), task('Troque brother por sister se necessário.')],
    commonWritingMistakes: [mistake('My parents is from Brazil.', 'My parents are from Brazil.', 'Parents é plural.'), mistake('My mother are Ana.', 'My mother is Ana.', 'Mother é singular.'), mistake('Parents = parentes.', 'Parents = pais.', 'Parentes em geral é relatives.'), mistake('His name is Ana.', 'Her name is Ana.', 'Use her para mulher/menina.'), mistake('She is teacher.', 'She is a teacher.', 'Use a antes de profissão singular.')],
    checklist: [task('Usei My family is?'), task('Usei mother/father corretamente?'), task('Usei parents are se usei parents?'), task('Usei his/her corretamente?'), task('Usei a antes de profissão?')],
    revisionChecklist: [task('Revisei is/are?'), task('Revisei parents?'), task('Revisei his/her?'), task('Cada familiar tem uma frase clara?'), task('Meu texto tem fechamento?')],
    draftTask: task('Escreva um rascunho de 6 a 8 frases sobre sua família ou família fictícia.', 'Use pelo menos 4 family words.'),
    revisionTask: task('Revise singular/plural e possessivos.', 'Procure mother is, father is, parents are, his/her.'),
    finalVersionTask: task('Escreva a versão final da descrição de família.', 'Use frases curtas e pelo menos uma profissão ou papel.'),
    feedbackPreparation: [task('Marque uma frase com parents.'), task('Marque uma frase com his ou her.'), task('Compare com o modelo de Carla.')],
    selfAssessment: [task('Consigo usar parents corretamente?'), task('Consigo usar is/are?'), task('Consigo usar his/her?'), task('Consigo revisar meu texto?')],
    lessonRecap: ['Family writing exige relações claras.', 'Parents significa pais.', 'Singular usa is; plural usa are.', 'His/her ficam antes do substantivo.', 'Checklist evita erros típicos de brasileiros.'],
    nextLessonBridge: 'Na próxima aula, você vai escrever país, cidade e contato em um formulário/perfil simples.',
  }),

  makeWritingLesson({
    id: 'A1-WRITING-004',
    order: 4,
    title: 'Write country, city and contact info',
    objectives: ['Escrever país, cidade e contato em inglês A1.', 'Diferenciar country, nationality e city.', 'Escrever telefone/e-mail simples com clareza.', 'Produzir uma ficha curta revisada.'],
    teacherOpening: 'Muitas situações de escrita A1 não são texto longo; são formulários, fichas e contatos. Você precisa escrever country, city, nationality, phone number e email sem confundir. Nesta aula, você vai analisar um modelo de ficha, aprender blocos reutilizáveis e produzir uma versão final com seus dados reais ou fictícios.',
    whyItMatters: 'Cadastros aparecem em cursos, apps e atendimentos. Se você sabe escrever seus dados básicos em inglês, já consegue completar muitas tarefas reais. O erro comum é misturar Brazil/Brazilian, city/country ou escrever phone number sem clareza. Aqui, a escrita será organizada como ficha e mini perfil.',
    realLifeUseCases: ['Preencher cadastro de curso.', 'Escrever contato em perfil.', 'Informar cidade e país.', 'Criar ficha de aluno.', 'Revisar dados pessoais em inglês.'],
    conceptExplanation: 'Country é país: Brazil. Nationality é nacionalidade: Brazilian. City é cidade: Santa Maria. Phone number é número de telefone. Email address é endereço de e-mail. Para Writing A1, você pode usar formato de ficha ou frases curtas. O importante é não misturar categorias e revisar capitalização de nomes próprios.',
    mentalModel: { title: 'Campo → informação correta', summary: 'Cada campo pede um tipo de dado: country, nationality, city, phone, email.', steps: ['Country = Brazil.', 'Nationality = Brazilian.', 'City = Santa Maria.', 'Phone number = digits.', 'Email address = email.'] },
    stepByStep: [task('Leia o modelo de ficha.'), task('Separe country/city/nationality.'), task('Troque dados do modelo.'), task('Escreva telefone fictício por dígitos.'), task('Escreva e-mail simples.'), task('Revise maiúsculas e categorias.')],
    portugueseContrast: [task('Brazil é país; Brazilian é nacionalidade.'), task('City não é country.'), task('Email address é endereço de e-mail, não endereço de casa.'), task('Phone number deve ficar claro e separado.')],
    guidedDiscovery: [task('Qual campo recebe Brazil?', 'Country.'), task('Qual campo recebe Brazilian?', 'Nationality.'), task('Qual campo recebe Santa Maria?', 'City.')],
    guidedBeforeQuiz: [task('Complete: Country: ___.', 'Brazil'), task('Complete: Nationality: ___.', 'Brazilian'), task('Complete: City: ___.', 'Santa Maria'), task('Complete: Phone number: ___.', 'digits')],
    modelText: `Student profile
Name: Luis Silva
Country: Brazil
Nationality: Brazilian
City: Santa Maria
Phone number: 550329
Email address: luis@example.com
Short note: I am from Brazil, and I live in Santa Maria.`,
    modelTextBreakdown: [block('Title', 'Student profile', 'Tipo do documento'), block('Name', 'Name: Luis Silva', 'Nome completo'), block('Country', 'Country: Brazil', 'País'), block('Nationality', 'Nationality: Brazilian', 'Nacionalidade'), block('City', 'City: Santa Maria', 'Cidade'), block('Phone', 'Phone number: 550329', 'Telefone'), block('Email', 'Email address: luis@example.com', 'E-mail'), block('Short note', 'I am from Brazil, and I live in Santa Maria.', 'Frase curta com país/cidade')],
    writingBlocks: [block('Country', 'Country: Brazil', 'País'), block('Nationality', 'Nationality: Brazilian', 'Nacionalidade'), block('City', 'City: Santa Maria', 'Cidade'), block('Phone number', 'Phone number: 550329', 'Telefone'), block('Email address', 'Email address: luis@example.com', 'E-mail'), block('Short note', 'I am from Brazil, and I live in Santa Maria.', 'Nota curta')],
    grammarForWriting: [task('Use country para país.'), task('Use nationality para nacionalidade.'), task('Use city para cidade.'), task('Nomes próprios começam com letra maiúscula.', 'Brazil, Brazilian, Santa Maria.'), task('Use I am from + country e I live in + city.')],
    usefulSentences: ['Country: ___.', 'Nationality: ___.', 'City: ___.', 'Phone number: ___.', 'Email address: ___.', 'I am from ___.', 'I live in ___.'],
    guidedSubstitution: [task('Troque Luis Silva por seu nome ou nome fictício.'), task('Troque Brazil por país correto.'), task('Troque Brazilian por nacionalidade correta.'), task('Troque Santa Maria por cidade.'), task('Troque telefone/e-mail por dados fictícios se preferir.')],
    commonWritingMistakes: [mistake('Country: Brazilian', 'Country: Brazil', 'Country pede país.'), mistake('Nationality: Brazil', 'Nationality: Brazilian', 'Nationality pede nacionalidade.'), mistake('City: Brazil', 'City: Santa Maria', 'City pede cidade.'), mistake('Email: my house', 'Email address: name@example.com', 'Email address é e-mail.'), mistake('i am from brazil.', 'I am from Brazil.', 'I maiúsculo e nomes próprios com maiúscula.')],
    checklist: [task('Country está com país?'), task('Nationality está com nacionalidade?'), task('City está com cidade?'), task('Phone number tem dígitos claros?'), task('Email address parece e-mail?'), task('Nomes próprios têm maiúscula?')],
    revisionChecklist: [task('Revisei Brazil/Brazilian?'), task('Revisei city/country?'), task('Revisei maiúsculas?'), task('Revisei phone/email?'), task('A short note está correta?')],
    draftTask: task('Preencha uma ficha curta com Name, Country, Nationality, City, Phone number e Email address.', 'Use dados reais ou fictícios.'),
    revisionTask: task('Revise categoria por categoria.', 'Não deixe Brazil em Nationality nem Brazilian em Country.'),
    finalVersionTask: task('Escreva a versão final da ficha + uma short note com I am from e I live in.', 'Mantenha organizado e claro.'),
    feedbackPreparation: [task('Marque os campos country/nationality/city.'), task('Marque a short note para revisão.'), task('Compare com o modelo de ficha.')],
    selfAssessment: [task('Consigo diferenciar country e nationality?'), task('Consigo escrever city corretamente?'), task('Consigo escrever phone/email em ficha?'), task('Consigo revisar maiúsculas?')],
    lessonRecap: ['Writing também inclui fichas e formulários.', 'Country é país.', 'Nationality é nacionalidade.', 'City é cidade.', 'Short note usa I am from e I live in.'],
    nextLessonBridge: 'Writing Foundations fecha o ciclo A1. O próximo passo é validar Writing antes de avançar para unidades temáticas A1.2.',
  }),
]);

export const A1_DEEP_WRITING_BY_PILLAR = Object.freeze({
  writing: A1_DEEP_WRITING_FOUNDATIONS,
});
