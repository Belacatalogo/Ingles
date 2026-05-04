import { useEffect, useState } from 'react';

export function NewContextExercise({ item, feedback, normalize, onSelect }) {
  const [selected, setSelected] = useState('');

  useEffect(() => {
    setSelected('');
  }, [item?.id]);

  const subPrompt = item?.subQuestion?.prompt || 'Responda sobre o novo contexto.';
  const contextText = item?.newContext?.text || '';

  return (
    <div className="practice-new-context">
      <blockquote className="practice-new-context-text">
        {contextText}
      </blockquote>

      <div className="practice-new-context-sub">
        <p className="practice-new-context-sub-prompt">{subPrompt}</p>
        <div className="practice-new-context-options">
          {item.options.map((option, index) => {
            const isSelected = normalize(selected) === normalize(option);
            const right = feedback && normalize(option) === normalize(item.answer);
            const wrong = feedback && isSelected && !right;
            return (
              <button
                type="button"
                key={`${option}-${index}`}
                className={right ? 'right' : wrong ? 'wrong' : isSelected ? 'is-selected' : ''}
                onClick={() => setSelected(option)}
                disabled={Boolean(feedback)}
              >
                <span>{String.fromCharCode(65 + index)}</span>
                <b>{option}</b>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className="practice-new-context-submit"
          disabled={!selected || Boolean(feedback)}
          onClick={() => onSelect(selected)}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
