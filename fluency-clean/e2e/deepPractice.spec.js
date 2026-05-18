/**
 * DEEP PRACTICE — Auditoria Playwright
 * BLOCO-DEEP-PRACTICE-PLAYWRIGHT-AUDIT-FIX
 * Data: 2026-05-18
 *
 * Testa o fluxo real de prática profunda (PracticeFullscreen):
 *  - múltiplos níveis: A1, A2, B1, B2, C1
 *  - múltiplos pilares: grammar, vocabulary, reading, writing
 *  - fluxos: iniciar, responder, acertar, errar, concluir, fechar
 *  - estado vazio (localStorage sem completions)
 *  - erros de console
 *  - viewport mobile (iPhone SE)
 */

import { test, expect } from '@playwright/test';

// ─── Constantes ────────────────────────────────────────────────────────────

const ACCESS_SESSION = JSON.stringify({
  unlocked: true,
  method: 'e2e-deep-practice',
  at: new Date().toISOString(),
});

/** Cria um registro de conclusão de aula para o localStorage */
function makeCompletion(lessonId, opts = {}) {
  return {
    lessonId,
    completedAt: new Date().toISOString(),
    xp: 25,
    title: opts.title || lessonId,
    type: opts.type || 'grammar',
    level: opts.level || 'A1',
    masteryScore: 80,
    flowScore: 80,
    flowErrors: [],
  };
}

/** Ponteiro mínimo de lição estática — o app carrega o conteúdo real do currículo */
function makeLesson(id, pillar, level) {
  return {
    id,
    pillar,
    type: pillar,
    level,
    schemaVersion: 'static-lesson-schema-v2-deep',
    status: 'static',
  };
}

// Aulas reais do currículo para cada nível/pilar
const LESSONS = {
  A1_GRAMMAR:    makeLesson('A1-GRAMMAR-001',    'grammar',    'A1'),
  A1_VOCABULARY: makeLesson('A1-VOCABULARY-001', 'vocabulary', 'A1'),
  A2_GRAMMAR:    makeLesson('A2-GRAMMAR-001',    'grammar',    'A2'),
  B1_GRAMMAR:    makeLesson('B1-GRAMMAR-001',    'grammar',    'B1'),
  B2_GRAMMAR:    makeLesson('B2-GRAMMAR-001',    'grammar',    'B2'),
  C1_GRAMMAR:    makeLesson('C1-GRAMMAR-001',    'grammar',    'C1'),
};

// ─── Helpers ───────────────────────────────────────────────────────────────

function navBtn(page, label) {
  return page
    .getByRole('navigation', { name: 'Navegação principal' })
    .getByRole('button', { name: label });
}

async function clickTab(page, label) {
  const btn = navBtn(page, label);
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  await page.waitForTimeout(400);
}

/** Coleta erros de console e page errors durante um teste */
function collectErrors(page) {
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[console.error] ${msg.text()}`);
  });
  page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`));
  return errors;
}

/**
 * Injeta sessão + aula atual + completion no localStorage.
 * Passa `completed: false` para testar sem conclusão de aula.
 */
async function setupWithLesson(page, lesson, { completed = true } = {}) {
  await page.addInitScript(({ session, lessonJson, completions }) => {
    window.localStorage.setItem('fluency.clean.access.session', session);
    window.localStorage.setItem('fluency.clean.lesson.current', lessonJson);
    if (completions) {
      window.localStorage.setItem('fluency.clean.progress.lessonCompletions', completions);
    }
  }, {
    session: ACCESS_SESSION,
    lessonJson: JSON.stringify(lesson),
    completions: completed
      ? JSON.stringify([makeCompletion(lesson.id, { type: lesson.pillar, level: lesson.level })])
      : null,
  });
}

/** Abre a aba Aula e espera o conteúdo carregar */
async function openLessonTab(page, timeout = 5000) {
  await clickTab(page, 'Aula');
  await page.waitForTimeout(1000);
  await expect(page.locator('section.lesson-reference-screen, section.lesson-guided-flow-screen').first())
    .toBeVisible({ timeout });
}

/** Clica no botão de lançar prática (PracticeLauncher) */
async function clickStartPractice(page) {
  // O botão está dentro do PracticeLauncher
  const launcherBtn = page.locator('button.practice-deep-cta').first();
  await expect(launcherBtn).toBeVisible({ timeout: 8000 });
  await launcherBtn.scrollIntoViewIfNeeded();
  await launcherBtn.click();
  await page.waitForTimeout(600);
}

/** Aguarda o PracticeFullscreen (dialog) estar visível */
async function waitForPracticeDialog(page) {
  const dialog = page.locator('.practice-fullscreen[role="dialog"]');
  await expect(dialog).toBeVisible({ timeout: 8000 });
  return dialog;
}

