import { useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, CopyCheck, FileQuestion, Headphones, Lightbulb, Loader2, MessageSquareText, SearchCheck, Target } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { ProgressPill } from '../components/ui/ProgressPill.jsx';
import { playLearningAudio } from '../services/audioPlayback.js';
import { completeLesson, getLessonDraft, isLessonCompleted, saveLessonDraft } from '../services/progressStore.js';

function clean(value) {
  return String(value ?? '').replace(/\*\*(.*?)\*\*/g, '$1').replace(/\s+([,.!?;:])/g, '$1').replace(/([.!?])(?=[A-ZÁÉÍÓÚÂÊÔÃÕ])/g, '$1 ').trim();
}
function list(value) { return Array.isArray(value) ? value : []; }
function rawOf(lesson) { return lesson?.raw && typeof lesson.raw === 'object' ? lesson.raw : {}; }
function first(...values) { for (const value of values) { const text = clean(value); if (text) return text; } return ''; }
function isFakeText(value) { const text = clean(value).toLowerCase(); return !text || ['exemplo de texto para escuta.', 'exemplo de texto para escuta', 'example listening text.', 'main text', 'texto principal'].includes(text); }

function getMainText(lesson) {
  const raw = rawOf(lesson);
  const candidates = [lesson?.readingText, lesson?.reading_text, lesson?.mainText, lesson?.main_text, lesson?.text, lesson?.story, lesson?.article, lesson?.passage, raw.readingText, raw.reading_text, raw.mainText, raw.main_text, raw.text, raw.story, raw.article, raw.passage, lesson?.listeningText, raw.listeningText, raw.transcript];
  for (const candidate of candidates) { const text = clean(candidate); if (text && !isFakeText(text)) return text; }
  return '';
}

function splitParagraphs(text) {
  const value = clean(text);
  if (!value) return [];
  const blocks = value.split(/\n\s*\n+/).map(clean).filter(Boolean);
  if (blocks.length > 1) return blocks;
  return value.split(/(?<=[.!?])\s+(?=[A-Z])/).reduce((items, sentence) => {
    const current = items[items.length - 1] || '';
    if (!current || current.length > 320) items.push(clean(sentence));
    else items[items.length - 1] = `${current} ${clean(sentence)}`.trim();
    return items;
  }, []).filter(Boolean);
}

function ptQuestion(question, skill) {
  const q = clean(question);
  if (!q) return 'Qual alternativa responde melhor ao texto?';
  if (/[áéíóúãõç]|qual|quem|onde|quando|por que|o que|como/i.test(q)) return q;
  if (/^what is the main idea/i.test(q)) return 'Qual é a ideia principal do texto?';
  let match = q.match(/^what does ([A-Z][A-Za-zÀ-ÿ]*) write/i); if (match) return `O que ${match[1]} escreve?`;
  match = q.match(/^what does ([A-Z][A-Za-zÀ-ÿ]*) do when/i); if (match) return `O que ${match[1]} faz nessa situação?`;
  match = q.match(/^what does ([A-Z][A-Za-zÀ-ÿ]*)/i); if (match) return `O que ${match[1]} faz no texto?`;
  match = q.match(/^why does ([A-Z][A-Za-zÀ-ÿ]*)/i); if (match) return `Por que ${match[1]} faz isso?`;
  if (/where/i.test(q)) return 'Onde isso acontece no texto?';
  if (/when/i.test(q)) return 'Quando isso acontece no texto?';
  if (/who/i.test(q)) return 'Quem aparece no texto?';
  if (/how many/i.test(q)) return 'Qual quantidade aparece no texto?';
  if (/inference/i.test(skill)) return 'O que dá para concluir a partir do texto?';
  return 'Qual alternativa responde corretamente ao texto?';
}

