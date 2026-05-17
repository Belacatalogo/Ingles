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
        focusSummary: 'Não foi possível gerar a revisão. Revise os pontos marcados manualmente.',
        errorGroups: [],
        reviewPlan: [],
        nextLessonAdvice: '',
        source: 'local',
      });
    } finally {
      setLoading(false);
    }
  }

  if (!review) {
    return (
      <div className="lesson-completion-adaptive">
        <button
          type="button"
          className="lesson-completion-adaptive-btn"
          onClick={handleGenerate}
          disabled={loading}
        >
          <Sparkles size={13} />
          {loading ? 'Gerando revisão...' : 'Revisão adaptativa da aula'}
        </button>
      </div>
    );
  }

  const isGemini = review.source === 'gemini';
  const isHybrid = isGemini && review.errorGroups?.length > 0;
  const badgeLabel = isHybrid ? 'Híbrido' : (isGemini ? 'Gemini' : 'Local');
  const badgeClass = isHybrid ? ' hybrid' : (isGemini ? ' gemini' : '');

  const quickDrills = (
    review.reviewPlan?.flatMap((p) => p.items || []) ||
    review.errorGroups?.flatMap((g) => g.microDrills || []) ||
    []
  ).slice(0, 3);

  return (
    <div className="lesson-completion-adaptive">
      <div className={`lesson-review-panel${isGemini ? ' gemini' : ''}`}>
        <div className="lesson-review-panel-header">
          <Sparkles size={13} />
          <span>Revisão adaptativa</span>
          <span className={`lesson-phase-ai-badge${badgeClass}`}>{badgeLabel}</span>
        </div>

        <div className="lesson-review-section">
          <p className="lesson-review-section-title">Foco principal</p>
          <p className="lesson-review-focus">{review.focusSummary}</p>
        </div>

        {review.errorGroups?.length > 0 ? (
          <div className="lesson-review-section">
            <p className="lesson-review-section-title">Erros encontrados</p>
            <ul className="lesson-review-error-list">
              {review.errorGroups.map((g) => (
                <li key={g.pillar}>
                  <span className="lesson-review-error-pillar">{g.title}</span>
                  {g.issues[0] ? <span className="lesson-review-error-detail"> — {g.issues[0]}</span> : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {isGemini && review.aiText ? (
          <div className="lesson-review-section">
            <p className="lesson-review-section-title">Análise</p>
            <p className="lesson-review-ai-text">{review.aiText}</p>
          </div>
        ) : quickDrills.length > 0 ? (
          <div className="lesson-review-section">
            <p className="lesson-review-section-title">Treino rápido</p>
            <ol className="lesson-review-drill-list">
              {quickDrills.map((drill, i) => <li key={i}>{drill}</li>)}
            </ol>
          </div>
        ) : null}

        {review.nextLessonAdvice && !isGemini ? (
          <p className="lesson-review-advice">
            <Lightbulb size={12} /> {review.nextLessonAdvice}
          </p>
        ) : null}

        <button type="button" className="lesson-phase-link" onClick={() => setReview(null)}>
          <RotateCcw size={11} /> Gerar novamente
        </button>
      </div>
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
