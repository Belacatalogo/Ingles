const STATIC_SOURCE = 'static-curriculum';

function clean(value) { return String(value ?? '').replace(/\s+/g, ' ').trim(); }
function safeArray(value) { return Array.isArray(value) ? value : []; }
function stripFinalPunctuation(value) { return clean(value).replace(/[.!?]+$/g, ''); }
function firstSentenceContaining(text, term) {
  const needle = clean(term).toLowerCase();
  return clean(text).split(/(?<=[.!?])\s+/).find((sentence) => sentence.toLowerCase().includes(needle)) || '';
}
function uniqueByPrompt(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.type}:${clean(item.prompt).toLowerCase()}:${clean(item.answer).toLowerCase()}`;
    if (!item.prompt || !item.answer || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function makeBase(lesson, type, title, prompt, answer, extra = {}) {
  return {
    id: extra.id || `${lesson?.id || 'static'}-${type}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    title,
    prompt: clean(prompt),
    answer: clean(answer),
    options: safeArray(extra.options).map(clean).filter(Boolean),
    words: safeArray(extra.words).map(clean).filter(Boolean),
    audioText: clean(extra.audioText || answer),
    phase: extra.phase || title,
    skill: lesson?.pillar || lesson?.type || 'mixed',
    transferTags: safeArray(lesson?.tags),
    sourceEngine: STATIC_SOURCE,
    staticLessonId: lesson?.id || '',
    explanation: clean(extra.explanation || ''),
  };
}
function withMeta(items, lesson, quality = {}) {
  return uniqueByPrompt(items).map((item, index) => ({
    ...item,
    id: `${lesson?.id || 'static'}-deep-${String(index + 1).padStart(3, '0')}`,
    practicePlanQuality: quality,
    practicePlanSummary: {
      staticDerived: true,
      lessonId: lesson?.id || '',
      pillar: lesson?.pillar || lesson?.type || '',
      level: lesson?.level || 'A1',
      source: STATIC_SOURCE,
    },
  }));
}
function choiceFromQuestion(lesson, item, title = 'Reconhecimento') {
  return makeBase(lesson, 'choice', title, item.question || item.prompt || item.instruction, item.answer || item.expectedAnswer || item.correctAnswer, { options: item.options, explanation: item.explanation });
}
function buildDistractors(answer, options = []) {
  const base = [answer, ...safeArray(options), 'I am', 'You are', 'She is', 'They are', 'My name is'].map(clean).filter(Boolean);
  const seen = new Set();
  return base.filter((item) => { const key = item.toLowerCase(); if (seen.has(key)) return false; seen.add(key); return true; }).slice(0, 4);
}

function buildGrammarPractice(lesson) {
  const items = [];
  safeArray(lesson.guidedPractice).forEach((item) => items.push(choiceFromQuestion(lesson, item, 'Grammar · reconhecimento')));
  safeArray(lesson.transformationPractice).forEach((item) => items.push(choiceFromQuestion(lesson, item, 'Grammar · transformação')));
  safeArray(lesson.commonMistakes).forEach((item) => {
    if (item?.wrong && item?.right) items.push(makeBase(lesson, 'correction', 'Grammar · corrija o erro', `Corrija a frase: ${item.wrong}`, item.right, { explanation: item.why }));
  });
  safeArray(lesson.professorExamples).slice(0, 8).forEach((example) => {
    const english = clean(example.english || example.text);
    if (!english) return;
    const words = english.split(/\s+/);
    if (words.length >= 3) {
      const answer = words[1] || words[0];
      const prompt = english.replace(answer, '___');
      items.push(makeBase(lesson, 'fillBlank', 'Grammar · complete', prompt, answer, { options: buildDistractors(answer, ['am', 'is', 'are', 'not']) }));
    }
    items.push(makeBase(lesson, 'write', 'Grammar · produção controlada', `Escreva exatamente este modelo em inglês: “${example.translation || english}”`, english));
  });
  return withMeta(items, lesson, { staticDerived: true, targetMinimum: 20, pillar: 'grammar' }).slice(0, 32);
}

function buildVocabularyPractice(lesson) {
  const items = [];
  safeArray(lesson.recognitionPractice).forEach((item) => items.push(choiceFromQuestion(lesson, item, 'Vocabulary · reconhecimento')));
  safeArray(lesson.lexicalSets).forEach((set) => safeArray(set.items).forEach((word) => {
    items.push(makeBase(lesson, 'choice', 'Vocabulary · associação', `Qual palavra pertence ao tema “${set.title || lesson.theme}”?`, word, { options: buildDistractors(word, safeArray(set.items).filter((item) => item !== word)) }));
    items.push(makeBase(lesson, 'write', 'Vocabulary · escrita controlada', `Digite a palavra em inglês: ${word}`, word));
  }));
  safeArray(lesson.examples).forEach((example) => {
    const text = clean(example.text || example.english);
    if (text) items.push(makeBase(lesson, 'write', 'Vocabulary · frase modelo', `Copie a frase modelo: ${text}`, text));
  });
  return withMeta(items, lesson, { staticDerived: true, targetMinimum: 18, pillar: 'vocabulary' }).slice(0, 30);
}

