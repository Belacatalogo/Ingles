import { useEffect, useMemo, useState } from 'react';
import { BookOpenCheck, CheckCircle2, Lightbulb, ListChecks, MessageSquareText, PencilLine, Sparkles, Target } from 'lucide-react';
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

const grammarFlowSteps = [
  { id: 'grammar-start', label: 'Começar' },
  { id: 'grammar-rule', label: 'Regra' },
  { id: 'grammar-examples', label: 'Exemplos' },
  { id: 'grammar-guided-practice', label: 'Prática' },
  { id: 'grammar-correction', label: 'Correção' },
  { id: 'grammar-production', label: 'Produção' },
  { id: 'grammar-finish', label: 'Concluir' },
];

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

function collectAllExamples(sections) {
  return sections.flatMap((section) => collectProfessorExamples(section.content).examples || []).slice(0, 6);
}

function normalizeExercises(lesson) {
  const exercises = Array.isArray(lesson?.exercises) ? lesson.exercises : [];
  return exercises.map((item, index) => ({
    question: cleanText(item?.question || item?.prompt || item?.instruction || `Exercício ${index + 1}`),
    answer: cleanText(item?.answer || item?.expectedAnswer || item?.correctAnswer || ''),
    explanation: cleanText(item?.explanation || item?.feedback || ''),
  })).filter((item) => item.question).slice(0, 4);
}

