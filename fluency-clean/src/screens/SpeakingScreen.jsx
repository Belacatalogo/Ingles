import { Mic, Radio, ShieldCheck, Waves } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { StatCard } from '../components/ui/StatCard.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';

export function SpeakingScreen() {
  return (
    <section className="screen-stack">
      <SectionHeader
        eyebrow="Speaking"
        title="Prática oral com feedback confiável"
        description="A interface já separa gravação, análise e diagnóstico. No bloco de áudio, o Azure será ligado sem mexer no backend privado."
      />

      <div className="stats-grid">
        <StatCard label="Modo" value="Azure" hint="backend preservado" icon={ShieldCheck} />
        <StatCard label="Sessão" value="0 min" hint="aguardando mic" icon={Mic} />
        <StatCard label="Score" value="—" hint="sem análise ainda" icon={Waves} />
      </div>

      <Card eyebrow="Gravação" title="Leia e grave sua resposta">
        <div className="speaking-prompt">
          <p>“I usually study English in the morning because I feel focused and calm.”</p>
        </div>
        <button className="record-button" type="button"><Radio size={18} /> Iniciar gravação</button>
      </Card>

      <Card eyebrow="Diagnóstico" title="Resultado da pronúncia">
        <div className="score-preview">
          <span>Precisão</span>
          <strong>—</strong>
          <p>Quando a integração for migrada, esta área mostrará precisão, fluência, palavras problemáticas e recomendações.</p>
        </div>
      </Card>
    </section>
  );
}
