function clean(value) { return String(value ?? '').trim(); }
function safeArray(value) { return Array.isArray(value) ? value : []; }
function issue(code, message, severity = 'error') { return { code, message, severity }; }

const MIN_BY_PILLAR = Object.freeze({
  grammar: { total: 20, types: 4 },
  vocabulary: { total: 14, types: 3 },
  reading: { total: 10, types: 3 },
  listening: { total: 12, types: 3 },
  speaking: { total: 10, types: 2 },
  writing: { total: 10, types: 3 },
});

function hasRenderableShape(item) {
  if (!clean(item?.prompt) || !clean(item?.answer) || !clean(item?.type)) return false;
  if (['choice', 'listenChoice', 'fillBlank'].includes(item.type)) return safeArray(item.options).length >= 2;
  if (item.type === 'wordBank') return safeArray(item.words).length >= 3;
  if (item.type === 'dictation') return clean(item.answer).length <= 140;
  return true;
}

export function validateStaticPracticePlan(lesson, items = []) {
  const pillar = clean(lesson?.pillar || lesson?.type).toLowerCase() || 'mixed';
  const minimum = MIN_BY_PILLAR[pillar] || { total: 8, types: 2 };
  const list = safeArray(items);
  const issues = [];
  const renderable = list.filter(hasRenderableShape);
  const types = new Set(renderable.map((item) => item.type));

  if (renderable.length < minimum.total) issues.push(issue('practice.too_few', `Prática ${pillar} precisa de pelo menos ${minimum.total} exercícios renderizáveis. Atual: ${renderable.length}.`));
  if (types.size < minimum.types) issues.push(issue('practice.types.too_few', `Prática ${pillar} precisa de pelo menos ${minimum.types} tipos diferentes. Atual: ${types.size}.`, 'warn'));
  if (pillar === 'reading' && !renderable.some((item) => /evidência|evidence/i.test(item.title || item.prompt))) issues.push(issue('practice.reading.evidence_missing', 'Reading precisa de treino de evidência textual.'));
  if (pillar === 'listening' && !renderable.some((item) => ['listenChoice', 'dictation', 'speak'].includes(item.type))) issues.push(issue('practice.listening.audio_missing', 'Listening precisa de treino auditivo, dictation ou shadowing.'));
  if (pillar === 'speaking' && !renderable.some((item) => item.type === 'speak')) issues.push(issue('practice.speaking.speak_missing', 'Speaking precisa de pelo menos uma tarefa de fala.'));
  if (pillar === 'writing' && !renderable.some((item) => item.type === 'write')) issues.push(issue('practice.writing.write_missing', 'Writing precisa de pelo menos uma tarefa escrita.'));

  return {
    lessonId: lesson?.id || '',
    pillar,
    total: list.length,
    renderable: renderable.length,
    typeCount: types.size,
    approved: !issues.some((item) => item.severity === 'error'),
    issues,
    errors: issues.filter((item) => item.severity === 'error'),
    warnings: issues.filter((item) => item.severity !== 'error'),
  };
}

export function buildPracticeQualityMetadata(lesson, items = []) {
  const validation = validateStaticPracticePlan(lesson, items);
  return {
    staticDerived: true,
    validation,
    purityValidation: { ok: validation.approved, reason: validation.errors.map((item) => item.message).join(' ') },
    leakDiscarded: 0,
    purityReport: validation.issues,
  };
}
