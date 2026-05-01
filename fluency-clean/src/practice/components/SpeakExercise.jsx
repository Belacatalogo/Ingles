import { Mic } from 'lucide-react';

export function SpeakExercise({ value, feedback, onSpeak, onChange }) {
  return (
    <div className="practice-speak-box">
      <button type="button" onClick={onSpeak} disabled={Boolean(feedback && !feedback.retryable)}><Mic size={28} /> Falar agora</button>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Ou digite o que falou..." disabled={Boolean(feedback && !feedback.retryable)} />
    </div>
  );
}
