import { BookOpenCheck, CheckCircle2, Lock, Map, PlayCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { getStaticCourseSummary } from '../../services/curriculumEngine.js';
import { getA1MasteryGateSummary } from '../../services/a1MasteryGateService.js';
import { getDailyStaticCourseLessonState, openDailyStaticCourseLesson } from '../../services/staticCourseLauncher.js';

function pillarLabel(pillar) {
  const labels = { grammar: 'Grammar', vocabulary: 'Vocabulary', reading: 'Reading', listening: 'Listening', speaking: 'Speaking', writing: 'Writing' };
  return labels[pillar] || pillar || 'Aula';
}

export function StaticNextLessonPanel({ onNavigate }) {
  const summary = getStaticCourseSummary('A1');
  const masteryGate = getA1MasteryGateSummary();
  const dailyState = getDailyStaticCourseLessonState('A1');
  const lesson = dailyState.lesson;
  const allReadyLessonsCompleted = Boolean(summary.readyTotal && summary.readyCompleted >= summary.readyTotal);
  const shouldShowFinalGate = allReadyLessonsCompleted || masteryGate.canTakeFinalExam || masteryGate.canUnlockA2;
  const canOpen = Boolean(dailyState.canOpen && !shouldShowFinalGate);

  function openNextLesson() {
    if (shouldShowFinalGate) { onNavigate?.('course'); return; }
    const result = openDailyStaticCourseLesson('A1');
    if (result.ok) onNavigate?.('lesson');
    else onNavigate?.('course');
  }

  return (
    <section className="lesson-generator-panel static-next-lesson-panel">
      <div className="panel-title"><BookOpenCheck size={18} /> Curso guiado premium</div>
      <p>Toque em {dailyState.actionLabel.toLowerCase()} e o Fluency abre automaticamente a aula certa.</p>

      <div className="generation-status-box">
        <div><span>Nível atual</span><strong>{summary.level}</strong></div>
        <div><span>Conteúdo preparado</span><strong>{summary.readyTotal || 0}/{summary.total || 0}</strong></div>
        <div><span>Aulas concluídas</span><strong>{summary.readyCompleted || 0}/{summary.readyTotal || 0}</strong></div>
      </div>

      {shouldShowFinalGate ? (
        <div className="inline-warning curriculum-next-box">
          {masteryGate.canUnlockA2 ? <CheckCircle2 size={16} /> : <ShieldCheck size={16} />}
          <span>
            {masteryGate.canUnlockA2 ? 'A2 liberado' : masteryGate.canTakeFinalExam ? 'Próximo passo: prova final do A1' : 'Aulas concluídas. Veja o que falta para liberar o A2'}
            <small>{masteryGate.statusLabel}. O A2 só libera depois das avaliações e revisões.</small>
          </span>
        </div>
      ) : lesson ? (
        <div className="inline-warning curriculum-next-box">
          {canOpen ? <Sparkles size={16} /> : <Lock size={16} />}
          <span>
            {dailyState.statusLabel}: <b>{lesson.level}</b> · {pillarLabel(lesson.pillar)} · {canOpen ? lesson.title : 'continue pelo caminho guiado'}
            {dailyState.helperText ? <small>{dailyState.helperText}</small> : null}
          </span>
        </div>
      ) : (
        <div className="inline-warning curriculum-next-box"><Map size={16} /><span>Mapa A1 concluído ou aguardando a próxima liberação.</span></div>
      )}

      <div className="answer-actions">
        <button type="button" className="primary-button" onClick={openNextLesson}>
          <PlayCircle size={16} /> {shouldShowFinalGate ? 'Ver critérios do A1' : canOpen ? dailyState.actionLabel : 'Ver mapa do curso'}
        </button>
        <button type="button" className="secondary-button" onClick={() => onNavigate?.('course')}>
          <Map size={16} /> Ver caminho
        </button>
      </div>
      <p className="empty-note">Você não precisa escolher pilar ou aula manualmente. Conteúdos preparados podem existir no sistema, mas só a aula liberada automaticamente pode ser aberta.</p>
    </section>
  );
}
