# SCAF Design System

> **SCAF** — Sistema de Control de Activos Fijos.
> A Spanish-language ERP for fixed-asset inventory, preventive maintenance, work
> orders, personnel custody, vendors and ISO-27001 audit. On-premise, PWA-capable,
> QR-driven.

This folder holds everything an agent needs to design new screens, slides, decks,
ad creatives, and marketing pages **on brand** for SCAF.

---

## What SCAF is, in one paragraph

SCAF unifies inventory, preventive maintenance, tickets, personnel control,
vendors, audit and operations into one platform — sold on-premise with a one-time
**arranque** (setup) fee + a monthly **suscripción** that keeps the system active.
The product is Spanish-first, B2B, sold to talleres, fábricas, clínicas,
corporativos, instituciones. The brand voice is **precise, industrial,
no-nonsense**. The visual language is **dark editorial** — near-black surfaces,
amber/copper accent, slate blue support color, mono-spaced micro-data,
glass-and-grid backgrounds. It deliberately reads like serious engineering
software, not a startup SaaS.

---

## Source materials provided

| Source | Path | Notes |
|---|---|---|
| Marketing landing page (HTML, single file, 3915 lines) | `source/landing-page.html` — original at user-mounted `landing-page/index.html` | Single source of truth for color, type, layout, motion. |
| Commercial pricing doc | `PAQUETES_COMERCIALES.md` — original at `uploads/PAQUETES_COMERCIALES.md` | Three plans (Básico / Profesional / Corporativo) + add-ons. Goes on the landing page **summarised**, with a "ver detalle" expansion. |

No Figma file, no logos, no photography were provided. The "logo" is a wordmark:
**SC**`AF`** with the second half in amber. No mascot, no brand illustration.

---

## Index of this folder

```
README.md                  ← you are here
SKILL.md                   ← Agent-Skills entry point (mirrors README)
colors_and_type.css        ← all design tokens as CSS vars + base type recipes
PAQUETES_COMERCIALES.md    ← pricing source-of-truth (Spanish)
source/
  landing-page.html        ← the full marketing site, untouched
preview/                   ← Design-System tab cards (one per concept)
ui_kits/
  landing/                 ← React/JSX recreation of landing-page primitives
    index.html             ← live demo of the kit
    *.jsx                  ← Button, Card, MockFrame, EcoCard, etc.
assets/
  logo-scaf.svg            ← wordmark
  favicon.svg              ← black square with "SC" amber accent
  icon-whatsapp.svg        ← brand-provided WhatsApp glyph
```

---

## CONTENT FUNDAMENTALS — voice, tone, copy rules

### Language

- **Spanish-first**, Latin American register. No "vosotros". Default to "tú" /
  imperative ("Registra, Programa, Controla") — not "usted", not "ustedes".
- **No emoji in copy.** None. The brand never uses emoji as decoration.
- **No exclamation marks.** SCAF doesn't yell.
- **Numbers stay in mono.** `$2.4M`, `1,247 activos`, `PM-312`, `V-18.432.109`.
  Don't typeset numbers in body font when they're data — break them out.
- **Accents matter.** Auditoría, gestión, vencimiento, mantenimiento — always
  with proper accents.

### Tone

Industrial-clinical with editorial confidence. Short declarative sentences. Lead
with the verb. Specifications, not promises. Numbers, not adjectives.

| ✅ on-brand | ❌ off-brand |
|---|---|
| "Control total de tus activos fijos. Mantenimiento sin fricción." | "¡La mejor plataforma para tu negocio!" |
| "Registro inmutable de cada acción." | "Súper seguro y confiable 🔒" |
| "16+ módulos integrados en una sola plataforma." | "¡Increíbles funciones que te van a encantar!" |
| "Implementación en menos de 48 horas." | "Rápido y fácil de usar." |
| "Hojas de cálculo, datos perdidos y cero trazabilidad." | "¿Cansado del Excel? Te tenemos la solución." |

