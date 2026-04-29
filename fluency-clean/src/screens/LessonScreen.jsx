import { Card } from '../components/ui/Card.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
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
      <SectionHeader
        eyebrow="Aula"
        title="Renderização por tipo de aula"
        description="Cada tipo terá seu próprio componente. Reading, Grammar, Listening e Speaking não precisam disputar o mesmo bloco de HTML."
      />
      <LessonRenderer lesson={demoLesson} />
    </section>
  );
}
