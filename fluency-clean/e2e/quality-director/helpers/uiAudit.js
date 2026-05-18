import { expect } from '@playwright/test';
import { QUALITY_BUTTON_PATTERNS, QUALITY_FORBIDDEN_PATTERNS } from './appMap.js';

export function navBtn(page, label) {
  return page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('button', { name: label });
}

export async function unlockApp(page) {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      'fluency.clean.access.session',
      JSON.stringify({ unlocked: true, method: 'quality-director', at: new Date().toISOString() }),
    );
  });
}

export async function clickTab(page, label) {
  const button = navBtn(page, label);
  await button.scrollIntoViewIfNeeded();
  await button.click();
}

export async function collectVisibleText(page) {
  return page.locator('body').innerText({ timeout: 8000 });
}

export async function checkForbiddenText({ text, reporter, area }) {
  for (const rule of QUALITY_FORBIDDEN_PATTERNS) {
    if (rule.pattern.test(text)) {
      reporter.addIssue({
        severity: /api|secret|token/i.test(rule.reason) ? 'P0' : 'P1',
        area,
        title: 'Texto proibido ou técnico apareceu na interface',
        impact: 'O aluno pode perder confiança no sistema ou ver detalhes técnicos que não deveriam aparecer.',
        evidence: rule.reason,
        recommendation: 'Remover o texto técnico da UI e substituir por mensagem amigável ao aluno.',
      });
    }
  }
}

export async function checkExpectedText({ page, expectedTexts, reporter, area }) {
  const text = await collectVisibleText(page);
  const hasExpectedText = expectedTexts.some((pattern) => pattern.test(text));
  if (!hasExpectedText) {
    reporter.addIssue({
      severity: 'P1',
      area,
      title: 'Tela abriu sem texto principal esperado',
      impact: 'A aba pode estar vazia, quebrada ou pouco clara para o aluno.',
      evidence: text.slice(0, 260).replace(/\s+/g, ' '),
      recommendation: 'Revisar conteúdo inicial, estado vazio e renderização da aba.',
    });
  }
  await checkForbiddenText({ text, reporter, area });
}

export async function checkVisibleMainButtons({ page, reporter, area }) {
  const buttons = await page.getByRole('button').all();
  let meaningfulButtons = 0;

  for (const button of buttons.slice(0, 30)) {
    const name = (await button.textContent().catch(() => ''))?.trim() || '';
    const aria = (await button.getAttribute('aria-label').catch(() => '')) || '';
    const label = `${name} ${aria}`.trim();
    if (QUALITY_BUTTON_PATTERNS.some((pattern) => pattern.test(label))) {
      meaningfulButtons += 1;
    }
  }

  if (meaningfulButtons === 0) {
    reporter.addIssue({
      severity: 'P2',
      area,
      title: 'Nenhum botão principal claro encontrado',
      impact: 'A tela pode parecer passiva ou confusa para o aluno.',
      recommendation: 'Garantir CTA claro para ação principal da aba quando aplicável.',
    });
  }
}

export async function checkTabStartsAtTop({ page, reporter, area }) {
  const y = await page.evaluate(() => window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0);
  if (y > 8) {
    reporter.addIssue({
      severity: 'P1',
      area,
      title: 'Aba não iniciou no topo',
      impact: 'O aluno entra em uma nova aba no meio da tela anterior, causando sensação de bug.',
      evidence: `scrollY=${y}`,
      fileHint: 'fluency-clean/src/hooks/useScrollToTopOnChange.js',
      recommendation: 'Revisar o reset global de scroll em trocas de aba e possíveis containers com overflow próprio.',
    });
  }
}

export async function auditTab({ page, tab, reporter }) {
  await clickTab(page, tab.label);
  await page.waitForTimeout(250);
  await expect(navBtn(page, tab.label)).toBeVisible();
  await checkTabStartsAtTop({ page, reporter, area: `Aba ${tab.label}` });
  await checkExpectedText({ page, expectedTexts: tab.expectedTexts, reporter, area: `Aba ${tab.label}` });
  await checkVisibleMainButtons({ page, reporter, area: `Aba ${tab.label}` });

  reporter.addCheck({
    area: `Aba ${tab.label}`,
    title: 'Aba abriu, renderizou texto e passou pelos checks iniciais',
  });
}
