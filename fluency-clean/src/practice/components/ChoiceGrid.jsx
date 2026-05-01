export function ChoiceGrid({ item, value, feedback, normalize, onSelect }) {
  return (
    <div className="practice-choice-grid">
      {item.options.map((option, index) => {
        const selected = normalize(value) === normalize(option);
        const right = feedback && normalize(option) === normalize(item.answer);
        const wrong = feedback && selected && !right;
        return (
          <button type="button" key={`${option}-${index}`} onClick={() => onSelect(option)} disabled={Boolean(feedback)} className={right ? 'right' : wrong ? 'wrong' : selected ? 'selected' : ''}>
            <span>{String.fromCharCode(65 + index)}</span>
            <b>{option}</b>
          </button>
        );
      })}
    </div>
  );
}
