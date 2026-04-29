import { storage } from './storage.js';

const CURRICULUM_PROGRESS_KEY = 'curriculum.progress.v1';

const LEVEL_LOCKS = {
  A1: '',
  A2: 'Concluir consolidação A1 e simulado A1.',
  B1: 'Concluir consolidação A2 e simulado A2.',
  B2: 'Concluir consolidação B1 e simulado B1.',
  C1: 'Concluir consolidação B2 e simulado B2.',
  C2: 'Concluir consolidação C1 e produção avançada.',
};

function l(id, type, title, prerequisites = [], category = 'core', checkpoint = '') {
  return { id, type, title, prerequisites, category, checkpoint };
}

export const CURRICULUM_LEVELS = [
  {
    level: 'A1',
    title: 'Fundação absoluta',
    requiredCompletion: 0.96,
    unlockRule: 'A1 começa aberto, mas A2 só libera após revisões e simulado A1.',
    units: [
      {
        id: 'a1-foundation',
        title: 'Fundamentos: som, frase e identidade',
        goal: 'Criar base segura antes de qualquer rotina ou texto maior.',
        lessons: [
          l('a1-001', 'reading', 'Cumprimentos, nomes e apresentações simples', ['alfabeto', 'sons básicos'], 'fundamentos'),
          l('a1-002', 'grammar', 'Verb to be: I am, you are, he/she is', ['a1-001'], 'gramática essencial'),
          l('a1-003', 'listening', 'Entendendo apresentações lentas', ['a1-002'], 'listening'),
          l('a1-004', 'writing', 'Escrevendo uma apresentação pessoal curta', ['a1-002', 'a1-003'], 'writing'),
          l('a1-005', 'grammar', 'Pronomes pessoais e possessivos básicos', ['a1-004'], 'gramática essencial'),
          l('a1-006', 'reading', 'Perfil pessoal: país, idade, profissão e cidade', ['a1-005'], 'leitura'),
          l('a1-007', 'writing', 'Formulário simples: nome, país, telefone e e-mail', ['a1-006'], 'writing'),
          l('a1-008', 'listening', 'Soletrando nomes e ouvindo números', ['a1-007'], 'listening'),
        ],
      },
      {
        id: 'a1-routine',
        title: 'Rotina: presente simples sem atropelar',
        goal: 'Dominar frase básica antes de perguntas e negativas.',
        lessons: [
          l('a1-009', 'grammar', 'Simple Present afirmativo para rotina', ['a1-008'], 'gramática essencial'),
          l('a1-010', 'reading', 'Daily routine com horários simples', ['a1-009'], 'leitura'),
          l('a1-011', 'grammar', 'Do/does em perguntas simples', ['a1-010'], 'gramática essencial'),
          l('a1-012', 'grammar', 'Do/does em negativas sem confusão', ['a1-011'], 'gramática essencial'),
          l('a1-013', 'listening', 'Rotina de manhã e à noite', ['a1-012'], 'listening'),
          l('a1-014', 'writing', 'Minha rotina em 8 frases', ['a1-013'], 'writing'),
          l('a1-015', 'grammar', 'Advérbios de frequência: always, usually, sometimes', ['a1-014'], 'gramática essencial'),
          l('a1-016', 'reading', 'Hábitos de estudo e trabalho', ['a1-015'], 'leitura'),
          l('a1-017', 'writing', 'Parágrafo curto sobre hábitos', ['a1-016'], 'writing'),
        ],
      },
      {
        id: 'a1-survival',
        title: 'Sobrevivência: casa, cidade, pedidos e direção',
        goal: 'Usar inglês prático sem sair do A1.',
        lessons: [
          l('a1-018', 'grammar', 'There is / there are', ['a1-017'], 'gramática essencial'),
          l('a1-019', 'reading', 'Casa, quarto e objetos pessoais', ['a1-018'], 'leitura'),
          l('a1-020', 'grammar', 'Preposições de lugar: in, on, under, next to', ['a1-019'], 'gramática essencial'),
          l('a1-021', 'listening', 'Encontrando objetos e lugares', ['a1-020'], 'listening'),
          l('a1-022', 'grammar', 'Can/can’t para habilidade e pedidos', ['a1-021'], 'gramática essencial'),
          l('a1-023', 'reading', 'Pedindo café e comida simples', ['a1-022'], 'leitura'),
          l('a1-024', 'writing', 'Pedidos educados com can/could', ['a1-023'], 'writing'),
          l('a1-025', 'listening', 'Compras, café e frases de sobrevivência', ['a1-024'], 'listening'),
          l('a1-026', 'reading', 'Direções simples na cidade', ['a1-025'], 'leitura'),
        ],
      },
      {
        id: 'a1-integration',
        title: 'Integração A1: revisar antes de avançar',
        goal: 'Consolidar tudo do A1 antes de liberar A2.',
        lessons: [
          l('a1-027', 'grammar', 'Revisão guiada 1: to be, pronomes e possessivos', ['a1-026'], 'revisão', 'mid-review'),
          l('a1-028', 'reading', 'Revisão integrada: pessoa, rotina e lugares', ['a1-027'], 'revisão', 'mid-review'),
          l('a1-029', 'grammar', 'Revisão guiada 2: simple present, there is/are e can', ['a1-028'], 'revisão', 'final-review'),
          l('a1-030', 'writing', 'Produção final A1: quem sou, minha rotina e minha cidade', ['a1-029'], 'produção final', 'final-production'),
          l('a1-031', 'listening', 'Simulado A1: fala lenta e natural', ['a1-030'], 'simulado', 'level-assessment'),
          l('a1-032', 'reading', 'Simulado A1: leitura e compreensão geral', ['a1-031'], 'simulado', 'level-assessment'),
        ],
      },
    ],
  },
  {
    level: 'A2',
    title: 'Expansão essencial',
    requiredCompletion: 0.94,
    unlockRule: LEVEL_LOCKS.A2,
    units: [
      {
        id: 'a2-past',
        title: 'Passado: contar o que aconteceu',
        goal: 'Narrar experiências simples com segurança.',
        lessons: [
          l('a2-001', 'grammar', 'Simple Past com verbos regulares', ['A1 consolidado', 'a1-032'], 'gramática essencial'),
          l('a2-002', 'reading', 'Yesterday and last weekend', ['a2-001'], 'leitura'),
          l('a2-003', 'grammar', 'Simple Past com verbos irregulares comuns', ['a2-002'], 'gramática essencial'),
          l('a2-004', 'listening', 'Conversas sobre fim de semana', ['a2-003'], 'listening'),
          l('a2-005', 'writing', 'Meu último fim de semana', ['a2-004'], 'writing'),
          l('a2-006', 'grammar', 'Past questions: did you...?', ['a2-005'], 'gramática essencial'),
          l('a2-007', 'reading', 'Histórias curtas no passado', ['a2-006'], 'leitura'),
          l('a2-008', 'writing', 'Uma história curta com começo, meio e fim', ['a2-007'], 'writing'),
        ],
      },
      {
        id: 'a2-future',
        title: 'Futuro: planos, compromissos e escolhas',
        goal: 'Falar de planos sem misturar estruturas.',
        lessons: [
          l('a2-009', 'grammar', 'Going to para planos', ['a2-008'], 'gramática essencial'),
          l('a2-010', 'reading', 'Planos de estudo e viagem', ['a2-009'], 'leitura'),
          l('a2-011', 'grammar', 'Will para decisões e previsões simples', ['a2-010'], 'gramática essencial'),
          l('a2-012', 'listening', 'Marcando compromissos', ['a2-011'], 'listening'),
          l('a2-013', 'writing', 'Meu plano para a próxima semana', ['a2-012'], 'writing'),
          l('a2-014', 'grammar', 'Present continuous para futuro combinado', ['a2-013'], 'gramática essencial'),
        ],
      },
      {
        id: 'a2-description',
        title: 'Descrição: comparação, quantidade e preferência',
        goal: 'Descrever escolhas, lugares e pessoas com mais detalhe.',
        lessons: [
          l('a2-015', 'grammar', 'Comparativos: bigger, easier, more interesting', ['a2-014'], 'gramática essencial'),
          l('a2-016', 'reading', 'Comparando cidades e estilos de vida', ['a2-015'], 'leitura'),
          l('a2-017', 'grammar', 'Superlativos básicos', ['a2-016'], 'gramática essencial'),
          l('a2-018', 'writing', 'Comparando duas opções', ['a2-017'], 'writing'),
          l('a2-019', 'listening', 'Escolhendo produtos e lugares', ['a2-018'], 'listening'),
          l('a2-020', 'grammar', 'Countable/uncountable: some, any, much, many', ['a2-019'], 'gramática essencial'),
          l('a2-021', 'reading', 'Compras, comida e quantidades', ['a2-020'], 'leitura'),
        ],
      },
      {
        id: 'a2-integration',
        title: 'Consolidação A2',
        goal: 'Revisar passado, futuro e comparação antes de B1.',
        lessons: [
          l('a2-022', 'grammar', 'Revisão guiada A2: past, future e comparison', ['a2-021'], 'revisão', 'mid-review'),
          l('a2-023', 'reading', 'Revisão integrada A2', ['a2-022'], 'revisão', 'final-review'),
          l('a2-024', 'writing', 'Texto final A2: passado, presente e planos', ['a2-023'], 'produção final', 'final-production'),
          l('a2-025', 'listening', 'Simulado A2: diálogos do dia a dia', ['a2-024'], 'simulado', 'level-assessment'),
          l('a2-026', 'reading', 'Simulado A2: leitura com detalhes', ['a2-025'], 'simulado', 'level-assessment'),
        ],
      },
    ],
  },
  {
    level: 'B1',
    title: 'Independência controlada',
    requiredCompletion: 0.92,
    unlockRule: LEVEL_LOCKS.B1,
    units: [
      {
        id: 'b1-perfect',
        title: 'Experiências, continuidade e resultados',
        goal: 'Falar de experiências com naturalidade intermediária.',
        lessons: [
          l('b1-001', 'grammar', 'Present Perfect: experiências', ['A2 consolidado', 'a2-026'], 'gramática essencial'),
          l('b1-002', 'reading', 'Life experiences and achievements', ['b1-001'], 'leitura'),
          l('b1-003', 'grammar', 'Present Perfect com already, yet e just', ['b1-002'], 'gramática essencial'),
          l('b1-004', 'listening', 'Histórias de aprendizado', ['b1-003'], 'listening'),
          l('b1-005', 'writing', 'Minha experiência aprendendo inglês', ['b1-004'], 'writing'),
          l('b1-006', 'grammar', 'For/since e present perfect continuous', ['b1-005'], 'gramática essencial'),
        ],
      },
      {
        id: 'b1-narrative',
        title: 'Narrativa, opinião e conselho',
        goal: 'Contar histórias e defender opiniões curtas.',
        lessons: [
          l('b1-007', 'grammar', 'Past continuous vs simple past', ['b1-006'], 'gramática essencial'),
          l('b1-008', 'reading', 'Narrativas curtas com interrupções', ['b1-007'], 'leitura'),
          l('b1-009', 'grammar', 'Modals: should, must, have to', ['b1-008'], 'gramática essencial'),
          l('b1-010', 'listening', 'Conselhos e decisões', ['b1-009'], 'listening'),
          l('b1-011', 'writing', 'Opinião com justificativa', ['b1-010'], 'writing'),
          l('b1-012', 'grammar', 'First conditional para consequências reais', ['b1-011'], 'gramática essencial'),
          l('b1-013', 'reading', 'Problemas, escolhas e consequências', ['b1-012'], 'leitura'),
        ],
      },
      {
        id: 'b1-integration',
        title: 'Consolidação B1',
        goal: 'Consolidar independência antes de B2.',
        lessons: [
          l('b1-014', 'grammar', 'Revisão B1: perfect, modals e conditionals', ['b1-013'], 'revisão', 'mid-review'),
          l('b1-015', 'reading', 'Texto B1 com opinião e experiência', ['b1-014'], 'revisão', 'final-review'),
          l('b1-016', 'writing', 'Texto argumentativo curto B1', ['b1-015'], 'produção final', 'final-production'),
          l('b1-017', 'listening', 'Simulado B1: conversas naturais', ['b1-016'], 'simulado', 'level-assessment'),
          l('b1-018', 'reading', 'Simulado B1: inferência simples', ['b1-017'], 'simulado', 'level-assessment'),
        ],
      },
    ],
  },
  {
    level: 'B2',
    title: 'Fluência intermediária alta',
    requiredCompletion: 0.9,
    unlockRule: LEVEL_LOCKS.B2,
    units: [
      {
        id: 'b2-complexity',
        title: 'Complexidade, contraste e precisão',
        goal: 'Construir argumentos com estruturas mais complexas.',
        lessons: [
          l('b2-001', 'grammar', 'Conditionals 0, 1 and 2', ['B1 consolidado', 'b1-018'], 'gramática essencial'),
          l('b2-002', 'reading', 'Debates sobre tecnologia e hábitos', ['b2-001'], 'leitura'),
          l('b2-003', 'grammar', 'Passive voice em contextos reais', ['b2-002'], 'gramática essencial'),
          l('b2-004', 'writing', 'Argumentação com contraste', ['b2-003'], 'writing'),
          l('b2-005', 'listening', 'Entrevistas e opiniões longas', ['b2-004'], 'listening'),
          l('b2-006', 'grammar', 'Reported speech essencial', ['b2-005'], 'gramática essencial'),
          l('b2-007', 'reading', 'Artigo B2 com inferência', ['b2-006'], 'leitura'),
          l('b2-008', 'writing', 'Essay B2 estruturado', ['b2-007'], 'writing'),
        ],
      },
      {
        id: 'b2-integration',
        title: 'Consolidação B2',
        goal: 'Testar compreensão profunda antes de C1.',
        lessons: [
          l('b2-009', 'grammar', 'Revisão B2: conditionals, passive e reported speech', ['b2-008'], 'revisão', 'final-review'),
          l('b2-010', 'listening', 'Simulado B2: entrevista e opinião', ['b2-009'], 'simulado', 'level-assessment'),
          l('b2-011', 'reading', 'Simulado B2: inferência e tom', ['b2-010'], 'simulado', 'level-assessment'),
          l('b2-012', 'writing', 'Produção final B2: essay com opinião', ['b2-011'], 'produção final', 'final-production'),
        ],
      },
    ],
  },
  {
    level: 'C1',
    title: 'Avançado funcional',
    requiredCompletion: 0.88,
    unlockRule: LEVEL_LOCKS.C1,
    units: [
      {
        id: 'c1-academic',
        title: 'Precisão avançada, nuance e registro',
        goal: 'Controlar estilo, registro e argumentação sofisticada.',
        lessons: [
          l('c1-001', 'grammar', 'Advanced clauses and emphasis', ['B2 consolidado', 'b2-012'], 'gramática avançada'),
          l('c1-002', 'reading', 'Artigos longos com nuance', ['c1-001'], 'leitura avançada'),
          l('c1-003', 'grammar', 'Inversion and advanced linking', ['c1-002'], 'gramática avançada'),
          l('c1-004', 'writing', 'Argumentação sofisticada', ['c1-003'], 'writing avançado'),
          l('c1-005', 'listening', 'Palestras e entrevistas densas', ['c1-004'], 'listening avançado'),
          l('c1-006', 'reading', 'Análise de tom, viés e intenção', ['c1-005'], 'leitura avançada'),
          l('c1-007', 'writing', 'Produção C1: artigo opinativo refinado', ['c1-006'], 'produção final', 'final-production'),
          l('c1-008', 'listening', 'Simulado C1', ['c1-007'], 'simulado', 'level-assessment'),
        ],
      },
    ],
  },
  {
    level: 'C2',
    title: 'Maestria e refinamento',
    requiredCompletion: 0.86,
    unlockRule: LEVEL_LOCKS.C2,
    units: [
      {
        id: 'c2-mastery',
        title: 'Domínio avançado e voz autoral',
        goal: 'Refinar precisão, naturalidade e leitura crítica.',
        lessons: [
          l('c2-001', 'reading', 'Leitura crítica avançada', ['C1 consolidado', 'c1-008'], 'leitura crítica'),
          l('c2-002', 'grammar', 'Estilo, registro e nuance', ['c2-001'], 'estilo'),
          l('c2-003', 'writing', 'Texto avançado com voz autoral', ['c2-002'], 'writing avançado'),
          l('c2-004', 'listening', 'Compreensão natural rápida', ['c2-003'], 'listening avançado'),
          l('c2-005', 'reading', 'Humor, subtexto e implicatura', ['c2-004'], 'leitura crítica'),
          l('c2-006', 'writing', 'Produção C2: resposta crítica sofisticada', ['c2-005'], 'produção final', 'final-production'),
          l('c2-007', 'listening', 'Simulado C2: fala natural e rápida', ['c2-006'], 'simulado', 'level-assessment'),
        ],
      },
    ],
  },
];

