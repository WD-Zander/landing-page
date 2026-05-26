---
name: scaf-design
description: Use this skill to generate well-branded interfaces and assets for SCAF (Sistema de Control de Activos Fijos), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files:

- `colors_and_type.css` — design tokens (colors, type, spacing, radii, motion).
- `PAQUETES_COMERCIALES.md` — pricing source-of-truth for landing-page sections.
- `source/landing-page.html` — full original marketing page; use as a stylistic reference and copy markup verbatim when recreating sections.
- `ui_kits/landing/` — JSX components (Nav, Hero, Button, Card, MockFrame, EcoCard, etc).
- `assets/` — wordmark, favicon, brand-correct WhatsApp glyph.
- `preview/` — small specimen cards (one per concept) for the design-system review pane.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

**SCAF essentials at a glance:**

- Language: Spanish (LatAm, "tú", no emoji, no exclamation marks).
- Mood: industrial-clinical, dark editorial. Black backgrounds, amber accent, slate blue support, mono-spaced data.
- Type: Bebas Neue (eyebrows), Outfit (headings), DM Sans (body), JetBrains Mono (numbers/codes).
- Primary CTA is always amber `#f59e0b`. Never blue. Never green.
- Numbers and asset codes are mono. Eyebrows are uppercase Bebas Neue with `0.15em` tracking.
- One headline gradient only: amber → bright amber on the highlight word.
- No photography. Product UI is shown via the `MockFrame` component (faux Mac window with light interior).
