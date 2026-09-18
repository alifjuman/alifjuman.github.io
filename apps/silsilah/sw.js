
const CACHE='silsilah-v13-1';
const ASSETS=[
  './silsilah-reader-v13-pwa.html',
  './manifest.json'
];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(url.pathname.includes('silsilah2023.ged') || url.hostname.includes('api.github.com')){
    // network first for GEDCOM & GitHub API
    e.respondWith(fetch(e.request).then(r=>{ const clone=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,clone)); return r; }).catch(()=>caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(cached=> cached || fetch(e.request).then(r=>{ const clone=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,clone)); return r; }).catch(()=>cached)));
});
