import { useState } from 'react';
import { Check, CheckCircle2, Mic } from 'lucide-react';
import { PhaseShell } from './PhaseShell.jsx';
import { SpeakExercise } from '../../../practice/components/SpeakExercise.jsx';
import { clean, expectedOf } from '../text/normalize.js';

export function SpeakField({ phase, flow, item = {}, eyebrow = 'Sua vez de falar', instruction }) {
  const [value, setValue] = useState('');
  const [feedback, setFeedback] = useState(null);
  const attempted = Boolean(flow?.attempts?.[phase.id]);
  const prompt = clean(item.prompt || item.text || item.title);
  const expected = expectedOf(item);

  function handleSpeak() {
    setFeedback({ ok: true, retryable: false });
    flow.markAttempt(phase.id, { spoken: true, value: '' });
  }

  function handleChange(next) {
    setValue(next);
    if (next.trim() && !attempted) {
      flow.markAttempt(phase.id, { spoken: false, value: next });
    }
  }

  const feedbackNode = attempted ? (
    <div className="lesson-phase-feedback ok">
      <p><CheckCircle2 size={14} /> <b>Tentativa registrada. Você pode avançar.</b></p>
      {expected ? (
        <p className="lesson-phase-model-answer">
          <Check size={13} /> Modelo: <b>{expected}</b>
        </p>
      ) : null}
    </div>
  ) : null;

  return (
    <PhaseShell
      eyebrow={eyebrow}
      title={prompt}
      instruction={instruction || 'Fale em voz alta. Se não puder falar agora, escreva o que você diria.'}
      feedback={feedbackNode}
      footnote="Use fala real ou fallback escrito para liberar a próxima fase."
    >
      <div className="lesson-phase-speak-wrap">
        <SpeakExercise value={value} feedback={feedback} onSpeak={handleSpeak} onChange={handleChange} />
        <p className="lesson-phase-speak-hint"><Mic size={12} /> Toque em "Falar agora" ou digite a versão que você falou.</p>
      </div>
    </PhaseShell>
  );
}
