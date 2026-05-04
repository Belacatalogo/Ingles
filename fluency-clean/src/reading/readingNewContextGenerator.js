import { normalizeReadingLevel } from './readingLevelPolicy.js';
import { PRACTICE_PHASES, QUESTION_TYPES } from '../practice/core/PracticeTypes.js';
import { createQuestion, makeSentenceOptions } from '../practice/core/builders/builderUtils.js';

const MIN_LEVEL_FOR_NEW_CONTEXT = new Set(['B1', 'B2', 'C1']);
const MAX_TRANSFER_TEXT_WORDS = 80;

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function wordCount(value) {
  return clean(value).split(/\s+/).filter(Boolean).length;
}

function normalizeSubQuestion(transfer, context) {
  const raw = transfer?.subQuestion || transfer?.question || {};
  const prompt = clean(raw.prompt || raw.question || raw.instruction || 'What can you understand from the new context?');
  const answer = clean(raw.answer || raw.correctAnswer || raw.expectedAnswer || '');
  const type = clean(raw.type || 'multiple_choice');
  if (!answer) return null;

  const options = Array.isArray(raw.options) && raw.options.length
    ? raw.options.map(clean).filter(Boolean)
    : makeSentenceOptions(answer, context);

  return {
    prompt,
    type: type === 'short_answer' ? 'short_answer' : 'multiple_choice',
    answer,
    options,
  };
}

export function normalizeTransferContext(transfer, context = {}) {
  const text = clean(transfer?.text || transfer?.newContext || transfer?.context || '');
  if (!text || wordCount(text) > MAX_TRANSFER_TEXT_WORDS) return null;

  const subQuestion = normalizeSubQuestion(transfer, context);
  if (!subQuestion) return null;

  return {
    text,
    source: clean(transfer?.source || 'transfer'),
    tags: Array.isArray(transfer?.tags) ? transfer.tags.map(clean).filter(Boolean) : [],
    readingSkill: clean(transfer?.readingSkill || transfer?.skill || 'detail'),
    subQuestion,
  };
}

/**
 * Gera questões NEW_CONTEXT somente quando a IA forneceu transferContexts.
 * Não inventa trecho novo no builder.
 */
export function buildNewContextQuestions(context, transferContexts = []) {
  const level = normalizeReadingLevel(context?.level);
  if (!MIN_LEVEL_FOR_NEW_CONTEXT.has(level)) return [];

  const out = [];
  const transfers = Array.isArray(transferContexts) ? transferContexts : [];

  for (const rawTransfer of transfers.slice(0, 2)) {
    const transfer = normalizeTransferContext(rawTransfer, context);
    if (!transfer) continue;

    out.push(createQuestion({
      skill: context.skill || 'reading',
      phase: PRACTICE_PHASES.COMPREHENSION,
      type: QUESTION_TYPES.NEW_CONTEXT,
      title: 'Novo contexto',
      prompt: 'Leia este trecho novo e responda. Use o que aprendeu na aula.',
      answer: transfer.subQuestion.answer,
      options: transfer.subQuestion.options,
      newContext: {
        text: transfer.text,
        source: transfer.source,
      },
      subQuestion: transfer.subQuestion,
      transferTags: transfer.tags,
      readingSkillTag: transfer.readingSkill || 'detail',
      source: 'new-context-transfer',
    }));
  }

  return out;
}
