// Hero word rotation: the word and its period are one unit inside a fixed-width slot.
(function () {
  var words = document.querySelectorAll('#slot .w');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!words.length || reduce) return;
  var i = 0;
  setInterval(function () {
    words[i].classList.remove('on');
    i = (i + 1) % words.length;
    words[i].classList.add('on');
  }, 2600);
})();

// Accordions: one open at a time per group.
document.querySelectorAll('[data-acc]').forEach(function (group) {
  group.querySelectorAll('.row > button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      group.querySelectorAll('.row > button').forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling.hidden = true;
      });
      if (!open) {
        btn.setAttribute('aria-expanded', 'true');
        btn.nextElementSibling.hidden = false;
      }
    });
  });
});
