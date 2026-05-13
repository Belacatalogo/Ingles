export const STATIC_CURRICULUM_VERSION = 'static-curriculum-a1-map-v1';

export const CURRICULUM_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
export const CURRICULUM_PILLARS = ['grammar', 'vocabulary', 'reading', 'listening', 'speaking', 'writing'];

function lesson(level, pillar, order, title, options = {}) {
  const id = `${level}-${pillar.toUpperCase()}-${String(order).padStart(3, '0')}`;
  return {
    id,
    level,
    pillar,
    order,
    title,
    estimatedMinutes: options.estimatedMinutes || defaultMinutesByPillar[pillar] || 30,
    prerequisites: options.prerequisites || [],
    packageId: options.packageId || '',
    checkpoint: options.checkpoint || '',
    essential: options.essential !== false,
    status: options.status || 'planned',
  };
}

const defaultMinutesByPillar = {
  grammar: 35,
  vocabulary: 25,
  reading: 30,
  listening: 30,
  speaking: 25,
  writing: 35,
};

const a1Packages = {
  foundations: 'A1.1 Foundations',
  familyDescription: 'A1.2 Family, objects and description',
  routinePresent: 'A1.3 Routine and Present Simple',
  practicalSituations: 'A1.4 Practical situations',
  reviewsCheckpoints: 'A1.5 Reviews and checkpoints',
};

const A1_GRAMMAR = [
  'Subject pronouns',
  'Verb to be — affirmative',
  'Verb to be — negative',
  'Verb to be — questions',
  'Short answers with to be',
  'Possessive adjectives: my, your, his, her',
  'Articles: a / an',
  'Plural nouns',
  'This / that / these / those',
  'There is / there are',
  'Have / has',
  'Simple adjectives',
  'Basic word order',
  'Present Simple — I / you / we / they',
  'Present Simple — he / she / it',
  'Present Simple negatives',
  'Present Simple questions',
  'Adverbs of frequency',
  'Prepositions of place',
  'Prepositions of time',
  'Can / can’t',
  'Imperatives',
  'Object pronouns',
  'Basic conjunctions: and, but, because',
  'Review Grammar A1 part 1',
  'Review Grammar A1 part 2',
  'Grammar Checkpoint A1',
];

const A1_VOCABULARY = [
  'Greetings',
  'Personal information',
  'Numbers 0–100',
  'Countries and nationalities',
  'Family',
  'Jobs',
  'Classroom objects',
  'Common adjectives',
  'Colors',
  'Days and months',
  'Time',
  'Daily routine verbs',
  'Food and drinks',
  'Places in town',
  'House and furniture',
  'Clothes',
  'Weather',
  'Basic feelings',
  'Common verbs',
  'Review Vocabulary A1',
];

const A1_READING = [
  'Short introductions',
  'A simple profile',
  'A family description',
  'A classroom text',
  'A daily routine',
  'A simple message',
  'A short email',
  'A café menu',
  'A timetable',
  'A description of a house',
  'A simple work profile',
  'A weekend plan',
  'Reading for names and numbers',
  'Reading for places',
  'Reading for routine actions',
  'Main idea in short texts',
  'Details in short texts',
  'Vocabulary from context',
  'Reading Review A1',
  'Reading Checkpoint A1',
];

const A1_LISTENING = [
  'Greetings and names',
  'Spelling names',
  'Numbers and phone numbers',
  'Countries and cities',
  'Classroom instructions',
  'Family introductions',
  'Daily routine',
  'Time and schedules',
  'Ordering food',
  'Asking where something is',
  'Simple directions',
  'Weather and feelings',
  'Short conversations',
  'Listening for names',
  'Listening for numbers',
  'Listening for places',
  'Listening Review A1',
  'Listening Checkpoint A1',
];

const A1_SPEAKING = [
  'Say hello and goodbye',
  'Introduce yourself',
  'Spell your name',
  'Say your country and city',
  'Talk about your family',
  'Talk about your job/study',
  'Describe yourself',
  'Say what you like',
  'Ask simple questions',
  'Answer simple questions',
  'Talk about your routine',
  'Talk about time',
  'Order something simple',
  'Ask where something is',
  'Describe your room',
  'Speak for 30 seconds about yourself',
  'Speaking Review A1',
  'Speaking Checkpoint A1',
];

const A1_WRITING = [
  'Write simple sentences',
  'Write your name and country',
  'Write a personal introduction',
  'Write about your family',
  'Write about your job/studies',
  'Write about your routine',
  'Write about likes and dislikes',
  'Write a simple message',
  'Write a short email',
  'Write about your house',
  'Write about your weekend',
  'Write questions and answers',
  'Fix punctuation and capitalization',
  'Connect sentences with and / but / because',
  'Writing Review A1',
  'Writing Checkpoint A1',
];

