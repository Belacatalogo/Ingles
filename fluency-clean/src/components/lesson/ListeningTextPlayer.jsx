import { useMemo, useState } from 'react';
import { Headphones, PauseCircle, PlayCircle } from 'lucide-react';
import { Card } from '../ui/Card.jsx';

function clean(value) {
  return String(value ?? '').trim();
}

function getListeningText(lesson) {
  return clean(lesson?.audioText || lesson?.transcript || lesson?.audioScript || lesson?.mainText || '');
}

export function ListeningTextPlayer({ lesson }) {
  const [status, setStatus] = useState('');
  const text = useMemo(() => getListeningText(lesson), [lesson]);
  const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window && Boolean(text);

  function stopAudio() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setStatus('Áudio parado.');
  }

  function playAudio() {
    if (!canSpeak) {
      setStatus('Áudio não disponível neste aparelho. Use o transcript como apoio por enquanto.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.86;
    utterance.pitch = 1;
    utterance.onstart = () => setStatus('Ouvindo o texto da aula.');
    utterance.onend = () => setStatus('Escuta concluída.');
    utterance.onerror = () => setStatus('Não foi possível tocar o áudio agora.');
    window.speechSynthesis.speak(utterance);
  }

  if (lesson?.pillar !== 'listening' && lesson?.type !== 'listening') return null;

  return (
    <Card eyebrow="Listening" title="Ouça o texto da aula">
      <p>Toque em ouvir antes de abrir o transcript. Depois escute de novo acompanhando o texto.</p>
      <div className="answer-actions">
        <button type="button" className="primary-button" onClick={playAudio}>
          <PlayCircle size={16} /> Ouvir texto
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
