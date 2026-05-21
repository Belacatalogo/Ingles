import { normalizeStaticLevel, normalizeStaticPillar, STATIC_LESSON_SCHEMA_VERSION, STATIC_LESSON_STATUS } from './lessonSchema.js';

function clean(value) { return String(value ?? '').trim(); }
function safeArray(value) { return Array.isArray(value) ? value : []; }
function safeObject(value) { return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; }
function firstNonEmpty(...values) { return values.map(clean).find(Boolean) || ''; }
function taskOrNull(value) { return value && typeof value === 'object' ? value : value ? { instruction: clean(value) } : null; }

function makeId({ level, pillar, order, id }) {
  if (id) return clean(id);
  return `${level}-${pillar.toUpperCase()}-${String(order || 1).padStart(3, '0')}`;
}

function normalizeDeepCommon(input = {}) {
  return {
    teacherOpening: clean(input.teacherOpening),
    whyItMatters: clean(input.whyItMatters),
    realLifeUseCases: safeArray(input.realLifeUseCases),
    conceptExplanation: clean(input.conceptExplanation),
    mentalModel: input.mentalModel || null,
    stepByStep: safeArray(input.stepByStep),
    portugueseContrast: safeArray(input.portugueseContrast),
    guidedDiscovery: safeArray(input.guidedDiscovery),
    guidedBeforeQuiz: safeArray(input.guidedBeforeQuiz),
    selfAssessment: safeArray(input.selfAssessment),
    lessonRecap: safeArray(input.lessonRecap),
    nextLessonBridge: clean(input.nextLessonBridge),
  };
}

function hasChoicePractice(...groups) {
  return groups.flat().some((item) => item && typeof item === 'object' && clean(item.question) && safeArray(item.options).length >= 2 && clean(item.answer));
}

function normalizeVocabEntry(entry = {}) {
  if (typeof entry === 'string') return { term: clean(entry), meaning: '' };
  if (!entry || typeof entry !== 'object') return { term: '', meaning: '' };
  return {
    term: firstNonEmpty(entry.word, entry.term, entry.english, entry.phrase, entry.chunk, entry.text, entry.label),
    meaning: firstNonEmpty(entry.translation, entry.meaning, entry.pt, entry.portuguese, entry.definition, entry.explanation),
  };
}

function createFallbackGrammarPractice(input = {}) {
  const title = clean(input.title) || 'grammar';
  const goal = firstNonEmpty(input.grammarGoal, input.objectives?.[0], `Usar ${title} em frase A1.`);
  const sample = firstNonEmpty(
    input.teacherExamples?.[0]?.english,
    input.professorExamples?.[0]?.english,
    input.teacherExamples?.[0]?.text,
    input.professorExamples?.[0]?.text,
    input.formationGuide?.[0]?.note,
    input.formationGuide?.[0]?.text,
    'I study English.'
  );
  return [
    {
      question: `Qual opção combina com a aula de ${title}?`,
      options: [sample, 'Wrong sentence', 'No answer'],
      answer: sample,
      explanation: `Use a forma ensinada nesta aula: ${goal}`,
    },
    {
      question: `Qual alternativa é uma prática segura de ${title}?`,
      options: [sample, 'Portuguese word order', 'Missing verb'],
      answer: sample,
      explanation: 'A resposta correta mantém uma frase curta, completa e adequada ao nível A1.',
    },
  ];
}

