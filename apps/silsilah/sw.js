const CACHE='silsilah-pwa-v15';
const ASSETS=['./','./index.html','./manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(url.href.includes('raw.githubusercontent.com')||url.href.includes('api.github.com')){
    e.respondWith(fetch(e.request).then(r=>{const clone=r.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));return r;}).catch(()=>caches.match(e.request)));
    return;
  }
  if(url.hostname.includes('cdn.jsdelivr.net')||url.hostname.includes('cdnjs.cloudflare.com')||url.hostname.includes('fonts.googleapis.com')){
    e.respondWith(caches.match(e.request).then(cached=>{const fp=fetch(e.request).then(net=>{caches.open(CACHE).then(c=>c.put(e.request,net.clone()));return net;}).catch(()=>cached);return cached||fp;}));
    return;
  }
  e.respondWith(caches.match(e.request).then(cached=>{if(cached) return cached;return fetch(e.request).then(res=>{if(res.ok&&e.request.method==='GET'&&url.origin===self.location.origin){const clone=res.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));}return res;}).catch(()=>caches.match('./index.html'));}));
});
