// Shared behaviour for inner mockups: split headings, reveal once, hover pan.
window.Obra = (() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const split = (el) => {
    const text = el.textContent.trim();
    el.setAttribute('aria-label', text);
    el.innerHTML = text.split(/\s+/).map((w, i) => `<span class="w" aria-hidden="true"><span style="--i:${i}">${w}</span></span>`).join(' ');
  };
  const io = new IntersectionObserver((es) => {
    for (const e of es) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0 });
  const watch = (root = document) => {
    root.querySelectorAll('[data-split]:not([aria-label])').forEach(split);
    root.querySelectorAll('[data-split], [data-rise], [data-shutter]').forEach((el) => { if (!el.classList.contains('is-in')) io.observe(el); });
  };
  // Show anything still hidden once the bottom of the page is reached.
  addEventListener('scroll', () => {
    if (innerHeight + scrollY < document.documentElement.scrollHeight - 4) return;
    document.querySelectorAll('[data-split], [data-rise], [data-shutter]').forEach((el) => el.classList.add('is-in'));
  }, { passive: true });
  const pan = (root = document) => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches || reduce) return;
    root.querySelectorAll('[data-pan]:not([data-pan-on])').forEach((el) => {
      el.dataset.panOn = '';
      let t;
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5) * 2);
        el.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5) * 2);
        el.classList.add('moving'); clearTimeout(t); t = setTimeout(() => el.classList.remove('moving'), 120);
      });
      el.addEventListener('pointerleave', () => { el.style.setProperty('--mx', 0); el.style.setProperty('--my', 0); });
    });
  };
  const nf = new Intl.NumberFormat('pt-BR');
  return { watch, pan, reduce, nf };
})();
