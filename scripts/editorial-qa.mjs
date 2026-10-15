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
for (const x of warn) console.warn('WARN ' + x);
for (const x of issues) console.error('ERROR ' + x);
console.log('Editorial QA: ' + entries.length + ' articles, ' + issues.length + ' errors, ' + warn.length + ' warnings');
if (issues.length) process.exitCode = 1;
