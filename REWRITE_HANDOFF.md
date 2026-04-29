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

### Bloco 8-LAB-2 — Cronograma pedagógico A1 → C2 automático IMPLEMENTADO
Objetivo:
- o usuário não escolhe conteúdo manualmente;
- o gerador segue a próxima aula obrigatória do cronograma;
- a aula avança ao concluir;
- a geração recebe nível, unidade, tema obrigatório e pré-requisitos.

### Bloco 8-LAB-2B — Aulas longas e validação rígida IMPLEMENTADO, aguardando reteste
Motivo:
- o usuário gerou a primeira aula do cronograma, mas ela veio curta demais;
- o sistema estava aceitando texto principal com mínimo baixo e poucos exercícios.

Arquivos alterados neste ajuste:
- `fluency-clean/src/services/geminiLessons.js`
- `REWRITE_HANDOFF.md`

Commit confirmado:
- `eb544cc8d58bdcdf6cbe9ea44369fb5c6c871643` — exige aulas longas e profundas.

O que foi corrigido:
- aumentados tokens por bloco;
- criadas regras globais de qualidade para impedir aula curta;
- Reading agora exige:
  - intro mais longa;
  - 6 a 8 seções explicativas;
  - texto principal com mínimo de 1200 caracteres;
  - 14 a 18 itens de vocabulário;
  - 14 a 18 exercícios;
  - 5 a 7 prompts finais.
- Grammar agora exige:
  - 7 a 9 seções;
  - 10 a 14 vocabulários;
  - 16 a 22 exercícios;
  - 5 a 7 prompts finais.
- Listening agora exige:
  - transcrição longa;
  - 12 a 16 vocabulários;
  - 12 a 16 exercícios;
  - 5 a 7 prompts de shadowing.
- Writing agora exige:
  - 7 a 9 seções;
  - 12 a 16 vocabulários;
  - 12 a 16 micropráticas;
  - 6 a 8 prompts finais.
- a validação agora rejeita automaticamente aula com:
  - introdução curta;
  - poucas seções;
  - texto principal curto em Reading/Listening;
  - pouco vocabulário;
  - poucos exercícios;
  - pouca produção final.
- diagnóstico agora informa o critério de qualidade: aula longa, profunda, quantidade mínima de exercícios e vocabulários.

Limites intencionais:
- aulas longas podem consumir mais tokens/key;
- se o Gemini Flash não conseguir entregar a estrutura longa, a geração pode falhar em vez de aceitar aula curta;
- isso é intencional para preservar qualidade;
- não mexeu em backend, Azure, Firebase, HTML ou bundle.

## Teste recomendado no Vercel/iPhone

1. Esperar o novo deploy da branch lab ficar Ready.
2. Abrir o link fixo da branch lab.
3. Ir em **Hoje > Gerar próxima aula**.
4. Gerar novamente a próxima aula do cronograma.
5. Abrir o diagnóstico e verificar se aparece algo como:
   - `Critério de qualidade: longa, profunda...`
   - blocos sendo aprovados.
6. Se a IA gerar curto, o sistema deve rejeitar e tentar/falhar, não aceitar aula rasa.
7. Se passar, abrir a Aula e verificar:
   - texto maior;
   - mais vocabulário;
   - mais exercícios;
   - mais produção final.

## Próximo bloco correto

### Se Bloco 8-LAB-2B for aprovado
Próximo: `Bloco 8-LAB-3 — fortalecer cronograma e tela de trilha`.

Objetivo provável:
- mostrar uma visão da trilha A1 → C2 em Progresso ou Ajustes;
- expandir ainda mais o currículo com mais aulas por nível;
- adicionar bloqueio visual de avanço de nível;
- adicionar porcentagem mínima por nível antes de avançar;
- adicionar revisão obrigatória e simulados antes de liberar próximo nível.

### Se Bloco 8-LAB-2B tiver problema
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

"Continue a reconstrução do Fluency usando SOMENTE a branch `rewrite-fluency-clean-lab`. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A UI visual está aprovada/organizada. O `Bloco 8-LAB-2B` endureceu a geração para rejeitar aulas curtas e exigir aulas longas/profundas. Está aguardando reteste no Vercel/iPhone. Não mexa na `main`, não mexa na `rewrite-fluency-clean`, não use HTML remendado, DOM injection ou bundle patch. Continue modularmente em `fluency-clean/src/`."

## Última orientação operacional
A partir deste handoff, qualquer alteração fora de `rewrite-fluency-clean-lab` deve ser considerada erro, salvo pedido explícito do usuário.
