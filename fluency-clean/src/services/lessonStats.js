import { buildPracticeItems } from '../practice/PracticePlanAdapter.js';

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function countWords(value) {
  return String(value || '').trim().split(/\s+/).filter(Boolean).length;
}

function getSectionWords(sections) {
  return ensureArray(sections).reduce((total, section) => {
    if (typeof section === 'string') return total + countWords(section);
    return total + countWords(`${section?.title || ''} ${section?.content || ''} ${section?.body || ''} ${section?.explanation || ''}`);
  }, 0);
}

export function getPracticeExerciseCount(lesson) {
  try {
    return buildPracticeItems(lesson, { min: 14, max: 36 }).length;
  } catch {
    return ensureArray(lesson?.exercises).length;
  }
}

export function getLessonStats(lesson) {
  const exercises = ensureArray(lesson?.exercises);
  const vocabulary = ensureArray(lesson?.vocabulary);
  const sections = ensureArray(lesson?.sections);
  const prompts = ensureArray(lesson?.prompts);

  const rawExerciseCount = exercises.length;
  const practiceExerciseCount = getPracticeExerciseCount(lesson);
  const vocabularyCount = vocabulary.length;
  const promptCount = prompts.length;
  const sectionWords = getSectionWords(sections);
  const mainWords = countWords(`${lesson?.listeningText || ''} ${lesson?.readingText || ''} ${lesson?.transcript || ''} ${lesson?.text || ''}`);
  const introWords = countWords(lesson?.intro || lesson?.subtitle || lesson?.objective || '');
  const lessonType = String(lesson?.type || '').toLowerCase();

  const contentMinutes = Math.ceil((mainWords + sectionWords + introWords) / 130);
  const practiceMinutes = Math.ceil(practiceExerciseCount * (lessonType === 'listening' ? 0.75 : lessonType === 'grammar' ? 0.85 : 0.7));
  const supportMinutes = Math.ceil((vocabularyCount * 7 + promptCount * 10 + rawExerciseCount * 6) / 60);
  const estimatedMinutes = Math.max(8, contentMinutes + practiceMinutes + supportMinutes);

  return {
    minutes: estimatedMinutes,
    exercises: practiceExerciseCount,
    rawExercises: rawExerciseCount,
    vocabulary: vocabularyCount,
    sections: sections.length,
    prompts: promptCount,
    words: mainWords + sectionWords + introWords,
  };
}
