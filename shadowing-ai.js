/* ============================================================================
 * Fluency – Shadowing AI Inline Enhancer
 * Adiciona apenas um botão dentro da subaba Shadowing.
 * Ao gerar, coloca a frase direto na caixa principal do Shadowing.
 * Não exibe painel/caixa flutuante.
 * ========================================================================== */
(function(){
  'use strict';
  if (window.__fluencyShadowingAI_inline_v1) return;
  window.__fluencyShadowingAI_inline_v1 = true;

  var BTN_ID = '__shadowing_ai_inline_btn__';
  var WRAP_ID = '__shadowing_ai_inline_wrap__';

  function norm(s){ return String(s || '').replace(/\s+/g,' ').trim().toLowerCase(); }
  function getGeminiKey(){ try { return localStorage.getItem('fluency_geminiKey') || ''; } catch(e) { return ''; } }

  function getUserLevel(){
    var keys = ['fluency_level','fluency_user_level','userLevel','level','currentLevel','__fluency_level__','fluency_cefr_level'];
    for (var i=0;i<keys.length;i++) {
      try {
        var v = localStorage.getItem(keys[i]);
        var m = v && String(v).match(/A1|A2|B1|B2|C1|C2/i);
        if (m) return m[0].toUpperCase();
      } catch(e) {}
    }
    try {
      var all = JSON.stringify(localStorage);
      var mm = all.match(/\b(A1|A2|B1|B2|C1|C2)\b/i);
      if (mm) return mm[1].toUpperCase();
    } catch(e) {}
    return 'A2';
  }

  function isShadowingScreen(){
    var txt = norm(document.body && document.body.innerText || '');
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
      el.__t = setTimeout(function(){ el.style.opacity = '0'; }, 2600);
    } catch(e) {}
  }

  function speak(text){
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 0.86;
      var voices = window.speechSynthesis.getVoices() || [];
      var v = voices.find(function(x){ return /en-US/i.test(x.lang) && /Samantha|Google|Microsoft|Natural|Jenny|Aria/i.test(x.name); }) ||
              voices.find(function(x){ return /en-US/i.test(x.lang); }) ||
              voices.find(function(x){ return /^en/i.test(x.lang); });
      if (v) u.voice = v;
      window.speechSynthesis.speak(u);
    } catch(e) {}
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
    if (!key) return { sentence: fallbackSentence(level), level: level, offline: true };

    var prompt = 'Você é professor de inglês para brasileiro. Gere UMA frase em inglês para treino de shadowing no nível ' + level + '. Responda somente JSON válido: {"sentence":"..."}. A frase deve ser natural, útil, curta para repetir e adequada ao nível.';
    var models = ['gemini-2.0-flash','gemini-2.5-flash','gemini-1.5-flash-latest'];
    for (var i=0;i<models.length;i++) {
      try {
        var res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + models[i] + ':generateContent?key=' + encodeURIComponent(key), {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 160, responseMimeType: 'application/json' } })
        });
        if (!res.ok) continue;
        var j = await res.json();
        var text = (((j.candidates || [])[0] || {}).content || {}).parts || [];
        text = text.map(function(p){ return p.text || ''; }).join('').trim();
        var si = text.indexOf('{'), ei = text.lastIndexOf('}');
        if (si >= 0 && ei >= 0) {
          var obj = JSON.parse(text.slice(si, ei + 1));
          if (obj && obj.sentence) { obj.level = level; return obj; }
        }
      } catch(e) {}
    }
    return { sentence: fallbackSentence(level), level: level, offline: true };
  }

  function visible(el){
    if (!el || (el.closest && el.closest('#' + WRAP_ID))) return false;
    var r = el.getBoundingClientRect();
    var st = window.getComputedStyle(el);
    return r.width > 60 && r.height > 22 && st.display !== 'none' && st.visibility !== 'hidden' && r.bottom > 0 && r.top < window.innerHeight;
  }

  function setNativeValue(el, value){
    try {
      var proto = el.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
      var desc = Object.getOwnPropertyDescriptor(proto, 'value');
      if (desc && desc.set) desc.set.call(el, value); else el.value = value;
      el.dispatchEvent(new Event('input', { bubbles:true }));
      el.dispatchEvent(new Event('change', { bubbles:true }));
      return true;
    } catch(e) {
      try { el.value = value; el.dispatchEvent(new Event('input', { bubbles:true })); return true; } catch(_) {}
    }
    return false;
  }

  function findShadowingField(){
    var fields = Array.prototype.slice.call(document.querySelectorAll('textarea, input[type="text"], input:not([type]), [contenteditable="true"]')).filter(visible);
    if (!fields.length) return null;
    fields.sort(function(a,b){
      var ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
      var scoreA = ra.width * ra.height;
      var scoreB = rb.width * rb.height;
      var textA = norm(a.value || a.textContent || a.getAttribute('placeholder') || '');
      var textB = norm(b.value || b.textContent || b.getAttribute('placeholder') || '');
      if (/i need|figure out|frase|shadowing|parágrafo|paragrafo/.test(textA)) scoreA += 100000;
      if (/i need|figure out|frase|shadowing|parágrafo|paragrafo/.test(textB)) scoreB += 100000;
      return scoreB - scoreA;
    });
    return fields[0];
  }

  function fillMainBox(sentence){
    var field = findShadowingField();
    if (!field) return false;
    if (field.isContentEditable) {
      field.focus();
      field.textContent = sentence;
      field.dispatchEvent(new InputEvent('input', { bubbles:true, inputType:'insertText', data:sentence }));
      field.dispatchEvent(new Event('change', { bubbles:true }));
      return true;
    }
    field.focus();
    return setNativeValue(field, sentence);
  }

  function findShadowingCard(){
    var field = findShadowingField();
    if (!field) return null;
    var el = field;
    for (var i=0; i<5 && el && el.parentElement; i++) {
      el = el.parentElement;
      var txt = norm(el.innerText || '');
      if (txt.indexOf('shadowing') !== -1 || txt.indexOf('escolha uma frase') !== -1 || txt.indexOf('primeiro ouça') !== -1 || txt.indexOf('primeiro ouca') !== -1) return el;
    }
    return field.parentElement || null;
  }

  function ensureButton(){
    var existing = document.getElementById(WRAP_ID);
    if (!isShadowingScreen()) {
      if (existing) existing.remove();
      return;
    }
    if (existing) return;

    var card = findShadowingCard();
    var field = findShadowingField();
    if (!card || !field) return;

    var wrap = document.createElement('div');
    wrap.id = WRAP_ID;
    wrap.style.cssText = 'margin:10px 0 12px 0;display:flex;gap:8px;align-items:center;';
    wrap.innerHTML = '<button id="' + BTN_ID + '" style="width:100%;background:linear-gradient(135deg,#5B9CF6,#A78BFA);color:white;border:0;border-radius:14px;padding:12px 14px;font-weight:800;font-size:14px;box-shadow:0 8px 22px rgba(91,156,246,.22);">Gerar frase para meu nível</button>';

    try { field.parentElement.insertBefore(wrap, field); }
    catch(e) { try { card.appendChild(wrap); } catch(_) { return; } }

    var btn = document.getElementById(BTN_ID);
    btn.onclick = async function(){
      var old = btn.textContent;
      btn.disabled = true;
      btn.style.opacity = '.72';
      btn.textContent = 'Gerando frase…';
      try {
        var obj = await generateSentence();
        var ok = fillMainBox(obj.sentence);
        if (ok) {
          toast('Frase colocada na caixa do Shadowing.');
          speak(obj.sentence);
        } else {
          toast('Gerei a frase, mas não consegui preencher a caixa automaticamente.');
        }
      } catch(e) {
        var level = getUserLevel();
        var sentence = fallbackSentence(level);
        fillMainBox(sentence);
        speak(sentence);
      } finally {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.textContent = old;
      }
    };
  }

  var scheduled = false;
  function schedule(){
    if (scheduled) return;
    scheduled = true;
    setTimeout(function(){ scheduled = false; ensureButton(); }, 350);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ensureButton);
  else ensureButton();
  setInterval(ensureButton, 1200);
  try { new MutationObserver(schedule).observe(document.documentElement, { childList:true, subtree:true, characterData:true }); } catch(e) {}
})();
