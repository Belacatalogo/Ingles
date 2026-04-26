/* ============================================================================
 * Fluency – Shadowing AI Enhancer
 * Painel seguro apenas na subaba Shadowing + preenchimento automático da caixa.
 * Não altera bundle.js.
 * ========================================================================== */
(function(){
  'use strict';
  if (window.__fluencyShadowingAI_v2) return;
  window.__fluencyShadowingAI_v2 = true;

  var STORAGE_LAST = '__shadowing_ai_last_sentence__';

  function getGeminiKey(){
    try { return localStorage.getItem('fluency_geminiKey') || ''; } catch(e) { return ''; }
  }

  function getUserLevel(){
    var candidates = ['fluency_level','fluency_user_level','userLevel','level','currentLevel','__fluency_level__','fluency_cefr_level'];
    for (var i=0;i<candidates.length;i++) {
      try {
        var v = localStorage.getItem(candidates[i]);
        if (v && /A1|A2|B1|B2|C1|C2/i.test(v)) {
          var m = v.match(/A1|A2|B1|B2|C1|C2/i);
          if (m) return m[0].toUpperCase();
        }
      } catch(e) {}
    }
    try {
      var all = JSON.stringify(localStorage);
      var mm = all.match(/\b(A1|A2|B1|B2|C1|C2)\b/i);
      if (mm) return mm[1].toUpperCase();
    } catch(e) {}
    return 'A2';
  }

  function norm(s){ return String(s || '').replace(/\s+/g,' ').trim().toLowerCase(); }

  function isActuallyShadowingScreen(){
    var txt = norm(document.body && document.body.innerText || '');
    // Não basta haver o botão "Shadowing". Exigimos texto exclusivo do conteúdo da subaba.
    return txt.indexOf('shadowing / repetição imediata') !== -1 ||
           txt.indexOf('shadowing / repeticao imediata') !== -1 ||
           txt.indexOf('escolha uma frase ou parágrafo curto') !== -1 ||
           txt.indexOf('escolha uma frase ou paragrafo curto') !== -1 ||
           txt.indexOf('primeiro ouça o áudio, depois repita imediatamente') !== -1 ||
           txt.indexOf('primeiro ouca o audio, depois repita imediatamente') !== -1;
  }

  function toast(msg){
    try {
      if (typeof window.__pronToast === 'function') return window.__pronToast(msg);
      var el = document.getElementById('__shadowing_ai_toast__');
      if (!el) {
        el = document.createElement('div');
        el.id = '__shadowing_ai_toast__';
        el.style.cssText = 'position:fixed;left:50%;bottom:92px;transform:translateX(-50%);z-index:999999;background:rgba(6,13,31,.96);color:#E8EFF8;border:1px solid rgba(91,156,246,.4);border-radius:14px;padding:10px 14px;font:13px -apple-system,BlinkMacSystemFont,sans-serif;max-width:330px;text-align:center;box-shadow:0 8px 24px rgba(0,0,0,.45);opacity:0;transition:opacity .2s;pointer-events:none;';
        document.body.appendChild(el);
      }
      el.textContent = msg;
      el.style.opacity = '1';
      clearTimeout(el.__t);
      el.__t = setTimeout(function(){ el.style.opacity = '0'; }, 3000);
    } catch(e) {}
  }

  function speak(text){
    try {
      if (!window.speechSynthesis) return toast('Seu navegador não liberou voz ainda. Toque na tela e tente de novo.');
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 0.86;
      u.pitch = 1;
      var voices = window.speechSynthesis.getVoices() || [];
      var preferred = voices.find(function(v){ return /en-US/i.test(v.lang) && /Samantha|Google|Microsoft|Natural|Jenny|Aria/i.test(v.name); }) ||
                      voices.find(function(v){ return /en-US/i.test(v.lang); }) ||
                      voices.find(function(v){ return /^en/i.test(v.lang); });
      if (preferred) u.voice = preferred;
      window.speechSynthesis.speak(u);
    } catch(e) { toast('Não consegui tocar o áudio agora.'); }
  }

  function fallbackSentence(level){
    var bank = {
      A1: ['I wake up early and drink water before breakfast.', 'My name is Luis, and I am learning English every day.'],
      A2: ['I am trying to speak more clearly, even when the sentence is difficult.', 'Yesterday I practiced English for ten minutes and learned three new words.'],
      B1: ['I used to feel nervous when speaking English, but now I am becoming more confident.', 'If I keep practicing every day, my pronunciation will improve little by little.'],
      B2: ['One of the best ways to improve fluency is to repeat natural sentences with rhythm and emotion.', 'Even when I make mistakes, I can learn from them and express my ideas more clearly.'],
      C1: ['Shadowing helps me internalize pronunciation patterns, sentence stress, and the natural rhythm of English.', 'The more consistently I expose myself to natural speech, the easier it becomes to respond automatically.'],
      C2: ['Fluent communication is not just about accuracy; it is also about timing, nuance, and the ability to adapt naturally.', 'By imitating native-like rhythm and intonation, I can make my speech sound more confident and effortless.']
    };
    var arr = bank[level] || bank.A2;
    return arr[Math.floor(Math.random()*arr.length)];
  }

  async function generateSentence(){
    var level = getUserLevel();
    var key = getGeminiKey();
    var prompt = 'Você é um professor de inglês para brasileiro. Gere UMA frase em inglês para treino de shadowing no nível ' + level + '. Regras: responda somente JSON válido, sem markdown. Formato: {"sentence":"...","pt":"...","focus":"..."}. A frase deve ser natural, útil, curta o bastante para repetir, e adequada ao nível. O campo focus deve explicar em PT-BR qual som/ritmo treinar.';

    if (!key) {
      return { sentence: fallbackSentence(level), pt: 'Frase gerada localmente porque a chave Gemini não foi encontrada.', focus: 'Repita devagar primeiro, depois tente copiar o ritmo natural.', level: level, offline: true };
    }

    var models = ['gemini-2.0-flash','gemini-2.5-flash','gemini-1.5-flash-latest'];
    for (var i=0;i<models.length;i++) {
      try {
        var res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + models[i] + ':generateContent?key=' + encodeURIComponent(key), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 220, responseMimeType: 'application/json' }
          })
        });
        if (!res.ok) continue;
        var j = await res.json();
        var text = (((j.candidates || [])[0] || {}).content || {}).parts || [];
        text = text.map(function(p){ return p.text || ''; }).join('').trim();
        var si = text.indexOf('{'), ei = text.lastIndexOf('}');
        if (si >= 0 && ei >= 0) {
          var obj = JSON.parse(text.slice(si, ei+1));
          if (obj && obj.sentence) { obj.level = level; return obj; }
        }
      } catch(e) {}
    }
    return { sentence: fallbackSentence(level), pt: 'Use esta frase para treinar repetição.', focus: 'Copie o ritmo, as pausas e a entonação.', level: level, offline: true };
  }

  function isVisible(el){
    if (!el || el.id === '__shadowing_ai_panel__' || (el.closest && el.closest('#__shadowing_ai_panel__'))) return false;
    var r = el.getBoundingClientRect();
    var st = window.getComputedStyle(el);
    return r.width > 40 && r.height > 20 && st.display !== 'none' && st.visibility !== 'hidden' && r.bottom > 0 && r.top < window.innerHeight;
  }

  function setNativeValue(el, value){
    try {
      var proto = el.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
      var desc = Object.getOwnPropertyDescriptor(proto, 'value');
      if (desc && desc.set) desc.set.call(el, value);
      else el.value = value;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    } catch(e) {
      try { el.value = value; el.dispatchEvent(new Event('input', { bubbles:true })); return true; } catch(_) {}
    }
    return false;
  }

  function fillShadowingOriginalBox(sentence){
    try {
      if (!sentence) return false;
      var fields = Array.prototype.slice.call(document.querySelectorAll('textarea, input[type="text"], input:not([type]), [contenteditable="true"]'))
        .filter(isVisible)
        .sort(function(a,b){
          var ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
          return (rb.width * rb.height) - (ra.width * ra.height);
        });

      for (var i=0;i<fields.length;i++) {
        var el = fields[i];
        if (el.isContentEditable) {
          el.focus();
          el.textContent = sentence;
          el.dispatchEvent(new InputEvent('input', { bubbles:true, inputType:'insertText', data:sentence }));
          el.dispatchEvent(new Event('change', { bubbles:true }));
          return true;
        }
        if (setNativeValue(el, sentence)) {
          el.focus();
          return true;
        }
      }

      // Fallback para alguns componentes React: tenta clicar no texto atual e simular colagem.
      var all = Array.prototype.slice.call(document.querySelectorAll('div, p, span'))
        .filter(isVisible)
        .filter(function(el){
          var t = norm(el.innerText || el.textContent || '');
          return t.length > 10 && /i need to|figure out|make this sound|more natural|shadowing/i.test(t);
        })
        .sort(function(a,b){ return (b.getBoundingClientRect().width*b.getBoundingClientRect().height) - (a.getBoundingClientRect().width*a.getBoundingClientRect().height); });
      if (all[0]) {
        all[0].click();
        setTimeout(function(){
          var active = document.activeElement;
          if (active && (active.tagName === 'TEXTAREA' || active.tagName === 'INPUT')) setNativeValue(active, sentence);
        }, 60);
        return true;
      }
    } catch(e) {}
    return false;
  }

  function makePanel(){
    var panel = document.getElementById('__shadowing_ai_panel__');
    if (panel) return panel;
    panel = document.createElement('div');
    panel.id = '__shadowing_ai_panel__';
    panel.style.cssText = 'position:fixed;left:12px;right:12px;bottom:14px;z-index:99998;background:linear-gradient(135deg,rgba(6,13,31,.97),rgba(10,20,40,.97));border:1px solid rgba(91,156,246,.35);border-radius:18px;padding:14px;box-shadow:0 10px 30px rgba(0,0,0,.45);color:#E8EFF8;font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:560px;margin:0 auto;';
    panel.innerHTML = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><b style="font-size:14px;flex:1">Shadowing IA</b><span id="__shadowing_ai_level__" style="font-size:11px;color:#93C5FD;border:1px solid rgba(147,197,253,.25);border-radius:999px;padding:3px 8px">nível A2</span><button id="__shadowing_ai_hide__" style="background:rgba(255,255,255,.08);color:#E8EFF8;border:0;border-radius:999px;width:28px;height:28px;font-size:16px">×</button></div><button id="__shadowing_ai_generate__" style="width:100%;background:linear-gradient(135deg,#5B9CF6,#A78BFA);color:white;border:0;border-radius:14px;padding:12px 14px;font-weight:700;font-size:14px">Gerar frase para meu nível</button><div id="__shadowing_ai_result__" style="display:none;margin-top:10px;border-top:1px solid rgba(255,255,255,.1);padding-top:10px"><div id="__shadowing_ai_sentence__" style="font-size:17px;line-height:1.45;font-weight:700;margin-bottom:6px"></div><div id="__shadowing_ai_pt__" style="font-size:12px;color:rgba(232,239,248,.72);line-height:1.45;margin-bottom:6px"></div><div id="__shadowing_ai_focus__" style="font-size:12px;color:#93C5FD;line-height:1.45;margin-bottom:10px"></div><div style="display:flex;gap:8px"><button id="__shadowing_ai_listen__" style="flex:1;background:rgba(91,156,246,.18);color:#E8EFF8;border:1px solid rgba(91,156,246,.35);border-radius:12px;padding:10px;font-weight:700">Ouvir</button><button id="__shadowing_ai_copy__" style="flex:1;background:rgba(255,255,255,.08);color:#E8EFF8;border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:10px;font-weight:700">Copiar</button></div></div>';
    document.body.appendChild(panel);

    var currentSentence = '';
    function setLoading(on){
      var b = document.getElementById('__shadowing_ai_generate__');
      if (!b) return;
      b.disabled = !!on;
      b.textContent = on ? 'Gerando frase…' : 'Gerar frase para meu nível';
      b.style.opacity = on ? '.7' : '1';
    }
    function render(obj){
      currentSentence = obj.sentence || '';
      document.getElementById('__shadowing_ai_level__').textContent = 'nível ' + (obj.level || getUserLevel());
      document.getElementById('__shadowing_ai_sentence__').textContent = currentSentence;
      document.getElementById('__shadowing_ai_pt__').textContent = obj.pt || '';
      document.getElementById('__shadowing_ai_focus__').textContent = obj.focus ? ('Foco: ' + obj.focus) : '';
      document.getElementById('__shadowing_ai_result__').style.display = 'block';
      try { localStorage.setItem(STORAGE_LAST, JSON.stringify(obj)); } catch(e) {}
      setTimeout(function(){
        if (!fillShadowingOriginalBox(currentSentence)) toast('Frase gerada. Não consegui preencher a caixa automaticamente neste carregamento.');
      }, 80);
    }

    document.getElementById('__shadowing_ai_generate__').onclick = async function(){
      setLoading(true);
      try {
        var obj = await generateSentence();
        render(obj);
        speak(obj.sentence);
      } catch(e) {
        toast('Não consegui gerar agora. Usei uma frase local.');
        var lvl = getUserLevel();
        var obj2 = { sentence: fallbackSentence(lvl), pt: '', focus: 'Repita 3 vezes: devagar, normal e com ritmo.', level: lvl };
        render(obj2);
        speak(obj2.sentence);
      } finally { setLoading(false); }
    };
    document.getElementById('__shadowing_ai_listen__').onclick = function(){ if (currentSentence) speak(currentSentence); };
    document.getElementById('__shadowing_ai_copy__').onclick = function(){
      if (!currentSentence) return;
      try { navigator.clipboard.writeText(currentSentence); toast('Frase copiada.'); } catch(e) { toast('Não consegui copiar automaticamente.'); }
    };
    document.getElementById('__shadowing_ai_hide__').onclick = function(){ panel.style.display = 'none'; };

    try {
      var last = JSON.parse(localStorage.getItem(STORAGE_LAST) || 'null');
      if (last && last.sentence && isActuallyShadowingScreen()) {
        currentSentence = last.sentence;
        document.getElementById('__shadowing_ai_level__').textContent = 'nível ' + (last.level || getUserLevel());
      }
    } catch(e) {}
    return panel;
  }

  function ensurePanel(){
    if (!document.body) return;
    var p = document.getElementById('__shadowing_ai_panel__');
    if (isActuallyShadowingScreen()) {
      p = makePanel();
      p.style.display = 'block';
      var lvl = document.getElementById('__shadowing_ai_level__');
      if (lvl) lvl.textContent = 'nível ' + getUserLevel();
    } else if (p) {
      p.style.display = 'none';
    }
  }

  var scheduled = false;
  function schedule(){
    if (scheduled) return;
    scheduled = true;
    setTimeout(function(){ scheduled = false; ensurePanel(); }, 350);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ensurePanel);
  else ensurePanel();
  setInterval(ensurePanel, 1200);
  try { new MutationObserver(schedule).observe(document.documentElement, { childList:true, subtree:true, characterData:true }); } catch(e) {}
})();
