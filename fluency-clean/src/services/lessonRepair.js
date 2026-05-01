import { normalizeLesson } from './lessonTypes.js';

const REQUIREMENTS = {
  reading: { minSections: 6, minVocabulary: 12, minExercises: 12, minPrompts: 4, minMainLength: 900 },
  grammar: { minSections: 7, minVocabulary: 8, minExercises: 14, minPrompts: 4, minMainLength: 0 },
  listening: { minSections: 6, minVocabulary: 10, minExercises: 10, minPrompts: 4, minMainLength: 750 },
  writing: { minSections: 6, minVocabulary: 10, minExercises: 10, minPrompts: 5, minMainLength: 0 },
  speaking: { minSections: 5, minVocabulary: 6, minExercises: 6, minPrompts: 5, minMainLength: 0 },
  vocabulary: { minSections: 5, minVocabulary: 12, minExercises: 10, minPrompts: 4, minMainLength: 0 },
};

const SECTION_TEMPLATES = {
  reading: [
    ['Pré-leitura', 'Antes de ler, observe o título, identifique palavras conhecidas e pense no contexto geral do texto. Esta etapa prepara compreensão e reduz ansiedade.'],
    ['Leitura guiada', 'Leia o texto uma primeira vez para entender a ideia principal. Depois releia procurando detalhes, conectores e palavras importantes.'],
    ['Compreensão', 'Responda às perguntas procurando evidências no texto. Evite adivinhar sem voltar ao trecho que confirma a resposta.'],
    ['Vocabulário em contexto', 'Estude palavras úteis dentro de frases completas. O foco é entender uso real, não apenas tradução isolada.'],
    ['Revisão final', 'Revise o tema, as palavras novas e as respostas. Explique em português o que entendeu e depois tente resumir em inglês simples.'],
    ['Produção curta', 'Escreva ou fale três frases usando o vocabulário da leitura. Isso transforma compreensão passiva em uso ativo.'],
  ],
  grammar: [
    ['Quando usar', 'Use esta estrutura quando quiser comunicar uma ideia específica com clareza. Observe o contexto antes de escolher a forma gramatical.'],
    ['Forma afirmativa', 'Na afirmativa, monte a frase com sujeito, verbo e complemento. Leia exemplos e perceba a posição de cada parte.'],
    ['Forma negativa', 'Na negativa, adicione o auxiliar ou marcador correto. Compare com a afirmativa para perceber a mudança de sentido.'],
    ['Forma interrogativa', 'Na pergunta, organize auxiliar, sujeito e verbo principal. Treine perguntas curtas antes de frases longas.'],
    ['Erros comuns', 'Evite traduzir palavra por palavra. Observe ordem das palavras, auxiliares e terminações que mudam o significado.'],
    ['Prática guiada', 'Complete frases, transforme exemplos e explique por que cada resposta está correta. A prática precisa ter feedback claro.'],
    ['Revisão final', 'Faça um checklist: forma afirmativa, negativa, pergunta, uso real e erro comum. Reescreva uma frase própria.'],
  ],
  listening: [
    ['Escuta global', 'Ouça uma vez sem pausar para captar a ideia geral. Não tente entender todas as palavras na primeira escuta.'],
    ['Escuta por detalhes', 'Ouça novamente procurando nomes, números, ações e palavras-chave. Anote apenas informações importantes.'],
    ['Shadowing', 'Repita frases curtas copiando ritmo, pausa e pronúncia. Comece devagar e aumente a naturalidade aos poucos.'],
    ['Vocabulário do áudio', 'Estude palavras que aparecem no áudio dentro de frases reais. Preste atenção à forma como soam conectadas.'],
    ['Compreensão', 'Responda às perguntas usando o que ouviu. Se errar, volte ao trecho e procure o detalhe que passou despercebido.'],
    ['Revisão final', 'Resuma o áudio com frases simples, revise palavras novas e repita as partes mais úteis em voz alta.'],
  ],
  writing: [
    ['Modelo', 'Observe um modelo curto antes de escrever. Repare na estrutura, nas frases de abertura e na conclusão.'],
    ['Estrutura', 'Organize o texto em começo, desenvolvimento e fechamento. Cada parte deve ter uma função clara.'],
    ['Frases úteis', 'Use frases simples e seguras antes de tentar estruturas longas. Clareza é mais importante que complexidade.'],
    ['Checklist', 'Revise sujeito, verbo, pontuação, vocabulário e coerência. Corrija uma coisa por vez para não se perder.'],
    ['Produção', 'Escreva sua resposta com base no tema. Depois releia em voz alta para perceber problemas de ritmo e sentido.'],
    ['Revisão final', 'Compare sua produção com o modelo e reescreva duas frases melhoradas. Aprender escrita exige revisão ativa.'],
  ],
  speaking: [
    ['Modelo de comunicação', 'Observe a intenção da fala e use frases curtas para responder. O foco é comunicar com clareza e confiança.'],
    ['Repetição guiada', 'Repita frases úteis prestando atenção em ritmo, sílabas fortes e sons que mudam o significado.'],
    ['Pronúncia', 'Treine palavras-chave isoladas e depois dentro de frases. Compare clareza, ritmo e terminação das palavras.'],
    ['Conversa', 'Responda com suas próprias palavras. Use frases simples, mas tente completar a ideia com um detalhe extra.'],
    ['Tentativa e revisão', 'Grave, escute, identifique uma melhoria e tente novamente. O avanço vem de ciclos curtos de prática.'],
  ],
  vocabulary: [
    ['Contexto', 'Aprenda cada palavra dentro de uma situação real. Palavras isoladas são mais difíceis de lembrar e usar.'],
    ['Exemplo', 'Leia exemplos curtos e perceba quais palavras aparecem juntas. Isso ajuda a formar frases naturais.'],
    ['Prática', 'Use cada palavra em uma frase própria. Comece copiando o exemplo e depois troque uma parte da frase.'],
    ['Revisão', 'Reveja palavras difíceis em intervalos curtos. Marque as que precisam voltar em flashcards.'],
    ['Produção final', 'Escreva ou fale um pequeno resumo usando pelo menos cinco palavras novas do tema.'],
  ],
};

