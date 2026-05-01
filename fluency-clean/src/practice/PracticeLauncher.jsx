import { useMemo, useState } from 'react';
import { CheckCircle2, Dumbbell, Heart, PlayCircle, RotateCcw, Target } from 'lucide-react';
import { buildPracticeItems } from './PracticePlanAdapter.js';
import { PracticeFullscreen } from './PracticeFullscreen.jsx';
import { getPracticeSessionsForLesson, recordPracticeSession } from '../services/progressStore.js';

function getBestSession(sessions) {
  return sessions.reduce((best, session) => {
    if (!best) return session;
    if ((session.accuracy || 0) > (best.accuracy || 0)) return session;
    return best;
  }, null);
}

export function PracticeLauncher({ lesson, onComplete }) {
  const [open, setOpen] = useState(false);
  const [revision, setRevision] = useState(0);
  const sessions = useMemo(() => getPracticeSessionsForLesson(lesson), [lesson, revision]);
  const bestSession = useMemo(() => getBestSession(sessions), [sessions]);
  const lastSession = sessions[0] || null;
  const [summary, setSummary] = useState(lastSession);
  const items = useMemo(() => buildPracticeItems(lesson, { min: 14, max: 36 }), [lesson]);
  const visibleSummary = summary || lastSession;
  const hasPractice = Boolean(visibleSummary);

  function handleComplete(result) {
    const session = recordPracticeSession({ lesson, ...result });
    setSummary(session);
    setRevision((value) => value + 1);
    onComplete?.(session);
  }

  return (
    <section className={`pillar-card practice-launcher-card ${hasPractice ? 'practice-launcher-completed' : ''}`} id="lesson-practice">
      <div className="pillar-card-title"><Dumbbell size={17} /> Prática profunda</div>
      <h2>{hasPractice ? 'Prática registrada' : 'Treine o conteúdo da aula'}</h2>
      <p>
        {hasPractice
          ? 'Seu treino foi salvo. Você pode revisar novamente para melhorar precisão, vidas e pontos fracos.'
          : 'Exercícios em tela cheia, uma pergunta por vez, com escuta, escrita, fala, montagem de frases e correção imediata.'}
      </p>
      <div className="practice-launcher-meta">
        <span>{items.length} exercícios</span>
        {visibleSummary ? <span><CheckCircle2 size={14} /> {visibleSummary.correct}/{visibleSummary.total} acertos</span> : <span>qualidade filtrada</span>}
        {visibleSummary ? <span><Target size={14} /> {visibleSummary.accuracy}% precisão</span> : null}
        {visibleSummary ? <span><Heart size={14} /> {visibleSummary.lives} vidas</span> : null}
      </div>
      {bestSession ? (
        <div className="practice-review-summary">
          <strong>Melhor sessão: {bestSession.accuracy}%</strong>
          <span>{bestSession.mistakes ? `${bestSession.mistakes} ponto(s) para revisar` : 'sem erros nessa sessão'}</span>
        </div>
      ) : null}
      <button type="button" className="primary-action" onClick={() => setOpen(true)}>
        {hasPractice ? <RotateCcw size={18} /> : <PlayCircle size={18} />}
        {hasPractice ? 'Revisar novamente' : 'Começar prática'}
      </button>
      <PracticeFullscreen lesson={lesson} open={open} onClose={() => setOpen(false)} onComplete={handleComplete} />
    </section>
  );
}