### Casing

- **H1 / H2:** sentence case. Period at the end is allowed and used as a stylistic
  beat ("Control total de tus activos fijos. Mantenimiento sin fricción.").
- **Eyebrows / labels:** UPPERCASE, letter-spaced (`0.15em`), in **Bebas Neue**.
  Examples: `EL PROBLEMA`, `MÓDULOS`, `POR QUÉ SCAF`, `PROCESO`.
- **Buttons:** sentence case ("Solicitar Demo", "Ver Funcionalidades"). Two-word
  CTAs maximum.
- **Module names:** Title Case ("Inventario de Activos", "Órdenes de Trabajo").

### Pronoun / addressing

- **"tú"** when talking to the operator/admin ("Transforma tu gestión").
- **"nosotros"** when talking about the product ("Lo que nos diferencia…").
- Avoid "yo" / first-person testimonials.

### Section anatomy (this rhythm repeats across the site)

```
EYEBROW              ← Bebas Neue, uppercase, amber, tiny
H2 headline.         ← Outfit 700, sentence case, ends in period
Lede paragraph.      ← DM Sans, max ~600px wide, mid-grey
[ optional CTA row ] ← amber primary + ghost secondary
```

### Specific copy patterns

- **Numbers + dramatic context:** `$250K` (hook) — paired with a tiny
  `Fuente: Deloitte Plant Maintenance Survey` chip so it reads researched, not
  invented.
- **Bullet lists** use a small amber dot, never check-marks.
- **Micro-data pips** use a tiny green/amber/red dot before status text:
  `● Activo`, `● En Mant.`, `● Vencido`.
- **"En menos de"** is a recurring phrase: "Implementación en menos de 48 horas",
  "Respuesta en menos de 2 horas".

---

## VISUAL FOUNDATIONS

### Palette

The system is **dark by default**. There is no light mode for the marketing site
itself; light surfaces are reserved for **dashboard mockups embedded inside dark
sections**. This intentional contrast is part of the brand.

| Role | Token | Hex |
|---|---|---|
| Page background | `--bg-base` | `#0a0a0f` |
| Raised surface (ecosystem, footer) | `--bg-elevated` | `#111118` |
| Input / surface | `--bg-surface` | `#1a1a24` |
| Hover surface | `--bg-hover` | `#22222e` |
| Body text | `--text-secondary` | `#a0a0b4` |
| Headlines | `--text-primary` | `#f0f0f5` |
| Muted / captions | `--text-muted` | `#5a5a72` |
| **Brand accent (amber)** | `--accent-amber` | `#f59e0b` |
| Accent darker (copper) | `--accent-copper` | `#d97706` |
| Secondary brand (slate blue) | `--brand-blue` | `#2563eb` |
| Mockup sidebar / slate fill | `--brand-slate` | `#0f172a` |
| OK | `--status-green` | `#22c55e` |
| Warn | `--status-amber` | `#eab308` |
| Bad | `--status-red` | `#ef4444` |

**Rules:**
- One headline gradient only: `linear-gradient(135deg, #f59e0b, #fbbf24)` on
  selected words inside H1 ("activos fijos.").
- Amber is the **only** call-to-action color. Never use blue for primary CTAs.
- Slate blue is reserved for **data** (KPI numbers, secondary chart bars,
  hyperlinks inside mockups). Never for buttons.
- Status colors only appear as **state pips** and **inside mockups**; never as
  decoration.

### Type

| Family | Use |
|---|---|
| **Bebas Neue** (`--font-display`) | Eyebrows, microscopic uppercase labels. Letter-spaced 0.15em. |
| **Outfit** (`--font-heading`) | H1–H4, logo, mockup section titles, big step numbers. 700–800 weight. |
| **DM Sans** (`--font-body`) | All body, paragraphs, UI text, lists. 400/500/700. |
| **JetBrains Mono** (`--font-mono`) | KPI numbers, asset codes (`AF-0014`), pagination, dates, micro-pills, hook stat. |

