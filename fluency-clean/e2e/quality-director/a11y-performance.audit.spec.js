import { test, expect } from '@playwright/test';
import { AUDIT_TABS } from './helpers/appMap.js';
import { AuditReporter } from './helpers/auditReporter.js';
import { clickTab, unlockApp } from './helpers/uiAudit.js';
import {
  auditA11yBasics,
  auditKeyboardFocusBasics,
  auditPerformanceMetrics,
  auditTabSwitchPerformance,
  auditTechnicalQualitySignals,
  getPerformanceMetrics,
} from './helpers/a11yPerformanceRules.js';

test.describe.configure({ mode: 'serial' });

let reporter;

test.beforeEach(async ({ page }, testInfo) => {
  reporter = reporter || new AuditReporter({
    name: 'quality-director-a11y-performance',
    projectName: testInfo.project.name,
  });

  page.on('console', (message) => {
    if (message.type() === 'error') {
      reporter.addIssue({
        severity: 'P1',
        area: 'A11y/Performance Console',
        title: 'Console error durante auditoria técnica',
        impact: 'Erros técnicos podem afetar performance, acessibilidade ou estabilidade.',
        evidence: message.text(),
        recommendation: 'Investigar e eliminar console errors em telas principais.',
      });
    }
  });

  page.on('pageerror', (error) => {
    reporter.addIssue({
      severity: 'P0',
      area: 'A11y/Performance Runtime',
      title: 'Erro JavaScript não tratado durante auditoria técnica',
      impact: 'Pode quebrar a experiência do aluno e invalidar métricas de qualidade.',
      evidence: error.message,
      recommendation: 'Corrigir exceção antes de otimizar performance/acessibilidade.',
    });
  });

  await unlockApp(page);
});

test.afterAll(() => {
  reporter?.write();
});

test('Quality Director 09: performance inicial, acessibilidade e qualidade técnica por aba', async ({ page }, testInfo) => {
  // Esta auditoria é propositalmente mais longa que specs funcionais simples:
  // ela abre o app, percorre todas as abas, mede performance, inspeciona DOM,
  // acessibilidade básica e foco por teclado. O timeout global de 30s pode
  // gerar falso negativo no CI sem indicar bug real do app.
  test.setTimeout(90_000);

  const started = Date.now();
  await page.goto('/');
  await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible({ timeout: 10_000 });
  const elapsed = Date.now() - started;
  const metrics = await getPerformanceMetrics(page);

  auditPerformanceMetrics({
    metrics,
    elapsedMs: elapsed,
    reporter,
    area: `${testInfo.project.name} · Carregamento inicial`,
  });

  for (const tab of AUDIT_TABS) {
    const area = `${testInfo.project.name} · Aba ${tab.label}`;
    await auditTabSwitchPerformance({
      page,
      reporter,
      area,
      action: async () => clickTab(page, tab.label),
    });

    await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible();
    await auditA11yBasics({ page, reporter, area });
    await auditKeyboardFocusBasics({ page, reporter, area });
    await auditTechnicalQualitySignals({ page, reporter, area });
  }
});
