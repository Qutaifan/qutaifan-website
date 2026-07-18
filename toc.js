/* QUTAIFAN guide TOC — builds from anchored headings (h2[id], h3[id]).
   Left rail ≥1800px, collapsible "Jump to" dropdown below. Self-contained. */
(function () {
  var STYLE =
    '.qf-toc{position:fixed;top:96px;left:calc(50vw - 880px);width:200px;max-height:70vh;' +
    'overflow-y:auto;font-size:.78rem;line-height:1.45;display:none;z-index:40}' +
    '@media(min-width:1800px){.qf-toc{display:block}}' +
    '.qf-toc-title{font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;' +
    'color:#71717a;margin-bottom:10px}' +
    '.qf-toc a{display:block;color:#a1a1aa;text-decoration:none;padding:3px 0 3px 10px;' +
    'border-left:2px solid rgba(255,255,255,.08)}' +
    '.qf-toc a:hover,.qf-toc a.qf-cur{color:#f4f4f5;border-left-color:#06b6d4}' +
    '.qf-toc a.qf-h3{padding-left:20px}' +
    '.qf-jump{display:block;margin:16px auto;max-width:680px;padding:0 24px}' +
    '@media(min-width:1800px){.qf-jump{display:none}}' +
    '.qf-jump select{width:100%;font-family:inherit;font-size:.85rem;color:#f4f4f5;background:#111114;' +
    'border:1px solid rgba(255,255,255,.14);border-radius:10px;padding:10px 12px}' +
    '.xlink-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px;margin:18px 0}' +
    '.xlink-card{display:block;padding:16px;border:1px solid rgba(255,255,255,.1);border-radius:12px;' +
    'text-decoration:none;color:#f4f4f5}.xlink-card:hover{border-color:#06b6d4}' +
    '.xlink-card strong{display:block;margin-bottom:4px}.xlink-card span{color:#a1a1aa;font-size:.82rem}';
  var st = document.createElement('style'); st.textContent = STYLE; document.head.appendChild(st);

  var heads = Array.prototype.slice.call(document.querySelectorAll('h2[id], h3[id]'));
  if (heads.length < 3) return;

  var toc = document.createElement('nav'); toc.className = 'qf-toc';
  toc.setAttribute('aria-label', 'On this page');
  toc.innerHTML = '<div class="qf-toc-title">On this page</div>';
  var jump = document.createElement('div'); jump.className = 'qf-jump';
  var sel = document.createElement('select');
  sel.setAttribute('aria-label', 'Jump to section');
  sel.innerHTML = '<option value="">Jump to section…</option>';
  heads.forEach(function (h) {
    var t = h.textContent.replace(/\s+/g, ' ').trim();
    var a = document.createElement('a');
    a.href = '#' + h.id; a.textContent = t;
    if (h.tagName === 'H3') a.className = 'qf-h3';
    toc.appendChild(a);
    var o = document.createElement('option'); o.value = h.id; o.textContent = t;
    sel.appendChild(o);
  });
  sel.addEventListener('change', function () {
    if (this.value) document.getElementById(this.value).scrollIntoView({ behavior: 'smooth' });
  });
  jump.appendChild(sel);
  document.body.appendChild(toc);
  var firstH2 = document.querySelector('h2');
  if (firstH2) {
    var sec = firstH2.closest('section') || firstH2.closest('.section') || firstH2;
    sec.parentNode.insertBefore(jump, sec);
  }

  var links = toc.querySelectorAll('a');
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var cur = null;
      heads.forEach(function (h) { if (h.getBoundingClientRect().top < 120) cur = h.id; });
      links.forEach(function (a) {
        a.classList.toggle('qf-cur', a.getAttribute('href') === '#' + cur);
      });
      ticking = false;
    });
  }, { passive: true });
})();
