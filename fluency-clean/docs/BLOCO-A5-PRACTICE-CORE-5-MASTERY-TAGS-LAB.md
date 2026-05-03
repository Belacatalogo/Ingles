# BLOCO-A5 — Practice Core 5 · Mastery por Tag Pedagógica

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado.

## Pré-requisitos

- `BLOCO-A1-PRACTICE-CORE-1-STATE-MACHINE-LAB` implementado.
- `BLOCO-A2-PRACTICE-CORE-2-LEAK-DETECTOR-LAB` implementado.
- `BLOCO-A3-PRACTICE-CORE-3-PURITY-MATRIX-LAB` implementado.
- `BLOCO-A4-PRACTICE-CORE-4-SRS-EXTENDED-LAB` implementado.

## Objetivo

Adicionar mastery por tag pedagógica específica, separado do `masteryStore.js` atual.

Diferença conceitual:

- SRS estendido: decide quando revisar um item.
- Mastery por tag: mede quanto o aluno domina conceitos amplos, como `present_simple_3rd_s`, `main_idea`, `linking_t_y` ou `sentence_structure`.

## Arquivos criados

- `fluency-clean/src/practice/core/PracticeMasteryTags.js`
- `fluency-clean/src/styles/practice-mastery-recap.css`
- `fluency-clean/docs/BLOCO-A5-PRACTICE-CORE-5-MASTERY-TAGS-LAB.md`

## Arquivos alterados

- `fluency-clean/src/practice/core/index.js`
- `fluency-clean/src/practice/core/PracticeAnswerChecker.js`
- `fluency-clean/src/practice/PracticePlanAdapter.js`
- `fluency-clean/src/practice/PracticeFullscreen.jsx`
- `fluency-clean/src/practice/components/PracticeDone.jsx`
- `fluency-clean/src/main.jsx`

## Storage

Criado storage local separado:

`fluency.practiceMasteryTags.v1`

Também criado controle diário de decay:

`fluency.practiceMasteryTags.lastDecayDate.v1`

## Domínios

Criado `TAG_DOMAIN`:

- `GRAMMAR`
- `VOCABULARY`
- `PRONUNCIATION`
- `LISTENING_SKILL`
- `READING_SKILL`
- `WRITING_SKILL`

## Bandas

Criado `MASTERY_BANDS`:

- `0–30`: Iniciando
- `31–55`: Frágil
- `56–75`: Em prática
- `76–90`: Forte
- `91–100`: Dominado

## API criada

Em `PracticeMasteryTags.js`:

- `updateMasteryTag({ tag, domain, label, correct })`
- `applyMasteryDecay()`
- `applyMasteryDecayOncePerDay()`
- `getMasteryTag(tag)`
- `listMasteryTags({ domain, sortBy, limit })`
- `getMasterySummary()`
- `getMasteryBand(value)`
- `readableReadingSkill(tag)`
- `readableListeningSkill(tag)`
- `readableWritingSkill(tag)`

## Fórmula

Tag começa em 50.

- Acerto: `atual + (100 - atual) * 0.15`
- Erro: `atual - atual * 0.08`

`applyMasteryDecayOncePerDay()` roda no boot do app e aplica decay leve para tags não revisadas há mais de 30 dias.

## Integração no checker

`PracticeAnswerChecker.js` agora atualiza mastery após respostas quando a questão possui tags explícitas:

- `grammarTag` → `TAG_DOMAIN.GRAMMAR`
- `vocabTag` → `TAG_DOMAIN.VOCABULARY`
- `pronunciationWord` + `azureScore` → `TAG_DOMAIN.PRONUNCIATION`
- `readingSkillTag` → `TAG_DOMAIN.READING_SKILL`
- `listeningSkillTag` → `TAG_DOMAIN.LISTENING_SKILL`
- `writingSkillTag` → `TAG_DOMAIN.WRITING_SKILL`

Questão sem tag pedagógica não cria/atualiza mastery.

## Integração no adapter/fullscreen

`PracticePlanAdapter.js` agora retorna `touchedMasteryTags` junto da avaliação.

`PracticeFullscreen.jsx` junta as tags tocadas na sessão, remove duplicadas, ordena pelas mais fracas e envia até 6 tags para o resumo final.

## Resumo final

`PracticeDone.jsx` agora mostra a seção compacta:

`Domínio das habilidades`

Ela só aparece quando houve tags pedagógicas na sessão. Não aparece durante a prática, para evitar ansiedade.

## CSS

Criado `practice-mastery-recap.css` e importado em `main.jsx`.

O layout é compacto e mobile-first:

- label da tag;
- barra simples;
- banda + percentual.

## Compatibilidade preservada

- `masteryStore.js` não foi substituído.
- `vocabularySrs.js` não foi alterado.
- SRS estendido do A4 continua separado.
- Não foi criado Firebase sync.
- Não foi criada tela técnica.
- Não foi mostrada mastery durante a sessão.
- Não foi alterado `bundle.js`.
- Não foi alterado backend Azure privado.

## Critérios de aceitação

- [x] `PracticeMasteryTags.js` criado com API completa.
- [x] `index.js` exporta mastery tags.
- [x] `PracticeAnswerChecker.js` chama `updateMasteryTag` quando questão tem tag.
- [x] `PracticePlanAdapter.js` retorna `touchedMasteryTags`.
- [x] `PracticeFullscreen.jsx` acumula até 6 tags da sessão.
- [x] `PracticeDone.jsx` mostra recap compacta no final.
- [x] CSS criado e importado.
- [x] `applyMasteryDecayOncePerDay()` chamado no boot do app.
- [x] Não substitui `masteryStore.js`.

## O que NÃO foi feito

- Não foi criada tela de progresso com mastery por tag neste bloco.
- Não foi persistido no Firebase.
- Não foi criada gamificação/conquista.
- Não foi exibido mastery durante a sessão.
- Não foram criadas tags automaticamente em questões antigas sem metadados.

## Checklist iPhone — após bloco 5

- Concluir uma sessão que contenha questões com `grammarTag` ou outra tag pedagógica.
- Confirmar que o resumo final mostra `Domínio das habilidades`.
- Confirmar que aparecem no máximo 6 tags.
- Confirmar que a barra não quebra no iPhone.
- Confirmar que questão sem tag não mostra recap vazio.
- Confirmar que `localStorage` recebeu `fluency.practiceMasteryTags.v1`.
- Repetir uma sessão com a mesma tag e confirmar que o percentual muda.

## Fim da Fase A

Blocos A1–A5 implementados.

Próximo bloco recomendado:

`BLOCO-B1-READING-PRACTICE-1-VARIANT-POLICY-LAB`.
