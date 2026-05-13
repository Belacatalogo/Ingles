import { A1_PACKAGES, A1_PILLAR_MAPS, A1_EXIT_CRITERIA, getA1TotalLessonCount } from './a1Map.js';
import { A2_PACKAGES, A2_PILLAR_MAPS, A2_EXIT_CRITERIA, getA2TotalLessonCount } from './a2Map.js';
import { findStaticReadyLesson, getStaticReadyLessons } from './staticLessonContent.js';

export const STATIC_CURRICULUM_VERSION = 'static-curriculum-a2-map-v1';

export const CURRICULUM_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
export const CURRICULUM_PILLARS = ['grammar', 'vocabulary', 'reading', 'listening', 'speaking', 'writing'];

const defaultMinutesByPillar = { grammar: 35, vocabulary: 25, reading: 30, listening: 30, speaking: 25, writing: 35 };
const packageMapByLevel = { A1: A1_PACKAGES, A2: A2_PACKAGES };
const pillarMapByLevel = { A1: A1_PILLAR_MAPS, A2: A2_PILLAR_MAPS };

function lesson(level, pillar, order, mapItem, options = {}) {
  const id = `${level}-${pillar.toUpperCase()}-${String(order).padStart(3, '0')}`;
  const previousId = order > 1 ? `${level}-${pillar.toUpperCase()}-${String(order - 1).padStart(3, '0')}` : '';
  const packages = packageMapByLevel[level] || {};
  const base = {
    id,
    level,
    pillar,
    order,
    title: mapItem.title,
    objective: mapItem.objective || '',
    tags: mapItem.tags || [],
    mastery: mapItem.mastery || [],
    estimatedMinutes: options.estimatedMinutes || mapItem.estimatedMinutes || defaultMinutesByPillar[pillar] || 30,
    prerequisites: previousId ? [previousId] : [],
    packageId: packages[mapItem.packageKey]?.title || '',
    packageKey: mapItem.packageKey || '',
    checkpoint: mapItem.checkpoint || '',
    essential: options.essential !== false,
    status: options.status || 'planned',
  };
  const ready = findStaticReadyLesson(id);
  return ready ? { ...base, ...ready, packageId: base.packageId, packageKey: base.packageKey, checkpoint: base.checkpoint || ready.checkpoint || '', status: 'ready' } : base;
}

function makePillarLessons(level, pillar, mapItems = []) {
  return mapItems.map((mapItem, index) => lesson(level, pillar, index + 1, mapItem));
}

function makeLevelPillars(level) {
  const maps = pillarMapByLevel[level] || {};
  return Object.fromEntries(CURRICULUM_PILLARS.map((pillar) => [pillar, makePillarLessons(level, pillar, maps[pillar] || [])]));
}

export const STATIC_CURRICULUM = {
  version: STATIC_CURRICULUM_VERSION,
  levels: {
    A1: {
      level: 'A1',
      title: 'A1 — Foundations',
      description: 'Base completa de inglês: identidade, rotina, objetos, lugares, sobrevivência e produção simples.',
      requiredCompletion: 1,
      exitCriteria: A1_EXIT_CRITERIA,
      plannedLessonCount: getA1TotalLessonCount(),
      readyLessonCount: getStaticReadyLessons('A1').length,
      packages: Object.values(A1_PACKAGES).map((item) => item.title),
      packageDetails: A1_PACKAGES,
      pillars: makeLevelPillars('A1'),
    },
    A2: {
      level: 'A2',
      title: 'A2 — Elementary expansion',
      description: 'Expansão funcional: passado simples, presente contínuo, planos, quantidades, comparações, pedidos, convites e situações cotidianas.',
      requiredCompletion: 1,
      exitCriteria: A2_EXIT_CRITERIA,
      plannedLessonCount: getA2TotalLessonCount(),
      readyLessonCount: getStaticReadyLessons('A2').length,
      packages: Object.values(A2_PACKAGES).map((item) => item.title),
      packageDetails: A2_PACKAGES,
      pillars: makeLevelPillars('A2'),
    },
    B1: { level: 'B1', title: 'B1 — Independent foundation', description: 'Mapa será implementado depois do A2.', requiredCompletion: 1, packages: [], pillars: {} },
    B2: { level: 'B2', title: 'B2 — Upper intermediate', description: 'Mapa será implementado depois do B1.', requiredCompletion: 1, packages: [], pillars: {} },
    C1: { level: 'C1', title: 'C1 — Advanced control', description: 'Mapa será implementado depois do B2.', requiredCompletion: 1, packages: [], pillars: {} },
    C2: { level: 'C2', title: 'C2 — Mastery', description: 'Mapa será implementado depois do C1.', requiredCompletion: 1, packages: [], pillars: {} },
  },
};

export function getStaticCurriculum() { return STATIC_CURRICULUM; }
export function getStaticLevel(level = 'A1') { return STATIC_CURRICULUM.levels[level] || STATIC_CURRICULUM.levels.A1; }
export function getStaticLessons(level = 'A1') { const currentLevel = getStaticLevel(level); return CURRICULUM_PILLARS.flatMap((pillar) => currentLevel.pillars?.[pillar] || []); }
export function findStaticLesson(lessonId) { return CURRICULUM_LEVELS.flatMap((level) => getStaticLessons(level)).find((item) => item.id === lessonId) || null; }
