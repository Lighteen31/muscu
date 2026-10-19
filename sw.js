// Garde l'appli disponible hors connexion (salle sans réseau). Mise à jour en arrière-plan à chaque ouverture.
const C = 'muscu-v1';
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png'])).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url); const same = u.origin === location.origin;
  if (!same && !/(^|\.)(fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com)$/.test(u.hostname)) return;
  e.respondWith(caches.open(C).then(async c => {
    const hit = await c.match(r, { ignoreSearch: same });
    const net = fetch(r).then(res => { if (res && (res.ok || res.type === 'opaque')) c.put(r, res.clone()); return res; }).catch(() => hit || Response.error());
    return hit || net;
  }));
});
