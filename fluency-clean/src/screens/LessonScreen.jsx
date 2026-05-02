import { useEffect, useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, Clock, Headphones, RefreshCw, ShieldCheck, Sparkles, Target, Zap } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { LessonQualityPanel } from '../components/lesson/LessonQualityPanel.jsx';
import { ReadingLesson } from '../lessons/ReadingLesson.jsx';
import { GrammarLesson } from '../lessons/GrammarLesson.jsx';
import { ListeningLessonClean } from '../lessons/ListeningLessonClean.jsx';
import { WritingLesson } from '../lessons/WritingLesson.jsx';
import { PracticeLauncher } from '../practice/PracticeLauncher.jsx';
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
  const labels = { reading: 'Leitura', grammar: 'Gramática', listening: 'Escuta', writing: 'Escrita' };
  return labels[lesson?.type] || 'Aula';
}

function countWords(value) {
  return String(value || '').trim().split(/\s+/).filter(Boolean).length;
}

function formatDateTime(value) {
  if (!value) return '';
  try {
    return new Date(value).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  } catch {
    return String(value).slice(0, 16);
  }
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
  const baseMinutes = Math.ceil((mainWords + sectionWords + vocabularyCount * 18 + exerciseCount * 32 + promptCount * 24) / 95);
  const grammarDepthMinutes = String(lesson?.type || '').toLowerCase() === 'grammar'
    ? Math.ceil((sectionWords * 1.25 + exerciseCount * 45 + promptCount * 35 + vocabularyCount * 20) / 85)
    : 0;
  const estimatedMinutes = Math.max(8, baseMinutes, grammarDepthMinutes);
  return { minutes: estimatedMinutes, exercises: exerciseCount || 0, sections: sectionCount };
}

function LessonRenderer({ lesson }) {
  if (lesson?.type === 'reading') return <ReadingLesson lesson={lesson} />;
  if (lesson?.type === 'grammar') return <GrammarLesson lesson={lesson} />;
  if (lesson?.type === 'listening') return <ListeningLessonClean lesson={lesson} />;
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
  const [localRevision, setLocalRevision] = useState(0);

  useEffect(() => {
    function refreshLesson() {
      setLocalRevision((value) => value + 1);
    }

    window.addEventListener('fluency:lesson-updated', refreshLesson);
    window.addEventListener('focus', refreshLesson);
    document.addEventListener('visibilitychange', refreshLesson);
    const timer = window.setInterval(refreshLesson, 1500);

    return () => {
      window.removeEventListener('fluency:lesson-updated', refreshLesson);
      window.removeEventListener('focus', refreshLesson);
      document.removeEventListener('visibilitychange', refreshLesson);
      window.clearInterval(timer);
    };
  }, []);

  const savedLesson = useMemo(() => getCurrentLesson(), [lessonRevision, localRevision]);
  const lesson = savedLesson || fallbackLesson;
  const lessonStats = useMemo(() => getLessonStats(lesson), [lesson]);
  const usingGenerated = Boolean(savedLesson);
  const currentProgress = Math.round(((activeSection + 1) / lessonSections.length) * 100);
  const meta = lesson?.generationMeta || null;
  const score = meta?.pedagogicalScore || lesson?.quality?.teacherScore || lesson?.quality?.pedagogicalScore || 0;

  function jumpToSection(section, index) {
    setActiveSection(index);
    window.dispatchEvent(new CustomEvent('fluency:lesson-jump', { detail: { section: section.id } }));
  }

  function forceRefreshLesson() {
    setLocalRevision((value) => value + 1);
  }

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
        {usingGenerated ? (
          <div className="lesson-generation-proof">
            <ShieldCheck size={15} />
            <span>
              {meta?.id ? <b>{meta.id}</b> : <b>Aula antiga sem ID de geração</b>}
              <small>{meta?.contractVersion || 'sem contrato antigo'} · qualidade {score}/100{meta?.generatedAt ? ` · ${formatDateTime(meta.generatedAt)}` : ''}</small>
            </span>
          </div>
        ) : null}
        <footer>
          <div>
            <span><Clock size={13} /> {lessonStats.minutes} min</span>
            <span><Target size={13} /> {lessonStats.exercises} ex.</span>
          </div>
          <button type="button" aria-label="Atualizar aula salva" onClick={forceRefreshLesson}><RefreshCw size={14} /></button>
        </footer>
      </section>

      {usingGenerated ? <LessonQualityPanel lesson={lesson} /> : null}

      <section className="lesson-stepper-card"><div className="lesson-stepper-row">{lessonSections.map((section, index) => { const Icon = index < activeSection ? CheckCircle2 : section.icon; const active = index === activeSection; const done = index < activeSection; return (<button type="button" key={section.id} className={active ? 'active' : done ? 'done' : ''} onClick={() => jumpToSection(section, index)}><Icon size={12} />{section.title}</button>); })}</div></section>

      <section className="lesson-progress-strip"><div><span>Progresso da aula</span><strong>{activeSection + 1}/{lessonSections.length}</strong></div><i><b style={{ width: `${currentProgress}%` }} /></i></section>

      <section className="lesson-practice-mount"><PracticeLauncher lesson={lesson} /></section>

      <LessonRenderer lesson={lesson} />
    </section>
  );
}
