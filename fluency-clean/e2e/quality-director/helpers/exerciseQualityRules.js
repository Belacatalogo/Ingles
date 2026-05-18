const OPTION_KEYS = ['options', 'choices', 'alternatives', 'answers'];
const ANSWER_KEYS = ['answer', 'expected', 'expectedAnswer', 'correct', 'answerKey', 'correctOption', 'correctChoice', 'modelAnswer', 'sampleAnswer'];
const QUESTION_KEYS = ['question', 'prompt', 'instruction', 'title'];
const FEEDBACK_KEYS = ['explanation', 'feedback', 'hint', 'tip', 'why', 'rationale', 'note'];

const GENERIC_OPTION_PATTERNS = [
  /^option\s*[a-d]?$/i,
  /^choice\s*[a-d]?$/i,
  /^answer\s*[a-d]?$/i,
  /^correct answer$/i,
  /^wrong answer$/i,
  /^true$/i,
  /^false$/i,
  /^yes$/i,
  /^no$/i,
  /^n\/a$/i,
];

const ABSURD_DISTRACTORS = new Set([
  'banana', 'pizza', 'car', 'blue', 'red', 'green', 'dog', 'cat', 'table', 'chair', 'computer',
  'house', 'water', 'book', 'phone', 'apple', 'orange', 'football', 'music', 'coffee',
]);

const GENERIC_FEEDBACK_PATTERNS = [
  /^good$/i,
  /^ok$/i,
  /^correct$/i,
  /^incorrect$/i,
  /^try again$/i,
  /^resposta correta$/i,
  /^resposta incorreta$/i,
  /^boa$/i,
  /^muito bem$/i,
  /^tente novamente$/i,
];

const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'to', 'of', 'in', 'on', 'is', 'are', 'am', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
  'what', 'where', 'who', 'when', 'why', 'how', 'which', 'choose', 'correct', 'answer', 'resposta', 'correta', 'qual',
  'o', 'a', 'os', 'as', 'de', 'do', 'da', 'em', 'para', 'com', 'um', 'uma', 'e', 'ou', 'que', 'como', 'onde', 'quem',
]);

function clean(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value).trim().replace(/\s+/g, ' ');
  if (Array.isArray(value)) return value.map(clean).filter(Boolean).join(' ');
  if (typeof value === 'object') return clean(value.label || value.text || value.value || value.answer || value.title || value.question || value.prompt || '');
  return '';
}

