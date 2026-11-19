// Actogrow service worker: cache the app shell so it works offline.
const CACHE = "actogrow-v1";
const SHELL = [
  "./", "index.html", "style.css", "app.js", "data/mantras.js", "privacy.html",
  "manifest.webmanifest", "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png"
];

// Cloudflare serves page.html as /page (a redirect). Browsers refuse a redirected response
// for navigations from cache, so store a clean copy.
async function unredirect(response) {
  if (!response.redirected) return response;
  return new Response(await response.blob(), {
    status: response.status, statusText: response.statusText, headers: response.headers
  });
}
// /privacy -> /privacy.html, / -> /index.html
function prettyToHtml(href) {
  const u = new URL(href);
  u.search = "";
  if (u.pathname.endsWith("/")) u.pathname += "index.html";
  else if (!/\.[a-z0-9]+$/i.test(u.pathname)) u.pathname += ".html";
  return u.href;
}

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    for (const path of SHELL) {
      try {
        const r = await fetch(path, { cache: "no-cache" });
        if (r.ok) await c.put(path, await unredirect(r));
      } catch (err) { /* skip a file that failed; the rest still caches */ }
    }
    self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const hit = await c.match(req) || (req.mode === "navigate" && await c.match(prettyToHtml(req.url)));
    if (hit) {
      // refresh in the background so the next launch gets updates
      fetch(req).then(async r => { if (r.ok) await c.put(req, await unredirect(r)); }).catch(() => {});
      return hit;
    }
    try {
      const r = await fetch(req);
      if (r.ok) await c.put(req, await unredirect(r.clone()));
      return r;
    } catch (err) {
      return (await c.match("index.html")) || Response.error();
    }
  })());
});
