import {
  createGrammarLesson,
  createListeningLesson,
  createReadingLesson,
  createSpeakingLesson,
  createVocabularyLesson,
  createWritingLesson,
} from '../../../schemas/index.js';
import { A1_VOCABULARY_MAP } from '../../a1Map.js';

const level = 'A1';
const status = 'ready';
function q(question, options, answer, explanation = '') { return { question, options, answer, explanation }; }
function ex(english, translation = '') { return { english, translation }; }
function prod(instruction, expected = '') { return { instruction, expected }; }
function section(title, content) { return { title, content }; }
function mistake(wrong, right, why) { return { wrong, right, why }; }

const grammarTopics = [
  ['Subject pronouns', 'subject pronoun + information', ['I am Luis.', 'You are Ana.', 'He is Pedro.', 'She is Maria.', 'It is a book.', 'We are students.', 'They are friends.']],
  ['Verb to be — affirmative', 'subject + am/is/are + complement', ['I am a student.', 'She is happy.', 'They are friends.', 'We are ready.', 'It is blue.']],
  ['Verb to be — negative', 'subject + am/is/are + not + complement', ['I am not tired.', 'She is not from Canada.', 'They are not teachers.', 'We are not ready.']],
  ['Verb to be — questions', 'am/is/are + subject + complement?', ['Are you a student?', 'Is she your sister?', 'Are they ready?', 'Is it correct?']],
  ['Short answers with to be', 'Yes/No + subject + am/is/are', ['Yes, I am.', 'No, I am not.', 'Yes, she is.', 'No, they are not.']],
  ['Possessive adjectives: my, your, his, her', 'possessive adjective + noun', ['My name is Luis.', 'Your phone is black.', 'His name is Pedro.', 'Her book is new.']],
];

const grammarLessons = grammarTopics.map(([title, pattern, examples], index) => createGrammarLesson({
  id: `A1-GRAMMAR-${String(index + 1).padStart(3, '0')}`,
  level,
  order: index + 1,
  title,
  status,
  estimatedMinutes: 45,
  prerequisites: index ? [`A1-GRAMMAR-${String(index).padStart(3, '0')}`] : [],
  objectives: [`Entender ${title}.`, 'Usar a estrutura em frases curtas e corretas.', 'Reconhecer erros comuns de brasileiro.'],
  explanationSections: [
    section('Abertura do professor', `Nesta aula você vai estudar ${title}. A meta não é decorar uma lista: é reconhecer um padrão e conseguir produzir frases simples com segurança.`),
    section('Padrão central', `O padrão principal é: ${pattern}. Em inglês A1, a ordem das palavras é parte da regra. Primeiro monte frases curtas; depois aumente aos poucos.`),
    section('Como estudar', 'Leia os exemplos em voz alta, compare com a tradução e repita. Depois faça exercícios de reconhecimento, lacuna, correção e produção.'),
    section('Erro comum', 'O erro mais comum é traduzir a ordem do português diretamente. Em inglês, pequenas palavras como am, is, are, my e your sustentam a estrutura.'),
    section('Produção', 'No final, escreva frases próprias. A produção final mostra se você realmente entendeu ou apenas reconheceu alternativas.'),
  ],
  professorExamples: examples.flatMap((text) => [ex(text, 'Modelo A1 para comparar com português.'), ex(text.replace('Luis', 'Ana').replace('Pedro', 'Lucas'), 'Variação simples do mesmo padrão.')]),
  commonMistakes: [
    mistake('I is a student.', 'I am a student.', 'Com I, use am.'),
    mistake('She are happy.', 'She is happy.', 'Com she/he/it, use is.'),
    mistake('They is friends.', 'They are friends.', 'Com they/we/you, use are.'),
    mistake('I name is Luis.', 'My name is Luis.', 'Para posse, use my.'),
  ],
  guidedPractice: [
    q('Complete: I ___ a student.', ['am', 'is', 'are'], 'am'),
    q('Complete: She ___ happy.', ['is', 'am', 'are'], 'is'),
    q('Complete: They ___ friends.', ['are', 'is', 'am'], 'are'),
    q('Qual frase está correta?', ['I am from Brazil.', 'I is from Brazil.', 'I are from Brazil.'], 'I am from Brazil.'),
    q('Corrija: She are here.', ['She is here.', 'She am here.', 'She here is.'], 'She is here.'),
    q('Qual opção é pergunta?', ['Are you ready?', 'You are ready.', 'You are not ready.'], 'Are you ready?'),
    q('Qual opção é negativa?', ['They are not here.', 'They are here.', 'Are they here?'], 'They are not here.'),
    q('Complete: ___ name is Ana.', ['Her', 'She', 'He'], 'Her'),
    q('Complete: ___ phone is black.', ['My', 'I', 'Me'], 'My'),
    q('Escolha o modelo correto.', [examples[0], 'Wrong sentence', 'Bad order'], examples[0]),
  ],
  transformationPractice: [
    q('Transforme para negativo: I am ready.', ['I am not ready.', 'I not am ready.', 'I am ready not.'], 'I am not ready.'),
    q('Transforme para pergunta: You are ready.', ['Are you ready?', 'You are ready?', 'Is you ready?'], 'Are you ready?'),
    q('Corrija: He are a teacher.', ['He is a teacher.', 'He am a teacher.', 'He teacher is.'], 'He is a teacher.'),
    q('Corrija: They is students.', ['They are students.', 'They am students.', 'They students are.'], 'They are students.'),
  ],
  productionTasks: [prod('Escreva 5 frases próprias usando o padrão da aula.'), prod('Corrija 3 frases erradas criadas por você.'), prod('Faça uma mini apresentação usando 3 frases.')],
  finalChecklist: ['Entendi a regra principal.', 'Reconheci exemplos corretos.', 'Corrigi erros comuns.', 'Escrevi frases próprias.'],
}));

