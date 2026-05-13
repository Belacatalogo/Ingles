# Static Curriculum Masterplan — Fluency

## Como usar este documento em todo novo bloco

Antes de executar qualquer próximo bloco STATIC, a IA deve obrigatoriamente:

1. Ler este arquivo inteiro.
2. Ler `REWRITE_HANDOFF.md`.
3. Identificar qual é o próximo bloco solicitado pelo usuário.
4. Analisar o objetivo original do bloco.
5. Analisar o que pode ser melhorado dentro do próprio bloco sem quebrar a ordem do plano.
6. Verificar quais arquivos existentes podem ser afetados.
7. Evitar mudanças fora do escopo.
8. Executar de forma modular.
9. Atualizar documentação/handoff quando o bloco mudar decisão arquitetural.
10. Informar no final: bloco executado, arquivos criados/alterados, commits e próximo bloco recomendado.

Regra do usuário: ele pode testar apenas no final de um pacote funcional. Portanto, cada bloco deve incluir o máximo possível de validação interna, baixo acoplamento e documentação clara para reduzir risco acumulado.

## Decisão oficial

O Fluency deixa de depender de IA para gerar aulas principais em tempo real. A arquitetura oficial passa a ser:

```txt
Curso fixo premium A1 → C2
↓
Curriculum Engine escolhe a próxima aula
↓
Renderizadores estáveis por pilar
↓
Exercícios internos da aula
↓
Prática Profunda complementar derivada da aula fixa
↓
IA Tutor apenas para correção, dúvida, reforço e revisão adaptativa
↓
Mastery Gate libera ou bloqueia avanço
```

## Motivo da mudança

O fluxo antigo de geração dinâmica era instável para um curso educacional sério. Ele podia falhar com JSON quebrado, conteúdo curto, exercícios sem sentido, perguntas sem evidência, diferenças entre modelos e problemas de renderização. O curso fixo elimina essa imprevisibilidade e transforma a IA em apoio, não em fonte da verdade.

## Princípios obrigatórios

1. A aula principal vem de conteúdo fixo, curado e validado.
2. A IA não pode gerar a aula-base do fluxo principal.
3. O aluno só avança quando cumprir conteúdo, prática, produção e mastery mínimo.
4. A Prática Profunda é complementar, nunca substituta dos exercícios internos.
5. A Prática Profunda deve derivar do conteúdo fixo e não inventar fora da aula.
6. O conteúdo A1 deve ser completo antes de liberar A2.
7. Cada pilar deve evoluir em ordem pedagógica real.
8. O curso deve ser extremamente completo, mesmo que aumente a quantidade de aulas.
9. O sistema deve preferir conteúdo previsível e validado a geração dinâmica instável.
10. O app deve preservar a experiência mobile-first e evitar poluição técnica na UI.

## Pilares oficiais

- Grammar
- Vocabulary
- Reading
- Listening
- Speaking
- Writing
- Review / Checkpoint

## Ordem macro dos blocos

1. `BLOCO-STATIC-00-MASTERPLAN-DOCS`
2. `BLOCO-STATIC-01-CURRICULUM-ENGINE`
3. `BLOCO-STATIC-02-LESSON-SCHEMAS`
4. `BLOCO-STATIC-03-REMOVE-AI-GENERATOR-FROM-FLOW`
5. `BLOCO-STATIC-04-A1-CURRICULUM-MAP`
6. `BLOCO-STATIC-05-A1-CONTENT-FOUNDATIONS`
7. `BLOCO-STATIC-06-RENDERERS-STABLE`
8. `BLOCO-STATIC-07-PRACTICE-FROM-STATIC-LESSONS`
9. `BLOCO-STATIC-08-MASTERY-GATES`
10. `BLOCO-STATIC-09-AI-TUTOR-ONLY`
11. `BLOCO-STATIC-10-A1-FULL-CONTENT`
12. `BLOCO-STATIC-11-A1-CHECKPOINTS`
13. `BLOCO-STATIC-12-A2-MAP`
14. `BLOCO-STATIC-13-B1-B2-C1-C2-MAPS`
15. `BLOCO-STATIC-14-STATIC-CURRICULUM-VALIDATOR`
16. `BLOCO-STATIC-15-COURSE-SCREEN`
17. `BLOCO-STATIC-16-REVIEW-SYSTEM-FROM-ERRORS`

## BLOCO-STATIC-00-MASTERPLAN-DOCS — feito

