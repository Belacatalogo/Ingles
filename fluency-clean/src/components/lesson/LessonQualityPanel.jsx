import { AlertTriangle, CheckCircle2, ClipboardCheck, GraduationCap, ShieldCheck, Sparkles } from 'lucide-react';

function clampScore(value) {
  const score = Number(value || 0);
  return Math.max(0, Math.min(100, Math.round(score)));
}

function scoreLabel(score) {
  if (score >= 90) return 'Excelente';
  if (score >= 82) return 'Aprovada';
  if (score >= 72) return 'Precisa atenção';
  return 'Fraca';
}

function scoreClass(score) {
  if (score >= 90) return 'excellent';
  if (score >= 82) return 'approved';
  if (score >= 72) return 'warning';
  return 'danger';
}

function uniqueIssues(items = []) {
  return Array.from(new Set(items.filter(Boolean))).slice(0, 4);
}

export function LessonQualityPanel({ lesson }) {
  if (!lesson) return null;

  const meta = lesson.generationMeta || {};
  const quality = lesson.quality || {};
  const pedagogical = lesson.pedagogicalReview || {};
  const teacher = lesson.teacherReview || {};
  const hasPlan = Boolean(lesson.lessonPlan || lesson.planContract || meta.contractVersion?.includes('lesson-plan'));
  const hasTeacher = Boolean(teacher.reviewer || quality.reviewer || meta.contractVersion?.includes('teacher-reviewer'));
  const pedagogicalScore = clampScore(quality.pedagogicalScore || pedagogical.overallScore || meta.pedagogicalScore);
  const teacherScore = clampScore(quality.teacherScore || teacher.finalScore || pedagogicalScore);
  const finalScore = teacherScore || pedagogicalScore;
  const issues = uniqueIssues([...(quality.teacherIssues || []), ...(teacher.issues || []), ...(quality.issues || []), ...(pedagogical.issues || [])]);
  const approved = Boolean(quality.teacherApproved ?? teacher.approved ?? quality.approved ?? pedagogical.approved ?? finalScore >= 82);
  const scoreType = scoreClass(finalScore);

  return (
    <section className={`lesson-quality-panel ${scoreType}`}>
      <div className="lesson-quality-header">
        <div>
          <span className="quality-eyebrow"><ShieldCheck size={13} /> Qualidade da aula</span>
          <h2>{scoreLabel(finalScore)} · {finalScore}/100</h2>
          <p>{approved ? 'Esta aula passou pelas camadas de qualidade antes de ser salva.' : 'Esta aula tem alertas e deve ser revisada antes de confiar totalmente.'}</p>
        </div>
        <div className="quality-score-ring" aria-label={`Nota ${finalScore} de 100`}>
          <strong>{finalScore}</strong>
          <small>/100</small>
        </div>
      </div>

      <div className="quality-grid">
        <div className="quality-card">
          <ClipboardCheck size={16} />
          <span>Rubrica pedagógica</span>
          <strong>{pedagogicalScore || finalScore}/100</strong>
        </div>
        <div className="quality-card">
          <GraduationCap size={16} />
          <span>Professor revisor</span>
          <strong>{hasTeacher ? `${teacherScore}/100` : 'não aplicado'}</strong>
        </div>
        <div className="quality-card">
          <Sparkles size={16} />
          <span>Plano pedagógico</span>
          <strong>{hasPlan ? 'ativo' : 'não aplicado'}</strong>
        </div>
        <div className="quality-card">
          <CheckCircle2 size={16} />
          <span>Correção automática</span>
          <strong>{meta.autoRepaired || pedagogical.autoRepaired ? 'sim' : 'não'}</strong>
        </div>
      </div>

      {issues.length ? (
        <div className="quality-alerts">
          <span><AlertTriangle size={15} /> Pontos de atenção</span>
          <ul>
            {issues.map((issue) => <li key={issue}>{issue}</li>)}
          </ul>
        </div>
      ) : (
        <div className="quality-ok"><CheckCircle2 size={15} /> Nenhum alerta crítico de qualidade foi registrado.</div>
      )}
    </section>
  );
}
