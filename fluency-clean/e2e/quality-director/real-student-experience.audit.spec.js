import { test, expect } from '@playwright/test';
import { getStaticCurriculum } from '../../src/content/curriculum/index.js';
import { AuditReporter } from './helpers/auditReporter.js';
import {
  advanceOrReport,
  getCurrentPhaseTitle,
  getPageText,
  openSeededLesson,
  satisfyCurrentPhase,
  seedCurrentLesson,
} from './helpers/lessonFlowDriver.js';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const PILLARS = ['grammar', 'vocabulary', 'reading', 'listening', 'speaking', 'writing'];
const FULL_UI_AUDIT = process.env.REAL_STUDENT_EXPERIENCE_FULL === '1';
const UI_SAMPLES_PER_LEVEL_PILLAR = FULL_UI_AUDIT ? 3 : 1;
const MAX_UI_PHASES_PER_LESSON = FULL_UI_AUDIT ? 12 : 8;

const TECHNICAL_LEAKS = [
  /\bundefined\b/i,
  /\bnull\b/i,
  /\bNaN\b/,
  /\[object Object\]/i,
  /fallback/i,
  /schemaVersion/i,
  /storageMode/i,
  /indexedDb/i,
  /stack trace/i,
  /json parse|parse error|syntaxerror/i,
];

const GENERIC_ONLY_PATTERNS = [
  /^repeat after me\s*\d*$/i,
  /^substitution drill\s*\d*$/i,
  /^pergunta e resposta\s*\d*$/i,
  /^gravação guiada\s*\d*$/i,
  /^fala livre\s*\d*$/i,
  /^sua vez de falar$/i,
  /^fale ou use o fallback escrito\.?$/i,
  /^use o microfone/i,
  /^toque em ["“]?falar agora["”]?/i,
  /^complete a ação principal/i,
  /^faça uma tentativa/i,
  /^pratique falando com clareza/i,
  /^wrong sentence$/i,
  /^bad model$/i,
  /^no answer$/i,
  /^incomplete$/i,
  /^advanced mixed sentence$/i,
  /^portuguese word order$/i,
  /^random$/i,
  /^unknown$/i,
  /^unrelated$/i,
  /^wrong$/i,
  /^no option$/i,
  /^bad option$/i,
];

const ACTION_WORDS = /fale|diga|repita|escreva|responda|complete|escolha|corrija|ouça|listen|read|write|speak|repeat|answer|choose|complete|fix|record|grave|translate|transforme|substitua|compare/i;
const SPECIFIC_CONTENT_WORDS = /[a-zA-ZÀ-ÿ]{3,}\s+[a-zA-ZÀ-ÿ]{3,}/;

function clean(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value).trim().replace(/\s+/g, ' ');
  }
  if (Array.isArray(value)) return value.map(clean).filter(Boolean).join(' ');
  if (typeof value === 'object') return Object.values(value).map(clean).filter(Boolean).join(' ');
  return String(value).trim();
}

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function textOf(value) {
  if (typeof value === 'string' || typeof value === 'number') return clean(value);
  if (!value || typeof value !== 'object') return '';
  return clean(
    value.instruction || value.question || value.prompt || value.text || value.content ||
    value.sentence || value.english || value.example || value.line || value.phrase ||
    value.chunk || value.word || value.model || value.title || value.description ||
    value.expected || value.answer || value.expectedAnswer || value.correctAnswer || ''
  );
}

function hasUsefulText(value, min = 12) {
  const text = clean(value);
  if (text.length < min) return false;
  if (!SPECIFIC_CONTENT_WORDS.test(text)) return false;
  return !GENERIC_ONLY_PATTERNS.some((pattern) => pattern.test(text));
}

function hasGenericOnlyText(value) {
  const text = clean(value);
  return Boolean(text) && GENERIC_ONLY_PATTERNS.some((pattern) => pattern.test(text));
}

function firstUsefulField(object, fields, min = 12) {
  return fields.map((field) => object?.[field]).find((value) => hasUsefulText(value, min));
}

function countUsefulItems(...groups) {
  return groups.flatMap((group) => safeArray(group)).filter((item) => hasUsefulText(textOf(item), 8)).length;
}

