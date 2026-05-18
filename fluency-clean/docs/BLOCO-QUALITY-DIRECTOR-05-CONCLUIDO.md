# BLOCO-QUALITY-DIRECTOR-05 — Auditor visual/mobile com screenshots

Data: 2026-05-18  
Branch: `main`

## Objetivo

Adicionar ao Fluency Quality Director uma camada visual/mobile para capturar evidências em screenshot e detectar problemas de layout que testes comuns não enxergam bem.

Este bloco foca principalmente em uso mobile/iPhone: cortes, overflow horizontal, bottom nav cobrindo conteúdo, botões pequenos, cards grandes demais e telas visualmente quebradas.

## Arquivos criados

- `fluency-clean/e2e/quality-director/helpers/visualAuditRules.js`
- `fluency-clean/e2e/quality-director/visual-mobile.audit.spec.js`
- `fluency-clean/docs/BLOCO-QUALITY-DIRECTOR-05-CONCLUIDO.md`

## Saída gerada quando o workflow rodar

Screenshots em:

```txt
audit-results/screenshots/
```

Relatórios em:

```txt
audit-results/quality-director-visual-mobile-*.md
audit-results/quality-director-visual-mobile-*.json
```

O workflow já envia `audit-results/`, `playwright-report/`, `test-results/` e `docs/quality-director/latest/` como artifacts.

## O que o auditor visual faz

### Abas principais

Percorre:

```txt
Hoje
Curso
Aula
Cartas
Speaking
Progresso
Ajustes
```

Para cada aba:

- tira screenshot full page;
- verifica se há texto visível;
- verifica se a bottom nav está visível;
- verifica se a bottom nav extrapola a viewport;
- verifica overflow horizontal;
- verifica título cortado;
- verifica botões com área de toque pequena;
- verifica cards mais largos que a viewport;
- verifica cards muito altos;
- detecta elementos interativos sobrepostos pela bottom nav.

### Aula real

Também injeta e abre:

```txt
A1-READING-001
```

E captura as primeiras fases da aula real, tentando avançar como aluno.

## Problemas detectáveis

### P0

- tela sem texto visível;
- erro JavaScript não tratado durante auditoria visual;
- botão Continuar/Concluir ausente durante aula real.

### P1

- bottom nav ausente;
- bottom nav extrapolando viewport;
- overflow horizontal;
- título cortado;
- card mais largo que a viewport;
- elemento interativo sobreposto pela bottom nav.

### P2

- botão com área de toque pequena;
- card muito alto para leitura mobile.

## Evidências

Cada check visual adiciona no relatório o caminho do screenshot capturado.

Exemplo:

```txt
audit-results/screenshots/iphone-13-aba-curso.png
```

Isso permite revisar visualmente o que o auditor viu sem depender apenas de mensagem textual.

## Limitações atuais

Este bloco ainda não faz comparação visual automática pixel-perfect. Ele usa heurísticas de layout e screenshots.

Blocos futuros podem adicionar:

- comparação contra baseline;
- captura por modal específico;
- auditor visual por cada pilar;
- análise mais forte de contraste;
- auditor de teclado aberto em inputs mobile;
- relatório visual consolidado com galeria.

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
BLOCO-QUALITY-DIRECTOR-06 — Progresso, XP, streak e mastery
```

Objetivo: auditar se conclusão de aula, XP, streak, mastery, checkpoints e gates funcionam sem duplicação, sem avanço indevido e sem perda de progresso.
