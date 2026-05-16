import { useState } from 'react';
import { RefreshCw, FlaskConical } from 'lucide-react';
import { getStaticLessons } from '../content/curriculum/index.js';
import { storage } from '../services/storage.js';

const PILLARS = ['grammar', 'vocabulary', 'reading', 'listening', 'speaking', 'writing'];
const PILLAR_LABELS = { grammar: 'Grammar', vocabulary: 'Vocabulary', reading: 'Reading', listening: 'Listening', speaking: 'Speaking', writing: 'Writing' };

function findFirstReadyByPillar(pillar) {
  const all = getStaticLessons('A1');
  return all.find((lesson) => lesson.pillar === pillar && lesson.status === 'ready') || null;
}

export function LessonScreenDevTools({ lesson, onRefresh }) {
  if (!import.meta.env.DEV) return null;
  const [previewMsg, setPreviewMsg] = useState('');

  function previewPillar(pillar) {
    const target = findFirstReadyByPillar(pillar);
    if (!target) { setPreviewMsg(`Nenhuma aula "${pillar}" ready encontrada.`); return; }
    const now = new Date().toISOString();
    const fullLesson = {
      ...target,
      type: target.pillar,
      provider: 'static',
      _devPreview: true,
      generationMeta: {
        id: `dev-preview-${target.id}`,
        source: 'dev-preview',
        provider: 'static',
        model: 'curated',
        status: 'ready',
        generatedAt: now,
        savedAt: now,
        contractVersion: target.schemaVersion || 'static-lesson-schema-v1',
        pedagogicalScore: 100,
      },
    };
    storage.set('lesson.current', fullLesson);
    window.dispatchEvent(new CustomEvent('fluency:lesson-updated', { detail: { lessonId: target.id, status: 'dev-preview' } }));
    setPreviewMsg(`Preview: ${target.id} — ${target.title}`);
    onRefresh?.();
  }

  return (
    <section className="lesson-preview-lab-card" aria-label="Ferramentas de desenvolvimento da aula">
      <div>
        <strong>DEV · Aula</strong>
        <small>Este painel aparece apenas em desenvolvimento. Preview não altera progresso real.</small>
      </div>
      <div className="lesson-preview-lab-actions">
        <button type="button" onClick={onRefresh}><RefreshCw size={14} /> Recarregar</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
        {PILLARS.map((pillar) => (
          <button
            key={pillar}
            type="button"
            style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'var(--bg-muted,#222)', border: '1px solid var(--border,#444)', cursor: 'pointer' }}
            onClick={() => previewPillar(pillar)}
            title={`Abrir preview de ${PILLAR_LABELS[pillar]}`}
          >
            <FlaskConical size={11} /> {PILLAR_LABELS[pillar]}
          </button>
        ))}
      </div>
      <p className="generator-message completion-message" style={{ marginTop: '0.4rem' }}>
        {lesson?.id ? `Renderizando: ${lesson.id}${lesson._devPreview ? ' [preview dev]' : ''}` : 'Nenhuma aula salva detectada.'}{previewMsg ? ` — ${previewMsg}` : ''}
      </p>
    </section>
  );
}
