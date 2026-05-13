import React from 'react';

const STORAGE_PREFIXES_TO_RESET = ['fluency.clean.', 'fluency:'];

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    try {
      console.error('[Fluency ErrorBoundary]', error, info);
      window.localStorage.setItem('fluency:last-render-error', JSON.stringify({
        message: error?.message || String(error),
        stack: error?.stack || '',
        componentStack: info?.componentStack || '',
        at: new Date().toISOString(),
      }));
    } catch {
      // ignore storage failures
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetPreview = () => {
    try {
      const keysToRemove = [];
      for (let index = 0; index < window.localStorage.length; index += 1) {
        const key = window.localStorage.key(index);
        if (STORAGE_PREFIXES_TO_RESET.some((prefix) => key?.startsWith(prefix))) keysToRemove.push(key);
      }
      keysToRemove.forEach((key) => window.localStorage.removeItem(key));
    } catch {
      // ignore storage failures
    }
    window.location.reload();
  };

  render() {
    if (!this.state.error) return this.props.children;

    const message = this.state.error?.message || String(this.state.error);

    return (
      <main className="app-shell fluency-reference-shell">
        <section className="render-error-card">
          <span>Fluency Clean</span>
          <h1>Erro de renderização</h1>
          <p>O app encontrou um erro e evitou a tela branca.</p>
          <pre>{message}</pre>
          <div className="render-error-actions">
            <button type="button" onClick={this.handleReload}>Recarregar</button>
            <button type="button" onClick={this.handleResetPreview}>Limpar dados do preview</button>
          </div>
          <small>Versão: rewrite-clean · erro seguro</small>
        </section>
      </main>
    );
  }
}
