import { useMemo, useState } from 'react';
import { BookOpenCheck, CheckCircle2, Lock, Map, Play, ShieldCheck, Sparkles, Target } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { ErrorReviewPanel } from '../components/review/ErrorReviewPanel.jsx';
import { A1MasteryGatePanel } from '../components/course/A1MasteryGatePanel.jsx';
import { A1CheckpointShell } from '../components/course/A1CheckpointShell.jsx';
import { A1FinalExamShell } from '../components/course/A1FinalExamShell.jsx';
import { CURRICULUM_LEVELS, getStaticLevel, getStaticLessons } from '../content/curriculum/index.js';
import { getStaticCurriculumValidationStatus, validateGuidedCourseAccess } from '../content/validators/index.js';
import { getStaticCourseSummary, setStaticCurrentLevel } from '../services/curriculumEngine.js';
import { getA1MasteryGateSummary } from '../services/a1MasteryGateService.js';
import { getCompletedLessonIds, isStaticLessonReady } from '../services/lessonProgression.js';
import { getDailyStaticCourseLessonState, openDailyStaticCourseLesson, openStaticCourseLesson } from '../services/staticCourseLauncher.js';

const pillarLabels = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  reading: 'Reading',
  listening: 'Listening',
  speaking: 'Speaking',
  writing: 'Writing',
};

function safeArray(value) { return Array.isArray(value) ? value : []; }
function countReadyLessons(level) { return safeArray(getStaticLessons(level)).filter(isStaticLessonReady).length; }

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
  const completedReviewLessons = useMemo(() => safeArray(getStaticLessons(activeLevel)).filter((lesson) => completedIds.has(lesson.id)).slice(0, 6), [activeLevel, message]);
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
      <section className="course-hero-card">
        <div className="lesson-chip-row">
          <span className="lesson-chip blue"><Map size={12} /> Curso guiado</span>
          <span className="lesson-chip violet">{activeLevel}</span>
          <span className="lesson-chip"><ShieldCheck size={12} /> {guidedStatusLabel}</span>
        </div>
        <h1>{summary.title}</h1>
        <p>Você não precisa escolher aula. Toque em começar e o Fluency abre automaticamente a aula liberada para o seu progresso.</p>
        <div className="course-hero-progress">
          <div><span>Aulas concluídas</span><strong>{summary.readyCompleted || 0}/{summary.readyTotal || 0}</strong></div>
          <i><b style={{ width: `${summary.readyPercent || 0}%` }} /></i>
          <em>{summary.readyPercent || 0}% concluído · avance em ordem</em>
        </div>
        <div className="answer-actions">
          <button type="button" className="primary-button" onClick={handleStartDailyLesson}><Play size={16} /> {dailyState.actionLabel}</button>
          <button type="button" className="secondary-button" onClick={showFriendlyStatus}><ShieldCheck size={16} /> Ver status</button>
        </div>
        {message ? <p className="generator-message completion-message">{message}</p> : null}
      </section>

      <Card eyebrow={dailyState.statusLabel} title={nextLesson && !nextIsBlocked ? nextLesson.title : 'Continue pelo caminho guiado'}>
        {nextLesson ? (
          <div className="course-next-card">
            <div>
              <strong>{nextLesson.level} · {pillarLabels[nextLesson.pillar] || 'Aula'}</strong>
              <span>{dailyState.helperText}</span>
              {nextIsBlocked ? <small>{dailyState.reason}</small> : null}
            </div>
            <button type="button" className="primary-button" onClick={handleStartDailyLesson}><Play size={16} /> {dailyState.actionLabel.replace(' aula', '')}</button>
          </div>
        ) : <p>{dailyState.reason || 'Nenhuma aula liberada agora. Veja os critérios do nível para saber o próximo passo.'}</p>}
      </Card>

      {activeLevel === 'A1' ? <A1MasteryGatePanel key={a1RefreshKey} /> : null}
      {activeLevel === 'A1' ? <A1CheckpointShell onCheckpointSaved={handleA1CheckpointSaved} /> : null}
      {activeLevel === 'A1' ? <A1FinalExamShell onObjectiveScoresSaved={handleA1GateUpdated} /> : null}

      <ErrorReviewPanel onNavigate={onNavigate} compact />

      {completedReviewLessons.length ? (
        <section className="course-lesson-list-card">
          <div className="panel-title"><CheckCircle2 size={18} /> Revisar aulas concluídas</div>
          <div className="course-lesson-list">
            {completedReviewLessons.map((lesson) => (
              <button type="button" key={lesson.id} className="course-lesson-row done" onClick={() => handleReviewLesson(lesson)}>
                <span className="course-lesson-number">✓</span>
                <span className="course-lesson-copy"><strong>{lesson.title}</strong><small>{lesson.level} · {pillarLabels[lesson.pillar] || 'Aula'} · revisão liberada</small></span>
                <span className="course-lesson-state"><CheckCircle2 size={15} /> Revisar</span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      <section className="course-lesson-list-card">
        <div className="panel-title"><BookOpenCheck size={18} /> Caminho do curso</div>
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
        <div className="inline-warning curriculum-next-box">
          <Lock size={16} />
          <span>
            As aulas futuras ficam bloqueadas.
            <small>O botão {dailyState.actionLabel} escolhe automaticamente o próximo conteúdo liberado. Você não precisa selecionar pilar ou aula manualmente.</small>
          </span>
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
