# daylight website

A static marketing site for Daylight: plain HTML, CSS and JS with no build step and no dependencies. It lives at the repo root so GitHub Pages (main / root) publishes it directly.

- `index.html`, `privacy/index.html`, `tos/index.html`, `404.html` share `styles.css` and `script.js` (nav, footer, motion).
- Product visuals are labeled placeholder frames. To use a real screenshot, put an `<img>` with the same aspect ratio inside the frame's `.frame-body`. Ratios: hero 8:5 (1600×1000), sharing and AI access 7:5 (1400×1000), light and dark theme 4:3 (1200×900).
- See `DESIGN.md` for the design system.