All four come from **Google Fonts** — fonts are loaded directly from the Google
CDN. We do NOT ship local font files; if shipping offline is required, swap to:

- Bebas Neue: keep as-is (Google Fonts has it; no good libre alternative)
- Outfit: keep
- DM Sans: keep
- JetBrains Mono: keep

> **⚠ No font files were provided by the source codebase.** The landing page
> pulls everything from the Google Fonts CDN. If we ever need true offline
> rendering, we'd need the user to provide the WOFF2 files (or accept that a
> system fallback will be used). Flagging this — but for now, CDN is fine.

### Spacing

Multiples of **4px**, semantic scale lives in `colors_and_type.css` as
`--space-1` (4px) through `--space-32` (120px). Sections are typically padded
with `--space-32` top/bottom on desktop, `--space-20` on mobile.

Container is fixed: `max-width: 1200px`, `padding: 0 24px`.

### Background treatments

- **Radial glows.** Every section has a faint radial gradient — amber in the
  hero (`rgba(245,158,11,0.06)`), red in the "problem" zone, blue elsewhere. They
  sit on a `::before` pseudo-element with `pointer-events: none`.
- **Grid lines.** The hero overlays two `repeating-linear-gradient`s at 80px
  intervals (1px white at 1.5% opacity). Engineering-blueprint feel.
- **Film grain.** A 256×256 SVG fractal-noise PNG tiled at `opacity:0.03`,
  animated 8s with a `steps(10)` "shake". Used on the hero only.
- **No photography.** No stock photos, no illustrations, no 3D renders. The only
  imagery is **product mockups built from CSS** — fake dashboards rendered with
  divs, tables, and CSS bars/gantt rows. (See `MockFrame` in the UI kit.)
- **Gradients are reserved** for the primary button, the H1 highlight, and as
  thin dividers (`linear-gradient(90deg, transparent, #ef4444, transparent)`).
  Never as a full-section background.

### Motion

- **Reveal on scroll.** Elements start at `opacity:0; translateY(40px)` and
  transition over **700ms** with `cubic-bezier(0.16, 1, 0.3, 1)` when the
  `IntersectionObserver` adds `.revealed`. Staggered with `transition-delay`
  (0.1s, 0.2s, …).
- **Hero mockup float.** 6s `ease-in-out infinite`, `perspective(1200px)
  rotateY(-8deg) rotateX(3deg) translateY(-12px)`.
- **Pulse glow.** The hero badge dot and primary button breathe with
  `box-shadow: 0 0 30px → 0 0 50px` over 2s.
- **Counter rolls.** Trust numbers and the `$250K` hook count up using
  `requestAnimationFrame` with an `ease-out cubic`/`quartic` curve, ~1.5–2.2s.
- **Hover.** Buttons lift `translateY(-2px)` + intensify glow. Cards lift
  `translateY(-3px)` to `-4px` + amber border + drop shadow.
- **Press.** Not explicitly styled; relies on the natural button activation. No
  scale-down on tap.
- **Easing default.** `cubic-bezier(0.16, 1, 0.3, 1)` ("out-soft") for everything
  longer than 250ms. Linear or `ease-out` for sub-250ms.

### Borders & shadows

- **Border weight:** always 1px. The only exception is the step-number circle
  (2px solid amber-border).
- **Border colors:**
  `rgba(255,255,255,0.06)` default — `--border`.
  `rgba(255,255,255,0.10)` accented — `--border-accent`.
  `rgba(245,158,11,0.25)` brand — `--accent-amber-border` (highlight cards).
