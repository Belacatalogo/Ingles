export const A1_PACKAGES = Object.freeze({
  foundations: { id: 'A1.1', title: 'A1.1 Foundations', goal: 'Identidade básica: cumprimentar, dizer nome, país, cidade e usar pronomes + verbo to be com segurança.' },
  familyDescription: { id: 'A1.2', title: 'A1.2 Family, objects and description', goal: 'Descrição simples: família, objetos, sala, adjetivos, artigos, plural, demonstrativos e posse.' },
  routinePresent: { id: 'A1.3', title: 'A1.3 Routine and Present Simple', goal: 'Rotina e hábitos com present simple, horas, dias, frequência e ações cotidianas.' },
  practicalSituations: { id: 'A1.4', title: 'A1.4 Practical situations', goal: 'Inglês de sobrevivência: lugares, casa, comida, roupas, clima, sentimentos, pedidos e instruções.' },
  reviewsCheckpoints: { id: 'A1.5', title: 'A1.5 Reviews and checkpoints', goal: 'Revisar, diagnosticar lacunas e confirmar domínio real do A1 antes de liberar A2.' },
});

function item(title, packageKey, objective = '', tags = [], mastery = [], checkpoint = '', id = '') {
  return id ? { title, packageKey, objective, tags, mastery, checkpoint, id } : { title, packageKey, objective, tags, mastery, checkpoint };
}
function slug(title) { return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function simple(titles, packageRules, objectivePrefix, tag) {
  return titles.map((title, index) => item(title, packageRules(index + 1), `${objectivePrefix}: ${title}.`, [tag, slug(title)]));
}

export const A1_GRAMMAR_MAP = [
  item('Subject pronouns', 'foundations', 'Reconhecer e usar I, you, he, she, it, we, they em frases simples.', ['pronouns'], ['Escolhe pronome correto', 'Substitui nomes por pronomes']),
  item('Verb to be — affirmative', 'foundations', 'Formar frases afirmativas com am, is e are.', ['to-be', 'affirmative'], ['Usa I am', 'Usa he/she/it is', 'Usa you/we/they are']),
  item('Verb to be — negative', 'foundations', 'Negar frases simples com am not, is not e are not.', ['to-be', 'negative'], ['Posiciona not corretamente', 'Evita I not am / she not is']),
  item('Verb to be — questions', 'foundations', 'Fazer perguntas simples invertendo o verbo to be.', ['to-be', 'questions'], ['Forma Am I / Are you / Is she']),
  item('Short answers with to be', 'foundations', 'Responder perguntas com Yes/No usando respostas curtas naturais.', ['to-be', 'short-answers'], ['Yes, I am', 'No, she is not']),
  item('Possessive adjectives: my, your, his, her', 'foundations', 'Usar possessivos básicos para nome, família, objetos e informações pessoais.', ['possessives'], ['Diferencia my/your/his/her']),
  item('Articles: a / an', 'familyDescription', 'Usar a/an antes de substantivos singulares contáveis.', ['articles'], ['Usa a/an por som inicial']),
  item('Plural nouns', 'familyDescription', 'Formar plural regular e reconhecer plurais básicos frequentes.', ['plural'], ['Adiciona -s quando adequado']),
  item('This / that / these / those', 'familyDescription', 'Apontar objetos/pessoas perto e longe no singular e plural.', ['demonstratives'], ['Diferencia this/that/these/those']),
  item('There is / there are', 'familyDescription', 'Descrever existência de pessoas e objetos em lugares.', ['there-is', 'there-are'], ['Usa singular/plural corretamente']),
  item('Have / has', 'familyDescription', 'Falar de posse e relações simples com have/has.', ['have-has'], ['Usa have/has por sujeito']),
  item('Simple adjectives', 'familyDescription', 'Usar adjetivos simples para descrever pessoas, objetos e lugares.', ['adjectives'], ['Coloca adjetivo em ordem natural']),
  item('Basic word order', 'familyDescription', 'Organizar sujeito + verbo + complemento em frases A1.', ['word-order'], ['Monta frases curtas corretas']),
  item('Present Simple — I / you / we / they', 'routinePresent', 'Falar de rotina com verbos no presente para I, you, we, they.', ['present-simple'], ['Usa verbo base']),
  item('Present Simple — he / she / it', 'routinePresent', 'Usar -s/-es em he, she, it no present simple.', ['present-simple', 'third-person'], ['Adiciona -s em he/she/it']),
  item('Present Simple negatives', 'routinePresent', 'Negar rotina com do not e does not.', ['present-simple', 'negative'], ['Usa do not/does not']),
  item('Present Simple questions', 'routinePresent', 'Perguntar sobre rotina com do/does.', ['present-simple', 'questions'], ['Forma Do you...?', 'Forma Does she...?']),
  item('Adverbs of frequency', 'routinePresent', 'Dizer frequência com always, usually, sometimes, never.', ['frequency'], ['Usa frequência em rotina']),
  item('Prepositions of place', 'routinePresent', 'Descrever localização com in, on, under, next to, near.', ['prepositions', 'place'], ['Responde where']),
  item('Prepositions of time', 'routinePresent', 'Usar in, on e at em horários, dias e períodos simples.', ['prepositions', 'time'], ['at + hora', 'on + dia', 'in + período']),
  item('Can / can’t', 'practicalSituations', 'Falar de habilidade e possibilidade com can/can’t.', ['modal', 'can'], ['Usa can + verbo base']),
  item('Imperatives', 'practicalSituations', 'Entender e usar instruções simples.', ['imperatives'], ['Entende comandos de sala']),
  item('Object pronouns', 'practicalSituations', 'Usar me, you, him, her, it, us, them como objeto.', ['object-pronouns'], ['Diferencia he/him e she/her']),
  item('Basic conjunctions: and, but, because', 'practicalSituations', 'Conectar ideias simples com and, but e because.', ['conjunctions'], ['Une frases sem exagerar']),
  item('Review Grammar A1 part 1', 'reviewsCheckpoints', 'Revisar pronomes, to be, possessivos, artigos, plural e descrição.', ['review']),
  item('Review Grammar A1 part 2', 'reviewsCheckpoints', 'Revisar present simple, preposições, can, imperatives e conectores.', ['review']),
  item('Grammar Checkpoint A1', 'reviewsCheckpoints', 'Confirmar domínio mínimo de Grammar A1 antes do avanço.', ['checkpoint'], ['Atinge nota mínima'], 'grammar-checkpoint'),
  item('There is / there are — house description', 'practicalSituations', 'Usar there is / there are para descrever cômodos e objetos de uma casa.', ['there-is', 'house', 'deep'], ['Descreve cômodos com there is/are'], '', 'A1-GRAMMAR-010-HOUSE'),
  item('My, your, his, her + simple be statements', 'familyDescription', 'Usar possessivos básicos em contexto de vida pessoal com verbo to be.', ['possessives', 'personal-life', 'deep'], ['Usa my/your/his/her em contexto pessoal'], '', 'A1-GRAMMAR-021-PERSONAL'),
];

export const A1_VOCABULARY_MAP = [
  ...simple(['Greetings','Personal information','Numbers 0–100','Countries and nationalities','Family','Jobs','Classroom objects','Common adjectives','Colors','Days and months','Time','Daily routine verbs','Food and drinks','Places in town','House and furniture','Clothes','Weather','Basic feelings','Common verbs','Review Vocabulary A1'], (n) => n <= 5 ? 'foundations' : n <= 10 ? 'familyDescription' : n <= 12 ? 'routinePresent' : n <= 19 ? 'practicalSituations' : 'reviewsCheckpoints', 'Vocabulário essencial A1', 'vocabulary').map((lesson) => {
    if (lesson.title === 'Jobs') return { ...lesson, title: 'Jobs and professions' };
    if (lesson.title === 'Time') return { ...lesson, title: 'Telling the time' };
    if (lesson.title === 'Review Vocabulary A1') return { ...lesson, checkpoint: 'vocabulary-review' };
    return lesson;
  }),
  item('Personal life words', 'familyDescription', 'Vocabulário de vida pessoal: telefone, endereço, e-mail, hobbies e aulas.', ['personal-life', 'deep'], ['Usa phone number, email address, hobby'], '', 'A1-VOCABULARY-021-PERSONAL'),
];
globalThis.A1_VOCABULARY_MAP = A1_VOCABULARY_MAP;
export const A1_READING_MAP = [
  ...simple(['Short introductions','A simple profile','A family description','A classroom text','A daily routine','A simple message','A short email','A café menu','A timetable','A description of a house','A simple work profile','A weekend plan','Reading for names and numbers','Reading for places','Reading for routine actions','Main idea in short texts','Details in short texts','Vocabulary from context','Reading Review A1','Reading Checkpoint A1'], (n) => n <= 3 ? 'foundations' : n <= 4 ? 'familyDescription' : n <= 7 ? 'routinePresent' : n <= 18 ? 'practicalSituations' : 'reviewsCheckpoints', 'Leitura A1 com evidência textual', 'reading').map((lesson) => lesson.title === 'Reading Checkpoint A1' ? { ...lesson, checkpoint: 'reading-checkpoint' } : lesson),
  item('Vocabulary from context — clothes and weather', 'practicalSituations', 'Ler texto curto sobre roupas e clima e inferir vocabulário pelo contexto.', ['reading', 'clothes', 'weather', 'deep'], ['Infere significado pelo contexto'], '', 'A1-READING-018-CLOTHES'),
  item('A personal life profile', 'familyDescription', 'Ler perfil pessoal A1.2 e responder com evidência textual.', ['reading', 'personal-life', 'deep'], ['Responde com evidência do texto'], '', 'A1-READING-021-PERSONAL'),
];
export const A1_LISTENING_MAP = [
  ...simple(['Greetings and names','Spelling names','Numbers and phone numbers','Countries and cities','Classroom instructions','Family introductions','Daily routine','Time and schedules','Ordering food','Asking where something is','Simple directions','Weather and feelings','Short conversations','Listening for names','Listening for numbers','Listening for places','Listening Review A1','Listening Checkpoint A1'], (n) => n <= 4 ? 'foundations' : n <= 6 ? 'familyDescription' : n <= 8 ? 'routinePresent' : n <= 16 ? 'practicalSituations' : 'reviewsCheckpoints', 'Escuta A1 em camadas', 'listening').map((lesson) => lesson.title === 'Listening Checkpoint A1' ? { ...lesson, checkpoint: 'listening-checkpoint' } : lesson),
  item('Weather and feelings', 'practicalSituations', 'Ouvir diálogo sobre clima e sentimentos e responder sem transcript primeiro.', ['listening', 'weather', 'feelings', 'deep'], ['Identifica clima e sentimento sem transcript'], '', 'A1-LISTENING-012-WEATHER'),
  item('Asking for help', 'practicalSituations', 'Ouvir pedidos de ajuda simples e extrair informações-chave.', ['listening', 'help', 'practical', 'deep'], ['Identifica quem precisa de ajuda e o quê'], '', 'A1-LISTENING-013-HELP'),
  item('Personal information exchange', 'familyDescription', 'Ouvir troca de informações pessoais e responder após segunda escuta.', ['listening', 'personal-life', 'deep'], ['Identifica nome, cidade, telefone, hobby'], '', 'A1-LISTENING-021-PERSONAL'),
];
export const A1_SPEAKING_MAP = [
  ...simple(['Say hello and goodbye','Introduce yourself','Spell your name','Say your country and city','Talk about your family','Talk about your job/study','Describe yourself','Say what you like','Ask simple questions','Answer simple questions','Talk about your routine','Talk about time','Order something simple','Ask where something is','Describe your room','Speak for 30 seconds about yourself','Speaking Review A1','Speaking Checkpoint A1'], (n) => n <= 4 ? 'foundations' : n <= 8 ? 'familyDescription' : n <= 12 ? 'routinePresent' : n <= 16 ? 'practicalSituations' : 'reviewsCheckpoints', 'Speaking A1 progressivo', 'speaking').map((lesson) => lesson.title === 'Speaking Checkpoint A1' ? { ...lesson, checkpoint: 'speaking-checkpoint' } : lesson),
  item('Ask simple questions — help and repetition', 'practicalSituations', 'Pedir repetição, ajuda e clareza em inglês simples.', ['speaking', 'help', 'questions', 'deep'], ['Pede Excuse me? / Can you repeat that?'], '', 'A1-SPEAKING-009-HELP'),
  item('Talk about weather and feelings', 'practicalSituations', 'Descrever o clima e sentimentos simples em fala espontânea.', ['speaking', 'weather', 'feelings', 'deep'], ['Descreve clima e sentimento em fala curta'], '', 'A1-SPEAKING-016-WEATHER'),
  item('Talk about yourself and someone else', 'familyDescription', 'Falar sobre si e outra pessoa usando my/his/her em produção oral.', ['speaking', 'personal-life', 'deep'], ['Usa my/his/her em fala sobre si e outro'], '', 'A1-SPEAKING-021-PERSONAL'),
];
export const A1_WRITING_MAP = [
  ...simple(['Write simple sentences','Write your name and country','Write a personal introduction','Write about your family','Write about your job/studies','Write about your routine','Write about likes and dislikes','Write a simple message','Write a short email','Write about your house','Write about your weekend','Write questions and answers','Fix punctuation and capitalization','Connect sentences with and / but / because','Writing Review A1','Writing Checkpoint A1'], (n) => n <= 3 ? 'foundations' : n <= 5 ? 'familyDescription' : n <= 7 ? 'routinePresent' : n <= 14 ? 'practicalSituations' : 'reviewsCheckpoints', 'Writing A1 guiado', 'writing').map((lesson) => lesson.title === 'Writing Checkpoint A1' ? { ...lesson, checkpoint: 'writing-checkpoint' } : lesson),
  item('Write questions and answers — help requests', 'practicalSituations', 'Escrever perguntas e respostas sobre situações de ajuda prática.', ['writing', 'help', 'questions', 'deep'], ['Escreve pergunta + resposta curta'], '', 'A1-WRITING-012-HELP'),
  item('Write a short personal life paragraph', 'familyDescription', 'Escrever parágrafo de vida pessoal com my/his/her, is/are e pontuação.', ['writing', 'personal-life', 'deep'], ['Escreve 6-8 frases sobre si e outra pessoa'], '', 'A1-WRITING-021-PERSONAL'),
];

export const A1_PILLAR_MAPS = Object.freeze({ grammar: A1_GRAMMAR_MAP, vocabulary: A1_VOCABULARY_MAP, reading: A1_READING_MAP, listening: A1_LISTENING_MAP, speaking: A1_SPEAKING_MAP, writing: A1_WRITING_MAP });
export const A1_EXIT_CRITERIA = Object.freeze({ grammar: 75, vocabulary: 80, reading: 75, listening: 70, speaking: 65, writing: 70, finalCheckpoint: true });
export function getA1Package(packageKey) { return A1_PACKAGES[packageKey] || A1_PACKAGES.foundations; }
export function getA1PillarMap(pillar) { return A1_PILLAR_MAPS[pillar] || []; }
export function getA1TotalLessonCount() { return Object.values(A1_PILLAR_MAPS).reduce((total, lessons) => total + lessons.length, 0); }
