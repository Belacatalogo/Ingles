import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { PhaseShell } from './PhaseShell.jsx';
import { clean, expectedOf, normalizeAnswer } from '../text/normalize.js';

export function ChoiceField({ phase, flow, item = {}, eyebrow, instruction }) {
  const options = Array.isArray(item.options) ? item.options : [];
  const correct = normalizeAnswer(expectedOf(item) || item.correct);
  const [picked, setPicked] = useState('');
  const attempted = Boolean(flow?.attempts?.[phase.id]);

  function labelOf(option) {
    if (typeof option === 'string') return option;
    return clean(option?.label || option?.text || option?.value);
  }
  function valueOf(option) {
    if (typeof option === 'string') return option;
    return clean(option?.value || option?.label || option?.text);
  }
  function handlePick(option) {
    if (attempted) return;
    const v = valueOf(option);
    setPicked(v);
    const matched = correct ? normalizeAnswer(v) === correct : true;
    flow.markAttempt(phase.id, { value: v, matched });
  }

  return (
    <PhaseShell
      eyebrow={eyebrow || 'Escolha uma resposta'}
      title={clean(item.question || item.prompt || item.title)}
      instruction={instruction || clean(item.instruction)}
      feedback={attempted && correct ? (
        <div className={normalizeAnswer(picked) === correct ? 'lesson-phase-feedback ok' : 'lesson-phase-feedback warn'}>
          {normalizeAnswer(picked) === correct ? <p><Check size={14} /> Resposta correta.</p> : <p><X size={14} /> A resposta esperada era: <b>{expectedOf(item)}</b></p>}
        </div>
      ) : null}
    >
      <ul className="lesson-phase-choice-list">
        {options.map((option, index) => {
          const v = valueOf(option);
          const isPicked = picked === v;
          const isCorrect = attempted && correct && normalizeAnswer(v) === correct;
          const isWrong = attempted && isPicked && !isCorrect;
          const cls = isCorrect ? 'correct' : isWrong ? 'wrong' : isPicked ? 'picked' : '';
          return (
            <li key={`${phase.id}-opt-${index}`}>
              <button type="button" className={`lesson-phase-choice ${cls}`} onClick={() => handlePick(option)} disabled={attempted}>
                <span className="lesson-phase-choice-bullet">{String.fromCharCode(65 + index)}</span>
                <span>{labelOf(option)}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </PhaseShell>
  );
}
