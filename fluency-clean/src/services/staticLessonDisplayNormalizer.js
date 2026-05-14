function clean(value) {
  return String(value ?? '').trim();
}

function firstText(...values) {
  return values.map(clean).find(Boolean) || '';
}

function itemText(item) {
  if (item == null) return '';
  if (typeof item !== 'object') return clean(item);
  const main = firstText(
    item.text,
    item.content,
    item.instruction,
    item.question,
    item.prompt,
    item.title,
    item.label,
    item.word,
    item.term,
    item.chunk,
    item.phrase,
    item.english,
    item.sentence,
    item.line,
    item.value,
  );
  const support = firstText(
    item.meaning,
    item.translation,
    item.soundHint,
    item.pronunciation,
    item.note,
    item.tip,
    item.why,
    item.explanation,
    item.reason,
  );
  if (main && support && main !== support) return `${main} — ${support}`;
  return main || support || '';
}

function normalizeTextList(value) {
  if (!Array.isArray(value)) return value;
  return value.map(itemText).filter(Boolean);
}

function normalizeQuizList(value) {
  if (!Array.isArray(value)) return value;
  return value.map((item) => {
    if (!item || typeof item !== 'object') return item;
    return {
      ...item,
      options: Array.isArray(item.options) ? item.options.map(itemText).filter(Boolean) : item.options,
      answer: itemText(item.answer) || item.answer,
      expected: itemText(item.expected) || item.expected,
      expectedAnswer: itemText(item.expectedAnswer) || item.expectedAnswer,
      correctAnswer: itemText(item.correctAnswer) || item.correctAnswer,
    };
  });
}

function normalizeMentalModel(model) {
  if (!model || typeof model !== 'object') return model;
  return {
    ...model,
    steps: normalizeTextList(model.steps),
    flow: normalizeTextList(model.flow),
    items: normalizeTextList(model.items),
  };
}

export function normalizeStaticLessonForDisplay(lesson) {
  if (!lesson || typeof lesson !== 'object') return lesson;
  const pillar = lesson.pillar || lesson.type;
  if (pillar !== 'listening') return lesson;

  return {
    ...lesson,
    objectives: normalizeTextList(lesson.objectives),
    realLifeUseCases: normalizeTextList(lesson.realLifeUseCases),
    stepByStep: normalizeTextList(lesson.stepByStep),
    portugueseContrast: normalizeTextList(lesson.portugueseContrast),
    guidedBeforeQuiz: normalizeTextList(lesson.guidedBeforeQuiz),
    guidedDiscovery: normalizeTextList(lesson.guidedDiscovery),
    listeningPreparation: normalizeTextList(lesson.listeningPreparation),
    keyWordsToHear: normalizeTextList(lesson.keyWordsToHear),
    vocabulary: normalizeTextList(lesson.vocabulary),
    firstListenTasks: normalizeTextList(lesson.firstListenTasks),
    secondListenTasks: normalizeTextList(lesson.secondListenTasks),
    shadowing: normalizeTextList(lesson.shadowing),
    lessonRecap: normalizeTextList(lesson.lessonRecap),
    selfAssessment: normalizeTextList(lesson.selfAssessment),
    mentalModel: normalizeMentalModel(lesson.mentalModel),
    dictationTasks: normalizeQuizList(lesson.dictationTasks),
    listeningComprehension: normalizeQuizList(lesson.listeningComprehension),
    comprehensionQuestions: normalizeQuizList(lesson.comprehensionQuestions),
  };
}