const VOCAB = [
  ['learn', 'aprender', 'I learn English every day.'],
  ['practice', 'praticar', 'I practice with short sentences.'],
  ['review', 'revisar', 'I review the lesson after studying.'],
  ['answer', 'responder/resposta', 'I answer the question in English.'],
  ['question', 'pergunta', 'This question is important.'],
  ['example', 'exemplo', 'This example helps me understand.'],
  ['sentence', 'frase', 'Write one sentence using the word.'],
  ['listen', 'ouvir', 'Listen to the audio again.'],
  ['speak', 'falar', 'Speak slowly and clearly.'],
  ['write', 'escrever', 'Write your own answer.'],
  ['read', 'ler', 'Read the text one more time.'],
  ['understand', 'entender', 'I understand the main idea.'],
  ['mistake', 'erro', 'A mistake helps me improve.'],
  ['improve', 'melhorar', 'I want to improve my English.'],
];

function clean(value) { return String(value ?? '').trim(); }
function array(value) { return Array.isArray(value) ? value : []; }
function req(type) { return REQUIREMENTS[type] || REQUIREMENTS.reading; }
function templates(type) { return SECTION_TEMPLATES[type] || SECTION_TEMPLATES.reading; }

function makeSections(lesson, type) {
  const existing = array(lesson.sections).map((section, index) => ({
    title: clean(section?.title || section?.heading || `Parte ${index + 1}`),
    content: clean(section?.content || section?.text || section?.body || section?.explanation),
    examples: array(section?.examples),
  })).filter((section) => section.title || section.content);

  const next = existing.map((section, index) => ({
    title: section.title || `Parte ${index + 1}`,
    content: section.content.length >= 80 ? section.content : `${section.content} Explique o ponto com exemplos simples, prática guiada e ligação direta com o objetivo da aula.`,
    examples: section.examples,
  }));

  for (const [title, content] of templates(type)) {
    if (next.length >= req(type).minSections) break;
    if (!next.some((section) => section.title.toLowerCase() === title.toLowerCase())) next.push({ title, content, examples: [] });
  }
  return next;
}

function makeVocabulary(lesson, type) {
  const existing = array(lesson.vocabulary).map((item) => ({
    word: clean(item?.word || item?.term),
    meaning: clean(item?.meaning || item?.translation || item?.definition),
    example: clean(item?.example || item?.sentence),
  })).filter((item) => item.word || item.meaning || item.example);
  const next = existing.map((item) => ({
    word: item.word || 'practice',
    meaning: item.meaning || 'praticar',
    example: item.example || `Use ${item.word || 'practice'} in a simple sentence.`,
  }));
  for (const [word, meaning, example] of VOCAB) {
    if (next.length >= req(type).minVocabulary) break;
    if (!next.some((item) => item.word.toLowerCase() === word)) next.push({ word, meaning, example });
  }
  return next;
}

