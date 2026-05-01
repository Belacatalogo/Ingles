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

function cleanText(value) {
  return String(value ?? '').trim();
}

function optionText(option) {
  if (typeof option === 'string' || typeof option === 'number') return cleanText(option);
  if (!option || typeof option !== 'object') return '';
  return cleanText(option.text ?? option.label ?? option.option ?? option.value ?? option.answer ?? option.content ?? option.title ?? '');
}

function isMarkedCorrectOption(option) {
  if (!option || typeof option !== 'object') return false;
  return Boolean(option.correct === true || option.isCorrect === true || option.correctAnswer === true || option.is_answer === true || option.isAnswer === true);
}

function firstNonEmpty(...values) {
  for (const value of values) {
    const clean = cleanText(value);
    if (clean) return clean;
  }
  return '';
}

function arrayFromMaybeDelimited(value) {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return [];
  const parts = value.split(/\n|;|\|/).map((item) => item.trim()).filter(Boolean);
  return parts.length > 1 ? parts : [];
}

function getExerciseOptions(item, originalItem = item) {
  const rawOptions =
    arrayFromMaybeDelimited(item?.options).length ? arrayFromMaybeDelimited(item.options) :
    ensureArray(item?.options).length ? item.options :
    arrayFromMaybeDelimited(item?.choices).length ? arrayFromMaybeDelimited(item.choices) :
    ensureArray(item?.choices).length ? item.choices :
    arrayFromMaybeDelimited(item?.alternatives).length ? arrayFromMaybeDelimited(item.alternatives) :
    ensureArray(item?.alternatives).length ? item.alternatives :
    ensureArray(item?.answers).length ? item.answers :
    ensureArray(item?.multipleChoiceOptions).length ? item.multipleChoiceOptions :
    ensureArray(item?.possibleAnswers).length ? item.possibleAnswers :
    ensureArray(originalItem?.options).length ? originalItem.options :
    ensureArray(originalItem?.choices).length ? originalItem.choices :
    ensureArray(originalItem?.alternatives).length ? originalItem.alternatives :
    ensureArray(originalItem?.answers).length ? originalItem.answers :
    ensureArray(originalItem?.multipleChoiceOptions).length ? originalItem.multipleChoiceOptions :
    ensureArray(originalItem?.possibleAnswers);

  return rawOptions.map(optionText).filter(Boolean);
}

function answerFromAnswerKey(answerKey, question, index) {
  if (!answerKey) return '';

  if (Array.isArray(answerKey)) {
    const match = answerKey[index];
    if (typeof match === 'string' || typeof match === 'number') return cleanText(match);
    if (match && typeof match === 'object') return firstNonEmpty(match.answer, match.expectedAnswer, match.correctAnswer, match.value, match.text);
  }

  if (typeof answerKey === 'object') {
    const cleanQuestion = cleanText(question);
    const possibleKeys = [index, String(index), index + 1, String(index + 1), cleanQuestion, cleanQuestion.toLowerCase()];
    for (const key of possibleKeys) {
      const match = answerKey[key];
      if (typeof match === 'string' || typeof match === 'number') return cleanText(match);
      if (match && typeof match === 'object') {
        const answer = firstNonEmpty(match.answer, match.expectedAnswer, match.correctAnswer, match.value, match.text);
        if (answer) return answer;
      }
    }
  }

  return '';
}

function mapLetterOrNumberToOption(answer, options) {
  const clean = cleanText(answer);
  if (!clean || !options.length) return answer;
  if (/^[A-Da-d]$/.test(clean)) {
    const index = clean.toUpperCase().charCodeAt(0) - 65;
    return options[index] || answer;
  }
  if (/^\d+$/.test(clean)) {
    const index = Number(clean) - 1;
    return options[index] || answer;
  }
  return answer;
}

