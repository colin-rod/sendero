# Tour Grid Redesign

**Date:** 2026-03-28
**Status:** Approved
**Scope:** `components/features/tourGrid/TourGrid.tsx`

---

## Overview

Redesign the tour card grid from a flex-wrap flip-card layout to a responsive 2-column CSS grid with 1:1 square cards and a hover overlay interaction. Replace the element symbol SVGs with new path SVGs on the overlay.

---

## Layout

- **Grid:** `grid grid-cols-1 md:grid-cols-2`
- **Gap:** `gap-10` (40px horizontal and vertical, matching Figma spacing)
- **Card size:** `aspect-square w-full` — fully responsive 1:1 squares, no fixed pixel dimensions
- **Corner radius:** 0
- **Mobile:** single column (`grid-cols-1`)

---

## Card: Default State

- Full-bleed background photo (`object-cover`, `object-position: center`)
- Gradient overlay at bottom: `linear-gradient(360deg, rgba(0,0,0,0.6) 27.66%, rgba(0,0,0,0) 100%)`
- Title at bottom center:
  - Color: `#F2F2F2`
  - Typography: `text-h3` token, `tracking-[0.12em]`, all uppercase
  - Format: The `title` prop (e.g. "Sendero del Tigre") is split on ` del ` (case-insensitive). The prefix ("SENDERO DEL") renders in regular weight; the trail name ("TIGRE") renders in bold. Both are uppercased via CSS `uppercase`.

---

## Card: Hover State

- White overlay (`bg-white`) fades in over the full card
- Transition: `opacity-0 group-hover:opacity-100 transition-opacity duration-300`
- Overlay content (centered, vertically and horizontally):
  1. **Path SVG** — from `PATH_SVG` map (e.g. `/svg/trails/elements/path-agua.svg`), sized to fit proportionally
  2. **Description text** — two lines, centered, `text-body` token, `text-gray-600`

---

## SVG Mapping

Replace `ELEMENT_SVG` with `PATH_SVG`:

```ts
const PATH_SVG: Record<string, string> = {
  agua:     '/svg/trails/elements/path-agua.svg',
  cacao:    '/svg/trails/elements/path-cacao.svg',
  guadua:   '/svg/trails/elements/path-guadua.svg',
  paramo:   '/svg/trails/elements/path-paramo.svg',
  volcan:   '/svg/trails/elements/path-volcan.svg',
  tigre:    '/svg/trails/elements/path-tigre.svg',
  cafe:     '/svg/trails/elements/path-cafe.svg',
  oro:      '/svg/trails/elements/path-oro.svg',
  luminoso: '/svg/trails/elements/path-luminoso.svg',
};
```

---

## Hover Overlay Text (per card)

| ID       | Line 1                          | Line 2                                    |
|----------|---------------------------------|-------------------------------------------|
| agua     | Bergflüsse und Andenwälder.     | Nah an uralten Geschichten.               |
| cacao    | Warme Wege im Kakaotal.         | Radeln und Kakaohandwerk erleben.         |
| guadua   | Bambuswälder zur goldenen Stunde. | In die Klänge des Abends eintauchen.   |
| paramo   | Kompakter Hochgebirgsanstieg.   | Dünne Luft, rohe Schönheit, weite Stille. |
| volcan   | Vulkanisches Gelände.           | Fahren zwischen hohen Wachspalmen.        |
| tigre    | Malerische Rundstrecken.        | Bio-Hof Mittagessen.                      |
| cafe     | Kaffeelandschaften.             | Spezialitätenkaffee am Ursprung.          |
| oro      | Farbenfrohe Pueblos.            | Lebendiges Kulturerbe erfahren.           |
| luminoso | Sanftes Landgelände.            | Ruhiges Radfahren bei Nacht.              |

---

## What Gets Removed

- `FlipCard` component and all flip-card CSS classes (`flip-card`, `flip-card-inner`, `flip-card-front`, `flip-card-back`)
- `ELEMENT_SVG` mapping
- Fixed pixel dimensions (`h-[476px]`, `min-w-[300px]`, `w-[330px]`)
- 3D transform styles

---

## Data Model

No changes to `TourGridCardData` or page-level card data. Hover text is internal to the component, keyed by card `id` in a `HOVER_TEXT` map — same pattern as `PATH_SVG`:

```ts
const HOVER_TEXT: Record<string, string> = {
  agua:     'Bergflüsse und Andenwälder.\nNah an uralten Geschichten.',
  cacao:    'Warme Wege im Kakaotal.\nRadeln und Kakaohandwerk erleben.',
  guadua:   'Bambuswälder zur goldenen Stunde.\nIn die Klänge des Abends eintauchen.',
  paramo:   'Kompakter Hochgebirgsanstieg.\nDünne Luft, rohe Schönheit, weite Stille.',
  volcan:   'Vulkanisches Gelände.\nFahren zwischen hohen Wachspalmen.',
  tigre:    'Malerische Rundstrecken.\nBio-Hof Mittagessen.',
  cafe:     'Kaffeelandschaften.\nSpezialitätenkaffee am Ursprung.',
  oro:      'Farbenfrohe Pueblos.\nLebendiges Kulturerbe erfahren.',
  luminoso: 'Sanftes Landgelände.\nRuhiges Radfahren bei Nacht.',
};
```

The two lines are rendered as separate `<p>` elements split on `\n`.

---

## Out of Scope

- i18n of hover text (German only for now, matches existing card data language)
- Animation beyond simple opacity fade
- Any changes to `TourGrid` heading/subheading props
