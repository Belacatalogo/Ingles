export const A2_PACKAGES = Object.freeze({
  bridge: { id: 'A2.1', title: 'A2.1 A1 Bridge and survival expansion', goal: 'Reforçar A1 e expandir para situações reais com mais segurança, sem pular lacunas.' },
  pastStories: { id: 'A2.2', title: 'A2.2 Past stories and experiences', goal: 'Narrar ações passadas, experiências simples, datas, viagens e eventos cotidianos.' },
  plansAndNow: { id: 'A2.3', title: 'A2.3 Now, plans and near future', goal: 'Falar do agora, planos, intenções e compromissos com present continuous e going to.' },
  comparisonsNeeds: { id: 'A2.4', title: 'A2.4 Choices, quantities and comparisons', goal: 'Comparar opções, falar de quantidade, necessidade, preferência e decisões práticas.' },
  communicationTasks: { id: 'A2.5', title: 'A2.5 Everyday communication tasks', goal: 'Lidar com convites, pedidos, problemas simples, mensagens, relatos e pequenas negociações.' },
  reviewsCheckpoints: { id: 'A2.6', title: 'A2.6 Reviews and checkpoints', goal: 'Revisar, integrar habilidades e confirmar domínio do A2 antes do B1.' },
});

function slug(title) {
  return String(title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function item(title, packageKey, objective = '', tags = [], mastery = [], checkpoint = '') {
  return { title, packageKey, objective, tags, mastery, checkpoint };
}
function simple(titles, packageRules, objectivePrefix, tag) {
  return titles.map((title, index) => item(title, packageRules(index + 1), `${objectivePrefix}: ${title}.`, [tag, slug(title)]));
}

export const A2_GRAMMAR_MAP = [
  item('A1 repair: sentence order and auxiliaries', 'bridge', 'Reparar lacunas de ordem, auxiliares e frases básicas antes do A2.', ['repair', 'word-order'], ['Monta frase completa', 'Usa auxiliar correto']),
  item('Past Simple — regular verbs affirmative', 'pastStories', 'Narrar ações passadas com verbos regulares.', ['past-simple', 'regular'], ['Usa -ed em verbos regulares']),
  item('Past Simple — irregular verbs affirmative', 'pastStories', 'Usar verbos irregulares frequentes em relatos simples.', ['past-simple', 'irregular'], ['Reconhece forma irregular básica']),
  item('Past Simple — negative', 'pastStories', 'Negar passado com did not + verbo base.', ['past-simple', 'negative'], ['Usa did not + base verb']),
  item('Past Simple — questions', 'pastStories', 'Fazer perguntas no passado com did + subject + base verb.', ['past-simple', 'questions'], ['Forma Did you...?']),
  item('Past time expressions', 'pastStories', 'Usar yesterday, last week, ago e datas simples.', ['past-time'], ['Localiza evento no passado']),
  item('There was / there were', 'pastStories', 'Descrever existência no passado.', ['there-was', 'there-were'], ['Diferencia singular/plural no passado']),
  item('Present Continuous — actions now', 'plansAndNow', 'Falar de ações acontecendo agora.', ['present-continuous', 'now'], ['Usa be + verb-ing']),
  item('Present Continuous — temporary situations', 'plansAndNow', 'Falar de situações temporárias e mudanças.', ['present-continuous', 'temporary'], ['Diferencia rotina vs agora']),
  item('Present Simple vs Present Continuous', 'plansAndNow', 'Comparar rotina com ação atual.', ['present-simple', 'present-continuous'], ['Escolhe tempo verbal pelo contexto']),
  item('Future with going to — plans', 'plansAndNow', 'Falar de planos e intenções próximas.', ['going-to', 'future'], ['Usa be going to + verb']),
  item('Future with going to — predictions from evidence', 'plansAndNow', 'Fazer previsões simples com evidência visível.', ['going-to', 'prediction'], ['Diferencia plano e previsão']),
  item('Would like / want / need', 'communicationTasks', 'Fazer pedidos, preferências e necessidades com educação.', ['requests', 'want', 'need'], ['Usa would like em pedidos']),
  item('Countable and uncountable nouns', 'comparisonsNeeds', 'Diferenciar substantivos contáveis e incontáveis.', ['countable', 'uncountable'], ['Usa a/an, some, plural e singular corretamente']),
  item('Some / any', 'comparisonsNeeds', 'Usar some e any em afirmações, negativas e perguntas.', ['some', 'any'], ['Escolhe some/any pelo tipo de frase']),
  item('Much / many / a lot of', 'comparisonsNeeds', 'Falar de quantidade com much, many e a lot of.', ['quantifiers'], ['Diferencia much/many']),
  item('Comparatives', 'comparisonsNeeds', 'Comparar pessoas, objetos e lugares.', ['comparatives'], ['Usa -er/more than']),
  item('Superlatives', 'comparisonsNeeds', 'Falar do maior/menor/melhor/pior em grupos simples.', ['superlatives'], ['Usa the -est / the most']),
  item('Should / shouldn’t', 'communicationTasks', 'Dar conselho simples.', ['modal', 'should'], ['Usa should + verbo base']),
  item('Have to / don’t have to', 'communicationTasks', 'Falar de obrigação e ausência de obrigação.', ['have-to'], ['Usa have to / don’t have to']),
  item('Can / could for requests', 'communicationTasks', 'Fazer pedidos educados com can/could.', ['requests', 'could'], ['Usa could em pedido educado']),
  item('Object pronouns review and expansion', 'communicationTasks', 'Usar pronomes objeto em comunicação real.', ['object-pronouns'], ['Usa me/him/her/us/them corretamente']),
  item('Possessive pronouns: mine, yours, his, hers', 'comparisonsNeeds', 'Evitar repetição usando pronomes possessivos.', ['possessive-pronouns'], ['Diferencia my vs mine']),
  item('Adverbs of manner', 'communicationTasks', 'Descrever como ações acontecem: slowly, carefully, well.', ['adverbs'], ['Usa adverb after verb']),
  item('Because / so / but / and review', 'communicationTasks', 'Conectar ideias com causa, consequência, contraste e soma.', ['connectors'], ['Conecta frases simples com lógica']),
  item('A2 Grammar Review 1', 'reviewsCheckpoints', 'Revisar passado, expressões de tempo e there was/were.', ['review']),
  item('A2 Grammar Review 2', 'reviewsCheckpoints', 'Revisar presente contínuo, futuro, quantidade, comparação e modais.', ['review']),
  item('A2 Grammar Checkpoint', 'reviewsCheckpoints', 'Confirmar domínio mínimo de Grammar A2.', ['checkpoint'], ['Atinge nota mínima'], 'grammar-checkpoint'),
];

export const A2_VOCABULARY_MAP = simple([
  'Past events and dates',
  'Travel basics',
  'Transportation',
  'Hotels and accommodation',
  'Restaurants and ordering',
  'Shopping and prices',
  'Health and pharmacy',
  'Directions and city services',
  'Work tasks and schedules',
  'Study and learning habits',
  'Technology and phone problems',
  'Household problems',
  'Clothes and sizes',
  'Food quantities and containers',
  'Personality adjectives',
  'Comparing places and products',
  'Invitations and social plans',
  'Feelings and opinions',
  'Common phrasal chunks A2',
  'Vocabulary Review A2',
], (n) => n <= 2 ? 'bridge' : n <= 8 ? 'pastStories' : n <= 12 ? 'plansAndNow' : n <= 16 ? 'comparisonsNeeds' : n <= 19 ? 'communicationTasks' : 'reviewsCheckpoints', 'Vocabulário funcional A2', 'vocabulary').map((lesson) => lesson.title === 'Vocabulary Review A2' ? { ...lesson, checkpoint: 'vocabulary-review' } : lesson);

export const A2_READING_MAP = simple([
  'A short past story',
  'A travel message',
  'A hotel booking note',
  'A restaurant review',
  'A shopping receipt and message',
  'A health advice note',
  'A city directions text',
  'A work schedule update',
  'A study plan email',
  'A phone problem chat',
  'A weekend plan with going to',
  'A comparison of two products',
  'A simple invitation',
  'A problem and solution text',
  'Reading for past sequence',
  'Reading for plans and intentions',
  'Reading for comparisons',
  'Reading for advice and obligation',
  'Reading Review A2',
  'Reading Checkpoint A2',
], (n) => n <= 2 ? 'bridge' : n <= 7 ? 'pastStories' : n <= 11 ? 'plansAndNow' : n <= 16 ? 'comparisonsNeeds' : n <= 18 ? 'communicationTasks' : 'reviewsCheckpoints', 'Leitura A2 com sequência, intenção e detalhe', 'reading').map((lesson) => lesson.title === 'Reading Checkpoint A2' ? { ...lesson, checkpoint: 'reading-checkpoint' } : lesson);

export const A2_LISTENING_MAP = simple([
  'Past weekend conversation',
  'Travel information',
  'Hotel check-in dialogue',
  'Ordering in a restaurant',
  'Shopping for clothes',
  'At the pharmacy',
  'Asking for directions',
  'Work schedule changes',
  'Study plan conversation',
  'Phone problem support',
  'Making plans for the weekend',
  'Comparing two options',
  'Accepting and refusing invitations',
  'Giving simple advice',
  'Listening for sequence markers',
  'Listening for future plans',
  'Listening Review A2',
  'Listening Checkpoint A2',
], (n) => n <= 2 ? 'bridge' : n <= 7 ? 'pastStories' : n <= 11 ? 'plansAndNow' : n <= 14 ? 'communicationTasks' : n <= 16 ? 'comparisonsNeeds' : 'reviewsCheckpoints', 'Escuta A2 com diálogos funcionais', 'listening').map((lesson) => lesson.title === 'Listening Checkpoint A2' ? { ...lesson, checkpoint: 'listening-checkpoint' } : lesson);

export const A2_SPEAKING_MAP = simple([
  'Talk about yesterday',
  'Tell a short past story',
  'Talk about a trip',
  'Check in at a hotel',
  'Order food politely',
  'Buy clothes and ask prices',
  'Explain a simple health problem',
  'Ask and give directions',
  'Talk about work schedule',
  'Talk about study plans',
  'Explain a phone problem',
  'Make weekend plans',
  'Compare two choices',
  'Invite, accept and refuse',
  'Give simple advice',
  'Talk about obligations',
  'Speak for 60 seconds about your week',
  'Speaking Checkpoint A2',
], (n) => n <= 2 ? 'bridge' : n <= 8 ? 'pastStories' : n <= 12 ? 'plansAndNow' : n <= 16 ? 'communicationTasks' : n <= 17 ? 'reviewsCheckpoints' : 'reviewsCheckpoints', 'Speaking A2 em situações reais', 'speaking').map((lesson) => lesson.title === 'Speaking Checkpoint A2' ? { ...lesson, checkpoint: 'speaking-checkpoint' } : lesson);

export const A2_WRITING_MAP = simple([
  'Write about yesterday',
  'Write a short past story',
  'Write a travel message',
  'Write a hotel request',
  'Write a restaurant review',
  'Write a shopping message',
  'Write about a health problem',
  'Write directions',
  'Write a work schedule message',
  'Write a study plan',
  'Write about a phone problem',
  'Write weekend plans',
  'Compare two products',
  'Write an invitation and reply',
  'Write advice with should',
  'Write about obligations',
  'Writing Review A2',
  'Writing Checkpoint A2',
], (n) => n <= 2 ? 'bridge' : n <= 8 ? 'pastStories' : n <= 12 ? 'plansAndNow' : n <= 16 ? 'communicationTasks' : 'reviewsCheckpoints', 'Writing A2 funcional e guiado', 'writing').map((lesson) => lesson.title === 'Writing Checkpoint A2' ? { ...lesson, checkpoint: 'writing-checkpoint' } : lesson);

export const A2_PILLAR_MAPS = Object.freeze({
  grammar: A2_GRAMMAR_MAP,
  vocabulary: A2_VOCABULARY_MAP,
  reading: A2_READING_MAP,
  listening: A2_LISTENING_MAP,
  speaking: A2_SPEAKING_MAP,
  writing: A2_WRITING_MAP,
});

export const A2_EXIT_CRITERIA = Object.freeze({
  grammar: 76,
  vocabulary: 80,
  reading: 76,
  listening: 72,
  speaking: 68,
  writing: 72,
  finalCheckpoint: true,
});

export function getA2Package(packageKey) { return A2_PACKAGES[packageKey] || A2_PACKAGES.bridge; }
export function getA2PillarMap(pillar) { return A2_PILLAR_MAPS[pillar] || []; }
export function getA2TotalLessonCount() { return Object.values(A2_PILLAR_MAPS).reduce((total, lessons) => total + lessons.length, 0); }
