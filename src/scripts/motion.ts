// Motion for the "Obra" direction (PROJECT_SPEC D-11/D-12): masked words, reveal once on enter,
// count-up figures and hover pan. Content is visible without JS: the hidden states only apply under html.js.

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const REVEAL = '[data-split], [data-rise], [data-shutter], .bar-item';

// Ambient videos stay on their poster frame when the reader prefers less motion.
if (reduce) {
  document.querySelectorAll<HTMLVideoElement>('video[autoplay]').forEach((v) => {
    v.removeAttribute('autoplay');
    v.pause();
  });
}

// Wrap each word of a heading in a mask; screen readers keep the plain text through aria-label.
document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
  const words = (el.textContent ?? '').trim().split(/\s+/);
  el.setAttribute('aria-label', words.join(' '));
  el.replaceChildren(
    ...words.flatMap((word, i) => {
      const mask = document.createElement('span');
      mask.className = 'w';
      mask.setAttribute('aria-hidden', 'true');
      const inner = document.createElement('span');
      inner.style.setProperty('--i', String(i));
      inner.textContent = word;
      mask.append(inner);
      return i ? [' ', mask] : [mask];
    }),
  );
});

const countUp = (el: HTMLElement) => {
  const to = Number(el.dataset.to);
  if (reduce || !to) return;
  const t0 = performance.now();
  const tick = (t: number) => {
    const k = Math.min(1, (t - t0) / 1300);
    el.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3))));
    if (k < 1) requestAnimationFrame(tick);
  };
  el.textContent = '0';
  requestAnimationFrame(tick);
};

const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      if (el.matches('[data-count]')) countUp(el);
      else el.classList.add('is-in');
      io.unobserve(el);
    }
  },
  { rootMargin: '0px 0px -6% 0px', threshold: 0 },
);
document.querySelectorAll(`${REVEAL}, [data-count]`).forEach((el) => io.observe(el));

// Show anything still hidden once the bottom of the page is reached (short last sections).
addEventListener(
  'scroll',
  () => {
    if (innerHeight + scrollY < document.documentElement.scrollHeight - 4) return;
    document.querySelectorAll(REVEAL).forEach((el) => el.classList.add('is-in'));
  },
  { passive: true },
);

// Hover pan: pictures zoom and follow the pointer (fine pointers only).
if (finePointer && !reduce) {
  document.querySelectorAll<HTMLElement>('[data-pan]').forEach((el) => {
    let timer: number | undefined;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', String(((e.clientX - r.left) / r.width - 0.5) * 2));
      el.style.setProperty('--my', String(((e.clientY - r.top) / r.height - 0.5) * 2));
      el.classList.add('moving');
      clearTimeout(timer);
      timer = window.setTimeout(() => el.classList.remove('moving'), 120);
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--mx', '0');
      el.style.setProperty('--my', '0');
    });
  });
}
