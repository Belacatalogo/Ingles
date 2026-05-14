import { useMemo, useState } from 'react';
import { BookOpenCheck, CheckCircle2, ChevronRight, Lock, Map, Play, ShieldCheck, Sparkles, Target } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { ErrorReviewPanel } from '../components/review/ErrorReviewPanel.jsx';
import { A1MasteryGatePanel } from '../components/course/A1MasteryGatePanel.jsx';
import { A1CheckpointShell } from '../components/course/A1CheckpointShell.jsx';
import { A1FinalExamShell } from '../components/course/A1FinalExamShell.jsx';
import { CURRICULUM_LEVELS, CURRICULUM_PILLARS, getStaticLevel, getStaticLessons } from '../content/curriculum/index.js';
import { getStaticCurriculumValidationStatus } from '../content/validators/index.js';
import { getStaticCourseSummary, getNextStaticLesson, setStaticCurrentLevel } from '../services/curriculumEngine.js';
import { getA1MasteryGateSummary } from '../services/a1MasteryGateService.js';
import { getCompletedLessonIds, getLessonLockReason, isStaticLessonReady } from '../services/lessonProgression.js';
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
function isSameLesson(a, b) { return Boolean(a?.id && b?.id && a.id === b.id); }
function statusLabel(lesson, completedIds, nextLesson) {
  if (completedIds?.has?.(lesson.id)) return { label: 'Concluída', className: 'done', icon: CheckCircle2, visibleTitle: lesson.title, visibleSubtitle: 'Aula já liberada para revisão.' };
  const isNext = isSameLesson(lesson, nextLesson);
  const lock = getLessonLockReason(lesson, completedIds);
  if (!isNext) return { label: 'Bloqueada', className: 'locked', icon: Lock, reason: 'Continue pela próxima aula liberada.', visibleTitle: 'Aula futura bloqueada', visibleSubtitle: 'Conteúdo protegido pelo curso guiado.' };
  if (lock) return { label: lesson?.status === 'planned' ? 'Planejada' : 'Bloqueada', className: lesson?.status === 'planned' ? 'planned' : 'locked', icon: Lock, reason: lock, visibleTitle: 'Próxima etapa ainda indisponível', visibleSubtitle: 'Aguarde a liberação no curso.' };
  return { label: 'Próxima', className: 'ready', icon: Play, visibleTitle: lesson.title, visibleSubtitle: lesson.packageId || lesson.objective || 'Aula liberada pelo curso.' };
}