function lessonArea(lesson) {
  return `${lesson.level || '??'} ${String(lesson.pillar || lesson.type || 'unknown').toUpperCase()} · ${lesson.id || 'unknown'}`;
}

function collectVisibleStrings(value, path = '', output = []) {
  const ignoredKeys = new Set([
    'id', 'level', 'pillar', 'type', 'order', 'status', 'tags', 'prerequisites',
    'schemaVersion', 'estimatedMinutes', 'packageId', 'packageKey', 'checkpoint',
    'masteryCriteria', 'mastery', 'generationMeta', 'provider', 'source',
  ]);

  if (value === null || value === undefined) return output;
  if (typeof value === 'string' || typeof value === 'number') {
    const text = clean(value);
    if (text) output.push({ path, text });
    return output;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectVisibleStrings(item, `${path}[${index}]`, output));
    return output;
  }
  if (typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => {
      if (ignoredKeys.has(key)) return;
      collectVisibleStrings(item, path ? `${path}.${key}` : key, output);
    });
  }
  return output;
}

function addStaticIssue(reporter, lesson, issue) {
  reporter.addIssue({
    area: lessonArea(lesson),
    fileHint: 'src/content/curriculum/levels/<level>/* ou renderer do pilar',
    ...issue,
  });
}

function auditTechnicalAndGenericText(reporter, lesson) {
  const strings = collectVisibleStrings(lesson);
  strings.forEach(({ path, text }) => {
    TECHNICAL_LEAKS.forEach((pattern) => {
      if (pattern.test(text)) {
        addStaticIssue(reporter, lesson, {
          severity: 'P1',
          title: 'Texto técnico/fallback pode aparecer para o aluno',
          impact: 'A aula fica com aparência quebrada e reduz confiança do aluno.',
          evidence: `${path}: ${text.slice(0, 160)}`,
          recommendation: 'Trocar texto técnico ou fallback por instrução pedagógica real.',
        });
      }
    });

    if (hasGenericOnlyText(text)) {
      addStaticIssue(reporter, lesson, {
        severity: 'P2',
        title: 'Texto genérico usado como conteúdo pedagógico',
        impact: 'O aluno pode ver uma tarefa sem saber exatamente o que fazer.',
        evidence: `${path}: ${text}`,
        recommendation: 'Substituir por pergunta, frase, modelo ou tarefa específica da aula.',
      });
    }
  });
}

function auditGrammarLesson(reporter, lesson) {
  const hasRule = firstUsefulField(lesson, ['conceptExplanation', 'grammarExplanation', 'ruleExplanation', 'teacherOpening'], 40) ||
    safeArray(lesson.explanationSections).some((section) => hasUsefulText(textOf(section) || clean(section), 40));
  const examples = countUsefulItems(lesson.examples, lesson.positiveExamples, lesson.negativeExamples, lesson.professorExamples);
  const guided = countUsefulItems(lesson.stepByStep, lesson.guidedDiscovery, lesson.guidedPractice, lesson.controlledPractice, lesson.transformationPractice, lesson.errorCorrectionPractice);
  const hasContrast = countUsefulItems(lesson.commonMistakes, lesson.portugueseContrast, lesson.contrast) > 0;

  if (!hasRule) {
    addStaticIssue(reporter, lesson, {
      severity: 'P1',
      title: 'Grammar sem regra visível suficiente para o aluno',
      impact: 'O aluno pratica sem entender quando e por que usar a estrutura.',
      evidence: 'Não encontrei explicação substantiva em conceptExplanation/teacherOpening/explanationSections.',
      recommendation: 'Adicionar regra clara, quando usar e mini comparação com português.',
    });
  }
  if (examples < 3 || guided < 2) {
    addStaticIssue(reporter, lesson, {
      severity: 'P2',
      title: 'Grammar com pouco modelo prático antes da produção',
      impact: 'O aluno pode ter que adivinhar como aplicar a regra.',
      evidence: `examples=${examples}; guidedSteps=${guided}`,
      recommendation: 'Adicionar exemplos positivos, negativos, stepByStep e prática guiada real.',
    });
  }
  if (!hasContrast) {
    addStaticIssue(reporter, lesson, {
      severity: 'P2',
      title: 'Grammar sem contraste ou erro comum visível',
      impact: 'Brasileiros podem repetir transferência direta do português.',
      recommendation: 'Adicionar commonMistakes, portugueseContrast ou contrast com explicação curta.',
    });
  }
}