function buildReadingPractice(lesson) {
  const items = [];
  safeArray(lesson.comprehensionQuestions).forEach((item) => items.push(choiceFromQuestion(lesson, item, 'Reading · compreensão')));
  safeArray(lesson.vocabulary).forEach((vocab) => {
    if (vocab?.word && vocab?.meaning) items.push(makeBase(lesson, 'choice', 'Reading · vocabulário no contexto', `No texto, qual palavra é ligada a “${vocab.meaning}”?`, vocab.word, { options: buildDistractors(vocab.word, safeArray(lesson.vocabulary).map((item) => item.word)) }));
  });
  safeArray(lesson.evidenceTasks).forEach((task) => {
    const text = clean(task.instruction || task.prompt || task);
    const keyword = text.match(/\b(name|Brazil|student|family|friend|teacher|English|city)\b/i)?.[1] || '';
    const evidence = firstSentenceContaining(lesson.mainText, keyword) || clean(lesson.mainText).split(/(?<=[.!?])\s+/)[0] || '';
    if (evidence) items.push(makeBase(lesson, 'write', 'Reading · evidência textual', text, evidence));
  });
  const firstSentence = clean(lesson.mainText).split(/(?<=[.!?])\s+/)[0] || '';
  if (firstSentence) items.push(makeBase(lesson, 'dictation', 'Reading · frase-chave', 'Copie a primeira frase do texto.', firstSentence));
  return withMeta(items, lesson, { staticDerived: true, targetMinimum: 12, pillar: 'reading', evidenceBased: true }).slice(0, 28);
}

function buildListeningPractice(lesson) {
  const items = [];
  safeArray(lesson.comprehensionQuestions).forEach((item) => {
    const base = choiceFromQuestion(lesson, item, 'Listening · compreensão');
    items.push({ ...base, type: 'listenChoice', audioText: lesson.audioScript || lesson.transcript || base.answer });
  });
  safeArray(lesson.shadowing).forEach((line) => {
    const text = clean(line);
    if (!text) return;
    items.push(makeBase(lesson, 'dictation', 'Listening · dictation leve', 'Ouça e digite a frase curta.', text, { audioText: text }));
    items.push(makeBase(lesson, 'speak', 'Listening · shadowing', `Repita em voz alta: ${text}`, text, { audioText: text }));
  });
  safeArray(lesson.firstListenTasks).slice(0, 3).forEach((task) => {
    const text = clean(task.instruction || task);
    if (text) items.push(makeBase(lesson, 'choice', 'Listening · primeira escuta', text, 'Sim', { options: ['Sim', 'Não'] }));
  });
  return withMeta(items, lesson, { staticDerived: true, targetMinimum: 14, pillar: 'listening', transcriptBound: true }).slice(0, 24);
}

function buildSpeakingPractice(lesson) {
  const items = [];
  safeArray(lesson.modelPhrases).forEach((phrase) => {
    const text = clean(phrase);
    if (text) items.push(makeBase(lesson, 'speak', 'Speaking · repetição', `Fale em voz alta: ${text}`, text, { audioText: text }));
  });
  safeArray(lesson.substitutionDrills).forEach((drill) => {
    const text = clean(drill.instruction || drill);
    const answer = text.includes('→') ? clean(text.split('→').pop()) : text;
    if (answer) items.push(makeBase(lesson, 'write', 'Speaking · substituição controlada', text, answer));
  });
  safeArray(lesson.guidedSpeaking).forEach((task) => {
    const prompt = clean(task.instruction || task);
    if (prompt) items.push(makeBase(lesson, 'speak', 'Speaking · resposta guiada', prompt, safeArray(lesson.modelPhrases)[0] || 'Hello.'));
  });
  return withMeta(items, lesson, { staticDerived: true, targetMinimum: 14, pillar: 'speaking' }).slice(0, 28);
}

function buildWritingPractice(lesson) {
  const items = [];
  const sentences = clean(lesson.modelText).split(/(?<=[.!?])\s+/).filter(Boolean);
  sentences.slice(0, 8).forEach((sentence) => items.push(makeBase(lesson, 'write', 'Writing · copiar modelo', `Copie a frase modelo: ${sentence}`, sentence)));
  safeArray(lesson.writingBlocks).forEach((block) => {
    const text = clean(block);
    if (text) items.push(makeBase(lesson, 'fillBlank', 'Writing · bloco útil', `Complete o bloco: ${stripFinalPunctuation(text).replace(/\.\.\.|…/g, '___')}`, text, { options: buildDistractors(text, safeArray(lesson.writingBlocks)) }));
  });
  safeArray(lesson.guidedSubstitution).forEach((task) => {
    const text = clean(task.instruction || task);
    const answer = text.includes('→') ? clean(text.split('→').pop()) : text;
    if (answer) items.push(makeBase(lesson, 'write', 'Writing · substituição guiada', text, answer));
  });
  safeArray(lesson.grammarForWriting).forEach((rule) => items.push(makeBase(lesson, 'choice', 'Writing · revisão', clean(rule), 'Entendi', { options: ['Entendi', 'Não entendi'] })));
  return withMeta(items, lesson, { staticDerived: true, targetMinimum: 14, pillar: 'writing' }).slice(0, 28);
}

export function isStaticPracticeLesson(lesson) {
  return clean(lesson?.schemaVersion).startsWith('static-lesson-schema') || Boolean(lesson?.pillar && lesson?.status === 'ready');
}

export function buildStaticPracticeItems(lesson, options = {}) {
  const pillar = clean(lesson?.pillar || lesson?.type).toLowerCase();
  let items = [];
  if (pillar === 'grammar') items = buildGrammarPractice(lesson);
  else if (pillar === 'vocabulary') items = buildVocabularyPractice(lesson);
  else if (pillar === 'reading') items = buildReadingPractice(lesson);
  else if (pillar === 'listening') items = buildListeningPractice(lesson);
  else if (pillar === 'speaking') items = buildSpeakingPractice(lesson);
  else if (pillar === 'writing') items = buildWritingPractice(lesson);
  const min = Number(options.min || 10);
  const max = Number(options.max || 36);
  const selected = items.slice(0, max);
  return selected.length >= min ? selected : selected;
}

export function getStaticPracticeEngineName() { return STATIC_SOURCE; }
