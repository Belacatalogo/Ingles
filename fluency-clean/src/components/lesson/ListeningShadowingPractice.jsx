import { useEffect, useMemo, useRef, useState } from 'react';
import { Headphones, PauseCircle, PlayCircle, SkipForward } from 'lucide-react';
import { generateGeminiAudioBlob } from '../../services/geminiAudioService.js';
import { playLearningAudio } from '../../services/audioPlayback.js';
import { Card } from '../ui/Card.jsx';

function clean(value) {
  return String(value ?? '').trim();
}

function normalizePhrase(value) {
  if (!value) return '';
  if (typeof value !== 'object') return clean(value).replace(/^Repita junto:\s*/i, '');
  return clean(value.phrase || value.text || value.sentence || value.english || value.content || value.title).replace(/^Repita junto:\s*/i, '');
}

function phrasesFromTranscript(text) {
  return String(text || '')
    .split('\n')
    .map((line) => line.replace(/^\s*[^:]{1,28}:\s*/, '').trim())
    .filter(Boolean)
    .slice(0, 10);
}

function getShadowingPhrases(lesson) {
  const direct = Array.isArray(lesson?.shadowing) ? lesson.shadowing.map(normalizePhrase).filter(Boolean) : [];
  if (direct.length) return direct;
  const transcript = lesson?.transcript || lesson?.audioScript || lesson?.audioText || '';
  return phrasesFromTranscript(transcript);
}

export function ListeningShadowingPractice({ lesson }) {
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const audioRef = useRef(null);
  const phrases = useMemo(() => getShadowingPhrases(lesson), [lesson]);
  const phrase = phrases[index] || '';

  useEffect(() => () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
  }, [audioUrl]);

  if ((lesson?.pillar !== 'listening' && lesson?.type !== 'listening') || !phrases.length) return null;

  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setStatus('Áudio parado.');
  }

  function nextPhrase() {
    stopAudio();
    setAudioUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return '';
    });
    setIndex((current) => (current + 1) % phrases.length);
    setStatus('Próxima frase pronta para treinar.');
  }

  async function preparePhraseAudio() {
    if (!phrase) return;
    setLoading(true);
    setStatus('Preparando frase natural...');
    try {
      const blob = await generateGeminiAudioBlob({ text: phrase, style: 'shadowing' });
      const url = URL.createObjectURL(blob);
      setAudioUrl((currentUrl) => {
        if (currentUrl) URL.revokeObjectURL(currentUrl);
        return url;
      });
      setStatus('Frase pronta. Toque no player, escute e repita em voz alta.');
    } catch {
      setStatus('Reproduzindo via navegador...');
      const result = await playLearningAudio({ text: phrase, label: 'frase', allowBrowserFallback: true });
      setStatus(result.ok ? 'Frase reproduzida. Repita em voz alta.' : 'Não foi possível reproduzir o áudio. Verifique as configurações de chave.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card eyebrow="Shadowing" title="Repita ouvindo frase por frase">
      <p>Escute uma frase, pause, repita em voz alta tentando copiar ritmo e clareza. Depois avance para a próxima.</p>
      <article className="static-example-card listening-shadowing-active-card">
        <small>Frase {index + 1}/{phrases.length}</small>
        <strong>{phrase}</strong>
      </article>
      <div className="answer-actions">
        <button type="button" className="primary-button" onClick={preparePhraseAudio} disabled={loading}>
          <PlayCircle size={16} /> {loading ? 'Preparando...' : 'Preparar frase'}
        </button>
        <button type="button" className="secondary-button" onClick={nextPhrase}>
          <SkipForward size={16} /> Próxima frase
        </button>
        <button type="button" className="secondary-button" onClick={stopAudio}>
          <PauseCircle size={16} /> Parar
        </button>
      </div>
      {audioUrl ? (
        <audio
          ref={audioRef}
          className="listening-natural-audio-player"
          controls
          src={audioUrl}
          onPlay={() => setStatus('Ouvindo a frase. Repita logo depois.')}
          onEnded={() => setStatus('Agora repita em voz alta. Depois avance quando quiser.')}
        />
      ) : null}
      {status ? <p className="generator-message completion-message"><Headphones size={14} /> {status}</p> : null}
    </Card>
  );
}
