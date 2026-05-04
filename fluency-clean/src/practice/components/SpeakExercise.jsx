import { Mic } from 'lucide-react';

export function SpeakExercise({ value, feedback, onSpeak, onChange }) {
  const disabled = Boolean(feedback && !feedback.retryable);
  return (
    <div className="practice-speak-box">
      <button type="button" onClick={onSpeak} disabled={disabled} aria-disabled={disabled ? 'true' : 'false'} aria-label="Iniciar resposta falada"><Mic size={28} aria-hidden="true" /> Falar agora</button>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Ou digite o que falou..." aria-label="Texto da resposta falada" disabled={disabled} aria-disabled={disabled ? 'true' : 'false'} />
    </div>
  );
}
