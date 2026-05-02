import { Award, Brain, CheckCircle2, Clock3, Layers3, Lock, Map, RotateCcw, Sparkles, Volume2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { playLearningAudio } from '../services/audioPlayback.js';
import { getCurrentLesson } from '../services/lessonStore.js';
import { getFlashcardSessions, recordFlashcardSession } from '../services/progressStore.js';
import { getTotalVocabularyBankCount, getVocabularyDeckCards, getVocabularyDecks, VOCABULARY_BANK_TARGET } from '../services/vocabularyDecks.js';
import { completeVocabularyBubbleLevel, getBubbleCardsForLevel, getNextVocabularyTarget, getVocabularyPathState, getVocabularyPathStats, getVocabularyTopicPath } from '../services/vocabularyPath.js';

function normalizeVocabularyItem(item, index) {
  if (typeof item === 'string') {
    return { word: item, pos: '', phonetic: '', definition: 'Vocabulário extraído da aula atual.', example: '', translation: '', due: 'aula atual', deck: 'Aula atual', id: `${item}-${index}` };
  }
  return {
    word: item?.word || item?.term || item?.expression || `Card ${index + 1}`,
    pos: item?.pos || item?.partOfSpeech || '',
    phonetic: item?.phonetic || item?.ipa || '',
    definition: item?.definition || item?.meaning || item?.explanation || 'Vocabulário extraído da aula atual.',
    example: item?.example || item?.sentence || '',
    translation: item?.translation || item?.pt || item?.portuguese || '',
    due: item?.due || item?.level || 'aula atual',
    deck: item?.deck || item?.category || 'Aula atual',
    id: item?.id || `${item?.word || item?.term || 'card'}-${index}`,
  };
}

function initialStats() { return { correct: 0, missed: 0, reviewed: 0 }; }
function getLessonId(lesson) { return lesson?.id || `${lesson?.type || 'lesson'}-${lesson?.title || 'untitled'}`; }
function todayKey(date = new Date()) { return date.toISOString().slice(0, 10); }
function makeDeckLesson(deck) { return { id: `deck-${deck.id}`, title: `Deck · ${deck.title}`, type: 'flashcards', level: deck.level || 'A1' }; }
function makePathLesson(deck, bubble, level) { return { id: `path-${deck.id}-${bubble.index}-level-${level}`, title: `${deck.title} · ${bubble.title} · Nível ${level}`, type: 'flashcards', level: deck.level || 'A1' }; }
function findTodaySession(lesson) {
  const lessonId = getLessonId(lesson);
  const today = todayKey();
  return getFlashcardSessions().find((session) => session?.lessonId === lessonId && String(session?.completedAt || '').slice(0, 10) === today) || null;
}
function statsFromSession(session) {
  if (!session) return initialStats();
  return { correct: Number(session.correctCount || 0), missed: Number(session.needsReviewCount || 0), reviewed: Number(session.reviewedCards || 0) };
}

function TopicSelector({ pathState, activeDeckId, onSelect }) {
  return (
    <section className="cards-topic-selector">
      <div className="cards-section-title"><span><Map size={15} /> Tópicos por nível</span><small>desbloqueio progressivo</small></div>
      <div className="cards-topic-list">
        {pathState.decks.map((deck) => (
          <button className={`cards-topic-button ${activeDeckId === deck.id ? 'active' : ''} ${!deck.unlocked ? 'locked' : ''}`} key={deck.id} type="button" onClick={() => deck.unlocked && onSelect(deck.id)} disabled={!deck.unlocked}>
            <div>{deck.unlocked ? <Sparkles size={15} /> : <Lock size={15} />}</div>
            <span><strong>{deck.title}</strong><small>{deck.level} · {deck.completedBubbles}/{deck.totalBubbles} bolhas</small></span>
            <b>{deck.progressPercent}%</b>
          </button>
        ))}
      </div>
    </section>
  );
}

function VocabularyPathMap({ path, selectedBubble, onSelectBubble }) {
  return (
    <section className="cards-path-card">
      <div className="cards-section-title"><span><Layers3 size={15} /> Trilha · {path.deck.title}</span><small>{path.deck.level}</small></div>
      <div className="cards-path-map" aria-label="Trilha de vocabulário">
        {path.bubbles.map((bubble, index) => (
          <button className={`cards-path-bubble ${bubble.completed ? 'completed' : ''} ${selectedBubble?.id === bubble.id ? 'active' : ''} ${!bubble.unlocked ? 'locked' : ''} ${index % 2 ? 'right' : 'left'}`} key={bubble.id} type="button" onClick={() => bubble.unlocked && onSelectBubble(bubble)} disabled={!bubble.unlocked}>
            <span>{bubble.unlocked ? bubble.number : <Lock size={17} />}</span>
            <strong>{bubble.title}</strong>
            <small>{bubble.preview}</small>
            <i>{bubble.levelDone}/3</i>
          </button>
        ))}
      </div>
    </section>
  );
}

export function FlashcardsScreen({ onNavigate }) {
  const currentLesson = getCurrentLesson();
  const currentLessonCards = useMemo(() => (Array.isArray(currentLesson?.vocabulary) ? currentLesson.vocabulary.map(normalizeVocabularyItem) : []), [currentLesson]);
  const decks = useMemo(() => getVocabularyDecks(), []);
  const bankCount = getTotalVocabularyBankCount();
  const [mode, setMode] = useState(() => currentLessonCards.length ? 'lesson' : 'path');
  const [pathVersion, setPathVersion] = useState(0);
  const pathState = useMemo(() => getVocabularyPathState(), [pathVersion]);
  const pathStats = useMemo(() => getVocabularyPathStats(), [pathVersion]);
  const firstUnlocked = pathState.decks.find((deck) => deck.unlocked)?.id || 'core-a1';
  const [activeDeckId, setActiveDeckId] = useState(firstUnlocked);
  const topicPath = useMemo(() => getVocabularyTopicPath(activeDeckId), [activeDeckId, pathVersion]);
  const nextTarget = useMemo(() => getNextVocabularyTarget(activeDeckId), [activeDeckId, pathVersion]);
  const [selectedBubble, setSelectedBubble] = useState(() => nextTarget.bubble);
  const activeDeck = decks.find((deck) => deck.id === activeDeckId) || decks[0];
  const activeLevel = Math.min(3, Math.max(1, (selectedBubble?.levelDone || 0) + 1));
  const sessionTarget = mode === 'lesson' ? currentLesson : makePathLesson(topicPath.deck, selectedBubble || nextTarget.bubble, activeLevel);
  const persistedSession = useMemo(() => findTodaySession(sessionTarget), [sessionTarget?.id, sessionTarget?.title]);
  const [flipped, setFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [sessionStats, setSessionStats] = useState(() => statsFromSession(persistedSession));
  const [sessionDone, setSessionDone] = useState(() => Boolean(persistedSession));
  const [sessionRecord, setSessionRecord] = useState(() => persistedSession);
  const [reviewLog, setReviewLog] = useState([]);
  const [audioMessage, setAudioMessage] = useState(() => persistedSession ? 'Sessão de cartas já concluída hoje.' : '');
  const cards = useMemo(() => {
    if (mode === 'lesson') return currentLessonCards;
    const bubble = selectedBubble || nextTarget.bubble;
    return getBubbleCardsForLevel(activeDeckId, bubble?.index || 0, activeLevel).map(normalizeVocabularyItem);
  }, [mode, activeDeckId, selectedBubble?.id, activeLevel, currentLessonCards, nextTarget.bubble?.id]);
  const currentCard = cards.length && !sessionDone ? cards[Math.min(cardIndex, cards.length - 1)] : null;
  const sessionPosition = cards.length ? Math.min(cardIndex + 1, cards.length) : 0;
  const sessionProgress = cards.length ? Math.min(100, (sessionStats.reviewed / cards.length) * 100) : 0;
  const precision = useMemo(() => sessionStats.reviewed ? Math.round((sessionStats.correct / sessionStats.reviewed) * 100) : 0, [sessionStats]);

  useEffect(() => { if (mode === 'lesson' && !currentLessonCards.length) setMode('path'); }, [mode, currentLessonCards.length]);
  useEffect(() => { setSelectedBubble(nextTarget.bubble); }, [activeDeckId, pathVersion]);
  useEffect(() => {
    setFlipped(false); setCardIndex(0); setReviewLog([]);
    if (persistedSession) { setSessionStats(statsFromSession(persistedSession)); setSessionDone(true); setSessionRecord(persistedSession); setAudioMessage('Sessão de cartas já concluída hoje.'); }
    else { setSessionStats(initialStats()); setSessionDone(false); setSessionRecord(null); setAudioMessage(''); }
  }, [mode, activeDeckId, selectedBubble?.id, activeLevel, persistedSession?.id]);

  function finishSession(nextStats, nextLog) {
    const record = recordFlashcardSession({ lesson: sessionTarget, totalCards: cards.length, reviewedCards: nextStats.reviewed, correctCount: nextStats.correct, needsReviewCount: nextStats.missed, cards: nextLog });
    if (mode === 'path' && selectedBubble && nextStats.reviewed >= cards.length) {
      completeVocabularyBubbleLevel({ deckId: activeDeckId, bubbleIndex: selectedBubble.index, level: activeLevel });
      setPathVersion((value) => value + 1);
    }
    setSessionRecord(record); setSessionDone(true); setFlipped(false); setAudioMessage('Sessão concluída e registrada.');
  }

  function handleDifficulty(tone) {
    if (!cards.length || !currentCard || sessionDone) return;
    const isMissed = tone === 'again' || tone === 'hard';
    const reviewItem = { id: currentCard.id, word: currentCard.word, deck: currentCard.deck, rating: tone, needsReview: isMissed, reviewedAt: new Date().toISOString() };
    const nextLog = [...reviewLog, reviewItem];
    const nextStats = { correct: sessionStats.correct + (isMissed ? 0 : 1), missed: sessionStats.missed + (isMissed ? 1 : 0), reviewed: sessionStats.reviewed + 1 };
    setReviewLog(nextLog); setSessionStats(nextStats); setFlipped(false);
    const nextIndex = cardIndex + 1;
    if (nextIndex >= cards.length) { finishSession(nextStats, nextLog); return; }
    setCardIndex(nextIndex);
  }

  function restartSession() { setFlipped(false); setCardIndex(0); setSessionStats(initialStats()); setSessionDone(false); setSessionRecord(null); setReviewLog([]); setAudioMessage('Nova revisão iniciada.'); }
  async function handleCardAudio(text, event) {
    event.stopPropagation(); if (!text) return; setAudioMessage('Preparando áudio...');
    const result = await playLearningAudio({ text, label: 'Flashcards', voiceName: 'Kore', style: 'Clear dictionary-style English pronunciation. Slightly slow and easy to repeat.' });
    setAudioMessage(result.ok ? 'Áudio iniciado.' : result.error || 'Não foi possível reproduzir áudio.');
  }

  return (
    <section className="cards-screen" aria-label="Trilha de vocabulário e cartas">
      <div className="cards-header-row"><div><p className="cards-eyebrow">Vocabulário</p><h1>Cartas</h1><p>{mode === 'path' ? `${pathStats.completedBubbles}/${pathStats.totalBubbles} bolhas · ${bankCount}/${VOCABULARY_BANK_TARGET} palavras planejadas` : `${cards.length} card(s) da aula atual`}</p></div></div>
      <div className="cards-deck-scroll compact-tabs" aria-label="Modos de cartas">
        {currentLessonCards.length ? <button className={`cards-chip ${mode === 'lesson' ? 'active' : ''}`} type="button" onClick={() => setMode('lesson')}>Aula atual <span>{currentLessonCards.length}</span></button> : null}
        <button className={`cards-chip ${mode === 'path' ? 'active' : ''}`} type="button" onClick={() => setMode('path')}>Trilha de vocabulário <span>{pathStats.progressPercent}%</span></button>
      </div>

      {mode === 'path' ? <TopicSelector pathState={pathState} activeDeckId={activeDeckId} onSelect={(deckId) => { setActiveDeckId(deckId); setMode('path'); }} /> : null}
      {mode === 'path' && selectedBubble ? <VocabularyPathMap path={topicPath} selectedBubble={selectedBubble} onSelectBubble={(bubble) => setSelectedBubble(bubble)} /> : null}

      {mode === 'path' && selectedBubble ? (
        <section className="cards-review-footer path-lesson-info"><div><Layers3 size={18} /><span>Bolha {selectedBubble.number} · Nível {activeLevel}/3</span></div><strong>{selectedBubble.title}</strong><p>Nível 1 apresenta poucas palavras. Nível 2 adiciona mais uso em frase. Nível 3 consolida antes de liberar a próxima bolha.</p><small><Clock3 size={13} /> {cards.length} cartas nesta rodada · tópico {topicPath.deck.title}</small></section>
      ) : null}

      {!cards.length ? (
        <section className="cards-review-footer"><div><Layers3 size={18} /><span>Sem cards reais</span></div><strong>selecione um tópico desbloqueado</strong><p>As cartas agora usam vocabulário real da aula atual e uma trilha progressiva por tema.</p></section>
      ) : sessionDone ? (
        <section className="cards-complete-card" aria-label="Sessão de cartas concluída">
          <div className="cards-complete-icon"><Award size={24} /></div><span>{mode === 'path' ? `Bolha nível ${activeLevel} concluído` : 'Sessão concluída'}</span><h2>{sessionStats.reviewed || sessionRecord?.reviewedCards || cards.length} carta(s) revisada(s)</h2><p>{mode === 'path' ? 'Progresso salvo na trilha. Complete os 3 níveis para liberar a próxima bolha.' : 'Registro real salvo para Hoje, Progresso e revisão futura.'}</p>
          <div className="cards-stat-grid cards-complete-grid"><div className="cards-stat-card green"><strong>{sessionStats.correct}</strong><span>Marcadas ok</span></div><div className="cards-stat-card rose"><strong>{sessionStats.missed}</strong><span>Para revisar</span></div><div className="cards-stat-card blue"><strong>{precision}%</strong><span>Precisão</span></div></div>
          <div className="cards-complete-actions"><button type="button" onClick={restartSession}><RotateCcw size={16} /> Revisar novamente</button><button type="button" onClick={() => onNavigate?.('today')}><CheckCircle2 size={16} /> Voltar para Hoje</button><button type="button" onClick={() => onNavigate?.('lesson')}>Continuar aula</button></div>
        </section>
      ) : (
        <>
          <div className="cards-session-card"><div className="cards-session-topline"><span>{mode === 'path' ? `${topicPath.deck.title} · bolha ${selectedBubble?.number} · nível ${activeLevel}` : `Sessão · carta ${sessionPosition} de ${cards.length}`}</span><strong>{sessionStats.reviewed}/{cards.length}</strong></div><div className="cards-progress-track"><span style={{ width: `${sessionProgress}%` }} /></div></div>
          <div className="cards-flip-stage"><button className={`cards-flip-card ${flipped ? 'is-flipped' : ''}`} type="button" onClick={() => setFlipped((value) => !value)} aria-label={flipped ? 'Mostrar frente da carta' : 'Mostrar resposta da carta'}><article className="cards-face cards-face-front"><div className="cards-face-badges"><span className="cards-chip active">{currentCard.deck}</span><span className="cards-chip due">{currentCard.due}</span></div><div className="cards-card-center"><span className="cards-phonetic">{[currentCard.pos, currentCard.phonetic].filter(Boolean).join(' · ') || currentCard.level || 'vocabulário real'}</span><strong className="cards-word">{currentCard.word}</strong><span className="cards-audio-pill" onClick={(event) => handleCardAudio(currentCard.word, event)} role="button" tabIndex={0}><Volume2 size={14} /> Ouvir</span></div><span className="cards-tap-hint">Toque para ver significado e exemplo</span></article><article className="cards-face cards-face-back"><span className="cards-label">Significado</span><p className="cards-definition">{currentCard.definition}</p>{currentCard.example ? <><span className="cards-label">Exemplo de uso</span><blockquote>{currentCard.example}</blockquote></> : null}{currentCard.translation ? <p className="cards-translation">{currentCard.translation}</p> : null}{currentCard.example ? <span className="cards-audio-pill cards-audio-left" onClick={(event) => handleCardAudio(currentCard.example, event)} role="button" tabIndex={0}><Volume2 size={14} /> Ouvir frase</span> : null}</article></button></div>
          {audioMessage ? <p className="generator-message cards-audio-message">{audioMessage}</p> : null}
          {flipped ? <div className="cards-srs-grid" aria-label="Classificar dificuldade da carta">{[{ id: 'again', label: 'De novo', time: 'revisar', tone: 'rose' }, { id: 'hard', label: 'Difícil', time: 'marcar', tone: 'amber' }, { id: 'good', label: 'Bom', time: 'ok', tone: 'blue' }, { id: 'easy', label: 'Fácil', time: 'ok', tone: 'green' }].map((button) => <button className={`cards-srs-button ${button.tone}`} key={button.id} type="button" onClick={() => handleDifficulty(button.id)}><strong>{button.label}</strong><span>{button.time}</span></button>)}</div> : <button className="cards-primary-action" type="button" onClick={() => setFlipped(true)}>Mostrar resposta</button>}
          <section className="cards-session-stats" aria-label="Estatísticas da sessão atual"><div className="cards-section-title"><span><Brain size={15} /> Esta rodada</span><small>{mode === 'path' ? `${topicPath.deck.title} · nível ${activeLevel}` : 'aula atual'}</small></div><div className="cards-stat-grid"><div className="cards-stat-card green"><strong>{sessionStats.correct}</strong><span>Marcadas ok</span></div><div className="cards-stat-card rose"><strong>{sessionStats.missed}</strong><span>Para revisar</span></div><div className="cards-stat-card blue"><strong>{precision}%</strong><span>Precisão</span></div></div></section>
        </>
      )}
    </section>
  );
}
