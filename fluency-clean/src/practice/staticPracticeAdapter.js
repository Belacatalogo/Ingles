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
  const answer = clean(item.answer || item.expectedAnswer || item.correctAnswer || '');
  const rawOptions = safeArray(item.options).map(clean).filter(Boolean);
  const hasAnswer = rawOptions.some((o) => o.toLowerCase() === answer.toLowerCase());
  const options = rawOptions.length < 2
    ? buildDistractors(answer, rawOptions)
    : hasAnswer ? rawOptions : [answer, ...rawOptions.filter((o) => o.toLowerCase() !== answer.toLowerCase())].slice(0, 4);
  return makeBase(lesson, 'choice', title, item.question || item.prompt || item.instruction, answer, { options, explanation: item.explanation });
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
    const wrong = item?.wrong || item?.mistake;
    const right = item?.right || item?.correction;
    if (wrong && right) items.push(makeBase(lesson, 'correction', 'Grammar · corrija o erro', `Corrija a frase: ${wrong}`, right, { explanation: clean(item.why || item.explanation || '') }));
  });
  // B1/C1/C2 lessons store correction-style exercises in commonBrazilianMistakes with {mistake, correction} or {wrong, right}
  safeArray(lesson.commonBrazilianMistakes).forEach((item) => {
    const wrong = item?.wrong || item?.mistake;
    const right = item?.right || item?.correction;
    if (wrong && right) items.push(makeBase(lesson, 'correction', 'Grammar · corrija o erro', `Corrija a frase: ${wrong}`, right, { explanation: clean(item.note || item.explanation || item.why || '') }));
  });
  // C1/C2 practiceExercises: transformation items have original + hint
  safeArray(lesson.practiceExercises).forEach((exercise) => {
    if (exercise?.type === 'transformation' && Array.isArray(exercise.items)) {
      safeArray(exercise.items).forEach((item) => {
        const answer = clean(item.hint || item.target || item.suggested || '');
        if (item?.original && answer) {
          items.push(makeBase(lesson, 'correction', 'Grammar · formalização', `Reformule formalmente: ${item.original}`, answer));
        }
      });
    }
  });
  // B1+ controlledPractice: {instruction, items:[{prompt/sentences, answer},...]} or C2 format: {instruction, note, expected}
  safeArray(lesson.controlledPractice).forEach((group) => {
    if (!group || typeof group !== 'object') return;
    if (Array.isArray(group.items)) {
      safeArray(group.items).forEach((item) => {
        const sentences = safeArray(item.sentences).join(' ');
        const prompt = clean(item.prompt || sentences || item.sentence || item.instruction || '');
        const answer = clean(item.answer || item.correct || '');
        if (prompt && answer) items.push(makeBase(lesson, 'write', 'Grammar · prática controlada', prompt, answer));
      });
    } else if (group.expected) {
      const prompt = clean(group.instruction || '');
      const raw = clean(group.expected || '');
      const answer = raw.split(/(?<=[.!?])\s+/)[0] || raw.slice(0, 120) || '';
      if (prompt && answer) items.push(makeBase(lesson, 'write', 'Grammar · prática controlada', prompt, answer));
    }
  });
  // B1+ errorCorrectionPractice: {instruction, sentences:[], answers:[]} — parallel arrays
  safeArray(lesson.errorCorrectionPractice).forEach((group) => {
    const sentences = safeArray(group?.sentences);
    const answers = safeArray(group?.answers);
    sentences.forEach((sentence, i) => {
      const prompt = clean(sentence);
      const answer = clean(answers[i] || '');
      if (prompt && answer) items.push(makeBase(lesson, 'correction', 'Grammar · corrija o erro', `Corrija: ${prompt}`, answer));
    });
  });
  // B1+ translationPractice: {portuguese, english, note}
  safeArray(lesson.translationPractice).forEach((item) => {
    const portuguese = clean(item?.portuguese || '');
    const english = clean(item?.english || '');
    if (portuguese && english) items.push(makeBase(lesson, 'write', 'Grammar · tradução', `Traduza para inglês: "${portuguese}"`, english, { explanation: clean(item?.note || '') }));
  });
  safeArray(lesson.professorExamples).slice(0, 8).forEach((example) => {
    // professorExamples can be plain strings (C1/C2) or objects (A1/B1 {english/text} or B1 {context, example, breakdown})
    const english = typeof example === 'string' ? clean(example) : clean(example.english || example.text || example.example || '');
    if (!english) return;
    const words = english.split(/\s+/);
    if (words.length >= 3) {
      const answer = words[1] || words[0];
      const prompt = english.replace(answer, '___');
      items.push(makeBase(lesson, 'fillBlank', 'Grammar · complete', prompt, answer, { options: buildDistractors(answer, ['am', 'is', 'are', 'not']) }));
    }
    const translation = typeof example === 'object' ? (example.translation || '') : '';
    items.push(makeBase(lesson, 'write', 'Grammar · produção controlada', `Escreva exatamente este modelo em inglês: “${translation || english}”`, english));
  });
  return withMeta(items, lesson, { staticDerived: true, targetMinimum: 20, pillar: 'grammar' }).slice(0, 32);
}

