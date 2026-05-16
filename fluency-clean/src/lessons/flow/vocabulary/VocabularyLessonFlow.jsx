import { LessonFlowShell } from '../LessonFlowShell.jsx';
import { PhaseShell } from '../phases/PhaseShell.jsx';
import { AttemptField } from '../phases/AttemptField.jsx';
import { ChoiceField } from '../phases/ChoiceField.jsx';
import { ListPhase } from '../phases/ListPhase.jsx';
import { clean, mergeLists, noteOf, safeArray, textOf } from '../text/normalize.js';

function ContextBody({ phase }) {
  return <PhaseShell eyebrow="Contexto" title="Antes de usar" instruction={phase.instruction} />;
}
function ListBody({ phase }) { return <ListPhase phase={phase} />; }
function DialogueBody({ phase }) {
  return <PhaseShell eyebrow="Mini diálogo" title={phase.bodyTitle || phase.title} instruction={phase.instruction}><pre className="lesson-phase-reading-text">{phase.text}</pre></PhaseShell>;
}
function AttemptBody({ phase, flow }) { return <AttemptField phase={phase} flow={flow} item={phase.item} multiline={phase.multiline} minWords={phase.minWords || 1} />; }
function QuizBody({ phase, flow }) { return <ChoiceField phase={phase} flow={flow} item={phase.item} />; }

function pushList(phases, id, title, shortTitle, items, instruction, eyebrow = 'Vocabulário') {
  if (!items.length) return;
  phases.push({ id, title, shortTitle, description: instruction, requiresAttempt: false, component: ListBody, eyebrow, instruction, items });
}
function pushDialogue(phases, items) {
  items.forEach((item, index) => {
    const text = clean(item?.dialogue || item?.text || textOf(item));
    if (!text) return;
    phases.push({ id: `vocab-dialogue-${index + 1}`, title: items.length > 1 ? `Mini diálogo ${index + 1}` : 'Mini diálogo', shortTitle: items.length > 1 ? `Diálogo ${index + 1}` : 'Diálogo', description: 'Veja o vocabulário em uso real.', requiresAttempt: false, component: DialogueBody, text, instruction: noteOf(item) || 'Observe como as palavras aparecem em contexto.' });
  });
}
function pushAttempts(phases, baseId, title, shortTitle, items, fallbackPrompt, minWords = 1) {
  items.forEach((item, index) => {
    const isQuiz = Array.isArray(item?.options) && item.options.length;
    phases.push({
      id: `${baseId}-${index + 1}`,
      title: items.length > 1 ? `${title} ${index + 1}` : title,
      shortTitle: items.length > 1 ? `${shortTitle} ${index + 1}` : shortTitle,
      description: isQuiz ? 'Escolha uma alternativa.' : 'Use o vocabulário em contexto.',
      requiresAttempt: true,
      blockedMessage: 'Complete esta ação antes de avançar.',
      component: isQuiz ? QuizBody : AttemptBody,
      item: item || { prompt: fallbackPrompt },
      multiline: !isQuiz,
      minWords,
    });
  });
}

function buildPhases(lesson = {}) {
  const context = clean(lesson.topicContext || lesson.context || lesson.situation || lesson.intro || textOf(safeArray(lesson.objectives)[0])) || 'Estude o vocabulário em contexto antes de usar.';
  const essentialWords = mergeLists(lesson.essentialWords, lesson.keyVocabulary, lesson.vocabulary, lesson.lexicalSets);
  const chunks = mergeLists(lesson.chunks, lesson.collocations, lesson.phrases);
  const pronunciation = mergeLists(lesson.pronunciationFocus, lesson.pronunciationNotes);
  const confusions = mergeLists(lesson.dangerousConfusions);
  const dialogues = mergeLists(lesson.miniDialogues);
  const examples = mergeLists(lesson.examples);
  const recognition = mergeLists(lesson.recognitionPractice, lesson.recognitionTasks, lesson.matchingTasks, lesson.quiz);
  const usage = mergeLists(lesson.usagePractice, lesson.usageTasks, lesson.gapFillTasks);
  const production = mergeLists(lesson.productionTasks, lesson.productionTask);
  const review = mergeLists(lesson.spacedReview);

  const phases = [{ id: 'vocab-context', title: 'Contexto', shortTitle: 'Contexto', description: 'Entenda onde usar as palavras.', requiresAttempt: false, component: ContextBody, instruction: context }];
  pushList(phases, 'vocab-words', 'Palavras essenciais', 'Palavras', essentialWords, 'Leia as palavras e sentidos principais.', 'Vocabulário');
  pushList(phases, 'vocab-chunks', 'Chunks e combinações', 'Chunks', chunks, 'Use estes blocos como peças prontas.', 'Chunks');
  pushList(phases, 'vocab-pronunciation', 'Pronúncia', 'Pronúncia', pronunciation, 'Perceba sons, ritmo e pontos de atenção.', 'Pronúncia');
  pushList(phases, 'vocab-confusions', 'Confusões perigosas', 'Confusões', confusions, 'Evite misturar palavras parecidas.', 'Atenção');
  pushDialogue(phases, dialogues);
  pushList(phases, 'vocab-examples', 'Exemplos em frases', 'Exemplos', examples, 'Veja as palavras em frases completas.', 'Exemplos');
  pushAttempts(phases, 'vocab-recognition', 'Reconhecimento', 'Quiz', recognition, 'Escolha ou identifique o vocabulário correto.', 1);
  pushAttempts(phases, 'vocab-usage', 'Uso em contexto', 'Uso', usage, 'Complete ou use o vocabulário em contexto.', 2);
  pushAttempts(phases, 'vocab-production', 'Produção curta', 'Produção', production.length ? production : [{ prompt: 'Escreva 2 frases usando o vocabulário da aula.' }], 'Escreva 2 frases usando o vocabulário da aula.', 8);
  pushList(phases, 'vocab-review', 'Revisão espaçada', 'Revisão', review, 'Guarde estes itens para revisar depois.', 'Revisão');
  return phases;
}

export function VocabularyLessonFlow({ lesson }) {
  return <LessonFlowShell lesson={lesson} phases={buildPhases(lesson)} />;
}
