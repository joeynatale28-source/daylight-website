# Daylight website design system (v2)

Direction: calm, precise, strictly black and white. Pacing and type discipline from Cron (huge tight headline, app frame overlapping a dark hero), Vercel (hairlines, tiny uppercase labels, medium-weight grotesque) and Linear (dark glass hero, arrowed CTA, footer as its own slab). The skin is Daylight's own. All tokens live as CSS variables at the top of `styles.css`; pages use names, never raw values.

## Color
| Token | Value | Role |
|---|---|---|
| `--bg` | #fff | light sections, footer |
| `--bg-alt` | #f5f5f5 | alternate light bands, chips, glance box |
| `--ink` | #0a0a0a | headings, primary buttons on light |
| `--ink-2` | #444 | body text on light (AA) |
| `--ink-3` | #6b6b6b | labels, captions, muted spans (AA) |
| `--line` / `--line-2` | #e5e5e5 / #d0d0d0 | hairlines / stronger borders |
| `--dk` | #0a0a0a | dark sections (hero, AI access, final CTA) |
| `--dk-ink` / `-2` / `-3` | #fafafa / #b3b3b3 / #8f8f8f | text on dark |
| `--dk-line` / `-2` | rgba(255,255,255,.1/.2) | hairlines on dark |
| `--accent` / `--accent-dk` | #1a73e8 / #8ab4f8 | the app's own link and focus accent only (focus rings, link underlines) |

No other color. Depth comes from weight, size, spacing, hairlines, soft white glows and glass on dark.

## Typography
Inter only (400, 500, 600, 700, 800), loaded from Google Fonts with a system fallback stack.
- `.display` hero: clamp(42px, 9.2vw, 104px), 800, -0.045em, line-height 1.0
- `.display-2` final CTA: clamp(40px, 7vw, 88px), 800
- `.h2` deep-dive headings: clamp(32px, 4.6vw, 56px), 700; `.h2-s` section titles: clamp(30px, 4vw, 46px), 600
- Mixed weight: first clause in ink at full weight, second clause in `--ink-3` / `--dk-ink-3` (hero uses grey "minus the" and a marker highlight on "clutter.")
- `h3`: 19px / 600. `.lede`: clamp(17px, 1.7vw, 20px), 1.6. Body 17px / 1.65.
- `.eyebrow`: 12px, 600, uppercase, .14em tracking, with a small square marker.

## Spacing (8px base)
`--s1` 8, `--s2` 16, `--s3` 24, `--s4` 32, `--s5` 40, `--s6` 48, `--s8` 64, `--s10` 80, `--s12` 96. Section padding `--sec` = clamp(72px, 9vw, 120px), equal top and bottom everywhere. Content width 1120px, gutter 24px (20px on phones). Stack rhythm: eyebrow 16 → heading 24 → lede.

## Shape and depth
Radius: `--r1` 8, `--r2` 12, `--r3` 20, `--pill` 999. Shadow: `--sh1` (cards at rest), `--sh2` (hover and framed visuals), `--shadow-frame` (hero product frame). Nothing larger.

## Motion
Timing `--t1` 160ms, `--t2` 220ms, `--t3` 260ms. Entrances ease-out `cubic-bezier(.23,1,.32,1)`, exits ease-in `cubic-bezier(.4,0,1,1)`. Hero fades and rises in sequence (190ms each, 80ms stagger); sections fade and rise once on scroll; buttons and cards lift on hover; the FAQ animates open and closed. `prefers-reduced-motion` turns all movement off.

## Components
- Nav: fixed, backdrop blur plus hairline, shadow after scroll, switches dark/light with the section beneath it (`data-nav` on sections). Hamburger below 768px opens a full overlay menu.
- Buttons: one primary pill with arrow everywhere (white on dark, black on light), `btn-sm` in the nav; `btn-secondary` glass pill on dark.
- Cards: hairline border, `--r3`, black icon tile, chips row pinned to the bottom so every card is the same height.
- Deep-dives: two equal columns, eyebrow, mixed-weight heading, paragraph, check list. AI access uses dark glass.
- FAQ: native `details`, animated, plus rotates to × when open.
- Final CTA on dark, then a light footer (clear break).
- Legal pages: `.legal-hero`, sticky left-rail table of contents (collapsible on phones), 720px single column, numbered sections, `.glance` box (Privacy only), `.todo` placeholder lines, print stylesheet.

## Imagery
Product visuals are real captures only. Until they exist, each shows a labeled placeholder at the exact aspect ratio (`.frame`, `.shot`, `.ph`); never drawn UI. Drop `hero.png`, `sharing.png`, `ai.png`, `theme-light.png`, `theme-dark.png` into `assets/screenshots/` and they appear automatically. Logo: white mark on dark, black mark on light.