function GrammarStepper({ activeStep, completed, onJump }) {
  const activeStepIndex = Math.max(0, grammarFlowSteps.findIndex((step) => step.id === activeStep));
  return (
    <section className="lesson-type-stepper-card grammar-stepper-card" aria-label="Etapas da aula Grammar">
      <div className="lesson-type-stepper-header">
        <strong>Etapas da Grammar</strong>
        <span>{activeStepIndex + 1}/{grammarFlowSteps.length}</span>
      </div>
      <div className="lesson-type-stepper-flow grammar-stepper-flow">
        {grammarFlowSteps.map((step, index) => {
          const done = completed || index < activeStepIndex;
          const active = step.id === activeStep;
          return (
            <button type="button" key={step.id} className={done ? 'done' : active ? 'active' : ''} onClick={() => onJump(step.id)}>
              <span>{done ? '✓' : index + 1}</span>
              <strong>{step.label}</strong>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function GuidedPractice({ exercises }) {
  if (!exercises.length) {
    return (
      <section className="grammar-section-card grammar-step-panel grammar-guided-practice-card" id="grammar-guided-practice">
        <div className="panel-title"><ListChecks size={18} /> Prática guiada</div>
        <p>Leia a regra e crie mentalmente 2 frases: uma afirmativa e uma negativa. A produção escrita fica no final da aula.</p>
      </section>
    );
  }

  return (
    <section className="grammar-section-card grammar-step-panel grammar-guided-practice-card" id="grammar-guided-practice">
      <div className="panel-title"><ListChecks size={18} /> Prática guiada</div>
      <div className="grammar-guided-practice-list">
        {exercises.map((exercise, index) => (
          <article key={`${exercise.question}-${index}`}>
            <span>Prática {index + 1}</span>
            <strong>{exercise.question}</strong>
            {exercise.answer ? <small>Resposta fica para conferência depois da tentativa.</small> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function CorrectionPanel({ exercises }) {
  return (
    <section className="grammar-section-card grammar-step-panel grammar-correction-card" id="grammar-correction">
      <div className="panel-title"><CheckCircle2 size={18} /> Correção e transformação</div>
      <p>Depois de tentar, compare com o modelo e transforme a frase: afirmativa → negativa → pergunta.</p>
      {exercises.length ? (
        <div className="grammar-correction-list">
          {exercises.map((exercise, index) => (
            <article key={`${exercise.answer}-${index}`}>
              <span>Modelo {index + 1}</span>
              <strong>{exercise.answer || 'Use a regra para montar uma resposta possível.'}</strong>
              {exercise.explanation ? <p>{exercise.explanation}</p> : null}
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function GrammarLesson({ lesson }) {
  const [writtenAnswer, setWrittenAnswer] = useState('');
  const [completed, setCompleted] = useState(false);
  const [completionMessage, setCompletionMessage] = useState('');
  const [activeStep, setActiveStep] = useState('grammar-start');
  const sections = useMemo(() => normalizeSections(lesson), [lesson]);
  const tips = useMemo(() => normalizeTips(lesson), [lesson]);
  const renderReport = useMemo(() => buildGrammarRenderReport(sections), [sections]);
  const examples = useMemo(() => collectAllExamples(sections), [sections]);
  const exercises = useMemo(() => normalizeExercises(lesson), [lesson]);
  const activeStepIndex = Math.max(0, grammarFlowSteps.findIndex((step) => step.id === activeStep));

  useEffect(() => {
    setWrittenAnswer(getLessonDraft(lesson?.id || lesson?.title || 'grammar'));
    setCompleted(isLessonCompleted(lesson));
    setCompletionMessage(isLessonCompleted(lesson) ? 'Esta aula já foi concluída.' : '');
    setActiveStep('grammar-start');
  }, [lesson?.id, lesson?.title]);

  function jumpToGrammarStep(stepId) {
    setActiveStep(stepId);
    requestAnimationFrame(() => document.getElementById(stepId)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  function goToNextStep() {
    const next = grammarFlowSteps[Math.min(activeStepIndex + 1, grammarFlowSteps.length - 1)];
    if (next) jumpToGrammarStep(next.id);
  }

  function handleSaveDraft() {
    saveLessonDraft({ lesson, answer: writtenAnswer });
    setCompletionMessage('Rascunho salvo.');
  }

  function handleCompleteLesson() {
    const result = completeLesson({ lesson, answers: {}, writtenAnswer });
    setCompleted(true);
    setActiveStep('grammar-finish');
    setCompletionMessage(result.alreadyCompleted ? 'Aula já estava concluída. Progresso mantido.' : '+25 XP. Grammar concluída e progresso salvo.');
  }

  return (
    <article className="grammar-layout grammar-lesson-v1 grammar-deep-lesson-v2 grammar-renderer-system-v3 grammar-renderer-overflow-v4 grammar-renderer-card-trim-v5 grammar-renderer-card-split-v6 grammar-render-safety-gate-v1 grammar-stepper-real-v1">
      <Card
        eyebrow={`Grammar profunda · ${lesson.level}`}
        title={lesson.title}
        action={<ProgressPill current={completed ? grammarFlowSteps.length : activeStepIndex + 1} total={grammarFlowSteps.length} label={completed ? 'Concluída' : 'Etapas'} />}
      >
        <div className="lesson-intro-grid" id="grammar-start">
          <p>{cleanText(lesson?.intro || lesson?.subtitle || 'Nesta aula, você vai estudar o tema em profundidade, com explicação guiada, exemplos e prática ativa.')}</p>
          <div className="lesson-objective-card">
            <Target size={18} />
            <span>Objetivo real</span>
            <strong>{cleanText(lesson?.objective || lesson?.raw?.objective || 'Entender a regra, reconhecer padrões e produzir frases próprias com segurança.')}</strong>
          </div>
        </div>
      </Card>

      <GrammarStepper activeStep={activeStep} completed={completed} onJump={jumpToGrammarStep} />

      <section className="grammar-study-grid grammar-step-panel" id="grammar-rule" data-grammar-step-active={activeStep === 'grammar-rule'}>
        <div className="grammar-main-panel">
          <div className="panel-title"><BookOpenCheck size={18} /> Regra e explicação do professor</div>
          <div className="grammar-section-list">
            {sections.map((section, index) => (
              <article className="grammar-rule-card grammar-deep-card" key={`${section.title}-${index}`}>
                <span>Momento {index + 1}</span>
                <strong>{section.title}</strong>
                <SectionContent content={section.content} />
              </article>
            ))}
          </div>
          <button type="button" className="lesson-type-next-step-button" onClick={goToNextStep}>Ir para exemplos</button>
        </div>

        <aside className="grammar-side-panel">
          <div className="mini-card">
            <div className="panel-title"><Lightbulb size={18} /> Como estudar</div>
            <ul>
              {tips.map((tip, index) => <li key={`${tip}-${index}`}>{tip}</li>)}
            </ul>
          </div>
          <div className="mini-card grammar-warning-card">
            <div className="panel-title"><Sparkles size={18} /> Aula segura</div>
            <p>Exemplos: {renderReport.examples} · Texto preservado: {renderReport.textPreserved ? 'sim' : 'não'}.</p>
          </div>
        </aside>
      </section>

      <section className="grammar-section-card grammar-step-panel grammar-examples-step-card" id="grammar-examples" data-grammar-step-active={activeStep === 'grammar-examples'}>
        <div className="panel-title"><Sparkles size={18} /> Exemplos com padrão</div>
        <p>Veja o padrão da regra em frases reais antes de praticar. Não decore: observe a estrutura.</p>
        {examples.length ? (
          <div className="grammar-example-card-list">
            {examples.map((example, index) => <ExampleCard key={`${example.original}-${index}`} example={example} index={index} />)}
          </div>
        ) : <p>Use os exemplos dentro da explicação acima para observar a estrutura da regra.</p>}
        <button type="button" className="lesson-type-next-step-button" onClick={goToNextStep}>Começar prática guiada</button>
      </section>

      <GuidedPractice exercises={exercises} />
      <button type="button" className="lesson-type-next-step-button" onClick={goToNextStep}>Ir para correção</button>

      <CorrectionPanel exercises={exercises} />
      <button type="button" className="lesson-type-next-step-button" onClick={goToNextStep}>Ir para produção</button>

      <section className="answer-card guided-answer-card grammar-step-panel" id="grammar-production" data-grammar-step-active={activeStep === 'grammar-production'}>
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

      <section className="grammar-section-card grammar-step-panel grammar-finish-card" id="grammar-finish" data-grammar-step-active={activeStep === 'grammar-finish'}>
        <div className="panel-title"><CheckCircle2 size={18} /> Depois da Grammar</div>
        <p>A aula de Grammar segue uma ordem séria: entender a regra, observar exemplos, praticar, corrigir e produzir frases próprias.</p>
      </section>
    </article>
  );
}
