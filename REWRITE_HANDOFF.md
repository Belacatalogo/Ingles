# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

## REGRA MÁXIMA
Todas as próximas alterações devem acontecer SOMENTE na branch:

`rewrite-fluency-clean-lab`

Não alterar `main`.
Não alterar `rewrite-fluency-clean`.
Não mexer em `bundle.js`.
Não editar HTML para simular UI.
Não usar DOM injection.
Não criar bundle patch.
Não mexer no backend Azure privado.

## Estado atual para teste

### Bloco 8-LAB-6 — Travas de domínio real e revisão adaptativa de sábado IMPLEMENTADO, aguardando teste

Objetivo:
- não depender apenas de “aula concluída” para considerar domínio;
- registrar desempenho por pilar;
- detectar pontos fracos em grammar, writing, reading e listening;
- aos sábados, priorizar uma revisão adaptativa completa dos 4 pilares antes da trilha normal.

Arquivos alterados/criados:
- `fluency-clean/src/services/masteryStore.js`
- `fluency-clean/src/services/progressStore.js`
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- criado `masteryStore.js` para armazenar domínio por pilar;
- pilares monitorados:
  - grammar;
  - writing;
  - reading;
  - listening;
- ao concluir aula, o sistema registra:
  - acertos;
  - erros;
  - nota estimada;
  - tópicos fracos;
  - pilar afetado;
- se a nota do pilar ficar abaixo de 85%, o pilar entra como fraco;
- sábado passa a priorizar revisão adaptativa quando houver fraquezas;
- a revisão de sábado cobre obrigatoriamente:
  - Grammar;
  - Writing;
  - Reading;
  - Listening;
- a revisão usa erros/tópicos fracos da semana;
- revisão de sábado não avança a trilha normal como se fosse aula regular;
- diagnóstico registra atualização de domínio após concluir aula.

Comportamento esperado:
- em dias normais, o botão continua gerando a próxima aula da trilha;
- aos sábados, se houver pontos fracos, o painel deve mostrar `Revisão adaptativa de sábado`;
- ao gerar no sábado, a IA deve criar uma revisão dos 4 pilares;
- depois de concluir aulas com erros, o perfil de domínio fica mais preciso.

Teste recomendado no Vercel/iPhone:
1. esperar o deploy da branch lab ficar Ready;
2. concluir uma aula com algumas respostas erradas;
3. abrir diagnóstico e verificar log de domínio atualizado;
4. em sábado, ou quando for possível simular pela data do aparelho, verificar se o painel muda para revisão adaptativa;
5. gerar a revisão e conferir se ela cobre Grammar, Writing, Reading e Listening;
6. confirmar que a trilha normal não é avançada indevidamente pela revisão de sábado.

## Blocos recentes

### Bloco 8-LAB-5B — Cronograma completo sem brechas para todos os níveis
- currículo aprofundado em todos os níveis;
- travas de conclusão muito mais rígidas;
- `mastery-lock` antes de liberar próximo nível.

### Bloco 8-LAB-4B — Áudio natural Gemini primeiro FUNCIONOU
- usuário confirmou que o áudio natural Gemini funcionou;
- fallback do navegador ficou apenas como último recurso.

## Próximo bloco correto

Se o `Bloco 8-LAB-6` for aprovado:

### `Bloco 8-LAB-7 — Persistência real por conta e sincronização Firebase`
Objetivo provável:
- garantir que domínio, cronograma, aula atual, progresso, conclusão e chaves não resetem;
- revisar persistência com Google/Firebase;
- manter fallback local apenas como suporte;
- preparar o sistema para testes finais antes de main.

Se o `Bloco 8-LAB-6` tiver problema:
- não avançar;
- corrigir cirurgicamente apenas a falha encontrada na branch lab.

## Como continuar em outro chat

"Continue a reconstrução do Fluency usando SOMENTE a branch `rewrite-fluency-clean-lab`. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. O teste é feito no Vercel preview da branch lab, pelo iPhone. O `Bloco 8-LAB-6` adicionou domínio real por pilar e revisão adaptativa de sábado dos 4 pilares. Está aguardando teste. Não mexa na `main`, não mexa na `rewrite-fluency-clean`, não use HTML remendado, DOM injection ou bundle patch. Continue modularmente em `fluency-clean/src/`."