const vocabularyLessons = A1_VOCABULARY_MAP.slice(0, 5).map((itemData, index) => createVocabularyLesson({
  id: `A1-VOCABULARY-${String(index + 1).padStart(3, '0')}`,
  level,
  order: index + 1,
  title: itemData.title,
  status,
  estimatedMinutes: 30,
  prerequisites: index ? [`A1-VOCABULARY-${String(index).padStart(3, '0')}`] : [],
  objectives: [itemData.objective || `Aprender vocabulário de ${itemData.title}.`],
  theme: itemData.title,
  lexicalSets: [{ title: itemData.title, items: ['hello', 'good morning', 'name', 'country', 'city', 'Brazil', 'family', 'mother', 'father', 'student', 'teacher', 'friend', 'phone', 'number', 'goodbye'] }],
  pronunciationNotes: ['Fale devagar antes de falar rápido.', 'Repita em blocos curtos.', 'Compare som e escrita.'],
  examples: ['Hello, my name is Ana.', 'I am from Brazil.', 'This is my family.', 'My city is small.', 'She is my friend.', 'He is a student.'].map((text) => ({ text, translation: 'Exemplo A1 com vocabulário da unidade.' })),
  recognitionPractice: [q('Qual palavra serve para cumprimentar?', ['Hello', 'Blue', 'Table'], 'Hello'), q('Qual palavra fala de país?', ['Brazil', 'Monday', 'Book'], 'Brazil'), q('Qual palavra fala de família?', ['mother', 'city', 'number'], 'mother'), q('Qual é uma pessoa?', ['teacher', 'table', 'red'], 'teacher'), q('Qual significa nome?', ['name', 'city', 'job'], 'name'), q('Qual pode ser cidade?', ['São Paulo', 'teacher', 'book'], 'São Paulo')],
  usagePractice: [prod('Escreva 5 palavras da aula.'), prod('Crie 3 frases simples com o vocabulário.'), prod('Leia as palavras em voz alta.')],
  productionTasks: [prod('Use 5 palavras em frases suas.'), prod('Faça uma mini apresentação usando o vocabulário.')],
  masteryCriteria: { minRecognitionAccuracy: 80, tags: itemData.tags || [] },
}));

