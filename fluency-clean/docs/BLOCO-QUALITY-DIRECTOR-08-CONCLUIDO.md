# BLOCO-QUALITY-DIRECTOR-08 — Auditor CEFR e consistência do currículo

Data: 2026-05-18  
Branch: `main`

## Objetivo

Adicionar ao Fluency Quality Director uma auditoria estrutural do currículo A1 → C2, validando se os mapas, aulas, pilares, IDs, pré-requisitos, contagens e sinais de nível CEFR estão coerentes.

Esse bloco não avalia só se a aula existe; ele verifica se a trilha está bem amarrada para evitar buracos no curso, IDs duplicados, pré-requisitos quebrados, pilar divergente e incoerência básica de nível.

## Arquivos criados

- `fluency-clean/e2e/quality-director/helpers/curriculumConsistencyRules.js`
- `fluency-clean/e2e/quality-director/curriculum-consistency.audit.spec.js`
- `fluency-clean/docs/BLOCO-QUALITY-DIRECTOR-08-CONCLUIDO.md`

## Como funciona

A suíte `curriculum-consistency.audit.spec.js` importa:

```js
getStaticCurriculum()
getStaticLessons(level)
```

E audita os níveis:

```txt
A1, A2, B1, B2, C1, C2
```

Pilares esperados:

```txt
grammar
vocabulary
reading
listening
speaking
writing
```

## Checks de consistência

O auditor verifica:

- nível CEFR existe em `STATIC_CURRICULUM.levels`;
- nível tem título e descrição;
- cada pilar tem aulas;
- ordens duplicadas no mesmo pilar;
- ordem sequencial por pilar;
- ID segue padrão `LEVEL-PILLAR-001`;
- aula tem título;
- aula tem objetivo;
- aula sequencial tem pré-requisito;
- aula `ready` tem `schemaVersion` ou `generationMeta.source`;
- aula `ready` tem pilar coerente com o mapa;
- `readyLessonCount` bate com a contagem real;
- IDs globais são únicos;
- pré-requisitos apontam para aulas existentes.

## Checks CEFR iniciais

A auditoria também aplica sinais heurísticos de nível:

### A1/A2

Marca como possível problema se encontrar sinais avançados demais, como:

- `nevertheless`
- `whereas`
- `notwithstanding`
- `counterargument`
- `academic register`
- `nuance`

### B1/B2/C1/C2

Marca como possível problema se encontrar sinais básicos demais, como:

- `my name is`
- `this is a pen`
- `basic greetings`
- `simple present only`

## Severidades

### P0

- nível CEFR ausente;
- ID duplicado no currículo global.

### P1

- pilar sem aulas;
- ID fora do padrão;
- pré-requisito inexistente;
- aula ready sem contrato claro;
- pilar da aula ready divergente do mapa;
- sinal forte de nível muito inadequado.

### P2

- ordem fora da sequência;
- objetivo ausente/fraco;
- readyLessonCount divergente;
- aula sequencial sem pré-requisito;
- sinais CEFR mais fracos.

## Relatórios

Quando rodar, gera:

```txt
audit-results/quality-director-curriculum-consistency-*.md
audit-results/quality-director-curriculum-consistency-*.json
```

Também entra no relatório consolidado latest.

## Importante

Este bloco não altera currículo nem aulas. Ele apenas detecta problemas estruturais.

Correções devem ser feitas depois, em blocos próprios, com cuidado para não quebrar progresso, IDs ou pré-requisitos.

## Limitações atuais

- A análise CEFR é heurística por padrões de texto, não análise linguística profunda.
- Pode haver falso positivo se uma aula avançada menciona exemplos básicos para contraste.
- Ainda não calcula complexidade real de frase, densidade lexical ou progressão gramatical profunda.

Blocos futuros podem expandir para:

- rubrica CEFR mais precisa por pilar;
- progressão gramatical por nível;
- análise de vocabulário por frequência;
- consistência entre checkpoint e requisitos do gate;
- visualização da árvore de pré-requisitos.

## Confirmações

```txt
Branch: main.
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Sem bundle patch.
Sem DOM injection.
Sem ativar Firebase/Azure/Gemini/Cloudinary real.
Sem alterar conteúdo pedagógico das aulas.
Sem mexer no backend privado.
```

## Próximo bloco recomendado

```txt
BLOCO-QUALITY-DIRECTOR-09 — Performance, acessibilidade e qualidade técnica
```

Objetivo: adicionar auditoria de performance inicial, acessibilidade, nomes acessíveis, labels, foco, contraste básico e tempo de resposta das telas.
