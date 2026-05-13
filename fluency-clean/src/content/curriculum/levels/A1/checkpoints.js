import { createCheckpointLesson } from '../../../schemas/index.js';

const level = 'A1';
const status = 'ready';

function task({ id, title, type, instruction, targetPillar, expected = '', options = [], answer = '', evidenceRequired = false, minWords = 0, tags = [] }) {
  return { id, title, type, instruction, targetPillar, expected, options, answer, evidenceRequired, minWords, tags };
}

function checkpoint({ id, order, title, targetPillars, tasks, passingCriteria, remediation }) {
  return createCheckpointLesson({
    id,
    level,
    order,
    title,
    status,
    estimatedMinutes: targetPillars.length > 1 ? 60 : 40,
    prerequisites: [],
    objectives: [
      `Confirmar domínio real de ${title}.`,
      'Identificar lacunas antes de avançar.',
      'Gerar revisão obrigatória se o resultado ficar abaixo da meta.',
    ],
    checkpointType: targetPillars.length > 1 ? 'level-final' : 'pillar',
    targetPillars,
    tasks,
    passingCriteria,
    remediation,
    masteryCriteria: passingCriteria,
    tags: ['a1-checkpoint', ...targetPillars.map((pillar) => `checkpoint-${pillar}`)],
  });
}

