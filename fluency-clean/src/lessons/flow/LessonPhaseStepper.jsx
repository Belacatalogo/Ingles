import { CheckCircle2, Circle, Lock } from 'lucide-react';

export function LessonPhaseStepper({ phases = [], activeIndex = 0, visitedPhaseIds = [], canGoToIndex, onSelect }) {
  return (
    <nav className="lesson-flow-stepper" aria-label="Etapas da aula">
      {phases.map((phase, index) => {
        const active = index === activeIndex;
        const visited = visitedPhaseIds.includes(phase.id);
        // Per-phase access: if canGoToIndex is provided use it; fall back to permissive
        const isBlocked = canGoToIndex ? !canGoToIndex(index) : false;
        const Icon = isBlocked ? Lock : visited ? CheckCircle2 : Circle;
        return (
          <button
            type="button"
            key={phase.id}
            className={[active ? 'active' : '', visited ? 'visited' : '', isBlocked ? 'blocked' : ''].filter(Boolean).join(' ')}
            onClick={() => onSelect?.(index)}
            aria-disabled={isBlocked}
            aria-current={active ? 'step' : undefined}
            title={isBlocked ? 'Conclua as etapas anteriores para desbloquear.' : undefined}
          >
            <Icon size={14} />
            <span>{phase.shortTitle || phase.title}</span>
          </button>
        );
      })}
    </nav>
  );
}
