import { PhaseShell } from './PhaseShell.jsx';
import { clean, noteOf, textOf } from '../text/normalize.js';

export function ListPhase({ phase }) {
  const items = Array.isArray(phase.items) ? phase.items : [];
  return (
    <PhaseShell eyebrow={phase.eyebrow || 'Estudo'} title={phase.bodyTitle || phase.title} instruction={phase.instruction}>
      {items.length ? (
        <ul className="lesson-phase-vocab-list">
          {items.map((item, index) => {
            const text = clean(item?.word || item?.phrase || textOf(item));
            const note = noteOf(item);
            return <li key={`${phase.id}-item-${index}`}><b>{text}</b>{note ? <small>{note}</small> : null}</li>;
          })}
        </ul>
      ) : <p className="lesson-flow-muted">Nenhum item cadastrado para esta etapa.</p>}
    </PhaseShell>
  );
}
