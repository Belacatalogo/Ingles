import fs from 'node:fs';
import path from 'node:path';

const SCREENSHOT_ROOT = path.join(process.cwd(), 'audit-results', 'screenshots');

function safeName(value) {
  return String(value || 'screen')
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);
}

export function ensureScreenshotDir() {
  fs.mkdirSync(SCREENSHOT_ROOT, { recursive: true });
}

export async function captureEvidence(page, name) {
  ensureScreenshotDir();
  const fileName = `${safeName(name)}.png`;
  const filePath = path.join(SCREENSHOT_ROOT, fileName);
  await page.screenshot({ path: filePath, fullPage: true });
  return path.relative(process.cwd(), filePath);
}

async function box(locator) {
  try {
    if (!(await locator.count())) return null;
    const first = locator.first();
    if (!(await first.isVisible().catch(() => false))) return null;
    return first.boundingBox();
  } catch {
    return null;
  }
}

async function allBoxes(locator, limit = 25) {
  const result = [];
  const count = Math.min(await locator.count().catch(() => 0), limit);
  for (let index = 0; index < count; index += 1) {
    const item = locator.nth(index);
    if (!(await item.isVisible().catch(() => false))) continue;
    const b = await item.boundingBox().catch(() => null);
    if (b) result.push({ index, box: b, text: await item.innerText().catch(() => '') });
  }
  return result;
}

function isSmallLegacyViewport(viewport) {
  return viewport.width <= 375 || viewport.height <= 700;
}

