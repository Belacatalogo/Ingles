import { useEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, CheckCircle2, ChevronDown, ChevronUp, Eye, Headphones, Pause, Play, Repeat2, Save, ShieldCheck, Target, Volume2 } from 'lucide-react';
import { playLearningAudio, stopLearningAudio } from '../services/audioPlayback.js';
import { parseDialogueTurns, playMultiSpeakerDialogue, stopMultiSpeakerAudio } from '../services/multiSpeakerAudio.js';
import { diagnostics } from '../services/diagnostics.js';
import { completeLesson, getLessonDraft, saveLessonDraft } from '../services/progressStore.js';

const fallbackTranscript = ['Hi, I am Ana. I listen and repeat.', 'I spell my name A-N-A.', 'The first letter is A.'];
const flow = [
  ['1. Ouvir sem ler', 'treine ouvido puro'],
  ['2. Confirmar texto', 'abra depois do áudio'],
  ['3. Praticar', 'exercícios em tela cheia'],
  ['4. Repetir', 'ritmo e pronúncia'],
  ['5. Concluir', 'salvar progresso'],
];

function cleanText(value) {
  return String(value ?? '').replace(/\*\*(.*?)\*\*/g, '$1').replace(/^\s*[-*]\s+/gm, '').replace(/([.!?])(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ])/g, '$1 ').replace(/([,;:])(?=\S)/g, '$1 ').replace(/\n{3,}/g, '\n\n').replace(/[ \t]{2,}/g, ' ').trim();
}

function splitTranscript(value) {
  const clean = cleanText(value);
  if (!clean) return fallbackTranscript;
  const paragraphs = clean.split(/\n\s*\n+/).map((item) => item.trim()).filter(Boolean);
  if (paragraphs.length > 1) return paragraphs.slice(0, 24);
  const sentences = clean.split(/(?<=[.!?])\s+/).map((item) => item.trim()).filter(Boolean);
  return sentences.length ? sentences.slice(0, 24) : fallbackTranscript;
}

function normalizeList(list, fallback) {
  return Array.isArray(list) && list.length ? list.map(cleanText).filter(Boolean) : fallback;
}

function normalizeSections(lesson) {
  return (Array.isArray(lesson?.sections) ? lesson.sections : []).map((section, index) => ({
    title: cleanText(section?.title || section?.heading || `Parte ${index + 1}`),
    content: cleanText(section?.content || section?.text || section?.body || section?.explanation),
    examples: Array.isArray(section?.examples) ? section.examples.map(cleanText).filter(Boolean) : [],
  })).filter((section) => section.title || section.content);
}

function normalizeVocabulary(lesson) {
  return (Array.isArray(lesson?.vocabulary) ? lesson.vocabulary : []).map((item) => ({
    word: cleanText(item?.word || item?.term),
    meaning: cleanText(item?.meaning || item?.translation || item?.definition),
    example: cleanText(item?.example || item?.sentence),
  })).filter((item) => item.word || item.meaning || item.example);
}

function shadowingFrom(transcript, prompts) {
  const lines = transcript.flatMap((line) => cleanText(line).split(/(?<=[.!?])\s+/)).map((line) => line.trim()).filter((line) => line.length >= 6 && line.length <= 120).slice(0, 8);
  return lines.length ? lines : prompts.slice(0, 5);
}

function draftKey(lesson) { return lesson?.id || lesson?.title || 'listening'; }

function audioMessage(result, fallback = 'Áudio iniciado.') {
  if (!result?.ok) {
    if (result?.partial) return `Tocou até o trecho ${result.playedSegments || 1}, mas o iPhone bloqueou a continuação automática. Use o controle por trecho.`;
    return result?.error || 'Não foi possível reproduzir áudio.';
  }
  if (result.source === 'multi-speaker-merged-gemini') return `Diálogo multi-voz iniciado como áudio único: ${result.speakers} personagens, ${result.turns} falas.`;
  if (result.source === 'multi-speaker-sequential') return `Diálogo multi-voz tocado em sequência: ${result.speakers} personagens.`;
  if (result.source === 'cache') return 'Áudio natural carregado do cache.';
  if (result.source === 'segmented-cache') return `Áudio em ${result.segments || 'vários'} trechos usando cache.`;
  if (result.source === 'segmented-gemini') return `Áudio natural em ${result.segments || 'vários'} trechos iniciado.`;
  if (result.source === 'segmented-browser-fallback') return 'Áudio em trechos usando voz do dispositivo como fallback.';
  if (result.source === 'browser-fallback') return 'Áudio natural indisponível agora. Usando voz do dispositivo.';
  return fallback;
}

