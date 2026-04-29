import { Bot, KeyRound, Palette, Shield, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { GeneralAiKeysPanel } from '../components/settings/GeneralAiKeysPanel.jsx';
import { LessonKeysPanel } from '../components/settings/LessonKeysPanel.jsx';
import { Card } from '../components/ui/Card.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';

const groups = [
  { id: 'account', title: 'Conta e acesso', detail: 'login, código de acesso e perfil', icon: Shield },
  { id: 'ai', title: 'IA e aulas', detail: 'Gemini, multikeys e fallback Pro', icon: Bot },
  { id: 'lessonKeys', title: 'Chaves de aulas', detail: 'área isolada para geração de aulas', icon: KeyRound },
  { id: 'audio', title: 'Áudio', detail: 'TTS, iOS unlock e Azure Pronunciation', icon: Volume2 },
  { id: 'appearance', title: 'Aparência', detail: 'tema, cards, navegação e densidade', icon: Palette },
];

export function SettingsScreen() {
  const [activeGroup, setActiveGroup] = useState('lessonKeys');
  const [activeKeyTab, setActiveKeyTab] = useState('lesson');

  return (
    <section className="screen-stack settings-screen">
      <SectionHeader
        eyebrow="Ajustes"
        title="Configurações por categoria"
        description="Nada de painel perdido em aba errada. Cada configuração terá dono e lugar fixo."
      />

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
      ) : (
        <Card eyebrow="Em organização" title={groups.find((group) => group.id === activeGroup)?.title || 'Configuração'}>
          <div className="settings-placeholder-panel">
            <p>
              Esta categoria já tem dono definido. As opções reais serão organizadas aqui em blocos seguros, sem espalhar painéis em abas erradas.
            </p>
          </div>
        </Card>
      )}
    </section>
  );
}
