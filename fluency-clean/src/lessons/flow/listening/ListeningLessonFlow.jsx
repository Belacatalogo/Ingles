import { useState } from 'react';
import { Headphones, PlayCircle } from 'lucide-react';
import { LessonFlowShell } from '../LessonFlowShell.jsx';
import { PhaseShell } from '../phases/PhaseShell.jsx';
import { AttemptField } from '../phases/AttemptField.jsx';
import { ChoiceField } from '../phases/ChoiceField.jsx';
import { clean, mergeLists, safeArray, textOf } from '../text/normalize.js';

function PlayerBody({ phase, flow }) {
  const [plays, setPlays] = useState(0);
  const limit = phase.limit || 2;
  function play() {
    if (plays >= limit) return;
    setPlays((value) => value + 1);
    if (!flow.attempts[phase.id]) flow.markAttempt(phase.id, { played: true });
  }
  return <PhaseShell eyebrow="Escuta" title={phase.title} instruction={phase.instruction}><button type="button" className="lesson-phase-play" onClick={play} disabled={plays >= limit}><PlayCircle size={18} /> Ouvir ({plays}/{limit})</button><p className="lesson-phase-speak-hint"><Headphones size={12} /> Transcript só aparece depois das tentativas iniciais.</p></PhaseShell>;
}
function QuizBody({ phase, flow }) { return <ChoiceField phase={phase} flow={flow} item={phase.item} />; }
function AttemptBody({ phase, flow }) { return <AttemptField phase={phase} flow={flow} item={phase.item} multiline minWords={phase.minWords || 3} />; }
function TranscriptBody({ phase }) { return <PhaseShell eyebrow="Transcript" title="Agora confira o texto" instruction="Use o transcript apenas depois de tentar ouvir sem ler."><pre className="lesson-phase-reading-text">{phase.transcript}</pre></PhaseShell>; }

function buildPhases(lesson = {}) {
  const intro = clean(lesson.beforeListening || lesson.preListening || textOf(safeArray(lesson.objectives)[0])) || 'Prepare-se para ouvir sem ler primeiro.';
  const questions = mergeLists(lesson.comprehensionQuestions, lesson.listeningComprehension, lesson.secondListenTasks);
  const quiz = questions.find((item) => Array.isArray(item?.options) && item.options.length);
  const openQuestion = questions.find((item) => !Array.isArray(item?.options));
  const transcript = clean(lesson.transcript || lesson.audioScript || lesson.script) || 'Transcript não encontrado nesta aula.';
  const phases = [
    { id: 'listening-before', title: 'Antes de ouvir', shortTitle: 'Preparar', description: 'Entenda o foco da escuta.', requiresAttempt: false, component: PhaseShell, instruction: intro },
    { id: 'listening-first', title: 'Primeira escuta', shortTitle: '1ª escuta', description: 'Ouça sem ler.', requiresAttempt: true, blockedMessage: 'Toque para ouvir antes de avançar.', component: PlayerBody, instruction: 'Ouça tentando entender a ideia geral.', limit: 2 },
    { id: 'listening-second', title: 'Segunda escuta', shortTitle: '2ª escuta', description: 'Ouça com foco em detalhes.', requiresAttempt: true, blockedMessage: 'Faça a segunda escuta antes de avançar.', component: PlayerBody, instruction: 'Ouça novamente buscando palavras-chave.', limit: 2 },
  ];
  if (quiz) phases.push({ id: 'listening-quiz', title: 'Compreensão', shortTitle: 'Pergunta', description: 'Responda antes de ver transcript.', requiresAttempt: true, blockedMessage: 'Responda a pergunta antes de avançar.', component: QuizBody, item: quiz });
  phases.push({ id: 'listening-response', title: 'Resposta curta', shortTitle: 'Resposta', description: 'Escreva o que entendeu.', requiresAttempt: true, blockedMessage: 'Escreva sua resposta antes de avançar.', component: AttemptBody, item: openQuestion || { prompt: 'O que você entendeu do áudio?' }, minWords: 6 });
  phases.push({ id: 'listening-transcript', title: 'Transcript liberado', shortTitle: 'Transcript', description: 'Confira depois de tentar.', requiresAttempt: false, component: TranscriptBody, transcript });
  phases.push({ id: 'listening-production', title: 'Produção oral', shortTitle: 'Produção', description: 'Use o conteúdo em uma resposta sua.', requiresAttempt: true, blockedMessage: 'Faça a produção antes de finalizar.', component: AttemptBody, item: { prompt: 'Escreva o que você diria em voz alta sobre esse áudio.' }, minWords: 8 });
  return phases;
}

export function ListeningLessonFlow({ lesson }) {
  return <LessonFlowShell lesson={lesson} phases={buildPhases(lesson)} />;
}
