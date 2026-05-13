import { BookOpenCheck, Lock, Map, Sparkles } from 'lucide-react';
import { getNextStaticLesson, getStaticCourseSummary } from '../../services/curriculumEngine.js';

function pillarLabel(pillar) {
  const labels = {
    grammar: 'Grammar',
    vocabulary: 'Vocabulary',
    reading: 'Reading',
    listening: 'Listening',
    speaking: 'Speaking',
    writing: 'Writing',
  };
  return labels[pillar] || pillar;
}

export function StaticNextLessonPanel({ onNavigate }) {
  const summary = getStaticCourseSummary('A1');
  const next = getNextStaticLesson('A1');
  const lesson = next.lesson;

  return (
    <section className="lesson-generator-panel static-next-lesson-panel">
      <div className="panel-title"><BookOpenCheck size={18} /> Curso fixo premium</div>
      <p>O Fluency está migrando para aulas fixas A1 → C2. A IA não será mais usada para gerar a aula principal; ela ficará como tutora, corretora e revisão adaptativa.</p>

      <div className="generation-status-box">
        <div><span>Nível atual</span><strong>{summary.level}</strong></div>
        <div><span>Mapa A1</span><strong>{summary.total} aulas</strong></div>
      </div>

      {lesson ? (
        <div className="inline-warning curriculum-next-box">
          {next.lockReason ? <Lock size={16} /> : <Sparkles size={16} />}
          <span>
            Próxima planejada: <b>{lesson.level}</b> · {pillarLabel(lesson.pillar)} · {lesson.title}
            {next.lockReason ? <small>{next.lockReason}</small> : null}
          </span>
        </div>
      ) : (
        <div className="inline-warning curriculum-next-box"><Map size={16} /><span>Mapa A1 concluído ou aguardando conteúdo real.</span></div>
      )}

      <button type="button" className="primary-button" onClick={() => onNavigate?.('progress')}>
        <Map size={16} /> Ver progresso do curso
      </button>
      <p className="empty-note">As aulas fixas reais serão adicionadas nos próximos blocos. Até lá, este painel substitui o gerador instável de aula por IA.</p>
    </section>
  );
}
