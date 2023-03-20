const CACHE_NAME = 'v2';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                '/apps/1RM/index.html',
                '/apps/1RM/script.js',
                '/apps/1RM/weightlifting.png']);
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
      // Enable navigation preload if it's supported.
      // See https://developers.google.com/web/updates/2017/02/navigation-preload
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
  })());

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith((async () => {
    try {
      const preloadResponse = await event.preloadResponse;
      if (preloadResponse) {
        return preloadResponse;
      }

      // Always try the network first.
      return await fetch(event.request);
    } catch (e) {
      console.log("Fetch failed; returning offline page instead.", error);

      const cache = await caches.open(CACHE_NAME);
      return await cache.match(event.request);
    }
  })());
});
