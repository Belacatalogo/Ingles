import { Heart, X } from 'lucide-react';

const STARTING_LIVES = 5;

export function PracticeHeader({ done, started, progress, index, total, correctCount, onClose }) {
  const currentValue = done ? total : started ? Math.min(index + 1, total) : 0;
  const visualProgress = done ? 100 : started ? progress : 0;
  return (
    <header className="practice-topbar">
      <button type="button" className="practice-close" onClick={onClose} aria-label="Fechar prática"><X size={26} aria-hidden="true" /></button>
      <div
        className="practice-progress"
        role="progressbar"
        aria-valuenow={currentValue}
        aria-valuemin={0}
        aria-valuemax={total || 0}
        aria-label={started ? `Questão ${currentValue} de ${total}` : `Prática com ${total} questões`}
      >
        <span style={{ width: `${visualProgress}%` }} />
      </div>
      <strong aria-live="polite">{done ? `${correctCount}/${total}` : started ? `${index + 1}/${total}` : `${total}`}</strong>
    </header>
  );
}

export function LivesBar({ lives, maxLives = STARTING_LIVES, reviewMode }) {
  return (
    <div className={`practice-lives ${reviewMode ? 'review' : ''}`} aria-label={`${lives} vidas restantes de ${maxLives}`} role="status">
      {Array.from({ length: maxLives }).map((_, index) => (
        <span key={index} className={index < lives ? 'on' : 'off'} aria-hidden="true"><Heart size={14} fill="currentColor" /></span>
      ))}
    </div>
  );
}