Objetivo:
- Documentar oficialmente a mudança para curso fixo premium.
- Criar os documentos de arquitetura antes de mexer pesado no app.

Arquivos:
- `fluency-clean/docs/STATIC-CURRICULUM-MASTERPLAN.md`
- `fluency-clean/docs/LESSON-SCHEMA.md`
- `fluency-clean/docs/A1-CURRICULUM-MAP.md`
- `fluency-clean/docs/AI-TUTOR-ROLE.md`

Status:
- Criado.
- Este arquivo passa a ser leitura obrigatória antes de qualquer próximo bloco.

## BLOCO-STATIC-01-CURRICULUM-ENGINE — feito

Objetivo:
- Criar base do motor que decide próxima aula, pré-requisitos, bloqueios, progresso e avanço de nível.

Arquivos:
- `fluency-clean/src/content/curriculum/index.js`
- `fluency-clean/src/services/curriculumEngine.js`
- `fluency-clean/src/services/lessonProgression.js`
- `fluency-clean/src/services/masteryGate.js`

Status:
- Criado como base segura, ainda sem conectar na UI principal.
- A1 tem mapa de 119 aulas planejadas.
- A2–C2 estão como placeholders seguros.

Melhorias futuras:
- Integrar com tela de Curso.
- Integrar com conteúdo real quando as aulas fixas existirem.
- Melhorar cálculo de mastery com dados reais de prática e checkpoints.

## BLOCO-STATIC-02-LESSON-SCHEMAS — próximo recomendado

Objetivo:
- Transformar o schema documentado em contrato real de código.
- Criar factories, normalizadores e validadores leves para aulas fixas.

Arquivos sugeridos:
- `fluency-clean/src/content/schemas/lessonSchema.js`
- `fluency-clean/src/content/schemas/lessonFactories.js`
- `fluency-clean/src/content/schemas/lessonValidators.js`
- `fluency-clean/src/content/schemas/index.js`

O que fazer:
- Definir constantes de pilares e níveis.
- Criar shape base de aula fixa.
- Criar helpers por pilar.
- Criar validação mínima por pilar.
- Não conectar ainda na UI pesada.

Melhorias a analisar dentro do bloco:
- Criar mensagens de erro humanas para cada aula inválida.
- Criar validação de IDs únicos para listas pequenas.
- Criar compatibilidade temporária com campos legados sem manter dependência do legado.
- Preparar o caminho para o validador completo do bloco 14.

## BLOCO-STATIC-03-REMOVE-AI-GENERATOR-FROM-FLOW

Objetivo:
- Remover/desativar a geração dinâmica de aula por IA como fluxo principal.

O que fazer:
- Esconder botão “Gerar aula”.
- Substituir por “Abrir próxima aula” ou “Continuar curso”.
- Mover `LessonGeneratorPanel` e serviços de geração para legado ou dev-only.
- Manter IA apenas em funções auxiliares.

Estratégia:
- Primeiro ocultar/desconectar do fluxo principal.
- Não apagar tudo imediatamente.
- Não quebrar telas existentes antes de existirem aulas fixas renderizáveis.

## BLOCO-STATIC-04-A1-CURRICULUM-MAP

Objetivo:
- Refinar o mapa completo do A1 antes de escrever aulas reais.

Pilares e totais planejados:
- Grammar: 27 aulas.
- Vocabulary: 20 aulas.
- Reading: 20 aulas.
- Listening: 18 aulas.
- Speaking: 18 aulas.
- Writing: 16 aulas.
- Total estimado: 119 aulas.

Melhorias a analisar:
- Se o A1 precisar de mais aulas para não pular base, aumentar sem medo.
- Garantir que Speaking e Vocabulary não fiquem subordinados aos outros pilares.
- Garantir checkpoints suficientes.

## BLOCO-STATIC-05-A1-CONTENT-FOUNDATIONS

Objetivo:
- Criar o primeiro pacote real de conteúdo A1.

Pacote A1.1:
- Grammar 001–006
- Vocabulary 001–005
- Reading 001–003
- Listening 001–004
- Speaking 001–004
- Writing 001–003

Qualidade mínima:
- Grammar: 6–8 seções, 20–40 exemplos, 18–25 exercícios internos.
- Reading: texto A1 120–220 palavras, 8–12 perguntas com evidência.
- Listening: transcrição 100–220 palavras, primeira/segunda escuta, shadowing.
- Speaking: modelos, substituição, gravação guiada.
- Writing: modelo, blocos, substituição, checklist e produção.

