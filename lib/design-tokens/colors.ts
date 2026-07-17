/**
 * Sendero Design System - Color Tokens
 *
 * Semantic color definitions for the Sendero brand.
 * These tokens provide meaningful names that communicate intent
 * rather than specific color values.
 *
 * Updated to match Figma design system
 */

export const colors = {
  // Primary Brand Colors (River Green - Nature, Eco, Adventure)
  primary: {
    50: '#e8f4f2',
    100: '#c5e3df',
    200: '#9ecfc9',
    300: '#72bab2',
    400: '#4da89f',
    500: '#1e6a62', // River Green — main brand color
    600: '#1a5e57',
    700: '#154f49',
    800: '#10403b',
    900: '#0b2f2b',
  },

  // Secondary/Accent Colors (Light Cream - Soft, Warm accent)
  accent: {
    50: '#fffefb',
    100: '#fffcf5',
    200: '#fff8eb',
    300: '#fff3d6',
    400: '#fff0bb', // Secondary from Figma
    500: '#ffe89a',
    600: '#f5d980',
    700: '#e5c566',
    800: '#d4b04d',
    900: '#c39b33',
    950: '#a87c16',
  },

  // Secondary Oro (Rich Golden - Adventure, Warmth, Buttons)
  // 500 = Figma Brand.secondary-oro. Other stops are a derived tint/shade
  // ramp (HSL-offset-preserving from the prior "honey" ramp) around that base.
  'secondary-oro': {
    50: '#fff1b7',
    100: '#ffed91',
    200: '#ffe352',
    300: '#ffd012',
    400: '#e6b300',
    500: '#d09e00', // secondary-oro from Figma
    600: '#aa7601',
    700: '#855301',
    800: '#673c03',
    900: '#512c05',
    950: '#190b01',
  },

  // Brand Colors (from Figma Light Mode tokens)
  riverGreen: {
    50: '#e8f4f2',
    100: '#c5e3df',
    200: '#9ecfc9',
    300: '#72bab2',
    400: '#4da89f',
    500: '#1e6a62', // River Green from Figma
    600: '#1a5e57',
    700: '#154f49',
    800: '#10403b',
    900: '#0b2f2b',
  },

  // River Forest (from Figma primary-river-forest token)
  riverForest: '#264c43',

  // goldYellow alias (canonical brand token from Figma)
  goldYellow: '#fff0bb',

  // Accent Lava (from Figma Brand.accent-lava) — same swatch as landscape.naranjo.lava below
  lava: '#d84900',

  // Neutral Colors - Updated from Figma (Light Mode tokens, 2025)
  background: '#f2f2f2', // BKG from Figma
  foreground: '#232323', // Carbon Dark / Text Dark from Figma
  white: '#ffffff',

  muted: {
    DEFAULT: '#f2f2f2', // BKG from Figma
    foreground: '#a9a9a9', // Steel Gray from Figma
  },

  border: '#e2e8f0',

  // Grays from Figma
  gray: {
    50: '#f9f9f9',
    100: '#f2f2f2', // BKG from Figma
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a9a9a9', // Steel Gray from Figma
    500: '#737373',
    600: '#a9a9a9', // Steel Gray from Figma
    700: '#494949',
    800: '#262626',
    900: '#232323', // Carbon Dark / Text Dark from Figma
    950: '#1b1b1b', // Gravel Black from Figma
  },

  // Silver (from Figma Neutrals.silver / Text.text-silver)
  silver: '#807e7c',

  // Semantic Colors
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444', // Main error color
    600: '#dc2626',
    700: '#b91c1c',
  },

  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
  },

  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },
} as const;

