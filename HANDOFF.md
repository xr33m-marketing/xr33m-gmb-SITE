# Ryan Local — Handoff

One-page premium-minimal landing site for **Ryan**, a UK-based local SEO consultant
working with tradespeople and service businesses across Scotland.

## Project path

```
/home/user/workspace/ryan-local-seo
```

Static site — three files only. Deploy directly with `deploy_website()`.

```
ryan-local-seo/
├── index.html      # All page markup, JSON-LD, OG/Twitter meta, inline SVGs
├── styles.css      # Design tokens (light/dark) + component styles
├── script.js       # Theme toggle, sticky header, form validation/success
└── _qa-*.png       # QA screenshots (desktop light, dark, tablet, mobile, form success)
```

### Deploy command

```python
deploy_website(
    project_path="/home/user/workspace/ryan-local-seo",
    site_name="Ryan Local",
    entry_point="index.html",
)
```

The `_qa-*.png` files are local QA artefacts — harmless if shipped, but can be
removed before deploying if a tighter bundle is wanted. They are NOT linked
from any page.

---

## Brand & content decisions

- **Brand name:** "Ryan · Local" — plain, geographic, matches a personal
  consultancy positioning. Reads as a wordmark with the middle dot in accent.
- **Logo mark:** Custom inline SVG — a circle containing a stylised "R"
  with a small filled dot (compass/pin metaphor) and an outgoing stroke.
  Uses `currentColor`, so adapts to light/dark. Favicon is a simplified
  version embedded as a data-URI SVG (gold compass on near-black).
