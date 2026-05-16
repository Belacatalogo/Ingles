import { LessonFlowShell } from '../LessonFlowShell.jsx';
import { PhaseShell } from '../phases/PhaseShell.jsx';
import { AttemptField } from '../phases/AttemptField.jsx';
import { ChoiceField } from '../phases/ChoiceField.jsx';
import { clean, mergeLists, noteOf, safeArray, textOf } from '../text/normalize.js';

function ListBody({ phase }) {
  return (
    <PhaseShell eyebrow={phase.eyebrow} title={phase.title} instruction={phase.instruction}>
      <ul className="lesson-phase-vocab-list">
        {phase.items.map((item, index) => <li key={index}><b>{clean(item?.word || textOf(item))}</b>{noteOf(item) ? <small>{noteOf(item)}</small> : null}</li>)}
      </ul>
    </PhaseShell>
  );
}
function AttemptBody({ phase, flow }) { return <AttemptField phase={phase} flow={flow} item={phase.item} multiline={phase.multiline} minWords={phase.minWords || 1} />; }
function QuizBody({ phase, flow }) { return <ChoiceField phase={phase} flow={flow} item={phase.item} />; }

function buildPhases(lesson = {}) {
  const context = clean(lesson.context || lesson.situation || lesson.intro || textOf(safeArray(lesson.objectives)[0])) || 'Estude o vocabulário em contexto antes de usar.';
  const words = mergeLists(lesson.keyVocabulary, lesson.vocabulary, lesson.essentialWords).slice(0, 12);
  const chunks = mergeLists(lesson.chunks, lesson.collocations, lesson.phrases).slice(0, 10);
  const quiz = mergeLists(lesson.recognitionTasks, lesson.matchingTasks, lesson.quiz).find((item) => Array.isArray(item?.options) && item.options.length);
  const usage = mergeLists(lesson.usageTasks, lesson.gapFillTasks, lesson.productionTask, lesson.productionTasks);
  const phases = [{ id: 'vocab-context', title: 'Contexto', shortTitle: 'Contexto', description: 'Entenda onde usar as palavras.', requiresAttempt: false, component: PhaseShell, instruction: context }];
  if (words.length) phases.push({ id: 'vocab-words', title: 'Palavras essenciais', shortTitle: 'Palavras', description: 'Estude antes da prática.', requiresAttempt: false, component: ListBody, eyebrow: 'Vocabulário', instruction: 'Leia as palavras e sentidos principais.', items: words });
  if (chunks.length) phases.push({ id: 'vocab-chunks', title: 'Chunks úteis', shortTitle: 'Chunks', description: 'Aprenda blocos prontos.', requiresAttempt: false, component: ListBody, eyebrow: 'Chunks', instruction: 'Use estes blocos como peças prontas.', items: chunks });
  if (quiz) phases.push({ id: 'vocab-quiz', title: 'Reconhecimento', shortTitle: 'Quiz', description: 'Escolha a opção correta.', requiresAttempt: true, blockedMessage: 'Escolha uma alternativa antes de avançar.', component: QuizBody, item: quiz });
  phases.push({ id: 'vocab-production', title: 'Produção curta', shortTitle: 'Produção', description: 'Use o vocabulário em frases suas.', requiresAttempt: true, blockedMessage: 'Escreva sua produção antes de finalizar.', component: AttemptBody, item: usage[0] || { prompt: 'Escreva 2 frases usando o vocabulário da aula.' }, multiline: true, minWords: 8 });
  return phases;
}

export function VocabularyLessonFlow({ lesson }) {
  return <LessonFlowShell lesson={lesson} phases={buildPhases(lesson)} />;
}