function auditVocabularyLesson(reporter, lesson) {
  const lexicalCount = countUsefulItems(
    lesson.essentialWords,
    lesson.vocabulary,
    lesson.keyVocabulary,
    lesson.preReadingVocabulary,
    lesson.chunks,
    ...safeArray(lesson.lexicalSets).map((set) => set?.items || set?.words || set?.entries)
  );
  const examples = countUsefulItems(
    lesson.examples,
    lesson.exampleSentences,
    lesson.contextExamples,
    lesson.realLifeUseCases,
    lesson.contextVocabularyTasks,
    lesson.miniDialogues,
    safeArray(lesson.essentialWords).map((word) => word?.example || word?.sentence || word?.exampleSentences)
  );

  if (lexicalCount < 5) {
    addStaticIssue(reporter, lesson, {
      severity: 'P1',
      title: 'Vocabulary com pouco volume lexical real',
      impact: 'A aula não entrega palavras suficientes para fixação.',
      evidence: `lexicalCount=${lexicalCount}`,
      recommendation: 'Adicionar palavras/chunks úteis com significado e exemplo.',
    });
  }
  if (examples < 3) {
    addStaticIssue(reporter, lesson, {
      severity: 'P2',
      title: 'Vocabulary sem frases de uso suficientes',
      impact: 'O aluno memoriza palavra solta sem saber usar em speaking/writing.',
      evidence: `exampleCount=${examples}`,
      recommendation: 'Adicionar frases naturais de exemplo e contexto de uso.',
    });
  }
}

function auditReadingLesson(reporter, lesson) {
  const mainText = clean(lesson.mainText || lesson.text || lesson.readingText?.body || lesson.readingText || lesson.passage || lesson.mainPassage || lesson.inputText);
  const questions = countUsefulItems(lesson.comprehensionQuestions, lesson.evidenceQuestions, lesson.questions, lesson.openQuestions, lesson.inferenceQuestions, lesson.tasks, lesson.evidenceTasks);
  const hasStrategy = firstUsefulField(lesson, ['readingStrategy', 'strategy', 'preReading', 'beforeReading', 'firstReadTask', 'readingPurpose'], 20) ||
    countUsefulItems(lesson.secondReadTasks, lesson.skimmingTask, lesson.scanningTask, lesson.gistTask, lesson.detailTask) > 0;
  const hasEvidenceLanguage = /evidence|evidência|texto|frase do texto|prove|copy|copie/i.test(clean(lesson));

  if (mainText.length < 180) {
    addStaticIssue(reporter, lesson, {
      severity: 'P1',
      title: 'Reading sem texto principal suficiente',
      impact: 'O aluno pode responder sem treinar leitura real.',
      evidence: `${mainText.length} caracteres`,
      recommendation: 'Adicionar texto com contexto, personagem/situação e detalhes verificáveis.',
    });
  }
  if (!hasStrategy || questions < 3 || !hasEvidenceLanguage) {
    addStaticIssue(reporter, lesson, {
      severity: questions < 2 ? 'P1' : 'P2',
      title: 'Reading sem estratégia, perguntas ou evidência suficientes',
      impact: 'O aluno pode traduzir tudo ou chutar respostas sem evidência textual.',
      evidence: `hasStrategy=${Boolean(hasStrategy)}; questions=${questions}; hasEvidenceLanguage=${hasEvidenceLanguage}`,
      recommendation: 'Adicionar pré-leitura, gist/scanning/detalhe e perguntas com evidência.',
    });
  }
}

