const RAW_OR_TECHNICAL_PATTERNS = [
  { pattern: /\[object Object\]/i, severity: 'P0', title: 'Objeto bruto apareceu para o aluno' },
  { pattern: /\bundefined\b/i, severity: 'P0', title: 'Valor undefined apareceu para o aluno' },
  { pattern: /\bnull\b/i, severity: 'P0', title: 'Valor null apareceu para o aluno' },
  { pattern: /\bNaN\b/, severity: 'P0', title: 'Valor NaN apareceu para o aluno' },
  { pattern: /SyntaxError|JSON parse|Unexpected token|stack trace|runtime error/i, severity: 'P0', title: 'Erro técnico apareceu para o aluno' },
  { pattern: /lesson\.current|progress\.summary|mastery\.skillProfile|localStorage|indexedDB/i, severity: 'P1', title: 'Nome interno do sistema apareceu para o aluno' },
  { pattern: /api[_ -]?key|secret|bearer token|access token/i, severity: 'P0', title: 'Texto sensível/técnico apareceu para o aluno' },
  { pattern: /lorem ipsum|todo:|coming soon/i, severity: 'P1', title: 'Placeholder apareceu para o aluno' },
];

const DEAD_END_PATTERNS = [
  /não foi possível continuar/i,
  /erro ao renderizar/i,
  /algo deu errado/i,
  /falha ao carregar/i,
  /tente novamente mais tarde/i,
];

export async function getVisibleText(page) {
  return page.locator('body').innerText({ timeout: 8000 }).catch(() => '');
}

export async function assertNoTechnicalLeak({ page, reporter, area }) {
  const text = await getVisibleText(page);
  RAW_OR_TECHNICAL_PATTERNS.forEach((rule) => {
    if (rule.pattern.test(text)) {
      reporter.addIssue({
        severity: rule.severity,
        area,
        title: rule.title,
        impact: 'Erro visível ao aluno durante uso normal do sistema.',
        evidence: rule.pattern.toString(),
        recommendation: 'Normalizar dados, remover placeholders e trocar detalhes técnicos por mensagens amigáveis.',
      });
    }
  });
}

export async function assertNoDeadEnd({ page, reporter, area }) {
  const text = await getVisibleText(page);
  DEAD_END_PATTERNS.forEach((pattern) => {
    if (pattern.test(text)) {
      const hasRecoveryAction = /voltar|tentar novamente|curso|começar|continuar|recarregar/i.test(text);
      reporter.addIssue({
        severity: hasRecoveryAction ? 'P1' : 'P0',
        area,
        title: 'Possível beco sem saída para o aluno',
        impact: 'O aluno pode ficar travado sem caminho claro para continuar estudando.',
        evidence: pattern.toString(),
        recommendation: 'Adicionar ação de recuperação clara e evitar mensagens genéricas sem saída.',
      });
    }
  });
}

export async function assertLayoutSanity({ page, reporter, area }) {
  const result = await page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const scrollWidth = document.documentElement.scrollWidth;
    const buttons = [...document.querySelectorAll('button')].map((button) => {
      const rect = button.getBoundingClientRect();
      return {
        text: String(button.innerText || button.getAttribute('aria-label') || '').trim().slice(0, 80),
        disabled: button.disabled || button.getAttribute('aria-disabled') === 'true',
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      };
    }).filter((button) => button.width > 0 && button.height > 0);
    const offscreenButtons = buttons.filter((button) => button.x < -4 || button.x + button.width > viewportWidth + 4);
    const tinyButtons = buttons.filter((button) => !button.disabled && (button.width < 32 || button.height < 32));
    const visibleText = String(document.body.innerText || '').trim();
    return { viewportWidth, viewportHeight, scrollWidth, offscreenButtons, tinyButtons, visibleTextLength: visibleText.length };
  });

  if (result.visibleTextLength < 20) {
    reporter.addIssue({
      severity: 'P0',
      area,
      title: 'Tela quase sem conteúdo visível',
      impact: 'Pode ser tela branca, renderização quebrada ou estado vazio ruim.',
      evidence: `visibleTextLength=${result.visibleTextLength}`,
      recommendation: 'Criar estado vazio amigável ou corrigir renderização.',
    });
  }

  if (result.scrollWidth > result.viewportWidth + 4) {
    reporter.addIssue({
      severity: 'P1',
      area,
      title: 'Overflow horizontal detectado',
      impact: 'Conteúdo pode ficar cortado no celular.',
      evidence: `scrollWidth=${result.scrollWidth}; viewportWidth=${result.viewportWidth}`,
      recommendation: 'Revisar largura de cards, botões, listas, textos e stepper.',
    });
  }

  if (result.offscreenButtons.length) {
    reporter.addIssue({
      severity: 'P1',
      area,
      title: 'Botão interativo fora da tela',
      impact: 'Aluno pode não conseguir acessar uma ação importante.',
      evidence: JSON.stringify(result.offscreenButtons.slice(0, 3)),
      recommendation: 'Ajustar layout responsivo e evitar botões cortados.',
    });
  }

  if (result.tinyButtons.length > 3) {
    reporter.addIssue({
      severity: 'P2',
      area,
      title: 'Muitos botões com área de toque pequena',
      impact: 'Uso no celular fica impreciso e frustrante.',
      evidence: JSON.stringify(result.tinyButtons.slice(0, 5)),
      recommendation: 'Aumentar área mínima de toque em botões móveis.',
    });
  }
}

