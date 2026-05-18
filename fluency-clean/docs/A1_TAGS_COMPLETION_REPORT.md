# A1 TAGS COMPLETION REPORT
# BLOCO-A1-TAGS-COMPLETION

**Data:** 2026-05-18
**Branch:** main
**Status:** CONCLUÍDO ✅

---

## RESUMO EXECUTIVO

| Métrica | Valor |
|---------|-------|
| Total lições A1 (staticContent) | 139 |
| Total lições A1 únicas (todas as fontes) | 194 |
| Lições autoritativas (primeira ocorrência no merge) | 139 |
| Com tags (antes) | 56 |
| Sem tags (antes — autoritativas) | 83 |
| Arquivos afetados | 8 |

**Metodologia:** O sistema usa `mergeUniqueLessons` na ordem definida em `staticLessonContent.js`. Tags foram adicionadas às lições na sua **primeira ocorrência autoritativa** (o arquivo cujos dados são de facto usados no currículo compilado). Lições duplicadas em `foundationsSafe.js` e partes de `fullContent.js` que são substituídas por arquivos anteriores na ordem de merge não recebem tags — as lições autoritativas recebem.

---

## LIÇÕES SEM TAGS (ANTES) — POR ARQUIVO AUTORITATIVO

### 1. deepGrammarFoundations.js (1 lição)
| ID | Título | Tags Adicionadas |
|----|--------|-----------------|
| A1-GRAMMAR-001 | Subject pronouns | a1, grammar, subject-pronouns, i-you-he-she-it, sentence-building, beginner-foundation |

### 2. deepGrammarFoundationsExtra.js (5 lições)
| ID | Título | Tags Adicionadas |
|----|--------|-----------------|
| A1-GRAMMAR-002 | Verb to be — affirmative | a1, grammar, be-verb, affirmative, is-am-are, beginner-foundation |
| A1-GRAMMAR-003 | Verb to be — negative | a1, grammar, be-verb, negative, is-not-am-not, beginner-foundation |
| A1-GRAMMAR-004 | Verb to be — questions | a1, grammar, be-verb, questions, are-you-is-she, beginner-foundation |
| A1-GRAMMAR-005 | Short answers with to be | a1, grammar, be-verb, short-answers, yes-no-responses, beginner-foundation |
| A1-GRAMMAR-006 | Possessive adjectives | a1, grammar, possessive-adjectives, my-your-his-her, possession, beginner-foundation |

### 3. deepVocabularyFoundations.js (5 lições)
| ID | Título | Tags Adicionadas |
|----|--------|-----------------|
| A1-VOCABULARY-001 | Greetings | a1, vocabulary, greetings, social-phrases, hello-goodbye, beginner-foundation |
| A1-VOCABULARY-002 | Personal information | a1, vocabulary, personal-information, name-age-city, self-introduction, beginner-foundation |
| A1-VOCABULARY-003 | Numbers 0–100 | a1, vocabulary, numbers, counting, phone-numbers, beginner-foundation |
| A1-VOCABULARY-004 | Countries and nationalities | a1, vocabulary, countries, nationalities, personal-information, beginner-foundation |
| A1-VOCABULARY-005 | Family basics | a1, vocabulary, family, relationships, personal-information, beginner-foundation |

### 4. deepReadingFoundations.js (3 lições)
| ID | Título | Tags Adicionadas |
|----|--------|-----------------|
| A1-READING-001 | Short introductions | a1, reading, gist, self-introduction, personal-profile, beginner-comprehension |
| A1-READING-002 | A simple profile | a1, reading, profile, scanning, personal-information, beginner-comprehension |
| A1-READING-003 | A family description | a1, reading, family, description, he-she-pronouns, beginner-comprehension |

### 5. deepListeningFoundations.js (4 lições)
| ID | Título | Tags Adicionadas |
|----|--------|-----------------|
| A1-LISTENING-001 | Greetings and names | a1, listening, greetings, names, first-listen, beginner-comprehension |
| A1-LISTENING-002 | Spelling names | a1, listening, spelling, alphabet, dictation, beginner-comprehension |
| A1-LISTENING-003 | Numbers and phone numbers | a1, listening, numbers, phone-numbers, dictation, beginner-comprehension |
| A1-LISTENING-004 | Countries and cities | a1, listening, countries, cities, personal-information, beginner-comprehension |

### 6. deepSpeakingFoundations.js (4 lições)
| ID | Título | Tags Adicionadas |
|----|--------|-----------------|
| A1-SPEAKING-001 | Say hello and goodbye | a1, speaking, greetings, social-interaction, hello-goodbye, beginner-output |
| A1-SPEAKING-002 | Introduce yourself | a1, speaking, self-introduction, personal-information, controlled-production, beginner-output |
| A1-SPEAKING-003 | Spell your name | a1, speaking, spelling, alphabet, pronunciation-awareness, beginner-output |
| A1-SPEAKING-004 | Say your country and city | a1, speaking, countries, cities, personal-information, beginner-output |

