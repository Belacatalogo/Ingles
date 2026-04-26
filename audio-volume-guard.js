/* ============================================================================
 * Fluency – Audio Volume Guard
 * Corrige áudios baixos gerados por IA quando possível.
 * Estratégia:
 * - força audio.volume = 1;
 * - remove mute;
 * - tenta tocar via WebAudio com ganho automático quando o áudio vem baixo.
 * Não altera bundle.js.
 * ========================================================================== */
(function(){
  'use strict';
  if (window.__fluencyAudioGuard_v2) return;
  window.__fluencyAudioGuard_v2 = true;

  var ctx = null;
  var patched = new WeakSet();
  var normalizing = new WeakSet();
  var objectUrls = [];

  function getCtx(){
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      if (!ctx) {
        try { if (typeof window.__sharedAudioCtx === 'function') ctx = window.__sharedAudioCtx(); } catch(e) {}
        if (!ctx) ctx = new Ctx();
      }
      if (ctx.state === 'suspended') { try { ctx.resume(); } catch(e) {} }
      return ctx;
    } catch(e) { return null; }
  }

  function isMedia(el){
    try { return el && (el.tagName === 'AUDIO' || el.tagName === 'VIDEO'); }
    catch(e) { return false; }
  }

  function isLikelyRealGeneratedAudio(el){
    try {
      var src = String(el.currentSrc || el.src || '');
      if (!src) return false;
      if (src.indexOf('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA') === 0) return false;
      return src.indexOf('data:audio') === 0 || src.indexOf('blob:') === 0 || /\.mp3|\.wav|\.m4a|\.ogg|\.webm/i.test(src);
    } catch(e) { return false; }
  }

  function ensureVolume(el){
    try {
      if (!isMedia(el)) return;
      el.muted = false;
      el.defaultMuted = false;
      el.volume = 1;
      if (el.playbackRate <= 0) el.playbackRate = 1;
      if (el.preservesPitch !== undefined) el.preservesPitch = true;
      if (el.webkitPreservesPitch !== undefined) el.webkitPreservesPitch = true;
    } catch(e) {}
  }

  async function fetchAudioArrayBuffer(el){
    var src = String(el.currentSrc || el.src || '');
    if (!src) return null;
    if (src.indexOf('data:audio') === 0) {
      var comma = src.indexOf(',');
      if (comma < 0) return null;
      var meta = src.slice(0, comma);
      var payload = src.slice(comma + 1);
      if (/;base64/i.test(meta)) {
        var bin = atob(payload);
        var u8 = new Uint8Array(bin.length);
        for (var i=0;i<bin.length;i++) u8[i] = bin.charCodeAt(i);
        return u8.buffer;
      }
      return new TextEncoder().encode(decodeURIComponent(payload)).buffer;
    }
    var res = await fetch(src);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  }

  function analyzePeak(buffer){
    try {
      var peak = 0;
      var rms = 0;
      var count = 0;
      for (var ch=0; ch<buffer.numberOfChannels; ch++) {
        var data = buffer.getChannelData(ch);
        var step = Math.max(1, Math.floor(data.length / 40000));
        for (var i=0; i<data.length; i+=step) {
          var v = Math.abs(data[i]);
          if (v > peak) peak = v;
          rms += v * v;
          count++;
        }
      }
      rms = count ? Math.sqrt(rms / count) : 0;
      return { peak: peak, rms: rms };
    } catch(e) { return { peak: 1, rms: 1 }; }
  }

  async function normalizedPlay(el){
    if (!isLikelyRealGeneratedAudio(el)) return false;
    if (normalizing.has(el)) return false;
    var audioCtx = getCtx();
    if (!audioCtx) return false;
    normalizing.add(el);
    try {
      var ab = await fetchAudioArrayBuffer(el);
      if (!ab) return false;
      var decoded = await audioCtx.decodeAudioData(ab.slice(0));
      var stats = analyzePeak(decoded);
      // Se já está forte, deixa o player normal tocar.
      if (stats.peak >= 0.55 || stats.rms >= 0.12) return false;

      var src = audioCtx.createBufferSource();
      src.buffer = decoded;
      var gain = audioCtx.createGain();
      // Normaliza para pico ~0.9, com limite para não distorcer demais.
      var target = 0.92;
      var computed = stats.peak > 0.001 ? (target / stats.peak) : 2.2;
      gain.gain.value = Math.max(1.15, Math.min(4.0, computed));
      src.connect(gain);
      gain.connect(audioCtx.destination);
      src.start(0);
      try { el.pause(); } catch(e) {}
      return true;
    } catch(e) {
      return false;
    } finally {
      setTimeout(function(){ try { normalizing.delete(el); } catch(e) {} }, 500);
    }
  }

  function patchPlay(){
    try {
      var proto = window.HTMLMediaElement && window.HTMLMediaElement.prototype;
      if (!proto || proto.__fluencyPlayPatchedV2) return;
      var originalPlay = proto.play;
      proto.play = function(){
        var el = this;
        ensureVolume(el);
        if (isLikelyRealGeneratedAudio(el)) {
          normalizedPlay(el).then(function(handled){
            if (!handled) {
              try { ensureVolume(el); } catch(e) {}
            }
          });
        }
        return originalPlay.apply(el, arguments);
      };
      proto.__fluencyPlayPatchedV2 = true;
    } catch(e) {}
  }

  function patchAudioConstructor(){
    try {
      var OriginalAudio = window.Audio;
      if (!OriginalAudio || OriginalAudio.__fluencyAudioCtorPatched) return;
      function PatchedAudio(){
        var a = arguments.length ? new OriginalAudio(arguments[0]) : new OriginalAudio();
        ensureVolume(a);
        setTimeout(function(){ ensureVolume(a); }, 0);
        return a;
      }
      PatchedAudio.prototype = OriginalAudio.prototype;
      PatchedAudio.__fluencyAudioCtorPatched = true;
      window.Audio = PatchedAudio;
    } catch(e) {}
  }

  function scan(){
    try {
      Array.prototype.forEach.call(document.querySelectorAll('audio,video'), ensureVolume);
      if (window.__sharedHTMLAudio) ensureVolume(window.__sharedHTMLAudio);
    } catch(e) {}
  }

  window.__ensureFluencyAudioVolume = function(el){ ensureVolume(el); };

  patchPlay();
  patchAudioConstructor();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan);
  else scan();
  setInterval(scan, 1500);
  try { new MutationObserver(scan).observe(document.documentElement, { childList:true, subtree:true, attributes:true, attributeFilter:['src'] }); } catch(e) {}
})();
