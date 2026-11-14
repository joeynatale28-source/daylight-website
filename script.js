(() => {
  // The one place the app URL lives. Swap for https://daylightcal.com/app/ (or similar) later.
  const APP_URL = 'https://joeynatale28-source.github.io/daylight/';

  document.documentElement.classList.remove('no-js');
  document.querySelectorAll('[data-app]').forEach(a => { a.href = APP_URL; });
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  const nav = document.querySelector('.nav'), btn = document.querySelector('.menu-btn');
  if (nav && btn) {
    const set = o => { nav.classList.toggle('open', o); btn.setAttribute('aria-expanded', String(o)); };
    btn.addEventListener('click', () => set(!nav.classList.contains('open')));
    nav.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => set(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
  }

  document.querySelectorAll('.shot').forEach(s => {
    const i = s.querySelector('img');
    if (!i) return;
    const ok = () => { if (i.naturalWidth > 0) s.classList.add('has-img'); };
    i.addEventListener('load', ok);
    if (i.complete) ok();
  });

  const els = document.querySelectorAll('.rise');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .08 });
    els.forEach(e => io.observe(e));
  } else els.forEach(e => e.classList.add('in'));
})();
