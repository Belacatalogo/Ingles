import { test } from '@playwright/test';
import { AUDIT_TABS } from './helpers/appMap.js';
import { AuditReporter } from './helpers/auditReporter.js';
import { auditTab, clickTab, unlockApp } from './helpers/uiAudit.js';

test.describe.configure({ mode: 'serial' });

let reporter;

test.beforeEach(async ({ page }, testInfo) => {
  reporter = reporter || new AuditReporter({
    name: 'quality-director-navigation',
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
      area: 'Runtime',
      title: 'Erro JavaScript não tratado',
      impact: 'Pode quebrar o fluxo de estudo ou deixar tela em branco.',
      evidence: error.message,
      recommendation: 'Corrigir a exceção antes de continuar evoluindo a tela afetada.',
    });
  });

  await unlockApp(page);
});

test.afterAll(() => {
  reporter?.write();
});

test('Quality Director 01: navega por todas as abas e coleta problemas visíveis', async ({ page }) => {
  await page.goto('/');

  for (const tab of AUDIT_TABS) {
    await auditTab({ page, tab, reporter });
  }
});

test('Quality Director 01: troca de aba após rolagem sempre volta ao topo', async ({ page }) => {
  await page.goto('/');
  await clickTab(page, 'Curso');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(150);

  for (const label of ['Aula', 'Cartas', 'Speaking', 'Progresso', 'Ajustes', 'Hoje']) {
    await clickTab(page, label);
    await page.waitForTimeout(250);
    const y = await page.evaluate(() => window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0);
    if (y > 8) {
      reporter.addIssue({
        severity: 'P1',
        area: `Aba ${label}`,
        title: 'Scroll não resetou ao trocar de aba após rolagem',
        impact: 'O aluno pode abrir uma nova aba no meio da tela, parecendo bug de navegação.',
        evidence: `scrollY=${y}`,
        fileHint: 'fluency-clean/src/hooks/useScrollToTopOnChange.js',
        recommendation: 'Verificar se existe container interno com overflow ou se o reset precisa mirar outro elemento.',
      });
    } else {
      reporter.addCheck({
        area: `Aba ${label}`,
        title: 'Scroll resetou para o topo após troca de aba',
      });
    }
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }
});
