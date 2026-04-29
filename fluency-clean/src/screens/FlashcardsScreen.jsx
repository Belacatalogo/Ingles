import { Brain, CheckCircle2, Clock3, Layers3, Plus, RotateCcw, Sparkles, Volume2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { playLearningAudio } from '../services/audioPlayback.js';

const decks = [
  { id: 'due', label: 'Vencendo', count: 8 },
  { id: 'new', label: 'Novas', count: 3 },
  { id: 'voc', label: 'Vocabulário B1', count: 64 },
  { id: 'phr', label: 'Phrasal verbs', count: 38 },
  { id: 'col', label: 'Collocations', count: 32 },
];

const reviewCards = [
  {
    word: 'overwhelming',
    pos: 'adj.',
    phonetic: '/ˌoʊvərˈwelmɪŋ/',
    definition: 'avassalador; em quantidade ou intensidade tão grande que afeta emocionalmente.',
    example: 'The amount of homework was overwhelming.',
    translation: 'A quantidade de lição era avassaladora.',
    due: 'hoje',
    deck: 'Vocabulário B1',
  },
  {
    word: 'keep up with',
    pos: 'phr.',
    phonetic: '/kiːp ʌp wɪð/',
    definition: 'acompanhar o ritmo de algo ou alguém sem ficar para trás.',
    example: 'I try to keep up with my English practice every day.',
    translation: 'Eu tento acompanhar minha prática de inglês todos os dias.',
    due: 'hoje',
    deck: 'Phrasal verbs',
  },
  {
    word: 'reliable',
    pos: 'adj.',
    phonetic: '/rɪˈlaɪəbəl/',
    definition: 'confiável; algo ou alguém em que você pode confiar com consistência.',
    example: 'A reliable routine makes progress easier.',
    translation: 'Uma rotina confiável torna o progresso mais fácil.',
    due: 'hoje',
    deck: 'Collocations',
  },
];

const difficultyButtons = [
  { id: 'again', label: 'De novo', time: '<1m', tone: 'rose', keyHint: '1' },
  { id: 'hard', label: 'Difícil', time: '6m', tone: 'amber', keyHint: '2' },
  { id: 'good', label: 'Bom', time: '1d', tone: 'blue', keyHint: '3' },
  { id: 'easy', label: 'Fácil', time: '4d', tone: 'green', keyHint: '4' },
];

export function FlashcardsScreen() {
  const [activeDeck, setActiveDeck] = useState('due');
  const [flipped, setFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [sessionStats, setSessionStats] = useState({ correct: 5, missed: 1 });
  const [audioMessage, setAudioMessage] = useState('');

  const currentCard = reviewCards[cardIndex % reviewCards.length];
  const sessionPosition = (cardIndex % 8) + 1;
  const sessionProgress = Math.min(100, (sessionPosition / 8) * 100);
  const precision = useMemo(() => {
    const total = sessionStats.correct + sessionStats.missed;
    return total ? Math.round((sessionStats.correct / total) * 100) : 0;
  }, [sessionStats]);

  function handleDifficulty(tone) {
    setFlipped(false);
    setCardIndex((value) => value + 1);
    setSessionStats((stats) => {
      if (tone === 'rose') return { ...stats, missed: stats.missed + 1 };
      return { ...stats, correct: stats.correct + 1 };
    });
  }

  async function handleCardAudio(text, event) {
    event.stopPropagation();
    setAudioMessage('Preparando áudio...');
    const result = await playLearningAudio({
      text,
      label: 'Flashcards',
      voiceName: 'Kore',
      style: 'Clear dictionary-style English pronunciation. Slightly slow and easy to repeat.',
    });
    setAudioMessage(result.ok ? 'Áudio iniciado.' : result.error || 'Não foi possível reproduzir áudio.');
  }

  return (
    <section className="cards-screen" aria-label="Flashcards e revisão espaçada">
      <div className="cards-header-row">
        <div>
          <p className="cards-eyebrow">Flashcards</p>
          <h1>Cartas</h1>
          <p>8 vencendo hoje · 142 totais</p>
        </div>
        <button className="cards-icon-button" type="button" aria-label="Nova carta">
          <Plus size={18} />
        </button>
      </div>

      <div className="cards-deck-scroll" aria-label="Baralhos de revisão">
        {decks.map((deck) => (
          <button
            className={`cards-chip ${activeDeck === deck.id ? 'active' : ''}`}
            key={deck.id}
            type="button"
            onClick={() => setActiveDeck(deck.id)}
          >
            {deck.label}
            <span>{deck.count}</span>
          </button>
        ))}
      </div>

      <div className="cards-session-card">
        <div className="cards-session-topline">
          <span>Sessão · carta {sessionPosition} de 8</span>
          <strong>02:14</strong>
        </div>
        <div className="cards-progress-track" aria-label={`${Math.round(sessionProgress)}% da sessão`}>
          <span style={{ width: `${sessionProgress}%` }} />
        </div>
      </div>

      <div className="cards-flip-stage">
        <button
          className={`cards-flip-card ${flipped ? 'is-flipped' : ''}`}
          type="button"
          onClick={() => setFlipped((value) => !value)}
          aria-label={flipped ? 'Mostrar frente da carta' : 'Mostrar resposta da carta'}
        >
          <article className="cards-face cards-face-front">
            <div className="cards-face-badges">
              <span className="cards-chip active">{currentCard.deck}</span>
              <span className="cards-chip due">devido {currentCard.due}</span>
            </div>

            <div className="cards-card-center">
              <span className="cards-phonetic">{currentCard.pos} · {currentCard.phonetic}</span>
              <strong className="cards-word">{currentCard.word}</strong>
              <span className="cards-audio-pill" onClick={(event) => handleCardAudio(currentCard.word, event)} role="button" tabIndex={0}>
                <Volume2 size={14} /> Ouvir
              </span>
            </div>

            <span className="cards-tap-hint">Toque para ver a tradução</span>
          </article>

          <article className="cards-face cards-face-back">
            <span className="cards-label">Definição</span>
            <p className="cards-definition">{currentCard.definition}</p>

            <span className="cards-label">Exemplo</span>
            <blockquote>{currentCard.example}</blockquote>
            <p className="cards-translation">{currentCard.translation}</p>

            <span className="cards-audio-pill cards-audio-left" onClick={(event) => handleCardAudio(currentCard.example, event)} role="button" tabIndex={0}>
              <Volume2 size={14} /> Ouvir frase
            </span>
          </article>
        </button>
      </div>

      {audioMessage ? <p className="generator-message cards-audio-message">{audioMessage}</p> : null}

      {flipped ? (
        <div className="cards-srs-grid" aria-label="Classificar dificuldade da carta">
          {difficultyButtons.map((button) => (
            <button
              className={`cards-srs-button ${button.tone}`}
              key={button.id}
              type="button"
              onClick={() => handleDifficulty(button.tone)}
            >
              <strong>{button.label}</strong>
              <span>{button.time}</span>
              <small>{button.keyHint}</small>
            </button>
          ))}
        </div>
      ) : (
        <button className="cards-primary-action" type="button" onClick={() => setFlipped(true)}>
          Mostrar resposta
          <span>Espaço</span>
        </button>
      )}

      <section className="cards-session-stats" aria-label="Estatísticas da sessão atual">
        <div className="cards-section-title">
          <span><RotateCcw size={15} /> Esta sessão</span>
          <small>Revisão espaçada</small>
        </div>

        <div className="cards-stat-grid">
          <div className="cards-stat-card green">
            <CheckCircle2 size={17} />
            <strong>{sessionStats.correct}</strong>
            <span>Acertou</span>
          </div>
          <div className="cards-stat-card rose">
            <Brain size={17} />
            <strong>{sessionStats.missed}</strong>
            <span>Errou</span>
          </div>
          <div className="cards-stat-card blue">
            <Sparkles size={17} />
            <strong>{precision}%</strong>
            <span>Precisão</span>
          </div>
        </div>
      </section>

      <section className="cards-review-footer">
        <div>
          <Layers3 size={18} />
          <span>Próximo foco</span>
        </div>
        <strong>vocabulário das aulas recentes</strong>
        <p>Estrutura pronta para receber os cards reais salvos pelas aulas, sem mexer em lógica pesada neste bloco.</p>
        <small><Clock3 size={13} /> revisão rápida para iPhone</small>
      </section>
    </section>
  );
}
