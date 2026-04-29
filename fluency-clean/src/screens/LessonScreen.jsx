import { useMemo } from 'react';
import { Card } from '../components/ui/Card.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
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
  const savedLesson = useMemo(() => getCurrentLesson(), [lessonRevision]);
  const lesson = savedLesson || demoLessons.reading;
  const usingGenerated = Boolean(savedLesson);

  return (
    <section className="screen-stack lesson-screen-stack">
      <div className="lesson-hero-card">
        <SectionHeader
          eyebrow="Aula de hoje"
          title={usingGenerated ? 'Continue sua aula personalizada' : 'Sua próxima aula está pronta'}
          description="Estude com explicação guiada, prática ativa e conclusão salva no seu progresso."
        />
      </div>

      <LessonRenderer lesson={lesson} />
    </section>
  );
}
