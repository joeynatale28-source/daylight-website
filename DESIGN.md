# Daylight website design system (v8)

## Research and direction
Looked up and studied on Mobbin (plus the live VoiceOS site) before this round:

| Site | Why it earned a place | What is copied |
|---|---|---|
| Cron Calendar | The one monochrome calendar homepage | Centered huge headline, one CTA, the product frame as the hero's lower half |
| Clockwise | Calendar product with real UI beside copy | Split feature rows: product visual on one side, short headline + copy on the other |
| Notion | Calendar-adjacent, restrained | A single large product frame under the headline; quiet monochrome chrome |
| Linear | Strictest dark system | Hairlines, split headers with numbered deep-dives, glow on black |
| Resend | Editorial type | Serif display headlines, closing CTA with a giant watermark, column footer |
| VoiceOS (live) | Light, airy, frosted | Floating frosted pill nav on scroll, big radii, pale frosted panels, caption pill on a visual |

Direction: a LIGHT page (VoiceOS / Notion / Clockwise) with SERIF display headlines (Resend) and two dark sections, AI access and the closing CTA (Cron / Linear / Resend). Black and white only; the frost is monochrome grey; no accent color. Product visuals currently ship as labeled placeholder frames at the exact capture sizes (hero 1600x1000, sharing and AI 1400x1000, themes 1200x900) and swap to the real PNGs in `assets/screenshots/` automatically.


A LIGHT page with SERIF display headlines and frosted-glass panels. VoiceOS gives the feel (light, airy, floating frosted pill nav, big radii, pale frosted panels, rounded visuals with a dark caption pill). Resend gives the type and structure (Didone-style serif headlines, hairlines, plain-text feature columns, dark pill CTAs, closing CTA with a giant watermark wordmark, column footer). The AI access section and the closing CTA are the only dark sections. No other colors; the frost is monochrome grey.

## Themes (system only, CSS, no flash)
| Token | Light | Dark |
|---|---|---|
| `--bg` | #FFFFFF | #0A0A0A |
| `--surface` / `--frost` | #F5F5F5 | #141414 |
| `--raised` | #FFFFFF | #1A1A1A |
| `--line` | rgba(0,0,0,.08) | rgba(255,255,255,.08) |
| `--text` / `--text-2` / `--muted` | #111 / #555 / #888 | #FFF / #A1A1A1 / #666 |
| `--pill-bg` (scrolled nav) | rgba(255,255,255,.88) | rgba(24,24,24,.88) |
| `--p-bg` / `--p-fg` | #111 / #FFF | #FFF / #0A0A0A |
| `--accent` (focus rings only) | #1A73E8 | #8AB4F8 |
Dark sections (AI access, CTA): #0A0A0A (#050505 in dark theme); footer #000.

## Type
Display and H2 headlines: Instrument Serif 400 (fallback Georgia), never a sans. Everything else: Inter 400–800. Display clamp(56px,8vw,96px)/1.05; H2 clamp(36px,5vw,56px); deep-dive H2 clamp(40px,4.6vw,56px); CTA H2 clamp(48px,6.4vw,72px); H3 20px/600; eyebrow 13px/600/.12em; body 17px/1.6. Wordmark: serif 24px.

## Spacing and shape
8px base; section padding 120 / 80 / 64px; container 1120px. Panels: 32px top radius, rising over the previous section (`.round-top`, -32px overlap). Visuals: radius 24px, hairline border, soft shadow. Pills 999px.

## Components
One "Open Daylight" button in the nav (bar at rest, floating frosted pill on scroll, no outline, tone follows the section beneath). Hero: badge, serif headline, ONE solid pill CTA, microcopy, rounded frame fading to white. Features: centered header, rounded visual with dark caption pill, 3x2 plain-text columns. Sharing: frosted card with staggered white action pills + serif headline, numbered 2-column list with vertical hairline. AI access: mirrored split on black with glow. FAQ: hairline rows. CTA: serif headline, two pills, giant watermark. Product frames (`.shotframe`) show a labeled placeholder until the real PNG (`hero.png`, `sharing.png`, `ai.png`, `theme-light.png`, `theme-dark.png` in `assets/screenshots/`) loads, then show the image.

## Motion
160–260ms; `cubic-bezier(.16,1,.3,1)`; hero stagger 80ms, 12px rise; reveals once at 15%; reduced motion removes movement.
