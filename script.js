/* Daylight marketing site: shared nav + footer, theme-free (CSS follows the OS), motion system. No libraries. */
(function () {
  var doc = document, root = doc.documentElement;
  var page = root.dataset.page || "home";
  var base = root.dataset.root || "";           // "" on home, "../" on /privacy and /tos, "./" on 404
  var home = page === "home";
  var APP = "https://joeynatale28-source.github.io/daylight/";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = matchMedia("(pointer: fine)").matches && !reduce;
  var ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var anchor = function (id) { return (home ? "" : (base || "./")) + "#" + id; };
  var homeHref = home ? "./" : (base || "./");

  /* ---------- Shared nav ---------- */
  var links = [["features", "Features"], ["sharing", "Sharing"], ["ai", "AI access"], ["faq", "FAQ"]];
  var navEl = doc.getElementById("site-nav");
  if (navEl) {
    navEl.className = "nav-wrap";
    navEl.innerHTML =
      '<nav class="nav" aria-label="Main">' +
      '<a class="brand" href="' + homeHref + '"><img src="' + base + 'assets/logo-white.svg" alt="" width="28" height="28">Daylight</a>' +
      '<ul class="nav-links">' + links.map(function (l) { return '<li><a href="' + anchor(l[0]) + '" data-spy="' + l[0] + '">' + l[1] + "</a></li>"; }).join("") + '<span class="nav-ind" aria-hidden="true"></span></ul>' +
      '<a class="btn btn-light btn-sm" href="' + APP + '">Open Daylight ' + ARROW + "</a>" +
      '<button class="burger" aria-label="Menu" aria-expanded="false" aria-controls="mnav"><i></i><i></i></button>' +
      '<div class="mnav" id="mnav">' + links.map(function (l, i) { return '<a class="ml" style="--i:' + i + '" href="' + anchor(l[0]) + '">' + l[1] + "</a>"; }).join("") +
      '<a class="btn btn-light" href="' + APP + '">Open Daylight ' + ARROW + "</a></div></nav>";
  }
  var bar = doc.createElement("div");
  bar.className = "progress"; bar.setAttribute("aria-hidden", "true"); bar.innerHTML = "<i></i>";
  doc.body.insertBefore(bar, doc.body.firstChild);

  /* ---------- Shared footer ---------- */
  var foot = doc.getElementById("site-footer");
  if (foot) {
    foot.className = "footer";
    var col = function (t, items) { return "<div><h4>" + t + "</h4><ul>" + items.map(function (i) { return '<li><a href="' + i[1] + '">' + i[0] + "</a></li>"; }).join("") + "</ul></div>"; };
    foot.innerHTML =
      '<div class="wrap"><div class="watermark" aria-hidden="true">Daylight</div><div class="f-grid">' +
      '<div class="f-brand"><a class="brand" href="' + homeHref + '"><img src="' + base + 'assets/logo-white.svg" alt="" width="28" height="28">Daylight</a><p>A clean, fast web calendar for your events and tasks. Free.</p></div>' +
      col("Product", [["Open Daylight", APP], ["Features", anchor("features")], ["AI access", anchor("ai")]]) +
      col("Explore", [["Sharing", anchor("sharing")], ["Themes", anchor("themes")], ["FAQ", anchor("faq")]]) +
      col("Legal", [["Privacy", base + "privacy/"], ["Terms", base + "tos/"]]) +
      '</div><div class="f-bottom"><span>Designed and built by Joey.</span><span>© 2026 Daylight</span></div></div>';
  }

  /* ---------- Reveals ---------- */
  doc.querySelectorAll("[data-stagger]").forEach(function (p) {
    var step = +p.dataset.stagger, kids = p.querySelectorAll(":scope > [data-reveal]");
    kids.forEach(function (k, i) { k.style.setProperty("--d", i * step + "ms"); });
  });
  var items = doc.querySelectorAll("[data-reveal],[data-draw]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -4% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else items.forEach(function (el) { el.classList.add("in"); });

  /* ---------- Scroll loop (progress, nav pill, spy, parallax, TOC) ---------- */
  var nav = doc.querySelector(".nav"), ind = doc.querySelector(".nav-ind"), fill = bar.firstChild;
  var navLinks = [].slice.call(doc.querySelectorAll(".nav-links a"));
  var spySecs = home ? [].slice.call(doc.querySelectorAll("[data-section]")) : [];
  var tocLinks = [].slice.call(doc.querySelectorAll(".toc a[href^='#']"));
  var lsecs = [].slice.call(doc.querySelectorAll(".lsec"));
  var pf = doc.querySelector(".parallax"), pg = doc.querySelector(".hero-grid");
  var heroEl = doc.querySelector(".hero");
  var activeId = null, tocId = null, ticking = false;

  function moveInd(a) {
    if (!ind) return;
    if (!a) { ind.style.opacity = 0; return; }
    ind.style.opacity = 1;
    ind.style.transform = "translateX(" + a.offsetLeft + "px) scaleX(" + a.offsetWidth + ")";
  }
  function frame() {
    ticking = false;
    var y = window.scrollY, max = doc.documentElement.scrollHeight - innerHeight;
    fill.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
    if (nav) nav.classList.toggle("is-pill", y > 8);
    if (home && spySecs.length) {
      var cur = null;
      spySecs.forEach(function (s) { if (s.getBoundingClientRect().top <= 200) cur = s.dataset.section; });
      if (cur !== activeId) {
        activeId = cur; var act = null;
        navLinks.forEach(function (a) { var on = a.dataset.spy === cur; a.classList.toggle("is-active", on); if (on) act = a; });
        moveInd(act);
      }
    }
    if (lsecs.length) {
      var c = lsecs[0].id;
      lsecs.forEach(function (s) { if (s.getBoundingClientRect().top <= 170) c = s.id; });
      if (c !== tocId) { tocId = c; tocLinks.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + c); }); }
    }
    if (fine && heroEl && y < innerHeight * 1.5) {
      if (pf) pf.style.transform = "translate3d(0," + (-Math.min(y * 0.3, 40)) + "px,0)";
      if (pg) pg.style.transform = "translate3d(0," + (y * 0.1) + "px,0)";
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", function () { activeId = null; onScroll(); });
  frame();

  /* ---------- Mobile menu ---------- */
  var burger = doc.querySelector(".burger"), mnav = doc.getElementById("mnav");
  function setMenu(open) { if (!burger) return; burger.setAttribute("aria-expanded", open); mnav.classList.toggle("open", open); }
  if (burger) {
    burger.addEventListener("click", function () { setMenu(burger.getAttribute("aria-expanded") !== "true"); });
    mnav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    doc.addEventListener("click", function (e) { if (!e.target.closest(".nav")) setMenu(false); });
    matchMedia("(min-width: 769px)").addEventListener("change", function () { setMenu(false); });
  }

  /* ---------- Hero: split headline into words, cursor glow ---------- */
  var h1 = doc.querySelector("[data-words]");
  if (h1) {
    var words = h1.textContent.trim().split(/\s+/);
    h1.setAttribute("aria-label", words.join(" "));
    h1.innerHTML = words.map(function (w, i) { return '<span class="w" aria-hidden="true" style="--i:' + i + '">' + w + "</span>"; }).join(" ");
  }
  var cg = doc.querySelector(".cursor-glow");
  if (cg && fine && heroEl) {
    var tx = 0, ty = 0, cx = 0, cy = 0, run = false, on = false;
    var loop = function () {
      cx += (tx - cx) * 0.15; cy += (ty - cy) * 0.15;
      cg.style.transform = "translate3d(" + cx + "px," + cy + "px,0)";
      if (on || Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) requestAnimationFrame(loop); else run = false;
    };
    heroEl.addEventListener("mousemove", function (e) {
      var r = heroEl.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top;
      if (!on) { on = true; cx = tx; cy = ty; cg.style.opacity = 1; }
      if (!run) { run = true; requestAnimationFrame(loop); }
    });
    heroEl.addEventListener("mouseleave", function () { on = false; cg.style.opacity = 0; });
  }

  /* ---------- FAQ (one open at a time) ---------- */
  var fqs = [].slice.call(doc.querySelectorAll(".fq"));
  fqs.forEach(function (f) {
    var b = f.querySelector("button");
    b.addEventListener("click", function () {
      var open = !f.classList.contains("open");
      fqs.forEach(function (o) { o.classList.remove("open"); o.querySelector("button").setAttribute("aria-expanded", "false"); });
      if (open) { f.classList.add("open"); b.setAttribute("aria-expanded", "true"); }
    });
  });

  /* ---------- Themes toggle ---------- */
  var seg = doc.querySelector(".seg"), grid = doc.querySelector(".tgrid");
  if (seg && grid) {
    var btns = [].slice.call(seg.querySelectorAll("button"));
    var pick = function (b, focus) {
      var same = b.getAttribute("aria-checked") === "true";
      btns.forEach(function (x) { x.setAttribute("aria-checked", "false"); x.tabIndex = -1; });
      if (same && !focus) { grid.dataset.focus = "both"; btns[0].tabIndex = 0; return; }
      b.setAttribute("aria-checked", "true"); b.tabIndex = 0; grid.dataset.focus = b.dataset.t;
    };
    btns.forEach(function (b, i) {
      b.addEventListener("click", function () { pick(b); });
      b.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") n = btns[(i + 1) % btns.length];
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = btns[(i - 1 + btns.length) % btns.length];
        if (n) { e.preventDefault(); n.focus(); pick(n, true); }
      });
    });
  }

  /* ---------- Legal: "Jump to a section" dropdown ---------- */
  var jb = doc.querySelector(".jump > button"), jl = doc.querySelector(".jump ol");
  if (jb && jl) {
    jb.addEventListener("click", function () { var o = !jl.classList.contains("open"); jl.classList.toggle("open", o); jb.setAttribute("aria-expanded", o); });
    jl.addEventListener("click", function (e) { if (e.target.closest("a")) { jl.classList.remove("open"); jb.setAttribute("aria-expanded", "false"); } });
  }
})();
