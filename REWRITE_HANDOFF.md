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

## DECISÃO ATUAL DE MOTOR DE IA

Após comparação manual:
- `gemini-2.5-flash` fica como motor principal de aula diária.
- Groq fica como fallback/teste opcional, não principal.
- Cerebras fica como fallback emergencial/teste leve, não principal para Grammar profunda.

Motivo:
- Flash foi o mais estável, mais focado no tema e gerou a aula mais aproveitável.
- Groq é promissor, mas instável em limite/cota e ainda precisa teste final real com 7 sections.
- Cerebras passou tecnicamente em alguns testes, mas teve conteúdo mais repetitivo, genérico e com erros pedagógicos.

## ESTADO ATUAL — BLOCO LISTENING RENDER REVIEW

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

O que foi feito em `ListeningLessonClean.jsx`:
- Criado mapa visual de fluxo `listeningFlow`.
- Transcrição agora começa fechada por padrão para proteger a escuta cega.
- Card principal ganhou ações rápidas:
  - `Conferir texto`;
  - `Começar prática`;
  - `Finalizar`.
- Criado relatório `Render seguro Listening` com:
  - status OK/atenção;
  - número de trechos;
  - número de frases de shadowing;
  - confirmação de respostas ocultas.
- Adicionado `hasListened` para orientar a mensagem após iniciar o áudio principal.
- Adicionado `goToPractice()` para rolar direto até o `PracticeLauncher` fullscreen já existente.
- Shadowing ficou aberto por padrão, porque é etapa essencial de Listening.
- Finalização ganhou label explícito `Resumo rápido da escuta`.
- `handleComplete` salva também `renderReport` junto com o progresso.
- Classe adicionada: `listening-render-review-v1`.

O que foi feito em CSS:
- Removida regra antiga que escondia todo textarea do `#lesson-answer`, porque agora o resumo final deve aparecer.
- Mantida ocultação da prática antiga interna para não conflitar com o `PracticeLauncher` fullscreen modular.
- Criado polimento visual para:
  - mapa de fluxo Listening;
  - ações rápidas;
  - card de relatório;
  - transcrição;
  - shadowing;
  - finalização;
  - responsividade no iPhone.

Escopo preservado:
- Não mexeu em `main`.
- Não mexeu em `rewrite-fluency-clean`.
- Não mexeu em `bundle.js`.
- Não mexeu no backend Azure privado.
- Não mexeu em geração, prompts, modelo, chaves ou fallback.
- Não mexeu em Grammar aprovada.

Commits:
- `5ec9981e725f0a4d25e871ef98fbaec2f5e4dcf9` — reestrutura renderização da aula Listening.
- `2d1052b9427904965cc53f5f6b6127a464d35865` — polimenta visual Listening no iPhone.

Próximo teste recomendado no iPhone:
1. Aguardar o deploy da branch `rewrite-fluency-clean-lab`.
2. Abrir uma aula Listening.
3. Conferir se a transcrição começa fechada.
4. Tocar o áudio principal e verificar mensagem/status.
5. Usar `Conferir texto` e confirmar se a transcrição abre corretamente.
6. Usar `Começar prática` e confirmar se rola para a prática fullscreen.
7. Testar `Shadowing real`: ouvir frase e próxima frase.
8. Abrir `Finalizar aula`, escrever resumo, salvar rascunho e concluir.
9. Conferir se o layout não corta botões no iPhone.

Próximo bloco provável após teste:
- Se Listening estiver OK: `BLOCO-LISTENING-APPROVAL-LAB`.
- Se aparecer erro visual/funcional: hotfix cirúrgico baseado no print do iPhone.

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
- Render report lateral funcionando:
  - `Grammar render: OK`;
  - `Exemplos: N`;
  - `Cards bloqueados: N`;
  - `Texto preservado: sim`.

Regras preservadas para próximos trabalhos:
- Não mexer em Grammar agora, a menos que apareça regressão real em teste.
- Não mexer no parser seguro sem motivo claro.
- Se houver dúvida no parser, renderizar como parágrafo, não como card.
- Não alterar geração, modelo, prompts, fallback, professor revisor, `deepGrammarPipeline.js` ou backend.

Arquivos envolvidos na base aprovada:
- `fluency-clean/src/lessons/GrammarLesson.jsx`
- `fluency-clean/src/lessons/grammar/grammarRenderParser.js`
- `fluency-clean/src/styles/grammar-examples-hotfix.css`
- `fluency-clean/src/main.jsx`

## ESTADO ANTERIOR — BLOCO GRAMMAR RENDER SAFETY GATE

### `BLOCO-GRAMMAR-RENDER-SAFETY-GATE-LAB` — IMPLEMENTADO

Objetivo executado:
- Sair de correções soltas dentro de `GrammarLesson.jsx` e criar uma camada dedicada de renderização segura para Grammar.
- Centralizar normalização, separação de parágrafos, listas numeradas, detecção de exemplos, fallback seguro e relatório de render.
- Reduzir risco de erros nas próximas aulas Grammar.

Arquivos alterados/criados:
- `fluency-clean/src/lessons/grammar/grammarRenderParser.js` — novo parser seguro.
- `fluency-clean/src/lessons/GrammarLesson.jsx` — conectado ao parser seguro.
- `REWRITE_HANDOFF.md`

## ESTADO ANTERIOR — HOTFIX GRAMMAR CARD SPLIT V6

### `HOTFIX-GRAMMAR-CARD-SPLIT-V6-LAB` — IMPLEMENTADO

Objetivo executado:
- Corrigir cards que engoliam um segundo exemplo conectado por `e` ou `ou`.
- Manter o primeiro card limpo e jogar o exemplo secundário/continuação para parágrafo normal abaixo.

Commit:
- `aa92b93a65adeb08b9192f8f32f750c7855e69aa` — divide exemplos secundários nos cards Grammar.

## COMPARAÇÃO FLASH X GROQ X CEREBRAS

### Flash/Gemini
- Melhor opção atual.
- Gerou aula completa, profunda e coerente.
- Pontos fracos principais agora são visuais, não de motor.

### Groq
- Não está idêntico ao Flash.
- Teve conteúdo diferente e potencial, mas limitações de cota e instabilidade.
- Ainda pode ser testado depois em 7 sections reais.

### Cerebras `llama3.1-8b`
- Teve reposições/expansões, mas conteúdo real ficou inconsistente.
- Não usar como principal para Grammar profunda.

## NÃO FAZER AGORA

- Não implementar Cirurgia 3 ainda.
- Não mexer no `deepGrammarPipeline.js`.
- Não relaxar o professor revisor.
- Não portar Pro para keys free.
- Não compactar conteúdo pedagógico.
- Não alterar política de chaves agora.
- Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js` ou backend Azure privado.

## Como continuar em outro chat

"Continue a reconstrução do Fluency. Leia `REWRITE_HANDOFF.md` antes de qualquer alteração. A branch principal é `rewrite-fluency-clean-lab`. Grammar foi aprovada visualmente. O bloco `BLOCO-LISTENING-RENDER-REVIEW-LAB` foi implementado: Listening agora tem fluxo 1 ouvir sem ler, 2 conferir transcrição, 3 prática fullscreen, 4 shadowing, 5 concluir; transcrição começa fechada; há relatório `Render seguro Listening`; e o textarea final voltou a aparecer. Não mexer em `main`, `rewrite-fluency-clean`, `bundle.js`, backend Azure privado, Grammar, geração, prompts, modelos ou chaves. Próximo passo: testar Listening no iPhone e, se estiver OK, registrar `BLOCO-LISTENING-APPROVAL-LAB`."
