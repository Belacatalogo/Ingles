# HOTFIX-QUALITY-DIRECTOR-REPORT-01 — Normalizar falsos positivos e deduplicar relatório

Data: 2026-05-18  
Branch: `main`

## Objetivo

A primeira execução completa do Fluency Quality Director gerou um relatório útil, mas com ruído excessivo:

- muitos P0 de `Resposta correta não aparece nas alternativas` eram falsos positivos parciais;
- a comparação entre resposta e opção exigia igualdade/substring muito literal;
- problemas duplicados entre iPhone 13 e iPhone SE inflavam a nota e contagem;
- o relatório executivo penalizava P1/P2 repetidos de forma agressiva demais.

Este hotfix melhora a confiabilidade do Diretor antes de corrigir aulas reais.

## Arquivos alterados

- `fluency-clean/e2e/quality-director/helpers/exerciseQualityRules.js`
- `fluency-clean/scripts/quality-director/executiveReportBuilder.mjs`
- `fluency-clean/docs/HOTFIX-QUALITY-DIRECTOR-REPORT-01-CONCLUIDO.md`

## Melhorias em exercícios

### Comparação resposta/opção mais semântica

Antes, exemplos como estes eram marcados como P0:

```txt
Resposta: the sky is very dark
Opção: sky is dark
```

```txt
Resposta: update the app and try again
Opção: update app
```

Agora o auditor usa:

- normalização textual;
- remoção de stopwords;
- stemming simples;
- sinônimos/normalizações comuns;
- cobertura por tokens;
- comparação direta ainda mantida.

### Stopwords ampliadas

Foram adicionadas palavras funcionais para não prejudicar equivalências curtas:

```txt
the, a, an, and, to, of, because, if, very, more, most, again...
```

### Normalização lexical

Exemplos:

```txt
restarted → restart
checked → check
updated → update
comfortable → comfort
prices → price
shoes → shoe
leaking → leak
```

### Generic options ajustado

`true/false/yes/no` deixaram de ser marcados genericamente como placeholder, porque podem ser alternativas legítimas dependendo do tipo de exercício.

## Melhorias no relatório executivo

### Deduplicação de issues

Problemas iguais entre viewports agora são agrupados por identidade:

- relatório;
- área;
- título;
- evidência normalizada;
- removendo ruído de viewport/box.

O relatório agora mostra:

```txt
Problemas únicos
Problemas brutos antes de deduplicar
Duplicatas agrupadas
Ocorrências agrupadas
```

### Peso de score menos explosivo

Antes:

```txt
P0 = 24
P1 = 12
P2 = 6
P3 = 2
```

Agora:

```txt
P0 = 18 + pequeno peso por duplicata
P1 = 5 + pequeno peso por duplicata
P2 = 1.2 + pequeno peso por duplicata
P3 = 0.4
```

Isso evita que centenas de alertas pedagógicos P2 derrubem tudo para zero imediatamente, sem esconder P0/P1 reais.

### Tabelas atualizadas

A tabela de relatórios agora mostra:

```txt
Issues únicas
Issues brutas
P0/P1/P2/P3
```

## Importante

Este hotfix não altera aulas e não corrige conteúdo pedagógico. Ele apenas melhora o Quality Director para reduzir falsos positivos e gerar uma visão mais confiável.

## Próximo passo recomendado

Rodar novamente:

```txt
Actions → Fluency Quality Director → Run workflow → audit_mode: full
```

Depois ler:

```txt
fluency-clean/docs/quality-director/latest/quality-director-latest.md
```

A expectativa é:

- queda grande nos P0 falsos positivos;
- relatório menos duplicado;
- nota geral ainda possivelmente baixa, mas mais realista;
- próximos blocos de correção mais certeiros.

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
