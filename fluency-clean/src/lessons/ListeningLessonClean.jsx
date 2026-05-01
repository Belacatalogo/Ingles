import { useEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, CheckCircle2, ChevronDown, ChevronUp, Headphones, Pause, Play, Repeat2, Save, Volume2 } from 'lucide-react';
import { playLearningAudio, stopLearningAudio } from '../services/audioPlayback.js';
import { diagnostics } from '../services/diagnostics.js';
import { completeLesson, getLessonDraft, saveLessonDraft } from '../services/progressStore.js';

const fallbackTranscript = [
  'Hi, I am Ana. I listen and repeat.',
  'I spell my name A-N-A.',
  'The first letter is A.',
];

function cleanText(value) {
  return String(value ?? '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function getAudioMessage(result, naturalLabel = 'Áudio natural iniciado.') {
  if (!result?.ok) return result?.error || 'Não foi possível reproduzir áudio.';
  if (result.source === 'cache') return 'Áudio natural carregado do cache.';
  if (result.source === 'segmented-cache') return `Áudio natural em ${result.segments || 'vários'} trechos, usando cache.`;
  if (result.source === 'segmented-gemini') return `Áudio natural em ${result.segments || 'vários'} trechos iniciado.`;
  if (result.source === 'segmented-browser-fallback') return 'Áudio em trechos usando voz do dispositivo como fallback.';
  if (result.source === 'browser-fallback') return 'Áudio natural indisponível agora. Usando voz do dispositivo.';
  return naturalLabel;
}

function splitTranscript(value) {
  const clean = cleanText(value);
  if (!clean) return fallbackTranscript;
  const paragraphs = clean.split(/\n\s*\n+/).map((item) => item.trim()).filter(Boolean);
  if (paragraphs.length > 1) return paragraphs;
  const sentences = clean.split(/(?<=[.!?])\s+/).map((item) => item.trim()).filter(Boolean);
  return sentences.length ? sentences.slice(0, 12) : fallbackTranscript;
}

function normalizePrompts(lesson) {
  const prompts = Array.isArray(lesson?.prompts) ? lesson.prompts : [];
  if (prompts.length) return prompts.map(cleanText).filter(Boolean);
  return ['Repeat the sentence out loud.', 'Spell your name slowly.', 'Say one short sentence about you.'];
}

function normalizeSections(lesson) {
  const sections = Array.isArray(lesson?.sections) ? lesson.sections : [];
  return sections.map((section, index) => ({
    title: cleanText(section?.title || section?.heading || `Parte ${index + 1}`),
    content: cleanText(section?.content || section?.text || section?.body || section?.explanation),
    examples: Array.isArray(section?.examples) ? section.examples.map(cleanText).filter(Boolean) : [],
  })).filter((section) => section.title || section.content);
}

function normalizeVocabulary(lesson) {
  const vocabulary = Array.isArray(lesson?.vocabulary) ? lesson.vocabulary : [];
  return vocabulary.map((item) => ({
    word: cleanText(item?.word || item?.term),
    meaning: cleanText(item?.meaning || item?.translation || item?.definition),
    example: cleanText(item?.example || item?.sentence),
  })).filter((item) => item.word || item.meaning || item.example);
}

function normalizeShadowingLines(transcript, prompts) {
  const lines = transcript
    .flatMap((line) => cleanText(line).split(/(?<=[.!?])\s+/))
    .map((line) => line.trim())
    .filter((line) => line.length >= 6 && line.length <= 120)
    .slice(0, 8);
  return lines.length ? lines : prompts.map(cleanText).filter(Boolean).slice(0, 5);
}

function writtenDraftKey(lesson) {
  return lesson?.id || lesson?.title || 'listening';
}

function CollapsibleSection({ id, title, icon, summary, open, onToggle, children }) {
  const Icon = icon;
  return (
    <section className={`pillar-card lesson-collapsible-card ${open ? 'is-open' : 'is-closed'}`} id={id}>
      <button className="lesson-collapsible-head" type="button" onClick={onToggle} aria-expanded={open}>
        <span><Icon size={17} /> {title}</span>
        <small>{summary}</small>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open ? <div className="lesson-collapsible-body">{children}</div> : null}
    </section>
  );
}

