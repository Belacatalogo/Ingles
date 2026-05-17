# Roadmap Prioritário — Próximos Blocos + Notion + IA Profunda

Última atualização: 2026-05-17

Este documento complementa o `REWRITE_HANDOFF.md`.

Objetivo: organizar os próximos blocos por prioridade real para transformar o Fluency Clean em um sistema superior a Duolingo, Busuu e Babbel no que mais importa: profundidade pedagógica, domínio real, revisão inteligente, speaking/writing com correção, adaptação por desempenho e continuidade segura via Notion.

---

## Regra máxima deste roadmap

Antes de qualquer alteração no código ou no conteúdo:

1. Ler `REWRITE_HANDOFF.md`.
2. Ler este arquivo `ROADMAP_NEXT_BLOCKS_NOTION_HANDOFF.md`.
3. Verificar o Notion do sistema, quando a integração estiver disponível no ambiente atual.
4. Confirmar o próximo bloco com maior prioridade ainda pendente.
5. Executar apenas esse bloco, sem pular pré-requisitos.
6. Atualizar o Notion ao final com status, arquivos alterados, testes, pendências e próximo bloco sugerido.
7. Atualizar também os handoffs do repositório quando houver decisão estrutural.

Se o ambiente não tiver acesso direto ao Notion, registrar no handoff do GitHub tudo que deveria ser sincronizado no Notion e avisar o usuário.

---

## Fonte de verdade

- `REWRITE_HANDOFF.md`: regras técnicas, branch, histórico, decisões já aprovadas.
- `ROADMAP_NEXT_BLOCKS_NOTION_HANDOFF.md`: ordem estratégica dos próximos blocos.
- Notion do sistema: painel operacional de tarefas, status, dependências, critérios e histórico de execução.

Nunca confiar apenas na memória do chat.

---

## Direção estratégica aprovada

O Fluency Clean não deve virar um clone visual do Duolingo.

O objetivo é ser superior por combinação de:

- curso fixo premium A1 → C2;
- aulas profundas por pilar;
- prática profunda derivada da aula fixa;
- IA como tutora, corretora, avaliadora, revisora e camada adaptativa;
- mastery gate real por pilar;
- revisão espaçada séria;
- speaking e writing com feedback útil;
- histórico pedagógico do aluno;
- continuidade segura via handoff + Notion.

Frase-guia:

```txt
A aula ensina. A IA observa, corrige, adapta e reforça.
```

---

## Critério de comparação com Duolingo, Busuu e Babbel

### Não tentar competir apenas em

- mascote;
- animação;
- tela bonita;
- gamificação superficial;
- streak vazio;
- lições rasas.

### Competir e superar em

- profundidade real de explicação;
- produção ativa do aluno;
- speaking avaliado;
- writing corrigido;
- revisão baseada em erro real;
- trilha adaptativa;
- domínio mínimo antes de avanço;
- currículo A1 → C2 coeso;
- professor IA limitado ao nível do aluno;
- auditoria pedagógica automática das aulas.

---

# Ordem de prioridade dos próximos blocos

## P0 — BLOCO-NOTION-SYNC-1 — Contrato operacional do Notion

### Por que vem primeiro

Sem isso, o projeto corre risco de perder decisões, repetir blocos, pular critérios ou executar tarefas fora de ordem.

### Objetivo

Criar/organizar no Notion uma estrutura fixa para os blocos do sistema.

### Estrutura mínima esperada no Notion

Database: `Fluency Clean — Roadmap de Blocos`

Campos obrigatórios:

- `Nome do Bloco`
- `Prioridade` — P0, P1, P2, P3
- `Status` — Pendente, Em andamento, Concluído, Bloqueado, Revisar
- `Categoria` — Currículo, IA, Mastery, SRS, Speaking, Writing, UI, Infra, Segurança, Testes
- `Dependências`
- `Critérios de aceite`
- `Arquivos esperados`
- `Arquivos alterados`
- `Testes obrigatórios`
- `Resultado dos testes`
- `Data de início`
- `Data de conclusão`
- `Próximo bloco sugerido`
- `Notas de handoff`

### Critérios de aceite

- Notion contém todos os blocos deste roadmap.
- Cada bloco tem prioridade, dependência e critério de aceite.
- Ao concluir qualquer bloco, Notion e handoff são atualizados.
- Se ChatGPT ou Claude Code entrarem no projeto, devem consultar o Notion antes de escolher o próximo bloco.