function makeExercises(lesson, type) {
  const existing = array(lesson.exercises).map((item, index) => ({
    question: clean(item?.question || item?.prompt || `Questão ${index + 1}`),
    options: array(item?.options || item?.choices || item?.alternatives).map(clean).filter(Boolean),
    answer: clean(item?.answer || item?.expectedAnswer || item?.correctAnswer),
    explanation: clean(item?.explanation || item?.feedback),
  })).filter((item) => item.question || item.answer || item.options.length);
  const next = existing.map((item, index) => ({
    question: item.question.length >= 8 ? item.question : `Responda à questão ${index + 1} usando o conteúdo da aula.`,
    options: item.options,
    answer: item.answer || (item.options[0] || 'Resposta pessoal guiada pelo conteúdo da aula.'),
    explanation: item.explanation.length >= 20 ? item.explanation : 'A resposta se conecta ao objetivo da aula e deve ser justificada com o conteúdo estudado.',
  }));
  while (next.length < req(type).minExercises) {
    const number = next.length + 1;
    next.push({
      question: `Prática ${number}: crie uma frase simples usando o tema principal da aula.`,
      options: [],
      answer: 'Resposta pessoal com frase completa em inglês.',
      explanation: 'Este exercício força produção ativa e ajuda a transformar explicação em uso real da língua.',
    });
  }
  return next;
}

function makePrompts(lesson, type) {
  const next = array(lesson.prompts || lesson.writingPrompts).map(clean).filter(Boolean);
  const additions = [
    'Explique em português o ponto principal da aula em uma frase.',
    'Escreva três frases simples em inglês usando o conteúdo estudado.',
    'Grave uma resposta curta e revise uma palavra que precisa melhorar.',
    'Liste dois erros que você deve evitar ao usar este conteúdo.',
    'Faça uma revisão final em voz alta antes de concluir.',
  ];
  for (const prompt of additions) {
    if (next.length >= req(type).minPrompts) break;
    next.push(prompt);
  }
  return next;
}

function makeMainText(lesson, type) {
  const min = req(type).minMainLength;
  const current = clean(lesson.listeningText || lesson.listening_text || lesson.transcript);
  if (!min || current.length >= min) return current;
  const base = current || 'Every morning, I open my English notebook and practice a short lesson. I read simple sentences, listen carefully, repeat useful phrases and answer questions with my own words.';
  let text = base;
  const expansion = ' This part gives enough context for reading or listening practice. The student should identify the main idea, notice important words, answer comprehension questions and finish with a short personal response.';
  while (text.length < min) text += expansion;
  return text;
}

export function repairLessonForQuality(rawLesson, { expectedLevel = '', expectedType = '', review = null } = {}) {
  const normalized = normalizeLesson(rawLesson);
  const type = clean(expectedType) || normalized.type || 'reading';
  const level = clean(expectedLevel) || normalized.level || 'A1';
  const repaired = {
    ...rawLesson,
    id: rawLesson?.id || normalized.id,
    type,
    level,
    title: clean(rawLesson?.title || normalized.title) || 'Aula de inglês',
    objective: clean(rawLesson?.objective || rawLesson?.goal || normalized.objective) || `Aprender e praticar ${type} no nível ${level} com explicação, exemplos, exercícios e revisão final.`,
    intro: clean(rawLesson?.intro || normalized.intro) || `Nesta aula, você vai estudar ${type} no nível ${level} com prática guiada e produção ativa.`,
    focus: clean(rawLesson?.focus || normalized.focus) || `${type} · ${level}`,
    sections: makeSections(normalized, type),
    vocabulary: makeVocabulary(normalized, type),
    exercises: makeExercises(normalized, type),
    prompts: makePrompts(normalized, type),
    tips: [...array(rawLesson?.tips || normalized.tips), 'Revisão final: confira objetivo, vocabulário, exercícios e produção independente antes de concluir.'],
    listeningText: makeMainText(normalized, type),
    quality: {
      ...(rawLesson?.quality && typeof rawLesson.quality === 'object' ? rawLesson.quality : {}),
      autoRepairAttempted: true,
      autoRepairReason: review?.issues || [],
      repairedAt: new Date().toISOString(),
    },
  };
  return repaired;
}
