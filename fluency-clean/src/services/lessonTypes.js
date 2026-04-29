export const LESSON_TYPES = {
  reading: 'reading',
  grammar: 'grammar',
  listening: 'listening',
  speaking: 'speaking',
  writing: 'writing',
  vocabulary: 'vocabulary',
  default: 'default',
};

const aliases = {
  leitura: LESSON_TYPES.reading,
  reading: LESSON_TYPES.reading,
  grammatica: LESSON_TYPES.grammar,
  gramática: LESSON_TYPES.grammar,
  grammar: LESSON_TYPES.grammar,
  listening: LESSON_TYPES.listening,
  escuta: LESSON_TYPES.listening,
  speaking: LESSON_TYPES.speaking,
  fala: LESSON_TYPES.speaking,
  writing: LESSON_TYPES.writing,
  escrita: LESSON_TYPES.writing,
  vocabulary: LESSON_TYPES.vocabulary,
  vocabulario: LESSON_TYPES.vocabulary,
  vocabulário: LESSON_TYPES.vocabulary,
};

export function normalizeLessonType(value) {
  const raw = String(value ?? '').trim().toLowerCase();
  return aliases[raw] ?? LESSON_TYPES.default;
}

export function normalizeLesson(rawLesson) {
  const lesson = rawLesson && typeof rawLesson === 'object' ? rawLesson : {};

  return {
    id: lesson.id ?? `lesson-${Date.now()}`,
    type: normalizeLessonType(lesson.type ?? lesson.category ?? lesson.kind),
    title: lesson.title ?? 'Aula de inglês',
    subtitle: lesson.subtitle ?? '',
    level: lesson.level ?? lesson.cefr ?? 'A1',
    intro: lesson.intro ?? '',
    sections: Array.isArray(lesson.sections) ? lesson.sections : [],
    vocabulary: Array.isArray(lesson.vocabulary) ? lesson.vocabulary : [],
    exercises: Array.isArray(lesson.exercises) ? lesson.exercises : [],
    tips: Array.isArray(lesson.tips) ? lesson.tips : [],
    listeningText: lesson.listeningText ?? lesson.listening_text ?? '',
    raw: lesson,
  };
}

export function isReadingLesson(lesson) {
  return normalizeLessonType(lesson?.type) === LESSON_TYPES.reading;
}