### Não fazer neste bloco

- Não alterar aula.
- Não alterar IA.
- Não alterar UI.
- Não ativar Firebase/Azure/Gemini real.

---

## P1 — BLOCO-B1-GRAMMAR-001 — Início real do B1 profundo

### Por que é prioridade

O sistema ainda não supera apps grandes sem conteúdo profundo suficiente. O handoff atual indica que B1 tem skeleton/mapas, mas não aulas profundas reais.

### Objetivo

Criar o primeiro bloco real de B1 Grammar com padrão premium e compatível com o renderizador atual.

### Requisitos pedagógicos

- Aula fixa, não gerada por IA em tempo real.
- Explicação profunda, mas clara.
- Exemplos naturais.
- Contraste com erros comuns de brasileiros.
- Exercícios graduais.
- Produção ativa.
- Revisão final.
- Tags de erro para alimentar mastery/revisão.

### Critérios de aceite

- Conteúdo B1 real criado no local correto do currículo.
- Aula abre pelo fluxo estático.
- Renderiza sem fallback.
- `completeLesson()` registra XP, flowScore e flowErrors.
- Flashcards úteis podem ser extraídos.
- Build sem erros.

---

## P1 — BLOCO-ERROR-TAXONOMY-1 — Taxonomia central de erros pedagógicos

### Por que é prioridade

Sem tags de erro fortes, a IA não consegue adaptar direito, o SRS fica fraco e o mastery gate fica superficial.

### Objetivo

Criar uma taxonomia central de erros por nível, pilar e habilidade.

### Exemplos de tags

Grammar:
- `verb_to_be_affirmative`
- `verb_to_be_negative`
- `present_simple_s_third_person`
- `word_order_basic`
- `auxiliary_do_does`

Vocabulary:
- `false_friend`
- `weak_collocation`
- `wrong_preposition`

Listening:
- `missed_number`
- `missed_name`
- `reduced_form_not_recognized`

Speaking:
- `too_short_answer`
- `missing_subject`
- `pronunciation_intelligibility`
- `low_fluency`

Writing:
- `sentence_fragment`
- `missing_capitalization`
- `wrong_article`
- `literal_translation_pt_br`

### Critérios de aceite

- Serviço central criado, por exemplo `src/services/pedagogy/errorTaxonomy.js`.
- Erros das aulas e campos interativos passam a usar tags padronizadas.
- Revisão adaptativa lê tags, não apenas texto solto.
- Mastery pode agrupar fraquezas por categoria.

---

## P1 — BLOCO-SRS-CORE-1 — Revisão espaçada real

### Por que é prioridade

Para superar Duolingo/Babbel/Busuu em retenção, o sistema precisa saber quando revisar e o que revisar.

### Objetivo

Criar um motor SRS local inicial para flashcards, erros e frases.

### Comportamento esperado

Cada item de revisão deve ter:

- `id`
- `type` — flashcard, error, phrase, listening, speaking, writing
- `level`
- `pillar`
- `tags`
- `ease`
- `intervalDays`
- `dueDate`
- `lastReviewedAt`
- `reviewCount`
- `lapses`

### Critérios de aceite

- Itens certos voltam depois de mais tempo.
- Itens errados voltam mais cedo.
- Erros graves viram revisão obrigatória.
- Tela Hoje pode mostrar revisão pendente.
- Não duplica itens já existentes.
- Funciona offline/local primeiro.

---

## P1 — BLOCO-AI-WRITING-RUBRIC-1 — Correção de Writing por rubrica

### Por que é prioridade

Writing corrigido por IA é uma das maiores vantagens contra Duolingo.

### Objetivo

Fazer a IA avaliar escrita com critérios estáveis, e não apenas texto livre.

### Rubrica mínima

- Grammar: 0–100
- Vocabulary: 0–100
- Clarity: 0–100
- Completeness: 0–100
- Level appropriateness: 0–100
- Main errors: tags da taxonomia
- Corrected version
- Short explanation in Portuguese
- Next drill

### Critérios de aceite

- Writing retorna JSON/safe object normalizado.
- Se IA falhar, fallback local continua funcionando.
- Resultado alimenta `flowErrors`, mastery e revisão adaptativa.
- Não mostra resposta modelo antes da tentativa.

---

## P1 — BLOCO-AI-SPEAKING-RUBRIC-1 — Avaliação de Speaking por rubrica

### Por que é prioridade