function createFallbackVocabularyPractice(input = {}) {
  const title = clean(input.title) || 'vocabulário';
  const rawEntries = [
    ...safeArray(input.essentialWords),
    ...safeArray(input.chunks),
    ...safeArray(input.lexicalSets).flatMap((set) => safeArray(set?.items || set?.words || set?.entries)),
    ...safeArray(input.examples),
  ].map(normalizeVocabEntry).filter((entry) => entry.term);

  const primary = rawEntries[0] || { term: 'hello', meaning: 'olá' };
  const secondary = rawEntries.find((entry) => entry.term !== primary.term) || { term: 'goodbye', meaning: 'tchau' };
  const third = rawEntries.find((entry) => entry.term !== primary.term && entry.term !== secondary.term) || { term: 'thank you', meaning: 'obrigado' };
  const primaryMeaning = primary.meaning || `vocabulário de ${title}`;
  // Não repetir o título nem o termo-resposta no enunciado (gerava
  // "Pergunta parece entregar a resposta", ex.: tema Clothes / resposta clothes).
  // Definições longas (schema C1/C2) podem conter a própria palavra-resposta —
  // nesse caso usa o enunciado neutro para não entregar a resposta.
  const meaningRevealsAnswer = primary.meaning && primary.term
    && primary.meaning.toLowerCase().includes(primary.term.toLowerCase());
  const recognitionPrompt = primary.meaning && !meaningRevealsAnswer
    ? `Qual palavra ou chunk corresponde a “${primary.meaning}”?`
    : 'Qual destas opções é uma palavra ou chunk desta aula?';

  return [
    {
      question: recognitionPrompt,
      options: [primary.term, secondary.term, third.term],
      answer: primary.term,
      explanation: `A aula trabalha ${primary.term}${primary.meaning ? ` = ${primary.meaning}` : ''}.`,
    },
    {
      question: `Qual opção combina com “${primary.term}”?`,
      options: [primaryMeaning, 'opção incorreta', 'fora do tema'],
      answer: primaryMeaning,
      explanation: 'Escolha o significado ou uso apresentado no vocabulário da aula.',
    },
  ];
}

export function createStaticLessonBase(input = {}) {
  const level = normalizeStaticLevel(input.level);
  const pillar = normalizeStaticPillar(input.pillar);
  const order = Number(input.order || 1);
  return {
    schemaVersion: input.schemaVersion || STATIC_LESSON_SCHEMA_VERSION,
    id: makeId({ level, pillar, order, id: input.id }),
    level,
    pillar,
    type: pillar,
    title: clean(input.title) || `${pillar} ${level}`,
    order,
    estimatedMinutes: Number(input.estimatedMinutes || 30),
    prerequisites: safeArray(input.prerequisites).map(clean).filter(Boolean),
    objectives: safeArray(input.objectives).map(clean).filter(Boolean),
    masteryCriteria: safeObject(input.masteryCriteria),
    status: input.status || STATIC_LESSON_STATUS.DRAFT,
    tags: safeArray(input.tags).map(clean).filter(Boolean),
    ...normalizeDeepCommon(input),
  };
}

export function createGrammarLesson(input = {}) {
  const professorExamples = safeArray(input.teacherExamples?.length ? input.teacherExamples : input.professorExamples);
  const commonMistakes = safeArray(input.commonBrazilianMistakes?.length ? input.commonBrazilianMistakes : input.commonMistakes);
  const guidedPractice = safeArray(input.guidedPractice);
  const controlledPractice = safeArray(input.controlledPractice);
  const errorCorrectionPractice = safeArray(input.errorCorrectionPractice);
  const translationPractice = safeArray(input.translationPractice);
  const transformationPractice = safeArray(input.transformationPractice);
  const fallbackPractice = hasChoicePractice(guidedPractice, controlledPractice, errorCorrectionPractice, translationPractice, transformationPractice) ? [] : createFallbackGrammarPractice({ ...input, teacherExamples: professorExamples });
  return {
    ...createStaticLessonBase({ ...input, pillar: 'grammar' }),
    grammarGoal: clean(input.grammarGoal),
    formationGuide: safeArray(input.formationGuide),
    whenToUse: safeArray(input.whenToUse),
    whenNotToUse: safeArray(input.whenNotToUse),
    grammarTable: safeArray(input.grammarTable),
    teacherExamples: professorExamples,
    commonBrazilianMistakes: commonMistakes,
    controlledPractice,
    errorCorrectionPractice,
    translationPractice,
    explanationSections: safeArray(input.explanationSections),
    professorExamples,
    commonMistakes,
    guidedPractice: guidedPractice.length ? guidedPractice : fallbackPractice,
    transformationPractice,
    productionTasks: safeArray(input.productionTasks),
    finalChecklist: safeArray(input.finalChecklist),
  };
}

