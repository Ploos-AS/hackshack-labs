#!/usr/bin/env node
// Static editorial checks; intentionally no external dependencies or network requests.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = 'src/content/articles';
const issues = [];
const warn = [];
const entries = [];
const field = (fm, name) => {
  const match = fm.match(new RegExp('^' + name + ':\\s*(.*)$', 'm'));
  return match?.[1]?.trim().replace(/^["']|["']$/g, '') ?? '';
};
for (const lang of ['en', 'nb']) {
  for (const filename of readdirSync(join(root, lang)).filter(x => x.endsWith('.md'))) {
    const path = join(root, lang, filename);
    const content = readFileSync(path, 'utf8');
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    if (!match) { issues.push(path + ': missing YAML frontmatter'); continue; }
    const fm = match[1];
    const data = Object.fromEntries(['title','description','category','lang','date','updated','translationKey','draft','tested','evidence'].map(k => [k,field(fm,k)]));
    entries.push({path, filename, lang, content, data});
    for (const k of ['title','description','category','lang','date']) if (!data[k]) issues.push(path + ': missing ' + k);
    if (data.lang !== lang) issues.push(path + ': lang differs from directory');
    if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) issues.push(path + ': date should use YYYY-MM-DD');
    if (data.updated && !/^\d{4}-\d{2}-\d{2}$/.test(data.updated)) issues.push(path + ': updated should use YYYY-MM-DD');
    if (data.evidence && !['documentation','desk-research','lab-tested','hardware-verified'].includes(data.evidence)) issues.push(path + ': invalid evidence level');
    if (data.tested === 'true' && ['documentation','desk-research'].includes(data.evidence)) issues.push(path + ': tested conflicts with evidence');
    if (data.tested === 'false' && ['lab-tested','hardware-verified'].includes(data.evidence)) issues.push(path + ': untested conflicts with evidence');
    if (/\]\(http:\/\//.test(content)) warn.push(path + ': non-HTTPS markdown link; inspect target');
    if (/href=["']http:\/\//.test(content)) warn.push(path + ': non-HTTPS HTML link; inspect target');
    if (data.draft !== 'true' && !data.translationKey) warn.push(path + ': missing translationKey');
  }
}
const byName = new Map(entries.map(e => [e.lang + '/' + e.filename, e]));
for (const e of entries.filter(e => e.lang === 'en' && e.data.draft !== 'true')) {
  const other = byName.get('nb/' + e.filename);
  if (!other) { warn.push(e.path + ': no Norwegian counterpart'); continue; }
  if (other.data.translationKey !== e.data.translationKey) issues.push(e.path + ': translationKey mismatch');
  if (other.data.category !== e.data.category) issues.push(e.path + ': category mismatch between translations');
  if (other.data.evidence !== e.data.evidence) warn.push(e.path + ': evidence differs between translations');
  if (other.data.tested !== e.data.tested) issues.push(e.path + ': tested differs between translations');
  if (other.data.date !== e.data.date) warn.push(e.path + ': publication date differs between translations');
  if (other.data.updated !== e.data.updated) warn.push(e.path + ': update date differs between translations');
  if (e.content.includes('Affiliate disclosure') !== other.content.includes('Affiliate disclosure') && !/Reklame|annonselenke|affiliate/i.test(other.content)) warn.push(e.path + ': affiliate disclosure may be missing in Norwegian');
}
// Affiliate and source hygiene checks; flag uncertainty for human editorial review.
for (const e of entries.filter(e => e.data.draft !== 'true')) {
  const body = e.content.slice(e.content.indexOf('\n---\n', 4) + 5);
  const hasAffiliateUrl = /https?:\/\/[^\s)"'<>]*(?:partner|affiliate|ref=|utm_campaign=)/i.test(body);
  const hasDisclosure = e.lang === 'nb'
    ? /(?:reklame|annonselenke|affiliate|provisjon)/i.test(body.slice(0, 1800))
    : /(?:advertisement|affiliate disclosure|affiliate links?|commission)/i.test(body.slice(0, 1800));
  if (hasAffiliateUrl && !hasDisclosure) issues.push(e.path + ': affiliate-style URL without an early disclosure');
  if (/\b(?:hands.on tested|hardware.verified|lab.tested)\b/i.test(body.slice(0, 2000)) &&
      e.data.tested === 'false' &&
      !/not hands.on tested|not hardware.verified|ikke maskinvareverifisert/i.test(body.slice(0, 2000))) {
    warn.push(e.path + ': test language needs manual review against tested:false');
  }
  if (!body.includes('](https://') && !body.includes('](http://') &&
      !body.includes('href="https://') && !body.includes("href='https://")) {
    warn.push(e.path + ': no external source links found; verify whether citations are needed');
  }
}

// Validate internal article URLs against published content, without probing external sites.
// External HTTP status and redirects are checked separately; these tests remain offline.
const publishedSlugs = new Set(entries.filter(e => e.data.draft !== 'true').map(e =>
  (e.lang === 'nb' ? '/no' : '') + '/articles/' + e.filename.replace(/\.md$/, '') + '/'
));
const articleLinks = /(?:\]\(|href=["'])(\/[^\s)"'#?]+)(?:[?#][^\s)"']*)?(?:\)|["'])/g;
for (const e of entries.filter(e => e.data.draft !== 'true')) {
  const body = e.content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  for (const match of body.matchAll(articleLinks)) {
    const url = match[1];
    if (!url.startsWith('/articles/') && !url.startsWith('/no/articles/')) continue;
    const canonical = url.endsWith('/') ? url : url + '/';
    if (!publishedSlugs.has(canonical)) issues.push(e.path + ': broken internal article link ' + url);
    else if (!url.endsWith('/')) warn.push(e.path + ': article link should have trailing slash ' + url);
  }
}

// Validate literal navigation and series routes against Astro page files.
const pageRoot = 'src/pages';
const pageFiles = [];
function collectPages(dir) {
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, item.name);
    if (item.isDirectory()) collectPages(full);
    else if (item.name.endsWith('.astro')) pageFiles.push(full);
  }
}
collectPages(pageRoot);
const staticRoutes = new Set(pageFiles.filter(p => !p.includes('[')).map(p => {
  const relative = p.slice(pageRoot.length + 1).replace(/\.astro$/, '');
  return '/' + (relative === 'index' ? '' : relative.replace(/\/index$/, '') + '/');
}));
staticRoutes.add('/rss.xml');
const dynamicCategories = new Set(['projects','guides','how-tos','mini-how-tos','reviews','tests','tutorials','deep-dives','teardowns','experiments','reference']);
function routeExists(url) {
  if (staticRoutes.has(url)) return true;
  const match = url.match(/^\/(no\/)?category\/([^/]+)\/$/);
  return !!match && dynamicCategories.has(match[2]);
}
const navLinks = /(?:\]\(|href=["'])((?:\/(?:no\/)?(?:series|category|about|privacy|search)\/|\/rss\.xml)[^\s)"']*)(?:\)|["'])/g;
for (const path of [...pageFiles, 'src/layouts/SiteLayout.astro']) {
  const content = readFileSync(path, 'utf8');
  for (const match of content.matchAll(navLinks)) {
    const url = match[1].split(/[?#]/)[0];
    if (!routeExists(url)) issues.push(path + ': missing navigation/series route ' + url);
  }
}
for (const path of pageFiles.filter(p => p.includes('/series/'))) {
  const content = readFileSync(path, 'utf8');
  if (!content.includes('published()')) warn.push(path + ': series page does not use published articles collection');
}
for (const x of warn) console.warn('WARN ' + x);
for (const x of issues) console.error('ERROR ' + x);
console.log('Editorial QA: ' + entries.length + ' articles, ' + issues.length + ' errors, ' + warn.length + ' warnings');
if (issues.length) process.exitCode = 1;
