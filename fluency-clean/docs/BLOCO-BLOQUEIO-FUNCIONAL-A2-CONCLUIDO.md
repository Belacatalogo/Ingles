# BLOCO — Bloqueio funcional do A2

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como primeira versão do bloqueio funcional de avanço para A2.

## Documentos lidos antes do bloco

- `fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md`
- `fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md`
- `fluency-clean/docs/BLOCO-VALIDACAO-A1-MASTERY-GATE-UI-CONCLUIDO.md`

## Objetivo

Impedir que o aluno selecione A2, B1, B2, C1 ou C2 enquanto os critérios do A1 ainda não forem cumpridos.

## Arquivo alterado

`fluency-clean/src/screens/CourseScreen.jsx`

## Alterações feitas

### 1. Integração com os critérios do A1

Foi importado:

`getA1MasteryGateSummary()`

A tela agora lê se o A2 pode ser liberado.

### 2. Bloqueio dos níveis acima do A1

Enquanto A1 não estiver aprovado:

- A2 fica bloqueado;
- B1 fica bloqueado;
- B2 fica bloqueado;
- C1 fica bloqueado;
- C2 fica bloqueado.

Ao tocar em um nível bloqueado, o aluno volta para A1 e recebe a mensagem:

```txt
A2 ainda bloqueado. Complete os critérios do A1 para avançar.
```

### 3. Tabs de nível mais claras

Níveis bloqueados mostram:

- `Bloqueado`
- `Conclua o A1 primeiro`

### 4. UX limpa

Foram evitados termos técnicos como:

- gate;
- payload;
- canUnlockA2;
- checkpointAveragePercent;
- schema;
- storage.

A tela usa linguagem de aluno:

- `A2 ainda bloqueado`
- `Complete os critérios do A1 para avançar`
- `Conclua o A1 primeiro`

### 5. Ajustes de texto no hero do curso

O card principal agora diferencia melhor:

- aulas concluídas;
- mapa total;
- status validado/em revisão;
- botão `Ver status` em vez de texto técnico.

## Resultado esperado

No CourseScreen:

- A1 continua selecionável;
- A2+ aparecem bloqueados se o A1 não estiver aprovado;
- clicar em A2+ não troca o nível ativo;
- o aluno recebe uma mensagem clara;
- o painel de critérios do A1 permanece visível.

## Limitações deste bloco

Este bloco bloqueia seleção no CourseScreen.

Ainda falta validar:

- se existe outro caminho no app que permita abrir A2 diretamente;
- se o estado local do gate está sendo atualizado corretamente;
- se o bloqueio precisa aparecer também na Home/topbar;
- visual mobile das tabs bloqueadas.

## Próximo bloco recomendado

## Validação visual do bloqueio A2

Objetivo:

- abrir CourseScreen no iPhone;
- tentar tocar em A2;
- confirmar que A2 não abre;
- confirmar mensagem humana;
- confirmar que A1 continua ativo;
- ajustar CSS se a tab bloqueada estiver visualmente fraca.

Depois disso:

## Tela real da prova final do A1

Criar o fluxo onde o aluno realmente fará a prova final do A1.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Antes de qualquer alteração, leia:
1. REWRITE_HANDOFF.md
2. fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md
3. fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md
4. fluency-clean/docs/BLOCO-BLOQUEIO-FUNCIONAL-A2-CONCLUIDO.md

Próximo bloco: Validação visual do bloqueio A2.
Manter UX limpa, sem termos técnicos na tela do aluno.
Economizar commits/deploys.
Não mexer em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não usar DOM injection nem bundle patch.
```
