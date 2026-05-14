# HOTFIX — Listening: mini diálogo praticável

Branch: `rewrite-fluency-clean-lab`

## Status

Concluído.

## Problema observado

A seção de mini diálogo / produção oral curta mostrava apenas uma instrução, mas não oferecia ação real para o aluno:

- não havia campo para escrever;
- não havia botão para tentar falar;
- não havia salvamento de tentativa.

## Correção

Criado o componente:

`fluency-clean/src/components/lesson/ListeningMiniDialoguePractice.jsx`

Conectado em:

`fluency-clean/src/screens/LessonScreen.jsx`

## O que foi implementado

### 1. Campo de escrita

O aluno pode escrever um mini diálogo em inglês.

Placeholder com modelo simples:

```txt
Ana: Hi, my name is Ana.
Luis: Hello, Ana. My name is Luis.
Ana: How are you?
Luis: I am fine, thanks.
```

### 2. Botão de fala

Botão:

```txt
Falar resposta
```

Usa SpeechRecognition do navegador quando disponível.

Se não estiver disponível, a tela orienta a escrever a resposta.

### 3. Botão de parar fala

Durante a gravação aparece:

```txt
Parar fala
```

### 4. Salvamento local

Botão:

```txt
Salvar tentativa
```

A tentativa fica salva localmente por aula.

### 5. UX limpa

Nada técnico aparece para o aluno.

Mensagens humanas:

- `Ouvindo... fale seu mini diálogo em inglês.`
- `Fala captada. Revise e salve sua tentativa.`
- `Tentativa salva. Você pode voltar e melhorar depois.`

## Arquivos envolvidos

Criados:

- `fluency-clean/src/components/lesson/ListeningMiniDialoguePractice.jsx`
- `fluency-clean/docs/HOTFIX-LISTENING-MINI-DIALOGO-PRATICAVEL-CONCLUIDO.md`

Alterados:

- `fluency-clean/src/screens/LessonScreen.jsx`

## O que este hotfix não fez

- Não corrigiu pronúncia automaticamente.
- Não enviou áudio para IA avaliar.
- Não mexeu no sistema real de Speaking.
- Não mexeu em Azure ou Firebase.

## Próximo passo futuro

Quando o Speaking real estiver consolidado, conectar essa tentativa oral ao corretor de pronúncia/fluência.

## Próximo bloco recomendado

Depois de validar no iPhone:

## BLOCO 11A — A1.3 Daily Routine profundo
