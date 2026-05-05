import { useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, FileQuestion, Headphones, Lightbulb, Loader2, SearchCheck, Target } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { ProgressPill } from '../components/ui/ProgressPill.jsx';
import { playLearningAudio } from '../services/audioPlayback.js';

function clean(value) {
  return String(value ?? '').replace(/\*\*(.*?)\*\*/g, '$1').replace(/\s+([,.!?;:])/g, '$1').trim();
}

function list(value) { return Array.isArray(value) ? value : []; }
function rawOf(lesson) { return lesson?.raw && typeof lesson.raw === 'object' ? lesson.raw : {}; }
function first(...values) { for (const value of values) { const text = clean(value); if (text) return text; } return ''; }

function fakeText(value) {
  const text = clean(value).toLowerCase();
  return !text || text === 'exemplo de texto para escuta.' || text === 'exemplo de texto para escuta' || text === 'example listening text.' || text === 'main text' || text === 'texto principal';
}

function mainText(lesson) {
  const raw = rawOf(lesson);
  const candidates = [lesson?.readingText, lesson?.reading_text, lesson?.mainText, lesson?.main_text, lesson?.text, lesson?.story, lesson?.article, lesson?.passage, raw.readingText, raw.reading_text, raw.mainText, raw.main_text, raw.text, raw.story, raw.article, raw.passage, lesson?.listeningText, raw.listeningText, raw.transcript];
  for (const candidate of candidates) {
    const text = clean(candidate);
    if (text && !fakeText(text)) return text;
  }
  return '';
}

function paragraphs(text) {
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
  let m = q.match(/^what is the main idea/i);
  if (m) return 'Qual é a ideia principal do texto?';
  m = q.match(/^what does ([A-Z][A-Za-zÀ-ÿ]*) write in/i);
  if (m) return `O que ${m[1]} escreve?`;
  m = q.match(/^what does ([A-Z][A-Za-zÀ-ÿ]*) do when/i);
  if (m) return `O que ${m[1]} faz nessa situação?`;
  m = q.match(/^what does ([A-Z][A-Za-zÀ-ÿ]*)/i);
  if (m) return `O que ${m[1]} faz no texto?`;
  m = q.match(/^why does ([A-Z][A-Za-zÀ-ÿ]*)/i);
  if (m) return `Por que ${m[1]} faz isso?`;
  if (/where/i.test(q)) return 'Onde isso acontece no texto?';
  if (/when/i.test(q)) return 'Quando isso acontece no texto?';
  if (/who/i.test(q)) return 'Quem aparece no texto?';
  if (/how many/i.test(q)) return 'Qual quantidade aparece no texto?';
  if (/inference/i.test(skill)) return 'O que dá para concluir a partir do texto?';
  return 'Qual alternativa responde corretamente ao texto?';
}

function questionSource(lesson) {
  const raw = rawOf(lesson);
  return list(lesson?.readingQuestions).length ? lesson.readingQuestions : list(raw.readingQuestions).length ? raw.readingQuestions : list(lesson?.questions).length ? lesson.questions : list(raw.questions).length ? raw.questions : list(lesson?.exercises).length ? lesson.exercises : list(raw.exercises);
}

function optionsOf(item) {
  return [...new Set(list(item?.options || item?.choices || item?.alternatives).map((option) => clean(typeof option === 'string' ? option : option?.text || option?.label || option?.value)).filter(Boolean))].slice(0, 4);
}

function questions(lesson, paras) {
  return questionSource(lesson).map((item, index) => {
    const skill = clean(item?.skill || item?.type || (index === 0 ? 'main_idea' : 'detail'));
    const answer = first(item?.answer, item?.correctAnswer, item?.correct);
    const evidence = first(item?.evidence, item?.quote, item?.reference) || paras.find((p) => answer && p.toLowerCase().includes(answer.toLowerCase())) || '';
    return { index, skill, questionPt: ptQuestion(first(item?.questionPt, item?.question_pt, item?.questionPortuguese, item?.question), skill), options: optionsOf(item), answer, evidence, explanation: first(item?.explanationPt, item?.explanation_pt, item?.explanation, item?.feedback) };
  }).filter((item) => item.questionPt && item.options.length >= 2 && item.answer).slice(0, 8);
}

