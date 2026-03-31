import type { Config } from 'tailwindcss';
import { colors } from './lib/design-tokens/colors';
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
        honey: colors.honey,
        riverGreen: colors.riverGreen,
        riverForest: colors.riverForest,
        goldYellow: colors.goldYellow,
        white: colors.white,
        background: colors.background,
        foreground: colors.foreground,
        muted: colors.muted,
        border: colors.border,
        gray: colors.gray,
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

      // Custom typography sizes — Updated from Figma Desktop/Mobile/Tablet tokens (2025)
      fontSize: {
        'display': ['4rem', { fontWeight: '700' }], // 64px desktop - new
        'h1': ['3rem', { fontWeight: '700' }], // 48px desktop (40px mobile)
        'h2': ['2rem', { fontWeight: '700' }], // 32px - updated from 36px
        'h3': ['1.75rem', { fontWeight: '500' }], // 28px desktop (24px mobile)
        'body': ['1rem', { lineHeight: '1rem', fontWeight: '400' }], // 16px - Body Standard
        'body-em': ['1rem', { fontWeight: '700' }], // 16px - Body Emphasised
        'body-small': ['0.625rem', { fontWeight: '400' }], // 10px - Body Small
        'button-label': ['1rem', { fontWeight: '500' }], // 16px - Button Label
        'label': ['0.75rem', { fontWeight: '600' }], // 12px - text-xs, semibold
        'caption': ['0.875rem', { fontWeight: '400', lineHeight: '1.25rem' }], // 14px - helper text, error messages, secondary labels
      },

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
