import { useMemo, useState } from 'react';
import { CheckCircle2, Lightbulb, MessageSquareText, PencilLine, Sparkles, Target } from 'lucide-react';
import { normalizeWritingLessonContract } from '../writing/writingJsonContract.js';
import { completeLesson, getLessonDraft, saveLessonDraft } from '../services/progressStore.js';

const fallbackPrompts = [
  'Write one sentence about your morning.',
  'Write one sentence about something you usually study.',
  'Write one sentence about your goal for tomorrow.',
];

function cleanText(value) {
  return String(value ?? '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function normalizePrompts(lesson) {
  const productionInstruction = cleanText(lesson?.productionPrompt?.instruction || '');
  const prompts = Array.isArray(lesson?.prompts) ? lesson.prompts : [];
  const cleanPrompts = prompts.map((prompt) => cleanText(typeof prompt === 'string' ? prompt : prompt?.text || prompt?.prompt || '')).filter(Boolean);
  if (productionInstruction) return [productionInstruction, ...cleanPrompts].filter(Boolean);
  return cleanPrompts.length ? cleanPrompts : fallbackPrompts;
}

function normalizeSections(lesson) {
  const sections = Array.isArray(lesson?.sections) ? lesson.sections : [];
  return sections.map((section, index) => ({
    title: cleanText(section?.title || section?.heading || `Parte ${index + 1}`),
    content: cleanText(section?.content || section?.text || section?.body || ''),
    examples: Array.isArray(section?.examples) ? section.examples.map(cleanText).filter(Boolean) : [],
  })).filter((section) => section.title || section.content || section.examples.length);
}

function normalizeStructuredTasks(lesson) {
  return (Array.isArray(lesson?.structuredTasks) ? lesson.structuredTasks : [])
    .map((task, index) => ({
      type: cleanText(task?.type || 'guided_sentence'),
      prompt: cleanText(task?.prompt || task?.question || task?.instruction || ''),
      answer: cleanText(task?.answer || task?.expected || ''),
      options: Array.isArray(task?.options) ? task.options.map(cleanText).filter(Boolean) : [],
      writingTag: cleanText(task?.writingTag || task?.tag || ''),
      index,
    }))
    .filter((task) => task.prompt && task.answer);
}

function normalizeVocabulary(lesson) {
  return (Array.isArray(lesson?.vocabulary) ? lesson.vocabulary : [])
    .map((item) => ({
      word: cleanText(item?.word || item?.term || ''),
      meaning: cleanText(item?.meaning || item?.translation || item?.definition || ''),
      example: cleanText(item?.example || item?.sentence || ''),
    }))
    .filter((item) => item.word || item.meaning || item.example);
}

export function WritingLesson({ lesson: rawLesson }) {
  const lesson = useMemo(() => normalizeWritingLessonContract(rawLesson), [rawLesson]);
  const [answer, setAnswer] = useState(() => getLessonDraft(lesson?.id || lesson?.title || 'writing'));
  const [message, setMessage] = useState('Escreva com frases simples. Clareza é mais importante que complexidade.');
  const prompts = useMemo(() => normalizePrompts(lesson), [lesson]);
  const sections = useMemo(() => normalizeSections(lesson), [lesson]);
  const structuredTasks = useMemo(() => normalizeStructuredTasks(lesson), [lesson]);
  const vocabulary = useMemo(() => normalizeVocabulary(lesson), [lesson]);
  const usefulPhrases = useMemo(() => (Array.isArray(lesson?.usefulPhrases) ? lesson.usefulPhrases.map(cleanText).filter(Boolean) : []), [lesson]);
  const checklist = useMemo(() => (Array.isArray(lesson?.writingChecklist) ? lesson.writingChecklist.map(cleanText).filter(Boolean) : []), [lesson]);
  const writingModel = cleanText(lesson?.writingModel || '');

  function handleSave() {
    saveLessonDraft({ lesson, answer });
    setMessage('Rascunho salvo.');
  }

  function handleComplete() {
    const result = completeLesson({ lesson, writtenAnswer: answer });
    setMessage(result.alreadyCompleted ? 'Aula já estava concluída. Progresso mantido.' : '+25 XP. Writing concluída e progresso salvo.');
  }

  return (
    <article className="pillar-lesson writing-lesson-v1">
      <section className="pillar-card writing-brief-card">
        <div className="pillar-card-title"><PencilLine size={17} /> Escrita guiada</div>
        <h2>{lesson?.title || 'Writing — My simple routine'}</h2>
        <p>{cleanText(lesson?.intro || 'Construa frases curtas e corretas antes de tentar escrever textos longos.')}</p>
        <div className="writing-goal-row">
          <span><Target size={14} /> {prompts.length} etapas</span>
          <span><Sparkles size={14} /> {lesson?.level || 'A1'} claro</span>
        </div>
      </section>

      {sections.length ? (
        <section className="pillar-card">
          <div className="pillar-card-title"><Lightbulb size={17} /> Guia da escrita</div>
          <div className="grammar-section-list">
            {sections.map((section, index) => (
              <article className="grammar-rule-card" key={`${section.title}-${index}`}>
                <span>Parte {index + 1}</span>
                <strong>{section.title}</strong>
                <p>{section.content}</p>
                {section.examples.length ? (
                  <ul>
                    {section.examples.map((example) => <li key={example}>{example}</li>)}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {writingModel ? (
        <section className="pillar-card">
          <div className="pillar-card-title"><MessageSquareText size={17} /> Modelo para seguir</div>
          <p>{writingModel}</p>
        </section>
      ) : null}

      {usefulPhrases.length ? (
        <section className="pillar-card">
          <div className="pillar-card-title"><Sparkles size={17} /> Frases úteis</div>
          <div className="writing-prompt-list">
            {usefulPhrases.map((phrase, index) => (
              <div key={`${phrase}-${index}`}><b>{index + 1}</b><span>{phrase}</span></div>
            ))}
          </div>
        </section>
      ) : null}

      {vocabulary.length ? (
        <section className="pillar-card">
          <div className="pillar-card-title"><Lightbulb size={17} /> Vocabulário útil</div>
          <div className="lesson-vocabulary-grid compact">
            {vocabulary.map((item, index) => (
              <article className="lesson-vocab-card" key={`${item.word}-${index}`}>
                <strong>{item.word || item.meaning}</strong>
                {item.meaning ? <span>{item.meaning}</span> : null}
                {item.example ? <p>{item.example}</p> : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {structuredTasks.length ? (
        <section className="pillar-card">
          <div className="pillar-card-title"><PencilLine size={17} /> Exercícios de escrita</div>
          <div className="writing-prompt-list">
            {structuredTasks.map((task, index) => (
              <div key={`${task.prompt}-${index}`}>
                <b>{index + 1}</b>
                <span>{task.prompt}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="pillar-card">
        <div className="pillar-card-title"><Lightbulb size={17} /> Roteiro</div>
        <div className="writing-prompt-list">
          {prompts.map((prompt, index) => (
            <div key={`${prompt}-${index}`}><b>{index + 1}</b><span>{prompt}</span></div>
          ))}
        </div>
      </section>

      {checklist.length ? (
        <section className="pillar-card">
          <div className="pillar-card-title"><CheckCircle2 size={17} /> Checklist antes de enviar</div>
          <div className="writing-prompt-list">
            {checklist.map((item, index) => (
              <div key={`${item}-${index}`}><b>✓</b><span>{item}</span></div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="pillar-card writing-editor-card">
        <div className="pillar-card-title"><MessageSquareText size={17} /> Sua resposta</div>
        <textarea
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Example: I usually study English in the morning..."
          autoCapitalize="sentences"
          autoCorrect="on"
          spellCheck="true"
        />
        <p>{message}</p>
        <div className="writing-actions">
          <button type="button" onClick={handleSave}><PencilLine size={16} /> Salvar</button>
          <button type="button" onClick={handleComplete}><CheckCircle2 size={16} /> Concluir Writing</button>
        </div>
      </section>
    </article>
  );
}
