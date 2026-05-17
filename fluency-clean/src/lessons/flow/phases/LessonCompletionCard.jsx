import { useState } from 'react';
import { Award, BookOpen, BookOpenCheck, CheckCircle2, CreditCard, Lightbulb, RotateCcw, Sparkles, ThumbsUp, TriangleAlert } from 'lucide-react';
import { computeFlowResults, extractFlowErrors } from '../lessonFlowScore.js';
import { hasLessonFlashcards } from '../../../services/lessonFlashcards.js';
import { buildAdaptiveReview } from '../../../services/adaptiveReview/index.js';

function AdaptiveReviewPanel({ lesson, phases, attempts }) {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (loading) return;
    setLoading(true);
    try {
      const flowErrors = extractFlowErrors(phases, attempts, lesson || {});
      const result = await buildAdaptiveReview({ lesson, flowErrors, allowAi: true });
      setReview(result);
    } catch {
      setReview({
        focusSummary: 'Não foi possível gerar a revisão agora. Revise os pontos marcados manualmente.',
        errorGroups: [],
        reviewPlan: [],
        nextLessonAdvice: '',
        source: 'local',
      });
    } finally {
      setLoading(false);
    }
  }

  const isGemini = review?.source === 'gemini';

  return (
    <div className="lesson-completion-adaptive">
      {!review ? (
        <button
          type="button"
          className="lesson-completion-adaptive-btn"
          onClick={handleGenerate}
          disabled={loading}
        >
          <Sparkles size={13} />
          {loading ? 'Gerando revisão...' : 'Revisão adaptativa da aula'}
        </button>
      ) : (
        <div className={`lesson-phase-ai-result${isGemini ? ' gemini' : ''}`}>
          <div className="lesson-phase-ai-result-header">
            <Sparkles size={13} />
            <span>Revisão adaptativa</span>
            <span className={`lesson-phase-ai-badge${isGemini ? ' gemini' : ''}`}>
              {isGemini ? 'Gemini' : 'Local'}
            </span>
          </div>
          <p className="lesson-phase-ai-feedback">{review.focusSummary}</p>
          {review.aiText && isGemini ? (
            <p className="lesson-phase-ai-feedback" style={{ whiteSpace: 'pre-wrap', marginTop: '6px' }}>
              {review.aiText}
            </p>
          ) : null}
          {!isGemini && review.errorGroups?.length ? review.errorGroups.map((group) => (
            <div key={group.pillar} style={{ marginTop: '8px' }}>
              <p style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.08em', color: '#7b8db8', margin: '0 0 4px' }}>
                {group.title}
              </p>
              {group.microDrills?.length ? (
                <ul className="lesson-phase-ai-list">
                  {group.microDrills.map((drill, i) => <li key={i}>{drill}</li>)}
                </ul>
              ) : null}
            </div>
          )) : null}
          {review.nextLessonAdvice ? (
            <p className="lesson-phase-ai-drill">
              <Lightbulb size={12} /> {review.nextLessonAdvice}
            </p>
          ) : null}
          <button type="button" className="lesson-phase-link" onClick={() => setReview(null)}>
            <RotateCcw size={11} /> Gerar novamente
          </button>
        </div>
      )}
    </div>
  );
}

export function LessonCompletionCard({ phases = [], attempts = {}, lesson = null, completionMeta = null, onRestart, onNavigate }) {
  const { correct, warn, missed, totalAttempt, score, weakTitles } = computeFlowResults(phases, attempts);
  const isExcellent = score >= 80;
  const hasFlashcards = lesson ? hasLessonFlashcards(lesson) : false;
  const hasErrors = weakTitles.length > 0;
  const xpGained = completionMeta?.xp || 0;
  const alreadyCompleted = Boolean(completionMeta?.alreadyCompleted);

  return (
    <div className="lesson-completion-card">
      <div className="lesson-completion-icon" aria-hidden="true">
        {isExcellent ? <Award size={32} /> : <ThumbsUp size={32} />}
      </div>

      <h3 className="lesson-completion-title">
        {isExcellent ? 'Aula concluída!' : 'Aula finalizada.'}
      </h3>

      {completionMeta ? (
        <div className="lesson-completion-saved">
          <CheckCircle2 size={14} />
          <span>{alreadyCompleted ? 'Aula já concluída anteriormente' : 'Progresso salvo'}</span>
          {xpGained > 0 ? <span className="lesson-completion-xp">+{xpGained} XP</span> : null}
        </div>
      ) : null}

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

      <AdaptiveReviewPanel lesson={lesson} phases={phases} attempts={attempts} />

      <div className="lesson-completion-actions">
        {onRestart ? (
          <button type="button" className="lesson-completion-retry" onClick={onRestart}>
            <RotateCcw size={15} /> Rever aula
          </button>
        ) : null}
        {hasFlashcards && onNavigate ? (
          <button type="button" className="lesson-completion-cta" onClick={() => onNavigate('cards')}>
            <CreditCard size={15} /> Ver flashcards
          </button>
        ) : null}
        {hasErrors && onNavigate ? (
          <button type="button" className="lesson-completion-cta warn" onClick={() => onNavigate('course')}>
            <TriangleAlert size={15} /> Revisar erros
          </button>
        ) : null}
        {!hasErrors && onNavigate ? (
          <button type="button" className="lesson-completion-cta" onClick={() => onNavigate('course')}>
            <BookOpenCheck size={15} /> Ir ao Curso
          </button>
        ) : null}
      </div>
    </div>
  );
}
