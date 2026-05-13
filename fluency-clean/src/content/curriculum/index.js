import { A1_PACKAGES, A1_PILLAR_MAPS, A1_EXIT_CRITERIA, getA1TotalLessonCount } from './a1Map.js';
import { A2_PACKAGES, A2_PILLAR_MAPS, A2_EXIT_CRITERIA, getA2TotalLessonCount } from './a2Map.js';
import {
  B1_PACKAGES,
  B1_PILLAR_MAPS,
  B1_EXIT_CRITERIA,
  B2_PACKAGES,
  B2_PILLAR_MAPS,
  B2_EXIT_CRITERIA,
  C1_PACKAGES,
  C1_PILLAR_MAPS,
  C1_EXIT_CRITERIA,
  C2_PACKAGES,
  C2_PILLAR_MAPS,
  C2_EXIT_CRITERIA,
  getB1TotalLessonCount,
  getB2TotalLessonCount,
  getC1TotalLessonCount,
  getC2TotalLessonCount,
} from './advancedMaps.js';
import { findStaticReadyLesson, getStaticReadyLessons } from './staticLessonContent.js';

export const STATIC_CURRICULUM_VERSION = 'static-curriculum-advanced-maps-v1';

export const CURRICULUM_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
export const CURRICULUM_PILLARS = ['grammar', 'vocabulary', 'reading', 'listening', 'speaking', 'writing'];

const defaultMinutesByPillar = { grammar: 35, vocabulary: 25, reading: 30, listening: 30, speaking: 25, writing: 35 };
const packageMapByLevel = { A1: A1_PACKAGES, A2: A2_PACKAGES, B1: B1_PACKAGES, B2: B2_PACKAGES, C1: C1_PACKAGES, C2: C2_PACKAGES };
const pillarMapByLevel = { A1: A1_PILLAR_MAPS, A2: A2_PILLAR_MAPS, B1: B1_PILLAR_MAPS, B2: B2_PILLAR_MAPS, C1: C1_PILLAR_MAPS, C2: C2_PILLAR_MAPS };

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

function levelEntry({ level, title, description, exitCriteria, totalCount, packages }) {
  return {
    level,
    title,
    description,
    requiredCompletion: 1,
    exitCriteria,
    plannedLessonCount: totalCount,
    readyLessonCount: getStaticReadyLessons(level).length,
    packages: Object.values(packages).map((item) => item.title),
    packageDetails: packages,
    pillars: makeLevelPillars(level),
  };
}

export const STATIC_CURRICULUM = {
  version: STATIC_CURRICULUM_VERSION,
  levels: {
    A1: levelEntry({ level: 'A1', title: 'A1 — Foundations', description: 'Base completa de inglês: identidade, rotina, objetos, lugares, sobrevivência e produção simples.', exitCriteria: A1_EXIT_CRITERIA, totalCount: getA1TotalLessonCount(), packages: A1_PACKAGES }),
    A2: levelEntry({ level: 'A2', title: 'A2 — Elementary expansion', description: 'Expansão funcional: passado simples, presente contínuo, planos, quantidades, comparações, pedidos, convites e situações cotidianas.', exitCriteria: A2_EXIT_CRITERIA, totalCount: getA2TotalLessonCount(), packages: A2_PACKAGES }),
    B1: levelEntry({ level: 'B1', title: 'B1 — Independent foundation', description: 'Autonomia intermediária: experiências, problemas, opiniões, conselhos, serviços e comunicação previsível com mais independência.', exitCriteria: B1_EXIT_CRITERIA, totalCount: getB1TotalLessonCount(), packages: B1_PACKAGES }),
    B2: levelEntry({ level: 'B2', title: 'B2 — Upper intermediate', description: 'Argumentação, precisão, textos longos, comunicação profissional e compreensão de opinião, nuance e estrutura.', exitCriteria: B2_EXIT_CRITERIA, totalCount: getB2TotalLessonCount(), packages: B2_PACKAGES }),
    C1: levelEntry({ level: 'C1', title: 'C1 — Advanced control', description: 'Controle avançado, nuance, estilo, leitura/escuta complexa e produção profissional/acadêmica.', exitCriteria: C1_EXIT_CRITERIA, totalCount: getC1TotalLessonCount(), packages: C1_PACKAGES }),
    C2: levelEntry({ level: 'C2', title: 'C2 — Mastery', description: 'Domínio sofisticado, precisão quase nativa, argumentação avançada, estilo e compreensão profunda.', exitCriteria: C2_EXIT_CRITERIA, totalCount: getC2TotalLessonCount(), packages: C2_PACKAGES }),
  },
};

export function getStaticCurriculum() { return STATIC_CURRICULUM; }
export function getStaticLevel(level = 'A1') { return STATIC_CURRICULUM.levels[level] || STATIC_CURRICULUM.levels.A1; }
export function getStaticLessons(level = 'A1') { const currentLevel = getStaticLevel(level); return CURRICULUM_PILLARS.flatMap((pillar) => currentLevel.pillars?.[pillar] || []); }
export function findStaticLesson(lessonId) { return CURRICULUM_LEVELS.flatMap((level) => getStaticLessons(level)).find((item) => item.id === lessonId) || null; }
