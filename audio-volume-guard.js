/* ============================================================================
 * Fluency – Audio Volume Guard
 * Tenta evitar áudio baixo no iOS/PWA e em áudios gerados por IA.
 * Não altera bundle.js.
 * ========================================================================== */
(function(){
  'use strict';
  if (window.__fluencyAudioGuard_v1) return;
  window.__fluencyAudioGuard_v1 = true;

  var mediaGainMap = new WeakMap();

  function isRealAudio(el){
    try { return el && (el.tagName === 'AUDIO' || el.tagName === 'VIDEO'); }
    catch(e) { return false; }
  }

  function ensureVolume(el){
    try {
      if (!isRealAudio(el)) return;
      el.muted = false;
      el.defaultMuted = false;
      el.volume = 1;
      el.playbackRate = el.playbackRate || 1;
      if (el.preservesPitch !== undefined) el.preservesPitch = true;
      if (el.webkitPreservesPitch !== undefined) el.webkitPreservesPitch = true;
    } catch(e) {}
  }

  function attachGain(el){
    try {
      if (!isRealAudio(el) || mediaGainMap.has(el)) return;
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      var ctx = null;
      try { if (typeof window.__sharedAudioCtx === 'function') ctx = window.__sharedAudioCtx(); } catch(e) {}
      if (!ctx) ctx = new Ctx();
      if (ctx.state === 'suspended') { try { ctx.resume(); } catch(e) {} }

      var source = ctx.createMediaElementSource(el);
      var gain = ctx.createGain();
      gain.gain.value = 1.35;
      source.connect(gain);
      gain.connect(ctx.destination);
      mediaGainMap.set(el, { ctx: ctx, source: source, gain: gain });
    } catch(e) {}
  }

  window.__ensureFluencyAudioVolume = function(el){
    ensureVolume(el);
    attachGain(el);
  };

  function patchPlay(){
    try {
      var proto = window.HTMLMediaElement && window.HTMLMediaElement.prototype;
      if (!proto || proto.__fluencyPlayPatched) return;
      var originalPlay = proto.play;
      proto.play = function(){
        try { ensureVolume(this); attachGain(this); } catch(e) {}
        return originalPlay.apply(this, arguments);
      };
      proto.__fluencyPlayPatched = true;
    } catch(e) {}
  }

  function scan(){
    try {
      Array.prototype.forEach.call(document.querySelectorAll('audio,video'), function(el){ ensureVolume(el); });
      if (window.__sharedHTMLAudio) ensureVolume(window.__sharedHTMLAudio);
    } catch(e) {}
  }

  patchPlay();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan);
  else scan();
  setInterval(scan, 2000);
  try { new MutationObserver(function(){ scan(); }).observe(document.documentElement, { childList:true, subtree:true }); } catch(e) {}
})();
