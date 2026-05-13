export const STATIC_LESSON_SCHEMA_VERSION = 'static-lesson-schema-v2-deep';
export const STATIC_LESSON_SCHEMA_LEGACY_VERSION = 'static-lesson-schema-v1';

export const STATIC_LEVELS = Object.freeze(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);
export const STATIC_PILLARS = Object.freeze(['grammar', 'vocabulary', 'reading', 'listening', 'speaking', 'writing', 'checkpoint']);

export const STATIC_LESSON_STATUS = Object.freeze({
  PLANNED: 'planned',
  READY: 'ready',
  DRAFT: 'draft',
  LEGACY: 'legacy',
  NEEDS_REVIEW: 'needs-review',
});

export const STATIC_LESSON_BASE_FIELDS = Object.freeze([
  'id',
  'level',
  'pillar',
  'title',
  'order',
  'estimatedMinutes',
  'prerequisites',
  'objectives',
  'masteryCriteria',
]);

export const STATIC_DEEP_GLOBAL_FIELDS = Object.freeze([
  'teacherOpening',
  'whyItMatters',
  'realLifeUseCases',
  'conceptExplanation',
  'mentalModel',
  'stepByStep',
  'portugueseContrast',
  'guidedDiscovery',
  'guidedBeforeQuiz',
  'selfAssessment',
  'lessonRecap',
  'nextLessonBridge',
]);

export const STATIC_DEEP_PILLAR_FIELDS = Object.freeze({
  grammar: [
    'grammarGoal',
    'formationGuide',
    'whenToUse',
    'whenNotToUse',
    'grammarTable',
    'teacherExamples',
    'commonBrazilianMistakes',
    'controlledPractice',
    'errorCorrectionPractice',
    'translationPractice',
    'productionTasks',
    'lessonRecap',
  ],
  vocabulary: [
    'topicContext',
    'essentialWords',
    'chunks',
    'pronunciationFocus',
    'dangerousConfusions',
    'collocations',
    'miniDialogues',
    'recognitionPractice',
    'usagePractice',
    'productionTasks',
    'spacedReview',
  ],
  reading: [
    'readingPurpose',
    'preReadingVocabulary',
    'readingStrategy',
    'mainText',
    'firstReadTask',
    'secondReadTasks',
    'evidenceQuestions',
    'contextVocabularyTasks',
    'guidedSummary',
    'connectedProduction',
  ],
  listening: [
    'listeningPreparation',
    'keyWordsToHear',
    'audioScript',
    'firstListenTasks',
    'secondListenTasks',
    'transcript',
    'shadowing',
    'dictationTasks',
    'pronunciationChunks',
    'listeningComprehension',
    'oralProduction',
  ],
  speaking: [
    'speakingSituation',
    'modelPhrases',
    'pronunciationChunks',
    'repeatAfterMe',
    'substitutionDrills',
    'questionAnswerDrills',
    'buildYourAnswer',
    'recordingTasks',
    'speakingChecklist',
    'freeSpeaking',
  ],
  writing: [
    'modelText',
    'modelTextBreakdown',
    'writingBlocks',
    'grammarForWriting',
    'usefulSentences',
    'guidedSubstitution',
    'commonWritingMistakes',
    'draftTask',
    'revisionChecklist',
    'finalVersionTask',
    'feedbackPreparation',
  ],
  checkpoint: [
    'checkpointType',
    'targetPillars',
    'tasks',
    'passingCriteria',
    'remediation',
  ],
});

export const STATIC_PILLAR_FIELDS = Object.freeze({
  grammar: [
    'explanationSections',
    'professorExamples',
    'commonMistakes',
    'guidedPractice',
    'transformationPractice',
    'productionTasks',
    'finalChecklist',
    ...STATIC_DEEP_PILLAR_FIELDS.grammar,
  ],
  vocabulary: [
    'theme',
    'lexicalSets',
    'pronunciationNotes',
    'examples',
    'recognitionPractice',
    'usagePractice',
    'productionTasks',
    ...STATIC_DEEP_PILLAR_FIELDS.vocabulary,
  ],
  reading: [
    'preReading',
    'mainText',
    'vocabulary',
    'comprehensionQuestions',
    'evidenceTasks',
    'shortResponse',
    'productionTask',
    ...STATIC_DEEP_PILLAR_FIELDS.reading,
  ],
  listening: [
    'audioScript',
    'firstListenTasks',
    'secondListenTasks',
    'transcript',
    'vocabulary',
    'shadowing',
    'comprehensionQuestions',
    ...STATIC_DEEP_PILLAR_FIELDS.listening,
  ],
  speaking: [
    'modelPhrases',
    'substitutionDrills',
    'pronunciationFocus',
    'guidedSpeaking',
    'recordingTasks',
    'freeSpeaking',
    ...STATIC_DEEP_PILLAR_FIELDS.speaking,
  ],
  writing: [
    'modelText',
    'writingBlocks',
    'guidedSubstitution',
    'grammarForWriting',
    'checklist',
    'draftTask',
    'revisionTask',
    ...STATIC_DEEP_PILLAR_FIELDS.writing,
  ],
  checkpoint: STATIC_DEEP_PILLAR_FIELDS.checkpoint,
});

