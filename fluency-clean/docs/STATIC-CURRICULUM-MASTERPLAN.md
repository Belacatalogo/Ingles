# Static Curriculum Masterplan — Fluency

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

## Critérios de avanço de nível

O aluno só deve sair do A1 quando cumprir:

- Grammar >= 75%
- Reading >= 75%
- Listening >= 70%
- Speaking >= 65%
- Writing >= 70%
- Vocabulary >= 80%
- Final checkpoint aprovado

## Estratégia de teste

O usuário não precisa testar manualmente cada bloco. Cada bloco deve ser construído com validações internas, checks de estrutura e baixo acoplamento. O teste manual completo pode ficar para o fim de um pacote funcional, principalmente depois de Curriculum Engine + Schemas + primeiros conteúdos A1 + renderizadores.

## Regra de segurança

Não reativar geração dinâmica de aulas como fluxo principal sem autorização explícita. Qualquer serviço antigo de IA deve ser tratado como legado/dev-only até ser reposicionado como IA Tutor.