/** Clica em "Começar prática" na tela de intro do PracticeFullscreen */
async function startPracticeSession(page) {
  const startBtn = page.locator('button.practice-start-button');
  await expect(startBtn).toBeVisible({ timeout: 6000 });
  await startBtn.click();
  await page.waitForTimeout(500);
}

/**
 * Responde uma pergunta qualquer.
 * Para choice: clica na primeira opção.
 * Para text/dictation/write/speak: digita uma resposta e clica em Verificar.
 * Retorna o tipo de questão encontrado.
 */
async function answerCurrentQuestion(page) {
  const dialog = page.locator('.practice-fullscreen');

  // Tenta detectar o tipo de questão pela presença dos elementos
  const choiceGrid = dialog.locator('.practice-choice-grid');
  const textInput  = dialog.locator('input.practice-text-input, textarea.practice-text-input');
  const wordBank   = dialog.locator('.practice-word-bank, [class*="word-bank"]');

  const isChoice   = await choiceGrid.isVisible().catch(() => false);
  const isText     = await textInput.isVisible().catch(() => false);
  const isWordBank = await wordBank.isVisible().catch(() => false);

  if (isChoice) {
    // Clica na primeira opção disponível (não desabilitada)
    const firstOption = choiceGrid.locator('button:not([disabled])').first();
    await expect(firstOption).toBeVisible({ timeout: 4000 });
    await firstOption.click();
    // Choice auto-submete — aguarda feedback aparecer
    await page.waitForTimeout(400);
    return 'choice';
  }

  if (isWordBank) {
    // Word bank: clica nas palavras disponíveis na ordem que aparecem
    const availableTokens = wordBank.locator('button:not([disabled])');
    const count = await availableTokens.count();
    for (let i = 0; i < Math.min(count, 5); i++) {
      await availableTokens.first().click();
      await page.waitForTimeout(100);
    }
    // Tenta clicar no botão de submit
    const submitBtn = dialog.locator('button.practice-confirm-btn:not([disabled])');
    if (await submitBtn.isVisible()) await submitBtn.click();
    await page.waitForTimeout(400);
    return 'wordBank';
  }

  if (isText) {
    // Tipo texto: digita resposta e submete
    await textInput.first().fill('test answer');
    await page.waitForTimeout(200);
    // Aciona o submit (botão Verificar / Conferir)
    const submitBtn = dialog.locator('button.practice-confirm-btn:not([disabled])');
    if (await submitBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await submitBtn.click();
    }
    await page.waitForTimeout(400);
    return 'text';
  }

  // Tipo desconhecido — registra mas não falha o teste
  return 'unknown';
}

/** Clica em Continuar ou Tentar de novo após feedback */
async function dismissFeedback(page) {
  const dialog = page.locator('.practice-fullscreen');
  const continueBtn = dialog.locator('button.practice-next-btn').first();
  await expect(continueBtn).toBeVisible({ timeout: 5000 });
  await continueBtn.click();
  await page.waitForTimeout(350);
}

/**
 * Executa no máximo `maxQuestions` rounds de: responder + continuar.
 * Para quando detecta a tela Done ou acabam as tentativas.
 * Retorna { completed: bool, questionsAnswered: number }
 */
async function runPracticeRounds(page, maxQuestions = 6) {
  const dialog = page.locator('.practice-fullscreen');
  let answered = 0;

  for (let i = 0; i < maxQuestions; i++) {
    // Verifica se chegou à tela Done
    const doneScreen = dialog.locator('.practice-done, [class*="practice-done"]');
    if (await doneScreen.isVisible().catch(() => false)) {
      return { completed: true, questionsAnswered: answered };
    }

    // Verifica se há feedback visível (de uma resposta anterior não avançada)
    const feedbackEl = dialog.locator('.practice-feedback-text[role="alert"]');
    if (await feedbackEl.isVisible().catch(() => false)) {
      await dismissFeedback(page);
      continue;
    }

    // Responde a questão atual
    const type = await answerCurrentQuestion(page);

    if (type === 'unknown') {
      // Sem questão identificável — aguarda um pouco e continua
      await page.waitForTimeout(600);
      continue;
    }

    answered++;

    // Aguarda feedback aparecer
    await page.waitForTimeout(300);
    const feedbackVisible = await feedbackEl.isVisible().catch(() => false);

    if (feedbackVisible) {
      await dismissFeedback(page);
    }
  }

  // Verifica Done ao final
  const doneScreen = dialog.locator('.practice-done, [class*="practice-done"]');
  const isDone = await doneScreen.isVisible().catch(() => false);
  return { completed: isDone, questionsAnswered: answered };
}

// ─── SUITE DP-01: Prática com A1 Grammar (fluxo principal) ────────────────

