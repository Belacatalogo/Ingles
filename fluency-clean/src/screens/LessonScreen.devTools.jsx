import { RefreshCw } from 'lucide-react';

export function LessonScreenDevTools({ lesson, onRefresh }) {
  if (!import.meta.env.DEV) return null;

  return (
    <section className="lesson-preview-lab-card" aria-label="Ferramentas de desenvolvimento da aula">
      <div>
        <strong>DEV · Aula</strong>
        <small>Este painel aparece apenas em desenvolvimento e não entra na tela normal do aluno.</small>
      </div>
      <div className="lesson-preview-lab-actions">
        <button type="button" onClick={onRefresh}><RefreshCw size={14} /> Recarregar aula</button>
      </div>
      <p className="generator-message completion-message">
        {lesson?.id ? `Renderizando: ${lesson.id}` : 'Nenhuma aula salva detectada.'}
      </p>
    </section>
  );
}
