import { diagnostics } from './diagnostics.js';
import { generatePlannedLessonDraft as generateBasePlannedLessonDraft } from './plannedGeminiLessons.js';
import { repairReadingExercisesWithDeepSeek } from './deepSeekReadingRepair.js';
import { repairGrammarWithDeepSeek } from './deepSeekGrammarRepair.js';
import { getDeepSeekReadingRepairStatus } from './deepSeekReadingRepair.js';
import { inferLessonTypeFromText, normalizeLessonType } from './lessonTypes.js';

function clean(value) { return String(value ?? '').trim(); }

function resolveLessonType(options = {}) {
  const forced = normalizeLessonType(options.forcedType || '');
  if (forced && forced !== 'default') return forced;
  return inferLessonTypeFromText(options.prompt || '');
}

function buildLocalGrammarSeedLesson(options = {}) {
  const level = options.level || 'A1';
  const prompt = clean(options.prompt || 'Verbo to be');
  const focus = /to have/i.test(prompt) ? 'verbo to have' : /present simple/i.test(prompt) ? 'present simple' : /to be/i.test(prompt) ? 'verbo to be' : prompt.slice(0, 80) || 'gramática essencial';
  return {
    type: 'grammar',
    level,
    title: `Grammar ${level}: ${focus}`,
    intro: `Nesta aula, você vai estudar ${focus} com explicação em português, exemplos simples em inglês e prática guiada para usar a regra sem adivinhar.`,
    objective: `Entender quando usar ${focus}, formar frases afirmativas, negativas e perguntas, reconhecer erros comuns e produzir frases próprias em inglês simples com segurança.`,
    focus,
    sections: [
      { title: 'Visão geral', content: `Vamos entender para que serve ${focus} e por que essa estrutura aparece tanto no inglês básico.` },
      { title: 'Quando usar', content: `Use ${focus} em situações reais de apresentação, rotina, descrição, posse ou informação básica, dependendo do tema da aula.` },
      { title: 'Forma afirmativa', content: 'Veja como montar frases afirmativas simples, palavra por palavra, sem misturar português com inglês.' },
      { title: 'Forma negativa', content: 'Agora vamos negar frases com calma e observar onde a palavra negativa entra.' },
      { title: 'Perguntas', content: 'Vamos transformar frases em perguntas simples e treinar respostas curtas naturais.' },
      { title: 'Erros comuns', content: 'Vamos comparar erros típicos de brasileiros com a forma correta e entender o motivo.' },
      { title: 'Produção guiada', content: 'Você vai criar frases próprias com apoio, primeiro copiando o modelo e depois adaptando.' },
    ],
    tips: ['Leia a regra em português primeiro.', 'Observe o padrão da frase.', 'Compare certo e errado.', 'Repita os exemplos em voz alta.', 'Crie frases sobre você.', 'Revise antes de avançar.'],
    listeningText: '',
    vocabulary: [
      { word: 'I', meaning: 'eu', example: 'I am a student.' },
      { word: 'you', meaning: 'você', example: 'You are my friend.' },
      { word: 'he', meaning: 'ele', example: 'He is at school.' },
      { word: 'she', meaning: 'ela', example: 'She is happy.' },
      { word: 'not', meaning: 'não', example: 'I am not tired.' },
      { word: 'question', meaning: 'pergunta', example: 'This is a question.' },
      { word: 'answer', meaning: 'resposta', example: 'This is my answer.' },
      { word: 'sentence', meaning: 'frase', example: 'Write one sentence.' },
      { word: 'correct', meaning: 'correto', example: 'This sentence is correct.' },
      { word: 'mistake', meaning: 'erro', example: 'This is a common mistake.' },
    ],
    exercises: [
      { question: 'Qual frase está correta?', options: ['I am a student.', 'I is a student.', 'I are a student.'], answer: 'I am a student.', explanation: 'Com I, usamos am.' },
      { question: 'Qual frase está negativa?', options: ['I am not tired.', 'I am tired.', 'Am I tired?'], answer: 'I am not tired.', explanation: 'A palavra not cria a negativa.' },
      { question: 'Qual frase é uma pergunta?', options: ['Are you a student?', 'You are a student.', 'You not student.'], answer: 'Are you a student?', explanation: 'Em pergunta com to be, o verbo vem antes do sujeito.' },
      { question: 'Escolha a melhor tradução de Eu sou aluno.', options: ['I am a student.', 'I are a student.', 'I is student.'], answer: 'I am a student.', explanation: 'Eu em inglês é I, e com I usamos am.' },
      { question: 'Complete: She ___ happy.', options: ['is', 'am', 'are'], answer: 'is', explanation: 'Com she, usamos is.' },
      { question: 'Complete: They ___ friends.', options: ['are', 'is', 'am'], answer: 'are', explanation: 'Com they, usamos are.' },
      { question: 'Qual alternativa corrige I is happy?', options: ['I am happy.', 'I are happy.', 'I happy is.'], answer: 'I am happy.', explanation: 'Com I, a forma correta é am.' },
      { question: 'Transforme em negativa: You are ready.', options: ['You are not ready.', 'You not are ready.', 'You are ready not.'], answer: 'You are not ready.', explanation: 'A negativa entra depois do verbo to be.' },
      { question: 'Qual resposta curta combina com Are you OK?', options: ['Yes, I am.', 'Yes, I is.', 'Yes, I are.'], answer: 'Yes, I am.', explanation: 'A resposta curta mantém o verbo correto com I.' },
      { question: 'Qual frase usa he corretamente?', options: ['He is my teacher.', 'He are my teacher.', 'He am my teacher.'], answer: 'He is my teacher.', explanation: 'Com he, usamos is.' },
      { question: 'Qual frase está incorreta?', options: ['She are happy.', 'She is happy.', 'They are happy.'], answer: 'She are happy.', explanation: 'Com she, não usamos are.' },
      { question: 'Qual pergunta está correta?', options: ['Is she your friend?', 'She is your friend?', 'Your friend is she?'], answer: 'Is she your friend?', explanation: 'Em pergunta, is vem antes de she.' },
    ],
    prompts: ['Escreva três frases afirmativas sobre você.', 'Escreva duas frases negativas.', 'Crie duas perguntas simples.', 'Responda suas perguntas com respostas curtas.', 'Corrija uma frase errada e explique em português.', 'Faça um mini diálogo com duas falas.'],
    generationSeed: `local-grammar-seed-${Date.now().toString(36)}`,
    planContract: 'local-grammar-seed-v1',
  };
}

