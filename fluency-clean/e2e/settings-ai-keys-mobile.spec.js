import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      'fluency.clean.access.session',
      JSON.stringify({ unlocked: true, method: 'e2e-test', at: new Date().toISOString() }),
    );
    // Start with no general AI keys saved
    window.localStorage.removeItem('fluency.clean.ai.gemini.generalKeys');
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

// ── Settings AI Keys Cleanup ─────────────────────────────────────

test('aba Ajustes: seção de chaves mostra "Chaves gerais de IA"', async ({ page }) => {
  await page.goto('/');
  await clickTab(page, 'Ajustes');
  await expect(page.getByText(/chaves gerais de ia/i).first()).toBeVisible({ timeout: 8000 });
  await page.screenshot({ path: 'test-results/settings-ai-keys-title.png' });
});

test('aba Ajustes: "Chaves de aulas" não aparece na UI', async ({ page }) => {
  await page.goto('/');
  await clickTab(page, 'Ajustes');
  await expect(page.locator('section').first()).toBeVisible({ timeout: 8000 });
  await expect(page.getByText(/^chaves de aulas$/i)).not.toBeVisible();
});

test('aba Ajustes: rótulos removidos não aparecem (Flash/free, Pro fallback, Key Pro paga)', async ({ page }) => {
  await page.goto('/');
  await clickTab(page, 'Ajustes');
  await expect(page.locator('section').first()).toBeVisible({ timeout: 8000 });
  await expect(page.getByText(/flash\/free/i)).not.toBeVisible();
  await expect(page.getByText(/pro fallback/i)).not.toBeVisible();
  await expect(page.getByText(/key pro paga/i)).not.toBeVisible();
  await page.screenshot({ path: 'test-results/settings-ai-keys-no-lesson-labels.png' });
});

test('aba Ajustes: adicionar key geral altera contagem e persiste na navegação', async ({ page }) => {
  await page.goto('/');
  await clickTab(page, 'Ajustes');

  // Navega para a seção de chaves de IA (padrão abre em "Conta e acesso")
  await page.getByRole('button', { name: /chaves gerais de ia/i }).click();

  // Contagem inicial: 0/5
  await expect(page.getByText('0/5')).toBeVisible({ timeout: 8000 });

  // Preenche e adiciona key fake no formato Gemini (não é enviada para API)
  // O serviço valida o padrão AIza[20+chars] antes de salvar
  const input = page.getByLabel(/adicionar key geral de ia/i);
  await input.fill('AIzaTest_FakeKey00000000000000');
  await page.getByRole('button', { name: /adicionar/i }).click();

  // Contagem muda para 1/5
  await expect(page.getByText('1/5')).toBeVisible({ timeout: 5000 });
  await page.screenshot({ path: 'test-results/settings-ai-keys-added.png' });

  // Navega para outra aba e volta — verifica que a key permanece salva na sessão
  await clickTab(page, 'Hoje');
  await clickTab(page, 'Ajustes');

  // Reabre a seção de chaves de IA
  await page.getByRole('button', { name: /chaves gerais de ia/i }).click();

  // Key ainda salva — contagem continua 1/5
  await expect(page.getByText('1/5')).toBeVisible({ timeout: 8000 });
  await page.screenshot({ path: 'test-results/settings-ai-keys-persisted.png' });
});
