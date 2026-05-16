import { LessonFlowShell } from '../LessonFlowShell.jsx';
import { PhaseShell } from '../phases/PhaseShell.jsx';
import { SpeakField } from '../phases/SpeakField.jsx';
import { ChecklistField } from '../phases/ChecklistField.jsx';
import { clean, mergeLists, noteOf, textOf } from '../text/normalize.js';

function ModelBody({ phase }) {
  return <PhaseShell eyebrow="Modelo" title="Leia antes de falar" instruction="Use estes modelos para preparar sua fala."><ul className="lesson-phase-examples">{phase.items.map((item, index) => <li key={index}><b>{textOf(item)}</b>{noteOf(item) ? <small>{noteOf(item)}</small> : null}</li>)}</ul></PhaseShell>;
}
function SpeakBody({ phase, flow }) { return <SpeakField phase={phase} flow={flow} item={phase.item} instruction={phase.instruction} />; }
function ChecklistBody({ phase, flow }) { return <ChecklistField phase={phase} flow={flow} items={phase.items} />; }

function buildPhases(lesson = {}) {
  const models = mergeLists(lesson.modelPhrases, lesson.modelSentences, lesson.examples, lesson.speakingModels).slice(0, 8);
  const drills = mergeLists(lesson.substitutionDrills, lesson.drills, lesson.guidedSpeaking, lesson.recordingTasks, lesson.speakingPrompts);
  const free = mergeLists(lesson.freeSpeaking, lesson.openSpeaking, lesson.productionTask, lesson.productionTasks);
  const checklist = mergeLists(lesson.speakingChecklist, lesson.criteria, lesson.evaluationCriteria);
  const phases = [];
  phases.push({ id: 'speaking-model', title: 'Modelo de fala', shortTitle: 'Modelo', description: 'Prepare-se antes de gravar.', requiresAttempt: false, component: ModelBody, items: models.length ? models : [{ text: clean(lesson.intro || 'Pratique falando com clareza e usando as estruturas da aula.') }] });
  phases.push({ id: 'speaking-guided', title: 'Fala guiada', shortTitle: 'Guiada', description: 'Fale ou escreva o que você falaria.', requiresAttempt: true, blockedMessage: 'Fale ou digite sua resposta antes de avançar.', component: SpeakBody, item: drills[0] || { prompt: 'Repita ou adapte o modelo da aula em voz alta.' } });
  phases.push({ id: 'speaking-free', title: 'Fala livre', shortTitle: 'Livre', description: 'Produza uma resposta sua.', requiresAttempt: true, blockedMessage: 'Faça a fala livre antes de avançar.', component: SpeakBody, item: free[0] || { prompt: 'Fale por 30 segundos sobre o tema da aula.' } });
  phases.push({ id: 'speaking-checklist', title: 'Auto-checklist', shortTitle: 'Checklist', description: 'Confira sua fala.', requiresAttempt: true, blockedMessage: 'Marque os critérios antes de finalizar.', component: ChecklistBody, items: checklist.length ? checklist : ['Falei alto e claro.', 'Usei estruturas da aula.', 'Usei palavras novas.', 'Consegui completar a ideia.'] });
  return phases;
}

export function SpeakingLessonFlow({ lesson }) {
  return <LessonFlowShell lesson={lesson} phases={buildPhases(lesson)} />;
}
