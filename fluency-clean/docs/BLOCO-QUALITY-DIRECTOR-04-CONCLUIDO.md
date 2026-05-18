# BLOCO-QUALITY-DIRECTOR-04 — Auditor por pilar pedagógico

Data: 2026-05-18  
Branch: `main`

## Objetivo

Adicionar ao Fluency Quality Director uma rubrica pedagógica separada por tipo de aula. Uma aula de Reading, Speaking, Writing, Grammar, Listening ou Vocabulary não deve ser avaliada pelos mesmos critérios.

Este bloco cria regras específicas para cada pilar, reduzindo o risco de uma aula parecer completa no volume de texto, mas falhar no objetivo pedagógico do pilar.

## Arquivos criados

- `fluency-clean/e2e/quality-director/helpers/pillarQualityRules.js`
- `fluency-clean/e2e/quality-director/pillar-quality.audit.spec.js`
- `fluency-clean/docs/BLOCO-QUALITY-DIRECTOR-04-CONCLUIDO.md`

## Como funciona

A suíte `pillar-quality.audit.spec.js`:

1. importa o currículo fixo com `getStaticLessons(level)`;
2. percorre A1, A2, B1, B2, C1 e C2;
3. filtra aulas `status === 'ready'`;
4. agrupa por pilar;
5. aplica `auditLessonByPillar(lesson)`;
6. registra checks e issues no `AuditReporter`.

## Rubricas implementadas

### Grammar

Verifica:

- explicação conceitual clara;
- exemplos ou passos guiados suficientes;
- contraste português/inglês ou erros comuns;
- sinal claro de prática ativa.

Problemas detectáveis:

- Grammar sem explicação da regra;
- Grammar com poucos exemplos;
- Grammar sem contraste para aluno brasileiro;
- Grammar virando teoria sem prática.

### Vocabulary

Verifica:

- lista mínima de palavras/frases úteis;
- contexto real de uso;
- exemplos de frase aparentes.

Problemas detectáveis:

- poucas palavras úteis;
- palavra solta sem contexto;
- vocabulário sem exemplos.

### Reading

Verifica:

- texto principal com tamanho mínimo;
- estratégia de leitura;
- perguntas de compreensão/evidência;
- linguagem de evidência textual.

Problemas detectáveis:

- Reading com texto curto demais;
- Reading sem estratégia;
- poucas perguntas de evidência;
- perguntas sem exigência de prova no texto.

### Listening

Verifica:

- preparação/predição antes do áudio;
- script/transcript pedagógico no conteúdo;
- tarefas após o áudio.

Problemas detectáveis:

- Listening sem pre-listening;
- Listening sem script base;
- poucas tarefas de compreensão/shadowing.

### Speaking

Verifica:

- modelo de fala suficiente;
- foco de pronúncia ou shadowing;
- tarefa produtiva final.

Problemas detectáveis:

- Speaking sem modelo;
- Speaking sem pronúncia/shadowing;
- Speaking sem produção própria.

### Writing

Verifica:

- prompt claro de produção;
- checklist/revisão suficiente;
- modelo ou exemplo pedagógico.

Problemas detectáveis:

- Writing sem prompt claro;
- Writing com checklist fraco;
- Writing sem modelo/exemplo.

## Severidades

- P0: currículo impossível de auditar/sem aulas ready.
- P1: falha pedagógica importante que prejudica o estudo.
- P2: lacuna de qualidade que deixa a aula menos profissional ou menos completa.

## Importante

Este bloco apenas detecta problemas. Ele não altera conteúdo pedagógico das aulas.

Correções futuras devem ser feitas em blocos próprios após leitura do relatório, para evitar reescrita descontrolada do currículo.

## Limitações atuais

As regras são heurísticas. Elas não substituem análise humana total, mas criam uma barreira automática contra aulas rasas ou incompletas por pilar.

Os próximos blocos podem refinar:

- limites por nível CEFR;
- regras por subpilar;
- detecção de qualidade semântica mais profunda;
- cruzamento com screenshots das fases da aula;
- critérios diferentes para A1/A2/B1/B2/C1/C2.

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
BLOCO-QUALITY-DIRECTOR-05 — Auditor visual/mobile com screenshots
```

Objetivo: auditar visualmente abas, aulas, modais, estados vazios e fases em viewports mobile/desktop, salvando screenshots e detectando cortes, sobreposições, cards grandes e layout amador.
