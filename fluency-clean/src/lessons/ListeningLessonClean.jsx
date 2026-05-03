import { useEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, CheckCircle2, ChevronDown, ChevronUp, Headphones, Pause, Play, Save, ShieldCheck, Target, Volume2 } from 'lucide-react';
import { playLearningAudio, stopLearningAudio } from '../services/audioPlayback.js';
import { parseDialogueTurns, prepareMultiSpeakerDialogue, playPreparedMultiSpeakerDialogue, stopMultiSpeakerAudio } from '../services/multiSpeakerAudio.js';
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

const listeningFlowSteps = [
  { id: 'listening-start', label: 'Preparar' },
  { id: 'listening-first-audio', label: '1ª escuta' },
  { id: 'listening-comprehension', label: 'Compreensão' },
  { id: 'listening-transcript-step', label: 'Texto' },
  { id: 'listening-vocab-step', label: 'Vocabulário' },
  { id: 'listening-shadowing-step', label: 'Shadowing' },
  { id: 'listening-answer-step', label: 'Produção' },
  { id: 'listening-finish-step', label: 'Concluir' },
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
  if (!result?.ok) return result?.error || 'Não foi possível reproduzir áudio.';
  if (result.source === 'multi-speaker-merged-cache') return `Áudio pronto carregado do cache final: ${result.speakers} personagens, ${result.turns} falas.`;
  if (result.source === 'multi-speaker-merged-gemini') return `Diálogo multi-voz preparado e iniciado: ${result.speakers} personagens, ${result.turns} falas.`;
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
      <span><Icon size={17} /> {title}</span><small>{summary}</small>{open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button>
    {open ? <div className="lesson-collapsible-body">{children}</div> : null}
  </section>;
}

function DialogueTranscript({ dialogue }) {
  if (!dialogue.isDialogue) return null;
  return <div className="listening-dialogue-box">{dialogue.turns.map((turn) => <p key={`${turn.index}-${turn.speaker}`}><b>{turn.speaker}</b><span>{turn.text}</span><small>{turn.voiceName}</small></p>)}</div>;
}

function ListeningStepper({ activeStep, completed, onJump }) {
  const activeStepIndex = Math.max(0, listeningFlowSteps.findIndex((step) => step.id === activeStep));
  return (
    <section className="lesson-type-stepper-card listening-stepper-card" aria-label="Etapas da aula Listening">
      <div className="lesson-type-stepper-header">
        <strong>Etapas da Listening</strong>
        <span>{activeStepIndex + 1}/{listeningFlowSteps.length}</span>
      </div>
      <div className="lesson-type-stepper-flow listening-stepper-flow">
        {listeningFlowSteps.map((step, index) => {
          const done = completed || index < activeStepIndex;
          const active = step.id === activeStep;
          return (
            <button type="button" key={step.id} className={done ? 'done' : active ? 'active' : ''} onClick={() => onJump(step.id)}>
              <span>{done ? '✓' : index + 1}</span>
              <strong>{step.label}</strong>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function ListeningLessonClean({ lesson }) {
  const [message, setMessage] = useState('');
  const [audioState, setAudioState] = useState('idle');
  const [answer, setAnswer] = useState(() => getLessonDraft(draftKey(lesson)));
  const [savedAt, setSavedAt] = useState('');
  const [completedAt, setCompletedAt] = useState('');
  const [shadowingIndex, setShadowingIndex] = useState(0);
  const [hasListened, setHasListened] = useState(false);
  const [activeStep, setActiveStep] = useState('listening-start');
  const [openSections, setOpenSections] = useState({ guide: true, transcript: false, concept: false, vocab: false, shadowing: true, answer: false });
  const refs = { guide: useRef(null), transcript: useRef(null), concept: useRef(null), vocab: useRef(null), shadowing: useRef(null), answer: useRef(null), finish: useRef(null) };

  const rawListeningText = cleanText(lesson?.listeningText || lesson?.dialogueText || lesson?.text || '');
  const dialogue = useMemo(() => parseDialogueTurns(rawListeningText), [rawListeningText]);
  const transcript = useMemo(() => dialogue.isDialogue ? dialogue.turns.map((turn) => `${turn.speaker}: ${turn.text}`) : splitTranscript(rawListeningText), [dialogue, rawListeningText]);
  const prompts = useMemo(() => normalizeList(lesson?.prompts, ['Repeat the sentence out loud.', 'Spell your name slowly.', 'Say one short sentence about you.']), [lesson]);
  const sections = useMemo(() => normalizeSections(lesson), [lesson]);
  const vocabulary = useMemo(() => normalizeVocabulary(lesson), [lesson]);
  const shadowingLines = useMemo(() => shadowingFrom(dialogue.isDialogue ? dialogue.turns.map((turn) => turn.text) : transcript, prompts), [dialogue, transcript, prompts]);
  const audioText = dialogue.isDialogue ? dialogue.plainText : transcript.join(' ');
  const currentShadowingLine = shadowingLines[shadowingIndex] || shadowingLines[0] || prompts[0];
  const renderReport = { ok: Boolean(transcript.length && audioText.length), transcriptLines: transcript.length, shadowingLines: shadowingLines.length, answersHidden: true, dialogue: dialogue.isDialogue, speakers: dialogue.speakers.length };

  useEffect(() => {
    setActiveStep('listening-start');
  }, [lesson?.id, lesson?.title]);

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

  function jumpToListeningStep(stepId) {
    setActiveStep(stepId);
    const map = {
      'listening-start': 'guide',
      'listening-first-audio': 'guide',
      'listening-comprehension': 'concept',
      'listening-transcript-step': 'transcript',
      'listening-vocab-step': 'vocab',
      'listening-shadowing-step': 'shadowing',
      'listening-answer-step': 'answer',
      'listening-finish-step': 'finish',
    };
    const section = map[stepId];
    if (section && section !== 'finish') setOpenSections((current) => ({ ...current, [section]: true }));
    requestAnimationFrame(() => refs[section]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  function goToNextListeningStep() {
    const activeIndex = Math.max(0, listeningFlowSteps.findIndex((step) => step.id === activeStep));
    const next = listeningFlowSteps[Math.min(activeIndex + 1, listeningFlowSteps.length - 1)];
    if (next) jumpToListeningStep(next.id);
  }

  async function playText({ text, label, style, segmentLongText = false, doneMessage, voiceName = 'Kore' }) {
    setAudioState('loading');
    setMessage(segmentLongText ? 'Preparando áudio em trechos...' : 'Preparando áudio...');
    const result = await playLearningAudio({ text, label, voiceName, style, preferNatural: true, allowBrowserFallback: true, segmentLongText });
    setAudioState('idle');
    setHasListened(Boolean(result.ok || result.partial));
    setMessage(audioMessage(result, doneMessage));
  }

  async function handleListen() {
    diagnostics.log(dialogue.isDialogue ? 'Listening: preparando diálogo multi-voz.' : 'Listening: escuta principal iniciada.', 'info');
    setAudioState('loading');
    setActiveStep('listening-first-audio');
    setMessage(dialogue.isDialogue ? 'Preparando áudio. Quando ficar pronto, toque em Reproduzir.' : 'Preparando áudio em trechos...');
    const result = dialogue.isDialogue
      ? await prepareMultiSpeakerDialogue({ text: audioText, label: 'Listening · diálogo multi-voz' })
      : await playLearningAudio({ text: audioText, label: 'Listening · transcrição', voiceName: 'Kore', style: 'Natural English listening practice. Clear pronunciation, moderate pace, human rhythm.', preferNatural: true, allowBrowserFallback: true, segmentLongText: true });

    if (dialogue.isDialogue && result.ok) {
      setAudioState('ready');
      setHasListened(false);
      setMessage(result.source === 'multi-speaker-merged-cache' ? 'Áudio pronto no cache. Toque em Reproduzir.' : 'Áudio preparado. Toque em Reproduzir para iniciar sem bloqueio do iPhone.');
      return;
    }

    setAudioState('idle');
    setHasListened(Boolean(result.ok || result.partial));
    setMessage(audioMessage(result, 'Áudio principal iniciado.'));
  }

  async function handlePlayPrepared() {
    setAudioState('playing');
    setActiveStep('listening-first-audio');
    const result = await playPreparedMultiSpeakerDialogue();
    setAudioState('idle');
    setHasListened(Boolean(result.ok));
    setMessage(audioMessage(result, 'Áudio iniciado.'));
  }

  function handleShadowingListen() {
    setActiveStep('listening-shadowing-step');
    return playText({ text: currentShadowingLine, label: `Shadowing · frase ${shadowingIndex + 1}`, doneMessage: 'Áudio de shadowing iniciado.', style: 'Natural pronunciation model for English shadowing. Clear and easy to repeat.' });
  }

  function handleStop() { stopLearningAudio(); stopMultiSpeakerAudio(); setAudioState('idle'); setMessage('Áudio interrompido.'); }
  function nextShadowingLine() { setShadowingIndex((current) => shadowingLines.length ? (current + 1) % shadowingLines.length : 0); setMessage('Frase de shadowing atualizada.'); }
  function handleSave() { saveLessonDraft({ lesson, answer }); const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); setSavedAt(time); setMessage(`Rascunho salvo às ${time}.`); diagnostics.log(`Listening: rascunho salvo para ${lesson?.title || 'aula atual'}.`, 'success'); }
  function handleComplete() { saveLessonDraft({ lesson, answer }); const result = completeLesson({ lesson, answers: { summary: answer, transcriptLines: transcript.length, shadowing: { currentPhrase: currentShadowingLine, totalPhrases: shadowingLines.length }, renderReport, updatedAt: new Date().toISOString() }, writtenAnswer: answer }); const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); setCompletedAt(time); setActiveStep('listening-finish-step'); setMessage(result.alreadyCompleted ? 'Listening já estava concluída. Progresso mantido.' : '+25 XP. Listening concluída e progresso salvo.'); }

  return <article className="pillar-lesson listening-lesson-v1 listening-light-layout listening-render-review-v1 listening-audio-stability-v2 listening-multi-speaker-v1 listening-blind-first-v2 listening-merged-cache-v1 listening-clean-player-v3 listening-stepper-real-v1">
    <ListeningStepper activeStep={activeStep} completed={Boolean(completedAt)} onJump={jumpToListeningStep} />

    <div ref={refs.guide} className="listening-step-panel" id="listening-start" data-listening-step-active={activeStep === 'listening-start' || activeStep === 'listening-first-audio'}><section className="pillar-card listening-audio-card listening-focus-card listening-hero-card" id="lesson-guide">
      <div className="pillar-card-title"><Headphones size={17} /> Escuta guiada</div>
      <h2>{lesson?.title || 'Listening — A morning routine'}</h2>
      <p>{cleanText(lesson?.objective || 'Ouça primeiro sem ler. Depois use a transcrição para confirmar detalhes e repetir em voz alta.')}</p>
      {dialogue.isDialogue ? <div className="listening-speaker-strip">{dialogue.speakers.map((speaker) => <span key={speaker}><b>{speaker}</b><small>{dialogue.turns.find((turn) => turn.speaker === speaker)?.voiceName}</small></span>)}</div> : null}
      <div className="listening-flow-map" aria-label="Estrutura da aula Listening">{flow.map(([label, detail]) => <span key={label}><b>{label}</b><small>{detail}</small></span>)}</div>
      <div className="listening-player listening-primary-player"><button type="button" onClick={audioState === 'ready' ? handlePlayPrepared : handleListen} disabled={audioState === 'loading' || audioState === 'playing'}><Play size={20} /></button><div><span /><span /><span /><span /><span /><span /></div><button type="button" onClick={handleStop}><Pause size={18} /></button></div>
      {message ? <small>{message}</small> : null}
      <p className="listening-blind-note">Primeira escuta sem leitura. Abra o texto só depois de ouvir.</p>
      <div className="listening-quick-actions"><button type="button" onClick={() => openSection('transcript')}><Volume2 size={15} /> Conferir texto</button><button type="button" onClick={goToPractice}><Target size={15} /> Começar prática</button><button type="button" onClick={() => openSection('answer')}><CheckCircle2 size={15} /> Finalizar</button></div>
      <button type="button" className="lesson-type-next-step-button" onClick={goToNextListeningStep}>Avançar na Listening</button>
    </section></div>

    <section className="pillar-card listening-render-report-card listening-step-panel" id="listening-comprehension" data-listening-step-active={activeStep === 'listening-comprehension'}><div className="pillar-card-title"><ShieldCheck size={17} /> Compreensão auditiva</div><div className="listening-report-grid"><span><b>{renderReport.ok ? 'OK' : 'atenção'}</b><small>render</small></span><span><b>{renderReport.transcriptLines}</b><small>{dialogue.isDialogue ? 'falas' : 'trechos'}</small></span><span><b>{renderReport.shadowingLines}</b><small>shadowing</small></span><span><b>{dialogue.isDialogue ? renderReport.speakers : 'não'}</b><small>personagens</small></span></div><p>{hasListened ? 'Áudio iniciado. Tente lembrar a ideia geral antes de abrir o texto.' : dialogue.isDialogue ? 'Diálogo detectado. Ouça primeiro para identificar personagens e intenção.' : 'Primeiro escute sem ler. Depois confira o texto.'}</p><button type="button" className="lesson-type-next-step-button" onClick={goToNextListeningStep}>Abrir texto/transcrição</button></section>

    <div ref={refs.transcript} className="listening-step-panel" id="listening-transcript-step" data-listening-step-active={activeStep === 'listening-transcript-step'}><CollapsibleSection id="lesson-transcript" title="Transcrição controlada" icon={Volume2} summary={openSections.transcript ? `${transcript.length} ${dialogue.isDialogue ? 'falas abertas' : 'trechos abertos'}` : 'fechada até você decidir conferir'} open={openSections.transcript} onToggle={() => toggleSection('transcript')}>
      {dialogue.isDialogue ? <DialogueTranscript dialogue={dialogue} /> : <div className="transcript-box compact listening-transcript-box">{transcript.map((line, index) => <p key={`${line}-${index}`}><b>{index + 1}</b>{line}</p>)}</div>}
      <button type="button" className="lesson-type-next-step-button" onClick={goToNextListeningStep}>Ir para vocabulário</button>
    </CollapsibleSection></div>
    {sections.length ? <div ref={refs.concept}><CollapsibleSection id="lesson-concept" title="Conceito e explicação" icon={BookOpen} summary={`${sections.length} passos · apoio após a escuta`} open={openSections.concept} onToggle={() => toggleSection('concept')}><div className="lesson-section-stack compact concept-compact-list listening-concept-list">{sections.map((section, index) => <article className="lesson-content-block" key={`${section.title}-${index}`}><small>Passo {index + 1}</small><h3>{section.title}</h3>{section.content ? <p>{section.content}</p> : null}{section.examples.length ? <ul>{section.examples.map((example) => <li key={example}>{example}</li>)}</ul> : null}</article>)}</div></CollapsibleSection></div> : null}
    {vocabulary.length ? <div ref={refs.vocab} className="listening-step-panel" id="listening-vocab-step" data-listening-step-active={activeStep === 'listening-vocab-step'}><CollapsibleSection id="lesson-vocab" title="Vocabulário da aula" icon={BookOpen} summary={`${vocabulary.length} palavras-chave`} open={openSections.vocab} onToggle={() => toggleSection('vocab')}><div className="lesson-vocabulary-grid compact listening-vocabulary-grid">{vocabulary.map((item, index) => <article className="lesson-vocab-card" key={`${item.word}-${index}`}><strong>{item.word || item.meaning}</strong>{item.meaning ? <span>{item.meaning}</span> : null}{item.example ? <p>{item.example}</p> : null}</article>)}</div><button type="button" className="lesson-type-next-step-button" onClick={goToNextListeningStep}>Ir para shadowing</button></CollapsibleSection></div> : null}
    <div ref={refs.shadowing} className="listening-step-panel" id="listening-shadowing-step" data-listening-step-active={activeStep === 'listening-shadowing-step'}><CollapsibleSection id="lesson-shadowing" title="Shadowing real" icon={Headphones} summary={`frase ${shadowingIndex + 1}/${shadowingLines.length || 1}`} open={openSections.shadowing} onToggle={() => toggleSection('shadowing')}><div className="shadowing-card compact listening-shadowing-card"><span>Repita copiando ritmo, pausas e pronúncia</span><p>{currentShadowingLine}</p><div className="shadowing-actions"><button type="button" onClick={handleShadowingListen} disabled={audioState === 'loading'}><Play size={15} /> Ouvir frase</button><button type="button" onClick={nextShadowingLine}>Próxima</button></div></div><button type="button" className="lesson-type-next-step-button" onClick={goToNextListeningStep}>Ir para produção</button></CollapsibleSection></div>
    <div ref={refs.answer} className="listening-step-panel" id="listening-answer-step" data-listening-step-active={activeStep === 'listening-answer-step'}><CollapsibleSection id="lesson-answer" title="Finalizar aula" icon={Save} summary={completedAt ? `concluída às ${completedAt}` : savedAt ? `rascunho salvo às ${savedAt}` : 'último passo'} open={openSections.answer} onToggle={() => toggleSection('answer')}><div className="lesson-written-answer compact listening-final-card"><label htmlFor="listening-summary">Resumo rápido da escuta</label><textarea id="listening-summary" value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="Escreva uma frase do áudio, uma palavra nova ou um resumo curto do que você entendeu." /><button type="button" onClick={handleSave}><Save size={16} /> Salvar rascunho</button><button type="button" className="primary-action" onClick={handleComplete}><CheckCircle2 size={17} /> Concluir Listening</button></div></CollapsibleSection></div>
    <section ref={refs.finish} className="listening-section-card listening-step-panel listening-finish-card" id="listening-finish-step" data-listening-step-active={activeStep === 'listening-finish-step'}><div className="pillar-card-title"><CheckCircle2 size={17} /> Depois da Listening</div><p>A aula de Listening segue escuta primeiro, conferência depois, shadowing e produção curta. A transcrição continua controlada para proteger a escuta real.</p></section>
  </article>;
}
