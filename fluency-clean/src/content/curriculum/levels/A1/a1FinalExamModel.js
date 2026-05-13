import { LEVEL_MASTERY_PILLARS, LEVEL_MASTERY_WEIGHTS, LEVEL_PASSING_RULES, calculateWeightedLevelScore } from '../../levelMasteryFramework.js';

export const A1_FINAL_EXAM_VERSION = 'a1-final-exam-v1';

export const A1_FINAL_EXAM_SECTIONS = Object.freeze([
  Object.freeze({
    id: 'grammar',
    title: 'Grammar',
    studentTitle: 'Gramática em uso',
    weight: LEVEL_MASTERY_WEIGHTS.grammar,
    minimumScore: LEVEL_PASSING_RULES.minimumPillarPercent,
    instructions: 'Complete e corrija frases simples sobre identidade, família, cidade, país, rotina e preferências.',
    questions: Object.freeze([
      Object.freeze({ id: 'grammar-1', type: 'multiple-choice', prompt: 'Choose the correct sentence.', options: Object.freeze(['I am from Brazil.', 'I from Brazil.', 'I am Brazil.', 'I has Brazil.']), answer: 'I am from Brazil.', points: 20 }),
      Object.freeze({ id: 'grammar-2', type: 'multiple-choice', prompt: 'Choose the correct sentence about age.', options: Object.freeze(['I have 20 years old.', 'I am 20 years old.', 'I am 20 years.', 'I have 20 old.']), answer: 'I am 20 years old.', points: 20 }),
      Object.freeze({ id: 'grammar-3', type: 'fill-blank', prompt: 'Complete: She ____ my sister.', answer: 'is', acceptedAnswers: Object.freeze(['is']), points: 20 }),
      Object.freeze({ id: 'grammar-4', type: 'fill-blank', prompt: 'Complete: This is my brother. ____ name is Lucas.', answer: 'His', acceptedAnswers: Object.freeze(['his']), points: 20 }),
      Object.freeze({ id: 'grammar-5', type: 'correction', prompt: 'Correct the sentence: He name is Pedro.', answer: 'His name is Pedro.', acceptedAnswers: Object.freeze(['his name is pedro', 'his name is pedro.']), points: 20 }),
    ]),
  }),
  Object.freeze({
    id: 'vocabulary',
    title: 'Vocabulary',
    studentTitle: 'Vocabulário em contexto',
    weight: LEVEL_MASTERY_WEIGHTS.vocabulary,
    minimumScore: LEVEL_PASSING_RULES.minimumPillarPercent,
    instructions: 'Mostre que você entende palavras e frases úteis do A1 em situações reais.',
    questions: Object.freeze([
      Object.freeze({ id: 'vocabulary-1', type: 'multiple-choice', prompt: 'What does “city” mean?', options: Object.freeze(['país', 'cidade', 'idade', 'endereço de e-mail']), answer: 'cidade', points: 20 }),
      Object.freeze({ id: 'vocabulary-2', type: 'multiple-choice', prompt: 'Choose the best phrase for contato digital.', options: Object.freeze(['phone number', 'email address', 'country', 'free time']), answer: 'email address', points: 20 }),
      Object.freeze({ id: 'vocabulary-3', type: 'fill-blank', prompt: 'Complete: My favorite ____ is soccer.', answer: 'sport', acceptedAnswers: Object.freeze(['sport']), points: 20 }),
      Object.freeze({ id: 'vocabulary-4', type: 'multiple-choice', prompt: 'Choose the correct nationality for Brazil.', options: Object.freeze(['Brazil', 'Brazilian', 'Brasil', 'Brazilish']), answer: 'Brazilian', points: 20 }),
      Object.freeze({ id: 'vocabulary-5', type: 'fill-blank', prompt: 'Complete: In my free ____, I listen to music.', answer: 'time', acceptedAnswers: Object.freeze(['time']), points: 20 }),
    ]),
  }),
  Object.freeze({
    id: 'reading',
    title: 'Reading',
    studentTitle: 'Leitura curta',
    weight: LEVEL_MASTERY_WEIGHTS.reading,
    minimumScore: LEVEL_PASSING_RULES.minimumPillarPercent,
    instructions: 'Leia o texto curto e responda usando informações do próprio texto.',
    text: 'Hi, my name is Ana. I am 19 years old and I am from Brazil. I live in Santa Maria. My brother is Lucas. He is 16. In my free time, I listen to music and study English. My favorite class is English because it is useful for my future.',
    questions: Object.freeze([
      Object.freeze({ id: 'reading-1', type: 'multiple-choice', prompt: 'How old is Ana?', options: Object.freeze(['16', '19', '20', '18']), answer: '19', points: 20 }),
      Object.freeze({ id: 'reading-2', type: 'multiple-choice', prompt: 'Where does Ana live?', options: Object.freeze(['Brazilian', 'English', 'Santa Maria', 'Lucas']), answer: 'Santa Maria', points: 20 }),
      Object.freeze({ id: 'reading-3', type: 'multiple-choice', prompt: 'Who is Lucas?', options: Object.freeze(['Ana’s brother', 'Ana’s teacher', 'Ana’s city', 'Ana’s class']), answer: 'Ana’s brother', points: 20 }),
      Object.freeze({ id: 'reading-4', type: 'multiple-choice', prompt: 'What does Ana do in her free time?', options: Object.freeze(['She watches TV and cooks.', 'She listens to music and studies English.', 'She plays soccer and works.', 'She studies math.']), answer: 'She listens to music and studies English.', points: 20 }),
      Object.freeze({ id: 'reading-5', type: 'multiple-choice', prompt: 'Why does Ana like English?', options: Object.freeze(['It is difficult.', 'It is useful for her future.', 'It is her city.', 'It is her brother.']), answer: 'It is useful for her future.', points: 20 }),
    ]),
  }),
  Object.freeze({
    id: 'listening',
    title: 'Listening',
    studentTitle: 'Escuta curta',
    weight: LEVEL_MASTERY_WEIGHTS.listening,
    minimumScore: LEVEL_PASSING_RULES.minimumPillarPercent,
    instructions: 'Escute primeiro sem legenda. Depois responda detalhes simples do áudio.',
    transcriptForTeacher: 'A: Hello. What is your name? B: My name is Bruno. A: Where are you from? B: I am from Brazil, and I live in Curitiba. A: What is your phone number? B: It is 55 41 90000 1234. A: What do you do in your free time? B: I play games and study English.',
    questions: Object.freeze([
      Object.freeze({ id: 'listening-1', type: 'multiple-choice', prompt: 'What is his name?', options: Object.freeze(['Lucas', 'Bruno', 'Pedro', 'Ana']), answer: 'Bruno', points: 20 }),
      Object.freeze({ id: 'listening-2', type: 'multiple-choice', prompt: 'Where does he live?', options: Object.freeze(['Curitiba', 'Santa Maria', 'São Paulo', 'Brazilian']), answer: 'Curitiba', points: 20 }),
      Object.freeze({ id: 'listening-3', type: 'multiple-choice', prompt: 'What country is he from?', options: Object.freeze(['Brazil', 'Canada', 'England', 'Spain']), answer: 'Brazil', points: 20 }),
      Object.freeze({ id: 'listening-4', type: 'multiple-choice', prompt: 'What does he do in his free time?', options: Object.freeze(['He cooks and runs.', 'He plays games and studies English.', 'He reads and sleeps.', 'He works and travels.']), answer: 'He plays games and studies English.', points: 20 }),
      Object.freeze({ id: 'listening-5', type: 'fill-blank', prompt: 'Complete one number you hear: 55 41 90000 ____', answer: '1234', acceptedAnswers: Object.freeze(['1234']), points: 20 }),
    ]),
  }),
  Object.freeze({
    id: 'speaking',
    title: 'Speaking',
    studentTitle: 'Fala guiada',
    weight: LEVEL_MASTERY_WEIGHTS.speaking,
    minimumScore: LEVEL_PASSING_RULES.minimumSpeakingPercent,
    requiresReview: true,
    instructions: 'Grave uma resposta curta. A revisão deve avaliar clareza, gramática, vocabulário e se você cumpriu a tarefa.',
    prompt: 'Introduce yourself in 45 to 60 seconds. Say your name, age, city, country, one family member, one hobby and why you study English.',
    rubric: Object.freeze({ clarity: 25, grammarControl: 25, vocabularyUse: 20, taskCompletion: 20, pronunciationIntelligibility: 10 }),
  }),
  Object.freeze({
    id: 'writing',
    title: 'Writing',
    studentTitle: 'Escrita curta',
    weight: LEVEL_MASTERY_WEIGHTS.writing,
    minimumScore: LEVEL_PASSING_RULES.minimumWritingPercent,
    requiresReview: true,
    instructions: 'Escreva um texto curto. Revise antes de enviar.',
    prompt: 'Write 8 to 10 simple sentences about yourself, your city, your family, your free time and why English is useful for you.',
    rubric: Object.freeze({ grammarControl: 25, vocabularyUse: 20, organization: 20, taskCompletion: 20, mechanics: 15 }),
  }),
]);

