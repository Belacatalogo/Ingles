export function ProgressPill({ current = 1, total = 1, label = 'Etapa' }) {
  const safeTotal = Math.max(Number(total) || 1, 1);
  const safeCurrent = Math.min(Math.max(Number(current) || 1, 1), safeTotal);
  const percent = Math.round((safeCurrent / safeTotal) * 100);

  return (
    <div className="progress-pill" aria-label={`${label} ${safeCurrent} de ${safeTotal}`}>
      <div>
        <span>{label}</span>
        <strong>{safeCurrent}/{safeTotal}</strong>
      </div>
      <div className="progress-pill-track"><span style={{ width: `${percent}%` }} /></div>
    </div>
  );
}