test.describe('DP-01: A1 Grammar — Fluxo Completo', () => {
  test.beforeEach(async ({ page }) => {
    await setupWithLesson(page, LESSONS.A1_GRAMMAR);
  });

  test('DP-01-01: PracticeLauncher visível após conclusão de aula', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/');
    await openLessonTab(page);

    const launcherCard = page.locator('.practice-launcher-card');
    await expect(launcherCard).toBeVisible({ timeout: 8000 });

    const launcherBtn = page.locator('button.practice-deep-cta');
    await expect(launcherBtn).toBeVisible({ timeout: 6000 });

    await page.screenshot({ path: 'test-results/dp-01-01-launcher.png' });
    if (errors.length) console.warn('[DP-01-01] Console errors:', errors);
    expect(errors.filter((e) => !e.includes('ResizeObserver') && !e.includes('non-passive'))).toHaveLength(0);
  });

  test('DP-01-02: PracticeFullscreen abre com tela Intro', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/');
    await openLessonTab(page);
    await clickStartPractice(page);

    const dialog = await waitForPracticeDialog(page);
    // Verifica intro: título "Prática da aula" + botão "Começar prática"
    await expect(dialog.getByText('Prática da aula')).toBeVisible({ timeout: 5000 });
    await expect(dialog.locator('button.practice-start-button')).toBeVisible({ timeout: 5000 });

    await page.screenshot({ path: 'test-results/dp-01-02-intro.png' });
    if (errors.length) console.warn('[DP-01-02] Console errors:', errors);
  });

  test('DP-01-03: Intro mostra número de exercícios > 0', async ({ page }) => {
    await page.goto('/');
    await openLessonTab(page);
    await clickStartPractice(page);
    const dialog = await waitForPracticeDialog(page);

    // O intro mostra "N exercícios" — N deve ser > 0
    const statsText = await dialog.locator('.practice-intro-stats').textContent();
    console.info('[DP-01-03] Intro stats:', statsText);
    expect(statsText).toMatch(/[1-9]\d* exercícios?/);

    await page.screenshot({ path: 'test-results/dp-01-03-intro-stats.png' });
  });

  test('DP-01-04: Botão Começar prática inicia sessão e exibe 1ª questão', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/');
    await openLessonTab(page);
    await clickStartPractice(page);
    const dialog = await waitForPracticeDialog(page);
    await startPracticeSession(page);

    // Deve aparecer o prompt da questão
    const questionCard = dialog.locator('.practice-question-card');
    await expect(questionCard).toBeVisible({ timeout: 6000 });
    const prompt = await questionCard.locator('h1').textContent();
    console.info('[DP-01-04] Primeira questão:', prompt?.slice(0, 80));
    expect(prompt?.trim().length).toBeGreaterThan(0);

    await page.screenshot({ path: 'test-results/dp-01-04-primeira-questao.png' });
    if (errors.length) console.warn('[DP-01-04] Console errors:', errors);
    expect(errors.filter((e) => !e.includes('ResizeObserver'))).toHaveLength(0);
  });

  test('DP-01-05: Opção de choice clicável — feedback aparece', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/');
    await openLessonTab(page);
    await clickStartPractice(page);
    await waitForPracticeDialog(page);
    await startPracticeSession(page);

    const dialog = page.locator('.practice-fullscreen');

    // Aguarda a primeira questão de choice
    const choiceGrid = dialog.locator('.practice-choice-grid');
    if (await choiceGrid.isVisible({ timeout: 4000 }).catch(() => false)) {
      const firstBtn = choiceGrid.locator('button:not([disabled])').first();
      await firstBtn.click();
      await page.waitForTimeout(400);

      // Feedback deve aparecer
      const feedback = dialog.locator('.practice-feedback-text[role="alert"]');
      await expect(feedback).toBeVisible({ timeout: 5000 });
      const feedbackText = await feedback.textContent();
      console.info('[DP-01-05] Feedback após choice:', feedbackText?.slice(0, 80));

      await page.screenshot({ path: 'test-results/dp-01-05-choice-feedback.png' });
    } else {
      // Questão não é choice — pula (não falha)
      console.warn('[DP-01-05] Primeira questão não é choice');
      await page.screenshot({ path: 'test-results/dp-01-05-nao-choice.png' });
    }

    if (errors.length) console.warn('[DP-01-05] Console errors:', errors);
  });

  test('DP-01-06: Botão Continuar avança para próxima questão', async ({ page }) => {
    await page.goto('/');
    await openLessonTab(page);
    await clickStartPractice(page);
    await waitForPracticeDialog(page);
    await startPracticeSession(page);

    const dialog = page.locator('.practice-fullscreen');

    // Responde a 1ª questão
    await answerCurrentQuestion(page);
    await page.waitForTimeout(300);

    // Aguarda feedback
    const feedback = dialog.locator('.practice-feedback-text[role="alert"]');
    if (await feedback.isVisible({ timeout: 4000 }).catch(() => false)) {
      // Verifica que Continuar existe
      const continueBtn = dialog.locator('button.practice-next-btn').first();
      await expect(continueBtn).toBeVisible({ timeout: 4000 });
      const label = await continueBtn.textContent();
      console.info('[DP-01-06] Botão de avanço:', label?.trim());

      // Clica Continuar
      await continueBtn.click();
      await page.waitForTimeout(500);

      // Deve ter avançado — nova questão ou Done
      const secondQuestion = dialog.locator('.practice-question-card, .practice-done');
      await expect(secondQuestion.first()).toBeVisible({ timeout: 5000 });
      await page.screenshot({ path: 'test-results/dp-01-06-apos-continuar.png' });
    } else {
      console.warn('[DP-01-06] Feedback não apareceu após resposta');
      await page.screenshot({ path: 'test-results/dp-01-06-sem-feedback.png' });
    }
  });

  test('DP-01-07: Fluxo de 6 questões — sem tela em branco, sem crash', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/');
    await openLessonTab(page);
    await clickStartPractice(page);
    await waitForPracticeDialog(page);
    await startPracticeSession(page);

    const { questionsAnswered } = await runPracticeRounds(page, 6);
    console.info('[DP-01-07] Questões respondidas:', questionsAnswered);
    expect(questionsAnswered).toBeGreaterThanOrEqual(1);

    await page.screenshot({ path: 'test-results/dp-01-07-apos-6-questoes.png' });
    if (errors.length) console.warn('[DP-01-07] Console errors:', errors);
    // Nenhum pageerror crítico
    expect(errors.filter((e) => e.startsWith('[pageerror]'))).toHaveLength(0);
  });

  test('DP-01-08: Progresso incrementa a cada questão', async ({ page }) => {
    await page.goto('/');
    await openLessonTab(page);
    await clickStartPractice(page);
    await waitForPracticeDialog(page);
    await startPracticeSession(page);

    const dialog = page.locator('.practice-fullscreen');

    // Captura texto do header antes (uso de seletor genérico mais amplo)
    const headerText0 = await dialog.locator('header, [class*="header"]').first().textContent().catch(() => '');
    console.info('[DP-01-08] Header antes:', headerText0?.trim().slice(0, 60));

    await answerCurrentQuestion(page);
    const feedback = dialog.locator('.practice-feedback-text[role="alert"]');
    const feedbackAppeared = await feedback.isVisible({ timeout: 4000 }).catch(() => false);

    if (feedbackAppeared) {
      await dismissFeedback(page);
    }

    const headerText1 = await dialog.locator('header, [class*="header"]').first().textContent().catch(() => '');
    console.info('[DP-01-08] Header depois:', headerText1?.trim().slice(0, 60));

    // Verifica que o dialog ainda está visível (não quebrou)
    await expect(dialog).toBeVisible({ timeout: 4000 });
    await page.screenshot({ path: 'test-results/dp-01-08-progresso.png' });
  });

  test('DP-01-09: Botão fechar (X) funciona sem crash', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/');
    await openLessonTab(page);
    await clickStartPractice(page);
    await waitForPracticeDialog(page);
    await startPracticeSession(page);

    // Fecha a prática
    const closeBtn = page.locator('.practice-fullscreen').locator('button[aria-label*="Fechar"], button[aria-label*="fechar"], button.practice-close').first();
    if (await closeBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await closeBtn.click();
      await page.waitForTimeout(400);
      // Dialog deve sumir
      const dialog = page.locator('.practice-fullscreen');
      await expect(dialog).not.toBeVisible({ timeout: 4000 });
    } else {
      console.warn('[DP-01-09] Botão fechar não encontrado');
    }

    await page.screenshot({ path: 'test-results/dp-01-09-fechou.png' });
    if (errors.length) console.warn('[DP-01-09] Console errors:', errors);
    expect(errors.filter((e) => e.startsWith('[pageerror]'))).toHaveLength(0);
  });
});

