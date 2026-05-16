import { CheckCircle2, Circle } from 'lucide-react';

export function LessonPhaseStepper({ phases = [], activeIndex = 0, visitedPhaseIds = [], canGoForward = true, onSelect }) {
  return (
    <nav className="lesson-flow-stepper" aria-label="Etapas da aula">
      {phases.map((phase, index) => {
        const active = index === activeIndex;
        const visited = visitedPhaseIds.includes(phase.id);
        const isFutureBlocked = index > activeIndex && !canGoForward;
        const Icon = visited ? CheckCircle2 : Circle;
        return (
          <button
            type="button"
            key={phase.id}
            className={[active ? 'active' : '', visited ? 'visited' : '', isFutureBlocked ? 'blocked' : ''].filter(Boolean).join(' ')}
            onClick={() => onSelect?.(index)}
            aria-current={active ? 'step' : undefined}
            title={isFutureBlocked ? 'Conclua a etapa atual para avançar.' : undefined}
          >
            <Icon size={14} />
            <span>{phase.shortTitle || phase.title}</span>
          </button>
        );
      })}
    </nav>
  );
}
