import { getDuePracticeSrsItems, SRS_ITEM_TYPES } from './practiceSrsExtended.js';
import { listMasteryTags, TAG_DOMAIN } from '../practice/core/PracticeMasteryTags.js';
import { getPracticeTelemetrySummary } from '../practice/core/PracticeTelemetry.js';

export const LESSON_HISTORY_CONTEXT_VERSION = 'lesson-history-context-v1';
export const LESSON_HISTORY_CONTEXT_MAX_CHARS = 400;

function clean(value) {
  return String(value ?? '').trim();
}

function safeList(values, limit) {
  return (Array.isArray(values) ? values : [])
    .map(clean)
    .filter(Boolean)
    .slice(0, Math.max(0, Number(limit || 0)));
}

function clampAccuracy(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  return Math.max(0, Math.min(100, Math.round(number)));
}

function buildSuggestedFocus(context, lessonType) {
  const type = clean(lessonType).toLowerCase();
  if (type === 'grammar' && context.weakGrammarTags.length) {
    return `O aluno tem dificuldade recente com: ${context.weakGrammarTags.slice(0, 2).join(', ')}.`;
  }
  if (type === 'speaking' && context.weakPronunciation.length) {
    return `O aluno tem pronúncia fraca em: ${context.weakPronunciation.slice(0, 2).join(', ')}.`;
  }
  if (context.weakVocab.length) {
    return `Vocabulário fraco recente: ${context.weakVocab.slice(0, 3).join(', ')}.`;
  }
  if (context.recentAccuracy !== null && context.recentAccuracy < 65) {
    return `Acurácia recente baixa (${context.recentAccuracy}%) — simplificar e reforçar o básico.`;
  }
  return '';
}

export function buildLessonHistoryContext({ lessonType, level } = {}) {
  const context = {
    version: LESSON_HISTORY_CONTEXT_VERSION,
    lessonType: clean(lessonType).toLowerCase(),
    level: clean(level || 'A1').toUpperCase(),
    weakGrammarTags: [],
    weakVocab: [],
    weakPronunciation: [],
    recentAccuracy: null,
    suggestedFocus: '',
  };

  try {
    const grammarDue = getDuePracticeSrsItems({
      type: SRS_ITEM_TYPES.GRAMMAR_PATTERN,
      skill: 'grammar',
      limit: 3,
    });
    context.weakGrammarTags = safeList(grammarDue.map((item) => item.label || item.content), 3);

    const weakVocabTags = listMasteryTags({
      domain: TAG_DOMAIN.VOCABULARY,
      sortBy: 'mastery',
      limit: 4,
    }).filter((tag) => Number(tag.mastery || 0) < 60);
    context.weakVocab = safeList(weakVocabTags.map((tag) => tag.label || tag.tag), 4);

    const weakPronTags = listMasteryTags({
      domain: TAG_DOMAIN.PRONUNCIATION,
      sortBy: 'mastery',
      limit: 3,
    }).filter((tag) => Number(tag.mastery || 0) < 55);
    context.weakPronunciation = safeList(weakPronTags.map((tag) => tag.label || tag.tag), 3);

    const telemetry = getPracticeTelemetrySummary();
    const accuracy = telemetry?.bySkill?.[context.lessonType]?.averageAccuracy;
    context.recentAccuracy = clampAccuracy(accuracy);

    context.suggestedFocus = buildSuggestedFocus(context, context.lessonType);
    if (context.suggestedFocus) {
      console.info(`[LessonHistoryContext] suggestedFocus: "${context.suggestedFocus}"`);
    }
  } catch (err) {
    console.warn('[LessonHistoryContext] Erro ao ler histórico:', err?.message || err);
  }

  return context;
}

function compactToMaxChars(text, maxChars = LESSON_HISTORY_CONTEXT_MAX_CHARS) {
  const limit = Math.max(120, Number(maxChars || LESSON_HISTORY_CONTEXT_MAX_CHARS));
  const value = clean(text);
  if (value.length <= limit) return value;
  return `${value.slice(0, Math.max(0, limit - 1)).trimEnd()}…`;
}

export function formatHistoryContextForPrompt(context, { maxChars = LESSON_HISTORY_CONTEXT_MAX_CHARS } = {}) {
  if (!context) return '';

  const lines = [];
  if (context.suggestedFocus) lines.push(`CONTEXTO DO ALUNO: ${clean(context.suggestedFocus)}`);
  if (Array.isArray(context.weakGrammarTags) && context.weakGrammarTags.length) {
    lines.push(`Regras com dificuldade recente: ${safeList(context.weakGrammarTags, 3).join(', ')}.`);
  }
  if (Array.isArray(context.weakVocab) && context.weakVocab.length) {
    lines.push(`Vocabulário fraco: ${safeList(context.weakVocab, 4).join(', ')}.`);
  }
  if (Array.isArray(context.weakPronunciation) && context.weakPronunciation.length) {
    lines.push(`Pronúncia fraca: ${safeList(context.weakPronunciation, 3).join(', ')}.`);
  }
  if (context.recentAccuracy !== null && context.recentAccuracy !== undefined) {
    lines.push(`Acurácia recente na prática: ${clampAccuracy(context.recentAccuracy)}%.`);
  }

  if (!lines.length) return '';

  return compactToMaxChars([
    '--- HISTÓRICO DO ALUNO (use para personalizar a aula) ---',
    ...lines,
    '--- FIM DO HISTÓRICO ---',
  ].join('\n'), maxChars);
}

export function buildLessonHistoryPromptPrefix({ lessonType, level, maxChars = LESSON_HISTORY_CONTEXT_MAX_CHARS } = {}) {
  const context = buildLessonHistoryContext({ lessonType, level });
  return formatHistoryContextForPrompt(context, { maxChars });
}