const readingTexts = [
  'Hello! My name is Ana. I am a student from Brazil. I live in a small city with my mother, my father, and my brother. I study English at home every day. My teacher is kind, and my class is small. I like English because I can meet new people and read simple messages.',
  'This is Lucas. He is from Brazil, but his best friend is from Canada. Lucas is twenty years old. He is a worker and a student. In the evening, he studies English on his phone. He writes one sentence every day: My name is Lucas. I am from Brazil. I am a student.',
  'My family is small, but it is very important to me. My mother is a teacher, and my father is a driver. My sister is a student. Her name is Carla. We live in Brazil. I study English in the evening. These words help me talk about my life in English.',
];
const readingLessons = ['Short introductions', 'A simple profile', 'A family description'].map((title, index) => createReadingLesson({
  id: `A1-READING-${String(index + 1).padStart(3, '0')}`,
  level,
  order: index + 1,
  title,
  status,
  estimatedMinutes: 35,
  prerequisites: index ? [`A1-READING-${String(index).padStart(3, '0')}`] : [],
  objectives: ['Ler sem traduzir tudo.', 'Responder usando evidência textual.'],
  preReading: ['Observe nomes e palavras conhecidas.', 'Leia primeiro pela ideia geral.', 'Depois procure detalhes.'],
  mainText: readingTexts[index],
  vocabulary: ['name', 'student', 'Brazil', 'city', 'family', 'teacher', 'friend', 'English'].map((word) => ({ word, meaning: 'vocabulário essencial A1', example: `The word ${word} appears in the text.` })),
  comprehensionQuestions: [q('Qual é o assunto principal do texto?', ['informações pessoais', 'receita', 'viagem longa'], 'informações pessoais'), q('O texto fala sobre o Brasil?', ['Sim', 'Não'], 'Sim'), q('Há pessoas no texto?', ['Sim', 'Não'], 'Sim'), q('O texto usa frases curtas?', ['Sim', 'Não'], 'Sim'), q('Qual palavra aparece no texto?', ['English', 'airplane', 'hospital'], 'English'), q('A pessoa estuda inglês?', ['Sim', 'Não'], 'Sim')],
  evidenceTasks: ['Copie uma frase com name.', 'Copie uma frase com Brazil.', 'Copie uma frase com student.'].map((instruction) => ({ instruction, evidenceRequired: true })),
  shortResponse: [prod('Resuma em português o que você entendeu.'), prod('Escreva 2 frases parecidas sobre você.')],
  productionTask: prod('Escreva uma mini apresentação parecida com o texto.'),
  masteryCriteria: { minComprehensionAccuracy: 75, evidenceRequired: true },
}));

const scriptBase = 'Hello. My name is Ana. I am from Brazil. I live in a small city. I am a student, and I study English every day. My friend is Lucas. He is from Brazil too. I speak slowly. I repeat names, numbers, countries, and cities. My goal is to understand simple conversations and answer with short sentences.';
const listeningLessons = ['Greetings and names', 'Spelling names', 'Numbers and phone numbers', 'Countries and cities'].map((title, index) => createListeningLesson({
  id: `A1-LISTENING-${String(index + 1).padStart(3, '0')}`,
  level,
  order: index + 1,
  title,
  status,
  estimatedMinutes: 30,
  prerequisites: index ? [`A1-LISTENING-${String(index).padStart(3, '0')}`] : [],
  objectives: ['Entender áudio curto em camadas.', 'Identificar informação explícita.'],
  audioScript: scriptBase,
  transcript: scriptBase,
  firstListenTasks: ['Ouça sem ler e identifique o assunto geral.', 'Anote um nome que você ouviu.'].map((instruction) => ({ instruction })),
  secondListenTasks: ['Identifique país.', 'Identifique cidade.', 'Identifique objetivo da pessoa.'].map((instruction) => ({ instruction })),
  vocabulary: ['hello', 'name', 'Brazil', 'city', 'student', 'friend'].map((word) => ({ word, meaning: 'palavra do áudio' })),
  shadowing: ['Hello.', 'My name is Ana.', 'I am from Brazil.', 'I live in a small city.', 'I study English every day.', 'I speak slowly.'],
  comprehensionQuestions: [q('A pessoa fala o nome?', ['Sim', 'Não'], 'Sim'), q('A pessoa é do Brasil?', ['Sim', 'Não'], 'Sim'), q('Ela estuda inglês?', ['Sim', 'Não'], 'Sim'), q('Ela fala rápido ou devagar?', ['devagar', 'rápido'], 'devagar'), q('Lucas é amigo?', ['Sim', 'Não'], 'Sim')],
  masteryCriteria: { minListeningAccuracy: 70, shadowingRequired: 4 },
}));