Speaking é onde o sistema pode virar professor particular, não apenas app de questões.

### Objetivo

Avaliar resposta oral com critérios claros.

### Rubrica mínima

- Pronunciation/intelligibility
- Fluency
- Grammar
- Completeness
- Target structure usage
- Missing words
- Suggested repetition
- Tags de erro

### Critérios de aceite

- Funciona nas aulas guiadas.
- Planeja integração futura com speaking livre.
- Não aprova resposta de uma letra ou palavra solta quando a atividade pede frase.
- Erros alimentam revisão e mastery.

---

## P1 — BLOCO-ADAPTIVE-REVIEW-2 — Revisão adaptativa por histórico real

### Por que é prioridade

A revisão atual já melhorou, mas precisa usar histórico acumulado, tags e SRS.

### Objetivo

Montar revisão pós-aula e diária baseada em:

- erros da aula atual;
- erros recorrentes;
- itens SRS vencidos;
- pilar mais fraco;
- nível atual;
- tempo disponível do aluno.

### Critérios de aceite

- Revisão não é genérica.
- Cita o erro real do aluno.
- Gera treino curto e objetivo.
- Não cria aula nova completa.
- Respeita nível CEFR atual.

---

## P1 — BLOCO-MASTERY-GATE-2 — Gate real com limiar 80%

### Por que é prioridade

Sistema premium não deve deixar o aluno avançar sem domínio mínimo.

### Decisão recomendada

Elevar domínio mínimo para 80% por pilar, com bloqueio suave e revisão obrigatória antes de avançar.

### Critérios de aceite

- Gate considera completion, prática, score por pilar e revisão pendente.
- Se Listening estiver baixo, recomenda Listening antes de avançar.
- Se Writing/Speaking estiverem sem avaliação, não libera avanço final.
- Botão de avanço deixa claro o motivo do bloqueio.

---

## P2 — BLOCO-PLACEMENT-TEST-1 — Diagnóstico inicial do aluno

### Objetivo

Criar teste inicial para posicionar o aluno corretamente e gerar perfil pedagógico.

### Componentes

- Grammar rápido.
- Vocabulary rápido.
- Reading curto.
- Listening curto.
- Speaking simples.
- Writing curto.

### Critérios de aceite

- Gera nível sugerido.
- Gera fraquezas iniciais.
- Cria plano inicial.
- Não força aluno iniciante a conteúdo avançado.

---

## P2 — BLOCO-AI-TUTOR-LEVEL-GUARD-1 — Tutor limitado ao nível atual

### Objetivo

Permitir dúvidas com IA sem bagunçar a progressão do curso.

### Regras

- Responder no nível do aluno.
- Não introduzir gramática avançada sem necessidade.
- Usar exemplos simples.
- Terminar com mini exercício.
- Não gerar aula completa.
- Não contradizer a aula fixa.

### Critérios de aceite

- Prompt centralizado em `aiTutorPolicy` ou serviço equivalente.
- Tutor recebe nível, aula atual, pilar e tags de erro.
- Resposta é curta, útil e segura.

---

## P2 — BLOCO-LESSON-QA-AI-1 — Auditoria automática das aulas profundas

### Objetivo

Antes de uma aula entrar no currículo, a IA ou auditor local deve checar qualidade pedagógica.

### Checklist mínimo

- Objetivo claro.
- Nível CEFR coerente.
- Texto natural.
- Exercícios com resposta válida.
- Distratores plausíveis.
- Speaking com modelo.
- Writing com checklist.
- Listening com predição/contexto.
- Sem gabarito antes da tentativa.
- Sem português excessivo fora do suporte necessário.

### Critérios de aceite

- Gera relatório de qualidade.
- Bloqueia ou marca aula como `needs_review` se falhar.
- Pode ser usado em B1, B2, C1 e C2.

---

## P2 — BLOCO-STUDENT-MEMORY-1 — Perfil pedagógico do aluno

### Objetivo

Criar memória local do aluno para personalizar revisão e explicações.

### Dados úteis

- Pilares fortes/fracos.
- Erros recorrentes.
- Frases dominadas.
- Vocabulário fraco.
- Preferência de estudo.
- Tempo médio por sessão.
- Histórico de retorno após pausa.

### Critérios de aceite

- Perfil não guarda secrets.
- Perfil alimenta TodayScreen, revisão, tutor e recomendações.
- Dados são normalizados e versionados.

---