export const A1_CHECKPOINT_LESSONS = Object.freeze([
  checkpoint({
    id: 'A1-CHECKPOINT-GRAMMAR',
    order: 1,
    title: 'Grammar A1 Checkpoint',
    targetPillars: ['grammar'],
    passingCriteria: { minScore: 75, minAccuracy: 75, requiredTasks: 10, blocksNextLevel: true },
    tasks: [
      task({ id: 'g1', targetPillar: 'grammar', type: 'choice', title: 'To be', instruction: 'Complete: I ___ from Brazil.', options: ['am', 'is', 'are'], answer: 'am', tags: ['to-be'] }),
      task({ id: 'g2', targetPillar: 'grammar', type: 'choice', title: 'To be', instruction: 'Complete: She ___ my sister.', options: ['is', 'are', 'am'], answer: 'is', tags: ['to-be'] }),
      task({ id: 'g3', targetPillar: 'grammar', type: 'choice', title: 'Present Simple', instruction: 'Complete: He ___ English every day.', options: ['studies', 'study', 'studying'], answer: 'studies', tags: ['present-simple'] }),
      task({ id: 'g4', targetPillar: 'grammar', type: 'choice', title: 'Questions', instruction: 'Escolha a pergunta correta.', options: ['Do you study English?', 'You do study English?', 'Study you English?'], answer: 'Do you study English?', tags: ['questions'] }),
      task({ id: 'g5', targetPillar: 'grammar', type: 'choice', title: 'There is / There are', instruction: 'Complete: There ___ two chairs in the room.', options: ['are', 'is', 'am'], answer: 'are', tags: ['there-are'] }),
      task({ id: 'g6', targetPillar: 'grammar', type: 'choice', title: 'Can', instruction: 'Escolha a frase correta.', options: ['I can speak slowly.', 'I can to speak slowly.', 'I can speaking slowly.'], answer: 'I can speak slowly.', tags: ['can'] }),
      task({ id: 'g7', targetPillar: 'grammar', type: 'correction', title: 'Correção', instruction: 'Corrija: She are happy.', answer: 'She is happy.', tags: ['to-be'] }),
      task({ id: 'g8', targetPillar: 'grammar', type: 'correction', title: 'Correção', instruction: 'Corrija: He study at night.', answer: 'He studies at night.', tags: ['present-simple'] }),
      task({ id: 'g9', targetPillar: 'grammar', type: 'write', title: 'Produção', instruction: 'Escreva 4 frases sobre você usando to be, have, present simple e can.', minWords: 18, tags: ['production'] }),
      task({ id: 'g10', targetPillar: 'grammar', type: 'write', title: 'Transformação', instruction: 'Escreva uma frase afirmativa, uma negativa e uma pergunta usando present simple.', minWords: 12, tags: ['production'] }),
    ],
    remediation: [
      { ifTag: 'to-be', reviewLessonIds: ['A1-GRAMMAR-002', 'A1-GRAMMAR-003', 'A1-GRAMMAR-004'], reason: 'Revisar verbo to be antes de avançar.' },
      { ifTag: 'present-simple', reviewLessonIds: ['A1-GRAMMAR-014', 'A1-GRAMMAR-015', 'A1-GRAMMAR-016', 'A1-GRAMMAR-017'], reason: 'Revisar present simple.' },
      { ifTag: 'production', reviewLessonIds: ['A1-GRAMMAR-013', 'A1-WRITING-012'], reason: 'Revisar ordem de frase e produção.' },
    ],
  }),
  checkpoint({
    id: 'A1-CHECKPOINT-VOCABULARY',
    order: 2,
    title: 'Vocabulary A1 Checkpoint',
    targetPillars: ['vocabulary'],
    passingCriteria: { minScore: 80, minAccuracy: 80, requiredTasks: 10, blocksNextLevel: true },
    tasks: [
      task({ id: 'v1', targetPillar: 'vocabulary', type: 'choice', title: 'Tema', instruction: 'Qual palavra é uma profissão?', options: ['teacher', 'blue', 'Monday'], answer: 'teacher', tags: ['jobs'] }),
      task({ id: 'v2', targetPillar: 'vocabulary', type: 'choice', title: 'Tema', instruction: 'Qual palavra é comida?', options: ['bread', 'window', 'Sunday'], answer: 'bread', tags: ['food'] }),
      task({ id: 'v3', targetPillar: 'vocabulary', type: 'choice', title: 'Tema', instruction: 'Qual palavra é lugar?', options: ['pharmacy', 'happy', 'shirt'], answer: 'pharmacy', tags: ['places'] }),
      task({ id: 'v4', targetPillar: 'vocabulary', type: 'choice', title: 'Tema', instruction: 'Qual palavra é sentimento?', options: ['tired', 'table', 'January'], answer: 'tired', tags: ['feelings'] }),
      task({ id: 'v5', targetPillar: 'vocabulary', type: 'choice', title: 'Tema', instruction: 'Qual palavra é rotina?', options: ['wake up', 'purple', 'driver'], answer: 'wake up', tags: ['routine'] }),
      task({ id: 'v6', targetPillar: 'vocabulary', type: 'choice', title: 'Tema', instruction: 'Qual palavra é roupa?', options: ['jacket', 'market', 'coffee'], answer: 'jacket', tags: ['clothes'] }),
      task({ id: 'v7', targetPillar: 'vocabulary', type: 'write', title: 'Produção', instruction: 'Escreva 10 palavras A1 que você lembra e separe por tema.', minWords: 10, tags: ['recall'] }),
      task({ id: 'v8', targetPillar: 'vocabulary', type: 'write', title: 'Frases', instruction: 'Crie 5 frases simples usando vocabulário de família, rotina, lugar, comida e sentimento.', minWords: 25, tags: ['usage'] }),
      task({ id: 'v9', targetPillar: 'vocabulary', type: 'write', title: 'Associação', instruction: 'Escreva 5 pares palavra + tradução.', minWords: 10, tags: ['translation'] }),
      task({ id: 'v10', targetPillar: 'vocabulary', type: 'write', title: 'Mini apresentação', instruction: 'Use pelo menos 6 palavras A1 para falar sobre sua vida.', minWords: 24, tags: ['production'] }),
    ],
    remediation: [
      { ifTag: 'jobs', reviewLessonIds: ['A1-VOCABULARY-006'], reason: 'Revisar profissões.' },
      { ifTag: 'routine', reviewLessonIds: ['A1-VOCABULARY-012'], reason: 'Revisar rotina.' },
      { ifTag: 'usage', reviewLessonIds: ['A1-VOCABULARY-020'], reason: 'Fazer revisão geral de vocabulário A1.' },
    ],
  }),
  checkpoint({
    id: 'A1-CHECKPOINT-READING',
    order: 3,
    title: 'Reading A1 Checkpoint',
    targetPillars: ['reading'],
    passingCriteria: { minScore: 75, minAccuracy: 75, requiredTasks: 8, evidenceRequired: true, blocksNextLevel: true },
    tasks: [
      task({ id: 'r1', targetPillar: 'reading', type: 'readingText', title: 'Texto', instruction: 'Read: Maria is a student from Brazil. She works in the morning and studies English at night. On Saturday, she visits her family and buys food at the market. She likes English because it helps her at work.', expected: 'checkpoint text' }),
      task({ id: 'r2', targetPillar: 'reading', type: 'choice', title: 'Ideia geral', instruction: 'Qual é a ideia geral do texto?', options: ['A rotina de Maria', 'Uma viagem longa', 'Uma receita'], answer: 'A rotina de Maria', evidenceRequired: true, tags: ['main-idea'] }),
      task({ id: 'r3', targetPillar: 'reading', type: 'choice', title: 'Detalhe', instruction: 'Quando Maria estuda inglês?', options: ['At night', 'In the morning', 'On Sunday'], answer: 'At night', evidenceRequired: true, tags: ['detail'] }),
      task({ id: 'r4', targetPillar: 'reading', type: 'choice', title: 'Detalhe', instruction: 'Onde Maria compra comida?', options: ['At the market', 'At school', 'At the bank'], answer: 'At the market', evidenceRequired: true, tags: ['detail'] }),
      task({ id: 'r5', targetPillar: 'reading', type: 'write', title: 'Evidência', instruction: 'Copie a frase que mostra por que Maria gosta de inglês.', answer: 'She likes English because it helps her at work.', evidenceRequired: true, tags: ['evidence'] }),
      task({ id: 'r6', targetPillar: 'reading', type: 'write', title: 'Resumo', instruction: 'Resuma o texto em português em 2 frases.', minWords: 12, tags: ['summary'] }),
      task({ id: 'r7', targetPillar: 'reading', type: 'write', title: 'Produção', instruction: 'Escreva 3 frases parecidas sobre sua rotina.', minWords: 15, tags: ['production'] }),
      task({ id: 'r8', targetPillar: 'reading', type: 'choice', title: 'Vocabulário', instruction: 'No texto, qual palavra indica lugar de compras?', options: ['market', 'student', 'night'], answer: 'market', tags: ['vocab-context'] }),
    ],
    remediation: [
      { ifTag: 'main-idea', reviewLessonIds: ['A1-READING-016'], reason: 'Revisar ideia geral.' },
      { ifTag: 'detail', reviewLessonIds: ['A1-READING-017'], reason: 'Revisar detalhes.' },
      { ifTag: 'evidence', reviewLessonIds: ['A1-READING-013', 'A1-READING-020'], reason: 'Revisar evidência textual.' },
    ],
  }),
  checkpoint({
    id: 'A1-CHECKPOINT-LISTENING',
    order: 4,
    title: 'Listening A1 Checkpoint',
    targetPillars: ['listening'],
    passingCriteria: { minScore: 70, minAccuracy: 70, requiredTasks: 8, transcriptBound: true, blocksNextLevel: true },
    tasks: [
      task({ id: 'l1', targetPillar: 'listening', type: 'audioScript', title: 'Script', instruction: 'Audio script: Hello. My name is João. I am from Brazil. I work in the morning and study English at night. My class starts at eight. On Sunday, I visit my family.', expected: 'audio checkpoint script' }),
      task({ id: 'l2', targetPillar: 'listening', type: 'choice', title: 'Nome', instruction: 'Qual é o nome da pessoa?', options: ['João', 'Ana', 'Ben'], answer: 'João', tags: ['names'] }),
      task({ id: 'l3', targetPillar: 'listening', type: 'choice', title: 'País', instruction: 'De onde ele é?', options: ['Brazil', 'Canada', 'England'], answer: 'Brazil', tags: ['places'] }),
      task({ id: 'l4', targetPillar: 'listening', type: 'choice', title: 'Rotina', instruction: 'Quando ele trabalha?', options: ['In the morning', 'At night', 'On Sunday'], answer: 'In the morning', tags: ['routine'] }),
      task({ id: 'l5', targetPillar: 'listening', type: 'choice', title: 'Horário', instruction: 'Quando a aula começa?', options: ['At eight', 'At six', 'At twelve'], answer: 'At eight', tags: ['time'] }),
      task({ id: 'l6', targetPillar: 'listening', type: 'dictation', title: 'Dictation', instruction: 'Digite a frase: I study English at night.', answer: 'I study English at night.', tags: ['dictation'] }),
      task({ id: 'l7', targetPillar: 'listening', type: 'speak', title: 'Shadowing', instruction: 'Repita: My class starts at eight.', answer: 'My class starts at eight.', tags: ['shadowing'] }),
      task({ id: 'l8', targetPillar: 'listening', type: 'write', title: 'Resumo', instruction: 'Escreva em português o que você entendeu do áudio.', minWords: 10, tags: ['summary'] }),
    ],
    remediation: [
      { ifTag: 'names', reviewLessonIds: ['A1-LISTENING-014'], reason: 'Revisar listening for names.' },
      { ifTag: 'time', reviewLessonIds: ['A1-LISTENING-008', 'A1-LISTENING-015'], reason: 'Revisar horários e números.' },
      { ifTag: 'dictation', reviewLessonIds: ['A1-LISTENING-017'], reason: 'Revisar dictation leve.' },
    ],
  }),
  checkpoint({
    id: 'A1-CHECKPOINT-SPEAKING',
    order: 5,
    title: 'Speaking A1 Checkpoint',
    targetPillars: ['speaking'],
    passingCriteria: { minScore: 65, requiredTasks: 6, recordingRequired: true, blocksNextLevel: true },
    tasks: [
      task({ id: 's1', targetPillar: 'speaking', type: 'speak', title: 'Apresentação', instruction: 'Fale: Hello. My name is ___. I am from ___.', answer: 'Hello. My name is Luis. I am from Brazil.', tags: ['introduction'] }),
      task({ id: 's2', targetPillar: 'speaking', type: 'speak', title: 'Família', instruction: 'Fale 3 frases sobre sua família.', minWords: 12, tags: ['family'] }),
      task({ id: 's3', targetPillar: 'speaking', type: 'speak', title: 'Rotina', instruction: 'Fale 4 frases sobre sua rotina.', minWords: 16, tags: ['routine'] }),
      task({ id: 's4', targetPillar: 'speaking', type: 'speak', title: 'Perguntas', instruction: 'Faça 3 perguntas simples em inglês.', minWords: 9, tags: ['questions'] }),
      task({ id: 's5', targetPillar: 'speaking', type: 'speak', title: 'Situação prática', instruction: 'Peça um café ou pergunte onde fica um lugar.', minWords: 8, tags: ['practical'] }),
      task({ id: 's6', targetPillar: 'speaking', type: 'write', title: 'Checklist', instruction: 'Marque em texto: falei devagar, usei frases curtas, consegui me apresentar.', minWords: 8, tags: ['self-check'] }),
    ],
    remediation: [
      { ifTag: 'introduction', reviewLessonIds: ['A1-SPEAKING-002', 'A1-SPEAKING-004'], reason: 'Revisar apresentação.' },
      { ifTag: 'routine', reviewLessonIds: ['A1-SPEAKING-011'], reason: 'Revisar rotina oral.' },
      { ifTag: 'questions', reviewLessonIds: ['A1-SPEAKING-009', 'A1-SPEAKING-010'], reason: 'Revisar perguntas e respostas.' },
    ],
  }),
  checkpoint({
    id: 'A1-CHECKPOINT-WRITING',
    order: 6,
    title: 'Writing A1 Checkpoint',
    targetPillars: ['writing'],
    passingCriteria: { minScore: 70, requiredTasks: 5, finalDraftRequired: true, blocksNextLevel: true },
    tasks: [
      task({ id: 'w1', targetPillar: 'writing', type: 'write', title: 'Frases simples', instruction: 'Escreva 5 frases simples sobre você.', minWords: 20, tags: ['sentences'] }),
      task({ id: 'w2', targetPillar: 'writing', type: 'write', title: 'Família', instruction: 'Escreva 4 frases sobre sua família.', minWords: 18, tags: ['family'] }),
      task({ id: 'w3', targetPillar: 'writing', type: 'write', title: 'Rotina', instruction: 'Escreva 5 frases sobre sua rotina.', minWords: 25, tags: ['routine'] }),
      task({ id: 'w4', targetPillar: 'writing', type: 'write', title: 'Perguntas', instruction: 'Escreva 3 perguntas e 3 respostas simples.', minWords: 24, tags: ['questions'] }),
      task({ id: 'w5', targetPillar: 'writing', type: 'write', title: 'Texto final', instruction: 'Escreva um texto A1 com 8 a 10 frases sobre você, sua rotina, família e inglês.', minWords: 50, tags: ['final-draft'] }),
    ],
    remediation: [
      { ifTag: 'sentences', reviewLessonIds: ['A1-WRITING-001', 'A1-GRAMMAR-013'], reason: 'Revisar frase simples e ordem.' },
      { ifTag: 'routine', reviewLessonIds: ['A1-WRITING-006', 'A1-GRAMMAR-014', 'A1-GRAMMAR-015'], reason: 'Revisar rotina e present simple.' },
      { ifTag: 'final-draft', reviewLessonIds: ['A1-WRITING-015', 'A1-WRITING-016'], reason: 'Revisar produção final.' },
    ],
  }),
  checkpoint({
    id: 'A1-CHECKPOINT-FINAL',
    order: 7,
    title: 'Final A1 Checkpoint',
    targetPillars: ['grammar', 'vocabulary', 'reading', 'listening', 'speaking', 'writing'],
    passingCriteria: { minScore: 75, requiredTasks: 12, allPillarsRequired: true, blocksNextLevel: true },
    tasks: [
      task({ id: 'f1', targetPillar: 'grammar', type: 'choice', title: 'Grammar', instruction: 'Complete: She ___ English at night.', options: ['studies', 'study', 'studying'], answer: 'studies', tags: ['grammar'] }),
      task({ id: 'f2', targetPillar: 'grammar', type: 'choice', title: 'Grammar', instruction: 'Escolha a pergunta correta.', options: ['Can you help me?', 'You can to help me?', 'Can help you me?'], answer: 'Can you help me?', tags: ['grammar'] }),
      task({ id: 'f3', targetPillar: 'vocabulary', type: 'choice', title: 'Vocabulary', instruction: 'Qual palavra é lugar?', options: ['market', 'tired', 'jacket'], answer: 'market', tags: ['vocabulary'] }),
      task({ id: 'f4', targetPillar: 'vocabulary', type: 'write', title: 'Vocabulary', instruction: 'Escreva 8 palavras A1 de temas diferentes.', minWords: 8, tags: ['vocabulary'] }),
      task({ id: 'f5', targetPillar: 'reading', type: 'readingText', title: 'Reading text', instruction: 'Read: Ana works in the morning, studies English at night and visits her family on Sunday. She likes English because it helps her at work.', expected: 'final reading text' }),
      task({ id: 'f6', targetPillar: 'reading', type: 'choice', title: 'Reading', instruction: 'Quando Ana estuda inglês?', options: ['At night', 'In the morning', 'On Sunday'], answer: 'At night', evidenceRequired: true, tags: ['reading'] }),
      task({ id: 'f7', targetPillar: 'listening', type: 'dictation', title: 'Listening', instruction: 'Digite: I can speak slowly.', answer: 'I can speak slowly.', tags: ['listening'] }),
      task({ id: 'f8', targetPillar: 'listening', type: 'choice', title: 'Listening', instruction: 'A frase “I can speak slowly” fala de habilidade?', options: ['Sim', 'Não'], answer: 'Sim', tags: ['listening'] }),
      task({ id: 'f9', targetPillar: 'speaking', type: 'speak', title: 'Speaking', instruction: 'Fale uma apresentação de 30 segundos sobre você.', minWords: 25, tags: ['speaking'] }),
      task({ id: 'f10', targetPillar: 'speaking', type: 'speak', title: 'Speaking', instruction: 'Faça 3 perguntas simples e responda uma delas.', minWords: 16, tags: ['speaking'] }),
      task({ id: 'f11', targetPillar: 'writing', type: 'write', title: 'Writing', instruction: 'Escreva um parágrafo A1 sobre você, rotina e família.', minWords: 50, tags: ['writing'] }),
      task({ id: 'f12', targetPillar: 'writing', type: 'write', title: 'Self review', instruction: 'Revise seu texto: maiúscula, ponto final, ordem das palavras, am/is/are e present simple.', minWords: 18, tags: ['writing'] }),
    ],
    remediation: [
      { ifTag: 'grammar', reviewLessonIds: ['A1-CHECKPOINT-GRAMMAR'], reason: 'Refazer checkpoint de Grammar.' },
      { ifTag: 'vocabulary', reviewLessonIds: ['A1-CHECKPOINT-VOCABULARY'], reason: 'Refazer checkpoint de Vocabulary.' },
      { ifTag: 'reading', reviewLessonIds: ['A1-CHECKPOINT-READING'], reason: 'Refazer checkpoint de Reading.' },
      { ifTag: 'listening', reviewLessonIds: ['A1-CHECKPOINT-LISTENING'], reason: 'Refazer checkpoint de Listening.' },
      { ifTag: 'speaking', reviewLessonIds: ['A1-CHECKPOINT-SPEAKING'], reason: 'Refazer checkpoint de Speaking.' },
      { ifTag: 'writing', reviewLessonIds: ['A1-CHECKPOINT-WRITING'], reason: 'Refazer checkpoint de Writing.' },
    ],
  }),
]);

export const A1_CHECKPOINTS_BY_ID = Object.freeze(Object.fromEntries(A1_CHECKPOINT_LESSONS.map((lesson) => [lesson.id, lesson])));
export function getA1CheckpointLessons() { return A1_CHECKPOINT_LESSONS; }
export function findA1CheckpointLesson(id) { return A1_CHECKPOINTS_BY_ID[id] || null; }
