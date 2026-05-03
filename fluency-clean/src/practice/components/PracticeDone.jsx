import { CheckCircle2, RotateCcw } from 'lucide-react';
import { getMasteryBand } from '../core/PracticeMasteryTags.js';

function MasteryRecap({ touchedTags = [] }) {
  if (!Array.isArray(touchedTags) || touchedTags.length === 0) return null;

  return (
    <section className="practice-mastery-recap" aria-label="Domínio das habilidades praticadas">
      <h3 className="practice-mastery-recap-title">Domínio das habilidades</h3>
      <ul className="practice-mastery-list">
        {touchedTags.slice(0, 6).map((tag) => {
          const band = getMasteryBand(tag.mastery);
          return (
            <li key={tag.tag} className="practice-mastery-item">
              <span className="practice-mastery-label">{tag.label || tag.tag}</span>
              <span className="practice-mastery-bar" aria-hidden="true">
                <span
                  className="practice-mastery-fill"
                  style={{ width: `${Math.max(0, Math.min(100, Number(tag.mastery || 0)))}%`, background: band.color }}
                />
              </span>
              <span className="practice-mastery-band" style={{ color: band.color }}>
                {band.label} · {Math.round(Number(tag.mastery || 0))}%
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function PracticeDone({ reviewMode, correctCount, total, lives, touchedMasteryTags = [], onRestart, onFinish }) {
  return (
    <main className="practice-done">
      <div className="practice-done-medal"><CheckCircle2 size={52} /></div>
      <p className="practice-kind">{reviewMode ? 'Revisão recomendada' : 'Sessão finalizada'}</p>
      <h1>{reviewMode ? 'Você concluiu revisando' : 'Prática concluída'}</h1>
      <p>{reviewMode ? `Você acertou ${correctCount} de ${total}. Refaça a prática para fortalecer os pontos fracos.` : `Você acertou ${correctCount} de ${total} e terminou com ${lives} vida(s). Continue assim.`}</p>
      <MasteryRecap touchedTags={touchedMasteryTags} />
      <button type="button" onClick={onRestart}><RotateCcw size={18} /> Refazer prática</button>
      <button type="button" className="primary" onClick={onFinish}>Voltar para aula</button>
    </main>
  );
}
