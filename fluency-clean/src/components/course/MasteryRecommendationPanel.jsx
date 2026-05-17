import { BookOpen, CheckCircle2, Star, Target } from 'lucide-react';
import { getMasteryGateStatus } from '../../services/masteryGate.js';
import { getMasteryProfile } from '../../services/masteryStore.js';

const PILLAR_LABELS = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  reading: 'Reading',
  listening: 'Listening',
  speaking: 'Speaking',
  writing: 'Writing',
};

function PillarRow({ pillar, score, attempts }) {
  const label = PILLAR_LABELS[pillar] || pillar;
  const weak = attempts > 0 && score < 70;
  return (
    <div className={`mastery-rec-pillar${weak ? ' weak' : ''}`}>
      <span>{label}</span>
      <div className="mastery-rec-bar"><b style={{ width: `${score}%` }} /></div>
      <strong>{attempts > 0 ? `${score}%` : '—'}</strong>
    </div>
  );
}

export function MasteryRecommendationPanel({ level = 'A1' }) {
  const profile = getMasteryProfile();
  const gateStatus = getMasteryGateStatus(level);

  const activePillars = Object.entries(profile.pillars)
    .map(([pillar, data]) => ({ pillar, ...data }))
    .filter((p) => p.attempts > 0)
    .sort((a, b) => a.score - b.score);

  if (!activePillars.length) return null;

  const isReady = gateStatus.status === 'ready';
  const weakPillars = activePillars.filter((p) => p.score < 70);
  const Icon = isReady ? CheckCircle2 : weakPillars.length ? Target : Star;
  const statusClass = isReady ? 'ready' : weakPillars.length ? 'review' : 'good';

  return (
    <section className="mastery-rec-panel">
      <div className="mastery-rec-header">
        <Icon size={17} />
        <strong>Domínio por pilar — {level}</strong>
        <span className={`mastery-rec-status ${statusClass}`}>
          {isReady ? 'Pronto para avançar' : weakPillars.length ? 'Revisão recomendada' : 'Bom domínio'}
        </span>
      </div>
      <div className="mastery-rec-pillars">
        {activePillars.map(({ pillar, score, attempts }) => (
          <PillarRow key={pillar} pillar={pillar} score={score} attempts={attempts} />
        ))}
      </div>
      {gateStatus.recommendation ? (
        <p className="mastery-rec-advice">
          <BookOpen size={13} />
          {gateStatus.recommendation}
        </p>
      ) : null}
    </section>
  );
}
