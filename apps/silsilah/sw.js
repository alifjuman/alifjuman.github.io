// Tentukan basis jalur sesuai lokasi aplikasi Anda
const BASE_PATH = '/apps/silsilah/';
const CACHE_NAME = 'silsilah-cache-v1';

// Daftar file yang akan di-cache (pastikan file-file ini ada di dalam folder /apps/silsilah/)
const urlsToCache = [
  BASE_PATH,
  BASE_PATH + 'index.html',
  BASE_PATH + 'manifest.json',
  // Tambahkan file CSS, JS, atau aset lain yang Anda miliki, contoh:
  // BASE_PATH + 'style.css',
  // BASE_PATH + 'script.js',
  // BASE_PATH + 'data/silsilah2023.ged' // Jika ingin file Gedcom tersedia offline
];

// Event: Install - Meng-cache file
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Membuka cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event: Fetch - Menyajikan file dari cache jika offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika ada di cache, kembalikan dari cache
        if (response) {
          return response;
        }
        // Jika tidak, ambil dari jaringan
        return fetch(event.request);
      }
    )
  );
});

// Event: Activate - Membersihkan cache lama
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
