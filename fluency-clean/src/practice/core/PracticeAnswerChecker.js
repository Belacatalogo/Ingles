import { PRACTICE_RESULT_STATUS, QUESTION_TYPES } from './PracticeTypes.js';
import { cleanPracticeText, normalizePracticeText } from './PracticeNormalizer.js';
import {
  TAG_DOMAIN,
  readableListeningSkill,
  readableReadingSkill,
  readableWritingSkill,
  updateMasteryTag,
} from './PracticeMasteryTags.js';
import { recordPracticeSrsResult, SRS_ITEM_TYPES } from '../../services/practiceSrsExtended.js';

function levenshtein(a, b) {
  const left = normalizePracticeText(a);
  const right = normalizePracticeText(b);
  const matrix = Array.from({ length: left.length + 1 }, () => Array(right.length + 1).fill(0));
  for (let i = 0; i <= left.length; i += 1) matrix[i][0] = i;
  for (let j = 0; j <= right.length; j += 1) matrix[0][j] = j;
  for (let i = 1; i <= left.length; i += 1) {
    for (let j = 1; j <= right.length; j += 1) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
    }
  }
  return matrix[left.length][right.length];
}

function findHintWord(expected, user) {
  const expectedWords = normalizePracticeText(expected).split(' ').filter(Boolean);
  const userWords = normalizePracticeText(user).split(' ').filter(Boolean);
  return expectedWords.find((word, index) => word.length > 2 && word !== userWords[index] && !userWords.includes(word)) || expectedWords.find((word) => word.length > 3) || '';
}

function recordTaggedSrsResults(question, result) {
  if (!question || result?.status === PRACTICE_RESULT_STATUS.EMPTY) return;
  const correct = result?.status === PRACTICE_RESULT_STATUS.CORRECT;
  const meta = {
    lessonId: question.lessonId || '',
    questionId: question.id || '',
    source: question.source || '',
  };

  if (question.grammarTag) {
    recordPracticeSrsResult({
      type: SRS_ITEM_TYPES.GRAMMAR_PATTERN,
      content: question.grammarTag,
      label: question.grammarTagLabel || question.grammarTag,
      correct,
      skill: question.skill,
      level: question.level,
      meta,
    });
  }

  if (question.errorTag) {
    recordPracticeSrsResult({
      type: SRS_ITEM_TYPES.ERROR_PATTERN,
      content: question.errorTag,
      label: question.errorTagLabel || question.errorTag,
      correct,
      skill: question.skill,
      level: question.level,
      meta,
    });
  }

  if (question.pronunciationWord && typeof question.azureScore === 'number') {
    recordPracticeSrsResult({
      type: SRS_ITEM_TYPES.PRONUNCIATION_WORD,
      content: question.pronunciationWord,
      label: question.pronunciationWord,
      correct: Number(question.azureScore) >= 80,
      skill: question.skill,
      level: question.level,
      meta: { ...meta, azureScore: Number(question.azureScore) },
    });
  }

  if (question.evidenceTrackId) {
    recordPracticeSrsResult({
      type: SRS_ITEM_TYPES.EVIDENCE_TRACK,
      content: question.evidenceTrackId,
      label: question.evidenceTrackLabel || question.evidenceTrackId,
      correct,
      skill: question.skill,
      level: question.level,
      meta,
    });
  }

  if (question.listeningPatternId) {
    recordPracticeSrsResult({
      type: SRS_ITEM_TYPES.LISTENING_PATTERN,
      content: question.listeningPatternId,
      label: question.listeningPatternLabel || question.listeningPatternId,
      correct,
      skill: question.skill,
      level: question.level,
      meta,
    });
  }
}

