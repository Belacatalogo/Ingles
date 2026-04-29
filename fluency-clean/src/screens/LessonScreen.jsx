import { useMemo } from 'react';
import { Card } from '../components/ui/Card.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { ReadingLesson } from '../lessons/ReadingLesson.jsx';
import { getCurrentLesson } from '../services/lessonStore.js';

const demoLesson = {
  type: 'reading',
  title: 'Reading — A rotina de uma manhã produtiva',
  level: 'A1',
};

function LessonRenderer({ lesson }) {
  if (lesson?.type === 'reading') return <ReadingLesson lesson={lesson} />;

  return (
    <Card eyebrow={`Aula · ${lesson?.level || 'A1'}`} title={lesson?.title || 'Aula padrão'}>
      <p>Renderização padrão para aulas que ainda não ganharam layout específico.</p>
      {lesson?.intro ? <p>{lesson.intro}</p> : null}
    </Card>
  );
}

export function LessonScreen({ lessonRevision = 0 }) {
  const savedLesson = useMemo(() => getCurrentLesson(), [lessonRevision]);
  const lesson = savedLesson || demoLesson;
  const usingGenerated = Boolean(savedLesson);

  return (
    <section className="screen-stack">
      <SectionHeader
        eyebrow="Aula"
        title={usingGenerated ? 'Aula gerada pela IA' : 'Renderização por tipo de aula'}
        description="Cada tipo tem seu próprio componente. Reading, Grammar, Listening e Speaking não disputam o mesmo bloco de HTML."
      />
      <LessonRenderer lesson={lesson} />
    </section>
  );
}
