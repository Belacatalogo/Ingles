import { normalizePracticeText } from '../practice/core/PracticeNormalizer.js';

function cleanSkill(value) {
  return String(value || '').toLowerCase().trim();
}

function getAnswerValue(exercise) {
  return exercise?.answer || exercise?.expectedAnswer || exercise?.correctAnswer || exercise?.solution || exercise?.expectedEvidence || '';
}

/**
 * Extrai um fingerprint leve de um exercício.
 * Usado para detectar duplicação entre aba Reading e Prática Profunda.
 */
export function fingerprintReadingExercise(exercise) {
  if (!exercise) return null;

  const skill = cleanSkill(exercise.skill || exercise.readingSkill || exercise.readingSkillTag || '');
  const prompt = normalizePracticeText(exercise.prompt || exercise.question || exercise.instruction || '');
  const answer = normalizePracticeText(getAnswerValue(exercise));
  const evidence = normalizePracticeText(exercise.evidence || exercise.expectedEvidence || '');

  if (!skill && !prompt && !answer && !evidence) return null;

  return {
    skill,
    promptKey: prompt.slice(0, 80),
    answerKey: answer.slice(0, 60),
    evidenceKey: evidence.slice(0, 60),
  };
}

/**
 * Constrói o conjunto de exercícios já feitos a partir dos dados da aba Reading.
 * Esses exercícios são os que BLOCO-READING-6 mostra dentro da aba.
 */
export function collectAbaReadingExercises(lesson) {
  const acc = [];

  for (const q of (Array.isArray(lesson?.readingQuestions) ? lesson.readingQuestions : [])) {
    const fp = fingerprintReadingExercise(q);
    if (fp) acc.push({ source: 'readingQuestion', fingerprint: fp });
  }

  for (const ev of (Array.isArray(lesson?.evidenceTasks) ? lesson.evidenceTasks : [])) {
    const fp = fingerprintReadingExercise({
      skill: 'evidence',
      prompt: ev?.instruction || ev?.prompt || ev?.question || '',
      answer: ev?.expectedEvidence || ev?.answer || '',
      evidence: ev?.expectedEvidence || ev?.evidence || '',
    });
    if (fp) acc.push({ source: 'evidenceTask', fingerprint: fp });
  }

  return acc;
}

/**
 * Decide se uma questão proposta da Prática Profunda é duplicada
 * de algo que a aba Reading já fez.
 */
export function isDuplicateOfAba(proposedQuestion, abaExercises) {
  if (!proposedQuestion || !Array.isArray(abaExercises)) return false;
  const proposedFp = fingerprintReadingExercise({
    skill: proposedQuestion.readingSkillTag || proposedQuestion.skill,
    prompt: proposedQuestion.prompt,
    answer: proposedQuestion.answer,
    evidence: proposedQuestion.evidence || '',
  });
  if (!proposedFp) return false;

  return abaExercises.some(({ fingerprint: aba }) => {
    if (!aba) return false;
    if (aba.skill && proposedFp.skill && aba.skill === proposedFp.skill && aba.answerKey && aba.answerKey === proposedFp.answerKey) return true;
    if (aba.skill && proposedFp.skill && aba.skill === proposedFp.skill && aba.promptKey.slice(0, 60) === proposedFp.promptKey.slice(0, 60)) return true;
    return false;
  });
}

/**
 * Política de variação por skill: quando a aba já cobriu uma skill,
 * a Prática Profunda deve escolher um formato diferente.
 */
export const VARIANT_POLICY_BY_SKILL = Object.freeze({
  main_idea: Object.freeze({
    abaTypicallyUses: Object.freeze(['multiple_choice']),
    practiceShouldUse: Object.freeze(['summary_cloze', 'true_false_paraphrase', 'recall_no_text']),
  }),
  detail: Object.freeze({
    abaTypicallyUses: Object.freeze(['multiple_choice', 'true_false']),
    practiceShouldUse: Object.freeze(['fill_blank_from_text', 'word_bank', 'detail_recall']),
  }),
  vocabulary_context: Object.freeze({
    abaTypicallyUses: Object.freeze(['multiple_choice']),
    practiceShouldUse: Object.freeze(['vocab_in_new_context', 'matching', 'fill_blank']),
  }),
  sequence: Object.freeze({
    abaTypicallyUses: Object.freeze(['order']),
    practiceShouldUse: Object.freeze(['fill_blank_in_sequence', 'true_false_order']),
  }),
  evidence: Object.freeze({
    abaTypicallyUses: Object.freeze(['short_answer_copy']),
    practiceShouldUse: Object.freeze(['evidence_choice', 'evidence_paraphrase']),
  }),
  inference: Object.freeze({
    abaTypicallyUses: Object.freeze(['multiple_choice']),
    practiceShouldUse: Object.freeze(['inference_explain', 'inference_paraphrase']),
  }),
});
