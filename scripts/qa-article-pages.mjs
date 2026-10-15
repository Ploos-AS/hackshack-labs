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
  if (html.includes(no ? 'Endringslogg' : 'Change history')) counts.changes++;
  if (html.includes(no ? 'Relaterte artikler' : 'Related articles')) counts.related++;
  if (/<pre[^>]*>/.test(html)) counts.code++;
}
assert(counts.en > 0 && counts.nb > 0, 'Expected article pages in both languages');
assert(counts.changes > 0, 'No changelog rendered');
assert(counts.related > 0, 'No related-article section rendered');
console.log('Article build QA passed:', counts);