export const A1_FINAL_EXAM_MODEL = Object.freeze({
  id: 'A1-FINAL-EXAM-REAL',
  version: A1_FINAL_EXAM_VERSION,
  level: 'A1',
  title: 'Prova final do A1',
  studentDescription: 'Mostre que você consegue usar o inglês básico em leitura, escuta, fala, escrita, gramática e vocabulário.',
  estimatedMinutes: 45,
  passingRules: LEVEL_PASSING_RULES,
  sections: A1_FINAL_EXAM_SECTIONS,
});

function normalizeAnswer(value) {
  return String(value ?? '').trim().toLowerCase().replace(/[.!?]+$/g, '').replace(/\s+/g, ' ');
}

function scoreObjectiveQuestion(question, answer) {
  const normalized = normalizeAnswer(answer);
  const accepted = [question.answer, ...(question.acceptedAnswers || [])].map(normalizeAnswer);
  return accepted.includes(normalized) ? Number(question.points || 0) : 0;
}

export function scoreA1FinalExamObjectiveSection(sectionId, answers = {}) {
  const section = A1_FINAL_EXAM_SECTIONS.find((item) => item.id === sectionId);
  if (!section || section.requiresReview) return { sectionId, score: 0, maxScore: 0, percent: 0, answered: 0, total: 0 };
  const questions = Array.isArray(section.questions) ? section.questions : [];
  const maxScore = questions.reduce((sum, question) => sum + Number(question.points || 0), 0);
  const score = questions.reduce((sum, question) => sum + scoreObjectiveQuestion(question, answers[question.id]), 0);
  const answered = questions.filter((question) => String(answers[question.id] ?? '').trim()).length;
  return Object.freeze({ sectionId, score, maxScore, percent: maxScore ? Math.round((score / maxScore) * 100) : 0, answered, total: questions.length });
}

