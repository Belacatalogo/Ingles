import { useState } from 'react';
import { Check, Eye, RotateCcw } from 'lucide-react';
import { PhaseShell } from './PhaseShell.jsx';
import { clean, expectedOf, isCorrect, wordCount } from '../text/normalize.js';

export function AttemptField({
  phase, flow, item = {}, multiline = false, minWords = 1,
  placeholder = 'Sua resposta...', instruction, eyebrow,
}) {
  const [value, setValue] = useState('');
  const expected = expectedOf(item);
  const attempted = Boolean(flow?.attempts?.[phase.id]);
  const enoughWords = wordCount(value) >= minWords;
  const matched = expected ? isCorrect(value, expected) : enoughWords;

  function handleCheck() {
    if (!enoughWords) return;
    flow.markAttempt(phase.id, { value, matched });
  }
  function handleRetry() {
    setValue('');
    flow.setMessage?.('Tente novamente antes de avançar.');
  }

  const Field = multiline ? 'textarea' : 'input';

  return (
    <PhaseShell
      eyebrow={eyebrow || 'Sua tentativa'}
      title={clean(item.title || item.prompt || item.question)}
      instruction={instruction || clean(item.instruction)}
      footnote={minWords > 1 ? `Escreva pelo menos ${minWords} palavras antes de conferir.` : null}
      feedback={attempted ? (
        <div className={matched ? 'lesson-phase-feedback ok' : 'lesson-phase-feedback warn'}>
          {expected ? <p><Eye size={14} /> Modelo esperado: <b>{expected}</b></p> : <p><Check size={14} /> Tentativa registrada.</p>}
          {!matched && expected ? <button type="button" className="lesson-phase-link" onClick={handleRetry}><RotateCcw size={13} /> Tentar de novo</button> : null}
        </div>
      ) : null}
    >
      <div className="lesson-phase-attempt-row">
        <Field
          className={multiline ? 'lesson-phase-textarea' : 'lesson-phase-input'}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          rows={multiline ? 6 : undefined}
          disabled={attempted && (matched || !expected)}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
        />
        {!attempted || (!matched && expected) ? <button type="button" className="lesson-phase-primary" onClick={handleCheck} disabled={!enoughWords}>Conferir</button> : null}
      </div>
    </PhaseShell>
  );
}
