# SCAF Landing UI Kit

A small JSX recreation of the SCAF marketing site's primitives — composable
components, shared CSS tokens, and one full page demo (`index.html`).

## What's here

| File | What it gives you |
|---|---|
| `styles.css` | All CSS. Imports `../../colors_and_type.css` for tokens and adds component classes (`.dsk-*`). |
| `components.jsx` | `Nav`, `Hero` parts, `Button`, `Badge`, `Card`, `PainCard`, `EcoCard`, `DiffCard`, `TrustItem`, `KPI`, `MockFrame`, `StepRow`, `ContactCard`, `Footer`. |
| `Plans.jsx` | `Plans` section, `PlanCard`, and the `PLANS` data array derived from `PAQUETES_COMERCIALES.md`. Headline view on the surface; full detail behind a "Ver detalle completo" toggle, per user note. |
| `index.html` | Live demo: full landing page assembled from the kit, including the new Plans section. Loads React 18 + Babel from CDN. |

## How to use

Open `index.html` directly, or include any component in another page:

```html
<link rel="stylesheet" href="ui_kits/landing/styles.css">
<!-- React + Babel script tags (see index.html) -->
<script type="text/babel" src="ui_kits/landing/components.jsx"></script>
<script type="text/babel" src="ui_kits/landing/Plans.jsx"></script>
<script type="text/babel">
  ReactDOM.createRoot(root).render(
    <>
      <Nav />
      <section className="dsk-section">
        <Plans />
      </section>
      <Footer />
    </>
  );
</script>
```

Components attach themselves to `window` so they're available across the
multiple `<script type="text/babel">` blocks Babel-Standalone creates.

## Coverage

| Surface | Status |
|---|---|
| Top nav (sticky, transparent → frosted) | ✅ |
| Hero (badge, gradient H1, CTAs, micro pips, dashboard mockup) | ✅ |
| Trust bar (5-col divider) | ✅ |
| Problem (pain cards w/ red icon tile) | ✅ |
| Features (alternating text/mockup blocks) | ✅ — Inventory + Dashboard mock only; user can add more |
| Ecosystem (16-card grid) | ✅ |
| Plans section *(new — from PAQUETES_COMERCIALES.md)* | ✅ |
| Differentiators (glass cards, one wide highlight) | ✅ |
| How it works (3 steps) | ✅ |
| Contact (WA + email cards) | ✅ — simplified; the original also includes a form |
| Footer | ✅ |
| Floating WhatsApp FAB | ❌ — omitted from kit; add per-site if needed |
| Hero film-grain animation | ❌ — visual decoration, can be added back |

## Caveats

- The ecosystem icons use Unicode glyphs (matching the source) — for any new
  work, replace with Lucide icons (see `README.md` → ICONOGRAPHY).
- `MockFrame` is intentionally simple. For richer mockups, copy the table /
  gantt / audit row CSS from `source/landing-page.html`.
- This is a UI kit, not a production app — there's no router, no state, no
  i18n. Spanish copy is hard-coded.
