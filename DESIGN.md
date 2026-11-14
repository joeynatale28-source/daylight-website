# Daylight website design system (v4, full rebuild)

Goal: a page that makes a design-literate Apple or Google Calendar user think "this was made by a team that cares." Strictly black and white. Every section replicates one named reference (layout, spacing, type proportions) with Daylight's content. All tokens are CSS variables at the top of `styles.css`; pages use names, never raw values.

| Section | Primary reference | Copied |
|---|---|---|
| Nav | Linear + VoiceOS | quiet bar with hairline, divider, Log in, one pill CTA; condenses into a floating frosted pill on scroll |
| Hero | Cron Calendar | centered pill, huge tight headline, one-line subcopy, two CTAs, product frame overlapping the section edge |
| Features | Supabase | one row of six plain-text columns, icon tile + title inline, grey copy, small "Learn more ›" link |
| Sharing / AI access | Linear deep-dive | split header (headline / explanatory copy), full-width framed visual, numbered 2-column sub-feature list; AI mirrored on dark glass |
| Themes | Cron Calendar | desktop frame with a second frame overlapping its bottom-right corner on a dark panel that fades to black |
| FAQ | Monologue | clean hairline rows, circular +/× buttons |
| Final CTA | Linear | huge centered headline, two pills without arrows, very airy |
| Footer | Resend | black, hairline above, logo + short link columns, one-line credit |
| Legal shells | Resend | hairline panels, readable column, left-rail table of contents |

## Themes (system, CSS only)
Every page follows the OS theme through `prefers-color-scheme`: no script, no flash, live switching. Dark sections (hero, AI access, final CTA, footer) re-scope the same tokens, so components inside adapt automatically.

| Token | Light | Dark |
|---|---|---|
| `--bg` | #FFFFFF | #0A0A0A |
| `--surface` | #F5F5F5 | #141414 |
| `--raised` | #FFFFFF | #1A1A1A |
| `--line` | rgba(0,0,0,.08) | rgba(255,255,255,.08) |
| `--line-2` | rgba(0,0,0,.16) | rgba(255,255,255,.16) |
| `--text` | #111111 | #FFFFFF |
| `--text-2` | #555555 | #A1A1A1 |
| `--muted` | #888888 | #666666 (numerals and non-essential labels only; below AA for body text) |
| `--p-bg` / `--p-fg` | #111 / #FFF | #FFF / #0A0A0A (primary pill) |
| `--accent` | #1A73E8 | #8AB4F8 (focus rings only; links are text color with an underline) |

Dark sections in both themes: #0A0A0A, white text, rgba(255,255,255,.08) hairlines, white radial glows at low opacity. Footer #000000. No other colors; icons are monochrome (`currentColor`).

## Type (Inter 400–800, Google Fonts with a system fallback)
- Display: clamp(48px, 7vw, 80px) / 1.05 / -0.03em / 700
- H2: clamp(32px, 4vw, 48px) / 1.1 / -0.02em / 700. Deep-dive headline (`.h2-lg`) clamp(36px, 4.6vw, 56px). CTA headline clamp(44px, 6vw, 72px).
- H3 20px / 600. Eyebrow 13px / 600 / .12em uppercase. Body 17px / 1.6. Small 15px / 1.5. Buttons 15px / 600.

## Spacing, shape, depth
8px base. Section padding 120px desktop, 80px tablet (≤1024), 64px phone (≤768), equal top and bottom. Container 1120px (features row 1280px), side padding 24px, 16px at ≤480. Eyebrow → H2 16px; H2 → subcopy 16–24px; subcopy → content 48–80px. Radius: cards 16px, frames 12px, pills 999px. Shadows: card `0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.06)`, frame `0 24px 64px rgba(0,0,0,.18)`.

## Components
- One button component (`.btn`, 48px, pill): primary (white on dark, black on light), ghost (hairline), dim (#222). Primary carries an arrow except in the final CTA.
- Nav: fixed, 64px bar with hairline; past 8px of scroll it floats as a frosted glass pill (blur 12px, saturate 180%). Tone (dark/light) follows the section beneath. Below 768px a hamburger opens a dropdown panel.
- Feature columns, split headers, numbered sub-feature lists, framed product visuals, dark glass panel, themes stage, FAQ (one open at a time, height + opacity 190ms), footer.
- Legal pages: `.legal-hero`, sticky table of contents (collapses on phones), 720px column, numbered sections, `.glance` box (Privacy), `.todo` placeholders, print stylesheet.

## Motion
160–260ms, `cubic-bezier(.16,1,.3,1)` for entrances, ease-out for hovers, transform and opacity only (FAQ height excepted). Hero fades and rises in sequence (80ms stagger, 12px). Sections reveal once at 15% visible. `prefers-reduced-motion` removes all movement.

## Imagery
Product visuals are real captures only. Until they exist, each is a labeled placeholder at the exact aspect ratio inside a browser-chrome frame (`.frame`, `.shot`, `.ph`); never drawn UI. Drop `hero.png`, `sharing.png`, `ai.png`, `theme-light.png`, `theme-dark.png` into `assets/screenshots/` and they appear. No social proof of any kind until it exists.
