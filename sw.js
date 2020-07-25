/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-3c87d3c7b8c92c668f39.js"
  },
  {
    "url": "framework-919f782a53bf8ea78da5.js"
  },
  {
    "url": "1bfc9850-6d3c4bc9bc5a0bcc4bb2.js"
  },
  {
    "url": "app-83b35b2ec66f83086b16.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "78298b198ee8ce48a6825ec72ca0f3e5"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-112458cba6cabcf2ceb0.js"
  },
  {
    "url": "polyfill-a54e29c19962360d62ea.js"
  },
  {
    "url": "6f89bbd25ed84b02c1c782caf7174e918b7ab15f-ce3fc4490901927d2844.js"
  },
  {
    "url": "component---node-modules-gatsby-theme-code-notes-src-pages-404-tsx-0776de173bf2cb38972a.js"
  },
  {
    "url": "page-data/404/page-data.json",
    "revision": "9f7e23dffed634bade188874f7c02852"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "c784af372f835f1deeed889a365a447f"
  },
  {
    "url": "page-data/404.html/page-data.json",
    "revision": "097a0308fc1b1a1fc37e774650450f9f"
  },
  {
    "url": "component---node-modules-gatsby-theme-code-notes-src-templates-note-js-7dbd13607cb839e9181f.js"
  },
  {
    "url": "page-data/arroz_basmati/page-data.json",
    "revision": "1d885fffb87f3dbfb338968e326a3ac0"
  },
  {
    "url": "page-data/bonding/page-data.json",
    "revision": "9aeb04690305c559c58b24b32c8c6115"
  },
  {
    "url": "page-data/Ensalada griega/page-data.json",
    "revision": "14f513899dfbdc57caf7937e84c1b0d1"
  },
  {
    "url": "page-data/gazpacho/page-data.json",
    "revision": "cde4d1fd87e360dd029a94caae27cb7d"
  },
  {
    "url": "page-data/hamburguesa_lentejas/page-data.json",
    "revision": "a4733bcf115e49125da66cfe59827ba4"
  },
  {
    "url": "component---node-modules-gatsby-theme-code-notes-src-templates-notes-js-250cc0034516e24acb50.js"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "ec05f2c22b2bb29fb69f3bf8b85a3706"
  },
  {
    "url": "page-data/trenza/page-data.json",
    "revision": "28c1c99430e0de488ce3ac1bc16972bc"
  },
  {
    "url": "component---node-modules-gatsby-theme-code-notes-src-templates-tag-page-js-dc35fdbbb459f9e5d1ea.js"
  },
  {
    "url": "page-data/tag/linux/page-data.json",
    "revision": "b49b0ef70a89d119eee63151d453e504"
  },
  {
    "url": "page-data/tag/networks/page-data.json",
    "revision": "3f9ddd330f7d1e79d90794ba4bf19193"
  },
  {
    "url": "page-data/tag/posts/page-data.json",
    "revision": "6801d30fd8b3f849a463960bb07670cc"
  },
  {
    "url": "page-data/tag/recetas/page-data.json",
    "revision": "3f222eaed418357b601b3ce0e8bd3ceb"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "e8f7b3f1af7771354f5920b1d93e7ee4"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\page-data\/.*\/page-data\.json/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:.*\/page-data\/app-data\.json/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */
importScripts(`idb-keyval-3.2.0-iife.min.js`)

const { NavigationRoute } = workbox.routing

let lastNavigationRequest = null
let offlineShellEnabled = true

// prefer standard object syntax to support more browsers
const MessageAPI = {
  setPathResources: (event, { path, resources }) => {
    event.waitUntil(idbKeyval.set(`resources:${path}`, resources))
  },

  clearPathResources: event => {
    event.waitUntil(idbKeyval.clear())
  },

  enableOfflineShell: () => {
    offlineShellEnabled = true
  },

  disableOfflineShell: () => {
    offlineShellEnabled = false
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi: api } = event.data
  if (api) MessageAPI[api](event, event.data)
})

function handleAPIRequest({ event }) {
  const { pathname } = new URL(event.request.url)

  const params = pathname.match(/:(.+)/)[1]
  const data = {}

  if (params.includes(`=`)) {
    params.split(`&`).forEach(param => {
      const [key, val] = param.split(`=`)
      data[key] = val
    })
  } else {
    data.api = params
  }

  if (MessageAPI[data.api] !== undefined) {
    MessageAPI[data.api]()
  }

  if (!data.redirect) {
    return new Response()
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: lastNavigationRequest,
    },
  })
}

const navigationRoute = new NavigationRoute(async ({ event }) => {
  // handle API requests separately to normal navigation requests, so do this
  // check first
  if (event.request.url.match(/\/.gatsby-plugin-offline:.+/)) {
    return handleAPIRequest({ event })
  }

  if (!offlineShellEnabled) {
    return await fetch(event.request)
  }

  lastNavigationRequest = event.request.url

  let { pathname } = new URL(event.request.url)
  pathname = pathname.replace(new RegExp(`^`), ``)

  // Check for resources + the app bundle
  // The latter may not exist if the SW is updating to a new version
  const resources = await idbKeyval.get(`resources:${pathname}`)
  if (!resources || !(await caches.match(`/app-83b35b2ec66f83086b16.js`))) {
    return await fetch(event.request)
  }

  for (const resource of resources) {
    // As soon as we detect a failed resource, fetch the entire page from
    // network - that way we won't risk being in an inconsistent state with
    // some parts of the page failing.
    if (!(await caches.match(resource))) {
      return await fetch(event.request)
    }
  }

  const offlineShell = `/offline-plugin-app-shell-fallback/index.html`
  const offlineShellWithKey = workbox.precaching.getCacheKeyForURL(offlineShell)
  return await caches.match(offlineShellWithKey)
})

workbox.routing.registerRoute(navigationRoute)

// this route is used when performing a non-navigation request (e.g. fetch)
workbox.routing.registerRoute(/\/.gatsby-plugin-offline:.+/, handleAPIRequest)
