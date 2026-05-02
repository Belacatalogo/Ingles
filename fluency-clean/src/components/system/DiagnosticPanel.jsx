import { useMemo, useState } from 'react';
import { CheckCircle2, Cloud, RefreshCw, ShieldAlert, TriangleAlert } from 'lucide-react';
import { useDiagnostics } from '../../hooks/useDiagnostics.js';
import { getSystemHealthChecklist, logSystemHealth } from '../../services/systemHealth.js';
import { getLessonStorageDebugSnapshot } from '../../services/lessonStorageDebug.js';

function statusIcon(status) {
  if (status === 'ok') return <CheckCircle2 size={14} />;
  if (status === 'error') return <ShieldAlert size={14} />;
  return <TriangleAlert size={14} />;
}

function DebugRow({ label, value }) {
  return <div className="diagnostic-row"><span>{label}</span><b>{value || '—'}</b></div>;
}

export function DiagnosticPanel() {
  const diagnostics = useDiagnostics();
  const [refreshKey, setRefreshKey] = useState(0);
  const latestLogs = diagnostics.logs.slice(-6).reverse();
  const health = useMemo(() => getSystemHealthChecklist(), [diagnostics.status, diagnostics.phase, diagnostics.logs.length, refreshKey]);
  const lessonDebug = useMemo(() => getLessonStorageDebugSnapshot(), [refreshKey, diagnostics.logs.length, diagnostics.phase]);

  function handleRunChecklist() {
    logSystemHealth();
    setRefreshKey((value) => value + 1);
  }

  return (
    <aside className="diagnostic-panel">
      <div className="diagnostic-header">
        <span className={diagnostics.status === 'error' ? 'pulse-dot error' : health.status === 'warn' ? 'pulse-dot warn' : 'pulse-dot'} />
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

      <section className="health-check-card">
        <header>
          <div>
            <Cloud size={15} />
            <strong>Aula no storage</strong>
          </div>
          <button type="button" onClick={() => setRefreshKey((value) => value + 1)}>
            <RefreshCw size={13} /> Atualizar
          </button>
        </header>
        <div className="diagnostic-list">
          <DebugRow label="Atual" value={lessonDebug.current.title} />
          <DebugRow label="Atual gen" value={lessonDebug.current.generationId} />
          <DebugRow label="Histórico 0" value={lessonDebug.history0.title} />
          <DebugRow label="Histórico 0 gen" value={lessonDebug.history0.generationId} />
          <DebugRow label="Status título" value={lessonDebug.status.title} />
          <DebugRow label="Status gen" value={lessonDebug.status.generationId} />
          <DebugRow label="Histórico total" value={lessonDebug.counts.history} />
        </div>
      </section>

      <section className="health-check-card">
        <header>
          <div>
            <Cloud size={15} />
            <strong>Checklist LAB-8</strong>
          </div>
          <button type="button" onClick={handleRunChecklist}>
            <RefreshCw size={13} /> Verificar
          </button>
        </header>
        <div className="health-check-list">
          {health.checks.map((check) => (
            <article className={`health-check-row ${check.status}`} key={check.id}>
              <span>{statusIcon(check.status)}</span>
              <div>
                <strong>{check.label}</strong>
                <small>{check.detail || '—'}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

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
