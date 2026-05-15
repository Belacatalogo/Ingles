import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export function LessonActionFooter({ flow, primaryLabel = 'Continuar', finishLabel = 'Finalizar etapa' }) {
  if (!flow?.activePhase) return null;
  const actionLabel = flow.isLast ? finishLabel : primaryLabel;

  return (
    <footer className="lesson-flow-action-footer">
      <button type="button" className="lesson-flow-secondary-action" onClick={flow.previous} disabled={flow.isFirst}>
        <ArrowLeft size={16} /> Voltar
      </button>
      <div>
        {flow.message ? <p>{flow.message}</p> : <p>{flow.canAdvance ? 'Você pode avançar.' : 'Complete a ação principal para avançar.'}</p>}
      </div>
      <button type="button" className="lesson-flow-primary-action" onClick={flow.next}>
        {flow.isLast ? <CheckCircle2 size={16} /> : <ArrowRight size={16} />} {actionLabel}
      </button>
    </footer>
  );
}
