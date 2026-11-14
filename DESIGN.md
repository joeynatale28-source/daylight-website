# Daylight design system — nav + hero

## Direction

Monochrome, editorial, and deliberately quiet. The navigation is a real bar at rest and condenses to an opaque frosted pill after 8px of scroll. The hero borrows the centered, high-contrast rhythm of Dovetail/Cron and the calendar-product framing of Clockwise without copying their colors or copy.

## Tokens

### Type

- Font: Inter webfont, weights 400, 500, 600, 700, 800.
- Display: `clamp(48px, 7vw, 80px)`, 1.05, `-0.03em`, 700.
- H2: `clamp(32px, 4vw, 48px)`, 1.1, `-0.02em`, 700.
- H3: `20px`, 1.3, 600.
- Eyebrow: `13px`, 600, `0.12em`, uppercase where used as a label.
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

## Layout and motion

- Container: `1120px` max, centered; `24px` side padding, `16px` on phone.
- Hero rhythm: 24px pill→headline, 16px headline→subcopy, 40px subcopy→buttons, 24px buttons→trust, 80px trust→frame.
- Product frame: 8:5, max 960px, 12px top radius, `0 24px 64px rgba(0,0,0,0.18)`.
- Entrances use `cubic-bezier(0.16, 1, 0.3, 1)` and stay under 400ms. Scroll parallax affects only the frame and grid. Reduced motion removes cursor glow and parallax.
- Theme follows `prefers-color-scheme`; color changes crossfade over 200ms.
