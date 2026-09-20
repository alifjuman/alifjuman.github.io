const CACHE='silsilah-v15-fix404-2';
const ASSETS=[
  './',
  './index.html',
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
  // GEDCOM & GitHub API = network first
  if(url.pathname.includes('silsilah2023.ged') || url.hostname.includes('api.github.com') || url.hostname.includes('raw.githubusercontent.com')){
    e.respondWith(
      fetch(e.request).then(r=>{
        const clone=r.clone();
        caches.open(CACHE).then(c=>c.put(e.request, clone));
        return r;
      }).catch(()=>caches.match(e.request))
    );
    return;
  }
  // App shell = cache first, fallback to network
  e.respondWith(
    caches.match(e.request).then(cached=>{
      if(cached) return cached;
      return fetch(e.request).then(r=>{
        // cache new assets
        if(r.ok && e.request.method==='GET' && url.origin===self.location.origin){
          const clone=r.clone();
          caches.open(CACHE).then(c=>c.put(e.request, clone));
        }
        return r;
      }).catch(()=>{
        // If offline and navigating, return index.html
        if(e.request.mode==='navigate'){
          return caches.match('./index.html');
        }
      });
    })
  );
});