// Normaliza uma entrada de palavra para o schema essentialWords, preservando
// definição, exemplo(s) e colocações. Aceita os schemas de autor targetWords
// (word/definition/exampleSentences/collocations) e words (word/definition/
// example/collocations) além do próprio essentialWords.
function normalizeEssentialWord(entry = {}) {
  if (typeof entry === 'string') return clean(entry) ? { word: clean(entry), meaning: '', example: '' } : null;
  if (!entry || typeof entry !== 'object') return null;
  const word = firstNonEmpty(entry.word, entry.term, entry.phrase, entry.english);
  if (!word) return null;
  const exampleSentences = safeArray(entry.exampleSentences).map(clean).filter(Boolean);
  return {
    word,
    partOfSpeech: clean(entry.partOfSpeech),
    definition: firstNonEmpty(entry.definition, entry.meaning, entry.translation, entry.explanation),
    meaning: firstNonEmpty(entry.meaning, entry.translation, entry.definition),
    example: firstNonEmpty(entry.example, exampleSentences[0]),
    exampleSentences,
    collocations: safeArray(entry.collocations).map(clean).filter(Boolean),
    note: firstNonEmpty(entry.note, entry.register),
  };
}

export function createVocabularyLesson(input = {}) {
  // Schemas alternativos de autor para a lista de palavras: targetWords, words,
  // e targetCategories (palavras aninhadas em connectors/words por categoria).
  const categoryWords = safeArray(input.targetCategories)
    .flatMap((cat) => safeArray(cat?.connectors || cat?.words || cat?.items));
  // Preserva essentialWords da fonte; só sintetiza dos schemas alternativos
  // quando essentialWords está ausente/vazio.
  const essentialWords = safeArray(input.essentialWords).length
    ? safeArray(input.essentialWords)
    : [...safeArray(input.targetWords), ...safeArray(input.words), ...categoryWords].map(normalizeEssentialWord).filter(Boolean);

  // practiceExercises (schema antigo) vira usage/production quando os campos
  // canônicos não foram fornecidos.
  const practiceExercises = safeArray(input.practiceExercises);
  const usagePractice = safeArray(input.usagePractice).length
    ? safeArray(input.usagePractice)
    : practiceExercises.filter((ex) => clean(ex?.type) !== 'production');
  const productionTasks = safeArray(input.productionTasks).length
    ? safeArray(input.productionTasks)
    : practiceExercises.filter((ex) => clean(ex?.type) === 'production');

  // Exemplos por categoria (targetCategories[].examples) viram contexto quando
  // não há examples canônicos.
  const categoryExamples = safeArray(input.targetCategories).flatMap((cat) => safeArray(cat?.examples));
  const examples = safeArray(input.examples).length ? safeArray(input.examples) : categoryExamples;
  const recognitionPractice = safeArray(input.recognitionPractice);
  // O fallback usa o vocabulário real (essentialWords sintetizado), evitando
  // o placeholder genérico em aulas cujo schema não trazia recognitionPractice.
  const fallbackPractice = hasChoicePractice(recognitionPractice, usagePractice)
    ? []
    : createFallbackVocabularyPractice({ ...input, essentialWords, examples });
  return {
    ...createStaticLessonBase({ ...input, pillar: 'vocabulary' }),
    topicContext: clean(input.topicContext),
    essentialWords,
    chunks: safeArray(input.chunks),
    pronunciationFocus: input.pronunciationFocus || null,
    dangerousConfusions: safeArray(input.dangerousConfusions),
    collocations: safeArray(input.collocations),
    miniDialogues: safeArray(input.miniDialogues),
    spacedReview: safeArray(input.spacedReview),
    theme: firstNonEmpty(input.theme, input.title),
    lexicalSets: safeArray(input.lexicalSets),
    pronunciationNotes: safeArray(input.pronunciationNotes),
    examples,
    recognitionPractice: [...recognitionPractice, ...fallbackPractice],
    usagePractice,
    productionTasks,
  };
}

