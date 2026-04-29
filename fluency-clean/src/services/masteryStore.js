import { storage } from './storage.js';

const MASTERY_KEY = 'mastery.skillProfile.v1';

const PILLARS = ['grammar', 'writing', 'reading', 'listening'];
const TYPE_TO_PILLAR = {
  grammar: 'grammar',
  writing: 'writing',
  reading: 'reading',
  listening: 'listening',
};

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function nextSaturdayKey(date = new Date()) {
  const copy = new Date(date);
  const day = copy.getDay();
  const distance = (6 - day + 7) % 7;
  copy.setDate(copy.getDate() + distance);
  return todayKey(copy);
}

function normalizePillar(value = {}) {
  return {
    attempts: Number(value.attempts || 0),
    correct: Number(value.correct || 0),
    weakCount: Number(value.weakCount || 0),
    score: Number(value.score || 0),
    lastReviewedAt: value.lastReviewedAt || '',
    weakTopics: Array.isArray(value.weakTopics) ? value.weakTopics.slice(0, 12) : [],
  };
}

function emptyProfile() {
  return {
    updatedAt: '',
    SaturdayReviewDate: nextSaturdayKey(),
    pillars: PILLARS.reduce((acc, pillar) => {
      acc[pillar] = normalizePillar();
      return acc;
    }, {}),
    recentErrors: [],
  };
}

function normalizeProfile(value = {}) {
  const base = emptyProfile();
  const pillars = { ...base.pillars };
  for (const pillar of PILLARS) {
    pillars[pillar] = normalizePillar(value?.pillars?.[pillar]);
  }
  return {
    ...base,
    ...value,
    pillars,
    recentErrors: Array.isArray(value.recentErrors) ? value.recentErrors.slice(0, 80) : [],
    SaturdayReviewDate: value.SaturdayReviewDate || nextSaturdayKey(),
  };
}

function extractWeakTopics({ lesson, answers = {}, writtenAnswer = '' }) {
  const topics = new Set();
  if (lesson?.title) topics.add(String(lesson.title));
  if (lesson?.category) topics.add(String(lesson.category));
  if (lesson?.checkpoint) topics.add(String(lesson.checkpoint));

  const exercises = Array.isArray(lesson?.exercises) ? lesson.exercises : [];
  exercises.forEach((exercise, index) => {
    const selected = answers?.[index];
    if (!selected) return;
    const expected = String(exercise?.answer || '').trim().toLowerCase();
    const received = String(selected || '').trim().toLowerCase();
    if (expected && received && expected !== received) {
      topics.add(String(exercise?.question || exercise?.prompt || `Questão ${index + 1}`).slice(0, 100));
    }
  });

  if (String(writtenAnswer || '').trim().length < 40 && lesson?.type === 'writing') {
    topics.add('produção escrita curta ou incompleta');
  }

  return Array.from(topics).filter(Boolean).slice(0, 8);
}

function scoreLessonAttempt({ lesson, answers = {}, writtenAnswer = '' }) {
  const exercises = Array.isArray(lesson?.exercises) ? lesson.exercises : [];
  let total = exercises.length;
  let correct = 0;

  exercises.forEach((exercise, index) => {
    const selected = answers?.[index];
    if (!selected) return;
    const expected = String(exercise?.answer || '').trim().toLowerCase();
    const received = String(selected || '').trim().toLowerCase();
    if (expected && received && expected === received) correct += 1;
  });

  if (lesson?.type === 'writing') {
    total += 2;
    const words = String(writtenAnswer || '').trim().split(/\s+/).filter(Boolean).length;
    if (words >= 30) correct += 1;
    if (words >= 60) correct += 1;
  }

  if (!total) {
    total = 1;
    correct = writtenAnswer || Object.keys(answers || {}).length ? 1 : 0;
  }

  const score = Math.round((correct / total) * 100);
  return { total, correct, score };
}

export function getMasteryProfile() {
  return normalizeProfile(storage.get(MASTERY_KEY, {}));
}

export function saveMasteryProfile(profile) {
  const next = normalizeProfile({ ...profile, updatedAt: new Date().toISOString() });
  storage.set(MASTERY_KEY, next);
  return next;
}

