import { test, expect } from '@playwright/test';

// Mastery profile with some active pillars — triggers MasteryRecommendationPanel
const MOCK_MASTERY_PROFILE = {
  updatedAt: new Date().toISOString(),
  SaturdayReviewDate: '2026-05-24',
  pillars: {
    grammar: { attempts: 3, correct: 4, weakCount: 1, score: 72, lastReviewedAt: '', weakTopics: ['he/she/it'] },
    vocabulary: { attempts: 2, correct: 2, weakCount: 0, score: 85, lastReviewedAt: '', weakTopics: [] },
    reading: { attempts: 2, correct: 1, weakCount: 1, score: 60, lastReviewedAt: '', weakTopics: ['inference'] },
    listening: { attempts: 1, correct: 1, weakCount: 0, score: 78, lastReviewedAt: '', weakTopics: [] },
    speaking: { attempts: 0, correct: 0, weakCount: 0, score: 0, lastReviewedAt: '', weakTopics: [] },
    writing: { attempts: 1, correct: 0, weakCount: 1, score: 45, lastReviewedAt: '', weakTopics: ['production'] },
  },
  recentErrors: [],
};

test.beforeEach(async ({ page }) => {
  await page.addInitScript((masteryProfile) => {
    window.localStorage.setItem(
      'fluency.clean.access.session',
      JSON.stringify({ unlocked: true, method: 'e2e-test', at: new Date().toISOString() }),
    );
    window.localStorage.setItem(
      'fluency.clean.mastery.skillProfile.v1',
      JSON.stringify(masteryProfile),
    );
  }, MOCK_MASTERY_PROFILE);
});

function navBtn(page, label) {
  return page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('button', { name: label });
}

async function clickTab(page, label) {
  const btn = navBtn(page, label);
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
}

// ── Mastery Gate ─────────────────────────────────────────────────

test('aba Curso: renderiza sem crash com dados de domínio', async ({ page }) => {
  await page.goto('/');
  await clickTab(page, 'Curso');
  await expect(page.locator('section').first()).toBeVisible();
  await page.screenshot({ path: 'test-results/mastery-gate-course-screen.png' });
});

test('aba Curso: painel de domínio aparece com dados reais', async ({ page }) => {
  await page.goto('/');
  await clickTab(page, 'Curso');
  // Panel renders "Domínio por pilar" when mastery profile has attempts > 0
  await expect(page.getByText(/domínio por pilar/i)).toBeVisible({ timeout: 8000 });
  await page.screenshot({ path: 'test-results/mastery-gate-panel-visible.png' });
});

test('aba Curso: pilares fracos são destacados', async ({ page }) => {
  await page.goto('/');
  await clickTab(page, 'Curso');
  // Writing (45%) and Reading (60%) are < 70% → "Revisão recomendada"
  await expect(page.getByText(/revisão recomendada|antes do próximo nível/i)).toBeVisible({ timeout: 8000 });
  await page.screenshot({ path: 'test-results/mastery-gate-weak-pillars.png' });
});

test('aba Curso: navegação principal não é bloqueada pelo gate', async ({ page }) => {
  await page.goto('/');
  await clickTab(page, 'Curso');
  // Gate/recommendation panel must not block main navigation
  const startBtn = page.getByRole('button', { name: /começar aula|retomar aula/i });
  await expect(startBtn).toBeVisible({ timeout: 8000 });
  await page.screenshot({ path: 'test-results/mastery-gate-nav-not-blocked.png' });
});
