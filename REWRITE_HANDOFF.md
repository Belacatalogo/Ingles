# Fluency Clean — Handoff Oficial

Última atualização: 2026-05-16

## Branch oficial atual

A partir desta data, a branch oficial de trabalho é:

```txt
main
```

A branch `claude/improve-english-system-hu6gz` foi promovida para `main` e não deve mais ser usada como branch principal de continuação.

Backup da main antiga:

```txt
backup-main-before-improve-english-system-2026-05-16
```

Branches antigas/históricas:

```txt
rewrite-fluency-clean-lab
rewrite-fluency-clean
claude/improve-english-system-hu6gz
claude/improve-english-system-hu6gz-IuOMv
lab
```

Essas branches podem existir no GitHub como histórico, mas não devem ser usadas para novos blocos sem autorização explícita do usuário.

---

## REGRA MÁXIMA DE BRANCH — ATUALIZADA

- Trabalhar sempre na `main`.
- Não criar branch nova sem autorização explícita.
- Não voltar para `lab`.
- Não voltar para `rewrite-fluency-clean-lab`.
- Não voltar para `rewrite-fluency-clean`.
- Não voltar para `claude/improve-english-system-hu6gz`.
- Não usar branch sufixada automática.
- Não abrir PR para o fluxo normal.
- Não fazer merge.
- Não fazer rebase.
- Não fazer force push sem autorização explícita.
- Não mexer no backup da main antiga.

Antes de qualquer alteração, confirmar:

```bash
git branch --show-current
```

Resultado esperado:

```txt
main
```

Se não estiver na `main`, parar e trocar para `main` antes de editar.

---

## Regras técnicas obrigatórias

- Não mexer em `bundle.js`.
- Não criar bundle patch.
- Não usar DOM injection.
- Não usar HTML gigante/remendado.
- Não criar gambiarra em arquivo único.
- Manter tudo modular em `fluency-clean/src/`, `fluency-clean/public/`, `fluency-clean/docs/` ou arquivos reais de configuração.
- Não mexer no backend Azure privado sem autorização explícita.
- Não mexer no Firebase/Azure de produção sem autorização explícita.
- Não ativar Firebase real, Gemini real, Cloudinary real ou escrita remota sem autorização explícita.
- Não colocar secrets/credenciais no frontend.
- Não compactar conteúdo pedagógico apenas para caber na UI.
- Não mostrar gabarito, transcript, modelo ou resposta esperada antes da tentativa quando a etapa exigir descoberta.

---

## Nova direção oficial — curso fixo premium + IA auxiliar

Decisão estratégica aprovada pelo usuário:

- O Fluency não deve depender de IA para gerar a aula principal em tempo real.
- A aula principal deve vir de conteúdo fixo, curado, completo, validado e renderizado de forma previsível.
- A arquitetura oficial é: curso fixo premium A1 → C2 + prática profunda derivada da aula fixa + IA apenas como tutora/corretora/revisora adaptativa.
- IA pode corrigir Writing, avaliar Speaking, explicar dúvidas, gerar reforço pequeno baseado na aula atual e montar revisão adaptativa.
- IA não deve inventar a aula-base nem substituir o currículo fixo.

Fluxo oficial:

```txt
Curso fixo premium
↓
Curriculum Engine escolhe a próxima aula
↓
Renderizador estável por pilar
↓
Exercícios internos da aula
↓
Prática Profunda complementar derivada da aula fixa
↓
IA Tutor apenas para correção, dúvida, reforço e revisão adaptativa
↓
Mastery Gate libera ou bloqueia avanço
```

Fluxo antigo a aposentar:

```txt
IA gera aula completa do zero
↓
Parser tenta entender JSON
↓
Pipeline tenta corrigir
↓
Professor revisor tenta aprovar
↓
Aula salva
↓
Renderização quebra ou fica inconsistente
```

---

## Estado atual importante

### Branch/main

- A antiga branch `claude/improve-english-system-hu6gz` foi usada como base final.
- A `main` agora deve conter o estado do sistema de aulas profundas, renderização por pilar, áudio Gemini corrigido e melhorias de fluxo.
- Qualquer continuação deve acontecer diretamente na `main`.

### Sistema de aulas

- `CourseScreen` abre a aula diária por `staticCourseLauncher.js`.
- A aula é salva em `lesson.current`.
- `LessonScreen.jsx` recupera a aula via `getCurrentLesson()` / `getCurrentLessonFull()`.
- O renderizador é escolhido por `FLOW_BY_PILLAR[pillar]`.
- Renderizadores oficiais:
  - `GrammarLessonFlow`
  - `VocabularyLessonFlow`
  - `ReadingLessonFlowV2`
  - `ListeningLessonFlow`
  - `SpeakingLessonFlow`
  - `WritingLessonFlow`