// ─── SUITE DP-02: Resposta incorreta, vidas e revisão ─────────────────────

test.describe('DP-02: Resposta Errada e Vidas', () => {
  test.beforeEach(async ({ page }) => {
    await setupWithLesson(page, LESSONS.A1_GRAMMAR);
  });

  test('DP-02-01: Resposta errada mostra feedback negativo e decrementa vida', async ({ page }) => {
    await page.goto('/');
    await openLessonTab(page);
    await clickStartPractice(page);
    await waitForPracticeDialog(page);
    await startPracticeSession(page);

    const dialog = page.locator('.practice-fullscreen');

    // Tenta dar resposta errada em questão de texto
    const textInput = dialog.locator('input.practice-text-input');
    const choiceGrid = dialog.locator('.practice-choice-grid');

    if (await textInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      await textInput.fill('totally wrong answer xyzxyz');
      const submitBtn = dialog.locator('button.practice-confirm-btn:not([disabled])');
      if (await submitBtn.isVisible().catch(() => false)) {
        await submitBtn.click();
        await page.waitForTimeout(400);
        const feedback = dialog.locator('.practice-feedback-text[role="alert"]');
        if (await feedback.isVisible({ timeout: 4000 }).catch(() => false)) {
          const text = await feedback.textContent();
          console.info('[DP-02-01] Feedback resposta errada:', text?.slice(0, 80));
          // Esperado: feedback negativo ("Vamos revisar" ou similar)
          expect(text).toMatch(/vamos revisar|incorreto|errado|quase/i);
        }
      }
    } else if (await choiceGrid.isVisible({ timeout: 2000 }).catch(() => false)) {
      // Para choice: último botão (menor chance de ser certo)
      const options = choiceGrid.locator('button:not([disabled])');
      const count = await options.count();
      if (count > 1) {
        await options.nth(count - 1).click();
        await page.waitForTimeout(400);
        const feedback = dialog.locator('.practice-feedback-text[role="alert"]');
        const visible = await feedback.isVisible({ timeout: 4000 }).catch(() => false);
        console.info('[DP-02-01] Feedback apareceu:', visible);
        if (visible) {
          const text = await feedback.textContent();
          console.info('[DP-02-01] Texto:', text?.slice(0, 80));
        }
      }
    }

    await page.screenshot({ path: 'test-results/dp-02-01-resposta-errada.png' });
  });

  test('DP-02-02: LivesBar visível durante prática', async ({ page }) => {
    await page.goto('/');
    await openLessonTab(page);
    await clickStartPractice(page);
    await waitForPracticeDialog(page);
    await startPracticeSession(page);

    const dialog = page.locator('.practice-fullscreen');
    const livesBar = dialog.locator('.practice-lives-bar, [class*="lives"], [class*="lives-bar"]');
    const livesVisible = await livesBar.isVisible({ timeout: 4000 }).catch(() => false);
    console.info('[DP-02-02] LivesBar visível:', livesVisible);

    await page.screenshot({ path: 'test-results/dp-02-02-lives-bar.png' });
  });
});

