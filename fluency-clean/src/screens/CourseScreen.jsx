import { useMemo, useState } from 'react';
import { BookOpenCheck, CheckCircle2, ChevronDown, ChevronUp, ClipboardCheck, GraduationCap, Lock, Map, Play, ShieldCheck, Target } from 'lucide-react';
import { ErrorReviewPanel } from '../components/review/ErrorReviewPanel.jsx';
import { A1MasteryGatePanel } from '../components/course/A1MasteryGatePanel.jsx';
import { A1CheckpointShell } from '../components/course/A1CheckpointShell.jsx';
import { A1FinalExamShell } from '../components/course/A1FinalExamShell.jsx';
import { MasteryRecommendationPanel } from '../components/course/MasteryRecommendationPanel.jsx';
import { CURRICULUM_LEVELS, getStaticLevel, getStaticLessons } from '../content/curriculum/index.js';
import { getStaticCurriculumValidationStatus, validateGuidedCourseAccess } from '../content/validators/index.js';
import { getStaticCourseSummary, setStaticCurrentLevel } from '../services/curriculumEngine.js';
import { getA1MasteryGateSummary } from '../services/a1MasteryGateService.js';
import { getCompletedLessonIds, getLessonLockReason, isStaticLessonReady } from '../services/lessonProgression.js';
import { getDailyStaticCourseLessonState, openDailyStaticCourseLesson, openStaticCourseLesson } from '../services/staticCourseLauncher.js';

const pillarLabels = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  reading: 'Reading',
  listening: 'Listening',
  speaking: 'Speaking',
  writing: 'Writing',
};

const statusLabels = {
  done: 'concluída',
  ready: 'disponível',
  locked: 'bloqueada',
  planned: 'planejada',
};

const WEEK_DAYS = [
  { short: 'Seg', day: 1, pillar: 'grammar' },
  { short: 'Ter', day: 2, pillar: 'vocabulary' },
  { short: 'Qua', day: 3, pillar: 'reading' },
  { short: 'Qui', day: 4, pillar: 'listening' },
  { short: 'Sex', day: 5, pillar: 'speaking' },
  { short: 'Sáb', day: 6, pillar: 'writing' },
  { short: 'Dom', day: 0, pillar: '' },
];

const TODAY_DAY = new Date().getDay();

function safeArray(value) { return Array.isArray(value) ? value : []; }
function countReadyLessons(level) { return safeArray(getStaticLessons(level)).filter(isStaticLessonReady).length; }

function buildLevelLessons(level, completedIds) {
  return safeArray(getStaticLessons(level)).map((lesson) => {
    const isDone = completedIds.has(lesson.id);
    const ready = isStaticLessonReady(lesson);
    const blocked = ready && !isDone && Boolean(getLessonLockReason(lesson, completedIds));
    const available = ready && !isDone && !blocked;
    const status = isDone ? 'done' : available ? 'ready' : ready ? 'locked' : 'planned';
    return { ...lesson, status };
  }).slice(0, 30);
}

