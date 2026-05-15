import { BookOpenCheck, Target } from 'lucide-react';

function clean(value) { return String(value ?? '').trim(); }

export function LessonFocusHeader({ lesson, phase, percent = 0 }) {
  const pillar = clean(lesson?.pillar || lesson?.type || 'lesson');
  const level = clean(lesson?.level || 'A1');
  const title = clean(lesson?.title || 'Aula');
  const phaseTitle = clean(phase?.title || 'Etapa atual');
  const phaseGoal = clean(phase?.goal || phase?.description || 'Estude esta etapa com foco antes de avançar.');

  return (
    <header className={`lesson-flow-focus-header lesson-flow-${pillar}`}>
      <div className="lesson-flow-chip-row">
        <span><BookOpenCheck size={14} /> {level}</span>
        <span>{pillar}</span>
        <span>{Math.max(0, Math.min(100, percent))}%</span>
      </div>
      <div className="lesson-flow-title-area">
        <div>
          <small>Aula de hoje</small>
          <h1>{title}</h1>
        </div>
        <div className="lesson-flow-current-goal">
          <Target size={18} />
          <span>{phaseTitle}</span>
          <p>{phaseGoal}</p>
        </div>
      </div>
    </header>
  );
}
