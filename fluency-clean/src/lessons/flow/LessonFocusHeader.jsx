import { BookMarked, BookOpen, GraduationCap, Headphones, Mic, PenLine, Sparkles, Target } from 'lucide-react';

const PILLAR_META = {
  reading:    { icon: BookOpen,      label: 'Leitura' },
  listening:  { icon: Headphones,    label: 'Escuta' },
  speaking:   { icon: Mic,           label: 'Fala' },
  writing:    { icon: PenLine,       label: 'Escrita' },
  grammar:    { icon: GraduationCap, label: 'Gramática' },
  vocabulary: { icon: BookMarked,    label: 'Vocabulário' },
};

const PILLAR_PREFIX = /^(Reading|Grammar|Vocabulary|Listening|Writing|Speaking)\s*[—–-]\s*/i;

function clean(value) { return String(value ?? '').trim(); }

export function LessonFocusHeader({ lesson, phase, percent = 0 }) {
  const pillar = clean(lesson?.pillar || lesson?.type || 'lesson').toLowerCase();
  const level = clean(lesson?.level || 'A1');
  const rawTitle = clean(lesson?.title || 'Aula');
  const title = rawTitle.replace(PILLAR_PREFIX, '') || rawTitle;
  const phaseTitle = clean(phase?.shortTitle || phase?.title || 'Etapa atual');
  const phaseGoal = clean(phase?.goal || phase?.description || '');
  const pct = Math.max(0, Math.min(100, Math.round(percent)));

  const { icon: PillarIcon, label: pillarLabel } = PILLAR_META[pillar] || { icon: Sparkles, label: 'Aula' };

  return (
    <header className={`lesson-flow-focus-header lesson-flow-${pillar}`}>
      <div className="lesson-flow-chip-row">
        <span><PillarIcon size={12} /> {pillarLabel}</span>
        <span>{level}</span>
        {pct > 0 ? <span>{pct}% concluído</span> : null}
      </div>
      <div className="lesson-flow-title-area">
        <div>
          <small>Aula atual</small>
          <h1>{title}</h1>
        </div>
        {phase ? (
          <div className="lesson-flow-current-goal">
            <Target size={16} />
            <span>{phaseTitle}</span>
            {phaseGoal ? <p>{phaseGoal}</p> : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}