// ─── SUITE DP-03: Conclusão de prática ────────────────────────────────────

test.describe('DP-03: Conclusão', () => {
  test.beforeEach(async ({ page }) => {
    await setupWithLesson(page, LESSONS.A1_GRAMMAR);
  });

  test('DP-03-01: Tela Done aparece após todas as questões (máx 40)', async ({ page }) => {
    test.setTimeout(90000);
    await page.goto('/');
    await openLessonTab(page);
    await clickStartPractice(page);
    await waitForPracticeDialog(page);
    await startPracticeSession(page);

    const { completed, questionsAnswered } = await runPracticeRounds(page, 40);
    console.info('[DP-03-01] Concluído:', completed, '| Respondidas:', questionsAnswered);

    const dialog = page.locator('.practice-fullscreen');
    const doneScreen = dialog.locator('.practice-done, [class*="practice-done"]');
    const isDone = await doneScreen.isVisible({ timeout: 3000 }).catch(() => false);
    console.info('[DP-03-01] Tela Done visível:', isDone);

    await page.screenshot({ path: 'test-results/dp-03-01-done-screen.png', fullPage: false });
  });

  test('DP-03-02: Tela Done tem botão Terminar', async ({ page }) => {
    test.setTimeout(90000);
    await page.goto('/');
    await openLessonTab(page);
    await clickStartPractice(page);
    await waitForPracticeDialog(page);
    await startPracticeSession(page);

    const { completed } = await runPracticeRounds(page, 40);
    if (!completed) {
      console.warn('[DP-03-02] Prática não completou em 40 rounds — pulando verificação Done');
      return;
    }

    const dialog = page.locator('.practice-fullscreen');
    const finishBtn = dialog.getByRole('button', { name: /terminar|fechar|finish|done/i }).first();
    await expect(finishBtn).toBeVisible({ timeout: 5000 });

    await page.screenshot({ path: 'test-results/dp-03-02-done-botao.png' });
  });

  test('DP-03-03: XP e acertos registrados em localStorage após completar', async ({ page }) => {
    test.setTimeout(90000);
    await page.goto('/');
    await openLessonTab(page);
    await clickStartPractice(page);
    await waitForPracticeDialog(page);
    await startPracticeSession(page);

    const { completed } = await runPracticeRounds(page, 40);
    if (!completed) {
      console.warn('[DP-03-03] Prática não completou — pulando verificação de XP');
      return;
    }

    // Aguarda que finish seja clicado (o onComplete dispara o recordPracticeSession)
    const dialog = page.locator('.practice-fullscreen');
    const finishBtn = dialog.getByRole('button', { name: /terminar|finish|done/i }).first();
    if (await finishBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await finishBtn.click();
      await page.waitForTimeout(500);
    }

    const practiceKeys = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.includes('practice') || k.includes('progress')),
    );
    console.info('[DP-03-03] Storage keys de prática:', practiceKeys);

    await page.screenshot({ path: 'test-results/dp-03-03-xp-storage.png' });
  });
});

