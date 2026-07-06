/* ============================================================
   SIVA SAKTHI V — PORTFOLIO · shared behaviour
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- LOADER (% counter → curtain lift) ---------- */
  function initLoader() {
    var loader = document.getElementById('loader');
    if (!loader) { document.body.classList.add('loaded'); return; }
    if (reduce) { loader.remove(); document.body.classList.add('loaded'); return; }

    var pctEl = loader.querySelector('.loader-num');
    var fill  = loader.querySelector('.loader-fill');
    var val = 0;
    var target = 0;
    var done = false;

    // ease the counter toward a target that we nudge on a timer,
    // guaranteeing it lands on 100 shortly after window load.
    var ramp = setInterval(function () { if (target < 90) target = Math.min(90, target + Math.random() * 12); }, 180);
    window.addEventListener('load', function () { target = 100; });
    // safety: never hang the page
    setTimeout(function () { target = 100; }, 4000);

    (function tick() {
      val += (target - val) * 0.12 + 0.4;
      if (val > 100) val = 100;
      var shown = Math.floor(val);
      if (pctEl) pctEl.textContent = shown < 10 ? '0' + shown : '' + shown;
      if (fill) fill.style.right = (100 - val) + '%';
      if (val >= 99.6 && target === 100) {
        if (!done) {
          done = true;
          clearInterval(ramp);
          if (pctEl) pctEl.textContent = '100';
          if (fill) fill.style.right = '0%';
          setTimeout(function () {
            loader.classList.add('done');
            document.body.classList.add('loaded');
            setTimeout(function () { if (loader.parentNode) loader.remove(); }, 950);
          }, 260);
        }
        return;
      }
      requestAnimationFrame(tick);
    })();
  }

  /* ---------- NAV solidify on scroll ---------- */
  function initNav() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var onScroll = function () { nav.classList.toggle('solid', window.scrollY > 24); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- reading progress bar ---------- */
  function initProgress() {
    var bar = document.getElementById('progress');
    if (!bar) return;
    var onScroll = function () {
      var d = document.documentElement;
      var max = d.scrollHeight - d.clientHeight;
      bar.style.width = max > 0 ? (d.scrollTop / max) * 100 + '%' : '0%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- scroll reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* ---------- counters ---------- */
  function initCounters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    var run = function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      if (reduce) { el.textContent = target + suffix; return; }
      var start = null, dur = 1300;
      var step = function (ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.textContent = Math.floor(p * target) + suffix;
        if (p < 1) requestAnimationFrame(step); else el.textContent = target + suffix;
      };
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) { els.forEach(run); return; }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { run(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.6 });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* ---------- tabs (accessible) ---------- */
  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function (group) {
      var btns = Array.prototype.slice.call(group.querySelectorAll('[role="tab"]'));
      var select = function (btn) {
        btns.forEach(function (b) {
          var on = b === btn;
          b.setAttribute('aria-selected', on ? 'true' : 'false');
          b.tabIndex = on ? 0 : -1;
          var panel = document.getElementById(b.getAttribute('aria-controls'));
          if (panel) panel.classList.toggle('active', on);
        });
      };
      btns.forEach(function (btn, i) {
        btn.addEventListener('click', function () { select(btn); });
        btn.addEventListener('keydown', function (e) {
          var idx = null;
          if (e.key === 'ArrowRight') idx = (i + 1) % btns.length;
          else if (e.key === 'ArrowLeft') idx = (i - 1 + btns.length) % btns.length;
          if (idx !== null) { e.preventDefault(); btns[idx].focus(); select(btns[idx]); }
        });
      });
    });
  }

  /* ---------- video play overlays ---------- */
  function initVideos() {
    document.querySelectorAll('.video-holder').forEach(function (holder) {
      var video = holder.querySelector('video');
      var overlay = holder.querySelector('.video-overlay');
      if (!video || !overlay) return;
      var play = function () {
        video.play();
        overlay.classList.add('hidden');
      };
      overlay.addEventListener('click', play);
      video.addEventListener('click', function () {
        if (video.paused) { video.play(); overlay.classList.add('hidden'); }
        else { video.pause(); overlay.classList.remove('hidden'); }
      });
    });
  }

  /* ---------- lightbox ---------- */
  function initLightbox() {
    var box = document.getElementById('lightbox');
    if (!box) return;
    var img = box.querySelector('img');
    var closeBtn = box.querySelector('.lb-close');
    var lastFocus = null;
    var open = function (src, alt) {
      img.src = src; img.alt = alt || '';
      box.classList.add('open');
      box.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lastFocus = document.activeElement;
      closeBtn.focus();
    };
    var close = function () {
      box.classList.remove('open');
      box.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      img.src = '';
      if (lastFocus) lastFocus.focus();
    };
    document.querySelectorAll('[data-zoom]').forEach(function (el) {
      var trigger = el.querySelector('img') || el;
      el.style.cursor = 'zoom-in';
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      var fire = function () { open(trigger.getAttribute('src') || el.getAttribute('data-zoom'), trigger.getAttribute('alt')); };
      el.addEventListener('click', fire);
      el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fire(); } });
    });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && box.classList.contains('open')) close(); });
  }

  /* ---------- init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initLoader();
    initNav();
    initProgress();
    initReveal();
    initCounters();
    initTabs();
    initVideos();
    initLightbox();
  });
})();
