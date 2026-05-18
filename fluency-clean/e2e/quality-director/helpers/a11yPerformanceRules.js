const DEFAULT_PERFORMANCE_BUDGETS = {
  initialLoadMs: 4500,
  tabSwitchMs: 1200,
  firstContentfulPaintMs: 3500,
  domContentLoadedMs: 3500,
  loadEventMs: 5000,
};

function clean(value) {
  return String(value ?? '').trim().replace(/\s+/g, ' ');
}

async function visibleElements(page, selector, limit = 80) {
  const locator = page.locator(selector);
  const count = Math.min(await locator.count().catch(() => 0), limit);
  const result = [];
  for (let index = 0; index < count; index += 1) {
    const item = locator.nth(index);
    if (!(await item.isVisible().catch(() => false))) continue;
    const box = await item.boundingBox().catch(() => null);
    if (!box) continue;
    result.push({
      index,
      box,
      text: clean(await item.innerText().catch(() => '')),
      ariaLabel: clean(await item.getAttribute('aria-label').catch(() => '')),
      title: clean(await item.getAttribute('title').catch(() => '')),
      id: clean(await item.getAttribute('id').catch(() => '')),
      type: clean(await item.getAttribute('type').catch(() => '')),
      role: clean(await item.getAttribute('role').catch(() => '')),
      placeholder: clean(await item.getAttribute('placeholder').catch(() => '')),
      disabled: await item.isDisabled().catch(() => false),
    });
  }
  return result;
}

function addIssue(reporter, issue) {
  reporter.addIssue({ severity: 'P2', ...issue });
}

export async function getPerformanceMetrics(page) {
  return page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')?.[0];
    const paint = performance.getEntriesByType('paint') || [];
    const fcp = paint.find((entry) => entry.name === 'first-contentful-paint');
    return {
      now: Math.round(performance.now()),
      domContentLoadedMs: nav ? Math.round(nav.domContentLoadedEventEnd - nav.startTime) : null,
      loadEventMs: nav ? Math.round(nav.loadEventEnd - nav.startTime) : null,
      firstContentfulPaintMs: fcp ? Math.round(fcp.startTime) : null,
      resourceCount: performance.getEntriesByType('resource')?.length || 0,
    };
  });
}

export function auditPerformanceMetrics({ metrics, elapsedMs, reporter, area, budgets = DEFAULT_PERFORMANCE_BUDGETS }) {
  if (elapsedMs > budgets.initialLoadMs) {
    addIssue(reporter, {
      severity: 'P1',
      area,
      title: 'Carregamento inicial acima do orçamento',
      impact: 'O aluno pode sentir o app lento ao abrir para estudar.',
      evidence: `${elapsedMs}ms; orçamento ${budgets.initialLoadMs}ms`,
      recommendation: 'Investigar bundle, render inicial, imports pesados e chamadas síncronas.',
    });
  }

  if (metrics.domContentLoadedMs !== null && metrics.domContentLoadedMs > budgets.domContentLoadedMs) {
    addIssue(reporter, {
      severity: 'P2',
      area,
      title: 'DOMContentLoaded acima do orçamento',
      impact: 'A tela pode demorar para ficar pronta em aparelhos mais fracos.',
      evidence: `${metrics.domContentLoadedMs}ms; orçamento ${budgets.domContentLoadedMs}ms`,
      recommendation: 'Revisar carregamento inicial e tarefas bloqueantes.',
    });
  }

  if (metrics.firstContentfulPaintMs !== null && metrics.firstContentfulPaintMs > budgets.firstContentfulPaintMs) {
    addIssue(reporter, {
      severity: 'P2',
      area,
      title: 'First Contentful Paint acima do orçamento',
      impact: 'O aluno pode ver demora antes do primeiro conteúdo útil.',
      evidence: `${metrics.firstContentfulPaintMs}ms; orçamento ${budgets.firstContentfulPaintMs}ms`,
      recommendation: 'Otimizar conteúdo inicial e CSS crítico.',
    });
  }
}

