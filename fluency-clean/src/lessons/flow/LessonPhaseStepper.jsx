import { CheckCircle2, Circle, Lock } from 'lucide-react';

export function LessonPhaseStepper({ phases = [], activeIndex = 0, visitedPhaseIds = [], canGoToIndex, onSelect }) {
  return (
    <nav className="lesson-flow-stepper" aria-label="Etapas da aula">
      {phases.map((phase, index) => {
        const active = index === activeIndex;
        const visited = visitedPhaseIds.includes(phase.id);
        // Student can use the stepper to review current/previous phases only.
        // Forward navigation must happen through Continuar, otherwise free phases could be skipped.
        const future = index > activeIndex;
        const blockedByFlow = canGoToIndex ? !canGoToIndex(index) : false;
        const isBlocked = future || blockedByFlow;
        const Icon = isBlocked ? Lock : visited ? CheckCircle2 : Circle;
        return (
          <button
            type="button"
            key={phase.id}
            className={[active ? 'active' : '', visited ? 'visited' : '', isBlocked ? 'blocked' : ''].filter(Boolean).join(' ')}
            onClick={() => {
              if (isBlocked) return;
              onSelect?.(index);
            }}
            disabled={isBlocked}
            aria-disabled={isBlocked}
            aria-current={active ? 'step' : undefined}
            title={isBlocked ? 'Use Continuar para avançar em ordem.' : undefined}
          >
            <Icon size={14} />
            <span>{phase.shortTitle || phase.title}</span>
          </button>
        );
      })}
    </nav>
  );
}