function vocab(lesson) {
  const raw = list(lesson?.vocabulary).length ? lesson.vocabulary : list(rawOf(lesson).vocabulary);
  return raw.map((item) => ({ word: clean(item?.word || item?.term), meaning: clean(item?.meaning || item?.translation || item?.definition), example: clean(item?.example || item?.sentence) })).filter((item) => item.word || item.meaning).slice(0, 12);
}

function preReading(lesson) {
  const raw = list(lesson?.preReading).length ? lesson.preReading : list(rawOf(lesson).preReading);
  const items = raw.map((item) => clean(typeof item === 'string' ? item : item?.text || item?.instruction || item?.question)).filter(Boolean);
  return items.length ? items.slice(0, 3) : ['Observe o título e pense no assunto antes de começar.', 'Leia primeiro para entender a ideia geral, sem traduzir palavra por palavra.', 'Na segunda leitura, procure frases que provam suas respostas.'];
}

function correct(selected, answer) { return clean(selected).toLowerCase() === clean(answer).toLowerCase(); }

function QuestionCard({ item, index, selected, onSelect }) {
  const current = selected[item.index];
  const answered = typeof current === 'string';
  const ok = answered && correct(current, item.answer);
  return <article className="question-card reading-question-card-v3"><span>{item.skill === 'main_idea' ? 'Ideia geral' : 'Compreensão'} · Questão {index + 1}</span><strong>{item.questionPt}</strong><p className="reading-evidence-hint">Pergunta em português para A1. Escolha a alternativa que aparece ou é provada pelo texto.</p><div className="option-list reading-option-list-v3">{item.options.map((option) => <button key={option} type="button" className={`option-button reading-option-button-v3${current === option ? ' selected' : ''}${current === option && answered ? (ok ? ' correct' : ' incorrect') : ''}`} onClick={() => onSelect(item.index, option)}>{option}</button>)}</div>{answered ? <div className={ok ? 'question-feedback correct' : 'question-feedback incorrect'}><strong>{ok ? 'Correto.' : 'Ainda não. Volte ao texto e compare com calma.'}</strong>{item.evidence ? <p>Trecho de apoio: “{item.evidence}”</p> : null}{item.explanation ? <p>{item.explanation}</p> : null}</div> : null}</article>;
}

