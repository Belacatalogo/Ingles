function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function countWords(value) {
  return String(value || '').trim().split(/\s+/).filter(Boolean).length;
}

export function getLessonStats(lesson) {
  const exercises = ensureArray(lesson?.exercises);
  const vocabulary = ensureArray(lesson?.vocabulary);
  const sections = ensureArray(lesson?.sections);
  const prompts = ensureArray(lesson?.prompts);

  const exerciseCount = exercises.length;
  const vocabularyCount = vocabulary.length;
  const promptCount = prompts.length;
  const sectionWords = sections.reduce((total, section) => {
    if (typeof section === 'string') return total + countWords(section);
    return total + countWords(`${section?.title || ''} ${section?.content || ''} ${section?.body || ''}`);
  }, 0);
  const mainWords = countWords(lesson?.listeningText || lesson?.transcript || lesson?.text || '');
  const introWords = countWords(lesson?.intro || lesson?.subtitle || '');

  const estimatedMinutes = Math.max(
    8,
    Math.ceil((mainWords + sectionWords + introWords + vocabularyCount * 16 + exerciseCount * 30 + promptCount * 22) / 95)
  );

  return {
    minutes: estimatedMinutes,
    exercises: exerciseCount,
    vocabulary: vocabularyCount,
    sections: sections.length,
    prompts: promptCount,
  };
}
