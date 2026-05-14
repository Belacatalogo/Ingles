import { createSpeakingLesson, createWritingLesson } from '../../../schemas/index.js';

const level = 'A1';
const status = 'ready';
function task(instruction, note = '', expected = '') { return { instruction, note, expected }; }
function phrase(text, translation = '', note = '') { return { text, translation, note }; }
function mistake(wrong, right, why = '') { return { wrong, right, why }; }

const common = { level, status, estimatedMinutes: 60, tags: ['a1-5', 'review', 'checkpoint-prep', 'speaking-writing-review', 'deep-approved-target'] };

export const A1_DEEP_REVIEWS_SPEAKING_WRITING = Object.freeze([
  createSpeakingLesson({
    ...common,
    id: 'A1-SPEAKING-017',
    order: 17,
    title: 'Speaking Review A1',
    objectives: ['Revisar fala A1 em blocos curtos.', 'Consolidar apresentação pessoal, rotina, pedidos e descrição.', 'Preparar gravação curta antes do Speaking Checkpoint.', 'Praticar autocorreção sem travar a fala.'],
    teacherOpening: 'Esta é uma revisão guiada de Speaking A1. Você não vai aprender tema novo; vai juntar o que já sabe em fala real: apresentar-se, falar da família, rotina, casa, comida, lugares, clima e pedir ajuda. O objetivo é falar simples, claro e correto, não falar frases enormes.',
    whyItMatters: 'Speaking A1 precisa de segurança. Se você domina blocos curtos, consegue se comunicar mesmo sem vocabulário avançado: My name is..., I am from..., I work..., Can I have..., Where is..., Can you help me?',
    realLifeUseCases: ['Apresentar-se em inglês.', 'Falar da rotina.', 'Pedir comida ou ajuda.', 'Perguntar localização.', 'Descrever casa, roupa e sentimento.', 'Gravar uma fala de 30 segundos.'],
    conceptExplanation: 'A fala A1 funciona melhor em blocos. Bloco 1: identidade. Bloco 2: rotina. Bloco 3: situação prática. Bloco 4: opinião/sentimento. Você pode falar bem com frases curtas: I am from Brazil. I study English at night. I wear a jacket because it is cold. Can you help me?',
    mentalModel: { title: 'frases curtas + blocos seguros', summary: 'Fale em blocos, não em frases gigantes.', steps: ['Identity.', 'Routine.', 'Practical request.', 'Description.', 'Feeling.'] },
    stepByStep: [task('Aqueça com frases de identidade.'), task('Fale 3 frases sobre rotina.'), task('Faça 2 pedidos práticos.'), task('Descreva um lugar ou quarto.'), task('Diga clima/sentimento.'), task('Grave e escute sua fala.')],
    portugueseContrast: [task('Não traduza frases longas do português.'), task('Prefira frases curtas: I work in the morning. I study at night.'), task('Não use I have 20 years; use I am 20 years old.'), task('Não use I no understand; use I don’t understand.')],
    guidedDiscovery: [task('My name is... abre apresentação.'), task('I work/study... fala rotina.'), task('Can I have...? faz pedido.'), task('Where is...? pergunta localização.'), task('I am tired, but I am okay. fala sentimento com contraste.')],
    guidedBeforeQuiz: [task('Repita: My name is Luis.'), task('Repita: I am from Brazil.'), task('Repita: I study English at night.'), task('Repita: Can you help me, please?'), task('Repita: I am tired, but I am okay.')],
    speakingSituation: 'Você vai revisar fala A1 criando uma mini apresentação e pequenos diálogos funcionais.',
    modelPhrases: [
      phrase('My name is Luis.', 'Meu nome é Luis.'),
      phrase('I am from Brazil.', 'Eu sou do Brasil.'),
      phrase('I work in the morning and study English at night.', 'Eu trabalho de manhã e estudo inglês à noite.'),
      phrase('Can I have a coffee, please?', 'Pode me ver um café, por favor?'),
      phrase('Where is the pharmacy?', 'Onde fica a farmácia?'),
      phrase('Can you help me, please?', 'Você pode me ajudar, por favor?'),
      phrase('My room is small, but comfortable.', 'Meu quarto é pequeno, mas confortável.')
    ],
    pronunciationChunks: [task('My name is', 'Fale como bloco.'), task('I am from', 'Conecte as palavras.'), task('Can you help me', 'Pedido em bloco.'), task('Where is the', 'Pergunta em bloco.'), task('because it is', 'Treine devagar.')],
    repeatAfterMe: [task('My name is Luis.'), task('I am from Brazil.'), task('I study English at night.'), task('Can I have water, please?'), task('Where is the bank?'), task('Can you repeat it?'), task('I wear a jacket because it is cold.')],
    substitutionDrills: [task('Brazil → São Paulo', 'I am from São Paulo.'), task('coffee → water', 'Can I have water, please?'), task('pharmacy → bank', 'Where is the bank?'), task('jacket → T-shirt', 'I wear a T-shirt because it is hot.')],
    guidedSpeaking: [task('Fale 3 frases sobre você.'), task('Fale 3 frases sobre sua rotina.'), task('Faça um pedido com Can I have...?'), task('Pergunte onde fica um lugar.'), task('Peça ajuda com Can you...?'), task('Descreva seu quarto em 3 frases.')],
    recordingTasks: [task('Grave uma apresentação pessoal de 20 segundos.'), task('Grave uma fala de rotina de 20 segundos.'), task('Grave um mini diálogo pedindo ajuda.'), task('Grave uma fala final de 45 segundos juntando identidade, rotina e situação prática.')],
    freeSpeaking: task('Fale por até 1 minuto sobre você, sua rotina, sua casa, o clima de hoje e por que você estuda inglês.'),
    feedbackChecklist: [task('Usei frases curtas?'), task('Usei to be corretamente?'), task('Usei present simple básico?'), task('Usei pelo menos um pedido com Can...?'), task('Usei pelo menos um conector and/but/because?'), task('Minha fala ficou compreensível?')],
    selfAssessment: [task('Consigo me apresentar sem ler?'), task('Consigo falar rotina?'), task('Consigo pedir ajuda?'), task('Consigo falar por 30–60 segundos em A1?')],
    lessonRecap: ['Speaking A1 depende de blocos seguros.', 'Frases curtas são melhores que frases longas erradas.', 'Pedidos com Can I/Can you são essenciais.', 'Gravar, ouvir e repetir melhora fluência.'],
    nextLessonBridge: 'Depois desta revisão, você estará pronto para o Speaking A1 Checkpoint.',
  }),

  createWritingLesson({
    ...common,
    id: 'A1-WRITING-015',
    order: 15,
    title: 'Writing Review A1',
    objectives: ['Revisar escrita A1 em frases e textos curtos.', 'Consolidar apresentação, rotina, casa, pedidos e mensagens simples.', 'Corrigir pontuação, maiúsculas, plural e conectores.', 'Preparar o Writing A1 Checkpoint.'],
    teacherOpening: 'Esta é uma revisão guiada de Writing A1. O objetivo é escrever simples, claro e correto. Você vai revisar frases sobre você, rotina, família, casa, clima, pedidos e perguntas. No A1, escrever bem não é escrever muito; é escrever com estrutura limpa.',
    whyItMatters: 'Writing revela erros que às vezes passam na fala: falta de maiúscula, ausência de ponto, plural errado, because incompleto, ordem errada de pergunta. Esta revisão prepara você para escrever textos curtos com segurança.',
    realLifeUseCases: ['Escrever apresentação pessoal.', 'Escrever rotina curta.', 'Escrever mensagem pedindo ajuda.', 'Escrever sobre casa/quarto.', 'Responder perguntas simples.', 'Preparar o checkpoint de escrita.'],
    conceptExplanation: 'A escrita A1 deve ter frases curtas, pontuação clara e conectores simples. Use blocos: My name is... I am from... I work... There is... Can you...? I am tired, but I am okay. Revise sempre: maiúscula, ponto final, interrogação, plural e verbo.',
    mentalModel: { title: 'frase limpa → parágrafo curto', summary: 'Uma boa escrita A1 nasce de frases simples e revisadas.', steps: ['Write simple sentences.', 'Connect only when needed.', 'Check punctuation.', 'Check verb forms.', 'Rewrite better.'] },
    stepByStep: [task('Escreva frases simples primeiro.'), task('Organize por tema.'), task('Conecte 1 ou 2 ideias com and/but/because.'), task('Revise maiúscula e pontuação.'), task('Revise verbo e plural.'), task('Reescreva a versão final.')],
    portugueseContrast: [task('Não copie a ordem do português em perguntas.'), task('Use Can you help me?, não You can help me?'), task('Use I am, não I have para idade.'), task('Because precisa de uma frase completa depois.')],
    guidedDiscovery: [task('My name is Luis. é frase completa.'), task('Where is the pharmacy? precisa de ?'), task('There are two chairs. precisa de are por plural.'), task('I wear a jacket because it is cold. tem motivo completo.')],
    guidedBeforeQuiz: [task('Revise: letra maiúscula no começo.'), task('Revise: ponto final em afirmações.'), task('Revise: ? em perguntas.'), task('Revise: there is vs there are.'), task('Revise: because com motivo.')],
    writingPurpose: 'Revisar escrita A1 antes do checkpoint.',
    modelText: `My name is Luis. I am from Brazil. I work in the morning and study English at night. My apartment is small, but comfortable. There is a bed and a desk in my room. I wear a jacket because it is cold. I study English because it helps me at work.`,
    writingBlocks: [task('Identity', 'My name is Luis. I am from Brazil.'), task('Routine', 'I work in the morning and study English at night.'), task('House', 'There is a bed and a desk in my room.'), task('Weather/clothes', 'I wear a jacket because it is cold.'), task('Reason', 'I study English because it helps me at work.')],
    guidedSubstitution: [task('Troque nome e país.', 'My name is ___. I am from ___.'), task('Troque work/study por sua rotina real.'), task('Troque room por house/apartment.'), task('Troque jacket/cold por T-shirt/hot.')],
    grammarForWriting: [task('Use maiúscula no início da frase.'), task('Use ponto final em afirmações.'), task('Use ? em perguntas.'), task('Use is/are conforme singular/plural.'), task('Use do/does em perguntas de rotina.'), task('Use because com motivo completo.')],
    checklist: [task('Meu texto tem 5 a 8 frases?'), task('Usei frases curtas?'), task('Revisei maiúsculas?'), task('Revisei pontuação?'), task('Revisei plural e verbo?'), task('Usei pelo menos um conector corretamente?')],
    draftTask: task('Escreva um texto A1 de 6 a 8 frases sobre você, sua rotina, sua casa e por que estuda inglês.'),
    revisionTask: task('Revise seu texto usando o checklist: maiúscula, pontuação, plural, verbo e because.'),
    commonMistakes: [mistake('my name is luis', 'My name is Luis.', 'Use maiúscula no início e em nomes.'), mistake('I study English because.', 'I study English because it helps me at work.', 'Because precisa de motivo.'), mistake('There is two chairs.', 'There are two chairs.', 'Plural usa are.'), mistake('You can help me?', 'Can you help me?', 'Pergunta correta começa com Can.'), mistake('She work in the morning.', 'She works in the morning.', 'He/she usa -s no present simple.')],
    productionTasks: [task('Escreva uma apresentação pessoal curta.'), task('Escreva um parágrafo sobre sua rotina.'), task('Escreva 4 perguntas A1.'), task('Escreva um mini diálogo pedindo ajuda.'), task('Escreva uma versão final de 8 frases para o checkpoint.')],
    selfAssessment: [task('Consigo escrever frases A1 sem traduzir palavra por palavra?'), task('Consigo revisar meu texto?'), task('Consigo usar and/but/because?'), task('Consigo escrever 6–8 frases claras?')],
    lessonRecap: ['Writing A1 precisa de clareza.', 'Frases curtas vencem frases grandes com erro.', 'Pontuação e maiúsculas importam.', 'Revisão é parte da escrita.', 'O texto final prepara o checkpoint.'],
    nextLessonBridge: 'Depois desta revisão, você estará pronto para o Writing A1 Checkpoint e para o fechamento do A1.5.',
  }),
]);

export const A1_DEEP_REVIEWS_SPEAKING_WRITING_BY_PILLAR = Object.freeze({
  speaking: Object.freeze(A1_DEEP_REVIEWS_SPEAKING_WRITING.filter((lesson) => lesson.pillar === 'speaking')),
  writing: Object.freeze(A1_DEEP_REVIEWS_SPEAKING_WRITING.filter((lesson) => lesson.pillar === 'writing')),
});
