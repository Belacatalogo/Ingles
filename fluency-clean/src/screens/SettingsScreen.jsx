import { Bot, KeyRound, Palette, Shield, Volume2 } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';

const groups = [
  { title: 'Conta e acesso', detail: 'login, código de acesso e perfil', icon: Shield },
  { title: 'IA e aulas', detail: 'Gemini, multikeys e fallback Pro', icon: Bot },
  { title: 'Chaves de aulas', detail: 'área isolada para geração de aulas', icon: KeyRound },
  { title: 'Áudio', detail: 'TTS, iOS unlock e Azure Pronunciation', icon: Volume2 },
  { title: 'Aparência', detail: 'tema, cards, navegação e densidade', icon: Palette },
];

export function SettingsScreen() {
  return (
    <section className="screen-stack">
      <SectionHeader
        eyebrow="Ajustes"
        title="Configurações por categoria"
        description="Nada de painel perdido em aba errada. Cada configuração terá dono e lugar fixo."
      />

      <Card eyebrow="Organização" title="Áreas do sistema">
        <div className="settings-list">
          {groups.map((group) => {
            const Icon = group.icon;
            return (
              <div className="settings-row" key={group.title}>
                <div><Icon size={18} /></div>
                <span>{group.title}</span>
                <p>{group.detail}</p>
              </div>
            );
          })}
        </div>
      </Card>
    </section>
  );
}
