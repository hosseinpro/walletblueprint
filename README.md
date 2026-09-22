# Handoff: walletblueprint.com

## Overview
A single-page marketing + reference site for **walletblueprint.com**, an independent site that
maintains one public comparison table scoring hardware wallets on five security-architecture
properties. Three views live in one component, switched by the top nav:

1. **COMPARISON** (default) — hero, sort controls, search/filter, the scored table with expandable
   teardown rows, the score-scale legend, a changelog block and a contact CTA.
2. **METHODOLOGY** — a long-form article explaining the five scoring properties and the rubric.
3. **ABOUT** — purpose of the site, independence claims, and a short bio for Hossein linking to
   https://www.hosspro.com/ and mailto:hossein@walletblueprint.com.

## About the Design Files
`Wallet Blueprint.dc.html` is a **design reference created in HTML** — a prototype showing intended
look and behavior, not production code to lift directly. The task is to **recreate this design in the
target codebase's existing environment** (React/Next, Vue, Astro, etc.) using its established
routing, component and styling patterns. If no environment exists yet, pick the most appropriate
framework and implement it there. In particular:

- The prototype uses **all-inline styles** by design (it streams into a live preview). In a real
  codebase, move these to whatever the project already uses (CSS modules, Tailwind, styled-components).
- The three views are local component state. In a real app they should almost certainly be **three
  routes**: `/`, `/methodology`, `/about`.
- Wallet data is a hardcoded `WALLETS` array. In production it should come from a CMS, MDX files, or
  a JSON/DB source, since the whole premise of the site is that scores get revised over time.

## Fidelity
**High-fidelity.** Colors, typography, spacing, borders and interaction states are final and should be
matched closely. Exact values are in Design Tokens below.

## Visual concept
Technical blueprint: white line work on blueprint blue, with a two-scale grid background (fine 24px
grid, major 120px grid), dashed rules as internal dividers, mono type for all metadata/labels and a
grotesque for headlines and prose. No shadows, no gradients, no rounded cards except where noted.

---

## Screens / Views

### Global — Top bar
- **Purpose**: identity + view switching.
- **Layout**: `position: sticky; top: 0; z-index: 10`, flex row, `space-between`, `flex-wrap: wrap`,
  `gap: 20px`, padding `20px 28px`, `background: rgba(8,58,130,0.55)` with `backdrop-filter: blur(6px)`,
  bottom border `1px solid rgba(255,255,255,0.35)`.
- **Logo mark**: 40×40 box, `2px solid #ffffff`, `border-radius: 8px`, centered 20×14 inner rect
  (`2px` white border, radius 3px). Two 8×8 corner ticks absolutely positioned at `top/left: -5px`
  (top+left borders) and `bottom/right: -5px` (bottom+right borders) — drafting crop marks.
- **Wordmark**: Archivo 700, 19px, `letter-spacing: -0.01em`. Three-tone:
  `wallet` = `#ffffff`, `blueprint` = `#9ecdff`, `.com` = `#a7b3c2`.
- **Tagline**: IBM Plex Mono 10.5px, `letter-spacing: 0.16em`, uppercase, `#bfe0ff` —
  "hardware wallet security teardowns".
- **Nav**: flex row, `gap: 8px`, IBM Plex Mono 12.5px, `letter-spacing: 0.06em`. Items:
  COMPARISON, METHODOLOGY, ABOUT (buttons), CHANGELOG (anchor `#changelog`).
  - Inactive: `padding: 9px 14px`, `1px solid rgba(255,255,255,0.3)`, radius 4px, transparent bg, `#fff` text.
  - Active: border `#ffffff`, `background: rgba(255,255,255,0.18)`.
  - Hover: `background: rgba(255,255,255,0.16)`.

### 1. Comparison view
Container: `max-width: 1240px`, centered, `padding: 0 28px`.

**Hero** — `padding: 56px 0 36px`, bottom border `1px dashed rgba(255,255,255,0.4)`,
2-col grid `minmax(0,1.6fr) minmax(0,1fr)`, `gap: 40px`, `align-items: end`.
- Eyebrow: Mono 11.5px, `letter-spacing: 0.22em`, `#bfe0ff` — "SHEET 01 — REV. 2026.09 — 8 UNITS UNDER TEST".
- H1: `clamp(34px, 5.4vw, 60px)`, weight 700, `line-height: 1.02`, `letter-spacing: -0.025em`,
  `text-wrap: balance` — "Five questions decide / whether a wallet holds." (explicit `<br>`).
