import { ArrowLeft, Award, Brain, CheckCircle2, Layers3, Lock, Map, RotateCcw, Sparkles, Volume2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { playLearningAudio } from '../services/audioPlayback.js';
import { getCurrentLesson } from '../services/lessonStore.js';
import { getFlashcardSessions, localDateKey, recordFlashcardSession } from '../services/progressStore.js';
import { getTotalVocabularyBankCount, VOCABULARY_BANK_TARGET } from '../services/vocabularyDecks.js';
import { completeVocabularyBubbleLevel, getBubbleCardsForLevel, getNextVocabularyTarget, getVocabularyPathState, getVocabularyPathStats, getVocabularyTopicPath } from '../services/vocabularyPath.js';
import { buildVocabularyPracticeActivities, scoreVocabularyPractice } from '../services/vocabularyPractice.js';
import { getVocabularySrsState, getVocabularySrsSummary, updateVocabularySrsFromReviewLog } from '../services/vocabularySrs.js';
import { getVocabularyVisualReference } from '../services/vocabularyVisualReferences.js';

function cardFrom(item, index) {
  if (typeof item === 'string') return { id: `${item}-${index}`, word: item, translation: '', definition: 'Vocabulário da aula atual.', example: '', deck: 'Aula atual' };
  return {
    id: item?.id || `${item?.word || item?.term || 'card'}-${index}`,
    word: item?.word || item?.term || item?.expression || `Card ${index + 1}`,
    translation: item?.translation || item?.pt || item?.portuguese || '',
    definition: item?.definition || item?.meaning || item?.translation || 'Vocabulário da trilha.',
    example: item?.example || item?.sentence || '',
    deck: item?.deck || item?.category || 'Trilha',
  };
}

function statsFromSession(session) {
  return session ? { correct: Number(session.correctCount || 0), missed: Number(session.needsReviewCount || 0), reviewed: Number(session.reviewedCards || 0) } : { correct: 0, missed: 0, reviewed: 0 };
}

function lessonId(lesson) {
  return lesson?.id || `${lesson?.type || 'lesson'}-${lesson?.title || 'untitled'}`;
}

function findTodaySession(lesson) {
  const today = localDateKey(new Date());
  return getFlashcardSessions().find((session) => session?.lessonId === lessonId(lesson) && localDateKey(session?.completedAt) === today) || null;
}

function makeLesson(deck, bubble, level) {
  return { id: `path-${deck.id}-${bubble.index}-level-${level}`, title: `${deck.title} · ${bubble.title} · Nível ${level}`, type: 'flashcards', level: deck.level || 'A1' };
}

function statusFor(card, srsState) {
  const key = String(card.id || card.word || '').toLowerCase().replace(/\s+/g, '-');
  const items = srsState?.items || {};
  const direct = items[key];
  const byWord = Object.values(items).find((item) => String(item.word || '').toLowerCase() === String(card.word || '').toLowerCase());
  const item = direct || byWord;
  if (!item) return { label: 'nova', intro: true };
  if (item.status === 'mastered') return { label: 'dominada', intro: false };
  if (item.status === 'weak') return { label: 'fraca', intro: true };
  return { label: 'revisão', intro: true };
}

function FloatingGloss({ card, onClose }) {
  if (!card) return null;
  const visual = getVocabularyVisualReference(card);
  return <div style={{ position: 'fixed', inset: 0, zIndex: 80, display: 'grid', placeItems: 'center', padding: 18, background: 'rgba(2,6,23,.28)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
    <section style={{ width: 'min(360px, 92vw)', border: '1px solid rgba(196,181,253,.42)', borderRadius: 22, background: 'linear-gradient(180deg, rgba(25,32,62,.98), rgba(10,16,36,.98))', boxShadow: '0 24px 70px rgba(0,0,0,.42), 0 0 0 1px rgba(196,181,253,.10)', padding: 18 }} onClick={(event) => event.stopPropagation()}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#c4b5fd', fontSize: 11, fontWeight: 950, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 10 }}><b style={{ fontSize: 24, lineHeight: 1 }}>{visual.icon}</b>{visual.label}</span>
      <strong style={{ display: 'block', color: '#f8fbff', fontSize: 30, lineHeight: 1, letterSpacing: '-.04em', marginBottom: 10 }}>{card.word}</strong>
      <p style={{ margin: '0 0 12px', color: '#dbeafe', fontSize: 18, fontWeight: 850 }}>{card.translation || card.definition}</p>
      {card.example ? <p style={{ margin: '0 0 14px', color: '#aeb8d4', fontSize: 14, lineHeight: 1.45 }}>{card.example}</p> : null}
      <button type="button" onClick={onClose} style={{ width: '100%', minHeight: 42, border: 0, borderRadius: 14, color: 'white', background: 'linear-gradient(135deg, #5b9cf6, #a78bfa)', fontWeight: 900 }}>Entendi</button>
    </section>
  </div>;
}

function LessonAdaptiveCards({ cards, srsState, onAudio, onBack }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [roundStats, setRoundStats] = useState({ reviewed: 0, correct: 0, missed: 0 });
  const card = cards[Math.min(index, Math.max(0, cards.length - 1))];
  const status = statusFor(card || {}, srsState);
  const progress = cards.length ? Math.round(((index + 1) / cards.length) * 100) : 0;

  function rate(correct) {
    setRoundStats((current) => ({ reviewed: current.reviewed + 1, correct: current.correct + (correct ? 1 : 0), missed: current.missed + (correct ? 0 : 1) }));
    if (index + 1 >= cards.length) return;
    setIndex(index + 1);
    setFlipped(false);
  }

  if (!card) return null;
  return <>
    <header className="cards-study-header"><button type="button" onClick={onBack}><ArrowLeft size={18} /> Voltar</button><div><span>Aula atual</span><strong>Flashcards adaptativos</strong><small>{index + 1}/{cards.length} cards da aula</small></div></header>
    <section className="cards-lesson-adaptive-card cards-lesson-adaptive-dedicated">
      <div className="cards-section-title"><span><Brain size={15} /> Flashcards adaptativos</span><small>{index + 1}/{cards.length}</small></div>
      <div className="cards-session-topline"><span>{status.label}</span><strong>{progress}%</strong></div>
      <div className="cards-progress-track"><span style={{ width: `${progress}%` }} /></div>
      <div className="cards-flip-stage">
        <button type="button" className={`cards-flip-card ${flipped ? 'is-flipped' : ''}`} onClick={() => setFlipped((value) => !value)}>
          <div className="cards-face cards-face-front">
            <div className="cards-face-badges"><span className="cards-chip active">{card.deck || 'Aula atual'}</span><span className="cards-chip">{status.label}</span></div>
            <div className="cards-card-center"><strong className="cards-word">{card.word}</strong><span className="cards-phonetic">toque para revelar</span></div>
            <span className="cards-tap-hint">Treine recall antes de virar.</span>
          </div>
          <div className="cards-face cards-face-back">
            <span className="cards-chip active">Resposta</span>
            <p className="cards-definition">{card.translation || card.definition}</p>
            {card.example ? <blockquote>{card.example}</blockquote> : null}
            <span className="cards-translation">Toque para voltar.</span>
          </div>
        </button>
      </div>
      <button className="cards-audio-pill" type="button" onClick={() => onAudio(card.word)}><Volume2 size={15} /> Ouvir palavra</button>
      <div className="cards-srs-grid">
        <button className="cards-srs-button rose" type="button" onClick={() => rate(false)}><strong>Errei</strong><span>revisar</span></button>
        <button className="cards-srs-button amber" type="button" onClick={() => rate(false)}><strong>Difícil</strong><span>reforçar</span></button>
        <button className="cards-srs-button blue" type="button" onClick={() => rate(true)}><strong>Bom</strong><span>seguir</span></button>
        <button className="cards-srs-button green" type="button" onClick={() => rate(true)}><strong>Fácil</strong><span>dominei</span></button>
      </div>
      <small className="cards-adaptive-mini-stats">Rodada: {roundStats.correct} acerto(s), {roundStats.missed} revisão(ões).</small>
    </section>
  </>;
}

function TopicSelector({ pathState, activeDeckId, onSelect, onOpenLessonCards, lessonCardsCount }) {
  return <section className="cards-topic-selector"><div className="cards-section-title"><span><Map size={15} /> Tópicos por nível</span><small>desbloqueio progressivo</small></div>{lessonCardsCount ? <button className="cards-open-lesson-flashcards" type="button" onClick={onOpenLessonCards}><Brain size={16} /> Flashcards da aula <b>{lessonCardsCount}</b></button> : null}<div className="cards-topic-list">{pathState.decks.map((deck) => <button className={`cards-topic-button ${activeDeckId === deck.id ? 'active' : ''} ${!deck.unlocked ? 'locked' : ''}`} key={deck.id} type="button" onClick={() => deck.unlocked && onSelect(deck.id)} disabled={!deck.unlocked}><div>{deck.unlocked ? <Sparkles size={15} /> : <Lock size={15} />}</div><span><strong>{deck.title}</strong><small>{deck.level} · {deck.completedBubbles}/{deck.totalBubbles} bolhas</small></span><b>{deck.progressPercent}%</b></button>)}</div></section>;
}

function PathMap({ path, selectedBubble, onSelectBubble }) {
  return <section className="cards-path-card"><div className="cards-section-title"><span><Layers3 size={15} /> Trilha · {path.deck.title}</span><small>{path.deck.level}</small></div><div className="cards-path-map">{path.bubbles.map((bubble, index) => <button className={`cards-path-bubble ${bubble.completed ? 'completed' : ''} ${selectedBubble?.id === bubble.id ? 'active' : ''} ${!bubble.unlocked ? 'locked' : ''} ${index % 2 ? 'right' : 'left'}`} key={bubble.id} type="button" onClick={() => bubble.unlocked && onSelectBubble(bubble)} disabled={!bubble.unlocked}><span>{bubble.unlocked ? bubble.number : <Lock size={17} />}</span><strong>{bubble.title}</strong><small>{bubble.preview}</small><i>{bubble.levelDone}/3</i></button>)}</div></section>;
}

function NewWordsStep({ deck, bubble, level, cards, seen, openId, setOpenId, markSeen, onStart, onBack }) {
  const openCard = cards.find((card) => card.id === openId);
  return <><header className="cards-study-header"><button type="button" onClick={onBack}><ArrowLeft size={18} /> Voltar</button><div><span>{deck.title}</span><strong>Palavras novas</strong><small>Bolha {bubble?.number} · Nível {level}/3</small></div></header><section className="vocab-activity-card"><div className="vocab-activity-top"><span>Início da bolha</span><small>Toque nas palavras destacadas para ver a tradução. Depois comece os exercícios.</small></div><div className="vocab-choice-options">{cards.map((card) => { const isSeen = seen.includes(card.id); const visual = getVocabularyVisualReference(card); return <button key={card.id} type="button" className={isSeen ? '' : 'selected'} onClick={() => { markSeen(card.id); setOpenId(card.id); }}><span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#8f9bb8', letterSpacing: '.12em' }}><b style={{ fontSize: 22, lineHeight: 1, letterSpacing: 0 }}>{visual.icon}</b>{visual.label} · {isSeen ? 'vista' : 'nova'}</span><strong style={{ display: 'block', fontSize: 24 }}>{card.word}</strong></button>; })}</div><button className="cards-primary-action" type="button" onClick={onStart}>Continuar para exercícios</button></section><FloatingGloss card={openCard} onClose={() => setOpenId('')} /></>;
}

function ActivityCard({ activity, selected, builtWords, feedback, onChoose, onBuildWord, onRemoveBuildWord, onContinue, onAudio }) {
  if (!activity) return null;
  const isIntro = activity.type === 'intro';
  const isBuild = activity.type === 'build';
  const isListen = activity.type === 'listen';
  const canCheck = isIntro || feedback || (isBuild && builtWords.length) || (!isBuild && !isIntro && selected);
  const label = feedback || isIntro ? 'Continuar' : isBuild ? 'Verificar' : selected ? 'Verificar resposta' : 'Escolha uma resposta';
  return <section className={`vocab-activity-card ${activity.type}`}><div className="vocab-activity-top"><span>{activity.title}</span><small>{activity.instruction}</small></div>{isListen ? <button className="vocab-audio-main" type="button" onClick={() => onAudio(activity.prompt)}><Volume2 size={18} /> Ouvir frase</button> : null}{isIntro ? <div className="vocab-intro-body"><strong>{activity.word}</strong><p>{activity.answer}</p>{activity.example ? <blockquote>{activity.example}</blockquote> : null}</div> : isBuild ? <div className="vocab-build-body"><p>{activity.prompt}</p><div className="vocab-built-answer">{builtWords.length ? builtWords.map((word, index) => <button key={`${word}-${index}`} type="button" onClick={() => onRemoveBuildWord(index)}>{word}</button>) : <span>Monte aqui...</span>}</div><div className="vocab-build-options">{activity.options.map((word, index) => <button key={`${word}-${index}`} type="button" onClick={() => onBuildWord(word)}>{word}</button>)}</div></div> : <div className="vocab-choice-body"><p>{isListen ? 'Escolha o que você ouviu.' : activity.prompt}</p>{activity.hint ? <em className="vocab-meaning-hint">Sentido: {activity.hint}</em> : null}<div className="vocab-choice-options">{activity.options.map((option) => <button className={selected === option ? 'selected' : ''} key={option} type="button" onClick={() => onChoose(option)}>{option}</button>)}</div></div>}{feedback ? <div className={`vocab-feedback ${feedback.correct ? 'correct' : 'wrong'}`}>{feedback.correct ? 'Correto.' : `Resposta certa: ${feedback.expected}`}</div> : null}<button className="cards-primary-action" type="button" onClick={onContinue} disabled={!canCheck}>{label}</button></section>;
}

export function FlashcardsScreen({ onNavigate }) {
  const currentLesson = getCurrentLesson();
  const lessonCards = useMemo(() => (Array.isArray(currentLesson?.vocabulary) ? currentLesson.vocabulary.map(cardFrom) : []), [currentLesson]);
  const [stage, setStage] = useState('map');
  const [pathVersion, setPathVersion] = useState(0);
  const [srsVersion, setSrsVersion] = useState(0);
  const pathState = useMemo(() => getVocabularyPathState(), [pathVersion]);
  const pathStats = useMemo(() => getVocabularyPathStats(), [pathVersion]);
  const srsSummary = useMemo(() => getVocabularySrsSummary(), [srsVersion]);
  const srsState = useMemo(() => getVocabularySrsState(), [srsVersion, pathVersion]);
  const [activeDeckId, setActiveDeckId] = useState(pathState.decks.find((deck) => deck.unlocked)?.id || 'core-a1');
  const topicPath = useMemo(() => getVocabularyTopicPath(activeDeckId), [activeDeckId, pathVersion]);
  const nextTarget = useMemo(() => getNextVocabularyTarget(activeDeckId), [activeDeckId, pathVersion]);
  const [selectedBubble, setSelectedBubble] = useState(nextTarget.bubble);
  const level = Math.min(3, Math.max(1, (selectedBubble?.levelDone || 0) + 1));
  const lesson = makeLesson(topicPath.deck, selectedBubble || nextTarget.bubble, level);
  const persistedSession = useMemo(() => findTodaySession(lesson), [lesson?.id]);
  const [stats, setStats] = useState(() => statsFromSession(persistedSession));
  const [done, setDone] = useState(Boolean(persistedSession));
  const [sessionRecord, setSessionRecord] = useState(persistedSession);
  const [log, setLog] = useState([]);
  const [activityIndex, setActivityIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const [built, setBuilt] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [seen, setSeen] = useState([]);
  const [openId, setOpenId] = useState('');
  const [audioMessage, setAudioMessage] = useState('');
  const cards = useMemo(() => getBubbleCardsForLevel(activeDeckId, (selectedBubble || nextTarget.bubble)?.index || 0, level).map(cardFrom), [activeDeckId, selectedBubble?.id, nextTarget.bubble?.id, level]);
  const introCards = useMemo(() => cards.filter((card) => statusFor(card, srsState).intro).slice(0, 8), [cards, srsState]);
  const activities = useMemo(() => buildVocabularyPracticeActivities(cards, { level }), [cards, level]);
  const currentActivity = activities[Math.min(activityIndex, Math.max(0, activities.length - 1))];
  const total = activities.length;
  const progress = total ? Math.min(100, (stats.reviewed / total) * 100) : 0;
  const precision = stats.reviewed ? Math.round((stats.correct / stats.reviewed) * 100) : 0;
  const dedicated = stage !== 'map';

  useEffect(() => { setSelectedBubble(nextTarget.bubble); setStage('map'); }, [activeDeckId, pathVersion]);
  useEffect(() => { setStats(statsFromSession(persistedSession)); setDone(Boolean(persistedSession)); setSessionRecord(persistedSession); setLog([]); setActivityIndex(0); setSelected(''); setBuilt([]); setFeedback(null); setSeen([]); setOpenId(''); }, [activeDeckId, selectedBubble?.id, level, persistedSession?.id]);

  function addLog(correct, item, expected = '', received = '', rating = '') {
    const entry = { id: item?.id || item?.cardId || `step-${Date.now()}`, cardId: item?.cardId || item?.id || '', word: item?.word || '', deck: topicPath.deck.title, rating: rating || (correct ? 'good' : 'again'), needsReview: !correct, expected, answer: received, type: item?.type || 'card', reviewedAt: new Date().toISOString() };
    const nextLog = [...log, entry];
    const nextStats = { correct: stats.correct + (correct ? 1 : 0), missed: stats.missed + (correct ? 0 : 1), reviewed: stats.reviewed + 1 };
    setLog(nextLog); setStats(nextStats); return { nextLog, nextStats };
  }
  function finish(nextStats, nextLog) {
    updateVocabularySrsFromReviewLog(nextLog, { deck: topicPath.deck.title, level: lesson?.level || 'A1' });
    setSrsVersion((value) => value + 1);
    const record = recordFlashcardSession({ lesson, totalCards: total, reviewedCards: Math.min(nextStats.reviewed, total), correctCount: nextStats.correct, needsReviewCount: nextStats.missed, cards: nextLog });
    if (selectedBubble && nextStats.reviewed >= total) { completeVocabularyBubbleLevel({ deckId: activeDeckId, bubbleIndex: selectedBubble.index, level }); setPathVersion((value) => value + 1); }
    setSessionRecord(record); setDone(true); setAudioMessage('Sessão concluída.');
  }
  function continueActivity() {
    if (!currentActivity) return;
    if (currentActivity.type === 'intro') { const result = addLog(true, currentActivity, currentActivity.answer, 'viewed', 'intro'); if (activityIndex + 1 >= activities.length) finish(result.nextStats, result.nextLog); else setActivityIndex(activityIndex + 1); return; }
    if (feedback) { setFeedback(null); setSelected(''); setBuilt([]); if (activityIndex + 1 >= activities.length) finish(stats, log); else setActivityIndex(activityIndex + 1); return; }
    const score = scoreVocabularyPractice(currentActivity, currentActivity.type === 'build' ? built : selected);
    const result = addLog(score.correct, currentActivity, score.expected, score.received);
    setFeedback(score);
    setLog(result.nextLog); setStats(result.nextStats);
  }
  async function audio(text) { if (!text) return; setAudioMessage('Preparando áudio...'); const result = await playLearningAudio({ text, label: 'Cartas', voiceName: 'Kore', style: 'Clear dictionary-style English pronunciation.' }); setAudioMessage(result.ok ? 'Áudio iniciado.' : result.error || 'Erro no áudio.'); }
  function markSeen(id) { setSeen((current) => current.includes(id) ? current : [...current, id]); }

  return <section className={`cards-screen ${dedicated ? 'cards-study-mode' : ''}`} aria-label="Cartas">
    {!dedicated ? <><div className="cards-header-row"><div><p className="cards-eyebrow">Vocabulário</p><h1>Cartas</h1><p>{pathStats.completedBubbles}/{pathStats.totalBubbles} bolhas · {getTotalVocabularyBankCount()}/{VOCABULARY_BANK_TARGET} palavras planejadas</p></div></div><div className="cards-deck-scroll compact-tabs"><button className="cards-chip active" type="button">Trilha de vocabulário <span>{pathStats.progressPercent}%</span></button>{lessonCards.length ? <button className="cards-chip" type="button" onClick={() => setStage('lessonCards')}>Flashcards da aula <span>{lessonCards.length}</span></button> : null}</div><section className="cards-review-footer"><div><Brain size={18} /><span>Revisão espaçada</span></div><strong>{srsSummary.dueToday} revisão(ões) para hoje</strong><p>{srsSummary.total ? `${srsSummary.total} item(ns) rastreados · ${srsSummary.weak} fraco(s) · domínio médio ${srsSummary.averageMastery}%` : 'As palavras começarão a ser rastreadas depois da primeira bolha.'}</p></section><TopicSelector pathState={pathState} activeDeckId={activeDeckId} onSelect={setActiveDeckId} onOpenLessonCards={() => setStage('lessonCards')} lessonCardsCount={lessonCards.length} />{selectedBubble ? <PathMap path={topicPath} selectedBubble={selectedBubble} onSelectBubble={(bubble) => { setSelectedBubble(bubble); setStage('intro'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} /> : null}</> : null}
    {stage === 'lessonCards' ? <LessonAdaptiveCards cards={lessonCards} srsState={srsState} onAudio={audio} onBack={() => setStage('map')} /> : null}
    {stage === 'intro' && !done ? <NewWordsStep deck={topicPath.deck} bubble={selectedBubble} level={level} cards={introCards.length ? introCards : cards.slice(0, 6)} seen={seen} openId={openId} setOpenId={setOpenId} markSeen={markSeen} onStart={() => setStage('practice')} onBack={() => setStage('map')} /> : null}
    {stage === 'practice' && !done ? <><header className="cards-study-header"><button type="button" onClick={() => setStage('intro')}><ArrowLeft size={18} /> Palavras novas</button><div><span>{topicPath.deck.title}</span><strong>Bolha {selectedBubble?.number} · Nível {level}/3</strong><small>{Math.min(activityIndex + 1, total)}/{total} exercícios</small></div></header><div className="cards-session-card"><div className="cards-session-topline"><span>Progresso</span><strong>{stats.reviewed}/{total}</strong></div><div className="cards-progress-track"><span style={{ width: `${progress}%` }} /></div></div><ActivityCard activity={currentActivity} selected={selected} builtWords={built} feedback={feedback} onChoose={(option) => { setSelected(option); setFeedback(null); }} onBuildWord={(word) => setBuilt((current) => [...current, word])} onRemoveBuildWord={(index) => setBuilt((current) => current.filter((_, itemIndex) => itemIndex !== index))} onContinue={continueActivity} onAudio={audio} /></> : null}
    {done ? <section className="cards-complete-card"><div className="cards-complete-icon"><Award size={24} /></div><span>Sessão concluída</span><h2>{Math.min(stats.reviewed || sessionRecord?.reviewedCards || total, total)} etapa(s)</h2><p>SRS atualizado e progresso salvo.</p><div className="cards-stat-grid"><div className="cards-stat-card green"><strong>{stats.correct}</strong><span>Acertos</span></div><div className="cards-stat-card rose"><strong>{stats.missed}</strong><span>Erros</span></div><div className="cards-stat-card blue"><strong>{precision}%</strong><span>Precisão</span></div></div><div className="cards-complete-actions"><button type="button" onClick={() => { setDone(false); setStats({ correct: 0, missed: 0, reviewed: 0 }); setActivityIndex(0); setStage('intro'); }}><RotateCcw size={16} /> Revisar novamente</button><button type="button" onClick={() => setStage('map')}><Map size={16} /> Voltar para trilha</button><button type="button" onClick={() => onNavigate?.('today')}><CheckCircle2 size={16} /> Hoje</button></div></section> : null}
    {stage === 'practice' ? <section className="cards-session-stats"><div className="cards-section-title"><span><Brain size={15} /> Esta rodada</span><small>{topicPath.deck.title}</small></div><div className="cards-stat-grid"><div className="cards-stat-card green"><strong>{stats.correct}</strong><span>Acertos</span></div><div className="cards-stat-card rose"><strong>{stats.missed}</strong><span>Erros</span></div><div className="cards-stat-card blue"><strong>{precision}%</strong><span>Precisão</span></div></div></section> : null}
    {audioMessage ? <p className="generator-message cards-audio-message">{audioMessage}</p> : null}
  </section>;
}
