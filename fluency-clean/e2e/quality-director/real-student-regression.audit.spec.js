import { test, expect } from '@playwright/test';
import { findStaticLesson } from '../../src/content/curriculum/index.js';
import { AuditReporter } from './helpers/auditReporter.js';
import { clickTab, unlockApp } from './helpers/uiAudit.js';
import { getPageText, openSeededLesson, seedCurrentLesson } from './helpers/lessonFlowDriver.js';

const LESSON_ID = 'A1-GRAMMAR-001';
const BAD_TEXTS = ['[object Object]', 'undefined', 'null', 'NaN'];

test.describe.configure({ mode: 'serial' });

let reporter;

test.beforeEach(async ({ page }, testInfo) => {
  reporter = reporter || new AuditReporter({
    name: 'quality-director-real-student-regression',
    projectName: testInfo.project.name,
  });
});

test.afterAll(() => {
  reporter?.write();
});

async function checkBadVisibleText(page, area) {
  const text = await getPageText(page);
  BAD_TEXTS.forEach((bad) => {
    if (text.includes(bad)) {
      reporter.addIssue({
        severity: 'P0',
        area,
        title: `Texto técnico visível para o aluno: ${bad}`,
        impact: 'Este erro aparece diretamente na tela e quebra a confiança do aluno.',
        evidence: bad,
        recommendation: 'Normalizar renderizadores para nunca exibir objetos ou valores técnicos como texto.',
      });
    }
  });
}

test('Real Student Regression: aula não pode vazar textos técnicos enquanto avança', async ({ page }) => {
  const lesson = findStaticLesson(LESSON_ID);
  await seedCurrentLesson(page, lesson);
  await openSeededLesson(page);
  await expect(page.locator('.lesson-flow-shell')).toBeVisible({ timeout: 10000 });

  for (let step = 0; step < 6; step += 1) {
    await checkBadVisibleText(page, `Aluno real · ${LESSON_ID} · etapa ${step + 1}`);
    const continueButton = page.getByRole('button', { name: /continuar/i }).last();
    if (!(await continueButton.isVisible().catch(() => false))) break;
    await continueButton.click();
    await page.waitForTimeout(250);
  }

  reporter.addCheck({ area: `Aluno real · ${LESSON_ID}`, title: 'Aula inspecionada contra textos técnicos visíveis' });
});

test('Real Student Regression: stepper não pode pular para etapa futura', async ({ page }) => {
  const lesson = findStaticLesson(LESSON_ID);
  await seedCurrentLesson(page, lesson);
  await openSeededLesson(page);
  await expect(page.locator('.lesson-flow-stepper')).toBeVisible({ timeout: 10000 });

  const initialTitle = await page.locator('.lesson-flow-phase-head h2').first().innerText();
  const buttons = page.locator('.lesson-flow-stepper button');
  const count = await buttons.count();

  if (count < 3) {
    reporter.addIssue({ severity: 'P1', area: 'Aluno real · stepper', title: 'Stepper tem poucas etapas para validar avanço bloqueado', impact: 'O auditor não conseguiu validar o bloqueio de etapas futuras.', recommendation: 'Garantir múltiplas etapas no fluxo guiado da aula.' });
    return;
  }

  const futureButton = buttons.nth(2);
  const disabled = await futureButton.isDisabled().catch(() => false);
  const ariaDisabled = await futureButton.getAttribute('aria-disabled').catch(() => '');
  const afterTitle = await page.locator('.lesson-flow-phase-head h2').first().innerText();

  if (!disabled && ariaDisabled !== 'true') {
    reporter.addIssue({ severity: 'P0', area: 'Aluno real · stepper', title: 'Etapa futura aparece clicável no stepper', impact: 'O aluno pode pular partes da aula antes de terminar a página atual.', evidence: `disabled=${disabled}; aria-disabled=${ariaDisabled}`, recommendation: 'Desabilitar visualmente e funcionalmente botões de etapas futuras.' });
  }

  if (afterTitle !== initialTitle) {
    reporter.addIssue({ severity: 'P0', area: 'Aluno real · stepper', title: 'Clique em etapa futura mudou a fase atual', impact: 'O aluno consegue pular a sequência pedagógica da aula.', evidence: `antes=${initialTitle}; depois=${afterTitle}`, recommendation: 'Bloquear o onClick de etapas futuras e permitir apenas voltar/revisar.' });
  }

  reporter.addCheck({ area: 'Aluno real · stepper', title: 'Stepper validado contra pulo de etapa futura' });
});

test('Real Student Regression: Curso não pode mostrar múltiplas aulas disponíveis', async ({ page }) => {
  await unlockApp(page);
  await page.goto('/');
  await clickTab(page, 'Curso');
  await expect(page.locator('.course-lesson-list-card')).toBeVisible({ timeout: 10000 });

  const readyCount = await page.locator('.course-lesson-row.ready').count();
  const stateTexts = await page.locator('.course-lesson-state').allInnerTexts().catch(() => []);
  const availableTextCount = stateTexts.filter((text) => /disponível|próxima/i.test(text)).length;

  if (readyCount > 1 || availableTextCount > 1) {
    reporter.addIssue({ severity: 'P0', area: 'Aluno real · Curso', title: 'Curso mostra múltiplas aulas disponíveis ao mesmo tempo', impact: 'O aluno consegue estudar fora da sequência guiada.', evidence: `ready=${readyCount}; estados=${stateTexts.join(' | ')}`, recommendation: 'Exibir apenas a próxima aula como liberada e bloquear as demais.' });
  }

  reporter.addCheck({ area: 'Aluno real · Curso', title: `Curso validado contra múltiplas aulas disponíveis: ${readyCount}` });
});
