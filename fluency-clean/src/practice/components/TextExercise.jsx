export function TextExercise({ value, feedback, onChange }) {
  return (
    <textarea
      className="practice-textarea"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Digite sua resposta..."
      aria-label="Digite sua resposta para o exercício atual"
      disabled={Boolean(feedback && !feedback.retryable)}
      aria-disabled={Boolean(feedback && !feedback.retryable) ? 'true' : 'false'}
    />
  );
}
