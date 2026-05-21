import { defineConfig } from '@playwright/test';

// iPhone viewports com Chromium (WebKit não disponível neste ambiente)
const iphone13 = {
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
};

const iphoneSE = {
  viewport: { width: 375, height: 667 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  userAgent: iphone13.userAgent,
};

// Trace/video controlados por env para o "Playwright Smart Quality Debug",
// sem alterar o comportamento padrão (off) usado pelo Flow existente.
const traceMode = process.env.PW_TRACE || 'off';
const videoMode = process.env.PW_VIDEO || 'off';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  retries: 0,
  // html para inspeção; list para logs legíveis no Actions; json para parsing.
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['json', { outputFile: 'audit-results/playwright-results.json' }],
  ],

  projects: [
    {
      name: 'iPhone 13',
      use: { browserName: 'chromium', headless: true, ...iphone13 },
    },
    {
      name: 'iPhone SE',
      use: { browserName: 'chromium', headless: true, ...iphoneSE },
    },
  ],

  use: {
    baseURL: 'http://localhost:5173',
    screenshot: 'only-on-failure',
    trace: traceMode,
    video: videoMode,
  },

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