function auditListeningLesson(reporter, lesson) {
  const script = clean(lesson.audioScript || lesson.listeningScript || lesson.transcript || lesson.dialogue);
  const pre = countUsefulItems(lesson.listeningPreparation, lesson.preListening, lesson.predictionTask, lesson.guidedBeforeListening, lesson.beforeListening, lesson.focusBeforeListening, lesson.keywords, lesson.keyWordsToHear, lesson.firstListenTasks);
  const post = countUsefulItems(lesson.listeningQuestions, lesson.comprehensionQuestions, lesson.detailQuestions, lesson.shadowingTasks, lesson.secondListenTasks, lesson.listeningComprehension, lesson.shadowing);

  if (script.length < 40) {
    addStaticIssue(reporter, lesson, {
      severity: 'P1',
      title: 'Listening sem script/transcript pedagógico suficiente',
      impact: 'A aula pode não ter base para áudio, revisão ou shadowing.',
      evidence: `${script.length} caracteres de script/transcript`,
      recommendation: 'Adicionar script/transcript real da escuta.',
    });
  }
  if (pre < 1 || post < 3) {
    addStaticIssue(reporter, lesson, {
      severity: post < 2 ? 'P1' : 'P2',
      title: 'Listening sem preparação ou pós-escuta suficientes',
      impact: 'O aluno ouve passivamente e não verifica compreensão real.',
      evidence: `preTasks=${pre}; postTasks=${post}`,
      recommendation: 'Adicionar predição, gist, detalhe e shadowing/repetição.',
    });
  }
}

function auditSpeakingLesson(reporter, lesson) {
  const models = countUsefulItems(lesson.modelPhrases, lesson.modelSentences, lesson.examples, lesson.speakingModels, lesson.speakingModel, lesson.exampleDialogue, lesson.usefulPhrases, lesson.sentenceFrames);
  const repeat = countUsefulItems(lesson.repeatAfterMe, lesson.substitutionDrills, lesson.questionAnswerDrills, lesson.guidedSpeaking, lesson.speakingPrompts, lesson.buildYourAnswer);
  const production = countUsefulItems(lesson.recordingTasks, lesson.freeSpeaking, lesson.openSpeaking, lesson.productionTask, lesson.productionTasks, lesson.speakingTask, lesson.finalSpeakingTask);
  const pronunciation = countUsefulItems(lesson.pronunciationChunks, lesson.pronunciationFocus, lesson.shadowingTasks, lesson.repeatTasks, lesson.fluencyDrills, lesson.repeatAfterMe);

  if (models < 2) {
    addStaticIssue(reporter, lesson, {
      severity: 'P1',
      title: 'Speaking sem modelos suficientes antes da fala',
      impact: 'O aluno pode ser forçado a falar sem base linguística.',
      evidence: `models=${models}`,
      recommendation: 'Adicionar frases-modelo, mini diálogo ou sentence frames antes da produção.',
    });
  }
  if (repeat < 2 || production < 1 || pronunciation < 1) {
    addStaticIssue(reporter, lesson, {
      severity: repeat < 1 ? 'P1' : 'P2',
      title: 'Speaking sem tarefa oral específica suficiente',
      impact: 'A tela pode pedir fala, mas não deixar claro exatamente o que falar.',
      evidence: `practice=${repeat}; production=${production}; pronunciation=${pronunciation}`,
      recommendation: 'Adicionar repeatAfterMe/substitution/Q&A/recordingTasks com prompts explícitos.',
    });
  }
}

function auditWritingLesson(reporter, lesson) {
  const model = firstUsefulField(lesson, ['modelText', 'exampleText', 'writingModel', 'modelAnswer', 'sampleAnswer'], 60);
  const planning = countUsefulItems(lesson.writingBlocks, lesson.guidedSubstitution, lesson.guidedWriting, lesson.outline, lesson.planningTasks);
  const production = countUsefulItems(lesson.draftTask, lesson.revisionTask, lesson.productionTask, lesson.productionTasks, lesson.finalWritingTask);
  const checklist = countUsefulItems(lesson.checklist, lesson.writingChecklist, lesson.grammarForWriting, lesson.revisionChecklist);

  if (!model) {
    addStaticIssue(reporter, lesson, {
      severity: 'P1',
      title: 'Writing sem modelo pedagógico visível',
      impact: 'O aluno pode ter que escrever do zero sem saber o formato esperado.',
      recommendation: 'Adicionar modelText/exampleText/writingModel antes do rascunho.',
    });
  }
  if (planning < 2 || production < 1 || checklist < 2) {
    addStaticIssue(reporter, lesson, {
      severity: 'P2',
      title: 'Writing sem andaimes suficientes para rascunho e revisão',
      impact: 'A escrita pode virar tarefa solta sem orientação.',
      evidence: `planning=${planning}; production=${production}; checklist=${checklist}`,
      recommendation: 'Adicionar blocos de escrita, rascunho, revisão e checklist.',
    });
  }
}

