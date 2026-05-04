import { collectAbaReadingExercises } from '../../reading/readingPracticeVariants.js';
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

function normalizeEvidenceTasksForPractice(lesson, skill) {
  if (skill !== PRACTICE_SKILLS.READING) return [];
  const direct = Array.isArray(lesson?.evidenceTasks) ? lesson.evidenceTasks : [];
  const fromQuestions = Array.isArray(lesson?.readingQuestions)
    ? lesson.readingQuestions
      .filter((item) => item?.evidence || item?.quote || item?.expectedEvidence)
      .map((item, index) => ({
        id: item?.id || `reading-question-evidence-${index + 1}`,
        instruction: item?.question || item?.prompt || 'Encontre a evidência que prova a resposta.',
        expectedEvidence: item?.expectedEvidence || item?.evidence || item?.quote || '',
        paraphrase: item?.paraphrase || item?.paraphraseModel || '',
        explanationModel: item?.explanationModel || item?.explanation || '',
        evidenceClass: item?.evidenceClass || 'direct_sufficient',
      }))
    : [];

  return [...direct, ...fromQuestions]
    .map((item, index) => ({
      id: item?.id || `evidence-${index + 1}`,
      instruction: cleanPracticeText(item?.instruction || item?.question || item?.prompt || 'Encontre a evidência que prova a resposta.'),
      expectedEvidence: cleanPracticeText(item?.expectedEvidence || item?.evidence || item?.quote || ''),
      paraphrase: cleanPracticeText(item?.paraphrase || item?.paraphraseModel || ''),
      explanationModel: cleanPracticeText(item?.explanationModel || item?.explanation || ''),
      evidenceClass: cleanPracticeText(item?.evidenceClass || 'direct_sufficient'),
    }))
    .filter((item) => item.expectedEvidence)
    .slice(0, 6);
}

function normalizeTransferContextsForPractice(lesson, skill) {
  if (skill !== PRACTICE_SKILLS.READING) return [];
  const raw = Array.isArray(lesson?.transferContexts)
    ? lesson.transferContexts
    : Array.isArray(lesson?.transfer_contexts)
      ? lesson.transfer_contexts
      : [];

  return raw.map((item) => {
    const sub = item?.subQuestion || item?.question || {};
    return {
      text: cleanPracticeText(item?.text || item?.newContext || item?.context || ''),
      source: cleanPracticeText(item?.source || 'transfer'),
      tags: Array.isArray(item?.tags) ? item.tags.map(cleanPracticeText).filter(Boolean) : [],
      readingSkill: cleanPracticeText(item?.readingSkill || item?.skill || 'detail'),
      subQuestion: {
        prompt: cleanPracticeText(sub?.prompt || sub?.question || sub?.instruction || ''),
        type: cleanPracticeText(sub?.type || 'multiple_choice'),
        answer: cleanPracticeText(sub?.answer || sub?.correctAnswer || sub?.expectedAnswer || ''),
        options: Array.isArray(sub?.options || sub?.choices || sub?.alternatives)
          ? (sub.options || sub.choices || sub.alternatives).map(cleanPracticeText).filter(Boolean)
          : [],
      },
    };
  }).filter((item) => item.text && item.subQuestion.answer).slice(0, 2);
}

function normalizeSummaryClozeForPractice(lesson, skill) {
  if (skill !== PRACTICE_SKILLS.READING) return null;
  const raw = lesson?.summaryCloze || lesson?.summary_cloze;
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  return {
    summaryText: cleanPracticeText(raw.summaryText || raw.text || ''),
    blanks: Array.isArray(raw.blanks)
      ? raw.blanks.map((blank) => ({
        id: cleanPracticeText(blank?.id),
        answer: cleanPracticeText(blank?.answer),
        acceptable: Array.isArray(blank?.acceptable) ? blank.acceptable.map(cleanPracticeText).filter(Boolean) : [],
        hint: cleanPracticeText(blank?.hint || ''),
      })).filter((blank) => blank.id && blank.answer)
      : [],
    difficulty: cleanPracticeText(raw.difficulty || 'easy'),
  };
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
  const abaReadingExercises = skill === PRACTICE_SKILLS.READING ? collectAbaReadingExercises(lesson) : [];
  const evidenceTasks = normalizeEvidenceTasksForPractice(lesson, skill);
  const transferContexts = normalizeTransferContextsForPractice(lesson, skill);
  const summaryCloze = normalizeSummaryClozeForPractice(lesson, skill);

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
    evidenceTasks,
    transferContexts,
    summaryCloze,
    sentences: allSentences,
    keywords: [...new Set(keywords.map((word) => word.toLowerCase()))],
    abaReadingExercises,
    raw: lesson,
  };
}