function optionList(item) {
  return [...new Set(list(item?.options || item?.choices || item?.alternatives).map((option) => clean(typeof option === 'string' ? option : option?.text || option?.label || option?.value)).filter(Boolean))].slice(0, 4);
}
function sourceQuestions(lesson) {
  const raw = rawOf(lesson);
  return list(lesson?.readingQuestions).length ? lesson.readingQuestions : list(raw.readingQuestions).length ? raw.readingQuestions : list(lesson?.questions).length ? lesson.questions : list(raw.questions).length ? raw.questions : list(lesson?.exercises).length ? lesson.exercises : list(raw.exercises);
}
function buildQuestions(lesson, paragraphs) {
  return sourceQuestions(lesson).map((item, index) => {
    const skill = clean(item?.skill || item?.type || (index === 0 ? 'main_idea' : 'detail'));
    const answer = first(item?.answer, item?.correctAnswer, item?.correct);
    const evidence = first(item?.evidence, item?.quote, item?.reference) || paragraphs.find((p) => answer && p.toLowerCase().includes(answer.toLowerCase())) || '';
    return { index, skill, questionPt: ptQuestion(first(item?.questionPt, item?.question_pt, item?.questionPortuguese, item?.question), skill), options: optionList(item), answer, evidence, explanation: first(item?.explanationPt, item?.explanation_pt, item?.explanation, item?.feedback) };
  }).filter((item) => item.questionPt && item.options.length >= 2 && item.answer).slice(0, 10);
}
function buildVocabulary(lesson) {
  const raw = list(lesson?.vocabulary).length ? lesson.vocabulary : list(rawOf(lesson).vocabulary);
  return raw.map((item) => ({ word: clean(item?.word || item?.term), meaning: clean(item?.meaning || item?.translation || item?.definition), example: clean(item?.example || item?.sentence) })).filter((item) => item.word || item.meaning).slice(0, 14);
}
function buildPreReading(lesson) {
  const raw = list(lesson?.preReading).length ? lesson.preReading : list(rawOf(lesson).preReading);
  const items = raw.map((item) => clean(typeof item === 'string' ? item : item?.text || item?.instruction || item?.question)).filter(Boolean);
  return items.length ? items.slice(0, 3) : ['Observe o título e pense no assunto antes de começar.', 'Leia primeiro para entender a ideia geral, sem traduzir palavra por palavra.', 'Na segunda leitura, procure frases que provam suas respostas.'];
}
function correct(selected, answer) { return clean(selected).toLowerCase() === clean(answer).toLowerCase(); }

function QuestionCard({ item, index, selected, onSelect }) {
  const current = selected[item.index];
  const answered = typeof current === 'string';
  const ok = answered && correct(current, item.answer);
  return (
    <article className="question-card reading-question-card-v3">
      <span>{item.skill === 'main_idea' ? 'Ideia geral' : 'Compreensão'} · Questão {index + 1}</span>
      <strong>{item.questionPt}</strong>
      <p className="reading-evidence-hint">Pergunta em português para A1. Escolha a alternativa que aparece ou é provada pelo texto.</p>
      <div className="option-list reading-option-list-v3">
        {item.options.map((option) => <button key={option} type="button" className={`option-button reading-option-button-v3${current === option ? ' selected' : ''}${current === option && answered ? (ok ? ' correct' : ' incorrect') : ''}`} onClick={() => onSelect(item.index, option)}>{option}</button>)}
      </div>
      {answered ? <div className={ok ? 'question-feedback correct' : 'question-feedback incorrect'}><strong>{ok ? 'Correto.' : 'Ainda não. Volte ao texto e compare com calma.'}</strong>{item.evidence ? <p>Trecho de apoio: “{item.evidence}”</p> : null}{item.explanation ? <p>{item.explanation}</p> : null}</div> : null}
    </article>
  );
}