function recordMasteryTagResults(question, result) {
  if (!question || result?.status === PRACTICE_RESULT_STATUS.EMPTY) return [];
  const correct = result?.status === PRACTICE_RESULT_STATUS.CORRECT;
  const touched = [];

  if (question.grammarTag) {
    const tag = updateMasteryTag({
      tag: question.grammarTag,
      domain: TAG_DOMAIN.GRAMMAR,
      label: question.grammarTagLabel || question.grammarTag,
      correct,
    });
    if (tag) touched.push(tag);
  }

  if (question.vocabTag) {
    const tag = updateMasteryTag({
      tag: question.vocabTag,
      domain: TAG_DOMAIN.VOCABULARY,
      label: question.vocabTagLabel || question.vocabTag,
      correct,
    });
    if (tag) touched.push(tag);
  }

  if (question.pronunciationWord && typeof question.azureScore === 'number') {
    const tag = updateMasteryTag({
      tag: `pron::${question.pronunciationWord}`,
      domain: TAG_DOMAIN.PRONUNCIATION,
      label: question.pronunciationWord,
      correct: Number(question.azureScore) >= 80,
    });
    if (tag) touched.push(tag);
  }

  if (question.readingSkillTag) {
    const tag = updateMasteryTag({
      tag: question.readingSkillTag,
      domain: TAG_DOMAIN.READING_SKILL,
      label: question.readingSkillLabel || readableReadingSkill(question.readingSkillTag),
      correct,
    });
    if (tag) touched.push(tag);
  }

  if (question.listeningSkillTag) {
    const tag = updateMasteryTag({
      tag: question.listeningSkillTag,
      domain: TAG_DOMAIN.LISTENING_SKILL,
      label: question.listeningSkillLabel || readableListeningSkill(question.listeningSkillTag),
      correct,
    });
    if (tag) touched.push(tag);
  }

  if (question.writingSkillTag) {
    const tag = updateMasteryTag({
      tag: question.writingSkillTag,
      domain: TAG_DOMAIN.WRITING_SKILL,
      label: question.writingSkillLabel || readableWritingSkill(question.writingSkillTag),
      correct,
    });
    if (tag) touched.push(tag);
  }

  return touched;
}

function finalizePracticeResult(question, result) {
  recordTaggedSrsResults(question, result);
  const touchedMasteryTags = recordMasteryTagResults(question, result);
  return { ...result, touchedMasteryTags };
}

function checkSummaryCloze(question, rawAnswer) {
  const userValues = rawAnswer && typeof rawAnswer === 'object' && !Array.isArray(rawAnswer) ? rawAnswer : {};
  const blanks = Array.isArray(question?.blanks) ? question.blanks : [];
  const total = blanks.length;

  if (!total || blanks.some((blank) => !cleanPracticeText(userValues[blank.id]))) {
    return finalizePracticeResult(question, {
      status: PRACTICE_RESULT_STATUS.EMPTY,
      correct: false,
      retryable: false,
      loseLife: false,
      message: 'Complete todas as lacunas antes de continuar.',
      expected: question?.answer || '',
      hintWord: '',
      perBlank: [],
      correctCount: 0,
      totalCount: total,
    });
  }

  const perBlank = blanks.map((blank) => {
    const given = cleanPracticeText(userValues[blank.id] || '');
    const userVal = normalizePracticeText(given);
    const correctNormalized = normalizePracticeText(blank.answer);
    const acceptableNormalized = Array.isArray(blank.acceptable) ? blank.acceptable.map(normalizePracticeText) : [];
    const isCorrect = userVal === correctNormalized || acceptableNormalized.includes(userVal);
    return { id: blank.id, expected: blank.answer, given, isCorrect };
  });

  const correctCount = perBlank.filter((item) => item.isCorrect).length;
  const ratio = total ? correctCount / total : 0;
  const status = ratio >= 0.7 ? PRACTICE_RESULT_STATUS.CORRECT : correctCount > 0 ? PRACTICE_RESULT_STATUS.NEAR : PRACTICE_RESULT_STATUS.INCORRECT;

  return finalizePracticeResult(question, {
    status,
    correct: status === PRACTICE_RESULT_STATUS.CORRECT,
    retryable: status === PRACTICE_RESULT_STATUS.NEAR,
    loseLife: status === PRACTICE_RESULT_STATUS.INCORRECT,
    message: status === PRACTICE_RESULT_STATUS.CORRECT ? 'Muito bem!' : status === PRACTICE_RESULT_STATUS.NEAR ? 'Você acertou parte do resumo. Ajuste as lacunas.' : 'Revise o resumo e tente de novo.',
    expected: question?.answer || '',
    hintWord: '',
    perBlank,
    correctCount,
    totalCount: total,
  });
}

