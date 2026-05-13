import { useEffect, useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, Clock, Headphones, Mic, RefreshCw, ShieldCheck, Sparkles, Target, Zap } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { LessonQualityPanel } from '../components/lesson/LessonQualityPanel.jsx';
import { ReadingLessonGuided } from '../lessons/ReadingLessonGuided.jsx';
import { GrammarLesson } from '../lessons/GrammarLesson.jsx';
import { ListeningLessonClean } from '../lessons/ListeningLessonClean.jsx';
import { WritingLesson } from '../lessons/WritingLesson.jsx';
import { StaticLessonRenderer, isStaticLesson } from '../lessons/static/StaticLessonRenderer.jsx';
import { PracticeLauncher } from '../practice/PracticeLauncher.jsx';
import { getStaticLevel } from '../content/curriculum/index.js';
import { openStaticCourseLesson } from '../services/staticCourseLauncher.js';
import { getCurrentLesson, getCurrentLessonFull } from '../services/lessonStore.js';
import { getLessonStats } from '../services/lessonStats.js';
import { recordLessonAsCurrentCurriculumUnit } from '../services/curriculumPracticeAdapter.js';

const fallbackLesson = {
  id: 'fallback-reading',
  type: 'reading',
  title: 'Reading — A rotina de uma manhã produtiva',
  level: 'A1',
  intro: 'Abra uma aula do curso fixo para estudar com explicação guiada, prática ativa e conclusão salva no seu progresso.',
};

const lessonSections = [
  { id: 'warmup', title: 'Aquecimento', icon: Zap },
  { id: 'core', title: 'Conceito', icon: BookOpen },
  { id: 'practice', title: 'Prática', icon: Target },
  { id: 'speak', title: 'Fala', icon: Headphones },
  { id: 'review', title: 'Revisão', icon: CheckCircle2 },
];

const pillarOptions = [
  { id: 'real', label: 'Aula real', icon: Sparkles },
  { id: 'reading', label: 'Abrir Reading fixo', icon: BookOpen },
  { id: 'listening', label: 'Abrir Listening fixo', icon: Headphones },
  { id: 'speaking', label: 'Abrir Speaking fixo', icon: Mic },
];

function getLessonTitle(lesson) { return lesson?.title?.replace(/^(Reading|Grammar|Listening|Writing)\s*[—-]\s*/i, '') || 'Aula'; }
function getLessonDescription(lesson) { return lesson?.intro || lesson?.subtitle || lesson?.objective || lesson?.objectives?.[0] || 'Estude com explicação guiada, prática ativa e conclusão salva no seu progresso.'; }
function getLessonTypeLabel(lesson) { const labels = { reading: 'Leitura', grammar: 'Gramática', listening: 'Escuta', writing: 'Escrita', vocabulary: 'Vocabulário', speaking: 'Speaking' }; return labels[lesson?.type || lesson?.pillar] || 'Aula'; }
function formatDateTime(value) { if (!value) return ''; try { return new Date(value).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }); } catch { return String(value).slice(0, 16); } }
function isReadyStaticLesson(lesson) { return lesson?.status === 'ready' && String(lesson?.schemaVersion || '').startsWith('static-lesson-schema'); }
function firstReadyLessonByPillar(level = 'A1', pillar = '') { return (getStaticLevel(level)?.pillars?.[pillar] || []).find(isReadyStaticLesson) || null; }

function LessonRenderer({ lesson }) {
  if (isStaticLesson(lesson)) return <StaticLessonRenderer lesson={lesson} />;
  if (lesson?.type === 'reading') return <ReadingLessonGuided lesson={lesson} />;
  if (lesson?.type === 'grammar') return <GrammarLesson lesson={lesson} />;
  if (lesson?.type === 'listening') return <ListeningLessonClean lesson={lesson} />;
  if (lesson?.type === 'writing') return <WritingLesson lesson={lesson} />;

  return (
    <Card eyebrow={`Aula · ${lesson?.level || 'A1'}`} title={lesson?.title || 'Aula padrão'}>
      <p>Renderização padrão para aulas que ainda não ganharam layout específico.</p>
      {lesson?.intro ? <p>{lesson.intro}</p> : null}
    </Card>
  );
}

