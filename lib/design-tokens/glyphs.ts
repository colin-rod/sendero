/**
 * Sendero Design System - Trail Symbol Glyphs
 *
 * Nine landscape-category icon marks used to tag trail features/map
 * legends (from Figma "Trail Symbols/light" and "Trail Symbols/dark"
 * component sets). Each entry ships a light-background SVG (dark stroke),
 * a dark-background SVG (white stroke), and the single-character unicode
 * glyph used as a compact inline stand-in for the same category.
 *
 * NOTE: these categories are a different taxonomy from `landscape` in
 * ./colors.ts — landscape is a 6-family color palette (cacao/azul/lila/
 * verde/naranjo/cafe) for data-viz accents, while these are 9 trail/terrain
 * feature icons (agua/cacao/cafe/guadua/luminoso/oro/paramo/tigre/volcan).
 * They share some names by coincidence, not by design — don't conflate them.
 */

export const glyphs = {
  agua: {
    light: '/svg/glyphs/agua-light.svg',
    dark: '/svg/glyphs/agua-dark.svg',
    unicode: '≋',
  },
  cacao: {
    light: '/svg/glyphs/cacao-light.svg',
    dark: '/svg/glyphs/cacao-dark.svg',
    unicode: '⬢',
  },
  cafe: {
    light: '/svg/glyphs/cafe-light.svg',
    dark: '/svg/glyphs/cafe-dark.svg',
    unicode: '🜔',
  },
  guadua: {
    light: '/svg/glyphs/guadua-light.svg',
    dark: '/svg/glyphs/guadua-dark.svg',
    unicode: '⌇',
  },
  luminoso: {
    light: '/svg/glyphs/luminoso-light.svg',
    dark: '/svg/glyphs/luminoso-dark.svg',
    unicode: '○',
  },
  oro: {
    light: '/svg/glyphs/oro-light.svg',
    dark: '/svg/glyphs/oro-dark.svg',
    unicode: '☉',
  },
  paramo: {
    light: '/svg/glyphs/paramo-light.svg',
    dark: '/svg/glyphs/paramo-dark.svg',
    unicode: '🜍',
  },
  tigre: {
    light: '/svg/glyphs/tigre-light.svg',
    dark: '/svg/glyphs/tigre-dark.svg',
    unicode: '⟐',
  },
  volcan: {
    light: '/svg/glyphs/volcan-light.svg',
    dark: '/svg/glyphs/volcan-dark.svg',
    unicode: '⧊',
  },
} as const;

export type GlyphToken = typeof glyphs;
