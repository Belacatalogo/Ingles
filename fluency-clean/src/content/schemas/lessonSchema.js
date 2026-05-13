export const STATIC_LESSON_SCHEMA_VERSION = 'static-lesson-schema-v1';

export const STATIC_LEVELS = Object.freeze(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);
export const STATIC_PILLARS = Object.freeze(['grammar', 'vocabulary', 'reading', 'listening', 'speaking', 'writing', 'checkpoint']);

export const STATIC_LESSON_STATUS = Object.freeze({
  PLANNED: 'planned',
  READY: 'ready',
  DRAFT: 'draft',
  LEGACY: 'legacy',
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

export const STATIC_PILLAR_FIELDS = Object.freeze({
  grammar: [
    'explanationSections',
    'professorExamples',
    'commonMistakes',
    'guidedPractice',
    'transformationPractice',
    'productionTasks',
    'finalChecklist',
  ],
  vocabulary: [
    'theme',
    'lexicalSets',
    'pronunciationNotes',
    'examples',
    'recognitionPractice',
    'usagePractice',
    'productionTasks',
  ],
  reading: [
    'preReading',
    'mainText',
    'vocabulary',
    'comprehensionQuestions',
    'evidenceTasks',
    'shortResponse',
    'productionTask',
  ],
  listening: [
    'audioScript',
    'firstListenTasks',
    'secondListenTasks',
    'transcript',
    'vocabulary',
    'shadowing',
    'comprehensionQuestions',
  ],
  speaking: [
    'modelPhrases',
    'substitutionDrills',
    'pronunciationFocus',
    'guidedSpeaking',
    'recordingTasks',
    'freeSpeaking',
  ],
  writing: [
    'modelText',
    'writingBlocks',
    'guidedSubstitution',
    'grammarForWriting',
    'checklist',
    'draftTask',
    'revisionTask',
  ],
  checkpoint: [
    'checkpointType',
    'targetPillars',
    'tasks',
    'passingCriteria',
    'remediation',
  ],
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
