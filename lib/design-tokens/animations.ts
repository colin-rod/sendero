/**
 * Sendero Design System - Animation Tokens
 *
 * Timing, easing, and animation configurations
 */

export const animations = {
  // Duration tokens
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
    slowest: '1000ms',
  },

  // Easing functions
  easing: {
    // Default easing
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',

    // Linear
    linear: 'linear',

    // Ease variations
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

    // Spring-like (for bouncy effects)
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',

    // Sharp (for exits)
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',

    // Smooth (for smooth movements)
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  },

  // Transition presets
  transition: {
    // Color transitions (text, background, border)
    colors: {
      fast: 'color 150ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      normal: 'color 300ms cubic-bezier(0.4, 0, 0.2, 1), background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), border-color 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    },

    // Transform transitions
    transform: {
      fast: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      normal: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
    },

    // Opacity transitions
    opacity: {
      fast: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      normal: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    },

    // All properties
    all: {
      fast: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      normal: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // Keyframe animation names
  keyframes: {
    // Fade animations
    fadeIn: 'fadeIn',
    fadeOut: 'fadeOut',

    // Slide animations
    slideInUp: 'slideInUp',
    slideInDown: 'slideInDown',
    slideInLeft: 'slideInLeft',
    slideInRight: 'slideInRight',
    slideOutUp: 'slideOutUp',
    slideOutDown: 'slideOutDown',

    // Scale animations
    scaleIn: 'scaleIn',
    scaleOut: 'scaleOut',

    // Spin animations
    spin: 'spin',

    // Bounce animations
    bounce: 'bounce',

    // Pulse animations
    pulse: 'pulse',

    // Toast animations
    toastEnter: 'toastEnter',
    toastExit: 'toastExit',
  },

  // Semantic animation tokens
  semantic: {
    // Button interactions
    buttonPress: {
      duration: '150ms',
      easing: 'cubic-bezier(0.4, 0, 1, 1)',
      transform: 'scale(0.98)',
    },

    buttonHover: {
      duration: '150ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },

    // Page transitions
    pageEnter: {
      duration: '300ms',
      easing: 'cubic-bezier(0, 0, 0.2, 1)',
    },

    pageExit: {
      duration: '150ms',
      easing: 'cubic-bezier(0.4, 0, 1, 1)',
    },

    // Modal/Dialog
    modalEnter: {
      duration: '300ms',
      easing: 'cubic-bezier(0, 0, 0.2, 1)',
    },

    modalExit: {
      duration: '200ms',
      easing: 'cubic-bezier(0.4, 0, 1, 1)',
    },

    // Toast notifications
    toastEnter: {
      duration: '300ms',
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Spring
    },

    toastExit: {
      duration: '200ms',
      easing: 'cubic-bezier(0.4, 0, 1, 1)',
    },

    // Loading spinner
    spinner: {
      duration: '1000ms',
      easing: 'linear',
    },

    // Skeleton loading
    skeleton: {
      duration: '1500ms',
      easing: 'linear',
    },
  },
} as const;

/**
 * Animation usage guidelines:
 *
 * DURATION
 * - instant (0ms): Immediate changes, no animation
 * - fast (150ms): Hover states, quick interactions
 * - normal (300ms): Default for most animations
 * - slow (500ms): Page transitions, important changes
 * - slower (700ms): Large movements, complex animations
 * - slowest (1000ms): Loading states, continuous animations
 *
 * EASING
 * - default: Standard easing for most transitions
 * - in: Accelerating (elements entering)
 * - out: Decelerating (elements exiting, recommended for most)
 * - inOut: Both (full animations)
 * - spring: Bouncy effects (use sparingly)
 * - sharp: Quick exits, dismissals
 *
 * BEST PRACTICES
 * - Prefer 'out' easing for a polished feel
 * - Use fast (150ms) for hover/focus states
 * - Use normal (300ms) for entrances/exits
 * - Keep animations subtle and purposeful
 * - Always respect prefers-reduced-motion
 *
 * ACCESSIBILITY
 * - Never rely solely on animation to convey information
 * - Provide alternative feedback (text, color, icons)
 * - Respect user's motion preferences
 * - Keep animations short and non-distracting
 */

export type AnimationToken = typeof animations;
