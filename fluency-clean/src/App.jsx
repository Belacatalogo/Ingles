import { BookOpen, Brain, CalendarDays, Flame, Home, LineChart, Mic, Settings, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { BottomNav } from './components/layout/BottomNav.jsx';
import { DiagnosticPanel } from './components/system/DiagnosticPanel.jsx';
import { TodayScreen } from './screens/TodayScreen.jsx';
import { LessonScreen } from './screens/LessonScreen.jsx';
import { ProgressScreen } from './screens/ProgressScreen.jsx';
import { SpeakingScreen } from './screens/SpeakingScreen.jsx';
import { FlashcardsScreen } from './screens/FlashcardsScreen.jsx';
import { SettingsScreen } from './screens/SettingsScreen.jsx';

const tabs = [
  { id: 'today', label: 'Hoje', icon: Home, component: TodayScreen },
  { id: 'lesson', label: 'Aula', icon: BookOpen, component: LessonScreen },
  { id: 'progress', label: 'Progresso', icon: LineChart, component: ProgressScreen },
  { id: 'speaking', label: 'Speaking', icon: Mic, component: SpeakingScreen },
  { id: 'cards', label: 'Cards', icon: Brain, component: FlashcardsScreen },
  { id: 'settings', label: 'Ajustes', icon: Settings, component: SettingsScreen },
];

export function App() {
  const [activeTab, setActiveTab] = useState('today');
  const current = useMemo(() => tabs.find((tab) => tab.id === activeTab) ?? tabs[0], [activeTab]);
  const Screen = current.component;

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-mark">F</div>
        <div>
          <strong>Fluency</strong>
          <span>Clean Rewrite</span>
        </div>
        <button className="ghost-pill" type="button">
          <CalendarDays size={16} /> A1
        </button>
      </header>

      <section className="hero-card">
        <div>
          <p className="eyebrow">Bloco 1 · Interface base</p>
          <h1>Um app limpo para estudar inglês todos os dias.</h1>
          <p className="hero-text">
            Estrutura visual modular, pronta para receber Firebase, Gemini, Azure e as aulas por tipo sem remendos no bundle.
          </p>
        </div>
        <div className="hero-orb" aria-hidden="true">
          <Sparkles size={30} />
        </div>
      </section>

      <section className="status-strip">
        <div>
          <Flame size={17} />
          <span>Streak</span>
          <strong>0 dias</strong>
        </div>
        <div>
          <Sparkles size={17} />
          <span>Status</span>
          <strong>Visual limpo</strong>
        </div>
      </section>

      <Screen />

      <DiagnosticPanel />
      <BottomNav tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
    </main>
  );
}
