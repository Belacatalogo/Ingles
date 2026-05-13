import { normalizeStaticLevel, normalizeStaticPillar, STATIC_LESSON_SCHEMA_VERSION, STATIC_LESSON_STATUS } from './lessonSchema.js';

function clean(value) { return String(value ?? '').trim(); }
function safeArray(value) { return Array.isArray(value) ? value : []; }
function safeObject(value) { return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; }

function makeId({ level, pillar, order, id }) {
  if (id) return clean(id);
  return `${level}-${pillar.toUpperCase()}-${String(order || 1).padStart(3, '0')}`;
}

export function createStaticLessonBase(input = {}) {
  const level = normalizeStaticLevel(input.level);
  const pillar = normalizeStaticPillar(input.pillar);
  const order = Number(input.order || 1);
  return {
    schemaVersion: STATIC_LESSON_SCHEMA_VERSION,
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
  };
}

export function createGrammarLesson(input = {}) {
  return {
    ...createStaticLessonBase({ ...input, pillar: 'grammar' }),
    explanationSections: safeArray(input.explanationSections),
    professorExamples: safeArray(input.professorExamples),
    commonMistakes: safeArray(input.commonMistakes),
    guidedPractice: safeArray(input.guidedPractice),
    transformationPractice: safeArray(input.transformationPractice),
    productionTasks: safeArray(input.productionTasks),
    finalChecklist: safeArray(input.finalChecklist),
  };
}

export function createVocabularyLesson(input = {}) {
  return {
    ...createStaticLessonBase({ ...input, pillar: 'vocabulary' }),
    theme: clean(input.theme || input.title),
    lexicalSets: safeArray(input.lexicalSets),
    pronunciationNotes: safeArray(input.pronunciationNotes),
    examples: safeArray(input.examples),
    recognitionPractice: safeArray(input.recognitionPractice),
    usagePractice: safeArray(input.usagePractice),
    productionTasks: safeArray(input.productionTasks),
  };
}

export function createReadingLesson(input = {}) {
  return {
    ...createStaticLessonBase({ ...input, pillar: 'reading' }),
    preReading: safeArray(input.preReading),
    mainText: clean(input.mainText),
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
    audioScript: clean(input.audioScript || transcript),
    firstListenTasks: safeArray(input.firstListenTasks),
    secondListenTasks: safeArray(input.secondListenTasks),
    transcript,
    vocabulary: safeArray(input.vocabulary),
    shadowing: safeArray(input.shadowing),
    comprehensionQuestions: safeArray(input.comprehensionQuestions),
  };
}

export function createSpeakingLesson(input = {}) {
  return {
    ...createStaticLessonBase({ ...input, pillar: 'speaking' }),
    modelPhrases: safeArray(input.modelPhrases),
    substitutionDrills: safeArray(input.substitutionDrills),
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
    writingBlocks: safeArray(input.writingBlocks),
    guidedSubstitution: safeArray(input.guidedSubstitution),
    grammarForWriting: safeArray(input.grammarForWriting),
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
