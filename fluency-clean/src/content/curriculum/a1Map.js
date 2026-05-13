export const A1_PACKAGES = Object.freeze({
  foundations: {
    id: 'A1.1',
    title: 'A1.1 Foundations',
    goal: 'Construir identidade básica em inglês: cumprimentar, dizer nome, país, cidade, profissão/estudo e usar pronomes + verbo to be com segurança.',
    themes: ['greetings', 'personal information', 'countries', 'subject pronouns', 'verb to be'],
  },
  familyDescription: {
    id: 'A1.2',
    title: 'A1.2 Family, objects and description',
    goal: 'Expandir descrição simples: família, objetos, sala, adjetivos, artigos, plural, demonstrativos e posse.',
    themes: ['family', 'objects', 'adjectives', 'articles', 'plural', 'possessives'],
  },
  routinePresent: {
    id: 'A1.3',
    title: 'A1.3 Routine and Present Simple',
    goal: 'Construir rotina e hábitos com present simple, horas, dias, frequência e ações cotidianas.',
    themes: ['routine', 'time', 'present simple', 'frequency', 'daily verbs'],
  },
  practicalSituations: {
    id: 'A1.4',
    title: 'A1.4 Practical situations',
    goal: 'Usar inglês de sobrevivência: lugares, casa, comida, roupas, clima, sentimentos, pedidos simples e instruções.',
    themes: ['places', 'food', 'house', 'clothes', 'weather', 'can', 'imperatives'],
  },
  reviewsCheckpoints: {
    id: 'A1.5',
    title: 'A1.5 Reviews and checkpoints',
    goal: 'Revisar, diagnosticar lacunas e confirmar domínio real do A1 antes de liberar A2.',
    themes: ['review', 'checkpoint', 'mastery'],
  },
});

function item(title, options = {}) {
  return {
    title,
    packageKey: options.packageKey,
    objective: options.objective || '',
    tags: options.tags || [],
    mastery: options.mastery || [],
    checkpoint: options.checkpoint || '',
    estimatedMinutes: options.estimatedMinutes,
  };
}