function normalize(value) {
  return clean(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function words(value) {
  return normalize(value).split(/\s+/).filter((word) => word && !STOPWORDS.has(word) && word.length > 2);
}

function firstValue(object, keys) {
  for (const key of keys) {
    if (object && object[key] !== undefined && object[key] !== null && clean(object[key])) return object[key];
  }
  return '';
}

function getOptions(object = {}) {
  for (const key of OPTION_KEYS) {
    if (Array.isArray(object[key])) return object[key].map(clean).filter(Boolean);
  }
  return [];
}

function getQuestion(object = {}) {
  return clean(firstValue(object, QUESTION_KEYS));
}

function getAnswer(object = {}) {
  return clean(firstValue(object, ANSWER_KEYS));
}

function getFeedback(object = {}) {
  return clean(firstValue(object, FEEDBACK_KEYS));
}

function isExerciseLike(object = {}) {
  if (!object || typeof object !== 'object' || Array.isArray(object)) return false;
  const question = getQuestion(object);
  const answer = getAnswer(object);
  const options = getOptions(object);
  return Boolean(question && (answer || options.length >= 2 || /pergunta|question|quiz|exercise|exerc/i.test(question)));
}

function collectExerciseObjects(value, result = [], path = 'lesson') {
  if (!value || typeof value !== 'object') return result;

  if (Array.isArray(value)) {
    value.forEach((item, index) => collectExerciseObjects(item, result, `${path}[${index}]`));
    return result;
  }

  if (isExerciseLike(value)) {
    result.push({ path, item: value });
  }

  Object.entries(value).forEach(([key, child]) => {
    if (child && typeof child === 'object') collectExerciseObjects(child, result, `${path}.${key}`);
  });

  return result;
}

function addIssue(issues, issue) {
  issues.push({ severity: 'P2', ...issue });
}

function optionMatchesAnswer(option, answer) {
  const optionNorm = normalize(option);
  const answerNorm = normalize(answer);
  if (!optionNorm || !answerNorm) return false;
  return optionNorm === answerNorm || optionNorm.includes(answerNorm) || answerNorm.includes(optionNorm);
}

function lexicalOverlap(a, b) {
  const aWords = new Set(words(a));
  const bWords = new Set(words(b));
  if (!aWords.size || !bWords.size) return 0;
  let hits = 0;
  aWords.forEach((word) => {
    if (bWords.has(word)) hits += 1;
  });
  return hits / Math.min(aWords.size, bWords.size);
}

function hasAnswerLeak(question, answer) {
  const questionNorm = normalize(question);
  const answerNorm = normalize(answer);
  if (!questionNorm || !answerNorm || answerNorm.length < 4) return false;
  return questionNorm.includes(answerNorm);
}

function auditOptionGroup({ issues, area, path, question, answer, options }) {
  const normalizedOptions = options.map(normalize);
  const unique = new Set(normalizedOptions);

  if (unique.size !== normalizedOptions.length) {
    addIssue(issues, {
      severity: 'P1',
      area,
      title: 'Alternativas duplicadas',
      impact: 'O aluno pode perceber exercício mal revisado ou ter menos alternativas reais.',
      evidence: `${path}: ${options.join(' | ')}`,
      recommendation: 'Garantir opções únicas e semanticamente distintas.',
    });
  }

  const genericOptions = options.filter((option) => GENERIC_OPTION_PATTERNS.some((pattern) => pattern.test(option)));
  if (genericOptions.length) {
    addIssue(issues, {
      severity: 'P1',
      area,
      title: 'Alternativas genéricas ou placeholder',
      impact: 'O exercício parece incompleto ou gerado sem curadoria.',
      evidence: `${path}: ${genericOptions.join(' | ')}`,
      recommendation: 'Substituir placeholders por alternativas reais, contextualizadas e plausíveis.',
    });
  }

  const absurd = options.filter((option) => ABSURD_DISTRACTORS.has(normalize(option)));
  if (absurd.length >= 2) {
    addIssue(issues, {
      severity: 'P1',
      area,
      title: 'Distratores absurdos ou fáceis demais',
      impact: 'O aluno pode acertar por eliminação sem entender a aula.',
      evidence: `${path}: ${options.join(' | ')}`,
      recommendation: 'Trocar por distratores próximos do tema e do nível CEFR.',
    });
  }

  if (answer) {
    const matching = options.filter((option) => optionMatchesAnswer(option, answer));
    if (matching.length === 0) {
      addIssue(issues, {
        severity: 'P0',
        area,
        title: 'Resposta correta não aparece nas alternativas',
        impact: 'O aluno pode ser penalizado mesmo escolhendo a melhor opção disponível.',
        evidence: `${path}: resposta=${answer}; opções=${options.join(' | ')}`,
        recommendation: 'Adicionar a resposta correta entre as opções ou revisar o answerKey.',
      });
    }
    if (matching.length > 1) {
      addIssue(issues, {
        severity: 'P1',
        area,
        title: 'Mais de uma alternativa parece correta',
        impact: 'O exercício fica ambíguo e pode frustrar o aluno.',
        evidence: `${path}: resposta=${answer}; matches=${matching.join(' | ')}`,
        recommendation: 'Deixar apenas uma resposta claramente correta ou reformular a pergunta.',
      });
    }
  }

  const optionLengths = options.map((option) => option.length).filter(Boolean);
  const max = Math.max(...optionLengths);
  const min = Math.min(...optionLengths);
  if (options.length >= 3 && min > 0 && max / min >= 5) {
    addIssue(issues, {
      severity: 'P2',
      area,
      title: 'Tamanho das alternativas muito desigual',
      impact: 'A resposta pode ficar óbvia pelo tamanho, não pelo conhecimento.',
      evidence: `${path}: ${options.join(' | ')}`,
      recommendation: 'Equilibrar comprimento e nível de detalhe das alternativas.',
    });
  }

  if (question && answer && hasAnswerLeak(question, answer)) {
    addIssue(issues, {
      severity: 'P1',
      area,
      title: 'Pergunta parece entregar a resposta',
      impact: 'O aluno não precisa raciocinar para responder.',
      evidence: `${path}: pergunta=${question}; resposta=${answer}`,
      recommendation: 'Reformular a pergunta para não conter a resposta literal.',
    });
  }
}

function auditExerciseObject({ lesson, item, path }) {
  const issues = [];
  const lessonId = lesson?.id || 'unknown-lesson';
  const area = `Exercício · ${lessonId}`;
  const question = getQuestion(item);
  const answer = getAnswer(item);
  const options = getOptions(item);
  const feedback = getFeedback(item);
  const lessonContext = clean([
    lesson?.title,
    lesson?.objective,
    lesson?.teacherOpening,
    lesson?.conceptExplanation,
    lesson?.mainText,
    lesson?.readingPurpose,
    lesson?.listeningScript,
    lesson?.lessonRecap,
  ]);

  if (question.length < 8) {
    addIssue(issues, {
      severity: 'P2',
      area,
      title: 'Pergunta curta demais',
      impact: 'Pode indicar exercício raso ou sem contexto suficiente.',
      evidence: `${path}: ${question || 'sem pergunta'}`,
      recommendation: 'Escrever enunciado claro, específico e conectado à aula.',
    });
  }

  if (!answer && options.length >= 2) {
    addIssue(issues, {
      severity: 'P1',
      area,
      title: 'Exercício com alternativas mas sem resposta esperada clara',
      impact: 'O sistema pode não avaliar corretamente o aluno.',
      evidence: `${path}: ${question}`,
      recommendation: 'Adicionar `answer`, `expected`, `correct` ou campo equivalente.',
    });
  }

  if (options.length) auditOptionGroup({ issues, area, path, question, answer, options });

  if (feedback && (feedback.length < 12 || GENERIC_FEEDBACK_PATTERNS.some((pattern) => pattern.test(feedback)))) {
    addIssue(issues, {
      severity: 'P2',
      area,
      title: 'Feedback genérico demais',
      impact: 'O aluno não entende por que errou ou acertou.',
      evidence: `${path}: ${feedback}`,
      recommendation: 'Explicar a regra, evidência textual ou raciocínio da resposta.',
    });
  }

  if (lessonContext && question && lexicalOverlap(question, lessonContext) === 0 && options.length >= 2) {
    addIssue(issues, {
      severity: 'P2',
      area,
      title: 'Pergunta com baixa conexão lexical com a aula',
      impact: 'Pode ser um exercício fora do tema ou genérico demais.',
      evidence: `${path}: ${question}`,
      recommendation: 'Verificar se o exercício cobra algo realmente ensinado nesta aula.',
    });
  }

  return issues;
}

export function auditLessonExercisesDeep(lesson) {
  const exercises = collectExerciseObjects(lesson);
  const issues = [];

  if (!exercises.length) {
    addIssue(issues, {
      severity: 'P1',
      area: `Aula ${lesson?.id || 'unknown-lesson'}`,
      title: 'Nenhum exercício detectado na aula ready',
      impact: 'A aula pode ensinar sem exigir prática ativa do aluno.',
      recommendation: 'Adicionar exercícios, tarefas de tentativa ou perguntas avaliáveis.',
    });
    return issues;
  }

  exercises.forEach(({ item, path }) => {
    issues.push(...auditExerciseObject({ lesson, item, path }));
  });

  return issues;
}

export function collectLessonExerciseStats(lesson) {
  const exercises = collectExerciseObjects(lesson);
  return {
    lessonId: lesson?.id || '',
    exerciseCount: exercises.length,
    choiceCount: exercises.filter(({ item }) => getOptions(item).length >= 2).length,
    openAnswerCount: exercises.filter(({ item }) => !getOptions(item).length && getAnswer(item)).length,
  };
}
