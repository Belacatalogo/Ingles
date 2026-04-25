/**
 * Fluency — Patch de Áudio e Login Google
 * Injete este script ANTES do bundle.js no index.html
 * Versão: 2025-04-25
 */

(function () {
  'use strict';

  // ─── 1. TOAST DE AVISO DE ÁUDIO ───────────────────────────────────────────

  function showAudioWarning(reason) {
    // remove toast anterior se existir
    var old = document.getElementById('fluency-audio-toast');
    if (old) old.remove();

    var toast = document.createElement('div');
    toast.id = 'fluency-audio-toast';
    toast.style.cssText = [
      'position:fixed',
      'bottom:80px',
      'left:50%',
      'transform:translateX(-50%)',
      'z-index:9999',
      'max-width:340px',
      'width:calc(100% - 32px)',
      'padding:12px 16px',
      'border-radius:14px',
      'font-family:-apple-system,sans-serif',
      'font-size:13px',
      'line-height:1.5',
      'color:#fff',
      'background:rgba(20,20,30,0.96)',
      'border:1px solid rgba(248,113,113,0.4)',
      'box-shadow:0 8px 32px rgba(0,0,0,0.5)',
      'display:flex',
      'align-items:flex-start',
      'gap:10px',
      'animation:fluencyToastIn 0.3s ease'
    ].join(';');

    var icon = document.createElement('span');
    icon.textContent = '🔇';
    icon.style.cssText = 'font-size:18px;flex-shrink:0;margin-top:1px';

    var body = document.createElement('div');
    body.style.cssText = 'flex:1;min-width:0';

    var title = document.createElement('div');
    title.style.cssText = 'font-weight:600;color:#F87171;margin-bottom:3px';
    title.textContent = 'Sem áudio';

    var msg = document.createElement('div');
    msg.style.cssText = 'color:rgba(255,255,255,0.75);font-size:12px';
    msg.textContent = reason;

    var close = document.createElement('button');
    close.textContent = '✕';
    close.style.cssText = [
      'background:none',
      'border:none',
      'color:rgba(255,255,255,0.4)',
      'font-size:14px',
      'cursor:pointer',
      'padding:0',
      'flex-shrink:0',
      'margin-top:1px'
    ].join(';');
    close.onclick = function () { toast.remove(); };

    body.appendChild(title);
    body.appendChild(msg);
    toast.appendChild(icon);
    toast.appendChild(body);
    toast.appendChild(close);
    document.body.appendChild(toast);

    // auto-remove após 6s
    setTimeout(function () {
      if (toast.parentNode) {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.4s';
        setTimeout(function () { toast.remove(); }, 400);
      }
    }, 6000);
  }

  // Injetar keyframes de animação
  var style = document.createElement('style');
  style.textContent = '@keyframes fluencyToastIn{from{opacity:0;transform:translateX(-50%) translateY(12px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}';
  document.head.appendChild(style);

  // ─── 2. WRAPPER DA FUNÇÃO Nt (playAudio) ──────────────────────────────────
  // Aguarda o bundle carregar, depois faz monkey-patch
  // A função global é exposta via window após bundle executar

  var _origNt = null;

  function diagnoseAudioFailure() {
    // Tenta detectar o motivo
    if (!window.AudioContext && !window.webkitAudioContext) {
      return 'Este navegador não suporta AudioContext. Tente o Chrome ou Safari.';
    }
    // Contexto suspenso (política de autoplay — precisa de interação)
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') {
        ctx.close();
        return 'O navegador bloqueou o áudio (política de autoplay). Toque em qualquer lugar da tela e tente de novo.';
      }
      ctx.close();
    } catch (e) { /* ignore */ }

    // speechSynthesis ausente
    if (!window.speechSynthesis) {
      return 'Síntese de voz não disponível neste browser. Tente o Chrome.';
    }

    // Sem chave Gemini configurada
    try {
      var key = localStorage.getItem('fluency_geminiKey');
      if (!key) {
        return 'Sem chave Gemini configurada — usando voz do sistema (pode variar conforme o aparelho).';
      }
    } catch(e) { /* ignore */ }

    return 'Áudio não reproduzido. Verifique o volume e se o modo silencioso está ativado.';
  }

  function patchNtFunction() {
    // A função Nt é interna ao bundle (minificada), mas é chamada via
    // window.Nt em alguns contextos OU podemos interceptar via proxy do AudioContext
    // Estratégia: interceptar AudioContext para detectar falhas
    patchAudioContext();
    patchSpeechSynthesis();
  }

  function patchAudioContext() {
    var OrigAudioContext = window.AudioContext || window.webkitAudioContext;
    if (!OrigAudioContext) return;

    var patchedClass = function (opts) {
      var ctx = new OrigAudioContext(opts);
      var origResume = ctx.resume.bind(ctx);
      ctx.resume = function () {
        return origResume().catch(function (e) {
          showAudioWarning('Contexto de áudio bloqueado pelo navegador. Toque na tela para liberar o som.');
          throw e;
        });
      };
      return ctx;
    };

    // Copiar propriedades estáticas
    try {
      Object.setPrototypeOf(patchedClass, OrigAudioContext);
      patchedClass.prototype = OrigAudioContext.prototype;
      if (window.AudioContext) window.AudioContext = patchedClass;
      if (window.webkitAudioContext) window.webkitAudioContext = patchedClass;
    } catch (e) { /* não crítico */ }
  }

  function patchSpeechSynthesis() {
    if (!window.speechSynthesis) return;
    var origSpeak = window.speechSynthesis.speak.bind(window.speechSynthesis);
    window.speechSynthesis.speak = function (utterance) {
      var origOnError = utterance.onerror;
      utterance.onerror = function (event) {
        var errMap = {
          'not-allowed': 'Áudio bloqueado pelo browser (autoplay). Toque na tela primeiro.',
          'audio-busy': 'Sistema de áudio ocupado. Tente novamente.',
          'synthesis-unavailable': 'Síntese de voz não disponível neste dispositivo.',
          'synthesis-failed': 'Falha na síntese de voz do sistema.',
          'network': 'Sem conexão para carregar a voz. Verifique a internet.',
          'language-unavailable': 'Voz em inglês não instalada neste dispositivo.',
          'voice-unavailable': 'Voz selecionada indisponível.',
          'text-too-long': 'Texto muito longo para o sintetizador.',
          'invalid-argument': 'Argumento inválido para síntese de voz.'
        };
        var reason = errMap[event.error] || ('Erro de voz: ' + (event.error || 'desconhecido'));
        showAudioWarning(reason);
        if (origOnError) origOnError(event);
      };
      try {
        origSpeak(utterance);
      } catch (e) {
        showAudioWarning('Não foi possível reproduzir o áudio: ' + e.message);
      }
    };
  }

  // ─── 3. INTERCEPTAR FETCH DO GEMINI TTS ──────────────────────────────────
  var origFetch = window.fetch;
  window.fetch = function (url, options) {
    var promise = origFetch.apply(this, arguments);

    // Só monitorar chamadas TTS do Gemini
    if (typeof url === 'string' && url.includes('generativelanguage.googleapis.com') && url.includes('generateContent')) {
      return promise.then(function (response) {
        if (!response.ok && options && options.body) {
          try {
            var body = JSON.parse(options.body);
            var hasAudio = body.generationConfig &&
              Array.isArray(body.generationConfig.responseModalities) &&
              body.generationConfig.responseModalities.includes('AUDIO');
            if (hasAudio) {
              var statusMap = {
                400: 'Chave Gemini inválida ou TTS não suportado neste modelo.',
                401: 'Chave Gemini sem permissão para TTS.',
                403: 'Acesso negado ao Gemini TTS.',
                404: 'Modelo Gemini TTS não encontrado — usando voz do sistema.',
                429: 'Limite da API Gemini atingido — usando voz do sistema.',
                500: 'Erro no servidor Gemini — usando voz do sistema.'
              };
              var msg = statusMap[response.status] || ('Gemini TTS retornou ' + response.status + ' — usando voz do sistema.');
              // Não mostrar toast para 404 (fallback normal) e 429 (esperado)
              if (response.status !== 404) {
                showAudioWarning(msg);
              }
            }
          } catch (e) { /* ignore JSON parse error */ }
        }
        return response;
      }).catch(function (e) {
        // Erro de rede
        return promise; // propagar
      });
    }

    return promise;
  };

  // ─── 4. PATCH DO LOGIN GOOGLE ─────────────────────────────────────────────
  // O bundle expõe _isPWA e Xp (signInWithGoogle) — vamos melhorar a UX
  // sem quebrar a lógica existente.

  // Interceptar localStorage para capturar erros de auth e exibir melhor
  var _origSetItem = localStorage.setItem.bind(localStorage);
  localStorage.setItem = function (key, value) {
    _origSetItem(key, value);

    if (key === 'fluency_lastAuthError' || key === 'fluency_lastRedirectError') {
      var friendly = translateAuthError(value);
      if (friendly) {
        showGoogleAuthError(friendly, value);
      }
    }
  };

  function translateAuthError(rawError) {
    if (!rawError) return null;
    var e = String(rawError).toLowerCase();

    if (e.includes('popup-blocked') || e.includes('popup_blocked')) {
      return '🚫 Popup bloqueado pelo browser.\n\nSolução: Nas configurações do browser, permita popups para este site. OU acesse pelo Chrome no computador para login mais fácil.';
    }
    if (e.includes('unauthorized-domain') || e.includes('unauthorized_domain')) {
      return '🌐 Domínio não autorizado no Firebase.\n\nSolução: No Firebase Console → Authentication → Settings → Authorized domains → adicione o domínio deste site (ex: seuusuario.github.io).';
    }
    if (e.includes('cancelled') || e.includes('popup-closed') || e.includes('popup_closed')) {
      return '❌ Login cancelado. A janela do Google foi fechada antes de concluir.';
    }
    if (e.includes('network') || e.includes('failed to fetch')) {
      return '📶 Sem conexão. Verifique sua internet e tente novamente.';
    }
    if (e.includes('internal-error') || e.includes('internal_error')) {
      return '⚠️ Erro interno do Firebase. Tente novamente em alguns segundos.';
    }
    if (e.includes('account-exists') || e.includes('credential-already-in-use')) {
      return '✅ Esta conta Google já existe. Fazendo login direto...';
    }
    return null; // manter exibição padrão do app
  }

  function showGoogleAuthError(friendly, raw) {
    // Verificar se já existe um elemento de erro visível no DOM
    // para não duplicar — o bundle já mostra alguns erros
    setTimeout(function () {
      var existingErr = document.getElementById('fluency-auth-toast');
      if (existingErr) existingErr.remove();

      if (friendly.includes('✅')) return; // não mostrar toast para casos ok

      var toast = document.createElement('div');
      toast.id = 'fluency-auth-toast';
      toast.style.cssText = [
        'position:fixed',
        'top:80px',
        'left:50%',
        'transform:translateX(-50%)',
        'z-index:9999',
        'max-width:360px',
        'width:calc(100% - 24px)',
        'padding:14px 16px',
        'border-radius:14px',
        'font-family:-apple-system,sans-serif',
        'font-size:13px',
        'line-height:1.55',
        'color:#fff',
        'white-space:pre-line',
        'background:rgba(15,20,40,0.97)',
        'border:1px solid rgba(251,191,36,0.4)',
        'box-shadow:0 8px 40px rgba(0,0,0,0.6)',
        'animation:fluencyToastIn 0.3s ease'
      ].join(';');

      var closeBtn = document.createElement('button');
      closeBtn.textContent = '✕ Fechar';
      closeBtn.style.cssText = [
        'display:block',
        'margin-top:10px',
        'background:rgba(255,255,255,0.12)',
        'border:none',
        'color:#fff',
        'padding:6px 14px',
        'border-radius:8px',
        'font-size:12px',
        'cursor:pointer',
        'width:100%'
      ].join(';');
      closeBtn.onclick = function () { toast.remove(); };

      toast.textContent = friendly;
      toast.appendChild(closeBtn);
      document.body.appendChild(toast);
    }, 300);
  }

  // ─── 5. INICIALIZAÇÃO ─────────────────────────────────────────────────────
  // Aplicar patches assim que o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', patchNtFunction);
  } else {
    patchNtFunction();
  }

  // Re-aplicar após bundle carregar (caso AudioContext seja recriado)
  window.addEventListener('load', function () {
    setTimeout(patchNtFunction, 500);
  });

  // Expor helper para debug manual
  window.__fluencyDiagnoseAudio = diagnoseAudioFailure;
  window.__fluencyShowAudioWarning = showAudioWarning;

  console.log('[Fluency Patch] audio-fix.js carregado ✓');
})();