## P2 — BLOCO-TODAY-AI-PLAN-1 — Plano diário inteligente

### Objetivo

A tela Hoje deve montar um plano realista, não apenas mostrar cards fixos.

### Exemplo

```txt
Hoje — 20 min
1. Revisão SRS: 5 min
2. Aula nova: 10 min
3. Speaking curto: 3 min
4. Erro recorrente: 2 min
```

### Critérios de aceite

- Considera tempo disponível.
- Considera streak sem punir demais.
- Considera revisão vencida.
- Considera próxima aula.
- Considera pilar fraco.

---

## P3 — BLOCO-GAMIFICATION-PREMIUM-1 — Gamificação com propósito

### Objetivo

Melhorar retenção sem transformar o app em jogo raso.

### Ideias permitidas

- Streak com recuperação.
- XP por esforço real.
- Badges por domínio.
- Sequência de revisão.
- Missões semanais por pilar.
- Metas realistas.

### Não fazer

- Dar XP por clique vazio.
- Liberar avanço sem domínio.
- Recompensar chute.

---

## P3 — BLOCO-UI-POLISH-CONTINUOUS — Visual premium contínuo

### Objetivo

Continuar polindo aparência, mas sempre depois dos blocos pedagógicos/IA críticos.

### Regra

Visual é importante, mas não deve passar na frente de:

- currículo profundo;
- SRS;
- speaking;
- writing;
- mastery;
- revisão adaptativa;
- Notion/handoff.

---

# Ordem recomendada de execução agora

1. `BLOCO-NOTION-SYNC-1`
2. `BLOCO-B1-GRAMMAR-001`
3. `BLOCO-ERROR-TAXONOMY-1`
4. `BLOCO-SRS-CORE-1`
5. `BLOCO-AI-WRITING-RUBRIC-1`
6. `BLOCO-AI-SPEAKING-RUBRIC-1`
7. `BLOCO-ADAPTIVE-REVIEW-2`
8. `BLOCO-MASTERY-GATE-2`
9. `BLOCO-PLACEMENT-TEST-1`
10. `BLOCO-AI-TUTOR-LEVEL-GUARD-1`
11. `BLOCO-LESSON-QA-AI-1`
12. `BLOCO-STUDENT-MEMORY-1`
13. `BLOCO-TODAY-AI-PLAN-1`
14. `BLOCO-GAMIFICATION-PREMIUM-1`
15. `BLOCO-UI-POLISH-CONTINUOUS`

---

# Prompt fixo para ChatGPT ou Claude Code

Use este prompt ao continuar:

```txt
Continue o trabalho no repositório Belacatalogo/Ingles, branch main.

Antes de qualquer alteração:
1. Leia REWRITE_HANDOFF.md.
2. Leia ROADMAP_NEXT_BLOCKS_NOTION_HANDOFF.md.
3. Verifique o Notion do sistema, se a integração estiver disponível.
4. Escolha o próximo bloco pendente de maior prioridade.
5. Não pule dependências.
6. Execute apenas um bloco por vez.
7. Atualize o Notion ao final com status, arquivos alterados, testes, pendências e próximo bloco sugerido.
8. Atualize os handoffs se houver decisão estrutural.

Regras obrigatórias:
- trabalhar diretamente na main;
- não criar branch;
- não abrir PR;
- não fazer merge/rebase/force push;
- não mexer em bundle.js;
- não usar DOM injection;
- manter tudo modular;
- não ativar Firebase/Azure/Gemini/Cloudinary real sem autorização explícita;
- não colocar secrets no frontend;
- não gerar aula principal por IA em tempo real;
- curso fixo premium é a base;
- IA apenas observa, corrige, adapta e reforça.
```

---

# Checklist obrigatório ao finalizar cada bloco

Ao finalizar qualquer bloco, registrar no Notion e no handoff:

```txt
Bloco executado:
Status:
Data:
Branch:
Arquivos alterados:
Arquivos criados:
Build:
Testes:
Pendências:
Próximo bloco recomendado:
Confirmações:
- Branch main
- Sem branch nova
- Sem PR
- Sem merge
- Sem rebase
- Sem force push
- Sem secrets no frontend
- Sem ativar serviços reais sem autorização
```

---

## Observação final

Este roadmap deve ser tratado como fila estratégica. Se surgir bug P0/P1 quebrando aula, progresso, login, build ou segurança, o bug tem prioridade temporária. Depois de corrigido, voltar para esta ordem.
