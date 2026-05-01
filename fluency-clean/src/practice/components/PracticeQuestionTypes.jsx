import { Mic, Volume2 } from 'lucide-react';

export function ChoiceGrid({ item, value, feedback, normalize, onSelect }) {
  return (
    <div className="practice-choice-grid">
      {item.options.map((option, index) => {
        const selected = normalize(value) === normalize(option);
        const right = feedback && normalize(option) === normalize(item.answer);
        const wrong = feedback && selected && !right;
        return (
          <button type="button" key={option} onClick={() => onSelect(option)} disabled={Boolean(feedback)} className={right ? 'right' : wrong ? 'wrong' : selected ? 'selected' : ''}>
            <span>{String.fromCharCode(65 + index)}</span>
            <b>{option}</b>
          </button>
        );
      })}
    </div>
  );
}

export function WordBank({ item, selectedWords, feedback, onChange }) {
  const selectedKeys = selectedWords.map((word, index) => `${word}-${index}`);
  function add(word) {
    if (feedback) return;
    onChange([...selectedWords, word]);
  }
  function remove(index) {
    if (feedback) return;
    onChange(selectedWords.filter((_, itemIndex) => itemIndex !== index));
  }
  return (
    <div className="practice-wordbank">
      <div className="practice-answer-line">
        {selectedWords.length ? selectedWords.map((word, index) => <button key={`${word}-${index}`} type="button" onClick={() => remove(index)}>{word}</button>) : <span>Toque nas palavras para montar a frase</span>}
      </div>
      <div className="practice-word-options">
        {item.words.map((word, index) => {
          const used = selectedKeys.includes(`${word}-${index}`) || selectedWords.filter((itemWord) => itemWord === word).length >= item.words.filter((itemWord) => itemWord === word).slice(0, index + 1).length;
          return <button type="button" key={`${word}-${index}`} onClick={() => add(word)} disabled={Boolean(feedback) || used} className={used ? 'used' : ''}>{word}</button>;
        })}
      </div>
    </div>
  );
}

export function AudioPrompt({ listening, onPlay }) {
  return (
    <button type="button" className="practice-audio-big" onClick={onPlay} disabled={listening}>
      <Volume2 size={48} />
      <span>{listening ? 'Tocando...' : 'Ouvir'}</span>
    </button>
  );
}

export function TextAnswer({ value, feedback, onChange }) {
  return (
    <textarea className="practice-textarea" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Digite sua resposta..." disabled={Boolean(feedback && !feedback.retryable)} />
  );
}

export function SpeakAnswer({ value, feedback, onSpeak, onChange }) {
  return (
    <div className="practice-speak-box">
      <button type="button" onClick={onSpeak} disabled={Boolean(feedback && !feedback.retryable)}><Mic size={28} /> Falar agora</button>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Ou digite o que falou..." disabled={Boolean(feedback && !feedback.retryable)} />
    </div>
  );
}

export function PracticeQuestionBody({ current, value, wordBankValue, feedback, listening, normalize, onSelectOption, onWordBankChange, onTextChange, onSpeak, onPlayAudio }) {
  if (!current) return null;
  return (
    <>
      {(current.type === 'listenChoice' || current.type === 'dictation') ? <AudioPrompt listening={listening} onPlay={() => onPlayAudio(current.audioText || current.answer)} /> : null}
      {(current.type === 'choice' || current.type === 'listenChoice' || current.type === 'fillBlank') ? <ChoiceGrid item={current} value={value} feedback={feedback} normalize={normalize} onSelect={onSelectOption} /> : null}
      {current.type === 'dictation' || current.type === 'correction' ? <TextAnswer value={value} feedback={feedback} onChange={onTextChange} /> : null}
      {current.type === 'wordBank' ? <WordBank item={current} selectedWords={wordBankValue} feedback={feedback} onChange={onWordBankChange} /> : null}
      {current.type === 'speak' ? <SpeakAnswer value={value} feedback={feedback} onSpeak={onSpeak} onChange={onTextChange} /> : null}
    </>
  );
}
