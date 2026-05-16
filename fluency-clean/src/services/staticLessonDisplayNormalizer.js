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

// Rich object fields — these must NOT be collapsed to strings because
// the flow builders (GrammarLessonFlow, etc.) read sub-fields like
// item.word, item.meaning, item.example. Only convert if purely string arrays.
function normalizeRichList(value) {
  if (!Array.isArray(value)) return value;
  const allStrings = value.every((item) => typeof item === 'string');
  if (allStrings) return value.map(clean).filter(Boolean);
  // Keep object structure intact; just ensure no raw [object Object] strings
  return value.filter((item) => item != null);
}

export function normalizeStaticLessonForDisplay(lesson) {
  if (!lesson || typeof lesson !== 'object') return lesson;
  const pillar = lesson.pillar || lesson.type;

  // Common fields across all pillars
  const commonNormalized = {
    objectives: normalizeTextList(lesson.objectives),
    lessonRecap: normalizePromptList(lesson.lessonRecap),
    mentalModel: normalizeMentalModel(lesson.mentalModel),
  };

  if (pillar === 'listening') {
    const shadowingPhrases = normalizePromptList(lesson.shadowing);
    const oralProductionPrompt = normalizeOralProductionPrompt(lesson.oralProduction);

    return {
      ...lesson,
      ...commonNormalized,
      realLifeUseCases: normalizeTextList(lesson.realLifeUseCases),
      stepByStep: normalizeTextList(lesson.stepByStep),
      portugueseContrast: normalizeTextList(lesson.portugueseContrast),
      guidedBeforeQuiz: normalizePromptList(lesson.guidedBeforeQuiz),
      guidedDiscovery: normalizePromptList(lesson.guidedDiscovery),
      listeningPreparation: normalizePromptList(lesson.listeningPreparation),
      keyWordsToHear: normalizeRichList(lesson.keyWordsToHear),
      vocabulary: normalizeRichList(lesson.vocabulary),
      firstListenTasks: normalizePromptList(lesson.firstListenTasks),
      secondListenTasks: normalizePromptList(lesson.secondListenTasks),
      shadowing: [],
      shadowingPhrases,
      oralProduction: null,
      oralProductionPrompt,
      selfAssessment: normalizePromptList(lesson.selfAssessment),
      dictationTasks: normalizeQuizList(lesson.dictationTasks),
      listeningComprehension: normalizeQuizList(lesson.listeningComprehension),
      comprehensionQuestions: normalizeQuizList(lesson.comprehensionQuestions),
    };
  }

  if (pillar === 'grammar') {
    return {
      ...lesson,
      ...commonNormalized,
      realLifeUseCases: normalizeTextList(lesson.realLifeUseCases),
      stepByStep: normalizeTextList(lesson.stepByStep),
      portugueseContrast: normalizeTextList(lesson.portugueseContrast),
      formation: normalizeTextList(lesson.formation),
      formationGuide: normalizeTextList(lesson.formationGuide),
      whenToUse: normalizeTextList(lesson.whenToUse),
      whenNotToUse: normalizeTextList(lesson.whenNotToUse),
      teacherExamples: normalizeRichList(lesson.teacherExamples),
      professorExamples: normalizeRichList(lesson.professorExamples),
      commonBrazilianMistakes: normalizeRichList(lesson.commonBrazilianMistakes),
      commonMistakes: normalizeRichList(lesson.commonMistakes),
      controlledPractice: normalizeRichList(lesson.controlledPractice),
      guidedPractice: normalizeRichList(lesson.guidedPractice),
      errorCorrectionPractice: normalizeRichList(lesson.errorCorrectionPractice),
      transformationPractice: normalizeRichList(lesson.transformationPractice),
      translationPractice: normalizeRichList(lesson.translationPractice),
      productionTasks: normalizeRichList(lesson.productionTasks),
      finalChecklist: normalizeTextList(lesson.finalChecklist),
    };
  }

  if (pillar === 'vocabulary') {
    return {
      ...lesson,
      ...commonNormalized,
      essentialWords: normalizeRichList(lesson.essentialWords),
      lexicalSets: normalizeRichList(lesson.lexicalSets),
      chunks: normalizeRichList(lesson.chunks),
      collocations: normalizeRichList(lesson.collocations),
      phrases: normalizeRichList(lesson.phrases),
      pronunciationFocus: normalizeTextList(lesson.pronunciationFocus),
      pronunciationNotes: normalizeTextList(lesson.pronunciationNotes),
      dangerousConfusions: normalizeTextList(lesson.dangerousConfusions),
      examples: normalizeRichList(lesson.examples),
      vocabulary: normalizeRichList(lesson.vocabulary),
      recognitionPractice: normalizeRichList(lesson.recognitionPractice),
      usagePractice: normalizeRichList(lesson.usagePractice),
      productionTasks: normalizeRichList(lesson.productionTasks),
      spacedReview: normalizeTextList(lesson.spacedReview),
    };
  }

  if (pillar === 'reading') {
    return {
      ...lesson,
      ...commonNormalized,
      preReadingVocabulary: normalizeRichList(lesson.preReadingVocabulary),
      vocabulary: normalizeRichList(lesson.vocabulary),
      keyVocabulary: normalizeRichList(lesson.keyVocabulary),
      preReading: normalizeRichList(lesson.preReading),
      firstReadTask: normalizeRichList(lesson.firstReadTask),
      secondReadTasks: normalizeRichList(lesson.secondReadTasks),
      evidenceQuestions: normalizeRichList(lesson.evidenceQuestions),
      evidenceTasks: normalizeRichList(lesson.evidenceTasks),
      comprehensionQuestions: normalizeRichList(lesson.comprehensionQuestions),
      contextVocabularyTasks: normalizeRichList(lesson.contextVocabularyTasks),
      productionTasks: normalizeRichList(lesson.productionTasks),
    };
  }

  if (pillar === 'speaking') {
    return {
      ...lesson,
      ...commonNormalized,
      modelPhrases: normalizeRichList(lesson.modelPhrases),
      modelSentences: normalizeRichList(lesson.modelSentences),
      pronunciationChunks: normalizeRichList(lesson.pronunciationChunks),
      pronunciationFocus: normalizeRichList(lesson.pronunciationFocus),
      repeatAfterMe: normalizeRichList(lesson.repeatAfterMe),
      substitutionDrills: normalizeRichList(lesson.substitutionDrills),
      questionAnswerDrills: normalizeRichList(lesson.questionAnswerDrills),
      guidedSpeaking: normalizeRichList(lesson.guidedSpeaking),
      buildYourAnswer: normalizeRichList(lesson.buildYourAnswer),
      recordingTasks: normalizeRichList(lesson.recordingTasks),
      freeSpeaking: normalizeRichList(lesson.freeSpeaking),
      speakingChecklist: normalizeTextList(lesson.speakingChecklist),
      criteria: normalizeTextList(lesson.criteria),
    };
  }

  if (pillar === 'writing') {
    return {
      ...lesson,
      ...commonNormalized,
      modelTextBreakdown: normalizeTextList(lesson.modelTextBreakdown),
      writingBlocks: normalizeTextList(lesson.writingBlocks),
      buildingBlocks: normalizeTextList(lesson.buildingBlocks),
      connectors: normalizeTextList(lesson.connectors),
      usefulPhrases: normalizeTextList(lesson.usefulPhrases),
      writingScaffold: normalizeTextList(lesson.writingScaffold),
      usefulSentences: normalizeTextList(lesson.usefulSentences),
      grammarForWriting: normalizeTextList(lesson.grammarForWriting),
      guidedSubstitution: normalizeRichList(lesson.guidedSubstitution),
      commonWritingMistakes: normalizeRichList(lesson.commonWritingMistakes),
      revisionChecklist: normalizeTextList(lesson.revisionChecklist),
      writingChecklist: normalizeTextList(lesson.writingChecklist),
      checklist: normalizeTextList(lesson.checklist),
      criteria: normalizeTextList(lesson.criteria),
      evaluationCriteria: normalizeTextList(lesson.evaluationCriteria),
      feedbackPreparation: normalizeTextList(lesson.feedbackPreparation),
    };
  }

  // Unknown/other pillar — apply minimal common normalization
  return { ...lesson, ...commonNormalized };
}
