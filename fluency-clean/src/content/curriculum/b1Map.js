export const B1_PACKAGES = Object.freeze({
  bridge: { id: 'B1.1', title: 'B1.1 Bridge from A2', goal: 'Transição segura do A2 para o B1: respostas mais longas, ideias conectadas, maior fluência e naturalidade.' },
  pastExperiences: { id: 'B1.2', title: 'B1.2 Past experiences and storytelling', goal: 'Narrar experiências passadas com detalhe, sequência e reações usando Present Perfect e Past Continuous.' },
  opinions: { id: 'B1.3', title: 'B1.3 Opinions, reasons and preferences', goal: 'Expressar opiniões, justificar escolhas, concordar/discordar e usar conectores lógicos com naturalidade.' },
  problems: { id: 'B1.4', title: 'B1.4 Problems, advice and decisions', goal: 'Descrever problemas, dar conselhos, discutir consequências e expressar necessidade/possibilidade.' },
  workStudy: { id: 'B1.5', title: 'B1.5 Work, study and everyday responsibilities', goal: 'Falar de trabalho, estudo, metas, rotina mais complexa, responsabilidades e explicações funcionais.' },
  travel: { id: 'B1.6', title: 'B1.6 Travel, services and unexpected situations', goal: 'Lidar com situações de viagem, serviços, reclamações, pedidos e imprevistos com autonomia.' },
  media: { id: 'B1.7', title: 'B1.7 Media, technology and society basics', goal: 'Falar de mídia, tecnologia, sociedade e expressar opinião simples sobre vantagens e desvantagens.' },
  reviewsCheckpoints: { id: 'B1.8', title: 'B1.8 Reviews and checkpoints B1', goal: 'Integrar habilidades dos seis pilares e confirmar autonomia B1 antes do B2.' },
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

export const B1_GRAMMAR_MAP = [
  item('A2 repair and B1 fluency bridge', 'bridge', 'Reparar lacunas do A2 e preparar o aluno para frases mais complexas e conectadas do B1.', ['repair', 'bridge'], ['Produz frases conectadas sem erro básico de A2']),
  item('Developing longer answers: from sentences to ideas', 'bridge', 'Expandir respostas curtas em ideias mais completas usando conectores e tempo verbal certo.', ['fluency', 'connected-ideas'], ['Produz resposta de 2-3 frases conectadas']),
  item('Past Continuous', 'pastExperiences', 'Descrever ações em progresso no passado.', ['past-continuous'], ['Usa was/were + verb-ing corretamente']),
  item('Past Simple vs Past Continuous contrast', 'pastExperiences', 'Contrastar ação concluída e ação em progresso no passado.', ['past-simple', 'past-continuous'], ['Usa when e while corretamente']),
  item('Present Perfect — introduction', 'pastExperiences', 'Conectar experiências passadas ao presente com have/has + past participle.', ['present-perfect'], ['Forma Present Perfect básico']),
  item('Present Perfect — ever and never', 'pastExperiences', 'Falar de experiências de vida com ever e never.', ['present-perfect', 'ever-never'], ['Usa ever/never em perguntas e negativas']),
  item('Present Perfect vs Past Simple', 'pastExperiences', 'Escolher entre Present Perfect e Past Simple pelo contexto.', ['present-perfect', 'past-simple'], ['Diferencia experiência de vida vs evento específico']),
  item('Present Perfect — for and since', 'pastExperiences', 'Falar de duração de estados ou ações com for e since.', ['present-perfect', 'for-since'], ['Diferencia for vs since']),
  item('Used to — past habits and states', 'pastExperiences', 'Falar de hábitos e estados passados que não existem mais.', ['used-to'], ['Usa used to + infinitivo']),
  item('First Conditional', 'opinions', 'Expressar consequências reais e prováveis com if + present simple / will.', ['first-conditional'], ['Forma first conditional corretamente']),
  item('Zero Conditional', 'opinions', 'Expressar verdades gerais e fatos com if + present simple / present simple.', ['zero-conditional'], ['Diferencia zero vs first conditional']),
  item('Expressing opinions: I think, I believe, In my opinion', 'opinions', 'Formular opiniões com frases introdutórias naturais.', ['opinions', 'phrases'], ['Usa frases de opinião sem tradução literal']),
  item('Linkers: although, however, therefore, besides', 'opinions', 'Conectar ideias com contraste, causa, consequência e adição.', ['linkers', 'connectors'], ['Usa pelo menos 2 linkers em produção']),
  item('Modal verbs: must, have to, should — contrast', 'problems', 'Distinguir obrigação forte, obrigação prática e conselho com must, have to e should.', ['modals', 'obligation', 'advice'], ['Escolhe modal pelo grau de obrigação']),
  item('Advice and possibility: should, ought to, might', 'problems', 'Dar conselhos e expressar possibilidade com should, ought to e might.', ['modals', 'advice', 'possibility'], ['Usa might para possibilidade incerta']),
  item('Gerunds and infinitives basic', 'problems', 'Usar gerúndio e infinitivo com os verbos mais frequentes do B1.', ['gerunds', 'infinitives'], ['Usa gerundio/infinitivo com enjoy, want, plan, avoid, decide']),
  item('Question tags', 'workStudy', 'Fazer pergunta-tag para confirmar informação ou envolver interlocutor.', ['question-tags'], ['Forma question tag com auxiliar correto']),
  item('Future review: will, going to, present continuous', 'workStudy', 'Revisar e diferenciar os três futuros principais no contexto B1.', ['future', 'will', 'going-to'], ['Escolhe futuro pelo contexto com segurança']),
  item('Reported speech — basic statements', 'travel', 'Reportar o que alguém disse com said/told e backshift básico.', ['reported-speech'], ['Reporta frase simples com backshift']),
  item('Indirect questions', 'travel', 'Fazer perguntas indiretas mais educadas e formais.', ['indirect-questions', 'polite'], ['Forma Could you tell me where...?']),
  item('Relative clauses: who, which, that', 'media', 'Conectar informação adicional sobre pessoas e coisas com relative clauses.', ['relative-clauses'], ['Forma relative clause com who, which, that']),
  item('Passive voice present simple', 'media', 'Descrever processos e fatos com passive voice no presente.', ['passive', 'present'], ['Forma is/are + past participle']),
  item('Passive voice past simple', 'media', 'Reportar eventos e resultados com passive voice no passado.', ['passive', 'past'], ['Forma was/were + past participle']),
  item('B1 Grammar Review 1', 'reviewsCheckpoints', 'Revisar Present Perfect, Past Continuous, used to, conditionals e modais.', ['review']),
  item('B1 Grammar Review 2', 'reviewsCheckpoints', 'Revisar reported speech, indirect questions, relative clauses, passive e linkers.', ['review']),
  item('B1 Grammar Checkpoint', 'reviewsCheckpoints', 'Confirmar domínio mínimo de Grammar B1.', ['checkpoint'], ['Atinge nota mínima'], 'grammar-checkpoint'),
];

export const B1_VOCABULARY_MAP = simple([
  'Life events and milestones',
  'Feelings, attitudes and reactions',
  'Connecting ideas — discourse chunks',
  'Telling a story in sequence',
  'Memories and childhood',
  'Time expressions B1',
  'Opinion vocabulary and phrases',
  'Agreeing and disagreeing politely',
  'Preferences, reasons and contrast',
  'Problems and solutions',
  'Advice and recommendations',
  'Work tasks and responsibilities',
  'Study and learning strategies',
  'Personal goals and progress',
  'Travel vocabulary B1',
  'Services and requests',
  'Technology and digital communication',
  'Media and entertainment',
  'Society and community',
  'Phrasal verbs B1 set 1',
  'Vocabulary Review B1',
  'Vocabulary Checkpoint B1',
], (n) => n <= 3 ? 'bridge' : n <= 6 ? 'pastExperiences' : n <= 9 ? 'opinions' : n <= 11 ? 'problems' : n <= 14 ? 'workStudy' : n <= 16 ? 'travel' : n <= 20 ? 'media' : 'reviewsCheckpoints', 'Vocabulário B1 funcional e contextualizado', 'vocabulary').map((lesson) => {
  if (lesson.title === 'Vocabulary Checkpoint B1') return { ...lesson, checkpoint: 'vocabulary-checkpoint' };
  if (lesson.title === 'Vocabulary Review B1') return { ...lesson, checkpoint: 'vocabulary-review' };
  return lesson;
});

export const B1_READING_MAP = simple([
  'A personal letter: bridging A2 and B1',
  'A longer personal experience story',
  'An email about a past event',
  'A travel blog post',
  'A personal story with sequence and detail',
  'A review with opinions and reasons',
  'A short opinion article',
  'An advice column',
  'A study plan blog post',
  'A health information leaflet',
  'A work update message',
  'A service complaint and resolution',
  'A community news article',
  'A simple magazine extract',
  'Reading for sequence and timeline',
  'Reading for opinion and supporting reasons',
  'Reading for problem and solution',
  'Reading for contrast and concession',
  'Reading Review B1',
  'Reading Checkpoint B1',
], (n) => n <= 2 ? 'bridge' : n <= 5 ? 'pastExperiences' : n <= 8 ? 'opinions' : n <= 11 ? 'problems' : n <= 13 ? 'workStudy' : n <= 15 ? 'travel' : n <= 18 ? 'media' : 'reviewsCheckpoints', 'Leitura B1 com sequência, opinião e inferência', 'reading').map((lesson) => lesson.title === 'Reading Checkpoint B1' ? { ...lesson, checkpoint: 'reading-checkpoint' } : lesson);

export const B1_LISTENING_MAP = simple([
  'A longer weekend conversation',
  'A story about a past trip',
  'A problem at work conversation',
  'A doctor appointment dialogue',
  'Listening for sequence markers',
  'A podcast extract with opinion',
  'Listening for opinion and reason',
  'A customer service call',
  'A conversation about problems and advice',
  'A discussion about plans and goals',
  'A study plan conversation',
  'A radio announcement',
  'Listening for key details B1',
  'A travel problem dialogue',
  'A conversation about technology',
  'A simple news clip',
  'Listening Review B1',
  'Listening Checkpoint B1',
], (n) => n <= 2 ? 'bridge' : n <= 5 ? 'pastExperiences' : n <= 7 ? 'opinions' : n <= 10 ? 'problems' : n <= 12 ? 'workStudy' : n <= 14 ? 'travel' : n <= 16 ? 'media' : 'reviewsCheckpoints', 'Escuta B1 em diálogos e monólogos controlados', 'listening').map((lesson) => lesson.title === 'Listening Checkpoint B1' ? { ...lesson, checkpoint: 'listening-checkpoint' } : lesson);

export const B1_SPEAKING_MAP = simple([
  'Talk about a past experience with more detail',
  'Speak for 1 minute: where you grew up',
  'Connect ideas when speaking',
  'Tell a story with sequence and background',
  'Describe a memorable experience',
  'Talk about childhood memories and used to',
  'Give an opinion about a topic',
  'Agree and disagree politely',
  'Compare two options with reasons',
  'Explain a problem and ask for help',
  'Give advice with modal verbs',
  'Handle a service situation with a problem',
  'Discuss work and responsibilities',
  'Talk about study goals and plans',
  'Handle a travel problem',
  'Speak for 2 minutes about your week',
  'Discuss technology and habits',
  'Speaking Review B1',
  'Speaking Checkpoint B1',
], (n) => n <= 3 ? 'bridge' : n <= 6 ? 'pastExperiences' : n <= 9 ? 'opinions' : n <= 11 ? 'problems' : n <= 13 ? 'workStudy' : n <= 15 ? 'travel' : n <= 17 ? 'media' : 'reviewsCheckpoints', 'Speaking B1 com autonomia e desenvolvimento de ideias', 'speaking').map((lesson) => lesson.title === 'Speaking Checkpoint B1' ? { ...lesson, checkpoint: 'speaking-checkpoint' } : lesson);

export const B1_WRITING_MAP = simple([
  'Write a longer connected paragraph',
  'Write a personal message with past and present',
  'Write a story about a past experience',
  'Write a travel blog entry',
  'Write an email explaining a past event',
  'Write a review with opinion and reasons',
  'Write an opinion paragraph',
  'Write an advice message',
  'Write a problem email',
  'Write a complaint message',
  'Write a work update',
  'Write a study plan with goals',
  'Write about a travel problem',
  'Write a comparison paragraph',
  'Write about technology and its effects',
  'Write a community message or comment',
  'Writing Review B1',
  'Writing Checkpoint B1',
], (n) => n <= 2 ? 'bridge' : n <= 5 ? 'pastExperiences' : n <= 8 ? 'opinions' : n <= 10 ? 'problems' : n <= 12 ? 'workStudy' : n <= 14 ? 'travel' : n <= 16 ? 'media' : 'reviewsCheckpoints', 'Writing B1 organizado, conectado e funcional', 'writing').map((lesson) => lesson.title === 'Writing Checkpoint B1' ? { ...lesson, checkpoint: 'writing-checkpoint' } : lesson);

export const B1_PILLAR_MAPS = Object.freeze({
  grammar: B1_GRAMMAR_MAP,
  vocabulary: B1_VOCABULARY_MAP,
  reading: B1_READING_MAP,
  listening: B1_LISTENING_MAP,
  speaking: B1_SPEAKING_MAP,
  writing: B1_WRITING_MAP,
});

export const B1_EXIT_CRITERIA = Object.freeze({
  grammar: 78,
  vocabulary: 82,
  reading: 78,
  listening: 74,
  speaking: 70,
  writing: 74,
  finalCheckpoint: true,
});

export function getB1Package(packageKey) { return B1_PACKAGES[packageKey] || B1_PACKAGES.bridge; }
export function getB1PillarMap(pillar) { return B1_PILLAR_MAPS[pillar] || []; }
export function getB1TotalLessonCount() { return Object.values(B1_PILLAR_MAPS).reduce((total, lessons) => total + lessons.length, 0); }
