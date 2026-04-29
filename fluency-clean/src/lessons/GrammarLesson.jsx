import { useEffect, useMemo, useState } from 'react';
import { BookOpenCheck, CheckCircle2, Lightbulb, ListChecks, MessageSquareText, PencilLine, Sparkles, Target } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { ProgressPill } from '../components/ui/ProgressPill.jsx';
import { completeLesson, getLessonDraft, isLessonCompleted, saveLessonDraft } from '../services/progressStore.js';

const fallbackSections = [
  {
    title: 'Explicação principal',
    content: 'Use simple present para falar sobre rotina, fatos e hábitos. Em frases afirmativas com he, she e it, normalmente adicionamos -s ao verbo.',
  },
  {
    title: 'Forma básica',
    content: 'I work. You work. He works. She studies. We play. They live.',
  },
  {
    title: 'Erro comum',
    content: 'Não use do/does em frases afirmativas simples: diga “She studies English”, não “She does studies English”.',
  },
];

const fallbackExercises = [
  {
    question: 'Choose the correct sentence.',
    options: ['She study English.', 'She studies English.', 'She studying English.'],
    answer: 'She studies English.',
  },
  {
    question: 'Complete: He ___ coffee every morning.',
    options: ['drink', 'drinks', 'drinking'],
    answer: 'drinks',
  },
  {
    question: 'Choose the negative form: I like tea.',
    options: ['I not like tea.', 'I do not like tea.', 'I does not like tea.'],
    answer: 'I do not like tea.',
  },
];

const fallbackTips = [
  'Leia a regra primeiro, depois veja os exemplos.',
  'Compare português e inglês para evitar tradução palavra por palavra.',
  'Faça os exercícios antes de olhar a correção.',
];

function cleanText(value) {
  return String(value ?? '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function normalizeSections(lesson) {
  const sections = Array.isArray(lesson?.sections) ? lesson.sections : [];
  if (sections.length) {
    return sections.map((section, index) => ({
      title: cleanText(section?.title || section?.heading || `Parte ${index + 1}`),
      content: cleanText(section?.content || section?.text || section?.body || section?.explanation || ''),
    })).filter((section) => section.title || section.content);
  }
  return fallbackSections;
}

function normalizeTips(lesson) {
  const tips = Array.isArray(lesson?.tips) ? lesson.tips : [];
  const cleanTips = tips.map((tip) => cleanText(typeof tip === 'string' ? tip : tip?.text || tip?.tip || '')).filter(Boolean);
  return cleanTips.length ? cleanTips : fallbackTips;
}

function normalizeExercises(lesson) {
  const exercises = Array.isArray(lesson?.exercises) ? lesson.exercises : [];
  return exercises.length ? exercises : fallbackExercises;
}

function normalizeAnswer(value) {
  return cleanText(value).toLowerCase().replace(/\s+/g, ' ').trim();
}

function isCorrectOption(option, answer) {
  return normalizeAnswer(option) === normalizeAnswer(answer);
}

export function GrammarLesson({ lesson }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [writtenAnswer, setWrittenAnswer] = useState('');
  const [completed, setCompleted] = useState(false);
  const [completionMessage, setCompletionMessage] = useState('');
  const sections = useMemo(() => normalizeSections(lesson), [lesson]);
  const exercises = useMemo(() => normalizeExercises(lesson), [lesson]);
  const tips = useMemo(() => normalizeTips(lesson), [lesson]);

  useEffect(() => {
    setSelectedAnswers({});
    setWrittenAnswer(getLessonDraft(lesson?.id || lesson?.title || 'grammar'));
    setCompleted(isLessonCompleted(lesson));
    setCompletionMessage(isLessonCompleted(lesson) ? 'Esta aula já foi concluída.' : '');
  }, [lesson?.id, lesson?.title]);

  function handleSelectAnswer(questionIndex, option) {
    setSelectedAnswers((current) => ({ ...current, [questionIndex]: option }));
  }

  function handleSaveDraft() {
    saveLessonDraft({ lesson, answer: writtenAnswer });
    setCompletionMessage('Rascunho salvo.');
  }

  function handleCompleteLesson() {
    const result = completeLesson({ lesson, answers: selectedAnswers, writtenAnswer });
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
          <p>{cleanText(lesson?.intro || lesson?.subtitle || 'Estude a regra com calma, veja exemplos e pratique antes de conferir o feedback.')}</p>
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
            <div className="panel-title"><Sparkles size={18} /> Importante</div>
            <p>As respostas dos exercícios não aparecem antes da sua tentativa. Escolha uma opção para receber feedback.</p>
          </div>
        </aside>
      </section>

      <section className="reading-section-card grammar-practice-card">
        <div className="panel-title"><ListChecks size={18} /> Prática</div>
        <div className="comprehension-list">
          {exercises.map((item, index) => {
            const selected = selectedAnswers[index];
            const hasAnswered = typeof selected === 'string';
            const selectedIsCorrect = hasAnswered && isCorrectOption(selected, item.answer);
            const options = item.options || item.choices || [];

            return (
              <article className="question-card" key={item.question || index}>
                <span>Exercício {index + 1}</span>
                <strong>{cleanText(item.question || item.prompt || 'Escolha a resposta correta.')}</strong>
                <div className="option-list">
                  {options.map((option) => {
                    const optionIsSelected = selected === option;
                    const optionIsCorrect = isCorrectOption(option, item.answer);
                    const revealClass = hasAnswered && optionIsCorrect ? ' correct' : '';
                    const wrongClass = optionIsSelected && hasAnswered && !optionIsCorrect ? ' incorrect' : '';
                    const selectedClass = optionIsSelected ? ' selected' : '';
                    return (
                      <button
                        className={`option-button${selectedClass}${revealClass}${wrongClass}`}
                        type="button"
                        key={option}
                        onClick={() => handleSelectAnswer(index, option)}
                        aria-pressed={optionIsSelected}
                      >
                        {cleanText(option)}
                      </button>
                    );
                  })}
                </div>
                {hasAnswered ? (
                  <p className={selectedIsCorrect ? 'question-feedback correct' : 'question-feedback incorrect'}>
                    {selectedIsCorrect ? 'Correto. A regra foi aplicada bem.' : `Revise a regra. A resposta correta é: ${cleanText(item.answer)}.`}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="answer-card guided-answer-card">
        <div className="panel-title"><MessageSquareText size={18} /> Produção própria</div>
        <label className="answer-label" htmlFor="grammar-answer">
          Escreva 3 frases em inglês usando a regra da aula.
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
