import {
  Bell,
  Bot,
  CheckCircle2,
  Clock3,
  Database,
  Flag,
  Info,
  KeyRound,
  Palette,
  Play,
  Shield,
  Target,
  UserRound,
  Volume2,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { GeneralAiKeysPanel } from '../components/settings/GeneralAiKeysPanel.jsx';
import { Card } from '../components/ui/Card.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { getCurrentLesson } from '../services/lessonStore.js';
import { getCurrentWeekStats, getProgressSummary, getUserDisplayName, setUserDisplayName } from '../services/progressStore.js';
import { storage } from '../services/storage.js';

const groups = [
  { id: 'account', title: 'Conta e acesso', detail: 'login, código de acesso e perfil', icon: Shield },
  { id: 'study', title: 'Plano de estudos', detail: 'meta diária, nível e foco semanal', icon: Target },
  { id: 'lessonKeys', title: 'Chaves gerais de IA', detail: 'tutor, correção, speaking e revisão', icon: KeyRound },
  { id: 'audio', title: 'Áudio', detail: 'TTS, iOS unlock e Azure Pronunciation', icon: Volume2 },
  { id: 'appearance', title: 'Aparência', detail: 'tema, cards, navegação e densidade', icon: Palette },
  { id: 'data', title: 'Dados', detail: 'histórico, cache e diagnóstico', icon: Database },
];

function SettingsRow({ icon: Icon, label, value, tone = 'default' }) {
  return (
    <div className="settings-info-row">
      <div className="settings-info-main">
        <Icon size={15} />
        <span>{label}</span>
      </div>
      <strong className={`settings-info-value ${tone}`}>{value}</strong>
    </div>
  );
}

function SettingsToggle({ icon: Icon, label, value, onChange }) {
  return (
    <button className="settings-toggle-row" type="button" onClick={() => onChange(!value)}>
      <div className="settings-info-main">
        <Icon size={15} />
        <span>{label}</span>
      </div>
      <span className={`settings-toggle ${value ? 'on' : ''}`} aria-hidden="true" />
    </button>
  );
}

const PREFS_KEY = 'settings.preferences';

function loadPrefs() {
  return storage.get(PREFS_KEY, {});
}

function savePref(key, value) {
  storage.set(PREFS_KEY, { ...loadPrefs(), [key]: value });
}

export function SettingsScreen() {
  const [activeGroup, setActiveGroup] = useState('account');
  const [dailyReminder, setDailyReminder] = useState(() => Boolean(loadPrefs().dailyReminder));
  const [autoplayAudio, setAutoplayAudio] = useState(() => Boolean(loadPrefs().autoplayAudio));
  const [compactMode, setCompactMode] = useState(() => Boolean(loadPrefs().compactMode));
  const [displayName, setDisplayName] = useState(() => getUserDisplayName());
  const [nameSaved, setNameSaved] = useState(false);
  const progress = getProgressSummary();
  const week = getCurrentWeekStats();
  const currentLesson = getCurrentLesson();

  function handleSaveName() {
    const trimmed = displayName.trim();
    if (!trimmed) return;
    setUserDisplayName(trimmed);
    setNameSaved(true);
    setTimeout(() => setNameSaved(false), 2000);
  }

  return (
    <section className="screen-stack settings-screen">
      <SectionHeader
        eyebrow="Ajustes"
        title="Configurações por categoria"
        description="Cada configuração tem dono, lugar fixo e organização clara."
      />

      <section className="settings-profile-card">
        <div className="settings-avatar">{displayName?.charAt(0)?.toUpperCase() || 'F'}</div>
        <div>
          <strong>Fluency</strong>
          <span>{progress.completedLessons || 0} aula(s) concluída(s) · {progress.xp || 0} XP</span>
        </div>
        <div className="settings-profile-badge">
          <CheckCircle2 size={14} /> local
        </div>
      </section>

      <Card eyebrow="Organização" title="Áreas do sistema">
        <div className="settings-list settings-category-list">
          {groups.map((group) => {
            const Icon = group.icon;
            return (
              <button
                className={`settings-row settings-category-row ${activeGroup === group.id ? 'active' : ''}`}
                key={group.id}
                type="button"
                onClick={() => setActiveGroup(group.id)}
              >
                <div><Icon size={18} /></div>
                <span>{group.title}</span>
                <p>{group.detail}</p>
              </button>
            );
          })}
        </div>
      </Card>

      {activeGroup === 'account' ? (
        <Card eyebrow="Conta" title="Acesso e perfil">
          <div className="settings-info-card">
            <SettingsRow icon={UserRound} label="Perfil" value="gerenciado pelo login" tone="blue" />
            <SettingsRow icon={Shield} label="Código de acesso" value="verificado no gate" tone="blue" />
            <SettingsRow icon={Info} label="Sessão local" value={progress.lastStudyDate ? `último estudo ${progress.lastStudyDate}` : 'sem estudo registrado'} />
          </div>
          <div className="settings-name-form">
            <label htmlFor="settings-display-name">Seu nome (exibido na saudação)</label>
            <div className="settings-name-row">
              <input
                id="settings-display-name"
                type="text"
                value={displayName}
                maxLength={32}
                placeholder="Como quer ser chamado?"
                onChange={(e) => { setDisplayName(e.target.value); setNameSaved(false); }}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
              />
              <button
                className={`settings-name-save${nameSaved ? ' saved' : ''}`}
                type="button"
                onClick={handleSaveName}
                disabled={!displayName.trim()}
              >
                {nameSaved ? 'Salvo ✓' : 'Salvar'}
              </button>
            </div>
          </div>
        </Card>
      ) : null}

      {activeGroup === 'study' ? (
        <Card eyebrow="Rotina" title="Plano de estudos">
          <div className="settings-info-card">
            <SettingsRow icon={Target} label="Meta diária" value="1 aula" tone="violet" />
            <SettingsRow icon={Clock3} label="Semana atual" value={`${week.completed || 0} aula(s) · ${week.xp || 0} XP`} />
            <SettingsRow icon={Flag} label="Aula atual" value={currentLesson?.level ? `${currentLesson.level} · ${currentLesson.type}` : 'nenhuma aula gerada'} tone="violet" />
            <SettingsRow icon={Zap} label="Foco atual" value={currentLesson?.type || 'gerar aula'} tone="teal" />
          </div>
        </Card>
      ) : null}

      {activeGroup === 'lessonKeys' ? (
        <Card eyebrow="Chaves" title="Chaves gerais de IA">
          <GeneralAiKeysPanel />
        </Card>
      ) : null}

      {activeGroup === 'audio' ? (
        <Card eyebrow="Som" title="Áudio e pronúncia">
          <div className="settings-info-card">
            <SettingsRow icon={Volume2} label="Voz padrão" value="Gemini natural quando disponível" tone="blue" />
            <SettingsRow icon={Bot} label="Pronúncia" value="Azure Speech real" tone="green" />
            <SettingsToggle icon={Play} label="Autoplay de áudio" value={autoplayAudio} onChange={(v) => { setAutoplayAudio(v); savePref('autoplayAudio', v); }} />
          </div>
        </Card>
      ) : null}

      {activeGroup === 'appearance' ? (
        <Card eyebrow="Visual" title="Aparência">
          <div className="settings-info-card">
            <SettingsRow icon={Palette} label="Tema" value="escuro" tone="violet" />
            <SettingsRow icon={Info} label="Navegação" value="barra inferior" />
            <SettingsToggle icon={Zap} label="Modo compacto" value={compactMode} onChange={(v) => { setCompactMode(v); savePref('compactMode', v); }} />
          </div>
        </Card>
      ) : null}

      {activeGroup === 'data' ? (
        <Card eyebrow="Sistema" title="Dados e diagnóstico">
          <div className="settings-info-card">
            <SettingsToggle icon={Bell} label="Lembretes diários" value={dailyReminder} onChange={(v) => { setDailyReminder(v); savePref('dailyReminder', v); }} />
            <SettingsRow icon={Database} label="Histórico" value={`${progress.completedLessons || 0} aula(s) local/sync`} tone="blue" />
            <SettingsRow icon={Info} label="Diagnóstico" value="botão lateral" />
          </div>
        </Card>
      ) : null}

      <section className="settings-about-card">
        <div className="reference-brand-dot" aria-hidden="true" />
        <strong>Fluency</strong>
        <span>Seu app de inglês diário</span>
      </section>
    </section>
  );
}
