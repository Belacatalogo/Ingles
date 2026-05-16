import { Sparkles } from 'lucide-react';

// Card unificado para o corpo de uma fase. Recebe:
//   eyebrow, title, instruction, children, feedback, footnote
// O feedback é a área condicional (revelar gabarito etc.) — quem decide se mostra é a fase, não o shell.
export function PhaseShell({ eyebrow, title, instruction, children, feedback, footnote }) {
  return (
    <div className="lesson-phase-shell">
      {eyebrow ? <small className="lesson-phase-eyebrow"><Sparkles size={12} /> {eyebrow}</small> : null}
      {title ? <h3 className="lesson-phase-title">{title}</h3> : null}
      {instruction ? <p className="lesson-phase-instruction">{instruction}</p> : null}
      <div className="lesson-phase-body-slot">{children}</div>
      {feedback ? <div className="lesson-phase-feedback-slot">{feedback}</div> : null}
      {footnote ? <p className="lesson-phase-footnote">{footnote}</p> : null}
    </div>
  );
}
