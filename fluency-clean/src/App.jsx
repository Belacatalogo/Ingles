import { Activity, BookOpen, Brain, Flame, Home, LineChart, Mic, Settings, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { AccessGate } from './components/auth/AccessGate.jsx';
import { BottomNav } from './components/layout/BottomNav.jsx';
import { DiagnosticPanel } from './components/system/DiagnosticPanel.jsx';
import { TodayScreen } from './screens/TodayScreen.jsx';
import { LessonScreen } from './screens/LessonScreen.jsx';
import { ProgressScreen } from './screens/ProgressScreen.jsx';
import { SpeakingScreen } from './screens/SpeakingScreen.jsx';
import { FlashcardsScreen } from './screens/FlashcardsScreen.jsx';
import { SettingsScreen } from './screens/SettingsScreen.jsx';
import { getProgressSummary } from './services/progressStore.js';

const tabs = [
  { id: 'today', label: 'Hoje', icon: Home, component: TodayScreen },
  { id: 'lesson', label: 'Aula', icon: BookOpen, component: LessonScreen },
  { id: 'cards', label: 'Cartas', icon: Brain, component: FlashcardsScreen },
  { id: 'speaking', label: 'Speaking', icon: Mic, component: SpeakingScreen },
  { id: 'progress', label: 'Progresso', icon: LineChart, component: ProgressScreen },
  { id: 'settings', label: 'Ajustes', icon: Settings, component: SettingsScreen },
];

function AppContent() {
  const [activeTab, setActiveTab] = useState('today');
  const [lessonRevision, setLessonRevision] = useState(0);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const current = useMemo(() => tabs.find((tab) => tab.id === activeTab) ?? tabs[0], [activeTab]);
  const progress = useMemo(() => getProgressSummary(), [lessonRevision, activeTab]);
  const Screen = current.component;

  useEffect(() => {
    function handleLessonUpdated() {
      setLessonRevision((value) => value + 1);
    }

    window.addEventListener('fluency:lesson-updated', handleLessonUpdated);
    return () => window.removeEventListener('fluency:lesson-updated', handleLessonUpdated);
  }, []);

  function handleLessonGenerated() {
    setLessonRevision((value) => value + 1);
    setActiveTab('lesson');
  }

  return (
    <main className="app-shell fluency-reference-shell">
      <header className="topbar reference-topbar">
        <div className="reference-brand-dot" aria-hidden="true" />
        <div className="reference-brand-text">
          <strong>Fluency</strong>
        </div>
        <div className="reference-top-actions">
          <button className="reference-pill level-pill" type="button">
            <span /> A1
          </button>
          <button className="reference-pill streak-pill" type="button">
            <Flame size={15} /> {progress.streakDays || 0}
          </button>
          <button className="reference-settings-button" type="button" onClick={() => setActiveTab('settings')} aria-label="Ajustes">
            <Settings size={21} />
          </button>
        </div>
      </header>

      <Screen
        onNavigate={setActiveTab}
        onLessonGenerated={handleLessonGenerated}
        lessonRevision={lessonRevision}
      />

      <button
        className="diagnostic-mini-button"
        type="button"
        onClick={() => setShowDiagnostics(true)}
        aria-label="Abrir diagnóstico"
      >
        <Activity size={17} />
      </button>

      {showDiagnostics ? (
        <div className="diagnostic-overlay" role="dialog" aria-label="Diagnóstico" aria-modal="true">
          <button className="diagnostic-backdrop" type="button" onClick={() => setShowDiagnostics(false)} aria-label="Fechar diagnóstico" />
          <section className="diagnostic-sheet">
            <div className="diagnostic-sheet-header">
              <strong>Diagnóstico</strong>
              <button type="button" onClick={() => setShowDiagnostics(false)} aria-label="Fechar diagnóstico">
                <X size={18} />
              </button>
            </div>
            <DiagnosticPanel />
          </section>
        </div>
      ) : null}

      <BottomNav tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
    </main>
  );
}

export function App() {
  return (
    <AccessGate>
      <AppContent />
    </AccessGate>
  );
}
