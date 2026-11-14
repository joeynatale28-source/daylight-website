# Daylight design system

## Direction

Monochrome, editorial, and deliberately quiet. The full site uses a dark hero and alternating light/dark editorial sections, with Linear-style modular feature storytelling and Resend-like focused product narratives. Copy stays specific to Daylight; no testimonials, counts, ratings, or pricing are invented.

## Tokens

### Type

- Font: Inter webfont, weights 400, 500, 600, 700, 800.
- Display: `clamp(48px, 7vw, 80px)`, 1.05, `-0.03em`, 700.
- H2: `clamp(32px, 4vw, 48px)`, 1.1, `-0.02em`, 700.
- H3: `20px`, 1.3, 600.
- Eyebrow: `13px`, 600, `0.12em`, uppercase.
- Body: `17px`, 1.6, 400.
- Small: `15px`, 1.5, 400.
- Buttons: `15px`, 600.

### Light theme

```css
--bg: #FFFFFF;
--surface: #F5F5F5;
--hairline: rgba(0,0,0,0.08);
--text: #111111;
--secondary: #555555;
--muted: #888888;
--hero: #0A0A0A;
--hero-text: #FFFFFF;
--hero-line: rgba(255,255,255,0.08);
```

### Dark theme

```css
--bg: #0A0A0A;
--surface: #141414;
--raised: #1A1A1A;
--hairline: rgba(255,255,255,0.08);
--text: #FFFFFF;
--secondary: #A1A1A1;
--muted: #666666;
--hero: #0A0A0A;
--hero-text: #FFFFFF;
--hero-line: rgba(255,255,255,0.08);
```

## Page structure

1. Hero with product placeholder.
2. Essentials feature grid: calendar views, tasks, and sharing.
3. Sharing narrative with browser placeholder.
4. AI access narrative with scoped-permission activity panel.
5. Theme statement.
6. FAQ.
7. Closing CTA and footer.
8. Standalone Terms of Service and Privacy Policy routes.

## Motion and layout

- Container: `1120px` max, centered; `24px` side padding, `16px` on phone.
- Hero rhythm remains 24 / 16 / 40 / 24 / 80px between its groups.
- Product frames use 8:5 proportions, 12px radius, and `0 24px 64px rgba(0,0,0,0.18)`.
- Entrances use `cubic-bezier(0.16, 1, 0.3, 1)` and stay under 400ms.
- Section reveals use opacity and translateY only. Reduced motion removes reveal motion, cursor glow, and parallax.
- Theme follows `prefers-color-scheme`; colors crossfade over 200ms.
