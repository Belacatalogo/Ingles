import { Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { generateLessonDraft } from '../../services/geminiLessons.js';
import { getLessonFlashKeys, getLessonProKey } from '../../services/lessonKeys.js';
import { getLessonPromptDraft, saveCurrentLesson, saveLessonPromptDraft } from '../../services/lessonStore.js';

export function LessonGeneratorPanel({ onGenerated }) {
  const [prompt, setPrompt] = useState(() => getLessonPromptDraft());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleGenerate() {
    setLoading(true);
    setMessage('Gerando aula...');
    saveLessonPromptDraft(prompt);

    try {
      const result = await generateLessonDraft({
        prompt,
        keys: getLessonFlashKeys(),
        proKey: getLessonProKey(),
      });

      if (result.status !== 'success' || !result.lesson) {
        setMessage(result.error || 'Não foi possível gerar a aula.');
        return;
      }

      const saved = saveCurrentLesson(result.lesson);
      setMessage('Aula gerada e salva com sucesso.');
      onGenerated?.(saved);
    } catch (error) {
      setMessage(error?.message || 'Erro inesperado ao gerar aula.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="lesson-generator-panel">
      <div className="panel-title"><Sparkles size={18} /> Gerar aula por IA</div>
      <p>Use as chaves exclusivas da aba Progresso. O sistema tenta Flash/free primeiro e usa Pro só em último caso.</p>

      <label htmlFor="lesson-prompt">Pedido da aula</label>
      <textarea
        id="lesson-prompt"
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        placeholder="Descreva a aula que você quer gerar..."
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
