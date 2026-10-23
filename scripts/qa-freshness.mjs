#!/usr/bin/env node
// Offline editorial freshness report. Does not change publication or assert hardware results.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = 'src/content/articles';
const today = new Date();
const daysBetween = date => Math.floor((today - new Date(date + 'T00:00:00Z')) / 86400000);
const field = (fm,key) => fm.match(new RegExp('^'+key+':\\s*(.*)$','m'))?.[1]?.trim().replace(/^["']|["']$/g,'') ?? '';
const results=[];
for (const lang of ['en','nb']) for(const filename of readdirSync(join(root,lang)).filter(n=>n.endsWith('.md'))) {
  const path=join(root,lang,filename), contents=readFileSync(path,'utf8');
  const match=contents.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if(!match) continue;
  const fm=match[1];
  if(field(fm,'draft')==='true') continue;
  const title=field(fm,'title');
  const checked=field(fm,'updated')||field(fm,'date');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(checked)) continue;
  // Review queues should include dated buyer's guides and rapidly changing service comparisons.
  const combined=(title+' '+field(fm,'description')+' '+field(fm,'tags')).toLowerCase();
  const timeSensitive=/2026|price|pricing|prices|buy|buying|best |worth|vs |comparison|beta|availability|proton|tuta|vpn|cloud|drive|mini-pc|mango|skyconnect|pris|kjøp|sammenlign|verdt/.test(combined);
  if(timeSensitive) results.push({path,checked,ageDays:daysBetween(checked),state:daysBetween(checked)>=90?'REVIEW_DUE':'current'});
}
results.sort((a,b)=>b.ageDays-a.ageDays||a.path.localeCompare(b.path));
for(const r of results) console.log(`${r.state.padEnd(10)} ${String(r.ageDays).padStart(4)}d ${r.checked} ${r.path}`);
const due=results.filter(r=>r.state==='REVIEW_DUE');
console.log(`Freshness watch: ${results.length} time-sensitive language pages; ${due.length} due for editorial review (90-day threshold).`);
if(due.length) console.log('Reminder: review flagged pages before updating their source-checked dates; passing CI does not imply current pricing or availability.');
