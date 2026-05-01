import { PRACTICE_RESULT_STATUS, QUESTION_TYPES } from './PracticeTypes.js';
import { cleanPracticeText, normalizePracticeText } from './PracticeNormalizer.js';

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

export function checkPracticeAnswer(question, rawAnswer) {
  const answer = Array.isArray(rawAnswer) ? rawAnswer.join(' ') : cleanPracticeText(rawAnswer);
  const user = normalizePracticeText(answer);
  const expected = normalizePracticeText(question?.answer);

  if (!user) {
    return {
      status: PRACTICE_RESULT_STATUS.EMPTY,
      correct: false,
      retryable: false,
      loseLife: false,
      message: 'Responda antes de continuar.',
      expected: question?.answer || '',
      hintWord: '',
    };
  }

  if ([QUESTION_TYPES.MULTIPLE_CHOICE, QUESTION_TYPES.AUDIO_CHOICE, QUESTION_TYPES.FILL_BLANK, QUESTION_TYPES.TRUE_FALSE].includes(question?.type)) {
    const correct = user === expected;
    return {
      status: correct ? PRACTICE_RESULT_STATUS.CORRECT : PRACTICE_RESULT_STATUS.INCORRECT,
      correct,
      retryable: false,
      loseLife: !correct,
      message: correct ? 'Muito bem!' : 'Revise esta resposta.',
      expected: question?.answer || '',
      hintWord: '',
    };
  }

  if (user === expected) {
    return {
      status: PRACTICE_RESULT_STATUS.CORRECT,
      correct: true,
      retryable: false,
      loseLife: false,
      message: 'Muito bem!',
      expected: question?.answer || '',
      hintWord: '',
    };
  }

  const distance = levenshtein(user, expected);
  const ratio = 1 - distance / Math.max(user.length, expected.length, 1);
  const expectedWords = expected.split(' ').filter(Boolean);
  const userWords = user.split(' ').filter(Boolean);
  const closeWords = expectedWords.filter((word, index) => word === userWords[index] || (word.length > 3 && levenshtein(word, userWords[index] || '') <= 1)).length;
  const near = ratio >= 0.80 || distance <= 3 || (expectedWords.length > 2 && closeWords / expectedWords.length >= 0.70);

  if (near) {
    return {
      status: PRACTICE_RESULT_STATUS.NEAR,
      correct: false,
      retryable: true,
      loseLife: false,
      message: 'Está quase certo. Tente de novo.',
      expected: question?.answer || '',
      hintWord: findHintWord(expected, user),
    };
  }

  return {
    status: PRACTICE_RESULT_STATUS.INCORRECT,
    correct: false,
    retryable: false,
    loseLife: true,
    message: 'Revise esta resposta.',
    expected: question?.answer || '',
    hintWord: findHintWord(expected, user),
  };
}
