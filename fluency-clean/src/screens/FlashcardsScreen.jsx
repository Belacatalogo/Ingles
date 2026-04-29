import { Brain, Layers3, RotateCcw } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { StatCard } from '../components/ui/StatCard.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';

const sampleCards = [
  { front: 'usually', back: 'geralmente' },
  { front: 'focused', back: 'concentrado' },
  { front: 'calm', back: 'calmo' },
];

export function FlashcardsScreen() {
  return (
    <section className="screen-stack">
      <SectionHeader
        eyebrow="Flashcards"
        title="Revisão inteligente e limpa"
        description="Vocabulário das aulas será salvo aqui com revisão espaçada, sem depender de listas soltas no bundle."
      />

      <div className="stats-grid">
        <StatCard label="Cards" value="0" hint="salvos" icon={Layers3} />
        <StatCard label="Revisão" value="0" hint="pendentes" icon={RotateCcw} />
        <StatCard label="Memória" value="—" hint="em breve" icon={Brain} />
      </div>

      <Card eyebrow="Prévia" title="Vocabulário da aula">
        <div className="flashcard-list">
          {sampleCards.map((card) => (
            <div className="flashcard-row" key={card.front}>
              <strong>{card.front}</strong>
              <span>{card.back}</span>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
