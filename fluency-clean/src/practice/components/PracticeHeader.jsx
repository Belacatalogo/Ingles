import { Heart, X } from 'lucide-react';

const STARTING_LIVES = 5;

export function PracticeHeader({ done, started, progress, index, total, correctCount, onClose }) {
  return (
    <header className="practice-topbar">
      <button type="button" className="practice-close" onClick={onClose} aria-label="Fechar prática"><X size={26} /></button>
      <div className="practice-progress"><span style={{ width: `${done ? 100 : started ? progress : 0}%` }} /></div>
      <strong>{done ? `${correctCount}/${total}` : started ? `${index + 1}/${total}` : `${total}`}</strong>
    </header>
  );
}

export function LivesBar({ lives, maxLives = STARTING_LIVES, reviewMode }) {
  return (
    <div className={`practice-lives ${reviewMode ? 'review' : ''}`} aria-label={`${lives} vidas restantes`}>
      {Array.from({ length: maxLives }).map((_, index) => (
        <span key={index} className={index < lives ? 'on' : 'off'}><Heart size={14} fill="currentColor" /></span>
      ))}
    </div>
  );
}
