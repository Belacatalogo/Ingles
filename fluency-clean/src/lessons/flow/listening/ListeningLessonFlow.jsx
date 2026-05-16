import { LessonFlowShell } from '../LessonFlowShell.jsx';
import { PhaseShell } from '../phases/PhaseShell.jsx';
import { AttemptField } from '../phases/AttemptField.jsx';
import { ChoiceField } from '../phases/ChoiceField.jsx';
import { ListPhase } from '../phases/ListPhase.jsx';
import { AudioListenField } from '../phases/AudioListenField.jsx';
import { clean, mergeLists, safeArray, textOf } from '../text/normalize.js';

function IntroBody({ phase }) {
  return <PhaseShell eyebrow="Preparação" title="Antes de ouvir" instruction={phase.instruction} />;
}
function TextBody({ phase }) {
  return <PhaseShell eyebrow={phase.eyebrow || 'Texto'} title={phase.bodyTitle || phase.title} instruction={phase.instruction}><pre className="lesson-phase-reading-text">{phase.text}</pre></PhaseShell>;
}
function QuizBody({ phase, flow }) { return <ChoiceField phase={phase} flow={flow} item={phase.item} />; }
function AttemptBody({ phase, flow }) { return <AttemptField phase={phase} flow={flow} item={phase.item} multiline minWords={phase.minWords || 3} />; }
function ListBody({ phase }) { return <ListPhase phase={phase} />; }
function AudioBody({ phase, flow }) { return <AudioListenField phase={phase} flow={flow} />; }

function listeningText(lesson = {}) {
  return clean(lesson.audioText || lesson.audioScript || lesson.transcript || lesson.script || '');
}
function taskToAttempt(item, fallbackPrompt) {
  if (!item) return { prompt: fallbackPrompt };
  if (Array.isArray(item?.options) && item.options.length) return item;
  return { ...item, prompt: textOf(item) || fallbackPrompt };
}
function pushAttempts(phases, baseId, title, shortTitle, items, fallbackPrompt, minWords = 3) {
  items.forEach((item, index) => {
    const quiz = Array.isArray(item?.options) && item.options.length;
    phases.push({
      id: `${baseId}-${index + 1}`,
      title: items.length > 1 ? `${title} ${index + 1}` : title,
      shortTitle: items.length > 1 ? `${shortTitle} ${index + 1}` : shortTitle,
      description: quiz ? 'Escolha uma resposta.' : 'Faça uma tentativa antes de avançar.',
      requiresAttempt: true,
      blockedMessage: 'Complete esta ação antes de avançar.',
      component: quiz ? QuizBody : AttemptBody,
      item: taskToAttempt(item, fallbackPrompt),
      minWords,
    });
  });
}

function buildPhases(lesson = {}) {
  const audioText = listeningText(lesson);
  const intro = clean(lesson.listeningPreparation || lesson.beforeListening || lesson.preListening || textOf(safeArray(lesson.objectives)[0])) || 'Prepare-se para ouvir sem ler primeiro.';
  const keyWords = mergeLists(lesson.keyWordsToHear, lesson.vocabulary, lesson.pronunciationChunks);
  const firstTasks = mergeLists(lesson.firstListenTasks);
  const secondTasks = mergeLists(lesson.secondListenTasks);
  const comprehension = mergeLists(lesson.listeningComprehension, lesson.comprehensionQuestions);
  const dictation = mergeLists(lesson.dictationTasks);
  const shadowing = mergeLists(lesson.shadowing, lesson.pronunciationChunks);
  const oralProduction = mergeLists(lesson.oralProduction, lesson.productionTasks, lesson.freeSpeaking);
  const transcript = clean(lesson.transcript || lesson.audioScript || lesson.script) || 'Transcript não encontrado nesta aula.';

  const phases = [
    { id: 'listening-before', title: 'Antes de ouvir', shortTitle: 'Preparar', description: 'Entenda o foco da escuta.', requiresAttempt: false, component: IntroBody, instruction: intro },
  ];
  if (keyWords.length) phases.push({ id: 'listening-keywords', title: 'Palavras para ouvir', shortTitle: 'Palavras', description: 'Prepare o ouvido para palavras-chave.', requiresAttempt: false, component: ListBody, eyebrow: 'Vocabulário auditivo', instruction: 'Procure reconhecer estas palavras no áudio.', items: keyWords });

  phases.push({ id: 'listening-first-audio', title: 'Primeira escuta', shortTitle: '1ª escuta', description: 'Ouça sem ler.', requiresAttempt: true, blockedMessage: 'Prepare e reproduza o áudio antes de avançar.', component: AudioBody, instruction: 'Ouça tentando entender a ideia geral.', audioText, transcript, limit: 2 });
  pushAttempts(phases, 'listening-first-task', 'Tarefa da primeira escuta', '1ª tarefa', firstTasks, 'O que você entendeu na primeira escuta?', 4);

  phases.push({ id: 'listening-second-audio', title: 'Segunda escuta', shortTitle: '2ª escuta', description: 'Ouça com foco em detalhes.', requiresAttempt: true, blockedMessage: 'Prepare e reproduza o áudio antes de avançar.', component: AudioBody, instruction: 'Ouça novamente buscando detalhes e palavras-chave.', audioText, transcript, limit: 2 });
  pushAttempts(phases, 'listening-second-task', 'Tarefa da segunda escuta', '2ª tarefa', secondTasks, 'Qual detalhe importante você ouviu?', 4);
  pushAttempts(phases, 'listening-comprehension', 'Compreensão', 'Pergunta', comprehension, 'Responda com base no áudio.', 4);
  pushAttempts(phases, 'listening-dictation', 'Dictation', 'Dictation', dictation, 'Digite a frase ou trecho que você ouviu.', 2);

  if (shadowing.length) phases.push({ id: 'listening-shadowing', title: 'Shadowing', shortTitle: 'Shadowing', description: 'Repita frases úteis do áudio.', requiresAttempt: false, component: ListBody, eyebrow: 'Shadowing', instruction: 'Leia em voz alta e imite ritmo/entonação.', items: shadowing });
  phases.push({ id: 'listening-transcript', title: 'Transcript liberado', shortTitle: 'Transcript', description: 'Confira depois de tentar.', requiresAttempt: false, component: TextBody, eyebrow: 'Transcript', bodyTitle: 'Agora confira o texto', instruction: 'Use o transcript apenas depois de tentar ouvir sem ler.', text: transcript });
  pushAttempts(phases, 'listening-production', 'Produção oral', 'Produção', oralProduction.length ? oralProduction : [{ prompt: 'Escreva o que você diria em voz alta sobre esse áudio.' }], 'Escreva o que você diria em voz alta sobre esse áudio.', 8);

  return phases;
}

export function ListeningLessonFlow({ lesson }) {
  return <LessonFlowShell lesson={lesson} phases={buildPhases(lesson)} />;
}
