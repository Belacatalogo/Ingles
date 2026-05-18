# BLOCO-QUALITY-DIRECTOR-06 — Progresso, XP, streak e mastery

Data: 2026-05-18  
Branch: `main`

## Objetivo

Adicionar ao Fluency Quality Director uma auditoria dedicada ao sistema de progresso, XP, conclusão de aula, mastery, weak pillars, recent errors e gates.

Esse bloco existe para impedir que o aluno perca confiança no sistema por bugs como:

- concluir uma aula e não salvar progresso;
- ganhar XP duplicado ao revisitar aula;
- aula concluída não aparecer como concluída;
- mastery não registrar tentativa;
- erros fracos não alimentarem revisão adaptativa;
- gate orientar avanço sem dados suficientes;
- localStorage com `null` causar crash.

## Arquivos criados

- `fluency-clean/e2e/quality-director/helpers/progressMasteryProbe.js`
- `fluency-clean/e2e/quality-director/progress-mastery.audit.spec.js`
- `fluency-clean/docs/BLOCO-QUALITY-DIRECTOR-06-CONCLUIDO.md`

## Como funciona

A suíte `progress-mastery.audit.spec.js` abre o app em ambiente Playwright, importa dinamicamente os serviços reais do frontend e executa um probe dentro do navegador.

O helper `progressMasteryProbe.js` importa:

```js
/src/services/progressStore.js
/src/services/masteryStore.js
/src/services/masteryGate.js
```

Depois limpa chaves de teste no `localStorage` e simula conclusões de aula usando uma aula real `ready`:

```txt
A1-READING-001
```

## Checks principais

### Primeira conclusão

Verifica:

- `completeLesson()` retorna `saved: true`;
- primeira conclusão não é marcada como duplicada;
- XP vira `25`;
- `completedLessons` vira `1`;
- `isLessonCompleted(lesson)` retorna `true`;
- `progress.lessonCompletions` tem 1 item.

### Revisita da mesma aula

Verifica:

- segunda conclusão retorna `alreadyCompleted: true`;
- XP não duplica;
- `completedLessons` não aumenta;
- lista de conclusões não duplica a mesma aula.

### Mastery

Verifica:

- mastery registra tentativa forte na primeira conclusão;
- contador de tentativas não regride em revisita;
- conclusão fraca alimenta `weakCount`;
- conclusão fraca gera `recentErrors`;
- `getWeakPillars(85)` inclui o pilar fraco.

### Gate

Verifica:

- gate sem progresso retorna `needs_more_data`;
- sistema não orienta avanço sem dados.

### Estados nulos/corrompidos

Força no localStorage:

```txt
fluency.clean.progress.summary = null
fluency.clean.progress.lessonCompletions = null
fluency.clean.mastery.skillProfile.v1 = null
```

E verifica:

- `getProgressSummary()` normaliza para XP 0 e completedLessons 0;
- `getLessonCompletions()` normaliza para array vazio;
- `getMasteryProfile()` normaliza para perfil vazio seguro com pilares e `recentErrors`.

## Severidades

### P0

- primeira conclusão não salva;
- XP/completedLessons incorretos após primeira conclusão;
- aula não aparece como concluída;
- XP duplica em revisita;
- estados `null` quebram normalização.

### P1

- revisita não reconhecida como duplicada;
- lista de conclusões duplica aula;
- mastery não registra tentativa;
- erro fraco não alimenta revisão;
- gate sem progresso retorna estado inseguro.

## Importante

Este bloco não altera a lógica de progresso. Ele apenas audita os serviços reais.

Correções futuras devem ser feitas em blocos próprios se o relatório apontar problemas.

## Limitações atuais

- Ainda não audita fluxo visual completo até conclusão via cliques reais; isso já começou no bloco 02, mas este bloco foca nos serviços.
- Ainda não testa mudança real de data entre dias para streak/yesterday, apenas normalização e conclusão no dia atual.
- Ainda não audita checkpoint/final exam em profundidade.

Blocos futuros podem expandir para:

- simular datas diferentes;
- testar checkpoints reais;
- testar gates por nível completos;
- validar relação entre conclusão, prática profunda e mastery por pilar.

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
BLOCO-QUALITY-DIRECTOR-07 — Estados vazios, erros e segurança visual
```

Objetivo: testar o app sem dados e com estados corrompidos: sem aula atual, sem progresso, sem flashcards, sem chaves, sem áudio, localStorage inválido, evitando textos técnicos e crashes.
