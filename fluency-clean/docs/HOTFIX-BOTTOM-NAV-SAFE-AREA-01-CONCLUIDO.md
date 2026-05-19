# HOTFIX — Bottom Nav Safe Area 01

## Status

Concluido em 2026-05-18.

## Problema

O Quality Director `full` ainda apontava P1 de elementos interativos sobrepostos pela bottom nav fixa em cenarios de estado vazio/null/JSON invalido, principalmente nas abas Hoje e Cartas.

## Diagnostico

Ja existiam paddings em varios arquivos de estilo, mas a protecao estava espalhada e inconsistente. Algumas telas tinham padding local menor, outras dependiam do shell global, e os ultimos elementos interativos ainda podiam cair dentro da area visual da bottom nav fixa em iPhone SE/iPhone 13.

## Correcao

Criado arquivo modular:

- `fluency-clean/src/styles/bottom-nav-safe-area-hotfix.css`

O arquivo define uma zona segura centralizada:

- `--bottom-nav-safe-space: calc(168px + env(safe-area-inset-bottom))`
- aumenta em telas menores;
- aplica padding-bottom nas telas principais;
- aplica scroll-padding-bottom nos containers;
- aplica scroll-margin-bottom em elementos interativos;
- adiciona margem no ultimo filho;
- reposiciona o botao de diagnostico acima da navegacao.

Tambem foi atualizado:

- `fluency-clean/src/styles/screens.css`

O hotfix e importado por ultimo para vencer regras antigas sem editar varios arquivos CSS ao mesmo tempo.

## Arquivos alterados

- `fluency-clean/src/styles/bottom-nav-safe-area-hotfix.css`
- `fluency-clean/src/styles/screens.css`
- `fluency-clean/docs/HOTFIX-BOTTOM-NAV-SAFE-AREA-01-CONCLUIDO.md`

## Commits

- `ac9316a894522e9111320f632f323913079d1d5c`
- `13736c229dbbc70631e57d18b896e82306bb2e20`

## Validacao recomendada

Rodar Quality Director em modo `audit_mode=full` e verificar os P1 de `Elemento interativo sobreposto pela bottom nav` em Hoje/Cartas.

## Riscos

O risco principal e aumento perceptivel do espaco no fim das telas. A correcao preferiu seguranca de toque e area livre em iPhone SE/iPhone 13.