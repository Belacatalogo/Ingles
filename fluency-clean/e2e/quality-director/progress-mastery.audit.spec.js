import { test } from '@playwright/test';
import { findStaticLesson } from '../../src/content/curriculum/index.js';
import { AuditReporter } from './helpers/auditReporter.js';
import { unlockApp } from './helpers/uiAudit.js';
import { runProgressMasteryProbe } from './helpers/progressMasteryProbe.js';

test.describe.configure({ mode: 'serial' });

let reporter;

function addIssue(issue) {
  reporter.addIssue({ severity: 'P1', ...issue });
}

function expectValue(condition, issue) {
  if (!condition) addIssue(issue);
}

test.beforeEach(async ({ page }, testInfo) => {
  reporter = reporter || new AuditReporter({
    name: 'quality-director-progress-mastery',
    projectName: testInfo.project.name,
  });

  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) {
      reporter.addConsoleIssue(message.text(), message.location()?.url || '');
    }
  });

  page.on('pageerror', (error) => {
    reporter.addIssue({
      severity: 'P0',
      area: 'Progress/Mastery Runtime',
      title: 'Erro JavaScript não tratado durante auditoria de progresso',
      impact: 'Pode impedir salvamento de XP, streak ou domínio.',
      evidence: error.message,
      recommendation: 'Corrigir a exceção antes de confiar no progresso do aluno.',
    });
  });

  await unlockApp(page);
});

test.afterAll(() => {
  reporter?.write();
});

