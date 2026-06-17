// 彩可 CHROMA COCOA — interactions
(function () {
  'use strict';

  // current year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav[aria-label="主選單"]');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // shop colour filter
  var chips = document.querySelectorAll('.filter-bar .chip');
  var grid = document.getElementById('shop-grid');
  var emptyNote = document.getElementById('empty-note');
  if (chips.length && grid) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('is-active'); });
        chip.classList.add('is-active');
        var f = chip.getAttribute('data-filter');
        var shown = 0;
        grid.querySelectorAll('.prod-card').forEach(function (card) {
          var match = f === 'all' || card.getAttribute('data-color') === f;
          card.style.display = match ? '' : 'none';
          if (match) shown++;
        });
        if (emptyNote) emptyNote.hidden = shown !== 0;
      });
    });
  }

  // contact form (preview, no backend)
  var form = document.getElementById('contact-form');
  var note = document.getElementById('form-note');
  if (form && note) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      note.hidden = false;
      form.querySelector('button[type="submit"]').textContent = '已送出';
      note.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
})();
