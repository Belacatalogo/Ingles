import { useMemo, useState } from 'react';
import { BookOpenCheck, CheckCircle2, Clock3, Mic, PenLine, PlayCircle, ShieldCheck } from 'lucide-react';
import { A1_FINAL_EXAM_MODEL, A1_FINAL_EXAM_SECTIONS, getA1FinalExamStudentSections } from '../../content/curriculum/levels/A1/a1FinalExamModel.js';
import { getA1MasteryGateSummary } from '../../services/a1MasteryGateService.js';
import { getA1FinalExamObjectiveAttempt, saveAndSyncA1FinalExamObjectiveAttempt } from '../../services/a1FinalExamAttemptService.js';

const sectionIcons = {
  grammar: BookOpenCheck,
  vocabulary: BookOpenCheck,
  reading: BookOpenCheck,
  listening: PlayCircle,
  speaking: Mic,
  writing: PenLine,
};

const objectiveSectionIds = ['grammar', 'vocabulary', 'reading', 'listening'];

function isObjectiveSection(section) { return objectiveSectionIds.includes(section?.id); }
function getSection(sectionId) { return A1_FINAL_EXAM_SECTIONS.find((section) => section.id === sectionId) || null; }
function getOptionKey(questionId, option) { return `${questionId}-${String(option).toLowerCase().replace(/\W+/g, '-')}`; }

function QuestionField({ question, value, onChange }) {
  if (question.type === 'multiple-choice') {
    return (
      <div className="a1-final-question-options">
        {question.options.map((option) => (
          <button key={getOptionKey(question.id, option)} type="button" className={value === option ? 'selected' : ''} onClick={() => onChange(option)}>
            {option}
          </button>
        ))}
      </div>
    );
  }

  return (
    <input
      className="a1-final-answer-input"
      value={value || ''}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Digite sua resposta"
    />
  );
}

export function A1FinalExamShell({ onObjectiveScoresSaved }) {
  const previousAttempt = useMemo(() => getA1FinalExamObjectiveAttempt(), []);
  const sections = getA1FinalExamStudentSections();
  const gate = getA1MasteryGateSummary();
  const canStart = gate.canTakeFinalExam || gate.canUnlockA2;
  const [activeSectionId, setActiveSectionId] = useState('grammar');
  const [answers, setAnswers] = useState(previousAttempt?.objectiveAnswers || {});
  const [result, setResult] = useState(previousAttempt?.scoring || null);
  const [saveMessage, setSaveMessage] = useState(previousAttempt ? 'Tentativa anterior recuperada.' : '');
  const activeSection = getSection(activeSectionId);
  const objectiveSections = useMemo(() => sections.filter((section) => objectiveSectionIds.includes(section.id)), [sections]);
  const currentAnswers = answers[activeSectionId] || {};

  function updateAnswer(questionId, value) {
    setAnswers((current) => ({
      ...current,
      [activeSectionId]: {
        ...(current[activeSectionId] || {}),
        [questionId]: value,
      },
    }));
    setResult(null);
    setSaveMessage('');
  }

  function calculateResult() {
    const attempt = saveAndSyncA1FinalExamObjectiveAttempt(answers);
    setResult(attempt.scoring);
    setSaveMessage('Resultado salvo e enviado para os critérios do A1.');
    onObjectiveScoresSaved?.(attempt.scoring);
  }

  return (
    <section className="a1-final-exam-shell-card">
      <header>
        <div className="a1-gate-title">
          <span><ShieldCheck size={18} /></span>
          <div>
            <strong>{A1_FINAL_EXAM_MODEL.title}</strong>
            <small>{A1_FINAL_EXAM_MODEL.studentDescription}</small>
          </div>
        </div>
        <em><Clock3 size={14} /> Cerca de {A1_FINAL_EXAM_MODEL.estimatedMinutes} min</em>
      </header>

      <div className="a1-final-exam-note">
        {canStart ? (
          <span><CheckCircle2 size={16} /> Você pode iniciar a prova final do A1.</span>
        ) : (
          <span><ShieldCheck size={16} /> Complete os critérios do A1 acima para liberar a prova final.</span>
        )}
      </div>

      {saveMessage ? <p className="a1-final-save-message">{saveMessage}</p> : null}

      <div className="a1-final-exam-sections">
        {sections.map((section) => {
          const Icon = sectionIcons[section.id] || BookOpenCheck;
          return (
            <article key={section.id} className={activeSectionId === section.id ? 'active' : ''}>
              <div><Icon size={17} /><strong>{section.title}</strong></div>
              <p>{section.instructions}</p>
              <small>{section.requiresReview ? 'Será revisado antes de liberar o A2' : `Meta mínima: ${section.minimumScore}%`}</small>
              {isObjectiveSection(section) ? <button type="button" onClick={() => setActiveSectionId(section.id)}>Responder</button> : null}
            </article>
          );
        })}
      </div>

      {canStart ? (
        <div className="a1-final-exam-flow">
          <div className="a1-final-section-tabs">
            {objectiveSections.map((section) => (
              <button key={section.id} type="button" className={activeSectionId === section.id ? 'active' : ''} onClick={() => setActiveSectionId(section.id)}>
                {section.title}
              </button>
            ))}
          </div>

          {activeSection ? (
            <div className="a1-final-section-card">
              {activeSection.text ? <blockquote>{activeSection.text}</blockquote> : null}
              {activeSection.id === 'listening' ? <p className="a1-final-listening-note">Nesta primeira versão, a escuta ainda usa perguntas do roteiro. O áudio real será ligado em outro bloco.</p> : null}
              <h3>{activeSection.studentTitle || activeSection.title}</h3>
              <p>{activeSection.instructions}</p>
              <div className="a1-final-question-list">
                {(activeSection.questions || []).map((question, index) => (
                  <label key={question.id} className="a1-final-question-card">
                    <span>{index + 1}. {question.prompt}</span>
                    <QuestionField question={question} value={currentAnswers[question.id]} onChange={(value) => updateAnswer(question.id, value)} />
                  </label>
                ))}
              </div>
            </div>
          ) : null}

          <div className="answer-actions">
            <button type="button" className="primary-button" onClick={calculateResult}>
              <CheckCircle2 size={16} /> Salvar e atualizar critérios
            </button>
          </div>

          {result ? (
            <div className="a1-final-result-card">
              <strong>Resultado das partes objetivas</strong>
              <p>Grammar, Vocabulary, Reading e Listening já entram nos critérios do A1. Speaking e Writing ainda precisam de revisão.</p>
              <div>
                {result.sectionScores.filter((item) => !item.requiresReview).map((item) => (
                  <span key={item.sectionId}>{sections.find((section) => section.id === item.sectionId)?.title}: <b>{item.percent}%</b></span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="answer-actions">
          <button type="button" className="primary-button" disabled>
            <PlayCircle size={16} /> Prova ainda bloqueada
          </button>
        </div>
      )}
    </section>
  );
}
