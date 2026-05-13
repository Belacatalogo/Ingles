export const CEFR_LEVELS = Object.freeze(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);

export const LEVEL_MASTERY_PILLARS = Object.freeze([
  'grammar',
  'vocabulary',
  'reading',
  'listening',
  'speaking',
  'writing',
]);

export const LEVEL_MASTERY_WEIGHTS = Object.freeze({
  grammar: 15,
  vocabulary: 15,
  reading: 15,
  listening: 20,
  speaking: 20,
  writing: 15,
});

export const LEVEL_PASSING_RULES = Object.freeze({
  lessonCompletionPercent: 100,
  checkpointAveragePercent: 80,
  finalExamOverallPercent: 80,
  minimumPillarPercent: 75,
  minimumSpeakingPercent: 75,
  minimumWritingPercent: 75,
  requiresHumanOrAiReviewForProductiveSkills: true,
  canAdvanceByLessonsOnly: false,
});

export const LEVEL_MASTERY_FRAMEWORK = Object.freeze({
  A1: Object.freeze({
    label: 'Beginner',
    unlocks: 'A2',
    target: 'Entender e produzir inglês básico em situações pessoais e muito previsíveis.',
    canDo: [
      'Apresentar-se com nome, idade, país, cidade, família, rotina e preferências simples.',
      'Entender textos curtos e previsíveis com evidência textual.',
      'Entender áudios curtos com fala clara sobre dados pessoais e rotina.',
      'Responder perguntas básicas sem depender de tradução palavra por palavra.',
      'Escrever perfis, apresentações e parágrafos curtos com frases simples.',
    ],
    finalExamMustInclude: [
      'Reading: perfil ou texto curto A1 com perguntas de evidência.',
      'Listening: diálogo curto sem transcript na primeira escuta.',
      'Speaking: apresentação pessoal e resposta a perguntas simples.',
      'Writing: texto curto revisado sobre si, família ou rotina.',
      'Grammar/Vocabulary: estruturas essenciais usadas em contexto.',
    ],
  }),
  A2: Object.freeze({
    label: 'Elementary',
    unlocks: 'B1',
    target: 'Participar de interações simples sobre rotina, necessidades, planos imediatos e experiências muito comuns.',
    canDo: [
      'Falar de rotina, compras, localização, tempo, planos simples e experiências básicas.',
      'Entender textos curtos práticos como mensagens, instruções e descrições simples.',
      'Entender diálogos claros sobre situações cotidianas.',
      'Escrever mensagens, descrições e respostas curtas com organização simples.',
      'Usar tempos básicos e conectores simples com controle suficiente.',
    ],
    finalExamMustInclude: [
      'Reading: mensagens/instruções curtas com detalhes explícitos.',
      'Listening: diálogo cotidiano com informações específicas.',
      'Speaking: roleplay simples e descrição de rotina/plano.',
      'Writing: mensagem ou parágrafo funcional.',
      'Grammar/Vocabulary: presente, passado básico, futuro próximo e vocabulário cotidiano.',
    ],
  }),
  B1: Object.freeze({
    label: 'Intermediate',
    unlocks: 'B2',
    target: 'Comunicar-se em situações comuns, narrar experiências e explicar opiniões simples com autonomia limitada.',
    canDo: [
      'Narrar experiências, planos e acontecimentos com sequência lógica.',
      'Entender textos claros sobre assuntos familiares.',
      'Entender áudios moderados sobre temas conhecidos.',
      'Manter conversas simples com justificativas e exemplos.',
      'Escrever textos organizados com introdução, desenvolvimento e conclusão simples.',
    ],
    finalExamMustInclude: [
      'Reading: texto informativo/opinativo simples com inferência básica.',
      'Listening: conversa ou relato em velocidade moderada.',
      'Speaking: relato de experiência e opinião com justificativa.',
      'Writing: e-mail, relato ou opinião curta estruturada.',
      'Grammar/Vocabulary: tempos narrativos, comparações, modais e conectores.',
    ],
  }),
  B2: Object.freeze({
    label: 'Upper-intermediate',
    unlocks: 'C1',
    target: 'Interagir com boa independência, defender opiniões e compreender conteúdos autênticos moderadamente complexos.',
    canDo: [
      'Discutir temas abstratos e concretos com argumentos claros.',
      'Entender textos mais longos com opinião, nuance e estrutura.',
      'Entender falas naturais com alguma variação de ritmo e sotaque.',
      'Falar com fluência suficiente para conversas prolongadas.',
      'Escrever textos argumentativos, profissionais e explicativos com coesão.',
    ],
    finalExamMustInclude: [
      'Reading: artigo ou ensaio curto com opinião e inferência.',
      'Listening: entrevista, debate curto ou apresentação natural.',
      'Speaking: discussão argumentativa e resposta a follow-ups.',
      'Writing: essay, e-mail profissional ou análise curta.',
      'Grammar/Vocabulary: precisão, colocação, conectores e registro.',
    ],
  }),
  C1: Object.freeze({
    label: 'Advanced',
    unlocks: 'C2',
    target: 'Usar inglês de forma flexível, precisa e organizada em contextos acadêmicos, profissionais e sociais complexos.',
    canDo: [
      'Compreender textos longos com linguagem implícita e estrutura complexa.',
      'Compreender fala natural extensa com nuances.',
      'Expressar ideias complexas com fluência, precisão e adaptação de registro.',
      'Escrever textos claros, bem estruturados e estilisticamente adequados.',
      'Reformular, argumentar e sintetizar informação de várias fontes.',
    ],
    finalExamMustInclude: [
      'Reading: texto longo com inferência, tom e propósito.',
      'Listening: palestra/entrevista natural com detalhes e intenção.',
      'Speaking: apresentação e discussão complexa.',
      'Writing: texto formal estruturado com síntese/argumentação.',
      'Grammar/Vocabulary: precisão avançada, nuance e registro.',
    ],
  }),
  C2: Object.freeze({
    label: 'Proficient',
    unlocks: null,
    target: 'Compreender e produzir inglês com alto grau de precisão, naturalidade, nuance e controle de registro.',
    canDo: [
      'Entender praticamente qualquer texto ou fala com nuances e referências implícitas.',
      'Sintetizar informações complexas de múltiplas fontes.',
      'Argumentar com precisão, estilo e flexibilidade.',
      'Escrever textos sofisticados em registros diferentes.',
      'Adaptar linguagem a contexto, público, tom e objetivo com naturalidade.',
    ],
    finalExamMustInclude: [
      'Reading: texto complexo com nuance, ironia, implicatura ou estilo.',
      'Listening: fala natural complexa com detalhes implícitos.',
      'Speaking: debate/apresentação com linguagem precisa e espontânea.',
      'Writing: texto sofisticado com controle de registro e estilo.',
      'Grammar/Vocabulary: precisão quase total, idiomaticidade e nuance.',
    ],
  }),
});

