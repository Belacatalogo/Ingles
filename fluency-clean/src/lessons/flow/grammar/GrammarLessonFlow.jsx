import { LessonFlowShell } from '../LessonFlowShell.jsx';
import { PhaseShell } from '../phases/PhaseShell.jsx';
import { AttemptField } from '../phases/AttemptField.jsx';
import { ChoiceField } from '../phases/ChoiceField.jsx';
import { ListPhase } from '../phases/ListPhase.jsx';
import { clean, mergeLists, noteOf, safeArray, textOf } from '../text/normalize.js';

function TextBody({ phase }) {
  return <PhaseShell eyebrow={phase.eyebrow || 'Conceito'} title={phase.bodyTitle || phase.title} instruction={phase.instruction}><pre className="lesson-phase-reading-text">{phase.text}</pre></PhaseShell>;
}
function ListBody({ phase }) { return <ListPhase phase={phase} />; }
function ExamplesBody({ phase }) {
  return (
    <PhaseShell eyebrow={phase.eyebrow || 'Exemplos'} title={phase.bodyTitle || phase.title} instruction={phase.instruction}>
      <ul className="lesson-phase-examples">
        {phase.items.map((item, index) => <li key={index}><b>{textOf(item)}</b>{noteOf(item) ? <small>{noteOf(item)}</small> : null}</li>)}
      </ul>
    </PhaseShell>
  );
}
function AttemptBody({ phase, flow }) { return <AttemptField phase={phase} flow={flow} item={phase.item} multiline={phase.multiline} minWords={phase.minWords || 1} />; }
function QuizBody({ phase, flow }) { return <ChoiceField phase={phase} flow={flow} item={phase.item} />; }

function pushList(phases, id, title, shortTitle, items, instruction, eyebrow = 'Estudo') {
  if (!items.length) return;
  phases.push({ id, title, shortTitle, description: instruction, requiresAttempt: false, component: ListBody, eyebrow, instruction, items });
}
function pushText(phases, id, title, shortTitle, text, instruction, eyebrow = 'Conceito') {
  if (!clean(text)) return;
  phases.push({ id, title, shortTitle, description: instruction, requiresAttempt: false, component: TextBody, eyebrow, bodyTitle: title, instruction, text: clean(text) });
}
function pushAttempts(phases, baseId, title, shortTitle, items, fallbackPrompt, minWords = 1) {
  items.forEach((item, index) => {
    const isQuiz = Array.isArray(item?.options) && item.options.length;
    phases.push({
      id: `${baseId}-${index + 1}`,
      title: items.length > 1 ? `${title} ${index + 1}` : title,
      shortTitle: items.length > 1 ? `${shortTitle} ${index + 1}` : shortTitle,
      description: isQuiz ? 'Escolha uma alternativa.' : 'Tente antes de ver o modelo.',
      requiresAttempt: true,
      blockedMessage: 'Faça uma tentativa antes de avançar.',
      component: isQuiz ? QuizBody : AttemptBody,
      item: item || { prompt: fallbackPrompt },
      multiline: !isQuiz,
      minWords,
    });
  });
}

function buildPhases(lesson = {}) {
  const phases = [];
  const opening = clean(lesson.teacherOpening || lesson.whyItMatters || lesson.intro);
  const explanation = clean(lesson.conceptExplanation || lesson.explanation || lesson.coreExplanation || lesson.rule || textOf(safeArray(lesson.objectives)[0])) || 'Entenda a regra e depois pratique com uma resposta sua.';
  const mentalModel = clean(lesson.mentalModel);
  const portugueseContrast = mergeLists(lesson.portugueseContrast);
  const formation = mergeLists(lesson.formationGuide, lesson.formation, lesson.structure, lesson.grammarTable, lesson.whenToUse, lesson.whenNotToUse);
  const steps = mergeLists(lesson.stepByStep);
  const examples = mergeLists(lesson.teacherExamples, lesson.professorExamples, lesson.examples, lesson.exampleSentences, lesson.modelSentences);
  const mistakes = mergeLists(lesson.commonBrazilianMistakes, lesson.commonMistakes);
  const controlled = mergeLists(lesson.controlledPractice, lesson.guidedPractice);
  const correction = mergeLists(lesson.errorCorrectionPractice);
  const transformation = mergeLists(lesson.transformationPractice, lesson.transformations);
  const translation = mergeLists(lesson.translationPractice);
  const production = mergeLists(lesson.productionTasks, lesson.productionTask);
  const recap = mergeLists(lesson.lessonRecap, lesson.finalChecklist);

  pushText(phases, 'grammar-opening', 'Abertura do professor', 'Abertura', opening, 'Por que esta regra importa.', 'Professor');
  pushText(phases, 'grammar-concept', 'Explicação principal', 'Conceito', explanation, 'Entenda a regra sem cards técnicos.', 'Conceito');
  pushText(phases, 'grammar-mental-model', 'Modelo mental', 'Modelo', mentalModel, 'Uma forma simples de pensar na regra.', 'Modelo mental');
  pushList(phases, 'grammar-formation', 'Formação e uso', 'Forma', formation, 'Veja como montar e quando usar.', 'Estrutura');
  pushList(phases, 'grammar-steps', 'Passo a passo', 'Passos', steps, 'Siga a sequência para formar frases.', 'Guia');
  if (examples.length) phases.push({ id: 'grammar-examples', title: 'Exemplos do professor', shortTitle: 'Exemplos', description: 'Observe exemplos corretos.', requiresAttempt: false, component: ExamplesBody, items: examples, instruction: 'Leia os exemplos e perceba o padrão.' });
  pushList(phases, 'grammar-contrast', 'Contraste com português', 'Contraste', portugueseContrast, 'Evite transferir a estrutura do português.', 'Português x Inglês');
  pushList(phases, 'grammar-mistakes', 'Erros comuns de brasileiros', 'Erros', mistakes, 'Veja erros comuns antes de praticar.', 'Atenção');
  pushAttempts(phases, 'grammar-controlled', 'Prática controlada', 'Prática', controlled, 'Complete a frase usando a regra.', 1);
  pushAttempts(phases, 'grammar-correction', 'Correção de erro', 'Corrigir', correction, 'Corrija a frase usando a regra.', 1);
  pushAttempts(phases, 'grammar-transformation', 'Transformação', 'Transformar', transformation, 'Transforme a frase conforme a instrução.', 1);
  pushAttempts(phases, 'grammar-translation', 'Tradução controlada', 'Traduzir', translation, 'Traduza usando a regra da aula.', 2);
  pushAttempts(phases, 'grammar-production', 'Produção final', 'Produção', production.length ? production : [{ prompt: 'Escreva uma frase usando a regra da aula.' }], 'Escreva uma frase usando a regra da aula.', 6);
  pushList(phases, 'grammar-recap', 'Recap da aula', 'Recap', recap, 'Revise os pontos principais.', 'Revisão');

  return phases.length ? phases : [{ id: 'grammar-fallback', title: 'Explicação', shortTitle: 'Conceito', description: 'Estude a regra.', requiresAttempt: false, component: TextBody, text: explanation }];
}

export function GrammarLessonFlow({ lesson, onNavigate }) {
  return <LessonFlowShell lesson={lesson} phases={buildPhases(lesson)} onNavigate={onNavigate} />;
}
