const static = "webslides-pwa"
const assets = [
  "/index.html",
  "/python-list.html",
  "/bert.html",
  "main.css",
  "main.js"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(static).then(cache => {
      cache.addAll(assets)
    })
  )
})


self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})