const CACHE_NAME = 'qr-code-generator-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css', // Add any other static files you want to cache
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
            .catch(() => {
                return caches.match('/offline.html');
            })
    );
});
