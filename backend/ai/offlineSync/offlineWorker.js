// ai/offlineSync/offlineWorker.js
// Service Worker for offline support

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("smartcampus-cache").then(cache => {
      return cache.addAll(["/", "/index.html", "/styles.css", "/app.js"]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
