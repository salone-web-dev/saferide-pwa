const CACHE_NAME = "saferide-cache-v4";

const urlsToCache = [
  "https://saferide25.free.nf/",
  "https://saferide25.free.nf/assets/css/saferide-style.css",
  "https://saferide25.free.nf/assets/icons/icon-192-v4.png",
  "https://saferide25.free.nf/assets/icons/icon-512-v4.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});


