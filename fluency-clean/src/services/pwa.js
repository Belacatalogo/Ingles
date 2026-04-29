import { diagnostics } from './diagnostics.js';

export function registerPwaServiceWorker() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

  if (!('serviceWorker' in navigator)) {
    diagnostics.log('PWA: service worker não suportado neste navegador.', 'info');
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        diagnostics.log('PWA: service worker registrado.', 'info', { scope: registration.scope });
      })
      .catch((error) => {
        diagnostics.log(`PWA: falha ao registrar service worker: ${error?.message || error}`, 'error');
      });
  });
}

export function isRunningAsStandalonePwa() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(display-mode: standalone)')?.matches || window.navigator?.standalone === true;
}
