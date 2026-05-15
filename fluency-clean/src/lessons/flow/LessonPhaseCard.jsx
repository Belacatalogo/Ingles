export function LessonPhaseCard({ phase, flow }) {
  if (!phase) return null;
  const Body = phase.component || null;
  const isDone = Boolean(flow && flow.attempts && flow.attempts[phase.id]);
  const statusText = isDone ? 'Tentativa registrada' : phase.requiresAttempt ? 'Faça uma tentativa' : 'Etapa livre';

  return (
    <section className="lesson-flow-phase-card">
      <div className="lesson-flow-phase-head">
        <div>
          <span>{phase.eyebrow || 'Etapa da aula'}</span>
          <h2>{phase.title}</h2>
          {phase.description ? <p>{phase.description}</p> : null}
        </div>
        <div className={isDone ? 'lesson-flow-phase-status done' : 'lesson-flow-phase-status'}>
          <small>{statusText}</small>
        </div>
      </div>
      <div className="lesson-flow-phase-body">
        {Body ? <Body phase={phase} flow={flow} /> : <p className="lesson-flow-muted">Esta etapa ainda não tem conteúdo conectado.</p>}
      </div>
    </section>
  );
}