export function checkPracticeAnswer(question, rawAnswer) {
  if (question?.type === QUESTION_TYPES.SUMMARY_CLOZE) {
    return checkSummaryCloze(question, rawAnswer);
  }

  const answer = Array.isArray(rawAnswer) ? rawAnswer.join(' ') : cleanPracticeText(rawAnswer);
  const user = normalizePracticeText(answer);
  const expected = normalizePracticeText(question?.answer);

  if (!user) {
    return finalizePracticeResult(question, {
      status: PRACTICE_RESULT_STATUS.EMPTY,
      correct: false,
      retryable: false,
      loseLife: false,
      message: 'Responda antes de continuar.',
      expected: question?.answer || '',
      hintWord: '',
    });
  }

  if ([QUESTION_TYPES.MULTIPLE_CHOICE, QUESTION_TYPES.AUDIO_CHOICE, QUESTION_TYPES.FILL_BLANK, QUESTION_TYPES.TRUE_FALSE, QUESTION_TYPES.NEW_CONTEXT].includes(question?.type)) {
    const correct = user === expected;
    return finalizePracticeResult(question, {
      status: correct ? PRACTICE_RESULT_STATUS.CORRECT : PRACTICE_RESULT_STATUS.INCORRECT,
      correct,
      retryable: false,
      loseLife: !correct,
      message: correct ? 'Muito bem!' : 'Revise esta resposta.',
      expected: question?.answer || '',
      hintWord: '',
    });
  }

  if (user === expected) {
    return finalizePracticeResult(question, {
      status: PRACTICE_RESULT_STATUS.CORRECT,
      correct: true,
      retryable: false,
      loseLife: false,
      message: 'Muito bem!',
      expected: question?.answer || '',
      hintWord: '',
    });
  }

  const distance = levenshtein(user, expected);
  const ratio = 1 - distance / Math.max(user.length, expected.length, 1);
  const expectedWords = expected.split(' ').filter(Boolean);
  const userWords = user.split(' ').filter(Boolean);
  const closeWords = expectedWords.filter((word, index) => word === userWords[index] || (word.length > 3 && levenshtein(word, userWords[index] || '') <= 1)).length;
  const answerIsTooShort = user.length < Math.max(3, Math.floor(expected.length * 0.35));
  const isReadingShortAnswer = question?.skill === 'reading' && question?.type === QUESTION_TYPES.WRITE_SHORT;
  const nearThreshold = isReadingShortAnswer ? 0.88 : 0.80;
  const closeWordThreshold = isReadingShortAnswer ? 0.82 : 0.70;
  const near = !answerIsTooShort && (ratio >= nearThreshold || distance <= 2 || (expectedWords.length > 2 && closeWords / expectedWords.length >= closeWordThreshold));

  if (near) {
    return finalizePracticeResult(question, {
      status: PRACTICE_RESULT_STATUS.NEAR,
      correct: false,
      retryable: true,
      loseLife: false,
      message: 'Está quase certo. Tente de novo.',
      expected: question?.answer || '',
      hintWord: findHintWord(expected, user),
    });
  }

  return finalizePracticeResult(question, {
    status: PRACTICE_RESULT_STATUS.INCORRECT,
    correct: false,
    retryable: false,
    loseLife: true,
    message: 'Revise esta resposta.',
    expected: question?.answer || '',
    hintWord: findHintWord(expected, user),
  });
}
