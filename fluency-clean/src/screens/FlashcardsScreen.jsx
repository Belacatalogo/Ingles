import { Award, Brain, CheckCircle2, Clock3, Layers3, RotateCcw, Volume2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { playLearningAudio } from '../services/audioPlayback.js';
import { getCurrentLesson } from '../services/lessonStore.js';
import { recordFlashcardSession } from '../services/progressStore.js';

function normalizeVocabularyItem(item, index) {
  if (typeof item === 'string') {
    return {
      word: item,
      pos: '',
      phonetic: '',
      definition: 'Vocabulário extraído da aula atual.',
      example: '',
      translation: '',
      due: 'aula atual',
      deck: 'Aula atual',
      id: `${item}-${index}`,
    };
  }

  return {
    word: item?.word || item?.term || item?.expression || `Card ${index + 1}`,
    pos: item?.pos || item?.partOfSpeech || '',
    phonetic: item?.phonetic || item?.ipa || '',
    definition: item?.definition || item?.meaning || item?.explanation || 'Vocabulário extraído da aula atual.',
    example: item?.example || item?.sentence || '',
    translation: item?.translation || item?.pt || item?.portuguese || '',
    due: 'aula atual',
    deck: item?.deck || item?.category || 'Aula atual',
    id: item?.id || `${item?.word || item?.term || 'card'}-${index}`,
  };
}

function initialStats() {
  return { correct: 0, missed: 0, reviewed: 0 };
}

export function FlashcardsScreen({ onNavigate }) {
  const [flipped, setFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [sessionStats, setSessionStats] = useState(initialStats);
  const [sessionDone, setSessionDone] = useState(false);
  const [sessionRecord, setSessionRecord] = useState(null);
  const [reviewLog, setReviewLog] = useState([]);
  const [audioMessage, setAudioMessage] = useState('');
  const currentLesson = getCurrentLesson();
  const cards = useMemo(() => (Array.isArray(currentLesson?.vocabulary) ? currentLesson.vocabulary.map(normalizeVocabularyItem) : []), [currentLesson]);
  const currentCard = cards.length && !sessionDone ? cards[Math.min(cardIndex, cards.length - 1)] : null;
  const sessionPosition = cards.length ? Math.min(cardIndex + 1, cards.length) : 0;
  const sessionProgress = cards.length ? Math.min(100, (sessionStats.reviewed / cards.length) * 100) : 0;
  const precision = useMemo(() => {
    const total = sessionStats.reviewed;
    return total ? Math.round((sessionStats.correct / total) * 100) : 0;
  }, [sessionStats]);

  function finishSession(nextStats, nextLog) {
    const record = recordFlashcardSession({
      lesson: currentLesson,
      totalCards: cards.length,
      reviewedCards: nextStats.reviewed,
      correctCount: nextStats.correct,
      needsReviewCount: nextStats.missed,
      cards: nextLog,
    });
    setSessionRecord(record);
    setSessionDone(true);
    setFlipped(false);
    setAudioMessage('Sessão de cartas concluída e registrada.');
  }

  function handleDifficulty(tone) {
    if (!cards.length || !currentCard || sessionDone) return;

    const isMissed = tone === 'again' || tone === 'hard';
    const reviewItem = {
      id: currentCard.id,
      word: currentCard.word,
      rating: tone,
      needsReview: isMissed,
      reviewedAt: new Date().toISOString(),
    };
    const nextLog = [...reviewLog, reviewItem];
    const nextStats = {
      correct: sessionStats.correct + (isMissed ? 0 : 1),
      missed: sessionStats.missed + (isMissed ? 1 : 0),
      reviewed: sessionStats.reviewed + 1,
    };

    setReviewLog(nextLog);
    setSessionStats(nextStats);
    setFlipped(false);

    const nextIndex = cardIndex + 1;
    if (nextIndex >= cards.length) {
      finishSession(nextStats, nextLog);
      return;
    }

    setCardIndex(nextIndex);
  }

  function restartSession() {
    setFlipped(false);
    setCardIndex(0);
    setSessionStats(initialStats());
    setSessionDone(false);
    setSessionRecord(null);
    setReviewLog([]);
    setAudioMessage('Nova revisão iniciada.');
  }

  async function handleCardAudio(text, event) {
    event.stopPropagation();
    if (!text) return;
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
          <p>{cards.length ? `${cards.length} card(s) reais da aula atual` : 'Nenhum card real disponível ainda'}</p>
        </div>
      </div>

      <div className="cards-deck-scroll" aria-label="Baralhos de revisão">
        <button className="cards-chip active" type="button">
          Aula atual
          <span>{cards.length}</span>
        </button>
      </div>

      {!cards.length ? (
        <section className="cards-review-footer">
          <div>
            <Layers3 size={18} />
            <span>Sem cards reais</span>
          </div>
          <strong>gere ou abra uma aula com vocabulário</strong>
          <p>As cartas agora só mostram vocabulário real vindo da aula atual. Não há mais baralhos ou contagens fictícias.</p>
          <small><Clock3 size={13} /> volte após gerar uma aula por IA</small>
        </section>
      ) : sessionDone ? (
        <section className="cards-complete-card" aria-label="Sessão de flashcards concluída">
          <div className="cards-complete-icon"><Award size={24} /></div>
          <span>Sessão concluída</span>
          <h2>{sessionStats.reviewed} carta(s) revisada(s)</h2>
          <p>Registro real salvo para Hoje, Progresso e revisão futura.</p>

          <div className="cards-stat-grid cards-complete-grid">
            <div className="cards-stat-card green">
              <strong>{sessionStats.correct}</strong>
              <span>Marcadas ok</span>
            </div>
            <div className="cards-stat-card rose">
              <strong>{sessionStats.missed}</strong>
              <span>Para revisar</span>
            </div>
            <div className="cards-stat-card blue">
              <strong>{precision}%</strong>
              <span>Precisão</span>
            </div>
          </div>

          {sessionRecord?.completedAt ? <small>Salvo às {new Date(sessionRecord.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.</small> : null}

          <div className="cards-complete-actions">
            <button type="button" onClick={restartSession}><RotateCcw size={16} /> Revisar novamente</button>
            <button type="button" onClick={() => onNavigate?.('today')}><CheckCircle2 size={16} /> Voltar para Hoje</button>
            <button type="button" onClick={() => onNavigate?.('lesson')}>Continuar aula</button>
          </div>
        </section>
      ) : (
        <>
          <div className="cards-session-card">
            <div className="cards-session-topline">
              <span>Sessão · carta {sessionPosition} de {cards.length}</span>
              <strong>{sessionStats.reviewed} revisada(s)</strong>
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
                  <span className="cards-chip due">{currentCard.due}</span>
                </div>

                <div className="cards-card-center">
                  <span className="cards-phonetic">{[currentCard.pos, currentCard.phonetic].filter(Boolean).join(' · ') || 'vocabulário real'}</span>
                  <strong className="cards-word">{currentCard.word}</strong>
                  <span className="cards-audio-pill" onClick={(event) => handleCardAudio(currentCard.word, event)} role="button" tabIndex={0}>
                    <Volume2 size={14} /> Ouvir
                  </span>
                </div>

                <span className="cards-tap-hint">Toque para ver a resposta</span>
              </article>

              <article className="cards-face cards-face-back">
                <span className="cards-label">Definição</span>
                <p className="cards-definition">{currentCard.definition}</p>

                {currentCard.example ? (
                  <>
                    <span className="cards-label">Exemplo</span>
                    <blockquote>{currentCard.example}</blockquote>
                  </>
                ) : null}
                {currentCard.translation ? <p className="cards-translation">{currentCard.translation}</p> : null}

                {currentCard.example ? (
                  <span className="cards-audio-pill cards-audio-left" onClick={(event) => handleCardAudio(currentCard.example, event)} role="button" tabIndex={0}>
                    <Volume2 size={14} /> Ouvir frase
                  </span>
                ) : null}
              </article>
            </button>
          </div>

          {audioMessage ? <p className="generator-message cards-audio-message">{audioMessage}</p> : null}

          {flipped ? (
            <div className="cards-srs-grid" aria-label="Classificar dificuldade da carta">
              {[
                { id: 'again', label: 'De novo', time: 'revisar', tone: 'rose' },
                { id: 'hard', label: 'Difícil', time: 'marcar', tone: 'amber' },
                { id: 'good', label: 'Bom', time: 'ok', tone: 'blue' },
                { id: 'easy', label: 'Fácil', time: 'ok', tone: 'green' },
              ].map((button) => (
                <button className={`cards-srs-button ${button.tone}`} key={button.id} type="button" onClick={() => handleDifficulty(button.id)}>
                  <strong>{button.label}</strong>
                  <span>{button.time}</span>
                </button>
              ))}
            </div>
          ) : (
            <button className="cards-primary-action" type="button" onClick={() => setFlipped(true)}>
              Mostrar resposta
            </button>
          )}

          <section className="cards-session-stats" aria-label="Estatísticas da sessão atual">
            <div className="cards-section-title">
              <span><Brain size={15} /> Esta sessão</span>
              <small>somente revisão atual</small>
            </div>

            <div className="cards-stat-grid">
              <div className="cards-stat-card green">
                <strong>{sessionStats.correct}</strong>
                <span>Marcadas ok</span>
              </div>
              <div className="cards-stat-card rose">
                <strong>{sessionStats.missed}</strong>
                <span>Para revisar</span>
              </div>
              <div className="cards-stat-card blue">
                <strong>{precision}%</strong>
                <span>Precisão</span>
              </div>
            </div>
          </section>
        </>
      )}
    </section>
  );
}