export function createReadingLesson(input = {}) {
  const readingText = safeObject(input.readingText);
  const readingBody = clean(readingText.body || readingText.text);
  const mainText = clean(input.mainText) || readingBody;
  return {
    ...createStaticLessonBase({ ...input, pillar: 'reading' }),
    readingPurpose: clean(input.readingPurpose),
    preReadingVocabulary: safeArray(input.preReadingVocabulary),
    readingStrategy: safeArray(input.readingStrategy),
    firstReadTask: taskOrNull(input.firstReadTask),
    secondReadTasks: safeArray(input.secondReadTasks),
    evidenceQuestions: safeArray(input.evidenceQuestions?.length ? input.evidenceQuestions : input.comprehensionQuestions),
    contextVocabularyTasks: safeArray(input.contextVocabularyTasks),
    guidedSummary: taskOrNull(input.guidedSummary),
    connectedProduction: taskOrNull(input.connectedProduction || input.productionTask),
    preReading: safeArray(input.preReading),
    mainText,
    vocabulary: safeArray(input.vocabulary),
    comprehensionQuestions: safeArray(input.comprehensionQuestions),
    evidenceTasks: safeArray(input.evidenceTasks),
    shortResponse: safeArray(input.shortResponse),
    productionTask: input.productionTask || null,
    // Schema universal/C2 — preservar sem transformar.
    tasks: safeArray(input.tasks),
    passage: clean(input.passage),
    wordCount: typeof input.wordCount === 'number' ? input.wordCount : (typeof readingText.wordCount === 'number' ? readingText.wordCount : null),
    // Schema premium B2/C1 — preservar readingText, paraphrasingTask, discussionTasks.
    readingText,
    paraphrasingTask: input.paraphrasingTask && typeof input.paraphrasingTask === 'object' ? input.paraphrasingTask : null,
    discussionTasks: safeArray(input.discussionTasks),
  };
}

export function createListeningLesson(input = {}) {
  const transcript = clean(input.transcript || input.audioScript);
  // Schemas alternativos usam firstListenTask/secondListenTask (singular).
  // Preserva o plural quando existir; senão, promove o singular a array.
  const firstListenTasks = safeArray(input.firstListenTasks).length
    ? safeArray(input.firstListenTasks)
    : (input.firstListenTask ? [input.firstListenTask] : []);
  const secondListenTasks = safeArray(input.secondListenTasks).length
    ? safeArray(input.secondListenTasks)
    : (input.secondListenTask ? [input.secondListenTask] : []);
  return {
    ...createStaticLessonBase({ ...input, pillar: 'listening' }),
    listeningPreparation: safeArray(input.listeningPreparation),
    audioDescription: clean(input.audioDescription),
    keyWordsToHear: safeArray(input.keyWordsToHear),
    audioScript: clean(input.audioScript || transcript),
    firstListenTasks,
    secondListenTasks,
    transcript,
    vocabulary: safeArray(input.vocabulary),
    shadowing: safeArray(input.shadowing),
    dictationTasks: safeArray(input.dictationTasks),
    pronunciationChunks: safeArray(input.pronunciationChunks),
    listeningComprehension: safeArray(input.listeningComprehension?.length ? input.listeningComprehension : input.comprehensionQuestions),
    oralProduction: taskOrNull(input.oralProduction),
    comprehensionQuestions: safeArray(input.comprehensionQuestions),
    // Schema premium dos pacotes B2/C1/C2 — preservar staged listeningTasks
    // e audioMetadata; o auditor reconhece depois (Bloco 7A).
    listeningTasks: safeArray(input.listeningTasks),
    audioMetadata: safeObject(input.audioMetadata),
    // Schema universal/C2.
    tasks: safeArray(input.tasks),
  };
}

