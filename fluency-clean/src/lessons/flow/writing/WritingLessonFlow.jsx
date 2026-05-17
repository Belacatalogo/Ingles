import { LessonFlowShell } from '../LessonFlowShell.jsx';
import { PhaseShell } from '../phases/PhaseShell.jsx';
import { AttemptField } from '../phases/AttemptField.jsx';
import { ChecklistField } from '../phases/ChecklistField.jsx';
import { ListPhase } from '../phases/ListPhase.jsx';
import { clean, mergeLists, textOf } from '../text/normalize.js';

function TextBody({ phase }) {
  return <PhaseShell eyebrow={phase.eyebrow || 'Texto'} title={phase.bodyTitle || phase.title} instruction={phase.instruction}><pre className="lesson-phase-model-text">{phase.text}</pre></PhaseShell>;
}
function ListBody({ phase }) { return <ListPhase phase={phase} />; }
function DraftBody({ phase, flow, lesson }) { return <AttemptField phase={phase} flow={flow} item={phase.item} multiline minWords={phase.minWords || 20} placeholder="Escreva aqui..." lesson={lesson} />; }
function ChecklistBody({ phase, flow }) { return <ChecklistField phase={phase} flow={flow} items={phase.items} />; }

function pushText(phases, id, title, shortTitle, text, instruction, eyebrow = 'Modelo') {
  if (!clean(text)) return;
  phases.push({ id, title, shortTitle, description: instruction, requiresAttempt: false, component: TextBody, eyebrow, bodyTitle: title, instruction, text: clean(text) });
}
function pushList(phases, id, title, shortTitle, items, instruction, eyebrow = 'Escrita') {
  if (!items.length) return;
  phases.push({ id, title, shortTitle, description: instruction, requiresAttempt: false, component: ListBody, eyebrow, instruction, items });
}
function pushDraft(phases, id, title, shortTitle, item, minWords, fallbackPrompt) {
  phases.push({ id, title, shortTitle, description: `Escreva pelo menos ${minWords} palavras.`, requiresAttempt: true, blockedMessage: 'Escreva sua resposta antes de avançar.', component: DraftBody, item: item || { prompt: fallbackPrompt }, minWords });
}

function buildPhases(lesson = {}) {
  const model = clean(lesson.modelText || lesson.writingModel || textOf(lesson.modelExample)) || 'Modelo não encontrado nesta aula.';
  const breakdown = mergeLists(lesson.modelTextBreakdown);
  const blocks = mergeLists(lesson.writingBlocks, lesson.buildingBlocks, lesson.connectors, lesson.usefulPhrases, lesson.writingScaffold, lesson.usefulSentences);
  const grammar = mergeLists(lesson.grammarForWriting);
  const substitution = mergeLists(lesson.guidedSubstitution);
  const mistakes = mergeLists(lesson.commonWritingMistakes);
  const draft = lesson.draftTask || mergeLists(lesson.draftTasks)[0] || { prompt: 'Escreva seu rascunho.' };
  const checklist = mergeLists(lesson.revisionChecklist, lesson.writingChecklist, lesson.checklist, lesson.criteria, lesson.evaluationCriteria);
  const finalTask = lesson.finalVersionTask || lesson.revisionTask || mergeLists(lesson.finalTasks)[0] || { prompt: 'Reescreva sua versão melhorada.' };
  const phases = [];

  pushText(phases, 'writing-model', 'Modelo', 'Modelo', model, 'Leia o modelo antes de escrever.', 'Modelo');
  pushList(phases, 'writing-breakdown', 'Partes do modelo', 'Partes', breakdown, 'Entenda como o texto foi construído.', 'Análise');
  pushList(phases, 'writing-blocks', 'Blocos de construção', 'Blocos', blocks, 'Use estes blocos no seu texto.', 'Blocos');
  pushList(phases, 'writing-grammar', 'Gramática para escrita', 'Gramática', grammar, 'Aplique estes pontos no seu texto.', 'Gramática');
  substitution.forEach((item, index) => pushDraft(phases, `writing-substitution-${index + 1}`, substitution.length > 1 ? `Substituição guiada ${index + 1}` : 'Substituição guiada', substitution.length > 1 ? `Subst. ${index + 1}` : 'Subst.', item, 4, 'Substitua as informações mantendo a estrutura.'));
  pushList(phases, 'writing-mistakes', 'Erros comuns', 'Erros', mistakes, 'Evite estes erros antes do rascunho.', 'Atenção');
  pushDraft(phases, 'writing-draft', 'Rascunho', 'Rascunho', draft, 20, 'Escreva seu rascunho.');
  phases.push({ id: 'writing-checklist', title: 'Checklist de revisão', shortTitle: 'Checklist', description: 'Revise antes da versão final.', requiresAttempt: true, blockedMessage: 'Marque os critérios antes de avançar.', component: ChecklistBody, items: checklist.length ? checklist : ['Tem começo, meio e fim.', 'Usei estruturas da aula.', 'Usei palavras novas.', 'Reli procurando erros.'] });
  pushDraft(phases, 'writing-final', 'Versão final', 'Final', finalTask, 20, 'Reescreva sua versão melhorada.');
  // "Preparação para feedback" removida: fase passiva substituída pela revisão adaptativa no LessonCompletionCard
  return phases;
}

export function WritingLessonFlow({ lesson, onNavigate }) {
  return <LessonFlowShell lesson={lesson} phases={buildPhases(lesson)} onNavigate={onNavigate} />;
}
