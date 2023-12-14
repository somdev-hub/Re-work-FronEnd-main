
//STORAGE OF BROWSER
const CACHE_NAME = "Rework";
const urlsToCache = ["index.html", "offline.html"];
const self = this;

//installation
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

// listen for request
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

// actitivate the service worker
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});



// let cacheData = "Rework";
// this.addEventListener("install", (event) => {
//     event.waitUntil(
//         caches.open(cacheData).then( (cache) => {
//              cache.addAll([   "/",
//     '/static/js/bundle.js',
//                 "/ws",
//                 "/static/media/headerImg.1c42f170e852473f77e7.png",
//                 "/static/media/heroImg.c120f73b5a4b6bd5628f.png",
//                 "/static/media/heroImg2.a42f2dcd0e0d8693f228.png",
//                 "/static/media/appleStore.e993ac0325da5304f808.jpg",
//                 "/static/media/arrowTopRight.9b6f9c05f6b1d3ee40fd.png",
//                 // "/privacypolicy",
//                 // "/termsandconditions",
//                 // "/cookies",
//                 // "/dataprotection",
//                 // "/about",
//                 // "/career",
//                 // '/register',
//                 // '/login',
//                 '/index.html',
              
//             ])
//         })
//     )
// })
// this.addEventListener("fetch", (event) => {


//     // console.warn("url",event.request.url)


//     if (!navigator.onLine) {
//         if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
//             event.waitUntil(
//                 this.registration.showNotification("Internet", {
//                     body: "internet not working",
//                 })
//             )
//         }
//         event.respondWith(
//             caches.match(event.request).then((resp) => {
//                 if (resp) {
//                     return resp
//                 }
//                 let requestUrl = event.request.clone();
//                return fetch(requestUrl)
//             })
//         )
//     }
// }) 