function getCorrectAnswer(item, lesson, index, options, originalItem = item) {
  const allRawOptions = [
    ...ensureArray(item?.options),
    ...ensureArray(item?.choices),
    ...ensureArray(item?.alternatives),
    ...ensureArray(item?.answers),
    ...ensureArray(item?.multipleChoiceOptions),
    ...ensureArray(item?.possibleAnswers),
    ...ensureArray(originalItem?.options),
    ...ensureArray(originalItem?.choices),
    ...ensureArray(originalItem?.alternatives),
    ...ensureArray(originalItem?.answers),
    ...ensureArray(originalItem?.multipleChoiceOptions),
    ...ensureArray(originalItem?.possibleAnswers),
  ];

  const markedCorrectOption = allRawOptions.find(isMarkedCorrectOption);
  const directAnswer = firstNonEmpty(
    item?.answer,
    item?.expectedAnswer,
    item?.correctAnswer,
    item?.correct,
    item?.solution,
    item?.rightAnswer,
    item?.answerText,
    originalItem?.answer,
    originalItem?.expectedAnswer,
    originalItem?.correctAnswer,
    originalItem?.correct,
    originalItem?.solution,
    originalItem?.rightAnswer,
    originalItem?.answerText
  );

  const answer = firstNonEmpty(
    optionText(markedCorrectOption),
    directAnswer,
    answerFromAnswerKey(lesson?.answerKey || lesson?.answer_key || lesson?.raw?.answerKey || lesson?.raw?.answer_key, item?.question || item?.prompt, index)
  );

  return mapLetterOrNumberToOption(answer, options);
}

function normalizeSections(lesson) {
  const sections = ensureArray(lesson.sections).length ? lesson.sections : ensureArray(lesson.steps);
  return sections.map((section, index) => {
    if (typeof section === 'string') return { title: `Parte ${index + 1}`, content: section };
    return {
      title: section?.title ?? section?.heading ?? section?.label ?? `Parte ${index + 1}`,
      content: section?.content ?? section?.text ?? section?.body ?? section?.explanation ?? '',
      examples: ensureArray(section?.examples),
    };
  });
}

function normalizeExercises(lesson) {
  const source = ensureArray(lesson.exercises).length ? lesson.exercises : ensureArray(lesson.questions);
  const originalSource = ensureArray(lesson?.raw?.exercises).length ? lesson.raw.exercises : ensureArray(lesson?.raw?.questions);
  return source.map((item, index) => {
    const originalItem = originalSource[index] || item;
    const question = item?.question ?? item?.prompt ?? item?.instruction ?? originalItem?.question ?? originalItem?.prompt ?? `Questão ${index + 1}`;
    const options = getExerciseOptions(item, originalItem);
    const answer = getCorrectAnswer(item, lesson, index, options, originalItem);
    return {
      question,
      options,
      answer,
      explanation: item?.explanation ?? item?.feedback ?? originalItem?.explanation ?? originalItem?.feedback ?? '',
    };
  });
}

function normalizeVocabulary(lesson) {
  return ensureArray(lesson.vocabulary).map((item) => ({
    word: item?.word ?? item?.term ?? '',
    meaning: item?.meaning ?? item?.translation ?? item?.definition ?? '',
    example: item?.example ?? item?.sentence ?? '',
  })).filter((item) => item.word || item.meaning || item.example);
}

function normalizePrompts(lesson) {
  return ensureArray(lesson.prompts).length ? ensureArray(lesson.prompts) : ensureArray(lesson.writingPrompts);
}

function normalizeObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : null;
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
    answerKey: lesson.answerKey ?? lesson.answer_key ?? lesson.raw?.answerKey ?? lesson.raw?.answer_key ?? null,
    pedagogicalReview: normalizeObject(lesson.pedagogicalReview),
    quality: normalizeObject(lesson.quality),
    generationMeta: normalizeObject(lesson.generationMeta),
    raw: lesson.raw && typeof lesson.raw === 'object' ? lesson.raw : lesson,
  };
}

export function isReadingLesson(lesson) {
  return normalizeLessonType(lesson?.type) === LESSON_TYPES.reading;
}