function CollapsibleSection({ id, title, icon, summary, open, onToggle, children }) {
  const Icon = icon;
  return <section className={`pillar-card lesson-collapsible-card listening-collapsible-card ${open ? 'is-open' : 'is-closed'}`} id={id}>
    <button className="lesson-collapsible-head listening-collapsible-head" type="button" onClick={onToggle} aria-expanded={open}>
      <span><Icon size={17} /> {title}</span><small>{summary}</small>{open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
    </button>
    {open ? <div className="lesson-collapsible-body">{children}</div> : null}
  </section>;
}

function DialogueTranscript({ dialogue }) {
  if (!dialogue.isDialogue) return null;
  return <div className="listening-dialogue-box">{dialogue.turns.map((turn) => <p key={`${turn.index}-${turn.speaker}`}><b>{turn.speaker}</b><span>{turn.text}</span><small>{turn.voiceName}</small></p>)}</div>;
}

export function ListeningLessonClean({ lesson }) {
  const [message, setMessage] = useState('Comece ouvindo sem abrir o texto. Depois confira a transcrição.');
  const [audioState, setAudioState] = useState('idle');
  const [answer, setAnswer] = useState(() => getLessonDraft(draftKey(lesson)));
  const [savedAt, setSavedAt] = useState('');
  const [completedAt, setCompletedAt] = useState('');
  const [shadowingIndex, setShadowingIndex] = useState(0);
  const [listenSegmentIndex, setListenSegmentIndex] = useState(0);
  const [hasListened, setHasListened] = useState(false);
  const [showSegmentText, setShowSegmentText] = useState(false);
  const [openSections, setOpenSections] = useState({ guide: true, transcript: false, concept: false, vocab: false, shadowing: true, answer: false });
  const refs = { guide: useRef(null), transcript: useRef(null), concept: useRef(null), vocab: useRef(null), shadowing: useRef(null), answer: useRef(null) };

  const rawListeningText = cleanText(lesson?.listeningText || lesson?.dialogueText || lesson?.text || '');
  const dialogue = useMemo(() => parseDialogueTurns(rawListeningText), [rawListeningText]);
  const transcript = useMemo(() => dialogue.isDialogue ? dialogue.turns.map((turn) => `${turn.speaker}: ${turn.text}`) : splitTranscript(rawListeningText), [dialogue, rawListeningText]);
  const prompts = useMemo(() => normalizeList(lesson?.prompts, ['Repeat the sentence out loud.', 'Spell your name slowly.', 'Say one short sentence about you.']), [lesson]);
  const sections = useMemo(() => normalizeSections(lesson), [lesson]);
  const vocabulary = useMemo(() => normalizeVocabulary(lesson), [lesson]);
  const shadowingLines = useMemo(() => shadowingFrom(dialogue.isDialogue ? dialogue.turns.map((turn) => turn.text) : transcript, prompts), [dialogue, transcript, prompts]);
  const audioText = dialogue.isDialogue ? dialogue.plainText : transcript.join(' ');
  const currentSegment = dialogue.isDialogue ? (dialogue.turns[listenSegmentIndex]?.text || dialogue.turns[0]?.text || '') : (transcript[listenSegmentIndex] || transcript[0] || '');
  const currentSegmentSpeaker = dialogue.isDialogue ? (dialogue.turns[listenSegmentIndex]?.speaker || dialogue.turns[0]?.speaker || '') : '';
  const currentShadowingLine = shadowingLines[shadowingIndex] || shadowingLines[0] || prompts[0];
  const renderReport = { ok: Boolean(transcript.length && audioText.length), transcriptLines: transcript.length, shadowingLines: shadowingLines.length, answersHidden: true, dialogue: dialogue.isDialogue, speakers: dialogue.speakers.length };

  useEffect(() => {
    function handleJump(event) {
      const map = { warmup: 'guide', core: 'transcript', speak: 'shadowing', review: 'answer' };
      const target = event?.detail?.section;
      if (target === 'practice') { document.querySelector('.lesson-practice-mount')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
      const id = map[target] || 'guide';
      setOpenSections((current) => ({ ...current, [id]: true }));
      requestAnimationFrame(() => refs[id]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
    window.addEventListener('fluency:lesson-jump', handleJump);
    return () => window.removeEventListener('fluency:lesson-jump', handleJump);
  }, []);

  function toggleSection(id) { setOpenSections((current) => ({ ...current, [id]: !current[id] })); }
  function openSection(id) { setOpenSections((current) => ({ ...current, [id]: true })); requestAnimationFrame(() => refs[id]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })); }
  function goToPractice() { document.querySelector('.lesson-practice-mount')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }

  async function playText({ text, label, style, segmentLongText = false, doneMessage, voiceName = 'Kore' }) {
    setAudioState('loading');
    setMessage(segmentLongText ? 'Preparando áudio em trechos...' : 'Preparando áudio...');
    const result = await playLearningAudio({ text, label, voiceName, style, preferNatural: true, allowBrowserFallback: true, segmentLongText });
    setAudioState('idle');
    setHasListened(Boolean(result.ok || result.partial));
    setMessage(audioMessage(result, doneMessage));
  }

  async function handleListen() {
    diagnostics.log(dialogue.isDialogue ? 'Listening: diálogo multi-voz iniciado.' : 'Listening: escuta principal iniciada.', 'info');
    setAudioState('loading');
    setMessage(dialogue.isDialogue ? 'Preparando diálogo multi-voz em áudio único...' : 'Preparando áudio em trechos...');
    const result = dialogue.isDialogue
      ? await playMultiSpeakerDialogue({ text: audioText, label: 'Listening · diálogo multi-voz' })
      : await playLearningAudio({ text: audioText, label: 'Listening · transcrição', voiceName: 'Kore', style: 'Natural English listening practice. Clear pronunciation, moderate pace, human rhythm.', preferNatural: true, allowBrowserFallback: true, segmentLongText: true });
    setAudioState('idle');
    setHasListened(Boolean(result.ok || result.partial));
    setMessage(audioMessage(result, 'Áudio principal iniciado.'));
  }

  function handleListenSegment() {
    const turn = dialogue.isDialogue ? dialogue.turns[listenSegmentIndex] : null;
    diagnostics.log(`Listening: trecho manual ${listenSegmentIndex + 1}/${transcript.length}.`, 'info');
    return playText({
      text: currentSegment,
      label: `Listening · trecho ${listenSegmentIndex + 1}/${transcript.length}`,
      voiceName: turn?.voiceName || 'Kore',
      doneMessage: `Trecho ${listenSegmentIndex + 1} iniciado.`,
      style: dialogue.isDialogue ? `Dialogue voice for ${turn?.speaker || 'speaker'}. Natural conversational English.` : 'Natural English listening practice. Clear pronunciation and moderate pace.',
    });
  }

  function handleShadowingListen() {
    return playText({ text: currentShadowingLine, label: `Shadowing · frase ${shadowingIndex + 1}`, doneMessage: 'Áudio de shadowing iniciado.', style: 'Natural pronunciation model for English shadowing. Clear and easy to repeat.' });
  }

  function handleStop() { stopLearningAudio(); stopMultiSpeakerAudio(); setAudioState('idle'); setMessage('Áudio interrompido.'); }
  function nextListenSegment() { setListenSegmentIndex((current) => transcript.length ? (current + 1) % transcript.length : 0); setShowSegmentText(false); setMessage('Trecho atualizado. Toque em “Ouvir trecho atual”.'); }
  function nextShadowingLine() { setShadowingIndex((current) => shadowingLines.length ? (current + 1) % shadowingLines.length : 0); setMessage('Frase de shadowing atualizada.'); }
  function handleSave() { saveLessonDraft({ lesson, answer }); const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); setSavedAt(time); setMessage(`Rascunho salvo às ${time}.`); diagnostics.log(`Listening: rascunho salvo para ${lesson?.title || 'aula atual'}.`, 'success'); }
  function handleComplete() { saveLessonDraft({ lesson, answer }); const result = completeLesson({ lesson, answers: { summary: answer, transcriptLines: transcript.length, shadowing: { currentPhrase: currentShadowingLine, totalPhrases: shadowingLines.length }, renderReport, updatedAt: new Date().toISOString() }, writtenAnswer: answer }); const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); setCompletedAt(time); setMessage(result.alreadyCompleted ? 'Listening já estava concluída. Progresso mantido.' : '+25 XP. Listening concluída e progresso salvo.'); }

  return <article className="pillar-lesson listening-lesson-v1 listening-light-layout listening-render-review-v1 listening-audio-stability-v2 listening-multi-speaker-v1 listening-blind-first-v2">
    <div ref={refs.guide}><section className="pillar-card listening-audio-card listening-focus-card listening-hero-card" id="lesson-guide">
      <div className="pillar-card-title"><Headphones size={17} /> Escuta guiada</div>
      <h2>{lesson?.title || 'Listening — A morning routine'}</h2>
      <p>{cleanText(lesson?.objective || 'Ouça primeiro sem ler. Depois use a transcrição para confirmar detalhes e repetir em voz alta.')}</p>
      {dialogue.isDialogue ? <div className="listening-speaker-strip">{dialogue.speakers.map((speaker) => <span key={speaker}><b>{speaker}</b><small>{dialogue.turns.find((turn) => turn.speaker === speaker)?.voiceName}</small></span>)}</div> : null}
      <div className="listening-flow-map" aria-label="Estrutura da aula Listening">{flow.map(([label, detail]) => <span key={label}><b>{label}</b><small>{detail}</small></span>)}</div>
      <div className="listening-player listening-primary-player"><button type="button" onClick={handleListen} disabled={audioState === 'loading'}><Play size={20} /></button><div><span /><span /><span /><span /><span /><span /></div><button type="button" onClick={handleStop}><Pause size={18} /></button></div>
      <small>{message}</small>
      <div className="listening-segment-card listening-blind-segment-card"><span>{dialogue.isDialogue ? `Controle por fala · ${currentSegmentSpeaker}` : 'Controle por trecho · útil no iPhone'}</span>{showSegmentText ? <p>{currentSegment}</p> : <p className="listening-hidden-line">Texto oculto para manter a primeira escuta sem leitura.</p>}<div><button type="button" onClick={handleListenSegment} disabled={audioState === 'loading'}><Play size={15} /> Ouvir trecho atual</button><button type="button" onClick={nextListenSegment}><Repeat2 size={15} /> Próximo trecho</button><button type="button" onClick={() => setShowSegmentText((value) => !value)}><Eye size={15} /> {showSegmentText ? 'Ocultar texto' : 'Mostrar texto'}</button></div></div>
      <div className="listening-quick-actions"><button type="button" onClick={() => openSection('transcript')}><Volume2 size={15} /> Conferir texto</button><button type="button" onClick={goToPractice}><Target size={15} /> Começar prática</button><button type="button" onClick={() => openSection('answer')}><CheckCircle2 size={15} /> Finalizar</button></div>
    </section></div>

    <section className="pillar-card listening-render-report-card"><div className="pillar-card-title"><ShieldCheck size={17} /> Render seguro Listening</div><div className="listening-report-grid"><span><b>{renderReport.ok ? 'OK' : 'atenção'}</b><small>render</small></span><span><b>{renderReport.transcriptLines}</b><small>{dialogue.isDialogue ? 'falas' : 'trechos'}</small></span><span><b>{renderReport.shadowingLines}</b><small>shadowing</small></span><span><b>{dialogue.isDialogue ? renderReport.speakers : 'não'}</b><small>personagens</small></span></div><p>{hasListened ? 'Áudio iniciado. Confira o texto ou avance para a prática.' : dialogue.isDialogue ? 'Diálogo detectado. Cada personagem usa voz própria quando o áudio natural estiver disponível.' : 'Transcrição começa fechada para proteger a escuta cega.'}</p></section>

    <div ref={refs.transcript}><CollapsibleSection id="lesson-transcript" title="Transcrição controlada" icon={Volume2} summary={openSections.transcript ? `${transcript.length} ${dialogue.isDialogue ? 'falas abertas' : 'trechos abertos'}` : 'fechada até você decidir conferir'} open={openSections.transcript} onToggle={() => toggleSection('transcript')}>
      {dialogue.isDialogue ? <DialogueTranscript dialogue={dialogue} /> : <div className="transcript-box compact listening-transcript-box">{transcript.map((line, index) => <p key={`${line}-${index}`}><b>{index + 1}</b>{line}</p>)}</div>}
    </CollapsibleSection></div>
    {sections.length ? <div ref={refs.concept}><CollapsibleSection id="lesson-concept" title="Conceito e explicação" icon={BookOpen} summary={`${sections.length} passos · apoio após a escuta`} open={openSections.concept} onToggle={() => toggleSection('concept')}><div className="lesson-section-stack compact concept-compact-list listening-concept-list">{sections.map((section, index) => <article className="lesson-content-block" key={`${section.title}-${index}`}><small>Passo {index + 1}</small><h3>{section.title}</h3>{section.content ? <p>{section.content}</p> : null}{section.examples.length ? <ul>{section.examples.map((example) => <li key={example}>{example}</li>)}</ul> : null}</article>)}</div></CollapsibleSection></div> : null}
    {vocabulary.length ? <div ref={refs.vocab}><CollapsibleSection id="lesson-vocab" title="Vocabulário da aula" icon={BookOpen} summary={`${vocabulary.length} palavras-chave`} open={openSections.vocab} onToggle={() => toggleSection('vocab')}><div className="lesson-vocabulary-grid compact listening-vocabulary-grid">{vocabulary.map((item, index) => <article className="lesson-vocab-card" key={`${item.word}-${index}`}><strong>{item.word || item.meaning}</strong>{item.meaning ? <span>{item.meaning}</span> : null}{item.example ? <p>{item.example}</p> : null}</article>)}</div></CollapsibleSection></div> : null}
    <div ref={refs.shadowing}><CollapsibleSection id="lesson-shadowing" title="Shadowing real" icon={Repeat2} summary={`frase ${shadowingIndex + 1}/${shadowingLines.length || 1}`} open={openSections.shadowing} onToggle={() => toggleSection('shadowing')}><div className="shadowing-card compact listening-shadowing-card"><span>Repita copiando ritmo, pausas e pronúncia</span><p>{currentShadowingLine}</p><div className="shadowing-actions"><button type="button" onClick={handleShadowingListen} disabled={audioState === 'loading'}><Play size={15} /> Ouvir frase</button><button type="button" onClick={nextShadowingLine}><Repeat2 size={15} /> Próxima</button></div></div></CollapsibleSection></div>
    <div ref={refs.answer}><CollapsibleSection id="lesson-answer" title="Finalizar aula" icon={Save} summary={completedAt ? `concluída às ${completedAt}` : savedAt ? `rascunho salvo às ${savedAt}` : 'último passo'} open={openSections.answer} onToggle={() => toggleSection('answer')}><div className="lesson-written-answer compact listening-final-card"><label htmlFor="listening-summary">Resumo rápido da escuta</label><textarea id="listening-summary" value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="Escreva uma frase do áudio, uma palavra nova ou um resumo curto do que você entendeu." /><button type="button" onClick={handleSave}><Save size={16} /> Salvar rascunho</button><button type="button" className="primary-action" onClick={handleComplete}><CheckCircle2 size={17} /> Concluir Listening</button></div></CollapsibleSection></div>
  </article>;
}
