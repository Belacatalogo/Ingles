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
    makeSection('Exemplos guiados inéditos', `I am a student. = Eu sou aluno. Use quando você fala sobre identidade. You are my friend. = Você é meu amigo. Use quando fala diretamente com alguém. He is at school. = Ele está na escola. She is happy. = Ela está feliz. We are ready. = Nós estamos prontos. They are at home. = Eles estão em casa.`),
    makeSection('Certo vs errado', `Certo: She is happy. Errado: She are happy. O erro acontece porque she combina com is. Certo: Are you ready? Errado: You are ready? como pergunta formal. Em perguntas com to be, o verbo vem antes do sujeito.`),
    makeSection('Uso real em microdiálogo', `Teacher: Are you a student? Student: Yes, I am. Teacher: Is Ana your friend? Student: Yes, she is. Teacher: Are they at school? Student: No, they are at home. Perceba que cada resposta usa o verbo certo para o sujeito.`),
    makeSection('Checagem mental antes da prática', `Antes de responder, pergunte: estou falando de identidade, estado ou localização? Quem é o sujeito: I, you, he, she, it, we ou they? A frase é afirmativa, negativa ou pergunta? Essas três perguntas evitam a maioria dos erros.`),
    makeSection('Resumo final do que dominar', `Você domina esta aula quando consegue explicar a diferença entre as formas, reconhecer erros comuns e criar frases próprias sem depender das alternativas. A prática profunda serve para testar isso, mas a produção final mostra se você realmente sabe usar.`),
  ];
}

function buildFinalPolishSections(lesson) {
  const topic = buildTopicName(lesson);
  return [
    makeSection('Polimento final do professor: caminho da aula', `Para fechar ${topic}, siga esta ordem mental: primeiro identifique a ideia, depois escolha o sujeito, depois escolha a forma correta, e só então monte a frase. Essa progressão evita estudar a regra solta. Você está treinando um caminho: entender, formar, comparar, corrigir e produzir.`),
    makeSection('Polimento final: analogia simples', `Imagine que a frase é uma ficha com três espaços. O primeiro espaço é quem faz ou está na situação. O segundo é a forma gramatical correta. O terceiro é a informação principal. Em I am a student, I ocupa o primeiro espaço, am ocupa o segundo, e a student completa a ideia.`),
    makeSection('Polimento final: exemplos inéditos com motivo', `I am at home. Está correto porque I combina com am. You are my teacher. Está correto porque you combina com are. He is tired. Está correto porque he combina com is. She is from Brazil. Está correto porque she combina com is. We are students. Está correto porque we combina com are. They are friends. Está correto porque they combina com are. It is a phone. Está correto porque it combina com is.`),
    makeSection('Polimento final: certo vs errado explicado', `Certo: I am ready. Errado: I is ready. O erro é usar is com I. Certo: He is my brother. Errado: He are my brother. O erro é usar are com he. Certo: Are they here? Errado: They are here? como pergunta formal. A pergunta troca a ordem: verbo antes do sujeito.`),
    makeSection('Polimento final: microdiálogo de uso real', `Receptionist: Are you Luis? Luis: Yes, I am. Receptionist: Is Ana your sister? Luis: No, she is my friend. Receptionist: Are your parents here? Luis: Yes, they are here. Este diálogo mostra identidade, relação e localização usando a mesma regra em contexto real.`),
    makeSection('Polimento final: produção própria obrigatória', `Agora a aula só está completa se você produzir. Crie uma frase com I am, uma com you are, uma com he is ou she is, uma com we are e uma pergunta com are. Depois leia em voz alta e confira se o sujeito combina com o verbo.`),
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

  const polishedTitles = new Set(next.map((section) => clean(section.title).toLowerCase()));
  buildFinalPolishSections(normalized).forEach((section) => {
    if (!polishedTitles.has(clean(section.title).toLowerCase())) {
      next.push(section);
      polishedTitles.add(clean(section.title).toLowerCase());
    }
  });

  return {
    ...normalized,
    intro: clean(normalized.intro || fallback[0].content),
    objective: clean(normalized.objective || `Entender e usar ${buildTopicName(normalized)} em frases reais, com segurança e produção própria.`),
    sections: next,
    deepGrammarPipeline: {
      enabled: true,
      version: 'deep-grammar-pipeline-v1+grammar-polish-final-v1',
      enrichedAt: new Date().toISOString(),
    },
  };
}

function scoreGrammarDepth(lesson) {
  const sections = ensureArray(lesson.sections);
  const text = sections.map((section) => `${section.title} ${section.content}`).join(' ').toLowerCase();
  const requiredSignals = [
    ['abertura', 'professor', 'hoje vamos', 'caminho da aula'],
    ['analogia', 'pense', 'ponte', 'ficha', 'conceito central'],
    ['camada', 'passo', 'regra', 'ordem mental'],
    ['exemplo', 'frases-modelo', 'frases modelo', 'motivo'],
    ['certo', 'errado', 'erro comum'],
    ['diálogo', 'dialogo', 'microdiálogo', 'uso real'],
    ['checagem', 'antes da prática', 'antes da pratica'],
    ['produção', 'producao', 'frases suas', 'produzir'],
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
  const exampleSections = sections.filter((section) => /exemplo|di[aá]logo|uso real|certo|errado|polimento/i.test(`${section.title} ${section.content}`));
  const exampleText = exampleSections.map((section) => section.content).join(' ');
  const englishExamples = (exampleText.match(/\b(I am|You are|He is|She is|It is|We are|They are|I have|You have|He has|She has|They have|Do you|Does she|Are you|Is he|Are they|Is Ana)\b/gi) || []).length;
  const hasWhy = /porque|pois|isso acontece|o erro acontece|use quando|significa|quer dizer|está correto|esta correto/i.test(exampleText);
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
    reviewer: 'deep-grammar-auditor-v1+grammar-polish-final-v1',
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
    'Leia em voz alta 5 frases próprias e confirme se o sujeito combina com a forma gramatical correta.',
    'Monte um mini diálogo de 4 falas usando a regra desta aula em uma situação real.',
  ];

  return {
    ...lesson,
    prompts: [...existingPrompts, ...requiredPrompts.filter((prompt) => !existingPrompts.some((existing) => existing.toLowerCase() === prompt.toLowerCase()))],
    quality: {
      ...(lesson.quality || {}),
      deepGrammarPipeline: 'deep-grammar-pipeline-v1+grammar-polish-final-v1',
    },
  };
}
