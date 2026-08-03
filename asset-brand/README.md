# ASSET — Kit de logo (extraído 1:1 de ASSET.pdf)

Todo se generó **desde la geometría vectorial original del PDF de Illustrator**.
No hay redibujo ni aproximación: los polígonos del isotipo y los contornos de las
letras (fuente embebida `PPTelegraf-UltraBold`) se extrajeron tal cual y se
convirtieron a `path`. Verificación pixel a pixel contra el PDF: diferencia
únicamente en el antialiasing de borde (1 px).

## Estructura

```
asset-brand/
├── svg/          Vectorial, fondo transparente (fuente de verdad)
├── png/          Rasterizados desde el SVG, fondo transparente
├── favicon/      favicon.ico + PNGs web/PWA/iOS
└── app-icons/    Tiles de app rasterizados 1:1 del PDF (con degradado y radio originales)
```

## Archivos clave

| Uso | Archivo |
|---|---|
| Logo completo, fondo claro | `svg/asset-logo-horizontal-color.svg` |
| Logo completo, fondo oscuro | `svg/asset-logo-horizontal-blanco.svg` |
| Solo símbolo (avatar, loader) | `svg/asset-isotipo-color.svg` / `-blanco.svg` |
| Solo texto | `svg/asset-wordmark-color.svg` / `-blanco.svg` |
| Pestaña navegador | `favicon/favicon.ico` (16/32/48/64/128/256) |
| iOS home screen | `favicon/apple-touch-icon-180.png` |
| PWA manifest | `favicon/icon-192.png`, `icon-512.png`, `icon-maskable-512.png` |
| Store / app | `app-icons/asset-app-icon-{azul,claro,oscuro}-1024.png` |

## Proporciones exactas (pt del original)

- Lockup horizontal color: **500.72 × 125.62** (ratio 3.986:1)
- Isotipo: **121.28 × 125.62** (ratio 0.965:1)
- Wordmark: **347.03 × 80.91**
- Radio de esquina del app icon: **12.81 %** del lado

## Colores reales del logo

| Hex | Dónde |
|---|---|
| `#2563EB` | Azul primario — caras izquierdas del símbolo |
| `#5FA0FF` | Azul claro — caras derechas del símbolo |
| `#111121` | Negro azulado — wordmark y caras internas |
| `#F0F0F5` | Blanco de marca — versión sobre fondo oscuro |
| `#E2E2ED` | Gris claro — caras izquierdas en versión blanca |
| `#F1F1F1` | Fondo del app icon claro |
| `#0F0F1D` → `#22223F` | Fondo del app icon oscuro (degradado) |
| `#4F8DF9` → `#1755E6` | Fondo del app icon azul (degradado diagonal) |

> Nota: la sección "COLOR PALETTE" impresa en el PDF (`#F1E3D3`, `#690B22`,
> `#E07A5F`, `#1B4D3E` repetido dos veces) **no corresponde a ningún color del
> logo** y tiene un valor duplicado. Parece un residuo de otra plantilla.
> Los colores de arriba son los que realmente están en el arte.

## Tipografía

`PP Telegraf UltraBold` para el wordmark. En los SVG las letras ya están
convertidas a curvas, así que no se requiere la fuente instalada para renderizar.
Para textos de UI sí haría falta licenciar PP Telegraf (Pangram Pangram).

## HTML

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180.png">
<link rel="manifest" href="/site.webmanifest">
```

```json
{
  "name": "Asset",
  "short_name": "Asset",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ],
  "theme_color": "#0F0F1D",
  "background_color": "#0F0F1D"
}
```

## Área de resguardo

Margen libre mínimo alrededor del lockup = altura del isotipo ÷ 2 (≈ 63 pt a
tamaño original). Tamaño mínimo del lockup: 120 px de ancho; por debajo de eso,
usar solo el isotipo.
