export function WordBankExercise({ item, selectedWords, feedback, onChange }) {
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
        {selectedWords.length ? selectedWords.map((word, index) => (
          <button key={`${word}-${index}`} type="button" onClick={() => remove(index)}>{word}</button>
        )) : <span>Toque nas palavras para montar a frase</span>}
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