function auditStaticLessonExperience(reporter, lesson) {
  auditTechnicalAndGenericText(reporter, lesson);
  const pillar = lesson.pillar || lesson.type;
  if (pillar === 'grammar') auditGrammarLesson(reporter, lesson);
  if (pillar === 'vocabulary') auditVocabularyLesson(reporter, lesson);
  if (pillar === 'reading') auditReadingLesson(reporter, lesson);
  if (pillar === 'listening') auditListeningLesson(reporter, lesson);
  if (pillar === 'speaking') auditSpeakingLesson(reporter, lesson);
  if (pillar === 'writing') auditWritingLesson(reporter, lesson);
}

function readyLessonsByLevelPillar() {
  const curriculum = getStaticCurriculum();
  return LEVELS.flatMap((level) => {
    const entry = curriculum.levels[level];
    return PILLARS.flatMap((pillar) => {
      const lessons = safeArray(entry?.pillars?.[pillar]).filter((lesson) => lesson.status === 'ready');
      return lessons.map((lesson) => ({ ...lesson, level, pillar }));
    });
  });
}

function pickRepresentativeLessons(lessons) {
  return LEVELS.flatMap((level) => PILLARS.flatMap((pillar) => {
    const bucket = lessons.filter((lesson) => lesson.level === level && lesson.pillar === pillar);
    if (!bucket.length) return [];
    if (UI_SAMPLES_PER_LEVEL_PILLAR <= 1) return [bucket[0]];
    const candidates = [bucket[0], bucket[Math.floor(bucket.length / 2)], bucket[bucket.length - 1]];
    const unique = [];
    const seen = new Set();
    candidates.forEach((lesson) => {
      if (lesson && !seen.has(lesson.id)) {
        seen.add(lesson.id);
        unique.push(lesson);
      }
    });
    return unique.slice(0, UI_SAMPLES_PER_LEVEL_PILLAR);
  }));
}

function normalizePageText(text) {
  return clean(text).toLowerCase();
}

function looksLikeActionPhase(text) {
  return ACTION_WORDS.test(text) || /falar agora|conferir|continuar|input|microfone/i.test(text);
}

function hasSpecificVisibleTask(text) {
  const normalized = normalizePageText(text);
  if (normalized.length < 80) return false;
  if (TECHNICAL_LEAKS.some((pattern) => pattern.test(normalized))) return false;
  const genericMatches = GENERIC_ONLY_PATTERNS.filter((pattern) => pattern.test(normalized));
  if (genericMatches.length >= 2 && normalized.length < 220) return false;
  return SPECIFIC_CONTENT_WORDS.test(text) && /[.!?:]|—|-|\n/.test(text);
}

