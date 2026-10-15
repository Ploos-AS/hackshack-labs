// Progressive enhancement for fenced code blocks. No dependencies, telemetry or storage.
const norwegian = document.documentElement.lang === 'nb';
const labels = norwegian
  ? { copy: 'Kopier kode', copied: 'Kopiert', failed: 'Kunne ikke kopiere' }
  : { copy: 'Copy code', copied: 'Copied', failed: 'Copy failed' };

for (const pre of document.querySelectorAll('article pre')) {
  const code = pre.querySelector(':scope > code');
  if (!code || pre.querySelector(':scope > .code-copy')) continue;
  const wrapper = document.createElement('div');
  wrapper.className = 'code-block';
  pre.parentNode.insertBefore(wrapper, pre);
  wrapper.appendChild(pre);
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'code-copy';
  button.textContent = labels.copy;
  button.setAttribute('aria-label', labels.copy);
  wrapper.appendChild(button);
  button.addEventListener('click', async () => {
    try {
      // Read textContent to preserve whitespace and avoid copying syntax markup.
      await navigator.clipboard.writeText(code.textContent ?? '');
      button.textContent = labels.copied;
    } catch {
      button.textContent = labels.failed;
    }
    window.setTimeout(() => { button.textContent = labels.copy; }, 2000);
  });
}
