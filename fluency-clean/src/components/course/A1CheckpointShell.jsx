import { useMemo, useState } from 'react';
import { CheckCircle2, ClipboardCheck, Lock, PlayCircle, ShieldCheck, Target } from 'lucide-react';
import { getA1CheckpointShellItems } from '../../content/curriculum/levels/A1/a1CheckpointModel.js';

export function A1CheckpointShell() {
  const checkpoints = useMemo(() => getA1CheckpointShellItems(), []);
  const [activeId, setActiveId] = useState(checkpoints[0]?.id || '');
  const active = checkpoints.find((checkpoint) => checkpoint.id === activeId) || checkpoints[0];

  if (!active) return null;

  return (
    <section className="a1-checkpoint-shell-card">
      <header>
        <div className="a1-gate-title">
          <span><ClipboardCheck size={18} /></span>
          <div>
            <strong>Checkpoints do A1</strong>
            <small>Pequenas avaliações para confirmar se você está pronto para continuar.</small>
          </div>
        </div>
        <em><ShieldCheck size={14} /> Meta: {active.passingScore}%</em>
      </header>

      <div className="a1-checkpoint-tabs">
        {checkpoints.map((checkpoint) => (
          <button key={checkpoint.id} type="button" className={checkpoint.id === active.id ? 'active' : ''} onClick={() => setActiveId(checkpoint.id)}>
            {checkpoint.title}
          </button>
        ))}
      </div>

      <div className="a1-checkpoint-active-card">
        <div>
          <strong>{active.title}</strong>
          <small>Libera depois de: {active.unlockAfterUnit}</small>
        </div>
        <p>{active.purpose}</p>
      </div>

      <div className="a1-checkpoint-pillar-list">
        {active.pillars.map((pillar) => (
          <article key={pillar.id}>
            <div>
              <Target size={16} />
              <strong>{pillar.title}</strong>
              {pillar.requiresReview ? <span><Lock size={13} /> Precisa revisão</span> : <span><CheckCircle2 size={13} /> Correção objetiva</span>}
            </div>
            <p>{pillar.target}</p>
            <ul>
              {pillar.tasks.map((task) => <li key={task}>{task}</li>)}
            </ul>
          </article>
        ))}
      </div>

      <div className="answer-actions">
        <button type="button" className="secondary-button" disabled>
          <PlayCircle size={16} /> Tela de respostas entra no próximo bloco
        </button>
      </div>
    </section>
  );
}
