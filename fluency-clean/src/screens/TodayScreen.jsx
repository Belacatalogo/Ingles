import { Card } from '../components/ui/Card.jsx';

export function TodayScreen() {
  return (
    <section className="screen-stack">
      <Card eyebrow="Hoje" title="Seu centro de estudos diário">
        <p>
          Esta tela será a porta de entrada: aula do dia, streak, meta diária, revisão pendente e botão para gerar aula por IA.
        </p>
        <div className="metric-grid">
          <div><span>Streak</span><strong>0 dias</strong></div>
          <div><span>Nível</span><strong>A1</strong></div>
          <div><span>Meta</span><strong>1 aula</strong></div>
        </div>
      </Card>
    </section>
  );
}
