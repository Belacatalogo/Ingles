import { test, expect } from '@playwright/test';

// Injeta sessão de acesso no localStorage antes de cada teste,
// bypassando o AccessGate (Firebase) sem alterar código de produção.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      'fluency.clean.access.session',
      JSON.stringify({ unlocked: true, method: 'e2e-test', at: new Date().toISOString() }),
    );
  });
});

// Helper: escopa ao nav principal e faz scroll antes de clicar
// (nav tem overflow-x: auto no mobile — abas além da 3ª ficam fora do viewport)
function navBtn(page, label) {
  return page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('button', { name: label });
}

async function clickTab(page, label) {
  const btn = navBtn(page, label);
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
}

// ── Smoke ─────────────────────────────────────────────────────

test('app carrega e título está correto', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Fluency');
});

test('bottom nav: todas as 7 abas existem no DOM', async ({ page }) => {
  await page.goto('/');
  const labels = ['Hoje', 'Curso', 'Aula', 'Cartas', 'Speaking', 'Progresso', 'Ajustes'];
  for (const label of labels) {
    await expect(navBtn(page, label)).toBeAttached();
  }
});

// ── Navegação por aba ─────────────────────────────────────────

test('aba Hoje: renderiza sem crash', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('section').first()).toBeVisible();
});

test('aba Aula: estado sem aula aberta', async ({ page }) => {
  await page.goto('/');
  await clickTab(page, 'Aula');
  await expect(page.getByText('Nenhuma aula aberta')).toBeVisible();
});

test('aba Curso: renderiza sem crash', async ({ page }) => {
  await page.goto('/');
  await clickTab(page, 'Curso');
  await expect(page.locator('section').first()).toBeVisible();
});

test('aba Progresso: renderiza sem crash', async ({ page }) => {
  await page.goto('/');
  await clickTab(page, 'Progresso');
  await expect(page.locator('section').first()).toBeVisible();
});

test('aba Ajustes: renderiza sem crash', async ({ page }) => {
  await page.goto('/');
  await clickTab(page, 'Ajustes');
  await expect(page.locator('section').first()).toBeVisible();
});
