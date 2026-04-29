# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

## REGRA MÁXIMA
Todas as próximas alterações devem acontecer SOMENTE na branch:

`rewrite-fluency-clean-lab`

Não alterar `main`.
Não alterar `rewrite-fluency-clean`.
Não fazer rollback, force push, update_file ou qualquer mudança fora da branch lab sem pedido explícito do usuário.

## REGRA DE TESTE — VERCEL PREVIEW
O usuário testa as mudanças no **Vercel**, sempre no deploy/preview mais recente da branch:

`rewrite-fluency-clean-lab`

Fluxo correto:
1. fazer alterações somente na branch lab;
2. usuário dispara/aguarda o deploy da Vercel da branch lab;
3. usuário testa no iPhone pelo preview da Vercel;
4. só avançar depois da confirmação do usuário.

## REGRA DE ORGANIZAÇÃO — SEM GAMBIARRAS, SEM BUNDLE DE PATCHES
Continuar montando o sistema como React modular em `fluency-clean/src/`:
- telas em `fluency-clean/src/screens/`;
- componentes em `fluency-clean/src/components/`;
- serviços em `fluency-clean/src/services/`;
- estilos reais em `fluency-clean/src/styles/`;
- não usar DOM injection;
- não mexer em `bundle.js`;
- não criar bundle patch;
- não editar HTML para simular UI;
- não usar `preview-clean` como produto final;
- não mexer no backend Azure privado.

## Estado aprovado pelo usuário

### UI visual aprovada/organizada
- Speaking aprovado: `LAB-7D`, `LAB-7E`, `LAB-7F`, `LAB-7G`.
- Hoje/Home aprovado: `LAB-HOJE-1`, `LAB-HOJE-1B`.
- Navbar aprovada: `LAB-NAV-1`.
- Aula aprovada e limpa: `LAB-AULA-1`, `LAB-AULA-1B`, `LAB-AULA-2`, `LAB-9`.
- Cartas/Flashcards aprovado: `LAB-CARTAS-1`.
- Progresso aprovado: `LAB-PROGRESSO-1`.
- Ajustes/Configurações aprovado/organizado: chaves movidas para Ajustes, aba IA geral criada, `LAB-AJUSTES-1B`, limpeza LAB-9.
- Imersão adicionada dentro de Speaking e ajustada: `LAB-IMERSAO-1`, `LAB-IMERSAO-1B`.
- Checklist visual final: `LAB-10` removeu o rodapé lab escondido e fez varredura por textos técnicos.

## Estado atual para teste

### Bloco 8-LAB-1 — Motor pedagógico multi-tipo IMPLEMENTADO
Objetivo:
- preparar a geração de aulas para Reading, Grammar, Listening e Writing;
- usar blueprints pedagógicos por tipo;
- melhorar aproveitamento do conteúdo real da IA em Listening e Writing.

Arquivos principais:
- `fluency-clean/src/services/lessonTypes.js`
- `fluency-clean/src/services/geminiLessons.js`
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx`
- `fluency-clean/src/lessons/ListeningLesson.jsx`
- `fluency-clean/src/lessons/WritingLesson.jsx`
- `fluency-clean/src/services/lessonStore.js`

### Bloco 8-LAB-2 — Cronograma pedagógico A1 → C2 automático IMPLEMENTADO, aguardando teste
Pedido do usuário:
- não quer escolher o conteúdo manualmente;
- quer um cronograma extremamente completo e extenso;
- quer aprender em ordem, do A1 ao avançado;
- não quer ver uma aula que dependa de conteúdo ainda não estudado;
- quer aulas longas, aprofundadas e com muitas perguntas;
- a IA deve gerar a aula, mas seguindo obrigatoriamente o cronograma;
- não quer passar de nível sem ver o máximo de conteúdo possível daquele nível.

Arquivos alterados/criados:
- `fluency-clean/src/services/curriculumPlan.js`
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx`
- `fluency-clean/src/services/progressStore.js`
- `fluency-clean/src/services/lessonStore.js`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- criado `curriculumPlan.js` com trilha local A1 → C2;
- a trilha contém níveis, unidades, aulas, tipos e pré-requisitos;
- A1 é mais extenso e bem detalhado, cobrindo fundamentos antes de avançar;
- A2, B1, B2, C1 e C2 já têm estrutura ordenada inicial;
- o gerador não pede mais prompt livre para escolher conteúdo;
- o painel agora mostra:
  - nível atual;
  - progresso do nível;
  - próxima aula obrigatória;
  - botão **Gerar próxima aula**;