export async function auditVisualViewport({ page, reporter, area }) {
  const viewport = page.viewportSize() || { width: 390, height: 844 };
  const bodyText = await page.locator('body').innerText({ timeout: 8000 }).catch(() => '');
  const screenshotPath = await captureEvidence(page, area);

  reporter.addCheck({ area, title: `Screenshot capturado: ${screenshotPath}` });

  if (!bodyText.trim()) {
    reporter.addIssue({ severity: 'P0', area, title: 'Tela sem texto visível', impact: 'Pode indicar tela branca ou renderização quebrada.', evidence: screenshotPath, recommendation: 'Verificar carregamento da tela e estados vazios.' });
  }

  const bottomNavBox = await box(page.locator('.bottom-nav, .reference-bottom-nav'));
  if (!bottomNavBox) {
    reporter.addIssue({ severity: 'P1', area, title: 'Bottom navigation não visível', impact: 'O aluno pode ficar sem navegação principal no mobile.', evidence: screenshotPath, recommendation: 'Garantir que a navegação inferior apareça e respeite safe-area.' });
  } else if (bottomNavBox.y + bottomNavBox.height > viewport.height + 8) {
    reporter.addIssue({ severity: 'P1', area, title: 'Bottom navigation extrapola a viewport', impact: 'A navegação pode ficar cortada ou difícil de tocar.', evidence: `${screenshotPath}; nav=${JSON.stringify(bottomNavBox)} viewport=${JSON.stringify(viewport)}`, recommendation: 'Revisar posição fixa, safe-area e altura da bottom nav.' });
  }

  const headingBox = await box(page.locator('h1, h2').first());
  if (headingBox && headingBox.x < -1) {
    reporter.addIssue({ severity: 'P1', area, title: 'Título principal cortado à esquerda', impact: 'A tela pode parecer quebrada ou mal alinhada.', evidence: `${screenshotPath}; heading=${JSON.stringify(headingBox)}`, recommendation: 'Revisar padding lateral e overflow horizontal.' });
  }

  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  if (scrollWidth > viewport.width + 4) {
    reporter.addIssue({ severity: 'P1', area, title: 'Overflow horizontal detectado', impact: 'O aluno pode ver conteúdo cortado ou rolagem lateral no mobile.', evidence: `${screenshotPath}; scrollWidth=${scrollWidth}; viewportWidth=${viewport.width}`, recommendation: 'Verificar cards, pre, tabelas, botões largos e textos sem quebra.' });
  }

  const buttons = await allBoxes(page.getByRole('button'), 35);
  // Botoes dentro de paineis dev (.lesson-preview-lab-card) nao sao
  // expostos ao aluno em producao — nao contam como touch target.
  const devButtonTexts = new Set(
    await page.locator('.lesson-preview-lab-card button').evaluateAll(
      (els) => els.map((el) => String(el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 200))
    ).catch(() => [])
  );
  buttons.forEach((item) => {
    const phantomOffscreen = !String(item.text || '').trim() && (item.box.y + item.box.height) <= 0;
    if (phantomOffscreen) return;
    if (devButtonTexts.has(String(item.text || '').trim().slice(0, 200))) return;
    if (item.box.width < 36 || item.box.height < 36) {
      reporter.addIssue({ severity: 'P2', area, title: 'Botão com área de toque pequena', impact: 'No iPhone, o aluno pode ter dificuldade para tocar com precisão.', evidence: `${screenshotPath}; botão=${item.text.slice(0, 80)}; box=${JSON.stringify(item.box)}`, recommendation: 'Preferir botões com área mínima próxima de 44x44px em mobile.' });
    }
  });

  const cards = await allBoxes(page.locator('.card, .lesson-flow-phase-card, .lesson-reference-hero, .dashboard-card'), 20);
  cards.forEach((item) => {
    if (item.box.width > viewport.width + 4) {
      reporter.addIssue({ severity: 'P1', area, title: 'Card mais largo que a viewport', impact: 'Conteúdo pode ficar cortado no mobile.', evidence: `${screenshotPath}; card=${JSON.stringify(item.box)} viewport=${JSON.stringify(viewport)}`, recommendation: 'Revisar max-width, padding, overflow e break-word.' });
    }
    if (item.box.height > viewport.height * 1.65) {
      reporter.addIssue({ severity: 'P2', area, title: 'Card muito alto para leitura mobile', impact: 'A tela pode parecer pesada e cansativa no iPhone.', evidence: `${screenshotPath}; card height=${item.box.height}; viewport height=${viewport.height}`, recommendation: 'Dividir conteúdo em seções menores ou compactar visualmente sem cortar conteúdo.' });
    }
  });

  const fixedFooterOverlap = bottomNavBox
    ? await page.evaluate((nav) => {
        const elements = [...document.querySelectorAll('button, input, textarea, .lesson-flow-action-footer, .lesson-phase-primary')];
        const offenders = [];
        elements.forEach((el) => {
          if (el.disabled || el.getAttribute('aria-disabled') === 'true') return;
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) return;
          if (el.closest('.bottom-nav') || el.closest('.reference-bottom-nav')) return;
          const overlapPx = Math.max(0, Math.min(rect.bottom, nav.y + nav.height) - Math.max(rect.top, nav.y));
          const elementHeight = rect.bottom - rect.top;
          if (overlapPx > elementHeight * 0.5) {
            offenders.push({
              tag: el.tagName,
              className: typeof el.className === 'string' ? el.className : '',
              text: String(el.innerText || el.getAttribute('aria-label') || el.getAttribute('placeholder') || '').replace(/\s+/g, ' ').trim().slice(0, 120),
              rect: { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height), bottom: Math.round(rect.bottom) },
              overlapPx: Math.round(overlapPx),
              overlapRatio: Number((overlapPx / elementHeight).toFixed(2)),
            });
          }
        });
        return offenders.length ? { nav, offenders: offenders.slice(0, 5) } : null;
      }, bottomNavBox)
    : null;

  if (fixedFooterOverlap) {
    const smallLegacyOnly = isSmallLegacyViewport(viewport);
    reporter.addIssue({
      severity: smallLegacyOnly ? 'P2' : 'P1',
      area,
      title: smallLegacyOnly ? 'Compatibilidade iPhone SE: elemento próximo da bottom nav' : 'Elemento interativo sobreposto pela bottom nav',
      impact: smallLegacyOnly ? 'Em telas muito pequenas, um card pode ficar próximo da navegação inferior; no iPhone 13 o fluxo principal está preservado.' : 'O aluno pode não conseguir tocar em botões ou campos próximos do rodapé.',
      evidence: `${screenshotPath}; overlap=${JSON.stringify(fixedFooterOverlap)}`,
      recommendation: smallLegacyOnly ? 'Manter como compatibilidade P2 para telas legadas pequenas; priorizar iPhone 13 como dispositivo real do usuário.' : 'Adicionar padding-bottom/safe-area nas telas com conteúdo rolável ou remover o elemento da faixa fixa inferior.',
    });
  }

  return screenshotPath;
}
