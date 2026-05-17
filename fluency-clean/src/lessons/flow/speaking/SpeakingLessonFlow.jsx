import { useState } from 'react';
import { Loader2, Volume2 } from 'lucide-react';
import { LessonFlowShell } from '../LessonFlowShell.jsx';
import { PhaseShell } from '../phases/PhaseShell.jsx';
import { SpeakField } from '../phases/SpeakField.jsx';
import { ChecklistField } from '../phases/ChecklistField.jsx';
import { ListPhase } from '../phases/ListPhase.jsx';
import { generateGeminiAudioBlob } from '../../../services/geminiAudioService.js';
import { playLearningAudio } from '../../../services/audioPlayback.js';
import { clean, mergeLists, noteOf, textOf } from '../text/normalize.js';

function AudioPlayButton({ text }) {
  const [busy, setBusy] = useState(false);
  if (!text) return null;
  async function play() {
    if (busy) return;
    setBusy(true);
    try {
      const blob = await generateGeminiAudioBlob({ text, style: 'shadowing' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => URL.revokeObjectURL(url);
      await audio.play();
    } catch {
      await playLearningAudio({ text, label: 'modelo', allowBrowserFallback: true });
    } finally {
      setBusy(false);
    }
  }
  return (
    <button type="button" className="lesson-phase-model-audio-btn" onClick={play} disabled={busy} title="Ouvir modelo">
      {busy ? <Loader2 size={14} className="spin" /> : <Volume2 size={14} />}
    </button>
  );
}

function ModelBody({ phase }) {
  return (
    <PhaseShell eyebrow="Modelo" title="Ouça e leia antes de falar" instruction="Toque no ícone de som para ouvir cada frase. Depois use-a como base para sua fala.">
      <ul className="lesson-phase-examples">
        {phase.items.map((item, index) => (
          <li key={index} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
              <b style={{ flex: 1 }}>{textOf(item)}</b>
              <AudioPlayButton text={textOf(item)} />
            </div>
            {noteOf(item) ? <small>{noteOf(item)}</small> : null}
          </li>
        ))}
      </ul>
    </PhaseShell>
  );
}
function TextBody({ phase }) { return <PhaseShell eyebrow={phase.eyebrow || 'Situação'} title={phase.bodyTitle || phase.title} instruction={phase.instruction}><pre className="lesson-phase-reading-text">{phase.text}</pre></PhaseShell>; }
function ListBody({ phase }) { return <ListPhase phase={phase} />; }
function SpeakBody({ phase, flow, lesson }) { return <SpeakField phase={phase} flow={flow} item={phase.item} instruction={phase.instruction} lesson={lesson} />; }
function ChecklistBody({ phase, flow }) { return <ChecklistField phase={phase} flow={flow} items={phase.items} />; }

function pushList(phases, id, title, shortTitle, items, instruction, eyebrow = 'Estudo') {
  if (!items.length) return;
  phases.push({ id, title, shortTitle, description: instruction, requiresAttempt: false, component: ListBody, eyebrow, instruction, items });
}
function pushSpeak(phases, baseId, title, shortTitle, items, fallbackPrompt) {
  items.forEach((item, index) => {
    phases.push({
      id: `${baseId}-${index + 1}`,
      title: items.length > 1 ? `${title} ${index + 1}` : title,
      shortTitle: items.length > 1 ? `${shortTitle} ${index + 1}` : shortTitle,
      description: 'Fale ou use o fallback escrito.',
      requiresAttempt: true,
      blockedMessage: 'Fale ou digite sua resposta antes de avançar.',
      component: SpeakBody,
      item: item || { prompt: fallbackPrompt },
      instruction: 'Use o microfone ou escreva exatamente o que você diria.',
    });
  });
}

function buildPhases(lesson = {}) {
  const situation = clean(lesson.speakingSituation || lesson.teacherOpening || lesson.intro || lesson.whyItMatters);
  const models = mergeLists(lesson.modelPhrases, lesson.modelSentences, lesson.examples, lesson.speakingModels);
  const pronunciation = mergeLists(lesson.pronunciationChunks, lesson.pronunciationFocus);
  const repeat = mergeLists(lesson.repeatAfterMe);
  const substitution = mergeLists(lesson.substitutionDrills, lesson.drills);
  const qa = mergeLists(lesson.questionAnswerDrills, lesson.guidedSpeaking, lesson.speakingPrompts);
  const buildAnswer = mergeLists(lesson.buildYourAnswer);
  const recording = mergeLists(lesson.recordingTasks);
  const free = mergeLists(lesson.freeSpeaking, lesson.openSpeaking, lesson.productionTask, lesson.productionTasks);
  const checklist = mergeLists(lesson.speakingChecklist, lesson.criteria, lesson.evaluationCriteria);
  const phases = [];

  if (situation) phases.push({ id: 'speaking-situation', title: 'Situação de fala', shortTitle: 'Situação', description: 'Entenda quando usar esta fala.', requiresAttempt: false, component: TextBody, eyebrow: 'Situação', bodyTitle: 'Contexto da fala', instruction: 'Imagine esta situação antes de praticar.', text: situation });
  phases.push({ id: 'speaking-model', title: 'Modelo de fala', shortTitle: 'Modelo', description: 'Prepare-se antes de gravar.', requiresAttempt: false, component: ModelBody, items: models.length ? models : [{ text: clean(lesson.intro || 'Pratique falando com clareza e usando as estruturas da aula.') }] });
  pushList(phases, 'speaking-pronunciation', 'Pronúncia e ritmo', 'Pronúncia', pronunciation, 'Leia em voz alta prestando atenção ao som.', 'Pronúncia');
  pushSpeak(phases, 'speaking-repeat', 'Repeat after me', 'Repetir', repeat, 'Repita a frase em voz alta.');
  pushSpeak(phases, 'speaking-substitution', 'Substitution drill', 'Trocar', substitution, 'Troque uma informação e fale a frase.');
  pushSpeak(phases, 'speaking-qa', 'Pergunta e resposta', 'Pergunta', qa, 'Responda em voz alta.');
  pushSpeak(phases, 'speaking-build-answer', 'Monte sua resposta', 'Construir', buildAnswer, 'Monte uma resposta completa.');
  pushSpeak(phases, 'speaking-recording', 'Gravação guiada', 'Gravar', recording, 'Grave ou escreva sua fala guiada.');
  pushSpeak(phases, 'speaking-free', 'Fala livre', 'Livre', free.length ? free : [{ prompt: 'Fale por 30 segundos sobre o tema da aula.' }], 'Fale por 30 segundos sobre o tema da aula.');
  phases.push({ id: 'speaking-checklist', title: 'Auto-checklist', shortTitle: 'Checklist', description: 'Confira sua fala.', requiresAttempt: true, blockedMessage: 'Marque os critérios antes de finalizar.', component: ChecklistBody, items: checklist.length ? checklist : ['Falei alto e claro.', 'Usei estruturas da aula.', 'Usei palavras novas.', 'Consegui completar a ideia.'] });
  return phases;
}

export function SpeakingLessonFlow({ lesson, onNavigate }) {
  return <LessonFlowShell lesson={lesson} phases={buildPhases(lesson)} onNavigate={onNavigate} />;
}
