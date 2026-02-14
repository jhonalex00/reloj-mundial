const CACHE_NAME = "reloj-mundial-v2";

const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",

  "./js/pwa.js",
  "./js/reloj.js",
  "./js/ciudades.js",
  "./js/clima.js",

  // ✅ RUTAS CORRECTAS (según tu CSS/HTML)
  "./img/logo.png",
  "./img/icon-192.png",
  "./img/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // ✅ si falla alguno, no rompe toda la instalación
    await Promise.allSettled(ASSETS.map((a) => cache.add(a)));
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)));
    self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;

    try {
      const fresh = await fetch(event.request);
      return fresh;
    } catch {
      return caches.match("./index.html");
    }
  })());
});
