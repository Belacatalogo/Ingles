import { Lightbulb, RotateCcw, Sparkles } from 'lucide-react';

/**
 * Unified AI feedback card used in AttemptField, SpeakField, and SpeakingScreen.
 *
 * Props:
 *   result   — AnalysisResult from studentAnswerAnalysisService
 *   loading  — boolean, shows "Analisando..." state
 *   title    — string, header label (default "IA Tutor")
 *   onRetry  — optional callback for "Nova análise" button
 *   compact  — boolean, hides correctedText/strengths (for inline panels)
 */
export function StudentAnswerFeedbackCard({ result, loading, title = 'IA Tutor', onRetry, compact = false }) {
  if (loading) {
    return (
      <div className="lesson-phase-ai-analysis">
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary, #94a3b8)', padding: '8px 0' }}>
          <Sparkles size={13} /> Analisando...
        </span>
      </div>
    );
  }

  if (!result || !result.feedbackPt) return null;

  const isGemini = result.source === 'gemini' || result.source === 'hybrid';
  const badgeLabel = result.source === 'hybrid' ? 'Híbrido' : isGemini ? 'Gemini' : 'Local';

  return (
    <div className={`lesson-phase-ai-result${isGemini ? ' gemini' : ''}`}>
      <div className="lesson-phase-ai-result-header">
        <Sparkles size={13} />
        <span>{title}</span>
        <span className={`lesson-phase-ai-badge${isGemini ? ' gemini' : ''}`}>{badgeLabel}</span>
        {result.score !== null && result.score !== undefined ? (
          <span className="lesson-phase-ai-score">{result.score}/100</span>
        ) : null}
      </div>
      <p className="lesson-phase-ai-feedback">{result.feedbackPt}</p>
      {!compact && result.correctedText ? (
        <div className="lesson-phase-ai-corrected">
          <span>Versão sugerida</span>
          <p>{result.correctedText}</p>
        </div>
      ) : null}
      {result.issues?.length ? (
        <ul className="lesson-phase-ai-list">
          {result.issues.map((issue, index) => <li key={index}>{issue}</li>)}
        </ul>
      ) : null}
      {!compact && result.strengths?.length ? (
        <ul className="lesson-phase-ai-list">
          {result.strengths.map((s, index) => <li key={index}>{s}</li>)}
        </ul>
      ) : null}
      {result.nextDrill ? (
        <p className="lesson-phase-ai-drill">
          <Lightbulb size={12} /> {result.nextDrill}
        </p>
      ) : null}
      {onRetry ? (
        <button type="button" className="lesson-phase-link" onClick={onRetry}>
          <RotateCcw size={11} /> Nova análise
        </button>
      ) : null}
    </div>
  );
}
