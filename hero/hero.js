/* Daylight — shared page behavior (hero, privacy, terms).
   Enhancements only: every page is complete and fully visible without this file. */
(function () {
  var d = document, w = window;
  var reduce = w.matchMedia ? w.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

  /* Reload lands at the very top, unless the URL carries a #hash: then the anchor wins. */
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) {}
  function toStart() {
    var id = decodeURIComponent((location.hash || '').slice(1)), target = id && d.getElementById(id);
    if (target) target.scrollIntoView();
    else if (!location.hash) w.scrollTo(0, 0);
  }
  toStart();
  w.addEventListener('load', toStart);
  w.addEventListener('pageshow', function (e) { if (e.persisted) toStart(); });

  /* Nav: bar at rest, floating pill past 8px. Widths in px so the change animates smoothly. */
  var nav = d.getElementById('nav'), menu = d.getElementById('menu'), panel = d.getElementById('panel'), win = d.getElementById('win');
  if (nav) {
    var size = function () {
      var cw = nav.clientWidth;
      nav.style.setProperty('--w-rest', cw + 'px');
      nav.style.setProperty('--w-pill', Math.max(0, Math.min(760, cw - 32)) + 'px');
    };
    size();
    if ('ResizeObserver' in w) new ResizeObserver(size).observe(nav); else w.addEventListener('resize', size);

    var onScroll = function () {
      var y = w.pageYOffset || d.documentElement.scrollTop || 0;
      nav.classList.toggle('is-pill', y > 8);
      /* product window eases back as it leaves the top of the view */
      if (win && !reduce.matches) {
        var r = win.getBoundingClientRect();
        var p = Math.min(1, Math.max(0, (86 - r.top) / (r.height * 0.8)));
        win.style.transform = p ? 'scale(' + (1 - 0.02 * p).toFixed(4) + ')' : '';
        win.style.opacity = p ? (1 - 0.5 * p).toFixed(3) : '';
      }
    };
    w.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (menu && panel) {
      var setOpen = function (o) {
        nav.classList.toggle('open', o);
        menu.setAttribute('aria-expanded', o ? 'true' : 'false');
        menu.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
      };
      menu.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
      panel.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
      d.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
      w.addEventListener('resize', function () { if (w.innerWidth >= 768) setOpen(false); });
    }
  }

  /* Rotating word: two stacked spans cross-fade, so the slot is never empty and never changes width. */
  var a = d.getElementById('w1'), b = d.getElementById('w2');
  if (a && b && !reduce.matches) {
    var words = ['clutter', 'noise', 'chaos', 'mess'], i = 0, cur = a, next = b;
    setInterval(function () {
      i = (i + 1) % words.length;
      next.className = 'word reset';
      next.textContent = words[i];
      void next.offsetWidth;
      next.className = 'word on';
      cur.className = 'word up';
      var t = cur; cur = next; next = t;
    }, 2600);
  }

  /* Accordions. Without this script every row stays expanded. */
  [].forEach.call(d.querySelectorAll('[data-acc]'), function (root) {
    var keepOne = root.getAttribute('data-acc') === 'one';
    var items = [].slice.call(root.querySelectorAll('.acc-item'));
    var set = function (item, open) {
      item.classList.toggle('open', open);
      var btn = item.querySelector('button');
      if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    items.forEach(function (item, n) {
      set(item, keepOne && n === 0);
      var btn = item.querySelector('button');
      if (btn) btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        if (keepOne && isOpen) return;
        items.forEach(function (other) { set(other, false); });
        set(item, !isOpen);
      });
    });
    root.classList.add('js-acc');
  });

  /* Scroll reveals. Content is visible by default: nothing is hidden in CSS. A section only animates
     at the moment it scrolls into view, and a timer always forces the finished state. */
  if (!reduce.matches && 'IntersectionObserver' in w && typeof Element.prototype.animate === 'function') {
    var FAN = ['translate(-30px, 34px) rotate(-8deg)', 'translateY(4px)', 'translate(30px, 34px) rotate(8deg)'];
    var first = true;
    var io = new IntersectionObserver(function (entries) {
      var initial = first; first = false;
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        if (initial) return; /* already on screen at load: leave it alone */
        var group = en.target, fan = group.classList.contains('fan') && w.innerWidth > 960;
        var els = group.hasAttribute('data-stagger') ? [].slice.call(group.children) : [group];
        var anims = els.map(function (el, n) {
          try {
            return el.animate([{ offset: 0, opacity: 0, transform: fan ? FAN[n] : 'translateY(8px)' }],
              { duration: 400, delay: Math.min(n, 6) * 60, easing: EASE, fill: 'backwards' });
          } catch (e) { return null; }
        });
        setTimeout(function () {
          anims.forEach(function (an) { try { if (an && an.playState !== 'finished') an.finish(); } catch (e) {} });
        }, 400 + 6 * 60 + 250);
      });
    }, { threshold: 0.12 });
    [].forEach.call(d.querySelectorAll('[data-reveal]'), function (el) { io.observe(el); });
  }
})();
