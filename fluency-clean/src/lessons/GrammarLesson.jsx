import { useEffect, useMemo, useState } from 'react';
import { BookOpenCheck, CheckCircle2, Lightbulb, MessageSquareText, PencilLine, Sparkles, Target } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { ProgressPill } from '../components/ui/ProgressPill.jsx';
import { completeLesson, getLessonDraft, isLessonCompleted, saveLessonDraft } from '../services/progressStore.js';

const fallbackSections = [
  {
    title: 'Regra principal',
    content: 'Use simple present para falar sobre rotina, fatos e hábitos. Com he, she e it, o verbo normalmente muda: She studies. He works.',
  },
  {
    title: 'Exemplos seguros',
    content: 'I work. You work. He works. She studies. We play. They live.',
  },
  {
    title: 'Erro comum',
    content: 'Não use do/does em frases afirmativas simples: diga “She studies English”, não “She does studies English”.',
  },
];

const fallbackTips = [
  'Leia a regra principal primeiro.',
  'Observe os exemplos em inglês antes de praticar.',
  'Faça a Prática Profunda para testar se você realmente entendeu.',
];

function cleanText(value) {
  return String(value ?? '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function splitSentences(text) {
  return cleanText(text)
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function compactContent(text) {
  const sentences = splitSentences(text);
  if (sentences.length <= 3) return cleanText(text);
  return sentences.slice(0, 3).join(' ');
}

function normalizeSections(lesson) {
  const sections = Array.isArray(lesson?.sections) ? lesson.sections : [];
  const normalized = sections.map((section, index) => ({
    title: cleanText(section?.title || section?.heading || `Parte ${index + 1}`),
    content: compactContent(section?.content || section?.text || section?.body || section?.explanation || ''),
  })).filter((section) => section.title || section.content);

  return normalized.length ? normalized.slice(0, 7) : fallbackSections;
}

function normalizeTips(lesson) {
  const tips = Array.isArray(lesson?.tips) ? lesson.tips : [];
  const cleanTips = tips.map((tip) => cleanText(typeof tip === 'string' ? tip : tip?.text || tip?.tip || '')).filter(Boolean);
  return cleanTips.length ? cleanTips.slice(0, 4) : fallbackTips;
}

export function GrammarLesson({ lesson }) {
  const [writtenAnswer, setWrittenAnswer] = useState('');
  const [completed, setCompleted] = useState(false);
  const [completionMessage, setCompletionMessage] = useState('');
  const sections = useMemo(() => normalizeSections(lesson), [lesson]);
  const tips = useMemo(() => normalizeTips(lesson), [lesson]);

  useEffect(() => {
    setWrittenAnswer(getLessonDraft(lesson?.id || lesson?.title || 'grammar'));
    setCompleted(isLessonCompleted(lesson));
    setCompletionMessage(isLessonCompleted(lesson) ? 'Esta aula já foi concluída.' : '');
  }, [lesson?.id, lesson?.title]);

  function handleSaveDraft() {
    saveLessonDraft({ lesson, answer: writtenAnswer });
    setCompletionMessage('Rascunho salvo.');
  }

  function handleCompleteLesson() {
    const result = completeLesson({ lesson, answers: {}, writtenAnswer });
    setCompleted(true);
    setCompletionMessage(result.alreadyCompleted ? 'Aula já estava concluída. Progresso mantido.' : '+25 XP. Grammar concluída e progresso salvo.');
  }

  return (
    <article className="grammar-layout grammar-lesson-v1">
      <Card
        eyebrow={`Grammar · ${lesson.level}`}
        title={lesson.title}
        action={<ProgressPill current={completed ? 5 : 2} total={5} label={completed ? 'Concluída' : 'Estudo'} />}
      >
        <div className="lesson-intro-grid">
          <p>{cleanText(lesson?.intro || lesson?.subtitle || 'Estude a regra com calma, veja exemplos e depois pratique em tela cheia.')}</p>
          <div className="lesson-objective-card">
            <Target size={18} />
            <span>Objetivo</span>
            <strong>{cleanText(lesson?.objective || lesson?.raw?.objective || 'Entender a regra, reconhecer padrões e produzir frases próprias.')}</strong>
          </div>
        </div>
      </Card>

      <section className="grammar-study-grid">
        <div className="grammar-main-panel">
          <div className="panel-title"><BookOpenCheck size={18} /> Explicação guiada</div>
          <div className="grammar-section-list">
            {sections.map((section, index) => (
              <article className="grammar-rule-card" key={`${section.title}-${index}`}>
                <span>Parte {index + 1}</span>
                <strong>{section.title}</strong>
                <p>{section.content}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="grammar-side-panel">
          <div className="mini-card">
            <div className="panel-title"><Lightbulb size={18} /> Como estudar</div>
            <ul>
              {tips.map((tip, index) => <li key={`${tip}-${index}`}>{tip}</li>)}
            </ul>
          </div>
          <div className="mini-card grammar-warning-card">
            <div className="panel-title"><Sparkles size={18} /> Prática profunda</div>
            <p>Os exercícios interativos ficam apenas no botão “Começar prática”, para evitar duplicação e perguntas fora da tela de treino.</p>
          </div>
        </aside>
      </section>

      <section className="answer-card guided-answer-card">
        <div className="panel-title"><MessageSquareText size={18} /> Produção própria</div>
        <label className="answer-label" htmlFor="grammar-answer">
          Depois da Prática Profunda, escreva 3 frases suas usando a regra da aula.
        </label>
        <textarea
          id="grammar-answer"
          name="grammar-answer"
          inputMode="text"
          autoCapitalize="sentences"
          autoCorrect="on"
          spellCheck="true"
          placeholder="Write three sentences using today's grammar..."
          value={writtenAnswer}
          onChange={(event) => setWrittenAnswer(event.target.value)}
        />
        <div className="answer-actions">
          <button type="button" className="secondary-button" onClick={handleSaveDraft}><PencilLine size={16} /> Salvar rascunho</button>
          <button type="button" className="primary-button" onClick={handleCompleteLesson}><CheckCircle2 size={16} /> {completed ? 'Aula concluída' : 'Concluir Grammar'}</button>
        </div>
        {completionMessage ? <p className="generator-message completion-message">{completionMessage}</p> : null}
      </section>
    </article>
  );
}