function buildVocabularyPractice(lesson) {
  const items = [];
  safeArray(lesson.recognitionPractice).forEach((item) => items.push(choiceFromQuestion(lesson, item, 'Vocabulary · reconhecimento')));
  // usagePractice uses the same q() format as recognitionPractice
  safeArray(lesson.usagePractice).forEach((item) => items.push(choiceFromQuestion(lesson, item, 'Vocabulary · uso')));
  safeArray(lesson.lexicalSets).forEach((set) => safeArray(set.items).forEach((word) => {
    items.push(makeBase(lesson, 'choice', 'Vocabulary · associação', `Qual palavra pertence ao tema “${set.title || lesson.theme}”?`, word, { options: buildDistractors(word, safeArray(set.items).filter((item) => item !== word)) }));
    items.push(makeBase(lesson, 'write', 'Vocabulary · escrita controlada', `Digite a palavra em inglês: ${word}`, word));
  }));
  // B1+ lessons use essentialWords: [{word, definition, example, brazilianNote}]
  const essWords = safeArray(lesson.essentialWords);
  if (essWords.length) {
    const wordList = essWords.map((w) => clean(w.word || '')).filter(Boolean);
    essWords.forEach((entry) => {
      const wordText = clean(entry.word || '');
      const defText = clean(entry.definition || entry.meaning || '').split(' / ')[0].split('/')[0].trim();
      const exampleText = clean(entry.example || '');
      if (!wordText || !defText) return;
      items.push(makeBase(lesson, 'choice', 'Vocabulary · reconhecimento', `Qual palavra em inglês significa “${defText}”?`, wordText, { options: buildDistractors(wordText, wordList.filter((w) => w !== wordText)), explanation: clean(entry.brazilianNote || '') }));
      if (exampleText && exampleText.length <= 100) {
        const blankPrompt = exampleText.replace(new RegExp(`\\b${wordText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'), '___');
        if (blankPrompt !== exampleText) items.push(makeBase(lesson, 'fillBlank', 'Vocabulary · uso em contexto', blankPrompt, wordText, { options: buildDistractors(wordText, wordList.filter((w) => w !== wordText)) }));
      }
    });
  }
  // B1+ lessons use chunks: [{chunk, meaning, example}]
  safeArray(lesson.chunks).forEach((entry) => {
    const chunkText = clean(entry.chunk || entry.text || '');
    const meaning = clean(entry.meaning || entry.translation || '');
    if (chunkText && meaning && chunkText.length <= 60) items.push(makeBase(lesson, 'write', 'Vocabulary · chunk', `Escreva em inglês: “${meaning}”`, chunkText));
  });
  safeArray(lesson.examples).forEach((example) => {
    const text = clean(example.text || example.english);
    if (text) items.push(makeBase(lesson, 'write', 'Vocabulary · frase modelo', `Copie a frase modelo: ${text}`, text));
  });
  return withMeta(items, lesson, { staticDerived: true, targetMinimum: 18, pillar: 'vocabulary' }).slice(0, 30);
}

function buildReadingPractice(lesson) {
  const items = [];
  const mainText = clean(lesson.mainText || lesson.passage || '');
  const vocabSource = safeArray(lesson.preReadingVocabulary).length ? lesson.preReadingVocabulary : safeArray(lesson.vocabulary);

  function answerFromTextOrRaw(prompt, rawAnswer) {
    if (rawAnswer) return rawAnswer.split(/(?<=[.!?])\s+/)[0] || rawAnswer.slice(0, 120) || '';
    if (!mainText || !prompt) return '';
    const quotedMatch = prompt.match(/"([^"]{5,60})"/);
    const searchTerm = quotedMatch ? quotedMatch[1] : prompt.split(/\s+/).slice(0, 5).join(' ');
    const found = firstSentenceContaining(mainText, searchTerm);
    return found && found.split(/\s+/).length <= 30 ? found.slice(0, 150) : '';
  }

  // evidenceQuestions: A1/A2 have options (→ choice), B1+ are open-ended (→ write)
  safeArray(lesson.evidenceQuestions).forEach((item) => {
    if (safeArray(item.options).length >= 2) {
      items.push(choiceFromQuestion(lesson, item, 'Reading · compreensão'));
    } else {
      const prompt = clean(item.question || item.prompt || item.instruction || '');
      const raw = clean(item.evidence || item.answer || item.expectedAnswer || '');
      const answer = answerFromTextOrRaw(prompt, raw);
      if (prompt && answer) items.push(makeBase(lesson, 'write', 'Reading · compreensão', prompt, answer, { explanation: clean(item.explanation || '') }));
    }
  });

  // B1+ format: comprehensionQuestions — may or may not have options
  safeArray(lesson.comprehensionQuestions).forEach((item) => {
    if (safeArray(item.options).length >= 2) {
      items.push(choiceFromQuestion(lesson, item, 'Reading · compreensão'));
    } else {
      const prompt = clean(item.question || item.prompt || item.instruction || '');
      const raw = clean(item.evidence || item.answer || item.expectedAnswer || '');
      const answer = answerFromTextOrRaw(prompt, raw);
      if (prompt && answer) items.push(makeBase(lesson, 'write', 'Reading · compreensão', prompt, answer, { explanation: clean(item.explanation || '') }));
    }
  });

  // C1/C2 format: tasks — {instruction, note, expected}
  safeArray(lesson.tasks).slice(0, 6).forEach((item) => {
    const prompt = clean(item.instruction || item.prompt || '');
    const raw = clean(item.expected || item.answer || item.note || '');
    const answer = raw.split(/(?<=[.!?])\s+/)[0] || raw.slice(0, 120) || '';
    if (prompt && answer) items.push(makeBase(lesson, 'write', 'Reading · análise', prompt, answer));
  });

  // Vocabulary in context from preReadingVocabulary or vocabulary
  safeArray(vocabSource).forEach((vocab) => {
    const word = clean(vocab?.word || '');
    const meaning = clean(vocab?.meaning || vocab?.definition || '');
    if (word && meaning) items.push(makeBase(lesson, 'choice', 'Reading · vocabulário no contexto', `No texto, qual palavra é ligada a “${meaning}”?`, word, { options: buildDistractors(word, safeArray(vocabSource).map((v) => clean(v.word || '')).filter(Boolean)) }));
  });

  // Dictation: find any sentence ≤18 words (prefer first, fall back to any)
  const allSentences = mainText ? mainText.split(/(?<=[.!?])\s+/) : [];
  const dictSentence = allSentences.find((s) => s.split(/\s+/).length <= 18) || '';
  if (dictSentence) items.push(makeBase(lesson, 'dictation', 'Reading · frase-chave', 'Copie esta frase do texto.', dictSentence));

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
  const modelText = clean(lesson.modelText || lesson.modelParagraph || '');
  const sentences = modelText.split(/(?<=[.!?])\s+/).filter(Boolean);
  sentences.slice(0, 8).forEach((sentence) => items.push(makeBase(lesson, 'write', 'Writing · copiar modelo', `Copie a frase modelo: ${sentence}`, sentence)));
  safeArray(lesson.writingBlocks).forEach((block) => {
    // blocks can be objects {label, text, purpose} or plain strings
    const text = clean(block?.text || block?.label || block);
    if (!text || text === '[object Object]') return;
    items.push(makeBase(lesson, 'fillBlank', 'Writing · bloco útil', `Complete o bloco: ${stripFinalPunctuation(text).replace(/\.\.\.|…/g, '___')}`, text, { options: buildDistractors(text, safeArray(lesson.writingBlocks).map((b) => clean(b?.text || b?.label || b)).filter(Boolean)) }));
  });
  safeArray(lesson.guidedSubstitution).forEach((task) => {
    const text = clean(task?.instruction || task);
    const answer = text.includes('→') ? clean(text.split('→').pop()) : text;
    if (answer) items.push(makeBase(lesson, 'write', 'Writing · substituição guiada', text, answer));
  });
  safeArray(lesson.grammarForWriting).forEach((rule) => {
    // rules can be objects {instruction, note, expected} or plain strings
    const prompt = clean(rule?.instruction || rule);
    if (!prompt || prompt === '[object Object]') return;
    items.push(makeBase(lesson, 'choice', 'Writing · revisão', prompt, 'Entendi', { options: ['Entendi', 'Não entendi'] }));
  });
  // C1/C2 writing lessons use 'tasks' for structured writing exercises
  safeArray(lesson.tasks).slice(0, 4).forEach((item) => {
    const prompt = clean(item?.instruction || item?.writingTask || item);
    const answer = clean(item?.expected || item?.modelAnswer || item?.note || prompt);
    if (prompt && prompt.length <= 200) items.push(makeBase(lesson, 'write', 'Writing · produção', prompt, answer));
  });
  // B1+ writing lessons use productionTasks
  safeArray(lesson.productionTasks).slice(0, 3).forEach((task) => {
    const prompt = clean(task?.instruction || task);
    if (prompt && prompt.length <= 150) items.push(makeBase(lesson, 'write', 'Writing · tarefa', prompt, prompt));
  });
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