async function auditCurrentVisiblePhase({ page, reporter, lesson, phaseTitle, step }) {
  const area = `${lessonArea(lesson)} · fase ${step + 1}${phaseTitle ? ` · ${phaseTitle}` : ''}`;
  const pageText = await getPageText(page);
  const bodyText = normalizePageText(pageText);
  const phaseShell = page.locator('.lesson-phase-shell').first();
  const phaseBody = page.locator('.lesson-phase-body-slot').first();
  const phaseTitleNode = page.locator('.lesson-phase-title').first();
  const phaseInstruction = page.locator('.lesson-phase-instruction').first();

  const visibleTitle = clean(await phaseTitleNode.innerText({ timeout: 1000 }).catch(() => ''));
  const visibleInstruction = clean(await phaseInstruction.innerText({ timeout: 1000 }).catch(() => ''));
  const visibleBody = clean(await phaseBody.innerText({ timeout: 1000 }).catch(() => ''));

  if (!(await phaseShell.isVisible().catch(() => false))) {
    reporter.addIssue({
      severity: 'P0',
      area,
      title: 'Fase da aula não renderizou o shell principal',
      impact: 'O aluno pode ver tela quebrada ou vazia.',
      recommendation: 'Verificar renderizador do pilar e construção das fases.',
    });
    return;
  }

  if (!hasUsefulText(visibleTitle, 4)) {
    reporter.addIssue({
      severity: 'P1',
      area,
      title: 'Fase visível sem título útil',
      impact: 'O aluno não sabe em qual etapa da aula está.',
      evidence: `title=${visibleTitle || '<vazio>'}`,
      recommendation: 'Renderizar título pedagógico específico da etapa.',
    });
  }

  if (!hasUsefulText(visibleInstruction, 10)) {
    reporter.addIssue({
      severity: 'P1',
      area,
      title: 'Fase visível sem instrução útil',
      impact: 'O aluno pode precisar adivinhar o que fazer.',
      evidence: `instruction=${visibleInstruction || '<vazio>'}`,
      recommendation: 'Adicionar instrução clara e específica antes da interação.',
    });
  }

  TECHNICAL_LEAKS.forEach((pattern) => {
    if (pattern.test(pageText)) {
      reporter.addIssue({
        severity: 'P1',
        area,
        title: 'Texto técnico/fallback visível na tela da aula',
        impact: 'O aluno percebe o app como quebrado ou incompleto.',
        evidence: `Padrão encontrado: ${pattern}`,
        recommendation: 'Trocar fallback/estado técnico por conteúdo real da aula.',
      });
    }
  });

  if (hasGenericOnlyText(visibleTitle) && !hasUsefulText(visibleBody, 20)) {
    reporter.addIssue({
      severity: 'P1',
      area,
      title: 'Título genérico sem conteúdo principal suficiente',
      impact: 'A fase parece existir, mas não ensina o que o aluno deve fazer.',
      evidence: `title=${visibleTitle}; body=${visibleBody.slice(0, 120) || '<vazio>'}`,
      recommendation: 'Mostrar modelo, prompt, pergunta, texto ou frase específica no corpo da fase.',
    });
  }

  const hasInput = await page.locator('textarea, input, [contenteditable="true"]').first().isVisible().catch(() => false);
  const hasSpeakButton = await page.getByRole('button', { name: /falar agora|microfone|gravar/i }).first().isVisible().catch(() => false);
  const hasChoices = await page.locator('.lesson-phase-choice').first().isVisible().catch(() => false);
  const hasAudio = await page.getByRole('button', { name: /ouvir|áudio|audio|modelo/i }).first().isVisible().catch(() => false);
  const actionPhase = hasInput || hasSpeakButton || hasChoices || hasAudio || looksLikeActionPhase(pageText);

  if (actionPhase && !hasSpecificVisibleTask(`${visibleTitle}\n${visibleInstruction}\n${visibleBody}`)) {
    reporter.addIssue({
      severity: 'P1',
      area,
      title: 'Fase exige ação, mas não mostra tarefa específica suficiente',
      impact: 'O aluno pode clicar/falar/escrever sem entender exatamente o que deve produzir.',
      evidence: `${visibleTitle} | ${visibleInstruction} | ${visibleBody.slice(0, 180)}`,
      recommendation: 'Antes do botão/input, mostrar pergunta, frase, modelo, texto, opção ou tarefa concreta.',
    });
  }

  if (hasSpeakButton && !/fale esta frase|use este modelo|responda esta pergunta|grave esta tarefa|sua tarefa|repeat|say|answer|respond|model/i.test(pageText)) {
    reporter.addIssue({
      severity: 'P1',
      area,
      title: 'Botão de fala sem prompt oral claro',
      impact: 'O aluno precisa adivinhar o que falar.',
      evidence: `${visibleTitle} | ${visibleInstruction} | ${visibleBody.slice(0, 180)}`,
      recommendation: 'Renderizar frase/prompt visível antes do microfone.',
    });
  }

  if (hasInput && !/escreva|responda|complete|corrija|write|answer|complete|fix|draft|rascunho/i.test(pageText)) {
    reporter.addIssue({
      severity: 'P1',
      area,
      title: 'Campo de texto sem comando de escrita claro',
      impact: 'O aluno vê o campo, mas não sabe o que escrever.',
      recommendation: 'Adicionar tarefa de escrita/resposta específica antes do campo.',
    });
  }

  if (bodyText.includes('continuar') && bodyText.length < 120) {
    reporter.addIssue({
      severity: 'P1',
      area,
      title: 'Tela depende quase só do botão Continuar',
      impact: 'A fase pode estar vazia ou sem conteúdo pedagógico real.',
      evidence: pageText.slice(0, 180),
      recommendation: 'Adicionar conteúdo principal antes do CTA.',
    });
  }

  reporter.addCheck({
    area,
    title: 'Fase possui shell, título/instrução avaliados e guardrails de tarefa real aplicados',
  });
}