function PracticeMount({ lesson, complementary = false }) {
  if (isStaticLesson(lesson)) {
    return (
      <section className="lesson-practice-mount lesson-practice-complement-mount">
        <Card eyebrow="Complemento" title="Prática Profunda complementar">
          <p>Esta prática agora é derivada da aula fixa: usa exemplos, perguntas, texto, transcript, modelos e produção da própria aula. Ela vem depois dos exercícios internos e não substitui o conteúdo principal.</p>
        </Card>
        <PracticeLauncher lesson={lesson} />
      </section>
    );
  }
  if (!complementary) return <section className="lesson-practice-mount"><PracticeLauncher lesson={lesson} /></section>;
  return (
    <section className="lesson-practice-mount lesson-practice-complement-mount">
      <Card eyebrow="Complemento" title="Prática Profunda complementar">
        <p>Faça esta parte depois de terminar a aula Reading. Ela serve para reforçar vocabulário, detalhes e interpretação, não para substituir os exercícios da leitura.</p>
      </Card>
      <PracticeLauncher lesson={lesson} />
    </section>
  );
}

export function LessonScreen({ lessonRevision = 0 }) {
  const [activeSection, setActiveSection] = useState(0);
  const [localRevision, setLocalRevision] = useState(0);
  const [pointerRevision, setPointerRevision] = useState(0);
  const [fullLesson, setFullLesson] = useState(null);
  const [loadedGenerationId, setLoadedGenerationId] = useState('');
  const [loadingFullLesson, setLoadingFullLesson] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    function refreshLesson() { setPointerRevision((value) => value + 1); }
    window.addEventListener('fluency:lesson-updated', refreshLesson);
    window.addEventListener('focus', refreshLesson);
    document.addEventListener('visibilitychange', refreshLesson);
    return () => { window.removeEventListener('fluency:lesson-updated', refreshLesson); window.removeEventListener('focus', refreshLesson); document.removeEventListener('visibilitychange', refreshLesson); };
  }, []);

  const savedLessonPointer = useMemo(() => getCurrentLesson(), [lessonRevision, pointerRevision, localRevision]);
  const pointerGenerationId = savedLessonPointer?.generationMeta?.id || '';

  useEffect(() => {
    if (!savedLessonPointer) { setFullLesson(null); setLoadedGenerationId(''); setLoadingFullLesson(false); return; }
    if (pointerGenerationId && pointerGenerationId === loadedGenerationId && fullLesson) return;
    let active = true;
    setLoadingFullLesson(Boolean(savedLessonPointer?.storageMode === 'lesson-full-indexeddb-v1'));
    getCurrentLessonFull().then((lesson) => {
      if (!active) return;
      const nextLesson = lesson || savedLessonPointer || null;
      setFullLesson(nextLesson);
      setLoadedGenerationId(nextLesson?.generationMeta?.id || pointerGenerationId || '');
    }).finally(() => { if (active) setLoadingFullLesson(false); });
    return () => { active = false; };
  }, [pointerGenerationId, lessonRevision, localRevision]);

  const savedLesson = fullLesson || savedLessonPointer;
  const lesson = savedLesson || fallbackLesson;
  const staticLesson = isStaticLesson(lesson);
  const lessonStats = useMemo(() => getLessonStats(lesson), [lesson]);
  const usingGenerated = Boolean(savedLesson) && !staticLesson;
  const usingStatic = Boolean(savedLesson) && staticLesson;
  const isReading = lesson?.type === 'reading' || lesson?.pillar === 'reading';
  const currentProgress = Math.round(((activeSection + 1) / lessonSections.length) * 100);
  const meta = lesson?.generationMeta || null;
  const score = meta?.pedagogicalScore || lesson?.quality?.teacherScore || lesson?.quality?.pedagogicalScore || 0;

  useEffect(() => { recordLessonAsCurrentCurriculumUnit(lesson); }, [lesson?.id, lesson?.title, lesson?.type, lesson?.pillar, lesson?.level, lesson?.generationMeta?.id]);

  function jumpToSection(section, index) { setActiveSection(index); window.dispatchEvent(new CustomEvent('fluency:lesson-jump', { detail: { section: section.id } })); }
  function forceRefreshLesson() { setLoadedGenerationId(''); setLocalRevision((value) => value + 1); }

  function handlePillarShortcut(type) {
    if (type === 'real') { forceRefreshLesson(); setMessage('Aula real recarregada.'); return; }
    const target = firstReadyLessonByPillar('A1', type);
    if (!target) {
      setMessage(`${type[0].toUpperCase()}${type.slice(1)} ainda não tem aula fixa pronta conectada ao novo sistema. Vamos criar esse pilar nos próximos blocos.`);
      return;
    }
    const result = openStaticCourseLesson(target, { source: `lesson-pillar-shortcut-${type}` });
    if (!result.ok) { setMessage(result.reason || 'Não foi possível abrir a aula fixa deste pilar.'); return; }
    setMessage(`Aula fixa aberta: ${target.title}`);
    setActiveSection(0);
    setLoadedGenerationId('');
    setLocalRevision((value) => value + 1);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  return (
    <section className="lesson-reference-screen lesson-preview-lab-enabled">
      <section className="lesson-preview-lab-card" aria-label="Atalhos para aulas fixas por pilar">
        <div><strong>Atalhos do curso fixo</strong><small>Abre aulas reais do currículo novo. Não usa mais previews legados.</small></div>
        <div className="lesson-preview-lab-actions">{pillarOptions.map((option) => { const Icon = option.icon; const active = option.id !== 'real' && (lesson?.pillar === option.id || lesson?.type === option.id); return <button type="button" key={option.id} className={active ? 'active' : ''} onClick={() => handlePillarShortcut(option.id)}><Icon size={14} /> {option.label}</button>; })}</div>
        {message ? <p className="generator-message completion-message">{message}</p> : null}
      </section>

      <section className="lesson-reference-hero">
        <div className="lesson-chip-row">
          <span className="lesson-chip blue"><Sparkles size={11} /> {usingStatic ? 'Curso fixo premium' : usingGenerated ? 'Legado IA' : 'Aula inicial'}</span>
          <span className="lesson-chip">{getLessonTypeLabel(lesson)}</span>
          <span className="lesson-chip violet">{lesson?.level || 'A1'}</span>
          {lesson?.packageId ? <span className="lesson-chip">{lesson.packageId}</span> : null}
          {savedLessonPointer?.storageMode === 'lesson-full-indexeddb-v1' ? <span className="lesson-chip">IndexedDB completo</span> : null}
        </div>
        <h1>{getLessonTitle(lesson)}</h1>
        <p>{loadingFullLesson && savedLessonPointer && !fullLesson ? 'Carregando aula completa...' : getLessonDescription(lesson)}</p>
        {usingGenerated ? (
          <div className="lesson-generation-proof"><ShieldCheck size={15} /><span>{meta?.id ? <b>{meta.id}</b> : <b>Aula antiga sem ID de geração</b>}<small>{meta?.contractVersion || 'sem contrato antigo'} · qualidade {score}/100{meta?.generatedAt ? ` · ${formatDateTime(meta.generatedAt)}` : ''}</small></span></div>
        ) : null}
        {usingStatic ? <div className="lesson-generation-proof"><ShieldCheck size={15} /><span><b>Aula fixa validável</b><small>{lesson.schemaVersion || 'static schema'} · exercícios internos antes da Prática Profunda</small></span></div> : null}
        <footer><div><span><Clock size={13} /> {lessonStats.minutes} min</span><span><Target size={13} /> {lessonStats.exercises} ex.</span></div><button type="button" aria-label="Atualizar aula salva" onClick={forceRefreshLesson}><RefreshCw size={14} /></button></footer>
      </section>

      {usingGenerated ? <LessonQualityPanel lesson={lesson} /> : null}

      <section className="lesson-stepper-card"><div className="lesson-stepper-row">{lessonSections.map((section, index) => { const Icon = index < activeSection ? CheckCircle2 : section.icon; const active = index === activeSection; const done = index < activeSection; return <button type="button" key={section.id} className={active ? 'active' : done ? 'done' : ''} onClick={() => jumpToSection(section, index)}><Icon size={12} />{section.title}</button>; })}</div></section>
      <section className="lesson-progress-strip"><div><span>Progresso da aula</span><strong>{activeSection + 1}/{lessonSections.length}</strong></div><i><b style={{ width: `${currentProgress}%` }} /></i></section>

      <LessonRenderer lesson={lesson} />
      <PracticeMount lesson={lesson} complementary={isReading || staticLesson} />
    </section>
  );
}
