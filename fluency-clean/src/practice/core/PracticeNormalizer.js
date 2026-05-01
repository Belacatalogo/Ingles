import { ANSWER_KINDS, PRACTICE_SKILLS } from './PracticeTypes.js';

export function cleanPracticeText(value) {
  return String(value ?? '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function normalizePracticeText(value) {
  return cleanPracticeText(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function splitPracticeSentences(value) {
  const clean = cleanPracticeText(value);
  if (!clean) return [];
  return clean
    .split(/\n\s*\n+|(?<=[.!?])\s+/)
    .map(cleanPracticeText)
    .filter((sentence) => sentence.length >= 4);
}

export function splitPracticeWords(value) {
  return cleanPracticeText(value)
    .replace(/[.!?,;:]/g, '')
    .split(/\s+/)
    .map(cleanPracticeText)
    .filter(Boolean);
}

export function detectPracticeSkill(lesson) {
  const raw = normalizePracticeText(lesson?.type || lesson?.skill || lesson?.pillar || '');
  if (raw.includes('listen') || raw.includes('escuta')) return PRACTICE_SKILLS.LISTENING;
  if (raw.includes('speak') || raw.includes('fala') || raw.includes('conversation')) return PRACTICE_SKILLS.SPEAKING;
  if (raw.includes('read') || raw.includes('leitura')) return PRACTICE_SKILLS.READING;
  if (raw.includes('grammar') || raw.includes('gramatica') || raw.includes('gramática')) return PRACTICE_SKILLS.GRAMMAR;
  if (raw.includes('writing') || raw.includes('escrita')) return PRACTICE_SKILLS.WRITING;
  return PRACTICE_SKILLS.MIXED;
}

export function detectAnswerKind(value) {
  const text = cleanPracticeText(value);
  const normalized = normalizePracticeText(text);
  const words = normalized.split(' ').filter(Boolean);
  if (!normalized) return ANSWER_KINDS.FREE_TEXT;
  if (/^(true|false)$/i.test(text)) return ANSWER_KINDS.BOOLEAN;
  if (/^[a-z](?:\s*-\s*[a-z]){1,}\.?$/i.test(text)) return ANSWER_KINDS.SPELLING;
  if (/resposta pessoal|example:|exemplo:|your name|seu nome|personal answer/i.test(text)) return ANSWER_KINDS.PERSONAL;
  if (words.length === 1) return ANSWER_KINDS.WORD;
  if (words.length <= 4 && text.length <= 34) return ANSWER_KINDS.SHORT_PHRASE;
  return ANSWER_KINDS.SENTENCE;
}

export function normalizeLessonForPractice(lesson = {}) {
  const skill = detectPracticeSkill(lesson);
  const title = cleanPracticeText(lesson.title || 'Aula');
  const objective = cleanPracticeText(lesson.objective || lesson.intro || lesson.subtitle || 'Treinar o conteúdo da aula.');
  const listeningText = cleanPracticeText(lesson.listeningText || lesson.text || lesson.readingText || '');
  const transcript = splitPracticeSentences(listeningText);
  const sections = Array.isArray(lesson.sections)
    ? lesson.sections.map((section, index) => ({
      id: `section-${index + 1}`,
      title: cleanPracticeText(section?.title || section?.heading || `Parte ${index + 1}`),
      content: cleanPracticeText(section?.content || section?.text || section?.body || section?.explanation || ''),
      examples: Array.isArray(section?.examples) ? section.examples.map(cleanPracticeText).filter(Boolean) : [],
    })).filter((section) => section.title || section.content || section.examples.length)
    : [];
  const sectionSentences = sections.flatMap((section) => splitPracticeSentences(`${section.title}. ${section.content}. ${section.examples.join('. ')}`));
  const vocabulary = Array.isArray(lesson.vocabulary)
    ? lesson.vocabulary.map((item, index) => ({
      id: `vocab-${index + 1}`,
      word: cleanPracticeText(item?.word || item?.term || ''),
      meaning: cleanPracticeText(item?.meaning || item?.translation || item?.definition || ''),
      example: cleanPracticeText(item?.example || item?.sentence || ''),
    })).filter((item) => item.word || item.meaning)
    : [];
  const exercises = Array.isArray(lesson.exercises)
    ? lesson.exercises.map((item, index) => ({
      id: `exercise-${index + 1}`,
      prompt: cleanPracticeText(item?.question || item?.prompt || item?.instruction || ''),
      answer: cleanPracticeText(item?.answer || item?.expectedAnswer || item?.correctAnswer || item?.solution || ''),
      options: Array.isArray(item?.options || item?.choices || item?.alternatives)
        ? (item.options || item.choices || item.alternatives).map(cleanPracticeText).filter(Boolean)
        : [],
    })).filter((item) => item.prompt && item.answer)
    : [];

  const allSentences = [...transcript, ...sectionSentences].filter(Boolean);
  const keywords = [
    ...vocabulary.map((item) => item.word),
    ...allSentences.flatMap(splitPracticeWords),
  ].map(cleanPracticeText).filter((word) => word.length >= 3);

  return {
    id: lesson.id || `lesson-${normalizePracticeText(title).slice(0, 32)}`,
    title,
    objective,
    skill,
    level: lesson.level || 'A1',
    transcript,
    sections,
    vocabulary,
    exercises,
    sentences: allSentences,
    keywords: [...new Set(keywords.map((word) => word.toLowerCase()))],
    raw: lesson,
  };
}
