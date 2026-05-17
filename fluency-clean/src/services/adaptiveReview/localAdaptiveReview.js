import { ADAPTIVE_REVIEW_STATUS, ADAPTIVE_REVIEW_SOURCE } from './adaptiveReviewTypes.js';

const PILLAR_LABELS = {
  writing: 'Escrita',
  speaking: 'Fala',
  reading: 'Leitura',
  listening: 'Escuta',
  grammar: 'Gramática',
  vocabulary: 'Vocabulário',
};

const PILLAR_DRILLS = {
  writing: [
    'Escreva 2 frases novas corrigindo o ponto que gerou o erro.',
    'Releia sua resposta e corrija a estrutura: sujeito + verbo + complemento.',
    'Reescreva a frase mais longa e adicione um conector (and, but, because).',
  ],
  speaking: [
    'Repita em voz alta a frase com erro, devagar primeiro, depois em ritmo natural.',
    'Grave novamente a frase e compare com o modelo da aula.',
    'Pratique 3 frases curtas usando a mesma estrutura do ponto difícil.',
  ],
  reading: [
    'Releia o parágrafo e sublinhe mentalmente a palavra-chave da questão.',
    'Procure no texto uma frase que prove sua resposta antes de escrever.',
    'Resuma o trecho em 1 frase simples com suas próprias palavras.',
  ],
  listening: [
    'Ouça o áudio novamente e escreva 3 palavras que conseguiu identificar.',
    'Escute com foco no início de cada frase, não em cada palavra.',
    'Ouça uma vez sem parar, depois uma vez parando após cada frase.',
  ],
  grammar: [
    'Escreva 2 frases novas aplicando a regra que causou o erro.',
    'Identifique sujeito e verbo separadamente na frase com erro.',
    'Leia a frase corrigida em voz alta para fixar a forma certa.',
  ],
  vocabulary: [
    'Crie 1 frase nova usando a palavra-problema em contexto diferente.',
    'Escreva a tradução da palavra e um exemplo de uso real.',
    'Associe a palavra a uma imagem ou situação do seu dia a dia.',
  ],
};

function clean(value) { return String(value ?? '').trim(); }
function safeArray(value) { return Array.isArray(value) ? value : []; }

function buildTargetedDrills(group) {
  const pool = PILLAR_DRILLS[group.pillar] || PILLAR_DRILLS.grammar;
  const drills = [];
  if (group.issues[0]) {
    const topic = group.issues[0].slice(0, 80).replace(/"/g, "'");
    drills.push(`Revise: "${topic}" — tente uma nova resposta focando na regra que causou o erro.`);
  } else {
    drills.push(pool[0]);
  }
  drills.push(pool[1] || pool[0]);
  drills.push(pool[2] || pool[0]);
  return drills;
}

function normalizePillar(raw) {
  const p = clean(raw).toLowerCase();
  if (PILLAR_LABELS[p]) return p;
  if (p.includes('read')) return 'reading';
  if (p.includes('listen')) return 'listening';
  if (p.includes('speak') || p.includes('fala')) return 'speaking';
  if (p.includes('write') || p.includes('escrit')) return 'writing';
  if (p.includes('vocab')) return 'vocabulary';
  if (p.includes('gram')) return 'grammar';
  return 'grammar';
}

function groupErrorsByPillar(errors) {
  const map = new Map();
  for (const err of errors) {
    const pillar = normalizePillar(err.pillar || err.type || 'grammar');
    const group = map.get(pillar) || { pillar, issues: [], examples: [], count: 0 };
    group.count++;
    const prompt = clean(err.prompt || err.title || '');
    if (prompt && group.issues.length < 4) group.issues.push(prompt);
    const val = clean(err.value || err.answer || '');
    if (val && group.examples.length < 2) group.examples.push(val);
    map.set(pillar, group);
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}

export function buildLocalAdaptiveReview({ lesson, flowErrors = [], level = 'A1' }) {
  const errors = safeArray(flowErrors).filter((err) => err && (err.status === 'warn' || err.status === 'missed'));

  if (!errors.length) {
    return {
      status: ADAPTIVE_REVIEW_STATUS.fallback,
      source: ADAPTIVE_REVIEW_SOURCE.local,
      level,
      focusSummary: 'Nenhum erro registrado nesta aula. Continue com a próxima!',
      priorityPillars: [],
      errorGroups: [],
      reviewPlan: [],
      nextLessonAdvice: 'Avance para a próxima aula com confiança.',
    };
  }

  const groups = groupErrorsByPillar(errors);
  const priorityPillars = groups.map((g) => g.pillar).slice(0, 3);

  const errorGroups = groups.map((g) => {
    const drillPool = PILLAR_DRILLS[g.pillar] || PILLAR_DRILLS.grammar;
    return {
      pillar: g.pillar,
      title: PILLAR_LABELS[g.pillar] || g.pillar,
      issues: g.issues,
      examples: g.examples,
      microDrills: buildTargetedDrills(g),
    };
  });

  const topPillar = groups[0]?.pillar || '';
  const topLabel = PILLAR_LABELS[topPillar] || topPillar;
  const focusSummary = groups.length === 1
    ? `Foco em ${topLabel}: ${groups[0].count} ponto(s) para revisar.`
    : `${groups.length} área(s) para revisar. Prioridade: ${topLabel}.`;

  const reviewPlan = groups.slice(0, 3).map((g) => ({
    title: `Revisão — ${PILLAR_LABELS[g.pillar] || g.pillar}`,
    instruction: `${g.count} erro(s) nesta área. Pratique os exercícios abaixo.`,
    items: buildTargetedDrills(g).slice(0, 2),
  }));

  return {
    status: ADAPTIVE_REVIEW_STATUS.fallback,
    source: ADAPTIVE_REVIEW_SOURCE.local,
    level,
    focusSummary,
    priorityPillars,
    errorGroups,
    reviewPlan,
    nextLessonAdvice: `Antes de avançar, revise os pontos de ${topLabel}.`,
  };
}
