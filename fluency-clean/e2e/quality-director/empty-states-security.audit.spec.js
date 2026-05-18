import { test, expect } from '@playwright/test';
import { AUDIT_TABS } from './helpers/appMap.js';
import { AuditReporter } from './helpers/auditReporter.js';
import { clickTab } from './helpers/uiAudit.js';
import { auditVisualViewport } from './helpers/visualAuditRules.js';
import {
  applyEmptyStateScenario,
  auditSecurityVisualText,
  EMPTY_STATE_SCENARIOS,
} from './helpers/emptyStateScenarios.js';

test.describe.configure({ mode: 'serial' });

let reporter;

test.beforeEach(async ({ page }, testInfo) => {
  reporter = reporter || new AuditReporter({
    name: 'quality-director-empty-states-security',
    projectName: testInfo.project.name,
  });

  page.on('console', (message) => {
    if (message.type() === 'error') {
      reporter.addIssue({
        severity: 'P1',
        area: 'Console empty-state',
        title: 'Console error durante estado vazio/corrompido',
        impact: 'Pode indicar crash silencioso ou erro técnico que o aluno acabará percebendo.',
        evidence: message.text(),
        recommendation: 'Tratar o estado vazio/corrompido sem erro de console.',
      });
    }
  });

  page.on('pageerror', (error) => {
    reporter.addIssue({
      severity: 'P0',
      area: 'Runtime empty-state',
      title: 'Erro JavaScript não tratado em estado vazio/corrompido',
      impact: 'Aluno pode ver tela quebrada ao abrir app sem dados ou com storage inválido.',
      evidence: error.message,
      recommendation: 'Normalizar dados vindos do localStorage e renderizar estado vazio amigável.',
    });
  });
});

test.afterAll(() => {
  reporter?.write();
});

for (const scenario of EMPTY_STATE_SCENARIOS) {
  test(`Quality Director 07: ${scenario.label}`, async ({ page }, testInfo) => {
    await applyEmptyStateScenario(page, scenario.id);
    await page.goto('/');
    await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible({ timeout: 10_000 });

    for (const tab of AUDIT_TABS) {
      await clickTab(page, tab.label);
      await page.waitForTimeout(300);

      const area = `${testInfo.project.name} · ${scenario.label} · Aba ${tab.label}`;
      const text = await page.locator('body').innerText({ timeout: 8000 }).catch(() => '');

      if (!text.trim()) {
        reporter.addIssue({
          severity: 'P0',
          area,
          title: 'Aba sem texto em estado vazio/corrompido',
          impact: 'Pode indicar tela branca ou renderização quebrada para aluno novo.',
          recommendation: 'Adicionar estado vazio amigável e fallback seguro.',
        });
      }

      auditSecurityVisualText({ text, reporter, area });

      if (/undefined|null|NaN|\[object Object\]/i.test(text)) {
        reporter.addIssue({
          severity: 'P1',
          area,
          title: 'Valor técnico cru apareceu em estado vazio/corrompido',
          impact: 'O aluno pode ver detalhe interno em vez de mensagem amigável.',
          evidence: text.match(/.{0,40}(undefined|null|NaN|\[object Object\]).{0,80}/i)?.[0] || '',
          recommendation: 'Normalizar valores ausentes antes de renderizar.',
        });
      }

      if (tab.id === 'lesson' && !/nenhuma aula|curso|começar aula|aula aberta/i.test(text)) {
        reporter.addIssue({
          severity: 'P2',
          area,
          title: 'Aba Aula sem orientação clara quando não há aula atual',
          impact: 'Aluno novo pode não saber o que fazer para começar.',
          evidence: text.slice(0, 260).replace(/\s+/g, ' '),
          recommendation: 'Exibir mensagem clara: vá para Curso e toque em Começar aula.',
        });
      }

      if (tab.id === 'cards' && !/cartas|flashcards|revis|aula|vocabulário/i.test(text)) {
        reporter.addIssue({
          severity: 'P2',
          area,
          title: 'Aba Cartas sem estado vazio claro',
          impact: 'Aluno pode achar que flashcards quebraram em vez de ainda não existirem.',
          evidence: text.slice(0, 260).replace(/\s+/g, ' '),
          recommendation: 'Explicar que cartas aparecem após estudar aulas/vocabulário.',
        });
      }

      await auditVisualViewport({ page, reporter, area });

      reporter.addCheck({
        area,
        title: 'Aba renderizada em cenário de estado vazio/corrompido sem falha fatal detectada pelo runner',
      });
    }
  });
}