export function getLevelMasteryFramework(level = 'A1') {
  return LEVEL_MASTERY_FRAMEWORK[level] || null;
}

export function getNextLevel(level = 'A1') {
  return LEVEL_MASTERY_FRAMEWORK[level]?.unlocks || null;
}

export function calculateWeightedLevelScore(pillarScores = {}) {
  const totalWeight = LEVEL_MASTERY_PILLARS.reduce((sum, pillar) => sum + (LEVEL_MASTERY_WEIGHTS[pillar] || 0), 0);
  if (!totalWeight) return 0;
  const weighted = LEVEL_MASTERY_PILLARS.reduce((sum, pillar) => {
    const score = Number(pillarScores[pillar] ?? 0);
    const safeScore = Number.isFinite(score) ? Math.max(0, Math.min(100, score)) : 0;
    return sum + safeScore * (LEVEL_MASTERY_WEIGHTS[pillar] || 0);
  }, 0);
  return Math.round(weighted / totalWeight);
}

export function evaluateLevelAdvancement({ lessonCompletionPercent = 0, checkpointAveragePercent = 0, finalExamPillarScores = {}, speakingReviewed = false, writingReviewed = false } = {}) {
  const overall = calculateWeightedLevelScore(finalExamPillarScores);
  const pillarIssues = LEVEL_MASTERY_PILLARS.filter((pillar) => Number(finalExamPillarScores[pillar] ?? 0) < LEVEL_PASSING_RULES.minimumPillarPercent);
  const issues = [];

  if (lessonCompletionPercent < LEVEL_PASSING_RULES.lessonCompletionPercent) issues.push('Concluir 100% das aulas do nível.');
  if (checkpointAveragePercent < LEVEL_PASSING_RULES.checkpointAveragePercent) issues.push('Atingir média mínima de 80% nos checkpoints.');
  if (overall < LEVEL_PASSING_RULES.finalExamOverallPercent) issues.push('Atingir 80% ou mais na prova final do nível.');
  if (pillarIssues.length) issues.push(`Reforçar pilares abaixo de 75%: ${pillarIssues.join(', ')}.`);
  if (Number(finalExamPillarScores.speaking ?? 0) < LEVEL_PASSING_RULES.minimumSpeakingPercent) issues.push('Melhorar Speaking antes de avançar.');
  if (Number(finalExamPillarScores.writing ?? 0) < LEVEL_PASSING_RULES.minimumWritingPercent) issues.push('Melhorar Writing antes de avançar.');
  if (LEVEL_PASSING_RULES.requiresHumanOrAiReviewForProductiveSkills && !speakingReviewed) issues.push('Speaking precisa de revisão por IA/professor.');
  if (LEVEL_PASSING_RULES.requiresHumanOrAiReviewForProductiveSkills && !writingReviewed) issues.push('Writing precisa de revisão por IA/professor.');

  return Object.freeze({
    canAdvance: issues.length === 0,
    overall,
    issues,
    nextAction: issues.length ? 'Revisar pontos fracos antes de liberar o próximo nível.' : 'Liberar próximo nível.',
  });
}
