import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      'fluency.clean.access.session',
      JSON.stringify({ unlocked: true, method: 'e2e-test', at: new Date().toISOString() }),
    );
  });
});

function navBtn(page, label) {
  return page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('button', { name: label });
}

async function clickTab(page, label) {
  const btn = navBtn(page, label);
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
}

// ── Visual smoke: premium polish ─────────────────────────────────────

test('app: sem erro de renderização ao carregar', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section').first()).toBeVisible({ timeout: 8000 });
  await expect(page.getByText(/erro de renderização/i)).not.toBeVisible();
  await page.screenshot({ path: 'test-results/polish-hoje.png' });
});

test('nav: menu inferior visível e responsivo', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Navegação principal' });
  await expect(nav).toBeVisible({ timeout: 8000 });
  // Todas as 7 abas presentes
  for (const label of ['Hoje', 'Curso', 'Aula', 'Cartas', 'Speaking', 'Progresso', 'Ajustes']) {
    await expect(navBtn(page, label)).toBeAttached();
  }
  await page.screenshot({ path: 'test-results/polish-nav.png' });
});

test('aba Hoje: renderiza sem crash e tem conteúdo', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section').first()).toBeVisible({ timeout: 8000 });
  await expect(page.getByText(/erro de renderização/i)).not.toBeVisible();
  await page.screenshot({ path: 'test-results/polish-hoje-content.png' });
});

test('aba Curso: renderiza sem crash', async ({ page }) => {
  await page.goto('/');
  await clickTab(page, 'Curso');
  await expect(page.locator('section').first()).toBeVisible({ timeout: 8000 });
  await expect(page.getByText(/erro de renderização/i)).not.toBeVisible();
  await page.screenshot({ path: 'test-results/polish-curso.png' });
});

test('aba Aula: renderiza sem crash', async ({ page }) => {
  await page.goto('/');
  await clickTab(page, 'Aula');
  await expect(page.locator('section').first()).toBeVisible({ timeout: 8000 });
  await expect(page.getByText(/erro de renderização/i)).not.toBeVisible();
  await page.screenshot({ path: 'test-results/polish-aula.png' });
});

test('aba Cartas: renderiza sem crash', async ({ page }) => {
  await page.goto('/');
  await clickTab(page, 'Cartas');
  await expect(page.locator('section').first()).toBeVisible({ timeout: 8000 });
  await expect(page.getByText(/erro de renderização/i)).not.toBeVisible();
  await page.screenshot({ path: 'test-results/polish-cartas.png' });
});

test('aba Speaking: renderiza sem crash', async ({ page }) => {
  await page.goto('/');
  await clickTab(page, 'Speaking');
  await expect(page.locator('section').first()).toBeVisible({ timeout: 8000 });
  await expect(page.getByText(/erro de renderização/i)).not.toBeVisible();
  await page.screenshot({ path: 'test-results/polish-speaking.png' });
});

test('aba Progresso: renderiza sem crash', async ({ page }) => {
  await page.goto('/');
  await clickTab(page, 'Progresso');
  await expect(page.locator('section').first()).toBeVisible({ timeout: 8000 });
  await expect(page.getByText(/erro de renderização/i)).not.toBeVisible();
  await page.screenshot({ path: 'test-results/polish-progresso.png' });
});

test('aba Ajustes: renderiza sem crash e tem seção de chaves', async ({ page }) => {
  await page.goto('/');
  await clickTab(page, 'Ajustes');
  await expect(page.locator('section').first()).toBeVisible({ timeout: 8000 });
  await expect(page.getByText(/erro de renderização/i)).not.toBeVisible();
  await expect(page.getByText(/chaves gerais de ia/i).first()).toBeVisible({ timeout: 8000 });
  await page.screenshot({ path: 'test-results/polish-ajustes.png' });
});
