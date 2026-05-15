import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Brain, Check, ChevronLeft, Coffee, Lock, Quote, RotateCcw, ShieldCheck, Sparkles, Target, Trophy } from 'lucide-react';
import { AiTutorPanel } from '../../../components/tutor/AiTutorPanel.jsx';
import { StaticCompletionGate } from '../../static/StaticCompletionGate.jsx';
import './reading-lesson-flow.css';

const TECHNICAL_WORDS = new Set(['subject', 'expected', 'answer', 'correctAnswer', 'expectedAnswer', 'schemaVersion', 'undefined', 'null', '[object Object]']);
const STAGES = [
  { key: 'overview', label: 'Objetivo' },
  { key: 'text', label: 'Leitura' },
  { key: 'comprehension', label: 'Ideia' },
  { key: 'evidence', label: 'Evidência' },
  { key: 'summary', label: 'Produção' },
  { key: 'mastery', label: 'Mastery' },
];

function clean(value) { return String(value ?? '').trim(); }
function hasText(value) { const text = clean(value); return text.length > 0 && !TECHNICAL_WORDS.has(text); }
function safeArray(value) { return Array.isArray(value) ? value : []; }
function firstUseful(...values) { return values.map(clean).find(hasText) || ''; }
function textOf(value) {
  if (typeof value === 'string' || typeof value === 'number') return hasText(value) ? clean(value) : '';
  if (!value || typeof value !== 'object') return '';
  return firstUseful(value.instruction, value.question, value.prompt, value.text, value.content, value.chunk, value.word, value.phrase, value.example, value.english, value.pattern, value.title, value.label);
}
function noteOf(value) {
  if (!value || typeof value !== 'object') return '';
  return firstUseful(value.note, value.why, value.explanation, value.reason, value.tip, value.translation, value.meaning, value.expectedUse);
}
function expectedOf(value) {
  if (!value || typeof value !== 'object') return '';
  return firstUseful(value.expected, value.answer, value.expectedAnswer, value.correctAnswer);
}
function asList(value) { if (Array.isArray(value)) return value; return hasText(value) ? [value] : []; }
function mergeLists(...groups) {
  return groups.flatMap(asList).filter((item) => hasText(textOf(item)) || hasText(noteOf(item)) || hasText(item?.word) || hasText(item?.meaning));
}
function wordCount(value) { return clean(value).split(/\s+/).filter(Boolean).length; }
function normalizeId(value) { return clean(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'item'; }
function stripPillarPrefix(title = '') { return clean(title).replace(/^Reading\s*[—-]\s*/i, '') || 'Aula de Reading'; }

function getVocabularyAnchors(lesson) {
  const list = mergeLists(lesson.preReadingVocabulary, lesson.vocabulary, lesson.keyVocabulary, lesson.contextVocabularyTasks)
    .map((item) => firstUseful(item.word, item.term, textOf(item)))
    .filter(Boolean);
  return [...new Set(list)].slice(0, 8);
}
function getObjectives(lesson) {
  return safeArray(lesson.objectives).map(textOf).filter(Boolean).slice(0, 4);
}
function getMainText(lesson) {
  return firstUseful(lesson.mainText, lesson.text, lesson.readingText, lesson.content, lesson.transcript) || 'Texto principal ainda não encontrado para esta aula.';
}
function getComprehensionTasks(lesson) {
  return mergeLists([lesson.firstReadTask].filter(Boolean), lesson.comprehensionQuestions).slice(0, 4);
}
function getEvidenceTasks(lesson) {
  return mergeLists(lesson.evidenceQuestions, lesson.secondReadTasks, lesson.comprehensionQuestions).slice(0, 5);
}
function getSummaryTasks(lesson) {
  return mergeLists([lesson.guidedSummary, lesson.connectedProduction, lesson.productionTask].filter(Boolean), lesson.productionTasks).slice(0, 4);
}

function GlassCard({ children, className = '', strong = false }) {
  return <section className={`reading-glass-card ${strong ? 'strong' : ''} ${className}`}>{children}</section>;
}
function PrimaryButton({ children, variant = 'primary', ...props }) {
  return <button type="button" className={`reading-primary-button ${variant}`} {...props}>{children}</button>;
}
function StageBadge({ icon: Icon, children, tone = 'blue' }) {
  return <span className={`reading-stage-badge ${tone}`}><Icon size={13} /> {children}</span>;
}
function FixedFooter({ children, onBack, backDisabled = false, helper }) {
  return (
    <footer className="reading-fixed-footer">
      {helper ? <p>{helper}</p> : null}
      <div className="reading-footer-actions">
        <button type="button" className="reading-secondary-button" onClick={onBack} disabled={backDisabled}><ArrowLeft size={15} /> Voltar</button>
        {children}
      </div>
    </footer>
  );
}

function ReadingHeader({ lesson, stageIndex, onBack }) {
  const pct = Math.round((stageIndex / (STAGES.length - 1)) * 100);
  const radius = 18;
  const circ = 2 * Math.PI * radius;
  const dash = (pct / 100) * circ;
  return (
    <header className="reading-premium-header">
      <button type="button" className="reading-header-back" onClick={onBack} disabled={stageIndex === 0} aria-label="Voltar etapa"><ChevronLeft size={20} /></button>
      <div className="reading-header-meta">
        <span className="level">{lesson.level || 'A1'}</span>
        <BookOpen size={14} />
        <span>Reading</span>
        <i />
        <span>{lesson.estimatedMinutes || 12} min</span>
      </div>
      <div className="reading-progress-ring" aria-label={`${pct}% concluído`}>
        <svg viewBox="0 0 44 44">
          <circle cx="22" cy="22" r={radius} className="track" />
          <circle cx="22" cy="22" r={radius} className="bar" strokeDasharray={`${dash} ${circ}`} />
        </svg>
        <span>{pct}%</span>
      </div>
    </header>
  );
}
function ProgressStepper({ activeIndex }) {
  return (
    <div className="reading-progress-stepper">
      {STAGES.map((stage, index) => {
        const done = index < activeIndex;
        const active = index === activeIndex;
        return (
          <div className={`reading-progress-step ${active ? 'active' : ''} ${done ? 'done' : ''}`} key={stage.key}>
            <i><b /></i>
            <span>{stage.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function TextAreaTask({ id, label, placeholder, minWords = 2, rows = 5, attempts, setAttempts, variant = 'default' }) {
  const value = attempts[id] || '';
  const count = wordCount(value);
  const ready = count >= minWords;
  return (
    <label className={`reading-answer-box ${variant}`}>
      <span>{label}</span>
      <textarea rows={rows} value={value} onChange={(event) => setAttempts((current) => ({ ...current, [id]: event.target.value }))} placeholder={placeholder} />
      <small>{count} palavras{ready ? ' · pronto' : ` · mínimo ${minWords}`}</small>
    </label>
  );
}

function OverviewStage({ lesson, goNext }) {
  const vocab = getVocabularyAnchors(lesson);
  const objectives = getObjectives(lesson);
  return (
    <div className="reading-stage-content fade-up">
      <div className="reading-stage-title-block">
        <StageBadge icon={Sparkles}>Aula guiada premium</StageBadge>
        <h1>{stripPillarPrefix(lesson.title)}</h1>
        <p>{lesson.readingPurpose || lesson.teacherOpening || lesson.intro || 'Leia, entenda, prove com evidência e produza sem virar rolagem infinita.'}</p>
      </div>
      <GlassCard strong className="mission-card">
        <div className="reading-card-icon"><Target size={18} /></div>
        <span>Missão da aula</span>
        <h2>{objectives[0] || 'Entender a ideia principal, localizar evidências e produzir uma resposta conectada.'}</h2>
        {objectives.length > 1 ? <ul>{objectives.slice(1).map((item) => <li key={item}>{item}</li>)}</ul> : null}
      </GlassCard>
      <div className="reading-two-card-grid">
        <GlassCard>
          <span className="reading-mini-label">Âncoras</span>
          <div className="reading-vocab-cloud">{(vocab.length ? vocab : ['name', 'city', 'work', 'morning', 'usually']).map((word) => <b key={word}>{word}</b>)}</div>
        </GlassCard>
        <GlassCard>
          <span className="reading-mini-label">Regra do fluxo</span>
          <p className="reading-soft-text"><Lock size={14} /> Perguntas e modelos ficam fora da leitura inicial.</p>
        </GlassCard>
      </div>
      <FixedFooter backDisabled helper="Comece pela leitura limpa. Depois desbloqueamos compreensão e evidência.">
        <PrimaryButton onClick={goNext}>Começar leitura <ArrowRight size={16} /></PrimaryButton>
      </FixedFooter>
    </div>
  );
}

function TextStage({ lesson, goNext, goBack, mark }) {
  return (
    <div className="reading-stage-content fade-up">
      <div className="reading-stage-title-block compact">
        <StageBadge icon={BookOpen}>Leitura imersiva</StageBadge>
        <h2>Leia uma vez sem responder.</h2>
        <p>Foque na ideia geral. As perguntas ficam bloqueadas nesta etapa.</p>
      </div>
      <GlassCard strong className="reading-text-card">
        <div className="reading-text-card-head">
          <div className="reading-card-icon amber"><Coffee size={18} /></div>
          <div><span>Texto · {lesson.level || 'A1'}</span><strong>{stripPillarPrefix(lesson.title)}</strong></div>
        </div>
        <article className="reading-main-text"><p>{getMainText(lesson)}</p></article>
        <footer><span>Texto principal</span><span>Leia sem traduzir palavra por palavra</span></footer>
      </GlassCard>
      <FixedFooter onBack={goBack} helper="Confirme só depois de ler o texto inteiro.">
        <PrimaryButton onClick={() => { mark('textRead'); goNext(); }}>Li o texto <ArrowRight size={16} /></PrimaryButton>
      </FixedFooter>
    </div>
  );
}

function ComprehensionStage({ lesson, attempts, setAttempts, goNext, goBack, mark }) {
  const tasks = getComprehensionTasks(lesson);
  const fallback = { prompt: 'Qual é a ideia geral do texto?' };
  const list = tasks.length ? tasks : [fallback];
  const ready = list.every((item, index) => wordCount(attempts[`comp-${index}`]) >= 2);
  return (
    <div className="reading-stage-content fade-up">
      <div className="reading-stage-title-block compact">
        <StageBadge icon={Brain} tone="violet">Primeira compreensão</StageBadge>
        <h2>Agora responda de memória.</h2>
        <p>O objetivo é medir compreensão real, não procurar visualmente a resposta.</p>
      </div>
      {list.map((item, index) => <GlassCard strong key={index} className="reading-question-card"><span className="reading-mini-label">Pergunta {index + 1}</span><h3>{textOf(item) || 'Qual é a ideia geral do texto?'}</h3>{noteOf(item) ? <p>{noteOf(item)}</p> : null}<TextAreaTask id={`comp-${index}`} label="Sua tentativa" placeholder="Responda com suas palavras..." attempts={attempts} setAttempts={setAttempts} /></GlassCard>)}
      <FixedFooter onBack={goBack} helper={ready ? 'Tentativa pronta. Você pode continuar.' : 'Registre uma tentativa curta antes de avançar.'}>
        <PrimaryButton variant={ready ? 'primary' : 'secondary'} disabled={!ready} onClick={() => { mark('comprehensionAttempted'); goNext(); }}>Registrar tentativa <ArrowRight size={16} /></PrimaryButton>
      </FixedFooter>
    </div>
  );
}

function EvidenceStage({ lesson, attempts, setAttempts, goNext, goBack, mark }) {
  const tasks = getEvidenceTasks(lesson);
  const fallback = { question: 'Where does Ana work?', prompt: 'Copie a frase do texto que comprova sua resposta.' };
  const list = (tasks.length ? tasks : [fallback]).slice(0, 4);
  const ready = list.every((item, index) => hasText(attempts[`evidence-answer-${index}`]) && wordCount(attempts[`evidence-proof-${index}`]) >= 3);
  return (
    <div className="reading-stage-content fade-up">
      <div className="reading-stage-title-block compact">
        <StageBadge icon={ShieldCheck} tone="mint">Reading exige evidência</StageBadge>
        <h2>Prove com o texto.</h2>
        <p>Resposta sem trecho do texto vira chute. Aqui a leitura vira investigação.</p>
      </div>
      {list.map((item, index) => <GlassCard strong key={index} className="reading-evidence-card"><span className="reading-mini-label">Evidência {index + 1}</span><h3>{textOf(item) || 'Where does Ana work?'}</h3>{noteOf(item) ? <p>{noteOf(item)}</p> : null}<TextAreaTask id={`evidence-answer-${index}`} label="Sua resposta" placeholder="Digite a resposta..." rows={2} minWords={1} attempts={attempts} setAttempts={setAttempts} /><TextAreaTask id={`evidence-proof-${index}`} label={<><Quote size={13} /> Evidência do texto</>} placeholder="Copie a frase do texto que comprova..." rows={3} minWords={3} attempts={attempts} setAttempts={setAttempts} variant="dashed" />{expectedOf(item) && hasText(attempts[`evidence-answer-${index}`]) ? <div className="reading-model-after-attempt"><Check size={14} /> Modelo para comparar: <b>{expectedOf(item)}</b></div> : null}</GlassCard>)}
      <FixedFooter onBack={goBack} helper={ready ? 'Evidência registrada.' : 'Preencha resposta e evidência para avançar.'}>
        <PrimaryButton variant={ready ? 'mint' : 'secondary'} disabled={!ready} onClick={() => { mark('evidenceRecorded'); goNext(); }}>Validar evidência <ArrowRight size={16} /></PrimaryButton>
      </FixedFooter>
    </div>
  );
}

function SummaryStage({ lesson, attempts, setAttempts, goNext, goBack, mark }) {
  const tasks = getSummaryTasks(lesson);
  const summaryPrompt = textOf(tasks[0]) || 'Escreva em português ou inglês simples o que você entendeu.';
  const productionPrompt = textOf(tasks[1]) || 'Agora escreva frases sobre sua própria rotina usando o texto como modelo.';
  const ready = wordCount(attempts.summary) >= 4 && wordCount(attempts.production) >= 4;
  return (
    <div className="reading-stage-content fade-up">
      <div className="reading-stage-title-block compact">
        <StageBadge icon={Sparkles} tone="violet">Resumo & produção</StageBadge>
        <h2>Transforme leitura em prática.</h2>
        <p>Feche a aula produzindo algo seu, sem perder o foco do Reading.</p>
      </div>
      <GlassCard strong><span className="reading-mini-label">Resumo</span><h3>{summaryPrompt}</h3><TextAreaTask id="summary" label="Meu resumo" placeholder="Escreva seu resumo..." rows={5} minWords={4} attempts={attempts} setAttempts={setAttempts} /></GlassCard>
      <GlassCard><span className="reading-mini-label mint">Produção conectada</span><h3>{productionPrompt}</h3><TextAreaTask id="production" label="Minha produção" placeholder="Every morning, I..." rows={5} minWords={4} attempts={attempts} setAttempts={setAttempts} variant="mint" /></GlassCard>
      <FixedFooter onBack={goBack} helper={ready ? 'Resumo e produção prontos.' : 'Faça o resumo e a produção curta para liberar o gate.'}>
        <PrimaryButton variant={ready ? 'mint' : 'secondary'} disabled={!ready} onClick={() => { mark('summaryDone'); mark('productionDone'); goNext(); }}>Salvar produção <ArrowRight size={16} /></PrimaryButton>
      </FixedFooter>
    </div>
  );
}

function MasteryStage({ lesson, progress, goBack, restart }) {
  const items = [
    ['textRead', 'Texto lido'],
    ['comprehensionAttempted', 'Compreensão tentada'],
    ['evidenceRecorded', 'Evidência registrada'],
    ['summaryDone', 'Resumo feito'],
    ['productionDone', 'Produção conectada feita'],
  ];
  const completed = items.filter(([key]) => progress[key]).length;
  const allDone = completed === items.length;
  return (
    <div className="reading-stage-content fade-up">
      <GlassCard strong className="reading-mastery-hero">
        <div className="reading-trophy"><Trophy size={30} /></div>
        <span className="reading-mini-label">Mastery Gate</span>
        <h2>{allDone ? 'Reading desbloqueado' : 'Você está quase lá'}</h2>
        <p>{allDone ? 'A próxima fase é Prática Profunda complementar — você já garantiu a base.' : 'Complete os itens pendentes para liberar a prática profunda.'}</p>
        <div className="reading-mastery-bar"><i style={{ width: `${(completed / items.length) * 100}%` }} /></div>
        <b>{completed}/{items.length}</b>
      </GlassCard>
      <GlassCard className="reading-checklist-card">{items.map(([key, label]) => <div className={progress[key] ? 'done' : ''} key={key}><span>{progress[key] ? <Check size={15} /> : <Lock size={15} />}</span><p>{label}</p></div>)}</GlassCard>
      <GlassCard><span className="reading-mini-label mint">Depois da aula</span><p className="reading-soft-text">A Prática Profunda complementar fica abaixo da aula principal e reforça interpretação, vocabulário e produção.</p></GlassCard>
      <section className="reading-footer-tools"><AiTutorPanel lesson={lesson} /><StaticCompletionGate lesson={lesson} /></section>
      <FixedFooter onBack={goBack} helper="Você pode reiniciar a prévia ou concluir no gate oficial abaixo.">
        <PrimaryButton variant="secondary" onClick={restart}><RotateCcw size={15} /> Rever fluxo</PrimaryButton>
      </FixedFooter>
    </div>
  );
}

export function ReadingLessonFlow({ lesson }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [attempts, setAttempts] = useState({});
  const [progress, setProgress] = useState({ textRead: false, comprehensionAttempted: false, evidenceRecorded: false, summaryDone: false, productionDone: false });
  const safeStage = Math.max(0, Math.min(stageIndex, STAGES.length - 1));
  const mark = (key) => setProgress((current) => ({ ...current, [key]: true }));
  const goNext = () => setStageIndex((value) => Math.min(value + 1, STAGES.length - 1));
  const goBack = () => setStageIndex((value) => Math.max(value - 1, 0));
  const restart = () => { setStageIndex(0); setAttempts({}); setProgress({ textRead: false, comprehensionAttempted: false, evidenceRecorded: false, summaryDone: false, productionDone: false }); };
  const stage = STAGES[safeStage]?.key;

  return (
    <article className="reading-premium-flow">
      <div className="reading-aurora-bg" />
      <div className="reading-floating-orb orb-one" />
      <div className="reading-floating-orb orb-two" />
      <div className="reading-premium-shell">
        <ReadingHeader lesson={lesson} stageIndex={safeStage} onBack={goBack} />
        <ProgressStepper activeIndex={safeStage} />
        <main className="reading-premium-main">
          {stage === 'overview' ? <OverviewStage lesson={lesson} goNext={goNext} /> : null}
          {stage === 'text' ? <TextStage lesson={lesson} goNext={goNext} goBack={goBack} mark={mark} /> : null}
          {stage === 'comprehension' ? <ComprehensionStage lesson={lesson} attempts={attempts} setAttempts={setAttempts} goNext={goNext} goBack={goBack} mark={mark} /> : null}
          {stage === 'evidence' ? <EvidenceStage lesson={lesson} attempts={attempts} setAttempts={setAttempts} goNext={goNext} goBack={goBack} mark={mark} /> : null}
          {stage === 'summary' ? <SummaryStage lesson={lesson} attempts={attempts} setAttempts={setAttempts} goNext={goNext} goBack={goBack} mark={mark} /> : null}
          {stage === 'mastery' ? <MasteryStage lesson={lesson} progress={progress} goBack={goBack} restart={restart} /> : null}
        </main>
      </div>
    </article>
  );
}
