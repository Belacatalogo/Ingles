# BLOCO FIGMA-POLISH-SAFE-1 — Safe Figma-Inspired Token Polish

Data: 2026-05-17

## Objetivo

Atualizar os design tokens do app para os valores inspirados no Figma fornecidos no prompt.
CSS-only — nenhuma lógica, nenhuma função, nenhuma ordem de tela foi alterada.

---

## Uso do Figma

O conector MCP do Figma não estava disponível nesta sessão. Os tokens foram aplicados
diretamente a partir dos valores fornecidos no prompt pelo usuário.

---

## Tokens atualizados

| Token | Antes | Depois |
|---|---|---|
| `--bg` | `#060d1f` | `#050913` |
| `--panel` | `rgba(15,23,42,0.74)` | `rgba(12,20,40,0.84)` |
| `--panel-strong` | `rgba(15,23,42,0.92)` | `rgba(12,20,40,0.95)` |
| `--line` | `rgba(148,163,184,0.18)` | `rgba(34,48,79,0.85)` |
| `--muted` | `#9fb0c8` | `#A4AFCA` |
| `--text` | `#e8eff8` | `#F5F7FF` |
| `--blue` | `#5b9cf6` | `#68A8FF` |
| `--violet` | `#a78bfa` | `#A27BFF` |
| `--green` | `#34d399` | `#62DFA5` |
| `--amber` | `#fbbf24` | `#F7C66B` |
| `--shadow-btn` | `rgba(91,156,246,.26)` | `rgba(104,168,255,.20)` (glow reduzido) |
| `--shadow-glow` | `rgba(91,156,246,.22)` | `rgba(104,168,255,.18)` (glow reduzido) |

---

## Outros ajustes

- `body` background: gradiente atualizado com nova cor base `#050913` e `#080E20`; glows reduzidos de .22/.16 para .14/.10
- `input:focus` e `textarea:focus`: rgba atualizado para novo azul (104,168,255)
- `premium-polish.css`: todos os `rgba(91,156,246,...)` → `rgba(104,168,255,...)` e `rgba(167,139,250,...)` → `rgba(162,123,255,...)`; glow do hero-card reduzido; glow do level-node reduzido

---

## Arquivos alterados

| Arquivo | Mudança |
|---|---|
| `src/styles/index.css` | Tokens `:root`, body gradient, input/textarea focus rings |
| `src/styles/premium-polish.css` | Rgba do azul e violeta atualizados; glows reduzidos |

---

## O que NÃO foi alterado

- Nenhum arquivo `.jsx`
- Lógica de progresso, mastery, completions
- Firebase, Azure, Gemini, Cloudinary
- Ordem das fases nas aulas
- Conteúdo A1
- Rotas/abas

---

## Confirmação

```
Figma MCP: não disponível — tokens aplicados do prompt.
Build: ✅ 2533 módulos, sem erros.
Playwright: ✅ 54/54.
Branch: main.
Sem branch nova. Sem PR.
```