function packageForA1(pillar, order) {
  if (pillar === 'grammar') {
    if (order <= 6) return a1Packages.foundations;
    if (order <= 13) return a1Packages.familyDescription;
    if (order <= 20) return a1Packages.routinePresent;
    if (order <= 24) return a1Packages.practicalSituations;
    return a1Packages.reviewsCheckpoints;
  }
  if (pillar === 'vocabulary') {
    if (order <= 5) return a1Packages.foundations;
    if (order <= 10) return a1Packages.familyDescription;
    if (order <= 14) return a1Packages.routinePresent;
    if (order <= 19) return a1Packages.practicalSituations;
    return a1Packages.reviewsCheckpoints;
  }
  if (pillar === 'reading') {
    if (order <= 3) return a1Packages.foundations;
    if (order <= 7) return a1Packages.familyDescription;
    if (order <= 12) return a1Packages.routinePresent;
    if (order <= 18) return a1Packages.practicalSituations;
    return a1Packages.reviewsCheckpoints;
  }
  if (pillar === 'listening') {
    if (order <= 4) return a1Packages.foundations;
    if (order <= 7) return a1Packages.familyDescription;
    if (order <= 11) return a1Packages.routinePresent;
    if (order <= 16) return a1Packages.practicalSituations;
    return a1Packages.reviewsCheckpoints;
  }
  if (pillar === 'speaking') {
    if (order <= 4) return a1Packages.foundations;
    if (order <= 8) return a1Packages.familyDescription;
    if (order <= 12) return a1Packages.routinePresent;
    if (order <= 16) return a1Packages.practicalSituations;
    return a1Packages.reviewsCheckpoints;
  }
  if (pillar === 'writing') {
    if (order <= 3) return a1Packages.foundations;
    if (order <= 6) return a1Packages.familyDescription;
    if (order <= 10) return a1Packages.routinePresent;
    if (order <= 14) return a1Packages.practicalSituations;
    return a1Packages.reviewsCheckpoints;
  }
  return a1Packages.foundations;
}

function makePillarLessons(level, pillar, titles) {
  return titles.map((title, index) => {
    const order = index + 1;
    const previousId = order > 1 ? `${level}-${pillar.toUpperCase()}-${String(order - 1).padStart(3, '0')}` : '';
    const isCheckpoint = /checkpoint|simulado|final/i.test(title);
    return lesson(level, pillar, order, title, {
      prerequisites: previousId ? [previousId] : [],
      packageId: level === 'A1' ? packageForA1(pillar, order) : '',
      checkpoint: isCheckpoint ? `${pillar}-checkpoint` : '',
      status: 'planned',
    });
  });
}

export const STATIC_CURRICULUM = {
  version: STATIC_CURRICULUM_VERSION,
  levels: {
    A1: {
      level: 'A1',
      title: 'A1 — Foundations',
      description: 'Base completa de inglês: identidade, rotina, objetos, lugares, sobrevivência e produção simples.',
      requiredCompletion: 1,
      packages: Object.values(a1Packages),
      pillars: {
        grammar: makePillarLessons('A1', 'grammar', A1_GRAMMAR),
        vocabulary: makePillarLessons('A1', 'vocabulary', A1_VOCABULARY),
        reading: makePillarLessons('A1', 'reading', A1_READING),
        listening: makePillarLessons('A1', 'listening', A1_LISTENING),
        speaking: makePillarLessons('A1', 'speaking', A1_SPEAKING),
        writing: makePillarLessons('A1', 'writing', A1_WRITING),
      },
    },
    A2: { level: 'A2', title: 'A2 — Elementary expansion', description: 'Mapa será implementado depois do A1 funcional.', requiredCompletion: 1, packages: [], pillars: {} },
    B1: { level: 'B1', title: 'B1 — Independent foundation', description: 'Mapa será implementado depois do A2.', requiredCompletion: 1, packages: [], pillars: {} },
    B2: { level: 'B2', title: 'B2 — Upper intermediate', description: 'Mapa será implementado depois do B1.', requiredCompletion: 1, packages: [], pillars: {} },
    C1: { level: 'C1', title: 'C1 — Advanced control', description: 'Mapa será implementado depois do B2.', requiredCompletion: 1, packages: [], pillars: {} },
    C2: { level: 'C2', title: 'C2 — Mastery', description: 'Mapa será implementado depois do C1.', requiredCompletion: 1, packages: [], pillars: {} },
  },
};

export function getStaticCurriculum() {
  return STATIC_CURRICULUM;
}

export function getStaticLevel(level = 'A1') {
  return STATIC_CURRICULUM.levels[level] || STATIC_CURRICULUM.levels.A1;
}

export function getStaticLessons(level = 'A1') {
  const currentLevel = getStaticLevel(level);
  return CURRICULUM_PILLARS.flatMap((pillar) => currentLevel.pillars?.[pillar] || []);
}

export function findStaticLesson(lessonId) {
  return CURRICULUM_LEVELS.flatMap((level) => getStaticLessons(level)).find((item) => item.id === lessonId) || null;
}
