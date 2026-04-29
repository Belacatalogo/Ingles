import { KeyRound, Plus, ShieldCheck, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  addLessonFlashKey,
  clearLessonProKey,
  getLessonKeysStatus,
  removeLessonFlashKey,
  saveLessonProKey,
} from '../../services/lessonKeys.js';

export function LessonKeysPanel() {
  const [draftFlashKey, setDraftFlashKey] = useState('');
  const [draftProKey, setDraftProKey] = useState('');
  const [version, setVersion] = useState(0);
  const status = useMemo(() => getLessonKeysStatus(), [version]);

  function refresh() {
    setVersion((value) => value + 1);
  }

  function handleAddFlash() {
    addLessonFlashKey(draftFlashKey);
    setDraftFlashKey('');
    refresh();
  }

  function handleSavePro() {
    saveLessonProKey(draftProKey);
    setDraftProKey('');
    refresh();
  }

  function handleClearPro() {
    clearLessonProKey();
    refresh();
  }

  return (
    <section className="lesson-keys-panel">
      <div className="panel-title"><KeyRound size={18} /> Chaves exclusivas de aulas</div>
      <p>
        Estas chaves são usadas somente para gerar aulas. Elas não substituem as chaves gerais de IA do restante do sistema.
      </p>

      <div className="lesson-key-status">
        <div>
          <ShieldCheck size={17} />
          <span>Flash/free</span>
          <strong>{status.flashCount}/{status.maxFlashKeys}</strong>
        </div>
        <div>
          <ShieldCheck size={17} />
          <span>Pro fallback</span>
          <strong>{status.proMasked || 'não configurada'}</strong>
        </div>
      </div>

      <div className="key-form">
        <label htmlFor="lesson-flash-key">Adicionar key Flash/free</label>
        <div>
          <input
            id="lesson-flash-key"
            value={draftFlashKey}
            onChange={(event) => setDraftFlashKey(event.target.value)}
            placeholder="AIza..."
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
          />
          <button type="button" onClick={handleAddFlash}><Plus size={16} /> Adicionar</button>
        </div>
      </div>

      <div className="saved-keys-list">
        {status.flashMasked.length ? status.flashMasked.map((key, index) => (
          <div className="saved-key-row" key={`${key}-${index}`}>
            <span>Flash {index + 1}</span>
            <strong>{key}</strong>
            <button type="button" onClick={() => { removeLessonFlashKey(index); refresh(); }}><Trash2 size={15} /></button>
          </div>
        )) : <p className="empty-note">Nenhuma key Flash/free exclusiva de aulas configurada.</p>}
      </div>

      <div className="key-form pro-form">
        <label htmlFor="lesson-pro-key">Key Pro paga — último caso</label>
        <div>
          <input
            id="lesson-pro-key"
            value={draftProKey}
            onChange={(event) => setDraftProKey(event.target.value)}
            placeholder="AIza..."
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
          />
          <button type="button" onClick={handleSavePro}><Plus size={16} /> Salvar Pro</button>
        </div>
        {status.proMasked ? (
          <button type="button" className="danger-button" onClick={handleClearPro}><Trash2 size={15} /> Remover Pro {status.proMasked}</button>
        ) : null}
      </div>
    </section>
  );
}
