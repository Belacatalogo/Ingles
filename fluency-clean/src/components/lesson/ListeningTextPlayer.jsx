import { useEffect, useMemo, useRef, useState } from 'react';
import { Headphones, PauseCircle, PlayCircle } from 'lucide-react';
import { generateGeminiAudioBlob } from '../../services/geminiAudioService.js';
import { playLearningAudio } from '../../services/audioPlayback.js';
import { Card } from '../ui/Card.jsx';

function clean(value) {
  return String(value ?? '').trim();
}

function getListeningText(lesson) {
  return clean(lesson?.audioText || lesson?.transcript || lesson?.audioScript || lesson?.mainText || '');
}

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

export function ListeningTextPlayer({ lesson }) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const audioRef = useRef(null);
  const text = useMemo(() => getListeningText(lesson), [lesson]);
  const speakers = useMemo(() => getSpeakers(text), [text]);

  useEffect(() => () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
  }, [audioUrl]);

  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setStatus('Áudio parado.');
  }

  async function prepareAudio() {
    if (!text) {
      setStatus('Esta aula ainda não tem texto de áudio cadastrado.');
      return;
    }
    setLoading(true);
    setStatus(speakers.length >= 2 ? 'Preparando diálogo com vozes diferentes...' : 'Preparando áudio natural...');
    try {
      const blob = await generateGeminiAudioBlob({ text, speakers, style: 'listening' });
      const url = URL.createObjectURL(blob);
      setAudioUrl((currentUrl) => {
        if (currentUrl) URL.revokeObjectURL(currentUrl);
        return url;
      });
      setStatus('Áudio pronto. Toque no player para ouvir.');
    } catch {
      setStatus('Reproduzindo via navegador...');
      const result = await playLearningAudio({ text, label: 'aula', allowBrowserFallback: true });
      setStatus(result.ok ? 'Áudio reproduzido pelo navegador.' : 'Não foi possível reproduzir o áudio. Verifique as configurações de chave.');
    } finally {
      setLoading(false);
    }
  }

  if (lesson?.pillar !== 'listening' && lesson?.type !== 'listening') return null;

  return (
    <Card eyebrow="Listening" title="Ouça o texto da aula">
      <p>{speakers.length >= 2 ? `Diálogo detectado: ${speakers.join(' e ')} terão vozes diferentes.` : 'Toque em preparar para gerar o áudio natural. Quando o player aparecer, toque nele para ouvir.'}</p>
      <div className="answer-actions">
        <button type="button" className="primary-button" onClick={prepareAudio} disabled={loading}>
          <PlayCircle size={16} /> {loading ? 'Preparando...' : 'Preparar áudio natural'}
        </button>
        <button type="button" className="secondary-button" onClick={stopAudio}>
          <PauseCircle size={16} /> Parar áudio
        </button>
      </div>
      {audioUrl ? (
        <audio
          ref={audioRef}
          className="listening-natural-audio-player"
          controls
          src={audioUrl}
          onPlay={() => setStatus('Ouvindo áudio natural.')}
          onEnded={() => setStatus('Escuta concluída.')}
        />
      ) : null}
      {text ? (
        <details className="listening-audio-text-preview">
          <summary>Texto que será ouvido</summary>
          <p>{text}</p>
        </details>
      ) : null}
      {status ? <p className="generator-message completion-message"><Headphones size={14} /> {status}</p> : null}
      {!text ? <p className="static-lesson-muted">Esta aula ainda não tem texto de áudio cadastrado.</p> : null}
    </Card>
  );
}