/**
 * Color usage guidelines:
 *
 * PRIMARY (River Green - #1e6a62)
 * - Use for: Primary buttons, brand elements, key CTAs, highlights
 * - Variants: 500 (default), 600 (hover), 100 (light backgrounds), 50 (subtle backgrounds)
 *
 * ACCENT / SECONDARY (Golden Yellow - #fff0bb)
 * - Use for: Secondary buttons, soft backgrounds, warm accents
 * - Variants: 400 (default), 500 (hover)
 *
 * SECONDARY-ORO (#d09e00) — was HONEY (#c4963f)
 * - Use for: Special CTA buttons, hero buttons, discover/explore actions
 * - Variants: 500 (default), 600 (hover), 700 (active), 50-100 (light backgrounds)
 * - Access via: colors['secondary-oro'][500] (bracket notation — key has a hyphen)
 *
 * LAVA (#d84900)
 * - Use for: High-energy accents, warnings, fire/adventure motifs
 * - Access via: lava (also available as landscape.naranjo.lava)
 *
 * SILVER (#807e7c)
 * - Use for: Secondary neutral text/icons, distinct from steel gray
 * - Access via: silver
 *
 * CARBON DARK (#232323) — was Gravel Black
 * - Use for: Primary text, headings, dark backgrounds
 * - Access via: foreground or gray.900
 *
 * STEEL GRAY (#a9a9a9) — updated from #616161
 * - Use for: Secondary text, muted text, placeholders
 * - Access via: muted.foreground or gray.600
 *
 * RIVER GREEN (#1e6a62) — new brand color
 * - Use for: Eco/nature accents, secondary CTAs, icons, tags
 * - Access via: riverGreen.500 (or 50-900 scale)
 *
 * RIVER FOREST (#264c43) — darker forest brand color
 * - Use for: Deeper eco/nature accents, hover states on river green elements
 * - Access via: riverForest
 *
 * BACKGROUND (#f2f2f2)
 * - Use for: Page backgrounds, card backgrounds
 * - Access via: background or gray.100
 *
 * ERROR (Red)
 * - Use for: Validation errors, destructive actions, alerts
 * - Variants: 500 (default), 600 (hover)
 *
 * SUCCESS (Green)
 * - Use for: Success messages, confirmations, positive feedback
 *
 * WARNING (Orange)
 * - Use for: Warnings, caution messages
 *
 * INFO (Blue)
 * - Use for: Informational messages, tips, helpers
 */

export type ColorToken = typeof colors;

/**
 * Landscape Palette (from Figma "Landscape" token group)
 *
 * Six thematic sub-families (cacao / azul / lila / verde / naranjo / café)
 * used for data-visualization-style accents — e.g. distinguishing trail
 * routes/markers on the map. 35 colors total.
 *
 * NAMING COLLISION — read before using verde.* values:
 * Figma defines two different colors with similar roots that must stay
 * distinct (different keys, different hex values, do NOT merge):
 *   - colors.primary[500] / colors.riverGreen[500] = Brand "primary-selva" = #1e6a62
 *   - landscape.verde.selva                        = Landscape "verde-selva" = #006d62
 *   - colors.riverForest                           = Brand "primary-bosque" = #264c43
 *   - landscape.verde.bosque                       = Landscape "verde-bosque" = #154d44
 */
export const landscape = {
  cacao: {
    sombra: '#2a0e10',
    tronco: '#4a1a1c',
    vaina: '#6b2329',
    pulpa: '#8f3530',
    nuez: '#b85c42',
    grano: '#c9a876',
  },
  azul: {
    noche: '#081b31',
    paramo: '#112f4c',
    cielo: '#244b71',
    niebla: '#3f719c',
    neblina: '#a2c5df',
  },
  lila: {
    sietecueros: '#1a1530',
    tallo: '#2d2152',
    flor: '#4a3b7a',
    petalo: '#9784c7',
    brote: '#c9bee6',
    rocio: '#efeaf8',
  },
  verde: {
    selva: '#006d62',
    bosque: '#154d44',
    musgo: '#586c33',
    helecho: '#86a050',
    pasto: '#c4da99',
    hoja: '#e8f3da',
  },
  naranjo: {
    lava: '#d84900', // same swatch as top-level colors.lava (Brand accent-lava alias)
    fuego: '#fa7121',
    cobre: '#fea465',
    arena: '#fec693',
    pergamino: '#fdf1e2',
    papel: '#fef8f1',
  },
  cafe: {
    // "cafe" not "café" — no accented characters in JS object keys
    obsidiana: '#1d180f',
    roca: '#3c3227',
    arcilla: '#725d40',
    tierra: '#cfb384',
    sal: '#f6f0e7',
    blanco: '#ffffff',
  },
} as const;

export type LandscapeToken = typeof landscape;
