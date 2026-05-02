function clean(value) {
  return String(value ?? '').trim().toLowerCase();
}

const visualRules = [
  { id: 'people', icon: '👥', label: 'pessoas', words: ['i', 'you', 'he', 'she', 'we', 'they', 'family', 'mother', 'father', 'friend', 'people', 'person', 'man', 'woman', 'boy', 'girl', 'child', 'children'] },
  { id: 'study', icon: '📚', label: 'estudo', words: ['school', 'study', 'learn', 'book', 'teacher', 'student', 'class', 'lesson', 'read', 'write', 'english', 'question', 'answer'] },
  { id: 'food', icon: '🍽️', label: 'comida', words: ['food', 'water', 'coffee', 'tea', 'milk', 'juice', 'bread', 'rice', 'beans', 'meat', 'chicken', 'fish', 'egg', 'cheese', 'apple', 'banana', 'orange', 'salad'] },
  { id: 'home', icon: '🏠', label: 'casa', words: ['home', 'house', 'room', 'bed', 'chair', 'table', 'door', 'window', 'kitchen', 'bathroom', 'phone', 'computer', 'key', 'clothes'] },
  { id: 'city', icon: '🏙️', label: 'cidade', words: ['city', 'street', 'store', 'market', 'bank', 'restaurant', 'cafe', 'park', 'hospital', 'church', 'station', 'bus', 'car', 'bike', 'road'] },
  { id: 'travel', icon: '🧭', label: 'viagem', words: ['travel', 'trip', 'airport', 'ticket', 'passport', 'hotel', 'reservation', 'map', 'address', 'train', 'plane', 'taxi', 'arrive', 'leave'] },
  { id: 'work', icon: '💼', label: 'trabalho', words: ['work', 'job', 'office', 'company', 'boss', 'meeting', 'email', 'message', 'task', 'project', 'plan', 'goal', 'career', 'business'] },
  { id: 'health', icon: '💙', label: 'saúde', words: ['feel', 'fine', 'sick', 'healthy', 'pain', 'head', 'hand', 'foot', 'eye', 'mouth', 'heart', 'body', 'doctor', 'medicine', 'rest', 'exercise'] },
  { id: 'time', icon: '⏱️', label: 'tempo', words: ['today', 'tomorrow', 'morning', 'afternoon', 'evening', 'night', 'day', 'week', 'month', 'year', 'hour', 'minute', 'time', 'now', 'soon'] },
  { id: 'action', icon: '⚡', label: 'ação', words: ['be', 'have', 'do', 'go', 'come', 'make', 'say', 'get', 'know', 'think', 'want', 'need', 'like', 'see', 'look', 'use', 'start', 'stop', 'open', 'close', 'help', 'call', 'try', 'ask', 'buy', 'sell', 'pay', 'give', 'take', 'bring', 'find', 'keep', 'move', 'play', 'watch', 'wait', 'walk', 'run'] },
  { id: 'quality', icon: '✨', label: 'qualidade', words: ['good', 'bad', 'big', 'small', 'new', 'old', 'young', 'happy', 'sad', 'tired', 'easy', 'hard', 'fast', 'slow', 'hot', 'cold', 'clean', 'dirty', 'beautiful', 'important', 'different', 'same', 'ready', 'busy'] },
];

export function getVocabularyVisualReference(card = {}) {
  const word = clean(card.word);
  const text = `${word} ${clean(card.translation)} ${clean(card.definition)} ${clean(card.deck)}`;
  const exact = visualRules.find((rule) => rule.words.includes(word));
  if (exact) return { id: exact.id, icon: exact.icon, label: exact.label };
  const loose = visualRules.find((rule) => rule.words.some((item) => text.includes(item)));
  if (loose) return { id: loose.id, icon: loose.icon, label: loose.label };
  return { id: 'word', icon: '🔤', label: 'palavra' };
}
