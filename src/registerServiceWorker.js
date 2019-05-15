/* eslint-disable no-console */
// import { register } from 'register-service-worker'

const updated = () => {
  window.location.reload(true)
}

const register = async (path) => {
  const registration = await navigator.serviceWorker.register(path)
  console.log('SW registred!')

  const cacheList = await caches.keys()
  cacheList.forEach(async (cacheName) => {
    if (!cacheName.includes('-temp')) return

    const tempCache = await caches.open(cacheName)
    const tempCachesKeys = await tempCache.keys()
    if (tempCachesKeys.length > 0) {
      updated()
    }
  })

  registration.onupdatefound = () => updated()
}

const {
  NODE_ENV,
  BASE_URL
} = process.env

if (NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    register(`${BASE_URL}service-worker.js`)
  }
}
