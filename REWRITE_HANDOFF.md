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

### Bloco 8-LAB-7 — Persistência real por conta e sincronização Firebase IMPLEMENTADO, aguardando teste

Objetivo:
- manter Google + Firebase como recomendado;
- usar Google para autenticação;
- usar Firebase/Firestore como memória da conta;
- manter `localStorage` como fallback quando a nuvem falhar.

Arquivos alterados/criados:
- `fluency-clean/src/services/firebase.js`
- `fluency-clean/src/services/cloudSync.js`
- `fluency-clean/src/services/storage.js`
- `fluency-clean/src/services/auth.js`
- `REWRITE_HANDOFF.md`

O que foi implementado:
- `firebase.js` agora expõe Firestore via `getFirebaseDb()`;
- criado `cloudSync.js` para sincronizar dados por usuário em `fluencyUsers/{uid}`;
- ao detectar usuário Google, o app:
  - tenta carregar dados da nuvem;
  - se não existir documento, cria perfil com dados locais;
  - depois envia um merge local → nuvem;
- `storage.js` continua salvando localmente, mas agenda sincronização automática quando dados importantes mudam;
- `auth.js` chama a sincronização ao login, redirect, estado autenticado e logout;
- dados sincronizados incluem:
  - progresso geral;
  - aulas concluídas;
  - rascunhos;
  - posição no currículo;
  - domínio por pilar;
  - aula atual;
  - histórico de aulas;
  - chaves Gemini de aula;
  - configurações.

Comportamento esperado:
- com Google logado, o diagnóstico deve mostrar:
  - usuário autenticado;
  - usuário detectado para sync;
  - progresso carregado da nuvem ou perfil criado;
  - dados sincronizados com Firebase;
- se Firestore falhar, o app não deve quebrar;
- se Firestore falhar, o app usa modo local-fallback e registra erro no diagnóstico.

Aviso importante:
- para a sincronização realmente salvar na nuvem, o Firestore precisa estar habilitado no projeto Firebase;
- as regras do Firestore precisam permitir que usuário autenticado leia/escreva o próprio documento `fluencyUsers/{uid}`;
- se Firestore não estiver habilitado ou regras bloquearem, o app continua local e mostra erro no diagnóstico.

Teste recomendado no Vercel/iPhone:
1. esperar deploy da branch lab ficar Ready;
2. entrar com Google;
3. abrir diagnóstico;
4. verificar se aparece `Usuário Google detectado para sync`;
5. concluir uma aula ou gerar uma aula;
6. verificar se aparece `Dados sincronizados com Firebase`;
7. atualizar a página no Safari;
8. confirmar que aula atual/progresso continuam;
9. se possível, abrir em outro navegador/dispositivo com a mesma conta e confirmar que carrega os dados.

## Blocos recentes

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

Se o `Bloco 8-LAB-7` for aprovado:

### `Bloco 8-LAB-8 — Checklist funcional final antes da main`
Objetivo provável:
- revisar login;
- geração Gemini;
- aula longa;
- áudio natural;
- conclusão;
- domínio por pilar;
- revisão adaptativa;
- persistência Firebase;
- progresso;
- refresh no iPhone;
- preparar decisão de promoção para branch estável/main se o usuário pedir.

Se o `Bloco 8-LAB-7` tiver problema:
- não avançar;
- corrigir cirurgicamente apenas a falha encontrada na branch lab.

## Como continuar em outro chat

"Continue a reconstrução do Fluency usando SOMENTE a branch `rewrite-fluency-clean-lab`. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. O teste é feito no Vercel preview da branch lab, pelo iPhone. O `Bloco 8-LAB-7` adicionou persistência real por conta com Google + Firebase/Firestore, mantendo localStorage como fallback. Está aguardando teste. Não mexa na `main`, não mexa na `rewrite-fluency-clean`, não use HTML remendado, DOM injection ou bundle patch. Continue modularmente em `fluency-clean/src/`."