- Body: 16.5px, `line-height: 1.6`, `#e4f0ff`, `max-width: 56ch`, `text-wrap: pretty`.
- Right column: the blueprint illustration image, `width: 100%; max-width: 420px; margin-left: auto`
  (see Assets).

**Sort bar** — flex row, `space-between`, `padding: 24px 0 18px`, wraps.
- Label "SORT /" in `#bfe0ff`, `letter-spacing: 0.14em`.
- Buttons: COMPOSITE, SECURE ELEMENT, SCREEN, INPUT, ENTROPY, OPEN SOURCE, NAME A–Z.
  Mono 12px, `padding: 9px 13px`, radius 4px.
  - Inactive: `1px solid rgba(255,255,255,0.3)`, transparent, white text, weight 400.
  - **Active (inverted)**: `background: #ffffff`, `color: #0a4ba8`, `border: 1px solid #ffffff`, weight 600.
  - Hover: `background: rgba(255,255,255,0.16)`.
- Right hint: Mono 11.5px `#bfe0ff` — "CLICK A ROW FOR TEARDOWN NOTES".

**Search bar** — flex row, `gap: 14px`, `margin-bottom: 14px`.
- Field wrapper: `flex: 1 1 320px`, `1px solid rgba(255,255,255,0.4)`, `background: rgba(6,44,102,0.5)`,
  `padding: 0 14px`, no radius.
- Prefix label "FIND /": Mono 12px, `letter-spacing: 0.14em`, `#bfe0ff`.
- Input: transparent, borderless, no outline, `color: #ffffff`, Mono 14px, `padding: 14px 10px`.
  Placeholder: "device name or form factor…".
- CLEAR ✕ button appears only when the query is non-empty: Mono 11px, `1px solid rgba(255,255,255,0.35)`,
  radius 3px, `padding: 6px 9px`, `color: #bfe0ff` → white on hover.
- Right counter: Mono 11.5px `#bfe0ff`, `letter-spacing: 0.12em` — "N DEVICES SHOWN" (singular "1 DEVICE SHOWN").

**Empty state** (only when the filter matches nothing) — `1px dashed rgba(255,255,255,0.4)`,
`padding: 40px 24px`, centered. Mono 13px `letter-spacing: 0.14em` "NO MATCH ON THIS SHEET",
then Archivo 14px `#eaf3ff`: "Not evaluated yet? **Suggest it** and I'll take a look." — the link is a
mailto with `?subject=Wallet suggestion`, styled with `border-bottom: 1px solid rgba(255,255,255,0.6)`.

**The table** — `overflow-x: auto`, outer `1px solid rgba(255,255,255,0.4)`,
`background: rgba(7,52,120,0.45)`; inner track `min-width: 1220px` so it scrolls rather than crushes.
- Grid template for **both** header and rows:
  `minmax(0, 1.8fr) repeat(5, minmax(0, 1fr)) 108px`.
- **Header row**: Mono 11px, `letter-spacing: 0.14em`, `#bfe0ff`, `background: rgba(6,44,102,0.6)`,
  bottom border `1px solid rgba(255,255,255,0.4)`. Cells: DEVICE (`padding: 14px 20px`), then
  SECURE ELEMENT / TRUSTED SCREEN / TRUSTED INPUT / ENTROPY / OPEN SOURCE (`padding: 14px 16px`,
  each with `border-left: 1px dashed rgba(255,255,255,0.25)`), then COMPOSITE (right-aligned).
