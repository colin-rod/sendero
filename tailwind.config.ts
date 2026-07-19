import type { Config } from 'tailwindcss';
import { colors, landscape } from './lib/design-tokens/colors';
import { shadows } from './lib/design-tokens/shadows';
import { radius } from './lib/design-tokens/radius';
import { animations } from './lib/design-tokens/animations';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Colors from design tokens
      colors: {
        primary: colors.primary,
        accent: colors.accent,
        'secondary-oro': colors['secondary-oro'],
        riverGreen: colors.riverGreen,
        'river-forest': colors.riverForest,
        'gold-yellow': colors.goldYellow,
        silver: colors.silver,
        lava: colors.lava,
        white: colors.white,
        background: colors.background,
        foreground: colors.foreground,
        muted: colors.muted,
        border: colors.border,
        gray: colors.gray,
        landscape: landscape,
        error: colors.error,
        success: colors.success,
        warning: colors.warning,
        info: colors.info,
      },

      // Font family — Helvetica Neue system font (from Figma)
      fontFamily: {
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
        aboreto: ['var(--font-aboreto)', 'serif'],
      },

      // Note: named text-style utilities (display/h1/h2/h3/body/body-em/
      // body-small/button-label/label/caption) are intentionally NOT defined
      // here. They previously duplicated app/globals.css's `@layer components`
      // classes with different (non-responsive) values, and Tailwind v4's
      // layer order (utilities > components) meant this config always won
      // ties — silently defeating globals.css's responsive .text-h1/.text-h3
      // sizing. globals.css is now the single source of truth for these.

      // Spacing
      spacing: {
        '4.5': '1.125rem', // 18px - Custom addition
      },

      // Box shadows from design tokens
      boxShadow: {
        ...shadows,
        // Semantic shadows
        'elevation-raised': shadows.elevation.raised,
        'elevation-floating': shadows.elevation.floating,
        'elevation-overlay': shadows.elevation.overlay,
        'elevation-popup': shadows.elevation.popup,
        // Focus shadows
        'focus-primary': shadows.focus.primary,
        'focus-accent': shadows.focus.accent,
        'focus-error': shadows.focus.error,
      },

      // Border radius from design tokens
      borderRadius: {
        ...radius,
        // Semantic radius
        'component-button': radius.component.button,
        'component-input': radius.component.input,
        'component-card': radius.component.card,
        'component-badge': radius.component.badge,
        'component-modal': radius.component.modal,
      },

      // Animation durations
      transitionDuration: {
        instant: animations.duration.instant,
        fast: animations.duration.fast,
        normal: animations.duration.normal,
        slow: animations.duration.slow,
        slower: animations.duration.slower,
        slowest: animations.duration.slowest,
      },

      // Animation timing functions
      transitionTimingFunction: {
        ...animations.easing,
      },

      // Keyframe animations
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutUp: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-20px)', opacity: '0' },
        },
        slideOutDown: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(20px)', opacity: '0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        toastEnter: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        toastExit: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },

      // Animation utilities
      animation: {
        'fade-in': 'fadeIn 300ms ease-out',
        'fade-out': 'fadeOut 200ms ease-in',
        'slide-in-up': 'slideInUp 300ms ease-out',
        'slide-in-down': 'slideInDown 300ms ease-out',
        'slide-in-left': 'slideInLeft 300ms ease-out',
        'slide-in-right': 'slideInRight 300ms ease-out',
        'slide-out-up': 'slideOutUp 200ms ease-in',
        'slide-out-down': 'slideOutDown 200ms ease-in',
        'scale-in': 'scaleIn 300ms ease-out',
        'scale-out': 'scaleOut 200ms ease-in',
        'spin': 'spin 1000ms linear infinite',
        'bounce': 'bounce 1000ms ease-in-out infinite',
        'pulse': 'pulse 2000ms ease-in-out infinite',
        'toast-enter': 'toastEnter 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        'toast-exit': 'toastExit 200ms ease-in',
        'shimmer': 'shimmer 1500ms linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
