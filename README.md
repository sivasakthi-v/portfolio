# Siva Sakthi V — Portfolio

Personal portfolio and case-study site for **Siva Sakthi V**, UI/UX & Product Designer.

Static, dependency-free HTML/CSS/JS. Swiss / International-Typographic-Style design language — near-monochrome palette with a single accent, Gambarino (display) + Switzer (text) via [Fontshare](https://www.fontshare.com/), fluid `clamp()` type scale, 12-column feel, accessible and fully responsive.

## Structure

```
index.html            Landing — loader, hero, work grid, about, contact
work/
  comms-ai.html       AI communications platform (content only)
  rare-india.html     Boutique travel platform (webp + mp4)
  mozy.html           Mobility app (webp)
  fabrito.html        Fabric-trade ecosystem (content only)
assets/
  css/site.css        Shared design system
  js/site.js          Loader %, scroll reveal, nav, tabs, video, lightbox
  media/              Project images & videos (renamed, URL-safe)
```

## Features

- Minimal loading animation with an animated `0 → 100%` counter and progress line
- Scroll-reveal, reading-progress bar, accessible tabs, image lightbox, click-to-play videos
- `prefers-reduced-motion` respected (loader + animations disabled)
- Semantic HTML, skip link, focus-visible styling, alt text, keyboard-operable interactions
- AA-minded contrast, mobile-first responsive layouts

## Run locally

Any static server works, e.g.:

```bash
npx serve .
# or
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy — GitHub Pages

The repo is a plain static site (no build step). Enable **Settings → Pages → Deploy from a branch → `main` / root**. `.nojekyll` is included so all folders are served as-is.

---

© 2026 Siva Sakthi V · Designed & built by Siva.