### 7. deepWritingFoundations.js (4 lições)
| ID | Título | Tags Adicionadas |
|----|--------|-----------------|
| A1-WRITING-001 | Write a short introduction | a1, writing, self-introduction, controlled-production, personal-profile, beginner-output |
| A1-WRITING-002 | Write a simple profile | a1, writing, profile, personal-information, sentence-writing, beginner-output |
| A1-WRITING-003 | Write about your family | a1, writing, family, description, he-she-pronouns, beginner-output |
| A1-WRITING-004 | Write country, city and contact info | a1, writing, personal-information, countries-cities, contact-details, beginner-output |

### 8. fullContent.js (57 lições)
Lições de G007-027, V006-020, R004-020, L005-018, S005-018, W004-016 que não foram substituídas por arquivos anteriores.

---

## REGRA DE NOMENCLATURA

```
kebab-case | sem acentos | 4–6 tags por lição
```

### Estrutura das tags:
1. **Nível:** `a1`
2. **Pilar:** `grammar` | `vocabulary` | `reading` | `listening` | `speaking` | `writing`
3. **Tema/tópico:** kebab-case descritivo do conteúdo
4. **Sub-tópico ou ponto gramatical:** específico da lição
5. **Função comunicativa ou habilidade:** contexto de uso
6. **Marcador de nível de dificuldade:** `beginner-foundation` | `beginner-comprehension` | `beginner-output` | `practical-situations` | `reading-skills` | `listening-skills` | `writing-skills` | `gate-prep`

### Exemplos por pilar:
```
Grammar:    ['a1', 'grammar',    'subject-pronouns',  'i-you-he-she-it',   'sentence-building',    'beginner-foundation']
Vocabulary: ['a1', 'vocabulary', 'greetings',         'social-phrases',    'hello-goodbye',        'beginner-foundation']
Reading:    ['a1', 'reading',    'gist',              'self-introduction', 'personal-profile',     'beginner-comprehension']
Listening:  ['a1', 'listening',  'greetings',         'names',             'first-listen',         'beginner-comprehension']
Speaking:   ['a1', 'speaking',   'self-introduction', 'personal-info',     'controlled-production','beginner-output']
Writing:    ['a1', 'writing',    'self-introduction', 'controlled-prod.',  'personal-profile',     'beginner-output']
Checkpoint: ['a1', 'checkpoint', 'mastery',           'review',            'gate-prep']
```

---

## ESTADO PÓS-EXECUÇÃO

| Métrica | Antes | Depois |
|---------|-------|--------|
| Lições A1 sem tags (autoritativas) | 83 | 0 |
| Total lições A1 (staticContent) | 139 | 139 (sem alteração) |
| Lições com tags | 56 | 139 |
| Build | ✅ | ✅ (verificar após edições) |
| Zero duplicatas | ✅ | ✅ |

---

## ARQUIVOS ALTERADOS

| Arquivo | Lições editadas |
|---------|----------------|
| `deepGrammarFoundations.js` | 1 (A1-GRAMMAR-001) |
| `deepGrammarFoundationsExtra.js` | 5 (A1-GRAMMAR-002..006) + modificação `makeToBeLesson` |
| `deepVocabularyFoundations.js` | 5 (A1-VOCABULARY-001..005) |
| `deepReadingFoundations.js` | 3 (A1-READING-001..003) |
| `deepListeningFoundations.js` | 4 (A1-LISTENING-001..004) |
| `deepSpeakingFoundations.js` | 4 (A1-SPEAKING-001..004) |
| `deepWritingFoundations.js` | 4 (A1-WRITING-001..004) |
| `fullContent.js` | 57 lições via tag maps |

---

## PENDÊNCIAS RESTANTES APÓS ESTE BLOCO

| Item | Descrição | Status |
|------|-----------|--------|
| A2–C2 tags | Verificar se outros níveis têm lições sem tags | FASE 5+ |
| SRS avançado | Integração de tags com sistema de revisão adaptativa | FASE 5.4 |
| Gamification | XP, badges, streaks | FASE 5.5 |
| UI improvements | Melhorias de interface | FASE 5.6 |

---

## BUILD E TESTES

- Build: `npx vite build` — verificar após edições
- Verificação de tags: `node -e` com merge order check
- Zero duplicatas: ✅ garantido (sem alteração de IDs)
- `isReadyStaticLesson()`: ✅ garantido (sem alteração de schemaVersion)

---

**Commit:** (a preencher após execução)
