import React from 'react';
import { createRoot } from 'react-dom/client';
import { registerPwaServiceWorker } from './services/pwa.js';
import './styles/index.css';
import './styles/access.css';
import './styles/lessons.css';
import './styles/reference.css';
import './styles/lab-polish.css';
import './styles/today-polish.css';
import './styles/nav-polish.css';
import './styles/lesson-polish.css';
import './styles/choice-polish.css';
import './styles/flashcards-polish.css';
import './styles/flashcards-session.css';
import './styles/flashcards-new-words-hotfix.css';
import './styles/speaking-session.css';
import './styles/speaking-history.css';
import './styles/error-bank.css';
import './styles/level-certification.css';
import './styles/progress-polish.css';
import './styles/settings-polish.css';
import './styles/listening-ux-hotfix.css';
import './styles/lesson-preview-lab.css';
import './styles/practice-fullscreen.css';
import './styles/grammar-examples-hotfix.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

function showBootError(error) {
  const message = error?.message || String(error || 'Erro desconhecido ao carregar o app.');
  const stack = error?.stack || '';

  rootElement.innerHTML = `
    <main style="min-height:100vh;display:grid;place-items:center;padding:24px;background:#050b18;color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display',Inter,system-ui,sans-serif;">
      <section style="width:min(520px,100%);border:1px solid rgba(248,113,113,.35);border-radius:28px;padding:24px;background:rgba(30,41,59,.88);box-shadow:0 22px 70px rgba(0,0,0,.35);">
        <p style="margin:0 0 10px;color:#fca5a5;font-size:12px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;">Fluency Clean</p>
        <h1 style="margin:0 0 12px;font-size:34px;line-height:1;letter-spacing:-.05em;">Erro ao carregar o app</h1>
        <p style="margin:0;color:#cbd5e1;line-height:1.5;">O preview não ficou em branco. O erro real foi capturado abaixo para correção.</p>
        <pre style="white-space:pre-wrap;word-break:break-word;margin-top:16px;padding:14px;border-radius:16px;background:rgba(15,23,42,.82);color:#fecaca;font-size:12px;line-height:1.45;max-height:260px;overflow:auto;">${message}\n\n${stack}</pre>
        <small style="display:block;margin-top:14px;color:#94a3b8;">rewrite-clean · safe bootstrap</small>
      </section>
    </main>
  `;
}

async function bootstrap() {
  try {
    registerPwaServiceWorker();

    const [{ App }, { ErrorBoundary }] = await Promise.all([
      import('./App.jsx'),
      import('./components/system/ErrorBoundary.jsx'),
    ]);

    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
  } catch (error) {
    showBootError(error);
  }
}

bootstrap();
