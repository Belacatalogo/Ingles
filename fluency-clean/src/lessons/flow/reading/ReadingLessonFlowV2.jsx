import { LessonFlowShell } from '../LessonFlowShell.jsx';
import { PhaseShell } from '../phases/PhaseShell.jsx';
import { AttemptField } from '../phases/AttemptField.jsx';
import { ChoiceField } from '../phases/ChoiceField.jsx';
import { clean, mergeLists, noteOf, safeArray, textOf } from '../text/normalize.js';

function ObjectiveBody({ phase }) { return <PhaseShell eyebrow="Objetivo" title="Antes de ler" instruction={phase.instruction} />; }
function VocabBody({ phase }) {
  return <PhaseShell eyebrow="Vocabulário" title="Palavras antes do texto" instruction="Estude estas palavras antes da leitura."><ul className="lesson-phase-vocab-list">{phase.items.map((item, index) => <li key={index}><b>{clean(item?.word || textOf(item))}</b>{noteOf(item) ? <small>{noteOf(item)}</small> : null}</li>)}</ul></PhaseShell>;
}
function TextBody({ phase }) { return <PhaseShell eyebrow="Texto principal" title="Leia com calma" instruction="Agora leia o texto principal da aula."><pre className="lesson-phase-reading-text">{phase.text}</pre></PhaseShell>; }
function AttemptBody({ phase, flow }) { return <AttemptField phase={phase} flow={flow} item={phase.item} multiline minWords={phase.minWords || 3} />; }
function QuizBody({ phase, flow }) { return <ChoiceField phase={phase} flow={flow} item={phase.item} />; }
function ReviewBody() { return <PhaseShell eyebrow="Revisão" title="Aula concluída" instruction="Revise mentalmente o texto, as palavras novas e a resposta que você produziu." />; }

function getMainText(lesson = {}) {
  return clean(lesson.mainText || lesson.text || lesson.readingText || textOf(lesson.article)) || 'Texto principal não encontrado nesta aula.';
}
function buildPhases(lesson = {}) {
  const objective = clean(lesson.objective || textOf(safeArray(lesson.objectives)[0]) || lesson.intro) || 'Leia para entender a ideia principal e detalhes importantes.';
  const vocab = mergeLists(lesson.vocabulary, lesson.keyVocabulary, lesson.preReadingVocabulary).slice(0, 12);
  const questions = mergeLists(lesson.comprehensionQuestions, lesson.questions, lesson.evidenceTasks);
  const quiz = questions.find((item) => Array.isArray(item?.options) && item.options.length);
  const openQuestion = questions.find((item) => !Array.isArray(item?.options));
  const production = mergeLists(lesson.productionTask, lesson.shortResponse, lesson.summaryTask);
  const phases = [
    { id: 'reading-objective', title: 'Objetivo da leitura', shortTitle: 'Objetivo', description: 'Prepare o foco antes de ler.', requiresAttempt: false, component: ObjectiveBody, instruction: objective },
  ];
  if (vocab.length) phases.push({ id: 'reading-vocab', title: 'Vocabulário pré-texto', shortTitle: 'Vocabulário', description: 'Aprenda as palavras-chave.', requiresAttempt: false, component: VocabBody, items: vocab });
  phases.push({ id: 'reading-text', title: 'Texto principal', shortTitle: 'Texto', description: 'Leia o texto completo.', requiresAttempt: false, component: TextBody, text: getMainText(lesson) });
  if (quiz) phases.push({ id: 'reading-quiz', title: 'Compreensão', shortTitle: 'Pergunta', description: 'Responda sem ver gabarito antes.', requiresAttempt: true, blockedMessage: 'Responda a pergunta antes de avançar.', component: QuizBody, item: quiz });
  phases.push({ id: 'reading-response', title: 'Resposta com evidência', shortTitle: 'Evidência', description: 'Escreva uma resposta baseada no texto.', requiresAttempt: true, blockedMessage: 'Escreva sua resposta antes de avançar.', component: AttemptBody, item: openQuestion || { prompt: 'Explique a ideia principal do texto com suas palavras.' }, minWords: 8 });
  phases.push({ id: 'reading-production', title: 'Produção final', shortTitle: 'Produção', description: 'Use o conteúdo da leitura em uma resposta sua.', requiresAttempt: true, blockedMessage: 'Faça sua produção antes de finalizar.', component: AttemptBody, item: production[0] || { prompt: 'Escreva 2 frases sobre o tema do texto.' }, minWords: 10 });
  phases.push({ id: 'reading-review', title: 'Revisão', shortTitle: 'Revisão', description: 'Feche a aula.', requiresAttempt: false, component: ReviewBody });
  return phases;
}

export function ReadingLessonFlowV2({ lesson }) {
  return <LessonFlowShell lesson={lesson} phases={buildPhases(lesson)} />;
}