### Correções importantes já feitas

- `fallback-reading` removido do usuário final.
- Sem aula salva, `LessonScreen` mostra estado vazio claro.
- `flowErrors` das aulas alimentam revisão.
- `lessonFlowScore.js` centraliza scoring.
- `completeLesson()` salva XP, streak, lessonId, pillar, flowScore e flowErrors.
- `reviewFromErrors.js` lê erros vindos de `lessonCompletions.flowErrors`.
- `ChecklistField` não deve passar silenciosamente com lista vazia.
- `SpeakField` não deve marcar tentativa com uma única letra.
- `AudioListenField` e shadowing receberam melhorias de áudio.
- `staticLessonDisplayNormalizer.js` foi estendido para mais pilares.
- `lessonFlashcards.js` filtra melhor cards ruins/instruções em português.
- `lesson-flow.css` recebeu ajustes de safe-area para iPhone.

### Áudio Gemini

Correção aplicada:

- `geminiTts.js` agora usa chaves gerais de IA + chaves Flash de aulas + chave Pro de aulas.
- `geminiAudioService.js` tenta múltiplos modelos TTS.
- O navegador deve ser fallback final, não padrão.

Funções cobertas:

- Palavra do dia.
- Citação do dia.
- Ouvir palavra/frase em Cartas.
- Listening.
- Shadowing.
- Speaking model phrases.
- Botões “Ouvir Gemini” nas aulas profundas/estáticas.

---

## Pendências principais

1. **LessonPhaseStepper**
   - Fases obrigatórias futuras ainda podem ser clicáveis se o aluno tentar pular.
   - Regra desejada: pode voltar, mas não pode avançar para fase obrigatória futura sem concluir obrigatórias anteriores.

2. **Persistência mid-lesson**
   - Refresh ainda pode reiniciar progresso local da aula.
   - Salvar `activeIndex` e `attempts` por `lessonId` no localStorage.

3. **Mastery Gate real**
   - Verificar integração real A1 → A2.
   - Evitar avanço sem domínio mínimo por pilar.

4. **TAG_RULES / revisão inteligente**
   - Ampliar `reviewFromErrors.js` para cobrir mais erros de speaking, vocabulary e writing.

5. **Speaking/Writing com IA Tutor**
   - Scoring de produção livre ainda depende de autorização de API.
   - Não ativar chamadas reais sem autorização.

6. **Flashcards da aula**
   - Melhorar cards de grammar, writing, speaking e listening sem gerar cards genéricos/lixo.

7. **iPhone polish**
   - Garantir que textarea/input focado não fique escondido pelo footer/menu inferior.
   - Garantir que player de áudio, botões e tabs tenham área confortável.

---

## Como continuar em outro chat

Use este prompt base:

```txt
Continue o trabalho no repositório Belacatalogo/Ingles.

Branch obrigatória atual:
main

Antes de qualquer alteração, leia REWRITE_HANDOFF.md.

Regras obrigatórias:
- trabalhar diretamente na main;
- não criar branch;
- não abrir PR;
- não fazer merge;
- não fazer rebase;
- não fazer force push;
- não voltar para lab, rewrite-fluency-clean-lab ou claude/improve-english-system-hu6gz;
- não mexer no backup backup-main-before-improve-english-system-2026-05-16;
- não usar DOM injection;
- não criar bundle patch;
- não fazer HTML gigante/remendado;
- manter tudo modular;
- não ativar Firebase/Azure/Gemini real sem autorização explícita;
- não colocar secrets no frontend.

Foco atual:
curso fixo premium A1 → C2, renderização profunda por pilar, prática profunda complementar derivada da aula fixa, IA apenas como tutora/corretora/revisora adaptativa.
```

---

## Checklist obrigatório ao finalizar qualquer bloco

Ao final de qualquer bloco, atualizar este handoff com:

- o que foi feito;
- arquivos alterados;
- build/check executados;
- pendências;
- confirmação de que permaneceu na `main`;
- confirmação de que não criou branch, PR, merge, rebase ou force push.

Confirmação esperada:

```txt
Branch: main
Sem branch nova.
Sem PR.
Sem merge.
Sem rebase.
Sem force push.
Backup da main antiga preservado.
```
