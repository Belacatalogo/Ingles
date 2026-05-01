# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

PR de promoção controlada para main: #21 — MERGED NO GITHUB, PRODUÇÃO AINDA NÃO VALIDADA

## REGRA MÁXIMA

Próximas correções devem acontecer primeiro na branch:

`rewrite-fluency-clean-lab`

Não deletar `rewrite-fluency-clean-lab`.
Não deletar `rewrite-fluency-clean` por enquanto.
Não mexer em `bundle.js`.
Não usar DOM injection.
Não criar bundle patch.
Não mexer no backend Azure privado.
Não mexer em `main` diretamente.
Não mexer em `rewrite-fluency-clean` sem validação prévia na lab.
Manter tudo modular em `fluency-clean/src/`, `fluency-clean/public/` ou arquivos reais de configuração.

## PROTOCOLO ECONÔMICO DE DEPLOY — OBRIGATÓRIO

Regra operacional:
1. Cada bloco deve virar **1 commit único**, sempre que possível.
2. Não fazer vários commits pequenos para o mesmo bloco.
3. Atualizar `REWRITE_HANDOFF.md` junto com o bloco, no mesmo commit.
4. Fluxo ideal: **1 bloco → 1 commit → 1 deploy → teste no iPhone**.
5. Se a Vercel bloquear novamente, parar commits e aguardar liberação.

Observação: o próximo hotfix pendente é remover a área visual de rascunho da aula Listening e deixar as regras do quiz funcionando internamente, sem textos explicativos pesados na tela.
