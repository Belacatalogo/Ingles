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

export function createVocabularyLesson(input = {}) {
  const examples = safeArray(input.examples);
  return {
    ...createStaticLessonBase({ ...input, pillar: 'vocabulary' }),
    topicContext: clean(input.topicContext),
    essentialWords: safeArray(input.essentialWords),
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
    recognitionPractice: safeArray(input.recognitionPractice),
    usagePractice: safeArray(input.usagePractice),
    productionTasks: safeArray(input.productionTasks),
  };
}

export function createReadingLesson(input = {}) {
  const mainText = clean(input.mainText);
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
  };
}

export function createListeningLesson(input = {}) {
  const transcript = clean(input.transcript || input.audioScript);
  return {
    ...createStaticLessonBase({ ...input, pillar: 'listening' }),
    listeningPreparation: safeArray(input.listeningPreparation),
    keyWordsToHear: safeArray(input.keyWordsToHear),
    audioScript: clean(input.audioScript || transcript),
    firstListenTasks: safeArray(input.firstListenTasks),
    secondListenTasks: safeArray(input.secondListenTasks),
    transcript,
    vocabulary: safeArray(input.vocabulary),
    shadowing: safeArray(input.shadowing),
    dictationTasks: safeArray(input.dictationTasks),
    pronunciationChunks: safeArray(input.pronunciationChunks),
    listeningComprehension: safeArray(input.listeningComprehension?.length ? input.listeningComprehension : input.comprehensionQuestions),
    oralProduction: taskOrNull(input.oralProduction),
    comprehensionQuestions: safeArray(input.comprehensionQuestions),
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
    freeSpeaking: safeArray(input.freeSpeaking),
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