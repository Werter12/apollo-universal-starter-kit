/*global self*/
/*eslint no-undef: "error"*/
/* eslint-disable */

const CACHE_VERSION = 2;
const CACHE_PREFIX = `FEG-v${CACHE_VERSION}`;
const ASSET_MANIFEST_URL = 'assets.json';

const ALL_CACHES = {
  fallbackImages: cacheName('FALLBACK_IMAGES'),
  prefetch: cacheName('PREFETCH'),
  fallback: cacheName('FALLBACK')
};

function cacheName(name) {
  return `${CACHE_PREFIX}-${name}`;
}

const ALL_CACHES_LIST = Object.keys(ALL_CACHES).map(k => ALL_CACHES[k]);

function precacheStaticAssets() {
  return fetch(ASSET_MANIFEST_URL)
    .then(response => response.json())
    .then(val => {
      console.log('response1', val);
      return val;
    })
    .then(values =>
      Object.keys(values)
        .filter(_shouldPrecacheFile)
        .map(fileKey => values[fileKey])
    )
    .then(assetManifest => {
      console.log('assetManifest', assetManifest);
      assetManifest.push('/vendor_web_05571d3fb75dd032bb1e_dll.js');
      assetManifest.push('/');
      caches.open(ALL_CACHES.prefetch).then(cache => {
        cache.addAll(assetManifest);
      });
    });
}

function _shouldPrecacheFile(fileName) {
  for (let i = 0; i < RESOURCES_TO_PRECACHE.length; i++) if (RESOURCES_TO_PRECACHE[i].test(fileName)) return true;
  return false;
}

const RESOURCES_TO_PRECACHE = [/^index\.js$/, /^vendor\.js/, /^img\/[\w0-9\-_]+.(png|jpg|gif|bmp)$/];

function removeUnusedCaches(cacheNamesToKeep) {
  return caches.keys().then(cacheNames => {
    let toDelete = cacheNames.reduce((list, thisCache) => {
      if (cacheNamesToKeep.indexOf(thisCache) === -1) return list.concat(thisCache);
      return list;
    }, []);
    if (toDelete.length > 0) {
      console.log('SW: Deleting old caches', toDelete);
      return Promise.all(toDelete.map(c => caches.delete(c)));
    } else {
      return Promise.resolve();
    }
  });
}
self.addEventListener('install', function(event) {
  console.log('install');

  event.waitUntil(precacheStaticAssets());
});

self.addEventListener('activate', function(event) {
  console.log('activate');
  event.waitUntil(removeUnusedCaches(ALL_CACHES.prefetch));
});

self.addEventListener('fetch', function(event) {
  const BASE_URL = 'http://localhost:3000';
  console.log('event', event);
  if (event.request.method === 'GET' && event.request.headers.get('accept').indexOf('text/html') !== -1) {
    console.log('I am here', event.request);
    event.respondWith(
      fetch(event.request).catch(function(e) {
        return caches.open(ALL_CACHES.prefetch).then(function(cache) {
          return cache.match('/');
        });
      })
    );
  } else if (RegExp('.js', 'g').test(event.request.url)) {
    const val = event.request.url.replace(/http:\/\/localhost:3000/gi, '');
    console.log('yeaaaaaaa', event.request, val);
    event.respondWith(
      fetch(event.request).catch(function(e) {
        return caches.open(ALL_CACHES.prefetch).then(function(cache) {
          return cache.match(val);
        });
      })
    );
  }
});
