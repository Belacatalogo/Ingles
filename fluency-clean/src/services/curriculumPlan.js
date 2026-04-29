import { storage } from './storage.js';

const CURRICULUM_PROGRESS_KEY = 'curriculum.progress.v1';

export const CURRICULUM_LEVELS = [
  {
    level: 'A1',
    title: 'Fundação absoluta',
    requiredCompletion: 0.92,
    units: [
      {
        id: 'a1-start',
        title: 'Primeiros contatos',
        lessons: [
          ['a1-001', 'reading', 'Cumprimentos, nomes e apresentações simples', ['alphabet', 'to be basic']],
          ['a1-002', 'grammar', 'Verb to be: I am, you are, he/she is', ['a1-001']],
          ['a1-003', 'listening', 'Entendendo apresentações lentas', ['a1-002']],
          ['a1-004', 'writing', 'Escrevendo uma apresentação pessoal curta', ['a1-002']],
          ['a1-005', 'grammar', 'Pronomes pessoais e possessivos básicos', ['a1-004']],
          ['a1-006', 'reading', 'Perfil pessoal: país, idade, profissão e cidade', ['a1-005']],
        ],
      },
      {
        id: 'a1-routine',
        title: 'Rotina e presente simples',
        lessons: [
          ['a1-007', 'grammar', 'Simple Present afirmativo para rotina', ['a1-006']],
          ['a1-008', 'reading', 'Daily routine com horários simples', ['a1-007']],
          ['a1-009', 'grammar', 'Do/does em perguntas e negativas', ['a1-008']],
          ['a1-010', 'listening', 'Rotina de manhã e à noite', ['a1-009']],
          ['a1-011', 'writing', 'Minha rotina em 6 frases', ['a1-010']],
          ['a1-012', 'grammar', 'Advérbios de frequência: always, usually, sometimes', ['a1-011']],
          ['a1-013', 'reading', 'Hábitos de estudo e trabalho', ['a1-012']],
          ['a1-014', 'writing', 'Parágrafo curto sobre hábitos', ['a1-013']],
        ],
      },
      {
        id: 'a1-survival',
        title: 'Sobrevivência em inglês',
        lessons: [
          ['a1-015', 'grammar', 'There is / there are', ['a1-014']],
          ['a1-016', 'reading', 'Casa, quarto e objetos pessoais', ['a1-015']],
          ['a1-017', 'listening', 'Pedindo café e comida simples', ['a1-016']],
          ['a1-018', 'grammar', 'Can/can’t para habilidade e pedidos', ['a1-017']],
          ['a1-019', 'writing', 'Pedidos educados com can/could', ['a1-018']],
          ['a1-020', 'reading', 'Direções simples na cidade', ['a1-019']],
          ['a1-021', 'grammar', 'Preposições de lugar: in, on, under, next to', ['a1-020']],
          ['a1-022', 'listening', 'Encontrando lugares na rua', ['a1-021']],
        ],
      },
      {
        id: 'a1-review',
        title: 'Consolidação A1',
        lessons: [
          ['a1-023', 'reading', 'Revisão integrada: pessoa, rotina e lugares', ['a1-022']],
          ['a1-024', 'grammar', 'Revisão: to be, simple present e there is/are', ['a1-023']],
          ['a1-025', 'writing', 'Texto final A1: quem sou e minha rotina', ['a1-024']],
          ['a1-026', 'listening', 'Simulado A1 com fala lenta e natural', ['a1-025']],
        ],
      },
    ],
  },
  {
    level: 'A2',
    title: 'Expansão essencial',
    requiredCompletion: 0.92,
    units: [
      {
        id: 'a2-past',
        title: 'Passado e experiências simples',
        lessons: [
          ['a2-001', 'grammar', 'Simple Past com verbos regulares', ['A1 complete']],
          ['a2-002', 'reading', 'Yesterday and last weekend', ['a2-001']],
          ['a2-003', 'grammar', 'Simple Past com verbos irregulares comuns', ['a2-002']],
          ['a2-004', 'listening', 'Conversas sobre fim de semana', ['a2-003']],
          ['a2-005', 'writing', 'Meu último fim de semana', ['a2-004']],
          ['a2-006', 'grammar', 'Past questions: did you...?', ['a2-005']],
        ],
      },
      {
        id: 'a2-future',
        title: 'Planos e futuro',
        lessons: [
          ['a2-007', 'grammar', 'Going to para planos', ['a2-006']],
          ['a2-008', 'reading', 'Planos de estudo e viagem', ['a2-007']],
          ['a2-009', 'grammar', 'Will para decisões e previsões simples', ['a2-008']],
          ['a2-010', 'listening', 'Marcando compromissos', ['a2-009']],
          ['a2-011', 'writing', 'Meu plano para a próxima semana', ['a2-010']],
        ],
      },
      {
        id: 'a2-comparison',
        title: 'Descrição e comparação',
        lessons: [
          ['a2-012', 'grammar', 'Comparativos: bigger, more interesting', ['a2-011']],
          ['a2-013', 'reading', 'Comparando cidades e estilos de vida', ['a2-012']],
          ['a2-014', 'grammar', 'Superlativos básicos', ['a2-013']],
          ['a2-015', 'writing', 'Comparando duas opções', ['a2-014']],
          ['a2-016', 'listening', 'Escolhendo produtos e lugares', ['a2-015']],
        ],
      },
      {
        id: 'a2-review',
        title: 'Consolidação A2',
        lessons: [
          ['a2-017', 'reading', 'Revisão integrada A2', ['a2-016']],
          ['a2-018', 'grammar', 'Revisão: past, future e comparison', ['a2-017']],
          ['a2-019', 'writing', 'Texto final A2: passado, presente e planos', ['a2-018']],
          ['a2-020', 'listening', 'Simulado A2', ['a2-019']],
        ],
      },
    ],
  },
  {
    level: 'B1',
    title: 'Independência controlada',
    requiredCompletion: 0.9,
    units: [
      {
        id: 'b1-perfect',
        title: 'Experiências e continuidade',
        lessons: [
          ['b1-001', 'grammar', 'Present Perfect: experiências', ['A2 complete']],
          ['b1-002', 'reading', 'Life experiences and achievements', ['b1-001']],
          ['b1-003', 'grammar', 'For/since e present perfect continuous', ['b1-002']],
          ['b1-004', 'listening', 'Histórias de aprendizado', ['b1-003']],
          ['b1-005', 'writing', 'Minha experiência aprendendo inglês', ['b1-004']],
        ],
      },
      {
        id: 'b1-narrative',
        title: 'Narrativa e opinião',
        lessons: [
          ['b1-006', 'grammar', 'Past continuous vs simple past', ['b1-005']],
          ['b1-007', 'reading', 'Narrativas curtas com interrupções', ['b1-006']],
          ['b1-008', 'grammar', 'Modals: should, must, have to', ['b1-007']],
          ['b1-009', 'writing', 'Opinião com justificativa', ['b1-008']],
          ['b1-010', 'listening', 'Conselhos e decisões', ['b1-009']],
        ],
      },
      {
        id: 'b1-review',
        title: 'Consolidação B1',
        lessons: [
          ['b1-011', 'reading', 'Texto B1 com opinião e experiência', ['b1-010']],
          ['b1-012', 'grammar', 'Revisão B1 essencial', ['b1-011']],
          ['b1-013', 'writing', 'Texto argumentativo curto B1', ['b1-012']],
          ['b1-014', 'listening', 'Simulado B1', ['b1-013']],
        ],
      },
    ],
  },
  {
    level: 'B2',
    title: 'Fluência intermediária alta',
    requiredCompletion: 0.88,
    units: [
      {
        id: 'b2-complexity',
        title: 'Complexidade e precisão',
        lessons: [
          ['b2-001', 'grammar', 'Conditionals 0, 1 and 2', ['B1 complete']],
          ['b2-002', 'reading', 'Debates sobre tecnologia e hábitos', ['b2-001']],
          ['b2-003', 'grammar', 'Passive voice em contextos reais', ['b2-002']],
          ['b2-004', 'writing', 'Argumentação com contraste', ['b2-003']],
          ['b2-005', 'listening', 'Entrevistas e opiniões longas', ['b2-004']],
        ],
      },
      {
        id: 'b2-review',
        title: 'Consolidação B2',
        lessons: [
          ['b2-006', 'grammar', 'Reported speech essencial', ['b2-005']],
          ['b2-007', 'reading', 'Artigo B2 com inferência', ['b2-006']],
          ['b2-008', 'writing', 'Essay B2 estruturado', ['b2-007']],
          ['b2-009', 'listening', 'Simulado B2', ['b2-008']],
        ],
      },
    ],
  },
  {
    level: 'C1',
    title: 'Avançado funcional',
    requiredCompletion: 0.86,
    units: [
      {
        id: 'c1-academic',
        title: 'Precisão avançada',
        lessons: [
          ['c1-001', 'grammar', 'Advanced clauses and emphasis', ['B2 complete']],
          ['c1-002', 'reading', 'Artigos longos com nuance', ['c1-001']],
          ['c1-003', 'writing', 'Argumentação sofisticada', ['c1-002']],
          ['c1-004', 'listening', 'Palestras e entrevistas densas', ['c1-003']],
        ],
      },
    ],
  },
  {
    level: 'C2',
    title: 'Maestria e refinamento',
    requiredCompletion: 0.84,
    units: [
      {
        id: 'c2-mastery',
        title: 'Domínio avançado',
        lessons: [
          ['c2-001', 'reading', 'Leitura crítica avançada', ['C1 complete']],
          ['c2-002', 'grammar', 'Estilo, registro e nuance', ['c2-001']],
          ['c2-003', 'writing', 'Texto avançado com voz autoral', ['c2-002']],
          ['c2-004', 'listening', 'Compreensão natural rápida', ['c2-003']],
        ],
      },
    ],
  },
];

