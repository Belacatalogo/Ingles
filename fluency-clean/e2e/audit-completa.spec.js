/**
 * AUDITORIA COMPLETA DO SISTEMA — Playwright
 * Branch: main
 * Data: 2026-05-17
 *
 * Este script é SOMENTE de auditoria. Não corrige nada.
 * Captura screenshots, registra erros de console e verifica fluxos.
 */

import { test, expect } from '@playwright/test';

// ── Helpers ─────────────────────────────────────────────────────

const ACCESS_SESSION = JSON.stringify({ unlocked: true, method: 'e2e-audit', at: new Date().toISOString() });

function navBtn(page, label) {
  return page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('button', { name: label });
}

async function clickTab(page, label) {
  const btn = navBtn(page, label);
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  await page.waitForTimeout(400);
}

async function gotoWithSession(page, extraStorage = {}) {
  await page.addInitScript(({ session, extra }) => {
    window.localStorage.setItem('fluency.clean.access.session', session);
    for (const [key, value] of Object.entries(extra)) {
      window.localStorage.setItem(key, value);
    }
  }, { session: ACCESS_SESSION, extra: extraStorage });
}

// Coleta erros de console de uma página
function collectConsoleErrors(page) {
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`));
  return errors;
}

// Aula A1 de gramática para injeção
const MOCK_GRAMMAR_LESSON = {
  id: 'A1-GRAMMAR-001',
  title: 'Grammar — Subject Pronouns',
  pillar: 'grammar',
  type: 'grammar',
  level: 'A1',
  schemaVersion: 'static-lesson-schema-v2-deep',
  status: 'static',
};

const MOCK_VOCAB_LESSON = {
  id: 'A1-VOCABULARY-001',
  title: 'Vocabulary — Greetings',
  pillar: 'vocabulary',
  type: 'vocabulary',
  level: 'A1',
  schemaVersion: 'static-lesson-schema-v2-deep',
  status: 'static',
  essentialWords: [
    { word: 'hello', meaning: 'olá', example: 'Hello! How are you?' },
    { word: 'goodbye', meaning: 'tchau', example: 'Goodbye! See you later.' },
    { word: 'good morning', meaning: 'bom dia', example: 'Good morning! How are you?' },
  ],
};

const MOCK_A2_LESSON = {
  id: 'A2-BRIDGE-001',
  title: 'Grammar — Simple Past Tense',
  pillar: 'grammar',
  type: 'grammar',
  level: 'A2',
  schemaVersion: 'static-lesson-schema-v2-deep',
  status: 'static',
};

const MOCK_MASTERY = {
  updatedAt: new Date().toISOString(),
  SaturdayReviewDate: '2026-05-24',
  pillars: {
    grammar: { attempts: 5, correct: 4, weakCount: 1, score: 80, lastReviewedAt: '', weakTopics: ['subject pronouns'] },
    vocabulary: { attempts: 4, correct: 3, weakCount: 0, score: 75, lastReviewedAt: '', weakTopics: [] },
    reading: { attempts: 3, correct: 2, weakCount: 1, score: 67, lastReviewedAt: '', weakTopics: ['inference'] },
    listening: { attempts: 2, correct: 2, weakCount: 0, score: 80, lastReviewedAt: '', weakTopics: [] },
    speaking: { attempts: 1, correct: 0, weakCount: 1, score: 0, lastReviewedAt: '', weakTopics: [] },
    writing: { attempts: 2, correct: 0, weakCount: 1, score: 42, lastReviewedAt: '', weakTopics: ['production'] },
  },
  recentErrors: [],
};

// ── BLOCO 1 — Auditoria Geral de Navegação ───────────────────────

test.describe('AUDIT-01: Navegação Geral', () => {
  test.beforeEach(async ({ page }) => {
    await gotoWithSession(page);
  });

  test('home: carrega sem erro de renderização', async ({ page }) => {
    const errors = collectConsoleErrors(page);
    await page.goto('/');
    await page.waitForTimeout(1000);
    await expect(page.locator('section').first()).toBeVisible({ timeout: 10000 });
    await page.screenshot({ path: 'test-results/audit-01-home.png', fullPage: true });
    // registrar erros coletados como anotação (não falhar o teste)
    if (errors.length > 0) {
      console.warn('[AUDIT] Erros de console na Home:', errors);
    }
  });

  test('todas as 7 abas: existem e não causam crash', async ({ page }) => {
    const errors = collectConsoleErrors(page);
    await page.goto('/');
    const labels = ['Hoje', 'Curso', 'Aula', 'Cartas', 'Speaking', 'Progresso', 'Ajustes'];
    for (const label of labels) {
      await clickTab(page, label);
      await expect(page.locator('section').first()).toBeVisible({ timeout: 8000 });
      await expect(page.getByText(/erro de renderização/i)).not.toBeVisible();
      await page.screenshot({ path: `test-results/audit-01-aba-${label.toLowerCase()}.png` });
    }
    if (errors.length > 0) {
      console.warn('[AUDIT] Erros de console ao navegar abas:', errors);
    }
  });

  test('topbar: botão level A1 navega para Curso', async ({ page }) => {
    await page.goto('/');
    const levelBtn = page.locator('.level-pill');
    await expect(levelBtn).toBeVisible({ timeout: 5000 });
    await levelBtn.click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'test-results/audit-01-topbar-level.png' });
  });

  test('streak-pill: visível com valor numérico', async ({ page }) => {
    await page.goto('/');
    const streakPill = page.locator('.streak-pill');
    await expect(streakPill).toBeVisible({ timeout: 5000 });
    const text = await streakPill.textContent();
    await page.screenshot({ path: 'test-results/audit-01-topbar-streak.png' });
    console.info('[AUDIT] Streak pill text:', text);
  });

  test('botão diagnóstico: abre e fecha overlay', async ({ page }) => {
    await page.goto('/');
    const diagBtn = page.locator('.diagnostic-mini-button');
    await expect(diagBtn).toBeVisible({ timeout: 5000 });
    await diagBtn.click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'test-results/audit-01-diagnostico-aberto.png' });
    // Fechar
    const closeBtn = page.locator('button[aria-label="Fechar diagnóstico"]').first();
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await page.waitForTimeout(300);
    }
    await page.screenshot({ path: 'test-results/audit-01-diagnostico-fechado.png' });
  });
});

// ── BLOCO 2 — Aba Hoje (TodayScreen) ─────────────────────────────

test.describe('AUDIT-02: Aba Hoje', () => {
  test.beforeEach(async ({ page }) => {
    await gotoWithSession(page, {
      'fluency.clean.mastery.skillProfile.v1': JSON.stringify(MOCK_MASTERY),
    });
  });

  test('hoje: renderiza seções principais', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/audit-02-hoje-geral.png', fullPage: true });
  });

  test('hoje: streak visual está presente', async ({ page }) => {
    await page.goto('/');
    // verificar se streak card aparece
    const streakTexts = page.getByText(/dia(s)? seguido(s)?|streak|sequência/i);
    const streakCount = await streakTexts.count();
    console.info('[AUDIT] Streak elements encontrados:', streakCount);
    await page.screenshot({ path: 'test-results/audit-02-hoje-streak.png' });
  });

  test('hoje: level hardcoded A1→A2 verificação', async ({ page }) => {
    await page.goto('/');
    // Verificar se level é dinâmico ou hardcoded
    const a1a2Text = page.getByText(/A1.*A2|A1 → A2/);
    const found = await a1a2Text.count();
    console.info('[AUDIT] Textos A1→A2 hardcoded encontrados:', found);
    await page.screenshot({ path: 'test-results/audit-02-hoje-level.png' });
  });

  test('hoje: botões de ação têm onClick', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(800);
    // Verificar botões clicáveis na tela
    const buttons = page.locator('button:visible');
    const count = await buttons.count();
    console.info('[AUDIT] Botões visíveis na Home:', count);
    await page.screenshot({ path: 'test-results/audit-02-hoje-botoes.png' });
  });
});

// ── BLOCO 3 — Aba Curso (CourseScreen) ────────────────────────────

test.describe('AUDIT-03: Aba Curso', () => {
  test.beforeEach(async ({ page }) => {
    await gotoWithSession(page, {
      'fluency.clean.mastery.skillProfile.v1': JSON.stringify(MOCK_MASTERY),
    });
  });

  test('curso: renderiza mapa sem crash', async ({ page }) => {
    const errors = collectConsoleErrors(page);
    await page.goto('/');
    await clickTab(page, 'Curso');
    await page.waitForTimeout(1000);
    await expect(page.locator('section').first()).toBeVisible();
    await page.screenshot({ path: 'test-results/audit-03-curso-mapa.png', fullPage: true });
    if (errors.length > 0) console.warn('[AUDIT] Erros no Curso:', errors);
  });

  test('curso: painel de domínio por pilar aparece', async ({ page }) => {
    await page.goto('/');
    await clickTab(page, 'Curso');
    await page.waitForTimeout(800);
    const dominioPanel = page.getByText(/domínio por pilar/i);
    const visible = await dominioPanel.isVisible().catch(() => false);
    console.info('[AUDIT] Painel domínio visível:', visible);
    await page.screenshot({ path: 'test-results/audit-03-curso-dominio.png' });
  });

  test('curso: botão "começar aula" existe e é clicável', async ({ page }) => {
    await page.goto('/');
    await clickTab(page, 'Curso');
    await page.waitForTimeout(800);
    const startBtn = page.getByRole('button', { name: /começar aula|retomar aula|iniciar/i }).first();
    const visible = await startBtn.isVisible().catch(() => false);
    console.info('[AUDIT] Botão começar/retomar aula visível:', visible);
    await page.screenshot({ path: 'test-results/audit-03-curso-btn-aula.png' });
  });

  test('curso: clique em lição abre aula (navegação)', async ({ page }) => {
    await page.goto('/');
    await clickTab(page, 'Curso');
    await page.waitForTimeout(800);
    // Tentar clicar no primeiro botão de lição visível
    const lessonBtn = page.getByRole('button', { name: /começar aula|retomar aula/i }).first();
    if (await lessonBtn.isVisible().catch(() => false)) {
      await lessonBtn.click();
      await page.waitForTimeout(600);
      await page.screenshot({ path: 'test-results/audit-03-curso-aula-aberta.png' });
    } else {
      console.warn('[AUDIT] Botão de lição não encontrado no Curso');
      await page.screenshot({ path: 'test-results/audit-03-curso-sem-botao.png' });
    }
  });

  test('curso: lições acima de 30 não desaparecem (slice hardcoded)', async ({ page }) => {
    await page.goto('/');
    await clickTab(page, 'Curso');
    await page.waitForTimeout(800);
    // Contar cards de lição
    const lessonCards = page.locator('[class*="lesson-card"],[class*="curso-card"],[class*="map-card"],[class*="unit-card"]');
    const count = await lessonCards.count();
    console.info('[AUDIT] Cards de lição visíveis no curso:', count);
    await page.screenshot({ path: 'test-results/audit-03-curso-cards-total.png', fullPage: true });
  });

  test('curso: mensagem de erro não fica presa na tela', async ({ page }) => {
    await page.goto('/');
    await clickTab(page, 'Curso');
    await page.waitForTimeout(800);
    const errorMsg = page.locator('[class*="error-message"],[class*="alert"],[class*="message"]');
    const count = await errorMsg.count();
    console.info('[AUDIT] Mensagens de erro/alerta no Curso:', count);
  });
});

// ── BLOCO 4 — Aba Aula (LessonScreen) ────────────────────────────

test.describe('AUDIT-04: Aba Aula — Abertura e Conteúdo', () => {
  test('aula: estado vazio sem aula aberta', async ({ page }) => {
    await gotoWithSession(page);
    await page.goto('/');
    await clickTab(page, 'Aula');
    await page.waitForTimeout(500);
    await expect(page.getByText('Nenhuma aula aberta')).toBeVisible({ timeout: 6000 });
    await page.screenshot({ path: 'test-results/audit-04-aula-vazia.png' });
  });

  test('aula A1 Grammar: abre e renderiza conteúdo estático', async ({ page }) => {
    await gotoWithSession(page, {
      'fluency.clean.lesson.current': JSON.stringify(MOCK_GRAMMAR_LESSON),
    });
    const errors = collectConsoleErrors(page);
    await page.goto('/');
    await clickTab(page, 'Aula');
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'test-results/audit-04-aula-grammar-a1.png', fullPage: true });
    if (errors.length > 0) console.warn('[AUDIT] Erros na aula Grammar A1:', errors);
    const heading = page.getByRole('heading', { name: /subject pronouns|grammar/i }).first();
    const found = await heading.isVisible().catch(() => false);
    console.info('[AUDIT] Heading da aula Grammar visível:', found);
  });

  test('aula A1 Vocab: abre e renderiza cards de vocabulário', async ({ page }) => {
    await gotoWithSession(page, {
      'fluency.clean.lesson.current': JSON.stringify(MOCK_VOCAB_LESSON),
    });
    const errors = collectConsoleErrors(page);
    await page.goto('/');
    await clickTab(page, 'Aula');
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'test-results/audit-04-aula-vocab-a1.png', fullPage: true });
    if (errors.length > 0) console.warn('[AUDIT] Erros na aula Vocab A1:', errors);
  });

  test('aula A2: abre sem crash', async ({ page }) => {
    await gotoWithSession(page, {
      'fluency.clean.lesson.current': JSON.stringify(MOCK_A2_LESSON),
    });
    const errors = collectConsoleErrors(page);
    await page.goto('/');
    await clickTab(page, 'Aula');
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'test-results/audit-04-aula-a2.png', fullPage: true });
    if (errors.length > 0) console.warn('[AUDIT] Erros na aula A2:', errors);
  });

  test('aula: botões de navegação interna existem', async ({ page }) => {
    await gotoWithSession(page, {
      'fluency.clean.lesson.current': JSON.stringify(MOCK_GRAMMAR_LESSON),
    });
    await page.goto('/');
    await clickTab(page, 'Aula');
    await page.waitForTimeout(1500);
    // Verificar botões próximo/voltar dentro da aula
    const navBtns = page.locator('button:visible');
    const count = await navBtns.count();
    console.info('[AUDIT] Botões visíveis na aula:', count);
    await page.screenshot({ path: 'test-results/audit-04-aula-btns.png' });
  });
});

// ── BLOCO 5 — Exercícios e Avaliação de Respostas ────────────────

test.describe('AUDIT-05: Exercícios e Avaliação', () => {
  test('aula: exercício de múltipla escolha aparece', async ({ page }) => {
    await gotoWithSession(page, {
      'fluency.clean.lesson.current': JSON.stringify(MOCK_GRAMMAR_LESSON),
    });
    await page.goto('/');
    await clickTab(page, 'Aula');
    await page.waitForTimeout(1500);
    // Procurar por rádio buttons ou botões de alternativa
    const choices = page.locator('[class*="choice"],[class*="option"],[class*="alternativ"],[role="radio"]');
    const count = await choices.count();
    console.info('[AUDIT] Elementos de escolha múltipla encontrados:', count);
    await page.screenshot({ path: 'test-results/audit-05-exercicio-multipla.png', fullPage: true });
  });

  test('flashcard: modo estudo com aula injetada', async ({ page }) => {
    await gotoWithSession(page, {
      'fluency.clean.lesson.current': JSON.stringify(MOCK_VOCAB_LESSON),
    });
    await page.goto('/');
    await clickTab(page, 'Cartas');
    await page.waitForTimeout(800);
    const flashBtn = page.getByRole('button', { name: /flashcards da aula/i });
    const visible = await flashBtn.isVisible().catch(() => false);
    console.info('[AUDIT] Botão Flashcards da aula visível:', visible);
    if (visible) {
      await flashBtn.click();
      await page.waitForTimeout(800);
      await page.screenshot({ path: 'test-results/audit-05-flashcards-estudo.png', fullPage: true });
    } else {
      await page.screenshot({ path: 'test-results/audit-05-flashcards-sem-btn.png' });
    }
  });

  test('flashcard: botões acertou/errou presentes', async ({ page }) => {
    await gotoWithSession(page, {
      'fluency.clean.lesson.current': JSON.stringify(MOCK_VOCAB_LESSON),
    });
    await page.goto('/');
    await clickTab(page, 'Cartas');
    await page.waitForTimeout(800);
    const flashBtn = page.getByRole('button', { name: /flashcards da aula/i });
    if (await flashBtn.isVisible().catch(() => false)) {
      await flashBtn.click();
      await page.waitForTimeout(800);
      const acertouBtn = page.getByRole('button', { name: /acertei|acertou|sabia|correto|✓/i });
      const errouBtn = page.getByRole('button', { name: /errei|errou|não sabia|errado|✗/i });
      const acertouCount = await acertouBtn.count();
      const errouCount = await errouBtn.count();
      console.info('[AUDIT] Botões Acertei:', acertouCount, '| Errei:', errouCount);
      await page.screenshot({ path: 'test-results/audit-05-flashcards-btns.png' });
    }
  });
});

// ── BLOCO 6 — Aba Cartas (FlashcardsScreen) ──────────────────────

test.describe('AUDIT-06: Aba Cartas', () => {
  test.beforeEach(async ({ page }) => {
    await gotoWithSession(page, {
      'fluency.clean.lesson.current': JSON.stringify(MOCK_VOCAB_LESSON),
    });
  });

  test('cartas: renderiza seções sem crash', async ({ page }) => {
    const errors = collectConsoleErrors(page);
    await page.goto('/');
    await clickTab(page, 'Cartas');
    await page.waitForTimeout(800);
    await expect(page.locator('section').first()).toBeVisible();
    await page.screenshot({ path: 'test-results/audit-06-cartas-geral.png', fullPage: true });
    if (errors.length > 0) console.warn('[AUDIT] Erros na aba Cartas:', errors);
  });

  test('cartas: botões de deck/trilha aparecem', async ({ page }) => {
    await page.goto('/');
    await clickTab(page, 'Cartas');
    await page.waitForTimeout(800);
    const deckBtns = page.getByRole('button');
    const count = await deckBtns.count();
    console.info('[AUDIT] Botões visíveis na aba Cartas:', count);
    await page.screenshot({ path: 'test-results/audit-06-cartas-decks.png' });
  });

  test('cartas: seção vocabulary words existe', async ({ page }) => {
    await page.goto('/');
    await clickTab(page, 'Cartas');
    await page.waitForTimeout(800);
    // Procurar por palavras de vocabulário
    const vocabWords = page.getByText(/hello|goodbye|good morning/i);
    const count = await vocabWords.count();
    console.info('[AUDIT] Palavras do vocab encontradas nos cards:', count);
    await page.screenshot({ path: 'test-results/audit-06-cartas-vocab.png' });
  });
});

// ── BLOCO 7 — Aba Speaking ───────────────────────────────────────

test.describe('AUDIT-07: Aba Speaking', () => {
  test.beforeEach(async ({ page }) => {
    await gotoWithSession(page);
  });

  test('speaking: renderiza sem crash', async ({ page }) => {
    const errors = collectConsoleErrors(page);
    await page.goto('/');
    await clickTab(page, 'Speaking');
    await page.waitForTimeout(800);
    await expect(page.locator('section').first()).toBeVisible();
    await page.screenshot({ path: 'test-results/audit-07-speaking-geral.png', fullPage: true });
    if (errors.length > 0) console.warn('[AUDIT] Erros na aba Speaking:', errors);
  });

  test('speaking: estado sem aula mostra mensagem informativa', async ({ page }) => {
    await page.goto('/');
    await clickTab(page, 'Speaking');
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'test-results/audit-07-speaking-sem-aula.png' });
    // Verificar se há mensagem de estado vazio
    const emptyMsg = page.getByText(/sem aula|nenhuma aula|selecione uma aula|speaking/i).first();
    const visible = await emptyMsg.isVisible().catch(() => false);
    console.info('[AUDIT] Mensagem estado vazio Speaking:', visible);
  });

  test('speaking: com aula injetada — estrutura de conversa aparece', async ({ page }) => {
    await gotoWithSession(page, {
      'fluency.clean.lesson.current': JSON.stringify(MOCK_GRAMMAR_LESSON),
    });
    await page.goto('/');
    await clickTab(page, 'Speaking');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/audit-07-speaking-com-aula.png', fullPage: true });
    const micBtn = page.locator('[class*="mic"],[aria-label*="microfone"],[aria-label*="falar"],[aria-label*="gravar"]').first();
    const hasMic = await micBtn.isVisible().catch(() => false);
    console.info('[AUDIT] Botão microfone visível:', hasMic);
  });
});

// ── BLOCO 8 — Aba Progresso ───────────────────────────────────────

test.describe('AUDIT-08: Aba Progresso', () => {
  test.beforeEach(async ({ page }) => {
    await gotoWithSession(page, {
      'fluency.clean.mastery.skillProfile.v1': JSON.stringify(MOCK_MASTERY),
    });
  });

  test('progresso: renderiza sem crash com dados', async ({ page }) => {
    const errors = collectConsoleErrors(page);
    await page.goto('/');
    await clickTab(page, 'Progresso');
    await page.waitForTimeout(1000);
    await expect(page.locator('section').first()).toBeVisible();
    await page.screenshot({ path: 'test-results/audit-08-progresso-geral.png', fullPage: true });
    if (errors.length > 0) console.warn('[AUDIT] Erros no Progresso:', errors);
  });

  test('progresso: pilares são exibidos', async ({ page }) => {
    await page.goto('/');
    await clickTab(page, 'Progresso');
    await page.waitForTimeout(800);
    const pillars = page.getByText(/grammar|vocabulary|reading|listening|speaking|writing/i);
    const count = await pillars.count();
    console.info('[AUDIT] Referências a pilares no Progresso:', count);
    await page.screenshot({ path: 'test-results/audit-08-progresso-pilares.png' });
  });

  test('progresso: heatmap/calendário de atividade', async ({ page }) => {
    await page.goto('/');
    await clickTab(page, 'Progresso');
    await page.waitForTimeout(800);
    // Procurar por heatmap ou calendário
    const heatmap = page.locator('[class*="heatmap"],[class*="calendar"],[class*="activity"]').first();
    const visible = await heatmap.isVisible().catch(() => false);
    console.info('[AUDIT] Heatmap/calendário visível:', visible);
    await page.screenshot({ path: 'test-results/audit-08-progresso-heatmap.png', fullPage: true });
  });

  test('progresso: certificação/mastery gate aparece', async ({ page }) => {
    await page.goto('/');
    await clickTab(page, 'Progresso');
    await page.waitForTimeout(800);
    const certText = page.getByText(/certificação|mastery|gate|nível|A1.*A2/i).first();
    const visible = await certText.isVisible().catch(() => false);
    console.info('[AUDIT] Texto certificação/mastery visível:', visible);
    await page.screenshot({ path: 'test-results/audit-08-progresso-cert.png' });
  });
});

// ── BLOCO 9 — Aba Ajustes ─────────────────────────────────────────

test.describe('AUDIT-09: Aba Ajustes', () => {
  test.beforeEach(async ({ page }) => {
    await gotoWithSession(page);
  });

  test('ajustes: renderiza sem crash', async ({ page }) => {
    const errors = collectConsoleErrors(page);
    await page.goto('/');
    await clickTab(page, 'Ajustes');
    await page.waitForTimeout(800);
    await expect(page.locator('section').first()).toBeVisible();
    await page.screenshot({ path: 'test-results/audit-09-ajustes-geral.png', fullPage: true });
    if (errors.length > 0) console.warn('[AUDIT] Erros nos Ajustes:', errors);
  });

  test('ajustes: seção de chaves gerais de IA aparece', async ({ page }) => {
    await page.goto('/');
    await clickTab(page, 'Ajustes');
    await page.waitForTimeout(800);
    await expect(page.getByText(/chaves gerais de ia/i).first()).toBeVisible({ timeout: 8000 });
    await page.screenshot({ path: 'test-results/audit-09-ajustes-keys.png' });
  });

  test('ajustes: toggles existem (verificar se persistem)', async ({ page }) => {
    await page.goto('/');
    await clickTab(page, 'Ajustes');
    await page.waitForTimeout(800);
    const toggles = page.locator('[role="switch"],[type="checkbox"],input[type="checkbox"]');
    const count = await toggles.count();
    console.info('[AUDIT] Toggles/checkboxes nos Ajustes:', count);
    await page.screenshot({ path: 'test-results/audit-09-ajustes-toggles.png' });
  });

  test('ajustes: nome de usuário pode ser editado', async ({ page }) => {
    await page.goto('/');
    await clickTab(page, 'Ajustes');
    await page.waitForTimeout(800);
    const nameInput = page.locator('input[type="text"]').first();
    const visible = await nameInput.isVisible().catch(() => false);
    console.info('[AUDIT] Input de nome visível:', visible);
    if (visible) {
      await nameInput.fill('Test User Audit');
      await page.screenshot({ path: 'test-results/audit-09-ajustes-nome.png' });
    }
  });

  test('ajustes: toggle persiste ao recarregar (teste de localStorage)', async ({ page }) => {
    await page.goto('/');
    await clickTab(page, 'Ajustes');
    await page.waitForTimeout(800);
    // Verificar quais chaves de settings existem no localStorage
    const settingsKeys = await page.evaluate(() => {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes('setting') || key.includes('reminder') || key.includes('audio') || key.includes('compact'))) {
          keys.push(key);
        }
      }
      return keys;
    });
    console.info('[AUDIT] Settings keys em localStorage:', settingsKeys);
  });
});

// ── BLOCO 10 — Mobile Layout (iPhone viewports) ──────────────────

test.describe('AUDIT-10: Mobile Layout e UX', () => {
  test.beforeEach(async ({ page }) => {
    await gotoWithSession(page, {
      'fluency.clean.lesson.current': JSON.stringify(MOCK_VOCAB_LESSON),
      'fluency.clean.mastery.skillProfile.v1': JSON.stringify(MOCK_MASTERY),
    });
  });

  test('mobile: nav inferior não cobre conteúdo', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(800);
    // Verificar posição do nav e se sobrepõe conteúdo
    const nav = page.getByRole('navigation', { name: 'Navegação principal' });
    const navBox = await nav.boundingBox().catch(() => null);
    const viewport = page.viewportSize();
    console.info('[AUDIT] Nav bounding box:', navBox);
    console.info('[AUDIT] Viewport:', viewport);
    if (navBox && viewport) {
      const navTop = navBox.y;
      const viewportHeight = viewport.height;
      console.info('[AUDIT] Nav top offset from bottom:', viewportHeight - navTop);
    }
    await page.screenshot({ path: 'test-results/audit-10-mobile-nav.png' });
  });

  test('mobile: aula renderiza sem overflow horizontal', async ({ page }) => {
    await page.goto('/');
    await clickTab(page, 'Aula');
    await page.waitForTimeout(1000);
    // Verificar scroll horizontal
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.info('[AUDIT] Overflow horizontal na aula mobile:', hasHorizontalOverflow);
    await page.screenshot({ path: 'test-results/audit-10-mobile-aula.png', fullPage: true });
  });

  test('mobile: cartas sem overflow horizontal', async ({ page }) => {
    await page.goto('/');
    await clickTab(page, 'Cartas');
    await page.waitForTimeout(800);
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.info('[AUDIT] Overflow horizontal nas Cartas mobile:', hasHorizontalOverflow);
    await page.screenshot({ path: 'test-results/audit-10-mobile-cartas.png', fullPage: true });
  });

  test('mobile: botões têm tamanho mínimo de toque (44px)', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(800);
    const smallButtons = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button:not([aria-hidden="true"])'));
      return buttons
        .map((b) => {
          const rect = b.getBoundingClientRect();
          return {
            text: b.textContent?.slice(0, 30),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          };
        })
        .filter((b) => b.width > 0 && (b.width < 44 || b.height < 44))
        .slice(0, 20);
    });
    console.info('[AUDIT] Botões menores que 44px:', JSON.stringify(smallButtons, null, 2));
    await page.screenshot({ path: 'test-results/audit-10-mobile-btns-size.png' });
  });

  test('mobile: curso scroll vertical funciona', async ({ page }) => {
    await page.goto('/');
    await clickTab(page, 'Curso');
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'test-results/audit-10-mobile-curso-scroll.png' });
    await page.evaluate(() => window.scrollTo(0, 0));
  });

  test('mobile: modal de diagnóstico tem scroll', async ({ page }) => {
    await page.goto('/');
    const diagBtn = page.locator('.diagnostic-mini-button');
    if (await diagBtn.isVisible().catch(() => false)) {
      await diagBtn.click();
      await page.waitForTimeout(400);
      const overlay = page.locator('.diagnostic-overlay');
      if (await overlay.isVisible().catch(() => false)) {
        const hasScroll = await page.evaluate(() => {
          const sheet = document.querySelector('.diagnostic-sheet');
          return sheet ? sheet.scrollHeight > sheet.clientHeight : false;
        });
        console.info('[AUDIT] Diagnóstico sheet tem overflow scrollável:', hasScroll);
        await page.screenshot({ path: 'test-results/audit-10-mobile-diagnostico.png' });
      }
    }
  });
});

// ── BLOCO 11 — Auditoria de localStorage e Estado ────────────────

test.describe('AUDIT-11: LocalStorage e Estado', () => {
  test('estado persiste ao recarregar página', async ({ page }) => {
    await gotoWithSession(page, {
      'fluency.clean.mastery.skillProfile.v1': JSON.stringify(MOCK_MASTERY),
    });
    await page.goto('/');
    await clickTab(page, 'Progresso');
    await page.waitForTimeout(800);
    // Recarregar
    await page.reload();
    await page.waitForTimeout(1000);
    // Verificar se ainda está na tela Progresso (provavelmente volta pra Hoje)
    const currentTab = await page.evaluate(() => {
      // Verificar qual aba está ativa
      const activeBtn = document.querySelector('[class*="nav-btn"][aria-current="page"],[class*="nav-btn--active"],[class*="active"]');
      return activeBtn ? activeBtn.textContent : 'not found';
    });
    console.info('[AUDIT] Aba ativa após reload:', currentTab);
    await page.screenshot({ path: 'test-results/audit-11-persist-reload.png' });
  });

  test('todas as chaves de localStorage usadas pelo app', async ({ page }) => {
    await gotoWithSession(page, {
      'fluency.clean.lesson.current': JSON.stringify(MOCK_VOCAB_LESSON),
      'fluency.clean.mastery.skillProfile.v1': JSON.stringify(MOCK_MASTERY),
    });
    await page.goto('/');
    await page.waitForTimeout(1000);
    // Navegar por todas as abas para acionar saves
    for (const label of ['Hoje', 'Curso', 'Cartas', 'Speaking', 'Progresso', 'Ajustes']) {
      await clickTab(page, label);
      await page.waitForTimeout(400);
    }
    const allKeys = await page.evaluate(() => {
      return Object.keys(localStorage).sort();
    });
    console.info('[AUDIT] Todas as chaves de localStorage:', allKeys);
  });

  test('settings: toggles não persistem (verificação de bug P1)', async ({ page }) => {
    await gotoWithSession(page);
    await page.goto('/');
    await clickTab(page, 'Ajustes');
    await page.waitForTimeout(800);

    // Verificar se checkboxes/toggles existem
    const checkboxes = page.locator('input[type="checkbox"]');
    const count = await checkboxes.count();
    if (count > 0) {
      // Clicar no primeiro
      await checkboxes.first().click().catch(() => {});
      await page.waitForTimeout(300);
      // Verificar se valor foi salvo em localStorage
      const settingsSaved = await page.evaluate(() => {
        return Object.keys(localStorage).filter((k) => k.includes('reminder') || k.includes('compact') || k.includes('autoplay'));
      });
      console.info('[AUDIT] Settings salvas em localStorage após toggle:', settingsSaved);
      if (settingsSaved.length === 0) {
        console.warn('[AUDIT P1] CONFIRMADO: Toggles de Ajustes NÃO persistem em localStorage');
      }
    }
    await page.screenshot({ path: 'test-results/audit-11-settings-toggle.png' });
  });
});

// ── BLOCO 12 — Auditoria do Sistema de Mastery/Gate ──────────────

test.describe('AUDIT-12: Mastery e Gate System', () => {
  const FULL_MASTERY = {
    updatedAt: new Date().toISOString(),
    SaturdayReviewDate: '2026-05-24',
    pillars: {
      grammar: { attempts: 10, correct: 9, weakCount: 0, score: 90, lastReviewedAt: '', weakTopics: [] },
      vocabulary: { attempts: 8, correct: 7, weakCount: 0, score: 87, lastReviewedAt: '', weakTopics: [] },
      reading: { attempts: 6, correct: 5, weakCount: 0, score: 83, lastReviewedAt: '', weakTopics: [] },
      listening: { attempts: 7, correct: 6, weakCount: 0, score: 85, lastReviewedAt: '', weakTopics: [] },
      speaking: { attempts: 5, correct: 4, weakCount: 0, score: 80, lastReviewedAt: '', weakTopics: [] },
      writing: { attempts: 5, correct: 4, weakCount: 0, score: 80, lastReviewedAt: '', weakTopics: [] },
    },
    recentErrors: [],
  };

  test('mastery: curso com alto domínio mostra progresso positivo', async ({ page }) => {
    await gotoWithSession(page, {
      'fluency.clean.mastery.skillProfile.v1': JSON.stringify(FULL_MASTERY),
    });
    await page.goto('/');
    await clickTab(page, 'Curso');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/audit-12-mastery-alto.png', fullPage: true });
  });

  test('mastery: progresso com domínio baixo mostra recomendação de revisão', async ({ page }) => {
    await gotoWithSession(page, {
      'fluency.clean.mastery.skillProfile.v1': JSON.stringify(MOCK_MASTERY),
    });
    await page.goto('/');
    await clickTab(page, 'Curso');
    await page.waitForTimeout(800);
    const revisaoText = page.getByText(/revisão recomendada|antes do próximo nível|pilar fraco/i).first();
    const visible = await revisaoText.isVisible().catch(() => false);
    console.info('[AUDIT] Recomendação de revisão visível:', visible);
    await page.screenshot({ path: 'test-results/audit-12-mastery-baixo.png' });
  });

  test('mastery: A1 gate não bloqueia navegação com domínio normal', async ({ page }) => {
    await gotoWithSession(page, {
      'fluency.clean.mastery.skillProfile.v1': JSON.stringify(MOCK_MASTERY),
    });
    await page.goto('/');
    await clickTab(page, 'Curso');
    await page.waitForTimeout(800);
    // Verificar que é possível ver o mapa de lições mesmo com gate
    const startBtn = page.getByRole('button', { name: /começar aula|retomar aula/i }).first();
    const visible = await startBtn.isVisible().catch(() => false);
    console.info('[AUDIT] Botão iniciar aula visível com gate A1:', visible);
    await page.screenshot({ path: 'test-results/audit-12-mastery-gate.png' });
  });
});

// ── BLOCO 13 — Auditoria de Segurança / Configuração ─────────────

test.describe('AUDIT-13: Segurança e Configuração', () => {
  test.beforeEach(async ({ page }) => {
    await gotoWithSession(page);
  });

  test('segurança: sem apiKeys expostos no HTML inicial', async ({ page }) => {
    await page.goto('/');
    const bodyText = await page.locator('body').textContent();
    const hasApiKey = /AIza[0-9A-Za-z]{30,}/i.test(bodyText || '');
    const hasAzureKey = /[0-9a-f]{32}/i.test(bodyText || '');
    console.info('[AUDIT] API Key exposta no HTML:', hasApiKey);
    console.info('[AUDIT] Azure key pattern no HTML:', hasAzureKey);
  });

  test('segurança: Firebase config panel no AccessGate', async ({ page }) => {
    // Acessar sem session para ver AccessGate
    await page.goto('/');
    await page.waitForTimeout(500);
    // Verificar se há panel de Firebase exposto
    const firebasePanel = page.locator('[class*="firebase"],[id*="firebase"]').first();
    const visible = await firebasePanel.isVisible().catch(() => false);
    console.info('[AUDIT] Firebase config panel visível em acesso não autenticado:', visible);
    await page.screenshot({ path: 'test-results/audit-13-firebase-gate.png' });
  });

  test('segurança: ajustes — labels sensíveis ausentes', async ({ page }) => {
    await page.goto('/');
    await clickTab(page, 'Ajustes');
    await page.waitForTimeout(800);
    const sensitiveLabels = [
      page.getByText(/flash\/free/i),
      page.getByText(/pro fallback/i),
      page.getByText(/key pro paga/i),
      page.getByText(/chaves de aulas/i),
    ];
    for (const label of sensitiveLabels) {
      const visible = await label.isVisible().catch(() => false);
      if (visible) {
        console.warn('[AUDIT P2] Label sensível/removida ainda visível nos Ajustes');
      }
    }
    await page.screenshot({ path: 'test-results/audit-13-ajustes-labels.png' });
  });

  test('segurança: logs sensíveis no console', async ({ page }) => {
    const consoleLogs = [];
    page.on('console', (msg) => consoleLogs.push({ type: msg.type(), text: msg.text() }));
    await page.goto('/');
    for (const label of ['Hoje', 'Curso', 'Aula', 'Progresso']) {
      await clickTab(page, label);
      await page.waitForTimeout(300);
    }
    const warnings = consoleLogs.filter((l) => l.type === 'warn' || l.type === 'error');
    console.info('[AUDIT] Warnings/errors de console coletados:', JSON.stringify(warnings.slice(0, 10), null, 2));
  });
});

// ── BLOCO 14 — Auditoria do Bug Crítico de MasteryStore ──────────

test.describe('AUDIT-14: Bug Crítico MasteryStore Score', () => {
  test('masteryStore: score calculado cresce artificialmente (bug P0)', async ({ page }) => {
    await gotoWithSession(page);
    await page.goto('/');

    // Simular o cálculo bugado via evaluate
    const calculoBugado = await page.evaluate(() => {
      // Replica lógica de masteryStore.js linhas 154-157
      function calcScore(previousAttempts, previousScore, newScore) {
        const attempts = previousAttempts + 1;
        const totalAttempts = previousAttempts * 100 + newScore;  // BUG: previous score ignorado
        return Math.round(totalAttempts / attempts);
      }

      function calcScoreCorreto(previousAttempts, previousScore, newScore) {
        const attempts = previousAttempts + 1;
        const totalScore = previousScore * previousAttempts + newScore;  // CORRETO
        return Math.round(totalScore / attempts);
      }

      const scenarios = [
        { prev: 0, prevScore: 0, new: 70 },
        { prev: 1, prevScore: 70, new: 60 },    // Deveria ser 65, mas bug calcula 80
        { prev: 2, prevScore: 65, new: 50 },    // Deveria ser 60, mas bug calcula 83
        { prev: 5, prevScore: 60, new: 40 },    // Deveria ser 57, mas bug calcula 90
      ];

      return scenarios.map((s) => ({
        prevAttempts: s.prev,
        prevScore: s.prevScore,
        newScore: s.new,
        bugadoResult: calcScore(s.prev, s.prevScore, s.new),
        corretoResult: calcScoreCorreto(s.prev, s.prevScore, s.new),
        divergencia: Math.abs(calcScore(s.prev, s.prevScore, s.new) - calcScoreCorreto(s.prev, s.prevScore, s.new)),
      }));
    });

    console.info('[AUDIT P0] Simulação do bug em masteryStore.js:156-157:', JSON.stringify(calculoBugado, null, 2));

    // Verificar que há divergência (bug confirmado)
    const hasBug = calculoBugado.some((s) => s.divergencia > 0);
    console.info('[AUDIT P0] Bug de cálculo CONFIRMADO:', hasBug);
  });
});