- **Inner shadows:** not used.
- **Outer shadows** are heavy and directional:
  - Cards: `0 12px 30px -8px rgba(0,0,0,0.30)`.
  - On hover: `0 20px 40px -10px rgba(0,0,0,0.40)`.
  - Mockup frames: `0 24px 60px -15px rgba(0,0,0,0.50), 0 0 0 1px rgba(255,255,255,0.05)`.
  - Primary button: amber glow `0 0 30px rgba(245,158,11,0.25)` + black drop.
- **Capsules vs gradients.** Tiny pills (status chips, "Fuente:" attribution,
  hero pip row) use full-pill (`border-radius: 999px`) with subtle bg + thin
  border. They are **outline** style, never solid amber.

### Transparency & blur

- **Glass cards** = `background: rgba(255,255,255,0.03)` + `backdrop-filter:
  blur(20px)`. Used on the contact form and a few hero overlays.
- **Sticky nav** is transparent at top, then on scroll becomes
  `rgba(10,10,15,0.85)` + `backdrop-filter: blur(20px)` + 1px bottom border.
- **No frosted-glass over photos** — there are no photos to overlay.

### Radii

| Element | Radius |
|---|---|
| Buttons, chips, mockup pieces | `--radius-sm` = **6px** |
| Cards, glass panels, mockup frames | `--radius-md` = **12px** |
| Large feature panels (rare) | `--radius-lg` = **16px** |
| Pills, micro-status, fab | `999px` |
| Step-number circles | `50%` (full round) |

### Card anatomy

```
┌───────────────────────────────────────┐
│  bg: rgba(255,255,255,0.03) glass     │
│  border: 1px solid rgba(255,255,255,  │
│          0.06)                        │
│  radius: 12px                         │
│  padding: 20–32px                     │
│  shadow: none at rest                 │
│                                       │
│  [optional 3px top-edge accent for    │
│   problem/danger cards, faded amber]  │
└───────────────────────────────────────┘
  ↑ on hover: border becomes amber-25,
    translateY(-3px), shadow appears
```

### Layout rules

- **Grid first.** All section grids are CSS grid: `repeat(3, 1fr)` for problems,
  diff cards, how-it-works; `repeat(4, 1fr)` for the ecosystem (16+ modules);
  `repeat(5, 1fr)` for the trust bar.
- **Gaps** are 14–20px between cards, 40–48px between feature blocks.
- **Feature blocks** alternate text/mockup left/right via a `.reverse` modifier.
- **Container** is fixed at `max-width: 1200px` with `24px` side padding. Don't
  go full-bleed except for the hero noise + grid backgrounds.
- **Fixed elements:** the top nav (64px tall) and the floating WhatsApp FAB
  (bottom-right, 56×56, green `#25d366`, breathing-pulse ring).

### Imagery vibe

Cool, dark, slightly cyan-leaning. If we ever add photos, they should be:

- **Industrial subject** — machinery, server racks, factory floors, technicians
  with tablets. Never office stock photos, never smiling teams.
- **Desaturated, cool, contrasty.** Think industrial photography, not lifestyle.
- **Slight grain** preserved (matches the hero grain treatment).
- **Never** warm/golden-hour, never people-first, never aspirational.

---

## ICONOGRAPHY

**Current state in the codebase: there is no proper icon system.** The landing
page uses three things, in this order of frequency:

1. **Unicode glyphs** as decorative icons inside the ecosystem grid:
   `&#9744;` (☐), `&#9783;` (⚇), `&#8644;` (⇄), `&#128100;` (👤),
   `&#9881;` (⚙), `&#128203;` (📋), `&#128274;` (🔒), `&#128202;` (📊), etc.
   They're colored via inline `style="color:#3b82f6;"` to ride brand colors.
2. **Inline SVGs** for the few "real" icons: WhatsApp logo (brand-correct),
   email envelope, the pain-card alert icons (red stroke, 1.5px, `fill:none`).
3. **CSS-only mockup icons** — search magnifying glasses, mock-bars, etc., drawn
   with empty divs + pseudo-elements.

**On-brand iconography rules for future work:**

