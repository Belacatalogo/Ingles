import { useMemo, useRef, useState } from 'react';
import { Headphones, PauseCircle, PlayCircle } from 'lucide-react';
import { Card } from '../ui/Card.jsx';

function clean(value) {
  return String(value ?? '').trim();
}

function getListeningText(lesson) {
  return clean(lesson?.audioText || lesson?.transcript || lesson?.audioScript || lesson?.mainText || '');
}

function base64ToBlob(base64, mimeType = 'audio/wav') {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return new Blob([bytes], { type: mimeType });
}

export function ListeningTextPlayer({ lesson }) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);
  const text = useMemo(() => getListeningText(lesson), [lesson]);

  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setStatus('Áudio parado.');
  }

  async function playAudio() {
    if (!text) {
      setStatus('Esta aula ainda não tem texto de áudio cadastrado.');
      return;
    }
    setLoading(true);
    setStatus('Preparando áudio natural...');
    try {
      const response = await fetch('/api/gemini-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.audioBase64) throw new Error(payload.error || 'Áudio natural ainda não configurado.');
      const blob = base64ToBlob(payload.audioBase64, payload.mimeType || 'audio/wav');
      const url = URL.createObjectURL(blob);
      if (audioRef.current) audioRef.current.pause();
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => setStatus('Escuta concluída.');
      audio.onerror = () => setStatus('Não foi possível tocar o áudio natural agora.');
      await audio.play();
      setStatus('Ouvindo áudio natural.');
    } catch (error) {
      setStatus(error?.message || 'Áudio natural ainda não configurado.');
    } finally {
      setLoading(false);
    }
  }

  if (lesson?.pillar !== 'listening' && lesson?.type !== 'listening') return null;

  return (
    <Card eyebrow="Listening" title="Ouça o texto da aula">
      <p>Toque em ouvir antes de abrir o transcript. Depois escute de novo acompanhando o texto.</p>
      <div className="answer-actions">
        <button type="button" className="primary-button" onClick={playAudio} disabled={loading}>
          <PlayCircle size={16} /> {loading ? 'Preparando...' : 'Ouvir áudio natural'}
        </button>
        <button type="button" className="secondary-button" onClick={stopAudio}>
          <PauseCircle size={16} /> Parar áudio
        </button>
      </div>
      {status ? <p className="generator-message completion-message"><Headphones size={14} /> {status}</p> : null}
      {!text ? <p className="static-lesson-muted">Esta aula ainda não tem texto de áudio cadastrado.</p> : null}
    </Card>
  );
}
