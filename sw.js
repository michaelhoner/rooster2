var CACHE_NAME = 'rooster2-cache-v2.1';
var urlsToCache = [
  '/',
  '/rooster2/',
  '/rooster2/index.html',
  '/rooster2/ploeg2.html',
  '/rooster2/ploeg3.html',
  '/rooster2/ploeg4.html',
  '/rooster2/index.js',
  '/rooster2/css/style.css',
  '/rooster2/img/rooster-solid.svg',
  '/rooster2/js/highlightDay.js'
];

self.addEventListener('install', function (event) {
  // Perform install steps
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

  // Cache and return requests
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

  // Update service worker
self.addEventListener('activate', function(event) {

  var cacheWhitelist = 'rooster2-cache-v2.1';

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
