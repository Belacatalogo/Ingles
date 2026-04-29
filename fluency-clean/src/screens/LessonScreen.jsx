import { useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, Clock, Headphones, PencilLine, RefreshCw, Sparkles, Target, Zap } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { ReadingLesson } from '../lessons/ReadingLesson.jsx';
import { GrammarLesson } from '../lessons/GrammarLesson.jsx';
import { ListeningLesson } from '../lessons/ListeningLesson.jsx';
import { WritingLesson } from '../lessons/WritingLesson.jsx';
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
    title: 'Grammar — Simple Present for routines',
    level: 'A1',
    intro: 'Entenda a regra, veja exemplos e pratique sem mostrar a resposta antes da tentativa.',
  },
  listening: {
    id: 'layout-preview-listening',
    type: 'listening',
    title: 'Listening — A short morning routine',
    level: 'A1',
    intro: 'Ouça, confirme detalhes na transcrição e pratique shadowing.',
  },
  writing: {
    id: 'layout-preview-writing',
    type: 'writing',
    title: 'Writing — My simple routine',
    level: 'A1',
    intro: 'Escreva frases simples, claras e corretas sobre sua rotina.',
  },
};

const pillarOptions = [
  { id: 'reading', label: 'Leitura', icon: BookOpen },
  { id: 'grammar', label: 'Gramática', icon: Target },
  { id: 'listening', label: 'Escuta', icon: Headphones },
  { id: 'writing', label: 'Escrita', icon: PencilLine },
];

const lessonSections = [
  { id: 'warmup', title: 'Aquecimento', icon: Zap },
  { id: 'core', title: 'Conceito', icon: BookOpen },
  { id: 'practice', title: 'Prática', icon: Target },
  { id: 'speak', title: 'Fala', icon: Headphones },
  { id: 'review', title: 'Revisão', icon: CheckCircle2 },
];

function getLessonTitle(lesson) {
  return lesson?.title?.replace(/^(Reading|Grammar|Listening|Writing)\s*[—-]\s*/i, '') || 'Present Perfect';
}

function getLessonDescription(lesson) {
  return lesson?.intro || lesson?.subtitle || 'Estude com explicação guiada, prática ativa e conclusão salva no seu progresso.';
}

function LessonRenderer({ lesson }) {
  if (lesson?.type === 'reading') return <ReadingLesson lesson={lesson} />;
  if (lesson?.type === 'grammar') return <GrammarLesson lesson={lesson} />;
  if (lesson?.type === 'listening') return <ListeningLesson lesson={lesson} />;
  if (lesson?.type === 'writing') return <WritingLesson lesson={lesson} />;

  return (
    <Card eyebrow={`Aula · ${lesson?.level || 'A1'}`} title={lesson?.title || 'Aula padrão'}>
      <p>Renderização padrão para aulas que ainda não ganharam layout específico.</p>
      {lesson?.intro ? <p>{lesson.intro}</p> : null}
    </Card>
  );
}

export function LessonScreen({ lessonRevision = 0 }) {
  const [activeSection, setActiveSection] = useState(0);
  const [previewPillar, setPreviewPillar] = useState('reading');
  const savedLesson = useMemo(() => getCurrentLesson(), [lessonRevision]);
  const usingGenerated = Boolean(savedLesson);
  const generatedType = savedLesson?.type || 'reading';
  const previewLesson = demoLessons[previewPillar] || demoLessons.reading;
  const lesson = savedLesson && previewPillar === 'generated' ? savedLesson : previewLesson;
  const currentProgress = Math.round(((activeSection + 1) / lessonSections.length) * 100);

  return (
    <section className="lesson-reference-screen">
      <section className="lesson-reference-hero">
        <div className="lesson-chip-row">
          <span className="lesson-chip blue"><Sparkles size={11} /> {usingGenerated && previewPillar === 'generated' ? 'Gerada por IA' : 'Preview seguro'}</span>
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

      <section className="lesson-lab-pillar-switch" aria-label="Preview temporário dos pilares">
        <div>
          <span>Lab preview</span>
          <strong>Ver UI por pilar</strong>
        </div>
        <div className="lesson-pillar-options">
          {usingGenerated ? (
            <button type="button" className={previewPillar === 'generated' ? 'active' : ''} onClick={() => setPreviewPillar('generated')}>
              <Sparkles size={12} /> Aula real
            </button>
          ) : null}
          {pillarOptions.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <button
                type="button"
                key={pillar.id}
                className={previewPillar === pillar.id ? 'active' : generatedType === pillar.id && previewPillar === 'generated' ? 'hint' : ''}
                onClick={() => setPreviewPillar(pillar.id)}
              >
                <Icon size={12} /> {pillar.label}
              </button>
            );
          })}
        </div>
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
