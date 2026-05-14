import { useMemo, useState } from 'react';
import { BookOpenCheck, CheckCircle2, Headphones, Lightbulb, ListChecks, Map, Mic, Repeat, Sparkles, Target, XCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card.jsx';
import { AiTutorPanel } from '../../components/tutor/AiTutorPanel.jsx';
import { ListeningShadowingPractice } from '../../components/lesson/ListeningShadowingPractice.jsx';
import { ListeningMiniDialoguePractice } from '../../components/lesson/ListeningMiniDialoguePractice.jsx';
import { StaticCompletionGate } from './StaticCompletionGate.jsx';

function safeArray(value) { return Array.isArray(value) ? value : []; }
function clean(value) { return String(value ?? '').trim(); }
function hasText(value) { return clean(value).length > 0; }
function textOf(value) { return clean(value?.text || value?.content || value?.instruction || value?.question || value?.title || value?.label || value); }
function noteOf(value) { return clean(value?.note || value?.why || value?.explanation || value?.reason || value?.tip || value?.translation || value?.meaning || ''); }
function normalizeAnswer(value) { return clean(value).toLowerCase().replace(/[.!?]+$/g, '').replace(/\s+/g, ' '); }
function isCorrect(value, answer) { return Boolean(answer) && normalizeAnswer(value) === normalizeAnswer(answer); }
function asList(value) { if (Array.isArray(value)) return value; if (hasText(value)) return [value]; return []; }
function hasItems(value) { return safeArray(value).length > 0; }

function getIntro(lesson) {
  const firstObjective = safeArray(lesson?.objectives)[0];
  return lesson?.teacherOpening || lesson?.intro || firstObjective || 'Aula de listening para treinar escuta, reconhecimento de palavras e produção oral curta.';
}

function uniqueCleanOptions(options = []) {
  const seen = new Set();
  return safeArray(options).map(clean).filter(Boolean).filter((option) => {
    const key = normalizeAnswer(option);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function stableHash(value) {
  const text = String(value || '');
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function stableShuffle(options = [], seed = '') {
  const list = [...options];
  if (list.length < 2) return list;
  for (let index = list.length - 1; index > 0; index -= 1) {
    const swapIndex = stableHash(`${seed}:${index}`) % (index + 1);
    [list[index], list[swapIndex]] = [list[swapIndex], list[index]];
  }
  return list;
}

function DeepTextCard({ title, icon: Icon = Lightbulb, children }) {
  if (!children) return null;
  return <section className="static-lesson-card static-deep-flow-card"><div className="panel-title"><Icon size={18} /> {title}</div>{children}</section>;
}

function DeepListCard({ title, icon: Icon = CheckCircle2, items = [], renderItem, empty = '' }) {
  const list = asList(items).filter((item) => hasText(textOf(item)) || noteOf(item));
  if (!list.length && !empty) return null;
  return <section className="static-lesson-card static-deep-flow-card"><div className="panel-title"><Icon size={18} /> {title}</div>{list.length ? <div className="static-lesson-stack">{list.map((item, index) => renderItem ? renderItem(item, index) : <article className="static-check-card" key={index}>{textOf(item)}</article>)}</div> : <p>{empty}</p>}</section>;
}

function ObjectiveCard({ lesson }) {
  return (
    <Card eyebrow={`Listening profunda · ${lesson.level || 'A1'}`} title={lesson.title}>
      <div className="static-lesson-objective-grid">
        <p>{getIntro(lesson)}</p>
        <div className="lesson-objective-card">
          <Target size={18} />
          <span>Ao final você vai conseguir</span>
          <ul>{safeArray(lesson.objectives).length ? safeArray(lesson.objectives).map((item, index) => <li key={`${item}-${index}`}>{item}</li>) : <li>entender o áudio e produzir uma resposta curta.</li>}</ul>
        </div>
      </div>
    </Card>
  );
}

function MentalModel({ lesson }) {
  const model = lesson.mentalModel;
  if (!model) return null;
  const steps = safeArray(model.steps || model.flow || model.items);
  return <DeepTextCard title="Mapa mental da aula" icon={Map}>{hasText(model.title) ? <h3>{model.title}</h3> : null}{hasText(model.summary || model.text || model.content) ? <p>{model.summary || model.text || model.content}</p> : null}{steps.length ? <div className="static-lesson-stack">{steps.map((step, index) => <article className="static-check-card" key={index}><b>{index + 1}.</b> {textOf(step)}{noteOf(step) ? <small>{noteOf(step)}</small> : null}</article>)}</div> : null}</DeepTextCard>;
}

function CoreFlow({ lesson }) {
  return <>
    <DeepTextCard title="Por que isso importa" icon={Sparkles}>{lesson.whyItMatters ? <p>{lesson.whyItMatters}</p> : null}{hasItems(lesson.realLifeUseCases) ? <ul>{lesson.realLifeUseCases.map((item, index) => <li key={index}>{textOf(item)}</li>)}</ul> : null}</DeepTextCard>
    <DeepTextCard title="Conceito central" icon={BookOpenCheck}>{lesson.conceptExplanation ? <p>{lesson.conceptExplanation}</p> : null}</DeepTextCard>
    <MentalModel lesson={lesson} />
    <DeepListCard title="Passo a passo" icon={Target} items={lesson.stepByStep} renderItem={(item, index) => <article className="static-check-card" key={index}><b>Passo {index + 1}</b><p>{textOf(item)}</p>{noteOf(item) ? <small>{noteOf(item)}</small> : null}</article>} />
    <DeepListCard title="Comparação com português" icon={Repeat} items={lesson.portugueseContrast} renderItem={(item, index) => <article className="static-example-card" key={index}><strong>{textOf(item)}</strong>{noteOf(item) ? <p>{noteOf(item)}</p> : null}</article>} />
    <DeepListCard title="Pratique comigo antes do quiz" icon={Lightbulb} items={lesson.guidedBeforeQuiz || lesson.guidedDiscovery} renderItem={(item, index) => <article className="static-production-card" key={index}><span>Guia {index + 1}</span><strong>{textOf(item)}</strong>{noteOf(item) ? <p>{noteOf(item)}</p> : null}</article>} />
  </>;
}

function QuizList({ title = 'Prática guiada', items = [] }) {
  const [answers, setAnswers] = useState({});
  const questions = useMemo(() => safeArray(items).filter((item) => textOf(item)), [items]);
  if (!questions.length) return null;
  return <section className="static-lesson-card static-practice-card"><div className="panel-title"><ListChecks size={18} /> {title}</div><p className="static-lesson-muted">Tente responder antes de olhar o feedback. O gabarito só aparece depois da sua tentativa.</p><div className="static-question-list">{questions.map((item, index) => { const id = `${title}-${index}`; const selected = answers[id] || ''; const attempted = Boolean(selected); const expected = item.answer || item.expectedAnswer || item.correctAnswer || item.expected; const correct = attempted && isCorrect(selected, expected); const seed = `${title}:${index}:${textOf(item)}:${expected}`; const options = stableShuffle(uniqueCleanOptions(item.options), seed); return <article className="static-question-card" key={id}><span>Questão {index + 1}</span><strong>{textOf(item)}</strong>{item.context ? <p>{item.context}</p> : null}{options.length ? <div className="static-option-list">{options.map((option) => { const active = selected === option; const optionCorrect = attempted && isCorrect(option, expected); const optionWrong = active && attempted && !correct; return <button type="button" key={option} className={`${active ? 'selected' : ''}${optionCorrect ? ' correct' : ''}${optionWrong ? ' incorrect' : ''}`} onClick={() => setAnswers((current) => ({ ...current, [id]: option }))}>{option}</button>; })}</div> : <textarea value={selected} onChange={(event) => setAnswers((current) => ({ ...current, [id]: event.target.value }))} placeholder="Digite sua resposta..." />}{attempted ? <div className={correct ? 'question-feedback correct' : 'question-feedback incorrect'}><strong>{correct ? <><CheckCircle2 size={15} /> Correto.</> : <><XCircle size={15} /> Revise o modelo.</>}</strong>{!correct && expected ? <p>Modelo correto: <b>{expected}</b></p> : null}{item.explanation ? <p>{item.explanation}</p> : null}</div> : <small>Escolha uma alternativa ou escreva sua tentativa.</small>}</article>; })}</div></section>;
}

function Recap({ lesson }) {
  return <section className="static-lesson-card static-deep-flow-card"><div className="panel-title"><CheckCircle2 size={18} /> Revisão final</div>{safeArray(lesson.lessonRecap).length ? <div className="static-lesson-stack">{lesson.lessonRecap.map((item, index) => <article className="static-check-card" key={index}>✓ {textOf(item)}</article>)}</div> : <p>Revise o áudio, o transcript, o shadowing e sua produção antes de concluir.</p>}{safeArray(lesson.selfAssessment).length ? <div className="static-lesson-stack">{lesson.selfAssessment.map((item, index) => <article className="static-production-card" key={index}><strong>{textOf(item)}</strong></article>)}</div> : null}{lesson.nextLessonBridge ? <p className="static-lesson-muted">Próximo passo: {lesson.nextLessonBridge}</p> : null}</section>;
}

export function ListeningInteractiveLesson({ lesson }) {
  return (
    <article className="static-lesson-layout static-deep-lesson-layout">
      <ObjectiveCard lesson={lesson} />
      <CoreFlow lesson={lesson} />
      <DeepListCard title="Antes de ouvir" icon={Headphones} items={lesson.listeningPreparation} />
      <DeepListCard title="Palavras para tentar ouvir" icon={Target} items={lesson.keyWordsToHear || lesson.vocabulary} />
      <DeepListCard title="Primeira escuta sem texto" icon={Headphones} items={lesson.firstListenTasks} />
      <DeepListCard title="Segunda escuta com foco" icon={Target} items={lesson.secondListenTasks} />
      <section className="static-lesson-card static-main-text-card"><div className="panel-title"><BookOpenCheck size={18} /> Transcript depois da escuta</div><p>{lesson.transcript || lesson.audioScript}</p></section>
      <ListeningShadowingPractice lesson={lesson} />
      <QuizList title="Dictation leve" items={lesson.dictationTasks} />
      <QuizList title="Compreensão auditiva" items={lesson.listeningComprehension || lesson.comprehensionQuestions} />
      <ListeningMiniDialoguePractice lesson={lesson} />
      <Recap lesson={lesson} />
      <AiTutorPanel lesson={lesson} />
      <StaticCompletionGate lesson={lesson} />
    </article>
  );
}
