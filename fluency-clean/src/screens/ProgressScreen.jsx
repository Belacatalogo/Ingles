import { Award, BookOpenCheck, Flame, TrendingUp } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { StatCard } from '../components/ui/StatCard.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';

export function ProgressScreen() {
  return (
    <section className="screen-stack">
      <SectionHeader
        eyebrow="Progresso"
        title="Evolução visível e organizada"
        description="Esta aba será o lugar certo para XP, streak, nível CEFR, histórico de aulas e chaves exclusivas de aulas."
      />

      <div className="stats-grid">
        <StatCard label="XP total" value="0" hint="pendente integração" icon={Award} />
        <StatCard label="Aulas" value="0/5" hint="semana atual" icon={BookOpenCheck} />
        <StatCard label="Streak" value="0 dias" hint="segunda a sexta" icon={Flame} />
      </div>

      <Card eyebrow="Mapa CEFR" title="A1 → C2">
        <div className="level-track">
          {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((level, index) => (
            <div className={index === 0 ? 'level-node active' : 'level-node'} key={level}>
              <span>{level}</span>
            </div>
          ))}
        </div>
        <div className="progress-line"><span style={{ width: '8%' }} /></div>
      </Card>

      <Card eyebrow="Tendência" title="Resumo semanal">
        <div className="empty-state compact">
          <TrendingUp size={22} />
          <p>Quando a migração do storage for feita, esta área mostrará tempo estudado, aulas concluídas e pontos fracos.</p>
        </div>
      </Card>
    </section>
  );
}
