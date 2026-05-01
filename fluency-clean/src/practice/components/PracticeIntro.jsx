import { Heart, Headphones, Sparkles } from 'lucide-react';

export function PracticeIntro({ skillLabel, total, level, startingLives, onStart }) {
  return (
    <main className="practice-intro">
      <div className="practice-intro-orb"><Sparkles size={34} /></div>
      <p className="practice-kind">{skillLabel}</p>
      <h1>Prática da aula</h1>
      <p>Treine o conteúdo em etapas curtas, com correção imediata e exercícios variados.</p>
      <div className="practice-intro-stats">
        <span><Headphones size={15} /> {total} exercícios</span>
        <span><Heart size={15} fill="currentColor" /> {startingLives} vidas</span>
        <span>nível {level || 'A1'}</span>
      </div>
      <button type="button" className="practice-start-button" onClick={onStart}>Começar prática</button>
    </main>
  );
}
