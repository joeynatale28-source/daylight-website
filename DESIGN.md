# Daylight website design system

Direction: calm, precise, monochrome. Structure follows the pacing of modern product sites (Cron, Midday, Clockwise, Twenty on Mobbin): dark hero, product shot, features, deep-dives, FAQ, dark final CTA. The skin is Daylight's own. Not based on UXKIN (not connected).

## Color (CSS variables in `styles.css`)
| Token | Light | Dark | Role |
|---|---|---|---|
| `--bg` | #ffffff | #0a0a0a | page / section background |
| `--bg-alt` | #f6f6f6 | #141414 | alternate bands, card fill |
| `--ink` | #0a0a0a | #f5f5f5 | headings, primary text |
| `--ink-2` | #545454 | #a6a6a6 | body and secondary text (AA on bg) |
| `--line` | #e6e6e6 | #262626 | hairlines, card borders |
| `--accent` | #1a73e8 | #8ab4f8 | links and focus rings only (same as the app) |

Buttons are monochrome: black pill on light, white pill on dark. No gradients except one faint radial glow behind the hero.

## Typography
Inter only (400/500/600/700). Scale: 13 / 15 / 17 / 20 / 28 / clamp(36–56) / clamp(44–84). Body 17px, line height 1.6, tight tracking on large headings (-0.03em). Measure capped near 62ch.

## Spacing and shape
8px base. Section padding 96px desktop, 64px phone. Content width 1120px. Radius 8 / 14 / 999 (pills). One shadow for product frames (`--shadow-frame`), none elsewhere.

## Components
Nav (sticky, hairline), buttons (`.btn-primary`, `.btn-ghost`, quiet link), feature cards (hairline border, line icon), browser frame for screenshots, FAQ (native `details`), dark CTA band, footer. Focus: 2px accent outline, 3px offset.

## Imagery and icons
Real app captures only, inside a browser frame. Missing captures show a labeled placeholder at the exact aspect ratio; never drawn UI. Icons: 1.5px stroke line icons, drawn inline, no emoji. Logo: black mark on light, white mark on dark.
