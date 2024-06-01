let CACHE_STATIC_NAME = 'cache-v1';
let CACHE_DYNAMIC_NAME = 'dynamic-v1';

// Instalando o Service Worker, abrindo o cache e inserindo arquivos CSS
self.addEventListener('install', function (event) {
    console.log("Instalando o Service Worker...");
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then(function (cache) {
                console.log("Abrindo o cache e inserindo arquivos CSS...");
                cache.addAll({
                    'offline.html', // Adicionando a página offline
                    'style.css',
                    '/styles/login-form.css',
                    '/styles/pokemon-form.css',
                    '/styles/register-form.css',
                    '/styles/pokemon-list.css',
                    '/styles/navbar.css',
                })
        })
    )
})

// Ativando o Service Worker
self.addEventListener('activate', function (event) {
    console.log("Ativando o Service Worker...");
    event.waitUntil(
        caches.keys()
            .then(function (keys) {
                return Promise.all(
                    keys.map(function (key) {
                        if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
                            console.log("Removendo cache antigo...");
                            return caches.delete(key);
                        }
                    })
                )
            })
    )
})

// Interceptando requisições
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response && response !== 'undefined') {
                    return response;
                } else {
                    return fetch(event.request)
                        .then(function (res) {
                            return caches.open(CACHE_DYNAMIC_NAME)
                                .then(function (cache) {
                                    cache.put(event.request.url, res.clone());
                                    return res;
                                })
                        })
                        .catch(function (err) {
                            return caches.open(CACHE_STATIC_NAME)
                                .then(function (cache) {
                                    return cache.match('offline.html');
                                })
                        })
                }
            })
    )
})

