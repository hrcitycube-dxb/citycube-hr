// CityCube Group HR — service worker.
// Keeps the app shell available offline. Pages and code are fetched fresh when online
// (so updates on GitHub reach everyone at once); images and the Firebase SDK come from cache.
// Bump VERSION whenever you change the list below.
const VERSION = 'cc-hr-v1';
const SHELL = [
  './', './index.html', './firebase-config.js', './manifest.webmanifest',
  './logos/citycube-mark.png', './logos/favicon.png', './logos/icon-192.png', './logos/apple-touch-icon.png',
  './logos/citycube-warehousing.png', './logos/citycube-general-trading.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const save = (req, res) => { if (res && res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return res; };

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const firebaseSdk = url.hostname === 'www.gstatic.com' && url.pathname.startsWith('/firebasejs/');
  const fonts = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';

  if (sameOrigin && /\.(png|jpe?g|webp|svg|ico)$/i.test(url.pathname)) {
    // Images: cache first.
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => save(req, res))));
  } else if (sameOrigin) {
    // Page, code, config: network first, fall back to cache when offline.
    e.respondWith(
      fetch(req).then(res => save(req, res))
        .catch(() => caches.match(req, { ignoreSearch: true }).then(hit => hit || caches.match('./index.html')))
    );
  } else if (firebaseSdk || fonts) {
    // Versioned libraries and fonts: cache first.
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => save(req, res))));
  }
  // Everything else (Firebase sign-in and database traffic) goes straight to the network.
});
