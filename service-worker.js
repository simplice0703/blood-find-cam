const CACHE_NAME = "blood-find-v1";

const FILES_TO_CACHE = [
  "/blood-find-cam/",
  "/blood-find-cam/index.html",
  "/blood-find-cam/manifest.webmanifest"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then(response => response || caches.match("/blood-find-cam/"))
    )
  );
});