export async function assertLessonFlowSanity({ page, reporter, area }) {
  const isLesson = await page.locator('.lesson-flow-shell').isVisible().catch(() => false);
  if (!isLesson) return;

  const hasMainAction = await page.getByRole('button', { name: /continuar|concluir|conferir|voltar/i }).first().isVisible().catch(() => false);
  if (!hasMainAction) {
    reporter.addIssue({
      severity: 'P0',
      area,
      title: 'Aula sem ação principal visível',
      impact: 'Aluno pode ficar preso dentro da aula.',
      recommendation: 'Toda fase precisa ter ação principal clara.',
    });
  }

  const stepper = page.locator('.lesson-flow-stepper');
  if (await stepper.isVisible().catch(() => false)) {
    const result = await stepper.locator('button').evaluateAll((buttons) => {
      const activeIndex = buttons.findIndex((button) => button.getAttribute('aria-current') === 'step');
      return buttons.map((button, index) => ({
        index,
        activeIndex,
        disabled: button.disabled || button.getAttribute('aria-disabled') === 'true',
        text: String(button.innerText || '').trim(),
      }));
    }).catch(() => []);
    result.filter((item) => item.activeIndex >= 0 && item.index > item.activeIndex).forEach((item) => {
      if (!item.disabled) {
        reporter.addIssue({
          severity: 'P0',
          area,
          title: 'Etapa futura clicável no fluxo de aula',
          impact: 'Aluno pode pular conteúdo antes de concluir a etapa atual.',
          evidence: JSON.stringify(item),
          recommendation: 'Bloquear etapas futuras e permitir apenas revisão de etapas anteriores.',
        });
      }
    });
  }
}

export async function assertCourseProgressionSanity({ page, reporter, area }) {
  const isCourse = await page.locator('.course-lesson-list-card').isVisible().catch(() => false);
  if (!isCourse) return;

  const readyRows = await page.locator('.course-lesson-row.ready').count().catch(() => 0);
  const stateTexts = await page.locator('.course-lesson-state').allInnerTexts().catch(() => []);
  const availableTextCount = stateTexts.filter((text) => /disponível|próxima/i.test(text)).length;

  if (readyRows > 1 || availableTextCount > 1) {
    reporter.addIssue({
      severity: 'P0',
      area,
      title: 'Mais de uma aula liberada no Curso',
      impact: 'Aluno pode estudar fora da sequência pedagógica planejada.',
      evidence: `readyRows=${readyRows}; stateTexts=${stateTexts.join(' | ')}`,
      recommendation: 'Apenas a próxima aula deve aparecer como liberada. Futuras devem ficar bloqueadas.',
    });
  }
}

export async function assertInteractiveElementsHavePurpose({ page, reporter, area }) {
  const result = await page.evaluate(() => [...document.querySelectorAll('button, a, input, textarea')].map((el) => {
    const rect = el.getBoundingClientRect();
    const visible = rect.width > 0 && rect.height > 0;
    const name = String(el.innerText || el.getAttribute('aria-label') || el.getAttribute('placeholder') || el.getAttribute('title') || '').trim();
    return { tag: el.tagName, visible, name, type: el.getAttribute('type') || '', width: rect.width, height: rect.height };
  }).filter((item) => item.visible));

  const unnamed = result.filter((item) => !item.name && item.tag !== 'INPUT').slice(0, 8);
  if (unnamed.length) {
    reporter.addIssue({
      severity: 'P1',
      area,
      title: 'Elemento interativo sem nome/propósito visível',
      impact: 'Pode confundir aluno e prejudicar acessibilidade.',
      evidence: JSON.stringify(unnamed),
      recommendation: 'Adicionar texto, aria-label ou título claro aos elementos interativos.',
    });
  }
}

export async function runStudentExperienceInvariants({ page, reporter, area }) {
  await assertNoTechnicalLeak({ page, reporter, area });
  await assertNoDeadEnd({ page, reporter, area });
  await assertLayoutSanity({ page, reporter, area });
  await assertLessonFlowSanity({ page, reporter, area });
  await assertCourseProgressionSanity({ page, reporter, area });
  await assertInteractiveElementsHavePurpose({ page, reporter, area });
}
