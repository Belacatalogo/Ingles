# Fluency Clean Rewrite — Handoff LAB

Branch atual de trabalho: `rewrite-fluency-clean-lab`

Branch estável protegida: `rewrite-fluency-clean`

## REGRA MÁXIMA

- Não mexer em `main` diretamente.
- Não mexer em `rewrite-fluency-clean` sem validação prévia na lab.
- Não mexer em `bundle.js`.
- Não criar bundle patch.
- Não usar DOM injection.
- Não usar HTML remendado.
- Não mexer no backend Azure privado.
- Manter tudo modular em `fluency-clean/src/`, `fluency-clean/public/` ou arquivos reais de configuração.

## ESTADO ATUAL — PREVIEW TEMPORÁRIO DE TIPOS DE AULA

### `BLOCO-TEMP-LESSON-PREVIEW-SWITCH-LAB` — IMPLEMENTADO

Objetivo executado:
- Criar um seletor temporário na aba Aula para testar Listening, Reading e Speaking antes do dia oficial de cada conteúdo.
- Permitir validar renderização no iPhone sem depender do cronograma do dia.
- Manter a aula real preservada e retornar a ela com o botão `Aula real`.

Arquivos criados/alterados:
- `fluency-clean/src/services/lessonPreviewSamples.js`
- `fluency-clean/src/screens/LessonScreen.jsx`
- `fluency-clean/src/styles/lesson-preview-lab.css`
- `fluency-clean/src/main.jsx`
- `REWRITE_HANDOFF.md`

O que foi feito:
- Criado `lessonPreviewSamples.js` com amostras locais temporárias:
  - `listening`;
  - `reading`.
- Adicionado seletor temporário no topo da aba Aula:
  - `Aula real`;
  - `Testar Listening`;
  - `Testar Reading`;
  - `Abrir Speaking`.
- `Testar Listening` troca apenas a renderização local da aba Aula para uma aula sample Listening.
- `Testar Reading` troca apenas a renderização local da aba Aula para uma aula sample Reading.
- `Abrir Speaking` navega para a aba Speaking real.
- `Aula real` volta para a aula salva/gerada real.
- O modo preview mostra chip `Preview temporário` e card `LAB temporário`, deixando claro que não substitui a aula real.
- Criado CSS próprio `lesson-preview-lab.css` e importado em `main.jsx`.

Escopo preservado:
- Não mexeu em `main`.
- Não mexeu em `rewrite-fluency-clean`.
- Não mexeu em `bundle.js`.
- Não mexeu no backend Azure privado.
- Não mexeu em geração, prompts, modelos, chaves ou fallback.
- Não mexeu na Grammar aprovada.
- Não substituiu aula real salva.

Commits:
- `3f2b91b9a8316beefe0cc0e9ff97a88bb95848de` — cria amostras temporárias de aulas para teste.
- `0e5bd0e2f7aee744aa533ed8006c95880e9e6a6e` — adiciona seletor temporário de preview de aulas.
- `7e31734b02c2267d2f55dcd8dd8fd650abee4185` — cria estilo do seletor temporário de aulas.
- `2c9b791fc5c9947b363db5bfa48f131c9b4d7c4b` — importa estilo do preview temporário.

Próximo teste recomendado no iPhone:
1. Aguardar deploy da branch `rewrite-fluency-clean-lab`.
2. Abrir aba Aula.
3. Conferir se aparece o card `Teste temporário de abas`.
4. Tocar `Testar Listening` e validar a tela Listening recém-reestruturada.
5. Tocar `Testar Reading` e validar a tela Reading.
6. Tocar `Abrir Speaking` e validar a aba Speaking real.
7. Tocar `Aula real` e confirmar que volta para a aula gerada/salva real.
8. Confirmar que o preview não substitui a aula real.

Próximo bloco provável:
- Se o preview estiver OK, usar esse seletor para testar Listening e registrar `BLOCO-LISTENING-APPROVAL-LAB` ou aplicar hotfix baseado em print.

## ESTADO ANTERIOR — BLOCO LISTENING RENDER REVIEW

### `BLOCO-LISTENING-RENDER-REVIEW-LAB` — IMPLEMENTADO

Objetivo executado:
- Fazer uma análise estrutural da aula Listening e reorganizar a tela para o fluxo correto no iPhone.
- Manter a escuta cega como primeiro passo.
- Evitar que a transcrição fique aberta antes da escuta.
- Destacar prática em tela cheia como etapa própria.
- Melhorar acesso a áudio, shadowing, salvar e concluir.
- Não mexer no backend Azure privado, geração, modelo, prompts, chaves ou `bundle.js`.

Estrutura pedagógica definida para Listening:
1. Ouvir sem ler.
2. Conferir texto/transcrição depois.
3. Fazer prática profunda em tela cheia.
4. Fazer shadowing real.
5. Salvar/concluir com resumo curto.

Arquivos alterados:
- `fluency-clean/src/lessons/ListeningLessonClean.jsx`
- `fluency-clean/src/styles/listening-ux-hotfix.css`
- `REWRITE_HANDOFF.md`

Commits:
- `5ec9981e725f0a4d25e871ef98fbaec2f5e4dcf9` — reestrutura renderização da aula Listening.
- `2d1052b9427904965cc53f5f6b6127a464d35865` — polimenta visual Listening no iPhone.

## ESTADO ANTERIOR — GRAMMAR APROVADA NA LAB

### `BLOCO-GRAMMAR-APPROVAL-LAB` — IMPLEMENTADO

Status:
- Grammar foi testada no iPhone após o `BLOCO-GRAMMAR-RENDER-SAFETY-GATE-LAB`.
- Usuário confirmou: `tudo ok`.
- A tela Grammar fica considerada aprovada visualmente na branch `rewrite-fluency-clean-lab`.

Base aprovada:
- Parser seguro modular em `fluency-clean/src/lessons/grammar/grammarRenderParser.js`.
- `GrammarLesson.jsx` conectado ao parser seguro.
- Cards de exemplos com fallback seguro.
- Render report lateral funcionando.

## NÃO FAZER AGORA

- Não implementar Cirurgia 3 ainda.
- Não mexer no `deepGrammarPipeline.js`.
- Não relaxar o professor revisor.
- Não portar Pro para keys free.
- Não compactar conteúdo pedagógico.
- Não alterar política de chaves agora.
- Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado.
- Não remover o preview temporário até o usuário aprovar ou pedir remoção.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. Foi implementado `BLOCO-TEMP-LESSON-PREVIEW-SWITCH-LAB`: na aba Aula há um seletor temporário com `Aula real`, `Testar Listening`, `Testar Reading` e `Abrir Speaking`. O preview usa samples locais e não substitui a aula real. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js`, backend Azure privado, Grammar aprovada, geração, prompts, modelos ou chaves. Próximo passo: testar no iPhone o seletor e usar `Testar Listening` para validar o bloco Listening recém-reestruturado."
