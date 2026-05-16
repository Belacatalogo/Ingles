import { useState } from 'react';
import { Check, CheckCircle2, Loader2, Mic, Volume2 } from 'lucide-react';
import { PhaseShell } from './PhaseShell.jsx';
import { SpeakExercise } from '../../../practice/components/SpeakExercise.jsx';
import { generateGeminiAudioBlob } from '../../../services/geminiAudioService.js';
import { playLearningAudio } from '../../../services/audioPlayback.js';
import { clean, expectedOf } from '../text/normalize.js';

function ModelAudioButton({ text }) {
  const [status, setStatus] = useState('');
  if (!text) return null;
  async function play() {
    setStatus('loading');
    try {
      const blob = await generateGeminiAudioBlob({ text, style: 'shadowing' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => URL.revokeObjectURL(url);
      await audio.play();
      setStatus('');
    } catch {
      await playLearningAudio({ text, label: 'modelo de fala', allowBrowserFallback: true });
      setStatus('');
    }
  }
  return (
    <button type="button" className="lesson-phase-model-audio-btn" onClick={play} disabled={status === 'loading'} title="Ouvir modelo">
      {status === 'loading' ? <Loader2 size={14} className="spin" /> : <Volume2 size={14} />}
    </button>
  );
}

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
    const words = next.trim().split(/\s+/).filter(Boolean).length;
    if (words >= 2 && !attempted) {
      flow.markAttempt(phase.id, { spoken: false, value: next });
    }
  }

  const feedbackNode = attempted ? (
    <div className="lesson-phase-feedback ok">
      <p><CheckCircle2 size={14} /> <b>Tentativa registrada. Você pode avançar.</b></p>
      {expected ? (
        <div className="lesson-phase-model-answer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <Check size={13} /> Modelo: <b>{expected}</b>
          </span>
          <ModelAudioButton text={expected} />
        </div>
      ) : null}
    </div>
  ) : null;

  return (
    <PhaseShell
      eyebrow={eyebrow}
      title={prompt}
      instruction={instruction || 'Fale em voz alta. Se não puder falar agora, escreva o que você diria (mínimo 2 palavras).'}
      feedback={feedbackNode}
      footnote="Use fala real ou fallback escrito para liberar a próxima fase."
    >
      <div className="lesson-phase-speak-wrap">
        <SpeakExercise value={value} feedback={feedback} onSpeak={handleSpeak} onChange={handleChange} />
        <p className="lesson-phase-speak-hint"><Mic size={12} /> Toque em "Falar agora" ou escreva o que falaria (mínimo 2 palavras).</p>
      </div>
    </PhaseShell>
  );
}