export async function auditA11yBasics({ page, reporter, area }) {
  const buttons = await visibleElements(page, 'button', 120);
  buttons.forEach((button) => {
    const accessibleName = clean(`${button.text} ${button.ariaLabel} ${button.title}`);
    if (!button.disabled && !accessibleName) {
      addIssue(reporter, {
        severity: 'P1',
        area,
        title: 'Botão visível sem nome acessível',
        impact: 'Leitores de tela e auditorias de acessibilidade não entendem a ação do botão.',
        evidence: `button index=${button.index}; box=${JSON.stringify(button.box)}`,
        recommendation: 'Adicionar texto visível ou aria-label descritivo.',
      });
    }
  });

  const inputs = await visibleElements(page, 'input, textarea, select', 80);
  for (const input of inputs) {
    const hasName = clean(`${input.ariaLabel} ${input.placeholder} ${input.title}`);
    const labelText = input.id
      ? clean(await page.locator(`label[for="${input.id}"]`).first().innerText().catch(() => ''))
      : '';
    if (!hasName && !labelText) {
      addIssue(reporter, {
        severity: 'P1',
        area,
        title: 'Campo de entrada sem label/nome acessível',
        impact: 'Aluno com leitor de tela pode não saber o que preencher.',
        evidence: `input index=${input.index}; type=${input.type}; box=${JSON.stringify(input.box)}`,
        recommendation: 'Adicionar label, aria-label ou placeholder claro.',
      });
    }
  }

  const dialogs = await visibleElements(page, '[role="dialog"], .modal, .diagnostic-overlay, .diagnostic-sheet', 20);
  dialogs.forEach((dialog) => {
    const named = clean(`${dialog.ariaLabel} ${dialog.text.slice(0, 80)}`);
    if (!named) {
      addIssue(reporter, {
        severity: 'P2',
        area,
        title: 'Modal/dialog sem nome perceptível',
        impact: 'Acessibilidade e navegação por assistente podem ficar confusas.',
        evidence: `dialog index=${dialog.index}; box=${JSON.stringify(dialog.box)}`,
        recommendation: 'Adicionar role="dialog" com aria-label/aria-labelledby e título claro.',
      });
    }
  });

  const images = await visibleElements(page, 'img', 50);
  images.forEach((image) => {
    const alt = clean(image.ariaLabel || image.title);
    if (!alt) {
      addIssue(reporter, {
        severity: 'P3',
        area,
        title: 'Imagem visível sem descrição alternativa aparente',
        impact: 'Pode prejudicar acessibilidade se a imagem transmitir informação.',
        evidence: `img index=${image.index}; box=${JSON.stringify(image.box)}`,
        recommendation: 'Adicionar alt em imagens informativas ou marcar decorativas adequadamente.',
      });
    }
  });

  reporter.addCheck({
    area,
    title: `Acessibilidade básica verificada: ${buttons.length} botões, ${inputs.length} campos, ${dialogs.length} dialogs, ${images.length} imagens`,
  });
}

export async function auditKeyboardFocusBasics({ page, reporter, area }) {
  await page.keyboard.press('Tab');
  await page.waitForTimeout(80);
  const firstFocus = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const rect = el.getBoundingClientRect();
    return {
      tag: el.tagName,
      text: String(el.innerText || el.getAttribute('aria-label') || el.getAttribute('placeholder') || '').trim().slice(0, 100),
      box: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
    };
  });

  if (!firstFocus) {
    addIssue(reporter, {
      severity: 'P2',
      area,
      title: 'Primeiro Tab não focou elemento interativo',
      impact: 'Navegação por teclado pode estar fraca ou invisível.',
      recommendation: 'Garantir ordem de foco em botões/links principais.',
    });
  } else {
    reporter.addCheck({
      area,
      title: `Primeiro foco por teclado detectado em ${firstFocus.tag}: ${firstFocus.text || 'sem texto'}`,
    });
  }
}

export async function auditTabSwitchPerformance({ page, reporter, area, action, budgetMs = DEFAULT_PERFORMANCE_BUDGETS.tabSwitchMs }) {
  const started = Date.now();
  await action();
  await page.waitForTimeout(120);
  const elapsed = Date.now() - started;
  if (elapsed > budgetMs) {
    addIssue(reporter, {
      severity: 'P2',
      area,
      title: 'Troca/ação de tela acima do orçamento',
      impact: 'Navegação pode parecer lenta no uso diário.',
      evidence: `${elapsed}ms; orçamento ${budgetMs}ms`,
      recommendation: 'Investigar renderizações pesadas e cálculos síncronos ao trocar de aba.',
    });
  }
  reporter.addCheck({ area, title: `Tempo de ação medido: ${elapsed}ms` });
  return elapsed;
}

export async function auditTechnicalQualitySignals({ page, reporter, area }) {
  const result = await page.evaluate(() => {
    const all = [...document.querySelectorAll('*')];
    const duplicatedIds = [];
    const ids = new Set();
    all.forEach((el) => {
      if (!el.id) return;
      if (ids.has(el.id)) duplicatedIds.push(el.id);
      ids.add(el.id);
    });
    const hugeDom = all.length;
    const longTextNodes = [...document.querySelectorAll('p, li, button, h1, h2, h3, span')]
      .map((el) => String(el.textContent || '').trim())
      .filter((text) => text.length > 450)
      .slice(0, 5);
    return { duplicatedIds: [...new Set(duplicatedIds)], nodeCount: hugeDom, longTextNodes };
  });

  if (result.duplicatedIds.length) {
    addIssue(reporter, {
      severity: 'P2',
      area,
      title: 'IDs duplicados no DOM',
      impact: 'Labels, foco, aria-labelledby e testes podem se comportar de forma instável.',
      evidence: result.duplicatedIds.join(', '),
      recommendation: 'Garantir IDs únicos ou remover IDs desnecessários.',
    });
  }

  if (result.nodeCount > 1800) {
    addIssue(reporter, {
      severity: 'P2',
      area,
      title: 'DOM muito grande para uma tela mobile',
      impact: 'Pode afetar performance e fluidez em iPhones mais simples.',
      evidence: `${result.nodeCount} nós`,
      recommendation: 'Revisar renderizações condicionais, listas longas e conteúdo fora da tela.',
    });
  }

  if (result.longTextNodes.length) {
    addIssue(reporter, {
      severity: 'P3',
      area,
      title: 'Texto muito longo em único nó visual',
      impact: 'Pode prejudicar leitura mobile e acessibilidade.',
      evidence: result.longTextNodes.map((text) => text.slice(0, 120)).join(' | '),
      recommendation: 'Dividir textos longos em parágrafos/cards menores quando fizer sentido.',
    });
  }

  reporter.addCheck({
    area,
    title: `Sinais técnicos verificados: ${result.nodeCount} nós DOM`,
  });
}
