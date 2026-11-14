(() => {
  const nav = document.querySelector('.site-nav');
  const progress = document.querySelector('.scroll-progress');
  const frame = document.querySelector('.frame-wrap');
  const hero = document.querySelector('.hero');
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  const finePointer = matchMedia('(pointer:fine)').matches;
  const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;
  let ticking = false, cursorX = 0, cursorY = 0, glowX = 0, glowY = 0;
  const update = () => {
    const y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle('is-scrolled', y > 8);
    if (!reduced && y < 600) frame.style.transform = `translateY(${-Math.min(y * .3, 40)}px)`;
    if (!reduced) document.querySelector('.hero-grid').style.transform = `translateY(${y * .1}px)`;
    if (max > 0) progress.style.transform = `scaleX(${Math.min(y / max, 1)})`;
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) requestAnimationFrame(update); }, {passive:true}); update();
  if (finePointer && !reduced) {
    hero.addEventListener('pointermove', e => { const r = hero.getBoundingClientRect(); cursorX = e.clientX-r.left; cursorY=e.clientY-r.top; });
    const loop = () => { glowX += (cursorX-glowX)*.15; glowY += (cursorY-glowY)*.15; const g=document.querySelector('.cursor-glow'); g.style.left=`${glowX}px`; g.style.top=`${glowY}px`; requestAnimationFrame(loop); }; loop();
  }
  toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!open)); toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu'); menu.classList.toggle('is-open', !open); });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','Open menu'); menu.classList.remove('is-open'); }));
  const theme = matchMedia('(prefers-color-scheme:dark)'); theme.addEventListener?.('change', e => { document.documentElement.dataset.theme = e.matches ? 'dark' : 'light'; });
})();
document.querySelectorAll('.reveal').forEach((el) => {
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) { el.classList.add('is-visible'); return; }
  const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); } }), { threshold: .14 });
  observer.observe(el);
});
