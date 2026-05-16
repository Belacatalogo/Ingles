import { useEffect, useMemo, useRef, useState } from 'react';
import { Headphones, PauseCircle, PlayCircle } from 'lucide-react';
import { generateGeminiAudioBlob } from '../../../services/geminiAudioService.js';
import { PhaseShell } from './PhaseShell.jsx';
import { clean } from '../text/normalize.js';

function getSpeakerName(line) {
  const match = String(line).match(/^\s*([A-ZÁÉÍÓÚÂÊÔÃÕÇ][\wÁÉÍÓÚÂÊÔÃÕÇáéíóúâêôãõç' -]{1,28})\s*:/);
  return match ? match[1].trim() : '';
}

function getSpeakers(text) {
  const names = [];
  String(text).split('\n').forEach((line) => {
    const name = getSpeakerName(line);
    if (name && !names.includes(name)) names.push(name);
  });
  return names.slice(0, 6);
}

export function AudioListenField({ phase, flow }) {
  const [plays, setPlays] = useState(0);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const audioRef = useRef(null);
  const text = clean(phase.audioText || phase.transcript || phase.script || '');
  const limit = phase.limit || 2;
  const speakers = useMemo(() => getSpeakers(text), [text]);

  useEffect(() => () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
  }, [audioUrl]);

  async function prepareAudio() {
    if (!text) {
      setStatus('Esta aula ainda não tem texto de áudio cadastrado.');
      return;
    }
    if (loading) return;
    setLoading(true);
    setStatus(speakers.length >= 2 ? 'Preparando diálogo com vozes diferentes...' : 'Preparando áudio natural...');
    try {
      const blob = await generateGeminiAudioBlob({ text, speakers, style: phase.audioStyle || 'listening' });
      const url = URL.createObjectURL(blob);
      setAudioUrl((currentUrl) => {
        if (currentUrl) URL.revokeObjectURL(currentUrl);
        return url;
      });
      setStatus('Áudio pronto. Toque no player para ouvir.');
    } catch (error) {
      setStatus(error?.message || 'Não foi possível preparar o áudio agora.');
    } finally {
      setLoading(false);
    }
  }

  function markPlay() {
    setPlays((value) => Math.min(value + 1, limit));
    if (!flow.attempts[phase.id]) flow.markAttempt(phase.id, { played: true });
    setStatus('Ouvindo áudio natural.');
  }

  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setStatus('Áudio parado.');
  }

  return (
    <PhaseShell eyebrow="Escuta" title={phase.bodyTitle || phase.title} instruction={phase.instruction}>
      <div className="answer-actions">
        <button type="button" className="lesson-phase-play lesson-phase-primary" onClick={prepareAudio} disabled={loading || !text}>
          <PlayCircle size={18} /> {loading ? 'Preparando...' : audioUrl ? 'Preparar novamente' : 'Preparar áudio'}
        </button>
        <button type="button" className="lesson-flow-secondary-action" onClick={stopAudio} disabled={!audioUrl}>
          <PauseCircle size={16} /> Parar
        </button>
      </div>
      {audioUrl ? (
        <audio
          ref={audioRef}
          className="listening-natural-audio-player"
          controls
          src={audioUrl}
          onPlay={markPlay}
          onEnded={() => setStatus('Escuta concluída.')}
        />
      ) : null}
      <p className="lesson-phase-speak-hint"><Headphones size={12} /> Escutas registradas nesta etapa: {plays}/{limit}. Transcript só aparece depois das tentativas iniciais.</p>
      {status ? <p className="generator-message completion-message"><Headphones size={14} /> {status}</p> : null}
    </PhaseShell>
  );
}
