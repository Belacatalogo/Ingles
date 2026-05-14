function clean(value) {
  return String(value ?? '').trim();
}

function firstText(...values) {
  return values.map(clean).find(Boolean) || '';
}

function itemMainText(item) {
  if (item == null) return '';
  if (typeof item !== 'object') return clean(item);
  return firstText(
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
}

function itemSupportText(item) {
  if (!item || typeof item !== 'object') return '';
  return firstText(
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
}

function itemText(item) {
  if (item == null) return '';
  if (typeof item !== 'object') return clean(item);
  const main = itemMainText(item);
  const support = itemSupportText(item);
  if (main && support && main !== support) return `${main} — ${support}`;
  return main || support || '';
}

function itemPromptText(item) {
  return itemMainText(item) || clean(item);
}

function normalizeTextList(value) {
  if (!Array.isArray(value)) return value;
  return value.map(itemText).filter(Boolean);
}

function normalizePromptList(value) {
  if (!Array.isArray(value)) return value;
  return value.map(itemPromptText).filter(Boolean);
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

function normalizeOralProductionPrompt(value) {
  if (Array.isArray(value)) return normalizePromptList(value).join('\n');
  return itemPromptText(value);
}

export function normalizeStaticLessonForDisplay(lesson) {
  if (!lesson || typeof lesson !== 'object') return lesson;
  const pillar = lesson.pillar || lesson.type;
  if (pillar !== 'listening') return lesson;

  const shadowingPhrases = normalizePromptList(lesson.shadowing);
  const oralProductionPrompt = normalizeOralProductionPrompt(lesson.oralProduction);

  return {
    ...lesson,
    objectives: normalizeTextList(lesson.objectives),
    realLifeUseCases: normalizeTextList(lesson.realLifeUseCases),
    stepByStep: normalizeTextList(lesson.stepByStep),
    portugueseContrast: normalizeTextList(lesson.portugueseContrast),
    guidedBeforeQuiz: normalizePromptList(lesson.guidedBeforeQuiz),
    guidedDiscovery: normalizePromptList(lesson.guidedDiscovery),
    listeningPreparation: normalizePromptList(lesson.listeningPreparation),
    keyWordsToHear: normalizeTextList(lesson.keyWordsToHear),
    vocabulary: normalizeTextList(lesson.vocabulary),
    firstListenTasks: normalizePromptList(lesson.firstListenTasks),
    secondListenTasks: normalizePromptList(lesson.secondListenTasks),
    shadowing: [],
    shadowingPhrases,
    oralProduction: null,
    oralProductionPrompt,
    lessonRecap: normalizePromptList(lesson.lessonRecap),
    selfAssessment: normalizePromptList(lesson.selfAssessment),
    mentalModel: normalizeMentalModel(lesson.mentalModel),
    dictationTasks: normalizeQuizList(lesson.dictationTasks),
    listeningComprehension: normalizeQuizList(lesson.listeningComprehension),
    comprehensionQuestions: normalizeQuizList(lesson.comprehensionQuestions),
  };
}
