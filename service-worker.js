self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('irc-cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/script.js',
        '/manifest.json',
        '/assets/img/logo.png',
        '/assets/data/duas.json',
        '/assets/data/prayer-times.json'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
