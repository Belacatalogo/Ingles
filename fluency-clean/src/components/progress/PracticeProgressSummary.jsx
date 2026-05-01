import { AlertTriangle, CheckCircle2, Heart, RotateCcw, Target } from 'lucide-react';
import { getPracticeReviewQueue, getPracticeSessions } from '../../services/progressStore.js';

function formatDate(value) {
  if (!value) return '';
  try {
    return new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  } catch {
    return String(value).slice(0, 10);
  }
}

export function PracticeProgressSummary() {
  const sessions = getPracticeSessions();
  const reviewQueue = getPracticeReviewQueue(6);
  const latest = sessions[0] || null;
  const average = sessions.length
    ? Math.round(sessions.reduce((total, session) => total + Number(session.accuracy || 0), 0) / sessions.length)
    : 0;
  const totalExercises = sessions.reduce((total, session) => total + Number(session.total || 0), 0);
  const totalMistakes = sessions.reduce((total, session) => total + Number(session.mistakes || 0), 0);

  return (
    <section className="progress-section-card practice-progress-card">
      <div className="progress-section-title">
        <span>Prática profunda</span>
        <small>{sessions.length ? `${sessions.length} sessão(ões)` : 'sem prática ainda'}</small>
      </div>

      {sessions.length ? (
        <>
          <div className="practice-progress-grid">
            <article>
              <Target size={17} />
              <span>Precisão média</span>
              <strong>{average}%</strong>
            </article>
            <article>
              <CheckCircle2 size={17} />
              <span>Exercícios</span>
              <strong>{totalExercises}</strong>
            </article>
            <article>
              <AlertTriangle size={17} />
              <span>Para revisar</span>
              <strong>{totalMistakes}</strong>
            </article>
          </div>

          {latest ? (
            <article className="practice-latest-session">
              <div>
                <RotateCcw size={18} />
              </div>
              <section>
                <span>Última prática · {formatDate(latest.completedAt)}</span>
                <strong>{latest.title}</strong>
                <p>{latest.correct}/{latest.total} acertos · {latest.accuracy}% precisão · {latest.lives} vida(s)</p>
              </section>
              {latest.reviewMode ? <b>revisão</b> : <Heart size={16} />}
            </article>
          ) : null}

          {reviewQueue.length ? (
            <div className="practice-review-list">
              <header>
                <strong>Fila de revisão</strong>
                <span>erros recentes da prática</span>
              </header>
              {reviewQueue.slice(0, 4).map((item, index) => (
                <article key={`${item.lessonId}-${item.id}-${index}`}>
                  <span>{item.type}</span>
                  <div>
                    <strong>{item.expected || 'Resposta esperada'}</strong>
                    <small>{item.lessonTitle}</small>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="practice-review-empty">
              <CheckCircle2 size={20} />
              <span>Nenhum erro recente para revisar.</span>
            </div>
          )}
        </>
      ) : (
        <div className="progress-empty-state">
          <Target size={24} />
          <p>Conclua uma prática fullscreen para registrar precisão, vidas e pontos de revisão.</p>
        </div>
      )}
    </section>
  );
}
