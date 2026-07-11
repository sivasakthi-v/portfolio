/* ============================================================
   SIVA SAKTHI V — PORTFOLIO · shared behaviour
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- LOADER (number counter → curtain lift) ---------- */
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

  /* ---------- hover glyph motion trail (hero + footer) ---------- */
  function initTrail() {
    if (reduce) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    var layer = document.createElement('div');
    layer.className = 'trail-layer';
    layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);

    var shapes = [
      '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="currentColor"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="7"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 4v16M4 12h16"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 5 L19 19 L5 19 Z"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 16 A8 8 0 0 1 20 16"/></svg>',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 4 L20 12 L12 20 L4 12 Z"/></svg>'
    ];
    var last = 0;
    function spawn(x, y, dark) {
      var g = document.createElement('span');
      g.className = 'trail-glyph';
      g.innerHTML = shapes[(Math.random() * shapes.length) | 0];
      var size = 10 + Math.random() * 12;
      g.style.left = x + 'px'; g.style.top = y + 'px';
      g.style.width = size + 'px'; g.style.height = size + 'px';
      g.style.color = Math.random() < 0.28 ? 'var(--accent)' : (dark ? 'rgba(237,234,225,0.5)' : 'rgba(20,19,15,0.45)');
      layer.appendChild(g);
      var dx = (Math.random() - 0.5) * 44, dy = 42 + Math.random() * 64, rot = (Math.random() - 0.5) * 140;
      var anim = g.animate([
        { transform: 'translate(-50%,-50%) scale(0.5) rotate(0deg)', opacity: 0 },
        { opacity: 0.85, offset: 0.16 },
        { transform: 'translate(calc(-50% + ' + dx + 'px), calc(-50% + ' + dy + 'px)) scale(1) rotate(' + rot + 'deg)', opacity: 0 }
      ], { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(0.22,1,0.36,1)' });
      anim.onfinish = function () { g.remove(); };
    }
    if (!('animate' in document.createElement('span'))) return;
    document.addEventListener('pointermove', function (e) {
      var now = performance.now();
      if (now - last < 70) return;
      last = now;
      var el = document.elementFromPoint(e.clientX, e.clientY);
      var dark = !!(el && el.closest && el.closest('.site-footer, .cs-section.dark, .nav-pill.open, .cs-cover.dark, .pop, .tpop'));
      spawn(e.clientX, e.clientY, dark);
    }, { passive: true });
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

    // initial desktop layout: an evenly-spaced horizontal row below the fixed hero
    if (free) {
      var heroEl = canvas.querySelector('.pg-hero');
      var pad = 40;
      var topY = heroEl ? heroEl.offsetTop + heroEl.offsetHeight + 40 : 40;
      var cw = canvas.clientWidth;
      var widths = stickers.map(function (s) { return s.offsetWidth; });
      var totalW = widths.reduce(function (a, b) { return a + b; }, 0);
      var n = stickers.length;
      var gap = n > 1 ? (cw - 2 * pad - totalW) / (n - 1) : 0;
      if (gap < 20) { gap = 20; pad = Math.max(20, (cw - totalW - gap * (n - 1)) / 2); }
      var x = pad;
      stickers.forEach(function (s, i) {
        s.style.left = Math.round(Math.max(0, Math.min(cw - widths[i], x))) + 'px';
        s.style.top = topY + 'px';
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
        if (free) { try { s.setPointerCapture(e.pointerId); } catch (_) {} }
        sx = e.clientX; sy = e.clientY;
        ox = parseFloat(s.style.left) || 0; oy = parseFloat(s.style.top) || 0;
        if (free) s.classList.add('dragging');
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
      var end = function (e, allowOpen) {
        if (!dragging) return;
        dragging = false;
        s.classList.remove('dragging');
        try { s.releasePointerCapture(e.pointerId); } catch (_) {}
        if (allowOpen && !moved) openPop(s.getAttribute('data-app'));
      };
      s.addEventListener('pointerup', function (e) { end(e, true); });
      // pointercancel fires when a touch turns into a page scroll — reset, never treat as a tap
      s.addEventListener('pointercancel', function (e) { end(e, false); });
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
        loadSprite: true
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

    // hide the rail once the reading ends (prev/next or footer in view)
    var endEls = document.querySelectorAll('.cs-nav, .site-footer');
    if (endEls.length) {
      var eo = new IntersectionObserver(function (es) {
        var hit = false;
        es.forEach(function (e) { if (e.isIntersecting) hit = true; });
        // recompute across all observed (any intersecting hides)
        toc.classList.toggle('toc-hide', hit || anyIntersecting());
      }, { rootMargin: '0px 0px -15% 0px' });
      var observed = [];
      endEls.forEach(function (el) { eo.observe(el); observed.push(el); });
      function anyIntersecting() {
        return observed.some(function (el) {
          var r = el.getBoundingClientRect();
          return r.top < window.innerHeight && r.bottom > 0;
        });
      }
    }
  }

  /* ---------- auto marquee (seamless loop, pause on hover) ---------- */
  function initMarquee() {
    document.querySelectorAll('.marquee').forEach(function (m) {
      var track = m.querySelector('.marquee-track');
      if (!track || track.dataset.cloned) return;
      var kids = [].slice.call(track.children);
      kids.forEach(function (k) {
        var c = k.cloneNode(true);
        c.setAttribute('aria-hidden', 'true');
        c.tabIndex = -1;
        track.appendChild(c);
      });
      track.dataset.cloned = '1';
    });
  }

  /* ---------- testimonials flip popup ---------- */
  function initTestimonials() {
    var pop = document.getElementById('tpop');
    if (!pop) return;
    var card = pop.querySelector('.tpop-card');
    var closeBtn = pop.querySelector('.pop-close');
    var lastFocus = null;
    var fill = function (d) {
      card.querySelector('.tpop-quote').textContent = '“' + d.quote + '”';
      card.querySelector('.tpop-name').textContent = d.name;
      card.querySelector('.tpop-role').textContent = d.role + ' · ' + d.company;
      card.querySelector('.tpop-year').textContent = d.year;
      var initials = d.name.split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
      card.querySelector('.tpop-avatar').textContent = initials;
    };
    var open = function (d) {
      fill(d);
      pop.classList.add('open');
      pop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lastFocus = document.activeElement;
      closeBtn.focus();
    };
    var close = function () {
      pop.classList.remove('open');
      pop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };
    document.querySelectorAll('.tcard').forEach(function (c) {
      var fire = function () {
        open({
          quote: c.getAttribute('data-quote'), name: c.getAttribute('data-name'),
          role: c.getAttribute('data-role'), company: c.getAttribute('data-company'),
          year: c.getAttribute('data-year')
        });
      };
      c.addEventListener('click', fire);
      c.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fire(); } });
    });
    closeBtn.addEventListener('click', close);
    pop.addEventListener('click', function (e) { if (e.target === pop) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && pop.classList.contains('open')) close(); });
  }

  /* ---------- offset (fanned) sticky-stack cards ---------- */
  function initStickyCards() {
    if (window.matchMedia('(max-width: 760px)').matches) return;
    document.querySelectorAll('.work-list').forEach(function (list) {
      var items = list.querySelectorAll('.work-item');
      items.forEach(function (it, i) {
        it.style.position = 'sticky';
        it.style.top = (98 + i * 16) + 'px';
        it.style.zIndex = String(i + 1);
      });
    });
  }

  /* ---------- blog detail: bottom-right progress + section sheet (mobile/tablet) ---------- */
  function initBlogFab() {
    var toc = document.querySelector('.toc');
    if (!toc) return;
    var links = [].slice.call(toc.querySelectorAll('a[href^="#"]'));
    if (!links.length) return;

    var fab = document.createElement('div');
    fab.className = 'cs-fab';
    fab.innerHTML =
      '<button class="cs-fab-btn" aria-label="Jump to section" aria-expanded="false">' +
        '<svg class="cs-fab-ring" viewBox="0 0 40 40" aria-hidden="true"><circle class="ring-bg" cx="20" cy="20" r="17"/><circle class="ring-fg" cx="20" cy="20" r="17"/></svg>' +
        '<span class="cs-fab-ic"><i data-lucide="list"></i></span>' +
      '</button>' +
      '<nav class="cs-sheet" aria-label="Sections"><ol></ol></nav>';
    var ol = fab.querySelector('ol');
    links.forEach(function (a) {
      var li = document.createElement('li');
      var b = document.createElement('a');
      b.href = a.getAttribute('href');
      var txt = a.querySelector('.txt');
      b.textContent = txt ? txt.textContent : a.textContent.trim();
      li.appendChild(b); ol.appendChild(li);
    });
    document.body.appendChild(fab);

    var btn = fab.querySelector('.cs-fab-btn');
    var ring = fab.querySelector('.ring-fg');
    var circ = 2 * Math.PI * 17;
    ring.style.strokeDasharray = circ;
    ring.style.strokeDashoffset = circ;
    var setOpen = function (o) { fab.classList.toggle('open', o); btn.setAttribute('aria-expanded', o ? 'true' : 'false'); };
    btn.addEventListener('click', function () { setOpen(!fab.classList.contains('open')); });
    fab.querySelectorAll('.cs-sheet a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('click', function (e) { if (fab.classList.contains('open') && !fab.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    var onScroll = function () {
      var d = document.documentElement;
      var max = d.scrollHeight - d.clientHeight;
      var p = max > 0 ? d.scrollTop / max : 0;
      ring.style.strokeDashoffset = circ * (1 - p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- dithered covers: B/W ordered-dither with a mouse-tracked colour spotlight ---------- */
  function initDitherCovers() {
    var bayer = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
    var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    document.querySelectorAll('.dcover').forEach(function (wrap) {
      var img = wrap.querySelector('img');
      var canvas = wrap.querySelector('canvas');
      if (!img || !canvas) return;
      var ctx = canvas.getContext('2d');

      function render() {
        var w = wrap.clientWidth, h = wrap.clientHeight;
        if (!w || !h || !img.naturalWidth) return;
        var cap = 1100;
        var scale = Math.min(1, cap / Math.max(w, h));
        var cw = Math.max(1, Math.round(w * scale)), ch = Math.max(1, Math.round(h * scale));
        canvas.width = cw; canvas.height = ch;
        var ir = img.naturalWidth / img.naturalHeight, cr = cw / ch, dw, dh, dx, dy;
        if (ir > cr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; dy = 0; }
        else { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2; }
        try {
          ctx.drawImage(img, dx, dy, dw, dh);
          var id = ctx.getImageData(0, 0, cw, ch), d = id.data;
          for (var y = 0; y < ch; y++) {
            for (var x = 0; x < cw; x++) {
              var i = (y * cw + x) * 4;
              var g = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
              var t = (bayer[y & 3][x & 3] + 0.5) / 16 * 255;
              if (g > t) { d[i] = 252; d[i + 1] = 248; d[i + 2] = 236; }
              else { d[i] = 30; d[i + 1] = 30; d[i + 2] = 30; }
            }
          }
          ctx.putImageData(id, 0, 0);
        } catch (e) { /* tainted canvas — leave blank, colour img shows */ }
      }

      var t;
      var onResize = function () { clearTimeout(t); t = setTimeout(render, 180); };
      if (img.complete && img.naturalWidth) render(); else img.addEventListener('load', render);
      window.addEventListener('resize', onResize);

      /* spotlight: reveal the colour photo only under the pointer */
      if (!canHover) return;
      var host = wrap.closest('section') || wrap.parentElement || wrap;
      var raf = null, px = 0, py = 0, active = false;
      var radius = function () { var r = wrap.getBoundingClientRect(); return Math.max(130, Math.min(240, r.width * 0.16)); };
      var apply = function () {
        raf = null;
        var r = wrap.getBoundingClientRect();
        canvas.style.setProperty('--mx', (px - r.left) + 'px');
        canvas.style.setProperty('--my', (py - r.top) + 'px');
      };
      host.addEventListener('pointermove', function (e) {
        if (e.pointerType === 'touch') return;
        px = e.clientX; py = e.clientY;
        if (!active) { active = true; canvas.style.setProperty('--spot', radius() + 'px'); }
        if (!raf) raf = requestAnimationFrame(apply);
      });
      host.addEventListener('pointerleave', function () {
        active = false; canvas.style.setProperty('--spot', '0px');
      });
    });
  }

  /* ---------- bucket-list to-do toggles ---------- */
  function initBucket() {
    document.querySelectorAll('.todo-item').forEach(function (li) {
      var toggle = function () {
        var done = !li.classList.contains('done');
        li.classList.toggle('done', done);
        li.setAttribute('aria-checked', done ? 'true' : 'false');
      };
      li.addEventListener('click', toggle);
      li.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
    });
  }

  /* ---------- generic flip popup (tools + out-of-work images) ---------- */
  function initDetailPop() {
    var pop = document.getElementById('dpop');
    if (!pop) return;
    var titleEl = pop.querySelector('.dpop-title');
    var subEl = pop.querySelector('.dpop-sub');
    var bodyEl = pop.querySelector('.dpop-body');
    var glyphEl = pop.querySelector('.dpop-glyph');
    var imgEl = pop.querySelector('.dpop-img');
    var closeBtn = pop.querySelector('.pop-close');
    var lastFocus = null;
    var open = function (d) {
      titleEl.textContent = d.title || '';
      subEl.textContent = d.sub || '';
      bodyEl.textContent = d.body || '';
      if (imgEl) {
        if (d.img) { imgEl.src = d.img; imgEl.hidden = false; } else { imgEl.removeAttribute('src'); imgEl.hidden = true; }
      }
      // a photo popup leads with the image, so hide the monogram glyph when one is present
      if (glyphEl) { glyphEl.hidden = !!d.img; glyphEl.textContent = d.glyph || (d.title ? d.title.slice(0, 2) : ''); }
      pop.classList.add('open');
      pop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lastFocus = document.activeElement;
      closeBtn.focus();
    };
    var close = function () {
      pop.classList.remove('open');
      pop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };
    document.querySelectorAll('[data-flip]').forEach(function (c) {
      var fire = function () {
        open({ title: c.getAttribute('data-title'), sub: c.getAttribute('data-sub'), body: c.getAttribute('data-body'), glyph: c.getAttribute('data-glyph'), img: c.getAttribute('data-img') });
      };
      c.addEventListener('click', fire);
      c.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fire(); } });
    });
    closeBtn.addEventListener('click', close);
    pop.addEventListener('click', function (e) { if (e.target === pop) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && pop.classList.contains('open')) close(); });
  }

  /* ---------- site-wide dither overlay ---------- */
  function initDither() {
    if (document.querySelector('.dither-overlay')) return;
    var d = document.createElement('div');
    d.className = 'dither-overlay';
    d.setAttribute('aria-hidden', 'true');
    document.body.appendChild(d);
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
    initStickyCards();
    initBlogFab();
    initMarquee();
    initTestimonials();
    initDetailPop();
    initBucket();
    initDitherCovers();
    initTrail();
    initDither();
    initLucide();
  });
})();
