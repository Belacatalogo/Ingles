import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Clock, RefreshCw, ShieldCheck, Sparkles, Target } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { PracticeLauncher } from '../practice/PracticeLauncher.jsx';
import { getCurrentLesson, getCurrentLessonFull } from '../services/lessonStore.js';
import { getLessonStats } from '../services/lessonStats.js';
import { recordLessonAsCurrentCurriculumUnit } from '../services/curriculumPracticeAdapter.js';
import { normalizeStaticLessonForDisplay } from '../services/staticLessonDisplayNormalizer.js';
import {
  GrammarLessonFlow,
  VocabularyLessonFlow,
  ReadingLessonFlowV2,
  ListeningLessonFlow,
  SpeakingLessonFlow,
  WritingLessonFlow,
} from '../lessons/flow/index.js';

const LessonScreenDevTools = import.meta.env.DEV
  ? lazy(() => import('./LessonScreen.devTools.jsx').then((module) => ({ default: module.LessonScreenDevTools })))
  : null;

const fallbackLesson = {
  id: 'fallback-reading',
  type: 'reading',
  pillar: 'reading',
  title: 'Reading — A rotina de uma manhã produtiva',
  level: 'A1',
  intro: 'Abra uma aula do curso fixo para estudar com explicação guiada, prática ativa e conclusão salva no seu progresso.',
};

const FLOW_BY_PILLAR = {
  grammar: GrammarLessonFlow,
  vocabulary: VocabularyLessonFlow,
  reading: ReadingLessonFlowV2,
  listening: ListeningLessonFlow,
  speaking: SpeakingLessonFlow,
  writing: WritingLessonFlow,
};

function cleanText(value) {
  if (typeof value === 'string' || typeof value === 'number') return String(value).trim();
  if (Array.isArray(value)) return cleanText(value.find((item) => cleanText(item)));
  if (value && typeof value === 'object') {
    return cleanText(value.text || value.title || value.description || value.objective || value.prompt || value.instruction);
  }
  return '';
}

function getLessonTitle(lesson) {
  return cleanText(lesson?.title).replace(/^(Reading|Grammar|Vocabulary|Listening|Writing|Speaking)\s*[—-]\s*/i, '') || 'Aula';
}

function getLessonDescription(lesson) {
  return cleanText(lesson?.intro || lesson?.subtitle || lesson?.objective || lesson?.objectives?.[0]) || 'Estude com explicação guiada, prática ativa e conclusão salva no seu progresso.';
}

function getLessonPillar(lesson) {
  return String(lesson?.pillar || lesson?.type || '').toLowerCase();
}

function getLessonTypeLabel(lesson) {
  return {
    reading: 'Leitura',
    grammar: 'Gramática',
    listening: 'Escuta',
    writing: 'Escrita',
    vocabulary: 'Vocabulário',
    speaking: 'Fala',
  }[getLessonPillar(lesson)] || 'Aula';
}

function isStaticLesson(lesson) {
  return String(lesson?.schemaVersion || '').startsWith('static-lesson-schema') || lesson?.status === 'ready';
}

function formatDateTime(value) {
  if (!value) return '';
  try {
    return new Date(value).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  } catch {
    return String(value).slice(0, 16);
  }
}

function LessonRenderer({ lesson }) {
  const pillar = getLessonPillar(lesson);
  const Flow = FLOW_BY_PILLAR[pillar];
  if (Flow) return <Flow lesson={lesson} />;

  return (
    <Card eyebrow={`Aula · ${lesson?.level || 'A1'}`} title={lesson?.title || 'Aula padrão'}>
      <p>Esta aula ainda não tem renderizador guiado por pilar.</p>
      {getLessonDescription(lesson) ? <p>{getLessonDescription(lesson)}</p> : null}
    </Card>
  );
}

function PracticeMount({ lesson }) {
  const pillar = getLessonPillar(lesson);
  if (pillar === 'listening' || pillar === 'speaking') return null;

  return (
    <section className="lesson-practice-mount lesson-practice-complement-mount">
      <Card eyebrow="Reforço" title="Prática extra da aula">
        <p>Use esta parte depois de concluir os exercícios principais da aula.</p>
      </Card>
      <PracticeLauncher lesson={lesson} />
    </section>
  );
}

