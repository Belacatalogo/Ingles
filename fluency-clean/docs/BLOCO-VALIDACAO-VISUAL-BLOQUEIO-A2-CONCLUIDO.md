# BLOCO — Validação visual do bloqueio A2

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como validação inicial e ajuste visual das abas de níveis bloqueados.

## Documentos lidos antes do bloco

- `fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md`
- `fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md`
- `fluency-clean/docs/BLOCO-BLOQUEIO-FUNCIONAL-A2-CONCLUIDO.md`

## Objetivo

Garantir que o bloqueio visual do A2+ fique claro no CourseScreen, especialmente no mobile.

## Arquivo analisado

`fluency-clean/src/screens/CourseScreen.jsx`

Estado encontrado:

- níveis acima do A1 recebem classe `locked` quando o A1 ainda não foi aprovado;
- clique em A2+ é bloqueado;
- a mensagem exibida é humana:

```txt
A2 ainda bloqueado. Complete os critérios do A1 para avançar.
```

## Arquivo alterado

`fluency-clean/src/styles/course-screen.css`

## Problema encontrado

A classe `.locked` já era aplicada nos botões de nível, mas o CSS ainda não tinha estilo específico para:

```css
.course-level-tabs button.locked
```

Isso poderia deixar A2/B1/B2/C1/C2 parecendo clicáveis demais.

## Ajuste feito

Adicionado estilo visual específico para níveis bloqueados:

- borda avermelhada suave;
- fundo com tom de bloqueio;
- leve redução de opacidade;
- texto principal em vermelho claro;
- descrição com cor mais clara.

## Resultado esperado

No CourseScreen:

- A1 permanece normal/ativo;
- A2+ aparecem visualmente bloqueados;
- os cards mostram `Bloqueado` e `Conclua o A1 primeiro`;
- tocar em A2+ mantém o aluno no A1;
- a mensagem explica o motivo sem termos técnicos.

## UX limpa

Nenhuma informação técnica foi adicionada à interface.

O aluno vê apenas:

- `Bloqueado`;
- `Conclua o A1 primeiro`;
- `A2 ainda bloqueado. Complete os critérios do A1 para avançar.`

## Economia de deploys

Resultado:

- 1 commit de CSS;
- 1 commit de documentação.

## Próximo bloco recomendado

## Tela real da prova final do A1 — modelo de dados

Objetivo:

Criar a base da prova final do A1 sem ainda fazer uma tela gigante:

- estrutura das seções;
- questões por pilar;
- rubrica local;
- payload de resposta;
- função de avaliação básica;
- sem UI complexa ainda.

Depois:

1. UI shell da prova final;
2. scoring local;
3. salvamento de resultado;
4. conexão com o A1 Gate.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Antes de qualquer alteração, leia:
1. REWRITE_HANDOFF.md
2. fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md
3. fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md
4. fluency-clean/docs/BLOCO-VALIDACAO-VISUAL-BLOQUEIO-A2-CONCLUIDO.md

Próximo bloco: Tela real da prova final do A1 — modelo de dados.
Manter UX limpa, sem termos técnicos na tela do aluno.
Economizar commits/deploys.
Não criar bloco gigante: primeiro criar apenas o modelo de dados/estrutura da prova.
Não mexer em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção, speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não usar DOM injection nem bundle patch.
```
