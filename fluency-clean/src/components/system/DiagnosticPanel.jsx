import { useDiagnostics } from '../../hooks/useDiagnostics.js';

export function DiagnosticPanel() {
  const diagnostics = useDiagnostics();
  const latestLogs = diagnostics.logs.slice(-6).reverse();

  return (
    <aside className="diagnostic-panel">
      <div className="diagnostic-header">
        <span className={diagnostics.status === 'error' ? 'pulse-dot error' : 'pulse-dot'} />
        <strong>Diagnóstico limpo</strong>
      </div>
      <div className="diagnostic-list">
        <div className="diagnostic-row">
          <span>Status</span>
          <b>{diagnostics.status}</b>
        </div>
        <div className="diagnostic-row">
          <span>Fase</span>
          <b>{diagnostics.phase}</b>
        </div>
        <div className="diagnostic-row">
          <span>Último erro</span>
          <b>{diagnostics.lastError || '—'}</b>
        </div>
      </div>

      <div className="diagnostic-log-list">
        {latestLogs.length ? latestLogs.map((log) => (
          <div className={`diagnostic-log ${log.type}`} key={log.id}>
            <span>{new Date(log.at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
            <p>{log.message}</p>
          </div>
        )) : <p className="empty-note">Nenhum log ainda.</p>}
      </div>
    </aside>
  );
}
