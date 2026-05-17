import { LessonFlowShell } from '../LessonFlowShell.jsx';
import { PhaseShell } from '../phases/PhaseShell.jsx';
import { AttemptField } from '../phases/AttemptField.jsx';
import { ChoiceField } from '../phases/ChoiceField.jsx';
import { ListPhase } from '../phases/ListPhase.jsx';
import { clean, mergeLists, noteOf, safeArray, textOf } from '../text/normalize.js';

function ObjectiveBody({ phase }) { return <PhaseShell eyebrow="Objetivo" title="Antes de ler" instruction={phase.instruction} />; }
function ListBody({ phase }) { return <ListPhase phase={phase} />; }
function TextBody({ phase }) { return <PhaseShell eyebrow={phase.eyebrow || 'Texto principal'} title={phase.bodyTitle || phase.title} instruction={phase.instruction}><pre className="lesson-phase-reading-text">{phase.text}</pre></PhaseShell>; }
function AttemptBody({ phase, flow, lesson }) { return <AttemptField phase={phase} flow={flow} item={phase.item} multiline minWords={phase.minWords || 3} lesson={lesson} />; }
function QuizBody({ phase, flow }) { return <ChoiceField phase={phase} flow={flow} item={phase.item} />; }
function ReviewBody({ phase }) { return <ListPhase phase={phase} />; }

function getMainText(lesson = {}) {
  return clean(lesson.mainText || lesson.text || lesson.readingText || textOf(lesson.article)) || 'Texto principal não encontrado nesta aula.';
}
function pushList(phases, id, title, shortTitle, items, instruction, eyebrow = 'Estudo') {
  if (!items.length) return;
  phases.push({ id, title, shortTitle, description: instruction, requiresAttempt: false, component: ListBody, eyebrow, instruction, items });
}
function pushAttempts(phases, baseId, title, shortTitle, items, fallbackPrompt, minWords = 3) {
  items.forEach((item, index) => {
    const isQuiz = Array.isArray(item?.options) && item.options.length;
    phases.push({
      id: `${baseId}-${index + 1}`,
      title: items.length > 1 ? `${title} ${index + 1}` : title,
      shortTitle: items.length > 1 ? `${shortTitle} ${index + 1}` : shortTitle,
      description: isQuiz ? 'Escolha uma alternativa.' : 'Responda com base no texto.',
      requiresAttempt: true,
      blockedMessage: 'Complete esta ação antes de avançar.',
      component: isQuiz ? QuizBody : AttemptBody,
      item: item || { prompt: fallbackPrompt },
      minWords,
    });
  });
}

function buildPhases(lesson = {}) {
  const objective = clean(lesson.readingPurpose || lesson.objective || textOf(safeArray(lesson.objectives)[0]) || lesson.intro) || 'Leia para entender a ideia principal e detalhes importantes.';
  const preReading = mergeLists(lesson.preReading, lesson.preReadingVocabulary, lesson.vocabulary, lesson.keyVocabulary);
  const strategy = clean(lesson.readingStrategy || lesson.strategy || lesson.teacherOpening || lesson.whyItMatters);
  const mainText = getMainText(lesson);
  const firstRead = mergeLists(lesson.firstReadTask);
  const secondRead = mergeLists(lesson.secondReadTasks);
  const evidence = mergeLists(lesson.evidenceQuestions, lesson.evidenceTasks, lesson.comprehensionQuestions, lesson.questions);
  const contextVocab = mergeLists(lesson.contextVocabularyTasks);
  const summary = mergeLists(lesson.guidedSummary, lesson.shortResponse, lesson.summaryTask);
  const production = mergeLists(lesson.connectedProduction, lesson.productionTask, lesson.productionTasks);
  const recap = mergeLists(lesson.lessonRecap);

  const phases = [
    { id: 'reading-objective', title: 'Objetivo da leitura', shortTitle: 'Objetivo', description: 'Prepare o foco antes de ler.', requiresAttempt: false, component: ObjectiveBody, instruction: objective },
  ];
  pushList(phases, 'reading-vocab', 'Vocabulário pré-texto', 'Vocabulário', preReading, 'Aprenda as palavras-chave antes da leitura.', 'Vocabulário');
  if (strategy) phases.push({ id: 'reading-strategy', title: 'Estratégia de leitura', shortTitle: 'Estratégia', description: 'Como ler melhor este texto.', requiresAttempt: false, component: TextBody, eyebrow: 'Estratégia', bodyTitle: 'Como ler esta aula', instruction: 'Use esta estratégia antes de responder.', text: strategy });
  phases.push({ id: 'reading-text', title: 'Texto principal', shortTitle: 'Texto', description: 'Leia o texto completo.', requiresAttempt: false, component: TextBody, text: mainText, instruction: 'Agora leia o texto principal da aula.' });
  pushAttempts(phases, 'reading-first-read', 'Primeira leitura', '1ª leitura', firstRead, 'Qual é a ideia principal do texto?', 5);
  pushAttempts(phases, 'reading-second-read', 'Segunda leitura', '2ª leitura', secondRead, 'Que detalhe importante você encontrou?', 5);
  pushAttempts(phases, 'reading-evidence', 'Pergunta com evidência', 'Evidência', evidence, 'Responda e cite a parte do texto que prova sua resposta.', 6);
  pushAttempts(phases, 'reading-context-vocab', 'Vocabulário pelo contexto', 'Contexto', contextVocab, 'Explique o significado pelo contexto.', 3);
  pushAttempts(phases, 'reading-summary', 'Resumo guiado', 'Resumo', summary, 'Resuma o texto com suas palavras.', 10);
  pushAttempts(phases, 'reading-production', 'Produção conectada', 'Produção', production.length ? production : [{ prompt: 'Escreva 2 frases sobre o tema do texto.' }], 'Escreva 2 frases sobre o tema do texto.', 10);
  pushList(phases, 'reading-review', 'Revisão', 'Revisão', recap.length ? recap : ['Revise a ideia principal.', 'Revise o vocabulário novo.', 'Revise a produção final.'], 'Feche a aula revisando os pontos principais.', 'Revisão');
  return phases;
}

export function ReadingLessonFlowV2({ lesson, onNavigate }) {
  return <LessonFlowShell lesson={lesson} phases={buildPhases(lesson)} onNavigate={onNavigate} />;
}
