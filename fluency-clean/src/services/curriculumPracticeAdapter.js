import { storage } from './storage.js';

const CURRICULUM_PRACTICE_KEY = 'curriculum.currentUnit.v1';
const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;

function clean(value) {
  return String(value ?? '').trim();
}

function normalizeKeyword(value) {
  return clean(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s'-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function uniqueKeywords(values, limit = 10) {
  const seen = new Set();
  return (Array.isArray(values) ? values : [])
    .map(normalizeKeyword)
    .filter((value) => value.length >= 3)
    .filter((value) => {
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    })
    .slice(0, Math.max(0, Number(limit || 10)));
}

function splitKeywords(value) {
  return normalizeKeyword(value)
    .split(/[\s\-–—,;:()\[\]{}]+/)
    .filter((word) => word.length >= 3);
}

export function extractTopicKeywords(lesson) {
  if (!lesson) return [];
  const title = clean(lesson.title || '');
  const focus = clean(lesson.focus || lesson.objective || '');
  const grammar = clean(lesson.grammarFocusTag || lesson.focusArea || '');
  const vocab = Array.isArray(lesson.vocabulary)
    ? lesson.vocabulary.map((item) => item?.word || item?.term || '').filter(Boolean)
    : [];

  return uniqueKeywords([
    ...splitKeywords(title),
    ...splitKeywords(focus),
    ...splitKeywords(grammar),
    ...vocab.slice(0, 6),
  ], 10);
}

export function recordCurrentCurriculumUnit({ unitId, lessonId, lessonType, level, title, topicKeywords = [] } = {}) {
  if (!unitId && !lessonId && !title) return null;

  const entry = {
    unitId: clean(unitId || lessonId || title),
    lessonId: clean(lessonId || unitId || title),
    lessonType: clean(lessonType || ''),
    level: clean(level || 'A1').toUpperCase(),
    title: clean(title || ''),
    topicKeywords: uniqueKeywords(topicKeywords, 10),
    recordedAt: Date.now(),
  };

  try {
    storage.set(CURRICULUM_PRACTICE_KEY, entry);
  } catch {
    // Contexto curricular é auxiliar e nunca deve quebrar a aula/prática.
  }

  return entry;
}

export function recordLessonAsCurrentCurriculumUnit(lesson) {
  if (!lesson) return null;
  const unit = lesson.curriculumUnit || lesson.unit || lesson.curriculum || {};
  return recordCurrentCurriculumUnit({
    unitId: unit.id || unit.unitId || lesson.unitId || lesson.curriculumUnitId || lesson.id || lesson.generationMeta?.id || lesson.title,
    lessonId: lesson.id || lesson.generationMeta?.id || lesson.title,
    lessonType: lesson.type,
    level: lesson.level,
    title: unit.title || lesson.title,
    topicKeywords: Array.isArray(unit.topicKeywords) && unit.topicKeywords.length
      ? unit.topicKeywords
      : extractTopicKeywords(lesson),
  });
}

export function getCurrentCurriculumUnit() {
  try {
    const entry = storage.get(CURRICULUM_PRACTICE_KEY, null);
    if (!entry || typeof entry !== 'object') return null;
    if (Date.now() - Number(entry.recordedAt || 0) > TWELVE_HOURS_MS) return null;
    return {
      unitId: clean(entry.unitId),
      lessonId: clean(entry.lessonId),
      lessonType: clean(entry.lessonType),
      level: clean(entry.level || 'A1').toUpperCase(),
      title: clean(entry.title),
      topicKeywords: uniqueKeywords(entry.topicKeywords, 10),
      recordedAt: Number(entry.recordedAt || 0),
    };
  } catch {
    return null;
  }
}

export function buildCurriculumContextForBuilder(curriculumUnit) {
  if (!curriculumUnit) return {};
  const keywords = uniqueKeywords(curriculumUnit.topicKeywords, 10);
  if (!keywords.length && !curriculumUnit.title) return {};

  return {
    curriculumUnitId: clean(curriculumUnit.unitId),
    curriculumLessonId: clean(curriculumUnit.lessonId),
    curriculumTitle: clean(curriculumUnit.title),
    curriculumKeywords: keywords,
    curriculumType: clean(curriculumUnit.lessonType),
    curriculumLevel: clean(curriculumUnit.level || 'A1').toUpperCase(),
    isTopicRelevant(word) {
      const value = normalizeKeyword(word);
      if (!value || !keywords.length) return false;
      return keywords.some((keyword) => value.includes(keyword) || keyword.includes(value));
    },
  };
}

export function getCurrentCurriculumContextForBuilder() {
  return buildCurriculumContextForBuilder(getCurrentCurriculumUnit());
}
