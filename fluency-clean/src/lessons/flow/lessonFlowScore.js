// Fonte única de verdade para scoring do sistema de fases (LessonFlowShell).
// Usada por LessonCompletionCard, LessonFlowShell e progressStore.

/**
 * Determina o status de uma tentativa individual armazenada no flow.
 * Normaliza os diferentes formatos salvos por AttemptField, ChoiceField,
 * AudioListenField, SpeakField e ChecklistField.
 */
export function getAttemptStatus(attempt) {
  if (!attempt) return 'missed';
  // AttemptField: { value, matched, feedback: { status: 'ok'|'warn' } }
  if (attempt.feedback?.status === 'ok') return 'ok';
  if (attempt.feedback?.status === 'warn') return 'warn';
  // ChoiceField: { value, matched: boolean }
  if (typeof attempt.matched === 'boolean') return attempt.matched ? 'ok' : 'warn';
  // AudioListenField: { played: true }
  if (attempt.played === true) return 'ok';
  // SpeakField: { spoken: true } ou { spoken: false, value: '...' }
  if (attempt.spoken === true) return 'ok';
  if (attempt.spoken === false && String(attempt.value || '').trim()) return 'ok';
  // ChecklistField: { checked: { id: true|false } }
  if (attempt.checked && typeof attempt.checked === 'object') return 'ok';
  // Tentativa genérica: se existir, conta como ok
  return 'ok';
}

/**
 * Computa resultados de todas as fases que requerem tentativa.
 * Retorna dados de score normalizados para ser usado em completion card,
 * masteryStore e errorBank.
 */
export function computeFlowResults(phases = [], attempts = {}) {
  const results = [];
  let totalAttempt = 0;
  let correct = 0;
  let warn = 0;
  let missed = 0;

  for (const phase of phases) {
    if (!phase.requiresAttempt) continue;
    totalAttempt++;
    const attempt = attempts[phase.id];
    if (!attempt) {
      missed++;
      results.push({
        phaseId: phase.id,
        title: phase.shortTitle || phase.title || phase.id,
        pillar: phase.pillar || '',
        status: 'missed',
        value: '',
      });
      continue;
    }
    const status = getAttemptStatus(attempt);
    const value = typeof attempt === 'object' ? String(attempt.value || '') : '';
    if (status === 'ok') {
      correct++;
    } else {
      warn++;
    }
    results.push({
      phaseId: phase.id,
      title: phase.shortTitle || phase.title || phase.id,
      pillar: phase.pillar || '',
      status,
      value,
    });
  }

  const score = totalAttempt > 0 ? Math.round((correct / totalAttempt) * 100) : 100;
  const weakTitles = results
    .filter((r) => r.status === 'warn' || r.status === 'missed')
    .map((r) => r.title)
    .filter(Boolean);

  return { results, totalAttempt, correct, warn, missed, score, weakTitles };
}

/**
 * Extrai os erros de fase para registro no banco de erros.
 * Retorna apenas as fases com status 'warn' que têm valor de resposta.
 */
export function extractFlowErrors(phases = [], attempts = {}, lessonMeta = {}) {
  const errors = [];
  for (const phase of phases) {
    if (!phase.requiresAttempt) continue;
    const attempt = attempts[phase.id];
    if (!attempt) continue;
    const status = getAttemptStatus(attempt);
    if (status !== 'warn') continue;
    const value = typeof attempt === 'object' ? String(attempt.value || '') : '';
    errors.push({
      phaseId: phase.id,
      title: phase.shortTitle || phase.title || phase.id,
      pillar: lessonMeta.pillar || lessonMeta.type || '',
      level: lessonMeta.level || 'A1',
      lessonId: lessonMeta.id || '',
      lessonTitle: lessonMeta.title || '',
      value,
      prompt: phase.item?.prompt || phase.item?.question || '',
      expected: phase.item?.expected || phase.item?.answer || phase.item?.correctAnswer || '',
    });
  }
  return errors;
}
