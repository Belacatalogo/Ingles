import { normalizeLesson } from './lessonTypes.js';

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function countWords(value) {
  const text = clean(value);
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

function normalizeScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function isGrammarLesson(lesson) {
  return String(lesson?.type || '').toLowerCase() === 'grammar' || /grammar|gram[aá]tica|verb|verbo|tense|present simple|past simple|future/i.test(`${lesson?.title || ''} ${lesson?.expectedTitle || ''}`);
}

function sentenceSimilarity(a, b) {
  const left = new Set(clean(a).toLowerCase().split(/[^a-záéíóúâêôãõç0-9]+/i).filter((token) => token.length > 3));
  const right = new Set(clean(b).toLowerCase().split(/[^a-záéíóúâêôãõç0-9]+/i).filter((token) => token.length > 3));
  if (!left.size || !right.size) return 0;
  const intersection = [...left].filter((token) => right.has(token)).length;
  return intersection / Math.min(left.size, right.size);
}

function detectRepeatedSections(sections) {
  const repeated = [];
  sections.forEach((section, index) => {
    sections.slice(index + 1).forEach((other, offset) => {
      const similarity = sentenceSimilarity(section.content, other.content);
      if (similarity >= 0.72) repeated.push(`${section.title || `Seção ${index + 1}`} repete ${other.title || `Seção ${index + offset + 2}`}`);
    });
  });
  return repeated;
}

function hasSignal(text, signals) {
  const lower = clean(text).toLowerCase();
  return signals.some((signal) => lower.includes(signal));
}

function sectionByPurpose(sections, signals) {
  return sections.find((section) => hasSignal(`${section.title} ${section.content}`, signals));
}

function makeSection(title, content) {
  return { title, content: clean(content) };
}

function buildTopicName(lesson) {
  return clean(lesson?.expectedTitle || lesson?.title || 'o ponto gramatical da aula').replace(/^(Grammar|Gramática)\s*[—-]\s*/i, '');
}

function buildFallbackDeepSections(lesson) {
  const topic = buildTopicName(lesson);
  return [
    makeSection('Abertura do professor', `Hoje vamos estudar ${topic} como uma ferramenta de comunicação, não como uma lista para decorar. Primeiro você vai entender para que essa estrutura serve, depois vai ver como formar frases, comparar exemplos certos e errados, e por fim vai produzir frases suas.`),
    makeSection('Conceito central com analogia', `Pense na gramática como uma ponte entre ideia e frase. Antes de escolher uma palavra, você precisa saber que tipo de mensagem quer passar: identidade, estado, posse, rotina, pergunta ou negação. Em ${topic}, a regra existe para organizar essa mensagem de forma clara.`),
    makeSection('Regra em camadas', `Camada 1: entenda a função da estrutura. Camada 2: veja a forma correta com cada pronome. Camada 3: use em frases reais. Camada 4: compare com erros comuns. Só depois tente produzir sozinho.`),
    makeSection('Exemplos guiados inéditos', `I am a student. = Eu sou aluno. Use quando você fala sobre identidade. She has a book. = Ela tem um livro. Use quando você fala sobre posse. They are at home. = Eles estão em casa. Use quando você fala sobre localização ou estado.`),
    makeSection('Certo vs errado', `Certo: She has a book. Errado: She have a book. O erro acontece porque he, she e it usam has. Certo: Are you happy? Errado: You are happy? como pergunta formal. Em perguntas com to be, o verbo vem antes do sujeito.`),
    makeSection('Uso real em microdiálogo', `A: Are you a student? B: Yes, I am. A: Do you have a notebook? B: Yes, I have a notebook. Perceba que a primeira pergunta usa to be para identidade; a segunda usa have para posse.`),
    makeSection('Checagem mental antes da prática', `Antes de responder, pergunte: estou falando de identidade/estado/localização ou de posse/característica? Quem é o sujeito: I, you, he, she, it, we ou they? A frase é afirmativa, negativa ou pergunta? Essas três perguntas evitam a maioria dos erros.`),
    makeSection('Resumo final do que dominar', `Você domina esta aula quando consegue explicar a diferença entre as formas, reconhecer erros comuns e criar frases próprias sem depender das alternativas. A prática profunda serve para testar isso, mas a produção final mostra se você realmente sabe usar.`),
  ];
}

function enrichSections(lesson) {
  const normalized = normalizeLesson(lesson);
  if (!isGrammarLesson(normalized)) return normalized;

  const existing = ensureArray(normalized.sections).map((section, index) => ({
    title: clean(section?.title || section?.heading || `Parte ${index + 1}`),
    content: clean(section?.content || section?.text || section?.body || section?.explanation || ''),
  })).filter((section) => section.title || section.content);

  const fallback = buildFallbackDeepSections(normalized);
  const next = [...existing];

  const requirements = [
    { signals: ['abertura', 'professor', 'hoje vamos'], fallback: fallback[0] },
    { signals: ['analogia', 'pense', 'como uma ponte', 'conceito central'], fallback: fallback[1] },
    { signals: ['camada', 'regra em camadas', 'passo'], fallback: fallback[2] },
    { signals: ['exemplos guiados', 'frases-modelo', 'frases modelo'], fallback: fallback[3] },
    { signals: ['certo vs errado', 'errado', 'correto', 'erro comum'], fallback: fallback[4] },
    { signals: ['microdiálogo', 'microdialogo', 'diálogo', 'dialogo', 'uso real'], fallback: fallback[5] },
    { signals: ['checagem mental', 'antes da prática', 'antes da pratica'], fallback: fallback[6] },
    { signals: ['resumo final', 'dominar', 'produção final', 'producao final'], fallback: fallback[7] },
  ];

  requirements.forEach((requirement) => {
    if (!sectionByPurpose(next, requirement.signals)) next.push(requirement.fallback);
  });

  return {
    ...normalized,
    intro: clean(normalized.intro || fallback[0].content),
    objective: clean(normalized.objective || `Entender e usar ${buildTopicName(normalized)} em frases reais, com segurança e produção própria.`),
    sections: next,
    deepGrammarPipeline: {
      enabled: true,
      version: 'deep-grammar-pipeline-v1',
      enrichedAt: new Date().toISOString(),
    },
  };
}

function scoreGrammarDepth(lesson) {
  const sections = ensureArray(lesson.sections);
  const text = sections.map((section) => `${section.title} ${section.content}`).join(' ').toLowerCase();
  const requiredSignals = [
    ['abertura', 'professor', 'hoje vamos'],
    ['analogia', 'pense', 'ponte', 'conceito central'],
    ['camada', 'passo', 'regra'],
    ['exemplo', 'frases-modelo', 'frases modelo'],
    ['certo', 'errado', 'erro comum'],
    ['diálogo', 'dialogo', 'microdiálogo', 'uso real'],
    ['checagem', 'antes da prática', 'antes da pratica'],
    ['produção', 'producao', 'frases suas'],
  ];
  const hits = requiredSignals.filter((group) => group.some((signal) => text.includes(signal))).length;
  const wordDepth = normalizeScore(Math.min(100, sections.reduce((total, section) => total + countWords(section.content), 0) / 9));
  return normalizeScore((hits / requiredSignals.length) * 65 + wordDepth * 0.35);
}

function scoreRepetition(lesson) {
  const sections = ensureArray(lesson.sections);
  const repeated = detectRepeatedSections(sections);
  const examplesRepeatExplanation = sections.filter((section) => /exemplo/i.test(section.title) && sections.some((other) => other !== section && sentenceSimilarity(section.content, other.content) >= 0.68)).length;
  let score = 100 - repeated.length * 14 - examplesRepeatExplanation * 18;
  return { score: normalizeScore(score), repeated, examplesRepeatExplanation };
}

function scoreGuidedExamples(lesson) {
  const sections = ensureArray(lesson.sections);
  const exampleSections = sections.filter((section) => /exemplo|di[aá]logo|uso real|certo|errado/i.test(`${section.title} ${section.content}`));
  const exampleText = exampleSections.map((section) => section.content).join(' ');
  const englishExamples = (exampleText.match(/\b(I am|You are|He is|She is|It is|We are|They are|I have|You have|He has|She has|They have|Do you|Does she|Are you|Is he)\b/gi) || []).length;
  const hasWhy = /porque|pois|isso acontece|o erro acontece|use quando|significa|quer dizer/i.test(exampleText);
  return normalizeScore(Math.min(100, englishExamples * 10) * 0.65 + (hasWhy ? 35 : 0));
}

function scorePracticeDepth(lesson) {
  const exercises = ensureArray(lesson.exercises);
  const prompts = ensureArray(lesson.prompts);
  const open = exercises.filter((exercise) => !ensureArray(exercise.options).length || /escreva|write|corrija|complete|produza|crie|digite/i.test(clean(exercise.question))).length;
  const explanations = exercises.filter((exercise) => countWords(exercise.explanation) >= 5).length;
  return normalizeScore(Math.min(100, exercises.length * 4) * 0.35 + Math.min(100, open * 18) * 0.35 + Math.min(100, explanations * 5) * 0.2 + Math.min(100, prompts.length * 12) * 0.1);
}

export function auditDeepGrammarLesson(rawLesson) {
  const lesson = normalizeLesson(rawLesson);
  if (!isGrammarLesson(lesson)) {
    return { applies: false, approved: true, score: 100, issues: [], details: {} };
  }

  const grammarDepth = scoreGrammarDepth(lesson);
  const repetition = scoreRepetition(lesson);
  const guidedExamples = scoreGuidedExamples(lesson);
  const practiceDepth = scorePracticeDepth(lesson);
  const score = normalizeScore(grammarDepth * 0.36 + repetition.score * 0.24 + guidedExamples * 0.24 + practiceDepth * 0.16);
  const issues = [];

  if (grammarDepth < 78) issues.push('Grammar profunda: falta progressão didática real com abertura, analogia, camadas, uso real e resumo.');
  if (repetition.score < 82) issues.push('Grammar profunda: há repetição entre seções ou exemplos copiando a explicação.');
  if (guidedExamples < 78) issues.push('Grammar profunda: exemplos precisam ser inéditos, contextualizados e explicar por que estão corretos.');
  if (practiceDepth < 74) issues.push('Grammar profunda: prática ainda parece reconhecimento superficial; precisa produção e explicação.');

  return {
    applies: true,
    approved: score >= 82 && issues.length <= 1,
    score,
    grammarDepth,
    repetition: repetition.score,
    guidedExamples,
    practiceDepth,
    issues,
    details: {
      repeatedSections: repetition.repeated,
      examplesRepeatExplanation: repetition.examplesRepeatExplanation,
    },
    reviewer: 'deep-grammar-auditor-v1',
    checkedAt: new Date().toISOString(),
  };
}

export function repairDeepGrammarLesson(rawLesson) {
  const lesson = enrichSections(rawLesson);
  if (!isGrammarLesson(lesson)) return lesson;

  const existingPrompts = ensureArray(lesson.prompts).map(clean).filter(Boolean);
  const requiredPrompts = [
    'Explique com suas palavras a diferença entre a estrutura principal desta aula e o erro mais comum.',
    'Crie 3 frases afirmativas reais sobre você usando a regra estudada.',
    'Crie 2 frases negativas e 2 perguntas usando a regra estudada.',
    'Escreva uma frase errada propositalmente, depois corrija e explique o motivo.',
  ];

  return {
    ...lesson,
    prompts: [...existingPrompts, ...requiredPrompts.filter((prompt) => !existingPrompts.some((existing) => existing.toLowerCase() === prompt.toLowerCase()))],
    quality: {
      ...(lesson.quality || {}),
      deepGrammarPipeline: 'deep-grammar-pipeline-v1',
    },
  };
}
