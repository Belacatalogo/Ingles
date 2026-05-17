import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Lock, PencilLine, RefreshCw, ShieldCheck } from 'lucide-react';
import { Card } from '../../components/ui/Card.jsx';
import { completeLesson, isLessonCompleted } from '../../services/progressStore.js';
import { refreshA1LessonCompletionPercent } from '../../services/a1MasteryGateService.js';
import { evaluateStaticLessonGate } from '../../services/masteryGate.js';
import {
  getStaticLessonProductionText,
  markStaticLessonGateAttempt,
  markStaticLessonOpened,
  saveStaticLessonProduction,
} from '../../services/staticLessonProgress.js';

function clean(value) { return String(value ?? '').trim(); }

function getProductionPrompt(lesson) {
  const pillar = String(lesson?.pillar || lesson?.type || '').toLowerCase();
  if (pillar === 'grammar') return 'Escreva algumas frases próprias usando a regra da aula. Não precisa escrever muito, mas precisa mostrar que você entendeu o padrão.';
  if (pillar === 'vocabulary') return 'Escreva frases suas usando o vocabulário da aula.';
  if (pillar === 'reading') return 'Escreva em português o que você entendeu do texto e crie frases parecidas sobre você.';
  if (pillar === 'listening') return 'Anote o que você conseguiu entender do áudio/transcript e repita as frases principais.';
  if (pillar === 'speaking') return 'Escreva o roteiro curto que você vai falar ou grave seguindo as tarefas de fala.';
  if (pillar === 'writing') return 'Escreva sua versão final usando o modelo, os blocos úteis e o checklist.';
  return 'Faça uma produção curta mostrando que você estudou a aula.';
}

export function StaticCompletionGate({ lesson }) {
  const [production, setProduction] = useState(() => getStaticLessonProductionText(lesson));
  const [completed, setCompleted] = useState(() => isLessonCompleted(lesson));
  const [message, setMessage] = useState('');
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    markStaticLessonOpened(lesson);
    setProduction(getStaticLessonProductionText(lesson));
    setCompleted(isLessonCompleted(lesson));
    setRevision((value) => value + 1);
  }, [lesson?.id]);

  const gate = useMemo(() => evaluateStaticLessonGate(lesson, { productionText: production, opened: true }), [lesson, production, revision]);

  function handleSaveProduction(value) {
    setProduction(value);
    saveStaticLessonProduction(lesson, value);
    setRevision((current) => current + 1);
  }

  function refreshGate() {
    setRevision((current) => current + 1);
    setMessage('Status atualizado. Se você acabou de fazer a Prática Profunda, a liberação aparece aqui.');
  }

  function handleComplete() {
    const report = evaluateStaticLessonGate(lesson, { productionText: production, opened: true });
    markStaticLessonGateAttempt(lesson, report);
    if (!report.passed) {
      setMessage(report.message);
      setRevision((current) => current + 1);
      return;
    }
    const result = completeLesson({ lesson, answers: { staticGate: report }, writtenAnswer: production });
    if (!result.alreadyCompleted && lesson?.level === 'A1') refreshA1LessonCompletionPercent();
    setCompleted(true);
    setMessage(result.alreadyCompleted ? 'Esta aula já estava concluída. Progresso mantido.' : '+25 XP. Aula fixa concluída com critérios mínimos.');
  }

  return (
    <section className="static-lesson-card static-completion-gate-card">
      <div className="panel-title"><ShieldCheck size={18} /> Mastery Gate da aula</div>
      <p className="static-lesson-muted">Para concluir, leia a aula, faça a Prática Profunda complementar e registre uma produção final quando o pilar pedir produção escrita.</p>

      <div className="static-gate-status-grid">
        <article className={gate.opened ? 'passed' : 'blocked'}>
          <strong>{gate.opened ? <CheckCircle2 size={16} /> : <Lock size={16} />} Aula aberta</strong>
          <span>{gate.opened ? 'Registrado.' : 'Abra e leia a aula.'}</span>
        </article>
        <article className={gate.practicePassed ? 'passed' : 'blocked'}>
          <strong>{gate.practicePassed ? <CheckCircle2 size={16} /> : <Lock size={16} />} Prática Profunda</strong>
          <span>Melhor acerto: {gate.bestPracticeAccuracy}% · meta {gate.requirements.minPracticeAccuracy}%</span>
        </article>
        <article className={gate.productionPassed ? 'passed' : 'blocked'}>
          <strong>{gate.productionPassed ? <CheckCircle2 size={16} /> : <Lock size={16} />} Produção final</strong>
          <span>{gate.productionWords} palavra(s) · meta {gate.requirements.minProductionWords}</span>
        </article>
      </div>

      {gate.requirements.minProductionWords > 0 ? (
        <label className="static-production-final-label">
          <span><PencilLine size={16} /> Produção final</span>
          <small>{getProductionPrompt(lesson)}</small>
          <textarea value={production} onChange={(event) => handleSaveProduction(event.target.value)} placeholder="Escreva sua produção final aqui..." />
        </label>
      ) : null}

      {!gate.passed ? (
        <div className="static-gate-missing-box">
          <strong>O que falta:</strong>
          <ul>{gate.missing.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      ) : null}

      <div className="answer-actions">
        <button type="button" className="secondary-button" onClick={refreshGate}><RefreshCw size={16} /> Atualizar status</button>
        <button type="button" className="primary-button" onClick={handleComplete} disabled={completed && gate.passed}>
          <CheckCircle2 size={16} /> {completed ? 'Aula concluída' : gate.passed ? 'Concluir aula' : 'Tentar concluir'}
        </button>
      </div>
      {message ? <p className="generator-message completion-message">{message}</p> : null}
    </section>
  );
}
