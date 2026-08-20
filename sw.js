const CACHE_NAME = 'c2-learning-shell-v1';
const APP_SHELL = ['./', './index.html', './investment_glossary.html', './manifest-c2-learning.webmanifest', './manifest-investment-glossary.webmanifest', './icons/c2-learning-192.png', './icons/c2-learning-512.png', './icons/investment-glossary-192.png', './icons/investment-glossary-512.png'];
self.addEventListener('install', (event) => event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', (event) => event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith('c2-learning-') && key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(request).then((cached) => cached || fetch(request)));
});
