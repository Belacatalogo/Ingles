import { PhaseShell } from './PhaseShell.jsx';
import { clean, noteOf, textOf } from '../text/normalize.js';

function getTranslation(item) {
  if (typeof item !== 'object' || !item) return '';
  return clean(item.translation || item.pt || item.portuguese || item.meaning || item.note2 || '');
}

function getExample(item) {
  if (typeof item !== 'object' || !item) return '';
  return clean(item.example || item.sentence || item.use || '');
}

function isVocabItem(item) {
  if (typeof item !== 'object' || !item) return false;
  return Boolean(item.translation || item.pt || item.portuguese || item.meaning || item.word || item.phrase || item.term);
}

function VocabCard({ item, index, phaseId }) {
  const word = clean(item?.word || item?.phrase || item?.term || textOf(item));
  const translation = getTranslation(item);
  const note = noteOf(item);
  const example = getExample(item);

  return (
    <li key={`${phaseId}-item-${index}`} className="lesson-phase-vocab-card">
      <strong>{word}</strong>
      {translation ? <em>{translation}</em> : null}
      {note && note !== translation ? <span className="lesson-phase-vocab-note">{note}</span> : null}
      {example ? <span className="lesson-phase-vocab-example">"{example}"</span> : null}
    </li>
  );
}

function SimpleItem({ item, index, phaseId }) {
  const text = clean(item?.label || item?.step || item?.task || item?.rule || textOf(item));
  const note = noteOf(item);
  return (
    <li key={`${phaseId}-item-${index}`} className="lesson-phase-examples li">
      <b>{text}</b>
      {note ? <small>{note}</small> : null}
    </li>
  );
}

export function ListPhase({ phase }) {
  const items = Array.isArray(phase.items) ? phase.items : [];
  const hasVocab = items.some(isVocabItem);

  if (!items.length) {
    return (
      <PhaseShell eyebrow={phase.eyebrow || 'Estudo'} title={phase.bodyTitle || phase.title} instruction={phase.instruction}>
        <p className="lesson-flow-muted">Nenhum item cadastrado para esta etapa.</p>
      </PhaseShell>
    );
  }

  return (
    <PhaseShell eyebrow={phase.eyebrow || 'Estudo'} title={phase.bodyTitle || phase.title} instruction={phase.instruction}>
      <ul className={hasVocab ? 'lesson-phase-vocab-list lesson-phase-vocab-cards' : 'lesson-phase-examples'}>
        {items.map((item, index) =>
          hasVocab
            ? <VocabCard key={`${phase.id}-v-${index}`} item={item} index={index} phaseId={phase.id} />
            : <SimpleItem key={`${phase.id}-s-${index}`} item={item} index={index} phaseId={phase.id} />
        )}
      </ul>
    </PhaseShell>
  );
}
