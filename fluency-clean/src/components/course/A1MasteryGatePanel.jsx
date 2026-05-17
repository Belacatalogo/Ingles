import { AlertTriangle, CheckCircle2, GraduationCap, Lock, ShieldCheck, Sparkles, Target } from 'lucide-react';
import { getA1MasteryGateSummary, markA1ProductiveSkillReviewed } from '../../services/a1MasteryGateService.js';

const pillarLabels = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  reading: 'Reading',
  listening: 'Listening',
  speaking: 'Speaking',
  writing: 'Writing',
};

function safeArray(value) { return Array.isArray(value) ? value : []; }
function humanAction(item = '') {
  return String(item)
    .replace('Concluir 100% das aulas do nível.', 'Concluir todas as aulas do A1.')
    .replace('Atingir média mínima de 80% nos checkpoints.', 'Atingir média mínima de 80% nas avaliações do A1.')
    .replace('Atingir 80% ou mais na prova final do nível.', 'Tirar 80% ou mais na prova final do A1.')
    .replace('Speaking precisa de revisão por IA/professor.', 'Speaking precisa ser revisado.')
    .replace('Writing precisa de revisão por IA/professor.', 'Writing precisa ser revisado.')
    .replace('Reforçar pilares abaixo de 75%:', 'Reforçar áreas abaixo de 75%:');
}

function ProgressLine({ label, value, target = 100 }) {
  const percent = Math.max(0, Math.min(100, Number(value || 0)));
  return (
    <div className="a1-gate-progress-line">
      <div><span>{label}</span><strong>{percent}%</strong></div>
      <i><b style={{ width: `${percent}%` }} /></i>
      <small>Meta: {target}%</small>
    </div>
  );
}

export function A1MasteryGatePanel({ onReviewUpdated }) {
  const summary = getA1MasteryGateSummary();
  const { state, readiness, gate } = summary;

  function handleMarkReviewed(skill) {
    markA1ProductiveSkillReviewed(skill, true);
    onReviewUpdated?.();
  }
  const Icon = summary.canUnlockA2 ? CheckCircle2 : summary.canTakeFinalExam ? Target : Lock;

  return (
    <section className={`a1-mastery-gate-card ${summary.canUnlockA2 ? 'unlocked' : summary.canTakeFinalExam ? 'ready' : 'locked'}`}>
      <header>
        <div className="a1-gate-title">
          <span><GraduationCap size={18} /></span>
          <div>
            <strong>Critérios para liberar o A2</strong>
            <small>Você só avança quando mostra domínio real do A1, não apenas por assistir aulas.</small>
          </div>
        </div>
        <em><Icon size={14} /> {summary.statusLabel}</em>
      </header>

      <div className="a1-gate-grid">
        <ProgressLine label="Aulas A1 concluídas" value={state.lessonCompletionPercent} target={100} />
        <ProgressLine label="Média das avaliações" value={readiness.checkpointAveragePercent} target={80} />
        <ProgressLine label="Resultado da prova final" value={gate.overall} target={80} />
      </div>

      <div className="a1-gate-status-row">
        <span className={summary.canTakeFinalExam ? 'ok' : 'warn'}>
          {summary.canTakeFinalExam ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
          {summary.canTakeFinalExam ? 'Pode fazer a prova final do A1' : 'Ainda não pode fazer a prova final do A1'}
        </span>
        <span className={summary.canUnlockA2 ? 'ok' : 'warn'}>
          {summary.canUnlockA2 ? <Sparkles size={14} /> : <Lock size={14} />}
          {summary.canUnlockA2 ? 'A2 liberado' : 'A2 bloqueado'}
        </span>
      </div>

      <div className="a1-gate-pillar-grid">
        {Object.entries(state.finalExamPillarScores).map(([pillar, score]) => {
          const weak = summary.weakPillars.includes(pillar);
          return (
            <span key={pillar} className={weak ? 'weak' : 'ok'}>
              <strong>{pillarLabels[pillar] || pillar}</strong>
              <small>{score}%</small>
            </span>
          );
        })}
      </div>

      <div className="a1-gate-review-row">
        <span className={state.speakingReviewed ? 'ok' : 'warn'}>
          <ShieldCheck size={14} /> Speaking {state.speakingReviewed ? 'revisado' : 'aguardando revisão'}
        </span>
        {!state.speakingReviewed && (
          <button type="button" className="a1-gate-review-btn" onClick={() => handleMarkReviewed('speaking')}>
            Confirmar revisão Speaking
          </button>
        )}
        <span className={state.writingReviewed ? 'ok' : 'warn'}>
          <ShieldCheck size={14} /> Writing {state.writingReviewed ? 'revisado' : 'aguardando revisão'}
        </span>
        {!state.writingReviewed && (
          <button type="button" className="a1-gate-review-btn" onClick={() => handleMarkReviewed('writing')}>
            Confirmar revisão Writing
          </button>
        )}
      </div>

      {safeArray(summary.requiredActions).length ? (
        <div className="a1-gate-actions-list">
          <strong>O que falta para liberar o A2</strong>
          <ul>{summary.requiredActions.slice(0, 6).map((item) => <li key={item}>{humanAction(item)}</li>)}</ul>
        </div>
      ) : (
        <div className="a1-gate-success"><CheckCircle2 size={16} /> Todos os critérios do A1 foram cumpridos. A2 pode ser liberado.</div>
      )}
    </section>
  );
}
