import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { PhaseShell } from './PhaseShell.jsx';
import { clean } from '../text/normalize.js';

function getLatestWrittenAttempt(attempts = {}, excludeId = '') {
  return Object.entries(attempts).reduce((best, [id, data]) => {
    if (id === excludeId || !data || typeof data !== 'object') return best;
    const value = clean(data.value || '');
    if (!value) return best;
    return value.length > best.length ? value : best;
  }, '');
}

export function ChecklistField({
  phase,
  flow,
  items = [],
  minRequired = null,
  eyebrow = 'Confira sua produção',
  title = 'Auto-checklist',
  instruction,
}) {
  const list = items.map((item, index) => ({
    id: clean(item?.id || `${phase.id}-c-${index}`),
    label: clean(typeof item === 'string' ? item : item?.label || item?.text || item?.criterion),
  })).filter((entry) => entry.label);
  const [checked, setChecked] = useState({});
  const need = minRequired ?? list.length;
  const okCount = Object.values(checked).filter(Boolean).length;
  const draftText = useMemo(
    () => getLatestWrittenAttempt(flow?.attempts, phase.id),
    [flow?.attempts, phase.id]
  );

  useEffect(() => {
    if (!list.length) return;
    if (okCount >= need && okCount > 0 && !flow?.attempts?.[phase.id]) {
      flow.markAttempt(phase.id, { checked, reviewedText: draftText });
    }
  }, [okCount, need, draftText]); // eslint-disable-line react-hooks/exhaustive-deps

  function toggle(id) {
    setChecked((current) => ({ ...current, [id]: !current[id] }));
  }

  return (
    <PhaseShell eyebrow={eyebrow} title={title} instruction={instruction || `Marque os itens que você cumpriu. Você precisa de ${need} de ${list.length}.`}>
      {draftText ? (
        <div className="lesson-phase-review-text">
          <span>Seu texto para conferir</span>
          <p>{draftText}</p>
        </div>
      ) : null}
      <ul className="lesson-phase-checklist">
        {list.map((entry) => {
          const isOn = Boolean(checked[entry.id]);
          const Icon = isOn ? CheckCircle2 : Circle;
          return (
            <li key={entry.id}>
              <button type="button" className={isOn ? 'on' : ''} onClick={() => toggle(entry.id)}>
                <Icon size={16} /> <span>{entry.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </PhaseShell>
  );
}
