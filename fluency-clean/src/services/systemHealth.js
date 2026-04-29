import { getCloudSyncStatus } from './cloudSync.js';
import { getCurriculumLessons, getCurriculumSummary } from './curriculumPlan.js';
import { diagnostics } from './diagnostics.js';
import { getFirebaseStatus } from './firebase.js';
import { getLessonKeysStatus } from './lessonKeys.js';
import { getCurrentLesson } from './lessonStore.js';
import { getSaturdayReviewPlan } from './masteryStore.js';
import { getLessonCompletions, getProgressSummary } from './progressStore.js';

function ok(label, detail = '') {
  return { id: label.toLowerCase().replace(/\s+/g, '-'), label, status: 'ok', detail };
}

function warn(label, detail = '') {
  return { id: label.toLowerCase().replace(/\s+/g, '-'), label, status: 'warn', detail };
}

function fail(label, detail = '') {
  return { id: label.toLowerCase().replace(/\s+/g, '-'), label, status: 'error', detail };
}

function safeRun(label, fn) {
  try {
    return fn();
  } catch (error) {
    return fail(label, error?.message || String(error));
  }
}

export function getSystemHealthChecklist() {
  const checks = [];

  checks.push(safeRun('Firebase', () => {
    const status = getFirebaseStatus();
    return status.configured ? ok('Firebase', `${status.projectId || 'configurado'} · ${status.source}`) : warn('Firebase', 'Configuração ausente ou incompleta.');
  }));

  checks.push(safeRun('Sync conta', () => {
    const status = getCloudSyncStatus();
    if (status.mode === 'cloud') return ok('Sync conta', status.lastPushAt ? `salvo ${new Date(status.lastPushAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}` : 'ativo');
    if (status.mode === 'local-fallback') return warn('Sync conta', status.lastError || 'usando local temporário');
    return warn('Sync conta', 'aguardando login Google');
  }));

  checks.push(safeRun('Keys aulas', () => {
    const keys = getLessonKeysStatus();
    return keys.hasAnyKey ? ok('Keys aulas', `${keys.flashCount} Flash · ${keys.proMasked ? 'Pro ok' : 'sem Pro'}`) : warn('Keys aulas', 'nenhuma key configurada');
  }));

  checks.push(safeRun('Currículo', () => {
    const lessons = getCurriculumLessons();
    const summary = getCurriculumSummary();
    return lessons.length >= 100 ? ok('Currículo', `${lessons.length} aulas · nível ${summary.currentLevel}`) : warn('Currículo', `${lessons.length} aulas cadastradas`);
  }));

  checks.push(safeRun('Aula atual', () => {
    const lesson = getCurrentLesson();
    return lesson?.title ? ok('Aula atual', lesson.title) : warn('Aula atual', 'nenhuma aula gerada ainda');
  }));

  checks.push(safeRun('Progresso', () => {
    const progress = getProgressSummary();
    const completions = getLessonCompletions();
    return ok('Progresso', `${progress.xp || 0} XP · ${completions.length} concluídas`);
  }));

  checks.push(safeRun('Domínio', () => {
    const plan = getSaturdayReviewPlan();
    const weak = plan.weakPillars?.length || 0;
    return weak ? warn('Domínio', `${weak} pilar(es) pedem revisão`) : ok('Domínio', 'sem fraqueza crítica registrada');
  }));

  checks.push(safeRun('Diagnóstico', () => {
    const snap = diagnostics.snapshot();
    return snap.status === 'error' ? warn('Diagnóstico', snap.lastError || 'erro registrado') : ok('Diagnóstico', snap.phase || 'pronto');
  }));

  const hasError = checks.some((item) => item.status === 'error');
  const hasWarn = checks.some((item) => item.status === 'warn');

  return {
    status: hasError ? 'error' : hasWarn ? 'warn' : 'ok',
    checks,
    updatedAt: new Date().toISOString(),
  };
}

export function logSystemHealth() {
  const health = getSystemHealthChecklist();
  diagnostics.log(`Checklist LAB-8: ${health.status.toUpperCase()} · ${health.checks.length} verificações.`, health.status === 'error' ? 'error' : 'info');
  return health;
}
