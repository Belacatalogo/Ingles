import { useState } from 'react';
import {
  CheckCircle2,
  Headphones,
  Mic,
  Radio,
  Repeat2,
  ShieldCheck,
  Sparkles,
  Square,
  Target,
  Volume2,
  Waves,
} from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { analyzePronunciation } from '../services/azurePronunciation.js';
import { unlockAudioForIOS } from '../services/audioUnlock.js';
import { startRecording, stopRecording } from '../services/recorder.js';
import { speakText, stopSpeech } from '../services/tts.js';

const referenceText = 'I usually study English in the morning because I feel focused and calm.';

const speakingSteps = [
  'Ouça o modelo uma vez sem repetir.',
  'Repita em voz alta prestando atenção no ritmo.',
  'Grave sua resposta e compare com o modelo.',
];

const focusWords = ['usually', 'English', 'morning', 'focused', 'calm'];

export function SpeakingScreen() {
  const [recording, setRecording] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('Pronto para praticar.');

  async function handleUnlockAudio() {
    const response = await unlockAudioForIOS();
    setMessage(response.ok ? 'Áudio liberado para iOS.' : response.error || 'Falha ao liberar áudio.');
  }

  async function handleSpeak() {
    setMessage('Reproduzindo frase modelo...');
    const response = await speakText(referenceText);
    setMessage(response.ok ? 'Modelo finalizado. Agora repita em voz alta.' : response.error || 'Erro no TTS.');
  }

  async function handleRecordToggle() {
    if (!recording) {
      const started = await startRecording();
      if (!started.ok) {
        setMessage(started.error || 'Não foi possível iniciar gravação.');
        return;
      }
      setResult(null);
      setRecording(true);
      setMessage('Gravando... fale a frase completa e toque novamente para analisar.');
      return;
    }

    setRecording(false);
    setAnalyzing(true);
    setMessage('Finalizando gravação...');

    const stopped = await stopRecording();
    if (!stopped.ok) {
      setAnalyzing(false);
      setMessage(stopped.error || 'Erro ao parar gravação.');
      return;
    }

    setMessage('Enviando para análise Azure...');
    const analyzed = await analyzePronunciation({
      audioBlob: stopped.audioBlob,
      referenceText,
    });

    setAnalyzing(false);

    if (analyzed.status !== 'success') {
      setMessage(analyzed.error || 'Não foi possível analisar a pronúncia.');
      return;
    }

    setResult(analyzed.result);
    setMessage('Análise concluída. Veja seu feedback abaixo.');
  }

  const score = result?.pronunciationScore ?? result?.accuracyScore ?? '—';
  const practiced = result ? 1 : 0;

  return (
    <section className="screen-stack speaking-screen-stack">
      <div className="speaking-hero-card">
        <SectionHeader
          eyebrow="Speaking · A1"
          title="Pratique sua fala com um roteiro claro"
          description="Escute, repita, grave e receba feedback de pronúncia sem alterar o backend Azure privado."
        />
      </div>

      <div className="speaking-metrics-grid">
        <article className="speaking-metric-card">
          <ShieldCheck size={22} />
          <span>Modo</span>
          <strong>Azure</strong>
          <small>backend preservado</small>
        </article>
        <article className="speaking-metric-card">
          <Mic size={22} />
          <span>Sessão</span>
          <strong>{recording ? 'gravando' : analyzing ? 'analisando' : 'pronto'}</strong>
          <small>microfone</small>
        </article>
        <article className="speaking-metric-card">
          <Waves size={22} />
          <span>Score</span>
          <strong>{score}</strong>
          <small>{result ? 'última análise' : 'sem análise'}</small>
        </article>
      </div>

      <Card eyebrow="Roteiro" title="Como praticar agora">
        <div className="speaking-step-list">
          {speakingSteps.map((step, index) => (
            <div className="speaking-step" key={step}>
              <b>{index + 1}</b>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card eyebrow="Frase principal" title="Leia em voz alta">
        <div className="speaking-main-prompt">
          <span>Modelo</span>
          <p>{referenceText}</p>
        </div>
        <div className="speaking-focus-row">
          {focusWords.map((word) => (
            <span key={word}>{word}</span>
          ))}
        </div>
      </Card>

      <Card eyebrow="Preparação" title="Ouça antes de gravar">
        <div className="audio-actions speaking-audio-grid">
          <button className="secondary-button" type="button" onClick={handleUnlockAudio}>
            <Headphones size={17} /> Liberar áudio iOS
          </button>
          <button className="secondary-button" type="button" onClick={handleSpeak}>
            <Volume2 size={17} /> Ouvir modelo
          </button>
          <button className="secondary-button" type="button" onClick={stopSpeech}>
            <Square size={16} /> Parar áudio
          </button>
        </div>
      </Card>

      <Card eyebrow="Gravação" title="Grave sua resposta">
        <div className="speaking-record-panel">
          <div>
            <span>{practiced}/1 prática concluída</span>
            <strong>{recording ? 'Estamos ouvindo você' : 'Toque para começar'}</strong>
          </div>
          <button className="record-button" type="button" onClick={handleRecordToggle} disabled={analyzing}>
            {recording ? <Square size={18} /> : <Radio size={18} />}
            {recording ? 'Parar e analisar' : analyzing ? 'Analisando...' : 'Iniciar gravação'}
          </button>
        </div>
        <p className="generator-message">{message}</p>
      </Card>

      <Card eyebrow="Feedback" title="Resultado da pronúncia">
        <div className="score-preview speaking-score-card">
          <span>Pronunciation Score</span>
          <strong>{score}</strong>
          <p>
            {result
              ? `Precisão: ${result.accuracyScore ?? '—'} · Fluência: ${result.fluencyScore ?? '—'} · Completude: ${result.completenessScore ?? '—'}`
              : 'Grave a frase para receber score, precisão, fluência e completude quando o Azure estiver disponível.'}
          </p>
        </div>
      </Card>

      <Card eyebrow="Desafio final" title="Fale sem ler">
        <div className="speaking-challenge-card">
          <Target size={22} />
          <div>
            <strong>Apresente sua rotina da manhã em 20 segundos.</strong>
            <p>Use pelo menos duas palavras do foco: usually, morning, focused, calm.</p>
          </div>
        </div>
        <div className="speaking-tip-list">
          <span><CheckCircle2 size={15} /> Fale devagar primeiro.</span>
          <span><Repeat2 size={15} /> Repita a mesma frase 3 vezes.</span>
          <span><Sparkles size={15} /> Depois tente com suas próprias palavras.</span>
        </div>
      </Card>
    </section>
  );
}