- **Data row**: `border-bottom: 1px solid rgba(255,255,255,0.18)`, `cursor: pointer`,
  hover `background: rgba(255,255,255,0.07)`. Whole row toggles the teardown drawer.
  - *Device cell*: flex, `gap: 16px`, `padding: 16px 20px`. 74×52 image placeholder with
    `1px solid rgba(255,255,255,0.45)` and a hatch fill
    `repeating-linear-gradient(135deg, rgba(255,255,255,0.14) 0 3px, transparent 3px 8px)`,
    containing Mono 7.5px `#cfe6ff` "DEVICE PHOTO". **Replace with real device photography.**
    Then name (Archivo 600, 16.5px, `letter-spacing: -0.01em`) and meta line
    (Mono 11px `#bfe0ff`, `margin-top: 4px`).
  - *Each score cell* (5 identical): `padding: 16px`, `border-left: 1px dashed rgba(255,255,255,0.25)`.
    Score Mono 20px weight 500 (`toFixed(1)`), `margin-bottom: 8px`; then a bar —
    8px tall, `1px solid rgba(255,255,255,0.45)`, inner fill `background: #ffffff`,
    `width: score * 10 + '%'`; then a note line Mono 10px `#bfe0ff`, `margin-top: 7px`.
  - *Composite cell*: right-aligned. Value Mono 27px weight 600 `letter-spacing: -0.02em`;
    tier label under it Mono 10px `#bfe0ff` `letter-spacing: 0.1em`.
- **Teardown drawer** (expanded row): `padding: 4px 20px 26px`, 2-col grid `1fr 1fr`, `gap: 28px`,
  `border-top: 1px dashed rgba(255,255,255,0.3)`, `background: rgba(6,44,102,0.5)`.
  Two blocks, each a Mono 10.5px `letter-spacing: 0.18em` `#bfe0ff` label ("TEARDOWN NOTE",
  "WATCH ITEM") over 14.5px `#eaf3ff` prose at `line-height: 1.65`.

**Score-scale legend** (below the table) — `margin-top: 40px`, `1px solid rgba(255,255,255,0.35)`,
`padding: 22px 24px`, grid `repeat(auto-fit, minmax(170px, 1fr))`, `gap: 20px`, Mono 12.5px `#e4f0ff`.
First cell: "SCALE" (`letter-spacing: 0.16em`, `#bfe0ff`) over "0 – 10" in white 20px. Then four cells,
each a `#bfe0ff` range over a white descriptor: 9–10 verified silicon · 7–8 sound, minor gaps ·
4–6 partial coverage · 0–3 absent / unverifiable.

**Contact / changelog band** — `margin-top: 40px`, `id="contact"`, 2-col grid
`minmax(0,1fr) minmax(0,1.1fr)`, `gap: 40px`, `align-items: start`.
- Left: changelog card, `1px solid rgba(255,255,255,0.35)`, `padding: 24px`. Label Mono 10.5px
  `letter-spacing: 0.18em` `#bfe0ff` "CHANGELOG", then Mono 13px `line-height: 2.1` `#eaf3ff` entries:
  - 2026.09.12 — Entropy rubric split: source vs. audit path
  - 2026.08.30 — Two units added, one retired
  - 2026.08.04 — Screen score now penalises shared MCU buses
- Right: H2 26px weight 700 "Scores are architecture, not verdicts.", 15.5px `#e4f0ff` body
  (`max-width: 52ch`), then the primary button (white fill, `#0a4ba8` text, Mono 12.5px,
  `padding: 13px 20px`, radius 4px, weight 600, hover `#bfe0ff`) → METHODOLOGY,
  plus the mailto CTA to hossein@walletblueprint.com for suggestions/questions.

**Footer** — `max-width: 1240px`, `margin: 72px auto 0`, `padding: 26px 28px 0`,
`border-top: 1px solid rgba(255,255,255,0.3)`, flex `space-between`, Mono 11.5px `#bfe0ff`
`letter-spacing: 0.08em`: "WALLETBLUEPRINT.COM — INDEPENDENT, NO AFFILIATE LINKS" and
"SAMPLE DATA FOR LAYOUT REVIEW" (remove the latter once real data lands).

### 2. Methodology view
Container `max-width: 820px`, `padding: 0 28px`.
- Header block `padding: 56px 0 30px`, bottom `1px dashed rgba(255,255,255,0.4)`. Eyebrow Mono 11.5px
  `letter-spacing: 0.22em` "METHODOLOGY — SHEET 02 — REV. 2026.09"; H1 `clamp(32px, 4.6vw, 50px)`
  weight 700 "Security architecture principles for hardware wallets"; lede 17px `#e4f0ff` `max-width: 60ch`.
