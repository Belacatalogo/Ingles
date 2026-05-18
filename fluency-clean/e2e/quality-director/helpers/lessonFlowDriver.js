import { expect } from '@playwright/test';
import { navBtn } from './uiAudit.js';

const TECHNICAL_LEAK_PATTERNS = [
  /\bundefined\b/i,
  /\bnull\b/i,
  /\bNaN\b/,
  /\[object Object\]/i,
  /fallback-reading/i,
  /json parse|parse error|syntaxerror/i,
  /lesson\.current|storageMode|indexedDb|stack trace/i,
];

const EARLY_ANSWER_LEAK_PATTERNS = [
  /resposta esperada era/i,
  /modelo:/i,
  /transcript/i,
  /gabarito/i,
  /answer key/i,
  /correct answer/i,
];

export async function seedCurrentLesson(page, lesson) {
  await page.addInitScript((payload) => {
    window.localStorage.setItem(
      'fluency.clean.access.session',
      JSON.stringify({ unlocked: true, method: 'quality-director', at: new Date().toISOString() }),
    );
    window.localStorage.setItem('fluency.clean.lesson.current', JSON.stringify({
      ...payload,
      type: payload.pillar || payload.type,
      provider: 'static',
      generationMeta: {
        id: `quality-director-${payload.id}`,
        source: 'static-curriculum',
        provider: 'static',
        model: 'curated',
        status: 'ready',
        generatedAt: new Date().toISOString(),
        savedAt: new Date().toISOString(),
      },
    }));
  }, lesson);
}

export async function openSeededLesson(page) {
  await page.goto('/');
  await navBtn(page, 'Aula').click();
  const referenceScreen = page.locator('.lesson-reference-screen');
  const flowShell = page.locator('.lesson-flow-shell');
  await expect(referenceScreen.or(flowShell).first()).toBeVisible({ timeout: 10_000 });
}

export async function getCurrentPhaseTitle(page) {
  return page.locator('.lesson-flow-phase-head h2').first().innerText({ timeout: 5000 }).catch(() => '');
}

export async function getPageText(page) {
  return page.locator('body').innerText({ timeout: 8000 }).catch(() => '');
}

export function reportTechnicalLeaks({ text, reporter, area }) {
  TECHNICAL_LEAK_PATTERNS.forEach((pattern) => {
    if (pattern.test(text)) {
      reporter.addIssue({
        severity: 'P1',
        area,
        title: 'Texto técnico vazou durante a jornada da aula',
        impact: 'O aluno pode encontrar detalhes internos do sistema durante o estudo.',
        evidence: `Padrão encontrado: ${pattern}`,
        recommendation: 'Trocar mensagens técnicas por textos amigáveis e revisar estados de erro.',
      });
    }
  });
}

export function reportEarlyAnswerLeaks({ text, reporter, area }) {
  EARLY_ANSWER_LEAK_PATTERNS.forEach((pattern) => {
    if (pattern.test(text)) {
      reporter.addIssue({
        severity: 'P1',
        area,
        title: 'Possível resposta/modelo apareceu antes da tentativa',
        impact: 'O exercício pode perder validade pedagógica se entregar resposta, transcript ou modelo cedo demais.',
        evidence: `Padrão encontrado antes da tentativa: ${pattern}`,
        recommendation: 'Garantir que gabarito, transcript, modelo e resposta esperada só apareçam após tentativa quando a etapa exigir descoberta.',
      });
    }
  });
}

async function fillAttemptIfPresent(page) {
  const input = page.locator('.lesson-phase-input:not([disabled])').first();
  if (await input.isVisible().catch(() => false)) {
    await input.fill('Ana is from Brazil and she is a student.');
    const check = page.getByRole('button', { name: /conferir/i }).first();
    if (await check.isEnabled().catch(() => false)) {
      await check.click();
      return true;
    }
  }

  const textarea = page.locator('.lesson-phase-textarea:not([disabled])').first();
  if (await textarea.isVisible().catch(() => false)) {
    await textarea.fill('Ana is from Brazil. She is a student. Luis is her friend in the English class.');
    const check = page.getByRole('button', { name: /conferir/i }).first();
    if (await check.isEnabled().catch(() => false)) {
      await check.click();
      return true;
    }
  }

  return false;
}

async function chooseOptionIfPresent(page) {
  const option = page.locator('.lesson-phase-choice:not([disabled])').first();
  if (await option.isVisible().catch(() => false)) {
    await option.click();
    return true;
  }
  return false;
}

export async function satisfyCurrentPhase(page, reporter, area) {
  const didAttempt = await fillAttemptIfPresent(page);
  if (didAttempt) return true;

  const didChoose = await chooseOptionIfPresent(page);
  if (didChoose) return true;

  const text = await getPageText(page);
  reportTechnicalLeaks({ text, reporter, area });
  reportEarlyAnswerLeaks({ text, reporter, area });
  return false;
}
