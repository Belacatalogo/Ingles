# BLOCO-VOCAB-EXPANSION-AUDIT-A1-C2 — Auditoria e expansão de decks A1→C2

Gerado em: 2026-05-21

## Escopo

Este bloco prepara a auditoria do banco de vocabulário A1→C2 antes de qualquer expansão nova.

Escopo permitido:

- `src/data/vocabulary/fixedExpansionA1A2.js`
- `src/data/vocabulary/fixedExpansionB1B2.js`
- `src/data/vocabulary/fixedExpansionC1C2.js`
- `src/services/vocabularyDecks.js`
- `src/services/vocabularyCurriculumAudit.js`
- scripts/docs de auditoria

Fora do escopo:

- Reading
- aulas/conteúdo curricular
- `lessonFactories`
- `pillarQualityRules` pedagógico
- Flashcards da aula
- UI da trilha, exceto leitura de contagem se necessário

## Decisão técnica

O bloco do Notion orienta: **auditar antes de criar novos arquivos ou expandir cegamente**.

A `main` já contém:

- decks base em `vocabularyDecks.js`;
- imports de `fixedExpansionA1A2.js`;
- imports de `fixedExpansionB1B2.js`;
- imports de `fixedExpansionC1C2.js`;
- `VOCABULARY_BANK_TARGET = 7500`;
- `getVocabularyBankAudit()`;
- `vocabularyCurriculumAudit.js` com checagens estruturais/pedagógicas.

Por isso, este bloco adiciona uma auditoria executável para medir o estado real antes de mexer no banco.

## Arquivos criados/alterados

### Criado

`src/scripts` não foi usado; o script ficou em:

`fluency-clean/scripts/vocabulary/audit-vocabulary-bank.mjs`

Ele gera:

- `fluency-clean/docs/vocabulary/vocabulary-bank-audit-latest.json`
- `fluency-clean/docs/vocabulary/vocabulary-bank-audit-latest.md`

### Alterado

`fluency-clean/package.json`

Novo script:

```bash
npm run vocabulary:audit
```

## O que a auditoria mede

- total de cards;
- total de decks;
- gap até `VOCABULARY_BANK_TARGET`;
- completion percent;
- distribuição por nível;
- distribuição por tópico;
- menores/maiores decks;
- duplicatas;
- traduções repetidas;
- issues estruturais;
- issues de chunk/collocation;
- issues pedagógicas totais;
- gates:
  - `passedStructure`;
  - `passedChunks`;
  - `passedDuplicates`;
  - `passedPedagogicalAudit`.

## Como rodar

Na pasta `fluency-clean`:

```bash
npm run vocabulary:audit
```

Depois revisar:

```txt
fluency-clean/docs/vocabulary/vocabulary-bank-audit-latest.md
fluency-clean/docs/vocabulary/vocabulary-bank-audit-latest.json
```

## Critério antes de expandir

Só criar novas expansões se a auditoria mostrar claramente:

1. gap grande por nível;
2. baixa cobertura de determinados tópicos;
3. ausência de decks suficientes em B1/B2/C1/C2;
4. ausência de critical/major issues nos decks atuais, ou plano claro para corrigi-las primeiro.

## Próxima ação segura

1. Rodar `npm run vocabulary:audit`.
2. Ver o relatório gerado.
3. Se houver issues críticas/major, corrigir antes de adicionar volume.
4. Se a estrutura estiver saudável, criar blocos menores de expansão por nível:
   - A1/A2 gap patch;
   - B1/B2 functional expansion;
   - C1/C2 advanced expression expansion.

## Status

Status operacional: **Revisar**.

Este bloco ainda não deve ser marcado como concluído até a auditoria ser executada e os relatórios `latest` serem gerados/committados.
