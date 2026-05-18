# BLOCO-QUALITY-DIRECTOR-09 — Performance, acessibilidade e qualidade técnica

Data: 2026-05-18  
Branch: `main`

## Objetivo

Adicionar ao Fluency Quality Director uma auditoria de performance inicial, acessibilidade básica e qualidade técnica do DOM nas abas principais.

Esse bloco não substitui auditoria completa de acessibilidade, mas cria uma barreira automática para problemas comuns que deixam o app menos profissional ou menos utilizável.

## Arquivos criados

- `fluency-clean/e2e/quality-director/helpers/a11yPerformanceRules.js`
- `fluency-clean/e2e/quality-director/a11y-performance.audit.spec.js`
- `fluency-clean/docs/BLOCO-QUALITY-DIRECTOR-09-CONCLUIDO.md`

## O que a suíte faz

A suíte `a11y-performance.audit.spec.js`:

1. abre o app;
2. mede carregamento inicial;
3. percorre abas principais;
4. mede tempo de troca/ação por aba;
5. audita botões, campos, dialogs e imagens;
6. testa foco básico via teclado;
7. verifica sinais técnicos no DOM.

Abas auditadas:

```txt
Hoje
Curso
Aula
Cartas
Speaking
Progresso
Ajustes
```

## Performance

Métricas iniciais coletadas:

- tempo de `page.goto` até navegação principal visível;
- `DOMContentLoaded`;
- `loadEvent`;
- `first-contentful-paint` quando disponível;
- quantidade de resources.

Orçamentos iniciais:

```txt
initialLoadMs: 4500
firstContentfulPaintMs: 3500
domContentLoadedMs: 3500
loadEventMs: 5000
tabSwitchMs: 1200
```

## Acessibilidade básica

Detecta:

- botão visível sem nome acessível;
- campo `input`, `textarea` ou `select` sem label, placeholder, title ou aria-label;
- modal/dialog sem nome perceptível;
- imagem visível sem descrição alternativa aparente.

## Foco por teclado

O auditor pressiona `Tab` e verifica se algum elemento interativo recebe foco.

Detecta:

- primeiro Tab não foca elemento interativo.

## Qualidade técnica do DOM

Detecta:

- IDs duplicados;
- DOM muito grande para tela mobile;
- textos muito longos em único nó visual.

## Severidades

### P0

- erro JavaScript não tratado durante auditoria técnica.

### P1

- carregamento inicial muito acima do orçamento;
- console error;
- botão sem nome acessível;
- campo sem label/nome acessível.

### P2

- DOMContentLoaded/FCP acima do orçamento;
- troca de aba lenta;
- modal/dialog sem nome;
- primeiro Tab não foca;
- IDs duplicados;
- DOM muito grande.

### P3

- imagem sem descrição alternativa aparente;
- texto muito longo em único nó.

## Importante

Este bloco apenas detecta problemas. Ele não altera UI, CSS nem lógica de acessibilidade.

Correções devem ser feitas depois da leitura do relatório.

## Limitações atuais

- Não usa axe-core ainda.
- Não mede Lighthouse real.
- Não avalia contraste visual com precisão.
- Não testa leitor de tela real.
- O tempo em CI pode variar, então orçamentos são heurísticos.

Blocos futuros podem expandir para:

- axe-core;
- Lighthouse CI;
- contraste real;
- auditoria de foco dentro de modais;
- budgets por viewport;
- análise de bundle.

## Confirmações

```txt
Branch: main.
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Sem bundle patch.
Sem DOM injection.
Sem ativar Firebase/Azure/Gemini/Cloudinary real.
Sem alterar conteúdo pedagógico das aulas.
Sem mexer no backend privado.
```

## Próximo bloco recomendado

```txt
BLOCO-QUALITY-DIRECTOR-10 — Relatório executivo, nota geral e Notion
```

Objetivo: consolidar todos os relatórios do Quality Director em nota geral do app, notas por área, plano de correção e resumo pronto para Notion/GitHub.
