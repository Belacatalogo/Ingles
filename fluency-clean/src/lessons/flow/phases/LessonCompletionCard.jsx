import { Award, RotateCcw, ThumbsUp } from 'lucide-react';

function buildSummary(phases = [], attempts = {}) {
  let correct = 0;
  let warn = 0;
  let totalAttempt = 0;
  const missed = [];

  for (const phase of phases) {
    if (!phase.requiresAttempt) continue;
    totalAttempt++;
    const attempt = attempts[phase.id];
    if (!attempt) continue;
    const status = attempt?.feedback?.status ?? (attempt?.matched === false ? 'warn' : 'ok');
    if (status === 'ok' || attempt?.matched !== false) correct++;
    else {
      warn++;
      if (phase.shortTitle) missed.push(phase.shortTitle);
    }
  }

  return { correct, warn, totalAttempt, missed };
}

export function LessonCompletionCard({ phases = [], attempts = {}, onRestart }) {
  const { correct, warn, totalAttempt, missed } = buildSummary(phases, attempts);
  const score = totalAttempt > 0 ? Math.round((correct / totalAttempt) * 100) : 100;
  const isExcellent = score >= 80;

  return (
    <div className="lesson-completion-card">
      <div className="lesson-completion-icon" aria-hidden="true">
        {isExcellent ? <Award size={32} /> : <ThumbsUp size={32} />}
      </div>

      <h3 className="lesson-completion-title">
        {isExcellent ? 'Aula concluída!' : 'Aula finalizada.'}
      </h3>

      <p className="lesson-completion-sub">
        {isExcellent
          ? 'Excelente trabalho. Você passou por todas as fases.'
          : 'Bom esforço. Revise os pontos marcados antes de avançar.'}
      </p>

      {totalAttempt > 0 ? (
        <div className="lesson-completion-stats">
          <div>
            <strong>{correct}</strong>
            <span>acertos</span>
          </div>
          <div>
            <strong>{warn}</strong>
            <span>a revisar</span>
          </div>
          <div>
            <strong>{score}%</strong>
            <span>aproveit.</span>
          </div>
        </div>
      ) : null}

      {missed.length > 0 ? (
        <div className="lesson-completion-missed">
          <span>Revise antes de avançar:</span>
          <ul>
            {missed.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {onRestart ? (
        <button type="button" className="lesson-completion-retry" onClick={onRestart}>
          <RotateCcw size={15} /> Rever aula
        </button>
      ) : null}
    </div>
  );
}
