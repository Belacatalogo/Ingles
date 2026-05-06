import { diagnostics } from './diagnostics.js';
import { generatePlannedLessonDraft as generateBasePlannedLessonDraft } from './plannedGeminiLessons.js';
import { generateResilientLessonDraft } from './resilientGeminiLessonDraft.js';
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

function buildLocalWritingSeedLesson(options = {}) {
  const level = options.level || 'A1';
  const prompt = clean(options.prompt || 'apresentação pessoal simples');
  const focus = /email/i.test(prompt) ? 'e-mail simples' : /apresent/i.test(prompt) ? 'apresentação pessoal' : prompt.slice(0, 80) || 'escrita guiada';
  return {
    type: 'writing',
    level,
    title: `Writing ${level}: ${focus}`,
    intro: `Nesta aula, você vai aprender a escrever uma ${focus} em inglês simples, usando modelo, frases prontas, substituições seguras e revisão guiada.`,
    objective: `Construir um pequeno texto em inglês sobre ${focus}, primeiro copiando modelos A1, depois trocando informações e por fim escrevendo sua própria versão com segurança.`,
    focus,
    sections: [
      { title: 'Modelo do professor', content: 'Leia este modelo antes de escrever: Hello. My name is Ana. I am a student. I am from Brazil. I like English. Nice to meet you. O objetivo é observar a ordem das frases e copiar a estrutura sem tentar traduzir palavra por palavra.' },
      { title: 'Frases úteis', content: 'Use blocos simples para montar seu texto: My name is..., I am..., I am from..., I like..., Nice to meet you. Cada frase tem uma função: apresentar nome, falar quem você é, dizer origem, dizer algo que gosta e fechar com educação.' },
      { title: 'Substituição guiada', content: 'Agora troque apenas uma parte por vez. My name is Ana pode virar My name is Luis. I am a student pode virar I am a worker. I am from Brazil pode continuar igual. Trocar pouco evita erro e ajuda o cérebro a entender o padrão.' },
      { title: 'Erros comuns', content: 'Evite escrever I have 20 years para idade em inglês básico; use I am 20 years old quando a aula pedir idade. Evite My name Ana; use My name is Ana. Evite I from Brazil; use I am from Brazil.' },
      { title: 'Revisão antes de entregar', content: 'Confira cinco pontos: começa com letra maiúscula, cada frase termina com ponto, tem o verbo is/am, as frases estão curtas, e o texto fala de você. Se uma frase ficou longa demais, divida em duas.' },
      { title: 'Produção final', content: 'Escreva quatro a seis frases. Primeiro use o modelo. Depois adapte para sua vida real. O foco não é escrever muito; é escrever certo, claro e com confiança.' },
    ],
    tips: ['Copie o modelo primeiro.', 'Troque uma informação por vez.', 'Use frases curtas.', 'Revise ponto final e letra maiúscula.', 'Não traduza palavra por palavra.', 'Prefira escrever pouco e correto.'],
    listeningText: '',
    vocabulary: [
      { word: 'Hello', meaning: 'Olá', example: 'Hello. My name is Ana.' },
      { word: 'My name is', meaning: 'Meu nome é', example: 'My name is Luis.' },
      { word: 'I am', meaning: 'Eu sou/estou', example: 'I am a student.' },
      { word: 'from', meaning: 'de/origem', example: 'I am from Brazil.' },
      { word: 'like', meaning: 'gostar de', example: 'I like English.' },
      { word: 'student', meaning: 'estudante', example: 'I am a student.' },
      { word: 'worker', meaning: 'trabalhador(a)', example: 'I am a worker.' },
      { word: 'Brazil', meaning: 'Brasil', example: 'I am from Brazil.' },
      { word: 'Nice to meet you', meaning: 'Prazer em conhecer você', example: 'Nice to meet you.' },
      { word: 'sentence', meaning: 'frase', example: 'Write one sentence.' },
    ],
    exercises: [
      { question: 'Qual frase está correta para dizer seu nome?', options: ['My name is Ana.', 'My name Ana.', 'Name is my Ana.'], answer: 'My name is Ana.', explanation: 'Em inglês usamos My name is + nome.' },
      { question: 'Complete: I ___ from Brazil.', options: ['am', 'is', 'are'], answer: 'am', explanation: 'Com I, usamos am.' },
      { question: 'Qual frase significa “Eu gosto de inglês”?', options: ['I like English.', 'I am English.', 'I from English.'], answer: 'I like English.', explanation: 'I like significa eu gosto de.' },
      { question: 'Escolha uma boa frase final educada.', options: ['Nice to meet you.', 'I from Brazil.', 'My name.'], answer: 'Nice to meet you.', explanation: 'Essa frase fecha uma apresentação de forma educada.' },
      { question: 'Corrija: My name Ana.', options: ['My name is Ana.', 'My name are Ana.', 'My is name Ana.'], answer: 'My name is Ana.', explanation: 'Falta o verbo is.' },
      { question: 'Qual texto está melhor?', options: ['Hello. My name is Ana. I am from Brazil.', 'Hello my name Ana I Brazil.', 'Name Ana Brazil hello.'], answer: 'Hello. My name is Ana. I am from Brazil.', explanation: 'O texto correto tem frases curtas, verbo e pontuação.' },
      { question: 'Complete: I ___ a student.', options: ['am', 'is', 'are'], answer: 'am', explanation: 'Com I, usamos am.' },
      { question: 'Qual frase fala origem?', options: ['I am from Brazil.', 'I like English.', 'Nice to meet you.'], answer: 'I am from Brazil.', explanation: 'from indica origem.' },
      { question: 'Qual frase tem pontuação melhor?', options: ['Hello. My name is Ana.', 'Hello my name is Ana', 'hello. my name is ana.'], answer: 'Hello. My name is Ana.', explanation: 'Começa com maiúscula e termina com ponto.' },
      { question: 'Qual é uma frase simples A1?', options: ['I am a student.', 'Although I am new, I will introduce myself.', 'Because introductions are socially relevant.'], answer: 'I am a student.', explanation: 'A1 usa frases curtas e diretas.' },
      { question: 'Complete: I ___ English.', options: ['like', 'am', 'from'], answer: 'like', explanation: 'like expressa gostar de algo.' },
      { question: 'Qual ordem faz sentido?', options: ['Hello → name → from → like → goodbye', 'like → Brazil → hello → name', 'goodbye → name → hello'], answer: 'Hello → name → from → like → goodbye', explanation: 'Uma apresentação simples começa cumprimentando e depois apresenta informações.' },
    ],
    prompts: ['Copie o modelo da aula.', 'Troque o nome do modelo pelo seu nome.', 'Escreva uma frase com I am...', 'Escreva uma frase com I am from...', 'Escreva uma frase com I like...', 'Junte 4 a 6 frases em uma apresentação curta.', 'Revise maiúsculas, ponto final e verbo am/is.'],
    generationSeed: `local-writing-seed-${Date.now().toString(36)}`,
    planContract: 'local-writing-seed-v1',
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

  if (lessonType === 'writing') {
    diagnostics.setPhase('Writing resiliente direta', 'generating');
    diagnostics.log('Writing usa geração resiliente direta para evitar quebra no bloco 1/4 por JSON escapado do Gemini.', 'warn');
    const resilientResult = await generateResilientLessonDraft({ ...options, forcedType: 'writing', level: options.level || 'A1' });
    if (resilientResult?.status === 'success' && resilientResult.lesson) return resilientResult;
    diagnostics.setPhase('Writing seed seguro', 'generating');
    diagnostics.log('Writing resiliente falhou. Usando seed local segura para passar pelo pipeline de qualidade sem quebrar a aula.', 'warn', resilientResult);
    return { status: 'success', lesson: buildLocalWritingSeedLesson(options), error: null };
  }

  const result = await generateBasePlannedLessonDraft(options);
  return repairWithDeepSeekIfAvailable(result, options);
}
