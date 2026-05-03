const DEFAULT_READING_GATE_VERSION = 'reading-quality-gate-v1';

function clean(value) {
  return String(value ?? '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/\s+([,.!?;:])/g, '$1')
    .replace(/([.!?])(?=[A-ZÁÉÍÓÚÂÊÔÃÕ])/g, '$1 ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function normalizeComparable(value) {
  return clean(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[“”"'`´]/g, '')
    .replace(/[^a-z0-9\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function splitParagraphs(text) {
  const cleanText = clean(text);
  if (!cleanText) return [];
  const blocks = cleanText.split(/\n\s*\n+/).map((item) => item.trim()).filter(Boolean);
  if (blocks.length > 1) return blocks;
  return cleanText.split(/(?<=[.!?])\s+(?=[A-Z])/).map((item) => item.trim()).filter(Boolean);
}

function wordCount(text) {
  return clean(text).split(/\s+/).filter(Boolean).length;
}

function hasAnswerLeak(question, answer) {
  const q = normalizeComparable(question);
  const a = normalizeComparable(answer);
  if (!q || !a || a.length < 3) return false;
  return q.includes(a);
}

function uniqueOptions(options) {
  const seen = new Set();
  return ensureArray(options)
    .map(clean)
    .filter(Boolean)
    .filter((option) => {
      const key = normalizeComparable(option);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 4);
}

function optionContainsAnswer(options, answer) {
  const a = normalizeComparable(answer);
  if (!a) return false;
  return options.some((option) => normalizeComparable(option) === a);
}

function findEvidenceInText(evidence, readingText) {
  const e = normalizeComparable(evidence);
  const text = normalizeComparable(readingText);
  if (!e || !text) return false;
  return text.includes(e);
}

function inferEvidenceFromAnswer(answer, paragraphs) {
  const a = normalizeComparable(answer);
  if (!a) return '';
  return paragraphs.find((paragraph) => normalizeComparable(paragraph).includes(a)) || '';
}

function normalizeQuestion(question, index, readingText, paragraphs, report) {
  const options = uniqueOptions(question?.options || question?.choices || question?.alternatives);
  let answer = clean(question?.answer || question?.correctAnswer || question?.correct || question?.expectedAnswer || '');
  let evidence = clean(question?.evidence || question?.quote || question?.reference || '');
  let item = {
    ...question,
    skill: clean(question?.skill || question?.type || (index === 0 ? 'main_idea' : 'detail')),
    questionLanguage: clean(question?.questionLanguage || question?.language || ''),
    question: clean(question?.question || question?.prompt || question?.title || ''),
    options,
    answer,
    evidence,
    explanation: clean(question?.explanation || question?.feedback || ''),
    difficulty: clean(question?.difficulty || 'easy'),
  };

  if (!item.question) {
    report.removedQuestions += 1;
    report.warnings.push(`Questão ${index + 1} removida: enunciado vazio.`);
    return null;
  }

  if (!item.answer) {
    report.removedQuestions += 1;
    report.warnings.push(`Questão ${index + 1} removida: resposta vazia.`);
    return null;
  }

  if (hasAnswerLeak(item.question, item.answer)) {
    report.removedQuestions += 1;
    report.warnings.push(`Questão ${index + 1} removida: resposta vazada no enunciado.`);
    return null;
  }

  if (options.length && options.length < 2) {
    report.removedQuestions += 1;
    report.warnings.push(`Questão ${index + 1} removida: alternativas insuficientes.`);
    return null;
  }

  if (options.length >= 2 && !optionContainsAnswer(options, item.answer)) {
    options.push(item.answer);
    item.options = uniqueOptions(options);
    report.repairs.push(`Questão ${index + 1}: resposta adicionada às alternativas.`);
  }

  if (!item.evidence) {
    const inferred = inferEvidenceFromAnswer(item.answer, paragraphs);
    if (inferred) {
      item.evidence = inferred;
      report.repairs.push(`Questão ${index + 1}: evidência inferida a partir do texto.`);
    }
  }

  if (item.evidence && !findEvidenceInText(item.evidence, readingText)) {
    const inferred = inferEvidenceFromAnswer(item.answer, paragraphs);
    if (inferred) {
      item.evidence = inferred;
      report.repairs.push(`Questão ${index + 1}: evidência substituída por trecho encontrado no texto.`);
    } else {
      report.warnings.push(`Questão ${index + 1}: evidência não encontrada no texto.`);
    }
  }

  return item;
}

function buildFallbackQuestion(readingText, paragraphs) {
  const firstParagraph = paragraphs[0] || readingText;
  const secondParagraph = paragraphs[1] || firstParagraph;
  return {
    skill: 'main_idea',
    questionLanguage: 'pt-BR',
    question: 'Qual é a ideia principal do texto?',
    options: ['Entender a rotina ou situação principal do texto', 'Memorizar todas as palavras sem contexto', 'Ignorar os detalhes do texto'],
    answer: 'Entender a rotina ou situação principal do texto',
    evidence: secondParagraph || firstParagraph,
    explanation: 'A resposta deve resumir a ideia central usando o texto como apoio.',
    difficulty: 'easy',
  };
}

function normalizeVocabulary(vocabulary, readingText, report) {
  const text = normalizeComparable(readingText);
  return ensureArray(vocabulary)
    .map((item) => ({
      ...item,
      word: clean(item?.word || item?.term || item?.english || ''),
      meaning: clean(item?.meaning || item?.translation || item?.definition || ''),
      example: clean(item?.example || item?.sentence || ''),
      contextClue: clean(item?.contextClue || item?.context_clue || ''),
    }))
    .filter((item) => item.word && item.meaning)
    .filter((item) => {
      const appears = text.includes(normalizeComparable(item.word));
      if (!appears) report.warnings.push(`Vocabulário fora do texto: ${item.word}.`);
      return true;
    })
    .slice(0, 10);
}

function normalizeEvidenceTasks(tasks, readingQuestions, report) {
  const explicit = ensureArray(tasks)
    .map((item) => ({
      instruction: clean(item?.instruction || item?.question || 'Localize no texto a frase que prova sua resposta.'),
      expectedEvidence: clean(item?.expectedEvidence || item?.evidence || item?.quote || ''),
      skill: clean(item?.skill || 'evidence'),
    }))
    .filter((item) => item.instruction || item.expectedEvidence);

  if (explicit.length) return explicit.slice(0, 4);

  const generated = readingQuestions
    .filter((item) => item.evidence)
    .slice(0, 3)
    .map((item, index) => ({
      instruction: index === 0 ? 'Copie a frase do texto que prova a ideia principal.' : 'Copie uma frase do texto que prova sua resposta.',
      expectedEvidence: item.evidence,
      skill: 'evidence',
    }));

  if (generated.length) report.repairs.push('Tarefas de evidência criadas a partir das perguntas.');
  return generated;
}

function normalizePreReading(preReading, report) {
  const items = ensureArray(preReading)
    .map((item) => {
      if (typeof item === 'string') return { type: 'strategy', text: clean(item) };
      return {
        type: clean(item?.type || item?.kind || 'strategy'),
        text: clean(item?.text || item?.content || item?.question || item?.instruction || ''),
      };
    })
    .filter((item) => item.text)
    .slice(0, 4);

  if (!items.length) {
    report.repairs.push('Pré-leitura padrão adicionada.');
    return [
      { type: 'strategy', text: 'Leia primeiro para entender a ideia geral, sem traduzir palavra por palavra.' },
      { type: 'guiding_question', text: 'Quem aparece no texto e qual situação principal é descrita?' },
    ];
  }

  return items;
}

function normalizePostReadingPrompts(prompts, report) {
  const items = ensureArray(prompts)
    .map((item) => {
      if (typeof item === 'string') return { instruction: clean(item), minSentences: 1, maxSentences: 3 };
      return {
        instruction: clean(item?.instruction || item?.prompt || item?.text || ''),
        minSentences: Number(item?.minSentences || item?.min_sentences || 1),
        maxSentences: Number(item?.maxSentences || item?.max_sentences || 3),
      };
    })
    .filter((item) => item.instruction)
    .slice(0, 3);

  if (!items.length) {
    report.repairs.push('Produção pós-leitura padrão adicionada.');
    return [{ instruction: 'Escreva 1 a 3 frases simples sobre o texto.', minSentences: 1, maxSentences: 3 }];
  }

  return items;
}

export function applyReadingQualityGate(rawLesson = {}) {
  const report = {
    version: DEFAULT_READING_GATE_VERSION,
    ok: true,
    warnings: [],
    repairs: [],
    removedQuestions: 0,
  };

  const readingText = clean(rawLesson.readingText || rawLesson.reading_text || rawLesson.listeningText || rawLesson.transcript || '');
  const paragraphs = splitParagraphs(readingText);

  if (!readingText || wordCount(readingText) < 20) {
    report.ok = false;
    report.warnings.push('readingText vazio ou curto demais para uma aula Reading confiável.');
  }

  const readingQuestions = ensureArray(rawLesson.readingQuestions || rawLesson.questions || rawLesson.exercises)
    .map((item, index) => normalizeQuestion(item, index, readingText, paragraphs, report))
    .filter(Boolean)
    .slice(0, 8);

  const safeQuestions = readingQuestions.length
    ? readingQuestions
    : [buildFallbackQuestion(readingText, paragraphs)];

  if (!readingQuestions.length) {
    report.repairs.push('Questão fallback de ideia principal adicionada.');
  }

  const gatedLesson = {
    ...rawLesson,
    readingText,
    listeningText: rawLesson.listeningText || readingText,
    preReading: normalizePreReading(rawLesson.preReading || rawLesson.pre_reading || rawLesson.beforeReading, report),
    vocabulary: normalizeVocabulary(rawLesson.vocabulary, readingText, report),
    readingQuestions: safeQuestions,
    exercises: safeQuestions.map((item) => ({
      question: item.question,
      options: item.options,
      answer: item.answer,
      explanation: item.explanation || item.evidence,
      skill: item.skill,
      evidence: item.evidence,
      questionLanguage: item.questionLanguage,
      difficulty: item.difficulty,
    })),
    evidenceTasks: normalizeEvidenceTasks(rawLesson.evidenceTasks || rawLesson.evidence_tasks, safeQuestions, report),
    postReadingPrompts: normalizePostReadingPrompts(rawLesson.postReadingPrompts || rawLesson.post_reading_prompts || rawLesson.prompts, report),
    readingQualityGate: report,
  };

  return gatedLesson;
}

export function assertReadingQualityGate(gatedLesson = {}) {
  const report = gatedLesson.readingQualityGate;
  if (!report || report.ok === false) {
    throw new Error(report?.warnings?.[0] || 'Quality gate Reading: aula inválida.');
  }
  return true;
}