export function recordLessonMastery({ lesson, answers = {}, writtenAnswer = '' }) {
  const profile = getMasteryProfile();
  const pillar = TYPE_TO_PILLAR[String(lesson?.type || '').toLowerCase()] || 'reading';
  const result = scoreLessonAttempt({ lesson, answers, writtenAnswer });
  const weakTopics = extractWeakTopics({ lesson, answers, writtenAnswer });
  const previous = normalizePillar(profile.pillars[pillar]);
  const weak = result.score < 85;
  const attempts = previous.attempts + 1;
  const correct = previous.correct + result.correct;
  const totalAttempts = previous.attempts * 100 + result.score;
  const score = Math.round(totalAttempts / attempts);

  const nextPillar = {
    ...previous,
    attempts,
    correct,
    score,
    weakCount: previous.weakCount + (weak ? 1 : 0),
    weakTopics: Array.from(new Set([...weakTopics, ...previous.weakTopics])).slice(0, 12),
  };

  const errorEntry = {
    id: `${lesson?.id || lesson?.title || pillar}-${Date.now()}`,
    date: new Date().toISOString(),
    pillar,
    lessonId: lesson?.id || '',
    title: lesson?.title || 'Aula',
    level: lesson?.level || 'A1',
    score: result.score,
    weak,
    topics: weakTopics,
  };

  return saveMasteryProfile({
    ...profile,
    SaturdayReviewDate: nextSaturdayKey(),
    pillars: {
      ...profile.pillars,
      [pillar]: nextPillar,
    },
    recentErrors: [errorEntry, ...profile.recentErrors].slice(0, 80),
  });
}

export function getWeakPillars(threshold = 85) {
  const profile = getMasteryProfile();
  return PILLARS.map((pillar) => ({ pillar, ...normalizePillar(profile.pillars[pillar]) }))
    .filter((item) => item.attempts === 0 || item.score < threshold || item.weakCount > 0)
    .sort((a, b) => (a.score || 0) - (b.score || 0));
}

export function getSaturdayReviewPlan() {
  const profile = getMasteryProfile();
  const weakPillars = getWeakPillars(85);
  const pillars = PILLARS.map((pillar) => {
    const data = normalizePillar(profile.pillars[pillar]);
    return {
      pillar,
      score: data.score,
      attempts: data.attempts,
      weakTopics: data.weakTopics.slice(0, 6),
      needsReview: data.attempts === 0 || data.score < 85 || data.weakCount > 0,
    };
  });

  return {
    date: nextSaturdayKey(),
    threshold: 85,
    pillars,
    weakPillars,
    recentErrors: profile.recentErrors.slice(0, 20),
  };
}

export function isSaturday(date = new Date()) {
  return date.getDay() === 6;
}

export function shouldPrioritizeSaturdayReview(date = new Date()) {
  return isSaturday(date) && getWeakPillars(85).length > 0;
}

export function buildSaturdayReviewLesson() {
  const plan = getSaturdayReviewPlan();
  const weakLabels = plan.weakPillars.map((item) => item.pillar).join(', ') || 'todos os pilares';
  const topics = plan.pillars.flatMap((item) => item.weakTopics).filter(Boolean).slice(0, 16);

  return {
    id: `saturday-review-${plan.date}`,
    curriculumId: `saturday-review-${plan.date}`,
    type: 'review',
    level: 'A1',
    title: `Revisão adaptativa de sábado — ${plan.date}`,
    intro: 'Revisão semanal dos quatro pilares baseada nos erros, lacunas e desempenho acumulado durante a semana.',
    category: 'revisão adaptativa',
    checkpoint: 'saturday-adaptive-review',
    pillars: plan.pillars,
    weakPillars: plan.weakPillars,
    weakTopics: topics,
    unitTitle: 'Revisão adaptativa de sábado',
    unitGoal: 'Revisar gramática, escrita, leitura e escuta antes de continuar a trilha normal.',
    prerequisites: ['erros da semana', 'aulas concluídas', 'simulados e exercícios anteriores'],
    promptOverride: [
      'Gere uma revisão adaptativa completa de sábado para o Fluency.',
      'A revisão deve cobrir obrigatoriamente os 4 pilares: grammar, writing, reading e listening.',
      `Pilares fracos detectados: ${weakLabels}.`,
      `Tópicos fracos detectados: ${topics.join('; ') || 'sem tópicos específicos registrados ainda'}.`,
      '',
      'Estrutura obrigatória:',
      '1. Diagnóstico curto em português do que será revisado.',
      '2. Bloco Grammar: explicação, exemplos, correção de erros e exercícios.',
      '3. Bloco Reading: texto curto/médio, vocabulário e perguntas.',
      '4. Bloco Listening: transcrição, perguntas de compreensão e shadowing.',
      '5. Bloco Writing: produção guiada com checklist e autocorreção.',
      '6. Mini simulado final misturando os quatro pilares.',
      '',
      'Regras:',
      '- Não introduza conteúdo novo de nível superior.',
      '- Foque em corrigir lacunas do nível atual.',
      '- Seja profundo, longo e prático.',
      '- Inclua muitas perguntas e exercícios.',
      '- Não avance a trilha normal enquanto a revisão de sábado tiver pontos fracos importantes.',
    ].join('\n'),
  };
}
