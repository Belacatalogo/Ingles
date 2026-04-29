import { useMemo, useState } from 'react';
import { FlaskConical } from 'lucide-react';
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
  grammar: {
    id: 'layout-preview-grammar',
    type: 'grammar',
    title: 'Simple Present — Rotina e hábitos',
    level: 'A1',
    intro: 'Nesta aula, você vai estudar o Simple Present de forma organizada, com exemplos, prática e produção própria.',
    objective: 'Usar o Simple Present para falar sobre rotina, fatos e hábitos sem revelar respostas antes da tentativa.',
    sections: [
      {
        title: 'Quando usar',
        content: 'Use Simple Present para rotinas, hábitos, fatos gerais e situações que acontecem com frequência. Exemplo: I study English every day.',
      },
      {
        title: 'He, she e it',
        content: 'Com he, she e it, normalmente adicionamos -s ao verbo: She studies, he works, it starts.',
      },
      {
        title: 'Perguntas e negativas',
        content: 'Use do ou does em perguntas e negativas: Do you study? Does she work? I do not work. She does not study.',
      },
    ],
    tips: [
      'Não traduza palavra por palavra; procure o padrão da frase.',
      'Observe se o sujeito é I/you/we/they ou he/she/it.',
      'Depois dos exercícios, escreva frases sobre sua rotina real.',
    ],
    exercises: [
      {
        question: 'Choose the correct sentence.',
        options: ['She study English.', 'She studies English.', 'She studying English.'],
        answer: 'She studies English.',
      },
      {
        question: 'Complete: He ___ coffee every morning.',
        options: ['drink', 'drinks', 'drinking'],
        answer: 'drinks',
      },
      {
        question: 'Choose the negative form: I like tea.',
        options: ['I not like tea.', 'I do not like tea.', 'I does not like tea.'],
        answer: 'I do not like tea.',
      },
    ],
  },
  listening: {
    id: 'layout-preview-listening',
    type: 'listening',
    title: 'Listening — Morning plans',
    level: 'A1',
    intro: 'Prévia temporária para validar o futuro layout de Listening.',
  },
  speaking: {
    id: 'layout-preview-speaking',
    type: 'speaking',
    title: 'Speaking — Introduce your routine',
    level: 'A1',
    intro: 'Prévia temporária para validar o futuro layout de Speaking.',
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
  const [previewType, setPreviewType] = useState('real');
  const savedLesson = useMemo(() => getCurrentLesson(), [lessonRevision]);
  const realLesson = savedLesson || demoLessons.reading;
  const lesson = previewType === 'real' ? realLesson : demoLessons[previewType] || realLesson;
  const usingGenerated = Boolean(savedLesson);
  const usingPreview = previewType !== 'real';

  return (
    <section className="screen-stack lesson-screen-stack">
      <div className="lesson-hero-card">
        <SectionHeader
          eyebrow="Aula de hoje"
          title={usingGenerated ? 'Continue sua aula personalizada' : 'Sua próxima aula está pronta'}
          description="Estude com explicação guiada, prática ativa e conclusão salva no seu progresso."
        />
      </div>

      <details className="layout-preview-switcher lesson-layout-details">
        <summary>
          <FlaskConical size={15} /> Opções avançadas de layout
        </summary>
        <div>
          <p>Área temporária de teste. Não altera a aula salva nem o progresso real.</p>
        </div>
        <div className="layout-preview-actions">
          {[
            ['real', 'Aula real'],
            ['reading', 'Reading'],
            ['grammar', 'Grammar'],
            ['listening', 'Listening'],
            ['speaking', 'Speaking'],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={previewType === value ? 'active' : ''}
              onClick={() => setPreviewType(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </details>

      {usingPreview ? (
        <p className="inline-warning">Você está vendo uma prévia de layout. A aula real salva não foi substituída.</p>
      ) : null}

      <LessonRenderer lesson={lesson} />
    </section>
  );
}
