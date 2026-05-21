# BLOCO-VOCAB-EXPANSION-CODEX-PLAN

- **Branch usada:** `codex/vocab-expansion-audit-plan`
- **Arquivos alterados:**
  - `src/data/vocabulary/fixedExpansionB1B2.js`
  - `docs/vocabulary/BLOCO-VOCAB-EXPANSION-CODEX-PLAN.md`
- **Cards antes:** 864
- **Cards depois:** 936
- **Cards adicionados:** 72
- **Níveis expandidos:** B1-B2
- **Tópicos expandidos:** communication, professional, media

## Resultado dos comandos

- `npm run vocabulary:audit`: PASS
  - 936/7500 cards
  - 39 decks
  - gap 6564
  - sem critical/major issues
- `npm run build`: PASS
  - build finalizado com sucesso
  - aviso de chunk grande do Vite (não bloqueante)

## Riscos / observações

- O lote foi mantido pequeno e auditável para revisão de qualidade em PR.
- Ainda existem issues **minor** históricas em decks antigos (fora deste escopo).
- Esta iteração priorizou vocabulário funcional B1/B2 para conversas reais, trabalho e mídia.

## Recomendação do próximo bloco

1. Expandir mais 168 a 240 cards em B1/B2 para completar o lote recomendado de primeira fase.
2. Adicionar novos decks para: planning/decisions, money/shopping, travel situations, relationships/social life.
3. Só depois iniciar C1/C2 com expressões avançadas funcionais (argumentação e nuance), mantendo auditoria sem critical/major.
