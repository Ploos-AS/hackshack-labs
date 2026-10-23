import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import assert from 'node:assert/strict';

async function htmlFiles(dir) {
  const out = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, item.name);
    if (item.isDirectory()) out.push(...await htmlFiles(path));
    else if (item.name === 'index.html') out.push(path);
  }
  return out;
}
const files = (await htmlFiles('dist')).filter(path =>
  /[/\\](?:no[/\\])?articles[/\\][^/\\]+[/\\]index\.html$/.test(path));
assert(files.length > 0, 'No generated article pages');
const counts = { en: 0, nb: 0, changes: 0, related: 0, code: 0 };
const allPages = await htmlFiles('dist');
// Every internally advertised article must have a generated page, including links in RSS.
const rss = await readFile('dist/rss.xml', 'utf8');
for (const match of rss.matchAll(/<link>https:\/\/labs\.hackshack\.no(\/articles\/[^<]+)<\/link>/g)) {
  const route = match[1];
  assert(files.some(f => f.replace(/\\/g, '/').endsWith(route + 'index.html')), `RSS links to missing article ${route}`);
}
assert(allPages.length > files.length, 'Expected non-article pages');
const homepageRoutes = new Set();
for (const homepage of ['dist/index.html', 'dist/no/index.html']) {
  const html = await readFile(homepage, 'utf8');
  for (const match of html.matchAll(/href="(\/(?:no\/)?articles\/[^"#?]+)"/g)) {
    homepageRoutes.add(match[1]);
  }
}
for (const route of homepageRoutes) {
  assert(files.some(f => '/' + f.replace(/^dist[/\\]/, '').replace(/index\.html$/, '').replace(/\\/g, '/') === route), `Homepage links to missing article ${route}`);
}

const siteLinks = new Set(allPages.map(p => '/' + p.replace(/^dist[/\\]/, '').replace(/index\.html$/, '').replace(/\\/g, '/')));
siteLinks.add('/');
siteLinks.add('/no/');
for (const file of allPages) {
  const html = await readFile(file, 'utf8');
  assert(/<html lang="(?:en|nb)"/.test(html), `${file}: missing language`);
  for (const [label, pattern] of [
    ['description', /<meta name="description" content="[^"]+"/],
    ['canonical', /<link rel="canonical" href="https:\/\/labs\.hackshack\.no\/[^"]*"/],
    ['Open Graph title', /<meta property="og:title" content="[^"]+"/],
    ['Open Graph description', /<meta property="og:description" content="[^"]+"/],
    ['Open Graph URL', /<meta property="og:url" content="[^"]+"/],
    ['navigation', /<nav aria-label="Main navigation"/],
    ['About footer', /About &amp; editorial policy|Om oss og redaksjonell policy/],
    ['RSS footer', /href="\/rss\.xml"/],
    ['privacy footer', /href="\/(?:no\/)?privacy\/"/],
    ['support footer', /ko-fi\.com\/hackshacklabs/]
  ]) assert(pattern.test(html), `${file}: missing ${label}`);
  for (const match of html.matchAll(/\bhref="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const href = match[1];
    if (href.startsWith('//') || href === '/rss.xml' || /\.[a-z0-9]+$/i.test(href)) continue;
    assert(siteLinks.has(href), `${file}: broken internal link ${href}`);
  }
}

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const no = /[/\\]no[/\\]articles[/\\]/.test(file);
  const lang = no ? 'nb' : 'en';
  counts[lang]++;
  assert(html.includes(`<html lang="${lang}"`), `${file}: wrong document language`);
  const match = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
  assert(match, `${file}: missing JSON-LD`);
  const data = JSON.parse(match[1]);
  assert.equal(data['@type'], 'TechArticle', `${file}: wrong schema type`);
  assert.equal(data.inLanguage, no ? 'nb-NO' : 'en');
  assert(data.headline && data.datePublished && data.dateModified && data.publisher?.name === 'Ploos AS');
  assert(data.mainEntityOfPage?.['@id']?.startsWith('https://labs.hackshack.no/'));
  assert(html.includes('code-copy'), `${file}: copy script not linked`);
  assert(html.includes(no ? 'Endringslogg' : 'Change history'), `${file}: missing change history`);
  counts.changes++;
  // RelatedArticles may legitimately be empty when no suitable articles exist.
  if (html.includes(no ? 'Relaterte artikler' : 'Related articles')) counts.related++;
  if (/<pre[^>]*>/.test(html)) counts.code++;
}
// Every published English article must have its Norwegian counterpart, and vice versa.
const routeSlugs = language => new Set(files.filter(f => language === 'nb' ? /[/\\\\]no[/\\\\]articles[/\\\\]/.test(f) : !/[/\\\\]no[/\\\\]articles[/\\\\]/.test(f)).map(f => f.replace(/\\\\/g, '/').split('/').at(-2)));
const enSlugs = routeSlugs('en');
const nbSlugs = routeSlugs('nb');
assert.deepEqual([...enSlugs].sort(), [...nbSlugs].sort(), 'EN/NO published article slugs differ');
for (const [file, prefix, other] of [['dist/index.html', '', '/no'], ['dist/no/index.html', '/no', '']]) {
  const html = await readFile(file, 'utf8');
  const ownLinks = [...html.matchAll(new RegExp('href="(' + prefix + '/articles/[^"]+)"', 'g'))].map(m => m[1]);
  assert(ownLinks.length <= 8, file + ': more than 8 recent articles shown');
  assert(html.includes('href="' + (other || '/') + '"') || html.includes('hreflang='), file + ': language alternate missing');
}
assert(counts.en > 0 && counts.nb > 0, 'Expected article pages in both languages');
assert(counts.changes > 0, 'No changelog rendered');
assert(counts.related > 0, 'No related-article section rendered');
console.log('Article build QA passed:', counts);
