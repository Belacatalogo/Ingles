# BLOCO — Prova final do A1 — Speaking/Writing placeholders reais

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído como primeira versão dos campos reais de Speaking e Writing dentro da prova final do A1.

## Documentos lidos antes do bloco

- `fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md`
- `fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md`
- `fluency-clean/docs/BLOCO-A1-FINAL-EXAM-ATUALIZACAO-REATIVA-CRITERIOS-CONCLUIDO.md`

## Objetivo

Criar campos simples para registrar Speaking e Writing como aguardando revisão, sem mexer no sistema real de Speaking.

## Arquivos alterados

`fluency-clean/src/services/a1FinalExamAttemptService.js`

`fluency-clean/src/components/course/A1FinalExamShell.jsx`

`fluency-clean/src/styles/a1-mastery-gate.css`

## O que foi implementado

### 1. Salvamento local de Speaking/Writing

O serviço da prova agora salva rascunhos produtivos em:

- speaking;
- writing.

A função criada foi:

`saveA1FinalExamProductiveDraft(skill, draft)`

Ela salva a resposta localmente, mas não marca Speaking/Writing como revisados.

### 2. Campos na UI

A prova final do A1 agora permite abrir:

- Speaking;
- Writing.

Cada seção tem um campo de texto.

### 3. Speaking sem mexer no sistema real

Speaking mostra orientação humana:

```txt
Grave sua resposta fora desta etapa por enquanto e escreva aqui um resumo do que você falou. A gravação real será ligada depois.
```

Nenhum arquivo real do sistema de speaking foi alterado.

### 4. Writing com campo de texto

Writing permite escrever a resposta curta diretamente no campo.

### 5. Estado aguardando revisão

O botão criado foi:

```txt
Salvar como aguardando revisão
```

Mensagem exibida:

```txt
Resposta salva como aguardando revisão.
```

## Garantias mantidas

- A2 não é liberado por esse bloco.
- Speaking não é marcado como revisado.
- Writing não é marcado como revisado.
- O sistema real de Speaking não foi alterado.
- Nenhum backend real foi ativado.
- Nenhum Firebase/Azure/Gemini/Cloudinary foi ativado.

## UX limpa

A tela não mostra:

- nomes técnicos de storage;
- payload;
- schema;
- hash;
- nomes de arquivo;
- detalhes internos do serviço.

## O que ainda falta

- revisão real de Speaking;
- revisão real de Writing;
- gravação real de Speaking;
- player real de Listening;
- integração final que marca Speaking/Writing como revisados somente após avaliação;
- validação visual no iPhone.

## Próximo bloco recomendado

## Prova final do A1 — revisão manual/local de Speaking/Writing

Objetivo:

- permitir revisar manualmente as respostas salvas;
- registrar notas de Speaking e Writing;
- marcar Speaking/Writing como revisados somente depois da nota;
- atualizar o painel de critérios do A1;
- manter fluxo local, sem IA real ainda.

Depois disso:

## Validação visual completa da prova A1 no iPhone

Objetivo:

- conferir layout mobile;
- conferir abas;
- conferir campos longos;
- conferir mensagens;
- confirmar que A2 continua bloqueado quando alguma regra falta.

## Prompt de continuidade

```txt
Continue na branch rewrite-fluency-clean-lab.
Antes de qualquer alteração, leia:
1. REWRITE_HANDOFF.md
2. fluency-clean/docs/MASTER-CONTINUIDADE-BLOCOS-CURSO-ATE-C1-C2.md
3. fluency-clean/docs/REGRAS-UX-LIMPA-E-ECONOMIA-DE-DEPLOYS.md
4. fluency-clean/docs/BLOCO-A1-FINAL-EXAM-SPEAKING-WRITING-PLACEHOLDERS-CONCLUIDO.md

Próximo bloco: Prova final do A1 — revisão manual/local de Speaking/Writing.
Manter UX limpa, sem termos técnicos na tela do aluno.
Economizar commits/deploys.
Não mexer no sistema real de Speaking ainda: não alterar speakingFlow.js, SpeakingStepper.jsx ou SpeakingScreen.jsx.
Não criar bloco gigante.
Não mexer em main, rewrite-fluency-clean, bundle.js, backend Azure privado, Firebase/Azure produção.
Não usar DOM injection nem bundle patch.
```
