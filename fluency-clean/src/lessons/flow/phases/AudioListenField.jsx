import { useEffect, useMemo, useRef, useState } from 'react';
import { Headphones, PauseCircle, PlayCircle, RefreshCw } from 'lucide-react';
import { generateGeminiAudioBlob } from '../../../services/geminiAudioService.js';
import { playLearningAudio } from '../../../services/audioPlayback.js';
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
      setStatus('');
    } catch {
      setStatus('Reproduzindo via navegador...');
      const result = await playLearningAudio({ text, label: phase.title || 'escuta', allowBrowserFallback: true });
      if (result.ok) {
        markPlay();
        setStatus('');
      } else {
        setStatus('Não foi possível reproduzir o áudio. Verifique as configurações de chave.');
      }
    } finally {
      setLoading(false);
    }
  }

  function markPlay() {
    setPlays((value) => Math.min(value + 1, limit));
    if (!flow.attempts[phase.id]) flow.markAttempt(phase.id, { played: true });
  }

  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }

  const playsLeft = limit - plays;

  return (
    <PhaseShell eyebrow="Escuta" title={phase.bodyTitle || phase.title} instruction={phase.instruction}>
      <div className="answer-actions">
        {!audioUrl ? (
          <button type="button" className="lesson-phase-play" onClick={prepareAudio} disabled={loading || !text}>
            <PlayCircle size={18} /> {loading ? 'Preparando...' : 'Preparar áudio'}
          </button>
        ) : (
          <>
            <div className="lesson-phase-audio-ready">Áudio pronto</div>
            <button type="button" className="lesson-flow-secondary-action" onClick={prepareAudio} disabled={loading}>
              <RefreshCw size={14} /> {loading ? 'Preparando...' : 'Novo áudio'}
            </button>
            <button type="button" className="lesson-flow-secondary-action" onClick={stopAudio}>
              <PauseCircle size={14} /> Parar
            </button>
          </>
        )}
      </div>
      {audioUrl ? (
        <audio
          ref={audioRef}
          className="listening-natural-audio-player"
          controls
          src={audioUrl}
          onPlay={markPlay}
          onEnded={() => setStatus('')}
        />
      ) : null}
      <p className="lesson-phase-play-count">
        <Headphones size={12} /> {plays === 0 ? `Ouça até ${limit}x nesta etapa.` : `Escutas nesta etapa: ${plays}/${limit}${playsLeft > 0 ? ` — ${playsLeft} restante${playsLeft > 1 ? 's' : ''}` : ' — limite atingido'}.`}
      </p>
      {status ? <p className="generator-message"><Headphones size={14} /> {status}</p> : null}
    </PhaseShell>
  );
}