export function CourseScreen({ onNavigate }) {
  const [activeLevel, setActiveLevel] = useState('A1');
  const [activePillar, setActivePillar] = useState('grammar');
  const [message, setMessage] = useState('');
  const [a1RefreshKey, setA1RefreshKey] = useState(0);
  const completedIds = useMemo(() => getCompletedLessonIds(), [activeLevel, activePillar, message]);
  const a1Gate = useMemo(() => getA1MasteryGateSummary(), [activeLevel, message, a1RefreshKey]);
  const summary = useMemo(() => getStaticCourseSummary(activeLevel), [activeLevel, message]);
  const levelData = useMemo(() => getStaticLevel(activeLevel), [activeLevel]);
  const validation = useMemo(() => getStaticCurriculumValidationStatus(activeLevel), [activeLevel]);
  const next = useMemo(() => getNextStaticLesson(activeLevel), [activeLevel, message]);
  const lessons = safeArray(levelData.pillars?.[activePillar]);

  function isLevelBlocked(level) {
    return level !== 'A1' && !a1Gate.canUnlockA2;
  }

  function handleA1GateUpdated() {
    setA1RefreshKey((current) => current + 1);
    setMessage('Critérios do A1 atualizados. Speaking e Writing ainda precisam de revisão.');
  }

  function handleA1CheckpointSaved() {
    setA1RefreshKey((current) => current + 1);
    setMessage('Checkpoint salvo. Os critérios do A1 foram atualizados.');
  }

  function handleLevel(level) {
    if (isLevelBlocked(level)) {
      setActiveLevel('A1');
      setActivePillar('grammar');
      setStaticCurrentLevel('A1');
      setMessage('A2 ainda bloqueado. Complete os critérios do A1 para avançar.');
      return;
    }
    setActiveLevel(level);
    setActivePillar('grammar');
    setMessage('');
    setStaticCurrentLevel(level);
  }

  function handleOpenLesson(lesson) {
    const alreadyCompleted = completedIds?.has?.(lesson.id);
    const isNextLesson = isSameLesson(lesson, next.lesson);
    if (!alreadyCompleted && !isNextLesson) {
      setMessage('Essa aula ainda está bloqueada. Continue pela próxima aula liberada.');
      return;
    }
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
          <span className="lesson-chip blue"><Map size={12} /> Curso guiado</span>
          <span className="lesson-chip violet">{activeLevel}</span>
          <span className="lesson-chip"><ShieldCheck size={12} /> {validation.approved ? 'validado' : 'em revisão'}</span>
        </div>
        <h1>{summary.title}</h1>
        <p>{summary.description}</p>
        <div className="course-hero-progress">
          <div><span>Aulas concluídas</span><strong>{summary.readyCompleted || 0}/{summary.readyTotal || 0}</strong></div>
          <i><b style={{ width: `${summary.readyPercent || 0}%` }} /></i>
          <em>{summary.readyPercent || 0}% das aulas prontas concluído · avance em ordem</em>
        </div>
        <div className="answer-actions">
          <button type="button" className="primary-button" onClick={handleOpenNext}><Play size={16} /> {next.lockReason ? 'Ver próxima pendência' : 'Continuar curso'}</button>
          <button type="button" className="secondary-button" onClick={() => setMessage(validation.label)}><ShieldCheck size={16} /> Ver status</button>
        </div>
        {message ? <p className="generator-message completion-message">{message}</p> : null}
      </section>

      {activeLevel === 'A1' ? <A1MasteryGatePanel key={a1RefreshKey} /> : null}
      {activeLevel === 'A1' ? <A1CheckpointShell onCheckpointSaved={handleA1CheckpointSaved} /> : null}
      {activeLevel === 'A1' ? <A1FinalExamShell onObjectiveScoresSaved={handleA1GateUpdated} /> : null}

      <ErrorReviewPanel onNavigate={onNavigate} compact />

      <div className="course-level-tabs">
        {CURRICULUM_LEVELS.map((level) => {
          const data = getStaticLevel(level);
          const blocked = isLevelBlocked(level);
          const readyCount = safeArray(getStaticLessons(level)).filter(isStaticLessonReady).length;
          const buttonClass = [activeLevel === level ? 'active' : '', blocked ? 'locked' : ''].filter(Boolean).join(' ');
          return (
            <button key={level} type="button" className={buttonClass} onClick={() => handleLevel(level)}>
              <strong>{level}</strong>
              <span>{blocked ? 'Bloqueado' : readyCount ? `${readyCount} prontas` : 'planejado'}</span>
              <small>{blocked ? 'Conclua o nível atual primeiro' : data.title}</small>
            </button>
          );
        })}
      </div>

      <div className="course-pillar-grid">
        {CURRICULUM_PILLARS.map((pillar) => {
          const progress = summary.pillars?.[pillar] || { total: 0, ready: 0, completed: 0, percent: 0 };
          return (
            <button key={pillar} type="button" className={activePillar === pillar ? 'active' : ''} onClick={() => setActivePillar(pillar)}>
              <span>{pillarLabels[pillar]}</span>
              <strong>{progress.completed}/{progress.ready || progress.total}</strong>
              <i><b style={{ width: `${progress.percent}%` }} /></i>
            </button>
          );
        })}
      </div>

      <Card eyebrow="Próxima aula" title={next.lesson && !next.lockReason ? next.lesson.title : 'Continue pelo caminho guiado'}>
        {next.lesson ? (
          <div className="course-next-card">
            <div><strong>{next.lesson.level} · {pillarLabels[next.lesson.pillar]}</strong><span>{next.lockReason ? 'Próxima etapa bloqueada' : 'Aula liberada agora'}</span>{next.lockReason ? <small>{next.lockReason}</small> : null}</div>
            <button type="button" className="primary-button" onClick={handleOpenNext}><Play size={16} /> {next.lockReason ? 'Ver pendência' : 'Abrir'}</button>
          </div>
        ) : <p>Não há próxima aula disponível neste nível.</p>}
      </Card>

      <section className="course-lesson-list-card">
        <div className="panel-title"><BookOpenCheck size={18} /> {pillarLabels[activePillar]} · {activeLevel}</div>
        <div className="course-lesson-list">
          {lessons.map((lesson) => {
            const state = statusLabel(lesson, completedIds, next.lesson);
            const Icon = state.icon;
            return (
              <button type="button" key={lesson.id} className={`course-lesson-row ${state.className}`} onClick={() => handleOpenLesson(lesson)}>
                <span className="course-lesson-number">{String(lesson.order).padStart(2, '0')}</span>
                <span className="course-lesson-copy"><strong>{state.visibleTitle}</strong><small>{state.visibleSubtitle}</small>{state.reason ? <em>{state.reason}</em> : null}</span>
                <span className="course-lesson-state"><Icon size={15} /> {state.label}</span>
                <ChevronRight size={18} />
              </button>
            );
          })}
        </div>
      </section>

      <section className="course-readiness-card">
        <div><Target size={18} /><strong>Pronto para o próximo nível?</strong></div>
        <p>{activeLevel === 'A1' ? 'Complete aulas, avaliações, prova final e revisões para liberar o A2.' : summary.gate?.message || 'Complete as aulas e avaliações para liberar avanço.'}</p>
        {activeLevel !== 'A1' && safeArray(summary.gate?.missing).length ? <ul>{summary.gate.missing.map((item) => <li key={item}>{item}</li>)}</ul> : <span><Sparkles size={15} /> {activeLevel === 'A1' ? 'Veja os critérios do A1 acima.' : 'Tudo certo neste nível.'}</span>}
      </section>
    </section>
  );
}
