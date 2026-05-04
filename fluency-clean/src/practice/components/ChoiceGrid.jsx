export function ChoiceGrid({ item, value, feedback, normalize, onSelect }) {
  return (
    <div className="practice-choice-grid" role="group" aria-label="Opções de resposta">
      {item.options.map((option, index) => {
        const selected = normalize(value) === normalize(option);
        const right = feedback && normalize(option) === normalize(item.answer);
        const wrong = feedback && selected && !right;
        const label = item.optionLabels?.[option] || option;
        const stateLabel = right ? 'correta' : wrong ? 'incorreta' : selected ? 'selecionada' : 'não selecionada';
        return (
          <button
            type="button"
            key={`${option}-${index}`}
            onClick={() => onSelect(option)}
            disabled={Boolean(feedback)}
            aria-disabled={Boolean(feedback) ? 'true' : 'false'}
            aria-label={`Escolher resposta ${String.fromCharCode(65 + index)}: ${label}. Estado: ${stateLabel}`}
            aria-pressed={selected}
            className={`practice-option-btn ${right ? 'right' : wrong ? 'wrong' : selected ? 'selected' : ''}`}
          >
            <span aria-hidden="true">{String.fromCharCode(65 + index)}</span>
            <b className="practice-option-text">{label}</b>
          </button>
        );
      })}
    </div>
  );
}