test.describe.configure({ mode: 'serial' });

let reporter;

test.beforeEach(async ({ page }, testInfo) => {
  reporter = reporter || new AuditReporter({
    name: 'quality-director-real-student-experience',
    projectName: testInfo.project.name,
  });

  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) {
      reporter.addConsoleIssue(message.text(), message.location()?.url || '');
    }
  });

  page.on('pageerror', (error) => {
    reporter.addIssue({
      severity: 'P0',
      area: 'Runtime',
      title: 'Erro JavaScript não tratado durante auditoria de experiência real',
      impact: 'Pode quebrar a aula enquanto o aluno estuda.',
      evidence: error.message,
      recommendation: 'Corrigir a exceção antes de avançar no polimento pedagógico.',
    });
  });
});

test.afterAll(() => {
  reporter?.write();
});

test('Real Student Experience: auditoria estática de todas as aulas ready', async () => {
  const lessons = readyLessonsByLevelPillar();
  expect(lessons.length).toBeGreaterThan(0);

  lessons.forEach((lesson) => auditStaticLessonExperience(reporter, lesson));

  reporter.addCheck({
    area: 'Currículo estático',
    title: `Auditou ${lessons.length} aulas ready procurando tarefa real, texto técnico, modelos e andaimes por pilar`,
  });
});

for (const lesson of pickRepresentativeLessons(readyLessonsByLevelPillar())) {
  test(`Real Student Experience: jornada visual com guardrails — ${lesson.id}`, async ({ page }) => {
    await seedCurrentLesson(page, lesson);
    await openSeededLesson(page);
    await expect(page.locator('.lesson-flow-shell')).toBeVisible({ timeout: 10_000 });

    const seenPhases = new Set();

    for (let step = 0; step < MAX_UI_PHASES_PER_LESSON; step += 1) {
      const pageText = await getPageText(page);
      if (/progresso salvo|aula já concluída|aula concluída|revisão adaptativa/i.test(pageText)) {
        reporter.addCheck({
          area: lessonArea(lesson),
          title: 'Jornada chegou ao estado de conclusão ou revisão pós-aula',
        });
        break;
      }

      const phaseTitle = await getCurrentPhaseTitle(page);
      seenPhases.add(phaseTitle || `fase-${step + 1}`);
      await auditCurrentVisiblePhase({ page, reporter, lesson, phaseTitle, step });
      await satisfyCurrentPhase(page, reporter, lessonArea(lesson), lesson);
      const advanced = await advanceOrReport(page, reporter, `${lessonArea(lesson)} · ${phaseTitle || `fase ${step + 1}`}`);
      if (!advanced) break;
    }

    if (seenPhases.size < 2) {
      reporter.addIssue({
        severity: 'P1',
        area: lessonArea(lesson),
        title: 'Jornada visual percorreu poucas fases',
        impact: 'A aula pode estar travando cedo ou ter fluxo superficial demais.',
        evidence: `${seenPhases.size} fases vistas: ${Array.from(seenPhases).join(' → ')}`,
        recommendation: 'Revisar renderização e avanço do pilar.',
      });
    }
  });
}
