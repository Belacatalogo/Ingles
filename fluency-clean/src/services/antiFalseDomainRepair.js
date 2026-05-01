import { normalizeLesson } from './lessonTypes.js';

function clean(value) {
  return String(value ?? '').trim();
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeType(value) {
  return clean(value).toLowerCase() || 'reading';
}

function hasFalseDomainIssue(review) {
  return ensureArray(review?.issues).some((issue) => /falso domínio|falso dominio|pouca produção|pouca producao|excesso de reconhecimento/i.test(clean(issue)));
}

export function needsAntiFalseDomainRepair(lesson, teacherReview = {}) {
  const normalized = normalizeLesson(lesson);
  const exercises = ensureArray(normalized.exercises);
  const prompts = ensureArray(normalized.prompts);
  const multipleChoice = exercises.filter((item) => ensureArray(item?.options).length >= 2).length;
  const production = exercises.filter((item) => !ensureArray(item?.options).length || /write|digite|escreva|corrija|fale|say|speak|record|grave|shadow|repita|listen|ouça/i.test(clean(item?.question))).length;
  const tooMuchRecognition = exercises.length >= 6 && multipleChoice > exercises.length * 0.68;
  const tooLittleProduction = production < Math.max(3, Math.ceil(exercises.length * 0.3)) || prompts.length < 5;
  return Boolean(hasFalseDomainIssue(teacherReview) || Number(teacherReview?.antiIllusion || 0) < 86 || tooMuchRecognition || tooLittleProduction);
}

function makeProductionExercises(type, level = 'A1') {
  const base = {
    listening: [
      {
        question: 'Sem olhar alternativas, escreva uma frase curta que você ouviu no áudio.',
        answer: 'Resposta pessoal baseada no áudio.',
        explanation: 'Este exercício força recuperação ativa: você precisa puxar a informação da memória, não apenas reconhecer uma alternativa pronta.',
      },
      {
        question: 'Escreva duas palavras-chave que apareceram no áudio e explique em português o que elas significam.',
        answer: 'Resposta pessoal com palavras do áudio.',
        explanation: 'A meta é provar compreensão auditiva real e ligação com significado.',
      },
      {
        question: 'Fale em voz alta uma frase do áudio e depois escreva a frase que você tentou repetir.',
        answer: 'Resposta pessoal após shadowing.',
        explanation: 'Isso conecta listening, pronúncia e escrita sem depender de múltipla escolha.',
      },
      {
        question: 'Responda em inglês simples: What is the audio about?',
        answer: 'It is about the main situation from the audio.',
        explanation: `Para ${level}, uma resposta curta é suficiente, mas precisa vir da sua própria compreensão.`,
      },
    ],
    grammar: [
      {
        question: 'Escreva uma frase afirmativa usando a regra da aula, sem olhar alternativas.',
        answer: 'Resposta pessoal usando a regra.',
        explanation: 'Produzir uma frase própria prova mais domínio do que apenas reconhecer a opção correta.',
      },
      {
        question: 'Transforme sua frase afirmativa em uma pergunta em inglês.',
        answer: 'Resposta pessoal em forma de pergunta.',
        explanation: 'Transformar a estrutura mostra se você entende a forma, não só a tradução.',
      },
      {
        question: 'Corrija esta frase ou explique por que ela está correta: I am student.',
        answer: 'I am a student.',
        explanation: 'O artigo é necessário nessa frase. Esse tipo de correção evita falso domínio.',
      },
      {
        question: 'Crie uma frase sobre você usando a estrutura estudada.',
        answer: 'Resposta pessoal.',
        explanation: 'Usar a estrutura em contexto pessoal fortalece domínio real.',
      },
    ],
    reading: [
      {
        question: 'Sem olhar o texto, escreva a ideia principal em uma frase em português.',
        answer: 'Resposta pessoal baseada no texto.',
        explanation: 'Resumo de memória testa compreensão real, não reconhecimento visual.',
      },
      {
        question: 'Escreva uma frase em inglês usando uma palavra importante do texto.',
        answer: 'Resposta pessoal.',
        explanation: 'A produção com vocabulário transforma leitura passiva em uso ativo.',
      },
      {
        question: 'Retire do texto uma informação específica e escreva com suas próprias palavras.',
        answer: 'Resposta pessoal baseada no texto.',
        explanation: 'Parafrasear exige entender a informação, não apenas copiar.',
      },
      {
        question: 'Responda em inglês simples: What is the text about?',
        answer: 'It is about the main topic of the text.',
        explanation: 'Uma resposta curta em inglês já comprova produção ativa no nível inicial.',
      },
    ],
    writing: [
      {
        question: 'Escreva uma primeira versão com duas frases sobre o tema da aula.',
        answer: 'Resposta pessoal.',
        explanation: 'A escrita real precisa de produção aberta, não apenas seleção de alternativas.',
      },
      {
        question: 'Reescreva uma das suas frases deixando-a mais clara.',
        answer: 'Resposta pessoal revisada.',
        explanation: 'Revisar a própria frase é uma prova importante de domínio.',
      },
      {
        question: 'Marque uma palavra que você acha que pode estar errada e tente corrigir.',
        answer: 'Resposta pessoal.',
        explanation: 'Autocorreção reduz falso domínio porque força atenção à forma.',
      },
      {
        question: 'Escreva uma frase final usando uma palavra nova da aula.',
        answer: 'Resposta pessoal.',
        explanation: 'Usar vocabulário novo em frase própria consolida aprendizado.',
      },
    ],
    speaking: [
      {
        question: 'Fale uma frase curta sobre você usando o tema da aula e depois escreva o que falou.',
        answer: 'Resposta pessoal.',
        explanation: 'Registrar o que foi falado ajuda a comparar intenção, fala e escrita.',
      },
      {
        question: 'Repita uma frase da aula três vezes e marque qual palavra foi mais difícil.',
        answer: 'Resposta pessoal.',
        explanation: 'Perceber dificuldade de pronúncia evita achar que dominou só por reconhecer a frase.',
      },
      {
        question: 'Responda em voz alta uma pergunta simples da aula sem ler resposta pronta.',
        answer: 'Resposta pessoal falada.',
        explanation: 'Responder sem apoio testa produção oral real.',
      },
      {
        question: 'Crie uma nova pergunta curta em inglês sobre o tema.',
        answer: 'Resposta pessoal.',
        explanation: 'Criar uma pergunta exige controle maior da estrutura.',
      },
    ],
  };
  return base[type] || base.reading;
}

function makeProductionPrompts(type) {
  const base = {
    listening: [
      'Listen again and say one sentence without reading.',
      'Write two words you heard and one meaning in Portuguese.',
      'Say the main idea of the audio in one simple English sentence.',
    ],
    grammar: [
      'Write one affirmative sentence using the rule.',
      'Change your sentence into a question.',
      'Create one sentence about your real life using the structure.',
    ],
    reading: [
      'Summarize the text from memory in one sentence.',
      'Write one English sentence with a new word from the text.',
      'Explain one detail from the text using your own words.',
    ],
    writing: [
      'Write two original sentences about the lesson topic.',
      'Rewrite one sentence and improve it.',
      'Use one new word in your final answer.',
    ],
    speaking: [
      'Say one answer without reading.',
      'Repeat one sentence and record which word was difficult.',
      'Create one new spoken sentence about yourself.',
    ],
  };
  return base[type] || base.reading;
}

function sameQuestion(a, b) {
  return clean(a).toLowerCase() === clean(b).toLowerCase();
}

export function repairLessonAgainstFalseDomain(rawLesson, { expectedType = '', expectedLevel = '', teacherReview = null } = {}) {
  const lesson = normalizeLesson(rawLesson);
  const type = normalizeType(expectedType || lesson.type);
  const level = clean(expectedLevel || lesson.level || 'A1');
  const currentExercises = ensureArray(rawLesson?.exercises?.length ? rawLesson.exercises : lesson.exercises);
  const currentPrompts = ensureArray(rawLesson?.prompts?.length ? rawLesson.prompts : lesson.prompts).map(clean).filter(Boolean);
  const additions = makeProductionExercises(type, level);
  const nextExercises = [...currentExercises];

  for (const item of additions) {
    if (nextExercises.length >= currentExercises.length + 4) break;
    if (!nextExercises.some((exercise) => sameQuestion(exercise?.question, item.question))) {
      nextExercises.push({
        ...item,
        options: [],
        antiFalseDomain: true,
        productionType: 'active-recall',
      });
    }
  }

  const promptAdditions = makeProductionPrompts(type);
  const nextPrompts = [...currentPrompts];
  for (const prompt of promptAdditions) {
    if (!nextPrompts.some((item) => sameQuestion(item, prompt))) nextPrompts.push(prompt);
  }

  const antiFalseDomainMeta = {
    active: true,
    repairedAt: new Date().toISOString(),
    reason: teacherReview?.issues || ['Risco de falso domínio por reconhecimento excessivo.'],
    addedProductionExercises: Math.max(0, nextExercises.length - currentExercises.length),
    addedProductionPrompts: Math.max(0, nextPrompts.length - currentPrompts.length),
    strategy: 'active-recall-production-v1',
  };

  return {
    ...rawLesson,
    exercises: nextExercises,
    prompts: nextPrompts,
    antiFalseDomain: antiFalseDomainMeta,
    quality: {
      ...(rawLesson?.quality && typeof rawLesson.quality === 'object' ? rawLesson.quality : {}),
      antiFalseDomainRepair: true,
      activeRecallAdded: antiFalseDomainMeta.addedProductionExercises,
    },
  };
}
