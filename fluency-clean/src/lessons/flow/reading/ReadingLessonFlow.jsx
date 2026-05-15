import { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Brain, Check, ChevronLeft, Coffee, Eye, Lightbulb, Lock, Map, Quote, RotateCcw, Search, ShieldCheck, Sparkles, Target, Trophy } from 'lucide-react';
import { AiTutorPanel } from '../../../components/tutor/AiTutorPanel.jsx';
import { StaticCompletionGate } from '../../static/StaticCompletionGate.jsx';
import './reading-lesson-flow.css';

const TECHNICAL_WORDS = new Set(['subject', 'expected', 'answer', 'correctAnswer', 'expectedAnswer', 'schemaVersion', 'undefined', 'null', '[object Object]']);
const STAGES = [
  { key: 'overview', label: 'Missão' },
  { key: 'prepare', label: 'Preparar' },
  { key: 'text', label: 'Ler' },
  { key: 'comprehension', label: 'Memória' },
  { key: 'focus', label: 'Foco' },
  { key: 'evidence', label: 'Prova' },
  { key: 'context', label: 'Contexto' },
  { key: 'summary', label: 'Produzir' },
  { key: 'recap', label: 'Revisar' },
  { key: 'mastery', label: 'Gate' },
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
function meaningOf(value) {
  if (!value || typeof value !== 'object') return '';
  return firstUseful(value.meaning, value.translation, value.note, value.explanation, value.expectedUse);
}
function asList(value) { if (Array.isArray(value)) return value; return hasText(value) ? [value] : []; }
function mergeLists(...groups) {
  return groups.flatMap(asList).filter((item) => hasText(textOf(item)) || hasText(noteOf(item)) || hasText(item?.word) || hasText(item?.meaning));
}
function wordCount(value) { return clean(value).split(/\s+/).filter(Boolean).length; }
function stripPillarPrefix(title = '') { return clean(title).replace(/^Reading\s*[—-]\s*/i, '') || 'Aula de Reading'; }
function uniqueItems(list) { const seen = new Set(); return list.filter((item) => { const key = clean(typeof item === 'string' ? item : textOf(item)).toLowerCase(); if (!key || seen.has(key)) return false; seen.add(key); return true; }); }

function getVocabularyAnchors(lesson) {
  return uniqueItems(mergeLists(lesson.preReadingVocabulary, lesson.vocabulary, lesson.keyVocabulary, lesson.contextVocabularyTasks))
    .map((item) => firstUseful(item.word, item.term, textOf(item)))
    .filter(Boolean);
}
function getObjectives(lesson) { return safeArray(lesson.objectives).map(textOf).filter(Boolean); }
function getMainText(lesson) { return firstUseful(lesson.mainText, lesson.text, lesson.readingText, lesson.content, lesson.transcript) || 'Texto principal ainda não encontrado para esta aula.'; }
function getPreparationItems(lesson) {
  const base = mergeLists(lesson.readingStrategy, lesson.preReading, lesson.preReadingTasks, lesson.beforeReading, lesson.preReadingVocabulary);
  return base.length ? base : [
    'Descubra quem aparece no texto.',
    'Procure onde a pessoa está ou vive.',
    'Identifique o que ela faz na rotina.',
  ];
}
function getComprehensionTasks(lesson) {
  const list = mergeLists([lesson.firstReadTask].filter(Boolean), lesson.firstReadTasks, lesson.comprehensionQuestions);
  return list.length ? list : [{ prompt: 'Qual é a ideia geral do texto?' }];
}
function getFocusTasks(lesson) {
  const list = mergeLists(lesson.secondReadTasks, lesson.readingFocusTasks, lesson.detailQuestions);
  return list.length ? list : [{ prompt: 'Volte ao texto e encontre uma informação específica importante.' }];
}
function getEvidenceTasks(lesson) {
  const list = mergeLists(lesson.evidenceQuestions, lesson.comprehensionQuestions);
  return list.length ? list : [{ question: 'Where does the main person work/live?', prompt: 'Copie a frase do texto que comprova sua resposta.' }];
}
function getContextVocabularyTasks(lesson) {
  return uniqueItems(mergeLists(lesson.contextVocabularyTasks, lesson.vocabularyInContext, lesson.preReadingVocabulary, lesson.vocabulary));
}
function getSummaryTasks(lesson) {
  return mergeLists([lesson.guidedSummary, lesson.connectedProduction, lesson.productionTask].filter(Boolean), lesson.productionTasks);
}
function getRecapItems(lesson) {
  const list = safeArray(lesson.lessonRecap).map(textOf).filter(Boolean);
  return list.length ? list : ['Você leu o texto principal.', 'Você respondeu de memória.', 'Você voltou ao texto para provar respostas.', 'Você produziu algo próprio a partir da leitura.'];
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
function CoachNote({ icon: Icon = Sparkles, title, children, tone = 'blue' }) {
  return <div className={`reading-coach-note ${tone}`}><Icon size={17} /><div><strong>{title}</strong><p>{children}</p></div></div>;
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
      <GlassCard className="reading-study-path-card">
        <span className="reading-mini-label">Como vamos estudar</span>
        <div className="reading-study-path">
          <b>Preparar</b><i />
          <b>Ler</b><i />
          <b>Lembrar</b><i />
          <b>Provar</b><i />
          <b>Produzir</b>
        </div>
        <p>Você não vai só ver conteúdo. Vai passar por uma sequência de leitura ativa, tentativa, evidência e produção.</p>
      </GlassCard>
      <div className="reading-two-card-grid">
        <GlassCard>
          <span className="reading-mini-label">Âncoras completas</span>
          <div className="reading-vocab-cloud">{(vocab.length ? vocab : ['name', 'city', 'work', 'morning', 'usually']).map((word) => <b key={word}>{word}</b>)}</div>
        </GlassCard>
        <GlassCard>
          <span className="reading-mini-label">Regra do fluxo</span>
          <p className="reading-soft-text"><Lock size={14} /> Perguntas, modelos e produção ficam fora da leitura inicial, mas o conteúdo profundo não é cortado.</p>
        </GlassCard>
      </div>
      <FixedFooter backDisabled helper="Primeiro vamos preparar seu foco antes de abrir o texto.">
        <PrimaryButton onClick={goNext}>Preparar leitura <ArrowRight size={16} /></PrimaryButton>
      </FixedFooter>
    </div>
  );
}

function PrepareStage({ lesson, attempts, setAttempts, goNext, goBack, mark }) {
  const items = getPreparationItems(lesson);
  const ready = wordCount(attempts.readingMission) >= 3;
  return (
    <div className="reading-stage-content fade-up">
      <div className="reading-stage-title-block compact">
        <StageBadge icon={Eye}>Antes de ler</StageBadge>
        <h2>Prepare seu cérebro.</h2>
        <p>Reading melhora quando você sabe o que procurar. Não comece tentando traduzir tudo.</p>
      </div>
      <CoachNote icon={Lightbulb} title="Postura de estudo">Leia como investigador: primeiro descubra o sentido geral, depois volte para detalhes e evidências.</CoachNote>
      <GlassCard strong>
        <span className="reading-mini-label">Preparação completa da aula</span>
        <div className="reading-prep-list">{items.map((item, index) => <article key={`${textOf(item)}-${index}`}><b>{index + 1}</b><p>{textOf(item)}</p>{meaningOf(item) ? <small>{meaningOf(item)}</small> : null}</article>)}</div>
      </GlassCard>
      <GlassCard>
        <span className="reading-mini-label mint">Missão pessoal</span>
        <h3>Antes de abrir o texto, escreva o que você precisa descobrir.</h3>
        <TextAreaTask id="readingMission" label="Minha missão de leitura" placeholder="Ex: descobrir quem é a pessoa e qual é a rotina dela..." rows={3} minWords={3} attempts={attempts} setAttempts={setAttempts} variant="mint" />
      </GlassCard>
      <FixedFooter onBack={goBack} helper={ready ? 'Missão definida. Agora leia com foco.' : 'Defina uma missão curta antes de ler.'}>
        <PrimaryButton variant={ready ? 'primary' : 'secondary'} disabled={!ready} onClick={() => { mark('prepared'); goNext(); }}>Abrir texto <ArrowRight size={16} /></PrimaryButton>
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
      <CoachNote icon={Coffee} title="Como estudar esta tela" tone="amber">Leia até o fim sem pausar a cada palavra. Entender 70% com fluidez é melhor do que travar tentando traduzir 100%.</CoachNote>
      <GlassCard strong className="reading-text-card">
        <div className="reading-text-card-head">
          <div className="reading-card-icon amber"><Coffee size={18} /></div>
          <div><span>Texto · {lesson.level || 'A1'}</span><strong>{stripPillarPrefix(lesson.title)}</strong></div>
        </div>
        <article className="reading-main-text"><p>{getMainText(lesson)}</p></article>
        <footer><span>Texto principal completo</span><span>Leia sem traduzir palavra por palavra</span></footer>
      </GlassCard>
      <FixedFooter onBack={goBack} helper="Confirme só depois de ler o texto inteiro.">
        <PrimaryButton onClick={() => { mark('textRead'); goNext(); }}>Li o texto <ArrowRight size={16} /></PrimaryButton>
      </FixedFooter>
    </div>
  );
}

function ComprehensionStage({ lesson, attempts, setAttempts, goNext, goBack, mark }) {
  const list = getComprehensionTasks(lesson);
  const ready = list.every((item, index) => wordCount(attempts[`comp-${index}`]) >= 2);
  return (
    <div className="reading-stage-content fade-up">
      <div className="reading-stage-title-block compact">
        <StageBadge icon={Brain} tone="violet">Primeira compreensão</StageBadge>
        <h2>Agora responda de memória.</h2>
        <p>O objetivo é medir compreensão real, não procurar visualmente a resposta.</p>
      </div>
      <CoachNote icon={Brain} title="Por que sem olhar?" tone="violet">Esse momento transforma leitura passiva em estudo ativo. Tente primeiro, mesmo que sua resposta fique simples.</CoachNote>
      {list.map((item, index) => <GlassCard strong key={index} className="reading-question-card"><span className="reading-mini-label">Pergunta de memória {index + 1}</span><h3>{textOf(item) || 'Qual é a ideia geral do texto?'}</h3>{noteOf(item) ? <p>{noteOf(item)}</p> : null}<TextAreaTask id={`comp-${index}`} label="Sua tentativa" placeholder="Responda com suas palavras..." attempts={attempts} setAttempts={setAttempts} /></GlassCard>)}
      <FixedFooter onBack={goBack} helper={ready ? 'Tentativa pronta. Agora vamos voltar ao texto com foco.' : 'Registre uma tentativa curta em todas as perguntas antes de avançar.'}>
        <PrimaryButton variant={ready ? 'primary' : 'secondary'} disabled={!ready} onClick={() => { mark('comprehensionAttempted'); goNext(); }}>Registrar tentativa <ArrowRight size={16} /></PrimaryButton>
      </FixedFooter>
    </div>
  );
}

function FocusStage({ lesson, attempts, setAttempts, goNext, goBack, mark }) {
  const list = getFocusTasks(lesson);
  const ready = list.every((item, index) => wordCount(attempts[`focus-${index}`]) >= 2);
  return (
    <div className="reading-stage-content fade-up">
      <div className="reading-stage-title-block compact">
        <StageBadge icon={Search}>Segunda leitura</StageBadge>
        <h2>Volte ao texto com uma missão.</h2>
        <p>Agora você não lê tudo igual. Você procura informações específicas.</p>
      </div>
      <GlassCard className="reading-text-mini-card">
        <span className="reading-mini-label">Texto completo disponível para consulta</span>
        <p>{getMainText(lesson)}</p>
      </GlassCard>
      {list.map((item, index) => <GlassCard strong key={index} className="reading-question-card"><span className="reading-mini-label">Foco {index + 1}</span><h3>{textOf(item)}</h3>{noteOf(item) ? <p>{noteOf(item)}</p> : null}<TextAreaTask id={`focus-${index}`} label="O que encontrei" placeholder="Anote a informação encontrada no texto..." rows={3} minWords={2} attempts={attempts} setAttempts={setAttempts} /></GlassCard>)}
      <FixedFooter onBack={goBack} helper={ready ? 'Leitura com foco concluída. Agora vamos provar.' : 'Responda todos os focos de segunda leitura.'}>
        <PrimaryButton variant={ready ? 'primary' : 'secondary'} disabled={!ready} onClick={() => { mark('focusedRead'); goNext(); }}>Ir para evidência <ArrowRight size={16} /></PrimaryButton>
      </FixedFooter>
    </div>
  );
}

function EvidenceStage({ lesson, attempts, setAttempts, goNext, goBack, mark }) {
  const list = getEvidenceTasks(lesson);
  const ready = list.every((item, index) => hasText(attempts[`evidence-answer-${index}`]) && wordCount(attempts[`evidence-proof-${index}`]) >= 3);
  return (
    <div className="reading-stage-content fade-up">
      <div className="reading-stage-title-block compact">
        <StageBadge icon={ShieldCheck} tone="mint">Reading exige evidência</StageBadge>
        <h2>Prove com o texto.</h2>
        <p>Resposta sem trecho do texto vira chute. Aqui a leitura vira investigação.</p>
      </div>
      <CoachNote icon={ShieldCheck} title="Regra de ouro" tone="mint">Toda resposta importante precisa de uma frase do texto que comprove. Isso treina leitura de verdade.</CoachNote>
      {list.map((item, index) => <GlassCard strong key={index} className="reading-evidence-card"><span className="reading-mini-label">Evidência {index + 1}</span><h3>{textOf(item)}</h3>{noteOf(item) ? <p>{noteOf(item)}</p> : null}<TextAreaTask id={`evidence-answer-${index}`} label="Sua resposta" placeholder="Digite a resposta..." rows={2} minWords={1} attempts={attempts} setAttempts={setAttempts} /><TextAreaTask id={`evidence-proof-${index}`} label={<><Quote size={13} /> Evidência do texto</>} placeholder="Copie a frase do texto que comprova..." rows={3} minWords={3} attempts={attempts} setAttempts={setAttempts} variant="dashed" />{expectedOf(item) && hasText(attempts[`evidence-answer-${index}`]) ? <div className="reading-model-after-attempt"><Check size={14} /> Modelo para comparar: <b>{expectedOf(item)}</b></div> : null}</GlassCard>)}
      <FixedFooter onBack={goBack} helper={ready ? 'Evidência registrada. Agora vamos estudar palavras pelo contexto.' : 'Preencha resposta e evidência em todas as questões para avançar.'}>
        <PrimaryButton variant={ready ? 'mint' : 'secondary'} disabled={!ready} onClick={() => { mark('evidenceRecorded'); goNext(); }}>Validar evidência <ArrowRight size={16} /></PrimaryButton>
      </FixedFooter>
    </div>
  );
}

function ContextStage({ lesson, attempts, setAttempts, goNext, goBack, mark }) {
  const list = getContextVocabularyTasks(lesson);
  const activeList = list.length ? list : ['Escolha uma palavra do texto e tente entender pelo contexto.'];
  const ready = wordCount(attempts.contextInsight) >= 3;
  return (
    <div className="reading-stage-content fade-up">
      <div className="reading-stage-title-block compact">
        <StageBadge icon={Lightbulb} tone="mint">Vocabulário pelo contexto</StageBadge>
        <h2>Não memorize solto.</h2>
        <p>Agora olhe as palavras/chunks dentro da leitura e conecte significado com situação.</p>
      </div>
      <GlassCard strong>
        <span className="reading-mini-label">Vocabulário contextual completo</span>
        <div className="reading-context-grid">{activeList.map((item, index) => <article key={`${textOf(item)}-${index}`}><b>{firstUseful(item.word, item.term, textOf(item))}</b>{meaningOf(item) ? <span>{meaningOf(item)}</span> : null}{item.example ? <p>{item.example}</p> : null}</article>)}</div>
      </GlassCard>
      <GlassCard>
        <span className="reading-mini-label mint">Minha descoberta</span>
        <h3>Escolha uma palavra/chunk e explique como o texto ajudou você a entender.</h3>
        <TextAreaTask id="contextInsight" label="Entendi pelo contexto" placeholder="Ex: café aparece perto de work, então entendi que é o local de trabalho..." rows={4} minWords={3} attempts={attempts} setAttempts={setAttempts} variant="mint" />
      </GlassCard>
      <FixedFooter onBack={goBack} helper={ready ? 'Vocabulário conectado ao texto.' : 'Registre uma descoberta curta de vocabulário.'}>
        <PrimaryButton variant={ready ? 'mint' : 'secondary'} disabled={!ready} onClick={() => { mark('contextReviewed'); goNext(); }}>Continuar <ArrowRight size={16} /></PrimaryButton>
      </FixedFooter>
    </div>
  );
}

function SummaryStage({ lesson, attempts, setAttempts, goNext, goBack, mark }) {
  const tasks = getSummaryTasks(lesson);
  const summaryPrompt = textOf(tasks[0]) || 'Escreva em português ou inglês simples o que você entendeu.';
  const productionPrompt = textOf(tasks[1]) || 'Agora escreva frases sobre sua própria rotina usando o texto como modelo.';
  const extraTasks = tasks.slice(2);
  const extraReady = extraTasks.every((item, index) => wordCount(attempts[`summary-extra-${index}`]) >= 3);
  const ready = wordCount(attempts.summary) >= 4 && wordCount(attempts.production) >= 4 && extraReady;
  return (
    <div className="reading-stage-content fade-up">
      <div className="reading-stage-title-block compact">
        <StageBadge icon={Sparkles} tone="violet">Resumo & produção</StageBadge>
        <h2>Transforme leitura em prática.</h2>
        <p>Feche a aula produzindo algo seu, sem perder o foco do Reading.</p>
      </div>
      <CoachNote icon={Map} title="Como escrever agora" tone="violet">Use o texto como modelo de estrutura, mas troque as informações para criar uma resposta sua.</CoachNote>
      <GlassCard strong><span className="reading-mini-label">Resumo</span><h3>{summaryPrompt}</h3><TextAreaTask id="summary" label="Meu resumo" placeholder="Escreva seu resumo..." rows={5} minWords={4} attempts={attempts} setAttempts={setAttempts} /></GlassCard>
      <GlassCard><span className="reading-mini-label mint">Produção conectada</span><h3>{productionPrompt}</h3><TextAreaTask id="production" label="Minha produção" placeholder="Every morning, I..." rows={5} minWords={4} attempts={attempts} setAttempts={setAttempts} variant="mint" /></GlassCard>
      {extraTasks.map((item, index) => <GlassCard key={`${textOf(item)}-${index}`}><span className="reading-mini-label violet">Tarefa extra da aula profunda {index + 1}</span><h3>{textOf(item)}</h3>{noteOf(item) ? <p className="reading-soft-text">{noteOf(item)}</p> : null}<TextAreaTask id={`summary-extra-${index}`} label="Minha resposta" placeholder="Responda a tarefa extra..." rows={4} minWords={3} attempts={attempts} setAttempts={setAttempts} /></GlassCard>)}
      <FixedFooter onBack={goBack} helper={ready ? 'Resumo e produção prontos. Vamos revisar.' : 'Faça todas as produções da aula para liberar a revisão.'}>
        <PrimaryButton variant={ready ? 'mint' : 'secondary'} disabled={!ready} onClick={() => { mark('summaryDone'); mark('productionDone'); goNext(); }}>Salvar produção <ArrowRight size={16} /></PrimaryButton>
      </FixedFooter>
    </div>
  );
}

function RecapStage({ lesson, attempts, setAttempts, goNext, goBack, mark }) {
  const items = getRecapItems(lesson);
  const ready = wordCount(attempts.finalReflection) >= 3;
  return (
    <div className="reading-stage-content fade-up">
      <div className="reading-stage-title-block compact">
        <StageBadge icon={Check} tone="mint">Revisão final</StageBadge>
        <h2>Veja o que você realmente fez.</h2>
        <p>A sensação de estudo vem de perceber o caminho percorrido, não só clicar em concluir.</p>
      </div>
      <GlassCard strong className="reading-recap-card">
        <span className="reading-mini-label">Checklist pedagógico completo</span>
        {items.map((item, index) => <article key={`${item}-${index}`}><Check size={15} /><p>{item}</p></article>)}
      </GlassCard>
      <GlassCard>
        <span className="reading-mini-label violet">Reflexão curta</span>
        <h3>O que ficou mais claro depois desta leitura?</h3>
        <TextAreaTask id="finalReflection" label="Minha reflexão" placeholder="Ex: entendi melhor como descrever uma rotina simples..." rows={3} minWords={3} attempts={attempts} setAttempts={setAttempts} />
      </GlassCard>
      <FixedFooter onBack={goBack} helper={ready ? 'Revisão registrada. Agora vá para o gate.' : 'Escreva uma reflexão curta para fechar o estudo.'}>
        <PrimaryButton variant={ready ? 'mint' : 'secondary'} disabled={!ready} onClick={() => { mark('recapDone'); goNext(); }}>Ir para Mastery Gate <ArrowRight size={16} /></PrimaryButton>
      </FixedFooter>
    </div>
  );
}

function MasteryStage({ lesson, progress, goBack, restart }) {
  const items = [
    ['prepared', 'Missão de leitura definida'],
    ['textRead', 'Texto lido sem perguntas'],
    ['comprehensionAttempted', 'Compreensão de memória tentada'],
    ['focusedRead', 'Segunda leitura com foco feita'],
    ['evidenceRecorded', 'Evidência registrada'],
    ['contextReviewed', 'Vocabulário conectado ao contexto'],
    ['summaryDone', 'Resumo feito'],
    ['productionDone', 'Produção conectada feita'],
    ['recapDone', 'Revisão final registrada'],
  ];
  const completed = items.filter(([key]) => progress[key]).length;
  const allDone = completed === items.length;
  return (
    <div className="reading-stage-content fade-up">
      <GlassCard strong className="reading-mastery-hero">
        <div className="reading-trophy"><Trophy size={30} /></div>
        <span className="reading-mini-label">Mastery Gate</span>
        <h2>{allDone ? 'Reading desbloqueado' : 'Você está quase lá'}</h2>
        <p>{allDone ? 'Você completou o ciclo de estudo: preparar, ler, lembrar, provar, produzir e revisar.' : 'Complete os itens pendentes para liberar a prática profunda.'}</p>
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

const INITIAL_PROGRESS = {
  prepared: false,
  textRead: false,
  comprehensionAttempted: false,
  focusedRead: false,
  evidenceRecorded: false,
  contextReviewed: false,
  summaryDone: false,
  productionDone: false,
  recapDone: false,
};

export function ReadingLessonFlow({ lesson }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [attempts, setAttempts] = useState({});
  const [progress, setProgress] = useState(INITIAL_PROGRESS);
  const safeStage = Math.max(0, Math.min(stageIndex, STAGES.length - 1));
  const mark = (key) => setProgress((current) => ({ ...current, [key]: true }));
  const goNext = () => setStageIndex((value) => Math.min(value + 1, STAGES.length - 1));
  const goBack = () => setStageIndex((value) => Math.max(value - 1, 0));
  const restart = () => { setStageIndex(0); setAttempts({}); setProgress(INITIAL_PROGRESS); };
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
          {stage === 'prepare' ? <PrepareStage lesson={lesson} attempts={attempts} setAttempts={setAttempts} goNext={goNext} goBack={goBack} mark={mark} /> : null}
          {stage === 'text' ? <TextStage lesson={lesson} goNext={goNext} goBack={goBack} mark={mark} /> : null}
          {stage === 'comprehension' ? <ComprehensionStage lesson={lesson} attempts={attempts} setAttempts={setAttempts} goNext={goNext} goBack={goBack} mark={mark} /> : null}
          {stage === 'focus' ? <FocusStage lesson={lesson} attempts={attempts} setAttempts={setAttempts} goNext={goNext} goBack={goBack} mark={mark} /> : null}
          {stage === 'evidence' ? <EvidenceStage lesson={lesson} attempts={attempts} setAttempts={setAttempts} goNext={goNext} goBack={goBack} mark={mark} /> : null}
          {stage === 'context' ? <ContextStage lesson={lesson} attempts={attempts} setAttempts={setAttempts} goNext={goNext} goBack={goBack} mark={mark} /> : null}
          {stage === 'summary' ? <SummaryStage lesson={lesson} attempts={attempts} setAttempts={setAttempts} goNext={goNext} goBack={goBack} mark={mark} /> : null}
          {stage === 'recap' ? <RecapStage lesson={lesson} attempts={attempts} setAttempts={setAttempts} goNext={goNext} goBack={goBack} mark={mark} /> : null}
          {stage === 'mastery' ? <MasteryStage lesson={lesson} progress={progress} goBack={goBack} restart={restart} /> : null}
        </main>
      </div>
    </article>
  );
}