function CollapsibleCard({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="course-collapsible">
      <button type="button" className="course-collapsible-toggle" onClick={() => setOpen((v) => !v)}>
        {icon}
        <span>{title}</span>
        {open ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
      </button>
      {open ? <div className="course-collapsible-body">{children}</div> : null}
    </div>
  );
}

export function CourseScreen({ onNavigate }) {
  const [activeLevel, setActiveLevel] = useState('A1');
  const [message, setMessage] = useState('');
  const [a1RefreshKey, setA1RefreshKey] = useState(0);
  const completedIds = useMemo(() => getCompletedLessonIds(), [activeLevel, message]);
  const a1Gate = useMemo(() => getA1MasteryGateSummary(), [activeLevel, message, a1RefreshKey]);
  const summary = useMemo(() => getStaticCourseSummary(activeLevel), [activeLevel, message]);
  const validation = useMemo(() => getStaticCurriculumValidationStatus(activeLevel), [activeLevel]);
  const guidedAccess = useMemo(() => validateGuidedCourseAccess(activeLevel), [activeLevel, message]);
  const dailyState = useMemo(() => getDailyStaticCourseLessonState(activeLevel), [activeLevel, message]);
  const levelLessons = useMemo(() => buildLevelLessons(activeLevel, completedIds), [activeLevel, message, completedIds]);
  const guidedStatusLabel = guidedAccess.approved ? 'sequência protegida' : 'sequência em revisão';
  const nextLesson = dailyState.lesson;
  const nextIsBlocked = Boolean(nextLesson && dailyState.reason);

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
      setStaticCurrentLevel('A1');
      setMessage('Esse nível ainda está bloqueado. Continue pelo nível atual.');
      return;
    }
    setActiveLevel(level);
    setMessage('');
    setStaticCurrentLevel(level);
  }

  function handleStartDailyLesson() {
    const result = openDailyStaticCourseLesson(activeLevel);
    if (!result.ok) { setMessage(result.reason || 'Nenhuma aula liberada agora. Veja os critérios do nível.'); return; }
    setMessage(`${result.state?.shouldResume ? 'Retomando' : 'Aula liberada'}: ${result.lesson?.title || 'aula do dia'}`);
    onNavigate?.('lesson');
  }

  function handleReviewLesson(lesson) {
    if (!completedIds.has(lesson.id)) {
      setMessage('Somente aulas concluídas aparecem para revisão. Use Começar aula para continuar.');
      return;
    }
    const result = openStaticCourseLesson(lesson);
    if (!result.ok) { setMessage(result.reason || 'Não foi possível abrir esta revisão agora.'); return; }
    setMessage(`Revisão aberta: ${lesson.title}`);
    onNavigate?.('lesson');
  }

  function showFriendlyStatus() {
    if (!guidedAccess.approved) {
      setMessage('A sequência do curso está em revisão. Use apenas o botão Começar aula.');
      return;
    }
    setMessage(validation.approved ? 'Curso validado e sequência protegida.' : 'Sequência protegida. Conteúdo pedagógico ainda está em revisão interna.');
  }

  return (
    <section className="screen-stack course-screen">

      {/* ── 1 — Hero unificado ─────────────────────────────────── */}
      <section className="course-hero-card">
        <div className="lesson-chip-row">
          <span className="lesson-chip blue"><Map size={12} /> Curso guiado</span>
          <span className="lesson-chip violet">{activeLevel}</span>
          <span className="lesson-chip"><ShieldCheck size={12} /> {guidedStatusLabel}</span>
        </div>
        <h1>{summary.title}</h1>
        <p>Você não precisa escolher aula. O Fluency abre automaticamente a aula certa para o seu progresso.</p>

        <div className="course-week-strip">
          {WEEK_DAYS.map(({ short, day, pillar }) => (
            <div
              key={day}
              className={['course-week-day', TODAY_DAY === day ? 'today' : '', !pillar ? 'rest' : ''].filter(Boolean).join(' ')}
              data-pillar={pillar || undefined}
            >
              <span>{short}</span>
              <small>{pillar ? pillarLabels[pillar] : 'Descanso'}</small>
            </div>
          ))}
        </div>

        <div className="course-hero-progress">
          <div><span>Aulas concluídas</span><strong>{summary.readyCompleted || 0}/{summary.readyTotal || 0}</strong></div>
          <i><b style={{ width: `${summary.readyPercent || 0}%` }} /></i>
          <em>{summary.readyPercent || 0}% concluído · avance em ordem</em>
        </div>

        {nextLesson ? (
          <div className="course-next-inline">
            <small>
              {nextIsBlocked ? <><Lock size={11} /> Bloqueada</> : <><Play size={11} /> Próxima aula</>}
            </small>
            <strong>{nextLesson.title}</strong>
            <span>{nextLesson.level} · {pillarLabels[nextLesson.pillar] || 'Aula'}{dailyState.helperText ? ` · ${dailyState.helperText}` : ''}</span>
            {nextIsBlocked ? <p>{dailyState.reason}</p> : null}
          </div>
        ) : dailyState.reason ? (
          <div className="course-next-inline course-next-empty">
            <p>{dailyState.reason}</p>
          </div>
        ) : null}

        <div className="answer-actions">
          <button type="button" className="primary-button" onClick={handleStartDailyLesson}><Play size={16} /> {dailyState.actionLabel}</button>
          <button type="button" className="secondary-button" onClick={showFriendlyStatus}><ShieldCheck size={16} /> Ver status</button>
        </div>
        {message ? <p className="generator-message completion-message">{message}</p> : null}
      </section>

      {/* ── 2 — Caminho do curso ───────────────────────────────── */}
      <section className="course-lesson-list-card">
        <div className="course-section-title"><BookOpenCheck size={17} /> Caminho do curso</div>

        <div className="course-level-tabs">
          {CURRICULUM_LEVELS.map((level) => {
            const data = getStaticLevel(level);
            const blocked = isLevelBlocked(level);
            const readyCount = countReadyLessons(level);
            const buttonClass = [activeLevel === level ? 'active' : '', blocked ? 'locked' : ''].filter(Boolean).join(' ');
            return (
              <button key={level} type="button" className={buttonClass} onClick={() => handleLevel(level)}>
                <strong>{level}</strong>
                <span>{blocked ? 'Bloqueado' : readyCount ? `${readyCount} preparados` : 'planejado'}</span>
                <small>{blocked ? 'Continue pelo nível atual' : data.title}</small>
              </button>
            );
          })}
        </div>

        {isLevelBlocked(activeLevel) ? (
          <div className="inline-warning curriculum-next-box">
            <Lock size={16} />
            <span>
              Este nível ainda está bloqueado.
              <small>Continue pelo nível atual. O {activeLevel} só abre depois de cumprir os critérios do nível anterior.</small>
            </span>
          </div>
        ) : (
          <div className="course-lesson-list">
            {levelLessons.length === 0 ? (
              <p style={{ color: '#9aa7c8', fontSize: 14, margin: 0 }}>Nenhuma aula preparada neste nível ainda.</p>
            ) : levelLessons.map((lesson) => (
              <button
                type="button"
                key={lesson.id}
                className={`course-lesson-row ${lesson.status}`}
                onClick={
                  lesson.status === 'done' ? () => handleReviewLesson(lesson)
                  : lesson.status === 'ready' ? handleStartDailyLesson
                  : undefined
                }
                disabled={lesson.status === 'locked' || lesson.status === 'planned'}
              >
                <span className={`course-lesson-number pillar-${lesson.pillar}`}>
                  {lesson.status === 'done' ? '✓' : lesson.status === 'ready' ? '▶' : ''}
                </span>
                <span className="course-lesson-copy">
                  <strong>{lesson.title}</strong>
                  <small>{lesson.level} · {pillarLabels[lesson.pillar] || 'Aula'} · {statusLabels[lesson.status]}</small>
                </span>
                {lesson.status === 'done' && <span className="course-lesson-state"><CheckCircle2 size={15} /> Revisar</span>}
                {lesson.status === 'ready' && <span className="course-lesson-state"><Play size={15} /> Disponível</span>}
              </button>
            ))}
          </div>
        )}

        <div className="inline-warning curriculum-next-box">
          <Lock size={16} />
          <span>
            Aulas futuras ficam bloqueadas automaticamente.
            <small>O botão {dailyState.actionLabel} escolhe o próximo conteúdo liberado. Você não precisa selecionar aula manualmente.</small>
          </span>
        </div>
      </section>

      {/* ── 3 — Revisão de erros ───────────────────────────────── */}
      <ErrorReviewPanel onNavigate={onNavigate} compact />

      {/* ── 4 — Domínio por pilar (recomendação automática) ──── */}
      <MasteryRecommendationPanel level={activeLevel} />

      {/* ── 5 — Avaliações A1 ─────────────────────────────────── */}
      {activeLevel === 'A1' ? (
        <>
          <A1MasteryGatePanel key={a1RefreshKey} />
          <CollapsibleCard title="Checkpoints do A1" icon={<ClipboardCheck size={17} />}>
            <A1CheckpointShell onCheckpointSaved={handleA1CheckpointSaved} />
          </CollapsibleCard>
          <CollapsibleCard title="Prova Final do A1" icon={<GraduationCap size={17} />}>
            <A1FinalExamShell onObjectiveScoresSaved={handleA1GateUpdated} />
          </CollapsibleCard>
        </>
      ) : safeArray(summary.gate?.missing).length ? (
        <section className="course-readiness-card">
          <div><Target size={18} /><strong>Pronto para o próximo nível?</strong></div>
          <p>{summary.gate?.message || 'Complete as aulas e avaliações para liberar avanço.'}</p>
          <ul>{summary.gate.missing.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      ) : null}

    </section>
  );
}
