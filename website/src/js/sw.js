self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/index.html',
        '/styles.css',
        '/script.js',
        '/image.png'
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

// Register the Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
  .then(() => console.log('Service Worker registered'))
  .catch(error => console.error('Service Worker registration failed', error));
}
