import { Volume2 } from 'lucide-react';

export function AudioPrompt({ listening, onPlay }) {
  return (
    <button
      type="button"
      className="practice-audio-big practice-audio-btn"
      onClick={onPlay}
      disabled={listening}
      aria-disabled={listening ? 'true' : 'false'}
      aria-label={listening ? 'Áudio tocando' : 'Ouvir novamente'}
    >
      <Volume2 size={48} aria-hidden="true" />
      <span>{listening ? 'Tocando...' : 'Ouvir'}</span>
    </button>
  );
}