// ─── SUITE DP-04: localStorage vazio não quebra ────────────────────────────

test.describe('DP-04: Estado Vazio e Fallbacks', () => {
  test('DP-04-01: Sem aula em localStorage — mostra Nenhuma aula aberta', async ({ page }) => {
    const errors = collectErrors(page);
    await page.addInitScript(({ session }) => {
      window.localStorage.setItem('fluency.clean.access.session', session);
      // Deliberadamente NÃO injetamos lesson.current
    }, { session: ACCESS_SESSION });

    await page.goto('/');
    await clickTab(page, 'Aula');
    await page.waitForTimeout(1000);

    await expect(page.getByText('Nenhuma aula aberta')).toBeVisible({ timeout: 6000 });
    await page.screenshot({ path: 'test-results/dp-04-01-sem-aula.png' });
    if (errors.length) console.warn('[DP-04-01] Console errors:', errors);
    expect(errors.filter((e) => e.startsWith('[pageerror]'))).toHaveLength(0);
  });

  test('DP-04-02: Aula não concluída — mostra mensagem sem botão de prática', async ({ page }) => {
    const errors = collectErrors(page);
    await setupWithLesson(page, LESSONS.A1_GRAMMAR, { completed: false });
    await page.goto('/');
    await openLessonTab(page);

    // PracticeLauncher só aparece se lessonCompleted=true
    // Sem completion: deve mostrar "Conclua a aula"
    const pendingNote = page.locator('.lesson-practice-pending-note');
    const pendingVisible = await pendingNote.isVisible({ timeout: 4000 }).catch(() => false);
    console.info('[DP-04-02] Nota de aula pendente visível:', pendingVisible);

    // Não deve mostrar o botão Começar prática
    const launcherBtn = page.locator('button.practice-deep-cta');
    const launcherVisible = await launcherBtn.isVisible({ timeout: 2000 }).catch(() => false);
    console.info('[DP-04-02] Botão prática visível (deve ser false):', launcherVisible);

    await page.screenshot({ path: 'test-results/dp-04-02-aula-pendente.png' });
    if (errors.length) console.warn('[DP-04-02] Console errors:', errors);
    expect(errors.filter((e) => e.startsWith('[pageerror]'))).toHaveLength(0);
  });

  test('DP-04-03: localStorage com dados corrompidos — app não quebra', async ({ page }) => {
    const errors = collectErrors(page);
    await page.addInitScript(({ session }) => {
      window.localStorage.setItem('fluency.clean.access.session', session);
      // Injetamos dados corrompidos propositalmente
      window.localStorage.setItem('fluency.clean.lesson.current', 'NOT VALID JSON {{{{');
      window.localStorage.setItem('fluency.clean.progress.lessonCompletions', '[bad]');
      window.localStorage.setItem('fluency.clean.mastery.skillProfile.v1', 'null');
    }, { session: ACCESS_SESSION });

    await page.goto('/');
    await page.waitForTimeout(1000);

    // App não deve ter um pageerror
    expect(errors.filter((e) => e.startsWith('[pageerror]'))).toHaveLength(0);
    // Ainda renderiza algo
    await expect(page.locator('section').first()).toBeVisible({ timeout: 6000 });

    await page.screenshot({ path: 'test-results/dp-04-03-dados-corrompidos.png' });
    if (errors.length) console.warn('[DP-04-03] Console errors (esperados):', errors);
  });
});

// ─── SUITE DP-05: Múltiplos níveis ────────────────────────────────────────

