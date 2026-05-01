import { AlertTriangle, CheckCircle2, ClipboardCheck, GraduationCap, ShieldCheck, Sparkles, Target, Zap } from 'lucide-react';

function clampScore(value) {
  const score = Number(value || 0);
  return Math.max(0, Math.min(100, Math.round(score)));
}

function scoreLabel(score) {
  if (score >= 92) return 'Excelente';
  if (score >= 86) return 'Muito boa';
  if (score >= 82) return 'Aprovada';
  if (score >= 72) return 'Precisa atenção';
  return 'Fraca';
}

function scoreClass(score) {
  if (score >= 92) return 'excellent';
  if (score >= 82) return 'approved';
  if (score >= 72) return 'warning';
  return 'danger';
}

function uniqueIssues(items = [], limit = 5) {
  return Array.from(new Set(items.filter(Boolean))).slice(0, limit);
}

function formatPercent(value) {
  const score = clampScore(value);
  return score ? `${score}%` : '—';
}

function getConfidenceLabel(score, approved, issuesLength) {
  if (!approved) return 'não confiar sem revisar';
  if (score >= 92 && issuesLength === 0) return 'alta confiança';
  if (score >= 86) return 'boa confiança';
  return 'confiança moderada';
}

function getRiskLabel(teacher = {}, quality = {}) {
  const antiIllusion = clampScore(teacher.antiIllusion || quality.antiIllusion || 0);
  if (!antiIllusion) return 'não medido';
  if (antiIllusion >= 88) return 'baixo';
  if (antiIllusion >= 76) return 'médio';
  return 'alto';
}

function getPlanScenario(lesson) {
  const plan = lesson?.lessonPlan || {};
  return plan.scenario || plan.topic || 'não informado';
}

function getContract(meta = {}, lesson = {}) {
  return meta.contractVersion || lesson.planContract || lesson.quality?.contractVersion || 'sem contrato antigo';
}

function countArray(value) {
  return Array.isArray(value) ? value.length : 0;
}

function buildFallbackReviewedAreas(lesson = {}) {
  const sections = countArray(lesson.sections);
  const vocabulary = countArray(lesson.vocabulary);
  const exercises = countArray(lesson.exercises);
  const prompts = countArray(lesson.prompts);
  const hasText = Boolean(lesson.listeningText || lesson.intro || lesson.objective);
  return {
    text: { label: 'Texto da aula', reviewed: hasText, status: hasText ? 'analisado' : 'não encontrado', detail: 'introdução, objetivo e texto/transcrição.' },
    concept: { label: 'Conceito e explicação', reviewed: sections > 0, status: sections ? `${sections} parte(s)` : 'não encontrado', detail: 'seções explicativas da aula.' },
    vocabulary: { label: 'Vocabulário', reviewed: vocabulary > 0, status: vocabulary ? `${vocabulary} palavra(s)` : 'não encontrado', detail: 'palavras-chave, significados e exemplos.' },
    deepPractice: { label: 'Prática profunda', reviewed: exercises > 0, status: exercises ? `${exercises} questão(ões)` : 'não encontrado', detail: 'exercícios usados pela prática profunda.' },
    shadowing: { label: 'Shadowing', reviewed: prompts > 0, status: prompts ? `${prompts} prompt(s)` : 'não encontrado', detail: 'prompts de fala, repetição ou produção oral.' },
    finalProduction: { label: 'Produção final', reviewed: prompts > 0 || exercises > 0, status: prompts ? `${prompts} comando(s)` : exercises ? 'via exercícios abertos' : 'não encontrado', detail: 'produção própria para provar domínio.' },
  };
}

function getReviewedAreas(lesson = {}, teacher = {}, quality = {}) {
  return teacher.reviewedAreas || quality.reviewedAreas || lesson.reviewedAreas || buildFallbackReviewedAreas(lesson);
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
  const confidence = getConfidenceLabel(finalScore, approved, issues.length);
  const falseMasteryRisk = getRiskLabel(teacher, quality);
  const contract = getContract(meta, lesson);
  const repaired = Boolean(meta.autoRepaired || pedagogical.autoRepaired || pedagogical.teacherRepair);
  const reviewedAreas = getReviewedAreas(lesson, teacher, quality);
  const reviewedAreaList = Object.entries(reviewedAreas).map(([key, area]) => ({ key, ...area }));

  const dimensions = [
    { label: 'Coerência', value: teacher.coherence, hint: 'objetivo, cenário e conteúdo' },
    { label: 'Profundidade', value: teacher.depth, hint: 'explicação, vocabulário e produção' },
    { label: 'Exercícios úteis', value: teacher.exerciseUsefulness, hint: 'prática que treina de verdade' },
    { label: 'Alinhamento', value: teacher.skillAlignment, hint: 'tipo da aula correto' },
    { label: 'Anti-ilusão', value: teacher.antiIllusion, hint: 'menos falso domínio' },
    { label: 'Nível seguro', value: teacher.levelSafety, hint: 'adequado ao nível atual' },
  ].filter((item) => Number(item.value || 0) > 0);

  return (
    <section className={`lesson-quality-panel ${scoreType}`}>
      <div className="lesson-quality-header">
        <div>
          <span className="quality-eyebrow"><ShieldCheck size={13} /> Qualidade visível</span>
          <h2>{scoreLabel(finalScore)} · {finalScore}/100</h2>
          <p>{approved ? `Esta aula tem ${confidence} para estudo. Ela passou por plano, rubrica e professor revisor quando disponíveis.` : 'Esta aula tem alertas e não deveria ser usada sem revisão.'}</p>
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
          <strong>{repaired ? 'sim' : 'não'}</strong>
        </div>
        <div className="quality-card">
          <Target size={16} />
          <span>Risco falso domínio</span>
          <strong>{falseMasteryRisk}</strong>
        </div>
        <div className="quality-card">
          <Zap size={16} />
          <span>Contrato</span>
          <strong>{contract}</strong>
        </div>
      </div>

      <div className="quality-reviewed-areas">
        <span><GraduationCap size={14} /> Professor analisou</span>
        <div>
          {reviewedAreaList.map((area) => (
            <article key={area.key} className={area.reviewed ? 'reviewed' : 'missing'}>
              {area.reviewed ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
              <strong>{area.label}</strong>
              <small>{area.status}</small>
              <p>{area.detail}</p>
            </article>
          ))}
        </div>
      </div>

      {hasPlan ? (
        <div className="quality-plan-box">
          <span><Sparkles size={14} /> Plano usado</span>
          <p>{getPlanScenario(lesson)}</p>
        </div>
      ) : null}

      {dimensions.length ? (
        <div className="quality-dimensions">
          {dimensions.map((item) => (
            <div key={item.label}>
              <div><span>{item.label}</span><strong>{formatPercent(item.value)}</strong></div>
              <i><b style={{ width: `${clampScore(item.value)}%` }} /></i>
              <small>{item.hint}</small>
            </div>
          ))}
        </div>
      ) : null}

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
