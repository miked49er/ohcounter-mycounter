var CACHE_NAME = 'ohcounterCashe';
// baseURL is used to switch between hosting structures.
// Set to null ('') for regular hosting
// Set to directory inside Github Pages
var baseURL = '/ohcounter-mycounter/';
var urlsToCache = [
  baseURL + 'index.html',
  baseURL + '/css/styles.css',
  baseURL + '/css/fonts/Marvel/Marvel-Regular.ttf',
  baseURL + '/css/fonts/Marvel/Marvel-Regular.woff',
  baseURL + '/css/fonts/Marvel/Marvel-Regular.woff2',
  baseURL + '/css/fonts/Marvel/OFL.txt',
  baseURL + '/css/fonts/Exo_2/Exo2-Bold.tff',
  baseURL + '/css/fonts/Exo_2/Exo2-Bold.woff',
  baseURL + '/css/fonts/Exo_2/Exo2-Bold.woff2',
  baseURL + '/css/fonts/Exo_2/Exo2-Thin.tff',
  baseURL + '/css/fonts/Exo_2/Exo2-Thin.woff',
  baseURL + '/css/fonts/Exo_2/Exo2-Thin.woff2',
  baseURL + '/js/script.min.js',
  baseURL + '/images/dice/Coin.svg',
  baseURL + '/images/dice/d4.svg',
  baseURL + '/images/dice/d6.svg',
  baseURL + '/images/dice/d8.svg',
  baseURL + '/images/dice/d10.svg',
  baseURL + '/images/dice/d12.svg',
  baseURL + '/images/dice/d20.svg',
  baseURL + '/lib/json/game-list.json',
  baseURL + '/lib/json/template.json',
  baseURL + '/template/dice.html',
  baseURL + '/template/fab.html',
  baseURL + '/template/game-select.html',
  baseURL + '/template/num-player-select.html',

];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

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
