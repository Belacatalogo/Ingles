// Fluency Service Worker — offline cache
const CACHE = "fluency-v29";
const STATIC = ["./", "./index.html", "./bundle.js", "./manifest.json", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png", "./azure-pronunciation.js"];

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

// Permitir que o cliente force ativação imediata
self.addEventListener("message", e => {
  if (e.data && e.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);

  // Para HTML, JS e CSS: SEMPRE network-first (evita servir versão velha do bundle)
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

  if (url.hostname.includes("googleapis") || url.hostname.includes("gstatic") || url.hostname.includes("fonts")) {
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
