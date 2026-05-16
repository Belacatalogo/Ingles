import { Award, BookOpen, CreditCard, RotateCcw, ThumbsUp, TriangleAlert } from 'lucide-react';
import { computeFlowResults } from '../lessonFlowScore.js';
import { hasLessonFlashcards } from '../../../services/lessonFlashcards.js';

export function LessonCompletionCard({ phases = [], attempts = {}, lesson = null, onRestart, onNavigate }) {
  const { correct, warn, missed, totalAttempt, score, weakTitles } = computeFlowResults(phases, attempts);
  const isExcellent = score >= 80;
  const hasFlashcards = lesson ? hasLessonFlashcards(lesson) : false;
  const hasErrors = weakTitles.length > 0;

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
            <strong>{warn + missed}</strong>
            <span>a revisar</span>
          </div>
          <div>
            <strong>{score}%</strong>
            <span>aproveit.</span>
          </div>
        </div>
      ) : null}

      {hasErrors ? (
        <div className="lesson-completion-missed">
          <span><BookOpen size={12} /> Revise antes de avançar:</span>
          <ul>
            {weakTitles.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="lesson-completion-actions">
        {onRestart ? (
          <button type="button" className="lesson-completion-retry" onClick={onRestart}>
            <RotateCcw size={15} /> Rever aula
          </button>
        ) : null}
        {hasFlashcards && onNavigate ? (
          <button type="button" className="lesson-completion-cta" onClick={() => onNavigate('flashcards')}>
            <CreditCard size={15} /> Ver flashcards
          </button>
        ) : null}
        {hasErrors && onNavigate ? (
          <button type="button" className="lesson-completion-cta warn" onClick={() => onNavigate('course')}>
            <TriangleAlert size={15} /> Revisar erros
          </button>
        ) : null}
      </div>
    </div>
  );
}
