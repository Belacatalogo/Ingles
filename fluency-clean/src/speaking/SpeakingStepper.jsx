import { CheckCircle2, Mic } from 'lucide-react';
import { getSpeakingFlow, SPEAKING_MODE_LABELS, SPEAKING_FLOW_VERSION } from './speakingFlow.js';

export function SpeakingStepper({ mode = 'conversation', activeStep = 0, completed = false, onJump }) {
  const flow = getSpeakingFlow(mode);
  const safeActiveStep = Math.max(0, Math.min(activeStep, flow.length - 1));

  return (
    <section className="speaking-stepper-card" aria-label="Etapas da prática de Speaking" data-speaking-flow={SPEAKING_FLOW_VERSION}>
      <div className="speaking-stepper-header">
        <span><Mic size={14} /> Speaking · {SPEAKING_MODE_LABELS[mode] || 'Conversa'}</span>
        <strong>{safeActiveStep + 1}/{flow.length}</strong>
      </div>
      <div className="speaking-stepper-flow">
        {flow.map((step, index) => {
          const done = completed || index < safeActiveStep;
          const active = index === safeActiveStep;
          return (
            <button
              type="button"
              key={step.id}
              className={done ? 'done' : active ? 'active' : ''}
              onClick={() => onJump?.(step, index)}
            >
              <span>{done ? <CheckCircle2 size={13} /> : index + 1}</span>
              <b>{step.label}</b>
            </button>
          );
        })}
      </div>
    </section>
  );
}
