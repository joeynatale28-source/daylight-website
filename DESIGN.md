# Daylight website design system (v9)

Black and white only. Inter only. Structure and motion come from Dovetail, Origin, Antimetal, Linear, Framer, Clockwise, Superpower, Cosmos and VoiceOS; none of their colors or content are used.

## Tokens (CSS variables in `styles.css`)

| Token | Light theme | Dark theme (system) |
|---|---|---|
| `--bg` | #FFFFFF | #0A0A0A |
| `--surface` | #F5F5F5 | #141414 |
| `--raised` | #FFFFFF | #1A1A1A |
| `--line` | rgba(0,0,0,.08) | rgba(255,255,255,.08) |
| `--text` | #111111 | #FFFFFF |
| `--text2` | #555555 | #A1A1A1 |
| `--muted` | #888888 | #666666 |

`.on-dark` sections (hero, features, AI access, final CTA) use the dark set in both themes. Footer is #000000. The theme follows `prefers-color-scheme` through pure CSS, so there is no flash and it flips live with a 200ms crossfade. The nav bar and pill are dark in both themes (white logo, white "Open Daylight" pill).

## Type (Inter 400/500/600/700/800)
Display `clamp(48px,7vw,80px)`/1.05/-0.03em/700 · H2 `clamp(32px,4vw,48px)`/1.1/-0.02em/700 · deep-dive headline `clamp(34px,4.4vw,56px)` · H3 20/1.3/600 · eyebrow 13/600/0.12em caps · body 17/1.6 · small 15/1.5 · buttons 15/600. Legal: body 17/1.7, H2 24/700, H3 19/600.

## Spacing, radii, shadows
8px base. Section padding 120 / 80 / 64 (desktop / tablet / phone), equal top and bottom. Container 1120, side padding 24 (16 on phones). Card padding 24, grid gap 16. Frames: radius 12, shadow `0 24px 64px rgba(0,0,0,.18)`. Cards and glass cards: radius 16. Buttons and pills: 999px.

## Page rhythm
Hero (dark) → Features (dark, glass cards) → Sharing (surface) → AI access (dark) → Themes (bg) → FAQ (bg, hairline above) → Final CTA (dark, hairline above) → Footer (#000).

## Components
- **Nav**: one shared component injected by `script.js`. 64px bar with hairline at rest; past 8px scroll it condenses to a floating pill (rgba(24,24,24,.88), blur, no outline). One "Open Daylight" button, no log in. Hamburger below 768px.
- **Frames**: browser-chrome placeholders sized to the real screenshot aspect ratios: hero 8:5, sharing 7:5, AI access 7:5, theme frames 4:3. Replace the `.frame-body` contents with an `<img>` of the same ratio and the layout does not move.
- **Reveal system**: `data-reveal` plus `data-stagger`, one IntersectionObserver, once per element. Entrances use `cubic-bezier(.16,1,.3,1)`, 190–320ms, transform and opacity only (FAQ height is the one exception). Reduced motion collapses everything to a 100ms fade.

## Pages
`/` home · `/privacy/` and `/tos/` placeholder legal shells (11 and 17 sections) · `/404.html`. All links are relative, so the site works unchanged under `/daylight-website/` and on a custom domain.