const speakingLessons = ['Say hello and goodbye', 'Introduce yourself', 'Spell your name', 'Say your country and city'].map((title, index) => createSpeakingLesson({
  id: `A1-SPEAKING-${String(index + 1).padStart(3, '0')}`,
  level,
  order: index + 1,
  title,
  status,
  estimatedMinutes: 30,
  prerequisites: index ? [`A1-SPEAKING-${String(index).padStart(3, '0')}`] : [],
  objectives: ['Falar frases curtas com clareza.', 'Usar modelo antes de criar resposta própria.'],
  modelPhrases: ['Hello.', 'Good morning.', 'My name is Luis.', 'I am from Brazil.', 'I live in Santa Maria.', 'Nice to meet you.', 'How are you?', 'I am fine.'],
  substitutionDrills: ['My name is Ana → My name is Luis', 'I am from Brazil → I am from Canada', 'Good morning → Good evening', 'I am fine → I am okay'].map((instruction) => ({ instruction })),
  pronunciationFocus: { title: 'Clareza antes de velocidade', tips: ['Fale devagar.', 'Separe as palavras.', 'Repita o modelo 3 vezes.'] },
  guidedSpeaking: ['Repita o modelo.', 'Troque uma palavra.', 'Responda uma pergunta.', 'Junte duas frases.'].map((instruction) => ({ instruction })),
  recordingTasks: [prod('Grave uma saudação e seu nome.'), prod('Grave país e cidade.')],
  freeSpeaking: [prod('Fale por 20–30 segundos sobre você usando frases A1.')],
  masteryCriteria: { recordingRequired: true, minChecklist: 3 },
}));

const writingLessons = ['Write simple sentences', 'Write your name and country', 'Write a personal introduction'].map((title, index) => createWritingLesson({
  id: `A1-WRITING-${String(index + 1).padStart(3, '0')}`,
  level,
  order: index + 1,
  title,
  status,
  estimatedMinutes: 35,
  prerequisites: index ? [`A1-WRITING-${String(index).padStart(3, '0')}`] : [],
  objectives: ['Escrever frases curtas corretas.', 'Usar modelo antes da produção livre.'],
  modelText: 'Hello. My name is Ana. I am from Brazil. I live in a small city. I am a student. I like English. I study every day. Nice to meet you.',
  writingBlocks: ['Hello.', 'My name is...', 'I am from...', 'I live in...', 'I am a student.', 'I like English.', 'Nice to meet you.'],
  guidedSubstitution: ['Ana → Luis', 'Brazil → Canada', 'student → worker', 'small city → big city'].map((instruction) => ({ instruction })),
  grammarForWriting: ['Use letra maiúscula no começo.', 'Use ponto final.', 'Use I am, não I is.', 'Use My name is, não My name.'],
  checklist: ['Comecei com letra maiúscula.', 'Usei ponto final.', 'Usei frases curtas.', 'Revisei am/is/are.'],
  draftTask: prod('Escreva um rascunho com 4 a 6 frases.'),
  revisionTask: prod('Revise usando o checklist e escreva a versão final.'),
  masteryCriteria: { finalDraftRequired: true, checklistRequired: true },
}));

export const A1_FOUNDATIONS_LESSONS = Object.freeze([...grammarLessons, ...vocabularyLessons, ...readingLessons, ...listeningLessons, ...speakingLessons, ...writingLessons]);
export const A1_FOUNDATIONS_BY_PILLAR = Object.freeze({ grammar: grammarLessons, vocabulary: vocabularyLessons, reading: readingLessons, listening: listeningLessons, speaking: speakingLessons, writing: writingLessons });
export function getA1FoundationsLessons() { return A1_FOUNDATIONS_LESSONS; }
export function getA1FoundationsByPillar(pillar) { return A1_FOUNDATIONS_BY_PILLAR[pillar] || []; }
