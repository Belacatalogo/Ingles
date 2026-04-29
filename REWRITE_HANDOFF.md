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

### Bloco 8-LAB-8 — Checklist funcional final antes da main IMPLEMENTADO, aguardando teste

Objetivo:
- revisar o sistema antes de pensar em promoção para branch estável/main;
- adicionar checklist interno de saúde do app;
- melhorar diagnóstico para identificar problemas de Firebase, sync, keys, currículo, aula atual, progresso e domínio;
- blindar risco de ciclo entre `storage.js` e `cloudSync.js`.

Arquivos alterados/criados:
- `fluency-clean/src/services/systemHealth.js`
- `fluency-clean/src/components/system/DiagnosticPanel.jsx`
- `fluency-clean/src/styles/lab-polish.css`
- `fluency-clean/src/services/storage.js`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- criado `systemHealth.js` com checklist funcional;
- o diagnóstico agora mostra um card **Checklist LAB-8**;
- o checklist verifica:
  - Firebase;
  - Sync da conta;
  - Keys de aulas;
  - Currículo;
  - Aula atual;
  - Progresso;
  - Domínio por pilar;
  - Diagnóstico geral;
- botão **Verificar** registra um log de checklist;
- estilos do checklist adicionados em `lab-polish.css`;
- `storage.js` deixou de importar `cloudSync.js` diretamente e passou a usar import dinâmico, reduzindo risco de erro por dependência circular no build;
- segue sem mexer em HTML, bundle, main, branch estável ou backend Azure.

Teste recomendado no Vercel/iPhone:
1. esperar deploy da branch lab ficar Ready;
2. abrir o app;
3. abrir o botão de diagnóstico;
4. conferir se aparece o card **Checklist LAB-8**;
5. tocar em **Verificar**;
6. conferir se aparecem status de Firebase, Sync, Keys, Currículo, Aula, Progresso e Domínio;
7. navegar por Hoje, Aula, Cartas, Speaking, Progresso e Ajustes;
8. atualizar a página no Safari;
9. confirmar que não aparece erro de renderização;
10. se houver aviso amarelo, verificar se é esperado, por exemplo: sem Firestore/regras, sem aula atual, sem key etc.

## Blocos recentes

### Bloco 8-LAB-7B — Blindagem contra dados nulos do sync FUNCIONOU
- corrigiu erro `null is not an object (evaluating 'e.xp')`;
- usuário confirmou que deu certo.

### Bloco 8-LAB-7 — Persistência real por conta e sincronização Firebase
- Google + Firebase/Firestore;
- dados por `fluencyUsers/{uid}`;
- localStorage como fallback.

### Bloco 8-LAB-6 — Travas de domínio real e revisão adaptativa de sábado
- domínio por pilar;
- revisão adaptativa aos sábados;
- revisão cobre Grammar, Writing, Reading e Listening.

### Bloco 8-LAB-5B — Cronograma completo sem brechas para todos os níveis
- currículo aprofundado em todos os níveis;
- travas de conclusão muito mais rígidas;
- `mastery-lock` antes de liberar próximo nível.

### Bloco 8-LAB-4B — Áudio natural Gemini primeiro FUNCIONOU
- usuário confirmou que o áudio natural Gemini funcionou;
- fallback do navegador ficou apenas como último recurso.

## Próximo bloco correto

Se o `Bloco 8-LAB-8` for aprovado:

### `Bloco 8-LAB-9 — Preparação para promoção controlada`
Objetivo provável:
- revisar build/preview final;
- preparar plano de promoção para branch estável;
- não mexer em main automaticamente;
- listar exatamente o que será promovido, riscos e rollback;
- só promover se o usuário pedir explicitamente.

Se o `Bloco 8-LAB-8` tiver problema:
- não avançar;
- corrigir cirurgicamente apenas a falha encontrada na branch lab.

## Como continuar em outro chat

"Continue a reconstrução do Fluency usando SOMENTE a branch `rewrite-fluency-clean-lab`. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. O teste é feito no Vercel preview da branch lab, pelo iPhone. O `Bloco 8-LAB-8` adicionou o checklist funcional final no diagnóstico e blindou ciclo storage/cloudSync. Está aguardando teste. Não mexa na `main`, não mexa na `rewrite-fluency-clean`, não use HTML remendado, DOM injection ou bundle patch. Continue modularmente em `fluency-clean/src/`."
