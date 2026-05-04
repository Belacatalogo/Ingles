import { CheckCircle2, ChevronRight, RotateCcw, XCircle } from 'lucide-react';

function WritingRubricFeedback({ rubric }) {
  if (!rubric || typeof rubric === 'string') {
    return rubric ? <p className="practice-writing-rubric-simple">{rubric}</p> : null;
  }

  return (
    <div className="practice-writing-rubric">
      <p className="practice-rubric-score">
        Pontuação: {rubric.totalScore}/100
        {rubric.passed ? ' ✓' : ' — tente de novo'}
      </p>
      {Array.isArray(rubric.criteriaLines) && rubric.criteriaLines.length ? (
        <ul className="practice-rubric-criteria">
          {rubric.criteriaLines.map((line, index) => <li key={`${line}-${index}`}>{line}</li>)}
        </ul>
      ) : null}
      {Array.isArray(rubric.errors) && rubric.errors.length ? (
        <ul className="practice-rubric-errors">
          {rubric.errors.map((error, index) => <li key={`${error.type}-${index}`}>{error.detail}</li>)}
        </ul>
      ) : null}
      {rubric.suggestedRewrite ? <p className="practice-rubric-rewrite">{rubric.suggestedRewrite}</p> : null}
    </div>
  );
}

export function PracticeFeedback({ feedback, current, lives, hintVisible, onShowHint, onRetry, onContinue, onSubmit, actionLabel, canSubmit }) {
  return (
    <footer className={`practice-feedback ${feedback ? feedback.correct ? 'right' : feedback.near ? 'near' : 'wrong' : ''}`}>
      {feedback ? (
        <div className="practice-feedback-text">
          {feedback.correct ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
          <div>
            <strong>{feedback.message}</strong>
            {feedback.lifeLost ? <span>Você perdeu 1 vida. Restam {lives}.</span> : null}
            {!feedback.correct && !feedback.near && !feedback.rubricResult ? <span>Resposta: {current.answer}</span> : null}
            {feedback.near ? <span>Erro pequeno não tira vida.</span> : null}
            {feedback.near && hintVisible && feedback.hintWord ? <span>Dica: confira “{feedback.hintWord}”.</span> : null}
            <WritingRubricFeedback rubric={feedback.rubricResult} />
          </div>
        </div>
      ) : <div className="practice-feedback-placeholder">Respire, responda com calma e siga no seu ritmo.</div>}
      <div className="practice-footer-actions">
        {feedback?.near ? <button type="button" className="secondary" onClick={onShowHint}>Ver dica</button> : null}
        {feedback?.near ? <button type="button" onClick={onRetry}><RotateCcw size={16} /> Tentar de novo</button> : feedback ? <button type="button" onClick={onContinue}>Continuar <ChevronRight size={16} /></button> : <button type="button" disabled={!canSubmit} onClick={onSubmit}>{actionLabel}</button>}
      </div>
    </footer>
  );
}
