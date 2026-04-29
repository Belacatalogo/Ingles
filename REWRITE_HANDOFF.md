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

### Bloco 8-LAB-5 — Expandir currículo e travas pedagógicas IMPLEMENTADO, aguardando teste

Motivo:
- o usuário corrigiu a numeração dos blocos: o bloco de expansão curricular deve ser tratado como `BLOCO-8-LAB-5`, pois o áudio ficou como bloco funcional anterior;
- o objetivo é transformar o cronograma em uma trilha mais completa, com ordem pedagógica, revisões, simulados e bloqueio de avanço.

Arquivo alterado:
- `fluency-clean/src/services/curriculumPlan.js`

Commit confirmado:
- `cfed7308a2b6c578ae5d45b8c69f8dbc30a1a39e`

O que foi feito:
- A1 foi expandido para 32 aulas;
- A2 foi expandido para 26 aulas;
- B1 foi expandido para 18 aulas;
- B2 foi expandido para 12 aulas;
- C1 foi expandido para 8 aulas;
- C2 foi expandido para 7 aulas;
- adicionadas categorias pedagógicas, como:
  - fundamentos;
  - rotina;
  - sobrevivência;
  - gramática essencial;
  - leitura;
  - listening;
  - writing;
  - revisão;
  - produção final;
  - simulado;
- adicionados checkpoints:
  - `mid-review`;
  - `final-review`;
  - `final-production`;
  - `level-assessment`;
- adicionadas travas de nível:
  - A2 depende da consolidação A1;
  - B1 depende da consolidação A2;
  - B2 depende da consolidação B1;
  - C1 depende da consolidação B2;
  - C2 depende da consolidação C1;
- `getNextCurriculumLesson()` agora respeita liberação de nível;
- avanço de nível exige percentual mínimo e conclusão dos simulados/produções finais;
- o prompt da IA agora recebe:
  - nível CEFR;
  - unidade;
  - objetivo da unidade;
  - categoria pedagógica;
  - checkpoint;
  - tema obrigatório;
  - pré-requisitos;
  - regras para revisão, simulado e produção final.

Teste recomendado no Vercel/iPhone:
1. esperar deploy da branch lab ficar Ready;
2. abrir **Progresso**;
3. conferir se a trilha mostra mais aulas totais;
4. conferir se A1 aparece como nível atual;
5. conferir se A2+ aparecem bloqueados;
6. abrir **Hoje** e gerar próxima aula;
7. confirmar que a aula continua vindo da próxima etapa do cronograma;
8. conferir se a geração continua longa e não volta para aula curta.

## Bloco anterior validado pelo usuário

### Bloco 8-LAB-4B — Áudio natural Gemini primeiro FUNCIONOU
- usuário confirmou que o áudio natural Gemini funcionou;
- `audioPlayback.js` e `geminiTts.js` foram ajustados para tentar Gemini TTS natural primeiro;
- fallback do navegador ficou apenas como último recurso.

## Próximo bloco correto

Se o `Bloco 8-LAB-5` for aprovado:

### `Bloco 8-LAB-6 — Persistência real do currículo por conta`
Objetivo provável:
- garantir que cronograma, aula atual, progresso, conclusão e chaves não resetem;
- revisar persistência com Google/Firebase;
- manter fallback local apenas como suporte;
- preparar o sistema para testes finais antes de main.

Se o `Bloco 8-LAB-5` tiver problema:
- não avançar;
- corrigir cirurgicamente apenas a falha encontrada na branch lab.

## Como continuar em outro chat

"Continue a reconstrução do Fluency usando SOMENTE a branch `rewrite-fluency-clean-lab`. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. O teste é feito no Vercel preview da branch lab, pelo iPhone. O `Bloco 8-LAB-5` expandiu o currículo com revisões, simulados, pré-requisitos e travas pedagógicas. Está aguardando teste. Não mexa na `main`, não mexa na `rewrite-fluency-clean`, não use HTML remendado, DOM injection ou bundle patch. Continue modularmente em `fluency-clean/src/`."
