(() => {
  // The one place the app URL lives. Swap for the custom-domain app URL later.
  const APP_URL = 'https://joeynatale28-source.github.io/daylight/';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  root.classList.remove('no-js');

  document.querySelectorAll('[data-app]').forEach(a => { a.href = APP_URL; });
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* nav: mobile menu */
  const nav = document.getElementById('nav'), btn = document.querySelector('.menu-btn');
  const setMenu = o => {
    if (!nav || !btn) return;
    nav.classList.toggle('open', o);
    btn.setAttribute('aria-expanded', String(o));
    btn.setAttribute('aria-label', o ? 'Close menu' : 'Menu');
    document.body.style.overflow = o ? 'hidden' : '';
  };
  if (nav && btn) {
    btn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
    nav.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); btn.focus(); } });
    matchMedia('(min-width: 768px)').addEventListener('change', e => { if (e.matches) setMenu(false); });
  }

  /* nav: theme follows the section under it, shadow after scroll */
  if (nav) {
    const secs = [...document.querySelectorAll('[data-nav]')];
    let queued = false;
    const update = () => {
      queued = false;
      nav.classList.toggle('scrolled', scrollY > 8);
      if (!secs.length) { nav.classList.add('on-light'); return; }
      const y = nav.offsetHeight / 2;
      let theme = 'dark';
      for (const s of secs) {
        const r = s.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) { theme = s.dataset.nav; break; }
      }
      nav.classList.toggle('on-light', theme === 'light');
    };
    const q = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
    addEventListener('scroll', q, { passive: true });
    addEventListener('resize', q);
    update();
  }

  /* screenshots: show image once it has loaded, else keep placeholder */
  document.querySelectorAll('.shot').forEach(s => {
    const i = s.querySelector('img');
    if (!i) return;
    const ok = () => { if (i.naturalWidth > 0) s.classList.add('has-img'); };
    i.addEventListener('load', ok);
    if (i.complete) ok();
  });

  /* scroll reveals (once), with a small stagger inside grids */
  document.querySelectorAll('.stagger').forEach(g => {
    [...g.children].forEach((c, n) => c.style.setProperty('--i', n % 3));
  });
  const els = document.querySelectorAll('.rise');
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .08, rootMargin: '0px 0px -4% 0px' });
    els.forEach(e => io.observe(e));
  } else els.forEach(e => e.classList.add('in'));

  /* FAQ accordion: animated open/close, still native <details> */
  document.querySelectorAll('.faq details').forEach(d => {
    const s = d.querySelector('summary'), c = d.querySelector('.a');
    let anim;
    s.addEventListener('click', e => {
      e.preventDefault();
      const opening = !d.classList.contains('is-open');
      if (anim) anim.cancel();
      if (reduced) { d.open = opening; d.classList.toggle('is-open', opening); return; }
      const from = c.getBoundingClientRect().height;
      if (opening) {
        d.open = true; d.classList.add('is-open');
        const to = c.scrollHeight;
        anim = c.animate([{ height: from + 'px', opacity: from ? 1 : 0 }, { height: to + 'px', opacity: 1 }], { duration: 240, easing: 'cubic-bezier(.23,1,.32,1)' });
        anim.onfinish = () => { anim = null; };
      } else {
        d.classList.remove('is-open');
        anim = c.animate([{ height: from + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 180, easing: 'cubic-bezier(.4,0,1,1)' });
        anim.onfinish = () => { d.open = false; anim = null; };
      }
    });
  });

  /* legal pages: table of contents */
  const toc = document.querySelector('.toc');
  if (toc) {
    const mq = matchMedia('(min-width: 901px)');
    const sync = () => { toc.open = mq.matches; };
    sync(); mq.addEventListener('change', sync);
    const links = [...toc.querySelectorAll('a')];
    const targets = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
      }), { rootMargin: '-96px 0px -70% 0px' });
      targets.forEach(t => io.observe(t));
    }
  }
})();
