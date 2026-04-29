import { useState } from 'react';
import { Headphones, Mic, Radio, ShieldCheck, Square, Volume2, Waves } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { StatCard } from '../components/ui/StatCard.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { analyzePronunciation } from '../services/azurePronunciation.js';
import { unlockAudioForIOS } from '../services/audioUnlock.js';
import { startRecording, stopRecording } from '../services/recorder.js';
import { speakText, stopSpeech } from '../services/tts.js';

const referenceText = 'I usually study English in the morning because I feel focused and calm.';

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
    setMessage('Reproduzindo frase...');
    const response = await speakText(referenceText);
    setMessage(response.ok ? 'Reprodução finalizada.' : response.error || 'Erro no TTS.');
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
      setMessage('Gravando... toque novamente para parar.');
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
    setMessage('Análise concluída.');
  }

  const score = result?.pronunciationScore ?? result?.accuracyScore ?? '—';

  return (
    <section className="screen-stack speaking-screen-stack">
      <div className="speaking-hero-card">
        <SectionHeader
          eyebrow="Speaking"
          title="Treine sua fala com segurança"
          description="Ouça o modelo, grave sua resposta e receba feedback quando o Azure estiver disponível. O backend privado permanece intacto."
        />
      </div>

      <div className="stats-grid">
        <StatCard label="Modo" value="Azure" hint="backend preservado" icon={ShieldCheck} />
        <StatCard label="Sessão" value={recording ? 'gravando' : 'pronto'} hint="microfone" icon={Mic} />
        <StatCard label="Score" value={String(score)} hint={result ? 'última análise' : 'sem análise'} icon={Waves} />
      </div>

      <Card eyebrow="Preparação" title="Liberar áudio e ouvir modelo">
        <div className="speaking-prompt">
          <p>“{referenceText}”</p>
        </div>
        <div className="audio-actions">
          <button className="secondary-button" type="button" onClick={handleUnlockAudio}>
            <Headphones size={17} /> Liberar áudio iOS
          </button>
          <button className="secondary-button" type="button" onClick={handleSpeak}>
            <Volume2 size={17} /> Ouvir frase
          </button>
          <button className="secondary-button" type="button" onClick={stopSpeech}>
            Parar áudio
          </button>
        </div>
      </Card>

      <Card eyebrow="Gravação" title="Leia e grave sua resposta">
        <div className="speaking-prompt">
          <p>{referenceText}</p>
        </div>
        <button className="record-button" type="button" onClick={handleRecordToggle} disabled={analyzing}>
          {recording ? <Square size={18} /> : <Radio size={18} />}
          {recording ? 'Parar e analisar' : analyzing ? 'Analisando...' : 'Iniciar gravação'}
        </button>
        <p className="generator-message">{message}</p>
      </Card>

      <Card eyebrow="Diagnóstico" title="Resultado da pronúncia">
        <div className="score-preview">
          <span>Pronunciation Score</span>
          <strong>{score}</strong>
          <p>
            {result
              ? `Precisão: ${result.accuracyScore ?? '—'} · Fluência: ${result.fluencyScore ?? '—'} · Completude: ${result.completenessScore ?? '—'}`
              : 'Configure o endpoint Azure no deploy para receber análise real. Sem endpoint, o app mostra erro claro no diagnóstico.'}
          </p>
        </div>
      </Card>
    </section>
  );
}
