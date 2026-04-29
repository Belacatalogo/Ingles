export function BottomNav({ tabs, activeTab, onChange }) {
  return (
    <nav className="bottom-nav reference-bottom-nav" aria-label="Navegação principal">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            className={active ? 'nav-item active' : 'nav-item'}
            onClick={() => onChange(tab.id)}
            aria-label={tab.label}
          >
            <Icon size={21} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