export function createSpeakingLesson(input = {}) {
  return {
    ...createStaticLessonBase({ ...input, pillar: 'speaking' }),
    speakingSituation: typeof input.speakingSituation === 'object' && input.speakingSituation !== null
      ? clean(input.speakingSituation.context || input.speakingSituation.text || '')
      : clean(input.speakingSituation),
    modelPhrases: safeArray(input.modelPhrases),
    pronunciationChunks: safeArray(input.pronunciationChunks),
    repeatAfterMe: safeArray(input.repeatAfterMe),
    substitutionDrills: safeArray(input.substitutionDrills),
    questionAnswerDrills: safeArray(input.questionAnswerDrills),
    buildYourAnswer: safeArray(input.buildYourAnswer),
    speakingChecklist: safeArray(input.speakingChecklist),
    pronunciationFocus: input.pronunciationFocus || null,
    guidedSpeaking: safeArray(input.guidedSpeaking),
    recordingTasks: safeArray(input.recordingTasks),
    freeSpeaking: Array.isArray(input.freeSpeaking)
      ? input.freeSpeaking
      : (input.freeSpeaking && typeof input.freeSpeaking === 'object' ? [input.freeSpeaking] : []),
    // Schema premium dos pacotes B2/C1/C2 — preservar sem transformar
    // checklist passivo em exercício; o auditor decide depois (Bloco 7A).
    warmUp: safeArray(input.warmUp),
    guidedPractice: safeArray(input.guidedPractice),
    // Schema universal/C2.
    tasks: safeArray(input.tasks),
    prompt: clean(input.prompt),
  };
}

export function createWritingLesson(input = {}) {
  return {
    ...createStaticLessonBase({ ...input, pillar: 'writing' }),
    modelText: clean(input.modelText),
    modelTextBreakdown: safeArray(input.modelTextBreakdown),
    writingBlocks: safeArray(input.writingBlocks),
    grammarForWriting: safeArray(input.grammarForWriting),
    usefulSentences: safeArray(input.usefulSentences),
    guidedSubstitution: safeArray(input.guidedSubstitution),
    commonWritingMistakes: safeArray(input.commonWritingMistakes),
    revisionChecklist: safeArray(input.revisionChecklist?.length ? input.revisionChecklist : input.checklist),
    finalVersionTask: taskOrNull(input.finalVersionTask || input.revisionTask),
    feedbackPreparation: safeArray(input.feedbackPreparation),
    checklist: safeArray(input.checklist),
    draftTask: input.draftTask || null,
    revisionTask: input.revisionTask || null,
    // Schema premium dos pacotes B2/C1/C2 — preservar sem transformar.
    writingTasks: safeArray(input.writingTasks),
    writingModel: safeObject(input.writingModel),
    writingChecklist: safeArray(input.writingChecklist),
    grammarAnnotations: safeArray(input.grammarAnnotations),
    // Schema universal/C2.
    tasks: safeArray(input.tasks),
    writingTask: clean(input.writingTask),
    inputText: clean(input.inputText),
    wordTarget: typeof input.wordTarget === 'number' ? input.wordTarget : null,
  };
}

export function createCheckpointLesson(input = {}) {
  return {
    ...createStaticLessonBase({ ...input, pillar: 'checkpoint' }),
    checkpointType: input.checkpointType || 'pillar',
    targetPillars: safeArray(input.targetPillars).map((pillar) => normalizeStaticPillar(pillar)),
    tasks: safeArray(input.tasks),
    passingCriteria: safeObject(input.passingCriteria),
    remediation: safeArray(input.remediation),
  };
}

export function createStaticLesson(input = {}) {
  const pillar = normalizeStaticPillar(input.pillar);
  if (pillar === 'grammar') return createGrammarLesson(input);
  if (pillar === 'vocabulary') return createVocabularyLesson(input);
  if (pillar === 'reading') return createReadingLesson(input);
  if (pillar === 'listening') return createListeningLesson(input);
  if (pillar === 'speaking') return createSpeakingLesson(input);
  if (pillar === 'writing') return createWritingLesson(input);
  if (pillar === 'checkpoint') return createCheckpointLesson(input);
  return createStaticLessonBase(input);
}