- Stroke style: **1.5px stroke, no fill** (matches the existing pain-card
  treatment). Square cap, round join.
- Size: **20px or 24px** in body, **28px** in feature cards, **48px** in feature
  icon tiles.
- Color: **inherit from container**. Pain icons = red, diff icons match their
  pill bg color. Default = `--text-secondary`.
- **No emoji** in production UI ever. The unicode glyphs in the ecosystem grid
  are a stylistic shortcut — when redoing that section properly, swap for
  Lucide icons.

**Recommended icon library:** **Lucide** (`lucide.dev`). It matches the existing
1.5px-stroke aesthetic, has every glyph we need (Box, QrCode, ArrowLeftRight,
User, RotateCcw, Settings, ClipboardList, Calendar, Lock, BarChart3, Users,
TreePine, Sliders), and is on the unpkg CDN:

```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="qr-code"></i>
<script>lucide.createIcons();</script>
```

**Assets we copied:** see `assets/`. We synthesised a wordmark SVG and a favicon
SVG from the inline `data:image/svg+xml` favicon in the landing page (a black
rounded square with "SC" in white). The WhatsApp glyph is the exact path used in
the source. **No other vector assets were available.**

> **⚠ Flag for the user:** there is no proper SCAF logo file. The wordmark is
> just the word "SCAF" in Outfit 700 with the "AF" colored amber. If the brand
> has a real logo (mark + wordmark lockup), please drop it into `assets/`.

---

## Component coverage (UI kit `ui_kits/landing/`)

The kit recreates the landing-page primitives as small JSX components so they
can be composed into new marketing pages, decks, or product mockups:

- `Nav` — sticky header with logo, links, WhatsApp button, primary CTA
- `Hero` — badge + H1 with gradient highlight + lede + CTA row + micro pips
- `Button` — amber primary, ghost secondary, sizes sm/md
- `Eyebrow` — Bebas Neue uppercase label
- `Card` — generic dark card (glass, default, highlighted)
- `EcoCard` — module tile for the 16+ ecosystem grid
- `DiffCard` — differentiator card with color-coded icon tile
- `PainCard` — red-coded problem card
- `StepRow` — numbered "how it works" step
- `MockFrame` — Mac-window-chromed light dashboard, used inside dark feature
  blocks. Includes title bar, sidebar, kpi grid, table, badges, gantt mini-rows.
- `Badge` — status pill: green/amber/red with leading dot
- `KPI` — mono number + label, semantic color variants
- `TrustItem` — number + label, divider-separated row
- `ContactCard` — WhatsApp / Email direct-contact cards
- `Footer`

Each is small and cosmetic — no real state, just composable presentation.

---

## CAVEATS for future iterations

1. **No real logo file.** The wordmark is type-set. If a true logo exists, drop
   it in `assets/`.
2. **No font files shipped.** Everything is CDN. Offline rendering needs WOFF2s.
3. **The 16+ ecosystem grid uses Unicode glyph icons.** Replace with Lucide for
   any new work.
4. **No photography style yet** — only product mockups exist. The "imagery
   vibe" section above is a recommendation, not a documented standard.
5. **No dark/light toggle** — the brand is dark-only by design.
6. **Pricing was provided in `PAQUETES_COMERCIALES.md` but not yet integrated
   into the landing page.** A summary block + "ver detalle" expansion is
   planned per the user's note.

---

## Quick start for an agent

1. Read this README end-to-end.
2. Read `colors_and_type.css` — every color and type recipe lives there.
3. If recreating any landing-page section, copy markup verbatim from
   `source/landing-page.html` and rewire to use the CSS vars.
4. For new mockup screens, use `MockFrame` from the UI kit — never invent a
   different dashboard chrome.
5. Numbers go in mono. Eyebrows go in Bebas Neue uppercase. CTAs are amber.
   Body is `--text-secondary`, not pure white.
