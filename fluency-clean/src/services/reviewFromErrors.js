import { CURRICULUM_PILLARS, findStaticLesson, getStaticLessons } from '../content/curriculum/index.js';
import { getLessonCompletions, getPracticeReviewQueue, getPracticeSessions } from './progressStore.js';

function clean(value) { return String(value ?? '').trim(); }
function lower(value) { return clean(value).toLowerCase(); }
function safeArray(value) { return Array.isArray(value) ? value : []; }
function unique(values) { const seen = new Set(); return values.filter((value) => { const key = clean(value); if (!key || seen.has(key)) return false; seen.add(key); return true; }); }

const TAG_RULES = [
  // Grammar
  { tag: 'grammar:verb-to-be-agreement', patterns: [/\bi\s+is\b/i, /\bshe\s+are\b/i, /\bhe\s+are\b/i, /\bthey\s+is\b/i, /\byou\s+is\b/i, /\bam\s+you\b/i], reviewLessonIds: ['A1-GRAMMAR-002', 'A1-GRAMMAR-003', 'A1-GRAMMAR-004', 'A1-GRAMMAR-005'], reason: 'Concordância do verbo to be.' },
  { tag: 'grammar:present-simple-third-person', patterns: [/\bhe\s+study\b/i, /\bshe\s+work\b/i, /\bdoes\s+he\s+studies\b/i, /\bhe\s+do\b/i, /\bshe\s+go\b/i], reviewLessonIds: ['A1-GRAMMAR-014', 'A1-GRAMMAR-015', 'A1-GRAMMAR-016', 'A1-GRAMMAR-017'], reason: 'Present simple com he/she/it.' },
  { tag: 'grammar:can-base-verb', patterns: [/\bcan\s+to\b/i, /\bcan\s+\w+ing\b/i, /\bcould\s+to\b/i], reviewLessonIds: ['A1-GRAMMAR-021'], reason: 'Depois de can, use verbo base sem to.' },
  { tag: 'grammar:articles', patterns: [/\ba\s+[aeiou]/i, /\ban\s+[^aeiou\s]/i], reviewLessonIds: ['A1-GRAMMAR-007'], reason: 'Uso de a/an.' },
  { tag: 'grammar:there-is-there-are', patterns: [/\bthere\s+is\s+\w+s\b/i, /\bthere\s+are\s+a\b/i], reviewLessonIds: ['A1-GRAMMAR-010'], reason: 'There is/there are.' },
  { tag: 'grammar:word-order', patterns: [/word order/i, /ordem/i, /missing verb/i, /frase completa/i, /sujeito\s*\+\s*verbo/i], reviewLessonIds: ['A1-GRAMMAR-013', 'A1-WRITING-001'], reason: 'Ordem básica sujeito + verbo + complemento.' },
  { tag: 'grammar:possessives', patterns: [/\bmy\s+name\s+is\b/i, /\byour\s+is\b/i, /\bpossess/i, /possessivo/i], reviewLessonIds: ['A1-GRAMMAR-008', 'A1-GRAMMAR-009'], reason: 'Possessivos e pronomes possessivos.' },
  { tag: 'grammar:plurals', patterns: [/\bchilds\b/i, /\bpeoples\b/i, /\bmans\b/i, /\bwomans\b/i, /plural/i], reviewLessonIds: ['A1-GRAMMAR-011', 'A1-GRAMMAR-012'], reason: 'Plural irregular.' },
  // Reading
  { tag: 'reading:evidence', patterns: [/evid[eê]ncia/i, /quote/i, /copie/i, /trecho/i, /texto diz/i], reviewLessonIds: ['A1-READING-013', 'A1-READING-016', 'A1-READING-017', 'A1-READING-020'], reason: 'Responder Reading com evidência textual.' },
  { tag: 'reading:main-idea', patterns: [/main idea/i, /ideia principal/i, /about what/i, /sobre o qu[eê]/i], reviewLessonIds: ['A1-READING-001', 'A1-READING-005', 'A1-READING-010'], reason: 'Identificar a ideia principal do texto.' },
  { tag: 'reading:inference', patterns: [/infer/i, /conclusão/i, /implies/i, /sugere/i], reviewLessonIds: ['A1-READING-018', 'A1-READING-019'], reason: 'Inferência de sentido no texto.' },
  // Listening
  { tag: 'listening:dictation', patterns: [/dictation/i, /digit[ea]/i, /listen/i, /ou[çc]a/i, /escreva o que ouviu/i], reviewLessonIds: ['A1-LISTENING-015', 'A1-LISTENING-017', 'A1-LISTENING-018'], reason: 'Dictation, números e escuta de detalhes.' },
  { tag: 'listening:key-words', patterns: [/key word/i, /palavra-chave/i, /heard/i, /ouviu/i, /entendeu/i], reviewLessonIds: ['A1-LISTENING-010', 'A1-LISTENING-012'], reason: 'Identificar palavras-chave na escuta.' },
  { tag: 'listening:numbers', patterns: [/number/i, /n[uú]mero/i, /phone/i, /price/i, /how many/i, /quantos/i], reviewLessonIds: ['A1-LISTENING-005', 'A1-LISTENING-006'], reason: 'Números e informações específicas na escuta.' },
  // Speaking
  { tag: 'speaking:pronunciation', patterns: [/pronunci/i, /sound/i, /fonema/i, /acento/i, /sílaba/i, /rhythm/i, /ritmo/i], reviewLessonIds: ['A1-SPEAKING-003', 'A1-SPEAKING-007'], reason: 'Pronúncia e ritmo na fala.' },
  { tag: 'speaking:fluency', patterns: [/fluenc/i, /hesit/i, /pausa/i, /connected speech/i, /liaison/i, /speak.*natural/i], reviewLessonIds: ['A1-SPEAKING-010', 'A1-SPEAKING-015'], reason: 'Fluência e fala contínua.' },
  { tag: 'speaking:structure', patterns: [/frase completa/i, /complete sentence/i, /resposta curta/i, /short answer/i, /responda com/i], reviewLessonIds: ['A1-SPEAKING-001', 'A1-SPEAKING-002', 'A1-SPEAKING-005'], reason: 'Estrutura de frases na fala.' },
  // Vocabulary
  { tag: 'vocabulary:fragile', patterns: [/vocab/i, /word/i, /palavra/i, /meaning/i, /defini[çc]/i], reviewLessonIds: ['A1-VOCABULARY-020', 'A1-VOCABULARY-010'], reason: 'Vocabulário frágil para revisar por tema.' },
  { tag: 'vocabulary:collocations', patterns: [/collocation/i, /combinação/i, /chunk/i, /make.*mistake/i, /do.*homework/i], reviewLessonIds: ['A1-VOCABULARY-015', 'A1-VOCABULARY-016'], reason: 'Collocations e combinações naturais.' },
  { tag: 'vocabulary:false-friends', patterns: [/false friend/i, /parece/i, /actually/i, /embarrassed/i, /eventually/i], reviewLessonIds: ['A1-VOCABULARY-018', 'A1-VOCABULARY-019'], reason: 'Falsos cognatos e armadilhas de vocabulário.' },
  // Writing
  { tag: 'writing:punctuation', patterns: [/capital/i, /mai[uú]scula/i, /ponto/i, /punctuation/i, /comma/i, /v[íi]rgula/i], reviewLessonIds: ['A1-WRITING-013', 'A1-WRITING-015'], reason: 'Pontuação, maiúsculas e revisão.' },
  { tag: 'writing:paragraph', patterns: [/paragraph/i, /parágrafo/i, /topic sentence/i, /introdução/i, /conclusão/i], reviewLessonIds: ['A1-WRITING-005', 'A1-WRITING-008'], reason: 'Estrutura de parágrafo.' },
  { tag: 'writing:connectors', patterns: [/connector/i, /conectivo/i, /however/i, /furthermore/i, /therefore/i, /first.*then/i], reviewLessonIds: ['A1-WRITING-010', 'A1-WRITING-011'], reason: 'Conectivos e coerência no texto.' },
];