function expandLesson(raw, level, unit, index) {
  const [id, type, title, prerequisites = []] = raw;
  return {
    id,
    type,
    title,
    level,
    unitId: unit.id,
    unitTitle: unit.title,
    order: index + 1,
    prerequisites,
  };
}

export function getCurriculumLessons() {
  const lessons = [];
  for (const level of CURRICULUM_LEVELS) {
    for (const unit of level.units) {
      for (const raw of unit.lessons) {
        lessons.push(expandLesson(raw, level.level, unit, lessons.length));
      }
    }
  }
  return lessons;
}

export function getCurriculumProgress() {
  return storage.get(CURRICULUM_PROGRESS_KEY, { completedIds: [], activeLessonId: '' });
}

export function saveCurriculumProgress(progress) {
  const completedIds = Array.from(new Set(progress?.completedIds || []));
  const activeLessonId = progress?.activeLessonId || '';
  const next = { completedIds, activeLessonId };
  storage.set(CURRICULUM_PROGRESS_KEY, next);
  return next;
}

export function markCurriculumLessonComplete(lesson) {
  const progress = getCurriculumProgress();
  const curriculumId = lesson?.curriculumId || lesson?.raw?.curriculumId || lesson?.id;
  if (!curriculumId) return progress;
  return saveCurriculumProgress({
    ...progress,
    completedIds: [...progress.completedIds, curriculumId],
    activeLessonId: '',
  });
}

