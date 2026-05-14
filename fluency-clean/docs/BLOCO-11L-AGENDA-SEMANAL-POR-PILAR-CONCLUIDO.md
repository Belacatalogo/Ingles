# BLOCO 11L — Agenda semanal por pilar

Branch: `rewrite-fluency-clean-lab`

## Motivo

O usuário perguntou sobre o cronograma real de pilares e percebeu que o sistema de teste não possui uma aba manual de Vocabulário.

A decisão correta é não recriar uma navegação manual por abas. Como o curso agora é guiado, o sistema deve escolher automaticamente o pilar certo do dia.

## Regra definida

O aluno faz 1 aula por dia, de segunda a sábado:

- Segunda: Grammar
- Terça: Vocabulary
- Quarta: Reading
- Quinta: Listening
- Sexta: Speaking
- Sábado: Writing
- Domingo: descanso

## Arquivo alterado

- `fluency-clean/src/services/staticCourseLauncher.js`

## Mudanças feitas

Foi adicionada uma agenda semanal central:

```js
const WEEKLY_PILLAR_BY_DAY = Object.freeze({
  1: 'grammar',
  2: 'vocabulary',
  3: 'reading',
  4: 'listening',
  5: 'speaking',
  6: 'writing',
});
```

Também foram criadas/ajustadas funções internas:

- `getStudyPillarForDate()`
- `getWeeklyPillarLabel()`
- `getNextLessonForPillar()`

## Como funciona agora

O botão `Começar aula` continua único e automático.

Mas agora ele escolhe a próxima aula conforme o dia:

- se for segunda, busca a próxima aula de Grammar;
- se for terça, busca a próxima aula de Vocabulary;
- se for quarta, busca a próxima aula de Reading;
- se for quinta, busca a próxima aula de Listening;
- se for sexta, busca a próxima aula de Speaking;
- se for sábado, busca a próxima aula de Writing;
- se for domingo, bloqueia aula nova como descanso.

## Resultado esperado

Não existe aba manual de Vocabulary.

Vocabulary entra automaticamente na terça-feira pelo botão `Começar aula`.

O aluno continua sem precisar escolher aula/pilar.

## Observação importante

Se o pilar do dia ainda não tiver conteúdo pronto implementado, o sistema deve bloquear com mensagem humana e não abrir aula futura/remendada.

## Commit

- `9c61249bc22ba90d167617d74e7ff9455ca4b397` — agenda semanal por pilar.

## Próximos passos

1. Verificar deploy Vercel.
2. Validar no app em dias simulados/futuros:
   - segunda abre Grammar;
   - terça abre Vocabulary;
   - quarta abre Reading;
   - quinta abre Listening;
   - sexta abre Speaking;
   - sábado abre Writing;
   - domingo bloqueia aula nova.
3. Criar conteúdos reais dos pilares faltantes antes de depender da agenda em produção.