- Article: 16.5px, `line-height: 1.72`, `#eaf3ff`, `text-wrap: pretty`, paragraphs `margin-bottom: 16–28px`.
- Five numbered sections — 01 SECURE ELEMENT, 02 TRUSTED SCREEN, 03 TRUSTED INPUT, 04 ENTROPY,
  05 OPEN SOURCE — each: section label Mono 13px `letter-spacing: 0.18em` `#bfe0ff`,
  `margin: 44px 0 14px`, `padding-top: 18px`, `border-top: 1px solid rgba(255,255,255,0.3)`;
  then an H3 24px weight 700 thesis line; then 1–2 paragraphs.
- Pull-quote callouts (sections 01 and 05): `border-left: 2px solid #ffffff`,
  `padding: 4px 0 4px 18px`, Mono 13.5px, `line-height: 1.8`.
- **SCORING table**: a 1px-gap grid faking hairlines — outer
  `background: rgba(255,255,255,0.3)` + `1px solid rgba(255,255,255,0.3)`, `display: grid; gap: 1px`;
  each row a `96px minmax(0,1fr)` grid with `gap: 1px`; every cell `background: #0a4ba8`,
  `padding: 12px 14px`, Mono 13.5px, range in `#bfe0ff`. Four rows matching the legend copy.
- Closing note Mono 12.5px `#bfe0ff` about the composite being an unweighted mean of the five,
  then a bordered block (`1px solid rgba(255,255,255,0.35)`, `padding: 26px`) with a
  "← BACK TO THE COMPARISON" primary button.

### 3. About view
Container `max-width: 820px`, same header treatment (eyebrow "ABOUT — SHEET 03", H1 "Why this site exists").
- Two intro paragraphs on why architecture beats star ratings.
- **INDEPENDENCE**: section label, then grid `repeat(auto-fit, minmax(210px, 1fr))`, `gap: 18px`.
  Three cards, each `1px solid rgba(255,255,255,0.35)`, `padding: 18px`: a Mono 11px
  `letter-spacing: 0.14em` `#bfe0ff` kicker over 14.5px body —
  NO AFFILIATE LINKS / PUBLIC RUBRIC / CORRECTIONS LOGGED.
- **WHO MAINTAINS IT**: section label, then H3 24px "Hossein", a first-person bio paragraph, and a
  flex row `gap: 12px` of two CTAs:
  - `HOSSPRO.COM →` — white fill, `#0a4ba8` text, `target="_blank" rel="noopener"`, href `https://www.hosspro.com/`
  - `EMAIL ME →` — outline (`1px solid rgba(255,255,255,0.45)`), white text,
    href `mailto:hossein@walletblueprint.com?subject=Hello%20from%20walletblueprint.com`
