# REGRAS — UX limpa e economia de deploys

Branch obrigatória: `rewrite-fluency-clean-lab`

Este documento adiciona duas regras oficiais para todos os próximos blocos do Fluency.

## 1. UX limpa nas telas do aluno

As páginas do aluno não devem exibir informações técnicas que poluem a experiência.

Não mostrar na UI principal:

- nomes internos de schema;
- hashes ou commits;
- nomes de arquivos;
- chaves de storage;
- detalhes de IndexedDB/localStorage;
- flags internas;
- mensagens de debug;
- nomes técnicos de serviços;
- explicações longas de arquitetura.

Essas informações devem ficar em:

- docs e handoffs;
- painel de diagnóstico/dev;
- logs internos;
- validações técnicas.

Regra prática:

> Se a informação não ajuda o aluno a decidir o que fazer agora, ela não deve aparecer na tela principal.

Exemplos de texto humano:

| Técnico | Melhor para o aluno |
|---|---|
| `static-lesson-schema-v2-deep` | `Aula fixa validada` |
| `lesson-full-indexeddb-v1` | `Aula salva no aparelho` |
| `canUnlockA2 === false` | `A2 ainda bloqueado` |
| `checkpointAveragePercent` | `Média dos checkpoints` |

## 2. Modo economia de deploys

O Vercel faz deploy automático a cada commit.

Por isso, a partir deste documento, cada bloco deve tentar usar:

- ideal: 1 commit por bloco;
- aceitável: 2 commits quando houver motivo real;
- evitar vários commits pequenos no mesmo bloco.

Antes de editar, a IA deve:

1. ler os documentos do bloco;
2. entender o objetivo;
3. listar os arquivos necessários;
4. buscar/fetch antes de alterar;
5. planejar a alteração completa;
6. editar em lote quando possível;
7. validar imports, exports e paths;
8. fazer commit apenas quando o bloco estiver coerente.

Mais de 1 commit só deve acontecer quando:

- a ferramenta exigir;
- houver conflito ou erro real;
- for necessário hotfix;
- o bloco for grande demais e precisar ser dividido.

## 3. Blocos grandes devem ser quebrados

Não fazer blocos gigantes que misturam tudo.

Exemplo ruim:

`Final Exam completo + UI + notas + bloqueio + docs + validação`

Exemplo correto:

1. data model;
2. UI shell;
3. scoring local;
4. bloqueio funcional;
5. validação visual.

## 4. Regra para próximos blocos

Antes de iniciar qualquer próximo bloco, ler também:

`fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md`

Este documento complementa:

`fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md`

## 5. Próximo bloco recomendado

`Validação visual pós-sync da Home`

Objetivo:

- confirmar se a Home usa textos humanos;
- remover informações técnicas visíveis;
- confirmar `Aulas prontas no mapa` e `Aulas concluídas`;
- confirmar CTA correto para A1 Gate/Final Exam;
- registrar validação;
- economizar commits.

## 6. Prompt atualizado de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Antes de qualquer alteração, leia:
1. REWRITE_HANDOFF.md
2. fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md
3. fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md
4. o último documento de bloco concluído.

Regras adicionais:
- não exibir informações técnicas nas telas do aluno;
- manter informações técnicas apenas em docs, diagnóstico/dev ou logs;
- economizar deploys porque o Vercel faz deploy automático;
- planejar o bloco antes de editar;
- tentar fazer 1 commit por bloco;
- dividir blocos grandes antes de começar;
- ao final, documentar o bloco sem criar commits desnecessários.
```
