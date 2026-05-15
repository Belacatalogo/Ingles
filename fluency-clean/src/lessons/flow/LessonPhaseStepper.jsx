import { CheckCircle2, Circle } from 'lucide-react';

export function LessonPhaseStepper({ phases = [], activeIndex = 0, visitedPhaseIds = [], onSelect }) {
  return (
    <nav className="lesson-flow-stepper" aria-label="Etapas da aula">
      {phases.map((phase, index) => {
        const active = index === activeIndex;
        const visited = visitedPhaseIds.includes(phase.id);
        const Icon = visited ? CheckCircle2 : Circle;
        return (
          <button
            type="button"
            key={phase.id}
            className={active ? 'active' : visited ? 'visited' : ''}
            onClick={() => onSelect?.(index)}
            aria-current={active ? 'step' : undefined}
          >
            <Icon size={14} />
            <span>{phase.shortTitle || phase.title}</span>
          </button>
        );
      })}
    </nav>
  );
}