- Closing bordered block repeating the mailto inline ("Suggest a wallet, challenge a score, or send a
  teardown") + "← BACK TO THE COMPARISON" button.

---

## Interactions & Behavior
- **View switching**: nav buttons set the active view; only one view renders at a time. Implement as routes.
- **Sorting**: clicking a sort button sets the sort key. `COMPOSITE` sorts by computed composite
  descending; each property key sorts by that score descending; `NAME A–Z` uses
  `a.name.localeCompare(b.name)`. Active button renders inverted (white fill).
- **Search**: case-insensitive substring match against **both** `name` and `meta`. Filtering runs
  before sorting. Changing the query also **collapses any open teardown row**. Empty query = all rows.
- **Row expand**: clicking a row toggles its teardown drawer; only one row open at a time (opening a
  second closes the first). Clicking the open row closes it.
- **Hovers**: nav/sort `rgba(255,255,255,0.16)`; table row `rgba(255,255,255,0.07)`; primary buttons
  white → `#bfe0ff`; links `#ffffff` → `#bfe0ff`.
- **No transitions are specified.** If you add them, keep them short (≤150ms) and on background-color only —
  the aesthetic is static drafting, not motion.
- **Responsive**: page chrome and prose reflow via `max-width`/`clamp()`/`auto-fit` grids. The table
  itself does **not** reflow — it keeps `min-width: 1220px` and scrolls horizontally inside its
  container. If you want a true mobile treatment, the intended fallback is one card per device with
  the five scores stacked as label/value/bar rows, but that is **not designed yet** — confirm before building.
- **Accessibility to add during implementation**: the table is a `<div>` grid in the prototype; use real
  `<table>` semantics or ARIA grid roles, make rows keyboard-activatable (they are click-only today),
  label the search input, and give the score bars accessible text equivalents.

## State Management
Four pieces of local state (prototype):
- `view`: `'table' | 'method' | 'about'` — becomes routing.
- `sort`: `'overall' | 'secure' | 'screen' | 'input' | 'entropy' | 'open' | 'name'`.
- `query`: string, the search box value.
- `open`: wallet id or `null` — the expanded teardown row.

Derived values (no stored state): filtered+sorted list, per-wallet composite
`(se + scr + inp + ent + os) / 5` rounded to one decimal, bar widths `score * 10 + '%'`,
tier label, result count string.

**Tier thresholds** (applied to the composite): `>= 9` STRONG · `>= 8` SOUND · `>= 6.5` MIXED · else WEAK.

No data fetching in the prototype. In production, the wallet list + the changelog should be fetched or
statically generated from a content source; sorting/filtering can stay client-side at this scale.

## Data model
Each wallet record:
```js
{
  id: 'a',
  name: 'Vault Mk4',
  meta: 'air-gapped · microSD · 2025',   // form factor · interface · year, middot-separated
  se: 9.4,  seNote:  'dual SE, seed in-element',   // secure element
  scr: 8.1, scrNote: 'mono OLED, full address',    // trusted screen
  inp: 9.0, inpNote: 'keypad, PIN on device',      // trusted input
  ent: 9.6, entNote: 'TRNG + dice input',          // entropy
  os: 9.5,  osNote:  'full stack, reproducible',   // open source
  note:  'Teardown note — what the architecture does well.',
  watch: 'Watch item — the one caveat a buyer should weigh.'
}
```
Scores are 0–10 with one decimal. Notes are short lowercase fragments (≤ ~30 chars) so they fit the
10px cell line. **All eight records in the prototype are sample data** — placeholder device names,
invented scores. Do not ship them; they exist to prove the layout at realistic content lengths.

## Design Tokens

**Colors**
| Token | Value | Use |
|---|---|---|
| Blueprint blue | `#0a4ba8` | page background, inverted button text |
| Grid line (major) | `rgba(255,255,255,0.09)` | 120px background grid |
| Grid line (fine) | `rgba(255,255,255,0.05)` | 24px background grid |
| Ink | `#ffffff` | headlines, score bars, rules, active states |
| Prose | `#eaf3ff` | article and drawer body copy |
| Prose alt | `#e4f0ff` | hero/lede body copy |
| Label blue | `#bfe0ff` | mono labels, meta, eyebrows, notes |
| Wordmark blue | `#9ecdff` | "blueprint" in the logo |
| Wordmark gray | `#a7b3c2` | ".com" in the logo |
| Placeholder ink | `#cfe6ff` | hatch-fill placeholder text |
| Header bar | `rgba(8,58,130,0.55)` + `blur(6px)` | sticky top bar |
| Table body | `rgba(7,52,120,0.45)` | table container |
| Table head / drawer | `rgba(6,44,102,0.6)` / `rgba(6,44,102,0.5)` | header row, open drawer, search field |
| Hairline strong | `rgba(255,255,255,0.4)` – `0.45` | container borders, bar outlines |
| Hairline soft | `rgba(255,255,255,0.3)` – `0.35` | card borders, inactive button borders |
| Divider dashed | `rgba(255,255,255,0.25)` | column dividers |
| Row divider | `rgba(255,255,255,0.18)` | between table rows |
| Hover wash | `rgba(255,255,255,0.16)` (controls) / `0.07` (rows) | hover states |
| Selection | bg `#ffffff`, text `#0a4ba8` | `::selection` |

**Background grid** (on the page root)
```css
background-color: #0a4ba8;
background-image:
  linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px),
  linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
background-size: 120px 120px, 120px 120px, 24px 24px, 24px 24px;
```

**Typography** — Archivo (500/600/700) for headings, UI and prose; IBM Plex Mono (400/500/600) for all
labels, metadata, scores and tabular data. Both from Google Fonts.
| Role | Font | Size | Weight | Tracking |
|---|---|---|---|---|
| Hero H1 | Archivo | `clamp(34px, 5.4vw, 60px)` | 700 | `-0.025em` |
| Article H1 | Archivo | `clamp(32px, 4.6vw, 50px)` | 700 | `-0.025em` |
| H2 | Archivo | 26px | 700 | `-0.02em` |
| H3 / thesis | Archivo | 24px | 700 | `-0.02em` |
| Lede | Archivo | 17px | 400 | — |
| Body | Archivo | 16.5px / `1.72` | 400 | — |
| Hero body | Archivo | 16.5px / `1.6` | 400 | — |
| Device name | Archivo | 16.5px | 600 | `-0.01em` |
| Wordmark | Archivo | 19px | 700 | `-0.01em` |
| Composite score | Plex Mono | 27px | 600 | `-0.02em` |
| Cell score | Plex Mono | 20px | 500 | — |
| Search input | Plex Mono | 14px | 400 | `0.02em` |
| Buttons / nav | Plex Mono | 12.5px | 400/600 | `0.06–0.1em` |
| Section label | Plex Mono | 13px | 400 | `0.18em` |
| Eyebrow | Plex Mono | 11.5px | 400 | `0.22em` |
| Table header | Plex Mono | 11px | 400 | `0.14em` |
| Cell note | Plex Mono | 10px | 400 | `0.06em` |
| Tagline | Plex Mono | 10.5px | 400 | `0.16em` |

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

**Spacing** — 4px base, used at 4 / 6 / 8 / 10 / 12 / 14 / 16 / 18 / 20 / 22 / 24 / 26 / 28 / 30 / 36 / 40 / 44 / 48 / 56 / 72px.
Page gutter 28px. Container widths: 1240px (table view), 820px (article views), table track 1220px min.

**Radius** — 0 for all containers, rules and the table (deliberate: drafting sheet). 3px on the CLEAR
chip, 4px on buttons and nav, 8px on the logo box, 10–16px only inside the illustration.

**Shadows** — none anywhere. Depth is expressed with hairlines and background alpha only.

## Assets
- `images/hero.png` — the hero illustration: a blueprint-style line
  drawing of a wallet with Bitcoin/Ethereum/Solana coins, white line work on the same blueprint blue.
  User-supplied; included in this bundle. Needs an SVG or 2x export for production.
- **Logo mark** is pure CSS (nested bordered rects + two corner ticks) — no image file. Worth
  redrawing as an SVG for favicon/social use.
- **Device photos are not supplied.** Every row uses a 74×52 hatch-filled placeholder reading
  "DEVICE PHOTO". Real photography should be shot or sourced on a consistent blueprint-blue or
  transparent ground at 148×104 @2x minimum.
- **No icon set is used** — all glyphs are type (`✕`, `→`, `←`, `/`). Keep it that way or pick a thin
  technical line set if icons become necessary.
- Fonts: Archivo + IBM Plex Mono, Google Fonts (both open-licensed).

## Files
The design prototype (one page, three conditionally-rendered views, `x-dc` template bindings) has been
built out as a plain static site — no framework, no build step.

- `index.html` — Sheet 01, the comparison. Header, hero, sort/search controls, the table shell, and the
  changelog / scale / contact sections. The table body is rendered by `app.js`.
- `methodology.html` — Sheet 02, its own page.
- `about.html` — Sheet 03, its own page.
- `styles.css` — every style for all three pages. The three nav items are links; the current page
  carries `class="is-active"` plus `aria-current="page"`.
- `app.js` — the `WALLETS` array plus sort, search and row-expand behaviour for the comparison table.
  Wallet records live here and nowhere else.
- `images/hero.png` — hero illustration.

## Open questions for the developer
1. Mobile table treatment is undesigned (currently horizontal scroll) — confirm the card fallback before building it.
2. All eight wallet records and the changelog entries are placeholders pending real research data.
3. Device photography does not exist yet.
4. Contact is a plain `mailto:` — if spam is a concern, swap for a form before launch.
