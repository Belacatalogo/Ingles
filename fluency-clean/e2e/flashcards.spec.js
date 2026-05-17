import { test, expect } from '@playwright/test';

const MOCK_LESSON = {
  id: 'e2e-test-vocab-daily-routine',
  title: 'Vocabulary — Daily Routine',
  pillar: 'vocabulary',
  type: 'vocabulary',
  level: 'A1',
  schemaVersion: 'static-lesson-schema-v1',
  essentialWords: [
    { word: 'wake up', meaning: 'acordar', example: 'I wake up at 7 AM.' },
    { word: 'get dressed', meaning: 'se vestir', example: 'I get dressed after my shower.' },
    { word: 'have breakfast', meaning: 'tomar café da manhã', example: 'I have breakfast at 8 AM.' },
    { word: 'go to work', meaning: 'ir para o trabalho', example: 'I go to work by bus.' },
    { word: 'have lunch', meaning: 'almoçar', example: 'I have lunch at noon.' },
  ],
};

test.beforeEach(async ({ page }) => {
  await page.addInitScript((lesson) => {
    window.localStorage.setItem(
      'fluency.clean.access.session',
      JSON.stringify({ unlocked: true, method: 'e2e-test', at: new Date().toISOString() }),
    );
    window.localStorage.setItem(
      'fluency.clean.lesson.current',
      JSON.stringify(lesson),
    );
  }, MOCK_LESSON);
});

function navBtn(page, label) {
  return page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('button', { name: label });
}

async function clickTab(page, label) {
  const btn = navBtn(page, label);
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
}

// ── Flashcards ───────────────────────────────────────────────────

test('aba Aula: hero da aula injetada aparece', async ({ page }) => {
  await page.goto('/');
  await clickTab(page, 'Aula');
  // getLessonTitle strips the pillar prefix, so "Vocabulary — Daily Routine" renders as "Daily Routine"
  await expect(page.getByRole('heading', { name: 'Daily Routine' }).first()).toBeVisible();
  await page.screenshot({ path: 'test-results/flashcards-lesson-hero.png' });
});

test('aba Cartas: botão "Flashcards da aula" aparece com aula de qualidade', async ({ page }) => {
  await page.goto('/');
  const cartasBtn = navBtn(page, 'Cartas');
  await cartasBtn.scrollIntoViewIfNeeded();
  await cartasBtn.click();
  const flashcardBtn = page.getByRole('button', { name: /flashcards da aula/i });
  await expect(flashcardBtn).toBeVisible({ timeout: 8000 });
  await page.screenshot({ path: 'test-results/flashcards-button-visible.png' });
});

test('aba Cartas: clicar "Flashcards da aula" abre modo de estudo', async ({ page }) => {
  await page.goto('/');
  const cartasBtn = navBtn(page, 'Cartas');
  await cartasBtn.scrollIntoViewIfNeeded();
  await cartasBtn.click();
  const flashcardBtn = page.getByRole('button', { name: /flashcards da aula/i });
  await expect(flashcardBtn).toBeVisible({ timeout: 8000 });
  await flashcardBtn.click();
  // Flashcard study mode should show the deck title or a card word
  await expect(
    page.getByText(/daily routine|wake up|get dressed|have breakfast/i).first(),
  ).toBeVisible({ timeout: 8000 });
  await page.screenshot({ path: 'test-results/flashcards-study-mode.png' });
});
