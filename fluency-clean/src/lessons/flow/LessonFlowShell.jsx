import './lesson-flow.css';
import { LessonActionFooter } from './LessonActionFooter.jsx';
import { LessonFocusHeader } from './LessonFocusHeader.jsx';
import { LessonPhaseCard } from './LessonPhaseCard.jsx';
import { LessonPhaseStepper } from './LessonPhaseStepper.jsx';
import { LessonCompletionCard } from './phases/LessonCompletionCard.jsx';
import { computeFlowResults, extractFlowErrors } from './lessonFlowScore.js';
import { useLessonFlowState } from './useLessonFlowState.js';
import { completeLesson } from '../../services/progressStore.js';

function getLongestWritten(attempts) {
  return Object.values(attempts).reduce((best, data) => {
    const t = data && typeof data === 'object' ? String(data.value || '') : '';
    return t.length > best.length ? t : best;
  }, '');
}

function buildAnswerMap(attempts) {
  const answers = {};
  Object.entries(attempts).forEach(([id, data]) => {
    const text = data && typeof data === 'object' ? String(data.value || '') : '';
    if (text.trim()) answers[id] = text;
  });
  return answers;
}

export function LessonFlowShell({ lesson, phases = [], onPhaseChange, onComplete, children }) {
  function handleComplete({ phases: phaseList, attempts }) {
    try {
      const scored = computeFlowResults(phaseList, attempts);
      const flowErrors = extractFlowErrors(phaseList, attempts, lesson || {});
      completeLesson({
        lesson,
        answers: buildAnswerMap(attempts),
        writtenAnswer: getLongestWritten(attempts),
        flowResults: scored.results,
        preComputedScore: { totalAttempt: scored.totalAttempt, correct: scored.correct, score: scored.score },
      });
      window.dispatchEvent(new Event('fluency:lesson-updated'));
      onComplete?.({ phases: phaseList, attempts, scored, flowErrors });
    } catch {
      // fail-safe: nunca bloquear conclusão de aula
      onComplete?.({ phases: phaseList, attempts });
    }
  }

  const flow = useLessonFlowState(phases, { onPhaseChange, onComplete: handleComplete });

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
      <LessonPhaseStepper
        phases={flow.phases}
        activeIndex={flow.activeIndex}
        visitedPhaseIds={flow.visitedPhaseIds}
        onSelect={flow.goTo}
      />
      {children ? children(flow) : <LessonPhaseCard phase={flow.activePhase} flow={flow} />}
      {flow.completed ? (
        <LessonCompletionCard
          phases={flow.phases}
          attempts={flow.attempts}
          onRestart={() => flow.goTo(0)}
        />
      ) : null}
      <LessonActionFooter flow={flow} />
    </article>
  );
}
