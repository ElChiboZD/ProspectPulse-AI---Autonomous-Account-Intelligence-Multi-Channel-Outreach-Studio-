const CACHE_NAME = 'prospectpulse-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/mobile.css',
  '/js/mobile.js',
  '/data/presets.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

self.addEventListener('sync', (e) => {
  if (e.tag === 'sync-data') {
    // Background sync placeholder
    console.log('Syncing data in background...');
  }
});

self.addEventListener('push', (e) => {
  // Push notification placeholder
  const title = 'ProspectPulse AI';
  const options = {
    body: e.data ? e.data.text() : 'New update available!',
    icon: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' rx=\'22\' fill=\'%236366F1\'/%3E%3Ctext x=\'50\' y=\'68\' font-size=\'56\' text-anchor=\'middle\' fill=\'%23FFFFFF\'%3E%E2%9C%A6%3C/text%3E%3C/svg%3E'
  };
  e.waitUntil(self.registration.showNotification(title, options));
});
