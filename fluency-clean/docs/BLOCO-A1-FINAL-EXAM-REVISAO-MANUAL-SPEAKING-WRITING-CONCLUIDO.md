# BLOCO — Prova final do A1 — revisão manual/local de Speaking/Writing

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como primeira revisão manual/local de Speaking e Writing dentro da prova final do A1.

## Documentos lidos antes do bloco

- `fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md`
- `fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md`
- `fluency-clean/docs/BLOCO-A1-FINAL-EXAM-SPEAKING-WRITING-PLACEHOLDERS-CONCLUIDO.md`

## Objetivo

Permitir lançar nota local para Speaking e Writing, marcar como revisados e atualizar os critérios do A1.

## Arquivos alterados

`fluency-clean/src/services/a1FinalExamAttemptService.js`

`fluency-clean/src/components/course/A1FinalExamShell.jsx`

`fluency-clean/src/styles/a1-mastery-gate.css`

## O que foi implementado

### 1. Revisão local no serviço

Foi criada a função:

`reviewA1FinalExamProductiveSkill(skill, score, note)`

Ela:

- aceita apenas `speaking` ou `writing`;
- normaliza nota entre 0 e 100;
- registra a nota no serviço dos critérios do A1;
- marca a skill como revisada;
- salva comentário local da revisão.

### 2. UI de revisão local

Dentro de Speaking/Writing foi adicionada uma caixa de revisão com:

- campo de nota de 0 a 100;
- campo de comentário curto;
- botão `Marcar como revisado`;
- indicação da nota revisada.

### 3. Atualização dos critérios

Ao marcar Speaking ou Writing como revisado, o sistema chama a atualização do CourseScreen para recalcular o painel de critérios do A1.

### 4. A2 continua condicionado às regras

Mesmo com revisão local, o A2 só será liberado se todos os critérios forem cumpridos:

- aulas concluídas;
- checkpoints;
- prova final;
- notas mínimas;
- Speaking revisado;
- Writing revisado.

## UX limpa

A tela não mostra:

- nomes técnicos de storage;
- payload;
- schema;
- hash;
- nomes de arquivo;
- detalhes internos do serviço.

## Importante

Esse bloco não liga IA real e não mexe no sistema real de Speaking.

Arquivos não alterados:

- `speakingFlow.js`
- `SpeakingStepper.jsx`
- `SpeakingScreen.jsx`

## O que ainda falta

- validar visual completo no iPhone;
- corrigir possíveis problemas de mobile;
- player real de Listening;
- gravação real de Speaking;
- revisão por IA/professor real;
- checkpoints reais renderizáveis;
- validação final de A1 → A2.

## Próximo bloco recomendado

## Validação visual completa da prova A1 no iPhone

Objetivo:

- validar layout mobile;
- verificar abas da prova;
- verificar campos longos;
- verificar revisão local;
- verificar mensagens;
- confirmar que A2 continua bloqueado quando alguma regra falta.

Depois disso:

## Checkpoints reais renderizáveis A1

Objetivo:

- transformar checkpoints em telas reais;
- registrar notas localmente;
- atualizar critérios do A1.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Antes de qualquer alteração, leia:
1. REWRITE_HANDOFF.md
2. fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md
3. fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md
4. fluency-clean/docs/BLOCO-A1-FINAL-EXAM-REVISAO-MANUAL-SPEAKING-WRITING-CONCLUIDO.md

Próximo bloco: Validação visual completa da prova A1 no iPhone.
Manter UX limpa, sem termos técnicos na tela do aluno.
Economizar commits/deploys.
Não mexer no sistema real de Speaking ainda: não alterar speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não criar bloco gigante.
Não mexer em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção.
Não usar DOM injection nem bundle patch.
```