- **Voice:** Plain English, faintly Scottish ("the lads", "binned
  Checkatrade"), confident, no agency fluff. Direct CTAs ("Book a free
  20-min call"), honest ("if local SEO isn't right for you, I'll say so").
- **Case study copy:** All figures and client identities are explicitly
  generic / illustrative. Footer carries a disclaimer:
  _"Sample / illustrative case figures unless stated otherwise."_ Once Ryan
  has written approval from real clients, swap the three `<article class="case">`
  blocks in `#proof` for real numbers and named businesses (or initialled).
- **Phone / email** are set to `07897 964258` and
  `xr33m.marketing@gmail.com`.

## Design decisions

- **Art direction — Premium minimal, editorial, faintly Scottish.** Warm ivory
  surfaces, deep ink text, restrained antique-brass accent. Not the generic
  teal-on-white SaaS look. The italic Boska headlines (with italic emphasis
  on "_local_" in the hero and italics on the trust strip) carry the
  premium voice without ornament.
- **Type:** Boska (display, italic-capable serif) + Satoshi (body), both
  Fontshare. Boska gives the page a literary/editorial feel; Satoshi keeps
  body copy crisp and modern. Loaded via Fontshare CDN with `display=swap`.
- **Colour tokens (custom — _not_ Nexus):**
  | Role | Light | Dark |
  | --- | --- | --- |
  | Background | `#F5F0E6` (warm ivory) | `#13130F` (warm ink) |
  | Surface | `#FAF6ED` | `#1A1914` |
  | Text | `#181712` | `#ECE6D6` |
  | Accent (primary) | `#8A5A18` (antique brass) | `#E2B66B` (warm gold) |
  | Border | `#D2C8B1` | `#3A3830` |
  Contrast checked: body and headings against background pass WCAG AA.
- **One hero moment.** `--text-hero` for the H1 only. All other headings
  step down to `--text-2xl` or `--text-xl`.
- **Restraint.** One accent (brass) used sparingly: kicker labels, one
  hero word, decorative dots, primary buttons (in dark mode), badge.
  Everything else is neutral.

## Content sections (in DOM order)

1. **Sticky header** — wordmark, anchor nav (Services / Results / Process / FAQ),
   theme toggle, primary "Book a call" CTA.
2. **Hero** — eyebrow, big italic-accented H1, lede, two CTAs, three trust
   meta items, decorative SVG map plate (abstract Scotland silhouette + grid
   + map pins + radial reach rings) on the right at desktop only.
3. **Trust strip** — italic list of trades served (plumbers, electricians,
   joiners, builders, roofers, heating engineers, landscapers, cleaning firms).
4. **Problem / value prop** — split layout: section title + lede on top,
   four "×" pain-point cards below.
5. **Services** — three-card pricing/offer grid: Local SEO Audit (£450),
   Done-for-you Local SEO (£950/mo, "Most popular" badge, dark-card
   featured), Website + SEO Build (£2,400).
6. **Proof** — three case-study cards with before/after stat blocks
   (map-pack visibility, calls/month, lead-gen spend etc.) + two italic
   testimonial pull-quotes.
7. **Process** — four-step grid (Discovery → Audit → Build → Rank).
8. **Booking** — split: bullet list + email/phone on the left, form panel on
   the right (name, business, trade, email, phone, area, message). Client-side
   validation + success state replaces fields on submit. **No backend.**
9. **FAQ** — seven `<details>` accordions with grown-up answers (timeline,
   no contracts, paid lead-gen, geography, website mess, Google Ads, references).
10. **Final CTA** — single H2 + book-a-call button.
11. **Footer** — wordmark, three columns (Services / Areas / Get in touch),
    base row with copyright + sample-figures disclaimer.

## SEO baseline

- `<title>` and `meta description` set, both within length budgets (~70 / 200).
- Canonical, OG, Twitter card meta tags.
- JSON-LD `ProfessionalService` block with `areaServed` covering major
  Scottish cities.
- Single `<h1>`, semantic landmarks (`<header>`, `<main>`, `<nav>`, `<section>`,
  `<article>`, `<footer>`).
- `<html lang="en-GB">`.

## Interactivity

`script.js` does only:

- **Theme toggle:** seeded from `prefers-color-scheme`; click to override.
  In-memory only (no localStorage — sandbox-safe).
- **Sticky header scrolled state:** subtle border on scroll.
- **Footer year:** auto-injected.
- **Booking form:** native HTML5 + minimal JS validation; on success,
  fields are hidden and a `.form__success` panel shows. No network call —
  Ryan should wire this up to Formspree / Basin / a server endpoint
  before launch (look for `form.addEventListener('submit', …)` in
  `script.js`).

## QA performed

| Viewport          | Light                       | Dark                       |
| ----------------- | --------------------------- | -------------------------- |
| Desktop 1440 wide | `_qa-desktop-light.png` ✅  | `_qa-desktop-dark.png` ✅  |
| Tablet 820 wide   | `_qa-tablet.png` ✅         | —                          |
| Mobile 390 wide   | `_qa-mobile-light.png` ✅   | —                          |
| Form success      | `_qa-form-success.png` ✅   | —                          |

Checked: heading hierarchy, no text overflow, no off-token colours,
single hero moment, dark mode parity (logo + featured card + form), form
success state, hover states on services + book-a-call lines, FAQ
accordions toggling +/− with accent.

## Follow-ups for Ryan / launch

1. Confirm the email/phone are final (`xr33m.marketing@gmail.com`, `07897 964258`)
   and the `og:url` / `canonical` with the real domain.
2. Wire the booking form to a real endpoint (Formspree / Basin / Netlify
   Forms / Web3Forms) — see `script.js` `form.addEventListener('submit', …)`.
3. Replace illustrative case-study figures with real, approved client
   numbers — and either name the businesses or keep them anonymised
   (currently anonymised + footer disclaimer).
4. Add a privacy notice / cookie note if any analytics get added.
5. Optional: add a real Calendly / Cal.com link to the "Book a call" CTAs
   instead of (or as well as) scrolling to the form.

## Commands run

- `python3 -m http.server 5050` — local preview server
- Playwright via `js_repl` — desktop / dark / tablet / mobile / form
- `git init` + initial commit
