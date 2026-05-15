import { useState } from 'react';

export function AttemptBox({
  phaseId,
  flow,
  label = 'Sua tentativa',
  helper = 'Responda com suas palavras antes de avançar.',
  placeholder = 'Digite sua resposta...',
  minLength = 2,
  rows = 5,
}) {
  const [value, setValue] = useState('');
  const enough = value.trim().length >= minLength;

  function saveAttempt() {
    if (!enough) {
      flow?.setMessage?.('Escreva um pouco mais antes de registrar a tentativa.');
      return;
    }
    flow?.markAttempt?.(phaseId || flow?.activePhase?.id, { text: value.trim(), savedAt: new Date().toISOString() });
  }

  return (
    <label className="lesson-flow-attempt-box">
      <span>{label}</span>
      <small>{helper}</small>
      <textarea rows={rows} value={value} onChange={(event) => setValue(event.target.value)} placeholder={placeholder} />
      <button type="button" onClick={saveAttempt}>Registrar tentativa</button>
    </label>
  );
}
