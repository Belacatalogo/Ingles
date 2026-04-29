import { AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { diagnostics } from '../../services/diagnostics.js';
import { generateLessonDraft } from '../../services/geminiLessons.js';
import { getLessonKeysStatus, getLessonFlashKeys, getLessonProKey } from '../../services/lessonKeys.js';
import { getLessonPromptDraft, saveCurrentLesson, saveLessonPromptDraft } from '../../services/lessonStore.js';

export function LessonGeneratorPanel({ onGenerated }) {
  const [prompt, setPrompt] = useState(() => getLessonPromptDraft());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [version, setVersion] = useState(0);
  const keyStatus = useMemo(() => getLessonKeysStatus(), [version]);

  async function handleGenerate() {
    setVersion((value) => value + 1);
    setLoading(true);
    setMessage('Gerando aula em blocos pedagógicos... acompanhe o diagnóstico.');
    saveLessonPromptDraft(prompt);
    diagnostics.log('Botão Gerar aula acionado.', 'info');

    try {
      const flashKeys = getLessonFlashKeys();
      const proKey = getLessonProKey();

      if (!flashKeys.length && !proKey) {
        const error = 'Adicione pelo menos uma key em Ajustes > Chaves de aulas antes de gerar.';
        diagnostics.log(error, 'error');
        setMessage(error);
        return;
      }

      const result = await generateLessonDraft({
        prompt,
        keys: flashKeys,
        proKey,
      });

      if (result.status !== 'success' || !result.lesson) {
        setMessage(result.error || 'Não foi possível gerar a aula.');
        return;
      }

      const saved = saveCurrentLesson(result.lesson);
      diagnostics.log(`Aula pronta para abrir: ${saved.title}`, 'info');
      setMessage('Aula gerada, salva e aberta na aba Aula.');
      onGenerated?.(saved);
    } catch (error) {
      diagnostics.log(`Erro inesperado ao gerar aula: ${error?.message || error}`, 'error');
      setMessage(error?.message || 'Erro inesperado ao gerar aula.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="lesson-generator-panel">
      <div className="panel-title"><Sparkles size={18} /> Gerar aula por IA</div>
      <p>Escolha no pedido se quer Reading, Grammar, Listening ou Writing. O sistema monta a aula em blocos pedagógicos e valida antes de salvar.</p>

      <div className="generation-status-box">
        <div>
          <span>Flash/free</span>
          <strong>{keyStatus.flashCount}/{keyStatus.maxFlashKeys}</strong>
        </div>
        <div>
          <span>Pro fallback</span>
          <strong>{keyStatus.proMasked || 'não configurada'}</strong>
        </div>
      </div>

      {!keyStatus.hasAnyKey ? (
        <div className="inline-warning">
          <AlertCircle size={16} />
          <span>Adicione uma key em Ajustes &gt; Chaves de aulas antes de gerar.</span>
        </div>
      ) : null}

      <label htmlFor="lesson-prompt">Pedido da aula</label>
      <textarea
        id="lesson-prompt"
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        placeholder="Ex.: Gere uma aula de Grammar A1 sobre Simple Present com explicação profunda e prática."
        inputMode="text"
        autoCapitalize="sentences"
        autoCorrect="on"
        spellCheck="true"
      />

      <button type="button" className="primary-button" onClick={handleGenerate} disabled={loading}>
        {loading ? <Loader2 size={16} className="spin" /> : <Sparkles size={16} />}
        {loading ? 'Gerando aula...' : 'Gerar aula'}
      </button>

      {message ? <p className="generator-message">{message}</p> : null}
    </section>
  );
}