export function ReadingLessonGuided({ lesson }) {
  const [audioState, setAudioState] = useState('idle');
  const [audioMessage, setAudioMessage] = useState('');
  const [selected, setSelected] = useState({});
  const text = useMemo(() => mainText(lesson), [lesson]);
  const paras = useMemo(() => paragraphs(text), [text]);
  const qs = useMemo(() => questions(lesson, paras), [lesson, paras]);
  const words = useMemo(() => vocab(lesson), [lesson]);
  const prep = useMemo(() => preReading(lesson), [lesson]);
  const objective = first(lesson?.objective, lesson?.goal, 'Ler o texto principal em inglês, entender a ideia geral, responder perguntas com apoio em português e provar respostas usando evidências do texto.');

  async function handleListen() {
    if (!text) { setAudioMessage('Texto principal não carregado. Gere a aula novamente.'); return; }
    setAudioState('loading');
    setAudioMessage('Preparando áudio...');
    try {
      const result = await playLearningAudio({ text, label: 'Reading · texto principal', voiceName: 'Kore', style: 'Natural American English teacher voice, calm and clear, moderate speed, ideal for A1 Brazilian learners.' });
      setAudioMessage(result.ok ? 'Áudio iniciado.' : result.error || 'Não foi possível reproduzir áudio.');
    } catch (error) { setAudioMessage(error?.message || 'Erro inesperado ao tentar reproduzir áudio.'); }
    finally { setAudioState('idle'); }
  }

  return <article className="reading-layout reading-lesson-v3 reading-a1-ptbr-render-hotfix"><Card eyebrow={`Reading · ${lesson?.level || 'A1'}`} title={lesson?.title || 'Aula de Reading'} action={<ProgressPill current={1} total={4} label="Etapas" />}><div className="lesson-intro-grid reading-hero-grid"><div><p>{clean(lesson?.intro) || 'Aula guiada para ler em inglês com apoio em português.'}</p><div className="reading-skill-strip"><span><BookOpen size={14} /> Texto em inglês</span><span><SearchCheck size={14} /> Perguntas em português</span><span><CheckCircle2 size={14} /> Evidência textual</span></div></div><div className="lesson-objective-card reading-objective-card"><Target size={18} /><span>Objetivo real</span><strong>{objective}</strong></div></div></Card><section className="reading-section-card reading-pre-reading-card"><div className="panel-title"><Lightbulb size={18} /> Antes de ler</div><p className="reading-section-intro">Primeiro prepare a leitura. Você não precisa entender tudo de primeira.</p><div className="reading-pre-reading-list">{prep.map((item, index) => <article key={`${item}-${index}`}><span>{index + 1}</span><p>{item}</p></article>)}</div></section><section className="reading-grid reading-main-grid reading-main-grid-v3"><div className="reading-text-panel reading-paper reading-paper-v3"><div className="panel-title"><BookOpen size={18} /> Texto principal</div>{paras.length ? <div className="reading-paper-body reading-paper-body-v3">{paras.map((p, index) => <p key={`${p}-${index}`}><span className="reading-paragraph-index">{index + 1}</span>{p}</p>)}</div> : <div className="inline-warning"><span>O texto principal não foi carregado corretamente. Gere a aula novamente para evitar estudar um conteúdo quebrado.</span></div>}</div><aside className="reading-side-panel reading-side-panel-v3"><div className="mini-card listening-card reading-audio-card"><div className="panel-title"><Headphones size={18} /> Escuta opcional</div><p>Use o áudio só depois da primeira leitura. O texto acima continua sendo a base da aula.</p><button type="button" className="secondary-button" onClick={handleListen} disabled={audioState === 'loading' || !text}>{audioState === 'loading' ? <Loader2 size={16} className="spin" /> : <Headphones size={16} />}{audioState === 'loading' ? 'Preparando...' : 'Ouvir texto'}</button>{audioMessage ? <p className="generator-message">{audioMessage}</p> : null}</div></aside></section>{words.length ? <section className="reading-section-card reading-vocab-card"><div className="panel-title"><BookOpen size={18} /> Vocabulário de apoio</div><p className="reading-section-intro">Use esta parte para entender melhor as alternativas e o texto.</p><div className="vocab-list reading-vocab-list-v3">{words.map((item, index) => <article key={`${item.word}-${index}`}><strong>{item.word}</strong><span>{item.meaning || 'significado pelo contexto'}</span>{item.example ? <small>{item.example}</small> : null}</article>)}</div></section> : null}<section className="reading-section-card reading-comprehension-card"><div className="panel-title"><FileQuestion size={18} /> Compreensão com apoio em português</div><p className="reading-section-intro">As perguntas aparecem em português para você conseguir estudar mesmo no A1. As alternativas podem usar palavras do texto em inglês.</p>{qs.length ? qs.map((item, index) => <QuestionCard key={`${item.questionPt}-${index}`} item={item} index={index} selected={selected} onSelect={(i, option) => setSelected((current) => ({ ...current, [i]: option }))} />) : <p>Nenhuma pergunta válida foi carregada. Gere novamente para receber exercícios de compreensão.</p>}</section></article>;
}
