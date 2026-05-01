export function TextExercise({ value, feedback, onChange }) {
  return (
    <textarea
      className="practice-textarea"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Digite sua resposta..."
      disabled={Boolean(feedback && !feedback.retryable)}
    />
  );
}
