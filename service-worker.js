const CACHE_NAME = "saferide-cache-v4";

const urlsToCache = [
  "https://saferide25.free.nf/",
  "https://saferide25.free.nf/assets/css/saferide-style.css",
  "https://saferide25.free.nf/assets/icons/icon-192-v4.png",
  "https://saferide25.free.nf/assets/icons/icon-512-v4.png"
];

// Install - cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Fetch - serve from cache if available
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// Activate - remove old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});