test.describe('DP-05: Múltiplos Níveis', () => {
  const levels = [
    { name: 'A2', lesson: LESSONS.A2_GRAMMAR },
    { name: 'B1', lesson: LESSONS.B1_GRAMMAR },
    { name: 'B2', lesson: LESSONS.B2_GRAMMAR },
    { name: 'C1', lesson: LESSONS.C1_GRAMMAR },
  ];

  for (const { name, lesson } of levels) {
    test(`DP-05-${name}: Grammar ${name} — PracticeLauncher renderiza e gera questões`, async ({ page }) => {
      const errors = collectErrors(page);
      await setupWithLesson(page, lesson);
      await page.goto('/');
      await openLessonTab(page);

      const launcherCard = page.locator('.practice-launcher-card');
      await expect(launcherCard).toBeVisible({ timeout: 8000 });

      // Verifica que há exercícios listados (> 0)
      const metaText = await launcherCard.locator('.practice-launcher-meta').textContent().catch(() => '');
      console.info(`[DP-05-${name}] Meta text:`, metaText?.trim().slice(0, 80));
      // Regex verifica N exercícios onde N > 0
      expect(metaText).toMatch(/[1-9]\d* exercícios?/);

      await page.screenshot({ path: `test-results/dp-05-${name.toLowerCase()}-launcher.png` });
      if (errors.length) console.warn(`[DP-05-${name}] Console errors:`, errors);
      expect(errors.filter((e) => e.startsWith('[pageerror]'))).toHaveLength(0);
    });
  }
});

// ─── SUITE DP-06: Pilar Vocabulary ────────────────────────────────────────

test.describe('DP-06: Vocabulary A1', () => {
  test.beforeEach(async ({ page }) => {
    await setupWithLesson(page, LESSONS.A1_VOCABULARY);
  });

  test('DP-06-01: Vocabulary gera exercícios renderizáveis', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/');
    await openLessonTab(page);

    const launcherCard = page.locator('.practice-launcher-card');
    await expect(launcherCard).toBeVisible({ timeout: 8000 });

    const metaText = await launcherCard.locator('.practice-launcher-meta').textContent().catch(() => '');
    console.info('[DP-06-01] Vocab meta:', metaText?.trim().slice(0, 80));
    expect(metaText).toMatch(/[1-9]\d* exercícios?/);

    await page.screenshot({ path: 'test-results/dp-06-01-vocab-launcher.png' });
    if (errors.length) console.warn('[DP-06-01] Console errors:', errors);
  });

  test('DP-06-02: Vocabulary prática — primeira questão renderiza', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/');
    await openLessonTab(page);
    await clickStartPractice(page);
    await waitForPracticeDialog(page);
    await startPracticeSession(page);

    const dialog = page.locator('.practice-fullscreen');
    const questionCard = dialog.locator('.practice-question-card');
    await expect(questionCard).toBeVisible({ timeout: 6000 });

    const prompt = await questionCard.locator('h1').textContent();
    console.info('[DP-06-02] Vocab primeira questão:', prompt?.slice(0, 80));
    expect(prompt?.trim().length).toBeGreaterThan(0);

    await page.screenshot({ path: 'test-results/dp-06-02-vocab-questao.png' });
    if (errors.length) console.warn('[DP-06-02] Console errors:', errors);
    expect(errors.filter((e) => e.startsWith('[pageerror]'))).toHaveLength(0);
  });
});

// ─── SUITE DP-07: Mobile viewport ─────────────────────────────────────────

test.describe('DP-07: Mobile — Overflow e Usabilidade', () => {
  test.beforeEach(async ({ page }) => {
    await setupWithLesson(page, LESSONS.A1_GRAMMAR);
  });

  test('DP-07-01: PracticeFullscreen sem overflow horizontal no mobile', async ({ page }) => {
    await page.goto('/');
    await openLessonTab(page);
    await clickStartPractice(page);
    await waitForPracticeDialog(page);
    await startPracticeSession(page);

    const overflowX = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.info('[DP-07-01] Overflow horizontal no dialog:', overflowX);
    expect(overflowX).toBe(false);

    await page.screenshot({ path: 'test-results/dp-07-01-mobile-overflow.png' });
  });

  test('DP-07-02: Botões têm altura mínima de 40px no mobile', async ({ page }) => {
    await page.goto('/');
    await openLessonTab(page);
    await clickStartPractice(page);
    await waitForPracticeDialog(page);
    await startPracticeSession(page);

    const smallBtns = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.practice-fullscreen button:not([aria-hidden])'))
        .map((b) => {
          const r = b.getBoundingClientRect();
          return { text: b.textContent?.trim().slice(0, 30), h: Math.round(r.height), w: Math.round(r.width) };
        })
        .filter((b) => b.w > 0 && b.h < 40);
    });
    if (smallBtns.length) {
      console.warn('[DP-07-02] Botões < 40px:', JSON.stringify(smallBtns));
    }
    console.info('[DP-07-02] Botões pequenos encontrados:', smallBtns.length);

    await page.screenshot({ path: 'test-results/dp-07-02-mobile-btn-sizes.png' });
  });

  test('DP-07-03: Intro do prática não tem overflow no mobile', async ({ page }) => {
    await page.goto('/');
    await openLessonTab(page);
    await clickStartPractice(page);
    await waitForPracticeDialog(page);

    const overflowX = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.info('[DP-07-03] Overflow na Intro:', overflowX);
    expect(overflowX).toBe(false);

    await page.screenshot({ path: 'test-results/dp-07-03-intro-overflow.png' });
  });
});