export function ListeningLessonClean({ lesson }) {
  const [message, setMessage] = useState('Ouça o áudio natural antes de abrir a transcrição.');
  const [audioState, setAudioState] = useState('idle');
  const [answer, setAnswer] = useState(() => getLessonDraft(writtenDraftKey(lesson)));
  const [savedAt, setSavedAt] = useState('');
  const [completedAt, setCompletedAt] = useState('');
  const [shadowingIndex, setShadowingIndex] = useState(0);
  const [openSections, setOpenSections] = useState({ guide: true, transcript: true, concept: false, vocab: false, shadowing: false, answer: false });
  const refs = { guide: useRef(null), transcript: useRef(null), concept: useRef(null), vocab: useRef(null), shadowing: useRef(null), answer: useRef(null) };

  const transcript = useMemo(() => splitTranscript(lesson?.listeningText), [lesson?.listeningText]);
  const prompts = useMemo(() => normalizePrompts(lesson), [lesson]);
  const sections = useMemo(() => normalizeSections(lesson), [lesson]);
  const vocabulary = useMemo(() => normalizeVocabulary(lesson), [lesson]);
  const shadowingLines = useMemo(() => normalizeShadowingLines(transcript, prompts), [transcript, prompts]);
  const audioText = transcript.join(' ');
  const currentShadowingLine = shadowingLines[shadowingIndex] || shadowingLines[0] || prompts[0];

  useEffect(() => {
    function handleJump(event) {
      const target = event?.detail?.section;
      const map = { warmup: 'guide', core: 'transcript', practice: 'practice-launcher', speak: 'shadowing', review: 'answer' };
      const id = map[target] || 'guide';
      if (id === 'practice-launcher') {
        document.querySelector('.lesson-practice-mount')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      setOpenSections((current) => ({ ...current, [id]: true }));
      requestAnimationFrame(() => refs[id]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
    window.addEventListener('fluency:lesson-jump', handleJump);
    return () => window.removeEventListener('fluency:lesson-jump', handleJump);
  }, []);

  function toggleSection(id) {
    setOpenSections((current) => ({ ...current, [id]: !current[id] }));
  }

  async function handleListen() {
    diagnostics.log('Clique recebido no botão Ouvir da aula Listening.', 'info');
    setAudioState('loading');
    setMessage(audioText.length > 360 ? 'Preparando áudio natural em trechos...' : 'Preparando áudio natural Gemini...');
    const result = await playLearningAudio({
      text: audioText,
      label: 'Listening · transcrição',
      voiceName: 'Kore',
      style: 'Natural, warm teacher voice for A1 English listening practice. Clear pronunciation, human rhythm, not robotic.',
      preferNatural: true,
      allowBrowserFallback: true,
      segmentLongText: true,
    });
    setAudioState('idle');
    setMessage(getAudioMessage(result));
  }

  async function handleShadowingListen() {
    const text = cleanText(currentShadowingLine);
    if (!text) {
      setMessage('Nenhuma frase de shadowing disponível nesta aula.');
      return;
    }
    diagnostics.log(`Shadowing iniciado: frase ${shadowingIndex + 1}/${shadowingLines.length}.`, 'info');
    setAudioState('loading');
    setMessage('Preparando áudio natural para shadowing...');
    const result = await playLearningAudio({
      text,
      label: `Shadowing · frase ${shadowingIndex + 1}`,
      voiceName: 'Kore',
      style: 'Natural pronunciation model for English shadowing practice. Clear, slow enough to repeat, human rhythm.',
      preferNatural: true,
      allowBrowserFallback: true,
      segmentLongText: false,
    });
    setAudioState('idle');
    setMessage(getAudioMessage(result, 'Áudio natural de shadowing iniciado.'));
  }

  function handleStop() {
    stopLearningAudio();
    setAudioState('idle');
    setMessage('Áudio interrompido.');
  }

  function nextShadowingLine() {
    setShadowingIndex((current) => {
      const nextIndex = shadowingLines.length ? (current + 1) % shadowingLines.length : 0;
      diagnostics.log(`Shadowing: próxima frase ${nextIndex + 1}/${shadowingLines.length || 1}.`, 'info');
      return nextIndex;
    });
    setMessage('Frase de shadowing atualizada. Toque em "Ouvir frase" e repita em voz alta.');
  }

  function handleSave() {
    saveLessonDraft({ lesson, answer });
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSavedAt(time);
    setMessage(`Rascunho salvo às ${time}.`);
    diagnostics.log(`Listening: rascunho salvo para ${lesson?.title || 'aula atual'}.`, 'success');
  }

  function handleComplete() {
    saveLessonDraft({ lesson, answer });
    const result = completeLesson({
      lesson,
      answers: {
        summary: answer,
        transcriptLines: transcript.length,
        shadowing: { currentPhrase: currentShadowingLine, totalPhrases: shadowingLines.length },
        updatedAt: new Date().toISOString(),
      },
      writtenAnswer: answer,
    });
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCompletedAt(time);
    setMessage(result.alreadyCompleted ? 'Listening já estava concluída. Progresso mantido.' : '+25 XP. Listening concluída e progresso salvo.');
    diagnostics.log(result.alreadyCompleted ? 'Listening já estava concluída; progresso mantido.' : 'Listening concluída com progresso real salvo.', 'success');
  }

  return (
    <article className="pillar-lesson listening-lesson-v1 listening-light-layout">
      <div ref={refs.guide}>
        <section className="pillar-card listening-audio-card listening-focus-card" id="lesson-guide">
          <div className="pillar-card-title"><Headphones size={17} /> Escuta guiada</div>
          <h2>{lesson?.title || 'Listening — A morning routine'}</h2>
          <p>{cleanText(lesson?.objective || 'Ouça primeiro sem ler. Depois use a transcrição para confirmar detalhes e repetir em voz alta.')}</p>
          <div className="listening-player">
            <button type="button" onClick={handleListen} disabled={audioState === 'loading'} aria-label="Ouvir áudio natural da aula"><Play size={20} /></button>
            <div><span /><span /><span /><span /><span /><span /></div>
            <button type="button" onClick={handleStop} aria-label="Parar áudio"><Pause size={18} /></button>
          </div>
          <small>{message}</small>
        </section>
      </div>

      <div ref={refs.transcript}>
        <CollapsibleSection id="lesson-transcript" title="Texto da aula" icon={Volume2} summary={`${transcript.length} trechos`} open={openSections.transcript} onToggle={() => toggleSection('transcript')}>
          <div className="transcript-box compact">
            {transcript.map((line, index) => <p key={`${line}-${index}`}><b>{index + 1}</b>{line}</p>)}
          </div>
        </CollapsibleSection>
      </div>

      {sections.length ? (
        <div ref={refs.concept}>
          <CollapsibleSection id="lesson-concept" title="Conceito e explicação" icon={BookOpen} summary={`${sections.length} passos · fechado para deixar a tela leve`} open={openSections.concept} onToggle={() => toggleSection('concept')}>
            <div className="lesson-section-stack compact concept-compact-list">
              {sections.map((section, index) => (
                <article className="lesson-content-block" key={`${section.title}-${index}`}>
                  <small>Passo {index + 1}</small>
                  <h3>{section.title}</h3>
                  {section.content ? <p>{section.content}</p> : null}
                  {section.examples.length ? <ul>{section.examples.map((example) => <li key={example}>{example}</li>)}</ul> : null}
                </article>
              ))}
            </div>
          </CollapsibleSection>
        </div>
      ) : null}

      {vocabulary.length ? (
        <div ref={refs.vocab}>
          <CollapsibleSection id="lesson-vocab" title="Vocabulário da aula" icon={BookOpen} summary={`${vocabulary.length} palavras-chave`} open={openSections.vocab} onToggle={() => toggleSection('vocab')}>
            <div className="lesson-vocabulary-grid compact">
              {vocabulary.map((item, index) => (
                <article className="lesson-vocab-card" key={`${item.word}-${index}`}>
                  <strong>{item.word || item.meaning}</strong>
                  {item.meaning ? <span>{item.meaning}</span> : null}
                  {item.example ? <p>{item.example}</p> : null}
                </article>
              ))}
            </div>
          </CollapsibleSection>
        </div>
      ) : null}

      <div ref={refs.shadowing}>
        <CollapsibleSection id="lesson-shadowing" title="Shadowing real" icon={Repeat2} summary={`frase ${shadowingIndex + 1}/${shadowingLines.length || 1}`} open={openSections.shadowing} onToggle={() => toggleSection('shadowing')}>
          <div className="shadowing-card compact">
            <p>{currentShadowingLine}</p>
            <div className="shadowing-actions">
              <button type="button" onClick={handleShadowingListen} disabled={audioState === 'loading'}><Play size={15} /> Ouvir frase</button>
              <button type="button" onClick={nextShadowingLine}><Repeat2 size={15} /> Próxima</button>
            </div>
            <small>Repita em voz alta copiando ritmo, pausas e pronúncia.</small>
          </div>
        </CollapsibleSection>
      </div>

      <div ref={refs.answer}>
        <CollapsibleSection id="lesson-answer" title="Finalizar aula" icon={Save} summary={completedAt ? `concluída às ${completedAt}` : savedAt ? `rascunho salvo às ${savedAt}` : 'último passo'} open={openSections.answer} onToggle={() => toggleSection('answer')}>
          <div className="lesson-written-answer compact">
            <textarea value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="Escreva um resumo curto do que você entendeu, ou uma frase nova usando o conteúdo da aula." />
            <button type="button" onClick={handleSave}><Save size={16} /> Salvar rascunho</button>
            <button type="button" className="primary-action" onClick={handleComplete}><CheckCircle2 size={17} /> Concluir Listening</button>
          </div>
        </CollapsibleSection>
      </div>
    </article>
  );
}
