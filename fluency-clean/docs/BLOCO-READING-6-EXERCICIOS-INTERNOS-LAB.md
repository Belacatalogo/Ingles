# BLOCO-READING-6 — Exercícios internos da aba Reading

Data: 2026-05-03
Branch: `rewrite-fluency-clean-lab`

## Status

Implementado na branch LAB.

## Objetivo

Fortalecer os exercícios que ficam dentro da própria aba Reading, mantendo a Prática Profunda como complemento posterior.

## Arquivos alterados

- `fluency-clean/src/lessons/ReadingLesson.jsx`
- `fluency-clean/src/styles/reading-complete-render-review.css`
- `fluency-clean/docs/BLOCO-READING-6-EXERCICIOS-INTERNOS-LAB.md`

## O que foi feito

### 1. Exercícios internos adicionados

Dentro da seção `Compreensão com evidência textual`, foi adicionado um bloco compacto chamado `Exercícios de leitura`.

Ele pode renderizar:

- Verdadeiro ou falso;
- Copiar evidência;
- Resposta curta.

### 2. Fontes dos exercícios

Os exercícios internos usam dados já existentes da aula:

- `readingQuestions`;
- `evidenceTasks`;
- `evidence` das perguntas;
- respostas e habilidades da própria Reading.

Se a IA gerar `evidenceTasks`, eles são usados.
Se não gerar, o sistema cria tarefas simples a partir das evidências das perguntas.

### 3. Verdadeiro/Falso

- Usa respostas com evidência textual.
- Mostra a afirmação e a resposta esperada como verdadeiro.
- Mostra a frase de prova do texto.

### 4. Copiar evidência

- O aluno pode copiar em um textarea a frase que prova uma resposta.
- Existe um trecho de apoio para conferência.

### 5. Resposta curta

- Usa perguntas de detalhe/inferência com evidência.
- O aluno pode responder com uma frase curta.
- Mostra modelo e evidência para apoio.

### 6. Salvamento de progresso

Ao concluir a Reading, o `completeLesson` agora recebe:

```js
answers: {
  multipleChoice: selectedAnswers,
  internalExercises: exerciseDrafts,
}
```

Isso prepara o sistema para registrar separadamente respostas de múltipla escolha e exercícios internos.

## Diretriz mantida

- Nenhum card técnico de contrato/política foi adicionado.
- O bloco aparece como conteúdo de estudo, não diagnóstico.
- A Prática Profunda continua abaixo da Reading e continua sendo complemento.

## O que não foi feito neste bloco

- Não foi criado quality gate ainda.
- Não foi criado destaque automático de evidência dentro do texto ainda.
- Não foi criada correção automática das respostas digitadas.
- Não foi mexido em `bundle.js`.
- Não foi mexido em `main`.
- Não foi mexido em `rewrite-fluency-clean`.
- Não foi mexido no backend Azure privado.

## Próximo bloco recomendado

`BLOCO-READING-7 — Evidência textual inteligente`

Objetivo:
- Melhorar o uso da evidência textual.
- Destacar/ancorar evidências no texto quando possível.
- Fazer botão para ir ao trecho do texto que prova a resposta.
- Manter tudo limpo e sem poluir a aula.

## Checklist para teste no iPhone

Usar `Testar Reading`.

Validar:
- seção `Exercícios de leitura` aparece dentro de `Compreensão`;
- ela não aparece como card técnico;
- verdadeiro/falso aparece de forma compacta;
- copiar evidência tem textarea funcional;
- resposta curta tem textarea funcional;
- teclado abre normalmente no iPhone;
- responder múltipla escolha continua funcionando;
- botões de etapa continuam funcionando;
- `Concluir Reading` continua funcionando;
- Prática Profunda continua abaixo como complemento.
