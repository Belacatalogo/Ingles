import { useState } from 'react';
import { Check, CheckCircle2, Loader2, Mic, Sparkles, Volume2 } from 'lucide-react';
import { PhaseShell } from './PhaseShell.jsx';
import { SpeakExercise } from '../../../practice/components/SpeakExercise.jsx';
import { generateGeminiAudioBlob } from '../../../services/geminiAudioService.js';
import { playLearningAudio } from '../../../services/audioPlayback.js';
import { analyzeStudentAnswer } from '../../../services/studentAnswerAnalysis/index.js';
import { clean, expectedOf, noteOf, textOf } from '../text/normalize.js';
import { StudentAnswerFeedbackCard } from '../../../components/ai/StudentAnswerFeedbackCard.jsx';

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

function promptLabel(phase) {
  const id = clean(phase?.id).toLowerCase();
  if (id.includes('repeat')) return 'Fale esta frase';
  if (id.includes('substitution')) return 'Use este modelo e faça a troca';
  if (id.includes('qa')) return 'Responda esta pergunta';
  if (id.includes('build-answer')) return 'Monte sua resposta com este apoio';
  if (id.includes('recording')) return 'Grave esta tarefa';
  if (id.includes('free')) return 'Sua tarefa de fala livre';
  return 'O que falar agora';
}

function SpeakingPromptCard({ phase, item, prompt, expected }) {
  const helper = clean(noteOf(item));
  const modelText = clean(expected || prompt);
  if (!modelText) return null;

  return (
    <div className="lesson-phase-model-answer" style={{ marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
          <small style={{ textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.8 }}>{promptLabel(phase)}</small>
          <b>{modelText}</b>
        </span>
        <ModelAudioButton text={modelText} />
      </div>
      {helper ? <small>{helper}</small> : null}
    </div>
  );
}

export function SpeakField({ phase, flow, item = {}, eyebrow = 'Sua vez de falar', instruction, lesson = null }) {
  const [value, setValue] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const attempted = Boolean(flow?.attempts?.[phase.id]);
  const prompt = clean(textOf(item) || phase?.prompt || phase?.description || phase?.title);
  const expected = clean(expectedOf(item) || (typeof item === 'string' ? item : ''));

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

  async function handleAiAnalyze() {
    if (aiLoading) return;
    setAiLoading(true);
    setAiAnalysis(null);
    try {
      const result = await analyzeStudentAnswer({
        lesson,
        pillar: 'speaking',
        skill: clean(item.title || item.prompt || item.question || prompt || 'fala'),
        studentText: value.trim(),
        expectedAnswer: expected || prompt,
        allowAi: true,
      });
      setAiAnalysis(result);
    } catch {
      setAiAnalysis({ feedbackPt: 'Não foi possível analisar agora. Continue pela aula.', score: null, source: 'local' });
    } finally {
      setAiLoading(false);
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

  const aiAnalysisNode = attempted ? (
    <div className="lesson-phase-ai-analysis">
      {!aiAnalysis ? (
        <button type="button" className="lesson-phase-link" onClick={handleAiAnalyze} disabled={aiLoading}>
          <Sparkles size={13} /> {aiLoading ? 'Analisando...' : 'Analisar com IA'}
        </button>
      ) : (
        <StudentAnswerFeedbackCard
          result={aiAnalysis}
          loading={false}
          onRetry={() => setAiAnalysis(null)}
        />
      )}
    </div>
  ) : null;

  return (
    <PhaseShell
      eyebrow={eyebrow}
      title={phase?.title || prompt}
      instruction={instruction || 'Fale em voz alta. Se não puder falar agora, escreva o que você diria (mínimo 2 palavras).'}
      feedback={feedbackNode}
      footnote="Use fala real ou fallback escrito para liberar a próxima fase."
    >
      <div className="lesson-phase-speak-wrap">
        <SpeakingPromptCard phase={phase} item={item} prompt={prompt} expected={expected} />
        <SpeakExercise value={value} feedback={feedback} onSpeak={handleSpeak} onChange={handleChange} />
        <p className="lesson-phase-speak-hint"><Mic size={12} /> Toque em "Falar agora" ou escreva o que falaria (mínimo 2 palavras).</p>
      </div>
      {aiAnalysisNode}
    </PhaseShell>
  );
}