function normalizeRawLesson(raw) {
  if (Array.isArray(raw)) {
    const [id, type, title, prerequisites = []] = raw;
    return { id, type, title, prerequisites, category: 'core', checkpoint: '' };
  }
  return raw;
}

function expandLesson(rawLesson, level, unit, index, levelIndex) {
  const raw = normalizeRawLesson(rawLesson);
  return {
    id: raw.id,
    curriculumId: raw.id,
    type: raw.type,
    title: raw.title,
    level: level.level,
    levelTitle: level.title,
    unitId: unit.id,
    unitTitle: unit.title,
    unitGoal: unit.goal || '',
    order: index + 1,
    levelIndex,
    prerequisites: raw.prerequisites || [],
    category: raw.category || 'core',
    checkpoint: raw.checkpoint || '',
    isReview: raw.category === 'revisão' || String(raw.checkpoint).includes('review'),
    isAssessment: raw.category === 'simulado' || raw.checkpoint === 'level-assessment',
    isFinalProduction: raw.checkpoint === 'final-production',
  };
}

export function getCurriculumLessons() {
  const lessons = [];
  CURRICULUM_LEVELS.forEach((level, levelIndex) => {
    level.units.forEach((unit) => {
      unit.lessons.forEach((raw) => {
        lessons.push(expandLesson(raw, level, unit, lessons.length, levelIndex));
      });
    });
  });
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

function isLevelUnlocked(levelIndex, completed, lessons) {
  if (levelIndex <= 0) return true;
  const previousLevel = CURRICULUM_LEVELS[levelIndex - 1];
  const previousLessons = lessons.filter((lesson) => lesson.level === previousLevel.level);
  const required = Math.ceil(previousLessons.length * previousLevel.requiredCompletion);
  const completedPrevious = previousLessons.filter((lesson) => completed.has(lesson.id)).length;
  const previousAssessments = previousLessons.filter((lesson) => lesson.isAssessment || lesson.isFinalProduction);
  const completedAssessments = previousAssessments.every((lesson) => completed.has(lesson.id));
  return completedPrevious >= required && completedAssessments;
}

export function getNextCurriculumLesson() {
  const progress = getCurriculumProgress();
  const lessons = getCurriculumLessons();
  const completed = new Set(progress.completedIds || []);
  const active = lessons.find((lesson) => lesson.id === progress.activeLessonId && !completed.has(lesson.id));
  if (active && isLevelUnlocked(active.levelIndex, completed, lessons)) return active;
  return lessons.find((lesson) => !completed.has(lesson.id) && isLevelUnlocked(lesson.levelIndex, completed, lessons)) || lessons[lessons.length - 1];
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
  const levelData = CURRICULUM_LEVELS.find((item) => item.level === currentLevel) || CURRICULUM_LEVELS[0];
  const levelLessons = lessons.filter((lesson) => lesson.level === currentLevel);
  const completedInLevel = levelLessons.filter((lesson) => completed.has(lesson.id)).length;
  const levelTotal = levelLessons.length || 1;
  const requiredToUnlock = Math.ceil(levelTotal * levelData.requiredCompletion);
  const remainingToUnlock = Math.max(0, requiredToUnlock - completedInLevel);
  const assessments = levelLessons.filter((lesson) => lesson.isAssessment || lesson.isFinalProduction);
  const pendingAssessments = assessments.filter((lesson) => !completed.has(lesson.id));

  return {
    currentLevel,
    nextLesson,
    totalLessons: lessons.length,
    completedTotal: completed.size,
    levelTotal,
    completedInLevel,
    levelProgress: Math.round((completedInLevel / levelTotal) * 100),
    requiredCompletion: levelData.requiredCompletion,
    requiredToUnlock,
    remainingToUnlock,
    pendingAssessments,
    unlockRule: levelData.unlockRule || '',
  };
}

export function buildCurriculumPrompt(lesson) {
  const prerequisites = (lesson.prerequisites || []).join(', ') || 'nenhum';
  return [
    'Gere a próxima aula obrigatória do cronograma Fluency.',
    `ID da aula: ${lesson.id}.`,
    `Tipo: ${lesson.type}.`,
    `Nível CEFR: ${lesson.level}.`,
    `Unidade: ${lesson.unitTitle}.`,
    `Objetivo da unidade: ${lesson.unitGoal || 'seguir a trilha pedagógica sem pular etapas'}.`,
    `Categoria pedagógica: ${lesson.category || 'core'}.`,
    `Marco/checkpoint: ${lesson.checkpoint || 'aula regular'}.`,
    `Tema obrigatório: ${lesson.title}.`,
    `Pré-requisitos já estudados: ${prerequisites}.`,
    '',
    'Regras pedagógicas obrigatórias:',
    '- Não use conteúdo gramatical que ainda não apareceu nos pré-requisitos.',
    '- Não avance de nível CEFR.',
    '- Não mencione que existem níveis futuros como conteúdo da aula.',
    '- A aula deve ser longa, profunda, guiada e adequada ao nível informado.',
    '- Explique em português quando necessário, mas exemplos e prática devem estar em inglês adequado ao nível.',
    '- Inclua muitas perguntas, prática ativa e produção final.',
    '- Se a categoria for revisão, misture conteúdos anteriores e corrija confusões comuns.',
    '- Se a categoria for simulado, crie uma avaliação guiada sem ensinar conteúdo novo.',
    '- Se for produção final, conduza o aluno a escrever/falar com estrutura, checklist e autocorreção.',
    '- Retorne conteúdo compatível com o tipo da aula.',
  ].join('\n');
}