Melhorias a analisar:
- Criar conteúdo em arquivos pequenos por aula.
- Não colocar conteúdo gigante em um arquivo único.
- Validar cada aula fixa com o schema antes de renderizar.

## BLOCO-STATIC-06-RENDERERS-STABLE

Objetivo:
- Ajustar renderizadores para o schema fixo.

Regras:
- Não depender de campos improvisados vindos da IA.
- Não mostrar gabarito antes da interação.
- Não quebrar se a aula fixa estiver válida.
- Renderizar exercícios internos antes da Prática Profunda.

Melhorias a analisar:
- Compatibilidade de transição com aulas antigas só onde for necessário.
- Stepper por pilar.
- UX mobile limpa.

## BLOCO-STATIC-07-PRACTICE-FROM-STATIC-LESSONS

Objetivo:
- Mudar a Prática Profunda para consumir aulas fixas premium e gerar questões melhores.

Quando fazer:
- Somente depois de existir schema fixo e primeiras aulas fixas.

Novo fluxo:

```txt
staticLesson
↓
normalizeStaticLessonForPractice()
↓
buildPracticePlanByPillar()
↓
validatePracticePlan()
↓
PracticeLauncher
```

Regras:
- Complementar, não substituta.
- Sempre derivada da aula fixa.
- Nunca inventar conteúdo fora da aula.

## BLOCO-STATIC-08-MASTERY-GATES

Objetivo:
- Criar critérios reais de domínio por aula, pilar e nível.

Critérios de saída do A1:
- Grammar >= 75%
- Reading >= 75%
- Listening >= 70%
- Speaking >= 65%
- Writing >= 70%
- Vocabulary >= 80%
- Final checkpoint aprovado

Melhorias a analisar:
- Tela “Pronto para A2?”.
- Explicação do que falta.
- Revisão obrigatória antes de avançar.

## BLOCO-STATIC-09-AI-TUTOR-ONLY

Objetivo:
- Reposicionar IA como auxiliar.

Permitido:
- Corrigir Writing.
- Avaliar Speaking.
- Explicar dúvida.
- Gerar reforço pequeno baseado somente na aula atual.
- Criar revisão adaptativa baseada em erros.

Proibido no fluxo principal:
- Gerar aula completa.
- Substituir currículo fixo.
- Avançar aluno sem mastery.

## BLOCO-STATIC-10-A1-FULL-CONTENT

Objetivo:
- Completar todas as aulas A1 depois do pacote Foundations.

Pacotes:
- A1.2 — Família, objetos e descrição.
- A1.3 — Rotina e Present Simple.
- A1.4 — Situações práticas.
- A1.5 — Revisões e checkpoints.

## BLOCO-STATIC-11-A1-CHECKPOINTS

Objetivo:
- Criar checkpoints finais e intermediários.

Se reprovar:
- Não avança.
- Gera trilha de revisão baseada em pontos fracos.

## BLOCO-STATIC-12-A2-MAP

Objetivo:
- Planejar A2 somente depois de A1 estar funcionando.

## BLOCO-STATIC-13-B1-B2-C1-C2-MAPS

Objetivo:
- Planejar níveis superiores sem implementar antes de A1/A2.

## BLOCO-STATIC-14-STATIC-CURRICULUM-VALIDATOR

Objetivo:
- Criar validação automática do curso fixo.

Valida:
- IDs únicos.
- Ordem.
- Pré-requisitos existentes.
- Quantidade mínima por tipo.
- Exercises com resposta.
- Reading com evidência.
- Listening com transcript.
- Writing com modelo.
- Grammar com seções longas.
- Checkpoints completos.

## BLOCO-STATIC-15-COURSE-SCREEN

Objetivo:
- Criar tela de curso/mapa visual do progresso.

## BLOCO-STATIC-16-REVIEW-SYSTEM-FROM-ERRORS

Objetivo:
- Criar revisão inteligente sem gerar aula nova.

## Estratégia de teste

O usuário não precisa testar manualmente cada bloco. Cada bloco deve ser construído com validações internas, checks de estrutura e baixo acoplamento. O teste manual completo pode ficar para o fim de um pacote funcional, principalmente depois de:

- Curriculum Engine;
- Schemas;
- primeiros conteúdos A1;
- renderizadores;
- prática derivada do conteúdo fixo.

## Regra de segurança

Não reativar geração dinâmica de aulas como fluxo principal sem autorização explícita. Qualquer serviço antigo de IA deve ser tratado como legado/dev-only até ser reposicionado como IA Tutor.