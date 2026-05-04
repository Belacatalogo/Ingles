import { normalizeReadingLevel } from './readingLevelPolicy.js';
import { PRACTICE_PHASES, QUESTION_TYPES } from '../practice/core/PracticeTypes.js';
import { createQuestion, makeSentenceOptions } from '../practice/core/builders/builderUtils.js';

export const EVIDENCE_LAYER = Object.freeze({
  MARK: 'mark',
  MARK_AND_PARAPHRASE: 'mark_and_paraphrase',
  EXPLAIN: 'explain',
  EVALUATE: 'evaluate',
});

export const EVIDENCE_LAYER_BY_LEVEL = Object.freeze({
  A1: EVIDENCE_LAYER.MARK,
  A2: EVIDENCE_LAYER.MARK,
  B1: EVIDENCE_LAYER.MARK_AND_PARAPHRASE,
  B2: EVIDENCE_LAYER.EXPLAIN,
  C1: EVIDENCE_LAYER.EVALUATE,
});

export const EVIDENCE_CLASS_LABEL = Object.freeze({
  direct_sufficient: 'Direta e suficiente — fala exatamente sobre isso',
  direct_partial: 'Direta mas parcial — toca no tema mas não fecha',
  inferred_strong: 'Inferida com base sólida — dá para deduzir com segurança',
  inferred_weak: 'Inferida com base fraca — exige muito salto',
});

export function getEvidenceLayerForLevel(level) {
  const normalized = normalizeReadingLevel(level);
  return EVIDENCE_LAYER_BY_LEVEL[normalized] || EVIDENCE_LAYER.MARK;
}

function clean(value) {
  return String(value ?? '').trim();
}

function getTaskEvidence(task) {
  return clean(task?.expectedEvidence || task?.evidence || task?.quote || task?.answer || '');
}

function getTaskInstruction(task) {
  return clean(task?.instruction || task?.question || task?.prompt || '');
}

function getEvidenceId(task, sentence) {
  return clean(task?.id || task?.evidenceTrackId || sentence.slice(0, 40));
}

function derivePlainParaphrase(sentence) {
  const cleanSentence = clean(sentence);
  if (!cleanSentence) return '';
  return cleanSentence
    .replace(/\bdon't\b/gi, 'do not')
    .replace(/\bcan't\b/gi, 'cannot')
    .replace(/\bisn't\b/gi, 'is not')
    .replace(/\bwon't\b/gi, 'will not')
    .replace(/\bI'm\b/g, 'I am')
    .replace(/\bit's\b/gi, 'it is')
    .replace(/\bthey're\b/gi, 'they are')
    .replace(/\bwe're\b/gi, 'we are');
}

function buildMarkEvidence(context, evidenceTask) {
  const sentence = getTaskEvidence(evidenceTask);
  if (!sentence) return null;

  const instruction = getTaskInstruction(evidenceTask);

  return createQuestion({
    skill: context.skill,
    phase: PRACTICE_PHASES.COMPREHENSION,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    title: 'Evidência no texto',
    prompt: `Qual frase do texto prova esta ideia?${instruction ? ` ${instruction}` : ''}`,
    answer: sentence,
    options: makeSentenceOptions(sentence, context),
    readingSkillTag: 'evidence',
    evidenceTrackId: getEvidenceId(evidenceTask, sentence),
    source: 'evidence-mark',
  });
}

function buildMarkAndParaphraseEvidence(context, evidenceTask) {
  const sentence = getTaskEvidence(evidenceTask);
  if (!sentence) return [];

  const correctParaphrase = clean(evidenceTask?.paraphrase || evidenceTask?.paraphraseModel || derivePlainParaphrase(sentence));
  if (!correctParaphrase || correctParaphrase === sentence) {
    return [buildMarkEvidence(context, evidenceTask)].filter(Boolean);
  }

  return [
    buildMarkEvidence(context, evidenceTask),
    createQuestion({
      skill: context.skill,
      phase: PRACTICE_PHASES.COMPREHENSION,
      type: QUESTION_TYPES.MULTIPLE_CHOICE,
      title: 'Paráfrase da evidência',
      prompt: `Qual frase tem o mesmo significado de: "${sentence}"?`,
      answer: correctParaphrase,
      options: makeSentenceOptions(correctParaphrase, context, [sentence]),
      readingSkillTag: 'evidence',
      evidenceTrackId: getEvidenceId(evidenceTask, sentence),
      source: 'evidence-paraphrase',
    }),
  ].filter(Boolean);
}

function buildExplainEvidence(context, evidenceTask) {
  const sentence = getTaskEvidence(evidenceTask);
  if (!sentence) return null;

  return createQuestion({
    skill: context.skill,
    phase: PRACTICE_PHASES.WRITING,
    type: QUESTION_TYPES.WRITE_SHORT,
    title: 'Explique a evidência',
    prompt: `Explique em 1 frase por que "${sentence}" prova esta ideia.`,
    answer: clean(evidenceTask?.explanationModel || `This sentence is evidence because it directly supports the answer.`),
    readingSkillTag: 'evidence',
    evidenceTrackId: getEvidenceId(evidenceTask, sentence),
    source: 'evidence-explain',
  });
}

function buildEvaluateEvidence(context, evidenceTask) {
  const sentence = getTaskEvidence(evidenceTask);
  if (!sentence) return null;

  return createQuestion({
    skill: context.skill,
    phase: PRACTICE_PHASES.COMPREHENSION,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    title: 'Tipo de evidência',
    prompt: `A frase "${sentence}" é evidência:`,
    answer: clean(evidenceTask?.evidenceClass || 'direct_sufficient'),
    options: Object.keys(EVIDENCE_CLASS_LABEL),
    optionLabels: EVIDENCE_CLASS_LABEL,
    readingSkillTag: 'evidence',
    evidenceTrackId: getEvidenceId(evidenceTask, sentence),
    source: 'evidence-evaluate',
  });
}

export function buildEvidenceQuestionsForLevel(context, evidenceTasks = []) {
  const layer = getEvidenceLayerForLevel(context?.level);
  const out = [];
  const tasks = Array.isArray(evidenceTasks) ? evidenceTasks : [];

  for (const task of tasks.slice(0, 3)) {
    let result;
    switch (layer) {
      case EVIDENCE_LAYER.MARK:
        result = buildMarkEvidence(context, task);
        break;
      case EVIDENCE_LAYER.MARK_AND_PARAPHRASE:
        result = buildMarkAndParaphraseEvidence(context, task);
        break;
      case EVIDENCE_LAYER.EXPLAIN:
        result = buildExplainEvidence(context, task);
        break;
      case EVIDENCE_LAYER.EVALUATE:
        result = buildEvaluateEvidence(context, task);
        break;
      default:
        result = buildMarkEvidence(context, task);
    }

    if (Array.isArray(result)) out.push(...result);
    else if (result) out.push(result);
  }

  return out;
}
