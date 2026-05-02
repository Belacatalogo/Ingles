export const previewLessons = {
  listening: {
    id: 'temp-preview-listening-v1',
    type: 'listening',
    title: 'Listening — Preview temporário de escuta',
    level: 'A1',
    intro: 'Amostra temporária para testar a aba Listening antes do dia oficial dessa aula.',
    objective: 'Ouvir sem ler, conferir a transcrição, praticar shadowing e concluir a aula com progresso salvo.',
    listeningText: 'Good morning. My name is Ana, and I am learning English every day. First, I listen to a short sentence. Then, I repeat the sentence slowly. After that, I write one new word in my notebook. Today, the new word is breakfast. I have breakfast at seven o’clock. I drink coffee and read a small text in English. At night, I listen again and practice my pronunciation.',
    sections: [
      {
        title: 'Como usar esta escuta',
        content: 'Primeiro, toque no áudio e não abra a transcrição. O objetivo é treinar o ouvido antes de confirmar o texto.',
        examples: ['Listen first.', 'Then read.', 'Repeat out loud.'],
      },
      {
        title: 'Foco de compreensão',
        content: 'Preste atenção em rotina, horários e ações simples. O áudio usa frases curtas para facilitar a repetição.',
        examples: ['I listen to a short sentence.', 'I write one new word.'],
      },
    ],
    vocabulary: [
      { word: 'breakfast', meaning: 'café da manhã', example: 'I have breakfast at seven o’clock.' },
      { word: 'notebook', meaning: 'caderno', example: 'I write one new word in my notebook.' },
      { word: 'slowly', meaning: 'devagar', example: 'I repeat the sentence slowly.' },
    ],
    exercises: [
      { question: 'What is Ana learning every day?', answer: 'English.' },
      { question: 'What new word does Ana write today?', answer: 'Breakfast.' },
      { question: 'When does Ana have breakfast?', answer: 'At seven o’clock.' },
    ],
    prompts: ['Repeat: I am learning English every day.', 'Say: I have breakfast at seven o’clock.', 'Say one sentence about your morning.'],
    generationMeta: {
      id: 'temp-preview-listening-v1',
      contractVersion: 'temporary-preview-lab',
      pedagogicalScore: 100,
      generatedAt: new Date().toISOString(),
    },
  },
  reading: {
    id: 'temp-preview-reading-v1',
    type: 'reading',
    title: 'Reading — Preview temporário de leitura',
    level: 'A1',
    intro: 'Amostra temporária para testar a aba Reading antes do dia oficial dessa aula.',
    objective: 'Ler um texto curto, entender a ideia principal, revisar vocabulário e concluir a aula.',
    readingText: 'Ana has a simple morning routine. She wakes up at seven o’clock and drinks water. Then, she opens her English notebook and reads three short sentences. She writes one new word and says it out loud. Ana studies for ten minutes every morning because she wants to speak English with confidence.',
    text: 'Ana has a simple morning routine. She wakes up at seven o’clock and drinks water. Then, she opens her English notebook and reads three short sentences. She writes one new word and says it out loud. Ana studies for ten minutes every morning because she wants to speak English with confidence.',
    sections: [
      {
        title: 'Antes de ler',
        content: 'Observe o título e tente prever o assunto. A leitura fala sobre rotina, estudo e confiança.',
        examples: ['morning routine', 'English notebook', 'speak with confidence'],
      },
      {
        title: 'Depois de ler',
        content: 'Responda com frases curtas. Volte ao texto para encontrar evidências antes de concluir.',
        examples: ['She wakes up at seven o’clock.', 'She studies for ten minutes.'],
      },
    ],
    vocabulary: [
      { word: 'routine', meaning: 'rotina', example: 'Ana has a simple morning routine.' },
      { word: 'confidence', meaning: 'confiança', example: 'She wants to speak with confidence.' },
      { word: 'sentence', meaning: 'frase', example: 'She reads three short sentences.' },
    ],
    exercises: [
      { question: 'What time does Ana wake up?', answer: 'At seven o’clock.' },
      { question: 'How many sentences does Ana read?', answer: 'Three short sentences.' },
      { question: 'Why does Ana study every morning?', answer: 'Because she wants to speak English with confidence.' },
    ],
    prompts: ['Read the text once silently.', 'Underline one new word.', 'Write one sentence about your morning.'],
    generationMeta: {
      id: 'temp-preview-reading-v1',
      contractVersion: 'temporary-preview-lab',
      pedagogicalScore: 100,
      generatedAt: new Date().toISOString(),
    },
  },
};

export function getPreviewLesson(type) {
  return previewLessons[type] || null;
}
