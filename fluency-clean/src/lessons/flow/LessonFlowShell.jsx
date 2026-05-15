import './lesson-flow.css';
import { LessonActionFooter } from './LessonActionFooter.jsx';
import { LessonFocusHeader } from './LessonFocusHeader.jsx';
import { LessonPhaseCard } from './LessonPhaseCard.jsx';
import { LessonPhaseStepper } from './LessonPhaseStepper.jsx';
import { useLessonFlowState } from './useLessonFlowState.js';

export function LessonFlowShell({ lesson, phases = [], onPhaseChange, children }) {
  const flow = useLessonFlowState(phases, { onPhaseChange });

  if (!flow.phases.length) {
    return (
      <section className="lesson-flow-shell empty">
        <p>Nenhuma etapa de aula foi configurada.</p>
      </section>
    );
  }

  return (
    <article className="lesson-flow-shell">
      <LessonFocusHeader lesson={lesson} phase={flow.activePhase} percent={flow.percent} />
      <div className="lesson-flow-progress-line"><span style={{ width: `${flow.percent}%` }} /></div>
      <LessonPhaseStepper phases={flow.phases} activeIndex={flow.activeIndex} visitedPhaseIds={flow.visitedPhaseIds} onSelect={flow.goTo} />
      {children ? children(flow) : <LessonPhaseCard phase={flow.activePhase} flow={flow} />}
      <LessonActionFooter flow={flow} />
    </article>
  );
}
