import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const origin = (process.env.SITE_ORIGIN || 'https://labs.hackshack.no').replace(/\/$/, '');
const htmlFiles = async dir => (await Promise.all((await readdir(dir, { withFileTypes: true })).map(async item => {
  const path = join(dir, item.name);
  return item.isDirectory() ? htmlFiles(path) : item.name === 'index.html' ? [path] : [];
}))).flat();
const paths = await htmlFiles('dist');
const routes = paths.map(path => '/' + path.replace(/^dist[/\\]/, '').replace(/index\.html$/, '').replace(/\\/g, '/'));
const articleRoutes = routes.filter(route => /^\/(?:no\/)?articles\/[^/]+\/$/.test(route));
assert(articleRoutes.some(route => route.startsWith('/articles/')), 'No English articles');
assert(articleRoutes.some(route => route.startsWith('/no/articles/')), 'No Norwegian articles');
const checks = new Set(['/', '/no/', '/rss.xml', ...articleRoutes]);
for (const path of paths) {
  const html = await readFile(path, 'utf8');
  for (const match of html.matchAll(/\bhref="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const href = match[1];
    if (!href.startsWith('//') && (routes.includes(href) || href === '/rss.xml')) checks.add(href);
  }
}
let failures = 0;
for (const route of checks) {
  const url = origin + route;
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(15000), redirect: 'follow' });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const contentType = response.headers.get('content-type') || '';
    if (route.endsWith('/') && !contentType.includes('text/html')) throw new Error('Unexpected content-type: ' + contentType);
    console.log('PASS', response.status, url);
  } catch (error) {
    failures++;
    console.error('FAIL', url, error.message);
  }
}
for (const draft of ['wr703n-second-life']) {
  for (const prefix of ['/articles/', '/no/articles/']) {
    const route = prefix + draft + '/';
    if (articleRoutes.includes(route)) continue;
    try {
      const response = await fetch(origin + route, { signal: AbortSignal.timeout(15000), redirect: 'follow' });
      if (response.status !== 404) throw new Error('Expected 404; got ' + response.status);
      console.log('PASS draft hidden', route);
    } catch (error) {
      failures++;
      console.error('FAIL draft check', route, error.message);
    }
  }
}
console.log('Production smoke test:', checks.size, 'published routes checked;', failures, 'failures');
if (failures) process.exitCode = 1;