export const A1_GRAMMAR_MAP = [
  item('Subject pronouns', { packageKey: 'foundations', objective: 'Reconhecer e usar I, you, he, she, it, we, they em frases simples.', tags: ['pronouns', 'sentence-subject'], mastery: ['Escolhe pronome correto', 'Substitui nomes por pronomes'] }),
  item('Verb to be — affirmative', { packageKey: 'foundations', objective: 'Formar frases afirmativas com am, is e are.', tags: ['to-be', 'affirmative'], mastery: ['Usa I am', 'Usa he/she/it is', 'Usa you/we/they are'] }),
  item('Verb to be — negative', { packageKey: 'foundations', objective: 'Negar frases simples com am not, is not e are not.', tags: ['to-be', 'negative'], mastery: ['Posiciona not corretamente', 'Evita I not am / she not is'] }),
  item('Verb to be — questions', { packageKey: 'foundations', objective: 'Fazer perguntas simples invertendo o verbo to be.', tags: ['to-be', 'questions'], mastery: ['Forma Am I / Are you / Is she', 'Reconhece ordem de pergunta'] }),
  item('Short answers with to be', { packageKey: 'foundations', objective: 'Responder perguntas com Yes/No usando respostas curtas naturais.', tags: ['to-be', 'short-answers'], mastery: ['Yes, I am', 'No, she is not', 'Evita responder só yes/no quando a aula pede forma completa'] }),
  item('Possessive adjectives: my, your, his, her', { packageKey: 'foundations', objective: 'Usar possessivos básicos para falar de nome, família, objetos e informações pessoais.', tags: ['possessives', 'personal-info'], mastery: ['Diferencia my/your/his/her', 'Evita he name / she name'] }),
  item('Articles: a / an', { packageKey: 'familyDescription', objective: 'Usar a/an antes de substantivos singulares contáveis.', tags: ['articles', 'nouns'], mastery: ['Usa a antes de som consonantal', 'Usa an antes de som vocálico'] }),
  item('Plural nouns', { packageKey: 'familyDescription', objective: 'Formar plural regular e reconhecer plurais básicos frequentes.', tags: ['plural', 'nouns'], mastery: ['Adiciona -s quando adequado', 'Reconhece plural em objetos e família'] }),
  item('This / that / these / those', { packageKey: 'familyDescription', objective: 'Apontar objetos/pessoas perto e longe no singular e plural.', tags: ['demonstratives'], mastery: ['Diferencia this/that', 'Diferencia these/those'] }),
  item('There is / there are', { packageKey: 'familyDescription', objective: 'Descrever existência de pessoas e objetos em lugares.', tags: ['there-is', 'there-are', 'places'], mastery: ['Usa there is singular', 'Usa there are plural'] }),
  item('Have / has', { packageKey: 'familyDescription', objective: 'Falar de posse e relações simples com have/has.', tags: ['have-has', 'possession'], mastery: ['Usa have com I/you/we/they', 'Usa has com he/she/it'] }),
  item('Simple adjectives', { packageKey: 'familyDescription', objective: 'Usar adjetivos simples para descrever pessoas, objetos e lugares.', tags: ['adjectives', 'description'], mastery: ['Coloca adjetivo antes do substantivo', 'Usa to be + adjective'] }),
  item('Basic word order', { packageKey: 'familyDescription', objective: 'Organizar sujeito + verbo + complemento em frases A1.', tags: ['word-order'], mastery: ['Evita ordem do português', 'Monta frases curtas corretas'] }),
  item('Present Simple — I / you / we / they', { packageKey: 'routinePresent', objective: 'Falar de rotina com verbos no presente para I, you, we, they.', tags: ['present-simple', 'routine'], mastery: ['Usa verbo base', 'Fala ações diárias'] }),
  item('Present Simple — he / she / it', { packageKey: 'routinePresent', objective: 'Usar -s/-es em he, she, it no present simple.', tags: ['present-simple', 'third-person'], mastery: ['Adiciona -s em he/she/it', 'Reconhece erros como she work'] }),
  item('Present Simple negatives', { packageKey: 'routinePresent', objective: 'Negar rotina com do not e does not.', tags: ['present-simple', 'negative'], mastery: ['Usa do not com I/you/we/they', 'Usa does not com he/she/it sem -s no verbo principal'] }),
  item('Present Simple questions', { packageKey: 'routinePresent', objective: 'Perguntar sobre rotina com do/does.', tags: ['present-simple', 'questions'], mastery: ['Forma Do you...?', 'Forma Does she...?'] }),
  item('Adverbs of frequency', { packageKey: 'routinePresent', objective: 'Dizer frequência com always, usually, sometimes, never.', tags: ['frequency', 'routine'], mastery: ['Posiciona advérbio antes do verbo principal', 'Usa frequência em rotina'] }),
  item('Prepositions of place', { packageKey: 'routinePresent', objective: 'Descrever localização com in, on, under, next to, near.', tags: ['prepositions', 'place'], mastery: ['Responde where', 'Descreve objetos em lugares'] }),
  item('Prepositions of time', { packageKey: 'routinePresent', objective: 'Usar in, on e at em horários, dias e períodos simples.', tags: ['prepositions', 'time'], mastery: ['at + hora', 'on + dia', 'in + mês/período'] }),
  item('Can / can’t', { packageKey: 'practicalSituations', objective: 'Falar de habilidade e possibilidade com can/can’t.', tags: ['modal', 'can'], mastery: ['Usa can + verbo base', 'Forma perguntas com can'] }),
  item('Imperatives', { packageKey: 'practicalSituations', objective: 'Entender e usar instruções simples.', tags: ['imperatives', 'instructions'], mastery: ['Entende comandos de sala', 'Cria instruções curtas'] }),
  item('Object pronouns', { packageKey: 'practicalSituations', objective: 'Usar me, you, him, her, it, us, them como objeto.', tags: ['object-pronouns'], mastery: ['Diferencia he/him e she/her', 'Usa objeto após verbo/preposição'] }),
  item('Basic conjunctions: and, but, because', { packageKey: 'practicalSituations', objective: 'Conectar ideias simples com and, but e because.', tags: ['conjunctions'], mastery: ['Une frases sem exagerar', 'Explica motivo simples com because'] }),
  item('Review Grammar A1 part 1', { packageKey: 'reviewsCheckpoints', objective: 'Revisar pronomes, to be, possessivos, artigos, plural e descrição.', tags: ['review'], mastery: ['Recupera estruturas iniciais'] }),
  item('Review Grammar A1 part 2', { packageKey: 'reviewsCheckpoints', objective: 'Revisar present simple, preposições, can, imperatives e conectores.', tags: ['review'], mastery: ['Integra estruturas do A1'] }),
  item('Grammar Checkpoint A1', { packageKey: 'reviewsCheckpoints', objective: 'Confirmar domínio mínimo de Grammar A1 antes do avanço.', tags: ['checkpoint'], checkpoint: 'grammar-checkpoint', mastery: ['Atinge nota mínima no checkpoint'] }),
];

