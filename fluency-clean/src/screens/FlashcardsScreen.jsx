import { Plus, Volume2 } from 'lucide-react';
import { useState } from 'react';

const sampleCard = {
  deck: 'Vocabulário A1',
  status: 'devido hoje',
  word: 'usually',
  ipa: '/ˈjuːʒuəli/',
  type: 'adv.',
  translation: 'geralmente',
  meaning: 'usado para falar sobre algo que acontece na maioria das vezes',
  example: 'I usually study English in the morning.',
  examplePt: 'Eu geralmente estudo inglês de manhã.',
};

const reviewButtons = [
  { label: 'De novo', time: '<1m', key: '1', tone: 'again' },
  { label: 'Difícil', time: '6m', key: '2', tone: 'hard' },
  { label: 'Bom', time: '1d', key: '3', tone: 'good' },
  { label: 'Fácil', time: '4d', key: '4', tone: 'easy' },
];

export function FlashcardsScreen() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="screen-stack reference-flashcards-screen">
      <header className="flashcards-header">
        <div>
          <h1>Flashcards</h1>
          <p>8 vencendo hoje · 142 totais</p>
        </div>
        <button type="button" aria-label="Adicionar flashcard"><Plus size={24} /></button>
      </header>

      <div className="flashcard-filter-row">
        <button className="active" type="button">Vencendo <b>8</b></button>
        <button type="button">Novas <b>3</b></button>
        <button type="button">Vocabulário A1 <b>64</b></button>
      </div>

      <div className="flashcard-session-meta">
        <span>Sessão · carta 1 de 8</span>
        <b>02:14</b>
      </div>
      <div className="flashcard-session-progress"><span style={{ width: '18%' }} /></div>

      <article className={revealed ? 'reference-flashcard revealed' : 'reference-flashcard'} onClick={() => setRevealed(true)}>
        <div className="flashcard-badges">
          <span>{sampleCard.deck}</span>
          <b>{sampleCard.status}</b>
        </div>

        <div className="flashcard-word-area">
          <small>{sampleCard.type} · {sampleCard.ipa}</small>
          <strong>{sampleCard.word}</strong>
          <button type="button" onClick={(event) => event.stopPropagation()}><Volume2 size={17} /> Ouvir</button>
        </div>

        {revealed ? (
          <div className="flashcard-answer-area">
            <span>{sampleCard.translation}</span>
            <p>{sampleCard.meaning}</p>
            <small>Exemplo</small>
            <em>“{sampleCard.example}”</em>
            <p>“{sampleCard.examplePt}”</p>
          </div>
        ) : (
          <p className="flashcard-tap-hint">Toque para ver a tradução</p>
        )}
      </article>

      {!revealed ? (
        <button className="primary-button flashcard-reveal-button" type="button" onClick={() => setRevealed(true)}>
          Mostrar resposta <span>Espaço</span>
        </button>
      ) : (
        <div className="flashcard-review-grid">
          {reviewButtons.map((item) => (
            <button className={`review-button ${item.tone}`} type="button" key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.time}</span>
              <small>{item.key}</small>
            </button>
          ))}
        </div>
      )}

      <section className="flashcard-session-stats">
        <article><strong>5</strong><span>Acertou</span></article>
        <article><strong className="wrong">1</strong><span>Errou</span></article>
        <article><strong>83%</strong><span>Precisão</span></article>
      </section>
    </section>
  );
}
