import { useEffect, useMemo, useState } from 'react';

function clean(value) {
  return String(value ?? '').trim();
}

function buildInitialValues(blanks = []) {
  return blanks.reduce((acc, blank) => ({ ...acc, [blank.id]: '' }), {});
}

export function SummaryClozeExercise({ item, feedback, onSubmit }) {
  const [values, setValues] = useState(() => buildInitialValues(item?.blanks || []));

  useEffect(() => {
    setValues(buildInitialValues(item?.blanks || []));
  }, [item?.id]);

  const parts = useMemo(() => {
    const text = String(item?.summaryText || '');
    const regex = /\{\{(\d+)\}\}/g;
    const out = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        out.push({ kind: 'text', value: text.slice(lastIndex, match.index) });
      }
      out.push({ kind: 'blank', id: match[1] });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      out.push({ kind: 'text', value: text.slice(lastIndex) });
    }

    return out;
  }, [item?.summaryText]);

  const blanks = Array.isArray(item?.blanks) ? item.blanks : [];
  const allFilled = blanks.length > 0 && blanks.every((blank) => clean(values[blank.id]).length > 0);
  const perBlank = Array.isArray(feedback?.perBlank) ? feedback.perBlank : [];

  function statusForBlank(id) {
    return perBlank.find((blank) => String(blank.id) === String(id));
  }

  function changeValue(id, value) {
    setValues((current) => ({ ...current, [id]: value }));
  }

  return (
    <div className="practice-summary-cloze">
      <div className="practice-summary-cloze-instruction">{item.prompt}</div>
      <div className="practice-summary-cloze-text">
        {parts.map((part, index) => {
          if (part.kind === 'text') return <span key={`text-${index}`}>{part.value}</span>;
          const blank = blanks.find((candidate) => String(candidate.id) === String(part.id));
          const status = statusForBlank(part.id);
          return (
            <span key={`blank-${part.id}-${index}`} className="practice-summary-cloze-inline">
              <input
                type="text"
                className={status ? status.isCorrect ? 'right' : 'wrong' : ''}
                value={values[part.id] || ''}
                onChange={(event) => changeValue(part.id, event.target.value)}
                placeholder={blank?.hint || '...'}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label={`Lacuna ${part.id}`}
                disabled={Boolean(feedback)}
              />
              {status && !status.isCorrect ? (
                <small>{status.expected}</small>
              ) : null}
            </span>
          );
        })}
      </div>
      <button
        type="button"
        className="practice-summary-cloze-submit"
        disabled={!allFilled || Boolean(feedback)}
        onClick={() => onSubmit(values)}
      >
        Confirmar
      </button>
    </div>
  );
}
