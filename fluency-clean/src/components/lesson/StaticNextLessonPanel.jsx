import { BookOpenCheck, Lock, Map, PlayCircle, Sparkles } from 'lucide-react';
import { getNextStaticLesson, getStaticCourseSummary } from '../../services/curriculumEngine.js';
import { openStaticCourseLesson } from '../../services/staticCourseLauncher.js';

function pillarLabel(pillar) {
  const labels = { grammar: 'Grammar', vocabulary: 'Vocabulary', reading: 'Reading', listening: 'Listening', speaking: 'Speaking', writing: 'Writing' };
  return labels[pillar] || pillar;
}

export function StaticNextLessonPanel({ onNavigate }) {
  const summary = getStaticCourseSummary('A1');
  const next = getNextStaticLesson('A1');
  const lesson = next.lesson;

  function openNextLesson() {
    if (!lesson || next.lockReason) { onNavigate?.('course'); return; }
    const result = openStaticCourseLesson(lesson);
    if (result.ok) onNavigate?.('lesson');
    else onNavigate?.('course');
  }

  return (
    <section className="lesson-generator-panel static-next-lesson-panel">
      <div className="panel-title"><BookOpenCheck size={18} /> Curso fixo premium</div>
      <p>O Fluency agora usa aulas fixas A1 → C2. A IA fica somente como tutora, corretora e revisão adaptativa.</p>

      <div className="generation-status-box">
        <div><span>Nível atual</span><strong>{summary.level}</strong></div>
        <div><span>Mapa A1</span><strong>{summary.total} aulas</strong></div>
      </div>

      {lesson ? (
        <div className="inline-warning curriculum-next-box">
          {next.lockReason ? <Lock size={16} /> : <Sparkles size={16} />}
          <span>
            Próxima aula: <b>{lesson.level}</b> · {pillarLabel(lesson.pillar)} · {lesson.title}
            {next.lockReason ? <small>{next.lockReason}</small> : null}
          </span>
        </div>
      ) : (
        <div className="inline-warning curriculum-next-box"><Map size={16} /><span>Mapa A1 concluído ou aguardando conteúdo real.</span></div>
      )}

      <div className="answer-actions">
        <button type="button" className="primary-button" onClick={openNextLesson}>
          <PlayCircle size={16} /> Abrir próxima aula
        </button>
        <button type="button" className="secondary-button" onClick={() => onNavigate?.('course')}>
          <Map size={16} /> Ver mapa do curso
        </button>
      </div>
      <p className="empty-note">Use o mapa do curso para abrir aulas prontas e ver quais ainda estão planejadas.</p>
    </section>
  );
}
