import React from 'react';

const TARGETED_RECOVERY_KEYS = {
  curriculum: [
    'curriculum.progress.v1',
    'fluency:curriculum.progress.v1',
    'fluency.clean.curriculum.progress.v1',
  ],
};

function isCurriculumProgressError(message = '') {
  return String(message).includes('completedIds') || String(message).includes('curriculum.progress');
}

function removeMatchingLocalStorageKeys(matcher) {
  const keys = [];
  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);
    if (key && matcher(key)) keys.push(key);
  }
  keys.forEach((key) => window.localStorage.removeItem(key));
  return keys;
}

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

  handleRepairCurriculum = () => {
    try {
      TARGETED_RECOVERY_KEYS.curriculum.forEach((key) => window.localStorage.removeItem(key));
      const removed = removeMatchingLocalStorageKeys((key) => {
        const normalized = key.toLowerCase();
        return normalized.includes('curriculum') || normalized.includes('progress.v1');
      });
      window.localStorage.setItem('fluency:last-targeted-repair', JSON.stringify({
        type: 'curriculum-progress',
        removed,
        at: new Date().toISOString(),
      }));
    } catch {
      // ignore storage failures
    }
    window.location.reload();
  };

  handleResetPreview = () => {
    try {
      const keepKeys = [];
      for (let index = 0; index < window.localStorage.length; index += 1) {
        const key = window.localStorage.key(index);
        if (key?.startsWith('fluency:') || key?.startsWith('fluency.clean.')) keepKeys.push(key);
      }
      keepKeys.forEach((key) => window.localStorage.removeItem(key));
    } catch {
      // ignore storage failures
    }
    window.location.reload();
  };

  render() {
    if (!this.state.error) return this.props.children;

    const message = this.state.error?.message || String(this.state.error);
    const curriculumError = isCurriculumProgressError(message);

    return (
      <main className="app-shell fluency-reference-shell">
        <section className="render-error-card">
          <span>Fluency Clean</span>
          <h1>Erro de renderização</h1>
          <p>O app encontrou um erro e evitou a tela branca.</p>
          <pre>{message}</pre>
          <div className="render-error-actions">
            <button type="button" onClick={this.handleReload}>Recarregar</button>
            {curriculumError ? (
              <button type="button" onClick={this.handleRepairCurriculum}>Corrigir progresso</button>
            ) : null}
            <button type="button" onClick={this.handleResetPreview}>Limpar dados do preview</button>
          </div>
          <small>
            {curriculumError
              ? 'Versão: rewrite-clean · recuperação segura do currículo'
              : 'Versão: rewrite-clean · erro seguro'}
          </small>
        </section>
      </main>
    );
  }
}
