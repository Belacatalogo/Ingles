export const GRAMMAR_BRAZILIAN_ERRORS = Object.freeze({
  third_person_s_missing: Object.freeze({
    level: 'A1',
    area: 'present_simple',
    label: 'Third person -s ausente',
    examples: Object.freeze([
      Object.freeze({ wrong: 'He work every day.', right: 'He works every day.' }),
      Object.freeze({ wrong: 'She play tennis.', right: 'She plays tennis.' }),
      Object.freeze({ wrong: 'My brother live in Rio.', right: 'My brother lives in Rio.' }),
    ]),
    why: 'No present simple, na 3ª pessoa do singular (he/she/it), o verbo termina em -s.',
  }),

  have_has_confusion: Object.freeze({
    level: 'A1',
    area: 'present_simple',
    label: 'have/has confusion',
    examples: Object.freeze([
      Object.freeze({ wrong: 'She have two cats.', right: 'She has two cats.' }),
      Object.freeze({ wrong: 'He have a new car.', right: 'He has a new car.' }),
    ]),
    why: 'Na 3ª pessoa do singular, have vira has.',
  }),

  is_are_confusion: Object.freeze({
    level: 'A1',
    area: 'verb_to_be',
    label: 'people is → people are',
    examples: Object.freeze([
      Object.freeze({ wrong: 'People is happy.', right: 'People are happy.' }),
      Object.freeze({ wrong: 'My friends is here.', right: 'My friends are here.' }),
    ]),
    why: 'People é plural e usa are. Sujeitos plurais também usam are.',
  }),

  a_an_basic: Object.freeze({
    level: 'A1',
    area: 'articles',
    label: 'a vs an',
    examples: Object.freeze([
      Object.freeze({ wrong: 'a apple', right: 'an apple' }),
      Object.freeze({ wrong: 'an university', right: 'a university' }),
    ]),
    why: 'Use an antes de som de vogal e a antes de som de consoante.',
  }),

  past_simple_irregular: Object.freeze({
    level: 'A2',
    area: 'past_simple',
    label: 'verbo irregular no passado',
    examples: Object.freeze([
      Object.freeze({ wrong: 'I goed to school.', right: 'I went to school.' }),
      Object.freeze({ wrong: 'She buyed a book.', right: 'She bought a book.' }),
      Object.freeze({ wrong: 'They taked the bus.', right: 'They took the bus.' }),
    ]),
    why: 'Verbos irregulares têm forma própria no passado, não recebem -ed.',
  }),

  going_to_vs_will: Object.freeze({
    level: 'A2',
    area: 'future',
    label: 'going to vs will',
    examples: Object.freeze([
      Object.freeze({ wrong: 'I will to call you tomorrow.', right: 'I will call you tomorrow.' }),
      Object.freeze({ wrong: 'I going to study tonight.', right: 'I am going to study tonight.' }),
    ]),
    why: 'Will vem direto antes do verbo. Going to precisa do verbo to be antes.',
  }),

  comparative_more_double: Object.freeze({
    level: 'A2',
    area: 'comparatives',
    label: 'dupla comparação',
    examples: Object.freeze([
      Object.freeze({ wrong: 'My house is more bigger.', right: 'My house is bigger.' }),
      Object.freeze({ wrong: 'This is more easier.', right: 'This is easier.' }),
    ]),
    why: 'Adjetivos curtos usam -er; não combine com more.',
  }),

  present_perfect_for_since: Object.freeze({
    level: 'B1',
    area: 'present_perfect',
    label: 'for vs since',
    examples: Object.freeze([
      Object.freeze({ wrong: 'I live here since 2020.', right: 'I have lived here since 2020.' }),
      Object.freeze({ wrong: 'She works there for 5 years.', right: 'She has worked there for 5 years.' }),
    ]),
    why: 'Para algo iniciado no passado e que continua, use present perfect com for/since.',
  }),

  first_conditional_will: Object.freeze({
    level: 'B1',
    area: 'conditionals',
    label: 'will na cláusula if',
    examples: Object.freeze([
      Object.freeze({ wrong: 'If it will rain, I will stay home.', right: 'If it rains, I will stay home.' }),
      Object.freeze({ wrong: 'If she will call, I will answer.', right: 'If she calls, I will answer.' }),
    ]),
    why: 'No primeiro condicional, a cláusula if usa present simple, não will.',
  }),

  must_vs_have_to_meaning: Object.freeze({
    level: 'B1',
    area: 'modals',
    label: 'must sem to e sem -s',
    examples: Object.freeze([
      Object.freeze({ wrong: 'I must to go now.', right: 'I must go now.' }),
      Object.freeze({ wrong: 'She musts work tomorrow.', right: 'She must work tomorrow.' }),
    ]),
    why: 'Must é seguido de verbo sem to e não conjuga na 3ª pessoa.',
  }),

  gerund_infinitive_after_verbs: Object.freeze({
    level: 'B1',
    area: 'gerunds_infinitives',
    label: 'gerund vs infinitive',
    examples: Object.freeze([
      Object.freeze({ wrong: 'I enjoy to read books.', right: 'I enjoy reading books.' }),
      Object.freeze({ wrong: 'She wants going home.', right: 'She wants to go home.' }),
    ]),
    why: 'Alguns verbos pedem gerund, outros pedem infinitivo com to.',
  }),

  passive_voice_object_subject: Object.freeze({
    level: 'B2',
    area: 'passive_voice',
    label: 'voz passiva com particípio',
    examples: Object.freeze([
      Object.freeze({ wrong: 'The book was wrote by him.', right: 'The book was written by him.' }),
      Object.freeze({ wrong: 'The cake is bake yesterday.', right: 'The cake was baked yesterday.' }),
    ]),
    why: 'Voz passiva usa be + past participle.',
  }),

  reported_speech_tense_shift: Object.freeze({
    level: 'B2',
    area: 'reported_speech',
    label: 'backshifting no discurso reportado',
    examples: Object.freeze([
      Object.freeze({ wrong: 'He said he is tired.', right: 'He said he was tired.' }),
      Object.freeze({ wrong: 'She told me she will come.', right: 'She told me she would come.' }),
    ]),
    why: 'Em discurso reportado no passado, o tempo verbal normalmente recua um passo.',
  }),
});

export function getErrorsByLevel(level) {
  return Object.values(GRAMMAR_BRAZILIAN_ERRORS).filter((error) => error.level === level);
}

export function getErrorsByArea(area) {
  return Object.values(GRAMMAR_BRAZILIAN_ERRORS).filter((error) => error.area === area);
}

export function getErrorByTag(tag) {
  return GRAMMAR_BRAZILIAN_ERRORS[tag] || null;
}
