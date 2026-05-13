import { useMemo, useState } from 'react';
import { BookOpenCheck, CheckCircle2, ChevronRight, Lock, Map, Play, ShieldCheck, Sparkles, Target } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { CURRICULUM_LEVELS, CURRICULUM_PILLARS, getStaticLevel, getStaticLessons } from '../content/curriculum/index.js';
import { getStaticCurriculumValidationStatus } from '../content/validators/index.js';
import { getStaticCourseSummary, getNextStaticLesson, setStaticCurrentLevel } from '../services/curriculumEngine.js';
import { getCompletedLessonIds, getLessonLockReason } from '../services/lessonProgression.js';
import { getStaticLessonOpenReason, openStaticCourseLesson } from '../services/staticCourseLauncher.js';

const pillarLabels = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  reading: 'Reading',
  listening: 'Listening',
  speaking: 'Speaking',
  writing: 'Writing',
};

function safeArray(value) { return Array.isArray(value) ? value : []; }
function statusLabel(lesson, completedIds) {
  if (completedIds.has(lesson.id)) return { label: 'Concluída', className: 'done', icon: CheckCircle2 };
  if (lesson.status !== 'ready') return { label: 'Planejada', className: 'planned', icon: Lock };
  const lock = getLessonLockReason(lesson, completedIds);
  if (lock) return { label: 'Bloqueada', className: 'locked', icon: Lock, reason: lock };
  return { label: 'Pronta', className: 'ready', icon: Play };
}

export function CourseScreen({ onNavigate }) {
  const [activeLevel, setActiveLevel] = useState('A1');
  const [activePillar, setActivePillar] = useState('grammar');
  const [message, setMessage] = useState('');
  const completedIds = useMemo(() => getCompletedLessonIds(), [activeLevel, activePillar, message]);
  const summary = useMemo(() => getStaticCourseSummary(activeLevel), [activeLevel, message]);
  const levelData = useMemo(() => getStaticLevel(activeLevel), [activeLevel]);
  const validation = useMemo(() => getStaticCurriculumValidationStatus(activeLevel), [activeLevel]);
  const next = useMemo(() => getNextStaticLesson(activeLevel), [activeLevel, message]);
  const lessons = safeArray(levelData.pillars?.[activePillar]);

  function handleLevel(level) {
    setActiveLevel(level);
    setActivePillar('grammar');
    setMessage('');
    setStaticCurrentLevel(level);
  }

  function handleOpenLesson(lesson) {
    const lock = getLessonLockReason(lesson, completedIds);
    if (lock) { setMessage(lock); return; }
    const result = openStaticCourseLesson(lesson);
    if (!result.ok) { setMessage(result.reason || getStaticLessonOpenReason(lesson)); return; }
    setMessage(`Aula aberta: ${lesson.title}`);
    onNavigate?.('lesson');
  }

  function handleOpenNext() {
    if (!next.lesson) { setMessage('Nenhuma próxima aula disponível neste nível.'); return; }
    handleOpenLesson(next.lesson);
  }

  return (
    <section className="screen-stack course-screen">
      <section className="course-hero-card">
        <div className="lesson-chip-row">
          <span className="lesson-chip blue"><Map size={12} /> Curso fixo premium</span>
          <span className="lesson-chip violet">{activeLevel}</span>
          <span className="lesson-chip"><ShieldCheck size={12} /> {validation.approved ? 'validado' : 'pendente'}</span>
        </div>
        <h1>{summary.title}</h1>
        <p>{summary.description}</p>
        <div className="course-hero-progress">
          <div><span>Progresso do nível</span><strong>{summary.completed}/{summary.total}</strong></div>
          <i><b style={{ width: `${summary.percent}%` }} /></i>
          <em>{summary.percent}% concluído</em>
        </div>
        <div className="answer-actions">
          <button type="button" className="primary-button" onClick={handleOpenNext}><Play size={16} /> Abrir próxima aula</button>
          <button type="button" className="secondary-button" onClick={() => setMessage(validation.label)}><ShieldCheck size={16} /> Status do currículo</button>
        </div>
        {message ? <p className="generator-message completion-message">{message}</p> : null}
      </section>

      <div className="course-level-tabs">
        {CURRICULUM_LEVELS.map((level) => {
          const data = getStaticLevel(level);
          const readyCount = getStaticLessons(level).filter((lesson) => lesson.status === 'ready').length;
          return <button key={level} type="button" className={activeLevel === level ? 'active' : ''} onClick={() => handleLevel(level)}><strong>{level}</strong><span>{readyCount ? `${readyCount} prontas` : 'planejado'}</span><small>{data.title}</small></button>;
        })}
      </div>

      <div className="course-pillar-grid">
        {CURRICULUM_PILLARS.map((pillar) => {
          const progress = summary.pillars?.[pillar] || { total: 0, completed: 0, percent: 0 };
          return (
            <button key={pillar} type="button" className={activePillar === pillar ? 'active' : ''} onClick={() => setActivePillar(pillar)}>
              <span>{pillarLabels[pillar]}</span>
              <strong>{progress.completed}/{progress.total}</strong>
              <i><b style={{ width: `${progress.percent}%` }} /></i>
            </button>
          );
        })}
      </div>

      <Card eyebrow="Próxima aula" title={next.lesson ? next.lesson.title : 'Nível sem próxima aula'}>
        {next.lesson ? (
          <div className="course-next-card">
            <div><strong>{next.lesson.level} · {pillarLabels[next.lesson.pillar]}</strong><span>{next.lesson.packageId || 'Pacote sem nome'}</span>{next.lockReason ? <small>{next.lockReason}</small> : null}</div>
            <button type="button" className="primary-button" onClick={handleOpenNext}><Play size={16} /> Abrir</button>
          </div>
        ) : <p>Não há próxima aula disponível neste nível.</p>}
      </Card>

      <section className="course-lesson-list-card">
        <div className="panel-title"><BookOpenCheck size={18} /> {pillarLabels[activePillar]} · {activeLevel}</div>
        <div className="course-lesson-list">
          {lessons.map((lesson) => {
            const state = statusLabel(lesson, completedIds);
            const Icon = state.icon;
            return (
              <button type="button" key={lesson.id} className={`course-lesson-row ${state.className}`} onClick={() => handleOpenLesson(lesson)}>
                <span className="course-lesson-number">{String(lesson.order).padStart(2, '0')}</span>
                <span className="course-lesson-copy"><strong>{lesson.title}</strong><small>{lesson.packageId || lesson.objective || 'Aula do currículo fixo'}</small>{state.reason ? <em>{state.reason}</em> : null}</span>
                <span className="course-lesson-state"><Icon size={15} /> {state.label}</span>
                <ChevronRight size={18} />
              </button>
            );
          })}
        </div>
      </section>

      <section className="course-readiness-card">
        <div><Target size={18} /><strong>Pronto para o próximo nível?</strong></div>
        <p>{summary.gate?.message || 'Complete as aulas, práticas e checkpoints para liberar avanço.'}</p>
        {safeArray(summary.gate?.missing).length ? <ul>{summary.gate.missing.map((item) => <li key={item}>{item}</li>)}</ul> : <span><Sparkles size={15} /> Tudo certo neste nível.</span>}
      </section>
    </section>
  );
}
