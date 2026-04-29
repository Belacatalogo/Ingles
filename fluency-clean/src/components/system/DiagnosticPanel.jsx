const checks = [
  ['Arquitetura', 'React modular'],
  ['Main antiga', 'intacta'],
  ['Backend Azure', 'não alterado'],
  ['Próximo bloco', 'visual + Reading'],
];

export function DiagnosticPanel() {
  return (
    <aside className="diagnostic-panel">
      <div className="diagnostic-header">
        <span className="pulse-dot" />
        <strong>Diagnóstico limpo</strong>
      </div>
      <div className="diagnostic-list">
        {checks.map(([label, value]) => (
          <div className="diagnostic-row" key={label}>
            <span>{label}</span>
            <b>{value}</b>
          </div>
        ))}
      </div>
    </aside>
  );
}
