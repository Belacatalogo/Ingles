import { LessonFlowShell } from '../LessonFlowShell.jsx';
import { PhaseShell } from '../phases/PhaseShell.jsx';
import { AttemptField } from '../phases/AttemptField.jsx';
import { ChecklistField } from '../phases/ChecklistField.jsx';
import { clean, mergeLists, noteOf, textOf } from '../text/normalize.js';

function ModelBody({ phase }) {
  return <PhaseShell eyebrow="Modelo" title="Referência" instruction="Leia o modelo antes de escrever."><pre className="lesson-phase-model-text">{phase.model}</pre></PhaseShell>;
}
function BlocksBody({ phase }) {
  return <PhaseShell eyebrow="Blocos" title="Frases úteis" instruction="Use estes blocos no seu texto."><ul className="lesson-phase-vocab-list">{phase.items.map((item, index) => <li key={index}><b>{textOf(item)}</b>{noteOf(item) ? <small>{noteOf(item)}</small> : null}</li>)}</ul></PhaseShell>;
}
function DraftBody({ phase, flow }) { return <AttemptField phase={phase} flow={flow} item={phase.item} multiline minWords={20} placeholder="Escreva aqui..." />; }
function ChecklistBody({ phase, flow }) { return <ChecklistField phase={phase} flow={flow} items={phase.items} />; }

function buildPhases(lesson = {}) {
  const model = clean(lesson.modelText || lesson.writingModel || textOf(lesson.modelExample)) || 'Modelo não encontrado nesta aula.';
  const blocks = mergeLists(lesson.buildingBlocks, lesson.connectors, lesson.usefulPhrases, lesson.writingScaffold).slice(0, 12);
  const draft = lesson.draftTask || mergeLists(lesson.draftTasks)[0] || { prompt: 'Escreva seu rascunho.' };
  const finalTask = lesson.finalVersionTask || lesson.revisionTask || mergeLists(lesson.finalTasks)[0] || { prompt: 'Reescreva sua versão melhorada.' };
  const checklist = mergeLists(lesson.writingChecklist, lesson.criteria, lesson.evaluationCriteria);
  const phases = [{ id: 'writing-model', title: 'Modelo', shortTitle: 'Modelo', description: 'Veja uma referência.', requiresAttempt: false, component: ModelBody, model }];
  if (blocks.length) phases.push({ id: 'writing-blocks', title: 'Blocos de construção', shortTitle: 'Blocos', description: 'Use frases úteis.', requiresAttempt: false, component: BlocksBody, items: blocks });
  phases.push({ id: 'writing-draft', title: 'Rascunho', shortTitle: 'Rascunho', description: 'Escreva pelo menos 20 palavras.', requiresAttempt: true, blockedMessage: 'Escreva o rascunho antes de avançar.', component: DraftBody, item: draft });
  phases.push({ id: 'writing-checklist', title: 'Checklist', shortTitle: 'Checklist', description: 'Revise antes da versão final.', requiresAttempt: true, blockedMessage: 'Marque os critérios antes de avançar.', component: ChecklistBody, items: checklist.length ? checklist : ['Tem começo, meio e fim.', 'Usei estruturas da aula.', 'Usei palavras novas.', 'Reli procurando erros.'] });
  phases.push({ id: 'writing-final', title: 'Versão final', shortTitle: 'Final', description: 'Entregue a versão revisada.', requiresAttempt: true, blockedMessage: 'Escreva a versão final antes de finalizar.', component: DraftBody, item: finalTask });
  return phases;
}

export function WritingLessonFlow({ lesson }) {
  return <LessonFlowShell lesson={lesson} phases={buildPhases(lesson)} />;
}
