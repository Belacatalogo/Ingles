import { test, expect } from '@playwright/test';
import { findStaticLesson } from '../../src/content/curriculum/index.js';
import { AUDIT_TABS } from './helpers/appMap.js';
import { AuditReporter } from './helpers/auditReporter.js';
import { clickTab, unlockApp } from './helpers/uiAudit.js';
import { auditVisualViewport, captureEvidence } from './helpers/visualAuditRules.js';
import { openSeededLesson, seedCurrentLesson, satisfyCurrentPhase } from './helpers/lessonFlowDriver.js';

test.describe.configure({ mode: 'serial' });

let reporter;

test.beforeEach(async ({ page }, testInfo) => {
  reporter = reporter || new AuditReporter({
    name: 'quality-director-visual-mobile',
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
      area: 'Runtime visual',
      title: 'Erro JavaScript não tratado durante auditoria visual',
      impact: 'Pode indicar tela quebrada durante uso real.',
      evidence: error.message,
      recommendation: 'Corrigir a exceção antes de avaliar polimento visual.',
    });
  });

  await unlockApp(page);
});

test.afterAll(() => {
  reporter?.write();
});

test('Quality Director 05: captura e audita visualmente abas principais', async ({ page }, testInfo) => {
  await page.goto('/');

  for (const tab of AUDIT_TABS) {
    await clickTab(page, tab.label);
    await page.waitForTimeout(350);
    await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible();
    await auditVisualViewport({
      page,
      reporter,
      area: `${testInfo.project.name} · Aba ${tab.label}`,
    });
  }
});

test('Quality Director 05: captura fases iniciais de uma aula real', async ({ page }, testInfo) => {
  const lesson = findStaticLesson('A1-READING-001');
  if (!lesson || lesson.status !== 'ready') {
    reporter.addIssue({
      severity: 'P1',
      area: 'Visual aula',
      title: 'Aula visual A1-READING-001 não encontrada como ready',
      impact: 'Auditor visual não conseguiu capturar uma aula real.',
      recommendation: 'Verificar currículo fixo ou escolher outra aula ready.',
    });
    return;
  }

  await seedCurrentLesson(page, lesson);
  await openSeededLesson(page);
  await expect(page.locator('.lesson-flow-shell')).toBeVisible({ timeout: 10_000 });

  for (let step = 0; step < 4; step += 1) {
    await auditVisualViewport({
      page,
      reporter,
      area: `${testInfo.project.name} · Aula A1-READING-001 · fase-${step + 1}`,
    });

    await satisfyCurrentPhase(page, reporter, 'Visual aula A1-READING-001');
    const continueButton = page.getByRole('button', { name: /continuar|concluir aula/i }).last();
    if (!(await continueButton.isVisible().catch(() => false))) {
      await captureEvidence(page, `${testInfo.project.name}-aula-reading-sem-continuar-step-${step + 1}`);
      reporter.addIssue({
        severity: 'P0',
        area: 'Visual aula A1-READING-001',
        title: 'Botão Continuar/Concluir não visível durante captura visual de aula',
        impact: 'Aluno pode ficar preso durante uma aula real.',
        recommendation: 'Revisar LessonActionFooter, safe-area e visibilidade do botão principal.',
      });
      break;
    }
    await continueButton.click();
    await page.waitForTimeout(350);
  }
});
