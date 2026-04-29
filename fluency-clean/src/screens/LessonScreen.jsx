import { useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, Clock, Headphones, RefreshCw, Sparkles, Target, Zap } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { ReadingLesson } from '../lessons/ReadingLesson.jsx';
import { GrammarLesson } from '../lessons/GrammarLesson.jsx';
import { ListeningLesson } from '../lessons/ListeningLesson.jsx';
import { WritingLesson } from '../lessons/WritingLesson.jsx';
import { getCurrentLesson } from '../services/lessonStore.js';

const fallbackLesson = {
  id: 'fallback-reading',
  type: 'reading',
  title: 'Reading — A rotina de uma manhã produtiva',
  level: 'A1',
  intro: 'Abra ou gere uma aula para estudar com explicação guiada, prática ativa e conclusão salva no seu progresso.',
};

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

function getLessonTypeLabel(lesson) {
  const labels = {
    reading: 'Leitura',
    grammar: 'Gramática',
    listening: 'Escuta',
    writing: 'Escrita',
  };

  return labels[lesson?.type] || 'Aula';
}

function countWords(value) {
  return String(value || '').trim().split(/\s+/).filter(Boolean).length;
}

function getLessonStats(lesson) {
  const exerciseCount = Array.isArray(lesson?.exercises) ? lesson.exercises.length : 0;
  const vocabularyCount = Array.isArray(lesson?.vocabulary) ? lesson.vocabulary.length : 0;
  const sectionCount = Array.isArray(lesson?.sections) ? lesson.sections.length : 0;
  const promptCount = Array.isArray(lesson?.prompts) ? lesson.prompts.length : 0;
  const mainWords = countWords(lesson?.listeningText);
  const sectionWords = Array.isArray(lesson?.sections)
    ? lesson.sections.reduce((total, section) => total + countWords(`${section?.title || ''} ${section?.content || ''}`), 0)
    : 0;

  const estimatedMinutes = Math.max(
    8,
    Math.ceil((mainWords + sectionWords + vocabularyCount * 18 + exerciseCount * 32 + promptCount * 24) / 95)
  );

  return {
    minutes: estimatedMinutes,
    exercises: exerciseCount || 0,
    sections: sectionCount,
  };
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
  const savedLesson = useMemo(() => getCurrentLesson(), [lessonRevision]);
  const lesson = savedLesson || fallbackLesson;
  const lessonStats = useMemo(() => getLessonStats(lesson), [lesson]);
  const usingGenerated = Boolean(savedLesson);
  const currentProgress = Math.round(((activeSection + 1) / lessonSections.length) * 100);

  return (
    <section className="lesson-reference-screen">
      <section className="lesson-reference-hero">
        <div className="lesson-chip-row">
          <span className="lesson-chip blue"><Sparkles size={11} /> {usingGenerated ? 'Gerada por IA' : 'Aula inicial'}</span>
          <span className="lesson-chip">{getLessonTypeLabel(lesson)}</span>
          <span className="lesson-chip violet">{lesson?.level || 'A1'}</span>
        </div>

        <h1>{getLessonTitle(lesson)}</h1>
        <p>{getLessonDescription(lesson)}</p>

        <footer>
          <div>
            <span><Clock size={13} /> {lessonStats.minutes} min</span>
            <span><Target size={13} /> {lessonStats.exercises} ex.</span>
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
