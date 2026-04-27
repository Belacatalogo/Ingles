// Fluency Service Worker — offline cache
const CACHE = "fluency-v38-2-blocos-multikey-diagnostico";
const STATIC = [
  "./",
  "./index.html",
  "./bundle.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./azure-pronunciation.js",
  "./azure-pronunciation-core.js",
  "./shadowing-ai.js",
  "./grammar-pro.js",
  "./audio-volume-guard.js",
  "./lesson-enhancer.js"
];

const BUNDLE_BOOTSTRAP = `
;(function(){
  "use strict";
  function esc(s){ return String(s || "").replace(/&/g,"&amp;").replace(/"/g,"&quot;"); }
  function writeScript(src){ document.write('<script src="' + esc(src) + '"><\\/script>'); }
  function appendScript(src, cb){
    var s = document.createElement('script');
    s.src = src;
    s.onload = function(){ cb && cb(); };
    s.onerror = function(){ cb && cb(); };
    document.head.appendChild(s);
  }
  var selfScript = document.currentScript;
  var original = selfScript && selfScript.src ? new URL(selfScript.src, location.href) : new URL('bundle.js', location.href);
  original.searchParams.set('__orig', '1');
  original.searchParams.set('__swfix', 'v38-2');
  var originalSrc = original.href;
  var enhancerSrc = new URL('lesson-enhancer.js?v=38-2', location.href).href;
  var deps = [];
  if (!window.React) deps.push('https://unpkg.com/react@18/umd/react.production.min.js');
  if (!window.ReactDOM || typeof window.ReactDOM.createRoot !== 'function') deps.push('https://unpkg.com/react-dom@18/umd/react-dom.production.min.js');
  if (!window.lucide) deps.push('https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js');
  if (document.readyState === 'loading') {
    deps.forEach(writeScript);
    writeScript(enhancerSrc);
    writeScript(originalSrc);
    return;
  }
  (function next(i){
    if (i >= deps.length) return appendScript(enhancerSrc, function(){ appendScript(originalSrc); });
    appendScript(deps[i], function(){ next(i + 1); });
  })(0);
})();
`;

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(STATIC))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", e => {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);

  if (url.pathname.endsWith("/bundle.js") && !url.searchParams.has("__orig")) {
    e.respondWith(new Response(BUNDLE_BOOTSTRAP, {
      status: 200,
      headers: {
        "Content-Type": "application/javascript; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate"
      }
    }));
    return;
  }

  const isAppAsset = url.pathname.endsWith('.html') ||
                     url.pathname.endsWith('.js') ||
                     url.pathname.endsWith('.css') ||
                     url.pathname.endsWith('/');
  if (isAppAsset) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res.ok && e.request.method === "GET") {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }
  if (url.hostname.includes("googleapis") || url.hostname.includes("gstatic") || url.hostname.includes("fonts") || url.hostname.includes("unpkg.com")) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => {
      const network = fetch(e.request).then(res => {
        if (res.ok && e.request.method === "GET") {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