export const STATIC_DEEP_MINIMUMS = Object.freeze({
  grammar: {
    teacherOpeningWords: 70,
    conceptExplanationWords: 120,
    stepByStep: 5,
    portugueseContrast: 2,
    teacherExamples: 20,
    commonBrazilianMistakes: 8,
    controlledPractice: 4,
    guidedPractice: 8,
    errorCorrectionPractice: 4,
    transformationPractice: 4,
    translationPractice: 3,
    productionTasks: 3,
    lessonRecap: 4,
  },
  vocabulary: {
    teacherOpeningWords: 60,
    essentialWords: 15,
    chunks: 10,
    miniDialogues: 2,
    examples: 10,
    recognitionPractice: 8,
    usagePractice: 8,
    productionTasks: 2,
  },
  reading: {
    preReadingVocabulary: 8,
    mainTextWords: { A1: 120, A2: 160, B1: 220, B2: 320, C1: 450, C2: 600 },
    evidenceQuestions: 8,
    contextVocabularyTasks: 2,
    secondReadTasks: 3,
    connectedProduction: 1,
  },
  listening: {
    audioScriptWords: { A1: 100, A2: 140, B1: 220, B2: 320, C1: 450, C2: 600 },
    firstListenTasks: 3,
    secondListenTasks: 5,
    shadowing: 6,
    dictationTasks: 3,
    listeningComprehension: 8,
    oralProduction: 1,
  },
  speaking: {
    modelPhrases: 10,
    repeatAfterMe: 6,
    substitutionDrills: 8,
    questionAnswerDrills: 8,
    recordingTasks: 3,
    speakingChecklist: 5,
    freeSpeaking: 1,
  },
  writing: {
    modelTextWords: { A1: 60, A2: 80, B1: 120, B2: 180, C1: 260, C2: 350 },
    modelTextBreakdown: 5,
    writingBlocks: 6,
    guidedSubstitution: 8,
    commonWritingMistakes: 6,
    revisionChecklist: 5,
    finalVersionTask: 1,
  },
});

export const STATIC_MINIMUMS = Object.freeze({
  grammar: {
    explanationSections: 6,
    professorExamples: 12,
    commonMistakes: 3,
    guidedPractice: 10,
    productionTasks: 3,
    finalChecklist: 4,
  },
  vocabulary: {
    lexicalSets: 1,
    examples: 8,
    recognitionPractice: 8,
    usagePractice: 6,
    productionTasks: 2,
  },
  reading: {
    mainTextWords: { A1: 120, A2: 160, B1: 220, B2: 320, C1: 450, C2: 600 },
    vocabulary: 8,
    comprehensionQuestions: 8,
    evidenceTasks: 4,
  },
  listening: {
    transcriptWords: { A1: 100, A2: 140, B1: 220, B2: 320, C1: 450, C2: 600 },
    firstListenTasks: 3,
    secondListenTasks: 5,
    shadowing: 6,
    comprehensionQuestions: 8,
  },
  speaking: {
    modelPhrases: 8,
    substitutionDrills: 8,
    guidedSpeaking: 5,
    recordingTasks: 2,
    freeSpeaking: 1,
  },
  writing: {
    modelTextWords: { A1: 45, A2: 70, B1: 120, B2: 180, C1: 260, C2: 350 },
    writingBlocks: 6,
    guidedSubstitution: 5,
    checklist: 4,
  },
  checkpoint: {
    tasks: 6,
    targetPillars: 1,
  },
});

export function isStaticLevel(value) {
  return STATIC_LEVELS.includes(String(value || '').toUpperCase());
}

export function isStaticPillar(value) {
  return STATIC_PILLARS.includes(String(value || '').toLowerCase());
}

export function normalizeStaticLevel(value = 'A1') {
  const level = String(value || 'A1').toUpperCase();
  return isStaticLevel(level) ? level : 'A1';
}

export function normalizeStaticPillar(value = 'reading') {
  const pillar = String(value || 'reading').toLowerCase();
  return isStaticPillar(pillar) ? pillar : 'reading';
}

export function isDeepStaticLessonSchema(value = '') {
  return String(value || '').startsWith('static-lesson-schema-v2');
}

export function isSupportedStaticLessonSchema(value = '') {
  const schema = String(value || '');
  return schema.startsWith(STATIC_LESSON_SCHEMA_LEGACY_VERSION) || schema.startsWith('static-lesson-schema-v2');
}