async function repairReadingIfAvailable(result, options = {}) {
  if (result?.status !== 'success' || !result.lesson) return result;
  try {
    const repair = await repairReadingExercisesWithDeepSeek(result.lesson, { fetcher: options.fetcher });
    if (repair?.applied && repair.lesson) {
      diagnostics.log('Aula Reading recebeu reparo DeepSeek antes da validação final da tela.', 'success', repair.lesson.readingExerciseRepair);
      return { ...result, lesson: repair.lesson, deepSeekReadingRepair: true };
    }
    diagnostics.log(`DeepSeek Reading Repair não aplicado: ${repair?.reason || 'indisponível'}.`, 'info', repair);
  } catch (error) {
    diagnostics.log(`DeepSeek Reading Repair falhou e a aula original foi mantida: ${error?.message || error}`, 'warn');
  }
  return result;
}

async function repairGrammarOrBlock(result, options = {}) {
  if (result?.status !== 'success' || !result.lesson) return result;
  const deepSeekStatus = getDeepSeekReadingRepairStatus();
  if (!deepSeekStatus.configured) {
    const error = 'DeepSeek Grammar Repair obrigatório para Grammar profunda não está configurado. Configure a key DeepSeek antes de gerar Grammar.';
    diagnostics.setPhase('Grammar bloqueada sem DeepSeek', 'error');
    diagnostics.log(error, 'error');
    return { status: 'error', lesson: null, error };
  }

  try {
    const repair = await repairGrammarWithDeepSeek(result.lesson, { fetcher: options.fetcher });
    if (repair?.applied && repair.lesson) {
      diagnostics.log('Aula Grammar recebeu reparo DeepSeek profundo antes da validação final.', 'success', repair.lesson.grammarRepair);
      return { ...result, lesson: repair.lesson, deepSeekGrammarRepair: true };
    }

    const validation = repair?.validation;
    const detail = validation?.sectionWordCounts?.length ? ` ${validation.deepSections}/8 seções profundas (${validation.sectionWordCounts.join('/')}) e ${validation.exercises?.length || 0}/18 exercícios.` : '';
    const error = `Grammar bloqueada: DeepSeek não entregou profundidade mínima.${detail}`;
    diagnostics.setPhase('Grammar bloqueada por profundidade', 'error');
    diagnostics.log(error, 'error', repair);
    return { status: 'error', lesson: null, error };
  } catch (error) {
    const message = `Grammar bloqueada: DeepSeek Grammar Repair falhou antes de validar. ${error?.message || error}`;
    diagnostics.setPhase('Grammar bloqueada por falha no DeepSeek', 'error');
    diagnostics.log(message, 'error');
    return { status: 'error', lesson: null, error: message };
  }
}

async function repairWithDeepSeekIfAvailable(result, options = {}) {
  if (result?.status !== 'success' || !result.lesson) return result;
  const type = String(result.lesson.type || '').toLowerCase();
  if (type === 'reading') return repairReadingIfAvailable(result, options);
  if (type === 'grammar') return repairGrammarOrBlock(result, options);
  return result;
}

export async function generatePlannedLessonDraft(options = {}) {
  const lessonType = resolveLessonType(options);

  if (lessonType === 'grammar') {
    diagnostics.setPhase('Grammar seed seguro', 'generating');
    diagnostics.log('Grammar usa seed local seguro e só salva se o DeepSeek entregar profundidade mínima. Não há fallback frouxo para salvar aula curta.', 'warn');
    const seedResult = { status: 'success', lesson: buildLocalGrammarSeedLesson(options), error: null };
    return repairGrammarOrBlock(seedResult, options);
  }

  const result = await generateBasePlannedLessonDraft(options);
  return repairWithDeepSeekIfAvailable(result, options);
}
