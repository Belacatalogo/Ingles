import { BookOpen, Brain, CheckCircle2, Clock3, Flame, Sparkles } from 'lucide-react';
import { LessonGeneratorPanel } from '../components/lesson/LessonGeneratorPanel.jsx';
import { Card } from '../components/ui/Card.jsx';
import { StatCard } from '../components/ui/StatCard.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';

const routine = [
  { label: 'Aula do dia', status: 'Reading A1', icon: BookOpen },
  { label: 'Revisão', status: '12 cards', icon: Brain },
  { label: 'Speaking', status: '5 minutos', icon: Sparkles },
];

export function TodayScreen() {
  return (
    <section className="screen-stack">
      <SectionHeader
        eyebrow="Hoje"
        title="Seu centro de estudos diário"
        description="Um painel simples para saber exatamente o que estudar, revisar e praticar sem se perder nas abas."
      />

      <div className="stats-grid">
        <StatCard label="Sequência" value="0 dias" hint="será ligado ao progresso" icon={Flame} />
        <StatCard label="Nível atual" value="A1" hint="base inicial" icon={CheckCircle2} />
        <StatCard label="Tempo hoje" value="0 min" hint="aguardando integração" icon={Clock3} />
      </div>

      <LessonGeneratorPanel />

      <Card eyebrow="Roteiro" title="Plano recomendado para hoje">
        <div className="routine-list">
          {routine.map((item) => {
            const Icon = item.icon;
            return (
              <div className="routine-item" key={item.label}>
                <div><Icon size={19} /></div>
                <span>{item.label}</span>
                <strong>{item.status}</strong>
              </div>
            );
          })}
        </div>
        <button className="primary-button" type="button">Começar rotina</button>
      </Card>
    </section>
  );
}
