# BLOCO FIGMA-UI-PREMIUM-POLISH-1 — Polimento Visual Premium

Data: 2026-05-17

## Objetivo

Polimento visual app-wide para tornar todas as abas mais premium, consistentes e confortáveis
no iPhone. CSS-only — nenhuma lógica, nenhuma função, nenhuma ordem de tela foi alterada.

---

## Uso do Figma

Não havia conector MCP do Figma disponível nesta sessão. O polimento foi feito com base em:
- princípios de design de apps mobile premium escuros (estilo glassmorphism moderno);
- análise visual do código CSS existente para identificar inconsistências;
- referências visuais de apps como Duolingo, Babbel e apps premium de aprendizado.

O Figma pode ser usado em sessão futura para revisão e refinamento incremental dos tokens.

---

## O que foi auditado

| Área | Problema encontrado | Status |
|---|---|---|
| Tokens de cor | `--amber`, `--teal`, `--pink`, `--indigo` usados em CSS mas não definidos em `:root` | ✅ Corrigido |
| Tokens de radius | Sem escala consistente de `border-radius` | ✅ Adicionado |
| Tokens de shadow | Sem variáveis reutilizáveis para sombras/glow | ✅ Adicionado |
| Cards | Background flat sem gradiente; sem inner highlight | ✅ Melhorado |
| Botão primário | Sem sombra glow; sem inner shimmer | ✅ Melhorado |
| Hero card | Background pouco profundo | ✅ Melhorado |
| Level nodes | Sem glow no estado ativo | ✅ Melhorado |
| Nav ativa | Active state pouco vibrante | ✅ Melhorado |
| Progress bars | Cor sólida sem gradiente | ✅ Melhorado |
| Eyebrow | Cor `#93c5fd` → `#7eb8ff` (melhor contraste) | ✅ Melhorado |
| Metric grid | Background muito escuro/plano | ✅ Melhorado |
| Empty state | Sem padding/alinhamento consistente | ✅ Adicionado |
| Mobile 430px | Cards com padding excessivo no iPhone | ✅ Melhorado |
| Botões mobile | `min-height` não suficiente para toque confortável | ✅ Melhorado |
| Safe-area | Algumas telas sem padding-bottom adequado | ✅ Centralizado |

---

## Arquivos alterados

| Arquivo | Mudança |
|---|---|
| `src/styles/index.css` | Adicionou 10 novos tokens a `:root` (cores, radius, shadows) |
| `src/styles/screens.css` | Adicionou import de `premium-polish.css` |
| `src/styles/premium-polish.css` | Novo — 22 blocos de polish + media query 430px |
| `e2e/ui-premium-polish-mobile.spec.js` | Novo — 9 testes × 2 viewports = 18 instâncias |

---

## Tokens novos adicionados ao `:root`

```css
--amber: #fbbf24;      /* já usado em vários lugares, agora variável */
--teal: #5eead4;       /* usado em speaking, progress */
--pink: #f472b6;       /* já aparecia como hardcode */
--indigo: #818cf8;     /* para badges e estados */

--r-xs: 12px;          /* escala de radius */
--r-sm: 16px;
--r-md: 22px;
--r-lg: 26px;
--r-pill: 999px;

--shadow-card: 0 14px 48px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.04);
--shadow-btn: 0 8px 28px rgba(91,156,246,.26), 0 2px 6px rgba(0,0,0,.18);
--shadow-glow: 0 0 28px rgba(91,156,246,.22);
```

---

## O que foi melhorado por área (CSS-only)

### Cards
- Gradiente linear de fundo (`rgba(18,26,52,.84)` → `rgba(11,17,38,.74)`)
- Border mais sutil (`rgba(147,160,213,.15)`)
- Shadow com inner top highlight (inset)
- Padding e radius menores no iPhone 430px

### Botão Primário
- Sombra glow azul-violeta (`var(--shadow-btn)`)
- Inner shimmer via `::after` pseudo-element
- Letter-spacing mais apertado

### Navegação
- Active state com gradiente azul-violeta mais vibrante
- Inner glow box-shadow sutil

### Progress Bars
- Gradiente azul → violeta (era cor sólida)

### Cards de stats e métricas
- Orb de fundo maior e mais visível
- Cells mais profundas (background mais escuro)

### Tipografia
- `h2` em 20px no mobile (era 22px sem ajuste)
- Eyebrow em `#7eb8ff` (melhor contraste sobre fundo escuro)
- Letter-spacing no card heading

### Mobile (430px)
- Cards: padding 17px, border-radius 22px
- Hero card: padding 17px, border-radius 24px
- Botões: `min-height 50px`, `border-radius 15px`
- Stats: `font-size 20px`
- Section header h2: `clamp(20px, 6vw, 24px)`

---

## O que NÃO foi alterado

- Nenhum arquivo `.jsx`
- Lógica de progresso, mastery, completions
- Firebase, Azure, Gemini, Cloudinary
- Ordem das fases nas aulas
- Conteúdo A1
- Rotas/abas
- Ícones do nav
- Lógica de speaking, tutor, revisão adaptativa

---

## Testes Playwright

`e2e/ui-premium-polish-mobile.spec.js` — 9 testes × 2 viewports (iPhone SE + iPhone 13) = 18 instâncias:

1. App sem erro de renderização ✅
2. Nav inferior visível e todas as 7 abas presentes ✅
3. Aba Hoje: renderiza sem crash ✅
4. Aba Curso: renderiza sem crash ✅
5. Aba Aula: renderiza sem crash ✅
6. Aba Cartas: renderiza sem crash ✅
7. Aba Speaking: renderiza sem crash ✅
8. Aba Progresso: renderiza sem crash ✅
9. Aba Ajustes: renderiza + seção de chaves visível ✅

**54/54 testes passando** (14 smoke + 6 flashcards + 8 masteryGate + 8 settings + 18 polish).

---

## Limitações

- Sem conector Figma na sessão — design baseado em princípios, não em arquivo Figma específico.
- O polish é incremental/aditivo; CSS existente não foi removido.
- Refinamentos adicionais podem ser feitos em sessão com Figma disponível.
- Speaking, Flashcards e screens com CSS muito específico têm seus próprios arquivos de polish já existentes.

---

## Confirmação

```
Branch: main.
Sem branch nova.
Sem PR.
Não gerou aulas novas.
Não alterou conteúdo A1.
Não ativou Firebase/Azure/Gemini.
Não alterou lógica de negócio.
Apenas CSS.
Build: ✅ 2534 módulos, sem erros.
Playwright: ✅ 54/54.
```
