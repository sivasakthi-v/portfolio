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

  /* ---------- NAV (legacy solidify + pill mobile menu) ---------- */
  function initNav() {
    var legacy = document.querySelector('.nav');
    if (legacy) {
      var onScroll = function () { legacy.classList.toggle('solid', window.scrollY > 24); };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
    var pill = document.querySelector('.nav-pill');
    if (!pill) return;
    var toggle = pill.querySelector('.nav-toggle');
    var menu = pill.querySelector('.nav-links');
    if (!toggle || !menu) return;
    var setOpen = function (open) {
      pill.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    toggle.addEventListener('click', function () { setOpen(!pill.classList.contains('open')); });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('click', function (e) { if (pill.classList.contains('open') && !pill.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  }

  /* ---------- Lucide icons (+ inline brand glyphs Lucide dropped) ---------- */
  function initLucide() {
    var sv = 'viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true" focusable="false"';
    var brands = {
      linkedin: '<svg ' + sv + '><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.73v20.54C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .78 23.2 0 22.22 0z"/></svg>',
      behance: '<svg ' + sv + '><path d="M22 7h-5V5.5h5V7zm-3.5 3c1.93 0 3.5 1.57 3.5 3.5 0 .17-.01.33-.04.5h-5.42c.14.86.79 1.5 1.96 1.5.6 0 1.1-.2 1.4-.5H21c-.5 1.3-1.7 2-3.5 2-2.2 0-3.5-1.5-3.5-3.5S16.3 10 18.5 10zm-1.46 2.5h2.92c-.15-.7-.7-1.1-1.46-1.1s-1.31.4-1.46 1.1zM7.5 6c1.9 0 3 .9 3 2.6 0 .9-.4 1.5-1.1 1.9.9.4 1.4 1.1 1.4 2.1 0 1.8-1.3 2.9-3.3 2.9H2V6h5.5zM4.5 9.5h2.6c.7 0 1.1-.3 1.1-.9s-.4-.9-1.1-.9H4.5v1.8zm0 4.3h2.8c.8 0 1.2-.4 1.2-1s-.4-1-1.2-1H4.5v2z"/></svg>',
      figma: '<svg ' + sv + '><path d="M8 24a4 4 0 0 0 4-4v-4H8a4 4 0 1 0 0 8zm-4-8a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4zm0-8a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4zm8-8h4a4 4 0 1 1 0 8h-4V0zm0 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"/></svg>',
      framer: '<svg ' + sv + '><path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/></svg>'
    };
    document.querySelectorAll('i[data-lucide]').forEach(function (el) {
      var n = el.getAttribute('data-lucide');
      if (brands[n]) {
        var span = document.createElement('span');
        span.className = 'brand-ic';
        span.setAttribute('aria-hidden', 'true');
        span.innerHTML = brands[n];
        el.replaceWith(span);
      }
    });
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  /* ---------- hero cursor-reactive wave ---------- */
  function initHeroWave() {
    var canvas = document.querySelector('.hero-wave');
    if (!canvas || reduce) return;
    var hero = canvas.closest('.hero') || canvas.parentElement;
    var ctx = canvas.getContext('2d');
    var w = 0, h = 0;
    var mouse = { x: 0.5, y: 0.5, active: 0 };
    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = (e.clientY - r.top) / r.height;
      mouse.active = 1;
    });
    hero.addEventListener('pointerleave', function () { mouse.active = 0; });
    var t = 0, hov = 0, lines = 5;
    (function draw() {
      t += 0.006;
      hov += ((mouse.active ? 1 : 0) - hov) * 0.05;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < lines; i++) {
        var yBase = h * (0.22 + 0.56 * (i / (lines - 1)));
        ctx.beginPath();
        for (var x = 0; x <= w; x += 8) {
          var nx = x / w;
          var amp = 7 + 15 * hov;
          var dist = Math.abs(nx - mouse.x);
          var bump = (1 - Math.min(dist * 3, 1)) * 28 * hov;
          var y = yBase + Math.sin(nx * 6 + t * 4 + i) * amp + Math.sin(nx * 12 - t * 3) * 4 - bump * Math.sin(mouse.y * 3.14159);
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = (i === 2)
          ? 'rgba(222,59,33,' + (0.10 + 0.16 * hov) + ')'
          : 'rgba(20,19,15,' + (0.045 + 0.05 * hov) + ')';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      requestAnimationFrame(draw);
    })();
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

  /* ---------- rolling words ---------- */
  function initRoller() {
    document.querySelectorAll('.roll[data-words]').forEach(function (el) {
      var words = el.getAttribute('data-words').split('|').map(function (w) { return w.trim(); }).filter(Boolean);
      if (words.length < 2) return;
      var i = 0;
      var longest = words.reduce(function (a, b) { return b.length > a.length ? b : a; }, '');
      // reserve width to avoid layout shift
      el.style.minWidth = longest.length + 'ch';
      if (reduce) return;
      setInterval(function () {
        i = (i + 1) % words.length;
        el.classList.remove('swap');
        // force reflow to restart animation
        void el.offsetWidth;
        el.textContent = words[i];
        el.classList.add('swap');
      }, 2600);
    });
  }

  /* ---------- playground canvas (drag + flip popup) ---------- */
  function initPlayground() {
    var canvas = document.getElementById('canvas');
    var pop = document.getElementById('pop');
    if (!canvas || !pop) return;

    var stickers = [].slice.call(canvas.querySelectorAll('.sticker'));
    var cards = [].slice.call(pop.querySelectorAll('.pop-card'));
    var closeBtn = pop.querySelector('.pop-close');
    var lastFocus = null;
    var free = window.matchMedia('(min-width: 761px)').matches;

    // initial desktop layout: an evenly-spaced horizontal row, 40px below the hero
    if (free) {
      var heroEl = document.querySelector('.pg-hero');
      var pad = 40;
      var cw = canvas.clientWidth, ch = canvas.clientHeight;
      var topY = heroEl ? heroEl.getBoundingClientRect().bottom + 40 : Math.round(ch * 0.32);
      var widths = stickers.map(function (s) { return s.offsetWidth; });
      var totalW = widths.reduce(function (a, b) { return a + b; }, 0);
      var n = stickers.length;
      var gap = n > 1 ? (cw - 2 * pad - totalW) / (n - 1) : 0;
      if (gap < 16) { gap = 16; pad = Math.max(16, (cw - totalW - gap * (n - 1)) / 2); }
      var x = pad;
      stickers.forEach(function (s, i) {
        var sh = s.offsetHeight;
        s.style.left = Math.round(Math.max(0, Math.min(cw - widths[i], x))) + 'px';
        s.style.top = Math.round(Math.max(0, Math.min(ch - sh - 20, topY))) + 'px';
        x += widths[i] + gap;
      });
    }

    function openPop(app) {
      cards.forEach(function (c) { c.hidden = c.getAttribute('data-app') !== app; });
      pop.classList.add('open');
      document.body.style.overflow = 'hidden';
      lastFocus = document.activeElement;
      closeBtn.focus();
    }
    function closePop() {
      pop.classList.remove('open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }

    stickers.forEach(function (s) {
      var sx, sy, ox, oy, moved = false, dragging = false;
      s.addEventListener('pointerdown', function (e) {
        dragging = true; moved = false;
        try { s.setPointerCapture(e.pointerId); } catch (_) {}
        sx = e.clientX; sy = e.clientY;
        ox = parseFloat(s.style.left) || 0; oy = parseFloat(s.style.top) || 0;
        s.classList.add('dragging');
      });
      s.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        var dx = e.clientX - sx, dy = e.clientY - sy;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) moved = true;
        if (canvas.classList.contains('free')) {
          var cw = canvas.clientWidth, ch = canvas.clientHeight, sw = s.offsetWidth, sh = s.offsetHeight;
          s.style.left = Math.max(0, Math.min(cw - sw, ox + dx)) + 'px';
          s.style.top = Math.max(0, Math.min(ch - sh, oy + dy)) + 'px';
        }
      });
      var end = function (e) {
        if (!dragging) return;
        dragging = false;
        s.classList.remove('dragging');
        try { s.releasePointerCapture(e.pointerId); } catch (_) {}
        if (!moved) openPop(s.getAttribute('data-app'));
      };
      s.addEventListener('pointerup', end);
      s.addEventListener('pointercancel', end);
      s.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPop(s.getAttribute('data-app')); }
      });
    });

    if (free) canvas.classList.add('free');

    closeBtn.addEventListener('click', closePop);
    pop.addEventListener('click', function (e) { if (e.target === pop) closePop(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && pop.classList.contains('open')) closePop(); });
  }

  /* ---------- Plyr video players ---------- */
  function initPlyr() {
    var vids = document.querySelectorAll('.js-player');
    if (!vids.length || typeof window.Plyr === 'undefined') return;
    vids.forEach(function (v) {
      new window.Plyr(v, {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        resetOnEnd: true,
        hideControls: true,
        loadSprite: false,
        iconUrl: 'https://cdn.plyr.io/3.7.8/plyr.svg'
      });
      var frame = v.closest('.media-frame');
      if (frame) frame.classList.add('has-player');
    });
  }

  /* ---------- section nav (scroll-spy TOC) ---------- */
  function initToc() {
    var toc = document.querySelector('.toc');
    if (!toc) return;
    var links = [].slice.call(toc.querySelectorAll('a[href^="#"]'));
    if (!links.length) return;
    var map = {};
    var targets = [];
    links.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if (el) { map[id] = a; targets.push(el); }
    });
    if (!targets.length || !('IntersectionObserver' in window)) return;
    var current = null;
    var setActive = function (id) {
      if (current === id) return;
      current = id;
      links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + id); });
    };
    var obs = new IntersectionObserver(function (entries) {
      // pick the entry nearest the top that is intersecting
      var visible = entries.filter(function (e) { return e.isIntersecting; });
      if (visible.length) {
        visible.sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
        setActive(visible[0].target.id);
      }
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    targets.forEach(function (t) { obs.observe(t); });
  }

  /* ---------- back to top ---------- */
  function initScrollTop() {
    document.querySelectorAll('[data-scroll-top]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      });
    });
  }

  /* ---------- init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initScrollTop();
    initLoader();
    initNav();
    initProgress();
    initReveal();
    initCounters();
    initTabs();
    initVideos();
    initLightbox();
    initRoller();
    initPlayground();
    initPlyr();
    initToc();
    initHeroWave();
    initLucide();
  });
})();
