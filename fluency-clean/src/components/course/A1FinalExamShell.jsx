import { BookOpenCheck, CheckCircle2, Clock3, Mic, PenLine, PlayCircle, ShieldCheck } from 'lucide-react';
import { A1_FINAL_EXAM_MODEL, getA1FinalExamStudentSections } from '../../content/curriculum/levels/A1/a1FinalExamModel.js';
import { getA1MasteryGateSummary } from '../../services/a1MasteryGateService.js';

const sectionIcons = {
  grammar: BookOpenCheck,
  vocabulary: BookOpenCheck,
  reading: BookOpenCheck,
  listening: PlayCircle,
  speaking: Mic,
  writing: PenLine,
};

export function A1FinalExamShell() {
  const sections = getA1FinalExamStudentSections();
  const gate = getA1MasteryGateSummary();
  const canStart = gate.canTakeFinalExam || gate.canUnlockA2;

  return (
    <section className="a1-final-exam-shell-card">
      <header>
        <div className="a1-gate-title">
          <span><ShieldCheck size={18} /></span>
          <div>
            <strong>{A1_FINAL_EXAM_MODEL.title}</strong>
            <small>{A1_FINAL_EXAM_MODEL.studentDescription}</small>
          </div>
        </div>
        <em><Clock3 size={14} /> Cerca de {A1_FINAL_EXAM_MODEL.estimatedMinutes} min</em>
      </header>

      <div className="a1-final-exam-note">
        {canStart ? (
          <span><CheckCircle2 size={16} /> Você pode iniciar a prova final do A1.</span>
        ) : (
          <span><ShieldCheck size={16} /> Complete os critérios do A1 acima para liberar a prova final.</span>
        )}
      </div>

      <div className="a1-final-exam-sections">
        {sections.map((section) => {
          const Icon = sectionIcons[section.id] || BookOpenCheck;
          return (
            <article key={section.id}>
              <div><Icon size={17} /><strong>{section.title}</strong></div>
              <p>{section.instructions}</p>
              <small>{section.requiresReview ? 'Será revisado antes de liberar o A2' : `Meta mínima: ${section.minimumScore}%`}</small>
            </article>
          );
        })}
      </div>

      <div className="answer-actions">
        <button type="button" className="primary-button" disabled={!canStart}>
          <PlayCircle size={16} /> {canStart ? 'Iniciar prova final do A1' : 'Prova ainda bloqueada'}
        </button>
      </div>
    </section>
  );
}
