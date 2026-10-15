import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const source = readFileSync('src/scripts/code-copy.js', 'utf8');

async function scenario(lang, clipboardFails = false) {
  const listeners = new Map();
  const code = { textContent: 'echo hello\n  indented\n' };
  const parent = {
    insertBefore(wrapper, pre) { assert.equal(pre, block); wrapper.parentNode = this; },
  };
  const block = {
    parentNode: parent,
    querySelector(selector) {
      if (selector === ':scope > code') return code;
      if (selector === ':scope > .code-copy') return null;
      return null;
    },
  };
  const buttons = [];
  const document = {
    documentElement: { lang },
    querySelectorAll(selector) { assert.equal(selector, 'article pre'); return [block]; },
    createElement(tag) {
      const el = {
        tag, children: [],
        appendChild(child) { this.children.push(child); },
        setAttribute(name, value) { this[name] = value; },
        addEventListener(name, fn) { listeners.set(name, fn); },
      };
      if (tag === 'button') buttons.push(el);
      return el;
    },
  };
  let copied;
  let reset;
  const context = {
    document,
    navigator: { clipboard: { async writeText(text) {
      if (clipboardFails) throw new Error('clipboard blocked');
      copied = text;
    } } },
    window: { setTimeout(fn) { reset = fn; } },
  };
  runInNewContext(source, context);
  assert.equal(buttons.length, 1);
  const button = buttons[0];
  assert.equal(button.textContent, lang === 'nb' ? 'Kopier kode' : 'Copy code');
  await listeners.get('click')();
  assert.equal(button.textContent, clipboardFails
    ? (lang === 'nb' ? 'Kunne ikke kopiere' : 'Copy failed')
    : (lang === 'nb' ? 'Kopiert' : 'Copied'));
  if (!clipboardFails) assert.equal(copied, code.textContent);
  reset();
  assert.equal(button.textContent, lang === 'nb' ? 'Kopier kode' : 'Copy code');
}

await scenario('en');
await scenario('nb');
await scenario('en', true);
await scenario('nb', true);
console.log('Code copy QA passed: both languages, whitespace and clipboard errors');
