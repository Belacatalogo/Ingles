import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export function LessonActionFooter({ flow, primaryLabel = 'Continuar', finishLabel = 'Concluir aula' }) {
  if (!flow?.activePhase || flow.completed) return null;
  const actionLabel = flow.isLast ? finishLabel : primaryLabel;
  const hint = flow.message
    || (flow.canAdvance ? 'Você pode avançar.' : 'Complete a ação principal para avançar.');

  return (
    <footer className="lesson-flow-action-footer">
      <button
        type="button"
        className="lesson-flow-secondary-action"
        onClick={flow.previous}
        disabled={flow.isFirst}
      >
        <ArrowLeft size={16} /> Voltar
      </button>
      <div>
        <p>{hint}</p>
      </div>
      <button type="button" className="lesson-flow-primary-action" onClick={flow.next}>
        {flow.isLast ? <CheckCircle2 size={16} /> : <ArrowRight size={16} />} {actionLabel}
      </button>
    </footer>
  );
}