export const A1_VOCABULARY_MAP = [
  item('Greetings', { packageKey: 'foundations', objective: 'Cumprimentar e se despedir em contextos simples.', tags: ['greetings'] }),
  item('Personal information', { packageKey: 'foundations', objective: 'Nome, idade, telefone, e-mail, cidade e país.', tags: ['personal-info'] }),
  item('Numbers 0–100', { packageKey: 'foundations', objective: 'Reconhecer, ouvir, falar e escrever números básicos.', tags: ['numbers'] }),
  item('Countries and nationalities', { packageKey: 'foundations', objective: 'Dizer país, cidade e nacionalidade.', tags: ['countries', 'nationalities'] }),
  item('Family', { packageKey: 'foundations', objective: 'Nomear membros da família e relações básicas.', tags: ['family'] }),
  item('Jobs', { packageKey: 'familyDescription', objective: 'Falar de profissões comuns e estudo/trabalho.', tags: ['jobs'] }),
  item('Classroom objects', { packageKey: 'familyDescription', objective: 'Reconhecer objetos de sala e estudo.', tags: ['classroom'] }),
  item('Common adjectives', { packageKey: 'familyDescription', objective: 'Descrever pessoas, lugares e objetos.', tags: ['adjectives'] }),
  item('Colors', { packageKey: 'familyDescription', objective: 'Usar cores em descrições simples.', tags: ['colors'] }),
  item('Days and months', { packageKey: 'familyDescription', objective: 'Falar de dias, meses e datas simples.', tags: ['calendar'] }),
  item('Time', { packageKey: 'routinePresent', objective: 'Entender e falar horários básicos.', tags: ['time'] }),
  item('Daily routine verbs', { packageKey: 'routinePresent', objective: 'Verbos de rotina diária.', tags: ['routine', 'verbs'] }),
  item('Food and drinks', { packageKey: 'routinePresent', objective: 'Nomear alimentos e bebidas comuns.', tags: ['food'] }),
  item('Places in town', { packageKey: 'routinePresent', objective: 'Nomear lugares da cidade e serviços básicos.', tags: ['places'] }),
  item('House and furniture', { packageKey: 'practicalSituations', objective: 'Descrever casa, cômodos e móveis.', tags: ['house'] }),
  item('Clothes', { packageKey: 'practicalSituations', objective: 'Nomear roupas básicas e cores.', tags: ['clothes'] }),
  item('Weather', { packageKey: 'practicalSituations', objective: 'Falar do clima de forma simples.', tags: ['weather'] }),
  item('Basic feelings', { packageKey: 'practicalSituations', objective: 'Expressar sentimentos e estados básicos.', tags: ['feelings'] }),
  item('Common verbs', { packageKey: 'practicalSituations', objective: 'Consolidar verbos frequentes A1.', tags: ['verbs'] }),
  item('Review Vocabulary A1', { packageKey: 'reviewsCheckpoints', objective: 'Revisar vocabulário essencial do A1.', tags: ['review'], checkpoint: 'vocabulary-review' }),
];

export const A1_PILLAR_MAPS = Object.freeze({ grammar: A1_GRAMMAR_MAP, vocabulary: A1_VOCABULARY_MAP });
export const A1_EXIT_CRITERIA = Object.freeze({ grammar: 75, vocabulary: 80, reading: 75, listening: 70, speaking: 65, writing: 70, finalCheckpoint: true });
export function getA1Package(packageKey) { return A1_PACKAGES[packageKey] || A1_PACKAGES.foundations; }
export function getA1PillarMap(pillar) { return A1_PILLAR_MAPS[pillar] || []; }
export function getA1TotalLessonCount() { return Object.values(A1_PILLAR_MAPS).reduce((total, lessons) => total + lessons.length, 0); }