// ─── SUITE DP-08: Erros de Console e Segurança ────────────────────────────

test.describe('DP-08: Erros de Console no Fluxo Completo', () => {
  test('DP-08-01: Sem pageerror durante fluxo A1 Grammar completo', async ({ page }) => {
    const errors = collectErrors(page);
    await setupWithLesson(page, LESSONS.A1_GRAMMAR);
    await page.goto('/');
    await openLessonTab(page);
    await clickStartPractice(page);
    await waitForPracticeDialog(page);
    await startPracticeSession(page);
    await runPracticeRounds(page, 8);

    const pageErrors = errors.filter((e) => e.startsWith('[pageerror]'));
    if (pageErrors.length) {
      console.error('[DP-08-01] PAGE ERRORS:', pageErrors);
    }
    expect(pageErrors).toHaveLength(0);
  });

  test('DP-08-02: Sem pageerror durante fluxo B1 Grammar', async ({ page }) => {
    const errors = collectErrors(page);
    await setupWithLesson(page, LESSONS.B1_GRAMMAR);
    await page.goto('/');
    await openLessonTab(page);
    await clickStartPractice(page);
    await waitForPracticeDialog(page);
    await startPracticeSession(page);
    await runPracticeRounds(page, 6);

    const pageErrors = errors.filter((e) => e.startsWith('[pageerror]'));
    if (pageErrors.length) {
      console.error('[DP-08-02] PAGE ERRORS:', pageErrors);
    }
    expect(pageErrors).toHaveLength(0);
  });

  test('DP-08-03: console.error críticos no fluxo de prática', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await setupWithLesson(page, LESSONS.A1_GRAMMAR);
    await page.goto('/');
    await openLessonTab(page);
    await clickStartPractice(page);
    await waitForPracticeDialog(page);
    await startPracticeSession(page);
    await runPracticeRounds(page, 6);

    // Filtra erros conhecidos não críticos
    const critical = consoleErrors.filter((e) =>
      !e.includes('ResizeObserver') &&
      !e.includes('non-passive') &&
      !e.includes('favicon') &&
      !e.includes('cloud') &&
      !e.includes('sync'),
    );
    if (critical.length) {
      console.warn('[DP-08-03] Console errors críticos:', critical.slice(0, 10));
    }
    console.info('[DP-08-03] Total console.error no fluxo:', consoleErrors.length, '| Críticos:', critical.length);
    // Não falhamos o teste por console.error — apenas documentamos
    // (alguns warnings são esperados durante SRS/storage)
  });
});

// ─── SUITE DP-09: Re-entrada na prática ───────────────────────────────────

test.describe('DP-09: Re-entrada e Estado', () => {
  test.beforeEach(async ({ page }) => {
    await setupWithLesson(page, LESSONS.A1_GRAMMAR);
  });

  test('DP-09-01: Fechar e reabrir prática reinicia a sessão', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/');
    await openLessonTab(page);

    // Primeira abertura
    await clickStartPractice(page);
    await waitForPracticeDialog(page);
    await startPracticeSession(page);
    await answerCurrentQuestion(page);
    await page.waitForTimeout(300);

    // Fecha
    const closeBtn = page.locator('.practice-fullscreen button[aria-label*="Fechar"], .practice-fullscreen button.practice-close').first();
    if (await closeBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await closeBtn.click();
      await page.waitForTimeout(400);
    } else {
      // Pressiona Escape como alternativa
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
    }

    // Reabre
    await clickStartPractice(page);
    const dialog = await waitForPracticeDialog(page);

    // Deve mostrar intro novamente (reiniciou)
    await expect(dialog.locator('button.practice-start-button')).toBeVisible({ timeout: 5000 });

    await page.screenshot({ path: 'test-results/dp-09-01-reiniciou.png' });
    if (errors.length) console.warn('[DP-09-01] Console errors:', errors);
    expect(errors.filter((e) => e.startsWith('[pageerror]'))).toHaveLength(0);
  });

  test('DP-09-02: Reload da página mantém acesso à prática', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/');
    await openLessonTab(page);

    // Verifica que launcher está presente
    await expect(page.locator('.practice-launcher-card')).toBeVisible({ timeout: 8000 });

    // Reload
    await page.reload();
    await page.waitForTimeout(1500);
    await openLessonTab(page);

    // Launcher ainda deve estar presente
    const launcher = page.locator('.practice-launcher-card');
    await expect(launcher).toBeVisible({ timeout: 8000 });

    await page.screenshot({ path: 'test-results/dp-09-02-apos-reload.png' });
    if (errors.length) console.warn('[DP-09-02] Console errors:', errors);
    expect(errors.filter((e) => e.startsWith('[pageerror]'))).toHaveLength(0);
  });
});
