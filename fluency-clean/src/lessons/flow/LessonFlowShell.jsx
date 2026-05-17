import { useEffect, useRef } from 'react';
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

function stableLessonId(lesson) {
  return lesson?.id
    || lesson?.lessonId
    || lesson?.generationMeta?.id
    || lesson?.curriculumId
    || lesson?.raw?.curriculumId
    || (lesson?.title ? `${lesson?.level || 'A1'}-${lesson?.type || lesson?.pillar || 'lesson'}-${lesson.title}` : '')
    || '';
}

export function LessonFlowShell({ lesson, phases = [], onPhaseChange, onComplete, onNavigate, children }) {
  const shellRef = useRef(null);
  const didMountRef = useRef(false);

  function handleComplete({ phases: phaseList, attempts, onSaveSuccess, onSaveError }) {
    try {
      const scored = computeFlowResults(phaseList, attempts);
      const flowErrors = extractFlowErrors(phaseList, attempts, lesson || {});
      const result = completeLesson({
        lesson,
        answers: buildAnswerMap(attempts),
        writtenAnswer: getLongestWritten(attempts),
        flowResults: scored.results,
        preComputedScore: { totalAttempt: scored.totalAttempt, correct: scored.correct, score: scored.score },
        richFlowErrors: flowErrors,
      });
      if (!result.saved) {
        console.warn('[Fluency] handleComplete: storage.set falhou — progresso não persistido.');
        onSaveError?.('Não foi possível salvar o progresso. Verifique o espaço disponível e tente novamente.');
        return;
      }
      if (!result.verified) {
        // Data written but read-back check failed — lessonId may differ; log but don't block
        console.warn('[Fluency] handleComplete: salvo mas verificação falhou — lessonId pode divergir.');
      }
      window.dispatchEvent(new Event('fluency:lesson-updated'));
      onComplete?.({ phases: phaseList, attempts, scored, flowErrors });
      onSaveSuccess?.();
    } catch (err) {
      console.warn('[Fluency] handleComplete falhou:', err);
      onSaveError?.('Erro inesperado ao salvar progresso. Tente concluir novamente.');
    }
  }

  const lessonId = stableLessonId(lesson);
  const flow = useLessonFlowState(phases, { onPhaseChange, onComplete: handleComplete, lessonId });

  // Scroll to top of shell when advancing to a new phase
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    window.requestAnimationFrame(() => {
      shellRef.current?.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'auto' });
    });
  }, [flow.activeIndex]);

  // Scroll to top of shell when lesson completes so the card is immediately visible
  useEffect(() => {
    if (!flow.completed) return;
    window.requestAnimationFrame(() => {
      shellRef.current?.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
    });
  }, [flow.completed]);

  if (!flow.phases.length) {
    return (
      <section className="lesson-flow-shell empty">
        <p>Nenhuma etapa de aula foi configurada.</p>
      </section>
    );
  }

  return (
    <article className="lesson-flow-shell" ref={shellRef}>
      <LessonFocusHeader lesson={lesson} phase={flow.activePhase} percent={flow.percent} />
      <div className="lesson-flow-progress-line"><span style={{ width: `${flow.percent}%` }} /></div>

      {flow.completed ? (
        // On completion: show only the completion card; stepper and phase card are hidden
        <LessonCompletionCard
          phases={flow.phases}
          attempts={flow.attempts}
          lesson={lesson}
          onRestart={flow.restart}
          onNavigate={onNavigate}
        />
      ) : (
        <>
          <LessonPhaseStepper
            phases={flow.phases}
            activeIndex={flow.activeIndex}
            visitedPhaseIds={flow.visitedPhaseIds}
            canGoForward={flow.canAdvance}
            onSelect={flow.goTo}
          />
          {children ? children(flow) : <LessonPhaseCard phase={flow.activePhase} flow={flow} lesson={lesson} />}
        </>
      )}

      <LessonActionFooter flow={flow} />
    </article>
  );
}
