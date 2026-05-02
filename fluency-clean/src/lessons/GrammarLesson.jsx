import { useEffect, useMemo, useState } from 'react';
import { BookOpenCheck, CheckCircle2, Lightbulb, MessageSquareText, PencilLine, Sparkles, Target } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { ProgressPill } from '../components/ui/ProgressPill.jsx';
import { completeLesson, getLessonDraft, isLessonCompleted, saveLessonDraft } from '../services/progressStore.js';
import {
  buildGrammarRenderReport,
  cleanText,
  collectProfessorExamples,
  normalizeSections,
  normalizeTips,
  splitByExampleHeader,
  splitNumberedList,
  splitParagraphs,
} from './grammar/grammarRenderParser.js';

function ExampleCard({ example, index }) {
  return (
    <article className="grammar-professor-example-card">
      <span className="grammar-example-index">Exemplo {index + 1}</span>
      <strong className="grammar-example-english">{example.english}</strong>
      {example.translation ? <p className="grammar-example-translation">{example.translation}</p> : null}
      {example.explanation ? <p className="grammar-example-explanation">{example.explanation}</p> : null}
    </article>
  );
}

function ParagraphList({ paragraphs, fallback }) {
  const safeParagraphs = paragraphs?.length ? paragraphs : splitParagraphs(fallback);
  return safeParagraphs.map((paragraph, index) => <p key={`${paragraph}-${index}`}>{paragraph}</p>);
}

function SectionContent({ content }) {
  const hasExampleHeader = Boolean(splitByExampleHeader(content));
  const numbered = hasExampleHeader ? null : splitNumberedList(content);

  if (numbered) {
    return (
      <div className="grammar-deep-content grammar-readable-content">
        {numbered.intro ? <p>{numbered.intro}</p> : null}
        <ul className="grammar-guided-list">
          {numbered.items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}
        </ul>
      </div>
    );
  }

  const { explanation, examples, afterExamples } = collectProfessorExamples(content);

  return (
    <div className="grammar-deep-content grammar-readable-content grammar-renderer-v3 grammar-render-safety-gate-v1">
      <ParagraphList paragraphs={explanation} fallback={content} />
      {examples.length ? (
        <div className="grammar-example-stack grammar-professor-examples">
          <div className="grammar-example-heading">Exemplos do professor</div>
          <div className="grammar-example-card-list">
            {examples.map((example, index) => <ExampleCard key={`${example.original}-${index}`} example={example} index={index} />)}
          </div>
        </div>
      ) : null}
      {afterExamples.length ? <ParagraphList paragraphs={afterExamples} fallback="" /> : null}
    </div>
  );
}

export function GrammarLesson({ lesson }) {
  const [writtenAnswer, setWrittenAnswer] = useState('');
  const [completed, setCompleted] = useState(false);
  const [completionMessage, setCompletionMessage] = useState('');
  const sections = useMemo(() => normalizeSections(lesson), [lesson]);
  const tips = useMemo(() => normalizeTips(lesson), [lesson]);
  const renderReport = useMemo(() => buildGrammarRenderReport(sections), [sections]);

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
    <article className="grammar-layout grammar-lesson-v1 grammar-deep-lesson-v2 grammar-renderer-system-v3 grammar-renderer-overflow-v4 grammar-renderer-card-trim-v5 grammar-renderer-card-split-v6 grammar-render-safety-gate-v1">
      <Card
        eyebrow={`Grammar profunda · ${lesson.level}`}
        title={lesson.title}
        action={<ProgressPill current={completed ? 5 : 2} total={5} label={completed ? 'Concluída' : 'Estudo'} />}
      >
        <div className="lesson-intro-grid">
          <p>{cleanText(lesson?.intro || lesson?.subtitle || 'Nesta aula, você vai estudar o tema em profundidade, com explicação guiada, exemplos e prática ativa.')}</p>
          <div className="lesson-objective-card">
            <Target size={18} />
            <span>Objetivo real</span>
            <strong>{cleanText(lesson?.objective || lesson?.raw?.objective || 'Entender a regra, reconhecer padrões e produzir frases próprias com segurança.')}</strong>
          </div>
        </div>
      </Card>

      <section className="grammar-study-grid">
        <div className="grammar-main-panel">
          <div className="panel-title"><BookOpenCheck size={18} /> Aula guiada do professor</div>
          <div className="grammar-section-list">
            {sections.map((section, index) => (
              <article className="grammar-rule-card grammar-deep-card" key={`${section.title}-${index}`}>
                <span>Momento {index + 1}</span>
                <strong>{section.title}</strong>
                <SectionContent content={section.content} />
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
            <div className="panel-title"><Sparkles size={18} /> Render seguro</div>
            <p>Grammar render: {renderReport.ok ? 'OK' : 'atenção'} · Exemplos: {renderReport.examples} · Cards bloqueados: {renderReport.blockedCards} · Texto preservado: {renderReport.textPreserved ? 'sim' : 'não'}.</p>
          </div>
        </aside>
      </section>

      <section className="answer-card guided-answer-card">
        <div className="panel-title"><MessageSquareText size={18} /> Produção própria</div>
        <label className="answer-label" htmlFor="grammar-answer">
          Depois da Prática Profunda, escreva 3 a 6 frases suas usando a regra da aula. Tente criar frases reais sobre você.
        </label>
        <textarea
          id="grammar-answer"
          name="grammar-answer"
          inputMode="text"
          autoCapitalize="sentences"
          autoCorrect="on"
          spellCheck="true"
          placeholder="Write your own sentences using today's grammar..."
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