- ao gerar, o sistema monta um prompt interno com:
  - ID da aula;
  - tipo;
  - nível;
  - unidade;
  - tema obrigatório;
  - pré-requisitos;
  - regras para não atropelar conteúdo;
- ao concluir uma aula, `progressStore.js` marca também a aula do cronograma como concluída;
- a próxima geração avança para a próxima aula ainda não concluída.

Commits confirmados deste bloco:
- `11cf4877bc02ccc1e8e6a437b3566caf5c530219` — avança cronograma ao concluir aula;
- `2846c4d10d6408b05c612694277fa0936b4434e9` — gerador segue cronograma automático;
- além do commit de criação de `curriculumPlan.js` e do ajuste em `lessonStore.js` neste bloco.

Limites intencionais:
- cronograma está local no frontend por enquanto;
- ainda não existe tela dedicada para editar/ver o cronograma completo;
- ainda não existe bloqueio visual sofisticado de “não avançar de nível”, mas a geração já segue a ordem da trilha;
- não mexeu em backend Azure privado;
- não mexeu em Firebase;
- não mexeu em HTML;
- não mexeu em bundle;
- não conectou IA geral de Speaking/Imersão ainda;
- não fez promoção/merge para branch estável.

## Teste recomendado no Vercel/iPhone

1. Abrir **Hoje**.
2. Abrir **Gerar nova aula por IA**.
3. Confirmar que não aparece mais o campo para escolher conteúdo livre.
4. Confirmar que aparece **Próxima aula do cronograma**.
5. Confirmar que aparece algo como:
   - Nível atual: A1;
   - Progresso do nível;
   - Próxima: A1 · reading · Cumprimentos, nomes e apresentações simples.
6. Tocar em **Gerar próxima aula**.
7. Abrir diagnóstico e confirmar que a geração usa o tipo detectado e blocos.
8. Depois de gerar, abrir **Aula** e concluir.
9. Voltar ao gerador e confirmar que a próxima aula avançou no cronograma.

## Próximo bloco correto

### Se Bloco 8-LAB-2 for aprovado
Próximo: `Bloco 8-LAB-3 — fortalecer cronograma e tela de trilha`.

Objetivo provável:
- mostrar uma visão da trilha A1 → C2 em Progresso ou Ajustes;
- expandir ainda mais o currículo com mais aulas por nível;
- adicionar bloqueio visual de avanço de nível;
- adicionar porcentagem mínima por nível antes de avançar;
- adicionar revisão obrigatória e simulados antes de liberar próximo nível.

### Se Bloco 8-LAB-2 tiver problema
Não avançar. Corrigir cirurgicamente apenas o problema encontrado na branch lab.

## Ordem restante dos blocos

1. `Bloco 8-LAB-3` — fortalecer cronograma e tela de trilha.
2. Checklist funcional real: login, áudio, Azure, Gemini, geração/conclusão de aula e persistência.
3. Só depois, considerar promoção/merge para branch estável, se o usuário pedir explicitamente.

## Estratégia de segurança

### Regra 1 — Um bloco = uma UI ou uma mudança pequena
Nada de reformular várias telas ao mesmo tempo.

### Regra 2 — Sempre informar arquivos alterados
Após alteração, responder com:
- branch usada;
- arquivos alterados;
- commit gerado;
- o que testar no Vercel.

### Regra 3 — Sem tocar na branch protegida
Antes de qualquer escrita, conferir:

`branch === rewrite-fluency-clean-lab`

### Regra 4 — Teste antes de continuar
Depois de cada bloco, o usuário testa no Vercel pelo iPhone. Só avançar se ele confirmar.

### Regra 5 — Se der tela branca
1. parar;
2. revisar último commit da lab;
3. reverter somente o último bloco na lab;
4. preservar `main` e `rewrite-fluency-clean` intactas.

## Como continuar em outro chat
Mensagem recomendada:

"Continue a reconstrução do Fluency usando SOMENTE a branch `rewrite-fluency-clean-lab`. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. O teste é feito no Vercel preview da branch lab, pelo iPhone. A UI visual está aprovada/organizada. O `Bloco 8-LAB-2` criou cronograma pedagógico A1 → C2 automático: o usuário não escolhe mais o conteúdo, o gerador segue a próxima aula obrigatória da trilha e avança ao concluir. Não mexa na `main`, não mexa na `rewrite-fluency-clean`, não use HTML remendado, DOM injection ou bundle patch. Continue modularmente em `fluency-clean/src/`."

## Última orientação operacional
A partir deste handoff, qualquer alteração fora de `rewrite-fluency-clean-lab` deve ser considerada erro, salvo pedido explícito do usuário.