export function getNextCurriculumLesson() {
  const progress = getCurriculumProgress();
  const lessons = getCurriculumLessons();
  const completed = new Set(progress.completedIds || []);
  const active = lessons.find((lesson) => lesson.id === progress.activeLessonId && !completed.has(lesson.id));
  if (active) return active;
  return lessons.find((lesson) => !completed.has(lesson.id)) || lessons[lessons.length - 1];
}

export function setActiveCurriculumLesson(lessonId) {
  const progress = getCurriculumProgress();
  return saveCurriculumProgress({ ...progress, activeLessonId: lessonId });
}

export function getCurriculumSummary() {
  const lessons = getCurriculumLessons();
  const progress = getCurriculumProgress();
  const completed = new Set(progress.completedIds || []);
  const nextLesson = getNextCurriculumLesson();
  const currentLevel = nextLesson?.level || 'A1';
  const levelLessons = lessons.filter((lesson) => lesson.level === currentLevel);
  const completedInLevel = levelLessons.filter((lesson) => completed.has(lesson.id)).length;
  const levelTotal = levelLessons.length || 1;
  return {
    currentLevel,
    nextLesson,
    totalLessons: lessons.length,
    completedTotal: completed.size,
    levelTotal,
    completedInLevel,
    levelProgress: Math.round((completedInLevel / levelTotal) * 100),
  };
}

export function buildCurriculumPrompt(lesson) {
  return [
    `Gere a próxima aula obrigatória do cronograma Fluency.`,
    `ID da aula: ${lesson.id}.`,
    `Tipo: ${lesson.type}.`,
    `Nível: ${lesson.level}.`,
    `Unidade: ${lesson.unitTitle}.`,
    `Tema obrigatório: ${lesson.title}.`,
    `Pré-requisitos já estudados: ${lesson.prerequisites.join(', ') || 'nenhum'}.`,
    '',
    'Regras pedagógicas obrigatórias:',
    '- Não use conteúdo gramatical que ainda não apareceu nos pré-requisitos.',
    '- Não avance de nível.',
    '- A aula deve ser longa, profunda e guiada.',
    '- Explique em português quando necessário, mas exemplos e prática devem estar em inglês adequado ao nível.',
    '- Inclua muitas perguntas, prática ativa e produção final.',
    '- Retorne conteúdo compatível com o tipo da aula.',
  ].join('\n');
}