export function ReadingLessonGuided({ lesson }) {
  const [audioState, setAudioState] = useState('idle');
  const [audioMessage, setAudioMessage] = useState('');
  const [selected, setSelected] = useState({});
  const [drafts, setDrafts] = useState({});
  const [finalText, setFinalText] = useState(() => getLessonDraft(lesson?.id || lesson?.title || 'reading'));
  const [completionMessage, setCompletionMessage] = useState(isLessonCompleted(lesson) ? 'Esta aula já foi concluída.' : '');
  const text = useMemo(() => getMainText(lesson), [lesson]);
  const paras = useMemo(() => splitParagraphs(text), [text]);
  const questions = useMemo(() => buildQuestions(lesson, paras), [lesson, paras]);
  const words = useMemo(() => buildVocabulary(lesson), [lesson]);
  const prep = useMemo(() => buildPreReading(lesson), [lesson]);
  const evidenceTasks = questions.filter((q) => q.evidence).slice(0, 3);
  const shortTasks = questions.filter((q) => q.skill !== 'main_idea').slice(0, 3);
  const objective = first(lesson?.objective, lesson?.goal, 'Ler o texto principal em inglês, entender a ideia geral, responder perguntas com apoio em português e provar respostas usando evidências do texto.');

  async function handleListen() {
    if (!text) { setAudioMessage('Texto principal não carregado. Gere a aula novamente.'); return; }
    setAudioState('loading'); setAudioMessage('Preparando áudio...');
    try {
      const result = await playLearningAudio({ text, label: 'Reading · texto principal', voiceName: 'Kore', style: 'Natural American English teacher voice, calm and clear, moderate speed, ideal for A1 Brazilian learners.' });
      setAudioMessage(result.ok ? 'Áudio iniciado.' : result.error || 'Não foi possível reproduzir áudio.');
    } catch (error) { setAudioMessage(error?.message || 'Erro inesperado ao tentar reproduzir áudio.'); }
    finally { setAudioState('idle'); }
  }
  function setDraft(key, value) { setDrafts((current) => ({ ...current, [key]: value })); }
  function saveDraft() { saveLessonDraft({ lesson, answer: finalText }); setCompletionMessage('Rascunho salvo.'); }
  function finishLesson() { const result = completeLesson({ lesson, answers: { multipleChoice: selected, written: drafts }, writtenAnswer: finalText }); setCompletionMessage(result.alreadyCompleted ? 'Aula já estava concluída. Progresso mantido.' : '+25 XP. Reading concluída e progresso salvo.'); }

  return (
    <article className="reading-layout reading-lesson-v3 reading-a1-ptbr-render-hotfix">
      <Card eyebrow={`Reading · ${lesson?.level || 'A1'}`} title={lesson?.title || 'Aula de Reading'} action={<ProgressPill current={1} total={5} label="Aula" />}>
        <div className="lesson-intro-grid reading-hero-grid"><div><p>{clean(lesson?.intro) || 'Aula guiada para ler em inglês com apoio em português.'}</p><div className="reading-skill-strip"><span><BookOpen size={14} /> Texto em inglês</span><span><SearchCheck size={14} /> Perguntas em português</span><span><CheckCircle2 size={14} /> Evidência textual</span></div></div><div className="lesson-objective-card reading-objective-card"><Target size={18} /><span>Objetivo real</span><strong>{objective}</strong></div></div>
      </Card>

      <section className="reading-section-card reading-pre-reading-card"><div className="panel-title"><Lightbulb size={18} /> 1. Antes de ler</div><p className="reading-section-intro">Prepare a leitura. Você não precisa entender tudo de primeira.</p><div className="reading-pre-reading-list">{prep.map((item, index) => <article key={`${item}-${index}`}><span>{index + 1}</span><p>{item}</p></article>)}</div></section>

      <section className="reading-grid reading-main-grid reading-main-grid-v3"><div className="reading-text-panel reading-paper reading-paper-v3"><div className="panel-title"><BookOpen size={18} /> 2. Texto principal</div>{paras.length ? <div className="reading-paper-body reading-paper-body-v3">{paras.map((p, index) => <p key={`${p}-${index}`}><span className="reading-paragraph-index">{index + 1}</span>{p}</p>)}</div> : <div className="inline-warning"><span>O texto principal não foi carregado corretamente. Gere a aula novamente para evitar estudar um conteúdo quebrado.</span></div>}</div><aside className="reading-side-panel reading-side-panel-v3"><div className="mini-card listening-card reading-audio-card"><div className="panel-title"><Headphones size={18} /> Escuta opcional</div><p>Use o áudio depois da primeira leitura. O texto acima continua sendo a base da aula.</p><button type="button" className="secondary-button" onClick={handleListen} disabled={audioState === 'loading' || !text}>{audioState === 'loading' ? <Loader2 size={16} className="spin" /> : <Headphones size={16} />}{audioState === 'loading' ? 'Preparando...' : 'Ouvir texto'}</button>{audioMessage ? <p className="generator-message">{audioMessage}</p> : null}</div></aside></section>

      {words.length ? <section className="reading-section-card reading-vocab-card"><div className="panel-title"><BookOpen size={18} /> 3. Vocabulário de apoio</div><p className="reading-section-intro">Use esta parte para entender melhor as alternativas e o texto.</p><div className="reading-mini-exercise-group">{words.map((item, index) => <article className="reading-mini-exercise" key={`${item.word}-${index}`}><p><strong>{item.word}</strong></p>{item.meaning ? <span>{item.meaning}</span> : null}{item.example ? <small>{item.example}</small> : null}</article>)}</div></section> : null}

      <section className="reading-section-card reading-comprehension-card"><div className="panel-title"><FileQuestion size={18} /> 4. Exercícios da aula Reading</div><p className="reading-section-intro">Esta é a série principal de exercícios da aula. A Prática Profunda abaixo é apenas complementar.</p>{questions.length ? questions.map((item, index) => <QuestionCard key={`${item.questionPt}-${index}`} item={item} index={index} selected={selected} onSelect={(i, option) => setSelected((current) => ({ ...current, [i]: option }))} />) : <p>Nenhuma pergunta válida foi carregada. Gere novamente para receber exercícios de compreensão.</p>}
        {evidenceTasks.length ? <div className="reading-mini-exercise-group"><strong><CopyCheck size={16} /> Copiar evidência do texto</strong>{evidenceTasks.map((task) => <article className="reading-mini-exercise reading-mini-written-exercise" key={`ev-${task.index}`}><p>Copie a frase que prova: {task.questionPt}</p><textarea rows={2} value={drafts[`ev-${task.index}`] || ''} onChange={(event) => setDraft(`ev-${task.index}`, event.target.value)} placeholder="Copie aqui a frase do texto..." />{task.evidence ? <small>Trecho de apoio: “{task.evidence}”</small> : null}</article>)}</div> : null}
        {shortTasks.length ? <div className="reading-mini-exercise-group"><strong><MessageSquareText size={16} /> Resposta curta em português</strong>{shortTasks.map((task) => <article className="reading-mini-exercise reading-mini-written-exercise" key={`short-${task.index}`}><p>{task.questionPt}</p><textarea rows={2} value={drafts[`short-${task.index}`] || ''} onChange={(event) => setDraft(`short-${task.index}`, event.target.value)} placeholder="Responda com uma frase curta..." />{task.answer ? <small>Modelo de resposta: {task.answer}</small> : null}</article>)}</div> : null}
      </section>

      <section className="reading-section-card reading-production-card"><div className="panel-title"><FileQuestion size={18} /> 5. Produção final</div><p className="reading-section-intro">Escreva em português o que você entendeu e, se conseguir, uma frase simples em inglês.</p><textarea rows={4} value={finalText} onChange={(event) => setFinalText(event.target.value)} placeholder="Eu entendi que... / In the text, ..." /><div className="lesson-action-row"><button type="button" className="secondary-button" onClick={saveDraft}>Salvar rascunho</button><button type="button" className="primary-button" onClick={finishLesson}>Concluir Reading</button></div>{completionMessage ? <p className="generator-message">{completionMessage}</p> : null}</section>
    </article>
  );
}
