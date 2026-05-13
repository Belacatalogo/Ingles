import { BookOpenCheck, Lock, Map, PlayCircle, Sparkles } from 'lucide-react';
import { getNextStaticLesson, getStaticCourseSummary } from '../../services/curriculumEngine.js';
import { openStaticCourseLesson } from '../../services/staticCourseLauncher.js';

function pillarLabel(pillar) {
  const labels = { grammar: 'Grammar', vocabulary: 'Vocabulary', reading: 'Reading', listening: 'Listening', speaking: 'Speaking', writing: 'Writing' };
  return labels[pillar] || pillar || 'Aula';
}

export function StaticNextLessonPanel({ onNavigate }) {
  const summary = getStaticCourseSummary('A1');
  const next = getNextStaticLesson('A1');
  const lesson = next.lesson;
  const canOpen = Boolean(lesson && !next.lockReason);

  function openNextLesson() {
    if (!canOpen) { onNavigate?.('course'); return; }
    const result = openStaticCourseLesson(lesson);
    if (result.ok) onNavigate?.('lesson');
    else onNavigate?.('course');
  }

  return (
    <section className="lesson-generator-panel static-next-lesson-panel">
      <div className="panel-title"><BookOpenCheck size={18} /> Curso fixo premium</div>
      <p>O Fluency usa aulas fixas A1 → C2. A IA fica somente como tutora, corretora e revisão adaptativa.</p>

      <div className="generation-status-box">
        <div><span>Nível atual</span><strong>{summary.level}</strong></div>
        <div><span>Aulas prontas</span><strong>{summary.readyTotal || 0}/{summary.total || 0}</strong></div>
      </div>

      {lesson ? (
        <div className="inline-warning curriculum-next-box">
          {canOpen ? <Sparkles size={16} /> : <Lock size={16} />}
          <span>
            {canOpen ? 'Próxima aula pronta' : 'Próxima aula planejada'}: <b>{lesson.level}</b> · {pillarLabel(lesson.pillar)} · {lesson.title}
            {next.lockReason ? <small>{next.lockReason}</small> : null}
          </span>
        </div>
      ) : (
        <div className="inline-warning curriculum-next-box"><Map size={16} /><span>Mapa A1 concluído ou aguardando conteúdo real.</span></div>
      )}

      <div className="answer-actions">
        <button type="button" className="primary-button" onClick={openNextLesson}>
          <PlayCircle size={16} /> {canOpen ? 'Abrir próxima aula pronta' : 'Ver mapa do curso'}
        </button>
        <button type="button" className="secondary-button" onClick={() => onNavigate?.('course')}>
          <Map size={16} /> Ver mapa do curso
        </button>
      </div>
      <p className="empty-note">Aulas planejadas não abrem mais como “Aula padrão”. Só aulas prontas entram na aba Aula.</p>
    </section>
  );
}
