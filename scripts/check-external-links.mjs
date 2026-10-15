#!/usr/bin/env node
// Report-only external link checker. No secrets, no browser automation.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = 'src/content/articles';
const found = new Map();
for (const lang of ['en','nb']) {
  for (const filename of readdirSync(join(root,lang)).filter(n=>n.endsWith('.md'))) {
    const file = join(root,lang,filename);
    const body = readFileSync(file,'utf8');
    const links = [...body.matchAll(/https?:\/\/[^\s<>"')\]]+/g)].map(m=>m[0].replace(/[.,;:]$/,''));
    for (const url of links) {
      try {
        const parsed = new URL(url);
        if (!found.has(parsed.href)) found.set(parsed.href, []);
        found.get(parsed.href).push(file);
      } catch { console.warn('Invalid URL in '+file+': '+url); }
    }
  }
}
const urls = [...found.keys()];
console.log('External links: '+urls.length+' distinct URLs across '+[...found.values()].reduce((n,x)=>n+x.length,0)+' references.');
const results = [];
const concurrency = 4;
let next = 0;
async function worker() {
  while(next < urls.length) {
    const url = urls[next++];
    const controller = new AbortController();
    const timeout = setTimeout(()=>controller.abort(),8000);
    try {
      const response = await fetch(url,{method:'HEAD',redirect:'follow',signal:controller.signal,headers:{'user-agent':'HackShackLabs-LinkAudit/1.0 (+https://labs.hackshack.no/)'}});
      // Some sites disallow HEAD; GET is deliberately not used to avoid extra load.
      const status = response.status;
      results.push({url,status,files:found.get(url),result:status===405||status===403||status===429?'inconclusive':status>=400?'review':'ok'});
    } catch (error) {
      results.push({url,status:null,files:found.get(url),result:'inconclusive',error:String(error.message||error)});
    } finally {clearTimeout(timeout);}
  }
}
await Promise.all(Array.from({length:Math.min(concurrency,urls.length)},()=>worker()));
results.sort((a,b)=>a.url.localeCompare(b.url));
for (const x of results.filter(x=>x.result!=='ok')) console.log(JSON.stringify(x));
const counts = Object.fromEntries(['ok','review','inconclusive'].map(k=>[k,results.filter(x=>x.result===k).length]));
console.log('Summary:',JSON.stringify(counts));
console.log('Review findings manually; HTTP errors, bot blocking and timeouts are not proof of a broken link.');
