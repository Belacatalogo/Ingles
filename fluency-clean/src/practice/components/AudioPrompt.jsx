import { Volume2 } from 'lucide-react';

export function AudioPrompt({ listening, onPlay }) {
  return (
    <button type="button" className="practice-audio-big" onClick={onPlay} disabled={listening}>
      <Volume2 size={48} />
      <span>{listening ? 'Tocando...' : 'Ouvir'}</span>
    </button>
  );
}
