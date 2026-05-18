// SRS tag maps for assessment, checkpoint, and mastery gate lessons.
// These lessons have no pedagogical tags in their lesson objects (A1 checkpoints use
// 'checkpoint-grammar' format not recognized as a pillar; mastery assessments have no
// tags field at all). This file gives them proper SRS entries.
//
// Tags follow schema: [level, pillar, unit-theme, specific-concept, function, difficulty-band]

export const ASSESSMENT_SRS_TAGS = {
  // === A1 Checkpoints and Final Exams (part of the 139 A1 lessons / 532 total) ===
  'A1-CHECKPOINT-FOUNDATIONS': ['a1', 'checkpoint', 'foundations-review', 'a1-foundations-gate', 'gate-prep', 'a1-assessment'],
  'A1-CHECKPOINT-PERSONAL-LIFE': ['a1', 'checkpoint', 'personal-life-review', 'a1-personal-life-gate', 'gate-prep', 'a1-assessment'],
  'A1-CHECKPOINT-GRAMMAR': ['a1', 'checkpoint', 'grammar-review', 'a1-grammar-gate', 'gate-prep', 'a1-assessment'],
  'A1-CHECKPOINT-VOCABULARY': ['a1', 'checkpoint', 'vocabulary-review', 'a1-vocabulary-gate', 'gate-prep', 'a1-assessment'],
  'A1-CHECKPOINT-READING': ['a1', 'checkpoint', 'reading-review', 'a1-reading-gate', 'gate-prep', 'a1-assessment'],
  'A1-CHECKPOINT-LISTENING': ['a1', 'checkpoint', 'listening-review', 'a1-listening-gate', 'gate-prep', 'a1-assessment'],
  'A1-CHECKPOINT-SPEAKING': ['a1', 'checkpoint', 'speaking-review', 'a1-speaking-gate', 'gate-prep', 'a1-assessment'],
  'A1-CHECKPOINT-WRITING': ['a1', 'checkpoint', 'writing-review', 'a1-writing-gate', 'gate-prep', 'a1-assessment'],
  'A1-CHECKPOINT-FINAL': ['a1', 'checkpoint', 'final-review', 'a1-final-gate', 'mastery-assessment', 'a1-assessment'],
  'A1-FINAL-EXAM': ['a1', 'checkpoint', 'final-exam', 'a1-a2-gate', 'mastery-assessment', 'a1-assessment'],
  'A1-FINAL-EXAM-REAL': ['a1', 'checkpoint', 'final-exam-complete', 'a1-prova-final', 'mastery-assessment', 'a1-assessment'],

  // === A2 Mastery Assessments (extra beyond the 122 A2 lessons) ===
  'A2-CHECKPOINT-NARRATIVE': ['a2', 'checkpoint', 'narrative-review', 'a2-mid-gate', 'gate-prep', 'a2-assessment'],
  'A2-CHECKPOINT-COMMUNICATION': ['a2', 'checkpoint', 'communication-review', 'a2-final-gate', 'gate-prep', 'a2-assessment'],
  'A2-FINAL-EXAM': ['a2', 'checkpoint', 'final-exam', 'a2-b1-gate', 'mastery-assessment', 'a2-assessment'],

  // === B1 Mastery Assessments (extra beyond the 73 B1 lessons) ===
  'B1-CHECKPOINT-MID': ['b1', 'checkpoint', 'mid-course-review', 'b1-mid-gate', 'gate-prep', 'b1-assessment'],
  'B1-CHECKPOINT-FINAL': ['b1', 'checkpoint', 'final-review', 'b1-final-gate', 'gate-prep', 'b1-assessment'],
  'B1-FINAL-EXAM': ['b1', 'checkpoint', 'final-exam', 'b1-b2-gate', 'mastery-assessment', 'b1-assessment'],

  // === B2 Mastery Assessments (extra beyond the 83 B2 lessons) ===
  'B2-CHECKPOINT-MID': ['b2', 'checkpoint', 'mid-course-review', 'b2-mid-gate', 'gate-prep', 'b2-assessment'],
  'B2-CHECKPOINT-FINAL': ['b2', 'checkpoint', 'final-review', 'b2-final-gate', 'gate-prep', 'b2-assessment'],
  'B2-FINAL-EXAM': ['b2', 'checkpoint', 'final-exam', 'b2-c1-gate', 'mastery-assessment', 'b2-assessment'],
};
