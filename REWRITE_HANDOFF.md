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

### Bloco 8-LAB-1 — Motor pedagógico multi-tipo IMPLEMENTADO, aguardando teste do usuário
Objetivo do bloco:
- iniciar a reestruturação profunda das aulas/conteúdo pedagógico;
- preparar a geração de aulas para mais de um tipo real;
- melhorar o aproveitamento do conteúdo real gerado pela IA em Listening e Writing;
- manter visual aprovado e backend intactos.

Arquivos alterados:
- `fluency-clean/src/services/lessonTypes.js`
- `fluency-clean/src/services/geminiLessons.js`
- `fluency-clean/src/components/lesson/LessonGeneratorPanel.jsx`
- `fluency-clean/src/lessons/ListeningLesson.jsx`
- `fluency-clean/src/lessons/WritingLesson.jsx`
- `fluency-clean/src/services/lessonStore.js`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- `lessonTypes.js` agora normaliza um schema mais rico de aula:
  - `objective`;
  - `focus`;
  - `sections` com exemplos;
  - `exercises` com explicação;
  - `prompts` de produção;
  - aliases e inferência de tipo por texto do pedido.
- `geminiLessons.js` agora detecta o tipo de aula pelo prompt:
  - Reading;
  - Grammar;
  - Listening;
  - Writing.
- O gerador passou a usar blueprints pedagógicos por tipo:
  - Reading: estrutura, texto principal, vocabulário, exercícios e produção;
  - Grammar: regra, exemplos, prática e produção;
  - Listening: estrutura, transcrição, vocabulário, exercícios e shadowing;
  - Writing: modelo, estrutura, roteiro, microprática e produção final.
- O diagnóstico agora registra o tipo detectado e os blocos gerados.
- `LessonGeneratorPanel.jsx` foi atualizado para orientar o usuário a pedir Reading/Grammar/Listening/Writing e aponta as chaves para Ajustes > Chaves de aulas.
- `ListeningLesson.jsx` agora usa a transcrição real da IA (`listeningText`), exercícios reais e rascunho/conclusão real.
- `WritingLesson.jsx` agora usa seções/prompts reais da IA, não apenas roteiro fixo.
- `lessonStore.js` teve o prompt padrão atualizado para aula mais completa.

Limites intencionais:
- não mexeu em backend Azure privado;
- não mexeu em Firebase;
- não mexeu em HTML;
- não mexeu em bundle;
- não conectou IA geral de Speaking/Imersão ainda;
- não alterou visual aprovado das telas principais;
- não fez promoção/merge para branch estável.

## Teste recomendado no Vercel/iPhone

1. Abrir **Hoje**.
2. Abrir o painel **Gerar nova aula por IA**.
3. Gerar uma aula Reading A1 simples e confirmar se abre na aba Aula.
4. Depois testar pelo menos uma aula Grammar A1 com prompt explícito:
   - “Gere uma aula de Grammar A1 sobre Simple Present com explicação profunda e prática.”
5. Opcionalmente testar Listening ou Writing:
   - “Gere uma aula de Listening A1 sobre pedir café em uma cafeteria.”
   - “Gere uma aula de Writing A1 sobre my daily routine.”
6. Conferir no diagnóstico se aparece “Tipo de aula detectado”.
7. Confirmar que não aparece tela branca.
8. Confirmar que Aula renderiza o tipo gerado sem travar.

## Próximo bloco correto

### Se Bloco 8-LAB-1 for aprovado
Próximo: `Bloco 8-LAB-2 — aprofundar renderização pedagógica e conclusão por tipo`.

Objetivo provável:
- melhorar Grammar com exemplos e explicações mais ricas;
- melhorar Listening com perguntas sem revelar resposta antes da tentativa;
- melhorar Writing com checklist e correção guiada;
- padronizar conclusão/progresso por tipo;
- manter sistema modular e seguro.

### Se Bloco 8-LAB-1 tiver problema
Não avançar. Corrigir cirurgicamente apenas o problema encontrado na branch lab.

## Ordem restante dos blocos

1. `Bloco 8-LAB-2` — aprofundar renderização pedagógica e conclusão por tipo.
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

"Continue a reconstrução do Fluency usando SOMENTE a branch `rewrite-fluency-clean-lab`. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. O teste é feito no Vercel preview da branch lab, pelo iPhone. A UI visual está aprovada/organizada. O `Bloco 8-LAB-1` implementou motor pedagógico multi-tipo para Reading, Grammar, Listening e Writing e está aguardando teste. Não mexa na `main`, não mexa na `rewrite-fluency-clean`, não use HTML remendado, DOM injection ou bundle patch. Continue modularmente em `fluency-clean/src/`."

## Última orientação operacional
A partir deste handoff, qualquer alteração fora de `rewrite-fluency-clean-lab` deve ser considerada erro, salvo pedido explícito do usuário.
