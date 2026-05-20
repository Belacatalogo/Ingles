import { test, expect } from '@playwright/test';
import { getStaticLessons } from '../../src/content/curriculum/index.js';
import { AUDIT_TABS } from './helpers/appMap.js';
import { AuditReporter } from './helpers/auditReporter.js';
import { clickTab, unlockApp } from './helpers/uiAudit.js';
import { openSeededLesson, seedCurrentLesson, satisfyCurrentPhase } from './helpers/lessonFlowDriver.js';
import { runStudentExperienceInvariants } from './helpers/studentExperienceInvariants.js';

const EXPLORATORY_TABS = AUDIT_TABS.slice(0, 7);
const MAX_SAFE_ACTIONS_PER_TAB = 2;
const MAX_STEPS_PER_LESSON = 3;

function getExploratoryLessons() {
  const lessons = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    .flatMap((level) => getStaticLessons(level))
    .filter((lesson) => lesson.status === 'ready');

  const byPillar = new Map();
  lessons.forEach((lesson) => {
    const key = lesson.pillar || lesson.type || 'unknown';
    if (!byPillar.has(key)) byPillar.set(key, lesson);
  });

  return [...byPillar.values()].slice(0, 6);
}

let reporter;

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }, testInfo) => {
  test.setTimeout(45000);
  reporter = reporter || new AuditReporter({
    name: 'quality-director-exploratory-student-audit',
    projectName: testInfo.project.name,
  });

  page.on('console', (message) => {
    if (message.type() === 'error') {
      reporter.addIssue({
        severity: 'P1',
        area: 'Exploratório · console',
        title: 'Console error durante exploração do aluno',
        impact: 'Erro silencioso pode indicar bug que aparecerá em uso real.',
        evidence: message.text(),
        recommendation: 'Investigar console errors em fluxos de aluno.',
      });
    }
  });

  page.on('pageerror', (error) => {
    reporter.addIssue({
      severity: 'P0',
      area: 'Exploratório · runtime',
      title: 'Erro JavaScript não tratado durante exploração',
      impact: 'Pode quebrar uma tela ou aula durante estudo real.',
      evidence: error.message,
      recommendation: 'Corrigir exceções antes de confiar o app ao aluno.',
    });
  });
});

test.afterAll(() => reporter?.write());

test('Exploratory Student Audit: varre abas procurando erros desconhecidos', async ({ page }, testInfo) => {
  await unlockApp(page);
  await page.goto('/');

  for (const tab of EXPLORATORY_TABS) {
    await clickTab(page, tab.label);
    await page.waitForTimeout(120);
    await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible({ timeout: 8000 });
    await runStudentExperienceInvariants({ page, reporter, area: `${testInfo.project.name} · Explorar aba ${tab.label}` });
  }

  reporter.addCheck({ area: 'Exploratório · abas', title: 'Abas principais exploradas com invariantes gerais' });
});

test('Exploratory Student Audit: clica ações seguras nas abas procurando anomalias', async ({ page }, testInfo) => {
  await unlockApp(page);
  await page.goto('/');

  for (const tab of EXPLORATORY_TABS) {
    await clickTab(page, tab.label);
    await page.waitForTimeout(120);
    const buttons = page.locator('button:visible').filter({ hasNotText: /^$/ });
    const maxClicks = Math.min(await buttons.count().catch(() => 0), MAX_SAFE_ACTIONS_PER_TAB);

    for (let index = 0; index < maxClicks; index += 1) {
      const text = await buttons.nth(index).innerText().catch(() => '');
      if (/excluir|apagar|reset|sair|deletar|confirmar/i.test(text)) continue;
      await buttons.nth(index).click().catch(() => null);
      await page.waitForTimeout(120);
      await runStudentExperienceInvariants({ page, reporter, area: `${testInfo.project.name} · Explorar aba ${tab.label} · ação ${index + 1}` });
    }
  }

  reporter.addCheck({ area: 'Exploratório · ações', title: 'Ações seguras exploradas com invariantes gerais' });
});

test('Exploratory Student Audit: abre amostra curta de aulas reais por pilar', async ({ page }, testInfo) => {
  const lessons = getExploratoryLessons();

  for (const lesson of lessons) {
    await seedCurrentLesson(page, lesson);
    await openSeededLesson(page);
    await expect(page.locator('.lesson-flow-shell')).toBeVisible({ timeout: 8000 });

    for (let step = 0; step < MAX_STEPS_PER_LESSON; step += 1) {
      await runStudentExperienceInvariants({ page, reporter, area: `${testInfo.project.name} · Explorar aula ${lesson.id} · etapa ${step + 1}` });
      await satisfyCurrentPhase(page, reporter, `Explorar aula ${lesson.id}`, lesson);
      const continueButton = page.getByRole('button', { name: /continuar|concluir aula/i }).last();
      if (!(await continueButton.isVisible().catch(() => false))) break;
      await continueButton.click().catch(() => null);
      await page.waitForTimeout(120);
    }
  }

  reporter.addCheck({ area: 'Exploratório · aulas', title: `${lessons.length} aulas reais exploradas por amostra curta de pilares` });
});
