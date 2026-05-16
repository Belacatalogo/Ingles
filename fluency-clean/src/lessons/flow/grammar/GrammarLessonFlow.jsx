import { LessonFlowShell } from '../LessonFlowShell.jsx';
import { PhaseShell } from '../phases/PhaseShell.jsx';
import { AttemptField } from '../phases/AttemptField.jsx';
import { ChoiceField } from '../phases/ChoiceField.jsx';
import { clean, mergeLists, noteOf, safeArray, textOf } from '../text/normalize.js';

function ConceptBody({ phase }) {
  return (
    <PhaseShell eyebrow="Conceito" title="Como a regra funciona" instruction={phase.explanation}>
      {phase.items.length ? <ul className="lesson-phase-examples">{phase.items.map((item, index) => <li key={index}><b>{textOf(item)}</b>{noteOf(item) ? <small>{noteOf(item)}</small> : null}</li>)}</ul> : null}
    </PhaseShell>
  );
}
function AttemptBody({ phase, flow }) { return <AttemptField phase={phase} flow={flow} item={phase.item} multiline={phase.multiline} minWords={phase.minWords || 1} />; }
function QuizBody({ phase, flow }) { return <ChoiceField phase={phase} flow={flow} item={phase.item} />; }

function buildPhases(lesson = {}) {
  const explanation = clean(lesson.explanation || lesson.coreExplanation || lesson.rule || textOf(safeArray(lesson.objectives)[0])) || 'Entenda a regra e depois pratique com uma resposta sua.';
  const examples = mergeLists(lesson.examples, lesson.exampleSentences, lesson.modelSentences, lesson.formation, lesson.structure).slice(0, 8);
  const practice = mergeLists(lesson.controlledPractice, lesson.transformations, lesson.guidedPractice, lesson.productionTask, lesson.productionTasks);
  const quiz = mergeLists(lesson.quiz, lesson.checkQuestions, lesson.comprehensionQuestions).find((item) => Array.isArray(item?.options) && item.options.length);
  const phases = [{ id: 'grammar-concept', title: 'Explicação', shortTitle: 'Conceito', description: 'Estude a regra sem cards técnicos.', requiresAttempt: false, component: ConceptBody, explanation, items: examples }];
  if (practice[0]) phases.push({ id: 'grammar-practice', title: 'Prática guiada', shortTitle: 'Prática', description: 'Tente antes de ver o modelo.', requiresAttempt: true, blockedMessage: 'Faça uma tentativa antes de avançar.', component: AttemptBody, item: practice[0] });
  if (quiz) phases.push({ id: 'grammar-quiz', title: 'Checagem rápida', shortTitle: 'Quiz', description: 'Escolha uma alternativa.', requiresAttempt: true, blockedMessage: 'Escolha uma alternativa antes de avançar.', component: QuizBody, item: quiz });
  phases.push({ id: 'grammar-production', title: 'Produção final', shortTitle: 'Produção', description: 'Use a regra em uma frase sua.', requiresAttempt: true, blockedMessage: 'Escreva sua produção antes de finalizar.', component: AttemptBody, item: practice[1] || { prompt: 'Escreva uma frase usando a regra da aula.' }, multiline: true, minWords: 6 });
  return phases;
}

export function GrammarLessonFlow({ lesson }) {
  return <LessonFlowShell lesson={lesson} phases={buildPhases(lesson)} />;
}
