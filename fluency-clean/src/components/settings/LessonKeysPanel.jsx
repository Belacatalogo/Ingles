import { KeyRound, Plus, ShieldCheck, Trash2, Zap } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  addLessonFlashKey,
  clearLessonProKey,
  getLessonKeysStatus,
  removeLessonFlashKey,
  saveLessonProKey,
} from '../../services/lessonKeys.js';
import {
  clearExternalLessonProvider,
  getExternalLessonProviderStatus,
  saveExternalLessonProviderKey,
  saveExternalLessonProviderModel,
  setForceExternalLessonProviderNext,
} from '../../services/externalLessonProviders.js';

export function LessonKeysPanel() {
  const [draftFlashKey, setDraftFlashKey] = useState('');
  const [draftProKey, setDraftProKey] = useState('');
  const [draftGroqKey, setDraftGroqKey] = useState('');
  const [draftGroqModel, setDraftGroqModel] = useState('');
  const [draftCerebrasKey, setDraftCerebrasKey] = useState('');
  const [draftCerebrasModel, setDraftCerebrasModel] = useState('');
  const [version, setVersion] = useState(0);
  const status = useMemo(() => getLessonKeysStatus(), [version]);
  const externalStatus = useMemo(() => getExternalLessonProviderStatus(), [version]);

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

  function handleSaveGroq() {
    saveExternalLessonProviderKey('groq', draftGroqKey, draftGroqModel || externalStatus.groq.defaultModel);
    setDraftGroqKey('');
    setDraftGroqModel('');
    refresh();
  }

  function handleSaveGroqModel() {
    saveExternalLessonProviderModel('groq', draftGroqModel || externalStatus.groq.defaultModel);
    setDraftGroqModel('');
    refresh();
  }

  function handleClearGroq() {
    clearExternalLessonProvider('groq');
    refresh();
  }

  function handleSaveCerebras() {
    saveExternalLessonProviderKey('cerebras', draftCerebrasKey, draftCerebrasModel || externalStatus.cerebras.defaultModel);
    setDraftCerebrasKey('');
    setDraftCerebrasModel('');
    refresh();
  }

  function handleSaveCerebrasModel() {
    saveExternalLessonProviderModel('cerebras', draftCerebrasModel || externalStatus.cerebras.defaultModel);
    setDraftCerebrasModel('');
    refresh();
  }

  function handleClearCerebras() {
    clearExternalLessonProvider('cerebras');
    refresh();
  }

  function handleToggleForceExternal() {
    setForceExternalLessonProviderNext(!externalStatus.forceExternalNext);
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

      <div className="lesson-key-status">
        <div>
          <ShieldCheck size={17} />
          <span>Groq fallback</span>
          <strong>{externalStatus.groq.configured ? externalStatus.groq.masked : 'não configurada'}</strong>
        </div>
        <div>
          <ShieldCheck size={17} />
          <span>Cerebras fallback</span>
          <strong>{externalStatus.cerebras.configured ? externalStatus.cerebras.masked : 'não configurada'}</strong>
        </div>
      </div>

      <div className="key-form pro-form">
        <label>Teste controlado de fallback externo</label>
        <button type="button" className={externalStatus.forceExternalNext ? 'danger-button' : ''} onClick={handleToggleForceExternal}>
          <Zap size={16} /> {externalStatus.forceExternalNext ? 'Fallback externo será usado na próxima geração' : 'Forçar fallback externo na próxima geração'}
        </button>
        <p className="empty-note">Use isso só para teste. Quando ativo, a próxima geração pula Gemini e tenta Groq/Cerebras direto. Depois desliga sozinho.</p>
      </div>

      <div className="key-form pro-form">
        <label htmlFor="lesson-groq-key">Groq fallback externo</label>
        <div>
          <input
            id="lesson-groq-key"
            value={draftGroqKey}
            onChange={(event) => setDraftGroqKey(event.target.value)}
            placeholder="gsk_..."
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
          />
          <button type="button" onClick={handleSaveGroq}><Plus size={16} /> Salvar Groq</button>
        </div>
        <div>
          <input
            value={draftGroqModel}
            onChange={(event) => setDraftGroqModel(event.target.value)}
            placeholder={externalStatus.groq.model || externalStatus.groq.defaultModel}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
          />
          <button type="button" onClick={handleSaveGroqModel}>Modelo</button>
        </div>
        <p className="empty-note">Modelo atual: {externalStatus.groq.model}</p>
        {externalStatus.groq.configured ? (
          <button type="button" className="danger-button" onClick={handleClearGroq}><Trash2 size={15} /> Remover Groq {externalStatus.groq.masked}</button>
        ) : null}
      </div>

      <div className="key-form pro-form">
        <label htmlFor="lesson-cerebras-key">Cerebras fallback externo</label>
        <div>
          <input
            id="lesson-cerebras-key"
            value={draftCerebrasKey}
            onChange={(event) => setDraftCerebrasKey(event.target.value)}
            placeholder="csk_..."
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
          />
          <button type="button" onClick={handleSaveCerebras}><Plus size={16} /> Salvar Cerebras</button>
        </div>
        <div>
          <input
            value={draftCerebrasModel}
            onChange={(event) => setDraftCerebrasModel(event.target.value)}
            placeholder={externalStatus.cerebras.model || externalStatus.cerebras.defaultModel}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
          />
          <button type="button" onClick={handleSaveCerebrasModel}>Modelo</button>
        </div>
        <p className="empty-note">Modelo atual: {externalStatus.cerebras.model}</p>
        {externalStatus.cerebras.configured ? (
          <button type="button" className="danger-button" onClick={handleClearCerebras}><Trash2 size={15} /> Remover Cerebras {externalStatus.cerebras.masked}</button>
        ) : null}
      </div>
    </section>
  );
}
