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

## Estado atual para teste

### Bloco 8-LAB-3 — Trilha A1 → C2 visível em Progresso IMPLEMENTADO, aguardando teste
Objetivo:
- mostrar o cronograma que já existia por baixo dentro da aba Progresso;
- deixar claro que o app escolhe a próxima aula em ordem;
- mostrar bloqueio visual de níveis futuros;
- mostrar próximas aulas sem atropelar conteúdo.

Arquivos alterados:
- `fluency-clean/src/screens/ProgressScreen.jsx`
- `fluency-clean/src/styles/lab-polish.css`
- `REWRITE_HANDOFF.md`

Commits confirmados:
- `8c6c192f8794102c80b10e970c6d84d7da74aa49` — adiciona trilha A1-C2 na tela Progresso;
- `9adf2b31c97f372a7945f310ed31e2de0b6114dd` — adiciona estilos da trilha do Progresso.

O que foi adicionado:
- card **Trilha obrigatória** na aba Progresso;
- card da **Próxima aula** do cronograma;
- lista dos níveis A1, A2, B1, B2, C1 e C2;
- cada nível mostra:
  - aulas concluídas/total;
  - barra de progresso;
  - estado atual, consolidado ou bloqueado;
  - quantas aulas/revisões faltam para liberar o próximo nível;
- lista **Próximas aulas**, mostrando a sequência imediata da trilha;
- níveis futuros ficam visualmente bloqueados;
- a seção final de Progresso agora usa o cronograma como próximo marco.

Limites intencionais:
- não mexeu na geração Gemini;
- não mexeu no backend Azure;
- não mexeu no Firebase;
- não mexeu em HTML;
- não mexeu em bundle;
- ainda não expandiu massivamente o currículo; isso fica para bloco futuro;
- ainda não adicionou tela dedicada de currículo editável; por enquanto a trilha aparece em Progresso.

## Teste recomendado no Vercel/iPhone

1. Esperar o deploy da branch lab ficar Ready.
2. Abrir o app no link fixo da branch lab.
3. Entrar em **Progresso**.
4. Verificar se aparece:
   - Nível do cronograma;
   - Trilha obrigatória;
   - Próxima aula;
   - A1 → C2 com níveis bloqueados;
   - Próximas aulas.
5. Conferir se a tela rola até o final sem travar.
6. Conferir se a navbar não cobre informação importante.
7. Conferir se a aba Hoje/Aula continuam funcionando.

## Contexto dos blocos anteriores

### UI visual aprovada/organizada
- Speaking aprovado: `LAB-7D`, `LAB-7E`, `LAB-7F`, `LAB-7G`.
- Hoje/Home aprovado: `LAB-HOJE-1`, `LAB-HOJE-1B`.
- Navbar aprovada: `LAB-NAV-1`.
- Aula aprovada e limpa: `LAB-AULA-1`, `LAB-AULA-1B`, `LAB-AULA-2`, `LAB-9`.
- Cartas/Flashcards aprovado: `LAB-CARTAS-1`.
- Progresso visual aprovado: `LAB-PROGRESSO-1`.
- Ajustes/Configurações aprovado/organizado.
- Imersão adicionada dentro de Speaking e ajustada.
- Checklist visual final: `LAB-10`.

### Bloco 8-LAB-1
- Motor pedagógico multi-tipo para Reading, Grammar, Listening e Writing.

### Bloco 8-LAB-2
- Cronograma pedagógico A1 → C2 automático.
- Usuário não escolhe conteúdo; sistema gera próxima aula obrigatória.

### Bloco 8-LAB-2B/2C/2D
- Geração longa, retry por bloco, validação equilibrada e estabilização do JSON.

### Bloco 8-LAB-2E/2F
- Estatísticas reais de tempo/exercícios para Aula e Hoje, sem valor fixo.

## Próximo bloco correto

### Se Bloco 8-LAB-3 for aprovado
Próximo: `Bloco 8-LAB-4 — expandir currículo e travas pedagógicas`.

Objetivo provável:
- expandir muito mais o cronograma A1, A2, B1, B2, C1 e C2;
- adicionar revisões obrigatórias mais claras;
- adicionar simulados de fim de nível;
- reforçar regra de não avançar de nível antes de consolidar quase tudo;
- melhorar o cálculo de liberação de nível.

### Se Bloco 8-LAB-3 tiver problema
Não avançar. Corrigir cirurgicamente apenas o problema encontrado na branch lab.

## Como continuar em outro chat
Mensagem recomendada:

"Continue a reconstrução do Fluency usando SOMENTE a branch `rewrite-fluency-clean-lab`. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. O teste é feito no Vercel preview da branch lab, pelo iPhone. A UI visual está aprovada/organizada. O `Bloco 8-LAB-3` adicionou a trilha A1 → C2 visível na aba Progresso e está aguardando teste. Não mexa na `main`, não mexa na `rewrite-fluency-clean`, não use HTML remendado, DOM injection ou bundle patch. Continue modularmente em `fluency-clean/src/`."
