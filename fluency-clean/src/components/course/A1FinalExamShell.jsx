import { useMemo, useState } from 'react';
import { BookOpenCheck, CheckCircle2, Clock3, Mic, PenLine, PlayCircle, ShieldCheck } from 'lucide-react';
import { A1_FINAL_EXAM_MODEL, A1_FINAL_EXAM_SECTIONS, getA1FinalExamStudentSections } from '../../content/curriculum/levels/A1/a1FinalExamModel.js';
import { getA1MasteryGateSummary } from '../../services/a1MasteryGateService.js';
import { getA1FinalExamObjectiveAttempt, saveA1FinalExamProductiveDraft, saveAndSyncA1FinalExamObjectiveAttempt } from '../../services/a1FinalExamAttemptService.js';

const sectionIcons = {
  grammar: BookOpenCheck,
  vocabulary: BookOpenCheck,
  reading: BookOpenCheck,
  listening: PlayCircle,
  speaking: Mic,
  writing: PenLine,
};

const objectiveSectionIds = ['grammar', 'vocabulary', 'reading', 'listening'];
const productiveSectionIds = ['speaking', 'writing'];

function isObjectiveSection(section) { return objectiveSectionIds.includes(section?.id); }
function isProductiveSection(section) { return productiveSectionIds.includes(section?.id); }
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
  const [productiveDrafts, setProductiveDrafts] = useState(previousAttempt?.productiveDrafts || {});
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

  function updateProductiveDraft(skill, value) {
    setProductiveDrafts((current) => ({ ...current, [skill]: value }));
    setSaveMessage('');
  }

  function calculateResult() {
    const attempt = saveAndSyncA1FinalExamObjectiveAttempt(answers);
    setResult(attempt.scoring);
    setSaveMessage('Resultado salvo e enviado para os critérios do A1.');
    onObjectiveScoresSaved?.(attempt.scoring);
  }

  function saveProductiveDraft(skill) {
    saveA1FinalExamProductiveDraft(skill, productiveDrafts[skill] || '');
    setSaveMessage('Resposta salva como aguardando revisão.');
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
              {isObjectiveSection(section) || isProductiveSection(section) ? <button type="button" onClick={() => setActiveSectionId(section.id)}>{isObjectiveSection(section) ? 'Responder' : 'Preparar resposta'}</button> : null}
            </article>
          );
        })}
      </div>

      {canStart ? (
        <div className="a1-final-exam-flow">
          <div className="a1-final-section-tabs">
            {[...objectiveSections, ...sections.filter((section) => productiveSectionIds.includes(section.id))].map((section) => (
              <button key={section.id} type="button" className={activeSectionId === section.id ? 'active' : ''} onClick={() => setActiveSectionId(section.id)}>
                {section.title}
              </button>
            ))}
          </div>

          {activeSection && isObjectiveSection(activeSection) ? (
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

          {activeSection && isProductiveSection(activeSection) ? (
            <div className="a1-final-section-card a1-final-productive-card">
              <h3>{activeSection.studentTitle || activeSection.title}</h3>
              <p>{activeSection.prompt}</p>
              {activeSection.id === 'speaking' ? <p className="a1-final-listening-note">Grave sua resposta fora desta etapa por enquanto e escreva aqui um resumo do que você falou. A gravação real será ligada depois.</p> : null}
              <textarea
                className="a1-final-draft-area"
                value={productiveDrafts[activeSection.id] || ''}
                onChange={(event) => updateProductiveDraft(activeSection.id, event.target.value)}
                placeholder={activeSection.id === 'speaking' ? 'Resumo da sua resposta falada...' : 'Escreva sua resposta aqui...'}
              />
              <div className="answer-actions">
                <button type="button" className="secondary-button" onClick={() => saveProductiveDraft(activeSection.id)}>
                  <ShieldCheck size={16} /> Salvar como aguardando revisão
                </button>
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