export function LessonScreen({ lessonRevision = 0 }) {
  const [localRevision, setLocalRevision] = useState(0);
  const [pointerRevision, setPointerRevision] = useState(0);
  const [fullLesson, setFullLesson] = useState(null);
  const [loadedGenerationId, setLoadedGenerationId] = useState('');
  const [loadingFullLesson, setLoadingFullLesson] = useState(false);

  useEffect(() => {
    function refreshLesson() {
      setPointerRevision((value) => value + 1);
    }
    window.addEventListener('fluency:lesson-updated', refreshLesson);
    window.addEventListener('focus', refreshLesson);
    document.addEventListener('visibilitychange', refreshLesson);
    return () => {
      window.removeEventListener('fluency:lesson-updated', refreshLesson);
      window.removeEventListener('focus', refreshLesson);
      document.removeEventListener('visibilitychange', refreshLesson);
    };
  }, []);

  const savedLessonPointer = useMemo(() => getCurrentLesson(), [lessonRevision, pointerRevision, localRevision]);
  const pointerGenerationId = savedLessonPointer?.generationMeta?.id || '';

  useEffect(() => {
    if (!savedLessonPointer) {
      setFullLesson(null);
      setLoadedGenerationId('');
      setLoadingFullLesson(false);
      return;
    }
    if (pointerGenerationId && pointerGenerationId === loadedGenerationId && fullLesson) return;

    let active = true;
    setLoadingFullLesson(Boolean(savedLessonPointer?.storageMode === 'lesson-full-indexeddb-v1'));
    getCurrentLessonFull()
      .then((lesson) => {
        if (!active) return;
        const nextLesson = lesson || savedLessonPointer || null;
        setFullLesson(nextLesson);
        setLoadedGenerationId(nextLesson?.generationMeta?.id || pointerGenerationId || '');
      })
      .finally(() => {
        if (active) setLoadingFullLesson(false);
      });

    return () => {
      active = false;
    };
  }, [pointerGenerationId, lessonRevision, localRevision]); // eslint-disable-line react-hooks/exhaustive-deps

  const rawLesson = fullLesson || savedLessonPointer || fallbackLesson;
  const lesson = useMemo(() => normalizeStaticLessonForDisplay(rawLesson), [rawLesson]);
  const lessonStats = useMemo(() => getLessonStats(lesson), [lesson]);
  const usingSavedLesson = Boolean(savedLessonPointer || fullLesson);
  const staticLesson = isStaticLesson(lesson);
  const meta = lesson?.generationMeta || null;

  useEffect(() => {
    recordLessonAsCurrentCurriculumUnit(lesson);
  }, [lesson?.id, lesson?.title, lesson?.type, lesson?.pillar, lesson?.level, lesson?.generationMeta?.id]);

  function forceRefreshLesson() {
    setLoadedGenerationId('');
    setLocalRevision((value) => value + 1);
  }

  return (
    <section className="lesson-reference-screen lesson-guided-flow-screen">
      {LessonScreenDevTools ? (
        <Suspense fallback={null}>
          <LessonScreenDevTools lesson={lesson} onRefresh={forceRefreshLesson} />
        </Suspense>
      ) : null}

      <section className="lesson-reference-hero">
        <div className="lesson-chip-row">
          <span className="lesson-chip blue"><Sparkles size={11} /> {staticLesson ? 'Curso fixo premium' : usingSavedLesson ? 'Aula salva' : 'Aula inicial'}</span>
          <span className="lesson-chip">{getLessonTypeLabel(lesson)}</span>
          <span className="lesson-chip violet">{lesson?.level || 'A1'}</span>
          {lesson?.packageId ? <span className="lesson-chip">Pacote {lesson.packageId}</span> : null}
        </div>
        <h1>{getLessonTitle(lesson)}</h1>
        <p>{loadingFullLesson && savedLessonPointer && !fullLesson ? 'Carregando aula completa...' : getLessonDescription(lesson)}</p>
        <div className="lesson-generation-proof">
          <ShieldCheck size={15} />
          <span>
            <b>{staticLesson ? 'Aula fixa validada' : 'Renderizador guiado'}</b>
            <small>{meta?.generatedAt ? `Atualizada em ${formatDateTime(meta.generatedAt)}` : 'Fluxo por pilar sem cards técnicos.'}</small>
          </span>
        </div>
        <footer>
          <div>
            <span><Clock size={13} /> {lessonStats.minutes} min</span>
            <span><Target size={13} /> {lessonStats.exercises} ex.</span>
          </div>
          <button type="button" aria-label="Atualizar aula salva" onClick={forceRefreshLesson}><RefreshCw size={14} /></button>
        </footer>
      </section>

      <LessonRenderer lesson={lesson} />
      <PracticeMount lesson={lesson} />
    </section>
  );
}
