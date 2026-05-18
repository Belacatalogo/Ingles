# BLOCO-QUALITY-DIRECTOR-13 — All Lessons Deep Audit

Data: 2026-05-18  
Branch: `main`

## Objetivo

Adicionar ao Quality Director um modo manual pesado para auditar todas as aulas `ready`, não apenas uma amostra.

Esse modo existe para validar o ponto mais importante do projeto: se o curso de 500 horas está com aulas coerentes, renderizáveis, sem erros visíveis e com qualidade pedagógica compatível com o padrão premium esperado.

## Novo modo no workflow

Agora o workflow `Fluency Quality Director` possui:

```txt
audit_mode: full | smart | all_lessons
```

### `full`

Auditoria completa padrão, com navegação, jornada, visual, progresso, segurança, currículo, acessibilidade e amostras exploratórias.

### `smart`

Auditoria por área alterada.

### `all_lessons`

Auditoria profunda de todas as aulas `ready`.

## Arquivos criados

- `fluency-clean/e2e/quality-director/all-lessons-deep.audit.spec.js`
- `fluency-clean/docs/BLOCO-QUALITY-DIRECTOR-13-ALL-LESSONS-DEEP-AUDIT-CONCLUIDO.md`

## Arquivos alterados

- `fluency-clean/scripts/quality-director/select-suites.mjs`
- `.github/workflows/quality-director.yml`

## O que o modo `all_lessons` faz

### 1. Contratos pedagógicos em todas as aulas ready

Para cada aula `ready`, executa:

- `auditLessonExercisesDeep(lesson)`;
- `auditLessonByPillar(lesson)`;
- `auditCefrCoherence(lesson)`;
- `collectLessonExerciseStats(lesson)`.

Ou seja, valida:

- exercícios;
- alternativas;
- resposta esperada;
- feedback;
- qualidade por pilar;
- coerência CEFR;
- quantidade de exercícios;
- estrutura pedagógica básica.

### 2. Abertura real de todas as aulas ready

Para cada aula `ready`, o auditor:

- injeta a aula como aula atual;
- abre a aba Aula;
- valida `.lesson-flow-shell`;
- aplica invariantes gerais de experiência;
- tenta satisfazer a fase;
- avança até o limite configurado.

Por padrão no workflow:

```txt
QUALITY_DIRECTOR_ALL_LESSONS_STEPS=2
```

Isso quer dizer que ele abre todas as aulas e valida as duas primeiras etapas de cada uma.

## Invariantes aplicados por aula

- não mostrar `[object Object]`, `undefined`, `null`, `NaN`;
- não mostrar stack trace, JSON parse, runtime error;
- não mostrar nomes internos como `localStorage`, `lesson.current`, `progress.summary`;
- não deixar aula sem ação principal;
- não permitir stepper com etapa futura clicável;
- não ter overflow horizontal grave;
- não ter tela vazia;
- não ter botões fora da tela;
- não ter elementos interativos sem propósito.

## Timeout

O workflow aumenta o tempo máximo do job para 90 minutos quando o modo é `all_lessons`.

Cada teste da suíte usa timeout maior:

```txt
120000 ms
```

## Filtros opcionais futuros

A suíte já aceita variáveis internas para evoluir depois:

```txt
QUALITY_DIRECTOR_LEVEL=A1
QUALITY_DIRECTOR_PILLAR=grammar
QUALITY_DIRECTOR_ALL_LESSONS_STEPS=2
```

Ainda não foram expostas como inputs do workflow, mas a base já está pronta.

## Como rodar

No GitHub:

```txt
Actions → Fluency Quality Director → Run workflow
branch: main
audit_mode: all_lessons
```

## Importante

Esse modo pode demorar bastante. Ele não deve rodar em todo push.

Uso recomendado:

- antes de o usuário voltar a estudar com confiança;
- depois de grandes alterações em conteúdo;
- antes de marcar um nível como premium/validado;
- antes de liberar mais blocos do curso.

## Limitação honesta

Mesmo `all_lessons` não garante aprendizado final perfeito. Ele garante que todas as aulas `ready` passam por contratos e experiência inicial. A garantia pedagógica profunda ainda depende de:

- revisão dos P0/P1;
- expansão das rubricas CEFR;
- revisão humana/IA de coerência pedagógica;
- execução do curso inteiro em ciclos;
- evolução dos critérios premium por pilar.

Mas esse modo é a base correta para validar todas as aulas, não só amostras.

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
