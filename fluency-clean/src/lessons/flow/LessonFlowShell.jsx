import './lesson-flow.css';
import { LessonActionFooter } from './LessonActionFooter.jsx';
import { LessonFocusHeader } from './LessonFocusHeader.jsx';
import { LessonPhaseCard } from './LessonPhaseCard.jsx';
import { LessonPhaseStepper } from './LessonPhaseStepper.jsx';
import { LessonCompletionCard } from './phases/LessonCompletionCard.jsx';
import { useLessonFlowState } from './useLessonFlowState.js';
import { completeLesson } from '../../services/progressStore.js';

function extractAnswers(attempts) {
  const answers = {};
  Object.entries(attempts).forEach(([id, data]) => {
    const text = data && typeof data === 'object' ? String(data.value || '') : '';
    if (text.trim()) answers[id] = text;
  });
  return answers;
}

function getLongestWritten(attempts) {
  return Object.values(attempts).reduce((best, data) => {
    const t = data && typeof data === 'object' ? String(data.value || '') : '';
    return t.length > best.length ? t : best;
  }, '');
}

export function LessonFlowShell({ lesson, phases = [], onPhaseChange, onComplete, children }) {
  function handleComplete({ phases: phaseList, attempts }) {
    try {
      completeLesson({
        lesson,
        answers: extractAnswers(attempts),
        writtenAnswer: getLongestWritten(attempts),
      });
      window.dispatchEvent(new Event('fluency:lesson-updated'));
    } catch {
      // fail-safe: never block lesson completion if progressStore throws
    }
    onComplete?.({ phases: phaseList, attempts });
  }

  const flow = useLessonFlowState(phases, { onPhaseChange, onComplete: handleComplete });

  if (!flow.phases.length) {
    return (
      <section className="lesson-flow-shell empty">
        <p>Nenhuma etapa de aula foi configurada.</p>
      </section>
    );
  }

  const showCompletion = flow.completed;

  return (
    <article className="lesson-flow-shell">
      <LessonFocusHeader lesson={lesson} phase={flow.activePhase} percent={flow.percent} />
      <div className="lesson-flow-progress-line"><span style={{ width: `${flow.percent}%` }} /></div>
      <LessonPhaseStepper
        phases={flow.phases}
        activeIndex={flow.activeIndex}
        visitedPhaseIds={flow.visitedPhaseIds}
        onSelect={flow.goTo}
      />
      {children ? children(flow) : <LessonPhaseCard phase={flow.activePhase} flow={flow} />}
      {showCompletion ? (
        <LessonCompletionCard
          phases={flow.phases}
          attempts={flow.attempts}
          onRestart={() => flow.goTo(0)}
        />
      ) : null}
      <LessonActionFooter flow={flow} onComplete={onComplete} />
    </article>
  );
}
