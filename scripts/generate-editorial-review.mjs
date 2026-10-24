#!/usr/bin/env node
// Editorial review inventory: offline heuristics, not a factual or translation audit.
import {readdirSync,readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
const root='src/content/articles';
const names=readdirSync(join(root,'en')).filter(n=>n.endsWith('.md')).sort();
const read=(lang,name)=>{const path=join(root,lang,name);try{const source=readFileSync(path,'utf8');const fm=source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);if(!fm)return {path,error:'Missing frontmatter'};const get=k=>fm[1].match(new RegExp('^'+k+':\\s*(.*)$','m'))?.[1]?.trim().replace(/^["']|["']$/g,'')||'';return {path,source,body:source.slice(fm[0].length),get};}catch{return {path,error:'Missing file'}}};
const checked=new Date().toISOString().slice(0,10),out=[];
out.push('# HackShack Labs – editorial M1 review inventory','',`Generated: ${checked}`,'','**Scope:** static inventory of EN/NB Markdown files. This report does **not** constitute technical fact-checking, Norwegian proofreading, live URL validation or a hardware test.','');
out.push('| Article | Publication | EN/NO | Evidence | Quick answer EN/NO | URLs EN/NO | Review note |','|---|---|---|---|---|---|---|');
let published=0,drafts=0,missing=0,quickMissing=0;
for(const name of names){const e=read('en',name),n=read('nb',name),id=name.slice(0,-3);if(e.error||n.error){missing++;out.push(`| ${id} | — | MISSING | — | — | — | Check missing/corrupt content |`);continue}
const draft=e.get('draft')==='true';draft?drafts++:published++;
const quick=/^## (Quick answer|Short answer)/m.test(e.body),quickNo=/^## (Kort svar|Kortversjonen|Kort fortalt)/m.test(n.body);
if(!draft&&!(quick&&quickNo))quickMissing++;
const links=s=>(s.match(/https?:\/\/[^\s)"<>]+/g)||[]).length;
const notes=[];if(e.get('translationKey')!==n.get('translationKey'))notes.push('translationKey mismatch');
if(e.get('evidence')!==n.get('evidence'))notes.push('evidence mismatch');
if(e.get('draft')!==n.get('draft'))notes.push('draft mismatch');
if(!draft&&!(quick&&quickNo))notes.push('review intro format');
if(/2026|proton|tuta|skyconnect|mini-pc|mango|grapheneos|molly/i.test(id))notes.push('time-sensitive claims: verify externally');
if(/wr703n/i.test(id))notes.push('firmware/hardware safety: physical verification required');
out.push(`| ${id} | ${draft?'Draft':'Published'} | ${e.error||n.error?'Missing':'Files present'} | ${e.get('evidence')} | ${quick?'yes':'no'}/${quickNo?'yes':'no'} | ${links(e.body)}/${links(n.body)} | ${notes.join('; ')||'Manual review pending'} |`);
}
out.push('','## Completion gates','','- [ ] Revalidate technical claims and version-specific assertions against current primary sources.','- [ ] Verify external URLs and dates; resolve link-check failures and redirects.','- [ ] Proofread Norwegian prose against English meaning article by article.','- [ ] Confirm affiliate disclosures and destinations on both languages.','- [ ] Record review owner and date for each completed article; update article frontmatter only after an actual review.','- [ ] Keep untested firmware and hardware procedures unpublished until physically verified.','',`**Inventory:** ${names.length} English files, ${published} marked published, ${drafts} marked draft; ${missing} missing/corrupt Norwegian counterparts; ${quickMissing} published English/Norwegian pairs needing an intro-format review.`,'');
mkdirSync('reports',{recursive:true});writeFileSync('reports/M1-EDITORIAL-REVIEW.md',out.join('\n'));console.log(out.at(-2));
