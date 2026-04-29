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

### Bloco 8-LAB-2C — Retry por bloco e validação equilibrada IMPLEMENTADO, aguardando reteste
Motivo:
- no reteste do usuário apareceram dois erros úteis no diagnóstico:
  1. `JSON Parse error: Expected '}'`;
  2. `Introdução curta demais`.
- o primeiro indica resposta JSON malformada/truncada em uma tentativa da IA;
- o segundo indica que a validação nova estava rígida demais em um ponto isolado, rejeitando aula mesmo quando blocos posteriores passavam.

Arquivos alterados:
- `fluency-clean/src/services/geminiLessons.js`
- `REWRITE_HANDOFF.md`

Commit confirmado:
- `57fc8f2ef4846d068a6bf000081b0991522a23ec` — adiciona retry por bloco e validação equilibrada.

O que foi corrigido:
- adicionado `BLOCK_RETRY_LIMIT = 2`;
- cada bloco agora pode ser regerado internamente até 2 vezes quando vier:
  - JSON inválido;
  - conteúdo curto;
  - poucas seções;
  - vocabulário insuficiente;
  - exercícios insuficientes;
  - produção final insuficiente;
- o diagnóstico agora mostra quando um bloco é regerado por qualidade/JSON;
- o prompt de retry informa o motivo exato da tentativa anterior;
- a exigência de introdução foi equilibrada:
  - ainda precisa existir e ter conteúdo;
  - mas a profundidade principal agora é medida pelo conjunto da aula: seções, texto, vocabulário, exercícios e prompts;
- `responseMimeType: application/json` foi mantido;
- temperatura reduzida para `0.24` para melhorar estabilidade do JSON;
- validação continua rígida contra aula rasa, mas não deve derrubar uma aula inteira só por uma introdução um pouco menor.

Estado esperado no próximo teste:
- se vier JSON quebrado, o bloco deve ser regerado automaticamente;
- se vier introdução curta, o bloco de estrutura deve tentar se corrigir;
- se todos os blocos passarem, a aula deve salvar;
- se ainda vier curta demais, o sistema deve rejeitar com motivo claro.

## Teste recomendado no Vercel/iPhone

1. Esperar novo deploy da branch lab ficar Ready.
2. Abrir o link fixo da branch lab.
3. Gerar novamente a próxima aula do cronograma.
4. Abrir o diagnóstico.
5. Procurar mensagens como:
   - `Regerando bloco 1/5 por qualidade/JSON...`
   - `Bloco 1/5 aprovado...`
6. Se gerar, abrir a Aula e conferir se ficou longa e completa.
7. Se falhar, enviar print do diagnóstico com o último erro.

## Contexto dos blocos anteriores

### UI visual aprovada/organizada
- Speaking aprovado: `LAB-7D`, `LAB-7E`, `LAB-7F`, `LAB-7G`.
- Hoje/Home aprovado: `LAB-HOJE-1`, `LAB-HOJE-1B`.
- Navbar aprovada: `LAB-NAV-1`.
- Aula aprovada e limpa: `LAB-AULA-1`, `LAB-AULA-1B`, `LAB-AULA-2`, `LAB-9`.
- Cartas/Flashcards aprovado: `LAB-CARTAS-1`.
- Progresso aprovado: `LAB-PROGRESSO-1`.
- Ajustes/Configurações aprovado/organizado.
- Imersão adicionada dentro de Speaking e ajustada.
- Checklist visual final: `LAB-10`.

### Bloco 8-LAB-1
- Motor pedagógico multi-tipo para Reading, Grammar, Listening e Writing.

### Bloco 8-LAB-2
- Cronograma pedagógico A1 → C2 automático.
- Usuário não escolhe conteúdo; sistema gera próxima aula obrigatória.

### Bloco 8-LAB-2B
- Exigência de aulas longas e validação rígida.
- Aumentou mínimos de seções, texto, vocabulário, exercícios e prompts.

## Próximo bloco correto

### Se Bloco 8-LAB-2C for aprovado
Próximo: `Bloco 8-LAB-3 — fortalecer cronograma e tela de trilha`.

Objetivo provável:
- mostrar visão da trilha A1 → C2 em Progresso ou Ajustes;
- expandir ainda mais o currículo com mais aulas por nível;
- adicionar bloqueio visual de avanço de nível;
- adicionar porcentagem mínima por nível antes de avançar;
- adicionar revisão obrigatória e simulados antes de liberar próximo nível.

### Se Bloco 8-LAB-2C tiver problema
Não avançar. Corrigir cirurgicamente apenas o problema encontrado na branch lab.

## Como continuar em outro chat
Mensagem recomendada:

"Continue a reconstrução do Fluency usando SOMENTE a branch `rewrite-fluency-clean-lab`. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. O teste é feito no Vercel preview da branch lab, pelo iPhone. A UI visual está aprovada/organizada. O `Bloco 8-LAB-2C` corrigiu os erros JSON Parse/Introdução curta com retry por bloco e validação equilibrada. Está aguardando reteste. Não mexa na `main`, não mexa na `rewrite-fluency-clean`, não use HTML remendado, DOM injection ou bundle patch. Continue modularmente em `fluency-clean/src/`."
