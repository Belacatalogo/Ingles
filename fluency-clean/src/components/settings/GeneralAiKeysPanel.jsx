import { Bot, Plus, ShieldCheck, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { addGeneralAiKey, getGeneralAiKeysStatus, removeGeneralAiKey } from '../../services/aiKeys.js';

export function GeneralAiKeysPanel() {
  const [draftKey, setDraftKey] = useState('');
  const [version, setVersion] = useState(0);
  const status = useMemo(() => getGeneralAiKeysStatus(), [version]);

  function refresh() {
    setVersion((value) => value + 1);
  }

  function handleAddKey() {
    addGeneralAiKey(draftKey);
    setDraftKey('');
    refresh();
  }

  return (
    <section className="settings-key-panel general-ai-key-panel">
      <div className="settings-key-panel-title">
        <Bot size={18} />
        <div>
          <strong>Chaves gerais de IA</strong>
          <span>Speaking, Imersão e outras áreas inteligentes</span>
        </div>
      </div>

      <p>
        Use esta área para keys Gemini que poderão alimentar recursos de IA fora da geração de aulas. As chaves de aulas continuam isoladas abaixo.
      </p>

      <div className="settings-key-status">
        <div>
          <ShieldCheck size={17} />
          <span>Keys gerais</span>
          <strong>{status.count}/{status.maxKeys}</strong>
        </div>
        <div>
          <ShieldCheck size={17} />
          <span>Escopo</span>
          <strong>IA geral</strong>
        </div>
      </div>

      <div className="key-form">
        <label htmlFor="general-ai-key">Adicionar key geral de IA</label>
        <div>
          <input
            id="general-ai-key"
            value={draftKey}
            onChange={(event) => setDraftKey(event.target.value)}
            placeholder="AIza..."
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
          />
          <button type="button" onClick={handleAddKey}><Plus size={16} /> Adicionar</button>
        </div>
      </div>

      <div className="saved-keys-list">
        {status.masked.length ? status.masked.map((key, index) => (
          <div className="saved-key-row" key={`${key}-${index}`}>
            <span>IA {index + 1}</span>
            <strong>{key}</strong>
            <button type="button" onClick={() => { removeGeneralAiKey(index); refresh(); }}><Trash2 size={15} /></button>
          </div>
        )) : <p className="empty-note">Nenhuma key geral de IA configurada.</p>}
      </div>
    </section>
  );
}
