# Daylight website design system (v6)

Strictly black and white. Reference-driven: each section replicates one named Mobbin reference's layout and rhythm with Daylight's content. Tokens are CSS variables at the top of `styles.css`.

| Section | Reference (looked up on Mobbin) | Copied |
|---|---|---|
| Nav | Duna / Pally / Framer | slim bar with hairline; condenses to a rounded pill on scroll; ONE "Open Daylight" button |
| Hero | Dovetail (+ Origin) | pill badge, centered 2-line headline, two CTAs, faint grid + glow, product frame overlapping the edge |
| Features | Origin "Track everything" | three frosted-glass cards on black, visual zone on top, title, two sentences |
| Sharing / AI access | Pally bento + Antimetal showcase, Linear split header | split header, large framed shot, numbered list |
| Numbered lists | Superpower "How it works" | numbered items, generous spacing, vertical hairline |
| Themes | Cosmos grid | two equal frames, captions only |
| FAQ | Sana + Monologue | quiet hairline rows |
| CTA / footer | Framer + Pally | huge headline, two pills; black footer with giant wordmark |

## Themes
System only (`prefers-color-scheme`, CSS, no flash). Dark sections re-scope the tokens.

| Token | Light | Dark |
|---|---|---|
| `--bg` | #FFFFFF | #0A0A0A |
| `--surface` | #F5F5F5 | #141414 |
| `--raised` | #FFFFFF | #1A1A1A |
| `--line` | rgba(0,0,0,.08) | rgba(255,255,255,.08) |
| `--text` / `--text-2` / `--muted` | #111 / #555 / #888 | #FFF / #A1A1A1 / #666 |
| `--p-bg` / `--p-fg` | #111 / #FFF | #FFF / #0A0A0A |
| `--accent` (focus rings only) | #1A73E8 | #8AB4F8 |

Hero, Features, AI access, CTA are always #0A0A0A; footer #000.

## Type, spacing, shape
Inter 400–800. Display clamp(48px,7vw,80px)/1.05/-.03em/700; H2 clamp(32px,4vw,48px); deep-dive H2 clamp(36px,4.6vw,56px); CTA H2 clamp(48px,6.4vw,72px); H3 20px/600; eyebrow 13px/600/.12em; body 17px/1.6. 8px base; section padding 120 / 80 / 64px; container 1120px. Radius: cards 16, frames 12, pills 999.

## Components
One button component (48px pill; primary white-on-dark / black-on-light, ghost, dim). Pill nav with opaque dark glass (rgba(24,24,24,.88)), no outline. Glass cards. Numbered list: 48px number column + stacked title/body, vertical hairline. Product frames (`.shotframe`) are hidden until the real PNG loads; no placeholder boxes. Drop `hero.png`, `sharing.png`, `ai.png`, `theme-light.png`, `theme-dark.png` into `assets/screenshots/` and they appear (Themes section appears only then).

## Motion
160–260ms; `cubic-bezier(.16,1,.3,1)` entrances; hero stagger 80ms, 12px rise; reveals once at 15%; reduced motion removes movement.