function inferRuleFromItem(item) {
  const text = [item.prompt, item.answer, item.expected, item.title, item.type].map(clean).join(' ');
  return TAG_RULES.find((rule) => rule.patterns.some((pattern) => pattern.test(text))) || null;
}

function inferFallbackLessons(item) {
  const pillar = lower(item?.type || item?.skill || item?.pillar || '');
  const title = lower(item?.lessonTitle || '');
  if (pillar.includes('reading') || title.includes('reading') || pillar.includes('choice')) return ['A1-READING-016', 'A1-READING-017'];
  if (pillar.includes('listening') || title.includes('listening') || pillar.includes('dictation')) return ['A1-LISTENING-017', 'A1-LISTENING-015'];
  if (pillar.includes('speaking') || title.includes('speaking')) return ['A1-SPEAKING-005', 'A1-SPEAKING-010'];
  if (pillar.includes('writing') || title.includes('writing') || pillar.includes('write')) return ['A1-WRITING-015', 'A1-WRITING-013'];
  if (pillar.includes('vocabulary') || title.includes('vocab')) return ['A1-VOCABULARY-020', 'A1-VOCABULARY-015'];
  return ['A1-GRAMMAR-013', 'A1-GRAMMAR-014'];
}

function lessonTitle(id) {
  return findStaticLesson(id)?.title || id;
}

