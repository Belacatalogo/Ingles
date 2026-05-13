import { useState } from 'react';
import { Bot, Loader2, MessageCircle, PencilLine, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card.jsx';
import { AI_TUTOR_ALLOWED_ACTIONS } from '../../services/aiTutorPolicy.js';
import { askAiTutor } from '../../services/aiTutorService.js';

function clean(value) { return String(value ?? '').trim(); }

const ACTIONS = [
  { id: AI_TUTOR_ALLOWED_ACTIONS.explainCurrentLesson, label: 'Explicar dúvida', icon: MessageCircle, placeholder: 'Digite sua dúvida sobre esta aula...' },
  { id: AI_TUTOR_ALLOWED_ACTIONS.correctWriting, label: 'Corrigir Writing', icon: PencilLine, placeholder: 'Cole sua frase ou texto curto para correção...' },
  { id: AI_TUTOR_ALLOWED_ACTIONS.smallReinforcement, label: 'Reforço pequeno', icon: Sparkles, placeholder: 'Ex.: me dê mais 3 exemplos parecidos com a aula.' },
];

export function AiTutorPanel({ lesson }) {
  const [activeAction, setActiveAction] = useState(ACTIONS[0].id);
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const current = ACTIONS.find((item) => item.id === activeAction) || ACTIONS[0];

  async function handleAskTutor() {
    const text = clean(input);
    if (!text && activeAction !== AI_TUTOR_ALLOWED_ACTIONS.smallReinforcement) {
      setResult({ status: 'empty', text: 'Digite sua dúvida ou texto antes de chamar a IA Tutor.' });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const response = await askAiTutor({ lesson, action: activeAction, studentInput: text || 'Crie um reforço pequeno usando somente esta aula.' });
      setResult(response);
    } catch (error) {
      setResult({ status: 'blocked', text: error?.message || String(error) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="ai-tutor-panel-wrap">
      <Card eyebrow="IA Tutor" title="Ajuda sem gerar aula nova">
        <div className="ai-tutor-policy-note">
          <Bot size={18} />
          <p>A IA aqui serve apenas para dúvida, correção e reforço pequeno baseado na aula atual. Ela não substitui o curso fixo.</p>
        </div>
        <div className="ai-tutor-action-row">
          {ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <button key={action.id} type="button" className={activeAction === action.id ? 'active' : ''} onClick={() => setActiveAction(action.id)}>
                <Icon size={15} /> {action.label}
              </button>
            );
          })}
        </div>
        <label className="ai-tutor-input-label">
          <span>{current.label}</span>
          <textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder={current.placeholder} />
        </label>
        <div className="answer-actions">
          <button type="button" className="primary-button" onClick={handleAskTutor} disabled={loading}>
            {loading ? <Loader2 size={16} className="spin-icon" /> : <Bot size={16} />} Chamar IA Tutor
          </button>
        </div>
        {result ? (
          <div className={`ai-tutor-result ${result.status || ''}`}>
            <strong>{result.status === 'success' ? 'Resposta da IA Tutor' : result.status === 'missing-keys' ? 'Sem key geral configurada' : 'Retorno'}</strong>
            <p>{result.text}</p>
          </div>
        ) : null}
      </Card>
    </section>
  );
}