test('Quality Director 06: XP, conclusão única, mastery e estados nulos', async ({ page }) => {
  const lesson = findStaticLesson('A1-READING-001');
  if (!lesson || lesson.status !== 'ready') {
    reporter.addIssue({
      severity: 'P0',
      area: 'Progress/Mastery',
      title: 'Aula base A1-READING-001 não encontrada',
      impact: 'Auditor de progresso não conseguiu simular uma conclusão real.',
      recommendation: 'Verificar currículo fixo ou escolher outra aula ready.',
    });
    return;
  }

  await page.goto('/');
  const result = await runProgressMasteryProbe(page, lesson);

  expectValue(result.first.saved === true, {
    severity: 'P0',
    area: 'Progress/Mastery',
    title: 'Primeira conclusão não foi salva',
    impact: 'Aluno pode concluir aula e perder progresso.',
    evidence: JSON.stringify(result.first),
    recommendation: 'Verificar storage.set, completeLesson e disponibilidade do localStorage.',
  });

  expectValue(result.first.alreadyCompleted === false, {
    area: 'Progress/Mastery',
    title: 'Primeira conclusão marcada como duplicada',
    impact: 'Aluno pode deixar de ganhar XP na primeira conclusão real.',
    evidence: JSON.stringify(result.first),
    recommendation: 'Verificar getCompletionId e lista progress.lessonCompletions antes da primeira conclusão.',
  });

  expectValue(result.afterFirstProgress.xp === 25 && result.afterFirstProgress.completedLessons === 1, {
    severity: 'P0',
    area: 'Progress/Mastery',
    title: 'XP ou completedLessons incorretos após primeira conclusão',
    impact: 'Progresso principal do aluno fica incorreto.',
    evidence: JSON.stringify(result.afterFirstProgress),
    recommendation: 'Primeira conclusão deve somar +25 XP e +1 aula concluída.',
  });

  expectValue(result.completedAfterFirst === true && result.afterFirstCompletions.length === 1, {
    severity: 'P0',
    area: 'Progress/Mastery',
    title: 'Aula não aparece como concluída após salvar',
    impact: 'Tela pode não liberar prática extra ou status de aula concluída.',
    evidence: JSON.stringify({ completedAfterFirst: result.completedAfterFirst, completions: result.afterFirstCompletions }),
    recommendation: 'Verificar isLessonCompleted e getCompletionId.',
  });

  expectValue(result.second.alreadyCompleted === true, {
    area: 'Progress/Mastery',
    title: 'Revisita da mesma aula não foi reconhecida como duplicada',
    impact: 'Aluno pode farmar XP repetindo a mesma aula.',
    evidence: JSON.stringify(result.second),
    recommendation: 'completeLesson deve reconhecer lessonId já presente em progress.lessonCompletions.',
  });

  expectValue(result.afterSecondProgress.xp === 25 && result.afterSecondProgress.completedLessons === 1, {
    severity: 'P0',
    area: 'Progress/Mastery',
    title: 'XP duplicou ao concluir aula já concluída',
    impact: 'Sistema de XP e progresso perde confiabilidade.',
    evidence: JSON.stringify(result.afterSecondProgress),
    recommendation: 'Manter xpGain = 0 quando alreadyCompleted=true.',
  });

  expectValue(result.afterSecondCompletions.length === 1, {
    area: 'Progress/Mastery',
    title: 'Lista de conclusões duplicou a mesma aula',
    impact: 'Histórico de aulas concluídas pode inflar progresso e gates.',
    evidence: JSON.stringify(result.afterSecondCompletions),
    recommendation: 'Atualizar conclusão existente em vez de inserir duplicata.',
  });

  const pillar = String(lesson.pillar || lesson.type || 'reading').toLowerCase();
  const firstPillar = result.afterFirstMastery?.pillars?.[pillar];
  const secondPillar = result.afterSecondMastery?.pillars?.[pillar];
  const weakPillar = result.afterWeakMastery?.pillars?.[pillar];

  expectValue(firstPillar?.attempts >= 1 && firstPillar?.score >= 90, {
    area: 'Progress/Mastery',
    title: 'Mastery não registrou tentativa forte na primeira conclusão',
    impact: 'Domínio por pilar pode ficar sem dados úteis.',
    evidence: JSON.stringify(firstPillar),
    recommendation: 'recordLessonMastery deve atualizar attempts e score por pilar.',
  });

  expectValue(secondPillar?.attempts >= firstPillar?.attempts, {
    area: 'Progress/Mastery',
    title: 'Mastery regrediu tentativas após revisita',
    impact: 'Histórico de domínio pode ficar inconsistente.',
    evidence: JSON.stringify({ firstPillar, secondPillar }),
    recommendation: 'Normalizar atualização de mastery para manter contadores coerentes.',
  });

  expectValue(weakPillar?.weakCount >= 1 && Array.isArray(result.afterWeakMastery?.recentErrors) && result.afterWeakMastery.recentErrors.length >= 1, {
    area: 'Progress/Mastery',
    title: 'Erro fraco não alimentou weakCount/recentErrors',
    impact: 'Revisão adaptativa pode não saber o que reforçar.',
    evidence: JSON.stringify({ weakPillar, recentErrors: result.afterWeakMastery?.recentErrors?.slice?.(0, 2) }),
    recommendation: 'Garantir que flowErrors e score baixo alimentem masteryStore.',
  });

  expectValue(result.weakPillars.some((item) => item.pillar === pillar), {
    area: 'Progress/Mastery',
    title: 'Pilar fraco não aparece em getWeakPillars',
    impact: 'Revisão semanal pode ignorar lacunas reais do aluno.',
    evidence: JSON.stringify(result.weakPillars),
    recommendation: 'Verificar threshold e weakCount em masteryStore.',
  });

  expectValue(result.gateNoProgress.status === 'needs_more_data', {
    area: 'Mastery Gate',
    title: 'Gate sem progresso não retorna needs_more_data',
    impact: 'Sistema pode orientar avanço/revisão de forma errada sem dados.',
    evidence: JSON.stringify(result.gateNoProgress),
    recommendation: 'Manter estado seguro quando não há conclusões.',
  });

  expectValue(Number(result.normalizedNullProgress.xp) === 0 && Number(result.normalizedNullProgress.completedLessons) === 0, {
    severity: 'P0',
    area: 'Progress/Mastery',
    title: 'progress.summary null não foi normalizado',
    impact: 'Usuário pode ver crash se localStorage vier com string null.',
    evidence: JSON.stringify(result.normalizedNullProgress),
    recommendation: 'normalizeProgress deve tratar null/inválido como objeto vazio.',
  });

  expectValue(Array.isArray(result.normalizedNullCompletions) && result.normalizedNullCompletions.length === 0, {
    severity: 'P0',
    area: 'Progress/Mastery',
    title: 'progress.lessonCompletions null não foi normalizado',
    impact: 'Aba Aula/Curso pode quebrar ao verificar conclusão.',
    evidence: JSON.stringify(result.normalizedNullCompletions),
    recommendation: 'getLessonCompletions deve tratar null como array vazio.',
  });

  expectValue(result.normalizedNullMastery?.pillars?.reading && Array.isArray(result.normalizedNullMastery?.recentErrors), {
    severity: 'P0',
    area: 'Progress/Mastery',
    title: 'mastery null não foi normalizado',
    impact: 'CourseScreen/ProgressScreen podem quebrar ao ler mastery.',
    evidence: JSON.stringify(result.normalizedNullMastery),
    recommendation: 'normalizeProfile deve tratar null/inválido como emptyProfile.',
  });

  reporter.addCheck({
    area: 'Progress/Mastery',
    title: 'Auditoria de XP, conclusão única, mastery, gate e estados nulos executada',
  });
});
