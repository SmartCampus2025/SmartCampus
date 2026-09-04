// backend/ai/offlineSync/offlineWorker.js
// Service Worker for offline support

if (typeof self !== 'undefined' && self.addEventListener) {
  self.addEventListener("install", event => {
    event.waitUntil(
      caches.open("smartcampus-cache").then(cache => {
        return cache.addAll(["/", "/index.html", "/styles.css", "/app.js"]);
      })
    );
  });

  self.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
}

module.exports = {
  cacheName: 'smartcampus-cache'
};