function buildReviewItem(item, index) {
  const rule = inferRuleFromItem(item);
  const reviewLessonIds = unique(rule?.reviewLessonIds || inferFallbackLessons(item));
  return {
    id: `review-error-${index + 1}`,
    sourceLessonId: item.lessonId || '',
    sourceLessonTitle: item.lessonTitle || item.title || 'Prática anterior',
    level: item.level || 'A1',
    tag: rule?.tag || `review:${item.type || 'general'}`,
    reason: rule?.reason || 'Erro recorrente detectado na Prática Profunda.',
    prompt: item.prompt || item.title || '',
    studentAnswer: item.answer || '',
    expectedAnswer: item.expected || '',
    reviewLessonIds,
    reviewLessons: reviewLessonIds.map((id) => ({ id, title: lessonTitle(id), ready: findStaticLesson(id)?.status === 'ready' })),
    createdAt: item.completedAt || '',
  };
}

function groupByTag(items) {
  const map = new Map();
  items.forEach((item) => {
    const current = map.get(item.tag) || { ...item, count: 0, prompts: [], reviewLessonIds: [] };
    current.count += 1;
    current.prompts = unique([...current.prompts, item.prompt]).slice(0, 4);
    current.reviewLessonIds = unique([...current.reviewLessonIds, ...item.reviewLessonIds]).slice(0, 6);
    current.reviewLessons = current.reviewLessonIds.map((id) => ({ id, title: lessonTitle(id), ready: findStaticLesson(id)?.status === 'ready' }));
    map.set(item.tag, current);
  });
  return [...map.values()].sort((a, b) => b.count - a.count);
}

function getLessonFlowErrorQueue(limit = 60) {
  const seen = new Set();
  const queue = [];
  for (const completion of getLessonCompletions()) {
    if (!Array.isArray(completion.flowErrors) || !completion.flowErrors.length) continue;
    for (const err of completion.flowErrors) {
      const key = `${completion.lessonId}:${err.phaseId || err.title}`;
      if (seen.has(key)) continue;
      seen.add(key);
      queue.push({
        type: err.pillar || completion.pillar || 'general',
        lessonId: err.lessonId || completion.lessonId || '',
        lessonTitle: err.lessonTitle || completion.title || '',
        level: err.level || completion.level || 'A1',
        prompt: err.prompt || err.title || '',
        answer: err.value || '',
        expected: err.expected || '',
        completedAt: completion.completedAt || '',
        phaseId: err.phaseId || '',
        status: err.status || 'warn',
      });
      if (queue.length >= limit) return queue;
    }
  }
  return queue;
}

export function getReviewPlanFromErrors(options = {}) {
  const limit = Number(options.limit || 30);
  const practiceQueue = getPracticeReviewQueue(limit);
  const flowQueue = getLessonFlowErrorQueue(limit);

  // Mesclar, deduplicar e construir review items
  const seen = new Set();
  const allItems = [];
  for (const item of [...practiceQueue, ...flowQueue]) {
    const key = `${item.lessonId}:${item.phaseId || item.prompt}:${item.expected}`;
    if (seen.has(key)) continue;
    seen.add(key);
    allItems.push(item);
    if (allItems.length >= limit * 2) break;
  }

  const items = allItems.map(buildReviewItem);
  const grouped = groupByTag(items);
  const sessions = getPracticeSessions();
  const lowAccuracySessions = sessions.filter((session) => Number(session.accuracy || 0) < 75).slice(0, 10);
  const totalWeakItems = practiceQueue.length + flowQueue.length;
  return {
    generatedAt: new Date().toISOString(),
    totalWeakItems,
    totalGroups: grouped.length,
    hasReview: grouped.length > 0,
    items,
    groups: grouped,
    lowAccuracySessions,
    nextReviewLessonId: grouped?.[0]?.reviewLessonIds?.[0] || '',
    message: grouped.length ? `${grouped.length} revisão(ões) recomendada(s) com base nos seus erros.` : 'Sem erros registrados suficientes para montar revisão obrigatória.',
  };
}

export function getReviewRecommendationsForLesson(lessonId) {
  const plan = getReviewPlanFromErrors();
  return plan.groups.filter((group) => group.reviewLessonIds.includes(lessonId) || group.sourceLessonId === lessonId);
}

export function getWeakMasteryTags(limit = 12) {
  return getReviewPlanFromErrors({ limit: 80 }).groups.slice(0, limit).map((group) => ({ tag: group.tag, count: group.count, reason: group.reason, reviewLessonIds: group.reviewLessonIds }));
}

export function getReviewCoverageSummary() {
  const lessons = getStaticLessons('A1');
  const plan = getReviewPlanFromErrors({ limit: 80 });
  const readyIds = new Set(lessons.filter((lesson) => lesson.status === 'ready').map((lesson) => lesson.id));
  const recommendedIds = unique(plan.groups.flatMap((group) => group.reviewLessonIds));
  return {
    totalRecommended: recommendedIds.length,
    readyRecommended: recommendedIds.filter((id) => readyIds.has(id)).length,
    plannedOnly: recommendedIds.filter((id) => !readyIds.has(id)),
  };
}