export function scoreA1FinalExamObjectiveAnswers(answersBySection = {}) {
  const sectionScores = A1_FINAL_EXAM_SECTIONS.map((section) => {
    if (section.requiresReview) return { sectionId: section.id, score: 0, maxScore: 0, percent: 0, requiresReview: true };
    return { ...scoreA1FinalExamObjectiveSection(section.id, answersBySection[section.id] || {}), requiresReview: false };
  });
  const objectivePillarScores = Object.fromEntries(sectionScores.filter((item) => !item.requiresReview).map((item) => [item.sectionId, item.percent]));
  const overall = calculateWeightedLevelScore({ ...objectivePillarScores, speaking: 0, writing: 0 });
  return Object.freeze({ sectionScores, objectivePillarScores, overall, speakingRequiresReview: true, writingRequiresReview: true });
}

export function buildA1FinalExamSubmission({ objectiveAnswers = {}, speaking = {}, writing = {} } = {}) {
  return Object.freeze({
    examId: A1_FINAL_EXAM_MODEL.id,
    version: A1_FINAL_EXAM_VERSION,
    level: 'A1',
    submittedAt: new Date().toISOString(),
    objectiveAnswers,
    speaking,
    writing,
    scoring: scoreA1FinalExamObjectiveAnswers(objectiveAnswers),
  });
}

export function getA1FinalExamSection(sectionId) {
  return A1_FINAL_EXAM_SECTIONS.find((section) => section.id === sectionId) || null;
}

export function getA1FinalExamStudentSections() {
  return A1_FINAL_EXAM_SECTIONS.map((section) => Object.freeze({
    id: section.id,
    title: section.studentTitle || section.title,
    instructions: section.instructions,
    requiresReview: Boolean(section.requiresReview),
    minimumScore: section.minimumScore,
    weight: section.weight,
  }));
}

export function isA1FinalExamSectionId(sectionId) {
  return LEVEL_MASTERY_PILLARS.includes(sectionId);
}
