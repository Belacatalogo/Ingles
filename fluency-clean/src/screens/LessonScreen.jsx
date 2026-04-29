import { useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, Clock, Headphones, RefreshCw, Sparkles, Target, Zap } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { ReadingLesson } from '../lessons/ReadingLesson.jsx';
import { GrammarLesson } from '../lessons/GrammarLesson.jsx';
import { getCurrentLesson } from '../services/lessonStore.js';

const demoLessons = {
  reading: {
    id: 'layout-preview-reading',
    type: 'reading',
    title: 'Reading — A rotina de uma manhã produtiva',
    level: 'A1',
  },
};

const lessonSections = [
  { id: 'warmup', title: 'Aquecimento', icon: Zap },
  { id: 'core', title: 'Conceito', icon: BookOpen },
  { id: 'practice', title: 'Prática', icon: Target },
  { id: 'speak', title: 'Fala', icon: Headphones },
  { id: 'review', title: 'Revisão', icon: CheckCircle2 },
];

function getLessonTitle(lesson) {
  return lesson?.title?.replace(/^Reading\s*[—-]\s*/i, '') || 'Present Perfect';
}

function getLessonDescription(lesson) {
  return lesson?.intro || lesson?.subtitle || 'Estude com explicação guiada, prática ativa e conclusão salva no seu progresso.';
}

function LessonRenderer({ lesson }) {
  if (lesson?.type === 'reading') return <ReadingLesson lesson={lesson} />;
  if (lesson?.type === 'grammar') return <GrammarLesson lesson={lesson} />;

  return (
    <Card eyebrow={`Aula · ${lesson?.level || 'A1'}`} title={lesson?.title || 'Aula padrão'}>
      <p>Renderização padrão para aulas que ainda não ganharam layout específico.</p>
      {lesson?.intro ? <p>{lesson.intro}</p> : null}
    </Card>
  );
}

export function LessonScreen({ lessonRevision = 0 }) {
  const [activeSection, setActiveSection] = useState(0);
  const savedLesson = useMemo(() => getCurrentLesson(), [lessonRevision]);
  const lesson = savedLesson || demoLessons.reading;
  const usingGenerated = Boolean(savedLesson);
  const currentProgress = Math.round(((activeSection + 1) / lessonSections.length) * 100);

  return (
    <section className="lesson-reference-screen">
      <section className="lesson-reference-hero">
        <div className="lesson-chip-row">
          <span className="lesson-chip blue"><Sparkles size={11} /> {usingGenerated ? 'Gerada por IA' : 'Preview seguro'}</span>
          <span className="lesson-chip">Day 47</span>
          <span className="lesson-chip violet">{lesson?.level || 'A1'}</span>
        </div>

        <h1>{getLessonTitle(lesson)}</h1>
        <p>{getLessonDescription(lesson)}</p>

        <footer>
          <div>
            <span><Clock size={13} /> 12 min</span>
            <span><Target size={13} /> 8 ex.</span>
          </div>
          <button type="button" aria-label="Regenerar com IA">
            <RefreshCw size={14} />
          </button>
        </footer>
      </section>

      <section className="lesson-stepper-card">
        <div className="lesson-stepper-row">
          {lessonSections.map((section, index) => {
            const Icon = index < activeSection ? CheckCircle2 : section.icon;
            const active = index === activeSection;
            const done = index < activeSection;
            return (
              <button
                type="button"
                key={section.id}
                className={active ? 'active' : done ? 'done' : ''}
                onClick={() => setActiveSection(index)}
              >
                <Icon size={12} />
                {section.title}
              </button>
            );
          })}
        </div>
      </section>

      <section className="lesson-progress-strip">
        <div>
          <span>Progresso da aula</span>
          <strong>{activeSection + 1}/{lessonSections.length}</strong>
        </div>
        <i><b style={{ width: `${currentProgress}%` }} /></i>
      </section>

      <LessonRenderer lesson={lesson} />
    </section>
  );
}
