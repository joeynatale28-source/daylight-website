(() => {
  // The one place the app URL lives. Swap for the custom-domain app URL later.
  const APP_URL = 'https://joeynatale28-source.github.io/daylight/';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.remove('no-js');

  document.querySelectorAll('[data-app]').forEach(a => { a.href = APP_URL; });
  document.querySelectorAll('[data-url]').forEach(u => { u.textContent = APP_URL.replace(/^https?:\/\//, '').replace(/\/$/, ''); });
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- nav: mobile menu ---- */
  const nav = document.getElementById('nav'), btn = nav && nav.querySelector('.menu-btn');
  const setMenu = o => {
    nav.classList.toggle('open', o);
    btn.setAttribute('aria-expanded', String(o));
    btn.setAttribute('aria-label', o ? 'Close menu' : 'Menu');
  };
  if (nav && btn) {
    btn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
    nav.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); btn.focus(); } });
    document.addEventListener('click', e => { if (nav.classList.contains('open') && !nav.contains(e.target)) setMenu(false); });
    matchMedia('(min-width: 769px)').addEventListener('change', e => { if (e.matches) setMenu(false); });
  }

  /* ---- nav: floating pill on scroll, tone follows the section beneath ---- */
  if (nav) {
    const toned = [...document.querySelectorAll('main [data-tone], footer[data-tone]')];
    const links = [...nav.querySelectorAll('.nav-links a[href^="#"]')];
    const spy = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    let queued = false;
    const update = () => {
      queued = false;
      nav.classList.toggle('scrolled', scrollY > 8);
      if (toned.length) {
        const y = nav.querySelector('.nav-bar').getBoundingClientRect().bottom - 32;
        let tone = document.querySelector('main [data-tone]') ? 'dark' : 'light';
        for (const s of toned) { const r = s.getBoundingClientRect(); if (r.top <= y && r.bottom > y) { tone = s.dataset.tone; break; } }
        nav.dataset.tone = tone;
      } else nav.dataset.tone = 'light';
      const mid = innerHeight * 0.4;
      links.forEach((a, i) => { const r = spy[i] && spy[i].getBoundingClientRect(); a.classList.toggle('active', !!r && r.top <= mid && r.bottom > mid); });
    };
    const q = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
    addEventListener('scroll', q, { passive: true });
    addEventListener('resize', q);
    update();
  }

  /* ---- screenshots: reveal real image once loaded, else keep placeholder ---- */
  document.querySelectorAll('.shot').forEach(s => {
    const i = s.querySelector('img');
    if (!i) return;
    const ok = () => { if (i.naturalWidth > 0) s.classList.add('has-img'); };
    i.addEventListener('load', ok);
    if (i.complete) ok();
  });

  /* ---- scroll reveals: once, at 15% visible ---- */
  const rises = document.querySelectorAll('.rise');
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .15 });
    rises.forEach(e => io.observe(e));
  } else rises.forEach(e => e.classList.add('in'));

  /* ---- FAQ: one open at a time, buttons with aria-expanded ---- */
  const items = [...document.querySelectorAll('.faq-item')];
  items.forEach(it => {
    const q = it.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const opening = !it.classList.contains('open');
      items.forEach(o => { o.classList.remove('open'); o.querySelector('.faq-q').setAttribute('aria-expanded', 'false'); });
      if (opening) { it.classList.add('open'); q.setAttribute('aria-expanded', 'true'); }
    });
  });

  /* ---- legal pages: table of contents ---- */
  const toc = document.querySelector('.toc');
  if (toc) {
    const mq = matchMedia('(min-width: 901px)');
    const sync = () => { toc.open = mq.matches; };
    sync(); mq.addEventListener('change', sync);
    const tl = [...toc.querySelectorAll('a')];
    const targets = tl.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) tl.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
      }), { rootMargin: '-96px 0px -70% 0px' });
      targets.forEach(t => io.observe(t));
    }
  }
})();
