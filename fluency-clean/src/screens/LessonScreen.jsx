import { Card } from '../components/ui/Card.jsx';
import { ReadingLesson } from '../lessons/ReadingLesson.jsx';

const demoLesson = {
  type: 'reading',
  title: 'Reading — A rotina de uma manhã produtiva',
  level: 'A1',
};

function LessonRenderer({ lesson }) {
  if (lesson?.type === 'reading') return <ReadingLesson lesson={lesson} />;

  return (
    <Card eyebrow="Aula" title="Aula padrão">
      <p>Renderização padrão para aulas que ainda não ganharam layout específico.</p>
    </Card>
  );
}

export function LessonScreen() {
  return (
    <section className="screen-stack">
      <LessonRenderer lesson={demoLesson} />
    </section>
  );
}
