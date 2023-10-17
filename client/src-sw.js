// imports for the service worker
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

//precaching data
precacheAndRoute(self.__WB_MANIFEST);

//caching the page
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    //caching the response code
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
        //expires in 2.592 million seconds or 30days
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});


registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// asset caching
registerRoute(
    ({ request }) =>
      ["style", "script", "worker", "image"].includes(request.destination),
    new CacheFirst({
      cacheName: "asset-cache",
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new ExpirationPlugin({
          maxEntries: 60,
          // expires in 30 days
          maxAgeSeconds: 30 * 24 * 60 * 60, 
        }),
      ],
    })
  );
//call back for register route
registerRoute();
