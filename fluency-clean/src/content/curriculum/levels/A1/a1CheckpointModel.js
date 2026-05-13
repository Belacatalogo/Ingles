import { A1_CHECKPOINTS } from './a1MasteryAssessments.js';

const pillarLabels = Object.freeze({
  grammar: 'Gramática',
  vocabulary: 'Vocabulário',
  reading: 'Leitura',
  listening: 'Escuta',
  speaking: 'Fala',
  writing: 'Escrita',
});

const objectiveQuestions = Object.freeze({
  'A1-CHECKPOINT-FOUNDATIONS': Object.freeze({
    grammar: Object.freeze([
      Object.freeze({ id: 'f-g-1', type: 'multiple-choice', prompt: 'Complete: ___ am Ana.', options: Object.freeze(['I', 'You', 'She']), answer: 'I' }),
      Object.freeze({ id: 'f-g-2', type: 'short-answer', prompt: 'Corrija: He name is Lucas.', answer: 'His name is Lucas' }),
    ]),
    vocabulary: Object.freeze([
      Object.freeze({ id: 'f-v-1', type: 'multiple-choice', prompt: 'Brazilian significa:', options: Object.freeze(['brasileiro/brasileira', 'Brasil', 'cidade']), answer: 'brasileiro/brasileira' }),
      Object.freeze({ id: 'f-v-2', type: 'multiple-choice', prompt: 'Family significa:', options: Object.freeze(['família', 'aula', 'número']), answer: 'família' }),
    ]),
    reading: Object.freeze([
      Object.freeze({ id: 'f-r-1', type: 'reading-text', text: 'Hi, I am Leo. I am from Brazil. I am a student. My sister is Ana.' }),
      Object.freeze({ id: 'f-r-2', type: 'multiple-choice', prompt: 'Where is Leo from?', options: Object.freeze(['Brazil', 'Canada', 'England']), answer: 'Brazil' }),
      Object.freeze({ id: 'f-r-3', type: 'short-answer', prompt: 'Who is Ana?', answer: 'Leo sister' }),
    ]),
    listening: Object.freeze([
      Object.freeze({ id: 'f-l-1', type: 'listening-note', text: 'Ouça/Leia a situação: A person says: My name is Mia. I am 18. I am from Chile.' }),
      Object.freeze({ id: 'f-l-2', type: 'multiple-choice', prompt: 'What is the name?', options: Object.freeze(['Mia', 'Ana', 'Lia']), answer: 'Mia' }),
      Object.freeze({ id: 'f-l-3', type: 'multiple-choice', prompt: 'How old is she?', options: Object.freeze(['18', '8', '80']), answer: '18' }),
    ]),
  }),
  'A1-CHECKPOINT-PERSONAL-LIFE': Object.freeze({
    grammar: Object.freeze([
      Object.freeze({ id: 'p-g-1', type: 'multiple-choice', prompt: 'Complete: ___ phone number is 555-1090. (ela)', options: Object.freeze(['Her', 'His', 'My']), answer: 'Her' }),
      Object.freeze({ id: 'p-g-2', type: 'short-answer', prompt: 'Corrija: She city is Recife.', answer: 'Her city is Recife' }),
    ]),
    vocabulary: Object.freeze([
      Object.freeze({ id: 'p-v-1', type: 'multiple-choice', prompt: 'Free time significa:', options: Object.freeze(['tempo livre', 'telefone', 'endereço']), answer: 'tempo livre' }),
      Object.freeze({ id: 'p-v-2', type: 'multiple-choice', prompt: 'Email address é:', options: Object.freeze(['endereço de e-mail', 'cidade', 'idade']), answer: 'endereço de e-mail' }),
    ]),
    reading: Object.freeze([
      Object.freeze({ id: 'p-r-1', type: 'reading-text', text: 'My name is Carla. I live in Goiânia. My favorite hobby is music. My brother is Pedro. His favorite hobby is soccer.' }),
      Object.freeze({ id: 'p-r-2', type: 'multiple-choice', prompt: 'Where does Carla live?', options: Object.freeze(['Goiânia', 'Recife', 'São Paulo']), answer: 'Goiânia' }),
      Object.freeze({ id: 'p-r-3', type: 'multiple-choice', prompt: 'What is Pedro’s favorite hobby?', options: Object.freeze(['soccer', 'music', 'English']), answer: 'soccer' }),
    ]),
    listening: Object.freeze([
      Object.freeze({ id: 'p-l-1', type: 'listening-note', text: 'Ouça/Leia a situação: A student says: My email address is joao@email.com. My favorite class is English.' }),
      Object.freeze({ id: 'p-l-2', type: 'multiple-choice', prompt: 'What is his favorite class?', options: Object.freeze(['English', 'Math', 'Music']), answer: 'English' }),
      Object.freeze({ id: 'p-l-3', type: 'multiple-choice', prompt: 'What information does he say?', options: Object.freeze(['email address', 'home address', 'family name']), answer: 'email address' }),
    ]),
  }),
});

function normalizeAnswer(value) {
  return String(value || '').trim().toLowerCase().replace(/[.!?]+$/g, '');
}

export function getA1CheckpointShellItems() {
  return A1_CHECKPOINTS.map((checkpoint) => Object.freeze({
    id: checkpoint.id,
    title: checkpoint.title.replace('A1 Checkpoint — ', ''),
    unlockAfterUnit: checkpoint.unlockAfterUnit,
    passingScore: checkpoint.passingScore,
    purpose: checkpoint.purpose,
    pillars: Object.entries(checkpoint.pillars || {}).map(([pillarId, pillar]) => Object.freeze({
      id: pillarId,
      title: pillarLabels[pillarId] || pillarId,
      target: pillar.target,
      requiresReview: Boolean(pillar.requiresReview),
      tasks: Array.from(pillar.tasks || []),
      questions: Array.from(objectiveQuestions[checkpoint.id]?.[pillarId] || []),
    })),
  }));
}

export function getA1CheckpointShellItem(checkpointId) {
  return getA1CheckpointShellItems().find((checkpoint) => checkpoint.id === checkpointId) || null;
}

export function scoreA1CheckpointObjectiveAnswers(checkpointId, answers = {}) {
  const checkpoint = getA1CheckpointShellItem(checkpointId);
  if (!checkpoint) return Object.freeze({ checkpointId, percent: 0, correct: 0, total: 0, pillarScores: {} });
  let correct = 0;
  let total = 0;
  const pillarScores = {};

  checkpoint.pillars.forEach((pillar) => {
    const questions = pillar.questions.filter((question) => question.answer);
    let pillarCorrect = 0;
    questions.forEach((question) => {
      total += 1;
      const isCorrect = normalizeAnswer(answers[question.id]) === normalizeAnswer(question.answer);
      if (isCorrect) { correct += 1; pillarCorrect += 1; }
    });
    if (questions.length) pillarScores[pillar.id] = Math.round((pillarCorrect / questions.length) * 100);
  });

  return Object.freeze({
    checkpointId,
    percent: total ? Math.round((correct / total) * 100) : 0,
    correct,
    total,
    pillarScores,
  });
}
