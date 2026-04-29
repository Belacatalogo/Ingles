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
import { LessonKeysPanel } from '../components/settings/LessonKeysPanel.jsx';
import { Card } from '../components/ui/Card.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';

const groups = [
  { id: 'account', title: 'Conta e acesso', detail: 'login, código de acesso e perfil', icon: Shield },
  { id: 'study', title: 'Plano de estudos', detail: 'meta diária, nível e foco semanal', icon: Target },
  { id: 'lessonKeys', title: 'Chaves de aulas', detail: 'aulas e IA geral separadas', icon: KeyRound },
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

export function SettingsScreen() {
  const [activeGroup, setActiveGroup] = useState('lessonKeys');
  const [activeKeyTab, setActiveKeyTab] = useState('lesson');
  const [dailyReminder, setDailyReminder] = useState(true);
  const [autoplayAudio, setAutoplayAudio] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const activeTitle = groups.find((group) => group.id === activeGroup)?.title || 'Configuração';

  return (
    <section className="screen-stack settings-screen">
      <SectionHeader
        eyebrow="Ajustes"
        title="Configurações por categoria"
        description="Nada de painel perdido em aba errada. Cada configuração terá dono e lugar fixo."
      />

      <section className="settings-profile-card">
        <div className="settings-avatar">L</div>
        <div>
          <strong>Luis</strong>
          <span>A1 · Fluency Clean Lab</span>
        </div>
        <div className="settings-profile-badge">
          <CheckCircle2 size={14} /> ativo
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
            <SettingsRow icon={UserRound} label="Perfil local" value="ativo" tone="green" />
            <SettingsRow icon={Shield} label="Código de acesso" value="protegido" tone="blue" />
            <SettingsRow icon={Info} label="Sessão no preview" value="Vercel lab" />
          </div>
        </Card>
      ) : null}

      {activeGroup === 'study' ? (
        <Card eyebrow="Rotina" title="Plano de estudos">
          <div className="settings-info-card">
            <SettingsRow icon={Target} label="Meta diária" value="1 aula" tone="violet" />
            <SettingsRow icon={Clock3} label="Lembrete diário" value="19:30" />
            <SettingsRow icon={Flag} label="Nível atual" value="A1 → A2" tone="violet" />
            <SettingsRow icon={Zap} label="Foco da semana" value="Speaking" tone="teal" />
          </div>
        </Card>
      ) : null}

      {activeGroup === 'lessonKeys' ? (
        <Card eyebrow="Chaves" title="IA separada por função">
          <div className="settings-key-tabs" aria-label="Tipo de chave">
            <button
              className={activeKeyTab === 'lesson' ? 'active' : ''}
              type="button"
              onClick={() => setActiveKeyTab('lesson')}
            >
              Chaves de aulas
            </button>
            <button
              className={activeKeyTab === 'general' ? 'active' : ''}
              type="button"
              onClick={() => setActiveKeyTab('general')}
            >
              IA geral
            </button>
          </div>

          <div className="settings-key-panel-wrap">
            {activeKeyTab === 'lesson' ? <LessonKeysPanel /> : <GeneralAiKeysPanel />}
          </div>
        </Card>
      ) : null}

      {activeGroup === 'audio' ? (
        <Card eyebrow="Som" title="Áudio e pronúncia">
          <div className="settings-info-card">
            <SettingsRow icon={Volume2} label="Voz padrão" value="natural" tone="blue" />
            <SettingsRow icon={Bot} label="Pronúncia" value="Azure" tone="green" />
            <SettingsToggle icon={Play} label="Autoplay de áudio" value={autoplayAudio} onChange={setAutoplayAudio} />
          </div>
        </Card>
      ) : null}

      {activeGroup === 'appearance' ? (
        <Card eyebrow="Visual" title="Aparência">
          <div className="settings-info-card">
            <SettingsRow icon={Palette} label="Tema" value="premium escuro" tone="violet" />
            <SettingsRow icon={Info} label="Navegação" value="flutuante" />
            <SettingsToggle icon={Zap} label="Modo compacto" value={compactMode} onChange={setCompactMode} />
          </div>
        </Card>
      ) : null}

      {activeGroup === 'data' ? (
        <Card eyebrow="Sistema" title="Dados e diagnóstico">
          <div className="settings-info-card">
            <SettingsToggle icon={Bell} label="Lembretes diários" value={dailyReminder} onChange={setDailyReminder} />
            <SettingsRow icon={Database} label="Histórico" value="local" tone="blue" />
            <SettingsRow icon={Info} label="Diagnóstico" value="botão lateral" />
          </div>
        </Card>
      ) : null}

      <section className="settings-about-card">
        <div className="reference-brand-dot" aria-hidden="true" />
        <strong>Fluency</strong>
        <span>rewrite-clean-lab · ajustes organizados</span>
      </section>
    </section>
  );
}
