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
  read: LESSON_TYPES.reading,
  grammatica: LESSON_TYPES.grammar,
  gramática: LESSON_TYPES.grammar,
  grammar: LESSON_TYPES.grammar,
  gramatica: LESSON_TYPES.grammar,
  listening: LESSON_TYPES.listening,
  escuta: LESSON_TYPES.listening,
  audicao: LESSON_TYPES.listening,
  audição: LESSON_TYPES.listening,
  speaking: LESSON_TYPES.speaking,
  fala: LESSON_TYPES.speaking,
  conversacao: LESSON_TYPES.speaking,
  conversação: LESSON_TYPES.speaking,
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

export function inferLessonTypeFromText(value) {
  const text = String(value ?? '').toLowerCase();
  if (/\b(grammar|gramática|gramatica|regra|simple present|present perfect|past simple|verbo|verbos)\b/.test(text)) return LESSON_TYPES.grammar;
  if (/\b(listening|escuta|áudio|audio|ouvir|transcrição|transcricao|shadowing)\b/.test(text)) return LESSON_TYPES.listening;
  if (/\b(writing|escrita|escrever|redação|redacao|write|diário|diario)\b/.test(text)) return LESSON_TYPES.writing;
  if (/\b(speaking|fala|conversa|pronúncia|pronuncia|conversation)\b/.test(text)) return LESSON_TYPES.speaking;
  if (/\b(vocabulary|vocabulário|vocabulario|palavras|flashcards)\b/.test(text)) return LESSON_TYPES.vocabulary;
  return LESSON_TYPES.reading;
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeSections(lesson) {
  const sections = ensureArray(lesson.sections).length ? lesson.sections : ensureArray(lesson.steps);
  return sections.map((section, index) => {
    if (typeof section === 'string') {
      return { title: `Parte ${index + 1}`, content: section };
    }

    return {
      title: section?.title ?? section?.heading ?? section?.label ?? `Parte ${index + 1}`,
      content: section?.content ?? section?.text ?? section?.body ?? section?.explanation ?? '',
      examples: ensureArray(section?.examples),
    };
  });
}

function normalizeExercises(lesson) {
  const source = ensureArray(lesson.exercises).length ? lesson.exercises : ensureArray(lesson.questions);
  return source.map((item, index) => ({
    question: item?.question ?? item?.prompt ?? `Questão ${index + 1}`,
    options: ensureArray(item?.options).length ? item.options : ensureArray(item?.choices),
    answer: item?.answer ?? item?.correctAnswer ?? item?.correct ?? '',
    explanation: item?.explanation ?? item?.feedback ?? '',
  }));
}

function normalizeVocabulary(lesson) {
  return ensureArray(lesson.vocabulary).map((item) => ({
    word: item?.word ?? item?.term ?? '',
    meaning: item?.meaning ?? item?.translation ?? item?.definition ?? '',
    example: item?.example ?? item?.sentence ?? '',
  })).filter((item) => item.word || item.meaning || item.example);
}

function normalizePrompts(lesson) {
  return ensureArray(lesson.prompts).length
    ? ensureArray(lesson.prompts)
    : ensureArray(lesson.writingPrompts);
}

export function normalizeLesson(rawLesson) {
  const lesson = rawLesson && typeof rawLesson === 'object' ? rawLesson : {};
  const inferredType = normalizeLessonType(lesson.type ?? lesson.category ?? lesson.kind);
  const type = inferredType === LESSON_TYPES.default ? inferLessonTypeFromText(`${lesson.title || ''} ${lesson.intro || ''}`) : inferredType;

  return {
    id: lesson.id ?? `lesson-${Date.now()}`,
    type,
    title: lesson.title ?? 'Aula de inglês',
    subtitle: lesson.subtitle ?? '',
    level: lesson.level ?? lesson.cefr ?? 'A1',
    intro: lesson.intro ?? '',
    objective: lesson.objective ?? lesson.goal ?? '',
    focus: lesson.focus ?? lesson.topic ?? '',
    sections: normalizeSections(lesson),
    vocabulary: normalizeVocabulary(lesson),
    exercises: normalizeExercises(lesson),
    tips: ensureArray(lesson.tips),
    prompts: normalizePrompts(lesson),
    listeningText: lesson.listeningText ?? lesson.listening_text ?? lesson.transcript ?? '',
    raw: lesson,
  };
}

export function isReadingLesson(lesson) {
  return normalizeLessonType(lesson?.type) === LESSON_TYPES.reading;
}
