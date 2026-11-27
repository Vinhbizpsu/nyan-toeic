/* Generated release cache. Update by regenerating this file after changing any asset. */
const REV="nyan-v945-mobile-cats-20261127";
const ASSETS=["./adaptive.js","./app.js","./assets/CMUDICT-LICENSE.txt","./assets/book.svg","./assets/icon-192.png","./assets/icon-512.png","./assets/nyan-happy.svg","./assets/nyan-logo.svg","./assets/nyan-rest.svg","./assets/nyan-study-happy.svg","./assets/nyan-study.svg","./assets/study-desk.webp","./cat-rewards.js","./course.js","./data/analyzer-v9.js","./data/clauses.js","./data/contrast-v6.js","./data/ets.js","./data/exam-v6.js","./data/exam-v8.js","./data/exam-v94.js","./data/extra-practice.js","./data/foundation.js","./data/insight-map.js","./data/lexicon.js","./data/mixed.js","./data/practice-v8.js","./data/practice-v9.js","./data/textbook-v7.js","./data/verbs.js","./data/vocab-v9.js","./data/vocab-v93.js","./data/vocab-v94.js","./experience.js","./index.html","./manifest.webmanifest","./nyan-pet.js","./platform.js","./showcase.js","./style.css","./textbook.js","./ultimate.js","./vocabulary-universe.js"];
const PREFIX='nyan-static:'+self.registration.scope+':';
const CACHE=PREFIX+REV;
const indexURL=new URL('./index.html',self.registration.scope).href;
const allowed=new Set(ASSETS.map(a=>new URL(a,self.registration.scope).href));
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(ASSETS.map(a=>new Request(new URL(a,self.registration.scope),{cache:'reload'})));})()));
// Do not skipWaiting: an old open page must retain its matching assets until all tabs close.
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith(PREFIX)&&k!==CACHE)await caches.delete(k);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const u=new URL(req.url);if(u.origin!==self.location.origin||!u.href.startsWith(self.registration.scope))return;
 const scope=new URL(self.registration.scope);const nav=req.mode==='navigate'&&(u.pathname===scope.pathname||u.pathname===new URL(indexURL).pathname);
 const href=nav?indexURL:u.href;if(!allowed.has(href))return;
 event.respondWith((async()=>{const cache=await caches.open(CACHE);return (await cache.match(href))||fetch(req);})());
});
